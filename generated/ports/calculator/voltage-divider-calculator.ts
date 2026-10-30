// @ts-nocheck
// Generated from tools/calculator/voltage-divider-calculator.html
// Source SHA-256: 0b1619f0103212a30c652d25cfa519a58b0025e82ccca6d28148625c7d378b4c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");

      function formatResistance(ohm) {
        if (ohm >= 1e6) return (ohm / 1e6).toPrecision(4) + " MΩ";
        if (ohm >= 1e3) return (ohm / 1e3).toPrecision(4) + " kΩ";
        return ohm.toPrecision(4) + " Ω";
      }

      function formatCurrent(ampere) {
        if (ampere < 1e-6) return (ampere * 1e9).toPrecision(4) + " nA";
        if (ampere < 1e-3) return (ampere * 1e6).toPrecision(4) + " μA";
        if (ampere < 1) return (ampere * 1e3).toPrecision(4) + " mA";
        return ampere.toPrecision(4) + " A";
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function showStats(vout, current, ratio) {
        document.getElementById("statVout").textContent = vout.toPrecision(5);
        document.getElementById("statI").textContent = formatCurrent(current);
        document.getElementById("statRatio").textContent = (ratio * 100).toFixed(2) + "%";
        statsEl.classList.add("show");
      }

      function getNumVal(id) {
        return parseFloat(document.getElementById(id).value);
      }

      function getUnitMult(id) {
        return parseFloat(document.getElementById(id).value);
      }

      function setFormulaBox(html) {
        document.getElementById("formulaBox").innerHTML = html;
      }

      /* ============================
         正向计算：Vin / R1 / R2 → Vout
      ============================ */
      function calcForward() {
        var vin = getNumVal("fVin");
        var r1Raw = getNumVal("fR1");
        var r2Raw = getNumVal("fR2");
        var r1Mult = getUnitMult("fR1Unit");
        var r2Mult = getUnitMult("fR2Unit");

        if (isNaN(vin) || isNaN(r1Raw) || isNaN(r2Raw)) {
          showStatus("请填写所有输入项", "error");
          return;
        }
        if (vin <= 0) {
          showStatus("Vin 必须大于 0", "error");
          return;
        }
        if (r1Raw < 0 || r2Raw < 0) {
          showStatus("电阻值不能为负", "error");
          return;
        }

        var r1 = r1Raw * r1Mult;
        var r2 = r2Raw * r2Mult;
        var rTotal = r1 + r2;

        if (rTotal === 0) {
          showStatus("R1 + R2 不能同时为 0", "error");
          return;
        }

        var vout = (vin * r2) / rTotal;
        var current = vin / rTotal;
        var ratio = r2 / rTotal;
        var powerMw = vin * current * 1000;

        document.getElementById("resVout").textContent = vout.toPrecision(5) + " V";
        document.getElementById("resVoutSub").textContent = "精确值 " + vout.toFixed(6) + " V";
        document.getElementById("resCurrent").textContent = formatCurrent(current);
        document.getElementById("resCurrentSub").textContent =
          "总阻 " + formatResistance(rTotal) + "  ·  功耗 " + powerMw.toPrecision(3) + " mW";
        document.getElementById("rcR2Solved").style.display = "none";

        setFormulaBox(
          '<div><span class="formula-eq">Vout</span> = ' +
            vin +
            " V × " +
            formatResistance(r2) +
            " / (" +
            formatResistance(r1) +
            " + " +
            formatResistance(r2) +
            ") = <strong>" +
            vout.toPrecision(5) +
            " V</strong></div>" +
            '<div><span class="formula-eq">I</span> = ' +
            vin +
            " V / " +
            formatResistance(rTotal) +
            " = <strong>" +
            formatCurrent(current) +
            "</strong></div>"
        );

        document.getElementById("svgR1Label").textContent = formatResistance(r1);
        document.getElementById("svgR2Label").textContent = formatResistance(r2);
        document.getElementById("svgVoutLabel").textContent = vout.toPrecision(4) + "V";

        showStats(vout, current, ratio);
        showStatus("计算完成", "success");
      }

      /* ============================
         反向计算：Vin / Vout / R1 → R2
      ============================ */
      function calcReverse() {
        var vin = getNumVal("rVin");
        var vout = getNumVal("rVout");
        var r1Raw = getNumVal("rR1");
        var r1Mult = getUnitMult("rR1Unit");

        if (isNaN(vin) || isNaN(vout) || isNaN(r1Raw)) {
          showStatus("请填写所有输入项", "error");
          return;
        }
        if (vin <= 0) {
          showStatus("Vin 必须大于 0", "error");
          return;
        }
        if (vout <= 0 || vout >= vin) {
          showStatus("Vout 必须满足 0 < Vout < Vin", "error");
          return;
        }
        if (r1Raw <= 0) {
          showStatus("R1 必须大于 0", "error");
          return;
        }

        var r1 = r1Raw * r1Mult;
        var r2 = (r1 * vout) / (vin - vout);
        var rTotal = r1 + r2;
        var current = vin / rTotal;
        var ratio = r2 / rTotal;
        var powerMw = vin * current * 1000;

        document.getElementById("resVout").textContent = vout.toPrecision(5) + " V";
        document.getElementById("resVoutSub").textContent = "目标输出电压（用户给定）";
        document.getElementById("resCurrent").textContent = formatCurrent(current);
        document.getElementById("resCurrentSub").textContent =
          "总阻 " + formatResistance(rTotal) + "  ·  功耗 " + powerMw.toPrecision(3) + " mW";

        document.getElementById("resR2Solved").textContent = formatResistance(r2);
        document.getElementById("resR2SolvedSub").textContent =
          "精确值 " + r2.toPrecision(6) + " Ω";
        document.getElementById("rcR2Solved").style.display = "";

        setFormulaBox(
          '<div><span class="formula-eq">R2</span> = R1 × Vout / (Vin − Vout) = ' +
            formatResistance(r1) +
            " × " +
            vout +
            " / (" +
            vin +
            " − " +
            vout +
            ") = <strong>" +
            formatResistance(r2) +
            "</strong></div>" +
            '<div><span class="formula-eq">I</span> = ' +
            vin +
            " V / " +
            formatResistance(rTotal) +
            " = <strong>" +
            formatCurrent(current) +
            "</strong></div>"
        );

        document.getElementById("svgR1Label").textContent = formatResistance(r1);
        document.getElementById("svgR2Label").textContent = formatResistance(r2);
        document.getElementById("svgVoutLabel").textContent = vout.toPrecision(4) + "V";

        showStats(vout, current, ratio);
        showStatus("求解完成", "success");
      }

      /* ============================
         重置辅助
      ============================ */
      function resetResults() {
        document.getElementById("resVout").textContent = "—";
        document.getElementById("resVoutSub").textContent = "";
        document.getElementById("resCurrent").textContent = "—";
        document.getElementById("resCurrentSub").textContent = "";
        document.getElementById("svgR1Label").textContent = "R1";
        document.getElementById("svgR2Label").textContent = "R2";
        document.getElementById("svgVoutLabel").textContent = "Vout";
        statsEl.classList.remove("show");
        showStatus("", "");
      }

      /* ============================
         模式切换
      ============================ */
      document.getElementById("tabForward").onclick = function () {
        document.getElementById("tabForward").classList.add("active");
        document.getElementById("tabReverse").classList.remove("active");
        document.getElementById("forwardForm").style.display = "";
        document.getElementById("reverseForm").style.display = "none";
        document.getElementById("rcR2Solved").style.display = "none";
        setFormulaBox(
          '<div><span class="formula-eq">Vout</span> = Vin × R2 / (R1 + R2)</div>' +
            '<div><span class="formula-eq">I</span> = Vin / (R1 + R2)</div>'
        );
        resetResults();
      };

      document.getElementById("tabReverse").onclick = function () {
        document.getElementById("tabReverse").classList.add("active");
        document.getElementById("tabForward").classList.remove("active");
        document.getElementById("reverseForm").style.display = "";
        document.getElementById("forwardForm").style.display = "none";
        document.getElementById("rcR2Solved").style.display = "none";
        setFormulaBox(
          '<div><span class="formula-eq">R2</span> = R1 × Vout / (Vin − Vout)</div>' +
            '<div><span class="formula-eq">I</span> = Vin / (R1 + R2)</div>'
        );
        resetResults();
      };

      /* ============================
         按钮绑定
      ============================ */
      document.getElementById("btnCalcForward").onclick = calcForward;
      document.getElementById("btnResetForward").onclick = function () {
        ["fVin", "fR1", "fR2"].forEach(function (id) {
          document.getElementById(id).value = "";
        });
        resetResults();
      };

      document.getElementById("btnCalcReverse").onclick = calcReverse;
      document.getElementById("btnResetReverse").onclick = function () {
        ["rVin", "rVout", "rR1"].forEach(function (id) {
          document.getElementById(id).value = "";
        });
        document.getElementById("rcR2Solved").style.display = "none";
        resetResults();
      };

      /* Enter 快捷触发 */
      document.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          var fVisible = document.getElementById("forwardForm").style.display !== "none";
          if (fVisible) {
            calcForward();
          } else {
            calcReverse();
          }
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
    
