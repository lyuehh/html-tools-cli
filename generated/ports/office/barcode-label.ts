// @ts-nocheck
// Generated from tools/office/barcode-label.html
// Source SHA-256: b16300cd26cc29d1e03a4126c752b96146acd517f5c9a86ed4a60a1cda5650cf
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Code128 Encoder (Vanilla JS Implementation)
      // ============================================
      var CODE128 = {
        PATTERNS: [
          "11011001100",
          "11001101100",
          "11001100110",
          "10010011000",
          "10010001100",
          "10001001100",
          "10011001000",
          "10011000100",
          "10001100100",
          "11001001000",
          "11001000100",
          "11000100100",
          "10110011100",
          "10011011100",
          "10011001110",
          "10111001100",
          "10011101100",
          "10011100110",
          "11001110010",
          "11001011100",
          "11001001110",
          "11011100100",
          "11001110100",
          "11101101110",
          "11101001100",
          "11100101100",
          "11100100110",
          "11101100100",
          "11100110100",
          "11100110010",
          "11011011000",
          "11011000110",
          "11000110110",
          "10100011000",
          "10001011000",
          "10001000110",
          "10110001000",
          "10001101000",
          "10001100010",
          "11010001000",
          "11000101000",
          "11000100010",
          "10110111000",
          "10110001110",
          "10001101110",
          "10111011000",
          "10111000110",
          "10001110110",
          "11101110110",
          "11010001110",
          "11000101110",
          "11011101000",
          "11011100010",
          "11011101110",
          "11101011000",
          "11101000110",
          "11100010110",
          "11101101000",
          "11101100010",
          "11100011010",
          "11101111010",
          "11001000010",
          "11110001010",
          "10100110000",
          "10100001100",
          "10010110000",
          "10010000110",
          "10000101100",
          "10000100110",
          "10110010000",
          "10110000100",
          "10011010000",
          "10011000010",
          "10000110100",
          "10000110010",
          "11000010010",
          "11001010000",
          "11110111010",
          "11000010100",
          "10001111010",
          "10100111100",
          "10010111100",
          "10010011110",
          "10111100100",
          "10011110100",
          "10011110010",
          "11110100100",
          "11110010100",
          "11110010010",
          "11011011110",
          "11011110110",
          "11110110110",
          "10101111000",
          "10100011110",
          "10001011110",
          "10111101000",
          "10111100010",
          "11110101000",
          "11110100010",
          "10111011110",
          "10111101110",
          "11101011110",
          "11110101110",
          "11010000100",
          "11010010000",
          "11010011100"
        ],
        START_B: 104,
        STOP: 106,

        encode: function (text) {
          var codes = [];
          var checksum = this.START_B;

          // Add start code B
          codes.push(this.PATTERNS[this.START_B]);

          // Encode each character
          for (var i = 0; i < text.length; i++) {
            var charCode = text.charCodeAt(i) - 32;
            if (charCode < 0 || charCode > 95) {
              charCode = 0; // Replace invalid chars with space
            }
            codes.push(this.PATTERNS[charCode]);
            checksum += charCode * (i + 1);
          }

          // Add checksum
          checksum = checksum % 103;
          codes.push(this.PATTERNS[checksum]);

          // Add stop code
          codes.push(this.PATTERNS[this.STOP]);

          return codes.join("");
        }
      };

      // ============================================
      // Elements
      // ============================================
      var barcodeText = document.getElementById("barcodeText");
      var barcodeWidth = document.getElementById("barcodeWidth");
      var barcodeHeight = document.getElementById("barcodeHeight");
      var showText = document.getElementById("showText");
      var canvas = document.getElementById("barcodeCanvas");
      var textDisplay = document.getElementById("barcodeTextDisplay");
      var infoText = document.getElementById("infoText");
      var ctx = canvas.getContext("2d");

      // ============================================
      // Generate Barcode
      // ============================================
      function generateBarcode() {
        var text = barcodeText.value.trim();
        if (!text) {
          infoText.textContent = "请输入条形码内容";
          return;
        }

        var width = parseInt(barcodeWidth.value) || 300;
        var height = parseInt(barcodeHeight.value) || 100;

        // Encode the text
        var encoded = CODE128.encode(text);
        var barWidth = width / encoded.length;

        // Setup canvas
        canvas.width = width;
        canvas.height = height;

        // Clear canvas
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);

        // Draw barcode
        ctx.fillStyle = "black";
        for (var i = 0; i < encoded.length; i++) {
          if (encoded[i] === "1") {
            ctx.fillRect(i * barWidth, 0, barWidth, height);
          }
        }

        // Show/hide text
        if (showText.checked) {
          textDisplay.textContent = text;
          textDisplay.style.display = "block";
        } else {
          textDisplay.style.display = "none";
        }

        infoText.textContent = "Code128 编码 · " + width + " × " + height + " px";
        saveState();
      }

      // ============================================
      // Download Barcode
      // ============================================
      function downloadBarcode() {
        // Create a combined canvas with text if needed
        var combinedCanvas = document.createElement("canvas");
        var combinedCtx = combinedCanvas.getContext("2d");
        var textHeight = showText.checked ? 30 : 0;

        combinedCanvas.width = canvas.width;
        combinedCanvas.height = canvas.height + textHeight;

        // Fill white background
        combinedCtx.fillStyle = "white";
        combinedCtx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

        // Draw barcode
        combinedCtx.drawImage(canvas, 0, 0);

        // Draw text if needed
        if (showText.checked && barcodeText.value.trim()) {
          combinedCtx.fillStyle = "black";
          combinedCtx.font = "16px JetBrains Mono, monospace";
          combinedCtx.textAlign = "center";
          combinedCtx.fillText(
            barcodeText.value.trim(),
            combinedCanvas.width / 2,
            canvas.height + 22
          );
        }

        var link = document.createElement("a");
        link.download = "barcode.png";
        link.href = combinedCanvas.toDataURL("image/png");
        link.click();
      }

      // ============================================
      // Print Barcode
      // ============================================
      function printBarcode() {
        window.print();
      }

      // ============================================
      // Clear All
      // ============================================
      function clearAll() {
        barcodeText.value = "";
        barcodeWidth.value = "300";
        barcodeHeight.value = "100";
        showText.checked = true;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        textDisplay.textContent = "";
        infoText.textContent = "";
        saveState();
      }

      // ============================================
      // State Persistence
      // ============================================
      function saveState() {
        var state = {
          text: barcodeText.value,
          width: barcodeWidth.value,
          height: barcodeHeight.value,
          showText: showText.checked
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
            if (state.text) barcodeText.value = state.text;
            if (state.width) barcodeWidth.value = state.width;
            if (state.height) barcodeHeight.value = state.height;
            if (typeof state.showText === "boolean") showText.checked = state.showText;
            if (state.text) generateBarcode();
          } catch (e) {
            console.error("加载状态失败:", e);
          }
        }
      }

      // ============================================
      // Auto-generate on Input Change
      // ============================================
      var generateTimeout;
      barcodeText.addEventListener("input", function () {
        clearTimeout(generateTimeout);
        generateTimeout = setTimeout(function () {
          if (barcodeText.value.trim()) {
            generateBarcode();
          }
        }, 300);
      });

      [barcodeWidth, barcodeHeight].forEach(function (el) {
        el.addEventListener("change", function () {
          if (barcodeText.value.trim()) {
            generateBarcode();
          }
        });
      });

      showText.addEventListener("change", function () {
        if (barcodeText.value.trim()) {
          generateBarcode();
        }
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
    
