// @ts-nocheck
// Generated from tools/converter/temperature.html
// Source SHA-256: 89063b8f27ef877ee930e87df22e863c1bb3ad8fd9eb60952b86f14325d0b2b1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const t =
          document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      window.setTemp = function (celsius) {
        document.getElementById("inputValue").value = celsius;
        document.getElementById("inputUnit").value = "C";
        convert();
      };

      function convert() {
        const value = parseFloat(document.getElementById("inputValue").value) || 0;
        const unit = document.getElementById("inputUnit").value;

        let celsius;
        switch (unit) {
          case "C":
            celsius = value;
            break;
          case "F":
            celsius = ((value - 32) * 5) / 9;
            break;
          case "K":
            celsius = value - 273.15;
            break;
        }

        const fahrenheit = (celsius * 9) / 5 + 32;
        const kelvin = celsius + 273.15;

        document.getElementById("celsius").textContent = celsius.toFixed(2);
        document.getElementById("fahrenheit").textContent = fahrenheit.toFixed(2);
        document.getElementById("kelvin").textContent = kelvin.toFixed(2);

        // Update visual
        const fillHeight = Math.max(0, Math.min(100, ((celsius + 40) / 140) * 100));
        document.getElementById("tempFill").style.height = fillHeight + "%";
        document.getElementById("tempLabel").textContent = celsius.toFixed(1) + "°C";
      }

      window.copyValue = function (type) {
        const value = document.getElementById(type).textContent;
        navigator.clipboard.writeText(value);
      };

      convert();
    
