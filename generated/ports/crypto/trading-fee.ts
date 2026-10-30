// @ts-nocheck
// Generated from tools/crypto/trading-fee.html
// Source SHA-256: ae719f73dd1ffc0b230091fb68d7f4e2aaa94090121f0bcdfe33f567825bc84f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var exchangeRates = {
        spot: {
          taker: {
            0: [
              { name: "Binance", rate: 0.1 },
              { name: "OKX", rate: 0.1 },
              { name: "Bybit", rate: 0.1 },
              { name: "Coinbase", rate: 0.6 },
              { name: "Kraken", rate: 0.26 }
            ],
            1: [
              { name: "Binance", rate: 0.09 },
              { name: "OKX", rate: 0.08 },
              { name: "Bybit", rate: 0.08 }
            ],
            2: [
              { name: "Binance", rate: 0.08 },
              { name: "OKX", rate: 0.065 },
              { name: "Bybit", rate: 0.06 }
            ],
            3: [
              { name: "Binance", rate: 0.06 },
              { name: "OKX", rate: 0.05 },
              { name: "Bybit", rate: 0.04 }
            ]
          },
          maker: {
            0: [
              { name: "Binance", rate: 0.1 },
              { name: "OKX", rate: 0.08 },
              { name: "Bybit", rate: 0.1 },
              { name: "Coinbase", rate: 0.4 },
              { name: "Kraken", rate: 0.16 }
            ],
            1: [
              { name: "Binance", rate: 0.08 },
              { name: "OKX", rate: 0.06 },
              { name: "Bybit", rate: 0.06 }
            ],
            2: [
              { name: "Binance", rate: 0.06 },
              { name: "OKX", rate: 0.04 },
              { name: "Bybit", rate: 0.04 }
            ],
            3: [
              { name: "Binance", rate: 0.04 },
              { name: "OKX", rate: 0.02 },
              { name: "Bybit", rate: 0.02 }
            ]
          }
        },
        futures: {
          taker: {
            0: [
              { name: "Binance", rate: 0.05 },
              { name: "OKX", rate: 0.05 },
              { name: "Bybit", rate: 0.055 }
            ],
            1: [
              { name: "Binance", rate: 0.04 },
              { name: "OKX", rate: 0.04 },
              { name: "Bybit", rate: 0.045 }
            ],
            2: [
              { name: "Binance", rate: 0.035 },
              { name: "OKX", rate: 0.035 },
              { name: "Bybit", rate: 0.04 }
            ],
            3: [
              { name: "Binance", rate: 0.03 },
              { name: "OKX", rate: 0.03 },
              { name: "Bybit", rate: 0.03 }
            ]
          },
          maker: {
            0: [
              { name: "Binance", rate: 0.02 },
              { name: "OKX", rate: 0.02 },
              { name: "Bybit", rate: 0.02 }
            ],
            1: [
              { name: "Binance", rate: 0.016 },
              { name: "OKX", rate: 0.015 },
              { name: "Bybit", rate: 0.016 }
            ],
            2: [
              { name: "Binance", rate: 0.014 },
              { name: "OKX", rate: 0.012 },
              { name: "Bybit", rate: 0.014 }
            ],
            3: [
              { name: "Binance", rate: 0.01 },
              { name: "OKX", rate: 0.01 },
              { name: "Bybit", rate: 0.01 }
            ]
          }
        }
      };

      function calculate() {
        var tradeAmount = parseFloat(document.getElementById("tradeAmount").value) || 0;
        var tradeType = document.getElementById("tradeType").value;
        var orderType = document.getElementById("orderType").value;
        var vipLevel = document.getElementById("vipLevel").value;

        var exchanges = exchangeRates[tradeType][orderType][vipLevel];
        var avgRate =
          exchanges.reduce(function (sum, e) {
            return sum + e.rate;
          }, 0) / exchanges.length;

        var singleFee = (tradeAmount * avgRate) / 100;
        var roundTripFee = singleFee * 2;

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("singleFee").textContent = singleFee.toFixed(2) + " USDT";
        document.getElementById("roundTripFee").textContent = roundTripFee.toFixed(2) + " USDT";
        document.getElementById("feeRate").textContent = avgRate.toFixed(3) + "%";

        var grid = document.getElementById("exchangeGrid");
        while (grid.firstChild) {
          grid.removeChild(grid.firstChild);
        }

        exchanges.forEach(function (ex) {
          var fee = (tradeAmount * ex.rate) / 100;
          var item = document.createElement("div");
          item.className = "exchange-item";

          var name = document.createElement("div");
          name.className = "exchange-name";
          name.textContent = ex.name;

          var feeEl = document.createElement("div");
          feeEl.className = "exchange-fee";
          feeEl.textContent = fee.toFixed(2) + " USDT (" + ex.rate + "%)";

          item.appendChild(name);
          item.appendChild(feeEl);
          grid.appendChild(item);
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
    
