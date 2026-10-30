// @ts-nocheck
// Generated from tools/crypto/unit-converter.html
// Source SHA-256: 60231cb452bc3aa2869dd843a6a47b059840f988d2a52778d08b0a6031e59048
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var currentCoin = "btc";

      function switchCoin(coin) {
        currentCoin = coin;
        document.querySelectorAll(".tab").forEach(function (tab) {
          tab.classList.remove("active");
        });
        event.target.classList.add("active");

        document.getElementById("btcCard").style.display = coin === "btc" ? "block" : "none";
        document.getElementById("ethCard").style.display = coin === "eth" ? "block" : "none";
      }

      function formatNumber(num) {
        if (num === 0) return "0";
        if (num < 0.00000001) return num.toExponential(8);
        if (num >= 1e15) return num.toExponential(8);
        return num.toLocaleString("en-US", { maximumFractionDigits: 18 });
      }

      function convertBtc() {
        var btc = parseFloat(document.getElementById("btcInput").value) || 0;

        document.getElementById("btcBtc").textContent = formatNumber(btc);
        document.getElementById("btcMbtc").textContent = formatNumber(btc * 1000);
        document.getElementById("btcUbtc").textContent = formatNumber(btc * 1000000);
        document.getElementById("btcSat").textContent = formatNumber(btc * 100000000);
      }

      function convertEth() {
        var eth = parseFloat(document.getElementById("ethInput").value) || 0;

        document.getElementById("ethEth").textContent = formatNumber(eth);
        document.getElementById("ethFinney").textContent = formatNumber(eth * 1000);
        document.getElementById("ethSzabo").textContent = formatNumber(eth * 1000000);
        document.getElementById("ethGwei").textContent = formatNumber(eth * 1e9);
        document.getElementById("ethMwei").textContent = formatNumber(eth * 1e12);
        document.getElementById("ethKwei").textContent = formatNumber(eth * 1e15);
        document.getElementById("ethWei").textContent = formatNumber(eth * 1e18);
      }

      convertBtc();
      convertEth();

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
    
