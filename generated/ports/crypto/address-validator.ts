// @ts-nocheck
// Generated from tools/crypto/address-validator.html
// Source SHA-256: 3f3b5a319b3881f1ef41b560623114b19d7c0425fed2e693ad19bd3a53cc4d08
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var patterns = {
        btc_legacy: {
          regex: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
          name: "Bitcoin Legacy",
          chain: "BTC"
        },
        btc_segwit: {
          regex: /^bc1[a-zA-HJ-NP-Z0-9]{39,59}$/,
          name: "Bitcoin SegWit",
          chain: "BTC"
        },
        eth: { regex: /^0x[a-fA-F0-9]{40}$/, name: "Ethereum/EVM", chain: "ETH/BSC/Polygon" },
        tron: { regex: /^T[a-zA-HJ-NP-Z0-9]{33}$/, name: "Tron", chain: "TRX" },
        ltc_legacy: {
          regex: /^[LM][a-km-zA-HJ-NP-Z1-9]{26,33}$/,
          name: "Litecoin Legacy",
          chain: "LTC"
        },
        ltc_segwit: {
          regex: /^ltc1[a-zA-HJ-NP-Z0-9]{39,59}$/,
          name: "Litecoin SegWit",
          chain: "LTC"
        },
        solana: { regex: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/, name: "Solana", chain: "SOL" },
        ripple: { regex: /^r[0-9a-zA-Z]{24,34}$/, name: "Ripple", chain: "XRP" },
        dogecoin: {
          regex: /^D[5-9A-HJ-NP-U][1-9A-HJ-NP-Za-km-z]{32}$/,
          name: "Dogecoin",
          chain: "DOGE"
        },
        cosmos: { regex: /^cosmos[0-9a-z]{39}$/, name: "Cosmos", chain: "ATOM" }
      };

      function validate() {
        var address = document.getElementById("address").value.trim();
        var resultDiv = document.getElementById("result");

        if (!address) {
          resultDiv.classList.add("hidden");
          return;
        }

        var matched = null;
        for (var key in patterns) {
          if (patterns[key].regex.test(address)) {
            matched = patterns[key];
            break;
          }
        }

        resultDiv.classList.remove("hidden");

        if (matched) {
          resultDiv.className = "result valid";
          resultDiv.textContent = "";

          var icon = document.createElement("div");
          icon.className = "result-icon";
          icon.textContent = "✅";

          var text = document.createElement("div");
          text.className = "result-text";
          text.textContent = "地址格式有效";

          var detail = document.createElement("div");
          detail.className = "result-detail";
          detail.textContent = "类型: " + matched.name + " | 链: " + matched.chain;

          var length = document.createElement("div");
          length.className = "result-detail";
          length.textContent = "长度: " + address.length + " 字符";

          resultDiv.appendChild(icon);
          resultDiv.appendChild(text);
          resultDiv.appendChild(detail);
          resultDiv.appendChild(length);
        } else {
          resultDiv.className = "result invalid";
          resultDiv.textContent = "";

          var iconInvalid = document.createElement("div");
          iconInvalid.className = "result-icon";
          iconInvalid.textContent = "❌";

          var textInvalid = document.createElement("div");
          textInvalid.className = "result-text";
          textInvalid.textContent = "无法识别的地址格式";

          var detailInvalid = document.createElement("div");
          detailInvalid.className = "result-detail";
          detailInvalid.textContent = "请检查地址是否正确，或该链类型暂不支持";

          resultDiv.appendChild(iconInvalid);
          resultDiv.appendChild(textInvalid);
          resultDiv.appendChild(detailInvalid);
        }
      }

      document.getElementById("address").addEventListener("input", function () {
        if (this.value.length > 30) {
          validate();
        }
      });

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
    
