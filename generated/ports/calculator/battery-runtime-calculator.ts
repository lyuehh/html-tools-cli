// @ts-nocheck
// Generated from tools/calculator/battery-runtime-calculator.html
// Source SHA-256: acc11c1da72366fa6c060b88d5c5fb06e904eb164300cabd4d8e62c1c520067f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var statusEl = document.getElementById("brcStatus");
      var statsEl = document.getElementById("brcStats");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function getVal(id) {
        return parseFloat(document.getElementById(id).value);
      }

      function formatHours(h) {
        if (h < 0.01) {
          return (h * 60).toFixed(1) + " 分钟";
        }
        if (h < 1) {
          return Math.round(h * 60) + " 分钟";
        }
        var hours = Math.floor(h);
        var mins = Math.round((h - hours) * 60);
        if (mins === 60) {
          hours += 1;
          mins = 0;
        }
        if (hours >= 24) {
          var days = Math.floor(hours / 24);
          var remH = hours % 24;
          if (remH === 0 && mins === 0) return days + " 天";
          if (mins === 0) return days + " 天 " + remH + " 时";
          return days + " 天 " + remH + " 时 " + mins + " 分";
        }
        if (mins === 0) return hours + " 小时";
        return hours + " 小时 " + mins + " 分钟";
      }

      function calculate() {
        var cap = getVal("brcCapacity");
        var volt = getVal("brcVoltage");
        var series = getVal("brcSeries");
        var parallel = getVal("brcParallel");
        var currentRaw = getVal("brcCurrent");
        var efficiency = getVal("brcEfficiency");
        var dod = getVal("brcDoD");
        var currentUnit = document.getElementById("brcCurrentUnit").value;

        if (isNaN(cap) || cap <= 0) {
          showStatus("请输入有效的电池容量", "error");
          return;
        }
        if (isNaN(volt) || volt <= 0) {
          showStatus("请输入有效的电池电压", "error");
          return;
        }
        if (isNaN(series) || series < 1) {
          showStatus("串联节数至少为 1", "error");
          return;
        }
        if (isNaN(parallel) || parallel < 1) {
          showStatus("并联组数至少为 1", "error");
          return;
        }
        if (isNaN(currentRaw) || currentRaw <= 0) {
          showStatus("请输入有效的工作电流", "error");
          return;
        }
        if (isNaN(efficiency) || efficiency <= 0 || efficiency > 100) {
          showStatus("效率应在 1–100% 之间", "error");
          return;
        }
        if (isNaN(dod) || dod <= 0 || dod > 100) {
          showStatus("放电深度应在 1–100% 之间", "error");
          return;
        }

        // Convert current to mA
        var currentMa;
        if (currentUnit === "A") {
          currentMa = currentRaw * 1000;
        } else if (currentUnit === "uA") {
          currentMa = currentRaw / 1000;
        } else {
          currentMa = currentRaw;
        }

        // Pack topology
        // Parallel increases capacity, series increases voltage
        var packCapMah = cap * parallel;
        var packVolt = volt * series;
        var packWh = (packCapMah * packVolt) / 1000;

        // Usable capacity = packCapMah * efficiency% * dod%
        var usableCapMah = packCapMah * (efficiency / 100) * (dod / 100);

        // Runtime in hours
        var runtimeH = usableCapMah / currentMa;

        // Effective pct
        var effPct = (efficiency / 100) * (dod / 100);

        // Estimated device power (assume pack voltage delivered)
        var powerMw = currentMa * packVolt;

        // Show result
        document.getElementById("brcEmpty").style.display = "none";
        var resultEl = document.getElementById("brcResult");
        resultEl.style.display = "flex";

        document.getElementById("brcTimeDisplay").textContent = formatHours(runtimeH);
        document.getElementById("brcPackCap").textContent = packCapMah.toFixed(0) + " mAh";
        document.getElementById("brcPackVolt").textContent = packVolt.toFixed(2) + " V";
        document.getElementById("brcPackWh").textContent = packWh.toFixed(2) + " Wh";
        document.getElementById("brcUsableCap").textContent = usableCapMah.toFixed(0) + " mAh";
        document.getElementById("brcPower").textContent =
          powerMw >= 1000 ? (powerMw / 1000).toFixed(2) + " W" : powerMw.toFixed(1) + " mW";
        document.getElementById("brcHours").textContent = runtimeH.toFixed(2) + " h";

        var pct = Math.round(effPct * 100);
        document.getElementById("brcProgressPct").textContent = pct + "%";
        document.getElementById("brcProgressFill").style.width = pct + "%";

        // Stats bar
        var totalCells = series * parallel;
        document.getElementById("brcStatCells").textContent = totalCells;
        document.getElementById("brcStatEnergy").textContent = packWh.toFixed(2);
        document.getElementById("brcStatRuntime").textContent = runtimeH.toFixed(2);
        statsEl.classList.add("show");

        showStatus("计算完成", "success");
        saveToStorage();
      }

      var LS_KEY = "battery_runtime_v1";

      function saveToStorage() {
        var data = {
          capacity: document.getElementById("brcCapacity").value,
          voltage: document.getElementById("brcVoltage").value,
          series: document.getElementById("brcSeries").value,
          parallel: document.getElementById("brcParallel").value,
          current: document.getElementById("brcCurrent").value,
          currentUnit: document.getElementById("brcCurrentUnit").value,
          efficiency: document.getElementById("brcEfficiency").value,
          dod: document.getElementById("brcDoD").value
        };
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(data));
        } catch (e) {
          // ignore
        }
      }

      function loadFromStorage() {
        try {
          var raw = localStorage.getItem(LS_KEY);
          if (!raw) return;
          var data = JSON.parse(raw);
          if (data.capacity) document.getElementById("brcCapacity").value = data.capacity;
          if (data.voltage) document.getElementById("brcVoltage").value = data.voltage;
          if (data.series) document.getElementById("brcSeries").value = data.series;
          if (data.parallel) document.getElementById("brcParallel").value = data.parallel;
          if (data.current) document.getElementById("brcCurrent").value = data.current;
          if (data.currentUnit) document.getElementById("brcCurrentUnit").value = data.currentUnit;
          if (data.efficiency) document.getElementById("brcEfficiency").value = data.efficiency;
          if (data.dod) document.getElementById("brcDoD").value = data.dod;
        } catch (e) {
          // ignore
        }
      }

      function resetAll() {
        document.getElementById("brcCapacity").value = "";
        document.getElementById("brcVoltage").value = "3.7";
        document.getElementById("brcSeries").value = "1";
        document.getElementById("brcParallel").value = "1";
        document.getElementById("brcCurrent").value = "";
        document.getElementById("brcCurrentUnit").value = "mA";
        document.getElementById("brcEfficiency").value = "85";
        document.getElementById("brcDoD").value = "80";

        document.getElementById("brcEmpty").style.display = "";
        document.getElementById("brcResult").style.display = "none";
        statsEl.classList.remove("show");
        showStatus("", "");
        try {
          localStorage.removeItem(LS_KEY);
        } catch (e) {
          // ignore
        }
      }

      document.getElementById("btnCalc").onclick = calculate;
      document.getElementById("btnReset").onclick = resetAll;
      document.getElementById("btnCopy").onclick = async function () {
        var timeEl = document.getElementById("brcTimeDisplay");
        var hoursEl = document.getElementById("brcHours");
        if (!hoursEl || hoursEl.textContent === "--") {
          showStatus("暂无结果可复制", "error");
          return;
        }
        var packCap = document.getElementById("brcPackCap").textContent;
        var packVolt = document.getElementById("brcPackVolt").textContent;
        var packWh = document.getElementById("brcPackWh").textContent;
        var usable = document.getElementById("brcUsableCap").textContent;
        var power = document.getElementById("brcPower").textContent;
        var text =
          "【电池续航估算结果】\n" +
          "续航时间：" +
          timeEl.textContent +
          " (" +
          hoursEl.textContent +
          ")\n" +
          "电池组容量：" +
          packCap +
          "\n" +
          "电池组电压：" +
          packVolt +
          "\n" +
          "电池组能量：" +
          packWh +
          "\n" +
          "有效可用容量：" +
          usable +
          "\n" +
          "估算功耗：" +
          power;
        try {
          await navigator.clipboard.writeText(text);
          showStatus("已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      // Allow Ctrl/Cmd+Enter key to trigger calculation
      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          calculate();
        }
      });

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
      loadFromStorage();
    
