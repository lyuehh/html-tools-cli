// @ts-nocheck
// Generated from tools/text/pinyin.html
// Source SHA-256: 3e5c7f12e1846459452b4ef8bb6cfdfe84bcf92cb0d99e11f23e1480ce891c7f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentMode = "plain";
      let lastResult = { pinyin: "", text: "" };

      function init() {
        setupOutputTabs();
        loadTheme();
        // Default example
        setExample("我爱北京天安门");
      }

      window.setExample = function (text) {
        document.getElementById("input").value = text;
        convert();
      };

      function convert() {
        const input = document.getElementById("input").value;
        if (!input.trim()) {
          document.getElementById("output").innerHTML =
            '<span style="color:var(--text-muted)">转换结果将显示在这里...</span>';
          updateStats(0, 0, 0);
          return;
        }

        const toneType = document.getElementById("toneType").value;
        const outputType = document.getElementById("outputType").value;
        const separator = document.getElementById("separator").value;
        const multiple = document.getElementById("multiple").value === "true";

        try {
          let pinyinResult;
          const options = {
            toneType: toneType,
            separator: separator,
            multiple: multiple
          };

          // Use pinyin-pro library
          const { pinyin } = pinyinPro;

          if (outputType === "initial") {
            options.pattern = "initial";
          } else if (outputType === "final") {
            options.pattern = "final";
          } else if (outputType === "first") {
            options.pattern = "first";
          }

          pinyinResult = pinyin(input, options);

          // Store for copy
          lastResult = {
            pinyin: pinyinResult,
            text: input
          };

          // Render output based on mode
          renderOutput(input, pinyinResult);

          // Update stats
          const hanziCount = (input.match(/[\u4e00-\u9fa5]/g) || []).length;
          const pinyinWords = pinyinResult.split(separator || " ").filter((p) => p.trim()).length;
          updateStats(hanziCount, pinyinWords, input.length);
        } catch (e) {
          console.error(e);
          document.getElementById("output").innerHTML =
            '<span style="color:#ef4444">转换出错，请检查输入</span>';
        }
      }

      function renderOutput(text, pinyin) {
        const output = document.getElementById("output");
        const separator = document.getElementById("separator").value || " ";

        if (currentMode === "plain") {
          output.innerHTML = `<span class="pinyin">${escapeHtml(pinyin)}</span>`;
          output.classList.remove("ruby-output");
        } else if (currentMode === "ruby") {
          // Ruby annotation mode
          const chars = text.split("");
          const pinyinArray = pinyin.split(separator);
          let html = "";
          let pinyinIdx = 0;

          for (const char of chars) {
            if (/[\u4e00-\u9fa5]/.test(char)) {
              const py = pinyinArray[pinyinIdx++] || "";
              html += `<ruby>${char}<rt>${py}</rt></ruby>`;
            } else {
              html += escapeHtml(char);
            }
          }
          output.innerHTML = html;
          output.classList.add("ruby-output");
        } else if (currentMode === "mixed") {
          // Mixed mode: pinyin above hanzi
          output.innerHTML = `<span class="pinyin">${escapeHtml(pinyin)}</span>\n<span class="hanzi">${escapeHtml(text)}</span>`;
          output.classList.remove("ruby-output");
        }
      }

      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      function updateStats(hanzi, pinyin, total) {
        document.getElementById("hanziCount").textContent = hanzi;
        document.getElementById("pinyinCount").textContent = pinyin;
        document.getElementById("totalCount").textContent = total;
      }

      function setupOutputTabs() {
        document.querySelectorAll(".output-tab").forEach((tab) => {
          tab.addEventListener("click", () => {
            document.querySelectorAll(".output-tab").forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
            currentMode = tab.dataset.mode;
            convert();
          });
        });
      }

      window.copyResult = function () {
        let textToCopy;
        if (currentMode === "plain") {
          textToCopy = lastResult.pinyin;
        } else if (currentMode === "ruby") {
          textToCopy = lastResult.text + "\n" + lastResult.pinyin;
        } else {
          textToCopy = lastResult.pinyin + "\n" + lastResult.text;
        }

        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast("已复制到剪贴板");
        });
      };

      window.clearAll = function () {
        document.getElementById("input").value = "";
        document.getElementById("output").innerHTML =
          '<span style="color:var(--text-muted)">转换结果将显示在这里...</span>';
        updateStats(0, 0, 0);
      };

      function showToast(msg) {
        const toast = document.createElement("div");
        toast.textContent = msg;
        toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.75rem 1.5rem;
        background: var(--accent-green);
        color: white;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
      `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
      }

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

      // Add CSS animation
      const style = document.createElement("style");
      style.textContent = `
      @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
      document.head.appendChild(style);

      init();
    
