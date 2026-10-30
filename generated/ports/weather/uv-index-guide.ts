// @ts-nocheck
// Generated from tools/weather/uv-index-guide.html
// Source SHA-256: bb53e9d0df2a06eaec9ce90a039ebc5ac19b2d115938f5da113e089aae03a7b6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const UV_LEVELS = [
        {
          min: 0,
          max: 2,
          name: "低",
          nameEn: "Low",
          color: "#00d26a",
          advice: ["可以安全地在户外活动", "戴太阳镜（如果日照强烈）", "雪地或沙滩上仍需防护"]
        },
        {
          min: 3,
          max: 5,
          name: "中等",
          nameEn: "Moderate",
          color: "#ffd93d",
          advice: [
            "中午时段尽量待在阴凉处",
            "户外活动时戴帽子和太阳镜",
            "涂抹 SPF 30+ 防晒霜",
            "穿着长袖衣物"
          ]
        },
        {
          min: 6,
          max: 7,
          name: "高",
          nameEn: "High",
          color: "#ff9f43",
          advice: [
            "减少上午10点至下午4点的户外活动",
            "必须使用 SPF 30+ 防晒霜",
            "戴宽边帽和太阳镜",
            "穿着长袖衣物",
            "寻找阴凉处"
          ]
        },
        {
          min: 8,
          max: 10,
          name: "很高",
          nameEn: "Very High",
          color: "#ff6b6b",
          advice: [
            "尽量避免上午10点至下午4点外出",
            "必须使用 SPF 50+ 防晒霜，每2小时补涂",
            "穿着防晒衣物和宽边帽",
            "必须戴太阳镜",
            "待在阴凉处或室内"
          ]
        },
        {
          min: 11,
          max: 99,
          name: "极高",
          nameEn: "Extreme",
          color: "#9d4edd",
          advice: [
            "避免上午10点至下午4点外出",
            "必须使用 SPF 50+ 防晒霜，频繁补涂",
            "穿着全身防护服装",
            "戴宽边帽和太阳镜",
            "尽可能待在室内或完全阴凉处",
            "皮肤可能在几分钟内晒伤"
          ]
        }
      ];

      function getUVLevel(uv) {
        return (
          UV_LEVELS.find((level) => uv >= level.min && uv <= level.max) ||
          UV_LEVELS[UV_LEVELS.length - 1]
        );
      }

      function updateDisplay(uv) {
        const safeUv = Math.max(0, Math.min(15, Number.isFinite(uv) ? uv : 0));
        const level = getUVLevel(safeUv);

        document.getElementById("uvValue").textContent = safeUv.toFixed(1);
        document.getElementById("uvValue").style.color = level.color;
        document.getElementById("uvName").textContent = level.name;
        document.getElementById("uvName").style.color = level.color;
        document.getElementById("uvRange").textContent =
          `UV ${level.min}-${level.max === 99 ? "15+" : level.max}`;

        const adviceList = document.getElementById("adviceList");
        adviceList.innerHTML = level.advice.map((item) => `<li>${item}</li>`).join("");

        document.getElementById("resultCard").style.borderColor = level.color;
      }

      function updateFromInput() {
        const value = parseFloat(document.getElementById("uvInput").value) || 0;
        const clamped = Math.max(0, Math.min(15, value));
        document.getElementById("uvSlider").value = clamped;
        updateDisplay(clamped);
      }

      function updateFromSlider() {
        const value = parseFloat(document.getElementById("uvSlider").value);
        document.getElementById("uvInput").value = value.toFixed(1);
        updateDisplay(value);
      }

      // Initialize
      updateDisplay(5);

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
    
