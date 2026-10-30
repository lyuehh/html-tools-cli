// @ts-nocheck
// Generated from tools/converter/unit-converter.html
// Source SHA-256: 47b202fb85405440dafb5f9746bb00783244d307c88ddf6def56d9b93c2809b1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const categories = {
        length: {
          name: "长度",
          units: [
            { id: "m", name: "米 (m)", factor: 1 },
            { id: "km", name: "千米 (km)", factor: 0.001 },
            { id: "cm", name: "厘米 (cm)", factor: 100 },
            { id: "mm", name: "毫米 (mm)", factor: 1000 },
            { id: "mile", name: "英里 (mi)", factor: 0.000621371 },
            { id: "yard", name: "码 (yd)", factor: 1.09361 },
            { id: "foot", name: "英尺 (ft)", factor: 3.28084 },
            { id: "inch", name: "英寸 (in)", factor: 39.3701 }
          ]
        },
        weight: {
          name: "重量",
          units: [
            { id: "kg", name: "千克 (kg)", factor: 1 },
            { id: "g", name: "克 (g)", factor: 1000 },
            { id: "mg", name: "毫克 (mg)", factor: 1000000 },
            { id: "lb", name: "磅 (lb)", factor: 2.20462 },
            { id: "oz", name: "盎司 (oz)", factor: 35.274 },
            { id: "ton", name: "吨 (t)", factor: 0.001 },
            { id: "stone", name: "英石 (st)", factor: 0.157473 }
          ]
        },
        temperature: {
          name: "温度",
          units: [
            { id: "celsius", name: "摄氏度 (°C)", isTemp: true },
            { id: "fahrenheit", name: "华氏度 (°F)", isTemp: true },
            { id: "kelvin", name: "开尔文 (K)", isTemp: true }
          ]
        },
        speed: {
          name: "速度",
          units: [
            { id: "mps", name: "米/秒 (m/s)", factor: 1 },
            { id: "kmph", name: "千米/时 (km/h)", factor: 3.6 },
            { id: "mph", name: "英里/时 (mph)", factor: 2.23694 },
            { id: "knot", name: "节 (kn)", factor: 1.94384 },
            { id: "fps", name: "英尺/秒 (ft/s)", factor: 3.28084 }
          ]
        },
        area: {
          name: "面积",
          units: [
            { id: "sqm", name: "平方米 (m²)", factor: 1 },
            { id: "sqkm", name: "平方千米 (km²)", factor: 0.000001 },
            { id: "sqft", name: "平方英尺 (ft²)", factor: 10.7639 },
            { id: "sqmi", name: "平方英里 (mi²)", factor: 0.000000386102 },
            { id: "acre", name: "英亩 (ac)", factor: 0.000247105 },
            { id: "hectare", name: "公顷 (ha)", factor: 0.0001 }
          ]
        },
        volume: {
          name: "体积",
          units: [
            { id: "liter", name: "升 (L)", factor: 1 },
            { id: "ml", name: "毫升 (mL)", factor: 1000 },
            { id: "gallon", name: "加仑 (gal)", factor: 0.264172 },
            { id: "quart", name: "夸脱 (qt)", factor: 1.05669 },
            { id: "pint", name: "品脱 (pt)", factor: 2.11338 },
            { id: "cup", name: "杯 (cup)", factor: 4.22675 },
            { id: "cubicm", name: "立方米 (m³)", factor: 0.001 }
          ]
        }
      };

      const inputValueEl = document.getElementById("inputValue");
      const fromUnitEl = document.getElementById("fromUnit");
      const toUnitEl = document.getElementById("toUnit");
      const resultValueEl = document.getElementById("resultValue");
      const resultUnitEl = document.getElementById("resultUnit");
      const statusEl = document.getElementById("status");
      let currentCategory = "length";

      function populateUnits() {
        const category = categories[currentCategory];
        fromUnitEl.innerHTML = "";
        toUnitEl.innerHTML = "";

        category.units.forEach(function (unit) {
          const option1 = document.createElement("option");
          option1.value = unit.id;
          option1.textContent = unit.name;
          fromUnitEl.appendChild(option1);

          const option2 = document.createElement("option");
          option2.value = unit.id;
          option2.textContent = unit.name;
          toUnitEl.appendChild(option2);
        });

        // Set sensible defaults
        if (category.units.length >= 2) {
          fromUnitEl.value = category.units[0].id;
          toUnitEl.value = category.units[1].id;
        }
      }

      function convertTemperature(value, from, to) {
        let celsius;

        // Convert to Celsius first
        if (from === "celsius") {
          celsius = value;
        } else if (from === "fahrenheit") {
          celsius = ((value - 32) * 5) / 9;
        } else if (from === "kelvin") {
          celsius = value - 273.15;
        }

        // Convert from Celsius to target
        if (to === "celsius") {
          return celsius;
        } else if (to === "fahrenheit") {
          return (celsius * 9) / 5 + 32;
        } else if (to === "kelvin") {
          return celsius + 273.15;
        }
      }

      function convert() {
        const value = parseFloat(inputValueEl.value);
        const fromUnitId = fromUnitEl.value;
        const toUnitId = toUnitEl.value;

        if (isNaN(value)) {
          showStatus("请输入有效数值", "error");
          return;
        }

        if (fromUnitId === toUnitId) {
          resultValueEl.textContent = value.toFixed(4);
          resultUnitEl.textContent = "单位相同";
          showStatus("单位相同，无需转换");
          return;
        }

        const category = categories[currentCategory];
        const fromUnit = category.units.find((u) => u.id === fromUnitId);
        const toUnit = category.units.find((u) => u.id === toUnitId);

        if (!fromUnit || !toUnit) {
          showStatus("单位选择错误", "error");
          return;
        }

        let result;
        if (fromUnit.isTemp && toUnit.isTemp) {
          result = convertTemperature(value, fromUnitId, toUnitId);
        } else {
          // Convert to base unit then to target
          const baseValue = value / fromUnit.factor;
          result = baseValue * toUnit.factor;
        }

        resultValueEl.textContent = result.toFixed(4);
        resultUnitEl.textContent = toUnit.name;
        showStatus("转换成功", "success");
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      window.swapUnits = function () {
        const temp = fromUnitEl.value;
        fromUnitEl.value = toUnitEl.value;
        toUnitEl.value = temp;
        convert();
      };

      function reset() {
        inputValueEl.value = "1";
        populateUnits();
        resultValueEl.textContent = "-";
        resultUnitEl.textContent = "";
        statusEl.textContent = "";
      }

      document.querySelectorAll(".category-tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
          document.querySelectorAll(".category-tab").forEach(function (t) {
            t.classList.remove("active");
          });
          tab.classList.add("active");
          currentCategory = tab.getAttribute("data-category");
          populateUnits();
          convert();
        });
      });

      document.getElementById("btnConvert").onclick = convert;
      document.getElementById("btnSwap").onclick = swapUnits;
      document.getElementById("btnClear").onclick = reset;

      inputValueEl.addEventListener("input", convert);
      fromUnitEl.addEventListener("change", convert);
      toUnitEl.addEventListener("change", convert);

      // Initialize
      populateUnits();
      convert();

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
    
