// @ts-nocheck
// Generated from tools/health/heart-rate-zone.html
// Source SHA-256: 3411cf95e8df6bd6e13b9b55320338f076e0e43424f139199572179246ae5414
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const zones = [
        {
          zone: 1,
          name: "热身/恢复",
          min: 50,
          max: 60,
          color: "zone1",
          desc: "轻松活动，适合热身和恢复性训练",
          benefit: "促进血液循环，帮助恢复"
        },
        {
          zone: 2,
          name: "燃脂区",
          min: 60,
          max: 70,
          color: "zone2",
          desc: "低强度有氧，最佳燃脂效率",
          benefit: "脂肪燃烧最高效，适合长时间运动"
        },
        {
          zone: 3,
          name: "有氧区",
          min: 70,
          max: 80,
          color: "zone3",
          desc: "中等强度，提高心肺耐力",
          benefit: "增强心肺功能，提高耐力"
        },
        {
          zone: 4,
          name: "无氧阈值",
          min: 80,
          max: 90,
          color: "zone4",
          desc: "高强度，提高乳酸阈值",
          benefit: "提高运动表现，增加速度"
        },
        {
          zone: 5,
          name: "极限区",
          min: 90,
          max: 100,
          color: "zone5",
          desc: "最高强度，仅适合短时间冲刺",
          benefit: "提高最大摄氧量，仅限短时间"
        }
      ];

      let maxHR = 0;
      let restingHR = 0;

      function calculate() {
        const age = parseFloat(document.getElementById("age").value) || 25;
        const restHRInput = document.getElementById("restingHR").value;
        const method = document.getElementById("method").value;

        // 计算最大心率
        if (method === "standard") {
          maxHR = 220 - age;
        } else if (method === "tanaka") {
          maxHR = Math.round(208 - 0.7 * age);
        } else if (method === "karvonen") {
          maxHR = 220 - age;
        }

        restingHR = restHRInput ? parseFloat(restHRInput) : 0;
        const hrReserve = restingHR ? maxHR - restingHR : 0;

        document.getElementById("maxHR").textContent = maxHR + " bpm";
        document.getElementById("maxHRBig").textContent = maxHR;
        document.getElementById("restHR").textContent = restingHR ? restingHR + " bpm" : "- bpm";
        document.getElementById("hrReserve").textContent = hrReserve ? hrReserve + " bpm" : "- bpm";

        // 燃脂和有氧区间
        const fatBurnLow = calculateZoneHR(60);
        const fatBurnHigh = calculateZoneHR(70);
        const cardioLow = calculateZoneHR(70);
        const cardioHigh = calculateZoneHR(85);

        document.getElementById("fatBurnRange").textContent = fatBurnLow + "-" + fatBurnHigh;
        document.getElementById("cardioRange").textContent = cardioLow + "-" + cardioHigh;

        renderZones();
        renderTips();
        checkCurrentZone();
      }

      function calculateZoneHR(percent) {
        const method = document.getElementById("method").value;

        if (method === "karvonen" && restingHR) {
          // Karvonen公式: 目标心率 = (最大心率 - 静息心率) × 强度% + 静息心率
          return Math.round((maxHR - restingHR) * (percent / 100) + restingHR);
        } else {
          // 标准公式: 目标心率 = 最大心率 × 强度%
          return Math.round((maxHR * percent) / 100);
        }
      }

      function renderZones() {
        const container = document.getElementById("zones");
        container.textContent = "";

        zones.forEach((zone) => {
          const lowHR = calculateZoneHR(zone.min);
          const highHR = calculateZoneHR(zone.max);

          const div = document.createElement("div");
          div.className = "zone " + zone.color;

          const header = document.createElement("div");
          header.className = "zone-header";

          const left = document.createElement("div");
          const name = document.createElement("div");
          name.className = "zone-name";
          name.textContent = "Zone " + zone.zone + " - " + zone.name;
          const percent = document.createElement("div");
          percent.className = "zone-percent";
          percent.textContent = zone.min + "% - " + zone.max + "% 最大心率";
          left.appendChild(name);
          left.appendChild(percent);

          const range = document.createElement("div");
          range.className = "zone-range";
          range.textContent = lowHR + " - " + highHR + " bpm";

          header.appendChild(left);
          header.appendChild(range);

          const desc = document.createElement("div");
          desc.className = "zone-desc";
          desc.textContent = zone.desc;

          const bar = document.createElement("div");
          bar.className = "zone-bar";
          const barFill = document.createElement("div");
          barFill.className = "zone-bar-fill";
          barFill.style.width = (zone.max - zone.min) * 2 + "%";
          bar.appendChild(barFill);

          div.appendChild(header);
          div.appendChild(desc);
          div.appendChild(bar);
          container.appendChild(div);
        });
      }

      function checkCurrentZone() {
        const currentHR = parseFloat(document.getElementById("currentHR").value);
        const zoneDiv = document.getElementById("currentZone");

        if (!currentHR || currentHR < 40) {
          zoneDiv.style.display = "none";
          return;
        }

        zoneDiv.style.display = "block";

        let currentZone = null;
        for (const zone of zones) {
          const lowHR = calculateZoneHR(zone.min);
          const highHR = calculateZoneHR(zone.max);
          if (currentHR >= lowHR && currentHR <= highHR) {
            currentZone = zone;
            break;
          }
        }

        if (currentHR < calculateZoneHR(50)) {
          zoneDiv.textContent = "心率较低，低于训练区间";
          zoneDiv.style.background = "var(--border-subtle)";
          zoneDiv.style.color = "var(--text-primary)";
        } else if (currentHR > calculateZoneHR(100)) {
          zoneDiv.textContent = "心率过高，请注意休息！";
          zoneDiv.style.background = "#ef4444";
          zoneDiv.style.color = "white";
        } else if (currentZone) {
          zoneDiv.textContent = "当前处于 Zone " + currentZone.zone + " - " + currentZone.name;
          const colors = {
            zone1: "#64748b",
            zone2: "#2563eb",
            zone3: "#16a34a",
            zone4: "#ea580c",
            zone5: "#dc2626"
          };
          zoneDiv.style.background = colors[currentZone.color];
          zoneDiv.style.color = "white";
        }
      }

      function renderTips() {
        const container = document.getElementById("tips");
        container.textContent = "";

        const tips = [
          {
            title: "减脂训练",
            text: "在Zone 2（燃脂区）进行30-60分钟的低强度有氧运动，如慢跑、快走、骑车，燃脂效率最高。"
          },
          {
            title: "心肺耐力",
            text: "在Zone 3（有氧区）进行训练，每周3-5次，每次30-45分钟，有效提高心肺功能。"
          },
          {
            title: "间歇训练",
            text: "在Zone 4-5进行高强度间歇训练（HIIT），短时间高强度配合恢复，提高运动表现。"
          },
          {
            title: "恢复训练",
            text: "高强度训练后，在Zone 1进行恢复性运动，促进乳酸代谢，加速身体恢复。"
          }
        ];

        tips.forEach((tip) => {
          const div = document.createElement("div");
          div.className = "tip";

          const title = document.createElement("div");
          title.className = "tip-title";
          title.textContent = tip.title;

          const text = document.createElement("div");
          text.textContent = tip.text;

          div.appendChild(title);
          div.appendChild(text);
          container.appendChild(div);
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
    
