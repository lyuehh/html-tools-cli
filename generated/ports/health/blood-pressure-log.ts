// @ts-nocheck
// Generated from tools/health/blood-pressure-log.html
// Source SHA-256: 4a39500f67aa9f84c5c85ec9d14563752b7c1d3c03593f7d86b19511efc4c363
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "bp_log_v1";
      let records = [];

      /* ── helpers ── */
      function showStatus(msg, type) {
        const el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function todayStr() {
        return new Date().toISOString().slice(0, 10);
      }

      function nowTimeStr() {
        const d = new Date();
        return d.toTimeString().slice(0, 5);
      }

      function classifyBP(sys, dia) {
        if (sys > 180 || dia > 120) return { label: "高血压危象", cls: "crisis" };
        if (sys >= 140 || dia >= 90) return { label: "2 期高血压", cls: "stage2" };
        if (sys >= 130 || dia >= 80) return { label: "1 期高血压", cls: "stage1" };
        if (sys >= 120 && dia < 80) return { label: "升高", cls: "elevated" };
        return { label: "正常", cls: "normal" };
      }

      function save() {
        localStorage.setItem(LS_KEY, JSON.stringify(records));
      }

      function load() {
        try {
          const raw = localStorage.getItem(LS_KEY);
          records = raw ? JSON.parse(raw) : [];
        } catch (e) {
          records = [];
        }
      }

      function avg(arr) {
        if (!arr.length) return "--";
        return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
      }

      /* ── stats ── */
      function updateStats() {
        if (!records.length) {
          document.getElementById("statsGrid").style.display = "none";
          return;
        }
        document.getElementById("statsGrid").style.display = "";
        const sys = records.map((r) => r.sys);
        const dia = records.map((r) => r.dia);
        const hr = records.filter((r) => r.hr).map((r) => r.hr);
        document.getElementById("avgSys").textContent = avg(sys);
        document.getElementById("avgDia").textContent = avg(dia);
        document.getElementById("avgHr").textContent = avg(hr) || "--";
        document.getElementById("maxSys").textContent = Math.max(...sys);
        document.getElementById("minSys").textContent = Math.min(...sys);
        document.getElementById("totalRec").textContent = records.length;
      }

      /* ── table ── */
      function renderTable() {
        const tbody = document.getElementById("bpTableBody");
        tbody.innerHTML = "";
        if (!records.length) {
          const tr = document.createElement("tr");
          tr.className = "no-data";
          const td = document.createElement("td");
          td.colSpan = 8;
          td.textContent = "暂无记录";
          tr.appendChild(td);
          tbody.appendChild(tr);
          return;
        }
        const sorted = [...records].sort((a, b) => {
          const da = a.date + (a.time || "");
          const db = b.date + (b.time || "");
          return db.localeCompare(da);
        });
        sorted.forEach((r) => {
          const cat = classifyBP(r.sys, r.dia);
          const tr = document.createElement("tr");
          tr.innerHTML =
            "<td>" +
            r.date +
            "</td><td>" +
            (r.time || "--") +
            "</td><td><strong>" +
            r.sys +
            "</strong></td><td><strong>" +
            r.dia +
            "</strong></td><td>" +
            (r.hr || "--") +
            "</td><td><span class='bp-badge " +
            cat.cls +
            "'>" +
            cat.label +
            "</span></td><td>" +
            (r.note || "") +
            "</td><td><button class='del-btn' data-id='" +
            r.id +
            "' aria-label='删除'>&#xD7;</button></td>";
          tbody.appendChild(tr);
        });
      }

      /* ── chart ── */
      function renderChart() {
        const canvas = document.getElementById("bpChart");
        const empty = document.getElementById("chartEmpty");
        const legend = document.getElementById("chartLegend");

        if (records.length < 2) {
          canvas.style.display = "none";
          legend.style.display = "none";
          empty.style.display = "flex";
          return;
        }
        canvas.style.display = "block";
        legend.style.display = "flex";
        empty.style.display = "none";

        const sorted = [...records].sort((a, b) => {
          const da = a.date + (a.time || "");
          const db = b.date + (b.time || "");
          return da.localeCompare(db);
        });

        const dpr = window.devicePixelRatio || 1;
        const W = canvas.parentElement.clientWidth;
        const H = 220;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + "px";
        canvas.style.height = H + "px";

        const ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);

        const PAD = { top: 16, right: 24, bottom: 40, left: 44 };
        const chartW = W - PAD.left - PAD.right;
        const chartH = H - PAD.top - PAD.bottom;

        const sysVals = sorted.map((r) => r.sys);
        const diaVals = sorted.map((r) => r.dia);
        const hrVals = sorted.map((r) => r.hr || null);
        const allNums = [...sysVals, ...diaVals, ...hrVals.filter(Boolean)];
        const minV = Math.max(0, Math.min(...allNums) - 10);
        const maxV = Math.max(...allNums) + 10;

        function xOf(i) {
          return PAD.left + (i / (sorted.length - 1)) * chartW;
        }
        function yOf(v) {
          return PAD.top + chartH - ((v - minV) / (maxV - minV)) * chartH;
        }

        /* hypertension zone (>=140 systolic) */
        const yHyp = yOf(140);
        ctx.fillStyle = "rgba(244,63,94,0.06)";
        ctx.fillRect(PAD.left, PAD.top, chartW, Math.max(0, yHyp - PAD.top));

        /* grid lines */
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.lineWidth = 1;
        const ticks = 5;
        for (let i = 0; i <= ticks; i++) {
          const v = minV + ((maxV - minV) * i) / ticks;
          const y = yOf(v);
          ctx.beginPath();
          ctx.moveTo(PAD.left, y);
          ctx.lineTo(PAD.left + chartW, y);
          ctx.stroke();
          ctx.fillStyle = "rgba(136,136,160,0.7)";
          ctx.font = "10px JetBrains Mono, monospace";
          ctx.textAlign = "right";
          ctx.fillText(Math.round(v), PAD.left - 6, y + 4);
        }

        /* x-axis labels (date) */
        ctx.fillStyle = "rgba(136,136,160,0.7)";
        ctx.font = "9px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        const step = Math.max(1, Math.floor(sorted.length / 6));
        for (let i = 0; i < sorted.length; i += step) {
          ctx.fillText(sorted[i].date.slice(5), xOf(i), PAD.top + chartH + 18);
        }

        /* draw line helper */
        function drawLine(vals, color, dash) {
          ctx.save();
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.lineJoin = "round";
          ctx.lineCap = "round";
          if (dash) ctx.setLineDash(dash);
          ctx.beginPath();
          let started = false;
          for (let i = 0; i < vals.length; i++) {
            if (vals[i] == null) {
              started = false;
              continue;
            }
            if (!started) {
              ctx.moveTo(xOf(i), yOf(vals[i]));
              started = true;
            } else {
              ctx.lineTo(xOf(i), yOf(vals[i]));
            }
          }
          ctx.stroke();
          ctx.restore();
          /* dots */
          for (let i = 0; i < vals.length; i++) {
            if (vals[i] == null) continue;
            ctx.beginPath();
            ctx.arc(xOf(i), yOf(vals[i]), 3, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
          }
        }

        drawLine(sysVals, "#f43f5e", null);
        drawLine(diaVals, "#4cc9f0", null);
        if (hrVals.some(Boolean)) drawLine(hrVals, "#fbbf24", [4, 3]);
      }

      /* ── render all ── */
      function render() {
        renderTable();
        renderChart();
        updateStats();
      }

      /* ── add record ── */
      document.getElementById("btnAdd").onclick = function () {
        const dateEl = document.getElementById("fDate");
        const timeEl = document.getElementById("fTime");
        const sysEl = document.getElementById("fSys");
        const diaEl = document.getElementById("fDia");
        const hrEl = document.getElementById("fHr");
        const noteEl = document.getElementById("fNote");

        const date = dateEl.value;
        const sys = parseInt(sysEl.value, 10);
        const dia = parseInt(diaEl.value, 10);
        const hr = hrEl.value ? parseInt(hrEl.value, 10) : null;

        if (!date) {
          showStatus("请选择日期", "error");
          dateEl.focus();
          return;
        }
        if (isNaN(sys) || sys < 60 || sys > 250) {
          showStatus("收缩压范围 60–250 mmHg", "error");
          sysEl.focus();
          return;
        }
        if (isNaN(dia) || dia < 40 || dia > 150) {
          showStatus("舒张压范围 40–150 mmHg", "error");
          diaEl.focus();
          return;
        }
        if (hr !== null && (isNaN(hr) || hr < 30 || hr > 250)) {
          showStatus("心率范围 30–250 次/分", "error");
          hrEl.focus();
          return;
        }

        records.push({
          id: Date.now(),
          date,
          time: timeEl.value || "",
          sys,
          dia,
          hr,
          note: noteEl.value.trim()
        });
        save();
        render();

        /* reset value fields, keep date/time */
        sysEl.value = "";
        diaEl.value = "";
        hrEl.value = "";
        noteEl.value = "";
        sysEl.focus();

        const cat = classifyBP(sys, dia);
        showStatus(
          "已添加：" + sys + "/" + dia + " mmHg — " + cat.label,
          cat.cls === "normal" ? "success" : ""
        );
      };

      /* ── delete via event delegation ── */
      document.getElementById("bpTableBody").addEventListener("click", function (e) {
        const btn = e.target.closest(".del-btn");
        if (!btn) return;
        const id = Number(btn.dataset.id);
        records = records.filter((r) => r.id !== id);
        save();
        render();
        showStatus("已删除", "");
      });

      /* ── export CSV ── */
      document.getElementById("btnExport").onclick = function () {
        if (!records.length) {
          showStatus("没有数据可导出", "error");
          return;
        }
        const header = "日期,时间,收缩压(mmHg),舒张压(mmHg),心率(次/分),分类,备注";
        const rows = records
          .slice()
          .sort((a, b) => (a.date + (a.time || "")).localeCompare(b.date + (b.time || "")))
          .map((r) => {
            const cat = classifyBP(r.sys, r.dia);
            return [
              r.date,
              r.time || "",
              r.sys,
              r.dia,
              r.hr != null ? r.hr : "",
              cat.label,
              '"' + (r.note || "").replace(/"/g, '""') + '"'
            ].join(",");
          });
        const csv = [header, ...rows].join("\r\n");
        const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "blood-pressure-log-" + todayStr() + ".csv";
        a.click();
        URL.revokeObjectURL(a.href);
        showStatus("已导出 " + records.length + " 条记录", "success");
      };

      /* ── import CSV ── */
      document.getElementById("btnImport").onclick = function () {
        document.getElementById("fileInput").click();
      };

      document.getElementById("fileInput").addEventListener("change", function (e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (evt) {
          const lines = evt.target.result
            .replace(/^\ufeff/, "")
            .split(/\r?\n/)
            .filter(Boolean);
          if (lines.length < 2) {
            showStatus("CSV 格式不正确", "error");
            return;
          }
          let imported = 0;
          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(",");
            const date = (cols[0] || "").trim();
            const sys = parseInt(cols[2], 10);
            const dia = parseInt(cols[3], 10);
            const hr = cols[4] && cols[4].trim() ? parseInt(cols[4], 10) : null;
            if (!date || isNaN(sys) || isNaN(dia)) continue;
            if (records.some((r) => r.date === date && r.sys === sys && r.dia === dia)) continue;
            records.push({
              id: Date.now() + i,
              date,
              time: (cols[1] || "").trim(),
              sys,
              dia,
              hr: hr != null && !isNaN(hr) ? hr : null,
              note: (cols[6] || "").replace(/^"|"$/g, "").replace(/""/g, '"').trim()
            });
            imported++;
          }
          save();
          render();
          showStatus("导入 " + imported + " 条新记录", "success");
        };
        reader.readAsText(file, "utf-8");
        e.target.value = "";
      });

      /* ── clear all ── */
      document.getElementById("btnClearAll").onclick = function () {
        if (!records.length) {
          showStatus("没有记录", "error");
          return;
        }
        if (!window.confirm("确定要清空所有 " + records.length + " 条记录吗？此操作不可撤销。")) {
          return;
        }
        records = [];
        save();
        render();
        showStatus("已清空", "");
      };

      /* ── re-draw chart on resize ── */
      window.addEventListener(
        "resize",
        (function () {
          let t;
          return function () {
            clearTimeout(t);
            t = setTimeout(renderChart, 120);
          };
        })()
      );

      /* ── init ── */
      function init() {
        document.getElementById("fDate").value = todayStr();
        document.getElementById("fTime").value = nowTimeStr();
        load();
        render();
      }

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
      init();
    
