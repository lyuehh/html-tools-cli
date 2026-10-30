// @ts-nocheck
// Generated from tools/converter/length-converter.html
// Source SHA-256: 3794e56ebf17ec9147f452963f47e59b520caf0fffddc226459a6d849711459e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // All units in meters
      const units = {
        // Metric
        km: { name: "千米", factor: 1000, category: "metric" },
        m: { name: "米", factor: 1, category: "metric" },
        cm: { name: "厘米", factor: 0.01, category: "metric" },
        mm: { name: "毫米", factor: 0.001, category: "metric" },
        um: { name: "微米", factor: 0.000001, category: "metric" },
        // Imperial
        mi: { name: "英里", factor: 1609.344, category: "imperial" },
        yd: { name: "码", factor: 0.9144, category: "imperial" },
        ft: { name: "英尺", factor: 0.3048, category: "imperial" },
        in: { name: "英寸", factor: 0.0254, category: "imperial" },
        // Chinese
        li: { name: "里", factor: 500, category: "chinese" },
        zhang: { name: "丈", factor: 3.33333, category: "chinese" },
        chi: { name: "尺", factor: 0.33333, category: "chinese" },
        cun: { name: "寸", factor: 0.03333, category: "chinese" }
      };

      let currentCategory = "all";

      function setCategory(cat) {
        currentCategory = cat;
        document.querySelectorAll(".cat-btn").forEach((btn) => {
          btn.classList.toggle(
            "active",
            btn.textContent.includes(
              cat === "metric"
                ? "公制"
                : cat === "imperial"
                  ? "英制"
                  : cat === "chinese"
                    ? "市制"
                    : "全部"
            )
          );
        });

        // Show/hide sections
        document.querySelectorAll(".results").forEach((r) => (r.style.display = "none"));
        document.querySelectorAll("h3").forEach((h) => (h.style.display = "none"));

        if (cat === "all" || cat === "metric") {
          document.getElementById("metricResults").style.display = "grid";
          document.querySelectorAll("h3")[0].style.display = "block";
        }
        if (cat === "all" || cat === "imperial") {
          document.getElementById("imperialResults").style.display = "grid";
          document.querySelectorAll("h3")[1].style.display = "block";
        }
        if (cat === "all" || cat === "chinese") {
          document.getElementById("chineseResults").style.display = "grid";
          document.querySelectorAll("h3")[2].style.display = "block";
        }

        convert();
      }

      function convert() {
        const value = parseFloat(document.getElementById("valueInput").value) || 0;
        const fromUnit = document.getElementById("unitSelect").value;

        // Convert to meters first
        const meters = value * units[fromUnit].factor;

        // Generate results by category
        const metricUnits = ["km", "m", "cm", "mm"];
        const imperialUnits = ["mi", "yd", "ft", "in"];
        const chineseUnits = ["li", "zhang", "chi", "cun"];

        function renderResults(unitList, containerId) {
          const container = document.getElementById(containerId);
          container.innerHTML = unitList
            .map((u) => {
              const result = meters / units[u].factor;
              const isHighlight = u === fromUnit;
              return `
                        <div class="result-row ${isHighlight ? "highlight" : ""}">
                            <span class="result-unit">${units[u].name} (${u})</span>
                            <span class="result-value">${formatNumber(result)}</span>
                        </div>
                    `;
            })
            .join("");
        }

        renderResults(metricUnits, "metricResults");
        renderResults(imperialUnits, "imperialResults");
        renderResults(chineseUnits, "chineseResults");
      }

      function formatNumber(num) {
        if (Math.abs(num) >= 1000000 || (Math.abs(num) < 0.0001 && num !== 0)) {
          return num.toExponential(4);
        }
        if (Number.isInteger(num)) return num.toString();
        return num.toFixed(6).replace(/\.?0+$/, "");
      }

      setCategory("all");
    
