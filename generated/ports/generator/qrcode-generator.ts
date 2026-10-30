// @ts-nocheck
// Generated from tools/generator/qrcode-generator.html
// Source SHA-256: 9d700b80dadebd605e1aabe210179a04533c17e450a40ee60c01d8be4302784c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        var QRCodeCtor = window.QRCode;
        window.QRCode = {
          toCanvas: function (canvas, text, options, callback) {
            try {
              var temp = document.createElement("div");
              new QRCodeCtor(temp, {
                text: text,
                width: options.width,
                height: options.width,
                colorDark: options.color.dark,
                colorLight: options.color.light,
                correctLevel: QRCodeCtor.CorrectLevel.M
              });
              var generated = temp.querySelector("canvas");
              canvas.width = options.width;
              canvas.height = options.width;
              canvas.getContext("2d").drawImage(generated, 0, 0, options.width, options.width);
              if (callback) callback(null);
              return Promise.resolve(canvas);
            } catch (error) {
              if (callback) callback(error);
              return Promise.reject(error);
            }
          }
        };
      })();
    
;

      // ============================================
      // Elements
      // ============================================
      var textInput = document.getElementById("textInput");
      var qrSize = document.getElementById("qrSize");
      var fgColor = document.getElementById("fgColor");
      var bgColor = document.getElementById("bgColor");
      var canvas = document.getElementById("qrCanvas");
      var qrInfo = document.getElementById("qrInfo");

      // ============================================
      // Generate QR Code
      // ============================================
      function generateQR() {
        var text = textInput.value.trim();
        if (!text) {
          qrInfo.textContent = "请输入内容";
          return;
        }

        var size = parseInt(qrSize.value) || 256;
        canvas.width = size;
        canvas.height = size;

        QRCode.toCanvas(
          canvas,
          text,
          {
            width: size,
            margin: 2,
            color: {
              dark: fgColor.value,
              light: bgColor.value
            }
          },
          function (error) {
            if (error) {
              qrInfo.textContent = "生成失败: " + error.message;
            } else {
              qrInfo.textContent = "大小: " + size + " x " + size + " px";
              saveState();
            }
          }
        );
      }

      // ============================================
      // Download QR Code
      // ============================================
      window.downloadQR = function () {
        var link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      // ============================================
      // Copy QR Code to Clipboard
      // ============================================
      window.copyQR = async function () {
        try {
          var blob = await new Promise(function (resolve) {
            canvas.toBlob(resolve, "image/png");
          });
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          qrInfo.textContent = "已复制到剪贴板";
        } catch (e) {
          qrInfo.textContent = "复制失败: " + e.message;
        }
      };

      // ============================================
      // Clear Input
      // ============================================
      window.clearInput = function () {
        textInput.value = "";
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        qrInfo.textContent = "";
        saveState();
      };

      // ============================================
      // State Persistence
      // ============================================
      function saveState() {
        var state = {
          text: textInput.value,
          size: qrSize.value,
          fg: fgColor.value,
          bg: bgColor.value
        };
        try {
          var hash = btoa(encodeURIComponent(JSON.stringify(state)));
          history.replaceState(null, "", "#" + hash);
        } catch (e) {
          console.error("保存状态失败:", e);
        }
      }

      function loadState() {
        var hash = window.location.hash.slice(1);
        if (hash) {
          try {
            var state = JSON.parse(decodeURIComponent(atob(hash)));
            if (state.text) textInput.value = state.text;
            if (state.size) qrSize.value = state.size;
            if (state.fg) fgColor.value = state.fg;
            if (state.bg) bgColor.value = state.bg;
            if (state.text) generateQR();
          } catch (e) {
            console.error("加载状态失败:", e);
          }
        }
      }

      // ============================================
      // Auto-generate on Input Change
      // ============================================
      var generateTimeout;
      textInput.addEventListener("input", function () {
        clearTimeout(generateTimeout);
        generateTimeout = setTimeout(function () {
          if (textInput.value.trim()) {
            generateQR();
          }
        }, 300);
      });

      // Re-generate on Settings Change
      [qrSize, fgColor, bgColor].forEach(function (el) {
        el.addEventListener("change", function () {
          if (textInput.value.trim()) {
            generateQR();
          }
        });
      });

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Initialize
      // ============================================
      initTheme();
      loadState();
    
