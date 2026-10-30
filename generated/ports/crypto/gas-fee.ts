// @ts-nocheck
// Generated from tools/crypto/gas-fee.html
// Source SHA-256: 938c44a9a92178960bb71634f01e0d88b323e7eedac7408885ebde62a840b33f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var selectedPreset = "standard";

      function selectPreset(preset, gwei) {
        selectedPreset = preset;
        document.querySelectorAll(".gas-preset").forEach(function (el) {
          el.classList.remove("active");
        });
        document.querySelector(".gas-preset." + preset).classList.add("active");
        document.getElementById("gasPrice").value = gwei;
        calculate();
      }

      function updateGasLimit() {
        var txType = document.getElementById("txType").value;
        if (txType !== "custom") {
          document.getElementById("gasLimit").value = txType;
        }
      }

      function calculate() {
        var gasPrice = parseFloat(document.getElementById("gasPrice").value) || 0;
        var gasLimit = parseFloat(document.getElementById("gasLimit").value) || 21000;
        var ethPrice = parseFloat(document.getElementById("ethPrice").value) || 0;

        var feeEth = (gasPrice * gasLimit) / 1e9;
        var feeUsdt = feeEth * ethPrice;
        var feeCny = feeUsdt * 7.2;

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("totalFee").textContent = "$" + feeUsdt.toFixed(2);
        document.getElementById("feeEth").textContent = feeEth.toFixed(6);
        document.getElementById("feeUsdt").textContent = "$" + feeUsdt.toFixed(2);
        document.getElementById("feeCny").textContent = "¥" + feeCny.toFixed(2);

        // 常见交易费用
        var txTypes = [
          { name: "ETH转账", gas: 21000 },
          { name: "ERC20转账", gas: 65000 },
          { name: "Uniswap交换", gas: 150000 },
          { name: "NFT铸造", gas: 200000 },
          { name: "OpenSea购买", gas: 250000 },
          { name: "复杂合约调用", gas: 350000 }
        ];

        var txTypesEl = document.getElementById("txTypes");
        while (txTypesEl.firstChild) {
          txTypesEl.removeChild(txTypesEl.firstChild);
        }

        txTypes.forEach(function (tx) {
          var fee = ((gasPrice * tx.gas) / 1e9) * ethPrice;
          var div = document.createElement("div");
          div.className = "tx-type";

          var nameSpan = document.createElement("span");
          nameSpan.textContent = tx.name;

          var feeSpan = document.createElement("span");
          feeSpan.textContent = "$" + fee.toFixed(2);
          feeSpan.style.color = "var(--accent-cyan)";
          feeSpan.style.fontWeight = "600";

          div.appendChild(nameSpan);
          div.appendChild(feeSpan);
          txTypesEl.appendChild(div);
        });
      }

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
    
