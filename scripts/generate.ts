import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { JSDOM } from 'jsdom';
import ts from 'typescript';
import {createCanvas} from '@napi-rs/canvas';
import {PDFDocument} from 'pdf-lib';
import XLSX from 'xlsx';
import { runTool, createExecution } from '../src/engine.ts';
import type { Tool, Field, Action, Payload } from '../src/types.ts';

const root = resolve(import.meta.dirname, '..');
const sourceRoot = resolve(root, 'html-tools');
const data = JSON.parse(readFileSync(resolve(sourceRoot, 'tools.json'), 'utf8'));
const sampleOverrides: Record<string, Record<string, string | boolean>> = JSON.parse(readFileSync(resolve(root,'scripts/samples.json'),'utf8'));
const tools: Tool[] = [];
const networkFixture:typeof fetch=async()=>new Response(JSON.stringify({ok:true,ip:'203.0.113.1',query:'203.0.113.1',city:'Example City',country_name:'Example',country:'EX',region:'Example',org:'Example',timezone:'Etc/UTC',Status:0,Answer:[{name:'example.com',type:1,TTL:300,data:'203.0.113.1'}]}),{status:200,headers:{'Content-Type':'application/json'}});
const kebab = (value: string) => value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').replace(/[_\s]+/g, '-').toLowerCase();
const uiAction = /^(toggle|show|hide|copy|paste|clear|reset|load|save|download|export|import|add|remove(?!Duplicates)|delete|select|switch|set|updateTheme|initTheme|start|stop|pause|resume|play|draw)/i;
const computation = /^(calc|calculate|convert|encode|decode|generate|process|format|compress|minify|beautify|validate|check|analyze|analyse|parse|extract|sort|dedup|clean|transform|solve|compute|evaluate|count|compare|hash|encrypt|decrypt|reverse|replace|escape|unescape|normalize|split|merge|test|search|filter|query|run|build|translate|rotate|shuffle|randomize|update|mix|repeat|truncate|fill|balance|toPunycode|removeDuplicates|jsonTo|yamlTo|xmlTo|htmlTo|textTo|tsTo|dateTo|detect|aggregate|sample|mask|flatten|unflatten|factorize|defang|refang|roman|lookup|send|render$)/i;
const skipCategory = new Set(['game', 'ai-coding']);
const interactiveTools=new Set(['food/meal-planner','life/todo-list','life/bookmark-manager','life/expense-tracker','life/clipboard-history','life/multi-counter','life/quick-notes','health/medication-reminder','productivity/habit-tracker','life/habit-tracker','life/habit-tracker-checkin','travel/itinerary-planner','office/task-tracker','travel/baggage-tracker','pets/feeding-schedule','fitness/workout-logger','gardening/watering-schedule','dev/clipboard-viewer','dev/keycode','dev/keyboard-tester']);

function extractFields(document: Document): Field[] {
  const fields: Field[] = [];
  const names = new Set<string>();
  for (const node of document.querySelectorAll('input, textarea, select')) {
    const el = node as HTMLInputElement;
    const type = el.type || el.tagName.toLowerCase();
    if (el.readOnly || ['hidden','button','submit','reset','image'].includes(type)) continue;
    if (el.closest('nav,header,footer') || /search-tools|searchInput|globalSearch/.test(el.id)) continue;
    if (/^(output|result|out)(Text|Area|put|Code|Json|Html|Base64)?$/i.test(el.id)) continue;
    const key = type === 'radio' ? el.name : el.id || el.name || el.getAttribute('data-field') || el.getAttribute('data-key') || el.classList[0] || `field-${fields.length+1}`;
    if (!key) continue;
    let name = kebab(key);
    if (['help', 'json', 'input-file', 'output-file', 'params', 'timeout'].includes(name)) name = 'field-' + name;
    if (names.has(name) && type==='radio') continue;
    if (names.has(name)) { let index=2; while(names.has(`${name}-${index}`))index++; name+=`-${index}`; }
    names.add(name);
    let path:Element|null=el;const segments:string[]=[];
    while(path&&!path.id){const siblings=[...(path.parentElement?.children||[])].filter(child=>child.tagName===path!.tagName);segments.unshift(`${path.tagName.toLowerCase()}:nth-of-type(${siblings.indexOf(path)+1})`);path=path.parentElement;}
    if(path?.id)segments.unshift(`[id=${JSON.stringify(path.id)}]`);
    const selector = type === 'radio' ? `input[type="radio"][name=${JSON.stringify(el.name)}]` : el.id?`[id=${JSON.stringify(el.id)}]`:segments.join(' > ');
    const labelEl = [...document.querySelectorAll('label')].find(item => item.htmlFor === el.id);
    const label = (labelEl?.textContent || el.closest('label')?.textContent || el.parentElement?.querySelector('label')?.textContent || el.placeholder || el.id || el.name || key).replace(/\s+/g, ' ').trim().slice(0,180);
    const field: Field = { name, selector, label, type, default: type === 'checkbox' ? el.checked : el.value };
    if (type === 'radio') {
      const options = [...document.querySelectorAll(selector)] as HTMLInputElement[];
      field.choices = options.map(radio => ({ value: radio.value, label: radio.closest('label')?.textContent?.trim() || radio.value }));
      field.default = options.find(radio => radio.checked)?.value || options[0]?.value || '';
    } else if (el.tagName === 'SELECT') {
      field.choices = [...(el as unknown as HTMLSelectElement).options].map(option => ({ value: option.value, label: option.textContent?.trim() || option.value }));
    }
    if (el.min) field.min = el.min;
    if (el.max) field.max = el.max;
    if(type==='file'){field.accept=el.accept;field.multiple=el.multiple;}
    fields.push(field);
  }
  return fields;
}

function extractActions(document: Document, script: string): Action[] {
  const actions: Action[] = [];
  const seen = new Set<string>();
  const canExport=Boolean(document.querySelector('input[type=file],canvas'));
  const eligible=(name:string)=>computation.test(name)&&!uiAction.test(name)||canExport&&/^download/.test(name);
  const commandName=(name:string)=>/^download/.test(name)?kebab(name.replace(/^download/,'export')):kebab(name);
  function add(name: string, label: string, expression: string) {
    if (seen.has(expression) || actions.some(item => item.name === name)) return;
    seen.add(expression); actions.push({name, label: label.trim().replace(/\s+/g, ' ').slice(0,100), expression});
  }
  for (const button of document.querySelectorAll('[onclick],button[id],input[type=button][id]')) {
    if (button.closest('nav,header,footer')) continue;
    const code = button.getAttribute('onclick');
    if (code) {
      const match = code.trim().match(/^(?:window\.)?([\w$]+)\(\s*((?:'[^']*'|"[^"]*"|[\d.\-,\s]|true|false)*)\s*\);?$/);
      if (match && eligible(match[1])) {
        const suffix = [...match[2].matchAll(/['"]([^'"]+)['"]/g)].map(item => kebab(item[1])).join('-');
        add(commandName(match[1]) + (suffix ? '-' + suffix : ''), button.textContent || match[1], code);
      }
    } else if (button.id && computation.test(button.id.replace(/^(btn|button)[-_]?/i,'')) && !/copy|paste|clear|reset|load|save|download|export|import|theme|swap|add|remove|example|sample|share/i.test(button.id)) {
      add(kebab(button.id.replace(/^(btn|button)[-_]?/i,'')) || 'run', button.textContent || button.id, `__cliClick(${JSON.stringify(button.id)})`);
    }
  }
  for (const button of document.querySelectorAll('button[data-mode],button[data-action],button[data-type]')) {
    const attr = ['data-mode','data-action','data-type'].find(name => button.hasAttribute(name))!;
    const mode = button.getAttribute(attr)!;
    if (/copy|paste|clear|reset|load|save|download|export|import|theme|swap|add|remove|sample|share/i.test(mode)) continue;
    if (!/^[\w-]+$/.test(mode)) continue;
    add(kebab(mode), button.textContent || mode, `__cliClickSelector(${JSON.stringify(`button[${attr}=${JSON.stringify(mode)}]`)})`);
  }
  const ast = ts.createSourceFile('source.js', script, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  function walk(node: ts.Node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer && (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer)) && !node.initializer.parameters.length && computation.test(node.name.text) && !uiAction.test(node.name.text)) {
      if (ts.isVariableDeclarationList(node.parent) && ts.isVariableStatement(node.parent.parent) && ts.isSourceFile(node.parent.parent.parent)) add(kebab(node.name.text), node.name.text, `${node.name.text}()`);
    }
    if (ts.isFunctionDeclaration(node) && node.name && node.parameters.length === 0 && eligible(node.name.text)) {
      // Only top-level functions: nested helpers are not CLI operations.
      if (ts.isSourceFile(node.parent)) add(commandName(node.name.text), node.name.text, `${node.name.text}()`);
    }
    if (ts.isBinaryExpression(node) && ts.isPropertyAccessExpression(node.left) && node.left.expression.getText(ast) === 'window' && (ts.isFunctionExpression(node.right) || ts.isArrowFunction(node.right)) && !node.right.parameters.length) {
      const name = node.left.name.text;
      if (eligible(name)) add(commandName(name), name, `window.${name}()`);
    }
    ts.forEachChild(node, walk);
  }
  walk(ast);
  if (/addEventListener\(\s*["'](?:input|change)["']/.test(script) || document.querySelector('[oninput],[onchange]')) {
    add('run','按字段输入重新计算','__cliInput()');
  }
  return actions;
}

function sampleFor(tool: Tool): Record<string, string | boolean> {
  const sample: Record<string, string | boolean> = {};
  for (const field of tool.fields) {
    let value: string | boolean = field.default;
    if (field.type === 'checkbox') { sample[field.name] = value; continue; }
    if (value !== '') { sample[field.name] = value; continue; }
    if (field.choices?.length) value = field.choices.find(option => option.value !== '')?.value || '';
    else if (field.type === 'number' || field.type === 'range') value = String(Math.max(Number(field.min || 0), Math.min(Number(field.max || 100), 10)));
    else if (field.type === 'file') value = `generated/fixtures/sample.${/pdf/.test(tool.id)?'pdf':/excel/.test(tool.id)?'xlsx':/svg/.test(tool.id)?'svg':/csv/.test(tool.id)?'csv':/po-file/.test(tool.id)?'po':/har/.test(tool.id)?'har':/image|media|photo|exif|ico|pixel|favicon|sprite|color/.test(tool.id)?'png':'txt'}`;
    else if (field.type === 'date') value = '2025-01-01';
    else if (field.type === 'datetime-local') value = '2025-01-01T12:00';
    else if (field.type === 'time') value = '12:00';
    else if (field.type === 'color') value = '#336699';
    else if (/json/.test(tool.id)) value = '{"name":"Alice","count":2}';
    else if (/url|link|domain|website/.test(field.name)) value = 'https://example.com/path?a=1';
    else if (/email/.test(field.name)) value = 'alice@example.com';
    else if (/ip/.test(field.name)) value = '192.168.1.1';
    else if (/pattern|regex/.test(field.name)) value = '\\w+';
    else if (/csv/.test(tool.id)) value = 'name,age\nAlice,25\nBob,30';
    else value = 'Hello world\nHello world\nTypeScript';
    sample[field.name] = value;
  }
  return sample;
}

mkdirSync(resolve(root, 'generated/tools'), {recursive:true});
mkdirSync(resolve(root, 'generated/ports'), {recursive:true});
mkdirSync(resolve(root, 'generated/fixtures'), {recursive:true});
const fixture=createCanvas(64,48);const fixtureContext=fixture.getContext('2d');fixtureContext.fillStyle='#336699';fixtureContext.fillRect(0,0,64,48);fixtureContext.fillStyle='#ffcc00';fixtureContext.fillRect(16,12,24,20);
writeFileSync(resolve(root,'generated/fixtures/sample.png'),fixture.toBuffer('image/png'));
const pdf=await PDFDocument.create();pdf.addPage([160,120]).drawText('html-tools fixture',{x:10,y:60,size:10});writeFileSync(resolve(root,'generated/fixtures/sample.pdf'),await pdf.save());
const workbook=XLSX.utils.book_new();XLSX.utils.book_append_sheet(workbook,XLSX.utils.json_to_sheet([{name:'Alice',age:25},{name:'Bob',age:30}]),'Sheet1');XLSX.writeFile(workbook,resolve(root,'generated/fixtures/sample.xlsx'));
writeFileSync(resolve(root,'generated/fixtures/sample.txt'),'Hello world\nHello world\nTypeScript');
writeFileSync(resolve(root,'generated/fixtures/sample.csv'),'name,age\nAlice,25\nBob,30');
writeFileSync(resolve(root,'generated/fixtures/sample.svg'),'<svg xmlns="http://www.w3.org/2000/svg" width="64" height="48"><rect width="64" height="48" fill="#336699"/></svg>');
writeFileSync(resolve(root,'generated/fixtures/sample.po'),'msgid "Hello"\nmsgstr "你好"\n');
writeFileSync(resolve(root,'generated/fixtures/sample.har'),JSON.stringify({log:{version:'1.2',creator:{name:'fixture',version:'1'},entries:[{startedDateTime:'2025-01-01T12:00:00.000Z',time:42,request:{method:'GET',url:'https://example.com/',headers:[],queryString:[],cookies:[],headersSize:0,bodySize:0},response:{status:200,statusText:'OK',httpVersion:'HTTP/1.1',headers:[],cookies:[],content:{size:5,mimeType:'text/plain',text:'hello'},redirectURL:'',headersSize:0,bodySize:5},cache:{},timings:{send:0,wait:40,receive:2}}]}}));
const sourceEntries = Object.values(data.tools) as {path:string;name:string;category:string;description:string}[];
for (const entry of sourceEntries) {
  writeFileSync(resolve(root,'generated/progress.json'),JSON.stringify({tool:entry.path,checked:tools.length}));
  const source = readFileSync(resolve(sourceRoot, entry.path), 'utf8');
  const dom = new JSDOM(source);
  const document = dom.window.document;
  let inline = [...document.querySelectorAll('script')].filter(el => !el.src && (!el.type || el.type === 'text/javascript' || el.type === 'module')).map(el => el.textContent || '').join('\n;\n');
  const adaptations:string[]=[];
  if(entry.path==='tools/media/color-extractor.html'){
    const original=`const used = new Set();
        while (centroids.length < count && centroids.length < pixels.length) {
          const idx = Math.floor(Math.random() * pixels.length);
          const key = pixels[idx].join(",");
          if (!used.has(key)) {
            used.add(key);
            centroids.push([...pixels[idx]]);
          }
        }`;
    if(!inline.includes(original))throw new Error('提色算法上游代码改变，请重新审核初始化修复');
    inline=inline.replace(original,`const available = [...new Map(pixels.map(pixel => [pixel.join(","), pixel])).values()];
        while (centroids.length < count && available.length) {
          const index = Math.floor(Math.random() * available.length);
          centroids.push([...available.splice(index, 1)[0]]);
        }`);
    adaptations.push('修复上游 K-means 初始化：等价的不放回随机抽样，避免少色图片死循环。');
  }
  const tool: Tool = {
    id: entry.path.replace(/^tools\//,'').replace(/\.html$/,''), name:entry.name,
    description:entry.description || entry.name, category:entry.category, source:entry.path,
    sha256:createHash('sha256').update(source).digest('hex'), status:'skipped', fields:extractFields(document), actions:[], sample:{},
    adaptations,
  };
  const external = [...document.querySelectorAll('script[src]')].map(el=>el.getAttribute('src')!).filter(src=>/^https?:/.test(src));
  const supportedLibraries = ['js-yaml','marked','dompurify','diff','mathjs','acorn','js-beautify','terser','pinyin-pro','bcryptjs','crypto-js','source-map','@keeex/qrcodejs-kx','qrcode-generator','jsbarcode','chart.js','pdf-lib','pdfjs-dist','jszip','katex','openpgp','sql.js','xlsx'];
  const libraries = [...new Set(external.map(url=>supportedLibraries.find(name=>new RegExp(`[/@]${name.replaceAll('.','\\.')}(?:[@/]|$)`).test(url))).filter(Boolean))] as string[];
  const unsupportedExternal = external.filter(url=>!libraries.some(name=>new RegExp(`[/@]${name.replaceAll('.','\\.')}(?:[@/]|$)`).test(url)));
  let reason: string | undefined;
  if (skipCategory.has(entry.category)) reason = entry.category === 'game' ? '小游戏，需要持续交互界面' : '资源导航或使用指南';
  else if(interactiveTools.has(tool.id))reason='依赖持久状态或多步界面交互，按迁移范围跳过';
  else if (!inline.trim()) reason = '静态文章、目录或参考页面，没有可迁移计算逻辑';
  else if (unsupportedExternal.length) reason = `原算法依赖外部脚本，尚需 Node.js 专项适配: ${unsupportedExternal.join(', ')}`;
  else if (/getUserMedia|MediaRecorder|SpeechRecognition|speechSynthesis|AudioContext|requestMIDIAccess|navigator\.geolocation|navigator\.bluetooth/.test(inline)) reason = '依赖摄像头、音频、定位或其他交互设备 API';
  const actions = extractActions(document, inline);
  let network=false;
  const networkAst=ts.createSourceFile('source.js',inline,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
  const inspectNetwork=(node:ts.Node)=>{if(ts.isCallExpression(node)&&['fetch','window.fetch'].includes(node.expression.getText(networkAst)))network=true;ts.forEachChild(node,inspectNetwork);};
  inspectNetwork(networkAst);tool.network=network;
  if (!reason && !actions.length) reason = '没有检测到可独立调用的无界面计算操作';
  document.querySelectorAll('script,style,link,meta').forEach(el=>el.remove());
  const payload: Payload = { html:document.documentElement.outerHTML, script:ts.transpileModule(inline,{compilerOptions:{target:ts.ScriptTarget.ES2016,module:ts.ModuleKind.None}}).outputText, libraries, network };
  if(!reason){
    const probe=createExecution(payload,{fetch:networkFixture});
    try{probe.initialize();await probe.settle();}catch{/* Field discovery does not declare an operation successful. */}
    finally{tool.fields=extractFields(probe.document);probe.close();}
  }
  tool.sample = sampleFor(tool);
  if (!reason) {
    const failures: string[] = [];
    const passed: Action[] = [];
    const outputKeys = new Set<string>();
    for (const action of actions) {
      tool.actions = [action];
      try {
        const sample = { ...tool.sample };
        if (/base64/.test(tool.id) && /decode/.test(action.name)) for (const field of tool.fields.filter(f=>f.name==='input')) sample[field.name]='SGVsbG8gd29ybGQ=';
        if (/ip-converter|ip-tools/.test(tool.id)) for (const field of tool.fields.filter(f=>/input|ip/.test(f.name) && !f.choices)) sample[field.name]='192.168.1.1';
        if (/jwt/.test(tool.id)) for (const field of tool.fields.filter(f=>/jwt|token|input/.test(f.name))) {
          const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString('base64url');
          sample[field.name]=`${encode({alg:'HS256',typ:'JWT'})}.${encode({sub:'123',name:'Alice'})}.signature`;
        }
        if (/http-header|header-analyzer/.test(tool.id)) for (const field of tool.fields.filter(f=>f.type==='textarea')) sample[field.name]='Content-Type: application/json\nCache-Control: no-cache';
        if (/cookie-parser/.test(tool.id)) for (const field of tool.fields.filter(f=>f.type==='textarea')) sample[field.name]='session=abc; theme=dark';
        if (/number-words|money-uppercase/.test(tool.id)) for (const field of tool.fields.filter(f=>f.type==='text' && !f.choices)) sample[field.name]='1234.56';
        if (/json/.test(tool.id) && /yaml-to-json/.test(action.name)) for (const field of tool.fields.filter(f=>f.type==='textarea')) sample[field.name]='name: Alice\ncount: 2';
        Object.assign(sample, sampleOverrides[tool.id]);
        action.sample = sample;
        const result = await runTool(tool, payload, action.name, sample,{fetch:networkFixture});
        if (Object.values(result.results).every(value=> /^[-—?\s]+$/.test(value))) throw new Error('只有空占位结果');
        passed.push(action);
        action.outputs = Object.keys(result.results);
        Object.keys(result.results).forEach(key=>outputKeys.add(key));
      } catch(error) { const message=error&&typeof error==='object'&&'message' in error?String(error.message):String(error);failures.push(`${action.name}: ${message.slice(0,200)}`); }
    }
    tool.actions = passed;
    if (passed.length) {
      tool.status = 'ready'; tool.outputs = [...outputKeys];
      // Algorithm source is preserved as TypeScript. The runtime payload uses
      // TypeScript's transpilation result, with the same statements and formulas.
      const port = `// @ts-nocheck\n// Generated from ${entry.path}\n// Source SHA-256: ${tool.sha256}\n// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong\n${inline}\n`;
      const portPath = resolve(root,'generated/ports',tool.id+'.ts');
      mkdirSync(dirname(portPath),{recursive:true}); writeFileSync(portPath,port);
      payload.script = ts.transpileModule(port,{compilerOptions:{target:ts.ScriptTarget.ES2016,module:ts.ModuleKind.None}}).outputText;
      const payloadPath = resolve(root,'generated/tools',tool.id+'.json');
      mkdirSync(dirname(payloadPath),{recursive:true}); writeFileSync(payloadPath,JSON.stringify(payload));
      if (failures.length) tool.reason = '部分原页面操作未通过迁移检查: ' + failures.join(' | ');
    } else reason = failures.join(' | ');
  }
  if (reason) { tool.reason = reason; tool.actions = []; }
  tools.push(tool);
  dom.window.close();
  if (tools.length % 100 === 0) console.log(`已检查 ${tools.length}/${sourceEntries.length}，可运行 ${tools.filter(t=>t.status==='ready').length}`);
}
writeFileSync(resolve(root,'generated/catalog.json'), JSON.stringify(tools,null,2)+'\n');
const ready = tools.filter(tool=>tool.status==='ready');
writeFileSync(resolve(root,'generated/summary.json'),JSON.stringify({total:tools.length,ready:ready.length,skipped:tools.length-ready.length,actions:ready.reduce((sum,t)=>sum+t.actions.length,0)},null,2)+'\n');
console.log(readFileSync(resolve(root,'generated/summary.json'),'utf8'));
unlinkSync(resolve(root,'generated/progress.json'));
