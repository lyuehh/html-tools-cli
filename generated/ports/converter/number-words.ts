// @ts-nocheck
// Generated from tools/converter/number-words.html
// Source SHA-256: ff652213df8d1f0a4993c64f826c05ac1faf9fef29d9672e8403bf2bd965cb8e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme");
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Load saved theme
      (function () {
        var savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      function showMessage(msg, isError) {
        var messageDiv = document.getElementById("message");
        var p = document.createElement("p");
        p.className = isError ? "error" : "success-msg";
        p.textContent = msg;
        messageDiv.textContent = "";
        messageDiv.appendChild(p);
        setTimeout(function () {
          messageDiv.textContent = "";
        }, 3000);
      }

      window.useExample = function (value) {
        document.getElementById("numberInput").value = value;
        convert();
      };

      window.appendNumber = function (str) {
        var input = document.getElementById("numberInput");
        input.value += str;
        input.focus();
        convert();
      };

      window.clearInput = function () {
        document.getElementById("numberInput").value = "";
        document.getElementById("resultValue").textContent = "请输入金额";
        document.getElementById("resultValue").className = "result-value";
        resetFormats();
      };

      window.backspace = function () {
        var input = document.getElementById("numberInput");
        input.value = input.value.slice(0, -1);
        if (input.value) {
          convert();
        } else {
          clearInput();
        }
      };

      function resetFormats() {
        document.getElementById("formatThousands").textContent = "-";
        document.getElementById("formatAccounting").textContent = "-";
        document.getElementById("formatChineseSmall").textContent = "-";
      }

      window.copyResult = function () {
        var result = document.getElementById("resultValue").textContent;
        if (result === "请输入金额" || result.indexOf("错误") >= 0) {
          showMessage("没有可复制的内容", true);
          return;
        }
        navigator.clipboard
          .writeText(result)
          .then(function () {
            showMessage("已复制到剪贴板", false);
          })
          .catch(function () {
            showMessage("复制失败", true);
          });
      };

      window.copyFormat = function (id) {
        var value = document.getElementById(id).textContent;
        if (value === "-") {
          showMessage("没有可复制的内容", true);
          return;
        }
        navigator.clipboard
          .writeText(value)
          .then(function () {
            showMessage("已复制到剪贴板", false);
          })
          .catch(function () {
            showMessage("复制失败", true);
          });
      };

      // Chinese uppercase number conversion
      var cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
      var cnIntRadice = ["", "拾", "佰", "仟"];
      var cnIntUnits = ["", "万", "亿", "兆"];
      var cnDecUnits = ["角", "分"];
      var cnInteger = "整";
      var cnIntLast = "元";
      var cnNegative = "负";
      var maxNum = 9999999999999.99; // 最大支持万亿级别

      function numberToChinese(num) {
        var addCurrency = document.getElementById("optCurrency").checked;
        var addZheng = document.getElementById("optZheng").checked;
        var addPrefix = document.getElementById("optPrefix").checked;
        var allowNegative = document.getElementById("optNegative").checked;

        // Clean input
        num = num.toString().replace(/,/g, "").replace(/\s/g, "");

        // Check for negative
        var negative = false;
        if (num.charAt(0) === "-") {
          if (!allowNegative) {
            return "错误：不支持负数，请在选项中开启";
          }
          negative = true;
          num = num.substring(1);
        }

        // Validate
        if (!/^[0-9]+\.?[0-9]*$/.test(num)) {
          return "错误：请输入有效的数字";
        }

        var numFloat = parseFloat(num);
        if (isNaN(numFloat)) {
          return "错误：请输入有效的数字";
        }

        if (numFloat > maxNum) {
          return "错误：数字超出最大范围";
        }

        // Handle zero
        if (numFloat === 0) {
          var zeroResult = cnNums[0];
          if (addCurrency) {
            zeroResult += cnIntLast;
            if (addZheng) {
              zeroResult += cnInteger;
            }
          }
          if (addPrefix) {
            zeroResult = "人民币" + zeroResult;
          }
          return zeroResult;
        }

        // Split integer and decimal
        var parts = num.split(".");
        var integerPart = parts[0];
        var decimalPart = parts.length > 1 ? parts[1].substring(0, 2) : "";

        // Pad decimal to 2 digits
        if (decimalPart.length === 1) {
          decimalPart += "0";
        }

        var chineseStr = "";

        // Convert integer part
        if (parseInt(integerPart) > 0) {
          var zeroCount = 0;
          var intLen = integerPart.length;

          for (var i = 0; i < intLen; i++) {
            var n = integerPart.substring(i, i + 1);
            var p = intLen - i - 1;
            var q = Math.floor(p / 4);
            var m = p % 4;

            if (n === "0") {
              zeroCount++;
            } else {
              if (zeroCount > 0) {
                chineseStr += cnNums[0];
              }
              zeroCount = 0;
              chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }

            if (m === 0 && zeroCount < 4) {
              chineseStr += cnIntUnits[q];
            }
          }

          if (addCurrency) {
            chineseStr += cnIntLast;
          }
        }

        // Convert decimal part
        if (decimalPart) {
          var decInt = parseInt(decimalPart);
          if (decInt > 0) {
            var jiao = parseInt(decimalPart.charAt(0));
            var fen = decimalPart.length > 1 ? parseInt(decimalPart.charAt(1)) : 0;

            if (parseInt(integerPart) === 0 && !addCurrency) {
              // Only decimal, no integer
              if (jiao > 0) {
                chineseStr += cnNums[jiao] + cnDecUnits[0];
              }
              if (fen > 0) {
                if (jiao === 0) {
                  chineseStr += cnNums[0];
                }
                chineseStr += cnNums[fen] + cnDecUnits[1];
              }
            } else {
              if (jiao > 0) {
                chineseStr += cnNums[jiao] + cnDecUnits[0];
              } else if (fen > 0) {
                chineseStr += cnNums[0];
              }
              if (fen > 0) {
                chineseStr += cnNums[fen] + cnDecUnits[1];
              }
            }
          } else if (addCurrency && addZheng && parseInt(integerPart) > 0) {
            chineseStr += cnInteger;
          }
        } else if (addCurrency && addZheng && parseInt(integerPart) > 0) {
          chineseStr += cnInteger;
        }

        // Add prefix
        if (addPrefix) {
          chineseStr = "人民币" + chineseStr;
        }

        // Add negative sign
        if (negative) {
          chineseStr = cnNegative + chineseStr;
        }

        return chineseStr;
      }

      // Format functions
      function formatThousands(num) {
        num = parseFloat(num.toString().replace(/,/g, ""));
        if (isNaN(num)) return "-";

        var parts = num.toFixed(2).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }

      function formatAccounting(num) {
        num = parseFloat(num.toString().replace(/,/g, ""));
        if (isNaN(num)) return "-";

        var formatted = formatThousands(Math.abs(num));
        if (num < 0) {
          return "(" + formatted + ")";
        }
        return formatted;
      }

      function formatChineseSmall(num) {
        num = parseFloat(num.toString().replace(/,/g, ""));
        if (isNaN(num)) return "-";

        var smallNums = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        var units = ["", "十", "百", "千", "万", "十", "百", "千", "亿"];

        var negative = num < 0;
        num = Math.abs(num);

        var parts = num.toString().split(".");
        var intPart = parts[0];
        var decPart = parts.length > 1 ? parts[1] : "";

        var result = "";
        var intLen = intPart.length;

        for (var i = 0; i < intLen; i++) {
          var digit = parseInt(intPart.charAt(i));
          var pos = intLen - i - 1;

          if (digit === 0) {
            if (result && result.charAt(result.length - 1) !== smallNums[0]) {
              result += smallNums[0];
            }
          } else {
            result += smallNums[digit];
            if (pos > 0) {
              result += units[pos % 9];
            }
          }

          // Add 万 or 亿
          if (pos === 4 && result.charAt(result.length - 1) !== "万") {
            if (result.charAt(result.length - 1) === smallNums[0]) {
              result = result.slice(0, -1);
            }
            result += "万";
          }
          if (pos === 8 && result.charAt(result.length - 1) !== "亿") {
            if (result.charAt(result.length - 1) === smallNums[0]) {
              result = result.slice(0, -1);
            }
            result += "亿";
          }
        }

        // Remove trailing zero
        if (result.charAt(result.length - 1) === smallNums[0]) {
          result = result.slice(0, -1);
        }

        // Handle decimal
        if (decPart) {
          result += "点";
          for (var j = 0; j < decPart.length; j++) {
            result += smallNums[parseInt(decPart.charAt(j))];
          }
        }

        if (negative) {
          result = "负" + result;
        }

        return result || smallNums[0];
      }

      function convert() {
        var input = document.getElementById("numberInput").value.trim();
        var resultDiv = document.getElementById("resultValue");

        if (!input) {
          resultDiv.textContent = "请输入金额";
          resultDiv.className = "result-value";
          resetFormats();
          return;
        }

        var result = numberToChinese(input);
        resultDiv.textContent = result;

        if (result.indexOf("错误") >= 0) {
          resultDiv.className = "result-value error";
          resetFormats();
        } else {
          resultDiv.className = result.length > 20 ? "result-value small" : "result-value";

          // Update other formats
          var cleanNum = input.replace(/,/g, "");
          document.getElementById("formatThousands").textContent = formatThousands(cleanNum);
          document.getElementById("formatAccounting").textContent = formatAccounting(cleanNum);
          document.getElementById("formatChineseSmall").textContent = formatChineseSmall(cleanNum);
        }
      }

      // Auto-convert on input (debounced)
      var timeout;
      document.getElementById("numberInput").addEventListener("input", function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          convert();
        }, 300);
      });

      // Option change handlers
      var optionCheckboxes = document.querySelectorAll('.option-group input[type="checkbox"]');
      optionCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
          if (document.getElementById("numberInput").value.trim()) {
            convert();
          }
        });
      });

      // Allow only valid number input
      document.getElementById("numberInput").addEventListener("keypress", function (e) {
        var char = String.fromCharCode(e.which);
        var value = this.value;

        // Allow: numbers, decimal point, minus sign
        if (!/[\d.-]/.test(char)) {
          e.preventDefault();
          return;
        }

        // Only one decimal point
        if (char === "." && value.indexOf(".") >= 0) {
          e.preventDefault();
          return;
        }

        // Minus only at start
        if (char === "-" && (value.length > 0 || this.selectionStart > 0)) {
          e.preventDefault();
          return;
        }

        // Max 2 decimal places
        var decimalIndex = value.indexOf(".");
        if (decimalIndex >= 0) {
          var decimals = value.substring(decimalIndex + 1);
          if (decimals.length >= 2 && this.selectionStart > decimalIndex && char !== ".") {
            e.preventDefault();
            return;
          }
        }
      });
    
