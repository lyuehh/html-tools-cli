// @ts-nocheck
// Generated from tools/converter/volume-converter.html
// Source SHA-256: 5b74aae53f461bf14eb95f0404879a65f5d72615c3b6f962aa2e3ef62cc0bd35
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const toML = {
        ml: 1,
        l: 1000,
        cm3: 1,
        m3: 1000000,
        gal: 3785.41,
        qt: 946.353,
        pt: 473.176,
        cup: 236.588,
        floz: 29.5735,
        tbsp: 14.787,
        tsp: 4.929
      };
      const labels = {
        ml: "毫升 (mL)",
        l: "升 (L)",
        cm3: "立方厘米 (cm³)",
        m3: "立方米 (m³)",
        gal: "加仑 (美制)",
        qt: "夸脱 (美制)",
        pt: "品脱 (美制)",
        cup: "杯 (美制)",
        floz: "液量盎司",
        tbsp: "汤匙",
        tsp: "茶匙"
      };
      function convert() {
        const value = parseFloat(document.getElementById("value").value) || 0;
        const unit = document.getElementById("unit").value;
        const ml = value * toML[unit];
        let html = "";
        for (const [key, factor] of Object.entries(toML)) {
          const result = ml / factor;
          const formatted =
            result < 0.0001 || result > 999999
              ? result.toExponential(4)
              : result.toLocaleString("zh-CN", { maximumFractionDigits: 6 });
          html += `<div class="result-item"><span class="result-label">${labels[key]}</span><span class="result-value">${formatted}</span></div>`;
        }
        document.getElementById("results").innerHTML = html;
      }
      document.getElementById("value").addEventListener("input", convert);
      document.getElementById("unit").addEventListener("change", convert);
      convert();

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
    
