// @ts-nocheck
// Generated from tools/privacy/credit-card.html
// Source SHA-256: 59634b20bbfad8d6a11dca8386ace5fa2f67212849aa0052b6988b539ef17ed3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const cardPreviewEl = document.getElementById("cardPreview");
      const cardNumberEl = document.getElementById("cardNumber");
      const cardBrandEl = document.getElementById("cardBrand");
      const validationResultEl = document.getElementById("validationResult");
      const validationIconEl = document.getElementById("validationIcon");
      const validationStatusEl = document.getElementById("validationStatus");
      const cardTypeEl = document.getElementById("cardType");
      const infoGridEl = document.getElementById("infoGrid");
      const miiValueEl = document.getElementById("miiValue");
      const issuerValueEl = document.getElementById("issuerValue");
      const lengthValueEl = document.getElementById("lengthValue");
      const luhnValueEl = document.getElementById("luhnValue");
      const luhnStepsEl = document.getElementById("luhnSteps");
      const luhnContentEl = document.getElementById("luhnContent");
      const statusEl = document.getElementById("status");

      const cardPatterns = {
        visa: {
          pattern: /^4/,
          name: "Visa",
          icon: "VISA"
        },
        mastercard: {
          pattern: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/,
          name: "Mastercard",
          icon: "MASTERCARD"
        },
        amex: {
          pattern: /^3[47]/,
          name: "American Express",
          icon: "AMEX"
        },
        discover: {
          pattern: /^6(?:011|5)/,
          name: "Discover",
          icon: "DISCOVER"
        },
        diners: {
          pattern: /^3(?:0[0-5]|[68][0-9])/,
          name: "Diner's Club",
          icon: "DINERS"
        },
        jcb: {
          pattern: /^(?:2131|1800|35\d{3})/,
          name: "JCB",
          icon: "JCB"
        }
      };

      const miiIndustries = {
        0: "ISO/TC 68 和其他未来行业分配",
        1: "航空公司",
        2: "航空公司",
        3: "旅行和娱乐",
        4: "银行和金融",
        5: "银行和金融",
        6: "商业和银行",
        7: "石油",
        8: "医疗保健和电信",
        9: "政府"
      };

      function detectCardType(number) {
        const cleaned = number.replace(/\s/g, "");
        for (const [key, card] of Object.entries(cardPatterns)) {
          if (card.pattern.test(cleaned)) {
            return card;
          }
        }
        return { name: "Unknown", icon: "?" };
      }

      function luhnCheck(cardNumber) {
        const cleaned = cardNumber.replace(/\s/g, "");
        if (!/^\d+$/.test(cleaned)) return { valid: false };

        let sum = 0;
        let shouldDouble = false;

        for (let i = cleaned.length - 1; i >= 0; i--) {
          let digit = parseInt(cleaned[i], 10);

          if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
              digit -= 9;
            }
          }

          sum += digit;
          shouldDouble = !shouldDouble;
        }

        return {
          valid: sum % 10 === 0,
          checksum: sum
        };
      }

      function formatCardNumber(number) {
        const cleaned = number.replace(/\s/g, "");
        const groups = cleaned.match(/.{1,4}/g);
        return groups ? groups.join(" ") : cleaned;
      }

      function formatLuhnSteps(number) {
        const cleaned = number.replace(/\s/g, "");
        let steps = [];
        let digits = cleaned.split("").map((d) => parseInt(d, 10));

        steps.push("原始号码: " + digits.join(" "));
        steps.push("");
        steps.push("从右到左，每隔一位翻倍:");

        let shouldDouble = false;
        let processed = [];

        for (let i = digits.length - 1; i >= 0; i--) {
          let digit = digits[i];
          let original = digit;

          if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
              digit -= 9;
            }
            processed.unshift({
              original: original,
              doubled: original * 2,
              final: digit,
              position: i + 1
            });
          } else {
            processed.unshift({
              original: original,
              doubled: null,
              final: original,
              position: i + 1
            });
          }
          shouldDouble = !shouldDouble;
        }

        processed.reverse().forEach((p, idx) => {
          if (p.doubled !== null) {
            steps.push(
              `  位置 ${processed.length - idx}: ${p.original} × 2 = ${p.doubled}${p.doubled > 9 ? " → " + p.doubled + " - 9 = " + p.final : ""}`
            );
          }
        });

        const sum = processed.reduce((acc, p) => acc + p.final, 0);
        steps.push("");
        steps.push("所有数字之和: " + sum);
        steps.push("校验结果: " + (sum % 10 === 0 ? "有效 ✓" : "无效 ✗"));

        return steps.join("\n");
      }

      function validateCard() {
        const input = inputEl.value.trim();
        if (!input) {
          showStatus("请输入信用卡号码", "error");
          return;
        }

        const cleaned = input.replace(/\s/g, "");

        if (!/^\d{13,19}$/.test(cleaned)) {
          showStatus("号码格式无效", "error");
          resetDisplay();
          return;
        }

        const card = detectCardType(cleaned);
        const luhn = luhnCheck(cleaned);
        const mii = miiIndustries[cleaned[0]] || "Unknown";

        cardNumberEl.textContent = formatCardNumber(cleaned);
        cardBrandEl.textContent = card.icon;

        cardPreviewEl.style.display = "block";
        validationResultEl.style.display = "block";
        infoGridEl.style.display = "grid";
        luhnStepsEl.style.display = "block";

        if (luhn.valid) {
          validationIconEl.textContent = "✓";
          validationStatusEl.textContent = "有效";
          validationStatusEl.className = "validation-status valid";
          showStatus("验证通过", "success");
        } else {
          validationIconEl.textContent = "✗";
          validationStatusEl.textContent = "无效";
          validationStatusEl.className = "validation-status invalid";
          showStatus("验证失败", "error");
        }

        cardTypeEl.textContent = card.name !== "Unknown" ? card.name + " 卡" : "未知卡类型";

        miiValueEl.textContent = mii;
        issuerValueEl.textContent = card.name !== "Unknown" ? card.name : "Unknown";
        lengthValueEl.textContent = cleaned.length + " 位数字";
        luhnValueEl.textContent = luhn.checksum + " (" + (luhn.valid ? "通过" : "失败") + ")";

        luhnContentEl.textContent = formatLuhnSteps(cleaned);
      }

      function resetDisplay() {
        cardPreviewEl.style.display = "none";
        validationResultEl.style.display = "none";
        infoGridEl.style.display = "none";
        luhnStepsEl.style.display = "none";
        cardNumberEl.textContent = "";
        cardBrandEl.textContent = "";
        validationIconEl.textContent = "";
        validationStatusEl.textContent = "";
        cardTypeEl.textContent = "";
        miiValueEl.textContent = "";
        issuerValueEl.textContent = "";
        lengthValueEl.textContent = "";
        luhnValueEl.textContent = "";
        luhnContentEl.textContent = "";
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function reset() {
        inputEl.value = "";
        resetDisplay();
        statusEl.textContent = "";
      }

      document.getElementById("btnValidate").onclick = validateCard;

      document.getElementById("btnCopy").onclick = async function () {
        const result = [
          "信用卡验证结果",
          "==============",
          "卡号: " + cardNumberEl.textContent,
          "卡类型: " + cardTypeEl.textContent,
          "MII: " + miiValueEl.textContent,
          "发卡行: " + issuerValueEl.textContent,
          "长度: " + lengthValueEl.textContent,
          "Luhn 校验: " + luhnValueEl.textContent,
          "",
          "验证状态: " + validationStatusEl.textContent
        ].join("\n");

        try {
          await navigator.clipboard.writeText(result);
          showStatus("结果已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = reset;

      document.querySelectorAll(".example-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const number = btn.getAttribute("data-number");
          inputEl.value = formatCardNumber(number);
          validateCard();
        });
      });

      inputEl.addEventListener("input", function () {
        let value = this.value.replace(/\s/g, "").replace(/\D/g, "");
        if (value.length > 16) value = value.slice(0, 16);
        this.value = formatCardNumber(value);
      });

      inputEl.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          validateCard();
        }
      });

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
