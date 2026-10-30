// @ts-nocheck
// Generated from tools/legal/lawyer-fee.html
// Source SHA-256: f3ea4f13230ae01ec2ddcadf208a19cb9d26a395c049ab0d64404d96c8ca7b82
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "lawyer_fee_v1";

      function calculate() {
        var caseType = document.getElementById("caseType").value;
        var region = document.getElementById("region").value;
        var amount = parseFloat(document.getElementById("amount").value) || 0;
        var stage = document.getElementById("stage").value;
        var complexity = document.getElementById("complexity").value;
        var riskMode = document.getElementById("riskMode").value;

        if (caseType === "consultation") {
          showConsultationResult();
          return;
        }

        if (amount <= 0 && caseType !== "criminal" && caseType !== "consultation") {
          showStatus("请输入案件标的额", "error");
          return;
        }

        // Calculate lawyer fee
        var lawyerFee = calculateLawyerFee(amount, caseType, complexity, riskMode);

        // Apply stage multiplier
        var stageMultiplier = {
          first: 1,
          second: 0.8,
          retrial: 0.7,
          full: 1.6
        };
        lawyerFee = lawyerFee * (stageMultiplier[stage] || 1);

        // Apply region adjustment
        var regionMultiplier = {
          beijing: 1.2,
          shanghai: 1.2,
          guangdong: 1.1,
          jiangsu: 1.0,
          zhejiang: 1.0,
          other: 0.9
        };
        lawyerFee = lawyerFee * (regionMultiplier[region] || 1);

        // Calculate court fee
        var courtFee = calculateCourtFee(amount, caseType);

        // Total
        var totalFee = lawyerFee + courtFee;

        // Display results
        document.getElementById("results").style.display = "block";
        document.getElementById("lawyerFee").textContent =
          "¥" + formatNumber(Math.round(lawyerFee));
        document.getElementById("courtFee").textContent = "¥" + formatNumber(Math.round(courtFee));
        document.getElementById("totalFee").textContent = "¥" + formatNumber(Math.round(totalFee));

        // Breakdown
        var breakdownList = document.getElementById("breakdownList");
        breakdownList.textContent = "";

        var breakdownItems = [
          { label: "案件标的额", value: "¥" + formatNumber(amount) },
          { label: "案件类型", value: getCaseTypeName(caseType) },
          { label: "诉讼阶段", value: getStageName(stage) },
          { label: "复杂程度", value: getComplexityName(complexity) },
          { label: "地区调整", value: getRegionName(region) },
          { label: "收费模式", value: getRiskModeName(riskMode) },
          { label: "律师代理费（参考）", value: "¥" + formatNumber(Math.round(lawyerFee)) },
          { label: "案件受理费", value: "¥" + formatNumber(Math.round(courtFee)) },
          { label: "预估总费用", value: "¥" + formatNumber(Math.round(totalFee)) }
        ];

        breakdownItems.forEach(function (item) {
          var div = document.createElement("div");
          div.className = "breakdown-item";

          var labelSpan = document.createElement("span");
          labelSpan.className = "breakdown-label";
          labelSpan.textContent = item.label;

          var valueSpan = document.createElement("span");
          valueSpan.textContent = item.value;

          div.appendChild(labelSpan);
          div.appendChild(valueSpan);
          breakdownList.appendChild(div);
        });

        saveToStorage();
        showStatus("计算完成", "success");
      }

      function calculateLawyerFee(amount, caseType, complexity, riskMode) {
        var baseFee = 0;

        if (caseType === "criminal") {
          // Criminal case fixed fee range
          var criminalFees = {
            simple: 5000,
            normal: 15000,
            complex: 30000,
            major: 50000
          };
          return criminalFees[complexity] || 15000;
        }

        // Calculate based on amount using tiered rates
        if (amount <= 100000) {
          baseFee = Math.max(amount * 0.08, 3000);
        } else if (amount <= 1000000) {
          baseFee = 5000 + (amount - 100000) * 0.05;
        } else if (amount <= 5000000) {
          baseFee = 55000 + (amount - 1000000) * 0.03;
        } else if (amount <= 10000000) {
          baseFee = 205000 + (amount - 5000000) * 0.02;
        } else {
          baseFee = 305000 + (amount - 10000000) * 0.01;
        }

        // Apply complexity multiplier
        var complexityMultiplier = {
          simple: 0.8,
          normal: 1,
          complex: 1.3,
          major: 1.6
        };
        baseFee = baseFee * (complexityMultiplier[complexity] || 1);

        // Risk mode adjustment
        if (riskMode === "risk") {
          baseFee = baseFee * 0.5; // Base fee lower, but success fee not included
        }

        return baseFee;
      }

      function calculateCourtFee(amount, caseType) {
        if (
          caseType === "criminal" ||
          caseType === "consultation" ||
          caseType === "nonlitigation"
        ) {
          return 0;
        }

        // Property case court fee calculation (simplified)
        if (amount <= 10000) {
          return 50;
        } else if (amount <= 100000) {
          return 50 + (amount - 10000) * 0.025;
        } else if (amount <= 200000) {
          return 2300 + (amount - 100000) * 0.02;
        } else if (amount <= 500000) {
          return 4300 + (amount - 200000) * 0.015;
        } else if (amount <= 1000000) {
          return 8800 + (amount - 500000) * 0.01;
        } else if (amount <= 2000000) {
          return 13800 + (amount - 1000000) * 0.009;
        } else if (amount <= 5000000) {
          return 22800 + (amount - 2000000) * 0.008;
        } else if (amount <= 10000000) {
          return 46800 + (amount - 5000000) * 0.007;
        } else if (amount <= 20000000) {
          return 81800 + (amount - 10000000) * 0.006;
        } else {
          return 141800 + (amount - 20000000) * 0.005;
        }
      }

      function showConsultationResult() {
        document.getElementById("results").style.display = "block";
        document.getElementById("lawyerFee").textContent = "¥200-1000/小时";
        document.getElementById("courtFee").textContent = "¥0";
        document.getElementById("totalFee").textContent = "协商确定";

        var breakdownList = document.getElementById("breakdownList");
        breakdownList.textContent = "";

        var items = [
          { label: "电话咨询", value: "¥100-300/次" },
          { label: "书面咨询", value: "¥500-2000/次" },
          { label: "当面咨询", value: "¥200-1000/小时" },
          { label: "法律顾问（年费）", value: "¥30000-200000/年" }
        ];

        items.forEach(function (item) {
          var div = document.createElement("div");
          div.className = "breakdown-item";

          var labelSpan = document.createElement("span");
          labelSpan.className = "breakdown-label";
          labelSpan.textContent = item.label;

          var valueSpan = document.createElement("span");
          valueSpan.textContent = item.value;

          div.appendChild(labelSpan);
          div.appendChild(valueSpan);
          breakdownList.appendChild(div);
        });

        showStatus("法律咨询费用参考", "success");
      }

      function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      function getCaseTypeName(type) {
        var names = {
          civil: "民事诉讼",
          criminal: "刑事诉讼",
          admin: "行政诉讼",
          arbitration: "仲裁案件",
          enforcement: "执行案件",
          nonlitigation: "非诉讼事务",
          consultation: "法律咨询"
        };
        return names[type] || type;
      }

      function getStageName(stage) {
        var names = {
          first: "一审",
          second: "二审",
          retrial: "再审",
          full: "全程代理"
        };
        return names[stage] || stage;
      }

      function getComplexityName(complexity) {
        var names = {
          simple: "简单",
          normal: "一般",
          complex: "复杂",
          major: "重大疑难"
        };
        return names[complexity] || complexity;
      }

      function getRegionName(region) {
        var names = {
          beijing: "北京 (+20%)",
          shanghai: "上海 (+20%)",
          guangdong: "广东 (+10%)",
          jiangsu: "江苏 (基准)",
          zhejiang: "浙江 (基准)",
          other: "其他地区 (-10%)"
        };
        return names[region] || region;
      }

      function getRiskModeName(mode) {
        var names = {
          fixed: "固定收费",
          percentage: "按标的比例",
          risk: "风险代理"
        };
        return names[mode] || mode;
      }

      function updateFeeInfo() {
        // Could update the fee table based on case type
      }

      function clearForm() {
        document.getElementById("amount").value = "";
        document.getElementById("results").style.display = "none";
        localStorage.removeItem(LS_KEY);
        showStatus("已清空", "success");
      }

      function saveToStorage() {
        try {
          var data = {
            caseType: document.getElementById("caseType").value,
            region: document.getElementById("region").value,
            amount: document.getElementById("amount").value,
            stage: document.getElementById("stage").value,
            complexity: document.getElementById("complexity").value,
            riskMode: document.getElementById("riskMode").value
          };
          localStorage.setItem(LS_KEY, JSON.stringify(data));
        } catch (e) {}
      }

      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            var data = JSON.parse(saved);
            if (data.caseType) document.getElementById("caseType").value = data.caseType;
            if (data.region) document.getElementById("region").value = data.region;
            if (data.amount) document.getElementById("amount").value = data.amount;
            if (data.stage) document.getElementById("stage").value = data.stage;
            if (data.complexity) document.getElementById("complexity").value = data.complexity;
            if (data.riskMode) document.getElementById("riskMode").value = data.riskMode;
          }
        } catch (e) {}
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function toggleTheme() {
        var html = document.documentElement;
        var btn = document.querySelector(".theme-toggle");
        var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }

      (function () {
        var savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
          var btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = savedTheme === "dark" ? "🌙" : "☀️";
        }
        loadFromStorage();
      })();
    
