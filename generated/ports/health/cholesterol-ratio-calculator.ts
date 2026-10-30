// @ts-nocheck
// Generated from tools/health/cholesterol-ratio-calculator.html
// Source SHA-256: 84c309e4adb7ef4b4447c249564d2cb947614b1d084b8c969252531bc6bbc0bf
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var useMmol = true;

      var unitLabelIds = ["unitLabel1", "unitLabel2", "unitLabel3", "unitLabel4"];

      function setUnitLabels() {
        var unit = useMmol ? "(mmol/L)" : "(mg/dL)";
        unitLabelIds.forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.textContent = unit;
        });
        document.getElementById("btnUnit").textContent = useMmol
          ? "切换单位 (mmol/L ⇄ mg/dL)"
          : "切换单位 (mg/dL ⇄ mmol/L)";
      }

      function toMmol(val) {
        return useMmol ? val : val / 38.67;
      }

      function getVal(id) {
        var v = parseFloat(document.getElementById(id).value);
        return isNaN(v) || v < 0 ? null : v;
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function classifyLDL(ldlMmol) {
        if (ldlMmol < 2.6) return { level: "optimal", label: "理想" };
        if (ldlMmol < 3.37) return { level: "normal", label: "接近理想" };
        if (ldlMmol < 4.14) return { level: "borderline", label: "临界偏高" };
        if (ldlMmol < 4.91) return { level: "high", label: "偏高" };
        return { level: "very-high", label: "很高" };
      }

      function classifyHDL(hdlMmol) {
        if (hdlMmol >= 1.55) return { level: "optimal", label: "理想（心脏保护）" };
        if (hdlMmol >= 1.04) return { level: "normal", label: "正常" };
        return { level: "high", label: "偏低（风险升高）" };
      }

      function classifyTG(tgMmol) {
        if (tgMmol < 1.7) return { level: "optimal", label: "正常" };
        if (tgMmol < 2.26) return { level: "borderline", label: "临界偏高" };
        if (tgMmol < 5.65) return { level: "high", label: "偏高" };
        return { level: "very-high", label: "很高" };
      }

      function classifyTC(tcMmol) {
        if (tcMmol < 5.18) return { level: "optimal", label: "合适" };
        if (tcMmol < 6.22) return { level: "borderline", label: "临界偏高" };
        return { level: "high", label: "偏高" };
      }

      function classifyLDLHDL(ratio) {
        if (ratio < 2.0) return { level: "optimal", label: "理想" };
        if (ratio < 3.0) return { level: "normal", label: "良好" };
        if (ratio < 4.0) return { level: "borderline", label: "临界" };
        if (ratio < 5.0) return { level: "high", label: "偏高风险" };
        return { level: "very-high", label: "高风险" };
      }

      function classifyTCHDL(ratio) {
        if (ratio < 3.5) return { level: "optimal", label: "理想" };
        if (ratio < 5.0) return { level: "normal", label: "正常" };
        if (ratio < 6.0) return { level: "borderline", label: "临界" };
        return { level: "high", label: "偏高风险" };
      }

      function classifyNonHDL(nonHdlMmol) {
        if (nonHdlMmol < 3.37) return { level: "optimal", label: "理想" };
        if (nonHdlMmol < 4.14) return { level: "normal", label: "接近理想" };
        if (nonHdlMmol < 4.91) return { level: "borderline", label: "临界偏高" };
        if (nonHdlMmol < 5.68) return { level: "high", label: "偏高" };
        return { level: "very-high", label: "很高" };
      }

      function fmt(num) {
        return num.toFixed(2);
      }

      function badgeHtml(cls) {
        return '<span class="result-badge badge-' + cls.level + '">' + cls.label + "</span>";
      }

      function resultCardHtml(label, value, unit, cls) {
        return (
          '<div class="result-card risk-' +
          cls.level +
          '">' +
          '<div class="result-label">' +
          label +
          "</div>" +
          '<div class="result-value">' +
          value +
          "</div>" +
          '<div class="result-unit">' +
          unit +
          "</div>" +
          badgeHtml(cls) +
          "</div>"
        );
      }

      function calculate() {
        var tcRaw = getVal("inTotal");
        var ldlRaw = getVal("inLDL");
        var hdlRaw = getVal("inHDL");
        var tgRaw = getVal("inTG");

        var hasAny = tcRaw !== null || ldlRaw !== null || hdlRaw !== null || tgRaw !== null;
        if (!hasAny) {
          showStatus("请至少输入一项血脂指标", "error");
          return;
        }

        if (hdlRaw !== null && hdlRaw === 0) {
          showStatus("HDL 不能为 0", "error");
          return;
        }

        var tc = tcRaw !== null ? toMmol(tcRaw) : null;
        var ldl = ldlRaw !== null ? toMmol(ldlRaw) : null;
        var hdl = hdlRaw !== null ? toMmol(hdlRaw) : null;
        var tg = tgRaw !== null ? toMmol(tgRaw) : null;

        var cards = "";

        if (tc !== null) {
          cards += resultCardHtml("总胆固醇 TC", fmt(tc), "mmol/L", classifyTC(tc));
        }
        if (ldl !== null) {
          cards += resultCardHtml("LDL 胆固醇", fmt(ldl), "mmol/L", classifyLDL(ldl));
        }
        if (hdl !== null) {
          cards += resultCardHtml("HDL 胆固醇", fmt(hdl), "mmol/L", classifyHDL(hdl));
        }
        if (tg !== null) {
          cards += resultCardHtml("甘油三酯 TG", fmt(tg), "mmol/L", classifyTG(tg));
        }
        if (ldl !== null && hdl !== null && hdl > 0) {
          var ldlHdlRatio = ldl / hdl;
          cards += resultCardHtml(
            "LDL / HDL 比值",
            fmt(ldlHdlRatio),
            "比值越低越好",
            classifyLDLHDL(ldlHdlRatio)
          );
        }
        if (tc !== null && hdl !== null && hdl > 0) {
          var tcHdlRatio = tc / hdl;
          cards += resultCardHtml(
            "TC / HDL 比值",
            fmt(tcHdlRatio),
            "比值越低越好",
            classifyTCHDL(tcHdlRatio)
          );
        }
        if (tc !== null && hdl !== null) {
          var nonHDL = tc - hdl;
          cards += resultCardHtml(
            "非 HDL 胆固醇",
            fmt(nonHDL),
            "mmol/L（TC - HDL）",
            classifyNonHDL(nonHDL)
          );
        }

        var refTable =
          '<p class="section-title" style="margin-top:var(--space-6)">参考标准</p>' +
          '<div style="overflow-x:auto"><table class="reference-table">' +
          "<thead><tr>" +
          "<th>指标</th><th>理想</th><th>临界偏高</th><th>偏高 / 偏低</th>" +
          "</tr></thead><tbody>" +
          "<tr><td>TC（总胆固醇）</td><td>&lt; 5.18 mmol/L</td><td>5.18–6.21</td><td>&ge; 6.22</td></tr>" +
          "<tr><td>LDL（低密度）</td><td>&lt; 2.6 mmol/L</td><td>3.37–4.13</td><td>&ge; 4.14</td></tr>" +
          "<tr><td>HDL（高密度）</td><td>&ge; 1.55 mmol/L</td><td>1.04–1.54</td><td>&lt; 1.04（偏低）</td></tr>" +
          "<tr><td>TG（甘油三酯）</td><td>&lt; 1.7 mmol/L</td><td>1.7–2.25</td><td>&ge; 2.26</td></tr>" +
          "<tr><td>LDL/HDL 比值</td><td>&lt; 2.0</td><td>3.0–3.99</td><td>&ge; 5.0（高风险）</td></tr>" +
          "<tr><td>TC/HDL 比值</td><td>&lt; 3.5</td><td>5.0–5.99</td><td>&ge; 6.0（偏高风险）</td></tr>" +
          "<tr><td>非 HDL 胆固醇</td><td>&lt; 3.37 mmol/L</td><td>4.14–4.90</td><td>&ge; 4.91</td></tr>" +
          "</tbody></table></div>";

        document.getElementById("resultsArea").innerHTML =
          '<p class="section-title">计算结果</p>' +
          '<div class="results-grid">' +
          cards +
          "</div>" +
          refTable;

        showStatus("计算完成", "success");
      }

      document.getElementById("btnCalc").onclick = calculate;

      document.getElementById("btnClear").onclick = function () {
        ["inTotal", "inLDL", "inHDL", "inTG"].forEach(function (id) {
          document.getElementById(id).value = "";
        });
        document.getElementById("resultsArea").innerHTML =
          '<div class="placeholder-hint">' +
          '<div class="hint-icon">🩺</div>' +
          "<div>填入血脂化验数值后点击「计算」</div>" +
          "</div>";
        showStatus("", "");
      };

      document.getElementById("btnUnit").onclick = function () {
        var fields = ["inTotal", "inLDL", "inHDL", "inTG"];
        var convFactor = useMmol ? 38.67 : 1 / 38.67;
        fields.forEach(function (id) {
          var el = document.getElementById(id);
          var v = parseFloat(el.value);
          if (!isNaN(v) && v > 0) {
            el.value = (v * convFactor).toFixed(2);
          }
        });
        useMmol = !useMmol;
        setUnitLabels();
      };

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
      setUnitLabels();
    
