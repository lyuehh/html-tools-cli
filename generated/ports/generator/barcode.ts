// @ts-nocheck
// Generated from tools/generator/barcode.html
// Source SHA-256: 5224c19366cca04dd5cf51a4f9d8fd7dfdb60c7b7119c3a3c16bdfb1dd78b1ae
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var contentEl = document.getElementById("content");
      var formatEl = document.getElementById("format");
      var widthEl = document.getElementById("width");
      var heightEl = document.getElementById("height");
      var displayValueEl = document.getElementById("displayValue");
      var textPositionEl = document.getElementById("textPosition");
      var fontSizeEl = document.getElementById("fontSize");
      var statusEl = document.getElementById("status");
      var formatInfoEl = document.getElementById("formatInfo");

      var formatDescriptions = {
        CODE128: {
          name: "Code 128",
          desc: "最通用的条形码格式，支持所有 ASCII 字符（0-127）。适用于产品标识、物流跟踪等场景。"
        },
        CODE128A: {
          name: "Code 128 A",
          desc: "支持大写字母、数字和控制字符。适用于需要控制字符的场景。"
        },
        CODE128B: { name: "Code 128 B", desc: "支持大小写字母和数字。最常用的 Code 128 子集。" },
        CODE128C: {
          name: "Code 128 C",
          desc: "仅支持数字（成对编码），编码效率最高。适用于纯数字序列号。"
        },
        EAN13: {
          name: "EAN-13",
          desc: "13位商品条码，国际通用。前3位为国家代码，接着是厂商代码和商品代码，最后1位为校验码。"
        },
        EAN8: { name: "EAN-8", desc: "8位商品条码，用于小包装商品。比 EAN-13 更紧凑。" },
        UPC: { name: "UPC", desc: "12位条码，主要在北美使用。是 EAN-13 的子集。" },
        CODE39: {
          name: "Code 39",
          desc: "支持大写字母、数字和少量特殊字符。无需校验位，广泛用于工业和政府部门。"
        },
        ITF14: { name: "ITF-14", desc: "14位交叉25码，用于物流外包装。必须是14位数字。" },
        MSI: { name: "MSI", desc: "主要用于超市货架标签和库存管理。仅支持数字。" },
        pharmacode: { name: "Pharmacode", desc: "用于制药行业的条码。数值范围 3-131070。" }
      };

      window.generate = function () {
        var content = contentEl.value.trim();
        if (!content) {
          showStatus("请输入内容", "error");
          return;
        }

        var format = formatEl.value;
        var options = {
          format: format,
          width: parseInt(widthEl.value),
          height: parseInt(heightEl.value),
          displayValue: displayValueEl.value === "true",
          textPosition: textPositionEl.value,
          fontSize: parseInt(fontSizeEl.value),
          margin: 10,
          background: "#ffffff",
          lineColor: "#000000"
        };

        try {
          JsBarcode("#barcode", content, options);
          showStatus("生成成功", "success");
        } catch (e) {
          showStatus("生成失败: " + e.message, "error");
        }
      };

      function updateFormatInfo() {
        var format = formatEl.value;
        var info = formatDescriptions[format];
        if (info) {
          var h4 = formatInfoEl.querySelector("h4");
          var p = formatInfoEl.querySelector("p");
          h4.textContent = info.name;
          p.textContent = info.desc;
        }
      }

      window.downloadSVG = function () {
        var svg = document.getElementById("barcode");
        var svgData = new XMLSerializer().serializeToString(svg);
        var blob = new Blob([svgData], { type: "image/svg+xml" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.download = "barcode.svg";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        showStatus("SVG 已下载", "success");
      };

      window.downloadPNG = function () {
        var svg = document.getElementById("barcode");
        var svgData = new XMLSerializer().serializeToString(svg);
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var img = new Image();

        img.onload = function () {
          canvas.width = img.width * 2;
          canvas.height = img.height * 2;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          var link = document.createElement("a");
          link.download = "barcode.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
          showStatus("PNG 已下载", "success");
        };

        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
      };

      async function copySVG() {
        var svg = document.getElementById("barcode");
        var svgData = new XMLSerializer().serializeToString(svg);
        try {
          await navigator.clipboard.writeText(svgData);
          showStatus("SVG 代码已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      formatEl.addEventListener("change", function () {
        updateFormatInfo();
        generate();
      });

      contentEl.addEventListener("input", generate);
      widthEl.addEventListener("change", generate);
      heightEl.addEventListener("change", generate);
      displayValueEl.addEventListener("change", generate);
      textPositionEl.addEventListener("change", generate);
      fontSizeEl.addEventListener("change", generate);

      document.getElementById("btnGenerate").addEventListener("click", generate);
      document.getElementById("btnDownloadSVG").addEventListener("click", downloadSVG);
      document.getElementById("btnDownloadPNG").addEventListener("click", downloadPNG);
      document.getElementById("btnCopy").addEventListener("click", copySVG);

      // Initialize
      generate();

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
    
