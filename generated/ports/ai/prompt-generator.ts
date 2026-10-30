// @ts-nocheck
// Generated from tools/ai/prompt-generator.html
// Source SHA-256: fd53a24f75e52782c7148ca072dec079f32abb0c3e33aed4523bce721d353481
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const templates = {
        dev: {
          role: "你是一个拥有 10 年经验的资深全栈工程师和架构师。",
          task: "请帮我重构以下代码，解决性能瓶颈并提高可读性。\n\n[在此处粘贴你的代码]",
          context: "这是一个高并发的 Node.js 生产环境系统，目前在处理长列表时存在明显的内存泄漏。",
          format:
            "请先简要指出目前的 3 个核心问题，然后直接输出重构后的完整代码，并在关键位置附带注释。",
          rules: "1. 必须符合最新的 ES6+ 语法规范\n2. 不能引入新的第三方库\n3. 考虑极端的边界情况",
          tone: "专业、严谨"
        },
        translate: {
          role: "你是一位精通多国语言的专业本地化翻译专家。",
          task: "请将以下英文文本翻译为地道、流畅的中文。\n\n[在此处粘贴英文文本]",
          context: "这篇文字将发布在科技公司的官方博客上，面向的是具有一定技术背景的中文读者。",
          format: "直接输出翻译结果。如果有难以直译的行业术语，请保留英文或在括号内加注英文。",
          rules: "1. 拒绝机翻感，符合中文阅读习惯\n2. 保持原有的 Markdown 格式排版不变",
          tone: "专业、严谨"
        },
        writer: {
          role: "你是一位拥有百万粉丝爆款经验的公众号/小红书文案大师。",
          task: "请帮我写一篇推荐最新款 AI 编程工具的文章。",
          context: "文章的目的是吸引小白用户注册试用，核心卖点是“不用懂代码也能做网页”。",
          format: "请输出包含标题（给出 3 个爆款候选）和正文。正文需分段清晰，善用 Emoji。",
          rules: "1. 字数控制在 800 字以内\n2. 增加互动性，结尾引导读者在评论区留言",
          tone: "友好、鼓励"
        },
        clear: {
          role: "",
          task: "",
          context: "",
          format: "",
          rules: "",
          tone: ""
        }
      };

      function loadTemplate(type) {
        const tpl = templates[type];
        document.getElementById("prompt-role").value = tpl.role;
        document.getElementById("prompt-task").value = tpl.task;
        document.getElementById("prompt-context").value = tpl.context;
        document.getElementById("prompt-format").value = tpl.format;
        document.getElementById("prompt-rules").value = tpl.rules;
        document.getElementById("prompt-tone").value = tpl.tone;
        generatePrompt();
      }

      function generatePrompt() {
        const role = document.getElementById("prompt-role").value.trim();
        const task = document.getElementById("prompt-task").value.trim();
        const context = document.getElementById("prompt-context").value.trim();
        const format = document.getElementById("prompt-format").value.trim();
        const rules = document.getElementById("prompt-rules").value.trim();
        const tone = document.getElementById("prompt-tone").value;

        if (!task && !role && !context) {
          document.getElementById("result-display").textContent = "请在左侧填写内容以生成提示词...";
          return;
        }

        let prompt = "";

        if (role) {
          prompt += `## 角色 (Role)\n${role}\n\n`;
        }

        if (context) {
          prompt += `## 背景信息 (Context)\n${context}\n\n`;
        }

        if (task) {
          prompt += `## 任务目标 (Task)\n${task}\n\n`;
        }

        if (rules) {
          prompt += `## 规则与约束 (Constraints)\n${rules}\n\n`;
        }

        if (format) {
          prompt += `## 输出格式 (Format)\n${format}\n\n`;
        }

        if (tone) {
          prompt += `## 语气风格 (Tone)\n请使用【${tone}】的语气进行回复。\n\n`;
        }

        document.getElementById("result-display").textContent = prompt.trim();
      }

      async function copyPrompt() {
        const text = document.getElementById("result-display").textContent;
        if (!text || text === "请在左侧填写内容以生成提示词...") return;

        try {
          await navigator.clipboard.writeText(text);
          const btn = document.getElementById("copy-btn");
          const originalHTML = btn.innerHTML;
          btn.innerHTML = "✅ 复制成功";
          btn.style.background = "var(--accent-green)";
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = "var(--accent-cyan)";
          }, 2000);
        } catch (err) {
          alert("复制失败，请手动选择复制");
        }
      }

      // 初始化主题
      window.toggleTheme = function () {
        const html = document.documentElement;
        const isDark = html.getAttribute("data-theme") !== "light";
        html.setAttribute("data-theme", isDark ? "light" : "dark");
        document.querySelector(".theme-toggle").textContent = isDark ? "☀️" : "🌙";
        localStorage.setItem("theme", isDark ? "light" : "dark");
      };

      function loadTheme() {
        const saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.documentElement.setAttribute("data-theme", "light");
          document.querySelector(".theme-toggle").textContent = "☀️";
        }
      }

      loadTheme();
      generatePrompt();
    
