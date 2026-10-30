#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { catalog, findTool, payload } from './catalog.js';
import { runTool } from './engine.js';
import type { Tool, Field } from './types.js';

const args = process.argv.slice(2);
const jsonRequested = args.includes('--json');
const globalOptions = new Set(['help', 'json', 'input-file', 'output-file', 'params', 'stdin', 'result-field']);
function write(value: string) { process.stdout.write(value.endsWith('\n') ? value : value + '\n'); }
function globalHelp() {
  write(`html-tools — WebUtils 无界面 TypeScript 工具集

用法:
  html-tools list [分类] [--all] [--json]
  html-tools search <关键词> [--all] [--json]
  html-tools <分类> <工具> [操作] [参数]
  html-tools <分类/工具> [操作] [参数]
  html-tools help <分类/工具>

例子:
  html-tools dev base64 encode --input '你好'
  html-tools text text-dedup dedup --input-file lines.txt
  html-tools calculator percentage calc1 --calc1-x 25 --calc1-y 200
  html-tools dev/json-formatter --help

通用参数:
  --help                 查看工具的字段、操作与示例
  --json                 输出 JSON；错误输出到 stderr，退出码 1
  --input-file <路径|->   将 UTF-8 文件或 stdin 赋给主要文本字段
  --stdin                从标准输入读取文本，等同 --input-file -
  --output-file <路径>   将结果写入文件
  --result-field <字段>  只输出指定结果字段；图片 data URL 可写成二进制文件
  --params <JSON|@路径>  用 JSON 对象批量提供字段；显式字段参数优先

字段参数使用 --字段名 值；复选框使用 --字段名 / --no-字段名。
无需浏览器；网络工具会连接其目标服务。完整命令文档见 docs/commands.md。`);
}
function displayDefault(field: Field): string {
  return JSON.stringify(field.default);
}
function example(tool: Tool) {
  const fields = tool.fields.filter(field => field.type !== 'checkbox').slice(0, 4);
  const flags = fields.map(field => `--${field.name} '${String(tool.sample[field.name] ?? field.default).replace(/'/g, `'\\''`)}'`).join(' ');
  return `html-tools ${tool.id.replaceAll('/', ' ')} ${tool.actions[0]?.name ?? ''} ${flags}`.trim();
}
function toolHelp(tool: Tool) {
  write(`${tool.id} — ${tool.name}\n${tool.description}\n来源: ${tool.source}\n`);
  if (tool.network) write('网络: 此工具可能向原页面指定或用户提供的目标发送请求。\n');
  if (tool.status !== 'ready') { write(`未迁移: ${tool.reason}`); return; }
  write(`用法: html-tools ${tool.id.replaceAll('/', ' ')} <操作> [参数]\n\n操作:\n${tool.actions.map(action => `  ${action.name.padEnd(28)} ${action.label}`).join('\n')}\n\n字段参数:`);
  for (const field of tool.fields) {
    write(`  --${field.name}${field.type === 'checkbox' ? ` / --no-${field.name}` : ' <值>'}\n    ${field.label}；类型 ${field.type}；默认 ${displayDefault(field)}${field.choices ? '\n    可选: ' + field.choices.map(choice => `${JSON.stringify(choice.value)} (${choice.label})`).join(', ') : ''}${field.min !== undefined ? `；最小 ${field.min}` : ''}${field.max !== undefined ? `；最大 ${field.max}` : ''}`);
  }
  write(`\n通用: --input-file <路径|->, --stdin, --output-file <路径>, --params <JSON|@路径>, --json\n\n示例:\n  ${example(tool)}\n\n结果字段（检查样本）: ${tool.outputs?.join(', ') || '依原算法而定'}\n${tool.reason ? '\n限制: ' + tool.reason : ''}`);
}
function parseFlags(argv: string[], tool: Tool) {
  const flags: Record<string, string | boolean> = {};
  const allowed = new Set([...tool.fields.map(field => field.name), ...globalOptions]);
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (!arg.startsWith('--')) throw new Error(`意外的参数: ${arg}。字段值请通过 --字段名 提供。`);
    const equal = arg.indexOf('=');
    const key = arg.slice(2, equal === -1 ? undefined : equal);
    const isNegative = key.startsWith('no-') && tool.fields.some(field=>field.name === key.slice(3) && field.type === 'checkbox');
    const name = isNegative ? key.slice(3) : key;
    if (!allowed.has(name)) throw new Error(`未知参数 --${key}。使用 --help 查看可用字段。`);
    const boolean = ['help','json','stdin'].includes(name) || tool.fields.some(field=>field.name === name && field.type === 'checkbox');
    if (isNegative) { if(equal !== -1) throw new Error(`--${key} 不接受值`); flags[name] = false; continue; }
    if (boolean) {
      if (equal !== -1) {
        const value = arg.slice(equal + 1);
        if (!['true','false'].includes(value)) throw new Error(`--${name} 的值必须是 true 或 false`);
        flags[name] = value === 'true';
      } else flags[name] = true;
    } else {
      const value = equal !== -1 ? arg.slice(equal+1) : argv[++index];
      if (value === undefined || value.startsWith('--')) throw new Error(`--${name} 缺少值；以 -- 开头的值请使用 --${name}=值`);
      flags[name] = value;
    }
  }
  return flags;
}
function primaryField(tool: Tool): Field {
  const field = tool.fields.find(field=>field.name === 'input') ?? tool.fields.find(field=> /textarea|text/.test(field.type) && !field.choices);
  if (!field) throw new Error('该工具没有主要文本字段，请直接使用帮助中的字段参数');
  return field;
}
function validate(tool: Tool, values: Record<string, string | boolean>) {
  for (const field of tool.fields) {
    const value = values[field.name];
    if (value === undefined) continue;
    if (field.type === 'checkbox' && typeof value !== 'boolean') throw new Error(`--${field.name} 必须是布尔值`);
    if (typeof value !== 'string' && field.type !== 'checkbox') throw new Error(`--${field.name} 必须是字符串`);
    if (field.choices && !field.choices.some(choice=>choice.value === String(value))) throw new Error(`--${field.name} 可选值: ${field.choices.map(choice=>JSON.stringify(choice.value)).join(', ')}`);
    if (['number','range'].includes(field.type) && value !== '') {
      const number = Number(value);
      if (!Number.isFinite(number)) throw new Error(`--${field.name} 必须是有效数字`);
      if (field.min !== undefined && number < Number(field.min)) throw new Error(`--${field.name} 不能小于 ${field.min}`);
      if (field.max !== undefined && number > Number(field.max)) throw new Error(`--${field.name} 不能大于 ${field.max}`);
    }
  }
}

async function main() {
  if (!args.length || (args[0] === '--help') || args[0] === '-h') { globalHelp(); return; }
  if (args[0] === '--version') { write('0.1.0'); return; }
  const tools = catalog();
  if (['list','search'].includes(args[0])) {
    const list = args[0] === 'list';
    const rest = args.slice(1);
    for (const flag of rest.filter(arg=>arg.startsWith('--'))) if (!['--all','--json','--help'].includes(flag)) throw new Error(`未知参数 ${flag}`);
    if(rest.includes('--help')) { write(`用法: html-tools ${args[0]} ${list ? '[分类]' : '<关键词>'} [--all] [--json]`); return; }
    const words = rest.filter(arg=>!arg.startsWith('--'));
    if (list && words.length > 1) throw new Error('list 最多接受一个分类');
    const query = words.join(' ').toLowerCase();
    if (!list && !query) throw new Error('search 需要搜索关键词');
    const matches = tools.filter(tool=>(rest.includes('--all') || tool.status === 'ready') && (!query || (list ? tool.category === query : `${tool.id} ${tool.name} ${tool.description}`.toLowerCase().includes(query))));
    if (jsonRequested) write(JSON.stringify(matches,null,2));
    else { write(matches.map(tool=>`${tool.id.padEnd(45)} ${tool.name}${tool.status==='skipped' ? ' [未迁移]' : ''}`).join('\n')); write(`\n共 ${matches.length} 项。${rest.includes('--all') ? '' : '加 --all 查看未迁移项目。'}`); }
    return;
  }
  let cursor = args[0] === 'help' ? 1 : 0;
  const requested = args[cursor++];
  if (!requested) { globalHelp(); return; }
  const category = !requested.includes('/') && tools.some(tool=>tool.category === requested);
  let name = requested;
  if (category) {
    if (!args[cursor] || args[cursor].startsWith('-')) {
      const matches=tools.filter(tool=>tool.category===requested && tool.status==='ready');
      if(jsonRequested)write(JSON.stringify(matches,null,2));else write(matches.map(tool=>`${tool.id} — ${tool.name}`).join('\n'));
      return;
    }
    name += '/' + args[cursor++];
  }
  const tool = findTool(tools,name);
  let actionName = args[cursor] && !args[cursor].startsWith('--') ? args[cursor++] : undefined;
  const flags = parseFlags(args.slice(cursor),tool);
  if (args[0] === 'help' || flags.help) { toolHelp(tool); return; }
  if(tool.status!=='ready') throw new Error(`${tool.id} 未迁移: ${tool.reason}`);
  if(!actionName) {
    if(tool.actions.length===1) actionName=tool.actions[0].name;
    else throw new Error(`请指定操作: ${tool.actions.map(action=>action.name).join(', ')}`);
  }
  let values: Record<string, string | boolean> = {};
  if(flags.params) {
    const raw=String(flags.params);
    const parsed: unknown=JSON.parse(raw.startsWith('@')?readFileSync(raw.slice(1),'utf8'):raw);
    if(!parsed || typeof parsed!=='object' || Array.isArray(parsed)) throw new Error('--params 必须是 JSON 对象');
    for(const [key,value] of Object.entries(parsed)) {
      if(!tool.fields.some(field=>field.name===key)) throw new Error(`--params 中存在未知字段: ${key}`);
      if(typeof value!=='string' && typeof value!=='boolean' && typeof value!=='number') throw new Error(`字段 ${key} 必须是字符串、数字或布尔值`);
      values[key]=typeof value==='number'?String(value):value;
    }
  }
  for(const field of tool.fields) if(flags[field.name]!==undefined) values[field.name]=flags[field.name];
  if(flags.stdin || flags['input-file']) {
    const field=primaryField(tool);
    if(values[field.name]!==undefined) throw new Error(`--input-file/--stdin 与 --${field.name} 不能同时使用`);
    if(flags.stdin && flags['input-file']) throw new Error('--stdin 与 --input-file 不能同时使用');
    const path=flags.stdin?'-':String(flags['input-file']);
    values[field.name]=readFileSync(path==='-'?0:path,'utf8');
  }
  validate(tool,values);
  const result=await runTool(tool,payload(tool),actionName,values);
  if(flags['result-field']){
    const key=String(flags['result-field']);
    if(!(key in result.results))throw new Error(`未知结果字段 ${key}，可用字段: ${Object.keys(result.results).join(', ')}`);
    result.results={ [key]:result.results[key] };
  }
  const entries=Object.entries(result.results);
  const output=jsonRequested?JSON.stringify(result,null,2):entries.length===1?entries[0][1]:entries.map(([key,value])=>`${key}: ${value}`).join('\n');
  if(flags['output-file']) {
    const data=!jsonRequested&&output.match(/^data:([^,]*),(.*)$/s);
    writeFileSync(String(flags['output-file']),data?(/;base64/i.test(data[1])?Buffer.from(data[2],'base64'):Buffer.from(decodeURIComponent(data[2]),'utf8')):output+'\n');
  } else write(output);
}
main().catch((error: unknown)=>{
  const message=error instanceof Error?error.message:String(error);
  process.stderr.write((jsonRequested?JSON.stringify({error:message}):`错误: ${message}`)+'\n');
  process.exitCode=1;
});
