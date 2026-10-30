// @ts-nocheck
// Generated from tools/weather/uv-index.html
// Source SHA-256: bbfcb6723dd997de8f16ad594508467a1312501ebf9b3a7dd985ccd9ad8ed9ec
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const uvData = [
        {
          range: [0, 2],
          level: "低",
          color: "#00d26a",
          icon: "😎",
          desc: "无需防护，可安全户外活动",
          spf: "SPF15+",
          reapply: "不需要",
          hat: "可选",
          sunglasses: "可选",
          shade: "不需要",
          advice: [
            { icon: "✅", title: "可放心外出", text: "紫外线强度低，无需特别防护" },
            { icon: "🧴", title: "基础防晒即可", text: "敏感肌肤可涂抹SPF15防晒霜" }
          ]
        },
        {
          range: [3, 5],
          level: "中等",
          color: "#ffd93d",
          icon: "🌤️",
          desc: "需要一定防护，避免长时间暴晒",
          spf: "SPF30+",
          reapply: "2-3小时",
          hat: "建议",
          sunglasses: "建议",
          shade: "中午时段",
          advice: [
            { icon: "🧴", title: "涂抹防晒霜", text: "建议使用SPF30+防晒产品" },
            { icon: "👒", title: "佩戴帽子", text: "帽檐宽度建议7cm以上" },
            { icon: "🕐", title: "避开正午", text: "10:00-14:00减少户外活动" },
            { icon: "🕶️", title: "戴太阳镜", text: "选择UV400防护等级" }
          ]
        },
        {
          range: [6, 7],
          level: "高",
          color: "#ff9f43",
          icon: "☀️",
          desc: "需要防护，尽量减少正午外出",
          spf: "SPF50+",
          reapply: "2小时",
          hat: "必须",
          sunglasses: "必须",
          shade: "必须",
          advice: [
            { icon: "🧴", title: "高倍防晒", text: "使用SPF50+防晒霜，PA+++以上" },
            { icon: "👒", title: "物理防护", text: "穿长袖、戴宽檐帽、打伞" },
            { icon: "🏠", title: "避免正午外出", text: "10:00-16:00尽量待在室内" },
            { icon: "💧", title: "及时补涂", text: "每2小时补涂一次防晒" }
          ]
        },
        {
          range: [8, 10],
          level: "很高",
          color: "#ff6b6b",
          icon: "🔥",
          desc: "必须严格防护，尽量避免户外活动",
          spf: "SPF50+",
          reapply: "1.5小时",
          hat: "必须",
          sunglasses: "必须",
          shade: "必须",
          advice: [
            { icon: "⚠️", title: "减少外出", text: "非必要不要在户外活动" },
            { icon: "🧴", title: "最高防护", text: "SPF50+ PA++++，全身涂抹" },
            { icon: "🌳", title: "寻找阴凉", text: "必须外出时走阴凉处" },
            { icon: "💦", title: "频繁补涂", text: "出汗后立即补涂防晒" }
          ]
        },
        {
          range: [11, 15],
          level: "极高",
          color: "#a55eea",
          icon: "☢️",
          desc: "极度危险，应避免任何户外活动",
          spf: "SPF50+",
          reapply: "1小时",
          hat: "必须",
          sunglasses: "必须",
          shade: "必须",
          advice: [
            { icon: "🚫", title: "避免外出", text: "尽可能待在室内" },
            { icon: "⏰", title: "仅限早晚", text: "如需外出，选择早晨或傍晚" },
            { icon: "🛡️", title: "全副武装", text: "长袖长裤+帽子+墨镜+防晒霜" },
            { icon: "🏥", title: "注意晒伤", text: "短时间暴露即可能导致晒伤" }
          ]
        }
      ];

      function getUVData(uv) {
        return (
          uvData.find((d) => uv >= d.range[0] && uv <= d.range[1]) || uvData[uvData.length - 1]
        );
      }

      function updateUV() {
        const uv = parseInt(document.getElementById("uvSlider").value);
        const data = getUVData(uv);

        document.getElementById("uvValue").textContent = uv;
        document.getElementById("uvValue").style.color = data.color;
        document.getElementById("resultIcon").textContent = data.icon;
        document.getElementById("resultLevel").textContent = data.level;
        document.getElementById("resultLevel").style.color = data.color;
        document.getElementById("resultDesc").textContent = data.desc;

        // Render advice
        document.getElementById("adviceGrid").innerHTML = data.advice
          .map(
            (a) => `
        <div class="advice-item">
          <div class="advice-icon">${a.icon}</div>
          <div class="advice-title">${a.title}</div>
          <div class="advice-text">${a.text}</div>
        </div>
      `
          )
          .join("");

        // Render SPF recommendations
        document.getElementById("spfGrid").innerHTML = `
        <div class="spf-item">
          <div class="spf-value">${data.spf}</div>
          <div class="spf-label">推荐防晒系数</div>
        </div>
        <div class="spf-item">
          <div class="spf-value">${data.reapply}</div>
          <div class="spf-label">补涂间隔</div>
        </div>
        <div class="spf-item">
          <div class="spf-value">${data.hat}</div>
          <div class="spf-label">遮阳帽</div>
        </div>
      `;

        // Update scale
        renderScale(uv);
      }

      function renderScale(currentUV) {
        const scale = document.getElementById("uvScale");
        scale.innerHTML = uvData
          .map((d) => {
            const isActive = currentUV >= d.range[0] && currentUV <= d.range[1];
            return `
          <div class="scale-item ${isActive ? "active" : ""}">
            <div class="scale-color" style="background:${d.color}">${d.range[0]}-${d.range[1]}</div>
            <div class="scale-info">
              <div class="scale-level">${d.level}</div>
              <div class="scale-range">${d.desc}</div>
            </div>
          </div>
        `;
          })
          .join("");
      }

      // Initialize
      updateUV();

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
    
