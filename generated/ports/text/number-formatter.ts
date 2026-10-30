// @ts-nocheck
// Generated from tools/text/number-formatter.html
// Source SHA-256: b6cd2db69865ae240a6a3d045d1eecace24580404d55e3baf2e39d5435110110
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Initialize theme
      (function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      window.setNumber = function (num) {
        document.getElementById("numberInput").value = num;
        formatAll();
      };

      function getNumber() {
        const input = document.getElementById("numberInput").value;
        // Remove thousand separators and convert to number
        const cleaned = input.replace(/[,\s]/g, "").replace(/，/g, "");
        return parseFloat(cleaned);
      }

      function formatAll() {
        const num = getNumber();
        const locale = document.getElementById("locale").value;
        const currency = document.getElementById("currency").value;
        const decimals = parseInt(document.getElementById("decimals").value) || 2;

        if (isNaN(num)) {
          document.getElementById("formatCards").innerHTML =
            '<p style="text-align:center;opacity:0.6;">请输入有效的数字</p>';
          document.getElementById("conversionGrid").innerHTML = "";
          return;
        }

        const formats = [
          {
            name: "千分位格式",
            icon: "🔢",
            value: num.toLocaleString(locale, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals
            }),
            desc: "带千分位分隔符"
          },
          {
            name: "货币格式",
            icon: "💰",
            value: num.toLocaleString(locale, { style: "currency", currency: currency }),
            desc: `${currency} 货币格式`
          },
          {
            name: "百分比",
            icon: "📊",
            value:
              (num * 100).toLocaleString(locale, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
              }) + "%",
            desc: "数字乘以100后显示"
          },
          {
            name: "科学计数法",
            icon: "🔬",
            value: num.toExponential(decimals),
            desc: "指数表示法"
          },
          {
            name: "紧凑格式",
            icon: "📉",
            value: formatCompact(num, locale),
            desc: "如 1.2K, 1.5M"
          },
          {
            name: "中文大写",
            icon: "中",
            value: numberToChinese(num),
            desc: "中文数字大写"
          },
          {
            name: "固定小数",
            icon: "🎯",
            value: num.toFixed(decimals),
            desc: `固定 ${decimals} 位小数`
          },
          {
            name: "无格式",
            icon: "📝",
            value: String(num),
            desc: "原始数字字符串"
          }
        ];

        renderFormatCards(formats);
        renderConversions(num);
      }

      function formatCompact(num, locale) {
        try {
          return new Intl.NumberFormat(locale, {
            notation: "compact",
            compactDisplay: "short"
          }).format(num);
        } catch (e) {
          // Fallback for older browsers
          const absNum = Math.abs(num);
          if (absNum >= 1e12) return (num / 1e12).toFixed(1) + "T";
          if (absNum >= 1e9) return (num / 1e9).toFixed(1) + "B";
          if (absNum >= 1e6) return (num / 1e6).toFixed(1) + "M";
          if (absNum >= 1e3) return (num / 1e3).toFixed(1) + "K";
          return String(num);
        }
      }

      function numberToChinese(num) {
        if (isNaN(num)) return "无效数字";

        const digits = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
        const units = ["", "拾", "佰", "仟"];
        const bigUnits = ["", "万", "亿", "兆"];

        if (num === 0) return "零";

        let negative = num < 0;
        num = Math.abs(num);

        // Handle decimal part
        let intPart = Math.floor(num);
        let decPart = num - intPart;

        // Convert integer part
        if (intPart === 0) {
          result = "零";
        } else {
          result = "";
          let groupIndex = 0;

          while (intPart > 0) {
            let group = intPart % 10000;
            let groupStr = "";
            let zeroFlag = false;

            for (let i = 0; i < 4 && group > 0; i++) {
              let digit = group % 10;
              group = Math.floor(group / 10);

              if (digit === 0) {
                zeroFlag = true;
              } else {
                if (zeroFlag) {
                  groupStr = "零" + groupStr;
                  zeroFlag = false;
                }
                groupStr = digits[digit] + units[i] + groupStr;
              }
            }

            if (groupStr) {
              result = groupStr + bigUnits[groupIndex] + result;
            }

            intPart = Math.floor(intPart / 10000);
            groupIndex++;
          }
        }

        // Handle decimal part
        if (decPart > 0) {
          result += "点";
          let decStr = decPart.toFixed(10).substring(2).replace(/0+$/, "");
          for (let char of decStr) {
            result += digits[parseInt(char)];
          }
        }

        return (negative ? "负" : "") + result;
      }

      function renderFormatCards(formats) {
        const container = document.getElementById("formatCards");
        container.innerHTML = formats
          .map(
            (format) => `
                <div class="format-card" onclick="copyValue('${escapeHtml(format.value)}')">
                    <div class="format-header">
                        <span class="format-name">
                            <span class="format-icon">${format.icon}</span>
                            ${format.name}
                        </span>
                        <button class="copy-btn" onclick="event.stopPropagation(); copyValue('${escapeHtml(format.value)}')" aria-label="复制">复制</button>
                    </div>
                    <div class="format-value">${escapeHtml(format.value)}</div>
                    <div class="format-desc">${format.desc}</div>
                </div>
            `
          )
          .join("");
      }

      function renderConversions(num) {
        const container = document.getElementById("conversionGrid");

        // Only show base conversions for integers
        const intNum = Math.floor(Math.abs(num));

        if (intNum > Number.MAX_SAFE_INTEGER) {
          container.innerHTML =
            '<p style="grid-column:1/-1;text-align:center;opacity:0.6;">数字过大，无法进行进制转换</p>';
          return;
        }

        const conversions = [
          { label: "二进制", value: intNum.toString(2) },
          { label: "八进制", value: intNum.toString(8) },
          { label: "十进制", value: intNum.toString(10) },
          { label: "十六进制", value: intNum.toString(16).toUpperCase() },
          { label: "三十六进制", value: intNum.toString(36).toUpperCase() }
        ];

        container.innerHTML = conversions
          .map(
            (conv) => `
                <div class="conversion-item" onclick="copyValue('${conv.value}')" style="cursor:pointer;" title="点击复制">
                    <div class="conversion-label">${conv.label}</div>
                    <div class="conversion-value">${conv.value}</div>
                </div>
            `
          )
          .join("");
      }

      window.escapeHtml = function (str) {
        return String(str)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");
      };

      window.copyValue = function (value) {
        navigator.clipboard.writeText(value).then(() => {
          showToast("已复制: " + value);
        });
      };

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Initialize
      formatAll();
    
