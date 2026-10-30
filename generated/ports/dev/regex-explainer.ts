// @ts-nocheck
// Generated from tools/dev/regex-explainer.html
// Source SHA-256: 035c9d64cd3c32533bab3b869e4632f395f42a1f49be1ee015a11c2521b2732b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const examples = {
        email: {
          regex: "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$",
          flags: "gm",
          test: "test@example.com\ninvalid-email\nuser@domain.co.uk"
        },
        phone: {
          regex: "^1[3-9]\\d{9}$",
          flags: "gm",
          test: "13812345678\n12345678901\n18899998888"
        },
        url: {
          regex: "https?://[\\w.-]+(?:/[\\w./-]*)?",
          flags: "gi",
          test: "Visit https://example.com/path\nOr http://test.org"
        },
        ip: {
          regex: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
          flags: "g",
          test: "192.168.1.1\n10.0.0.255\n999.999.999.999"
        },
        date: {
          regex: "\\d{4}[-/]\\d{2}[-/]\\d{2}",
          flags: "g",
          test: "2024-01-15\n2023/12/25\ninvalid-date"
        },
        password: {
          regex: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
          flags: "m",
          test: "Weak123\nStrong@Pass1\nNoSpecial1A"
        }
      };

      const tokenPatterns = [
        { pattern: /^\^/, type: "anchor", desc: "匹配字符串开始位置" },
        { pattern: /^\$/, type: "anchor", desc: "匹配字符串结束位置" },
        { pattern: /^\\b/, type: "anchor", desc: "匹配单词边界" },
        { pattern: /^\\B/, type: "anchor", desc: "匹配非单词边界" },
        { pattern: /^\\d/, type: "meta", desc: "匹配任意数字 [0-9]" },
        { pattern: /^\\D/, type: "meta", desc: "匹配任意非数字" },
        { pattern: /^\\w/, type: "meta", desc: "匹配单词字符 [a-zA-Z0-9_]" },
        { pattern: /^\\W/, type: "meta", desc: "匹配非单词字符" },
        { pattern: /^\\s/, type: "meta", desc: "匹配空白字符" },
        { pattern: /^\\S/, type: "meta", desc: "匹配非空白字符" },
        { pattern: /^\\n/, type: "escape", desc: "匹配换行符" },
        { pattern: /^\\t/, type: "escape", desc: "匹配制表符" },
        { pattern: /^\\r/, type: "escape", desc: "匹配回车符" },
        { pattern: /^\\./, type: "meta", desc: "匹配任意字符（除换行）" },
        {
          pattern: /^\\\\./,
          type: "escape",
          desc: function (m) {
            return '匹配字面量 "' + m[0].slice(1) + '"';
          }
        },
        { pattern: /^\(\?:/, type: "group", desc: "非捕获分组开始" },
        { pattern: /^\(\?=/, type: "group", desc: "正向先行断言" },
        { pattern: /^\(\?!/, type: "group", desc: "负向先行断言" },
        { pattern: /^\(\?<=/, type: "group", desc: "正向后行断言" },
        { pattern: /^\(\?<!/, type: "group", desc: "负向后行断言" },
        { pattern: /^\(/, type: "group", desc: "捕获分组开始" },
        { pattern: /^\)/, type: "group", desc: "分组结束" },
        {
          pattern: /^\[([^\]\\]|\\.)*\]/,
          type: "charset",
          desc: function (m) {
            return "字符集: " + m[0];
          }
        },
        {
          pattern: /^\{(\d+)(,)?(\d*)?\}/,
          type: "quantifier",
          desc: function (m) {
            if (m[2] && m[3]) return "重复 " + m[1] + " 到 " + m[3] + " 次";
            if (m[2]) return "重复至少 " + m[1] + " 次";
            return "重复恰好 " + m[1] + " 次";
          }
        },
        { pattern: /^\*\?/, type: "quantifier", desc: "匹配 0 次或多次（非贪婪）" },
        { pattern: /^\+\?/, type: "quantifier", desc: "匹配 1 次或多次（非贪婪）" },
        { pattern: /^\?\?/, type: "quantifier", desc: "匹配 0 次或 1 次（非贪婪）" },
        { pattern: /^\*/, type: "quantifier", desc: "匹配 0 次或多次" },
        { pattern: /^\+/, type: "quantifier", desc: "匹配 1 次或多次" },
        { pattern: /^\?/, type: "quantifier", desc: "匹配 0 次或 1 次" },
        { pattern: /^\|/, type: "meta", desc: "或（匹配左侧或右侧）" }
      ];

      function parseRegex(regex) {
        const tokens = [];
        let pos = 0;

        while (pos < regex.length) {
          let matched = false;

          for (const tp of tokenPatterns) {
            const match = regex.slice(pos).match(tp.pattern);
            if (match) {
              const desc = typeof tp.desc === "function" ? tp.desc(match) : tp.desc;
              tokens.push({ text: match[0], type: tp.type, desc });
              pos += match[0].length;
              matched = true;
              break;
            }
          }

          if (!matched) {
            // 字面量字符
            tokens.push({
              text: regex[pos],
              type: "literal",
              desc: '匹配字面量 "' + regex[pos] + '"'
            });
            pos++;
          }
        }

        return tokens;
      }

      function renderVisual(tokens) {
        const container = document.getElementById("visualRegex");
        container.textContent = "";

        tokens.forEach((token) => {
          const span = document.createElement("span");
          span.className = "char " + token.type;
          span.textContent = token.text;
          span.title = token.desc;
          container.appendChild(span);
        });
      }

      function renderTokenList(tokens) {
        const container = document.getElementById("tokenList");
        container.textContent = "";

        tokens.forEach((token, i) => {
          const item = document.createElement("div");
          item.className = "token-item";

          const pattern = document.createElement("span");
          pattern.className = "token-pattern";
          pattern.textContent = token.text;

          const desc = document.createElement("span");
          desc.className = "token-desc";
          desc.textContent = token.desc;

          const type = document.createElement("span");
          type.className = "token-type";
          type.textContent = token.type;

          item.appendChild(pattern);
          item.appendChild(desc);
          item.appendChild(type);
          container.appendChild(item);
        });
      }

      function getFlags() {
        let flags = "";
        if (document.getElementById("flagG").checked) flags += "g";
        if (document.getElementById("flagI").checked) flags += "i";
        if (document.getElementById("flagM").checked) flags += "m";
        if (document.getElementById("flagS").checked) flags += "s";
        if (document.getElementById("flagU").checked) flags += "u";
        return flags;
      }

      function testMatch() {
        const regexStr = document.getElementById("regexInput").value;
        const testText = document.getElementById("testInput").value;
        const resultDiv = document.getElementById("matchResult");

        if (!regexStr) {
          resultDiv.textContent = "请输入正则表达式";
          return;
        }

        try {
          const flags = getFlags();
          const regex = new RegExp(regexStr, flags);
          const matches = [];
          let match;

          if (flags.includes("g")) {
            while ((match = regex.exec(testText)) !== null) {
              matches.push({ index: match.index, text: match[0], groups: match.slice(1) });
            }
          } else {
            match = regex.exec(testText);
            if (match) {
              matches.push({ index: match.index, text: match[0], groups: match.slice(1) });
            }
          }

          if (matches.length === 0) {
            resultDiv.textContent = "无匹配结果";
            return;
          }

          // 高亮显示匹配
          let highlighted = "";
          let lastIndex = 0;

          matches.forEach((m) => {
            highlighted += escapeHtml(testText.slice(lastIndex, m.index));
            highlighted += '<span class="match-highlight">' + escapeHtml(m.text) + "</span>";
            lastIndex = m.index + m.text.length;
          });
          highlighted += escapeHtml(testText.slice(lastIndex));

          resultDiv.innerHTML = "";
          const pre = document.createElement("pre");
          pre.style.whiteSpace = "pre-wrap";
          pre.style.margin = "0";
          pre.innerHTML = highlighted;
          resultDiv.appendChild(pre);

          const info = document.createElement("div");
          info.className = "match-info";
          info.textContent = "找到 " + matches.length + " 个匹配";
          if (matches[0].groups && matches[0].groups.length > 0) {
            info.textContent +=
              "，捕获组: " +
              matches[0].groups
                .map(function (g, i) {
                  return "(" + (i + 1) + ") " + (g || "空");
                })
                .join(", ");
          }
          resultDiv.appendChild(info);
        } catch (e) {
          resultDiv.textContent = "正则表达式错误: " + e.message;
        }
      }

      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      window.analyze = function () {
        const regex = document.getElementById("regexInput").value;
        const tokens = parseRegex(regex);
        renderVisual(tokens);
        renderTokenList(tokens);
        testMatch();
      };

      window.loadExample = function (name) {
        const ex = examples[name];
        if (ex) {
          document.getElementById("regexInput").value = ex.regex;
          document.getElementById("testInput").value = ex.test;
          document.getElementById("flagG").checked = ex.flags.includes("g");
          document.getElementById("flagI").checked = ex.flags.includes("i");
          document.getElementById("flagM").checked = ex.flags.includes("m");
          document.getElementById("flagS").checked = ex.flags.includes("s");
          document.getElementById("flagU").checked = ex.flags.includes("u");
          analyze();
        }
      };

      // 事件监听
      document.getElementById("regexInput").addEventListener("input", analyze);
      document.getElementById("testInput").addEventListener("input", testMatch);
      document.querySelectorAll(".flags-group input").forEach(function (el) {
        el.addEventListener("change", testMatch);
      });

      // 主题切换
      const themeToggle = document.getElementById("themeToggle");
      const html = document.documentElement;
      const savedTheme = localStorage.getItem("theme") || "light";
      html.setAttribute("data-theme", savedTheme);

      themeToggle.addEventListener("click", function () {
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      });

      // 初始化
      analyze();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
