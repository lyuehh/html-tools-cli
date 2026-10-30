// @ts-nocheck
// Generated from tools/data/data-merger.html
// Source SHA-256: 0002280ae3e2775cd6c392c5f0c47d1aca0d3de8d10177ad58ebb846fea551c0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "data-merger-state";

      // Elements
      const inputA = document.getElementById("inputA");
      const inputB = document.getElementById("inputB");
      const resultEl = document.getElementById("result");
      const trimLinesEl = document.getElementById("trimLines");
      const skipEmptyEl = document.getElementById("skipEmpty");
      const delimiterEl = document.getElementById("delimiter");
      const delimiterGroup = document.getElementById("delimiterGroup");

      // Radio group handling
      document.querySelectorAll("#mergeMode .radio-item").forEach((item) => {
        item.addEventListener("click", function () {
          document.querySelectorAll("#mergeMode .radio-item").forEach((i) => {
            i.classList.remove("active");
          });
          this.classList.add("active");
          this.querySelector("input").checked = true;

          // Show/hide delimiter option for CSV mode
          const mode = this.querySelector("input").value;
          delimiterGroup.style.display = mode === "csv-column" ? "block" : "none";
        });
      });

      // Get current merge mode
      function getMergeMode() {
        return document.querySelector('input[name="mode"]:checked').value;
      }

      // Parse lines from text
      function parseLines(text) {
        let lines = text.split("\n");
        if (trimLinesEl.checked) {
          lines = lines.map((l) => l.trim());
        }
        if (skipEmptyEl.checked) {
          lines = lines.filter((l) => l !== "");
        }
        return lines;
      }

      // Merge data
      function mergeData() {
        const linesA = parseLines(inputA.value);
        const linesB = parseLines(inputB.value);
        const mode = getMergeMode();

        let result = [];
        let removed = 0;

        switch (mode) {
          case "append":
            result = [...linesA, ...linesB];
            break;

          case "interleave":
            const maxLen = Math.max(linesA.length, linesB.length);
            for (let i = 0; i < maxLen; i++) {
              if (i < linesA.length) result.push(linesA[i]);
              if (i < linesB.length) result.push(linesB[i]);
            }
            break;

          case "union":
            const totalBefore = linesA.length + linesB.length;
            const uniqueSet = new Set([...linesA, ...linesB]);
            result = [...uniqueSet];
            removed = totalBefore - result.length;
            break;

          case "csv-column":
            const delimiter = delimiterEl.value || ",";
            const maxRows = Math.max(linesA.length, linesB.length);
            for (let i = 0; i < maxRows; i++) {
              const a = i < linesA.length ? linesA[i] : "";
              const b = i < linesB.length ? linesB[i] : "";
              result.push(a + delimiter + b);
            }
            break;
        }

        // Update stats
        document.getElementById("countA").textContent = linesA.length;
        document.getElementById("countB").textContent = linesB.length;
        document.getElementById("countResult").textContent = result.length;

        const removedStat = document.getElementById("removedStat");
        if (mode === "union") {
          removedStat.style.display = "block";
          document.getElementById("countRemoved").textContent = removed;
        } else {
          removedStat.style.display = "none";
        }

        resultEl.textContent = result.length > 0 ? result.join("\n") : "（无数据）";
        saveState();
        showToast("合并完成");
      }

      // Swap inputs
      function swapInputs() {
        const tempA = inputA.value;
        inputA.value = inputB.value;
        inputB.value = tempA;
        saveState();
        showToast("已交换数据集");
      }

      // Copy result
      function copyResult() {
        const text = resultEl.textContent;
        if (!text || text === "合并结果将显示在这里..." || text === "（无数据）") {
          showToast("没有可复制的内容");
          return;
        }
        navigator.clipboard.writeText(text).then(() => {
          showToast("已复制到剪贴板");
        });
      }

      // Download result
      function downloadResult() {
        const text = resultEl.textContent;
        if (!text || text === "合并结果将显示在这里..." || text === "（无数据）") {
          showToast("没有可下载的内容");
          return;
        }
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "merged-data.txt";
        a.click();
        URL.revokeObjectURL(url);
        showToast("下载已开始");
      }

      // Clear all
      function clearAll() {
        inputA.value = "";
        inputB.value = "";
        resultEl.textContent = "合并结果将显示在这里...";
        document.getElementById("countA").textContent = "0";
        document.getElementById("countB").textContent = "0";
        document.getElementById("countResult").textContent = "0";
        document.getElementById("removedStat").style.display = "none";
        localStorage.removeItem(LS_KEY);
        showToast("已清空");
      }

      // Save state
      function saveState() {
        const state = {
          inputA: inputA.value,
          inputB: inputB.value,
          mode: getMergeMode(),
          trimLines: trimLinesEl.checked,
          skipEmpty: skipEmptyEl.checked,
          delimiter: delimiterEl.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(state));
      }

      // Load state
      function loadState() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const state = JSON.parse(saved);
            inputA.value = state.inputA || "";
            inputB.value = state.inputB || "";
            trimLinesEl.checked = state.trimLines !== false;
            skipEmptyEl.checked = state.skipEmpty !== false;
            delimiterEl.value = state.delimiter || ",";

            if (state.mode) {
              document.querySelectorAll("#mergeMode .radio-item").forEach((item) => {
                const radio = item.querySelector("input");
                if (radio.value === state.mode) {
                  item.classList.add("active");
                  radio.checked = true;
                  if (state.mode === "csv-column") {
                    delimiterGroup.style.display = "block";
                  }
                } else {
                  item.classList.remove("active");
                }
              });
            }
          }
        } catch {
          // ignore
        }
      }

      // Theme toggle
      function toggleTheme() {
        const body = document.body;
        const isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      // Show toast
      function showToast(msg) {
        const toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Init theme
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      // Auto-save on input
      inputA.addEventListener("input", saveState);
      inputB.addEventListener("input", saveState);

      // Load state on init
      loadState();
    
