// @ts-nocheck
// Generated from tools/business/nps-csat-calculator.html
// Source SHA-256: ad4822a04f101663e6a8319f8fade44c89a8f9695d355413e87a7f5c46e712ee
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ===== Tab switching =====
      var tabNames = ["Nps", "Csat", "Ces"];
      tabNames.forEach(function (name) {
        document.getElementById("tab" + name).addEventListener("click", function () {
          tabNames.forEach(function (t) {
            document.getElementById("tab" + t).classList.remove("active");
            document.getElementById("panel" + t).classList.remove("active");
          });
          document.getElementById("tab" + name).classList.add("active");
          document.getElementById("panel" + name).classList.add("active");
        });
      });

      // ===== Utilities =====
      function parseScores(text) {
        var parts = text.split(/[\n,;\s]+/);
        var scores = [];
        parts.forEach(function (p) {
          var trimmed = p.trim();
          if (trimmed === "") return;
          var n = parseFloat(trimmed);
          if (!isNaN(n)) scores.push(n);
        });
        return scores;
      }

      function showStatus(elId, msg, type) {
        var el = document.getElementById(elId);
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      // ===== NPS =====
      var NPS_SAMPLE =
        "9\n10\n8\n7\n10\n9\n6\n5\n9\n10\n8\n4\n9\n7\n10\n3\n9\n8\n10\n9\n6\n10\n8\n9\n7";

      function getNpsBand(score) {
        if (score >= 50) return { label: "优秀（Excellent）", cls: "excellent" };
        if (score >= 30) return { label: "良好（Good）", cls: "good" };
        if (score >= 0) return { label: "尚可（Needs Improvement）", cls: "fair" };
        return { label: "较差（At Risk）", cls: "poor" };
      }

      function calcNps() {
        var text = document.getElementById("npsInput").value;
        var scores = parseScores(text);
        if (scores.length === 0) {
          showStatus("npsStatus", "请输入评分数据", "error");
          return;
        }
        var valid = scores.filter(function (s) {
          return s >= 0 && s <= 10 && Number.isInteger(s);
        });
        var skipped = scores.length - valid.length;
        if (valid.length === 0) {
          showStatus("npsStatus", "没有有效的评分（需 0-10 整数）", "error");
          return;
        }
        var promoters = valid.filter(function (s) {
          return s >= 9;
        }).length;
        var passives = valid.filter(function (s) {
          return s >= 7 && s <= 8;
        }).length;
        var detractors = valid.filter(function (s) {
          return s <= 6;
        }).length;
        var total = valid.length;
        var proP = (promoters / total) * 100;
        var pasP = (passives / total) * 100;
        var detP = (detractors / total) * 100;
        var nps = Math.round(proP - detP);
        var band = getNpsBand(nps);

        var freq = {};
        var i;
        for (i = 0; i <= 10; i++) freq[i] = 0;
        valid.forEach(function (s) {
          freq[s]++;
        });
        var freqVals = [];
        for (i = 0; i <= 10; i++) freqVals.push(freq[i]);
        var maxFreq = Math.max.apply(null, freqVals);

        var resultsEl = document.getElementById("npsResults");
        var html = "";

        html +=
          '<div class="nps-score-display">' +
          '<div class="nps-score-number ' +
          band.cls +
          '">' +
          (nps > 0 ? "+" : "") +
          nps +
          "</div>" +
          '<div class="nps-score-band">NPS 分数 &nbsp;·&nbsp; ' +
          band.label +
          "</div>" +
          '<div class="score-bands">' +
          '<div class="score-band-item"><span class="score-band-dot" style="background:var(--color-error)"></span>&lt;0 较差</div>' +
          '<div class="score-band-item"><span class="score-band-dot" style="background:var(--color-warning)"></span>0~30 尚可</div>' +
          '<div class="score-band-item"><span class="score-band-dot" style="background:var(--color-accent-primary)"></span>30~50 良好</div>' +
          '<div class="score-band-item"><span class="score-band-dot" style="background:var(--color-success)"></span>50+ 优秀</div>' +
          "</div>" +
          "</div>";

        html +=
          '<div class="results-grid">' +
          '<div class="result-card promoter">' +
          '<div class="result-card-value">' +
          proP.toFixed(1) +
          "%</div>" +
          '<div class="result-card-label">推荐者</div>' +
          '<div class="result-card-sub">' +
          promoters +
          " 人 · 9-10 分</div>" +
          "</div>" +
          '<div class="result-card passive">' +
          '<div class="result-card-value">' +
          pasP.toFixed(1) +
          "%</div>" +
          '<div class="result-card-label">被动者</div>' +
          '<div class="result-card-sub">' +
          passives +
          " 人 · 7-8 分</div>" +
          "</div>" +
          '<div class="result-card detractor">' +
          '<div class="result-card-value">' +
          detP.toFixed(1) +
          "%</div>" +
          '<div class="result-card-label">贬损者</div>' +
          '<div class="result-card-sub">' +
          detractors +
          " 人 · 0-6 分</div>" +
          "</div>" +
          "</div>";

        html +=
          '<div class="nps-gauge-wrap">' +
          '<div class="nps-gauge-label"><span>贬损者 ' +
          detP.toFixed(1) +
          "%</span><span>被动者 " +
          pasP.toFixed(1) +
          "%</span><span>推荐者 " +
          proP.toFixed(1) +
          "%</span></div>" +
          '<div class="nps-gauge-bar">' +
          '<div class="nps-gauge-det" style="width:' +
          detP.toFixed(1) +
          '%"></div>' +
          '<div class="nps-gauge-pas" style="width:' +
          pasP.toFixed(1) +
          '%"></div>' +
          '<div class="nps-gauge-pro" style="width:' +
          proP.toFixed(1) +
          '%"></div>' +
          "</div>" +
          "</div>";

        html +=
          '<div style="background:var(--color-bg-input);border:1px solid var(--color-border-default);border-radius:var(--radius-md);padding:var(--space-4);">' +
          '<div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:var(--space-3);">分值分布</div>';
        for (var score = 10; score >= 0; score--) {
          var cnt = freq[score];
          var barW = maxFreq > 0 ? Math.round((cnt / maxFreq) * 100) : 0;
          var bColor =
            score >= 9
              ? "var(--color-success)"
              : score >= 7
                ? "var(--color-warning)"
                : "var(--color-error)";
          html +=
            '<div style="display:flex;align-items:center;gap:var(--space-2);margin-bottom:4px;">' +
            '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);width:20px;text-align:right;">' +
            score +
            "</span>" +
            '<div style="flex:1;height:10px;background:var(--color-bg-subtle);border-radius:var(--radius-full);overflow:hidden;">' +
            '<div style="width:' +
            barW +
            "%;height:100%;background:" +
            bColor +
            ';border-radius:var(--radius-full);"></div>' +
            "</div>" +
            '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);width:24px;">' +
            cnt +
            "</span>" +
            "</div>";
        }
        html += "</div>";

        resultsEl.innerHTML = html;

        document.getElementById("npsStatTotal").textContent = total;
        document.getElementById("npsStatPro").textContent = promoters;
        document.getElementById("npsStatPas").textContent = passives;
        document.getElementById("npsStatDet").textContent = detractors;
        document.getElementById("npsStats").classList.add("show");
        var statusMsg = "NPS = " + (nps > 0 ? "+" : "") + nps + "（共 " + total + " 条响应）";
        if (skipped > 0) statusMsg += "，已忽略 " + skipped + " 个无效值";
        showStatus("npsStatus", statusMsg, "success");
      }

      document.getElementById("btnNpsCalc").addEventListener("click", calcNps);

      document.getElementById("btnNpsSample").addEventListener("click", function () {
        document.getElementById("npsInput").value = NPS_SAMPLE;
        calcNps();
      });

      document.getElementById("btnNpsClear").addEventListener("click", function () {
        document.getElementById("npsInput").value = "";
        document.getElementById("npsResults").innerHTML =
          '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-family:var(--font-mono);font-size:0.875rem;">输入评分后点击「计算 NPS」</div>';
        document.getElementById("npsStats").classList.remove("show");
        showStatus("npsStatus", "", "");
      });

      document.getElementById("btnNpsCopy").addEventListener("click", function () {
        var npsNumEl = document.querySelector(".nps-score-number");
        if (!npsNumEl) {
          showStatus("npsStatus", "尚无结果", "error");
          return;
        }
        var copyText =
          "NPS 分数: " +
          npsNumEl.textContent.trim() +
          "\n总响应数: " +
          document.getElementById("npsStatTotal").textContent +
          "\n推荐者: " +
          document.getElementById("npsStatPro").textContent +
          "\n被动者: " +
          document.getElementById("npsStatPas").textContent +
          "\n贬损者: " +
          document.getElementById("npsStatDet").textContent;
        navigator.clipboard.writeText(copyText).then(
          function () {
            showStatus("npsStatus", "已复制到剪贴板", "success");
          },
          function () {
            showStatus("npsStatus", "复制失败", "error");
          }
        );
      });

      document.getElementById("npsInput").addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          calcNps();
        }
      });

      // ===== CSAT =====
      function calcCsatFromInputs() {
        var satisfied = parseInt(document.getElementById("csatSatisfied").value, 10);
        var total = parseInt(document.getElementById("csatTotal").value, 10);
        if (isNaN(satisfied) || isNaN(total) || total <= 0) {
          showStatus("csatStatus", "请输入有效的满意数和总数", "error");
          return;
        }
        if (satisfied > total) {
          showStatus("csatStatus", "满意响应数不能超过总响应数", "error");
          return;
        }
        var pct = (satisfied / total) * 100;
        renderCsatResult(pct, satisfied, total);
        showStatus(
          "csatStatus",
          "CSAT = " + pct.toFixed(1) + "%（" + satisfied + "/" + total + "）",
          "success"
        );
      }

      function calcCsatFromBatch() {
        var text = document.getElementById("csatBatch").value;
        var scale = parseInt(document.getElementById("csatScale").value, 10);
        var scores = parseScores(text);
        if (scores.length === 0) {
          showStatus("csatStatus", "请输入评分数据", "error");
          return;
        }
        var threshold = scale === 3 ? 3 : scale === 10 ? 8 : 4;
        var satisfied = scores.filter(function (s) {
          return s >= threshold;
        }).length;
        var total = scores.length;
        var pct = (satisfied / total) * 100;
        renderCsatResult(pct, satisfied, total);
        showStatus(
          "csatStatus",
          "CSAT = " + pct.toFixed(1) + "% · 量表 1-" + scale + "（≥" + threshold + " 分算满意）",
          "success"
        );
      }

      function renderCsatResult(pct, satisfied, total) {
        var color =
          pct >= 80
            ? "var(--color-success)"
            : pct >= 60
              ? "var(--color-warning)"
              : "var(--color-error)";
        var label = pct >= 80 ? "优秀" : pct >= 60 ? "尚可" : "需改进";
        var html =
          '<div class="csat-result-box">' +
          '<div class="csat-metric" style="border-color:' +
          color +
          ';">' +
          '<div class="csat-metric-value" style="color:' +
          color +
          '">' +
          pct.toFixed(1) +
          "%</div>" +
          '<div class="csat-metric-label">CSAT 分数</div>' +
          '<div class="csat-metric-sub">' +
          label +
          "</div>" +
          "</div>" +
          '<div class="csat-metric">' +
          '<div class="csat-metric-value">' +
          satisfied +
          "</div>" +
          '<div class="csat-metric-label">满意响应数</div>' +
          "</div>" +
          '<div class="csat-metric">' +
          '<div class="csat-metric-value">' +
          total +
          "</div>" +
          '<div class="csat-metric-label">总响应数</div>' +
          "</div>" +
          "</div>" +
          '<div class="scale-info" style="margin-top:var(--space-4);">' +
          '<div class="scale-info-item"><span class="scale-dot" style="background:var(--color-success)"></span>≥80% 优秀</div>' +
          '<div class="scale-info-item"><span class="scale-dot" style="background:var(--color-warning)"></span>60-80% 尚可</div>' +
          '<div class="scale-info-item"><span class="scale-dot" style="background:var(--color-error)"></span>&lt;60% 需改进</div>' +
          "</div>";
        document.getElementById("csatResults").innerHTML = html;
      }

      document.getElementById("btnCsatCalc").addEventListener("click", function () {
        var batchText = document.getElementById("csatBatch").value.trim();
        if (batchText) {
          calcCsatFromBatch();
        } else {
          calcCsatFromInputs();
        }
      });

      // ===== CES =====
      var CES_SAMPLE = "2\n3\n1\n4\n2\n5\n3\n2\n1\n3\n4\n2\n3\n2\n1";

      function calcCes() {
        var text = document.getElementById("cesInput").value;
        var scaleMax = parseInt(document.getElementById("cesScale").value, 10);
        var scores = parseScores(text);
        if (scores.length === 0) {
          showStatus("cesStatus", "请输入评分数据", "error");
          return;
        }
        var valid = scores.filter(function (s) {
          return s >= 1 && s <= scaleMax;
        });
        if (valid.length === 0) {
          showStatus("cesStatus", "没有有效评分（1-" + scaleMax + "）", "error");
          return;
        }
        var sum = valid.reduce(function (a, b) {
          return a + b;
        }, 0);
        var avg = sum / valid.length;
        var midpoint = (scaleMax + 1) / 2;
        var lowCount = valid.filter(function (s) {
          return s <= Math.floor(midpoint);
        }).length;
        var lowPct = ((lowCount / valid.length) * 100).toFixed(1);

        var color =
          avg <= midpoint
            ? "var(--color-success)"
            : avg <= midpoint + 1
              ? "var(--color-warning)"
              : "var(--color-error)";
        var label =
          avg <= midpoint
            ? "费力度低（良好）"
            : avg <= midpoint + 1
              ? "费力度中等"
              : "费力度较高（需改进）";

        var freq = {};
        var i;
        for (i = 1; i <= scaleMax; i++) freq[i] = 0;
        valid.forEach(function (s) {
          var rounded = Math.round(s);
          if (rounded >= 1 && rounded <= scaleMax) freq[rounded]++;
        });
        var freqVals = [];
        for (i = 1; i <= scaleMax; i++) freqVals.push(freq[i]);
        var maxF = Math.max.apply(null, freqVals);

        var html =
          '<div style="display:flex;gap:var(--space-4);flex-wrap:wrap;margin-bottom:var(--space-4);">' +
          '<div class="csat-metric" style="border-color:' +
          color +
          ';min-width:120px;">' +
          '<div class="csat-metric-value" style="color:' +
          color +
          '">' +
          avg.toFixed(2) +
          "</div>" +
          '<div class="csat-metric-label">CES 平均分</div>' +
          '<div class="csat-metric-sub">' +
          label +
          "</div>" +
          "</div>" +
          '<div class="csat-metric" style="min-width:100px;">' +
          '<div class="csat-metric-value">' +
          valid.length +
          "</div>" +
          '<div class="csat-metric-label">总响应数</div>' +
          "</div>" +
          '<div class="csat-metric" style="min-width:100px;">' +
          '<div class="csat-metric-value">' +
          lowPct +
          "%</div>" +
          '<div class="csat-metric-label">低费力(%)</div>' +
          '<div class="csat-metric-sub">≤' +
          Math.floor(midpoint) +
          " 分</div>" +
          "</div>" +
          "</div>";

        html +=
          '<div style="background:var(--color-bg-input);border:1px solid var(--color-border-default);border-radius:var(--radius-md);padding:var(--space-4);">' +
          '<div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:var(--space-3);">分值分布（1=最容易）</div>';
        for (var s = 1; s <= scaleMax; s++) {
          var cnt = freq[s];
          var barW = maxF > 0 ? Math.round((cnt / maxF) * 100) : 0;
          var bColor =
            s <= Math.floor(midpoint)
              ? "var(--color-success)"
              : s <= Math.ceil(midpoint)
                ? "var(--color-warning)"
                : "var(--color-error)";
          html +=
            '<div style="display:flex;align-items:center;gap:var(--space-2);margin-bottom:4px;">' +
            '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);width:20px;text-align:right;">' +
            s +
            "</span>" +
            '<div style="flex:1;height:10px;background:var(--color-bg-subtle);border-radius:var(--radius-full);overflow:hidden;">' +
            '<div style="width:' +
            barW +
            "%;height:100%;background:" +
            bColor +
            ';border-radius:var(--radius-full);"></div>' +
            "</div>" +
            '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);width:24px;">' +
            cnt +
            "</span>" +
            "</div>";
        }
        html += "</div>";

        document.getElementById("cesResults").innerHTML = html;
        document.getElementById("cesStatTotal").textContent = valid.length;
        document.getElementById("cesStatAvg").textContent = avg.toFixed(2);
        document.getElementById("cesStats").classList.add("show");
        showStatus(
          "cesStatus",
          "CES = " + avg.toFixed(2) + "（1-" + scaleMax + " 量表，分数越低越好）",
          "success"
        );
      }

      document.getElementById("btnCesCalc").addEventListener("click", calcCes);

      document.getElementById("btnCesSample").addEventListener("click", function () {
        document.getElementById("cesInput").value = CES_SAMPLE;
        calcCes();
      });

      document.getElementById("btnCesClear").addEventListener("click", function () {
        document.getElementById("cesInput").value = "";
        document.getElementById("cesResults").innerHTML =
          '<div style="color:var(--text-muted);font-family:var(--font-mono);font-size:0.875rem;padding:var(--space-4) 0;">输入评分后点击「计算 CES」</div>';
        document.getElementById("cesStats").classList.remove("show");
        showStatus("cesStatus", "", "");
      });

      document.getElementById("cesInput").addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          calcCes();
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
    
