// @ts-nocheck
// Generated from tools/life/due-date.html
// Source SHA-256: 020ed1575bf00857b112c0bd3d3ffe1858e1c41d3ebc6d82a135eb54b69561ef
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentMethod = "lmp";

      // 胎儿发育数据
      const fetalDevelopment = {
        4: { icon: "🔵", size: "0.1cm", weight: "<1g", desc: "受精卵着床，开始形成胚胎" },
        5: { icon: "🫘", size: "0.2cm", weight: "<1g", desc: "心脏开始跳动，神经管形成" },
        6: { icon: "🫛", size: "0.5cm", weight: "<1g", desc: "面部器官开始发育，四肢芽出现" },
        7: { icon: "🫛", size: "1cm", weight: "<1g", desc: "手指脚趾开始分化" },
        8: { icon: "🫛", size: "1.6cm", weight: "1g", desc: "胚胎期结束，正式称为胎儿" },
        9: { icon: "🥜", size: "2.3cm", weight: "2g", desc: "眼睑开始形成，四肢可以活动" },
        10: { icon: "🥜", size: "3cm", weight: "4g", desc: "手指脚趾完全分开，指甲开始生长" },
        11: { icon: "🍇", size: "4cm", weight: "7g", desc: "外生殖器开始发育" },
        12: { icon: "🍋", size: "5.4cm", weight: "14g", desc: "所有器官已形成，进入成熟期" },
        13: { icon: "🍋", size: "7cm", weight: "25g", desc: "声带形成，可以打嗝" },
        14: { icon: "🍋", size: "8.7cm", weight: "43g", desc: "开始长出胎毛" },
        15: { icon: "🍎", size: "10cm", weight: "70g", desc: "可以感受到光线" },
        16: { icon: "🍎", size: "11.6cm", weight: "100g", desc: "可能开始感受到胎动" },
        17: { icon: "🥑", size: "13cm", weight: "140g", desc: "脂肪开始积累" },
        18: { icon: "🥑", size: "14cm", weight: "190g", desc: "可以听到声音" },
        19: { icon: "🥭", size: "15cm", weight: "240g", desc: "感觉器官快速发育" },
        20: { icon: "🥭", size: "16cm", weight: "300g", desc: "可通过B超确定性别，孕期过半" },
        21: { icon: "🍌", size: "27cm", weight: "360g", desc: "眉毛和眼睑发育完善" },
        22: { icon: "🍌", size: "28cm", weight: "430g", desc: "嘴唇和眉毛更加清晰" },
        23: { icon: "🥒", size: "29cm", weight: "500g", desc: "皮肤开始变得不透明" },
        24: { icon: "🥒", size: "30cm", weight: "600g", desc: "肺部开始产生表面活性物质" },
        25: { icon: "🌽", size: "35cm", weight: "660g", desc: "开始有规律的睡眠周期" },
        26: { icon: "🌽", size: "36cm", weight: "760g", desc: "眼睛可以睁开" },
        27: { icon: "🥬", size: "37cm", weight: "875g", desc: "大脑快速发育" },
        28: { icon: "🥬", size: "38cm", weight: "1kg", desc: "可以做梦了" },
        29: { icon: "🍆", size: "39cm", weight: "1.2kg", desc: "骨骼变得更坚硬" },
        30: { icon: "🍆", size: "40cm", weight: "1.3kg", desc: "开始储存铁、钙等矿物质" },
        31: { icon: "🥥", size: "41cm", weight: "1.5kg", desc: "脑部发育进入高峰期" },
        32: { icon: "🥥", size: "42cm", weight: "1.7kg", desc: "指甲长到指尖" },
        33: { icon: "🍍", size: "43cm", weight: "1.9kg", desc: "免疫系统发育" },
        34: { icon: "🍍", size: "45cm", weight: "2.1kg", desc: "肺部接近成熟" },
        35: { icon: "🍈", size: "46cm", weight: "2.4kg", desc: "大部分器官已经成熟" },
        36: { icon: "🍈", size: "47cm", weight: "2.6kg", desc: "胎位大多已固定" },
        37: { icon: "🎃", size: "48cm", weight: "2.9kg", desc: "足月！随时可能出生" },
        38: { icon: "🎃", size: "49cm", weight: "3.1kg", desc: "各器官已完全成熟" },
        39: { icon: "🍉", size: "50cm", weight: "3.3kg", desc: "等待分娩信号" },
        40: { icon: "🍉", size: "51cm", weight: "3.5kg", desc: "预产期到来，准备迎接宝宝！" }
      };

      // 产检时间表
      const checkupSchedule = [
        { week: 6, title: "首次产检", desc: "确认妊娠，B超检查胎心" },
        { week: 12, title: "NT检查", desc: "测量胎儿颈部透明层厚度" },
        { week: 16, title: "唐氏筛查", desc: "抽血检查染色体异常风险" },
        { week: 20, title: "大排畸B超", desc: "全面检查胎儿结构发育" },
        { week: 24, title: "糖耐量测试", desc: "筛查妊娠期糖尿病" },
        { week: 28, title: "常规产检", desc: "开始每两周产检一次" },
        { week: 32, title: "B超检查", desc: "评估胎儿大小和羊水量" },
        { week: 36, title: "足月检查", desc: "开始每周产检，评估分娩条件" },
        { week: 37, title: "入院准备", desc: "准备待产包，了解分娩征兆" },
        { week: 40, title: "预产期", desc: "等待分娩，超过41周需评估" }
      ];

      document.addEventListener("DOMContentLoaded", () => {
        // 设置默认日期
        const today = new Date();
        document.getElementById("lmpDate").value = getDateWeeksAgo(today, 8);
        document.getElementById("ultrasoundDate").value = today.toISOString().split("T")[0];
        document.getElementById("ivfDate").value = getDateWeeksAgo(today, 6);
      });

      function getDateWeeksAgo(date, weeks) {
        const result = new Date(date);
        result.setDate(result.getDate() - weeks * 7);
        return result.toISOString().split("T")[0];
      }

      function switchMethod(method) {
        currentMethod = method;

        document.querySelectorAll(".method-tab").forEach((tab) => {
          tab.classList.toggle("active", tab.dataset.method === method);
        });

        document.querySelectorAll(".method-section").forEach((section) => {
          section.classList.remove("show");
        });
        document.getElementById(method + "Section").classList.add("show");
      }

      function calculate() {
        let lmpDate; // 末次月经日期

        switch (currentMethod) {
          case "lmp": {
            const inputDate = document.getElementById("lmpDate").value;
            if (!inputDate) {
              alert("请选择末次月经日期");
              return;
            }
            lmpDate = new Date(inputDate);

            // 根据月经周期调整
            const cycleLength = parseInt(document.getElementById("cycleLength").value);
            const cycleDiff = cycleLength - 28;
            lmpDate.setDate(lmpDate.getDate() + cycleDiff);
            break;
          }

          case "ultrasound": {
            const ultrasoundDate = document.getElementById("ultrasoundDate").value;
            const weeks = parseInt(document.getElementById("ultrasoundWeeks").value) || 0;
            const days = parseInt(document.getElementById("ultrasoundDays").value) || 0;

            if (!ultrasoundDate || weeks < 4) {
              alert("请填写B超检查日期和孕周");
              return;
            }

            const totalDays = weeks * 7 + days;
            lmpDate = new Date(ultrasoundDate);
            lmpDate.setDate(lmpDate.getDate() - totalDays);
            break;
          }

          case "ivf": {
            const ivfDate = document.getElementById("ivfDate").value;
            const embryoType = parseInt(document.getElementById("embryoType").value);

            if (!ivfDate) {
              alert("请选择移植日期");
              return;
            }

            // 试管婴儿LMP计算：移植日期 - (14 + 胚胎天数) 天
            lmpDate = new Date(ivfDate);
            lmpDate.setDate(lmpDate.getDate() - 14 - embryoType);
            break;
          }
        }

        // 计算预产期（LMP + 280天）
        const dueDate = new Date(lmpDate);
        dueDate.setDate(dueDate.getDate() + 280);

        // 计算当前孕周
        const today = new Date();
        const daysSinceLMP = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24));
        const currentWeeks = Math.floor(daysSinceLMP / 7);
        const currentDays = daysSinceLMP % 7;

        // 计算距离预产期天数
        const daysUntilDue = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

        // 计算进度
        const progress = Math.min(100, Math.max(0, (daysSinceLMP / 280) * 100));

        // 显示结果
        document.getElementById("resultSection").classList.add("show");

        // 主要数据
        document.getElementById("dueDateResult").textContent = formatDate(dueDate);
        document.getElementById("weeksResult").textContent = `${currentWeeks}周${currentDays}天`;
        document.getElementById("daysLeftResult").textContent =
          daysUntilDue > 0 ? `${daysUntilDue}天` : "已到期";
        document.getElementById("progressResult").textContent = progress.toFixed(1) + "%";

        // 进度条
        document.getElementById("progressBar").style.width = progress + "%";
        document.getElementById("progressText").textContent = `${currentWeeks}/40周`;

        // 孕期阶段
        let trimester, trimesterClass;
        if (currentWeeks < 13) {
          trimester = "孕早期";
          trimesterClass = "trimester-1";
        } else if (currentWeeks < 28) {
          trimester = "孕中期";
          trimesterClass = "trimester-2";
        } else {
          trimester = "孕晚期";
          trimesterClass = "trimester-3";
        }
        const badge = document.getElementById("trimesterBadge");
        badge.textContent = trimester;
        badge.className = `trimester-badge ${trimesterClass}`;

        // 胎儿发育
        const weekData =
          fetalDevelopment[Math.min(40, Math.max(4, currentWeeks))] || fetalDevelopment[40];
        document.getElementById("fetalIcon").textContent = weekData.icon;
        document.getElementById("fetalTitle").textContent = `第${currentWeeks}周`;
        document.getElementById("fetalDesc").textContent = weekData.desc;
        document.getElementById("fetalSize").innerHTML = `
                <div class="size-item">📏 约 ${weekData.size}</div>
                <div class="size-item">⚖️ 约 ${weekData.weight}</div>
            `;

        // 时间线
        renderTimeline(lmpDate, currentWeeks);

        // 滚动到结果
        document.getElementById("resultSection").scrollIntoView({ behavior: "smooth" });
      }

      function renderTimeline(lmpDate, currentWeeks) {
        const timeline = document.getElementById("timeline");

        timeline.innerHTML = checkupSchedule
          .map((item) => {
            const checkupDate = new Date(lmpDate);
            checkupDate.setDate(checkupDate.getDate() + item.week * 7);

            let dotClass = "future";
            if (item.week < currentWeeks) {
              dotClass = "passed";
            } else if (item.week <= currentWeeks + 1) {
              dotClass = "current";
            }

            return `
                    <div class="timeline-item">
                        <div class="timeline-dot ${dotClass}"></div>
                        <div class="timeline-date">${formatDate(checkupDate)} · 孕${item.week}周</div>
                        <div class="timeline-title">${item.title}</div>
                        <div class="timeline-desc">${item.desc}</div>
                    </div>
                `;
          })
          .join("");
      }

      function formatDate(date) {
        return date.toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
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
    
