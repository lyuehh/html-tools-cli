// @ts-nocheck
// Generated from tools/converter/weight-converter.html
// Source SHA-256: 9576491df8a3e31e2b37140540b755069e2759160e9ddd059f68b215b75edbb4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        var units = {
          t: { name: "吨 (t)", factor: 1000000 },
          kg: { name: "千克 (kg)", factor: 1000 },
          g: { name: "克 (g)", factor: 1 },
          mg: { name: "毫克 (mg)", factor: 0.001 },
          lb: { name: "磅 (lb)", factor: 453.592 },
          oz: { name: "盎司 (oz)", factor: 28.3495 },
          st: { name: "英石 (st)", factor: 6350.29 },
          jin: { name: "斤", factor: 500 },
          liang: { name: "两", factor: 50 },
          qian: { name: "钱", factor: 5 }
        };

        var valueEl = document.getElementById("valueInput");
        var unitEl = document.getElementById("unitSelect");

        function formatNum(n) {
          if (Math.abs(n) >= 1e6 || (Math.abs(n) < 0.0001 && n !== 0)) {
            return n.toExponential(4);
          }
          return Number.isInteger(n) ? String(n) : n.toFixed(4).replace(/\.?0+$/, "");
        }

        function render(keys, containerId, grams, fromUnit) {
          document.getElementById(containerId).innerHTML = keys
            .map(function (u) {
              var result = grams / units[u].factor;
              return (
                '<div class="row' +
                (u === fromUnit ? " highlight" : "") +
                '"><span class="unit">' +
                units[u].name +
                '</span><span class="val">' +
                formatNum(result) +
                "</span></div>"
              );
            })
            .join("");
        }

        function convert() {
          var value = parseFloat(valueEl.value) || 0;
          var fromUnit = unitEl.value;
          var grams = value * units[fromUnit].factor;
          render(["t", "kg", "g", "mg"], "metricResults", grams, fromUnit);
          render(["lb", "oz", "st"], "imperialResults", grams, fromUnit);
          render(["jin", "liang", "qian"], "chineseResults", grams, fromUnit);
        }

        valueEl.addEventListener("input", convert);
        unitEl.addEventListener("change", convert);

        document.getElementById("quick").addEventListener("click", function (e) {
          var btn = e.target.closest("button");
          if (!btn) return;
          valueEl.value = btn.dataset.v;
          unitEl.value = btn.dataset.u;
          convert();
        });

        convert();
      })();
    
