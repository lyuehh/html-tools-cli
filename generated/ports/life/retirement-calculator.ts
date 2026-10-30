// @ts-nocheck
// Generated from tools/life/retirement-calculator.html
// Source SHA-256: 623587e7883a90197cb6bc4b63ccb25344714e057a8609948796402ef9a034b9
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let gender = "male";
      let femaleType = "worker"; // worker: 女工人50岁, cadre: 女干部55岁

      // 初始化年份选择
      const birthYearSelect = document.getElementById("birthYear");
      const currentYear = new Date().getFullYear();
      for (let year = currentYear - 15; year >= 1950; year--) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year + "年";
        if (year === 1970) option.selected = true;
        birthYearSelect.appendChild(option);
      }

      /**
       * 设置性别
       */
      window.setGender = function (g) {
        gender = g;
        document.querySelectorAll(".gender-btn").forEach((btn, index) => {
          btn.classList.toggle(
            "active",
            (g === "male" && index === 0) || (g === "female" && index === 1)
          );
        });

        // 女性显示人员类型选择
        document.getElementById("typeGroup").style.display = g === "female" ? "block" : "none";
      };

      /**
       * 设置女性人员类型
       */
      window.setType = function (type) {
        femaleType = type;
        document.querySelectorAll(".type-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.type === type);
        });
      };

      /**
       * 计算延迟月数
       * @param {number} birthYear - 出生年份
       * @param {number} birthMonth - 出生月份
       * @param {number} originalAge - 原退休年龄
       * @param {number} targetAge - 目标退休年龄
       * @param {number} delayRate - 延迟速率（每几个月延迟1个月）
       * @returns {object} 计算结果
       */
      function calculateDelay(birthYear, birthMonth, originalAge, targetAge, delayRate) {
        // 原退休时间
        const originalRetireYear = birthYear + originalAge;
        const originalRetireMonth = birthMonth;

        // 2025年1月开始实施
        const policyStartYear = 2025;
        const policyStartMonth = 1;

        // 如果原退休时间在政策实施前，则按原年龄退休
        if (
          originalRetireYear < policyStartYear ||
          (originalRetireYear === policyStartYear && originalRetireMonth < policyStartMonth)
        ) {
          return {
            retireAge: originalAge,
            retireAgeMonths: 0,
            retireYear: originalRetireYear,
            retireMonth: originalRetireMonth,
            delayMonths: 0,
            isDelayed: false
          };
        }

        // 计算从政策开始到原退休时间经过的月数
        const monthsFromPolicy =
          (originalRetireYear - policyStartYear) * 12 + (originalRetireMonth - policyStartMonth);

        // 计算延迟月数：每delayRate个月延迟1个月
        let delayMonths = Math.floor(monthsFromPolicy / delayRate) + 1;

        // 最大延迟月数
        const maxDelayMonths = (targetAge - originalAge) * 12;
        delayMonths = Math.min(delayMonths, maxDelayMonths);

        // 新退休年龄
        const totalMonths = originalAge * 12 + delayMonths;
        const retireAgeYears = Math.floor(totalMonths / 12);
        const retireAgeMonths = totalMonths % 12;

        // 新退休时间
        let retireYear = birthYear + retireAgeYears;
        let retireMonth = birthMonth + retireAgeMonths;
        if (retireMonth > 12) {
          retireYear++;
          retireMonth -= 12;
        }

        return {
          retireAge: retireAgeYears,
          retireAgeMonths: retireAgeMonths,
          retireYear: retireYear,
          retireMonth: retireMonth,
          delayMonths: delayMonths,
          isDelayed: delayMonths > 0
        };
      }

      /**
       * 计算退休年龄
       */
      window.calculate = function () {
        const birthYear = parseInt(document.getElementById("birthYear").value);
        const birthMonth = parseInt(document.getElementById("birthMonth").value);

        let originalAge, targetAge, delayRate;

        if (gender === "male") {
          originalAge = 60;
          targetAge = 63;
          delayRate = 4; // 每4个月延迟1个月
        } else if (femaleType === "worker") {
          originalAge = 50;
          targetAge = 55;
          delayRate = 2; // 每2个月延迟1个月
        } else {
          originalAge = 55;
          targetAge = 58;
          delayRate = 4; // 每4个月延迟1个月
        }

        const result = calculateDelay(birthYear, birthMonth, originalAge, targetAge, delayRate);

        displayResult(result, birthYear, birthMonth, originalAge);
      };

      /**
       * 显示结果
       */
      function displayResult(result, birthYear, birthMonth, originalAge) {
        const resultCard = document.getElementById("resultCard");

        // 显示退休年龄
        let ageText = result.retireAge;
        if (result.retireAgeMonths > 0) {
          ageText = result.retireAge + "+" + result.retireAgeMonths + "月";
        }
        document.getElementById("resultAge").textContent = ageText;
        document.getElementById("resultDate").textContent =
          `退休时间：${result.retireYear}年${result.retireMonth}月`;

        // 计算距离退休的时间
        const today = new Date();
        const retireDate = new Date(result.retireYear, result.retireMonth - 1);
        const diffMs = retireDate - today;
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        const diffYears = Math.floor(diffDays / 365);
        const diffMonthsRemain = Math.floor((diffDays % 365) / 30);

        // 结果网格
        document.getElementById("resultGrid").innerHTML = `
                <div class="result-item">
                    <div class="value">${originalAge}岁</div>
                    <div class="label">原退休年龄</div>
                </div>
                <div class="result-item">
                    <div class="value warning">+${result.delayMonths}月</div>
                    <div class="label">延迟月数</div>
                </div>
                <div class="result-item">
                    <div class="value">${result.retireYear}年${result.retireMonth}月</div>
                    <div class="label">退休时间</div>
                </div>
                <div class="result-item">
                    <div class="value ${diffDays > 0 ? "" : "success"}">${diffDays > 0 ? diffYears + "年" + diffMonthsRemain + "月" : "已到退休年龄"}</div>
                    <div class="label">${diffDays > 0 ? "距离退休" : "状态"}</div>
                </div>
            `;

        // 时间线
        const originalRetireYear = birthYear + originalAge;
        document.getElementById("timeline").innerHTML = `
                <div class="timeline-item">
                    <div class="date">${birthYear}年${birthMonth}月</div>
                    <div class="event">🎂 出生</div>
                </div>
                <div class="timeline-item">
                    <div class="date">2025年1月</div>
                    <div class="event">📜 延迟退休政策开始实施</div>
                </div>
                ${
                  result.isDelayed
                    ? `
                <div class="timeline-item">
                    <div class="date">${originalRetireYear}年${birthMonth}月</div>
                    <div class="event">原退休时间（${originalAge}岁）</div>
                    <div class="note">因政策调整，需延迟 ${result.delayMonths} 个月</div>
                </div>
                `
                    : ""
                }
                <div class="timeline-item">
                    <div class="date">${result.retireYear}年${result.retireMonth}月</div>
                    <div class="event">🎉 法定退休时间</div>
                    <div class="note">退休年龄：${result.retireAge}岁${result.retireAgeMonths > 0 ? result.retireAgeMonths + "个月" : ""}</div>
                </div>
            `;

        // 弹性退休说明
        const minRetireAge = Math.max(originalAge, result.retireAge - 3);
        const maxRetireAge = result.retireAge + 3;

        // 计算最低缴费年限
        let minPaymentYears = 15;
        if (result.retireYear >= 2030) {
          const yearsSince2030 = result.retireYear - 2030;
          minPaymentYears = Math.min(20, 15 + Math.floor(yearsSince2030 / 2) * 0.5 + 0.5);
        }

        document.getElementById("flexInfo").innerHTML = `
                <div class="title">💡 弹性退休选择</div>
                <div class="content">
                    <p>根据政策，您可以在满足最低缴费年限（${minPaymentYears}年）的前提下：</p>
                    <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                        <li><strong>提前退休：</strong>最早可在 <strong>${minRetireAge}岁</strong> 退休（不得早于原法定年龄）</li>
                        <li><strong>延迟退休：</strong>与单位协商后，最晚可在 <strong>${maxRetireAge}岁</strong> 退休</li>
                    </ul>
                    <p style="margin-top: 0.5rem; font-size: 0.85rem;">
                        注：2030年起最低缴费年限将逐步从15年提高至20年（每年提高6个月）
                    </p>
                </div>
            `;

        resultCard.style.display = "block";
        resultCard.scrollIntoView({ behavior: "smooth" });
      }

      /**
       * 主题切换
       */
      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };

      // 初始化
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
