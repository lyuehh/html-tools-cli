// @ts-nocheck
// Generated from tools/ai/token-counter.html
// Source SHA-256: 4351ed229ecbd3f8e456addf94e742c5130f3da6a984b216e853fc19080f3397
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Model pricing per million tokens
      const MODEL_PRICING = {
        "gpt-4o": { input: 2.5, output: 10.0 },
        "gpt-4-turbo": { input: 10.0, output: 30.0 },
        "gpt-4": { input: 30.0, output: 60.0 },
        "gpt-3.5-turbo": { input: 0.5, output: 1.5 },
        "claude-3.5-sonnet": { input: 3.0, output: 15.0 },
        "claude-3-opus": { input: 15.0, output: 75.0 },
        "claude-3-haiku": { input: 0.25, output: 1.25 },
        "deepseek-v3": { input: 0.27, output: 1.1 },
        "deepseek-r1": { input: 0.55, output: 2.19 },
        "gemini-2.0": { input: 0.1, output: 0.4 },
        "gemini-1.5-pro": { input: 1.25, output: 5.0 }
      };

      // Token estimation ratios (characters per token)
      const TOKEN_RATIOS = {
        "gpt-4o": { en: 4.0, zh: 1.5 },
        "gpt-4-turbo": { en: 4.0, zh: 1.5 },
        "gpt-4": { en: 4.0, zh: 1.5 },
        "gpt-3.5-turbo": { en: 4.0, zh: 1.5 },
        "claude-3.5-sonnet": { en: 4.0, zh: 1.8 },
        "claude-3-opus": { en: 4.0, zh: 1.8 },
        "claude-3-haiku": { en: 4.0, zh: 1.8 },
        "deepseek-v3": { en: 4.0, zh: 2.0 },
        "deepseek-r1": { en: 4.0, zh: 2.0 },
        "gemini-2.0": { en: 4.0, zh: 1.8 },
        "gemini-1.5-pro": { en: 4.0, zh: 1.8 }
      };

      // Theme handling
      function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const newTheme = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Estimate tokens based on character analysis
      function estimateTokens(text, model) {
        if (!text) return 0;

        const ratios = TOKEN_RATIOS[model] || TOKEN_RATIOS["gpt-4o"];

        // Count Chinese and non-Chinese characters
        const chineseChars = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
        const otherChars = text.length - chineseChars;

        // Estimate tokens
        const chineseTokens = chineseChars / ratios.zh;
        const otherTokens = otherChars / ratios.en;

        return Math.ceil(chineseTokens + otherTokens);
      }

      // Tokenize text for visualization (simplified)
      function tokenizeForVisualization(text) {
        const tokens = [];
        let current = "";

        for (let i = 0; i < text.length; i++) {
          const char = text[i];

          // Chinese character - each is roughly a token
          if (/[\u4e00-\u9fff\u3400-\u4dbf]/.test(char)) {
            if (current) {
              tokens.push(current);
              current = "";
            }
            tokens.push(char);
          }
          // Whitespace
          else if (/\s/.test(char)) {
            if (current) {
              tokens.push(current);
              current = "";
            }
            if (char === "\n") {
              tokens.push("⏎");
            }
          }
          // Punctuation
          else if (/[^\w]/.test(char)) {
            if (current) {
              tokens.push(current);
              current = "";
            }
            tokens.push(char);
          }
          // Regular characters
          else {
            current += char;
            // Split long words
            if (current.length >= 4) {
              tokens.push(current);
              current = "";
            }
          }
        }

        if (current) {
          tokens.push(current);
        }

        return tokens;
      }

      // Count tokens and update UI
      function countTokens() {
        const text = document.getElementById("inputText").value;
        const model = document.getElementById("modelSelect").value;

        // Basic stats
        const charCount = text.length;
        const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
        const lineCount = text ? text.split("\n").length : 0;

        // Token estimation
        const tokenCount = estimateTokens(text, model);
        const ratio = tokenCount > 0 ? (charCount / tokenCount).toFixed(1) : 0;

        // Update stats display
        document.getElementById("tokenCount").textContent = tokenCount.toLocaleString();
        document.getElementById("charCount").textContent = charCount.toLocaleString();
        document.getElementById("wordCount").textContent = wordCount.toLocaleString();
        document.getElementById("lineCount").textContent = lineCount.toLocaleString();
        document.getElementById("ratio").textContent = ratio;

        // Calculate costs
        const pricing = MODEL_PRICING[model];
        const inputCost = (tokenCount / 1000000) * pricing.input;
        const outputCost = ((tokenCount * 0.5) / 1000000) * pricing.output;
        const totalCost = inputCost + outputCost;

        document.getElementById("inputCost").textContent = "$" + inputCost.toFixed(6);
        document.getElementById("outputCost").textContent = "$" + outputCost.toFixed(6);
        document.getElementById("totalCost").textContent = "$" + totalCost.toFixed(6);

        // Token visualization
        if (text && text.length < 2000) {
          const tokens = tokenizeForVisualization(text);
          const display = document.getElementById("tokenDisplay");
          display.innerHTML = tokens
            .map(
              (t) => `<span class="token">${t.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`
            )
            .join("");
          document.getElementById("tokenVisualization").style.display = "block";
        } else {
          document.getElementById("tokenVisualization").style.display = "none";
        }
      }

      window.clearInput = function () {
        document.getElementById("inputText").value = "";
        countTokens();
      };

      window.loadSample = function () {
        const samples = [
          `你好，我是一个 AI 助手。今天我来帮你了解 Token 是什么。

Token 是大语言模型处理文本的基本单位。对于英文，一个 Token 大约是 4 个字符或 3/4 个单词。对于中文，一个汉字通常对应 1-2 个 Token。

Here's an example in English: "Hello, world!" might be tokenized as ["Hello", ",", " world", "!"].

费用计算公式: 总费用 = (输入Token × 输入单价) + (输出Token × 输出单价)`,

          `const calculateTokenCost = (tokens, model) => {
    const pricing = {
        'gpt-4o': { input: 2.50, output: 10.00 },
        'claude-3.5-sonnet': { input: 3.00, output: 15.00 },
        'deepseek-v3': { input: 0.27, output: 1.10 }
    };
    
    const price = pricing[model];
    return {
        inputCost: (tokens.input / 1000000) * price.input,
        outputCost: (tokens.output / 1000000) * price.output
    };
};`,

          `# API 请求示例

## Python
\`\`\`python
import openai

response = openai.ChatCompletion.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手"},
        {"role": "user", "content": "解释什么是 Token"}
    ]
)
\`\`\`

## 费用估算
- 输入: ~50 tokens × $2.50/1M = $0.000125
- 输出: ~200 tokens × $10.00/1M = $0.002
- 总计: ~$0.002125`
        ];

        document.getElementById("inputText").value =
          samples[Math.floor(Math.random() * samples.length)];
        countTokens();
      };

      window.pasteFromClipboard = async function () {
        try {
          const text = await navigator.clipboard.readText();
          document.getElementById("inputText").value = text;
          countTokens();
        } catch (err) {
          alert("无法访问剪贴板，请手动粘贴");
        }
      };

      // Auto-count on input
      document.getElementById("inputText").addEventListener("input", countTokens);

      // Initialize
      initTheme();
      countTokens();
    
