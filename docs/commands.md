# 命令参考

此文件由 `npm run docs` 根据实际注册表生成。共检查 1088 个源工具，865 个已注册，共 2000 个操作。

每个操作都经过记录样本的运行检查；这不等于所有参数组合都经过业务正确性验证。原始算法的限制和近似计算保持不变。

- 命令支持 `html-tools 分类 工具 操作` 和 `html-tools 分类/工具 操作`。
- 单操作工具可以省略操作名。多操作工具必须指定操作。
- 参数统一使用原字段 ID 转成 kebab-case。
- 复选框使用 `--字段` / `--no-字段`，也可使用 `--字段=true`。
- 文本工具可使用 `--input-file 路径`、`--stdin`、`--params @文件.json`。
- `--json` 输出 `{tool, action, results}`；否则单结果直接输出，多结果以字段名标记。
- `--output-file 文件` 写入结果（覆盖文件）；其他文件读写依照明确参数进行。
- 原文档中的颜色、日期和数字格式取决于源工具；选择字段必须使用下面的原始 value。
- 所有命令支持 `--help`；失败退出码为 1，帮助/成功为 0。

## 分类索引

- [ai](#ai)（5 个）
- [business](#business)（17 个）
- [calculator](#calculator)（54 个）
- [chinese](#chinese)（13 个）
- [converter](#converter)（36 个）
- [crypto](#crypto)（15 个）
- [data](#data)（21 个）
- [design](#design)（46 个）
- [dev](#dev)（182 个）
- [education](#education)（16 个）
- [extractor](#extractor)（4 个）
- [finance](#finance)（21 个）
- [food](#food)（16 个）
- [fun](#fun)（6 个）
- [generator](#generator)（49 个）
- [health](#health)（22 个）
- [legal](#legal)（13 个）
- [life](#life)（46 个）
- [math](#math)（17 个）
- [media](#media)（43 个）
- [network](#network)（17 个）
- [office](#office)（28 个）
- [pets](#pets)（5 个）
- [privacy](#privacy)（13 个）
- [productivity](#productivity)（3 个）
- [realestate](#realestate)（15 个）
- [security](#security)（10 个）
- [seo](#seo)（8 个）
- [social-media](#social-media)（11 个）
- [team-tools](#team-tools)（9 个）
- [text](#text)（61 个）
- [time](#time)（11 个）
- [travel](#travel)（32 个）

## ai

### ai/ai-pricing

AI API 价格计算器：AI API 价格计算器，快速计算结果，AI 工具，浏览器本地运行无需上传

来源：`html-tools/tools/ai/ai-pricing.html`，SHA-256：`1aef7bb695786dc2b1879bd4d39471894ac7df9fc29d06743f5cd15cf6707ab2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | resultsBody, statsGrid |
| `run` | 按字段输入重新计算 | resultsBody, statsGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-tokens` | 输入 Tokens (每次请求) | number | "1000" | min=0 |
| `--output-tokens` | 输出 Tokens (每次请求) | number | "500" | min=0 |
| `--daily-requests` | 每日请求次数 | number | "100" | min=0 |
| `--period` | 计算周期 | select-one | "30" | "1" (每天); "7" (每周); "30" (每月); "365" (每年) |
| `--field-5` / `--no-field-5` | 输入 Tokens (每次请求) | checkbox | true |  |
| `--field-6` / `--no-field-6` | 输入 Tokens (每次请求) | checkbox | true |  |
| `--field-7` / `--no-field-7` | 输入 Tokens (每次请求) | checkbox | false |  |
| `--field-8` / `--no-field-8` | 输入 Tokens (每次请求) | checkbox | false |  |
| `--field-9` / `--no-field-9` | 输入 Tokens (每次请求) | checkbox | false |  |
| `--field-10` / `--no-field-10` | 输入 Tokens (每次请求) | checkbox | true |  |
| `--field-11` / `--no-field-11` | 输入 Tokens (每次请求) | checkbox | false |  |
| `--field-12` / `--no-field-12` | 输入 Tokens (每次请求) | checkbox | true |  |
| `--field-13` / `--no-field-13` | 输入 Tokens (每次请求) | checkbox | false |  |
| `--field-14` / `--no-field-14` | 输入 Tokens (每次请求) | checkbox | true |  |
| `--field-15` / `--no-field-15` | 输入 Tokens (每次请求) | checkbox | true |  |
| `--field-16` / `--no-field-16` | 输入 Tokens (每次请求) | checkbox | true |  |
| `--field-17` / `--no-field-17` | 输入 Tokens (每次请求) | checkbox | false |  |
| `--field-18` / `--no-field-18` | 输入 Tokens (每次请求) | checkbox | true |  |
| `--field-19` / `--no-field-19` | 输入 Tokens (每次请求) | checkbox | true |  |
| `--field-20` / `--no-field-20` | 输入 Tokens (每次请求) | checkbox | false |  |
| `--field-21` / `--no-field-21` | 输入 Tokens (每次请求) | checkbox | false |  |

已检查示例：

```bash
html-tools ai/ai-pricing calculate --input-tokens '1000' --output-tokens '500' --daily-requests '100' --period '30' --field-5 --field-6 --no-field-7 --no-field-8 --no-field-9 --field-10 --no-field-11 --field-12 --no-field-13 --field-14 --field-15 --field-16 --no-field-17 --field-18 --field-19 --no-field-20 --no-field-21 --json
```

### ai/deepseek-guide

DeepSeek API 使用指南 | 在线工具：DeepSeek API 使用指南 | 在线工具，在线使用，AI 工具，浏览器本地运行无需上传

来源：`html-tools/tools/ai/deepseek-guide.html`，SHA-256：`ce40970e4b6b6144a9efe307d076cbf11c40bfcbf4b5e2fcdc7b4b957ead97ec`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate-price` | calculatePrice | totalPrice, priceDetail |
| `run` | 按字段输入重新计算 | totalPrice, priceDetail |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--calc-model` | 选择模型 | select-one | "v3" | "v3" (DeepSeek-V3 (deepseek-chat)); "r1" (DeepSeek-R1 (deepseek-reasoner)); "coder" (DeepSeek-Coder) |
| `--calc-period` | 计费周期 | select-one | "day" | "day" (每天); "month" (每月) |
| `--input-tokens` | 输入 Tokens (万) | number | "100" | min=0 |
| `--output-tokens` | 输出 Tokens (万) | number | "50" | min=0 |

已检查示例：

```bash
html-tools ai/deepseek-guide calculate-price --calc-model 'v3' --calc-period 'day' --input-tokens '100' --output-tokens '50' --json
```

### ai/prompt-templates

Prompt 模板库：AI 提示词模板库

来源：`html-tools/tools/ai/prompt-templates.html`，SHA-256：`a80a4ca3d1c0a7c0aeb5749fddaca5cdf89c20b0277fc9a8495d504aa1760eb1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | categories, templates |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools ai/prompt-templates render  --json
```

### ai/token-counter

Token 计数器：估算 AI 模型 Token 数量

来源：`html-tools/tools/ai/token-counter.html`，SHA-256：`4351ed229ecbd3f8e456addf94e742c5130f3da6a984b216e853fc19080f3397`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `count-tokens` | 📊 计算 Token | tokenDisplay, tokenCount, charCount, wordCount, lineCount, ratio, inputCost, outputCost, totalCost |
| `run` | 按字段输入重新计算 | tokenDisplay, tokenCount, charCount, wordCount, lineCount, ratio, inputCost, outputCost, totalCost |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-text` | 在这里输入或粘贴你要计算 Token 的文本... 支持: - 普通文本 - 代码片段 - JSON/Markdown 等格式 - 中英文混合内容 Token 会实时计算并显示在右侧。 | textarea | "" |  |
| `--model-select` | modelSelect | select-one | "gpt-4o" | "gpt-4o" (GPT-4o / GPT-4o mini); "gpt-4-turbo" (GPT-4 Turbo); "gpt-4" (GPT-4); "gpt-3.5-turbo" (GPT-3.5 Turbo); "claude-3.5-sonnet" (Claude 3.5 Sonnet); "claude-3-opus" (Claude 3 Opus); "claude-3-haiku" (Claude 3 Haiku); "deepseek-v3" (DeepSeek V3); "deepseek-r1" (DeepSeek R1); "gemini-2.0" (Gemini 2.0 Flash); "gemini-1.5-pro" (Gemini 1.5 Pro) |

已检查示例：

```bash
html-tools ai/token-counter count-tokens --input-text 'Hello world
Hello world
TypeScript' --model-select 'gpt-4o' --json
```

### ai/prompt-generator

结构化提示词生成器：根据 CREATE 框架结构化生成高质量 AI Prompt，提升大模型输出准确率

来源：`html-tools/tools/ai/prompt-generator.html`，SHA-256：`fd53a24f75e52782c7148ca072dec079f32abb0c3e33aed4523bce721d353481`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-prompt` | generatePrompt | result-display |
| `run` | 按字段输入重新计算 | result-display |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--prompt-role` | 🎭 设定角色 (Role) | text | "" |  |
| `--prompt-task` | 🎯 核心任务 (Task) 必填 | textarea | "" |  |
| `--prompt-context` | 📖 背景信息 (Context) | textarea | "" |  |
| `--prompt-format` | 📋 输出格式 (Format) | text | "" |  |
| `--prompt-rules` | ⚠️ 约束条件 (Constraints/Rules) | textarea | "" |  |
| `--prompt-tone` | 🗣️ 语气风格 (Tone) | select-one | "" | "" (默认/中立); "专业、严谨" (专业、严谨); "友好、鼓励" (友好、鼓励); "简洁、直接，没有废话" (简洁、直接，没有废话); "幽默风趣" (幽默风趣) |

已检查示例：

```bash
html-tools ai/prompt-generator generate-prompt --prompt-role 'Hello world
Hello world
TypeScript' --prompt-task 'Hello world
Hello world
TypeScript' --prompt-context 'Hello world
Hello world
TypeScript' --prompt-format 'Hello world
Hello world
TypeScript' --prompt-rules 'Hello world
Hello world
TypeScript' --prompt-tone '专业、严谨' --json
```

## business

### business/profit-margin

毛利净利计算器：计算毛利率和净利率

来源：`html-tools/tools/business/profit-margin.html`，SHA-256：`53bdff7bec147a661ead6c58f3cdc3882dbdf20e3fe057c053ed7dc97861c162`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算利润率 | grossProfit, grossMargin, operatingProfit, operatingMargin, netProfit, netMargin, gaugeValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--revenue` | 销售收入 (元) | number | "100000" | min=0 |
| `--cogs` | 销售成本 (元) | number | "60000" | min=0 |
| `--admin-expense` | 管理费用 (元) | number | "10000" | min=0 |
| `--sales-expense` | 销售费用 (元) | number | "8000" | min=0 |
| `--finance-expense` | 财务费用 (元) | number | "2000" | min=0 |
| `--tax` | 税费 (元) | number | "5000" | min=0 |

已检查示例：

```bash
html-tools business/profit-margin calculate --revenue '100000' --cogs '60000' --admin-expense '10000' --sales-expense '8000' --finance-expense '2000' --tax '5000' --json
```

### business/breakeven

盈亏平衡分析：计算盈亏平衡点

来源：`html-tools/tools/business/breakeven.html`，SHA-256：`b94a994cfe513543b36cf018e0a43c3e3f1d101ba74a74fbaf7743222bf2faf9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算盈亏平衡点 | breakevenUnits, breakevenRevenue, contributionMargin, contributionRatio, targetUnits, scenarioBody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--fixed-cost` | 固定成本 (元/月) | number | "50000" | min=0 |
| `--unit-price` | 单位售价 (元) | number | "100" | min=0 |
| `--variable-cost` | 单位变动成本 (元) | number | "60" | min=0 |
| `--target-profit` | 目标利润 (元/月) | number | "20000" | min=0 |

已检查示例：

```bash
html-tools business/breakeven calculate --fixed-cost '50000' --unit-price '100' --variable-cost '60' --target-profit '20000' --json
```

### business/roi

ROI 计算器：计算投资回报率

来源：`html-tools/tools/business/roi.html`，SHA-256：`cee892afe4c127ce70d9883a65a973fc95b8ae5f7d4393064fa566fd13c1d9e6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算ROI | roi, netProfit, annualRoi, paybackPeriod, multiple |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--initial-investment` | 初始投资金额 (元) | number | "100000" | min=0 |
| `--investment-period` | 投资期限 (年) | number | "3" | min=1 |
| `--total-return` | 预期总收益 (元) | number | "150000" | min=0 |
| `--annual-return` | 年均收益 (元) | number | "50000" | min=0 |

已检查示例：

```bash
html-tools business/roi calculate --initial-investment '100000' --investment-period '3' --total-return '150000' --annual-return '50000' --json
```

### business/npv

净现值NPV计算器：计算投资项目的净现值

来源：`html-tools/tools/business/npv.html`，SHA-256：`85ef401627bb69e3de42e12969cc426ca1cee11ca9baa9cc268915a6c7d59690`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算NPV | npv, irr, pi, payback, totalCashflow, decisionIcon, decisionText |
| `update-year-labels` | updateYearLabels | cashflowList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--initial-investment` | 初始投资金额 (元) | number | "100000" | min=0 |
| `--discount-rate` | 贴现率 (%) | number | "10" | min=0 |
| `--field-3` | 初始投资金额 (元) | number | "30000" |  |
| `--field-4` | 初始投资金额 (元) | number | "35000" |  |
| `--field-5` | 初始投资金额 (元) | number | "40000" |  |
| `--field-6` | 初始投资金额 (元) | number | "45000" |  |

已检查示例：

```bash
html-tools business/npv calculate --initial-investment '100000' --discount-rate '10' --field-3 '30000' --field-4 '35000' --field-5 '40000' --field-6 '45000' --json
```

### business/inventory

库存周转计算器：计算库存周转率和周转天数

来源：`html-tools/tools/business/inventory.html`，SHA-256：`bacfb54400a5150af2207b9cacfd8d275bbf1158d29e36e976d77b44281d85f6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算周转率 | turnoverRate, avgInventory, turnoverDays, dailySales, daysOfSupply, assessmentIcon, assessmentText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--cogs` | 销售成本/出库成本 (元) | number | "1000000" | min=0 |
| `--opening-inventory` | 期初库存 (元) | number | "200000" | min=0 |
| `--closing-inventory` | 期末库存 (元) | number | "300000" | min=0 |
| `--period` | 分析周期 (天) | number | "365" | min=1 |

已检查示例：

```bash
html-tools business/inventory calculate --cogs '1000000' --opening-inventory '200000' --closing-inventory '300000' --period '365' --json
```

### business/receivables

应收账款账龄分析：分析应收账款账龄结构

来源：`html-tools/tools/business/receivables.html`，SHA-256：`893dccf9b7810144da745c9c6376df5d174c79333430814a90e24b770423f6d3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 分析账龄 | totalReceivables, badDebtProvision, badDebtRate, avgAge, agingLegend, riskIcon, riskText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--age1` | 1年以内 | number | "100" | min=0 |
| `--rate1` | 1年以内 | number | "5" | min=0, max=100 |
| `--age2` | 1-2年 | number | "30" | min=0 |
| `--rate2` | 1-2年 | number | "10" | min=0, max=100 |
| `--age3` | 2-3年 | number | "15" | min=0 |
| `--rate3` | 2-3年 | number | "30" | min=0, max=100 |
| `--age4` | 3-4年 | number | "5" | min=0 |
| `--rate4` | 3-4年 | number | "50" | min=0, max=100 |
| `--age5` | 4-5年 | number | "3" | min=0 |
| `--rate5` | 4-5年 | number | "80" | min=0, max=100 |
| `--age6` | 5年以上 | number | "2" | min=0 |
| `--rate6` | 5年以上 | number | "100" | min=0, max=100 |

已检查示例：

```bash
html-tools business/receivables calculate --age1 '100' --rate1 '5' --age2 '30' --rate2 '10' --age3 '15' --rate3 '30' --age4 '5' --rate4 '50' --age5 '3' --rate5 '80' --age6 '2' --rate6 '100' --json
```

### business/cashflow

现金流预测：预测企业现金流状况

来源：`html-tools/tools/business/cashflow.html`，SHA-256：`863d2371e32d855dd92f8889404de17b8fc88649bc38cf4a2b126704e8436ba3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 生成预测 | totalInflow, totalOutflow, netCashflow, endingBalance, tableBody, chartContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--opening-balance` | 期初现金余额 (元) | number | "100000" | min=0 |
| `--sales-income` | 销售收入 (元) | number | "80000" | min=0 |
| `--other-income` | 其他收入 (元) | number | "5000" | min=0 |
| `--growth-rate` | 月增长率 (%) | number | "5" |  |
| `--purchase-cost` | 采购成本 (元) | number | "40000" | min=0 |
| `--payroll` | 工资薪酬 (元) | number | "25000" | min=0 |
| `--rent` | 租金 (元) | number | "8000" | min=0 |
| `--utilities` | 水电费 (元) | number | "2000" | min=0 |
| `--marketing` | 营销费用 (元) | number | "5000" | min=0 |
| `--other-expense` | 其他支出 (元) | number | "3000" | min=0 |

已检查示例：

```bash
html-tools business/cashflow calculate --opening-balance '100000' --sales-income '80000' --other-income '5000' --growth-rate '5' --purchase-cost '40000' --payroll '25000' --rent '8000' --utilities '2000' --marketing '5000' --other-expense '3000' --json
```

### business/pricing

定价策略计算器：计算产品定价策略

来源：`html-tools/tools/business/pricing.html`，SHA-256：`57dc96adc513ccd6745f102d7d2c7bc6712e980730be1e9711bc05163b06a0b4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算定价 | recommendedPrice, lowPrice, lowMargin, midPrice, midMargin, highPrice, highMargin, actualMargin, unitProfit, vsMarket, competitiveness, analysisText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--unit-cost` | 单位成本 (元) | number | "80" | min=0 |
| `--target-margin` | 目标利润率 (%) | number | "30" | min=0, max=100 |
| `--competitor-low` | 竞品最低价 (元) | number | "100" | min=0 |
| `--competitor-high` | 竞品最高价 (元) | number | "150" | min=0 |
| `--market-avg` | 市场均价 (元) | number | "120" | min=0 |
| `--customer-expect` | 顾客心理价位 (元) | number | "99" | min=0 |

已检查示例：

```bash
html-tools business/pricing calculate --unit-cost '80' --target-margin '30' --competitor-low '100' --competitor-high '150' --market-avg '120' --customer-expect '99' --json
```

### business/cost-calc

成本核算计算器：核算产品或项目成本

来源：`html-tools/tools/business/cost-calc.html`，SHA-256：`27320c837954b641a04af2a79dbcd86e0194a31337efd75f305a5e5a62782841`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算成本 | unitCost, materialCost, laborCost, overheadCost, adminCost, salesCost, suggestedPrice, costBreakdown, totalCost, totalRevenue, totalProfit |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` | 材料名称 | text | "主要原料" |  |
| `--field-2` | 单价 | number | "50" | min=0 |
| `--field-3` | 用量 | number | "2" | min=0 |
| `--labor-hours` | 工时 (小时/件) | number | "2" | min=0 |
| `--labor-rate` | 时薪 (元/小时) | number | "30" | min=0 |
| `--depreciation` | 设备折旧 (元/件) | number | "5" | min=0 |
| `--utilities` | 水电费 (元/件) | number | "3" | min=0 |
| `--rent` | 租金分摊 (元/件) | number | "8" | min=0 |
| `--other-cost` | 其他费用 (元/件) | number | "2" | min=0 |
| `--admin-rate` | 管理费用分摊 (%) | number | "10" | min=0, max=100 |
| `--sales-rate` | 销售费用分摊 (%) | number | "5" | min=0, max=100 |
| `--profit-rate` | 预期利润率 (%) | number | "20" | min=0 |
| `--quantity` | 生产数量 (件) | number | "100" | min=1 |

已检查示例：

```bash
html-tools business/cost-calc calculate --field-1 '主要原料' --field-2 '50' --field-3 '2' --labor-hours '2' --labor-rate '30' --depreciation '5' --utilities '3' --rent '8' --other-cost '2' --admin-rate '10' --sales-rate '5' --profit-rate '20' --quantity '100' --json
```

### business/salary

税后薪资工具(商业版)：计算税后工资和社保扣款

来源：`html-tools/tools/business/salary.html`，SHA-256：`7973904ca3144a37e9ee84be44da1f264cafedb5ff8d6b0b8db3caac93b6819d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算工资 | netSalary, socialPersonal, fundPersonal, incomeTax, totalDeduction, detailGross, detailPension, detailMedical, detailUnemployment, detailFund, detailSpecial, detailTaxable, detailTax, detailNet, socialCompany, fundCompany, totalCost |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--gross-salary` | 税前月薪 (元) | number | "15000" | min=0 |
| `--social-base` | 社保缴纳基数 (元) | number | "15000" | min=0 |
| `--fund-base` | 公积金缴纳基数 (元) | number | "15000" | min=0 |
| `--fund-rate` | 公积金比例 (%) | number | "12" | min=5, max=12 |
| `--child-education` | 子女教育 (元/月) | number | "0" | min=0 |
| `--continuing-education` | 继续教育 (元/月) | number | "0" | min=0 |
| `--housing-loan` | 住房贷款利息 (元/月) | number | "0" | min=0 |
| `--housing-rent` | 住房租金 (元/月) | number | "0" | min=0 |
| `--elderly-support` | 赡养老人 (元/月) | number | "0" | min=0 |
| `--babycare` | 婴幼儿照护 (元/月) | number | "0" | min=0 |

已检查示例：

```bash
html-tools business/salary calculate --gross-salary '15000' --social-base '15000' --fund-base '15000' --fund-rate '12' --child-education '0' --continuing-education '0' --housing-loan '0' --housing-rent '0' --elderly-support '0' --babycare '0' --json
```

### business/invoice

发票计算器：计算发票税额和价税分离

来源：`html-tools/tools/business/invoice.html`，SHA-256：`2a0eec658a9b8295ed04a639245f5b445249fd84d28098dbe8613247afd623fd`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | resultWithoutTax, resultTax, resultWithTax |
| `run` | 按字段输入重新计算 | resultWithoutTax, resultTax, resultWithTax |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--amount-with-tax` | 含税金额 (元) | number | "11300" | min=0 |
| `--amount-without-tax` | 不含税金额 (元) | number | "10000" | min=0 |
| `--tax-rate` | 税率 | select-one | "0.13" | "0.13" (13% (一般商品)); "0.09" (9% (农产品/运输)); "0.06" (6% (服务业)); "0.05" (5% (简易征收)); "0.03" (3% (小规模)); "0.01" (1% (优惠税率)); "0" (0% (免税)) |

已检查示例：

```bash
html-tools business/invoice calculate --amount-with-tax '11300' --amount-without-tax '10000' --tax-rate '0.13' --json
```

### business/equity-dilution

股权稀释计算器：计算融资后的股权稀释比例

来源：`html-tools/tools/business/equity-dilution.html`，SHA-256：`057a2143c2b0ee42a93d82b0ec8f3d15f1ec0d187b89d73922bba30d39fe67e9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算稀释 | preVal, investment, postVal, investorShares, founderBefore, founderAfter, dilutionRate, valueChange, legend, detailTable |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--pre-valuation` | 投前估值 (万元) | number | "1000" | min=0 |
| `--founder-shares` | 创始人持股比例 (%) | number | "70" | min=0, max=100 |
| `--other-shares` | 其他股东持股比例 (%) | number | "20" | min=0, max=100 |
| `--option-pool` | 期权池比例 (%) | number | "10" | min=0, max=100 |
| `--investment-amount` | 融资金额 (万元) | number | "200" | min=0 |
| `--new-option-pool` | 新增期权池 (%) | number | "5" | min=0, max=50 |

已检查示例：

```bash
html-tools business/equity-dilution calculate --pre-valuation '1000' --founder-shares '70' --other-shares '20' --option-pool '10' --investment-amount '200' --new-option-pool '5' --json
```

### business/valuation

企业估值计算器：使用多种方法估算企业价值

来源：`html-tools/tools/business/valuation.html`，SHA-256：`302919c50a3dca856ebde39d2529638dec11a46795cfb2029c65033cf76da49c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算估值 | valuationRange, peValuation, psValuation, evValuation, pbValuation, dcfValuation |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--revenue` | 年营业收入 (万元) | number | "1000" | min=0 |
| `--net-profit` | 年净利润 (万元) | number | "100" | min=0 |
| `--ebitda` | EBITDA (万元) | number | "150" | min=0 |
| `--net-assets` | 净资产 (万元) | number | "500" | min=0 |
| `--industry` | 行业 | select-one | "tech" | "tech" (科技/互联网); "manufacturing" (制造业); "retail" (零售/消费); "service" (服务业); "finance" (金融) |
| `--stage` | 增长阶段 | select-one | "early" | "early" (早期成长); "growth" (快速增长); "mature" (成熟期); "decline" (衰退期) |
| `--growth-rate` | 预期增长率 (%) | number | "20" |  |
| `--discount-rate` | 贴现率 (%) | number | "15" |  |

已检查示例：

```bash
html-tools business/valuation calculate --revenue '1000' --net-profit '100' --ebitda '150' --net-assets '500' --industry 'tech' --stage 'early' --growth-rate '20' --discount-rate '15' --json
```

### business/business-scope

经营范围生成器：生成企业经营范围描述

来源：`html-tools/tools/business/business-scope.html`，SHA-256：`5401dd2ca2c3d88e470de15e50462bedac66dbdfbe1cf3d6f5c4a1ceca04fbe6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-options` | updateOptions | businessOptions |
| `run` | 按字段输入重新计算 | businessOptions |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--industry` | industry | select-one | "" | "" (请选择主营行业); "tech" (科技/互联网); "trade" (贸易/批发零售); "service" (商务服务); "consulting" (咨询服务); "media" (文化传媒); "education" (教育培训); "food" (餐饮食品); "manufacturing" (生产制造) |

已检查示例：

```bash
html-tools business/business-scope update-options --industry 'tech' --json
```

操作限制：部分原页面操作未通过迁移检查: generate: 原工具没有产生可输出的结果，请检查参数

### business/roi-calculator

ROI 投资回报率计算器(详细)：计算投资回报率(ROI)，评估投资效益

来源：`html-tools/tools/business/roi-calculator.html`，SHA-256：`dc5bd52cfe0d9eff32555d76316d656e623a9d8d7f675711337c87fd61896fb1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | roiValue, roiDescription, netProfit, annualizedReturn, paybackPeriod, profitMargin |
| `run` | 按字段输入重新计算 | roiValue, roiDescription, netProfit, annualizedReturn, paybackPeriod, profitMargin |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--initial-investment` | 初始投资 (元) | number | "100000" | min=0 |
| `--final-return` | 最终收益 (元) | number | "150000" | min=0 |
| `--years` | 投资期限 (年) | number | "3" | min=0.1 |

已检查示例：

```bash
html-tools business/roi-calculator calculate --initial-investment '100000' --final-return '150000' --years '3' --json
```

### business/nps-csat-calculator

NPS / CSAT 客户满意度计算器：批量输入 NPS 问卷评分（0-10），自动计算净推荐值（Promoter% - Detractor%），并可计算 CSAT 和 CES 指标。

来源：`html-tools/tools/business/nps-csat-calculator.html`，SHA-256：`ad4822a04f101663e6a8319f8fade44c89a8f9695d355413e87a7f5c46e712ee`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-csat-from-inputs` | calcCsatFromInputs | csatResults |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--nps-input` | 每行输入一个评分（0-10） 支持逗号或空格分隔 示例： 9 10 7 5 8 3 | textarea | "" |  |
| `--csat-scale` | 评分量表 | select-one | "5" | "5" (1-5 分（4-5 分算满意）); "3" (1-3 分（3 分算满意）); "10" (1-10 分（8-10 分算满意）) |
| `--csat-satisfied` | 满意响应数 | number | "" | min=0 |
| `--csat-total` | 总响应数 | number | "" | min=1 |
| `--csat-batch` | 每行一个评分 示例（1-5 量表）： 5 4 5 3 2 5 4 | textarea | "" |  |
| `--ces-scale` | cesScale | select-one | "7" | "7" (1-7 分); "5" (1-5 分) |
| `--ces-input` | 每行输入一个评分 示例（1-7 量表）： 2 3 1 4 2 5 3 | textarea | "" |  |

已检查示例：

```bash
html-tools business/nps-csat-calculator calc-csat-from-inputs --nps-input 'Hello world
Hello world
TypeScript' --csat-scale '5' --csat-satisfied '10' --csat-total '10' --csat-batch 'Hello world
Hello world
TypeScript' --ces-scale '7' --ces-input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: calc-nps: 请输入评分数据 | calc-csat-from-batch: 请输入评分数据 | calc-ces: 请输入评分数据 | run: 原工具没有产生可输出的结果，请检查参数

### business/salary-negotiation-calculator

薪资谈判计算器：对比多个 offer 的税后实际收入（含五险一金、年终、股票 vesting），计算真实年化总薪酬，辅助决策。

来源：`html-tools/tools/business/salary-negotiation-calculator.html`，SHA-256：`df37157450efbf6b993f4725e44636b7d53d4df595bc974c667fe5d6def3267d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | 计算对比 | resultOffers, comparisonBars |
| `calc-and-render` | calcAndRender | resultOffers, comparisonBars |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--city-select` | 城市: | select-one | "beijing" | "beijing" (北京); "shanghai" (上海); "guangzhou" (广州); "shenzhen" (深圳); "hangzhou" (杭州); "chengdu" (成都); "other" (其他（自定义）) |
| `--offer-company` | 公司名称（选填） | text | "" |  |
| `--offer-monthly` | 公司名称（选填） | number | "" | min=0 |
| `--offer-months` | 公司名称（选填） | select-one | "12" | "12" (12 薪); "13" (13 薪); "14" (14 薪); "15" (15 薪); "16" (16 薪); "18" (18 薪); "custom" (自定义) |
| `--offer-months-val` | 公司名称（选填） | number | "" | min=12, max=30 |
| `--offer-bonus` | 公司名称（选填） | number | "" | min=0 |
| `--offer-bonus-rate` | 公司名称（选填） | number | "100" | min=0, max=200 |
| `--offer-equity` | 公司名称（选填） | number | "" | min=0 |
| `--offer-vest-years` | 公司名称（选填） | select-one | "4" | "4" (4 年); "3" (3 年); "2" (2 年); "1" (1 年) |
| `--offer-hpf` | 公司名称（选填） | number | "12" | min=5, max=12 |
| `--offer-ss-base` | 公司名称（选填） | number | "" | min=0 |
| `--offer-company-2` | 公司名称（选填） | text | "" |  |
| `--offer-monthly-2` | 公司名称（选填） | number | "" | min=0 |
| `--offer-months-2` | 公司名称（选填） | select-one | "12" | "12" (12 薪); "13" (13 薪); "14" (14 薪); "15" (15 薪); "16" (16 薪); "18" (18 薪); "custom" (自定义) |
| `--offer-months-val-2` | 公司名称（选填） | number | "" | min=12, max=30 |
| `--offer-bonus-2` | 公司名称（选填） | number | "" | min=0 |
| `--offer-bonus-rate-2` | 公司名称（选填） | number | "100" | min=0, max=200 |
| `--offer-equity-2` | 公司名称（选填） | number | "" | min=0 |
| `--offer-vest-years-2` | 公司名称（选填） | select-one | "4" | "4" (4 年); "3" (3 年); "2" (2 年); "1" (1 年) |
| `--offer-hpf-2` | 公司名称（选填） | number | "12" | min=5, max=12 |
| `--offer-ss-base-2` | 公司名称（选填） | number | "" | min=0 |
| `--offer-company-3` | 公司名称（选填） | text | "" |  |
| `--offer-monthly-3` | 公司名称（选填） | number | "" | min=0 |
| `--offer-months-3` | 公司名称（选填） | select-one | "12" | "12" (12 薪); "13" (13 薪); "14" (14 薪); "15" (15 薪); "16" (16 薪); "18" (18 薪); "custom" (自定义) |
| `--offer-months-val-3` | 公司名称（选填） | number | "" | min=12, max=30 |
| `--offer-bonus-3` | 公司名称（选填） | number | "" | min=0 |
| `--offer-bonus-rate-3` | 公司名称（选填） | number | "100" | min=0, max=200 |
| `--offer-equity-3` | 公司名称（选填） | number | "" | min=0 |
| `--offer-vest-years-3` | 公司名称（选填） | select-one | "4" | "4" (4 年); "3" (3 年); "2" (2 年); "1" (1 年) |
| `--offer-hpf-3` | 公司名称（选填） | number | "12" | min=5, max=12 |
| `--offer-ss-base-3` | 公司名称（选填） | number | "" | min=0 |

已检查示例：

```bash
html-tools business/salary-negotiation-calculator calc --city-select 'beijing' --offer-company 'Hello world
Hello world
TypeScript' --offer-monthly '10' --offer-months '12' --offer-months-val '12' --offer-bonus '10' --offer-bonus-rate '100' --offer-equity '10' --offer-vest-years '4' --offer-hpf '12' --offer-ss-base '10' --offer-company-2 'Hello world
Hello world
TypeScript' --offer-monthly-2 '10' --offer-months-2 '12' --offer-months-val-2 '12' --offer-bonus-2 '10' --offer-bonus-rate-2 '100' --offer-equity-2 '10' --offer-vest-years-2 '4' --offer-hpf-2 '12' --offer-ss-base-2 '10' --offer-company-3 'Hello world
Hello world
TypeScript' --offer-monthly-3 '10' --offer-months-3 '12' --offer-months-val-3 '12' --offer-bonus-3 '10' --offer-bonus-rate-3 '100' --offer-equity-3 '10' --offer-vest-years-3 '4' --offer-hpf-3 '12' --offer-ss-base-3 '10' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

## calculator

### calculator/age-diff-calc

年龄差计算器：年龄差计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/age-diff-calc.html`，SHA-256：`b86ed6ab911263b2b407226bea1951795e07492db606c10c921ec2f475b465db`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | age1, zodiac1, constellation1, age2, zodiac2, constellation2, diffYears, diffDetail, diffMonths, diffDays, diffWeeks, whoOlder |
| `run` | 按字段输入重新计算 | age1, zodiac1, constellation1, age2, zodiac2, constellation2, diffYears, diffDetail, diffMonths, diffDays, diffWeeks, whoOlder |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--date1` | 出生日期 | date | "" |  |
| `--date2` | 出生日期 | date | "" |  |

已检查示例：

```bash
html-tools calculator/age-diff-calc calculate --date1 '2025-01-01' --date2 '2025-01-01' --json
```

### calculator/aspect-ratio-calculator

宽高比计算器：计算和转换宽高比，支持常见视频图片分辨率

来源：`html-tools/tools/calculator/aspect-ratio-calculator.html`，SHA-256：`bf7dce39ef8a4180d6aa435422fb4819cba24c298e1835ad3435fb72a72c689d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | ratioValue, ratioDecimal, previewBox, calcHeightResult, calcWidthResult |
| `calc-from-width` | calcFromWidth | calcHeightResult |
| `calc-from-height` | calcFromHeight | calcWidthResult |
| `run` | 按字段输入重新计算 | ratioValue, ratioDecimal, previewBox, calcHeightResult, calcWidthResult |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--width` | 宽度 (W) | number | "1920" | min=1 |
| `--height` | 高度 (H) | number | "1080" | min=1 |
| `--calc-width` | 请输入数字输入框 | number | "1280" | min=1 |
| `--calc-height` | 请输入数字输入框 | number | "720" | min=1 |

已检查示例：

```bash
html-tools calculator/aspect-ratio-calculator calculate --width '1920' --height '1080' --calc-width '1280' --calc-height '720' --json
```

### calculator/base-calculator

进制计算器：多进制转换和位运算计算器，支持可视化位操作

来源：`html-tools/tools/calculator/base-calculator.html`，SHA-256：`d320e820ad0fae675cc396601c794891d0442f0b979b90537875c8d7675d44c4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-bit-display` | updateBitDisplay | bitDisplay, bitLabels |
| `calculate` | calculate | calcResult, calcResultAll |
| `run` | 按字段输入重新计算 | dec, bin, oct, hex, bitDisplay, bitLabels, calcResult, calcResultAll |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--dec` | 十进制 (10) | text | "255" |  |
| `--bin` | 二进制 (2) | text | "11111111" |  |
| `--oct` | 八进制 (8) | text | "377" |  |
| `--hex` | 十六进制 (16) | text | "FF" |  |
| `--calc-a` | 操作数 A | text | "255" |  |
| `--calc-op` | calcOp | select-one | "add" | "add" (+); "sub" (-); "mul" (×); "div" (÷); "mod" (%); "and" (&); "or" (\|); "xor" (^); "shl" (<<); "shr" (>>) |
| `--calc-b` | 操作数 B | text | "1" |  |

已检查示例：

```bash
html-tools calculator/base-calculator update-bit-display --dec '255' --bin '11111111' --oct '377' --hex 'FF' --calc-a '255' --calc-op 'add' --calc-b '1' --json
```

### calculator/bitwise-calculator

位运算计算器：位运算计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/bitwise-calculator.html`，SHA-256：`a098dcffa44ffdd50bab17e8d7f7a3a5a3645ce7ce81111c021d1e0564ccfdd9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | resultDec, resultHex, resultBin |
| `update-bit-grid` | updateBitGrid | bitGrid |
| `run` | 按字段输入重新计算 | resultDec, resultHex, resultBin |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-a` | 输入数字 (支持 0x, 0b 前缀) | text | "" |  |
| `--shift-amount` | 移位量: | number | "1" | min=0, max=31 |
| `--input-b` | 输入数字 (支持 0x, 0b 前缀) | text | "" |  |

已检查示例：

```bash
html-tools calculator/bitwise-calculator calculate --input-a 'Hello world
Hello world
TypeScript' --shift-amount '1' --input-b 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: update-input-a: 0 | update-input-b: 0

### calculator/bmi-calculator

BMI 计算器：计算身体质量指数，评估体重健康状况

来源：`html-tools/tools/calculator/bmi-calculator.html`，SHA-256：`6344914df8cf034c3d179c61679ea6b60337159ceeef722280175d3e45ec67f4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate-btn` | 计算 BMI | bmiValue |
| `calculate-bmi` | calculateBMI | bmiValue |
| `run` | 按字段输入重新计算 | bmiValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--height` | 输入身高... | number | "170" | min=50, max=250 |
| `--height-unit` | heightUnit | select-one | "cm" | "cm" (厘米 (cm)); "m" (米 (m)); "in" (英寸 (in)) |
| `--weight` | 输入体重... | number | "65" | min=20, max=300 |
| `--weight-unit` | weightUnit | select-one | "kg" | "kg" (公斤 (kg)); "lb" (磅 (lb)) |

已检查示例：

```bash
html-tools calculator/bmi-calculator calculate-btn --height '170' --height-unit 'cm' --weight '65' --weight-unit 'kg' --json
```

### calculator/electricity-calc

电费计算器：电费计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/electricity-calc.html`，SHA-256：`029c5aaa2852aaf91d7813f947107ebb51f10b45cbbca7b32727dc0cce1f9a5d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算电费 | totalCost, totalUsage, avgPrice, tier1Cost, tier2Cost, tier3Cost, yearlyCost, dailyCost, appCost0, appCost1, appCost2, appCost3, applianceTotalCost |
| `calc-appliances` | calcAppliances | appCost0, appCost1, appCost2, appCost3, applianceTotalCost |
| `run` | 按字段输入重新计算 | appCost0, appCost1, appCost2, appCost3, applianceTotalCost |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--usage` | 月用电量 (度/kWh) | number | "300" | min=0 |
| `--pricing-type` | 月用电量 (度/kWh) | select-one | "tiered" | "tiered" (阶梯电价); "tou" (峰谷电价); "fixed" (固定电价) |
| `--tier1-price` | 第一档 (0-200度) | number | "0.52" | min=0 |
| `--tier2-price` | 第二档 (201-400度) | number | "0.57" | min=0 |
| `--tier3-price` | 第三档 (400度以上) | number | "0.82" | min=0 |
| `--tier1-limit` | 第一档上限 | number | "200" | min=0 |
| `--tier2-limit` | 第二档上限 | number | "400" | min=0 |
| `--peak-price` | 峰时电价 | number | "1.0" | min=0 |
| `--flat-price` | 平时电价 | number | "0.6" | min=0 |
| `--valley-price` | 谷时电价 | number | "0.3" | min=0 |
| `--peak-ratio` | 峰时用电占比 | number | "30" | min=0, max=100 |
| `--flat-ratio` | 平时用电占比 | number | "50" | min=0, max=100 |
| `--valley-ratio` | 谷时用电占比 | number | "20" | min=0, max=100 |
| `--fixed-price` | 电价 | number | "0.55" | min=0 |
| `--field-15` | 计费方式 | text | "空调" |  |
| `--field-16` | 计费方式 | number | "1200" |  |
| `--field-17` | 计费方式 | number | "4" |  |
| `--field-18` | 计费方式 | text | "冰箱" |  |
| `--field-19` | 计费方式 | number | "150" |  |
| `--field-20` | 计费方式 | number | "24" |  |
| `--field-21` | 计费方式 | text | "电视" |  |
| `--field-22` | 计费方式 | number | "100" |  |
| `--field-23` | 计费方式 | number | "4" |  |
| `--field-24` | 计费方式 | text | "热水器" |  |
| `--field-25` | 计费方式 | number | "2000" |  |
| `--field-26` | 计费方式 | number | "1" |  |

已检查示例：

```bash
html-tools calculator/electricity-calc calculate --usage '300' --pricing-type 'tiered' --tier1-price '0.52' --tier2-price '0.57' --tier3-price '0.82' --tier1-limit '200' --tier2-limit '400' --peak-price '1.0' --flat-price '0.6' --valley-price '0.3' --peak-ratio '30' --flat-ratio '50' --valley-ratio '20' --fixed-price '0.55' --field-15 '空调' --field-16 '1200' --field-17 '4' --field-18 '冰箱' --field-19 '150' --field-20 '24' --field-21 '电视' --field-22 '100' --field-23 '4' --field-24 '热水器' --field-25 '2000' --field-26 '1' --json
```

### calculator/function-plotter

函数图像绘制器：绘制数学函数图像

来源：`html-tools/tools/calculator/function-plotter.html`，SHA-256：`fe4f99b86f220ddedb84533909c95222d6900ebcc5c3a5f288ecb4e4c7950118`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-image` | 💾 保存图片 | download |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--function-color` | function-color | color | "#ef4444" |  |
| `--function-input` | y = ... | text | "sin(x)" |  |
| `--x-min` | X最小值 | number | "-10" |  |
| `--x-max` | X最大值 | number | "10" |  |
| `--y-min` | Y最小值 | number | "-10" |  |
| `--y-max` | Y最大值 | number | "10" |  |

已检查示例：

```bash
html-tools calculator/function-plotter export-image --function-color '#ef4444' --function-input 'sin(x)' --x-min '-10' --x-max '10' --y-min '-10' --y-max '10' --json
```

### calculator/loan-calculator

贷款计算器：计算贷款月供、总利息，支持两种还款方式

来源：`html-tools/tools/calculator/loan-calculator.html`，SHA-256：`da1bb054a339ae63f76a6e5234910bc942165db3174de52348b98dd2f34151a8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算月供 | monthly, totalInterest, totalPayment |
| `run` | 按字段输入重新计算 | monthly, totalInterest, totalPayment |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--principal` | 贷款金额 (元) | number | "" |  |
| `--rate` | 年利率 (%) | number | "" |  |
| `--years` | 贷款期限 (年) | number | "" |  |

已检查示例：

```bash
html-tools calculator/loan-calculator calculate --principal '10' --rate '10' --years '10' --json
```

### calculator/math-evaluator

数学表达式计算器：计算复杂数学表达式，支持函数和常量

来源：`html-tools/tools/calculator/math-evaluator.html`，SHA-256：`5df4a030e67a576b00ed60ccf6594d8f5bc0d3ddf019248469ae9c661d0b2b8c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | 计算 | result, historyList |
| `calculate` | calculate | result, historyList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--expression` | 输入表达式，如 2*(3+4)^2 或 sin(pi/2) | text | "" |  |

已检查示例：

```bash
html-tools calculator/math-evaluator calc --expression '2 + 3 * 4' --json
```

### calculator/percentage

百分比计算器：多种百分比计算模式：求百分比、增减、占比等

来源：`html-tools/tools/calculator/percentage.html`，SHA-256：`40b45e398b6ac1413e847aa5cd6a1b04dbd0cc036cb07d2db70262302fc1964c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc1` | calc1 | result1 |
| `calc2` | calc2 | result2 |
| `calc3` | calc3 | result3 |
| `calc4` | calc4 | result4 |
| `run` | 按字段输入重新计算 | result1, result2, result3, result4 |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--calc1-x` | X | number | "" |  |
| `--calc1-y` | Y | number | "" |  |
| `--calc2-y` | Y | number | "" |  |
| `--calc2-x` | X | number | "" |  |
| `--calc3-x` | X | number | "" |  |
| `--calc3-op` | calc3-op | select-one | "add" | "add" (增加); "sub" (减少) |
| `--calc3-y` | Y | number | "" |  |
| `--calc4-x` | 原值 X | number | "" |  |
| `--calc4-y` | 新值 Y | number | "" |  |

已检查示例：

```bash
html-tools calculator/percentage calc1 --calc1-x '10' --calc1-y '10' --calc2-y '10' --calc2-x '10' --calc3-x '10' --calc3-op 'add' --calc3-y '10' --calc4-x '10' --calc4-y '10' --json
```

### calculator/progress

进度计算器：计算项目进度百分比和预计完成时间

来源：`html-tools/tools/calculator/progress.html`，SHA-256：`dd009c8bd09c9e82ffb56522276762c1d0be75582748dfafadcd5ffb805cd3be`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | progressFill, progressPct, remaining, daysElapsed, dailyRate, estimatedEnd, daysRemaining |
| `run` | 按字段输入重新计算 | progressFill, progressPct, remaining, daysElapsed, dailyRate, estimatedEnd, daysRemaining |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--total` | 总量 | number | "100" |  |
| `--completed` | 已完成 | number | "0" |  |
| `--start-date` | 开始日期 | date | "2026-10-30" |  |
| `--target-date` | 目标日期（可选） | date | "" |  |

已检查示例：

```bash
html-tools calculator/progress calculate --total '100' --completed '0' --start-date '2026-10-30' --target-date '2025-01-01' --json
```

### calculator/salary-calc

税后工资计算器：税后工资计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/salary-calc.html`，SHA-256：`1e66e9626a73983146b4618f2ed8273848b55501245c6c00cd9628c515750430`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | netSalary, grossDisplay, pensionDeduct, medicalDeduct, unemploymentDeduct, housingDeduct, socialTotal, taxableIncome, taxDeduct, yearlyGross, yearlySocial, yearlyTax, yearlyNet |
| `update-base` | updateBase | pensionBase, medicalBase, unemploymentBase, housingBase |
| `run` | 按字段输入重新计算 | pensionBase, medicalBase, unemploymentBase, housingBase |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--gross-salary` | 税前月工资 (元) | number | "20000" | min=0 |
| `--city` | 税前月工资 (元) | select-one | "shenzhen" | "beijing" (北京); "shanghai" (上海); "guangzhou" (广州); "shenzhen" (深圳); "hangzhou" (杭州); "chengdu" (成都); "custom" (自定义) |
| `--pension-base` | 养老保险基数 | number | "20000" |  |
| `--medical-base` | 医疗保险基数 | number | "20000" |  |
| `--unemployment-base` | 失业保险基数 | number | "20000" |  |
| `--housing-base` | 公积金基数 | number | "20000" |  |
| `--pension-rate` | 养老 (%) | number | "8" |  |
| `--medical-rate` | 医疗 (%) | number | "2" |  |
| `--unemployment-rate` | 失业 (%) | number | "0.5" |  |
| `--housing-rate` | 公积金 (%) | number | "12" |  |
| `--child-education` | 子女教育 | number | "0" |  |
| `--continuing-education` | 继续教育 | number | "0" |  |
| `--housing-loan` | 住房贷款利息 | number | "0" |  |
| `--housing-rent` | 住房租金 | number | "0" |  |
| `--elderly-support` | 赡养老人 | number | "0" |  |
| `--babycare` | 3岁以下婴幼儿照护 | number | "0" |  |

已检查示例：

```bash
html-tools calculator/salary-calc calculate --gross-salary '20000' --city 'shenzhen' --pension-base '20000' --medical-base '20000' --unemployment-base '20000' --housing-base '20000' --pension-rate '8' --medical-rate '2' --unemployment-rate '0.5' --housing-rate '12' --child-education '0' --continuing-education '0' --housing-loan '0' --housing-rent '0' --elderly-support '0' --babycare '0' --json
```

### calculator/speed-calc

网速计算器：网速计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/speed-calc.html`，SHA-256：`c1c03f4332e0760349a1f7e1ad107f652b6d0aa022b1c4bcc9f426115ce3e966`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-download-time` | 计算下载时间 | downloadTime, timeSec, timeMin, timeHour, actualSpeed |
| `calc-bandwidth` | 计算推荐带宽 | recommendedBandwidth, baseBandwidth, bufferBandwidth, perDeviceBandwidth |
| `convert-speed` | convertSpeed | resGbps, resMbps, resKbps, resGBps, resMBps, resKBps |
| `run` | 按字段输入重新计算 | resGbps, resMbps, resKbps, resGBps, resMBps, resKBps |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--speed-value` | 数值 | number | "100" | min=0 |
| `--speed-unit` | 单位 | select-one | "Mbps" | "Mbps" (Mbps (兆比特/秒)); "Kbps" (Kbps (千比特/秒)); "Gbps" (Gbps (吉比特/秒)); "MBps" (MB/s (兆字节/秒)); "KBps" (KB/s (千字节/秒)); "GBps" (GB/s (吉字节/秒)) |
| `--file-size` | 文件大小 | number | "1" | min=0 |
| `--size-unit` | 大小单位 | select-one | "GB" | "GB" (GB); "MB" (MB); "KB" (KB); "TB" (TB) |
| `--download-speed` | 下载速度 | number | "100" | min=0 |
| `--download-speed-unit` | 速度单位 | select-one | "Mbps" | "Mbps" (Mbps); "MBps" (MB/s); "Kbps" (Kbps); "KBps" (KB/s) |
| `--device-count` | 同时在线设备数 | number | "5" | min=1 |
| `--main-usage` | 同时在线设备数 | select-one | "video1080" | "browse" (网页浏览/办公 (2 Mbps/设备)); "video720" (720P视频 (5 Mbps/设备)); "video1080" (1080P视频 (10 Mbps/设备)); "video4k" (4K视频 (25 Mbps/设备)); "gaming" (在线游戏 (5 Mbps/设备)); "videocall" (视频会议 (8 Mbps/设备)) |

已检查示例：

```bash
html-tools calculator/speed-calc calc-download-time --speed-value '100' --speed-unit 'Mbps' --file-size '1' --size-unit 'GB' --download-speed '100' --download-speed-unit 'Mbps' --device-count '5' --main-usage 'video1080' --json
```

### calculator/statistics-calc

统计计算器：统计计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/statistics-calc.html`，SHA-256：`6b3bb2f573af72d6d450783caa8b23bd1c8a8018034fa001f22b42320d233c96`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算统计量 | count, sum, mean, median, mode, range, min, max, variance, stddev, sampleVariance, sampleStddev, q1, q3, iqr, cv, skewness, kurtosis, histogramLabels, freqTable |
| `generate-sample` | 生成示例数据 | dataInput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--data-input` | 输入数据（用逗号、空格或换行分隔）： | textarea | "12, 15, 18, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50" |  |

已检查示例：

```bash
html-tools calculator/statistics-calc calculate --data-input '12, 15, 18, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50' --json
```

### calculator/storage-converter

存储单位换算：B/KB/MB/GB/TB/PB 存储单位互转

来源：`html-tools/tools/calculator/storage-converter.html`，SHA-256：`aa8224daf42ec9ae89faffa081ec124b81c685f39d2acd32bedcbac6835099e9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | results |
| `run` | 按字段输入重新计算 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--value` | 请输入数字输入框 | number | "1" |  |
| `--unit` | unit | select-one | "2" | "0" (B); "1" (KB); "2" (MB); "3" (GB); "4" (TB); "5" (PB) |

已检查示例：

```bash
html-tools calculator/storage-converter convert --value '1' --unit '2' --json
```

### calculator/time-calc

时间加减计算器：时间加减计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/time-calc.html`，SHA-256：`21d8675104b8d4b106e73f4e1f744b9af7b8a38450a623c9bfd4f21240694f13`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-date-time` | 计算 | dtResult, dtResultWeekday |
| `calc-diff` | 计算差值 | diffResult, diffDays, diffWeeks, diffMonths, diffYears, diffHours, diffMinutes, diffDetail |
| `calc-workday` | 计算 | workdayResult, workdays, weekends, totalDays |
| `convert-duration` | convertDuration | resSec, resMin, resHour, resDay, resWeek, resFormatted |
| `run` | 按字段输入重新计算 | resSec, resMin, resHour, resDay, resWeek, resFormatted |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--start-date-time` | 起始日期时间 | datetime-local | "2026-10-30T11:37" |  |
| `--dt-op` | 加上 | radio | "add" | "add" (加上); "subtract" (减去) |
| `--add-years` | 年 | number | "0" | min=0 |
| `--add-months` | 月 | number | "0" | min=0 |
| `--add-days` | 日 | number | "0" | min=0 |
| `--add-hours` | 时 | number | "0" | min=0 |
| `--add-minutes` | 分 | number | "0" | min=0 |
| `--add-seconds` | 秒 | number | "0" | min=0 |
| `--duration-value` | 数值 | number | "90" |  |
| `--duration-unit` | 单位 | select-one | "minutes" | "seconds" (秒); "minutes" (分钟); "hours" (小时); "days" (天); "weeks" (周) |
| `--diff-start` | 开始日期 | date | "2026-10-30" |  |
| `--diff-end` | 结束日期 | date | "2026-10-30" |  |
| `--workday-start` | 起始日期 | date | "2026-10-30" |  |
| `--workday-op` | 加上 | radio | "add" | "add" (加上工作日); "count" (计算工作日数) |
| `--workday-count` | 工作日数量 | number | "10" | min=0 |
| `--workday-end` | 结束日期 | date | "2026-10-30" |  |

已检查示例：

```bash
html-tools calculator/time-calc calc-date-time --start-date-time '2026-10-30T11:37' --dt-op 'add' --add-years '0' --add-months '0' --add-days '0' --add-hours '0' --add-minutes '0' --add-seconds '0' --duration-value '90' --duration-unit 'minutes' --diff-start '2026-10-30' --diff-end '2026-10-30' --workday-start '2026-10-30' --workday-op 'add' --workday-count '10' --workday-end '2026-10-30' --json
```

### calculator/tip-calculator

小费/AA计算器：小费/AA计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/tip-calculator.html`，SHA-256：`35ca98ff73eb2cf20edd72105a1c0d26611727cfe1cc9c80cfd66509a05469b2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | pctEcho, chips, pctRange, customPct, perPerson, rBill, rPctTag, rTip, rTotal |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--bill` | 账单金额 | number | "" | min=0 |
| `--pct-range` | 自定义小费比例 | range | "15" | min=0, max=40 |
| `--round-up` / `--no-round-up` | 每人金额向上取整 | checkbox | false |  |

已检查示例：

```bash
html-tools calculator/tip-calculator run --bill '10' --pct-range '15' --no-round-up --json
```

### calculator/triangle-calc

三角函数计算器：三角函数计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/triangle-calc.html`，SHA-256：`a21acff77c870037626db0c3c06a4a6c14d11e7337ce5d6e9f9df57d001ba55e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate-trig` | 计算 | sinVal, cosVal, tanVal, cscVal, secVal, cotVal |
| `calculate-inverse` | 计算 | invDeg, invRad |
| `solve-triangle` | 求解 | angleA, angleB, angleC, area, perimeter, circumR |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--angle-input` | 角度值 | number | "45" |  |
| `--angle-unit` | 单位 | select-one | "deg" | "deg" (度 (°)); "rad" (弧度 (rad)) |
| `--inverse-input` | 数值 | number | "0.5" |  |
| `--inverse-func` | 函数 | select-one | "asin" | "asin" (arcsin (反正弦)); "acos" (arccos (反余弦)); "atan" (arctan (反正切)) |
| `--side-a` | 边 a | number | "3" |  |
| `--side-b` | 边 b | number | "4" |  |
| `--side-c` | 边 c | number | "5" |  |

已检查示例：

```bash
html-tools calculator/triangle-calc calculate-trig --angle-input '45' --angle-unit 'deg' --inverse-input '0.5' --inverse-func 'asin' --side-a '3' --side-b '4' --side-c '5' --json
```

### calculator/age-calculator

年龄计算器：年龄计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/age-calculator.html`，SHA-256：`00ab6c5bffed5103a4976f969871b0a714609b2fe7bb730e6c7626b64f4fca05`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | age, details, nextBirthday |
| `run` | 按字段输入重新计算 | age, details, nextBirthday |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--birthdate` | 出生日期 | date | "" |  |

已检查示例：

```bash
html-tools calculator/age-calculator calculate --birthdate '2025-01-01' --json
```

### calculator/compound-interest

复利计算器：复利计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/compound-interest.html`，SHA-256：`d82d3221fe8bd6f05733658325ce9f550af4e1bff7ef50f4439366dd189cc309`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | total, totalPrincipal, totalInterest, chart |
| `run` | 按字段输入重新计算 | total, totalPrincipal, totalInterest, chart |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--principal` | 初始本金 (元) | number | "100000" | min=0 |
| `--rate` | 年利率 (%) | number | "5" | min=0 |
| `--years` | 投资年限 | number | "10" | min=1, max=50 |
| `--frequency` | 复利频率 | select-one | "12" | "1" (每年); "2" (每半年); "4" (每季度); "12" (每月); "365" (每天) |
| `--monthly` | 每月追加投资 (元) | number | "1000" | min=0 |

已检查示例：

```bash
html-tools calculator/compound-interest calculate --principal '100000' --rate '5' --years '10' --frequency '12' --monthly '1000' --json
```

### calculator/currency

汇率转换器：汇率转换器，多格式互转，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/currency.html`，SHA-256：`99d41f49f677f5797ea0471d05d94edcff39637e843d0bc5e80cdd18e039fa62`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-rate-display` | updateRateDisplay | rateDisplay, reverseRate |
| `run` | 按字段输入重新计算 | fromAmount, toAmount, rateDisplay, reverseRate |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--from-currency` | fromCurrency | select-one | "CNY" | "CNY" (🇨🇳 CNY); "USD" (🇺🇸 USD); "EUR" (🇪🇺 EUR); "GBP" (🇬🇧 GBP); "JPY" (🇯🇵 JPY); "KRW" (🇰🇷 KRW); "HKD" (🇭🇰 HKD); "TWD" (🇹🇼 TWD); "SGD" (🇸🇬 SGD); "AUD" (🇦🇺 AUD); "CAD" (🇨🇦 CAD); "CHF" (🇨🇭 CHF); "NZD" (🇳🇿 NZD); "THB" (🇹🇭 THB); "MYR" (🇲🇾 MYR); "RUB" (🇷🇺 RUB); "INR" (🇮🇳 INR); "VND" (🇻🇳 VND); "PHP" (🇵🇭 PHP); "IDR" (🇮🇩 IDR) |
| `--from-amount` | 请输入数字输入框 | number | "100" | min=0 |
| `--to-currency` | toCurrency | select-one | "USD" | "CNY" (🇨🇳 CNY); "USD" (🇺🇸 USD); "EUR" (🇪🇺 EUR); "GBP" (🇬🇧 GBP); "JPY" (🇯🇵 JPY); "KRW" (🇰🇷 KRW); "HKD" (🇭🇰 HKD); "TWD" (🇹🇼 TWD); "SGD" (🇸🇬 SGD); "AUD" (🇦🇺 AUD); "CAD" (🇨🇦 CAD); "CHF" (🇨🇭 CHF); "NZD" (🇳🇿 NZD); "THB" (🇹🇭 THB); "MYR" (🇲🇾 MYR); "RUB" (🇷🇺 RUB); "INR" (🇮🇳 INR); "VND" (🇻🇳 VND); "PHP" (🇵🇭 PHP); "IDR" (🇮🇩 IDR) |
| `--to-amount` | 请输入数字输入框 | number | "13.89" | min=0 |

已检查示例：

```bash
html-tools calculator/currency update-rate-display --from-currency 'CNY' --from-amount '100' --to-currency 'USD' --to-amount '13.89' --json
```

### calculator/discount-calc

折扣计算器：折扣计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/discount-calc.html`，SHA-256：`bae45ff37b6c1b578a1025a05b304feaddbb1ddd2b8df118828a529232009913`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | resultOriginal, resultDiscount, resultFinal, resultSavings, resultSavingsPercent |
| `run` | 按字段输入重新计算 | resultOriginal, resultDiscount, resultFinal, resultSavings, resultSavingsPercent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--original1` | 原价 | number | "" | min=0 |
| `--discount1` | 折扣 (如：8折输入80，打7折输入70) | number | "" | min=0, max=100 |
| `--original2` | 原价 | number | "" | min=0 |
| `--final2` | 到手价 | number | "" | min=0 |
| `--final3` | 到手价 | number | "" | min=0 |
| `--discount3` | 折扣 (如：8折输入80) | number | "" | min=1, max=100 |

已检查示例：

```bash
html-tools calculator/discount-calc calculate --original1 '10' --discount1 '10' --original2 '10' --final2 '10' --final3 '10' --discount3 '10' --json
```

### calculator/equation

方程求解器：方程求解器，在线使用，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/equation.html`，SHA-256：`2b7f29c7113b12355337bac05f3c02d9a0ace37791e7bb1952a54eda2ea5f894`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `solve-linear` | 求解 | result, resultDetail, steps |
| `solve-quadratic` | 求解 | result, resultDetail, steps |
| `solve-system2` | 求解 | result, resultDetail, steps |
| `solve-system3` | 求解 | result, resultDetail, steps |
| `solve-cubic` | 求解 | result, resultDetail, steps |
| `update-linear-preview` | updateLinearPreview | linearPreview |
| `update-quadratic-preview` | updateQuadraticPreview | quadraticPreview |
| `update-cubic-preview` | updateCubicPreview | cubicPreview |
| `run` | 按字段输入重新计算 | linearPreview, quadraticPreview, cubicPreview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--linear-a` | a (系数) | number | "2" |  |
| `--linear-b` | b (常数) | number | "3" |  |
| `--linear-c` | c (等号右边) | number | "7" |  |
| `--quad-a` | a (x²系数) | number | "1" |  |
| `--quad-b` | b (x系数) | number | "-5" |  |
| `--quad-c` | c (常数项) | number | "6" |  |
| `--s2a1` | 请输入数字输入框 | number | "2" |  |
| `--s2b1` | 请输入数字输入框 | number | "3" |  |
| `--s2c1` | 请输入数字输入框 | number | "8" |  |
| `--s2a2` | 请输入数字输入框 | number | "4" |  |
| `--s2b2` | 请输入数字输入框 | number | "-1" |  |
| `--s2c2` | 请输入数字输入框 | number | "2" |  |
| `--s3a1` | 请输入数字输入框 | number | "1" |  |
| `--s3b1` | 请输入数字输入框 | number | "2" |  |
| `--s3c1` | 请输入数字输入框 | number | "3" |  |
| `--s3d1` | 请输入数字输入框 | number | "14" |  |
| `--s3a2` | 请输入数字输入框 | number | "2" |  |
| `--s3b2` | 请输入数字输入框 | number | "-1" |  |
| `--s3c2` | 请输入数字输入框 | number | "1" |  |
| `--s3d2` | 请输入数字输入框 | number | "3" |  |
| `--s3a3` | 请输入数字输入框 | number | "3" |  |
| `--s3b3` | 请输入数字输入框 | number | "1" |  |
| `--s3c3` | 请输入数字输入框 | number | "-2" |  |
| `--s3d3` | 请输入数字输入框 | number | "1" |  |
| `--cubic-a` | a (x³系数) | number | "1" |  |
| `--cubic-b` | b (x²系数) | number | "-6" |  |
| `--cubic-c` | c (x系数) | number | "11" |  |
| `--cubic-d` | d (常数项) | number | "-6" |  |

已检查示例：

```bash
html-tools calculator/equation solve-linear --linear-a '2' --linear-b '3' --linear-c '7' --quad-a '1' --quad-b '-5' --quad-c '6' --s2a1 '2' --s2b1 '3' --s2c1 '8' --s2a2 '4' --s2b2 '-1' --s2c2 '2' --s3a1 '1' --s3b1 '2' --s3c1 '3' --s3d1 '14' --s3a2 '2' --s3b2 '-1' --s3c2 '1' --s3d2 '3' --s3a3 '3' --s3b3 '1' --s3c3 '-2' --s3d3 '1' --cubic-a '1' --cubic-b '-6' --cubic-c '11' --cubic-d '-6' --json
```

### calculator/fuel-calc

油耗计算器：油耗计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/fuel-calc.html`，SHA-256：`a9bac74f4345e4b2d572c796f0fce0d1e3c3b62852c13de97e5a9d0ca1004f63`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-consumption` | 计算油耗 | consumptionResult, perKm, perLiter, mpg |
| `calc-cost` | 计算费用 | costResult, totalFuel, costPerKm, yearCost |
| `calc-trip` | 计算 | neededFuel, tripCost, currentRange, fullRange, needToFill, fillCost |
| `calc-compare` | 对比计算 | gasYearlyCost, evYearlyCost, yearlySaving, perKmDiff |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--distance1` | 行驶里程 (公里) | number | "500" | min=0 |
| `--fuel1` | 加油量 (升) | number | "40" | min=0 |
| `--distance2` | 行驶里程 (公里) | number | "1000" | min=0 |
| `--consumption2` | 百公里油耗 (L/100km) | number | "8" | min=0 |
| `--fuel-price` | 油价 (元/升) | number | "7.5" | min=0 |
| `--trip-distance` | 计划行驶 (公里) | number | "800" | min=0 |
| `--trip-consumption` | 车辆油耗 (L/100km) | number | "8" | min=0 |
| `--tank-size` | 油箱容量 (升) | number | "55" | min=0 |
| `--current-fuel` | 当前油量 (升) | number | "30" | min=0 |
| `--trip-fuel-price` | 油价 (元/升) | number | "7.5" | min=0 |
| `--yearly-distance` | 年行驶里程 (公里) | number | "15000" | min=0 |
| `--gas-consumption` | 百公里油耗 (L) | number | "8" | min=0 |
| `--gas-price` | 百公里油耗 (L) | number | "7.5" | min=0 |
| `--ev-consumption` | 百公里电耗 (kWh) | number | "15" | min=0 |
| `--electricity-price` | 百公里电耗 (kWh) | number | "0.6" | min=0 |

已检查示例：

```bash
html-tools calculator/fuel-calc calc-consumption --distance1 '500' --fuel1 '40' --distance2 '1000' --consumption2 '8' --fuel-price '7.5' --trip-distance '800' --trip-consumption '8' --tank-size '55' --current-fuel '30' --trip-fuel-price '7.5' --yearly-distance '15000' --gas-consumption '8' --gas-price '7.5' --ev-consumption '15' --electricity-price '0.6' --json
```

### calculator/matrix-calculator

矩阵计算器：矩阵计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/matrix-calculator.html`，SHA-256：`421ee4c3fa51440cea63354e0726e7cf46042be0602c0cc304d6552b7a3ba1a3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | = 计算结果 | resultArea |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--rows-a` | 请输入数字输入框 | number | "3" | min=1, max=6 |
| `--cols-a` | 请输入数字输入框 | number | "3" | min=1, max=6 |
| `--matrix-cell` | matrix-cell | number | "0" |  |
| `--matrix-cell-2` | matrix-cell | number | "0" |  |
| `--matrix-cell-3` | matrix-cell | number | "0" |  |
| `--matrix-cell-4` | matrix-cell | number | "0" |  |
| `--matrix-cell-5` | matrix-cell | number | "0" |  |
| `--matrix-cell-6` | matrix-cell | number | "0" |  |
| `--matrix-cell-7` | matrix-cell | number | "0" |  |
| `--matrix-cell-8` | matrix-cell | number | "0" |  |
| `--matrix-cell-9` | matrix-cell | number | "0" |  |
| `--rows-b` | 请输入数字输入框 | number | "3" | min=1, max=6 |
| `--cols-b` | 请输入数字输入框 | number | "3" | min=1, max=6 |
| `--matrix-cell-10` | matrix-cell | number | "0" |  |
| `--matrix-cell-11` | matrix-cell | number | "0" |  |
| `--matrix-cell-12` | matrix-cell | number | "0" |  |
| `--matrix-cell-13` | matrix-cell | number | "0" |  |
| `--matrix-cell-14` | matrix-cell | number | "0" |  |
| `--matrix-cell-15` | matrix-cell | number | "0" |  |
| `--matrix-cell-16` | matrix-cell | number | "0" |  |
| `--matrix-cell-17` | matrix-cell | number | "0" |  |
| `--matrix-cell-18` | matrix-cell | number | "0" |  |

已检查示例：

```bash
html-tools calculator/matrix-calculator calculate --rows-a '3' --cols-a '3' --matrix-cell '0' --matrix-cell-2 '0' --matrix-cell-3 '0' --matrix-cell-4 '0' --matrix-cell-5 '0' --matrix-cell-6 '0' --matrix-cell-7 '0' --matrix-cell-8 '0' --matrix-cell-9 '0' --rows-b '3' --cols-b '3' --matrix-cell-10 '0' --matrix-cell-11 '0' --matrix-cell-12 '0' --matrix-cell-13 '0' --matrix-cell-14 '0' --matrix-cell-15 '0' --matrix-cell-16 '0' --matrix-cell-17 '0' --matrix-cell-18 '0' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### calculator/mortgage-calculator

房贷计算器：房贷计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/mortgage-calculator.html`，SHA-256：`993d6c303cdb3516929a998d3e64f7db426c3d1de3db93e36098eddca170cf35`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算还款 | monthlyPayment, monthlyNote, totalPrincipal, totalInterest, totalPayment, scheduleBody |
| `run` | 按字段输入重新计算 | principal, principalRange, years, yearsRange, rate, rateRange |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--principal` | 请输入数字输入框 | number | "1000000" | min=10000 |
| `--principal-range` | 贷款总额 | range | "1000000" | min=100000, max=10000000 |
| `--years` | 请输入数字输入框 | number | "30" | min=1, max=30 |
| `--years-range` | 贷款期限 | range | "30" | min=1, max=30 |
| `--rate` | 请输入数字输入框 | number | "3.45" | min=0.1, max=10 |
| `--rate-range` | 年利率 (LPR) | range | "3.45" | min=1, max=8 |

已检查示例：

```bash
html-tools calculator/mortgage-calculator calculate --principal '1000000' --principal-range '1000000' --years '30' --years-range '30' --rate '3.45' --rate-range '3.45' --json
```

### calculator/permutation

排列组合计算器：排列组合计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/permutation.html`，SHA-256：`81abd5f58e1a3c396491f1945f226d5391ae051890e656cbe5fe66916ad3be91`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate-permutation` | 计算排列 | result, resultDetail, steps |
| `calculate-combination` | 计算组合 | result, resultDetail, steps |
| `calculate-factorial` | 计算阶乘 | result, resultDetail, steps |
| `calculate-multi` | 计算多重排列 | result, resultDetail, steps |
| `calculate-circular` | 计算圆排列 | result, resultDetail, steps |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--perm-n` | 总元素数 (n) | number | "5" | min=0, max=170 |
| `--perm-r` | 取出元素数 (r) | number | "3" | min=0, max=170 |
| `--perm-repeat` / `--no-perm-repeat` | 允许重复 (可重复排列: n^r) | checkbox | false |  |
| `--comb-n` | 总元素数 (n) | number | "5" | min=0, max=1000 |
| `--comb-r` | 取出元素数 (r) | number | "3" | min=0, max=1000 |
| `--comb-repeat` / `--no-comb-repeat` | 允许重复 (可重复组合: C(n+r-1, r)) | checkbox | false |  |
| `--fact-n` | 数值 (n) | number | "5" | min=0, max=170 |
| `--multi-n` | 总元素数 (n) | number | "5" | min=1, max=170 |
| `--multi-counts` | 各类元素个数（用逗号分隔） | text | "2,2,1" |  |
| `--circular-n` | 元素数 (n) | number | "5" | min=1, max=170 |
| `--circular-necklace` / `--no-circular-necklace` | 项链问题（考虑翻转对称，除以2） | checkbox | false |  |

已检查示例：

```bash
html-tools calculator/permutation calculate-permutation --perm-n '5' --perm-r '3' --no-perm-repeat --comb-n '5' --comb-r '3' --no-comb-repeat --fact-n '5' --multi-n '5' --multi-counts '2,2,1' --circular-n '5' --no-circular-necklace --json
```

### calculator/probability

概率计算器：概率计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/probability.html`，SHA-256：`93d755821910b1f01e21191c9c1c5506583e6bbbfe42987b95338ee0b7316bfc`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate-basic` | 计算概率 | result, resultDetail |
| `calculate-combined` | 计算概率 | result, resultDetail |
| `calculate-conditional` | 计算后验概率 | result, resultDetail |
| `calculate-binomial` | 计算概率 | result, resultDetail |
| `update-dice-grid` | updateDiceGrid | diceGrid |
| `run` | 按字段输入重新计算 | diceGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--favorable` | 有利结果数 | number | "1" | min=0 |
| `--total` | 总可能结果数 | number | "6" | min=1 |
| `--prob-a` | P(A) 概率 | number | "0.5" | min=0, max=1 |
| `--prob-b` | P(B) 概率 | number | "0.3" | min=0, max=1 |
| `--combine-type` | 运算类型 A 且 B (同时发生) A 或 B (至少一个发生) 非 A (A 不发生) 仅一个发生 | select-one | "and" | "and" (A 且 B (同时发生)); "or" (A 或 B (至少一个发生)); "not" (非 A (A 不发生)); "xor" (仅一个发生) |
| `--independent` / `--no-independent` | 事件独立 | checkbox | true |  |
| `--prior-a` | P(A) 先验概率 | number | "0.01" | min=0, max=1 |
| `--prob-bgiven-a` | P(B\|A) 在A发生时B的概率 | number | "0.9" | min=0, max=1 |
| `--prob-bgiven-not-a` | P(B\|非A) 在A不发生时B的概率 | number | "0.05" | min=0, max=1 |
| `--trials` | 试验次数 (n) | number | "10" | min=1, max=1000 |
| `--success-prob` | 成功概率 (p) | number | "0.5" | min=0, max=1 |
| `--successes` | 成功次数 (k) | number | "5" | min=0 |
| `--binomial-type` | 计算类型 恰好 k 次 至少 k 次 至多 k 次 介于 k1 和 k2 之间 | select-one | "exact" | "exact" (恰好 k 次); "atLeast" (至少 k 次); "atMost" (至多 k 次); "between" (介于 k1 和 k2 之间) |
| `--successes2` | 成功次数上限 (k2) | number | "7" | min=0 |
| `--dice-count` | 骰子数量 | number | "2" | min=1, max=10 |
| `--dice-faces` | 骰子面数 | number | "6" | min=2, max=20 |
| `--dice-type` | 计算类型 恰好等于选中总和 大于等于选中最小值 小于等于选中最大值 投出任意选中点数 | select-one | "exact" | "exact" (恰好等于选中总和); "atLeast" (大于等于选中最小值); "atMost" (小于等于选中最大值); "any" (投出任意选中点数) |

已检查示例：

```bash
html-tools calculator/probability calculate-basic --favorable '1' --total '6' --prob-a '0.5' --prob-b '0.3' --combine-type 'and' --independent --prior-a '0.01' --prob-bgiven-a '0.9' --prob-bgiven-not-a '0.05' --trials '10' --success-prob '0.5' --successes '5' --binomial-type 'exact' --successes2 '7' --dice-count '2' --dice-faces '6' --dice-type 'exact' --json
```

操作限制：部分原页面操作未通过迁移检查: calculate-dice: 原工具没有产生可输出的结果，请检查参数

### calculator/programmer

程序员计算器：程序员计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/programmer.html`，SHA-256：`c6fe3941ac1d98b6e82882d148d6a816637dcfdc534079aa74328dc76b82a4a3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-display` | updateDisplay | display, hexValue, decValue, octValue, binValue, bitSize, bitDisplay |
| `run` | 按字段输入重新计算 | display, hexValue, decValue, octValue, binValue, bitSize, bitDisplay |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--base` | HEX | radio | "10" | "16" (HEX); "10" (DEC); "8" (OCT); "2" (BIN) |
| `--size` | HEX | radio | "32" | "8" (BYTE); "16" (WORD); "32" (DWORD); "64" (QWORD) |

已检查示例：

```bash
html-tools calculator/programmer update-display --base '10' --size '32' --json
```

操作限制：部分原页面操作未通过迁移检查: calculate: 原工具没有产生可输出的结果，请检查参数 | update-button-states: 原工具没有产生可输出的结果，请检查参数

### calculator/salary-calculator

工资计算器：工资计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/salary-calculator.html`，SHA-256：`996e63abfda368e65463677dbf805f7559e78432ebd8f95085dad846e39442f8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | netSalary, gross, pension, medical, unemployment, fund, tax, net |
| `run` | 按字段输入重新计算 | netSalary, gross, pension, medical, unemployment, fund, tax, net |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--salary` | 税前月薪 (元) | number | "15000" | min=0 |
| `--base` | 五险一金基数 (留空则按工资计算) | number | "" | min=0 |
| `--fund-rate` | 公积金比例 | select-one | "0.12" | "0.05" (5%); "0.07" (7%); "0.08" (8%); "0.10" (10%); "0.12" (12%) |
| `--deduction` | 专项附加扣除 (元/月) | number | "0" | min=0 |

已检查示例：

```bash
html-tools calculator/salary-calculator calculate --salary '15000' --base '10' --fund-rate '0.12' --deduction '0' --json
```

### calculator/scientific

科学计算器：科学计算器，快速计算结果，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/scientific.html`，SHA-256：`94beab09d21cee11b59f895b194e9e26d4528b87609f98e579b1c6a33edac952`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-display` | updateDisplay | display |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools calculator/scientific update-display  --json
```

操作限制：部分原页面操作未通过迁移检查: calculate: 原工具没有产生可输出的结果，请检查参数

### calculator/unit-converter

单位换算器：单位换算器，在线使用，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/unit-converter.html`，SHA-256：`ce73dca04715fd2a4d6e881e20efdab2db26267f5c3877f43ecd6d44c9f77bca`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-formula` | updateFormula | formula |
| `update-quick-values` | updateQuickValues | quickValues |
| `run` | 按字段输入重新计算 | fromValue, toValue, formula |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--from-value` | 从 | number | "1" |  |
| `--from-unit` | 从 | select-one | "km" | "km" (千米); "m" (米); "dm" (分米); "cm" (厘米); "mm" (毫米); "μm" (微米); "nm" (纳米); "mi" (英里); "yd" (码); "ft" (英尺); "in" (英寸); "nmi" (海里); "li" (里); "zhang" (丈); "chi" (尺); "cun" (寸) |
| `--to-value` | 到 | number | "1000" |  |
| `--to-unit` | 到 | select-one | "m" | "km" (千米); "m" (米); "dm" (分米); "cm" (厘米); "mm" (毫米); "μm" (微米); "nm" (纳米); "mi" (英里); "yd" (码); "ft" (英尺); "in" (英寸); "nmi" (海里); "li" (里); "zhang" (丈); "chi" (尺); "cun" (寸) |

已检查示例：

```bash
html-tools calculator/unit-converter update-formula --from-value '1' --from-unit 'km' --to-value '1000' --to-unit 'm' --json
```

操作限制：部分原页面操作未通过迁移检查: update-units: 原工具没有产生可输出的结果，请检查参数

### calculator/electricity-calculator

电费计算器(详细版)：计算每月电费

来源：`html-tools/tools/calculator/electricity-calculator.html`，SHA-256：`66873c8130d21c15d68806a6bbfef18c5aedfd822157079303884b93a4b9c830`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | total, breakdown |
| `run` | 按字段输入重新计算 | total, breakdown |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--usage` | 月用电量 (度/kWh) | number | "200" | min=0 |
| `--price-type` | 电价标准 | select-one | "residential" | "residential" (居民用电 (阶梯电价)); "commercial" (商业用电); "industrial" (工业用电) |

已检查示例：

```bash
html-tools calculator/electricity-calculator calculate --usage '200' --price-type 'residential' --json
```

### calculator/fuel-calculator

汽车油耗计算器：计算汽车油耗

来源：`html-tools/tools/calculator/fuel-calculator.html`，SHA-256：`c1247df99cef17b7c130196973195add7fa5e3d24c2d7a2e5d416fcd12bb2074`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | consumption, costPer100, kmPerLiter |
| `run` | 按字段输入重新计算 | consumption, costPer100, kmPerLiter |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--distance` | 行驶里程 (公里) | number | "500" | min=0 |
| `--fuel` | 加油量 (升) | number | "40" | min=0 |
| `--price` | 油价 (元/升) | number | "7.5" | min=0 |

已检查示例：

```bash
html-tools calculator/fuel-calculator calculate --distance '500' --fuel '40' --price '7.5' --json
```

### calculator/percentage-calculator

百分比计算：百分比计算器

来源：`html-tools/tools/calculator/percentage-calculator.html`，SHA-256：`039f533b30b6baf1aa755af96c2854fc2a1e9a772ae195cca7e6fa57dab82d66`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc1` | calc1 | r1 |
| `calc2` | calc2 | r2 |
| `calc3` | calc3 | r3 |
| `calc4` | calc4 | r4 |
| `run` | 按字段输入重新计算 | r1, r2, r3, r4 |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--v1` | 0 | number | "" |  |
| `--p1` | 0 | number | "" |  |
| `--v2` | 0 | number | "" |  |
| `--t2` | 0 | number | "" |  |
| `--v3` | 0 | number | "" |  |
| `--p3` | 0 | number | "" |  |
| `--v4` | 初始 | number | "" |  |
| `--v5` | 最终 | number | "" |  |

已检查示例：

```bash
html-tools calculator/percentage-calculator calc1 --v1 '10' --p1 '10' --v2 '10' --t2 '10' --v3 '10' --p3 '10' --v4 '10' --v5 '10' --json
```

### calculator/date-calculator

Date Calculator：Date Calculator，在线使用，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/date-calculator.html`，SHA-256：`8c1216ebb71ed6d636d2e4dc40ae767551b796e283f3bd0258007a3702ae7182`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-diff` | calcDiff | diffResult |
| `calc-date` | calcDate | calcResult |
| `run` | 按字段输入重新计算 | diffResult, calcResult |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--start-date` | 开始日期 | date | "2026-10-30" |  |
| `--end-date` | 结束日期 | date | "2026-10-30" |  |
| `--base-date` | 基准日期 | date | "2026-10-30" |  |
| `--operation` | 操作 | select-one | "add" | "add" (加); "subtract" (减) |
| `--days` | 天数 | number | "30" | min=0 |

已检查示例：

```bash
html-tools calculator/date-calculator calc-diff --start-date '2026-10-30' --end-date '2026-10-30' --base-date '2026-10-30' --operation 'add' --days '30' --json
```

### calculator/discount-calculator

Discount Calculator：Discount Calculator，在线使用，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/discount-calculator.html`，SHA-256：`2c9d1caa779e5d5e121275b909bceaaef9592d9338f6d37b575fd527ad376d56`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | originalPrice, origPrice, discountRate, finalPrice, savedAmount, actualDiscount, savedPercent, compareList |
| `run` | 按字段输入重新计算 | originalPrice, customDiscount, origPrice, discountRate, finalPrice, savedAmount, actualDiscount, savedPercent, compareList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--original-price` | 原价 | number | "" | min=0 |
| `--custom-discount` | 自定义折扣率 | number | "" | min=0.01, max=100 |

已检查示例：

```bash
html-tools calculator/discount-calculator calculate --original-price '10' --custom-discount '10' --json
```

### calculator/percentage-calc

Percentage Calc：Percentage Calc，在线使用，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/percentage-calc.html`，SHA-256：`a4c07c019e35c2710ebe1c79bad1c97f96e87e293c33b930fbaa25c966609a0c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc1` | calc1 | calc1-result |
| `calc2` | calc2 | calc2-result |
| `calc3` | calc3 | calc3-result |
| `calc4` | calc4 | calc4-result |
| `calc5` | calc5 | calc5-result |
| `run` | 按字段输入重新计算 | calc1-result, calc2-result, calc3-result, calc4-result, calc5-result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--calc1-x` | X | number | "" |  |
| `--calc1-y` | Y | number | "" |  |
| `--calc2-y` | Y | number | "" |  |
| `--calc2-x` | X% | number | "" |  |
| `--calc3-x` | X% | number | "" |  |
| `--calc3-z` | Z | number | "" |  |
| `--calc4-x` | 原值X | number | "" |  |
| `--calc4-y` | 新值Y | number | "" |  |
| `--calc5-x` | 原值X | number | "" |  |
| `--calc5-op` | calc5-op | select-one | "add" | "add" (增加); "sub" (减少) |
| `--calc5-y` | Y% | number | "" |  |

已检查示例：

```bash
html-tools calculator/percentage-calc calc1 --calc1-x '10' --calc1-y '10' --calc2-y '10' --calc2-x '10' --calc3-x '10' --calc3-z '10' --calc4-x '10' --calc4-y '10' --calc5-x '10' --calc5-op 'add' --calc5-y '10' --json
```

### calculator/subnet-calculator

Subnet Calculator：Subnet Calculator，在线使用，计算器，浏览器本地运行无需上传

来源：`html-tools/tools/calculator/subnet-calculator.html`，SHA-256：`fe054f4e17b9a40d03baa6309dfe6ed58bde1c9a82757a27d82d70650e6bdcbb`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | results |
| `run` | 按字段输入重新计算 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--ip` | IP地址 | text | "192.168.1.100" |  |
| `--cidr` | CIDR / 子网掩码 | select-one | "24" | "8" (/8 - 255.0.0.0); "16" (/16 - 255.255.0.0); "20" (/20 - 255.255.240.0); "21" (/21 - 255.255.248.0); "22" (/22 - 255.255.252.0); "23" (/23 - 255.255.254.0); "24" (/24 - 255.255.255.0); "25" (/25 - 255.255.255.128); "26" (/26 - 255.255.255.192); "27" (/27 - 255.255.255.224); "28" (/28 - 255.255.255.240); "29" (/29 - 255.255.255.248); "30" (/30 - 255.255.255.252) |

已检查示例：

```bash
html-tools calculator/subnet-calculator calculate --ip '192.168.1.100' --cidr '24' --json
```

### calculator/vat-gst-calculator

增值税 / GST 计算器：支持含税价格还原不含税价、不含税价格加税，覆盖中国增值税（6%/9%/13%）和全球 GST/VAT 税率。

来源：`html-tools/tools/calculator/vat-gst-calculator.html`，SHA-256：`3d7ce8c7888c4faef427bedea7ea73c33c9d48f520820d100f4c89f1f47850f7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | 计算 | resultVal1, resultVal2, resultVal3 |
| `build-presets` | buildPresets | presetGrid |
| `build-rate-table` | buildRateTable | rateRefBody |
| `update-mode-labels` | updateModeLabels | priceLabel, resultLabel1, resultLabel3 |
| `calculate` | calculate | resultVal1, resultVal2, resultVal3 |
| `run` | 按字段输入重新计算 | resultVal1, resultVal2, resultVal3 |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--currency-select` | currencySelect | select-one | "CNY" | "CNY" (¥ CNY); "USD" ($ USD); "EUR" (€ EUR); "GBP" (£ GBP); "AUD" (A$ AUD); "CAD" (C$ CAD); "SGD" (S$ SGD); "INR" (₹ INR); "JPY" (¥ JPY) |
| `--price-input` | 不含税金额 | number | "" | min=0 |
| `--rate-input` | 自定义税率 (%) | number | "" | min=0, max=100 |
| `--qty-input` | 数量（可选） | number | "1" | min=1 |

已检查示例：

```bash
html-tools calculator/vat-gst-calculator calc --currency-select 'CNY' --price-input '10' --rate-input '10' --qty-input '1' --json
```

### calculator/import-duty-estimator

进口关税估算器：根据商品分类（HS 编码简化版）、货值和目的国，估算进口关税、增值税和综合税率，并给出常见税率参考表。

来源：`html-tools/tools/calculator/import-duty-estimator.html`，SHA-256：`6b12028e7629fa6f48ba2edf0a2ab9f0a6be51d170b82edb8eae7618d8e8cab3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算关税 | rDutyRate, rVatRate, rExciseRate, rTotalRate, rCifValue, rDutyAmt, rVatAmt, rExciseAmt, rTotalTax, rGoodsVal2, rTaxTotal2, rLandedCost, statDuty, statVat, statTotal |
| `build-ref-table` | buildRefTable | refTableBody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--dest-country` | 目的国 / 地区 | select-one | "CN" | "CN" (中国大陆); "US" (美国); "EU" (欧盟); "UK" (英国); "JP" (日本); "KR" (韩国); "AU" (澳大利亚); "CA" (加拿大); "SG" (新加坡); "IN" (印度); "BR" (巴西); "MX" (墨西哥); "HK" (香港); "TW" (台湾); "TH" (泰国) |
| `--hs-category` | 商品类别（简化 HS 分类） | select-one | "electronics" | "electronics" (电子产品（手机、电脑、家电）); "clothing" (服装、鞋帽、纺织品); "cosmetics" (化妆品、护肤品); "food" (食品、饮料); "alcohol" (酒类); "tobacco" (烟草制品); "auto" (汽车及零部件); "machinery" (机械设备); "furniture" (家具、家居用品); "toys" (玩具、体育用品); "jewelry" (珠宝、首饰、手表); "books" (图书、纸张); "medicine" (医药品、医疗器械); "chemicals" (化工原料); "other" (其他商品) |
| `--goods-value` | 商品货值（CIF 价） | number | "" | min=0 |
| `--currency` | 货值币种 | select-one | "CNY" | "CNY" (CNY — 人民币); "USD" (USD — 美元); "EUR" (EUR — 欧元); "GBP" (GBP — 英镑); "JPY" (JPY — 日元); "KRW" (KRW — 韩元); "AUD" (AUD — 澳元); "CAD" (CAD — 加元); "HKD" (HKD — 港元); "SGD" (SGD — 新元) |
| `--quantity` | 数量（件） | number | "1" | min=1 |

已检查示例：

```bash
html-tools calculator/import-duty-estimator calculate --dest-country 'CN' --hs-category 'electronics' --goods-value '10' --currency 'CNY' --quantity '1' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### calculator/ohms-law-calculator

欧姆定律 / 电路计算器：基于欧姆定律（V=IR）计算电压、电流、电阻、功率，支持串并联电阻、分压器、LED 限流电阻等常用电路计算。

来源：`html-tools/tools/calculator/ohms-law-calculator.html`，SHA-256：`731912d5fb3537ff36923706146ca7de4a7deb419d3245dcb3cb8ba8c7c444fa`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-ohm` | calcOhm | rc-v-val, rc-i-val, rc-r-val, rc-p-val |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--ohm-v` | 例: 12 | number | "" | min=0 |
| `--ohm-i` | 例: 0.5 | number | "" | min=0 |
| `--ohm-r` | 例: 24 | number | "" | min=0 |
| `--ohm-p` | 例: 6 | number | "" | min=0 |
| `--ohm-input` | Ω | number | "" | min=0 |
| `--ohm-input-2` | Ω | number | "" | min=0 |
| `--ohm-input-3` | Ω | number | "" | min=0 |
| `--ohm-input-4` | Ω | number | "" | min=0 |
| `--div-vin` | 例: 12 | number | "" | min=0 |
| `--div-r1` | 例: 10000 | number | "" | min=0 |
| `--div-r2` | 例: 4700 | number | "" | min=0 |
| `--led-vs` | 例: 5 | number | "" | min=0 |
| `--led-vf` | 例: 2.0 | number | "" | min=0 |
| `--led-if` | 例: 20 | number | "" | min=0 |
| `--led-n` | 1 | number | "1" | min=1 |

已检查示例：

```bash
html-tools calculator/ohms-law-calculator calc-ohm --ohm-v '10' --ohm-i '10' --ohm-r '10' --ohm-p '10' --ohm-input '10' --ohm-input-2 '10' --ohm-input-3 '10' --ohm-input-4 '10' --div-vin '10' --div-r1 '10' --div-r2 '10' --led-vs '10' --led-vf '10' --led-if '10' --led-n '1' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### calculator/dew-point-humidity-calculator

湿度 / 露点计算器：根据气温和相对湿度计算露点温度、绝对湿度、湿球温度，以及室内是否有结露风险。

来源：`html-tools/tools/calculator/dew-point-humidity-calculator.html`，SHA-256：`de245474730a74796b0ed860d82197cc0645c9dba1d029cb7e609848b636c81e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | resDewPoint, resDewPointSub, resWetBulb, resWetBulbSub, resAbsHum, resSatPress, resActPress, resDelta, resDeltaSub, comfortLabel, condensationIcon, condensationText |
| `run` | 按字段输入重新计算 | temperature, tempSlider, humidity, humSlider, resDewPoint, resDewPointSub, resWetBulb, resWetBulbSub, resAbsHum, resSatPress, resActPress, resDelta, resDeltaSub, comfortLabel, condensationIcon, condensationText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--temperature` | 气温 | number | "25" | min=-40, max=60 |
| `--temp-slider` | tempSlider | range | "25" | min=-40, max=60 |
| `--humidity` | 相对湿度 (RH) | number | "60" | min=1, max=100 |
| `--hum-slider` | humSlider | range | "60" | min=1, max=100 |

已检查示例：

```bash
html-tools calculator/dew-point-humidity-calculator calculate --temperature '25' --temp-slider '25' --humidity '60' --hum-slider '60' --json
```

### calculator/normal-distribution-calculator

正态分布计算器：输入均值和标准差，计算任意区间的概率密度（PDF）和累积概率（CDF），绘制钟形曲线并可查 Z-score 对应分位点。

来源：`html-tools/tools/calculator/normal-distribution-calculator.html`，SHA-256：`1124d114f1f3059e8b647fd913485b23bc94d70b4783b4655ae5331ffa3592ee`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | 计算 | resultsContainer, bellCanvas |
| `calculate` | calculate | resultsContainer, bellCanvas |
| `run` | 按字段输入重新计算 | resultsContainer, bellCanvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-mu` | inputMu | number | "0" |  |
| `--input-sigma` | inputSigma | number | "1" | min=0 |
| `--mode` | 单点 — 输入 x，求 PDF / CDF | radio | "point" | "point" (单点 — 输入 x，求 PDF / CDF); "interval" (区间 — 输入 [a, b]，求 P(a ≤ X ≤ b)); "zscore" (Z-score — 输入 Z，求对应 x 和分位点) |
| `--input-x` | inputX | number | "0" |  |
| `--input-a` | inputA | number | "-1" |  |
| `--input-b` | inputB | number | "1" |  |
| `--input-z` | inputZ | number | "1.96" |  |

已检查示例：

```bash
html-tools calculator/normal-distribution-calculator calc --input-mu '0' --input-sigma '1' --mode 'point' --input-x '0' --input-a '-1' --input-b '1' --input-z '1.96' --json
```

### calculator/hypothesis-testing-calculator

假设检验计算器：支持单样本/双样本 t 检验、卡方检验（χ²），输入样本数据后计算 t/χ² 统计量、p 值和检验结论。

来源：`html-tools/tools/calculator/hypothesis-testing-calculator.html`，SHA-256：`75fc23d7b6eba2d676e93292292718b2ed11162be57be05a1b6866769e8bef66`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-one` | 计算 | resultOne |
| `calc-two` | 计算 | resultTwo |
| `calc-chi` | 计算 | resultChi |
| `calc-one-sample` | calcOneSample | resultOne |
| `calc-two-sample` | calcTwoSample | resultTwo |
| `calc-chi-square` | calcChiSquare | resultChi |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--alpha-select` | alphaSelect | select-one | "0.05" | "0.01" (0.01（99% 置信区间）); "0.05" (0.05（95% 置信区间）); "0.10" (0.10（90% 置信区间）) |
| `--tail-select` | tailSelect | select-one | "two" | "two" (双侧检验); "left" (左侧检验（H₁: μ < μ₀）); "right" (右侧检验（H₁: μ > μ₀）) |
| `--one-sample-data` | 输入数据，用逗号、空格或换行分隔 示例：12.5, 13.1, 11.8, 14.2, 12.9 | textarea | "" |  |
| `--one-mu` | 例如：12.0 | number | "" |  |
| `--two-sample-data1` | 输入样本 1，逗号/空格/换行分隔 示例：5.1, 4.8, 5.3, 5.0 | textarea | "" |  |
| `--two-sample-data2` | 输入样本 2，逗号/空格/换行分隔 示例：4.7, 4.5, 4.9, 4.6 | textarea | "" |  |
| `--equal-variance` / `--no-equal-variance` | 假设等方差（合并方差 t 检验） | checkbox | false |  |
| `--chi-observed` | 观测值，逗号/空格/换行分隔 示例：45, 55, 30, 70 | textarea | "" |  |
| `--chi-expected` | 期望值（留空则按等比例自动计算） 示例：50, 50, 50, 50 | textarea | "" |  |

已检查示例：

```bash
html-tools calculator/hypothesis-testing-calculator calc-one --alpha-select '0.05' --tail-select 'two' --one-sample-data '1,2,3,4,5' --one-mu '3' --two-sample-data1 '1,2,3,4,5' --two-sample-data2 '2,3,4,5,6' --no-equal-variance --chi-observed '10,20,30' --chi-expected '20,20,20' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### calculator/print-size-dpi-calculator

打印尺寸 / DPI 计算器：根据图片像素尺寸和打印 DPI，计算实际打印尺寸（cm/inch），或反向根据目标打印尺寸确定所需最低分辨率。

来源：`html-tools/tools/calculator/print-size-dpi-calculator.html`，SHA-256：`1b4ab665f1cfe64f1b011476a64353da3f4c501804ecc968cf28136901f26ca0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-pixel` | 计算打印尺寸 | resInchW, resInchH, resCmW, resCmH, resPaperMatch, resMegapix, resQuality |
| `calc-size` | 计算所需像素 | resPixW, resPixH, resMinMegapix, resSizeCm, resSizeInch, res150, res300, res600 |
| `calc-pixel-to-size` | calcPixelToSize | resInchW, resInchH, resCmW, resCmH, resPaperMatch, resMegapix, resQuality |
| `calc-size-to-pixel` | calcSizeToPixel | resPixW, resPixH, resMinMegapix, resSizeCm, resSizeInch, res150, res300, res600 |
| `build-ref-table` | buildRefTable | refBody |
| `update-size-labels` | updateSizeLabels | labelSizeW, labelSizeH |
| `run` | 按字段输入重新计算 | labelSizeW, labelSizeH |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--pix-w` | 例：3024 | number | "" | min=1 |
| `--pix-h` | 例：4032 | number | "" | min=1 |
| `--pix-dpi` | 例：300 | number | "300" | min=1 |
| `--size-unit` | sizeUnit | select-one | "cm" | "cm" (厘米（cm）); "inch" (英寸（inch）); "mm" (毫米（mm）) |
| `--size-w` | 例：20.3 | number | "" | min=0.01 |
| `--size-h` | 例：25.4 | number | "" | min=0.01 |
| `--size-dpi` | 例：300 | number | "300" | min=1 |

已检查示例：

```bash
html-tools calculator/print-size-dpi-calculator calc-pixel --pix-w '10' --pix-h '10' --pix-dpi '300' --size-unit 'cm' --size-w '10' --size-h '10' --size-dpi '300' --json
```

### calculator/inflation-calculator

通货膨胀计算器：根据历史 CPI 数据计算货币购买力变化，输入某年的金额换算为今日等值，支持主要经济体。

来源：`html-tools/tools/calculator/inflation-calculator.html`，SHA-256：`502efc43285dfe7bd6b5d49db8f69e1834d40772482ad2264caee3178b408450`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | 计算购买力 | resultLabel, resultCurrencyPrefix, resultValue, metricCpiFrom, metricCpiFromLabel, metricCpiTo, metricCpiToLabel, metricInflTotal, metricInflAnnual, metricPowerChange, metricYears, cpiChart, chartNote, statFrom, statTo, statRate |
| `update-year-range-note` | updateYearRangeNote | yearRangeNote |
| `calculate` | calculate | resultLabel, resultCurrencyPrefix, resultValue, metricCpiFrom, metricCpiFromLabel, metricCpiTo, metricCpiToLabel, metricInflTotal, metricInflAnnual, metricPowerChange, metricYears, cpiChart, chartNote, statFrom, statTo, statRate |
| `run` | 按字段输入重新计算 | yearRangeNote |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--region-select` | regionSelect | select-one | "us" | "us" (美国（USD）); "cn" (中国（CNY）); "eu" (欧元区（EUR）); "uk" (英国（GBP）); "jp" (日本（JPY）) |
| `--amount-input` | 金额 | number | "1000" | min=0.01 |
| `--from-year` | 起始年份 | number | "2000" | min=1913, max=2024 |
| `--to-year` | 目标年份 | number | "2024" | min=1913, max=2024 |

已检查示例：

```bash
html-tools calculator/inflation-calculator calc --region-select 'us' --amount-input '1000' --from-year '2000' --to-year '2024' --json
```

### calculator/resistor-color-code

电阻色环计算器：4/5/6 色环电阻阻值读取与反查，支持 E12/E24/E96 标称系列，含误差与温度系数色带说明。

来源：`html-tools/tools/calculator/resistor-color-code.html`，SHA-256：`c960e5f5c5754e191571eba94bf1266ce368c90c996dc30c51e06030637c181a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | resultValue, resultMeta |
| `run` | 按字段输入重新计算 | resultValue, resultMeta, lookupResults, seriesValues |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--band-0` | band_0 | select-one | "棕" | "黑" (黑 (Black)); "棕" (棕 (Brown)); "红" (红 (Red)); "橙" (橙 (Orange)); "黄" (黄 (Yellow)); "绿" (绿 (Green)); "蓝" (蓝 (Blue)); "紫" (紫 (Violet)); "灰" (灰 (Gray)); "白" (白 (White)) |
| `--band-1` | band_1 | select-one | "黑" | "黑" (黑 (Black)); "棕" (棕 (Brown)); "红" (红 (Red)); "橙" (橙 (Orange)); "黄" (黄 (Yellow)); "绿" (绿 (Green)); "蓝" (蓝 (Blue)); "紫" (紫 (Violet)); "灰" (灰 (Gray)); "白" (白 (White)) |
| `--band-2` | band_2 | select-one | "橙" | "黑" (黑 (Black)); "棕" (棕 (Brown)); "红" (红 (Red)); "橙" (橙 (Orange)); "黄" (黄 (Yellow)); "绿" (绿 (Green)); "蓝" (蓝 (Blue)); "紫" (紫 (Violet)); "灰" (灰 (Gray)); "白" (白 (White)); "金" (金 (Gold)); "银" (银 (Silver)) |
| `--band-3` | band_3 | select-one | "金" | "棕" (棕 (Brown)); "红" (红 (Red)); "绿" (绿 (Green)); "蓝" (蓝 (Blue)); "紫" (紫 (Violet)); "灰" (灰 (Gray)); "金" (金 (Gold)); "银" (银 (Silver)); "无" (无 (None)) |
| `--lookup-val` | 阻值（Ω） | number | "" | min=0 |
| `--lookup-series` | E 系列 | select-one | "E24" | "E12" (E12); "E24" (E24); "E96" (E96); "all" (全部) |
| `--series-select` | seriesSelect | select-one | "E12" | "E12" (E12（12值/十倍程）); "E24" (E24（24值/十倍程）); "E96" (E96（96值/十倍程）) |

已检查示例：

```bash
html-tools calculator/resistor-color-code calculate --band-0 '棕' --band-1 '黑' --band-2 '橙' --band-3 '金' --lookup-val '10' --lookup-series 'E24' --series-select 'E12' --json
```

### calculator/capacitor-code-decoder

电容代码解码器：输入贴片/直插电容上的 3 位数字代码（如 104、472），即时换算为 pF/nF/μF，反向亦可。

来源：`html-tools/tools/calculator/capacitor-code-decoder.html`，SHA-256：`1d56668861cff32fd011c8d8a061a84b3264882a6fa7e76264432ce3b926efec`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run-encode` | runEncode | encodeResult, encPf, encCode, encNote |
| `build-ref-table` | buildRefTable | refTableBody |
| `run` | 按字段输入重新计算 | decodeErr, encodeResult, encPf, encCode, encNote |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--code-input` | 代码 | text | "" |  |
| `--val-input` | 容值 | number | "" | min=0 |
| `--val-unit` | 容值 | select-one | "pf" | "pf" (pF); "nf" (nF); "uf" (μF) |

已检查示例：

```bash
html-tools calculator/capacitor-code-decoder run-encode --code-input 'Hello world
Hello world
TypeScript' --val-input '10' --val-unit 'pf' --json
```

操作限制：部分原页面操作未通过迁移检查: run-decode: 格式错误

### calculator/voltage-divider-calculator

分压电路计算器：输入电源电压与两个分压电阻值，实时输出中间节点电压及电流，支持反向求解 R 值。

来源：`html-tools/tools/calculator/voltage-divider-calculator.html`，SHA-256：`0b1619f0103212a30c652d25cfa519a58b0025e82ccca6d28148625c7d378b4c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-forward` | 计算 | svgR1Label, svgVoutLabel, svgR2Label, resVout, resVoutSub, resCurrent, resCurrentSub, formulaBox, statVout, statI, statRatio |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--f-vin` | 如 5 | number | "" | min=0 |
| `--f-r1` | 如 10 | number | "" | min=0 |
| `--f-r1-unit` | fR1Unit | select-one | "1000" | "1" (Ω); "1000" (kΩ); "1000000" (MΩ) |
| `--f-r2` | 如 10 | number | "" | min=0 |
| `--f-r2-unit` | fR2Unit | select-one | "1000" | "1" (Ω); "1000" (kΩ); "1000000" (MΩ) |
| `--r-vin` | 如 5 | number | "" | min=0 |
| `--r-vout` | 如 3.3 | number | "" | min=0 |
| `--r-r1` | 如 10 | number | "" | min=0 |
| `--r-r1-unit` | rR1Unit | select-one | "1000" | "1" (Ω); "1000" (kΩ); "1000000" (MΩ) |

已检查示例：

```bash
html-tools calculator/voltage-divider-calculator calc-forward --f-vin '10' --f-r1 '10' --f-r1-unit '1000' --f-r2 '10' --f-r2-unit '1000' --r-vin '10' --r-vout '10' --r-r1 '10' --r-r1-unit '1000' --json
```

操作限制：部分原页面操作未通过迁移检查: calc-reverse: Vout 必须满足 0 < Vout < Vin | run: 原工具没有产生可输出的结果，请检查参数

### calculator/wire-gauge-awg-calculator

导线规格 / AWG 载流计算器：查询 AWG/mm² 导线截面积、最大安全电流（安培容量）、直流电阻，适用于 DIY 电气布线选型。

来源：`html-tools/tools/calculator/wire-gauge-awg-calculator.html`，SHA-256：`6847d987d47ee10172f2dde213f04f001cc085a1e7b3330951a5d619387fa51c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-vd` | 计算压降 | vdResult |
| `run-lookup` | runLookup | resAwg, resMm2, resDiameter, resDcr, resAmpacity, resAmpacityUnit, resKcmil, ampacityPct, recommendation |
| `run` | 按字段输入重新计算 | resAwg, resMm2, resDiameter, resDcr, resAmpacity, resAmpacityUnit, resKcmil, ampacityPct, recommendation, awgTableBody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-mode` | 查询依据 | select-one | "awg" | "awg" (AWG 规格号); "mm2" (截面积 (mm²)); "diameter" (线径 (mm)) |
| `--sel-awg` | AWG 规格 | select-one | "14" | "4/0" (AWG 4/0 (107.22 mm²)); "3/0" (AWG 3/0 (85.01 mm²)); "2/0" (AWG 2/0 (67.43 mm²)); "1/0" (AWG 1/0 (53.49 mm²)); "1" (AWG 1 (42.41 mm²)); "2" (AWG 2 (33.63 mm²)); "3" (AWG 3 (26.67 mm²)); "4" (AWG 4 (21.15 mm²)); "5" (AWG 5 (16.77 mm²)); "6" (AWG 6 (13.30 mm²)); "7" (AWG 7 (10.55 mm²)); "8" (AWG 8 (8.37 mm²)); "9" (AWG 9 (6.63 mm²)); "10" (AWG 10 (5.26 mm²)); "11" (AWG 11 (4.17 mm²)); "12" (AWG 12 (3.31 mm²)); "13" (AWG 13 (2.63 mm²)); "14" (AWG 14 (2.08 mm²)); "15" (AWG 15 (1.65 mm²)); "16" (AWG 16 (1.31 mm²)); "17" (AWG 17 (1.04 mm²)); "18" (AWG 18 (0.82 mm²)); "19" (AWG 19 (0.65 mm²)); "20" (AWG 20 (0.52 mm²)); "21" (AWG 21 (0.41 mm²)); "22" (AWG 22 (0.33 mm²)); "23" (AWG 23 (0.26 mm²)); "24" (AWG 24 (0.20 mm²)); "25" (AWG 25 (0.16 mm²)); "26" (AWG 26 (0.13 mm²)); "27" (AWG 27 (0.10 mm²)); "28" (AWG 28 (0.0810 mm²)); "29" (AWG 29 (0.0642 mm²)); "30" (AWG 30 (0.0509 mm²)); "31" (AWG 31 (0.0404 mm²)); "32" (AWG 32 (0.0320 mm²)); "33" (AWG 33 (0.0254 mm²)); "34" (AWG 34 (0.0201 mm²)); "35" (AWG 35 (0.0160 mm²)); "36" (AWG 36 (0.0127 mm²)); "37" (AWG 37 (0.0100 mm²)); "38" (AWG 38 (0.0080 mm²)); "39" (AWG 39 (0.0063 mm²)); "40" (AWG 40 (0.0050 mm²)) |
| `--in-mm2` | 截面积 (mm²) | number | "" | min=0.01 |
| `--in-diameter` | 线径 (mm) | number | "" | min=0.01 |
| `--sel-material` | 导体材料 | select-one | "copper" | "copper" (铜 (Copper)); "aluminum" (铝 (Aluminum)) |
| `--sel-install` | 安装场景 | select-one | "chassis" | "chassis" (机箱内布线); "bundled" (束线 / 多芯); "free" (单根自由空气中) |
| `--vd-sel-awg` | AWG 规格 | select-one | "14" | "4/0" (AWG 4/0 (107.22 mm²)); "3/0" (AWG 3/0 (85.01 mm²)); "2/0" (AWG 2/0 (67.43 mm²)); "1/0" (AWG 1/0 (53.49 mm²)); "1" (AWG 1 (42.41 mm²)); "2" (AWG 2 (33.63 mm²)); "3" (AWG 3 (26.67 mm²)); "4" (AWG 4 (21.15 mm²)); "5" (AWG 5 (16.77 mm²)); "6" (AWG 6 (13.30 mm²)); "7" (AWG 7 (10.55 mm²)); "8" (AWG 8 (8.37 mm²)); "9" (AWG 9 (6.63 mm²)); "10" (AWG 10 (5.26 mm²)); "11" (AWG 11 (4.17 mm²)); "12" (AWG 12 (3.31 mm²)); "13" (AWG 13 (2.63 mm²)); "14" (AWG 14 (2.08 mm²)); "15" (AWG 15 (1.65 mm²)); "16" (AWG 16 (1.31 mm²)); "17" (AWG 17 (1.04 mm²)); "18" (AWG 18 (0.82 mm²)); "19" (AWG 19 (0.65 mm²)); "20" (AWG 20 (0.52 mm²)); "21" (AWG 21 (0.41 mm²)); "22" (AWG 22 (0.33 mm²)); "23" (AWG 23 (0.26 mm²)); "24" (AWG 24 (0.20 mm²)); "25" (AWG 25 (0.16 mm²)); "26" (AWG 26 (0.13 mm²)); "27" (AWG 27 (0.10 mm²)); "28" (AWG 28 (0.0810 mm²)); "29" (AWG 29 (0.0642 mm²)); "30" (AWG 30 (0.0509 mm²)); "31" (AWG 31 (0.0404 mm²)); "32" (AWG 32 (0.0320 mm²)); "33" (AWG 33 (0.0254 mm²)); "34" (AWG 34 (0.0201 mm²)); "35" (AWG 35 (0.0160 mm²)); "36" (AWG 36 (0.0127 mm²)); "37" (AWG 37 (0.0100 mm²)); "38" (AWG 38 (0.0080 mm²)); "39" (AWG 39 (0.0063 mm²)); "40" (AWG 40 (0.0050 mm²)) |
| `--vd-length` | 线路单边长度 (m) | number | "5" | min=0.01 |
| `--vd-current` | 负载电流 (A) | number | "10" | min=0.01 |
| `--vd-voltage` | 系统电压 (V) | number | "12" | min=1 |
| `--vd-material` | 导体材料 | select-one | "copper" | "copper" (铜 (Copper)); "aluminum" (铝 (Aluminum)) |
| `--vd-temp` | 工作温度 (°C) | number | "25" | min=-40, max=200 |
| `--table-filter` | 筛选： | select-one | "all" | "all" (全部规格（AWG 0000–40）); "common" (常用规格（0000–20）) |

已检查示例：

```bash
html-tools calculator/wire-gauge-awg-calculator calc-vd --input-mode 'awg' --sel-awg '14' --in-mm2 '10' --in-diameter '10' --sel-material 'copper' --sel-install 'chassis' --vd-sel-awg '14' --vd-length '5' --vd-current '10' --vd-voltage '12' --vd-material 'copper' --vd-temp '25' --table-filter 'all' --json
```

### calculator/battery-runtime-calculator

电池续航估算器：输入电池容量（mAh）和设备平均电流（mA），估算续航时间；支持效率系数与多节串并联。

来源：`html-tools/tools/calculator/battery-runtime-calculator.html`，SHA-256：`acc11c1da72366fa6c060b88d5c5fb06e904eb164300cabd4d8e62c1c520067f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | 立即计算 | brcTimeDisplay, brcPackCap, brcPackVolt, brcPackWh, brcUsableCap, brcPower, brcHours, brcProgressPct, brcStatCells, brcStatEnergy, brcStatRuntime |
| `calculate` | calculate | brcTimeDisplay, brcPackCap, brcPackVolt, brcPackWh, brcUsableCap, brcPower, brcHours, brcProgressPct, brcStatCells, brcStatEnergy, brcStatRuntime |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--brc-capacity` | 单节电池容量 | number | "" | min=1 |
| `--brc-voltage` | 单节标称电压 | number | "3.7" | min=0.1 |
| `--brc-series` | 串联节数 (S) | number | "1" | min=1 |
| `--brc-parallel` | 并联组数 (P) | number | "1" | min=1 |
| `--brc-current` | 平均工作电流 | number | "" | min=0.001 |
| `--brc-current-unit` | brcCurrentUnit | select-one | "mA" | "mA" (mA); "A" (A); "uA" (μA) |
| `--brc-efficiency` | 转换效率 / 放电利用率 | number | "85" | min=1, max=100 |
| `--brc-do-d` | 放电深度 (DoD) | number | "80" | min=1, max=100 |

已检查示例：

```bash
html-tools calculator/battery-runtime-calculator calc --brc-capacity '10' --brc-voltage '3.7' --brc-series '1' --brc-parallel '1' --brc-current '10' --brc-current-unit 'mA' --brc-efficiency '85' --brc-do-d '80' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### calculator/molar-mass-calculator

摩尔质量计算器：输入化学式（如 H₂SO₄、C₆H₁₂O₆），即时解析并计算摩尔质量，显示各元素质量占比。

来源：`html-tools/tools/calculator/molar-mass-calculator.html`，SHA-256：`420ba743cb75a503bbf43e12f4f99229e42abe7770e300e659975a7466da8ec1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | 计算 | resultFormula, resultValue, breakdownBody, molesResult, massResult, statMolar, statAtoms, statElems |
| `calculate` | calculate | resultFormula, resultValue, breakdownBody, molesResult, massResult, statMolar, statAtoms, statElems |
| `run` | 按字段输入重新计算 | molesResult, massResult |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--formula-input` | 输入化学式，如 H2SO4、C6H12O6、NaCl、Ca(OH)2... | text | "" |  |
| `--mass-input` | 质量 | number | "" | min=0 |
| `--moles-input` | 摩尔数 | number | "" | min=0 |

已检查示例：

```bash
html-tools calculator/molar-mass-calculator calc --formula-input 'H2O' --mass-input '10' --moles-input '10' --json
```

### calculator/ph-scale-calculator

pH 值计算器：由氢离子浓度（[H⁺]）或 pOH 互算 pH，含 pH 刻度可视化、酸碱判定与常见溶液参考表。

来源：`html-tools/tools/calculator/ph-scale-calculator.html`，SHA-256：`3982124af47cfb1e8f80cf4326e6ee32c71f458e736c2a712095ecb09b0209d2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-from-poh` | 由 pOH 计算 | resultPhValue, resultBadge, metaH, metaOH, metaPOH, metaKw |
| `calc-from-ph` | 由 pH 计算 | resultPhValue, resultBadge, metaH, metaOH, metaPOH, metaKw |
| `build-ref-table` | buildRefTable | refTableBody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--h-conc` | 氢离子浓度 [H⁺] | number | "" | min=0 |
| `--poh-val` | pOH 值 | number | "" | min=0, max=14 |
| `--ph-direct` | pH 值 | number | "" | min=0, max=14 |

已检查示例：

```bash
html-tools calculator/ph-scale-calculator calc-from-poh --h-conc '10' --poh-val '10' --ph-direct '10' --json
```

操作限制：部分原页面操作未通过迁移检查: calc-from-h: pH 超出有效范围（0–14） | run: 原工具没有产生可输出的结果，请检查参数

## chinese

### chinese/idcard-generator

身份证号码生成器：生成测试用身份证号码

来源：`html-tools/tools/chinese/idcard-generator.html`，SHA-256：`48857e500686dec945d89d5054fadd9b0967eba8d630bd82e82f430fbd2e5565`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成身份证号码 | resultBox |
| `generate-one` | generateOne | value |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--province` | 省份 | select-one | "" | "" (随机省份); "11" (北京市); "12" (天津市); "13" (河北省); "14" (山西省); "15" (内蒙古); "21" (辽宁省); "22" (吉林省); "23" (黑龙江省); "31" (上海市); "32" (江苏省); "33" (浙江省); "34" (安徽省); "35" (福建省); "36" (江西省); "37" (山东省); "41" (河南省); "42" (湖北省); "43" (湖南省); "44" (广东省); "45" (广西); "46" (海南省); "50" (重庆市); "51" (四川省); "52" (贵州省); "53" (云南省); "54" (西藏); "61" (陕西省); "62" (甘肃省); "63" (青海省); "64" (宁夏); "65" (新疆) |
| `--city` | 城市 | select-one | "" | "" (随机城市) |
| `--year-start` | 请输入数字输入框 | number | "1970" | min=1900, max=2024 |
| `--year-end` | 请输入数字输入框 | number | "2005" | min=1900, max=2024 |

已检查示例：

```bash
html-tools chinese/idcard-generator generate --province '11' --city '' --year-start '1970' --year-end '2005' --json
```

操作限制：部分原页面操作未通过迁移检查: update-cities: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### chinese/idcard-validator

身份证号码验证器：验证和解析身份证号码

来源：`html-tools/tools/chinese/idcard-validator.html`，SHA-256：`d5ae1d11c14dc2df32620a2b082a869617af00881739c5a176296ecbca9b41c4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `validate` | 验证 | resultIcon, region, birthDate, gender, age, zodiac, constellation, idParts |
| `validate-input` | validateInput | idInput |
| `run` | 按字段输入重新计算 | idInput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--id-input` | 请输入18位身份证号码 | text | "" |  |

已检查示例：

```bash
html-tools chinese/idcard-validator validate --id-input '11010519491231002X' --json
```

### chinese/uscc-validator

统一社会信用代码验证器：验证企业统一社会信用代码

来源：`html-tools/tools/chinese/uscc-validator.html`，SHA-256：`4603b7f3f491e238518506384a02685f3e4335b8d1d359d476df919c21d2ccc1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format-input` | formatInput | codeInput |
| `run` | 按字段输入重新计算 | codeInput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--code-input` | 请输入18位统一社会信用代码 | text | "" |  |

已检查示例：

```bash
html-tools chinese/uscc-validator format-input --code-input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: validate: ✗
            请输入18位统一社会信用代码

### chinese/license-plate

车牌号归属地查询：查询车牌号归属地

来源：`html-tools/tools/chinese/license-plate.html`，SHA-256：`b188ec89e1a0d9d2dbf73056145e5f35b0d4e96d79a1d39db68161e64fbbe03c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format-input` | formatInput | plateInput |
| `run` | 按字段输入重新计算 | plateInput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--plate-input` | 如：京A12345 | text | "" |  |

已检查示例：

```bash
html-tools chinese/license-plate format-input --plate-input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: query: 原工具没有产生可输出的结果，请检查参数

### chinese/lunar-calendar

农历阳历转换：农历阳历日期互转

来源：`html-tools/tools/chinese/lunar-calendar.html`，SHA-256：`61a61422ebe8fcd0e5de563109033fd54ad2d376027cf1c861ff8a82cae2b342`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 转换 | resultLabel, resultMain, resultSub, ganzhi, zodiac, solarTerm, weekday |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--solar-year` | 公历年 | select-one | "2026" | "1900" (1900年); "1901" (1901年); "1902" (1902年); "1903" (1903年); "1904" (1904年); "1905" (1905年); "1906" (1906年); "1907" (1907年); "1908" (1908年); "1909" (1909年); "1910" (1910年); "1911" (1911年); "1912" (1912年); "1913" (1913年); "1914" (1914年); "1915" (1915年); "1916" (1916年); "1917" (1917年); "1918" (1918年); "1919" (1919年); "1920" (1920年); "1921" (1921年); "1922" (1922年); "1923" (1923年); "1924" (1924年); "1925" (1925年); "1926" (1926年); "1927" (1927年); "1928" (1928年); "1929" (1929年); "1930" (1930年); "1931" (1931年); "1932" (1932年); "1933" (1933年); "1934" (1934年); "1935" (1935年); "1936" (1936年); "1937" (1937年); "1938" (1938年); "1939" (1939年); "1940" (1940年); "1941" (1941年); "1942" (1942年); "1943" (1943年); "1944" (1944年); "1945" (1945年); "1946" (1946年); "1947" (1947年); "1948" (1948年); "1949" (1949年); "1950" (1950年); "1951" (1951年); "1952" (1952年); "1953" (1953年); "1954" (1954年); "1955" (1955年); "1956" (1956年); "1957" (1957年); "1958" (1958年); "1959" (1959年); "1960" (1960年); "1961" (1961年); "1962" (1962年); "1963" (1963年); "1964" (1964年); "1965" (1965年); "1966" (1966年); "1967" (1967年); "1968" (1968年); "1969" (1969年); "1970" (1970年); "1971" (1971年); "1972" (1972年); "1973" (1973年); "1974" (1974年); "1975" (1975年); "1976" (1976年); "1977" (1977年); "1978" (1978年); "1979" (1979年); "1980" (1980年); "1981" (1981年); "1982" (1982年); "1983" (1983年); "1984" (1984年); "1985" (1985年); "1986" (1986年); "1987" (1987年); "1988" (1988年); "1989" (1989年); "1990" (1990年); "1991" (1991年); "1992" (1992年); "1993" (1993年); "1994" (1994年); "1995" (1995年); "1996" (1996年); "1997" (1997年); "1998" (1998年); "1999" (1999年); "2000" (2000年); "2001" (2001年); "2002" (2002年); "2003" (2003年); "2004" (2004年); "2005" (2005年); "2006" (2006年); "2007" (2007年); "2008" (2008年); "2009" (2009年); "2010" (2010年); "2011" (2011年); "2012" (2012年); "2013" (2013年); "2014" (2014年); "2015" (2015年); "2016" (2016年); "2017" (2017年); "2018" (2018年); "2019" (2019年); "2020" (2020年); "2021" (2021年); "2022" (2022年); "2023" (2023年); "2024" (2024年); "2025" (2025年); "2026" (2026年); "2027" (2027年); "2028" (2028年); "2029" (2029年); "2030" (2030年); "2031" (2031年); "2032" (2032年); "2033" (2033年); "2034" (2034年); "2035" (2035年); "2036" (2036年); "2037" (2037年); "2038" (2038年); "2039" (2039年); "2040" (2040年); "2041" (2041年); "2042" (2042年); "2043" (2043年); "2044" (2044年); "2045" (2045年); "2046" (2046年); "2047" (2047年); "2048" (2048年); "2049" (2049年); "2050" (2050年); "2051" (2051年); "2052" (2052年); "2053" (2053年); "2054" (2054年); "2055" (2055年); "2056" (2056年); "2057" (2057年); "2058" (2058年); "2059" (2059年); "2060" (2060年); "2061" (2061年); "2062" (2062年); "2063" (2063年); "2064" (2064年); "2065" (2065年); "2066" (2066年); "2067" (2067年); "2068" (2068年); "2069" (2069年); "2070" (2070年); "2071" (2071年); "2072" (2072年); "2073" (2073年); "2074" (2074年); "2075" (2075年); "2076" (2076年); "2077" (2077年); "2078" (2078年); "2079" (2079年); "2080" (2080年); "2081" (2081年); "2082" (2082年); "2083" (2083年); "2084" (2084年); "2085" (2085年); "2086" (2086年); "2087" (2087年); "2088" (2088年); "2089" (2089年); "2090" (2090年); "2091" (2091年); "2092" (2092年); "2093" (2093年); "2094" (2094年); "2095" (2095年); "2096" (2096年); "2097" (2097年); "2098" (2098年); "2099" (2099年) |
| `--solar-month` | 公历月 | select-one | "10" | "1" (1月); "2" (2月); "3" (3月); "4" (4月); "5" (5月); "6" (6月); "7" (7月); "8" (8月); "9" (9月); "10" (10月); "11" (11月); "12" (12月) |
| `--solar-day` | 公历日 | select-one | "30" | "1" (1日); "2" (2日); "3" (3日); "4" (4日); "5" (5日); "6" (6日); "7" (7日); "8" (8日); "9" (9日); "10" (10日); "11" (11日); "12" (12日); "13" (13日); "14" (14日); "15" (15日); "16" (16日); "17" (17日); "18" (18日); "19" (19日); "20" (20日); "21" (21日); "22" (22日); "23" (23日); "24" (24日); "25" (25日); "26" (26日); "27" (27日); "28" (28日); "29" (29日); "30" (30日); "31" (31日) |
| `--lunar-year` | 农历年 | select-one | "2026" | "1900" (1900年); "1901" (1901年); "1902" (1902年); "1903" (1903年); "1904" (1904年); "1905" (1905年); "1906" (1906年); "1907" (1907年); "1908" (1908年); "1909" (1909年); "1910" (1910年); "1911" (1911年); "1912" (1912年); "1913" (1913年); "1914" (1914年); "1915" (1915年); "1916" (1916年); "1917" (1917年); "1918" (1918年); "1919" (1919年); "1920" (1920年); "1921" (1921年); "1922" (1922年); "1923" (1923年); "1924" (1924年); "1925" (1925年); "1926" (1926年); "1927" (1927年); "1928" (1928年); "1929" (1929年); "1930" (1930年); "1931" (1931年); "1932" (1932年); "1933" (1933年); "1934" (1934年); "1935" (1935年); "1936" (1936年); "1937" (1937年); "1938" (1938年); "1939" (1939年); "1940" (1940年); "1941" (1941年); "1942" (1942年); "1943" (1943年); "1944" (1944年); "1945" (1945年); "1946" (1946年); "1947" (1947年); "1948" (1948年); "1949" (1949年); "1950" (1950年); "1951" (1951年); "1952" (1952年); "1953" (1953年); "1954" (1954年); "1955" (1955年); "1956" (1956年); "1957" (1957年); "1958" (1958年); "1959" (1959年); "1960" (1960年); "1961" (1961年); "1962" (1962年); "1963" (1963年); "1964" (1964年); "1965" (1965年); "1966" (1966年); "1967" (1967年); "1968" (1968年); "1969" (1969年); "1970" (1970年); "1971" (1971年); "1972" (1972年); "1973" (1973年); "1974" (1974年); "1975" (1975年); "1976" (1976年); "1977" (1977年); "1978" (1978年); "1979" (1979年); "1980" (1980年); "1981" (1981年); "1982" (1982年); "1983" (1983年); "1984" (1984年); "1985" (1985年); "1986" (1986年); "1987" (1987年); "1988" (1988年); "1989" (1989年); "1990" (1990年); "1991" (1991年); "1992" (1992年); "1993" (1993年); "1994" (1994年); "1995" (1995年); "1996" (1996年); "1997" (1997年); "1998" (1998年); "1999" (1999年); "2000" (2000年); "2001" (2001年); "2002" (2002年); "2003" (2003年); "2004" (2004年); "2005" (2005年); "2006" (2006年); "2007" (2007年); "2008" (2008年); "2009" (2009年); "2010" (2010年); "2011" (2011年); "2012" (2012年); "2013" (2013年); "2014" (2014年); "2015" (2015年); "2016" (2016年); "2017" (2017年); "2018" (2018年); "2019" (2019年); "2020" (2020年); "2021" (2021年); "2022" (2022年); "2023" (2023年); "2024" (2024年); "2025" (2025年); "2026" (2026年); "2027" (2027年); "2028" (2028年); "2029" (2029年); "2030" (2030年); "2031" (2031年); "2032" (2032年); "2033" (2033年); "2034" (2034年); "2035" (2035年); "2036" (2036年); "2037" (2037年); "2038" (2038年); "2039" (2039年); "2040" (2040年); "2041" (2041年); "2042" (2042年); "2043" (2043年); "2044" (2044年); "2045" (2045年); "2046" (2046年); "2047" (2047年); "2048" (2048年); "2049" (2049年); "2050" (2050年); "2051" (2051年); "2052" (2052年); "2053" (2053年); "2054" (2054年); "2055" (2055年); "2056" (2056年); "2057" (2057年); "2058" (2058年); "2059" (2059年); "2060" (2060年); "2061" (2061年); "2062" (2062年); "2063" (2063年); "2064" (2064年); "2065" (2065年); "2066" (2066年); "2067" (2067年); "2068" (2068年); "2069" (2069年); "2070" (2070年); "2071" (2071年); "2072" (2072年); "2073" (2073年); "2074" (2074年); "2075" (2075年); "2076" (2076年); "2077" (2077年); "2078" (2078年); "2079" (2079年); "2080" (2080年); "2081" (2081年); "2082" (2082年); "2083" (2083年); "2084" (2084年); "2085" (2085年); "2086" (2086年); "2087" (2087年); "2088" (2088年); "2089" (2089年); "2090" (2090年); "2091" (2091年); "2092" (2092年); "2093" (2093年); "2094" (2094年); "2095" (2095年); "2096" (2096年); "2097" (2097年); "2098" (2098年); "2099" (2099年) |
| `--lunar-month` | 农历月 | select-one | "9" | "1" (正月); "2" (二月); "3" (三月); "4" (四月); "5" (五月); "6" (六月); "7" (七月); "8" (八月); "9" (九月); "10" (十月); "11" (冬月); "12" (腊月) |
| `--lunar-day` | 农历日 | select-one | "20" | "1" (初一); "2" (初二); "3" (初三); "4" (初四); "5" (初五); "6" (初六); "7" (初七); "8" (初八); "9" (初九); "10" (初十); "11" (十一); "12" (十二); "13" (十三); "14" (十四); "15" (十五); "16" (十六); "17" (十七); "18" (十八); "19" (十九); "20" (二十); "21" (廿一); "22" (廿二); "23" (廿三); "24" (廿四); "25" (廿五); "26" (廿六); "27" (廿七); "28" (廿八); "29" (廿九); "30" (三十) |
| `--is-leap-month` / `--no-is-leap-month` | 闰月 | checkbox | false |  |

已检查示例：

```bash
html-tools chinese/lunar-calendar convert --solar-year '2026' --solar-month '10' --solar-day '30' --lunar-year '2026' --lunar-month '9' --lunar-day '20' --no-is-leap-month --json
```

### chinese/chinese-zodiac

生肖查询工具：根据年份查询生肖

来源：`html-tools/tools/chinese/chinese-zodiac.html`，SHA-256：`83539930c6ca57ffac8a8981dd1ce20c15d8f62439014e99c1b7d40b868e1682`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `query` | 查询 | zodiacEmoji, zodiacName, ganzhi, dizhi, wuxing, yinyang, luckyNum, luckyColor, luckyFlower, traits, goodMatch, badMatch |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--year-input` | 出生年份 | number | "" | min=1900, max=2100 |

已检查示例：

```bash
html-tools chinese/chinese-zodiac query --year-input '1900' --json
```

### chinese/phone-attribution

手机号归属地查询：查询手机号归属地

来源：`html-tools/tools/chinese/phone-attribution.html`，SHA-256：`5aaa9278bd4074f32a58bd7203e61108781ce71d27e14831b9b17150e410f842`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `query` | 查询 | phoneDisplay, location, carrier, province, city, carrierText, segment, areaCode, zipCode, segmentList |
| `format-input` | formatInput | phoneInput |
| `run` | 按字段输入重新计算 | phoneInput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--phone-input` | 请输入11位手机号码 | tel | "" |  |

已检查示例：

```bash
html-tools chinese/phone-attribution query --phone-input '13800138000' --json
```

### chinese/chinese-number

中文大写数字转换：数字转中文大写金额

来源：`html-tools/tools/chinese/chinese-number.html`，SHA-256：`a2ce0c450743f1ca5b632adbb3c3de32379fdb272157ad2cff425da605cc464c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | moneyResult, simpleResult, oralResult |
| `run` | 按字段输入重新计算 | moneyResult, simpleResult, oralResult |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--number-input` | 请输入金额（支持小数点后两位） | text | "" |  |

已检查示例：

```bash
html-tools chinese/chinese-number convert --number-input 'Hello world
Hello world
TypeScript' --json
```

### chinese/ancient-poetry

古诗词查询：古典诗词查询

来源：`html-tools/tools/chinese/ancient-poetry.html`，SHA-256：`66fa053596227973f0cf5169498b060547a83f35f797a972737cc321ea623e9d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `search` | 搜索 | resultCount, resultList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools chinese/ancient-poetry search  --json
```

### chinese/stroke-order

汉字笔画顺序：查询汉字笔画顺序

来源：`html-tools/tools/chinese/stroke-order.html`，SHA-256：`9326ff21f07a209a7a1dd60491e6ae275c268051c09c3d6701cd5c6572844758`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `query` | 查询 | charDisplay, strokeCount, radical, structure, stroke-0, stroke-1, stroke-2, stroke-3, strokeNames |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--char-input` | 输入一个汉字 | text | "" |  |

已检查示例：

```bash
html-tools chinese/stroke-order query --char-input '中' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### chinese/pinyin-tone

拼音声调标注：为汉字添加拼音注音

来源：`html-tools/tools/chinese/pinyin-tone.html`，SHA-256：`3082048e81bb3da0dce9b6100bae10b067e1cc43faf8f10b1d086856fbe715c0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert-text` | 转换拼音 | resultPinyin |
| `convert-number` | 转换声调 | resultPinyin |
| `run` | 按字段输入重新计算 | resultPinyin |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-input` | 输入汉字，自动标注拼音... | textarea | "" |  |
| `--number-input` | 输入数字声调拼音，如：zhong1 guo2 | textarea | "" |  |

已检查示例：

```bash
html-tools chinese/pinyin-tone convert-text --text-input 'Hello world
Hello world
TypeScript' --number-input 'Hello world
Hello world
TypeScript' --json
```

### chinese/radicals

汉字偏旁部首查询：查询汉字偏旁部首

来源：`html-tools/tools/chinese/radicals.html`，SHA-256：`218132226541737e05b198997b77d5fbf74aec42f7af53123ee49511229edf19`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `search` | 搜索 | radicalCount, radicalGrid |
| `filter-by-strokes-all` | 全部 | radicalCount, radicalGrid |
| `filter-by-strokes-1` | 1画 | radicalCount, radicalGrid |
| `filter-by-strokes-2` | 2画 | radicalCount, radicalGrid |
| `filter-by-strokes-3` | 3画 | radicalCount, radicalGrid |
| `filter-by-strokes-4` | 4画 | radicalCount, radicalGrid |
| `filter-by-strokes-5` | 5画 | radicalCount |
| `filter-by-strokes-6+` | 6画+ | radicalCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools chinese/radicals search  --json
```

### chinese/couplet-generator

对联生成器：生成传统对联

来源：`html-tools/tools/chinese/couplet-generator.html`，SHA-256：`bc5369aedc6d19c28e742d1dbf61e2aee16a21d58d455867e36cc827c0d0e5ee`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成对联 | upperText, horizontalText, lowerText, coupletMeaning, historyList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--upper-input` | 或输入上联，自动匹配下联： | text | "" |  |

已检查示例：

```bash
html-tools chinese/couplet-generator generate --upper-input 'Hello world
Hello world
TypeScript' --json
```

## converter

### converter/angle-converter

角度单位转换器：度、弧度、梯度等角度单位互转

来源：`html-tools/tools/converter/angle-converter.html`，SHA-256：`f68909d05eaf311a99b9f40c51a3b0148345c385ac1821ba69a25e89d27183b5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | radians, gradians, turns, minutes, seconds |
| `run` | 按字段输入重新计算 | radians, gradians, turns, minutes, seconds |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--degrees` | 角度 (度) | number | "" |  |

已检查示例：

```bash
html-tools converter/angle-converter convert --degrees '10' --json
```

### converter/curl-to-code

cURL to Code：将 cURL 命令转换为多种编程语言代码

来源：`html-tools/tools/converter/curl-to-code.html`，SHA-256：`a2a9b19a2f1391024bb9f5e0ced4cef31ede78d68ec7993623fddffdc1ae85af`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert-curl` | 🔄 转换 | langLabel, codeOutput, parsedInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--curl-input` | 粘贴 cURL 命令... | textarea | "" |  |

已检查示例：

```bash
html-tools converter/curl-to-code convert-curl --curl-input 'https://example.com/path?a=1' --json
```

### converter/data-size-converter

数据存储单位转换器：Bit、Byte、KB、MB、GB 等单位互转

来源：`html-tools/tools/converter/data-size-converter.html`，SHA-256：`96e8dc8e64f5e7c0daba0adf8c6e85814884587f99be02c1aecc79bcca0c77f3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | decimal-results, binary-results, base-results |
| `run` | 按字段输入重新计算 | decimal-results, binary-results, base-results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-value` | 输入数值 | number | "1" |  |
| `--input-unit` | 输入数值 | select-one | "KB" | "b" (Bit); "B" (Byte); "KB" (KB); "MB" (MB); "GB" (GB); "TB" (TB); "PB" (PB); "KiB" (KiB); "MiB" (MiB); "GiB" (GiB); "TiB" (TiB); "PiB" (PiB) |

已检查示例：

```bash
html-tools converter/data-size-converter convert --input-value '1' --input-unit 'KB' --json
```

### converter/data-size

数据大小转换器：数据存储单位之间的转换

来源：`html-tools/tools/converter/data-size.html`，SHA-256：`34cc2f246ee1c89e92ef6febba4c6da5844c023a6e9c686ea69b2cd8edec0fe6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | decimalResults, binaryResults |
| `run` | 按字段输入重新计算 | decimalResults, binaryResults |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-value` | 输入数值 | number | "1" |  |
| `--input-unit` | 输入数值 | select-one | "KB" | "b" (比特 (bit)); "B" (字节 (Byte)); "KB" (千字节 (KB)); "MB" (兆字节 (MB)); "GB" (吉字节 (GB)); "TB" (太字节 (TB)); "PB" (拍字节 (PB)); "KiB" (KiB (1024)); "MiB" (MiB (1024²)); "GiB" (GiB (1024³)); "TiB" (TiB (1024⁴)); "PiB" (PiB (1024⁵)) |

已检查示例：

```bash
html-tools converter/data-size convert --input-value '1' --input-unit 'KB' --json
```

### converter/data-url-converter

Data URL 转换器：文件与 Data URL/Base64 互转，支持多种输出格式

来源：`html-tools/tools/converter/data-url-converter.html`，SHA-256：`61b3b4022e36a92a4c7b80fbe57c365fdb16c3108edafbbf75c45044e47f3d1f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-as-file` | 下载为文件 | download |
| `update-output` | updateOutput | encodedSize, encodeOutput |
| `run` | 按字段输入重新计算 | fileName, fileSize, mimeType, encodedSize, previewArea, encodeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--output-format` | 输出格式： Data URL 纯 Base64 CSS background-image HTML img 标签 Markdown 图片 | select-one | "dataurl" | "dataurl" (Data URL); "base64" (纯 Base64); "css" (CSS background-image); "html-img" (HTML img 标签); "markdown" (Markdown 图片) |
| `--wrap-lines` / `--no-wrap-lines` | 自动换行（每 76 字符） | checkbox | true |  |
| `--decode-input` | 粘贴 Data URL 或 Base64 编码... | textarea | "" |  |
| `--decode-mime` | 指定 MIME 类型（可选）： 自动检测 image/png image/jpeg image/gif image/svg+xml image/webp application/pdf text/plain text/html text/css application/json | select-one | "" | "" (自动检测); "image/png" (image/png); "image/jpeg" (image/jpeg); "image/gif" (image/gif); "image/svg+xml" (image/svg+xml); "image/webp" (image/webp); "application/pdf" (application/pdf); "text/plain" (text/plain); "text/html" (text/html); "text/css" (text/css); "application/json" (application/json) |

已检查示例：

```bash
html-tools converter/data-url-converter export-as-file --file-input 'generated/fixtures/sample.txt' --output-format 'dataurl' --wrap-lines --decode-input 'Hello world
Hello world
TypeScript' --decode-mime 'image/png' --json
```

操作限制：部分原页面操作未通过迁移检查: decode-data-url: Unsupported image type | export-decoded: 原工具没有产生可输出的结果，请检查参数

### converter/file-size

文件大小计算器：文件大小单位转换

来源：`html-tools/tools/converter/file-size.html`，SHA-256：`5c16bb200c9f9488c7437868adc3453d142ef665aeaea428ece02efdfc348d0a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | resultsGrid |
| `run` | 按字段输入重新计算 | resultsGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-value` | 大小 | number | "1" |  |
| `--input-unit` | 单位 | select-one | "KB" | "B" (字节 (B)); "KB" (千字节 (KB)); "MB" (兆字节 (MB)); "GB" (吉字节 (GB)); "TB" (太字节 (TB)); "KiB" (二进制千字节 (KiB)); "MiB" (二进制兆字节 (MiB)); "GiB" (二进制吉字节 (GiB)); "TiB" (二进制太字节 (TiB)) |
| `--conversion-type` | 转换类型 | select-one | "decimal" | "all" (所有单位); "decimal" (十进制单位); "binary" (二进制单位) |

已检查示例：

```bash
html-tools converter/file-size calculate --input-value '1' --input-unit 'KB' --conversion-type 'decimal' --json
```

### converter/html-to-markdown

HTML 转 Markdown：将 HTML 代码转换为 Markdown 格式

来源：`html-tools/tools/converter/html-to-markdown.html`，SHA-256：`5134397e5876d341ece155e94f7d243a5a21e23944ed5e40d352bd14413df22b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 转换 | mdOutput, stats, preview |
| `format-html` | 格式化 | htmlInput |
| `run` | 按字段输入重新计算 | mdOutput, stats, preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--opt-gfm` / `--no-opt-gfm` | GFM 表格 | checkbox | true |  |
| `--opt-code-block` / `--no-opt-code-block` | 围栏代码块 | checkbox | true |  |
| `--opt-strikethrough` / `--no-opt-strikethrough` | 删除线 | checkbox | true |  |
| `--html-input` | 输入 HTML 代码... | textarea | "<h2>标题一</h2>\n<h2>标题二</h2>\n<p>这是一个<strong>加粗</strong>和<em>斜体</em>的段落。</p>\n<p>这里有一个<a href=\"https://example.com\">链接</a>。</p>\n<ul>\n    <li>列表项 1</li>\n    <li>列表项 2</li>\n    <li>列表项 3</li>\n</ul>\n<ol>\n    <li>有序项 1</li>\n    <li>有序项 2</li>\n</ol>\n<blockquote>这是一段引用文字。</blockquote>" |  |

已检查示例：

```bash
html-tools converter/html-to-markdown convert --opt-gfm --opt-code-block --opt-strikethrough --html-input '<h2>标题一</h2>
<h2>标题二</h2>
<p>这是一个<strong>加粗</strong>和<em>斜体</em>的段落。</p>
<p>这里有一个<a href="https://example.com">链接</a>。</p>
<ul>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
</ul>
<ol>
    <li>有序项 1</li>
    <li>有序项 2</li>
</ol>
<blockquote>这是一段引用文字。</blockquote>' --json
```

### converter/json-yaml

JSON ⇄ YAML 转换：JSON 和 YAML 双向转换，支持格式化和压缩

来源：`html-tools/tools/converter/json-yaml.html`，SHA-256：`543b5d52df55192edd901f83a24c9cb712b3bb3267d44a1cc986ec71c1c75ae8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format-json` | 格式化 | jsonInput, jsonStats, jsonValid |
| `minify-json` | 压缩 | jsonInput, jsonStats, jsonValid |
| `json-to-yaml` | → | yamlInput, yamlStats, yamlValid |
| `yaml-to-json` | ← | jsonInput, jsonStats, jsonValid |
| `run` | 按字段输入重新计算 | jsonStats, jsonValid, yamlStats, yamlValid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--indent-size` | 缩进空格: | number | "2" | min=1, max=8 |
| `--quote-style` | YAML 引号样式: | select-one | "minimal" | "minimal" (最少引号); "single" (单引号); "double" (双引号) |
| `--sort-keys` / `--no-sort-keys` | 按键名排序 | checkbox | false |  |
| `--json-input` | 在此输入或粘贴 JSON... | textarea | "{\n  \"server\": {\n    \"host\": \"0.0.0.0\",\n    \"port\": 8080,\n    \"ssl\": {\n      \"enabled\": true,\n      \"cert\": \"/path/to/cert.pem\",\n      \"key\": \"/path/to/key.pem\"\n    }\n  },\n  \"logging\": {\n    \"level\": \"info\",\n    \"format\": \"json\",\n    \"outputs\": [\n      \"stdout\",\n      \"file\"\n    ]\n  },\n  \"features\": {\n    \"authentication\": true,\n    \"rateLimit\": {\n      \"enabled\": true,\n      \"maxRequests\": 100,\n      \"windowMs\": 60000\n    }\n  }\n}" |  |
| `--yaml-input` | 在此输入或粘贴 YAML... | textarea | "server:\n  host: 0.0.0.0\n  port: 8080\n  ssl:\n    enabled: true\n    cert: /path/to/cert.pem\n    key: /path/to/key.pem\nlogging:\n  level: info\n  format: json\n  outputs:\n    - stdout\n    - file\nfeatures:\n  authentication: true\n  rateLimit:\n    enabled: true\n    maxRequests: 100\n    windowMs: 60000\n" |  |

已检查示例：

```bash
html-tools converter/json-yaml format-json --indent-size '2' --quote-style 'minimal' --no-sort-keys --json-input '{
  "server": {
    "host": "0.0.0.0",
    "port": 8080,
    "ssl": {
      "enabled": true,
      "cert": "/path/to/cert.pem",
      "key": "/path/to/key.pem"
    }
  },
  "logging": {
    "level": "info",
    "format": "json",
    "outputs": [
      "stdout",
      "file"
    ]
  },
  "features": {
    "authentication": true,
    "rateLimit": {
      "enabled": true,
      "maxRequests": 100,
      "windowMs": 60000
    }
  }
}' --yaml-input 'server:
  host: 0.0.0.0
  port: 8080
  ssl:
    enabled: true
    cert: /path/to/cert.pem
    key: /path/to/key.pem
logging:
  level: info
  format: json
  outputs:
    - stdout
    - file
features:
  authentication: true
  rateLimit:
    enabled: true
    maxRequests: 100
    windowMs: 60000
' --json
```

### converter/number-words

数字转大写：数字转大写，在线使用，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/number-words.html`，SHA-256：`ff652213df8d1f0a4993c64f826c05ac1faf9fef29d9672e8403bf2bd965cb8e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 转换 | resultValue, formatThousands, formatAccounting, formatChineseSmall |
| `run` | 按字段输入重新计算 | resultValue, formatThousands, formatAccounting, formatChineseSmall |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--number-input` | 输入金额数字 | text | "" |  |
| `--opt-currency` / `--no-opt-currency` | 添加货币单位（元） | checkbox | true |  |
| `--opt-zheng` / `--no-opt-zheng` | 整数添加"整" | checkbox | true |  |
| `--opt-prefix` / `--no-opt-prefix` | 添加人民币前缀 | checkbox | true |  |
| `--opt-negative` / `--no-opt-negative` | 支持负数 | checkbox | false |  |

已检查示例：

```bash
html-tools converter/number-words convert --number-input '1234.56' --opt-currency --opt-zheng --opt-prefix --no-opt-negative --json
```

### converter/pressure-converter

压力单位转换器：帕斯卡、巴、大气压、PSI 等压力单位互转

来源：`html-tools/tools/converter/pressure-converter.html`，SHA-256：`490dc5c7748eaf60c0982330656b704eccb7c9e1f27056a77334d96b6de53bf0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | results |
| `run` | 按字段输入重新计算 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--value` | 输入数值 | number | "1" | min=0 |
| `--unit` | 选择单位 | select-one | "atm" | "pa" (帕斯卡 (Pa)); "kpa" (千帕 (kPa)); "mpa" (兆帕 (MPa)); "bar" (巴 (bar)); "atm" (标准大气压 (atm)); "psi" (磅/平方英寸 (psi)); "mmhg" (毫米汞柱 (mmHg)); "torr" (托 (Torr)) |

已检查示例：

```bash
html-tools converter/pressure-converter convert --value '1' --unit 'atm' --json
```

### converter/unit-converter

单位转换器：长度、重量、温度、面积等多种单位换算

来源：`html-tools/tools/converter/unit-converter.html`，SHA-256：`47b202fb85405440dafb5f9746bb00783244d307c88ddf6def56d9b93c2809b1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 转换 | resultValue, resultUnit |
| `run` | 按字段输入重新计算 | resultValue, resultUnit |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-value` | 输入值 | number | "1" |  |
| `--from-unit` | 从 | select-one | "m" | "m" (米 (m)); "km" (千米 (km)); "cm" (厘米 (cm)); "mm" (毫米 (mm)); "mile" (英里 (mi)); "yard" (码 (yd)); "foot" (英尺 (ft)); "inch" (英寸 (in)) |
| `--to-unit` | 到 | select-one | "km" | "m" (米 (m)); "km" (千米 (km)); "cm" (厘米 (cm)); "mm" (毫米 (mm)); "mile" (英里 (mi)); "yard" (码 (yd)); "foot" (英尺 (ft)); "inch" (英寸 (in)) |

已检查示例：

```bash
html-tools converter/unit-converter convert --input-value '1' --from-unit 'm' --to-unit 'km' --json
```

### converter/area

面积单位转换器：面积单位转换器，多格式互转，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/area.html`，SHA-256：`c00fbcd957571aa4d8f82950430b1da1c725f0f53eda36fb3708d6138a28fdc1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | metricResults, imperialResults, chineseResults |
| `run` | 按字段输入重新计算 | metricResults, imperialResults, chineseResults |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-value` | 请输入数字输入框 | number | "1" |  |
| `--input-unit` | inputUnit | select-one | "m2" | "m2" (平方米 (m²)); "km2" (平方千米 (km²)); "cm2" (平方厘米 (cm²)); "mm2" (平方毫米 (mm²)); "ha" (公顷 (ha)); "are" (公亩 (are)); "sqft" (平方英尺 (sq ft)); "sqyd" (平方码 (sq yd)); "sqmi" (平方英里 (sq mi)); "acre" (英亩 (acre)); "sqin" (平方英寸 (sq in)); "mu" (亩); "qing" (顷); "fen" (分) |

已检查示例：

```bash
html-tools converter/area convert --input-value '1' --input-unit 'm2' --json
```

### converter/length

长度单位转换器：长度单位转换器，多格式互转，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/length.html`，SHA-256：`8aee63098b9c036f5d14042fa3e95e1185851683aaea3c9180254c39a4e0e2bf`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | metricResults, imperialResults, astroResults, chineseResults |
| `run` | 按字段输入重新计算 | metricResults, imperialResults, astroResults, chineseResults |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-value` | 请输入数字输入框 | number | "1" |  |
| `--input-unit` | inputUnit | select-one | "m" | "m" (米 (m)); "km" (千米 (km)); "cm" (厘米 (cm)); "mm" (毫米 (mm)); "um" (微米 (μm)); "nm" (纳米 (nm)); "mi" (英里 (mi)); "yd" (码 (yd)); "ft" (英尺 (ft)); "in" (英寸 (in)); "nmi" (海里 (nmi)); "ly" (光年 (ly)); "au" (天文单位 (AU)); "li" (里); "zhang" (丈); "chi" (尺); "cun" (寸) |

已检查示例：

```bash
html-tools converter/length convert --input-value '1' --input-unit 'm' --json
```

### converter/number-base

任意进制转换器：任意进制转换器，多格式互转，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/number-base.html`，SHA-256：`fb61086c1e8285c212f64a82e20e504dd28e9ee3e7eda63d02949c51cce28ec3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | outputValue, resultValue, allBases |
| `run` | 按字段输入重新计算 | outputValue, resultValue, allBases |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-value` | 输入数值 | text | "255" |  |
| `--from-base` | 源进制 (2-36) | select-one | "10" | "2" (2 (二进制)); "8" (8 (八进制)); "10" (10 (十进制)); "16" (16 (十六进制)); "36" (36 (三十六进制)) |
| `--to-base` | 目标进制 (2-36) | select-one | "16" | "2" (2 (二进制)); "8" (8 (八进制)); "10" (10 (十进制)); "16" (16 (十六进制)); "36" (36 (三十六进制)) |

已检查示例：

```bash
html-tools converter/number-base convert --input-value '255' --from-base '10' --to-base '16' --json
```

### converter/speed

速度单位转换器：速度单位转换器，多格式互转，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/speed.html`，SHA-256：`290ce1b2e9d847344b4c65a79a9f8083a4d35eae577323989140d121a6469359`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | results, comparisons |
| `run` | 按字段输入重新计算 | results, comparisons |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-value` | 请输入数字输入框 | number | "100" |  |
| `--input-unit` | inputUnit | select-one | "kmh" | "kmh" (千米/时 (km/h)); "ms" (米/秒 (m/s)); "mph" (英里/时 (mph)); "knot" (节 (knot)); "mach" (马赫 (Mach)); "fps" (英尺/秒 (ft/s)); "c" (光速 (c)) |

已检查示例：

```bash
html-tools converter/speed convert --input-value '100' --input-unit 'kmh' --json
```

### converter/temperature

温度转换器：温度转换器，多格式互转，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/temperature.html`，SHA-256：`89063b8f27ef877ee930e87df22e863c1bb3ad8fd9eb60952b86f14325d0b2b1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | tempLabel, celsius, fahrenheit, kelvin |
| `run` | 按字段输入重新计算 | tempLabel, celsius, fahrenheit, kelvin |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-value` | 请输入数字输入框 | number | "25" |  |
| `--input-unit` | inputUnit | select-one | "C" | "C" (°C 摄氏); "F" (°F 华氏); "K" (K 开尔文) |

已检查示例：

```bash
html-tools converter/temperature convert --input-value '25' --input-unit 'C' --json
```

### converter/time

时间单位转换器：时间单位转换器，多格式互转，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/time.html`，SHA-256：`4c94490753ceed864e000e0957d7bd42a8ad5314e52d97ca95b4e8daceb4e8f6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | results, breakdown |
| `run` | 按字段输入重新计算 | results, breakdown |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-value` | 请输入数字输入框 | number | "1" |  |
| `--input-unit` | inputUnit | select-one | "h" | "ms" (毫秒 (ms)); "s" (秒 (s)); "min" (分钟 (min)); "h" (小时 (h)); "d" (天 (day)); "w" (周 (week)); "mo" (月 (30天)); "y" (年 (365天)); "us" (微秒 (μs)); "ns" (纳秒 (ns)) |

已检查示例：

```bash
html-tools converter/time convert --input-value '1' --input-unit 'h' --json
```

### converter/volume

体积容量转换器：体积容量转换器，多格式互转，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/volume.html`，SHA-256：`fcc6ebc0d64cec8b7cfbd377ffe0b60d155403f259f762fa951d2a9b8c9a64aa`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | metricResults, imperialResults, cookingResults |
| `run` | 按字段输入重新计算 | metricResults, imperialResults, cookingResults |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-value` | 请输入数字输入框 | number | "1" |  |
| `--input-unit` | inputUnit | select-one | "l" | "l" (升 (L)); "ml" (毫升 (mL)); "m3" (立方米 (m³)); "cm3" (立方厘米 (cm³)); "mm3" (立方毫米 (mm³)); "gal" (美制加仑); "galuk" (英制加仑); "qt" (夸脱 (qt)); "pt" (品脱 (pt)); "cup" (杯 (cup)); "floz" (液盎司 (fl oz)); "tbsp" (汤匙 (tbsp)); "tsp" (茶匙 (tsp)); "cuft" (立方英尺); "cuin" (立方英寸) |

已检查示例：

```bash
html-tools converter/volume convert --input-value '1' --input-unit 'l' --json
```

### converter/weight

重量单位转换器：重量单位转换器，多格式互转，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/weight.html`，SHA-256：`6ff99659e201abd7363b23b94f51f631eadb4b6f0aaae3e1f658baccc1cc8452`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | metricResults, imperialResults, chineseResults |
| `run` | 按字段输入重新计算 | metricResults, imperialResults, chineseResults |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-value` | 请输入数字输入框 | number | "1" |  |
| `--input-unit` | inputUnit | select-one | "kg" | "kg" (千克 (kg)); "g" (克 (g)); "mg" (毫克 (mg)); "t" (吨 (t)); "lb" (磅 (lb)); "oz" (盎司 (oz)); "st" (英石 (st)); "gr" (格令 (gr)); "ct" (克拉 (ct)); "jin" (斤); "liang" (两); "qian" (钱); "dan" (担) |

已检查示例：

```bash
html-tools converter/weight convert --input-value '1' --input-unit 'kg' --json
```

### converter/binary-translator

二进制翻译器：文本与二进制、十进制、十六进制、八进制互转

来源：`html-tools/tools/converter/binary-translator.html`，SHA-256：`699098bd0f850e868df724c6283ae0d73e81b20cf7618fcbaac6fdb9bab25b0c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | textInput, binaryInput, decimalInput, hexInput, octalInput, charDisplay |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-input` | 输入文本... | textarea | "" |  |
| `--binary-input` | 01001000 01100101 01101100 01101100 01101111 | textarea | "" |  |
| `--decimal-input` | 72 101 108 108 111 | textarea | "" |  |
| `--hex-input` | 48 65 6C 6C 6F | textarea | "" |  |
| `--octal-input` | 110 145 154 154 157 | textarea | "" |  |

已检查示例：

```bash
html-tools converter/binary-translator run --text-input 'Hello world
Hello world
TypeScript' --binary-input 'Hello world
Hello world
TypeScript' --decimal-input 'Hello world
Hello world
TypeScript' --hex-input 'Hello world
Hello world
TypeScript' --octal-input 'Hello world
Hello world
TypeScript' --json
```

### converter/number-base-converter

数字进制转换器：数字进制转换

来源：`html-tools/tools/converter/number-base-converter.html`，SHA-256：`37d62ea61da83c28227a9fb15c9c4fc72e526e6566d39cf30bcf37a9daf2ef8d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | results |
| `run` | 按字段输入重新计算 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入数值 | text | "255" |  |
| `--from-base` | 输入进制 | select-one | "10" | "2" (二进制); "8" (八进制); "10" (十进制); "16" (十六进制) |

已检查示例：

```bash
html-tools converter/number-base-converter convert --input '255' --from-base '10' --json
```

### converter/color-converter

颜色格式转换器：颜色格式转换

来源：`html-tools/tools/converter/color-converter.html`，SHA-256：`aba340df3254d4727ce8e7b807fcb60793bbb2550ff4a8e5da5283aa421bb2c1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | picker, hex, rgb, hsl |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--picker` | 颜色选择器 | color | "#667eea" |  |
| `--hex` | HEX | text | "#667eea" |  |
| `--rgb` | RGB | text | "rgb(102, 126, 234)" |  |
| `--hsl` | HSL | text | "hsl(229, 76%, 66%)" |  |

已检查示例：

```bash
html-tools converter/color-converter run --picker '#667eea' --hex '#667eea' --rgb 'rgb(102, 126, 234)' --hsl 'hsl(229, 76%, 66%)' --json
```

### converter/unix-timestamp

Unix 时间戳转换器：Unix时间戳转换

来源：`html-tools/tools/converter/unix-timestamp.html`，SHA-256：`68909067ba8b8f5e616d6a8a8562cd3837a0e80fdfd2b6a9284fb0aaee7c8264`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-current` | updateCurrent | currentTs |
| `ts-to-date` | tsToDate | dateResult |
| `date-to-ts` | dateToTs | tsResult |
| `run` | 按字段输入重新计算 | dateResult, tsResult |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--ts-input` | 时间戳转日期 | number | "" |  |
| `--date-input` | 日期转时间戳 | datetime-local | "" |  |

已检查示例：

```bash
html-tools converter/unix-timestamp update-current --ts-input '10' --date-input '2025-01-01T12:00' --json
```

### converter/temperature-converter

温度转换：温度单位转换

来源：`html-tools/tools/converter/temperature-converter.html`，SHA-256：`39946a2b7333ebfa7dfe6e7ed6bb9c544a84c9dced9360b99ab47380af0a5b17`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | fahrenheit, kelvin, rankine |
| `run` | 按字段输入重新计算 | fahrenheit, kelvin, rankine |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--celsius` | 摄氏度 (°C) | number | "" |  |

已检查示例：

```bash
html-tools converter/temperature-converter convert --celsius '10' --json
```

### converter/speed-converter

速度转换：速度单位转换

来源：`html-tools/tools/converter/speed-converter.html`，SHA-256：`e9dd5f979efa8b2cc80150598463764b0c028518010b985c18a696b43eb4cdc2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | ms, mph, knot, mach |
| `run` | 按字段输入重新计算 | ms, mph, knot, mach |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--kmh` | 公里/小时 (km/h) | number | "" |  |

已检查示例：

```bash
html-tools converter/speed-converter convert --kmh '10' --json
```

### converter/area-converter

Area Converter：Area Converter，在线使用，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/area-converter.html`，SHA-256：`3394a45e9bd3685c164b0b6c87fb1e1f2702e535b4bf45f5bd429ab4c7024ecd`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | metricResults, imperialResults, chineseResults |
| `run` | 按字段输入重新计算 | metricResults, imperialResults, chineseResults |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--value-input` | 请输入数字输入框 | number | "1" |  |
| `--unit-select` | unitSelect | select-one | "sqm" | "sqkm" (平方千米 (km²)); "ha" (公顷 (ha)); "sqm" (平方米 (m²)); "sqcm" (平方厘米 (cm²)); "sqmi" (平方英里 (mi²)); "acre" (英亩 (acre)); "sqft" (平方英尺 (ft²)); "sqin" (平方英寸 (in²)); "mu" (亩); "qing" (顷); "fen" (分) |

已检查示例：

```bash
html-tools converter/area-converter convert --value-input '1' --unit-select 'sqm' --json
```

### converter/currency-converter

Currency Converter：Currency Converter，在线使用，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/currency-converter.html`，SHA-256：`cc34e6850efcb1184b26f9f7216c0f7c303f8c3a3945021616ed9c30296f65bb`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | toAmount, rateInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--from-amount` | fromAmount | number | "100" |  |
| `--field-2` | 搜索货币... | search | "" |  |
| `--field-3` | 搜索货币... | search | "" |  |

已检查示例：

```bash
html-tools converter/currency-converter run --from-amount '100' --field-2 'Hello world
Hello world
TypeScript' --field-3 'Hello world
Hello world
TypeScript' --json
```

### converter/data-storage-converter

Data Storage Converter：Data Storage Converter，在线使用，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/data-storage-converter.html`，SHA-256：`839704a50c6b5b52848b2308cde7b84acb1e1a15f2ff85ac53cdb55a47bca0ba`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | results |
| `run` | 按字段输入重新计算 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--value` | 输入数值 | number | "1" | min=0 |
| `--unit` | 选择单位 | select-one | "byte" | "bit" (比特 (bit)); "byte" (字节 (Byte)); "kb" (千字节 (KB)); "mb" (兆字节 (MB)); "gb" (吉字节 (GB)); "tb" (太字节 (TB)); "pb" (拍字节 (PB)); "kib" (KiB (1024字节)); "mib" (MiB (1024 KiB)); "gib" (GiB (1024 MiB)); "tib" (TiB (1024 GiB)) |

已检查示例：

```bash
html-tools converter/data-storage-converter convert --value '1' --unit 'byte' --json
```

### converter/energy-converter

Energy Converter：Energy Converter，在线使用，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/energy-converter.html`，SHA-256：`f2d1603ebcefae1dc976e7dc7d302ca1b130c078dda0480f1d23ed264e2d0495`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | results |
| `run` | 按字段输入重新计算 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--value` | 输入数值 | number | "1" | min=0 |
| `--unit` | 选择单位 | select-one | "j" | "j" (焦耳 (J)); "kj" (千焦 (kJ)); "cal" (卡路里 (cal)); "kcal" (千卡 (kcal)); "wh" (瓦时 (Wh)); "kwh" (千瓦时 (kWh)); "ev" (电子伏特 (eV)); "btu" (英热单位 (BTU)) |

已检查示例：

```bash
html-tools converter/energy-converter convert --value '1' --unit 'j' --json
```

### converter/frequency-converter

Frequency Converter：Frequency Converter，在线使用，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/frequency-converter.html`，SHA-256：`4f93cdb6a22ec2f96ecf26fe184f5fa388ec24ccc72e1bd07101a984052ca626`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | results |
| `run` | 按字段输入重新计算 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--value` | 输入数值 | number | "1000" | min=0 |
| `--unit` | 选择单位 | select-one | "hz" | "hz" (赫兹 (Hz)); "khz" (千赫兹 (kHz)); "mhz" (兆赫兹 (MHz)); "ghz" (吉赫兹 (GHz)); "rpm" (转/分钟 (RPM)); "rads" (弧度/秒); "bpm" (次/分钟 (BPM)) |

已检查示例：

```bash
html-tools converter/frequency-converter convert --value '1000' --unit 'hz' --json
```

### converter/length-converter

Length Converter：Length Converter，在线使用，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/length-converter.html`，SHA-256：`3794e56ebf17ec9147f452963f47e59b520caf0fffddc226459a6d849711459e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | metricResults, imperialResults, chineseResults |
| `run` | 按字段输入重新计算 | metricResults, imperialResults, chineseResults |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--value-input` | 请输入数字输入框 | number | "1" |  |
| `--unit-select` | unitSelect | select-one | "m" | "m" (米 (m)); "km" (千米 (km)); "cm" (厘米 (cm)); "mm" (毫米 (mm)); "ft" (英尺 (ft)); "in" (英寸 (in)); "yd" (码 (yd)); "mi" (英里 (mi)); "li" (里); "zhang" (丈); "chi" (尺); "cun" (寸) |

已检查示例：

```bash
html-tools converter/length-converter convert --value-input '1' --unit-select 'm' --json
```

### converter/power-converter

Power Converter：Power Converter，在线使用，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/power-converter.html`，SHA-256：`f157512237a4e806a0faa1446c76805368bd29e0ab6b93ef5dd55f5155a4d325`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | results |
| `run` | 按字段输入重新计算 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--value` | 输入数值 | number | "1" | min=0 |
| `--unit` | 选择单位 | select-one | "w" | "w" (瓦特 (W)); "kw" (千瓦 (kW)); "mw" (兆瓦 (MW)); "hp" (马力 (hp)); "ps" (公制马力 (PS)); "ftlbs" (英尺·磅力/秒); "btuhr" (BTU/小时); "cals" (卡路里/秒) |

已检查示例：

```bash
html-tools converter/power-converter convert --value '1' --unit 'w' --json
```

### converter/time-converter

Time Converter：Time Converter，在线使用，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/time-converter.html`，SHA-256：`89490ffff5ee68119a444437c68c6f664346ba08281f4015bd0589bbfc0ea89c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | results |
| `run` | 按字段输入重新计算 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--value` | 输入数值 | number | "1" | min=0 |
| `--unit` | 选择单位 | select-one | "s" | "ms" (毫秒); "s" (秒); "min" (分钟); "h" (小时); "d" (天); "w" (周); "m" (月 (30天)); "y" (年 (365天)) |

已检查示例：

```bash
html-tools converter/time-converter convert --value '1' --unit 's' --json
```

### converter/volume-converter

Volume Converter：Volume Converter，在线使用，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/volume-converter.html`，SHA-256：`5b74aae53f461bf14eb95f0404879a65f5d72615c3b6f962aa2e3ef62cc0bd35`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | results |
| `run` | 按字段输入重新计算 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--value` | 输入数值 | number | "1" | min=0 |
| `--unit` | 选择单位 | select-one | "l" | "ml" (毫升 (mL)); "l" (升 (L)); "cm3" (立方厘米 (cm³)); "m3" (立方米 (m³)); "gal" (加仑 (美制)); "qt" (夸脱 (美制)); "pt" (品脱 (美制)); "cup" (杯 (美制)); "floz" (液量盎司 (美制)); "tbsp" (汤匙); "tsp" (茶匙) |

已检查示例：

```bash
html-tools converter/volume-converter convert --value '1' --unit 'l' --json
```

### converter/weight-converter

Weight Converter：Weight Converter，在线使用，转换器，浏览器本地运行无需上传

来源：`html-tools/tools/converter/weight-converter.html`，SHA-256：`9576491df8a3e31e2b37140540b755069e2759160e9ddd059f68b215b75edbb4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | metricResults, imperialResults, chineseResults |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--value-input` | 0 | number | "1" |  |
| `--unit-select` | unitSelect | select-one | "kg" | "kg" (千克 kg); "g" (克 g); "mg" (毫克 mg); "t" (吨 t); "lb" (磅 lb); "oz" (盎司 oz); "jin" (斤); "liang" (两); "qian" (钱) |

已检查示例：

```bash
html-tools converter/weight-converter run --value-input '1' --unit-select 'kg' --json
```

### converter/phone-number-formatter

国际电话号码格式化器：输入任意格式的电话号码，自动识别国家并转换为 E.164、国际格式、本地格式，支持批量处理。

来源：`html-tools/tools/converter/phone-number-formatter.html`，SHA-256：`7f61467bd4ba72b19fc3b1e15a6b65864f2ae47294a4f5f474fc9ac0a0e3362a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format` | 格式化 | countryFlag, countryName, resultCards |
| `format-single` | formatSingle | countryFlag, countryName, resultCards |
| `format-batch` | formatBatch | batchOutput, statTotal, statValid, statInvalid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--default-country` | defaultCountry | select-one | "CN" | "CN" (🇨🇳 中国 (+86)); "US" (🇺🇸 美国 (+1)); "GB" (🇬🇧 英国 (+44)); "JP" (🇯🇵 日本 (+81)); "KR" (🇰🇷 韩国 (+82)); "DE" (🇩🇪 德国 (+49)); "FR" (🇫🇷 法国 (+33)); "AU" (🇦🇺 澳大利亚 (+61)); "CA" (🇨🇦 加拿大 (+1)); "IN" (🇮🇳 印度 (+91)); "BR" (🇧🇷 巴西 (+55)); "RU" (🇷🇺 俄罗斯 (+7)); "SG" (🇸🇬 新加坡 (+65)); "HK" (🇭🇰 香港 (+852)); "TW" (🇹🇼 台湾 (+886)) |
| `--single-input` | 输入电话号码，如 +86 138 0013 8000 或 13800138000 | text | "" |  |
| `--batch-input` | +1 (415) 555-2671 +86 139 0013 9000 020 7946 0958 0810-123456 | textarea | "" |  |

已检查示例：

```bash
html-tools converter/phone-number-formatter format --default-country 'CN' --single-input '13800138000' --batch-input '13800138000' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

## crypto

### crypto/profit-loss

持仓盈亏计算器：计算加密货币持仓盈亏

来源：`html-tools/tools/crypto/profit-loss.html`，SHA-256：`78beabfc4cc483a041757aefe1b8a3ade0912c784610647dbeb57cbd6a048d3f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算盈亏 | profitLoss, profitPct, buyCost, buyFee, sellRevenue, sellFee, totalFee, netReturn |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--buy-price` | 买入价格 (USDT) | number | "30000" | min=0 |
| `--buy-amount` | 买入数量 | number | "0.1" | min=0 |
| `--buy-fee-rate` | 买入手续费率 (%) | number | "0.1" | min=0 |
| `--sell-price` | 卖出/当前价格 (USDT) | number | "35000" | min=0 |
| `--sell-fee-rate` | 卖出手续费率 (%) | number | "0.1" | min=0 |

已检查示例：

```bash
html-tools crypto/profit-loss calculate --buy-price '30000' --buy-amount '0.1' --buy-fee-rate '0.1' --sell-price '35000' --sell-fee-rate '0.1' --json
```

### crypto/dca

定投收益计算器：计算定投策略收益

来源：`html-tools/tools/crypto/dca.html`，SHA-256：`b031b6ce4592f61eb193466f556ce11aacca03ba8f6a396ccc06d06a4b713d9b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算收益 | currentValue, totalInvested, totalFees, totalCoins, avgCost, profitLoss, returnRate, lumpSumReturn, dcaVsLump |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--invest-amount` | 每期投入金额 (USDT) | number | "100" | min=0 |
| `--frequency` | 定投频率 | select-one | "weekly" | "daily" (每日); "weekly" (每周); "biweekly" (每两周); "monthly" (每月) |
| `--periods` | 定投期数 | number | "52" | min=1 |
| `--fee-rate` | 手续费率 (%) | number | "0.1" | min=0 |
| `--start-price` | 起始价格 (USDT) | number | "30000" | min=0 |
| `--end-price` | 当前/结束价格 (USDT) | number | "40000" | min=0 |
| `--price-mode` | 价格波动模式 | select-one | "random" | "linear" (线性增长); "random" (随机波动); "volatile" (高波动) |

已检查示例：

```bash
html-tools crypto/dca calculate --invest-amount '100' --frequency 'weekly' --periods '52' --fee-rate '0.1' --start-price '30000' --end-price '40000' --price-mode 'random' --json
```

### crypto/leverage

杠杆计算器：计算杠杆交易收益和风险

来源：`html-tools/tools/crypto/leverage.html`，SHA-256：`839a1f02c02ba50e864b63c46ba2f65c814be56b2d32f87fb4394889c66ebe80`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算盈亏 | positionValue, positionSize, priceChange, pnl, returnRate, liquidationPrice, riskWarning |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--margin` | 保证金 (USDT) | number | "1000" | min=0 |
| `--entry-price` | 开仓价格 (USDT) | number | "30000" | min=0 |
| `--direction` | 方向 | select-one | "long" | "long" (做多 (Long)); "short" (做空 (Short)) |
| `--target-price` | 目标价格 (USDT) | number | "33000" | min=0 |

已检查示例：

```bash
html-tools crypto/leverage calculate --margin '1000' --entry-price '30000' --direction 'long' --target-price '33000' --json
```

### crypto/liquidation

爆仓价格计算器：计算合约爆仓价格

来源：`html-tools/tools/crypto/liquidation.html`，SHA-256：`b925e74205e310d91587c974203738583bcbeeddc4f017b2ea176b8659c69a9b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算爆仓价 | liquidationPrice, positionValue, distanceToLiq, maxLoss, effectiveLeverage, labelLiq, stopLoss10, stopLoss20, stopLoss50 |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--margin` | 保证金 (USDT) | number | "1000" | min=0 |
| `--entry-price` | 开仓价格 (USDT) | number | "30000" | min=0 |
| `--leverage` | 杠杆倍数 | number | "10" | min=1, max=125 |
| `--direction` | 方向 | select-one | "long" | "long" (做多 (Long)); "short" (做空 (Short)) |
| `--maintenance-rate` | 维持保证金率 (%) | number | "0.5" | min=0 |
| `--mode` | 模式 | select-one | "isolated" | "isolated" (逐仓); "cross" (全仓) |

已检查示例：

```bash
html-tools crypto/liquidation calculate --margin '1000' --entry-price '30000' --leverage '10' --direction 'long' --maintenance-rate '0.5' --mode 'isolated' --json
```

### crypto/impermanent-loss

无常损失计算器：计算流动性提供者的无常损失

来源：`html-tools/tools/crypto/impermanent-loss.html`，SHA-256：`69b8ad31df7cfed51154171e4b6bf8d64c2a06e1e24cb63a4c7bac83b35623ae`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算无常损失 | ilPercent, lpValue, hodlValue, ilAmount, priceRatio |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--price-a1` | Token A 初始价格 (USDT) | number | "2000" | min=0 |
| `--price-b1` | Token B 初始价格 (USDT) | number | "1" | min=0 |
| `--total-value` | 总投入价值 (USDT) | number | "10000" | min=0 |
| `--price-a2` | Token A 当前价格 (USDT) | number | "3000" | min=0 |
| `--price-b2` | Token B 当前价格 (USDT) | number | "1" | min=0 |

已检查示例：

```bash
html-tools crypto/impermanent-loss calculate --price-a1 '2000' --price-b1 '1' --total-value '10000' --price-a2 '3000' --price-b2 '1' --json
```

### crypto/apy-apr

APY/APR计算器：计算和转换年化收益率

来源：`html-tools/tools/crypto/apy-apr.html`，SHA-256：`cf4f69ed2610fdd79613694dd9ea64f4d69408a5179991d2c3c5a76c350267e0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-apr-to-apy` | calcAprToApy | apyResult, compoundGain, simpleEarning, compoundEarning |
| `calc-apy-to-apr` | calcApyToApr | aprResult, periodRate, simpleEarning, compoundEarning |
| `calc-earnings` | calcEarnings | simpleEarning, compoundEarning |
| `run` | 按字段输入重新计算 | apyResult, compoundGain, aprResult, periodRate, simpleEarning, compoundEarning |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--apr-input` | APR (年利率) % | number | "36.5" | min=0 |
| `--compound-freq` | 复利频率 | select-one | "365" | "365" (每日复利); "52" (每周复利); "12" (每月复利); "4" (每季复利); "2" (每半年复利); "1" (每年复利) |
| `--apy-input` | APY (年化收益率) % | number | "44.02" | min=0 |
| `--compound-freq2` | 复利频率 | select-one | "365" | "365" (每日复利); "52" (每周复利); "12" (每月复利); "4" (每季复利); "2" (每半年复利); "1" (每年复利) |
| `--principal` | 本金 (USDT) | number | "10000" | min=0 |
| `--days` | 投资期限 (天) | number | "365" | min=1 |

已检查示例：

```bash
html-tools crypto/apy-apr calc-apr-to-apy --apr-input '36.5' --compound-freq '365' --apy-input '44.02' --compound-freq2 '365' --principal '10000' --days '365' --json
```

### crypto/gas-fee

Gas费计算器：估算以太坊交易Gas费用

来源：`html-tools/tools/crypto/gas-fee.html`，SHA-256：`938c44a9a92178960bb71634f01e0d88b323e7eedac7408885ebde62a840b33f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算费用 | totalFee, feeEth, feeUsdt, feeCny, txTypes |
| `update-gas-limit` | updateGasLimit | gasLimit |
| `run` | 按字段输入重新计算 | gasLimit |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--gas-price` | 自定义Gas价格 (Gwei) | number | "25" | min=1 |
| `--gas-limit` | Gas限制 | number | "21000" | min=21000 |
| `--eth-price` | ETH价格 (USDT) | number | "2000" | min=0 |
| `--tx-type` | 交易类型 | select-one | "21000" | "21000" (ETH转账 (21,000)); "65000" (ERC20转账 (65,000)); "150000" (DEX交换 (150,000)); "200000" (NFT铸造 (200,000)); "350000" (复杂合约 (350,000)); "custom" (自定义) |

已检查示例：

```bash
html-tools crypto/gas-fee calculate --gas-price '25' --gas-limit '21000' --eth-price '2000' --tx-type '21000' --json
```

### crypto/compound

复利收益计算器：计算加密货币复利收益

来源：`html-tools/tools/crypto/compound.html`，SHA-256：`6298f688333039a69a27c0d95e26e42bd3e35f225bfa9f4008bcb184232c6c34`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算收益 | finalAmount, totalProfit, multiple, simpleInterest, compoundBonus, timeline |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--principal` | 初始本金 (USDT) | number | "10000" | min=0 |
| `--apy` | 年化收益率 (%) | number | "20" | min=0 |
| `--compound-freq` | 复利频率 | select-one | "365" | "365" (每日); "52" (每周); "12" (每月); "4" (每季度); "1" (每年) |
| `--years` | 投资期限 (年) | number | "3" | min=1, max=30 |

已检查示例：

```bash
html-tools crypto/compound calculate --principal '10000' --apy '20' --compound-freq '365' --years '3' --json
```

### crypto/mining

挖矿收益计算器：计算加密货币挖矿收益

来源：`html-tools/tools/crypto/mining.html`，SHA-256：`e8b5e4227991ac25ce5f593b619c66c585c560e301f8d9112714099ff16e98b5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算收益 | monthlyProfit, dailyBtc, dailyRevenue, dailyElectricity, dailyPoolFee, dailyProfit, paybackPeriod, weeklyProfit, monthlyProfitDetail, yearlyProfit, yearlyBtc |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--hashrate` | 算力 (TH/s) | number | "100" | min=0 |
| `--power` | 功耗 (W) | number | "3000" | min=0 |
| `--miner-count` | 矿机数量 | number | "1" | min=1 |
| `--miner-cost` | 矿机成本 (USDT) | number | "3000" | min=0 |
| `--electricity-rate` | 电费 (元/度) | number | "0.5" | min=0 |
| `--pool-fee` | 矿池费率 (%) | number | "2" | min=0, max=10 |
| `--coin-price` | 当前币价 (USDT) | number | "40000" | min=0 |
| `--block-reward` | 区块奖励 | number | "3.125" | min=0 |
| `--network-hashrate` | 全网算力 (EH/s) | number | "500" | min=0 |
| `--difficulty-period` | 难度调整周期 (天) | number | "14" | min=1 |

已检查示例：

```bash
html-tools crypto/mining calculate --hashrate '100' --power '3000' --miner-count '1' --miner-cost '3000' --electricity-rate '0.5' --pool-fee '2' --coin-price '40000' --block-reward '3.125' --network-hashrate '500' --difficulty-period '14' --json
```

### crypto/trading-fee

交易手续费计算器：计算交易手续费成本

来源：`html-tools/tools/crypto/trading-fee.html`，SHA-256：`ae719f73dd1ffc0b230091fb68d7f4e2aaa94090121f0bcdfe33f567825bc84f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算手续费 | singleFee, roundTripFee, feeRate, exchangeGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--trade-amount` | 交易金额 (USDT) | number | "10000" | min=0 |
| `--trade-type` | 交易类型 | select-one | "spot" | "spot" (现货交易); "futures" (合约交易) |
| `--order-type` | 订单类型 | select-one | "taker" | "taker" (吃单 (Taker)); "maker" (挂单 (Maker)) |
| `--vip-level` | VIP等级 | select-one | "0" | "0" (普通用户); "1" (VIP 1); "2" (VIP 2); "3" (VIP 3+) |

已检查示例：

```bash
html-tools crypto/trading-fee calculate --trade-amount '10000' --trade-type 'spot' --order-type 'taker' --vip-level '0' --json
```

### crypto/position-size

仓位管理计算器：计算合理仓位大小

来源：`html-tools/tools/crypto/position-size.html`，SHA-256：`c889b37000d3e859dcf7e27c82daed541b8260f8ade91c42f705eddbf2819096`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算仓位 | positionSize, positionValue, maxLoss, expectedProfit, riskReward, stopLossPercent, positionPercent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--total-capital` | 账户总资金 (USDT) | number | "10000" | min=0 |
| `--risk-percent` | 单笔风险比例 (%) | number | "2" | min=0.1, max=100 |
| `--entry-price` | 入场价格 (USDT) | number | "30000" | min=0 |
| `--stop-loss` | 止损价格 (USDT) | number | "29000" | min=0 |
| `--take-profit` | 目标价格 (USDT) | number | "33000" | min=0 |

已检查示例：

```bash
html-tools crypto/position-size calculate --total-capital '10000' --risk-percent '2' --entry-price '30000' --stop-loss '29000' --take-profit '33000' --json
```

### crypto/grid-trading

网格交易计算器：设计网格交易参数

来源：`html-tools/tools/crypto/grid-trading.html`，SHA-256：`b3cda67c7246487bdbc558a8a56d0aa891a8e254fed1afbff0a1f8d696530b3f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算网格 | gridSpacing, perGridFund, perGridProfit, annualReturn, gridVisual |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--total-fund` | 投入资金 (USDT) | number | "10000" | min=0 |
| `--grid-type` | 网格类型 | select-one | "arithmetic" | "arithmetic" (等差网格); "geometric" (等比网格) |
| `--upper-price` | 价格上限 (USDT) | number | "35000" | min=0 |
| `--lower-price` | 价格下限 (USDT) | number | "25000" | min=0 |
| `--grid-count` | 网格数量 | number | "10" | min=2, max=100 |
| `--current-price` | 当前价格 (USDT) | number | "30000" | min=0 |

已检查示例：

```bash
html-tools crypto/grid-trading calculate --total-fund '10000' --grid-type 'arithmetic' --upper-price '35000' --lower-price '25000' --grid-count '10' --current-price '30000' --json
```

### crypto/unit-converter

加密货币单位换算：加密货币单位互相转换

来源：`html-tools/tools/crypto/unit-converter.html`，SHA-256：`60231cb452bc3aa2869dd843a6a47b059840f988d2a52778d08b0a6031e59048`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert-btc` | convertBtc | btcBtc, btcMbtc, btcUbtc, btcSat |
| `convert-eth` | convertEth | ethEth, ethFinney, ethSzabo, ethGwei, ethMwei, ethKwei, ethWei |
| `run` | 按字段输入重新计算 | btcBtc, btcMbtc, btcUbtc, btcSat, ethEth, ethFinney, ethSzabo, ethGwei, ethMwei, ethKwei, ethWei |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--btc-input` | 输入数量 (BTC) | number | "1" | min=0 |
| `--eth-input` | 输入数量 (ETH) | number | "1" | min=0 |

已检查示例：

```bash
html-tools crypto/unit-converter convert-btc --btc-input '1' --eth-input '1' --json
```

### crypto/address-validator

钱包地址校验：校验加密货币钱包地址格式

来源：`html-tools/tools/crypto/address-validator.html`，SHA-256：`3f3b5a319b3881f1ef41b560623114b19d7c0425fed2e693ad19bd3a53cc4d08`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `validate` | 验证地址 | result |
| `run` | 按字段输入重新计算 | result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--address` | 钱包地址 | textarea | "" |  |

已检查示例：

```bash
html-tools crypto/address-validator validate --address '0x0000000000000000000000000000000000000000' --json
```

### crypto/ico-calculator

ICO/IDO收益计算器：计算ICO/IDO投资收益

来源：`html-tools/tools/crypto/ico-calculator.html`，SHA-256：`5507c564d9bbe1986df500ff7d32dce6e997e29d58468f4b9d40c5778c784649`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算收益 | totalProfit, tokenAmount, listValue, currentValue, listGain, totalGain, roi |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--investment` | 投资金额 (USDT) | number | "1000" | min=0 |
| `--ico-price` | 发行价格 (USDT) | number | "0.01" | min=0 |
| `--list-price` | 上市价格 (USDT) | number | "0.05" | min=0 |
| `--current-price` | 当前价格 (USDT) | number | "0.08" | min=0 |

已检查示例：

```bash
html-tools crypto/ico-calculator calculate --investment '1000' --ico-price '0.01' --list-price '0.05' --current-price '0.08' --json
```

## data

### data/csv-viewer

Csv Viewer：Csv Viewer，在线使用，数据工具，浏览器本地运行无需上传

来源：`html-tools/tools/data/csv-viewer.html`，SHA-256：`0ebe73e9b4d2dc6e401f93e0812be5b5867ae806fdf4e9885415967070959673`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse-csv` | 📊 解析 CSV | rowCount, colCount, tableContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--csv-input` | 粘贴 CSV 数据或手动输入，例如： 姓名,年龄,城市 张三,25,北京 李四,30,上海 | textarea | "" |  |

已检查示例：

```bash
html-tools data/csv-viewer parse-csv --csv-input 'name,age
Alice,25
Bob,30' --json
```

### data/data-cleaner

Data Cleaner：Data Cleaner，在线使用，数据工具，浏览器本地运行无需上传

来源：`html-tools/tools/data/data-cleaner.html`，SHA-256：`143d4fd6ecc18d27ff9262e5dddbaa1e083668706407442a17aab59ec9e57695`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `clean` | 清洗 | output, statOriginalLines, statCleanedLines, statRemovedLines, statOriginalChars, statCleanedChars, statRemovedChars, statDuplicates, statReplacements |
| `clean-data` | cleanData | output, statOriginalLines, statCleanedLines, statRemovedLines, statOriginalChars, statCleanedChars, statRemovedChars, statDuplicates, statReplacements |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--opt-remove-empty` / `--no-opt-remove-empty` | 去除空行 | checkbox | true |  |
| `--opt-trim-whitespace` / `--no-opt-trim-whitespace` | 去除首尾空格 | checkbox | true |  |
| `--opt-remove-duplicates` / `--no-opt-remove-duplicates` | 去除重复行 | checkbox | false |  |
| `--opt-remove-special` / `--no-opt-remove-special` | 去除特殊字符 | checkbox | false |  |
| `--opt-to-lowercase` / `--no-opt-to-lowercase` | 转换为小写 | checkbox | false |  |
| `--opt-to-uppercase` / `--no-opt-to-uppercase` | 转换为大写 | checkbox | false |  |
| `--opt-remove-numbers` / `--no-opt-remove-numbers` | 去除数字 | checkbox | false |  |
| `--opt-remove-extra-spaces` / `--no-opt-remove-extra-spaces` | 去除多余空格 | checkbox | false |  |
| `--replace-from` | 查找内容 | text | "" |  |
| `--replace-to` | 替换为 | text | "" |  |
| `--input` | 在此粘贴文本或CSV数据... | textarea | "" |  |

已检查示例：

```bash
html-tools data/data-cleaner clean --opt-remove-empty --opt-trim-whitespace --no-opt-remove-duplicates --no-opt-remove-special --no-opt-to-lowercase --no-opt-to-uppercase --no-opt-remove-numbers --no-opt-remove-extra-spaces --replace-from 'Hello world
Hello world
TypeScript' --replace-to 'Hello world
Hello world
TypeScript' --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### data/data-diff

Data Diff：Data Diff，在线使用，数据工具，浏览器本地运行无需上传

来源：`html-tools/tools/data/data-diff.html`，SHA-256：`ac0d74ae65a414c458ed3cc79fa4cbfcfc8aaa7e8cff8e176c67daedffa0c002`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `compare` | 🔍 对比 | addedCount, removedCount, unchangedCount, diffOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--data-a` | 数据集 A（每行一条记录） | textarea | "" |  |
| `--data-b` | 数据集 B（每行一条记录） | textarea | "" |  |

已检查示例：

```bash
html-tools data/data-diff compare --data-a 'Hello world
Hello world
TypeScript' --data-b 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### data/data-exporter

Data Exporter：Data Exporter，在线使用，数据工具，浏览器本地运行无需上传

来源：`html-tools/tools/data/data-exporter.html`，SHA-256：`18c87fd647c93fbfdc48c1921f0dbcca2c1222fcc6a7c6ad17654b7645f8b10a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 🔄 转换 | outputData |
| `detect-format` | detectFormat | formatHint |
| `run` | 按字段输入重新计算 | formatHint |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-format` | 输入格式 | select-one | "auto" | "auto" (自动检测); "json" (JSON); "csv" (CSV) |
| `--input-data` | 输入数据 | textarea | "" |  |

已检查示例：

```bash
html-tools data/data-exporter convert --input-format 'auto' --input-data 'Hello world
Hello world
TypeScript' --json
```

### data/data-filter

数据筛选器：强大的数据筛选工具，支持CSV/文本筛选，多种匹配模式，多条件组合

来源：`html-tools/tools/data/data-filter.html`，SHA-256：`d3c34a7ed01aaaddb515ab17a623c8637b353134c15cf72117d2664675ac30d6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse-data` | 🔄 解析数据 | modeIndicator, conditionsContainer |
| `update-column-selectors` | updateColumnSelectors | conditionsContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-data` | 输入数据（支持纯文本或 CSV 格式） | textarea | "" |  |
| `--delimiter` | CSV 分隔符 | select-one | "auto" | "auto" (自动检测); "," (逗号 (,)); "\t" (制表符 (Tab)); ";" (分号 (;)); "\|" (竖线 (\|)) |
| `--has-header` | 首行是否为标题 | select-one | "auto" | "auto" (自动检测); "yes" (是); "no" (否) |
| `--column-select` | 输入数据（支持纯文本或 CSV 格式） | select-one | "all" | "all" (所有列) |
| `--mode-select` | 输入数据（支持纯文本或 CSV 格式） | select-one | "contains" | "contains" (包含); "not_contains" (不包含); "starts_with" (开头是); "ends_with" (结尾是); "exact" (精确匹配); "regex" (正则表达式) |
| `--pattern-input` | 输入数据（支持纯文本或 CSV 格式） | text | "" |  |
| `--case-sensitive` / `--no-case-sensitive` | 区分大小写 | checkbox | false |  |
| `--trim-whitespace` / `--no-trim-whitespace` | 忽略首尾空格 | checkbox | true |  |
| `--skip-empty` / `--no-skip-empty` | 跳过空行 | checkbox | true |  |

已检查示例：

```bash
html-tools data/data-filter parse-data --input-data 'Hello world
Hello world
TypeScript' --delimiter 'auto' --has-header 'auto' --column-select 'all' --mode-select 'contains' --pattern-input '\w+' --no-case-sensitive --trim-whitespace --skip-empty --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### data/data-importer

Data Importer：Data Importer，在线使用，数据工具，浏览器本地运行无需上传

来源：`html-tools/tools/data/data-importer.html`，SHA-256：`c789cebed2f7a7f76e237c707dadccc2e1a454652e9cdee26fe6bdbf6c68e3f6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse-data` | 📊 解析 | formatBadge, rowCount, colCount, fieldNames, tableWrapper |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-data` | 粘贴数据（自动检测 JSON 或 CSV 格式） | textarea | "" |  |
| `--convert-format` | convertFormat | select-one | "json" | "json" (JSON); "csv" (CSV) |

已检查示例：

```bash
html-tools data/data-importer parse-data --input-data 'Hello world
Hello world
TypeScript' --convert-format 'json' --json
```

操作限制：部分原页面操作未通过迁移检查: convert-and-copy: 请先解析数据 | run: 原工具没有产生可输出的结果，请检查参数

### data/data-merger

数据合并器：合并多个数据集，支持追加、交错、去重、CSV列合并模式

来源：`html-tools/tools/data/data-merger.html`，SHA-256：`0002280ae3e2775cd6c392c5f0c47d1aca0d3de8d10177ad58ebb846fea551c0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `merge-data` | 🔗 合并数据 | countA, countB, countResult, result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-a` | 数据集 A | textarea | "" |  |
| `--input-b` | 数据集 B | textarea | "" |  |
| `--mode` | 数据集 A | radio | "append" | "append" (追加 (A+B)); "interleave" (交错); "union" (去重合并); "csv-column" (CSV列合并) |
| `--trim-lines` / `--no-trim-lines` | 去除首尾空白 | checkbox | true |  |
| `--skip-empty` / `--no-skip-empty` | 跳过空行 | checkbox | true |  |
| `--delimiter` | CSV分隔符 | text | "," |  |

已检查示例：

```bash
html-tools data/data-merger merge-data --input-a 'Hello world
Hello world
TypeScript' --input-b 'Hello world
Hello world
TypeScript' --mode 'append' --trim-lines --skip-empty --delimiter ',' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### data/data-normalizer

Data Normalizer：Data Normalizer，在线使用，数据工具，浏览器本地运行无需上传

来源：`html-tools/tools/data/data-normalizer.html`，SHA-256：`e1420cc58b8cacdf3baa7d2291cb96f691220320e272e35e90742d8d10c2f648`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `normalize` | 归一化 | output, statMin, statMax, statMean, statStd |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--method` | method | select-one | "minmax" | "minmax" (Min-Max); "zscore" (Z-score); "decimal" (小数定标) |
| `--range-min` | rangeMin | number | "0" |  |
| `--range-max` | rangeMax | number | "1" |  |
| `--precision` | precision | number | "4" | min=0, max=10 |
| `--input` | 输入数字，每行一个或用逗号分隔： 10, 25, 30, 45, 50 或者： 10 25 30 45 50 | textarea | "" |  |

已检查示例：

```bash
html-tools data/data-normalizer normalize --method 'minmax' --range-min '0' --range-max '1' --precision '4' --input '1,2,3,4,5' --json
```

操作限制：部分原页面操作未通过迁移检查: update-range-inputs: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### data/data-sampler

数据采样器：从数据集中采样，支持随机、前N条、后N条、每N条等模式

来源：`html-tools/tools/data/data-sampler.html`，SHA-256：`c968d16fdb514a4e0a33bda86559d0a24c4152fbee146dd0b6800a1de7ce5a38`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `sample-data` | 🎲 采样 | samplePercent, result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入数据（每行一条） | textarea | "" |  |
| `--sample-size` | sampleSize | number | "10" | min=1 |
| `--size-type` | sizeType | select-one | "count" | "count" (条); "percent" (%) |
| `--every-n` | everyN | number | "2" | min=1 |
| `--range-start` | rangeStart | number | "1" | min=1 |
| `--range-end` | rangeEnd | number | "10" | min=1 |
| `--seed` | 留空则每次随机 | number | "" |  |

已检查示例：

```bash
html-tools data/data-sampler sample-data --input 'Hello world
Hello world
TypeScript' --sample-size '10' --size-type 'count' --every-n '2' --range-start '1' --range-end '10' --seed '10' --json
```

操作限制：部分原页面操作未通过迁移检查: random: 原工具没有产生可输出的结果，请检查参数 | first: 原工具没有产生可输出的结果，请检查参数 | last: 原工具没有产生可输出的结果，请检查参数 | every: 原工具没有产生可输出的结果，请检查参数 | range: 原工具没有产生可输出的结果，请检查参数 | update-options-visibility: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### data/data-sorter

Data Sorter：Data Sorter，在线使用，数据工具，浏览器本地运行无需上传

来源：`html-tools/tools/data/data-sorter.html`，SHA-256：`9cc1394d4ef9ca368114eb30133e7453c6fc68e0ec76d12a72a2a56907c0c853`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `sort` | 排序 | output, statLines |
| `sort-data` | sortData | output, statLines |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--data-type` | dataType | select-one | "text" | "text" (文本 (每行一项)); "csv" (CSV) |
| `--sort-mode` | sortMode | select-one | "alphabetical" | "alphabetical" (字母排序); "numeric" (数字排序); "length" (按长度); "natural" (自然排序) |
| `--sort-order` | sortOrder | select-one | "asc" | "asc" (升序); "desc" (降序) |
| `--case-sensitive` / `--no-case-sensitive` | 区分大小写 | checkbox | false |  |
| `--csv-delimiter` | CSV分隔符: | select-one | "," | "," (逗号 (,)); ";" (分号 (;)); "tab" (制表符 (Tab)) |
| `--csv-column` | CSV分隔符: | select-one | "0" | "0" (第 1 列) |
| `--csv-has-header` / `--no-csv-has-header` | 首行为标题 | checkbox | true |  |
| `--input` | 在此粘贴数据... 文本模式: 每行一项 CSV模式: 逗号分隔的数据 | textarea | "" |  |

已检查示例：

```bash
html-tools data/data-sorter sort --data-type 'text' --sort-mode 'alphabetical' --sort-order 'asc' --no-case-sensitive --csv-delimiter ',' --csv-column '0' --csv-has-header --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: update-csv-columns: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### data/data-transformer

数据转换器：批量转换数据，支持前缀后缀、包裹、模板替换、数字格式化、大小写转换

来源：`html-tools/tools/data/data-transformer.html`，SHA-256：`f8bd1a2866afe305ac41161f24c5de744c33e43c9b43ebc747160fe72ce8e02e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `transform-data` | 🔄 转换 | result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入数据（每行一条） | textarea | "" |  |
| `--prefix` | 例如: "item_" | text | "" |  |
| `--suffix` | 例如: ".txt" | text | "" |  |
| `--wrap-left` | 左边 | text | "\"" |  |
| `--wrap-right` | 右边 | text | "\"" |  |
| `--wrap-separator` | 例如: , | text | "," |  |
| `--template` | 使用 {value} 表示原值，{index} 表示序号（从1开始），{index0} 从0开始 | text | "" |  |
| `--number-format` | numberFormat | select-one | "thousands" | "thousands" (千分位分隔 (1,234,567)); "fixed2" (保留2位小数); "fixed4" (保留4位小数); "percent" (转为百分比); "scientific" (科学计数法); "currency-cny" (人民币 (¥)); "currency-usd" (美元 ($)) |
| `--non-number-action` | nonNumberAction | select-one | "keep" | "keep" (保持原样); "skip" (跳过); "zero" (替换为0) |
| `--case-type` | caseType | select-one | "upper" | "upper" (全部大写 (HELLO WORLD)); "lower" (全部小写 (hello world)); "capitalize" (首字母大写 (Hello World)); "sentence" (句首大写 (Hello world)); "camel" (驼峰命名 (helloWorld)); "pascal" (帕斯卡命名 (HelloWorld)); "snake" (蛇形命名 (hello_world)); "kebab" (短横线命名 (hello-world)) |
| `--replace-find` | 使用正则表达式 | text | "" |  |
| `--replace-regex` / `--no-replace-regex` | 使用正则表达式 | checkbox | false |  |
| `--replace-with` | 替换后的文本 | text | "" |  |

已检查示例：

```bash
html-tools data/data-transformer transform-data --input 'Hello world
Hello world
TypeScript' --prefix 'Hello world
Hello world
TypeScript' --suffix 'Hello world
Hello world
TypeScript' --wrap-left '"' --wrap-right '"' --wrap-separator ',' --template 'Hello world
Hello world
TypeScript' --number-format 'thousands' --non-number-action 'keep' --case-type 'upper' --replace-find 'Hello world
Hello world
TypeScript' --no-replace-regex --replace-with 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: prefix-suffix: 原工具没有产生可输出的结果，请检查参数 | wrap: 原工具没有产生可输出的结果，请检查参数 | template: 原工具没有产生可输出的结果，请检查参数 | number: 原工具没有产生可输出的结果，请检查参数 | case: 原工具没有产生可输出的结果，请检查参数 | replace: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### data/data-validator

数据验证器：验证数据格式，支持邮箱、URL、数字、日期、手机号、IP、UUID、JSON等

来源：`html-tools/tools/data/data-validator.html`，SHA-256：`18b0af3c904f7902d102ae8e368309ba4a410f656ec92654d4b76dde345264d6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `validate-data` | ✓ 验证 | totalCount, validCount, validPercent, invalidCount, invalidPercent, validList, invalidList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入数据（每行一条） | textarea | "" |  |

已检查示例：

```bash
html-tools data/data-validator validate-data --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: email: 原工具没有产生可输出的结果，请检查参数 | url: 原工具没有产生可输出的结果，请检查参数 | number: 原工具没有产生可输出的结果，请检查参数 | integer: 原工具没有产生可输出的结果，请检查参数 | phone-cn: 原工具没有产生可输出的结果，请检查参数 | date: 原工具没有产生可输出的结果，请检查参数 | ipv4: 原工具没有产生可输出的结果，请检查参数 | hex-color: 原工具没有产生可输出的结果，请检查参数 | uuid: 原工具没有产生可输出的结果，请检查参数 | json: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### data/duplicate-remover

Duplicate Remover：Duplicate Remover，在线使用，数据工具，浏览器本地运行无需上传

来源：`html-tools/tools/data/duplicate-remover.html`，SHA-256：`8342a04ac54fbe93390bfd184ab715c35adace84344d06ba495c02ebb06837f1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `remove-duplicates` | removeDuplicates | output, statTotal, statUnique, statDuplicates |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--case-sensitive` / `--no-case-sensitive` | 区分大小写 | checkbox | true |  |
| `--keep-option` | keepOption | select-one | "first" | "first" (首次出现); "last" (末次出现) |
| `--trim-whitespace` / `--no-trim-whitespace` | 去除首尾空白 | checkbox | true |  |
| `--ignore-empty` / `--no-ignore-empty` | 忽略空行 | checkbox | true |  |
| `--input` | 在此粘贴文本，每行一个项目... | textarea | "" |  |

已检查示例：

```bash
html-tools data/duplicate-remover remove-duplicates --case-sensitive --keep-option 'first' --trim-whitespace --ignore-empty --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### data/excel-to-json

Excel To Json：Excel To Json，在线使用，数据工具，浏览器本地运行无需上传

来源：`html-tools/tools/data/excel-to-json.html`，SHA-256：`2fa538357f4c629334b221a44d09cbb366d5d13138000cd2be9643fb70633d4f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert-to-json` | 🔄 转换 | result, rowCount, colCount, detectedDelimiter |
| `run` | 按字段输入重新计算 | input |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--input` | 或粘贴 CSV/TSV 数据 | textarea | "" |  |
| `--delimiter` | 分隔符： | select-one | "auto" | "auto" (自动检测); "," (逗号 (,)); "\t" (制表符 (Tab)); ";" (分号 (;)); "\|" (竖线 (\|)) |
| `--output-format` | 输出格式： | select-one | "objects" | "objects" (对象数组 [{...}]); "arrays" (二维数组 [[...]]) |
| `--indent` | 缩进： | select-one | "2" | "2" (2 空格); "4" (4 空格); "0" (紧凑) |
| `--first-row-header` / `--no-first-row-header` | 首行作为字段名 | checkbox | true |  |
| `--trim-values` / `--no-trim-values` | 去除空白 | checkbox | true |  |
| `--skip-empty` / `--no-skip-empty` | 跳过空行 | checkbox | true |  |

已检查示例：

```bash
html-tools data/excel-to-json convert-to-json --file-input 'generated/fixtures/sample.xlsx' --input '{"name":"Alice","count":2}' --delimiter 'auto' --output-format 'objects' --indent '2' --first-row-header --trim-values --skip-empty --json
```

操作限制：部分原页面操作未通过迁移检查: export-json: 原工具没有产生可输出的结果，请检查参数

### data/heatmap-generator

Heatmap Generator：Heatmap Generator，在线使用，数据工具，浏览器本地运行无需上传

来源：`html-tools/tools/data/heatmap-generator.html`，SHA-256：`b482e2b0b0cfc9d275512e991d2c1e60f0f43b12827a1cfe8ab4c920f100dcc2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-stats` | updateStats | statRows, statCols, statMin, statMax, statAvg |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--data-input` | 矩阵数据 (每行一行数据，值用逗号分隔) | textarea | "" |  |
| `--has-row-labels` / `--no-has-row-labels` | 第一列为行标签 | checkbox | true |  |
| `--has-col-labels` / `--no-has-col-labels` | 第一行为列标签 | checkbox | true |  |
| `--low-color` | lowColor | color | "#0d47a1" |  |
| `--mid-color` | midColor | color | "#fff176" |  |
| `--high-color` | highColor | color | "#b71c1c" |  |
| `--cell-size` | 单元格大小 | number | "50" | min=20, max=200 |
| `--font-size` | 字体大小 | number | "12" | min=8, max=24 |
| `--show-values` / `--no-show-values` | 显示数值 | checkbox | true |  |
| `--show-legend` / `--no-show-legend` | 显示图例 | checkbox | true |  |

已检查示例：

```bash
html-tools data/heatmap-generator update-stats --data-input 'Hello world
Hello world
TypeScript' --has-row-labels --has-col-labels --low-color '#0d47a1' --mid-color '#fff176' --high-color '#b71c1c' --cell-size '50' --font-size '12' --show-values --show-legend --json
```

操作限制：部分原页面操作未通过迁移检查: generate-heatmap: 无法解析有效数据 | update-gradient: 原工具没有产生可输出的结果，请检查参数 | parse-data: 无法解析有效数据 | run: 原工具没有产生可输出的结果，请检查参数

### data/json-flattener

Json Flattener：Json Flattener，在线使用，数据工具，浏览器本地运行无需上传

来源：`html-tools/tools/data/json-flattener.html`，SHA-256：`8544bc033e1d59836e02bafdbdf7ec4d078e13c9905c91feed521afcb5840e81`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `flatten` | 扁平化 | output, statKeys, statDepth |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--delimiter` | delimiter | text | "." |  |
| `--array-format` | arrayFormat | select-one | "dot" | "dot" (点号 (arr.0)); "bracket" (方括号 (arr[0])) |
| `--indent` | indent | select-one | "2" | "2" (2 空格); "4" (4 空格); "tab" (Tab) |
| `--input` | 在此粘贴嵌套 JSON... 例如: { "user": { "name": "张三", "address": { "city": "北京" } } } | textarea | "" |  |

已检查示例：

```bash
html-tools data/json-flattener flatten --delimiter '.' --array-format 'dot' --indent '2' --input '{"name":"Alice","count":2}' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### data/json-to-csv

JSON 转 CSV：JSON 数组转 CSV 格式，支持嵌套展平、自定义分隔符

来源：`html-tools/tools/data/json-to-csv.html`，SHA-256：`5a3a0e360acd60d592bd8c712a23baadb091a5e0c53126e6300cef3b60258094`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 转换 | output, statRows, statCols, statSize |
| `run` | 按字段输入重新计算 | output, statRows, statCols, statSize |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--delimiter` | delimiter | select-one | "," | "," (逗号 (,)); ";" (分号 (;)); "\t" (制表符 (Tab)); "\|" (竖线 (\|)) |
| `--include-headers` / `--no-include-headers` | 包含表头 | checkbox | true |  |
| `--flatten-nested` / `--no-flatten-nested` | 展平嵌套对象 | checkbox | true |  |
| `--quote-all` / `--no-quote-all` | 所有字段加引号 | checkbox | false |  |
| `--input` | 在此粘贴 JSON 数组数据... 示例: [ { "name": "张三", "age": 25 }, { "name": "李四", "age": 30 } ] | textarea | "" |  |

已检查示例：

```bash
html-tools data/json-to-csv convert --delimiter ',' --include-headers --flatten-nested --no-quote-all --input '[{"name":"Alice","age":25},{"name":"Bob","age":30}]' --json
```

### data/json-unflatten

Json Unflatten：Json Unflatten，在线使用，数据工具，浏览器本地运行无需上传

来源：`html-tools/tools/data/json-unflatten.html`，SHA-256：`e49352a9bea04d703af2dbc81beff0306794c059bbf394357b904ae3512473de`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `unflatten` | 反扁平化 | output, statKeys, statDepth |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--delimiter` | delimiter | text | "." |  |
| `--indent` | indent | select-one | "2" | "2" (2 空格); "4" (4 空格); "tab" (Tab) |
| `--detect-arrays` / `--no-detect-arrays` | 自动检测数组 | checkbox | true |  |
| `--input` | 在此粘贴扁平 JSON... 例如: { "user.name": "张三", "user.address.city": "北京", "items.0": "苹果", "items.1": "香蕉" } | textarea | "" |  |

已检查示例：

```bash
html-tools data/json-unflatten unflatten --delimiter '.' --indent '2' --detect-arrays --input '{"name":"Alice","count":2}' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### data/outlier-detector

异常值检测器：检测数据中的异常值，支持IQR和Z-score方法，可视化显示检测结果

来源：`html-tools/tools/data/outlier-detector.html`，SHA-256：`af4eb63b4d7f1ea96e553e98560d0ea47ea99eaec0eaad5eae0317f89ed2bd7f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-method-options` | updateMethodOptions | thresholdLabel, methodHint |
| `run` | 按字段输入重新计算 | thresholdLabel, methodHint |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--method` | 检测方法 | select-one | "iqr" | "iqr" (IQR（四分位距）); "zscore" (Z-score（标准分数）) |
| `--threshold` | IQR 乘数 | select-one | "1.5" | "1.5" (1.5（标准）); "2.2" (2.2（中等）); "3" (3（宽松）) |
| `--data-input` | 输入数值（每行一个） | textarea | "" |  |

已检查示例：

```bash
html-tools data/outlier-detector update-method-options --method 'iqr' --threshold '1.5' --data-input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: detect-outliers: 请输入至少 4 个数值

### data/sql-query-builder

Sql Query Builder：Sql Query Builder，在线使用，数据工具，浏览器本地运行无需上传

来源：`html-tools/tools/data/sql-query-builder.html`，SHA-256：`cfd83836bf956c20ecbc796e8414dfba1100425f5bfa385d1ac7abf11096da85`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-sql` | generateSQL | sqlOutput |
| `run` | 按字段输入重新计算 | sqlOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--table-name` | 表名 | text | "users" |  |
| `--distinct-check` / `--no-distinct-check` | 使用 DISTINCT (去重) | checkbox | false |  |
| `--column-input` | 列名 | text | "" |  |
| `--alias-input` | 别名 (可选) | text | "" |  |
| `--order-by` | 排序列 | text | "" |  |
| `--order-dir` | 顺序 | select-one | "" | "" (-- 选择 --); "ASC" (ASC 升序); "DESC" (DESC 降序) |
| `--limit-val` | LIMIT | number | "" | min=0 |
| `--offset-val` | OFFSET | number | "" | min=0 |

已检查示例：

```bash
html-tools data/sql-query-builder generate-sql --table-name 'users' --no-distinct-check --column-input 'Hello world
Hello world
TypeScript' --alias-input 'Hello world
Hello world
TypeScript' --order-by 'Hello world
Hello world
TypeScript' --order-dir 'ASC' --limit-val '10' --offset-val '10' --json
```

### data/statistics-calculator

统计计算器(数据分析)：计算数据的统计指标：均值、中位数、众数、方差、标准差、百分位数等

来源：`html-tools/tools/data/statistics-calculator.html`，SHA-256：`5d1bde648ce28bc1d665d5354ea4cb156ff377eb445ca4a29b119cf52f32c127`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入数字，每行一个或用逗号分隔 示例: 12, 15, 18, 22, 25 或 12 15 18 22 25 | textarea | "" |  |

已检查示例：

```bash
html-tools data/statistics-calculator calculate --input '1,2,3,4,5' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 计算完成，共 5 个数据

## design

### art/color-wheel

色轮配色：交互式色轮和配色方案生成

来源：`html-tools/tools/art/color-wheel.html`，SHA-256：`7c81ad004c37909618f8d5148b88cdde380bfd6856f62ac83d832c5ab01c5c98`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-color` | updateColor | colorHex, rgbValue, hslValue, palette |
| `generate-palette` | generatePalette | palette |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools art/color-wheel update-color  --json
```

操作限制：部分原页面操作未通过迁移检查: update-pointer: 原工具没有产生可输出的结果，请检查参数

### design/color-picker

颜色选择器(设计版)：可视化颜色选择工具，支持 HEX、RGB、HSL 等格式

来源：`html-tools/tools/design/color-picker.html`，SHA-256：`9fcf2b3cbedabadf8b6892bb91d8dd0c273309f0e8d5c9ee9a160f253caf0f03`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | colorPicker, hexValue, rgbValue, hslValue, hsvValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color-picker` | colorPicker | color | "#0d6efd" |  |
| `--hex-value` | HEX | text | "#0d6efd" |  |

已检查示例：

```bash
html-tools design/color-picker run --color-picker '#0d6efd' --hex-value '#0d6efd' --json
```

### design/gradient-generator

渐变生成器：CSS 线性/径向渐变代码生成器

来源：`html-tools/tools/design/gradient-generator.html`，SHA-256：`f340a0556aba59d00088e48ce7e83fa18773389fe40abfd723cbcdce51d33f93`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-css` | generateCSS | value |
| `update-preview` | updatePreview | cssOutput |
| `render` | render | colorStops, cssOutput |
| `run` | 按字段输入重新计算 | cssOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--gradient-type` | 类型 | select-one | "linear" | "linear" (线性渐变); "radial" (径向渐变); "conic" (锥形渐变) |
| `--angle` | 类型 | number | "90" | min=0, max=360 |
| `--field-3` | 类型 | color | "#667eea" |  |
| `--field-4` | 类型 | number | "0" | min=0, max=100 |
| `--field-5` | 类型 | color | "#764ba2" |  |
| `--field-6` | 类型 | number | "100" | min=0, max=100 |

已检查示例：

```bash
html-tools design/gradient-generator generate-css --gradient-type 'linear' --angle '90' --field-3 '#667eea' --field-4 '0' --field-5 '#764ba2' --field-6 '100' --json
```

### design/box-shadow-generator

阴影生成器：CSS box-shadow 阴影效果可视化编辑器

来源：`html-tools/tools/design/box-shadow-generator.html`，SHA-256：`5d8141a0a4e01a6c3a33a69c00ba09383f795aaa9a6558f4526d83cf31131eef`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-shadow` | updateShadow | offsetXVal, offsetYVal, blurVal, spreadVal, opacityVal, cssOutput |
| `run` | 按字段输入重新计算 | offsetXVal, offsetYVal, blurVal, spreadVal, opacityVal, cssOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--offset-x` | 水平偏移 | range | "5" | min=-50, max=50 |
| `--offset-y` | 垂直偏移 | range | "5" | min=-50, max=50 |
| `--blur` | 模糊半径 | range | "15" | min=0, max=100 |
| `--spread` | 扩展半径 | range | "0" | min=-50, max=50 |
| `--shadow-color` | 阴影颜色 | color | "#000000" |  |
| `--opacity` | 阴影颜色 | range | "20" | min=0, max=100 |
| `--inset` / `--no-inset` | 内阴影 (inset) | checkbox | false |  |

已检查示例：

```bash
html-tools design/box-shadow-generator update-shadow --offset-x '5' --offset-y '5' --blur '15' --spread '0' --shadow-color '#000000' --opacity '20' --no-inset --json
```

### design/color-palette

调色板生成器(设计版)：生成和谐配色方案，支持多种色彩理论

来源：`html-tools/tools/design/color-palette.html`，SHA-256：`39b1fb4de0a8389e8988fb6bdf4b830b1a83665f43359ee310bc3bf069f97531`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/color-palette update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/contrast-checker

对比度检查器：检查文本与背景颜色的 WCAG 对比度

来源：`html-tools/tools/design/contrast-checker.html`，SHA-256：`1918777c4df67d33423daaad42f4b7d1a8face7e1de5259c8b304f8327ef342c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/contrast-checker update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/css-grid-generator

CSS Grid 生成器(布局版)：可视化 CSS Grid 布局代码生成器

来源：`html-tools/tools/design/css-grid-generator.html`，SHA-256：`80ef05da44ae97b1e63a676d575fa24e057141d9e26d065f2a5541e5b458a74f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-grid` | updateGrid | gridContainer, cssOutput |
| `run` | 按字段输入重新计算 | gridContainer, cssOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--columns` | 列数: | number | "3" | min=1, max=12 |
| `--rows` | 行数: | number | "3" | min=1, max=12 |
| `--col-gap` | 列间距: | number | "16" | min=0, max=50 |
| `--row-gap` | 行间距: | number | "16" | min=0, max=50 |
| `--col-template` | 列模板: | select-one | "equal" | "equal" (等分 (1fr)); "auto" (自动 (auto)); "minmax" (响应式 (minmax)); "custom" (自定义) |
| `--row-template` | 行模板: | select-one | "equal" | "equal" (等分 (1fr)); "auto" (自动 (auto)); "minmax" (响应式 (minmax)) |

已检查示例：

```bash
html-tools design/css-grid-generator update-grid --columns '3' --rows '3' --col-gap '16' --row-gap '16' --col-template 'equal' --row-template 'equal' --json
```

### design/flexbox-generator

Flexbox 生成器：可视化 Flexbox 布局代码生成器

来源：`html-tools/tools/design/flexbox-generator.html`，SHA-256：`d14c54dd417c77347e6333580eaab73903b32a895e358b6fdffc7f70553e2403`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | flexContainer, cssOutput |
| `run` | 按字段输入重新计算 | flexContainer, cssOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--item-count` | 子元素数量: | number | "4" | min=1, max=12 |
| `--flex-direction` | flexDirection | select-one | "row" | "row" (row (默认)); "row-reverse" (row-reverse); "column" (column); "column-reverse" (column-reverse) |
| `--flex-wrap` | flexWrap | select-one | "nowrap" | "nowrap" (nowrap (默认)); "wrap" (wrap); "wrap-reverse" (wrap-reverse) |
| `--justify-content` | justifyContent | select-one | "flex-start" | "flex-start" (flex-start (默认)); "flex-end" (flex-end); "center" (center); "space-between" (space-between); "space-around" (space-around); "space-evenly" (space-evenly) |
| `--align-items` | alignItems | select-one | "stretch" | "stretch" (stretch (默认)); "flex-start" (flex-start); "flex-end" (flex-end); "center" (center); "baseline" (baseline) |
| `--align-content` | alignContent | select-one | "normal" | "normal" (normal (默认)); "flex-start" (flex-start); "flex-end" (flex-end); "center" (center); "space-between" (space-between); "space-around" (space-around); "stretch" (stretch) |
| `--gap` | gap | select-one | "8px" | "0" (0); "8px" (8px); "16px" (16px); "24px" (24px); "32px" (32px) |

已检查示例：

```bash
html-tools design/flexbox-generator update-preview --item-count '4' --flex-direction 'row' --flex-wrap 'nowrap' --justify-content 'flex-start' --align-items 'stretch' --align-content 'normal' --gap '8px' --json
```

### design/border-radius-generator

圆角生成器：CSS border-radius 圆角效果生成器

来源：`html-tools/tools/design/border-radius-generator.html`，SHA-256：`4e351aff307ef8a6bb881832885a827dcafdf59894e8a7fd8aeeea98b8da4672`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-radius` | updateRadius | tlVal, trVal, tr, brVal, br, blVal, bl, cssOutput |
| `run` | 按字段输入重新计算 | tlVal, trVal, tr, brVal, br, blVal, bl, cssOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--link-corners` / `--no-link-corners` | 四角同步 | checkbox | true |  |
| `--tl` | 左上角 20px | range | "20" | min=0, max=100 |
| `--tr` | 右上角 20px | range | "20" | min=0, max=100 |
| `--br` | 右下角 20px | range | "20" | min=0, max=100 |
| `--bl` | 左下角 20px | range | "20" | min=0, max=100 |

已检查示例：

```bash
html-tools design/border-radius-generator update-radius --link-corners --tl '20' --tr '20' --br '20' --bl '20' --json
```

### design/css-filter-generator

CSS 滤镜生成器(设计版)：CSS filter 滤镜效果可视化编辑器

来源：`html-tools/tools/design/css-filter-generator.html`，SHA-256：`ee8f15f43369308417f19e7f37590243fefa548fee79f6c58dd24f7d622938f6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-filter` | updateFilter | blurVal, brightnessVal, contrastVal, grayscaleVal, hueRotateVal, invertVal, opacityVal, saturateVal, sepiaVal, cssOutput |
| `run` | 按字段输入重新计算 | blurVal, brightnessVal, contrastVal, grayscaleVal, hueRotateVal, invertVal, opacityVal, saturateVal, sepiaVal, cssOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--blur` | 模糊 | range | "0" | min=0, max=20 |
| `--brightness` | 亮度 | range | "100" | min=0, max=200 |
| `--contrast` | 对比度 | range | "100" | min=0, max=200 |
| `--grayscale` | 灰度 | range | "0" | min=0, max=100 |
| `--hue-rotate` | 色相旋转 | range | "0" | min=0, max=360 |
| `--invert` | 反色 | range | "0" | min=0, max=100 |
| `--opacity` | 透明度 | range | "100" | min=0, max=100 |
| `--saturate` | 饱和度 | range | "100" | min=0, max=200 |
| `--sepia` | 棕褐色 | range | "0" | min=0, max=100 |

已检查示例：

```bash
html-tools design/css-filter-generator update-filter --blur '0' --brightness '100' --contrast '100' --grayscale '0' --hue-rotate '0' --invert '0' --opacity '100' --saturate '100' --sepia '0' --json
```

### design/animation-generator

CSS 动画生成器(简版)：CSS @keyframes 动画代码生成器

来源：`html-tools/tools/design/animation-generator.html`，SHA-256：`fede2141d3a2590979f166f0ac5cd383428da82ff9f6201e54d8bfb39a848890`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/animation-generator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/text-shadow-generator

文字阴影生成器：CSS text-shadow 文字阴影效果生成器

来源：`html-tools/tools/design/text-shadow-generator.html`，SHA-256：`9423463e77d492501ca7ab74ddbfd229003e2d4017da5b10b3dcca44c55a90c6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | previewText, hOffsetVal, vOffsetVal, blurVal, opacityVal, output |
| `run` | 按字段输入重新计算 | previewText, hOffsetVal, vOffsetVal, blurVal, opacityVal, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-input` | 预览文字 | text | "文字阴影" |  |
| `--text-color` | 文字颜色 | color | "#212529" |  |
| `--shadow-color` | 阴影颜色 | color | "#000000" |  |
| `--h-offset` | 水平偏移: 2px | range | "2" | min=-50, max=50 |
| `--v-offset` | 垂直偏移: 2px | range | "2" | min=-50, max=50 |
| `--blur` | 模糊半径: 4px | range | "4" | min=0, max=50 |
| `--opacity` | 透明度: 0.50 | range | "50" | min=0, max=100 |

已检查示例：

```bash
html-tools design/text-shadow-generator update-preview --text-input '文字阴影' --text-color '#212529' --shadow-color '#000000' --h-offset '2' --v-offset '2' --blur '4' --opacity '50' --json
```

### design/color-converter

颜色格式转换：HEX、RGB、HSL、CMYK 颜色格式互转

来源：`html-tools/tools/design/color-converter.html`，SHA-256：`394e95d2162ca52bca018aff346098888afee05bbc68462c8505fa3005253515`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/color-converter update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/color-blindness-simulator

色盲模拟器(设计师版)：模拟不同类型色盲视觉效果

来源：`html-tools/tools/design/color-blindness-simulator.html`，SHA-256：`89a611546b14d99b859856a077752dff4a0eca1604bb51c65193cc804be7aa79`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/color-blindness-simulator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/font-pair-generator

字体配对工具：推荐和谐的字体搭配组合

来源：`html-tools/tools/design/font-pair-generator.html`，SHA-256：`54a923a8d35e5880731c2c553686c0bbb52f2783145745c1da48246ec15aea93`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/font-pair-generator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/spacing-calculator

间距计算器：基于比例的间距系统计算器

来源：`html-tools/tools/design/spacing-calculator.html`，SHA-256：`6c94023239d451e969d8cad05c9ea136bc983af7374edc4998f4e0a4ad5c2982`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/spacing-calculator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/glassmorphism-generator

毛玻璃生成器：CSS 毛玻璃效果代码生成器

来源：`html-tools/tools/design/glassmorphism-generator.html`，SHA-256：`c7948892185cfb7cf1865ad4b2370409aed0b52717b608d59f747660fcb79fc8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-glass` | updateGlass | opacityVal, blurVal, borderOpacityVal, radiusVal, output |
| `run` | 按字段输入重新计算 | opacityVal, blurVal, borderOpacityVal, radiusVal, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--opacity` | 背景透明度: 0.25 | range | "25" | min=0, max=100 |
| `--blur` | 模糊程度: 16px | range | "16" | min=0, max=50 |
| `--border-opacity` | 边框透明度: 0.18 | range | "18" | min=0, max=100 |
| `--radius` | 圆角: 16px | range | "16" | min=0, max=50 |
| `--bg-color` | 背景颜色 | color | "#ffffff" |  |
| `--border-color` | 边框颜色 | color | "#ffffff" |  |

已检查示例：

```bash
html-tools design/glassmorphism-generator update-glass --opacity '25' --blur '16' --border-opacity '18' --radius '16' --bg-color '#ffffff' --border-color '#ffffff' --json
```

### design/neumorphism-generator

新拟态生成器：CSS 新拟态风格效果生成器

来源：`html-tools/tools/design/neumorphism-generator.html`，SHA-256：`98b1a706b9e92083f04cd46002d0a6ca068268cf26a3916a62a2ccf6f1d7ee53`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-neu` | updateNeu | blurVal, distanceVal, intensityVal, radiusVal, output |
| `run` | 按字段输入重新计算 | blurVal, distanceVal, intensityVal, radiusVal, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--bg-color` | 背景颜色 | color | "#e0e5ec" |  |
| `--blur` | 模糊程度: 30px | range | "30" | min=0, max=100 |
| `--distance` | 距离: 10px | range | "10" | min=0, max=50 |
| `--intensity` | 强度: 0.15 | range | "15" | min=0, max=50 |
| `--radius` | 圆角: 50px | range | "50" | min=0, max=100 |

已检查示例：

```bash
html-tools design/neumorphism-generator update-neu --bg-color '#e0e5ec' --blur '30' --distance '10' --intensity '15' --radius '50' --json
```

### design/clip-path-generator

裁剪路径生成器：CSS clip-path 裁剪效果生成器

来源：`html-tools/tools/design/clip-path-generator.html`，SHA-256：`8ae5b3a607b9ebfd9341f14341743a1b7207ab3aae2c14406eb36a0ac154f54b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/clip-path-generator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/transform-generator

CSS 变换生成器：CSS transform 变换效果生成器

来源：`html-tools/tools/design/transform-generator.html`，SHA-256：`f147dfca020e29d204a9d4d77b4b099ef12a5fc8a8d2d1f6618e82be7fda68c0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/transform-generator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/transition-generator

CSS 过渡生成器：CSS transition 过渡效果生成器

来源：`html-tools/tools/design/transition-generator.html`，SHA-256：`156e19818628c7de0b80ae6ed7c61b4d5fe721b6ee8324b43559b13b0330e96f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/transition-generator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/cursor-generator

光标样式生成器：自定义鼠标光标样式生成器

来源：`html-tools/tools/design/cursor-generator.html`，SHA-256：`8b0713f2a345c1524927b28e79636047af821744053d75b5c5b8a6d5d389fde4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/cursor-generator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/scrollbar-generator

滚动条生成器：自定义滚动条样式代码生成器

来源：`html-tools/tools/design/scrollbar-generator.html`，SHA-256：`c77907e412d730db1d75dc1806d200c76167e71144906ca73a8c82509d1c2d01`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/scrollbar-generator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/triangle-generator

CSS 三角形生成器：纯 CSS 三角形代码生成器

来源：`html-tools/tools/design/triangle-generator.html`，SHA-256：`a7d99f131e76f4de5a447b09eff995fd0a35aa868ad990babd71871f4f320726`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/triangle-generator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/blob-generator

Blob 形状生成器：SVG/CSS 有机 blob 形状生成器

来源：`html-tools/tools/design/blob-generator.html`，SHA-256：`5b2e3ed3a668f96d70e9a016a89ab7a8f2630a4dd2e6c05499e2ae58791784a7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/blob-generator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/wave-generator

波浪 SVG 生成器：SVG 波浪背景图案生成器

来源：`html-tools/tools/design/wave-generator.html`，SHA-256：`ccd192b9234650b0b5083f72e560373df4f44dba314d755e9eb7c3ab6abe3b14`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-wave` | updateWave | heightVal, wavesVal, amplitudeVal, svgOutput |
| `run` | 按字段输入重新计算 | heightVal, wavesVal, amplitudeVal, svgOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--wave-color` | 波浪颜色 | color | "#667eea" |  |
| `--bg-color` | 背景颜色 | color | "#ffffff" |  |
| `--height` | 高度: 100 px | range | "100" | min=50, max=200 |
| `--waves` | 波峰数: 2 | range | "2" | min=1, max=5 |
| `--amplitude` | 振幅: 30 | range | "30" | min=10, max=80 |
| `--direction` | 方向 | select-one | "bottom" | "bottom" (向下); "top" (向上) |

已检查示例：

```bash
html-tools design/wave-generator update-wave --wave-color '#667eea' --bg-color '#ffffff' --height '100' --waves '2' --amplitude '30' --direction 'bottom' --json
```

### design/pattern-generator

图案背景生成器：CSS/SVG 图案背景生成器

来源：`html-tools/tools/design/pattern-generator.html`，SHA-256：`a60889bc8ee2bdf9a2b18fa27613951a8637f4461e4743a5001c8211fa072e1b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/pattern-generator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/loader-generator

加载动画生成器：CSS 加载动画/Spinner 代码生成器

来源：`html-tools/tools/design/loader-generator.html`，SHA-256：`c97538274e74041e50e9e8f11caa401d79072eeb0c733d372d14fa43fc8bd515`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/loader-generator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/button-generator

按钮样式生成器：CSS 按钮样式代码生成器

来源：`html-tools/tools/design/button-generator.html`，SHA-256：`8f43bca82c2863777a994057dd49af4445f4b7f6e33d44354084b451cc1e54fc`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/button-generator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/card-generator

卡片样式生成器：CSS 卡片组件样式生成器

来源：`html-tools/tools/design/card-generator.html`，SHA-256：`6326b688198e3c7e732321850ea0e9a14c17c62ff7bca9967baa832bba9dcc86`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/card-generator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/text-gradient-generator

文字渐变生成器：CSS 文字渐变效果生成器

来源：`html-tools/tools/design/text-gradient-generator.html`，SHA-256：`fb585bd8cc9a933843cdcfb516558712d11ea087a81f260d77b1f50de7aa102c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeValue, radiusValue, codeOutput |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | sizeValue, radiusValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color1` | 主色调 | color | "#a855f7" |  |
| `--color2` | 辅助色 | color | "#00f5d4" |  |
| `--size` | 大小 200px | range | "200" | min=50, max=300 |
| `--radius` | 圆角 8px | range | "8" | min=0, max=150 |

已检查示例：

```bash
html-tools design/text-gradient-generator update-preview --color1 '#a855f7' --color2 '#00f5d4' --size '200' --radius '8' --json
```

### design/aspect-ratio-calculator

Aspect Ratio Calculator：Aspect Ratio Calculator，在线使用，设计工具，浏览器本地运行无需上传

来源：`html-tools/tools/design/aspect-ratio-calculator.html`，SHA-256：`0322bc46ba3f9ed0a0ad63f11ff80b6468614313de0476ee000e9fa83ea20a27`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate-ratio` | calculateRatio | ratio, decimal, previewBox |
| `run` | 按字段输入重新计算 | ratio, decimal, previewBox |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--width` | 宽度 | number | "1920" |  |
| `--height` | 高度 | number | "1080" |  |
| `--target-width` | 目标宽度 | number | "" |  |
| `--target-height` | 目标高度 | number | "" |  |

已检查示例：

```bash
html-tools design/aspect-ratio-calculator calculate-ratio --width '1920' --height '1080' --target-width '10' --target-height '10' --json
```

### design/color-contrast-checker

Color Contrast Checker：Color Contrast Checker，在线使用，设计工具，浏览器本地运行无需上传

来源：`html-tools/tools/design/color-contrast-checker.html`，SHA-256：`6adfb050034b7214746522101be079c8f1eb53485326ebce8a45e590bec21180`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-check` | updateCheck | fgHex, bgHex, ratioValue, aaNormal, aaNormalText, aaLarge, aaLargeText, aaaNormal, aaaNormalText, aaaLarge, aaaLargeText |
| `run` | 按字段输入重新计算 | fgColor, fgHex, bgColor, bgHex, ratioValue, aaNormal, aaNormalText, aaLarge, aaLargeText, aaaNormal, aaaNormalText, aaaLarge, aaaLargeText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--fg-color` | fgColor | color | "#000000" |  |
| `--fg-hex` | 请输入文本输入框 | text | "#000000" |  |
| `--bg-color` | bgColor | color | "#ffffff" |  |
| `--bg-hex` | 请输入文本输入框 | text | "#ffffff" |  |

已检查示例：

```bash
html-tools design/color-contrast-checker update-check --fg-color '#000000' --fg-hex '#000000' --bg-color '#ffffff' --bg-hex '#ffffff' --json
```

### design/css-animation-generator

Css Animation Generator：Css Animation Generator，在线使用，设计工具，浏览器本地运行无需上传

来源：`html-tools/tools/design/css-animation-generator.html`，SHA-256：`da1dd7fd3bdccb5d403bc5f2fc4a217ee128268e347772ca4807d5dc12a41a03`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-animation` | updateAnimation | cssOutput |
| `run` | 按字段输入重新计算 | cssOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--anim-name` | 动画名称 | text | "myAnimation" |  |
| `--duration` | 持续时间 | select-one | "1s" | "0.3s" (0.3s); "0.5s" (0.5s); "1s" (1s); "1.5s" (1.5s); "2s" (2s); "3s" (3s) |
| `--easing` | 缓动函数 | select-one | "ease-in-out" | "ease" (ease); "ease-in" (ease-in); "ease-out" (ease-out); "ease-in-out" (ease-in-out); "linear" (linear); "cubic-bezier(0.68,-0.55,0.265,1.55)" (弹性) |
| `--iteration` | 循环次数 | select-one | "infinite" | "1" (1); "2" (2); "3" (3); "infinite" (无限) |
| `--direction` | 方向 | select-one | "alternate" | "normal" (normal); "reverse" (reverse); "alternate" (alternate); "alternate-reverse" (alternate-reverse) |
| `--fill-mode` | 填充模式 | select-one | "both" | "none" (none); "forwards" (forwards); "backwards" (backwards); "both" (both) |

已检查示例：

```bash
html-tools design/css-animation-generator update-animation --anim-name 'myAnimation' --duration '1s' --easing 'ease-in-out' --iteration 'infinite' --direction 'alternate' --fill-mode 'both' --json
```

### design/css-button-generator

Css Button Generator：Css Button Generator，在线使用，设计工具，浏览器本地运行无需上传

来源：`html-tools/tools/design/css-button-generator.html`，SHA-256：`70e8ef6b0d9347454543ff8d1af2e6f26c3683049d3cff0c1595113931b77115`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-button` | updateButton | fontSizeVal, paddingXVal, paddingYVal, radiusVal, borderWidthVal, output |
| `run` | 按字段输入重新计算 | fontSizeVal, paddingXVal, paddingYVal, radiusVal, borderWidthVal, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--btn-text` | 按钮文字 | text | "点击按钮" |  |
| `--bg-color` | 背景颜色 | color | "#0d6efd" |  |
| `--text-color` | 文字颜色 | color | "#ffffff" |  |
| `--border-color` | 边框颜色 | color | "#0d6efd" |  |
| `--font-size` | 字体大小: 16px | range | "16" | min=12, max=24 |
| `--padding-x` | 内边距 X: 24px | range | "24" | min=8, max=48 |
| `--padding-y` | 内边距 Y: 12px | range | "12" | min=4, max=24 |
| `--radius` | 圆角: 6px | range | "6" | min=0, max=50 |
| `--border-width` | 边框宽度: 1px | range | "1" | min=0, max=5 |
| `--font-weight` | 字重 | select-one | "500" | "400" (Normal); "500" (Medium); "600" (Semibold); "700" (Bold) |

已检查示例：

```bash
html-tools design/css-button-generator update-button --btn-text '点击按钮' --bg-color '#0d6efd' --text-color '#ffffff' --border-color '#0d6efd' --font-size '16' --padding-x '24' --padding-y '12' --radius '6' --border-width '1' --font-weight '500' --json
```

### design/css-clip-path-generator

Css Clip Path Generator：Css Clip Path Generator，在线使用，设计工具，浏览器本地运行无需上传

来源：`html-tools/tools/design/css-clip-path-generator.html`，SHA-256：`76bef23f66bed7dd1d89bc8d249cc9cfbb7fd0c54182143e1d0ed9ae3cbdf79b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-clip-path` | updateClipPath | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools design/css-clip-path-generator update-clip-path  --json
```

### design/css-transform-generator

Css Transform Generator：Css Transform Generator，在线使用，设计工具，浏览器本地运行无需上传

来源：`html-tools/tools/design/css-transform-generator.html`，SHA-256：`4ba87ea2acac7ed0755b3c20cef7e8a1369cb310a03fd3af5ec85d406910e9a5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-transform` | updateTransform | rotateVal, rotateXVal, rotateYVal, scaleVal, skewXVal, skewYVal, translateXVal, translateYVal, output |
| `run` | 按字段输入重新计算 | rotateVal, rotateXVal, rotateYVal, scaleVal, skewXVal, skewYVal, translateXVal, translateYVal, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--rotate` | 旋转 (rotate): 0deg | range | "0" | min=-180, max=180 |
| `--rotate-x` | X轴旋转 (rotateX): 0deg | range | "0" | min=-180, max=180 |
| `--rotate-y` | Y轴旋转 (rotateY): 0deg | range | "0" | min=-180, max=180 |
| `--scale` | 缩放 (scale): 1 | range | "1" | min=0.1, max=2 |
| `--skew-x` | X轴倾斜 (skewX): 0deg | range | "0" | min=-45, max=45 |
| `--skew-y` | Y轴倾斜 (skewY): 0deg | range | "0" | min=-45, max=45 |
| `--translate-x` | X轴平移 (translateX): 0px | range | "0" | min=-100, max=100 |
| `--translate-y` | Y轴平移 (translateY): 0px | range | "0" | min=-100, max=100 |

已检查示例：

```bash
html-tools design/css-transform-generator update-transform --rotate '0' --rotate-x '0' --rotate-y '0' --scale '1' --skew-x '0' --skew-y '0' --translate-x '0' --translate-y '0' --json
```

### design/font-preview

Font Preview：Font Preview，在线使用，设计工具，浏览器本地运行无需上传

来源：`html-tools/tools/design/font-preview.html`，SHA-256：`d059da715f2a95542ec22d367b08c01aa94605901446709ac5562c5018751869`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | fontSizeVal, previewArea, fontList |
| `run` | 按字段输入重新计算 | fontSizeVal, previewArea, fontList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--preview-text` | 输入预览文本... | text | "The quick brown fox jumps over the lazy dog. 敏捷的棕色狐狸跳过懒狗。" |  |
| `--font-size` | fontSize | range | "24" | min=12, max=72 |
| `--custom-font` | 自定义字体名称 | text | "" |  |

已检查示例：

```bash
html-tools design/font-preview update-preview --preview-text 'The quick brown fox jumps over the lazy dog. 敏捷的棕色狐狸跳过懒狗。' --font-size '24' --custom-font 'Hello world
Hello world
TypeScript' --json
```

### design/palette-generator

Palette Generator：Palette Generator，在线使用，设计工具，浏览器本地运行无需上传

来源：`html-tools/tools/design/palette-generator.html`，SHA-256：`6f86d26f933a8383121f6b5ad7720a5da83ed76fc75776e84ee2fc5298b35d12`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-palette` | generatePalette | palette, exportGrid |
| `run` | 按字段输入重新计算 | palette, exportGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--base-color` | 基准色 | color | "#667eea" |  |
| `--scheme` | 基准色 | select-one | "complementary" | "complementary" (互补色); "analogous" (类似色); "triadic" (三色组); "split" (分裂互补); "tetradic" (四色组); "monochromatic" (单色) |

已检查示例：

```bash
html-tools design/palette-generator generate-palette --base-color '#667eea' --scheme 'complementary' --json
```

### design/color-palette-generator

配色方案生成器(设计版)：生成协调的配色方案，支持多种配色规则

来源：`html-tools/tools/design/color-palette-generator.html`，SHA-256：`3864322ba86e1bd9f4084ae725af135d4ab121e0bf621f19340ac5ccc1bf3e55`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | generate | palette |
| `run` | 按字段输入重新计算 | palette |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--base-color` | 基础色 | color | "#4d9fff" |  |
| `--scheme-type` | 基础色 | select-one | "analogous" | "analogous" (类似色); "complementary" (互补色); "triadic" (三色组); "tetradic" (四色组); "monochromatic" (单色) |

已检查示例：

```bash
html-tools design/color-palette-generator generate --base-color '#4d9fff' --scheme-type 'analogous' --json
```

### art/color-mixer

颜色混合器(美术调色)：混合两种颜色，实时查看混合结果，支持RGB和HSL模式

来源：`html-tools/tools/art/color-mixer.html`，SHA-256：`d3f1e957943c4d69ba71ed79fa0ed954f0eb09784dd07b64c0e3a55154c54c3f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `mix-colors` | mixColors | ratioValue, hexValue, rgbValue, hslValue |
| `run` | 按字段输入重新计算 | inputA, textA, ratioValue, inputB, textB, hexValue, rgbValue, hslValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-a` | inputA | color | "#ff6b6b" |  |
| `--text-a` | #FF6B6B | text | "#ff6b6b" |  |
| `--ratio` | ratio | range | "50" | min=0, max=100 |
| `--input-b` | inputB | color | "#4ecdc4" |  |
| `--text-b` | #4ECDC4 | text | "#4ecdc4" |  |

已检查示例：

```bash
html-tools art/color-mixer mix-colors --input-a '#ff6b6b' --text-a '#ff6b6b' --ratio '50' --input-b '#4ecdc4' --text-b '#4ecdc4' --json
```

### design/color-name-finder

颜色名称查询器：按颜色查名称、按名称查颜色，匹配最接近的 CSS 命名色

来源：`html-tools/tools/design/color-name-finder.html`，SHA-256：`7c2b5bb307818321c04a9eb62b977a561f000d991b4c5b8ca57fa71c1ca87293`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | colorText, matchName, matchHex, matchBadge, matchDist, cnfGrid, colorCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color-picker` | colorPicker | color | "#3af0d8" |  |
| `--color-text` | #3af #33aaff rgb(51,170,255) | text | "" |  |
| `--grid-search` | 按名称过滤，如 blue、red… | text | "" |  |

已检查示例：

```bash
html-tools design/color-name-finder run --color-picker '#3af0d8' --color-text 'Hello world
Hello world
TypeScript' --grid-search 'Hello world
Hello world
TypeScript' --json
```

### design/color-temperature

色温转换器：开尔文色温与 RGB 颜色互转，预览暖光冷光的真实色彩

来源：`html-tools/tools/design/color-temperature.html`，SHA-256：`8046ab2af88020d573f4142cf1556c342243dbfc42a76e2a637a8a76744ca47e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `build-refs` | buildRefs | ctRefs |
| `run` | 按字段输入重新计算 | ctSlider, ctNumber, ctSwatchLabel, ctHex, ctRgb, numR, numG, numB |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--ct-slider` | ctSlider | range | "6500" | min=1000, max=12000 |
| `--ct-number` | ctNumber | number | "6500" | min=1000, max=12000 |

已检查示例：

```bash
html-tools design/color-temperature build-refs --ct-slider '6500' --ct-number '6500' --json
```

### design/oklch-color-editor

OKLCH / Display P3 颜色编辑器：以感知均匀的 OKLCH 颜色空间调色，实时预览 Display P3 宽色域色彩，并输出 CSS oklch() 函数代码。

来源：`html-tools/tools/design/oklch-color-editor.html`，SHA-256：`c2682b2ac5a5bf7906533675d357d3539ba58ae6c39fb4a3a495c7422421201f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-all` | updateAll | inputL, sliderL, inputC, sliderC, inputH, sliderH, inputA, sliderA, inputHex, swatchLabel, gamutBadge, outOklch, outP3, outRgb, outHex, outHsl, harmonySwatch |
| `update-harmony` | updateHarmony | harmonySwatch |
| `run` | 按字段输入重新计算 | inputL, sliderL, inputC, sliderC, inputH, sliderH, inputA, sliderA, inputHex, swatchLabel, gamutBadge, outOklch, outP3, outRgb, outHex, outHsl, harmonySwatch |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-l` | inputL | number | "0.65" | min=0, max=1 |
| `--slider-l` | sliderL | range | "0.65" | min=0, max=1 |
| `--input-c` | inputC | number | "0.2" | min=0, max=0.4 |
| `--slider-c` | sliderC | range | "0.2" | min=0, max=0.4 |
| `--input-h` | inputH | number | "210" | min=0, max=360 |
| `--slider-h` | sliderH | range | "210" | min=0, max=360 |
| `--input-a` | inputA | number | "1" | min=0, max=1 |
| `--slider-a` | sliderA | range | "1" | min=0, max=1 |
| `--input-hex` | #3b82f6 | text | "#00abd1" |  |
| `--harmony-select` | harmonySelect | select-one | "complementary" | "complementary" (互补色); "triadic" (三角配色); "analogous" (类比色); "split" (分裂互补); "tetradic" (四色配色) |

已检查示例：

```bash
html-tools design/oklch-color-editor update-all --input-l '0.65' --slider-l '0.65' --input-c '0.2' --slider-c '0.2' --input-h '210' --slider-h '210' --input-a '1' --slider-a '1' --input-hex '#00abd1' --harmony-select 'complementary' --json
```

操作限制：部分原页面操作未通过迁移检查: build-presets: 原工具没有产生可输出的结果，请检查参数

### design/screen-resolution-reference

设备屏幕分辨率参考：按设备类型（手机/平板/桌面）浏览主流设备的物理分辨率、逻辑分辨率（CSS 像素）、DPR 和视口尺寸，支持搜索过滤。

来源：`html-tools/tools/design/screen-resolution-reference.html`，SHA-256：`0e6816d1567bc5e2c789e68dd5b141db9f63aed6d42b4f91f39cb96947691594`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `detect-current-device` | detectCurrentDevice | bannerStats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools design/screen-resolution-reference detect-current-device  --json
```

操作限制：部分原页面操作未通过迁移检查: update-sort-headers: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### design/aurora-generator

极光背景生成器：高级 CSS 极光流动渐变背景生成器，支持自定义色彩、模糊度与动画速度，一键导出纯 CSS 代码。

来源：`html-tools/tools/design/aurora-generator.html`，SHA-256：`eec02d91eb846bd448be8e746ef73e4b1824b4e22c7bd2debd2ca43de5b20bdd`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-aurora` | updateAurora | val-bg, val-blur, val-opacity, val-speed, css-code |
| `run` | 按字段输入重新计算 | val-bg, val-blur, val-opacity, val-speed, css-code |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color-1` | color-1 | color | "#00f5d4" |  |
| `--color-2` | color-2 | color | "#9b5de5" |  |
| `--color-3` | color-3 | color | "#f15bb5" |  |
| `--color-4` | color-4 | color | "#fee440" |  |
| `--color-bg` | Background Base #0a0a0f | color | "#0a0a0f" |  |
| `--blur-slider` | Blur Radius 60px | range | "60" | min=20, max=150 |
| `--opacity-slider` | Opacity 0.8 | range | "0.8" | min=0.1, max=1 |
| `--speed-slider` | Animation Speed 1x | range | "1" | min=0.1, max=3 |

已检查示例：

```bash
html-tools design/aurora-generator update-aurora --color-1 '#00f5d4' --color-2 '#9b5de5' --color-3 '#f15bb5' --color-4 '#fee440' --color-bg '#0a0a0f' --blur-slider '60' --opacity-slider '0.8' --speed-slider '1' --json
```

## dev

### dev/easing-visualizer

缓动函数可视化：35+ 缓动函数可视化预览，支持 CSS/JS/Anime.js/GSAP 多格式导出

来源：`html-tools/tools/dev/easing-visualizer.html`，SHA-256：`bb9f8c47d9b958ec036816199e32f15692381c99e1f8e6016b21cc8cd3571c05`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-inputs` | updateInputs | inputX1, inputY1, inputX2, inputY2 |
| `update-canvas-info` | updateCanvasInfo | canvasInfo |
| `update-export` | updateExport | codeOutput |
| `run` | 按字段输入重新计算 | easingCanvas, canvasInfo, durationValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-x1` | x1 | number | "0.25" | min=0, max=1 |
| `--input-y1` | y1 | number | "0.10" | min=-2, max=2 |
| `--input-x2` | x2 | number | "0.25" | min=0, max=1 |
| `--input-y2` | y2 | number | "1.00" | min=-2, max=2 |
| `--duration-range` | 时长 | range | "1" | min=0.2, max=3 |
| `--comparison-toggle` / `--no-comparison-toggle` | 启用对比 | checkbox | true |  |

已检查示例：

```bash
html-tools dev/easing-visualizer update-inputs --input-x1 '0.25' --input-y1 '0.10' --input-x2 '0.25' --input-y2 '1.00' --duration-range '1' --comparison-toggle --json
```

操作限制：部分原页面操作未通过迁移检查: update-preset-buttons: 原工具没有产生可输出的结果，请检查参数 | update-animation-timing: 原工具没有产生可输出的结果，请检查参数

### dev/arrow-generator

箭头符号生成器：箭头符号生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/arrow-generator.html`，SHA-256：`8981ac0546b204a1c4a493fce2eb424c19dad0f342e033ebebe2982fd55464b3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-result` | updateResult | resultArrow, resultInfo |
| `update-custom-arrow` | updateCustomArrow | customPreview |
| `run` | 按字段输入重新计算 | customPreview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--left-part` | 请输入文本输入框 | text | "<" |  |
| `--body-part` | 请输入文本输入框 | text | "-" |  |
| `--body-length` | 请输入数字输入框 | number | "3" | min=0, max=20 |
| `--right-part` | 请输入文本输入框 | text | ">" |  |

已检查示例：

```bash
html-tools dev/arrow-generator update-result --left-part '<' --body-part '-' --body-length '3' --right-part '>' --json
```

### dev/ascii-art

ASCII 艺术：将文字转换为 ASCII 艺术字体

来源：`html-tools/tools/dev/ascii-art.html`，SHA-256：`00f23a4e42b23b70a842e84249d557ed7244706999c919d49ea876a85a3b41bb`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文字 (支持英文字母和数字) | text | "HELLO" |  |
| `--font-style` | 字体: Standard Banner Big Block Bubble Digital Lean Mini Script Shadow Slant Small SmSlant Doom | select-one | "standard" | "standard" (Standard); "banner" (Banner); "big" (Big); "block" (Block); "bubble" (Bubble); "digital" (Digital); "lean" (Lean); "mini" (Mini); "script" (Script); "shadow" (Shadow); "slant" (Slant); "small" (Small); "smslant" (SmSlant); "doom" (Doom) |

已检查示例：

```bash
html-tools dev/ascii-art generate --input 'HELLO' --font-style 'standard' --json
```

### dev/base64

Base64 编解码：Base64 编码与解码，支持文本和文件

来源：`html-tools/tools/dev/base64.html`，SHA-256：`6a8288f851fb02e6e46d8f478b84db80f4140b11d5f26ae6da7ffe6d1bf86a5e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `encode` | 编码 (Text → Base64) | output |
| `decode` | 解码 (Base64 → Text) | output |
| `run` | 按字段输入重新计算 | output, fileName |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入 | textarea | "" |  |
| `--file-input` | 选择文件 | file | "" |  |

已检查示例：

```bash
html-tools dev/base64 encode --input 'Hello world
Hello world
TypeScript' --file-input 'generated/fixtures/sample.txt' --json
```

### dev/basic-auth-generator

Basic Auth 生成器：生成 HTTP Basic Authentication 头部

来源：`html-tools/tools/dev/basic-auth-generator.html`，SHA-256：`349b09db7361fc4ff10aa744c3d519d64d96459966ec7dff8731f62f9de7f46b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 | base64Value, authHeader, curlCmd, fetchExample |
| `run` | 按字段输入重新计算 | base64Value, authHeader, curlCmd, fetchExample |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--username` | 用户名 | text | "" |  |
| `--password` | 密码 | text | "" |  |

已检查示例：

```bash
html-tools dev/basic-auth-generator generate --username 'Hello world
Hello world
TypeScript' --password 'Hello world
Hello world
TypeScript' --json
```

### dev/box-shadow

Box Shadow 生成器：可视化创建 CSS box-shadow，支持多层阴影和预设样式

来源：`html-tools/tools/dev/box-shadow.html`，SHA-256：`d91176545b9e4e6c46ac84565bf7abf28d227534415146c501e52c6108cbbd0e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-shadow-css` | generateShadowCSS | value |
| `update-preview` | updatePreview | codeOutput |
| `update-slider-display` | updateSliderDisplay | offsetXValue, offsetX, offsetYValue, offsetY, blurValue, blur, spreadValue, spread, opacityValue, opacity, shadowColor |
| `run` | 按字段输入重新计算 | codeOutput, layersList, offsetXValue, offsetYValue, blurValue, spreadValue, opacityValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--bg-color` | 背景色 | color | "#1a1a2e" |  |
| `--box-color` | 方块色 | color | "#3a3a5a" |  |
| `--box-size` | 尺寸 (px) | number | "160" | min=40, max=300 |
| `--box-radius` | 圆角 (px) | number | "16" | min=0, max=150 |
| `--offset-x` | offsetX | range | "0" | min=-100, max=100 |
| `--offset-y` | offsetY | range | "4" | min=-100, max=100 |
| `--blur` | blur | range | "12" | min=0, max=100 |
| `--spread` | spread | range | "0" | min=-50, max=50 |
| `--opacity` | opacity | range | "25" | min=0, max=100 |
| `--shadow-color` | 阴影颜色 | color | "#000000" |  |
| `--inset` / `--no-inset` | Inset | checkbox | false |  |

已检查示例：

```bash
html-tools dev/box-shadow generate-shadow-css --bg-color '#1a1a2e' --box-color '#3a3a5a' --box-size '160' --box-radius '16' --offset-x '0' --offset-y '4' --blur '12' --spread '0' --opacity '25' --shadow-color '#000000' --no-inset --json
```

### dev/browser-storage-viewer

浏览器存储查看器：查看和管理浏览器 LocalStorage、SessionStorage 和 Cookies

来源：`html-tools/tools/dev/browser-storage-viewer.html`，SHA-256：`b002064d20f30283200ec889b63d61715cc0678e76bd2b8cf5b684cdb3525b33`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-stats` | updateStats | totalItems, totalSize |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--search-box` | 搜索键名或值... | search | "" |  |

已检查示例：

```bash
html-tools dev/browser-storage-viewer update-stats --search-box 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/changelog-gen

CHANGELOG 生成器：CHANGELOG 生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/changelog-gen.html`，SHA-256：`6966518722def81ab9c7a3bbb56c47a8a63ae248944c2aff37c517cce0998a17`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--version` | 版本号 | text | "" |  |
| `--release-date` | 发布日期 | date | "2026-10-30" |  |
| `--change-type` | 变更类型 Added - 新增功能 Changed - 功能变更 Deprecated - 即将废弃 Removed - 已删除 Fixed - Bug修复 Security - 安全更新 | select-one | "added" | "added" (Added - 新增功能); "changed" (Changed - 功能变更); "deprecated" (Deprecated - 即将废弃); "removed" (Removed - 已删除); "fixed" (Fixed - Bug修复); "security" (Security - 安全更新) |
| `--change-desc` | 变更描述 | text | "" |  |

已检查示例：

```bash
html-tools dev/changelog-gen update-preview --version 'Hello world
Hello world
TypeScript' --release-date '2026-10-30' --change-type 'added' --change-desc 'Hello world
Hello world
TypeScript' --json
```

### dev/charset-converter

字符集转换器：文本编码转换，支持 UTF-8/16、Hex、URL 编码等格式

来源：`html-tools/tools/dev/charset-converter.html`，SHA-256：`56f0955283f41563e5c9d2a975a9b1497aafbe9ae5f16ccad0eaba6a3a171a86`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 转换 | output, hexBytes, charCount, byteCount, utf16Count, codepointCount, charTable |
| `run` | 按字段输入重新计算 | output, hexBytes, charCount, byteCount, utf16Count, codepointCount, charTable |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | textarea | "你好，世界！Hello, World!" |  |
| `--output-format` | outputFormat | select-one | "hex" | "hex" (十六进制 (Hex)); "decimal" (十进制); "binary" (二进制); "octal" (八进制); "utf8" (UTF-8 字节); "utf16" (UTF-16 码元); "codepoint" (Unicode 码点); "escape-js" (JS 转义); "escape-url" (URL 编码); "escape-html" (HTML 实体) |

已检查示例：

```bash
html-tools dev/charset-converter convert --input '你好，世界！Hello, World!' --output-format 'hex' --json
```

### dev/chmod-calculator

Chmod 计算器：Linux 文件权限计算，支持数字和符号模式互转

来源：`html-tools/tools/dev/chmod-calculator.html`，SHA-256：`d56d2438819cdf676017bb6e3fda37542a2e6216e80f5e5818bca4bc99ee0bf3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | calc | numeric, symbolic, command |
| `run` | 按字段输入重新计算 | numeric, symbolic, command |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--or` / `--no-or` | 读取 (r) = 4 | checkbox | true |  |
| `--ow` / `--no-ow` | 写入 (w) = 2 | checkbox | true |  |
| `--ox` / `--no-ox` | 执行 (x) = 1 | checkbox | true |  |
| `--gr` / `--no-gr` | 读取 (r) = 4 | checkbox | true |  |
| `--gw` / `--no-gw` | 写入 (w) = 2 | checkbox | false |  |
| `--gx` / `--no-gx` | 执行 (x) = 1 | checkbox | true |  |
| `--tr` / `--no-tr` | 读取 (r) = 4 | checkbox | true |  |
| `--tw` / `--no-tw` | 写入 (w) = 2 | checkbox | false |  |
| `--tx` / `--no-tx` | 执行 (x) = 1 | checkbox | true |  |

已检查示例：

```bash
html-tools dev/chmod-calculator calc --or --ow --ox --gr --no-gw --gx --tr --no-tw --tx --json
```

### dev/code-diff

代码对比工具：并排对比两段代码的差异，高亮显示变更

来源：`html-tools/tools/dev/code-diff.html`，SHA-256：`cdaa0cea578b32dbaf2c270fef3937c7c86fe2fd2a61f65e46d952c5352d2b58`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `compare` | 对比 | stats, diffTable |
| `run` | 按字段输入重新计算 | stats, diffTable |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--original` | 原始文本 | textarea | "" |  |
| `--modified` | 修改后文本 | textarea | "" |  |

已检查示例：

```bash
html-tools dev/code-diff compare --original 'Hello world
Hello world
TypeScript' --modified 'Hello world
Hello world
TypeScript' --json
```

### dev/code-stats

代码统计器：代码统计器，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/code-stats.html`，SHA-256：`5f82f06fda89444bf6807fdc3e7738c98a0e4ffd3cbe06f51dd2dc0a7d9059e6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze-code` | 分析代码 | totalLines, codeLines, commentLines, blankLines, totalChars, nonSpaceChars, wordCount, avgLineLength, maxLineLength, indentSpaces, functionCount, classCount, importCount, topKeywords |
| `run` | 按字段输入重新计算 | codeInput, totalLines, codeLines, commentLines, blankLines, totalChars, nonSpaceChars, wordCount, avgLineLength, maxLineLength, indentSpaces, functionCount, classCount, importCount, topKeywords |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--language-select` | languageSelect | select-one | "auto" | "auto" (自动检测语言); "javascript" (JavaScript); "typescript" (TypeScript); "python" (Python); "java" (Java); "c" (C/C++); "csharp" (C#); "go" (Go); "rust" (Rust); "php" (PHP); "ruby" (Ruby); "swift" (Swift); "kotlin" (Kotlin); "html" (HTML); "css" (CSS); "sql" (SQL); "shell" (Shell) |
| `--file-input` | 点击选择文件 | file | "" |  |
| `--code-input` | 代码内容 | textarea | "" |  |

已检查示例：

```bash
html-tools dev/code-stats analyze-code --language-select 'auto' --file-input 'generated/fixtures/sample.txt' --code-input 'Hello world
Hello world
TypeScript' --json
```

### dev/color-converter

颜色转换器：HEX、RGB、HSL 颜色格式互转，可视化调色

来源：`html-tools/tools/dev/color-converter.html`，SHA-256：`9a6e935382643bca9e3b138216189041ea0221a5e21a2920164918bef5112eb4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-display` | updateDisplay | previewText, colorPicker, hexInput, rgbInput, hslInput, rValue, rSlider, gValue, gSlider, bValue, bSlider |
| `run` | 按字段输入重新计算 | previewText, colorPicker, hexInput, rgbInput, hslInput, rValue, rSlider, gValue, gSlider, bValue, bSlider |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color-picker` | colorPicker | color | "#0d6efd" |  |
| `--hex-input` | #000000 | text | "#0d6efd" |  |
| `--rgb-input` | rgb(0, 0, 0) | text | "rgb(13, 110, 253)" |  |
| `--hsl-input` | hsl(0, 0%, 0%) | text | "hsl(216, 98%, 52%)" |  |
| `--r-slider` | R (红) 13 | range | "13" | min=0, max=255 |
| `--g-slider` | G (绿) 110 | range | "110" | min=0, max=255 |
| `--b-slider` | B (蓝) 253 | range | "253" | min=0, max=255 |

已检查示例：

```bash
html-tools dev/color-converter update-display --color-picker '#0d6efd' --hex-input '#0d6efd' --rgb-input 'rgb(13, 110, 253)' --hsl-input 'hsl(216, 98%, 52%)' --r-slider '13' --g-slider '110' --b-slider '253' --json
```

### dev/color-mixer

颜色混合器：两种颜色混合工具，支持多种混合模式和比例调节

来源：`html-tools/tools/dev/color-mixer.html`，SHA-256：`c35830cd57b5a5e17faa3555bb4c245e6f44efb858e6cd7afcfb1695b4c00a96`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `mix-colors` | mixColors | ratioLabel, resultPreview, resultHex, resultRgb, resultHsl |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color-a` | colorA | color | "#3b82f6" |  |
| `--hex-a` | #000000 | text | "#3b82f6" |  |
| `--mix-mode` | mixMode | select-one | "rgb" | "rgb" (RGB 混合); "hsl" (HSL 混合); "multiply" (正片叠底); "screen" (滤色) |
| `--color-b` | colorB | color | "#22c55e" |  |
| `--hex-b` | #000000 | text | "#22c55e" |  |
| `--ratio` | 颜色 A 50% 颜色 B | range | "50" | min=0, max=100 |

已检查示例：

```bash
html-tools dev/color-mixer mix-colors --color-a '#3b82f6' --hex-a '#3b82f6' --mix-mode 'rgb' --color-b '#22c55e' --hex-b '#22c55e' --ratio '50' --json
```

### dev/color-names

颜色命名查询：颜色命名查询，便捷查询，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/color-names.html`，SHA-256：`500579f971880e7543078bbd99c6cfd7a30f2cbf9b366f9940619b18902577b5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-colors` | filterColors | stats, colorGrid |
| `run` | 按字段输入重新计算 | stats, colorGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--sort-select` | sortSelect | select-one | "name" | "name" (按名称排序); "hue" (按色相排序); "lightness" (按亮度排序) |

已检查示例：

```bash
html-tools dev/color-names filter-colors --sort-select 'name' --json
```

### dev/color-palette-generator

调色板生成器：基于色彩理论生成和谐配色方案

来源：`html-tools/tools/dev/color-palette-generator.html`，SHA-256：`7f81207855955d07c3fd9fe0ee18ef1ac73868cdee32dda029d3e6b218396136`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-palette` | generatePalette | paletteDisplay |
| `update-from-picker` | updateFromPicker | hexInput, paletteDisplay |
| `update-from-hex` | updateFromHex | baseColor, paletteDisplay |
| `run` | 按字段输入重新计算 | baseColor, hexInput, paletteDisplay |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--base-color` | 选择颜色: | color | "#e91e63" |  |
| `--hex-input` | 选择颜色: | text | "#e91e63" |  |

已检查示例：

```bash
html-tools dev/color-palette-generator generate-palette --base-color '#e91e63' --hex-input '#e91e63' --json
```

操作限制：部分原页面操作未通过迁移检查: complementary: 原工具没有产生可输出的结果，请检查参数 | analogous: 原工具没有产生可输出的结果，请检查参数 | triadic: 原工具没有产生可输出的结果，请检查参数 | split: 原工具没有产生可输出的结果，请检查参数 | tetradic: 原工具没有产生可输出的结果，请检查参数 | monochromatic: 原工具没有产生可输出的结果，请检查参数

### dev/color-palette

配色方案生成器：生成配色方案和调色板

来源：`html-tools/tools/dev/color-palette.html`，SHA-256：`b977d5d1f5e61d8bad9c923634aacc54173de095c7d12ce5134827574d38f479`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成配色 | paletteGrid, output |
| `generate-palette` | generatePalette | paletteGrid, output |
| `update-hex-inputs` | updateHexInputs | primaryColor, secondaryColor |
| `run` | 按字段输入重新计算 | primaryColor, primaryHex, secondaryColor, secondaryHex, paletteGrid, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--primary-color` | primaryColor | color | "#00f5d4" |  |
| `--primary-hex` | 请输入文本输入框 | text | "#00f5d4" |  |
| `--secondary-color` | secondaryColor | color | "#4cc9f0" |  |
| `--secondary-hex` | 请输入文本输入框 | text | "#4cc9f0" |  |
| `--scheme-type` | 配色方案 | select-one | "analogous" | "analogous" (类似色); "complementary" (互补色); "triadic" (三色); "tetradic" (四色); "monochromatic" (单色); "shades" (渐变色) |
| `--color-count` | 颜色数量 | number | "5" | min=2, max=12 |
| `--saturation` | 饱和度 | number | "70" | min=0, max=100 |
| `--lightness` | 亮度 | number | "50" | min=0, max=100 |

已检查示例：

```bash
html-tools dev/color-palette generate --primary-color '#00f5d4' --primary-hex '#00f5d4' --secondary-color '#4cc9f0' --secondary-hex '#4cc9f0' --scheme-type 'analogous' --color-count '5' --saturation '70' --lightness '50' --json
```

### dev/contrast-checker

颜色对比度检查器：检查颜色对比度是否符合 WCAG 2.1 无障碍标准

来源：`html-tools/tools/dev/contrast-checker.html`，SHA-256：`d57e37b6504ba68501e5e5660b1e536acbe2fe9ce121bb22f9954314f63bda13`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-all` | updateAll | fgRgb, fgHsl, bgRgb, bgHsl, ratioValue, wcagGrid, suggestionsGrid |
| `run` | 按字段输入重新计算 | fgColorPicker, fgHexInput, fgRgb, fgHsl, bgColorPicker, bgHexInput, bgRgb, bgHsl, ratioValue, wcagGrid, suggestionsGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--fg-color-picker` | fgColorPicker | color | "#000000" |  |
| `--fg-hex-input` | #000000 | text | "#000000" |  |
| `--bg-color-picker` | bgColorPicker | color | "#ffffff" |  |
| `--bg-hex-input` | #FFFFFF | text | "#FFFFFF" |  |

已检查示例：

```bash
html-tools dev/contrast-checker update-all --fg-color-picker '#000000' --fg-hex-input '#000000' --bg-color-picker '#ffffff' --bg-hex-input '#FFFFFF' --json
```

操作限制：部分原页面操作未通过迁移检查: update-preview: 原工具没有产生可输出的结果，请检查参数

### dev/cron-generator

Cron 生成器：可视化生成 Cron 表达式

来源：`html-tools/tools/dev/cron-generator.html`，SHA-256：`78171f7ef4bceb046a6a9e9a7774224c9789a25014aa0043f1dcca41b04eab78`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-cron` | updateCron | cron, desc |
| `run` | 按字段输入重新计算 | cron, desc |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--minute` | 分钟 | text | "*" |  |
| `--hour` | 小时 | text | "*" |  |
| `--day` | 日 | text | "*" |  |
| `--month` | 月 | text | "*" |  |
| `--weekday` | 星期 | text | "*" |  |

已检查示例：

```bash
html-tools dev/cron-generator update-cron --minute '*' --hour '*' --day '*' --month '*' --weekday '*' --json
```

### dev/cron-parser

Cron 表达式解析器：Cron 表达式解析器，在线分析，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/cron-parser.html`，SHA-256：`8996da500b7cc4f0eb7edf08067ae3be58cd3a5094321cdb81243dde77e6ecc2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update` | update | minute, hour, day, month, weekday, description, nextRuns |
| `update-from-fields` | updateFromFields | fullCron, minute, hour, day, month, weekday, description, nextRuns |
| `run` | 按字段输入重新计算 | fullCron, minute, hour, day, month, weekday, description, nextRuns |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--full-cron` | 输入完整Cron表达式 | text | "0 0 * * *" |  |
| `--minute` | 分钟 | text | "0" |  |
| `--hour` | 小时 | text | "0" |  |
| `--day` | 日 | text | "*" |  |
| `--month` | 月 | text | "*" |  |
| `--weekday` | 星期 | text | "*" |  |

已检查示例：

```bash
html-tools dev/cron-parser update --full-cron '0 0 * * *' --minute '0' --hour '0' --day '*' --month '*' --weekday '*' --json
```

### dev/crontab-generator

Crontab 生成器：Crontab 生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/crontab-generator.html`，SHA-256：`84a6e92de0f3e8dfa1fa2875937ea26ebb00893e0c11148813fefddfc6faa226`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-cron` | updateCron | cronValue, cronDesc, nextRuns |
| `run` | 按字段输入重新计算 | cronValue, cronDesc, nextRuns |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--minute` | 分钟 | text | "*" |  |
| `--hour` | 小时 | text | "*" |  |
| `--day` | 日期 | text | "*" |  |
| `--month` | 月份 | text | "*" |  |
| `--weekday` | 星期 | text | "*" |  |

已检查示例：

```bash
html-tools dev/crontab-generator update-cron --minute '*' --hour '*' --day '*' --month '*' --weekday '*' --json
```

### dev/css-animation-generator

CSS 动画生成器：可视化生成 CSS 动画和关键帧代码

来源：`html-tools/tools/dev/css-animation-generator.html`，SHA-256：`98e984698fe2b41f7cf638d3ae098204627a364f508953b3d8ee34d5b209f140`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-animation` | updateAnimation | durationVal, delayVal, codeOutput |
| `run` | 按字段输入重新计算 | durationVal, delayVal, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--anim-name` | 动画名称 | text | "myAnimation" |  |
| `--duration` | duration | range | "1" | min=0.1, max=5 |
| `--delay` | delay | range | "0" | min=0, max=3 |
| `--easing` | 缓动函数 | select-one | "ease" | "ease" (ease); "linear" (linear); "ease-in" (ease-in); "ease-out" (ease-out); "ease-in-out" (ease-in-out); "cubic-bezier(0.68, -0.55, 0.265, 1.55)" (elastic) |
| `--iteration` | 循环次数 | select-one | "infinite" | "1" (1); "2" (2); "3" (3); "infinite" (无限) |
| `--direction` | 播放方向 | select-one | "normal" | "normal" (正向); "reverse" (反向); "alternate" (交替); "alternate-reverse" (反向交替) |
| `--fill-mode` | 填充模式 | select-one | "both" | "none" (none); "forwards" (forwards); "backwards" (backwards); "both" (both) |
| `--field-8` | 动画名称 | text | "translateY(0)" |  |
| `--field-9` | 动画名称 | text | "1" |  |
| `--field-10` | 动画名称 | text | "translateY(-30px)" |  |
| `--field-11` | 动画名称 | text | "1" |  |
| `--field-12` | 动画名称 | text | "translateY(0)" |  |
| `--field-13` | 动画名称 | text | "1" |  |

已检查示例：

```bash
html-tools dev/css-animation-generator update-animation --anim-name 'myAnimation' --duration '1' --delay '0' --easing 'ease' --iteration 'infinite' --direction 'normal' --fill-mode 'both' --field-8 'translateY(0)' --field-9 '1' --field-10 'translateY(-30px)' --field-11 '1' --field-12 'translateY(0)' --field-13 '1' --json
```

### dev/css-border-radius

Border Radius 生成器：CSS 圆角可视化生成器

来源：`html-tools/tools/dev/css-border-radius.html`，SHA-256：`976d8a572af60a76bfa818a77e5ffba29081e1ccd5a3865c33014db23480ba84`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | output |
| `run` | 按字段输入重新计算 | tl-h, tl-h-val, tl-v, tl-v-val, tr-h, tr-h-val, tr-v, tr-v-val, bl-h, bl-h-val, bl-v, bl-v-val, br-h, br-h-val, br-v, br-v-val, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--linked` / `--no-linked` | 🔗 同步所有圆角 | checkbox | true |  |
| `--tl-h` | H | range | "16" | min=0, max=100 |
| `--tl-v` | V | range | "16" | min=0, max=100 |
| `--tr-h` | H | range | "16" | min=0, max=100 |
| `--tr-v` | V | range | "16" | min=0, max=100 |
| `--bl-h` | H | range | "16" | min=0, max=100 |
| `--bl-v` | V | range | "16" | min=0, max=100 |
| `--br-h` | H | range | "16" | min=0, max=100 |
| `--br-v` | V | range | "16" | min=0, max=100 |

已检查示例：

```bash
html-tools dev/css-border-radius render --linked --tl-h '16' --tl-v '16' --tr-h '16' --tr-v '16' --bl-h '16' --bl-v '16' --br-h '16' --br-v '16' --json
```

### dev/css-box-shadow

CSS 盒子阴影生成器：可视化生成 CSS box-shadow 阴影效果，支持多层阴影

来源：`html-tools/tools/dev/css-box-shadow.html`，SHA-256：`9ecf6dcfcd0fd0f5168d10d2c20b8534807fd53c387daf2042cfad7d29ab88e9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-shadow` | updateShadow | output, offsetXVal, offsetYVal, blurVal, spreadVal, opacityVal |
| `run` | 按字段输入重新计算 | output, offsetXVal, offsetYVal, blurVal, spreadVal, opacityVal |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--offset-x` | offsetX | range | "0" | min=-100, max=100 |
| `--offset-y` | offsetY | range | "10" | min=-100, max=100 |
| `--blur` | blur | range | "30" | min=0, max=100 |
| `--spread` | spread | range | "0" | min=-50, max=50 |
| `--color` | 透明度 | color | "#000000" |  |
| `--opacity` | 透明度 | range | "20" | min=0, max=100 |
| `--inset` / `--no-inset` | 内阴影 (inset) | checkbox | false |  |

已检查示例：

```bash
html-tools dev/css-box-shadow update-shadow --offset-x '0' --offset-y '10' --blur '30' --spread '0' --color '#000000' --opacity '20' --no-inset --json
```

### dev/css-clip-path

CSS Clip-path 生成器：CSS Clip-path 生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/css-clip-path.html`，SHA-256：`eed61e087798bd2d58c7067d55993b8ffe7364544e8fa6efb655d052a3d188cb`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-shape` | updateShape | codeOutput |
| `update-polygon-sides` | updatePolygonSides | polygonSidesVal, codeOutput |
| `run` | 按字段输入重新计算 | polygonSidesVal, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--image-input` | imageInput | file | "" |  |
| `--circle-radius` | circleRadius | range | "50" | min=0, max=100 |
| `--circle-cx` | circleCx | range | "50" | min=0, max=100 |
| `--circle-cy` | circleCy | range | "50" | min=0, max=100 |
| `--ellipse-rx` | ellipseRx | range | "50" | min=0, max=100 |
| `--ellipse-ry` | ellipseRy | range | "35" | min=0, max=100 |
| `--ellipse-cx` | ellipseCx | range | "50" | min=0, max=100 |
| `--ellipse-cy` | ellipseCy | range | "50" | min=0, max=100 |
| `--inset-top` | insetTop | range | "10" | min=0, max=50 |
| `--inset-right` | insetRight | range | "10" | min=0, max=50 |
| `--inset-bottom` | insetBottom | range | "10" | min=0, max=50 |
| `--inset-left` | insetLeft | range | "10" | min=0, max=50 |
| `--inset-radius` | insetRadius | range | "10" | min=0, max=50 |
| `--polygon-sides` | polygonSides | range | "4" | min=3, max=12 |

已检查示例：

```bash
html-tools dev/css-clip-path update-shape --image-input 'generated/fixtures/sample.txt' --circle-radius '50' --circle-cx '50' --circle-cy '50' --ellipse-rx '50' --ellipse-ry '35' --ellipse-cx '50' --ellipse-cy '50' --inset-top '10' --inset-right '10' --inset-bottom '10' --inset-left '10' --inset-radius '10' --polygon-sides '4' --json
```

### dev/css-formatter

CSS 格式化：CSS 代码格式化和压缩

来源：`html-tools/tools/dev/css-formatter.html`，SHA-256：`9f5afab8daadd103d144ed6363265198e00963d5863c002d7afe2cff81e827ed`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format` | 格式化 | output |
| `minify` | 压缩 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--indent` | 缩进: 2 空格 4 空格 Tab | select-one | "2" | "2" (2 空格); "4" (4 空格); "tab" (Tab) |
| `--input` | 在此粘贴 CSS 代码... | textarea | "" |  |

已检查示例：

```bash
html-tools dev/css-formatter format --indent '2' --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/css-grid-generator

CSS Grid 生成器 | 在线工具：CSS Grid 生成器 | 在线工具，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/css-grid-generator.html`，SHA-256：`f0ff082b77bfd3705a54e9346b92432f2a44c26a2a417812cf5f3d2bf1f3e7f1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-grid` | updateGrid | cssCode |
| `update-item-count` | updateItemCount | gridPreview, cssCode |
| `generate-code` | generateCode | cssCode |
| `run` | 按字段输入重新计算 | gridPreview, cssCode |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` | 列定义 (grid-template-columns) | text | "1fr" |  |
| `--field-2` | 列定义 (grid-template-columns) | text | "1fr" |  |
| `--field-3` | 列定义 (grid-template-columns) | text | "1fr" |  |
| `--field-4` | 列定义 (grid-template-columns) | text | "auto" |  |
| `--field-5` | 列定义 (grid-template-columns) | text | "auto" |  |
| `--column-gap` | 列间距 (column-gap) | text | "10px" |  |
| `--row-gap` | 行间距 (row-gap) | text | "10px" |  |
| `--justify-items` | justify-items | select-one | "stretch" | "stretch" (stretch); "start" (start); "end" (end); "center" (center) |
| `--align-items` | align-items | select-one | "stretch" | "stretch" (stretch); "start" (start); "end" (end); "center" (center) |
| `--item-count` | 子项数量 | number | "6" | min=1, max=20 |
| `--item-col-start` | 起始 | text | "" |  |
| `--item-col-end` | 结束 | text | "" |  |
| `--item-row-start` | 起始 | text | "" |  |
| `--item-row-end` | 结束 | text | "" |  |

已检查示例：

```bash
html-tools dev/css-grid-generator update-grid --field-1 '1fr' --field-2 '1fr' --field-3 '1fr' --field-4 'auto' --field-5 'auto' --column-gap '10px' --row-gap '10px' --justify-items 'stretch' --align-items 'stretch' --item-count '6' --item-col-start 'Hello world
Hello world
TypeScript' --item-col-end 'Hello world
Hello world
TypeScript' --item-row-start 'Hello world
Hello world
TypeScript' --item-row-end 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: update-item-style: 原工具没有产生可输出的结果，请检查参数

### dev/css-grid

CSS Grid 生成器：CSS Grid 生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/css-grid.html`，SHA-256：`d44511fb79b8ba17099a7576944292c60a49c68631dfd9b9446653a19e6ed45f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update` | update | output |
| `update-item` | updateItem | output |
| `generate-output` | generateOutput | output |
| `run` | 按字段输入重新计算 | output, gridColumn, gridRow |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--columns` | grid-template-columns | text | "1fr 1fr 1fr" |  |
| `--rows` | grid-template-rows | text | "1fr 1fr 1fr" |  |
| `--gap` | gap | text | "8px" |  |
| `--justify-items` | justify-items | select-one | "stretch" | "stretch" (stretch); "start" (start); "end" (end); "center" (center) |
| `--align-items` | align-items | select-one | "stretch" | "stretch" (stretch); "start" (start); "end" (end); "center" (center) |
| `--justify-content` | justify-content | select-one | "start" | "start" (start); "end" (end); "center" (center); "space-between" (space-between); "space-around" (space-around); "space-evenly" (space-evenly) |
| `--align-content` | align-content | select-one | "start" | "start" (start); "end" (end); "center" (center); "space-between" (space-between); "space-around" (space-around); "space-evenly" (space-evenly) |
| `--selected-item` | 选择项目 | select-one | "1" | "1" (项目 1); "2" (项目 2); "3" (项目 3); "4" (项目 4); "5" (项目 5); "6" (项目 6); "7" (项目 7); "8" (项目 8); "9" (项目 9) |
| `--grid-column` | grid-column | text | "auto" |  |
| `--grid-row` | grid-row | text | "auto" |  |

已检查示例：

```bash
html-tools dev/css-grid update --columns '1fr 1fr 1fr' --rows '1fr 1fr 1fr' --gap '8px' --justify-items 'stretch' --align-items 'stretch' --justify-content 'start' --align-content 'start' --selected-item '1' --grid-column 'auto' --grid-row 'auto' --json
```

操作限制：部分原页面操作未通过迁移检查: update-item-select: 原工具没有产生可输出的结果，请检查参数

### dev/css-minifier

CSS 压缩/美化工具：CSS 压缩/美化工具，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/css-minifier.html`，SHA-256：`9151062e6a5400b090fe39949e277003a6d548349df1bd401149faa25e1c3160`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `minify-css` | 压缩 | original-size, minified-size, savings, gzip-estimate, input-stats, css-output, output-stats |
| `beautify-css` | 美化 | original-size, minified-size, savings, gzip-estimate, input-stats, css-output, output-stats |
| `update-stats` | updateStats | input-stats, output-stats |
| `run` | 按字段输入重新计算 | input-stats, output-stats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--opt-remove-comments` / `--no-opt-remove-comments` | 移除注释 | checkbox | true |  |
| `--opt-remove-whitespace` / `--no-opt-remove-whitespace` | 移除空白 | checkbox | true |  |
| `--opt-remove-semicolon` / `--no-opt-remove-semicolon` | 移除末尾分号 | checkbox | true |  |
| `--opt-shorten-colors` / `--no-opt-shorten-colors` | 简化颜色值 | checkbox | true |  |
| `--opt-shorten-zero` / `--no-opt-shorten-zero` | 简化零值 | checkbox | true |  |
| `--opt-merge-selectors` / `--no-opt-merge-selectors` | 合并相同选择器 | checkbox | false |  |
| `--css-input` | CSS 输入 | textarea | "/* 主容器样式 */\n.container {\n    width: 100%;\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 20px;\n}\n\n/* 头部样式 */\n.header {\n    background-color: #ffffff;\n    border-bottom: 1px solid #eeeeee;\n    padding: 15px 0;\n}\n\n.header .logo {\n    font-size: 24px;\n    font-weight: bold;\n    color: #333333;\n}\n\n/* 导航样式 */\n.nav {\n    display: flex;\n    gap: 20px;\n}\n\n.nav-link {\n    color: #666666;\n    text-decoration: none;\n    padding: 10px 15px;\n    border-radius: 4px;\n    transition: all 0.3s ease;\n}\n\n.nav-link:hover {\n    background-color: #f5f5f5;\n    color: #000000;\n}\n\n.nav-link.active {\n    background-color: #007bff;\n    color: #ffffff;\n}\n\n/* 按钮样式 */\n.btn {\n    display: inline-block;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    font-size: 14px;\n    transition: all 0.2s ease;\n}\n\n.btn-primary {\n    background-color: #007bff;\n    color: #ffffff;\n}\n\n.btn-primary:hover {\n    background-color: #0056b3;\n}\n\n/* 响应式 */\n@media (max-width: 768px) {\n    .container {\n        padding: 10px;\n    }\n    \n    .nav {\n        flex-direction: column;\n        gap: 10px;\n    }\n}" |  |

已检查示例：

```bash
html-tools dev/css-minifier minify-css --opt-remove-comments --opt-remove-whitespace --opt-remove-semicolon --opt-shorten-colors --opt-shorten-zero --no-opt-merge-selectors --css-input '/* 主容器样式 */
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* 头部样式 */
.header {
    background-color: #ffffff;
    border-bottom: 1px solid #eeeeee;
    padding: 15px 0;
}

.header .logo {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
}

/* 导航样式 */
.nav {
    display: flex;
    gap: 20px;
}

.nav-link {
    color: #666666;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.nav-link:hover {
    background-color: #f5f5f5;
    color: #000000;
}

.nav-link.active {
    background-color: #007bff;
    color: #ffffff;
}

/* 按钮样式 */
.btn {
    display: inline-block;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
}

.btn-primary {
    background-color: #007bff;
    color: #ffffff;
}

.btn-primary:hover {
    background-color: #0056b3;
}

/* 响应式 */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    .nav {
        flex-direction: column;
        gap: 10px;
    }
}' --json
```

### dev/css-selector-test

CSS 选择器测试器：CSS 选择器测试器，在线验证，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/css-selector-test.html`，SHA-256：`2d360a57be2b7fc1ac27358132ed65f5f748b46f4acc9cd05e5a2d1eef5d2e07`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `test-selector` | 测试 | matchCount |
| `update-preview` | updatePreview | previewContainer |
| `run` | 按字段输入重新计算 | previewContainer, matchCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--html-input` | HTML 代码 | textarea | "<div id=\"main\" class=\"container\">\n    <header class=\"header\">\n        <h2>网站标题</h2>\n        <nav>\n            <ul class=\"nav-list\">\n                <li class=\"item active\"><a href=\"#\">首页</a></li>\n                <li class=\"item\"><a href=\"#\">产品</a></li>\n                <li class=\"item\"><a href=\"#\">关于</a></li>\n            </ul>\n        </nav>\n    </header>\n    <main class=\"content\">\n        <article class=\"post\">\n            <h2 class=\"title\">文章标题</h2>\n            <p class=\"intro\">这是第一段文字。</p>\n            <p>这是第二段文字。</p>\n            <button class=\"btn btn-primary\">主要按钮</button>\n            <button class=\"btn btn-secondary\">次要按钮</button>\n        </article>\n    </main>\n    <footer>\n        <p>&copy; 2024 示例网站</p>\n    </footer>\n</div>" |  |
| `--selector-input` | 输入 CSS 选择器（如：div.class, #id, ul > li） | text | "" |  |

已检查示例：

```bash
html-tools dev/css-selector-test test-selector --html-input '<div id="main" class="container">
    <header class="header">
        <h2>网站标题</h2>
        <nav>
            <ul class="nav-list">
                <li class="item active"><a href="#">首页</a></li>
                <li class="item"><a href="#">产品</a></li>
                <li class="item"><a href="#">关于</a></li>
            </ul>
        </nav>
    </header>
    <main class="content">
        <article class="post">
            <h2 class="title">文章标题</h2>
            <p class="intro">这是第一段文字。</p>
            <p>这是第二段文字。</p>
            <button class="btn btn-primary">主要按钮</button>
            <button class="btn btn-secondary">次要按钮</button>
        </article>
    </main>
    <footer>
        <p>&copy; 2024 示例网站</p>
    </footer>
</div>' --selector-input 'Hello world
Hello world
TypeScript' --json
```

### dev/css-sprites

CSS雪碧图生成器：合并图片生成雪碧图

来源：`html-tools/tools/dev/css-sprites.html`，SHA-256：`8262f7062ff9f289332ebfaa727cd613a5c808400ddf00ab914ce3697c13feca`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-sprite` | 生成雪碧图 | cssCode, htmlCode |
| `run` | 按字段输入重新计算 | imageCount, imagesGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--layout` | 排列方式 | select-one | "horizontal" | "horizontal" (水平排列); "vertical" (垂直排列); "packed" (紧凑排列) |
| `--padding` | 图片间距 (px) | number | "2" | min=0, max=50 |
| `--prefix` | CSS类名前缀 | text | "sprite" |  |
| `--format` | 输出格式 | select-one | "png" | "png" (PNG); "jpeg" (JPEG); "webp" (WebP) |

已检查示例：

```bash
html-tools dev/css-sprites generate-sprite --file-input 'generated/fixtures/sample.png' --layout 'horizontal' --padding '2' --prefix 'sprite' --format 'png' --json
```

操作限制：部分原页面操作未通过迁移检查: export-sprite: 原工具没有产生可输出的结果，请检查参数

### dev/css-text-shadow

CSS Text Shadow 生成器：CSS Text Shadow 生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/css-text-shadow.html`，SHA-256：`51a5f1a4421cca19f4671f7fb05f4a3d27fe2fc460980e2f269a15a3e376d765`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-shadow` | updateShadow | codeOutput |
| `update-preview-text` | updatePreviewText | previewText |
| `run` | 按字段输入重新计算 | offsetXValue-0, offsetYValue-0, blurValue-0, opacityValue-0, colorText-0, previewText, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` | 快速预设 | range | "2" | min=-50, max=50 |
| `--field-2` | 快速预设 | range | "2" | min=-50, max=50 |
| `--field-3` | 快速预设 | range | "4" | min=0, max=50 |
| `--field-4` | 快速预设 | range | "50" | min=0, max=100 |
| `--field-5` | 快速预设 | color | "#000000" |  |
| `--color-text-0` | colorText-0 | text | "#000000" |  |
| `--preview-content` | 预览文字 | text | "Text" |  |
| `--font-size` | 字体大小 | range | "72" | min=24, max=150 |
| `--text-color` | 文字颜色 | color | "#333333" |  |

已检查示例：

```bash
html-tools dev/css-text-shadow update-shadow --field-1 '2' --field-2 '2' --field-3 '4' --field-4 '50' --field-5 '#000000' --color-text-0 '#000000' --preview-content 'Text' --font-size '72' --text-color '#333333' --json
```

### dev/css-transform

CSS Transform 生成器：CSS Transform 生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/css-transform.html`，SHA-256：`cb507585c0e1cfaf8be356bfc19a8aff224c4c7f204e7e0c3dd78d730a6d0915`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-transform` | updateTransform | translateXValue, translateYValue, rotateValue, scaleXValue, scaleYValue, skewXValue, skewYValue, perspectiveValue, rotateXValue, rotateYValue, rotateZValue, translateZValue, codeOutput |
| `update-origin` | updateOrigin | translateXValue, translateYValue, rotateValue, scaleXValue, scaleYValue, skewXValue, skewYValue, perspectiveValue, rotateXValue, rotateYValue, rotateZValue, translateZValue, originXValue, originYValue, codeOutput |
| `run` | 按字段输入重新计算 | translateXValue, translateYValue, rotateValue, scaleXValue, scaleYValue, skewXValue, skewYValue, perspectiveValue, rotateXValue, rotateYValue, rotateZValue, translateZValue, originXValue, originYValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--translate-x` | translateX | range | "0" | min=-200, max=200 |
| `--translate-y` | translateY | range | "0" | min=-200, max=200 |
| `--rotate` | rotate | range | "0" | min=-180, max=180 |
| `--scale-x` | scaleX | range | "1" | min=0, max=3 |
| `--scale-y` | scaleY | range | "1" | min=0, max=3 |
| `--skew-x` | skewX | range | "0" | min=-60, max=60 |
| `--skew-y` | skewY | range | "0" | min=-60, max=60 |
| `--perspective` | perspective | range | "800" | min=100, max=2000 |
| `--rotate-x` | rotateX | range | "0" | min=-180, max=180 |
| `--rotate-y` | rotateY | range | "0" | min=-180, max=180 |
| `--rotate-z` | rotateZ | range | "0" | min=-180, max=180 |
| `--translate-z` | translateZ | range | "0" | min=-300, max=300 |
| `--origin-x` | X: 50% | range | "50" | min=0, max=100 |
| `--origin-y` | Y: 50% | range | "50" | min=0, max=100 |

已检查示例：

```bash
html-tools dev/css-transform update-transform --translate-x '0' --translate-y '0' --rotate '0' --scale-x '1' --scale-y '1' --skew-x '0' --skew-y '0' --perspective '800' --rotate-x '0' --rotate-y '0' --rotate-z '0' --translate-z '0' --origin-x '50' --origin-y '50' --json
```

### dev/css-unit-converter

CSS 单位转换器：CSS 单位转换器，多格式互转，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/css-unit-converter.html`，SHA-256：`b4c5efa7955238a8b716eaeeb21a426e1647639bd08c8040b27b8815832e648b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | results, formula |
| `run` | 按字段输入重新计算 | results, formula |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--root-font-size` | 根字体大小 (html font-size) | number | "16" | min=1 |
| `--parent-font-size` | 父元素字体大小 (em 基准) | number | "16" | min=1 |
| `--viewport-width` | 视口宽度 (px) | number | "1920" | min=1 |
| `--viewport-height` | 视口高度 (px) | number | "1080" | min=1 |
| `--input-value` | 请输入数字输入框 | number | "16" |  |
| `--input-unit` | inputUnit | select-one | "px" | "px" (px); "rem" (rem); "em" (em); "vw" (vw); "vh" (vh); "vmin" (vmin); "vmax" (vmax); "percent" (%); "pt" (pt); "cm" (cm); "mm" (mm); "in" (in) |

已检查示例：

```bash
html-tools dev/css-unit-converter convert --root-font-size '16' --parent-font-size '16' --viewport-width '1920' --viewport-height '1080' --input-value '16' --input-unit 'px' --json
```

### dev/cubic-bezier

Cubic Bezier 编辑器：Cubic Bezier 编辑器，在线编辑，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/cubic-bezier.html`，SHA-256：`febc82675ecad703b0cabf49112cf0603632b41463b7e95463dd8ecdac11a8bd`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-inputs` | updateInputs | x1, y1, x2, y2 |
| `update-code` | updateCode | codeOutput |
| `run` | 按字段输入重新计算 | bezierCanvas, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--x1` | x1 | number | "0.25" | min=0, max=1 |
| `--y1` | y1 | number | "0.10" | min=-1, max=2 |
| `--x2` | x2 | number | "0.25" | min=0, max=1 |
| `--y2` | y2 | number | "1.00" | min=-1, max=2 |

已检查示例：

```bash
html-tools dev/cubic-bezier update-inputs --x1 '0.25' --y1 '0.10' --x2 '0.25' --y2 '1.00' --json
```

操作限制：部分原页面操作未通过迁移检查: update-preset-buttons: 原工具没有产生可输出的结果，请检查参数

### dev/diff-viewer

Git Diff 查看器：解析并美化显示 Git diff 输出，支持文件统计

来源：`html-tools/tools/dev/diff-viewer.html`，SHA-256：`777b93fdd800e6556cd6ae46acd64b50bb627f2f7e37c2cfcc7c015c97f437d4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `compare` | 对比差异 | addCount, removeCount, sameCount, splitView, unifiedView |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text1` | 输入原始文本... | textarea | "Hello World\nThis is line 2\nThis line will be removed\nLine 4 stays the same\nOld line five" |  |
| `--text2` | 输入修改后的文本... | textarea | "Hello World\nThis is line 2 modified\nLine 4 stays the same\nNew line five\nAdded new line" |  |

已检查示例：

```bash
html-tools dev/diff-viewer compare --text1 'Hello World
This is line 2
This line will be removed
Line 4 stays the same
Old line five' --text2 'Hello World
This is line 2 modified
Line 4 stays the same
New line five
Added new line' --json
```

### dev/docker-compose-gen

Docker Compose 生成器：Docker Compose 生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/docker-compose-gen.html`，SHA-256：`49706e37efc476453a606288ab0cb7e9ef216bb255d8046fe0f380da10578c83`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-output` | generateOutput | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--compose-version` | Compose 版本 3.9 3.8 3.7 3 2.4 | select-one | "3.9" | "3.9" (3.9); "3.8" (3.8); "3.7" (3.7); "3" (3); "2.4" (2.4) |

已检查示例：

```bash
html-tools dev/docker-compose-gen generate-output --compose-version '3.9' --json
```

### dev/docker-compose-generator

Docker Compose 生成器 | 在线工具：Docker Compose 生成器 | 在线工具，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/docker-compose-generator.html`，SHA-256：`c7480fabe3b81271532b597544ddc4e18d3e8c90b740ab9d1821848f78d31e2c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-output` | generateOutput | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--service-name` | 服务名称 | text | "" |  |
| `--service-image` | 镜像 | text | "" |  |
| `--container-name` | 容器名称 | text | "" |  |
| `--restart-policy` | 重启策略 | select-one | "" | "" (无); "no" (no); "always" (always); "on-failure" (on-failure); "unless-stopped" (unless-stopped) |
| `--depends-on` | 依赖服务 | text | "" |  |

已检查示例：

```bash
html-tools dev/docker-compose-generator generate-output --service-name 'Hello world
Hello world
TypeScript' --service-image 'Hello world
Hello world
TypeScript' --container-name 'Hello world
Hello world
TypeScript' --restart-policy 'no' --depends-on 'Hello world
Hello world
TypeScript' --json
```

### dev/dockerfile-generator

Dockerfile 生成器：Dockerfile 生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/dockerfile-generator.html`，SHA-256：`c8044208760017cb0d9196c980803705d1b0daf0c7a4857d0a37e92166cc432d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--base-image` | 基础镜像 | select-one | "node:20-alpine" | "node:20-alpine" (node:20-alpine); "node:20-slim" (node:20-slim); "node:20" (node:20); "python:3.12-alpine" (python:3.12-alpine); "python:3.12-slim" (python:3.12-slim); "python:3.12" (python:3.12); "golang:1.22-alpine" (golang:1.22-alpine); "golang:1.22" (golang:1.22); "openjdk:21-slim" (openjdk:21-slim); "maven:3.9-eclipse-temurin-21" (maven:3.9-eclipse-temurin-21); "nginx:alpine" (nginx:alpine); "nginx:latest" (nginx:latest); "alpine:3.19" (alpine:3.19); "ubuntu:22.04" (ubuntu:22.04); "debian:bookworm-slim" (debian:bookworm-slim) |
| `--workdir` | 工作目录 | text | "/app" |  |
| `--port` | 暴露端口 | text | "3000" |  |
| `--cmd` | 启动命令 | text | "node server.js" |  |
| `--env-vars` | 环境变量 (每行一个: KEY=value) | textarea | "NODE_ENV=production" |  |
| `--run-commands` | 额外依赖安装 | textarea | "" |  |
| `--use-multi-stage` / `--no-use-multi-stage` | 多阶段构建 | checkbox | true |  |
| `--non-root` / `--no-non-root` | 非 root 用户 | checkbox | true |  |
| `--health-check` / `--no-health-check` | 健康检查 | checkbox | true |  |

已检查示例：

```bash
html-tools dev/dockerfile-generator generate --base-image 'node:20-alpine' --workdir '/app' --port '3000' --cmd 'node server.js' --env-vars 'NODE_ENV=production' --run-commands 'Hello world
Hello world
TypeScript' --use-multi-stage --non-root --health-check --json
```

### dev/editorconfig-gen

editorconfig 生成器：editorconfig 生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/editorconfig-gen.html`，SHA-256：`8746550f5b1750fe360ab6ba6ea38dfcdb0d19879a2c02d1b5b07166920c4e57`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | preview |
| `run` | 按字段输入重新计算 | preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--root-flag` / `--no-root-flag` | root = true (标记为根配置文件) | checkbox | true |  |
| `--pattern` | 文件匹配模式 例如: *, *.js, *.{js,ts}, Makefile | text | "" |  |
| `--indent-style` | 缩进风格 不设置 space (空格) tab (制表符) | select-one | "" | "" (不设置); "space" (space (空格)); "tab" (tab (制表符)) |
| `--indent-size` | 缩进大小 不设置 2 4 8 tab | select-one | "" | "" (不设置); "2" (2); "4" (4); "8" (8); "tab" (tab) |
| `--end-of-line` | 换行符 不设置 lf (Unix/Mac) crlf (Windows) cr (旧 Mac) | select-one | "" | "" (不设置); "lf" (lf (Unix/Mac)); "crlf" (crlf (Windows)); "cr" (cr (旧 Mac)) |
| `--charset` | 字符集 不设置 utf-8 utf-8-bom utf-16be utf-16le latin1 | select-one | "" | "" (不设置); "utf-8" (utf-8); "utf-8-bom" (utf-8-bom); "utf-16be" (utf-16be); "utf-16le" (utf-16le); "latin1" (latin1) |
| `--trim-trailing` | 末尾空白 不设置 移除 保留 | select-one | "" | "" (不设置); "true" (移除); "false" (保留) |
| `--insert-final-newline` | 末尾换行 不设置 插入 不插入 | select-one | "" | "" (不设置); "true" (插入); "false" (不插入) |
| `--max-line-length` | 最大行长度 | number | "" | min=0 |

已检查示例：

```bash
html-tools dev/editorconfig-gen update-preview --root-flag --pattern '\w+' --indent-style 'space' --indent-size '2' --end-of-line 'lf' --charset 'utf-8' --trim-trailing 'true' --insert-final-newline 'true' --max-line-length '10' --json
```

### dev/emoji-picker

Emoji 选择器：浏览和复制各种 Emoji 表情符号

来源：`html-tools/tools/dev/emoji-picker.html`，SHA-256：`9d85f3952fe18aa0719935dd098d7e50d982607f021d9bcb953c364c1d2408ef`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | resultCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--search` | 搜索 Emoji... (如: smile, heart, fire) | search | "" |  |

已检查示例：

```bash
html-tools dev/emoji-picker run --search 'Hello world
Hello world
TypeScript' --json
```

### dev/env-editor

.env 文件编辑器：.env 文件编辑器，在线编辑，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/env-editor.html`，SHA-256：`86f4a75d3402fc3149055bb2eabd077d5c65a96684251258b2fde63b7eb6b7fe`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse-env` | 解析 | textStats, tableStats, envTableBody |
| `sort-env` | 排序 | textStats, envText, tableStats, envTableBody |
| `update-stats` | updateStats | textStats, tableStats |
| `run` | 按字段输入重新计算 | textStats, envText, tableStats, envTableBody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--env-text` | 粘贴.env文件内容或手动输入... # 数据库配置 DB_HOST=localhost DB_PORT=3306 DB_NAME=myapp # API配置 API_KEY=your_api_key_here API_SECRET=your_secret | textarea | "DB_HOST=localhost\nDB_PORT=3306\nDB_USER=root\nDB_PASSWORD=secret123\nDB_NAME=myapp\n\nAPI_URL=https://api.example.com\nAPI_KEY=sk_test_abc123\nAPI_SECRET=your_secret_key\n\nNODE_ENV=development\nDEBUG=true\nPORT=3000" |  |
| `--field-2` | .env 格式 | text | "DB_HOST" |  |
| `--field-3` | .env 格式 | text | "localhost" |  |
| `--field-4` | .env 格式 | text | "DB_PORT" |  |
| `--field-5` | .env 格式 | text | "3306" |  |
| `--field-6` | .env 格式 | text | "DB_USER" |  |
| `--field-7` | .env 格式 | text | "root" |  |
| `--field-8` | .env 格式 | text | "DB_PASSWORD" |  |
| `--field-9` | .env 格式 | text | "secret123" |  |
| `--field-10` | .env 格式 | text | "DB_NAME" |  |
| `--field-11` | .env 格式 | text | "myapp" |  |
| `--field-12` | .env 格式 | text | "API_URL" |  |
| `--field-13` | .env 格式 | text | "https://api.example.com" |  |
| `--field-14` | .env 格式 | text | "API_KEY" |  |
| `--field-15` | .env 格式 | text | "sk_test_abc123" |  |
| `--field-16` | .env 格式 | text | "API_SECRET" |  |
| `--field-17` | .env 格式 | text | "your_secret_key" |  |
| `--field-18` | .env 格式 | text | "NODE_ENV" |  |
| `--field-19` | .env 格式 | text | "development" |  |
| `--field-20` | .env 格式 | text | "DEBUG" |  |
| `--field-21` | .env 格式 | text | "true" |  |
| `--field-22` | .env 格式 | text | "PORT" |  |
| `--field-23` | .env 格式 | text | "3000" |  |
| `--new-key` | 变量名 | text | "" |  |
| `--new-value` | 值 | text | "" |  |
| `--format` | .env 格式 | radio | "env" | "env" (.env 格式); "json" (JSON 格式); "yaml" (YAML 格式); "shell" (Shell export); "docker" (Docker -e 参数) |

已检查示例：

```bash
html-tools dev/env-editor parse-env --env-text 'DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=secret123
DB_NAME=myapp

API_URL=https://api.example.com
API_KEY=sk_test_abc123
API_SECRET=your_secret_key

NODE_ENV=development
DEBUG=true
PORT=3000' --field-2 'DB_HOST' --field-3 'localhost' --field-4 'DB_PORT' --field-5 '3306' --field-6 'DB_USER' --field-7 'root' --field-8 'DB_PASSWORD' --field-9 'secret123' --field-10 'DB_NAME' --field-11 'myapp' --field-12 'API_URL' --field-13 'https://api.example.com' --field-14 'API_KEY' --field-15 'sk_test_abc123' --field-16 'API_SECRET' --field-17 'your_secret_key' --field-18 'NODE_ENV' --field-19 'development' --field-20 'DEBUG' --field-21 'true' --field-22 'PORT' --field-23 '3000' --new-key 'Hello world
Hello world
TypeScript' --new-value 'Hello world
Hello world
TypeScript' --format 'env' --json
```

### dev/excel-viewer

Excel 预览器：Excel 预览器，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/excel-viewer.html`，SHA-256：`38371d337f1667a36b33f7b010a33ae311d0d7102d8a7a49474908dd4c6502e4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | fileName, fileSize, sheetTabs, dataTable, stats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools dev/excel-viewer run --file-input 'generated/fixtures/sample.xlsx' --json
```

操作限制：部分原页面操作未通过迁移检查: search-table: 原工具没有产生可输出的结果，请检查参数

### dev/flexbox-playground

Flexbox 可视化编辑器：可视化调整 Flexbox 布局属性，实时预览效果

来源：`html-tools/tools/dev/flexbox-playground.html`，SHA-256：`9d41a47cce98af4ea467b03320b0a1e8d12cf24593f364e1aab43b7997233b34`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | codeOutput |
| `run` | 按字段输入重新计算 | codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--flex-direction` | flex-direction | select-one | "row" | "row" (row); "row-reverse" (row-reverse); "column" (column); "column-reverse" (column-reverse) |
| `--flex-wrap` | flex-wrap | select-one | "nowrap" | "nowrap" (nowrap); "wrap" (wrap); "wrap-reverse" (wrap-reverse) |
| `--justify-content` | justify-content | select-one | "flex-start" | "flex-start" (flex-start); "flex-end" (flex-end); "center" (center); "space-between" (space-between); "space-around" (space-around); "space-evenly" (space-evenly) |
| `--align-items` | align-items | select-one | "stretch" | "stretch" (stretch); "flex-start" (flex-start); "flex-end" (flex-end); "center" (center); "baseline" (baseline) |
| `--align-content` | align-content | select-one | "stretch" | "stretch" (stretch); "flex-start" (flex-start); "flex-end" (flex-end); "center" (center); "space-between" (space-between); "space-around" (space-around) |
| `--gap` | gap (px) | number | "10" | min=0, max=100 |
| `--item-count` | 数量 (1-6) | number | "4" | min=1, max=6 |

已检查示例：

```bash
html-tools dev/flexbox-playground update-preview --flex-direction 'row' --flex-wrap 'nowrap' --justify-content 'flex-start' --align-items 'stretch' --align-content 'stretch' --gap '10' --item-count '4' --json
```

### dev/git-cheatsheet

Git 命令速查：常用 Git 命令速查表

来源：`html-tools/tools/dev/git-cheatsheet.html`，SHA-256：`b583642862ab78398a918cfd9b1c64d5a46a142497ab900456c27692f76313fe`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | content |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--search` | 搜索命令或描述... | search | "" |  |

已检查示例：

```bash
html-tools dev/git-cheatsheet run --search 'Hello world
Hello world
TypeScript' --json
```

### dev/github-actions-generator

GitHub Actions 生成器：GitHub Actions 生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/github-actions-generator.html`，SHA-256：`1552c15777ef3d3c7f5e3ba7c7d5d8c59e3d7bee99e0c9c48b23e9d305ff38cc`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--workflow-name` | 工作流名称 | text | "CI" |  |
| `--branches` | 触发分支 | text | "main, master" |  |
| `--node-versions` | Node.js 版本（多版本用逗号分隔） | text | "18, 20" |  |
| `--runs-on` | 运行环境 | select-one | "ubuntu-latest" | "ubuntu-latest" (ubuntu-latest); "ubuntu-22.04" (ubuntu-22.04); "ubuntu-20.04" (ubuntu-20.04); "macos-latest" (macos-latest); "windows-latest" (windows-latest) |
| `--enable-cache` / `--no-enable-cache` | 启用依赖缓存 | checkbox | true |  |
| `--enable-lint` / `--no-enable-lint` | 运行 Lint 检查 | checkbox | true |  |
| `--enable-test` / `--no-enable-test` | 运行测试 | checkbox | true |  |
| `--enable-build` / `--no-enable-build` | 运行构建 | checkbox | true |  |
| `--enable-coverage` / `--no-enable-coverage` | 上传测试覆盖率 | checkbox | false |  |
| `--enable-artifact` / `--no-enable-artifact` | 上传构建产物 | checkbox | false |  |

已检查示例：

```bash
html-tools dev/github-actions-generator generate --workflow-name 'CI' --branches 'main, master' --node-versions '18, 20' --runs-on 'ubuntu-latest' --enable-cache --enable-lint --enable-test --enable-build --no-enable-coverage --no-enable-artifact --json
```

### dev/glassmorphism

Glassmorphism 生成器：Glassmorphism 毛玻璃效果 CSS 代码生成器

来源：`html-tools/tools/dev/glassmorphism.html`，SHA-256：`d8969c5c90862c3637da2bd571518b2b00406744a55b524d42679509eb2031e2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-glass` | updateGlass | codeOutput, blurValue, opacityValue, bgColorText, borderWidthValue, borderOpacityValue, borderColorText, radiusValue, shadowXValue, shadowYValue, shadowBlurValue, shadowSpreadValue, shadowOpacityValue |
| `run` | 按字段输入重新计算 | codeOutput, blurValue, opacityValue, bgColor, bgColorText, borderWidthValue, borderOpacityValue, borderColor, borderColorText, radiusValue, shadowXValue, shadowYValue, shadowBlurValue, shadowSpreadValue, shadowOpacityValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--blur-range` | 模糊程度 10px | range | "10" | min=0, max=30 |
| `--opacity-range` | 透明度 0.25 | range | "25" | min=0, max=100 |
| `--bg-color` | bgColor | color | "#ffffff" |  |
| `--bg-color-text` | 请输入文本输入框 | text | "#ffffff" |  |
| `--border-width-range` | 边框宽度 1px | range | "1" | min=0, max=5 |
| `--border-opacity-range` | 边框透明度 0.18 | range | "18" | min=0, max=100 |
| `--border-color` | borderColor | color | "#ffffff" |  |
| `--border-color-text` | 请输入文本输入框 | text | "#ffffff" |  |
| `--radius-range` | 圆角 16px | range | "16" | min=0, max=50 |
| `--shadow-toggle` / `--no-shadow-toggle` |  | checkbox | true |  |
| `--shadow-x-range` | 水平偏移 0px | range | "0" | min=-30, max=30 |
| `--shadow-y-range` | 垂直偏移 8px | range | "8" | min=-30, max=30 |
| `--shadow-blur-range` | 阴影模糊 32px | range | "32" | min=0, max=100 |
| `--shadow-spread-range` | 阴影扩展 0px | range | "0" | min=-20, max=20 |
| `--shadow-opacity-range` | 阴影透明度 0.37 | range | "37" | min=0, max=100 |

已检查示例：

```bash
html-tools dev/glassmorphism update-glass --blur-range '10' --opacity-range '25' --bg-color '#ffffff' --bg-color-text '#ffffff' --border-width-range '1' --border-opacity-range '18' --border-color '#ffffff' --border-color-text '#ffffff' --radius-range '16' --shadow-toggle --shadow-x-range '0' --shadow-y-range '8' --shadow-blur-range '32' --shadow-spread-range '0' --shadow-opacity-range '37' --json
```

### dev/glob-tester

Glob 模式测试：Glob 模式匹配测试

来源：`html-tools/tools/dev/glob-tester.html`，SHA-256：`4aa5a3e88832f91e0b90f608a9f6f1729e383434242043957d11a5a3a11bbe8e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run-test` | runTest | explanation, totalCount, matchedCount, unmatchedCount, resultsList |
| `run` | 按字段输入重新计算 | explanation, totalCount, matchedCount, unmatchedCount, resultsList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--pattern` | 输入 glob 模式，如 **/*.js | text | "" |  |
| `--paths` | 文件路径（每行一个） | textarea | "" |  |

已检查示例：

```bash
html-tools dev/glob-tester run-test --pattern '\w+' --paths 'Hello world
Hello world
TypeScript' --json
```

### dev/graphql-builder

GraphQL 查询构建器：GraphQL 查询构建器，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/graphql-builder.html`，SHA-256：`52961b4306b1883aad4306b5ef623bb4efb7732b0af37650c41bec640ac1d378`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-query` | generateQuery | queryOutput, variablesOutput, curlOutput |
| `generate-curl` | generateCurl | curlOutput |
| `format-query` | formatQuery | queryOutput, variablesOutput, curlOutput |
| `run` | 按字段输入重新计算 | queryOutput, variablesOutput, curlOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--schema-input` | 粘贴 Schema (SDL) | textarea | "" |  |
| `--operation-name` | 操作名称 | text | "" |  |
| `--alias-input` | 粘贴 Schema (SDL) | text | "" |  |
| `--field-4` | 粘贴 Schema (SDL) | text | "" |  |
| `--field-5` | 粘贴 Schema (SDL) | text | "" |  |
| `--endpoint` | GraphQL Endpoint | text | "https://api.example.com/graphql" |  |

已检查示例：

```bash
html-tools dev/graphql-builder generate-query --schema-input 'Hello world
Hello world
TypeScript' --operation-name 'Hello world
Hello world
TypeScript' --alias-input 'Hello world
Hello world
TypeScript' --field-4 'Hello world
Hello world
TypeScript' --field-5 'Hello world
Hello world
TypeScript' --endpoint 'https://api.example.com/graphql' --json
```

操作限制：部分原页面操作未通过迁移检查: parse-schema: 原工具没有产生可输出的结果，请检查参数

### dev/hash-generator

Hash 生成器：计算文本或文件的 MD5、SHA-1、SHA-256、SHA-512 哈希值

来源：`html-tools/tools/dev/hash-generator.html`，SHA-256：`0a20ceb7e7e48d04e01f85b2ff80b2a167fc22e998dd13dac1bff55078f25613`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `hash` | 计算 Hash | md5, sha1, sha256, sha512 |
| `calculate-hash` | calculateHash | md5, sha1, sha256, sha512 |
| `run` | 按字段输入重新计算 | md5, sha1, sha256, sha512, fileName, fileMd5, fileSha1, fileSha256, fileSha512 |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | textarea | "" |  |
| `--encoding` | 编码: | select-one | "utf8" | "utf8" (UTF-8); "ascii" (ASCII) |
| `--output-case` | 输出格式: | select-one | "lower" | "lower" (小写); "upper" (大写) |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools dev/hash-generator hash --input 'Hello world
Hello world
TypeScript' --encoding 'utf8' --output-case 'lower' --file-input 'generated/fixtures/sample.txt' --json
```

### dev/hex-viewer

Hex 查看器：以十六进制查看文件或文本内容

来源：`html-tools/tools/dev/hex-viewer.html`，SHA-256：`8410b37798f4038b8e17f51de8dd6c3885c56c290a4f1f52980aa365427d714d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | textInput, byteCount, lineCount, hexOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--text-input` | 输入文本或选择文件... | textarea | "" |  |

已检查示例：

```bash
html-tools dev/hex-viewer run --file-input 'generated/fixtures/sample.txt' --text-input 'Hello world
Hello world
TypeScript' --json
```

### dev/hmac-generator

HMAC 生成器：生成 HMAC 消息认证码，支持多种哈希算法

来源：`html-tools/tools/dev/hmac-generator.html`，SHA-256：`598b874cd1e4cc3964c556a7d6ffaf78fc161f4bcba2e82b1db53077f0d28a7c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 HMAC | result |
| `generate-hmac` | generateHMAC | result |
| `run` | 按字段输入重新计算 | result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--algorithm` | 算法: HMAC-SHA256 HMAC-SHA1 HMAC-SHA384 HMAC-SHA512 | select-one | "SHA-256" | "SHA-256" (HMAC-SHA256); "SHA-1" (HMAC-SHA1); "SHA-384" (HMAC-SHA384); "SHA-512" (HMAC-SHA512) |
| `--output-format` | 输出格式: Hex (小写) Hex (大写) Base64 | select-one | "hex" | "hex" (Hex (小写)); "HEX" (Hex (大写)); "base64" (Base64) |
| `--key-input` | 密钥 (Secret Key) | text | "" |  |
| `--msg-input` | 消息 (Message) | textarea | "" |  |

已检查示例：

```bash
html-tools dev/hmac-generator generate --algorithm 'SHA-256' --output-format 'hex' --key-input 'Hello world
Hello world
TypeScript' --msg-input 'Hello world
Hello world
TypeScript' --json
```

### dev/htaccess-nginx

htaccess转Nginx：Apache htaccess转Nginx配置

来源：`html-tools/tools/dev/htaccess-nginx.html`，SHA-256：`e2e4b59a023827d8d616c61bd7b3f4db5f7030499a3c17ad486c2a06cdcac501`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 🔄 转换 | nginxOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--htaccess-input` | 粘贴.htaccess内容... | textarea | "RewriteEngine On\nRewriteBase /\n\n# Redirect to HTTPS\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n# Remove trailing slash\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule ^(.*)/$ /$1 [L,R=301]\n\n# Front controller\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule ^(.*)$ index.php [L,QSA]\n\n# Cache static files\n<FilesMatch \"\\.(jpg\|jpeg\|png\|gif\|ico\|css\|js)$\">\n    Header set Cache-Control \"max-age=31536000, public\"\n</FilesMatch>" |  |

已检查示例：

```bash
html-tools dev/htaccess-nginx convert --htaccess-input 'RewriteEngine On
RewriteBase /

# Redirect to HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove trailing slash
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1 [L,R=301]

# Front controller
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php [L,QSA]

# Cache static files
<FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>' --json
```

### dev/html-entities

HTML 实体参考：HTML 实体字符参考表，支持搜索和复制

来源：`html-tools/tools/dev/html-entities.html`，SHA-256：`286661baac83d6604e31dfebfe764a2ebd482a8a8ea85c7032d51801880992bc`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-entities` | filterEntities | stats, entitiesGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools dev/html-entities filter-entities  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/html-entity

HTML 实体编解码：HTML 实体编码与解码，常用实体参考

来源：`html-tools/tools/dev/html-entity.html`，SHA-256：`c0f0f8ec85dd584de1c70488653d0bc93998150e24dbbea76df1d69bfb47195b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `encode` | 编码 | output |
| `decode` | 解码 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入 | textarea | "" |  |

已检查示例：

```bash
html-tools dev/html-entity encode --input 'Hello world
Hello world
TypeScript' --json
```

### dev/html-formatter

HTML 格式化：HTML 代码格式化、压缩和美化

来源：`html-tools/tools/dev/html-formatter.html`，SHA-256：`a957d392a61b1c8cdf1815024ea8446e9c118dc1b6031a11610eb6bf402372c0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format` | 格式化 | output, inputStats, outputStats, ratio |
| `minify` | 压缩 | output, inputStats, outputStats, ratio |
| `update-stats` | updateStats | inputStats, outputStats |
| `run` | 按字段输入重新计算 | inputStats, outputStats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--indent-type` | 缩进: 空格 Tab | select-one | "space" | "space" (空格); "tab" (Tab) |
| `--indent-size` | 缩进大小: | number | "2" | min=1, max=8 |
| `--wrap-attributes` / `--no-wrap-attributes` | 属性换行 | checkbox | false |  |
| `--preserve-newlines` / `--no-preserve-newlines` | 保留空行 | checkbox | true |  |
| `--input` | 输入 HTML | textarea | "" |  |

已检查示例：

```bash
html-tools dev/html-formatter format --indent-type 'space' --indent-size '2' --no-wrap-attributes --preserve-newlines --input 'Hello world
Hello world
TypeScript' --json
```

### dev/html-minify

HTML 压缩：压缩 HTML 代码

来源：`html-tools/tools/dev/html-minify.html`，SHA-256：`86f014b3ddcb3f008328ad3760b7e721f113cd9286835d8b37d0b8e7df6b2b9f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `minify` | 📦 压缩 | inputSize, outputSize, output, originalSize, compressedSize, savedSize, savedPercent |
| `run` | 按字段输入重新计算 | inputSize, outputSize, output, originalSize, compressedSize, savedSize, savedPercent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--remove-comments` / `--no-remove-comments` | 移除注释 | checkbox | true |  |
| `--remove-whitespace` / `--no-remove-whitespace` | 压缩空白 | checkbox | true |  |
| `--remove-newlines` / `--no-remove-newlines` | 移除换行 | checkbox | true |  |
| `--remove-quotes` / `--no-remove-quotes` | 移除可选引号 | checkbox | false |  |
| `--input` | 输入 HTML | textarea | "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <!-- 页面标题 -->\n    <title>示例页面 - WebUtils</title>\n    <style>\n        body {\n            margin: 0;\n            padding: 20px;\n        }\n    </style>\n</head>\n<body>\n    <!-- 主要内容 -->\n    <div class=\"container\">\n        <h2>Hello World</h2>\n        <p>这是一个示例段落。</p>\n    </div>\n    \n    <!-- JavaScript -->\n    <script>\n        console.log(\"Hello\");\n    </script>\n</body>\n</html>" |  |

已检查示例：

```bash
html-tools dev/html-minify minify --remove-comments --remove-whitespace --remove-newlines --no-remove-quotes --input '<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 页面标题 -->
    <title>示例页面 - WebUtils</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
        }
    </style>
</head>
<body>
    <!-- 主要内容 -->
    <div class="container">
        <h2>Hello World</h2>
        <p>这是一个示例段落。</p>
    </div>
    
    <!-- JavaScript -->
    <script>
        console.log("Hello");
    </script>
</body>
</html>' --json
```

### dev/html-table-generator

HTML 表格生成器：HTML 表格生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/html-table-generator.html`，SHA-256：`22fc78947d5af3cb89cffcc8158ff63207a3d8025d3d634278d6251d463d8e01`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-code` | generateCode | codeOutput, previewSection |
| `generate-html` | generateHTML | value |
| `generate-markdown` | generateMarkdown | value |
| `generate-csv` | generateCSV | value |
| `update-preview` | updatePreview | previewSection |
| `run` | 按字段输入重新计算 | editableTable, codeOutput, previewSection |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--rows` | 行数 | number | "4" | min=1, max=50 |
| `--cols` | 列数 | number | "4" | min=1, max=20 |
| `--has-header` | 包含表头 | select-one | "true" | "true" (是); "false" (否) |
| `--output-format` | 输出格式 | select-one | "html" | "html" (HTML); "markdown" (Markdown); "csv" (CSV) |
| `--field-5` | 包含表头 | text | "标题 1" |  |
| `--field-6` | 包含表头 | text | "标题 2" |  |
| `--field-7` | 包含表头 | text | "标题 3" |  |
| `--field-8` | 包含表头 | text | "标题 4" |  |
| `--field-9` | 包含表头 | text | "内容 2-1" |  |
| `--field-10` | 包含表头 | text | "内容 2-2" |  |
| `--field-11` | 包含表头 | text | "内容 2-3" |  |
| `--field-12` | 包含表头 | text | "内容 2-4" |  |
| `--field-13` | 包含表头 | text | "内容 3-1" |  |
| `--field-14` | 包含表头 | text | "内容 3-2" |  |
| `--field-15` | 包含表头 | text | "内容 3-3" |  |
| `--field-16` | 包含表头 | text | "内容 3-4" |  |
| `--field-17` | 包含表头 | text | "内容 4-1" |  |
| `--field-18` | 包含表头 | text | "内容 4-2" |  |
| `--field-19` | 包含表头 | text | "内容 4-3" |  |
| `--field-20` | 包含表头 | text | "内容 4-4" |  |

已检查示例：

```bash
html-tools dev/html-table-generator generate-code --rows '4' --cols '4' --has-header 'true' --output-format 'html' --field-5 '标题 1' --field-6 '标题 2' --field-7 '标题 3' --field-8 '标题 4' --field-9 '内容 2-1' --field-10 '内容 2-2' --field-11 '内容 2-3' --field-12 '内容 2-4' --field-13 '内容 3-1' --field-14 '内容 3-2' --field-15 '内容 3-3' --field-16 '内容 3-4' --field-17 '内容 4-1' --field-18 '内容 4-2' --field-19 '内容 4-3' --field-20 '内容 4-4' --json
```

### dev/html-template

HTML 模板生成器：生成 HTML5 页面模板，支持多种布局和 CSS 框架

来源：`html-tools/tools/dev/html-template.html`，SHA-256：`45acccda02a8cfeb4c304f270c17dfd850c5e38bf388015380d5eb0ce7703ae4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-btn` | 生成代码 | output |
| `format-btn` | 🎨 格式化 | output |
| `generate` | generate | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--page-title` | 页面标题 | text | "我的页面" |  |
| `--page-desc` | 页面描述 | text | "" |  |
| `--page-author` | 作者 | text | "" |  |
| `--opt-viewport` / `--no-opt-viewport` | Viewport Meta | checkbox | true |  |
| `--opt-charset` / `--no-opt-charset` | UTF-8 编码 | checkbox | true |  |
| `--opt-favicon` / `--no-opt-favicon` | Favicon | checkbox | false |  |
| `--opt-og` / `--no-opt-og` | Open Graph 标签 | checkbox | false |  |
| `--opt-twitter` / `--no-opt-twitter` | Twitter Card | checkbox | false |  |
| `--opt-canonical` / `--no-opt-canonical` | Canonical URL | checkbox | false |  |
| `--css-framework` | cssFramework | select-one | "none" | "none" (无); "pico" (Pico CSS); "bootstrap" (Bootstrap 5); "tailwind" (Tailwind CSS); "bulma" (Bulma); "normalize" (Normalize.css) |
| `--lib-alpine` / `--no-lib-alpine` | Alpine.js | checkbox | false |  |
| `--lib-vue` / `--no-lib-vue` | Vue 3 CDN | checkbox | false |  |
| `--lib-j-query` / `--no-lib-j-query` | jQuery | checkbox | false |  |
| `--lib-axios` / `--no-lib-axios` | Axios | checkbox | false |  |

已检查示例：

```bash
html-tools dev/html-template generate-btn --page-title '我的页面' --page-desc 'Hello world
Hello world
TypeScript' --page-author 'Hello world
Hello world
TypeScript' --opt-viewport --opt-charset --no-opt-favicon --no-opt-og --no-opt-twitter --no-opt-canonical --css-framework 'none' --no-lib-alpine --no-lib-vue --no-lib-j-query --no-lib-axios --json
```

### dev/html-to-jsx

HTML 转 JSX/React 转换器：HTML 转 JSX/React 转换器，多格式互转，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/html-to-jsx.html`，SHA-256：`0dc3cfbe9fb261943b771bb80b6c6ea2086d920b3f6a67e347bdfdfa51298ef8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert-to-jsx` | 转换 | input-stats, jsx-output, output-stats |
| `update-stats` | updateStats | input-stats, output-stats |
| `run` | 按字段输入重新计算 | input-stats, jsx-output, output-stats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--opt-component` / `--no-opt-component` | 生成完整组件 | checkbox | true |  |
| `--opt-typescript` / `--no-opt-typescript` | 使用 TypeScript | checkbox | false |  |
| `--opt-arrow` / `--no-opt-arrow` | 使用箭头函数 | checkbox | false |  |
| `--opt-memo` / `--no-opt-memo` | 使用 React.memo | checkbox | false |  |
| `--component-name` | 组件名称: | text | "MyComponent" |  |
| `--html-input` | HTML 输入 | textarea | "<div class=\"container\">\n    <header class=\"header\">\n        <nav class=\"nav\">\n            <a href=\"#home\" class=\"nav-link active\">首页</a>\n            <a href=\"#about\" class=\"nav-link\">关于</a>\n        </nav>\n    </header>\n    <main class=\"content\">\n        <h2 class=\"title\">欢迎使用</h2>\n        <p style=\"color: red; font-size: 16px;\">这是一段示例文本</p>\n        <img src=\"image.jpg\" alt=\"示例图片\" class=\"image\">\n        <button onclick=\"handleClick()\" class=\"btn\">点击我</button>\n        <input type=\"text\" value=\"默认值\" readonly disabled>\n        <label for=\"email\">邮箱:</label>\n        <input type=\"email\" id=\"email\" tabindex=\"1\" maxlength=\"50\">\n        <!-- 这是注释 -->\n        <div data-id=\"123\" aria-label=\"标签\"></div>\n    </main>\n</div>" |  |

已检查示例：

```bash
html-tools dev/html-to-jsx convert-to-jsx --opt-component --no-opt-typescript --no-opt-arrow --no-opt-memo --component-name 'MyComponent' --html-input '<div class="container">
    <header class="header">
        <nav class="nav">
            <a href="#home" class="nav-link active">首页</a>
            <a href="#about" class="nav-link">关于</a>
        </nav>
    </header>
    <main class="content">
        <h2 class="title">欢迎使用</h2>
        <p style="color: red; font-size: 16px;">这是一段示例文本</p>
        <img src="image.jpg" alt="示例图片" class="image">
        <button onclick="handleClick()" class="btn">点击我</button>
        <input type="text" value="默认值" readonly disabled>
        <label for="email">邮箱:</label>
        <input type="email" id="email" tabindex="1" maxlength="50">
        <!-- 这是注释 -->
        <div data-id="123" aria-label="标签"></div>
    </main>
</div>' --json
```

### dev/http-status

HTTP 状态码参考：HTTP 状态码速查，包含描述和使用场景

来源：`html-tools/tools/dev/http-status.html`，SHA-256：`648d3830f069d0d055925445447fa3b5f6f198f0ec6fee0ec1af32aed2914a71`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-by-category-all` | 全部 0 | countAll, count1xx, count2xx, count3xx, count4xx, count5xx |
| `filter-by-category-1xx` | 1xx 信息 0 | countAll, count1xx, count2xx, count3xx, count4xx, count5xx |
| `filter-by-category-2xx` | 2xx 成功 0 | countAll, count1xx, count2xx, count3xx, count4xx, count5xx |
| `filter-by-category-3xx` | 3xx 重定向 0 | countAll, count1xx, count2xx, count3xx, count4xx, count5xx |
| `filter-by-category-4xx` | 4xx 客户端错误 0 | countAll, count1xx, count2xx, count3xx, count4xx, count5xx |
| `filter-by-category-5xx` | 5xx 服务器错误 0 | countAll, count1xx, count2xx, count3xx, count4xx, count5xx |
| `filter-codes` | filterCodes | countAll, count1xx, count2xx, count3xx, count4xx, count5xx |
| `update-counts` | updateCounts | countAll, count1xx, count2xx, count3xx, count4xx, count5xx |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools dev/http-status filter-by-category-all  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/i18n-key-generator

i18n Key 生成器：根据文本智能生成国际化 key

来源：`html-tools/tools/dev/i18n-key-generator.html`，SHA-256：`f4adb7ca3464fc912ce67dfbc92bb3f291257f95df7caddab6a35abff96c8687`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update` | update | outputGrid |
| `run` | 按字段输入重新计算 | outputGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本（每行一个） | textarea | "保存\n取消\n确认删除\n用户名不能为空" |  |
| `--prefix` | 前缀: | text | "" |  |
| `--separator` | 分隔符: 点号 (.) 下划线 (_) 连字符 (-) | select-one | "." | "." (点号 (.)); "_" (下划线 (_)); "-" (连字符 (-)) |
| `--format` | 格式: snake_case camelCase kebab-case SCREAMING_SNAKE | select-one | "snake_case" | "snake_case" (snake_case); "camelCase" (camelCase); "kebab-case" (kebab-case); "SCREAMING_SNAKE" (SCREAMING_SNAKE) |

已检查示例：

```bash
html-tools dev/i18n-key-generator update --input '保存
取消
确认删除
用户名不能为空' --prefix 'Hello world
Hello world
TypeScript' --separator '.' --format 'snake_case' --json
```

### dev/ip-converter

IP 地址转换器：IP 地址格式转换，支持点分十进制、整数、二进制等

来源：`html-tools/tools/dev/ip-converter.html`，SHA-256：`61ded91a5adb4c7a256d522a86817760f380bf41ac6e1926c7162dc15726d85d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 转换 | dotted, decimal, hex, binary, octal, binaryGroup |
| `run` | 按字段输入重新计算 | dotted, decimal, hex, binary, octal, binaryGroup |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入 IP 地址或数值 | text | "" |  |

已检查示例：

```bash
html-tools dev/ip-converter convert --input '192.168.1.1' --json
```

### dev/js-ast-viewer

JavaScript AST查看器：解析JavaScript代码的抽象语法树

来源：`html-tools/tools/dev/js-ast-viewer.html`，SHA-256：`41d06a009ddc9ad1387df97ff83f88137410d7e39f31286d39196e0e1af1e37b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse-code` | 解析 AST | node-86roguf3r, node-c5df7nlps, node-hrqryn9zd, node-rdmi0gsxe, node-c2zp7g3yd, node-ahok9vqu8, node-e8v6w2bx4, node-d9yqfeu2i, node-yczjaufb2, node-sl2los2ta, node-gul274dwx, node-3ikz09n8y, stats |
| `update-stats` | updateStats | stats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--code-editor` | 输入JavaScript代码... | textarea | "function greet(name) {\n  const message = `Hello, ${name}!`;\n  console.log(message);\n  return message;\n}\n\ngreet('World');" |  |

已检查示例：

```bash
html-tools dev/js-ast-viewer parse-code --code-editor 'function greet(name) {
  const message = `Hello, ${name}!`;
  console.log(message);
  return message;
}

greet('\''World'\'');' --json
```

### dev/js-formatter

JavaScript 格式化：JavaScript 代码格式化、压缩和美化

来源：`html-tools/tools/dev/js-formatter.html`，SHA-256：`0742d3421903242d4a70c6a560f9216da41d1ea3f0848127282e8b98870b937c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format` | 格式化 | output, inputStats, outputStats, ratio |
| `update-stats` | updateStats | inputStats, outputStats |
| `run` | 按字段输入重新计算 | inputStats, outputStats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--indent-type` | 缩进: 空格 Tab | select-one | "space" | "space" (空格); "tab" (Tab) |
| `--indent-size` | 缩进大小: | number | "2" | min=1, max=8 |
| `--use-semicolon` / `--no-use-semicolon` | 分号 | checkbox | true |  |
| `--use-single-quote` / `--no-use-single-quote` | 单引号 | checkbox | false |  |
| `--input` | 输入 JavaScript | textarea | "" |  |

已检查示例：

```bash
html-tools dev/js-formatter format --indent-type 'space' --indent-size '2' --use-semicolon --no-use-single-quote --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: minify: Unexpected token: name (world)

### dev/js-minifier

JavaScript 代码压缩器：JavaScript 代码压缩器，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/js-minifier.html`，SHA-256：`0320b34d460e2302c3cf4b6ab34cd4f87c7300e81d092c19f2510cf687b3e6e2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `minify-js` | 压缩 | original-size, minified-size, savings, gzip-estimate, input-stats, js-output, output-stats |
| `update-stats` | updateStats | input-stats, output-stats |
| `run` | 按字段输入重新计算 | input-stats, output-stats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--opt-mangle` / `--no-opt-mangle` | 混淆变量名 | checkbox | true |  |
| `--opt-compress` / `--no-opt-compress` | 压缩代码 | checkbox | true |  |
| `--opt-dead-code` / `--no-opt-dead-code` | 移除死代码 | checkbox | true |  |
| `--opt-drop-console` / `--no-opt-drop-console` | 移除 console | checkbox | false |  |
| `--opt-drop-debugger` / `--no-opt-drop-debugger` | 移除 debugger | checkbox | true |  |
| `--opt-keep-fnames` / `--no-opt-keep-fnames` | 保留函数名 | checkbox | false |  |
| `--opt-keep-classnames` / `--no-opt-keep-classnames` | 保留类名 | checkbox | false |  |
| `--opt-sourcemap` / `--no-opt-sourcemap` | 生成 Source Map | checkbox | false |  |
| `--js-input` | JavaScript 输入 | textarea | "// 示例 JavaScript 代码\nclass Calculator {\n    constructor(initialValue = 0) {\n        this.value = initialValue;\n        this.history = [];\n    }\n\n    add(number) {\n        this.history.push({ operation: 'add', value: number });\n        this.value += number;\n        return this;\n    }\n\n    subtract(number) {\n        this.history.push({ operation: 'subtract', value: number });\n        this.value -= number;\n        return this;\n    }\n\n    multiply(number) {\n        this.history.push({ operation: 'multiply', value: number });\n        this.value *= number;\n        return this;\n    }\n\n    divide(number) {\n        if (number === 0) {\n            throw new Error('Cannot divide by zero');\n        }\n        this.history.push({ operation: 'divide', value: number });\n        this.value /= number;\n        return this;\n    }\n\n    reset() {\n        this.value = 0;\n        this.history = [];\n        return this;\n    }\n\n    getHistory() {\n        return this.history;\n    }\n\n    getValue() {\n        return this.value;\n    }\n}\n\n// 使用示例\nfunction main() {\n    const calc = new Calculator(10);\n    \n    calc.add(5)\n        .multiply(2)\n        .subtract(3)\n        .divide(2);\n    \n    console.log('当前值:', calc.getValue());\n    console.log('操作历史:', calc.getHistory());\n    \n    // 调试代码\n    debugger;\n    \n    return calc.getValue();\n}\n\n// 工具函数\nconst utils = {\n    formatNumber: (num) => {\n        return num.toLocaleString('zh-CN');\n    },\n    \n    isValidNumber: (value) => {\n        return typeof value === 'number' && !isNaN(value) && isFinite(value);\n    },\n    \n    clamp: (value, min, max) => {\n        return Math.min(Math.max(value, min), max);\n    }\n};\n\n// 立即执行函数\n(function() {\n    const result = main();\n    console.log('最终结果:', utils.formatNumber(result));\n})();" |  |

已检查示例：

```bash
html-tools dev/js-minifier minify-js --opt-mangle --opt-compress --opt-dead-code --no-opt-drop-console --opt-drop-debugger --no-opt-keep-fnames --no-opt-keep-classnames --no-opt-sourcemap --js-input '// 示例 JavaScript 代码
class Calculator {
    constructor(initialValue = 0) {
        this.value = initialValue;
        this.history = [];
    }

    add(number) {
        this.history.push({ operation: '\''add'\'', value: number });
        this.value += number;
        return this;
    }

    subtract(number) {
        this.history.push({ operation: '\''subtract'\'', value: number });
        this.value -= number;
        return this;
    }

    multiply(number) {
        this.history.push({ operation: '\''multiply'\'', value: number });
        this.value *= number;
        return this;
    }

    divide(number) {
        if (number === 0) {
            throw new Error('\''Cannot divide by zero'\'');
        }
        this.history.push({ operation: '\''divide'\'', value: number });
        this.value /= number;
        return this;
    }

    reset() {
        this.value = 0;
        this.history = [];
        return this;
    }

    getHistory() {
        return this.history;
    }

    getValue() {
        return this.value;
    }
}

// 使用示例
function main() {
    const calc = new Calculator(10);
    
    calc.add(5)
        .multiply(2)
        .subtract(3)
        .divide(2);
    
    console.log('\''当前值:'\'', calc.getValue());
    console.log('\''操作历史:'\'', calc.getHistory());
    
    // 调试代码
    debugger;
    
    return calc.getValue();
}

// 工具函数
const utils = {
    formatNumber: (num) => {
        return num.toLocaleString('\''zh-CN'\'');
    },
    
    isValidNumber: (value) => {
        return typeof value === '\''number'\'' && !isNaN(value) && isFinite(value);
    },
    
    clamp: (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    }
};

// 立即执行函数
(function() {
    const result = main();
    console.log('\''最终结果:'\'', utils.formatNumber(result));
})();' --json
```

操作限制：部分原页面操作未通过迁移检查: validate-js: 语法验证通过！代码没有语法错误。

### dev/js-minify

JavaScript 压缩：压缩 JavaScript 代码

来源：`html-tools/tools/dev/js-minify.html`，SHA-256：`3fe2279acd124da199d6a99ac1807ae89a508b8bf342058149b6cfc1f5d69aa5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `minify` | 📦 压缩 | inputSize, outputSize, output, originalSize, compressedSize, savedSize, savedPercent |
| `run` | 按字段输入重新计算 | inputSize, outputSize, output, originalSize, compressedSize, savedSize, savedPercent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--remove-comments` / `--no-remove-comments` | 移除注释 | checkbox | true |  |
| `--remove-whitespace` / `--no-remove-whitespace` | 移除空白 | checkbox | true |  |
| `--remove-newlines` / `--no-remove-newlines` | 移除换行 | checkbox | true |  |
| `--remove-semicolons` / `--no-remove-semicolons` | 移除多余分号 | checkbox | false |  |
| `--input` | 输入 JavaScript | textarea | "// 这是一个示例函数\nfunction greet(name) {\n    // 打印问候语\n    console.log(\"Hello, \" + name + \"!\");\n    \n    /* \n     * 多行注释\n     * 这里做一些处理\n     */\n    return {\n        message: \"Welcome\",\n        user: name,\n        timestamp: Date.now()\n    };\n}\n\n// 调用函数\nconst result = greet(\"World\");\nconsole.log(result);" |  |

已检查示例：

```bash
html-tools dev/js-minify minify --remove-comments --remove-whitespace --remove-newlines --no-remove-semicolons --input '// 这是一个示例函数
function greet(name) {
    // 打印问候语
    console.log("Hello, " + name + "!");
    
    /* 
     * 多行注释
     * 这里做一些处理
     */
    return {
        message: "Welcome",
        user: name,
        timestamp: Date.now()
    };
}

// 调用函数
const result = greet("World");
console.log(result);' --json
```

### dev/js-obfuscator

JS代码混淆：混淆JavaScript代码

来源：`html-tools/tools/dev/js-obfuscator.html`，SHA-256：`e567d86f05c5539ecdf19bd03b38ceeff66a07132f6ddea744a5d7c91fbb86bd`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-stats` | updateStats | inputStats, outputStats |
| `run` | 按字段输入重新计算 | inputStats, outputStats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--rename-vars` / `--no-rename-vars` | 重命名变量 | checkbox | true |  |
| `--string-encode` / `--no-string-encode` | 字符串编码 | checkbox | true |  |
| `--dead-code` / `--no-dead-code` | 插入死代码 | checkbox | false |  |
| `--control-flow` / `--no-control-flow` | 控制流扁平化 | checkbox | false |  |
| `--hex-numbers` / `--no-hex-numbers` | 数字转十六进制 | checkbox | true |  |
| `--unicode-escape` / `--no-unicode-escape` | Unicode转义 | checkbox | false |  |
| `--input-code` | 粘贴JavaScript代码... | textarea | "function greet(name) {\n    const message = \"Hello, \" + name + \"!\";\n    console.log(message);\n    return message;\n}\n\nconst user = \"World\";\nconst result = greet(user);\nconsole.log(\"Result:\", result);" |  |

已检查示例：

```bash
html-tools dev/js-obfuscator update-stats --rename-vars --string-encode --no-dead-code --no-control-flow --hex-numbers --no-unicode-escape --input-code 'function greet(name) {
    const message = "Hello, " + name + "!";
    console.log(message);
    return message;
}

const user = "World";
const result = greet(user);
console.log("Result:", result);' --json
```

### dev/js-playground

JavaScript 在线运行：JavaScript 在线运行，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/js-playground.html`，SHA-256：`fdc2cebf1618df05cf2b9b41c55c4c92416a870c0c4c75e65ab02716eb4bdbba`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run-code` | runCode | consoleOutput |
| `format-code` | formatCode | editorStats, codeEditor |
| `update-stats` | updateStats | editorStats |
| `run` | 按字段输入重新计算 | editorStats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--code-editor` | // 在这里输入 JavaScript 代码... // 按 Ctrl+Enter 或点击运行按钮执行 console.log('Hello, World!'); | textarea | "// Hello World 示例\nconsole.log('Hello, World! 🌍');\nconsole.log('当前时间:', new Date().toLocaleString());\n\n// 不同类型的日志\nconsole.log('普通日志');\nconsole.warn('警告信息');\nconsole.error('错误信息');\nconsole.info('提示信息');\n\n// 返回值\n'JavaScript is awesome! 🚀'" |  |

已检查示例：

```bash
html-tools dev/js-playground run-code --code-editor '// Hello World 示例
console.log('\''Hello, World! 🌍'\'');
console.log('\''当前时间:'\'', new Date().toLocaleString());

// 不同类型的日志
console.log('\''普通日志'\'');
console.warn('\''警告信息'\'');
console.error('\''错误信息'\'');
console.info('\''提示信息'\'');

// 返回值
'\''JavaScript is awesome! 🚀'\''' --json
```

### dev/json-diff

JSON Diff 对比：智能对比两个 JSON 的结构和值差异

来源：`html-tools/tools/dev/json-diff.html`，SHA-256：`2eae5fdc76bf2aa1d525e2fd8709378f81c104ab466aeca300386cd90b27c8ad`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `compare` | 🔎 比较差异 | diffContainer |
| `format-both` | 📐 格式化 | leftJson, rightJson |
| `format-json-left` | 格式化 | leftJson |
| `format-json-right` | 格式化 | rightJson |
| `run` | 按字段输入重新计算 | diffContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--left-json` | 输入或粘贴 JSON... | textarea | "" |  |
| `--right-json` | 输入或粘贴 JSON... | textarea | "" |  |

已检查示例：

```bash
html-tools dev/json-diff compare --left-json '{"name":"Alice","count":2}' --right-json '{"name":"Alice","count":2}' --json
```

### dev/json-formatter

JSON 格式化：JSON 格式化、压缩、校验，支持错误定位和语法高亮

来源：`html-tools/tools/dev/json-formatter.html`，SHA-256：`13127357f3a737b57e4df62bd5ffd145f8fd88a7c2ccbc98b6c8bc66277fc506`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format` | 格式化 | output, statKeys, statArrays, statDepth, statSize |
| `minify` | 压缩 | output, statKeys, statArrays, statDepth, statSize |
| `validate` | 校验 | statKeys, statArrays, statDepth, statSize |
| `sort-keys` | 排序 | output, statKeys, statArrays, statDepth, statSize |
| `sort-keys-action` | sortKeysAction | output, statKeys, statArrays, statDepth, statSize |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--indent` | 缩进: | select-one | "2" | "2" (2 空格); "4" (4 空格); "tab" (Tab) |
| `--remove-empty` / `--no-remove-empty` | 移除空值 | checkbox | false |  |
| `--input` | 输入 | textarea | "" |  |

已检查示例：

```bash
html-tools dev/json-formatter format --indent '2' --no-remove-empty --input '{"name":"Alice","count":2}' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/json-minifier

JSON 压缩和美化器：JSON 压缩和美化器，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/json-minifier.html`，SHA-256：`f76b4acaf4c87cf36a282efd90e27a67cce6a078466ed3a1799d8206ab2cefb6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `minify-json` | 压缩 | success-box, original-size, minified-size, savings, key-count, depth, array-count, input-stats, json-output, json-tree, output-stats |
| `beautify-json` | 美化 | success-box, original-size, minified-size, savings, key-count, depth, array-count, input-stats, json-output, json-tree, output-stats |
| `validate-json` | 验证 | success-box |
| `update-input-stats` | updateInputStats | input-stats |
| `run` | 按字段输入重新计算 | input-stats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--indent-size` | 缩进: 2 空格 4 空格 Tab | select-one | "2" | "2" (2 空格); "4" (4 空格); "tab" (Tab) |
| `--opt-sort-keys` / `--no-opt-sort-keys` | 按键排序 | checkbox | false |  |
| `--opt-escape-unicode` / `--no-opt-escape-unicode` | 转义 Unicode | checkbox | false |  |
| `--opt-trailing-comma` / `--no-opt-trailing-comma` | 允许尾随逗号 | checkbox | false |  |
| `--json-input` | JSON 输入 | textarea | "{\n    \"name\": \"JSON 工具\",\n    \"version\": \"1.0.0\",\n    \"description\": \"一个强大的 JSON 压缩和美化工具\",\n    \"author\": {\n        \"name\": \"开发者\",\n        \"email\": \"dev@example.com\",\n        \"url\": \"https://example.com\"\n    },\n    \"features\": [\n        \"JSON 压缩\",\n        \"JSON 美化\",\n        \"语法验证\",\n        \"树形视图\",\n        \"路径复制\"\n    ],\n    \"settings\": {\n        \"indent\": 2,\n        \"sortKeys\": false,\n        \"escapeUnicode\": false,\n        \"theme\": \"auto\"\n    },\n    \"stats\": {\n        \"downloads\": 10000,\n        \"stars\": 500,\n        \"forks\": 100\n    },\n    \"tags\": [\"json\", \"工具\", \"开发\", \"前端\"],\n    \"isPublic\": true,\n    \"license\": \"MIT\",\n    \"repository\": null\n}" |  |

已检查示例：

```bash
html-tools dev/json-minifier minify-json --indent-size '2' --no-opt-sort-keys --no-opt-escape-unicode --no-opt-trailing-comma --json-input '{
    "name": "JSON 工具",
    "version": "1.0.0",
    "description": "一个强大的 JSON 压缩和美化工具",
    "author": {
        "name": "开发者",
        "email": "dev@example.com",
        "url": "https://example.com"
    },
    "features": [
        "JSON 压缩",
        "JSON 美化",
        "语法验证",
        "树形视图",
        "路径复制"
    ],
    "settings": {
        "indent": 2,
        "sortKeys": false,
        "escapeUnicode": false,
        "theme": "auto"
    },
    "stats": {
        "downloads": 10000,
        "stars": 500,
        "forks": 100
    },
    "tags": ["json", "工具", "开发", "前端"],
    "isPublic": true,
    "license": "MIT",
    "repository": null
}' --json
```

### dev/json-minify

JSON 压缩：压缩 JSON 去除空格和换行

来源：`html-tools/tools/dev/json-minify.html`，SHA-256：`e47543438d84bb03a3228723c8d84675062c486395d9aa44edc9a9d68ac385eb`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `minify` | 📦 压缩 | inputSize, outputSize, output, originalSize, compressedSize, savedSize, savedPercent |
| `beautify` | ✨ 美化 | inputSize, input, outputSize, output, originalSize, compressedSize, savedSize, savedPercent |
| `run` | 按字段输入重新计算 | inputSize, outputSize, output, originalSize, compressedSize, savedSize, savedPercent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入 JSON | textarea | "{\n  \"name\": \"HTML Tools\",\n  \"version\": \"1.0.0\",\n  \"description\": \"在线开发工具集合\",\n  \"features\": [\n    \"JSON 格式化\",\n    \"代码压缩\",\n    \"编码转换\"\n  ],\n  \"config\": {\n    \"theme\": \"dark\",\n    \"language\": \"zh-CN\"\n  }\n}" |  |

已检查示例：

```bash
html-tools dev/json-minify minify --input '{
  "name": "HTML Tools",
  "version": "1.0.0",
  "description": "在线开发工具集合",
  "features": [
    "JSON 格式化",
    "代码压缩",
    "编码转换"
  ],
  "config": {
    "theme": "dark",
    "language": "zh-CN"
  }
}' --json
```

### dev/json-path-editor

JSON 路径编辑器：通过路径查询、编辑和导航 JSON 数据

来源：`html-tools/tools/dev/json-path-editor.html`，SHA-256：`1332418e2d9cd8f6918a997decf4e3db242c4dfc3551c1cc40623cf127ec9042`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse-json` | 🔄 解析 JSON | samplePaths, treeContainer |
| `format-json` | ✨ 格式化 | jsonEditor |
| `query-path` | 查询 | pathBreadcrumb, resultBox |
| `generate-sample-paths` | generateSamplePaths | samplePaths |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--json-editor` | 在此输入或粘贴 JSON 数据... | textarea | "{\n  \"user\": {\n    \"name\": \"张三\",\n    \"age\": 28,\n    \"email\": \"zhangsan@example.com\",\n    \"address\": {\n      \"city\": \"北京\",\n      \"district\": \"朝阳区\",\n      \"street\": \"建国路88号\"\n    },\n    \"hobbies\": [\"编程\", \"阅读\", \"游泳\"],\n    \"isActive\": true\n  },\n  \"orders\": [\n    {\"id\": 1001, \"product\": \"笔记本电脑\", \"price\": 5999},\n    {\"id\": 1002, \"product\": \"无线鼠标\", \"price\": 129},\n    {\"id\": 1003, \"product\": \"机械键盘\", \"price\": 499}\n  ],\n  \"metadata\": {\n    \"version\": \"1.0\",\n    \"lastUpdated\": null\n  }\n}" |  |
| `--path-input` | 输入路径，如: user.name 或 orders[0].product | text | "" |  |

已检查示例：

```bash
html-tools dev/json-path-editor parse-json --json-editor '{
  "user": {
    "name": "张三",
    "age": 28,
    "email": "zhangsan@example.com",
    "address": {
      "city": "北京",
      "district": "朝阳区",
      "street": "建国路88号"
    },
    "hobbies": ["编程", "阅读", "游泳"],
    "isActive": true
  },
  "orders": [
    {"id": 1001, "product": "笔记本电脑", "price": 5999},
    {"id": 1002, "product": "无线鼠标", "price": 129},
    {"id": 1003, "product": "机械键盘", "price": 499}
  ],
  "metadata": {
    "version": "1.0",
    "lastUpdated": null
  }
}' --path-input '{"name":"Alice","count":2}' --json
```

操作限制：部分原页面操作未通过迁移检查: update-edit-input: Cannot read properties of null (reading 'value')

### dev/json-schema-validator

JSON Schema 验证器：JSON Schema 验证器，在线验证，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/json-schema-validator.html`，SHA-256：`6735816071dfda745472e0f476e84b21ee113e71bdece0df596529bcd2cd6cf5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format-schema` | 格式化 | schemaInput |
| `format-data` | 格式化 | dataInput |
| `validate` | 🔍 验证 | result |
| `update-stats` | updateStats | schemaStats, dataStats |
| `run` | 按字段输入重新计算 | schemaStats, dataStats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--schema-input` | 输入 JSON Schema... | textarea | "{\n  \"$schema\": \"http://json-schema.org/draft-07/schema#\",\n  \"type\": \"object\",\n  \"properties\": {\n    \"name\": { \"type\": \"string\", \"minLength\": 1 },\n    \"age\": { \"type\": \"integer\", \"minimum\": 0, \"maximum\": 150 },\n    \"email\": { \"type\": \"string\", \"format\": \"email\" }\n  },\n  \"required\": [\"name\", \"email\"]\n}" |  |
| `--data-input` | 输入要验证的 JSON 数据... | textarea | "{\n  \"name\": \"张三\",\n  \"age\": 25,\n  \"email\": \"zhangsan@example.com\"\n}" |  |

已检查示例：

```bash
html-tools dev/json-schema-validator format-schema --schema-input '{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": { "type": "string", "minLength": 1 },
    "age": { "type": "integer", "minimum": 0, "maximum": 150 },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["name", "email"]
}' --data-input '{
  "name": "张三",
  "age": 25,
  "email": "zhangsan@example.com"
}' --json
```

### dev/json-to-go

JSON 转 Go Struct：JSON 转 Go Struct，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/json-to-go.html`，SHA-256：`e95d1771ab44f3796fefc9dd491642db167745478a23aeaf874796dba345d03b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 转换 | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--struct-name` | 结构体名称: | text | "AutoGenerated" |  |
| `--inline-type` / `--no-inline-type` | 内联嵌套类型 | checkbox | false |  |
| `--omitempty` / `--no-omitempty` | 添加 omitempty | checkbox | true |  |
| `--input` | JSON 输入 | textarea | "" |  |

已检查示例：

```bash
html-tools dev/json-to-go convert --struct-name 'AutoGenerated' --no-inline-type --omitempty --input '{"name":"Alice","count":2}' --json
```

### dev/json-to-sql

JSON 转 SQL：JSON 转 SQL，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/json-to-sql.html`，SHA-256：`1231fa0a82b63ec23c3f20585d5803ab6621f44790ddede01ec75193e7369a66`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert-to-sql` | 🔄 生成 SQL | sqlOutput, statsText, fieldMapping, previewTable |
| `format-json` | 📝 格式化 JSON | jsonInput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--table-name` | 表名： | text | "table_name" |  |
| `--db-type` | 数据库类型： MySQL PostgreSQL SQLite SQL Server Oracle | select-one | "mysql" | "mysql" (MySQL); "postgresql" (PostgreSQL); "sqlite" (SQLite); "sqlserver" (SQL Server); "oracle" (Oracle) |
| `--opt-batch` / `--no-opt-batch` | 批量插入模式 | checkbox | false |  |
| `--opt-ignore` / `--no-opt-ignore` | INSERT IGNORE | checkbox | false |  |
| `--opt-replace` / `--no-opt-replace` | REPLACE INTO | checkbox | false |  |
| `--opt-pretty` / `--no-opt-pretty` | 格式化输出 | checkbox | true |  |
| `--opt-null-string` / `--no-opt-null-string` | 空字符串转 NULL | checkbox | false |  |
| `--json-input` | 输入 JSON 数据（对象或数组） | textarea | "" |  |

已检查示例：

```bash
html-tools dev/json-to-sql convert-to-sql --table-name 'table_name' --db-type 'mysql' --no-opt-batch --no-opt-ignore --no-opt-replace --opt-pretty --no-opt-null-string --json-input '{"name":"Alice","count":2}' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/json-to-typescript

JSON 转 TypeScript：将 JSON 数据转换为 TypeScript 接口定义

来源：`html-tools/tools/dev/json-to-typescript.html`，SHA-256：`a34f67cd36b84f059010e810fb52841b2a6ccc7e70bd77bfc5297471af73b027`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format-json` | 格式化 | jsonInput |
| `convert` | convert | tsOutput |
| `run` | 按字段输入重新计算 | tsOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--root-name` | 接口名称: | text | "RootObject" |  |
| `--opt-export` / `--no-opt-export` | 添加 export | checkbox | true |  |
| `--opt-optional` / `--no-opt-optional` | 所有属性可选 | checkbox | false |  |
| `--opt-readonly` / `--no-opt-readonly` | 只读属性 | checkbox | false |  |
| `--opt-type` / `--no-opt-type` | 使用 type 替代 interface | checkbox | false |  |
| `--json-input` | 粘贴 JSON 数据... | textarea | "{\n  \"id\": 1,\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"age\": 30,\n  \"isActive\": true,\n  \"tags\": [\"developer\", \"designer\"],\n  \"address\": {\n    \"street\": \"123 Main St\",\n    \"city\": \"New York\",\n    \"zipCode\": \"10001\"\n  },\n  \"createdAt\": \"2024-01-15T10:30:00Z\"\n}" |  |

已检查示例：

```bash
html-tools dev/json-to-typescript format-json --root-name 'RootObject' --opt-export --no-opt-optional --no-opt-readonly --no-opt-type --json-input '{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "isActive": true,
  "tags": ["developer", "designer"],
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  },
  "createdAt": "2024-01-15T10:30:00Z"
}' --json
```

### dev/json-tree

JSON 树形查看器：JSON 可视化树形结构查看器，支持折叠展开和路径显示

来源：`html-tools/tools/dev/json-tree.html`，SHA-256：`1c5d94be869c89f17c9d3d9bc99ea07f701088b108ccd854b3964528e41a6059`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format-input` | 格式化 | jsonInput |
| `minify-input` | 压缩 | jsonInput |
| `parse-and-render` | parseAndRender | treeView, statsBar |
| `run` | 按字段输入重新计算 | treeView, statsBar |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--json-input` | 粘贴或输入 JSON 数据... | textarea | "{\n  \"name\": \"HTML Tools\",\n  \"version\": \"1.0.0\",\n  \"description\": \"在线开发工具集合\",\n  \"features\": [\n    \"JSON 格式化\",\n    \"Base64 编解码\",\n    \"时间戳转换\",\n    \"颜色转换\"\n  ],\n  \"stats\": {\n    \"tools\": 150,\n    \"categories\": 12,\n    \"active\": true\n  },\n  \"author\": {\n    \"name\": \"Developer\",\n    \"email\": \"dev@example.com\"\n  },\n  \"tags\": null,\n  \"config\": {\n    \"theme\": \"dark\",\n    \"lang\": \"zh-CN\",\n    \"autoSave\": false\n  }\n}" |  |

已检查示例：

```bash
html-tools dev/json-tree format-input --json-input '{
  "name": "HTML Tools",
  "version": "1.0.0",
  "description": "在线开发工具集合",
  "features": [
    "JSON 格式化",
    "Base64 编解码",
    "时间戳转换",
    "颜色转换"
  ],
  "stats": {
    "tools": 150,
    "categories": 12,
    "active": true
  },
  "author": {
    "name": "Developer",
    "email": "dev@example.com"
  },
  "tags": null,
  "config": {
    "theme": "dark",
    "lang": "zh-CN",
    "autoSave": false
  }
}' --json
```

操作限制：部分原页面操作未通过迁移检查: search-tree: 原工具没有产生可输出的结果，请检查参数

### dev/json-typescript

JSON → TypeScript 类型生成：JSON 转 TypeScript 类型

来源：`html-tools/tools/dev/json-typescript.html`，SHA-256：`2a635413afa9d9d7144aec6826c40ad42eadb432d4d61b126cb58204fb528fe7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成类型 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--type-name` | 类型名称: | text | "MyType" |  |
| `--export-type` | 导出方式: interface type | select-one | "type" | "interface" (interface); "type" (type) |
| `--optional-props` | 可选属性: 自动推断 全部可选 全部必填 | select-one | "auto" | "auto" (自动推断); "all" (全部可选); "none" (全部必填) |
| `--input` | 在此粘贴 JSON 数据，例如: {"name": "John", "age": 30} | textarea | "" |  |

已检查示例：

```bash
html-tools dev/json-typescript generate --type-name 'MyType' --export-type 'type' --optional-props 'auto' --input '{"name":"Alice","count":2}' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/json-yaml

JSON-YAML 转换：JSON 与 YAML 格式互转，支持格式化输出

来源：`html-tools/tools/dev/json-yaml.html`，SHA-256：`4fe1cb16638db72347f05ccce8c28e162c8fc68b6c225034fa8d176bbca2c377`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `json-to-yaml` | JSON → YAML | output |
| `yaml-to-json` | YAML → JSON | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--pretty-print` / `--no-pretty-print` | 格式化输出 | checkbox | true |  |
| `--indent` | JSON 缩进: 2 空格 4 空格 Tab | select-one | "2" | "2" (2 空格); "4" (4 空格); "tab" (Tab) |
| `--input` | 输入 (JSON 或 YAML) | textarea | "" |  |

已检查示例：

```bash
html-tools dev/json-yaml json-to-yaml --pretty-print --indent '2' --input '{"name":"Alice","count":2}' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/jsonpath-query

JSONPath 查询：使用 JSONPath 表达式查询 JSON 数据

来源：`html-tools/tools/dev/jsonpath-query.html`，SHA-256：`29553656dd64870e2e5cc205325f34fab3b9d6c3f9c4decb3d76a543c9c3edf7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `query` | 查询 | output, matchCount |
| `format` | 格式化 | input |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--query-input` | 输入 JSONPath 表达式，如: $.store.book[*].author | text | "$" |  |
| `--input` | 在此粘贴 JSON 数据... | textarea | "" |  |

已检查示例：

```bash
html-tools dev/jsonpath-query query --query-input '$' --input '{"name":"Alice","count":2}' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/jsonpath-tester

JSONPath 测试器：在线测试 JSONPath 表达式，提取 JSON 数据

来源：`html-tools/tools/dev/jsonpath-tester.html`，SHA-256：`5dd8543ca38f81ef5bfeb75eec4ca964f7c6fe95b32d2909008025f6d16c1050`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format-json` | 格式化 | jsonInput |
| `run` | 按字段输入重新计算 | resultCount, resultOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--query-input` | 输入 JSONPath 表达式，如 $.store.book[*].author | text | "$.store.book[*].author" |  |
| `--json-input` | JSON 数据 | textarea | "{\n  \"store\": {\n    \"book\": [\n      {\n        \"category\": \"reference\",\n        \"author\": \"Nigel Rees\",\n        \"title\": \"Sayings of the Century\",\n        \"price\": 8.95\n      },\n      {\n        \"category\": \"fiction\",\n        \"author\": \"Evelyn Waugh\",\n        \"title\": \"Sword of Honour\",\n        \"price\": 12.99\n      },\n      {\n        \"category\": \"fiction\",\n        \"author\": \"Herman Melville\",\n        \"title\": \"Moby Dick\",\n        \"isbn\": \"0-553-21311-3\",\n        \"price\": 8.99\n      },\n      {\n        \"category\": \"fiction\",\n        \"author\": \"J. R. R. Tolkien\",\n        \"title\": \"The Lord of the Rings\",\n        \"isbn\": \"0-395-19395-8\",\n        \"price\": 22.99\n      }\n    ],\n    \"bicycle\": {\n      \"color\": \"red\",\n      \"price\": 19.95\n    }\n  }\n}" |  |

已检查示例：

```bash
html-tools dev/jsonpath-tester format-json --query-input '$.store.book[*].author' --json-input '{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}' --json
```

### dev/jwt-decoder

JWT 解码器：解码 JWT Token，查看 Header、Payload 和签名信息

来源：`html-tools/tools/dev/jwt-decoder.html`，SHA-256：`542200b08ae81ceee1a533cceb4b7ec1f5b7b2900453a8a60d610dbb7d4dc7bf`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `decode` | decode | header, payload, signature |
| `run` | 按字段输入重新计算 | header, payload, signature |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--jwt` | 输入 JWT | textarea | "" |  |

已检查示例：

```bash
html-tools dev/jwt-decoder decode --jwt 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiQWxpY2UifQ.signature' --json
```

### dev/license-generator

License 生成器：生成开源许可证文件，支持 MIT、Apache、GPL 等协议

来源：`html-tools/tools/dev/license-generator.html`，SHA-256：`a194ecfd1d16f295404453764d5845fb73edc6dff509c1ab9ec2f5e89a5c6e8a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 LICENSE | licenseInfo, output |
| `run` | 按字段输入重新计算 | licenseInfo, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--author-name` | 作者/组织名称 | text | "" |  |
| `--project-name` | 项目名称 (可选) | text | "" |  |
| `--year` | 年份 | number | "2026" |  |

已检查示例：

```bash
html-tools dev/license-generator generate --author-name 'Hello world
Hello world
TypeScript' --project-name 'Hello world
Hello world
TypeScript' --year '2026' --json
```

### dev/markdown-to-html

Markdown 转 HTML 转换器：Markdown 转 HTML 转换器，多格式互转，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/markdown-to-html.html`，SHA-256：`7bb67d848392dbd2168eb8a7146ee9a9a60a63addc6d2e1877480935d888fa4c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert-markdown` | 转换 | input-stats, preview-output, html-code, output-stats |
| `update-stats` | updateStats | input-stats, output-stats |
| `run` | 按字段输入重新计算 | input-stats, preview-output, html-code, output-stats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--markdown-input` | Markdown 输入 | textarea | "# 欢迎使用 Markdown 转换器\n\n这是一个**强大**的 Markdown 转 HTML 工具。\n\n## 功能特性\n\n- 实时预览\n- 支持代码高亮\n- 支持表格\n- 支持任务列表\n\n### 代码示例\n\n```javascript\nfunction hello() {\n    console.log('Hello, World!');\n}\n```\n\n### 表格示例\n\n\| 名称 \| 描述 \|\n\|------\|------\|\n\| 工具1 \| 很棒 \|\n\| 工具2 \| 更棒 \|\n\n### 任务列表\n\n- [x] 完成设计\n- [ ] 开发中\n- [ ] 测试\n\n> 引用文字示例\n\n[访问链接](https://example.com)" |  |
| `--field-2` / `--no-field-2` | 输出结果 | checkbox | true |  |
| `--field-3` / `--no-field-3` | 输出结果 | checkbox | false |  |
| `--field-4` / `--no-field-4` | 输出结果 | checkbox | false |  |

已检查示例：

```bash
html-tools dev/markdown-to-html convert-markdown --markdown-input '# 欢迎使用 Markdown 转换器

这是一个**强大**的 Markdown 转 HTML 工具。

## 功能特性

- 实时预览
- 支持代码高亮
- 支持表格
- 支持任务列表

### 代码示例

```javascript
function hello() {
    console.log('\''Hello, World!'\'');
}
```

### 表格示例

| 名称 | 描述 |
|------|------|
| 工具1 | 很棒 |
| 工具2 | 更棒 |

### 任务列表

- [x] 完成设计
- [ ] 开发中
- [ ] 测试

> 引用文字示例

[访问链接](https://example.com)' --field-2 --no-field-3 --no-field-4 --json
```

### dev/math-symbols

数学符号大全：数学符号大全，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/math-symbols.html`，SHA-256：`caf377e0419925c3329785297148f01fc37c86d761815f40f9646f0c2e394f38`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-symbols` | filterSymbols | stats, symbolContent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools dev/math-symbols filter-symbols  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/meta-viewport

Viewport Meta 生成器：生成移动端 Viewport meta 标签

来源：`html-tools/tools/dev/meta-viewport.html`，SHA-256：`1e55fb24a1e4e28119b2dc581e2e000b0ac036db53422e1cca610b6f5ea23980`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | generate | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--width` | 宽度 | select-one | "device-width" | "device-width" (device-width); "custom" (自定义) |
| `--custom-width` | 自定义宽度 | number | "1024" |  |
| `--initial-scale` | 初始缩放 | number | "1" | min=0.1, max=10 |
| `--minimum-scale` | 最小缩放 | number | "1" | min=0.1, max=10 |
| `--maximum-scale` | 最大缩放 | number | "5" | min=0.1, max=10 |
| `--user-scalable` / `--no-user-scalable` |  | checkbox | true |  |
| `--viewport-fit` | 视口适配 | select-one | "" | "" (默认); "auto" (auto); "contain" (contain); "cover" (cover) |
| `--height` | 高度 | select-one | "" | "" (不设置); "device-height" (device-height) |

已检查示例：

```bash
html-tools dev/meta-viewport generate --width 'device-width' --custom-width '1024' --initial-scale '1' --minimum-scale '1' --maximum-scale '5' --user-scalable --viewport-fit 'auto' --height 'device-height' --json
```

### dev/mime-lookup

MIME 类型查询：查询文件扩展名对应的 MIME 类型

来源：`html-tools/tools/dev/mime-lookup.html`，SHA-256：`16530b3932b41b9f03ee096f4aea10cebe817d3b577ea874abded8dd593b5f2c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--search` | 输入扩展名（如 .jpg）或 MIME 类型（如 image/jpeg） | search | "" |  |

已检查示例：

```bash
html-tools dev/mime-lookup run --search 'Hello world
Hello world
TypeScript' --json
```

### dev/neumorphism

Neumorphism 生成器：Neumorphism 软 UI 风格 CSS 代码生成器

来源：`html-tools/tools/dev/neumorphism.html`，SHA-256：`6cda456c0c313a55c7a6249f71d335fb7b00ebde3d595ab1811593c609b025bf`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-from-color-picker` | updateFromColorPicker | bgColorText, sizeValue, radiusValue, distanceValue, intensityValue, blurValue, codeContent |
| `update-from-text` | updateFromText | bgColor, sizeValue, radiusValue, distanceValue, intensityValue, blurValue, codeContent |
| `update-preview` | updatePreview | sizeValue, radiusValue, distanceValue, intensityValue, blurValue, codeContent |
| `run` | 按字段输入重新计算 | bgColor, bgColorText, sizeValue, radiusValue, distanceValue, intensityValue, blurValue, codeContent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--bg-color` | bgColor | color | "#e0e5ec" |  |
| `--bg-color-text` | 请输入文本输入框 | text | "#e0e5ec" |  |
| `--size` | size | range | "200" | min=50, max=300 |
| `--radius` | radius | range | "50" | min=0, max=150 |
| `--distance` | distance | range | "20" | min=1, max=50 |
| `--intensity` | intensity | range | "15" | min=1, max=100 |
| `--blur` | blur | range | "60" | min=0, max=100 |

已检查示例：

```bash
html-tools dev/neumorphism update-from-color-picker --bg-color '#e0e5ec' --bg-color-text '#e0e5ec' --size '200' --radius '50' --distance '20' --intensity '15' --blur '60' --json
```

### dev/nginx-config

Nginx 配置生成器：Nginx 配置生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/nginx-config.html`，SHA-256：`2965673a4affc3cb97c6aeb56a10db9d87d9a334713a7073bf9853e03eca4877`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-config` | generateConfig | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--worker-processes` | Worker 进程数 | text | "auto" |  |
| `--worker-connections` | Worker 连接数 | number | "1024" |  |
| `--sendfile` / `--no-sendfile` | 启用 sendfile | checkbox | true |  |
| `--tcp-nopush` / `--no-tcp-nopush` | 启用 tcp_nopush | checkbox | true |  |
| `--gzip` / `--no-gzip` | 启用 Gzip 压缩 | checkbox | true |  |

已检查示例：

```bash
html-tools dev/nginx-config generate-config --worker-processes 'auto' --worker-connections '1024' --sendfile --tcp-nopush --gzip --json
```

### dev/nginx-generator

Nginx 配置生成器 | 在线工具：Nginx 配置生成器 | 在线工具，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/nginx-generator.html`，SHA-256：`f5573ec247a718b5efb214d5bbef80798f63311e3340aebdf19b799a8fa95307`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | generate | output |
| `generate-static` | generateStatic | value |
| `generate-spa` | generateSpa | value |
| `generate-proxy` | generateProxy | value |
| `generate-loadbalance` | generateLoadbalance | value |
| `generate-php` | generatePhp | value |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--server-name` | 域名 | text | "example.com" |  |
| `--http-port` | HTTP 端口 | number | "80" |  |
| `--https-port` | HTTPS 端口 | number | "443" |  |
| `--root-path` | 网站根目录 | text | "/var/www/html" |  |
| `--index-files` | 默认首页 | text | "index.html index.htm" |  |
| `--proxy-pass` | 后端地址 | text | "http://127.0.0.1:3000" |  |
| `--proxy-websocket` / `--no-proxy-websocket` | 支持 WebSocket | checkbox | false |  |
| `--lb-method` | 负载均衡策略 | select-one | "" | "" (轮询 (默认)); "least_conn" (最少连接); "ip_hash" (IP Hash); "random" (随机) |
| `--field-9` | 域名 | text | "127.0.0.1:3001" |  |
| `--field-10` | 域名 | text | "127.0.0.1:3002" |  |
| `--php-fpm` | PHP-FPM 地址 | text | "unix:/var/run/php/php8.2-fpm.sock" |  |
| `--php-root` | 网站根目录 | text | "/var/www/html" |  |
| `--enable-ssl` / `--no-enable-ssl` | 启用 HTTPS | checkbox | false |  |
| `--ssl-cert` | 证书文件路径 | text | "/etc/nginx/ssl/cert.pem" |  |
| `--ssl-key` | 私钥文件路径 | text | "/etc/nginx/ssl/key.pem" |  |
| `--http-redirect` / `--no-http-redirect` | HTTP 重定向到 HTTPS | checkbox | true |  |
| `--hsts` / `--no-hsts` | 启用 HSTS | checkbox | false |  |
| `--gzip` / `--no-gzip` | 启用 Gzip 压缩 | checkbox | true |  |
| `--access-log` / `--no-access-log` | 访问日志 | checkbox | true |  |
| `--cache-static` / `--no-cache-static` | 静态资源缓存 | checkbox | false |  |

已检查示例：

```bash
html-tools dev/nginx-generator generate --server-name 'example.com' --http-port '80' --https-port '443' --root-path '/var/www/html' --index-files 'index.html index.htm' --proxy-pass 'http://127.0.0.1:3000' --no-proxy-websocket --lb-method 'least_conn' --field-9 '127.0.0.1:3001' --field-10 '127.0.0.1:3002' --php-fpm 'unix:/var/run/php/php8.2-fpm.sock' --php-root '/var/www/html' --no-enable-ssl --ssl-cert '/etc/nginx/ssl/cert.pem' --ssl-key '/etc/nginx/ssl/key.pem' --http-redirect --no-hsts --gzip --access-log --no-cache-static --json
```

### dev/openapi-viewer

OpenAPI/Swagger查看器：解析展示OpenAPI文档

来源：`html-tools/tools/dev/openapi-viewer.html`，SHA-256：`52407548f91432f9480b681b18fad5ab9d15a35eb279eef3c53d1766f2a1bebb`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse-spec` | 解析文档 | apiInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--url-input` | 输入OpenAPI JSON/YAML URL... | text | "" |  |
| `--spec-input` | 或直接粘贴OpenAPI JSON/YAML内容... | textarea | "" |  |

已检查示例：

```bash
html-tools dev/openapi-viewer parse-spec --url-input 'https://example.com/path?a=1' --spec-input 'Hello world
Hello world
TypeScript' --json
```

### dev/otp-generator

OTP 验证码生成器：生成一次性密码 (OTP/TOTP)

来源：`html-tools/tools/dev/otp-generator.html`，SHA-256：`70ef84256bd5db4967e0073c0dd8636b55ed2eeba48f9cec29ddd10e2a043c2e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-secret` | generateSecret | value |
| `update-otp` | updateOTP | otpCode |
| `update-timer` | updateTimer | timer |
| `run` | 按字段输入重新计算 | otpCode, timer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--secret-input` | 密钥 (Base32 编码) | text | "" |  |
| `--digits` | 位数: 6 位 8 位 | select-one | "6" | "6" (6 位); "8" (8 位) |
| `--period` | 周期: 30 秒 60 秒 | select-one | "30" | "30" (30 秒); "60" (60 秒) |

已检查示例：

```bash
html-tools dev/otp-generator generate-secret --secret-input 'Hello world
Hello world
TypeScript' --digits '6' --period '30' --json
```

### dev/package-json-editor

package.json编辑器：可视化编辑package.json

来源：`html-tools/tools/dev/package-json-editor.html`，SHA-256：`0f8aa6143ac8c84c153b11110537ea298810a798a7a536763f222017cf690e91`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format-json` | 格式化 | jsonOutput |
| `update-json` | updateJson | jsonOutput |
| `parse-json` | parseJson | name, version, description, main, author, keywords, repository, depsList, devDepsList, scriptsList, engineNode |
| `run` | 按字段输入重新计算 | name, version, description, main, author, keywords, repository, depsList, devDepsList, scriptsList, engineNode, jsonOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--name` | 包名 (name) | text | "" |  |
| `--version` | 版本 (version) | text | "1.0.0" |  |
| `--description` | 描述 (description) | text | "" |  |
| `--main` | 入口文件 (main) | text | "index.js" |  |
| `--author` | 作者 (author) | text | "" |  |
| `--license` | 许可证 (license) | select-one | "MIT" | "MIT" (MIT); "ISC" (ISC); "Apache-2.0" (Apache-2.0); "GPL-3.0" (GPL-3.0); "BSD-3-Clause" (BSD-3-Clause); "UNLICENSED" (UNLICENSED) |
| `--keywords` | 关键词 (keywords, 逗号分隔) | text | "" |  |
| `--repository` | 仓库URL (repository) | text | "" |  |
| `--new-dep` | 包名 | text | "" |  |
| `--new-dep-ver` | 版本 | text | "^1.0.0" |  |
| `--new-dev-dep` | 包名 | text | "" |  |
| `--new-dev-dep-ver` | 版本 | text | "^1.0.0" |  |
| `--field-13` | 包名 (name) | text | "test" |  |
| `--field-14` | 包名 (name) | text | "echo " |  |
| `--new-script-name` | 脚本名 | text | "" |  |
| `--new-script-cmd` | 命令 | text | "" |  |
| `--engine-node` | Node引擎版本 (engines.node) | text | "" |  |
| `--private` | 私有包 (private) | select-one | "false" | "false" (否); "true" (是) |
| `--type` | 类型 (type) | select-one | "" | "" (默认 (CommonJS)); "module" (module (ESM)); "commonjs" (commonjs) |
| `--json-output` | jsonOutput | textarea | "{\n  \"version\": \"1.0.0\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n  },\n  \"license\": \"MIT\"\n}" |  |

已检查示例：

```bash
html-tools dev/package-json-editor format-json --name '{"name":"Alice","count":2}' --version '1.0.0' --description '{"name":"Alice","count":2}' --main 'index.js' --author '{"name":"Alice","count":2}' --license 'MIT' --keywords '{"name":"Alice","count":2}' --repository '{"name":"Alice","count":2}' --new-dep '{"name":"Alice","count":2}' --new-dep-ver '^1.0.0' --new-dev-dep '{"name":"Alice","count":2}' --new-dev-dep-ver '^1.0.0' --field-13 'test' --field-14 'echo ' --new-script-name '{"name":"Alice","count":2}' --new-script-cmd '{"name":"Alice","count":2}' --engine-node '{"name":"Alice","count":2}' --private 'false' --type 'module' --json-output '{
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "license": "MIT"
}' --json
```

### dev/package-json-gen

package.json 生成器：package.json 生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/package-json-gen.html`，SHA-256：`54ae8724093d484539da335df368aa699f1ff8678da6ad4531ccefe7f5fbb426`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-output` | generateOutput | output, installCmd |
| `run` | 按字段输入重新计算 | output, installCmd |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--pkg-name` | 项目名称 | text | "my-project" |  |
| `--pkg-version` | 版本号 | text | "1.0.0" |  |
| `--pkg-description` | 描述 | text | "" |  |
| `--pkg-main` | 入口文件 | text | "index.js" |  |
| `--pkg-type` | 类型 CommonJS (默认) ES Module | select-one | "" | "" (CommonJS (默认)); "module" (ES Module) |
| `--pkg-author` | 作者 | text | "" |  |
| `--pkg-license` | 许可证 MIT ISC Apache 2.0 GPL 3.0 BSD 3-Clause UNLICENSED | select-one | "MIT" | "MIT" (MIT); "ISC" (ISC); "Apache-2.0" (Apache 2.0); "GPL-3.0" (GPL 3.0); "BSD-3-Clause" (BSD 3-Clause); "UNLICENSED" (UNLICENSED) |
| `--pkg-private` / `--no-pkg-private` | 私有包（不发布到 npm） | checkbox | false |  |
| `--script-name` | 项目名称 | text | "start" |  |
| `--script-cmd` | 项目名称 | text | "node index.js" |  |
| `--script-name-2` | 项目名称 | text | "test" |  |
| `--script-cmd-2` | 项目名称 | text | "echo \"Error: no test specified\" && exit 1" |  |
| `--pkg-keywords` | 关键词（逗号分隔） | text | "" |  |
| `--pkg-repository` | 仓库 URL | text | "" |  |
| `--pkg-homepage` | 主页 | text | "" |  |
| `--pkg-bugs` | Bug 报告地址 | text | "" |  |
| `--pkg-node-engine` | Node 引擎版本 | text | "" |  |
| `--pkg-npm-engine` | npm 引擎版本 | text | "" |  |
| `--pkg-bin` | 可执行文件名 (bin) | text | "" |  |
| `--pkg-files` | files (发布时包含的文件，逗号分隔) | text | "" |  |

已检查示例：

```bash
html-tools dev/package-json-gen generate-output --pkg-name 'my-project' --pkg-version '1.0.0' --pkg-description '{"name":"Alice","count":2}' --pkg-main 'index.js' --pkg-type 'module' --pkg-author '{"name":"Alice","count":2}' --pkg-license 'MIT' --no-pkg-private --script-name 'start' --script-cmd 'node index.js' --script-name-2 'test' --script-cmd-2 'echo "Error: no test specified" && exit 1' --pkg-keywords '{"name":"Alice","count":2}' --pkg-repository '{"name":"Alice","count":2}' --pkg-homepage '{"name":"Alice","count":2}' --pkg-bugs '{"name":"Alice","count":2}' --pkg-node-engine '{"name":"Alice","count":2}' --pkg-npm-engine '{"name":"Alice","count":2}' --pkg-bin '{"name":"Alice","count":2}' --pkg-files '{"name":"Alice","count":2}' --json
```

### dev/protobuf-decoder

Protobuf 解码器：解码 Protobuf 二进制数据，无需 schema 定义

来源：`html-tools/tools/dev/protobuf-decoder.html`，SHA-256：`6b5bd08c182c21ba942c7e7521942ba98a2708a703d9edbe6c24a7a5edbedee2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `decode` | 解码 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 粘贴 Base64 编码的 Protobuf 数据... | textarea | "" |  |

已检查示例：

```bash
html-tools dev/protobuf-decoder decode --input 'Hello world
Hello world
TypeScript' --json
```

### dev/punycode

Punycode 转换器：国际化域名 (IDN) 与 Punycode 编码互转

来源：`html-tools/tools/dev/punycode.html`，SHA-256：`6dc7e006e14931acb304640ef50dee1c95f58669fff31e564373a53c68059e06`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `to-punycode` | 转为 Punycode → | unicodeInfo, punycodeInput, punycodeInfo |
| `update-info` | updateInfo | unicodeInfo, punycodeInfo |
| `run` | 按字段输入重新计算 | unicodeInfo, punycodeInput, punycodeInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--unicode-input` | Unicode 域名 (中文/国际化) | textarea | "中文域名.中国" |  |
| `--punycode-input` | Punycode (ASCII) | textarea | "xn--fiq06l2rdsvs.xn--fiqs8s" |  |

已检查示例：

```bash
html-tools dev/punycode to-punycode --unicode-input '中文域名.中国' --punycode-input 'xn--fiq06l2rdsvs.xn--fiqs8s' --json
```

### dev/readme-generator

README 生成器：快速生成项目 README.md，支持徽章、特性、安装说明等

来源：`html-tools/tools/dev/readme-generator.html`，SHA-256：`5c431c866ffe08ca62e0fef594083e9bc777888900a58f1e46822cdd4f10a5ed`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 README | output, preview |
| `run` | 按字段输入重新计算 | output, preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--project-name` | 项目名称 | text | "My Awesome Project" |  |
| `--project-desc` | 项目简介 | textarea | "一个非常棒的开源项目，帮助开发者提高效率。" |  |
| `--project-url` | 项目 URL (可选) | url | "" |  |
| `--show-badges` / `--no-show-badges` | 徽章 | checkbox | true |  |
| `--badge-type` | badgeType | select-one | "license-MIT" | "license-MIT" (License MIT); "license-Apache" (License Apache 2.0); "version" (Version); "build-passing" (Build Passing); "build-failing" (Build Failing); "coverage" (Coverage); "npm" (npm); "downloads" (Downloads); "stars" (GitHub Stars); "issues" (GitHub Issues); "prs" (PRs Welcome) |
| `--show-features` / `--no-show-features` | 特性 | checkbox | true |  |
| `--field-7` | 徽章 | text | "简单易用，开箱即用" |  |
| `--field-8` | 徽章 | text | "高性能，轻量级" |  |
| `--field-9` | 徽章 | text | "完善的文档和示例" |  |
| `--show-tech` / `--no-show-tech` | 技术栈 | checkbox | true |  |
| `--show-install` / `--no-show-install` | 安装 | checkbox | true |  |
| `--package-manager` | 安装 | select-one | "npm" | "npm" (npm); "yarn" (yarn); "pnpm" (pnpm); "pip" (pip); "go" (go get); "cargo" (cargo) |
| `--package-name` | 安装 | text | "my-package" |  |
| `--show-usage` / `--no-show-usage` | 使用示例 | checkbox | true |  |
| `--usage-code` | 使用示例 | textarea | "import myPackage from 'my-package';\n\nconst result = myPackage.doSomething();\nconsole.log(result);" |  |
| `--show-api` / `--no-show-api` | API 文档 | checkbox | false |  |
| `--api-doc` | API 文档 | textarea | "### doSomething(options)\n\n执行主要操作。\n\n**参数:**\n- `options.name` (string): 名称\n- `options.count` (number): 数量，默认 1\n\n**返回:** Promise<Result>" |  |
| `--show-contrib` / `--no-show-contrib` | 贡献指南 | checkbox | true |  |
| `--show-license` / `--no-show-license` | 许可证 | checkbox | true |  |
| `--license-type` | 许可证 | select-one | "MIT" | "MIT" (MIT); "Apache-2.0" (Apache 2.0); "GPL-3.0" (GPL 3.0); "BSD-3-Clause" (BSD 3-Clause); "ISC" (ISC); "Unlicense" (Unlicense) |
| `--author-name` | 许可证 | text | "" |  |

已检查示例：

```bash
html-tools dev/readme-generator generate --project-name 'My Awesome Project' --project-desc '一个非常棒的开源项目，帮助开发者提高效率。' --project-url 'https://example.com/path?a=1' --show-badges --badge-type 'license-MIT' --show-features --field-7 '简单易用，开箱即用' --field-8 '高性能，轻量级' --field-9 '完善的文档和示例' --show-tech --show-install --package-manager 'npm' --package-name 'my-package' --show-usage --usage-code 'import myPackage from '\''my-package'\'';

const result = myPackage.doSomething();
console.log(result);' --no-show-api --api-doc '### doSomething(options)

执行主要操作。

**参数:**
- `options.name` (string): 名称
- `options.count` (number): 数量，默认 1

**返回:** Promise<Result>' --show-contrib --show-license --license-type 'MIT' --author-name 'Hello world
Hello world
TypeScript' --json
```

### dev/readme-preview

README.md 实时预览器：README.md 实时预览器，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/readme-preview.html`，SHA-256：`fe6f59b7e6a7bbdb0d492b54e9e436df13b2eaf00f2147260d5ea880c79246f5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-markdown` | 保存文件 | download |
| `update-preview` | updatePreview | stats, preview |
| `update-stats` | updateStats | stats |
| `run` | 按字段输入重新计算 | stats, editor, preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--template-select` | templateSelect | select-one | "" | "" (选择模板...); "basic" (基础项目); "npm" (NPM 包); "api" (API 文档) |
| `--editor` | 在此输入 Markdown 内容... | textarea | "# 欢迎使用 README 预览器\n\n这是一个 **Markdown** 实时预览工具。\n\n## 功能\n\n- 实时预览\n- 多种模板\n- 导出文件\n- 深色模式\n\n## 代码示例\n\n```javascript\nconsole.log('Hello, World!');\n```\n\n> 引用文本示例\n\n\| 表头1 \| 表头2 \|\n\|-------\|-------\|\n\| 单元格1 \| 单元格2 \|\n" |  |

已检查示例：

```bash
html-tools dev/readme-preview export-markdown --file-input 'generated/fixtures/sample.txt' --template-select 'basic' --editor '# 欢迎使用 README 预览器

这是一个 **Markdown** 实时预览工具。

## 功能

- 实时预览
- 多种模板
- 导出文件
- 深色模式

## 代码示例

```javascript
console.log('\''Hello, World!'\'');
```

> 引用文本示例

| 表头1 | 表头2 |
|-------|-------|
| 单元格1 | 单元格2 |
' --json
```

### dev/regex-explainer

正则可视化解释器：可视化解析正则表达式，逐步解释每个部分的含义

来源：`html-tools/tools/dev/regex-explainer.html`，SHA-256：`035c9d64cd3c32533bab3b869e4632f395f42a1f49be1ee015a11c2521b2732b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `test-match` | testMatch | matchResult |
| `analyze` | analyze | visualRegex, tokenList, matchResult |
| `run` | 按字段输入重新计算 | visualRegex, tokenList, matchResult |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--regex-input` | g (全局) | text | "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$" |  |
| `--flag-g` / `--no-flag-g` | g (全局) | checkbox | false |  |
| `--flag-i` / `--no-flag-i` | i (忽略大小写) | checkbox | false |  |
| `--flag-m` / `--no-flag-m` | m (多行) | checkbox | false |  |
| `--flag-s` / `--no-flag-s` | s (单行) | checkbox | false |  |
| `--flag-u` / `--no-flag-u` | u (Unicode) | checkbox | false |  |
| `--test-input` | 输入测试文本... | textarea | "test@example.com\ninvalid-email\nuser.name@domain.co.uk\nanother@test.org" |  |

已检查示例：

```bash
html-tools dev/regex-explainer test-match --regex-input '^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$' --no-flag-g --no-flag-i --no-flag-m --no-flag-s --no-flag-u --test-input 'test@example.com
invalid-email
user.name@domain.co.uk
another@test.org' --json
```

### dev/regex-generator

正则表达式生成器：正则表达式生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/regex-generator.html`，SHA-256：`08b2fb0eec7a257624c742bd1b4c639fb1158c4f1e941e4d2c6073ec76750d69`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-display` | updateDisplay | regexDisplay, matchesList |
| `test-regex` | testRegex | matchesList |
| `run` | 按字段输入重新计算 | regexDisplay, matchesList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--flag-g` / `--no-flag-g` | g (全局匹配) | checkbox | false |  |
| `--flag-i` / `--no-flag-i` | i (忽略大小写) | checkbox | false |  |
| `--flag-m` / `--no-flag-m` | m (多行模式) | checkbox | false |  |
| `--flag-s` / `--no-flag-s` | s (dotAll 模式) | checkbox | false |  |
| `--test-input` | 测试文本 | textarea | "" |  |

已检查示例：

```bash
html-tools dev/regex-generator update-display --no-flag-g --no-flag-i --no-flag-m --no-flag-s --test-input 'Hello world
Hello world
TypeScript' --json
```

### dev/regex-tester

正则测试器：正则表达式测试，匹配高亮，捕获组展示

来源：`html-tools/tools/dev/regex-tester.html`，SHA-256：`4151a0843a40894692044a7f49ebcecc7bb5aa4c9e5ba9ec22b0dfdb8073f5df`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `test-regex` | testRegex | result, info |
| `run` | 按字段输入重新计算 | result, info |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--regex` | 正则表达式 | text | "" |  |
| `--flag-g` / `--no-flag-g` | g (全局) | checkbox | true |  |
| `--flag-i` / `--no-flag-i` | i (忽略大小写) | checkbox | false |  |
| `--flag-m` / `--no-flag-m` | m (多行) | checkbox | false |  |
| `--text` | 测试文本 | textarea | "" |  |

已检查示例：

```bash
html-tools dev/regex-tester test-regex --regex '\w+' --flag-g --no-flag-i --no-flag-m --text 'Hello world
Hello world
TypeScript' --json
```

### dev/regex-visualizer

正则表达式可视化器：正则表达式可视化器，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/regex-visualizer.html`，SHA-256：`79295c2467078d2d7e477883ec6cf5555670550a2fd5e15be3e71b9e91100973`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run-match` | runMatch | highlightResult, stats, matchesList |
| `run` | 按字段输入重新计算 | highlightResult, stats, matchesList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--regex-input` | 输入正则表达式... | text | "" |  |
| `--flags-input` | gi | text | "g" |  |
| `--test-text` | 输入要测试的文本... | textarea | "Hello, my email is test@example.com and another one is hello@world.org\nYou can also reach me at +86 13812345678 or visit https://example.com\nToday is 2024-01-15, IP address: 192.168.1.1\n这是一段中文测试文本，包含一些HTML标签：<div class=\"test\">内容</div>" |  |

已检查示例：

```bash
html-tools dev/regex-visualizer run-match --regex-input '\w+' --flags-input 'g' --test-text 'Hello, my email is test@example.com and another one is hello@world.org
You can also reach me at +86 13812345678 or visit https://example.com
Today is 2024-01-15, IP address: 192.168.1.1
这是一段中文测试文本，包含一些HTML标签：<div class="test">内容</div>' --json
```

操作限制：部分原页面操作未通过迁移检查: update-flag-buttons: 原工具没有产生可输出的结果，请检查参数

### dev/responsive-preview

响应式预览：响应式预览，即时预览，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/responsive-preview.html`，SHA-256：`9ce5375bfa7dc3217caa45296c2c256de3d70c3de14855ab634c1d8521f2f34f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | sizeDisplay |
| `update-zoom` | updateZoom | sizeDisplay, zoomValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--url-input` | 输入网址 (https://...) | url | "" |  |

已检查示例：

```bash
html-tools dev/responsive-preview update-preview --url-input 'https://example.com/path?a=1' --json
```

### dev/rsa-keygen

RSA 密钥对生成器：生成 RSA 公私钥对

来源：`html-tools/tools/dev/rsa-keygen.html`，SHA-256：`253259534bad9ba4d158f3cc389c9a91f0487dc5bd9e6e5e8cddfb560a6e6347`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成密钥对 | publicKey, privateKey |
| `generate-keys` | generateKeys | publicKey, privateKey |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--key-size` | 密钥长度: 1024 位 (不安全) 2048 位 (推荐) 4096 位 (高安全) | select-one | "2048" | "1024" (1024 位 (不安全)); "2048" (2048 位 (推荐)); "4096" (4096 位 (高安全)) |
| `--format` | 格式: PKCS#8 (PEM) JWK (JSON) | select-one | "pkcs8" | "pkcs8" (PKCS#8 (PEM)); "jwk" (JWK (JSON)) |

已检查示例：

```bash
html-tools dev/rsa-keygen generate --key-size '2048' --format 'pkcs8' --json
```

### dev/semver-compare

Semver 比较器：语义化版本号比较和验证

来源：`html-tools/tools/dev/semver-compare.html`，SHA-256：`b692d57b9576c2eef7d7ceb85e688c1abe176f2eac79bce1d15cc973f07d062d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `check-range` | 检测 | rangeResult |
| `sort-asc` | 升序排序 | sortInput |
| `sort-desc` | 降序排序 | sortInput |
| `update-compare` | updateCompare | compareResult |
| `run` | 按字段输入重新计算 | compareResult |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--version-a` | 版本 A | text | "1.2.3" |  |
| `--version-b` | 版本 B | text | "1.2.4" |  |
| `--range-version` | 版本号 (如: 1.2.3) | text | "1.2.3" |  |
| `--range-expr` | 范围表达式 (如: ^1.0.0, >=1.0.0 <2.0.0) | text | "^1.0.0" |  |
| `--sort-input` | 每行一个版本号，如: 1.0.0 2.0.0 1.5.0 1.0.1 | textarea | "" |  |

已检查示例：

```bash
html-tools dev/semver-compare check-range --version-a '1.2.3' --version-b '1.2.4' --range-version '1.2.3' --range-expr '^1.0.0' --sort-input 'Hello world
Hello world
TypeScript' --json
```

### dev/shortcuts-cheatsheet

快捷键速查表：快捷键速查表，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/shortcuts-cheatsheet.html`，SHA-256：`4d0b9b6dc96066cf845eede10b8e4164adc43843430f9b8e5b20081c2ba8572e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-shortcuts` | filterShortcuts | shortcutGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools dev/shortcuts-cheatsheet filter-shortcuts  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/slug-generator

Slug 生成器：生成 URL 友好的 slug 字符串

来源：`html-tools/tools/dev/slug-generator.html`，SHA-256：`00858c66bf3c851a30d4b5a8504ed16a44f9434220238bb6761542538e41d3c8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update` | update | output, charCount |
| `run` | 按字段输入重新计算 | output, charCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--separator` | 分隔符: 连字符 (-) 下划线 (_) 点号 (.) | select-one | "-" | "-" (连字符 (-)); "_" (下划线 (_)); "." (点号 (.)) |
| `--lowercase` / `--no-lowercase` | 转为小写 | checkbox | true |  |
| `--transliterate` / `--no-transliterate` | 中文转拼音 | checkbox | true |  |
| `--max-length` | 最大长度: 不限制 50 80 100 200 | select-one | "80" | "0" (不限制); "50" (50); "80" (80); "100" (100); "200" (200) |
| `--input` | 输入文本 | textarea | "Hello World 你好世界" |  |

已检查示例：

```bash
html-tools dev/slug-generator update --separator '-' --lowercase --transliterate --max-length '80' --input 'Hello World 你好世界' --json
```

### dev/sql-converter

SQL 转换器：SQL 转换器，多格式互转，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/sql-converter.html`，SHA-256：`ef675a2f1c1f572f4cbceebd1e77a30fbca499298e01cbeb7a3e7db06579f198`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 🔄 转换 | outputArea |
| `run` | 按字段输入重新计算 | outputArea |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-format` | inputFormat | select-one | "sql" | "sql" (SQL INSERT); "json" (JSON 数组); "csv" (CSV) |
| `--input-area` | 粘贴 SQL INSERT 语句... | textarea | "" |  |
| `--output-format` | outputFormat | select-one | "json" | "json" (JSON 数组); "csv" (CSV); "markdown" (Markdown 表格); "sql" (SQL INSERT); "html" (HTML 表格) |

已检查示例：

```bash
html-tools dev/sql-converter convert --input-format 'sql' --input-area 'Hello world
Hello world
TypeScript' --output-format 'json' --json
```

操作限制：部分原页面操作未通过迁移检查: format-input: 原工具没有产生可输出的结果，请检查参数 | update-placeholder: 原工具没有产生可输出的结果，请检查参数

### dev/sql-formatter

SQL 格式化：SQL 语句格式化和美化

来源：`html-tools/tools/dev/sql-formatter.html`，SHA-256：`cf88b6470aa569b70a20e62bfbb1204ba23b231cc23ed941ccd113968e41714d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `minify-sql` | 压缩SQL | sqlInput, sqlOutput |
| `format-sql` | formatSQL | sqlOutput |
| `run` | 按字段输入重新计算 | sqlOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--sql-input` | 输入SQL语句... | textarea | "SELECT u.id, u.name, u.email, o.order_id, o.total_amount FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE u.status = 'active' AND o.created_at >= '2024-01-01' ORDER BY o.total_amount DESC LIMIT 100;" |  |
| `--keyword-case` | 关键字大小写 | select-one | "upper" | "upper" (大写); "lower" (小写); "capitalize" (首字母大写) |
| `--indent-size` | 缩进空格数 | number | "2" | min=1, max=8 |
| `--newline-clause` / `--no-newline-clause` | 每个子句换行 | checkbox | true |  |

已检查示例：

```bash
html-tools dev/sql-formatter minify-sql --sql-input 'SELECT u.id, u.name, u.email, o.order_id, o.total_amount FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE u.status = '\''active'\'' AND o.created_at >= '\''2024-01-01'\'' ORDER BY o.total_amount DESC LIMIT 100;' --keyword-case 'upper' --indent-size '2' --newline-clause --json
```

### dev/sql-playground

SQL在线执行器：在浏览器中执行SQL查询

来源：`html-tools/tools/dev/sql-playground.html`，SHA-256：`50c130bc07d9c5170d770579700852378af732d845ec20f20df436fc8345ae2c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format-sql` | 格式化 | sqlEditor |
| `update-table-list` | updateTableList | tableList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--sql-editor` | 输入SQL语句... | textarea | "SELECT * FROM users;" |  |

已检查示例：

```bash
html-tools dev/sql-playground format-sql --sql-editor 'SELECT * FROM users;' --json
```

### dev/sql-to-mongo

SQL 转 MongoDB 查询：SQL 转 MongoDB 查询，便捷查询，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/sql-to-mongo.html`，SHA-256：`cce230c2dc775a47cef13b14e715496ba3472c6231009828c36111dff1e68e5a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert-sql` | 转换 | mongoOutput |
| `format-sql` | 格式化SQL | sqlInput |
| `run` | 按字段输入重新计算 | mongoOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--sql-input` | SQL查询语句 | textarea | "" |  |

已检查示例：

```bash
html-tools dev/sql-to-mongo convert-sql --sql-input 'Hello world
Hello world
TypeScript' --json
```

### dev/sse-test

SSE测试客户端：SSE测试客户端，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/sse-test.html`，SHA-256：`eb23039144c3f9aaf5e054ccd419b42e3ed31e24e03645f2b3d65d2b1543b59f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-stats` | updateStats | totalEvents, messageEvents, customEventsCount, errorCount, reconnectCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--sse-url` | SSE端点URL | text | "" |  |
| `--with-credentials` / `--no-with-credentials` | 发送凭证 (withCredentials) | checkbox | false |  |
| `--custom-event-input` | 输入事件名称，如: update, notification | text | "" |  |

已检查示例：

```bash
html-tools dev/sse-test update-stats --sse-url 'https://example.com/path?a=1' --no-with-credentials --custom-event-input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/string-builder

字符串拼接器：可视化字符串拼接工具，支持拖拽排序和分隔符设置

来源：`html-tools/tools/dev/string-builder.html`，SHA-256：`b53b1896981866184a945e27b44e2b1c459ad58aed15666ac54d25afd760e834`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | partCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--new-part-input` | 输入新片段... | text | "" |  |
| `--delimiter` | 分隔符： | text | "" |  |
| `--per-line` | 每行个数： | number | "0" | min=0 |
| `--add-quotes` / `--no-add-quotes` | 引号包裹 | checkbox | false |  |

已检查示例：

```bash
html-tools dev/string-builder render --new-part-input 'Hello world
Hello world
TypeScript' --delimiter 'Hello world
Hello world
TypeScript' --per-line '0' --no-add-quotes --json
```

操作限制：部分原页面操作未通过迁移检查: update-output: 原工具没有产生可输出的结果，请检查参数

### dev/svg-optimizer

SVG优化器：优化压缩SVG文件

来源：`html-tools/tools/dev/svg-optimizer.html`，SHA-256：`c95473411a3dadf57461d3e0b3a37048c791c30ef90a3b18a4a4ddfc8844eea1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-stats` | updateStats | inputStats, outputStats |
| `run` | 按字段输入重新计算 | inputStats, inputSvg, inputPreview, outputStats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--remove-comments` / `--no-remove-comments` | 移除注释 | checkbox | true |  |
| `--remove-metadata` / `--no-remove-metadata` | 移除元数据 | checkbox | true |  |
| `--remove-empty-attrs` / `--no-remove-empty-attrs` | 移除空属性 | checkbox | true |  |
| `--remove-empty-groups` / `--no-remove-empty-groups` | 移除空组 | checkbox | true |  |
| `--cleanup-ids` / `--no-cleanup-ids` | 简化ID | checkbox | false |  |
| `--remove-default-attrs` / `--no-remove-default-attrs` | 移除默认属性 | checkbox | true |  |
| `--prettify` / `--no-prettify` | 格式化输出 | checkbox | false |  |
| `--minify` / `--no-minify` | 压缩输出 | checkbox | true |  |
| `--input-svg` | 粘贴SVG代码... | textarea | "" |  |

已检查示例：

```bash
html-tools dev/svg-optimizer update-stats --file-input 'generated/fixtures/sample.svg' --remove-comments --remove-metadata --remove-empty-attrs --remove-empty-groups --no-cleanup-ids --remove-default-attrs --no-prettify --minify --input-svg 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: export-svg: 原工具没有产生可输出的结果，请检查参数

### dev/svg-path-editor

SVG 路径编辑器：SVG 路径编辑器，在线编辑，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/svg-path-editor.html`，SHA-256：`7de264a39fe35bd27d0a626f2e74799a0882f5f6ad89caf01f6c576fe8f6015c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `build-path-string` | buildPathString | value |
| `render` | render | path-input, stroke-color-hex, fill-color-hex, stroke-width-value, code-output |
| `update-style` | updateStyle | stroke-color-hex, fill-color-hex, stroke-width-value, code-output |
| `parse-path-input` | parsePathInput | code-output |
| `update-code-output` | updateCodeOutput | code-output |
| `run` | 按字段输入重新计算 | stroke-color, stroke-color-hex, fill-color, fill-color-hex, stroke-width-value, code-output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--path-input` | 路径数据 | textarea | "M 50 200 C 150 50 350 350 500 200" |  |
| `--stroke-color` | stroke-color | color | "#10b981" |  |
| `--stroke-color-hex` | 请输入文本输入框 | text | "#10b981" |  |
| `--fill-color` | fill-color | color | "#10b981" |  |
| `--fill-color-hex` | 请输入文本输入框 | text | "#10b981" |  |
| `--fill-enabled` / `--no-fill-enabled` | 启用填充 | checkbox | false |  |
| `--stroke-width` | 描边宽度: 3 px | range | "3" | min=1, max=20 |

已检查示例：

```bash
html-tools dev/svg-path-editor build-path-string --path-input 'M 50 200 C 150 50 350 350 500 200' --stroke-color '#10b981' --stroke-color-hex '#10b981' --fill-color '#10b981' --fill-color-hex '#10b981' --no-fill-enabled --stroke-width '3' --json
```

### dev/symbols-table

特殊符号大全：特殊符号大全，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/symbols-table.html`，SHA-256：`ae133c682a5410418ff342a0c733da443033885688a8b5244db6e42d7a1072e4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-symbols` | filterSymbols | stats, symbolGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools dev/symbols-table filter-symbols  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/table-border

表格线生成器：表格线生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/table-border.html`，SHA-256：`4c36671add094b34bcf4ec9cc96bc3c15d5e9e3042d51a34027b1bb258e51a9e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-table` | updateTable | rowCount, colCount, previewOutput |
| `generate-table` | generateTable | previewOutput |
| `run` | 按字段输入重新计算 | rowCount, colCount, previewOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--row-count` | 行数 | number | "3" | min=1, max=10 |
| `--col-count` | 列数 | number | "3" | min=1, max=8 |
| `--alignment` | 对齐方式 | select-one | "left" | "left" (左对齐); "center" (居中); "right" (右对齐) |
| `--cell-input` | 行数 | text | "标题1" |  |
| `--cell-input-2` | 行数 | text | "标题2" |  |
| `--cell-input-3` | 行数 | text | "标题3" |  |
| `--cell-input-4` | 行数 | text | "内容A" |  |
| `--cell-input-5` | 行数 | text | "内容B" |  |
| `--cell-input-6` | 行数 | text | "内容C" |  |
| `--cell-input-7` | 行数 | text | "数据1" |  |
| `--cell-input-8` | 行数 | text | "数据2" |  |
| `--cell-input-9` | 行数 | text | "数据3" |  |

已检查示例：

```bash
html-tools dev/table-border update-table --row-count '3' --col-count '3' --alignment 'left' --cell-input '标题1' --cell-input-2 '标题2' --cell-input-3 '标题3' --cell-input-4 '内容A' --cell-input-5 '内容B' --cell-input-6 '内容C' --cell-input-7 '数据1' --cell-input-8 '数据2' --cell-input-9 '数据3' --json
```

### dev/tailwind-config-generator

Tailwind CSS 配置生成器：Tailwind CSS 配置生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/tailwind-config-generator.html`，SHA-256：`71ade987bc28dff5828906b207e1978cb0578f98f4755579eb8fbfe0a0686da4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-config` | generateConfig | configOutput |
| `run` | 按字段输入重新计算 | colorList, configOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` | 字体族 | text | "primary" |  |
| `--field-2` | 字体族 | text | "#06b6d4" |  |
| `--field-3` | 字体族 | color | "#06b6d4" |  |
| `--field-4` | 字体族 | text | "secondary" |  |
| `--field-5` | 字体族 | text | "#8b5cf6" |  |
| `--field-6` | 字体族 | color | "#8b5cf6" |  |
| `--field-7` | 字体族 | text | "accent" |  |
| `--field-8` | 字体族 | text | "#f59e0b" |  |
| `--field-9` | 字体族 | color | "#f59e0b" |  |
| `--field-10` | 字体族 | text | "sans" |  |
| `--field-11` | 字体族 | text | "Inter, system-ui, sans-serif" |  |
| `--field-12` | 字体族 | text | "mono" |  |
| `--field-13` | 字体族 | text | "JetBrains Mono, monospace" |  |
| `--field-14` / `--no-field-14` | 字体族 | checkbox | true |  |
| `--field-15` / `--no-field-15` | 字体族 | checkbox | true |  |
| `--field-16` / `--no-field-16` | 字体族 | checkbox | true |  |
| `--field-17` / `--no-field-17` | 字体族 | checkbox | true |  |
| `--field-18` / `--no-field-18` | 字体族 | checkbox | true |  |
| `--field-19` / `--no-field-19` | 字体族 | checkbox | true |  |
| `--spacing-base` | 基础间距单位 (rem) | number | "0.25" |  |
| `--field-21` | 字体族 | text | "0" |  |
| `--field-22` | 字体族 | text | "0.25rem" |  |
| `--field-23` | 字体族 | text | "0.5rem" |  |
| `--field-24` | 字体族 | text | "1rem" |  |
| `--field-25` | 字体族 | text | "2rem" |  |
| `--field-26` | 字体族 | text | "4rem" |  |
| `--field-27` | 字体族 | text | "8rem" |  |
| `--field-28` | 字体族 | text | "16rem" |  |
| `--field-29` | 字体族 | text | "sm" |  |
| `--field-30` | 字体族 | text | "640px" |  |
| `--field-31` | 字体族 | text | "md" |  |
| `--field-32` | 字体族 | text | "768px" |  |
| `--field-33` | 字体族 | text | "lg" |  |
| `--field-34` | 字体族 | text | "1024px" |  |
| `--field-35` | 字体族 | text | "xl" |  |
| `--field-36` | 字体族 | text | "1280px" |  |
| `--field-37` | 字体族 | text | "2xl" |  |
| `--field-38` | 字体族 | text | "1536px" |  |
| `--plugin-forms` / `--no-plugin-forms` | @tailwindcss/forms | checkbox | false |  |
| `--plugin-typography` / `--no-plugin-typography` | @tailwindcss/typography | checkbox | false |  |
| `--plugin-aspect-ratio` / `--no-plugin-aspect-ratio` | @tailwindcss/aspect-ratio | checkbox | false |  |
| `--plugin-container-queries` / `--no-plugin-container-queries` | @tailwindcss/container-queries | checkbox | false |  |
| `--dark-mode` / `--no-dark-mode` | Dark Mode (class) | checkbox | true |  |
| `--preflight` / `--no-preflight` | Preflight (CSS Reset) | checkbox | true |  |
| `--jit` / `--no-jit` | JIT Mode | checkbox | true |  |

已检查示例：

```bash
html-tools dev/tailwind-config-generator generate-config --field-1 'primary' --field-2 '#06b6d4' --field-3 '#06b6d4' --field-4 'secondary' --field-5 '#8b5cf6' --field-6 '#8b5cf6' --field-7 'accent' --field-8 '#f59e0b' --field-9 '#f59e0b' --field-10 'sans' --field-11 'Inter, system-ui, sans-serif' --field-12 'mono' --field-13 'JetBrains Mono, monospace' --field-14 --field-15 --field-16 --field-17 --field-18 --field-19 --spacing-base '0.25' --field-21 '0' --field-22 '0.25rem' --field-23 '0.5rem' --field-24 '1rem' --field-25 '2rem' --field-26 '4rem' --field-27 '8rem' --field-28 '16rem' --field-29 'sm' --field-30 '640px' --field-31 'md' --field-32 '768px' --field-33 'lg' --field-34 '1024px' --field-35 'xl' --field-36 '1280px' --field-37 '2xl' --field-38 '1536px' --no-plugin-forms --no-plugin-typography --no-plugin-aspect-ratio --no-plugin-container-queries --dark-mode --preflight --jit --json
```

### dev/toml-yaml-json

TOML/YAML/JSON 转换器：TOML、YAML、JSON 配置格式互相转换

来源：`html-tools/tools/dev/toml-yaml-json.html`，SHA-256：`84e195b1eeb5003436008c975a922d33d4b50fff8ae1a7c30a1901fa53104b08`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 粘贴内容... | textarea | "{\n  \"name\": \"example\",\n  \"version\": \"1.0.0\",\n  \"dependencies\": {\n    \"lodash\": \"^4.17.21\"\n  }\n}" |  |

已检查示例：

```bash
html-tools dev/toml-yaml-json convert --input '{
  "name": "example",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "^4.17.21"
  }
}' --json
```

### dev/unicode-converter

Unicode 转换器：Unicode 编解码，支持 \uXXXX、HTML 实体等格式

来源：`html-tools/tools/dev/unicode-converter.html`，SHA-256：`92754b21ac424e146a2e0a85f6826dce269b169ab68befa0e9ed870dd4bb6487`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-char-table` | updateCharTable | charTable |
| `run` | 按字段输入重新计算 | charTable |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-input` | 输入文本... | textarea | "你好世界 Hello" |  |
| `--unicode-input` | 输入 Unicode (如 \u4f60\u597d 或 你 或 U+4F60) | textarea | "" |  |

已检查示例：

```bash
html-tools dev/unicode-converter update-char-table --text-input '你好世界 Hello' --unicode-input 'Hello world
Hello world
TypeScript' --json
```

### dev/unicode-lookup

Unicode 查询：Unicode 字符查询和信息

来源：`html-tools/tools/dev/unicode-lookup.html`，SHA-256：`084c397d2efcc446a6bce64c8bcdb6a2118e48d4e0a01a5ffb1f2487d6869505`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `lookup` | lookup | results, detailChar, detailName, detailGrid |
| `run` | 按字段输入重新计算 | results, detailChar, detailName, detailGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入字符或码点 (如: 中, U+4E2D, 0x4E2D, 20013) | textarea | "" |  |

已检查示例：

```bash
html-tools dev/unicode-lookup lookup --input 'Hello world
Hello world
TypeScript' --json
```

### dev/url-codec

URL 编解码：URL 编码与解码，支持完整 URL 或组件

来源：`html-tools/tools/dev/url-codec.html`，SHA-256：`e8fc623636335d3d2c15bb0b463739fa4047331959db742371161400f527fb26`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `encode` | 编码 | output |
| `decode` | 解码 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--mode` | 组件编码 (encodeURIComponent) | radio | "component" | "component" (组件编码 (encodeURIComponent)); "uri" (完整 URI (encodeURI)) |
| `--input` | 输入 | textarea | "" |  |

已检查示例：

```bash
html-tools dev/url-codec encode --mode 'component' --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: parse: 无效的 URL 格式 | parse-url: 无效的 URL 格式 | run: 原工具没有产生可输出的结果，请检查参数

### dev/url-parser

URL 解析器：解析 URL 各组成部分，提取查询参数

来源：`html-tools/tools/dev/url-parser.html`，SHA-256：`7928b208f345bf84a7e192481696c344223d2a4d178967f24ef52c090d528a79`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse-url` | 解析 | structureVisual, partHref, partProtocol, partHost, partHostname, partPort, partOrigin, partPathname, partSearch, partHash, partUsername, partPassword, paramsBody, buildProtocol, buildHostname, buildPathname, buildParams, builtUrl |
| `build-url` | buildUrl | builtUrl |
| `run` | 按字段输入重新计算 | builtUrl |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--url-input` | 输入 URL | text | "https://api.example.com/v1/users?page=1&limit=10&sort=name" |  |
| `--build-protocol` | 协议 | text | "https" |  |
| `--build-username` | 用户名 | text | "" |  |
| `--build-password` | 密码 | text | "" |  |
| `--build-hostname` | 主机名 | text | "api.example.com" |  |
| `--build-port` | 端口 | text | "" |  |
| `--build-pathname` | 路径 | text | "/v1/users" |  |
| `--build-params` | 查询参数 (key=value，每行一个) | textarea | "page=1\nlimit=10\nsort=name" |  |
| `--build-hash` | 哈希 | text | "" |  |

已检查示例：

```bash
html-tools dev/url-parser parse-url --url-input 'https://api.example.com/v1/users?page=1&limit=10&sort=name' --build-protocol 'https' --build-username 'Hello world
Hello world
TypeScript' --build-password 'Hello world
Hello world
TypeScript' --build-hostname 'api.example.com' --build-port 'Hello world
Hello world
TypeScript' --build-pathname '/v1/users' --build-params 'page=1
limit=10
sort=name' --build-hash 'Hello world
Hello world
TypeScript' --json
```

### dev/webhook-tester

Webhook测试器：发送HTTP请求测试Webhook

来源：`html-tools/tools/dev/webhook-tester.html`，SHA-256：`6a482d43cdb26a991ecd824d99a6f09235ae46f3729986138d144e2cc73576e1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `send-request` | 发送请求 | responseTime, responseSize, responseBody, responseHeaders, responseRaw, historyList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--url-input` | URL | text | "" |  |
| `--field-2` | 请求方法 | text | "Content-Type" |  |
| `--field-3` | 请求方法 | text | "application/json" |  |
| `--body-input` | 请求体 (Body) | textarea | "" |  |

已检查示例：

```bash
html-tools dev/webhook-tester send-request --url-input 'https://example.com/path?a=1' --field-2 'Content-Type' --field-3 'application/json' --body-input 'Hello world
Hello world
TypeScript' --json
```

### dev/websocket-test

WebSocket测试客户端：WebSocket测试客户端，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/websocket-test.html`，SHA-256：`4b7c98a549208825b3e815939955fe274ec87ebb62e0868722297a5aa64e004d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `send-btn` | 发送 | messagesList |
| `send-message` | sendMessage | messagesList |
| `update-stats` | updateStats | sentCount, receivedCount, sentBytes, receivedBytes |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--ws-url` | 服务器地址 | text | "" |  |
| `--msg-format` | 服务器地址 | radio | "text" | "text" (文本); "json" (JSON) |
| `--pretty-json` / `--no-pretty-json` | 美化JSON | checkbox | false |  |
| `--message-input` | 输入要发送的消息... | textarea | "" |  |

已检查示例：

```bash
html-tools dev/websocket-test send-btn --ws-url 'https://example.com/path?a=1' --msg-format 'text' --no-pretty-json --message-input 'Hello world
Hello world
TypeScript' --json
```

### dev/xml-formatter

XML 格式化：XML 格式化和验证

来源：`html-tools/tools/dev/xml-formatter.html`，SHA-256：`352192f5493ff32563c37e36decb1d6e72cb66db2e126d928f0ab497ad6ad95b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format` | 格式化 | output |
| `minify` | 压缩 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--indent` | 缩进: 2 空格 4 空格 Tab | select-one | "2" | "2" (2 空格); "4" (4 空格); "tab" (Tab) |
| `--input` | 在此粘贴 XML 代码... | textarea | "" |  |

已检查示例：

```bash
html-tools dev/xml-formatter format --indent '2' --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: validate: XML 格式错误: 3:10: text data outside of root node. | run: 原工具没有产生可输出的结果，请检查参数

### dev/xml-json

XML ⇄ JSON 转换：XML 与 JSON 格式互转

来源：`html-tools/tools/dev/xml-json.html`，SHA-256：`8eb7215cdbbf3d74624afab74a7462dab26cfffe74d8c71d0409bb423cedf754`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `json-to-xml` | JSON → XML | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--pretty-print` / `--no-pretty-print` | 格式化输出 | checkbox | true |  |
| `--indent` | 缩进: 2 空格 4 空格 Tab | select-one | "2" | "2" (2 空格); "4" (4 空格); "tab" (Tab) |
| `--include-declaration` / `--no-include-declaration` | 包含 XML 声明 | checkbox | true |  |
| `--input` | 输入 (XML 或 JSON) | textarea | "" |  |

已检查示例：

```bash
html-tools dev/xml-json json-to-xml --pretty-print --indent '2' --include-declaration --input '{"name":"Alice","count":2}' --json
```

操作限制：部分原页面操作未通过迁移检查: xml-to-json: XML 解析错误: 1:26: text data outside of root node. | run: 原工具没有产生可输出的结果，请检查参数

### dev/xpath-tester

XPath 测试器：XPath 测试器，在线验证，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/xpath-tester.html`，SHA-256：`aa3573cf11d1bd7b0ff1c1889e0301628f8085cdaeba6fb5e57da0d07eb8a30c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `evaluate` | 执行查询 | resultCount, resultList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--xpath` | XPath表达式 | text | "//title" |  |
| `--xml-content` | 粘贴XML或HTML内容... | textarea | "<html>\n  <head>\n    <title>示例页面</title>\n  </head>\n  <body>\n    <div class=\"container\">\n      <h1 id=\"main-title\">欢迎</h1>\n      <p class=\"intro\">这是一个示例页面</p>\n      <ul>\n        <li><a href=\"/page1\">链接1</a></li>\n        <li><a href=\"/page2\">链接2</a></li>\n        <li><a href=\"/page3\">链接3</a></li>\n      </ul>\n      <img src=\"image.jpg\" alt=\"示例图片\"/>\n    </div>\n  </body>\n</html>" |  |

已检查示例：

```bash
html-tools dev/xpath-tester evaluate --xpath '//title' --xml-content '<html>
  <head>
    <title>示例页面</title>
  </head>
  <body>
    <div class="container">
      <h1 id="main-title">欢迎</h1>
      <p class="intro">这是一个示例页面</p>
      <ul>
        <li><a href="/page1">链接1</a></li>
        <li><a href="/page2">链接2</a></li>
        <li><a href="/page3">链接3</a></li>
      </ul>
      <img src="image.jpg" alt="示例图片"/>
    </div>
  </body>
</html>' --json
```

### dev/gradient-generator

CSS 渐变生成器：CSS 渐变生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/gradient-generator.html`，SHA-256：`cf63e87edaf198b370c5b35562567997950185f6e5dee817ef4621e271e4ee98`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `reverse-colors` | 🔄 反转颜色 | angleValue, colorStops, codeOutput |
| `update-gradient` | updateGradient | angleValue, codeOutput |
| `run` | 按字段输入重新计算 | angleValue, colorStops, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--angle` | 角度 | range | "90" | min=0, max=360 |
| `--shape` | 形状 | select-one | "circle" | "circle" (圆形); "ellipse" (椭圆) |
| `--position` | 位置 | select-one | "center" | "center" (中心); "top" (上); "bottom" (下); "left" (左); "right" (右); "top left" (左上); "top right" (右上); "bottom left" (左下); "bottom right" (右下) |
| `--field-4` | 形状 | color | "#00d9ff" |  |
| `--field-5` | 形状 | text | "#00d9ff" |  |
| `--field-6` | 形状 | range | "0" | min=0, max=100 |
| `--field-7` | 形状 | color | "#e94560" |  |
| `--field-8` | 形状 | text | "#e94560" |  |
| `--field-9` | 形状 | range | "100" | min=0, max=100 |

已检查示例：

```bash
html-tools dev/gradient-generator reverse-colors --angle '90' --shape 'circle' --position 'center' --field-4 '#00d9ff' --field-5 '#00d9ff' --field-6 '0' --field-7 '#e94560' --field-8 '#e94560' --field-9 '100' --json
```

### dev/http-client

HTTP 请求测试：HTTP 请求测试，在线验证，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/http-client.html`，SHA-256：`489056eb5ce30b2cde1678f823dd447a2aa54e48a934c5b2cb844c8d46867f8d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `send-request` | 发送请求 | responseTime, responseSize, responseBody, responseHeaders |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--method` | method | select-one | "GET" | "GET" (GET); "POST" (POST); "PUT" (PUT); "PATCH" (PATCH); "DELETE" (DELETE) |
| `--url` | https://api.example.com/endpoint | url | "https://jsonplaceholder.typicode.com/posts/1" |  |
| `--field-3` | 参数名 | text | "" |  |
| `--field-4` | 参数值 | text | "" |  |
| `--field-5` | Header 名 | text | "Content-Type" |  |
| `--field-6` | Header 值 | text | "application/json" |  |
| `--request-body` | {"key": "value"} | textarea | "" |  |

已检查示例：

```bash
html-tools dev/http-client send-request --method 'GET' --url 'https://jsonplaceholder.typicode.com/posts/1' --field-3 'Hello world
Hello world
TypeScript' --field-4 'Hello world
Hello world
TypeScript' --field-5 'Content-Type' --field-6 'application/json' --request-body 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: update-method-color: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### dev/json-schema-generator

JSON Schema 生成器：JSON Schema 生成器，一键在线生成，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/json-schema-generator.html`，SHA-256：`3450d0749e3c5cfb29330641141fb68258df57e88e597788e0cea7989f45c977`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format-json` | 格式化 | json-input |
| `generate-schema` | generateSchema | field-count, depth-count, schema-output |
| `run` | 按字段输入重新计算 | field-count, depth-count, schema-output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--opt-required` / `--no-opt-required` | 生成 required 字段 | checkbox | true |  |
| `--opt-additional` / `--no-opt-additional` | 允许额外属性 | checkbox | false |  |
| `--opt-examples` / `--no-opt-examples` | 包含示例值 | checkbox | true |  |
| `--opt-description` / `--no-opt-description` | 生成描述字段 | checkbox | false |  |
| `--opt-nullable` / `--no-opt-nullable` | 允许 null 值 | checkbox | false |  |
| `--opt-minmax` / `--no-opt-minmax` | 推断数值范围 | checkbox | false |  |
| `--json-input` | 输入 JSON 数据... | textarea | "{\n  \"id\": 1,\n  \"name\": \"张三\",\n  \"email\": \"zhangsan@example.com\",\n  \"age\": 28,\n  \"active\": true,\n  \"roles\": [\"admin\", \"user\"],\n  \"profile\": {\n    \"avatar\": \"https://example.com/avatar.jpg\",\n    \"bio\": \"软件工程师\"\n  },\n  \"createdAt\": \"2024-01-15T10:30:00Z\"\n}" |  |

已检查示例：

```bash
html-tools dev/json-schema-generator format-json --opt-required --no-opt-additional --opt-examples --no-opt-description --no-opt-nullable --no-opt-minmax --json-input '{
  "id": 1,
  "name": "张三",
  "email": "zhangsan@example.com",
  "age": 28,
  "active": true,
  "roles": ["admin", "user"],
  "profile": {
    "avatar": "https://example.com/avatar.jpg",
    "bio": "软件工程师"
  },
  "createdAt": "2024-01-15T10:30:00Z"
}' --json
```

### dev/diff-checker

文本差异比较：比较两段文本的差异，高亮显示修改内容

来源：`html-tools/tools/dev/diff-checker.html`，SHA-256：`3171b03d858c2baaa15b756bb52d42db779b96bb69ebc3d985357faf4ac9d03d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `compare-diff` | 对比差异 | addedCount, removedCount, diffContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text1` | 输入或粘贴原始文本... | textarea | "" |  |
| `--text2` | 输入或粘贴修改后的文本... | textarea | "" |  |

已检查示例：

```bash
html-tools dev/diff-checker compare-diff --text1 'Hello world
Hello world
TypeScript' --text2 'Hello world
Hello world
TypeScript' --json
```

### dev/url-encoder

URL编码：URL编码解码

来源：`html-tools/tools/dev/url-encoder.html`，SHA-256：`93f9ae5afb2e1523d968684e8f2427b1a5a92264d01e1383c253ad0549fdf292`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `encode` | 编码 | output |
| `decode` | 解码 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入 | textarea | "" |  |

已检查示例：

```bash
html-tools dev/url-encoder encode --input 'Hello world
Hello world
TypeScript' --json
```

### dev/markdown-preview

Markdown预览：实时预览Markdown

来源：`html-tools/tools/dev/markdown-preview.html`，SHA-256：`44c770dce80de481d1532d62d15f6c169c4633abbc2eb6c46e94ab57125ac374`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | preview |
| `run` | 按字段输入重新计算 | preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--md` | md | textarea | "# Hello Markdown!\n\n这是一个 **Markdown** 预览器。\n\n## 功能\n\n- 实时预览\n- 支持常见语法\n- 代码高亮\n\n### 代码示例\n\n`inline code`\n\n```\nfunction hello() {\n    console.log('Hello!');\n}\n```\n\n> 这是引用文本\n\n1. 有序列表1\n2. 有序列表2\n" |  |

已检查示例：

```bash
html-tools dev/markdown-preview render --md '# Hello Markdown!

这是一个 **Markdown** 预览器。

## 功能

- 实时预览
- 支持常见语法
- 代码高亮

### 代码示例

`inline code`

```
function hello() {
    console.log('\''Hello!'\'');
}
```

> 这是引用文本

1. 有序列表1
2. 有序列表2
' --json
```

### dev/table-generator

表格生成器：生成Markdown/HTML/CSV表格

来源：`html-tools/tools/dev/table-generator.html`，SHA-256：`c664e8ce515f42ff2d6af84d56feb144cd7b2c6c258ae5d32ac7c06ade4ded56`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-table` | 更新 | output |
| `generate-markdown` | generateMarkdown | value |
| `generate-html` | generateHTML | value |
| `generate-csv` | generateCSV | value |
| `generate-output` | generateOutput | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--rows` | 行数: | number | "3" | min=1, max=20 |
| `--cols` | 行数: | number | "3" | min=1, max=10 |
| `--field-3` | 行数: | text | "Header 1" |  |
| `--field-4` | 行数: | text | "Header 2" |  |
| `--field-5` | 行数: | text | "Header 3" |  |
| `--field-6` | 行数: | text | "Row 1 Col 1" |  |
| `--field-7` | 行数: | text | "Row 1 Col 2" |  |
| `--field-8` | 行数: | text | "Row 1 Col 3" |  |
| `--field-9` | 行数: | text | "Row 2 Col 1" |  |
| `--field-10` | 行数: | text | "Row 2 Col 2" |  |
| `--field-11` | 行数: | text | "Row 2 Col 3" |  |
| `--field-12` | 行数: | text | "Row 3 Col 1" |  |
| `--field-13` | 行数: | text | "Row 3 Col 2" |  |
| `--field-14` | 行数: | text | "Row 3 Col 3" |  |

已检查示例：

```bash
html-tools dev/table-generator update-table --rows '3' --cols '3' --field-3 'Header 1' --field-4 'Header 2' --field-5 'Header 3' --field-6 'Row 1 Col 1' --field-7 'Row 1 Col 2' --field-8 'Row 1 Col 3' --field-9 'Row 2 Col 1' --field-10 'Row 2 Col 2' --field-11 'Row 2 Col 3' --field-12 'Row 3 Col 1' --field-13 'Row 3 Col 2' --field-14 'Row 3 Col 3' --json
```

### dev/api-tester

Api Tester：Api Tester，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/api-tester.html`，SHA-256：`1387244d0024a0a8679d344ff078db5aef4a6d5f440970dda3d916c3f5ff5e50`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `send-request` | 发送请求 | responseTime, responseBody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--method` | method | select-one | "GET" | "GET" (GET); "POST" (POST); "PUT" (PUT); "PATCH" (PATCH); "DELETE" (DELETE) |
| `--url` | 输入API地址... | text | "https://jsonplaceholder.typicode.com/posts/1" |  |
| `--field-3` | 键 | text | "Content-Type" |  |
| `--field-4` | 值 | text | "application/json" |  |
| `--request-body` | {"key": "value"} | textarea | "" |  |

已检查示例：

```bash
html-tools dev/api-tester send-request --method 'GET' --url 'https://jsonplaceholder.typicode.com/posts/1' --field-3 'Content-Type' --field-4 'application/json' --request-body 'Hello world
Hello world
TypeScript' --json
```

### dev/css-animation

Css Animation：Css Animation，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/css-animation.html`，SHA-256：`f610e172e9c3e81afb78ab927bfdc103c8c1020b0952cd61903aaa6695080b15`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update` | update | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--animation-name` | 动画名称 | text | "myAnimation" |  |
| `--duration` | 持续时间 | text | "1s" |  |
| `--delay` | 延迟 | text | "0s" |  |
| `--timing` | 时间函数 | select-one | "ease" | "ease" (ease); "ease-in" (ease-in); "ease-out" (ease-out); "ease-in-out" (ease-in-out); "linear" (linear); "cubic-bezier(0.68, -0.55, 0.265, 1.55)" (弹性) |
| `--iteration` | 循环次数 | select-one | "infinite" | "1" (1); "2" (2); "3" (3); "infinite" (无限) |
| `--direction` | 方向 | select-one | "normal" | "normal" (normal); "reverse" (reverse); "alternate" (alternate); "alternate-reverse" (alternate-reverse) |
| `--fill-mode` | 填充模式 | select-one | "none" | "none" (none); "forwards" (forwards); "backwards" (backwards); "both" (both) |
| `--field-8` | 时间函数 | number | "0" | min=0, max=100 |
| `--field-9` | 时间函数 | textarea | "transform: translateY(0);" |  |
| `--field-10` | 时间函数 | number | "50" | min=0, max=100 |
| `--field-11` | 时间函数 | textarea | "transform: translateY(-20px);" |  |
| `--field-12` | 时间函数 | number | "100" | min=0, max=100 |
| `--field-13` | 时间函数 | textarea | "transform: translateY(0);" |  |

已检查示例：

```bash
html-tools dev/css-animation update --animation-name 'myAnimation' --duration '1s' --delay '0s' --timing 'ease' --iteration 'infinite' --direction 'normal' --fill-mode 'none' --field-8 '0' --field-9 'transform: translateY(0);' --field-10 '50' --field-11 'transform: translateY(-20px);' --field-12 '100' --field-13 'transform: translateY(0);' --json
```

### dev/css-flexbox

Css Flexbox：Css Flexbox，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/css-flexbox.html`，SHA-256：`c7a65cab73cb7fa99c51ea10d906b5258a14677486b4f9c0cf120fe849e3ab1e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update` | update | output |
| `update-item` | updateItem | output |
| `generate-output` | generateOutput | output |
| `run` | 按字段输入重新计算 | output, flexGrow, flexShrink, order |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--flex-direction` | flex-direction | select-one | "row" | "row" (row); "row-reverse" (row-reverse); "column" (column); "column-reverse" (column-reverse) |
| `--flex-wrap` | flex-wrap | select-one | "nowrap" | "nowrap" (nowrap); "wrap" (wrap); "wrap-reverse" (wrap-reverse) |
| `--justify-content` | justify-content | select-one | "flex-start" | "flex-start" (flex-start); "flex-end" (flex-end); "center" (center); "space-between" (space-between); "space-around" (space-around); "space-evenly" (space-evenly) |
| `--align-items` | align-items | select-one | "stretch" | "stretch" (stretch); "flex-start" (flex-start); "flex-end" (flex-end); "center" (center); "baseline" (baseline) |
| `--align-content` | align-content | select-one | "stretch" | "stretch" (stretch); "flex-start" (flex-start); "flex-end" (flex-end); "center" (center); "space-between" (space-between); "space-around" (space-around) |
| `--gap` | gap | select-one | "8px" | "0" (0); "8px" (8px); "16px" (16px); "24px" (24px); "32px" (32px) |
| `--selected-item` | 选择项目 | select-one | "0" | "0" (项目 1); "1" (项目 2); "2" (项目 3) |
| `--flex-grow` | flex-grow | number | "0" | min=0 |
| `--flex-shrink` | flex-shrink | number | "1" | min=0 |
| `--order` | order | number | "0" |  |
| `--align-self` | align-self | select-one | "auto" | "auto" (auto); "flex-start" (flex-start); "flex-end" (flex-end); "center" (center); "stretch" (stretch) |

已检查示例：

```bash
html-tools dev/css-flexbox update --flex-direction 'row' --flex-wrap 'nowrap' --justify-content 'flex-start' --align-items 'stretch' --align-content 'stretch' --gap '8px' --selected-item '0' --flex-grow '0' --flex-shrink '1' --order '0' --align-self 'auto' --json
```

操作限制：部分原页面操作未通过迁移检查: update-item-select: 原工具没有产生可输出的结果，请检查参数

### dev/css-gradient-generator

Css Gradient Generator：Css Gradient Generator，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/css-gradient-generator.html`，SHA-256：`f5b53c1a9c5a67243bd2b3d671dc72c99629622a1b0e0c96c446bbe4ae24d227`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-gradient` | updateGradient | angleValue, output |
| `run` | 按字段输入重新计算 | angleValue, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--gradient-type` | 类型 | select-one | "linear" | "linear" (线性渐变); "radial" (径向渐变); "conic" (锥形渐变) |
| `--angle` | 类型 | range | "135" | min=0, max=360 |
| `--field-3` | 类型 | color | "#667eea" |  |
| `--field-4` | 类型 | number | "0" | min=0, max=100 |
| `--field-5` | 类型 | color | "#764ba2" |  |
| `--field-6` | 类型 | number | "100" | min=0, max=100 |

已检查示例：

```bash
html-tools dev/css-gradient-generator update-gradient --gradient-type 'linear' --angle '135' --field-3 '#667eea' --field-4 '0' --field-5 '#764ba2' --field-6 '100' --json
```

### dev/curl-builder

Curl Builder：Curl Builder，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/curl-builder.html`，SHA-256：`6bfdb8624ed133e568adc7b80ad434ddeedfb26484236332c9282a4ebfb62c1b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `build-curl` | buildCurl | command |
| `run` | 按字段输入重新计算 | command |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--method` | method | select-one | "GET" | "GET" (GET); "POST" (POST); "PUT" (PUT); "PATCH" (PATCH); "DELETE" (DELETE); "HEAD" (HEAD); "OPTIONS" (OPTIONS) |
| `--url` | https://api.example.com/endpoint | text | "https://api.example.com/users" |  |
| `--field-3` | 请求方法和 URL | text | "Content-Type" |  |
| `--field-4` | 请求方法和 URL | text | "application/json" |  |
| `--field-5` | 请求方法和 URL | text | "Authorization" |  |
| `--field-6` | 请求方法和 URL | text | "Bearer YOUR_TOKEN" |  |
| `--body` | 请求体 (JSON) | textarea | "{\"name\": \"John\", \"email\": \"john@example.com\"}" |  |
| `--auth-type` | authType | select-one | "none" | "none" (无); "basic" (Basic Auth); "bearer" (Bearer Token) |
| `--auth-value` | 用户名:密码 或 Token | text | "" |  |
| `--opt-verbose` / `--no-opt-verbose` | 详细输出 (-v) | checkbox | false |  |
| `--opt-insecure` / `--no-opt-insecure` | 忽略 SSL (-k) | checkbox | false |  |
| `--opt-location` / `--no-opt-location` | 跟随重定向 (-L) | checkbox | true |  |
| `--opt-silent` / `--no-opt-silent` | 静默模式 (-s) | checkbox | false |  |
| `--opt-output` / `--no-opt-output` | 输出到文件 | checkbox | false |  |
| `--field-output-file` | 输出文件名 | text | "" |  |
| `--field-timeout` | 超时设置 (秒) | number | "" |  |

已检查示例：

```bash
html-tools dev/curl-builder build-curl --method 'GET' --url 'https://api.example.com/users' --field-3 'Content-Type' --field-4 'application/json' --field-5 'Authorization' --field-6 'Bearer YOUR_TOKEN' --body '{"name": "John", "email": "john@example.com"}' --auth-type 'none' --auth-value 'Hello world
Hello world
TypeScript' --no-opt-verbose --no-opt-insecure --opt-location --no-opt-silent --no-opt-output --field-output-file 'Hello world
Hello world
TypeScript' --field-timeout '10' --json
```

### dev/docker-command-builder

Docker Command Builder：Docker Command Builder，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/docker-command-builder.html`，SHA-256：`e5df5bb54b43f2b25b01030af6ebb962b58a99297bb8d977c81dffcf9fbf4ad0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `build-run` | buildRun | command |
| `build-build` | buildBuild | command |
| `build-exec` | buildExec | command |
| `build-compose` | buildCompose | command |
| `build-image` | buildImage | command |
| `build-container` | buildContainer | command |
| `run` | 按字段输入重新计算 | command |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--run-image` | 镜像名称 | text | "nginx:latest" |  |
| `--run-name` | 容器名称 | text | "" |  |
| `--run-ports` | 端口映射 (host:container) | text | "" |  |
| `--run-volumes` | 卷挂载 (host:container) | text | "" |  |
| `--run-env` | 环境变量 (KEY=VALUE, 每行一个) | textarea | "" |  |
| `--run-detach` / `--no-run-detach` | 后台运行 (-d) | checkbox | true |  |
| `--run-rm` / `--no-run-rm` | 退出后删除 (--rm) | checkbox | false |  |
| `--run-it` / `--no-run-it` | 交互模式 (-it) | checkbox | false |  |
| `--run-restart` / `--no-run-restart` | 自动重启 | checkbox | false |  |
| `--run-cmd` | 自定义命令 (可选) | text | "" |  |
| `--build-tag` | 镜像标签 | text | "myapp:latest" |  |
| `--build-file` | Dockerfile 路径 | text | "" |  |
| `--build-context` | 构建上下文 | text | "." |  |
| `--build-args` | 构建参数 (KEY=VALUE) | textarea | "" |  |
| `--build-no-cache` / `--no-build-no-cache` | 不使用缓存 | checkbox | false |  |
| `--build-pull` / `--no-build-pull` | 总是拉取基础镜像 | checkbox | false |  |
| `--exec-container` | 容器名称/ID | text | "" |  |
| `--exec-cmd` | 命令 | text | "/bin/bash" |  |
| `--exec-it` / `--no-exec-it` | 交互模式 (-it) | checkbox | true |  |
| `--exec-user` / `--no-exec-user` | 指定用户 | checkbox | false |  |
| `--exec-user-name` | 用户 | text | "" |  |
| `--compose-action` | 操作 | select-one | "up" | "up" (启动 (up)); "down" (停止 (down)); "build" (构建 (build)); "logs" (日志 (logs)); "ps" (状态 (ps)); "restart" (重启 (restart)) |
| `--compose-file` | 文件路径 | text | "" |  |
| `--compose-service` | 服务名称 (可选) | text | "" |  |
| `--compose-detach` / `--no-compose-detach` | 后台运行 (-d) | checkbox | true |  |
| `--compose-build` / `--no-compose-build` | 构建镜像 (--build) | checkbox | false |  |
| `--compose-follow` / `--no-compose-follow` | 跟踪日志 (-f) | checkbox | false |  |
| `--image-action` | 操作 | select-one | "pull" | "pull" (拉取 (pull)); "push" (推送 (push)); "tag" (标记 (tag)); "rmi" (删除 (rmi)); "ls" (列表 (images)); "prune" (清理 (prune)) |
| `--image-name` | 镜像名称 | text | "" |  |
| `--image-new-tag` | 新标签 | text | "" |  |
| `--container-action` | 操作 | select-one | "start" | "start" (启动 (start)); "stop" (停止 (stop)); "restart" (重启 (restart)); "rm" (删除 (rm)); "logs" (日志 (logs)); "ps" (列表 (ps)); "inspect" (详情 (inspect)) |
| `--container-name` | 容器名称/ID | text | "" |  |
| `--container-force` / `--no-container-force` | 强制 (-f) | checkbox | false |  |
| `--container-all` / `--no-container-all` | 包含已停止 (-a) | checkbox | false |  |
| `--container-follow` / `--no-container-follow` | 跟踪日志 (-f) | checkbox | false |  |

已检查示例：

```bash
html-tools dev/docker-command-builder build-run --run-image 'nginx:latest' --run-name 'Hello world
Hello world
TypeScript' --run-ports 'Hello world
Hello world
TypeScript' --run-volumes 'Hello world
Hello world
TypeScript' --run-env 'Hello world
Hello world
TypeScript' --run-detach --no-run-rm --no-run-it --no-run-restart --run-cmd 'Hello world
Hello world
TypeScript' --build-tag 'myapp:latest' --build-file 'Hello world
Hello world
TypeScript' --build-context '.' --build-args 'Hello world
Hello world
TypeScript' --no-build-no-cache --no-build-pull --exec-container 'Hello world
Hello world
TypeScript' --exec-cmd '/bin/bash' --exec-it --no-exec-user --exec-user-name 'Hello world
Hello world
TypeScript' --compose-action 'up' --compose-file 'Hello world
Hello world
TypeScript' --compose-service 'Hello world
Hello world
TypeScript' --compose-detach --no-compose-build --no-compose-follow --image-action 'pull' --image-name 'Hello world
Hello world
TypeScript' --image-new-tag 'Hello world
Hello world
TypeScript' --container-action 'start' --container-name 'Hello world
Hello world
TypeScript' --no-container-force --no-container-all --no-container-follow --json
```

### dev/env-generator

Env Generator：Env Generator，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/env-generator.html`，SHA-256：`e569371a4bc927363162f3a23647d64ce9ce3b5d3a9755a018a781c537185afe`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | generate | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--key` | 添加注释 | text | "NODE_ENV" |  |
| `--value` | 添加注释 | text | "development" |  |
| `--comment` | 添加注释 | text | "运行环境" |  |
| `--key-2` | 添加注释 | text | "PORT" |  |
| `--value-2` | 添加注释 | text | "3000" |  |
| `--comment-2` | 添加注释 | text | "服务端口" |  |
| `--add-comments` / `--no-add-comments` | 添加注释 | checkbox | true |  |
| `--quote-values` / `--no-quote-values` | 值加引号 | checkbox | false |  |
| `--sort-keys` / `--no-sort-keys` | 按字母排序 | checkbox | false |  |

已检查示例：

```bash
html-tools dev/env-generator generate --key 'NODE_ENV' --value 'development' --comment '运行环境' --key-2 'PORT' --value-2 '3000' --comment-2 '服务端口' --add-comments --no-quote-values --no-sort-keys --json
```

### dev/git-command-builder

Git Command Builder：Git Command Builder，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/git-command-builder.html`，SHA-256：`0a47dc0fe3ade627cf5e06b1e59fd805040ec6dc8888c4863be45c92d71d2545`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `build-clone` | buildClone | command |
| `build-commit` | buildCommit | command |
| `build-branch` | buildBranch | command |
| `build-merge` | buildMerge | command |
| `build-reset` | buildReset | command |
| `build-stash` | buildStash | command |
| `build-remote` | buildRemote | command |
| `run` | 按字段输入重新计算 | command |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--clone-url` | 仓库 URL | text | "" |  |
| `--clone-dir` | 目标目录 (可选) | text | "" |  |
| `--clone-depth` / `--no-clone-depth` | 浅克隆 (--depth 1) | checkbox | false |  |
| `--clone-branch` / `--no-clone-branch` | 指定分支 | checkbox | false |  |
| `--clone-branch-name` | 分支名 | text | "" |  |
| `--commit-msg` | 提交信息 | text | "" |  |
| `--commit-all` / `--no-commit-all` | 添加所有文件 (-a) | checkbox | false |  |
| `--commit-amend` / `--no-commit-amend` | 修改上次提交 (--amend) | checkbox | false |  |
| `--commit-sign` / `--no-commit-sign` | 签名 (-S) | checkbox | false |  |
| `--branch-action` | 操作 | select-one | "create" | "create" (创建分支); "delete" (删除分支); "rename" (重命名分支); "list" (列出分支); "checkout" (切换分支) |
| `--branch-name` | 分支名 | text | "" |  |
| `--branch-new-name` | 新分支名 | text | "" |  |
| `--branch-force` / `--no-branch-force` | 强制 (-D/-f) | checkbox | false |  |
| `--branch-remote` / `--no-branch-remote` | 包含远程 (-a) | checkbox | false |  |
| `--merge-branch` | 要合并的分支 | text | "" |  |
| `--merge-no-ff` / `--no-merge-no-ff` | 禁用快进 (--no-ff) | checkbox | false |  |
| `--merge-squash` / `--no-merge-squash` | 压缩提交 (--squash) | checkbox | false |  |
| `--reset-mode` | 重置模式 | select-one | "mixed" | "soft" (软重置 (--soft) - 保留工作区和暂存区); "mixed" (混合重置 (--mixed) - 保留工作区); "hard" (硬重置 (--hard) - 丢弃所有更改) |
| `--reset-target` | 目标 | text | "HEAD~1" |  |
| `--stash-action` | 操作 | select-one | "push" | "push" (保存 (push)); "pop" (恢复并删除 (pop)); "apply" (恢复不删除 (apply)); "list" (列出 (list)); "drop" (删除 (drop)); "clear" (清空 (clear)) |
| `--stash-msg` | 描述信息 (可选) | text | "" |  |
| `--remote-action` | 操作 | select-one | "add" | "add" (添加远程); "remove" (删除远程); "rename" (重命名远程); "list" (列出远程); "fetch" (获取 (fetch)); "pull" (拉取 (pull)); "push" (推送 (push)) |
| `--remote-name` | 远程名称 | text | "origin" |  |
| `--remote-url` | 远程 URL | text | "" |  |
| `--remote-branch` | 分支 | text | "main" |  |

已检查示例：

```bash
html-tools dev/git-command-builder build-clone --clone-url 'https://example.com/path?a=1' --clone-dir 'Hello world
Hello world
TypeScript' --no-clone-depth --no-clone-branch --clone-branch-name 'Hello world
Hello world
TypeScript' --commit-msg 'Hello world
Hello world
TypeScript' --no-commit-all --no-commit-amend --no-commit-sign --branch-action 'create' --branch-name 'Hello world
Hello world
TypeScript' --branch-new-name 'Hello world
Hello world
TypeScript' --no-branch-force --no-branch-remote --merge-branch 'Hello world
Hello world
TypeScript' --no-merge-no-ff --no-merge-squash --reset-mode 'mixed' --reset-target 'HEAD~1' --stash-action 'push' --stash-msg 'Hello world
Hello world
TypeScript' --remote-action 'add' --remote-name 'origin' --remote-url 'https://example.com/path?a=1' --remote-branch 'main' --json
```

### dev/git-command-helper

Git Command Helper：Git Command Helper，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/git-command-helper.html`，SHA-256：`69115ba8484df006dd5d63680883ac2853e739c988fdb8bfa5766690a2e8a191`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | commands |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--search` | 搜索Git命令... | search | "" |  |

已检查示例：

```bash
html-tools dev/git-command-helper run --search 'Hello world
Hello world
TypeScript' --json
```

### dev/htaccess-generator

Htaccess 生成器：Htaccess 生成器，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/htaccess-generator.html`，SHA-256：`0554b82ee6dab2e1cca45465b1baafacab20a72b6e69e6d39a96847e99c5d66c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | generate | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--force-https` / `--no-force-https` | 强制 HTTPS 重定向 HTTP 到 HTTPS | checkbox | true |  |
| `--force-www` / `--no-force-www` | 强制 www 重定向到 www 子域名 | checkbox | false |  |
| `--remove-www` / `--no-remove-www` | 移除 www 重定向到非 www 域名 | checkbox | false |  |
| `--remove-trailing-slash` / `--no-remove-trailing-slash` | 移除尾部斜杠 | checkbox | false |  |
| `--disable-directory-listing` / `--no-disable-directory-listing` | 禁止目录浏览 | checkbox | true |  |
| `--block-sensitive-files` / `--no-block-sensitive-files` | 保护敏感文件 .env, .git, .htaccess 等 | checkbox | true |  |
| `--prevent-hotlinking` / `--no-prevent-hotlinking` | 防止盗链 保护图片资源 | checkbox | false |  |
| `--security-headers` / `--no-security-headers` | 安全响应头 XSS, CSP 等 | checkbox | false |  |
| `--enable-caching` / `--no-enable-caching` | 启用浏览器缓存 提高性能 | checkbox | false |  |
| `--gzip-compression` / `--no-gzip-compression` | Gzip 压缩 | checkbox | true |  |
| `--from` | 强制 HTTPS 重定向 HTTP 到 HTTPS | text | "" |  |
| `--to` | 强制 HTTPS 重定向 HTTP 到 HTTPS | text | "" |  |
| `--error404` | 404 错误页面 | text | "" |  |
| `--error500` | 500 错误页面 | text | "" |  |

已检查示例：

```bash
html-tools dev/htaccess-generator generate --force-https --no-force-www --no-remove-www --no-remove-trailing-slash --disable-directory-listing --block-sensitive-files --no-prevent-hotlinking --no-security-headers --no-enable-caching --gzip-compression --from 'Hello world
Hello world
TypeScript' --to 'Hello world
Hello world
TypeScript' --error404 'Hello world
Hello world
TypeScript' --error500 'Hello world
Hello world
TypeScript' --json
```

### dev/html-entity-encoder

Html Entity Encoder：Html Entity Encoder，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/html-entity-encoder.html`，SHA-256：`7e0448e130f72d7fd3c2ea6b54b6ee2a024eebf63fde50a8d97de535fac27bbb`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `process` | process | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | textarea | "<div class=\"test\">Hello & World</div>" |  |

已检查示例：

```bash
html-tools dev/html-entity-encoder process --input '<div class="test">Hello & World</div>' --json
```

### dev/html-minifier

Html Minifier：Html Minifier，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/html-minifier.html`，SHA-256：`7540dcd670104a09d455182c7d79df7e45955e68bf7a76f095d49c4bf6dedf16`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `minify-html` | 压缩 | output, originalSize, compressedSize, compressionRatio |
| `beautify-html` | 美化 | output, originalSize, compressedSize, compressionRatio |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--remove-comments` / `--no-remove-comments` | 移除注释 | checkbox | true |  |
| `--collapse-whitespace` / `--no-collapse-whitespace` | 压缩空白 | checkbox | true |  |
| `--remove-empty-attrs` / `--no-remove-empty-attrs` | 移除空属性 | checkbox | false |  |
| `--input` | 粘贴 HTML 代码... | textarea | "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>示例页面</title>\n</head>\n<body>\n    <!-- 主要内容 -->\n    <div class=\"container\">\n        <h2>欢迎</h2>\n        <p>这是一个示例页面。</p>\n    </div>\n</body>\n</html>" |  |

已检查示例：

```bash
html-tools dev/html-minifier minify-html --remove-comments --collapse-whitespace --no-remove-empty-attrs --input '<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>示例页面</title>
</head>
<body>
    <!-- 主要内容 -->
    <div class="container">
        <h2>欢迎</h2>
        <p>这是一个示例页面。</p>
    </div>
</body>
</html>' --json
```

### dev/http-status-codes

Http Status Codes：Http Status Codes，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/http-status-codes.html`，SHA-256：`663c16dce4672ad10d91bb58d51ccbb2d31e967d689fa2b50b94b2f0166641cb`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | content |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--search` | 搜索状态码或描述... | search | "" |  |

已检查示例：

```bash
html-tools dev/http-status-codes run --search 'Hello world
Hello world
TypeScript' --json
```

### dev/json-path-finder

Json Path Finder：Json Path Finder，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/json-path-finder.html`，SHA-256：`117aa5125ce00e57dd2ab82729743298b9fc58868e7efe5e974624f06f14a798`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse-json` | parseJSON | depth, keyCount, size, jsonTree |
| `run` | 按字段输入重新计算 | depth, keyCount, size, jsonTree |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--json-input` | 粘贴JSON数据... | textarea | "{\n  \"user\": {\n    \"name\": \"张三\",\n    \"age\": 28,\n    \"email\": \"zhangsan@example.com\",\n    \"address\": {\n      \"city\": \"北京\",\n      \"district\": \"朝阳区\"\n    },\n    \"hobbies\": [\"读书\", \"旅游\", \"编程\"],\n    \"isActive\": true\n  },\n  \"orders\": [\n    {\"id\": 1001, \"product\": \"手机\", \"price\": 4999},\n    {\"id\": 1002, \"product\": \"笔记本\", \"price\": 6999}\n  ]\n}" |  |

已检查示例：

```bash
html-tools dev/json-path-finder parse-json --json-input '{
  "user": {
    "name": "张三",
    "age": 28,
    "email": "zhangsan@example.com",
    "address": {
      "city": "北京",
      "district": "朝阳区"
    },
    "hobbies": ["读书", "旅游", "编程"],
    "isActive": true
  },
  "orders": [
    {"id": 1001, "product": "手机", "price": 4999},
    {"id": 1002, "product": "笔记本", "price": 6999}
  ]
}' --json
```

操作限制：部分原页面操作未通过迁移检查: search-json: 原工具没有产生可输出的结果，请检查参数

### dev/json-path-tester

Json Path Tester：Json Path Tester，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/json-path-tester.html`，SHA-256：`8a402e4e344e8ce00a5d001a07a6f8267a0a06b1a15687e9fa511dd1dd359b8f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `query-path` | 查询 | resultOutput, matchCount |
| `run` | 按字段输入重新计算 | resultOutput, matchCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--path-input` | 输入 JSONPath (如: $.store.book[*].author) | text | "$.store.book[*].author" |  |
| `--json-input` | jsonInput | textarea | "{\n  \"store\": {\n    \"book\": [\n      { \"category\": \"reference\", \"author\": \"Nigel Rees\", \"title\": \"Sayings\", \"price\": 8.95 },\n      { \"category\": \"fiction\", \"author\": \"Evelyn Waugh\", \"title\": \"Sword\", \"price\": 12.99 },\n      { \"category\": \"fiction\", \"author\": \"Herman Melville\", \"title\": \"Moby Dick\", \"price\": 8.99 },\n      { \"category\": \"fiction\", \"author\": \"Tolkien\", \"title\": \"The Lord of the Rings\", \"price\": 22.99 }\n    ],\n    \"bicycle\": { \"color\": \"red\", \"price\": 19.95 }\n  }\n}" |  |

已检查示例：

```bash
html-tools dev/json-path-tester query-path --path-input '$.store.book[*].author' --json-input '{
  "store": {
    "book": [
      { "category": "reference", "author": "Nigel Rees", "title": "Sayings", "price": 8.95 },
      { "category": "fiction", "author": "Evelyn Waugh", "title": "Sword", "price": 12.99 },
      { "category": "fiction", "author": "Herman Melville", "title": "Moby Dick", "price": 8.99 },
      { "category": "fiction", "author": "Tolkien", "title": "The Lord of the Rings", "price": 22.99 }
    ],
    "bicycle": { "color": "red", "price": 19.95 }
  }
}' --json
```

### dev/lorem-ipsum

Lorem Ipsum 占位文本生成器：Lorem Ipsum 占位文本生成器，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/lorem-ipsum.html`，SHA-256：`7bea9a9479005141a65fcbf808feaea1e8ded916260ec4f437f90d68350559f5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 | output, stats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--type` | 类型: | select-one | "paragraphs" | "paragraphs" (段落); "sentences" (句子); "words" (单词) |
| `--count` | 类型: | number | "3" | min=1, max=100 |
| `--start-with-lorem` / `--no-start-with-lorem` | 以 Lorem ipsum 开头 | checkbox | true |  |

已检查示例：

```bash
html-tools dev/lorem-ipsum generate --type 'paragraphs' --count '3' --start-with-lorem --json
```

### dev/nginx-config-generator

Nginx Config Generator：Nginx Config Generator，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/nginx-config-generator.html`，SHA-256：`e1ed6bced25c9c11404bdfbc250cd909891a96ac78bbddb2c3af8d0a6a143151`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | generate | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--server-name` | 服务器名称 | text | "example.com www.example.com" |  |
| `--listen-port` | 监听端口 | number | "80" |  |
| `--root-path` | 根目录 | text | "/var/www/html" |  |
| `--index-files` | 默认文件 | text | "index.html index.htm index.php" |  |
| `--enable-ssl` / `--no-enable-ssl` | 启用 HTTPS | checkbox | false |  |
| `--ssl-cert` | SSL 证书路径 | text | "/etc/ssl/certs/example.com.crt" |  |
| `--ssl-key` | SSL 密钥路径 | text | "/etc/ssl/private/example.com.key" |  |
| `--http-redirect` / `--no-http-redirect` | HTTP 重定向到 HTTPS | checkbox | true |  |
| `--http2` / `--no-http2` | 启用 HTTP/2 | checkbox | true |  |
| `--enable-proxy` / `--no-enable-proxy` | 启用反向代理 | checkbox | false |  |
| `--proxy-pass` | 代理目标 | text | "http://127.0.0.1:3000" |  |
| `--proxy-headers` / `--no-proxy-headers` | 传递请求头 | checkbox | true |  |
| `--proxy-websocket` / `--no-proxy-websocket` | WebSocket 支持 | checkbox | false |  |
| `--gzip` / `--no-gzip` | 启用 Gzip 压缩 | checkbox | true |  |
| `--security-headers` / `--no-security-headers` | 安全响应头 | checkbox | false |  |
| `--static-cache` / `--no-static-cache` | 静态资源缓存 | checkbox | false |  |
| `--access-log` / `--no-access-log` | 访问日志 | checkbox | true |  |

已检查示例：

```bash
html-tools dev/nginx-config-generator generate --server-name 'example.com www.example.com' --listen-port '80' --root-path '/var/www/html' --index-files 'index.html index.htm index.php' --no-enable-ssl --ssl-cert '/etc/ssl/certs/example.com.crt' --ssl-key '/etc/ssl/private/example.com.key' --http-redirect --http2 --no-enable-proxy --proxy-pass 'http://127.0.0.1:3000' --proxy-headers --no-proxy-websocket --gzip --no-security-headers --no-static-cache --access-log --json
```

### dev/npm-command-helper

Npm Command Helper：Npm Command Helper，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/npm-command-helper.html`，SHA-256：`6a558c036dd23277cfba09463bff461fb23aed32228a37ad95f3b2bf7ea35e4b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | commands |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--search` | 搜索NPM命令... | search | "" |  |

已检查示例：

```bash
html-tools dev/npm-command-helper run --search 'Hello world
Hello world
TypeScript' --json
```

### dev/sql-keywords

Sql Keywords：Sql Keywords，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/sql-keywords.html`，SHA-256：`03f68ad0478b9293a4c16acaca6cc8dce72830215913b9babf8bc207402165c3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | content |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--search` | 搜索SQL关键字... | search | "" |  |

已检查示例：

```bash
html-tools dev/sql-keywords run --search 'Hello world
Hello world
TypeScript' --json
```

### dev/string-escape

String Escape：String Escape，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/string-escape.html`，SHA-256：`86b522917a5f5a449bd128f5fffe6b183fabfb368e692286dac8711ba7c02d0b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `escape-str` | 转义 → | output |
| `unescape-str` | ← 反转义 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--format` | 语言/格式: | select-one | "javascript" | "javascript" (JavaScript / JSON); "html" (HTML); "url" (URL); "unicode" (Unicode); "regex" (正则表达式) |
| `--input` | 输入要转义的文本... | textarea | "Hello \"World\"\nThis is a\ttab and\nnew line." |  |

已检查示例：

```bash
html-tools dev/string-escape escape-str --format 'javascript' --input 'Hello "World"
This is a	tab and
new line.' --json
```

### dev/yaml-formatter

Yaml Formatter：Yaml Formatter，在线使用，开发工具，浏览器本地运行无需上传

来源：`html-tools/tools/dev/yaml-formatter.html`，SHA-256：`62b593bdaa78e1aa24a68d79471282b6d0dd4801fbbaa22f5082519820b3e69d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format-yaml` | 格式化 YAML | output |
| `yaml-to-json` | YAML → JSON | output |
| `minify-yaml` | 压缩 YAML | output |
| `validate` | validate | value |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入 YAML 复制 | textarea | "" |  |

已检查示例：

```bash
html-tools dev/yaml-formatter format-yaml --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: json-to-yaml: ✗ JSON 格式错误: Unexpected token 'H', "Hello worl"... is not valid JSON | run: ✓ YAML 格式正确

### dev/css-specificity-calculator

CSS 选择器权重计算器：输入任意 CSS 选择器，实时计算其优先级权重（a-b-c 三元组），并可视化比较多个选择器的层叠顺序。

来源：`html-tools/tools/dev/css-specificity-calculator.html`，SHA-256：`102950badba7f5ab858ab590feb618852dca04796c494149844d316d2bae708f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `build-examples` | buildExamples | examplesBar |
| `run` | 按字段输入重新计算 | specA, specB, specC, specTotal, specBreakdown |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--selector-input` | 输入 CSS 选择器，如 #nav .item > a:hover | text | "" |  |

已检查示例：

```bash
html-tools dev/css-specificity-calculator build-examples --selector-input 'Hello world
Hello world
TypeScript' --json
```

### dev/fluid-typography-clamp-generator

流体排版 / CSS clamp 生成器：根据最小/最大视口宽度和字号，自动生成 CSS clamp() 函数，实现响应式流体字体大小，无需媒体查询。

来源：`html-tools/tools/dev/fluid-typography-clamp-generator.html`，SHA-256：`5a285d27d759331e10e0c7facdbeeb227983ce66fd13df5f648b5fe4c6e8acda`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 clamp() | resultCode, resultBreakdown, vpDisplay, previewFsDisplay, sliderMin, sliderMax, statSlope, statIntercept, statRange |
| `update-preview` | updatePreview | vpDisplay, previewFsDisplay |
| `run` | 按字段输入重新计算 | resultCode, resultBreakdown, vpDisplay, previewFsDisplay, sliderMin, sliderMax, statSlope, statIntercept, statRange |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--min-vp` | 最小视口宽度 | number | "320" | min=1 |
| `--max-vp` | 最大视口宽度 | number | "1280" | min=1 |
| `--min-fs` | 最小字号 | number | "16" | min=1 |
| `--max-fs` | 最大字号 | number | "24" | min=1 |
| `--root-fs` | 根字号 (root font-size) | number | "16" | min=1 |
| `--output-unit` | outputUnit | select-one | "rem" | "rem" (rem); "px" (px) |
| `--use-round` / `--no-use-round` | 保留 4 位小数 | checkbox | false |  |
| `--vp-slider` | vpSlider | range | "800" | min=320, max=1280 |

已检查示例：

```bash
html-tools dev/fluid-typography-clamp-generator generate --min-vp '320' --max-vp '1280' --min-fs '16' --max-fs '24' --root-fs '16' --output-unit 'rem' --no-use-round --vp-slider '800' --json
```

### dev/media-query-builder

CSS 媒体查询生成器：可视化配置断点条件（宽度、高度、方向、分辨率），一键生成标准 CSS @media 查询代码。

来源：`html-tools/tools/dev/media-query-builder.html`，SHA-256：`973bbbfc7bc1cfbb5717b95657e3760b0c3cc14b5f4acc235ca3f861bffdf0fc`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `build-query` | buildQuery | value |
| `build-highlighted-query` | buildHighlightedQuery | value |
| `build-preset-buttons` | buildPresetButtons | presetsContainer |
| `run` | 按字段输入重新计算 | conditionsList, outputCode |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--media-type` | 媒体类型: | select-one | "screen" | "all" (all); "screen" (screen); "print" (print); "speech" (speech) |
| `--logic-op` | 条件逻辑: | select-one | "and" | "and" (AND（全部满足）); "or" (OR（任一满足）) |
| `--include-body` / `--no-include-body` | 包含 CSS 占位 | checkbox | true |  |

已检查示例：

```bash
html-tools dev/media-query-builder build-query --media-type 'screen' --logic-op 'and' --include-body --json
```

### dev/px-rem-em-converter

px / rem / em 单位转换器：基于根字号（root font-size）在 px、rem、em、pt 之间互相换算，快速查出任意 CSS 尺寸的等效值。

来源：`html-tools/tools/dev/px-rem-em-converter.html`，SHA-256：`2a7ec0cbc66a406d1b82b59a0411b7cf5b890e6edacc688798c7dd0e3ce82ef2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `build-ref-table` | buildRefTable | refTableBody |
| `run` | 按字段输入重新计算 | inputPx, inputRem, inputEm, inputPt, refTableBody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--root-font-size` | 根字号 (root): | number | "16" | min=1, max=100 |
| `--parent-font-size` | 父元素字号 (parent): | number | "16" | min=1, max=100 |
| `--decimal-places` | 小数位: | select-one | "2" | "2" (2); "3" (3); "4" (4); "5" (5) |
| `--input-px` | 0 | number | "" |  |
| `--input-rem` | 0 | number | "" |  |
| `--input-em` | 0 | number | "" |  |
| `--input-pt` | 0 | number | "" |  |

已检查示例：

```bash
html-tools dev/px-rem-em-converter build-ref-table --root-font-size '16' --parent-font-size '16' --decimal-places '2' --input-px '10' --input-rem '10' --input-em '10' --input-pt '10' --json
```

### dev/type-scale-calculator

字型比例计算器：输入基准字号和比例（Major Third、Perfect Fourth 等），生成完整的字型比例阶梯，并预览各级 heading 效果。

来源：`html-tools/tools/dev/type-scale-calculator.html`，SHA-256：`2df93dfb6dc878fffbe4b0729f4895081656c0a449b8b76d549816d649a4755f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update` | update | scaleInfo, stepsList, cssOutput |
| `run` | 按字段输入重新计算 | ratioDisplay, scaleInfo, stepsList, cssOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--base-size` | baseSize | number | "16" | min=8, max=32 |
| `--ratio-preset` | ratioPreset | select-one | "1.250" | "1.067" (Minor Second — 1.067); "1.125" (Major Second — 1.125); "1.200" (Minor Third — 1.200); "1.250" (Major Third — 1.250); "1.333" (Perfect Fourth — 1.333); "1.414" (Augmented Fourth — 1.414); "1.500" (Perfect Fifth — 1.500); "1.618" (Golden Ratio — 1.618); "custom" (自定义…) |
| `--custom-ratio` | customRatio | number | "1.333" | min=1.01, max=3 |
| `--root-size` | rootSize | number | "16" | min=8, max=24 |
| `--steps-up` | stepsUp | number | "5" | min=1, max=10 |
| `--steps-down` | stepsDown | number | "2" | min=0, max=5 |
| `--preview-font` | previewFont | select-one | "inherit" | "inherit" (系统默认); "Georgia, serif" (Georgia (Serif)); "'Times New Roman', serif" (Times New Roman); "Arial, sans-serif" (Arial (Sans)); "'Helvetica Neue', sans-serif" (Helvetica Neue); "'JetBrains Mono', monospace" (JetBrains Mono) |
| `--preview-text-preset` | previewTextPreset | select-one | "en" | "en" (English Sample); "zh" (中文示例); "mixed" (中英混合) |

已检查示例：

```bash
html-tools dev/type-scale-calculator update --base-size '16' --ratio-preset '1.250' --custom-ratio '1.333' --root-size '16' --steps-up '5' --steps-down '2' --preview-font 'inherit' --preview-text-preset 'en' --json
```

操作限制：部分原页面操作未通过迁移检查: build-scale: 已更新 8 个字级

### dev/css-container-query-builder

CSS 容器查询生成器：可视化构建 CSS @container 查询规则，设置容器名称和尺寸条件，生成即用代码片段。

来源：`html-tools/tools/dev/css-container-query-builder.html`，SHA-256：`3f804cf7d701c5413ca2ec7d0d830698b648ce794538b80d8aba7078c2f0b17e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成代码 | outputCode, previewChild |
| `build-query-condition` | buildQueryCondition | value |
| `update-preview` | updatePreview | previewChild |
| `run` | 按字段输入重新计算 | conditionList, outputCode, previewWidthVal, previewChild |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--container-name` | 容器名称（可选） | text | "" |  |
| `--container-type` | container-type | select-one | "inline-size" | "inline-size" (inline-size（宽度查询，最常用）); "size" (size（宽高均可查询）); "normal" (normal（仅样式查询）) |
| `--container-selector` | 容器选择器 | text | ".card-wrapper" |  |
| `--field-4` | field-4 | select-one | "width" | "width" (width（宽度）); "height" (height（高度）); "inline-size" (inline-size（行内尺寸）); "block-size" (block-size（块尺寸）); "aspect-ratio" (aspect-ratio（宽高比）); "orientation" (orientation（方向）) |
| `--field-5` | field-5 | select-one | "max" | "min" (>=); "max" (<=); "exact" (=) |
| `--field-6` | px | number | "600" | min=0 |
| `--inner-selector` | 目标选择器 | text | ".card" |  |
| `--css-rules` | CSS 声明（每行一条） | textarea | "flex-direction: column;\nfont-size: 0.875rem;\ngap: 8px;" |  |
| `--include-container-decl` / `--no-include-container-decl` | 包含容器声明 | checkbox | true |  |
| `--include-comments` / `--no-include-comments` | 添加注释 | checkbox | true |  |
| `--include-fallback` / `--no-include-fallback` | 包含 @supports 降级 | checkbox | false |  |
| `--preview-width` | 容器宽度 | range | "400" | min=100, max=800 |

已检查示例：

```bash
html-tools dev/css-container-query-builder generate --container-name 'Hello world
Hello world
TypeScript' --container-type 'inline-size' --container-selector '.card-wrapper' --field-4 'width' --field-5 'max' --field-6 '600' --inner-selector '.card' --css-rules 'flex-direction: column;
font-size: 0.875rem;
gap: 8px;' --include-container-decl --include-comments --no-include-fallback --preview-width '400' --json
```

### dev/css-z-index-stacking-visualizer

CSS z-index 层叠上下文可视化：交互式演示 CSS 层叠上下文规则：添加元素、设置 z-index 和触发层叠的属性，实时看到层叠顺序。

来源：`html-tools/tools/dev/css-z-index-stacking-visualizer.html`，SHA-256：`5d25cf405684eca8cfe0b7ac5359ebc1e3102a4e3642749acf6019d032494e46`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | elCount, elementList, stackingCanvas, orderList, editPanelName, editPanelContent, cssOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--new-name` | 名称 | text | "" |  |
| `--new-parent` | 父容器 | select-one | "root" | "root" (根层叠上下文); "el1" (.page (SC)); "el2" (.sidebar (SC)); "el3" (.overlay (SC)); "el4" (.modal (SC)); "el5" (.modal-btn (SC)); "el6" (.tooltip (SC)) |
| `--new-position` | position | select-one | "relative" | "static" (static（默认）); "relative" (relative); "absolute" (absolute); "fixed" (fixed); "sticky" (sticky) |
| `--new-z-index` | z-index | number | "1" | min=-100, max=9999 |
| `--new-opacity` | opacity（<1 触发上下文） | number | "1" | min=0, max=1 |
| `--new-transform` | transform（触发上下文） | select-one | "none" | "none" (none); "translateZ(0)" (translateZ(0)); "scale(1.05)" (scale(1.05)); "rotate(5deg)" (rotate(5deg)) |
| `--new-isolation` | isolation | select-one | "auto" | "auto" (auto); "isolate" (isolate（强制上下文）) |

已检查示例：

```bash
html-tools dev/css-z-index-stacking-visualizer render --new-name 'Hello world
Hello world
TypeScript' --new-parent 'root' --new-position 'relative' --new-z-index '1' --new-opacity '1' --new-transform 'none' --new-isolation 'auto' --json
```

操作限制：部分原页面操作未通过迁移检查: compute-layout: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### dev/svg-sprite-generator

SVG Sprite 生成器：上传多个 SVG 图标，合并生成 <svg> symbol sprite 文件，并输出每个图标的 <use> 引用代码。

来源：`html-tools/tools/dev/svg-sprite-generator.html`，SHA-256：`5af3a370f3f9a41fd29e5254c59ce39aafa2ca16af23096d5d8d02f1e507cd24`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 Sprite | spriteOutput, useOutput, statSize |
| `generate-sprite` | generateSprite | value |
| `generate-use-code` | generateUseCode | value |
| `run` | 按字段输入重新计算 | iconList, statIcons |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--opt-strip-fill` / `--no-opt-strip-fill` | 移除 fill 属性（继承颜色） | checkbox | true |  |
| `--opt-strip-stroke` / `--no-opt-strip-stroke` | 移除 stroke 属性 | checkbox | false |  |
| `--opt-hidden` / `--no-opt-hidden` | sprite 使用 display:none 隐藏 | checkbox | true |  |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools dev/svg-sprite-generator generate --opt-strip-fill --no-opt-strip-stroke --opt-hidden --file-input 'generated/fixtures/sample.svg' --json
```

### dev/svg-to-data-uri

SVG 转 Data URI 编码器：将 SVG 代码转换为适合 CSS background-image 使用的 data URI 格式，支持 URL 编码和 Base64 两种方式。

来源：`html-tools/tools/dev/svg-to-data-uri.html`，SHA-256：`e86d33673fa4247705b087343f8f937be3485336eb305a241345bc5cfd20ce22`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 转换 | uriOutput, previewImg, cssSnippet, statOrigSize, statEncodedSize, statRatio |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--encode-mode` | encodeMode | select-one | "url" | "url" (URL 编码（推荐）); "base64" (Base64) |
| `--optimize-svg` / `--no-optimize-svg` | 移除注释和多余空白 | checkbox | false |  |
| `--add-ns` / `--no-add-ns` | 确保 xmlns 属性 | checkbox | true |  |
| `--svg-input` | 在此粘贴 SVG 代码，例如： <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <circle cx="12" cy="12" r="10" fill="#00f5d4"/> </svg> | textarea | "" |  |

已检查示例：

```bash
html-tools dev/svg-to-data-uri convert --encode-mode 'url' --no-optimize-svg --add-ns --svg-input '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="red"/></svg>' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/regex-find-replace-tester

Regex 查找替换测试器：输入正则表达式和替换模式，实时预览在输入文本上的替换结果，支持捕获组引用（$1, \1）。

来源：`html-tools/tools/dev/regex-find-replace-tester.html`，SHA-256：`a7bc21345db5b787d5246aeaf5a8b99d74a299cd1194d6db3cf9697e3233e186`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `build-result` | buildResult | resultPreview, captureBody, statMatches, statGroups, statReplaced |
| `run` | 按字段输入重新计算 | resultPreview, captureBody, statMatches, statGroups, statReplaced |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--regex-pattern` | pattern | text | "" |  |
| `--regex-flags` | gi | text | "" |  |
| `--replace-pattern` | replacement ($1 引用捕获组) | text | "" |  |
| `--source-text` | 在此输入要处理的文本... | textarea | "" |  |

已检查示例：

```bash
html-tools dev/regex-find-replace-tester build-result --regex-pattern '\w+' --regex-flags '\w+' --replace-pattern '\w+' --source-text 'Hello world
Hello world
TypeScript' --json
```

### dev/har-viewer

HAR 文件查看器：拖入 .har 文件，可视化展示所有 HTTP 请求的时序瀑布图、请求头、响应体和耗时统计。

来源：`html-tools/tools/dev/har-viewer.html`，SHA-256：`38c0964c1e1d80739c289057a87c8f1bd86e883b3b34fe219e4b5c699893f48f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `all` | 全部 | statVisible, statTotal |
| `xhr` | XHR/Fetch | statVisible, statTotal |
| `document` | 文档 | statVisible, statTotal |
| `script` | 脚本 | statVisible, statTotal |
| `stylesheet` | 样式 | statVisible, statTotal |
| `image` | 图片 | statVisible, statTotal |
| `font` | 字体 | statVisible, statTotal |
| `other` | 其他 | statVisible, statTotal |
| `update-summary` | updateSummary | sumRequests, sumDuration, sumTransfer, sumErrors, sumAvgTime, sumSlowReqs |
| `run` | 按字段输入重新计算 | sumRequests, sumDuration, sumTransfer, sumErrors, sumAvgTime, sumSlowReqs, statVisible, statTotal |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--filter-input` | 过滤 URL... | text | "" |  |

已检查示例：

```bash
html-tools dev/har-viewer all --file-input 'generated/fixtures/sample.har' --filter-input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: compute-timeline: 原工具没有产生可输出的结果，请检查参数

### dev/json-merge-patch

JSON Merge Patch 工具：按 RFC 7396 规范对两个 JSON 文档执行 merge patch 操作，实时预览合并结果。

来源：`html-tools/tools/dev/json-merge-patch.html`，SHA-256：`1e64b9d26c9395461b80921abee9058a3f8c3995b2b58776a7a833b46f9cf332`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | diffView, statAdded, statModified, statDeleted, statKeys |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--indent` | indent | select-one | "2" | "2" (2 空格); "4" (4 空格); "tab" (Tab) |
| `--auto-apply` / `--no-auto-apply` | 自动执行 | checkbox | true |  |
| `--show-diff` / `--no-show-diff` | 显示变更 Diff | checkbox | true |  |
| `--input-target` | {"name":"Alice","age":30,"email":"alice@example.com"} | textarea | "" |  |
| `--input-patch` | {"age":31,"email":null,"city":"Shanghai"} | textarea | "" |  |

已检查示例：

```bash
html-tools dev/json-merge-patch run --indent '2' --auto-apply --show-diff --input-target '{"name":"Alice","count":2}' --input-patch '{"name":"Alice","count":2}' --json
```

### dev/ndjson-formatter

NDJSON / JSONL 格式化器：格式化和验证换行分隔 JSON（NDJSON/JSONL）文件，逐行解析并高亮错误行，支持行数统计。

来源：`html-tools/tools/dev/ndjson-formatter.html`，SHA-256：`ae887f0f851ccb144b32e68ec26e28bb513101feee3d77a15675c644828c27e0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse` | 解析 / 校验 | resultArea, statTotal, statValid, statErrors, statSkipped, statSize |
| `format` | 格式化展开 | resultArea, statTotal, statValid, statErrors, statSkipped, statSize |
| `minify` | 压缩 | resultArea, statTotal, statValid, statErrors, statSkipped, statSize |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--indent` | indent | select-one | "2" | "2" (2 空格); "4" (4 空格); "tab" (Tab) |
| `--skip-empty` / `--no-skip-empty` | 跳过空行 | checkbox | true |  |
| `--show-valid` / `--no-show-valid` | 高亮有效行行号 | checkbox | true |  |
| `--input` | 每行一个 JSON 对象，例如： {"id":1,"name":"Alice"} {"id":2,"name":"Bob"} {"id":3,"name":"Charlie"} | textarea | "" |  |

已检查示例：

```bash
html-tools dev/ndjson-formatter parse --indent '2' --skip-empty --show-valid --input '{"name":"Alice","count":2}' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/ini-file-editor

INI / 配置文件编辑器：在线解析和编辑 .ini/.cfg 配置文件，支持分节（section）、键值对增删改，导出格式化后的文件。

来源：`html-tools/tools/dev/ini-file-editor.html`，SHA-256：`98090cb377261f38379b673e7df8ea48839802643e9b835d4553380c497c7c97`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-stats` | updateStats | statSections, statKeys, statComments |
| `parse-and-render` | parseAndRender | sectionList, statSections, statKeys, statComments |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-area` | ; 示例 INI 文件 [database] host = localhost port = 3306 name = mydb [server] host = 0.0.0.0 port = 8080 debug = true | textarea | "" |  |

已检查示例：

```bash
html-tools dev/ini-file-editor update-stats --input-area 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/access-log-analyzer

Nginx / Apache 访问日志分析器：粘贴 Nginx 或 Apache 访问日志，自动解析并统计 Top IP、路径、状态码、带宽，可视化展示流量模式。

来源：`html-tools/tools/dev/access-log-analyzer.html`，SHA-256：`4647274f67e80d338ae475af373549b63b701715fe6d0b56dc60e68bff0486c6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | 分析日志 | sumTotalReqs, sumUniqueIPs, sumBandwidth, sumErrorRate, sumAvgSize, sumParsed, timelineLabels, tableIPs, tablePaths, tableUAs, statReqs, statIPs, statBw |
| `build-text-report` | buildTextReport | value |
| `run` | 按字段输入重新计算 | lineCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--log-format` | logFormat | select-one | "auto" | "auto" (自动识别); "nginx_combined" (Nginx Combined); "apache_combined" (Apache Combined); "nginx_common" (Nginx Common) |
| `--top-n` | topN | select-one | "10" | "10" (10); "20" (20); "50" (50) |
| `--filter-bots` / `--no-filter-bots` | 过滤常见爬虫 | checkbox | false |  |
| `--log-input` | 将 Nginx 或 Apache access.log 内容粘贴到这里... 示例格式 (Nginx combined): 192.168.1.1 - - [10/May/2025:12:00:01 +0800] "GET /index.html HTTP/1.1" 200 1234 "-" "Mozilla/5.0" 示例格式 (Apache combin | textarea | "" |  |

已检查示例：

```bash
html-tools dev/access-log-analyzer analyze --log-format 'auto' --top-n '10' --no-filter-bots --log-input '127.0.0.1 - - [01/Jan/2025:12:00:00 +0000] "GET / HTTP/1.1" 200 123 "-" "curl/8.0"' --json
```

### dev/ssh-keygen-helper

SSH 密钥对生成器：纯浏览器端生成 RSA / Ed25519 SSH 密钥对，无需安装 ssh-keygen，输出公钥、私钥和 authorized_keys 格式。

来源：`html-tools/tools/dev/ssh-keygen-helper.html`，SHA-256：`636a923c2c121fba14a732a4099e083462f715782c0fdf850b9a366f88e8c95e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成密钥对 | pubKeyOut, privKeyOut, fingerprintOut |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--key-type` | 密钥类型: | select-one | "ed25519" | "ed25519" (Ed25519（推荐）); "rsa2048" (RSA-2048); "rsa4096" (RSA-4096) |
| `--key-comment` | 注释 (comment): | text | "" |  |

已检查示例：

```bash
html-tools dev/ssh-keygen-helper generate --key-type 'ed25519' --key-comment 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/po-file-editor

PO / Gettext 翻译文件编辑器：上传 .po 或 .pot 文件，以表格形式编辑 msgid 和 msgstr，支持过滤未翻译条目，下载修改后的文件。

来源：`html-tools/tools/dev/po-file-editor.html`，SHA-256：`f7fe5ab3348dc029ca572059ddb61ca60b3b40262be0fee3002b1c4267da19e4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-stats` | updateStats | statTotal, statDone, statLeft, statPct |
| `run` | 按字段输入重新计算 | statTotal, statDone, statLeft, statPct, poTbody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools dev/po-file-editor update-stats --file-input 'generated/fixtures/sample.po' --json
```

操作限制：部分原页面操作未通过迁移检查: update-filter-buttons: 原工具没有产生可输出的结果，请检查参数

### dev/email-address-validator

邮箱地址格式验证器：验证邮箱地址语法是否符合 RFC 5321/5322 规范，检查域名部分格式，并批量处理多行输入。

来源：`html-tools/tools/dev/email-address-validator.html`，SHA-256：`ae2305546206439fd7f34e14db5ac0556a4d249622e622bf484d55114145d3d2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `validate` | 验证 | resultList, statTotal, statValid, statInvalid, statSkipped |
| `run-validation` | runValidation | resultList, statTotal, statValid, statInvalid, statSkipped |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--opt-skip-empty` / `--no-opt-skip-empty` | 跳过空行 | checkbox | true |  |
| `--opt-trim` / `--no-opt-trim` | 自动去除空格 | checkbox | true |  |
| `--opt-show-parts` / `--no-opt-show-parts` | 显示解析部分（本地/域名） | checkbox | false |  |
| `--input` | 每行粘贴一个邮箱地址，支持批量处理 示例： user@example.com invalid-email test.name+alias@sub.domain.org | textarea | "" |  |

已检查示例：

```bash
html-tools dev/email-address-validator validate --opt-skip-empty --opt-trim --no-opt-show-parts --input 'alice@example.com
bob@example.org' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/isbn-validator

ISBN 验证与解析：验证 ISBN-10 / ISBN-13 校验位，解析出版商和出版社前缀含义，并在 ISBN-10 和 ISBN-13 之间互转。

来源：`html-tools/tools/dev/isbn-validator.html`，SHA-256：`d02800f3f89f9289152cf2b98a497a62ca65be9e22672e618343254c7907255d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `validate` | 验证 | resultBadge, infoGrid, convIsbn10, convIsbn13 |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--isbn-input` | 输入 ISBN-10 或 ISBN-13（可含连字符或空格） | text | "" |  |
| `--batch-input` | 9787302533924 0-306-40615-2 978-3-16-148410-0 0306406152 | textarea | "" |  |

已检查示例：

```bash
html-tools dev/isbn-validator validate --isbn-input '9780131103627' --batch-input '9780131103627' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/crc32-checksum-calculator

CRC32 / Adler-32 校验计算器：计算文本或文件的 CRC-32、Adler-32、FNV-1a 校验值，补充现有 MD5/SHA 系哈希工具未覆盖的非密码学校验。

来源：`html-tools/tools/dev/crc32-checksum-calculator.html`，SHA-256：`99ed56882369fa8ee9487f1956780d3133e53fa094f3e873beb46e652b4bc747`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算校验值 | resultsGrid, statBytes |
| `calculate-from-text` | calculateFromText | resultsGrid, statBytes |
| `run` | 按字段输入重新计算 | resultsGrid, statBytes |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--encoding` | encoding | select-one | "utf8" | "utf8" (UTF-8); "latin1" (Latin-1) |
| `--upper-case` / `--no-upper-case` | 大写十六进制 | checkbox | false |  |
| `--input-text` | 在此输入或粘贴文本，实时计算校验值... | textarea | "" |  |
| `--file-input` | 📂 拖拽文件到此处 ，或点击选择文件 支持任意格式，纯本地计算，不上传服务器 | file | "" |  |

已检查示例：

```bash
html-tools dev/crc32-checksum-calculator calculate --encoding 'utf8' --no-upper-case --input-text 'Hello world
Hello world
TypeScript' --file-input 'generated/fixtures/sample.txt' --json
```

### dev/favicon-ico-generator

Favicon 多尺寸 ICO 生成器：上传 PNG/SVG 图片，一键生成包含 16×16、32×32、48×48 的 .ico 文件，以及 apple-touch-icon 和 PWA manifest 所需的各尺寸 PNG。

来源：`html-tools/tools/dev/favicon-ico-generator.html`，SHA-256：`39a721e623ad906b57bed35e61abe895d9921e45cea02adbd69c89c85c2f3312`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | sourceImg, sourceName, sourceMeta, sizesGrid, htmlSnippet |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools dev/favicon-ico-generator run --file-input 'generated/fixtures/sample.png' --json
```

### dev/markdown-linter

Markdown 语法检查器：检查 Markdown 文档中的常见问题：标题层级跳跃、重复标题、代码块未指定语言、链接格式错误等，输出带行号的报告。

来源：`html-tools/tools/dev/markdown-linter.html`，SHA-256：`abdb8b2798237e81e192c1b48fc03cbc63de4c2c49f1e01eba9ac917f95a121d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run-lint` | runLint | lintResults, statErrors, statWarnings, statInfos, statLines |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--chk-heading-level` / `--no-chk-heading-level` | 标题层级跳跃 | checkbox | true |  |
| `--chk-dup-heading` / `--no-chk-dup-heading` | 重复标题 | checkbox | true |  |
| `--chk-code-lang` / `--no-chk-code-lang` | 代码块缺语言 | checkbox | true |  |
| `--chk-broken-link` / `--no-chk-broken-link` | 链接格式错误 | checkbox | true |  |
| `--chk-trailing-space` / `--no-chk-trailing-space` | 行尾空格 | checkbox | true |  |
| `--chk-empty-section` / `--no-chk-empty-section` | 空节（无内容标题） | checkbox | true |  |
| `--chk-long-line` / `--no-chk-long-line` | 超长行(>120字符) | checkbox | false |  |
| `--md-input` | 在此粘贴 Markdown 文档... | textarea | "" |  |

已检查示例：

```bash
html-tools dev/markdown-linter run-lint --chk-heading-level --chk-dup-heading --chk-code-lang --chk-broken-link --chk-trailing-space --chk-empty-section --no-chk-long-line --md-input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/json-schema-to-form

JSON Schema → HTML 表单生成器：粘贴 JSON Schema，自动生成对应的 HTML 表单（支持字符串、数字、枚举、对象、数组类型），并实时验证输入值。

来源：`html-tools/tools/dev/json-schema-to-form.html`，SHA-256：`2dc6114d3b62b2a1a65f14ea71b021efc3aed8b063abb6fa08814a836ad27333`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成表单 | formPreview, outputJson |
| `generate-form` | generateForm | formPreview, outputJson |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--schema-input` | 粘贴 JSON Schema，例如： { "title": "用户信息", "type": "object", "required": ["name","email"], "properties": { "name": { "type": "string", "title": "姓名" }, "email": { "type": "string", "for | textarea | "" |  |

已检查示例：

```bash
html-tools dev/json-schema-to-form generate --schema-input '{"name":"Alice","count":2}' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### dev/cors-preflight-debugger

CORS 请求调试器：模拟 preflight 请求，解析 CORS 响应头，定位跨域报错根因，显示各字段含义。

来源：`html-tools/tools/dev/cors-preflight-debugger.html`，SHA-256：`546f5d98b13eba5fa52265f13a3499d3ebb18098582a1689e39b01766f3b6757`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `send-preflight` | 发送 OPTIONS Preflight | resultSummary, issuesList, headerRows, rawHeaders |
| `send-actual` | 发送实际请求 | resultSummary, issuesList, headerRows, rawHeaders |
| `analyze` | 分析 CORS 头 | resultSummary, issuesList, headerRows, rawHeaders |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--target-url` | https://api.example.com/endpoint | url | "" |  |
| `--req-method` | reqMethod | select-one | "POST" | "GET" (GET); "POST" (POST); "PUT" (PUT); "PATCH" (PATCH); "DELETE" (DELETE) |
| `--req-origin` | https://yourapp.com（留空则不发送） | text | "" |  |
| `--req-headers` | Content-Type: application/json Authorization: Bearer token | textarea | "" |  |
| `--manual-method` | manualMethod | select-one | "POST" | "GET" (GET); "POST" (POST); "PUT" (PUT); "PATCH" (PATCH); "DELETE" (DELETE) |
| `--manual-req-headers` | 粘贴实际请求头（可选） Content-Type: application/json Authorization: Bearer token | textarea | "" |  |
| `--manual-res-headers` | 粘贴服务端响应头（从 DevTools 复制） Access-Control-Allow-Origin: * Access-Control-Allow-Methods: GET, POST Access-Control-Allow-Headers: Content-Type | textarea | "" |  |

已检查示例：

```bash
html-tools dev/cors-preflight-debugger send-preflight --target-url 'https://example.com/path?a=1' --req-method 'POST' --req-origin 'Hello world
Hello world
TypeScript' --req-headers 'Hello world
Hello world
TypeScript' --manual-method 'POST' --manual-req-headers 'Hello world
Hello world
TypeScript' --manual-res-headers 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

## education

### education/gpa-calculator

GPA计算器：计算GPA绩点（中/美/英制）

来源：`html-tools/tools/education/gpa-calculator.html`，SHA-256：`9f3e41a3751403b5d2548958e21be8dd5ee16574f03cae27568146af8c1a5525`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | gpaResult, totalCredits, totalCourses, gradeLevel |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` | 课程名称 | text | "" |  |
| `--field-2` | 学分 | number | "3" | min=0.5, max=10 |
| `--field-3` | 分数 | number | "85" | min=0, max=100 |

已检查示例：

```bash
html-tools education/gpa-calculator calculate --field-1 'Hello world
Hello world
TypeScript' --field-2 '3' --field-3 '85' --json
```

操作限制：部分原页面操作未通过迁移检查: update-system-tabs: 原工具没有产生可输出的结果，请检查参数

### education/grade-calculator

成绩计算器：加权平均成绩计算

来源：`html-tools/tools/education/grade-calculator.html`，SHA-256：`c000f060abc58834e4c7d235307f542e2144bb8a392a00ae9036769c55f34aab`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | finalGrade, letterGrade, totalWeight, progressText, componentList, remainingWeight, targetResult |
| `calculate-target` | calculateTarget | targetResult |
| `run` | 按字段输入重新计算 | finalGrade, letterGrade, totalWeight, progressText, componentList, remainingWeight, targetResult |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` | 目标分数： | text | "平时成绩" |  |
| `--field-2` | 目标分数： | number | "30" | min=0, max=100 |
| `--field-3` | 目标分数： | number | "85" | min=0, max=100 |
| `--field-4` | 目标分数： | text | "期中考试" |  |
| `--field-5` | 目标分数： | number | "20" | min=0, max=100 |
| `--field-6` | 目标分数： | number | "80" | min=0, max=100 |
| `--field-7` | 目标分数： | text | "期末考试" |  |
| `--field-8` | 目标分数： | number | "50" | min=0, max=100 |
| `--field-9` | 目标分数： | number | "0" | min=0, max=100 |
| `--target-grade` | 目标分数： | number | "90" | min=0, max=100 |

已检查示例：

```bash
html-tools education/grade-calculator calculate --field-1 '平时成绩' --field-2 '30' --field-3 '85' --field-4 '期中考试' --field-5 '20' --field-6 '80' --field-7 '期末考试' --field-8 '50' --field-9 '0' --target-grade '90' --json
```

### education/flashcard

单词卡片工具：单词记忆卡片

来源：`html-tools/tools/education/flashcard.html`，SHA-256：`d6ae4fecaaf8885ac68451088373e1fea097cdc8ebc3353e37a3cbc5ea4a14fb`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `shuffle-cards` | 打乱顺序 | progressCurrent, progressPercent, cardFront, cardBack, cardExample, statEasy, statHard, statForgot, statRemaining |
| `update-study-view` | updateStudyView | progressCurrent, progressPercent, cardFront, cardBack, cardExample, statEasy, statHard, statForgot, statRemaining |
| `update-progress` | updateProgress | progressCurrent, progressPercent |
| `update-stats` | updateStats | statEasy, statHard, statForgot, statRemaining |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--deck-name` | 卡组名称 | text | "" |  |
| `--deck-content` | 卡片内容（每行一个：正面 \| 背面 \| 例句） | textarea | "" |  |
| `--import-deck-name` | 卡组名称 | text | "" |  |
| `--import-data` | 卡片数据 | textarea | "" |  |

已检查示例：

```bash
html-tools education/flashcard shuffle-cards --deck-name 'Hello world
Hello world
TypeScript' --deck-content 'Hello world
Hello world
TypeScript' --import-deck-name 'Hello world
Hello world
TypeScript' --import-data 'Hello world
Hello world
TypeScript' --json
```

### education/citation-generator

论文引用格式生成器：生成APA/MLA/Chicago格式引用

来源：`html-tools/tools/education/citation-generator.html`，SHA-256：`358d74d981d7ea02debed6b2c2ed517b4b3cf02771fdaae96081d2ee46afdbed`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `book` | 书籍 | result |
| `journal` | 期刊文章 | result |
| `website` | 网页 | result |
| `newspaper` | 报纸 | result |
| `thesis` | 学位论文 | result |
| `generate` | generate | result |
| `run` | 按字段输入重新计算 | result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--author` | 作者（姓, 名） | text | "" |  |
| `--year` | 出版年份 | text | "" |  |
| `--title` | 书名 | text | "" |  |
| `--publisher` | 出版社 | text | "" |  |
| `--location` | 出版地（可选） | text | "" |  |
| `--edition` | 版次（可选） | text | "" |  |
| `--isbn` | ISBN（可选） | text | "" |  |
| `--j-author` | 作者（姓, 名） | text | "" |  |
| `--j-year` | 发表年份 | text | "" |  |
| `--j-title` | 文章标题 | text | "" |  |
| `--j-journal` | 期刊名称 | text | "" |  |
| `--j-volume` | 卷号 | text | "" |  |
| `--j-issue` | 期号 | text | "" |  |
| `--j-pages` | 页码 | text | "" |  |
| `--j-doi` | DOI（可选） | text | "" |  |
| `--w-author` | 作者/机构 | text | "" |  |
| `--w-date` | 发布日期 | text | "" |  |
| `--w-title` | 网页标题 | text | "" |  |
| `--w-site` | 网站名称 | text | "" |  |
| `--w-url` | URL | text | "" |  |
| `--w-access` | 访问日期 | text | "" |  |
| `--n-author` | 作者 | text | "" |  |
| `--n-date` | 发表日期 | text | "" |  |
| `--n-title` | 文章标题 | text | "" |  |
| `--n-newspaper` | 报纸名称 | text | "" |  |
| `--n-page` | 版面/页码 | text | "" |  |
| `--t-author` | 作者 | text | "" |  |
| `--t-year` | 年份 | text | "" |  |
| `--t-title` | 论文标题 | text | "" |  |
| `--t-degree` | 学位类型 | select-one | "硕士学位论文" | "硕士学位论文" (硕士); "博士学位论文" (博士) |
| `--t-university` | 学校名称 | text | "" |  |

已检查示例：

```bash
html-tools education/citation-generator book --author 'Hello world
Hello world
TypeScript' --year 'Hello world
Hello world
TypeScript' --title 'Hello world
Hello world
TypeScript' --publisher 'Hello world
Hello world
TypeScript' --location 'Hello world
Hello world
TypeScript' --edition 'Hello world
Hello world
TypeScript' --isbn 'Hello world
Hello world
TypeScript' --j-author 'Hello world
Hello world
TypeScript' --j-year 'Hello world
Hello world
TypeScript' --j-title 'Hello world
Hello world
TypeScript' --j-journal 'Hello world
Hello world
TypeScript' --j-volume 'Hello world
Hello world
TypeScript' --j-issue 'Hello world
Hello world
TypeScript' --j-pages 'Hello world
Hello world
TypeScript' --j-doi 'Hello world
Hello world
TypeScript' --w-author 'Hello world
Hello world
TypeScript' --w-date 'Hello world
Hello world
TypeScript' --w-title 'Hello world
Hello world
TypeScript' --w-site 'Hello world
Hello world
TypeScript' --w-url 'https://example.com/path?a=1' --w-access 'Hello world
Hello world
TypeScript' --n-author 'Hello world
Hello world
TypeScript' --n-date 'Hello world
Hello world
TypeScript' --n-title 'Hello world
Hello world
TypeScript' --n-newspaper 'Hello world
Hello world
TypeScript' --n-page 'Hello world
Hello world
TypeScript' --t-author 'Hello world
Hello world
TypeScript' --t-year 'Hello world
Hello world
TypeScript' --t-title 'Hello world
Hello world
TypeScript' --t-degree '硕士学位论文' --t-university 'Hello world
Hello world
TypeScript' --json
```

### education/reading-speed

阅读速度测试：测试阅读速度和理解能力

来源：`html-tools/tools/education/reading-speed.html`，SHA-256：`00905bcd648e67cb3f2fabe4c95f7d41512c478d30be4e236fc5679f1af5381e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-timer` | updateTimer | timer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--difficulty` | difficulty | select-one | "medium" | "easy" (简单（约300字）); "medium" (中等（约500字）); "hard" (困难（约800字）) |

已检查示例：

```bash
html-tools education/reading-speed update-timer --difficulty 'medium' --json
```

操作限制：部分原页面操作未通过迁移检查: update-progress: Cannot read properties of null (reading 'questions')

### education/math-solver

数学方程求解器：求解各类数学方程

来源：`html-tools/tools/education/math-solver.html`，SHA-256：`5fc3c23d747c01740faf1282b60e0bed2dedc83378fa9c26cb7b469a7e097cf8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `solve-linear` | solveLinear | linearEq, linearResult, linearSteps |
| `solve-quadratic` | solveQuadratic | quadraticEq, discriminant, quadraticResult, quadraticSteps |
| `solve-system` | solveSystem | systemEq, systemResult, systemSteps |
| `run` | 按字段输入重新计算 | linearEq, linearResult, linearSteps, quadraticEq, discriminant, quadraticResult, quadraticSteps, systemEq, systemResult, systemSteps |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--la` | 系数 a | number | "2" |  |
| `--lb` | 常数 b | number | "3" |  |
| `--lc` | 常数 c | number | "7" |  |
| `--qa` | 系数 a（二次项） | number | "1" |  |
| `--qb` | 系数 b（一次项） | number | "-5" |  |
| `--qc` | 常数 c | number | "6" |  |
| `--s1a` | a₁ | number | "2" |  |
| `--s1b` | b₁ | number | "3" |  |
| `--s1c` | c₁ | number | "8" |  |
| `--s2a` | a₂ | number | "4" |  |
| `--s2b` | b₂ | number | "-1" |  |
| `--s2c` | c₂ | number | "5" |  |

已检查示例：

```bash
html-tools education/math-solver solve-linear --la '2' --lb '3' --lc '7' --qa '1' --qb '-5' --qc '6' --s1a '2' --s1b '3' --s1c '8' --s2a '4' --s2b '-1' --s2c '5' --json
```

操作限制：部分原页面操作未通过迁移检查: linear: 原工具没有产生可输出的结果，请检查参数 | quadratic: 原工具没有产生可输出的结果，请检查参数 | system: 原工具没有产生可输出的结果，请检查参数

### education/unit-circle

三角函数单位圆：三角函数单位圆可视化

来源：`html-tools/tools/education/unit-circle.html`，SHA-256：`ad22f9e106c58aac8fbaf7de876afc1f5a3a87787b03e51e7bbb5ab26ddf59e2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | canvas, angleSlider, angleInput, radValue, sinValue, cosValue, tanValue, coordValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--angle-slider` | angleSlider | range | "45" | min=0, max=360 |
| `--angle-input` | 请输入数字输入框 | number | "45" | min=0, max=360 |

已检查示例：

```bash
html-tools education/unit-circle run --angle-slider '45' --angle-input '45' --json
```

### education/periodic-table

元素周期表：交互式元素周期表

来源：`html-tools/tools/education/periodic-table.html`，SHA-256：`b9a99b4a18c78316033494f92df71315dffbafd2e70530f820b32db4703811c1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `build-table` | buildTable | periodicTable, lanthanideRow, actinideRow |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--search` | 搜索元素（符号、名称、原子序数）... | search | "" |  |

已检查示例：

```bash
html-tools education/periodic-table build-table --search 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### education/physics-formulas

物理公式速查：常用物理公式速查

来源：`html-tools/tools/education/physics-formulas.html`，SHA-256：`701149bfdf3b0ce0d765a6c9d1e9dea288e460244e3344323ca9788bbfd3df94`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | formulaList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--search` | 搜索公式（如：牛顿、动能、电场...） | search | "" |  |

已检查示例：

```bash
html-tools education/physics-formulas run --search 'Hello world
Hello world
TypeScript' --json
```

### education/chemical-equation

化学方程式配平：化学方程式配平工具

来源：`html-tools/tools/education/chemical-equation.html`，SHA-256：`1aa15f699f2858e5868ae1aa71bdc6caddd61bf3d5315df333b26edff4a29cb5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `balance` | 配平 | resultEquation |
| `run` | 按字段输入重新计算 | resultEquation |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--equation` | 方程式（使用 = 或 -> 分隔反应物和生成物） | text | "" |  |

已检查示例：

```bash
html-tools education/chemical-equation balance --equation 'Hello world
Hello world
TypeScript' --json
```

### education/statistics

统计学计算器：统计学基础计算

来源：`html-tools/tools/education/statistics.html`，SHA-256：`567d07545730dd7d7fdf8f49e5be4a06c2741bb1e0f4f83009a1ac9c373fb067`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | dataPreview, countValue, meanValue, medianValue, modeValue, rangeValue, varianceValue, stdValue, minValue, maxValue, sumValue, q1Value, q3Value, iqrValue, histChart, freqBody |
| `run` | 按字段输入重新计算 | dataPreview, countValue, meanValue, medianValue, modeValue, rangeValue, varianceValue, stdValue, minValue, maxValue, sumValue, q1Value, q3Value, iqrValue, histChart, freqBody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--data-input` | 数据（用逗号、空格或换行分隔） | textarea | "85, 90, 78, 92, 88, 95, 72, 80, 85, 91" |  |

已检查示例：

```bash
html-tools education/statistics calculate --data-input '85, 90, 78, 92, 88, 95, 72, 80, 85, 91' --json
```

### education/binary-tree

二叉树可视化：二叉树操作可视化

来源：`html-tools/tools/education/binary-tree.html`，SHA-256：`04fb207ac2a84d060fbdef32f092bae1d95e75c4599db265247bdefd3656882e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `build-random` | 随机 | nodeCount, treeHeight, minValue, maxValue, canvas |
| `update-info` | updateInfo | nodeCount, treeHeight, minValue, maxValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--value-input` | 输入数值 | number | "" |  |

已检查示例：

```bash
html-tools education/binary-tree build-random --value-input '10' --json
```

操作限制：部分原页面操作未通过迁移检查: search-node: 原工具没有产生可输出的结果，请检查参数

### language/pinyin-converter

拼音转换：汉字转拼音工具

来源：`html-tools/tools/language/pinyin-converter.html`，SHA-256：`37c2cfb2aa17b74df1e9216e6afcd9a6e7ac743534fcf2c38008b98ea8f028dd`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 转换拼音 | resultText, hanziCount, charCount |
| `run` | 按字段输入重新计算 | resultText, hanziCount, charCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-text` | 请输入要转换的汉字文本... | textarea | "" |  |

已检查示例：

```bash
html-tools language/pinyin-converter convert --input-text 'Hello world
Hello world
TypeScript' --json
```

### education/reading-tracker

阅读进度追踪：管理书单和阅读进度

来源：`html-tools/tools/education/reading-tracker.html`，SHA-256：`f788c0593ca96167ee435fc669f2e0ea46d3656840990acdcb148d6e17e79dab`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | totalBooks, readingBooks, finishedBooks, totalPages, booksList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--book-title` | 书名 | text | "" |  |
| `--book-author` | 作者 | text | "" |  |
| `--book-pages` | 总页数 | number | "" | min=1 |

已检查示例：

```bash
html-tools education/reading-tracker render --book-title 'Hello world
Hello world
TypeScript' --book-author 'Hello world
Hello world
TypeScript' --book-pages '10' --json
```

操作限制：部分原页面操作未通过迁移检查: filter-books-all: Cannot read properties of undefined (reading 'target') | filter-books-reading: Cannot read properties of undefined (reading 'target') | filter-books-finished: Cannot read properties of undefined (reading 'target')

### education/solar-system-explorer

行星 / 太阳系信息查询：交互式浏览太阳系各行星的物理参数（质量、半径、公转周期、卫星数等），支持单位换算和星球对比。

来源：`html-tools/tools/education/solar-system-explorer.html`，SHA-256：`6a25626ba9dd14addbceece7426e5dcdab8454003a8ff2d4673487b7d778b960`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `build-sidebar` | buildSidebar | sidebarList |
| `build-convert-selects` | buildConvertSelects | convResult, convExtra |
| `build-distance-table` | buildDistanceTable | distanceTable |
| `run` | 按字段输入重新计算 | compareGrid, convResult, convExtra |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--compare-sort` | compareSort | select-one | "order" | "order" (轨道顺序); "mass" (质量); "radius" (半径); "period" (公转周期); "moons" (卫星数) |
| `--conv-input` | 输入数值 | number | "1" |  |
| `--conv-from` | convFrom | select-one | "AU" | "km" (千米 (km)); "AU" (天文单位 (AU)); "ly" (光年 (ly)); "pc" (秒差距 (pc)); "Rsun" (太阳半径 (R☉)); "Rearth" (地球半径 (R⊕)); "kg" (千克 (kg)); "Msun" (太阳质量 (M☉)); "Mearth" (地球质量 (M⊕)); "Mjup" (木星质量 (M♃)); "days" (地球日 (d)); "years" (地球年 (yr)); "hours" (小时 (h)); "Myr" (百万年 (Myr)) |
| `--conv-to` | convTo | select-one | "km" | "km" (千米 (km)); "AU" (天文单位 (AU)); "ly" (光年 (ly)); "pc" (秒差距 (pc)); "Rsun" (太阳半径 (R☉)); "Rearth" (地球半径 (R⊕)); "kg" (千克 (kg)); "Msun" (太阳质量 (M☉)); "Mearth" (地球质量 (M⊕)); "Mjup" (木星质量 (M♃)); "days" (地球日 (d)); "years" (地球年 (yr)); "hours" (小时 (h)); "Myr" (百万年 (Myr)) |

已检查示例：

```bash
html-tools education/solar-system-explorer build-sidebar --compare-sort 'order' --conv-input '1' --conv-from 'AU' --conv-to 'km' --json
```

### education/geography-country-quiz

世界国家地理测验：随机显示国旗或地图轮廓，测试国家名称、首都、所在洲的记忆，支持错题重练，内嵌 195 个国家数据。

来源：`html-tools/tools/education/geography-country-quiz.html`，SHA-256：`ab569a0d24e727df6c77e5e41ab64d03e8c4c360e3515e27c6d28016707fa7f6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-score-board` | updateScoreBoard | scoreCorrect, scoreWrong, scoreRate, scoreRemain, progressLabel |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools education/geography-country-quiz update-score-board  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

## extractor

### extractor/link-extractor

链接提取器：从文本提取链接

来源：`html-tools/tools/extractor/link-extractor.html`，SHA-256：`1d0b1a8f9f325f50f6bcb3f359fa8dddcb3d75eeb592c2b662238d627a7db32a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `extract` | 提取链接 | stats, results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 粘贴HTML代码或包含链接的文本... | textarea | "" |  |

已检查示例：

```bash
html-tools extractor/link-extractor extract --input 'Hello world
Hello world
TypeScript' --json
```

### extractor/regex-extractor

正则提取器：使用正则表达式批量提取文本内容，支持导出 CSV

来源：`html-tools/tools/extractor/regex-extractor.html`，SHA-256：`23bbc6c6407284b9390b966c98e939cc23e4d9092b80657a3e5c08e510f72959`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `extract` | 提取 | matchCount, groupCount, uniqueCount, matchList, highlightText |
| `run` | 按字段输入重新计算 | matchCount, groupCount, uniqueCount, matchList, highlightText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--regex-input` | g | text | "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" |  |
| `--flag-g` / `--no-flag-g` | g | checkbox | true |  |
| `--flag-i` / `--no-flag-i` | i | checkbox | false |  |
| `--flag-m` / `--no-flag-m` | m | checkbox | false |  |
| `--flag-s` / `--no-flag-s` | s | checkbox | false |  |
| `--text-input` | g | textarea | "联系我们：\n张三的邮箱是 zhangsan@example.com，电话 13812345678\n李四的邮箱是 lisi@test.org，电话 13987654321\n公司网站：https://www.example.com\nIP地址：192.168.1.1 和 10.0.0.1\n日期：2024-01-15 和 2024/02/20" |  |

已检查示例：

```bash
html-tools extractor/regex-extractor extract --regex-input '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' --flag-g --no-flag-i --no-flag-m --no-flag-s --text-input '联系我们：
张三的邮箱是 zhangsan@example.com，电话 13812345678
李四的邮箱是 lisi@test.org，电话 13987654321
公司网站：https://www.example.com
IP地址：192.168.1.1 和 10.0.0.1
日期：2024-01-15 和 2024/02/20' --json
```

### extractor/text-extractor

文本信息提取器：提取文本中的特定内容

来源：`html-tools/tools/extractor/text-extractor.html`，SHA-256：`3b6178580cf6e26df19207aebc7b467ed1273c20a072628801fbff447484acd6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `extract` | 提取信息 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 粘贴包含各种信息的文本... | textarea | "" |  |

已检查示例：

```bash
html-tools extractor/text-extractor extract --input 'Hello world
Hello world
TypeScript' --json
```

### extractor/json-path-extractor

JSON Path 提取器：使用 JSONPath 表达式从 JSON 数据中提取特定字段

来源：`html-tools/tools/extractor/json-path-extractor.html`，SHA-256：`c7f95ad8b02b66429a0493b7317e35b76f062e039e74272571502ea69cdf545a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format-json` | 格式化 | jsonInput |
| `extract` | 提取 | resultCount, resultOutput |
| `run` | 按字段输入重新计算 | resultCount, resultOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--json-input` | {"users": [{"name": "张三", "age": 25}]} | textarea | "{\n  \"users\": [\n    {\n      \"name\": \"张三\",\n      \"age\": 25,\n      \"city\": \"北京\"\n    },\n    {\n      \"name\": \"李四\",\n      \"age\": 30,\n      \"city\": \"上海\"\n    },\n    {\n      \"name\": \"王五\",\n      \"age\": 18,\n      \"city\": \"广州\"\n    }\n  ],\n  \"total\": 3,\n  \"meta\": {\n    \"version\": \"1.0\"\n  }\n}" |  |
| `--path-input` | $.users[*].name | text | "$.users[*].name" |  |

已检查示例：

```bash
html-tools extractor/json-path-extractor format-json --json-input '{
  "users": [
    {
      "name": "张三",
      "age": 25,
      "city": "北京"
    },
    {
      "name": "李四",
      "age": 30,
      "city": "上海"
    },
    {
      "name": "王五",
      "age": 18,
      "city": "广州"
    }
  ],
  "total": 3,
  "meta": {
    "version": "1.0"
  }
}' --path-input '$.users[*].name' --json
```

## finance

### finance/stock-calculator

股票收益计算器：计算股票投资盈亏、成本均价和收益率

来源：`html-tools/tools/finance/stock-calculator.html`，SHA-256：`7d9ac6552a0f4f161de89c61bd8669d0e09c9ade0b7f985f1bca5d64cf7499b7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | totalCost, totalRevenue, totalFees, netProfit, returnRate, costPrice |
| `run` | 按字段输入重新计算 | totalCost, totalRevenue, totalFees, netProfit, returnRate, costPrice |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--buy-price` | 买入价格 (元/股) | number | "" |  |
| `--buy-qty` | 买入数量 (股) | number | "" |  |
| `--buy-fee-rate` | 买入手续费率 (%) | number | "0.025" |  |
| `--sell-price` | 卖出价格 (元/股) | number | "" |  |
| `--sell-qty` | 卖出数量 (股) | number | "" |  |
| `--sell-fee-rate` | 卖出手续费率 (%) | number | "0.025" |  |
| `--stamp-tax` | 印花税率 (%) | number | "0.05" |  |
| `--transfer-fee` | 过户费率 (%) | number | "0.001" |  |

已检查示例：

```bash
html-tools finance/stock-calculator calculate --buy-price '10' --buy-qty '10' --buy-fee-rate '0.025' --sell-price '10' --sell-qty '10' --sell-fee-rate '0.025' --stamp-tax '0.05' --transfer-fee '0.001' --json
```

### finance/currency-converter

汇率换算器：多种货币实时汇率换算

来源：`html-tools/tools/finance/currency-converter.html`，SHA-256：`78cc434658ff5c87d2a36c82ec663e5027101806042886a9c7d89c9466bc5e48`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | toAmount, rateDisplay |
| `run` | 按字段输入重新计算 | toAmount, rateDisplay |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--from-currency` | fromCurrency | select-one | "CNY" | "CNY" (🇨🇳 CNY); "USD" (🇺🇸 USD); "EUR" (🇪🇺 EUR); "GBP" (🇬🇧 GBP); "JPY" (🇯🇵 JPY); "HKD" (🇭🇰 HKD); "KRW" (🇰🇷 KRW); "SGD" (🇸🇬 SGD); "AUD" (🇦🇺 AUD); "CAD" (🇨🇦 CAD) |
| `--from-amount` | 请输入数字输入框 | number | "1000" |  |
| `--to-currency` | toCurrency | select-one | "USD" | "CNY" (🇨🇳 CNY); "USD" (🇺🇸 USD); "EUR" (🇪🇺 EUR); "GBP" (🇬🇧 GBP); "JPY" (🇯🇵 JPY); "HKD" (🇭🇰 HKD); "KRW" (🇰🇷 KRW); "SGD" (🇸🇬 SGD); "AUD" (🇦🇺 AUD); "CAD" (🇨🇦 CAD) |

已检查示例：

```bash
html-tools finance/currency-converter convert --from-currency 'CNY' --from-amount '1000' --to-currency 'USD' --json
```

### finance/tax-calculator

个人所得税计算器：计算中国个人所得税

来源：`html-tools/tools/finance/tax-calculator.html`，SHA-256：`b262ebb45d09766e67d9569b3d4499ce5dea98a08c00ed60a959704c5b8fc958`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | taxAmount, grossSalary, insuranceDisplay, deductionsDisplay, taxableIncome, taxRate, netSalary, taxBrackets |
| `run` | 按字段输入重新计算 | taxAmount, grossSalary, insuranceDisplay, deductionsDisplay, taxableIncome, taxRate, netSalary, taxBrackets |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--salary` | 税前月薪 (元) | number | "20000" |  |
| `--insurance` | 五险一金 (元/月) | number | "4000" |  |
| `--deductions` | 专项附加扣除 (元/月) | number | "2000" |  |

已检查示例：

```bash
html-tools finance/tax-calculator calculate --salary '20000' --insurance '4000' --deductions '2000' --json
```

### finance/budget-planner

家庭预算规划器：合理规划收支，实现财务自由

来源：`html-tools/tools/finance/budget-planner.html`，SHA-256：`427479c94c3457fff246162e77f10cc4606065ecbe3af031f784ebe08dce75ef`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | totalIncome, totalExpense, balance, expenseBar, legend, advice |
| `run` | 按字段输入重新计算 | totalIncome, totalExpense, balance, expenseBar, legend, advice |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--income-salary` | 工资收入 | number | "15000" |  |
| `--income-side` | 副业收入 | number | "0" |  |
| `--income-invest` | 投资收益 | number | "0" |  |
| `--income-other` | 其他收入 | number | "0" |  |
| `--expense-housing` | 房租/房贷 | number | "4000" |  |
| `--expense-utilities` | 水电燃气 | number | "300" |  |
| `--expense-phone` | 通讯费用 | number | "200" |  |
| `--expense-transport` | 交通出行 | number | "500" |  |
| `--expense-insurance` | 保险费用 | number | "500" |  |
| `--expense-food` | 餐饮食品 | number | "2000" |  |
| `--expense-daily` | 日常用品 | number | "500" |  |
| `--expense-shopping` | 服装购物 | number | "500" |  |
| `--expense-entertainment` | 娱乐休闲 | number | "500" |  |
| `--expense-health` | 医疗健康 | number | "200" |  |
| `--saving-regular` | 定期储蓄 | number | "2000" |  |
| `--saving-fund` | 基金定投 | number | "1000" |  |
| `--saving-education` | 教育投资 | number | "500" |  |
| `--saving-emergency` | 应急储备 | number | "500" |  |

已检查示例：

```bash
html-tools finance/budget-planner calculate --income-salary '15000' --income-side '0' --income-invest '0' --income-other '0' --expense-housing '4000' --expense-utilities '300' --expense-phone '200' --expense-transport '500' --expense-insurance '500' --expense-food '2000' --expense-daily '500' --expense-shopping '500' --expense-entertainment '500' --expense-health '200' --saving-regular '2000' --saving-fund '1000' --saving-education '500' --saving-emergency '500' --json
```

### finance/investment-return

投资回报率计算器：计算ROI、年化收益率等投资指标

来源：`html-tools/tools/finance/investment-return.html`，SHA-256：`d1cb829e0252f837d1f050a11f7e79fea3f66687ec3716deb843961992ea434f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | roi, annualizedReturn, totalProfit, multiplier, displayInitial, displayFinal, displayDividends, capitalGain, displayTotalProfit, avgYearlyProfit, doubleYears |
| `run` | 按字段输入重新计算 | roi, annualizedReturn, totalProfit, multiplier, displayInitial, displayFinal, displayDividends, capitalGain, displayTotalProfit, avgYearlyProfit, doubleYears |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--initial-investment` | 初始投资金额 (元) | number | "100000" |  |
| `--final-value` | 最终价值 (元) | number | "150000" |  |
| `--years` | 投资期限 (年) | number | "3" |  |
| `--dividends` | 期间收到的分红/利息 (元，可选) | number | "0" |  |

已检查示例：

```bash
html-tools finance/investment-return calculate --initial-investment '100000' --final-value '150000' --years '3' --dividends '0' --json
```

### finance/debt-payoff

债务还款计算器：制定债务还款计划，比较还款策略

来源：`html-tools/tools/finance/debt-payoff.html`，SHA-256：`d365ba6948acb0f4bf41c7511f5ce72f989539ea7a72880729ce14cf196ab4a1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | totalDebt, totalInterest, monthsToPayoff, payoffDate, timeline |
| `run` | 按字段输入重新计算 | totalDebt, totalInterest, monthsToPayoff, payoffDate, timeline |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` | 余额 (元) | text | "信用卡A" |  |
| `--field-2` | 余额 (元) | number | "15000" |  |
| `--field-3` | 余额 (元) | number | "18.25" |  |
| `--field-4` | 余额 (元) | number | "500" |  |
| `--field-5` | 余额 (元) | text | "信用卡B" |  |
| `--field-6` | 余额 (元) | number | "8000" |  |
| `--field-7` | 余额 (元) | number | "15.6" |  |
| `--field-8` | 余额 (元) | number | "300" |  |
| `--field-9` | 余额 (元) | text | "消费贷" |  |
| `--field-10` | 余额 (元) | number | "30000" |  |
| `--field-11` | 余额 (元) | number | "9" |  |
| `--field-12` | 余额 (元) | number | "1000" |  |
| `--monthly-budget` | 每月还款预算 (元) | number | "5000" |  |

已检查示例：

```bash
html-tools finance/debt-payoff calculate --field-1 '信用卡A' --field-2 '15000' --field-3 '18.25' --field-4 '500' --field-5 '信用卡B' --field-6 '8000' --field-7 '15.6' --field-8 '300' --field-9 '消费贷' --field-10 '30000' --field-11 '9' --field-12 '1000' --monthly-budget '5000' --json
```

### finance/retirement-calculator

退休计算器：计算退休所需资金和储蓄计划

来源：`html-tools/tools/finance/retirement-calculator.html`，SHA-256：`4ffe3afde733d4a7985689f9f6446de7df7ada5ad0ccb884a31cae939e889b7f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | targetAmount, yearsToRetire, projectedSavings, gap, progressPercent, futureExpense, netExpense, retirementYears, suggestedSavings |
| `run` | 按字段输入重新计算 | targetAmount, yearsToRetire, projectedSavings, gap, progressPercent, futureExpense, netExpense, retirementYears, suggestedSavings |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--current-age` | 当前年龄 | number | "30" |  |
| `--retire-age` | 计划退休年龄 | number | "60" |  |
| `--life-expectancy` | 预期寿命 | number | "85" |  |
| `--current-savings` | 当前退休储蓄 (元) | number | "100000" |  |
| `--monthly-savings` | 每月储蓄金额 (元) | number | "5000" |  |
| `--return-rate` | 预期年化收益率 (%) | number | "6" |  |
| `--monthly-expense` | 退休后每月支出 (元) | number | "8000" |  |
| `--inflation-rate` | 通胀率 (%) | number | "3" |  |
| `--pension` | 预计社保养老金 (元/月) | number | "3000" |  |

已检查示例：

```bash
html-tools finance/retirement-calculator calculate --current-age '30' --retire-age '60' --life-expectancy '85' --current-savings '100000' --monthly-savings '5000' --return-rate '6' --monthly-expense '8000' --inflation-rate '3' --pension '3000' --json
```

### finance/profit-margin

利润率计算器：计算毛利率、净利率、盈亏平衡点

来源：`html-tools/tools/finance/profit-margin.html`，SHA-256：`5e3cc4c95da1f7c9d63f17394e80b820bde1785305d37114f4f3c93335fc06fc`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate-margin` | calculateMargin | grossMargin, netMargin, markup, grossProfit, netProfit |
| `calculate-pricing` | calculatePricing | suggestedPrice, unitProfit, actualMarkup |
| `calculate-breakeven` | calculateBreakeven | breakevenUnits, breakevenRevenue, contributionMargin, contributionRatio |
| `run` | 按字段输入重新计算 | grossMargin, netMargin, markup, grossProfit, netProfit, suggestedPrice, unitProfit, actualMarkup, breakevenUnits, breakevenRevenue, contributionMargin, contributionRatio |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--revenue` | 销售收入 (元) | number | "100000" |  |
| `--cost` | 成本 (元) | number | "60000" |  |
| `--expenses` | 运营费用 (元，可选) | number | "20000" |  |
| `--unit-cost` | 成本价 (元) | number | "100" |  |
| `--target-margin` | 目标利润率 (%) | number | "30" |  |
| `--fixed-cost` | 固定成本 (元/月) | number | "50000" |  |
| `--variable-cost` | 单位可变成本 (元) | number | "60" |  |
| `--selling-price` | 单位售价 (元) | number | "100" |  |

已检查示例：

```bash
html-tools finance/profit-margin calculate-margin --revenue '100000' --cost '60000' --expenses '20000' --unit-cost '100' --target-margin '30' --fixed-cost '50000' --variable-cost '60' --selling-price '100' --json
```

### finance/tip-calculator

小费计算器：快速计算餐厅小费和AA账单

来源：`html-tools/tools/finance/tip-calculator.html`，SHA-256：`82e7cd8d3d7b3f8996a0fde88fb6e78e377f18437feea71ad8281d92e3560090`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | perPerson, displayBill, tipAmount, total |
| `run` | 按字段输入重新计算 | perPerson, displayBill, tipAmount, total |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--bill` | 账单金额 | number | "100" |  |
| `--custom-tip` | 小费比例 | number | "" |  |

已检查示例：

```bash
html-tools finance/tip-calculator calculate --bill '100' --custom-tip '10' --json
```

### finance/exchange-split

AA记账分摊器：聚餐、旅行费用分摊计算

来源：`html-tools/tools/finance/exchange-split.html`，SHA-256：`2101c68c922d40e797a9567b80407016a2e6a4e3eeff679cda76c9284dd9f721`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | totalExpense, perPerson, balanceList, settlementList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` | field-1 | text | "小明" |  |
| `--field-2` | field-2 | text | "小红" |  |
| `--field-3` | field-3 | text | "小刚" |  |
| `--field-4` | 支出说明 | text | "午餐" |  |
| `--field-5` | 金额 | number | "300" |  |
| `--field-6` | field-6 | select-one | "1" | "1" (小明 支付); "2" (小红 支付); "3" (小刚 支付) |
| `--field-7` | 支出说明 | text | "打车" |  |
| `--field-8` | 金额 | number | "50" |  |
| `--field-9` | field-9 | select-one | "2" | "1" (小明 支付); "2" (小红 支付); "3" (小刚 支付) |

已检查示例：

```bash
html-tools finance/exchange-split calculate --field-1 '小明' --field-2 '小红' --field-3 '小刚' --field-4 '午餐' --field-5 '300' --field-6 '1' --field-7 '打车' --field-8 '50' --field-9 '2' --json
```

### finance/savings-goal

储蓄目标计算器：设定目标，计算每月储蓄金额

来源：`html-tools/tools/finance/savings-goal.html`，SHA-256：`ec48838c785a52ec177d8cb83c0cd257ba6cd9e150ab29f3c6b6ab9259951e8e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | monthlyRequired, targetDate, currentAmount, goalAmountDisplay, progressFill, remaining, interestEarned, weeklyRequired, dailyRequired, milestones |
| `run` | 按字段输入重新计算 | monthlyRequired, targetDate, currentAmount, goalAmountDisplay, progressFill, remaining, interestEarned, weeklyRequired, dailyRequired, milestones |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--goal-amount` | 目标金额 (元) | number | "100000" |  |
| `--months` | 目标月数 | number | "24" |  |
| `--current-savings` | 已储蓄金额 (元) | number | "10000" |  |
| `--return-rate` | 年化收益率 (%, 可选) | number | "3" |  |

已检查示例：

```bash
html-tools finance/savings-goal calculate --goal-amount '100000' --months '24' --current-savings '10000' --return-rate '3' --json
```

### finance/depreciation

资产折旧计算器：计算固定资产折旧

来源：`html-tools/tools/finance/depreciation.html`，SHA-256：`565dd08d5dc0521eff7638d6a338ef694427673d700190b33692f35ec59ee647`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | annualDepreciation, monthlyDepreciation, depreciationRate, totalDepreciation, methodInfo, depreciationTable |
| `run` | 按字段输入重新计算 | annualDepreciation, monthlyDepreciation, depreciationRate, totalDepreciation, methodInfo, depreciationTable |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--asset-cost` | 资产原值 (元) | number | "100000" |  |
| `--salvage-value` | 残值 (元) | number | "5000" |  |
| `--useful-life` | 使用年限 (年) | number | "5" |  |
| `--method` | 折旧方法 | select-one | "straight" | "straight" (直线法 (平均年限法)); "double" (双倍余额递减法); "sum" (年数总和法) |

已检查示例：

```bash
html-tools finance/depreciation calculate --asset-cost '100000' --salvage-value '5000' --useful-life '5' --method 'straight' --json
```

### finance/loan-early-repay

提前还贷计算器：计算提前还贷节省的利息

来源：`html-tools/tools/finance/loan-early-repay.html`，SHA-256：`9a12a4a3e3e7dede15d53bfd1599cb148b2a27b38cab14c733e609a842bce476`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | totalSavings, oldPayment, oldMonths, oldPrincipal, oldInterest, newPayment, newMonths, newPrincipal, newInterest, tips |
| `run` | 按字段输入重新计算 | totalSavings, oldPayment, oldMonths, oldPrincipal, oldInterest, newPayment, newMonths, newPrincipal, newInterest, tips |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--loan-amount` | 贷款总额 (万元) | number | "100" | min=1 |
| `--loan-years` | 贷款期限 (年) | number | "30" | min=1, max=30 |
| `--rate` | 年利率 (%) | number | "4.9" | min=0, max=20 |
| `--paid-months` | 已还期数 (月) | number | "12" | min=0 |
| `--early-amount` | 提前还款金额 (万元) | number | "20" | min=0 |

已检查示例：

```bash
html-tools finance/loan-early-repay calculate --loan-amount '100' --loan-years '30' --rate '4.9' --paid-months '12' --early-amount '20' --json
```

### finance/compound-interest

复利投资计算器：计算复利投资收益，模拟长期理财规划

来源：`html-tools/tools/finance/compound-interest.html`，SHA-256：`f9405b319b07c3ca1149185d5d8fc4d6ab49ab97bf1c53a6d700caccff8067bf`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | finalAmount, totalPrincipal, totalInterest, chartBars |
| `run` | 按字段输入重新计算 | finalAmount, totalPrincipal, totalInterest, chartBars |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--principal` | 初始本金 (元) | number | "100000" | min=0 |
| `--rate` | 年利率 (%) | number | "8" | min=0, max=100 |
| `--years` | 投资年限 | number | "10" | min=1, max=50 |
| `--frequency` | 复利频率 | select-one | "12" | "1" (年度复利); "4" (季度复利); "12" (月度复利); "365" (每日复利) |
| `--monthly` | 定期追加 (元/月) | number | "2000" | min=0 |

已检查示例：

```bash
html-tools finance/compound-interest calculate --principal '100000' --rate '8' --years '10' --frequency '12' --monthly '2000' --json
```

### finance/budget-tracker

预算追踪器：记录收支，管理预算，可视化财务状况

来源：`html-tools/tools/finance/budget-tracker.html`，SHA-256：`fd4fcb5951ab9e03550f10bbd4ac3f08003f888457555b479b153df65e8d3c2f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | totalIncome, totalExpense, balance, transactionsList |
| `update-summary` | updateSummary | totalIncome, totalExpense, balance |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--description` | 描述 | text | "" |  |
| `--amount` | 金额 | number | "" | min=0 |
| `--type` | type | select-one | "income" | "income" (收入); "expense" (支出) |
| `--category` | category | select-one | "工资" | "工资" (工资); "餐饮" (餐饮); "交通" (交通); "购物" (购物); "娱乐" (娱乐); "医疗" (医疗); "其他" (其他) |

已检查示例：

```bash
html-tools finance/budget-tracker render --description '192.168.1.1' --amount '10' --type 'income' --category '工资' --json
```

### finance/swift-bic-lookup

SWIFT / BIC 银行代码查询：查询 SWIFT/BIC 银行识别代码的结构（8位或11位）含义，解析银行名称、国家、城市和分行代码。

来源：`html-tools/tools/finance/swift-bic-lookup.html`，SHA-256：`a838eb8e46b1461df715f02e7a30df69c1e7e0868965fefccf11eabe1f843a62`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | swiftInput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--swift-input` | 输入 SWIFT/BIC 代码，如 BOFAUS3N | text | "" |  |

已检查示例：

```bash
html-tools finance/swift-bic-lookup run --swift-input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: lookup: BIC 必须为 8 位或 11 位，当前 30 位

### finance/dividend-pe-calculator

股息率 / 市盈率计算器：根据股价、每股收益、每股股息，计算市盈率（P/E）、股息率（Dividend Yield）、股息支付率等核心估值指标。

来源：`html-tools/tools/finance/dividend-pe-calculator.html`，SHA-256：`e2da9b9d5f77a7858de71af354bf56c801e0cea4972dbaa29d2260736f733ffa`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | 计算 | peValue, peBadge, dyValue, dyBadge, payoutValue, payoutBadge, pbValue, pbBadge, psValue, mcapValue, interpretList |
| `calculate` | calculate | peValue, peBadge, dyValue, dyBadge, payoutValue, payoutBadge, pbValue, pbBadge, psValue, mcapValue, interpretList |
| `build-result-text` | buildResultText | value |
| `run` | 按字段输入重新计算 | peValue, peBadge, dyValue, dyBadge, payoutValue, payoutBadge, pbValue, pbBadge, psValue, mcapValue, interpretList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--stock-price` | 股价 （元 / 股） | number | "" | min=0 |
| `--eps` | 每股收益 EPS （元 / 股） | number | "" |  |
| `--dps` | 每股股息 DPS （元 / 股） | number | "" | min=0 |
| `--book-value` | 每股净资产 （元 / 股，可选） | number | "" | min=0 |
| `--revenue` | 每股营收 （元 / 股，可选） | number | "" | min=0 |
| `--shares` | 总股本 （亿股，可选） | number | "" | min=0 |

已检查示例：

```bash
html-tools finance/dividend-pe-calculator calc --stock-price '10' --eps '10' --dps '10' --book-value '10' --revenue '10' --shares '10' --json
```

### finance/amortization-table

贷款摊销明细表：输入贷款金额、年利率、期数，生成完整的逐期还款明细（本金/利息/余额），支持导出 CSV 和额外还款模拟。

来源：`html-tools/tools/finance/amortization-table.html`，SHA-256：`235398b4a945eb4e351e8ed486c1af53651bffc813552a5065ad9c51173fda7c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | 计算 | summaryCards, tableHead, tableBody, tableFoot, statMonthly, statTotalInterest, statActualTerm |
| `calculate` | calculate | summaryCards, tableHead, tableBody, tableFoot, statMonthly, statTotalInterest, statActualTerm |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--loan-amount` | 贷款金额（元） | number | "1000000" | min=1 |
| `--annual-rate` | 年利率（%） | number | "4.5" | min=0.01, max=100 |
| `--term-months` | 还款期数（月） | number | "360" | min=1, max=600 |
| `--start-date` | 起始日期（可选） | month | "" |  |
| `--extra-payment` | 每月额外还本金（元） | number | "0" | min=0 |
| `--extra-start` | 从第几期开始 | number | "1" | min=1 |

已检查示例：

```bash
html-tools finance/amortization-table calc --loan-amount '1000000' --annual-rate '4.5' --term-months '360' --start-date 'Hello world
Hello world
TypeScript' --extra-payment '0' --extra-start '1' --json
```

操作限制：部分原页面操作未通过迁移检查: build-csv-lines: Cannot read properties of undefined (reading 'date') | run: 原工具没有产生可输出的结果，请检查参数

### finance/cagr-calculator

CAGR 复合年增长率计算器：输入初始值、终值和年数，计算 CAGR；或由目标增长率反推所需终值，广泛用于投资和业务分析。

来源：`html-tools/tools/finance/cagr-calculator.html`，SHA-256：`d7ad141fa7f605f4b0711e5c352a089a3129376e6613d5308b4ad25a1d50a93d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | mainResultLabel, mainResultValue, mainResultSub, totalGrowthValue, absGrowthLabel, absGrowthValue, growthTableBody |
| `calc-cagr` | calcCagr | mainResultLabel, mainResultValue, mainResultSub, totalGrowthValue, absGrowthLabel, absGrowthValue, growthTableBody |
| `calc-end-value` | calcEndValue | mainResultLabel, mainResultValue, mainResultSub, totalGrowthValue, absGrowthLabel, absGrowthValue, growthTableBody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--start-value-cagr` | 初始值（Beginning Value） | number | "" | min=0.01 |
| `--end-value-cagr` | 终值（Ending Value） | number | "" | min=0.01 |
| `--years-cagr` | 年数（Years） | number | "" | min=0.01 |
| `--start-value-end` | 初始值（Beginning Value） | number | "" | min=0.01 |
| `--cagr-rate` | 目标 CAGR | number | "" | min=-99, max=10000 |
| `--years-end` | 年数（Years） | number | "" | min=0.01 |
| `--start-value-years` | 初始值（Beginning Value） | number | "" | min=0.01 |
| `--end-value-years` | 终值（Ending Value） | number | "" | min=0.01 |
| `--cagr-rate-years` | 目标 CAGR | number | "" | min=-99, max=10000 |

已检查示例：

```bash
html-tools finance/cagr-calculator calculate --start-value-cagr '10' --end-value-cagr '10' --years-cagr '10' --start-value-end '10' --cagr-rate '10' --years-end '10' --start-value-years '10' --end-value-years '10' --cagr-rate-years '10' --json
```

操作限制：部分原页面操作未通过迁移检查: calc-years: 初始值、终值与增长率方向不匹配 | run: 原工具没有产生可输出的结果，请检查参数

### finance/budget-50-30-20-planner

50/30/20 预算规划器：按 50% 必要支出、30% 想要支出、20% 储蓄/还债的经典法则，输入税后收入即可自动分配并可视化。

来源：`html-tools/tools/finance/budget-50-30-20-planner.html`，SHA-256：`da393d2c45e81454ecf2335f7677d31020b5bdca79cb9987ead8183282b87649`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | currencyPrefix, donutLabel, donutValue, badgeNeeds, amtNeeds, subNeeds, badgeWants, amtWants, subWants, badgeSavings, amtSavings, subSavings, statMonthly, statAnnual, statDaily |
| `run` | 按字段输入重新计算 | currencyPrefix, donutLabel, donutValue, badgeNeeds, amtNeeds, subNeeds, badgeWants, amtWants, subWants, badgeSavings, amtSavings, subSavings, statMonthly, statAnnual, statDaily |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--income-input` | 税后收入 | number | "10000" | min=0 |
| `--currency-select` | currencySelect | select-one | "CNY" | "CNY" (¥ 人民币); "USD" ($ 美元); "EUR" (€ 欧元); "GBP" (£ 英镑); "JPY" (¥ 日元); "HKD" (HK$ 港币) |
| `--ratio-needs` | ratioNeeds | number | "50" | min=0, max=100 |
| `--ratio-wants` | ratioWants | number | "30" | min=0, max=100 |
| `--ratio-savings` | ratioSavings | number | "20" | min=0, max=100 |

已检查示例：

```bash
html-tools finance/budget-50-30-20-planner calculate --income-input '10000' --currency-select 'CNY' --ratio-needs '50' --ratio-wants '30' --ratio-savings '20' --json
```

### finance/payback-period-calculator

投资回收期计算器：输入初始投资和年度净现金流（可逐年不同），计算静态和动态回收期，含图表展示累计现金流。

来源：`html-tools/tools/finance/payback-period-calculator.html`，SHA-256：`90cdbecc25ac55639b056d7dfb140106be0ddb9b846ab8c01cf831024d068474`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `fill-equal` | 等额填入 | cashflowRows |
| `calculate` | 计算 | staticPayback, staticSub, dynamicPayback, dynamicSub, cfTableBody, statYears, statTotalCF, statNPV |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--initial-investment` | 初始投资额（元） | number | "" | min=0 |
| `--discount-rate` | 折现率 / 年（%，用于动态回收期） | number | "10" | min=0, max=100 |
| `--field-3` | 净现金流 | number | "150000" |  |
| `--field-4` | 净现金流 | number | "200000" |  |
| `--field-5` | 净现金流 | number | "250000" |  |
| `--field-6` | 净现金流 | number | "300000" |  |
| `--field-7` | 净现金流 | number | "350000" |  |
| `--field-8` | 净现金流 | number | "400000" |  |

已检查示例：

```bash
html-tools finance/payback-period-calculator fill-equal --initial-investment '10' --discount-rate '10' --field-3 '150000' --field-4 '200000' --field-5 '250000' --field-6 '300000' --field-7 '350000' --field-8 '400000' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

## food

### food/calorie-counter

食物卡路里查询：查询常见食物热量和营养成分

来源：`html-tools/tools/food/calorie-counter.html`，SHA-256：`9a50f0e3ca9fc70656133a19abc9bd5efd4d35bf8cf535f8c4b8407a3a2c838c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `search-food` | searchFood | foodList |
| `update-summary` | updateSummary | totalCalories, totalProtein, totalCarbs, totalFat |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools food/calorie-counter search-food  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### food/cooking-converter

烹饪单位转换器：烹饪单位互转

来源：`html-tools/tools/food/cooking-converter.html`，SHA-256：`d89c83fb35619bf9ec0748d830099f1cc435e6ebf4ba0917a1ebcd68cb20c2ec`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | outputValue, resultDisplay |
| `run` | 按字段输入重新计算 | outputValue, resultDisplay |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-value` | 数值 | number | "1" |  |
| `--from-unit` | 从 | select-one | "tsp" | "tsp" (茶匙 (tsp)); "tbsp" (汤匙 (tbsp)); "cup_us" (杯 (美式)); "cup_metric" (杯 (公制)); "ml" (毫升 (ml)); "l" (升 (L)); "fl_oz" (液体盎司) |
| `--to-unit` | 到 | select-one | "tbsp" | "tsp" (茶匙 (tsp)); "tbsp" (汤匙 (tbsp)); "cup_us" (杯 (美式)); "cup_metric" (杯 (公制)); "ml" (毫升 (ml)); "l" (升 (L)); "fl_oz" (液体盎司) |

已检查示例：

```bash
html-tools food/cooking-converter convert --input-value '1' --from-unit 'tsp' --to-unit 'tbsp' --json
```

### food/recipe-scaler

配方缩放工具：按份量调整食材用量

来源：`html-tools/tools/food/recipe-scaler.html`，SHA-256：`2cfe9a11ccd18386b2d8d49f453589980e60d312f0cd449cd54526580b9fef1b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-scale` | updateScale | targetServings, scaleFactor, scaledList |
| `update-from-target` | updateFromTarget | scaleFactor, scaledList |
| `update-scaled-list` | updateScaledList | scaleFactor, scaledList |
| `run` | 按字段输入重新计算 | targetServings, scaleFactor, scaledList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--original-servings` | originalServings | number | "4" | min=1 |
| `--target-servings` | targetServings | number | "4" | min=1 |
| `--amount` | 原始份量 | text | "200" |  |
| `--unit` | 原始份量 | text | "克" |  |
| `--name` | 原始份量 | text | "面粉" |  |
| `--amount-2` | 原始份量 | text | "2" |  |
| `--unit-2` | 原始份量 | text | "个" |  |
| `--name-2` | 原始份量 | text | "鸡蛋" |  |
| `--amount-3` | 原始份量 | text | "50" |  |
| `--unit-3` | 原始份量 | text | "毫升" |  |
| `--name-3` | 原始份量 | text | "牛奶" |  |

已检查示例：

```bash
html-tools food/recipe-scaler update-scale --original-servings '4' --target-servings '4' --amount '200' --unit '克' --name '面粉' --amount-2 '2' --unit-2 '个' --name-2 '鸡蛋' --amount-3 '50' --unit-3 '毫升' --name-3 '牛奶' --json
```

### food/nutrition-calculator

营养成分计算器：计算食谱营养成分

来源：`html-tools/tools/food/nutrition-calculator.html`，SHA-256：`2e51f6daab4ea35b3666611304b1657289a25e39a30cea31db9e7dbc3d9a62b8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | totalCal, totalCarb, totalProtein, totalFat |
| `run` | 按字段输入重新计算 | totalCal, totalCarb, totalProtein, totalFat |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--food-name` | 食物名称 | text | "" |  |
| `--food-weight` | 食物名称 | number | "100" |  |
| `--food-cal` | 食物名称 | number | "" |  |

已检查示例：

```bash
html-tools food/nutrition-calculator calculate --food-name 'Hello world
Hello world
TypeScript' --food-weight '100' --food-cal '10' --json
```

### food/baking-calculator

烘焙比例计算器：烘焙配方比例计算

来源：`html-tools/tools/food/baking-calculator.html`，SHA-256：`4bead9fcb89d66d5e1a3e056dadd466944554becb27b8f66dba7a60c99f6ab4d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | ratioDisplay, totalWeight, ingredientList, tips |
| `run` | 按字段输入重新计算 | ratioDisplay, totalWeight, ingredientList, tips |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--flour-amount` | 面粉用量 (克) - 作为100%基准 | number | "500" |  |

已检查示例：

```bash
html-tools food/baking-calculator calculate --flour-amount '500' --json
```

### food/coffee-ratio

咖啡冲泡比例：咖啡冲泡比例计算

来源：`html-tools/tools/food/coffee-ratio.html`，SHA-256：`8dd538ff5927903a403c415514f2dc4be7833e8266613035ef04d804704a270e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-ratio` | updateRatio | ratioDisplay, coffeeGrams, waterMl |
| `calculate` | calculate | ratioDisplay, coffeeGrams, waterMl |
| `run` | 按字段输入重新计算 | ratioDisplay, coffeeGrams, waterMl |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--coffee-amount` | 目标咖啡量 (毫升) | number | "240" |  |
| `--ratio-slider` | 粉水比例 1:15 | range | "15" | min=8, max=20 |

已检查示例：

```bash
html-tools food/coffee-ratio update-ratio --coffee-amount '240' --ratio-slider '15' --json
```

### food/wine-pairing

葡萄酒配餐指南：葡萄酒与食物搭配建议

来源：`html-tools/tools/food/wine-pairing.html`，SHA-256：`901db58a53fe9c5f557f20b55742b06fca237ec2f2092beca9cbd9c8c442db00`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-foods` | filterFoods | foodGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools food/wine-pairing filter-foods  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### food/meat-temperature

肉类温度参考：肉类最佳烹饪温度

来源：`html-tools/tools/food/meat-temperature.html`，SHA-256：`fe6fee0836f83daadcb0f73ccd52cad77833267d51509de2a11f56fb058e0943`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | celsius, fahrenheit |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--celsius` | 摄氏度 (°C) | number | "63" |  |
| `--fahrenheit` | 华氏度 (°F) | number | "145" |  |

已检查示例：

```bash
html-tools food/meat-temperature run --celsius '63' --fahrenheit '145' --json
```

### food/food-cost

菜品成本计算器：计算菜品成本和利润

来源：`html-tools/tools/food/food-cost.html`，SHA-256：`fd081d1d4a73e71e088fd0442cbaaae7c8838329804401144d93a5fb7a366943`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | totalCost, costPerServing, profitMargin, suggestedPrice, actualCostRate, profitPerServing, costBreakdown |
| `run` | 按字段输入重新计算 | totalCost, costPerServing, profitMargin, suggestedPrice, actualCostRate, profitPerServing, costBreakdown |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--ingredient-name` | 食材名称 | text | "鸡胸肉" |  |
| `--ingredient-qty` | 食材名称 | number | "200" |  |
| `--ingredient-unit` | 食材名称 | text | "克" |  |
| `--ingredient-price` | 食材名称 | number | "0.025" |  |
| `--ingredient-name-2` | 食材名称 | text | "西兰花" |  |
| `--ingredient-qty-2` | 食材名称 | number | "150" |  |
| `--ingredient-unit-2` | 食材名称 | text | "克" |  |
| `--ingredient-price-2` | 食材名称 | number | "0.012" |  |
| `--ingredient-name-3` | 食材名称 | text | "橄榄油" |  |
| `--ingredient-qty-3` | 食材名称 | number | "15" |  |
| `--ingredient-unit-3` | 食材名称 | text | "毫升" |  |
| `--ingredient-price-3` | 食材名称 | number | "0.08" |  |
| `--servings` | 份数 | number | "4" | min=1 |
| `--target-cost-rate` | 目标成本率 (%) | number | "30" | min=1, max=100 |
| `--selling-price` | 售价 (¥) | number | "0" | min=0 |

已检查示例：

```bash
html-tools food/food-cost calculate --ingredient-name '鸡胸肉' --ingredient-qty '200' --ingredient-unit '克' --ingredient-price '0.025' --ingredient-name-2 '西兰花' --ingredient-qty-2 '150' --ingredient-unit-2 '克' --ingredient-price-2 '0.012' --ingredient-name-3 '橄榄油' --ingredient-qty-3 '15' --ingredient-unit-3 '毫升' --ingredient-price-3 '0.08' --servings '4' --target-cost-rate '30' --selling-price '0' --json
```

### food/shopping-list

购物清单生成器：生成购物清单

来源：`html-tools/tools/food/shopping-list.html`，SHA-256：`0184a163feef442eba79d4560800410b12364adce44f246aadd8f06d4a1c47b8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-category-all` | 全部 | progressText |
| `filter-category-produce` | 蔬果 | progressText |
| `filter-category-meat` | 肉类 | progressText |
| `filter-category-dairy` | 乳制品 | progressText |
| `filter-category-bakery` | 烘焙 | progressText |
| `filter-category-pantry` | 杂货 | progressText |
| `filter-category-household` | 日用品 | progressText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--item-input` | 添加物品... | text | "" |  |

已检查示例：

```bash
html-tools food/shopping-list filter-category-all --item-input 'Hello world
Hello world
TypeScript' --json
```

### food/fermentation-timer

发酵计时器：面团发酵计时

来源：`html-tools/tools/food/fermentation-timer.html`，SHA-256：`2ae74beed78ed988e3f2556995e383551a73671e0d1be217cb92dc4ef2474799`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-custom-time` | updateCustomTime | timerDisplay |
| `update-temp` | updateTemp | tempValue, timerDisplay |
| `update-display` | updateDisplay | timerDisplay |
| `run` | 按字段输入重新计算 | tempValue, timerDisplay |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--days` | 天 | number | "0" | min=0, max=30 |
| `--hours` | 小时 | number | "1" | min=0, max=23 |
| `--minutes` | 分钟 | number | "30" | min=0, max=59 |
| `--temp-slider` | tempSlider | range | "25" | min=15, max=35 |

已检查示例：

```bash
html-tools food/fermentation-timer update-custom-time --days '0' --hours '1' --minutes '30' --temp-slider '25' --json
```

操作限制：部分原页面操作未通过迁移检查: bread: 原工具没有产生可输出的结果，请检查参数 | bread2: 原工具没有产生可输出的结果，请检查参数 | yogurt: 原工具没有产生可输出的结果，请检查参数 | sourdough: 原工具没有产生可输出的结果，请检查参数 | kimchi: 原工具没有产生可输出的结果，请检查参数 | kombucha: 原工具没有产生可输出的结果，请检查参数

### food/serving-size

食物份量计算器：计算食物份量

来源：`html-tools/tools/food/serving-size.html`，SHA-256：`103af6a653dd9d0c3452acecae2b5df33e24e52c7aa130d546fdcc908a604f13`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | totalEstimate, proteinGrid, sidesGrid, starchGrid, drinksGrid |
| `run` | 按字段输入重新计算 | totalEstimate, proteinGrid, sidesGrid, starchGrid, drinksGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--duration` | 用餐时长 | select-one | "2" | "1" (1小时 (简单聚会)); "2" (2小时 (标准聚餐)); "3" (3小时 (长时间活动)); "4" (4小时+ (全天活动)) |
| `--field-2` / `--no-field-2` | 用餐时长 | checkbox | false |  |
| `--field-3` / `--no-field-3` | 用餐时长 | checkbox | false |  |
| `--field-4` / `--no-field-4` | 用餐时长 | checkbox | false |  |
| `--field-5` / `--no-field-5` | 用餐时长 | checkbox | false |  |

已检查示例：

```bash
html-tools food/serving-size calculate --duration '2' --no-field-2 --no-field-3 --no-field-4 --no-field-5 --json
```

### food/food-storage

食材保存时间查询：查询食材保存时间

来源：`html-tools/tools/food/food-storage.html`，SHA-256：`51c60a69bddb37451751038f8eae1be5db9fe0a491d9792c89e802adaa8a8c7a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-foods` | filterFoods | foodList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools food/food-storage filter-foods  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### food/drink-mixer

鸡尾酒配方工具：鸡尾酒配方查询

来源：`html-tools/tools/food/drink-mixer.html`，SHA-256：`fc45b4935a5c72b3fc54b5dd039c7d1da472c616e6497f493ee06665577757b5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-cocktails` | filterCocktails | cocktailGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools food/drink-mixer filter-cocktails  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### food/recipe-converter

食谱份量转换器：调整食谱食材份量

来源：`html-tools/tools/food/recipe-converter.html`，SHA-256：`dac3e874da3c9799c9556372a37351b9c8f7cdabbf96cf41ac3e9f6ec8605bf6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | originalServings, targetServings, scaleInfo, ingredientsList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--ingredient-name` | 食材名称 (如: 鸡蛋) | text | "" |  |
| `--ingredient-amount` | 数量 (如: 200g 或 2个) | text | "" |  |

已检查示例：

```bash
html-tools food/recipe-converter render --ingredient-name 'Hello world
Hello world
TypeScript' --ingredient-amount 'Hello world
Hello world
TypeScript' --json
```

### food/recipe-timer

烹饪计时器：多个烹饪计时器同时运行，厨房好帮手

来源：`html-tools/tools/food/recipe-timer.html`，SHA-256：`fd371d7f530e73c9f68ab99235e7a16f96fb034583ba654e69d5e66e2e727ee2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | time |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools food/recipe-timer render  --json
```

## fun

### fun/stopwatch

秒表计时器(简版)：精确秒表计时器

来源：`html-tools/tools/fun/stopwatch.html`，SHA-256：`04b10241341f0e8ccef22e394e8117ee794cec5fb8e99e7462d8258411fe07fa`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-display` | updateDisplay | display, displayMs |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools fun/stopwatch update-display  --json
```

### fun/typing-test

打字测试：测试打字速度

来源：`html-tools/tools/fun/typing-test.html`，SHA-256：`9c4b3b1f97d72be0f49ce9dd034eb0373ac527f88b8f762bd4d2d6dc34ccfaaa`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `check-typing` | checkTyping | text |
| `update-stats` | updateStats | wpm, accuracy, time |
| `run` | 按字段输入重新计算 | text |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 开始输入... | textarea | "" |  |

已检查示例：

```bash
html-tools fun/typing-test check-typing --input 'Hello world
Hello world
TypeScript' --json
```

### fun/number-guessing

猜数字：猜数字游戏

来源：`html-tools/tools/fun/number-guessing.html`，SHA-256：`577ebfa37fc5807467719a2e54f5c8b2381c182a67057efe977be95a07660752`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `check-guess` | 猜! | hint, attempts |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--guess` | 输入你的猜测 | number | "" | min=1, max=100 |

已检查示例：

```bash
html-tools fun/number-guessing check-guess --guess '10' --json
```

### fun/name-generator

Name Generator：Name Generator，在线使用，趣味工具，浏览器本地运行无需上传

来源：`html-tools/tools/fun/name-generator.html`，SHA-256：`a9e8e07c6147046d6e4e127f31913527f778e7aa64f127d30ac87edbf7261b74`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成名字 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--language` | 语言 | select-one | "chinese" | "chinese" (中文); "english" (英文); "japanese" (日文) |
| `--gender` | 性别 | select-one | "random" | "random" (随机); "male" (男); "female" (女) |
| `--count` | 数量 | number | "5" | min=1, max=20 |

已检查示例：

```bash
html-tools fun/name-generator generate --language 'chinese' --gender 'random' --count '5' --json
```

### fun/quiz-maker

Quiz Maker：Quiz Maker，在线使用，趣味工具，浏览器本地运行无需上传

来源：`html-tools/tools/fun/quiz-maker.html`，SHA-256：`0fa78f97066a2bee050371a1b8cdaa146de09aa58e615f0a0d0e914f670eeecb`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-timer-display` | updateTimerDisplay | timer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools fun/quiz-maker update-timer-display  --json
```

### fun/wheel-of-fortune

Wheel Of Fortune：Wheel Of Fortune，在线使用，趣味工具，浏览器本地运行无需上传

来源：`html-tools/tools/fun/wheel-of-fortune.html`，SHA-256：`7377b07711f36d6a4d2b3f9ac12f61c469fa0cff20891e173cf7f85e19fb92e3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-wheel` | 更新转盘 | wheel, result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--options-input` | optionsInput | textarea | "选项1\n选项2\n选项3\n选项4\n选项5\n选项6" |  |

已检查示例：

```bash
html-tools fun/wheel-of-fortune update-wheel --options-input '选项1
选项2
选项3
选项4
选项5
选项6' --json
```

## generator

### generator/avatar-generator

头像生成器：根据名字首字母生成头像

来源：`html-tools/tools/generator/avatar-generator.html`，SHA-256：`6dd9b86ebd70d7a59321b46da7470701921069fc4891b7bb81831efb0fb6e995`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-avatar` | updateAvatar | avatarLg, avatarMd, avatarSm |
| `run` | 按字段输入重新计算 | avatarLg, avatarMd, avatarSm |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--name-input` | 名称 | text | "张三" |  |
| `--bg-color` | 背景色 | color | "#667eea" |  |
| `--text-color` | 文字颜色 | color | "#ffffff" |  |

已检查示例：

```bash
html-tools generator/avatar-generator update-avatar --name-input '张三' --bg-color '#667eea' --text-color '#ffffff' --json
```

### generator/barcode

条形码生成器：生成多种格式条形码：Code128、EAN、UPC 等

来源：`html-tools/tools/generator/barcode.html`，SHA-256：`5224c19366cca04dd5cf51a4f9d8fd7dfdb60c7b7119c3a3c16bdfb1dd78b1ae`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成条形码 | barcode |
| `update-format-info` | updateFormatInfo | formatInfo |
| `run` | 按字段输入重新计算 | barcode, formatInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--content` | 输入内容 | text | "123456789012" |  |
| `--format` | 条形码格式 | select-one | "CODE128" | "CODE128" (Code 128 (通用)); "CODE128A" (Code 128 A); "CODE128B" (Code 128 B); "CODE128C" (Code 128 C); "EAN13" (EAN-13 (商品码)); "EAN8" (EAN-8); "UPC" (UPC); "CODE39" (Code 39); "ITF14" (ITF-14); "MSI" (MSI); "pharmacode" (Pharmacode) |
| `--width` | 条形宽度 | select-one | "2" | "1" (细 (1px)); "2" (标准 (2px)); "3" (粗 (3px)); "4" (特粗 (4px)) |
| `--height` | 高度 | select-one | "100" | "50" (50px); "80" (80px); "100" (100px); "150" (150px); "200" (200px) |
| `--display-value` | 显示文字 | select-one | "true" | "true" (显示); "false" (隐藏) |
| `--text-position` | 文字位置 | select-one | "bottom" | "bottom" (底部); "top" (顶部) |
| `--font-size` | 文字大小 | select-one | "20" | "12" (12px); "16" (16px); "20" (20px); "24" (24px) |

已检查示例：

```bash
html-tools generator/barcode generate --content '123456789012' --format 'CODE128' --width '2' --height '100' --display-value 'true' --text-position 'bottom' --font-size '20' --json
```

### generator/code-card

代码卡片生成器：代码卡片生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/code-card.html`，SHA-256：`2be2babba80abae773ea3035e617c047203c69195e4df77621aa3de402d77485`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | windowTitle, lineNumbers, codeText |
| `run` | 按字段输入重新计算 | paddingValue, borderRadiusValue, fontSizeValue, windowTitle, lineNumbers, codeText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--code-input` | 📝 代码 | textarea | "function greet(name) {\n  // Say hello\n  const message = `Hello, ${name}!`;\n  console.log(message);\n  return message;\n}\n\ngreet(\"World\");" |  |
| `--language` | 🔤 编程语言 | select-one | "javascript" | "javascript" (JavaScript); "typescript" (TypeScript); "python" (Python); "java" (Java); "cpp" (C++); "go" (Go); "rust" (Rust); "html" (HTML); "css" (CSS); "sql" (SQL); "json" (JSON) |
| `--padding` | padding | range | "32" | min=16, max=64 |
| `--border-radius` | borderRadius | range | "12" | min=0, max=24 |
| `--font-size` | fontSize | range | "14" | min=10, max=20 |
| `--show-line-numbers` / `--no-show-line-numbers` | 行号 | checkbox | true |  |
| `--show-window-controls` / `--no-show-window-controls` | 窗口按钮 | checkbox | true |  |
| `--show-title` / `--no-show-title` | 标题栏 | checkbox | true |  |
| `--filename` | 📄 文件名 | text | "example.js" |  |

已检查示例：

```bash
html-tools generator/code-card render --code-input 'function greet(name) {
  // Say hello
  const message = `Hello, ${name}!`;
  console.log(message);
  return message;
}

greet("World");' --language 'javascript' --padding '32' --border-radius '12' --font-size '14' --show-line-numbers --show-window-controls --show-title --filename 'example.js' --json
```

### generator/email-signature

邮件签名生成器：生成专业的 HTML 邮件签名

来源：`html-tools/tools/generator/email-signature.html`，SHA-256：`ac59e09337501398726aaba4e3ead0bc6e2629239ff877f8ca6a8b2023b5b597`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | preview |
| `run` | 按字段输入重新计算 | preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--name` | 姓名 | text | "张三" |  |
| `--title` | 职位 | text | "高级产品经理" |  |
| `--company` | 公司 | text | "科技有限公司" |  |
| `--email` | 邮箱 | email | "zhangsan@company.com" |  |
| `--phone` | 电话 | tel | "+86 138 8888 8888" |  |
| `--website` | 网站 | url | "https://www.company.com" |  |
| `--primary-color` | 主色调 | color | "#6366f1" |  |
| `--text-color` | 文字颜色 | color | "#333333" |  |

已检查示例：

```bash
html-tools generator/email-signature update-preview --name '张三' --title '高级产品经理' --company '科技有限公司' --email 'zhangsan@company.com' --phone '+86 138 8888 8888' --website 'https://www.company.com' --primary-color '#6366f1' --text-color '#333333' --json
```

### generator/fake-data

假数据生成器：生成测试用的假数据：姓名、邮箱、地址、电话等

来源：`html-tools/tools/generator/fake-data.html`，SHA-256：`d4125f199104cb39eed6287692e427e382c6eafdf9b95dad259f03a4548902bf`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成数据 | output |
| `generate-email` | generateEmail | value |
| `generate-phone` | generatePhone | value |
| `generate-id-card` | generateIdCard | value |
| `generate-address` | generateAddress | value |
| `generate-company` | generateCompany | value |
| `generate-ip` | generateIP | value |
| `generate-url` | generateURL | value |
| `generate-date` | generateDate | value |
| `generate-uuid` | generateUUID | value |
| `generate-color` | generateColor | value |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--count` | 生成数量 | number | "10" | min=1, max=1000 |
| `--format` | 输出格式 | select-one | "json" | "json" (JSON); "csv" (CSV); "text" (纯文本) |

已检查示例：

```bash
html-tools generator/fake-data generate --count '10' --format 'json' --json
```

操作限制：部分原页面操作未通过迁移检查: person: 原工具没有产生可输出的结果，请检查参数 | name: 原工具没有产生可输出的结果，请检查参数 | email: 原工具没有产生可输出的结果，请检查参数 | phone: 原工具没有产生可输出的结果，请检查参数 | idcard: 原工具没有产生可输出的结果，请检查参数 | company: 原工具没有产生可输出的结果，请检查参数 | ip: 原工具没有产生可输出的结果，请检查参数 | url: 原工具没有产生可输出的结果，请检查参数 | date: 原工具没有产生可输出的结果，请检查参数 | uuid: 原工具没有产生可输出的结果，请检查参数 | color: 原工具没有产生可输出的结果，请检查参数 | generate-name: 原工具没有产生可输出的结果，请检查参数 | generate-person: 原工具没有产生可输出的结果，请检查参数

### generator/github-contrib

GitHub 贡献图生成器：GitHub 贡献图生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/github-contrib.html`，SHA-256：`e8325cf74bc61c13c3328a02cec77291d2ba2e5486dc79ec94b87c8057d8b87e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-btn` | 生成贡献图 | monthLabels, stats |
| `generate-graph` | generateGraph | monthLabels, stats |
| `update-stats` | updateStats | stats |
| `run` | 按字段输入重新计算 | monthLabels, stats, activityValue, maxContribValue, weeksValue, brushLevelValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--activity` | 活跃度: 50 % | range | "50" | min=0, max=100 |
| `--max-contrib` | 最大贡献数: 20 | range | "20" | min=1, max=50 |
| `--weeks` | 显示周数: 52 | range | "52" | min=12, max=53 |
| `--username` | 用户名 | text | "username" |  |
| `--text-pattern` | 文字图案 | text | "HI" |  |
| `--brush-level` | 当前画笔等级: 4 | range | "4" | min=0, max=4 |

已检查示例：

```bash
html-tools generator/github-contrib generate-btn --activity '50' --max-contrib '20' --weeks '52' --username 'username' --text-pattern 'HI' --brush-level '4' --json
```

操作限制：部分原页面操作未通过迁移检查: generate-contribution-data: 原工具没有产生可输出的结果，请检查参数

### generator/gradient-card

渐变色卡生成器：渐变色卡生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/gradient-card.html`，SHA-256：`f495eb14e231d20eb2091001fa033aa17ed8e9dd60cff08259d6082adfdd8b27`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-btn` | 生成色卡 | colorCards |
| `generate-gradient` | generateGradient | colorCards |
| `run` | 按字段输入重新计算 | colorCards, angleValue, colorCountValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` | 预设渐变 | color | "#667eea" |  |
| `--field-2` | 预设渐变 | number | "0" | min=0, max=100 |
| `--field-3` | 预设渐变 | color | "#764ba2" |  |
| `--field-4` | 预设渐变 | number | "100" | min=0, max=100 |
| `--angle` | 渐变方向: 90 deg | range | "90" | min=0, max=360 |
| `--color-count` | 提取颜色数量: 5 | range | "5" | min=2, max=12 |
| `--gradient-type` | 渐变类型 | select-one | "linear" | "linear" (线性渐变); "radial" (径向渐变); "conic" (锥形渐变) |

已检查示例：

```bash
html-tools generator/gradient-card generate-btn --field-1 '#667eea' --field-2 '0' --field-3 '#764ba2' --field-4 '100' --angle '90' --color-count '5' --gradient-type 'linear' --json
```

操作限制：部分原页面操作未通过迁移检查: extract-colors: 原工具没有产生可输出的结果，请检查参数

### generator/logo-text

Logo 文字生成器：Logo 文字生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/logo-text.html`，SHA-256：`8988e006ccd7fce08a17d8ff8720a5d5b3cc3f98e4c9662fcbd3b2daccb557c9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-btn` | 应用效果 | logoPreview |
| `update-preview` | updatePreview | logoPreview |
| `run` | 按字段输入重新计算 | logoPreview, textColor, textColorText, gradientColor2, gradientColor2Text, fontSizeValue, letterSpacingValue, shadowColor, shadowColorText, outlineColor, outlineColorText, outlineWidthValue, rotateValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--logo-text` | Logo 文字 | text | "Logo" |  |
| `--text-color` | textColor | color | "#4f46e5" |  |
| `--text-color-text` | textColorText | text | "#4F46E5" |  |
| `--use-gradient` / `--no-use-gradient` | 使用渐变 | checkbox | false |  |
| `--gradient-color2` | gradientColor2 | color | "#7c3aed" |  |
| `--gradient-color2-text` | gradientColor2Text | text | "#7C3AED" |  |
| `--font-size` | 字体大小: 72 px | range | "72" | min=24, max=200 |
| `--letter-spacing` | 字母间距: 0 px | range | "0" | min=-10, max=30 |
| `--effect-bold` / `--no-effect-bold` | 粗体 | checkbox | true |  |
| `--effect-italic` / `--no-effect-italic` | 斜体 | checkbox | false |  |
| `--effect-uppercase` / `--no-effect-uppercase` | 大写 | checkbox | false |  |
| `--effect-shadow` / `--no-effect-shadow` | 阴影 | checkbox | false |  |
| `--effect-outline` / `--no-effect-outline` | 描边 | checkbox | false |  |
| `--effect3-d` / `--no-effect3-d` | 3D 效果 | checkbox | false |  |
| `--shadow-color` | shadowColor | color | "#000000" |  |
| `--shadow-color-text` | shadowColorText | text | "#000000" |  |
| `--outline-color` | outlineColor | color | "#ffffff" |  |
| `--outline-color-text` | outlineColorText | text | "#ffffff" |  |
| `--outline-width` | 描边粗细: 2 px | range | "2" | min=1, max=10 |
| `--rotate` | 旋转角度: 0 deg | range | "0" | min=-45, max=45 |

已检查示例：

```bash
html-tools generator/logo-text generate-btn --logo-text 'Logo' --text-color '#4f46e5' --text-color-text '#4F46E5' --no-use-gradient --gradient-color2 '#7c3aed' --gradient-color2-text '#7C3AED' --font-size '72' --letter-spacing '0' --effect-bold --no-effect-italic --no-effect-uppercase --no-effect-shadow --no-effect-outline --no-effect3-d --shadow-color '#000000' --shadow-color-text '#000000' --outline-color '#ffffff' --outline-color-text '#ffffff' --outline-width '2' --rotate '0' --json
```

### generator/mesh-gradient

Mesh渐变背景生成器：Mesh渐变背景生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/mesh-gradient.html`，SHA-256：`d14a5fef56029fb52da9cb2096f652d4fb7960d346ffe846b2062edd804a0695`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | codeOutput |
| `update-code` | updateCode | codeOutput |
| `generate-svg` | generateSVG | value |
| `run` | 按字段输入重新计算 | blurValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` | 预设配色 | color | "#667eea" |  |
| `--field-2` | 预设配色 | number | "20" | min=0, max=100 |
| `--field-3` | 预设配色 | number | "30" | min=0, max=100 |
| `--field-4` | 预设配色 | color | "#764ba2" |  |
| `--field-5` | 预设配色 | number | "80" | min=0, max=100 |
| `--field-6` | 预设配色 | number | "20" | min=0, max=100 |
| `--field-7` | 预设配色 | color | "#f093fb" |  |
| `--field-8` | 预设配色 | number | "50" | min=0, max=100 |
| `--field-9` | 预设配色 | number | "80" | min=0, max=100 |
| `--blur` | 模糊程度 40 % | range | "40" | min=10, max=100 |
| `--bg-color` | 背景色 | color | "#ffffff" |  |
| `--export-width` | exportWidth | number | "1920" | min=100, max=4096 |
| `--export-height` | exportHeight | number | "1080" | min=100, max=4096 |

已检查示例：

```bash
html-tools generator/mesh-gradient update-preview --field-1 '#667eea' --field-2 '20' --field-3 '30' --field-4 '#764ba2' --field-5 '80' --field-6 '20' --field-7 '#f093fb' --field-8 '50' --field-9 '80' --blur '40' --bg-color '#ffffff' --export-width '1920' --export-height '1080' --json
```

### generator/mock-data

Mock 数据生成器：生成模拟测试数据

来源：`html-tools/tools/generator/mock-data.html`，SHA-256：`de88f85c894711a45c8922ca434a97d0be9bed7ab11bcfda4019510b56b14580`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成数据 | output |
| `generate-data` | generateData | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--data-type` | 数据类型 | select-one | "users" | "users" (用户数据); "products" (产品数据); "orders" (订单数据); "custom" (自定义) |
| `--count` | 生成数量 | number | "10" | min=1, max=1000 |
| `--format` | 输出格式 | select-one | "json" | "json" (JSON); "csv" (CSV) |
| `--field-4` | 数据类型 | text | "id" |  |
| `--field-5` | 数据类型 | select-one | "uuid" | "uuid" (UUID); "number" (数字); "name" (姓名); "email" (邮箱); "date" (日期); "boolean" (布尔值); "text" (文本) |
| `--field-6` | 数据类型 | text | "name" |  |
| `--field-7` | 数据类型 | select-one | "name" | "uuid" (UUID); "number" (数字); "name" (姓名); "email" (邮箱); "date" (日期); "boolean" (布尔值); "text" (文本) |

已检查示例：

```bash
html-tools generator/mock-data generate --data-type 'users' --count '10' --format 'json' --field-4 'id' --field-5 'uuid' --field-6 'name' --field-7 'name' --json
```

操作限制：部分原页面操作未通过迁移检查: update-field-visibility: 已生成 10 条数据 | run: 已生成 10 条数据

### generator/nanoid-generator

NanoID 生成器：生成紧凑的 URL 安全短 ID，可自定义长度和字符集

来源：`html-tools/tools/generator/nanoid-generator.html`，SHA-256：`e4d1fbf1702eb1c0b78773d57b623fe54192e871f9170585d4a511d240466eec`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 | output, info |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--length` | 长度 | number | "21" | min=1, max=64 |
| `--count` | 数量 | number | "10" | min=1, max=100 |
| `--alphabet` | 字符集 | select-one | "default" | "default" (默认 (A-Za-z0-9_-)); "alphanumeric" (字母数字 (A-Za-z0-9)); "lowercase" (小写字母数字 (a-z0-9)); "hex" (十六进制 (0-9a-f)); "numbers" (纯数字 (0-9)); "custom" (自定义) |
| `--custom-alphabet` | 自定义字符集 | text | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" |  |

已检查示例：

```bash
html-tools generator/nanoid-generator generate --length '21' --count '10' --alphabet 'default' --custom-alphabet 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### generator/noise-texture

噪点纹理生成器：噪点纹理生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/noise-texture.html`，SHA-256：`cdbb3b1ead871c5dafc47e3d5287b907a27205f5b1b058d2aa7927fcf2abf80e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-btn` | 生成噪点 | noiseCanvas |
| `generate-noise` | generateNoise | noiseCanvas |
| `run` | 按字段输入重新计算 | noiseCanvas, fgColor, fgColorText, bgColor, bgColorText, intensityValue, densityValue, grainSizeValue, scaleValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--fg-color` | fgColor | color | "#000000" |  |
| `--fg-color-text` | 请输入文本输入框 | text | "#000000" |  |
| `--bg-color` | bgColor | color | "#ffffff" |  |
| `--bg-color-text` | 请输入文本输入框 | text | "#ffffff" |  |
| `--intensity` | 噪点强度: 50 % | range | "50" | min=1, max=100 |
| `--density` | 噪点密度: 50 % | range | "50" | min=1, max=100 |
| `--grain-size` | 噪点大小: 1 | range | "1" | min=1, max=10 |
| `--scale` | 缩放比例: 50 | range | "50" | min=10, max=200 |
| `--monochrome` / `--no-monochrome` | 单色模式 | checkbox | true |  |
| `--seamless` / `--no-seamless` | 无缝平铺 | checkbox | false |  |

已检查示例：

```bash
html-tools generator/noise-texture generate-btn --fg-color '#000000' --fg-color-text '#000000' --bg-color '#ffffff' --bg-color-text '#ffffff' --intensity '50' --density '50' --grain-size '1' --scale '50' --monochrome --no-seamless --json
```

### generator/password-generator

密码生成器：生成安全随机密码，支持自定义长度和字符类型

来源：`html-tools/tools/generator/password-generator.html`，SHA-256：`0de4c5e7dddc112e22388314f871bb36ddc793ff5c72618a1ee73731d801dfb7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成密码 | password, strengthText, historyList |
| `update-length` | updateLength | lengthValue, lengthDisplay |
| `run` | 按字段输入重新计算 | lengthValue, lengthDisplay |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--length` | length | range | "16" | min=4, max=64 |
| `--uppercase` / `--no-uppercase` | 大写字母 A-Z | checkbox | true |  |
| `--lowercase` / `--no-lowercase` | 小写字母 a-z | checkbox | true |  |
| `--numbers` / `--no-numbers` | 数字 0-9 | checkbox | true |  |
| `--symbols` / `--no-symbols` | 特殊符号 !@#$ | checkbox | true |  |

已检查示例：

```bash
html-tools generator/password-generator generate --length '16' --uppercase --lowercase --numbers --symbols --json
```

### generator/pixel-editor

像素画编辑器：像素画编辑器，在线编辑，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/pixel-editor.html`，SHA-256：`6feaadd9e9784e238d6e19c01c807285cc570642b7ac9350d17abdc99f535ad9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-image` | 📥 下载 PNG | download |
| `render` | render | previewCanvas, pixelCanvas |
| `run` | 按字段输入重新计算 | brushSizeLabel, previewCanvas, pixelCanvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color-picker` | colorPicker | color | "#000000" |  |
| `--brush-size` | 🖌️ 笔刷大小 | range | "1" | min=1, max=8 |
| `--show-grid` / `--no-show-grid` | 显示网格 | checkbox | true |  |

已检查示例：

```bash
html-tools generator/pixel-editor export-image --color-picker '#000000' --brush-size '1' --show-grid --json
```

### generator/placeholder-image

占位图生成器：生成自定义尺寸、颜色、文字的占位图片

来源：`html-tools/tools/generator/placeholder-image.html`，SHA-256：`425dbaf7d6e6775c3afe2736667cec53b83feedd07b89d56f9089ae26c658372`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export` | 📥 下载图片 | download |
| `generate` | generate | canvas, urlBox |
| `update-url` | updateUrl | urlBox |
| `run` | 按字段输入重新计算 | canvas, urlBox |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--width` | 请输入数字输入框 | number | "800" | min=1, max=4000 |
| `--height` | 请输入数字输入框 | number | "600" | min=1, max=4000 |
| `--bg-color` | 背景颜色 | color | "#cccccc" |  |
| `--text-color` | 文字颜色 | color | "#969696" |  |
| `--custom-text` | 显示文字 | text | "" |  |

已检查示例：

```bash
html-tools generator/placeholder-image export --width '800' --height '600' --bg-color '#cccccc' --text-color '#969696' --custom-text 'Hello world
Hello world
TypeScript' --json
```

### generator/progress-bar-generator

进度条生成器：自定义样式生成 CSS 进度条，支持动画效果

来源：`html-tools/tools/generator/progress-bar-generator.html`，SHA-256：`3de24065648ef66b149e7284ac3618e0588c9d1f0c98699ae38996e1e75b17e5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | previewContainer, progressValue, widthValue, heightValue, borderRadiusValue, animationSpeedValue, transitionValue, labelSizeValue, codeOutput |
| `update-code-output` | updateCodeOutput | codeOutput |
| `run` | 按字段输入重新计算 | previewContainer, progressValue, widthValue, heightValue, borderRadiusValue, animationSpeedValue, transitionValue, labelSizeValue, codeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--progress` | progress | range | "65" | min=0, max=100 |
| `--width` | width | range | "400" | min=100, max=600 |
| `--height` | height | range | "20" | min=4, max=50 |
| `--border-radius` | borderRadius | range | "10" | min=0, max=25 |
| `--bar-color` | 进度条颜色 | color | "#00bcd4" |  |
| `--bg-color` | 背景颜色 | color | "#e0e0e0" |  |
| `--gradient-color` | 渐变结束色 | color | "#4caf50" |  |
| `--use-gradient` / `--no-use-gradient` | 使用渐变 | checkbox | false |  |
| `--show-label` / `--no-show-label` | 显示百分比 | checkbox | true |  |
| `--animation` | 动画类型 | select-one | "none" | "none" (无动画); "striped" (条纹); "striped-animated" (动画条纹); "pulse" (脉冲); "glow" (发光) |
| `--animation-speed` | animationSpeed | range | "1" | min=0.5, max=3 |
| `--transition` | transition | range | "0.3" | min=0, max=1 |
| `--label-position` | 文字位置 | select-one | "inside" | "inside" (内部); "outside-right" (右侧); "outside-top" (上方) |
| `--label-color` | 文字颜色 | color | "#ffffff" |  |
| `--label-size` | labelSize | range | "12" | min=10, max=18 |

已检查示例：

```bash
html-tools generator/progress-bar-generator update-preview --progress '65' --width '400' --height '20' --border-radius '10' --bar-color '#00bcd4' --bg-color '#e0e0e0' --gradient-color '#4caf50' --no-use-gradient --show-label --animation 'none' --animation-speed '1' --transition '0.3' --label-position 'inside' --label-color '#ffffff' --label-size '12' --json
```

### generator/qrcode-batch

批量二维码生成器：批量二维码生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/qrcode-batch.html`，SHA-256：`86e394a0e6c56293e490ac6b5d93a29238eb6ae2a87d60b4e9e79b8ffd29ce2b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-all` | ⚡ 批量生成 | totalCount, qrGrid |
| `run` | 按字段输入重新计算 | darkColor, darkColorText, lightColor, lightColorText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--batch-input` | 批量内容 (每行一个) | textarea | "https://example.com\nhttps://github.com\nhttps://google.com" |  |
| `--qr-size` | 尺寸 (px) | select-one | "200" | "128" (128 x 128); "200" (200 x 200); "256" (256 x 256); "300" (300 x 300); "400" (400 x 400); "512" (512 x 512) |
| `--error-level` | 容错级别 | select-one | "M" | "L" (L (7%)); "M" (M (15%)); "Q" (Q (25%)); "H" (H (30%)) |
| `--margin` | 边距 | select-one | "2" | "0" (无边距); "1" (1); "2" (2); "4" (4) |
| `--dark-color` | darkColor | color | "#000000" |  |
| `--dark-color-text` | 请输入文本输入框 | text | "#000000" |  |
| `--light-color` | lightColor | color | "#ffffff" |  |
| `--light-color-text` | 请输入文本输入框 | text | "#ffffff" |  |

已检查示例：

```bash
html-tools generator/qrcode-batch generate-all --batch-input 'https://example.com
https://github.com
https://google.com' --qr-size '200' --error-level 'M' --margin '2' --dark-color '#000000' --dark-color-text '#000000' --light-color '#ffffff' --light-color-text '#ffffff' --json
```

### generator/qrcode-generator

二维码生成器：生成自定义颜色和大小的二维码

来源：`html-tools/tools/generator/qrcode-generator.html`，SHA-256：`9d700b80dadebd605e1aabe210179a04533c17e450a40ee60c01d8be4302784c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-qr` | 生成二维码 | qrCanvas, qrInfo |
| `export-qr` | 下载 PNG | download |
| `run` | 按字段输入重新计算 | qrCanvas, qrInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-input` | 文本或 URL | textarea | "" |  |
| `--qr-size` | 二维码大小 (px) | number | "256" | min=64, max=1024 |
| `--fg-color` | 前景色 | color | "#000000" |  |
| `--bg-color` | 背景色 | color | "#ffffff" |  |

已检查示例：

```bash
html-tools generator/qrcode-generator generate-qr --text-input 'Hello world
Hello world
TypeScript' --qr-size '256' --fg-color '#000000' --bg-color '#ffffff' --json
```

### generator/resume-builder

简历生成器：简历生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/resume-builder.html`，SHA-256：`fdb73e989b62be4cd577f5a7eda6f08b44924c53d698559c150ae0757a5b61e7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | resumePreview |
| `run` | 按字段输入重新计算 | resumePreview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--template` | 选择模板 | select-one | "modern" | "modern" (现代简约); "classic" (经典传统); "creative" (创意风格) |
| `--name` | 姓名 | text | "" |  |
| `--title` | 职位 | text | "" |  |
| `--email` | 邮箱 | email | "" |  |
| `--phone` | 电话 | tel | "" |  |
| `--location` | 地址 | text | "" |  |
| `--summary` | 简要介绍您的专业背景、核心技能和职业目标... | textarea | "" |  |
| `--exp-company` | 公司名称 | text | "" |  |
| `--exp-position` | 职位 | text | "" |  |
| `--exp-start` | 开始时间 | month | "" |  |
| `--exp-end` | 结束时间 | month | "" |  |
| `--exp-current` / `--no-exp-current` | 至今 | checkbox | false |  |
| `--exp-description` | 工作描述 | textarea | "" |  |
| `--edu-school` | 学校名称 | text | "" |  |
| `--edu-degree` | 学历/学位 | text | "" |  |
| `--edu-major` | 专业 | text | "" |  |
| `--edu-date` | 毕业时间 | month | "" |  |
| `--skills` | 技能（用逗号分隔） | text | "" |  |

已检查示例：

```bash
html-tools generator/resume-builder update-preview --template 'modern' --name 'Hello world
Hello world
TypeScript' --title 'Hello world
Hello world
TypeScript' --email 'alice@example.com' --phone 'Hello world
Hello world
TypeScript' --location 'Hello world
Hello world
TypeScript' --summary 'Hello world
Hello world
TypeScript' --exp-company 'Hello world
Hello world
TypeScript' --exp-position 'Hello world
Hello world
TypeScript' --exp-start 'Hello world
Hello world
TypeScript' --exp-end 'Hello world
Hello world
TypeScript' --no-exp-current --exp-description '192.168.1.1' --edu-school 'Hello world
Hello world
TypeScript' --edu-degree 'Hello world
Hello world
TypeScript' --edu-major 'Hello world
Hello world
TypeScript' --edu-date 'Hello world
Hello world
TypeScript' --skills 'Hello world
Hello world
TypeScript' --json
```

### generator/signature-gen

签名生成器：签名生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/signature-gen.html`，SHA-256：`c78a8fcc36bde1f720e1feb8a1b6edac599d964eb1895776b890d3e53124292a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-signature` | 📥 下载 PNG | download |
| `export-svg` | 📥 下载 SVG | download |
| `render` | render | signatureCanvas |
| `run` | 按字段输入重新计算 | fontSizeValue, rotationValue, brushSizeValue, signatureCanvas, drawCanvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--signature-text` | ✏️ 签名文字 | text | "张三" |  |
| `--font-size` | fontSize | range | "60" | min=30, max=120 |
| `--text-color` | textColor | color | "#1a1a2e" |  |
| `--bg-color` | 透明 | color | "#ffffff" |  |
| `--transparent-bg` / `--no-transparent-bg` | 透明 | checkbox | false |  |
| `--rotation` | rotation | range | "-5" | min=-30, max=30 |
| `--draw-color` | drawColor | color | "#1a1a2e" |  |
| `--brush-size` | brushSize | range | "3" | min=1, max=20 |
| `--draw-bg-color` | 透明背景 | color | "#ffffff" |  |
| `--draw-transparent-bg` / `--no-draw-transparent-bg` | 透明背景 | checkbox | false |  |

已检查示例：

```bash
html-tools generator/signature-gen export-signature --signature-text '张三' --font-size '60' --text-color '#1a1a2e' --bg-color '#ffffff' --no-transparent-bg --rotation '-5' --draw-color '#1a1a2e' --brush-size '3' --draw-bg-color '#ffffff' --no-draw-transparent-bg --json
```

### generator/slug-generator

URL Slug 生成器：将文本转换为 URL 友好的 slug

来源：`html-tools/tools/generator/slug-generator.html`，SHA-256：`8f617047dc451fca053f4bba3a942c87713bf5be9737d475be40e61a08747476`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | generate | output, urlPreview |
| `run` | 按字段输入重新计算 | output, urlPreview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | textarea | "Hello World - 这是一个示例标题!" |  |
| `--lowercase` / `--no-lowercase` | 小写 | checkbox | true |  |
| `--remove-chinese` / `--no-remove-chinese` | 移除中文 | checkbox | false |  |
| `--remove-numbers` / `--no-remove-numbers` | 移除数字 | checkbox | false |  |
| `--separator` | 分隔符: 连字符 (-) 下划线 (_) 无 | select-one | "-" | "-" (连字符 (-)); "_" (下划线 (_)); "" (无) |

已检查示例：

```bash
html-tools generator/slug-generator generate --input 'Hello World - 这是一个示例标题!' --lowercase --no-remove-chinese --no-remove-numbers --separator '-' --json
```

### generator/social-image

社交媒体图片生成器：社交媒体图片生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/social-image.html`，SHA-256：`7a89a684b0ce1a8e56a1bfc8e4cd8b4accbdf6271d4e2b2b27863b43708f839e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-image` | 📥 下载图片 | download |
| `render` | render | canvas |
| `run` | 按字段输入重新计算 | titleSizeLabel, subtitleSizeLabel, canvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--bg-color1` | bgColor1 | color | "#667eea" |  |
| `--bg-color2` | bgColor2 | color | "#764ba2" |  |
| `--gradient-type` | gradientType | select-one | "linear" | "linear" (线性渐变); "radial" (径向渐变); "solid" (纯色) |
| `--title-text` | ✏️ 标题文字 | text | "创建精美的社交媒体图片" |  |
| `--title-color` | titleColor | color | "#ffffff" |  |
| `--title-size` | titleSize | range | "48" | min=20, max=100 |
| `--subtitle-text` | 📝 副标题 | textarea | "使用我们的工具轻松创建专业的分享图片" |  |
| `--subtitle-color` | subtitleColor | color | "#ffffff" |  |
| `--subtitle-size` | subtitleSize | range | "24" | min=12, max=48 |
| `--logo-upload` | 🖼️ 上传Logo | file | "" |  |

已检查示例：

```bash
html-tools generator/social-image export-image --bg-color1 '#667eea' --bg-color2 '#764ba2' --gradient-type 'linear' --title-text '创建精美的社交媒体图片' --title-color '#ffffff' --title-size '48' --subtitle-text '使用我们的工具轻松创建专业的分享图片' --subtitle-color '#ffffff' --subtitle-size '24' --logo-upload 'generated/fixtures/sample.png' --json
```

### generator/stamp-maker

印章生成器：印章生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/stamp-maker.html`，SHA-256：`58e7fd9d26e282a95cd39adefa9af474294fb667b5cd5249ccefe4bd59a9e547`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-stamp` | 📥 下载印章 | download |
| `circle` | 圆形章 | canvas |
| `oval` | 椭圆章 | canvas |
| `square` | 方形章 | canvas |
| `personal` | 私章 | mainText, centerText, canvas |
| `date` | 日期章 | centerText, canvas |
| `contract` | 合同章 | centerText, canvas |
| `render` | render | canvas |
| `run` | 按字段输入重新计算 | stampSizeValue, borderWidthValue, canvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--main-text` | ✏️ 公司/姓名 | text | "科技创新有限公司" |  |
| `--center-text` | ✏️ 中间文字 | text | "公章" |  |
| `--bottom-text` | ✏️ 底部文字 | text | "" |  |
| `--stamp-color` | stampColor | color | "#c0392b" |  |
| `--stamp-size` | stampSize | range | "280" | min=150, max=400 |
| `--border-width` | borderWidth | range | "5" | min=2, max=12 |

已检查示例：

```bash
html-tools generator/stamp-maker export-stamp --main-text '科技创新有限公司' --center-text '公章' --bottom-text 'Hello world
Hello world
TypeScript' --stamp-color '#c0392b' --stamp-size '280' --border-width '5' --json
```

### generator/svg-blob

SVG Blob形状生成器：SVG Blob形状生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/svg-blob.html`，SHA-256：`e8ae33cfaabc7d08f3b3d764d1d21a5b187f64aedeb7508a40077698c30bec03`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-blob` | generateBlob | blobContainer, svgCode |
| `run` | 按字段输入重新计算 | complexityValue, randomnessValue, sizeValue, fillColor, fillColorText, gradientStart, gradientStartText, gradientEnd, gradientEndText, gradientAngleValue, strokeColor, strokeColorText, strokeWidthValue, blobContainer, svgCode |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--complexity` | 复杂度 6 | range | "6" | min=3, max=12 |
| `--randomness` | 随机度 50 % | range | "50" | min=0, max=100 |
| `--size` | 大小 200 px | range | "200" | min=100, max=400 |
| `--fill-color` | fillColor | color | "#6366f1" |  |
| `--fill-color-text` | 请输入文本输入框 | text | "#6366f1" |  |
| `--gradient-start` | gradientStart | color | "#6366f1" |  |
| `--gradient-start-text` | 请输入文本输入框 | text | "#6366f1" |  |
| `--gradient-end` | gradientEnd | color | "#ec4899" |  |
| `--gradient-end-text` | 请输入文本输入框 | text | "#ec4899" |  |
| `--gradient-angle` | 渐变颜色 | range | "45" | min=0, max=360 |
| `--enable-stroke` / `--no-enable-stroke` | enableStroke | checkbox | false |  |
| `--stroke-color` | strokeColor | color | "#4f46e5" |  |
| `--stroke-color-text` | 请输入文本输入框 | text | "#4f46e5" |  |
| `--stroke-width` | 边框宽度 2 px | range | "2" | min=1, max=10 |

已检查示例：

```bash
html-tools generator/svg-blob generate-blob --complexity '6' --randomness '50' --size '200' --fill-color '#6366f1' --fill-color-text '#6366f1' --gradient-start '#6366f1' --gradient-start-text '#6366f1' --gradient-end '#ec4899' --gradient-end-text '#ec4899' --gradient-angle '45' --no-enable-stroke --stroke-color '#4f46e5' --stroke-color-text '#4f46e5' --stroke-width '2' --json
```

### generator/text-to-image

文字卡片生成器：文字卡片生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/text-to-image.html`，SHA-256：`7fc0e28ea573d75e1a25c6f92fb11c1a8f2c7b2ad4cf424997feb27cd4d189d9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-png` | 💾 下载 PNG | download |
| `export-jpg` | 💾 下载 JPG | download |
| `render` | render | canvas |
| `run` | 按字段输入重新计算 | bgColor, textColor, fontSizeValue, canvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-content` | 文字内容 | textarea | "Hello World" |  |
| `--bg-color` | bgColor | color | "#667eea" |  |
| `--bg-color-text` | 请输入文本输入框 | text | "#667eea" |  |
| `--text-color` | textColor | color | "#ffffff" |  |
| `--text-color-text` | 请输入文本输入框 | text | "#ffffff" |  |
| `--canvas-width` | 请输入数字输入框 | number | "800" | min=100, max=2000 |
| `--canvas-height` | 请输入数字输入框 | number | "600" | min=100, max=2000 |
| `--font-size` | 字体大小: 48 px | range | "48" | min=12, max=200 |
| `--font-family` | 字体 | select-one | "sans-serif" | "sans-serif" (无衬线); "serif" (衬线); "monospace" (等宽); "'Microsoft YaHei'" (微软雅黑); "'PingFang SC'" (苹方) |
| `--text-align` | 文字对齐 | select-one | "center" | "center" (居中); "left" (左对齐); "right" (右对齐) |
| `--enable-shadow` / `--no-enable-shadow` | 文字阴影 | checkbox | true |  |

已检查示例：

```bash
html-tools generator/text-to-image export-png --text-content 'Hello World' --bg-color '#667eea' --bg-color-text '#667eea' --text-color '#ffffff' --text-color-text '#ffffff' --canvas-width '800' --canvas-height '600' --font-size '48' --font-family 'sans-serif' --text-align 'center' --enable-shadow --json
```

### generator/uuid-generator

UUID/ULID 生成器：生成 UUID v4/v7 和 ULID，支持批量生成

来源：`html-tools/tools/generator/uuid-generator.html`，SHA-256：`2c757c1bffc0614130bd3444eb744f909fb04e64bf3554b0ebe472473d72e785`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 | count, singleId |
| `run` | 按字段输入重新计算 | count, singleId |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--id-type` | 类型 | select-one | "uuid4" | "uuid4" (UUID v4（随机）); "uuid7" (UUID v7（时间有序）); "ulid" (ULID（时间有序）) |
| `--format` | 格式 | select-one | "lower" | "lower" (小写); "upper" (大写); "nohyphen" (无连字符) |
| `--count` | 数量 | number | "1" | min=1, max=100 |

已检查示例：

```bash
html-tools generator/uuid-generator generate --id-type 'uuid4' --format 'lower' --count '1' --json
```

### generator/vcard-qr

二维码名片生成器：二维码名片生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/vcard-qr.html`，SHA-256：`815d47ea1caa2ae41cdc98629fb01b4f95d6bf74ebe0fab5fe4bb302879213f9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-qr` | 📥 下载二维码 | download |
| `export-card` | 📥 下载名片 | download |
| `generate-v-card` | generateVCard | value |
| `render` | render | qrCanvas, cardName, cardTitle, cardCompany, cardPhone, cardEmail, cardWebsite, cardAddress, cardQrCanvas |
| `run` | 按字段输入重新计算 | qrSizeValue, qrCanvas, cardName, cardTitle, cardCompany, cardPhone, cardEmail, cardWebsite, cardAddress, cardQrCanvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--first-name` | 名 | text | "三" |  |
| `--last-name` | 姓 | text | "张" |  |
| `--title` | 💼 职位 / 公司 | text | "高级软件工程师" |  |
| `--company` | 💼 职位 / 公司 | text | "科技创新有限公司" |  |
| `--phone` | 📱 电话 | tel | "+86 138 0000 0000" |  |
| `--work-phone` | 📱 电话 | tel | "" |  |
| `--email` | 📧 邮箱 | email | "zhangsan@example.com" |  |
| `--website` | 🌐 网站 | url | "https://example.com" |  |
| `--address` | 📍 地址 | text | "北京市朝阳区科技园区" |  |
| `--note` | 📝 备注 | textarea | "" |  |
| `--qr-fg-color` | qrFgColor | color | "#2c3e50" |  |
| `--qr-bg-color` | qrBgColor | color | "#ffffff" |  |
| `--qr-size` | qrSize | range | "250" | min=150, max=400 |
| `--card-color` | cardColor | color | "#2c3e50" |  |
| `--avatar-upload` | 📷 头像 | file | "" |  |

已检查示例：

```bash
html-tools generator/vcard-qr export-qr --first-name '三' --last-name '张' --title '高级软件工程师' --company '科技创新有限公司' --phone '+86 138 0000 0000' --work-phone 'Hello world
Hello world
TypeScript' --email 'zhangsan@example.com' --website 'https://example.com' --address '北京市朝阳区科技园区' --note 'Hello world
Hello world
TypeScript' --qr-fg-color '#2c3e50' --qr-bg-color '#ffffff' --qr-size '250' --card-color '#2c3e50' --avatar-upload 'generated/fixtures/sample.txt' --json
```

### generator/wave-bg

波浪背景生成器：波浪背景生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/wave-bg.html`，SHA-256：`6cbfa35f2f6dc6e9cfb90d031fd531aaa5958eb519c2b2881f108ee4290dface`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-btn` | 生成波浪 | wavePreview |
| `generate-wave` | generateWave | wavePreview |
| `run` | 按字段输入重新计算 | wavePreview, colorStart, colorStartText, colorEnd, colorEndText, bgColor, bgColorText, amplitudeValue, frequencyValue, layersValue, heightValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color-start` | colorStart | color | "#4f46e5" |  |
| `--color-start-text` | 请输入文本输入框 | text | "#4F46E5" |  |
| `--color-end` | colorEnd | color | "#7c3aed" |  |
| `--color-end-text` | 请输入文本输入框 | text | "#7C3AED" |  |
| `--bg-color` | bgColor | color | "#ffffff" |  |
| `--bg-color-text` | 请输入文本输入框 | text | "#ffffff" |  |
| `--amplitude` | 振幅: 50 | range | "50" | min=10, max=150 |
| `--frequency` | 频率: 2 | range | "2" | min=1, max=10 |
| `--layers` | 波浪层数: 3 | range | "3" | min=1, max=5 |
| `--wave-height` | 波浪高度: 200 | range | "200" | min=50, max=350 |
| `--wave-position` | 波浪位置 | select-one | "bottom" | "bottom" (底部); "top" (顶部) |

已检查示例：

```bash
html-tools generator/wave-bg generate-btn --color-start '#4f46e5' --color-start-text '#4F46E5' --color-end '#7c3aed' --color-end-text '#7C3AED' --bg-color '#ffffff' --bg-color-text '#ffffff' --amplitude '50' --frequency '2' --layers '3' --wave-height '200' --wave-position 'bottom' --json
```

### generator/wifi-qr

WiFi 二维码生成器：生成 WiFi 连接二维码，扫码即可连接网络

来源：`html-tools/tools/generator/wifi-qr.html`，SHA-256：`9a269832243a0d2ac6845a0a7c89c3f42d2674f447b215f7af3d44e0955b15da`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-qr-png` | PNG | download |
| `export-qr-svg` | SVG | download |
| `update-size-display` | updateSizeDisplay | sizeDisplay |
| `generate-qr` | generateQR | qrCanvas, displaySsid, displayEncryption |
| `run` | 按字段输入重新计算 | fgColor, fgColorText, bgColor, bgColorText, sizeDisplay, qrCanvas, displaySsid, displayEncryption |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--ssid` | 网络名称 (SSID) | text | "" |  |
| `--password` | 输入WiFi密码 | password | "" |  |
| `--encryption` | 加密方式 | select-one | "WPA" | "WPA" (WPA/WPA2/WPA3); "WEP" (WEP); "nopass" (无密码 (开放网络)) |
| `--hidden` / `--no-hidden` | 隐藏网络 (SSID不广播) | checkbox | false |  |
| `--fg-color` | fgColor | color | "#000000" |  |
| `--fg-color-text` | fgColorText | text | "#000000" |  |
| `--bg-color` | bgColor | color | "#ffffff" |  |
| `--bg-color-text` | bgColorText | text | "#FFFFFF" |  |
| `--qr-size` | qrSize | range | "250" | min=150, max=400 |

已检查示例：

```bash
html-tools generator/wifi-qr export-qr-png --ssid 'Hello world
Hello world
TypeScript' --password 'Hello world
Hello world
TypeScript' --encryption 'WPA' --no-hidden --fg-color '#000000' --fg-color-text '#000000' --bg-color '#ffffff' --bg-color-text '#FFFFFF' --qr-size '250' --json
```

### generator/utm-generator

UTM 链接生成器：快速生成带 UTM 参数的营销追踪链接

来源：`html-tools/tools/generator/utm-generator.html`，SHA-256：`3efa4ff325c9c60590243bdf395c771cb1f99d8257ce450ddf396ca07315c0c2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | outputUrl, paramsList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--website-url` | 网站 URL * | url | "" |  |
| `--utm-source` | utm_source * | text | "" |  |
| `--utm-medium` | utm_medium * | text | "" |  |
| `--utm-campaign` | utm_campaign * | text | "" |  |
| `--utm-term` | utm_term | text | "" |  |
| `--utm-content` | utm_content | text | "" |  |

已检查示例：

```bash
html-tools generator/utm-generator run --website-url 'https://example.com/path?a=1' --utm-source 'Hello world
Hello world
TypeScript' --utm-medium 'Hello world
Hello world
TypeScript' --utm-campaign 'Hello world
Hello world
TypeScript' --utm-term 'Hello world
Hello world
TypeScript' --utm-content 'Hello world
Hello world
TypeScript' --json
```

### generator/whatsapp-link

WhatsApp 链接生成器：生成 WhatsApp 聊天链接，可预设消息内容

来源：`html-tools/tools/generator/whatsapp-link.html`，SHA-256：`81c4b1fa205b5be7fa78cee3209d3be080de642ed30511c8ecedc59bc755ace5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | previewPhone, previewMessage |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--country-code` | countryCode | select-one | "86" | "86" (🇨🇳 +86); "1" (🇺🇸 +1); "44" (🇬🇧 +44); "81" (🇯🇵 +81); "82" (🇰🇷 +82); "852" (🇭🇰 +852); "853" (🇲🇴 +853); "886" (🇹🇼 +886); "65" (🇸🇬 +65); "60" (🇲🇾 +60); "66" (🇹🇭 +66); "84" (🇻🇳 +84); "91" (🇮🇳 +91); "61" (🇦🇺 +61); "49" (🇩🇪 +49); "33" (🇫🇷 +33); "39" (🇮🇹 +39); "34" (🇪🇸 +34); "7" (🇷🇺 +7); "55" (🇧🇷 +55) |
| `--phone-number` | 13800138000 | tel | "" |  |
| `--message` | 预设消息 (可选) | textarea | "" |  |

已检查示例：

```bash
html-tools generator/whatsapp-link run --country-code '86' --phone-number 'Hello world
Hello world
TypeScript' --message 'Hello world
Hello world
TypeScript' --json
```

### generator/youtube-timestamp

YouTube 时间戳链接：生成带时间戳的 YouTube 视频分享链接

来源：`html-tools/tools/generator/youtube-timestamp.html`，SHA-256：`06f355959de4a7e3aa885d6b9db3a2bd03942397f7128d9a65cf13699579c51b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | hours, minutes, seconds, timeDisplay, secondsDisplay |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--video-url` | YouTube 视频链接或 ID | text | "" |  |
| `--hours` | 时 | number | "0" | min=0, max=99 |
| `--minutes` | 分 | number | "0" | min=0, max=59 |
| `--seconds` | 秒 | number | "0" | min=0, max=59 |

已检查示例：

```bash
html-tools generator/youtube-timestamp run --video-url 'https://example.com/path?a=1' --hours '0' --minutes '0' --seconds '0' --json
```

### generator/color-extractor

调色板提取器：调色板提取器，一键提取，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/color-extractor.html`，SHA-256：`3a6dc600f2584a8c18f5d06e862bc8ab32ce56b023a4b0d67261da928312df81`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-palette-image` | 📥 下载色卡图 | download |
| `extract-colors` | extractColors | colorPalette |
| `run` | 按字段输入重新计算 | previewImage, colorCountValue, colorPalette |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--image-upload` | imageUpload | file | "" |  |
| `--color-count` | colorCount | range | "6" | min=3, max=12 |

已检查示例：

```bash
html-tools generator/color-extractor export-palette-image --image-upload 'generated/fixtures/sample.png' --color-count '6' --json
```

### generator/gradient-generator

渐变背景生成器：渐变背景生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/gradient-generator.html`，SHA-256：`3f3b07acd3c6298513a779f8aacfa453d65184bdfba9f0df80d7383bdb461c24`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-gradient` | updateGradient | codeOutput, angleValue |
| `run` | 按字段输入重新计算 | codeOutput, angleValue, colorStops |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--angle` | 角度 90° | range | "90" | min=0, max=360 |
| `--field-2` | 角度 90° | color | "#6366f1" |  |
| `--field-3` | 角度 90° | range | "0" | min=0, max=100 |
| `--field-4` | 角度 90° | color | "#a855f7" |  |
| `--field-5` | 角度 90° | range | "100" | min=0, max=100 |

已检查示例：

```bash
html-tools generator/gradient-generator update-gradient --angle '90' --field-2 '#6366f1' --field-3 '0' --field-4 '#a855f7' --field-5 '100' --json
```

### generator/pattern-generator

几何图案生成器：几何图案生成器，一键在线生成，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/pattern-generator.html`，SHA-256：`9d48ba78cee02e196c70b98161e4b878243dc2c13b2194b9b516c68632ee90af`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update` | update | cssOutput, sizeVal, opacityVal |
| `run` | 按字段输入重新计算 | cssOutput, sizeVal, opacityVal |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--size` | 图案大小 | range | "20" | min=5, max=100 |
| `--color1` | 颜色1 | color | "#00d9ff" |  |
| `--color2` | 颜色2 | color | "#16213e" |  |
| `--opacity` | 透明度 | range | "100" | min=0, max=100 |

已检查示例：

```bash
html-tools generator/pattern-generator update --size '20' --color1 '#00d9ff' --color2 '#16213e' --opacity '100' --json
```

### generator/license-generator

开源协议生成：生成开源协议文件

来源：`html-tools/tools/generator/license-generator.html`，SHA-256：`de79c0a1bcad7f636e286e6fcc703fd62d9c52d6590fb3d791d042fd6c027dff`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | generate | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--license` | 选择协议 | select-one | "mit" | "mit" (MIT License); "apache" (Apache License 2.0); "gpl3" (GPL v3); "bsd3" (BSD 3-Clause); "isc" (ISC License) |
| `--year` | 年份 | text | "2026" |  |
| `--author` | 作者/组织 | text | "" |  |

已检查示例：

```bash
html-tools generator/license-generator generate --license 'mit' --year '2026' --author 'Hello world
Hello world
TypeScript' --json
```

### generator/gitignore-generator

Gitignore生成：生成.gitignore文件

来源：`html-tools/tools/generator/gitignore-generator.html`，SHA-256：`66904e3ed537c67799069590f801b7e3393d1a69d85d7c7ed8e7cdf197def23b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | templates, output |
| `generate` | generate | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools generator/gitignore-generator render  --json
```

### generator/barcode-generator

Barcode Generator：Barcode Generator，在线使用，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/barcode-generator.html`，SHA-256：`692742652fe5fdf05c409e14e8cdf03fd5aec9e862033bd0c1a9e70704b475af`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | generate | barcode |
| `run` | 按字段输入重新计算 | barcode |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text` | 输入内容 | text | "1234567890" |  |
| `--format` | 格式 | select-one | "CODE128" | "CODE128" (CODE128); "CODE39" (CODE39); "EAN13" (EAN-13); "EAN8" (EAN-8); "UPC" (UPC); "ITF14" (ITF-14) |
| `--width` | 宽度 | select-one | "2" | "1" (细); "2" (标准); "3" (粗) |
| `--height` | 高度 | number | "100" | min=30, max=200 |
| `--display-value` | 显示文字 | select-one | "true" | "true" (显示); "false" (隐藏) |

已检查示例：

```bash
html-tools generator/barcode-generator generate --text '1234567890' --format 'CODE128' --width '2' --height '100' --display-value 'true' --json
```

### generator/credit-card-generator

Credit Card Generator：Credit Card Generator，在线使用，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/credit-card-generator.html`，SHA-256：`5f627d9446dba7fcf74c1edf823baececaae5b26f4ef04fe23bb2af138da11b6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 | previewType, previewNumber, previewExpiry, previewCvv, resultList |
| `generate-expiry` | generateExpiry | value |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--card-type` | cardType | select-one | "visa" | "visa" (Visa); "mastercard" (MasterCard); "amex" (American Express); "discover" (Discover); "jcb" (JCB); "unionpay" (UnionPay 银联) |
| `--count` | 请输入数字输入框 | number | "5" | min=1, max=20 |

已检查示例：

```bash
html-tools generator/credit-card-generator generate --card-type 'visa' --count '5' --json
```

### generator/fake-data-generator

Fake Data Generator：Fake Data Generator，在线使用，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/fake-data-generator.html`，SHA-256：`098bc30d78ce9f787fe018de35e6f4d9386547a3e06a5b37677b4897a9a6df77`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 | output |
| `generate-phone` | generatePhone | value |
| `generate-birthday` | generateBirthday | value |
| `generate-id-card` | generateIdCard | value |
| `generate-username` | generateUsername | value |
| `generate-ip` | generateIP | value |
| `update-output` | updateOutput | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--count` | 数量: | number | "10" | min=1, max=100 |
| `--locale` | 数量: | select-one | "zh" | "zh" (中文); "en" (英文) |

已检查示例：

```bash
html-tools generator/fake-data-generator generate --count '10' --locale 'zh' --json
```

### generator/favicon-generator

Favicon Generator：Favicon Generator，在线使用，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/favicon-generator.html`，SHA-256：`ea25bda0dd5144c64abf9828bd191c745510395e8ff95d7a6d2de32e754f7ac6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export` | 下载 Favicon (ICO) | download |
| `generate` | generate | canvas16, canvas32, canvas64, canvas128 |
| `run` | 按字段输入重新计算 | canvas16, canvas32, canvas64, canvas128 |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text` | 文字/Emoji | text | "A" |  |
| `--font-size` | 字体大小 | range | "70" | min=20, max=100 |
| `--bg-color` | 背景颜色 | color | "#667eea" |  |
| `--text-color` | 文字颜色 | color | "#ffffff" |  |
| `--radius` | 圆角 | range | "20" | min=0, max=50 |

已检查示例：

```bash
html-tools generator/favicon-generator export --text 'A' --font-size '70' --bg-color '#667eea' --text-color '#ffffff' --radius '20' --json
```

### generator/htaccess-generator

.htaccess Generator：.htaccess Generator，在线使用，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/htaccess-generator.html`，SHA-256：`09447ceed03845831071202810b12d29bc3f3e073a6f5de92552bc131013d444`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | generate | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--www-type` | wwwType | select-one | "add" | "add" (添加www); "remove" (移除www) |
| `--cache-time` | 缓存时间 | select-one | "1 month" | "1 week" (1周); "1 month" (1个月); "1 year" (1年) |
| `--hotlink-domain` | 允许的域名 (每行一个) | text | "" |  |
| `--error404` | 404错误页 | text | "" |  |
| `--error500` | 500错误页 | text | "" |  |

已检查示例：

```bash
html-tools generator/htaccess-generator generate --www-type 'add' --cache-time '1 month' --hotlink-domain 'https://example.com/path?a=1' --error404 'Hello world
Hello world
TypeScript' --error500 'Hello world
Hello world
TypeScript' --json
```

### generator/iban-generator

Iban Generator：Iban Generator，在线使用，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/iban-generator.html`，SHA-256：`de22bc2d218bcf47b06ae26337ab6f35ddfd1989dd47a5f100a6d9bfa7c16452`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 IBAN | count, ibanResult, ibanFormatted, details, historyList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--country` | 国家/地区 | select-one | "DE" | "DE" (德国 (DE)); "FR" (法国 (FR)); "GB" (英国 (GB)); "ES" (西班牙 (ES)); "IT" (意大利 (IT)); "NL" (荷兰 (NL)); "BE" (比利时 (BE)); "CH" (瑞士 (CH)); "AT" (奥地利 (AT)); "PL" (波兰 (PL)) |
| `--count` | 生成数量 | number | "1" | min=1, max=10 |

已检查示例：

```bash
html-tools generator/iban-generator generate --country 'DE' --count '1' --json
```

操作限制：部分原页面操作未通过迁移检查: update-format: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### generator/lorem-ipsum

Lorem Ipsum 文本生成：Lorem Ipsum 文本生成，在线使用，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/lorem-ipsum.html`，SHA-256：`eeec0d85cbaf2648b29af24c7e2e3cfd640274153cc2317727c43f9bf70530c8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 | output, statParagraphs, statSentences, statWords, statChars |
| `run` | 按字段输入重新计算 | output, statParagraphs, statSentences, statWords, statChars |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--unit` | 生成类型 | select-one | "paragraphs" | "paragraphs" (段落); "sentences" (句子); "words" (单词) |
| `--count` | 数量 | number | "3" | min=1, max=100 |
| `--start-lorem` / `--no-start-lorem` | 以 "Lorem ipsum" 开头 | checkbox | true |  |
| `--add-p-tags` / `--no-add-p-tags` | 添加 <p> 标签 | checkbox | false |  |

已检查示例：

```bash
html-tools generator/lorem-ipsum generate --unit 'paragraphs' --count '3' --start-lorem --no-add-p-tags --json
```

### generator/markdown-table

Markdown Table：Markdown Table，在线使用，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/markdown-table.html`，SHA-256：`51a49133bd5a92b01e17e522e860dec1896049940a211f9937dd812b661428d2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-markdown` | generateMarkdown | output, preview |
| `run` | 按字段输入重新计算 | editTable, output, preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--cols` | 列数: | number | "3" | min=1, max=20 |
| `--rows` | 行数: | number | "3" | min=1, max=50 |
| `--field-3` | 请输入文本输入框 | text | "列 1" |  |
| `--field-4` | 请输入文本输入框 | text | "列 2" |  |
| `--field-5` | 请输入文本输入框 | text | "列 3" |  |
| `--field-6` | field-6 | select-one | "left" | "left" (左对齐); "center" (居中); "right" (右对齐) |
| `--field-7` | field-7 | select-one | "left" | "left" (左对齐); "center" (居中); "right" (右对齐) |
| `--field-8` | field-8 | select-one | "left" | "left" (左对齐); "center" (居中); "right" (右对齐) |
| `--field-9` | 请输入文本输入框 | text | "数据 1" |  |
| `--field-10` | 请输入文本输入框 | text | "数据 2" |  |
| `--field-11` | 请输入文本输入框 | text | "数据 3" |  |
| `--field-12` | 请输入文本输入框 | text | "数据 4" |  |
| `--field-13` | 请输入文本输入框 | text | "数据 5" |  |
| `--field-14` | 请输入文本输入框 | text | "数据 6" |  |
| `--field-15` | 请输入文本输入框 | text | "数据 7" |  |
| `--field-16` | 请输入文本输入框 | text | "数据 8" |  |
| `--field-17` | 请输入文本输入框 | text | "数据 9" |  |

已检查示例：

```bash
html-tools generator/markdown-table generate-markdown --cols '3' --rows '3' --field-3 '列 1' --field-4 '列 2' --field-5 '列 3' --field-6 'left' --field-7 'left' --field-8 'left' --field-9 '数据 1' --field-10 '数据 2' --field-11 '数据 3' --field-12 '数据 4' --field-13 '数据 5' --field-14 '数据 6' --field-15 '数据 7' --field-16 '数据 8' --field-17 '数据 9' --json
```

### generator/meta-tag-generator

Meta Tag Generator：Meta Tag Generator，在线使用，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/meta-tag-generator.html`，SHA-256：`45b697fc7b6c6eb6ccea832b30838fff89ae4c36886494cd52ee378c54253a6a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | generate | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--title` | 页面标题 | text | "我的网站 - 最佳在线工具" |  |
| `--description` | 页面描述 (建议150-160字符) | textarea | "这是一个提供各种在线工具的网站，包括开发工具、文本处理、图片处理等功能。" |  |
| `--keywords` | 关键词 (用逗号分隔) | text | "在线工具, 开发工具, 免费工具" |  |
| `--author` | 作者 | text | "" |  |
| `--url` | 网站URL | url | "" |  |
| `--og-type` | OG类型 | select-one | "website" | "website" (网站); "article" (文章); "product" (产品) |
| `--og-image` | 分享图片URL | url | "" |  |
| `--twitter-card` | 卡片类型 | select-one | "summary" | "summary" (摘要); "summary_large_image" (大图摘要) |
| `--twitter-site` | Twitter账号 | text | "" |  |

已检查示例：

```bash
html-tools generator/meta-tag-generator generate --title '我的网站 - 最佳在线工具' --description '这是一个提供各种在线工具的网站，包括开发工具、文本处理、图片处理等功能。' --keywords '在线工具, 开发工具, 免费工具' --author 'Hello world
Hello world
TypeScript' --url 'https://example.com/path?a=1' --og-type 'website' --og-image 'Hello world
Hello world
TypeScript' --twitter-card 'summary' --twitter-site 'Hello world
Hello world
TypeScript' --json
```

### generator/random-name-generator

Random Name Generator：Random Name Generator，在线使用，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/random-name-generator.html`，SHA-256：`987e6f9205e4bb79f47d13d0f739aa829183baed5cb87cf568e4a942d54cdf12`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 | nameList, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--type` | 类型: | select-one | "chinese" | "chinese" (中文姓名); "english" (英文姓名); "both" (中英文混合) |
| `--gender` | 类型: | select-one | "random" | "random" (随机); "male" (男性); "female" (女性) |
| `--count` | 类型: | number | "10" | min=1, max=100 |

已检查示例：

```bash
html-tools generator/random-name-generator generate --type 'chinese' --gender 'random' --count '10' --json
```

### generator/robots-generator

Robots Generator：Robots Generator，在线使用，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/robots-generator.html`，SHA-256：`08880be240ad05b06546042687e33c6bf4067469cc614aee9884c57a03c5c14e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | generate | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--sitemap` | Sitemap URL | url | "" |  |
| `--crawl-delay` | 爬虫延迟 (秒，可选) | number | "" | min=0 |
| `--preset` | Sitemap URL | radio | "allow" | "allow" (允许所有); "disallow" (禁止所有); "custom" (自定义规则) |
| `--user-agent` | User-Agent | select-one | "*" | "*" (所有爬虫 (*)); "Googlebot" (Googlebot); "Bingbot" (Bingbot); "Baiduspider" (百度蜘蛛); "Sogou" (搜狗蜘蛛) |
| `--field-5` | Sitemap URL | select-one | "Allow" | "Allow" (Allow); "Disallow" (Disallow) |
| `--field-6` | Sitemap URL | text | "" |  |

已检查示例：

```bash
html-tools generator/robots-generator generate --sitemap 'Hello world
Hello world
TypeScript' --crawl-delay '10' --preset 'allow' --user-agent '*' --field-5 'Allow' --field-6 'Hello world
Hello world
TypeScript' --json
```

### generator/robots-txt-generator

Robots Txt Generator：Robots Txt Generator，在线使用，生成器，浏览器本地运行无需上传

来源：`html-tools/tools/generator/robots-txt-generator.html`，SHA-256：`eee4d9346c242793fb7af950aed4e582ff87b205705393a311e3e26294f79d7c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | generate | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--user-agent` | User-Agent | select-one | "*" | "*" (* (所有爬虫)); "Googlebot" (Googlebot); "Bingbot" (Bingbot); "Baiduspider" (Baiduspider); "Yandex" (Yandex) |
| `--field-2` | User-Agent | select-one | "Disallow" | "Disallow" (Disallow); "Allow" (Allow) |
| `--field-3` | User-Agent | text | "/admin/" |  |
| `--field-4` | User-Agent | select-one | "Disallow" | "Disallow" (Disallow); "Allow" (Allow) |
| `--field-5` | User-Agent | text | "/private/" |  |
| `--sitemap` | Sitemap URL (可选) | text | "https://example.com/sitemap.xml" |  |
| `--crawl-delay` | Crawl-delay (秒, 可选) | number | "" | min=0 |
| `--add-comments` / `--no-add-comments` | 添加注释说明 | checkbox | true |  |

已检查示例：

```bash
html-tools generator/robots-txt-generator generate --user-agent '*' --field-2 'Disallow' --field-3 '/admin/' --field-4 'Disallow' --field-5 '/private/' --sitemap 'https://example.com/sitemap.xml' --crawl-delay '10' --add-comments --json
```

## health

### health/menstrual-cycle

月经周期追踪器：追踪月经周期，预测排卵期

来源：`html-tools/tools/health/menstrual-cycle.html`，SHA-256：`d115378cc8ff49268fa7c6fd9669035d207d8e6d0aaf661bd7e377b091ee0254`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | currentMonth, calendarDays, nextPeriod, countdown, avgCycle, avgLength, history |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--period-date` | 月经开始日期 | date | "2026-10-30" |  |
| `--period-length` | 经期天数 | number | "5" | min=2, max=10 |

已检查示例：

```bash
html-tools health/menstrual-cycle render --period-date '2026-10-30' --period-length '5' --json
```

### health/body-fat

体脂率计算器：多种方法计算体脂率

来源：`html-tools/tools/health/body-fat.html`，SHA-256：`86c7e43058134b3db3bd3b65f152c096f04735341598c6c64be4802730b6a03f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | bodyFat, category, rangeChart, rangeLabels, fatMass, leanMass, bmi, idealFat, targetWeight, tips |
| `run` | 按字段输入重新计算 | bodyFat, category, rangeChart, rangeLabels, fatMass, leanMass, bmi, idealFat, targetWeight, tips |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--age` | 年龄 (岁) | number | "25" | min=10, max=100 |
| `--height` | 身高 (cm) | number | "170" | min=100, max=250 |
| `--weight` | 体重 (kg) | number | "70" | min=30, max=200 |
| `--waist` | 腰围 (cm) - 肚脐位置 | number | "80" | min=50, max=150 |
| `--neck` | 颈围 (cm) | number | "38" | min=20, max=60 |
| `--hip` | 臀围 (cm) - 仅女性 | number | "95" | min=60, max=150 |
| `--tricep` | 三头肌皮褶 (mm) | number | "15" | min=1, max=50 |
| `--subscapular` | 肩胛下皮褶 (mm) | number | "12" | min=1, max=50 |
| `--suprailiac` | 髂骨上皮褶 (mm) | number | "18" | min=1, max=50 |

已检查示例：

```bash
html-tools health/body-fat calculate --age '25' --height '170' --weight '70' --waist '80' --neck '38' --hip '95' --tricep '15' --subscapular '12' --suprailiac '18' --json
```

### health/water-intake

每日饮水量计算器：计算每日推荐饮水量

来源：`html-tools/tools/health/water-intake.html`，SHA-256：`2e2855de0fce4d82198f38926f7e97628916847a2a4a81ad8c4dbb9e18491c53`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-tracker` | updateTracker | trackerText |
| `calculate` | calculate | trackerText, totalWater, glassCount, baseWater, activityWater, climateWater, specialWater, schedule |
| `run` | 按字段输入重新计算 | trackerText, totalWater, glassCount, baseWater, activityWater, climateWater, specialWater, schedule |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--weight` | 体重 (kg) | number | "65" | min=30, max=200 |
| `--activity` | 运动量 | select-one | "1.4" | "1" (久坐（几乎不运动）); "1.2" (轻度（每周1-2次轻运动）); "1.4" (中度（每周3-5次运动）); "1.6" (高强度（每天运动）); "1.8" (专业运动员) |
| `--climate` | 气候环境 | select-one | "1" | "1" (温和); "1.1" (炎热); "1.2" (非常炎热/干燥) |
| `--special` | 特殊情况 | select-one | "0" | "0" (无); "500" (孕期（+500ml）); "700" (哺乳期（+700ml）); "300" (发烧/生病（+300ml）) |

已检查示例：

```bash
html-tools health/water-intake update-tracker --weight '65' --activity '1.4' --climate '1' --special '0' --json
```

### health/calorie-calculator

卡路里需求计算器：计算每日热量需求和宏量营养素

来源：`html-tools/tools/health/calorie-calculator.html`，SHA-256：`285e915ddfc1d478c7ac085bbbd7b7b496af5cbd53e8927eafeaba88b3a0349c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | tdee, bmrNote, loseCalories, maintainCalories, gainCalories, macroChart, macroLegend, targetCalories, proteinGrams, carbGrams, fatGrams, mealPlan |
| `update-macros` | updateMacros | macroChart, macroLegend, targetCalories, proteinGrams, carbGrams, fatGrams, mealPlan |
| `run` | 按字段输入重新计算 | tdee, bmrNote, loseCalories, maintainCalories, gainCalories, macroChart, macroLegend, targetCalories, proteinGrams, carbGrams, fatGrams, mealPlan |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--age` | 年龄 (岁) | number | "25" | min=10, max=100 |
| `--height` | 身高 (cm) | number | "170" | min=100, max=250 |
| `--weight` | 体重 (kg) | number | "65" | min=30, max=200 |
| `--activity` | 活动水平 | select-one | "1.55" | "1.2" (久坐（几乎不运动）); "1.375" (轻度活动（每周1-3天）); "1.55" (中度活动（每周3-5天）); "1.725" (高度活动（每周6-7天）); "1.9" (专业运动员) |
| `--body-fat` | 体脂率 (%, 可选 - 更精确计算) | number | "" | min=3, max=50 |

已检查示例：

```bash
html-tools health/calorie-calculator calculate --age '25' --height '170' --weight '65' --activity '1.55' --body-fat '10' --json
```

### health/heart-rate-zone

心率区间计算器：计算运动心率区间

来源：`html-tools/tools/health/heart-rate-zone.html`，SHA-256：`3411cf95e8df6bd6e13b9b55320338f076e0e43424f139199572179246ae5414`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | currentZone, maxHR, restHR, hrReserve, maxHRBig, fatBurnRange, cardioRange, zones, tips |
| `check-current-zone` | checkCurrentZone | currentZone |
| `run` | 按字段输入重新计算 | currentZone, maxHR, restHR, hrReserve, maxHRBig, fatBurnRange, cardioRange, zones, tips |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--age` | 年龄 (岁) | number | "25" | min=10, max=100 |
| `--resting-hr` | 静息心率 (次/分钟, 可选) | number | "" | min=40, max=100 |
| `--method` | 计算方法 | select-one | "standard" | "standard" (标准公式 (220-年龄)); "tanaka" (Tanaka公式 (208-0.7×年龄)); "karvonen" (Karvonen公式 (需静息心率)) |
| `--current-hr` | 输入当前心率 | number | "" | min=40, max=220 |

已检查示例：

```bash
html-tools health/heart-rate-zone calculate --age '25' --resting-hr '40' --method 'standard' --current-hr '40' --json
```

### health/blood-pressure

血压分析工具：血压分类评估和健康建议

来源：`html-tools/tools/health/blood-pressure.html`，SHA-256：`6ff3b6265e83625d1bbb091affec50e48d2b9ae404a44435172bad09446c969d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | analyze | categoryName, categoryDesc, tips |
| `run` | 按字段输入重新计算 | categoryName, categoryDesc, tips |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--systolic` | systolic | number | "120" | min=60, max=250 |
| `--diastolic` | diastolic | number | "80" | min=40, max=150 |
| `--pulse` | 心率 (次/分钟, 可选) | number | "" | min=40, max=200 |

已检查示例：

```bash
html-tools health/blood-pressure analyze --systolic '120' --diastolic '80' --pulse '40' --json
```

### health/sleep-calculator

睡眠时间计算器：基于睡眠周期计算最佳时间

来源：`html-tools/tools/health/sleep-calculator.html`，SHA-256：`89290d426d7a51bfd1e7e4bc22f415a7eb7d7369477ee55d206a45df8742bd6e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | resultLabel, resultTime, resultNote, timesTitle, suggestedTimes, cycleLengthDisplay |
| `run` | 按字段输入重新计算 | resultLabel, resultTime, resultNote, timesTitle, suggestedTimes, cycleLengthDisplay |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--hour` | 请输入数字输入框 | number | "7" | min=0, max=23 |
| `--minute` | 请输入数字输入框 | number | "0" | min=0, max=59 |
| `--fall-asleep-time` | 入睡所需时间（分钟） | number | "14" | min=1, max=60 |
| `--cycle-length` | 睡眠周期长度（分钟） | number | "90" | min=60, max=120 |

已检查示例：

```bash
html-tools health/sleep-calculator calculate --hour '7' --minute '0' --fall-asleep-time '14' --cycle-length '90' --json
```

### health/ideal-weight

理想体重计算器：多公式计算理想体重

来源：`html-tools/tools/health/ideal-weight.html`，SHA-256：`e44de98ca2f383387640da35421bfa7f1f0b514731a55b96172d613b62a69051`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | idealWeight, weightRange, weightRangeBar, weightLabels, currentBMI, weightDiff, healthyRange, formulas, comparison, tips |
| `run` | 按字段输入重新计算 | idealWeight, weightRange, weightRangeBar, weightLabels, currentBMI, weightDiff, healthyRange, formulas, comparison, tips |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--height` | 身高 (cm) | number | "170" | min=100, max=250 |
| `--current-weight` | 当前体重 (kg) | number | "70" | min=30, max=200 |
| `--age` | 年龄 (岁) | number | "25" | min=10, max=100 |
| `--frame` | 体型骨架 | select-one | "medium" | "small" (小骨架); "medium" (中等骨架); "large" (大骨架) |

已检查示例：

```bash
html-tools health/ideal-weight calculate --height '170' --current-weight '70' --age '25' --frame 'medium' --json
```

### health/alcohol-metabolism

酒精代谢计算器：估算酒精代谢时间

来源：`html-tools/tools/health/alcohol-metabolism.html`，SHA-256：`3114f356edda4c44076c1e8d011d1213199ba6a02e28f53e5e777cc21247596c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | bac, totalAlcohol, standardDrinks, peakBAC, soberTime, driveTime, timeline |
| `run` | 按字段输入重新计算 | bac, totalAlcohol, standardDrinks, peakBAC, soberTime, driveTime, timeline |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--weight` | 体重 (kg) | number | "70" | min=30, max=200 |
| `--start-time` | 开始饮酒时间 | time | "20:00" |  |
| `--field-3` | 性别 | select-one | "beer" | "beer" (啤酒 (5%)); "wine" (红酒 (12%)); "baijiu" (白酒 (52%)); "whisky" (威士忌 (40%)); "cocktail" (鸡尾酒 (15%)); "sake" (清酒 (15%)) |
| `--field-4` | 性别 | number | "330" | min=0 |

已检查示例：

```bash
html-tools health/alcohol-metabolism calculate --weight '70' --start-time '20:00' --field-3 'beer' --field-4 '330' --json
```

### health/bac-calculator

血液酒精浓度计算器：计算血液酒精浓度

来源：`html-tools/tools/health/bac-calculator.html`，SHA-256：`a47ca1127b459b926a5640999bfc00c693efd900faa272dd4e1decb11e2ceccd`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-drink-info` | updateDrinkInfo | amount, bacValue, alcoholGrams, standardDrinks, peakBac, currentBac, soberTime, driveTime, effects |
| `calculate` | calculate | bacValue, alcoholGrams, standardDrinks, peakBac, currentBac, soberTime, driveTime, effects |
| `run` | 按字段输入重新计算 | amount, bacValue, alcoholGrams, standardDrinks, peakBac, currentBac, soberTime, driveTime, effects |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--weight` | 体重 (kg) | number | "70" | min=30, max=200 |
| `--hours` | 饮酒时间（已过小时） | number | "0" | min=0, max=24 |
| `--drink-type` | 酒精饮品类型 | select-one | "beer" | "beer" (啤酒 (5%)); "wine" (红酒 (12%)); "baijiu" (白酒 (52%)); "whisky" (威士忌 (40%)); "cocktail" (鸡尾酒 (15%)); "custom" (自定义) |
| `--amount` | 饮用量 (ml) | number | "330" | min=0, max=5000 |
| `--custom-abv` | 酒精度 (%) | number | "5" | min=0, max=100 |

已检查示例：

```bash
html-tools health/bac-calculator update-drink-info --weight '70' --hours '0' --drink-type 'beer' --amount '330' --custom-abv '5' --json
```

### sports/running-pace

跑步配速计算：计算跑步配速和完赛时间

来源：`html-tools/tools/sports/running-pace.html`，SHA-256：`20382f18d7d84181da5fc93fd51c8d9815184b022900b3c8ec4ed21c9555fe8c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate-pace` | 计算配速 | paceValue |
| `calculate-zones` | 计算训练区间 | paceZones |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--pace-distance` | 距离 | select-one | "10" | "1" (1 公里); "5" (5 公里); "10" (10 公里); "21.0975" (半程马拉松 (21.1km)); "42.195" (全程马拉松 (42.2km)); "custom" (自定义) |
| `--custom-distance` | 自定义距离 (公里) | number | "" |  |
| `--pace-hours` | 时 | number | "0" | min=0, max=23 |
| `--pace-minutes` | 分 | number | "50" | min=0, max=59 |
| `--pace-seconds` | 秒 | number | "0" | min=0, max=59 |
| `--known-distance` | 已知距离 | select-one | "10" | "5" (5 公里); "10" (10 公里); "21.0975" (半程马拉松); "42.195" (全程马拉松) |
| `--known-hours` | 时 | number | "0" | min=0, max=23 |
| `--known-minutes` | 分 | number | "50" | min=0, max=59 |
| `--known-seconds` | 秒 | number | "0" | min=0, max=59 |
| `--zone-minutes` | 分 | number | "5" | min=0, max=15 |
| `--zone-seconds` | 秒 | number | "0" | min=0, max=59 |

已检查示例：

```bash
html-tools sports/running-pace calculate-pace --pace-distance '10' --custom-distance '10' --pace-hours '0' --pace-minutes '50' --pace-seconds '0' --known-distance '10' --known-hours '0' --known-minutes '50' --known-seconds '0' --zone-minutes '5' --zone-seconds '0' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### sports/calories-burned

运动卡路里计算：计算各类运动消耗的卡路里

来源：`html-tools/tools/sports/calories-burned.html`，SHA-256：`8f218c3e19a70e1672ee995bcc24c7c3dc339796100e291dc513f8231ae3e175`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | caloriesValue, resultLabel, equivalentsGrid |
| `run` | 按字段输入重新计算 | caloriesValue, resultLabel, equivalentsGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--weight` | 体重 (kg) | number | "65" | min=30, max=200 |
| `--duration` | 运动时长 (分钟) | number | "30" | min=1, max=480 |

已检查示例：

```bash
html-tools sports/calories-burned calculate --weight '65' --duration '30' --json
```

### health/symptom-checker

症状自查：根据症状初步判断可能疾病

来源：`html-tools/tools/health/symptom-checker.html`，SHA-256：`262521b67fa025ba979c2fd81540796d0255297db8b32a2b3f9dadb917add7a8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | 分析症状 | resultContent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools health/symptom-checker analyze  --json
```

### health/water-tracker

喝水提醒：记录每日饮水量

来源：`html-tools/tools/health/water-tracker.html`，SHA-256：`7c2b289907b9aa9b12fe1626940fdf02d7fca650a4ce884c9293f0cd41f02ec5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | currentAmount, targetAmount, progressPercent, historyList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--custom-amount` | 输入毫升数 | number | "" | min=1, max=2000 |

已检查示例：

```bash
html-tools health/water-tracker render --custom-amount '10' --json
```

### health/calorie-burn-calculator

运动消耗卡路里计算器：计算不同运动消耗的卡路里，帮助制定健身计划

来源：`html-tools/tools/health/calorie-burn-calculator.html`，SHA-256：`a8617300db8be1eb79068f8d80d2ded26c732359b49163d9ad6006867aa8ffb4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | caloriesBurned, riceEquiv, appleEquiv, chocolateEquiv, colaEquiv |
| `run` | 按字段输入重新计算 | caloriesBurned, riceEquiv, appleEquiv, chocolateEquiv, colaEquiv |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--weight` | 体重 (kg) | number | "70" | min=30, max=200 |
| `--duration` | 运动时长 (分钟) | number | "30" | min=1, max=300 |

已检查示例：

```bash
html-tools health/calorie-burn-calculator calculate --weight '70' --duration '30' --json
```

### health/caffeine-half-life-calculator

咖啡因代谢计算器：输入咖啡摄入时间和剂量，基于 5.7 小时半衰期计算体内咖啡因随时间的衰减曲线，估算最佳停止摄入时间。

来源：`html-tools/tools/health/caffeine-half-life-calculator.html`，SHA-256：`96277d6e9aab0fd6237e6b0c15d05e0b7b4ecab05de5a270260ab9039f09fb84`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-results` | updateResults | statCount, statPeak |
| `run` | 按字段输入重新计算 | statCount, statPeak |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--sleep-time` | 预计入睡时间： | time | "23:00" |  |
| `--target-mg` | 睡前目标残余（mg）： | number | "50" | min=10, max=200 |
| `--base-time` | 今日基准时间： | time | "06:00" |  |
| `--drink-type` | 饮品类型 | select-one | "drip" | "espresso" (浓缩咖啡 Espresso（~63 mg）); "drip" (手冲/滴滤咖啡（~95 mg）); "latte" (拿铁 Latte（~63 mg）); "americano" (美式咖啡（~95 mg）); "cold_brew" (冷萃咖啡（~200 mg）); "green_tea" (绿茶（~28 mg）); "black_tea" (红茶（~47 mg）); "energy" (能量饮料（~80 mg/罐）); "cola" (可乐（~34 mg/罐）); "custom" (自定义) |
| `--intake-time` | 摄入时间 | time | "11:38" |  |
| `--custom-dose` | 咖啡因剂量（mg） | number | "100" | min=1, max=1000 |

已检查示例：

```bash
html-tools health/caffeine-half-life-calculator update-results --sleep-time '23:00' --target-mg '50' --base-time '06:00' --drink-type 'drip' --intake-time '11:38' --custom-dose '100' --json
```

### health/tdee-calorie-deficit-calculator

TDEE / 热量缺口计算器：根据年龄、体重、身高和活动量计算每日总能量消耗（TDEE），并给出增重/减脂所需热量缺口建议。

来源：`html-tools/tools/health/tdee-calorie-deficit-calculator.html`，SHA-256：`9b5c40d4f55f7a3678b7e5075a409374b214171cc0784166f88bc6cabcf18eb8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 TDEE | bmrValue, activityFactor, formulaUsed, tdeeValue, deficitGrid, surplusGrid, weeklyMaintain, weeklyDeficit |
| `update-unit-labels` | updateUnitLabels | weightLabel, heightLabel |
| `run` | 按字段输入重新计算 | weightLabel, heightLabel |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--gender` | 男 | radio | "male" | "male" (male); "female" (female) |
| `--age` | 25 | number | "" | min=10, max=120 |
| `--unit` | 公制 (kg/cm) | radio | "metric" | "metric" (metric); "imperial" (imperial) |
| `--weight` | 体重 (kg) | number | "" | min=1 |
| `--height` | 身高 (cm) | number | "" | min=1 |
| `--activity` | 活动水平 | select-one | "1.55" | "1.2" (久坐不动（几乎不运动）); "1.375" (轻度活动（每周运动 1-3 天）); "1.55" (中度活动（每周运动 3-5 天）); "1.725" (高度活动（每周运动 6-7 天）); "1.9" (极度活跃（体力劳动或每天双次训练）) |
| `--formula` | 计算公式 | select-one | "mifflin" | "mifflin" (Mifflin-St Jeor（推荐）); "harris" (Harris-Benedict（修正版）); "katch" (Katch-McArdle（需要体脂率）) |
| `--body-fat` | 体脂率 (%) | number | "" | min=3, max=60 |

已检查示例：

```bash
html-tools health/tdee-calorie-deficit-calculator calculate --gender 'male' --age '10' --unit 'metric' --weight '10' --height '10' --activity '1.55' --formula 'mifflin' --body-fat '10' --json
```

### health/one-rep-max-calculator

最大重复次数 / 1RM 计算器：输入已完成的重量和次数，用 Epley / Brzycki / Lombardi 等公式估算训练最大力量（1RM）。

来源：`html-tools/tools/health/one-rep-max-calculator.html`，SHA-256：`d45d3659f1681a1141a7118507de0db136bc94c90a0aec543b416dee9565aebd`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | 计算 1RM | rm1Display, rm1Unit, formulaGrid, pctBody, statEpley, statBrzycki, statAvg |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--weight-input` | 举起的重量 | number | "" | min=1, max=9999 |
| `--unit-select` | unitSelect | select-one | "kg" | "kg" (kg); "lb" (lb) |
| `--reps-input` | 完成的次数（Reps） | number | "" | min=1, max=30 |

已检查示例：

```bash
html-tools health/one-rep-max-calculator calc --weight-input '10' --unit-select 'kg' --reps-input '10' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### health/blood-pressure-log

血压记录日志：按日期记录收缩压/舒张压/心率，绘制折线趋势图，标记高血压区间，支持导出 CSV。

来源：`html-tools/tools/health/blood-pressure-log.html`，SHA-256：`4a39500f67aa9f84c5c85ec9d14563752b7c1d3c03593f7d86b19511efc4c363`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | bpTableBody |
| `run` | 按字段输入重新计算 | bpTableBody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--f-date` | 日期 | date | "2026-10-30" |  |
| `--f-time` | 时间 | time | "11:38" |  |
| `--f-sys` | 收缩压 (mmHg) | number | "" | min=60, max=250 |
| `--f-dia` | 舒张压 (mmHg) | number | "" | min=40, max=150 |
| `--f-hr` | 心率 (次/分) | number | "" | min=30, max=250 |
| `--f-note` | 备注 | text | "" |  |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools health/blood-pressure-log render --f-date '2026-10-30' --f-time '11:38' --f-sys '60' --f-dia '40' --f-hr '30' --f-note 'Hello world
Hello world
TypeScript' --file-input 'generated/fixtures/sample.txt' --json
```

操作限制：部分原页面操作未通过迁移检查: update-stats: 导入 0 条新记录

### health/cholesterol-ratio-calculator

胆固醇比率计算器：输入总胆固醇、LDL、HDL、甘油三酯，计算 LDL/HDL 比值和非 HDL 胆固醇，给出心血管风险评估。

来源：`html-tools/tools/health/cholesterol-ratio-calculator.html`，SHA-256：`84c309e4adb7ef4b4447c249564d2cb947614b1d084b8c969252531bc6bbc0bf`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | 计算 | resultsArea |
| `calculate` | calculate | resultsArea |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--in-total` | 总胆固醇 TC (mmol/L) | number | "" | min=0 |
| `--in-ldl` | 低密度脂蛋白 LDL (mmol/L) | number | "" | min=0 |
| `--in-hdl` | 高密度脂蛋白 HDL (mmol/L) | number | "" | min=0 |
| `--in-tg` | 甘油三酯 TG (mmol/L) | number | "" | min=0 |

已检查示例：

```bash
html-tools health/cholesterol-ratio-calculator calc --in-total '10' --in-ldl '10' --in-hdl '10' --in-tg '10' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### health/macro-calculator

宏量营养素计算器：根据 TDEE 和目标（减脂/增肌/维持），按比例分配每日蛋白质、脂肪、碳水化合物克数。

来源：`html-tools/tools/health/macro-calculator.html`，SHA-256：`9c3d825a766ec44c4d897aca8fa722d15aa7d3e334effec610b8010b0e26720f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | resultCalories, proteinG, proteinPct, proteinKcal, fatG, fatPct, fatKcal, carbG, carbPct, carbKcal, barProteinLabel, barFatLabel, barCarbLabel, mealTableBody, presetTag, ratioChip |
| `update-ratio-sum` | updateRatioSum | ratioSumIndicator |
| `run` | 按字段输入重新计算 | ratioSumIndicator |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-tdee` | 每日总能量消耗 TDEE（千卡） | number | "" | min=800, max=6000 |
| `--select-preset` | selectPreset | select-one | "standard-cut" | "standard-cut" (标准减脂（蛋白40 / 脂肪30 / 碳水30）); "low-carb" (低碳饮食（蛋白35 / 脂肪45 / 碳水20）); "keto" (生酮饮食（蛋白25 / 脂肪70 / 碳水5）); "standard-maintain" (标准维持（蛋白30 / 脂肪30 / 碳水40）); "high-carb" (高碳增肌（蛋白25 / 脂肪20 / 碳水55）); "zone" (区间饮食（蛋白30 / 脂肪30 / 碳水40）); "custom" (自定义比例) |
| `--custom-protein` | customProtein | number | "30" | min=10, max=80 |
| `--custom-fat` | customFat | number | "30" | min=10, max=80 |
| `--custom-carb` | customCarb | number | "40" | min=5, max=80 |
| `--select-meals` | 每日餐次 | select-one | "3" | "2" (2 餐); "3" (3 餐); "4" (4 餐); "5" (5 餐); "6" (6 餐) |

已检查示例：

```bash
html-tools health/macro-calculator calculate --input-tdee '800' --select-preset 'standard-cut' --custom-protein '30' --custom-fat '30' --custom-carb '40' --select-meals '3' --json
```

### health/vo2max-calculator

VO₂max 估算器：通过 Cooper 12 分钟跑或静息心率公式估算最大摄氧量（VO₂max），评估心肺适能等级。

来源：`html-tools/tools/health/vo2max-calculator.html`，SHA-256：`8b4fa99db498a3ca4593f4ed79977edcc7f1634fe99614f2ad87d49129df9978`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | 计算 VO₂max | resultValue, resultRating, resultCategory, statVO2, statGrade, statPct |
| `calculate` | calculate | resultValue, resultRating, resultCategory, statVO2, statGrade, statPct |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--cooper-dist` | 12 分钟跑距离 | number | "" | min=500, max=6000 |
| `--cooper-age` | 年龄 | number | "" | min=10, max=100 |
| `--cooper-sex` | 性别 | select-one | "male" | "male" (男); "female" (女) |
| `--hr-resting` | 静息心率（RHR） | number | "" | min=30, max=120 |
| `--hr-age` | 年龄 | number | "" | min=10, max=100 |
| `--hr-sex` | 性别 | select-one | "male" | "male" (男); "female" (女) |
| `--rp-time` | 1.6 km 步行时间 | number | "" | min=8, max=30 |
| `--rp-hr` | 完成后即时心率 | number | "" | min=50, max=220 |
| `--rp-weight` | 体重 | number | "" | min=20, max=300 |
| `--rp-age` | 年龄 | number | "" | min=10, max=100 |
| `--rp-sex` | 性别 | select-one | "male" | "male" (男); "female" (女) |

已检查示例：

```bash
html-tools health/vo2max-calculator calc --cooper-dist '500' --cooper-age '10' --cooper-sex 'male' --hr-resting '30' --hr-age '10' --hr-sex 'male' --rp-time '10' --rp-hr '50' --rp-weight '20' --rp-age '10' --rp-sex 'male' --json
```

操作限制：部分原页面操作未通过迁移检查: calc-cooper: 原工具没有产生可输出的结果，请检查参数 | calc-hr: 原工具没有产生可输出的结果，请检查参数 | calc-rockport: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

## legal

### legal/privacy-policy

隐私政策生成器：快速生成符合法规要求的隐私政策文档

来源：`html-tools/tools/legal/privacy-policy.html`，SHA-256：`b69980628dc906c6fdf1f4e9384c4fec06e87d18eb2ca0c2cdcd52a1709e9c3d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-policy` | 生成隐私政策 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--company-name` | 公司/网站名称 * | text | "" |  |
| `--website-url` | 网站地址 | text | "" |  |
| `--contact-email` | 联系邮箱 * | email | "" |  |
| `--effective-date` | 生效日期 | date | "2026-10-30" |  |
| `--company-address` | 公司地址 | text | "" |  |
| `--data-name` / `--no-data-name` | 姓名 | checkbox | true |  |
| `--data-email` / `--no-data-email` | 邮箱 | checkbox | true |  |
| `--data-phone` / `--no-data-phone` | 电话 | checkbox | false |  |
| `--data-address` / `--no-data-address` | 地址 | checkbox | false |  |
| `--data-payment` / `--no-data-payment` | 支付信息 | checkbox | false |  |
| `--data-usage` / `--no-data-usage` | 使用数据 | checkbox | true |  |
| `--data-cookies` / `--no-data-cookies` | Cookies | checkbox | true |  |
| `--data-location` / `--no-data-location` | 位置信息 | checkbox | false |  |
| `--data-device` / `--no-data-device` | 设备信息 | checkbox | true |  |
| `--law-gdpr` / `--no-law-gdpr` | GDPR (欧盟) | checkbox | false |  |
| `--law-ccpa` / `--no-law-ccpa` | CCPA (加州) | checkbox | false |  |
| `--law-pipl` / `--no-law-pipl` | 个人信息保护法 (中国) | checkbox | true |  |
| `--language` | 输出语言 | select-one | "zh" | "zh" (中文); "en" (English) |

已检查示例：

```bash
html-tools legal/privacy-policy generate-policy --company-name 'Hello world
Hello world
TypeScript' --website-url 'https://example.com/path?a=1' --contact-email 'alice@example.com' --effective-date '2026-10-30' --company-address 'Hello world
Hello world
TypeScript' --data-name --data-email --no-data-phone --no-data-address --no-data-payment --data-usage --data-cookies --no-data-location --data-device --no-law-gdpr --no-law-ccpa --law-pipl --language 'zh' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### legal/terms-generator

服务条款生成器：快速生成网站或应用的服务条款文档

来源：`html-tools/tools/legal/terms-generator.html`，SHA-256：`bc8d89dd6e8320c39bb8d43fb9d6479da633bfcd77256c561b6e1e2e9df01ca7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-terms` | 生成服务条款 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--company-name` | 公司/网站名称 * | text | "" |  |
| `--website-url` | 网站地址 * | text | "" |  |
| `--contact-email` | 联系邮箱 * | email | "" |  |
| `--effective-date` | 生效日期 | date | "2026-10-30" |  |
| `--service-type` | 服务类型 | select-one | "website" | "website" (网站服务); "saas" (SaaS 软件服务); "app" (移动应用); "ecommerce" (电子商务); "platform" (平台服务) |
| `--jurisdiction` | 司法管辖区 | select-one | "cn" | "cn" (中国大陆); "hk" (中国香港); "us" (美国); "eu" (欧盟) |
| `--service-description` | 服务简述 | textarea | "" |  |
| `--term-account` / `--no-term-account` | 账户注册 | checkbox | true |  |
| `--term-payment` / `--no-term-payment` | 付款条款 | checkbox | false |  |
| `--term-refund` / `--no-term-refund` | 退款政策 | checkbox | false |  |
| `--term-ip` / `--no-term-ip` | 知识产权 | checkbox | true |  |
| `--term-ugc` / `--no-term-ugc` | 用户内容 | checkbox | false |  |
| `--term-privacy` / `--no-term-privacy` | 隐私条款 | checkbox | true |  |
| `--term-termination` / `--no-term-termination` | 终止条款 | checkbox | true |  |
| `--term-dispute` / `--no-term-dispute` | 争议解决 | checkbox | true |  |
| `--language` | 输出语言 | select-one | "zh" | "zh" (中文); "en" (English) |

已检查示例：

```bash
html-tools legal/terms-generator generate-terms --company-name 'Hello world
Hello world
TypeScript' --website-url 'https://example.com/path?a=1' --contact-email 'alice@example.com' --effective-date '2026-10-30' --service-type 'website' --jurisdiction 'cn' --service-description '192.168.1.1' --term-account --no-term-payment --no-term-refund --term-ip --no-term-ugc --term-privacy --term-termination --term-dispute --language 'zh' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### legal/nda-generator

保密协议生成器：生成保密协议/NDA文档

来源：`html-tools/tools/legal/nda-generator.html`，SHA-256：`c28635e189734f81d81f4caaa83bb9ddc36394601cbcaa918ea06a74a9193708`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-nda` | 生成保密协议 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--nda-type` | 协议类型 | select-one | "mutual" | "mutual" (双向保密协议); "unilateral" (单向保密协议) |
| `--language` | 输出语言 | select-one | "zh" | "zh" (中文); "en" (English) |
| `--discloser-name` | 披露方名称 * | text | "" |  |
| `--discloser-address` | 披露方地址 | text | "" |  |
| `--discloser-rep` | 披露方代表人 | text | "" |  |
| `--receiver-name` | 接收方名称 * | text | "" |  |
| `--receiver-address` | 接收方地址 | text | "" |  |
| `--receiver-rep` | 接收方代表人 | text | "" |  |
| `--effective-date` | 生效日期 | date | "2026-10-30" |  |
| `--duration` | 保密期限（年） | select-one | "3" | "1" (1 年); "2" (2 年); "3" (3 年); "5" (5 年); "10" (10 年); "permanent" (永久) |
| `--purpose` | 披露目的 * | textarea | "" |  |
| `--confidential-info` | 保密信息范围 | textarea | "" |  |
| `--jurisdiction` | 管辖法律 | select-one | "cn" | "cn" (中华人民共和国法律); "hk" (中国香港法律); "us" (美国法律); "uk" (英国法律) |
| `--penalty` | 违约金（选填） | text | "" |  |

已检查示例：

```bash
html-tools legal/nda-generator generate-nda --nda-type 'mutual' --language 'zh' --discloser-name 'Hello world
Hello world
TypeScript' --discloser-address 'Hello world
Hello world
TypeScript' --discloser-rep 'Hello world
Hello world
TypeScript' --receiver-name 'Hello world
Hello world
TypeScript' --receiver-address 'Hello world
Hello world
TypeScript' --receiver-rep 'Hello world
Hello world
TypeScript' --effective-date '2026-10-30' --duration '3' --purpose 'Hello world
Hello world
TypeScript' --confidential-info 'Hello world
Hello world
TypeScript' --jurisdiction 'cn' --penalty 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### legal/disclaimer-gen

免责声明生成器：生成各类免责声明文档

来源：`html-tools/tools/legal/disclaimer-gen.html`，SHA-256：`1d8488bea787e40d4f177ae2292b7446742ea055da298d619d4a43cfd5567bd0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-disclaimer` | 生成免责声明 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--company-name` | 公司/网站名称 * | text | "" |  |
| `--website-url` | 网站地址 | text | "" |  |
| `--disclaimer-type` | 免责声明类型 | select-one | "general" | "general" (通用免责声明); "blog" (博客/内容网站); "ecommerce" (电子商务); "professional" (专业服务咨询); "finance" (金融/投资信息); "health" (健康/医疗信息); "legal" (法律信息); "software" (软件/工具) |
| `--language` | 输出语言 | select-one | "zh" | "zh" (中文); "en" (English) |
| `--contact-email` | 联系邮箱 | email | "" |  |
| `--last-updated` | 最后更新日期 | date | "2026-10-30" |  |
| `--include-accuracy` / `--no-include-accuracy` | 信息准确性 | checkbox | true |  |
| `--include-external` / `--no-include-external` | 外部链接 | checkbox | true |  |
| `--include-errors` / `--no-include-errors` | 技术错误 | checkbox | true |  |
| `--include-changes` / `--no-include-changes` | 变更权利 | checkbox | true |  |
| `--include-third-party` / `--no-include-third-party` | 第三方内容 | checkbox | false |  |
| `--include-views` / `--no-include-views` | 观点声明 | checkbox | false |  |
| `--include-testimonials` / `--no-include-testimonials` | 用户评价 | checkbox | false |  |
| `--include-liability` / `--no-include-liability` | 责任限制 | checkbox | true |  |

已检查示例：

```bash
html-tools legal/disclaimer-gen generate-disclaimer --company-name 'Hello world
Hello world
TypeScript' --website-url 'https://example.com/path?a=1' --disclaimer-type 'general' --language 'zh' --contact-email 'alice@example.com' --last-updated '2026-10-30' --include-accuracy --include-external --include-errors --include-changes --no-include-third-party --no-include-views --no-include-testimonials --include-liability --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### legal/cookie-policy

Cookie政策生成器：生成符合法规的Cookie政策

来源：`html-tools/tools/legal/cookie-policy.html`，SHA-256：`c5642688afd537d34ab2097e2aa5e74a90532d0f529fb78bc7703f0e3880f595`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-policy` | 生成 Cookie 政策 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--company-name` | 公司/网站名称 * | text | "" |  |
| `--website-url` | 网站地址 * | text | "" |  |
| `--contact-email` | 联系邮箱 | email | "" |  |
| `--language` | 输出语言 | select-one | "zh" | "zh" (中文); "en" (English) |
| `--cookie-essential` / `--no-cookie-essential` | 必要 Cookie | checkbox | true |  |
| `--cookie-analytics` / `--no-cookie-analytics` | 分析 Cookie | checkbox | true |  |
| `--cookie-marketing` / `--no-cookie-marketing` | 营销 Cookie | checkbox | false |  |
| `--cookie-functional` / `--no-cookie-functional` | 功能 Cookie | checkbox | false |  |
| `--cookie-social` / `--no-cookie-social` | 社交媒体 Cookie | checkbox | false |  |
| `--service-ga` / `--no-service-ga` | Google Analytics | checkbox | true |  |
| `--service-fb` / `--no-service-fb` | Facebook Pixel | checkbox | false |  |
| `--service-hotjar` / `--no-service-hotjar` | Hotjar | checkbox | false |  |
| `--service-intercom` / `--no-service-intercom` | Intercom | checkbox | false |  |
| `--service-stripe` / `--no-service-stripe` | Stripe | checkbox | false |  |
| `--service-youtube` / `--no-service-youtube` | YouTube | checkbox | false |  |
| `--law-gdpr` / `--no-law-gdpr` | GDPR (欧盟) | checkbox | true |  |
| `--law-ccpa` / `--no-law-ccpa` | CCPA (加州) | checkbox | false |  |
| `--law-pecr` / `--no-law-pecr` | PECR (英国) | checkbox | false |  |

已检查示例：

```bash
html-tools legal/cookie-policy generate-policy --company-name 'Hello world
Hello world
TypeScript' --website-url 'https://example.com/path?a=1' --contact-email 'alice@example.com' --language 'zh' --cookie-essential --cookie-analytics --no-cookie-marketing --no-cookie-functional --no-cookie-social --service-ga --no-service-fb --no-service-hotjar --no-service-intercom --no-service-stripe --no-service-youtube --law-gdpr --no-law-ccpa --no-law-pecr --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### legal/gdpr-checklist

GDPR合规检查清单：检查GDPR合规性的清单工具

来源：`html-tools/tools/legal/gdpr-checklist.html`，SHA-256：`7e335e3cb0159f251ee8249290d1a7dfc7efd94bf2463e3e1efec94f64cb8362`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-progress` | updateProgress | scoreValue, progressStats, progress-lawful-basis, progress-data-subject-rights, progress-transparency, progress-data-protection, progress-breach-management, progress-accountability, progress-third-party, progress-special-categories |
| `run` | 按字段输入重新计算 | scoreValue, progressStats, progress-lawful-basis, progress-data-subject-rights, progress-transparency, progress-data-protection, progress-breach-management, progress-accountability, progress-third-party, progress-special-categories |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--lb1` / `--no-lb1` | 识别并记录每种处理活动的合法性基础 | checkbox | false |  |
| `--lb2` / `--no-lb2` | 同意机制清晰、具体、可撤回 | checkbox | false |  |
| `--lb3` / `--no-lb3` | 记录所有同意的获取和撤回 | checkbox | false |  |
| `--lb4` / `--no-lb4` | 定期审查处理活动的合法性基础 | checkbox | false |  |
| `--dsr1` / `--no-dsr1` | 建立响应数据主体请求的流程 | checkbox | false |  |
| `--dsr2` / `--no-dsr2` | 支持数据可携带权 | checkbox | false |  |
| `--dsr3` / `--no-dsr3` | 实施被遗忘权（删除权） | checkbox | false |  |
| `--dsr4` / `--no-dsr4` | 提供限制处理的机制 | checkbox | false |  |
| `--dsr5` / `--no-dsr5` | 支持反对权，特别是直接营销 | checkbox | false |  |
| `--tr1` / `--no-tr1` | 发布清晰、易懂的隐私政策 | checkbox | false |  |
| `--tr2` / `--no-tr2` | 在收集时提供隐私通知 | checkbox | false |  |
| `--tr3` / `--no-tr3` | 说明数据保留期限 | checkbox | false |  |
| `--tr4` / `--no-tr4` | 披露第三方数据共享 | checkbox | false |  |
| `--tr5` / `--no-tr5` | 提供数据保护官（DPO）联系方式 | checkbox | false |  |
| `--dp1` / `--no-dp1` | 实施数据加密（传输中和静态） | checkbox | false |  |
| `--dp2` / `--no-dp2` | 实施访问控制和身份验证 | checkbox | false |  |
| `--dp3` / `--no-dp3` | 进行定期安全评估 | checkbox | false |  |
| `--dp4` / `--no-dp4` | 实施数据最小化原则 | checkbox | false |  |
| `--dp5` / `--no-dp5` | 实施假名化或匿名化 | checkbox | false |  |
| `--bm1` / `--no-bm1` | 建立数据泄露检测机制 | checkbox | false |  |
| `--bm2` / `--no-bm2` | 制定数据泄露响应计划 | checkbox | false |  |
| `--bm3` / `--no-bm3` | 能够在72小时内通知监管机构 | checkbox | false |  |
| `--bm4` / `--no-bm4` | 建立受影响个人通知流程 | checkbox | false |  |
| `--bm5` / `--no-bm5` | 记录所有数据泄露事件 | checkbox | false |  |
| `--ac1` / `--no-ac1` | 维护处理活动记录 (ROPA) | checkbox | false |  |
| `--ac2` / `--no-ac2` | 进行数据保护影响评估 (DPIA) | checkbox | false |  |
| `--ac3` / `--no-ac3` | 任命数据保护官（如需要） | checkbox | false |  |
| `--ac4` / `--no-ac4` | 实施隐私设计和默认隐私 | checkbox | false |  |
| `--ac5` / `--no-ac5` | 对员工进行数据保护培训 | checkbox | false |  |
| `--tp1` / `--no-tp1` | 与数据处理者签订合同 | checkbox | false |  |
| `--tp2` / `--no-tp2` | 评估第三方的合规状况 | checkbox | false |  |
| `--tp3` / `--no-tp3` | 监控第三方数据处理 | checkbox | false |  |
| `--tp4` / `--no-tp4` | 跨境数据传输有适当保障 | checkbox | false |  |
| `--sc1` / `--no-sc1` | 识别所有特殊类别数据处理 | checkbox | false |  |
| `--sc2` / `--no-sc2` | 有处理特殊类别数据的额外法律基础 | checkbox | false |  |
| `--sc3` / `--no-sc3` | 对特殊类别数据实施增强保护 | checkbox | false |  |

已检查示例：

```bash
html-tools legal/gdpr-checklist update-progress --no-lb1 --no-lb2 --no-lb3 --no-lb4 --no-dsr1 --no-dsr2 --no-dsr3 --no-dsr4 --no-dsr5 --no-tr1 --no-tr2 --no-tr3 --no-tr4 --no-tr5 --no-dp1 --no-dp2 --no-dp3 --no-dp4 --no-dp5 --no-bm1 --no-bm2 --no-bm3 --no-bm4 --no-bm5 --no-ac1 --no-ac2 --no-ac3 --no-ac4 --no-ac5 --no-tp1 --no-tp2 --no-tp3 --no-tp4 --no-sc1 --no-sc2 --no-sc3 --json
```

### legal/contract-review

合同条款检查器：检查合同中的常见风险条款

来源：`html-tools/tools/legal/contract-review.html`，SHA-256：`ce8bec8316982232adbb1c3031b68cdd558291cd81744f89cf28fdac2b15b25e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze-contract` | 分析合同 | summaryBadges, findingsList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--contract-text` | 合同文本 | textarea | "" |  |

已检查示例：

```bash
html-tools legal/contract-review analyze-contract --contract-text 'Hello world
Hello world
TypeScript' --json
```

### legal/legal-deadline

法律时限计算器：计算各类法律时限和期限

来源：`html-tools/tools/legal/legal-deadline.html`，SHA-256：`1e60f9fb4dfb80787e3c871966bd6eee689e765284ec7e471239fbca9abf9111`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算截止日期 | resultDate, resultCountdown, infoStartDate, infoPeriod, infoEndDate, infoRemaining |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--deadline-type` | 时限类型 | select-one | "custom" | "custom" (自定义时限); "limitation_3y" (普通诉讼时效（3年）); "limitation_1y" (特殊诉讼时效（1年）); "limitation_20y" (最长保护期（20年）); "appeal_civil" (民事上诉期（15天）); "defense_civil" (民事答辩期（15天）); "enforcement" (申请强制执行（2年）); "appeal_criminal" (刑事上诉期（10天）); "appeal_admin" (行政上诉期（15天）); "admin_sue" (行政诉讼起诉期（6个月）); "admin_review" (行政复议申请期（60天）); "arbitration_labor" (劳动仲裁时效（1年）); "arbitration_commercial" (商事仲裁时效（参照诉讼时效）); "contract_7d" (7天冷静期); "contract_30d" (30天通知期); "contract_90d" (90天试用期) |
| `--start-date` | 起算日期 | date | "" |  |
| `--period-value` | 期限数值 | number | "15" | min=1 |
| `--period-unit` | 期限单位 | select-one | "day" | "day" (天); "month" (月); "year" (年) |
| `--exclude-holidays` / `--no-exclude-holidays` | 节假日顺延（期限最后一天为节假日时顺延至工作日） | checkbox | false |  |

已检查示例：

```bash
html-tools legal/legal-deadline calculate --deadline-type 'custom' --start-date '2025-01-01' --period-value '15' --period-unit 'day' --no-exclude-holidays --json
```

操作限制：部分原页面操作未通过迁移检查: update-period: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### legal/lawyer-fee

律师费用计算器：估算律师费用和诉讼成本

来源：`html-tools/tools/legal/lawyer-fee.html`，SHA-256：`f3ea4f13230ae01ec2ddcadf208a19cb9d26a395c049ab0d64404d96c8ca7b82`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算费用 | lawyerFee, courtFee, totalFee, breakdownList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--case-type` | 案件类型 | select-one | "civil" | "civil" (民事诉讼案件); "criminal" (刑事诉讼案件); "admin" (行政诉讼案件); "arbitration" (仲裁案件); "enforcement" (执行案件); "nonlitigation" (非诉讼法律事务); "consultation" (法律咨询) |
| `--region` | 所在地区 | select-one | "beijing" | "beijing" (北京); "shanghai" (上海); "guangdong" (广东); "jiangsu" (江苏); "zhejiang" (浙江); "other" (其他地区) |
| `--amount` | 案件标的额（元） | number | "" | min=0 |
| `--stage` | 诉讼阶段 | select-one | "first" | "first" (一审); "second" (二审); "retrial" (再审); "full" (全程代理) |
| `--complexity` | 案件复杂程度 | select-one | "normal" | "simple" (简单); "normal" (一般); "complex" (复杂); "major" (重大疑难) |
| `--risk-mode` | 收费模式 | select-one | "fixed" | "fixed" (固定收费); "percentage" (按标的比例); "risk" (风险代理) |

已检查示例：

```bash
html-tools legal/lawyer-fee calculate --case-type 'civil' --region 'beijing' --amount '10' --stage 'first' --complexity 'normal' --risk-mode 'fixed' --json
```

操作限制：部分原页面操作未通过迁移检查: update-fee-info: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### legal/legal-glossary

法律术语词典：查询常用法律术语的含义

来源：`html-tools/tools/legal/legal-glossary.html`，SHA-256：`51971731f022d669fef6596c4b8994a94335e79e14f4736de5e8032211b6b305`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-terms` | filterTerms | stats, termList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools legal/legal-glossary filter-terms  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### legal/agreement-compare

协议对比工具：对比两份协议或合同的差异

来源：`html-tools/tools/legal/agreement-compare.html`，SHA-256：`b74e4fce81a06270554987cf156deedbb9e24eac9e3b88436b4897e4db0bf2a6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `compare-documents` | 开始对比 | addedCount, removedCount, changedCount, diffOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--original-text` | 粘贴原始协议内容... | textarea | "" |  |
| `--modified-text` | 粘贴修改后的协议内容... | textarea | "" |  |
| `--ignore-whitespace` / `--no-ignore-whitespace` | 忽略空白差异 | checkbox | false |  |
| `--ignore-case` / `--no-ignore-case` | 忽略大小写 | checkbox | false |  |
| `--show-line-numbers` / `--no-show-line-numbers` | 显示行号 | checkbox | true |  |
| `--side-by-side` / `--no-side-by-side` | 并排视图 | checkbox | false |  |

已检查示例：

```bash
html-tools legal/agreement-compare compare-documents --original-text 'Hello world
Hello world
TypeScript' --modified-text 'Hello world
Hello world
TypeScript' --no-ignore-whitespace --no-ignore-case --show-line-numbers --no-side-by-side --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### legal/signature-date

签署日期格式化器：将日期转换为法律文书常用格式

来源：`html-tools/tools/legal/signature-date.html`，SHA-256：`cd0125eb59baf4a04422ac1403e290ae70841f20a421043f86c0aaa5f31c5b10`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-formats` | generateFormats | formatGrid, signaturePreview |
| `run` | 按字段输入重新计算 | formatGrid, signaturePreview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--selected-date` | 选择日期 | date | "2026-10-30" |  |
| `--location` | 签署地点 | text | "" |  |

已检查示例：

```bash
html-tools legal/signature-date generate-formats --selected-date '2026-10-30' --location 'Hello world
Hello world
TypeScript' --json
```

### legal/lawsuit-fee

诉讼费计算器：计算民事诉讼受理费用

来源：`html-tools/tools/legal/lawsuit-fee.html`，SHA-256：`a02ebaf72ab1f8ce21d14b96ca9ed5672b7683d71082bf1c84bbf28d67e8506d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算诉讼费 | resultFee, resultNote, breakdown |
| `update-form` | updateForm | resultFee, resultNote, breakdown |
| `update-divorce-form` | updateDivorceForm | resultFee, resultNote, breakdown |
| `run` | 按字段输入重新计算 | resultFee, resultNote, breakdown |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--case-type` | 案件类型 | select-one | "property" | "property" (财产案件); "divorce" (离婚案件); "labor" (劳动争议); "ip" (知识产权); "admin" (行政案件); "other" (其他非财产案件) |
| `--amount` | 诉讼标的额 (元) | number | "" |  |
| `--divorce-property` | 是否涉及财产分割 | select-one | "no" | "no" (不涉及财产分割); "yes" (涉及财产分割) |
| `--property-amount` | 财产分割金额 (元) | number | "" |  |

已检查示例：

```bash
html-tools legal/lawsuit-fee calculate --case-type 'property' --amount '10' --divorce-property 'no' --property-amount '10' --json
```

## life

### life/annual-leave

年假计算器：根据工龄计算年假天数，支持新入职/离职折算

来源：`html-tools/tools/life/annual-leave.html`，SHA-256：`93022c84a39f0d8a49255ea5a13297c73a0d88b26d6ec1b18ffcc1a78bf83f91`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 🧮 计算年假 | resultValue, resultLabel, resultDetails |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--work-years` | 累计工龄（年） | number | "" | min=0, max=50 |
| `--first-work-date` | 首次参加工作日期 | date | "" |  |
| `--calc-date` | 计算截止日期 | date | "2026-12-30" |  |
| `--entry-date` | 新单位入职日期 | date | "2026-10-30" |  |
| `--year-end-date` | 当年剩余天数计算截止日 | date | "2026-12-30" |  |
| `--year-start-date` | 当年入职日期 | date | "2025-12-31" |  |
| `--resign-date` | 离职日期 | date | "2026-10-30" |  |
| `--total-leave-days` | 应休年假天数 | number | "" | min=0, max=20 |
| `--used-leave-days` | 已休年假天数 | number | "" | min=0, max=20 |
| `--monthly-salary` | 月工资（元） | number | "" |  |

已检查示例：

```bash
html-tools life/annual-leave calculate --work-years '10' --first-work-date '2025-01-01' --calc-date '2026-12-30' --entry-date '2026-10-30' --year-end-date '2026-12-30' --year-start-date '2025-12-31' --resign-date '2026-10-30' --total-leave-days '10' --used-leave-days '10' --monthly-salary '10' --json
```

操作限制：部分原页面操作未通过迁移检查: standard: 原工具没有产生可输出的结果，请检查参数 | new-entry: 原工具没有产生可输出的结果，请检查参数 | resign: 原工具没有产生可输出的结果，请检查参数 | compensation: 原工具没有产生可输出的结果，请检查参数

### life/bank-card-validator

银行卡号校验：银行卡号 Luhn 算法校验，识别发卡行和卡类型

来源：`html-tools/tools/life/bank-card-validator.html`，SHA-256：`9b235ed1985ae90f3cbfeefa615b7ac0653cec81b07f515eb3e308f76cc6528c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `validate` | 🔍 校验 | previewNumber, previewBank, previewType, previewLogo, infoBank, infoType, infoLength, infoBin, digitRow, luhnResult |
| `run` | 按字段输入重新计算 | cardInput, previewNumber, previewBank, previewType, previewLogo, infoBank, infoType, infoLength, infoBin, digitRow, luhnResult |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--card-input` | 请输入银行卡号 | text | "" |  |

已检查示例：

```bash
html-tools life/bank-card-validator validate --card-input '4111111111111111' --json
```

### life/color-picker

颜色选择器：颜色选择和转换工具，支持 RGB/HSL/HEX 格式，对比度预览

来源：`html-tools/tools/life/color-picker.html`，SHA-256：`a9dec6ca4511314de1411397ae2e39698a29863e1b08d38a0e74d82f83073341`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-formats` | updateFormats | aValue, hexInput, rgbInput, rgbaInput, hslInput |
| `update-contrast` | updateContrast | ratioWhite, ratioBlack |
| `run` | 按字段输入重新计算 | nativePicker, rValue, sliderR, gValue, sliderG, bValue, sliderB, hValue, sliderH, sValue, sliderS, lValue, sliderL, aValue, hexInput, rgbInput, rgbaInput, hslInput, ratioWhite, ratioBlack |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--native-picker` | nativePicker | color | "#e91e63" |  |
| `--slider-r` | sliderR | range | "233" | min=0, max=255 |
| `--slider-g` | sliderG | range | "30" | min=0, max=255 |
| `--slider-b` | sliderB | range | "99" | min=0, max=255 |
| `--slider-h` | sliderH | range | "340" | min=0, max=360 |
| `--slider-s` | sliderS | range | "82" | min=0, max=100 |
| `--slider-l` | sliderL | range | "52" | min=0, max=100 |
| `--slider-a` | sliderA | range | "100" | min=0, max=100 |
| `--hex-input` | 请输入文本输入框 | text | "#E91E63" |  |

已检查示例：

```bash
html-tools life/color-picker update-formats --native-picker '#e91e63' --slider-r '233' --slider-g '30' --slider-b '99' --slider-h '340' --slider-s '82' --slider-l '52' --slider-a '100' --hex-input '#E91E63' --json
```

操作限制：部分原页面操作未通过迁移检查: update-preview: 原工具没有产生可输出的结果，请检查参数

### life/date-diff

日期差计算器：计算两个日期之间的天数差，支持工作日统计和日期推算

来源：`html-tools/tools/life/date-diff.html`，SHA-256：`42429817e7831f5c607c2afe5ffcf2f44c5d77bc6e0db84629d0ef972acff18c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate-diff` | 计算日期差 | resultContainer |
| `calculate-date` | 计算日期 | resultContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--start-date` | 开始日期 | date | "2026-10-30" |  |
| `--end-date` | 结束日期 | date | "2026-10-30" |  |
| `--base-date` | 基准日期 | date | "2026-10-30" |  |
| `--interval-value` | 请输入数字输入框 | number | "30" | min=0 |
| `--interval-unit` | intervalUnit | select-one | "days" | "days" (天); "weeks" (周); "months" (月); "years" (年) |

已检查示例：

```bash
html-tools life/date-diff calculate-diff --start-date '2026-10-30' --end-date '2026-10-30' --base-date '2026-10-30' --interval-value '30' --interval-unit 'days' --json
```

### life/electricity-bill

阶梯电费计算器：根据各地阶梯电价政策计算居民用电费用

来源：`html-tools/tools/life/electricity-bill.html`，SHA-256：`721d078ceafd8403c25ac70d1954b0ed866b1bdddde6e51e67247fb80d01ef35`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 🧮 计算电费 | totalBill, totalKwh, avgPrice, dailyAvg, tierBreakdown |
| `update-price-table` | updatePriceTable | priceTableBody |
| `run` | 按字段输入重新计算 | priceTableBody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--province` | 选择省份/城市 | select-one | "default" | "beijing" (北京); "shanghai" (上海); "guangdong" (广东); "jiangsu" (江苏); "zhejiang" (浙江); "shandong" (山东); "sichuan" (四川); "hubei" (湖北); "hunan" (湖南); "henan" (河南); "hebei" (河北); "fujian" (福建); "anhui" (安徽); "liaoning" (辽宁); "shaanxi" (陕西); "chongqing" (重庆); "tianjin" (天津); "default" (全国通用) |
| `--period` | 结算周期 | select-one | "monthly" | "monthly" (按月结算); "yearly" (按年结算) |
| `--total-usage` | 输入用电度数 | number | "" | min=0 |
| `--peak-usage` | 峰时用电 | number | "" | min=0 |
| `--valley-usage` | 谷时用电 | number | "" | min=0 |
| `--fixed-usage` | 输入用电度数 | number | "" | min=0 |
| `--fixed-price` | 单价（元/度） | number | "" | min=0 |
| `--include-base-fee` / `--no-include-base-fee` | 包含基本电费（部分地区收取，约5-10元/月） | checkbox | false |  |

已检查示例：

```bash
html-tools life/electricity-bill calculate --province 'default' --period 'monthly' --total-usage '10' --peak-usage '10' --valley-usage '10' --fixed-usage '10' --fixed-price '10' --no-include-base-fee --json
```

操作限制：部分原页面操作未通过迁移检查: peakvalley: 原工具没有产生可输出的结果，请检查参数 | fixed: 原工具没有产生可输出的结果，请检查参数

### life/fitness-test

体测成绩计算器：依据国家学生体质健康标准计算体测成绩

来源：`html-tools/tools/life/fitness-test.html`，SHA-256：`ed11a364f97d18c63bb17698aaf8a3ad41dce67becc46dd244ae0272a6b7d773`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 📊 计算成绩 | totalScore, totalGrade, scoreTableBody |
| `update-test-items` | updateTestItems | testItems |
| `run` | 按字段输入重新计算 | testItems |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--gender` | 性别 | select-one | "male" | "male" (男); "female" (女) |
| `--grade` | 年级 | select-one | "college" | "college" (大学); "high3" (高三); "high2" (高二); "high1" (高一); "middle3" (初三); "middle2" (初二); "middle1" (初一); "primary6" (小学六年级); "primary5" (小学五年级); "primary4" (小学四年级); "primary3" (小学三年级) |
| `--height` | 170 | number | "" |  |
| `--weight` | 65 | number | "" |  |
| `--vital-capacity` | 输入成绩 | number | "" |  |
| `--run50` | 输入成绩 | number | "" |  |
| `--sit-and-reach` | 输入成绩 | number | "" |  |
| `--standing-jump` | 输入成绩 | number | "" |  |
| `--pull-up` | 输入成绩 | number | "" |  |
| `--run1000-min` | 分 | number | "" | min=0, max=30 |
| `--run1000-sec` | 秒 | number | "" | min=0, max=59 |
| `--bonus-endurance` / `--no-bonus-endurance` | 耐力项目加分（良好+10分，优秀+20分） | checkbox | false |  |

已检查示例：

```bash
html-tools life/fitness-test calculate --gender 'male' --grade 'college' --height '10' --weight '10' --vital-capacity '10' --run50 '10' --sit-and-reach '10' --standing-jump '10' --pull-up '10' --run1000-min '10' --run1000-sec '10' --no-bonus-endurance --json
```

### life/id-card-validator

身份证号校验：身份证号码校验，解析籍贯、生日、性别等信息

来源：`html-tools/tools/life/id-card-validator.html`，SHA-256：`f795eb55b2275bce5859a6510d172f7d91ae9377d0444f308760c4fefd72b0cb`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `validate` | 🔍 校验 | formatRow, infoRegion, infoBirth, infoGender, infoAge, infoZodiac, infoConstellation |
| `run` | 按字段输入重新计算 | idInput, formatRow, infoRegion, infoBirth, infoGender, infoAge, infoZodiac, infoConstellation |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--id-input` | 请输入身份证号码 | text | "" |  |

已检查示例：

```bash
html-tools life/id-card-validator validate --id-input '11010519491231002X' --json
```

### life/income-tax-calculator

个税计算器 2025：2025 个人所得税计算器，支持专项附加扣除

来源：`html-tools/tools/life/income-tax-calculator.html`，SHA-256：`5fede62edc4df0d03b85e4414879e4dc0f46d69b0a17342b432d529ed4a25875`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 🧮 计算个税 | resultHero, resultGrid, taxBreakdown |
| `calculate-salary` | calculateSalary | resultHero, resultGrid, taxBreakdown |
| `calculate-bonus` | calculateBonus | resultHero, resultGrid, taxBreakdown |
| `calculate-annual` | calculateAnnual | resultHero, resultGrid, taxBreakdown |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--monthly-salary` | 请输入数字输入框 | number | "15000" | min=0 |
| `--social-insurance` | 请输入数字输入框 | number | "2000" | min=0 |
| `--field-3` | 税前月薪 | number | "2000" | min=0 |
| `--field-4` | 税前月薪 | number | "400" | min=0 |
| `--field-5` | 税前月薪 | number | "0" | min=0 |
| `--field-6` | 税前月薪 | number | "1000" | min=0 |
| `--field-7` | 税前月薪 | number | "1500" | min=0 |
| `--field-8` | 税前月薪 | number | "3000" | min=0 |
| `--field-9` | 税前月薪 | number | "2000" | min=0 |
| `--bonus-amount` | 请输入数字输入框 | number | "50000" | min=0 |
| `--annual-salary` | 请输入数字输入框 | number | "180000" | min=0 |
| `--annual-insurance` | 请输入数字输入框 | number | "24000" | min=0 |
| `--annual-deduction` | 请输入数字输入框 | number | "24000" | min=0 |
| `--prepaid-tax` | 请输入数字输入框 | number | "5000" | min=0 |

已检查示例：

```bash
html-tools life/income-tax-calculator calculate --monthly-salary '15000' --social-insurance '2000' --field-3 '2000' --field-4 '400' --field-5 '0' --field-6 '1000' --field-7 '1500' --field-8 '3000' --field-9 '2000' --bonus-amount '50000' --annual-salary '180000' --annual-insurance '24000' --annual-deduction '24000' --prepaid-tax '5000' --json
```

### life/license-plate-lookup

车牌归属地查询：查询车牌号码归属地，支持全国省市

来源：`html-tools/tools/life/license-plate-lookup.html`，SHA-256：`f75813403cf29033d8799b75192cf34e5b99b3654f2bb63c21c5b1302b9e389f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `search` | 🔍 查询 | resultPlate, resultLocation, resultDetail |
| `run` | 按字段输入重新计算 | resultPlate, resultLocation, resultDetail |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--plate-input` | 输入车牌号，如：京A、沪B | text | "" |  |

已检查示例：

```bash
html-tools life/license-plate-lookup search --plate-input 'Hello world
Hello world
TypeScript' --json
```

### life/money-uppercase

金额大写转换：人民币金额小写转大写，支持财务场景

来源：`html-tools/tools/life/money-uppercase.html`，SHA-256：`125cf598a88368840c974e1414ffa16c69a160188b5a3dc1ed014584837edaa2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | result |
| `run` | 按字段输入重新计算 | result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--amount-input` | 请输入金额，如 12345.67 | text | "" |  |

已检查示例：

```bash
html-tools life/money-uppercase convert --amount-input '1234.56' --json
```

### life/mortgage-calculator

房贷计算器 2025：2025 房贷计算器，支持商贷/公积金/组合贷，最新利率

来源：`html-tools/tools/life/mortgage-calculator.html`，SHA-256：`cb62c590dfeb1333b259d1a8d6e6eb68e488457115f280351982cbe948cc34bf`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 🧮 开始计算 | resultSummary, compareGrid, scheduleTable |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--loan-amount` | 请输入数字输入框 | number | "100" | min=1, max=10000 |
| `--loan-years` | loanYears | select-one | "30" | "5" (5年 (60期)); "10" (10年 (120期)); "15" (15年 (180期)); "20" (20年 (240期)); "25" (25年 (300期)); "30" (30年 (360期)) |
| `--commercial-rate` | 请输入数字输入框 | number | "3.0" | min=0.1, max=20 |
| `--fund-rate` | 请输入数字输入框 | number | "2.85" | min=0.1, max=20 |
| `--commercial-amount` | 请输入数字输入框 | number | "60" | min=0 |
| `--fund-amount` | 请输入数字输入框 | number | "40" | min=0 |
| `--combined-commercial-rate` | 请输入数字输入框 | number | "3.0" | min=0.1, max=20 |
| `--combined-fund-rate` | 请输入数字输入框 | number | "2.85" | min=0.1, max=20 |

已检查示例：

```bash
html-tools life/mortgage-calculator calculate --loan-amount '100' --loan-years '30' --commercial-rate '3.0' --fund-rate '2.85' --commercial-amount '60' --fund-amount '40' --combined-commercial-rate '3.0' --combined-fund-rate '2.85' --json
```

### life/password-generator

随机密码生成器：生成安全随机密码，支持自定义长度和字符类型，密码强度检测

来源：`html-tools/tools/life/password-generator.html`，SHA-256：`5df2f20c36ef4bb0506ad4e5169283e5f2adf31d852b64c718fafe57f6807c94`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-password` | 🎲 生成密码 | passwordText, strengthLabel, strengthTime |
| `generate-batch` | 批量生成 | batchResults |
| `update-length` | updateLength | passwordText, strengthLabel, strengthTime, lengthValue |
| `run` | 按字段输入重新计算 | passwordText, strengthLabel, strengthTime, lengthValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--length-slider` | lengthSlider | range | "16" | min=4, max=64 |
| `--uppercase` / `--no-uppercase` | 大写字母 A-Z | checkbox | true |  |
| `--lowercase` / `--no-lowercase` | 小写字母 a-z | checkbox | true |  |
| `--numbers` / `--no-numbers` | 数字 0-9 | checkbox | true |  |
| `--symbols` / `--no-symbols` | 特殊符号 !@#$%^&* | checkbox | true |  |
| `--exclude-chars` | 排除字符 (可选) | text | "" |  |
| `--batch-count` | batchCount | number | "5" | min=1, max=100 |

已检查示例：

```bash
html-tools life/password-generator generate-password --length-slider '16' --uppercase --lowercase --numbers --symbols --exclude-chars 'Hello world
Hello world
TypeScript' --batch-count '5' --json
```

### life/random-number

随机数生成器：生成随机数，模拟掷骰子和彩票号码

来源：`html-tools/tools/life/random-number.html`，SHA-256：`0d87256c4fb698cf67a4d79e66acde70d8718140338b89be4517141702068c9e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-numbers` | 🎲 生成随机数 | resultNumber, resultHint, historyList |
| `generate-lottery-ssq` | 🔴 双色球 | lotteryNumbers, historyList |
| `generate-lottery-dlt` | ⭐ 大乐透 | lotteryNumbers, historyList |
| `generate-lottery-3d` | 🎯 福彩3D | lotteryNumbers, historyList |
| `generate-lottery-p5` | 🎰 排列5 | lotteryNumbers, historyList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--min-value` | 最小值 | number | "1" |  |
| `--max-value` | 最大值 | number | "100" |  |
| `--count-value` | 生成个数 | number | "1" | min=1, max=100 |
| `--decimal-value` | 小数位数 (0为整数) | number | "0" | min=0, max=10 |
| `--unique-check` / `--no-unique-check` | 不重复 | checkbox | false |  |
| `--sort-check` / `--no-sort-check` | 排序 | checkbox | false |  |
| `--dice-count` | 骰子数量 | number | "2" | min=1, max=10 |
| `--dice-sides` | 骰子面数 | number | "6" | min=2, max=100 |

已检查示例：

```bash
html-tools life/random-number generate-numbers --min-value '1' --max-value '100' --count-value '1' --decimal-value '0' --no-unique-check --no-sort-check --dice-count '2' --dice-sides '6' --json
```

### life/relative-calculator

亲戚称呼计算器：计算复杂亲戚关系的正确称呼

来源：`html-tools/tools/life/relative-calculator.html`，SHA-256：`7b6be51f73b3ace066f5357b50753011147c95574acf2b39434eac1e8abfb4ec`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-path` | updatePath | relationPath |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools life/relative-calculator update-path  --json
```

操作限制：部分原页面操作未通过迁移检查: calculate: 请先添加亲戚关系

### life/retirement-calculator

退休年龄计算器 2025：2025 延迟退休政策计算器，计算法定退休年龄

来源：`html-tools/tools/life/retirement-calculator.html`，SHA-256：`623587e7883a90197cb6bc4b63ccb25344714e057a8609948796402ef9a034b9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 🧮 计算退休年龄 | resultAge, resultDate, resultGrid, timeline, flexInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--birth-year` | 出生年份 | select-one | "1970" | "2011" (2011年); "2010" (2010年); "2009" (2009年); "2008" (2008年); "2007" (2007年); "2006" (2006年); "2005" (2005年); "2004" (2004年); "2003" (2003年); "2002" (2002年); "2001" (2001年); "2000" (2000年); "1999" (1999年); "1998" (1998年); "1997" (1997年); "1996" (1996年); "1995" (1995年); "1994" (1994年); "1993" (1993年); "1992" (1992年); "1991" (1991年); "1990" (1990年); "1989" (1989年); "1988" (1988年); "1987" (1987年); "1986" (1986年); "1985" (1985年); "1984" (1984年); "1983" (1983年); "1982" (1982年); "1981" (1981年); "1980" (1980年); "1979" (1979年); "1978" (1978年); "1977" (1977年); "1976" (1976年); "1975" (1975年); "1974" (1974年); "1973" (1973年); "1972" (1972年); "1971" (1971年); "1970" (1970年); "1969" (1969年); "1968" (1968年); "1967" (1967年); "1966" (1966年); "1965" (1965年); "1964" (1964年); "1963" (1963年); "1962" (1962年); "1961" (1961年); "1960" (1960年); "1959" (1959年); "1958" (1958年); "1957" (1957年); "1956" (1956年); "1955" (1955年); "1954" (1954年); "1953" (1953年); "1952" (1952年); "1951" (1951年); "1950" (1950年) |
| `--birth-month` | 出生月份 | select-one | "1" | "1" (1月); "2" (2月); "3" (3月); "4" (4月); "5" (5月); "6" (6月); "7" (7月); "8" (8月); "9" (9月); "10" (10月); "11" (11月); "12" (12月) |

已检查示例：

```bash
html-tools life/retirement-calculator calculate --birth-year '1970' --birth-month '1' --json
```

### life/student-grouping

学生分组工具：学生分组工具，支持随机/性别均衡/成绩均衡分组

来源：`html-tools/tools/life/student-grouping.html`，SHA-256：`16b741e0a16b5143ae94554d2d2dfebda4dd7425e0a28591833edcdbef526518`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-input-stats` | updateInputStats | totalCount, maleCount, femaleCount, avgScore |
| `run` | 按字段输入重新计算 | groupValueLabel, groupValue, totalCount, maleCount, femaleCount, avgScore |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--student-input` | 学生名单 | textarea | "张伟,男,92\n李娜,女,88\n王强,男,76\n刘芳,女,95\n陈明,男,82\n杨丽,女,79\n赵鹏,男,85\n黄婷,女,91\n周杰,男,73\n吴敏,女,87\n徐磊,男,80\n孙燕,女,84\n朱浩,男,78\n马莉,女,90\n胡涛,男,86\n郭静,女,81\n林峰,男,77\n何雪,女,93\n罗勇,男,75\n郑丹,女,89" |  |
| `--group-method` | 分组方式 | select-one | "count" | "count" (按组数分); "size" (按人数分) |
| `--group-value` | 组数 | number | "4" | min=2, max=20 |
| `--leader-method` | 组长选择方式 | select-one | "none" | "none" (不指定组长); "first" (每组第一个为组长); "highscore" (成绩最高者为组长); "random" (随机选择组长) |
| `--group-prefix` | 组名前缀 | text | "第" |  |
| `--group-suffix` | 组名后缀 | text | "组" |  |

已检查示例：

```bash
html-tools life/student-grouping update-input-stats --student-input '张伟,男,92
李娜,女,88
王强,男,76
刘芳,女,95
陈明,男,82
杨丽,女,79
赵鹏,男,85
黄婷,女,91
周杰,男,73
吴敏,女,87
徐磊,男,80
孙燕,女,84
朱浩,男,78
马莉,女,90
胡涛,男,86
郭静,女,81
林峰,男,77
何雪,女,93
罗勇,男,75
郑丹,女,89' --group-method 'count' --group-value '4' --leader-method 'none' --group-prefix '第' --group-suffix '组' --json
```

操作限制：部分原页面操作未通过迁移检查: random: 原工具没有产生可输出的结果，请检查参数 | gender: 原工具没有产生可输出的结果，请检查参数 | score: 原工具没有产生可输出的结果，请检查参数

### life/word-counter

字数统计工具：统计文本字数、字符数、行数，分析字符频率

来源：`html-tools/tools/life/word-counter.html`，SHA-256：`d24e1cbe601727a2e8c197b833cb1944381c0c01f129c0c459c2ac485e55057a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze-text` | analyzeText | charCount, charNoSpace, wordCount, lineCount, readTimeNormal, readTimeFast, speakTime, chineseCount, englishCount, numberCount, punctuationCount, spaceCount, newlineCount, sentenceCount, paragraphCount, englishWordCount, avgWordLength, longestLine, byteSize, frequencyList |
| `run` | 按字段输入重新计算 | charCount, charNoSpace, wordCount, lineCount, readTimeNormal, readTimeFast, speakTime, chineseCount, englishCount, numberCount, punctuationCount, spaceCount, newlineCount, sentenceCount, paragraphCount, englishWordCount, avgWordLength, longestLine, byteSize, frequencyList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-input` | 在这里输入或粘贴文本... | textarea | "" |  |

已检查示例：

```bash
html-tools life/word-counter analyze-text --text-input 'Hello world
Hello world
TypeScript' --json
```

### life/file-merger

文件合并器：文件合并器，在线使用，生活工具，浏览器本地运行无需上传

来源：`html-tools/tools/life/file-merger.html`，SHA-256：`afea0fa0ebda07aa5b5a2c622612cf692652fb11e259eca2675fe78d016f4890`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `merge-files` | 🔄 合并预览 | preview |
| `export-merged` | 💾 下载 | preview, download |
| `run` | 按字段输入重新计算 | fileList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--separator` | 分隔符 换行符 双换行 分隔线 无分隔 | select-one | "\\n" | "\\n" (换行符); "\\n\\n" (双换行); "\\n---\\n" (分隔线); "" (无分隔) |
| `--add-filename` / `--no-add-filename` | 添加文件名注释 | checkbox | true |  |
| `--trim-content` / `--no-trim-content` | 去除首尾空白 | checkbox | false |  |

已检查示例：

```bash
html-tools life/file-merger merge-files --file-input 'generated/fixtures/sample.txt' --separator '\n' --add-filename --no-trim-content --json
```

### life/bmr-calculator

基础代谢率计算器：基础代谢率计算器，快速计算结果，生活工具，浏览器本地运行无需上传

来源：`html-tools/tools/life/bmr-calculator.html`，SHA-256：`cc31870b2e8ce73dd7ddde9a48442369f6b60a53a0219ada223e8cbbd4449ce5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算代谢率 | bmrValue, tdeeValue, loseWeight, bmiValue, idealWeight, bodyFat, gainWeight, maintainWeight, tipsList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--age` | 请输入数字输入框 | number | "25" | min=1, max=120 |
| `--height` | 请输入数字输入框 | number | "170" | min=50, max=250 |
| `--weight` | 请输入数字输入框 | number | "65" | min=20, max=300 |
| `--activity` | 年龄 | radio | "1.2" | "1.2" (久坐不动<br>              办公室工作，几乎不运动); "1.375" (轻度活动<br>              每周运动1-3次); "1.55" (中度活动<br>              每周运动3-5次); "1.725" (高度活动<br>              每周运动6-7次，高强度); "1.9" (专业运动员<br>              每天高强度训练或体力劳动) |

已检查示例：

```bash
html-tools life/bmr-calculator calculate --age '25' --height '170' --weight '65' --activity '1.2' --json
```

### life/due-date

预产期计算器：预产期计算器，快速计算结果，生活工具，浏览器本地运行无需上传

来源：`html-tools/tools/life/due-date.html`，SHA-256：`020ed1575bf00857b112c0bd3d3ffe1858e1c41d3ebc6d82a135eb54b69561ef`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | ✨ 计算预产期 | dueDateResult, trimesterBadge, weeksResult, daysLeftResult, progressResult, progressText, fetalIcon, fetalTitle, fetalDesc, fetalSize, timeline |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--lmp-date` | 末次月经第一天 | date | "2026-09-04" |  |
| `--cycle-length` | 月经周期（天） | select-one | "28" | "25" (25天); "26" (26天); "27" (27天); "28" (28天（标准周期）); "29" (29天); "30" (30天); "31" (31天); "32" (32天); "35" (35天) |
| `--ultrasound-date` | B超检查日期 | date | "2026-10-30" |  |
| `--ultrasound-weeks` | B超显示孕周 | number | "" | min=4, max=40 |
| `--ultrasound-days` | B超显示天数 | number | "" | min=0, max=6 |
| `--ivf-date` | 移植日期 | date | "2026-09-18" |  |
| `--embryo-type` | 胚胎类型 | select-one | "5" | "3" (D3鲜胚（3天）); "5" (囊胚（5天）); "6" (囊胚（6天）) |

已检查示例：

```bash
html-tools life/due-date calculate --lmp-date '2026-09-04' --cycle-length '28' --ultrasound-date '2026-10-30' --ultrasound-weeks '10' --ultrasound-days '6' --ivf-date '2026-09-18' --embryo-type '5' --json
```

### life/pomodoro

番茄钟：番茄工作法计时器

来源：`html-tools/tools/life/pomodoro.html`，SHA-256：`352deadd69c5bbbb8fb05bc0ffc076b1065a3dbc6e9d5360b8a08a8fc28e96fe`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-display` | updateDisplay | timer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools life/pomodoro update-display  --json
```

### shopping/unit-price

单价对比：比较不同规格商品的单价

来源：`html-tools/tools/shopping/unit-price.html`，SHA-256：`00fe433c9dfd24b4c72d7f3e39d1bfc7286edc28d6d13edf9d91ebd469bf3d47`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | productsList, bestChoice, bestDetail |
| `render` | render | productsList, bestChoice, bestDetail |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--product-input` | 商品名称 | text | "小包装" |  |
| `--product-input-2` | 价格 (元) | number | "" |  |
| `--product-input-3` | 数量 (克) | number | "" |  |
| `--product-input-4` | 商品名称 | text | "大包装" |  |
| `--product-input-5` | 价格 (元) | number | "" |  |
| `--product-input-6` | 数量 (克) | number | "" |  |

已检查示例：

```bash
html-tools shopping/unit-price calculate --product-input '小包装' --product-input-2 '10' --product-input-3 '10' --product-input-4 '大包装' --product-input-5 '10' --product-input-6 '10' --json
```

### social/split-bill

AA制分账：多人聚餐分账计算器

来源：`html-tools/tools/social/split-bill.html`，SHA-256：`4a5326cbbc7528578e68a2253a51ced3402303c712485be82309633c04d39633`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | peopleList, summaryTotal, summaryPeople, summaryAvg, resultList, balanceList |
| `calculate` | calculate | summaryTotal, summaryPeople, summaryAvg, resultList, balanceList |
| `run` | 按字段输入重新计算 | summaryTotal, summaryPeople, summaryAvg, resultList, balanceList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--total-bill` | totalBill | number | "500" | min=0 |
| `--person-name` | person-name | text | "小明" |  |
| `--person-paid` | 已付 | number | "300" | min=0 |
| `--person-name-2` | person-name | text | "小红" |  |
| `--person-paid-2` | 已付 | number | "200" | min=0 |
| `--person-name-3` | person-name | text | "小刚" |  |
| `--person-paid-3` | 已付 | number | "0" | min=0 |
| `--person-name-4` | person-name | text | "小丽" |  |
| `--person-paid-4` | 已付 | number | "0" | min=0 |

已检查示例：

```bash
html-tools social/split-bill render --total-bill '500' --person-name '小明' --person-paid '300' --person-name-2 '小红' --person-paid-2 '200' --person-name-3 '小刚' --person-paid-3 '0' --person-name-4 '小丽' --person-paid-4 '0' --json
```

### social/event-countdown

活动倒计时：重要活动倒计时提醒

来源：`html-tools/tools/social/event-countdown.html`，SHA-256：`1a95ff6c0d953c20dd4a6181864a2d7521957d3bb551e48033dbb8b1d87e5197`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | eventsList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--event-name` | 活动名称 | text | "" |  |
| `--event-date` | 目标日期 | date | "2026-10-31" |  |
| `--event-time` | 目标时间 (可选) | time | "00:00" |  |

已检查示例：

```bash
html-tools social/event-countdown render --event-name 'Hello world
Hello world
TypeScript' --event-date '2026-10-31' --event-time '00:00' --json
```

操作限制：部分原页面操作未通过迁移检查: update-countdowns: 原工具没有产生可输出的结果，请检查参数

### parenting/baby-food

婴儿辅食指南：按月龄的辅食添加指南

来源：`html-tools/tools/parenting/baby-food.html`，SHA-256：`b6aaae309d954116eeed344629fa80563dddfaefc04d51a2af6d3f6ea3cac849`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-age` | updateAge | ageValue, stageBadge, scheduleGrid, foodGrid, tipsList, warningContent |
| `run` | 按字段输入重新计算 | ageValue, stageBadge, scheduleGrid, foodGrid, tipsList, warningContent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--age-slider` | ageSlider | range | "6" | min=4, max=24 |

已检查示例：

```bash
html-tools parenting/baby-food update-age --age-slider '6' --json
```

### diy/paint-calculator

油漆用量计算：根据面积计算油漆用量

来源：`html-tools/tools/diy/paint-calculator.html`，SHA-256：`f6a744c793c8a885914fe92113b65098dc7d149e6cb6d74504ba76b4c121d0de`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | wallsList, totalArea, deductArea, paintArea, totalPaintArea, paintNeeded, totalCost, totalCostExtra, tips |
| `calculate` | calculate | totalArea, deductArea, paintArea, totalPaintArea, paintNeeded, totalCost, totalCostExtra, tips |
| `run` | 按字段输入重新计算 | totalArea, deductArea, paintArea, totalPaintArea, paintNeeded, totalCost, totalCostExtra, tips |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--coats` | 涂刷遍数 | select-one | "2" | "1" (1遍); "2" (2遍); "3" (3遍) |
| `--coverage` | 涂布率 (㎡/L) | number | "10" | min=1, max=20 |
| `--price` | 油漆单价 (元/L) | number | "80" | min=0 |
| `--wall-input` | 涂刷遍数 | number | "4" | min=0 |
| `--wall-input-2` | 涂刷遍数 | number | "2.8" | min=0 |
| `--wall-input-3` | 涂刷遍数 | number | "3" | min=0 |
| `--wall-input-4` | 涂刷遍数 | number | "2.8" | min=0 |
| `--wall-input-5` | 涂刷遍数 | number | "4" | min=0 |
| `--wall-input-6` | 涂刷遍数 | number | "2.8" | min=0 |
| `--wall-input-7` | 涂刷遍数 | number | "3" | min=0 |
| `--wall-input-8` | 涂刷遍数 | number | "2.8" | min=0 |
| `--door-count` | doorCount | number | "1" | min=0 |
| `--window-count` | windowCount | number | "2" | min=0 |
| `--other-deduct` | otherDeduct | number | "0" | min=0 |

已检查示例：

```bash
html-tools diy/paint-calculator render --coats '2' --coverage '10' --price '80' --wall-input '4' --wall-input-2 '2.8' --wall-input-3 '3' --wall-input-4 '2.8' --wall-input-5 '4' --wall-input-6 '2.8' --wall-input-7 '3' --wall-input-8 '2.8' --door-count '1' --window-count '2' --other-deduct '0' --json
```

### weather/feels-like-temp

体感温度计算：考虑风寒和湿度的体感温度

来源：`html-tools/tools/weather/feels-like-temp.html`，SHA-256：`a3e3926823c879109312b7c9863d4e47199b5c0ad6fe78c27da62034238b13fc`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | tempValue, humidityValue, windValue, resultIcon, resultTemp, resultDiff, windChill, heatIndex, tips |
| `run` | 按字段输入重新计算 | tempValue, humidityValue, windValue, resultIcon, resultTemp, resultDiff, windChill, heatIndex, tips |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--temperature` | temperature | range | "25" | min=-40, max=50 |
| `--humidity` | humidity | range | "60" | min=0, max=100 |
| `--wind` | wind | range | "10" | min=0, max=100 |

已检查示例：

```bash
html-tools weather/feels-like-temp calculate --temperature '25' --humidity '60' --wind '10' --json
```

### weather/uv-index

紫外线指数查询：紫外线强度和防护建议

来源：`html-tools/tools/weather/uv-index.html`，SHA-256：`bbfcb6723dd997de8f16ad594508467a1312501ebf9b3a7dd985ccd9ad8ed9ec`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-uv` | updateUV | uvValue, resultIcon, resultLevel, resultDesc, adviceGrid, spfGrid, uvScale |
| `run` | 按字段输入重新计算 | uvValue, resultIcon, resultLevel, resultDesc, adviceGrid, spfGrid, uvScale |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--uv-slider` | uvSlider | range | "5" | min=0, max=11 |

已检查示例：

```bash
html-tools weather/uv-index update-uv --uv-slider '5' --json
```

### astronomy/moon-phase

月相查询：查看任意日期的月相

来源：`html-tools/tools/astronomy/moon-phase.html`，SHA-256：`f3ce69a6b7d9305ef3748e6f7732b30c1b91ab3730d823d877f9464fe457a2d9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 查询 | moonName, moonDate, moonIllumination, moonAge, nextFullMoon, nextNewMoon, phasesList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--date-input` | dateInput | date | "2026-10-30" |  |

已检查示例：

```bash
html-tools astronomy/moon-phase calculate --date-input '2026-10-30' --json
```

### gardening/plant-watering

植物浇水提醒：管理植物浇水时间

来源：`html-tools/tools/gardening/plant-watering.html`，SHA-256：`f86c9186a88737675f697e95cf4c2b7dbecd9c3a3ca69f1587a3f038bf9d37e3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | plantsList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--plant-name` | 植物名称 | text | "" |  |
| `--plant-type` | 植物类型 | select-one | "" | "" (请选择); "观叶植物" (观叶植物 (绿萝、龟背竹)); "多肉植物" (多肉植物 (仙人掌、芦荟)); "开花植物" (开花植物 (月季、茉莉)); "水生植物" (水生植物 (铜钱草、富贵竹)); "其他" (其他) |
| `--water-interval` | 浇水间隔 (天) | number | "3" | min=1, max=30 |

已检查示例：

```bash
html-tools gardening/plant-watering render --plant-name 'Hello world
Hello world
TypeScript' --plant-type '观叶植物' --water-interval '3' --json
```

操作限制：部分原页面操作未通过迁移检查: check-overdue: 原工具没有产生可输出的结果，请检查参数

### shopping/discount-calculator

折扣价格计算器：计算商品折扣价、优惠金额和最终价格

来源：`html-tools/tools/shopping/discount-calculator.html`，SHA-256：`cbae421fb04777bbe46f75c1b934658cb7affe3575a02b2ecda864900d68194b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | displayOriginal, displayDiscount, displaySaved, displayFinal |
| `run` | 按字段输入重新计算 | displayOriginal, displayDiscount, displaySaved, displayFinal |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--original-price` | 原价 (元) | number | "299" | min=0 |
| `--discount-percent` | 折扣 (%) | number | "20" | min=0, max=100 |

已检查示例：

```bash
html-tools shopping/discount-calculator calculate --original-price '299' --discount-percent '20' --json
```

操作限制：部分原页面操作未通过迁移检查: update-active-btn: 原工具没有产生可输出的结果，请检查参数

### life/countdown-timer

Countdown Timer：Countdown Timer，在线使用，生活工具，浏览器本地运行无需上传

来源：`html-tools/tools/life/countdown-timer.html`，SHA-256：`f14a2ea09d2c6eaebfd90f5b75e8102d76b68902d4584a4aade80a5ce7ce8a9a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-display` | updateDisplay | timeDisplay |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--hours` | 小时 | number | "0" | min=0, max=99 |
| `--minutes` | 分钟 | number | "5" | min=0, max=59 |
| `--seconds` | 秒 | number | "0" | min=0, max=59 |

已检查示例：

```bash
html-tools life/countdown-timer update-display --hours '0' --minutes '5' --seconds '0' --json
```

### life/pomodoro-timer

Pomodoro Timer：Pomodoro Timer，在线使用，生活工具，浏览器本地运行无需上传

来源：`html-tools/tools/life/pomodoro-timer.html`，SHA-256：`d9a03479ef8d431dfe62e304641aefc9996895ae11cbdd268f49fa999a6183c2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-display` | updateDisplay | time |
| `update-settings` | updateSettings | time |
| `run` | 按字段输入重新计算 | time |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--work-time` | 请输入数字输入框 | number | "25" | min=1, max=60 |
| `--short-break-time` | 请输入数字输入框 | number | "5" | min=1, max=30 |
| `--long-break-time` | 请输入数字输入框 | number | "15" | min=1, max=60 |

已检查示例：

```bash
html-tools life/pomodoro-timer update-display --work-time '25' --short-break-time '5' --long-break-time '15' --json
```

### life/stopwatch

Stopwatch：Stopwatch，在线使用，生活工具，浏览器本地运行无需上传

来源：`html-tools/tools/life/stopwatch.html`，SHA-256：`56b6fffcc93c2e9ba232f3ca915b3160ae413f034df420854062283b8bf5a1e0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-display` | updateDisplay | minutes, seconds, milliseconds |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools life/stopwatch update-display  --json
```

### life/unit-converter

Unit Converter：Unit Converter，在线使用，生活工具，浏览器本地运行无需上传

来源：`html-tools/tools/life/unit-converter.html`，SHA-256：`8564216255edd085441da0e50ab3df1a27608e65d1dbc1190f2a214371d49143`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | toValue, resultValue, resultUnit |
| `update-quick-list` | updateQuickList | quickList |
| `run` | 按字段输入重新计算 | toValue, resultValue, resultUnit |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--from-value` | 从 | number | "1" |  |
| `--from-unit` | 从 | select-one | "m" | "km" (千米); "m" (米); "cm" (厘米); "mm" (毫米); "mi" (英里); "yd" (码); "ft" (英尺); "in" (英寸) |
| `--to-unit` | 到 | select-one | "cm" | "km" (千米); "m" (米); "cm" (厘米); "mm" (毫米); "mi" (英里); "yd" (码); "ft" (英尺); "in" (英寸) |

已检查示例：

```bash
html-tools life/unit-converter convert --from-value '1' --from-unit 'm' --to-unit 'cm' --json
```

### life/world-clock

World Clock 世界时钟：World Clock 世界时钟，在线使用，生活工具，浏览器本地运行无需上传

来源：`html-tools/tools/life/world-clock.html`，SHA-256：`0dc1dee93ddaa0b00309915cc817210832255dc84296ed76bc8867a820d084bd`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-clocks` | updateClocks | localTime, localDate, localTimezone, clocksGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--city-select` | citySelect | select-one | "" | "" (选择城市...); "America/New_York" (🇺🇸 纽约); "America/Los_Angeles" (🇺🇸 洛杉矶); "America/Chicago" (🇺🇸 芝加哥); "Europe/London" (🇬🇧 伦敦); "Europe/Paris" (🇫🇷 巴黎); "Europe/Berlin" (🇩🇪 柏林); "Europe/Moscow" (🇷🇺 莫斯科); "Asia/Tokyo" (🇯🇵 东京); "Asia/Shanghai" (🇨🇳 上海); "Asia/Hong_Kong" (🇭🇰 香港); "Asia/Singapore" (🇸🇬 新加坡); "Asia/Seoul" (🇰🇷 首尔); "Asia/Dubai" (🇦🇪 迪拜); "Asia/Kolkata" (🇮🇳 孟买); "Australia/Sydney" (🇦🇺 悉尼); "Pacific/Auckland" (🇳🇿 奥克兰); "America/Sao_Paulo" (🇧🇷 圣保罗); "Africa/Cairo" (🇪🇬 开罗) |

已检查示例：

```bash
html-tools life/world-clock update-clocks --city-select 'America/New_York' --json
```

### lifestyle/birthday-reminder

生日提醒器：记录亲友生日，提前提醒，不再错过重要日子

来源：`html-tools/tools/lifestyle/birthday-reminder.html`，SHA-256：`f25559218f584abf60038b8204a2348c759598dbb4e12289465bb834d2b3b224`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | birthdayList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--name` | 姓名 | text | "" |  |
| `--birthday` | birthday | date | "" |  |

已检查示例：

```bash
html-tools lifestyle/birthday-reminder render --name 'Hello world
Hello world
TypeScript' --birthday '2025-01-01' --json
```

### lifestyle/water-intake-tracker

喝水打卡：记录每日饮水量，养成健康喝水习惯

来源：`html-tools/tools/lifestyle/water-intake-tracker.html`，SHA-256：`c12bb172b49b4c22ea6c19f0becb4c077763239e244c9f2693985b685bf56ac7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-goal` | updateGoal | totalAmount, progressGoal, goalInput, historyList |
| `update-display` | updateDisplay | totalAmount, progressGoal, historyList |
| `run` | 按字段输入重新计算 | totalAmount, progressGoal, goalInput, historyList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--goal-input` | 每日目标（ml） | number | "2000" | min=500, max=5000 |

已检查示例：

```bash
html-tools lifestyle/water-intake-tracker update-goal --goal-input '2000' --json
```

### social/gift-idea-tracker

礼物灵感记录：记录亲友喜好和礼物灵感，节日送礼不再烦恼

来源：`html-tools/tools/social/gift-idea-tracker.html`，SHA-256：`b5f1d82463ded9a8c3b17b14f1ee41823fa1430c63b0fa2d1be072d279812c80`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | peopleList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--person-name` | 姓名 | text | "" |  |
| `--relation` | relation | select-one | "家人" | "家人" (家人); "朋友" (朋友); "同事" (同事); "恋人" (恋人); "长辈" (长辈); "晚辈" (晚辈); "其他" (其他) |
| `--interests` | 兴趣爱好（可选） | textarea | "" |  |

已检查示例：

```bash
html-tools social/gift-idea-tracker render --person-name 'Hello world
Hello world
TypeScript' --relation '家人' --interests 'Hello world
Hello world
TypeScript' --json
```

### parenting/growth-tracker

儿童生长曲线：记录孩子身高体重，对照WHO生长曲线，监测生长发育

来源：`html-tools/tools/parenting/growth-tracker.html`，SHA-256：`7f1da5532cacbb038c7e594513dc09a8a55f128b1256b998d61438f4b6e20263`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算百分位 & 保存记录 | heightPercentile, weightPercentile, historyList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--gender` | 性别 | select-one | "male" | "male" (男孩); "female" (女孩) |
| `--age-months` | 年龄（月） | number | "" | min=0, max=240 |
| `--height` | 身高（cm） | number | "" |  |
| `--weight` | 体重（kg） | number | "" |  |

已检查示例：

```bash
html-tools parenting/growth-tracker calculate --gender 'male' --age-months '10' --height '10' --weight '10' --json
```

### weather/uv-index-guide

紫外线指数指南：了解UV指数等级，获取防晒建议，保护皮肤健康

来源：`html-tools/tools/weather/uv-index-guide.html`，SHA-256：`bb53e9d0df2a06eaec9ce90a039ebc5ac19b2d115938f5da113e089aae03a7b6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-from-input` | updateFromInput | uvSlider, uvValue, uvName, uvRange, adviceList |
| `update-from-slider` | updateFromSlider | uvInput, uvValue, uvName, uvRange, adviceList |
| `run` | 按字段输入重新计算 | uvInput, uvSlider, uvValue, uvName, uvRange, adviceList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--uv-input` | 输入 UV 指数（0-15+） | number | "5" | min=0, max=15 |
| `--uv-slider` | 输入 UV 指数（0-15+） | range | "5" | min=0, max=15 |

已检查示例：

```bash
html-tools weather/uv-index-guide update-from-input --uv-input '5' --uv-slider '5' --json
```

### parenting/baby-sleep-tracker

宝宝睡眠记录：记录宝宝睡眠时间，分析睡眠规律

来源：`html-tools/tools/parenting/baby-sleep-tracker.html`，SHA-256：`f9ef90aebc609f2c91559f6e2f1a15577f20b2ebf6ef8f98eafe0cd190cfae97`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | totalToday, countToday, historyList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools parenting/baby-sleep-tracker render  --json
```

操作限制：部分原页面操作未通过迁移检查: update-timer: 原工具没有产生可输出的结果，请检查参数

### life/event-countdown

事件倒计时：重要日期倒计时，纪念日提醒

来源：`html-tools/tools/life/event-countdown.html`，SHA-256：`b733fd3c1a462c854826cf3e12593c71a94719fe3f1019336985c8b0a945bf55`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算倒计时 | result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--event-name` | 事件名称 | text | "" |  |
| `--event-date` | eventDate | date | "" |  |

已检查示例：

```bash
html-tools life/event-countdown calculate --event-name 'Hello world
Hello world
TypeScript' --event-date '2025-01-01' --json
```

### diy/material-calculator

材料用量计算：计算装修、DIY所需材料数量

来源：`html-tools/tools/diy/material-calculator.html`，SHA-256：`c44c6dc06a0401296089b89ba9aefdb21b5a382fa64fb2ad39562a6ddfc925f3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | 计算面积 | result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--length` | 房间长度 (米) | number | "5" |  |
| `--width` | 房间长度 (米) | number | "4" |  |

已检查示例：

```bash
html-tools diy/material-calculator calc --length '5' --width '4' --json
```

### life/music-scale-finder

音阶查找器：选择根音和调式（大调、小调、多利亚等），显示该音阶的全部音符、指板图（吉他/钢琴键盘），并标注和弦级数。

来源：`html-tools/tools/life/music-scale-finder.html`，SHA-256：`f829eecd48bb346c0e994d683448c790a1ac34a274ed36e3d5144c4933ac6684`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | scaleNotesRow, scaleFormula, intervalRow, pianoEl, fretNumbers, fretStrings, chordTableBody |
| `run` | 按字段输入重新计算 | scaleNotesRow, scaleFormula, intervalRow, pianoEl, fretNumbers, fretStrings, chordTableBody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--root-note` | 根音： | select-one | "C" | "C" (C); "C#" (C# / D♭); "D" (D); "D#" (D# / E♭); "E" (E); "F" (F); "F#" (F# / G♭); "G" (G); "G#" (G# / A♭); "A" (A); "A#" (A# / B♭); "B" (B) |
| `--scale-mode` | 调式： | select-one | "major" | "major" (大调 Major (Ionian)); "minor" (自然小调 Natural Minor (Aeolian)); "harmonic_minor" (和声小调 Harmonic Minor); "melodic_minor" (旋律小调 Melodic Minor); "dorian" (多利亚 Dorian); "phrygian" (弗里几亚 Phrygian); "lydian" (利底亚 Lydian); "mixolydian" (混合利底亚 Mixolydian); "locrian" (洛克里亚 Locrian); "pentatonic_major" (五声大调 Major Pentatonic); "pentatonic_minor" (五声小调 Minor Pentatonic); "blues" (布鲁斯 Blues); "whole_tone" (全音阶 Whole Tone); "diminished" (减音阶 Diminished (W-H)) |
| `--note-display` | 音名： | select-one | "sharp" | "sharp" (升号 (#)); "flat" (降号 (♭)) |

已检查示例：

```bash
html-tools life/music-scale-finder render --root-note 'C' --scale-mode 'major' --note-display 'sharp' --json
```

### life/chord-progression-generator

和弦进行生成器：在选定调性中生成常用和弦进行（I-IV-V-I、ii-V-I 等），显示每个和弦的音符，并可切换不同调。

来源：`html-tools/tools/life/chord-progression-generator.html`，SHA-256：`ef0431232debaddfbc29f68d1b31990a0df18a843c51bd0df2a0fd3e1cbe7dc5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | progressionCatalog, progressionGrid, outputText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--sel-key` | selKey | select-one | "C" | "C" (C 大调); "G" (G 大调); "D" (D 大调); "A" (A 大调); "E" (E 大调); "B" (B 大调); "F#" (F# 大调); "F" (F 大调); "Bb" (Bb 大调); "Eb" (Eb 大调); "Ab" (Ab 大调); "Db" (Db 大调); "Gb" (Gb 大调); "Am" (A 小调); "Em" (E 小调); "Bm" (B 小调); "F#m" (F# 小调); "C#m" (C# 小调); "G#m" (G# 小调); "Dm" (D 小调); "Gm" (G 小调); "Cm" (C 小调); "Fm" (F 小调); "Bbm" (Bb 小调); "Ebm" (Eb 小调) |
| `--sel-chord-type` | selChordType | select-one | "triad" | "triad" (三和弦); "seventh" (七和弦) |

已检查示例：

```bash
html-tools life/chord-progression-generator run --sel-key 'C' --sel-chord-type 'triad' --json
```

## math

### math/binary-calculator

Binary Calculator：Binary Calculator，在线使用，数学工具，浏览器本地运行无需上传

来源：`html-tools/tools/math/binary-calculator.html`，SHA-256：`57c81a04a50f94b592ce76ef2dae6376b369905d4c2c2c75dc467d9d3d4f3c90`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | bitsA, bitsB, resultBin, resultDec, resultHex, bitsResult |
| `run` | 按字段输入重新计算 | bitsA, bitsB, resultBin, resultDec, resultHex, bitsResult |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-a` | 请输入文本输入框 | text | "42" |  |
| `--base-a` | baseA | select-one | "10" | "10" (十进制); "2" (二进制); "16" (十六进制) |
| `--input-b` | 请输入文本输入框 | text | "15" |  |
| `--base-b` | baseB | select-one | "10" | "10" (十进制); "2" (二进制); "16" (十六进制) |

已检查示例：

```bash
html-tools math/binary-calculator calculate --input-a '42' --base-a '10' --input-b '15' --base-b '10' --json
```

### math/equation-solver

Equation Solver：Equation Solver，在线使用，数学工具，浏览器本地运行无需上传

来源：`html-tools/tools/math/equation-solver.html`，SHA-256：`24410559f91690cd865b87ff7d7f14ea83a225fcd59dba749024d108428d18e9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `solve` | 求解 | resultValue, resultDetail |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--linear-a` | a = | number | "2" |  |
| `--linear-b` | b = | number | "6" |  |
| `--quad-a` | a = | number | "1" |  |
| `--quad-b` | b = | number | "-5" |  |
| `--quad-c` | c = | number | "6" |  |

已检查示例：

```bash
html-tools math/equation-solver solve --linear-a '2' --linear-b '6' --quad-a '1' --quad-b '-5' --quad-c '6' --json
```

### math/factorial-calculator

Factorial Calculator：Factorial Calculator，在线使用，数学工具，浏览器本地运行无需上传

来源：`html-tools/tools/math/factorial-calculator.html`，SHA-256：`1c0756f01e47f53764774ba8a704ec6b92032ba504cd0b7433787e0c0b862487`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-factorial` | calcFactorial | factResult |
| `calc-permutation` | calcPermutation | permResult |
| `calc-combination` | calcCombination | combResult |
| `calc-double-factorial` | calcDoubleFactorial | dfactResult |
| `run` | 按字段输入重新计算 | factResult, permResult, combResult, dfactResult |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--fact-n` | 请输入数字输入框 | number | "5" | min=0, max=170 |
| `--perm-n` | 请输入数字输入框 | number | "5" | min=0, max=170 |
| `--perm-r` | 请输入数字输入框 | number | "3" | min=0, max=170 |
| `--comb-n` | 请输入数字输入框 | number | "5" | min=0, max=170 |
| `--comb-r` | 请输入数字输入框 | number | "3" | min=0, max=170 |
| `--dfact-n` | 请输入数字输入框 | number | "7" | min=0, max=300 |

已检查示例：

```bash
html-tools math/factorial-calculator calc-factorial --fact-n '5' --perm-n '5' --perm-r '3' --comb-n '5' --comb-r '3' --dfact-n '7' --json
```

### math/fraction-calculator

Fraction Calculator：Fraction Calculator，在线使用，数学工具，浏览器本地运行无需上传

来源：`html-tools/tools/math/fraction-calculator.html`，SHA-256：`a4b8f40177ae8fbd776a5d45975baacd0cdd8b00dc896f50ffac6f939015884e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | result, decimal |
| `run` | 按字段输入重新计算 | result, decimal |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--num1` | 分子 | number | "1" |  |
| `--denom1` | 分母 | number | "2" |  |
| `--num2` | 分子 | number | "1" |  |
| `--denom2` | 分母 | number | "3" |  |
| `--simplify-num` | 分子 | number | "12" |  |
| `--simplify-denom` | 分母 | number | "18" |  |

已检查示例：

```bash
html-tools math/fraction-calculator calculate --num1 '1' --denom1 '2' --num2 '1' --denom2 '3' --simplify-num '12' --simplify-denom '18' --json
```

### math/gcd-lcm-calculator

Gcd Lcm Calculator：Gcd Lcm Calculator，在线使用，数学工具，浏览器本地运行无需上传

来源：`html-tools/tools/math/gcd-lcm-calculator.html`，SHA-256：`810cc10ed270c41664e5df783823e877c0e58dac6ffe7a3d324a448e785ec582`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | gcdResult, lcmResult, stepsContent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--numbers` | 输入数字（用逗号或空格分隔） | text | "12, 18" |  |

已检查示例：

```bash
html-tools math/gcd-lcm-calculator calculate --numbers '12, 18' --json
```

### math/logarithm-calculator

Logarithm Calculator：Logarithm Calculator，在线使用，数学工具，浏览器本地运行无需上传

来源：`html-tools/tools/math/logarithm-calculator.html`，SHA-256：`c1988573ad325c1093bd2f117eb41ddac3ee4922d55e91ebadebec55e34cbf79`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | resultLabel, resultValue, lnVal, lgVal, log2Val |
| `run` | 按字段输入重新计算 | resultLabel, resultValue, lnVal, lgVal, log2Val |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--x` | 真数 x | number | "10" |  |
| `--base` | 底数 b | number | "2" |  |

已检查示例：

```bash
html-tools math/logarithm-calculator calculate --x '10' --base '2' --json
```

### math/number-base-converter

Number Base Converter：Number Base Converter，在线使用，数学工具，浏览器本地运行无需上传

来源：`html-tools/tools/math/number-base-converter.html`，SHA-256：`8d97e71bfe9942ec7127f0539b4a1365c6dc66616083297d78aa30a90898f3ed`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | binary, octal, decimal, hex |
| `run` | 按字段输入重新计算 | binary, octal, decimal, hex |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-value` | 输入数字 | text | "" |  |
| `--input-base` | inputBase | select-one | "10" | "2" (二进制 (2)); "8" (八进制 (8)); "10" (十进制 (10)); "16" (十六进制 (16)) |

已检查示例：

```bash
html-tools math/number-base-converter convert --input-value 'Hello world
Hello world
TypeScript' --input-base '10' --json
```

### math/percentage-calculator

Percentage Calculator：Percentage Calculator，在线使用，数学工具，浏览器本地运行无需上传

来源：`html-tools/tools/math/percentage-calculator.html`，SHA-256：`0511bfe9bad7b4b433d6b6d3f0849129944c590afd391f2f43aef3cf3dd0d833`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc1` | calc1 | result1 |
| `calc2` | calc2 | result2 |
| `calc3` | calc3 | result3 |
| `calc4` | calc4 | result4 |
| `calc5` | calc5 | result5 |
| `calc6` | calc6 | result6 |
| `run` | 按字段输入重新计算 | result1, result2, result3, result4, result5, result6 |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--calc1-x` | 数值 | number | "" |  |
| `--calc1-y` | 百分比 | number | "" |  |
| `--calc2-x` | 部分 | number | "" |  |
| `--calc2-y` | 整体 | number | "" |  |
| `--calc3-x` | 原值 | number | "" |  |
| `--calc3-y` | 现值 | number | "" |  |
| `--calc4-x` | 原价 | number | "" |  |
| `--calc4-y` | 折扣 | number | "8" |  |
| `--calc5-x` | 数值 | number | "" |  |
| `--calc5-y` | 百分比 | number | "" |  |
| `--calc6-x` | 数值 | number | "" |  |
| `--calc6-y` | 百分比 | number | "" |  |

已检查示例：

```bash
html-tools math/percentage-calculator calc1 --calc1-x '10' --calc1-y '10' --calc2-x '10' --calc2-y '10' --calc3-x '10' --calc3-y '10' --calc4-x '10' --calc4-y '8' --calc5-x '10' --calc5-y '10' --calc6-x '10' --calc6-y '10' --json
```

### math/permutation-combination

Permutation Combination：Permutation Combination，在线使用，数学工具，浏览器本地运行无需上传

来源：`html-tools/tools/math/permutation-combination.html`，SHA-256：`886074cde97aa9954b0cba4b18fcd68ee7d7ec93fda3748eb56bcc88c21a7d0b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | formula, resultLabel, resultValue, explanation |
| `run` | 按字段输入重新计算 | formula, resultLabel, resultValue, explanation |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--n` | n (总数) | number | "10" | min=0, max=170 |
| `--r` | r (选取) | number | "3" | min=0, max=170 |

已检查示例：

```bash
html-tools math/permutation-combination calculate --n '10' --r '3' --json
```

### math/prime-checker

Prime Checker：Prime Checker，在线使用，数学工具，浏览器本地运行无需上传

来源：`html-tools/tools/math/prime-checker.html`，SHA-256：`61e0462fcbef002480a7f0a00404454ecf892bd47ab376a7350816ea87798693`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `check` | 检测 | numberDisplay |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--number` | 输入一个正整数 | number | "97" | min=2 |

已检查示例：

```bash
html-tools math/prime-checker check --number '97' --json
```

### math/quadratic-equation

Quadratic Equation：Quadratic Equation，在线使用，数学工具，浏览器本地运行无需上传

来源：`html-tools/tools/math/quadratic-equation.html`，SHA-256：`674ca7bfa316df500666f970c37b5d96bd75c87501606b1a951715246fee836d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `solve` | solve | discriminant, x1, x2, vertex, stepsContainer |
| `run` | 按字段输入重新计算 | discriminant, x1, x2, vertex, stepsContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--a` | 请输入数字输入框 | number | "1" |  |
| `--b` | 请输入数字输入框 | number | "-5" |  |
| `--c` | 请输入数字输入框 | number | "6" |  |

已检查示例：

```bash
html-tools math/quadratic-equation solve --a '1' --b '-5' --c '6' --json
```

### math/statistics-calculator

Statistics Calculator：Statistics Calculator，在线使用，数学工具，浏览器本地运行无需上传

来源：`html-tools/tools/math/statistics-calculator.html`，SHA-256：`baca9b8787076b8234bb78677cbca7ff108c3f3db2fbc8c90d9eb127b84435cf`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算统计指标 | count, sum, mean, median, mode, range, min, max, variance, stddev, sampleVariance, sampleStddev, sortedData, quartiles |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--data-input` | 输入数据 | textarea | "85, 90, 78, 92, 88, 76, 95, 82, 89, 91" |  |

已检查示例：

```bash
html-tools math/statistics-calculator calculate --data-input '85, 90, 78, 92, 88, 76, 95, 82, 89, 91' --json
```

### math/trigonometry-calculator

Trigonometry Calculator：Trigonometry Calculator，在线使用，数学工具，浏览器本地运行无需上传

来源：`html-tools/tools/math/trigonometry-calculator.html`，SHA-256：`1801a90952303ea808155be25b20f225610dd4f6425d9a3597f82c139a64e7ce`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | sinVal, cosVal, tanVal, cscVal, secVal, cotVal |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--angle` | 输入角度 | number | "45" |  |
| `--unit` | unit | select-one | "deg" | "deg" (度 (°)); "rad" (弧度 (rad)) |

已检查示例：

```bash
html-tools math/trigonometry-calculator calculate --angle '45' --unit 'deg' --json
```

### math/unit-circle

Unit Circle：Unit Circle，在线使用，数学工具，浏览器本地运行无需上传

来源：`html-tools/tools/math/unit-circle.html`，SHA-256：`7ea207bd9813405d3d017327bdd48dace96088b7a3ff13f2b25d417e42f2e177`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | coordText, angleSlider, angleInput, radianDisplay, sinValue, cosValue, tanValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--angle-slider` | 角度: | range | "45" | min=0, max=360 |
| `--angle-input` | 角度: | number | "45" | min=0, max=360 |

已检查示例：

```bash
html-tools math/unit-circle run --angle-slider '45' --angle-input '45' --json
```

### math/pi-digits-explorer

圆周率 π 数字查询器：显示圆周率前 N 万位数字，支持搜索特定数字串出现的位置，以及基础统计（各数字频次分布）。

来源：`html-tools/tools/math/pi-digits-explorer.html`，SHA-256：`687f8c317f18f5d230151e33e5343cb872cc37aefe8a6d7e0efc9a3b0ed1a93a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-freq` | updateFreq | freqGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--custom-count` | 自定义位数: | number | "1000" | min=1, max=10000 |

已检查示例：

```bash
html-tools math/pi-digits-explorer update-freq --custom-count '1000' --json
```

操作限制：部分原页面操作未通过迁移检查: search: 请输入要搜索的数字串 | run: 已加载 π 前 10000 位小数

### math/fibonacci-sequence-generator

斐波那契数列生成器：生成斐波那契数列的前 N 项（支持高精度大整数），计算相邻项之比趋近黄金比例的过程，并可视化螺旋图案。

来源：`html-tools/tools/math/fibonacci-sequence-generator.html`，SHA-256：`2c72ea4d7d5e2b86ed3b9a9a072bb4df8973ca510a95956cb3e8f43772652d20`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 | seqInfo, seqOutput, ratioBody, spiralCanvas, statN, statDigits, statPhi |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--fib-count` | 项数 N: | number | "20" | min=1, max=500 |
| `--start-a` | F(1): | number | "0" |  |
| `--start-b` | F(2): | number | "1" |  |

已检查示例：

```bash
html-tools math/fibonacci-sequence-generator generate --fib-count '20' --start-a '0' --start-b '1' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 生成成功，共 20 项

### math/matrix-determinant-inverse

矩阵行列式 / 逆矩阵计算器：计算矩阵的行列式、逆矩阵、转置、特征值（2×2~4×4），显示逐步运算过程。

来源：`html-tools/tools/math/matrix-determinant-inverse.html`，SHA-256：`fcdbdbf90a66233992ad1d7a266991420c79b817de10da509ff1ea571f90ad09`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc` | 计算 | detValue, invContent, transposeContent, eigenContent, stepsContent |
| `calculate` | calculate | detValue, invContent, transposeContent, eigenContent, stepsContent |
| `run` | 按字段输入重新计算 | cell_0_0, cell_0_1, cell_0_2, cell_1_0, cell_1_1, cell_1_2, cell_2_0, cell_2_1, cell_2_2 |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--size-select` | sizeSelect | select-one | "3" | "2" (2 × 2); "3" (3 × 3); "4" (4 × 4) |
| `--prec-select` | precSelect | select-one | "4" | "4" (4 位); "6" (6 位); "8" (8 位) |
| `--cell-0-0` | cell_0_0 | number | "1" |  |
| `--cell-0-1` | cell_0_1 | number | "0" |  |
| `--cell-0-2` | cell_0_2 | number | "0" |  |
| `--cell-1-0` | cell_1_0 | number | "0" |  |
| `--cell-1-1` | cell_1_1 | number | "1" |  |
| `--cell-1-2` | cell_1_2 | number | "0" |  |
| `--cell-2-0` | cell_2_0 | number | "0" |  |
| `--cell-2-1` | cell_2_1 | number | "0" |  |
| `--cell-2-2` | cell_2_2 | number | "1" |  |

已检查示例：

```bash
html-tools math/matrix-determinant-inverse calc --size-select '3' --prec-select '4' --cell-0-0 '1' --cell-0-1 '0' --cell-0-2 '0' --cell-1-0 '0' --cell-1-1 '1' --cell-1-2 '0' --cell-2-0 '0' --cell-2-1 '0' --cell-2-2 '1' --json
```

## media

### media/id-photo

证件照裁剪：裁剪标准尺寸证件照

来源：`html-tools/tools/media/id-photo.html`，SHA-256：`477d34f59d727c7091a6e3bbb91ebcc0b3eddca74327c924a900e0202b4a687e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export` | 💾 下载证件照 | download |
| `update-preview` | updatePreview | previewCanvas |
| `run` | 按字段输入重新计算 | sourceCanvas, previewCanvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools media/id-photo export --file-input 'generated/fixtures/sample.png' --json
```

### media/image-blur

图片模糊：给图片添加模糊效果

来源：`html-tools/tools/media/image-blur.html`，SHA-256：`7ee44ee75cc3b82d7e251a7595a95866a3ac4abaa1d31a1911cfece1960275e9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export` | 💾 下载图片 | download |
| `update-preview` | updatePreview | blurValue, radiusValue, canvas |
| `run` | 按字段输入重新计算 | blurValue, radiusValue, canvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--blur-amount` | blurAmount | range | "10" | min=0, max=50 |
| `--clear-radius` | clearRadius | range | "40" | min=10, max=80 |

已检查示例：

```bash
html-tools media/image-blur export --file-input 'generated/fixtures/sample.png' --blur-amount '10' --clear-radius '40' --json
```

操作限制：部分原页面操作未通过迁移检查: full: 原工具没有产生可输出的结果，请检查参数 | background: 原工具没有产生可输出的结果，请检查参数 | radial: 原工具没有产生可输出的结果，请检查参数

### media/image-border

图片加边框：给图片添加各种边框

来源：`html-tools/tools/media/image-border.html`，SHA-256：`b2a56c115a9ce52d58535b5866b9ac79f542447b8052402723a00ba29b0d6bfc`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export` | 💾 下载图片 | download |
| `update-preview` | updatePreview | borderWidthValue, borderRadiusValue, canvas |
| `run` | 按字段输入重新计算 | borderWidthValue, borderRadiusValue, canvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--border-width` | borderWidth | range | "20" | min=1, max=100 |
| `--border-color` | 边框颜色 | color | "#ffffff" |  |
| `--border-radius` | borderRadius | range | "0" | min=0, max=50 |

已检查示例：

```bash
html-tools media/image-border export --file-input 'generated/fixtures/sample.png' --border-width '20' --border-color '#ffffff' --border-radius '0' --json
```

### media/image-collage

图片拼接：将多张图片拼接在一起

来源：`html-tools/tools/media/image-collage.html`，SHA-256：`bf0e5ade3df808949e25081217bd97a2e6cadfba950282a577dfc68ca403ec40`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export` | 💾 下载图片 | download |
| `update-image-list` | updateImageList | imageList |
| `run` | 按字段输入重新计算 | imageList, canvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--gap` | 图片间距 (px) | number | "0" | min=0, max=100 |
| `--bg-color` | 背景颜色 | color | "#ffffff" |  |
| `--output-width` | 输出宽度 (px, 0=自动) | number | "0" | min=0, max=4000 |

已检查示例：

```bash
html-tools media/image-collage export --file-input 'generated/fixtures/sample.png' --gap '0' --bg-color '#ffffff' --output-width '0' --json
```

操作限制：部分原页面操作未通过迁移检查: generate-preview: 原工具没有产生可输出的结果，请检查参数

### media/image-compressor

图片压缩器：在浏览器中压缩图片

来源：`html-tools/tools/media/image-compressor.html`，SHA-256：`edceda6ceeb78c3edc0793bcebdaeb3d6fb45fb7a8ae49676181aa49ebef9bbc`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export` | 📥 下载压缩图片 | download |
| `update-quality` | updateQuality | qualityValue, savingsValue, compressedSize, compressedImage, compressedWidth, compressedHeight, compressedFormat, canvas |
| `compress` | compress | savingsValue, compressedSize, compressedImage, compressedWidth, compressedHeight, compressedFormat, canvas |
| `run` | 按字段输入重新计算 | qualityValue, savingsValue, originalSize, originalImage, originalWidth, originalHeight, originalFormat, compressedSize, compressedImage, compressedWidth, compressedHeight, compressedFormat, canvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | 选择图片文件 | file | "" |  |
| `--quality` | 压缩质量 | range | "80" | min=10, max=100 |
| `--format` | 输出格式 | select-one | "image/jpeg" | "image/jpeg" (JPEG); "image/png" (PNG); "image/webp" (WebP) |
| `--max-size` | 最大尺寸 | select-one | "0" | "0" (原尺寸); "1920" (1920px); "1280" (1280px); "800" (800px); "640" (640px) |

已检查示例：

```bash
html-tools media/image-compressor export --file-input 'generated/fixtures/sample.png' --quality '80' --format 'image/jpeg' --max-size '0' --json
```

### media/image-cropper

图片裁剪工具：自由裁剪或按比例裁剪图片

来源：`html-tools/tools/media/image-cropper.html`，SHA-256：`6c125babe351f24d35125b1c766924774f4f31b5df335f20ae44bba1c1e68b44`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-crop-box` | updateCropBox | cropSize |
| `run` | 按字段输入重新计算 | cropImage, cropSize |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools media/image-cropper update-crop-box --file-input 'generated/fixtures/sample.png' --json
```

### media/image-filter

图片滤镜：给图片添加各种滤镜效果

来源：`html-tools/tools/media/image-filter.html`，SHA-256：`2eb62b69ecf7a262bf4520ce7e3ce6197114eff6eefd8c8806e201f44131074a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export` | 💾 下载图片 | download |
| `run` | 按字段输入重新计算 | brightnessValue, contrastValue, saturateValue, hueValue, blurValue, opacityValue, canvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--brightness` | brightness | range | "100" | min=0, max=200 |
| `--contrast` | contrast | range | "100" | min=0, max=200 |
| `--saturate` | saturate | range | "100" | min=0, max=200 |
| `--hue` | hue | range | "0" | min=0, max=360 |
| `--blur` | blur | range | "0" | min=0, max=20 |
| `--opacity` | opacity | range | "100" | min=0, max=100 |

已检查示例：

```bash
html-tools media/image-filter export --file-input 'generated/fixtures/sample.png' --brightness '100' --contrast '100' --saturate '100' --hue '0' --blur '0' --opacity '100' --json
```

### media/image-flip

图片翻转：水平或垂直翻转图片

来源：`html-tools/tools/media/image-flip.html`，SHA-256：`91703906dca0ce65ffa9ffb5c64175aaf530bea5521b26acf600eba85fa3648b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export` | 💾 下载图片 | download |
| `run` | 按字段输入重新计算 | originalPreview, canvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools media/image-flip export --file-input 'generated/fixtures/sample.png' --json
```

操作限制：部分原页面操作未通过迁移检查: update-button-states: 原工具没有产生可输出的结果，请检查参数

### media/image-mosaic

图片马赛克：给图片局部添加马赛克

来源：`html-tools/tools/media/image-mosaic.html`，SHA-256：`8a22d7fa1ebdda925a95b2a84155951eb0572341ed73e954c5b08c56d8d3c108`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export` | 💾 下载图片 | download |
| `update-value` | updateValue | blockSizeValue, brushSizeValue |
| `run` | 按字段输入重新计算 | blockSizeValue, brushSizeValue, canvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--block-size` | blockSize | range | "15" | min=5, max=50 |
| `--brush-size` | brushSize | range | "30" | min=10, max=100 |

已检查示例：

```bash
html-tools media/image-mosaic export --file-input 'generated/fixtures/sample.png' --block-size '15' --brush-size '30' --json
```

### media/image-resizer

图片尺寸调整：调整图片的宽高尺寸

来源：`html-tools/tools/media/image-resizer.html`，SHA-256：`121c70bec24edd8631f093138da0eb6e7453b0d45814c60465e5c601bf249931`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export` | 下载调整后的图片 | download |
| `update-new-size` | updateNewSize | newSize |
| `run` | 按字段输入重新计算 | preview, originalSize, newSize, width, height |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--width` | 宽度 (px) | number | "" | min=1 |
| `--height` | 高度 (px) | number | "" | min=1 |
| `--scale` | 缩放比例 (%) | number | "100" | min=1, max=500 |
| `--format` | 输出格式 | select-one | "image/jpeg" | "image/jpeg" (JPEG); "image/png" (PNG); "image/webp" (WebP) |
| `--keep-ratio` / `--no-keep-ratio` | 保持宽高比 | checkbox | true |  |

已检查示例：

```bash
html-tools media/image-resizer export --file-input 'generated/fixtures/sample.png' --width '10' --height '10' --scale '100' --format 'image/jpeg' --keep-ratio --json
```

### media/image-rotate

图片旋转：旋转图片任意角度

来源：`html-tools/tools/media/image-rotate.html`，SHA-256：`47095d4f08cdeacee5794ec66f3f5cb217941444689cd40af5df917cfdd08dbc`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `rotate` | ↺ 左转90° | angle, angleValue, sizeInfo, canvas |
| `export` | 💾 下载图片 | download |
| `update-angle` | updateAngle | angleValue, sizeInfo, canvas |
| `run` | 按字段输入重新计算 | angle, angleValue, sizeInfo, canvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--angle` | angle | range | "0" | min=-180, max=180 |
| `--bg-color` | 透明背景 | color | "#ffffff" |  |
| `--transparent` / `--no-transparent` | 透明背景 | checkbox | false |  |

已检查示例：

```bash
html-tools media/image-rotate rotate --file-input 'generated/fixtures/sample.png' --angle '0' --bg-color '#ffffff' --no-transparent --json
```

### media/image-round-corner

图片圆角：给图片添加圆角

来源：`html-tools/tools/media/image-round-corner.html`，SHA-256：`8486b912ed625047aa02ab05ca9d088e53f6d41a32733fe12ce52bd11d4b904c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export` | 💾 下载图片 | download |
| `update-preview` | updatePreview | radiusValue, canvas |
| `run` | 按字段输入重新计算 | radiusValue, canvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--radius` | radius | range | "30" | min=0, max=500 |
| `--bg-color` | 背景颜色 | color | "#ffffff" |  |
| `--transparent` / `--no-transparent` | 透明背景 (PNG) | checkbox | true |  |

已检查示例：

```bash
html-tools media/image-round-corner export --file-input 'generated/fixtures/sample.png' --radius '30' --bg-color '#ffffff' --transparent --json
```

### media/image-sketch

图片转素描：将图片转换为素描风格

来源：`html-tools/tools/media/image-sketch.html`，SHA-256：`b06660d776e9169ace596798c7e9ac5014fe185257194084def8efbe2b5ff750`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export` | 💾 下载图片 | download |
| `run` | 按字段输入重新计算 | intensityValue, contrastValue, originalPreview, canvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--intensity` | intensity | range | "50" | min=1, max=100 |
| `--contrast` | contrast | range | "100" | min=0, max=200 |

已检查示例：

```bash
html-tools media/image-sketch export --file-input 'generated/fixtures/sample.png' --intensity '50' --contrast '100' --json
```

### media/image-split

图片分割：将图片分割为多块

来源：`html-tools/tools/media/image-split.html`，SHA-256：`ba9c41e7e8301fabfeeee1625c95b90b462722bd5997e768e9f26f384e23210e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `split-image` | ✂️ 分割图片 | resultGrid |
| `run` | 按字段输入重新计算 | preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools media/image-split split-image --file-input 'generated/fixtures/sample.png' --json
```

操作限制：部分原页面操作未通过迁移检查: export-all: 原工具没有产生可输出的结果，请检查参数 | update-grid-overlay: 原工具没有产生可输出的结果，请检查参数

### media/image-text

图片加文字：在图片上添加文字

来源：`html-tools/tools/media/image-text.html`，SHA-256：`301177f9ee995ff46010c327f8751d5106c27fb688308a1d440b3bddd41b383e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export` | 💾 下载图片 | download |
| `update-preview` | updatePreview | canvas |
| `run` | 按字段输入重新计算 | canvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--text-content` | 文字内容 | textarea | "示例文字" |  |
| `--font-family` | 字体 | select-one | "Arial" | "Arial" (Arial); "微软雅黑" (微软雅黑); "宋体" (宋体); "黑体" (黑体); "楷体" (楷体); "Georgia" (Georgia); "Times New Roman" (Times New Roman); "Courier New" (Courier New) |
| `--font-size` | 字体大小 | number | "48" | min=12, max=200 |
| `--font-color` | 字体颜色 | color | "#ffffff" |  |
| `--stroke-width` | 描边宽度 | number | "2" | min=0, max=20 |
| `--stroke-color` | 描边颜色 | color | "#000000" |  |
| `--opacity` | 透明度 | range | "100" | min=0, max=100 |
| `--offset-x` | X偏移 | number | "0" |  |
| `--offset-y` | Y偏移 | number | "0" |  |

已检查示例：

```bash
html-tools media/image-text export --file-input 'generated/fixtures/sample.png' --text-content '示例文字' --font-family 'Arial' --font-size '48' --font-color '#ffffff' --stroke-width '2' --stroke-color '#000000' --opacity '100' --offset-x '0' --offset-y '0' --json
```

### media/base64-image

Base64 图片转换：图片与 Base64 编码互转，支持多种格式

来源：`html-tools/tools/media/base64-image.html`，SHA-256：`3e0d6206382a06821ec836b5afcde6d19abf4d971e6ae89d9ca74ebaeaa8fa74`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-encode-output` | updateEncodeOutput | encodeOutput |
| `run` | 按字段输入重新计算 | encodePreview, encodeInfo, encodeOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--include-prefix` / `--no-include-prefix` | 包含 Data URI 前缀 | checkbox | true |  |
| `--decode-input` | 输出格式 | textarea | "" |  |
| `--output-format` | 输出格式 | select-one | "auto" | "auto" (自动检测); "png" (PNG); "jpeg" (JPEG); "webp" (WebP); "gif" (GIF) |

已检查示例：

```bash
html-tools media/base64-image update-encode-output --file-input 'generated/fixtures/sample.png' --include-prefix --decode-input 'Hello world
Hello world
TypeScript' --output-format 'auto' --json
```

操作限制：部分原页面操作未通过迁移检查: decode-btn: Unsupported image type | decode-base64: Unsupported image type

### media/batch-resize

图片批量调整尺寸：图片批量调整尺寸，在线使用，媒体工具，浏览器本地运行无需上传

来源：`html-tools/tools/media/batch-resize.html`，SHA-256：`6d45b0ee4ac5577a4ebe7622bfd47e0952d1f16ee1374c59323dc4ff0e989b97`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `process-all` | 🚀 批量处理 | totalCount, totalOriginalSize, processedCount |
| `update-all-preview` | updateAllPreview | imageList |
| `update-stats` | updateStats | totalCount, totalOriginalSize, processedCount |
| `run` | 按字段输入重新计算 | qualityValue, totalCount, totalOriginalSize, processedCount, imageList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--resize-mode` | 调整模式 | select-one | "width" | "width" (按宽度); "height" (按高度); "both" (固定尺寸); "percent" (按比例); "longest" (按最长边); "shortest" (按最短边) |
| `--target-width` | 宽度 | number | "800" | min=1, max=10000 |
| `--target-height` | 高度 | number | "600" | min=1, max=10000 |
| `--format` | 调整模式 | radio | "original" | "original" (保持原格式); "jpeg" (JPEG); "png" (PNG); "webp" (WebP) |
| `--quality` | quality | range | "85" | min=1, max=100 |
| `--keep-aspect-ratio` / `--no-keep-aspect-ratio` | 保持宽高比 | checkbox | true |  |
| `--allow-upscale` / `--no-allow-upscale` | 允许放大（可能降低质量） | checkbox | false |  |

已检查示例：

```bash
html-tools media/batch-resize process-all --file-input 'generated/fixtures/sample.png' --resize-mode 'width' --target-width '800' --target-height '600' --format 'original' --quality '85' --keep-aspect-ratio --no-allow-upscale --json
```

操作限制：部分原页面操作未通过迁移检查: export-all: 原工具没有产生可输出的结果，请检查参数

### media/color-extractor

图片颜色提取器：图片颜色提取器，一键提取，媒体工具，浏览器本地运行无需上传

来源：`html-tools/tools/media/color-extractor.html`，SHA-256：`06a187e965bebb9a1ceb52e1ab5a7900a04a54a67fae881f43d40616b0202165`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `extract-colors` | extractColors | paletteGrid |
| `run` | 按字段输入重新计算 | previewImg, paletteGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools media/color-extractor extract-colors --file-input 'generated/fixtures/sample.png' --json
```

### media/image-color-picker

图片颜色提取：图片颜色提取，一键提取，媒体工具，浏览器本地运行无需上传

来源：`html-tools/tools/media/image-color-picker.html`，SHA-256：`5dea4c65001a177bfb8b346ef1e06cb068ad6a30470b2525092de776b16db5f1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `extract-palette-btn` | 🎨 提取主色调 | paletteGrid |
| `run` | 按字段输入重新计算 | mainCanvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools media/image-color-picker extract-palette-btn --file-input 'generated/fixtures/sample.png' --json
```

### media/image-compare

图片对比滑块：图片对比滑块，在线使用，媒体工具，浏览器本地运行无需上传

来源：`html-tools/tools/media/image-compare.html`，SHA-256：`8c91d41246c411072bafab89a0ed522110994e0a062aa4c6476cb7b40cad6339`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-compare` | updateCompare | afterImage, beforeImage, sideBySideBefore, sideBySideAfter |
| `update-zoom` | updateZoom | zoomValue |
| `export-compare` | downloadCompare | download |
| `run` | 按字段输入重新计算 | opacityValue, zoomValue, afterImage, beforeImage, sideBySideBefore, sideBySideAfter |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--before-input` | beforeInput | file | "" |  |
| `--after-input` | afterInput | file | "" |  |
| `--opacity-slider` | 透明度: 50 % | range | "50" | min=0, max=100 |
| `--zoom-slider` | zoomSlider | range | "100" | min=50, max=200 |

已检查示例：

```bash
html-tools media/image-compare update-compare --before-input 'generated/fixtures/sample.png' --after-input 'generated/fixtures/sample.png' --opacity-slider '50' --zoom-slider '100' --json
```

操作限制：部分原页面操作未通过迁移检查: vertical: 原工具没有产生可输出的结果，请检查参数 | horizontal: 原工具没有产生可输出的结果，请检查参数 | blend: 原工具没有产生可输出的结果，请检查参数 | side-by-side: 原工具没有产生可输出的结果，请检查参数 | update-slider: 原工具没有产生可输出的结果，请检查参数

### media/image-crop

图片裁剪：在线裁剪图片，支持自由裁剪和预设比例

来源：`html-tools/tools/media/image-crop.html`，SHA-256：`f6137619280d970ffdf2f957b70fca0c028a174f045195264b8f470e875c1988`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-crop-info` | updateCropInfo | cropInfo, cropSize, cropX, cropY, cropW, cropH |
| `update-preview` | updatePreview | previewCanvas |
| `run` | 按字段输入重新计算 | sourceImage, cropInfo, originalSize, cropSize, fileSize, cropX, cropY, cropW, cropH, previewCanvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--crop-x` | X 坐标 | number | "0" | min=0 |
| `--crop-y` | Y 坐标 | number | "0" | min=0 |
| `--crop-w` | 宽度 | number | "100" | min=1 |
| `--crop-h` | 高度 | number | "100" | min=1 |
| `--output-format` | 输出格式 | select-one | "image/png" | "image/png" (PNG); "image/jpeg" (JPEG); "image/webp" (WebP) |
| `--quality` | 输出质量 (JPEG/WebP) | range | "0.9" | min=0.1, max=1 |

已检查示例：

```bash
html-tools media/image-crop update-crop-info --file-input 'generated/fixtures/sample.png' --crop-x '0' --crop-y '0' --crop-w '100' --crop-h '100' --output-format 'image/png' --quality '0.9' --json
```

### media/image-format-converter

图片格式批量转换：批量转换图片格式，支持 PNG/JPG/WebP/AVIF

来源：`html-tools/tools/media/image-format-converter.html`，SHA-256：`5555e48000cc78a1c8d5f42ec16cc5ad3822bd35e58a083d4ecbfcb208fbc13b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 批量转换 | previewGrid |
| `check-avif-support` | checkAVIFSupport | value |
| `convert-all` | convertAll | previewGrid |
| `run` | 按字段输入重新计算 | qualityValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--output-format` | 输出格式 | select-one | "jpeg" | "jpeg" (JPEG); "png" (PNG); "webp" (WebP); "avif" (AVIF) |
| `--quality` | quality | range | "85" | min=10, max=100 |
| `--max-width` | 最大宽度 (px，0为不限制) | number | "0" | min=0 |
| `--max-height` | 最大高度 (px，0为不限制) | number | "0" | min=0 |

已检查示例：

```bash
html-tools media/image-format-converter convert --file-input 'generated/fixtures/sample.png' --output-format 'jpeg' --quality '85' --max-width '0' --max-height '0' --json
```

操作限制：部分原页面操作未通过迁移检查: export-all-as-zip: 没有可下载的文件

### media/image-pixelate

图片像素化/马赛克：为图片添加像素化或马赛克效果

来源：`html-tools/tools/media/image-pixelate.html`，SHA-256：`deb6c6349e1d4609d60c5ae73c005f2cd182d0ca16c8bf0c4fd15dbe2e1e9185`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-image` | 💾 下载图片 | download |
| `update-preview` | updatePreview | intensityVal |
| `run` | 按字段输入重新计算 | intensityVal, brushSizeVal, previewCanvas, imageDimensions, imageSize |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--intensity` | intensity | range | "10" | min=2, max=50 |
| `--region-mode` / `--no-region-mode` | 局部处理模式 | checkbox | false |  |
| `--brush-size` | brushSize | range | "30" | min=10, max=100 |

已检查示例：

```bash
html-tools media/image-pixelate export-image --file-input 'generated/fixtures/sample.png' --intensity '10' --no-region-mode --brush-size '30' --json
```

### media/image-resize

图片压缩对比：比较不同质量设置下的图片压缩效果

来源：`html-tools/tools/media/image-resize.html`，SHA-256：`5a7cdf0ea73cf526966c15e61dbc9f8b9df5633b02f1d9650632e35475b34c40`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `process-image` | 压缩图片 | originalSizeStat, compressedSizeStat, savedStat, ratioStat, originalInfo, compressedInfo, compressedPreview |
| `export-compressed` | 下载压缩图片 | download |
| `run` | 按字段输入重新计算 | qualityValue, originalSizeStat, compressedSizeStat, savedStat, ratioStat, originalInfo, originalPreview, compressedInfo, compressedPreview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--quality` | 压缩质量: 80% | range | "80" | min=1, max=100 |
| `--max-width` | 最大宽度 (px) | number | "1920" | min=1, max=8192 |
| `--max-height` | 最大高度 (px) | number | "1080" | min=1, max=8192 |
| `--keep-ratio` / `--no-keep-ratio` | 保持宽高比 | checkbox | true |  |

已检查示例：

```bash
html-tools media/image-resize process-image --file-input 'generated/fixtures/sample.png' --quality '80' --max-width '1920' --max-height '1080' --keep-ratio --json
```

### media/image-to-ascii

图片转 ASCII 艺术：图片转 ASCII 字符画

来源：`html-tools/tools/media/image-to-ascii.html`，SHA-256：`14ffb89ec22b69c87f81ae90320c589bf3078b82270acbb1870446bd503e1f37`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-ascii` | 下载为文本 | download |
| `convert` | convert | asciiOutput |
| `run` | 按字段输入重新计算 | originalImg, asciiOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--width` | 输出宽度 | number | "100" | min=20, max=300 |
| `--charset` | 字符集 | select-one | "standard" | "standard" (标准 (@%#*+=-:. )); "simple" (简单 (#=-. )); "blocks" (方块 (█▓▒░ )); "detailed" (详细<br>                  ($@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,"^`. )) |
| `--invert` | 反色 | select-one | "no" | "no" (否); "yes" (是) |

已检查示例：

```bash
html-tools media/image-to-ascii export-ascii --file-input 'generated/fixtures/sample.png' --width '100' --charset 'standard' --invert 'no' --json
```

### media/image-watermark

图片水印：为图片添加文字或图片水印，支持平铺

来源：`html-tools/tools/media/image-watermark.html`，SHA-256：`7313ffd5a6ab427da76f5bbcf6460894ea858338b977c490e6f5efb0439d959f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | previewCanvas, fontSizeValue, strokeWidthValue, watermarkScaleValue, opacityValue, rotationValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--watermark-text` | 水印文字 | textarea | "© WebUtils" |  |
| `--font-family` | 字体 | select-one | "Arial" | "Arial" (Arial); "Helvetica" (Helvetica); "Georgia" (Georgia); "Times New Roman" (Times New Roman); "Courier New" (Courier New); "Impact" (Impact); "Comic Sans MS" (Comic Sans MS) |
| `--font-size` | fontSize | range | "48" | min=12, max=200 |
| `--text-color` | 文字颜色 | color | "#ffffff" |  |
| `--stroke-color` | 描边颜色 | color | "#000000" |  |
| `--stroke-width` | strokeWidth | range | "2" | min=0, max=10 |
| `--watermark-image-input` | 水印图片 | file | "" |  |
| `--watermark-scale` | watermarkScale | range | "20" | min=5, max=100 |
| `--opacity` | opacity | range | "0.7" | min=0.1, max=1 |
| `--rotation` | rotation | range | "0" | min=-180, max=180 |
| `--tile-mode` / `--no-tile-mode` | 平铺水印 | checkbox | false |  |

已检查示例：

```bash
html-tools media/image-watermark run --file-input 'generated/fixtures/sample.png' --watermark-text '© WebUtils' --font-family 'Arial' --font-size '48' --text-color '#ffffff' --stroke-color '#000000' --stroke-width '2' --watermark-image-input 'generated/fixtures/sample.png' --watermark-scale '20' --opacity '0.7' --rotation '0' --no-tile-mode --json
```

### media/screenshot-beautifier

截图美化工具：给截图添加精美背景、阴影和圆角，一键生成分享图片

来源：`html-tools/tools/media/screenshot-beautifier.html`，SHA-256：`5066bb525e747982553911ba9ee0d58ff8ab417fddbc8767df655040e9381453`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | preview-canvas |
| `export-image` | downloadImage | message, download |
| `run` | 按字段输入重新计算 | padding-value, radius-value, shadow-value, scale-value, preview-canvas, message |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--bg-color` | 自定义颜色 | color | "#667eea" |  |
| `--padding` | 边距大小 64px | range | "64" | min=16, max=128 |
| `--border-radius` | 圆角大小 12px | range | "12" | min=0, max=32 |
| `--shadow` | 阴影强度 30% | range | "30" | min=0, max=100 |
| `--scale` | 图片缩放 100% | range | "100" | min=50, max=150 |
| `--output-format` | 输出格式 | select-one | "png" | "png" (PNG (透明背景支持)); "jpeg" (JPEG (更小文件)); "webp" (WebP (现代格式)) |
| `--file-input` | 渐变预设 | file | "" |  |

已检查示例：

```bash
html-tools media/screenshot-beautifier render --bg-color '#667eea' --padding '64' --border-radius '12' --shadow '30' --scale '100' --output-format 'png' --file-input 'generated/fixtures/sample.png' --json
```

### media/svg-editor

SVG 编辑器：SVG 编辑器，在线编辑，媒体工具，浏览器本地运行无需上传

来源：`html-tools/tools/media/svg-editor.html`，SHA-256：`73cb0ad525decdcc575aeff50baf8b30f5582d4a10d1d73d1eff0876e260706e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format-svg` | 📐 格式化 | svgEditor |
| `update-preview` | updatePreview | previewInfo |
| `update-colors` | updateColors | svgEditor, previewInfo |
| `run` | 按字段输入重新计算 | svgEditor, previewInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--fill-color` | 填充色 | color | "#3b82f6" |  |
| `--stroke-color` | 描边色 | color | "#1e40af" |  |
| `--stroke-width` | 描边宽 | number | "2" | min=0, max=20 |
| `--svg-editor` | 输入 SVG 代码... | textarea | "<svg viewBox=\"0 0 100 100\"\n  xmlns=\"http://www.w3.org/2000/svg\">\n<circle cx=\"50\"\n  cy=\"50\"\n  r=\"40\"\n  fill=\"#3b82f6\"\n  stroke=\"#1e40af\"\n  stroke-width=\"2\"/>\n</svg>" |  |

已检查示例：

```bash
html-tools media/svg-editor format-svg --fill-color '#3b82f6' --stroke-color '#1e40af' --stroke-width '2' --svg-editor '<svg viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
<circle cx="50"
  cy="50"
  r="40"
  fill="#3b82f6"
  stroke="#1e40af"
  stroke-width="2"/>
</svg>' --json
```

### media/svg-placeholder

SVG 占位图生成器 | HTML Tools：SVG 占位图生成

来源：`html-tools/tools/media/svg-placeholder.html`，SHA-256：`5a931c493731f841aecf0ffe3a43894856496392542b21fc9221740d9fa31d16`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-svg` | generateSvg | value |
| `update-preview` | updatePreview | preview, output |
| `update-output` | updateOutput | output |
| `run` | 按字段输入重新计算 | bgColor, bgColorPicker, textColor, textColorPicker, preview, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--width` | 宽度 | number | "400" | min=1, max=4000 |
| `--height` | 高度 | number | "300" | min=1, max=4000 |
| `--bg-color` | bgColor | text | "#cccccc" |  |
| `--bg-color-picker` | bgColorPicker | color | "#cccccc" |  |
| `--text-color` | textColor | text | "#666666" |  |
| `--text-color-picker` | textColorPicker | color | "#666666" |  |
| `--text` | 显示文字 | text | "" |  |
| `--font-size` | 字体大小 | number | "0" | min=0, max=200 |

已检查示例：

```bash
html-tools media/svg-placeholder generate-svg --width '400' --height '300' --bg-color '#cccccc' --bg-color-picker '#cccccc' --text-color '#666666' --text-color-picker '#666666' --text 'Hello world
Hello world
TypeScript' --font-size '0' --json
```

### media/svg-render

SVG 渲染器：将 SVG 代码渲染为 PNG/JPEG 图片

来源：`html-tools/tools/media/svg-render.html`，SHA-256：`ce49341cc33832b99872dc0dfb2bd7b618ced7d1c54931fb884592fde1d64c44`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | preview, exportSize |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--svg-input` | 在此粘贴 SVG 代码... 例如: <svg width="100" height="100"> <circle cx="50" cy="50" r="40" fill="#00d4aa"/> </svg> | textarea | "" |  |
| `--export-width` | 导出宽度 (px) | number | "512" | min=1, max=4096 |
| `--export-height` | 导出高度 (px) | number | "512" | min=1, max=4096 |
| `--export-format` | 格式 | select-one | "png" | "png" (PNG); "jpeg" (JPEG); "webp" (WebP) |
| `--bg-color` | 背景颜色 | color | "#ffffff" |  |
| `--transparent-bg` / `--no-transparent-bg` | 透明背景 | checkbox | true |  |
| `--show-checkerboard` / `--no-show-checkerboard` | 显示棋盘格 | checkbox | true |  |
| `--jpeg-quality` | JPEG 质量 | number | "90" | min=1, max=100 |

已检查示例：

```bash
html-tools media/svg-render run --svg-input 'Hello world
Hello world
TypeScript' --export-width '512' --export-height '512' --export-format 'png' --bg-color '#ffffff' --transparent-bg --show-checkerboard --jpeg-quality '90' --json
```

操作限制：部分原页面操作未通过迁移检查: generate-image-data: Invalid SVG image

### media/svg-to-png

SVG 转 PNG：将 SVG 矢量图转换为 PNG 位图格式

来源：`html-tools/tools/media/svg-to-png.html`，SHA-256：`2b25d19a66cb599a3957f13531cb5e69b4a5469d45fe36009d60d0f6fcb77170`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-output-size` | updateOutputSize | outputSize |
| `run` | 按字段输入重新计算 | outputWidth, outputHeight, scaleValue, previewContainer, originalSize, outputSize, successMessage |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--svg-code` | 在此粘贴 SVG 代码... 例如: <svg width='100' height='100'> <circle cx='50' cy='50' r='40' fill='red'/> </svg> | textarea | "" |  |
| `--svg-url` | SVG URL 地址 | url | "" |  |
| `--output-width` | 输出宽度 (px) | number | "512" | min=1, max=8192 |
| `--output-height` | 输出高度 (px) | number | "512" | min=1, max=8192 |
| `--keep-ratio` / `--no-keep-ratio` | 保持宽高比 | checkbox | true |  |
| `--scale-slider` | scaleSlider | range | "1" | min=0.1, max=4 |
| `--bg-color` | 透明背景 | color | "#ffffff" |  |
| `--transparent-bg` / `--no-transparent-bg` | 透明背景 | checkbox | true |  |

已检查示例：

```bash
html-tools media/svg-to-png update-output-size --file-input 'generated/fixtures/sample.svg' --svg-code 'Hello world
Hello world
TypeScript' --svg-url 'https://example.com/path?a=1' --output-width '512' --output-height '512' --keep-ratio --scale-slider '1' --bg-color '#ffffff' --transparent-bg --json
```

操作限制：部分原页面操作未通过迁移检查: convert-to-png: Cannot read properties of null (reading 'getContext') | export-png: 请先转换为 PNG

### media/text-to-image

文字转图片：文字转图片，在线使用，媒体工具，浏览器本地运行无需上传

来源：`html-tools/tools/media/text-to-image.html`，SHA-256：`a18c264c9a3760df58b9e6a50831a8ebdc87e7fbe08a18232af7c0e14c5c4ee5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-image-png` | 📥 下载 PNG | download |
| `export-image-jpg` | 📥 下载 JPG | download |
| `update-preview` | updatePreview | fontSizeValue, lineHeightValue, paddingValue, canvas, sizeInfo |
| `run` | 按字段输入重新计算 | fontSizeValue, textColor, textColorText, bgColor, bgColorText, lineHeightValue, paddingValue, canvas, sizeInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-input` | 输入文字 | textarea | "Hello World\n你好，世界" |  |
| `--font-family` | 字体 | select-one | "sans-serif" | "sans-serif" (无衬线 (Sans-serif)); "serif" (衬线 (Serif)); "monospace" (等宽 (Monospace)); "cursive" (手写 (Cursive)); "'Microsoft YaHei', sans-serif" (微软雅黑); "'SimSun', serif" (宋体); "'KaiTi', serif" (楷体); "'Arial', sans-serif" (Arial); "'Georgia', serif" (Georgia); "'Courier New', monospace" (Courier New) |
| `--font-size` | fontSize | range | "48" | min=12, max=120 |
| `--text-color` | textColor | color | "#ffffff" |  |
| `--text-color-text` | 请输入文本输入框 | text | "#ffffff" |  |
| `--bg-color` | bgColor | color | "#1a1a2e" |  |
| `--bg-color-text` | 请输入文本输入框 | text | "#1a1a2e" |  |
| `--line-height` | lineHeight | range | "1.5" | min=1, max=3 |
| `--padding` | padding | range | "40" | min=0, max=100 |
| `--text-align` | 文字对齐 | select-one | "center" | "left" (左对齐); "center" (居中); "right" (右对齐) |

已检查示例：

```bash
html-tools media/text-to-image export-image-png --text-input 'Hello World
你好，世界' --font-family 'sans-serif' --font-size '48' --text-color '#ffffff' --text-color-text '#ffffff' --bg-color '#1a1a2e' --bg-color-text '#1a1a2e' --line-height '1.5' --padding '40' --text-align 'center' --json
```

### media/video-thumbnail

视频缩略图提取器：视频缩略图提取器，一键提取，媒体工具，浏览器本地运行无需上传

来源：`html-tools/tools/media/video-thumbnail.html`，SHA-256：`3cf78dd6fdab2f25c0d190864ba376024ab12ae2b19214a5acccc98fede1f72e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | qualityValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--size-mode` | 输出尺寸 | select-one | "original" | "original" (原始尺寸); "custom" (自定义尺寸); "720p" (720p (1280×720)); "1080p" (1080p (1920×1080)); "480p" (480p (854×480)) |
| `--custom-width` | 请输入数字输入框 | number | "1280" | min=1 |
| `--custom-height` | 请输入数字输入框 | number | "720" | min=1 |
| `--keep-aspect-ratio` / `--no-keep-aspect-ratio` | 保持宽高比 | checkbox | true |  |
| `--output-format` | 输出格式 | select-one | "png" | "png" (PNG (无损)); "jpeg" (JPEG); "webp" (WebP) |
| `--quality` | 质量: 90% | range | "90" | min=1, max=100 |
| `--batch-mode` | 提取模式 | select-one | "interval" | "interval" (按时间间隔); "count" (按数量均分); "keyframes" (场景变化检测) |
| `--interval` | 时间间隔 (秒) | number | "5" | min=0.1 |
| `--count` | 提取数量 | number | "10" | min=1, max=100 |

已检查示例：

```bash
html-tools media/video-thumbnail run --file-input 'generated/fixtures/sample.png' --size-mode 'original' --custom-width '1280' --custom-height '720' --keep-aspect-ratio --output-format 'png' --quality '90' --batch-mode 'interval' --interval '5' --count '10' --json
```

操作限制：部分原页面操作未通过迁移检查: export-selected: 原工具没有产生可输出的结果，请检查参数 | export-all: 原工具没有产生可输出的结果，请检查参数 | detect-scene-changes: 原工具没有产生可输出的结果，请检查参数

### media/pdf-merge

PDF合并工具：在线合并多个PDF文件，支持拖拽排序，完全本地处理

来源：`html-tools/tools/media/pdf-merge.html`，SHA-256：`42e4d89e7691ab5103ad172b9226994cba1bab2ed7401d6f4601256ee295f5ab`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | fileCount, fileList, statFiles, statPages, statSize, statEstimate |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools media/pdf-merge run --file-input 'generated/fixtures/sample.pdf' --json
```

操作限制：部分原页面操作未通过迁移检查: merge-btn: Cannot set properties of null (setting 'textContent')

### media/pdf-split

PDF拆分工具：按页码范围或每N页拆分PDF，页面预览，本地处理

来源：`html-tools/tools/media/pdf-split.html`，SHA-256：`af0a9884c4f796a0615fd6997f2a949c177fa6ffb2380df8cad1791e06a7b125`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `select` | 选择页面 | statTotal, statSelected, statOutput |
| `range` | 页码范围 | statTotal, statSelected, statOutput |
| `every` | 每N页 | statTotal, statSelected, statOutput |
| `run` | 按字段输入重新计算 | fileName, fileMeta, pageCount, pageGrid, statTotal, statSelected, statOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--range-input` | 输入页码范围 (如: 1-5, 8, 10-15) | text | "" |  |
| `--every-n-input` | 每隔N页拆分为一个文件 | number | "1" | min=1 |

已检查示例：

```bash
html-tools media/pdf-split select --file-input 'generated/fixtures/sample.pdf' --range-input 'Hello world
Hello world
TypeScript' --every-n-input '1' --json
```

操作限制：部分原页面操作未通过迁移检查: split-btn: Cannot read properties of null (reading 'classList')

### media/pdf-compress

PDF 压缩工具：在线 PDF 压缩工具，纯前端处理，文件不上传服务器

来源：`html-tools/tools/media/pdf-compress.html`，SHA-256：`eaaae3d16c32f3bbfc7584bdde9c4a78377a5ccd2a41e68c6aaf3be3efe4adb5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | fileName, fileSize, pageCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools media/pdf-compress run --file-input 'generated/fixtures/sample.pdf' --json
```

操作限制：部分原页面操作未通过迁移检查: compress-pdf: `pdf` must be of type `string` or `Uint8Array` or `ArrayBuffer`, but was actually of type `NaN` | export-compressed: 原工具没有产生可输出的结果，请检查参数

### media/color-picker-image

图片取色器：图片取色器，在线使用，媒体工具，浏览器本地运行无需上传

来源：`html-tools/tools/media/color-picker-image.html`，SHA-256：`c565ba2242400a1135faea0b4202dcb434cb258ea3dfbce0fa353eada4e0a7b5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | imageCanvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--magnifier-toggle` / `--no-magnifier-toggle` | 放大镜 | checkbox | true |  |

已检查示例：

```bash
html-tools media/color-picker-image run --file-input 'generated/fixtures/sample.png' --magnifier-toggle --json
```

### media/image-filters

图片滤镜编辑器：图片滤镜编辑器，在线编辑，媒体工具，浏览器本地运行无需上传

来源：`html-tools/tools/media/image-filters.html`，SHA-256：`b474559628fad7a6dab88e0929475b3eadc26bf45e44c9e5e1f605f3431459f8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-image` | 💾 下载 | download |
| `run` | 按字段输入重新计算 | originalCanvas, imageCanvas, brightnessValue, brightness, contrastValue, contrast, saturationValue, saturation, temperatureValue, temperature, hueValue, hue, blurValue, blur, sharpenValue, sharpen, vignetteValue, vignette |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--brightness` | 亮度 0 | range | "0" | min=-100, max=100 |
| `--contrast` | 对比度 0 | range | "0" | min=-100, max=100 |
| `--saturation` | 饱和度 0 | range | "0" | min=-100, max=100 |
| `--temperature` | 色温 0 | range | "0" | min=-100, max=100 |
| `--hue` | 色调 0 ° | range | "0" | min=0, max=360 |
| `--blur` | 模糊 0 | range | "0" | min=0, max=20 |
| `--sharpen` | 锐化 0 | range | "0" | min=0, max=100 |
| `--vignette` | 暗角 0 | range | "0" | min=0, max=100 |

已检查示例：

```bash
html-tools media/image-filters export-image --file-input 'generated/fixtures/sample.png' --brightness '0' --contrast '0' --saturation '0' --temperature '0' --hue '0' --blur '0' --sharpen '0' --vignette '0' --json
```

### media/image-stitcher

图片拼接器：图片拼接器，在线使用，媒体工具，浏览器本地运行无需上传

来源：`html-tools/tools/media/image-stitcher.html`，SHA-256：`2186d02b64aab7a5ec506dfddc9a556627600965a47e090f86693b3fd2b3b71f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | 🔄 刷新预览 | statCount, statSize, statFileSize |
| `export-image` | 💾 下载图片 | download |
| `run` | 按字段输入重新计算 | imageList, qualityGroup, statCount, statSize, statFileSize |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--direction` | 拼接方向 | radio | "horizontal" | "horizontal" (↔️ 横向); "vertical" (↕️ 纵向); "grid" (⊞ 网格) |
| `--grid-cols` | 网格列数 | number | "2" | min=1, max=10 |
| `--spacing` | 图片间距 (px) | range | "0" | min=0, max=50 |
| `--bg-color` | 透明背景 | color | "#ffffff" |  |
| `--transparent` / `--no-transparent` | 透明背景 | checkbox | false |  |
| `--resize` | 拼接方向 | radio | "none" | "none" (保持原尺寸); "width" (统一宽度); "height" (统一高度) |
| `--output-format` | 输出格式 | select-one | "png" | "png" (PNG (无损)); "jpeg" (JPEG (压缩)); "webp" (WebP (高效)) |
| `--quality` | 输出质量 | range | "92" | min=1, max=100 |

已检查示例：

```bash
html-tools media/image-stitcher update-preview --file-input 'generated/fixtures/sample.png' --direction 'horizontal' --grid-cols '2' --spacing '0' --bg-color '#ffffff' --no-transparent --resize 'none' --output-format 'png' --quality '92' --json
```

### media/color-picker

颜色选择器(媒体)：选择和转换颜色

来源：`html-tools/tools/media/color-picker.html`，SHA-256：`2febaef98431cf009fdc783f16a36234d697f212e2d1e6154d171538cc75a38c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-color` | updateColor | hex, rgb, hsl |
| `run` | 按字段输入重新计算 | hex, rgb, hsl |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--color-picker` | colorPicker | color | "#667eea" |  |

已检查示例：

```bash
html-tools media/color-picker update-color --color-picker '#667eea' --json
```

### photography/exposure-calc

曝光计算器：计算相机曝光参数组合

来源：`html-tools/tools/photography/exposure-calc.html`，SHA-256：`998b833924fd56880a1ba7a43e92bbd802ff32aa1f6b6e77875d0a9527692247`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | apertureValue, shutterValue, isoValue, evValue, equivalentList |
| `run` | 按字段输入重新计算 | apertureValue, shutterValue, isoValue, evValue, equivalentList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--aperture` | aperture | select-one | "2.8" | "1" (f/1); "1.4" (f/1.4); "2" (f/2); "2.8" (f/2.8); "4" (f/4); "5.6" (f/5.6); "8" (f/8); "11" (f/11); "16" (f/16); "22" (f/22) |
| `--shutter` | shutter | select-one | "0.008" | "30" (30s); "15" (15s); "8" (8s); "4" (4s); "2" (2s); "1" (1s); "0.5" (1/2); "0.25" (1/4); "0.125" (1/8); "0.0625" (1/15); "0.03333" (1/30); "0.01667" (1/60); "0.008" (1/125); "0.004" (1/250); "0.002" (1/500); "0.001" (1/1000); "0.0005" (1/2000); "0.00025" (1/4000); "0.000125" (1/8000) |
| `--iso` | iso | select-one | "100" | "50" (50); "100" (100); "200" (200); "400" (400); "800" (800); "1600" (1600); "3200" (3200); "6400" (6400); "12800" (12800); "25600" (25600) |

已检查示例：

```bash
html-tools photography/exposure-calc calculate --aperture '2.8' --shutter '0.008' --iso '100' --json
```

### photography/golden-hour

黄金时刻计算器：计算摄影黄金时刻和蓝调时刻

来源：`html-tools/tools/photography/golden-hour.html`，SHA-256：`584606bbd304d71e5dcc1e5d9d197074900d8b1ff91ca066286608a1439cdcde`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | timeline |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--latitude` | 纬度 | number | "39.9" | min=-90, max=90 |
| `--longitude` | 经度 | number | "116.4" | min=-180, max=180 |
| `--date` | 日期 | date | "2026-10-30" |  |

已检查示例：

```bash
html-tools photography/golden-hour calculate --latitude '39.9' --longitude '116.4' --date '2026-10-30' --json
```

### media/pdf-to-image

PDF 转图片：将 PDF 每一页导出为 PNG 或 JPG 图片，可调清晰度，纯本地处理

来源：`html-tools/tools/media/pdf-to-image.html`，SHA-256：`bf19a3968c4273403b51bcfe8792ab0f5c1271a49b4c2ec4244223b99afdfd67`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 转换全部页 | progressText, pagesGrid |
| `convert-all` | convertAll | progressText, pagesGrid |
| `run` | 按字段输入重新计算 | pagesLabel |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--sel-format` | selFormat | select-one | "png" | "png" (PNG); "jpg" (JPG) |
| `--sel-scale` | selScale | select-one | "2" | "1" (1x（标准）); "2" (2x（高清）); "3" (3x（超清）) |

已检查示例：

```bash
html-tools media/pdf-to-image convert --file-input 'generated/fixtures/sample.pdf' --sel-format 'png' --sel-scale '2' --json
```

## network

### network/dns-lookup

DNS 记录查询工具：DNS 记录查询工具，在线使用，网络工具，浏览器本地运行无需上传

来源：`html-tools/tools/network/dns-lookup.html`，SHA-256：`9818471299352dd4df03ac0aa5c39dcd3f9943295afeb1c5e46c80483fbf590e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `lookup-dns` | 查询 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--domain-input` | 输入域名，如 example.com | text | "google.com" |  |

已检查示例：

```bash
html-tools network/dns-lookup lookup-dns --domain-input 'google.com' --json
```

操作限制：部分原页面操作未通过迁移检查: a: 原工具没有产生可输出的结果，请检查参数 | aaaa: 原工具没有产生可输出的结果，请检查参数 | cname: 原工具没有产生可输出的结果，请检查参数 | mx: 原工具没有产生可输出的结果，请检查参数 | ns: 原工具没有产生可输出的结果，请检查参数 | txt: 原工具没有产生可输出的结果，请检查参数 | soa: 原工具没有产生可输出的结果，请检查参数

### network/http-header-parser

HTTP 头解析器：HTTP 请求头解析

来源：`html-tools/tools/network/http-header-parser.html`，SHA-256：`a84d0c522fe19a7b2d15e2483f44e5aba978d5b315494f88aec59b91ffb1e161`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse` | 解析 | securityGrid, tbody |
| `run` | 按字段输入重新计算 | securityGrid, tbody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 粘贴原始 HTTP 头... 示例请求头: GET /api/data HTTP/1.1 Host: example.com User-Agent: Mozilla/5.0 Accept: application/json 示例响应头: HTTP/1.1 200 OK Content-Type: application/json Cache-Control: | textarea | "" |  |

已检查示例：

```bash
html-tools network/http-header-parser parse --input 'Content-Type: application/json
Cache-Control: no-cache' --json
```

### network/ip-calculator

IP 地址计算器：计算 IP 子网、网络地址、广播地址等

来源：`html-tools/tools/network/ip-calculator.html`，SHA-256：`29007d1d21d5d0d5ab107c7120af36e9f0440a626c66de6fe7e6212a6aba0996`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--ip-input` | IP 地址 | text | "192.168.1.100" |  |
| `--mask-input` | CIDR / 掩码 | text | "/24" |  |

已检查示例：

```bash
html-tools network/ip-calculator calculate --ip-input '192.168.1.100' --mask-input '/24' --json
```

### network/ip-lookup

IP 地址查询：查询 IP 地址的地理位置信息

来源：`html-tools/tools/network/ip-lookup.html`，SHA-256：`f5ed7961df9763fe199f4c0e405c777949106d27d0d1817838502977e21178f0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `lookup` | 查询 | results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--ip` | 输入IP地址查询 | text | "203.0.113.1" |  |

已检查示例：

```bash
html-tools network/ip-lookup lookup --ip '203.0.113.1' --json
```

### network/ip-tools

IP 地址工具：IP 地址工具集

来源：`html-tools/tools/network/ip-tools.html`，SHA-256：`2362712ef25875d3fb4bfae7d080c4715adc69bddaa826f363fb45cc76c9ae3d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | 分析 | subnetBits, resultsGrid, binaryContent |
| `analyze-ip` | analyzeIP | subnetBits, resultsGrid, binaryContent |
| `run` | 按字段输入重新计算 | subnetBits, resultsGrid, binaryContent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 192.168.1.1 或 192.168.1.0/24 | text | "192.168.1.1" |  |
| `--conversion-type` | 转换类型 | select-one | "auto" | "auto" (自动检测); "ipv4" (IPv4); "ipv6" (IPv6); "cidr" (CIDR 计算) |
| `--subnet-bits` | 子网掩码位数 | number | "32" | min=0, max=32 |
| `--output-format` | 格式 | select-one | "decimal" | "decimal" (十进制); "binary" (二进制); "hex" (十六进制) |

已检查示例：

```bash
html-tools network/ip-tools analyze --input '192.168.1.1' --conversion-type 'auto' --subnet-bits '32' --output-format 'decimal' --json
```

### network/mac-lookup

MAC 地址查询：查询 MAC 地址对应的设备厂商信息

来源：`html-tools/tools/network/mac-lookup.html`，SHA-256：`d45d3b0271784958bd2b366b7338c8c7a7e3df3ba527c486189f6d0f89441eb1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `lookup` | 查询 | icon, vendor, oui, mac |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入MAC地址 如 00:1A:2B:3C:4D:5E | text | "" |  |

已检查示例：

```bash
html-tools network/mac-lookup lookup --input 'Hello world
Hello world
TypeScript' --json
```

### network/port-lookup

端口查询器：常用端口号速查，包含服务名称和协议说明

来源：`html-tools/tools/network/port-lookup.html`，SHA-256：`5a41cfc7a08fa0038cfc8b991e0ef9e43c96f207d659968fe610a3bc4b8cecc3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter` | 搜索 | count |
| `run` | 按字段输入重新计算 | count |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--search` | 搜索端口号或服务名称... | search | "" |  |

已检查示例：

```bash
html-tools network/port-lookup filter --search 'Hello world
Hello world
TypeScript' --json
```

### network/rest-client

REST API 测试器：REST API 测试器，在线验证，网络工具，浏览器本地运行无需上传

来源：`html-tools/tools/network/rest-client.html`，SHA-256：`ce84b6571d0cf8f75b33279779a7af26e5adb3e1c555daeb195d1845ffc3bd8b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `send-request` | 发送请求 | responseBody, historyPanel |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--method` | method | select-one | "GET" | "GET" (GET); "POST" (POST); "PUT" (PUT); "PATCH" (PATCH); "DELETE" (DELETE); "HEAD" (HEAD); "OPTIONS" (OPTIONS) |
| `--url` | https://api.example.com/endpoint | text | "https://httpbin.org/get" |  |
| `--field-3` | 键 | text | "" |  |
| `--field-4` | 值 | text | "" |  |
| `--field-5` | 键 | text | "" |  |
| `--field-6` | 值 | text | "" |  |
| `--body-type` | bodyType | select-one | "json" | "json" (JSON); "form" (Form Data); "text" (Raw Text) |
| `--request-body` | {"key": "value"} | textarea | "" |  |
| `--auth-type` | authType | select-one | "none" | "none" (无认证); "basic" (Basic Auth); "bearer" (Bearer Token) |
| `--auth-user` | 用户名 | text | "" |  |
| `--auth-pass` | 密码 | password | "" |  |
| `--bearer-token` | Bearer Token | text | "" |  |

已检查示例：

```bash
html-tools network/rest-client send-request --method 'GET' --url 'https://httpbin.org/get' --field-3 'Hello world
Hello world
TypeScript' --field-4 'Hello world
Hello world
TypeScript' --field-5 'Hello world
Hello world
TypeScript' --field-6 'Hello world
Hello world
TypeScript' --body-type 'json' --request-body 'Hello world
Hello world
TypeScript' --auth-type 'none' --auth-user 'Hello world
Hello world
TypeScript' --auth-pass 'Hello world
Hello world
TypeScript' --bearer-token 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### network/sse-client

SSE 事件流调试器：SSE 事件流调试器，在线使用，网络工具，浏览器本地运行无需上传

来源：`html-tools/tools/network/sse-client.html`，SHA-256：`92a6d87adb201bd9dd386ee895b88fd8faf6555326b2a10c7d592ea2a6bb27e3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-ready-state` | updateReadyState | readyState |
| `run` | 按字段输入重新计算 | eventsContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--sse-url` | https://example.com/events | text | "" |  |
| `--event-filter` | 过滤事件类型... | text | "" |  |
| `--auto-scroll` / `--no-auto-scroll` | 自动滚动 | checkbox | true |  |

已检查示例：

```bash
html-tools network/sse-client update-ready-state --sse-url 'https://example.com/path?a=1' --event-filter 'Hello world
Hello world
TypeScript' --auto-scroll --json
```

### network/ssl-parser

SSL 证书解析器：SSL 证书解析器，在线分析，网络工具，浏览器本地运行无需上传

来源：`html-tools/tools/network/ssl-parser.html`，SHA-256：`56728c17d22cd9a6f067495f1e15459a21d11c34828eec711bfad6dc1d957a7d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse-certificate` | 🔍 解析证书 | resultSection |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--cert-input` | 粘贴 PEM 格式证书 （以 -----BEGIN CERTIFICATE----- 开头） | textarea | "" |  |

已检查示例：

```bash
html-tools network/ssl-parser parse-certificate --cert-input 'Hello world
Hello world
TypeScript' --json
```

### network/subnet-calculator

IP 子网计算器：计算 CIDR 子网范围、可用 IP 数量和掩码转换

来源：`html-tools/tools/network/subnet-calculator.html`，SHA-256：`573f4c48b0042a8e34aebadf6af123fa0e566a6efe3e479ae60dec838d79eb65`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | networkAddr, broadcastAddr, subnetMask, wildcardMask, hostCount, firstHost, lastHost, ipClass, binaryIp, binaryMask |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--ip-input` | IP 地址 | text | "192.168.1.100" |  |
| `--cidr-input` | CIDR | select-one | "24" | "8" (/8); "16" (/16); "24" (/24); "25" (/25); "26" (/26); "27" (/27); "28" (/28); "29" (/29); "30" (/30); "32" (/32) |

已检查示例：

```bash
html-tools network/subnet-calculator calculate --ip-input '192.168.1.100' --cidr-input '24' --json
```

### network/http-client

HTTP客户端：在线API请求测试工具，支持多种请求方法和自定义配置

来源：`html-tools/tools/network/http-client.html`，SHA-256：`f0631704980e533bfb14ba05e3b192808dc81884408c4e57a8154290bd12044a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `send-btn` | 发送请求 发送中... | responseContainer, responseHeadersContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--method-select` | methodSelect | select-one | "GET" | "GET" (GET); "POST" (POST); "PUT" (PUT); "PATCH" (PATCH); "DELETE" (DELETE); "HEAD" (HEAD); "OPTIONS" (OPTIONS) |
| `--url-input` | https://api.example.com/endpoint | text | "" |  |
| `--param-key` | 参数名 | text | "" |  |
| `--param-value` | 参数值 | text | "" |  |
| `--header-key` | Header名 | text | "Content-Type" |  |
| `--header-value` | Header值 | text | "application/json" |  |
| `--body-textarea` | {"key": "value"} | textarea | "" |  |

已检查示例：

```bash
html-tools network/http-client send-btn --method-select 'GET' --url-input 'https://example.com/path?a=1' --param-key 'Hello world
Hello world
TypeScript' --param-value 'Hello world
Hello world
TypeScript' --header-key 'Content-Type' --header-value 'application/json' --body-textarea 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: json: 原工具没有产生可输出的结果，请检查参数 | text: 原工具没有产生可输出的结果，请检查参数 | xml: 原工具没有产生可输出的结果，请检查参数 | form: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### network/whois-lookup

WHOIS查询：域名WHOIS信息查询

来源：`html-tools/tools/network/whois-lookup.html`，SHA-256：`9db1deebe25271feefec667fade2d4bab674a969f384ef3e1757cc5d1f970d1a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `lookup` | 查询 | result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--domain` | 输入域名，如 example.com | text | "" |  |

已检查示例：

```bash
html-tools network/whois-lookup lookup --domain 'https://example.com/path?a=1' --json
```

### network/ssl-checker

SSL证书检查：检查网站SSL证书

来源：`html-tools/tools/network/ssl-checker.html`，SHA-256：`18f9b5b1a92c0cecae5c3ced232459439922ae5b0c9f14a9e7714724529a938c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `check` | 检查 | result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--url` | 输入网址，如 https://example.com | text | "" |  |

已检查示例：

```bash
html-tools network/ssl-checker check --url 'https://example.com/path?a=1' --json
```

### network/ip-subnet-calculator

Ip Subnet Calculator：Ip Subnet Calculator，在线使用，网络工具，浏览器本地运行无需上传

来源：`html-tools/tools/network/ip-subnet-calculator.html`，SHA-256：`436eeaecae3776ded78593671d87480779723dc34635347c4902e4b532536fd0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | results, binaryView |
| `run` | 按字段输入重新计算 | results, binaryView |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--ip1` | 请输入数字输入框 | number | "192" | min=0, max=255 |
| `--ip2` | 请输入数字输入框 | number | "168" | min=0, max=255 |
| `--ip3` | 请输入数字输入框 | number | "1" | min=0, max=255 |
| `--ip4` | 请输入数字输入框 | number | "100" | min=0, max=255 |
| `--cidr` | 请输入数字输入框 | number | "24" | min=0, max=32 |

已检查示例：

```bash
html-tools network/ip-subnet-calculator calculate --ip1 '192' --ip2 '168' --ip3 '1' --ip4 '100' --cidr '24' --json
```

### network/port-info

Port Info：Port Info，在线使用，网络工具，浏览器本地运行无需上传

来源：`html-tools/tools/network/port-info.html`，SHA-256：`00c23e081ea40839a9e5397e9a1d85f97c86cba007ccdfb93bd24ceaa6ed5861`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `search-port` | 80 HTTP | searchInput, portList |
| `filter-category-all` | 全部 | portList |
| `filter-category-web` | Web服务 | portList |
| `filter-category-db` | 数据库 | portList |
| `filter-category-mail` | 邮件 | portList |
| `filter-category-remote` | 远程访问 | portList |
| `filter-category-file` | 文件传输 | portList |
| `search` | search | portList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools network/port-info search-port  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### network/email-header-analyzer

邮件头分析器：粘贴原始邮件头（Raw Email Headers），解析 Received 链路、DKIM 签名、SPF、DMARC 结果，可视化追踪邮件路由。

来源：`html-tools/tools/network/email-header-analyzer.html`，SHA-256：`699dc8c03c77013482d2d938f561f46a8aaca049ceb3d7b8ca4b824f5ab022f5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | 分析 | resultContainer, statHops, statHeaders, statDelay |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--header-input` | 粘贴邮件头内容（从邮件客户端「查看原始邮件」或「显示原始邮件」中复制）... | textarea | "" |  |

已检查示例：

```bash
html-tools network/email-header-analyzer analyze --header-input 'Content-Type: application/json
Cache-Control: no-cache' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

## office

### office/work-hours

工时统计：记录和统计工作时间

来源：`html-tools/tools/office/work-hours.html`，SHA-256：`c8ff78c2264341266f68c52cd13cddf47ec7aab180399470e7bb32b4508c524a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate-hours` | calculateHours | totalHours, overtimeHours |
| `calculate-salary` | calculateSalary | dailySalary, hourlySalary, overtimeSalary, minuteSalary |
| `run` | 按字段输入重新计算 | totalHours, overtimeHours, dailySalary, hourlySalary, overtimeSalary, minuteSalary |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--start-time` | 上班时间 | time | "09:00" |  |
| `--end-time` | 下班时间 | time | "18:00" |  |
| `--lunch-break` | 午休时长 (小时) | number | "1" | min=0, max=3 |
| `--standard-hours` | 标准工时 (小时) | number | "8" | min=1, max=12 |
| `--monthly-salary` | 月薪 (元) | number | "15000" | min=0 |
| `--work-days` | 每月工作日 | number | "22" | min=1, max=31 |
| `--daily-hours` | 每日工时 | number | "8" | min=1, max=16 |
| `--overtime-rate` | 加班倍率 | number | "1.5" | min=1, max=3 |

已检查示例：

```bash
html-tools office/work-hours calculate-hours --start-time '09:00' --end-time '18:00' --lunch-break '1' --standard-hours '8' --monthly-salary '15000' --work-days '22' --daily-hours '8' --overtime-rate '1.5' --json
```

### office/invoice-calculator

发票税额计算器：计算增值税发票金额和税额

来源：`html-tools/tools/office/invoice-calculator.html`，SHA-256：`7980d1a5779c81da1627bc79395dc95f62257ff2212349b647c4c4d99e85fe31`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | priceWithoutTax, taxAmount, totalAmount, formula |
| `run` | 按字段输入重新计算 | priceWithoutTax, taxAmount, totalAmount, formula |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--amount` | 含税金额 (元) | number | "11300" | min=0 |

已检查示例：

```bash
html-tools office/invoice-calculator calculate --amount '11300' --json
```

### office/agenda-maker

Agenda Maker：Agenda Maker，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/agenda-maker.html`，SHA-256：`3ad0f034bb03f7bef0b8c07fd2a246906b54f3a5aab0697a0f3143350efa0c0f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-time-summary` | updateTimeSummary | totalDuration, endTime |
| `generate-text-agenda` | generateTextAgenda | value |
| `run` | 按字段输入重新计算 | totalDuration, endTime |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--meeting-title` | 会议主题 | text | "" |  |
| `--meeting-date` | 日期 | date | "2026-10-30" |  |
| `--meeting-time` | 开始时间 | time | "" |  |
| `--meeting-location` | 地点 | text | "" |  |
| `--attendee-input` | 输入姓名，按回车添加 | text | "" |  |
| `--agenda-topic` | 议题 | text | "" |  |
| `--agenda-duration` | 时长(分钟) | number | "15" | min=1 |

已检查示例：

```bash
html-tools office/agenda-maker update-time-summary --meeting-title 'Hello world
Hello world
TypeScript' --meeting-date '2026-10-30' --meeting-time '12:00' --meeting-location 'Hello world
Hello world
TypeScript' --attendee-input 'Hello world
Hello world
TypeScript' --agenda-topic 'Hello world
Hello world
TypeScript' --agenda-duration '15' --json
```

### office/attendance-sheet

Attendance Sheet：Attendance Sheet，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/attendance-sheet.html`，SHA-256：`5b49439def9b136c4ea26a3311174a38adeb532c5492bd2f52d318fb134dc6c4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-id` | generateId | value |
| `update-summary` | updateSummary | totalCount, presentCount, absentCount, lateCount, leaveCount |
| `run` | 按字段输入重新计算 | totalCount, presentCount, absentCount, lateCount, leaveCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--new-name` | 输入姓名 | text | "" |  |
| `--attendance-date` | attendanceDate | date | "2026-10-30" |  |

已检查示例：

```bash
html-tools office/attendance-sheet generate-id --new-name 'Hello world
Hello world
TypeScript' --attendance-date '2026-10-30' --json
```

### office/barcode-label

Barcode Label：Barcode Label，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/barcode-label.html`，SHA-256：`b16300cd26cc29d1e03a4126c752b96146acd517f5c9a86ed4a60a1cda5650cf`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-barcode` | 生成条形码 | barcodeCanvas, barcodeTextDisplay, infoText |
| `export-barcode` | 下载 PNG | download |
| `run` | 按字段输入重新计算 | barcodeCanvas, barcodeTextDisplay, infoText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--barcode-text` | 条形码内容 | text | "" |  |
| `--barcode-width` | 宽度 (px) | number | "300" | min=100, max=600 |
| `--barcode-height` | 高度 (px) | number | "100" | min=40, max=200 |
| `--show-text` / `--no-show-text` | 显示文本 | checkbox | true |  |

已检查示例：

```bash
html-tools office/barcode-label generate-barcode --barcode-text 'Hello world
Hello world
TypeScript' --barcode-width '300' --barcode-height '100' --show-text --json
```

### office/business-card-maker

名片制作：在线名片制作工具，多种风格模板，支持自定义颜色和打印

来源：`html-tools/tools/office/business-card-maker.html`，SHA-256：`1ef5c9cce98296507123affbdf431acf32a52e057532f97766fd4aa939106a41`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | cardPreview |
| `run` | 按字段输入重新计算 | cardPreview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-name` | 姓名 * | text | "" |  |
| `--input-title` | 职位 | text | "" |  |
| `--input-company` | 公司名称 | text | "" |  |
| `--input-phone` | 电话 | tel | "" |  |
| `--input-email` | 邮箱 | email | "" |  |
| `--input-website` | 网站 | url | "" |  |
| `--input-address` | 地址 | text | "" |  |
| `--input-bg-color` | 背景色 | color | "#1a1a2e" |  |
| `--input-text-color` | 文字色 | color | "#ffffff" |  |
| `--input-accent-color` | 强调色 | color | "#00d4aa" |  |

已检查示例：

```bash
html-tools office/business-card-maker update-preview --input-name 'Hello world
Hello world
TypeScript' --input-title 'Hello world
Hello world
TypeScript' --input-company 'Hello world
Hello world
TypeScript' --input-phone 'Hello world
Hello world
TypeScript' --input-email 'alice@example.com' --input-website 'https://example.com/path?a=1' --input-address 'Hello world
Hello world
TypeScript' --input-bg-color '#1a1a2e' --input-text-color '#ffffff' --input-accent-color '#00d4aa' --json
```

### office/checklist-maker

清单制作：创建待办清单，支持拖拽排序、进度追踪、打印导出

来源：`html-tools/tools/office/checklist-maker.html`，SHA-256：`0bb1e9704b5c787d811f7bbcac9521450594ad9869b9d6ff7c03f0630182ff5f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-id` | generateId | value |
| `update-progress` | updateProgress | completedCount, totalCount |
| `render` | render | completedCount, totalCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--new-item-input` | 输入新的清单项目，按 Enter 添加... | text | "" |  |

已检查示例：

```bash
html-tools office/checklist-maker generate-id --new-item-input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### office/contract-template

Contract Template：Contract Template，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/contract-template.html`，SHA-256：`fdd010c995a4745fe9a0c3a6d2857fbdafc7256bdfbc56c041ad253444bb8303`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成合同 | contractPreview |
| `service` | 📋 服务合同 | contractPreview |
| `employment` | 👔 雇佣合同 | contractPreview |
| `rental` | 🏠 租赁合同 | contractPreview |
| `generate-contract` | generateContract | contractPreview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--contract-no` | 合同编号 | text | "" |  |
| `--contract-date` | 签订日期 | date | "2026-10-30" |  |
| `--party-a` | 甲方名称 | text | "" |  |
| `--party-b` | 乙方名称 | text | "" |  |
| `--start-date` | 开始日期 | date | "" |  |
| `--end-date` | 结束日期 | date | "" |  |
| `--amount` | 金额 (元) | number | "" |  |
| `--payment-method` | 付款方式 | select-one | "一次性付清" | "一次性付清" (一次性付清); "分期付款" (分期付款); "按月支付" (按月支付); "按季度支付" (按季度支付); "完工后支付" (完工后支付) |
| `--service-scope` | 服务范围 | textarea | "" |  |
| `--service-location` | 服务地点 | text | "" |  |
| `--position` | 岗位名称 | text | "" |  |
| `--department` | 所属部门 | text | "" |  |
| `--job-duties` | 工作职责 | textarea | "" |  |
| `--work-location` | 工作地点 | text | "" |  |
| `--probation` | 试用期 (月) | number | "" | min=0, max=6 |
| `--rental-item` | 租赁物描述 | textarea | "" |  |
| `--deposit` | 押金 (元) | number | "" |  |
| `--rental-use` | 使用用途 | select-one | "居住" | "居住" (居住); "办公" (办公); "商业经营" (商业经营); "仓储" (仓储); "其他" (其他) |
| `--extra-terms` | 其他约定 | textarea | "" |  |

已检查示例：

```bash
html-tools office/contract-template generate --contract-no 'Hello world
Hello world
TypeScript' --contract-date '2026-10-30' --party-a 'Hello world
Hello world
TypeScript' --party-b 'Hello world
Hello world
TypeScript' --start-date '2025-01-01' --end-date '2025-01-01' --amount '10' --payment-method '一次性付清' --service-scope 'Hello world
Hello world
TypeScript' --service-location 'Hello world
Hello world
TypeScript' --position 'Hello world
Hello world
TypeScript' --department 'Hello world
Hello world
TypeScript' --job-duties 'Hello world
Hello world
TypeScript' --work-location 'Hello world
Hello world
TypeScript' --probation '6' --rental-item 'Hello world
Hello world
TypeScript' --deposit '10' --rental-use '居住' --extra-terms 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: update-type-ui: 合同已生成 | run: 合同已生成

### office/expense-report

Expense Report：Expense Report，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/expense-report.html`，SHA-256：`3c1768a281ac5b1424e8ebcb5504e4124e287201525f542853fb42c75553f89d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-id` | generateId | value |
| `render` | render | expenseTableBody, totalAmount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--expense-date` | 日期 | date | "2026-10-30" |  |
| `--expense-category` | 分类 | select-one | "travel" | "travel" (差旅); "meals" (餐饮); "supplies" (办公用品); "transport" (交通); "lodging" (住宿); "other" (其他) |
| `--expense-desc` | 描述 | text | "" |  |
| `--expense-amount` | 金额 (¥) | number | "" | min=0 |

已检查示例：

```bash
html-tools office/expense-report generate-id --expense-date '2026-10-30' --expense-category 'travel' --expense-desc 'Hello world
Hello world
TypeScript' --expense-amount '10' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### office/gantt-chart

甘特图：在线甘特图工具，可视化项目进度管理，支持导出图片和打印

来源：`html-tools/tools/office/gantt-chart.html`，SHA-256：`75da280d0f4228aff4350c3dff5dfa72e9e8ef0d526684fa4bd885d03f7d4bfe`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-id` | generateId | value |
| `run` | 按字段输入重新计算 | taskCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--project-name` | 项目名称: | text | "" |  |
| `--task-name` | 任务名称 | text | "" |  |
| `--start-date` | 开始日期 | date | "2026-10-30" |  |
| `--end-date` | 结束日期 | date | "2026-11-06" |  |
| `--task-color` | 颜色 | color | "#00d4aa" |  |
| `--scale-select` | 时间刻度: | select-one | "day" | "day" (按天); "week" (按周) |

已检查示例：

```bash
html-tools office/gantt-chart generate-id --project-name 'Hello world
Hello world
TypeScript' --task-name 'Hello world
Hello world
TypeScript' --start-date '2026-10-30' --end-date '2026-11-06' --task-color '#00d4aa' --scale-select 'day' --json
```

### office/invoice-maker

Invoice Maker：Invoice Maker，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/invoice-maker.html`，SHA-256：`0652cdf8fa466780ffcb7abbb7c9b3879f8603707e1b2481f36a49069e47cc24`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-invoice-number` | generateInvoiceNumber | value |
| `calculate-totals` | calculateTotals | subtotal, taxAmount, total |
| `run` | 按字段输入重新计算 | lineItemsBody, subtotal, taxAmount, total |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--company-name` | 公司名称 | text | "" |  |
| `--company-address` | 公司地址 | text | "" |  |
| `--company-phone` | 联系电话 | tel | "" |  |
| `--company-email` | 电子邮箱 | email | "" |  |
| `--client-name` | 客户名称 | text | "" |  |
| `--client-address` | 客户地址 | text | "" |  |
| `--invoice-date` | 开票日期 | date | "2026-10-30" |  |
| `--due-date` | 付款截止日期 | date | "2026-11-29" |  |
| `--field-9` | 公司名称 | text | "" |  |
| `--field-10` | 公司名称 | number | "1" | min=0 |
| `--field-11` | 公司名称 | number | "0" | min=0 |
| `--tax-rate` | taxRate | number | "0" | min=0, max=100 |
| `--notes` | 付款条款、备注说明等... | textarea | "" |  |

已检查示例：

```bash
html-tools office/invoice-maker generate-invoice-number --company-name 'Hello world
Hello world
TypeScript' --company-address 'Hello world
Hello world
TypeScript' --company-phone 'Hello world
Hello world
TypeScript' --company-email 'alice@example.com' --client-name 'Hello world
Hello world
TypeScript' --client-address 'Hello world
Hello world
TypeScript' --invoice-date '2026-10-30' --due-date '2026-11-29' --field-9 'Hello world
Hello world
TypeScript' --field-10 '1' --field-11 '0' --tax-rate '0' --notes 'Hello world
Hello world
TypeScript' --json
```

### office/label-maker

Label Maker：Label Maker，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/label-maker.html`，SHA-256：`60078563491f954bfe2562cabcff0eb4f31b250f571ed0a3e06cab64da9ca017`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-preview` | generatePreview | labelsGrid, statLabels, statSize |
| `run` | 按字段输入重新计算 | fontSizeValue, labelsGrid, statLabels, statSize |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--label-size` | labelSize | select-one | "medium" | "small" (小 (25x10mm)); "medium" (中 (50x25mm)); "large" (大 (100x50mm)) |
| `--font-size` | fontSize | range | "14" | min=8, max=32 |
| `--input` | 输入标签内容，每行一个标签... 示例: 产品A 产品B 产品C | textarea | "" |  |

已检查示例：

```bash
html-tools office/label-maker generate-preview --label-size 'medium' --font-size '14' --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: update-align-buttons: 已生成 3 个标签

### office/leave-calculator

Leave Calculator：Leave Calculator，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/leave-calculator.html`，SHA-256：`bf701ec7be2f97273080e3a629e3e6ca21114ca13c7f954288923b217c96e4b8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | totalDays, weekendDays, holidayDays, workingDays |
| `run` | 按字段输入重新计算 | totalDays, weekendDays, holidayDays, workingDays |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--start-date` | 开始日期 | date | "2026-10-30" |  |
| `--end-date` | 结束日期 | date | "2026-11-06" |  |
| `--exclude-weekends` / `--no-exclude-weekends` | 排除周末 (周六、周日) | checkbox | true |  |
| `--holiday-input` | holidayInput | date | "" |  |

已检查示例：

```bash
html-tools office/leave-calculator calculate --start-date '2026-10-30' --end-date '2026-11-06' --exclude-weekends --holiday-input '2025-01-01' --json
```

### office/letter-template

Letter Template：Letter Template，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/letter-template.html`，SHA-256：`1243fe4272d15aaa93a6201842da3bca6fd1f32904f10b8de20b17f140c32e49`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | preview |
| `run` | 按字段输入重新计算 | preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--sender-name` | 姓名/公司 | text | "" |  |
| `--sender-title` | 职位 | text | "" |  |
| `--sender-address` | 地址 | text | "" |  |
| `--sender-phone` | 电话 | text | "" |  |
| `--sender-email` | 邮箱 | email | "" |  |
| `--recipient-name` | 姓名/公司 | text | "" |  |
| `--recipient-title` | 职位 | text | "" |  |
| `--recipient-address` | 地址 | text | "" |  |
| `--letter-date` | 日期 | date | "2026-10-30" |  |
| `--greeting` | 称呼 | select-one | "尊敬的" | "尊敬的" (尊敬的); "亲爱的" (亲爱的); "Dear" (Dear) |
| `--subject` | 主题 | text | "" |  |
| `--body` | 正文 | textarea | "" |  |
| `--closing` | 结束语 | select-one | "此致敬礼" | "此致敬礼" (此致敬礼); "顺祝商祺" (顺祝商祺); "敬祝安康" (敬祝安康); "Best regards" (Best regards); "Sincerely" (Sincerely) |

已检查示例：

```bash
html-tools office/letter-template update-preview --sender-name 'Hello world
Hello world
TypeScript' --sender-title 'Hello world
Hello world
TypeScript' --sender-address 'Hello world
Hello world
TypeScript' --sender-phone 'Hello world
Hello world
TypeScript' --sender-email 'alice@example.com' --recipient-name '192.168.1.1' --recipient-title '192.168.1.1' --recipient-address '192.168.1.1' --letter-date '2026-10-30' --greeting '尊敬的' --subject 'Hello world
Hello world
TypeScript' --body 'Hello world
Hello world
TypeScript' --closing '此致敬礼' --json
```

### office/meeting-timer

Meeting Timer：Meeting Timer，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/meeting-timer.html`，SHA-256：`c9a00146e89a563eff77ddf643e5866f001454bf6619d1fd9067a48da8a18edc`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-display` | updateDisplay | timerDisplay |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--minutes` | 分钟 | number | "30" | min=0, max=999 |
| `--seconds` | 秒 | number | "0" | min=0, max=59 |

已检查示例：

```bash
html-tools office/meeting-timer update-display --minutes '30' --seconds '0' --json
```

### office/minutes-template

Minutes Template：Minutes Template，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/minutes-template.html`，SHA-256：`74ca906970240eaf8ef5348489f63306a8f292fa52170f999be2b29292732552`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | preview |
| `run` | 按字段输入重新计算 | preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--meeting-title` | 会议主题 | text | "" |  |
| `--meeting-date` | 日期 | date | "2026-10-30" |  |
| `--meeting-time` | 时间 | time | "" |  |
| `--meeting-location` | 地点 | text | "" |  |
| `--attendees` | 参会人员 | text | "" |  |

已检查示例：

```bash
html-tools office/minutes-template update-preview --meeting-title 'Hello world
Hello world
TypeScript' --meeting-date '2026-10-30' --meeting-time '12:00' --meeting-location 'Hello world
Hello world
TypeScript' --attendees 'Hello world
Hello world
TypeScript' --json
```

### office/overtime-calculator

Overtime Calculator：Overtime Calculator，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/overtime-calculator.html`，SHA-256：`a2128ba8fa542069117923f66b43de12a8ad92518ba4529b51027d141e9a2cec`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | regularPay, overtimePay, weekendPay, holidayPay, totalPay |
| `run` | 按字段输入重新计算 | regularPay, overtimePay, weekendPay, holidayPay, totalPay |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--hourly-rate` | 时薪 (元/小时) | number | "50" | min=0 |
| `--regular-hours` | 正常工时 (小时) | number | "8" | min=0 |
| `--overtime-hours` | 加班工时 (小时) | number | "2" | min=0 |
| `--enable-weekend` / `--no-enable-weekend` | 🗓️ 计算周末加班 | checkbox | false |  |
| `--weekend-hours` | 周末工时 (小时) | number | "0" | min=0 |
| `--weekend-multiplier` | 周末倍率 | select-one | "2" | "2" (2x (标准)); "2.5" (2.5x); "3" (3x) |
| `--enable-holiday` / `--no-enable-holiday` | 🎉 计算节假日加班 | checkbox | false |  |
| `--holiday-hours` | 节假日工时 (小时) | number | "0" | min=0 |
| `--holiday-multiplier` | 节假日倍率 | select-one | "3" | "3" (3x (标准)); "2.5" (2.5x); "2" (2x) |

已检查示例：

```bash
html-tools office/overtime-calculator calculate --hourly-rate '50' --regular-hours '8' --overtime-hours '2' --no-enable-weekend --weekend-hours '0' --weekend-multiplier '2' --no-enable-holiday --holiday-hours '0' --holiday-multiplier '3' --json
```

### office/project-timeline

Project Timeline：Project Timeline，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/project-timeline.html`，SHA-256：`af09fb84653f444031ad2c1462136d9efbc4080fb55dc6747eba0eb428f777ac`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--project-name` | 项目名称 | text | "" |  |
| `--milestone-date` | 日期 | date | "" |  |
| `--milestone-title` | 标题 | text | "" |  |
| `--milestone-desc` | 描述 | textarea | "" |  |
| `--milestone-status` | 状态 | select-one | "pending" | "pending" (待完成); "completed" (已完成); "future" (未来计划) |

已检查示例：

```bash
html-tools office/project-timeline run --project-name 'Hello world
Hello world
TypeScript' --milestone-date '2025-01-01' --milestone-title 'Hello world
Hello world
TypeScript' --milestone-desc 'Hello world
Hello world
TypeScript' --milestone-status 'pending' --json
```

### office/purchase-order

Purchase Order：Purchase Order，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/purchase-order.html`，SHA-256：`fdd041e32200d2b3455a4359932b32bb079d3cccfa5c378bfdd3f91138838522`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-po-number` | generatePONumber | value |
| `calculate-totals` | calculateTotals | subtotal, total |
| `run` | 按字段输入重新计算 | lineItemsBody, subtotal, total |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--buyer-name` | 公司名称 | text | "" |  |
| `--buyer-address` | 公司地址 | text | "" |  |
| `--buyer-contact` | 联系人 | text | "" |  |
| `--buyer-phone` | 联系电话 | tel | "" |  |
| `--vendor-name` | 供应商名称 | text | "" |  |
| `--vendor-address` | 供应商地址 | text | "" |  |
| `--vendor-contact` | 联系人 | text | "" |  |
| `--vendor-phone` | 联系电话 | tel | "" |  |
| `--po-date` | 订单日期 | date | "2026-10-30" |  |
| `--delivery-date` | 交货日期 | date | "2026-11-13" |  |
| `--payment-terms` | 付款方式 | select-one | "预付款" | "预付款" (预付款); "货到付款" (货到付款); "30天账期" (30天账期); "60天账期" (60天账期); "月结" (月结) |
| `--field-12` | 公司名称 | text | "" |  |
| `--field-13` | 公司名称 | number | "1" | min=0 |
| `--field-14` | 公司名称 | select-one | "个" | "个" (个); "件" (件); "套" (套); "台" (台); "箱" (箱); "包" (包); "千克" (千克); "米" (米); "平方米" (平方米) |
| `--field-15` | 公司名称 | number | "0" | min=0 |
| `--shipping-address` | 送货地址详情... | textarea | "" |  |
| `--notes` | 其他备注说明... | textarea | "" |  |

已检查示例：

```bash
html-tools office/purchase-order generate-po-number --buyer-name 'Hello world
Hello world
TypeScript' --buyer-address 'Hello world
Hello world
TypeScript' --buyer-contact 'Hello world
Hello world
TypeScript' --buyer-phone 'Hello world
Hello world
TypeScript' --vendor-name 'Hello world
Hello world
TypeScript' --vendor-address 'Hello world
Hello world
TypeScript' --vendor-contact 'Hello world
Hello world
TypeScript' --vendor-phone 'Hello world
Hello world
TypeScript' --po-date '2026-10-30' --delivery-date '2026-11-13' --payment-terms '预付款' --field-12 'Hello world
Hello world
TypeScript' --field-13 '1' --field-14 '个' --field-15 '0' --shipping-address '192.168.1.1' --notes 'Hello world
Hello world
TypeScript' --json
```

### office/quotation-maker

Quotation Maker：Quotation Maker，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/quotation-maker.html`，SHA-256：`bd236ac08f206fe9cec2f70716d8aa892351876b8049217590ff9798ebabac5c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-quote-number` | generateQuoteNumber | value |
| `update-validity-notice` | updateValidityNotice | validityNotice |
| `calculate-totals` | calculateTotals | subtotal, taxAmount, total |
| `run` | 按字段输入重新计算 | lineItemsBody, subtotal, taxAmount, total, validityNotice |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--company-name` | 公司名称 | text | "" |  |
| `--company-address` | 公司地址 | text | "" |  |
| `--company-phone` | 联系电话 | tel | "" |  |
| `--company-email` | 电子邮箱 | email | "" |  |
| `--client-name` | 客户名称 | text | "" |  |
| `--client-contact` | 联系人 | text | "" |  |
| `--client-phone` | 联系电话 | tel | "" |  |
| `--client-email` | 电子邮箱 | email | "" |  |
| `--quote-date` | 报价日期 | date | "2026-10-30" |  |
| `--valid-until` | 有效期至 | date | "2026-11-29" |  |
| `--project-name` | 项目名称 | text | "" |  |
| `--field-12` | 公司名称 | textarea | "" |  |
| `--field-13` | 公司名称 | number | "1" | min=0 |
| `--field-14` | 公司名称 | number | "0" | min=0 |
| `--tax-rate` | taxRate | number | "0" | min=0, max=100 |
| `--terms` | 付款条款、交货方式、保修说明等... | textarea | "1. 付款方式：预付款50%，交货后付清余款\n2. 交货周期：收到订单后7-14个工作日\n3. 报价有效期：自报价日起30天内有效\n4. 以上报价不含运费，运费按实际发生计算\n5. 如有任何疑问，请随时联系我们" |  |
| `--notes` | 其他补充说明... | textarea | "" |  |

已检查示例：

```bash
html-tools office/quotation-maker generate-quote-number --company-name 'Hello world
Hello world
TypeScript' --company-address 'Hello world
Hello world
TypeScript' --company-phone 'Hello world
Hello world
TypeScript' --company-email 'alice@example.com' --client-name 'Hello world
Hello world
TypeScript' --client-contact 'Hello world
Hello world
TypeScript' --client-phone 'Hello world
Hello world
TypeScript' --client-email 'alice@example.com' --quote-date '2026-10-30' --valid-until '2026-11-29' --project-name 'Hello world
Hello world
TypeScript' --field-12 'Hello world
Hello world
TypeScript' --field-13 '1' --field-14 '0' --tax-rate '0' --terms '1. 付款方式：预付款50%，交货后付清余款
2. 交货周期：收到订单后7-14个工作日
3. 报价有效期：自报价日起30天内有效
4. 以上报价不含运费，运费按实际发生计算
5. 如有任何疑问，请随时联系我们' --notes 'Hello world
Hello world
TypeScript' --json
```

### office/receipt-maker

Receipt Maker：Receipt Maker，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/receipt-maker.html`，SHA-256：`9e33cb8d94925693582563876ce144755047a99a3b772cdf2c74962953993869`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-receipt-no` | generateReceiptNo | value |
| `update-preview` | updatePreview | previewStoreName, previewStoreAddress, previewReceiptNo, previewDate, previewTime, previewCashier, previewItems, previewSubtotal, previewTotal, previewPayment, previewPaid, previewChange |
| `run` | 按字段输入重新计算 | itemsList, previewStoreName, previewStoreAddress, previewReceiptNo, previewDate, previewTime, previewCashier, previewItems, previewSubtotal, previewTotal, previewPayment, previewPaid, previewChange |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--store-name` | 商家名称 | text | "" |  |
| `--store-address` | 商家地址 | textarea | "" |  |
| `--receipt-date` | 日期 | date | "2026-10-30" |  |
| `--receipt-time` | 时间 | time | "11:38" |  |
| `--cashier` | 收银员 | text | "" |  |
| `--field-6` | 商品名称 | text | "" |  |
| `--field-7` | field-7 | number | "1" | min=1 |
| `--field-8` | field-8 | number | "0" | min=0 |
| `--enable-tax` / `--no-enable-tax` | 启用税费 | checkbox | false |  |
| `--tax-rate` | 启用税费 | number | "6" | min=0, max=100 |
| `--payment-method` | 支付方式 | select-one | "cash" | "cash" (现金); "card" (银行卡); "wechat" (微信支付); "alipay" (支付宝); "other" (其他) |
| `--amount-paid` | 实收金额 | number | "" | min=0 |

已检查示例：

```bash
html-tools office/receipt-maker generate-receipt-no --store-name 'Hello world
Hello world
TypeScript' --store-address 'Hello world
Hello world
TypeScript' --receipt-date '2026-10-30' --receipt-time '11:38' --cashier 'Hello world
Hello world
TypeScript' --field-6 'Hello world
Hello world
TypeScript' --field-7 '1' --field-8 '0' --no-enable-tax --tax-rate '6' --payment-method 'cash' --amount-paid '10' --json
```

操作限制：部分原页面操作未通过迁移检查: calculate-totals: 原工具没有产生可输出的结果，请检查参数

### office/seating-chart

Seating Chart：Seating Chart，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/seating-chart.html`，SHA-256：`2d04ac9ed045d78a7312aa6ae348c41a0cd778d7f3b373c843278efd7d3d6184`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-stats` | updateStats | tableCount, totalSeats, assignedSeats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--event-name` | 活动名称 | text | "" |  |
| `--table-name` | 桌子名称 | text | "" |  |
| `--table-type` | 桌型 | select-one | "round" | "round" (圆桌); "rect" (长桌) |
| `--seat-count` | 座位数 | number | "8" | min=2, max=20 |
| `--seat-person-name` | 姓名 | text | "" |  |

已检查示例：

```bash
html-tools office/seating-chart update-stats --event-name 'Hello world
Hello world
TypeScript' --table-name 'Hello world
Hello world
TypeScript' --table-type 'round' --seat-count '8' --seat-person-name 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### office/signature-pad

Signature Pad：Signature Pad，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/signature-pad.html`，SHA-256：`10545a16c4b176b819e2c0efc15775e6eafb17f752f8bb7a469ed22c484d443b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-canvas-background` | updateCanvasBackground | signatureCanvas |
| `update-ui` | updateUI | strokeCount |
| `run` | 按字段输入重新计算 | sizeValue, signatureCanvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--pen-color` | 画笔颜色 | color | "#000000" |  |
| `--pen-size` | 画笔粗细 | range | "3" | min=1, max=10 |
| `--transparent-bg` / `--no-transparent-bg` | 透明背景 | checkbox | false |  |

已检查示例：

```bash
html-tools office/signature-pad update-canvas-background --pen-color '#000000' --pen-size '3' --no-transparent-bg --json
```

### office/slide-notes

Slide Notes：Slide Notes，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/slide-notes.html`，SHA-256：`83013ee4520fc2a73955a3542115545bb0376356ab3302ef69e29595519ec187`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-timer-display` | updateTimerDisplay | timerDisplay |
| `update-navigation` | updateNavigation | currentSlideNum, totalSlides |
| `update-display` | updateDisplay | slideTitle, slideNotes |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--presentation-title` | 演讲标题 | text | "" |  |
| `--edit-title` | 幻灯片标题 | text | "" |  |
| `--edit-notes` | 演讲备注 | textarea | "" |  |

已检查示例：

```bash
html-tools office/slide-notes update-timer-display --presentation-title 'Hello world
Hello world
TypeScript' --edit-title 'Hello world
Hello world
TypeScript' --edit-notes 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### office/stamp-generator

Stamp Generator：Stamp Generator，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/stamp-generator.html`，SHA-256：`2ffebd9de2e8f751224c3e6ed60fa97655ae6e7463536667f50401e9a120b6fd`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-png` | downloadPNG | download |
| `run` | 按字段输入重新计算 | previewCanvas |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--company-name` | 公司/组织名称 | text | "" |  |
| `--subtitle` | 副标题（可选） | text | "" |  |
| `--shape` | 形状 | select-one | "circle" | "circle" (圆形); "oval" (椭圆形); "rectangle" (矩形) |
| `--border-color` | 边框颜色 | color | "#dc2626" |  |
| `--border-width` | 边框粗细 | select-one | "5" | "3" (细); "5" (中); "8" (粗) |
| `--show-star` / `--no-show-star` | 显示中心五角星 | checkbox | true |  |

已检查示例：

```bash
html-tools office/stamp-generator export-png --company-name 'Hello world
Hello world
TypeScript' --subtitle 'Hello world
Hello world
TypeScript' --shape 'circle' --border-color '#dc2626' --border-width '5' --show-star --json
```

### office/timesheet

Timesheet：Timesheet，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/timesheet.html`，SHA-256：`cd227fe21a29904d4b0bd1f053d54b54926fa06b34fa225f0aa14b0a4877f380`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-summary` | updateSummary | sumMon, sumTue, sumWed, sumThu, sumFri, sumSat, sumSun, sumTotal |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--project-input` | 项目/任务 | text | "" |  |
| `--date-input` | 日期 | date | "2026-10-30" |  |
| `--start-input` | 开始时间 | time | "" |  |
| `--end-input` | 结束时间 | time | "" |  |

已检查示例：

```bash
html-tools office/timesheet update-summary --project-input 'Hello world
Hello world
TypeScript' --date-input '2026-10-30' --start-input '12:00' --end-input '12:00' --json
```

### office/work-log

Work Log：Work Log，在线使用，办公效率，浏览器本地运行无需上传

来源：`html-tools/tools/office/work-log.html`，SHA-256：`25c0e36906e2f89c9749eccf74e4b6ae383aa9a60eadeb2a5c48fa196385a60a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | dateInput, totalHours, entryCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--date-input` | dateInput | date | "2026-10-30" |  |
| `--entry-time` | 开始时间 | time | "11:30" |  |
| `--entry-desc` | 工作内容 | text | "" |  |
| `--entry-duration` | 时长 (h) | number | "1" | min=0.25, max=24 |

已检查示例：

```bash
html-tools office/work-log run --date-input '2026-10-30' --entry-time '11:30' --entry-desc 'Hello world
Hello world
TypeScript' --entry-duration '1' --json
```

### office/meeting-cost-calculator

会议成本计算器：计算会议的人力成本，优化会议效率

来源：`html-tools/tools/office/meeting-cost-calculator.html`，SHA-256：`d573058ace37b87969ba5c871d805fe4ac8c8a34d6a388bdfef38d6c95901237`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | costValue, participantsList, participantCount, avgSalary, costPerMinute |
| `update-stats` | updateStats | participantCount, avgSalary, costPerMinute |
| `update-timer-display` | updateTimerDisplay | timerValue |
| `calculate-cost` | calculateCost | costValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` | 姓名/职位 | text | "产品经理" |  |
| `--field-2` | 时薪 | number | "200" | min=0 |
| `--field-3` | 姓名/职位 | text | "开发工程师" |  |
| `--field-4` | 时薪 | number | "180" | min=0 |
| `--field-5` | 姓名/职位 | text | "设计师" |  |
| `--field-6` | 时薪 | number | "150" | min=0 |

已检查示例：

```bash
html-tools office/meeting-cost-calculator render --field-1 '产品经理' --field-2 '200' --field-3 '开发工程师' --field-4 '180' --field-5 '设计师' --field-6 '150' --json
```

## pets

### pets/pet-age

宠物年龄计算：计算宠物对应的人类年龄

来源：`html-tools/tools/pets/pet-age.html`，SHA-256：`c73d89a199ed4b8876326acaa058e53007834f789013788c19261bf089554d71`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | resultPet, resultAge, resultStage, ageChart, tipsText |
| `update-chart` | updateChart | ageChart |
| `run` | 按字段输入重新计算 | resultPet, resultAge, resultStage, ageChart, tipsText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--pet-age` | 宠物年龄 | number | "3" | min=0, max=30 |

已检查示例：

```bash
html-tools pets/pet-age calculate --pet-age '3' --json
```

### pets/pet-food-calc

宠物喂食量计算：根据体重计算宠物每日喂食量

来源：`html-tools/tools/pets/pet-food-calc.html`，SHA-256：`ecc71dcf7643112e7979c7df2e73345898b8f03aaf54b3f0fefec51dd0089c60`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | resultIcon, dailyAmount, caloriesNeeded, scheduleGrid, tips |
| `run` | 按字段输入重新计算 | resultIcon, dailyAmount, caloriesNeeded, scheduleGrid, tips |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--weight` | 体重 (kg) | number | "10" | min=0.5, max=100 |
| `--age` | 年龄阶段 | select-one | "adult" | "puppy" (幼年 (< 1岁)); "adult" (成年 (1-7岁)); "senior" (老年 (> 7岁)) |
| `--activity` | 活动量 | select-one | "moderate" | "low" (较少运动（室内为主）); "moderate" (适中运动（每天散步）); "high" (大量运动（工作犬/运动犬）) |
| `--condition` | 体型状态 | select-one | "normal" | "underweight" (偏瘦（需增重）); "normal" (正常); "overweight" (偏胖（需减重）) |
| `--calories` | 粮食热量 (kcal/100g) - 参见包装说明 | number | "350" | min=200, max=500 |

已检查示例：

```bash
html-tools pets/pet-food-calc calculate --weight '10' --age 'adult' --activity 'moderate' --condition 'normal' --calories '350' --json
```

### pets/pet-age-calculator-cn

宠物年龄计算器：将猫狗年龄转换为人类年龄

来源：`html-tools/tools/pets/pet-age-calculator-cn.html`，SHA-256：`3c2a48be66041647c4aace2b840359a194203009636856149cb3551f68e4edd9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | humanAge, lifeStage, comparisonTable |
| `update-comparison-table` | updateComparisonTable | comparisonTable |
| `run` | 按字段输入重新计算 | humanAge, lifeStage, comparisonTable |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--dog-size` | 狗狗体型 | select-one | "medium" | "small" (小型犬 (< 9kg)); "medium" (中型犬 (9-22kg)); "large" (大型犬 (> 22kg)) |
| `--pet-age` | 宠物年龄 (岁) | number | "3" | min=0, max=30 |

已检查示例：

```bash
html-tools pets/pet-age-calculator-cn calculate --dog-size 'medium' --pet-age '3' --json
```

### pets/pet-age-calculator

猫狗年龄计算器：计算宠物相当于人类的年龄，支持狗、猫等常见宠物

来源：`html-tools/tools/pets/pet-age-calculator.html`，SHA-256：`768e77e10af86cb0225be6b0ad0f9dd205c007f00b064e28bcbbb670577cb2ea`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算人类年龄 | icon, humanAge, humanAgeText, detail |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--pet-type` | 宠物类型 | select-one | "dog" | "dog" (狗 🐕); "cat" (猫 🐈); "rabbit" (兔子 🐰); "hamster" (仓鼠 🐹) |
| `--pet-age` | 宠物年龄（岁） | number | "" | min=0, max=30 |

已检查示例：

```bash
html-tools pets/pet-age-calculator calculate --pet-type 'dog' --pet-age '10' --json
```

### pets/pet-medication-dosage

宠物用药剂量计算器：根据宠物体重和兽医常用剂量标准（mg/kg），计算常见非处方用药（驱虫药、消炎药等）的参考剂量范围。

来源：`html-tools/tools/pets/pet-medication-dosage.html`，SHA-256：`b5e1d549b413eaaa103af14901b112f412dc18982256216c58a12bec8160648f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算剂量 | doseMid, doseRange, weightKg, dosePerKg, doseFreq, drugCategory |
| `build-presets` | buildPresets | drugPresetList |
| `run` | 按字段输入重新计算 | drugPresetList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--pet-weight` | 宠物体重 | number | "" | min=0.1, max=200 |
| `--weight-unit` | 体重单位 | select-one | "kg" | "kg" (千克（kg）); "lb" (磅（lb）) |
| `--pet-type` | 宠物类型 | select-one | "dog" | "dog" (狗（犬）); "cat" (猫（猫科）) |
| `--custom-dose-min` | 自定义剂量范围 mg/kg（可选） | number | "" | min=0 |
| `--custom-dose-max` | 最大值 | number | "" | min=0 |

已检查示例：

```bash
html-tools pets/pet-medication-dosage calculate --pet-weight '10' --weight-unit 'kg' --pet-type 'dog' --custom-dose-min '10' --custom-dose-max '10' --json
```

## privacy

### privacy/credit-card

信用卡验证器：信用卡号验证

来源：`html-tools/tools/privacy/credit-card.html`，SHA-256：`59634b20bbfad8d6a11dca8386ace5fa2f67212849aa0052b6988b539ef17ed3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `validate` | 验证 | cardNumber, cardBrand, validationIcon, cardType, miiValue, issuerValue, lengthValue, luhnValue, luhnContent |
| `validate-card` | validateCard | cardNumber, cardBrand, validationIcon, cardType, miiValue, issuerValue, lengthValue, luhnValue, luhnContent |
| `run` | 按字段输入重新计算 | input |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 1234 5678 9012 3456 | text | "" |  |

已检查示例：

```bash
html-tools privacy/credit-card validate --input '4111111111111111' --json
```

### privacy/encrypt-decrypt

AES 加密解密：使用 AES-GCM 算法进行文本加密和解密

来源：`html-tools/tools/privacy/encrypt-decrypt.html`，SHA-256：`d21540c1a5852a76fe0ac0e11c48d27b5527a35892345d0cb8f86e0cb5b8cb72`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `process-btn` | 加密 | output |
| `encrypt` | 加密 | input-label, output-label |
| `decrypt` | 解密 | input-label, output-label |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 明文 | textarea | "" |  |
| `--password` | 输入加密密码 | password | "" |  |
| `--key-length` | 密钥长度 | select-one | "256" | "128" (AES-128 (128 位)); "256" (AES-256 (256 位)) |
| `--output-format` | 输出格式 | select-one | "base64" | "base64" (Base64); "hex" (Hex) |

已检查示例：

```bash
html-tools privacy/encrypt-decrypt process-btn --input 'Hello world
Hello world
TypeScript' --password 'Hello world
Hello world
TypeScript' --key-length '256' --output-format 'base64' --json
```

### privacy/exif-remover

EXIF 信息移除器：EXIF 信息移除器，在线使用，隐私安全，浏览器本地运行无需上传

来源：`html-tools/tools/privacy/exif-remover.html`，SHA-256：`dbbf6375fe507bcea60b3eb9ff78274bc078e4b84cab50f4ec45f317f28241b7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-all` | 下载全部 | download |
| `update-stats` | updateStats | totalCount, processedCount |
| `run` | 按字段输入重新计算 | qualityValue, totalCount, processedCount, imageList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--quality` | 输出质量 92% | range | "92" | min=10, max=100 |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools privacy/exif-remover export-all --quality '92' --file-input 'generated/fixtures/sample.png' --json
```

### privacy/file-hash

文件哈希校验：计算文件的 MD5、SHA-1、SHA-256 哈希值

来源：`html-tools/tools/privacy/file-hash.html`，SHA-256：`cd50b7558900cd19db363d87bfb7570b7dd692bf5c6dce0cbd180c1f4d8c006f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | fileName, fileMeta, progressText, md5Hash, sha1Hash, sha256Hash, sha512Hash |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |
| `--verify-input` | 粘贴要验证的哈希值... | text | "" |  |

已检查示例：

```bash
html-tools privacy/file-hash run --file-input 'generated/fixtures/sample.txt' --verify-input 'Hello world
Hello world
TypeScript' --json
```

### privacy/idcard-parser

身份证号码解析：身份证号码解析，在线分析，隐私安全，浏览器本地运行无需上传

来源：`html-tools/tools/privacy/idcard-parser.html`，SHA-256：`f2e5de2c9a303e24ffcbf92fd78b299f4a209d2cded394afae97e604422c0631`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse-id-card` | parseIdCard | idStructure |
| `run` | 按字段输入重新计算 | idStructure |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--id-input` | 请输入18位身份证号码 | text | "" |  |

已检查示例：

```bash
html-tools privacy/idcard-parser parse-id-card --id-input 'Hello world
Hello world
TypeScript' --json
```

### privacy/log-masker

日志脱敏：自动识别并脱敏日志中的 IP、邮箱、手机号等敏感信息

来源：`html-tools/tools/privacy/log-masker.html`，SHA-256：`89843bc6ad7a0e1a6275cb984a12eace5a52744de23921302ed6a02899e56dc7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `mask` | 脱敏处理 | output |
| `mask-log` | maskLog | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--mask-ip` / `--no-mask-ip` | IPv4 地址 | checkbox | true |  |
| `--mask-ipv6` / `--no-mask-ipv6` | IPv6 地址 | checkbox | true |  |
| `--mask-email` / `--no-mask-email` | 邮箱 | checkbox | true |  |
| `--mask-phone` / `--no-mask-phone` | 手机号 | checkbox | true |  |
| `--mask-id-card` / `--no-mask-id-card` | 身份证号 | checkbox | true |  |
| `--mask-bank-card` / `--no-mask-bank-card` | 银行卡号 | checkbox | true |  |
| `--mask-mac` / `--no-mask-mac` | MAC 地址 | checkbox | false |  |
| `--input` | 输入日志 | textarea | "" |  |

已检查示例：

```bash
html-tools privacy/log-masker mask --mask-ip --mask-ipv6 --mask-email --mask-phone --mask-id-card --mask-bank-card --no-mask-mac --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### privacy/metadata-viewer

文件元数据查看器：文件元数据查看器，即时预览，隐私安全，浏览器本地运行无需上传

来源：`html-tools/tools/privacy/metadata-viewer.html`，SHA-256：`2cd68f2008808b691dce4c4663141739b6a8cb0b494b2c32537d377f2c7c6ad4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `export-json` | 下载 JSON | download |
| `run` | 按字段输入重新计算 | filePreview, basicInfo, metadataCount, categoryTabs, metadataContent, jsonView |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools privacy/metadata-viewer export-json --file-input 'generated/fixtures/sample.txt' --json
```

### privacy/password-strength

密码强度检测：检测密码强度，分析安全性和破解时间估算

来源：`html-tools/tools/privacy/password-strength.html`，SHA-256：`540547c3bbb639cf7fff65e062e2d2c16236ffe88559dead665b90a95ff19924`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | analyze | strengthLabel, criteriaGrid, statLength, statEntropy, statCrackTime |
| `run` | 按字段输入重新计算 | strengthLabel, criteriaGrid, statLength, statEntropy, statCrackTime |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--password` | 输入要检测的密码... | password | "" |  |

已检查示例：

```bash
html-tools privacy/password-strength analyze --password 'Hello world
Hello world
TypeScript' --json
```

### privacy/random-identity

随机身份生成：生成随机假身份信息用于测试和隐私保护

来源：`html-tools/tools/privacy/random-identity.html`，SHA-256：`a26b2604df8c4e6b624ec0ce1413d80f0fb5f5aab49204e1616d307c31352f62`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成新身份 | avatar, name, genderAge, infoGrid |
| `generate-phone` | generatePhone | value |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools privacy/random-identity generate  --json
```

操作限制：部分原页面操作未通过迁移检查: generate-identity: 原工具没有产生可输出的结果，请检查参数

### privacy/random-key

随机密钥生成器：随机密钥生成

来源：`html-tools/tools/privacy/random-key.html`，SHA-256：`8c51f8962e3e40b045cb2c5f8e656bc3a0b4edbf07d26f55f3398f5e71cfab26`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 重新生成 | output |
| `generate-uuid` | generateUUID | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--length` | 长度 | number | "32" | min=1, max=256 |
| `--format` | 格式 | select-one | "alphanumeric" | "hex" (十六进制 (Hex)); "base64" (Base64); "alphanumeric" (字母数字); "ascii" (可打印 ASCII) |
| `--uppercase` / `--no-uppercase` | 大写字母 | checkbox | true |  |
| `--lowercase` / `--no-lowercase` | 小写字母 | checkbox | true |  |
| `--numbers` / `--no-numbers` | 数字 | checkbox | true |  |
| `--symbols` / `--no-symbols` | 特殊字符 | checkbox | false |  |

已检查示例：

```bash
html-tools privacy/random-key generate --length '32' --format 'alphanumeric' --uppercase --lowercase --numbers --no-symbols --json
```

### privacy/rsa-tool

RSA 加密解密：RSA 加密解密，安全加解密，隐私安全，浏览器本地运行无需上传

来源：`html-tools/tools/privacy/rsa-tool.html`，SHA-256：`dd9670eea9d626c0485d96eff6efc8a3647fe072ff265d0d05f4b470af5a1b22`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-keys` | 生成 RSA 密钥对 | publicKey, privateKey |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--public-key` | 公钥 (用于加密) | textarea | "" |  |
| `--private-key` | 私钥 (用于解密) | textarea | "" |  |
| `--plaintext` | 明文 | textarea | "" |  |
| `--encrypted-input` | 密文 (Base64) | textarea | "" |  |

已检查示例：

```bash
html-tools privacy/rsa-tool generate-keys --public-key 'Hello world
Hello world
TypeScript' --private-key 'Hello world
Hello world
TypeScript' --plaintext 'Hello world
Hello world
TypeScript' --encrypted-input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: encrypt-text: Invalid keyData | decrypt-text: Invalid keyData

### privacy/text-encrypt

文本加密解密：文本加密解密，安全加解密，隐私安全，浏览器本地运行无需上传

来源：`html-tools/tools/privacy/text-encrypt.html`，SHA-256：`793520b9743fb3ed68703ad96732aa40d63b169f9bb273d283c8b68e48c98122`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `encrypt-text` | 🔒 加密 | outputText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--key-length` | 密钥长度 | select-one | "256" | "128" (128 位); "256" (256 位) |
| `--password` | 加密密码 | password | "" |  |
| `--input-text` | 原文 / 密文 0 字符 | textarea | "" |  |

已检查示例：

```bash
html-tools privacy/text-encrypt encrypt-text --key-length '256' --password 'Hello world
Hello world
TypeScript' --input-text 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: decrypt-text: The operation failed for an operation-specific reason | update-count: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### privacy/zero-width-text-steganography

文本隐写（零宽字符）工具：将隐藏信息编码为零宽字符（U+200B 等）嵌入普通文本，或从文本中提取/检测隐藏的零宽字符内容。

来源：`html-tools/tools/privacy/zero-width-text-steganography.html`，SHA-256：`d0021ed5eee4bab8e3e9ca0fa55fabf83fbb6efd37db2f1f9f0697738d007fa0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 执行 | carrierInput, statZW, statCarrier, statSecret |
| `update-ui` | updateUI | leftLabel, rightLabel |
| `run-action` | runAction | carrierInput, statZW, statCarrier, statSecret |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--mode-select` | modeSelect | select-one | "encode" | "encode" (编码（隐写）); "decode" (解码（提取）); "detect" (检测（可视化）); "strip" (清除零宽字符) |
| `--encoding-method` | encodingMethod | select-one | "binary" | "binary" (二进制（U+200B/U+200C）); "ternary" (三进制（U+200B/U+200C/U+200D）) |
| `--insert-pos` | insertPos | select-one | "after-first" | "after-first" (第一个词后); "between-words" (词间分散); "end" (文末) |
| `--carrier-input` | 在此输入载体文本（明文）... | textarea | "" |  |
| `--secret-input` | 在此输入要隐藏的秘密信息... | textarea | "" |  |

已检查示例：

```bash
html-tools privacy/zero-width-text-steganography run --mode-select 'encode' --encoding-method 'binary' --insert-pos 'after-first' --carrier-input 'Hello world
Hello world
TypeScript' --secret-input 'Hello world
Hello world
TypeScript' --json
```

## productivity

### productivity/timezone-meeting

跨时区会议安排：找到适合不同时区的会议时间

来源：`html-tools/tools/productivity/timezone-meeting.html`，SHA-256：`54fa103795f357812a5f83e70feaa435d2f1b4a32523f73265f5e354f046e2ff`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | locations, timelineContent |
| `run` | 按字段输入重新计算 | locations, timelineContent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` | 会议时间: | text | "北京" |  |
| `--field-2` | 会议时间: | select-one | "8" | "8" (中国 (UTC+8)); "9" (日本/韩国 (UTC+9)); "8" (新加坡 (UTC+8)); "5.5" (印度 (UTC+5:30)); "4" (迪拜 (UTC+4)); "3" (莫斯科 (UTC+3)); "0" (英国 (UTC+0)); "1" (德国/法国 (UTC+1)); "-5" (美东 (UTC-5)); "-6" (美中 (UTC-6)); "-8" (美西 (UTC-8)); "10" (澳洲东部 (UTC+10)) |
| `--field-3` | 会议时间: | text | "纽约" |  |
| `--field-4` | 会议时间: | select-one | "-5" | "8" (中国 (UTC+8)); "9" (日本/韩国 (UTC+9)); "8" (新加坡 (UTC+8)); "5.5" (印度 (UTC+5:30)); "4" (迪拜 (UTC+4)); "3" (莫斯科 (UTC+3)); "0" (英国 (UTC+0)); "1" (德国/法国 (UTC+1)); "-5" (美东 (UTC-5)); "-6" (美中 (UTC-6)); "-8" (美西 (UTC-8)); "10" (澳洲东部 (UTC+10)) |
| `--field-5` | 会议时间: | text | "伦敦" |  |
| `--field-6` | 会议时间: | select-one | "0" | "8" (中国 (UTC+8)); "9" (日本/韩国 (UTC+9)); "8" (新加坡 (UTC+8)); "5.5" (印度 (UTC+5:30)); "4" (迪拜 (UTC+4)); "3" (莫斯科 (UTC+3)); "0" (英国 (UTC+0)); "1" (德国/法国 (UTC+1)); "-5" (美东 (UTC-5)); "-6" (美中 (UTC-6)); "-8" (美西 (UTC-8)); "10" (澳洲东部 (UTC+10)) |
| `--meeting-time` | 会议时间: | time | "14:00" |  |
| `--base-timezone` | 会议时间: | select-one | "8" | "8" (中国 (UTC+8)); "9" (日本/韩国 (UTC+9)); "8" (新加坡 (UTC+8)); "5.5" (印度 (UTC+5:30)); "4" (迪拜 (UTC+4)); "3" (莫斯科 (UTC+3)); "0" (英国 (UTC+0)); "1" (德国/法国 (UTC+1)); "-5" (美东 (UTC-5)); "-6" (美中 (UTC-6)); "-8" (美西 (UTC-8)); "10" (澳洲东部 (UTC+10)) |

已检查示例：

```bash
html-tools productivity/timezone-meeting render --field-1 '北京' --field-2 '8' --field-3 '纽约' --field-4 '-5' --field-5 '伦敦' --field-6 '0' --meeting-time '14:00' --base-timezone '8' --json
```

### productivity/reading-time

阅读时间计算：计算文章阅读时间，预估阅读所需分钟数

来源：`html-tools/tools/productivity/reading-time.html`，SHA-256：`a825cc3e7055ee5c6c9803dc56cff0bfaa5a0a11d9cadb7e6149823bc5656d31`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | charCount, wordCount, readingTime, slow, medium, fast, veryFast |
| `run` | 按字段输入重新计算 | charCount, wordCount, readingTime, slow, medium, fast, veryFast |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-input` | 阅读速度： | textarea | "" |  |
| `--speed-select` | 阅读速度： | select-one | "300" | "200" (慢速（200字/分）); "300" (中速（300字/分）); "400" (快速（400字/分）); "500" (很快（500字/分）) |

已检查示例：

```bash
html-tools productivity/reading-time calculate --text-input 'Hello world
Hello world
TypeScript' --speed-select '300' --json
```

### productivity/ics-calendar-generator

ICS 日历事件生成器：填写事件标题、时间、地点、重复规则，生成标准 .ics 文件，可直接导入 Google Calendar / Apple 日历 / Outlook。

来源：`html-tools/tools/productivity/ics-calendar-generator.html`，SHA-256：`ebb426cb5e9f67cbde2711a21afe64effbbe36871d85ce715e3d1284ad92cce0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 ICS | icsPreview |
| `generate-uid` | generateUid | value |
| `generate-dtstamp` | generateDtstamp | value |
| `build-ics` | buildIcs | value |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--evt-title` | 事件标题 * | text | "" |  |
| `--evt-start` | 开始时间 * | datetime-local | "2026-10-30T11:45" |  |
| `--evt-end` | 结束时间 * | datetime-local | "2026-10-30T12:45" |  |
| `--evt-location` | 地点 | text | "" |  |
| `--evt-url` | 链接 URL | url | "" |  |
| `--evt-desc` | 描述 | textarea | "" |  |
| `--evt-organizer` | 组织者邮箱 | email | "" |  |
| `--evt-attendees` | 参与者邮箱（逗号分隔） | text | "" |  |
| `--alarm-enabled` / `--no-alarm-enabled` | 添加提醒 | checkbox | false |  |
| `--alarm-minutes` | alarmMinutes | number | "15" | min=0, max=10080 |
| `--alarm-unit` | alarmUnit | select-one | "1" | "1" (分钟); "60" (小时); "1440" (天) |
| `--recur-freq` | 重复频率 | select-one | "" | "" (不重复); "DAILY" (每天); "WEEKLY" (每周); "MONTHLY" (每月); "YEARLY" (每年) |
| `--recur-interval` | 间隔（每 N 次） | number | "1" | min=1, max=999 |
| `--recur-end-type` | 结束方式 | select-one | "never" | "never" (永不结束); "count" (重复次数); "until" (结束日期) |
| `--recur-count` | 重复次数 | number | "10" | min=1, max=9999 |
| `--recur-until` | 结束日期 | date | "" |  |

已检查示例：

```bash
html-tools productivity/ics-calendar-generator generate --evt-title 'Demo meeting' --evt-start '2025-01-01T12:00' --evt-end '2025-01-01T13:00' --evt-location 'Hello world
Hello world
TypeScript' --evt-url 'https://example.com/path?a=1' --evt-desc 'Hello world
Hello world
TypeScript' --evt-organizer 'alice@example.com' --evt-attendees 'bob@example.com' --no-alarm-enabled --alarm-minutes '15' --alarm-unit '1' --recur-freq 'DAILY' --recur-interval '1' --recur-end-type 'never' --recur-count '10' --recur-until '2025-01-01' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

## realestate

### realestate/mortgage

房贷月供计算器：计算房贷月供，对比两种还款方式

来源：`html-tools/tools/realestate/mortgage.html`，SHA-256：`90ba974587daaad118ca81dd2b20a2e1ef41ede017249cb69b076b528bf97aa2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `equal-payment` | 等额本息 | monthlyPayment, paymentNote, downPayment, loanAmount, totalPayment, totalInterest, interestRatio, pieChart, scheduleBody |
| `equal-principal` | 等额本金 | monthlyPayment, paymentNote, downPayment, loanAmount, totalPayment, totalInterest, interestRatio, pieChart, scheduleBody |
| `run` | 按字段输入重新计算 | monthlyPayment, paymentNote, downPayment, loanAmount, totalPayment, totalInterest, interestRatio, pieChart, scheduleBody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--house-price` | 请输入数字输入框 | number | "200" | min=0 |
| `--down-payment-rate` | 请输入数字输入框 | number | "30" | min=0, max=100 |
| `--years` | 请输入数字输入框 | number | "30" | min=1, max=30 |
| `--rate` | 请输入数字输入框 | number | "3.1" | min=0, max=20 |

已检查示例：

```bash
html-tools realestate/mortgage equal-payment --house-price '200' --down-payment-rate '30' --years '30' --rate '3.1' --json
```

### realestate/down-payment

首付计算器：计算购房首付款及贷款额度

来源：`html-tools/tools/realestate/down-payment.html`，SHA-256：`3706355992862e2d47f1c0ca3cd4917a0ed7206d921c31d324c77dc2e15def20`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-amount` | 计算首付金额 | heroLabel, heroValue, heroNote, progressText, resultDownPayment, resultLoan, resultTotal, monthlyPayment, totalPayment, totalInterest, tipBox |
| `calc-ratio` | 反推首付比例 | heroLabel, heroValue, heroNote, progressText, resultDownPayment, resultLoan, resultTotal, monthlyPayment, totalPayment, totalInterest, tipBox |
| `run` | 按字段输入重新计算 | heroLabel, heroValue, heroNote, progressText, resultDownPayment, resultLoan, resultTotal, monthlyPayment, totalPayment, totalInterest, tipBox |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--house-price` | 请输入数字输入框 | number | "200" | min=0 |
| `--down-payment-rate` | 请输入数字输入框 | number | "30" | min=0, max=100 |
| `--down-payment-amount` | 请输入数字输入框 | number | "60" | min=0 |
| `--years` | 请输入数字输入框 | number | "30" | min=1, max=30 |
| `--rate` | 请输入数字输入框 | number | "3.1" | min=0, max=20 |

已检查示例：

```bash
html-tools realestate/down-payment calc-amount --house-price '200' --down-payment-rate '30' --down-payment-amount '60' --years '30' --rate '3.1' --json
```

### realestate/prepayment

提前还款计算器：计算提前还款节省的利息

来源：`html-tools/tools/realestate/prepayment.html`，SHA-256：`c2053d0ed7e48b04480829d488064037fe338ff347a18d23f4e4971afe74a436`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `reduce-term` | 缩短年限 | savedInterest, originalMonthly, paidPrincipal, paidInterest, remainingPrincipal, oldRemainMonths, newRemainMonths, oldMonthly, newMonthly, totalInterestWithout, totalInterestWith, tipBox |
| `reduce-payment` | 减少月供 | savedInterest, originalMonthly, paidPrincipal, paidInterest, remainingPrincipal, oldRemainMonths, newRemainMonths, oldMonthly, newMonthly, totalInterestWithout, totalInterestWith, tipBox |
| `run` | 按字段输入重新计算 | savedInterest, originalMonthly, paidPrincipal, paidInterest, remainingPrincipal, oldRemainMonths, newRemainMonths, oldMonthly, newMonthly, totalInterestWithout, totalInterestWith, tipBox |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--loan-amount` | 请输入数字输入框 | number | "100" | min=0 |
| `--total-years` | 请输入数字输入框 | number | "30" | min=1, max=30 |
| `--rate` | 请输入数字输入框 | number | "3.1" | min=0, max=20 |
| `--loan-type` | 还款方式 | select-one | "equal-payment" | "equal-payment" (等额本息); "equal-principal" (等额本金) |
| `--paid-months` | 请输入数字输入框 | number | "24" | min=0 |
| `--prepay-amount` | 请输入数字输入框 | number | "10" | min=0 |

已检查示例：

```bash
html-tools realestate/prepayment reduce-term --loan-amount '100' --total-years '30' --rate '3.1' --loan-type 'equal-payment' --paid-months '24' --prepay-amount '10' --json
```

### realestate/combo-loan

组合贷款计算器：计算公积金+商贷组合月供

来源：`html-tools/tools/realestate/combo-loan.html`，SHA-256：`7d6da4139fd85e19f04fbd27ad7483c2150245b9ea63559162a84debbbf95f13`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `equal-payment` | 等额本息 | totalMonthly, monthlyNote, commercialMonthly, fundMonthly, pieChart, legendCommercialPrincipal, legendCommercialInterest, legendFundPrincipal, legendFundInterest, totalLoan, totalPayment, totalInterest, commercialInterest, fundInterest |
| `equal-principal` | 等额本金 | totalMonthly, monthlyNote, commercialMonthly, fundMonthly, pieChart, legendCommercialPrincipal, legendCommercialInterest, legendFundPrincipal, legendFundInterest, totalLoan, totalPayment, totalInterest, commercialInterest, fundInterest |
| `run` | 按字段输入重新计算 | totalMonthly, monthlyNote, commercialMonthly, fundMonthly, pieChart, legendCommercialPrincipal, legendCommercialInterest, legendFundPrincipal, legendFundInterest, totalLoan, totalPayment, totalInterest, commercialInterest, fundInterest |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--commercial-amount` | 请输入数字输入框 | number | "70" | min=0 |
| `--commercial-years` | 请输入数字输入框 | number | "30" | min=1, max=30 |
| `--commercial-rate` | 请输入数字输入框 | number | "3.1" | min=0, max=20 |
| `--fund-amount` | 请输入数字输入框 | number | "30" | min=0 |
| `--fund-years` | 请输入数字输入框 | number | "30" | min=1, max=30 |
| `--fund-rate` | 请输入数字输入框 | number | "2.85" | min=0, max=20 |

已检查示例：

```bash
html-tools realestate/combo-loan equal-payment --commercial-amount '70' --commercial-years '30' --commercial-rate '3.1' --fund-amount '30' --fund-years '30' --fund-rate '2.85' --json
```

### realestate/deed-tax

契税计算器：计算购房契税费用

来源：`html-tools/tools/realestate/deed-tax.html`，SHA-256：`081eee2cf9f654c69ae51bda9793388ec20cac4d0b3c64a04f5b9b56c35065d6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算契税 | resultValue, resultRate, detailList, policyInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--house-type` | 首套房 | radio | "1" | "1" (1); "2" (2); "3" (3) |
| `--area` | 房屋面积 | number | "" | min=0 |
| `--price` | 成交价格 | number | "" | min=0 |

已检查示例：

```bash
html-tools realestate/deed-tax calculate --house-type '1' --area '10' --price '10' --json
```

### realestate/property-tax

房产交易税费计算器：计算房产交易相关税费

来源：`html-tools/tools/realestate/property-tax.html`，SHA-256：`b5109753ce0d402c1fc62ef7fcc719ffce80a66b6a3c9d363521e1abe0b2d50d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算税费 | totalValue, taxGrid, detailBody, infoBox |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--property-type` | 新房 | radio | "new" | "new" (new); "second" (second) |
| `--house-count` | 首套 | radio | "1" | "1" (1); "2" (2); "3" (3) |
| `--area` | 房屋面积 | number | "" | min=0 |
| `--price` | 成交总价 | number | "" | min=0 |
| `--original-price` | 原购买价 | number | "" | min=0 |
| `--hold-years` | 持有年限 | select-one | "0" | "0" (不满2年); "2" (满2年不满5年); "5" (满5年) |
| `--is-unique` / `--no-is-unique` | 卖方家庭唯一住房 | checkbox | false |  |

已检查示例：

```bash
html-tools realestate/property-tax calculate --property-type 'new' --house-count '1' --area '10' --price '10' --original-price '10' --hold-years '0' --no-is-unique --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### realestate/rental-cost

租房成本计算器：计算租房总成本

来源：`html-tools/tools/realestate/rental-cost.html`，SHA-256：`d732fc4b1e95b387567d1112c9c251204343f3ec657ecffa734453262e119ab6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算总成本 | totalCost, monthlyCost, firstMonth, breakdownList, chartLegend |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--monthly-rent` | 月租金 | number | "" | min=0 |
| `--lease-term` | 租期 | number | "12" | min=1 |
| `--deposit` | 押金 | number | "" | min=0 |
| `--agency-fee` | 中介费 | number | "0" | min=0 |
| `--property-fee` | 物业费（月） | number | "0" | min=0 |
| `--utilities` | 水电费（月均） | number | "0" | min=0 |
| `--internet` | 网络费（月） | number | "0" | min=0 |
| `--parking` | 停车费（月） | number | "0" | min=0 |
| `--other` | 其他费用（月） | number | "0" | min=0 |

已检查示例：

```bash
html-tools realestate/rental-cost calculate --monthly-rent '10' --lease-term '12' --deposit '10' --agency-fee '0' --property-fee '0' --utilities '0' --internet '0' --parking '0' --other '0' --json
```

### realestate/rent-yield

租金回报率计算器：计算房产出租的租金回报率

来源：`html-tools/tools/realestate/rent-yield.html`，SHA-256：`85b8298482002c2e35f23c0f7d83d57d3dc79b715eb8de91632d44f0fce68e2f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | grossYield, netYield, rentToPrice, paybackYears, gradeBadge, gradeText, grossIncome, vacancyLoss, propertyFeeOut, maintenanceFeeOut, agencyFeeOut, netIncome |
| `run` | 按字段输入重新计算 | grossYield, netYield, rentToPrice, paybackYears, gradeBadge, gradeText, grossIncome, vacancyLoss, propertyFeeOut, maintenanceFeeOut, agencyFeeOut, netIncome |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--house-price` | 房屋总价（万元） | number | "300" | min=0 |
| `--monthly-rent` | 月租金（元） | number | "4000" | min=0 |
| `--property-fee` | 年物业费（元） | number | "3600" | min=0 |
| `--maintenance-fee` | 年维护费用（元） | number | "2000" | min=0 |
| `--vacancy-months` | 年空置月数 | number | "0.5" | min=0, max=12 |
| `--agency-rate` | 中介费率（%） | number | "5" | min=0, max=20 |

已检查示例：

```bash
html-tools realestate/rent-yield calculate --house-price '300' --monthly-rent '4000' --property-fee '3600' --maintenance-fee '2000' --vacancy-months '0.5' --agency-rate '5' --json
```

### realestate/rent-vs-buy

租房vs买房分析：分析租房和买房的长期成本对比

来源：`html-tools/tools/realestate/rent-vs-buy.html`，SHA-256：`987765e7fa8a9d16ad9019436639749a1840f69f94beae3fb12ce40360f03695`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | 开始分析 | recIcon, recText, recReason, totalRent, investmentGain, rentNetWorth, downPayment, totalMortgage, futureHouseValue, remainingLoan, buyNetWorth, analysisNote |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--monthly-rent` | 月租金 (元) | number | "5000" | min=0 |
| `--house-price` | 房屋总价 (万元) | number | "300" | min=0 |
| `--down-payment-ratio` | 首付比例 (%) | number | "30" | min=0, max=100 |
| `--loan-rate` | 贷款利率 (%) | number | "4.2" | min=0 |
| `--loan-years` | 贷款年限 (年) | number | "30" | min=1, max=30 |
| `--analysis-years` | 分析年限 (年) | number | "10" | min=1, max=50 |
| `--house-growth-rate` | 预期房价年增长率 (%) | number | "3" |  |
| `--rent-growth-rate` | 租金年增长率 (%) | number | "3" |  |
| `--investment-rate` | 投资年化收益率 (%) | number | "5" |  |

已检查示例：

```bash
html-tools realestate/rent-vs-buy analyze --monthly-rent '5000' --house-price '300' --down-payment-ratio '30' --loan-rate '4.2' --loan-years '30' --analysis-years '10' --house-growth-rate '3' --rent-growth-rate '3' --investment-rate '5' --json
```

### realestate/property-roi

房产投资ROI计算器：计算房产投资的投资回报率

来源：`html-tools/tools/realestate/property-roi.html`，SHA-256：`078333a28f9192683d5e6abdf5f2604c0108d9f6df86f201a25f12d84935e625`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算ROI | totalROI, totalCost, netRentalIncome, appreciation, totalInterest, netProfit, paybackPeriod, rentalYield, capitalGainRate, cashOnCashReturn, leverageRatio, timeline |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--purchase-price` | 购房总价 (万元) | number | "200" | min=0 |
| `--down-payment` | 首付金额 (万元) | number | "60" | min=0 |
| `--loan-rate` | 贷款利率 (%) | number | "4.2" | min=0 |
| `--loan-years` | 贷款年限 (年) | number | "30" | min=1, max=30 |
| `--renovation-cost` | 装修费用 (万元) | number | "10" | min=0 |
| `--other-cost` | 其他费用 (万元) | number | "5" | min=0 |
| `--monthly-rent` | 月租金收入 (元) | number | "4000" | min=0 |
| `--vacancy-rate` | 年空置率 (%) | number | "5" | min=0, max=100 |
| `--maintenance-cost` | 年维护成本 (元) | number | "3000" | min=0 |
| `--property-fee` | 物业管理费 (元/月) | number | "300" | min=0 |
| `--appreciation-rate` | 预期房价年增长率 (%) | number | "3" |  |
| `--holding-years` | 持有年限 (年) | number | "10" | min=1, max=50 |

已检查示例：

```bash
html-tools realestate/property-roi calculate --purchase-price '200' --down-payment '60' --loan-rate '4.2' --loan-years '30' --renovation-cost '10' --other-cost '5' --monthly-rent '4000' --vacancy-rate '5' --maintenance-cost '3000' --property-fee '300' --appreciation-rate '3' --holding-years '10' --json
```

### realestate/lpr-calc

LPR利率调整计算器：计算LPR调整后的月供变化

来源：`html-tools/tools/realestate/lpr-calc.html`，SHA-256：`e4d183baebf278e1372e214c23ab2599ec7b5694f32f78901d10638390a7060f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算利率变化 | monthlyChange, oldRateDisplay, oldMonthly, oldInterest, oldTotal, newRateDisplay, newMonthly, newInterest, newTotal, savingsMonthly, savingsYearly, savingsTotal |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--principal` | 贷款本金 (万元) | number | "100" | min=0 |
| `--loan-years` | 贷款期限 (年) | number | "30" | min=1, max=30 |
| `--paid-months` | 已还期数 (月) | number | "24" | min=0 |
| `--payment-type` | 还款方式 | select-one | "equal" | "equal" (等额本息); "principal" (等额本金) |
| `--old-rate` | 原执行利率 (%) | number | "4.9" | min=0 |
| `--new-lpr` | 新LPR利率 (%) | number | "3.6" | min=0 |
| `--bp-add` | 加点数 (BP) | number | "0" |  |
| `--repricing-cycle` | 重定价周期 | select-one | "yearly" | "yearly" (每年1月1日); "monthly" (每月) |

已检查示例：

```bash
html-tools realestate/lpr-calc calculate --principal '100' --loan-years '30' --paid-months '24' --payment-type 'equal' --old-rate '4.9' --new-lpr '3.6' --bp-add '0' --repricing-cycle 'yearly' --json
```

### realestate/property-fee

物业费计算器：计算年度物业管理费用

来源：`html-tools/tools/realestate/property-fee.html`，SHA-256：`40be244b0862a45baa040ef4f7c0e3ff470539568e2e8c03fef4ef137e388061`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | monthlyFee, yearlyFee, maintenanceFund, tenYearFee, detailArea, detailRate, detailMonthly, detailQuarterly, detailHalfYear, detailYearly |
| `run` | 按字段输入重新计算 | monthlyFee, yearlyFee, maintenanceFund, tenYearFee, detailArea, detailRate, detailMonthly, detailQuarterly, detailHalfYear, detailYearly |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--area` | 建筑面积（㎡） | number | "100" | min=1 |
| `--fee-rate` | 物业费单价（元/㎡/月） | number | "2.5" | min=0 |
| `--house-price` | 房屋单价（元/㎡） | number | "15000" | min=0 |
| `--maintenance-rate` | 维修基金比例（%） | number | "2" | min=0, max=10 |
| `--has-elevator` | 是否有电梯 | select-one | "yes" | "no" (无电梯); "yes" (有电梯) |

已检查示例：

```bash
html-tools realestate/property-fee calculate --area '100' --fee-rate '2.5' --house-price '15000' --maintenance-rate '2' --has-elevator 'yes' --json
```

### realestate/decoration-budget

装修预算计算器：估算房屋装修预算

来源：`html-tools/tools/realestate/decoration-budget.html`，SHA-256：`ac1e90cc391d811d39338ad5c0655a84a2b1a3491e530624d36f6899e27c07ab`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算预算 | totalBudget, budgetList, proportionList, tipsList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--area` | 建筑面积 (平方米) | number | "100" | min=1 |
| `--house-type` | 房屋类型 | select-one | "new" | "new" (新房（毛坯）); "used" (二手房翻新); "partial" (局部改造) |
| `--design-fee` | 设计费用 (元/平方米) | number | "50" | min=0 |
| `--furniture-budget` | 家具家电预算 (万元) | number | "5" | min=0 |
| `--contingency` | 预留备用金比例 (%) | number | "10" | min=0, max=50 |

已检查示例：

```bash
html-tools realestate/decoration-budget calculate --area '100' --house-type 'new' --design-fee '50' --furniture-budget '5' --contingency '10' --json
```

### realestate/material-calc

装修材料用量计算器：计算装修所需材料用量

来源：`html-tools/tools/realestate/material-calc.html`，SHA-256：`728f3e9ae4226998bae36c070b842fc3b090a45bf523bfaeb6fa0373541c4619`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calc-floor` | 计算用量 | floorArea, floorCount, floorBuy |
| `calc-paint` | 计算用量 | totalPaintArea, paintLiters, paintBuckets |
| `calc-wallpaper` | 计算用量 | wallArea, wallpaperRolls, wallpaperBuy |
| `calc-wall-tile` | 计算用量 | tileArea, tileCount, tileBuy |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--floor-length` | 房间长度 (米) | number | "5" | min=0 |
| `--floor-width` | 房间宽度 (米) | number | "4" | min=0 |
| `--tile-length` | 单片规格-长 (厘米) | number | "80" | min=1 |
| `--tile-width` | 单片规格-宽 (厘米) | number | "80" | min=1 |
| `--floor-loss` | 损耗率 (%) | number | "5" | min=0, max=30 |
| `--paint-area` | 墙面面积 (㎡) | number | "100" | min=0 |
| `--paint-coats` | 涂刷遍数 | select-one | "2" | "1" (1遍); "2" (2遍); "3" (3遍) |
| `--paint-type` | 涂料类型 | select-one | "latex" | "latex" (乳胶漆 (12-14㎡/L)); "primer" (底漆 (15-18㎡/L)); "texture" (质感漆 (6-8㎡/L)) |
| `--paint-bucket` | 每桶容量 (升) | number | "5" | min=1 |
| `--room-perimeter` | 房间周长 (米) | number | "16" | min=0 |
| `--room-height` | 房间高度 (米) | number | "2.8" | min=0 |
| `--door-window-area` | 门窗面积 (㎡) | number | "8" | min=0 |
| `--wallpaper-width` | 墙纸规格-宽 (厘米) | number | "53" | min=1 |
| `--wallpaper-length` | 墙纸规格-长 (米) | number | "10" | min=1 |
| `--pattern-match` | 花纹对接 (厘米) | number | "0" | min=0 |
| `--wall-length` | 墙面长度 (米) | number | "4" | min=0 |
| `--wall-height` | 墙面高度 (米) | number | "2.4" | min=0 |
| `--deduct-area` | 扣除面积 (㎡) | number | "1.5" | min=0 |
| `--wall-tile-length` | 瓷砖规格-长 (厘米) | number | "30" | min=1 |
| `--wall-tile-width` | 瓷砖规格-宽 (厘米) | number | "60" | min=1 |
| `--tile-loss` | 损耗率 (%) | number | "8" | min=0, max=30 |

已检查示例：

```bash
html-tools realestate/material-calc calc-floor --floor-length '5' --floor-width '4' --tile-length '80' --tile-width '80' --floor-loss '5' --paint-area '100' --paint-coats '2' --paint-type 'latex' --paint-bucket '5' --room-perimeter '16' --room-height '2.8' --door-window-area '8' --wallpaper-width '53' --wallpaper-length '10' --pattern-match '0' --wall-length '4' --wall-height '2.4' --deduct-area '1.5' --wall-tile-length '30' --wall-tile-width '60' --tile-loss '8' --json
```

### realestate/rent-vs-buy-cn

Rent Vs Buy：Rent Vs Buy，在线使用，房产工具，浏览器本地运行无需上传

来源：`html-tools/tools/realestate/rent-vs-buy-cn.html`，SHA-256：`eb9bb4b49157cb7ee3e3cdd18897d3b5d747ede489c07db6f0f5cead0e404432`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | buyDownPayment, buyMonthlyPayment, buyTotalPayment, buyHouseValue, buyNetWorth, rentTotalRent, rentDownPaymentReturn, rentMonthlySavings, rentTotalReturn, rentNetWorth, analysisContent |
| `run` | 按字段输入重新计算 | buyDownPayment, buyMonthlyPayment, buyTotalPayment, buyHouseValue, buyNetWorth, rentTotalRent, rentDownPaymentReturn, rentMonthlySavings, rentTotalReturn, rentNetWorth, analysisContent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--house-price` | 房价 (万元) | number | "300" | min=0 |
| `--monthly-rent` | 月租金 (元) | number | "3000" | min=0 |
| `--down-payment` | 首付比例 (%) | number | "30" | min=0, max=100 |
| `--loan-years` | 贷款年限 (年) | number | "30" | min=1, max=30 |
| `--interest-rate` | 贷款利率 (%) | number | "4.3" | min=0, max=10 |
| `--compare-years` | 对比年限 (年) | number | "10" | min=1, max=30 |
| `--house-appreciation` | 房价年涨幅 (%) | number | "3" | min=-10, max=20 |
| `--rent-increase` | 租金年涨幅 (%) | number | "3" | min=0, max=20 |
| `--investment-return` | 投资收益率 (%) | number | "6" | min=0, max=20 |

已检查示例：

```bash
html-tools realestate/rent-vs-buy-cn calculate --house-price '300' --monthly-rent '3000' --down-payment '30' --loan-years '30' --interest-rate '4.3' --compare-years '10' --house-appreciation '3' --rent-increase '3' --investment-return '6' --json
```

## security

### security/bcrypt-generator

Bcrypt 工具：Bcrypt 密码哈希生成和验证

来源：`html-tools/tools/security/bcrypt-generator.html`，SHA-256：`a8b4fec613fc23af107edd753eb05a69f1282d14046e8e913fd2eaef9f6d53a6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-hash` | 生成哈希 | hashResult, verifyPassword, verifyHash |
| `run` | 按字段输入重新计算 | roundsValue |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--password` | 密码明文 | text | "mypassword123" |  |
| `--rounds` | rounds | range | "10" | min=4, max=14 |
| `--verify-password` | 密码明文 | text | "" |  |
| `--verify-hash` | Bcrypt 哈希 | textarea | "" |  |

已检查示例：

```bash
html-tools security/bcrypt-generator generate-hash --password 'mypassword123' --rounds '10' --verify-password 'Hello world
Hello world
TypeScript' --verify-hash 'Hello world
Hello world
TypeScript' --json
```

### security/cookie-parser

Cookie 解析器：Cookie 解析器，在线分析，安全工具，浏览器本地运行无需上传

来源：`html-tools/tools/security/cookie-parser.html`，SHA-256：`096ad241ca09acc01369d57daa773b2b3ae8c51ca1941c0ce7f0464c25635285`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse-cookies` | 🔍 解析 Cookie | statsGrid, cookiesContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--set-cookie-input` | 粘贴 Set-Cookie 响应头，每行一个： Set-Cookie: session=abc123; Path=/; Secure; HttpOnly; SameSite=Strict Set-Cookie: user=john; Max-Age=86400; Domain=.example.com | textarea | "" |  |
| `--cookie-header-input` | 粘贴 Cookie 请求头： Cookie: session=abc123; user=john; theme=dark | textarea | "" |  |

已检查示例：

```bash
html-tools security/cookie-parser parse-cookies --set-cookie-input 'session=abc; theme=dark' --cookie-header-input 'session=abc; theme=dark' --json
```

### security/csp-generator

CSP 策略生成器：CSP 策略生成器，一键在线生成，安全工具，浏览器本地运行无需上传

来源：`html-tools/tools/security/csp-generator.html`，SHA-256：`fe00b9e3ec41ce0057b7dbcb497a20478ce6a56303b52d6b70c66430dec0c9be`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-csp` | generateCSP | value |
| `update-output` | updateOutput | outputContent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--toggle-default-src` / `--no-toggle-default-src` | 启用 | checkbox | false |  |
| `--custom-default-src` | 添加自定义来源 (如: https://cdn.example.com) | text | "" |  |
| `--toggle-script-src` / `--no-toggle-script-src` | 启用 | checkbox | false |  |
| `--custom-script-src` | 添加自定义来源 (如: https://cdn.example.com) | text | "" |  |
| `--toggle-style-src` / `--no-toggle-style-src` | 启用 | checkbox | false |  |
| `--custom-style-src` | 添加自定义来源 (如: https://cdn.example.com) | text | "" |  |
| `--toggle-img-src` / `--no-toggle-img-src` | 启用 | checkbox | false |  |
| `--custom-img-src` | 添加自定义来源 (如: https://cdn.example.com) | text | "" |  |
| `--toggle-font-src` / `--no-toggle-font-src` | 启用 | checkbox | false |  |
| `--custom-font-src` | 添加自定义来源 (如: https://cdn.example.com) | text | "" |  |
| `--toggle-connect-src` / `--no-toggle-connect-src` | 启用 | checkbox | false |  |
| `--custom-connect-src` | 添加自定义来源 (如: https://cdn.example.com) | text | "" |  |
| `--toggle-media-src` / `--no-toggle-media-src` | 启用 | checkbox | false |  |
| `--custom-media-src` | 添加自定义来源 (如: https://cdn.example.com) | text | "" |  |
| `--toggle-object-src` / `--no-toggle-object-src` | 启用 | checkbox | false |  |
| `--custom-object-src` | 添加自定义来源 (如: https://cdn.example.com) | text | "" |  |
| `--toggle-frame-src` / `--no-toggle-frame-src` | 启用 | checkbox | false |  |
| `--custom-frame-src` | 添加自定义来源 (如: https://cdn.example.com) | text | "" |  |
| `--toggle-frame-ancestors` / `--no-toggle-frame-ancestors` | 启用 | checkbox | false |  |
| `--custom-frame-ancestors` | 添加自定义来源 (如: https://cdn.example.com) | text | "" |  |
| `--toggle-worker-src` / `--no-toggle-worker-src` | 启用 | checkbox | false |  |
| `--custom-worker-src` | 添加自定义来源 (如: https://cdn.example.com) | text | "" |  |
| `--toggle-base-uri` / `--no-toggle-base-uri` | 启用 | checkbox | false |  |
| `--custom-base-uri` | 添加自定义来源 (如: https://cdn.example.com) | text | "" |  |
| `--toggle-form-action` / `--no-toggle-form-action` | 启用 | checkbox | false |  |
| `--custom-form-action` | 添加自定义来源 (如: https://cdn.example.com) | text | "" |  |
| `--toggle-report-uri` / `--no-toggle-report-uri` | 启用 | checkbox | false |  |
| `--custom-report-uri` | 添加自定义来源 (如: https://cdn.example.com) | text | "" |  |

已检查示例：

```bash
html-tools security/csp-generator generate-csp --no-toggle-default-src --custom-default-src 'Hello world
Hello world
TypeScript' --no-toggle-script-src --custom-script-src '192.168.1.1' --no-toggle-style-src --custom-style-src 'Hello world
Hello world
TypeScript' --no-toggle-img-src --custom-img-src 'Hello world
Hello world
TypeScript' --no-toggle-font-src --custom-font-src 'Hello world
Hello world
TypeScript' --no-toggle-connect-src --custom-connect-src 'Hello world
Hello world
TypeScript' --no-toggle-media-src --custom-media-src 'Hello world
Hello world
TypeScript' --no-toggle-object-src --custom-object-src 'Hello world
Hello world
TypeScript' --no-toggle-frame-src --custom-frame-src 'Hello world
Hello world
TypeScript' --no-toggle-frame-ancestors --custom-frame-ancestors 'Hello world
Hello world
TypeScript' --no-toggle-worker-src --custom-worker-src 'Hello world
Hello world
TypeScript' --no-toggle-base-uri --custom-base-uri 'Hello world
Hello world
TypeScript' --no-toggle-form-action --custom-form-action 'Hello world
Hello world
TypeScript' --no-toggle-report-uri --custom-report-uri 'Hello world
Hello world
TypeScript' --json
```

### security/hash-generator

哈希生成器：计算文本或文件的哈希值

来源：`html-tools/tools/security/hash-generator.html`，SHA-256：`6e8e568797514c941216d74b6ee66d4263f541fad1b7b424378ed55d6a4fe9d8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate-text-hash` | calculateTextHash | results |
| `run` | 按字段输入重新计算 | fileName, fileSize, results |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-input` | 输入文本 | textarea | "Hello, World!" |  |
| `--file-input` | fileInput | file | "" |  |

已检查示例：

```bash
html-tools security/hash-generator calculate-text-hash --text-input 'Hello, World!' --file-input 'generated/fixtures/sample.txt' --json
```

### security/header-analyzer

HTTP 响应头分析器：HTTP 响应头分析器，在线分析，安全工具，浏览器本地运行无需上传

来源：`html-tools/tools/security/header-analyzer.html`，SHA-256：`6bdecae0fccad85b45e4ff4015b309ac1c796b1eba9e246a10864bc1b1cb5f18`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze-headers` | 🔍 分析响应头 | statsGrid, filterButtons, headersContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--headers-input` | 粘贴 HTTP 响应头 | textarea | "" |  |

已检查示例：

```bash
html-tools security/header-analyzer analyze-headers --headers-input 'Content-Type: application/json
Cache-Control: no-cache' --json
```

### security/headers-check

安全头检测器：安全头检测器，在线分析，安全工具，浏览器本地运行无需上传

来源：`html-tools/tools/security/headers-check.html`，SHA-256：`8e25ecb448aa9b45789aaa9230ec10f9a1638041481bdacfa12e522ad89e0cd6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-config` | generateConfig | generatedConfig |
| `run` | 按字段输入重新计算 | generatedConfig |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--header-search` | 搜索安全头... | search | "" |  |
| `--check-0` / `--no-check-0` | 启用 HTTPS 并配置 HSTS (关键) | checkbox | false |  |
| `--check-1` / `--no-check-1` | 配置 Content-Security-Policy (关键) | checkbox | false |  |
| `--check-2` / `--no-check-2` | 设置 X-Content-Type-Options: nosniff (关键) | checkbox | false |  |
| `--check-3` / `--no-check-3` | 设置 X-Frame-Options 防止点击劫持 (关键) | checkbox | false |  |
| `--check-4` / `--no-check-4` | 配置 Referrer-Policy 保护隐私 | checkbox | false |  |
| `--check-5` / `--no-check-5` | 设置 Permissions-Policy 限制 API 访问 | checkbox | false |  |
| `--check-6` / `--no-check-6` | 敏感页面禁用缓存 (关键) | checkbox | false |  |
| `--check-7` / `--no-check-7` | 移除不必要的服务器信息头 | checkbox | false |  |
| `--check-8` / `--no-check-8` | 配置 CORS 白名单 (关键) | checkbox | false |  |
| `--check-9` / `--no-check-9` | 定期审查和更新安全策略 | checkbox | false |  |
| `--server-type` | 服务器类型 Nginx Apache IIS (web.config) Node.js Express Cloudflare Workers | select-one | "nginx" | "nginx" (Nginx); "apache" (Apache); "iis" (IIS (web.config)); "express" (Node.js Express); "cloudflare" (Cloudflare Workers) |
| `--gen-0` / `--no-gen-0` | Content-Security-Policy | checkbox | true |  |
| `--gen-1` / `--no-gen-1` | Strict-Transport-Security | checkbox | true |  |
| `--gen-2` / `--no-gen-2` | X-Content-Type-Options | checkbox | true |  |
| `--gen-3` / `--no-gen-3` | X-Frame-Options | checkbox | false |  |
| `--gen-4` / `--no-gen-4` | X-XSS-Protection | checkbox | false |  |
| `--gen-5` / `--no-gen-5` | Referrer-Policy | checkbox | false |  |
| `--gen-6` / `--no-gen-6` | Permissions-Policy | checkbox | false |  |
| `--gen-7` / `--no-gen-7` | Cross-Origin-Embedder-Policy | checkbox | false |  |
| `--gen-8` / `--no-gen-8` | Cross-Origin-Opener-Policy | checkbox | false |  |
| `--gen-9` / `--no-gen-9` | Cross-Origin-Resource-Policy | checkbox | false |  |
| `--gen-10` / `--no-gen-10` | Cache-Control | checkbox | false |  |
| `--gen-11` / `--no-gen-11` | X-Permitted-Cross-Domain-Policies | checkbox | false |  |
| `--csp-level` | CSP 策略级别 严格 (推荐) 中等 宽松 | select-one | "strict" | "strict" (严格 (推荐)); "moderate" (中等); "permissive" (宽松) |

已检查示例：

```bash
html-tools security/headers-check generate-config --header-search 'Hello world
Hello world
TypeScript' --no-check-0 --no-check-1 --no-check-2 --no-check-3 --no-check-4 --no-check-5 --no-check-6 --no-check-7 --no-check-8 --no-check-9 --server-type 'nginx' --gen-0 --gen-1 --gen-2 --no-gen-3 --no-gen-4 --no-gen-5 --no-gen-6 --no-gen-7 --no-gen-8 --no-gen-9 --no-gen-10 --no-gen-11 --csp-level 'strict' --json
```

操作限制：部分原页面操作未通过迁移检查: filter-headers: 原工具没有产生可输出的结果，请检查参数

### security/password-strength

密码强度检测器：检测密码强度，提供安全建议和密码生成

来源：`html-tools/tools/security/password-strength.html`，SHA-256：`33ef5a5d07ab22a52eac3943a422ed413f96b6c120b7d279933f63fe11f82c09`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-password` | 生成 | generatedPassword |
| `check-password` | checkPassword | strengthText, strengthScore, lengthStat, entropyStat, crackTimeStat, charsetStat, criteriaList, suggestionList |
| `run` | 按字段输入重新计算 | strengthText, strengthScore, lengthStat, entropyStat, crackTimeStat, charsetStat, criteriaList, suggestionList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--password-input` | 输入密码 | password | "" |  |
| `--gen-upper` / `--no-gen-upper` | 大写字母 | checkbox | true |  |
| `--gen-lower` / `--no-gen-lower` | 小写字母 | checkbox | true |  |
| `--gen-numbers` / `--no-gen-numbers` | 数字 | checkbox | true |  |
| `--gen-symbols` / `--no-gen-symbols` | 特殊字符 | checkbox | true |  |
| `--gen-length` | 长度: | number | "16" | min=8, max=64 |

已检查示例：

```bash
html-tools security/password-strength generate-password --password-input 'Hello world
Hello world
TypeScript' --gen-upper --gen-lower --gen-numbers --gen-symbols --gen-length '16' --json
```

### security/sitemap-generator

sitemap.xml 生成器：sitemap.xml 生成器，一键在线生成，安全工具，浏览器本地运行无需上传

来源：`html-tools/tools/security/sitemap-generator.html`，SHA-256：`541831fa8625bac858c38c5826577523a907494e83649bfba9561f54601112e7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `process-bulk-urls` | 添加这些 URL | urlCount, urlContainer, outputContent |
| `generate-output` | generateOutput | outputContent |
| `run` | 按字段输入重新计算 | defaultPriorityValue, urlContainer, outputContent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--base-url` | 网站根地址 | text | "https://example.com" |  |
| `--default-freq` | 默认更新频率 | select-one | "daily" | "always" (always (始终)); "hourly" (hourly (每小时)); "daily" (daily (每天)); "weekly" (weekly (每周)); "monthly" (monthly (每月)); "yearly" (yearly (每年)); "never" (never (从不)) |
| `--default-priority` | defaultPriority | range | "0.5" | min=0, max=1 |
| `--field-4` | 网站根地址 | text | "/" |  |
| `--field-5` | 网站根地址 | date | "2026-10-30" |  |
| `--field-6` | 网站根地址 | select-one | "" | "" (使用默认); "always" (always (始终)); "hourly" (hourly (每小时)); "daily" (daily (每天)); "weekly" (weekly (每周)); "monthly" (monthly (每月)); "yearly" (yearly (每年)); "never" (never (从不)) |
| `--field-7` | 网站根地址 | range | "1.0" | min=0, max=1 |
| `--bulk-urls` | 批量添加 URL（每行一个路径） | textarea | "" |  |

已检查示例：

```bash
html-tools security/sitemap-generator process-bulk-urls --base-url 'https://example.com' --default-freq 'daily' --default-priority '0.5' --field-4 '/' --field-5 '2026-10-30' --field-6 'always' --field-7 '1.0' --bulk-urls 'https://example.com/path?a=1' --json
```

操作限制：部分原页面操作未通过迁移检查: validate-output: 原工具没有产生可输出的结果，请检查参数

### security/url-defang

URL安全化：URL 脱敏处理

来源：`html-tools/tools/security/url-defang.html`，SHA-256：`c825c757357f6a7aea1cdadd62437686d4ed4ef0e047252aad205177e1d23129`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `defang` | 🛡️ 去武装化 | output |
| `refang` | 🔗 还原 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入URL或文本 | textarea | "" |  |

已检查示例：

```bash
html-tools security/url-defang defang --input 'Hello world
Hello world
TypeScript' --json
```

### security/meta-generator

Meta 标签生成器：Meta 标签生成器，一键在线生成，安全工具，浏览器本地运行无需上传

来源：`html-tools/tools/security/meta-generator.html`，SHA-256：`8ba2ae3c57b1fa1076e151fbd9c6a49eac3e3a43e2c2c3ca05e41ce33e412008`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-all` | updateAll | titleCounter, descCounter, previewGoogleTitle, previewGoogleUrl, previewGoogleDesc, previewFbSite, previewFbTitle, previewFbDesc, previewTwitterTitle, previewTwitterDesc, previewTwitterSite, outputContent |
| `update-preview` | updatePreview | previewGoogleTitle, previewGoogleUrl, previewGoogleDesc, previewFbSite, previewFbTitle, previewFbDesc, previewTwitterTitle, previewTwitterDesc, previewTwitterSite |
| `generate-output` | generateOutput | outputContent |
| `run` | 按字段输入重新计算 | titleCounter, descCounter, previewGoogleTitle, previewGoogleUrl, previewGoogleDesc, previewFbSite, previewFbTitle, previewFbDesc, previewTwitterTitle, previewTwitterDesc, previewTwitterSite, outputContent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--page-title` | 页面标题 | text | "" |  |
| `--page-url` | 页面 URL | text | "" |  |
| `--page-desc` | 页面描述 | textarea | "" |  |
| `--page-keywords` | 关键词 | text | "" |  |
| `--page-author` | 作者 | text | "" |  |
| `--og-title` | OG 标题 | text | "" |  |
| `--og-type` | 类型 | select-one | "website" | "website" (website (网站)); "article" (article (文章)); "product" (product (产品)); "profile" (profile (个人主页)); "video.other" (video (视频)); "music.song" (music (音乐)) |
| `--og-desc` | OG 描述 | textarea | "" |  |
| `--og-image` | 图片 URL | text | "" |  |
| `--og-site-name` | 网站名称 | text | "" |  |
| `--og-locale` | 语言区域 | select-one | "zh_CN" | "zh_CN" (简体中文 (zh_CN)); "zh_TW" (繁体中文 (zh_TW)); "en_US" (英语 (en_US)); "ja_JP" (日语 (ja_JP)); "ko_KR" (韩语 (ko_KR)) |
| `--twitter-card` | 卡片类型 | select-one | "summary_large_image" | "summary_large_image" (大图摘要 (summary_large_image)); "summary" (摘要 (summary)); "app" (应用 (app)); "player" (播放器 (player)) |
| `--twitter-site` | Twitter 账号 | text | "" |  |
| `--twitter-title` | Twitter 标题 | text | "" |  |
| `--twitter-desc` | Twitter 描述 | textarea | "" |  |
| `--twitter-image` | Twitter 图片 | text | "" |  |
| `--robots` | 搜索引擎指令 | select-one | "index, follow" | "index, follow" (index, follow (默认)); "noindex, follow" (noindex, follow); "index, nofollow" (index, nofollow); "noindex, nofollow" (noindex, nofollow) |
| `--viewport` | 视口设置 | select-one | "width=device-width, initial-scale=1.0" | "width=device-width, initial-scale=1.0" (响应式 (推荐)); "width=device-width, initial-scale=1.0, maximum-scale=1.0" (禁止缩放); "width=1024" (固定宽度 1024) |
| `--canonical` | 规范链接 (Canonical URL) | text | "" |  |

已检查示例：

```bash
html-tools security/meta-generator update-all --page-title 'Hello world
Hello world
TypeScript' --page-url 'https://example.com/path?a=1' --page-desc 'Hello world
Hello world
TypeScript' --page-keywords 'Hello world
Hello world
TypeScript' --page-author 'Hello world
Hello world
TypeScript' --og-title 'Hello world
Hello world
TypeScript' --og-type 'website' --og-desc 'Hello world
Hello world
TypeScript' --og-image 'Hello world
Hello world
TypeScript' --og-site-name 'Hello world
Hello world
TypeScript' --og-locale 'zh_CN' --twitter-card 'summary_large_image' --twitter-site 'Hello world
Hello world
TypeScript' --twitter-title 'Hello world
Hello world
TypeScript' --twitter-desc 'Hello world
Hello world
TypeScript' --twitter-image 'Hello world
Hello world
TypeScript' --robots 'index, follow' --viewport 'width=device-width, initial-scale=1.0' --canonical 'Hello world
Hello world
TypeScript' --json
```

## seo

### seo/heading-analyzer

标题结构分析器：标题结构分析器，在线分析，SEO 工具，浏览器本地运行无需上传

来源：`html-tools/tools/seo/heading-analyzer.html`，SHA-256：`9dd33c62dda94be1443d08d34c5d007be42c383f69dc043683bd291cfd8b7ab2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze-headings` | 分析标题结构 | scoreValue, h1Count, h2Count, h3Count, h4Count, h5Count, h6Count, issuesList, headingTree |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--html-input` | 在此粘贴包含标题标签的HTML代码... 示例： <h2>网站主标题</h2> <h2>第一章</h2> <h3>第一节</h3> <h3>第二节</h3> <h2>第二章</h2> <h3>第一节</h3> | textarea | "" |  |

已检查示例：

```bash
html-tools seo/heading-analyzer analyze-headings --html-input 'Hello world
Hello world
TypeScript' --json
```

### seo/image-alt-checker

图片Alt属性检查器：图片Alt属性检查器，在线使用，SEO 工具，浏览器本地运行无需上传

来源：`html-tools/tools/seo/image-alt-checker.html`，SHA-256：`c4a7fb45658046788774961d1818597c088a9603b94362795ecdc288dc8e917a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze-images` | 分析图片 | scoreValue, totalImages, withAlt, emptyAlt, noAlt, badge-all, badge-has, badge-empty, badge-no, imageList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--html-input` | 在此粘贴包含图片标签的HTML代码... 示例： <img src='logo.png' alt='公司Logo'> <img src='banner.jpg'> <img src='icon.svg' alt=''> <img src='photo.webp' alt='团队合影照片' title='2024年年会'> | textarea | "" |  |

已检查示例：

```bash
html-tools seo/image-alt-checker analyze-images --html-input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: filter-images-all: Cannot read properties of undefined (reading 'target') | filter-images-has-alt: Cannot read properties of undefined (reading 'target') | filter-images-empty-alt: Cannot read properties of undefined (reading 'target') | filter-images-no-alt: Cannot read properties of undefined (reading 'target')

### seo/keyword-density

关键词密度分析器：关键词密度分析器，在线分析，SEO 工具，浏览器本地运行无需上传

来源：`html-tools/tools/seo/keyword-density.html`，SHA-256：`6b003f3ada504bc774f058d032a5a5d94594a9a52436bf035a7cc22e7bdb16a8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | 分析 | totalWords, totalChars, uniqueWords, avgDensity, keywordResults, topWordsList |
| `run` | 按字段输入重新计算 | totalWords, totalChars, uniqueWords, avgDensity, keywordResults, topWordsList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-input` | 粘贴您的文章或网页内容... | textarea | "" |  |
| `--keyword-input` | 输入目标关键词（多个用逗号分隔） | text | "" |  |

已检查示例：

```bash
html-tools seo/keyword-density analyze --text-input 'Hello world
Hello world
TypeScript' --keyword-input 'Hello world
Hello world
TypeScript' --json
```

### seo/link-analyzer

链接分析器：链接分析器，在线分析，SEO 工具，浏览器本地运行无需上传

来源：`html-tools/tools/seo/link-analyzer.html`，SHA-256：`e8dc32e074ca760a43be711d9134eb3b3993728f000acde63b0c038689fec4d3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze-links` | 分析链接 | totalLinks, internalLinks, externalLinks, nofollowLinks, uniqueDomains, internalPercent, externalPercent, anchorCloud, linkTableBody |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--base-url` | 当前页面URL（用于判断内链/外链） | text | "" |  |
| `--html-input` | 当前页面URL（用于判断内链/外链） | textarea | "" |  |

已检查示例：

```bash
html-tools seo/link-analyzer analyze-links --base-url 'https://example.com/path?a=1' --html-input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: filter-links-all: Cannot read properties of undefined (reading 'target') | filter-links-internal: Cannot read properties of undefined (reading 'target') | filter-links-external: Cannot read properties of undefined (reading 'target') | filter-links-nofollow: Cannot read properties of undefined (reading 'target')

### seo/meta-preview

搜索结果预览：搜索结果预览，即时预览，SEO 工具，浏览器本地运行无需上传

来源：`html-tools/tools/seo/meta-preview.html`，SHA-256：`d83296a02b979c22a09123bed43f400815b19b64a8b43cb577d95fe9e59df6f4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | titleCount, descCount, g-sitename, g-url, g-title, g-desc, b-title, b-desc, b-sitename, bing-title, bing-url, bing-desc |
| `run` | 按字段输入重新计算 | titleCount, descCount, g-sitename, g-url, g-title, g-desc, b-title, b-desc, b-sitename, bing-title, bing-url, bing-desc |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--meta-title` | 页面标题 (Title) 0 / 60 | text | "" |  |
| `--meta-desc` | 页面描述 (Meta Description) 0 / 160 | textarea | "" |  |
| `--page-url` | 页面URL | text | "" |  |
| `--site-name` | 网站名称 | text | "" |  |

已检查示例：

```bash
html-tools seo/meta-preview update-preview --meta-title 'Hello world
Hello world
TypeScript' --meta-desc 'Hello world
Hello world
TypeScript' --page-url 'https://example.com/path?a=1' --site-name 'Hello world
Hello world
TypeScript' --json
```

### seo/meta-tags-generator

Meta Tags 生成器：Meta Tags 生成器，一键在线生成，SEO 工具，浏览器本地运行无需上传

来源：`html-tools/tools/seo/meta-tags-generator.html`，SHA-256：`c545f837965bce160380f9e56185e1c5419012c1f6f88c27c43d81468c8730db`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | titleCount, descCount, googleTitle, googleUrl, googleDesc, twitterDomain, twitterTitle, twitterDesc, facebookDomain, facebookTitle, facebookDesc, output |
| `generate-code` | generateCode | output |
| `run` | 按字段输入重新计算 | titleCount, descCount, googleTitle, googleUrl, googleDesc, twitterDomain, twitterTitle, twitterDesc, facebookDomain, facebookTitle, facebookDesc, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--title` | 页面标题 * | text | "" |  |
| `--description` | 页面描述 * | textarea | "" |  |
| `--keywords` | 关键词 | text | "" |  |
| `--url` | 页面 URL | url | "" |  |
| `--image` | 图片 URL | url | "" |  |
| `--image-alt` | 图片 Alt 文本 | text | "" |  |
| `--author` | 作者 | text | "" |  |
| `--site-name` | 网站名称 | text | "" |  |
| `--og-type` | 页面类型 | select-one | "website" | "website" (网站 (website)); "article" (文章 (article)); "product" (产品 (product)); "profile" (个人主页 (profile)); "video" (视频 (video)) |
| `--twitter-card` | Twitter 卡片类型 | select-one | "summary_large_image" | "summary_large_image" (大图摘要 (summary_large_image)); "summary" (摘要 (summary)); "player" (播放器 (player)) |
| `--twitter-site` | Twitter @用户名 | text | "" |  |
| `--locale` | 语言 | select-one | "zh_CN" | "zh_CN" (简体中文 (zh_CN)); "zh_TW" (繁体中文 (zh_TW)); "en_US" (英语 (en_US)); "ja_JP" (日语 (ja_JP)); "ko_KR" (韩语 (ko_KR)) |
| `--robots-index` / `--no-robots-index` | 允许索引 (index) | checkbox | true |  |
| `--robots-follow` / `--no-robots-follow` | 允许跟踪链接 (follow) | checkbox | true |  |

已检查示例：

```bash
html-tools seo/meta-tags-generator update-preview --title 'Hello world
Hello world
TypeScript' --description '192.168.1.1' --keywords 'Hello world
Hello world
TypeScript' --url 'https://example.com/path?a=1' --image 'Hello world
Hello world
TypeScript' --image-alt 'Hello world
Hello world
TypeScript' --author 'Hello world
Hello world
TypeScript' --site-name 'Hello world
Hello world
TypeScript' --og-type 'website' --twitter-card 'summary_large_image' --twitter-site 'Hello world
Hello world
TypeScript' --locale 'zh_CN' --robots-index --robots-follow --json
```

### seo/robots-generator

Robots.txt 生成器：Robots.txt 生成器，一键在线生成，SEO 工具，浏览器本地运行无需上传

来源：`html-tools/tools/seo/robots-generator.html`，SHA-256：`96b220f8a6184afbe5e8469cfd108ad21aee2a7b60a0457b09756f694ca5a99f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-robots` | generateRobots | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` / `--no-field-1` | 所有爬虫 | checkbox | true |  |
| `--field-2` / `--no-field-2` | 所有爬虫 | checkbox | false |  |
| `--field-3` / `--no-field-3` | 所有爬虫 | checkbox | false |  |
| `--field-4` / `--no-field-4` | 所有爬虫 | checkbox | false |  |
| `--field-5` / `--no-field-5` | 所有爬虫 | checkbox | false |  |
| `--field-6` / `--no-field-6` | 所有爬虫 | checkbox | false |  |
| `--field-7` / `--no-field-7` | 所有爬虫 | checkbox | false |  |
| `--field-8` / `--no-field-8` | 所有爬虫 | checkbox | false |  |
| `--field-9` / `--no-field-9` | 所有爬虫 | checkbox | false |  |
| `--field-10` / `--no-field-10` | 所有爬虫 | checkbox | false |  |
| `--field-11` / `--no-field-11` | 所有爬虫 | checkbox | false |  |
| `--field-12` / `--no-field-12` | 所有爬虫 | checkbox | false |  |
| `--custom-bot` | 自定义 User-agent | text | "" |  |
| `--field-14` | 所有爬虫 | select-one | "Disallow" | "Disallow" (Disallow); "Allow" (Allow) |
| `--field-15` | 所有爬虫 | text | "" |  |
| `--sitemap-url` | Sitemap URL | url | "" |  |
| `--add-sitemap-index` / `--no-add-sitemap-index` | 同时添加 sitemap_index.xml | checkbox | false |  |
| `--crawl-delay` | Crawl-delay (秒) | number | "" | min=0, max=60 |
| `--host-directive` | Host (主域名) | text | "" |  |

已检查示例：

```bash
html-tools seo/robots-generator generate-robots --field-1 --no-field-2 --no-field-3 --no-field-4 --no-field-5 --no-field-6 --no-field-7 --no-field-8 --no-field-9 --no-field-10 --no-field-11 --no-field-12 --custom-bot 'Hello world
Hello world
TypeScript' --field-14 'Disallow' --field-15 'Hello world
Hello world
TypeScript' --sitemap-url 'https://example.com/path?a=1' --no-add-sitemap-index --crawl-delay '10' --host-directive 'Hello world
Hello world
TypeScript' --json
```

### seo/schema-org-generator

Schema.org 结构化数据生成器：填写 Schema 类型（Article/FAQ/Product），生成 JSON-LD 结构化数据代码。

来源：`html-tools/tools/seo/schema-org-generator.html`，SHA-256：`b98226c05ffecb730e190ab48d7314c038def307793705e11b3cc538cc302dd0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | formPanel |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--schema-type` | schemaType | select-one | "Article" | "Article" (Article（文章）); "FAQ" (FAQPage（常见问题）); "Product" (Product（产品）); "LocalBusiness" (LocalBusiness（本地商家）); "Event" (Event（活动/事件）); "Recipe" (Recipe（菜谱）); "BreadcrumbList" (BreadcrumbList（面包屑）) |
| `--a-headline` | 标题 * | text | "" |  |
| `--a-description` | 描述 | textarea | "" |  |
| `--a-url` | 页面 URL * | url | "" |  |
| `--a-image` | 封面图 URL | url | "" |  |
| `--a-date-published` | 发布时间 | datetime-local | "" |  |
| `--a-date-modified` | 修改时间 | datetime-local | "" |  |
| `--a-author-name` | 作者姓名 * | text | "" |  |
| `--a-author-url` | 作者主页 URL | url | "" |  |
| `--a-publisher-name` | 机构名称 * | text | "" |  |
| `--a-publisher-logo` | 机构 Logo URL | url | "" |  |

已检查示例：

```bash
html-tools seo/schema-org-generator run --schema-type 'Article' --a-headline 'Hello world
Hello world
TypeScript' --a-description '192.168.1.1' --a-url 'https://example.com/path?a=1' --a-image 'Hello world
Hello world
TypeScript' --a-date-published '2025-01-01T12:00' --a-date-modified '2025-01-01T12:00' --a-author-name 'Hello world
Hello world
TypeScript' --a-author-url 'https://example.com/path?a=1' --a-publisher-name 'Hello world
Hello world
TypeScript' --a-publisher-logo 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: generate: 请填写标题、URL 和作者姓名 | generate-article: 请填写标题、URL 和作者姓名 | generate-faq: 原工具没有产生可输出的结果，请检查参数 | generate-product: 请填写产品名称 | generate-local-business: 请填写商家名称 | generate-event: 请填写活动名称和开始时间 | generate-recipe: 请填写菜名 | generate-breadcrumb: 原工具没有产生可输出的结果，请检查参数 | generate-schema: 请填写标题、URL 和作者姓名

## social-media

### social-media/hashtag-generator

热门话题标签生成器：根据关键词生成社交媒体热门话题标签

来源：`html-tools/tools/social-media/hashtag-generator.html`，SHA-256：`e7befd2251152c12e1a3a000a2d6e4286d3d274ec039a7e84bcc63a57957aa43`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成标签 | hashtagsContainer, allHashtags |
| `generate-hashtags` | generateHashtags | hashtagsContainer, allHashtags |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--keywords` | 例如: 旅行, 美食, photography | text | "" |  |
| `--platform` | 平台: Instagram Twitter/X TikTok 微博 小红书 | select-one | "instagram" | "instagram" (Instagram); "twitter" (Twitter/X); "tiktok" (TikTok); "weibo" (微博); "xiaohongshu" (小红书) |
| `--count` | 数量: 10 个 20 个 30 个 | select-one | "30" | "10" (10 个); "20" (20 个); "30" (30 个) |
| `--language` | 语言: 中英混合 仅中文 仅英文 | select-one | "mixed" | "mixed" (中英混合); "chinese" (仅中文); "english" (仅英文) |

已检查示例：

```bash
html-tools social-media/hashtag-generator generate --keywords 'Hello world
Hello world
TypeScript' --platform 'instagram' --count '30' --language 'mixed' --json
```

### social-media/post-scheduler

发布时间建议器：推荐各平台最佳发布时间

来源：`html-tools/tools/social-media/post-scheduler.html`，SHA-256：`1caa4d896a3bf14abac073d8d7a4bdbc4efba5cb891cff7a4b6c0de04730f7a4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | 分析最佳时间 | timeGrid, bestTimes, tipsList |
| `run` | 按字段输入重新计算 | timeGrid, bestTimes, tipsList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--platform` | 平台: Instagram Twitter/X TikTok 微博 小红书 LinkedIn Facebook YouTube | select-one | "instagram" | "instagram" (Instagram); "twitter" (Twitter/X); "tiktok" (TikTok); "weibo" (微博); "xiaohongshu" (小红书); "linkedin" (LinkedIn); "facebook" (Facebook); "youtube" (YouTube) |
| `--audience` | 目标受众: 大众用户 商务人士 学生群体 家长群体 夜猫子 | select-one | "general" | "general" (大众用户); "business" (商务人士); "students" (学生群体); "parents" (家长群体); "night_owl" (夜猫子) |
| `--timezone` | 时区: 中国 (UTC+8) 美东 (UTC-5) 美西 (UTC-8) 伦敦 (UTC+0) 东京 (UTC+9) | select-one | "Asia/Shanghai" | "Asia/Shanghai" (中国 (UTC+8)); "America/New_York" (美东 (UTC-5)); "America/Los_Angeles" (美西 (UTC-8)); "Europe/London" (伦敦 (UTC+0)); "Asia/Tokyo" (东京 (UTC+9)) |

已检查示例：

```bash
html-tools social-media/post-scheduler analyze --platform 'instagram' --audience 'general' --timezone 'Asia/Shanghai' --json
```

### social-media/caption-writer

社交媒体文案生成器：生成吸引人的社交媒体文案

来源：`html-tools/tools/social-media/caption-writer.html`，SHA-256：`84fbcd4456fcd293496a43c9616326071e6eb48e606714cf87fcf47c09cd6dbf`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成文案 | captionsContainer |
| `generate-captions` | generateCaptions | captionsContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--topic` | 主题/关键词 | text | "" |  |
| `--details` | 补充说明（可选） | textarea | "" |  |
| `--platform` | 平台 | select-one | "instagram" | "instagram" (Instagram); "twitter" (Twitter/X); "weibo" (微博); "xiaohongshu" (小红书); "douyin" (抖音) |
| `--language` | 语言 | select-one | "chinese" | "chinese" (中文); "english" (English); "mixed" (中英混合) |

已检查示例：

```bash
html-tools social-media/caption-writer generate --topic 'Hello world
Hello world
TypeScript' --details 'Hello world
Hello world
TypeScript' --platform 'instagram' --language 'chinese' --json
```

操作限制：部分原页面操作未通过迁移检查: update-style-tags: 原工具没有产生可输出的结果，请检查参数

### social-media/thread-splitter

长文分割器：将长文智能分割为社交媒体线程

来源：`html-tools/tools/social-media/thread-splitter.html`，SHA-256：`f29a1fea36c72e229ffa01107802224223ae2227eafc601b3ba66ffec74db54d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `split` | 分割 | statTotal, statTweets, statAvg, threadContainer |
| `split-text` | splitText | statTotal, statTweets, statAvg, threadContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入长文内容 | textarea | "" |  |
| `--char-limit` | 字数上限: | number | "280" | min=100, max=500 |
| `--add-numbers` / `--no-add-numbers` | 添加序号 (1/n) | checkbox | true |  |
| `--smart-break` / `--no-smart-break` | 智能断句 | checkbox | true |  |
| `--separator` | 分隔符: 按段落 按句子 按字符 | select-one | "paragraph" | "paragraph" (按段落); "sentence" (按句子); "char" (按字符) |

已检查示例：

```bash
html-tools social-media/thread-splitter split --input 'Hello world
Hello world
TypeScript' --char-limit '280' --add-numbers --smart-break --separator 'paragraph' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### social-media/bio-generator

个人简介生成器：生成个性化的社交媒体个人简介

来源：`html-tools/tools/social-media/bio-generator.html`，SHA-256：`ca9d64e9cb98389ec8d08340ae7dbdb474dd4077b6eba6218896eae8a8dfc9d7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成简介 | biosContainer |
| `generate-bios` | generateBios | biosContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--name` | 你的名字/昵称 | text | "" |  |
| `--profession` | 职业/身份 | text | "" |  |
| `--location` | 所在城市 | text | "" |  |
| `--style` | 风格偏好 | select-one | "professional" | "professional" (专业正式); "casual" (轻松随性); "creative" (创意独特); "minimal" (简约极简); "funny" (幽默搞笑); "inspiring" (励志正能量) |
| `--interest-field` | 输入兴趣后按回车... | text | "" |  |
| `--platform` | 平台 | select-one | "instagram" | "instagram" (Instagram); "twitter" (Twitter/X); "linkedin" (LinkedIn); "weibo" (微博); "xiaohongshu" (小红书) |
| `--language` | 语言 | select-one | "chinese" | "chinese" (中文); "english" (English); "mixed" (中英混合) |

已检查示例：

```bash
html-tools social-media/bio-generator generate --name 'Hello world
Hello world
TypeScript' --profession 'Hello world
Hello world
TypeScript' --location 'Hello world
Hello world
TypeScript' --style 'professional' --interest-field 'Hello world
Hello world
TypeScript' --platform 'instagram' --language 'chinese' --json
```

### social-media/username-checker

用户名可用性检查：检查用户名在各平台的可用性

来源：`html-tools/tools/social-media/username-checker.html`，SHA-256：`2758ab29c5d49d0d8c5e46e68906ca79c645363a4290e0ece7952e5acdb7ce10`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `check` | 检查可用性 | ruleLength, ruleStart, ruleChars, ruleEnd |
| `check-username` | checkUsername | ruleLength, ruleStart, ruleChars, ruleEnd |
| `run` | 按字段输入重新计算 | ruleLength, ruleStart, ruleChars, ruleEnd |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--username` | 例如: cooluser123 | text | "" |  |

已检查示例：

```bash
html-tools social-media/username-checker check --username 'alice_2025' --json
```

### social-media/engagement-calc

互动率计算器：计算社交媒体帖子的互动率

来源：`html-tools/tools/social-media/engagement-calc.html`，SHA-256：`23f813f86d749e8d923c1a2318c7f62fb1775905a031d2047289fd3c5346853b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算互动率 | resultCards, ratingMessage |
| `run` | 按字段输入重新计算 | resultCards, ratingMessage |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--followers` | 粉丝数 | number | "" | min=0 |
| `--likes` | 点赞数 | number | "" | min=0 |
| `--comments` | 评论数 | number | "" | min=0 |
| `--shares` | 分享/转发数 | number | "" | min=0 |
| `--saves` | 收藏数（可选） | number | "" | min=0 |
| `--views` | 浏览量（可选） | number | "" | min=0 |

已检查示例：

```bash
html-tools social-media/engagement-calc calculate --followers '10' --likes '10' --comments '10' --shares '10' --saves '10' --views '10' --json
```

### social-media/post-length

帖子长度检查器：检查帖子是否符合各平台字数限制

来源：`html-tools/tools/social-media/post-length.html`，SHA-256：`e81563be9b650deb2af5a10c3ef949d9c595305df657520a33fa44457dae267e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-stats` | updateStats | charCount, wordCount, lineCount, emojiCount, platformGrid |
| `run` | 按字段输入重新计算 | charCount, wordCount, lineCount, emojiCount, platformGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--content` | 输入帖子内容 | textarea | "" |  |

已检查示例：

```bash
html-tools social-media/post-length update-stats --content 'Hello world
Hello world
TypeScript' --json
```

### social-media/emoji-picker

Emoji选择器：快速搜索和复制Emoji表情

来源：`html-tools/tools/social-media/emoji-picker.html`，SHA-256：`b839c175027a03c2a18ff01aeb8d72e1ffc9c047f5af71ef318717e19158ea3e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | emojiGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--search` | 搜索 emoji (例如: smile, heart, 笑脸, 爱心)... | search | "" |  |

已检查示例：

```bash
html-tools social-media/emoji-picker run --search 'Hello world
Hello world
TypeScript' --json
```

### social-media/social-color

社交平台品牌色：查询各社交平台的官方品牌色

来源：`html-tools/tools/social-media/social-color.html`，SHA-256：`50aefe78c5a241685b59ac9c1d2061f13674fc78757ba5b1a9cb9aadfac1d52b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | platformsGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--search` | 搜索平台名称... | search | "" |  |

已检查示例：

```bash
html-tools social-media/social-color run --search 'Hello world
Hello world
TypeScript' --json
```

### social-media/og-image-generator

社交媒体 OG 图生成器：选择模板、填写标题和描述，预览并下载符合各平台（Twitter Card、Facebook OG、LinkedIn）尺寸的分享预览图。

来源：`html-tools/tools/social-media/og-image-generator.html`，SHA-256：`4e76e1765d6e0d3665e9828a28dccb2626908d8714b70424b6330f1f51ad59a3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | 渲染预览 | ogCanvas, sizeLabel |
| `run` | 按字段输入重新计算 | titleSizeVal, descSizeVal, colorBg1, colorBg1Hex, colorBg2, colorBg2Hex, colorAccent, colorAccentHex, colorText, colorTextHex, ogCanvas, sizeLabel |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-title` | 标题 | text | "" |  |
| `--input-desc` | 描述（可选） | textarea | "" |  |
| `--input-site` | 站点名称 / 标语 | text | "" |  |
| `--input-emoji` | 图标 Emoji（可选） | text | "" |  |
| `--title-size` | titleSize | range | "60" | min=32, max=96 |
| `--desc-size` | descSize | range | "28" | min=16, max=48 |
| `--color-bg1` | colorBg1 | color | "#0a0a0f" |  |
| `--color-bg1-hex` | colorBg1Hex | text | "#0a0a0f" |  |
| `--color-bg2` | colorBg2 | color | "#1a1a2e" |  |
| `--color-bg2-hex` | colorBg2Hex | text | "#1a1a2e" |  |
| `--color-accent` | colorAccent | color | "#00f5d4" |  |
| `--color-accent-hex` | colorAccentHex | text | "#00f5d4" |  |
| `--color-text` | colorText | color | "#e8e8ed" |  |
| `--color-text-hex` | colorTextHex | text | "#e8e8ed" |  |

已检查示例：

```bash
html-tools social-media/og-image-generator render --input-title 'Hello world
Hello world
TypeScript' --input-desc 'Hello world
Hello world
TypeScript' --input-site 'Hello world
Hello world
TypeScript' --input-emoji 'Hello world
Hello world
TypeScript' --title-size '60' --desc-size '28' --color-bg1 '#0a0a0f' --color-bg1-hex '#0a0a0f' --color-bg2 '#1a1a2e' --color-bg2-hex '#1a1a2e' --color-accent '#00f5d4' --color-accent-hex '#00f5d4' --color-text '#e8e8ed' --color-text-hex '#e8e8ed' --json
```

## team-tools

### team-tools/meeting-agenda

会议议程生成器：生成结构化的会议议程

来源：`html-tools/tools/team-tools/meeting-agenda.html`，SHA-256：`cf8f8cc0a4da3a0571a7ac8c19847db041e3e7ac9554f6f8ac8b01a5ac535cb6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-id` | generateId | value |
| `update-total-time` | updateTotalTime | totalTime |
| `generate-markdown` | generateMarkdown | value |
| `generate-text` | generateText | value |
| `generate-html` | generateHTML | value |
| `update-preview` | updatePreview | preview |
| `run` | 按字段输入重新计算 | totalTime, preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--meeting-title` | 会议主题 | text | "" |  |
| `--meeting-date` | 会议日期 | date | "2026-10-30" |  |
| `--meeting-time` | 开始时间 | time | "14:00" |  |
| `--meeting-location` | 会议地点/链接 | text | "" |  |
| `--meeting-host` | 主持人 | text | "" |  |
| `--meeting-attendees` | 参会人员 | text | "" |  |
| `--field-7` | 会议主题 | text | "" |  |
| `--field-8` | 会议主题 | number | "10" | min=1 |
| `--field-9` | 会议主题 | text | "" |  |
| `--field-10` | 会议主题 | select-one | "discussion" | "discussion" (讨论); "decision" (决策); "info" (信息同步); "action" (行动项); "break" (休息) |

已检查示例：

```bash
html-tools team-tools/meeting-agenda generate-id --meeting-title 'Hello world
Hello world
TypeScript' --meeting-date '2026-10-30' --meeting-time '14:00' --meeting-location 'Hello world
Hello world
TypeScript' --meeting-host 'Hello world
Hello world
TypeScript' --meeting-attendees 'Hello world
Hello world
TypeScript' --field-7 'Hello world
Hello world
TypeScript' --field-8 '10' --field-9 'Hello world
Hello world
TypeScript' --field-10 'discussion' --json
```

### team-tools/sprint-planner

敏捷冲刺规划器：规划敏捷开发冲刺周期

来源：`html-tools/tools/team-tools/sprint-planner.html`，SHA-256：`6788e60677c4ad548d222a2129bc514882d1937b98deee22c418e62c402fad86`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-stats` | updateStats | capacityPercent, totalCapacity, plannedPoints, avgVelocity, sprintDays |
| `run` | 按字段输入重新计算 | velocityChart, backlogItems, capacityPercent, totalCapacity, plannedPoints, avgVelocity, sprintDays |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--sprint-name` | 冲刺名称 | text | "" |  |
| `--start-date` | 开始日期 | date | "2026-10-30" |  |
| `--end-date` | 结束日期 | date | "2026-11-13" |  |
| `--sprint-goal` | 冲刺目标 | text | "" |  |
| `--field-5` | 冲刺名称 | text | "成员1" |  |
| `--field-6` | 冲刺名称 | number | "10" | min=0 |
| `--field-7` | 冲刺名称 | number | "80" | min=0, max=100 |
| `--field-8` | 冲刺名称 | number | "0" | min=0 |
| `--field-9` / `--no-field-9` | 冲刺名称 | checkbox | false |  |
| `--field-10` | 冲刺名称 | text | "" |  |
| `--field-11` | 冲刺名称 | number | "0" | min=0 |
| `--field-12` | 冲刺名称 | select-one | "medium" | "high" (高); "medium" (中); "low" (低) |

已检查示例：

```bash
html-tools team-tools/sprint-planner update-stats --sprint-name 'Hello world
Hello world
TypeScript' --start-date '2026-10-30' --end-date '2026-11-13' --sprint-goal 'Hello world
Hello world
TypeScript' --field-5 '成员1' --field-6 '10' --field-7 '80' --field-8 '0' --no-field-9 --field-10 'Hello world
Hello world
TypeScript' --field-11 '0' --field-12 'medium' --json
```

### team-tools/task-breakdown

任务分解器：将大任务分解为可执行的小任务

来源：`html-tools/tools/team-tools/task-breakdown.html`，SHA-256：`cde4657721f9c2e7ede2eb2a506e82d0c59438b8e1ce9dc2754be37f8e3ed3cd`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-id` | generateId | value |
| `update-stats` | updateStats | totalTasks, totalHours, totalDays, maxDepth |
| `generate-wbs-text` | generateWBSText | value |
| `update-preview` | updatePreview | preview |
| `run` | 按字段输入重新计算 | totalTasks, totalHours, totalDays, maxDepth, preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--project-name` | 项目名称 | text | "" |  |
| `--wbs-input` | 任务名称 | text | "项目启动" |  |
| `--wbs-hours` | 工时 | number | "" | min=0 |

已检查示例：

```bash
html-tools team-tools/task-breakdown generate-id --project-name 'Hello world
Hello world
TypeScript' --wbs-input '项目启动' --wbs-hours '10' --json
```

操作限制：部分原页面操作未通过迁移检查: calculate-stats: 原工具没有产生可输出的结果，请检查参数

### team-tools/decision-matrix

决策矩阵：使用加权矩阵辅助决策

来源：`html-tools/tools/team-tools/decision-matrix.html`，SHA-256：`3683a0025ff6d6c598021cefd2a272b7c4844b3ed2b4189c397df2eaacfc698c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-id` | generateId | value |
| `calculate-results` | calculateResults | winnerName, winnerScore, rankingList |
| `run` | 按字段输入重新计算 | matrixTable, winnerName, winnerScore, rankingList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--decision-title` | 描述你要做的决策，例如：选择哪个技术方案？ | text | "" |  |
| `--field-2` | 评估标准 | text | "成本" |  |
| `--weight-input` | 权重 | number | "8" | min=1, max=10 |
| `--field-4` | 评估标准 | text | "效果" |  |
| `--weight-input-2` | 权重 | number | "9" | min=1, max=10 |
| `--field-6` | 评估标准 | text | "风险" |  |
| `--weight-input-3` | 权重 | number | "7" | min=1, max=10 |
| `--field-8` | 方案名称 | text | "方案 A" |  |
| `--field-9` | 方案名称 | text | "方案 B" |  |
| `--score-input` | score-input | number | "" | min=1, max=10 |
| `--score-input-2` | score-input | number | "" | min=1, max=10 |
| `--score-input-3` | score-input | number | "" | min=1, max=10 |
| `--score-input-4` | score-input | number | "" | min=1, max=10 |
| `--score-input-5` | score-input | number | "" | min=1, max=10 |
| `--score-input-6` | score-input | number | "" | min=1, max=10 |

已检查示例：

```bash
html-tools team-tools/decision-matrix generate-id --decision-title 'Hello world
Hello world
TypeScript' --field-2 '成本' --weight-input '8' --field-4 '效果' --weight-input-2 '9' --field-6 '风险' --weight-input-3 '7' --field-8 '方案 A' --field-9 '方案 B' --score-input '10' --score-input-2 '10' --score-input-3 '10' --score-input-4 '10' --score-input-5 '10' --score-input-6 '10' --json
```

### team-tools/raci-chart

RACI责任矩阵：创建RACI责任分配矩阵

来源：`html-tools/tools/team-tools/raci-chart.html`，SHA-256：`bc1d4a872efec6244ef120c47ae1ba85ea71630864ea4b4a63fcb56abb9c5bf5`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-id` | generateId | value |
| `validate` | validate | validationSection, totalTasks, totalRoles, assignedCells, completionRate |
| `run` | 按字段输入重新计算 | raciTable, validationSection, totalTasks, totalRoles, assignedCells, completionRate |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` | 任务名称 | text | "需求分析" |  |
| `--field-2` | 任务名称 | text | "系统设计" |  |
| `--field-3` | 任务名称 | text | "开发实现" |  |
| `--field-4` | 任务名称 | text | "测试验证" |  |
| `--field-5` | 角色名称 | text | "产品经理" |  |
| `--field-6` | 角色名称 | text | "技术负责人" |  |
| `--field-7` | 角色名称 | text | "开发工程师" |  |
| `--field-8` | 角色名称 | text | "测试工程师" |  |

已检查示例：

```bash
html-tools team-tools/raci-chart generate-id --field-1 '需求分析' --field-2 '系统设计' --field-3 '开发实现' --field-4 '测试验证' --field-5 '产品经理' --field-6 '技术负责人' --field-7 '开发工程师' --field-8 '测试工程师' --json
```

### team-tools/retrospective

回顾会议模板：敏捷回顾会议模板工具

来源：`html-tools/tools/team-tools/retrospective.html`，SHA-256：`ecc0922ef13221a80e092f254918fa596fb707399d10552711569792ac7af354`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-stats` | updateStats | totalItems, totalVotes, actionItems |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--sprint-name` | 冲刺/迭代名称 | text | "" |  |
| `--retro-date` | retroDate | date | "2026-10-30" |  |
| `--facilitator` | 主持人 | text | "" |  |
| `--add-item-input` | 添加新条目... | textarea | "" |  |
| `--add-item-input-2` | 添加新条目... | textarea | "" |  |
| `--add-item-input-3` | 添加新条目... | textarea | "" |  |

已检查示例：

```bash
html-tools team-tools/retrospective update-stats --sprint-name 'Hello world
Hello world
TypeScript' --retro-date '2026-10-30' --facilitator 'Hello world
Hello world
TypeScript' --add-item-input 'Hello world
Hello world
TypeScript' --add-item-input-2 'Hello world
Hello world
TypeScript' --add-item-input-3 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### team-tools/team-vote

团队投票工具：团队快速投票决策

来源：`html-tools/tools/team-tools/team-vote.html`，SHA-256：`95e8177e6746be8119c07514134bbdbdf02707990f53435c6f2e0eb5a6615a6f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-id` | generateId | value |
| `run` | 按字段输入重新计算 | votingOptions, resultsList, totalVoters, totalVotes |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--vote-title` | 投票主题 | text | "" |  |
| `--max-selections` | 最大可选数量 (多选时) | number | "3" | min=1 |
| `--voter-name` | 当前投票人 | text | "" |  |
| `--field-4` | 投票主题 | text | "选项 A" |  |
| `--field-5` | 投票主题 | text | "选项 B" |  |
| `--field-6` | 投票主题 | text | "选项 C" |  |
| `--new-option-input` | 输入新选项 | text | "" |  |

已检查示例：

```bash
html-tools team-tools/team-vote generate-id --vote-title 'Hello world
Hello world
TypeScript' --max-selections '3' --voter-name 'Hello world
Hello world
TypeScript' --field-4 '选项 A' --field-5 '选项 B' --field-6 '选项 C' --new-option-input 'Hello world
Hello world
TypeScript' --json
```

### team-tools/workload-calc

工作量评估器：评估项目工作量和工时

来源：`html-tools/tools/team-tools/workload-calc.html`，SHA-256：`8c0ac7b6747a4e05980d3137699a98c74e8e6a1565596346df909ae4fcf27b87`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-id` | generateId | value |
| `calculate` | calculate | totalEstimate, sprintsNeeded, estimatedDays, avgPerPerson, summaryBody, riskAnalysis |
| `run` | 按字段输入重新计算 | totalEstimate, sprintsNeeded, estimatedDays, avgPerPerson, summaryBody, riskAnalysis |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--velocity` | velocity | number | "30" | min=1 |
| `--sprint-length` | 冲刺长度 (天) | number | "14" | min=1 |
| `--team-size` | 团队人数 | number | "5" | min=1 |
| `--field-4` | 团队速度 (每冲刺可完成) | text | "" |  |
| `--field-5` | 团队速度 (每冲刺可完成) | select-one | "medium" | "low" (低); "medium" (中); "high" (高) |
| `--field-6` | 团队速度 (每冲刺可完成) | text | "" |  |

已检查示例：

```bash
html-tools team-tools/workload-calc generate-id --velocity '30' --sprint-length '14' --team-size '5' --field-4 'Hello world
Hello world
TypeScript' --field-5 'medium' --field-6 'Hello world
Hello world
TypeScript' --json
```

### team-tools/milestone-tracker

里程碑追踪器：追踪项目里程碑进度

来源：`html-tools/tools/team-tools/milestone-tracker.html`，SHA-256：`b11c3ec0cfb2dfd3582f8cd565b5ec962302d9c32f03cf86ef85501f6aae1e54`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-id` | generateId | value |
| `update-stats` | updateStats | totalMilestones, completedCount, inProgressCount, overdueCount, daysRemaining |
| `run` | 按字段输入重新计算 | totalMilestones, completedCount, inProgressCount, overdueCount, daysRemaining |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--project-name` | 项目名称 | text | "" |  |
| `--project-deadline` | 项目截止日期 | date | "" |  |
| `--new-title` | 里程碑名称 | text | "" |  |
| `--new-description` | 描述 | textarea | "" |  |
| `--new-due-date` | 截止日期 | date | "" |  |
| `--new-owner` | 负责人 | text | "" |  |

已检查示例：

```bash
html-tools team-tools/milestone-tracker generate-id --project-name 'Hello world
Hello world
TypeScript' --project-deadline '2025-01-01' --new-title 'Hello world
Hello world
TypeScript' --new-description '192.168.1.1' --new-due-date '2025-01-01' --new-owner 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: sort-milestones: 原工具没有产生可输出的结果，请检查参数

## text

### text/bbcode-converter

BBCode与HTML互转：BBCode与HTML互转，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/bbcode-converter.html`，SHA-256：`3727e4f22510d70963b588545cfd1afd40e8a6878fb888da829232315336d809`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `html-to-bb-code` | ← | bbcode |
| `run` | 按字段输入重新计算 | preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--bbcode` | BBCode | textarea | "" |  |
| `--html` | HTML | textarea | "" |  |

已检查示例：

```bash
html-tools text/bbcode-converter html-to-bb-code --bbcode 'Hello world
Hello world
TypeScript' --html 'Hello world
Hello world
TypeScript' --json
```

### text/case-converter

文本大小写转换：文本大小写转换，多格式互转，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/case-converter.html`，SHA-256：`a176707662a17dba1d0571b96c21218281cffe76e7652dbe05a7ce25cf49f86d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `upper` | 全部大写 HELLO WORLD | input |
| `lower` | 全部小写 hello world | input |
| `title` | 标题格式 Hello World | input |
| `sentence` | 句子格式 Hello world | input |
| `camel` | 驼峰命名 helloWorld | input |
| `pascal` | 帕斯卡命名 HelloWorld | input |
| `snake` | 蛇形命名 hello_world | input |
| `kebab` | 短横线命名 hello-world | input |
| `constant` | 常量命名 HELLO_WORLD | input |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 待转换文本 | textarea | "" |  |

已检查示例：

```bash
html-tools text/case-converter upper --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### text/chinese-converter

中文简繁转换器：中文简繁转换器，多格式互转，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/chinese-converter.html`，SHA-256：`3a876e52f40678bde7cb589e996234ab7fe646efde4aab31f7bbd7ebc01254b1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert-to-traditional` | 简体 → 繁体 | output-text, output-count |
| `convert-to-simplified` | 繁体 → 简体 | output-text, output-count |
| `run` | 按字段输入重新计算 | input-count |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-text` | 输入文本 | textarea | "" |  |

已检查示例：

```bash
html-tools text/chinese-converter convert-to-traditional --input-text 'Hello world
Hello world
TypeScript' --json
```

### text/cn-convert

中文简繁转换：中文简繁转换，多格式互转，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/cn-convert.html`，SHA-256：`f6d0f4c0286c49598c42a596f80e1788ddc87e093124b7bef9d2d6d1760116b2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert-to-traditional` | 简体 → 繁体 | output |
| `convert-to-simplified` | 繁体 → 简体 | output |
| `update-char-count` | updateCharCount | charCount |
| `run` | 按字段输入重新计算 | charCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | textarea | "" |  |

已检查示例：

```bash
html-tools text/cn-convert convert-to-traditional --input 'Hello world
Hello world
TypeScript' --json
```

### text/column-processor

文本列处理器：文本列处理器，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/column-processor.html`，SHA-256：`aa16fbb2aacd4a845b04cbe6135beb1c6ec26a6f45d537faa5d093dc2057a411`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-operation-ui` | updateOperationUI | columnInputs |
| `process` | process | columnCount, output |
| `run` | 按字段输入重新计算 | columnInputs, columnCount, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 粘贴多行文本，每行包含由分隔符分隔的列... 例如： 张三 25 北京 李四 30 上海 王五 28 广州 | textarea | "" |  |
| `--delimiter` | 分隔符 | select-one | "tab" | "tab" (Tab 制表符); "comma" (逗号 ,); "semicolon" (分号 ;); "pipe" (竖线 \|); "space" (空格); "custom" (自定义) |
| `--custom-delimiter` | 自定义分隔符 | text | "" |  |
| `--operation` | 操作类型 | select-one | "extract" | "extract" (提取列); "remove" (删除列); "swap" (交换列); "add" (添加列); "reorder" (重排列) |
| `--col1` | 列号 (从1开始) | number | "1" | min=1 |
| `--col2` | 第二列号 | number | "2" | min=1 |
| `--add-value` | 新列内容 | text | "" |  |
| `--reorder-cols` | 列顺序 (如: 3,1,2) | text | "" |  |
| `--output-delimiter` | 输出分隔符 | select-one | "same" | "same" (与输入相同); "tab" (Tab 制表符); "comma" (逗号 ,); "semicolon" (分号 ;); "pipe" (竖线 \|); "space" (空格) |

已检查示例：

```bash
html-tools text/column-processor update-operation-ui --input 'Hello world
Hello world
TypeScript' --delimiter 'tab' --custom-delimiter 'Hello world
Hello world
TypeScript' --operation 'extract' --col1 '1' --col2 '2' --add-value 'Hello world
Hello world
TypeScript' --reorder-cols 'Hello world
Hello world
TypeScript' --output-delimiter 'same' --json
```

### text/diff-checker

文本对比工具：对比两段文本的差异

来源：`html-tools/tools/text/diff-checker.html`，SHA-256：`345f56523225580f1bbdb81f31c7f9a3cff38d9ea945e2714380a0c07e4430b4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `compare` | 🔍 对比文本 | stats, diffContent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text1` | 输入原始文本... | textarea | "Hello World\nThis is a test\nLine three\nLine four" |  |
| `--text2` | 输入对比文本... | textarea | "Hello World!\nThis is a test\nLine three modified\nLine five" |  |

已检查示例：

```bash
html-tools text/diff-checker compare --text1 'Hello World
This is a test
Line three
Line four' --text2 'Hello World!
This is a test
Line three modified
Line five' --json
```

### text/emoji-search

Emoji 搜索器：Emoji 搜索器，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/emoji-search.html`，SHA-256：`b9157a36e55fce5343dc11b84f149f7fa942d0a75f36ff7edd636faefad2695b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `search-emoji` | searchEmoji | emojiContainer, stats |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools text/emoji-search search-emoji  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### text/frequency-analyzer

文本频率分析器：分析文本字符/词频分布，支持 N-gram 和词云可视化

来源：`html-tools/tools/text/frequency-analyzer.html`，SHA-256：`599aecdbd9302fe172a646838d967bdf9770baffa8c4cbee931602de375db7d9`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | 分析 | totalChars, uniqueItems, entropy, topItem, freqTableBody, freqChart, wordCloud |
| `update-table-view` | updateTableView | freqTableBody |
| `update-chart-view` | updateChartView | freqChart |
| `update-cloud-view` | updateCloudView | wordCloud |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-input` | 分析模式： 字符频率 词频分析 N-gram 分析 | textarea | "春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。\n\nThe quick brown fox jumps over the lazy dog. The dog was not amused by the fox's antics. Foxes are known for their cunning nature." |  |
| `--mode-select` | 分析模式： 字符频率 词频分析 N-gram 分析 | select-one | "char" | "char" (字符频率); "word" (词频分析); "ngram" (N-gram 分析) |
| `--ngram-size` | N 值： | number | "2" | min=2, max=5 |
| `--ignore-case` / `--no-ignore-case` | 忽略大小写 | checkbox | true |  |
| `--ignore-spaces` / `--no-ignore-spaces` | 忽略空白 | checkbox | true |  |
| `--ignore-punct` / `--no-ignore-punct` | 忽略标点 | checkbox | false |  |

已检查示例：

```bash
html-tools text/frequency-analyzer analyze --text-input '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。

The quick brown fox jumps over the lazy dog. The dog was not amused by the fox'\''s antics. Foxes are known for their cunning nature.' --mode-select 'char' --ngram-size '2' --ignore-case --ignore-spaces --no-ignore-punct --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### text/html-markdown

HTML ⇄ Markdown 转换：HTML 与 Markdown 双向转换，支持表格、代码块、链接等

来源：`html-tools/tools/text/html-markdown.html`，SHA-256：`638f9a980caede83a93e7e4646bdc5aa8945a19d095834c667494e94391e5839`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 转换 | output |
| `html2md` | HTML → Markdown | inputLabel, outputLabel |
| `md2html` | Markdown → HTML | inputLabel, outputLabel |
| `update-mode` | updateMode | inputLabel, outputLabel |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | HTML 输入 | textarea | "" |  |

已检查示例：

```bash
html-tools text/html-markdown convert --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: update-counts: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### text/latex-editor

LaTeX公式编辑器：LaTeX公式编辑器，在线编辑，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/latex-editor.html`，SHA-256：`daf5e693fd995c38aa178fe214b99abcf2725bb7e7415406ecb0cec39a413ce2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-history-list` | updateHistoryList | history-list |
| `run` | 按字段输入重新计算 | preview-box |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--latex-input` | LaTeX代码 | textarea | "" |  |

已检查示例：

```bash
html-tools text/latex-editor update-history-list --latex-input 'Hello world
Hello world
TypeScript' --json
```

### text/line-number

行号添加/移除：为文本添加或移除行号

来源：`html-tools/tools/text/line-number.html`，SHA-256：`0b936e6f4efb9a1c1d73689900c21d5dce0e4701d888ce95f98a9881f9a837ae`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `process` | 🔄 处理 | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--mode` | 操作模式 | select-one | "add" | "add" (添加行号); "remove" (删除行号) |
| `--start` | 起始行号 | number | "1" | min=0 |
| `--separator` | 分隔符 | select-one | ": " | ": " (: (冒号)); ". " (. (点号)); ") " () (括号)); "\| " (\| (竖线)); "\\t" (Tab); "  " (双空格) |
| `--padding` | 行号宽度 | select-one | "0" | "0" (自动); "2" (2位); "3" (3位); "4" (4位); "5" (5位) |
| `--input` | 输入文本 | textarea | "第一行内容\n第二行内容\n第三行内容\n第四行内容\n第五行内容" |  |

已检查示例：

```bash
html-tools text/line-number process --mode 'add' --start '1' --separator ': ' --padding '0' --input '第一行内容
第二行内容
第三行内容
第四行内容
第五行内容' --json
```

### text/line-sorter

行排序工具：按字母、数字或自定义规则排序文本行

来源：`html-tools/tools/text/line-sorter.html`，SHA-256：`aafe3ed7752e6518ad1575b096a7c9a73cedb304ee422b66412672e603653569`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `sort-lines` | sortLines | inputLines, outputLines, output |
| `run` | 按字段输入重新计算 | inputLines, outputLines, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 在此输入或粘贴多行文本，每行将作为一个排序单元... 例如： 香蕉 苹果 橙子 葡萄 | textarea | "" |  |
| `--sort-method` | 排序方式 | select-one | "alphabetical" | "alphabetical" (字母顺序 (A-Z)); "alphabetical-desc" (字母逆序 (Z-A)); "numeric" (数字顺序 (小到大)); "numeric-desc" (数字逆序 (大到小)); "length" (按长度 (短到长)); "length-desc" (按长度 (长到短)); "reverse" (反转行顺序); "shuffle" (随机打乱) |
| `--case-sensitive` / `--no-case-sensitive` | 区分大小写 | checkbox | false |  |
| `--remove-duplicates` / `--no-remove-duplicates` | 去除重复行 | checkbox | false |  |
| `--trim-lines` / `--no-trim-lines` | 去除行首尾空格 | checkbox | true |  |
| `--remove-empty` / `--no-remove-empty` | 去除空行 | checkbox | false |  |

已检查示例：

```bash
html-tools text/line-sorter sort-lines --input 'Hello world
Hello world
TypeScript' --sort-method 'alphabetical' --no-case-sensitive --no-remove-duplicates --trim-lines --no-remove-empty --json
```

### text/markdown-editor

Markdown 编辑器：Markdown 编辑器，在线编辑，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/markdown-editor.html`，SHA-256：`c9baa0d863dc68153408d787840ec7e94880cf57ff685bfbf3c05c7f7b946206`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | preview |
| `run` | 按字段输入重新计算 | preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 在这里输入Markdown... | textarea | "# 欢迎使用Markdown编辑器\n\n这是一个**实时预览**的Markdown编辑器。\n\n## 功能特性\n\n- 实时预览\n- 语法高亮\n- 支持多种Markdown语法\n\n### 代码示例\n\n```javascript\nfunction hello() {\n    console.log(\"Hello, World!\");\n}\n```\n\n> 这是一段引用文字\n\n\| 表头1 \| 表头2 \|\n\|-------\|-------\|\n\| 内容1 \| 内容2 \|\n\n---\n\n[访问链接](https://example.com)\n" |  |

已检查示例：

```bash
html-tools text/markdown-editor render --input '# 欢迎使用Markdown编辑器

这是一个**实时预览**的Markdown编辑器。

## 功能特性

- 实时预览
- 语法高亮
- 支持多种Markdown语法

### 代码示例

```javascript
function hello() {
    console.log("Hello, World!");
}
```

> 这是一段引用文字

| 表头1 | 表头2 |
|-------|-------|
| 内容1 | 内容2 |

---

[访问链接](https://example.com)
' --json
```

### text/markdown-preview

Markdown 预览：实时 Markdown 预览，支持 GFM 语法，可导出 HTML

来源：`html-tools/tools/text/markdown-preview.html`，SHA-256：`fb52dcc290ce36a95a5586081e7eee0197e568d391b9d8ce0561fe00b4307d4e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-preview` | updatePreview | charCount, preview |
| `update-char-count` | updateCharCount | charCount |
| `run` | 按字段输入重新计算 | charCount, preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--editor` | 在此输入 Markdown 内容... | textarea | "# Hello Markdown!\n\n欢迎使用 **Markdown 预览器**。\n\n## 功能特性\n\n- 实时预览\n- 语法渲染\n- 分栏编辑模式\n\n### 代码示例\n\n\\`\\`\\`javascript\nfunction greet(name) {\n    return \\`Hello, \\${name}!\\`;\n}\n\\`\\`\\`\n\n### 表格示例\n\n\| 名称 \| 类型 \| 描述 \|\n\|------\|------\|------\|\n\| id \| number \| 唯一标识 \|\n\| name \| string \| 用户名 \|\n\n### 引用\n\n> Markdown 是一种轻量级标记语言。\n\n### 链接\n\n访问 [WebUtils](https://tools.realtime-ai.chat/) 获取更多工具。\n\n---\n\n*斜体* 和 **粗体** 和 ~~删除线~~" |  |

已检查示例：

```bash
html-tools text/markdown-preview update-preview --editor '# Hello Markdown!

欢迎使用 **Markdown 预览器**。

## 功能特性

- 实时预览
- 语法渲染
- 分栏编辑模式

### 代码示例

\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}!\`;
}
\`\`\`

### 表格示例

| 名称 | 类型 | 描述 |
|------|------|------|
| id | number | 唯一标识 |
| name | string | 用户名 |

### 引用

> Markdown 是一种轻量级标记语言。

### 链接

访问 [WebUtils](https://tools.realtime-ai.chat/) 获取更多工具。

---

*斜体* 和 **粗体** 和 ~~删除线~~' --json
```

### text/markdown-table

Markdown 表格生成器：可视化编辑 Markdown 表格，支持导入 CSV 数据

来源：`html-tools/tools/text/markdown-table.html`，SHA-256：`030f6243307c2584ef715307988fd51a035bd4d7af77d964a5ed594d0b908337`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-output` | generateOutput | output, preview |
| `run` | 按字段输入重新计算 | output, preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--cols` | 列数: | number | "3" | min=1, max=20 |
| `--rows` | 行数: | number | "3" | min=1, max=50 |
| `--field-3` | 列数: | text | "列1" |  |
| `--field-4` | 列数: | text | "列2" |  |
| `--field-5` | 列数: | text | "列3" |  |
| `--field-6` | 列数: | text | "" |  |
| `--field-7` | 列数: | text | "" |  |
| `--field-8` | 列数: | text | "" |  |
| `--field-9` | 列数: | text | "" |  |
| `--field-10` | 列数: | text | "" |  |
| `--field-11` | 列数: | text | "" |  |
| `--field-12` | 列数: | text | "" |  |
| `--field-13` | 列数: | text | "" |  |
| `--field-14` | 列数: | text | "" |  |

已检查示例：

```bash
html-tools text/markdown-table generate-output --cols '3' --rows '3' --field-3 '列1' --field-4 '列2' --field-5 '列3' --field-6 'Hello world
Hello world
TypeScript' --field-7 'Hello world
Hello world
TypeScript' --field-8 'Hello world
Hello world
TypeScript' --field-9 'Hello world
Hello world
TypeScript' --field-10 'Hello world
Hello world
TypeScript' --field-11 'Hello world
Hello world
TypeScript' --field-12 'Hello world
Hello world
TypeScript' --field-13 'Hello world
Hello world
TypeScript' --field-14 'Hello world
Hello world
TypeScript' --json
```

### text/md-to-html

Markdown 转 HTML：Markdown 转 HTML，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/md-to-html.html`，SHA-256：`a4c60cf5cb2419b092a958ef6587ecbece0628800466f6cafdac6703139b6266`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | inputStats, previewArea, htmlOutput |
| `run` | 按字段输入重新计算 | inputStats, previewArea, htmlOutput |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--md-input` | 输入 Markdown 内容... | textarea | "# Markdown 示例\n\n这是一个 **Markdown** 转 *HTML* 的示例。\n\n## 功能特点\n\n- 实时预览\n- 支持 GFM 语法\n- 代码高亮\n\n### 代码示例\n\n```javascript\nfunction hello() {\n    console.log('Hello, World!');\n}\n```\n\n### 表格示例\n\n\| 名称 \| 价格 \| 数量 \|\n\|------\|------\|------\|\n\| 苹果 \| ¥5   \| 10   \|\n\| 香蕉 \| ¥3   \| 20   \|\n\n### 引用\n\n> 这是一段引用文字。\n> 可以多行。\n\n### 链接和图片\n\n[访问 GitHub](https://github.com)\n\n### 任务列表\n\n- [x] 已完成任务\n- [ ] 待完成任务\n\n---\n\n*感谢使用！*" |  |
| `--field-2` / `--no-field-2` | field-2 | checkbox | true |  |
| `--field-3` / `--no-field-3` | field-3 | checkbox | false |  |

已检查示例：

```bash
html-tools text/md-to-html convert --md-input '# Markdown 示例

这是一个 **Markdown** 转 *HTML* 的示例。

## 功能特点

- 实时预览
- 支持 GFM 语法
- 代码高亮

### 代码示例

```javascript
function hello() {
    console.log('\''Hello, World!'\'');
}
```

### 表格示例

| 名称 | 价格 | 数量 |
|------|------|------|
| 苹果 | ¥5   | 10   |
| 香蕉 | ¥3   | 20   |

### 引用

> 这是一段引用文字。
> 可以多行。

### 链接和图片

[访问 GitHub](https://github.com)

### 任务列表

- [x] 已完成任务
- [ ] 待完成任务

---

*感谢使用！*' --field-2 --no-field-3 --json
```

### text/nato-alphabet

NATO 字母表：NATO 音标字母表转换

来源：`html-tools/tools/text/nato-alphabet.html`，SHA-256：`5e03cac3535c44b6d2cadc97de82fd48ccd3f0cf56ab3722b3def29b0c6674f2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | result |
| `run` | 按字段输入重新计算 | result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文字 | text | "" |  |

已检查示例：

```bash
html-tools text/nato-alphabet convert --input 'Hello world
Hello world
TypeScript' --json
```

### text/number-formatter

数字格式化工具：数字格式化工具，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/number-formatter.html`，SHA-256：`b6cd2db69865ae240a6a3d045d1eecace24580404d55e3baf2e39d5435110110`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format-all` | formatAll | formatCards, conversionGrid |
| `run` | 按字段输入重新计算 | formatCards, conversionGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--number-input` | 输入数字 | text | "1234567.89" |  |
| `--locale` | 语言/地区 | select-one | "zh-CN" | "zh-CN" (中文 (中国)); "zh-TW" (中文 (台湾)); "en-US" (English (US)); "en-GB" (English (UK)); "ja-JP" (日本語); "ko-KR" (한국어); "de-DE" (Deutsch); "fr-FR" (Français) |
| `--currency` | 货币 | select-one | "CNY" | "CNY" (人民币 (CNY)); "USD" (美元 (USD)); "EUR" (欧元 (EUR)); "GBP" (英镑 (GBP)); "JPY" (日元 (JPY)); "KRW" (韩元 (KRW)); "HKD" (港币 (HKD)); "TWD" (新台币 (TWD)) |
| `--decimals` | 小数位数 | number | "2" | min=0, max=20 |

已检查示例：

```bash
html-tools text/number-formatter format-all --number-input '1234567.89' --locale 'zh-CN' --currency 'CNY' --decimals '2' --json
```

### text/pangu-spacing

盘古之白：自动在中英文之间添加空格，优化排版

来源：`html-tools/tools/text/pangu-spacing.html`，SHA-256：`324839a56c685d8ef8d2e211dd9fce29a03a052f659f973ea144786815add9c7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `format` | 校正排版 | outputInfo, output, statSpaces, statPunct |
| `update-input-info` | updateInputInfo | inputInfo |
| `update-output-info` | updateOutputInfo | outputInfo |
| `format-text` | formatText | outputInfo, output, statSpaces, statPunct |
| `run` | 按字段输入重新计算 | inputInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--space-cjk-en` / `--no-space-cjk-en` | 中英文之间加空格 | checkbox | true |  |
| `--space-cjk-num` / `--no-space-cjk-num` | 中文与数字之间加空格 | checkbox | true |  |
| `--fix-punctuation` / `--no-fix-punctuation` | 修正标点符号 | checkbox | true |  |
| `--remove-extra-spaces` / `--no-remove-extra-spaces` | 合并多余空格 | checkbox | true |  |
| `--input` | 输入文本 | textarea | "" |  |

已检查示例：

```bash
html-tools text/pangu-spacing format --space-cjk-en --space-cjk-num --fix-punctuation --remove-extra-spaces --input 'Hello world
Hello world
TypeScript' --json
```

### text/pinyin-sort

拼音排序工具：拼音排序工具，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/pinyin-sort.html`，SHA-256：`b2d1ddb895017131b55981de9ac47ef627e702ff20af4569b61adae58ff07839`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `sort-btn` | 按拼音排序 | previewList |
| `reverse-btn` | 降序排列 | previewList |
| `sort-items` | sortItems | previewList |
| `update-stats` | updateStats | itemCount, charCount |
| `run` | 按字段输入重新计算 | itemCount, charCount, previewList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--delimiter` | 分隔符: 换行符 逗号 空格 分号 自定义 | select-one | "newline" | "newline" (换行符); "comma" (逗号); "space" (空格); "semicolon" (分号); "custom" (自定义) |
| `--custom-delimiter` | 自定义: | text | "" |  |
| `--input-text` | 分隔符: 换行符 逗号 空格 分号 自定义 | textarea | "" |  |
| `--show-pinyin` / `--no-show-pinyin` | 显示拼音 | checkbox | true |  |
| `--group-by-initial` / `--no-group-by-initial` | 按首字母分组 | checkbox | false |  |
| `--remove-duplicates` / `--no-remove-duplicates` | 去除重复 | checkbox | false |  |
| `--output-format` | 分隔符: 换行符 逗号 空格 分号 自定义 | radio | "newline" | "newline" (换行); "comma" (逗号); "numbered" (编号列表) |

已检查示例：

```bash
html-tools text/pinyin-sort sort-btn --delimiter 'newline' --custom-delimiter 'Hello world
Hello world
TypeScript' --input-text 'Hello world
Hello world
TypeScript' --show-pinyin --no-group-by-initial --no-remove-duplicates --output-format 'newline' --json
```

操作限制：部分原页面操作未通过迁移检查: parse-input: 原工具没有产生可输出的结果，请检查参数

### text/placeholder-text

占位文本生成器：占位文本生成器，一键在线生成，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/placeholder-text.html`，SHA-256：`c459051621620a83eb79dc7719bf5011968d015a176c520990346c8c6f3dbc15`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | ⚡ 生成文本 | output, charCount, wordCount, paraCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--unit` | 生成单位 | select-one | "paragraphs" | "paragraphs" (段落); "sentences" (句子); "words" (单词/词语); "characters" (字符) |
| `--amount` | 数量 | number | "3" | min=1, max=100 |
| `--format` | 格式 | select-one | "plain" | "plain" (纯文本); "html-p" (HTML 段落 (<p>)); "html-li" (HTML 列表 (<li>)); "html-div" (HTML Div) |

已检查示例：

```bash
html-tools text/placeholder-text generate --unit 'paragraphs' --amount '3' --format 'plain' --json
```

### text/random-picker

随机文本选择器：随机文本选择器，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/random-picker.html`，SHA-256：`33a0ee84fad5a8a31c1114bee799cf0c032bc61511705779915ed511df8720c0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `shuffle-all` | 🔀 打乱顺序 | textInput, totalCount, uniqueCount |
| `update-stats` | updateStats | totalCount, uniqueCount |
| `run` | 按字段输入重新计算 | totalCount, uniqueCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-input` | 输入文本（每行一个选项） | textarea | "" |  |
| `--pick-count` | 抽取数量： | number | "1" | min=1, max=100 |
| `--allow-duplicate` / `--no-allow-duplicate` | 允许重复 | checkbox | false |  |
| `--show-animation` / `--no-show-animation` | 显示动画 | checkbox | true |  |

已检查示例：

```bash
html-tools text/random-picker shuffle-all --text-input 'Hello world
Hello world
TypeScript' --pick-count '1' --no-allow-duplicate --show-animation --json
```

### text/reading-time

阅读时间估算：估算文章阅读时间，支持中英文混合统计

来源：`html-tools/tools/text/reading-time.html`，SHA-256：`e6ea0ac71aa130bc2fe8468347f6a14af789632fe0e856b1bbbac9ba230ff629`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | analyze | readingTime, charCount, wordCount, paraCount, lineCount, zhCount, enCount, numCount, punctCount, spaceCount, enWordCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--read-speed` | 阅读速度： 字/分钟 词/分钟 | number | "300" | min=50, max=1000 |
| `--speed-unit` | 阅读速度： 字/分钟 词/分钟 | select-one | "cpm" | "cpm" (字/分钟); "wpm" (词/分钟) |
| `--lang-type` | 语言类型： 中文 英文 中英混合 | select-one | "zh" | "zh" (中文); "en" (英文); "mixed" (中英混合) |
| `--input-text` | 粘贴或输入文本内容... | textarea | "" |  |

已检查示例：

```bash
html-tools text/reading-time analyze --read-speed '300' --speed-unit 'cpm' --lang-type 'zh' --input-text 'Hello world
Hello world
TypeScript' --json
```

### text/shuangpin-trainer

双拼练习器：双拼练习器，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/shuangpin-trainer.html`，SHA-256：`9468df616fbb8a41c62c74c86106dee184d83df59b01b3e6ebe4c783893b030f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `check-answer` | 确认 | totalCount, correctCount, accuracy, streak, currentChar, pinyinHint, historyList |
| `update-display` | updateDisplay | currentChar, pinyinHint |
| `update-stats` | updateStats | totalCount, correctCount, accuracy, streak |
| `run` | 按字段输入重新计算 | totalCount, correctCount, accuracy, streak, currentChar, pinyinHint, keyboard, schemeTableContainer |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--scheme-select` | 双拼方案： 小鹤双拼 自然码 搜狗双拼 微软双拼 | select-one | "xiaohe" | "xiaohe" (小鹤双拼); "ziranma" (自然码); "sogou" (搜狗双拼); "microsoft" (微软双拼) |
| `--show-hint` / `--no-show-hint` | 显示拼音提示 | checkbox | true |  |
| `--show-keyboard` / `--no-show-keyboard` | 显示键位图 | checkbox | true |  |
| `--user-input` | 输入双拼 | text | "" |  |

已检查示例：

```bash
html-tools text/shuangpin-trainer check-answer --scheme-select 'xiaohe' --show-hint --show-keyboard --user-input 'Hello world
Hello world
TypeScript' --json
```

### text/slugify

Slugify 工具：生成 URL slug

来源：`html-tools/tools/text/slugify.html`，SHA-256：`27eff09a67a70321c4ef0f69e6f5f4e7f924804f4c6b7cb40f57450ed334d969`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update` | update | output, origLen, slugLen |
| `run` | 按字段输入重新计算 | output, origLen, slugLen |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文字 | text | "" |  |
| `--opt-lower` / `--no-opt-lower` | 转小写 | checkbox | true |  |
| `--opt-separator` | 分隔符: 连字符 (-) 下划线 (_) 点号 (.) 无分隔符 | select-one | "-" | "-" (连字符 (-)); "_" (下划线 (_)); "." (点号 (.)); "" (无分隔符) |
| `--opt-trim` / `--no-opt-trim` | 去除首尾空格 | checkbox | true |  |
| `--opt-strict` / `--no-opt-strict` | 严格模式 (仅保留 a-z 0-9) | checkbox | false |  |

已检查示例：

```bash
html-tools text/slugify update --input 'Hello world
Hello world
TypeScript' --opt-lower --opt-separator '-' --opt-trim --no-opt-strict --json
```

### text/string-escape

字符串转义：字符串转义和反转义

来源：`html-tools/tools/text/string-escape.html`，SHA-256：`a10002b84a7630ff30f66aec23e45822fabfa70cd35e509fabb3d8a7a3e53fff`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `process` | process | output, info |
| `run` | 按字段输入重新计算 | output, info |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | textarea | "Hello \"World\"\nThis is a test" |  |

已检查示例：

```bash
html-tools text/string-escape process --input 'Hello "World"
This is a test' --json
```

### text/template-filler

文本模板填充器：文本模板变量填充，支持批量生成和 CSV 导入

来源：`html-tools/tools/text/template-filler.html`，SHA-256：`54efe34ca00f427b6d019a38e8264e4f84f71148c4dec9619428ea69aa378044`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `fill-template` | 填充模板 | output |
| `run` | 按字段输入重新计算 | variables, output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--template-input` | 输入模板，使用 {{变量名}} 作为占位符... | textarea | "尊敬的 {{name}}：\n\n您好！感谢您使用我们的服务。\n\n您的订单号：{{orderNo}}\n订单金额：¥{{amount}}\n下单时间：{{datetime}}\n\n如有问题，请联系客服。\n\n祝好！\n{{company}}" |  |
| `--field-2` | 输入值... | text | "" |  |
| `--field-3` | 输入值... | text | "" |  |
| `--field-4` | 输入值... | text | "" |  |
| `--field-5` | 输入值... | text | "" |  |
| `--field-6` | 输入值... | text | "" |  |
| `--batch-data` | name,orderNo,amount,datetime,company 张三,ORD001,99.00,2024-01-15,示例公司 李四,ORD002,199.00,2024-01-16,示例公司 | textarea | "" |  |

已检查示例：

```bash
html-tools text/template-filler fill-template --template-input '尊敬的 {{name}}：

您好！感谢您使用我们的服务。

您的订单号：{{orderNo}}
订单金额：¥{{amount}}
下单时间：{{datetime}}

如有问题，请联系客服。

祝好！
{{company}}' --field-2 'Hello world
Hello world
TypeScript' --field-3 'Hello world
Hello world
TypeScript' --field-4 'Hello world
Hello world
TypeScript' --field-5 'Hello world
Hello world
TypeScript' --field-6 'Hello world
Hello world
TypeScript' --batch-data 'Hello world
Hello world
TypeScript' --json
```

### text/text-cipher

文本加密/解密：多种古典加密算法：凯撒、ROT13、栅栏等

来源：`html-tools/tools/text/text-cipher.html`，SHA-256：`3431b079dd3e6d16ea544e612b88ebd1c8d1c9ae122d60afd635730192c6f268`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `encrypt` | 加密 | output |
| `decrypt` | 解密 | output |
| `update-ui` | updateUI | cipherInfo |
| `run` | 按字段输入重新计算 | cipherInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--cipher` | 加密算法 | select-one | "caesar" | "caesar" (凯撒密码 (Caesar)); "rot13" (ROT13); "atbash" (阿特巴希码 (Atbash)); "vigenere" (维吉尼亚密码 (Vigenère)); "reverse" (反转字符串); "binary" (二进制编码); "hex" (十六进制编码) |
| `--shift` | 偏移量 | number | "3" | min=1, max=25 |
| `--key` | 密钥 | text | "" |  |
| `--input` | 明文 / 密文 | textarea | "" |  |

已检查示例：

```bash
html-tools text/text-cipher encrypt --cipher 'caesar' --shift '3' --key 'Hello world
Hello world
TypeScript' --input 'Hello world
Hello world
TypeScript' --json
```

### text/text-columns

列处理工具：处理 CSV/TSV 格式的列数据

来源：`html-tools/tools/text/text-columns.html`，SHA-256：`ee796f3dd2ba48ed349ae78fe8432d5f1111f8e1863a99bfe73037a63c495a53`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `process` | 🔄 处理 | output, columnInfo |
| `run` | 按字段输入重新计算 | output, columnInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--operation` | 操作类型 | select-one | "extract" | "extract" (提取列); "remove" (删除列); "reorder" (重排列); "swap" (交换两列) |
| `--input-delimiter` | 输入分隔符 | select-one | "\\t" | "\\t" (Tab); "," (逗号 (CSV)); ";" (分号); "\|" (竖线); " " (空格) |
| `--output-delimiter` | 输出分隔符 | select-one | "\\t" | "\\t" (Tab); "," (逗号); ";" (分号); "\|" (竖线); " " (空格) |
| `--columns` | 列号 (如: 1,3,5 或 1-3) | text | "1" |  |
| `--input` | 输入数据 | textarea | "姓名\t年龄\t城市\t职业\n张三\t25\t北京\t工程师\n李四\t30\t上海\t设计师\n王五\t28\t广州\t产品经理" |  |

已检查示例：

```bash
html-tools text/text-columns process --operation 'extract' --input-delimiter '\t' --output-delimiter '\t' --columns '1' --input '姓名	年龄	城市	职业
张三	25	北京	工程师
李四	30	上海	设计师
王五	28	广州	产品经理' --json
```

### text/text-compare

文本对比增强版：增强版文本对比，支持分栏/统一视图，忽略大小写和空白

来源：`html-tools/tools/text/text-compare.html`，SHA-256：`b10e8853a5b76bf824bf2fe897483a03e8adfd0497fbf312eade7d492ac38f46`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `compare` | 🔍 对比 | statsLeft, statsRight, addCount, delCount, modCount, similarity, diffLeft, diffRight, diffUnified |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--view-mode` | 忽略大小写 | select-one | "split" | "split" (分栏视图); "unified" (统一视图) |
| `--diff-level` | 忽略大小写 | select-one | "line" | "line" (按行对比); "word" (按词对比); "char" (按字符对比) |
| `--ignore-case` / `--no-ignore-case` | 忽略大小写 | checkbox | false |  |
| `--ignore-whitespace` / `--no-ignore-whitespace` | 忽略空白 | checkbox | false |  |
| `--text-left` | 在此输入原始文本... | textarea | "这是第一行\n这是第二行内容\n这是要删除的行\n这是第四行\n共同的内容保持不变" |  |
| `--text-right` | 在此输入修改后的文本... | textarea | "这是第一行\n这是第二行内容已修改\n这是新增的行\n这是第四行\n共同的内容保持不变" |  |

已检查示例：

```bash
html-tools text/text-compare compare --view-mode 'split' --diff-level 'line' --no-ignore-case --no-ignore-whitespace --text-left '这是第一行
这是第二行内容
这是要删除的行
这是第四行
共同的内容保持不变' --text-right '这是第一行
这是第二行内容已修改
这是新增的行
这是第四行
共同的内容保持不变' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### text/text-dedup

文本去重：去除重复行，支持保持顺序和忽略大小写

来源：`html-tools/tools/text/text-dedup.html`，SHA-256：`29c91a66fe09e769ff405a003db4d8a026f5c7a59e600bf3e41e0c622e32dc43`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `dedup` | 去重 | output, statOriginal, statUnique, statRemoved |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--trim-lines` / `--no-trim-lines` | 去除首尾空白 | checkbox | true |  |
| `--ignore-case` / `--no-ignore-case` | 忽略大小写 | checkbox | false |  |
| `--ignore-empty` / `--no-ignore-empty` | 忽略空行 | checkbox | true |  |
| `--keep-order` / `--no-keep-order` | 保持原顺序 | checkbox | true |  |
| `--input` | 输入文本 | textarea | "" |  |

已检查示例：

```bash
html-tools text/text-dedup dedup --trim-lines --no-ignore-case --ignore-empty --keep-order --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: update-input-count: 原工具没有产生可输出的结果，请检查参数 | update-output-count: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### text/text-diff

文本 Diff：文本差异对比，左右并排显示，行内差异高亮

来源：`html-tools/tools/text/text-diff.html`，SHA-256：`47dfc15e6ede56e94e8e664aeeb9c4294e5e70f271f9c384550d25e20aeda995`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `compare-texts` | 对比 | result |
| `run` | 按字段输入重新计算 | result |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--diff-mode` | 逐行对比 | radio | "line" | "line" (line); "word" (word); "char" (char) |
| `--text1` | 输入原始文本 ... | textarea | "" |  |
| `--text2` | 输入新文本 ... | textarea | "" |  |

已检查示例：

```bash
html-tools text/text-diff compare-texts --diff-mode 'line' --text1 'hello
world' --text2 'hello
TypeScript' --json
```

### text/text-encrypt

文本加密工具：文本加密工具，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/text-encrypt.html`，SHA-256：`8c51d3867f102f46588bd3488432f22b372883ec4f1dcb0c7a2fdbc8346615d3`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-key` | 生成随机密钥 | keyInput |
| `process-text` | 加密 | outputText |
| `run` | 按字段输入重新计算 | outputText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--key-input` | 密钥 | text | "" |  |
| `--input-text` | 原文 | textarea | "" |  |

已检查示例：

```bash
html-tools text/text-encrypt generate-key --key-input 'Hello world
Hello world
TypeScript' --input-text 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: update-key-section: 原工具没有产生可输出的结果，请检查参数 | update-strength: 原工具没有产生可输出的结果，请检查参数

### text/text-frequency

文本频率分析：文本频率分析，在线分析，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/text-frequency.html`，SHA-256：`4ce64c351caa184ee166c75391a7ae4f629d47e14147bd93c64ddd095973e3ca`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | 开始分析 | total-chars, total-words, unique-words, avg-length, chinese-chars, english-words, freq-list, word-cloud |
| `run` | 按字段输入重新计算 | char-count |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-text` | 输入文本 | textarea | "" |  |
| `--ignore-case` / `--no-ignore-case` | 忽略大小写 | checkbox | true |  |
| `--ignore-punct` / `--no-ignore-punct` | 忽略标点 | checkbox | true |  |
| `--ignore-numbers` / `--no-ignore-numbers` | 忽略数字 | checkbox | false |  |
| `--analyze-mode` | 分析模式: 单字分析 词语分析 句子分析 | select-one | "word" | "char" (单字分析); "word" (词语分析); "sentence" (句子分析) |
| `--display-count` | 显示数量: 前20 前50 前100 全部 | select-one | "50" | "20" (前20); "50" (前50); "100" (前100); "all" (全部) |

已检查示例：

```bash
html-tools text/text-frequency analyze --input-text 'Hello world
Hello world
TypeScript' --ignore-case --ignore-punct --no-ignore-numbers --analyze-mode 'word' --display-count '50' --json
```

### text/text-merge

多行文本合并器：多行文本合并器，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/text-merge.html`，SHA-256：`1f882a1df562b8a66c5d0d31b89dd25b66f8de6af0533b63443e1ed81768004a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `merge-texts` | mergeTexts | outputArea, lineCount, charCount, dupCount |
| `run` | 按字段输入重新计算 | outputArea, lineCount, charCount, dupCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--field-1` | 行分隔符 | textarea | "苹果\n香蕉\n橙子" |  |
| `--field-2` | 行分隔符 | textarea | "葡萄\n西瓜\n香蕉" |  |
| `--line-separator` | 行分隔符 | select-one | "\\n" | "\\n" (换行符 (\n)); ", " (逗号+空格); "," (逗号); " " (空格); "; " (分号+空格); " \| " (竖线); "\\t" (Tab); "custom" (自定义...) |
| `--custom-separator` | 自定义分隔符 | text | "" |  |
| `--block-separator` | 文本块分隔 | select-one | "\\n" | "none" (直接连接); "\\n" (换行); "\\n\\n" (空行); "\\n---\\n" (分隔线) |
| `--sort-mode` | 排序方式 | select-one | "none" | "none" (不排序); "asc" (升序 (A-Z)); "desc" (降序 (Z-A)); "length-asc" (按长度升序); "length-desc" (按长度降序); "random" (随机排序) |
| `--remove-duplicates` / `--no-remove-duplicates` | 去除重复行 | checkbox | false |  |
| `--remove-empty` / `--no-remove-empty` | 去除空行 | checkbox | true |  |
| `--trim-lines` / `--no-trim-lines` | 去除首尾空格 | checkbox | true |  |
| `--add-prefix` / `--no-add-prefix` | 添加前缀 | checkbox | false |  |
| `--add-suffix` / `--no-add-suffix` | 添加后缀 | checkbox | false |  |
| `--add-line-numbers` / `--no-add-line-numbers` | 添加行号 | checkbox | false |  |
| `--prefix-text` | 前缀内容 | text | "" |  |
| `--suffix-text` | 后缀内容 | text | "" |  |

已检查示例：

```bash
html-tools text/text-merge merge-texts --field-1 '苹果
香蕉
橙子' --field-2 '葡萄
西瓜
香蕉' --line-separator '\n' --custom-separator 'Hello world
Hello world
TypeScript' --block-separator '\n' --sort-mode 'none' --no-remove-duplicates --remove-empty --trim-lines --no-add-prefix --no-add-suffix --no-add-line-numbers --prefix-text 'Hello world
Hello world
TypeScript' --suffix-text 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: update-separator-preview: 原工具没有产生可输出的结果，请检查参数

### text/text-randomizer

文本随机化工具：文本随机打乱

来源：`html-tools/tools/text/text-randomizer.html`，SHA-256：`3dc99f9affc3e957e1165dded1829d1c5acccc593205b5dfa8b365da0bd8ef26`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `randomize` | 随机化 | output |
| `reverse` | 反转顺序 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | textarea | "" |  |
| `--mode` | 输入文本 | radio | "lines" | "lines" (随机行顺序); "words" (随机单词顺序); "chars" (随机字符顺序); "wordChars" (保持单词位置，打乱单词内字符) |

已检查示例：

```bash
html-tools text/text-randomizer randomize --input 'Hello world
Hello world
TypeScript' --mode 'lines' --json
```

### text/text-repeat

文本重复工具：将文本重复指定次数，支持自定义分隔符

来源：`html-tools/tools/text/text-repeat.html`，SHA-256：`556d47db8361730c3eacf9159eb6a6b68cbac01ed7512cea978694c6304d1b4b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `repeat-text` | 🔁 重复文本 | output, totalChars, totalLines, totalSize |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | textarea | "Hello World" |  |
| `--count` | 重复次数 | number | "5" | min=1, max=10000 |
| `--separator` | 分隔符 | select-one | "\\n" | "\\n" (换行); " " (空格); ", " (逗号); "" (无分隔符); "custom" (自定义) |
| `--custom-sep` | 自定义分隔符 | text | "" |  |

已检查示例：

```bash
html-tools text/text-repeat repeat-text --input 'Hello World' --count '5' --separator '\n' --custom-sep 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### text/text-reverse

文本翻转工具：文本翻转工具，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/text-reverse.html`，SHA-256：`6906e4251c3f225e333b91e86bb396a8e2029de1ce54123e4b03fb15cec353e8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `process-text` | 反转 | output, charCount, wordCount, lineCount |
| `run` | 按字段输入重新计算 | output, charCount, wordCount, lineCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | textarea | "Hello World\n你好世界\nThis is a test." |  |

已检查示例：

```bash
html-tools text/text-reverse process-text --input 'Hello World
你好世界
This is a test.' --json
```

操作限制：部分原页面操作未通过迁移检查: char: 原工具没有产生可输出的结果，请检查参数 | word: 原工具没有产生可输出的结果，请检查参数 | line: 原工具没有产生可输出的结果，请检查参数 | sentence: 原工具没有产生可输出的结果，请检查参数

### text/text-similarity

文本相似度计算：文本相似度计算，快速计算结果，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/text-similarity.html`，SHA-256：`4d8c8c12539cd7b0939290c72ecb3774339c27afb2fea0b436d6ae444385e697`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 📐 计算相似度 | cosineSim, jaccardSim, editDist, editDistPercent, lcsSim, statsGrid, diffView |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-a` | 文本 A | textarea | "" |  |
| `--text-b` | 文本 B | textarea | "" |  |

已检查示例：

```bash
html-tools text/text-similarity calculate --text-a 'Hello world
Hello world
TypeScript' --text-b 'Hello world
Hello world
TypeScript' --json
```

### text/text-sort

文本排序：按字母、数字、长度等方式排序文本行

来源：`html-tools/tools/text/text-sort.html`，SHA-256：`0dcbdc6dc19b7c4cd527a9110bb6b161e6f478bb22df5495a18ed06a2db22b1e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `sort` | 排序 | output |
| `sort-lines` | sortLines | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--sort-type` | 排序方式 | select-one | "alpha" | "alpha" (字母顺序); "alpha-desc" (字母倒序); "numeric" (数字顺序); "numeric-desc" (数字倒序); "length" (长度升序); "length-desc" (长度降序); "random" (随机排序); "reverse" (反转顺序) |
| `--ignore-case` / `--no-ignore-case` | 忽略大小写 | checkbox | false |  |
| `--trim-lines` / `--no-trim-lines` | 去除首尾空白 | checkbox | true |  |
| `--ignore-empty` / `--no-ignore-empty` | 忽略空行 | checkbox | true |  |
| `--input` | 输入文本 | textarea | "" |  |

已检查示例：

```bash
html-tools text/text-sort sort --sort-type 'alpha' --no-ignore-case --trim-lines --ignore-empty --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: update-input-count: 原工具没有产生可输出的结果，请检查参数 | update-output-count: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### text/text-splitter

文本分割器：文本分割器，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/text-splitter.html`，SHA-256：`b3f07bf37fd7db0431b923813e3054096ae48670297e51b0ce35675d01c3306f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `split-text` | 分割文本 | output, resultsCount, resultsList, originalLength, segmentCount, avgLength, maxLength, minLength |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--delimiter` | 分隔符 | select-one | "," | "," (逗号 (,)); ";" (分号 (;)); "\|" (竖线 (\|)); " " (空格); "\\t" (Tab制表符); "\\n" (换行符); "custom" (自定义) |
| `--custom-delimiter` | 自定义分隔符 | text | "" |  |
| `--split-length` | 每段长度 | number | "100" | min=1 |
| `--split-lines` | 每段行数 | number | "10" | min=1 |
| `--split-regex` | 正则表达式 | text | "" |  |
| `--split-count` | 分割份数 | number | "2" | min=2 |
| `--output-format` | 输出格式 | select-one | "list" | "list" (分段列表); "newline" (换行分隔); "json" (JSON数组); "numbered" (带序号) |
| `--input` | 输入文本 | textarea | "" |  |

已检查示例：

```bash
html-tools text/text-splitter split-text --delimiter ',' --custom-delimiter 'Hello world
Hello world
TypeScript' --split-length '100' --split-lines '10' --split-regex '\w+' --split-count '2' --output-format 'list' --input 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: delimiter: 原工具没有产生可输出的结果，请检查参数 | length: 原工具没有产生可输出的结果，请检查参数 | lines: 原工具没有产生可输出的结果，请检查参数 | regex: 原工具没有产生可输出的结果，请检查参数 | count: 原工具没有产生可输出的结果，请检查参数 | run: 原工具没有产生可输出的结果，请检查参数

### text/text-stats

文本统计增强版：文本统计分析

来源：`html-tools/tools/text/text-stats.html`，SHA-256：`615565a5cbe2b74576336548a1308a6cf2a8c35a5ff6d2db56a46ca015149790`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | 分析文本 | statsGrid, wordFrequency, readTime, avgSentence, readability, readabilityGrade |
| `analyze-text` | analyzeText | statsGrid, wordFrequency, readTime, avgSentence, readability, readabilityGrade |
| `run` | 按字段输入重新计算 | statsGrid, wordFrequency, readTime, avgSentence, readability, readabilityGrade |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | textarea | "" |  |

已检查示例：

```bash
html-tools text/text-stats analyze --input 'Hello world
Hello world
TypeScript' --json
```

### text/text-to-binary

文本二进制转换器：文本与二进制、十六进制、八进制等格式互转

来源：`html-tools/tools/text/text-to-binary.html`，SHA-256：`8e2fff0b2084314f2e57db9737fddd319dc4551d3235e593b8e608745ace6328`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | → | outputText |
| `run` | 按字段输入重新计算 | outputText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--output-format` | 输出格式: | select-one | "binary" | "binary" (二进制 (Binary)); "hex" (十六进制 (Hex)); "octal" (八进制 (Octal)); "decimal" (十进制 (Decimal)) |
| `--separator` | 分隔符: | select-one | "space" | "space" (空格); "none" (无); "comma" (逗号); "newline" (换行) |
| `--show-prefix` / `--no-show-prefix` | 显示前缀 (0b/0x/0o) | checkbox | false |  |
| `--input-text` | 输入文本... | textarea | "Hello World" |  |

已检查示例：

```bash
html-tools text/text-to-binary convert --output-format 'binary' --separator 'space' --no-show-prefix --input-text 'Hello World' --json
```

### text/text-truncate

文本截断工具：按字符、单词或句子截断文本

来源：`html-tools/tools/text/text-truncate.html`，SHA-256：`fd2971ce198f056a8a9125e2423135b8b0a34e414750eb7df08c5d37e74f485a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `truncate-text` | ✂️ 截断 | preview, originalLen, truncatedLen, removedLen |
| `run` | 按字段输入重新计算 | preview, originalLen, truncatedLen, removedLen |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | textarea | "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." |  |
| `--mode` | 截断方式 | select-one | "char" | "char" (按字符); "word" (按单词); "line" (按行) |
| `--limit` | 截断位置 | number | "50" | min=1 |
| `--ellipsis` | 省略符号 | select-one | "..." | "..." (...); "…" (…); " [更多]" ([更多]); "" (无); "custom" (自定义) |
| `--custom-ellipsis` | 自定义省略符 | text | "" |  |

已检查示例：

```bash
html-tools text/text-truncate truncate-text --input 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' --mode 'char' --limit '50' --ellipsis '...' --custom-ellipsis '192.168.1.1' --json
```

### text/whitespace-cleaner

空白字符清理：清理多余空白、空行、行首尾空格

来源：`html-tools/tools/text/whitespace-cleaner.html`，SHA-256：`1f01aa5f15c6ddffea616f3c024c53f4d5a4bb7e967aaead142a73a5b0fae99c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `trim-lines` | 去除行首尾空白 " hello " → "hello" | outputInfo, output, statOriginal, statCleaned, statReduced |
| `collapse-spaces` | 合并多余空格 "a b" → "a b" | outputInfo, output, statOriginal, statCleaned, statReduced |
| `collapse-empty-lines` | 合并连续空行 多个空行 → 一个空行 | outputInfo, output, statOriginal, statCleaned, statReduced |
| `tabs-to-spaces` | Tab 转空格 Tab → 4个空格 | outputInfo, output, statOriginal, statCleaned, statReduced |
| `spaces-to-tabs` | 空格转 Tab 4个空格 → Tab | outputInfo, output, statOriginal, statCleaned, statReduced |
| `normalize-unicode` | 规范化 Unicode 空格 全角空格/NBSP → 普通空格 | outputInfo, output, statOriginal, statCleaned, statReduced |
| `clean-all` | 一键全部清理 应用所有常用清理 | outputInfo, output, statOriginal, statCleaned, statReduced |
| `update-input-info` | updateInputInfo | inputInfo |
| `update-output-info` | updateOutputInfo | outputInfo |
| `run` | 按字段输入重新计算 | inputInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | textarea | "" |  |

已检查示例：

```bash
html-tools text/whitespace-cleaner trim-lines --input 'Hello world
Hello world
TypeScript' --json
```

### text/word-counter

字数统计：统计字符、单词、句子、段落数量

来源：`html-tools/tools/text/word-counter.html`，SHA-256：`8dc0ede94557931b03a89d19761332077aa7291a227ec1cd40abc36678958796`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | chars, charsNoSpace, words, cjk, lines, paragraphs, sentences, readTime |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text` | 在此输入或粘贴文本，下方实时显示统计结果…… | textarea | "" |  |

已检查示例：

```bash
html-tools text/word-counter run --text 'Hello world
Hello world
TypeScript' --json
```

### text/word-frequency

词频统计：统计文本中单词出现的频率

来源：`html-tools/tools/text/word-frequency.html`，SHA-256：`d1c2697ac4e821f8540c12047e14ef82c282788acd1f224229509396744f151c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | analyze | charCount, wordCount, uniqueCount, sentenceCount, wordList, wordCloud |
| `run` | 按字段输入重新计算 | charCount, wordCount, uniqueCount, sentenceCount, wordList, wordCloud |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-input` | 区分大小写 | textarea | "人工智能是计算机科学的一个分支，它企图了解智能的实质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器。人工智能研究包括机器人、语言识别、图像识别、自然语言处理和专家系统等。人工智能从诞生以来，理论和技术日益成熟，应用领域也不断扩大。人工智能可以对人的意识、思维的信息过程进行模拟。" |  |
| `--case-sensitive` / `--no-case-sensitive` | 区分大小写 | checkbox | false |  |
| `--ignore-numbers` / `--no-ignore-numbers` | 忽略数字 | checkbox | false |  |
| `--ignore-short` / `--no-ignore-short` | 忽略单字 | checkbox | true |  |
| `--sort-by` | sortBy | select-one | "count" | "count" (按频率); "alpha" (按字母); "length" (按长度) |

已检查示例：

```bash
html-tools text/word-frequency analyze --text-input '人工智能是计算机科学的一个分支，它企图了解智能的实质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器。人工智能研究包括机器人、语言识别、图像识别、自然语言处理和专家系统等。人工智能从诞生以来，理论和技术日益成熟，应用领域也不断扩大。人工智能可以对人的意识、思维的信息过程进行模拟。' --no-case-sensitive --no-ignore-numbers --ignore-short --sort-by 'count' --json
```

### text/duplicate-remover

去除重复行：在线去除文本重复行，支持忽略大小写、空行等选项

来源：`html-tools/tools/text/duplicate-remover.html`，SHA-256：`149c5bda7314a1f40165051e61cd39d57d2d64bad6a329aa0dce7f257f3de187`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | outputText, originalCount, uniqueCount, removedCount, duplicateRate |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--ignore-case` / `--no-ignore-case` | 忽略大小写 | checkbox | false |  |
| `--trim-whitespace` / `--no-trim-whitespace` | 去除首尾空格 | checkbox | true |  |
| `--remove-empty` / `--no-remove-empty` | 移除空行 | checkbox | true |  |
| `--sort-output` / `--no-sort-output` | 排序结果 | checkbox | false |  |
| `--input-text` | 在此粘贴包含重复行的文本... | textarea | "" |  |

已检查示例：

```bash
html-tools text/duplicate-remover run --no-ignore-case --trim-whitespace --remove-empty --no-sort-output --input-text 'Hello world
Hello world
TypeScript' --json
```

### text/upside-down-text

倒置文字生成器：生成上下颠倒的文字效果，支持镜像翻转

来源：`html-tools/tools/text/upside-down-text.html`，SHA-256：`a0b05cd5ed667434ed3c1097bd12cbfbf65f94d1b5db90a243c951880e4e54ad`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | previewText, outputText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-text` | 输入要转换的文字... | textarea | "" |  |

已检查示例：

```bash
html-tools text/upside-down-text run --input-text 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: flip: 原工具没有产生可输出的结果，请检查参数 | reverse: 原工具没有产生可输出的结果，请检查参数 | both: 原工具没有产生可输出的结果，请检查参数

### text/divider

分隔线生成器：分隔线生成器，一键在线生成，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/divider.html`，SHA-256：`8d23100e61d8e54764f89d472b0d0c26c4c9f762e2b13f35cbef44f28757d706`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-dividers` | 生成分隔线 | output |
| `generate-single-line` | generateSingleLine | value |
| `update-preview` | updatePreview | preview |
| `run` | 按字段输入重新计算 | preview |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--char-input` | 分隔符字符 | text | "-" |  |
| `--length-input` | 长度（字符数） | number | "50" | min=1, max=200 |
| `--repeat-input` | 重复行数 | number | "1" | min=1, max=20 |
| `--text-input` | 中间文字（可选） | text | "" |  |
| `--text-position` | 文字位置 居中 居左 居右 | select-one | "center" | "center" (居中); "left" (居左); "right" (居右) |
| `--add-space` / `--no-add-space` | 文字两侧加空格 | checkbox | false |  |
| `--add-brackets` / `--no-add-brackets` | 文字加括号 | checkbox | false |  |
| `--double-layer` / `--no-double-layer` | 双层边框 | checkbox | false |  |

已检查示例：

```bash
html-tools text/divider generate-dividers --char-input '-' --length-input '50' --repeat-input '1' --text-input 'Hello world
Hello world
TypeScript' --text-position 'center' --no-add-space --no-add-brackets --no-double-layer --json
```

### text/lorem-ipsum

Lorem Ipsum 生成器：Lorem Ipsum 生成器，一键在线生成，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/lorem-ipsum.html`，SHA-256：`9f891658585f9d39ea0ee65e784e4004777e9437924cd140d80c86de77e517b4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成文本 | output, charCount, wordCount, paraCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--type` | 类型 | select-one | "paragraphs" | "paragraphs" (段落); "sentences" (句子); "words" (单词) |
| `--count` | 数量 | number | "3" | min=1, max=100 |
| `--lang` | 语言 | select-one | "latin" | "latin" (拉丁文); "chinese" (中文); "mixed" (中英混合) |

已检查示例：

```bash
html-tools text/lorem-ipsum generate --type 'paragraphs' --count '3' --lang 'latin' --json
```

### text/pinyin

汉字转拼音：汉字转拼音，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/pinyin.html`，SHA-256：`3e5c7f12e1846459452b4ef8bb6cfdfe84bcf92cb0d99e11f23e1480ce891c7f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `plain` | 纯拼音 | output, hanziCount, pinyinCount, totalCount |
| `ruby` | 注音模式 | output, hanziCount, pinyinCount, totalCount |
| `mixed` | 拼音+汉字 | output, hanziCount, pinyinCount, totalCount |
| `convert` | convert | output, hanziCount, pinyinCount, totalCount |
| `run` | 按字段输入重新计算 | output, hanziCount, pinyinCount, totalCount |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 请输入要转换的汉字，如：我爱北京天安门 | textarea | "我爱北京天安门" |  |
| `--tone-type` | toneType | select-one | "symbol" | "symbol" (音调符号 (pīn yīn)); "num" (数字声调 (pin1 yin1)); "none" (无声调 (pin yin)) |
| `--output-type` | outputType | select-one | "pinyin" | "pinyin" (完整拼音); "initial" (声母); "final" (韵母); "first" (首字母) |
| `--separator` | separator | select-one | " " | " " (空格); "" (无分隔); "-" (连字符 -); "'" (单引号 ') |
| `--multiple` | multiple | select-one | "false" | "false" (智能多音字); "true" (显示所有读音) |

已检查示例：

```bash
html-tools text/pinyin plain --input '我爱北京天安门' --tone-type 'symbol' --output-type 'pinyin' --separator ' ' --multiple 'false' --json
```

### text/typing-test

打字速度测试：打字速度测试，在线验证，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/typing-test.html`，SHA-256：`35eb72ffb2535e643daeab9dbd4837c8b88410e000dcabe76db640ebad1e2d26`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-live-stats` | updateLiveStats | live-wpm, live-cpm, live-accuracy, live-errors |
| `update-history-list` | updateHistoryList | history-list |
| `run` | 按字段输入重新计算 | live-wpm, live-cpm, live-accuracy, live-errors, timer, sample-text |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--text-type` | 文本类型: 中文 英文 中英混合 代码 自定义 | select-one | "chinese" | "chinese" (中文); "english" (英文); "mixed" (中英混合); "code" (代码); "custom" (自定义) |
| `--test-duration` | 测试时长: 30秒 60秒 120秒 5分钟 | select-one | "60" | "30" (30秒); "60" (60秒); "120" (120秒); "300" (5分钟) |
| `--show-keyboard` / `--no-show-keyboard` | 键盘提示 | checkbox | false |  |
| `--typing-input` | 点击此处开始打字... | text | "" |  |

已检查示例：

```bash
html-tools text/typing-test update-live-stats --text-type 'chinese' --test-duration '60' --no-show-keyboard --typing-input 'Hello world
Hello world
TypeScript' --json
```

### text/lorem-generator

Lorem生成器：生成Lorem占位文本

来源：`html-tools/tools/text/lorem-generator.html`，SHA-256：`bd4c6dd46417567b7a7e5549e5bf9d584c31bc1fa3b45d34d38cabe74577d0ab`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate` | 生成 | output |
| `generate-sentence` | generateSentence | value |
| `generate-paragraph` | generateParagraph | value |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--type` | 类型 | select-one | "paragraphs" | "paragraphs" (段落); "sentences" (句子); "words" (单词) |
| `--count` | 数量 | number | "3" | min=1, max=100 |

已检查示例：

```bash
html-tools text/lorem-generator generate --type 'paragraphs' --count '3' --json
```

### text/slug-generator

Slug Generator：Slug Generator，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/slug-generator.html`，SHA-256：`33809605300ca19d7a347985cd5097324c47a0a4a1e66ca834154f9b50880a17`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-slug` | generateSlug | output |
| `run` | 按字段输入重新计算 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | text | "Hello World! 这是一个测试" |  |
| `--lowercase` / `--no-lowercase` | 小写 | checkbox | true |  |
| `--remove-chinese` / `--no-remove-chinese` | 移除中文 | checkbox | false |  |
| `--max-length` / `--no-max-length` | 限制长度 | checkbox | false |  |
| `--separator` | 分隔符 | select-one | "-" | "-" (连字符 (-)); "_" (下划线 (_)); "." (点 (.)); "" (无) |

已检查示例：

```bash
html-tools text/slug-generator generate-slug --input 'Hello World! 这是一个测试' --lowercase --no-remove-chinese --no-max-length --separator '-' --json
```

### text/text-case-converter

Text Case Converter：Text Case Converter，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/text-case-converter.html`，SHA-256：`d5e16da8bf5c9cb968dda6d5f823312b4b9ba8d1a409d9eee90eb84b7cd505ac`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert-upper` | 全部大写 | output |
| `convert-lower` | 全部小写 | output |
| `convert-title` | 标题格式 | output |
| `convert-sentence` | 句首大写 | output |
| `convert-camel` | 驼峰命名 | output |
| `convert-pascal` | 帕斯卡 | output |
| `convert-snake` | 蛇形命名 | output |
| `convert-kebab` | 短横线 | output |
| `convert-constant` | 常量格式 | output |
| `convert-dot` | 点分格式 | output |
| `convert-toggle` | 大小写切换 | output |
| `convert-random` | 随机大小写 | output |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | textarea | "Hello World, This Is A Test." |  |

已检查示例：

```bash
html-tools text/text-case-converter convert-upper --input 'Hello World, This Is A Test.' --json
```

### text/text-statistics

Text Statistics：Text Statistics，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/text-statistics.html`，SHA-256：`a108b5eebede40233e8ba40fe1e18838854b40d165c9566ddbc9515a5bff868e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `analyze` | analyze | chars, words, sentences, paragraphs, charsNoSpace, chinese, letters, numbers, spaces, punctuation, readTime, speakTime, avgWordLen, lines |
| `run` | 按字段输入重新计算 | chars, words, sentences, paragraphs, charsNoSpace, chinese, letters, numbers, spaces, punctuation, readTime, speakTime, avgWordLen, lines |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 在此输入或粘贴文本... | textarea | "这是一段示例文本。This is sample text. 用于测试文本统计功能。\n\n包含多个段落、中英文字符、数字123和标点符号！" |  |

已检查示例：

```bash
html-tools text/text-statistics analyze --input '这是一段示例文本。This is sample text. 用于测试文本统计功能。

包含多个段落、中英文字符、数字123和标点符号！' --json
```

### text/unicode-converter

Unicode Converter：Unicode Converter，在线使用，文本工具，浏览器本地运行无需上传

来源：`html-tools/tools/text/unicode-converter.html`，SHA-256：`1a110d822c12554584c90195945865b28fe1dc7f31a76025ca8b341953bcca7f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | unicodeEscape, htmlEntity, hexCodes, decCodes, charGrid |
| `run` | 按字段输入重新计算 | unicodeEscape, htmlEntity, hexCodes, decCodes, charGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input` | 输入文本 | textarea | "Hello 你好 🎉" |  |

已检查示例：

```bash
html-tools text/unicode-converter convert --input 'Hello 你好 🎉' --json
```

### text/vigenere-cipher

Vigenère 密码工具：使用 Vigenère 多字母替换密码对文本进行加密和解密，支持显示加密表格，兼容大小写和中文。

来源：`html-tools/tools/text/vigenere-cipher.html`，SHA-256：`94bbf5feb76f48a80b3410fbd84e7bf28be8eb1d7468d85ab7c84412b6e2111d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `encrypt` | 加密 | outputText, statLetters, statKeyLen, statTotal |
| `decrypt` | 解密 | outputText, statLetters, statKeyLen, statTotal |
| `build-table` | buildTable | vigenereTable |
| `run` | 按字段输入重新计算 | keyInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--key-input` | 输入英文密钥，如 SECRET | text | "" |  |
| `--mode-select` | modeSelect | select-one | "encrypt" | "encrypt" (加密（明文 → 密文）); "decrypt" (解密（密文 → 明文）) |
| `--preserve-case` / `--no-preserve-case` | 保留大小写 | checkbox | true |  |
| `--skip-non-alpha` / `--no-skip-non-alpha` | 跳过非字母字符（含中文） | checkbox | true |  |
| `--input-text` | 在此输入明文（加密）或密文（解密）... | textarea | "" |  |

已检查示例：

```bash
html-tools text/vigenere-cipher encrypt --key-input 'Hello world
Hello world
TypeScript' --mode-select 'encrypt' --preserve-case --skip-non-alpha --input-text 'Hello world
Hello world
TypeScript' --json
```

### text/text-readability-analyzer

文本可读性分析器：计算英文文本的 Flesch-Kincaid、Gunning Fog、SMOG 等可读性指数，指出平均句长、音节数和阅读年级。

来源：`html-tools/tools/text/text-readability-analyzer.html`，SHA-256：`78d75074c4ffabf2e3e08dccd9b8b1f3c2912f98fbe5aad7bc43221b984d6462`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-word-count` | updateWordCount | wordCountLabel |
| `run` | 按字段输入重新计算 | wordCountLabel |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-text` | 在此粘贴英文文本，建议 100 词以上以获得准确结果... | textarea | "" |  |

已检查示例：

```bash
html-tools text/text-readability-analyzer update-word-count --input-text 'Hello world
Hello world
TypeScript' --json
```

操作限制：部分原页面操作未通过迁移检查: analyze: 文本太短，建议至少 10 个单词

### text/anagram-solver

变位词求解器：输入一组字母，找出所有可能的英文变位词（Anagram）组合，支持按长度过滤，内嵌常用词典。

来源：`html-tools/tools/text/anagram-solver.html`，SHA-256：`6c0153a58a6b56a657c8ea6e2415617a4995d5f69134ee8c4782005a0539960e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `solve` | 求解 | letterTiles, resultsCount, resultsGrid |
| `run` | 按字段输入重新计算 | letterInput, letterTiles |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--letter-input` | 输入字母，如 LISTEN... | text | "" |  |
| `--min-len` | minLen | select-one | "3" | "2" (2+); "3" (3+); "4" (4+); "5" (5+); "6" (6+) |
| `--sort-mode` | sortMode | select-one | "length-desc" | "length-desc" (长度 (长→短)); "length-asc" (长度 (短→长)); "alpha" (字母顺序); "count" (数量 (多→少)) |
| `--exact-only` / `--no-exact-only` | 仅完整变位词 | checkbox | false |  |

已检查示例：

```bash
html-tools text/anagram-solver solve --letter-input 'Hello world
Hello world
TypeScript' --min-len '3' --sort-mode 'length-desc' --no-exact-only --json
```

## time

### time/chinese-calendar

农历日历：农历日历，在线使用，时间工具，浏览器本地运行无需上传

来源：`html-tools/tools/time/chinese-calendar.html`，SHA-256：`aa30d29268322af4f6e13cab28ddd8abf85f2a88e9085a0c3a8fda87c799aa19`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | currentMonth, daysGrid, detail |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools time/chinese-calendar render  --json
```

### time/countdown-event

纪念日倒计时：管理重要日期和纪念日，支持每年重复提醒

来源：`html-tools/tools/time/countdown-event.html`，SHA-256：`7ae798bc6a4b63216150c8d0aa7fe56c9579af79219ee753647330c0782063ce`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | eventsGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools time/countdown-event render  --json
```

### time/cron-parser

Cron 表达式解析：解析 Cron 表达式，展示可读描述和下次执行时间

来源：`html-tools/tools/time/cron-parser.html`，SHA-256：`8dfbdc6dba4395b933b0d7426c78bebeea6284c10db16ccea77319169599ba9e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `parse` | 解析 | f-min, f-hour, f-day, f-month, f-dow, f-sec, description, nextRuns |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--cron-input` | Cron 表达式 (5 或 6 个字段) | text | "0 0 * * *" |  |

已检查示例：

```bash
html-tools time/cron-parser parse --cron-input '0 0 * * *' --json
```

### time/date-calculator

日期计算器：计算日期差异、日期推算、工作日统计

来源：`html-tools/tools/time/date-calculator.html`，SHA-256：`b3b0979506db49089159ab8488719d7fb0635e0c1921e09ba7f089f966bc3a94`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate-diff` | 计算 | diffDays, diffWeeks, diffMonths, diffYears, diffDetail |
| `calculate-add` | 计算 | addDetail |
| `calculate-workdays` | 计算工作日 | workDays, weekendDays, totalDays |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--diff-start` | 开始日期 | date | "2026-10-30" |  |
| `--diff-end` | 结束日期 | date | "2026-10-30" |  |
| `--add-start` | 起始日期 | date | "2026-10-30" |  |
| `--add-days` | 天数 | number | "30" |  |
| `--work-start` | 开始日期 | date | "2026-10-30" |  |
| `--work-end` | 结束日期 | date | "2026-10-30" |  |

已检查示例：

```bash
html-tools time/date-calculator calculate-diff --diff-start '2026-10-30' --diff-end '2026-10-30' --add-start '2026-10-30' --add-days '30' --work-start '2026-10-30' --work-end '2026-10-30' --json
```

### time/meeting-scheduler

跨时区会议时间协调器：跨时区会议时间协调器，在线使用，时间工具，浏览器本地运行无需上传

来源：`html-tools/tools/time/meeting-scheduler.html`，SHA-256：`84ab13d2beafcf350fb3ff1d9af784d02d5f0bdaa1df2298302ebaf2f4e5a161`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-grid-btn` | 更新时间网格 | timeGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--participant-name` | 参与者名称 | text | "" |  |
| `--participant-timezone` | participantTimezone | select-one | "Asia/Singapore" | "Asia/Shanghai" (中国 - 北京/上海 (UTC+8)); "Asia/Hong_Kong" (中国 - 香港 (UTC+8)); "Asia/Taipei" (中国 - 台北 (UTC+8)); "Asia/Tokyo" (日本 - 东京 (UTC+9)); "Asia/Seoul" (韩国 - 首尔 (UTC+9)); "Asia/Singapore" (新加坡 (UTC+8)); "Asia/Bangkok" (泰国 - 曼谷 (UTC+7)); "Asia/Dubai" (阿联酋 - 迪拜 (UTC+4)); "Asia/Kolkata" (印度 - 孟买 (UTC+5:30)); "Europe/London" (英国 - 伦敦 (UTC+0/+1)); "Europe/Paris" (法国 - 巴黎 (UTC+1/+2)); "Europe/Berlin" (德国 - 柏林 (UTC+1/+2)); "Europe/Moscow" (俄罗斯 - 莫斯科 (UTC+3)); "America/New_York" (美国 - 纽约 (UTC-5/-4)); "America/Chicago" (美国 - 芝加哥 (UTC-6/-5)); "America/Denver" (美国 - 丹佛 (UTC-7/-6)); "America/Los_Angeles" (美国 - 洛杉矶 (UTC-8/-7)); "America/Sao_Paulo" (巴西 - 圣保罗 (UTC-3)); "Australia/Sydney" (澳大利亚 - 悉尼 (UTC+10/+11)); "Australia/Melbourne" (澳大利亚 - 墨尔本 (UTC+10/+11)); "Pacific/Auckland" (新西兰 - 奥克兰 (UTC+12/+13)) |
| `--work-start` | 开始: | time | "09:00" |  |
| `--work-end` | 结束: | time | "18:00" |  |

已检查示例：

```bash
html-tools time/meeting-scheduler update-grid-btn --participant-name '192.168.1.1' --participant-timezone 'Asia/Singapore' --work-start '09:00' --work-end '18:00' --json
```

### time/stopwatch

秒表计时器：在线秒表，支持计次、暂停、毫秒精度显示

来源：`html-tools/tools/time/stopwatch.html`，SHA-256：`7b28ff9d2cf160e7a72e6f98ecf52bd1ba51400481a01c4c98b9fb2d8cfd95f1`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-display` | updateDisplay | display |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools time/stopwatch update-display  --json
```

### time/timestamp

时间戳转换：时间戳与日期互转，支持多种格式和时区

来源：`html-tools/tools/time/timestamp.html`，SHA-256：`01b5fce27f6e71414009e7dcf61eb019130c7d760768cece0cbdd0ff48d360e6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert-date` | 转换 | resultSeconds, resultMillis |
| `update-current-time` | updateCurrentTime | currentTimestamp, currentDate |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--ts-input` | 输入时间戳 | text | "" |  |
| `--ts-unit` | tsUnit | select-one | "ms" | "s" (秒 (s)); "ms" (毫秒 (ms)) |
| `--date-input` | 选择日期时间 | datetime-local | "2026-10-30T11:37:54.000" |  |

已检查示例：

```bash
html-tools time/timestamp convert-date --ts-input 'Hello world
Hello world
TypeScript' --ts-unit 'ms' --date-input '2026-10-30T11:37:54.000' --json
```

操作限制：部分原页面操作未通过迁移检查: convert-ts: 无效的时间戳 | convert-timestamp: 无效的时间戳

### time/timezone-converter

时区转换器：在不同时区之间转换时间

来源：`html-tools/tools/time/timezone-converter.html`，SHA-256：`25956e6a4614d14faec4199a5cf77bfd52c5b4270de76bc86876c86627634f6e`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert-time` | 转换 | timezoneGrid |
| `update-current-time` | updateCurrentTime | currentTime |
| `run` | 按字段输入重新计算 | timezoneGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--input-time` | inputTime | datetime-local | "2026-10-30T11:37" |  |
| `--source-timezone` | sourceTimezone | select-one | "Asia/Singapore" | "Pacific/Honolulu" (檀香山 (UTC-10)); "America/Anchorage" (安克雷奇 (UTC-9)); "America/Los_Angeles" (洛杉矶 (UTC-8)); "America/Denver" (丹佛 (UTC-7)); "America/Chicago" (芝加哥 (UTC-6)); "America/New_York" (纽约 (UTC-5)); "America/Sao_Paulo" (圣保罗 (UTC-3)); "Atlantic/Reykjavik" (雷克雅未克 (UTC+0)); "Europe/London" (伦敦 (UTC+0)); "Europe/Paris" (巴黎 (UTC+1)); "Europe/Berlin" (柏林 (UTC+1)); "Europe/Moscow" (莫斯科 (UTC+3)); "Asia/Dubai" (迪拜 (UTC+4)); "Asia/Kolkata" (孟买 (UTC+5.5)); "Asia/Bangkok" (曼谷 (UTC+7)); "Asia/Singapore" (新加坡 (UTC+8)); "Asia/Shanghai" (北京/上海 (UTC+8)); "Asia/Hong_Kong" (香港 (UTC+8)); "Asia/Taipei" (台北 (UTC+8)); "Asia/Tokyo" (东京 (UTC+9)); "Asia/Seoul" (首尔 (UTC+9)); "Australia/Sydney" (悉尼 (UTC+11)); "Pacific/Auckland" (奥克兰 (UTC+13)); "UTC" (UTC (UTC+0)) |
| `--add-timezone-select` | addTimezoneSelect | select-one | "Pacific/Honolulu" | "Pacific/Honolulu" (檀香山 (UTC-10)); "America/Anchorage" (安克雷奇 (UTC-9)); "America/Los_Angeles" (洛杉矶 (UTC-8)); "America/Denver" (丹佛 (UTC-7)); "America/Chicago" (芝加哥 (UTC-6)); "America/New_York" (纽约 (UTC-5)); "America/Sao_Paulo" (圣保罗 (UTC-3)); "Atlantic/Reykjavik" (雷克雅未克 (UTC+0)); "Europe/London" (伦敦 (UTC+0)); "Europe/Paris" (巴黎 (UTC+1)); "Europe/Berlin" (柏林 (UTC+1)); "Europe/Moscow" (莫斯科 (UTC+3)); "Asia/Dubai" (迪拜 (UTC+4)); "Asia/Kolkata" (孟买 (UTC+5.5)); "Asia/Bangkok" (曼谷 (UTC+7)); "Asia/Singapore" (新加坡 (UTC+8)); "Asia/Shanghai" (北京/上海 (UTC+8)); "Asia/Hong_Kong" (香港 (UTC+8)); "Asia/Taipei" (台北 (UTC+8)); "Asia/Tokyo" (东京 (UTC+9)); "Asia/Seoul" (首尔 (UTC+9)); "Australia/Sydney" (悉尼 (UTC+11)); "Pacific/Auckland" (奥克兰 (UTC+13)); "UTC" (UTC (UTC+0)) |

已检查示例：

```bash
html-tools time/timezone-converter convert-time --input-time '2026-10-30T11:37' --source-timezone 'Asia/Singapore' --add-timezone-select 'Pacific/Honolulu' --json
```

### time/work-hours

工时计算器：计算工作时长、加班时间和薪资估算

来源：`html-tools/tools/time/work-hours.html`，SHA-256：`09c0a28c69f38b3c5bdbff749125b0437f36b7e839666025d2cc146ad727a826`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | totalHours, netHours, overtimeHours, dailySalary, hourlySalary, overtimePay, totalDailyPay, weeklyHours, monthlyHours, weeklyOvertime, monthlyOvertime |
| `run` | 按字段输入重新计算 | totalHours, netHours, overtimeHours, dailySalary, hourlySalary, overtimePay, totalDailyPay, weeklyHours, monthlyHours, weeklyOvertime, monthlyOvertime |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--start-time` | 上班时间 | time | "09:00" |  |
| `--end-time` | 下班时间 | time | "18:00" |  |
| `--break-time` | 午休时长 | number | "60" | min=0, max=180 |
| `--monthly-salary` | 月薪 | number | "10000" | min=0 |
| `--work-days` | 每月工作日 | number | "22" | min=1, max=31 |
| `--overtime-rate` | 加班工资倍率 | number | "1.5" | min=1, max=3 |
| `--week-days` | 每周工作天数 | number | "5" | min=1, max=7 |

已检查示例：

```bash
html-tools time/work-hours calculate --start-time '09:00' --end-time '18:00' --break-time '60' --monthly-salary '10000' --work-days '22' --overtime-rate '1.5' --week-days '5' --json
```

### time/world-clock

世界时钟：世界时钟，在线使用，时间工具，浏览器本地运行无需上传

来源：`html-tools/tools/time/world-clock.html`，SHA-256：`f54310346d4532ddab85d762061218c50e5ab910dd676977418a323271b209f6`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-time` | updateTime | localTime, localDate, time-America-New_York, date-America-New_York, diff-America-New_York, time-Europe-London, date-Europe-London, diff-Europe-London, time-Asia-Tokyo, date-Asia-Tokyo, diff-Asia-Tokyo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--tz-select` | tzSelect | select-one | "America/New_York" | "America/New_York" (纽约 (America/New_York)); "America/Los_Angeles" (洛杉矶 (America/Los_Angeles)); "America/Chicago" (芝加哥 (America/Chicago)); "Europe/London" (伦敦 (Europe/London)); "Europe/Paris" (巴黎 (Europe/Paris)); "Europe/Berlin" (柏林 (Europe/Berlin)); "Europe/Moscow" (莫斯科 (Europe/Moscow)); "Asia/Tokyo" (东京 (Asia/Tokyo)); "Asia/Shanghai" (上海 (Asia/Shanghai)); "Asia/Hong_Kong" (香港 (Asia/Hong_Kong)); "Asia/Singapore" (新加坡 (Asia/Singapore)); "Asia/Seoul" (首尔 (Asia/Seoul)); "Asia/Dubai" (迪拜 (Asia/Dubai)); "Asia/Kolkata" (孟买 (Asia/Kolkata)); "Australia/Sydney" (悉尼 (Australia/Sydney)); "Pacific/Auckland" (奥克兰 (Pacific/Auckland)) |

已检查示例：

```bash
html-tools time/world-clock update-time --tz-select 'America/New_York' --json
```

### time/new-year-countdown

新年倒计时：精致美观的新年倒计时页面，支持主题切换与分享链接

来源：`html-tools/tools/time/new-year-countdown.html`，SHA-256：`64971ef00f8d12a91719c8b6a7473ef63a8774fb41a9f2b8ee09b669b75e2f24`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | targetYearText, tzText, targetAt, days, hours, minutes, seconds, milliseconds, subtitle |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--year-select` | yearSelect | select-one | "2026" | "2026" (2026); "2027" (2027); "2028" (2028); "2029" (2029); "2030" (2030); "2031" (2031); "2032" (2032); "2033" (2033); "2034" (2034) |

已检查示例：

```bash
html-tools time/new-year-countdown run --year-select '2026' --json
```

操作限制：部分原页面操作未通过迁移检查: test-celebration: 原工具没有产生可输出的结果，请检查参数

## travel

### travel/packing-list

旅行打包清单：智能旅行打包清单，按目的地和天数生成

来源：`html-tools/tools/travel/packing-list.html`，SHA-256：`9b673763c7c4efb838f30040f0408cb230a4e072fdee9e2b29ab167a11e9b4cd`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `generate-list` | 生成清单 | totalItems, packedItems, progressPercent, checklist |
| `update-stats` | updateStats | totalItems, packedItems, progressPercent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--trip-type` | 旅行类型 | select-one | "leisure" | "business" (商务出差); "leisure" (休闲度假); "beach" (海滩度假); "hiking" (徒步露营); "winter" (冬季滑雪); "city" (城市观光) |
| `--trip-days` | 旅行天数 | select-one | "4-7" | "1-3" (1-3天); "4-7" (4-7天); "8-14" (8-14天); "15+" (15天以上) |
| `--climate` | 目的地气候 | select-one | "warm" | "hot" (炎热); "warm" (温暖); "cool" (凉爽); "cold" (寒冷) |
| `--new-item` | 添加自定义物品... | text | "" |  |

已检查示例：

```bash
html-tools travel/packing-list generate-list --trip-type 'leisure' --trip-days '4-7' --climate 'warm' --new-item 'Hello world
Hello world
TypeScript' --json
```

### travel/jet-lag-calc

时差倒时差计算：计算跨时区旅行的时差影响

来源：`html-tools/tools/travel/jet-lag-calc.html`，SHA-256：`552fc9c1c18b4118e4d67e71d13f2a64e23e010fa660ee85767c5a0722f4ed96`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | calculate | fromCityName, fromTime, fromDate, toCityName, toTime, toDate, timeDiff, diffDirection, tipsList |
| `run` | 按字段输入重新计算 | fromCityName, fromTime, fromDate, toCityName, toTime, toDate, timeDiff, diffDirection, tipsList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--from-city` | 出发地 | select-one | "Asia/Shanghai" | "Asia/Shanghai" (北京/上海 (UTC+8)); "Asia/Tokyo" (东京 (UTC+9)); "Asia/Seoul" (首尔 (UTC+9)); "Asia/Singapore" (新加坡 (UTC+8)); "Asia/Hong_Kong" (香港 (UTC+8)); "Asia/Bangkok" (曼谷 (UTC+7)); "Asia/Dubai" (迪拜 (UTC+4)); "Europe/London" (伦敦 (UTC+0/+1)); "Europe/Paris" (巴黎 (UTC+1/+2)); "Europe/Berlin" (柏林 (UTC+1/+2)); "America/New_York" (纽约 (UTC-5/-4)); "America/Los_Angeles" (洛杉矶 (UTC-8/-7)); "America/Chicago" (芝加哥 (UTC-6/-5)); "Australia/Sydney" (悉尼 (UTC+10/+11)); "Pacific/Auckland" (奥克兰 (UTC+12/+13)) |
| `--to-city` | 目的地 | select-one | "America/New_York" | "America/New_York" (纽约 (UTC-5/-4)); "America/Los_Angeles" (洛杉矶 (UTC-8/-7)); "America/Chicago" (芝加哥 (UTC-6/-5)); "Europe/London" (伦敦 (UTC+0/+1)); "Europe/Paris" (巴黎 (UTC+1/+2)); "Europe/Berlin" (柏林 (UTC+1/+2)); "Asia/Shanghai" (北京/上海 (UTC+8)); "Asia/Tokyo" (东京 (UTC+9)); "Asia/Seoul" (首尔 (UTC+9)); "Asia/Singapore" (新加坡 (UTC+8)); "Asia/Hong_Kong" (香港 (UTC+8)); "Asia/Bangkok" (曼谷 (UTC+7)); "Asia/Dubai" (迪拜 (UTC+4)); "Australia/Sydney" (悉尼 (UTC+10/+11)); "Pacific/Auckland" (奥克兰 (UTC+12/+13)) |

已检查示例：

```bash
html-tools travel/jet-lag-calc calculate --from-city 'Asia/Shanghai' --to-city 'America/New_York' --json
```

### travel/travel-budget

旅行预算计算：规划和追踪旅行预算支出

来源：`html-tools/tools/travel/travel-budget.html`，SHA-256：`7e130bd9c829b752830afea2b25a7dfdec5b39a473463493954f567d83df47f0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | budgetList, totalBudget, perPerson, perDay, perPersonDay, chartContainer, tips |
| `calculate` | calculate | totalBudget, perPerson, perDay, perPersonDay, chartContainer, tips |
| `run` | 按字段输入重新计算 | totalBudget, perPerson, perDay, perPersonDay, chartContainer, tips |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--days` | 出行天数 | number | "5" | min=1, max=365 |
| `--people` | 出行人数 | number | "2" | min=1, max=20 |
| `--currency` | 货币单位 | select-one | "¥" | "¥" (人民币 (¥)); "$" (美元 ($)); "€" (欧元 (€)); "£" (英镑 (£)); "¥" (日元 (¥)) |
| `--budget-name` | 货币单位 | text | "交通费用" |  |
| `--budget-input` | 货币单位 | number | "2000" | min=0 |
| `--budget-name-2` | 货币单位 | text | "住宿费用" |  |
| `--budget-input-2` | 货币单位 | number | "1500" | min=0 |
| `--budget-name-3` | 货币单位 | text | "餐饮费用" |  |
| `--budget-input-3` | 货币单位 | number | "800" | min=0 |
| `--budget-name-4` | 货币单位 | text | "景点门票" |  |
| `--budget-input-4` | 货币单位 | number | "500" | min=0 |
| `--budget-name-5` | 货币单位 | text | "购物预算" |  |
| `--budget-input-5` | 货币单位 | number | "1000" | min=0 |
| `--budget-name-6` | 货币单位 | text | "当地交通" |  |
| `--budget-input-6` | 货币单位 | number | "300" | min=0 |

已检查示例：

```bash
html-tools travel/travel-budget render --days '5' --people '2' --currency '¥' --budget-name '交通费用' --budget-input '2000' --budget-name-2 '住宿费用' --budget-input-2 '1500' --budget-name-3 '餐饮费用' --budget-input-3 '800' --budget-name-4 '景点门票' --budget-input-4 '500' --budget-name-5 '购物预算' --budget-input-5 '1000' --budget-name-6 '当地交通' --budget-input-6 '300' --json
```

### travel/currency-tips

货币兑换提示：实时汇率查询和换汇建议

来源：`html-tools/tools/travel/currency-tips.html`，SHA-256：`67cab1379de1ecefbc8544e89dcaccb716fcd49ca8c255faa5a1256a115c4583`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-countries` | filterCountries | countryList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools travel/currency-tips filter-countries  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### automotive/fuel-cost

油费计算器：计算行车油费和油耗

来源：`html-tools/tools/automotive/fuel-cost.html`，SHA-256：`fc621038098c760caa72de50962a933904504fdcd3729cfb392784a4237648e7`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate-trip` | calculateTrip | tripCost, tripFuel, tripPerKm |
| `calculate-monthly` | calculateMonthly | monthlyCost, yearlyCost, monthlyFuel, yearlyFuel |
| `calculate-compare` | calculateCompare | comparisonContent |
| `run` | 按字段输入重新计算 | tripCost, tripFuel, tripPerKm, monthlyCost, yearlyCost, monthlyFuel, yearlyFuel, comparisonContent |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--trip-distance` | 行驶距离 (km) | number | "100" | min=0 |
| `--trip-consumption` | 油耗 (L/100km) | number | "7" | min=0 |
| `--trip-price` | 油价 (元/L) | number | "7.5" | min=0 |
| `--monthly-distance` | 月行驶里程 (km) | number | "1000" | min=0 |
| `--monthly-consumption` | 油耗 (L/100km) | number | "7" | min=0 |
| `--monthly-price` | 油价 (元/L) | number | "7.5" | min=0 |
| `--compare-distance` | 月行驶里程 (km) | number | "1000" | min=0 |
| `--compare-price` | 油价 (元/L) | number | "7.5" | min=0 |

已检查示例：

```bash
html-tools automotive/fuel-cost calculate-trip --trip-distance '100' --trip-consumption '7' --trip-price '7.5' --monthly-distance '1000' --monthly-consumption '7' --monthly-price '7.5' --compare-distance '1000' --compare-price '7.5' --json
```

### travel/visa-requirements

签证要求查询：查询不同国家的签证要求和入境政策

来源：`html-tools/tools/travel/visa-requirements.html`，SHA-256：`6b83c1407a9959b081312e7e898173afdb15afb13b0d105153b007103e92f252`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `check-visa` | checkVisa | visaIcon, visaTitle, visaSubtitle, stayDuration, entryRequirements, passportValidity, noticeText |
| `run` | 按字段输入重新计算 | visaIcon, visaTitle, visaSubtitle, stayDuration, entryRequirements, passportValidity, noticeText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--passport-country` | 您的护照国籍 | select-one | "" | "" (-- 选择国籍 --); "CN" (中国 🇨🇳); "US" (美国 🇺🇸); "GB" (英国 🇬🇧); "JP" (日本 🇯🇵); "KR" (韩国 🇰🇷); "SG" (新加坡 🇸🇬); "AU" (澳大利亚 🇦🇺); "CA" (加拿大 🇨🇦); "DE" (德国 🇩🇪); "FR" (法国 🇫🇷) |
| `--destination` | 目的地国家 | select-one | "" | "" (-- 选择目的地 --); "TH" (泰国); "JP" (日本); "KR" (韩国); "SG" (新加坡); "MY" (马来西亚); "VN" (越南); "ID" (印度尼西亚); "GB" (英国); "FR" (法国); "DE" (德国); "IT" (意大利); "ES" (西班牙); "US" (美国); "CA" (加拿大); "MX" (墨西哥); "BR" (巴西); "AU" (澳大利亚); "NZ" (新西兰) |

已检查示例：

```bash
html-tools travel/visa-requirements check-visa --passport-country 'CN' --destination 'TH' --json
```

### travel/emergency-contacts

紧急联系方式：旅行紧急联系信息

来源：`html-tools/tools/travel/emergency-contacts.html`，SHA-256：`5a1d73f2ada718ab2b4d7d869aaed635f0535cb6d3817d5e54fc2726a11da47f`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-result` | updateResult | countryFlag, countryName, emergencyNumbers, embassyInfo |
| `run` | 按字段输入重新计算 | countryFlag, countryName, emergencyNumbers, embassyInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--country-select` | 或从列表选择国家/地区 | select-one | "" | "" (-- 请选择国家/地区 --); "AR" (🇦🇷 阿根廷); "AE" (🇦🇪 阿联酋); "AZ" (🇦🇿 阿塞拜疆); "EG" (🇪🇬 埃及); "IE" (🇮🇪 爱尔兰); "AT" (🇦🇹 奥地利); "AU" (🇦🇺 澳大利亚); "PK" (🇵🇰 巴基斯坦); "BR" (🇧🇷 巴西); "BE" (🇧🇪 比利时); "PL" (🇵🇱 波兰); "DK" (🇩🇰 丹麦); "DE" (🇩🇪 德国); "RU" (🇷🇺 俄罗斯); "FR" (🇫🇷 法国); "PH" (🇵🇭 菲律宾); "FI" (🇫🇮 芬兰); "KZ" (🇰🇿 哈萨克斯坦); "KR" (🇰🇷 韩国); "NL" (🇳🇱 荷兰); "CA" (🇨🇦 加拿大); "KH" (🇰🇭 柬埔寨); "CZ" (🇨🇿 捷克); "LA" (🇱🇦 老挝); "MV" (🇲🇻 马尔代夫); "MY" (🇲🇾 马来西亚); "US" (🇺🇸 美国); "BD" (🇧🇩 孟加拉国); "MM" (🇲🇲 缅甸); "MX" (🇲🇽 墨西哥); "ZA" (🇿🇦 南非); "NP" (🇳🇵 尼泊尔); "NO" (🇳🇴 挪威); "PT" (🇵🇹 葡萄牙); "JP" (🇯🇵 日本); "SE" (🇸🇪 瑞典); "CH" (🇨🇭 瑞士); "SA" (🇸🇦 沙特阿拉伯); "LK" (🇱🇰 斯里兰卡); "TH" (🇹🇭 泰国); "TR" (🇹🇷 土耳其); "UA" (🇺🇦 乌克兰); "ES" (🇪🇸 西班牙); "GR" (🇬🇷 希腊); "SG" (🇸🇬 新加坡); "NZ" (🇳🇿 新西兰); "HU" (🇭🇺 匈牙利); "IL" (🇮🇱 以色列); "IT" (🇮🇹 意大利); "IN" (🇮🇳 印度); "ID" (🇮🇩 印度尼西亚); "GB" (🇬🇧 英国); "VN" (🇻🇳 越南); "CN" (🇨🇳 中国); "MO" (🇲🇴 中国澳门); "TW" (🇹🇼 中国台湾); "HK" (🇭🇰 中国香港) |

已检查示例：

```bash
html-tools travel/emergency-contacts update-result --country-select 'AR' --json
```

### travel/phrase-book

常用语手册：旅行常用外语短语

来源：`html-tools/tools/travel/phrase-book.html`，SHA-256：`62a4435a770e1228fb0d873417109eb6acd1044bafe94d9116e63e7016c8b37c`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | phraseList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--language-select` | languageSelect | select-one | "en" | "en" (🇬🇧 English 英语); "ja" (🇯🇵 日本語 日语); "ko" (🇰🇷 한국어 韩语); "fr" (🇫🇷 Français 法语); "de" (🇩🇪 Deutsch 德语); "es" (🇪🇸 Español 西班牙语); "it" (🇮🇹 Italiano 意大利语); "pt" (🇧🇷 Português 葡萄牙语); "th" (🇹🇭 ภาษาไทย 泰语); "vi" (🇻🇳 Tiếng Việt 越南语) |

已检查示例：

```bash
html-tools travel/phrase-book run --language-select 'en' --json
```

### travel/power-adapter

电源插座指南：各国电源插座类型

来源：`html-tools/tools/travel/power-adapter.html`，SHA-256：`8b3a4366d617dde696daa9b5994b223449cdacb761b6a86c9fb37be563c459f8`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | resultFlag, resultName, resultNameEn, resultVoltage, resultFrequency, resultPlugs, noteText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--country-select` | countrySelect | select-one | "" | "" (-- 请选择国家/地区 --); "AR" (🇦🇷 阿根廷 (Argentina)); "AE" (🇦🇪 阿联酋 (United Arab Emirates)); "EG" (🇪🇬 埃及 (Egypt)); "IE" (🇮🇪 爱尔兰 (Ireland)); "AT" (🇦🇹 奥地利 (Austria)); "AU" (🇦🇺 澳大利亚 (Australia)); "MO" (🇲🇴 澳门 (Macau)); "BR" (🇧🇷 巴西 (Brazil)); "BE" (🇧🇪 比利时 (Belgium)); "PL" (🇵🇱 波兰 (Poland)); "DK" (🇩🇰 丹麦 (Denmark)); "DE" (🇩🇪 德国 (Germany)); "RU" (🇷🇺 俄罗斯 (Russia)); "FR" (🇫🇷 法国 (France)); "PH" (🇵🇭 菲律宾 (Philippines)); "FI" (🇫🇮 芬兰 (Finland)); "KR" (🇰🇷 韩国 (South Korea)); "NL" (🇳🇱 荷兰 (Netherlands)); "CA" (🇨🇦 加拿大 (Canada)); "CZ" (🇨🇿 捷克 (Czech Republic)); "MY" (🇲🇾 马来西亚 (Malaysia)); "US" (🇺🇸 美国 (United States)); "MX" (🇲🇽 墨西哥 (Mexico)); "ZA" (🇿🇦 南非 (South Africa)); "NO" (🇳🇴 挪威 (Norway)); "PT" (🇵🇹 葡萄牙 (Portugal)); "JP" (🇯🇵 日本 (Japan)); "SE" (🇸🇪 瑞典 (Sweden)); "CH" (🇨🇭 瑞士 (Switzerland)); "SA" (🇸🇦 沙特阿拉伯 (Saudi Arabia)); "TW" (🇹🇼 台湾 (Taiwan)); "TH" (🇹🇭 泰国 (Thailand)); "TR" (🇹🇷 土耳其 (Turkey)); "ES" (🇪🇸 西班牙 (Spain)); "GR" (🇬🇷 希腊 (Greece)); "HK" (🇭🇰 香港 (Hong Kong)); "SG" (🇸🇬 新加坡 (Singapore)); "NZ" (🇳🇿 新西兰 (New Zealand)); "HU" (🇭🇺 匈牙利 (Hungary)); "IL" (🇮🇱 以色列 (Israel)); "IT" (🇮🇹 意大利 (Italy)); "IN" (🇮🇳 印度 (India)); "ID" (🇮🇩 印度尼西亚 (Indonesia)); "GB" (🇬🇧 英国 (United Kingdom)); "VN" (🇻🇳 越南 (Vietnam)); "CN" (🇨🇳 中国 (China)) |

已检查示例：

```bash
html-tools travel/power-adapter run --country-select 'AR' --json
```

### travel/driving-side

行车方向指南：各国驾驶方向查询

来源：`html-tools/tools/travel/driving-side.html`，SHA-256：`4cc04f8a0a081d7b59bfe43278e7a5b7824c9b2a00c9f6af25d56ee2bcb75471`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-stats` | updateStats | leftCount, rightCount |
| `update-result` | updateResult | countryFlag, countryName, sideIcon, sideText, laneLabel, steeringPosition |
| `run` | 按字段输入重新计算 | countryFlag, countryName, sideIcon, sideText, laneLabel, steeringPosition |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--country-select` | 搜索或选择国家 | select-one | "" | "" (-- 请选择国家 --); "DZ" (🇩🇿 阿尔及利亚); "AF" (🇦🇫 阿富汗); "AR" (🇦🇷 阿根廷); "AE" (🇦🇪 阿联酋); "OM" (🇴🇲 阿曼); "EG" (🇪🇬 埃及); "ET" (🇪🇹 埃塞俄比亚); "IE" (🇮🇪 爱尔兰); "EE" (🇪🇪 爱沙尼亚); "AO" (🇦🇴 安哥拉); "AG" (🇦🇬 安提瓜和巴布达); "AT" (🇦🇹 奥地利); "AU" (🇦🇺 澳大利亚); "BB" (🇧🇧 巴巴多斯); "PG" (🇵🇬 巴布亚新几内亚); "BS" (🇧🇸 巴哈马); "PK" (🇵🇰 巴基斯坦); "PY" (🇵🇾 巴拉圭); "BH" (🇧🇭 巴林); "PA" (🇵🇦 巴拿马); "BR" (🇧🇷 巴西); "BY" (🇧🇾 白俄罗斯); "BG" (🇧🇬 保加利亚); "BE" (🇧🇪 比利时); "IS" (🇮🇸 冰岛); "PL" (🇵🇱 波兰); "BO" (🇧🇴 玻利维亚); "BW" (🇧🇼 博茨瓦纳); "BT" (🇧🇹 不丹); "KP" (🇰🇵 朝鲜); "DK" (🇩🇰 丹麦); "DE" (🇩🇪 德国); "TL" (🇹🇱 东帝汶); "DO" (🇩🇴 多米尼加); "RU" (🇷🇺 俄罗斯); "EC" (🇪🇨 厄瓜多尔); "FR" (🇫🇷 法国); "PH" (🇵🇭 菲律宾); "FJ" (🇫🇯 斐济); "FI" (🇫🇮 芬兰); "CO" (🇨🇴 哥伦比亚); "CR" (🇨🇷 哥斯达黎加); "GD" (🇬🇩 格林纳达); "CU" (🇨🇺 古巴); "GY" (🇬🇾 圭亚那); "HT" (🇭🇹 海地); "KR" (🇰🇷 韩国); "NL" (🇳🇱 荷兰); "HN" (🇭🇳 洪都拉斯); "KI" (🇰🇮 基里巴斯); "CA" (🇨🇦 加拿大); "GH" (🇬🇭 加纳); "KH" (🇰🇭 柬埔寨); "CZ" (🇨🇿 捷克); "ZW" (🇿🇼 津巴布韦); "CM" (🇨🇲 喀麦隆); "QA" (🇶🇦 卡塔尔); "CI" (🇨🇮 科特迪瓦); "KW" (🇰🇼 科威特); "HR" (🇭🇷 克罗地亚); "KE" (🇰🇪 肯尼亚); "LV" (🇱🇻 拉脱维亚); "LS" (🇱🇸 莱索托); "LA" (🇱🇦 老挝); "LB" (🇱🇧 黎巴嫩); "LT" (🇱🇹 立陶宛); "LY" (🇱🇾 利比亚); "RO" (🇷🇴 罗马尼亚); "MV" (🇲🇻 马尔代夫); "MT" (🇲🇹 马耳他); "MW" (🇲🇼 马拉维); "MY" (🇲🇾 马来西亚); "MU" (🇲🇺 毛里求斯); "US" (🇺🇸 美国); "MN" (🇲🇳 蒙古); "BD" (🇧🇩 孟加拉国); "PE" (🇵🇪 秘鲁); "MM" (🇲🇲 缅甸); "MA" (🇲🇦 摩洛哥); "MZ" (🇲🇿 莫桑比克); "MX" (🇲🇽 墨西哥); "NA" (🇳🇦 纳米比亚); "ZA" (🇿🇦 南非); "NR" (🇳🇷 瑙鲁); "NI" (🇳🇮 尼加拉瓜); "NP" (🇳🇵 尼泊尔); "NG" (🇳🇬 尼日利亚); "NO" (🇳🇴 挪威); "PT" (🇵🇹 葡萄牙); "JP" (🇯🇵 日本); "SE" (🇸🇪 瑞典); "CH" (🇨🇭 瑞士); "SV" (🇸🇻 萨尔瓦多); "WS" (🇼🇸 萨摩亚); "RS" (🇷🇸 塞尔维亚); "SN" (🇸🇳 塞内加尔); "CY" (🇨🇾 塞浦路斯); "SC" (🇸🇨 塞舌尔); "SA" (🇸🇦 沙特阿拉伯); "KN" (🇰🇳 圣基茨和尼维斯); "LC" (🇱🇨 圣卢西亚); "VC" (🇻🇨 圣文森特和格林纳丁斯); "LK" (🇱🇰 斯里兰卡); "SK" (🇸🇰 斯洛伐克); "SI" (🇸🇮 斯洛文尼亚); "SZ" (🇸🇿 斯威士兰); "SD" (🇸🇩 苏丹); "SR" (🇸🇷 苏里南); "SB" (🇸🇧 所罗门群岛); "TH" (🇹🇭 泰国); "TZ" (🇹🇿 坦桑尼亚); "TO" (🇹🇴 汤加); "TT" (🇹🇹 特立尼达和多巴哥); "TN" (🇹🇳 突尼斯); "TR" (🇹🇷 土耳其); "GT" (🇬🇹 危地马拉); "VE" (🇻🇪 委内瑞拉); "BN" (🇧🇳 文莱); "UG" (🇺🇬 乌干达); "UA" (🇺🇦 乌克兰); "UY" (🇺🇾 乌拉圭); "ES" (🇪🇸 西班牙); "GR" (🇬🇷 希腊); "SG" (🇸🇬 新加坡); "NZ" (🇳🇿 新西兰); "HU" (🇭🇺 匈牙利); "JM" (🇯🇲 牙买加); "IQ" (🇮🇶 伊拉克); "IR" (🇮🇷 伊朗); "IL" (🇮🇱 以色列); "IT" (🇮🇹 意大利); "IN" (🇮🇳 印度); "ID" (🇮🇩 印度尼西亚); "GB" (🇬🇧 英国); "JO" (🇯🇴 约旦); "VN" (🇻🇳 越南); "ZM" (🇿🇲 赞比亚); "CL" (🇨🇱 智利); "CN" (🇨🇳 中国); "MO" (🇲🇴 中国澳门); "TW" (🇹🇼 中国台湾); "HK" (🇭🇰 中国香港) |

已检查示例：

```bash
html-tools travel/driving-side update-stats --country-select 'DZ' --json
```

### travel/passport-photo

证件照规格：各国证件照尺寸要求

来源：`html-tools/tools/travel/passport-photo.html`，SHA-256：`a1f8e4f6a70ffcbd2181c42361f878785a11f771b1b78114edb7dc26eaa22127`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-countries` | filterCountries | countryList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools travel/passport-photo filter-countries  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### travel/baggage-limit

行李限制查询：航空公司行李规定

来源：`html-tools/tools/travel/baggage-limit.html`，SHA-256：`a39d54e092b236e14352f428b41eb84ea5cd123d8aec41fb27fd1317766b0e24`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-airlines` | filterAirlines | airlinesGrid |
| `run` | 按字段输入重新计算 | airlinesGrid |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--cabin-select` | cabinSelect | select-one | "economy" | "economy" (经济舱); "business" (商务舱); "first" (头等舱) |

已检查示例：

```bash
html-tools travel/baggage-limit filter-airlines --cabin-select 'economy' --json
```

### travel/sim-card-guide

SIM 卡指南：旅行目的地 SIM 卡信息

来源：`html-tools/tools/travel/sim-card-guide.html`，SHA-256：`bcef992129cae4eb7c2a32d0e80aefd13df939bab5c92d9b57a1964fe34576ba`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-countries` | filterCountries | countryList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools travel/sim-card-guide filter-countries  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### travel/travel-checklist

旅行准备清单：出行前准备事项清单

来源：`html-tools/tools/travel/travel-checklist.html`，SHA-256：`3d5e2cd1d7c9e158e3b5532ae79dcc06812383702aafd7cd38e139be457a2257`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-progress` | updateProgress | progressText |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--new-item-input` | 输入物品名称... | text | "" |  |
| `--category-select` | categorySelect | select-one | "证件" | "证件" (证件); "电子设备" (电子设备); "衣物" (衣物); "洗漱用品" (洗漱用品); "药品" (药品); "其他" (其他) |

已检查示例：

```bash
html-tools travel/travel-checklist update-progress --new-item-input 'Hello world
Hello world
TypeScript' --category-select '证件' --json
```

### automotive/tire-pressure-calc

胎压转换：轮胎压力单位转换PSI/Bar/kPa

来源：`html-tools/tools/automotive/tire-pressure-calc.html`，SHA-256：`f596b0b246e0bd8bb685156a64b8ae6663c3e66d02968bee4e6abecca9597399`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | bar, kpa |
| `run` | 按字段输入重新计算 | bar, kpa |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--psi-input` | 输入胎压 (PSI) | number | "32" |  |

已检查示例：

```bash
html-tools automotive/tire-pressure-calc convert --psi-input '32' --json
```

### travel/currency-exchange

Currency Exchange：Currency Exchange，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/currency-exchange.html`，SHA-256：`707e61505c0545313be7988e5389fde03d5eb821b27336b01c1a33956eacf1d4`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | convert | resultAmount, rateInfo |
| `run` | 按字段输入重新计算 | resultAmount, rateInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--from-currency` | 源货币 | select-one | "CNY" | "USD" (USD - 美元); "CNY" (CNY - 人民币); "EUR" (EUR - 欧元); "GBP" (GBP - 英镑); "JPY" (JPY - 日元); "KRW" (KRW - 韩元); "HKD" (HKD - 港币); "TWD" (TWD - 新台币); "SGD" (SGD - 新加坡元); "AUD" (AUD - 澳元); "CAD" (CAD - 加元); "CHF" (CHF - 瑞士法郎); "THB" (THB - 泰铢); "MYR" (MYR - 马来西亚林吉特); "INR" (INR - 印度卢比); "RUB" (RUB - 俄罗斯卢布); "BRL" (BRL - 巴西雷亚尔); "MXN" (MXN - 墨西哥比索); "AED" (AED - 阿联酋迪拉姆); "NZD" (NZD - 新西兰元) |
| `--from-amount` | 金额 | number | "100" | min=0 |
| `--to-currency` | 目标货币 | select-one | "USD" | "USD" (USD - 美元); "CNY" (CNY - 人民币); "EUR" (EUR - 欧元); "GBP" (GBP - 英镑); "JPY" (JPY - 日元); "KRW" (KRW - 韩元); "HKD" (HKD - 港币); "TWD" (TWD - 新台币); "SGD" (SGD - 新加坡元); "AUD" (AUD - 澳元); "CAD" (CAD - 加元); "CHF" (CHF - 瑞士法郎); "THB" (THB - 泰铢); "MYR" (MYR - 马来西亚林吉特); "INR" (INR - 印度卢比); "RUB" (RUB - 俄罗斯卢布); "BRL" (BRL - 巴西雷亚尔); "MXN" (MXN - 墨西哥比索); "AED" (AED - 阿联酋迪拉姆); "NZD" (NZD - 新西兰元) |

已检查示例：

```bash
html-tools travel/currency-exchange convert --from-currency 'CNY' --from-amount '100' --to-currency 'USD' --json
```

### travel/distance-calculator

Distance Calculator：Distance Calculator，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/distance-calculator.html`，SHA-256：`8e457b935ecc71dac33b8b4bb9b1d3ce76e948246e89f6abbb79ad53709be8ca`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算距离 | resultKm, resultMiles, resultDetails |
| `run` | 按字段输入重新计算 | lat1, lon1, lat2, lon2 |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--city1` | 选择起点城市 | select-one | "" | "" (选择城市或输入坐标…); "北京" (北京); "上海" (上海); "广州" (广州); "深圳" (深圳); "香港" (香港); "台北" (台北); "东京" (东京); "首尔" (首尔); "新加坡" (新加坡); "曼谷" (曼谷); "悉尼" (悉尼); "纽约" (纽约); "洛杉矶" (洛杉矶); "旧金山" (旧金山); "伦敦" (伦敦); "巴黎" (巴黎); "柏林" (柏林); "莫斯科" (莫斯科); "迪拜" (迪拜); "开罗" (开罗) |
| `--lat1` | 起点纬度 | number | "" | min=-90, max=90 |
| `--lon1` | 起点经度 | number | "" | min=-180, max=180 |
| `--city2` | 选择终点城市 | select-one | "" | "" (选择城市或输入坐标…); "北京" (北京); "上海" (上海); "广州" (广州); "深圳" (深圳); "香港" (香港); "台北" (台北); "东京" (东京); "首尔" (首尔); "新加坡" (新加坡); "曼谷" (曼谷); "悉尼" (悉尼); "纽约" (纽约); "洛杉矶" (洛杉矶); "旧金山" (旧金山); "伦敦" (伦敦); "巴黎" (巴黎); "柏林" (柏林); "莫斯科" (莫斯科); "迪拜" (迪拜); "开罗" (开罗) |
| `--lat2` | 终点纬度 | number | "" | min=-90, max=90 |
| `--lon2` | 终点经度 | number | "" | min=-180, max=180 |

已检查示例：

```bash
html-tools travel/distance-calculator calculate --city1 '北京' --lat1 '10' --lon1 '10' --city2 '北京' --lat2 '10' --lon2 '10' --json
```

### travel/flight-time

Flight Time：Flight Time，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/flight-time.html`，SHA-256：`fe761799a11acfe2d11f6d5152c7de5667e0e4f9d09e0a4d923c4584e8402ae2`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算飞行时间 | resultTime, takeoffTime, cruiseTime, landingTime |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--from-city` | 出发城市 | select-one | "北京" | "北京" (北京); "上海" (上海); "广州" (广州); "深圳" (深圳); "香港" (香港); "台北" (台北); "东京" (东京); "首尔" (首尔); "新加坡" (新加坡); "曼谷" (曼谷); "悉尼" (悉尼); "纽约" (纽约); "洛杉矶" (洛杉矶); "旧金山" (旧金山); "伦敦" (伦敦); "巴黎" (巴黎); "迪拜" (迪拜) |
| `--to-city` | 到达城市 | select-one | "上海" | "北京" (北京); "上海" (上海); "广州" (广州); "深圳" (深圳); "香港" (香港); "台北" (台北); "东京" (东京); "首尔" (首尔); "新加坡" (新加坡); "曼谷" (曼谷); "悉尼" (悉尼); "纽约" (纽约); "洛杉矶" (洛杉矶); "旧金山" (旧金山); "伦敦" (伦敦); "巴黎" (巴黎); "迪拜" (迪拜) |
| `--distance-input` | 飞行距离 (公里) | number | "" | min=0 |

已检查示例：

```bash
html-tools travel/flight-time calculate --from-city '北京' --to-city '上海' --distance-input '10' --json
```

### travel/fuel-cost

Fuel Cost：Fuel Cost，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/fuel-cost.html`，SHA-256：`752fc3f97857b35499e0fee2a426837d695453e6e8f1df4bb2b5c71166b1b54a`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算油费 | totalCost, fuelNeeded, costPerKm |
| `run` | 按字段输入重新计算 | totalCost, fuelNeeded, costPerKm |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--distance` | 行驶距离（公里） | number | "" | min=0 |
| `--fuel-efficiency` | 油耗（升/100公里） | number | "" | min=0 |
| `--fuel-price` | 油价（元/升） | number | "" | min=0 |

已检查示例：

```bash
html-tools travel/fuel-cost calculate --distance '10' --fuel-efficiency '10' --fuel-price '10' --json
```

操作限制：部分原页面操作未通过迁移检查: update-preset-selection: 原工具没有产生可输出的结果，请检查参数

### travel/hotel-cost

Hotel Cost：Hotel Cost，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/hotel-cost.html`，SHA-256：`63f9ff6f42834319aefb465be7ca5977dc8690dbdffc45221cbcfcc82965abf0`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算总费用 | totalCost, subtotal, roomCount, taxAmount, avgPerNight, avgPerRoomPerNight |
| `run` | 按字段输入重新计算 | totalCost, subtotal, roomCount, taxAmount, avgPerNight, avgPerRoomPerNight |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--nights` | 入住晚数 | number | "1" | min=1 |
| `--price-per-night` | 每晚价格（元） | number | "" | min=0 |
| `--rooms` | 房间数量 | number | "1" | min=1 |
| `--tax-rate` | 税费比例（%） | number | "0" | min=0, max=100 |

已检查示例：

```bash
html-tools travel/hotel-cost calculate --nights '1' --price-per-night '10' --rooms '1' --tax-rate '0' --json
```

### travel/luggage-calculator

Luggage Calculator：Luggage Calculator，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/luggage-calculator.html`，SHA-256：`997165d9a764752a7a5e35dd27a7ab71c5614b13c4c0ab86b900f02114eb18aa`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-airline-limit` | updateAirlineLimit | limitBadge, progressLimit, summaryLimit, summaryUsed, summaryRemaining, summaryTotal |
| `update-summary` | updateSummary | progressLimit, summaryLimit, summaryUsed, summaryRemaining, summaryTotal |
| `run` | 按字段输入重新计算 | limitBadge, progressLimit, summaryLimit, summaryUsed, summaryRemaining, summaryTotal |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--airline-select` | 航空公司 | select-one | "23" | "23" (中国国航 (CA) - 23kg); "23" (中国东方航空 (MU) - 23kg); "23" (中国南方航空 (CZ) - 23kg); "20" (海南航空 (HU) - 20kg); "23" (厦门航空 (MF) - 23kg); "20" (深圳航空 (ZH) - 20kg); "20" (四川航空 (3U) - 20kg); "20" (山东航空 (SC) - 20kg); "15" (春秋航空 (9C) - 15kg); "10" (吉祥航空 (HO) - 10kg); "23" (国泰航空 (CX) - 23kg); "30" (阿联酋航空 (EK) - 30kg); "23" (新加坡航空 (SQ) - 23kg); "23" (全日空 (NH) - 23kg); "23" (日本航空 (JL) - 23kg); "23" (大韩航空 (KE) - 23kg); "23" (韩亚航空 (OZ) - 23kg); "23" (美国航空 (AA) - 23kg); "23" (美联航 (UA) - 23kg); "23" (达美航空 (DL) - 23kg); "23" (英国航空 (BA) - 23kg); "23" (法国航空 (AF) - 23kg); "23" (德国汉莎 (LH) - 23kg); "30" (卡塔尔航空 (QR) - 30kg); "30" (土耳其航空 (TK) - 30kg); "23" (澳洲航空 (QF) - 23kg); "7" (亚航 (AK) - 7kg (仅手提)); "custom" (自定义限额...) |
| `--custom-limit` | 自定义限额 (kg) | number | "23" | min=1, max=100 |
| `--item-name` | 物品名称 | text | "" |  |
| `--item-weight` | 重量 (kg) | number | "" | min=0.1 |

已检查示例：

```bash
html-tools travel/luggage-calculator update-airline-limit --airline-select '23' --custom-limit '23' --item-name 'Hello world
Hello world
TypeScript' --item-weight '10' --json
```

### travel/season-guide

Season Guide：Season Guide，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/season-guide.html`，SHA-256：`f49c6518fc551bbf364f52bfe8854262fd6fbfdfb3ca2df1c93d0c883c6c23ae`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `filter-destinations` | filterDestinations | destinationList |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |

已检查示例：

```bash
html-tools travel/season-guide filter-destinations  --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### travel/time-difference

Time Difference：Time Difference，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/time-difference.html`，SHA-256：`7dbfad741dd290c382361e48416058ce9814a491769acb54d4cce14643be47aa`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `convert` | 转换 | resultTime, resultDate, resultDiff |
| `run` | 按字段输入重新计算 | resultTime, resultDate, resultDiff |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--from-timezone` | 源时区 | select-one | "Asia/Singapore" | "Asia/Shanghai" (上海 (中国)); "Asia/Hong_Kong" (香港); "Asia/Tokyo" (东京 (日本)); "Asia/Seoul" (首尔 (韩国)); "Asia/Singapore" (新加坡); "Asia/Dubai" (迪拜 (阿联酋)); "Asia/Kolkata" (孟买 (印度)); "Asia/Bangkok" (曼谷 (泰国)); "Europe/London" (伦敦 (英国)); "Europe/Paris" (巴黎 (法国)); "Europe/Berlin" (柏林 (德国)); "Europe/Moscow" (莫斯科 (俄罗斯)); "America/New_York" (纽约 (美国东部)); "America/Los_Angeles" (洛杉矶 (美国西部)); "America/Chicago" (芝加哥 (美国中部)); "America/Toronto" (多伦多 (加拿大)); "America/Sao_Paulo" (圣保罗 (巴西)); "Australia/Sydney" (悉尼 (澳大利亚)); "Pacific/Auckland" (奥克兰 (新西兰)); "UTC" (UTC (协调世界时)) |
| `--from-datetime` | 日期时间 | datetime-local | "2026-10-30T11:38" |  |
| `--to-timezone` | 目标时区 | select-one | "America/New_York" | "Asia/Shanghai" (上海 (中国)); "Asia/Hong_Kong" (香港); "Asia/Tokyo" (东京 (日本)); "Asia/Seoul" (首尔 (韩国)); "Asia/Singapore" (新加坡); "Asia/Dubai" (迪拜 (阿联酋)); "Asia/Kolkata" (孟买 (印度)); "Asia/Bangkok" (曼谷 (泰国)); "Europe/London" (伦敦 (英国)); "Europe/Paris" (巴黎 (法国)); "Europe/Berlin" (柏林 (德国)); "Europe/Moscow" (莫斯科 (俄罗斯)); "America/New_York" (纽约 (美国东部)); "America/Los_Angeles" (洛杉矶 (美国西部)); "America/Chicago" (芝加哥 (美国中部)); "America/Toronto" (多伦多 (加拿大)); "America/Sao_Paulo" (圣保罗 (巴西)); "Australia/Sydney" (悉尼 (澳大利亚)); "Pacific/Auckland" (奥克兰 (新西兰)); "UTC" (UTC (协调世界时)) |

已检查示例：

```bash
html-tools travel/time-difference convert --from-timezone 'Asia/Singapore' --from-datetime '2026-10-30T11:38' --to-timezone 'America/New_York' --json
```

### travel/timezone-converter

Timezone Converter：Timezone Converter，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/timezone-converter.html`，SHA-256：`23b03a6d1fbd3005859dcc89df353a660d4a645c03c308841b6dab5d0cd01e3b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-local-time` | updateLocalTime | localTime, localDate |
| `convert-time` | convertTime | toTime, toDate |
| `run` | 按字段输入重新计算 | toTime, toDate |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--from-tz` | fromTz | select-one | "Asia/Shanghai" | "Asia/Shanghai" (中国 (UTC+8)); "America/New_York" (纽约 (UTC-5)); "America/Los_Angeles" (洛杉矶 (UTC-8)); "Europe/London" (伦敦 (UTC+0)); "Europe/Paris" (巴黎 (UTC+1)); "Asia/Tokyo" (东京 (UTC+9)); "Asia/Seoul" (首尔 (UTC+9)); "Asia/Dubai" (迪拜 (UTC+4)); "Australia/Sydney" (悉尼 (UTC+11)) |
| `--from-time` | fromTime | datetime-local | "2026-10-30T03:38" |  |
| `--to-tz` | toTz | select-one | "America/New_York" | "America/New_York" (纽约 (UTC-5)); "America/Los_Angeles" (洛杉矶 (UTC-8)); "Europe/London" (伦敦 (UTC+0)); "Europe/Paris" (巴黎 (UTC+1)); "Asia/Tokyo" (东京 (UTC+9)); "Asia/Seoul" (首尔 (UTC+9)); "Asia/Shanghai" (中国 (UTC+8)); "Asia/Dubai" (迪拜 (UTC+4)); "Australia/Sydney" (悉尼 (UTC+11)) |

已检查示例：

```bash
html-tools travel/timezone-converter update-local-time --from-tz 'Asia/Shanghai' --from-time '2026-10-30T03:38' --to-tz 'America/New_York' --json
```

### travel/tip-guide

Tip Guide：Tip Guide，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/tip-guide.html`，SHA-256：`2a34c46615a8dfe02a8038289369c78e73625c902d31e08a9a2a21a983e0e707`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate-tip` | calculateTip | resultBill, resultTip, resultTotal |
| `run` | 按字段输入重新计算 | tipCountry, tipExpectation, tipDetails, tipNote, resultBill, resultTip, resultTotal |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--country-select` | 国家/地区 | select-one | "美国" | "美国" (美国); "加拿大" (加拿大); "英国" (英国); "法国" (法国); "德国" (德国); "日本" (日本); "中国" (中国); "韩国" (韩国); "泰国" (泰国); "新加坡" (新加坡); "澳大利亚" (澳大利亚); "迪拜/阿联酋" (迪拜/阿联酋) |
| `--bill-amount` | 账单金额 | number | "" | min=0 |
| `--tip-percent` | 小费比例 | number | "15" | min=0, max=100 |

已检查示例：

```bash
html-tools travel/tip-guide calculate-tip --country-select '美国' --bill-amount '10' --tip-percent '15' --json
```

### travel/toll-calculator

Toll Calculator：Toll Calculator，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/toll-calculator.html`，SHA-256：`dd0b6cef7166adba2b2a97aad1e93d655be628f995af2493c60899fb5dc0a31d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 🧮 计算费用 | tollAmount, resultDistance, resultVehicle, resultRate |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--distance` | 距离 (公里) | number | "" | min=0 |

已检查示例：

```bash
html-tools travel/toll-calculator calculate --distance '10' --json
```

操作限制：部分原页面操作未通过迁移检查: run: 原工具没有产生可输出的结果，请检查参数

### travel/travel-insurance

Travel Insurance：Travel Insurance，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/travel-insurance.html`，SHA-256：`55f843ecffbd51cfac570063c07bc9d1cfa039754549f576a8337c471026eb8d`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `check-all` | 全选 | totalCoverage, checkedCount, estimatedPremium |
| `check-essential` | 仅选必备 | totalCoverage, checkedCount, estimatedPremium |
| `calculate` | calculate | item-medical, item-emergency, item-trip_cancel, item-trip_interrupt, item-baggage_loss, item-flight_delay, item-personal_liability, item-accident, item-dental, item-document_loss, item-rental_car, item-sports, totalCoverage, checkedCount, estimatedPremium |
| `update-summary` | updateSummary | totalCoverage, checkedCount, estimatedPremium |
| `run` | 按字段输入重新计算 | item-medical, item-emergency, item-trip_cancel, item-trip_interrupt, item-baggage_loss, item-flight_delay, item-personal_liability, item-accident, item-dental, item-document_loss, item-rental_car, item-sports, totalCoverage, checkedCount, estimatedPremium |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--duration` | 行程天数 | number | "7" | min=1, max=365 |
| `--trip-cost` | 行程总费用 (元) | number | "10000" | min=0 |
| `--destination` | 目的地类型 | select-one | "domestic" | "domestic" (国内); "asia" (亚洲); "europe" (欧洲/澳洲); "america" (美洲); "adventure" (探险/极限运动) |
| `--travelers` | 旅行人数 | number | "1" | min=1, max=20 |
| `--check-medical` / `--no-check-medical` | 医疗费用必备覆盖旅途中的突发疾病和意外伤害医疗费用建议保额: ¥50,000 | checkbox | false |  |
| `--check-emergency` / `--no-check-emergency` | 紧急医疗运送必备包括紧急转运、医疗遣返和遗体运送费用建议保额: ¥60,000 | checkbox | false |  |
| `--check-trip-cancel` / `--no-check-trip-cancel` | 行程取消推荐因不可预见的原因取消行程时的损失赔偿建议保额: ¥10,000 | checkbox | false |  |
| `--check-trip-interrupt` / `--no-check-trip-interrupt` | 行程中断推荐行程中因意外需要中断旅行的额外费用建议保额: ¥15,000 | checkbox | false |  |
| `--check-baggage-loss` / `--no-check-baggage-loss` | 行李丢失/延误推荐托运行李丢失或延误的赔偿建议保额: ¥2,500 | checkbox | false |  |
| `--check-flight-delay` / `--no-check-flight-delay` | 航班延误可选航班延误超过一定时间的补偿建议保额: ¥1,000 | checkbox | false |  |
| `--check-personal-liability` / `--no-check-personal-liability` | 个人责任推荐在旅途中意外造成他人人身伤害或财产损失的赔偿建议保额: ¥50,000 | checkbox | false |  |
| `--check-accident` / `--no-check-accident` | 意外身故/伤残必备因意外导致的身故或伤残赔偿建议保额: ¥250,000 | checkbox | false |  |
| `--check-dental` / `--no-check-dental` | 紧急牙科治疗可选旅途中突发牙科急症的治疗费用建议保额: ¥2,500 | checkbox | false |  |
| `--check-document-loss` / `--no-check-document-loss` | 证件遗失可选护照、签证等证件丢失的补办费用和相关损失建议保额: ¥600 | checkbox | false |  |
| `--check-rental-car` / `--no-check-rental-car` | 租车保险补充可选租车时的额外保险保障，包括车辆损坏和盗窃建议保额: ¥25,000 | checkbox | false |  |
| `--check-sports` / `--no-check-sports` | 高风险运动可选滑雪、潜水、攀岩等高风险运动的专项保障建议保额: ¥50,000 | checkbox | false |  |

已检查示例：

```bash
html-tools travel/travel-insurance check-all --duration '7' --trip-cost '10000' --destination 'domestic' --travelers '1' --no-check-medical --no-check-emergency --no-check-trip-cancel --no-check-trip-interrupt --no-check-baggage-loss --no-check-flight-delay --no-check-personal-liability --no-check-accident --no-check-dental --no-check-document-loss --no-check-rental-car --no-check-sports --json
```

### travel/trip-budget

Trip Budget：Trip Budget，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/trip-budget.html`，SHA-256：`8377cfe061818a6017ea3200ac5aab7e35f462087de477bdf55b45d3ab040351`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `update-ui` | updateUI | totalBudget, totalSpent, remaining, percentage, progressSpent, progressTotal, categoryBreakdown, expenseCount, expenseItems |
| `run` | 按字段输入重新计算 | totalBudget, totalSpent, remaining, percentage, progressSpent, progressTotal, categoryBreakdown, expenseCount, expenseItems |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--total-budget` | 总预算 | number | "" | min=0 |
| `--description` | 描述 | text | "" |  |
| `--amount` | 金额 | number | "" | min=0 |
| `--category` | 类别 | select-one | "flights" | "flights" (✈️ 机票); "hotel" (🏨 住宿); "food" (🍜 餐饮); "transport" (🚗 交通); "activities" (🎭 活动); "shopping" (🛍️ 购物); "other" (📦 其他) |

已检查示例：

```bash
html-tools travel/trip-budget update-ui --total-budget '10' --description '192.168.1.1' --amount '10' --category 'flights' --json
```

操作限制：部分原页面操作未通过迁移检查: calculate-totals: 原工具没有产生可输出的结果，请检查参数

### travel/visa-checker

Visa Checker：Visa Checker，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/visa-checker.html`，SHA-256：`a0d40e78dd0976fcd52c721fd186a2f6a4bbc0d19c11a1778bad58b875c7bdff`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `check-visa` | 🔍 查询签证要求 | fromCountry, toCountry, visaBadge, resultDetails, notesList |
| `calculate-stats` | calculateStats | statVisaFree, statVisaOnArrival, statEVisa, statVisaRequired |
| `run` | 按字段输入重新计算 | fromCountry, toCountry, visaBadge, resultDetails, notesList, statVisaFree, statVisaOnArrival, statEVisa, statVisaRequired |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--passport-country` | 护照签发国 | select-one | "CN" | "CN" (🇨🇳 中国 (China)); "HK" (🇭🇰 中国香港 (Hong Kong SAR)); "MO" (🇲🇴 中国澳门 (Macau SAR)); "TW" (🇹🇼 中国台湾 (Taiwan)) |
| `--destination-country` | 目的地国家/地区 | select-one | "" | "" (-- 请选择目的地 --); "AF" (🇦🇫 阿富汗 (Afghanistan)); "AE" (🇦🇪 阿联酋 (UAE)); "OM" (🇴🇲 阿曼 (Oman)); "AZ" (🇦🇿 阿塞拜疆 (Azerbaijan)); "PK" (🇵🇰 巴基斯坦 (Pakistan)); "BH" (🇧🇭 巴林 (Bahrain)); "BT" (🇧🇹 不丹 (Bhutan)); "KP" (🇰🇵 朝鲜 (North Korea)); "PH" (🇵🇭 菲律宾 (Philippines)); "GE" (🇬🇪 格鲁吉亚 (Georgia)); "KZ" (🇰🇿 哈萨克斯坦 (Kazakhstan)); "KR" (🇰🇷 韩国 (South Korea)); "KG" (🇰🇬 吉尔吉斯斯坦 (Kyrgyzstan)); "KH" (🇰🇭 柬埔寨 (Cambodia)); "QA" (🇶🇦 卡塔尔 (Qatar)); "KW" (🇰🇼 科威特 (Kuwait)); "LA" (🇱🇦 老挝 (Laos)); "MV" (🇲🇻 马尔代夫 (Maldives)); "MY" (🇲🇾 马来西亚 (Malaysia)); "BD" (🇧🇩 孟加拉国 (Bangladesh)); "MM" (🇲🇲 缅甸 (Myanmar)); "NP" (🇳🇵 尼泊尔 (Nepal)); "JP" (🇯🇵 日本 (Japan)); "SA" (🇸🇦 沙特阿拉伯 (Saudi Arabia)); "LK" (🇱🇰 斯里兰卡 (Sri Lanka)); "TJ" (🇹🇯 塔吉克斯坦 (Tajikistan)); "TH" (🇹🇭 泰国 (Thailand)); "TM" (🇹🇲 土库曼斯坦 (Turkmenistan)); "BN" (🇧🇳 文莱 (Brunei)); "UZ" (🇺🇿 乌兹别克斯坦 (Uzbekistan)); "SG" (🇸🇬 新加坡 (Singapore)); "SY" (🇸🇾 叙利亚 (Syria)); "AM" (🇦🇲 亚美尼亚 (Armenia)); "YE" (🇾🇪 也门 (Yemen)); "IQ" (🇮🇶 伊拉克 (Iraq)); "IR" (🇮🇷 伊朗 (Iran)); "IL" (🇮🇱 以色列 (Israel)); "IN" (🇮🇳 印度 (India)); "ID" (🇮🇩 印度尼西亚 (Indonesia)); "JO" (🇯🇴 约旦 (Jordan)); "VN" (🇻🇳 越南 (Vietnam)); "AL" (🇦🇱 阿尔巴尼亚 (Albania)); "IE" (🇮🇪 爱尔兰 (Ireland)); "AT" (🇦🇹 奥地利 (Austria)); "BY" (🇧🇾 白俄罗斯 (Belarus)); "BG" (🇧🇬 保加利亚 (Bulgaria)); "MK" (🇲🇰 北马其顿 (North Macedonia)); "BE" (🇧🇪 比利时 (Belgium)); "BA" (🇧🇦 波黑 (Bosnia)); "PL" (🇵🇱 波兰 (Poland)); "DK" (🇩🇰 丹麦 (Denmark)); "DE" (🇩🇪 德国 (Germany)); "RU" (🇷🇺 俄罗斯 (Russia)); "FR" (🇫🇷 法国 (France)); "FI" (🇫🇮 芬兰 (Finland)); "NL" (🇳🇱 荷兰 (Netherlands)); "ME" (🇲🇪 黑山 (Montenegro)); "CZ" (🇨🇿 捷克 (Czech Republic)); "HR" (🇭🇷 克罗地亚 (Croatia)); "RO" (🇷🇴 罗马尼亚 (Romania)); "NO" (🇳🇴 挪威 (Norway)); "PT" (🇵🇹 葡萄牙 (Portugal)); "SE" (🇸🇪 瑞典 (Sweden)); "CH" (🇨🇭 瑞士 (Switzerland)); "RS" (🇷🇸 塞尔维亚 (Serbia)); "TR" (🇹🇷 土耳其 (Turkey)); "UA" (🇺🇦 乌克兰 (Ukraine)); "ES" (🇪🇸 西班牙 (Spain)); "GR" (🇬🇷 希腊 (Greece)); "HU" (🇭🇺 匈牙利 (Hungary)); "IT" (🇮🇹 意大利 (Italy)); "GB" (🇬🇧 英国 (United Kingdom)); "AR" (🇦🇷 阿根廷 (Argentina)); "PA" (🇵🇦 巴拿马 (Panama)); "BR" (🇧🇷 巴西 (Brazil)); "EC" (🇪🇨 厄瓜多尔 (Ecuador)); "CO" (🇨🇴 哥伦比亚 (Colombia)); "CR" (🇨🇷 哥斯达黎加 (Costa Rica)); "CU" (🇨🇺 古巴 (Cuba)); "CA" (🇨🇦 加拿大 (Canada)); "US" (🇺🇸 美国 (United States)); "PE" (🇵🇪 秘鲁 (Peru)); "MX" (🇲🇽 墨西哥 (Mexico)); "CL" (🇨🇱 智利 (Chile)); "AU" (🇦🇺 澳大利亚 (Australia)); "PG" (🇵🇬 巴布亚新几内亚 (Papua New Guinea)); "FJ" (🇫🇯 斐济 (Fiji)); "WS" (🇼🇸 萨摩亚 (Samoa)); "TO" (🇹🇴 汤加 (Tonga)); "VU" (🇻🇺 瓦努阿图 (Vanuatu)); "NZ" (🇳🇿 新西兰 (New Zealand)); "DZ" (🇩🇿 阿尔及利亚 (Algeria)); "EG" (🇪🇬 埃及 (Egypt)); "ET" (🇪🇹 埃塞俄比亚 (Ethiopia)); "AO" (🇦🇴 安哥拉 (Angola)); "BW" (🇧🇼 博茨瓦纳 (Botswana)); "GH" (🇬🇭 加纳 (Ghana)); "ZW" (🇿🇼 津巴布韦 (Zimbabwe)); "CI" (🇨🇮 科特迪瓦 (Ivory Coast)); "KE" (🇰🇪 肯尼亚 (Kenya)); "RW" (🇷🇼 卢旺达 (Rwanda)); "MG" (🇲🇬 马达加斯加 (Madagascar)); "MU" (🇲🇺 毛里求斯 (Mauritius)); "MA" (🇲🇦 摩洛哥 (Morocco)); "NA" (🇳🇦 纳米比亚 (Namibia)); "ZA" (🇿🇦 南非 (South Africa)); "NG" (🇳🇬 尼日利亚 (Nigeria)); "SN" (🇸🇳 塞内加尔 (Senegal)); "SC" (🇸🇨 塞舌尔 (Seychelles)); "TZ" (🇹🇿 坦桑尼亚 (Tanzania)); "TN" (🇹🇳 突尼斯 (Tunisia)); "UG" (🇺🇬 乌干达 (Uganda)); "ZM" (🇿🇲 赞比亚 (Zambia)) |

已检查示例：

```bash
html-tools travel/visa-checker check-visa --passport-country 'CN' --destination-country 'AF' --json
```

### travel/weather-planner

Weather Planner：Weather Planner，在线使用，旅行工具，浏览器本地运行无需上传

来源：`html-tools/tools/travel/weather-planner.html`，SHA-256：`bbca5fd3f11153826b73fcd12c4d97c9467ba5fedfda4847fbd8097ce6f48582`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `run` | 按字段输入重新计算 | weatherTitle, weatherSummary, monthGrid, recommendation |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--destination` | 目的地 | select-one | "" | "" (请选择目的地...); "tokyo" (东京 - 日本); "bangkok" (曼谷 - 泰国); "paris" (巴黎 - 法国); "new_york" (纽约 - 美国); "sydney" (悉尼 - 澳大利亚); "dubai" (迪拜 - 阿联酋); "london" (伦敦 - 英国); "singapore" (新加坡 - 新加坡); "bali" (巴厘岛 - 印度尼西亚); "rome" (罗马 - 意大利); "maldives" (马尔代夫 - 马尔代夫) |
| `--month` | 旅行月份 | select-one | "9" | "0" (一月); "1" (二月); "2" (三月); "3" (四月); "4" (五月); "5" (六月); "6" (七月); "7" (八月); "8" (九月); "9" (十月); "10" (十一月); "11" (十二月) |

已检查示例：

```bash
html-tools travel/weather-planner run --destination 'tokyo' --month '9' --json
```

### automotive/fuel-calculator

油耗成本计算器：计算汽车油耗、行驶成本和燃油效率

来源：`html-tools/tools/automotive/fuel-calculator.html`，SHA-256：`708c5dafe28115a5ff14ceb1b57c9af79c683a2cea063798df19d439834c6882`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `calculate` | 计算 | consumption, mpg, totalCost, perKm, range, tankInfo |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--distance` | 行驶里程（公里） | number | "" |  |
| `--fuel` | 加油量（升） | number | "" |  |
| `--price` | 油价（元/升） | number | "7.5" |  |
| `--mode` | 计算方式 | select-one | "consumption" | "consumption" (计算油耗); "cost" (计算成本); "distance" (计算里程) |

已检查示例：

```bash
html-tools automotive/fuel-calculator calculate --distance '10' --fuel '10' --price '7.5' --mode 'consumption' --json
```

### travel/tide-chart-viewer

潮汐时刻查询：基于调和分析（Harmonic Analysis）在浏览器端计算主要港口/地点的潮高曲线，展示当日高低潮时刻和潮差。

来源：`html-tools/tools/travel/tide-chart-viewer.html`，SHA-256：`67a7f0898329c476d247c04df79c2a7144bba316107b48849198ddf28d76989b`。

操作：

| 操作 | 说明 | 样本输出字段 |
| --- | --- | --- |
| `render` | render | nowText, tideCanvas, extremesGrid, statRange, statMax, statMin |
| `run` | 按字段输入重新计算 | nowText, tideCanvas, extremesGrid, statRange, statMax, statMin |

参数：

| 参数 | 说明 | 类型 | 默认 | 可选值/范围 |
| --- | --- | --- | --- | --- |
| `--location-select` | locationSelect | select-one | "shanghai" | "shanghai" (上海（吴淞口）); "qingdao" (青岛); "tianjin" (天津（塘沽）); "guangzhou" (广州（黄埔）); "xiamen" (厦门); "hongkong" (香港); "tokyo" (东京（东京湾）); "singapore" (新加坡); "sydney" (悉尼); "london" (伦敦（泰晤士河口）); "newyork" (纽约（Battery Park）); "losangeles" (洛杉矶) |
| `--date-input` | dateInput | date | "2026-10-30" |  |
| `--unit-select` | unitSelect | select-one | "m" | "m" (米 (m)); "ft" (英尺 (ft)) |

已检查示例：

```bash
html-tools travel/tide-chart-viewer render --location-select 'shanghai' --date-input '2026-10-30' --unit-select 'm' --json
```

操作限制：部分原页面操作未通过迁移检查: build-location-select: 已计算 2 个高低潮
