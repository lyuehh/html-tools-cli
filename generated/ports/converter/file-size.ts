// @ts-nocheck
// Generated from tools/converter/file-size.html
// Source SHA-256: 5c16bb200c9f9488c7437868adc3453d142ef665aeaea428ece02efdfc348d0a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const units = {
        // Decimal units (base 1000)
        B: { name: "字节 (B)", factor: 1, type: "decimal" },
        KB: { name: "千字节 (KB)", factor: 1000, type: "decimal" },
        MB: { name: "兆字节 (MB)", factor: 1000000, type: "decimal" },
        GB: { name: "吉字节 (GB)", factor: 1000000000, type: "decimal" },
        TB: { name: "太字节 (TB)", factor: 1000000000000, type: "decimal" },
        PB: { name: "拍字节 (PB)", factor: 1000000000000000, type: "decimal" },
        EB: { name: "艾字节 (EB)", factor: 1000000000000000000, type: "decimal" },

        // Binary units (base 1024)
        KiB: { name: "二进制千字节 (KiB)", factor: 1024, type: "binary" },
        MiB: { name: "二进制兆字节 (MiB)", factor: 1048576, type: "binary" },
        GiB: { name: "二进制吉字节 (GiB)", factor: 1073741824, type: "binary" },
        TiB: { name: "二进制太字节 (TiB)", factor: 1099511627776, type: "binary" },
        PiB: { name: "二进制拍字节 (PiB)", factor: 1125899906842624, type: "binary" },
        EiB: { name: "二进制艾字节 (EiB)", factor: 1152921504606846976, type: "binary" }
      };

      const inputValueEl = document.getElementById("inputValue");
      const inputUnitEl = document.getElementById("inputUnit");
      const conversionTypeEl = document.getElementById("conversionType");
      const resultsGridEl = document.getElementById("resultsGrid");
      const statusEl = document.getElementById("status");

      window.formatFileSize = function (bytes) {
        if (bytes === 0) return "0 B";

        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
      };

      window.calculate = function () {
        const value = parseFloat(inputValueEl.value);
        const inputUnit = inputUnitEl.value;
        const conversionType = conversionTypeEl.value;

        if (isNaN(value) || value < 0) {
          showStatus("请输入有效大小", "error");
          return;
        }

        if (!units[inputUnit]) {
          showStatus("单位无效", "error");
          return;
        }

        // Convert to bytes first
        const bytes = value * units[inputUnit].factor;

        // Clear previous results
        resultsGridEl.innerHTML = "";

        // Calculate for all relevant units
        Object.entries(units).forEach(function ([unitId, unit]) {
          if (conversionType !== "all" && unit.type !== conversionType) {
            return;
          }

          const converted = bytes / unit.factor;
          const resultCard = document.createElement("div");
          resultCard.className = "result-card";
          resultCard.innerHTML =
            '<div class="result-value">' +
            converted.toFixed(4) +
            "</div>" +
            '<div class="result-label">' +
            unit.name +
            "</div>";
          resultsGridEl.appendChild(resultCard);
        });

        showStatus("计算完成", "success");
      };

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function reset() {
        inputValueEl.value = "1";
        inputUnitEl.value = "KB";
        conversionTypeEl.value = "decimal";
        resultsGridEl.innerHTML = "";
        statusEl.textContent = "";
      }

      document.getElementById("btnCalculate").onclick = calculate;
      document.getElementById("btnClear").onclick = reset;

      inputValueEl.addEventListener("input", calculate);
      inputUnitEl.addEventListener("change", calculate);
      conversionTypeEl.addEventListener("change", calculate);

      // Initial calculation
      calculate();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
