// @ts-nocheck
// Generated from tools/generator/qrcode-batch.html
// Source SHA-256: 86e394a0e6c56293e490ac6b5d93a29238eb6ae2a87d60b4e9e79b8ffd29ce2b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        var QRCodeCtor = window.QRCode;
        window.QRCode = {
          toCanvas: function (canvas, text, options) {
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
              return Promise.resolve(canvas);
            } catch (error) {
              return Promise.reject(error);
            }
          }
        };
      })();
    
;

      let qrCodes = [];

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

      window.syncColorInput = function (type) {
        const colorPicker = document.getElementById(type + "Color");
        const colorText = document.getElementById(type + "ColorText");
        colorText.value = colorPicker.value;
      };

      window.syncColorPicker = function (type) {
        const colorPicker = document.getElementById(type + "Color");
        const colorText = document.getElementById(type + "ColorText");
        if (/^#[0-9A-Fa-f]{6}$/.test(colorText.value)) {
          colorPicker.value = colorText.value;
        }
      };

      function getOptions() {
        return {
          width: parseInt(document.getElementById("qrSize").value),
          margin: parseInt(document.getElementById("margin").value),
          errorCorrectionLevel: document.getElementById("errorLevel").value,
          color: {
            dark: document.getElementById("darkColorText").value,
            light: document.getElementById("lightColorText").value
          }
        };
      }

      window.generateAll = async function () {
        const input = document.getElementById("batchInput").value;
        const lines = input
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l);

        if (lines.length === 0) {
          showToast("请输入内容");
          return;
        }

        if (lines.length > 100) {
          showToast("最多支持100个二维码");
          return;
        }

        qrCodes = [];
        const grid = document.getElementById("qrGrid");
        grid.innerHTML = "";

        const options = getOptions();

        for (let i = 0; i < lines.length; i++) {
          const text = lines[i];
          const item = document.createElement("div");
          item.className = "qr-item";

          const canvas = document.createElement("canvas");

          try {
            await QRCode.toCanvas(canvas, text, options);
            qrCodes.push({ text, canvas, index: i });

            item.innerHTML = `
                        <div class="qr-canvas"></div>
                        <div class="qr-text" title="${escapeHtml(text)}">${escapeHtml(text.substring(0, 50))}${text.length > 50 ? "..." : ""}</div>
                        <div class="qr-actions">
                            <button onclick="downloadSingle(${i})" aria-label="下载">下载</button>
                            <button onclick="copySingle(${i})" aria-label="复制">复制</button>
                        </div>
                    `;
            item.querySelector(".qr-canvas").appendChild(canvas);
          } catch (err) {
            item.innerHTML = `
                        <div style="padding:20px;color:var(--secondary-color);">生成失败</div>
                        <div class="qr-text">${escapeHtml(text.substring(0, 30))}</div>
                    `;
          }

          grid.appendChild(item);
        }

        document.getElementById("stats").style.display = "flex";
        document.getElementById("totalCount").textContent = qrCodes.length;
        document.getElementById("downloadAllBtn").disabled = qrCodes.length === 0;

        showToast(`已生成 ${qrCodes.length} 个二维码`);
      };

      window.downloadSingle = function (index) {
        const qr = qrCodes[index];
        if (!qr) return;

        const link = document.createElement("a");
        link.download = `qrcode-${index + 1}.png`;
        link.href = qr.canvas.toDataURL("image/png");
        link.click();
        showToast("已下载");
      };

      window.copySingle = async function (index) {
        const qr = qrCodes[index];
        if (!qr) return;

        try {
          const blob = await new Promise((resolve) => qr.canvas.toBlob(resolve, "image/png"));
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          showToast("已复制到剪贴板");
        } catch (err) {
          showToast("复制失败");
        }
      };

      window.downloadAll = async function () {
        if (qrCodes.length === 0) return;

        const zip = new JSZip();

        for (let i = 0; i < qrCodes.length; i++) {
          const qr = qrCodes[i];
          const dataUrl = qr.canvas.toDataURL("image/png");
          const base64 = dataUrl.split(",")[1];

          // Create safe filename
          let filename = qr.text
            .substring(0, 30)
            .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "_")
            .replace(/_+/g, "_");
          if (!filename) filename = "qrcode";

          zip.file(`${String(i + 1).padStart(3, "0")}_${filename}.png`, base64, { base64: true });
        }

        const content = await zip.generateAsync({ type: "blob" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = `qrcodes-${Date.now()}.zip`;
        link.click();
        URL.revokeObjectURL(link.href);

        showToast("ZIP 文件已下载");
      };

      window.clearInput = function () {
        document.getElementById("batchInput").value = "";
        document.getElementById("qrGrid").innerHTML = `
                <div class="empty-state">
                    <div class="icon">📱</div>
                    <p>输入内容后点击"批量生成"</p>
                </div>
            `;
        document.getElementById("stats").style.display = "none";
        qrCodes = [];
      };

      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      function showToast(message) {
        const toast = document.getElementById("toast");
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }
    
