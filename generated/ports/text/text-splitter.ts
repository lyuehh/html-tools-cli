// @ts-nocheck
// Generated from tools/text/text-splitter.html
// Source SHA-256: b3f07bf37fd7db0431b923813e3054096ae48670297e51b0ce35675d01c3306f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentMode = "delimiter";
      let splitResults = [];

      // 设置分割模式
      window.setMode = function (mode) {
        currentMode = mode;

        // 更新按钮状态
        document.querySelectorAll(".mode-buttons button").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.mode === mode);
        });

        // 显示/隐藏相关选项
        document.getElementById("delimiterOption").style.display =
          mode === "delimiter" ? "" : "none";
        document.getElementById("customDelimiterOption").style.display =
          mode === "delimiter" ? "" : "none";
        document.getElementById("lengthOption").style.display = mode === "length" ? "" : "none";
        document.getElementById("linesOption").style.display = mode === "lines" ? "" : "none";
        document.getElementById("regexOption").style.display = mode === "regex" ? "" : "none";
        document.getElementById("countOption").style.display = mode === "count" ? "" : "none";
      };

      // 启用/禁用自定义分隔符
      document.getElementById("delimiter").addEventListener("change", function () {
        document.getElementById("customDelimiter").disabled = this.value !== "custom";
      });

      // 获取分隔符
      function getDelimiter() {
        const select = document.getElementById("delimiter");
        const custom = document.getElementById("customDelimiter");

        if (select.value === "custom") {
          return custom.value;
        }
        if (select.value === "\\t") return "\t";
        if (select.value === "\\n") return "\n";
        return select.value;
      }

      // 分割文本
      window.splitText = function () {
        const input = document.getElementById("input").value;
        if (!input) {
          showToast("请输入要分割的文本");
          return;
        }

        let results = [];

        switch (currentMode) {
          case "delimiter":
            results = splitByDelimiter(input);
            break;
          case "length":
            results = splitByLength(input);
            break;
          case "lines":
            results = splitByLines(input);
            break;
          case "regex":
            results = splitByRegex(input);
            break;
          case "count":
            results = splitByCount(input);
            break;
        }

        // 过滤空结果
        results = results.filter((r) => r.trim().length > 0);
        splitResults = results;

        // 输出结果
        outputResults(results);

        // 更新统计
        updateStats(input, results);

        // 显示预览
        renderResultsList(results);

        showToast("已分割成 " + results.length + " 段");
      };

      // 按分隔符分割
      function splitByDelimiter(text) {
        const delimiter = getDelimiter();
        if (!delimiter) return [text];
        return text.split(delimiter);
      }

      // 按长度分割
      function splitByLength(text) {
        const length = parseInt(document.getElementById("splitLength").value) || 100;
        const results = [];

        for (let i = 0; i < text.length; i += length) {
          results.push(text.substring(i, i + length));
        }

        return results;
      }

      // 按行数分割
      function splitByLines(text) {
        const linesPerSegment = parseInt(document.getElementById("splitLines").value) || 10;
        const lines = text.split("\n");
        const results = [];

        for (let i = 0; i < lines.length; i += linesPerSegment) {
          results.push(lines.slice(i, i + linesPerSegment).join("\n"));
        }

        return results;
      }

      // 按正则分割
      function splitByRegex(text) {
        const pattern = document.getElementById("splitRegex").value;
        if (!pattern) return [text];

        try {
          const regex = new RegExp(pattern, "g");
          return text.split(regex);
        } catch (e) {
          showToast("正则表达式错误: " + e.message);
          return [text];
        }
      }

      // 等分N份
      function splitByCount(text) {
        const count = parseInt(document.getElementById("splitCount").value) || 2;
        const segmentLength = Math.ceil(text.length / count);
        const results = [];

        for (let i = 0; i < count; i++) {
          const start = i * segmentLength;
          const end = Math.min(start + segmentLength, text.length);
          if (start < text.length) {
            results.push(text.substring(start, end));
          }
        }

        return results;
      }

      // 输出结果
      function outputResults(results) {
        const format = document.getElementById("outputFormat").value;
        let output = "";

        switch (format) {
          case "list":
            output = results.join("\n---\n");
            break;
          case "newline":
            output = results.join("\n");
            break;
          case "json":
            output = JSON.stringify(results, null, 2);
            break;
          case "numbered":
            output = results.map((r, i) => i + 1 + ". " + r).join("\n");
            break;
        }

        document.getElementById("output").value = output;
      }

      // 渲染结果列表
      function renderResultsList(results) {
        const list = document.getElementById("resultsList");
        list.textContent = "";

        document.getElementById("resultsCount").textContent = "共 " + results.length + " 段";

        results.forEach((result, index) => {
          const item = document.createElement("div");
          item.className = "result-item";

          const indexSpan = document.createElement("span");
          indexSpan.className = "result-index";
          indexSpan.textContent = index + 1;
          item.appendChild(indexSpan);

          const content = document.createElement("span");
          content.className = "result-content";
          content.textContent = result.length > 200 ? result.substring(0, 200) + "..." : result;
          item.appendChild(content);

          const meta = document.createElement("span");
          meta.className = "result-meta";
          meta.textContent = result.length + " 字符";
          item.appendChild(meta);

          const copyBtn = document.createElement("button");
          copyBtn.className = "result-copy secondary";
          copyBtn.textContent = "复制";
          copyBtn.onclick = function () {
            copySegment(index);
          };
          item.appendChild(copyBtn);

          list.appendChild(item);
        });
      }

      // 复制单段
      function copySegment(index) {
        if (splitResults[index]) {
          navigator.clipboard.writeText(splitResults[index]).then(() => {
            showToast("已复制第 " + (index + 1) + " 段");
          });
        }
      }

      // 更新统计
      function updateStats(original, results) {
        document.getElementById("originalLength").textContent = original.length;
        document.getElementById("segmentCount").textContent = results.length;

        if (results.length > 0) {
          const lengths = results.map((r) => r.length);
          const avg = Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
          const max = Math.max(...lengths);
          const min = Math.min(...lengths);

          document.getElementById("avgLength").textContent = avg;
          document.getElementById("maxLength").textContent = max;
          document.getElementById("minLength").textContent = min;
        } else {
          document.getElementById("avgLength").textContent = "0";
          document.getElementById("maxLength").textContent = "0";
          document.getElementById("minLength").textContent = "0";
        }
      }

      // 复制输出
      window.copyOutput = function () {
        const output = document.getElementById("output").value;
        if (output) {
          navigator.clipboard.writeText(output).then(() => {
            showToast("已复制到剪贴板");
          });
        }
      };

      // 下载结果
      window.downloadOutput = function () {
        const output = document.getElementById("output").value;
        if (!output) {
          showToast("没有可下载的内容");
          return;
        }

        const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "split-result.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast("已开始下载");
      };

      // 清空输入
      window.clearInput = function () {
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
        document.getElementById("resultsList").textContent = "";
        document.getElementById("resultsCount").textContent = "";
        splitResults = [];
      };

      // 从剪贴板粘贴
      window.pasteFromClipboard = async function () {
        try {
          const text = await navigator.clipboard.readText();
          document.getElementById("input").value = text;
          showToast("已粘贴");
        } catch (err) {
          showToast("无法访问剪贴板");
        }
      };

      // 加载示例
      window.loadSample = function () {
        const sample = "苹果,香蕉,橙子,葡萄,西瓜,芒果,草莓,蓝莓,樱桃,柠檬";
        document.getElementById("input").value = sample;
        showToast("已加载示例文本");
      };

      // 显示提示
      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => {
          toast.classList.remove("show");
        }, 2000);
      }

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.querySelector(".theme-toggle").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      // 初始化主题
      (function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      })();
    
