// @ts-nocheck
// Generated from tools/data/data-validator.html
// Source SHA-256: 18b0af3c904f7902d102ae8e368309ba4a410f656ec92654d4b76dde345264d6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "data-validator-state";
      let currentType = "email";
      let validItems = [];
      let invalidItems = [];

      // Elements
      const inputEl = document.getElementById("input");

      // Type selector
      document.querySelectorAll(".type-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".type-btn").forEach((b) => b.classList.remove("active"));
          this.classList.add("active");
          currentType = this.dataset.type;
          saveState();
        });
      });

      // Validators
      const validators = {
        email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        url: (v) => {
          try {
            new URL(v);
            return true;
          } catch {
            return false;
          }
        },
        number: (v) => !isNaN(parseFloat(v)) && isFinite(v),
        integer: (v) => /^-?\d+$/.test(v),
        "phone-cn": (v) => /^1[3-9]\d{9}$/.test(v.replace(/\s+/g, "")),
        date: (v) => {
          // Supports: YYYY-MM-DD, YYYY/MM/DD, DD-MM-YYYY, DD/MM/YYYY
          const patterns = [
            /^\d{4}-\d{2}-\d{2}$/,
            /^\d{4}\/\d{2}\/\d{2}$/,
            /^\d{2}-\d{2}-\d{4}$/,
            /^\d{2}\/\d{2}\/\d{4}$/
          ];
          if (!patterns.some((p) => p.test(v))) return false;
          const date = new Date(v);
          return !isNaN(date.getTime());
        },
        ipv4: (v) => {
          const parts = v.split(".");
          if (parts.length !== 4) return false;
          return parts.every((p) => {
            const num = parseInt(p, 10);
            return !isNaN(num) && num >= 0 && num <= 255 && p === String(num);
          });
        },
        "hex-color": (v) => /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(v),
        uuid: (v) =>
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v),
        json: (v) => {
          try {
            JSON.parse(v);
            return true;
          } catch {
            return false;
          }
        }
      };

      // Parse lines
      function parseLines(text) {
        return text
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l !== "");
      }

      // Create result item element safely
      function createResultItem(text, isValid) {
        const div = document.createElement("div");
        div.className = "result-item " + (isValid ? "valid" : "invalid");
        div.textContent = text;
        return div;
      }

      // Validate data
      function validateData() {
        const lines = parseLines(inputEl.value);
        if (lines.length === 0) {
          showToast("请输入数据");
          return;
        }

        const validator = validators[currentType];
        validItems = [];
        invalidItems = [];

        lines.forEach((line) => {
          if (validator(line)) {
            validItems.push(line);
          } else {
            invalidItems.push(line);
          }
        });

        // Update stats
        const total = lines.length;
        const validCount = validItems.length;
        const invalidCount = invalidItems.length;

        document.getElementById("totalCount").textContent = total;
        document.getElementById("validCount").textContent = validCount;
        document.getElementById("invalidCount").textContent = invalidCount;
        document.getElementById("validPercent").textContent =
          total > 0 ? ((validCount / total) * 100).toFixed(1) + "%" : "0%";
        document.getElementById("invalidPercent").textContent =
          total > 0 ? ((invalidCount / total) * 100).toFixed(1) + "%" : "0%";

        // Update lists using safe DOM methods
        const validList = document.getElementById("validList");
        const invalidList = document.getElementById("invalidList");

        // Clear existing content
        validList.textContent = "";
        invalidList.textContent = "";

        if (validItems.length > 0) {
          validItems.forEach((item) => {
            validList.appendChild(createResultItem(item, true));
          });
        } else {
          const emptyDiv = document.createElement("div");
          emptyDiv.className = "empty-state";
          emptyDiv.textContent = "无有效数据";
          validList.appendChild(emptyDiv);
        }

        if (invalidItems.length > 0) {
          invalidItems.forEach((item) => {
            invalidList.appendChild(createResultItem(item, false));
          });
        } else {
          const emptyDiv = document.createElement("div");
          emptyDiv.className = "empty-state";
          emptyDiv.textContent = "无无效数据";
          invalidList.appendChild(emptyDiv);
        }

        saveState();
        showToast("验证完成");
      }

      // Copy valid items
      function copyValid() {
        if (validItems.length === 0) {
          showToast("没有可复制的有效数据");
          return;
        }
        navigator.clipboard.writeText(validItems.join("\n")).then(() => {
          showToast("有效数据已复制");
        });
      }

      // Copy invalid items
      function copyInvalid() {
        if (invalidItems.length === 0) {
          showToast("没有可复制的无效数据");
          return;
        }
        navigator.clipboard.writeText(invalidItems.join("\n")).then(() => {
          showToast("无效数据已复制");
        });
      }

      // Clear all
      function clearAll() {
        inputEl.value = "";
        validItems = [];
        invalidItems = [];
        document.getElementById("totalCount").textContent = "0";
        document.getElementById("validCount").textContent = "0";
        document.getElementById("invalidCount").textContent = "0";
        document.getElementById("validPercent").textContent = "0%";
        document.getElementById("invalidPercent").textContent = "0%";

        const validList = document.getElementById("validList");
        const invalidList = document.getElementById("invalidList");
        validList.textContent = "";
        invalidList.textContent = "";

        const emptyValid = document.createElement("div");
        emptyValid.className = "empty-state";
        emptyValid.textContent = "验证后显示...";
        validList.appendChild(emptyValid);

        const emptyInvalid = document.createElement("div");
        emptyInvalid.className = "empty-state";
        emptyInvalid.textContent = "验证后显示...";
        invalidList.appendChild(emptyInvalid);

        localStorage.removeItem(LS_KEY);
        showToast("已清空");
      }

      // Save state
      function saveState() {
        const state = {
          input: inputEl.value,
          type: currentType
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

            if (state.type) {
              currentType = state.type;
              document.querySelectorAll(".type-btn").forEach((btn) => {
                if (btn.dataset.type === state.type) {
                  btn.classList.add("active");
                } else {
                  btn.classList.remove("active");
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
      inputEl.addEventListener("input", saveState);

      // Load state on init
      loadState();
    
