// @ts-nocheck
// Generated from tools/generator/barcode-generator.html
// Source SHA-256: 692742652fe5fdf05c409e14e8cdf03fd5aec9e862033bd0c1a9e70704b475af
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function generate() {
        const text = document.getElementById("text").value;
        const format = document.getElementById("format").value;
        const width = parseInt(document.getElementById("width").value);
        const height = parseInt(document.getElementById("height").value);
        const displayValue = document.getElementById("displayValue").value === "true";
        try {
          JsBarcode("#barcode", text, {
            format: format,
            width: width,
            height: height,
            displayValue: displayValue,
            fontSize: 16,
            margin: 10,
            background: "#ffffff",
            lineColor: "#000000"
          });
        } catch (e) {
          document.getElementById("barcode").innerHTML =
            `<text x="50%" y="50%" text-anchor="middle" fill="#e74c3c">格式不支持此内容</text>`;
        }
      }
      function downloadSVG() {
        const svg = document.getElementById("barcode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "barcode.svg";
        a.click();
        URL.revokeObjectURL(url);
      }
      function downloadPNG() {
        const svg = document.getElementById("barcode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = function () {
          canvas.width = img.width * 2;
          canvas.height = img.height * 2;
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const a = document.createElement("a");
          a.href = canvas.toDataURL("image/png");
          a.download = "barcode.png";
          a.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
      }
      document.getElementById("text").addEventListener("input", generate);
      document.getElementById("format").addEventListener("change", generate);
      document.getElementById("width").addEventListener("change", generate);
      document.getElementById("height").addEventListener("input", generate);
      document.getElementById("displayValue").addEventListener("change", generate);
      generate();
    
