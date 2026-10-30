// @ts-nocheck
// Generated from tools/life/bmr-calculator.html
// Source SHA-256: cc31870b2e8ce73dd7ddde9a48442369f6b60a53a0219ada223e8cbbd4449ce5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let gender = "male";
      let activityLevel = 1.2;

      function setGender(g) {
        gender = g;
        document.getElementById("genderMale").classList.toggle("active", g === "male");
        document.getElementById("genderFemale").classList.toggle("active", g === "female");
      }

      function setActivity(level) {
        activityLevel = level;
        document.querySelectorAll(".activity-option").forEach((opt) => {
          opt.classList.remove("active");
        });
        event.currentTarget.classList.add("active");
      }

      function calculate() {
        const age = parseInt(document.getElementById("age").value);
        const height = parseFloat(document.getElementById("height").value);
        const weight = parseFloat(document.getElementById("weight").value);

        if (!age || !height || !weight) {
          alert("请填写完整信息");
          return;
        }

        // Mifflin-St Jeor 公式计算 BMR
        let bmr;
        if (gender === "male") {
          bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
          bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // TDEE = BMR * 活动系数
        const tdee = bmr * activityLevel;

        // BMI
        const bmi = weight / Math.pow(height / 100, 2);

        // 理想体重 (BMI = 22)
        const idealWeight = 22 * Math.pow(height / 100, 2);

        // 体脂率估算 (BMI法)
        let bodyFat;
        if (gender === "male") {
          bodyFat = 1.2 * bmi + 0.23 * age - 16.2;
        } else {
          bodyFat = 1.2 * bmi + 0.23 * age - 5.4;
        }
        bodyFat = Math.max(3, Math.min(60, bodyFat));

        // 显示结果
        document.getElementById("resultSection").style.display = "block";
        document.getElementById("bmrValue").textContent = Math.round(bmr);
        document.getElementById("tdeeValue").textContent = Math.round(tdee);
        document.getElementById("loseWeight").textContent = Math.round(tdee * 0.8);
        document.getElementById("bmiValue").textContent = bmi.toFixed(1);
        document.getElementById("idealWeight").textContent = idealWeight.toFixed(1) + " kg";
        document.getElementById("bodyFat").textContent = bodyFat.toFixed(1) + "%";
        document.getElementById("gainWeight").textContent = Math.round(tdee * 1.15) + " kcal";
        document.getElementById("maintainWeight").textContent = Math.round(tdee) + " kcal";

        // BMI 状态
        let bmiStatus, bmiPosition;
        if (bmi < 18.5) {
          bmiStatus = "偏瘦";
          bmiPosition = (bmi / 18.5) * 25;
        } else if (bmi < 24) {
          bmiStatus = "正常";
          bmiPosition = 25 + ((bmi - 18.5) / 5.5) * 25;
        } else if (bmi < 28) {
          bmiStatus = "超重";
          bmiPosition = 50 + ((bmi - 24) / 4) * 25;
        } else {
          bmiStatus = "肥胖";
          bmiPosition = 75 + Math.min(((bmi - 28) / 12) * 25, 25);
        }

        document.getElementById("bmiStatus").textContent = bmiStatus;
        document.getElementById("bmiIndicator").style.left = bmiPosition + "%";

        // 生成建议
        const tips = [];

        if (bmi < 18.5) {
          tips.push({
            icon: "🍽️",
            title: "适当增加热量摄入",
            desc: "建议每日摄入比TDEE多300-500千卡，选择高营养密度食物"
          });
        } else if (bmi >= 24) {
          tips.push({
            icon: "🥗",
            title: "控制热量摄入",
            desc: "建议每日摄入比TDEE少300-500千卡，安全减重速度为每周0.5-1kg"
          });
        }

        tips.push({
          icon: "💧",
          title: "保持水分摄入",
          desc: `建议每日饮水${Math.round(weight * 35)}ml，约${Math.round((weight * 35) / 250)}杯水`
        });

        tips.push({
          icon: "🏋️",
          title: "增加肌肉量",
          desc: "力量训练可以提高基础代谢率，每周建议进行2-3次力量训练"
        });

        tips.push({
          icon: "😴",
          title: "保证充足睡眠",
          desc: "睡眠不足会降低代谢率，建议每天保证7-9小时睡眠"
        });

        document.getElementById("tipsList").innerHTML = tips
          .map(
            (tip) => `
                <div class="tip-item">
                    <span class="tip-icon">${tip.icon}</span>
                    <div class="tip-content">
                        <div class="tip-title">${tip.title}</div>
                        <div class="tip-desc">${tip.desc}</div>
                    </div>
                </div>
            `
          )
          .join("");

        // 滚动到结果
        document.getElementById("resultSection").scrollIntoView({ behavior: "smooth" });
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
    
