# html-tools-cli

将 `html-tools/` 中适合无界面运行的 WebUtils 工具迁移成 TypeScript 命令。保留原始算法、工具分类和字段默认值，支持终端参数、UTF-8 文件、管道和 JSON 输出。

工具的实际覆盖数量见 [迁移清单](docs/migration.md) 与 [机器可读统计](generated/summary.json)。这里不会把页面文章、小游戏或尚未适配的工具计入已完成命令。

## 安装与运行

需要 Node.js 22.18+（建议 Node.js 24）和 npm。

```bash
npm ci
npm run build
node dist/cli.js --help

# 可选：安装当前包的命令到全局
npm install -g .
html-tools --help
```

`generated/` 包含迁移算法、字段及运行资源。正常构建不依赖原 HTML 仓库、不访问 CDN、不启动浏览器。安装 npm 依赖需要网络；网络类命令会连接其目标服务，其他命令在本地运行。

## 常用示例

```bash
# 搜索已迁移工具；加 --all 查看所有源项目及状态
html-tools search base64
html-tools list calculator
html-tools list --all --json

# 两种命令拼写等价
html-tools dev base64 encode --input '你好'
html-tools dev/base64 encode --input '你好'
html-tools dev/base64 decode --input '5L2g5aW9'

# 每个工具的操作、字段默认值和可选值
html-tools dev/base64 --help
html-tools help calculator/percentage

# 百分比：25 是 200 的百分之几
html-tools calculator/percentage calc1 --calc1-x 25 --calc1-y 200

# JSON 格式化和文本去重
printf '{"b":2,"a":1}' | html-tools dev/json-formatter format --stdin
html-tools text/text-dedup dedup --input-file lines.txt --ignore-case

# 机器可读结果与输出文件
html-tools dev/base64 encode --input 'hello' --json
html-tools dev/base64 encode --input-file input.txt --output-file result.txt

# 批量字段参数（字段名与命令行长选项一致）
html-tools calculator/percentage calc1 --params '{"calc1-x":25,"calc1-y":200}'
html-tools calculator/percentage calc1 --params @params.json --calc1-y 400
```

JSON 输出结构：

```json
{
  "tool": "dev/base64",
  "action": "encode",
  "results": { "output": "aGVsbG8=" }
}
```

成功和帮助退出码为 `0`。参数错误、原算法校验失败和执行失败退出码为 `1`，错误只写入 stderr；指定 `--json` 时错误格式为 `{"error":"…"}`。没有 `--json` 时，单结果原样输出，多结果逐项标明字段名。

## 参数约定

- 命令路径：`html-tools <分类> <工具> <操作>` 或 `html-tools <分类/工具> <操作>`。
- 仅有一个操作时可省略操作名；存在多个操作时必须明确选择。
- 原字段 ID 转成 kebab-case，例如 `ignoreCase` → `--ignore-case`。枚举必须传 `--help` 中的 value，不是界面标签。
- 布尔值：`--ignore-case`、`--no-ignore-case` 或 `--ignore-case=false`。
- 文本字段：`--input '内容'`；其他字段名按具体帮助提供。主要文本字段支持 `--input-file 文件`、`--input-file -` 和 `--stdin`。
- `--params` 接受 JSON 对象或 `@文件路径`，显式字段参数优先。JSON 中的数字会转成字段字符串。
- 文件/管道输入保留 UTF-8 内容和换行；与同一个文本字段的显式参数冲突时会报错。
- `--output-file` 覆盖指定文件。文本输出结尾补一个换行。
- `--字段=值` 支持以 `--` 开头的值；负数可以直接传入，例如 `--b -3`。
- 字段默认值来自原页面。不会自动替换成演示样本；原页面不提供有效默认值时，需要自行传参。
- [全部命令和示例](docs/commands.md) 由实际注册表生成，包含每项参数的类型、默认值、范围、枚举以及可用操作。

## 实现与边界

CLI、参数校验、注册表、生成器及执行适配器使用 TypeScript。`generated/ports/` 中保存从页面提取的 TypeScript 算法源码、原路径与 SHA-256；原算法未逐项重写，保留原语句和公式，暂时使用 `@ts-nocheck`。构建生成器将这些源码转译到独立运行资源中。

原算法通过 `document.getElementById(...).value` 读写数据，因此使用 jsdom 提供**内存字段适配层**。这不是浏览器自动化：不启动 Chrome、不加载页面外链、不执行 CDN 脚本、不进行导航。主题和滚动等界面操作被适配为无操作；对话提示转换为终端错误。每次命令使用独立内存状态，不保存 localStorage。

源页面使用的部分格式转换库已替换为 npm 本地依赖。网络类命令按原工具的目标服务发送请求，检查样本使用模拟响应。本地图片和部分文档操作使用文件路径和原算法的内存渲染适配；仍有部分图像、音视频和文件操作需要专项适配。迁移清单会明确记录未完成项。原页面中的文章/参考资料、持续交互游戏与设备权限功能按用户要求不迁移。

每个公开操作都通过了一个记录在注册表中的运行样本；这只是覆盖检查，不保证原算法对所有输入都正确。算法对照测试覆盖关键文本、编码、计算场景。原项目中的近似值、固定数据、时区/locale 处理与业务公式保持原有语义。

## 开发与验证

```bash
npm run check          # 严格检查 CLI / 执行适配器的 TypeScript 类型
npm test               # 关键算法和命令行行为回归测试
npm run verify:catalog # 所有已注册操作的样本运行检查
npm run generate       # 从 html-tools/ 重新扫描和生成迁移算法与注册表
npm run docs           # 重新生成全部命令文档与迁移清单
npm run build
npm pack --dry-run     # 检查 npm 发布包内容
```

源码目录：

```text
src/                  TypeScript CLI、参数校验、注册表和执行适配层
scripts/              迁移生成器和文档生成器
 generated/catalog.json 工具、操作、字段、样本与迁移状态
 generated/ports/       提取的 TypeScript 原始算法
 generated/tools/       独立运行资源（不依赖 html-tools/）
tests/                算法结果、CLI 行为、注册表和源逻辑一致性测试
docs/commands.md      全部可用命令参考
docs/migration.md     全部 1088 项的迁移状态与原因
html-tools/           保留的上游源码
```

新增或修复迁移时，应检查原页面算法，为操作补充有效参数样本和结果测试，再重新生成文档。不能通过伪造结果、吞掉计算异常或只创建帮助条目把工具标记为完成。

## 许可

MIT。迁移代码源自 WebUtils，保留上游版权与声明，见 [LICENSE](LICENSE) 和 [NOTICE](NOTICE)。

## 上游源码的固定版本与更新

`html-tools/` 是独立的上游 Git 工作目录，由 `.gitignore` 排除，不要将它加入本项目的提交。`upstream.lock.json` 记录上游仓库地址和固定提交；提交本项目时请包含该锁文件、`generated/` 和 `docs/`。这是不依赖父项目 Git 状态的替代方案：本目录目前还没有初始化 Git 仓库，因此尚不能记录真正的 submodule gitlink。CLI 构建和运行使用已生成的资源，无需检出上游；从源码重新生成或运行完整测试时才需要它。

首次获取本项目或需要恢复锁定的上游版本时：

```bash
npm ci
npm run upstream
```

此命令在 `html-tools/` 不存在时从锁文件中的地址克隆上游，检出锁定提交，然后重新生成 CLI、文档并运行测试。已有的干净上游工作目录会复用。上游存在未提交修改或未跟踪文件时命令会停止，避免覆盖工作。可以只检查当前版本和工作区而不修改任何文件：

```bash
npm run upstream -- --check
```

需要更新至上游默认分支当前提交时，执行：

```bash
npm run upstream -- --update
```

该命令通过已有 `origin` 获取其默认分支 HEAD，切换到对应提交，更新锁文件，重新生成 `generated/`、`docs/` 并运行 `npm test`，最后记录 `generated/upstream-revision.json`。它会输出新增、源码变更和移除的工具数量。检查生成的命令、迁移状态及上游算法变更，再将锁文件、生成资源、文档和必要的适配代码一起提交。更新可能改变可用操作或参数；样本通过不表示所有输入都验证过。

如果生成或测试失败，上游工作目录和锁文件可能已经指向新版本，生成文件也可能只更新了一部分；修复问题后重新运行 `npm run upstream`。`generated/upstream-revision.json` 只有在完整流程通过后才更新，可与锁文件比对。要回到旧版，请先从本项目版本历史恢复旧的 `upstream.lock.json`，再运行 `npm run upstream`。仅在 `html-tools/` 内手动更新不会自动更新 CLI，必须重新运行上述流程。
