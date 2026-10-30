// @ts-nocheck
// Generated from tools/weather/feels-like-temp.html
// Source SHA-256: a3e3926823c879109312b7c9863d4e47199b5c0ad6fe78c27da62034238b13fc
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const temp = parseFloat(document.getElementById("temperature").value);
        const humidity = parseFloat(document.getElementById("humidity").value);
        const wind = parseFloat(document.getElementById("wind").value);

        // Update display values
        document.getElementById("tempValue").textContent = `${temp}°C`;
        document.getElementById("humidityValue").textContent = `${humidity}%`;
        document.getElementById("windValue").textContent = `${wind} km/h`;

        // Calculate Wind Chill (for cold temperatures)
        let windChill = temp;
        if (temp <= 10 && wind > 4.8) {
          // Wind Chill formula (Environment Canada)
          windChill =
            13.12 +
            0.6215 * temp -
            11.37 * Math.pow(wind, 0.16) +
            0.3965 * temp * Math.pow(wind, 0.16);
        }

        // Calculate Heat Index (for hot temperatures)
        let heatIndex = temp;
        if (temp >= 27) {
          // Heat Index formula (NWS)
          const T = (temp * 9) / 5 + 32; // Convert to Fahrenheit
          const R = humidity;
          let HI =
            -42.379 +
            2.04901523 * T +
            10.14333127 * R -
            0.22475541 * T * R -
            0.00683783 * T * T -
            0.05481717 * R * R +
            0.00122874 * T * T * R +
            0.00085282 * T * R * R -
            0.00000199 * T * T * R * R;
          heatIndex = ((HI - 32) * 5) / 9; // Convert back to Celsius
        }

        // Determine which index to use for feels-like temperature
        let feelsLike;
        if (temp <= 10) {
          feelsLike = windChill;
        } else if (temp >= 27) {
          feelsLike = heatIndex;
        } else {
          // Blend between actual temp and slight adjustments for humidity
          const humidityEffect = ((humidity - 50) / 100) * 2;
          const windEffect = -wind / 20;
          feelsLike = temp + humidityEffect + windEffect;
        }

        feelsLike = Math.round(feelsLike * 10) / 10;

        // Update wind chill and heat index displays
        document.getElementById("windChill").textContent =
          temp <= 10 ? `${Math.round(windChill)}°C` : "--";
        document.getElementById("heatIndex").textContent =
          temp >= 27 ? `${Math.round(heatIndex)}°C` : "--";

        // Update result display
        const resultEl = document.getElementById("resultTemp");
        resultEl.textContent = `${feelsLike}°C`;

        // Set color class based on temperature
        resultEl.classList.remove("cold", "cool", "warm", "hot");
        if (feelsLike < 0) {
          resultEl.classList.add("cold");
        } else if (feelsLike < 18) {
          resultEl.classList.add("cool");
        } else if (feelsLike < 28) {
          resultEl.classList.add("warm");
        } else {
          resultEl.classList.add("hot");
        }

        // Update icon
        const icons = {
          freezing: "🥶",
          cold: "❄️",
          cool: "🌤️",
          comfortable: "😊",
          warm: "☀️",
          hot: "🥵",
          extreme: "🔥"
        };
        let icon = icons.comfortable;
        if (feelsLike < -20) icon = icons.freezing;
        else if (feelsLike < 0) icon = icons.cold;
        else if (feelsLike < 15) icon = icons.cool;
        else if (feelsLike < 25) icon = icons.comfortable;
        else if (feelsLike < 35) icon = icons.warm;
        else if (feelsLike < 40) icon = icons.hot;
        else icon = icons.extreme;
        document.getElementById("resultIcon").textContent = icon;

        // Update difference text
        const diff = feelsLike - temp;
        const diffEl = document.getElementById("resultDiff");
        if (Math.abs(diff) < 0.5) {
          diffEl.textContent = "与实际温度相同";
          diffEl.classList.remove("warmer", "colder");
        } else if (diff > 0) {
          diffEl.textContent = `比实际温度高 ${Math.abs(diff).toFixed(1)}°C`;
          diffEl.classList.add("warmer");
          diffEl.classList.remove("colder");
        } else {
          diffEl.textContent = `比实际温度低 ${Math.abs(diff).toFixed(1)}°C`;
          diffEl.classList.add("colder");
          diffEl.classList.remove("warmer");
        }

        // Update comfort meter (0-100 scale, 50 is comfortable)
        const comfortPos = Math.max(0, Math.min(100, ((feelsLike + 20) / 60) * 100));
        document.getElementById("comfortMarker").style.left = `${comfortPos}%`;

        // Generate tips
        generateTips(feelsLike, temp, humidity, wind);
      }

      function generateTips(feelsLike, temp, humidity, wind) {
        const tips = [];

        if (feelsLike < -10) {
          tips.push("🧥 极寒天气，需穿戴羽绒服、保暖内衣、帽子、手套");
          tips.push("⚠️ 避免长时间暴露在户外，注意防止冻伤");
        } else if (feelsLike < 5) {
          tips.push("🧥 天气寒冷，建议穿棉服或厚外套");
          tips.push("🧣 搭配围巾和手套保护颈部和手部");
        } else if (feelsLike < 15) {
          tips.push("🧥 天气较凉，建议穿夹克或薄外套");
          tips.push("👖 可搭配长裤和轻薄毛衣");
        } else if (feelsLike < 25) {
          tips.push("👕 舒适温度，轻便着装即可");
          tips.push("😊 适合户外活动的好天气");
        } else if (feelsLike < 32) {
          tips.push("👕 天气较热，穿着轻薄透气衣物");
          tips.push("💧 注意多喝水，避免中午时段外出");
        } else {
          tips.push("🩳 高温天气，穿着短袖短裤");
          tips.push("⚠️ 避免长时间户外活动，注意防暑降温");
          tips.push("🧴 外出需涂防晒霜，佩戴遮阳帽");
        }

        if (wind > 30) {
          tips.push("💨 风力较大，外出注意防风");
        }

        if (humidity > 80) {
          tips.push("💦 湿度较高，体感闷热，注意通风");
        } else if (humidity < 30) {
          tips.push("🏜️ 空气干燥，建议使用加湿器，多喝水");
        }

        document.getElementById("tips").innerHTML = tips.join("<br>");
      }

      // Initialize
      calculate();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
