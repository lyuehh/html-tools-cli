// @ts-nocheck
// Generated from tools/travel/distance-calculator.html
// Source SHA-256: 8e457b935ecc71dac33b8b4bb9b1d3ce76e948246e89f6abbb79ad53709be8ca
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var CITIES = {
        北京: { lat: 39.9042, lon: 116.4074 },
        上海: { lat: 31.2304, lon: 121.4737 },
        广州: { lat: 23.1291, lon: 113.2644 },
        深圳: { lat: 22.5431, lon: 114.0579 },
        香港: { lat: 22.3193, lon: 114.1694 },
        台北: { lat: 25.033, lon: 121.5654 },
        东京: { lat: 35.6762, lon: 139.6503 },
        首尔: { lat: 37.5665, lon: 126.978 },
        新加坡: { lat: 1.3521, lon: 103.8198 },
        曼谷: { lat: 13.7563, lon: 100.5018 },
        悉尼: { lat: -33.8688, lon: 151.2093 },
        纽约: { lat: 40.7128, lon: -74.006 },
        洛杉矶: { lat: 34.0522, lon: -118.2437 },
        旧金山: { lat: 37.7749, lon: -122.4194 },
        伦敦: { lat: 51.5074, lon: -0.1278 },
        巴黎: { lat: 48.8566, lon: 2.3522 },
        柏林: { lat: 52.52, lon: 13.405 },
        莫斯科: { lat: 55.7558, lon: 37.6173 },
        迪拜: { lat: 25.2048, lon: 55.2708 },
        开罗: { lat: 30.0444, lon: 31.2357 }
      };

      var PRESETS = [
        ["北京", "上海"],
        ["北京", "广州"],
        ["上海", "东京"],
        ["北京", "纽约"],
        ["伦敦", "纽约"],
        ["悉尼", "东京"]
      ];

      function init() {
        initTheme();
        populateCities();
        renderPresets();
      }

      function populateCities() {
        var city1 = document.getElementById("city1");
        var city2 = document.getElementById("city2");

        Object.keys(CITIES).forEach(function (name) {
          var opt1 = document.createElement("option");
          opt1.value = name;
          opt1.textContent = name;
          city1.appendChild(opt1);

          var opt2 = document.createElement("option");
          opt2.value = name;
          opt2.textContent = name;
          city2.appendChild(opt2);
        });
      }

      function renderPresets() {
        var container = document.getElementById("presets");
        container.textContent = "";

        PRESETS.forEach(function (route) {
          var chip = document.createElement("button");
          chip.type = "button";
          chip.className = "preset-chip";
          chip.textContent = route[0] + " → " + route[1];
          chip.onclick = function () {
            applyPreset(route[0], route[1]);
          };
          container.appendChild(chip);
        });
      }

      function applyPreset(from, to) {
        document.getElementById("city1").value = from;
        document.getElementById("city2").value = to;
        selectCity(1);
        selectCity(2);
        calculate();
      }

      function selectCity(num) {
        var select = document.getElementById("city" + num);
        var city = CITIES[select.value];

        if (city) {
          document.getElementById("lat" + num).value = city.lat;
          document.getElementById("lon" + num).value = city.lon;
        }
      }

      function calculate() {
        var lat1 = parseFloat(document.getElementById("lat1").value);
        var lon1 = parseFloat(document.getElementById("lon1").value);
        var lat2 = parseFloat(document.getElementById("lat2").value);
        var lon2 = parseFloat(document.getElementById("lon2").value);

        var hasInvalidCoordinates =
          isNaN(lat1) ||
          lat1 < -90 ||
          lat1 > 90 ||
          isNaN(lon1) ||
          lon1 < -180 ||
          lon1 > 180 ||
          isNaN(lat2) ||
          lat2 < -90 ||
          lat2 > 90 ||
          isNaN(lon2) ||
          lon2 < -180 ||
          lon2 > 180;

        if (hasInvalidCoordinates) {
          var invalidResult = document.getElementById("resultDisplay");
          document.getElementById("resultKm").textContent = "无法计算距离";
          document.getElementById("resultMiles").textContent = "";
          document.getElementById("resultDetails").textContent = "请为起点和终点输入有效坐标";
          invalidResult.style.display = "block";
          invalidResult.focus();
          return;
        }

        var distanceKm = haversine(lat1, lon1, lat2, lon2);
        var distanceMiles = distanceKm * 0.621371;

        document.getElementById("resultKm").textContent = formatNumber(distanceKm) + " 公里";
        document.getElementById("resultMiles").textContent = formatNumber(distanceMiles) + " 英里";

        var city1Name = document.getElementById("city1").value || "起点";
        var city2Name = document.getElementById("city2").value || "终点";
        document.getElementById("resultDetails").textContent =
          city1Name +
          " (" +
          lat1.toFixed(4) +
          ", " +
          lon1.toFixed(4) +
          ") → " +
          city2Name +
          " (" +
          lat2.toFixed(4) +
          ", " +
          lon2.toFixed(4) +
          ")";

        document.getElementById("resultDisplay").style.display = "block";
        document.getElementById("resultDisplay").focus();
      }

      function haversine(lat1, lon1, lat2, lon2) {
        var R = 6371; // Earth's radius in km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      }

      function toRad(deg) {
        return deg * (Math.PI / 180);
      }

      function formatNumber(num) {
        return num.toLocaleString("zh-CN", { maximumFractionDigits: 1 });
      }

      function clearInputs() {
        document.getElementById("city1").value = "";
        document.getElementById("city2").value = "";
        document.getElementById("lat1").value = "";
        document.getElementById("lon1").value = "";
        document.getElementById("lat2").value = "";
        document.getElementById("lon2").value = "";
        document.getElementById("resultDisplay").style.display = "none";
      }

      function toggleTheme() {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      init();
    
