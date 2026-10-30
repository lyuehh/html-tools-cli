// @ts-nocheck
// Generated from tools/math/gcd-lcm-calculator.html
// Source SHA-256: 810cc10ed270c41664e5df783823e877c0e58dac6ffe7a3d324a448e785ec582
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b !== 0) {
          const t = b;
          b = a % b;
          a = t;
        }
        return a;
      }

      function lcm(a, b) {
        return Math.abs(a * b) / gcd(a, b);
      }

      function gcdArray(arr) {
        return arr.reduce((acc, val) => gcd(acc, val));
      }

      function lcmArray(arr) {
        return arr.reduce((acc, val) => lcm(acc, val));
      }

      function calculate() {
        const input = document.getElementById("numbers").value;
        const numbers = input
          .split(/[,\s]+/)
          .map((s) => parseInt(s.trim()))
          .filter((n) => !isNaN(n) && n > 0);

        if (numbers.length < 2) {
          alert("请输入至少两个正整数");
          return;
        }

        const gcdResult = gcdArray(numbers);
        const lcmResult = lcmArray(numbers);

        document.getElementById("gcdResult").textContent = gcdResult;
        document.getElementById("lcmResult").textContent = lcmResult;

        // 显示计算步骤
        let steps = `输入数字: <code>${numbers.join(", ")}</code><br><br>`;
        steps += `<strong>GCD 计算 (辗转相除法):</strong><br>`;

        let tempGcd = numbers[0];
        for (let i = 1; i < numbers.length; i++) {
          const oldGcd = tempGcd;
          tempGcd = gcd(tempGcd, numbers[i]);
          steps += `gcd(${oldGcd}, ${numbers[i]}) = ${tempGcd}<br>`;
        }

        steps += `<br><strong>LCM 计算:</strong><br>`;
        steps += `LCM = ${numbers.join(" × ")} / GCD = ${lcmResult}<br>`;
        steps += `<br>公式: <code>LCM(a,b) = |a×b| / GCD(a,b)</code>`;

        document.getElementById("stepsContent").innerHTML = steps;
        document.getElementById("results").style.display = "grid";
        document.getElementById("steps").style.display = "block";
      }

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
