// @ts-nocheck
// Generated from tools/chinese/chinese-number.html
// Source SHA-256: a2ce0c450743f1ca5b632adbb3c3de32379fdb272157ad2cff425da605cc464c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const upperDigits = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
      const lowerDigits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
      const upperUnits = ["", "拾", "佰", "仟"];
      const lowerUnits = ["", "十", "百", "千"];
      const bigUnits = ["", "万", "亿", "兆"];

      function setNumber(num) {
        document.getElementById("numberInput").value = num;
        convert();
      }

      // 转换为大写金额（财务格式）
      function toMoneyUpper(num) {
        if (isNaN(num) || num === "") return "请输入有效数字";

        num = parseFloat(num);
        if (num < 0) return "金额不能为负数";
        if (num > 999999999999.99) return "金额超出范围";
        if (num === 0) return "零元整";

        // 四舍五入到分
        num = Math.round(num * 100) / 100;

        const intPart = Math.floor(num);
        const decPart = Math.round((num - intPart) * 100);
        const jiao = Math.floor(decPart / 10);
        const fen = decPart % 10;

        let result = "";

        // 整数部分
        if (intPart > 0) {
          result = convertIntPart(intPart, upperDigits, upperUnits) + "元";
        }

        // 小数部分
        if (jiao === 0 && fen === 0) {
          result += "整";
        } else {
          if (intPart > 0 && jiao === 0) {
            result += "零";
          }
          if (jiao > 0) {
            result += upperDigits[jiao] + "角";
          }
          if (fen > 0) {
            result += upperDigits[fen] + "分";
          }
        }

        return result || "零元整";
      }

      // 转换整数部分
      function convertIntPart(num, digits, units) {
        if (num === 0) return digits[0];

        let result = "";
        let numStr = num.toString();
        let len = numStr.length;

        // 按4位分组
        let groups = [];
        while (numStr.length > 0) {
          groups.unshift(numStr.slice(-4));
          numStr = numStr.slice(0, -4);
        }

        for (let i = 0; i < groups.length; i++) {
          const groupResult = convertGroup(parseInt(groups[i]), digits, units);
          const bigUnitIndex = groups.length - 1 - i;

          if (groupResult) {
            // 处理零的情况
            if (result && parseInt(groups[i]) < 1000 && parseInt(groups[i]) > 0) {
              result += "零";
            }
            result += groupResult + bigUnits[bigUnitIndex];
          }
        }

        return result;
      }

      // 转换4位数组
      function convertGroup(num, digits, units) {
        if (num === 0) return "";

        let result = "";
        let hasZero = false;

        const qian = Math.floor(num / 1000);
        const bai = Math.floor((num % 1000) / 100);
        const shi = Math.floor((num % 100) / 10);
        const ge = num % 10;

        if (qian > 0) {
          result += digits[qian] + units[3];
          hasZero = false;
        }

        if (bai > 0) {
          if (hasZero) result += digits[0];
          result += digits[bai] + units[2];
          hasZero = false;
        } else if (qian > 0) {
          hasZero = true;
        }

        if (shi > 0) {
          if (hasZero) result += digits[0];
          result += digits[shi] + units[1];
          hasZero = false;
        } else if (bai > 0) {
          hasZero = true;
        }

        if (ge > 0) {
          if (hasZero) result += digits[0];
          result += digits[ge];
        }

        return result;
      }

      // 转换为简写中文数字
      function toSimpleChinese(num) {
        if (isNaN(num) || num === "") return "请输入有效数字";

        num = parseFloat(num);
        if (num < 0) return "负" + toSimpleChinese(-num);

        const intPart = Math.floor(num);
        const decPart = num - intPart;

        let result = convertIntPart(intPart, lowerDigits, lowerUnits);

        if (decPart > 0) {
          result += "点";
          const decStr = decPart.toFixed(10).substring(2).replace(/0+$/, "");
          for (let i = 0; i < decStr.length; i++) {
            result += lowerDigits[parseInt(decStr[i])];
          }
        }

        return result || "零";
      }

      // 转换为口语数字
      function toOralChinese(num) {
        if (isNaN(num) || num === "") return "请输入有效数字";

        num = parseFloat(num);

        // 特殊处理
        if (num >= 10000 && num < 100000000) {
          const wan = num / 10000;
          if (wan === Math.floor(wan)) {
            return toSimpleChinese(wan) + "万";
          }
        }

        if (num >= 100000000) {
          const yi = num / 100000000;
          if (yi === Math.floor(yi)) {
            return toSimpleChinese(yi) + "亿";
          }
        }

        return toSimpleChinese(num);
      }

      function convert() {
        const input = document.getElementById("numberInput").value.trim();
        const num = input.replace(/,/g, "");

        if (num === "") {
          document.getElementById("moneyResult").textContent = "请输入数字";
          document.getElementById("simpleResult").textContent = "请输入数字";
          document.getElementById("oralResult").textContent = "请输入数字";
          return;
        }

        if (!/^-?\d+\.?\d*$/.test(num)) {
          document.getElementById("moneyResult").textContent = "请输入有效数字";
          document.getElementById("simpleResult").textContent = "请输入有效数字";
          document.getElementById("oralResult").textContent = "请输入有效数字";
          return;
        }

        document.getElementById("moneyResult").textContent = toMoneyUpper(num);
        document.getElementById("simpleResult").textContent = toSimpleChinese(num);
        document.getElementById("oralResult").textContent = toOralChinese(num);
      }

      function copyResult(elementId, btn) {
        const text = document.getElementById(elementId).textContent;
        if (text === "请输入数字" || text === "请输入有效数字") return;

        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = "已复制";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.textContent = "复制";
            btn.classList.remove("copied");
          }, 1500);
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
    
