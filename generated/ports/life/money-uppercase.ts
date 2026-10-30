// @ts-nocheck
// Generated from tools/life/money-uppercase.html
// Source SHA-256: 125cf598a88368840c974e1414ffa16c69a160188b5a3dc1ed014584837edaa2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 数字大写映射
      const DIGITS = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
      const UNITS = ["", "拾", "佰", "仟"];
      const BIG_UNITS = ["", "万", "亿", "兆"];

      // 是否添加"人民币"前缀
      let withPrefix = false;

      /**
       * 将数字金额转换为大写
       * @param {number|string} amount - 金额
       * @returns {string} 大写金额
       */
      function convertToUppercase(amount) {
        // 验证输入
        if (amount === "" || amount === null || amount === undefined) {
          return "请输入金额";
        }

        // 移除千分位逗号
        const cleanAmount = String(amount).replace(/,/g, "");

        // 验证是否为有效数字
        if (!/^-?\d+(\.\d{1,2})?$/.test(cleanAmount)) {
          return "请输入有效的金额（最多两位小数）";
        }

        const num = parseFloat(cleanAmount);

        // 检查范围
        if (num < 0) {
          return "不支持负数金额";
        }
        if (num > 9999999999999.99) {
          return "金额超出范围（最大支持万亿级）";
        }
        if (num === 0) {
          return (withPrefix ? "人民币" : "") + "零元整";
        }

        // 分离整数和小数部分
        const [intPart, decPart = ""] = cleanAmount.split(".");
        const intNum = parseInt(intPart, 10);

        let result = "";

        // 处理整数部分
        if (intNum > 0) {
          result = convertIntegerPart(intNum) + "元";
        }

        // 处理小数部分
        const jiao = decPart.length > 0 ? parseInt(decPart[0], 10) : 0;
        const fen = decPart.length > 1 ? parseInt(decPart[1], 10) : 0;

        if (jiao === 0 && fen === 0) {
          result += "整";
        } else {
          if (intNum === 0) {
            // 没有整数部分时的处理
          }
          if (jiao > 0) {
            result += DIGITS[jiao] + "角";
          } else if (intNum > 0 && fen > 0) {
            result += "零";
          }
          if (fen > 0) {
            result += DIGITS[fen] + "分";
          } else if (jiao > 0) {
            result += "整";
          }
        }

        return (withPrefix ? "人民币" : "") + result;
      }

      /**
       * 转换整数部分
       * @param {number} num - 整数
       * @returns {string} 大写
       */
      function convertIntegerPart(num) {
        if (num === 0) return "";

        const str = String(num);
        const len = str.length;
        let result = "";
        let zeroFlag = false; // 是否需要补零

        // 按4位一组处理（个、万、亿、兆）
        const groups = [];
        for (let i = len; i > 0; i -= 4) {
          const start = Math.max(0, i - 4);
          groups.unshift(str.substring(start, i));
        }

        for (let i = 0; i < groups.length; i++) {
          const group = groups[i];
          const groupNum = parseInt(group, 10);
          const bigUnitIndex = groups.length - 1 - i;

          if (groupNum === 0) {
            // 整组为0，不输出单位，但可能需要补零
            if (i < groups.length - 1 && parseInt(groups[i + 1], 10) > 0) {
              zeroFlag = true;
            }
            continue;
          }

          // 处理组内的零
          if (zeroFlag && result !== "") {
            result += "零";
            zeroFlag = false;
          }

          // 转换4位数组
          const groupResult = convertFourDigits(group);
          result += groupResult + BIG_UNITS[bigUnitIndex];

          // 检查是否需要在下一组前补零
          if (group.length < 4 && i < groups.length - 1) {
            const leadingZeros = 4 - group.length;
            if (leadingZeros > 0 && parseInt(groups[i + 1], 10) > 0) {
              // 下一组有值，但当前组不满4位，可能需要补零
            }
          }
        }

        return result;
      }

      /**
       * 转换4位数字
       * @param {string} str - 4位数字字符串
       * @returns {string} 大写
       */
      function convertFourDigits(str) {
        // 补齐到4位
        str = str.padStart(4, "0");
        let result = "";
        let zeroFlag = false;

        for (let i = 0; i < 4; i++) {
          const digit = parseInt(str[i], 10);
          const unitIndex = 3 - i;

          if (digit === 0) {
            if (result !== "" && !zeroFlag) {
              zeroFlag = true;
            }
          } else {
            if (zeroFlag) {
              result += "零";
              zeroFlag = false;
            }
            result += DIGITS[digit] + UNITS[unitIndex];
          }
        }

        return result;
      }

      // 转换并显示结果
      window.convert = function () {
        const input = document.getElementById("amountInput").value.trim();
        const resultEl = document.getElementById("result");

        const result = convertToUppercase(input);
        resultEl.textContent = result;

        // 判断是否为错误信息
        if (result.includes("请输入") || result.includes("不支持") || result.includes("超出")) {
          resultEl.classList.add("error");
        } else {
          resultEl.classList.remove("error");
        }
      };

      // 复制结果
      window.copyResult = function () {
        const result = document.getElementById("result").textContent;
        if (result.includes("请输入") || result.includes("不支持") || result.includes("超出")) {
          return;
        }

        navigator.clipboard.writeText(result).then(() => {
          showToast();
        });
      };

      // 清空输入
      window.clearInput = function () {
        document.getElementById("amountInput").value = "";
        document.getElementById("result").textContent = "请输入金额";
        document.getElementById("result").classList.remove("error");
      };

      // 添加/移除前缀
      window.addPrefix = function () {
        withPrefix = !withPrefix;
        const btn = document.querySelector(".btn-group .btn-secondary:last-child");
        btn.textContent = withPrefix ? "✓ 已添加前缀" : "📝 添加前缀";
        convert();
      };

      // 设置示例
      window.setExample = function (value) {
        document.getElementById("amountInput").value = value;
        convert();
      };

      // 显示提示
      function showToast() {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => {
          toast.classList.remove("show");
        }, 2000);
      }

      // 主题切换
      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };

      // 初始化主题
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      // 支持回车键
      document.getElementById("amountInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          copyResult();
        }
      });
    
