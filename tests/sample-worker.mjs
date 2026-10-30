import {catalog,payload,runTool} from '../dist/index.js';
import {networkFixture} from './fixtures.mjs';
const ids=JSON.parse(process.argv[2]);
const tools=catalog().filter(tool=>ids.includes(tool.id));
let checked=0;const failures=[];
for(const tool of tools){
  for(const action of tool.actions){
    try{
      const result=await runTool(tool,payload(tool),action.name,action.sample||tool.sample,{fetch:networkFixture});
      if(!Object.keys(result.results).length)throw new Error('empty result');
      if(Object.values(result.results).some(value=>typeof value!=='string'))throw new Error('non-string result');
      checked++;
    }catch(error){failures.push(`${tool.id} ${action.name}: ${error?.message||String(error)}`);}
  }
}
process.stdout.write(JSON.stringify({checked,failures})+'\n');
if(failures.length)process.exitCode=1;
