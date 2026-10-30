// @ts-nocheck
// Generated from tools/health/caffeine-half-life-calculator.html
// Source SHA-256: 96277d6e9aab0fd6237e6b0c15d05e0b7b4ecab05de5a270260ab9039f09fb84
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 饮品咖啡因含量 (mg)
      var DRINK_MG = {
        espresso: 63,
        drip: 95,
        latte: 63,
        americano: 95,
        cold_brew: 200,
        green_tea: 28,
        black_tea: 47,
        energy: 80,
        cola: 34,
        custom: 0
      };

      var HALF_LIFE_H = 5.7; // 标准成人咖啡因半衰期（小时）
      var intakes = []; // [{time: minutes_from_midnight, mg: number, label: string}]

      // ── DOM refs ──
      var drinkTypeEl = document.getElementById("drinkType");
      var intakeTimeEl = document.getElementById("intakeTime");
      var customDoseRowEl = document.getElementById("customDoseRow");
      var customDoseEl = document.getElementById("customDose");
      var intakeListEl = document.getElementById("intakeList");
      var sleepTimeEl = document.getElementById("sleepTime");
      var targetMgEl = document.getElementById("targetMg");
      var baseTimeEl = document.getElementById("baseTime");
      var inlineStatusEl = document.getElementById("inlineStatus");
      var emptyHintEl = document.getElementById("emptyHint");
      var resultContentEl = document.getElementById("resultContent");
      var adviceListEl = document.getElementById("adviceList");

      // ── 工具函数 ──
      function parseTime(str) {
        var parts = str.split(":");
        return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      }
      function formatTime(mins) {
        var normalized = ((mins % 1440) + 1440) % 1440;
        var h = Math.floor(normalized / 60);
        var m = Math.floor(normalized % 60);
        return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
      }
      function nowMins() {
        var d = new Date();
        return d.getHours() * 60 + d.getMinutes();
      }

      // 计算 t 时刻（分钟，从午夜算起）体内咖啡因总量
      function caffeineAt(tMins) {
        var total = 0;
        for (var i = 0; i < intakes.length; i++) {
          var elapsed = (tMins - intakes[i].time) / 60; // hours
          if (elapsed >= 0) {
            total += intakes[i].mg * Math.pow(0.5, elapsed / HALF_LIFE_H);
          }
        }
        return total;
      }

      // ── 渲染摄入列表 ──
      function renderIntakeList() {
        if (intakes.length === 0) {
          intakeListEl.innerHTML =
            '<div class="empty-hint" style="padding:16px">暂无记录，请添加饮品</div>';
          return;
        }
        intakeListEl.innerHTML = "";
        var sorted = intakes.slice().sort(function (a, b) {
          return a.time - b.time;
        });
        sorted.forEach(function (item) {
          var realIdx = intakes.indexOf(item);
          var div = document.createElement("div");
          div.className = "intake-item";

          var infoDiv = document.createElement("div");
          infoDiv.className = "intake-item-info";

          var nameSpan = document.createElement("span");
          nameSpan.className = "intake-item-name";
          nameSpan.textContent = item.label;

          var metaSpan = document.createElement("span");
          metaSpan.className = "intake-item-meta";
          metaSpan.textContent = formatTime(item.time);

          infoDiv.appendChild(nameSpan);
          infoDiv.appendChild(metaSpan);

          var doseSpan = document.createElement("span");
          doseSpan.className = "intake-item-dose";
          doseSpan.textContent = item.mg + " mg";

          var removeBtn = document.createElement("button");
          removeBtn.className = "intake-item-remove";
          removeBtn.textContent = "×";
          removeBtn.setAttribute("aria-label", "删除");
          removeBtn.dataset.idx = String(realIdx);
          removeBtn.addEventListener("click", function () {
            var idx = parseInt(this.dataset.idx, 10);
            intakes.splice(idx, 1);
            saveState();
            renderIntakeList();
            updateResults();
          });

          div.appendChild(infoDiv);
          div.appendChild(doseSpan);
          div.appendChild(removeBtn);
          intakeListEl.appendChild(div);
        });
      }

      // ── 渲染图表（纯 Canvas，无依赖）──
      function renderChart() {
        var canvas = document.getElementById("caffeineChart");
        var wrap = canvas.parentElement;
        var dpr = window.devicePixelRatio || 1;
        var w = wrap.clientWidth - 32; // subtract padding
        var h = Math.max(220, wrap.clientHeight - 32);
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        var ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);

        var pad = { top: 20, right: 20, bottom: 40, left: 52 };
        var cw = w - pad.left - pad.right;
        var ch = h - pad.top - pad.bottom;

        // 时间范围：今日基准到基准 +24h
        var baseMins = parseTime(baseTimeEl.value);
        var endMins = baseMins + 24 * 60;
        var sleepMins = parseTime(sleepTimeEl.value);
        if (sleepMins <= baseMins) sleepMins += 1440;

        // 采样
        var points = [];
        var maxVal = 0;
        var t;
        for (t = baseMins; t <= endMins; t += 10) {
          var v = caffeineAt(t);
          points.push({ t: t, v: v });
          if (v > maxVal) maxVal = v;
        }
        var yMax = Math.max(maxVal * 1.15, 100);

        // 色彩
        var isDark = document.documentElement.getAttribute("data-theme") !== "light";
        var clrGrid = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
        var clrAxis = isDark ? "#55556a" : "#aaa";
        var clrLine = isDark ? "#00f5d4" : "#00d4b8";
        var clrFill1 = isDark ? "rgba(0,245,212,0.18)" : "rgba(0,184,148,0.15)";
        var clrFill2 = isDark ? "rgba(0,245,212,0.03)" : "rgba(0,184,148,0.03)";
        var clrSleep = isDark ? "rgba(251,191,36,0.12)" : "rgba(245,158,11,0.1)";
        var clrSleepLine = isDark ? "#fbbf24" : "#f59e0b";
        var clrTarget = isDark ? "rgba(244,63,94,0.6)" : "rgba(239,68,68,0.5)";
        var clrText = isDark ? "#8888a0" : "#888";

        ctx.clearRect(0, 0, w, h);

        function xOf(mins) {
          return pad.left + ((mins - baseMins) / (endMins - baseMins)) * cw;
        }
        function yOf(val) {
          return pad.top + ch - (val / yMax) * ch;
        }

        // 睡眠时间区域
        var sleepX = xOf(sleepMins);
        if (sleepX >= pad.left && sleepX <= pad.left + cw) {
          ctx.fillStyle = clrSleep;
          ctx.fillRect(sleepX, pad.top, pad.left + cw - sleepX, ch);
        }

        // 网格线（Y 轴）
        ctx.strokeStyle = clrGrid;
        ctx.lineWidth = 1;
        var yStep = Math.ceil(yMax / 5 / 50) * 50;
        for (var yv = 0; yv <= yMax; yv += yStep) {
          var yp = yOf(yv);
          ctx.beginPath();
          ctx.moveTo(pad.left, yp);
          ctx.lineTo(pad.left + cw, yp);
          ctx.stroke();
          ctx.fillStyle = clrText;
          ctx.font = "10px monospace";
          ctx.textAlign = "right";
          ctx.fillText(String(Math.round(yv)), pad.left - 6, yp + 4);
        }
        // 时间刻度
        var hh;
        for (hh = 0; hh <= 24; hh += 3) {
          var tm = baseMins + hh * 60;
          var xp = xOf(tm);
          ctx.strokeStyle = clrGrid;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(xp, pad.top);
          ctx.lineTo(xp, pad.top + ch);
          ctx.stroke();
          ctx.fillStyle = clrText;
          ctx.font = "10px monospace";
          ctx.textAlign = "center";
          ctx.fillText(formatTime(tm % 1440), xp, pad.top + ch + 14);
        }

        // 目标线
        var tgMg = parseInt(targetMgEl.value, 10) || 50;
        var tgY = yOf(tgMg);
        ctx.strokeStyle = clrTarget;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(pad.left, tgY);
        ctx.lineTo(pad.left + cw, tgY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = clrTarget;
        ctx.font = "10px monospace";
        ctx.textAlign = "left";
        ctx.fillText("目标 " + tgMg + " mg", pad.left + 4, tgY - 4);

        // 睡眠时间竖线
        if (sleepX >= pad.left && sleepX <= pad.left + cw) {
          ctx.strokeStyle = clrSleepLine;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([6, 3]);
          ctx.beginPath();
          ctx.moveTo(sleepX, pad.top);
          ctx.lineTo(sleepX, pad.top + ch);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = clrSleepLine;
          ctx.font = "10px monospace";
          ctx.textAlign = "left";
          ctx.fillText("入睡 " + sleepTimeEl.value, sleepX + 4, pad.top + 12);
        }

        // 渐变填充
        var grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ch);
        grad.addColorStop(0, clrFill1);
        grad.addColorStop(1, clrFill2);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(xOf(points[0].t), pad.top + ch);
        points.forEach(function (p) {
          ctx.lineTo(xOf(p.t), yOf(p.v));
        });
        ctx.lineTo(xOf(points[points.length - 1].t), pad.top + ch);
        ctx.closePath();
        ctx.fill();

        // 折线
        ctx.strokeStyle = clrLine;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = "round";
        ctx.beginPath();
        points.forEach(function (p, i) {
          if (i === 0) ctx.moveTo(xOf(p.t), yOf(p.v));
          else ctx.lineTo(xOf(p.t), yOf(p.v));
        });
        ctx.stroke();

        // 摄入点标记
        intakes.forEach(function (item) {
          var ix = xOf(item.time);
          var iy = yOf(caffeineAt(item.time));
          ctx.beginPath();
          ctx.arc(ix, iy, 5, 0, Math.PI * 2);
          ctx.fillStyle = clrLine;
          ctx.fill();
          ctx.strokeStyle = isDark ? "#0a0a0f" : "#fff";
          ctx.lineWidth = 2;
          ctx.stroke();
        });

        // 轴线
        ctx.strokeStyle = clrAxis;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad.left, pad.top);
        ctx.lineTo(pad.left, pad.top + ch);
        ctx.lineTo(pad.left + cw, pad.top + ch);
        ctx.stroke();

        // Y 轴标签（旋转）
        ctx.save();
        ctx.translate(12, pad.top + ch / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = clrText;
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText("咖啡因 (mg)", 0, 0);
        ctx.restore();
      }

      // ── 更新结果区 ──
      function updateResults() {
        var count = intakes.length;
        document.getElementById("statCount").textContent = String(count);

        if (count === 0) {
          emptyHintEl.style.display = "";
          resultContentEl.style.display = "none";
          document.getElementById("statPeak").textContent = "0";
          return;
        }
        emptyHintEl.style.display = "none";
        resultContentEl.style.display = "flex";

        var baseMins = parseTime(baseTimeEl.value);
        var endMins = baseMins + 24 * 60;
        var sleepMins = parseTime(sleepTimeEl.value);
        if (sleepMins <= baseMins) sleepMins += 1440;

        // 总摄入
        var totalMg = 0;
        var i;
        for (i = 0; i < intakes.length; i++) totalMg += intakes[i].mg;

        // 当前残余
        var curMins = nowMins();
        var curVal = Math.round(caffeineAt(curMins));

        // 峰值
        var peak = 0;
        var tc;
        for (tc = baseMins; tc <= endMins; tc += 5) {
          var pv = caffeineAt(tc);
          if (pv > peak) peak = pv;
        }

        document.getElementById("sumTotal").textContent = String(totalMg);
        document.getElementById("sumNow").textContent = String(curVal);
        document.getElementById("statPeak").textContent = String(Math.round(peak));

        // 找体内浓度降至目标的时刻
        var tg = parseInt(targetMgEl.value, 10) || 50;
        var clearTime = null;
        for (tc = curMins; tc <= sleepMins + 1440; tc++) {
          if (caffeineAt(tc) <= tg) {
            clearTime = tc;
            break;
          }
        }

        var cutoffEl = document.getElementById("sumCutoff");
        if (clearTime !== null) {
          cutoffEl.textContent = formatTime(clearTime % 1440);
        } else {
          cutoffEl.textContent = "—";
        }

        // 建议
        var adviceItems = [];
        var atSleep = caffeineAt(sleepMins);

        if (totalMg >= 400) {
          adviceItems.push({
            cls: "warn",
            text: "今日摄入 " + totalMg + " mg，已超过成人建议上限（400 mg/天）。"
          });
        } else if (totalMg >= 200) {
          adviceItems.push({
            cls: "",
            text: "今日摄入 " + totalMg + " mg，处于适中范围（建议上限 400 mg/天）。"
          });
        } else {
          adviceItems.push({
            cls: "ok",
            text: "今日摄入 " + totalMg + " mg，处于低风险范围。"
          });
        }

        if (atSleep > tg) {
          adviceItems.push({
            cls: "warn",
            text:
              "预计入睡时体内仍有约 " +
              Math.round(atSleep) +
              " mg 咖啡因，超出目标残余 " +
              tg +
              " mg，可能影响入睡。"
          });
          if (clearTime !== null) {
            adviceItems.push({
              cls: "",
              text: "建议在 " + formatTime(clearTime % 1440) + " 前停止摄入咖啡因。"
            });
          } else {
            adviceItems.push({
              cls: "warn",
              text: "今日摄入过晚，难以在入睡前达到目标残余。"
            });
          }
        } else {
          adviceItems.push({
            cls: "ok",
            text:
              "预计入睡时体内约 " +
              Math.round(atSleep) +
              " mg 咖啡因，低于目标残余，对睡眠影响较小。"
          });
        }

        if (curVal > 200) {
          adviceItems.push({
            cls: "warn",
            text: "当前体内咖啡因较高，可能导致心跳加速或焦虑感。"
          });
        }

        adviceItems.push({
          cls: "",
          text: "咖啡因半衰期约 5~6 小时，个体差异受遗传、年龄、用药等因素影响，以上仅供参考。"
        });

        adviceListEl.innerHTML = "";
        adviceItems.forEach(function (item) {
          var li = document.createElement("li");
          if (item.cls) li.className = item.cls;
          li.textContent = item.text;
          adviceListEl.appendChild(li);
        });

        renderChart();
      }

      // ── 添加记录 ──
      document.getElementById("btnAdd").addEventListener("click", function () {
        var type = drinkTypeEl.value;
        var timeStr = intakeTimeEl.value;
        if (!timeStr) {
          showStatus("请选择摄入时间", "error");
          return;
        }
        var mg = type === "custom" ? parseInt(customDoseEl.value, 10) : DRINK_MG[type];
        if (!mg || mg <= 0) {
          showStatus("咖啡因剂量无效", "error");
          return;
        }
        var label = drinkTypeEl.options[drinkTypeEl.selectedIndex].text.replace(/（.*）$/, "");
        intakes.push({ time: parseTime(timeStr), mg: mg, label: label });
        saveState();
        renderIntakeList();
        updateResults();
        showStatus("已添加：" + label + " " + mg + " mg @ " + timeStr, "success");
      });

      // 饮品切换：显示/隐藏自定义剂量行
      drinkTypeEl.addEventListener("change", function () {
        customDoseRowEl.style.display = this.value === "custom" ? "" : "none";
      });

      // 清空
      document.getElementById("btnClear").addEventListener("click", function () {
        intakes = [];
        saveState();
        renderIntakeList();
        updateResults();
        inlineStatusEl.textContent = "";
        inlineStatusEl.className = "inline-status";
      });

      // 复制摘要
      document.getElementById("btnCopy").addEventListener("click", function () {
        if (intakes.length === 0) {
          showStatus("暂无记录", "error");
          return;
        }
        var lines = ["咖啡因代谢摘要"];
        var sorted = intakes.slice().sort(function (a, b) {
          return a.time - b.time;
        });
        sorted.forEach(function (item) {
          lines.push(formatTime(item.time) + "  " + item.label + "  " + item.mg + " mg");
        });
        var total = 0;
        intakes.forEach(function (item) {
          total += item.mg;
        });
        lines.push("今日总计: " + total + " mg");
        lines.push("当前残余: " + Math.round(caffeineAt(nowMins())) + " mg");
        var cutoffEl = document.getElementById("sumCutoff");
        if (cutoffEl.textContent !== "—") {
          lines.push("建议截止: " + cutoffEl.textContent);
        }
        navigator.clipboard.writeText(lines.join("\n")).then(
          function () {
            showStatus("摘要已复制", "success");
          },
          function () {
            showStatus("复制失败", "error");
          }
        );
      });

      // 设置变更时重新计算
      sleepTimeEl.addEventListener("input", updateResults);
      targetMgEl.addEventListener("input", updateResults);
      baseTimeEl.addEventListener("input", updateResults);

      function showStatus(msg, type) {
        inlineStatusEl.textContent = msg;
        inlineStatusEl.className = "inline-status" + (type ? " " + type : "");
      }

      // ── 持久化 ──
      var LS_KEY = "caffeine_calc_v1";
      function saveState() {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(intakes));
        } catch (e) {}
      }
      function loadState() {
        try {
          var raw = localStorage.getItem(LS_KEY);
          if (raw) {
            var parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) intakes = parsed;
          }
        } catch (e) {}
      }

      // 默认摄入时间为当前时间
      (function () {
        var d = new Date();
        var hh = d.getHours();
        var mm = d.getMinutes();
        intakeTimeEl.value = (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm;
      })();

      loadState();
      renderIntakeList();
      updateResults();

      // 窗口 resize 时重绘图表
      window.addEventListener("resize", function () {
        if (intakes.length > 0) renderChart();
      });

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        if (intakes.length > 0) renderChart();
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
    
