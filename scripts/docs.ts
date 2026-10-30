import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import type {Tool} from '../src/types.ts';
const root=resolve(import.meta.dirname,'..');
const tools:Tool[]=JSON.parse(readFileSync(resolve(root,'generated/catalog.json'),'utf8'));
const ready=tools.filter(tool=>tool.status==='ready');
const escape=(text:unknown)=>String(text).replaceAll('|','\\|').replaceAll('\n','<br>');
const shell=(text:unknown)=>`'${String(text).replaceAll("'", "'\\''")}'`;
let text=`# 命令参考\n\n此文件由 \`npm run docs\` 根据实际注册表生成。共检查 ${tools.length} 个源工具，${ready.length} 个已注册，共 ${ready.reduce((sum,t)=>sum+t.actions.length,0)} 个操作。\n\n每个操作都经过记录样本的运行检查；这不等于所有参数组合都经过业务正确性验证。原始算法的限制和近似计算保持不变。\n\n- 命令支持 \`html-tools 分类 工具 操作\` 和 \`html-tools 分类/工具 操作\`。\n- 单操作工具可以省略操作名。多操作工具必须指定操作。\n- 参数统一使用原字段 ID 转成 kebab-case。\n- 复选框使用 \`--字段\` / \`--no-字段\`，也可使用 \`--字段=true\`。\n- 文本工具可使用 \`--input-file 路径\`、\`--stdin\`、\`--params @文件.json\`。\n- \`--json\` 输出 \`{tool, action, results}\`；否则单结果直接输出，多结果以字段名标记。\n- \`--output-file 文件\` 写入结果（覆盖文件）；其他文件读写依照明确参数进行。\n- 原文档中的颜色、日期和数字格式取决于源工具；选择字段必须使用下面的原始 value。\n- 所有命令支持 \`--help\`；失败退出码为 1，帮助/成功为 0。\n\n## 分类索引\n\n`;
for(const category of [...new Set(ready.map(t=>t.category))].sort()) text+=`- [${category}](#${category})（${ready.filter(t=>t.category===category).length} 个）\n`;
for(const category of [...new Set(ready.map(t=>t.category))].sort()) {
  text+=`\n## ${category}\n`;
  for(const tool of ready.filter(t=>t.category===category)) {
    text+=`\n### ${tool.id}\n\n${tool.name}：${tool.description}\n\n来源：\`html-tools/${tool.source}\`，SHA-256：\`${tool.sha256}\`。\n\n操作：\n\n| 操作 | 说明 | 样本输出字段 |\n| --- | --- | --- |\n`;
    for(const action of tool.actions)text+=`| \`${action.name}\` | ${escape(action.label)} | ${escape(action.outputs?.join(', ')||'')} |\n`;
    text+='\n参数：\n\n| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |\n| --- | --- | --- | --- | --- |\n';
    for(const field of tool.fields)text+=`| \`--${field.name}\`${field.type==='checkbox'?` / \`--no-${field.name}\``:''} | ${escape(field.label)} | ${field.type} | ${escape(JSON.stringify(field.default))} | ${escape(field.choices?.map(choice=>`${JSON.stringify(choice.value)} (${choice.label})`).join('; ') || [field.min!==undefined?'min='+field.min:'',field.max!==undefined?'max='+field.max:''].filter(Boolean).join(', '))} |\n`;
    const action=tool.actions[0];
    const args=Object.entries(action.sample||tool.sample).map(([key,value])=>typeof value==='boolean'?`--${value?'':'no-'}${key}`:`--${key} ${shell(value)}`).join(' ');
    text+=`\n已检查示例：\n\n\`\`\`bash\nhtml-tools ${tool.id} ${action.name} ${args} --json\n\`\`\`\n`;
    if(tool.reason)text+=`\n操作限制：${tool.reason}\n`;
  }
}
writeFileSync(resolve(root,'docs/commands.md'),text);
let report=`# 迁移清单\n\n源目录：\`html-tools/\`。源注册表登记 ${tools.length} 项，已迁移 ${ready.length} 项，未迁移 ${tools.length-ready.length} 项。\n\n状态“ready”表示至少一个操作经过可运行样本检查；未暴露失败的操作。生成的 TypeScript 算法保留原语句，通过内存字段适配层在 Node.js 中执行。原始 HTML、CDN 不会在浏览器中打开。网络类命令会连接目标服务，检查样本使用模拟响应。\n\n未迁移项包含用户明确排除的交互应用，以及尚未完成专项适配的工具；后者不能视为迁移已完成。下面逐项记录原因。机器可读版本见 \`generated/catalog.json\`。\n\n| 工具 | 名称 | 状态 | 原因/限制 |\n| --- | --- | --- | --- |\n`;
for(const tool of tools) report+=`| ${tool.id} | ${escape(tool.name)} | ${tool.status} | ${escape(tool.reason||'已通过样本运行检查')} |\n`;
writeFileSync(resolve(root,'docs/migration.md'),report);
console.log(`生成文档: ${ready.length} 个命令，${tools.length} 项清单`);
