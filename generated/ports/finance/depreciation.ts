// @ts-nocheck
// Generated from tools/finance/depreciation.html
// Source SHA-256: 565dd08d5dc0521eff7638d6a338ef694427673d700190b33692f35ec59ee647
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const cost = parseFloat(document.getElementById("assetCost").value) || 0;
        const salvage = parseFloat(document.getElementById("salvageValue").value) || 0;
        const life = parseInt(document.getElementById("usefulLife").value) || 1;
        const method = document.getElementById("method").value;

        const depreciableBase = cost - salvage;
        let schedule = [];
        let firstYearDepreciation = 0;
        let methodDescription = "";

        if (method === "straight") {
          // 直线法
          const annualDep = depreciableBase / life;
          firstYearDepreciation = annualDep;
          methodDescription = "直线法：每年折旧额相同，折旧额 = (原值 - 残值) / 使用年限";

          let bookValue = cost;
          let accumulated = 0;
          for (let year = 1; year <= life; year++) {
            accumulated += annualDep;
            schedule.push({
              year,
              beginValue: bookValue,
              depreciation: annualDep,
              accumulated,
              endValue: bookValue - annualDep
            });
            bookValue -= annualDep;
          }
        } else if (method === "double") {
          // 双倍余额递减法
          const rate = 2 / life;
          methodDescription =
            "双倍余额递减法：折旧率 = 2/使用年限，最后两年改用直线法使账面价值等于残值";

          let bookValue = cost;
          let accumulated = 0;

          for (let year = 1; year <= life; year++) {
            let depreciation;

            if (year <= life - 2) {
              depreciation = bookValue * rate;
            } else {
              // 最后两年用直线法
              depreciation = (bookValue - salvage) / (life - year + 1);
            }

            depreciation = Math.max(0, Math.min(depreciation, bookValue - salvage));

            if (year === 1) firstYearDepreciation = depreciation;

            accumulated += depreciation;
            schedule.push({
              year,
              beginValue: bookValue,
              depreciation,
              accumulated,
              endValue: bookValue - depreciation
            });
            bookValue -= depreciation;
          }
        } else if (method === "sum") {
          // 年数总和法
          const sumOfYears = (life * (life + 1)) / 2;
          methodDescription =
            "年数总和法：折旧率 = 剩余年限 / 年数总和，年数总和 = n(n+1)/2 = " + sumOfYears;

          let bookValue = cost;
          let accumulated = 0;

          for (let year = 1; year <= life; year++) {
            const remainingYears = life - year + 1;
            const depreciation = depreciableBase * (remainingYears / sumOfYears);

            if (year === 1) firstYearDepreciation = depreciation;

            accumulated += depreciation;
            schedule.push({
              year,
              beginValue: bookValue,
              depreciation,
              accumulated,
              endValue: bookValue - depreciation
            });
            bookValue -= depreciation;
          }
        }

        const fmt = (n) =>
          "¥" + n.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        document.getElementById("annualDepreciation").textContent =
          fmt(firstYearDepreciation) + (method !== "straight" ? " (首年)" : "");
        document.getElementById("monthlyDepreciation").textContent = fmt(
          firstYearDepreciation / 12
        );
        document.getElementById("depreciationRate").textContent =
          ((firstYearDepreciation / cost) * 100).toFixed(2) + "%";
        document.getElementById("totalDepreciation").textContent = fmt(depreciableBase);
        document.getElementById("methodInfo").textContent = methodDescription;

        // 渲染表格
        const tbody = document.getElementById("depreciationTable");
        tbody.textContent = "";

        schedule.forEach((row) => {
          const tr = document.createElement("tr");
          [
            "第" + row.year + "年",
            fmt(row.beginValue),
            fmt(row.depreciation),
            fmt(row.accumulated),
            fmt(row.endValue)
          ].forEach((text) => {
            const td = document.createElement("td");
            td.textContent = text;
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
      }

      calculate();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
