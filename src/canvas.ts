import { createCanvas, loadImage, type Canvas, type Image } from '@napi-rs/canvas';
import type { DOMWindow } from 'jsdom';

/** Native Canvas adapter. Only local data URLs are decoded; no HTTP loading. */
export function installCanvas(window: DOMWindow, pending: Promise<unknown>[], written: Set<string>) {
  Object.assign(window,{CanvasRenderingContext2D:createCanvas(1,1).getContext('2d').constructor});
  const canvases = new WeakMap<HTMLCanvasElement, Canvas>();
  const images = new WeakMap<HTMLImageElement, Image>();
  const imageData = new WeakMap<HTMLImageElement,string>();
  const blobURLs = new Map<string, Blob>();
  const contexts = new WeakMap<Canvas, CanvasRenderingContext2D>();
  Object.assign(window.URL,{
    createObjectURL:(blob:Blob)=>{const url=`blob:html-tools/${blobURLs.size+1}`;blobURLs.set(url,blob);return url;},
    revokeObjectURL:(url:string)=>{blobURLs.delete(url);},
  });
  function readURL(url:string):Promise<string>{
    if(url.startsWith('data:'))return Promise.resolve(url);
    const blob=blobURLs.get(url);
    if(!blob)return Promise.reject(new Error('找不到本地导出文件'));
    return new Promise((resolve,reject)=>{const reader=new window.FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(reader.error);reader.readAsDataURL(blob);});
  }
  const nativeCanvas = (element: HTMLCanvasElement) => {
    let canvas = canvases.get(element);
    if (!canvas) { canvas = createCanvas(element.width || 300,element.height || 150); canvases.set(element,canvas); }
    return canvas;
  };
  for (const key of ['width','height'] as const) {
    const descriptor=Object.getOwnPropertyDescriptor(window.HTMLCanvasElement.prototype,key)!;
    Object.defineProperty(window.HTMLCanvasElement.prototype,key,{...descriptor,set(this:HTMLCanvasElement,value:number){
      descriptor.set!.call(this,value);
      const canvas=canvases.get(this);
      if(canvas)canvas[key]=this[key] || 1;
      if(this.id)written.add(this.id);
    }});
  }
  window.HTMLCanvasElement.prototype.getContext = function(this:HTMLCanvasElement,kind:string) {
    if(kind!=='2d')throw new Error(`无界面 Canvas 只支持 2d，收到 ${kind}`);
    const canvas=nativeCanvas(this);
    let context=contexts.get(canvas);
    if(!context){
      const target=canvas.getContext('2d');
      const element=this;
      context=new Proxy(target,{get(object,key){
        if(key==='canvas')return element;
        const value=Reflect.get(object,key,object);
        if(typeof value!=='function')return value;
        return (...args:unknown[])=>{
          if(key==='drawImage') {
            const source=args[0];
            if(source instanceof window.HTMLCanvasElement)args[0]=nativeCanvas(source as unknown as HTMLCanvasElement);
            else if(source instanceof window.HTMLImageElement){
              const image=images.get(source as unknown as HTMLImageElement);
              if(!image)throw new Error('图片尚未加载或不属于受支持的本地图片');
              args[0]=image;
            }
          }
          if(element.id && !/^(measure|get|is|create)/.test(String(key)))written.add(element.id);
          return value.apply(object,args);
        };
      },set(object,key,value){return Reflect.set(object,key,value,object);}}) as unknown as CanvasRenderingContext2D;
      contexts.set(canvas,context);
    }
    return context;
  } as typeof window.HTMLCanvasElement.prototype.getContext;
  window.HTMLCanvasElement.prototype.toDataURL=function(this:HTMLCanvasElement,type?:string,quality?:number){
    const canvas=nativeCanvas(this);
    if(type==='image/jpeg')return canvas.toDataURL('image/jpeg',Math.round((quality ?? 0.92)*100));
    if(type==='image/webp')return canvas.toDataURL('image/webp',Math.round((quality ?? 0.8)*100));
    return canvas.toDataURL('image/png');
  };
  window.HTMLCanvasElement.prototype.toBlob=function(this:HTMLCanvasElement,callback:BlobCallback,type?:string,quality?:number){
    const data=this.toDataURL(type,quality).split(',')[1];
    callback(new window.Blob([Buffer.from(data,'base64')],{type:type||'image/png'}));
  };
  const src=Object.getOwnPropertyDescriptor(window.HTMLImageElement.prototype,'src')!;
  Object.defineProperty(window.HTMLImageElement.prototype,'src',{...src,set(this:HTMLImageElement,value:string){
    src.set!.call(this,value);
    if(!value)return;
    if(!value.startsWith('data:')&&!blobURLs.has(value)) throw new Error('图像适配仅支持本地文件和 data URL');
    const element=this;
    const data=readURL(value);
    const task=data.then(async url=>{
      const dataURL=url.match(/^data:([^,]*),(.*)$/s);
      const image=await loadImage(dataURL&&!/;base64/i.test(dataURL[1])?Buffer.from(decodeURIComponent(dataURL[2]),'utf8'):url);
      imageData.set(element,url);return image;
    }).then(image=>{
      images.set(element,image);
      for(const key of ['width','height','naturalWidth','naturalHeight'] as const){
        const dimension=key.toLowerCase().includes('width')?image.width:image.height;
        Object.defineProperty(element,key,{value:dimension,writable:true,configurable:true});
      }
      Object.defineProperty(element,'complete',{value:true,configurable:true});
      element.dispatchEvent(new window.Event('load'));
    }).catch(error=>{element.dispatchEvent(new window.Event('error'));throw error;});
    pending.push(task);
    if(element.id)written.add(element.id);
  }});
  Object.assign(window,{ImageData:requireImageData()});
  return { hasCanvas:(element:HTMLCanvasElement)=>canvases.has(element), imageData:(element:HTMLImageElement)=>imageData.get(element)||'',readURL };
}
// Keep the native constructor used by putImageData/createImageData compatible.
import {ImageData as NativeImageData} from '@napi-rs/canvas';
function requireImageData(){return NativeImageData;}
