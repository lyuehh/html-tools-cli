// @ts-nocheck
// Generated from tools/calculator/vat-gst-calculator.html
// Source SHA-256: 3d7ce8c7888c4faef427bedea7ea73c33c9d48f520820d100f4c89f1f47850f7
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var RATE_PRESETS = [
        { label: "0%", value: 0 },
        { label: "5%", value: 5 },
        { label: "6%", value: 6 },
        { label: "7%", value: 7 },
        { label: "9%", value: 9 },
        { label: "10%", value: 10 },
        { label: "13%", value: 13 },
        { label: "15%", value: 15 },
        { label: "18%", value: 18 },
        { label: "19%", value: 19 },
        { label: "20%", value: 20 },
        { label: "25%", value: 25 }
      ];

      var RATE_TABLE_DATA = [
        { country: "中国", type: "增值税 VAT", standard: "13%", reduced: "6% / 9% / 0%" },
        { country: "澳大利亚", type: "GST", standard: "10%", reduced: "0%（食品）" },
        { country: "加拿大", type: "GST/HST", standard: "5%（GST）", reduced: "0%（基本食品）" },
        { country: "德国", type: "MwSt / VAT", standard: "19%", reduced: "7%" },
        { country: "法国", type: "TVA / VAT", standard: "20%", reduced: "10% / 5.5% / 2.1%" },
        { country: "英国", type: "VAT", standard: "20%", reduced: "5%（能源）/ 0%（食品）" },
        { country: "日本", type: "消費税", standard: "10%", reduced: "8%（食品、饮料）" },
        { country: "印度", type: "GST", standard: "18%", reduced: "5% / 12% / 28%" },
        { country: "新加坡", type: "GST", standard: "9%", reduced: "—" },
        { country: "新西兰", type: "GST", standard: "15%", reduced: "—" },
        { country: "巴西", type: "ICMS / IPI", standard: "~17-19%", reduced: "因州而异" },
        { country: "美国", type: "Sales Tax（各州）", standard: "0-13%", reduced: "因州/品类而异" }
      ];

      var CURRENCY_SYMBOLS = {
        CNY: "¥",
        USD: "$",
        EUR: "€",
        GBP: "£",
        AUD: "A$",
        CAD: "C$",
        SGD: "S$",
        INR: "₹",
        JPY: "¥"
      };

      var currentMode = "add";

      var priceInputEl = document.getElementById("priceInput");
      var rateInputEl = document.getElementById("rateInput");
      var qtyInputEl = document.getElementById("qtyInput");
      var currencySelectEl = document.getElementById("currencySelect");
      var statusEl = document.getElementById("status");
      var resultVal1El = document.getElementById("resultVal1");
      var resultVal2El = document.getElementById("resultVal2");
      var resultVal3El = document.getElementById("resultVal3");
      var resultLabel1El = document.getElementById("resultLabel1");
      var resultLabel3El = document.getElementById("resultLabel3");
      var resultCardQtyEl = document.getElementById("resultCardQty");
      var resultUnitExEl = document.getElementById("resultUnitEx");
      var resultUnitIncEl = document.getElementById("resultUnitInc");
      var resultTotalEl = document.getElementById("resultTotal");
      var btnCopyResultEl = document.getElementById("btnCopyResult");

      function getCurrencySymbol() {
        return CURRENCY_SYMBOLS[currencySelectEl.value] || currencySelectEl.value;
      }

      function fmtNum(num) {
        var sym = getCurrencySymbol();
        return sym + " " + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function buildPresets() {
        var grid = document.getElementById("presetGrid");
        grid.innerHTML = "";
        RATE_PRESETS.forEach(function (preset) {
          var btn = document.createElement("button");
          btn.className = "rate-preset-btn";
          btn.textContent = preset.label;
          btn.dataset.value = String(preset.value);
          btn.addEventListener("click", function () {
            rateInputEl.value = preset.value;
            document.querySelectorAll(".rate-preset-btn").forEach(function (b) {
              b.classList.remove("active");
            });
            btn.classList.add("active");
            calculate();
          });
          grid.appendChild(btn);
        });
      }

      function buildRateTable() {
        var tbody = document.getElementById("rateRefBody");
        RATE_TABLE_DATA.forEach(function (row) {
          var tr = document.createElement("tr");
          var tdCountry = document.createElement("td");
          tdCountry.textContent = row.country;
          var tdType = document.createElement("td");
          tdType.textContent = row.type;
          var tdStd = document.createElement("td");
          var badge = document.createElement("span");
          badge.className = "rate-badge";
          badge.textContent = row.standard;
          tdStd.appendChild(badge);
          var tdReduced = document.createElement("td");
          tdReduced.textContent = row.reduced;
          tdReduced.style.color = "var(--color-text-secondary)";
          tr.appendChild(tdCountry);
          tr.appendChild(tdType);
          tr.appendChild(tdStd);
          tr.appendChild(tdReduced);
          tbody.appendChild(tr);
        });
      }

      function updateModeLabels() {
        if (currentMode === "add") {
          document.getElementById("priceLabel").textContent = "不含税金额";
          resultLabel1El.textContent = "不含税金额";
          resultLabel3El.textContent = "含税金额";
        } else {
          document.getElementById("priceLabel").textContent = "含税金额";
          resultLabel1El.textContent = "含税金额";
          resultLabel3El.textContent = "不含税金额";
        }
      }

      function clearResults() {
        resultVal1El.textContent = "—";
        resultVal2El.textContent = "—";
        resultVal3El.textContent = "—";
        resultCardQtyEl.style.display = "none";
        btnCopyResultEl.style.display = "none";
      }

      function calculate() {
        var priceStr = priceInputEl.value.trim();
        var rateStr = rateInputEl.value.trim();
        var qtyStr = qtyInputEl.value.trim();

        if (!priceStr) {
          showStatus("请输入金额", "error");
          clearResults();
          return;
        }

        var price = parseFloat(priceStr);
        var rate = rateStr !== "" ? parseFloat(rateStr) : 0;
        var qty = qtyStr ? Math.max(1, parseInt(qtyStr, 10)) : 1;

        if (isNaN(price) || price < 0) {
          showStatus("金额无效", "error");
          clearResults();
          return;
        }
        if (isNaN(rate) || rate < 0 || rate > 100) {
          showStatus("税率需在 0–100 之间", "error");
          clearResults();
          return;
        }

        var exclTax, inclTax, taxAmount;

        if (currentMode === "add") {
          exclTax = price;
          inclTax = price * (1 + rate / 100);
          taxAmount = inclTax - exclTax;
        } else {
          inclTax = price;
          exclTax = price / (1 + rate / 100);
          taxAmount = inclTax - exclTax;
        }

        if (currentMode === "add") {
          resultVal1El.textContent = fmtNum(exclTax);
          resultVal2El.textContent = fmtNum(taxAmount) + "  (" + rate.toFixed(1) + "%)";
          resultVal3El.textContent = fmtNum(inclTax);
        } else {
          resultVal1El.textContent = fmtNum(inclTax);
          resultVal2El.textContent = fmtNum(taxAmount) + "  (" + rate.toFixed(1) + "%)";
          resultVal3El.textContent = fmtNum(exclTax);
        }

        if (qty > 1) {
          resultCardQtyEl.style.display = "";
          resultUnitExEl.textContent = fmtNum(exclTax);
          resultUnitIncEl.textContent = fmtNum(inclTax);
          resultTotalEl.textContent = fmtNum(inclTax * qty) + " × " + qty;
        } else {
          resultCardQtyEl.style.display = "none";
        }

        showStatus("计算完成 (税率 " + rate.toFixed(2) + "%)", "success");
        btnCopyResultEl.style.display = "";
      }

      document.getElementById("btnCalc").onclick = calculate;

      document.getElementById("btnSwap").onclick = function () {
        var newMode = currentMode === "add" ? "remove" : "add";
        currentMode = newMode;
        document.getElementById("modeAddTax").classList.toggle("active", newMode === "add");
        document.getElementById("modeRemoveTax").classList.toggle("active", newMode === "remove");
        updateModeLabels();

        var currentResult = resultVal3El.textContent;
        if (currentResult !== "—") {
          var cleaned = currentResult.replace(/[^0-9.]/g, "");
          var num = parseFloat(cleaned);
          if (!isNaN(num)) {
            priceInputEl.value = num.toFixed(2);
          }
        }
        calculate();
      };

      document.getElementById("btnClear").onclick = function () {
        priceInputEl.value = "";
        rateInputEl.value = "";
        qtyInputEl.value = "1";
        clearResults();
        statusEl.textContent = "";
        statusEl.className = "status";
        document.querySelectorAll(".rate-preset-btn").forEach(function (b) {
          b.classList.remove("active");
        });
      };

      document.getElementById("modeAddTax").onclick = function () {
        currentMode = "add";
        document.getElementById("modeAddTax").classList.add("active");
        document.getElementById("modeRemoveTax").classList.remove("active");
        updateModeLabels();
        calculate();
      };

      document.getElementById("modeRemoveTax").onclick = function () {
        currentMode = "remove";
        document.getElementById("modeRemoveTax").classList.add("active");
        document.getElementById("modeAddTax").classList.remove("active");
        updateModeLabels();
        calculate();
      };

      btnCopyResultEl.onclick = async function () {
        var rate = rateInputEl.value || "0";
        var mode = currentMode === "add" ? "加税" : "价税分离";
        var line1Label = currentMode === "add" ? "不含税" : "含税价";
        var line3Label = currentMode === "add" ? "含税价" : "不含税";
        var text =
          "增值税计算结果 (" +
          mode +
          ", 税率 " +
          rate +
          "%)\n" +
          line1Label +
          ": " +
          resultVal1El.textContent +
          "\n" +
          "税额: " +
          resultVal2El.textContent +
          "\n" +
          line3Label +
          ": " +
          resultVal3El.textContent;
        try {
          await navigator.clipboard.writeText(text);
          showStatus("已复制结果", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      priceInputEl.addEventListener("input", calculate);
      rateInputEl.addEventListener("input", function () {
        var val = parseFloat(rateInputEl.value);
        document.querySelectorAll(".rate-preset-btn").forEach(function (b) {
          b.classList.toggle("active", parseFloat(b.dataset.value) === val);
        });
        calculate();
      });
      qtyInputEl.addEventListener("input", calculate);
      currencySelectEl.addEventListener("change", calculate);

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          calculate();
        }
      });

      buildPresets();
      buildRateTable();
      updateModeLabels();

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
    
