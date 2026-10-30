// @ts-nocheck
// Generated from tools/privacy/steganography.html
// Source SHA-256: f682c9fb2a53c433ae23aa48949dcab52b95f3394da3279668fc6c060c9377b4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 状态
      let encodeImage = null;
      let decodeImage = null;
      let encodedImageData = null;

      // 标记头（用于识别是否有隐藏数据）
      const MARKER = "STEG";

      // 主题切换
      document.getElementById("themeToggle").addEventListener("click", function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      });

      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      // Tab切换
      document.querySelectorAll(".tab-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
          document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

          this.classList.add("active");
          document.getElementById(this.dataset.tab + "Tab").classList.add("active");
        });
      });

      // 文件拖放
      function setupDropZone(dropZone, fileInput, callback) {
        dropZone.addEventListener("click", function () {
          fileInput.click();
        });

        dropZone.addEventListener("dragover", function (e) {
          e.preventDefault();
          this.classList.add("dragover");
        });

        dropZone.addEventListener("dragleave", function () {
          this.classList.remove("dragover");
        });

        dropZone.addEventListener("drop", function (e) {
          e.preventDefault();
          this.classList.remove("dragover");
          const file = e.dataTransfer.files[0];
          if (file) callback(file);
        });

        fileInput.addEventListener("change", function () {
          if (this.files[0]) callback(this.files[0]);
        });
      }

      // 加载图片
      window.loadImage = function (file) {
        return new Promise(function (resolve, reject) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
              resolve(img);
            };
            img.onerror = reject;
            img.src = e.target.result;
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      // 字符串转二进制
      function stringToBinary(str) {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(str);
        let binary = "";
        bytes.forEach(function (byte) {
          binary += byte.toString(2).padStart(8, "0");
        });
        return binary;
      }

      // 二进制转字符串
      function binaryToString(binary) {
        const bytes = [];
        for (let i = 0; i < binary.length; i += 8) {
          const byte = binary.substr(i, 8);
          if (byte.length === 8) {
            bytes.push(parseInt(byte, 2));
          }
        }
        const decoder = new TextDecoder();
        return decoder.decode(new Uint8Array(bytes));
      }

      // 简单加密（XOR）
      function xorEncrypt(str, password) {
        let result = "";
        for (let i = 0; i < str.length; i++) {
          const charCode = str.charCodeAt(i) ^ password.charCodeAt(i % password.length);
          result += String.fromCharCode(charCode);
        }
        return result;
      }

      // 编码信息到图片
      function encodeMessage(imageData, message) {
        const data = imageData.data;
        const binary = stringToBinary(
          MARKER + message.length.toString().padStart(8, "0") + message
        );

        if (binary.length > (data.length / 4) * 3) {
          throw new Error("信息太长，无法隐藏在此图片中");
        }

        let bitIndex = 0;
        for (let i = 0; i < data.length && bitIndex < binary.length; i += 4) {
          // 只修改 RGB 通道的最低位，跳过 Alpha 通道
          for (let j = 0; j < 3 && bitIndex < binary.length; j++) {
            const bit = parseInt(binary[bitIndex]);
            data[i + j] = (data[i + j] & 0xfe) | bit;
            bitIndex++;
          }
        }

        return imageData;
      }

      // 从图片解码信息
      function decodeMessage(imageData) {
        const data = imageData.data;
        let binary = "";

        // 先提取足够的位来检查标记和长度
        for (
          let i = 0;
          i < data.length && binary.length < (MARKER.length + 8) * 8 + 1000000;
          i += 4
        ) {
          for (let j = 0; j < 3; j++) {
            binary += (data[i + j] & 1).toString();
          }
        }

        // 检查标记
        const markerBinary = binary.substr(0, MARKER.length * 8);
        const marker = binaryToString(markerBinary);

        if (marker !== MARKER) {
          throw new Error("未检测到隐藏信息，或图片已损坏");
        }

        // 获取消息长度
        const lengthBinary = binary.substr(MARKER.length * 8, 8 * 8);
        const messageLength = parseInt(binaryToString(lengthBinary));

        if (isNaN(messageLength) || messageLength <= 0 || messageLength > 10000000) {
          throw new Error("信息格式错误");
        }

        // 提取消息
        const messageBinary = binary.substr((MARKER.length + 8) * 8, messageLength * 8);
        return binaryToString(messageBinary);
      }

      // 设置编码拖放区
      setupDropZone(
        document.getElementById("encodeDropZone"),
        document.getElementById("encodeFileInput"),
        async function (file) {
          try {
            encodeImage = await loadImage(file);
            document.getElementById("encodePreview").src = encodeImage.src;
            document.getElementById("encodePreview").style.display = "block";
            document.getElementById("encodeStats").style.display = "flex";

            document.getElementById("imgSize").textContent =
              encodeImage.width + " × " + encodeImage.height;
            const maxBits = encodeImage.width * encodeImage.height * 3;
            const maxChars = Math.floor(maxBits / 8) - MARKER.length - 8;
            document.getElementById("maxCapacity").textContent = maxChars + " 字符";

            updateEncodeButton();
          } catch (err) {
            alert("无法加载图片: " + err.message);
          }
        }
      );

      // 设置解码拖放区
      setupDropZone(
        document.getElementById("decodeDropZone"),
        document.getElementById("decodeFileInput"),
        async function (file) {
          try {
            decodeImage = await loadImage(file);
            document.getElementById("decodePreview").src = decodeImage.src;
            document.getElementById("decodePreview").style.display = "block";
            document.getElementById("decodeBtn").disabled = false;
            document.getElementById("decodeResult").style.display = "none";
          } catch (err) {
            alert("无法加载图片: " + err.message);
          }
        }
      );

      // 更新编码按钮状态
      function updateEncodeButton() {
        const message = document.getElementById("secretMessage").value;
        document.getElementById("encodeBtn").disabled = !encodeImage || !message;
      }

      // 消息输入监听
      document.getElementById("secretMessage").addEventListener("input", function () {
        const text = this.value;
        document.getElementById("charCount").textContent = text.length;
        document.getElementById("requiredCapacity").textContent = text.length * 8;
        updateEncodeButton();
      });

      // 加密选项
      document.getElementById("useEncryption").addEventListener("change", function () {
        document.getElementById("passwordSection").style.display = this.checked ? "block" : "none";
      });

      document.getElementById("needDecryption").addEventListener("change", function () {
        document.getElementById("decryptSection").style.display = this.checked ? "block" : "none";
      });

      // 编码按钮
      document.getElementById("encodeBtn").addEventListener("click", function () {
        const message = document.getElementById("secretMessage").value;
        if (!encodeImage || !message) return;

        const progressBar = document.getElementById("encodeProgress");
        const progressFill = document.getElementById("encodeProgressFill");
        progressBar.classList.add("active");
        progressFill.style.width = "30%";

        setTimeout(function () {
          try {
            let finalMessage = message;

            // 加密
            if (document.getElementById("useEncryption").checked) {
              const password = document.getElementById("encryptPassword").value;
              if (!password) {
                throw new Error("请输入加密密码");
              }
              finalMessage = "ENC:" + xorEncrypt(message, password);
            }

            progressFill.style.width = "50%";

            const canvas = document.getElementById("canvas");
            canvas.width = encodeImage.width;
            canvas.height = encodeImage.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(encodeImage, 0, 0);

            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            progressFill.style.width = "70%";

            imageData = encodeMessage(imageData, finalMessage);
            ctx.putImageData(imageData, 0, 0);

            progressFill.style.width = "90%";

            encodedImageData = canvas.toDataURL("image/png");
            document.getElementById("resultPreview").src = encodedImageData;
            document.getElementById("encodeResult").style.display = "block";
            document.getElementById("downloadBtn").style.display = "inline-block";

            progressFill.style.width = "100%";
            setTimeout(function () {
              progressBar.classList.remove("active");
              progressFill.style.width = "0%";
            }, 500);
          } catch (err) {
            progressBar.classList.remove("active");
            alert("编码失败: " + err.message);
          }
        }, 100);
      });

      // 下载按钮
      document.getElementById("downloadBtn").addEventListener("click", function () {
        if (!encodedImageData) return;

        const a = document.createElement("a");
        a.href = encodedImageData;
        a.download = "steganography_" + Date.now() + ".png";
        a.click();
      });

      // 解码按钮
      document.getElementById("decodeBtn").addEventListener("click", function () {
        if (!decodeImage) return;

        const progressBar = document.getElementById("decodeProgress");
        const progressFill = document.getElementById("decodeProgressFill");
        progressBar.classList.add("active");
        progressFill.style.width = "30%";

        setTimeout(function () {
          try {
            const canvas = document.getElementById("canvas");
            canvas.width = decodeImage.width;
            canvas.height = decodeImage.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(decodeImage, 0, 0);

            progressFill.style.width = "50%";

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let message = decodeMessage(imageData);

            progressFill.style.width = "80%";

            // 检查是否加密
            if (message.startsWith("ENC:")) {
              if (!document.getElementById("needDecryption").checked) {
                throw new Error('此信息已加密，请勾选"需要密码解密"并输入正确密码');
              }
              const password = document.getElementById("decryptPassword").value;
              if (!password) {
                throw new Error("请输入解密密码");
              }
              message = xorEncrypt(message.substr(4), password);
            }

            document.getElementById("decodedMessage").textContent = message;
            document.getElementById("decodeResult").style.display = "block";

            progressFill.style.width = "100%";
            setTimeout(function () {
              progressBar.classList.remove("active");
              progressFill.style.width = "0%";
            }, 500);
          } catch (err) {
            progressBar.classList.remove("active");
            alert("解码失败: " + err.message);
          }
        }, 100);
      });

      // 复制信息
      document.getElementById("copyMessageBtn").addEventListener("click", function () {
        const message = document.getElementById("decodedMessage").textContent;
        navigator.clipboard.writeText(message).then(function () {
          alert("已复制到剪贴板");
        });
      });

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
