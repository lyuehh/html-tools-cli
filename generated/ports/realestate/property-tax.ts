// @ts-nocheck
// Generated from tools/realestate/property-tax.html
// Source SHA-256: b5109753ce0d402c1fc62ef7fcc719ffce80a66b6a3c9d363521e1abe0b2d50d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const propertyTypeRadios = document.querySelectorAll('input[name="propertyType"]');
      const secondHandFields = document.getElementById("secondHandFields");
      const uniqueHouseGroup = document.getElementById("uniqueHouseGroup");
      const btnCalculate = document.getElementById("btnCalculate");
      const resultSection = document.getElementById("resultSection");

      propertyTypeRadios.forEach(function (radio) {
        radio.addEventListener("change", function () {
          const isSecond = this.value === "second";
          secondHandFields.style.display = isSecond ? "grid" : "none";
          uniqueHouseGroup.style.display = isSecond ? "block" : "none";
        });
      });

      function getSelectedValue(name) {
        const radios = document.querySelectorAll('input[name="' + name + '"]');
        for (const radio of radios) {
          if (radio.checked) return radio.value;
        }
        return null;
      }

      function formatMoney(num) {
        return num.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }

      function calculateDeedTaxRate(houseCount, area) {
        if (houseCount === "1") {
          return area <= 90 ? 0.01 : 0.015;
        } else if (houseCount === "2") {
          return area <= 90 ? 0.01 : 0.02;
        } else {
          return 0.03;
        }
      }

      function calculate() {
        const propertyType = getSelectedValue("propertyType");
        const houseCount = getSelectedValue("houseCount");
        const area = parseFloat(document.getElementById("area").value);
        const price = parseFloat(document.getElementById("price").value);
        const originalPrice = parseFloat(document.getElementById("originalPrice").value) || 0;
        const holdYears = parseInt(document.getElementById("holdYears").value, 10);
        const isUnique = document.getElementById("isUnique").checked;

        if (isNaN(area) || area <= 0) {
          alert("请输入有效的房屋面积");
          return;
        }
        if (isNaN(price) || price <= 0) {
          alert("请输入有效的成交价格");
          return;
        }

        const priceYuan = price * 10000;
        const originalPriceYuan = originalPrice * 10000;
        const taxes = [];

        const deedTaxRate = calculateDeedTaxRate(houseCount, area);
        const deedTax = priceYuan * deedTaxRate;
        taxes.push({
          name: "契税",
          rate: (deedTaxRate * 100).toFixed(1) + "%",
          amount: deedTax,
          formula: "成交价 × " + (deedTaxRate * 100).toFixed(1) + "%",
          highlight: true
        });

        if (propertyType === "second") {
          let vatAmount = 0;
          let vatFormula = "";
          if (holdYears < 2) {
            vatAmount = priceYuan * 0.05;
            vatFormula = "成交价 × 5%";
          } else {
            vatAmount = 0;
            vatFormula = "满2年免征";
          }
          taxes.push({
            name: "增值税",
            rate: holdYears < 2 ? "5%" : "0%",
            amount: vatAmount,
            formula: vatFormula
          });

          const vatSurcharge = vatAmount * 0.12;
          taxes.push({
            name: "附加税",
            rate: "12%",
            amount: vatSurcharge,
            formula: "增值税 × 12%"
          });

          let incomeTax = 0;
          let incomeTaxFormula = "";
          if (holdYears >= 5 && isUnique) {
            incomeTax = 0;
            incomeTaxFormula = "满五唯一免征";
          } else if (originalPriceYuan > 0) {
            const profit = priceYuan - originalPriceYuan;
            incomeTax = profit > 0 ? profit * 0.2 : 0;
            incomeTaxFormula = "差额 × 20%";
          } else {
            incomeTax = priceYuan * 0.01;
            incomeTaxFormula = "成交价 × 1%";
          }
          taxes.push({
            name: "个人所得税",
            rate: holdYears >= 5 && isUnique ? "0%" : "20%/1%",
            amount: incomeTax,
            formula: incomeTaxFormula
          });
        }

        const stampTax = 0;
        taxes.push({
          name: "印花税",
          rate: "0%",
          amount: stampTax,
          formula: "住宅免征"
        });

        const total = taxes.reduce(function (sum, t) {
          return sum + t.amount;
        }, 0);

        document.getElementById("totalValue").textContent = "¥" + formatMoney(total);

        const taxGrid = document.getElementById("taxGrid");
        taxGrid.textContent = "";
        taxes.forEach(function (tax) {
          const card = document.createElement("div");
          card.className = "tax-card" + (tax.highlight ? " highlight" : "");

          const header = document.createElement("div");
          header.className = "tax-card-header";

          const name = document.createElement("span");
          name.className = "tax-card-name";
          name.textContent = tax.name;

          const rate = document.createElement("span");
          rate.className = "tax-card-rate";
          rate.textContent = tax.rate;

          header.appendChild(name);
          header.appendChild(rate);

          const value = document.createElement("div");
          value.className = "tax-card-value";
          value.textContent = "¥" + formatMoney(tax.amount);

          card.appendChild(header);
          card.appendChild(value);
          taxGrid.appendChild(card);
        });

        const detailBody = document.getElementById("detailBody");
        detailBody.textContent = "";
        taxes.forEach(function (tax) {
          const tr = document.createElement("tr");

          const tdName = document.createElement("td");
          tdName.textContent = tax.name;

          const tdFormula = document.createElement("td");
          tdFormula.textContent = tax.formula;

          const tdAmount = document.createElement("td");
          tdAmount.textContent = "¥" + formatMoney(tax.amount);

          tr.appendChild(tdName);
          tr.appendChild(tdFormula);
          tr.appendChild(tdAmount);
          detailBody.appendChild(tr);
        });

        const infoBox = document.getElementById("infoBox");
        infoBox.textContent = "";
        const strong = document.createElement("strong");
        strong.textContent = "说明：";
        infoBox.appendChild(strong);

        let infoText = "";
        if (propertyType === "new") {
          infoText = "新房交易主要缴纳契税。开发商通常会代缴维修基金和办证费用。";
        } else {
          infoText =
            "二手房交易涉及契税（买方）、增值税和个税（卖方）。满2年免增值税，满5年且唯一免个税。";
        }
        infoBox.appendChild(document.createTextNode(infoText));

        resultSection.classList.add("show");
      }

      btnCalculate.addEventListener("click", calculate);

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
