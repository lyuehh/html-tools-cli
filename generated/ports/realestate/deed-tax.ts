// @ts-nocheck
// Generated from tools/realestate/deed-tax.html
// Source SHA-256: 081eee2cf9f654c69ae51bda9793388ec20cac4d0b3c64a04f5b9b56c35065d6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const areaInput = document.getElementById("area");
      const priceInput = document.getElementById("price");
      const btnCalculate = document.getElementById("btnCalculate");
      const resultSection = document.getElementById("resultSection");
      const resultValue = document.getElementById("resultValue");
      const resultRate = document.getElementById("resultRate");
      const detailList = document.getElementById("detailList");
      const policyInfo = document.getElementById("policyInfo");

      function getHouseType() {
        const radios = document.querySelectorAll('input[name="houseType"]');
        for (const radio of radios) {
          if (radio.checked) return parseInt(radio.value, 10);
        }
        return 1;
      }

      function calculateTaxRate(houseType, area) {
        if (houseType === 1) {
          if (area <= 90) return 0.01;
          return 0.015;
        } else if (houseType === 2) {
          if (area <= 90) return 0.01;
          return 0.02;
        } else {
          return 0.03;
        }
      }

      function getPolicyText(houseType, area, rate) {
        const ratePercent = (rate * 100).toFixed(1);
        if (houseType === 1) {
          if (area <= 90) {
            return "首套房且面积 ≤90㎡，契税税率为 " + ratePercent + "%";
          }
          return "首套房且面积 >90㎡，契税税率为 " + ratePercent + "%";
        } else if (houseType === 2) {
          if (area <= 90) {
            return "二套房且面积 ≤90㎡，契税税率为 " + ratePercent + "%";
          }
          return "二套房且面积 >90㎡，契税税率为 " + ratePercent + "%";
        } else {
          return "三套及以上住房，契税税率统一为 " + ratePercent + "%";
        }
      }

      function formatMoney(num) {
        return num.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }

      function calculate() {
        const area = parseFloat(areaInput.value);
        const price = parseFloat(priceInput.value);

        if (isNaN(area) || area <= 0) {
          alert("请输入有效的房屋面积");
          return;
        }
        if (isNaN(price) || price <= 0) {
          alert("请输入有效的成交价格");
          return;
        }

        const houseType = getHouseType();
        const rate = calculateTaxRate(houseType, area);
        const priceYuan = price * 10000;
        const tax = priceYuan * rate;

        resultValue.textContent = "¥" + formatMoney(tax);
        resultRate.textContent = "税率: " + (rate * 100).toFixed(1) + "%";

        detailList.textContent = "";

        const items = [
          {
            label: "房屋类型",
            value: houseType === 1 ? "首套房" : houseType === 2 ? "二套房" : "三套及以上"
          },
          { label: "房屋面积", value: area + " ㎡" },
          { label: "成交价格", value: "¥" + formatMoney(priceYuan) },
          { label: "适用税率", value: (rate * 100).toFixed(1) + "%" }
        ];

        items.forEach(function (item) {
          const div = document.createElement("div");
          div.className = "detail-item";

          const labelSpan = document.createElement("span");
          labelSpan.className = "label";
          labelSpan.textContent = item.label;

          const valueSpan = document.createElement("span");
          valueSpan.className = "value";
          valueSpan.textContent = item.value;

          div.appendChild(labelSpan);
          div.appendChild(valueSpan);
          detailList.appendChild(div);
        });

        policyInfo.textContent = "";
        const strong = document.createElement("strong");
        strong.textContent = "政策说明：";
        policyInfo.appendChild(strong);
        policyInfo.appendChild(document.createTextNode(getPolicyText(houseType, area, rate)));

        resultSection.classList.add("show");
      }

      btnCalculate.addEventListener("click", calculate);

      areaInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") calculate();
      });
      priceInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") calculate();
      });

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
    
