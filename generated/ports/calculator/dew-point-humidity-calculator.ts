// @ts-nocheck
// Generated from tools/calculator/dew-point-humidity-calculator.html
// Source SHA-256: de245474730a74796b0ed860d82197cc0645c9dba1d029cb7e609848b636c81e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var useCelsius = true;

      var tempEl = document.getElementById("temperature");
      var humEl = document.getElementById("humidity");
      var tempSlider = document.getElementById("tempSlider");
      var humSlider = document.getElementById("humSlider");
      var tempUnitEl = document.getElementById("tempUnit");
      var statusEl = document.getElementById("status");

      // Magnus formula constants (August-Roche-Magnus)
      var MAGNUS_A = 17.625;
      var MAGNUS_B = 243.04; // °C

      function toC(val) {
        return useCelsius ? val : (val - 32) * (5 / 9);
      }
      function fromC(val) {
        return useCelsius ? val : val * (9 / 5) + 32;
      }
      function fmtTemp(val) {
        return val.toFixed(1) + (useCelsius ? " °C" : " °F");
      }

      // Saturation vapor pressure (hPa) via Magnus formula, T in °C
      function satPressure(tc) {
        return 6.1078 * Math.exp((MAGNUS_A * tc) / (MAGNUS_B + tc));
      }

      // Dew point in °C, using precise Magnus inversion
      function dewPoint(tc, rh) {
        var gamma = Math.log(rh / 100) + (MAGNUS_A * tc) / (MAGNUS_B + tc);
        return (MAGNUS_B * gamma) / (MAGNUS_A - gamma);
      }

      // Wet bulb temperature approximation (Stull 2011), T in °C, RH in %
      function wetBulb(tc, rh) {
        return (
          tc * Math.atan(0.151977 * Math.pow(rh + 8.313659, 0.5)) +
          Math.atan(tc + rh) -
          Math.atan(rh - 1.676331) +
          0.00391838 * Math.pow(rh, 1.5) * Math.atan(0.023101 * rh) -
          4.686035
        );
      }

      // Absolute humidity g/m³, T in °C
      function absoluteHumidity(tc, rh) {
        var es = satPressure(tc);
        var ea = (rh / 100) * es;
        // Rv = 461.5 J/(kg·K), Mw = 18.016 g/mol, R = 8.314
        return (ea * 100 * 18.016) / (8.314 * (tc + 273.15));
      }

      function comfortLevel(rh) {
        if (rh < 25) return { label: "极度干燥", pos: 4 };
        if (rh < 40) return { label: "偏干", pos: 20 };
        if (rh < 60) return { label: "舒适", pos: 50 };
        if (rh < 70) return { label: "偏湿", pos: 70 };
        if (rh < 80) return { label: "湿热", pos: 82 };
        return { label: "极度潮湿", pos: 96 };
      }

      function calculate() {
        var rawTemp = parseFloat(tempEl.value);
        var rh = parseFloat(humEl.value);

        if (isNaN(rawTemp) || isNaN(rh)) {
          statusEl.textContent = "请输入有效数值";
          statusEl.className = "status error";
          return;
        }
        rh = Math.max(1, Math.min(100, rh));
        var tc = toC(rawTemp);

        // Clamp tc for formula stability
        tc = Math.max(-60, Math.min(80, tc));

        var td = dewPoint(tc, rh);
        var twb = wetBulb(tc, rh);
        var absHum = absoluteHumidity(tc, rh);
        var esat = satPressure(tc);
        var eact = (rh / 100) * esat;
        var delta = tc - td;

        // Update result cards
        document.getElementById("resDewPoint").textContent = fmtTemp(fromC(td));
        document.getElementById("resDewPointSub").textContent = "露点差 " + delta.toFixed(1) + " °";
        document.getElementById("resWetBulb").textContent = fmtTemp(fromC(twb));
        document.getElementById("resWetBulbSub").textContent = "蒸发冷却极限";
        document.getElementById("resAbsHum").textContent = absHum.toFixed(2);
        document.getElementById("resSatPress").textContent = esat.toFixed(2);
        document.getElementById("resActPress").textContent = eact.toFixed(2);
        document.getElementById("resDelta").textContent = delta.toFixed(1) + " °";
        document.getElementById("resDeltaSub").textContent =
          delta < 3 ? "接近饱和，有结露风险" : "正常";

        // Delta card color
        var deltaCard = document.getElementById("deltaCard");
        deltaCard.className = "result-card";
        if (delta < 3) {
          deltaCard.classList.add("danger");
        } else if (delta < 8) {
          deltaCard.classList.add("warn");
        }

        // Comfort bar
        var comfort = comfortLevel(rh);
        document.getElementById("comfortLabel").textContent = comfort.label;
        document.getElementById("comfortMarker").style.left = comfort.pos + "%";

        // Condensation risk (indoor scenario: assume wall temp ~3°C below ambient)
        var wallTemp = tc - 3;
        var condBox = document.getElementById("condensationBox");
        var condIcon = document.getElementById("condensationIcon");
        var condText = document.getElementById("condensationText");

        if (td >= wallTemp) {
          condBox.className = "condensation-box risk";
          condIcon.textContent = "⚠️";
          condText.innerHTML =
            "<strong>存在结露风险！</strong>" +
            "露点 " +
            fmtTemp(fromC(td)) +
            " ≥ 假设墙面温度 " +
            fmtTemp(fromC(wallTemp)) +
            "，水汽在接触冷表面时会凝结为水滴，可能导致霉变或腐蚀。建议：降低室内湿度、改善通风或提高墙体保温性能。";
        } else if (delta < 5) {
          condBox.className = "condensation-box risk";
          condIcon.textContent = "🔶";
          condText.innerHTML =
            "<strong>结露风险偏高</strong>" +
            "露点差仅 " +
            delta.toFixed(1) +
            " °C，湿度较高，在冷表面（玻璃、外墙）处可能出现结露。建议保持良好通风。";
        } else {
          condBox.className = "condensation-box safe";
          condIcon.textContent = "✅";
          condText.innerHTML =
            "<strong>暂无明显结露风险</strong>" +
            "当前露点 " +
            fmtTemp(fromC(td)) +
            "，露点差 " +
            delta.toFixed(1) +
            " °C，湿度处于安全范围内。";
        }

        statusEl.textContent = "计算完成";
        statusEl.className = "status success";
      }

      // Sync sliders and inputs
      tempEl.addEventListener("input", function () {
        var v = parseFloat(tempEl.value);
        if (!isNaN(v)) {
          var vc = toC(v);
          tempSlider.value = String(Math.max(-40, Math.min(60, vc)));
        }
        calculate();
      });
      humEl.addEventListener("input", function () {
        var v = parseFloat(humEl.value);
        if (!isNaN(v)) humSlider.value = String(Math.max(1, Math.min(100, v)));
        calculate();
      });
      tempSlider.addEventListener("input", function () {
        tempEl.value = fromC(parseFloat(tempSlider.value)).toFixed(1);
        calculate();
      });
      humSlider.addEventListener("input", function () {
        humEl.value = humSlider.value;
        calculate();
      });

      document.getElementById("btnCelsius").onclick = function () {
        if (useCelsius) return;
        var cur = parseFloat(tempEl.value);
        useCelsius = true;
        tempUnitEl.textContent = "°C";
        tempEl.value = toC(cur).toFixed(1);
        tempSlider.value = toC(cur).toFixed(1);
        document.getElementById("btnCelsius").classList.add("btn-primary");
        document.getElementById("btnFahrenheit").classList.remove("btn-primary");
        calculate();
      };
      document.getElementById("btnFahrenheit").onclick = function () {
        if (!useCelsius) return;
        var cur = parseFloat(tempEl.value);
        useCelsius = false;
        tempUnitEl.textContent = "°F";
        tempEl.value = fromC(cur).toFixed(1);
        document.getElementById("btnFahrenheit").classList.add("btn-primary");
        document.getElementById("btnCelsius").classList.remove("btn-primary");
        calculate();
      };
      document.getElementById("btnReset").onclick = function () {
        useCelsius = true;
        tempUnitEl.textContent = "°C";
        tempEl.value = "25";
        humEl.value = "60";
        tempSlider.value = "25";
        humSlider.value = "60";
        document.getElementById("btnCelsius").classList.add("btn-primary");
        document.getElementById("btnFahrenheit").classList.remove("btn-primary");
        calculate();
      };

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
      calculate();
    
