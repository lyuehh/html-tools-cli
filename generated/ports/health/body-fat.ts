// @ts-nocheck
// Generated from tools/health/body-fat.html
// Source SHA-256: 86c7e43058134b3db3bd3b65f152c096f04735341598c6c64be4802730b6a03f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let gender = "male";
      let method = "navy";

      const maleRanges = [
        { min: 0, max: 6, label: "必需脂肪", color: "#ef4444" },
        { min: 6, max: 14, label: "运动员", color: "#10b981" },
        { min: 14, max: 18, label: "健康", color: "#22c55e" },
        { min: 18, max: 25, label: "一般", color: "#f59e0b" },
        { min: 25, max: 40, label: "肥胖", color: "#ef4444" }
      ];

      const femaleRanges = [
        { min: 0, max: 14, label: "必需脂肪", color: "#ef4444" },
        { min: 14, max: 21, label: "运动员", color: "#10b981" },
        { min: 21, max: 25, label: "健康", color: "#22c55e" },
        { min: 25, max: 32, label: "一般", color: "#f59e0b" },
        { min: 32, max: 45, label: "肥胖", color: "#ef4444" }
      ];

      function setGender(g) {
        gender = g;
        document.querySelectorAll(".radio-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.value === g);
        });
        document.getElementById("hipGroup").style.display = g === "female" ? "block" : "none";
        calculate();
      }

      function setMethod(m) {
        method = m;
        document
          .querySelectorAll(".tab")
          .forEach((t) => t.classList.toggle("active", t.dataset.method === m));
        document.getElementById("navyInputs").style.display = m === "navy" ? "block" : "none";
        document.getElementById("skinfoldInputs").style.display =
          m === "skinfold" ? "block" : "none";
        calculate();
      }

      function calculate() {
        const age = parseFloat(document.getElementById("age").value) || 25;
        const height = parseFloat(document.getElementById("height").value) || 170;
        const weight = parseFloat(document.getElementById("weight").value) || 70;
        const waist = parseFloat(document.getElementById("waist").value) || 80;
        const neck = parseFloat(document.getElementById("neck").value) || 38;
        const hip = parseFloat(document.getElementById("hip").value) || 95;

        let bodyFat = 0;
        const bmi = weight / Math.pow(height / 100, 2);

        if (method === "navy") {
          // 美国海军公式
          if (gender === "male") {
            bodyFat =
              495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) -
              450;
          } else {
            bodyFat =
              495 /
                (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) -
              450;
          }
        } else if (method === "bmi") {
          // BMI估算法
          if (gender === "male") {
            bodyFat = 1.2 * bmi + 0.23 * age - 16.2;
          } else {
            bodyFat = 1.2 * bmi + 0.23 * age - 5.4;
          }
        } else if (method === "skinfold") {
          // 皮褶厚度法 (Jackson-Pollock)
          const tricep = parseFloat(document.getElementById("tricep").value) || 15;
          const subscapular = parseFloat(document.getElementById("subscapular").value) || 12;
          const suprailiac = parseFloat(document.getElementById("suprailiac").value) || 18;
          const sum = tricep + subscapular + suprailiac;

          if (gender === "male") {
            const density = 1.10938 - 0.0008267 * sum + 0.0000016 * sum * sum - 0.0002574 * age;
            bodyFat = 495 / density - 450;
          } else {
            const density = 1.0994921 - 0.0009929 * sum + 0.0000023 * sum * sum - 0.0001392 * age;
            bodyFat = 495 / density - 450;
          }
        }

        bodyFat = Math.max(3, Math.min(50, bodyFat));

        const fatMass = (weight * bodyFat) / 100;
        const leanMass = weight - fatMass;

        // 理想体脂率
        const idealFatRange = gender === "male" ? "10-20%" : "18-28%";
        const idealFat = gender === "male" ? 15 : 23;
        const targetWeight = leanMass / (1 - idealFat / 100);

        document.getElementById("bodyFat").textContent = bodyFat.toFixed(1);
        document.getElementById("fatMass").textContent = fatMass.toFixed(1) + " kg";
        document.getElementById("leanMass").textContent = leanMass.toFixed(1) + " kg";
        document.getElementById("bmi").textContent = bmi.toFixed(1);
        document.getElementById("idealFat").textContent = idealFatRange;
        document.getElementById("targetWeight").textContent = targetWeight.toFixed(1) + " kg";

        // 分类
        const ranges = gender === "male" ? maleRanges : femaleRanges;
        let category = "未知";
        for (const range of ranges) {
          if (bodyFat >= range.min && bodyFat < range.max) {
            category = range.label;
            break;
          }
        }
        document.getElementById("category").textContent = category;

        // 渲染范围图
        renderRangeChart(bodyFat, ranges);

        // 健康建议
        renderTips(bodyFat, category);
      }

      function renderRangeChart(bodyFat, ranges) {
        const chart = document.getElementById("rangeChart");
        const labels = document.getElementById("rangeLabels");
        chart.textContent = "";
        labels.textContent = "";

        const maxVal = ranges[ranges.length - 1].max;

        ranges.forEach((range) => {
          const width = ((range.max - range.min) / maxVal) * 100;
          const segment = document.createElement("div");
          segment.className = "range-segment";
          segment.style.width = width + "%";
          segment.style.background = range.color;
          segment.textContent = range.label;
          chart.appendChild(segment);
        });

        // 标记当前位置
        const markerPos = Math.min(100, (bodyFat / maxVal) * 100);
        const marker = document.createElement("div");
        marker.className = "range-marker";
        marker.style.left = markerPos + "%";
        chart.appendChild(marker);

        // 标签
        ranges.forEach((range) => {
          const label = document.createElement("span");
          label.textContent = range.min + "%";
          labels.appendChild(label);
        });
        const lastLabel = document.createElement("span");
        lastLabel.textContent = ranges[ranges.length - 1].max + "%";
        labels.appendChild(lastLabel);
      }

      function renderTips(bodyFat, category) {
        const container = document.getElementById("tips");
        container.textContent = "";

        const tips = [];

        if (category === "肥胖") {
          tips.push({
            title: "饮食调整",
            text: "控制热量摄入，减少精制碳水和加工食品，增加蛋白质和蔬菜摄入"
          });
          tips.push({
            title: "运动建议",
            text: "每周进行150分钟以上中等强度有氧运动，配合力量训练"
          });
          tips.push({ title: "生活习惯", text: "保证充足睡眠，减少压力，避免久坐" });
        } else if (category === "一般") {
          tips.push({
            title: "优化饮食",
            text: "适当减少热量摄入，保持营养均衡，多吃全谷物和蔬菜"
          });
          tips.push({ title: "增加运动", text: "每周3-5次运动，结合有氧和力量训练" });
        } else if (category === "健康" || category === "运动员") {
          tips.push({
            title: "保持现状",
            text: "您的体脂率处于健康范围，继续保持良好的运动和饮食习惯"
          });
          tips.push({ title: "定期监测", text: "每月测量一次，关注体脂变化趋势" });
        } else if (category === "必需脂肪") {
          tips.push({
            title: "注意健康",
            text: "体脂率过低可能影响激素水平和免疫功能，建议咨询医生"
          });
          tips.push({ title: "适当增脂", text: "如非专业运动员，建议适当增加健康脂肪摄入" });
        }

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

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Initialize
      // ============================================
      initTheme();
      calculate();
    
