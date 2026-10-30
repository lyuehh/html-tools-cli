// @ts-nocheck
// Generated from tools/converter/frequency-converter.html
// Source SHA-256: 4f93cdb6a22ec2f96ecf26fe184f5fa388ec24ccc72e1bd07101a984052ca626
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const toHz = {
        hz: 1,
        khz: 1000,
        mhz: 1000000,
        ghz: 1000000000,
        rpm: 1 / 60,
        rads: 1 / (2 * Math.PI),
        bpm: 1 / 60
      };
      const labels = {
        hz: "赫兹 (Hz)",
        khz: "千赫兹 (kHz)",
        mhz: "兆赫兹 (MHz)",
        ghz: "吉赫兹 (GHz)",
        rpm: "转/分钟 (RPM)",
        rads: "弧度/秒",
        bpm: "次/分钟 (BPM)"
      };
      function convert() {
        const value = parseFloat(document.getElementById("value").value) || 0;
        const unit = document.getElementById("unit").value;
        const hz = value * toHz[unit];
        let html = "";
        for (const [key, factor] of Object.entries(toHz)) {
          const result = hz / factor;
          const formatted =
            result < 0.0001 || result > 999999999
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
    
