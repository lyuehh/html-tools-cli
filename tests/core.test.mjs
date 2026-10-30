import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdtempSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {catalog,findTool,payload,runTool} from '../dist/index.js';
const tools=catalog();
const execute=(id,action,values={})=>{const t=findTool(tools,id);assert.equal(t.status,'ready',id);return runTool(t,payload(t),action,values)};
const cli=(...args)=>spawnSync(process.execPath,[resolve('dist/cli.js'),...args],{encoding:'utf8'});

test('Base64 UTF-8 encode/decode and whitespace preservation',async()=>{
  assert.equal((await execute('dev/base64','encode',{input:'你好 🌍'})).results.output,Buffer.from('你好 🌍').toString('base64'));
  assert.equal((await execute('dev/base64','decode',{input:Buffer.from(' hello\n').toString('base64')})).results.output,' hello\n');
  await assert.rejects(execute('dev/base64','decode',{input:'!invalid!'}));
});
test('JSON format/minify and invalid JSON',async()=>{
  const value='{"b":2,"a":1}';
  assert.equal((await execute('dev/json-formatter','format',{input:value,indent:'2'})).results.output,JSON.stringify(JSON.parse(value),null,2));
  assert.equal((await execute('dev/json-formatter','minify',{input:'{ "b": 2 }'})).results.output,'{"b":2}');
  await assert.rejects(execute('dev/json-formatter','format',{input:'{"broken":'}));
});
test('four percentage operations preserve original formulas',async()=>{
  assert.equal((await execute('calculator/percentage','calc1',{'calc1-x':'25','calc1-y':'200'})).results.result1,'12.5%');
  assert.equal((await execute('calculator/percentage','calc2',{'calc2-x':'25','calc2-y':'200'})).results.result2,'50');
  assert.equal((await execute('calculator/percentage','calc3',{'calc3-x':'200','calc3-y':'25','calc3-op':'subtract'})).results.result3,'150');
  assert.equal((await execute('calculator/percentage','calc4',{'calc4-x':'200','calc4-y':'250'})).results.result4,'+25%');
});
test('dedup preserves first occurrence and honors checkbox overrides',async()=>{
  const result=await execute('text/text-dedup','dedup',{input:'Apple\napple\nBanana\nApple','ignore-case':true,'keep-order':true});
  assert.equal(result.results.output,'Apple\nBanana');
  const caseSensitive=await execute('text/text-dedup','dedup',{input:'Apple\napple','ignore-case':false});
  assert.equal(caseSensitive.results.output,'Apple\napple');
});
test('case converter executes the original data-mode handler',async()=>{
  assert.equal((await execute('text/case-converter','upper',{input:'Hello world'})).results.input,'HELLO WORLD');
  assert.equal((await execute('text/case-converter','snake',{input:'Hello world'})).results.input,'hello_world');
});
test('quadratic equation computes real roots',async()=>{
  const result=await execute('math/quadratic-equation','solve',{a:'1',b:'-3',c:'2'});
  assert.match(result.results.discriminant,/^Δ = 1 > 0/);
  assert.deepEqual(new Set([result.results.x1,result.results.x2]),new Set(['1','2']));
});
test('YAML npm bridge handles objects across VM realms',async()=>{
  const tool=findTool(tools,'dev/json-yaml');
  assert.equal(tool.status,'ready');
  const forward=tool.actions.find(a=>/json-to-yaml/.test(a.name));
  assert.ok(forward);
  const result=await execute(tool.id,forward.name,{input:'{"name":"Alice","count":2}'});
  assert.match(result.results.output,/name: Alice/);
});
test('math expression uses the local dependency',async()=>{
  const tool=findTool(tools,'calculator/math-evaluator');
  const action=tool.actions.find(a=>a.name==='calculate')||tool.actions[0];
  const result=await execute(tool.id,action.name,{expression:'2 + 3 * 4'});
  assert.ok(Object.values(result.results).some(v=>v==='14'),JSON.stringify(result));
});
test('help is self-contained and unknown flags fail',()=>{
  assert.equal(cli('--help').status,0);
  const help=cli('dev/base64','--help');assert.equal(help.status,0);assert.match(help.stdout,/--input/);assert.match(help.stdout,/encode/);
  const failure=cli('dev/base64','encode','--unknown','abc','--json');
  assert.equal(failure.status,1);assert.equal(failure.stdout,'');assert.match(JSON.parse(failure.stderr).error,/未知参数/);
});
test('CLI pipe, params, explicit override, and file output',()=>{
  const piped=spawnSync(process.execPath,[resolve('dist/cli.js'),'dev/base64','encode','--stdin','--json'],{input:'hello\n',encoding:'utf8'});
  assert.equal(piped.status,0,piped.stderr);assert.equal(JSON.parse(piped.stdout).results.output,Buffer.from('hello\n').toString('base64'));
  const result=cli('calculator/percentage','calc1','--params','{"calc1-x":25,"calc1-y":200}','--calc1-y','400','--json');
  assert.equal(result.status,0,result.stderr);assert.equal(JSON.parse(result.stdout).results.result1,'6.25%');
  const dir=mkdtempSync(join(tmpdir(),'html-tools-test-'));const input=join(dir,'input.txt'),output=join(dir,'output.txt');
  writeFileSync(input,'hello');
  const file=cli('dev/base64','encode','--input-file',input,'--output-file',output);assert.equal(file.status,0,file.stderr);assert.equal(file.stdout,'');assert.equal(readFileSync(output,'utf8'),'aGVsbG8=\n');
});
test('ambiguity and conflicts fail with useful errors',()=>{
  const ambiguous=cli('json-yaml','--help');assert.equal(ambiguous.status,1);assert.match(ambiguous.stderr,/歧义/);
  const conflict=cli('dev/base64','encode','--input','hello','--stdin');assert.equal(conflict.status,1);assert.match(conflict.stderr,/不能同时/);
  const missing=cli('dev/base64','encode','--input-file','/missing-html-tools-file');assert.equal(missing.status,1);assert.equal(missing.stdout,'');
  const invalid=cli('calculator/percentage','calc1','--calc1-x','not-a-number');assert.equal(invalid.status,1);assert.match(invalid.stderr,/数字/);
});
test('generated package runs without upstream HTML sources',()=>{
  const result=spawnSync(process.execPath,[resolve('dist/cli.js'),'dev/base64','encode','--input','portable'],{cwd:tmpdir(),encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);assert.equal(result.stdout.trim(),Buffer.from('portable').toString('base64'));
  assert.ok(existsSync(resolve('generated/ports/dev/base64.ts')));
});
