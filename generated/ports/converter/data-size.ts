// @ts-nocheck
// Generated from tools/converter/data-size.html
// Source SHA-256: 34cc2f246ee1c89e92ef6febba4c6da5844c023a6e9c686ea69b2cd8edec0fe6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const units = {
        b: { name: "比特 (bit)", toBytes: 1 / 8, category: "decimal" },
        B: { name: "字节 (Byte)", toBytes: 1, category: "decimal" },
        KB: { name: "千字节 (KB)", toBytes: 1e3, category: "decimal" },
        MB: { name: "兆字节 (MB)", toBytes: 1e6, category: "decimal" },
        GB: { name: "吉字节 (GB)", toBytes: 1e9, category: "decimal" },
        TB: { name: "太字节 (TB)", toBytes: 1e12, category: "decimal" },
        PB: { name: "拍字节 (PB)", toBytes: 1e15, category: "decimal" },
        KiB: { name: "KiB (1024)", toBytes: 1024, category: "binary" },
        MiB: { name: "MiB (1024²)", toBytes: Math.pow(1024, 2), category: "binary" },
        GiB: { name: "GiB (1024³)", toBytes: Math.pow(1024, 3), category: "binary" },
        TiB: { name: "TiB (1024⁴)", toBytes: Math.pow(1024, 4), category: "binary" },
        PiB: { name: "PiB (1024⁵)", toBytes: Math.pow(1024, 5), category: "binary" }
      };

      function convert() {
        const value = parseFloat(document.getElementById("inputValue").value) || 0;
        const fromUnit = document.getElementById("inputUnit").value;
        const bytes = value * units[fromUnit].toBytes;

        const categories = {
          decimal: document.getElementById("decimalResults"),
          binary: document.getElementById("binaryResults")
        };

        Object.values(categories).forEach((el) => (el.innerHTML = ""));

        Object.entries(units).forEach(([key, unit]) => {
          const result = bytes / unit.toBytes;
          const formatted = formatNumber(result);
          const html = `
                    <div class="result-item" onclick="copyValue('${formatted}')">
                        <div class="unit">${unit.name}</div>
                        <div class="value">${formatted}</div>
                    </div>
                `;
          categories[unit.category].innerHTML += html;
        });
      }

      function formatNumber(num) {
        if (num === 0) return "0";
        if (Math.abs(num) >= 1e15 || Math.abs(num) < 1e-6) {
          return num.toExponential(4);
        }
        if (Number.isInteger(num) && num < 1e12) return num.toLocaleString();
        return parseFloat(num.toPrecision(10)).toLocaleString();
      }

      window.copyValue = function (value) {
        navigator.clipboard.writeText(value.replace(/,/g, ""));
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      };

      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) document.documentElement.setAttribute("data-theme", saved);
        convert();
      })();
    
