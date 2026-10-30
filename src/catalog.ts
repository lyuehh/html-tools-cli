import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Tool, Payload } from './types.js';
export const packageRoot = fileURLToPath(new URL('../', import.meta.url));
export function catalog(): Tool[] {
  return JSON.parse(readFileSync(new URL('../generated/catalog.json', import.meta.url), 'utf8'));
}
export function payload(tool: Tool): Payload {
  return JSON.parse(readFileSync(new URL(`../generated/tools/${tool.id}.json`, import.meta.url), 'utf8'));
}
export function findTool(tools: Tool[], name: string): Tool {
  const exact = tools.find(tool => tool.id === name);
  if (exact) return exact;
  const matches = tools.filter(tool => tool.id.split('/').at(-1) === name);
  if (matches.length === 1) return matches[0];
  if (matches.length > 1) throw new Error(`工具名称有歧义，请使用分类路径: ${matches.map(tool => tool.id).join(', ')}`);
  throw new Error(`找不到工具: ${name}。使用 html-tools search <关键词> 搜索。`);
}
