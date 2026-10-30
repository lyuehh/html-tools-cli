// @ts-nocheck
// Generated from tools/calculator/triangle-calc.html
// Source SHA-256: a21acff77c870037626db0c3c06a4a6c14d11e7337ce5d6e9f9df57d001ba55e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

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

      window.showTab = function (tabId) {
        document.querySelectorAll(".tab-content").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".tabs button").forEach((b) => b.classList.remove("active"));
        document.getElementById(tabId).classList.add("active");
        event.target.classList.add("active");
      };

      window.toRadians = function (deg) {
        return (deg * Math.PI) / 180;
      };
      window.toDegrees = function (rad) {
        return (rad * 180) / Math.PI;
      };
      function format(num) {
        return Number.isFinite(num) ? (Math.abs(num) < 1e-10 ? 0 : num.toFixed(6)) : "无定义";
      }

      function calculateTrig() {
        let angle = parseFloat(document.getElementById("angleInput").value);
        const unit = document.getElementById("angleUnit").value;
        if (unit === "deg") angle = toRadians(angle);

        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        const tan = Math.tan(angle);

        document.getElementById("sinVal").textContent = format(sin);
        document.getElementById("cosVal").textContent = format(cos);
        document.getElementById("tanVal").textContent = format(tan);
        document.getElementById("cscVal").textContent = format(1 / sin);
        document.getElementById("secVal").textContent = format(1 / cos);
        document.getElementById("cotVal").textContent = format(1 / tan);

        // Update unit circle
        const x = cos;
        const y = -sin; // SVG y is inverted
        document.getElementById("angleLine").setAttribute("x2", x);
        document.getElementById("angleLine").setAttribute("y2", y);
        document.getElementById("anglePoint").setAttribute("cx", x);
        document.getElementById("anglePoint").setAttribute("cy", y);
        document.getElementById("sinLine").setAttribute("x1", x);
        document.getElementById("sinLine").setAttribute("x2", x);
        document.getElementById("sinLine").setAttribute("y1", 0);
        document.getElementById("sinLine").setAttribute("y2", y);
        document.getElementById("cosLine").setAttribute("x1", 0);
        document.getElementById("cosLine").setAttribute("x2", x);
        document.getElementById("cosLine").setAttribute("y1", y);
        document.getElementById("cosLine").setAttribute("y2", y);
      }

      window.calculateInverse = function () {
        const val = parseFloat(document.getElementById("inverseInput").value);
        const func = document.getElementById("inverseFunc").value;

        let result;
        switch (func) {
          case "asin":
            result = Math.asin(val);
            break;
          case "acos":
            result = Math.acos(val);
            break;
          case "atan":
            result = Math.atan(val);
            break;
        }

        document.getElementById("invRad").textContent = format(result);
        document.getElementById("invDeg").textContent = format(toDegrees(result));
      };

      window.solveTriangle = function () {
        const a = parseFloat(document.getElementById("sideA").value);
        const b = parseFloat(document.getElementById("sideB").value);
        const c = parseFloat(document.getElementById("sideC").value);

        // Check triangle inequality
        if (a + b <= c || b + c <= a || a + c <= b) {
          alert("这三边无法构成三角形");
          return;
        }

        // Law of cosines
        const A = Math.acos((b * b + c * c - a * a) / (2 * b * c));
        const B = Math.acos((a * a + c * c - b * b) / (2 * a * c));
        const C = Math.PI - A - B;

        // Heron's formula for area
        const s = (a + b + c) / 2;
        const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

        // Circumradius
        const R = a / (2 * Math.sin(A));

        document.getElementById("angleA").textContent = format(toDegrees(A));
        document.getElementById("angleB").textContent = format(toDegrees(B));
        document.getElementById("angleC").textContent = format(toDegrees(C));
        document.getElementById("area").textContent = format(area);
        document.getElementById("perimeter").textContent = format(a + b + c);
        document.getElementById("circumR").textContent = format(R);
      };

      loadTheme();
      calculateTrig();
    
