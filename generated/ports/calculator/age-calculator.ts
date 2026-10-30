// @ts-nocheck
// Generated from tools/calculator/age-calculator.html
// Source SHA-256: 00ab6c5bffed5103a4976f969871b0a714609b2fe7bb730e6c7626b64f4fca05
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const birth = new Date(document.getElementById("birthdate").value);
        if (isNaN(birth)) return;
        const today = new Date();
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();
        if (days < 0) {
          months--;
          days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
          years--;
          months += 12;
        }
        document.getElementById("age").textContent = years;
        const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
        document.getElementById("details").innerHTML =
          months + " 个月 " + days + " 天<br>共 " + totalDays.toLocaleString() + " 天";
        const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
        const daysUntil = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
        document.getElementById("nextBirthday").textContent =
          "距离下次生日还有 " + daysUntil + " 天";
      }

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
    
