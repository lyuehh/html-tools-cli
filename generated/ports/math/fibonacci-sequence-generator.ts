// @ts-nocheck
// Generated from tools/math/fibonacci-sequence-generator.html
// Source SHA-256: 2c72ea4d7d5e2b86ed3b9a9a072bb4df8973ca510a95956cb3e8f43772652d20
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      /* ===== BigInt-based Fibonacci generator ===== */

      var PHI = 1.618033988749895;
      var fibSequence = [];

      function generateFib(n, a, b) {
        var seq = [];
        var prev = BigInt(a);
        var curr = BigInt(b);
        if (n >= 1) seq.push(prev);
        if (n >= 2) seq.push(curr);
        for (var i = 2; i < n; i++) {
          var next = prev + curr;
          seq.push(next);
          prev = curr;
          curr = next;
        }
        return seq;
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function updateStats(seq) {
        document.getElementById("statN").textContent = seq.length;
        var lastStr = seq.length ? seq[seq.length - 1].toString() : "0";
        document.getElementById("statDigits").textContent = lastStr.length;
        var statsEl = document.getElementById("stats");
        if (seq.length >= 2) {
          var last = seq[seq.length - 1];
          var prev = seq[seq.length - 2];
          if (prev !== 0n) {
            var ratio = Number(last) / Number(prev);
            document.getElementById("statPhi").textContent = ratio.toFixed(10);
          } else {
            document.getElementById("statPhi").textContent = "—";
          }
          statsEl.classList.add("show");
        } else {
          statsEl.classList.remove("show");
        }
      }

      function renderSequence(seq) {
        var lines = seq.map(function (v, i) {
          var idx = String(i + 1).padStart(4, " ");
          return idx + ". " + v.toString();
        });
        document.getElementById("seqOutput").textContent = lines.join("\n");
        document.getElementById("seqInfo").textContent = seq.length + " 项";
      }

      function renderRatioTable(seq) {
        var tbody = document.getElementById("ratioBody");
        tbody.textContent = "";
        if (seq.length < 2) {
          var tr = document.createElement("tr");
          var td = document.createElement("td");
          td.setAttribute("colspan", "6");
          td.style.textAlign = "center";
          td.style.color = "var(--text-muted)";
          td.textContent = "至少需要 2 项";
          tr.appendChild(td);
          tbody.appendChild(tr);
          return;
        }
        for (var i = 0; i < seq.length - 1; i++) {
          var fn = seq[i];
          var fn1 = seq[i + 1];
          if (fn === 0n) continue;
          var ratio = Number(fn1) / Number(fn);
          var err = Math.abs(ratio - PHI);
          var accuracy = Math.max(0, Math.min(100, 100 - err * 100));
          var barWidth = Math.min(100, accuracy);
          var row = document.createElement("tr");

          var tdN = document.createElement("td");
          tdN.textContent = i + 1;

          var tdFn = document.createElement("td");
          var fnStr = fn.toString();
          tdFn.textContent = fnStr.length > 20 ? fnStr.slice(0, 17) + "…" : fnStr;

          var tdFn1 = document.createElement("td");
          var fn1Str = fn1.toString();
          tdFn1.textContent = fn1Str.length > 20 ? fn1Str.slice(0, 17) + "…" : fn1Str;

          var tdRatio = document.createElement("td");
          if (err < 0.0001) {
            var span = document.createElement("span");
            span.className = "phi-highlight";
            span.textContent = ratio.toFixed(10);
            tdRatio.appendChild(span);
          } else {
            tdRatio.textContent = ratio.toFixed(10);
          }

          var tdErr = document.createElement("td");
          tdErr.textContent = err < 1e-15 ? "< 1e-15" : err.toExponential(3);

          var tdBar = document.createElement("td");
          tdBar.className = "ratio-bar-cell";
          var bar = document.createElement("div");
          bar.className = "ratio-bar";
          bar.style.width = barWidth.toFixed(1) + "%";
          tdBar.appendChild(bar);

          row.appendChild(tdN);
          row.appendChild(tdFn);
          row.appendChild(tdFn1);
          row.appendChild(tdRatio);
          row.appendChild(tdErr);
          row.appendChild(tdBar);
          tbody.appendChild(row);
        }
      }

      function drawSpiral(seq) {
        var canvas = document.getElementById("spiralCanvas");
        var ctx = canvas.getContext("2d");
        var W = canvas.width;
        var H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        var rawTerms = seq
          .filter(function (v) {
            return v > 0n;
          })
          .slice(0, 12);

        if (rawTerms.length < 2) {
          ctx.fillStyle = "var(--text-muted, #55556a)";
          ctx.font = "14px monospace";
          ctx.textAlign = "center";
          ctx.fillText("需要至少 2 个正数项", W / 2, H / 2);
          return;
        }

        var totalSpan =
          Number(rawTerms[rawTerms.length - 1]) + Number(rawTerms[rawTerms.length - 2]);
        var scale = (Math.min(W, H) - 40) / totalSpan;
        var margin = 20;

        var dirs = [
          [1, 0],
          [0, -1],
          [-1, 0],
          [0, 1]
        ];

        var colors = [
          "rgba(0,245,212,0.55)",
          "rgba(76,201,240,0.55)",
          "rgba(139,92,246,0.55)",
          "rgba(247,37,133,0.55)",
          "rgba(255,159,28,0.55)",
          "rgba(16,185,129,0.55)"
        ];

        var terms = rawTerms.map(function (v) {
          return Number(v) * scale;
        });

        var rects = [];
        var curX = 0;
        var curY = 0;

        for (var i = 0; i < terms.length; i++) {
          var d = dirs[i % 4];
          var s = terms[i];
          rects.push({ x: curX, y: curY, s: s, d: d, idx: i });
          if (d[0] === 1) {
            curX += s;
          } else if (d[0] === -1) {
            curX -= s;
          } else if (d[1] === 1) {
            curY += s;
          } else {
            curY -= s;
          }
        }

        var bbMinX = Infinity;
        var bbMinY = Infinity;
        var bbMaxX = -Infinity;
        var bbMaxY = -Infinity;
        for (var ri = 0; ri < rects.length; ri++) {
          var r = rects[ri];
          var rx1 = r.x;
          var ry1 = r.y;
          var rx2 = r.x + r.s * (r.d[0] || 1);
          var ry2 = r.y + r.s * (r.d[1] || 1);
          bbMinX = Math.min(bbMinX, rx1, rx2);
          bbMinY = Math.min(bbMinY, ry1, ry2);
          bbMaxX = Math.max(bbMaxX, rx1, rx2);
          bbMaxY = Math.max(bbMaxY, ry1, ry2);
        }

        var offX = margin - bbMinX + (W - 2 * margin - (bbMaxX - bbMinX)) / 2;
        var offY = margin - bbMinY + (H - 2 * margin - (bbMaxY - bbMinY)) / 2;

        for (var di = 0; di < rects.length; di++) {
          var rect = rects[di];
          var ax = rect.x + offX;
          var ay = rect.y + offY;
          var sq = rect.s;
          var drawX = rect.d[0] < 0 ? ax - sq : ax;
          var drawY = rect.d[1] < 0 ? ay - sq : ay;
          ctx.fillStyle = colors[rect.idx % colors.length];
          ctx.fillRect(drawX, drawY, sq, sq);
          ctx.strokeStyle = "rgba(255,255,255,0.2)";
          ctx.lineWidth = 1;
          ctx.strokeRect(drawX, drawY, sq, sq);
          if (sq > 18) {
            ctx.fillStyle = "rgba(255,255,255,0.85)";
            ctx.font = "bold " + Math.min(14, sq * 0.35) + "px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(rawTerms[rect.idx].toString(), drawX + sq / 2, drawY + sq / 2);
          }
        }

        ctx.strokeStyle = "rgba(255,215,0,0.7)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        var firstArc = true;
        for (var ai = 0; ai < rects.length; ai++) {
          var arect = rects[ai];
          var asq = arect.s;
          if (asq < 1) continue;
          var adrawX = arect.d[0] < 0 ? arect.x + offX - asq : arect.x + offX;
          var adrawY = arect.d[1] < 0 ? arect.y + offY - asq : arect.y + offY;
          var arcX;
          var arcY;
          var startAngle;
          var endAngle;
          var adir = arect.idx % 4;
          if (adir === 0) {
            arcX = adrawX;
            arcY = adrawY + asq;
            startAngle = -Math.PI / 2;
            endAngle = 0;
          } else if (adir === 1) {
            arcX = adrawX + asq;
            arcY = adrawY + asq;
            startAngle = Math.PI;
            endAngle = -Math.PI / 2;
          } else if (adir === 2) {
            arcX = adrawX + asq;
            arcY = adrawY;
            startAngle = Math.PI / 2;
            endAngle = Math.PI;
          } else {
            arcX = adrawX;
            arcY = adrawY;
            startAngle = 0;
            endAngle = Math.PI / 2;
          }
          if (firstArc) {
            ctx.moveTo(arcX + asq * Math.cos(startAngle), arcY + asq * Math.sin(startAngle));
            firstArc = false;
          }
          ctx.arc(arcX, arcY, asq, startAngle, endAngle);
        }
        ctx.stroke();
      }

      function generate() {
        var n = parseInt(document.getElementById("fibCount").value, 10);
        var a = parseInt(document.getElementById("startA").value, 10);
        var b = parseInt(document.getElementById("startB").value, 10);
        if (isNaN(n) || n < 1 || n > 500) {
          showStatus("项数 N 需在 1 ~ 500 范围内", "error");
          return;
        }
        if (isNaN(a) || isNaN(b)) {
          showStatus("初始值必须是整数", "error");
          return;
        }
        try {
          fibSequence = generateFib(n, a, b);
          renderSequence(fibSequence);
          renderRatioTable(fibSequence);
          drawSpiral(fibSequence);
          updateStats(fibSequence);
          showStatus("生成成功，共 " + n + " 项", "success");
        } catch (e) {
          showStatus("生成失败: " + e.message, "error");
        }
      }

      function switchTab(name) {
        var tabs = ["Seq", "Ratio", "Spiral"];
        for (var t = 0; t < tabs.length; t++) {
          var tab = tabs[t];
          var btn = document.getElementById("tab" + tab);
          var panel = document.getElementById("panel" + tab);
          if (btn) btn.classList.toggle("active", tab === name);
          if (panel) panel.classList.toggle("active", tab === name);
        }
        if (name === "Spiral" && fibSequence.length) drawSpiral(fibSequence);
      }

      document.getElementById("btnGenerate").onclick = generate;

      document.getElementById("btnCopy").onclick = function () {
        if (!fibSequence.length) {
          showStatus("请先生成数列", "error");
          return;
        }
        var text = fibSequence
          .map(function (v) {
            return v.toString();
          })
          .join(", ");
        navigator.clipboard.writeText(text).then(
          function () {
            showStatus("数列已复制", "success");
          },
          function () {
            showStatus("复制失败", "error");
          }
        );
      };

      document.getElementById("btnReset").onclick = function () {
        document.getElementById("fibCount").value = "20";
        document.getElementById("startA").value = "0";
        document.getElementById("startB").value = "1";
        fibSequence = [];
        document.getElementById("seqOutput").textContent = "点击「生成」查看数列…";
        document.getElementById("seqInfo").textContent = "";
        document.getElementById("ratioBody").innerHTML =
          '<tr><td colspan="6" style="text-align:center;color:var(--text-muted)">请先生成数列</td></tr>';
        var canvas = document.getElementById("spiralCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("stats").classList.remove("show");
        document.getElementById("status").textContent = "";
        document.getElementById("status").className = "status";
      };

      document.getElementById("tabSeq").onclick = function () {
        switchTab("Seq");
      };
      document.getElementById("tabRatio").onclick = function () {
        switchTab("Ratio");
      };
      document.getElementById("tabSpiral").onclick = function () {
        switchTab("Spiral");
      };

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          generate();
        }
      });

      generate();

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
    
