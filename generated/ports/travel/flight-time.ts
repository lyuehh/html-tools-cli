// @ts-nocheck
// Generated from tools/travel/flight-time.html
// Source SHA-256: fe761799a11acfe2d11f6d5152c7de5667e0e4f9d09e0a4d923c4584e8402ae2
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
        迪拜: { lat: 25.2048, lon: 55.2708 }
      };

      var ROUTE_PRESETS = [
        ["北京", "上海"],
        ["上海", "东京"],
        ["北京", "香港"],
        ["北京", "纽约"],
        ["上海", "洛杉矶"],
        ["北京", "伦敦"]
      ];

      // Average cruise speed in km/h
      var CRUISE_SPEED = 850;
      // Takeoff phase in minutes
      var TAKEOFF_TIME = 30;
      // Landing phase in minutes
      var LANDING_TIME = 20;

      var currentMode = "cities";

      function init() {
        initTheme();
        populateCities();
        renderRoutePresets();
      }

      function populateCities() {
        var fromSelect = document.getElementById("fromCity");
        var toSelect = document.getElementById("toCity");

        Object.keys(CITIES).forEach(function (name) {
          var opt1 = document.createElement("option");
          opt1.value = name;
          opt1.textContent = name;
          fromSelect.appendChild(opt1);

          var opt2 = document.createElement("option");
          opt2.value = name;
          opt2.textContent = name;
          toSelect.appendChild(opt2);
        });

        fromSelect.value = "北京";
        toSelect.value = "上海";
      }

      function renderRoutePresets() {
        var container = document.getElementById("routePresets");
        container.textContent = "";

        ROUTE_PRESETS.forEach(function (route) {
          var chip = document.createElement("button");
          chip.className = "preset-chip";
          chip.textContent = route[0] + " → " + route[1];
          chip.onclick = function () {
            applyPreset(route[0], route[1]);
          };
          container.appendChild(chip);
        });
      }

      function applyPreset(from, to) {
        document.getElementById("fromCity").value = from;
        document.getElementById("toCity").value = to;
        calculate();
      }

      function switchMode(mode) {
        currentMode = mode;

        var tabs = document.querySelectorAll(".tab-btn");
        tabs.forEach(function (tab) {
          tab.classList.remove("active");
        });
        event.target.classList.add("active");

        document.getElementById("citiesPanel").classList.remove("active");
        document.getElementById("distancePanel").classList.remove("active");

        if (mode === "cities") {
          document.getElementById("citiesPanel").classList.add("active");
        } else {
          document.getElementById("distancePanel").classList.add("active");
        }

        document.getElementById("resultDisplay").style.display = "none";
      }

      function calculate() {
        var distance;

        if (currentMode === "cities") {
          var from = document.getElementById("fromCity").value;
          var to = document.getElementById("toCity").value;

          if (!from || !to) {
            alert("请选择出发和到达城市");
            return;
          }

          var fromCity = CITIES[from];
          var toCity = CITIES[to];
          distance = haversine(fromCity.lat, fromCity.lon, toCity.lat, toCity.lon);
        } else {
          distance = parseFloat(document.getElementById("distanceInput").value);
          if (isNaN(distance) || distance <= 0) {
            alert("请输入有效的距离");
            return;
          }
        }

        // Calculate cruise time in minutes
        var cruiseMinutes = (distance / CRUISE_SPEED) * 60;
        var totalMinutes = cruiseMinutes + TAKEOFF_TIME + LANDING_TIME;

        // Format time
        var hours = Math.floor(totalMinutes / 60);
        var minutes = Math.round(totalMinutes % 60);

        document.getElementById("resultTime").textContent = hours + "h " + minutes + "m";
        document.getElementById("takeoffTime").textContent = TAKEOFF_TIME + " 分钟";
        document.getElementById("cruiseTime").textContent = Math.round(cruiseMinutes) + " 分钟";
        document.getElementById("landingTime").textContent = LANDING_TIME + " 分钟";

        document.getElementById("resultDisplay").style.display = "block";
      }

      function haversine(lat1, lon1, lat2, lon2) {
        var R = 6371;
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

      function clearAll() {
        document.getElementById("fromCity").selectedIndex = 0;
        document.getElementById("toCity").selectedIndex = 0;
        document.getElementById("distanceInput").value = "";
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
    
