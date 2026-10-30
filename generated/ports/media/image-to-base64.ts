// @ts-nocheck
// Generated from tools/media/image-to-base64.html
// Source SHA-256: 5c44e15b640c2d4d54c631f264757823693bda79a69917b6ba366e72ddcd612e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentBase64 = "";
      let currentDataUrl = "";
      let outputFormat = "dataurl";

      const dropZone = document.querySelector(".drop-zone");
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "var(--accent-cyan)";
      });
      dropZone.addEventListener("dragleave", () => (dropZone.style.borderColor = ""));
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "";
        encodeImage(e.dataTransfer.files[0]);
      });

      window.switchTab = function (tab) {
        document
          .querySelectorAll(".tab")
          .forEach((t, i) =>
            t.classList.toggle(
              "active",
              (i === 0 && tab === "encode") || (i === 1 && tab === "decode")
            )
          );
        document.getElementById("encodeTab").classList.toggle("hidden", tab !== "encode");
        document.getElementById("decodeTab").classList.toggle("hidden", tab !== "decode");
      };

      function encodeImage(file) {
        if (!file || !file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          currentDataUrl = e.target.result;
          currentBase64 = currentDataUrl.split(",")[1];

          document.getElementById("previewImg").src = currentDataUrl;
          document.getElementById("encodePreview").classList.remove("hidden");
          document.getElementById("encodeResult").classList.remove("hidden");

          const img = new Image();
          img.onload = () => {
            document.getElementById("imageInfo").textContent =
              `${img.width} × ${img.height} | ${file.type} | ${(file.size / 1024).toFixed(1)} KB`;
          };
          img.src = currentDataUrl;

          updateOutput();
        };
        reader.readAsDataURL(file);
      }

      window.setFormat = function (format) {
        outputFormat = format;
        document.querySelectorAll(".option-btn").forEach((btn) => btn.classList.remove("active"));
        event.target.classList.add("active");
        updateOutput();
      };

      function updateOutput() {
        let output;
        switch (outputFormat) {
          case "dataurl":
            output = currentDataUrl;
            break;
          case "base64":
            output = currentBase64;
            break;
          case "html":
            output = `<img src="${currentDataUrl}" alt="image">`;
            break;
          case "css":
            output = `background-image: url(${currentDataUrl});`;
            break;
        }
        document.getElementById("encodeOutput").value = output;
        document.getElementById("outputInfo").textContent =
          `长度: ${output.length.toLocaleString()} 字符`;
      }

      window.copyOutput = function () {
        const output = document.getElementById("encodeOutput").value;
        navigator.clipboard.writeText(output);
        document.getElementById("toast").classList.add("show");
        setTimeout(() => document.getElementById("toast").classList.remove("show"), 2000);
      };

      window.decodeBase64 = function () {
        const input = document.getElementById("base64Input").value.trim();
        if (!input) {
          document.getElementById("decodeResult").classList.add("hidden");
          return;
        }

        let dataUrl = input;
        if (!input.startsWith("data:")) {
          dataUrl = "data:image/png;base64," + input;
        }

        const img = document.getElementById("decodedImg");
        img.onload = () => {
          document.getElementById("decodeResult").classList.remove("hidden");
          document.getElementById("decodedInfo").textContent =
            `${img.naturalWidth} × ${img.naturalHeight}`;
        };
        img.onerror = () => {
          document.getElementById("decodeResult").classList.add("hidden");
        };
        img.src = dataUrl;
      };

      window.downloadDecoded = function () {
        const img = document.getElementById("decodedImg");
        const link = document.createElement("a");
        link.download = "decoded_image.png";
        link.href = img.src;
        link.click();
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };

      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
