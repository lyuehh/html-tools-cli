// @ts-nocheck
// Generated from tools/converter/temperature-converter.html
// Source SHA-256: 39946a2b7333ebfa7dfe6e7ed6bb9c544a84c9dced9360b99ab47380af0a5b17
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function convert() {
        const c = parseFloat(document.getElementById("celsius").value);
        if (isNaN(c)) {
          document.getElementById("fahrenheit").textContent = "-";
          document.getElementById("kelvin").textContent = "-";
          document.getElementById("rankine").textContent = "-";
          return;
        }
        document.getElementById("fahrenheit").textContent = ((c * 9) / 5 + 32).toFixed(2) + "°F";
        document.getElementById("kelvin").textContent = (c + 273.15).toFixed(2) + "K";
        document.getElementById("rankine").textContent = (((c + 273.15) * 9) / 5).toFixed(2) + "°R";
      }
    
