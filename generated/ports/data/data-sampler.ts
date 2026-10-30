// @ts-nocheck
// Generated from tools/data/data-sampler.html
// Source SHA-256: c968d16fdb514a4e0a33bda86559d0a24c4152fbee146dd0b6800a1de7ce5a38
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "data-sampler-state";
      let currentMode = "random";
      let lastResult = [];

      // Elements
      const inputEl = document.getElementById("input");
      const resultEl = document.getElementById("result");
      const sizeOption = document.getElementById("sizeOption");
      const everyOption = document.getElementById("everyOption");
      const rangeOption = document.getElementById("rangeOption");
      const seedOption = document.getElementById("seedOption");

      // Mode selector
      document.querySelectorAll(".mode-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".mode-btn").forEach((b) => b.classList.remove("active"));
          this.classList.add("active");
          currentMode = this.dataset.mode;
          updateOptionsVisibility();
          saveState();
        });
      });

      // Update options visibility based on mode
      function updateOptionsVisibility() {
        sizeOption.classList.toggle("hidden", currentMode === "every" || currentMode === "range");
        everyOption.classList.toggle("hidden", currentMode !== "every");
        rangeOption.classList.toggle("hidden", currentMode !== "range");
        seedOption.classList.toggle("hidden", currentMode !== "random");
      }

      // Parse lines
      function parseLines(text) {
        return text
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l !== "");
      }

      // Seeded random generator (mulberry32)
      function seededRandom(seed) {
        return function () {
          let t = (seed += 0x6d2b79f5);
          t = Math.imul(t ^ (t >>> 15), t | 1);
          t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
      }

      // Shuffle array with optional seed
      function shuffleArray(arr, seed) {
        const result = [...arr];
        const random = seed !== null ? seededRandom(seed) : Math.random;
        for (let i = result.length - 1; i > 0; i--) {
          const j = Math.floor(random() * (i + 1));
          [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
      }

      // Sample data
      function sampleData() {
        const lines = parseLines(inputEl.value);
        if (lines.length === 0) {
          showToast("请输入数据");
          return;
        }

        let result = [];

        switch (currentMode) {
          case "random": {
            const sizeType = document.getElementById("sizeType").value;
            let sampleSize = parseInt(document.getElementById("sampleSize").value) || 10;
            const seedInput = document.getElementById("seed").value;
            const seed = seedInput ? parseInt(seedInput) : null;

            if (sizeType === "percent") {
              sampleSize = Math.ceil((sampleSize / 100) * lines.length);
            }
            sampleSize = Math.min(sampleSize, lines.length);

            const shuffled = shuffleArray(lines, seed);
            result = shuffled.slice(0, sampleSize);
            break;
          }

          case "first": {
            const sizeType = document.getElementById("sizeType").value;
            let sampleSize = parseInt(document.getElementById("sampleSize").value) || 10;

            if (sizeType === "percent") {
              sampleSize = Math.ceil((sampleSize / 100) * lines.length);
            }
            sampleSize = Math.min(sampleSize, lines.length);

            result = lines.slice(0, sampleSize);
            break;
          }

          case "last": {
            const sizeType = document.getElementById("sizeType").value;
            let sampleSize = parseInt(document.getElementById("sampleSize").value) || 10;

            if (sizeType === "percent") {
              sampleSize = Math.ceil((sampleSize / 100) * lines.length);
            }
            sampleSize = Math.min(sampleSize, lines.length);

            result = lines.slice(-sampleSize);
            break;
          }

          case "every": {
            const everyN = parseInt(document.getElementById("everyN").value) || 2;
            for (let i = 0; i < lines.length; i += everyN) {
              result.push(lines[i]);
            }
            break;
          }

          case "range": {
            const start = parseInt(document.getElementById("rangeStart").value) || 1;
            const end = parseInt(document.getElementById("rangeEnd").value) || 10;
            const actualStart = Math.max(0, Math.min(start - 1, lines.length - 1));
            const actualEnd = Math.min(end, lines.length);
            result = lines.slice(actualStart, actualEnd);
            break;
          }
        }

        lastResult = result;

        // Update stats
        document.getElementById("inputCount").textContent = lines.length;
        document.getElementById("outputCount").textContent = result.length;
        document.getElementById("samplePercent").textContent =
          lines.length > 0 ? ((result.length / lines.length) * 100).toFixed(1) + "%" : "0%";

        resultEl.textContent = result.length > 0 ? result.join("\n") : "（无数据）";
        saveState();
        showToast("采样完成");
      }

      // Resample (for random mode)
      function resample() {
        if (currentMode === "random") {
          // Clear seed for new random
          document.getElementById("seed").value = "";
        }
        sampleData();
      }

      // Copy result
      function copyResult() {
        if (lastResult.length === 0) {
          showToast("没有可复制的内容");
          return;
        }
        navigator.clipboard.writeText(lastResult.join("\n")).then(() => {
          showToast("已复制到剪贴板");
        });
      }

      // Download result
      function downloadResult() {
        if (lastResult.length === 0) {
          showToast("没有可下载的内容");
          return;
        }
        const blob = new Blob([lastResult.join("\n")], {
          type: "text/plain;charset=utf-8"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sampled-data.txt";
        a.click();
        URL.revokeObjectURL(url);
        showToast("下载已开始");
      }

      // Clear all
      function clearAll() {
        inputEl.value = "";
        resultEl.textContent = "采样结果将显示在这里...";
        lastResult = [];
        document.getElementById("inputCount").textContent = "0";
        document.getElementById("outputCount").textContent = "0";
        document.getElementById("samplePercent").textContent = "0%";
        localStorage.removeItem(LS_KEY);
        showToast("已清空");
      }

      // Save state
      function saveState() {
        const state = {
          input: inputEl.value,
          mode: currentMode,
          sampleSize: document.getElementById("sampleSize").value,
          sizeType: document.getElementById("sizeType").value,
          everyN: document.getElementById("everyN").value,
          rangeStart: document.getElementById("rangeStart").value,
          rangeEnd: document.getElementById("rangeEnd").value,
          seed: document.getElementById("seed").value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(state));
      }

      // Load state
      function loadState() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const state = JSON.parse(saved);
            inputEl.value = state.input || "";

            if (state.mode) {
              currentMode = state.mode;
              document.querySelectorAll(".mode-btn").forEach((btn) => {
                if (btn.dataset.mode === state.mode) {
                  btn.classList.add("active");
                } else {
                  btn.classList.remove("active");
                }
              });
              updateOptionsVisibility();
            }

            document.getElementById("sampleSize").value = state.sampleSize || "10";
            document.getElementById("sizeType").value = state.sizeType || "count";
            document.getElementById("everyN").value = state.everyN || "2";
            document.getElementById("rangeStart").value = state.rangeStart || "1";
            document.getElementById("rangeEnd").value = state.rangeEnd || "10";
            document.getElementById("seed").value = state.seed || "";
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
      inputEl.addEventListener("input", saveState);

      // Load state on init
      loadState();
      updateOptionsVisibility();
    
