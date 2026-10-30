// @ts-nocheck
// Generated from tools/calculator/unit-converter.html
// Source SHA-256: ce73dca04715fd2a4d6e881e20efdab2db26267f5c3877f43ecd6d44c9f77bca
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Unit Conversion Data
      // ============================================
      const units = {
        length: {
          name: "长度",
          base: "m",
          units: {
            km: { name: "千米", factor: 1000 },
            m: { name: "米", factor: 1 },
            dm: { name: "分米", factor: 0.1 },
            cm: { name: "厘米", factor: 0.01 },
            mm: { name: "毫米", factor: 0.001 },
            μm: { name: "微米", factor: 0.000001 },
            nm: { name: "纳米", factor: 0.000000001 },
            mi: { name: "英里", factor: 1609.344 },
            yd: { name: "码", factor: 0.9144 },
            ft: { name: "英尺", factor: 0.3048 },
            in: { name: "英寸", factor: 0.0254 },
            nmi: { name: "海里", factor: 1852 },
            li: { name: "里", factor: 500 },
            zhang: { name: "丈", factor: 10 / 3 },
            chi: { name: "尺", factor: 1 / 3 },
            cun: { name: "寸", factor: 1 / 30 }
          },
          quick: [
            { from: "km", to: "m", value: 1 },
            { from: "m", to: "cm", value: 1 },
            { from: "mi", to: "km", value: 1 },
            { from: "ft", to: "m", value: 1 },
            { from: "in", to: "cm", value: 1 },
            { from: "li", to: "km", value: 1 }
          ]
        },
        area: {
          name: "面积",
          base: "m2",
          units: {
            km2: { name: "平方千米", factor: 1000000 },
            ha: { name: "公顷", factor: 10000 },
            m2: { name: "平方米", factor: 1 },
            dm2: { name: "平方分米", factor: 0.01 },
            cm2: { name: "平方厘米", factor: 0.0001 },
            mm2: { name: "平方毫米", factor: 0.000001 },
            mi2: { name: "平方英里", factor: 2589988.11 },
            ac: { name: "英亩", factor: 4046.86 },
            ft2: { name: "平方英尺", factor: 0.092903 },
            in2: { name: "平方英寸", factor: 0.00064516 },
            mu: { name: "亩", factor: 666.67 },
            qing: { name: "顷", factor: 66666.67 }
          },
          quick: [
            { from: "km2", to: "m2", value: 1 },
            { from: "ha", to: "m2", value: 1 },
            { from: "mu", to: "m2", value: 1 },
            { from: "ac", to: "ha", value: 1 },
            { from: "ft2", to: "m2", value: 1 }
          ]
        },
        volume: {
          name: "体积",
          base: "l",
          units: {
            m3: { name: "立方米", factor: 1000 },
            l: { name: "升", factor: 1 },
            ml: { name: "毫升", factor: 0.001 },
            dm3: { name: "立方分米", factor: 1 },
            cm3: { name: "立方厘米", factor: 0.001 },
            mm3: { name: "立方毫米", factor: 0.000001 },
            gal: { name: "加仑(美)", factor: 3.78541 },
            qt: { name: "夸脱", factor: 0.946353 },
            pt: { name: "品脱", factor: 0.473176 },
            cup: { name: "杯", factor: 0.236588 },
            floz: { name: "液盎司", factor: 0.0295735 },
            tbsp: { name: "汤匙", factor: 0.0147868 },
            tsp: { name: "茶匙", factor: 0.00492892 }
          },
          quick: [
            { from: "m3", to: "l", value: 1 },
            { from: "l", to: "ml", value: 1 },
            { from: "gal", to: "l", value: 1 },
            { from: "cup", to: "ml", value: 1 }
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
            μg: { name: "微克", factor: 0.000000001 },
            lb: { name: "磅", factor: 0.453592 },
            oz: { name: "盎司", factor: 0.0283495 },
            st: { name: "英石", factor: 6.35029 },
            jin: { name: "斤", factor: 0.5 },
            liang: { name: "两", factor: 0.05 },
            qian: { name: "钱", factor: 0.005 },
            ct: { name: "克拉", factor: 0.0002 }
          },
          quick: [
            { from: "t", to: "kg", value: 1 },
            { from: "kg", to: "g", value: 1 },
            { from: "lb", to: "kg", value: 1 },
            { from: "kg", to: "jin", value: 1 },
            { from: "oz", to: "g", value: 1 }
          ]
        },
        temperature: {
          name: "温度",
          base: "c",
          units: {
            c: { name: "摄氏度 (°C)", special: true },
            f: { name: "华氏度 (°F)", special: true },
            k: { name: "开尔文 (K)", special: true }
          },
          quick: [
            { from: "c", to: "f", value: 0 },
            { from: "c", to: "f", value: 100 },
            { from: "f", to: "c", value: 32 },
            { from: "c", to: "k", value: 0 }
          ]
        },
        speed: {
          name: "速度",
          base: "mps",
          units: {
            mps: { name: "米/秒", factor: 1 },
            kph: { name: "千米/时", factor: 0.277778 },
            mph: { name: "英里/时", factor: 0.44704 },
            knot: { name: "节", factor: 0.514444 },
            mach: { name: "马赫", factor: 340.29 },
            c: { name: "光速", factor: 299792458 }
          },
          quick: [
            { from: "kph", to: "mps", value: 100 },
            { from: "mph", to: "kph", value: 60 },
            { from: "knot", to: "kph", value: 1 },
            { from: "mach", to: "kph", value: 1 }
          ]
        },
        time: {
          name: "时间",
          base: "s",
          units: {
            y: { name: "年", factor: 31536000 },
            mo: { name: "月", factor: 2592000 },
            w: { name: "周", factor: 604800 },
            d: { name: "天", factor: 86400 },
            h: { name: "小时", factor: 3600 },
            min: { name: "分钟", factor: 60 },
            s: { name: "秒", factor: 1 },
            ms: { name: "毫秒", factor: 0.001 },
            μs: { name: "微秒", factor: 0.000001 },
            ns: { name: "纳秒", factor: 0.000000001 }
          },
          quick: [
            { from: "d", to: "h", value: 1 },
            { from: "h", to: "min", value: 1 },
            { from: "min", to: "s", value: 1 },
            { from: "y", to: "d", value: 1 }
          ]
        },
        data: {
          name: "数据",
          base: "B",
          units: {
            bit: { name: "比特", factor: 0.125 },
            B: { name: "字节", factor: 1 },
            KB: { name: "千字节", factor: 1024 },
            MB: { name: "兆字节", factor: 1048576 },
            GB: { name: "吉字节", factor: 1073741824 },
            TB: { name: "太字节", factor: 1099511627776 },
            PB: { name: "拍字节", factor: 1125899906842624 },
            KiB: { name: "KiB", factor: 1024 },
            MiB: { name: "MiB", factor: 1048576 },
            GiB: { name: "GiB", factor: 1073741824 }
          },
          quick: [
            { from: "GB", to: "MB", value: 1 },
            { from: "MB", to: "KB", value: 1 },
            { from: "KB", to: "B", value: 1 },
            { from: "TB", to: "GB", value: 1 }
          ]
        }
      };

      let currentCategory = "length";

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Category Management
      // ============================================
      window.setCategory = function (category) {
        currentCategory = category;
        document.querySelectorAll(".category-tab").forEach((tab) => tab.classList.remove("active"));
        document
          .querySelector(`.category-tab[onclick="setCategory('${category}')"]`)
          .classList.add("active");

        updateUnits();
        convert("from");
        updateQuickValues();
      };

      // ============================================
      // Unit Update
      // ============================================
      function updateUnits() {
        const category = units[currentCategory];
        const fromSelect = document.getElementById("fromUnit");
        const toSelect = document.getElementById("toUnit");

        const options = Object.entries(category.units)
          .map(([key, unit]) => `<option value="${key}">${unit.name}</option>`)
          .join("");

        fromSelect.innerHTML = options;
        toSelect.innerHTML = options;

        const unitKeys = Object.keys(category.units);
        fromSelect.value = unitKeys[0];
        toSelect.value = unitKeys[1] || unitKeys[0];
      }

      // ============================================
      // Conversion Function
      // ============================================
      function convert(direction) {
        const category = units[currentCategory];
        const fromUnit = document.getElementById("fromUnit").value;
        const toUnit = document.getElementById("toUnit").value;
        const fromValue = parseFloat(document.getElementById("fromValue").value) || 0;
        const toValue = parseFloat(document.getElementById("toValue").value) || 0;

        let result;

        if (currentCategory === "temperature") {
          if (direction === "from") {
            result = convertTemperature(fromValue, fromUnit, toUnit);
            document.getElementById("toValue").value = formatNumber(result);
          } else {
            result = convertTemperature(toValue, toUnit, fromUnit);
            document.getElementById("fromValue").value = formatNumber(result);
          }
        } else {
          const fromFactor = category.units[fromUnit].factor;
          const toFactor = category.units[toUnit].factor;

          if (direction === "from") {
            result = (fromValue * fromFactor) / toFactor;
            document.getElementById("toValue").value = formatNumber(result);
          } else {
            result = (toValue * toFactor) / fromFactor;
            document.getElementById("fromValue").value = formatNumber(result);
          }
        }

        updateFormula();
      }

      // ============================================
      // Temperature Conversion
      // ============================================
      function convertTemperature(value, from, to) {
        let celsius;
        if (from === "c") celsius = value;
        else if (from === "f") celsius = ((value - 32) * 5) / 9;
        else if (from === "k") celsius = value - 273.15;

        if (to === "c") return celsius;
        if (to === "f") return (celsius * 9) / 5 + 32;
        if (to === "k") return celsius + 273.15;
      }

      // ============================================
      // Number Formatting
      // ============================================
      function formatNumber(num) {
        if (Math.abs(num) < 0.000001 || Math.abs(num) >= 1000000000) {
          return num.toExponential(6);
        }
        return parseFloat(num.toPrecision(10));
      }

      // ============================================
      // Formula Display
      // ============================================
      function updateFormula() {
        const category = units[currentCategory];
        const fromUnit = document.getElementById("fromUnit").value;
        const toUnit = document.getElementById("toUnit").value;
        const fromName = category.units[fromUnit].name;
        const toName = category.units[toUnit].name;

        if (currentCategory === "temperature") {
          document.getElementById("formula").textContent = "温度换算使用特殊公式";
        } else {
          const ratio = category.units[fromUnit].factor / category.units[toUnit].factor;
          document.getElementById("formula").textContent =
            `1 ${fromName} = ${formatNumber(ratio)} ${toName}`;
        }
      }

      // ============================================
      // Quick Values
      // ============================================
      function updateQuickValues() {
        const category = units[currentCategory];
        const quickGrid = document.getElementById("quickValues");

        quickGrid.innerHTML = category.quick
          .map((q) => {
            let result;
            if (currentCategory === "temperature") {
              result = convertTemperature(q.value, q.from, q.to);
            } else {
              result = (q.value * category.units[q.from].factor) / category.units[q.to].factor;
            }
            return `
              <div class="quick-item" onclick="setQuickValue('${q.from}', '${q.to}', ${q.value})">
                <div class="quick-item-value">${q.value}</div>
                <div class="quick-item-label">${category.units[q.from].name}<br>= ${formatNumber(result)} ${category.units[q.to].name}</div>
              </div>
            `;
          })
          .join("");
      }

      window.setQuickValue = function (from, to, value) {
        document.getElementById("fromUnit").value = from;
        document.getElementById("toUnit").value = to;
        document.getElementById("fromValue").value = value;
        convert("from");
      };

      // ============================================
      // Swap Units
      // ============================================
      window.swapUnits = function () {
        const fromUnit = document.getElementById("fromUnit");
        const toUnit = document.getElementById("toUnit");
        const fromValue = document.getElementById("fromValue");
        const toValue = document.getElementById("toValue");

        [fromUnit.value, toUnit.value] = [toUnit.value, fromUnit.value];
        [fromValue.value, toValue.value] = [toValue.value, fromValue.value];

        updateFormula();
      };

      // ============================================
      // Initialize
      // ============================================
      initTheme();
      updateUnits();
      convert("from");
      updateQuickValues();
    
