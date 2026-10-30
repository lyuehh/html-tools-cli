// @ts-nocheck
// Generated from tools/life/bank-card-validator.html
// Source SHA-256: 9b235ed1985ae90f3cbfeefa615b7ac0653cec81b07f515eb3e308f76cc6528c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 银行BIN码映射（前6位）
      const BANK_BINS = {
        // 工商银行
        622202: { bank: "中国工商银行", type: "借记卡", logo: "🏛️" },
        622200: { bank: "中国工商银行", type: "借记卡", logo: "🏛️" },
        621226: { bank: "中国工商银行", type: "借记卡", logo: "🏛️" },
        621225: { bank: "中国工商银行", type: "借记卡", logo: "🏛️" },
        621700: { bank: "中国建设银行", type: "借记卡", logo: "🏛️" },
        621284: { bank: "中国建设银行", type: "借记卡", logo: "🏛️" },
        // 建设银行
        436742: { bank: "中国建设银行", type: "信用卡", logo: "🏛️" },
        552245: { bank: "中国建设银行", type: "信用卡", logo: "🏛️" },
        // 农业银行
        622848: { bank: "中国农业银行", type: "借记卡", logo: "🏛️" },
        621282: { bank: "中国农业银行", type: "借记卡", logo: "🏛️" },
        622836: { bank: "中国农业银行", type: "借记卡", logo: "🏛️" },
        // 中国银行
        621660: { bank: "中国银行", type: "借记卡", logo: "🏛️" },
        622760: { bank: "中国银行", type: "借记卡", logo: "🏛️" },
        621661: { bank: "中国银行", type: "借记卡", logo: "🏛️" },
        // 招商银行
        622588: { bank: "招商银行", type: "借记卡", logo: "💼" },
        621485: { bank: "招商银行", type: "借记卡", logo: "💼" },
        622575: { bank: "招商银行", type: "信用卡", logo: "💼" },
        // 交通银行
        622258: { bank: "交通银行", type: "借记卡", logo: "🏛️" },
        621436: { bank: "交通银行", type: "借记卡", logo: "🏛️" },
        // 邮储银行
        621096: { bank: "中国邮政储蓄银行", type: "借记卡", logo: "📮" },
        622150: { bank: "中国邮政储蓄银行", type: "借记卡", logo: "📮" },
        // 兴业银行
        622909: { bank: "兴业银行", type: "借记卡", logo: "💼" },
        // 民生银行
        622615: { bank: "中国民生银行", type: "借记卡", logo: "💼" },
        // 浦发银行
        622516: { bank: "上海浦东发展银行", type: "借记卡", logo: "💼" },
        // 中信银行
        622680: { bank: "中信银行", type: "借记卡", logo: "💼" },
        // 光大银行
        622660: { bank: "中国光大银行", type: "借记卡", logo: "💼" },
        // 华夏银行
        622630: { bank: "华夏银行", type: "借记卡", logo: "💼" },
        // 平安银行
        622155: { bank: "平安银行", type: "借记卡", logo: "💼" },
        // 广发银行
        622568: { bank: "广发银行", type: "借记卡", logo: "💼" }
      };

      // 国际卡组织
      const CARD_BRANDS = {
        4: { brand: "Visa", logo: "💳" },
        5: { brand: "MasterCard", logo: "💳" },
        34: { brand: "American Express", logo: "💳" },
        37: { brand: "American Express", logo: "💳" },
        62: { brand: "银联", logo: "🇨🇳" },
        60: { brand: "Discover", logo: "💳" },
        35: { brand: "JCB", logo: "💳" }
      };

      /**
       * Luhn算法校验
       */
      function luhnCheck(cardNumber) {
        const digits = cardNumber.split("").map(Number);
        const steps = [];
        let sum = 0;

        for (let i = digits.length - 1; i >= 0; i--) {
          let digit = digits[i];
          const isDouble = (digits.length - 1 - i) % 2 === 1;

          if (isDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
          }

          steps.unshift({
            original: digits[i],
            calculated: digit,
            isDouble: isDouble
          });

          sum += digit;
        }

        return {
          valid: sum % 10 === 0,
          sum: sum,
          steps: steps
        };
      }

      /**
       * 识别发卡银行
       */
      function identifyBank(cardNumber) {
        const bin6 = cardNumber.substring(0, 6);

        // 先查精确BIN码
        if (BANK_BINS[bin6]) {
          return BANK_BINS[bin6];
        }

        // 查前缀识别卡组织
        const prefix2 = cardNumber.substring(0, 2);
        const prefix1 = cardNumber.substring(0, 1);

        if (CARD_BRANDS[prefix2]) {
          const brand = CARD_BRANDS[prefix2];
          return {
            bank: brand.brand,
            type: prefix2 === "62" ? "银联卡" : "国际卡",
            logo: brand.logo
          };
        }

        if (CARD_BRANDS[prefix1]) {
          const brand = CARD_BRANDS[prefix1];
          return {
            bank: brand.brand,
            type: "国际卡",
            logo: brand.logo
          };
        }

        return {
          bank: "未知银行",
          type: "未知类型",
          logo: "💳"
        };
      }

      /**
       * 格式化卡号显示
       */
      function formatCardNumber(num) {
        const clean = num.replace(/\s/g, "");
        return clean.replace(/(.{4})/g, "$1 ").trim();
      }

      /**
       * 验证并显示结果
       */
      window.validate = function () {
        const input = document.getElementById("cardInput");
        const cardNumber = input.value.replace(/[\s-]/g, "");

        // 更新卡片预览
        updateCardPreview(cardNumber);

        const statusBox = document.getElementById("statusBox");
        const statusIcon = document.getElementById("statusIcon");
        const statusTitle = document.getElementById("statusTitle");
        const statusDesc = document.getElementById("statusDesc");
        const infoGrid = document.getElementById("infoGrid");
        const algorithmBox = document.getElementById("algorithmBox");

        if (!cardNumber) {
          statusBox.className = "status-box pending";
          statusIcon.textContent = "🔐";
          statusTitle.className = "status-title";
          statusTitle.textContent = "请输入银行卡号进行校验";
          statusDesc.textContent = "支持各大银行的借记卡和信用卡";
          infoGrid.style.display = "none";
          algorithmBox.style.display = "none";
          return;
        }

        // 检查是否全为数字
        if (!/^\d+$/.test(cardNumber)) {
          statusBox.className = "status-box invalid";
          statusIcon.textContent = "❌";
          statusTitle.className = "status-title invalid";
          statusTitle.textContent = "格式错误";
          statusDesc.textContent = "银行卡号只能包含数字";
          infoGrid.style.display = "none";
          algorithmBox.style.display = "none";
          return;
        }

        // 检查长度
        if (cardNumber.length < 16 || cardNumber.length > 19) {
          statusBox.className = "status-box pending";
          statusIcon.textContent = "⏳";
          statusTitle.className = "status-title";
          statusTitle.textContent = `已输入 ${cardNumber.length} 位`;
          statusDesc.textContent = "银行卡号通常为16-19位";
          infoGrid.style.display = "none";
          algorithmBox.style.display = "none";
          return;
        }

        // Luhn校验
        const luhnResult = luhnCheck(cardNumber);
        const bankInfo = identifyBank(cardNumber);

        // 显示算法验证过程
        displayAlgorithm(luhnResult);

        if (luhnResult.valid) {
          statusBox.className = "status-box valid";
          statusIcon.textContent = "✅";
          statusTitle.className = "status-title valid";
          statusTitle.textContent = "Luhn校验通过";
          statusDesc.textContent = "银行卡号格式有效（不代表卡号真实存在）";

          // 显示详细信息
          document.getElementById("infoBank").textContent = bankInfo.bank;
          document.getElementById("infoType").textContent = bankInfo.type;
          document.getElementById("infoLength").textContent = cardNumber.length + "位";
          document.getElementById("infoBin").textContent = cardNumber.substring(0, 6);
          infoGrid.style.display = "grid";
        } else {
          statusBox.className = "status-box invalid";
          statusIcon.textContent = "❌";
          statusTitle.className = "status-title invalid";
          statusTitle.textContent = "Luhn校验失败";
          statusDesc.textContent = "银行卡号校验位错误，可能是无效卡号";
          infoGrid.style.display = "none";
        }
      };

      /**
       * 更新卡片预览
       */
      function updateCardPreview(cardNumber) {
        const previewNumber = document.getElementById("previewNumber");
        const previewBank = document.getElementById("previewBank");
        const previewType = document.getElementById("previewType");
        const previewLogo = document.getElementById("previewLogo");

        if (!cardNumber) {
          previewNumber.textContent = "**** **** **** ****";
          previewBank.textContent = "请输入卡号";
          previewType.textContent = "-";
          previewLogo.textContent = "💳";
          return;
        }

        // 显示格式化的卡号
        const masked = cardNumber.padEnd(16, "*");
        previewNumber.textContent = formatCardNumber(masked);

        // 识别银行
        if (cardNumber.length >= 6) {
          const bankInfo = identifyBank(cardNumber);
          previewBank.textContent = bankInfo.bank;
          previewType.textContent = bankInfo.type;
          previewLogo.textContent = bankInfo.logo;
        } else {
          previewBank.textContent = "识别中...";
          previewType.textContent = "-";
          previewLogo.textContent = "💳";
        }
      }

      /**
       * 显示Luhn算法验证过程
       */
      function displayAlgorithm(result) {
        const digitRow = document.getElementById("digitRow");
        const luhnResult = document.getElementById("luhnResult");
        const algorithmBox = document.getElementById("algorithmBox");

        digitRow.innerHTML = "";

        result.steps.forEach((step) => {
          const cell = document.createElement("div");
          cell.className = "digit-cell" + (step.isDouble ? " double" : "");
          cell.innerHTML = `
                    <span class="num">${step.original}</span>
                    <span class="calc">${step.isDouble ? "×2=" + step.calculated : ""}</span>
                `;
          digitRow.appendChild(cell);
        });

        luhnResult.innerHTML = `各位数字处理后求和: <span>${result.sum}</span>，${result.sum} mod 10 = <span>${result.sum % 10}</span>，${result.valid ? "✓ 校验通过" : "✗ 校验失败"}`;

        algorithmBox.style.display = "block";
      }

      /**
       * 设置示例
       */
      window.setExample = function (num) {
        document.getElementById("cardInput").value = formatCardNumber(num);
        validate();
      };

      /**
       * 主题切换
       */
      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };

      // 初始化主题
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      // 输入格式化
      document.getElementById("cardInput").addEventListener("input", function (e) {
        let value = this.value.replace(/[^\d\s]/g, "");
        // 自动添加空格分隔
        const clean = value.replace(/\s/g, "");
        if (clean.length > 0) {
          this.value = formatCardNumber(clean);
        }
      });
    
