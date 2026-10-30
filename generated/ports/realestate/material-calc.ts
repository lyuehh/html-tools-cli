// @ts-nocheck
// Generated from tools/realestate/material-calc.html
// Source SHA-256: 728f3e9ae4226998bae36c070b842fc3b090a45bf523bfaeb6fa0373541c4619
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function switchTab(tab) {
        document.querySelectorAll(".tab").forEach(function (t) {
          t.classList.remove("active");
        });
        document.querySelectorAll(".tab-content").forEach(function (c) {
          c.classList.remove("active");
        });
        document
          .querySelector(".tab[onclick=\"switchTab('" + tab + "')\"]")
          .classList.add("active");
        document.getElementById(tab + "Content").classList.add("active");
      }

      function calcFloor() {
        var length = parseFloat(document.getElementById("floorLength").value) || 0;
        var width = parseFloat(document.getElementById("floorWidth").value) || 0;
        var tileL = parseFloat(document.getElementById("tileLength").value) / 100 || 0.8;
        var tileW = parseFloat(document.getElementById("tileWidth").value) / 100 || 0.8;
        var loss = parseFloat(document.getElementById("floorLoss").value) / 100 || 0.05;

        var area = length * width;
        var tileArea = tileL * tileW;
        var count = Math.ceil(area / tileArea);
        var buyCount = Math.ceil(count * (1 + loss));

        document.getElementById("floorResult").classList.remove("hidden");
        document.getElementById("floorArea").textContent = area.toFixed(2);
        document.getElementById("floorCount").textContent = count;
        document.getElementById("floorBuy").textContent = buyCount;
      }

      function calcPaint() {
        var area = parseFloat(document.getElementById("paintArea").value) || 0;
        var coats = parseInt(document.getElementById("paintCoats").value) || 2;
        var type = document.getElementById("paintType").value;
        var bucket = parseFloat(document.getElementById("paintBucket").value) || 5;

        var coverage = { latex: 13, primer: 16, texture: 7 };
        var rate = coverage[type] || 13;

        var totalArea = area * coats;
        var liters = totalArea / rate;
        var buckets = Math.ceil(liters / bucket);

        document.getElementById("paintResult").classList.remove("hidden");
        document.getElementById("totalPaintArea").textContent = totalArea.toFixed(0);
        document.getElementById("paintLiters").textContent = liters.toFixed(1);
        document.getElementById("paintBuckets").textContent = buckets;
      }

      function calcWallpaper() {
        var perimeter = parseFloat(document.getElementById("roomPerimeter").value) || 0;
        var height = parseFloat(document.getElementById("roomHeight").value) || 2.8;
        var doorWindow = parseFloat(document.getElementById("doorWindowArea").value) || 0;
        var wpWidth = parseFloat(document.getElementById("wallpaperWidth").value) / 100 || 0.53;
        var wpLength = parseFloat(document.getElementById("wallpaperLength").value) || 10;
        var pattern = parseFloat(document.getElementById("patternMatch").value) / 100 || 0;

        var wallArea = perimeter * height - doorWindow;
        var effectiveHeight = height + pattern;
        var stripsPerRoll = Math.floor(wpLength / effectiveHeight);
        var totalStrips = Math.ceil(perimeter / wpWidth);
        var rolls = Math.ceil(totalStrips / stripsPerRoll);
        var buyRolls = rolls + 1;

        document.getElementById("wallpaperResult").classList.remove("hidden");
        document.getElementById("wallArea").textContent = wallArea.toFixed(2);
        document.getElementById("wallpaperRolls").textContent = rolls;
        document.getElementById("wallpaperBuy").textContent = buyRolls;
      }

      function calcWallTile() {
        var length = parseFloat(document.getElementById("wallLength").value) || 0;
        var height = parseFloat(document.getElementById("wallHeight").value) || 0;
        var deduct = parseFloat(document.getElementById("deductArea").value) || 0;
        var tileL = parseFloat(document.getElementById("wallTileLength").value) / 100 || 0.3;
        var tileW = parseFloat(document.getElementById("wallTileWidth").value) / 100 || 0.6;
        var loss = parseFloat(document.getElementById("tileLoss").value) / 100 || 0.08;

        var area = length * height - deduct;
        var tileArea = tileL * tileW;
        var count = Math.ceil(area / tileArea);
        var buyCount = Math.ceil(count * (1 + loss));

        document.getElementById("tileResult").classList.remove("hidden");
        document.getElementById("tileArea").textContent = area.toFixed(2);
        document.getElementById("tileCount").textContent = count;
        document.getElementById("tileBuy").textContent = buyCount;
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
    
