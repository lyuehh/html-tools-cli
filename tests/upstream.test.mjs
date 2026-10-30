import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,copyFileSync,chmodSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve,delimiter} from 'node:path';
import {spawnSync} from 'node:child_process';
const old='1'.repeat(40), next='2'.repeat(40);
function setup(){
  const root=mkdtempSync(join(tmpdir(),'upstream-test-'));mkdirSync(join(root,'scripts'));mkdirSync(join(root,'html-tools'));mkdirSync(join(root,'generated'));mkdirSync(join(root,'bin'));
  copyFileSync(resolve('scripts/upstream.mjs'),join(root,'scripts/upstream.mjs'));
  writeFileSync(join(root,'upstream.lock.json'),JSON.stringify({url:'https://github.com/chicogong/html-tools.git',revision:old}));
  writeFileSync(join(root,'generated/catalog.json'),'[]');
  writeFileSync(join(root,'generated/upstream-revision.json'),JSON.stringify({revision:old}));
  const git=`#!/bin/sh\ncase "$1 $2" in\n 'rev-parse --git-dir') echo .git ;;\n 'rev-parse HEAD') echo ${old} ;;\n 'rev-parse FETCH_HEAD^{commit}') echo ${next} ;;\n 'status --porcelain') printf '%s' "$TEST_DIRTY" ;;\n fetch*) exit 0 ;;\n checkout*) exit 0 ;;\n *) exit 2 ;;\nesac\n`;
  const npm='#!/bin/sh\nif [ -n "$TEST_NPM_FAIL" ] && [ "$TEST_NPM_FAIL" = "$2" ]; then exit 7; fi\nexit 0\n';
  for(const [name,script] of [['git',git],['npm',npm]]){const path=join(root,'bin',name);writeFileSync(path,script);chmodSync(path,0o755);}
  return root;
}
function run(root,args,env={}){return spawnSync(process.execPath,[join(root,'scripts/upstream.mjs'),...args],{encoding:'utf8',env:{...process.env,PATH:join(root,'bin')+delimiter+process.env.PATH,...env}});}
test('upstream check verifies locked clean checkout',()=>{const root=setup();const r=run(root,['--check']);assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/一致/);});
test('upstream update records revision only after successful regeneration',()=>{const root=setup();const r=run(root,['--update']);assert.equal(r.status,0,r.stderr);assert.equal(JSON.parse(readFileSync(join(root,'upstream.lock.json'))).revision,next);assert.equal(JSON.parse(readFileSync(join(root,'generated/upstream-revision.json'))).revision,next);});
test('upstream refuses dirty checkout before updating lock',()=>{const root=setup();const r=run(root,['--update'],{TEST_DIRTY:' M file'});assert.equal(r.status,1);assert.match(r.stderr,/未提交/);assert.equal(JSON.parse(readFileSync(join(root,'upstream.lock.json'))).revision,old);});
test('failed generation does not record a successful generated revision',()=>{const root=setup();const r=run(root,['--update'],{TEST_NPM_FAIL:'generate'});assert.equal(r.status,1);assert.equal(JSON.parse(readFileSync(join(root,'upstream.lock.json'))).revision,next);assert.equal(JSON.parse(readFileSync(join(root,'generated/upstream-revision.json'))).revision,old);});
