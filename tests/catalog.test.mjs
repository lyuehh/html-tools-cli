import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
import {catalog,payload} from '../dist/index.js';
const tools=catalog();

test('catalog covers all 1088 upstream entries with unique command paths',()=>{
  const upstream=Object.values(JSON.parse(readFileSync('html-tools/tools.json','utf8')).tools);
  assert.equal(tools.length,upstream.length);
  assert.equal(new Set(tools.map(tool=>tool.id)).size,tools.length);
  for(const tool of tools){
    assert.equal(createHash('sha256').update(readFileSync('html-tools/'+tool.source)).digest('hex'),tool.sha256,tool.id);
    assert.ok(tool.status==='ready'||tool.reason,tool.id);
    if(tool.status==='ready'){
      assert.ok(tool.actions.length,tool.id);
      assert.equal(new Set(tool.fields.map(field=>field.name)).size,tool.fields.length,tool.id);
      assert.equal(new Set(tool.actions.map(action=>action.name)).size,tool.actions.length,tool.id);
      assert.ok(existsSync(`generated/ports/${tool.id}.ts`));
      assert.ok(payload(tool).script);
      for(const action of tool.actions){
        assert.ok(action.sample&&action.outputs?.length,`${tool.id} ${action.name}`);
        for(const field of tool.fields){
          const value=action.sample[field.name];
          if(field.choices)assert.ok(field.choices.some(choice=>choice.value===value),`${tool.id} --${field.name}: ${value}`);
        }
      }
    }
  }
});

function batch(ids){return new Promise((resolveBatch,reject)=>{
  const process=spawn(globalThis.process.execPath,[resolve('tests/sample-worker.mjs'),JSON.stringify(ids)],{stdio:['ignore','pipe','pipe']});
  let stdout='',stderr='';process.stdout.on('data',data=>stdout+=data);process.stderr.on('data',data=>stderr+=data);
  const timer=setTimeout(()=>{process.kill('SIGTERM');reject(new Error(`sample worker timeout: ${ids[0]}`));},120000);
  process.on('error',reject);
  process.on('exit',code=>{
    clearTimeout(timer);
    try{
      const result=JSON.parse(stdout.trim().split('\n').at(-1));
      assert.equal(code,0,`${result.failures.join('\n')}\n${stderr}`);resolveBatch(result.checked);
    }catch(error){reject(new Error(`${ids[0]}: ${error.message}\n${stdout.slice(-1500)}\n${stderr.slice(-1500)}`));}
  });
});}

test('every registered action executes its recorded sample',{timeout:600000},async()=>{
  const ready=tools.filter(tool=>tool.status==='ready');let checked=0;
  // Fresh processes keep native image resources and VM contexts bounded.
  for(let index=0;index<ready.length;index+=35){checked+=await batch(ready.slice(index,index+35).map(tool=>tool.id));}
  assert.equal(checked,ready.reduce((sum,tool)=>sum+tool.actions.length,0));
});
