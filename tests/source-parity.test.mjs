import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
import {catalog,payload,runTool} from '../dist/index.js';
const tools=catalog();
const cases=[
  ['dev/base64','encode',{input:'你好 🌍'}],
  ['text/text-dedup','dedup',{input:'a\nb\na','keep-order':true}],
  ['calculator/percentage','calc1',{'calc1-x':'7','calc1-y':'13'}],
  ['math/quadratic-equation','solve',{a:'1',b:'-3',c:'2'}],
  ['dev/json-formatter','format',{input:'{"nested":{"value":3},"list":[1,2]}',indent:'4'}],
];
for(const [id,action,input] of cases)test(`generated TypeScript matches original script: ${id}`,async()=>{
  const tool=tools.find(tool=>tool.id===id);
  const original=readFileSync('html-tools/'+tool.source,'utf8');const dom=new JSDOM(original);
  const scripts=[...dom.window.document.scripts].filter(script=>!script.src&&(!script.type||script.type==='text/javascript')).map(script=>script.textContent).join('\n;\n');
  const migrated=payload(tool);
  const expected=await runTool(tool,{...migrated,script:scripts},action,input);
  const actual=await runTool(tool,migrated,action,input);
  assert.deepEqual(actual,expected);
  dom.window.close();
});
