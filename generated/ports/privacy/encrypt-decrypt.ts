// @ts-nocheck
// Generated from tools/privacy/encrypt-decrypt.html
// Source SHA-256: d21540c1a5852a76fe0ac0e11c48d27b5527a35892345d0cb8f86e0cb5b8cb72
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const state = {
        mode: "encrypt"
      };

      const elements = {
        input: document.getElementById("input"),
        password: document.getElementById("password"),
        keyLength: document.getElementById("keyLength"),
        outputFormat: document.getElementById("outputFormat"),
        output: document.getElementById("output"),
        error: document.getElementById("error"),
        processBtn: document.getElementById("processBtn"),
        clearBtn: document.getElementById("clearBtn"),
        copyBtn: document.getElementById("copyBtn"),
        togglePassword: document.getElementById("togglePassword"),
        inputLabel: document.getElementById("input-label"),
        outputLabel: document.getElementById("output-label"),
        modeTabs: document.querySelectorAll(".mode-tab")
      };

      // Utility functions
      function arrayBufferToBase64(buffer) {
        const bytes = new Uint8Array(buffer);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }

      function base64ToArrayBuffer(base64) {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        return bytes.buffer;
      }

      function arrayBufferToHex(buffer) {
        const bytes = new Uint8Array(buffer);
        return Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      }

      function hexToArrayBuffer(hex) {
        if (hex.length % 2 !== 0) {
          throw new Error("Hex 字符串长度必须为偶数");
        }
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
          bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        }
        return bytes.buffer;
      }

      // Derive key from password using PBKDF2
      async function deriveKey(password, salt, keyLength) {
        const encoder = new TextEncoder();
        const passwordKey = await crypto.subtle.importKey(
          "raw",
          encoder.encode(password),
          "PBKDF2",
          false,
          ["deriveKey"]
        );

        return crypto.subtle.deriveKey(
          {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
          },
          passwordKey,
          { name: "AES-GCM", length: keyLength },
          false,
          ["encrypt", "decrypt"]
        );
      }

      // Encrypt function
      async function encrypt(plaintext, password, keyLength, format) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plaintext);

        // Generate random salt and IV
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));

        // Derive key
        const key = await deriveKey(password, salt, keyLength);

        // Encrypt
        const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, data);

        // Combine salt + iv + ciphertext
        const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
        combined.set(salt, 0);
        combined.set(iv, salt.length);
        combined.set(new Uint8Array(encrypted), salt.length + iv.length);

        // Return in specified format
        if (format === "hex") {
          return arrayBufferToHex(combined.buffer);
        }
        return arrayBufferToBase64(combined.buffer);
      }

      // Decrypt function
      async function decrypt(ciphertext, password, keyLength, format) {
        // Parse input
        let combined;
        if (format === "hex") {
          combined = new Uint8Array(hexToArrayBuffer(ciphertext));
        } else {
          combined = new Uint8Array(base64ToArrayBuffer(ciphertext));
        }

        // Extract salt, iv, and encrypted data
        const salt = combined.slice(0, 16);
        const iv = combined.slice(16, 28);
        const data = combined.slice(28);

        // Derive key
        const key = await deriveKey(password, salt, keyLength);

        // Decrypt
        const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, data);

        const decoder = new TextDecoder();
        return decoder.decode(decrypted);
      }

      // Update UI for mode
      function updateMode(mode) {
        state.mode = mode;
        elements.modeTabs.forEach((tab) => {
          tab.classList.toggle("active", tab.dataset.mode === mode);
        });

        if (mode === "encrypt") {
          elements.inputLabel.textContent = "明文";
          elements.outputLabel.textContent = "密文";
          elements.input.placeholder = "输入要加密的文本...";
          elements.processBtn.textContent = "加密";
        } else {
          elements.inputLabel.textContent = "密文";
          elements.outputLabel.textContent = "明文";
          elements.input.placeholder = "输入要解密的密文...";
          elements.processBtn.textContent = "解密";
        }

        clearOutput();
      }

      window.clearOutput = function () {
        elements.output.textContent = "";
        elements.error.textContent = "";
      };

      function showError(message) {
        elements.error.textContent = message;
        elements.output.textContent = "";
      }

      function showOutput(text) {
        elements.output.textContent = text;
        elements.error.textContent = "";
      }

      // Event handlers
      elements.modeTabs.forEach((tab) => {
        tab.addEventListener("click", () => updateMode(tab.dataset.mode));
      });

      elements.processBtn.addEventListener("click", async () => {
        const input = elements.input.value.trim();
        const password = elements.password.value;
        const keyLength = parseInt(elements.keyLength.value);
        const format = elements.outputFormat.value;

        if (!input) {
          showError("请输入内容");
          return;
        }

        if (!password) {
          showError("请输入密码");
          return;
        }

        try {
          if (state.mode === "encrypt") {
            const result = await encrypt(input, password, keyLength, format);
            showOutput(result);
          } else {
            const result = await decrypt(input, password, keyLength, format);
            showOutput(result);
          }
        } catch (error) {
          if (state.mode === "decrypt") {
            showError("解密失败：密码错误或密文格式不正确");
          } else {
            showError("加密失败：" + error.message);
          }
        }
      });

      elements.clearBtn.addEventListener("click", () => {
        elements.input.value = "";
        elements.password.value = "";
        clearOutput();
      });

      elements.copyBtn.addEventListener("click", async () => {
        const text = elements.output.textContent;
        if (!text) return;

        try {
          await navigator.clipboard.writeText(text);
          elements.copyBtn.textContent = "已复制";
          elements.copyBtn.classList.add("copied");
          setTimeout(() => {
            elements.copyBtn.textContent = "复制";
            elements.copyBtn.classList.remove("copied");
          }, 2000);
        } catch (err) {
          showError("复制失败");
        }
      });

      elements.togglePassword.addEventListener("click", () => {
        const isPassword = elements.password.type === "password";
        elements.password.type = isPassword ? "text" : "password";
        elements.togglePassword.textContent = isPassword ? "隐藏" : "显示";
      });

      // Initialize
      updateMode("encrypt");

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
