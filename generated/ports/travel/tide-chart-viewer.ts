// @ts-nocheck
// Generated from tools/travel/tide-chart-viewer.html
// Source SHA-256: 67a7f0898329c476d247c04df79c2a7144bba316107b48849198ddf28d76989b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      /**
       * 潮汐调和分析
       *
       * 参考：IHO 潮汐预报方法，使用主要分潮（M2, S2, N2, K2, K1, O1, P1, Q1, Mf, Mm, Ssa）
       * 调和常数来源：NOAA / IHO 公开数据集（简化版，部分港口手动整理）
       *
       * 调和公式：
       *   h(t) = Z0 + Σ [ A_i * cos( ω_i * t + V0_i - g_i ) ]
       *
       * 其中：
       *   Z0   — 平均海面高度（Mean Sea Level, MSL）
       *   A_i  — 振幅 (amplitude) [m]
       *   ω_i  — 角速度 (degrees/hour)
       *   V0_i — 天文初相 (equilibrium argument at t=0)
       *   g_i  — 迟角 (phase lag, degrees)
       */

      /* 主要分潮角速度 (°/hour) */
      var CONSTITUENTS = {
        M2: 28.9841042,
        S2: 30.0,
        N2: 28.4397295,
        K2: 30.0821373,
        K1: 15.0410686,
        O1: 13.9430356,
        P1: 14.9589314,
        Q1: 13.3986609,
        Mf: 1.0980331,
        Mm: 0.5443747,
        Ssa: 0.0821373
      };

      /**
       * 港口调和常数数据库
       * 每个港口字段：
       *   tz  — UTC 偏移 (小时)，用于本地时显示
       *   Z0  — MSL (m)
       *   constituents: { name: [amplitude_m, phase_deg] }
       *
       * 数据来源：NOAA CO-OPS / UK NTSLF / JMA 等公开数据，经简化处理。
       */
      var STATIONS = {
        shanghai: {
          name: "上海（吴淞口）",
          tz: 8,
          Z0: 2.38,
          constituents: {
            M2: [1.752, 211],
            S2: [0.594, 248],
            N2: [0.347, 196],
            K2: [0.161, 249],
            K1: [0.375, 264],
            O1: [0.265, 247],
            P1: [0.121, 264],
            Q1: [0.064, 237],
            Mf: [0.038, 0],
            Mm: [0.022, 0],
            Ssa: [0.055, 180]
          }
        },
        qingdao: {
          name: "青岛",
          tz: 8,
          Z0: 2.46,
          constituents: {
            M2: [1.416, 232],
            S2: [0.479, 275],
            N2: [0.288, 217],
            K2: [0.131, 278],
            K1: [0.301, 280],
            O1: [0.221, 261],
            P1: [0.098, 280],
            Q1: [0.054, 250],
            Mf: [0.03, 0],
            Mm: [0.018, 0],
            Ssa: [0.045, 180]
          }
        },
        tianjin: {
          name: "天津（塘沽）",
          tz: 8,
          Z0: 2.15,
          constituents: {
            M2: [1.156, 268],
            S2: [0.392, 313],
            N2: [0.236, 253],
            K2: [0.107, 316],
            K1: [0.256, 311],
            O1: [0.189, 290],
            P1: [0.083, 311],
            Q1: [0.046, 279],
            Mf: [0.025, 0],
            Mm: [0.015, 0],
            Ssa: [0.038, 180]
          }
        },
        guangzhou: {
          name: "广州（黄埔）",
          tz: 8,
          Z0: 1.03,
          constituents: {
            M2: [0.475, 332],
            S2: [0.195, 10],
            N2: [0.092, 316],
            K2: [0.053, 12],
            K1: [0.289, 15],
            O1: [0.229, 357],
            P1: [0.094, 15],
            Q1: [0.055, 347],
            Mf: [0.02, 0],
            Mm: [0.012, 0],
            Ssa: [0.032, 180]
          }
        },
        xiamen: {
          name: "厦门",
          tz: 8,
          Z0: 2.38,
          constituents: {
            M2: [1.868, 297],
            S2: [0.638, 340],
            N2: [0.373, 283],
            K2: [0.173, 342],
            K1: [0.384, 350],
            O1: [0.282, 333],
            P1: [0.124, 350],
            Q1: [0.069, 322],
            Mf: [0.038, 0],
            Mm: [0.022, 0],
            Ssa: [0.055, 180]
          }
        },
        hongkong: {
          name: "香港",
          tz: 8,
          Z0: 1.28,
          constituents: {
            M2: [0.538, 2],
            S2: [0.221, 44],
            N2: [0.105, 347],
            K2: [0.06, 47],
            K1: [0.33, 46],
            O1: [0.257, 29],
            P1: [0.107, 46],
            Q1: [0.062, 18],
            Mf: [0.022, 0],
            Mm: [0.013, 0],
            Ssa: [0.034, 180]
          }
        },
        tokyo: {
          name: "东京（东京湾）",
          tz: 9,
          Z0: 1.05,
          constituents: {
            M2: [0.522, 127],
            S2: [0.175, 166],
            N2: [0.104, 113],
            K2: [0.048, 169],
            K1: [0.158, 192],
            O1: [0.126, 180],
            P1: [0.051, 192],
            Q1: [0.031, 169],
            Mf: [0.02, 0],
            Mm: [0.012, 0],
            Ssa: [0.03, 180]
          }
        },
        singapore: {
          name: "新加坡",
          tz: 8,
          Z0: 1.49,
          constituents: {
            M2: [0.568, 142],
            S2: [0.412, 179],
            N2: [0.092, 128],
            K2: [0.112, 182],
            K1: [0.553, 188],
            O1: [0.417, 175],
            P1: [0.18, 188],
            Q1: [0.1, 163],
            Mf: [0.03, 0],
            Mm: [0.018, 0],
            Ssa: [0.045, 180]
          }
        },
        sydney: {
          name: "悉尼",
          tz: 11,
          Z0: 0.64,
          constituents: {
            M2: [0.503, 164],
            S2: [0.112, 195],
            N2: [0.113, 151],
            K2: [0.031, 198],
            K1: [0.055, 231],
            O1: [0.046, 221],
            P1: [0.018, 231],
            Q1: [0.014, 209],
            Mf: [0.015, 0],
            Mm: [0.009, 0],
            Ssa: [0.024, 180]
          }
        },
        london: {
          name: "伦敦（泰晤士河口）",
          tz: 0,
          Z0: 3.38,
          constituents: {
            M2: [2.88, 118],
            S2: [0.951, 158],
            N2: [0.576, 103],
            K2: [0.258, 161],
            K1: [0.132, 181],
            O1: [0.074, 148],
            P1: [0.043, 181],
            Q1: [0.018, 136],
            Mf: [0.042, 0],
            Mm: [0.025, 0],
            Ssa: [0.063, 180]
          }
        },
        newyork: {
          name: "纽约（Battery Park）",
          tz: -5,
          Z0: 0.71,
          constituents: {
            M2: [0.592, 98],
            S2: [0.127, 137],
            N2: [0.124, 83],
            K2: [0.035, 140],
            K1: [0.101, 168],
            O1: [0.071, 156],
            P1: [0.033, 168],
            Q1: [0.018, 143],
            Mf: [0.02, 0],
            Mm: [0.012, 0],
            Ssa: [0.03, 180]
          }
        },
        losangeles: {
          name: "洛杉矶",
          tz: -8,
          Z0: 0.55,
          constituents: {
            M2: [0.558, 222],
            S2: [0.133, 260],
            N2: [0.115, 207],
            K2: [0.036, 263],
            K1: [0.393, 284],
            O1: [0.258, 270],
            P1: [0.127, 284],
            Q1: [0.066, 256],
            Mf: [0.02, 0],
            Mm: [0.012, 0],
            Ssa: [0.03, 180]
          }
        }
      };

      /* --------- 天文初相估算 (V0) --------- */
      /**
       * 给定 Julian Day Number (JDN)，计算各分潮的天文初相 V0 (度)
       * 基于 Doodson (1921) 简化公式。参考 NOAA 潮汐预报说明。
       */
      function julianDay(year, month, day) {
        var a = Math.floor((14 - month) / 12);
        var y = year + 4800 - a;
        var m = month + 12 * a - 3;
        return (
          day +
          Math.floor((153 * m + 2) / 5) +
          365 * y +
          Math.floor(y / 4) -
          Math.floor(y / 100) +
          Math.floor(y / 400) -
          32045
        );
      }

      function computeV0(jd) {
        /* 相对于 J2000.0 (JD 2451545.0) 的儒略世纪数 */
        var T = (jd - 2451545.0) / 36525.0;

        /* 月球平均黄经 (°) */
        var s = 218.3164477 + 481267.88123421 * T;
        /* 太阳平均黄经 (°) */
        var h = 280.46646 + 36000.76983 * T;
        /* 月球近地点平均黄经 (°) */
        var p = 83.3532465 + 4069.0137287 * T;
        /* 升交点平均黄经 (°) */
        var N = 125.0445479 - 1934.1362608 * T;

        /* V0 近似（线性相关，精度 ~5°） */
        return {
          M2: 2 * h - 2 * s,
          S2: 0,
          N2: 2 * h - 3 * s + p,
          K2: 2 * h,
          K1: h + 90,
          O1: -2 * h + s - 90,
          P1: -h - 90,
          Q1: -2 * h + 2 * s - p - 90,
          Mf: 2 * s - 2 * N,
          Mm: s - p,
          Ssa: 2 * h
        };
      }

      /* --------- 核心计算 --------- */
      /**
       * 计算某日某时刻（小时，UTC）的潮高
       * @param {object} station  — 港口对象
       * @param {number} jd       — 该日 00:00 UTC 的 JD
       * @param {number} tHours   — 从当日 00:00 UTC 起的小时数
       * @returns {number} 潮高 (m)
       */
      function tideHeight(station, jd, tHours) {
        var V0 = computeV0(jd);
        var ht = station.Z0;
        var names = Object.keys(CONSTITUENTS);
        for (var i = 0; i < names.length; i++) {
          var name = names[i];
          var pair = station.constituents[name];
          if (!pair) continue;
          var A = pair[0];
          var g = pair[1];
          var omega = CONSTITUENTS[name];
          var v0 = V0[name] || 0;
          var phi = ((omega * tHours + v0 - g) * Math.PI) / 180;
          ht += A * Math.cos(phi);
        }
        return ht;
      }

      /**
       * 为某日采样 N 个点（UTC 起始），返回 [tHours, height] 数组
       */
      function sampleDay(station, jd, samples) {
        var pts = [];
        for (var i = 0; i <= samples; i++) {
          var tH = (i / samples) * 24;
          pts.push([tH, tideHeight(station, jd, tH)]);
        }
        return pts;
      }

      /**
       * 找极值点 (高潮/低潮)
       * 简单差分法：符号变化处为极值
       */
      function findExtremes(pts) {
        var extremes = [];
        for (var i = 1; i < pts.length - 1; i++) {
          var prev = pts[i - 1][1];
          var cur = pts[i][1];
          var nxt = pts[i + 1][1];
          if (cur >= prev && cur >= nxt && cur > prev + 0.001) {
            extremes.push({ t: pts[i][0], h: cur, type: "high" });
          } else if (cur <= prev && cur <= nxt && cur < prev - 0.001) {
            extremes.push({ t: pts[i][0], h: cur, type: "low" });
          }
        }
        return extremes;
      }

      /* --------- UI 辅助 --------- */
      function pad2(n) {
        return n < 10 ? "0" + n : "" + n;
      }

      function fmtHeight(h, unit) {
        if (unit === "ft") return (h * 3.28084).toFixed(2) + " ft";
        return h.toFixed(2) + " m";
      }

      /**
       * 将 UTC 小时转换为本地显示时间字符串
       * @param {number} tUTC   — UTC 小数小时
       * @param {number} tzOff  — 时区偏移 (小时)
       */
      function utcHrToLocal(tUTC, tzOff) {
        var local = tUTC + tzOff;
        /* 跨日处理 */
        local = ((local % 24) + 24) % 24;
        var hh = Math.floor(local);
        var mm = Math.round((local - hh) * 60);
        if (mm === 60) {
          hh += 1;
          mm = 0;
        }
        hh = hh % 24;
        return pad2(hh) + ":" + pad2(mm);
      }

      /* --------- 状态 --------- */
      var currentDate = new Date();

      /* --------- 初始化下拉菜单 --------- */
      function buildLocationSelect() {
        var sel = document.getElementById("locationSelect");
        Object.keys(STATIONS).forEach(function (key) {
          var opt = document.createElement("option");
          opt.value = key;
          opt.textContent = STATIONS[key].name;
          if (key === "shanghai") opt.selected = true;
          sel.appendChild(opt);
        });
      }

      /* --------- 绘图 --------- */
      function drawChart(pts, extremes, station, selectedDate) {
        var canvas = document.getElementById("tideCanvas");
        var dpr = window.devicePixelRatio || 1;
        var rect = canvas.getBoundingClientRect();
        var W = rect.width;
        var H = rect.height;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        var ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);

        var isDark = document.documentElement.getAttribute("data-theme") !== "light";
        var bg = isDark ? "#0e0e14" : "#f5f5f5";
        var gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
        var labelColor = isDark ? "#55556a" : "#999";
        var highColor = "#4cc9f0";
        var lowColor = "#f72585";
        var nowColor = "#fbbf24";

        /* 边距 */
        var PAD_L = 52,
          PAD_R = 20,
          PAD_T = 20,
          PAD_B = 36;
        var cW = W - PAD_L - PAD_R;
        var cH = H - PAD_T - PAD_B;

        /* 高度范围 */
        var heights = pts.map(function (p) {
          return p[1];
        });
        var minH = Math.min.apply(null, heights);
        var maxH = Math.max.apply(null, heights);
        var rangeH = maxH - minH || 1;
        minH -= rangeH * 0.08;
        maxH += rangeH * 0.08;
        rangeH = maxH - minH;

        function xOf(t) {
          return PAD_L + (t / 24) * cW;
        }
        function yOf(h) {
          return PAD_T + (1 - (h - minH) / rangeH) * cH;
        }

        /* 背景 */
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        /* 格线 & Y 轴标签 */
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        ctx.fillStyle = labelColor;
        ctx.font = "11px JetBrains Mono, monospace";
        ctx.textAlign = "right";
        var yTicks = 5;
        for (var yi = 0; yi <= yTicks; yi++) {
          var hVal = minH + (rangeH * yi) / yTicks;
          var yy = yOf(hVal);
          ctx.beginPath();
          ctx.moveTo(PAD_L, yy);
          ctx.lineTo(W - PAD_R, yy);
          ctx.stroke();
          ctx.fillText(hVal.toFixed(1), PAD_L - 6, yy + 4);
        }

        /* X 轴标签 (本地时) */
        ctx.textAlign = "center";
        var tz = station.tz;
        for (var xi = 0; xi <= 24; xi += 4) {
          var xx = xOf(xi);
          ctx.beginPath();
          ctx.moveTo(xx, PAD_T);
          ctx.lineTo(xx, H - PAD_B);
          ctx.stroke();
          var localHr = (((xi + tz) % 24) + 24) % 24;
          ctx.fillText(pad2(localHr) + ":00", xx, H - PAD_B + 18);
        }

        /* 渐变填充 */
        var grad = ctx.createLinearGradient(0, PAD_T, 0, H - PAD_B);
        grad.addColorStop(0, "rgba(0,245,212,0.25)");
        grad.addColorStop(1, "rgba(0,245,212,0.02)");
        ctx.beginPath();
        ctx.moveTo(xOf(pts[0][0]), yOf(pts[0][1]));
        for (var pi = 1; pi < pts.length; pi++) {
          ctx.lineTo(xOf(pts[pi][0]), yOf(pts[pi][1]));
        }
        ctx.lineTo(xOf(pts[pts.length - 1][0]), H - PAD_B);
        ctx.lineTo(xOf(pts[0][0]), H - PAD_B);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        /* 主曲线 */
        ctx.beginPath();
        ctx.moveTo(xOf(pts[0][0]), yOf(pts[0][1]));
        for (var pj = 1; pj < pts.length; pj++) {
          ctx.lineTo(xOf(pts[pj][0]), yOf(pts[pj][1]));
        }
        ctx.strokeStyle = "#00f5d4";
        ctx.lineWidth = 2;
        ctx.stroke();

        /* 极值点 */
        extremes.forEach(function (ex) {
          var cx = xOf(ex.t);
          var cy = yOf(ex.h);
          ctx.beginPath();
          ctx.arc(cx, cy, 5, 0, 2 * Math.PI);
          ctx.fillStyle = ex.type === "high" ? highColor : lowColor;
          ctx.fill();
        });

        /* 当前时刻线（仅当所选日期是今天） */
        var today = new Date();
        var isToday =
          selectedDate.getFullYear() === today.getFullYear() &&
          selectedDate.getMonth() === today.getMonth() &&
          selectedDate.getDate() === today.getDate();
        if (isToday) {
          /* 转为 UTC 小时（扣除时区，因为 pts 用 UTC 时间） */
          var nowUtcH =
            today.getUTCHours() + today.getUTCMinutes() / 60 + today.getUTCSeconds() / 3600;
          var nx = xOf(nowUtcH);
          ctx.beginPath();
          ctx.moveTo(nx, PAD_T);
          ctx.lineTo(nx, H - PAD_B);
          ctx.setLineDash([4, 4]);
          ctx.strokeStyle = nowColor;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      /* --------- 主渲染 --------- */
      function render() {
        var stationKey = document.getElementById("locationSelect").value;
        var station = STATIONS[stationKey];
        var unit = document.getElementById("unitSelect").value;
        var dateVal = document.getElementById("dateInput").value;
        var parts = dateVal.split("-");
        var year = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var day = parseInt(parts[2], 10);
        var selectedDate = new Date(year, month - 1, day);

        var jd = julianDay(year, month, day);
        var SAMPLES = 288; /* 5-min 分辨率 */
        var pts = sampleDay(station, jd, SAMPLES);
        var extremes = findExtremes(pts);

        /* 绘图 */
        drawChart(pts, extremes, station, selectedDate);

        /* 极值卡片 */
        var grid = document.getElementById("extremesGrid");
        grid.innerHTML = "";
        extremes.forEach(function (ex, idx) {
          var card = document.createElement("div");
          card.className = "extreme-card " + ex.type;
          var labelEl = document.createElement("span");
          labelEl.className = "extreme-label";
          labelEl.textContent = (ex.type === "high" ? "▲ 高潮" : "▼ 低潮") + " #" + (idx + 1);
          var timeEl = document.createElement("span");
          timeEl.className = "extreme-time";
          timeEl.textContent = utcHrToLocal(ex.t, station.tz);
          var hEl = document.createElement("span");
          hEl.className = "extreme-height";
          hEl.textContent = fmtHeight(ex.h, unit);
          card.appendChild(labelEl);
          card.appendChild(timeEl);
          card.appendChild(hEl);
          grid.appendChild(card);
        });

        /* 统计 */
        var allH = pts.map(function (p) {
          return p[1];
        });
        var maxH = Math.max.apply(null, allH);
        var minH = Math.min.apply(null, allH);
        document.getElementById("statMax").textContent = fmtHeight(maxH, unit);
        document.getElementById("statMin").textContent = fmtHeight(minH, unit);
        document.getElementById("statRange").textContent = fmtHeight(maxH - minH, unit);

        /* 当前潮位 */
        var today = new Date();
        var isToday =
          selectedDate.getFullYear() === today.getFullYear() &&
          selectedDate.getMonth() === today.getMonth() &&
          selectedDate.getDate() === today.getDate();
        var nowTextEl = document.getElementById("nowText");
        if (isToday) {
          var nowUtcH =
            today.getUTCHours() + today.getUTCMinutes() / 60 + today.getUTCSeconds() / 3600;
          var nowH = tideHeight(station, jd, nowUtcH);
          var trend = "";
          if (nowUtcH + 0.25 < 24) {
            var nextH = tideHeight(station, jd, nowUtcH + 0.25);
            trend = nextH > nowH ? "↑ 涨潮" : "↓ 退潮";
          }
          nowTextEl.innerHTML =
            "当前潮高 <strong>" +
            fmtHeight(nowH, unit) +
            "</strong>&nbsp;&nbsp;" +
            trend +
            "&nbsp;&nbsp;（" +
            station.name +
            " 本地时 " +
            utcHrToLocal(nowUtcH, station.tz) +
            "）";
        } else {
          nowTextEl.innerHTML =
            "查看日期：" +
            dateVal +
            "&nbsp;&nbsp;（" +
            station.name +
            "，UTC" +
            (station.tz >= 0 ? "+" : "") +
            station.tz +
            "）";
        }

        document.getElementById("status").textContent = "已计算 " + extremes.length + " 个高低潮";
        document.getElementById("status").className = "status success";
      }

      /* --------- 事件绑定 --------- */
      function offsetDate(d, days) {
        var nd = new Date(d);
        nd.setDate(nd.getDate() + days);
        return nd;
      }
      function dateToInputVal(d) {
        return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
      }

      buildLocationSelect();

      var dateInput = document.getElementById("dateInput");
      dateInput.value = dateToInputVal(currentDate);

      document.getElementById("locationSelect").onchange = render;
      document.getElementById("unitSelect").onchange = render;
      dateInput.onchange = function () {
        var parts = dateInput.value.split("-");
        currentDate = new Date(
          parseInt(parts[0], 10),
          parseInt(parts[1], 10) - 1,
          parseInt(parts[2], 10)
        );
        render();
      };

      document.getElementById("btnToday").onclick = function () {
        currentDate = new Date();
        dateInput.value = dateToInputVal(currentDate);
        render();
      };
      document.getElementById("btnPrev").onclick = function () {
        currentDate = offsetDate(currentDate, -1);
        dateInput.value = dateToInputVal(currentDate);
        render();
      };
      document.getElementById("btnNext").onclick = function () {
        currentDate = offsetDate(currentDate, 1);
        dateInput.value = dateToInputVal(currentDate);
        render();
      };

      document.getElementById("btnCopy").onclick = async function () {
        var stationKey = document.getElementById("locationSelect").value;
        var station = STATIONS[stationKey];
        var unit = document.getElementById("unitSelect").value;
        var dateVal = document.getElementById("dateInput").value;
        var parts = dateVal.split("-");
        var jd = julianDay(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10));
        var pts = sampleDay(station, jd, 288);
        var extremes = findExtremes(pts);

        var lines = ["潮汐预报 — " + station.name + " — " + dateVal, ""];
        extremes.forEach(function (ex) {
          lines.push(
            (ex.type === "high" ? "高潮" : "低潮") +
              "  " +
              utcHrToLocal(ex.t, station.tz) +
              "  " +
              fmtHeight(ex.h, unit)
          );
        });
        lines.push("");
        var allH = pts.map(function (p) {
          return p[1];
        });
        var maxH = Math.max.apply(null, allH);
        var minH = Math.min.apply(null, allH);
        lines.push("最高潮: " + fmtHeight(maxH, unit) + "  最低潮: " + fmtHeight(minH, unit));
        lines.push("潮差: " + fmtHeight(maxH - minH, unit));
        lines.push("");
        lines.push("由 WebUtils 潮汐工具生成（调和分析估算值，仅供参考）");
        try {
          await navigator.clipboard.writeText(lines.join("\n"));
          document.getElementById("status").textContent = "已复制到剪贴板";
          document.getElementById("status").className = "status success";
        } catch (_e) {
          document.getElementById("status").textContent = "复制失败，请手动复制";
          document.getElementById("status").className = "status error";
        }
      };

      /* 窗口大小变化时重绘 */
      window.addEventListener("resize", render);

      /* 初始渲染 */
      render();

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        render();
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
    
