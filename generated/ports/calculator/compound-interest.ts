// @ts-nocheck
// Generated from tools/calculator/compound-interest.html
// Source SHA-256: d82d3221fe8bd6f05733658325ce9f550af4e1bff7ef50f4439366dd189cc309
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const P = parseFloat(document.getElementById("principal").value) || 0;
        const r = parseFloat(document.getElementById("rate").value) / 100;
        const t = parseInt(document.getElementById("years").value) || 1;
        const n = parseInt(document.getElementById("frequency").value);
        const monthly = parseFloat(document.getElementById("monthly").value) || 0;

        // 复利公式: A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
        const rn = r / n;
        const nt = n * t;
        const compoundFactor = Math.pow(1 + rn, nt);

        let total = P * compoundFactor;
        if (monthly > 0 && rn > 0) {
          total += monthly * ((compoundFactor - 1) / rn);
        } else if (monthly > 0) {
          total += monthly * nt;
        }

        const totalPrincipal = P + monthly * 12 * t;
        const totalInterest = total - totalPrincipal;

        document.getElementById("total").textContent =
          "¥" + total.toLocaleString("zh-CN", { maximumFractionDigits: 2 });
        document.getElementById("totalPrincipal").textContent =
          "¥" + totalPrincipal.toLocaleString("zh-CN", { maximumFractionDigits: 0 });
        document.getElementById("totalInterest").textContent =
          "¥" + totalInterest.toLocaleString("zh-CN", { maximumFractionDigits: 0 });

        // 绘制图表
        const years = [];
        for (let i = 0; i <= t; i++) {
          const yn = n * i;
          const cf = Math.pow(1 + rn, yn);
          let value = P * cf;
          if (monthly > 0 && rn > 0) value += monthly * ((cf - 1) / rn);
          else if (monthly > 0) value += monthly * yn;
          years.push({ year: i, value });
        }

        const maxValue = Math.max(...years.map((y) => y.value));
        document.getElementById("chart").innerHTML = years
          .map(
            (y) =>
              `<div class="bar" style="height: ${(y.value / maxValue) * 100}%"><span class="bar-label">${y.year}年</span></div>`
          )
          .join("");
      }

      document
        .querySelectorAll("input, select")
        .forEach((el) => el.addEventListener("input", calculate));
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
    
