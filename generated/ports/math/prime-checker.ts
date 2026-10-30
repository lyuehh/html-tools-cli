// @ts-nocheck
// Generated from tools/math/prime-checker.html
// Source SHA-256: 61e0462fcbef002480a7f0a00404454ecf892bd47ab376a7350816ea87798693
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function isPrime(n) {
        if (n < 2) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
          if (n % i === 0) return false;
        }
        return true;
      }

      function factorize(n) {
        const factors = [];
        let d = 2;
        while (n > 1) {
          while (n % d === 0) {
            factors.push(d);
            n /= d;
          }
          d++;
          if (d * d > n && n > 1) {
            factors.push(n);
            break;
          }
        }
        return factors;
      }

      function check() {
        const n = parseInt(document.getElementById("number").value);

        if (isNaN(n) || n < 2) {
          alert("请输入大于等于2的正整数");
          return;
        }

        const prime = isPrime(n);
        document.getElementById("numberDisplay").textContent = n;
        document.getElementById("status").textContent = prime ? "是质数 ✓" : "不是质数 ✗";
        document.getElementById("status").className = "status " + (prime ? "prime" : "not-prime");

        document.getElementById("result").style.display = "block";

        if (!prime && n > 1) {
          const factors = factorize(n);
          const factorCount = {};
          factors.forEach((f) => (factorCount[f] = (factorCount[f] || 0) + 1));

          const factorStr = Object.entries(factorCount)
            .map(([base, exp]) => (exp > 1 ? `${base}^${exp}` : base))
            .join(" × ");

          document.getElementById("factors").innerHTML = `${n} = ${factorStr}`;
          document.getElementById("factorization").style.display = "block";
        } else {
          document.getElementById("factorization").style.display = "none";
        }
      }

      // 显示100以内的质数
      function showPrimeList() {
        const primes = [];
        for (let i = 2; i <= 100; i++) {
          if (isPrime(i)) primes.push(i);
        }
        document.getElementById("primeList").innerHTML = primes
          .map((p) => `<span>${p}</span>`)
          .join("");
      }

      showPrimeList();

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
    
