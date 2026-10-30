# 迁移清单

源目录：`html-tools/`。源注册表登记 1088 项，已迁移 865 项，未迁移 223 项。

状态“ready”表示至少一个操作经过可运行样本检查；未暴露失败的操作。生成的 TypeScript 算法保留原语句，通过内存字段适配层在 Node.js 中执行。原始 HTML、CDN 不会在浏览器中打开。网络类命令会连接目标服务，检查样本使用模拟响应。

未迁移项包含用户明确排除的交互应用，以及尚未完成专项适配的工具；后者不能视为迁移已完成。下面逐项记录原因。机器可读版本见 `generated/catalog.json`。

| 工具 | 名称 | 状态 | 原因/限制 |
| --- | --- | --- | --- |
| ai-coding/index | AI Coding 资源导航 | skipped | 资源导航或使用指南 |
| ai-coding/wiki/ai-ide | AI IDE 环境指南 | skipped | 资源导航或使用指南 |
| ai-coding/wiki/claude-skills | Claude Skills 指南 | skipped | 资源导航或使用指南 |
| ai-coding/wiki/cursor-rules | Cursor Rules 指南 | skipped | 资源导航或使用指南 |
| ai-coding/wiki/mcp-servers | MCP Servers 指南 | skipped | 资源导航或使用指南 |
| ai/agi-2026-outlook | AGI 2026 展望 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/ai-agent-2025-guide | AI Agent 2025 年度指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/ai-agent-guide | AI Agent 入门指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/ai-coding-tools-2025 | AI 编程工具 2025 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/ai-coding-tools | AI 编程工具对比 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/ai-image-generation-2025 | AI 图像生成工具大全 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/ai-models | AI 模型对比表 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/ai-pricing | AI API 价格计算器 | ready | 已通过样本运行检查 |
| ai/ai-video-generation-2025 | AI 视频生成对比 2025 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/china-llm-2025 | 国产大模型 2025 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/claude-4-guide | Claude 4 使用指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/claude-code-ecosystem | Claude Code 生态大全 | skipped | filter-by-category-all: Cannot read properties of undefined (reading 'target') \| filter-by-category-mcp: Cannot read properties of undefined (reading 'target') \| filter-by-category-skill: Cannot read properties of undefined (reading 'target') \| filter-by-category-plugin: Cannot read properties of undefined (reading 'target') \| filter-by-category-tool: Cannot read properties of undefined (reading 'target') \| filter-items: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| ai/claude-skills | Claude Skills 精选 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/cursor-shortcuts | Cursor 快捷键速查 | skipped | run: 原工具没有产生可输出的结果，请检查参数 |
| ai/deepseek-guide | DeepSeek API 使用指南 \| 在线工具 | ready | 已通过样本运行检查 |
| ai/deepseek-v3-guide | DeepSeek V3 完整指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/doubao-1.8-guide | 豆包 1.8 使用指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/gemini-2.5-pro-guide | Gemini 2.5 Pro 指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/gemini3-guide | Gemini 3 使用指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/gpt5-guide | GPT-5 完整指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/grok4-guide | Grok 4 使用指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/humanoid-robots-2025 | 人形机器人 2025 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/kimi-k2-guide | Kimi K2 完整指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/llama-4-guide | Llama 4 完整指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/mcp-clients | MCP 客户端大全 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/mcp-guide | MCP 配置指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/mcp-protocol-guide | MCP 协议指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/midjourney-v7-guide | Midjourney V7 指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/nemotron-3-guide | Nemotron 3 指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/notebooklm-guide | NotebookLM 指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/openai-o3-o4-guide | OpenAI o3/o4-mini 指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/openai-reasoning-models-2025 | OpenAI 推理模型指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/perplexity-guide | Perplexity 指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/prompt-templates | Prompt 模板库 | ready | 已通过样本运行检查 |
| ai/prompt-tips-2025 | Prompt 技巧速查 2025 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/rag-technology-2025 | RAG 技术完全指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/sora-guide | Sora 视频生成指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/suno-ai-music-guide | Suno AI 音乐指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/token-counter | Token 计数器 | ready | 已通过样本运行检查 |
| ai/tts-tools-2025 | TTS 语音合成工具大全 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/ui-ux-design-resources | UI/UX 设计资源导航 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/vibe-coding-guide | Vibe Coding 入门指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| ai/wanxiang-2.6-guide | 万象 2.6 视频指南 | skipped | 没有检测到可独立调用的无界面计算操作 |
| dev/easing-visualizer | 缓动函数可视化 | ready | 部分原页面操作未通过迁移检查: update-preset-buttons: 原工具没有产生可输出的结果，请检查参数 \| update-animation-timing: 原工具没有产生可输出的结果，请检查参数 |
| calculator/age-diff-calc | 年龄差计算器 | ready | 已通过样本运行检查 |
| calculator/aspect-ratio-calculator | 宽高比计算器 | ready | 已通过样本运行检查 |
| calculator/base-calculator | 进制计算器 | ready | 已通过样本运行检查 |
| calculator/bitwise-calculator | 位运算计算器 | ready | 部分原页面操作未通过迁移检查: update-input-a: 0 \| update-input-b: 0 |
| calculator/bmi-calculator | BMI 计算器 | ready | 已通过样本运行检查 |
| calculator/electricity-calc | 电费计算器 | ready | 已通过样本运行检查 |
| calculator/function-plotter | 函数图像绘制器 | ready | 已通过样本运行检查 |
| calculator/loan-calculator | 贷款计算器 | ready | 已通过样本运行检查 |
| calculator/math-evaluator | 数学表达式计算器 | ready | 已通过样本运行检查 |
| calculator/percentage | 百分比计算器 | ready | 已通过样本运行检查 |
| calculator/progress | 进度计算器 | ready | 已通过样本运行检查 |
| calculator/salary-calc | 税后工资计算器 | ready | 已通过样本运行检查 |
| calculator/speed-calc | 网速计算器 | ready | 已通过样本运行检查 |
| calculator/statistics-calc | 统计计算器 | ready | 已通过样本运行检查 |
| calculator/storage-converter | 存储单位换算 | ready | 已通过样本运行检查 |
| calculator/time-calc | 时间加减计算器 | ready | 已通过样本运行检查 |
| calculator/tip-calculator | 小费/AA计算器 | ready | 已通过样本运行检查 |
| calculator/triangle-calc | 三角函数计算器 | ready | 已通过样本运行检查 |
| converter/angle-converter | 角度单位转换器 | ready | 已通过样本运行检查 |
| converter/csv-json | CSV ⇄ JSON 转换 | skipped | export-file-csv: 找不到输入字段: field-5 \| json-to-csv: 找不到输入字段: field-5 \| format-json: 找不到输入字段: field-5 \| export-file-json: 找不到输入字段: field-5 \| run: 找不到输入字段: field-5 |
| converter/curl-to-code | cURL to Code | ready | 已通过样本运行检查 |
| converter/data-size-converter | 数据存储单位转换器 | ready | 已通过样本运行检查 |
| converter/data-size | 数据大小转换器 | ready | 已通过样本运行检查 |
| converter/data-url-converter | Data URL 转换器 | ready | 部分原页面操作未通过迁移检查: decode-data-url: Unsupported image type \| export-decoded: 原工具没有产生可输出的结果，请检查参数 |
| converter/file-size | 文件大小计算器 | ready | 已通过样本运行检查 |
| converter/html-to-markdown | HTML 转 Markdown | ready | 已通过样本运行检查 |
| converter/json-yaml | JSON ⇄ YAML 转换 | ready | 已通过样本运行检查 |
| converter/number-words | 数字转大写 | ready | 已通过样本运行检查 |
| converter/pressure-converter | 压力单位转换器 | ready | 已通过样本运行检查 |
| converter/unit-converter | 单位转换器 | ready | 已通过样本运行检查 |
| dev/api-mock | API 响应模拟器 | skipped | format-json: 解析文件失败: Unexpected token 'H', "Hello worl"... is not valid JSON \| run: 解析文件失败: Unexpected token 'H', "Hello worl"... is not valid JSON |
| dev/arrow-generator | 箭头符号生成器 | ready | 已通过样本运行检查 |
| dev/ascii-art | ASCII 艺术 | ready | 已通过样本运行检查 |
| dev/ascii-table | ASCII 码表 | skipped | build-table: 原工具没有产生可输出的结果，请检查参数 \| filter-table: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| dev/base64 | Base64 编解码 | ready | 已通过样本运行检查 |
| dev/basic-auth-generator | Basic Auth 生成器 | ready | 已通过样本运行检查 |
| dev/box-shadow | Box Shadow 生成器 | ready | 已通过样本运行检查 |
| dev/browser-storage-viewer | 浏览器存储查看器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/changelog-gen | CHANGELOG 生成器 | ready | 已通过样本运行检查 |
| dev/charset-converter | 字符集转换器 | ready | 已通过样本运行检查 |
| dev/chmod-calculator | Chmod 计算器 | ready | 已通过样本运行检查 |
| dev/clipboard-viewer | 剪贴板查看器 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| dev/code-diff | 代码对比工具 | ready | 已通过样本运行检查 |
| dev/code-stats | 代码统计器 | ready | 已通过样本运行检查 |
| dev/color-blindness | 色盲模拟器 | skipped | run: Uncaught [IndexSizeError: Failed to execute 'getImageData' on 'CanvasRenderingContext2D': The source width is 0.]; Uncaught [IndexSizeError: Failed to execute 'getImageData' on 'CanvasRenderingContext |
| dev/color-converter | 颜色转换器 | ready | 已通过样本运行检查 |
| dev/color-mixer | 颜色混合器 | ready | 已通过样本运行检查 |
| dev/color-names | 颜色命名查询 | ready | 已通过样本运行检查 |
| dev/color-palette-generator | 调色板生成器 | ready | 部分原页面操作未通过迁移检查: complementary: 原工具没有产生可输出的结果，请检查参数 \| analogous: 原工具没有产生可输出的结果，请检查参数 \| triadic: 原工具没有产生可输出的结果，请检查参数 \| split: 原工具没有产生可输出的结果，请检查参数 \| tetradic: 原工具没有产生可输出的结果，请检查参数 \| monochromatic: 原工具没有产生可输出的结果，请检查参数 |
| dev/color-palette | 配色方案生成器 | ready | 已通过样本运行检查 |
| dev/contrast-checker | 颜色对比度检查器 | ready | 部分原页面操作未通过迁移检查: update-preview: 原工具没有产生可输出的结果，请检查参数 |
| dev/cron-generator | Cron 生成器 | ready | 已通过样本运行检查 |
| dev/cron-parser | Cron 表达式解析器 | ready | 已通过样本运行检查 |
| dev/crontab-generator | Crontab 生成器 | ready | 已通过样本运行检查 |
| dev/css-animation-generator | CSS 动画生成器 | ready | 已通过样本运行检查 |
| dev/css-border-radius | Border Radius 生成器 | ready | 已通过样本运行检查 |
| dev/css-box-shadow | CSS 盒子阴影生成器 | ready | 已通过样本运行检查 |
| dev/css-clip-path | CSS Clip-path 生成器 | ready | 已通过样本运行检查 |
| dev/css-filter-generator | CSS Filter 生成器 | skipped | update-filter: Unsupported image type \| run: Unsupported image type |
| dev/css-filter | CSS 滤镜生成器 | skipped | update-filter: Unsupported image type \| run: Unsupported image type |
| dev/css-formatter | CSS 格式化 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/css-grid-generator | CSS Grid 生成器 \| 在线工具 | ready | 部分原页面操作未通过迁移检查: update-item-style: 原工具没有产生可输出的结果，请检查参数 |
| dev/css-grid | CSS Grid 生成器 | ready | 部分原页面操作未通过迁移检查: update-item-select: 原工具没有产生可输出的结果，请检查参数 |
| dev/css-minifier | CSS 压缩/美化工具 | ready | 已通过样本运行检查 |
| dev/css-selector-test | CSS 选择器测试器 | ready | 已通过样本运行检查 |
| dev/css-sprites | CSS雪碧图生成器 | ready | 部分原页面操作未通过迁移检查: export-sprite: 原工具没有产生可输出的结果，请检查参数 |
| dev/css-text-shadow | CSS Text Shadow 生成器 | ready | 已通过样本运行检查 |
| dev/css-transform | CSS Transform 生成器 | ready | 已通过样本运行检查 |
| dev/css-unit-converter | CSS 单位转换器 | ready | 已通过样本运行检查 |
| dev/cubic-bezier | Cubic Bezier 编辑器 | ready | 部分原页面操作未通过迁移检查: update-preset-buttons: 原工具没有产生可输出的结果，请检查参数 |
| dev/curl-converter | cURL 转换器 | skipped | convert: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| dev/diff-viewer | Git Diff 查看器 | ready | 已通过样本运行检查 |
| dev/docker-compose-gen | Docker Compose 生成器 | ready | 已通过样本运行检查 |
| dev/docker-compose-generator | Docker Compose 生成器 \| 在线工具 | ready | 已通过样本运行检查 |
| dev/dockerfile-generator | Dockerfile 生成器 | ready | 已通过样本运行检查 |
| dev/editorconfig-gen | editorconfig 生成器 | ready | 已通过样本运行检查 |
| dev/emoji-picker | Emoji 选择器 | ready | 已通过样本运行检查 |
| dev/env-editor | .env 文件编辑器 | ready | 已通过样本运行检查 |
| dev/excel-viewer | Excel 预览器 | ready | 部分原页面操作未通过迁移检查: search-table: 原工具没有产生可输出的结果，请检查参数 |
| dev/favicon-checker | Favicon 检测器 | skipped | check-favicon: 检测失败: 图像适配仅支持本地文件和 data URL |
| dev/flexbox-playground | Flexbox 可视化编辑器 | ready | 已通过样本运行检查 |
| dev/git-cheatsheet | Git 命令速查 | ready | 已通过样本运行检查 |
| dev/github-actions-generator | GitHub Actions 生成器 | ready | 已通过样本运行检查 |
| dev/gitignore-generator | .gitignore 生成器 | skipped | run: Cannot read properties of null (reading 'getAttribute') |
| dev/glassmorphism | Glassmorphism 生成器 | ready | 已通过样本运行检查 |
| dev/glob-tester | Glob 模式测试 | ready | 已通过样本运行检查 |
| dev/graphql-builder | GraphQL 查询构建器 | ready | 部分原页面操作未通过迁移检查: parse-schema: 原工具没有产生可输出的结果，请检查参数 |
| dev/graphql-playground | GraphQL Playground | skipped | 没有检测到可独立调用的无界面计算操作 |
| dev/hash-generator | Hash 生成器 | ready | 已通过样本运行检查 |
| dev/hex-viewer | Hex 查看器 | ready | 已通过样本运行检查 |
| dev/hmac-generator | HMAC 生成器 | ready | 已通过样本运行检查 |
| dev/htaccess-nginx | htaccess转Nginx | ready | 已通过样本运行检查 |
| dev/html-entities | HTML 实体参考 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/html-entity | HTML 实体编解码 | ready | 已通过样本运行检查 |
| dev/html-formatter | HTML 格式化 | ready | 已通过样本运行检查 |
| dev/html-minify | HTML 压缩 | ready | 已通过样本运行检查 |
| dev/html-preview | HTML 实时预览 | skipped | update-preview: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| dev/html-table-generator | HTML 表格生成器 | ready | 已通过样本运行检查 |
| dev/html-template | HTML 模板生成器 | ready | 已通过样本运行检查 |
| dev/html-to-jsx | HTML 转 JSX/React 转换器 | ready | 已通过样本运行检查 |
| dev/http-status | HTTP 状态码参考 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/i18n-key-generator | i18n Key 生成器 | ready | 已通过样本运行检查 |
| dev/ip-converter | IP 地址转换器 | ready | 已通过样本运行检查 |
| dev/js-ast-viewer | JavaScript AST查看器 | ready | 已通过样本运行检查 |
| dev/js-formatter | JavaScript 格式化 | ready | 部分原页面操作未通过迁移检查: minify: Unexpected token: name (world) |
| dev/js-minifier | JavaScript 代码压缩器 | ready | 部分原页面操作未通过迁移检查: validate-js: 语法验证通过！代码没有语法错误。 |
| dev/js-minify | JavaScript 压缩 | ready | 已通过样本运行检查 |
| dev/js-obfuscator | JS代码混淆 | ready | 已通过样本运行检查 |
| dev/js-playground | JavaScript 在线运行 | ready | 已通过样本运行检查 |
| dev/json-diff | JSON Diff 对比 | ready | 已通过样本运行检查 |
| dev/json-formatter | JSON 格式化 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/json-minifier | JSON 压缩和美化器 | ready | 已通过样本运行检查 |
| dev/json-minify | JSON 压缩 | ready | 已通过样本运行检查 |
| dev/json-path-editor | JSON 路径编辑器 | ready | 部分原页面操作未通过迁移检查: update-edit-input: Cannot read properties of null (reading 'value') |
| dev/json-schema-validator | JSON Schema 验证器 | ready | 已通过样本运行检查 |
| dev/json-to-go | JSON 转 Go Struct | ready | 已通过样本运行检查 |
| dev/json-to-sql | JSON 转 SQL | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/json-to-typescript | JSON 转 TypeScript | ready | 已通过样本运行检查 |
| dev/json-tree | JSON 树形查看器 | ready | 部分原页面操作未通过迁移检查: search-tree: 原工具没有产生可输出的结果，请检查参数 |
| dev/json-typescript | JSON → TypeScript 类型生成 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/json-yaml | JSON-YAML 转换 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/jsonpath-query | JSONPath 查询 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/jsonpath-tester | JSONPath 测试器 | ready | 已通过样本运行检查 |
| dev/jwt-decoder | JWT 解码器 | ready | 已通过样本运行检查 |
| dev/keyboard-tester | 键盘测试器 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| dev/keycode | Keycode 查看器 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| dev/license-generator | License 生成器 | ready | 已通过样本运行检查 |
| dev/markdown-to-html | Markdown 转 HTML 转换器 | ready | 已通过样本运行检查 |
| dev/math-symbols | 数学符号大全 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/meta-viewport | Viewport Meta 生成器 | ready | 已通过样本运行检查 |
| dev/mime-lookup | MIME 类型查询 | ready | 已通过样本运行检查 |
| dev/neumorphism | Neumorphism 生成器 | ready | 已通过样本运行检查 |
| dev/nginx-config | Nginx 配置生成器 | ready | 已通过样本运行检查 |
| dev/nginx-generator | Nginx 配置生成器 \| 在线工具 | ready | 已通过样本运行检查 |
| dev/openapi-viewer | OpenAPI/Swagger查看器 | ready | 已通过样本运行检查 |
| dev/otp-generator | OTP 验证码生成器 | ready | 已通过样本运行检查 |
| dev/package-json-editor | package.json编辑器 | ready | 已通过样本运行检查 |
| dev/package-json-gen | package.json 生成器 | ready | 已通过样本运行检查 |
| dev/protobuf-decoder | Protobuf 解码器 | ready | 已通过样本运行检查 |
| dev/punycode | Punycode 转换器 | ready | 已通过样本运行检查 |
| dev/readme-generator | README 生成器 | ready | 已通过样本运行检查 |
| dev/readme-preview | README.md 实时预览器 | ready | 已通过样本运行检查 |
| dev/regex-cheatsheet | 正则表达式速查 | skipped | run: 原工具没有产生可输出的结果，请检查参数 |
| dev/regex-explainer | 正则可视化解释器 | ready | 已通过样本运行检查 |
| dev/regex-generator | 正则表达式生成器 | ready | 已通过样本运行检查 |
| dev/regex-tester | 正则测试器 | ready | 已通过样本运行检查 |
| dev/regex-visualizer | 正则表达式可视化器 | ready | 部分原页面操作未通过迁移检查: update-flag-buttons: 原工具没有产生可输出的结果，请检查参数 |
| dev/responsive-preview | 响应式预览 | ready | 已通过样本运行检查 |
| dev/rsa-keygen | RSA 密钥对生成器 | ready | 已通过样本运行检查 |
| dev/semver-compare | Semver 比较器 | ready | 已通过样本运行检查 |
| dev/shortcuts-cheatsheet | 快捷键速查表 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/slug-generator | Slug 生成器 | ready | 已通过样本运行检查 |
| dev/sql-converter | SQL 转换器 | ready | 部分原页面操作未通过迁移检查: format-input: 原工具没有产生可输出的结果，请检查参数 \| update-placeholder: 原工具没有产生可输出的结果，请检查参数 |
| dev/sql-formatter | SQL 格式化 | ready | 已通过样本运行检查 |
| dev/sql-playground | SQL在线执行器 | ready | 已通过样本运行检查 |
| dev/sql-to-mongo | SQL 转 MongoDB 查询 | ready | 已通过样本运行检查 |
| dev/sse-test | SSE测试客户端 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/string-builder | 字符串拼接器 | ready | 部分原页面操作未通过迁移检查: update-output: 原工具没有产生可输出的结果，请检查参数 |
| dev/svg-optimizer | SVG优化器 | ready | 部分原页面操作未通过迁移检查: export-svg: 原工具没有产生可输出的结果，请检查参数 |
| dev/svg-path-editor | SVG 路径编辑器 | ready | 已通过样本运行检查 |
| dev/symbols-table | 特殊符号大全 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/table-border | 表格线生成器 | ready | 已通过样本运行检查 |
| dev/tailwind-config-generator | Tailwind CSS 配置生成器 | ready | 已通过样本运行检查 |
| dev/tailwind-lookup | Tailwind CSS 查询器 | skipped | flatten-classes: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| dev/toml-yaml-json | TOML/YAML/JSON 转换器 | ready | 已通过样本运行检查 |
| dev/tsconfig-editor | tsconfig编辑器 | skipped | export-config: 解析失败: Unexpected token 'H', "Hello worl"... is not valid JSON \| update-config: 解析失败: Unexpected token 'H', "Hello worl"... is not valid JSON \| run: 解析失败: Unexpected token 'H', "Hello worl"... is not valid JSON |
| dev/unicode-converter | Unicode 转换器 | ready | 已通过样本运行检查 |
| dev/unicode-lookup | Unicode 查询 | ready | 已通过样本运行检查 |
| dev/url-codec | URL 编解码 | ready | 部分原页面操作未通过迁移检查: parse: 无效的 URL 格式 \| parse-url: 无效的 URL 格式 \| run: 原工具没有产生可输出的结果，请检查参数 |
| dev/url-parser | URL 解析器 | ready | 已通过样本运行检查 |
| dev/webhook-tester | Webhook测试器 | ready | 已通过样本运行检查 |
| dev/websocket-test | WebSocket测试客户端 | ready | 已通过样本运行检查 |
| dev/xml-formatter | XML 格式化 | ready | 部分原页面操作未通过迁移检查: validate: XML 格式错误: 3:10: text data outside of root node. \| run: 原工具没有产生可输出的结果，请检查参数 |
| dev/xml-json | XML ⇄ JSON 转换 | ready | 部分原页面操作未通过迁移检查: xml-to-json: XML 解析错误: 1:26: text data outside of root node. \| run: 原工具没有产生可输出的结果，请检查参数 |
| dev/xpath-tester | XPath 测试器 | ready | 已通过样本运行检查 |
| extractor/favicon-extractor | 网站图标提取器 | skipped | extract-favicons: 图像适配仅支持本地文件和 data URL |
| extractor/link-extractor | 链接提取器 | ready | 已通过样本运行检查 |
| extractor/regex-extractor | 正则提取器 | ready | 已通过样本运行检查 |
| extractor/text-extractor | 文本信息提取器 | ready | 已通过样本运行检查 |
| fun/aim-trainer | 瞄准训练 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| fun/coin-flip | 抛硬币 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| fun/dice-roller | 骰子模拟器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| fun/number-memory | 数字记忆测试 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| fun/reaction-time | 反应时间测试 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| fun/sequence-memory | 序列记忆测试 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| fun/what-to-eat | 今天吃什么 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| fun/wheel-spinner | 转盘抽奖 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| fun/yes-or-no | 是或否决策器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| game/game-2048 | 2048 游戏 | skipped | 小游戏，需要持续交互界面 |
| game/game-minesweeper | 扫雷 | skipped | 小游戏，需要持续交互界面 |
| game/game-snake | 贪吃蛇 | skipped | 小游戏，需要持续交互界面 |
| game/game-sudoku | 数独 | skipped | 小游戏，需要持续交互界面 |
| game/game-tetris | 俄罗斯方块 | skipped | 小游戏，需要持续交互界面 |
| generator/avatar-generator | 头像生成器 | ready | 已通过样本运行检查 |
| generator/barcode | 条形码生成器 | ready | 已通过样本运行检查 |
| generator/business-card | 名片生成器 | skipped | export-card-front: Unsupported image type \| export-card-back: Unsupported image type \| render: Unsupported image type \| run: Unsupported image type |
| generator/certificate-gen | 证书生成器 | skipped | 原算法依赖外部脚本，尚需 Node.js 专项适配: https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js |
| generator/code-card | 代码卡片生成器 | ready | 已通过样本运行检查 |
| generator/email-signature | 邮件签名生成器 | ready | 已通过样本运行检查 |
| generator/fake-data | 假数据生成器 | ready | 部分原页面操作未通过迁移检查: person: 原工具没有产生可输出的结果，请检查参数 \| name: 原工具没有产生可输出的结果，请检查参数 \| email: 原工具没有产生可输出的结果，请检查参数 \| phone: 原工具没有产生可输出的结果，请检查参数 \| idcard: 原工具没有产生可输出的结果，请检查参数 \| company: 原工具没有产生可输出的结果，请检查参数 \| ip: 原工具没有产生可输出的结果，请检查参数 \| url: 原工具没有产生可输出的结果，请检查参数 \| date: 原工具没有产生可输出的结果，请检查参数 \| uuid: 原工具没有产生可输出的结果，请检查参数 \| color: 原工具没有产生可输出的结果，请检查参数 \| generate-name: 原工具没有产生可输出的结果，请检查参数 \| generate-person: 原工具没有产生可输出的结果，请检查参数 |
| generator/github-contrib | GitHub 贡献图生成器 | ready | 部分原页面操作未通过迁移检查: generate-contribution-data: 原工具没有产生可输出的结果，请检查参数 |
| generator/gradient-card | 渐变色卡生成器 | ready | 部分原页面操作未通过迁移检查: extract-colors: 原工具没有产生可输出的结果，请检查参数 |
| generator/invoice-gen | 发票/收据生成器 | skipped | 原算法依赖外部脚本，尚需 Node.js 专项适配: https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js |
| generator/logo-text | Logo 文字生成器 | ready | 已通过样本运行检查 |
| generator/meme-maker | 表情包生成器 | skipped | export-meme: Unsupported image type \| render: Unsupported image type \| run: Unsupported image type |
| generator/mesh-gradient | Mesh渐变背景生成器 | ready | 已通过样本运行检查 |
| generator/mock-data | Mock 数据生成器 | ready | 部分原页面操作未通过迁移检查: update-field-visibility: 已生成 10 条数据 \| run: 已生成 10 条数据 |
| generator/nanoid-generator | NanoID 生成器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| generator/noise-texture | 噪点纹理生成器 | ready | 已通过样本运行检查 |
| generator/password-generator | 密码生成器 | ready | 已通过样本运行检查 |
| generator/pixel-editor | 像素画编辑器 | ready | 已通过样本运行检查 |
| generator/placeholder-image | 占位图生成器 | ready | 已通过样本运行检查 |
| generator/progress-bar-generator | 进度条生成器 | ready | 已通过样本运行检查 |
| generator/qrcode-batch | 批量二维码生成器 | ready | 已通过样本运行检查 |
| generator/qrcode-generator | 二维码生成器 | ready | 已通过样本运行检查 |
| generator/qrcode-scanner | 二维码扫描器 | skipped | 原算法依赖外部脚本，尚需 Node.js 专项适配: https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js |
| generator/resume-builder | 简历生成器 | ready | 已通过样本运行检查 |
| generator/signature-gen | 签名生成器 | ready | 已通过样本运行检查 |
| generator/slug-generator | URL Slug 生成器 | ready | 已通过样本运行检查 |
| generator/social-image | 社交媒体图片生成器 | ready | 已通过样本运行检查 |
| generator/stamp-maker | 印章生成器 | ready | 已通过样本运行检查 |
| generator/svg-blob | SVG Blob形状生成器 | ready | 已通过样本运行检查 |
| generator/text-to-image | 文字卡片生成器 | ready | 已通过样本运行检查 |
| generator/uuid-generator | UUID/ULID 生成器 | ready | 已通过样本运行检查 |
| generator/vcard-qr | 二维码名片生成器 | ready | 已通过样本运行检查 |
| generator/wave-bg | 波浪背景生成器 | ready | 已通过样本运行检查 |
| generator/white-noise | 白噪音生成器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| generator/wifi-qr | WiFi 二维码生成器 | ready | 已通过样本运行检查 |
| media/favicon-generator | Favicon 生成器 | skipped | export-selected: 找不到输入字段: field-9 \| export-all: 找不到输入字段: field-9 \| update-size-previews: 找不到输入字段: field-9 \| run: 找不到输入字段: field-9 |
| media/gif-maker | GIF制作 | skipped | 原算法依赖外部脚本，尚需 Node.js 专项适配: https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.js |
| media/gif-splitter | GIF分割 | skipped | export-all: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| media/id-photo | 证件照裁剪 | ready | 已通过样本运行检查 |
| media/image-blur | 图片模糊 | ready | 部分原页面操作未通过迁移检查: full: 原工具没有产生可输出的结果，请检查参数 \| background: 原工具没有产生可输出的结果，请检查参数 \| radial: 原工具没有产生可输出的结果，请检查参数 |
| media/image-border | 图片加边框 | ready | 已通过样本运行检查 |
| media/image-collage | 图片拼接 | ready | 部分原页面操作未通过迁移检查: generate-preview: 原工具没有产生可输出的结果，请检查参数 |
| media/image-compressor | 图片压缩器 | ready | 已通过样本运行检查 |
| media/image-cropper | 图片裁剪工具 | ready | 已通过样本运行检查 |
| media/image-filter | 图片滤镜 | ready | 已通过样本运行检查 |
| media/image-flip | 图片翻转 | ready | 部分原页面操作未通过迁移检查: update-button-states: 原工具没有产生可输出的结果，请检查参数 |
| media/image-mosaic | 图片马赛克 | ready | 已通过样本运行检查 |
| media/image-resizer | 图片尺寸调整 | ready | 已通过样本运行检查 |
| media/image-rotate | 图片旋转 | ready | 已通过样本运行检查 |
| media/image-round-corner | 图片圆角 | ready | 已通过样本运行检查 |
| media/image-sketch | 图片转素描 | ready | 已通过样本运行检查 |
| media/image-split | 图片分割 | ready | 部分原页面操作未通过迁移检查: export-all: 原工具没有产生可输出的结果，请检查参数 \| update-grid-overlay: 原工具没有产生可输出的结果，请检查参数 |
| media/image-text | 图片加文字 | ready | 已通过样本运行检查 |
| media/image-to-base64 | 图片 Base64 转换 | skipped | export-decoded: Unsupported image type \| update-output: Unsupported image type \| decode-base64: Unsupported image type \| run: Unsupported image type |
| life/annual-leave | 年假计算器 | ready | 部分原页面操作未通过迁移检查: standard: 原工具没有产生可输出的结果，请检查参数 \| new-entry: 原工具没有产生可输出的结果，请检查参数 \| resign: 原工具没有产生可输出的结果，请检查参数 \| compensation: 原工具没有产生可输出的结果，请检查参数 |
| life/bank-card-validator | 银行卡号校验 | ready | 已通过样本运行检查 |
| life/classroom-danmaku | 课堂弹幕 | skipped | 原算法依赖外部脚本，尚需 Node.js 专项适配: https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js, https://unpkg.com/mqtt@5.10.3/dist/mqtt.min.js |
| life/color-picker | 颜色选择器 | ready | 部分原页面操作未通过迁移检查: update-preview: 原工具没有产生可输出的结果，请检查参数 |
| life/date-diff | 日期差计算器 | ready | 已通过样本运行检查 |
| life/electricity-bill | 阶梯电费计算器 | ready | 部分原页面操作未通过迁移检查: peakvalley: 原工具没有产生可输出的结果，请检查参数 \| fixed: 原工具没有产生可输出的结果，请检查参数 |
| life/fitness-test | 体测成绩计算器 | ready | 已通过样本运行检查 |
| life/id-card-validator | 身份证号校验 | ready | 已通过样本运行检查 |
| life/income-tax-calculator | 个税计算器 2025 | ready | 已通过样本运行检查 |
| life/license-plate-lookup | 车牌归属地查询 | ready | 已通过样本运行检查 |
| life/money-uppercase | 金额大写转换 | ready | 已通过样本运行检查 |
| life/mortgage-calculator | 房贷计算器 2025 | ready | 已通过样本运行检查 |
| life/password-generator | 随机密码生成器 | ready | 已通过样本运行检查 |
| life/random-number | 随机数生成器 | ready | 已通过样本运行检查 |
| life/random-picker | 随机点名器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| life/relative-calculator | 亲戚称呼计算器 | ready | 部分原页面操作未通过迁移检查: calculate: 请先添加亲戚关系 |
| life/retirement-calculator | 退休年龄计算器 2025 | ready | 已通过样本运行检查 |
| life/student-grouping | 学生分组工具 | ready | 部分原页面操作未通过迁移检查: random: 原工具没有产生可输出的结果，请检查参数 \| gender: 原工具没有产生可输出的结果，请检查参数 \| score: 原工具没有产生可输出的结果，请检查参数 |
| life/word-counter | 字数统计工具 | ready | 已通过样本运行检查 |
| media/audio-cutter | 音频剪辑器 | skipped | 原算法依赖外部脚本，尚需 Node.js 专项适配: https://cdn.jsdelivr.net/npm/lamejs@1.2.1/lame.min.js |
| media/audio-visualizer | 音频可视化器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| media/base64-image | Base64 图片转换 | ready | 部分原页面操作未通过迁移检查: decode-btn: Unsupported image type \| decode-base64: Unsupported image type |
| media/batch-resize | 图片批量调整尺寸 | ready | 部分原页面操作未通过迁移检查: export-all: 原工具没有产生可输出的结果，请检查参数 |
| media/camera-demo | 摄像头拍照 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| media/color-extractor | 图片颜色提取器 | ready | 已通过样本运行检查 |
| media/exif-viewer | EXIF 信息查看 | skipped | run: 原工具没有产生可输出的结果，请检查参数 |
| media/ico-viewer | ICO 图标查看器 | skipped | run: 不是有效的 ICO/CUR 文件 |
| media/image-base64 | 图片 Base64 转换器 | skipped | export-text: Unsupported image type \| export-image: Unsupported image type \| update-output: Unsupported image type \| decode-base64: Unsupported image type \| run: Unsupported image type |
| media/image-color-picker | 图片颜色提取 | ready | 已通过样本运行检查 |
| media/image-compare | 图片对比滑块 | ready | 部分原页面操作未通过迁移检查: vertical: 原工具没有产生可输出的结果，请检查参数 \| horizontal: 原工具没有产生可输出的结果，请检查参数 \| blend: 原工具没有产生可输出的结果，请检查参数 \| side-by-side: 原工具没有产生可输出的结果，请检查参数 \| update-slider: 原工具没有产生可输出的结果，请检查参数 |
| media/image-crop | 图片裁剪 | ready | 已通过样本运行检查 |
| media/image-format-converter | 图片格式批量转换 | ready | 部分原页面操作未通过迁移检查: export-all-as-zip: 没有可下载的文件 |
| media/image-pixelate | 图片像素化/马赛克 | ready | 已通过样本运行检查 |
| media/image-resize | 图片压缩对比 | ready | 已通过样本运行检查 |
| media/image-to-ascii | 图片转 ASCII 艺术 | ready | 已通过样本运行检查 |
| media/image-watermark | 图片水印 | ready | 已通过样本运行检查 |
| media/screen-recorder | 屏幕录制器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| media/screenshot-beautifier | 截图美化工具 | ready | 已通过样本运行检查 |
| media/speech-to-text | 语音转文字 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| media/svg-editor | SVG 编辑器 | ready | 已通过样本运行检查 |
| media/svg-placeholder | SVG 占位图生成器 \| HTML Tools | ready | 已通过样本运行检查 |
| media/svg-render | SVG 渲染器 | ready | 部分原页面操作未通过迁移检查: generate-image-data: Invalid SVG image |
| media/svg-to-png | SVG 转 PNG | ready | 部分原页面操作未通过迁移检查: convert-to-png: Cannot read properties of null (reading 'getContext') \| export-png: 请先转换为 PNG |
| media/text-to-image | 文字转图片 | ready | 已通过样本运行检查 |
| media/text-to-speech | 文字转语音 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| media/video-thumbnail | 视频缩略图提取器 | ready | 部分原页面操作未通过迁移检查: export-selected: 原工具没有产生可输出的结果，请检查参数 \| export-all: 原工具没有产生可输出的结果，请检查参数 \| detect-scene-changes: 原工具没有产生可输出的结果，请检查参数 |
| network/device-info | 设备信息 | skipped | 没有检测到可独立调用的无界面计算操作 |
| network/dns-lookup | DNS 记录查询工具 | ready | 部分原页面操作未通过迁移检查: a: 原工具没有产生可输出的结果，请检查参数 \| aaaa: 原工具没有产生可输出的结果，请检查参数 \| cname: 原工具没有产生可输出的结果，请检查参数 \| mx: 原工具没有产生可输出的结果，请检查参数 \| ns: 原工具没有产生可输出的结果，请检查参数 \| txt: 原工具没有产生可输出的结果，请检查参数 \| soa: 原工具没有产生可输出的结果，请检查参数 |
| network/http-header-parser | HTTP 头解析器 | ready | 已通过样本运行检查 |
| network/ip-calculator | IP 地址计算器 | ready | 已通过样本运行检查 |
| network/ip-lookup | IP 地址查询 | ready | 已通过样本运行检查 |
| network/ip-tools | IP 地址工具 | ready | 已通过样本运行检查 |
| network/mac-lookup | MAC 地址查询 | ready | 已通过样本运行检查 |
| network/port-lookup | 端口查询器 | ready | 已通过样本运行检查 |
| network/rest-client | REST API 测试器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| network/sse-client | SSE 事件流调试器 | ready | 已通过样本运行检查 |
| network/ssl-parser | SSL 证书解析器 | ready | 已通过样本运行检查 |
| network/subnet-calculator | IP 子网计算器 | ready | 已通过样本运行检查 |
| network/user-agent | User Agent 解析器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| network/websocket-client | WebSocket 调试器 | skipped | send-message: 原工具没有产生可输出的结果，请检查参数 |
| privacy/credit-card | 信用卡验证器 | ready | 已通过样本运行检查 |
| privacy/encrypt-decrypt | AES 加密解密 | ready | 已通过样本运行检查 |
| privacy/exif-remover | EXIF 信息移除器 | ready | 已通过样本运行检查 |
| privacy/file-hash | 文件哈希校验 | ready | 已通过样本运行检查 |
| privacy/idcard-parser | 身份证号码解析 | ready | 已通过样本运行检查 |
| privacy/log-masker | 日志脱敏 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| privacy/metadata-viewer | 文件元数据查看器 | ready | 已通过样本运行检查 |
| privacy/password-strength | 密码强度检测 | ready | 已通过样本运行检查 |
| privacy/random-identity | 随机身份生成 | ready | 部分原页面操作未通过迁移检查: generate-identity: 原工具没有产生可输出的结果，请检查参数 |
| privacy/random-key | 随机密钥生成器 | ready | 已通过样本运行检查 |
| privacy/rsa-tool | RSA 加密解密 | ready | 部分原页面操作未通过迁移检查: encrypt-text: Invalid keyData \| decrypt-text: Invalid keyData |
| privacy/steganography | 图片隐写术工具 | skipped | encode-btn: [object Event] \| decode-btn: Unsupported image type \| update-encode-button: Unsupported image type \| run: [object Event] |
| privacy/text-encrypt | 文本加密解密 | ready | 部分原页面操作未通过迁移检查: decrypt-text: The operation failed for an operation-specific reason \| update-count: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| security/bcrypt-generator | Bcrypt 工具 | ready | 已通过样本运行检查 |
| security/cookie-parser | Cookie 解析器 | ready | 已通过样本运行检查 |
| security/cors-generator | CORS 配置生成器 | skipped | update-config: 找不到输入字段: field-3 \| generate-output: 找不到输入字段: field-3 \| run: 找不到输入字段: field-3 |
| security/csp-generator | CSP 策略生成器 | ready | 已通过样本运行检查 |
| security/hash-generator | 哈希生成器 | ready | 已通过样本运行检查 |
| security/header-analyzer | HTTP 响应头分析器 | ready | 已通过样本运行检查 |
| security/headers-check | 安全头检测器 | ready | 部分原页面操作未通过迁移检查: filter-headers: 原工具没有产生可输出的结果，请检查参数 |
| security/password-strength | 密码强度检测器 | ready | 已通过样本运行检查 |
| security/sitemap-generator | sitemap.xml 生成器 | ready | 部分原页面操作未通过迁移检查: validate-output: 原工具没有产生可输出的结果，请检查参数 |
| security/totp-generator | TOTP 生成器 | skipped | generate-secret: 图像适配仅支持本地文件和 data URL \| update-totp: 原工具没有产生可输出的结果，请检查参数 |
| security/url-defang | URL安全化 | ready | 已通过样本运行检查 |
| seo/heading-analyzer | 标题结构分析器 | ready | 已通过样本运行检查 |
| seo/image-alt-checker | 图片Alt属性检查器 | ready | 部分原页面操作未通过迁移检查: filter-images-all: Cannot read properties of undefined (reading 'target') \| filter-images-has-alt: Cannot read properties of undefined (reading 'target') \| filter-images-empty-alt: Cannot read properties of undefined (reading 'target') \| filter-images-no-alt: Cannot read properties of undefined (reading 'target') |
| seo/keyword-density | 关键词密度分析器 | ready | 已通过样本运行检查 |
| seo/link-analyzer | 链接分析器 | ready | 部分原页面操作未通过迁移检查: filter-links-all: Cannot read properties of undefined (reading 'target') \| filter-links-internal: Cannot read properties of undefined (reading 'target') \| filter-links-external: Cannot read properties of undefined (reading 'target') \| filter-links-nofollow: Cannot read properties of undefined (reading 'target') |
| seo/meta-preview | 搜索结果预览 | ready | 已通过样本运行检查 |
| seo/meta-tags-generator | Meta Tags 生成器 | ready | 已通过样本运行检查 |
| seo/robots-generator | Robots.txt 生成器 | ready | 已通过样本运行检查 |
| text/bbcode-converter | BBCode与HTML互转 | ready | 已通过样本运行检查 |
| text/case-converter | 文本大小写转换 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| text/chinese-converter | 中文简繁转换器 | ready | 已通过样本运行检查 |
| text/cn-convert | 中文简繁转换 | ready | 已通过样本运行检查 |
| text/column-processor | 文本列处理器 | ready | 已通过样本运行检查 |
| text/diff-checker | 文本对比工具 | ready | 已通过样本运行检查 |
| text/emoji-search | Emoji 搜索器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| text/frequency-analyzer | 文本频率分析器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| text/homophone-checker | 同音字检查器 | skipped | check-btn: 原工具没有产生可输出的结果，请检查参数 \| check-homophones: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| text/html-markdown | HTML ⇄ Markdown 转换 | ready | 部分原页面操作未通过迁移检查: update-counts: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| text/latex-editor | LaTeX公式编辑器 | ready | 已通过样本运行检查 |
| text/line-number | 行号添加/移除 | ready | 已通过样本运行检查 |
| text/line-sorter | 行排序工具 | ready | 已通过样本运行检查 |
| text/markdown-editor | Markdown 编辑器 | ready | 已通过样本运行检查 |
| text/markdown-preview | Markdown 预览 | ready | 已通过样本运行检查 |
| text/markdown-table | Markdown 表格生成器 | ready | 已通过样本运行检查 |
| text/md-to-html | Markdown 转 HTML | ready | 已通过样本运行检查 |
| text/morse-code | 摩尔斯电码 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| text/nato-alphabet | NATO 字母表 | ready | 已通过样本运行检查 |
| text/number-formatter | 数字格式化工具 | ready | 已通过样本运行检查 |
| text/pangu-spacing | 盘古之白 | ready | 已通过样本运行检查 |
| text/pinyin-sort | 拼音排序工具 | ready | 部分原页面操作未通过迁移检查: parse-input: 原工具没有产生可输出的结果，请检查参数 |
| text/placeholder-text | 占位文本生成器 | ready | 已通过样本运行检查 |
| text/random-picker | 随机文本选择器 | ready | 已通过样本运行检查 |
| text/reading-time | 阅读时间估算 | ready | 已通过样本运行检查 |
| text/richtext-to-plain | 富文本转纯文本 | skipped | convert: 原工具没有产生可输出的结果，请检查参数 \| update-counts: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| text/roman-numeral | 罗马数字转换器 | skipped | 没有检测到可独立调用的无界面计算操作 |
| text/shuangpin-trainer | 双拼练习器 | ready | 已通过样本运行检查 |
| text/slugify | Slugify 工具 | ready | 已通过样本运行检查 |
| text/string-escape | 字符串转义 | ready | 已通过样本运行检查 |
| text/template-filler | 文本模板填充器 | ready | 已通过样本运行检查 |
| text/text-cipher | 文本加密/解密 | ready | 已通过样本运行检查 |
| text/text-columns | 列处理工具 | ready | 已通过样本运行检查 |
| text/text-compare | 文本对比增强版 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| text/text-dedup | 文本去重 | ready | 部分原页面操作未通过迁移检查: update-input-count: 原工具没有产生可输出的结果，请检查参数 \| update-output-count: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| text/text-diff | 文本 Diff | ready | 已通过样本运行检查 |
| text/text-encrypt | 文本加密工具 | ready | 部分原页面操作未通过迁移检查: update-key-section: 原工具没有产生可输出的结果，请检查参数 \| update-strength: 原工具没有产生可输出的结果，请检查参数 |
| text/text-frequency | 文本频率分析 | ready | 已通过样本运行检查 |
| text/text-merge | 多行文本合并器 | ready | 部分原页面操作未通过迁移检查: update-separator-preview: 原工具没有产生可输出的结果，请检查参数 |
| text/text-randomizer | 文本随机化工具 | ready | 已通过样本运行检查 |
| text/text-repeat | 文本重复工具 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| text/text-reverse | 文本翻转工具 | ready | 部分原页面操作未通过迁移检查: char: 原工具没有产生可输出的结果，请检查参数 \| word: 原工具没有产生可输出的结果，请检查参数 \| line: 原工具没有产生可输出的结果，请检查参数 \| sentence: 原工具没有产生可输出的结果，请检查参数 |
| text/text-similarity | 文本相似度计算 | ready | 已通过样本运行检查 |
| text/text-sort | 文本排序 | ready | 部分原页面操作未通过迁移检查: update-input-count: 原工具没有产生可输出的结果，请检查参数 \| update-output-count: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| text/text-splitter | 文本分割器 | ready | 部分原页面操作未通过迁移检查: delimiter: 原工具没有产生可输出的结果，请检查参数 \| length: 原工具没有产生可输出的结果，请检查参数 \| lines: 原工具没有产生可输出的结果，请检查参数 \| regex: 原工具没有产生可输出的结果，请检查参数 \| count: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| text/text-stats | 文本统计增强版 | ready | 已通过样本运行检查 |
| text/text-to-binary | 文本二进制转换器 | ready | 已通过样本运行检查 |
| text/text-truncate | 文本截断工具 | ready | 已通过样本运行检查 |
| text/whitespace-cleaner | 空白字符清理 | ready | 已通过样本运行检查 |
| text/word-counter | 字数统计 | ready | 已通过样本运行检查 |
| text/word-frequency | 词频统计 | ready | 已通过样本运行检查 |
| time/chinese-calendar | 农历日历 | ready | 已通过样本运行检查 |
| time/countdown-event | 纪念日倒计时 | ready | 已通过样本运行检查 |
| time/countdown | 倒计时器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| time/cron-parser | Cron 表达式解析 | ready | 已通过样本运行检查 |
| time/date-calculator | 日期计算器 | ready | 已通过样本运行检查 |
| time/meeting-scheduler | 跨时区会议时间协调器 | ready | 已通过样本运行检查 |
| time/pomodoro | 番茄钟计时器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| time/stopwatch | 秒表计时器 | ready | 已通过样本运行检查 |
| time/timestamp | 时间戳转换 | ready | 部分原页面操作未通过迁移检查: convert-ts: 无效的时间戳 \| convert-timestamp: 无效的时间戳 |
| time/timezone-converter | 时区转换器 | ready | 已通过样本运行检查 |
| time/work-hours | 工时计算器 | ready | 已通过样本运行检查 |
| time/world-clock | 世界时钟 | ready | 已通过样本运行检查 |
| life/clipboard-history | 剪贴板历史 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| life/file-merger | 文件合并器 | ready | 已通过样本运行检查 |
| life/multi-counter | 多功能计数器 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| life/quick-notes | 快捷便签 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| dev/code-screenshot | 代码截图美化 | skipped | 原算法依赖外部脚本，尚需 Node.js 专项适配: https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-typescript.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-python.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-java.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-c.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-cpp.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-csharp.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-go.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-rust.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-ruby.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-markup-templating.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-php.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-swift.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-kotlin.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-sql.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-bash.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-yaml.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-json.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-markdown.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-docker.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-graphql.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-jsx.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-tsx.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-scss.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-diff.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-toml.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-ini.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-regex.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-lua.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-perl.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-haskell.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-elixir.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-clojure.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-dart.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-r.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-matlab.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-scala.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-powershell.min.js, https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-nginx.min.js, https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js |
| generator/chart-generator | 在线图表生成器 | skipped | bar: ResizeObserver is not defined \| line: ResizeObserver is not defined \| pie: ResizeObserver is not defined \| doughnut: ResizeObserver is not defined \| radar: ResizeObserver is not defined \| polar-area: ResizeObserver is not defined \| export-png: ResizeObserver is not defined \| export-svg: ResizeObserver is not defined \| run: ResizeObserver is not defined |
| media/pdf-merge | PDF合并工具 | ready | 部分原页面操作未通过迁移检查: merge-btn: Cannot set properties of null (setting 'textContent') |
| media/pdf-split | PDF拆分工具 | ready | 部分原页面操作未通过迁移检查: split-btn: Cannot read properties of null (reading 'classList') |
| network/http-client | HTTP客户端 | ready | 部分原页面操作未通过迁移检查: json: 原工具没有产生可输出的结果，请检查参数 \| text: 原工具没有产生可输出的结果，请检查参数 \| xml: 原工具没有产生可输出的结果，请检查参数 \| form: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| generator/tweet-generator | 推特截图生成器 | skipped | 原算法依赖外部脚本，尚需 Node.js 专项适配: https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js |
| generator/social-size-guide | 社交媒体尺寸指南 | skipped | run: 原工具没有产生可输出的结果，请检查参数 |
| food/tea-timer | 泡茶计时器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| food/calorie-counter | 食物卡路里查询 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| finance/stock-calculator | 股票收益计算器 | ready | 已通过样本运行检查 |
| finance/currency-converter | 汇率换算器 | ready | 已通过样本运行检查 |
| finance/tax-calculator | 个人所得税计算器 | ready | 已通过样本运行检查 |
| finance/budget-planner | 家庭预算规划器 | ready | 已通过样本运行检查 |
| finance/investment-return | 投资回报率计算器 | ready | 已通过样本运行检查 |
| finance/debt-payoff | 债务还款计算器 | ready | 已通过样本运行检查 |
| finance/retirement-calculator | 退休计算器 | ready | 已通过样本运行检查 |
| finance/profit-margin | 利润率计算器 | ready | 已通过样本运行检查 |
| finance/tip-calculator | 小费计算器 | ready | 已通过样本运行检查 |
| finance/exchange-split | AA记账分摊器 | ready | 已通过样本运行检查 |
| finance/savings-goal | 储蓄目标计算器 | ready | 已通过样本运行检查 |
| finance/depreciation | 资产折旧计算器 | ready | 已通过样本运行检查 |
| health/menstrual-cycle | 月经周期追踪器 | ready | 已通过样本运行检查 |
| health/body-fat | 体脂率计算器 | ready | 已通过样本运行检查 |
| health/water-intake | 每日饮水量计算器 | ready | 已通过样本运行检查 |
| health/calorie-calculator | 卡路里需求计算器 | ready | 已通过样本运行检查 |
| health/heart-rate-zone | 心率区间计算器 | ready | 已通过样本运行检查 |
| health/blood-pressure | 血压分析工具 | ready | 已通过样本运行检查 |
| health/sleep-calculator | 睡眠时间计算器 | ready | 已通过样本运行检查 |
| health/ideal-weight | 理想体重计算器 | ready | 已通过样本运行检查 |
| health/alcohol-metabolism | 酒精代谢计算器 | ready | 已通过样本运行检查 |
| health/medication-reminder | 服药提醒器 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| health/vision-test | 视力测试工具 | skipped | 没有检测到可独立调用的无界面计算操作 |
| health/hearing-test | 听力测试工具 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| health/bac-calculator | 血液酒精浓度计算器 | ready | 已通过样本运行检查 |
| education/gpa-calculator | GPA计算器 | ready | 部分原页面操作未通过迁移检查: update-system-tabs: 原工具没有产生可输出的结果，请检查参数 |
| education/grade-calculator | 成绩计算器 | ready | 已通过样本运行检查 |
| education/study-timer | 学习计时器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| education/flashcard | 单词卡片工具 | ready | 已通过样本运行检查 |
| education/citation-generator | 论文引用格式生成器 | ready | 已通过样本运行检查 |
| education/reading-speed | 阅读速度测试 | ready | 部分原页面操作未通过迁移检查: update-progress: Cannot read properties of null (reading 'questions') |
| education/math-solver | 数学方程求解器 | ready | 部分原页面操作未通过迁移检查: linear: 原工具没有产生可输出的结果，请检查参数 \| quadratic: 原工具没有产生可输出的结果，请检查参数 \| system: 原工具没有产生可输出的结果，请检查参数 |
| education/unit-circle | 三角函数单位圆 | ready | 已通过样本运行检查 |
| education/periodic-table | 元素周期表 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| education/physics-formulas | 物理公式速查 | ready | 已通过样本运行检查 |
| education/chemical-equation | 化学方程式配平 | ready | 已通过样本运行检查 |
| education/statistics | 统计学计算器 | ready | 已通过样本运行检查 |
| education/binary-tree | 二叉树可视化 | ready | 部分原页面操作未通过迁移检查: search-node: 原工具没有产生可输出的结果，请检查参数 |
| food/cooking-converter | 烹饪单位转换器 | ready | 已通过样本运行检查 |
| food/recipe-scaler | 配方缩放工具 | ready | 已通过样本运行检查 |
| food/nutrition-calculator | 营养成分计算器 | ready | 已通过样本运行检查 |
| food/baking-calculator | 烘焙比例计算器 | ready | 已通过样本运行检查 |
| food/coffee-ratio | 咖啡冲泡比例 | ready | 已通过样本运行检查 |
| food/wine-pairing | 葡萄酒配餐指南 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| food/meat-temperature | 肉类温度参考 | ready | 已通过样本运行检查 |
| food/food-cost | 菜品成本计算器 | ready | 已通过样本运行检查 |
| food/shopping-list | 购物清单生成器 | ready | 已通过样本运行检查 |
| food/meal-planner | 周餐计划器 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| food/fermentation-timer | 发酵计时器 | ready | 部分原页面操作未通过迁移检查: bread: 原工具没有产生可输出的结果，请检查参数 \| bread2: 原工具没有产生可输出的结果，请检查参数 \| yogurt: 原工具没有产生可输出的结果，请检查参数 \| sourdough: 原工具没有产生可输出的结果，请检查参数 \| kimchi: 原工具没有产生可输出的结果，请检查参数 \| kombucha: 原工具没有产生可输出的结果，请检查参数 |
| food/serving-size | 食物份量计算器 | ready | 已通过样本运行检查 |
| food/food-storage | 食材保存时间查询 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| food/drink-mixer | 鸡尾酒配方工具 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| chinese/idcard-generator | 身份证号码生成器 | ready | 部分原页面操作未通过迁移检查: update-cities: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| chinese/idcard-validator | 身份证号码验证器 | ready | 已通过样本运行检查 |
| chinese/uscc-validator | 统一社会信用代码验证器 | ready | 部分原页面操作未通过迁移检查: validate: ✗<br>            请输入18位统一社会信用代码 |
| chinese/license-plate | 车牌号归属地查询 | ready | 部分原页面操作未通过迁移检查: query: 原工具没有产生可输出的结果，请检查参数 |
| chinese/lunar-calendar | 农历阳历转换 | ready | 已通过样本运行检查 |
| chinese/chinese-zodiac | 生肖查询工具 | ready | 已通过样本运行检查 |
| chinese/bank-card-bin | 银行卡BIN查询 | skipped | query: 请输入至少6位卡号 \| format-input: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| chinese/phone-attribution | 手机号归属地查询 | ready | 已通过样本运行检查 |
| chinese/chinese-number | 中文大写数字转换 | ready | 已通过样本运行检查 |
| chinese/idiom-dictionary | 成语词典 | skipped | search: 原工具没有产生可输出的结果，请检查参数 |
| chinese/ancient-poetry | 古诗词查询 | ready | 已通过样本运行检查 |
| chinese/stroke-order | 汉字笔画顺序 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| chinese/pinyin-tone | 拼音声调标注 | ready | 已通过样本运行检查 |
| chinese/radicals | 汉字偏旁部首查询 | ready | 已通过样本运行检查 |
| chinese/couplet-generator | 对联生成器 | ready | 已通过样本运行检查 |
| extractor/json-path-extractor | JSON Path 提取器 | ready | 已通过样本运行检查 |
| fun/fortune-teller | 今日运势 | skipped | 没有检测到可独立调用的无界面计算操作 |
| game/memory-match | 记忆配对游戏 | skipped | 小游戏，需要持续交互界面 |
| generator/instagram-generator | Instagram 帖子生成器 | skipped | 原算法依赖外部脚本，尚需 Node.js 专项适配: https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js |
| media/pdf-compress | PDF 压缩工具 | ready | 部分原页面操作未通过迁移检查: compress-pdf: `pdf` must be of type `string` or `Uint8Array` or `ArrayBuffer`, but was actually of type `NaN` \| export-compressed: 原工具没有产生可输出的结果，请检查参数 |
| text/duplicate-remover | 去除重复行 | ready | 已通过样本运行检查 |
| text/upside-down-text | 倒置文字生成器 | ready | 部分原页面操作未通过迁移检查: flip: 原工具没有产生可输出的结果，请检查参数 \| reverse: 原工具没有产生可输出的结果，请检查参数 \| both: 原工具没有产生可输出的结果，请检查参数 |
| generator/utm-generator | UTM 链接生成器 | ready | 已通过样本运行检查 |
| generator/whatsapp-link | WhatsApp 链接生成器 | ready | 已通过样本运行检查 |
| generator/youtube-timestamp | YouTube 时间戳链接 | ready | 已通过样本运行检查 |
| network/gravatar-checker | Gravatar 头像查询 | skipped | 没有检测到可独立调用的无界面计算操作 |
| calculator/age-calculator | 年龄计算器 | ready | 已通过样本运行检查 |
| calculator/compound-interest | 复利计算器 | ready | 已通过样本运行检查 |
| calculator/currency | 汇率转换器 | ready | 已通过样本运行检查 |
| calculator/discount-calc | 折扣计算器 | ready | 已通过样本运行检查 |
| calculator/equation | 方程求解器 | ready | 已通过样本运行检查 |
| calculator/fuel-calc | 油耗计算器 | ready | 已通过样本运行检查 |
| calculator/matrix-calculator | 矩阵计算器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| calculator/mortgage-calculator | 房贷计算器 | ready | 已通过样本运行检查 |
| calculator/permutation | 排列组合计算器 | ready | 已通过样本运行检查 |
| calculator/probability | 概率计算器 | ready | 部分原页面操作未通过迁移检查: calculate-dice: 原工具没有产生可输出的结果，请检查参数 |
| calculator/programmer | 程序员计算器 | ready | 部分原页面操作未通过迁移检查: calculate: 原工具没有产生可输出的结果，请检查参数 \| update-button-states: 原工具没有产生可输出的结果，请检查参数 |
| calculator/salary-calculator | 工资计算器 | ready | 已通过样本运行检查 |
| calculator/scientific | 科学计算器 | ready | 部分原页面操作未通过迁移检查: calculate: 原工具没有产生可输出的结果，请检查参数 |
| calculator/unit-converter | 单位换算器 | ready | 部分原页面操作未通过迁移检查: update-units: 原工具没有产生可输出的结果，请检查参数 |
| converter/area | 面积单位转换器 | ready | 已通过样本运行检查 |
| converter/length | 长度单位转换器 | ready | 已通过样本运行检查 |
| converter/number-base | 任意进制转换器 | ready | 已通过样本运行检查 |
| converter/speed | 速度单位转换器 | ready | 已通过样本运行检查 |
| converter/temperature | 温度转换器 | ready | 已通过样本运行检查 |
| converter/time | 时间单位转换器 | ready | 已通过样本运行检查 |
| converter/volume | 体积容量转换器 | ready | 已通过样本运行检查 |
| converter/weight | 重量单位转换器 | ready | 已通过样本运行检查 |
| dev/chart-generator | 数据图表生成器 | skipped | export-chart-png: ResizeObserver is not defined \| export-chart-jpg: ResizeObserver is not defined \| update-chart: ResizeObserver is not defined \| run: ResizeObserver is not defined |
| dev/gradient-generator | CSS 渐变生成器 | ready | 已通过样本运行检查 |
| dev/http-client | HTTP 请求测试 | ready | 部分原页面操作未通过迁移检查: update-method-color: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| dev/json-schema-generator | JSON Schema 生成器 | ready | 已通过样本运行检查 |
| dev/number-base | 进制转换器 | skipped | run: HELLO WORLDHELLO WORLDTYPESCRIPT; 输入格式无效 |
| generator/color-extractor | 调色板提取器 | ready | 已通过样本运行检查 |
| generator/gradient-generator | 渐变背景生成器 | ready | 已通过样本运行检查 |
| generator/pattern-generator | 几何图案生成器 | ready | 已通过样本运行检查 |
| life/bmr-calculator | 基础代谢率计算器 | ready | 已通过样本运行检查 |
| life/due-date | 预产期计算器 | ready | 已通过样本运行检查 |
| media/color-picker-image | 图片取色器 | ready | 已通过样本运行检查 |
| media/image-filters | 图片滤镜编辑器 | ready | 已通过样本运行检查 |
| media/image-stitcher | 图片拼接器 | ready | 已通过样本运行检查 |
| security/meta-generator | Meta 标签生成器 | ready | 已通过样本运行检查 |
| seo/og-preview | Open Graph 预览器 | skipped | 没有检测到可独立调用的无界面计算操作 |
| text/divider | 分隔线生成器 | ready | 已通过样本运行检查 |
| text/lorem-ipsum | Lorem Ipsum 生成器 | ready | 已通过样本运行检查 |
| text/pinyin | 汉字转拼音 | ready | 已通过样本运行检查 |
| text/typing-test | 打字速度测试 | ready | 已通过样本运行检查 |
| converter/binary-translator | 二进制翻译器 | ready | 已通过样本运行检查 |
| time/countdown-timer | 倒计时定时器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| game/snake-game | 贪吃蛇游戏 | skipped | 小游戏，需要持续交互界面 |
| dev/diff-checker | 文本差异比较 | ready | 已通过样本运行检查 |
| realestate/mortgage | 房贷月供计算器 | ready | 已通过样本运行检查 |
| realestate/down-payment | 首付计算器 | ready | 已通过样本运行检查 |
| realestate/prepayment | 提前还款计算器 | ready | 已通过样本运行检查 |
| realestate/loan-compare | 贷款方案对比 | skipped | 没有检测到可独立调用的无界面计算操作 |
| realestate/combo-loan | 组合贷款计算器 | ready | 已通过样本运行检查 |
| realestate/deed-tax | 契税计算器 | ready | 已通过样本运行检查 |
| realestate/property-tax | 房产交易税费计算器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| realestate/rental-cost | 租房成本计算器 | ready | 已通过样本运行检查 |
| realestate/rent-yield | 租金回报率计算器 | ready | 已通过样本运行检查 |
| realestate/rent-vs-buy | 租房vs买房分析 | ready | 已通过样本运行检查 |
| realestate/property-roi | 房产投资ROI计算器 | ready | 已通过样本运行检查 |
| realestate/lpr-calc | LPR利率调整计算器 | ready | 已通过样本运行检查 |
| realestate/property-fee | 物业费计算器 | ready | 已通过样本运行检查 |
| realestate/decoration-budget | 装修预算计算器 | ready | 已通过样本运行检查 |
| realestate/material-calc | 装修材料用量计算器 | ready | 已通过样本运行检查 |
| business/profit-margin | 毛利净利计算器 | ready | 已通过样本运行检查 |
| business/breakeven | 盈亏平衡分析 | ready | 已通过样本运行检查 |
| business/roi | ROI 计算器 | ready | 已通过样本运行检查 |
| business/npv | 净现值NPV计算器 | ready | 已通过样本运行检查 |
| business/inventory | 库存周转计算器 | ready | 已通过样本运行检查 |
| business/receivables | 应收账款账龄分析 | ready | 已通过样本运行检查 |
| business/cashflow | 现金流预测 | ready | 已通过样本运行检查 |
| business/pricing | 定价策略计算器 | ready | 已通过样本运行检查 |
| business/cost-calc | 成本核算计算器 | ready | 已通过样本运行检查 |
| business/salary | 税后薪资工具(商业版) | ready | 已通过样本运行检查 |
| business/invoice | 发票计算器 | ready | 已通过样本运行检查 |
| business/equity-dilution | 股权稀释计算器 | ready | 已通过样本运行检查 |
| business/valuation | 企业估值计算器 | ready | 已通过样本运行检查 |
| business/business-scope | 经营范围生成器 | ready | 部分原页面操作未通过迁移检查: generate: 原工具没有产生可输出的结果，请检查参数 |
| crypto/profit-loss | 持仓盈亏计算器 | ready | 已通过样本运行检查 |
| crypto/dca | 定投收益计算器 | ready | 已通过样本运行检查 |
| crypto/leverage | 杠杆计算器 | ready | 已通过样本运行检查 |
| crypto/liquidation | 爆仓价格计算器 | ready | 已通过样本运行检查 |
| crypto/impermanent-loss | 无常损失计算器 | ready | 已通过样本运行检查 |
| crypto/apy-apr | APY/APR计算器 | ready | 已通过样本运行检查 |
| crypto/gas-fee | Gas费计算器 | ready | 已通过样本运行检查 |
| crypto/compound | 复利收益计算器 | ready | 已通过样本运行检查 |
| crypto/mining | 挖矿收益计算器 | ready | 已通过样本运行检查 |
| crypto/trading-fee | 交易手续费计算器 | ready | 已通过样本运行检查 |
| crypto/position-size | 仓位管理计算器 | ready | 已通过样本运行检查 |
| crypto/grid-trading | 网格交易计算器 | ready | 已通过样本运行检查 |
| crypto/unit-converter | 加密货币单位换算 | ready | 已通过样本运行检查 |
| crypto/address-validator | 钱包地址校验 | ready | 已通过样本运行检查 |
| crypto/ico-calculator | ICO/IDO收益计算器 | ready | 已通过样本运行检查 |
| legal/privacy-policy | 隐私政策生成器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| legal/terms-generator | 服务条款生成器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| legal/nda-generator | 保密协议生成器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| legal/disclaimer-gen | 免责声明生成器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| legal/cookie-policy | Cookie政策生成器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| legal/gdpr-checklist | GDPR合规检查清单 | ready | 已通过样本运行检查 |
| legal/contract-review | 合同条款检查器 | ready | 已通过样本运行检查 |
| legal/legal-deadline | 法律时限计算器 | ready | 部分原页面操作未通过迁移检查: update-period: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| legal/lawyer-fee | 律师费用计算器 | ready | 部分原页面操作未通过迁移检查: update-fee-info: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| legal/legal-glossary | 法律术语词典 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| legal/agreement-compare | 协议对比工具 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| legal/signature-date | 签署日期格式化器 | ready | 已通过样本运行检查 |
| social-media/hashtag-generator | 热门话题标签生成器 | ready | 已通过样本运行检查 |
| social-media/post-scheduler | 发布时间建议器 | ready | 已通过样本运行检查 |
| social-media/caption-writer | 社交媒体文案生成器 | ready | 部分原页面操作未通过迁移检查: update-style-tags: 原工具没有产生可输出的结果，请检查参数 |
| social-media/thread-splitter | 长文分割器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| social-media/bio-generator | 个人简介生成器 | ready | 已通过样本运行检查 |
| social-media/social-preview | 社交分享预览器 | skipped | generate-preview: 图像适配仅支持本地文件和 data URL \| run: 原工具没有产生可输出的结果，请检查参数 |
| social-media/username-checker | 用户名可用性检查 | ready | 已通过样本运行检查 |
| social-media/engagement-calc | 互动率计算器 | ready | 已通过样本运行检查 |
| social-media/follower-growth | 粉丝增长预测器 | skipped | 没有检测到可独立调用的无界面计算操作 |
| social-media/post-length | 帖子长度检查器 | ready | 已通过样本运行检查 |
| social-media/emoji-picker | Emoji选择器 | ready | 已通过样本运行检查 |
| social-media/social-color | 社交平台品牌色 | ready | 已通过样本运行检查 |
| team-tools/meeting-agenda | 会议议程生成器 | ready | 已通过样本运行检查 |
| team-tools/sprint-planner | 敏捷冲刺规划器 | ready | 已通过样本运行检查 |
| team-tools/task-breakdown | 任务分解器 | ready | 部分原页面操作未通过迁移检查: calculate-stats: 原工具没有产生可输出的结果，请检查参数 |
| team-tools/decision-matrix | 决策矩阵 | ready | 已通过样本运行检查 |
| team-tools/raci-chart | RACI责任矩阵 | ready | 已通过样本运行检查 |
| team-tools/standup-timer | 站会计时器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| team-tools/retrospective | 回顾会议模板 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| team-tools/team-vote | 团队投票工具 | ready | 已通过样本运行检查 |
| team-tools/workload-calc | 工作量评估器 | ready | 已通过样本运行检查 |
| team-tools/milestone-tracker | 里程碑追踪器 | ready | 部分原页面操作未通过迁移检查: sort-milestones: 原工具没有产生可输出的结果，请检查参数 |
| team-tools/icebreaker | 破冰游戏生成器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| team-tools/feedback-form | 反馈表单生成器 | skipped | generate-id: 找不到输入字段: preview-input \| update-preview: 找不到输入字段: preview-input \| generate-html: 找不到输入字段: preview-input \| generate-markdown: 找不到输入字段: preview-input \| generate-json: 找不到输入字段: preview-input \| run: 找不到输入字段: preview-input |
| fun/countdown-timer | 倒计时器(趣味) | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| fun/stopwatch | 秒表计时器(简版) | ready | 已通过样本运行检查 |
| life/todo-list | 待办事项 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| life/notes | 便签笔记 | skipped | render: 找不到输入字段: search \| run: 找不到输入字段: search |
| life/bookmark-manager | 书签管理器 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| calculator/electricity-calculator | 电费计算器(详细版) | ready | 已通过样本运行检查 |
| calculator/fuel-calculator | 汽车油耗计算器 | ready | 已通过样本运行检查 |
| dev/keyboard-codes | 键盘码查询 | skipped | 没有检测到可独立调用的无界面计算操作 |
| generator/license-generator | 开源协议生成 | ready | 已通过样本运行检查 |
| generator/gitignore-generator | Gitignore生成 | ready | 已通过样本运行检查 |
| converter/number-base-converter | 数字进制转换器 | ready | 已通过样本运行检查 |
| converter/color-converter | 颜色格式转换器 | ready | 已通过样本运行检查 |
| network/whois-lookup | WHOIS查询 | ready | 已通过样本运行检查 |
| network/ssl-checker | SSL证书检查 | ready | 已通过样本运行检查 |
| fun/memory-game | 记忆翻牌 | skipped | 没有检测到可独立调用的无界面计算操作 |
| fun/click-counter | 点击计数器 | skipped | 没有检测到可独立调用的无界面计算操作 |
| fun/flip-coin | 抛硬币(简版) | skipped | 没有检测到可独立调用的无界面计算操作 |
| fun/typing-test | 打字测试 | ready | 已通过样本运行检查 |
| converter/unix-timestamp | Unix 时间戳转换器 | ready | 已通过样本运行检查 |
| life/expense-tracker | 记账本 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| calculator/percentage-calculator | 百分比计算 | ready | 已通过样本运行检查 |
| fun/reaction-test | 反应测试 | skipped | 没有检测到可独立调用的无界面计算操作 |
| fun/color-blind-test | 色盲测试 | skipped | 没有检测到可独立调用的无界面计算操作 |
| dev/url-encoder | URL编码 | ready | 已通过样本运行检查 |
| converter/temperature-converter | 温度转换 | ready | 已通过样本运行检查 |
| converter/speed-converter | 速度转换 | ready | 已通过样本运行检查 |
| media/color-picker | 颜色选择器(媒体) | ready | 已通过样本运行检查 |
| text/lorem-generator | Lorem生成器 | ready | 已通过样本运行检查 |
| fun/number-guessing | 猜数字 | ready | 已通过样本运行检查 |
| dev/markdown-preview | Markdown预览 | ready | 已通过样本运行检查 |
| life/pomodoro | 番茄钟 | ready | 已通过样本运行检查 |
| travel/packing-list | 旅行打包清单 | ready | 已通过样本运行检查 |
| travel/jet-lag-calc | 时差倒时差计算 | ready | 已通过样本运行检查 |
| travel/travel-budget | 旅行预算计算 | ready | 已通过样本运行检查 |
| travel/currency-tips | 货币兑换提示 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| sports/running-pace | 跑步配速计算 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| sports/calories-burned | 运动卡路里计算 | ready | 已通过样本运行检查 |
| music/metronome | 节拍器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| productivity/pomodoro-plus | 番茄钟增强版 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| productivity/habit-tracker | 习惯追踪 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| office/meeting-scheduler | 会议时间安排 | skipped | update-grid: 原工具没有产生可输出的结果，请检查参数 |
| office/work-hours | 工时统计 | ready | 已通过样本运行检查 |
| office/invoice-calculator | 发票税额计算器 | ready | 已通过样本运行检查 |
| pets/pet-age | 宠物年龄计算 | ready | 已通过样本运行检查 |
| pets/pet-food-calc | 宠物喂食量计算 | ready | 已通过样本运行检查 |
| legal/lawsuit-fee | 诉讼费计算器 | ready | 已通过样本运行检查 |
| photography/exposure-calc | 曝光计算器 | ready | 已通过样本运行检查 |
| shopping/unit-price | 单价对比 | ready | 已通过样本运行检查 |
| game/gomoku | 五子棋 | skipped | 小游戏，需要持续交互界面 |
| game/memory-cards | 记忆翻牌游戏 | skipped | 小游戏，需要持续交互界面 |
| language/vocabulary-test | 词汇量测试 | skipped | 没有检测到可独立调用的无界面计算操作 |
| language/pinyin-converter | 拼音转换 | ready | 已通过样本运行检查 |
| art/color-wheel | 色轮配色 | ready | 部分原页面操作未通过迁移检查: update-pointer: 原工具没有产生可输出的结果，请检查参数 |
| social/split-bill | AA制分账 | ready | 已通过样本运行检查 |
| social/event-countdown | 活动倒计时 | ready | 部分原页面操作未通过迁移检查: update-countdowns: 原工具没有产生可输出的结果，请检查参数 |
| parenting/baby-food | 婴儿辅食指南 | ready | 已通过样本运行检查 |
| diy/paint-calculator | 油漆用量计算 | ready | 已通过样本运行检查 |
| diy/knitting-counter | 编织行数计数 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| weather/feels-like-temp | 体感温度计算 | ready | 已通过样本运行检查 |
| weather/uv-index | 紫外线指数查询 | ready | 已通过样本运行检查 |
| health/symptom-checker | 症状自查 | ready | 已通过样本运行检查 |
| finance/loan-early-repay | 提前还贷计算器 | ready | 已通过样本运行检查 |
| astronomy/moon-phase | 月相查询 | ready | 已通过样本运行检查 |
| automotive/fuel-cost | 油费计算器 | ready | 已通过样本运行检查 |
| gardening/plant-watering | 植物浇水提醒 | ready | 部分原页面操作未通过迁移检查: check-overdue: 原工具没有产生可输出的结果，请检查参数 |
| food/recipe-converter | 食谱份量转换器 | ready | 已通过样本运行检查 |
| fitness/workout-timer | 运动间歇计时器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| health/water-tracker | 喝水提醒 | ready | 已通过样本运行检查 |
| education/reading-tracker | 阅读进度追踪 | ready | 部分原页面操作未通过迁移检查: filter-books-all: Cannot read properties of undefined (reading 'target') \| filter-books-reading: Cannot read properties of undefined (reading 'target') \| filter-books-finished: Cannot read properties of undefined (reading 'target') |
| productivity/timezone-meeting | 跨时区会议安排 | ready | 已通过样本运行检查 |
| dev/table-generator | 表格生成器 | ready | 已通过样本运行检查 |
| photography/golden-hour | 黄金时刻计算器 | ready | 已通过样本运行检查 |
| finance/compound-interest | 复利投资计算器 | ready | 已通过样本运行检查 |
| business/roi-calculator | ROI 投资回报率计算器(详细) | ready | 已通过样本运行检查 |
| shopping/discount-calculator | 折扣价格计算器 | ready | 部分原页面操作未通过迁移检查: update-active-btn: 原工具没有产生可输出的结果，请检查参数 |
| productivity/pomodoro-timer | 番茄钟计时器(高效专注) | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| travel/visa-requirements | 签证要求查询 | ready | 已通过样本运行检查 |
| life/habit-tracker-checkin | 习惯打卡追踪器 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| shopping/price-comparison | 商品价格对比器 | skipped | update-summary: 原工具没有产生可输出的结果，请检查参数 |
| pets/pet-age-calculator-cn | 宠物年龄计算器 | ready | 已通过样本运行检查 |
| game/dice-roller | 骰子模拟器(桌游) | skipped | 小游戏，需要持续交互界面 |
| travel/emergency-contacts | 紧急联系方式 | ready | 已通过样本运行检查 |
| travel/phrase-book | 常用语手册 | ready | 已通过样本运行检查 |
| travel/size-converter | 尺码转换器 | skipped | convert: 未找到匹配的尺码，请检查输入 \| run: 未找到匹配的尺码，请检查输入 |
| travel/power-adapter | 电源插座指南 | ready | 已通过样本运行检查 |
| travel/driving-side | 行车方向指南 | ready | 已通过样本运行检查 |
| travel/passport-photo | 证件照规格 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| travel/baggage-limit | 行李限制查询 | ready | 已通过样本运行检查 |
| travel/sim-card-guide | SIM 卡指南 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| travel/travel-checklist | 旅行准备清单 | ready | 已通过样本运行检查 |
| design/color-picker | 颜色选择器(设计版) | ready | 已通过样本运行检查 |
| design/gradient-generator | 渐变生成器 | ready | 已通过样本运行检查 |
| design/box-shadow-generator | 阴影生成器 | ready | 已通过样本运行检查 |
| design/color-palette | 调色板生成器(设计版) | ready | 已通过样本运行检查 |
| design/contrast-checker | 对比度检查器 | ready | 已通过样本运行检查 |
| design/css-grid-generator | CSS Grid 生成器(布局版) | ready | 已通过样本运行检查 |
| design/flexbox-generator | Flexbox 生成器 | ready | 已通过样本运行检查 |
| design/border-radius-generator | 圆角生成器 | ready | 已通过样本运行检查 |
| design/css-filter-generator | CSS 滤镜生成器(设计版) | ready | 已通过样本运行检查 |
| design/animation-generator | CSS 动画生成器(简版) | ready | 已通过样本运行检查 |
| design/text-shadow-generator | 文字阴影生成器 | ready | 已通过样本运行检查 |
| design/color-converter | 颜色格式转换 | ready | 已通过样本运行检查 |
| design/color-blindness-simulator | 色盲模拟器(设计师版) | ready | 已通过样本运行检查 |
| design/font-pair-generator | 字体配对工具 | ready | 已通过样本运行检查 |
| design/spacing-calculator | 间距计算器 | ready | 已通过样本运行检查 |
| design/glassmorphism-generator | 毛玻璃生成器 | ready | 已通过样本运行检查 |
| design/neumorphism-generator | 新拟态生成器 | ready | 已通过样本运行检查 |
| design/clip-path-generator | 裁剪路径生成器 | ready | 已通过样本运行检查 |
| design/transform-generator | CSS 变换生成器 | ready | 已通过样本运行检查 |
| design/transition-generator | CSS 过渡生成器 | ready | 已通过样本运行检查 |
| design/cursor-generator | 光标样式生成器 | ready | 已通过样本运行检查 |
| design/scrollbar-generator | 滚动条生成器 | ready | 已通过样本运行检查 |
| design/triangle-generator | CSS 三角形生成器 | ready | 已通过样本运行检查 |
| design/blob-generator | Blob 形状生成器 | ready | 已通过样本运行检查 |
| design/wave-generator | 波浪 SVG 生成器 | ready | 已通过样本运行检查 |
| design/pattern-generator | 图案背景生成器 | ready | 已通过样本运行检查 |
| design/loader-generator | 加载动画生成器 | ready | 已通过样本运行检查 |
| design/button-generator | 按钮样式生成器 | ready | 已通过样本运行检查 |
| design/card-generator | 卡片样式生成器 | ready | 已通过样本运行检查 |
| design/text-gradient-generator | 文字渐变生成器 | ready | 已通过样本运行检查 |
| calculator/date-calculator | Date Calculator | ready | 已通过样本运行检查 |
| calculator/discount-calculator | Discount Calculator | ready | 已通过样本运行检查 |
| calculator/percentage-calc | Percentage Calc | ready | 已通过样本运行检查 |
| calculator/subnet-calculator | Subnet Calculator | ready | 已通过样本运行检查 |
| converter/area-converter | Area Converter | ready | 已通过样本运行检查 |
| converter/currency-converter | Currency Converter | ready | 已通过样本运行检查 |
| converter/data-storage-converter | Data Storage Converter | ready | 已通过样本运行检查 |
| converter/energy-converter | Energy Converter | ready | 已通过样本运行检查 |
| converter/frequency-converter | Frequency Converter | ready | 已通过样本运行检查 |
| converter/length-converter | Length Converter | ready | 已通过样本运行检查 |
| converter/power-converter | Power Converter | ready | 已通过样本运行检查 |
| converter/time-converter | Time Converter | ready | 已通过样本运行检查 |
| converter/volume-converter | Volume Converter | ready | 已通过样本运行检查 |
| converter/weight-converter | Weight Converter | ready | 已通过样本运行检查 |
| data/bar-chart | Bar Chart | skipped | generate-chart: 请输入有效的数据格式 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/chart-maker | Chart Maker | skipped | generate-chart: 请输入有效的数据格式 \| bar: 原工具没有产生可输出的结果，请检查参数 \| line: 原工具没有产生可输出的结果，请检查参数 \| pie: 原工具没有产生可输出的结果，请检查参数 \| doughnut: 原工具没有产生可输出的结果，请检查参数 \| radar: 原工具没有产生可输出的结果，请检查参数 \| polar-area: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/correlation-analyzer | Correlation Analyzer | skipped | analyze: 请至少输入 2 个数据点 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/csv-viewer | Csv Viewer | ready | 已通过样本运行检查 |
| data/data-aggregator | Data Aggregator | skipped | aggregate: 请选择分组列 \| update-column-selects: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/data-cleaner | Data Cleaner | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| data/data-diff | Data Diff | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| data/data-exporter | Data Exporter | ready | 已通过样本运行检查 |
| data/data-filter | 数据筛选器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| data/data-importer | Data Importer | ready | 部分原页面操作未通过迁移检查: convert-and-copy: 请先解析数据 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/data-merger | 数据合并器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| data/data-normalizer | Data Normalizer | ready | 部分原页面操作未通过迁移检查: update-range-inputs: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/data-sampler | 数据采样器 | ready | 部分原页面操作未通过迁移检查: random: 原工具没有产生可输出的结果，请检查参数 \| first: 原工具没有产生可输出的结果，请检查参数 \| last: 原工具没有产生可输出的结果，请检查参数 \| every: 原工具没有产生可输出的结果，请检查参数 \| range: 原工具没有产生可输出的结果，请检查参数 \| update-options-visibility: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/data-sorter | Data Sorter | ready | 部分原页面操作未通过迁移检查: update-csv-columns: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/data-transformer | 数据转换器 | ready | 部分原页面操作未通过迁移检查: prefix-suffix: 原工具没有产生可输出的结果，请检查参数 \| wrap: 原工具没有产生可输出的结果，请检查参数 \| template: 原工具没有产生可输出的结果，请检查参数 \| number: 原工具没有产生可输出的结果，请检查参数 \| case: 原工具没有产生可输出的结果，请检查参数 \| replace: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/data-validator | 数据验证器 | ready | 部分原页面操作未通过迁移检查: email: 原工具没有产生可输出的结果，请检查参数 \| url: 原工具没有产生可输出的结果，请检查参数 \| number: 原工具没有产生可输出的结果，请检查参数 \| integer: 原工具没有产生可输出的结果，请检查参数 \| phone-cn: 原工具没有产生可输出的结果，请检查参数 \| date: 原工具没有产生可输出的结果，请检查参数 \| ipv4: 原工具没有产生可输出的结果，请检查参数 \| hex-color: 原工具没有产生可输出的结果，请检查参数 \| uuid: 原工具没有产生可输出的结果，请检查参数 \| json: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/duplicate-remover | Duplicate Remover | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| data/excel-to-json | Excel To Json | ready | 部分原页面操作未通过迁移检查: export-json: 原工具没有产生可输出的结果，请检查参数 |
| data/heatmap-generator | Heatmap Generator | ready | 部分原页面操作未通过迁移检查: generate-heatmap: 无法解析有效数据 \| update-gradient: 原工具没有产生可输出的结果，请检查参数 \| parse-data: 无法解析有效数据 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/histogram-generator | 直方图生成器 | skipped | generate-histogram: 请输入有效的数值数据 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/json-flattener | Json Flattener | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| data/json-to-csv | JSON 转 CSV | ready | 已通过样本运行检查 |
| data/json-unflatten | Json Unflatten | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| data/line-chart | Line Chart | skipped | generate-chart: 数据格式错误，请检查输入 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/outlier-detector | 异常值检测器 | ready | 部分原页面操作未通过迁移检查: detect-outliers: 请输入至少 4 个数值 |
| data/pie-chart | Pie Chart | skipped | generate-chart: 没有有效数据 \| update-data-preview: 原工具没有产生可输出的结果，请检查参数 \| update-color-pickers: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/pivot-table | Pivot Table | skipped | parse-csv: 原工具没有产生可输出的结果，请检查参数 \| generate-pivot: 请先解析CSV数据 \| update-selects: 原工具没有产生可输出的结果，请检查参数 \| update-stats: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| data/scatter-plot | Scatter Plot | skipped | generate-chart: 请先添加数据系列 \| update-chart-theme: 原工具没有产生可输出的结果，请检查参数 |
| data/sql-query-builder | Sql Query Builder | ready | 已通过样本运行检查 |
| data/statistics-calculator | 统计计算器(数据分析) | ready | 部分原页面操作未通过迁移检查: run: 计算完成，共 5 个数据 |
| design/aspect-ratio-calculator | Aspect Ratio Calculator | ready | 已通过样本运行检查 |
| design/color-contrast-checker | Color Contrast Checker | ready | 已通过样本运行检查 |
| automotive/tire-pressure-calc | 胎压转换 | ready | 已通过样本运行检查 |
| design/css-animation-generator | Css Animation Generator | ready | 已通过样本运行检查 |
| design/css-button-generator | Css Button Generator | ready | 已通过样本运行检查 |
| design/css-clip-path-generator | Css Clip Path Generator | ready | 已通过样本运行检查 |
| design/css-transform-generator | Css Transform Generator | ready | 已通过样本运行检查 |
| design/font-preview | Font Preview | ready | 已通过样本运行检查 |
| design/palette-generator | Palette Generator | ready | 已通过样本运行检查 |
| design/svg-path-editor | Svg Path Editor | skipped | 没有检测到可独立调用的无界面计算操作 |
| dev/api-tester | Api Tester | ready | 已通过样本运行检查 |
| dev/css-animation | Css Animation | ready | 已通过样本运行检查 |
| dev/css-flexbox | Css Flexbox | ready | 部分原页面操作未通过迁移检查: update-item-select: 原工具没有产生可输出的结果，请检查参数 |
| dev/css-gradient-generator | Css Gradient Generator | ready | 已通过样本运行检查 |
| dev/curl-builder | Curl Builder | ready | 已通过样本运行检查 |
| dev/docker-command-builder | Docker Command Builder | ready | 已通过样本运行检查 |
| dev/env-generator | Env Generator | ready | 已通过样本运行检查 |
| dev/git-command-builder | Git Command Builder | ready | 已通过样本运行检查 |
| dev/git-command-helper | Git Command Helper | ready | 已通过样本运行检查 |
| dev/htaccess-generator | Htaccess 生成器 | ready | 已通过样本运行检查 |
| dev/html-entity-encoder | Html Entity Encoder | ready | 已通过样本运行检查 |
| dev/html-minifier | Html Minifier | ready | 已通过样本运行检查 |
| dev/http-status-codes | Http Status Codes | ready | 已通过样本运行检查 |
| dev/json-path-finder | Json Path Finder | ready | 部分原页面操作未通过迁移检查: search-json: 原工具没有产生可输出的结果，请检查参数 |
| dev/json-path-tester | Json Path Tester | ready | 已通过样本运行检查 |
| dev/lorem-ipsum | Lorem Ipsum 占位文本生成器 | ready | 已通过样本运行检查 |
| dev/nginx-config-generator | Nginx Config Generator | ready | 已通过样本运行检查 |
| dev/npm-command-helper | Npm Command Helper | ready | 已通过样本运行检查 |
| dev/sql-keywords | Sql Keywords | ready | 已通过样本运行检查 |
| dev/string-escape | String Escape | ready | 已通过样本运行检查 |
| dev/yaml-formatter | Yaml Formatter | ready | 部分原页面操作未通过迁移检查: json-to-yaml: ✗ JSON 格式错误: Unexpected token 'H', "Hello worl"... is not valid JSON \| run: ✓ YAML 格式正确 |
| fun/name-generator | Name Generator | ready | 已通过样本运行检查 |
| fun/quiz-maker | Quiz Maker | ready | 已通过样本运行检查 |
| fun/wheel-of-fortune | Wheel Of Fortune | ready | 已通过样本运行检查 |
| game/breakout-game | Breakout Game | skipped | 小游戏，需要持续交互界面 |
| game/color-match | Color Match | skipped | 小游戏，需要持续交互界面 |
| game/flappy-bird | Flappy Bird | skipped | 小游戏，需要持续交互界面 |
| game/guess-number | Guess Number | skipped | 小游戏，需要持续交互界面 |
| game/math-challenge | Math Challenge | skipped | 小游戏，需要持续交互界面 |
| game/pinball-game | Pinball Game | skipped | 小游戏，需要持续交互界面 |
| game/reaction-game | Reaction Game | skipped | 小游戏，需要持续交互界面 |
| game/shooter-game | Shooter Game | skipped | 小游戏，需要持续交互界面 |
| game/tic-tac-toe | Tic Tac Toe | skipped | 小游戏，需要持续交互界面 |
| game/typing-game | Typing Game | skipped | 小游戏，需要持续交互界面 |
| game/word-chain | Word Chain | skipped | 小游戏，需要持续交互界面 |
| game/word-scramble | Word Scramble | skipped | 小游戏，需要持续交互界面 |
| generator/barcode-generator | Barcode Generator | ready | 已通过样本运行检查 |
| generator/credit-card-generator | Credit Card Generator | ready | 已通过样本运行检查 |
| generator/fake-data-generator | Fake Data Generator | ready | 已通过样本运行检查 |
| generator/favicon-generator | Favicon Generator | ready | 已通过样本运行检查 |
| generator/htaccess-generator | .htaccess Generator | ready | 已通过样本运行检查 |
| generator/iban-generator | Iban Generator | ready | 部分原页面操作未通过迁移检查: update-format: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| generator/lorem-ipsum | Lorem Ipsum 文本生成 | ready | 已通过样本运行检查 |
| generator/markdown-table | Markdown Table | ready | 已通过样本运行检查 |
| generator/meta-tag-generator | Meta Tag Generator | ready | 已通过样本运行检查 |
| generator/random-name-generator | Random Name Generator | ready | 已通过样本运行检查 |
| generator/robots-generator | Robots Generator | ready | 已通过样本运行检查 |
| generator/robots-txt-generator | Robots Txt Generator | ready | 已通过样本运行检查 |
| life/countdown-timer | Countdown Timer | ready | 已通过样本运行检查 |
| life/decision-maker | Decision Maker | skipped | 没有检测到可独立调用的无界面计算操作 |
| life/habit-tracker | Habit Tracker | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| life/pomodoro-timer | Pomodoro Timer | ready | 已通过样本运行检查 |
| life/stopwatch | Stopwatch | ready | 已通过样本运行检查 |
| life/unit-converter | Unit Converter | ready | 已通过样本运行检查 |
| life/world-clock | World Clock 世界时钟 | ready | 已通过样本运行检查 |
| math/binary-calculator | Binary Calculator | ready | 已通过样本运行检查 |
| math/equation-solver | Equation Solver | ready | 已通过样本运行检查 |
| math/factorial-calculator | Factorial Calculator | ready | 已通过样本运行检查 |
| math/fraction-calculator | Fraction Calculator | ready | 已通过样本运行检查 |
| math/gcd-lcm-calculator | Gcd Lcm Calculator | ready | 已通过样本运行检查 |
| math/logarithm-calculator | Logarithm Calculator | ready | 已通过样本运行检查 |
| math/matrix-calculator | Matrix Calculator | skipped | run: 原工具没有产生可输出的结果，请检查参数 |
| math/number-base-converter | Number Base Converter | ready | 已通过样本运行检查 |
| math/percentage-calculator | Percentage Calculator | ready | 已通过样本运行检查 |
| math/permutation-combination | Permutation Combination | ready | 已通过样本运行检查 |
| math/prime-checker | Prime Checker | ready | 已通过样本运行检查 |
| math/quadratic-equation | Quadratic Equation | ready | 已通过样本运行检查 |
| math/statistics-calculator | Statistics Calculator | ready | 已通过样本运行检查 |
| math/trigonometry-calculator | Trigonometry Calculator | ready | 已通过样本运行检查 |
| math/unit-circle | Unit Circle | ready | 已通过样本运行检查 |
| network/ip-subnet-calculator | Ip Subnet Calculator | ready | 已通过样本运行检查 |
| network/port-info | Port Info | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| network/port-scanner | Port Scanner | skipped | 没有检测到可独立调用的无界面计算操作 |
| office/agenda-maker | Agenda Maker | ready | 已通过样本运行检查 |
| office/attendance-sheet | Attendance Sheet | ready | 已通过样本运行检查 |
| office/barcode-label | Barcode Label | ready | 已通过样本运行检查 |
| office/business-card-maker | 名片制作 | ready | 已通过样本运行检查 |
| office/checklist-maker | 清单制作 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| office/contract-template | Contract Template | ready | 部分原页面操作未通过迁移检查: update-type-ui: 合同已生成 \| run: 合同已生成 |
| office/expense-report | Expense Report | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| office/gantt-chart | 甘特图 | ready | 已通过样本运行检查 |
| office/invoice-maker | Invoice Maker | ready | 已通过样本运行检查 |
| office/label-maker | Label Maker | ready | 部分原页面操作未通过迁移检查: update-align-buttons: 已生成 3 个标签 |
| office/leave-calculator | Leave Calculator | ready | 已通过样本运行检查 |
| office/letter-template | Letter Template | ready | 已通过样本运行检查 |
| office/letterhead-maker | Letterhead Maker | skipped | update-preview: Unsupported image type \| run: Unsupported image type |
| office/meeting-timer | Meeting Timer | ready | 已通过样本运行检查 |
| office/minutes-template | Minutes Template | ready | 已通过样本运行检查 |
| office/org-chart | Org Chart | skipped | update-reports-to-options: 原工具没有产生可输出的结果，请检查参数 \| build-tree: 原工具没有产生可输出的结果，请检查参数 |
| office/overtime-calculator | Overtime Calculator | ready | 已通过样本运行检查 |
| office/presentation-timer | Presentation Timer | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| office/project-timeline | Project Timeline | ready | 已通过样本运行检查 |
| office/purchase-order | Purchase Order | ready | 已通过样本运行检查 |
| office/quotation-maker | Quotation Maker | ready | 已通过样本运行检查 |
| office/receipt-maker | Receipt Maker | ready | 部分原页面操作未通过迁移检查: calculate-totals: 原工具没有产生可输出的结果，请检查参数 |
| office/resume-maker | Resume Maker | skipped | run: 原工具没有产生可输出的结果，请检查参数 |
| office/seating-chart | Seating Chart | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| office/signature-pad | Signature Pad | ready | 已通过样本运行检查 |
| office/slide-notes | Slide Notes | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| office/stamp-generator | Stamp Generator | ready | 已通过样本运行检查 |
| office/task-tracker | Task Tracker | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| office/timesheet | Timesheet | ready | 已通过样本运行检查 |
| office/work-log | Work Log | ready | 已通过样本运行检查 |
| realestate/rent-vs-buy-cn | Rent Vs Buy | ready | 已通过样本运行检查 |
| text/slug-generator | Slug Generator | ready | 已通过样本运行检查 |
| text/text-case-converter | Text Case Converter | ready | 已通过样本运行检查 |
| text/text-statistics | Text Statistics | ready | 已通过样本运行检查 |
| text/unicode-converter | Unicode Converter | ready | 已通过样本运行检查 |
| travel/baggage-tracker | Baggage Tracker | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| travel/currency-exchange | Currency Exchange | ready | 已通过样本运行检查 |
| travel/distance-calculator | Distance Calculator | ready | 已通过样本运行检查 |
| travel/flight-time | Flight Time | ready | 已通过样本运行检查 |
| travel/fuel-cost | Fuel Cost | ready | 部分原页面操作未通过迁移检查: update-preset-selection: 原工具没有产生可输出的结果，请检查参数 |
| travel/hotel-cost | Hotel Cost | ready | 已通过样本运行检查 |
| travel/itinerary-planner | Itinerary Planner | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| travel/luggage-calculator | Luggage Calculator | ready | 已通过样本运行检查 |
| travel/season-guide | Season Guide | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| travel/time-difference | Time Difference | ready | 已通过样本运行检查 |
| travel/timezone-converter | Timezone Converter | ready | 已通过样本运行检查 |
| travel/tip-guide | Tip Guide | ready | 已通过样本运行检查 |
| travel/toll-calculator | Toll Calculator | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| travel/travel-insurance | Travel Insurance | ready | 已通过样本运行检查 |
| travel/trip-budget | Trip Budget | ready | 部分原页面操作未通过迁移检查: calculate-totals: 原工具没有产生可输出的结果，请检查参数 |
| travel/trip-cost-splitter | Trip Cost Splitter | skipped | calculate-settlement: 原工具没有产生可输出的结果，请检查参数 |
| travel/vaccine-checker | Vaccine Checker | skipped | run: 原工具没有产生可输出的结果，请检查参数 |
| travel/visa-checker | Visa Checker | ready | 已通过样本运行检查 |
| travel/weather-planner | Weather Planner | ready | 已通过样本运行检查 |
| travel/world-clock | 旅行世界时钟 | skipped | update-all-clocks: 原工具没有产生可输出的结果，请检查参数 |
| education/multiplication-table | 乘法口诀表 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| health/calorie-burn-calculator | 运动消耗卡路里计算器 | ready | 已通过样本运行检查 |
| office/meeting-cost-calculator | 会议成本计算器 | ready | 已通过样本运行检查 |
| lifestyle/birthday-reminder | 生日提醒器 | ready | 已通过样本运行检查 |
| lifestyle/daily-affirmation | 每日正能量 | skipped | 没有检测到可独立调用的无界面计算操作 |
| lifestyle/water-intake-tracker | 喝水打卡 | ready | 已通过样本运行检查 |
| design/color-palette-generator | 配色方案生成器(设计版) | ready | 已通过样本运行检查 |
| finance/budget-tracker | 预算追踪器 | ready | 已通过样本运行检查 |
| productivity/focus-timer | 专注力计时器 | skipped | 依赖摄像头、音频、定位或其他交互设备 API |
| productivity/reading-time | 阅读时间计算 | ready | 已通过样本运行检查 |
| language/vocabulary-builder | 单词本 | skipped | 没有检测到可独立调用的无界面计算操作 |
| social/gift-idea-tracker | 礼物灵感记录 | ready | 已通过样本运行检查 |
| parenting/growth-tracker | 儿童生长曲线 | ready | 已通过样本运行检查 |
| weather/uv-index-guide | 紫外线指数指南 | ready | 已通过样本运行检查 |
| art/color-mixer | 颜色混合器(美术调色) | ready | 已通过样本运行检查 |
| automotive/fuel-calculator | 油耗成本计算器 | ready | 已通过样本运行检查 |
| gardening/watering-schedule | 浇水日程 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| fitness/workout-logger | 健身记录 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| sports/score-keeper | 比分记录器 | skipped | 没有检测到可独立调用的无界面计算操作 |
| pets/pet-age-calculator | 猫狗年龄计算器 | ready | 已通过样本运行检查 |
| parenting/baby-sleep-tracker | 宝宝睡眠记录 | ready | 部分原页面操作未通过迁移检查: update-timer: 原工具没有产生可输出的结果，请检查参数 |
| life/event-countdown | 事件倒计时 | ready | 已通过样本运行检查 |
| health/breathing-exercise | 呼吸练习 | skipped | 没有检测到可独立调用的无界面计算操作 |
| pets/feeding-schedule | 宠物喂食提醒 | skipped | 依赖持久状态或多步界面交互，按迁移范围跳过 |
| diy/material-calculator | 材料用量计算 | ready | 已通过样本运行检查 |
| music/chord-finder | 和弦查询 | skipped | 没有检测到可独立调用的无界面计算操作 |
| gardening/plant-care-guide | 植物养护指南 | skipped | 静态文章、目录或参考页面，没有可迁移计算逻辑 |
| food/recipe-timer | 烹饪计时器 | ready | 已通过样本运行检查 |
| astronomy/stargazing-tonight | 今夜观星 | skipped | 没有检测到可独立调用的无界面计算操作 |
| time/new-year-countdown | 新年倒计时 | ready | 部分原页面操作未通过迁移检查: test-celebration: 原工具没有产生可输出的结果，请检查参数 |
| design/color-name-finder | 颜色名称查询器 | ready | 已通过样本运行检查 |
| design/color-temperature | 色温转换器 | ready | 已通过样本运行检查 |
| media/image-to-pdf | 图片转 PDF | skipped | generate: 请先添加图片 \| update-ui: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| media/pdf-to-image | PDF 转图片 | ready | 已通过样本运行检查 |
| dev/css-specificity-calculator | CSS 选择器权重计算器 | ready | 已通过样本运行检查 |
| dev/fluid-typography-clamp-generator | 流体排版 / CSS clamp 生成器 | ready | 已通过样本运行检查 |
| dev/media-query-builder | CSS 媒体查询生成器 | ready | 已通过样本运行检查 |
| dev/px-rem-em-converter | px / rem / em 单位转换器 | ready | 已通过样本运行检查 |
| dev/type-scale-calculator | 字型比例计算器 | ready | 部分原页面操作未通过迁移检查: build-scale: 已更新 8 个字级 |
| dev/css-container-query-builder | CSS 容器查询生成器 | ready | 已通过样本运行检查 |
| dev/css-z-index-stacking-visualizer | CSS z-index 层叠上下文可视化 | ready | 部分原页面操作未通过迁移检查: compute-layout: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| dev/svg-sprite-generator | SVG Sprite 生成器 | ready | 已通过样本运行检查 |
| dev/svg-to-data-uri | SVG 转 Data URI 编码器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/sri-hash-generator | SRI 哈希生成器 | skipped | run: 原工具没有产生可输出的结果，请检查参数 |
| dev/regex-find-replace-tester | Regex 查找替换测试器 | ready | 已通过样本运行检查 |
| dev/har-viewer | HAR 文件查看器 | ready | 部分原页面操作未通过迁移检查: compute-timeline: 原工具没有产生可输出的结果，请检查参数 |
| dev/json-merge-patch | JSON Merge Patch 工具 | ready | 已通过样本运行检查 |
| dev/ndjson-formatter | NDJSON / JSONL 格式化器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/ini-file-editor | INI / 配置文件编辑器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/java-properties-editor | Java .properties 文件编辑器 | skipped | update-stats: Cannot read properties of null (reading 'getAttribute') \| run: Cannot read properties of null (reading 'getAttribute') |
| dev/access-log-analyzer | Nginx / Apache 访问日志分析器 | ready | 已通过样本运行检查 |
| dev/ssh-keygen-helper | SSH 密钥对生成器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/po-file-editor | PO / Gettext 翻译文件编辑器 | ready | 部分原页面操作未通过迁移检查: update-filter-buttons: 原工具没有产生可输出的结果，请检查参数 |
| security/pgp-encrypt-decrypt | PGP 消息加密解密 | skipped | encrypt: Misformed armored text \| decrypt: Misformed armored text \| run: 原工具没有产生可输出的结果，请检查参数 |
| network/email-header-analyzer | 邮件头分析器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/email-address-validator | 邮箱地址格式验证器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| converter/phone-number-formatter | 国际电话号码格式化器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| finance/swift-bic-lookup | SWIFT / BIC 银行代码查询 | ready | 部分原页面操作未通过迁移检查: lookup: BIC 必须为 8 位或 11 位，当前 30 位 |
| privacy/zero-width-text-steganography | 文本隐写（零宽字符）工具 | ready | 已通过样本运行检查 |
| text/vigenere-cipher | Vigenère 密码工具 | ready | 已通过样本运行检查 |
| converter/braille-translator | 盲文翻译器 | skipped | run: 原工具没有产生可输出的结果，请检查参数 |
| dev/geojson-viewer | GeoJSON 查看器 / 编辑器 | skipped | 原算法依赖外部脚本，尚需 Node.js 专项适配: https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.js |
| travel/gpx-track-viewer | GPX 轨迹查看器 | skipped | 原算法依赖外部脚本，尚需 Node.js 专项适配: https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.js |
| dev/isbn-validator | ISBN 验证与解析 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| productivity/ics-calendar-generator | ICS 日历事件生成器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| text/text-readability-analyzer | 文本可读性分析器 | ready | 部分原页面操作未通过迁移检查: analyze: 文本太短，建议至少 10 个单词 |
| dev/crc32-checksum-calculator | CRC32 / Adler-32 校验计算器 | ready | 已通过样本运行检查 |
| finance/dividend-pe-calculator | 股息率 / 市盈率计算器 | ready | 已通过样本运行检查 |
| calculator/vat-gst-calculator | 增值税 / GST 计算器 | ready | 已通过样本运行检查 |
| calculator/import-duty-estimator | 进口关税估算器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| calculator/ohms-law-calculator | 欧姆定律 / 电路计算器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| design/oklch-color-editor | OKLCH / Display P3 颜色编辑器 | ready | 部分原页面操作未通过迁移检查: build-presets: 原工具没有产生可输出的结果，请检查参数 |
| education/solar-system-explorer | 行星 / 太阳系信息查询 | ready | 已通过样本运行检查 |
| calculator/dew-point-humidity-calculator | 湿度 / 露点计算器 | ready | 已通过样本运行检查 |
| life/music-scale-finder | 音阶查找器 | ready | 已通过样本运行检查 |
| life/chord-progression-generator | 和弦进行生成器 | ready | 已通过样本运行检查 |
| math/pi-digits-explorer | 圆周率 π 数字查询器 | ready | 部分原页面操作未通过迁移检查: search: 请输入要搜索的数字串 \| run: 已加载 π 前 10000 位小数 |
| math/fibonacci-sequence-generator | 斐波那契数列生成器 | ready | 部分原页面操作未通过迁移检查: run: 生成成功，共 20 项 |
| math/prime-factorization | 质因数分解器 | skipped | factorize: 仅支持正整数（不含小数点或负号） \| run: 仅支持正整数（不含小数点或负号） |
| math/matrix-determinant-inverse | 矩阵行列式 / 逆矩阵计算器 | ready | 已通过样本运行检查 |
| calculator/normal-distribution-calculator | 正态分布计算器 | ready | 已通过样本运行检查 |
| calculator/hypothesis-testing-calculator | 假设检验计算器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| health/caffeine-half-life-calculator | 咖啡因代谢计算器 | ready | 已通过样本运行检查 |
| travel/tide-chart-viewer | 潮汐时刻查询 | ready | 部分原页面操作未通过迁移检查: build-location-select: 已计算 2 个高低潮 |
| social-media/og-image-generator | 社交媒体 OG 图生成器 | ready | 已通过样本运行检查 |
| dev/favicon-ico-generator | Favicon 多尺寸 ICO 生成器 | ready | 已通过样本运行检查 |
| design/screen-resolution-reference | 设备屏幕分辨率参考 | ready | 部分原页面操作未通过迁移检查: update-sort-headers: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| calculator/print-size-dpi-calculator | 打印尺寸 / DPI 计算器 | ready | 已通过样本运行检查 |
| finance/amortization-table | 贷款摊销明细表 | ready | 部分原页面操作未通过迁移检查: build-csv-lines: Cannot read properties of undefined (reading 'date') \| run: 原工具没有产生可输出的结果，请检查参数 |
| calculator/inflation-calculator | 通货膨胀计算器 | ready | 已通过样本运行检查 |
| business/nps-csat-calculator | NPS / CSAT 客户满意度计算器 | ready | 部分原页面操作未通过迁移检查: calc-nps: 请输入评分数据 \| calc-csat-from-batch: 请输入评分数据 \| calc-ces: 请输入评分数据 \| run: 原工具没有产生可输出的结果，请检查参数 |
| dev/markdown-linter | Markdown 语法检查器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/json-schema-to-form | JSON Schema → HTML 表单生成器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| design/text-to-svg-path | 文字转 SVG 路径 | skipped | 原算法依赖外部脚本，尚需 Node.js 专项适配: https://cdn.jsdelivr.net/npm/opentype.js@1.3.4/dist/opentype.min.js |
| calculator/resistor-color-code | 电阻色环计算器 | ready | 已通过样本运行检查 |
| calculator/capacitor-code-decoder | 电容代码解码器 | ready | 部分原页面操作未通过迁移检查: run-decode: 格式错误 |
| calculator/voltage-divider-calculator | 分压电路计算器 | ready | 部分原页面操作未通过迁移检查: calc-reverse: Vout 必须满足 0 < Vout < Vin \| run: 原工具没有产生可输出的结果，请检查参数 |
| calculator/wire-gauge-awg-calculator | 导线规格 / AWG 载流计算器 | ready | 已通过样本运行检查 |
| calculator/battery-runtime-calculator | 电池续航估算器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| calculator/molar-mass-calculator | 摩尔质量计算器 | ready | 已通过样本运行检查 |
| calculator/ph-scale-calculator | pH 值计算器 | ready | 部分原页面操作未通过迁移检查: calc-from-h: pH 超出有效范围（0–14） \| run: 原工具没有产生可输出的结果，请检查参数 |
| health/tdee-calorie-deficit-calculator | TDEE / 热量缺口计算器 | ready | 已通过样本运行检查 |
| health/one-rep-max-calculator | 最大重复次数 / 1RM 计算器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| health/blood-pressure-log | 血压记录日志 | ready | 部分原页面操作未通过迁移检查: update-stats: 导入 0 条新记录 |
| health/blood-glucose-tracker | 血糖记录追踪器 | skipped | render: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| health/cholesterol-ratio-calculator | 胆固醇比率计算器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| health/macro-calculator | 宏量营养素计算器 | ready | 已通过样本运行检查 |
| health/vo2max-calculator | VO₂max 估算器 | ready | 部分原页面操作未通过迁移检查: calc-cooper: 原工具没有产生可输出的结果，请检查参数 \| calc-hr: 原工具没有产生可输出的结果，请检查参数 \| calc-rockport: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| finance/cagr-calculator | CAGR 复合年增长率计算器 | ready | 部分原页面操作未通过迁移检查: calc-years: 初始值、终值与增长率方向不匹配 \| run: 原工具没有产生可输出的结果，请检查参数 |
| finance/budget-50-30-20-planner | 50/30/20 预算规划器 | ready | 已通过样本运行检查 |
| finance/payback-period-calculator | 投资回收期计算器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| seo/schema-org-generator | Schema.org 结构化数据生成器 | ready | 部分原页面操作未通过迁移检查: generate: 请填写标题、URL 和作者姓名 \| generate-article: 请填写标题、URL 和作者姓名 \| generate-faq: 原工具没有产生可输出的结果，请检查参数 \| generate-product: 请填写产品名称 \| generate-local-business: 请填写商家名称 \| generate-event: 请填写活动名称和开始时间 \| generate-recipe: 请填写菜名 \| generate-breadcrumb: 原工具没有产生可输出的结果，请检查参数 \| generate-schema: 请填写标题、URL 和作者姓名 |
| text/anagram-solver | 变位词求解器 | ready | 已通过样本运行检查 |
| life/carbon-footprint-calculator | 个人碳排放计算器 | skipped | calc: 高于中国人均，建议参考减排建议。 \| calc-carbon: 原工具没有产生可输出的结果，请检查参数 \| run: 原工具没有产生可输出的结果，请检查参数 |
| business/salary-negotiation-calculator | 薪资谈判计算器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| dev/cors-preflight-debugger | CORS 请求调试器 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| pets/pet-medication-dosage | 宠物用药剂量计算器 | ready | 已通过样本运行检查 |
| education/geography-country-quiz | 世界国家地理测验 | ready | 部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数 |
| design/aurora-generator | 极光背景生成器 | ready | 已通过样本运行检查 |
| ai/prompt-generator | 结构化提示词生成器 | ready | 已通过样本运行检查 |
