// @ts-nocheck
// Generated from tools/converter/area-converter.html
// Source SHA-256: 3394a45e9bd3685c164b0b6c87fb1e1f2702e535b4bf45f5bd429ab4c7024ecd
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const units = {
        sqkm: { name: "平方千米", factor: 1000000, category: "metric" },
        ha: { name: "公顷", factor: 10000, category: "metric" },
        sqm: { name: "平方米", factor: 1, category: "metric" },
        sqcm: { name: "平方厘米", factor: 0.0001, category: "metric" },
        sqmi: { name: "平方英里", factor: 2589988.11, category: "imperial" },
        acre: { name: "英亩", factor: 4046.86, category: "imperial" },
        sqft: { name: "平方英尺", factor: 0.0929, category: "imperial" },
        sqin: { name: "平方英寸", factor: 0.00064516, category: "imperial" },
        qing: { name: "顷", factor: 66666.67, category: "chinese" },
        mu: { name: "亩", factor: 666.667, category: "chinese" },
        fen: { name: "分", factor: 66.667, category: "chinese" }
      };

      function setQuick(val, unit) {
        document.getElementById("valueInput").value = val;
        document.getElementById("unitSelect").value = unit;
        convert();
      }

      function convert() {
        const value = parseFloat(document.getElementById("valueInput").value) || 0;
        const fromUnit = document.getElementById("unitSelect").value;
        const sqm = value * units[fromUnit].factor;

        function render(unitList, containerId) {
          document.getElementById(containerId).innerHTML = unitList
            .map((u) => {
              const result = sqm / units[u].factor;
              return `<div class="result-row ${u === fromUnit ? "highlight" : ""}">
                        <span>${units[u].name}</span>
                        <span style="font-weight:bold;font-family:monospace">${formatNum(result)}</span>
                    </div>`;
            })
            .join("");
        }

        render(["sqkm", "ha", "sqm", "sqcm"], "metricResults");
        render(["sqmi", "acre", "sqft", "sqin"], "imperialResults");
        render(["qing", "mu", "fen"], "chineseResults");
      }

      function formatNum(n) {
        if (Math.abs(n) >= 1e6 || (Math.abs(n) < 0.0001 && n !== 0)) return n.toExponential(4);
        return Number.isInteger(n) ? n : n.toFixed(4).replace(/\.?0+$/, "");
      }

      convert();
    
