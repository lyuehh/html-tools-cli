// @ts-nocheck
// Generated from tools/calculator/electricity-calc.html
// Source SHA-256: 029c5aaa2852aaf91d7813f947107ebb51f10b45cbbca7b32727dc0cce1f9a5d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const defaultAppliances = [
        { name: "空调", power: 1200, hours: 4 },
        { name: "冰箱", power: 150, hours: 24 },
        { name: "电视", power: 100, hours: 4 },
        { name: "热水器", power: 2000, hours: 1 }
      ];

      window.toggleTheme = function () {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("themeToggle").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      function loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.getElementById("themeToggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      function togglePricing() {
        const type = document.getElementById("pricingType").value;
        document.getElementById("tieredPricing").style.display =
          type === "tiered" ? "block" : "none";
        document.getElementById("touPricing").style.display = type === "tou" ? "block" : "none";
        document.getElementById("fixedPricing").style.display = type === "fixed" ? "block" : "none";
        document.getElementById("tierBreakdown").style.display =
          type === "tiered" ? "block" : "none";
        document.getElementById("touBreakdown").style.display = type === "tou" ? "block" : "none";
      }

      window.calculate = function () {
        const usage = parseFloat(document.getElementById("usage").value) || 0;
        const type = document.getElementById("pricingType").value;
        let totalCost = 0;

        if (type === "tiered") {
          const tier1Price = parseFloat(document.getElementById("tier1Price").value) || 0;
          const tier2Price = parseFloat(document.getElementById("tier2Price").value) || 0;
          const tier3Price = parseFloat(document.getElementById("tier3Price").value) || 0;
          const tier1Limit = parseFloat(document.getElementById("tier1Limit").value) || 0;
          const tier2Limit = parseFloat(document.getElementById("tier2Limit").value) || 0;

          const tier1Usage = Math.min(usage, tier1Limit);
          const tier2Usage = Math.max(0, Math.min(usage - tier1Limit, tier2Limit - tier1Limit));
          const tier3Usage = Math.max(0, usage - tier2Limit);

          const tier1Cost = tier1Usage * tier1Price;
          const tier2Cost = tier2Usage * tier2Price;
          const tier3Cost = tier3Usage * tier3Price;
          totalCost = tier1Cost + tier2Cost + tier3Cost;

          document.getElementById("tier1Cost").textContent =
            tier1Usage + "度 × ¥" + tier1Price.toFixed(2) + " = ¥" + tier1Cost.toFixed(2);
          document.getElementById("tier2Cost").textContent =
            tier2Usage + "度 × ¥" + tier2Price.toFixed(2) + " = ¥" + tier2Cost.toFixed(2);
          document.getElementById("tier3Cost").textContent =
            tier3Usage + "度 × ¥" + tier3Price.toFixed(2) + " = ¥" + tier3Cost.toFixed(2);
        } else if (type === "tou") {
          const peakPrice = parseFloat(document.getElementById("peakPrice").value) || 0;
          const flatPrice = parseFloat(document.getElementById("flatPrice").value) || 0;
          const valleyPrice = parseFloat(document.getElementById("valleyPrice").value) || 0;
          const peakRatio = parseFloat(document.getElementById("peakRatio").value) / 100 || 0;
          const flatRatio = parseFloat(document.getElementById("flatRatio").value) / 100 || 0;
          const valleyRatio = parseFloat(document.getElementById("valleyRatio").value) / 100 || 0;

          const peakUsage = usage * peakRatio;
          const flatUsage = usage * flatRatio;
          const valleyUsage = usage * valleyRatio;

          const peakCost = peakUsage * peakPrice;
          const flatCost = flatUsage * flatPrice;
          const valleyCost = valleyUsage * valleyPrice;
          totalCost = peakCost + flatCost + valleyCost;

          document.getElementById("peakCost").textContent =
            peakUsage.toFixed(1) + "度 × ¥" + peakPrice.toFixed(2) + " = ¥" + peakCost.toFixed(2);
          document.getElementById("flatCost").textContent =
            flatUsage.toFixed(1) + "度 × ¥" + flatPrice.toFixed(2) + " = ¥" + flatCost.toFixed(2);
          document.getElementById("valleyCost").textContent =
            valleyUsage.toFixed(1) +
            "度 × ¥" +
            valleyPrice.toFixed(2) +
            " = ¥" +
            valleyCost.toFixed(2);
        } else {
          const fixedPrice = parseFloat(document.getElementById("fixedPrice").value) || 0;
          totalCost = usage * fixedPrice;
        }

        const avgPrice = usage > 0 ? totalCost / usage : 0;

        document.getElementById("totalCost").textContent = "¥" + totalCost.toFixed(2);
        document.getElementById("totalUsage").textContent = usage + " 度";
        document.getElementById("avgPrice").textContent = "¥" + avgPrice.toFixed(4) + "/度";
        document.getElementById("yearlyCost").textContent = "¥" + (totalCost * 12).toFixed(2);
        document.getElementById("dailyCost").textContent = "¥" + (totalCost / 30).toFixed(2);

        calcAppliances();
      };

      function renderAppliances() {
        const container = document.getElementById("applianceList");
        container.textContent = "";

        defaultAppliances.forEach((app, index) => {
          const row = document.createElement("div");
          row.className = "appliance-row";
          row.innerHTML =
            '<input type="text" value="' +
            app.name +
            '" onchange="updateAppliance(' +
            index +
            ', \'name\', this.value)" aria-label="文本输入框" placeholder="请输入文本输入框">' +
            '<input type="number" value="' +
            app.power +
            '" onchange="updateAppliance(' +
            index +
            ', \'power\', this.value)" aria-label="数字输入框" placeholder="请输入数字输入框">' +
            '<input type="number" value="' +
            app.hours +
            '" step="0.5" onchange="updateAppliance(' +
            index +
            ', \'hours\', this.value)" aria-label="数字输入框" placeholder="请输入数字输入框">' +
            '<span id="appCost' +
            index +
            '">¥0.00</span>';
          container.appendChild(row);
        });
      }

      window.updateAppliance = function (index, field, value) {
        if (field === "name") {
          defaultAppliances[index].name = value;
        } else {
          defaultAppliances[index][field] = parseFloat(value) || 0;
        }
        calcAppliances();
      };

      window.addAppliance = function () {
        defaultAppliances.push({ name: "新电器", power: 100, hours: 1 });
        renderAppliances();
        calcAppliances();
      };

      function calcAppliances() {
        const type = document.getElementById("pricingType").value;
        let price;

        if (type === "tiered") {
          price = parseFloat(document.getElementById("tier1Price").value) || 0.52;
        } else if (type === "tou") {
          const peakPrice = parseFloat(document.getElementById("peakPrice").value) || 0;
          const flatPrice = parseFloat(document.getElementById("flatPrice").value) || 0;
          const valleyPrice = parseFloat(document.getElementById("valleyPrice").value) || 0;
          price = (peakPrice + flatPrice + valleyPrice) / 3;
        } else {
          price = parseFloat(document.getElementById("fixedPrice").value) || 0.55;
        }

        let totalCost = 0;
        defaultAppliances.forEach((app, index) => {
          const monthlyKwh = (app.power / 1000) * app.hours * 30;
          const cost = monthlyKwh * price;
          totalCost += cost;
          const costEl = document.getElementById("appCost" + index);
          if (costEl) costEl.textContent = "¥" + cost.toFixed(2);
        });

        document.getElementById("applianceTotalCost").textContent = "¥" + totalCost.toFixed(2);
      }

      loadTheme();
      togglePricing();
      renderAppliances();
      calculate();
    
