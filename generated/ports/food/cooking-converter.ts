// @ts-nocheck
// Generated from tools/food/cooking-converter.html
// Source SHA-256: d89c83fb35619bf9ec0748d830099f1cc435e6ebf4ba0917a1ebcd68cb20c2ec
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const units = {
        volume: [
          { id: "tsp", name: "茶匙 (tsp)", toMl: 5 },
          { id: "tbsp", name: "汤匙 (tbsp)", toMl: 15 },
          { id: "cup_us", name: "杯 (美式)", toMl: 240 },
          { id: "cup_metric", name: "杯 (公制)", toMl: 250 },
          { id: "ml", name: "毫升 (ml)", toMl: 1 },
          { id: "l", name: "升 (L)", toMl: 1000 },
          { id: "fl_oz", name: "液体盎司", toMl: 29.5735 }
        ],
        weight: [
          { id: "g", name: "克 (g)", toG: 1 },
          { id: "kg", name: "千克 (kg)", toG: 1000 },
          { id: "oz", name: "盎司 (oz)", toG: 28.3495 },
          { id: "lb", name: "磅 (lb)", toG: 453.592 },
          { id: "jin", name: "斤", toG: 500 },
          { id: "liang", name: "两", toG: 50 }
        ],
        temp: [
          { id: "c", name: "摄氏度 (°C)" },
          { id: "f", name: "华氏度 (°F)" },
          { id: "gas", name: "燃气刻度" }
        ]
      };

      let currentCategory = "volume";

      function setCategory(cat) {
        currentCategory = cat;
        document.querySelectorAll(".tab-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.cat === cat);
        });
        populateSelects();
        convert();
      }

      function populateSelects() {
        const fromSelect = document.getElementById("fromUnit");
        const toSelect = document.getElementById("toUnit");
        const unitList = units[currentCategory];

        while (fromSelect.firstChild) fromSelect.removeChild(fromSelect.firstChild);
        while (toSelect.firstChild) toSelect.removeChild(toSelect.firstChild);

        unitList.forEach(function (unit, index) {
          const opt1 = document.createElement("option");
          opt1.value = unit.id;
          opt1.textContent = unit.name;
          fromSelect.appendChild(opt1);

          const opt2 = document.createElement("option");
          opt2.value = unit.id;
          opt2.textContent = unit.name;
          toSelect.appendChild(opt2);
        });

        if (unitList.length > 1) {
          toSelect.selectedIndex = 1;
        }
      }

      function swapUnits() {
        const fromSelect = document.getElementById("fromUnit");
        const toSelect = document.getElementById("toUnit");
        const temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;
        convert();
      }

      function convert() {
        const value = parseFloat(document.getElementById("inputValue").value) || 0;
        const fromId = document.getElementById("fromUnit").value;
        const toId = document.getElementById("toUnit").value;

        let result = 0;
        const unitList = units[currentCategory];
        const fromUnit = unitList.find(function (u) {
          return u.id === fromId;
        });
        const toUnit = unitList.find(function (u) {
          return u.id === toId;
        });

        if (currentCategory === "volume") {
          const ml = value * fromUnit.toMl;
          result = ml / toUnit.toMl;
        } else if (currentCategory === "weight") {
          const g = value * fromUnit.toG;
          result = g / toUnit.toG;
        } else if (currentCategory === "temp") {
          result = convertTemp(value, fromId, toId);
        }

        const formatted =
          result % 1 === 0 ? result.toString() : result.toFixed(4).replace(/\.?0+$/, "");
        document.getElementById("outputValue").value = formatted;
        document.getElementById("resultDisplay").textContent =
          value + " " + fromUnit.name + " = " + formatted + " " + toUnit.name;
      }

      function convertTemp(value, from, to) {
        let celsius;
        if (from === "c") celsius = value;
        else if (from === "f") celsius = ((value - 32) * 5) / 9;
        else if (from === "gas") celsius = gasToC(value);

        if (to === "c") return celsius;
        if (to === "f") return (celsius * 9) / 5 + 32;
        if (to === "gas") return cToGas(celsius);
      }

      function gasToC(gas) {
        const marks = {
          0.25: 110,
          0.5: 120,
          1: 140,
          2: 150,
          3: 160,
          4: 180,
          5: 190,
          6: 200,
          7: 220,
          8: 230,
          9: 240,
          10: 260
        };
        return marks[gas] || 180;
      }

      function cToGas(c) {
        if (c <= 110) return 0.25;
        if (c <= 120) return 0.5;
        if (c <= 140) return 1;
        if (c <= 150) return 2;
        if (c <= 160) return 3;
        if (c <= 180) return 4;
        if (c <= 190) return 5;
        if (c <= 200) return 6;
        if (c <= 220) return 7;
        if (c <= 230) return 8;
        if (c <= 240) return 9;
        return 10;
      }

      populateSelects();
      convert();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
