// @ts-nocheck
// Generated from tools/health/ideal-weight.html
// Source SHA-256: e44de98ca2f383387640da35421bfa7f1f0b514731a55b96172d613b62a69051
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let gender = "male";

      function setGender(g) {
        gender = g;
        document.querySelectorAll(".radio-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.value === g);
        });
        calculate();
      }

      function calculate() {
        const height = parseFloat(document.getElementById("height").value) || 170;
        const currentWeight = parseFloat(document.getElementById("currentWeight").value) || 70;
        const age = parseInt(document.getElementById("age").value) || 25;
        const frame = document.getElementById("frame").value;

        const heightM = height / 100;
        const heightIn = height / 2.54;

        // 各种公式计算理想体重
        const formulas = [];

        // 1. BMI公式 (BMI=22)
        const bmiIdeal = 22 * heightM * heightM;
        formulas.push({
          name: "BMI标准法",
          result: bmiIdeal,
          desc: "基于BMI=22计算，适用于大多数亚洲人"
        });

        // 2. Devine公式
        let devineIdeal;
        if (gender === "male") {
          devineIdeal = 50 + 2.3 * (heightIn - 60);
        } else {
          devineIdeal = 45.5 + 2.3 * (heightIn - 60);
        }
        formulas.push({
          name: "Devine公式",
          result: devineIdeal,
          desc: "药物剂量计算中广泛使用的标准"
        });

        // 3. Robinson公式
        let robinsonIdeal;
        if (gender === "male") {
          robinsonIdeal = 52 + 1.9 * (heightIn - 60);
        } else {
          robinsonIdeal = 49 + 1.7 * (heightIn - 60);
        }
        formulas.push({
          name: "Robinson公式",
          result: robinsonIdeal,
          desc: "1983年修订的临床标准公式"
        });

        // 4. Miller公式
        let millerIdeal;
        if (gender === "male") {
          millerIdeal = 56.2 + 1.41 * (heightIn - 60);
        } else {
          millerIdeal = 53.1 + 1.36 * (heightIn - 60);
        }
        formulas.push({
          name: "Miller公式",
          result: millerIdeal,
          desc: "1983年发表，考虑了现代人体型"
        });

        // 5. Hamwi公式
        let hamwiIdeal;
        if (gender === "male") {
          hamwiIdeal = 48 + 2.7 * (heightIn - 60);
        } else {
          hamwiIdeal = 45.5 + 2.2 * (heightIn - 60);
        }
        formulas.push({
          name: "Hamwi公式",
          result: hamwiIdeal,
          desc: "营养学中常用的快速估算方法"
        });

        // 6. Broca公式 (亚洲版)
        const brocaIdeal = (height - 100) * 0.9;
        formulas.push({
          name: "Broca公式",
          result: brocaIdeal,
          desc: "亚洲地区常用的简易计算法"
        });

        // 计算平均理想体重
        const avgIdeal = formulas.reduce((sum, f) => sum + f.result, 0) / formulas.length;

        // 根据体型调整
        let frameAdjust = 1;
        if (frame === "small") frameAdjust = 0.9;
        else if (frame === "large") frameAdjust = 1.1;

        const adjustedIdeal = avgIdeal * frameAdjust;
        const minIdeal = Math.min(...formulas.map((f) => f.result)) * frameAdjust;
        const maxIdeal = Math.max(...formulas.map((f) => f.result)) * frameAdjust;

        // BMI健康范围
        const healthyMin = 18.5 * heightM * heightM;
        const healthyMax = 24 * heightM * heightM;

        // 当前BMI
        const currentBMI = currentWeight / (heightM * heightM);

        // 更新显示
        document.getElementById("idealWeight").textContent = adjustedIdeal.toFixed(1);
        document.getElementById("weightRange").textContent =
          "范围: " + minIdeal.toFixed(1) + " - " + maxIdeal.toFixed(1) + " kg";
        document.getElementById("currentBMI").textContent = currentBMI.toFixed(1);
        document.getElementById("healthyRange").textContent =
          healthyMin.toFixed(1) + " - " + healthyMax.toFixed(1) + " kg";

        const diff = currentWeight - adjustedIdeal;
        const diffText = diff > 0 ? "+" + diff.toFixed(1) : diff.toFixed(1);
        document.getElementById("weightDiff").textContent = diffText + " kg";

        // 渲染体重范围条
        renderWeightRange(currentWeight, healthyMin, healthyMax, adjustedIdeal);

        // 渲染公式结果
        renderFormulas(formulas, frameAdjust);

        // 渲染对比
        renderComparison(currentWeight, adjustedIdeal, healthyMin, healthyMax);

        // 渲染建议
        renderTips(currentWeight, adjustedIdeal, currentBMI);
      }

      function renderWeightRange(current, min, max, ideal) {
        const bar = document.getElementById("weightRangeBar");
        const labels = document.getElementById("weightLabels");
        bar.textContent = "";
        labels.textContent = "";

        const rangeMin = min * 0.7;
        const rangeMax = max * 1.3;
        const total = rangeMax - rangeMin;

        const segments = [
          { label: "偏瘦", end: min, color: "#3b82f6" },
          { label: "健康", end: max, color: "#22c55e" },
          { label: "偏重", end: rangeMax, color: "#f97316" }
        ];

        let lastEnd = rangeMin;
        segments.forEach((seg) => {
          const width = ((seg.end - lastEnd) / total) * 100;
          const div = document.createElement("div");
          div.className = "weight-segment";
          div.style.width = width + "%";
          div.style.background = seg.color;
          div.textContent = seg.label;
          bar.appendChild(div);
          lastEnd = seg.end;
        });

        // 当前体重标记
        const markerPos = Math.min(100, Math.max(0, ((current - rangeMin) / total) * 100));
        const marker = document.createElement("div");
        marker.className = "weight-marker";
        marker.style.left = markerPos + "%";
        bar.appendChild(marker);

        // 标签
        const labelValues = [
          Math.round(rangeMin),
          Math.round(min),
          Math.round(max),
          Math.round(rangeMax)
        ];
        labelValues.forEach((val) => {
          const span = document.createElement("span");
          span.textContent = val + "kg";
          labels.appendChild(span);
        });
      }

      function renderFormulas(formulas, frameAdjust) {
        const container = document.getElementById("formulas");
        container.textContent = "";

        formulas.forEach((formula) => {
          const div = document.createElement("div");
          div.className = "formula-card";

          const name = document.createElement("div");
          name.className = "formula-name";
          name.textContent = formula.name;

          const result = document.createElement("div");
          result.className = "formula-result";
          result.textContent = (formula.result * frameAdjust).toFixed(1) + " kg";

          const desc = document.createElement("div");
          desc.className = "formula-desc";
          desc.textContent = formula.desc;

          div.appendChild(name);
          div.appendChild(result);
          div.appendChild(desc);
          container.appendChild(div);
        });
      }

      function renderComparison(current, ideal, min, max) {
        const container = document.getElementById("comparison");
        container.textContent = "";

        const maxVal = Math.max(current, ideal, max) * 1.1;

        const items = [
          { label: "当前体重", value: current, color: "#f97316" },
          { label: "理想体重", value: ideal, color: "#10b981" },
          { label: "健康下限", value: min, color: "#3b82f6" },
          { label: "健康上限", value: max, color: "#eab308" }
        ];

        items.forEach((item) => {
          const div = document.createElement("div");
          div.className = "comparison-item";

          const label = document.createElement("span");
          label.style.minWidth = "80px";
          label.textContent = item.label;

          const barContainer = document.createElement("div");
          barContainer.className = "comparison-bar";

          const fill = document.createElement("div");
          fill.className = "comparison-fill";
          fill.style.width = (item.value / maxVal) * 100 + "%";
          fill.style.background = item.color;
          barContainer.appendChild(fill);

          const value = document.createElement("span");
          value.className = "comparison-value";
          value.textContent = item.value.toFixed(1) + " kg";

          div.appendChild(label);
          div.appendChild(barContainer);
          div.appendChild(value);
          container.appendChild(div);
        });
      }

      function renderTips(current, ideal, bmi) {
        const container = document.getElementById("tips");
        container.textContent = "";

        const diff = current - ideal;
        let tips = [];

        if (bmi < 18.5) {
          tips = [
            { title: "增加热量摄入", text: "每天增加300-500千卡热量，选择营养密度高的食物" },
            { title: "蛋白质补充", text: "每公斤体重摄入1.2-1.5克蛋白质，促进肌肉增长" },
            { title: "力量训练", text: "进行适度力量训练，增加肌肉量而非单纯增脂" }
          ];
        } else if (bmi >= 18.5 && bmi < 24) {
          tips = [
            { title: "保持现状", text: "您的体重处于健康范围，继续保持均衡饮食和适量运动" },
            { title: "定期监测", text: "每月称重1-2次，关注体重变化趋势" }
          ];
        } else if (bmi >= 24 && bmi < 28) {
          tips = [
            { title: "控制饮食", text: "每天减少300-500千卡热量，避免高糖高脂食物" },
            { title: "增加运动", text: "每周进行150分钟以上中等强度有氧运动" },
            { title: "渐进减重", text: "每周减重0.5-1kg为健康速度，避免极端节食" }
          ];
        } else {
          tips = [
            { title: "咨询专业人士", text: "建议咨询医生或营养师，制定科学的减重计划" },
            { title: "饮食调整", text: "低热量、高蛋白、高纤维饮食，控制碳水摄入" },
            { title: "规律运动", text: "每天30-60分钟有氧运动，配合力量训练" }
          ];
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
    
