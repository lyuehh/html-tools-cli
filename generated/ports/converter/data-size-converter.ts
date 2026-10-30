// @ts-nocheck
// Generated from tools/converter/data-size-converter.html
// Source SHA-256: 96e8dc8e64f5e7c0daba0adf8c6e85814884587f99be02c1aecc79bcca0c77f3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const decimalUnits = {
        KB: { name: "KB (千字节)", factor: 1e3 },
        MB: { name: "MB (兆字节)", factor: 1e6 },
        GB: { name: "GB (吉字节)", factor: 1e9 },
        TB: { name: "TB (太字节)", factor: 1e12 },
        PB: { name: "PB (拍字节)", factor: 1e15 }
      };

      const binaryUnits = {
        KiB: { name: "KiB (千比字节)", factor: 1024 },
        MiB: { name: "MiB (兆比字节)", factor: 1024 ** 2 },
        GiB: { name: "GiB (吉比字节)", factor: 1024 ** 3 },
        TiB: { name: "TiB (太比字节)", factor: 1024 ** 4 },
        PiB: { name: "PiB (拍比字节)", factor: 1024 ** 5 }
      };

      const baseUnits = {
        b: { name: "Bit (位)", factor: 1 / 8 },
        B: { name: "Byte (字节)", factor: 1 }
      };

      function convert() {
        const value = parseFloat(document.getElementById("inputValue").value) || 0;
        const unit = document.getElementById("inputUnit").value;

        let bytes;
        if (baseUnits[unit]) bytes = value * baseUnits[unit].factor;
        else if (decimalUnits[unit]) bytes = value * decimalUnits[unit].factor;
        else if (binaryUnits[unit]) bytes = value * binaryUnits[unit].factor;

        const format = (n) =>
          n < 0.0001 || n > 1e15
            ? n.toExponential(4)
            : n.toLocaleString("en-US", { maximumFractionDigits: 6 });

        let html = "";
        for (const [key, data] of Object.entries(decimalUnits)) {
          const result = bytes / data.factor;
          html += `<div class="result-item" onclick="copyValue('${result}')"><div class="unit">${data.name}</div><div class="value">${format(result)}</div></div>`;
        }
        document.getElementById("decimal-results").innerHTML = html;

        html = "";
        for (const [key, data] of Object.entries(binaryUnits)) {
          const result = bytes / data.factor;
          html += `<div class="result-item" onclick="copyValue('${result}')"><div class="unit">${data.name}</div><div class="value">${format(result)}</div></div>`;
        }
        document.getElementById("binary-results").innerHTML = html;

        html = "";
        for (const [key, data] of Object.entries(baseUnits)) {
          const result = bytes / data.factor;
          html += `<div class="result-item" onclick="copyValue('${result}')"><div class="unit">${data.name}</div><div class="value">${format(result)}</div></div>`;
        }
        document.getElementById("base-results").innerHTML = html;
      }

      window.copyValue = function (v) {
        navigator.clipboard.writeText(v);
        document.getElementById("toast").classList.add("show");
        setTimeout(() => document.getElementById("toast").classList.remove("show"), 2000);
      };
      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
      convert();
    
