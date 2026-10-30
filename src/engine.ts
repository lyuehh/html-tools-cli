import { JSDOM, VirtualConsole } from 'jsdom';
import { Script } from 'node:vm';
import { webcrypto } from 'node:crypto';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { basename, extname, dirname, resolve } from 'node:path';
import { installCanvas } from './canvas.ts';
import type { Tool, Payload, Result, ExecutionOptions } from './types.js';
const require = createRequire(import.meta.url);

// The DOM is an in-memory compatibility layer for original field access.
// No browser process, page navigation, external resources, or CDN execution.
export function createExecution(payload: Payload, options: ExecutionOptions = {}) {
  const messages: string[] = [];
  const alerts: string[] = [];
  const pending: Promise<unknown>[] = [];
  const console = new VirtualConsole();
  const dom = new JSDOM(payload.html, {
    url: 'https://html-tools.invalid/', runScripts: 'outside-only', virtualConsole: console,
  });
  const window = dom.window;
  const document = window.document;
  const OriginalPromise=window.Promise;
  Object.assign(window,{Promise:class<T> extends OriginalPromise<T> {
    static get [Symbol.species](){return OriginalPromise;}
    constructor(executor:(resolve:(value:T|PromiseLike<T>)=>void,reject:(reason?:unknown)=>void)=>void){
      super(executor);pending.push(this);
      OriginalPromise.prototype.then.call(this,undefined,()=>{});
    }
  }});
  const written = new Set<string>();
  const canvas = installCanvas(window,pending,written);
  function track(prototype: object, property: string) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, property);
    if (!descriptor?.set) return;
    Object.defineProperty(prototype, property, { ...descriptor, set(this: Element, value: unknown) {
      const target = this.nodeType === 1 ? this : this.parentElement;
      const id = target?.id || target?.closest('[id]')?.id;
      if (id) written.add(id);
      descriptor.set!.call(this, value);
    }});
  }
  track(window.Node.prototype, 'textContent');
  track(window.Element.prototype, 'innerHTML');
  track(window.HTMLInputElement.prototype, 'value');
  track(window.HTMLTextAreaElement.prototype, 'value');
  for(const [prototype,methods] of [[window.Node.prototype,['appendChild','insertBefore','replaceChild','removeChild']],[window.Element.prototype,['setAttribute','replaceChildren','append','prepend']]] as const){
    for(const name of methods){
      const original=Reflect.get(prototype,name) as (...args:unknown[])=>unknown;
      Object.defineProperty(prototype,name,{configurable:true,writable:true,value:function(this:Element,...args:unknown[]){
        const result=original.apply(this,args);
        const id=this.nodeType===1?(this.id||this.closest('[id]')?.id):undefined;
        if(id)written.add(id);
        return result;
      }});
    }
  }
  Object.defineProperty(window.HTMLElement.prototype, 'innerText', {
    configurable: true, get() { return this.textContent; },
    set(value: string) { this.textContent = value; },
  });
  const context = dom.getInternalVMContext();
  const callbackStack: { callback: (...args: never[]) => unknown; target: unknown; args: unknown[] }[] = [];
  Object.assign(window, { __cliCallbacks: callbackStack });
  function invoke(callback: (...args: never[]) => unknown, target: unknown, ...args: unknown[]) {
    const index=callbackStack.push({callback,target,args})-1;
    try { return evaluate(`__cliCallbacks[${index}].callback.apply(__cliCallbacks[${index}].target,__cliCallbacks[${index}].args)`); }
    finally {callbackStack.pop();}
  }
  for(const prototype of [window.HTMLElement.prototype,window.FileReader.prototype]) {
    for(const property of ['onload','onerror','onloadend','oninput','onchange','onclick']) {
      const descriptor=Object.getOwnPropertyDescriptor(prototype,property);
      if(!descriptor?.set)continue;
      Object.defineProperty(prototype,property,{...descriptor,set(this:unknown,callback:unknown){
        descriptor.set!.call(this,typeof callback==='function'?function(this:unknown,...args:unknown[]){
          const value=invoke(callback as (...args:unknown[])=>unknown,this,...args);
          if(value&&typeof (value as Promise<unknown>).then==='function'){
            const task=Promise.resolve(value);task.catch(()=>{});pending.push(task);
          }
          return value;
        }:callback);
      }});
    }
  }
  if (!document.getElementById('toast')) {
    const toast = document.createElement('div'); toast.id = 'toast'; document.body.appendChild(toast);
  }
  Object.assign(window, { TextEncoder, TextDecoder, structuredClone });
  for (const library of payload.libraries || []) {
    const browserBundles:Record<string,string>={
      '@keeex/qrcodejs-kx':'@keeex/qrcodejs-kx/qrcode.min.js',
      'jsbarcode':'jsbarcode/dist/JsBarcode.all.js',
    };
    if(browserBundles[library]){evaluate(readFileSync(require.resolve(browserBundles[library]),'utf8'));continue;}
    if(library==='chart.js'){
      evaluate(readFileSync(resolve(dirname(require.resolve('chart.js')),'chart.umd.js'),'utf8'));
      evaluate('Chart.defaults.animation=false;Chart.defaults.responsive=false;');
      continue;
    }
    if(library==='pdfjs-dist'){
      const native=require('@napi-rs/canvas');
      for(const key of ['DOMMatrix','Path2D','ImageData'])if(!(key in globalThis))Object.assign(globalThis,{[key]:native[key]});
      const pdfjs=require('pdfjs-dist/legacy/build/pdf.js');
      Object.defineProperty(pdfjs.GlobalWorkerOptions,'workerSrc',{configurable:true,get:()=>require.resolve('pdfjs-dist/legacy/build/pdf.worker.js'),set:()=>{}});
      const factory={
        create:(width:number,height:number)=>{const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;return{canvas,context:canvas.getContext('2d')};},
        reset:(target:{canvas:HTMLCanvasElement},width:number,height:number)=>{target.canvas.width=width;target.canvas.height=height;},
        destroy:(target:{canvas:HTMLCanvasElement})=>{target.canvas.width=0;target.canvas.height=0;},
      };
      Object.assign(window,{pdfjsLib:{...pdfjs,getDocument:(options:Record<string,unknown>)=>pdfjs.getDocument({...options,canvasFactory:factory,standardFontDataUrl:resolve(dirname(require.resolve('pdfjs-dist/package.json')),'standard_fonts')+'/'})}});
      continue;
    }
    const module = require(library);
    const globals: Record<string, () => object> = {
      'js-yaml': () => ({ jsyaml: { ...module, dump: (value: unknown, options: unknown) => module.dump(JSON.parse(JSON.stringify(value)), options) } }), 'marked': () => ({ marked: module.marked }),
      'dompurify': () => ({ DOMPurify: module(window) }), 'diff': () => ({ Diff: module }),
      'mathjs': () => ({ math: module }), 'acorn': () => ({ acorn: module }),
      'js-beautify': () => ({ js_beautify: module.js, html_beautify: module.html, css_beautify: module.css }),
      'terser': () => ({ Terser: module }), 'pinyin-pro': () => ({ pinyinPro: module }),
      'bcryptjs': () => ({ dcodeIO: { bcrypt: module }, bcrypt: module }),
      'crypto-js': () => ({ CryptoJS: module }),
      'source-map': () => ({ sourceMap: module }),
      'qrcode-generator': () => ({qrcode:module}),
      'katex': () => ({katex:module}),
      'openpgp': () => ({openpgp:module}),
      'pdf-lib': () => ({PDFLib:module}),
      'xlsx': () => ({XLSX:{...module,read:(data:unknown,options:unknown)=>module.read(Object.prototype.toString.call(data)==='[object ArrayBuffer]'?Buffer.from(data as ArrayBuffer):data,options)}}),
      'sql.js': () => ({initSqlJs:()=>{const task=module({locateFile:()=>require.resolve('sql.js/dist/sql-wasm.wasm')});pending.push(task);return task;}}),
      'jszip': () => ({JSZip:class extends module {
        generateAsync(options:Record<string,unknown>,callback:unknown){
          return super.generateAsync({...options,type:options.type==='blob'?'uint8array':options.type},callback).then((data:Uint8Array)=>options.type==='blob'?new window.Blob([data as BlobPart],{type:'application/zip'}):data);
        }
      }}),
    };
    // Only install the requested module; avoid initializing unrelated libraries.
    if (!globals[library]) throw new Error(`未适配依赖: ${library}`);
    Object.assign(window, globals[library]());
  }
  window.matchMedia = ((query: string) => ({ matches: false, media: query, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return true; } })) as typeof window.matchMedia;
  window.HTMLElement.prototype.scrollIntoView = () => {};
  const clickHandlers = new WeakMap<EventTarget, EventListenerOrEventListenerObject[]>();
  const originalAdd = window.EventTarget.prototype.addEventListener;
  window.EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (type === 'click' && listener) {
      const handlers = clickHandlers.get(this) || [];
      handlers.push(listener); clickHandlers.set(this, handlers);
    } else if (listener) {
      originalAdd.call(this, type, function(this: EventTarget, event: Event) {
        const result: unknown = typeof listener === 'function' ? invoke(listener,this,event) : invoke(listener.handleEvent,listener,event);
        if (result && typeof (result as Promise<unknown>).then === 'function') pending.push(Promise.resolve(result));
      }, options);
    } else originalAdd.call(this, type, listener, options);
  };
  const click = async (element: HTMLElement) => {
    const event = new window.MouseEvent('click');
    Object.defineProperty(event, 'target', { value: element });
    if (element.onclick) await (element.onclick as (event: Event) => unknown).call(element, event);
    for (const listener of clickHandlers.get(element) || []) {
      if (typeof listener === 'function') await invoke(listener,element,event);
      else await invoke(listener.handleEvent,listener,event);
    }
  };
  function inlineHandler(element:Element,type:string,event:Event) {
    const inline=element.getAttribute('on'+type);
    if(!inline || Reflect.get(element,'on'+type))return;
    Object.defineProperty(event,'target',{value:element,configurable:true});
    const code=inline.trim().replace(/;$/,'');
    const expression=!/[;{}]/.test(code)&&!/^(if|for|while|let|const|var|return|switch|try|throw|function)\b/.test(code);
    const value=invoke(window.Function('event',expression?`return (${code})`:inline) as (...args:never[])=>unknown,element,event);
    if(value&&typeof (value as Promise<unknown>).then==='function')pending.push(Promise.resolve(value));
  }
  Object.assign(window, {
    __cliClick: (id: string) => click(document.getElementById(id)!),
    __cliClickSelector: (selector: string) => click(document.querySelector(selector)!),
    __cliInput: (includeFiles=true) => {
      for (const field of activeFields.filter(field=>includeFiles||field.type!=='file')) {
        const element = document.querySelector(field.selector)!;
        for (const type of ['input','change']) {
          const event = new window.Event(type, { bubbles: true });
          inlineHandler(element,type,event);
          element.dispatchEvent(event);
        }
      }
    },
    __cliFiles: () => {
      for(const field of activeFields.filter(field=>field.type==='file')) {
        const element=document.querySelector(field.selector)!;
        const event=new window.Event('change',{bubbles:true});
        inlineHandler(element,'change',event);
        element.dispatchEvent(event);
      }
    },
  });
  for(const method of ['readAsDataURL','readAsArrayBuffer','readAsText','readAsBinaryString'] as const) {
    const original = window.FileReader.prototype[method];
    Object.defineProperty(window.FileReader.prototype,method,{value:function(this:FileReader,...args:unknown[]){
      pending.push(new Promise<void>((resolve,reject)=>{
        this.addEventListener('loadend',()=>this.error?reject(this.error):resolve(),{once:true});
      }));
      return (original as (...args:unknown[])=>unknown).apply(this,args);
    }});
  }
  Object.assign(window.Blob.prototype,{
    arrayBuffer:function(this:Blob){const task=new Promise<ArrayBuffer>((resolve,reject)=>{const reader=new window.FileReader();reader.onload=()=>resolve(reader.result as ArrayBuffer);reader.onerror=()=>reject(reader.error);reader.readAsArrayBuffer(this);});pending.push(task);return task;},
    text:function(this:Blob){const task=new Promise<string>((resolve,reject)=>{const reader=new window.FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(reader.error);reader.readAsText(this);});pending.push(task);return task;},
  });
  window.HTMLAnchorElement.prototype.click=function(){
    const href=this.href;
    if(!href.startsWith('blob:')&&!href.startsWith('data:'))throw new Error('此下载依赖远程地址，离线命令不支持');
    const reader = canvas.readURL(href).then(data=>{
      let output=document.getElementById('download') as HTMLTextAreaElement|null;
      if(!output){output=document.createElement('textarea');output.id='download';output.readOnly=true;document.body.appendChild(output);}
      output.value=data;
    });
    pending.push(reader);
  };
  const subtle = new Proxy(webcrypto.subtle, { get(target, key) {
    const value = Reflect.get(target,key,target);
    if (typeof value !== 'function') return value;
    return (...args: unknown[]) => {
      const operation = value.apply(target,args) as Promise<unknown>;
      pending.push(operation);
      return operation;
    };
  }});
  Object.defineProperty(window, 'crypto', { value: {
    subtle, getRandomValues: webcrypto.getRandomValues.bind(webcrypto), randomUUID: webcrypto.randomUUID.bind(webcrypto),
  } });
  window.alert = (message: unknown) => { alerts.push(String(message)); };
  window.confirm = () => false;
  window.prompt = () => { throw new Error('交互式 prompt 不支持，请使用命令行参数'); };
  window.open = () => { throw new Error('此操作需要浏览器，不属于无界面工具'); };
  const blocked = () => { throw new Error('该工具请求网络，当前离线适配器不支持'); };
  Object.assign(window, { fetch: payload.network ? (...args: Parameters<typeof fetch>)=>{
    const operation=(options.fetch || globalThis.fetch)(args[0],{...args[1],signal:args[1]?.signal || AbortSignal.timeout(5000)}).then(response=>new Proxy(response,{get(target,key){
      const value=Reflect.get(target,key,target);
      if(typeof value!=='function')return value;
      return (...values:unknown[])=>{
        const result=value.apply(target,values);
        if(result && typeof result.then==='function')pending.push(result);
        return result;
      };
    }}));
    pending.push(operation);return operation;
  }:blocked, WebSocket: blocked, XMLHttpRequest: blocked, AbortController, AbortSignal, Headers, Request, Response });
  // Debounced computations run once without waiting for presentation delays.
  let nextTimer = 1;
  const timers = new Map<number, { callback: unknown; args: unknown[] }>();
  window.setTimeout = ((callback: unknown, _delay?: number, ...args: unknown[]) => {
    const id = nextTimer++; timers.set(id, {callback,args}); return id;
  }) as typeof window.setTimeout;
  window.clearTimeout = ((id: number) => { timers.delete(id); }) as typeof window.clearTimeout;
  window.setInterval = (() => 0) as typeof window.setInterval;
  window.requestAnimationFrame = () => 0;
  console.on('jsdomError', (error: Error) => messages.push(error.message));
  function evaluate(code: string) {
    return new Script(code).runInContext(context, { timeout: 2000 });
  }
  function flushTimers() {
    for (let count = 0; timers.size; count++) {
      if (count >= 64) throw new Error('该操作依赖持续计时或动画，无法作为一次性命令执行');
      const [id, timer] = timers.entries().next().value!;
      timers.delete(id);
      Object.assign(window, { __cliTimerCallback: timer.callback, __cliTimerArguments: timer.args });
      const value = typeof timer.callback === 'string' ? evaluate(timer.callback) : evaluate('__cliTimerCallback.apply(window,__cliTimerArguments)');
      if (value && typeof value.then === 'function') pending.push(value);
    }
  }
  function snapshot() {
    const values: Record<string, string> = {};
    for (const el of document.querySelectorAll('[id]')) {
      if (el.closest('script, style, nav, header, footer') || el.matches('button, select')) continue;
      const key = el.id;
      const value = el.matches('canvas') ? (canvas.hasCanvas(el as HTMLCanvasElement) ? (el as HTMLCanvasElement).toDataURL() : '') : el.matches('img') ? canvas.imageData(el as HTMLImageElement) : el.matches('svg') ? el.outerHTML : el.matches('textarea,input') ? (el as HTMLInputElement).value : ((el as HTMLElement).innerText ?? el.textContent ?? '') || el.querySelector('svg')?.outerHTML || '';
      values[key] = el.matches('textarea,input') ? value : value.replace(/\u00a0/g, ' ').trim();
    }
    return values;
  }
  const baseline = snapshot();
  let activeFields: Tool['fields'] = [];
  function setFields(tool: Tool, values: Record<string, string | boolean>, allowMissing = false) {
    activeFields = tool.fields.filter(field => values[field.name] !== undefined);
    for (const field of tool.fields) {
      const element = document.querySelector(field.selector) as HTMLInputElement | null;
      if (!element) { if (allowMissing) continue; throw new Error(`找不到输入字段: ${field.name}`); }
      const value = values[field.name] ?? field.default;
      if (field.type === 'file') {
        const paths = value ? (String(value).startsWith('[') ? JSON.parse(String(value)) as string[] : [String(value)]) : [];
        const mime:Record<string,string>={'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.gif':'image/gif','.pdf':'application/pdf','.csv':'text/csv','.json':'application/json','.txt':'text/plain'};
        const files=paths.map(path=>new window.File([readFileSync(path)],basename(path),{type:mime[extname(path).toLowerCase()]||'application/octet-stream'}));
        Object.defineProperty(element,'files',{value:files,configurable:true});
      } else if (field.type === 'checkbox') element.checked = value === true || value === 'true';
      else if (field.type === 'radio') {
        for (const radio of document.querySelectorAll(field.selector)) {
          (radio as HTMLInputElement).checked = (radio as HTMLInputElement).value === String(value);
        }
      } else element.value = String(value);
    }
  }
  async function settle(extra?: unknown) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let stopped=false;
    try {
      await Promise.race([(async()=>{
        let completion:Promise<boolean>|undefined;
        let previousCount=-1;
        while(!stopped) {
          flushTimers();
          const count=pending.length;
          if(!completion||count!==previousCount){completion=Promise.all([...pending,extra]).then(()=>true);previousCount=count;}
          let tick:ReturnType<typeof setTimeout>|undefined;
          let done:boolean;
          try{done=await Promise.race([completion,new Promise<boolean>(resolve=>{tick=setTimeout(()=>resolve(false),1);})]);}finally{clearTimeout(tick);}
          flushTimers();
          await Promise.resolve();
          if(done&&count===pending.length)return;
        }
      })(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('执行超过 5 秒')),5000);})]);
    }finally{stopped=true;clearTimeout(timer);}
  }
  return {
    dom, document, evaluate, baseline, snapshot, setFields, messages, alerts, written, pending, flushTimers, settle,
    initialize() {
      evaluate(payload.script);
      // Event-driven tools frequently attach computation during DOMContentLoaded.
      document.dispatchEvent(new window.Event('DOMContentLoaded'));
      if (messages.length) throw new Error(messages.join('; '));
    },
    close() { window.close(); },
  };
}

export async function runTool(tool: Tool, payload: Payload, actionName: string, values: Record<string, string | boolean>, options: ExecutionOptions = {}): Promise<Result> {
  const action = tool.actions.find(item => item.name === actionName);
  if (!action) throw new Error(`未知操作 ${actionName}；可用操作: ${tool.actions.map(item => item.name).join(', ')}`);
  const execution = createExecution(payload, options);
  const settle=execution.settle;

  try {
    execution.setFields(tool, values, true);
    execution.initialize();
    execution.flushTimers();
    await settle();
    // Initialization sometimes resets inputs. Explicit CLI arguments take priority.
    execution.setFields(tool, values);
    if(tool.fields.some(field=>field.type==='file'&&values[field.name])){
      execution.evaluate('__cliFiles()');
      await settle();
    }
    execution.evaluate('__cliInput(false)');
    await settle();
    const beforeAction = execution.snapshot();
    execution.written.clear();
    const returned = execution.evaluate(action.expression);
    execution.flushTimers();
    await settle(returned);
    if (execution.messages.length) throw new Error(execution.messages.join('; '));
    await Promise.resolve();
    const alertError = execution.alerts.find(message => /请输入|无效|失败|错误|不支持|不能|必须|请先/.test(message));
    if (alertError) throw new Error(alertError);
    const after = execution.snapshot();
    const results: Record<string, string> = {};
    const errors: string[] = [];
    for (const [key, value] of Object.entries(after)) {
      const element = execution.document.getElementById(key)!;
      const editable = element.matches('input:not([readonly]),textarea:not([readonly])') && !/output|result/i.test(key);
      if (editable && value === beforeAction[key] && !execution.written.has(key) && !action.outputs?.includes(key)) continue;
      if (!editable && value === beforeAction[key] && !action.outputs?.includes(key) && !execution.written.has(key)) continue;
      if (!value && !action.outputs?.includes(key)) continue;
      if ((element.classList.contains('error') || element.classList.contains('invalid') || /^(error|errorMsg|errorMessage)$/i.test(key)) && value) errors.push(value);
      // Keep the innermost named result to avoid repeating a result container.
      if ([...element.querySelectorAll('[id]')].some(child => (after[child.id] !== beforeAction[child.id] || execution.written.has(child.id)) && after[child.id])) continue;
      if (/theme|toast|status|inputCount|outputCount/i.test(key)) continue;
      results[key] = value;
    }
    if (errors.length) throw new Error([...new Set(errors)].join('; '));
    if (!Object.keys(results).length && ['string','number','bigint','boolean'].includes(typeof returned)) results.value = String(returned);
    if (!Object.keys(results).length && /^(validate|check)/.test(action.name)) {
      const status = execution.document.getElementById('status');
      if (status?.textContent && execution.written.has('status')) results.status = status.textContent.trim();
    }
    if (!Object.keys(results).length) {
      const status = execution.document.querySelector('#status, #error, .error-message');
      throw new Error(status?.textContent?.trim() || '原工具没有产生可输出的结果，请检查参数');
    }
    return { tool: tool.id, action: action.name, results };
  } finally {
    // Initializers can start WebCrypto work without returning their promise.
    // Let its continuations finish before releasing the document.
    let cleanupTimer: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([Promise.allSettled(execution.pending),new Promise(resolve=>{cleanupTimer=setTimeout(resolve,100);})]);
    } finally {clearTimeout(cleanupTimer);}
    execution.close();
  }
}
