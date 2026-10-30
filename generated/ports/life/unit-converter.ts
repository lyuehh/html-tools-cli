// @ts-nocheck
// Generated from tools/life/unit-converter.html
// Source SHA-256: 8564216255edd085441da0e50ab3df1a27608e65d1dbc1190f2a214371d49143
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const units = {
        length: {
          name: "长度",
          base: "m",
          units: {
            km: { name: "千米", factor: 1000 },
            m: { name: "米", factor: 1 },
            cm: { name: "厘米", factor: 0.01 },
            mm: { name: "毫米", factor: 0.001 },
            mi: { name: "英里", factor: 1609.344 },
            yd: { name: "码", factor: 0.9144 },
            ft: { name: "英尺", factor: 0.3048 },
            in: { name: "英寸", factor: 0.0254 }
          },
          quick: [
            { from: 1, fromUnit: "km", toUnit: "m" },
            { from: 1, fromUnit: "mi", toUnit: "km" },
            { from: 1, fromUnit: "m", toUnit: "ft" },
            { from: 1, fromUnit: "in", toUnit: "cm" }
          ]
        },
        weight: {
          name: "重量",
          base: "kg",
          units: {
            t: { name: "吨", factor: 1000 },
            kg: { name: "千克", factor: 1 },
            g: { name: "克", factor: 0.001 },
            mg: { name: "毫克", factor: 0.000001 },
            lb: { name: "磅", factor: 0.453592 },
            oz: { name: "盎司", factor: 0.0283495 },
            jin: { name: "斤", factor: 0.5 },
            liang: { name: "两", factor: 0.05 }
          },
          quick: [
            { from: 1, fromUnit: "kg", toUnit: "lb" },
            { from: 1, fromUnit: "kg", toUnit: "jin" },
            { from: 1, fromUnit: "oz", toUnit: "g" },
            { from: 1, fromUnit: "t", toUnit: "kg" }
          ]
        },
        area: {
          name: "面积",
          base: "m2",
          units: {
            km2: { name: "平方千米", factor: 1000000 },
            ha: { name: "公顷", factor: 10000 },
            m2: { name: "平方米", factor: 1 },
            cm2: { name: "平方厘米", factor: 0.0001 },
            mi2: { name: "平方英里", factor: 2589988.11 },
            ac: { name: "英亩", factor: 4046.86 },
            ft2: { name: "平方英尺", factor: 0.092903 },
            mu: { name: "亩", factor: 666.67 }
          },
          quick: [
            { from: 1, fromUnit: "km2", toUnit: "ha" },
            { from: 1, fromUnit: "ha", toUnit: "mu" },
            { from: 1, fromUnit: "m2", toUnit: "ft2" },
            { from: 1, fromUnit: "ac", toUnit: "m2" }
          ]
        },
        volume: {
          name: "体积",
          base: "l",
          units: {
            m3: { name: "立方米", factor: 1000 },
            l: { name: "升", factor: 1 },
            ml: { name: "毫升", factor: 0.001 },
            gal: { name: "加仑(美)", factor: 3.78541 },
            qt: { name: "夸脱", factor: 0.946353 },
            pt: { name: "品脱", factor: 0.473176 },
            cup: { name: "杯", factor: 0.236588 },
            floz: { name: "液盎司", factor: 0.0295735 }
          },
          quick: [
            { from: 1, fromUnit: "l", toUnit: "ml" },
            { from: 1, fromUnit: "gal", toUnit: "l" },
            { from: 1, fromUnit: "m3", toUnit: "l" },
            { from: 1, fromUnit: "cup", toUnit: "ml" }
          ]
        },
        speed: {
          name: "速度",
          base: "mps",
          units: {
            kmh: { name: "千米/时", factor: 0.277778 },
            mps: { name: "米/秒", factor: 1 },
            mph: { name: "英里/时", factor: 0.44704 },
            kn: { name: "节", factor: 0.514444 },
            fps: { name: "英尺/秒", factor: 0.3048 },
            mach: { name: "马赫", factor: 340.29 }
          },
          quick: [
            { from: 100, fromUnit: "kmh", toUnit: "mph" },
            { from: 1, fromUnit: "mps", toUnit: "kmh" },
            { from: 1, fromUnit: "kn", toUnit: "kmh" },
            { from: 1, fromUnit: "mach", toUnit: "kmh" }
          ]
        },
        data: {
          name: "数据",
          base: "B",
          units: {
            TB: { name: "TB", factor: 1099511627776 },
            GB: { name: "GB", factor: 1073741824 },
            MB: { name: "MB", factor: 1048576 },
            KB: { name: "KB", factor: 1024 },
            B: { name: "字节", factor: 1 },
            bit: { name: "比特", factor: 0.125 }
          },
          quick: [
            { from: 1, fromUnit: "GB", toUnit: "MB" },
            { from: 1, fromUnit: "TB", toUnit: "GB" },
            { from: 1, fromUnit: "MB", toUnit: "KB" },
            { from: 8, fromUnit: "bit", toUnit: "B" }
          ]
        }
      };

      let currentCategory = "length";

      function setCategory(cat, btn) {
        currentCategory = cat;
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        if (btn) btn.classList.add("active");

        const catData = units[cat];
        const fromSelect = document.getElementById("fromUnit");
        const toSelect = document.getElementById("toUnit");

        const options = Object.entries(catData.units)
          .map(([key, val]) => `<option value="${key}">${val.name}</option>`)
          .join("");

        fromSelect.innerHTML = options;
        toSelect.innerHTML = options;

        // Set default selections
        const unitKeys = Object.keys(catData.units);
        fromSelect.value = unitKeys[1] || unitKeys[0];
        toSelect.value = unitKeys[2] || unitKeys[1] || unitKeys[0];

        convert();
        updateQuickList();
      }

      function convert() {
        const catData = units[currentCategory];
        const fromValue = parseFloat(document.getElementById("fromValue").value) || 0;
        const fromUnit = document.getElementById("fromUnit").value;
        const toUnit = document.getElementById("toUnit").value;

        const fromFactor = catData.units[fromUnit].factor;
        const toFactor = catData.units[toUnit].factor;

        const result = (fromValue * fromFactor) / toFactor;

        document.getElementById("toValue").value = formatNumber(result);
        document.getElementById("resultValue").textContent = formatNumber(result);
        document.getElementById("resultUnit").textContent =
          `${fromValue} ${catData.units[fromUnit].name} = ${formatNumber(result)} ${catData.units[toUnit].name}`;
      }

      function formatNumber(num) {
        if (Math.abs(num) < 0.0001 || Math.abs(num) >= 1000000) {
          return num.toExponential(4);
        }
        return parseFloat(num.toPrecision(8)).toString();
      }

      function swapUnits() {
        const fromSelect = document.getElementById("fromUnit");
        const toSelect = document.getElementById("toUnit");
        const fromValue = document.getElementById("fromValue");
        const toValue = document.getElementById("toValue");

        [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
        fromValue.value = toValue.value;
        convert();
      }

      function updateQuickList() {
        const catData = units[currentCategory];
        const list = document.getElementById("quickList");

        list.innerHTML = catData.quick
          .map((q) => {
            const result =
              (q.from * catData.units[q.fromUnit].factor) / catData.units[q.toUnit].factor;
            return `
          <div class="conversion-item">
            <span class="label">${q.from} ${catData.units[q.fromUnit].name}</span>
            <span class="value">= ${formatNumber(result)} ${catData.units[q.toUnit].name}</span>
          </div>
        `;
          })
          .join("");
      }

      setCategory("length");

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        const themeToggle = document.querySelector(".theme-toggle");
        if (themeToggle) themeToggle.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const themeToggle = document.querySelector(".theme-toggle");
          if (themeToggle) themeToggle.textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
