// @ts-nocheck
// Generated from tools/privacy/text-encrypt.html
// Source SHA-256: 793520b9743fb3ed68703ad96732aa40d63b169f9bb273d283c8b68e48c98122
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme
      function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      }
      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };
      initTheme();

      let selectedAlgorithm = "AES-GCM";

      window.selectAlgorithm = function (algo) {
        selectedAlgorithm = algo;
        document.querySelectorAll(".algo-card").forEach((card) => {
          card.classList.toggle("selected", card.querySelector(".name").textContent === algo);
        });
      };

      window.togglePassword = function () {
        const input = document.getElementById("password");
        input.type = input.type === "password" ? "text" : "password";
      };

      function updateCount() {
        const input = document.getElementById("inputText").value;
        const output = document.getElementById("outputText").value;
        document.getElementById("inputCount").textContent = input.length + " 字符";
        document.getElementById("outputCount").textContent = output.length + " 字符";
      }

      function showError(msg) {
        const errorEl = document.getElementById("errorMsg");
        errorEl.textContent = msg;
        errorEl.classList.add("show");
        setTimeout(() => errorEl.classList.remove("show"), 5000);
      }

      // Derive key from password
      async function deriveKey(password, salt, keyLength) {
        const encoder = new TextEncoder();
        const passwordKey = await crypto.subtle.importKey(
          "raw",
          encoder.encode(password),
          "PBKDF2",
          false,
          ["deriveBits", "deriveKey"]
        );

        return crypto.subtle.deriveKey(
          {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
          },
          passwordKey,
          {
            name: selectedAlgorithm.split("-")[0] + "-" + selectedAlgorithm.split("-")[1],
            length: keyLength
          },
          false,
          ["encrypt", "decrypt"]
        );
      }

      window.encryptText = async function () {
        const password = document.getElementById("password").value;
        const plaintext = document.getElementById("inputText").value;
        const keyLength = parseInt(document.getElementById("keyLength").value);

        if (!password) {
          showError("请输入密码");
          return;
        }
        if (!plaintext) {
          showError("请输入要加密的文本");
          return;
        }

        try {
          const encoder = new TextEncoder();
          const salt = crypto.getRandomValues(new Uint8Array(16));
          const iv = crypto.getRandomValues(
            new Uint8Array(selectedAlgorithm === "AES-GCM" ? 12 : 16)
          );

          const key = await deriveKey(password, salt, keyLength);

          let encrypted;
          if (selectedAlgorithm === "AES-GCM") {
            encrypted = await crypto.subtle.encrypt(
              { name: "AES-GCM", iv: iv },
              key,
              encoder.encode(plaintext)
            );
          } else if (selectedAlgorithm === "AES-CBC") {
            encrypted = await crypto.subtle.encrypt(
              { name: "AES-CBC", iv: iv },
              key,
              encoder.encode(plaintext)
            );
          } else if (selectedAlgorithm === "AES-CTR") {
            encrypted = await crypto.subtle.encrypt(
              { name: "AES-CTR", counter: iv, length: 64 },
              key,
              encoder.encode(plaintext)
            );
          }

          // Combine salt + iv + encrypted data
          const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
          combined.set(salt, 0);
          combined.set(iv, salt.length);
          combined.set(new Uint8Array(encrypted), salt.length + iv.length);

          // Encode to base64 with algorithm prefix
          const base64 = btoa(String.fromCharCode(...combined));
          document.getElementById("outputText").value = `${selectedAlgorithm}:${base64}`;
          updateCount();
        } catch (e) {
          showError("加密失败: " + e.message);
        }
      };

      window.decryptText = async function () {
        const password = document.getElementById("password").value;
        const ciphertext = document.getElementById("inputText").value;
        const keyLength = parseInt(document.getElementById("keyLength").value);

        if (!password) {
          showError("请输入密码");
          return;
        }
        if (!ciphertext) {
          showError("请输入要解密的密文");
          return;
        }

        try {
          // Parse algorithm and data
          let algo = selectedAlgorithm;
          let base64Data = ciphertext;

          if (ciphertext.includes(":")) {
            const parts = ciphertext.split(":");
            algo = parts[0];
            base64Data = parts[1];
          }

          const combined = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

          const salt = combined.slice(0, 16);
          const ivLength = algo === "AES-GCM" ? 12 : 16;
          const iv = combined.slice(16, 16 + ivLength);
          const encrypted = combined.slice(16 + ivLength);

          const key = await deriveKey(password, salt, keyLength);

          let decrypted;
          if (algo === "AES-GCM") {
            decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, encrypted);
          } else if (algo === "AES-CBC") {
            decrypted = await crypto.subtle.decrypt({ name: "AES-CBC", iv: iv }, key, encrypted);
          } else if (algo === "AES-CTR") {
            decrypted = await crypto.subtle.decrypt(
              { name: "AES-CTR", counter: iv, length: 64 },
              key,
              encrypted
            );
          }

          const decoder = new TextDecoder();
          document.getElementById("outputText").value = decoder.decode(decrypted);
          updateCount();
        } catch (e) {
          showError("解密失败: 密码错误或密文损坏");
        }
      };

      window.swapText = function () {
        const input = document.getElementById("inputText");
        const output = document.getElementById("outputText");
        const temp = input.value;
        input.value = output.value;
        output.value = temp;
        updateCount();
      };

      window.clearAll = function () {
        document.getElementById("inputText").value = "";
        document.getElementById("outputText").value = "";
        document.getElementById("password").value = "";
        updateCount();
      };

      window.copyResult = function () {
        const output = document.getElementById("outputText").value;
        if (output) {
          navigator.clipboard.writeText(output);
          alert("已复制到剪贴板");
        }
      };

      window.downloadResult = function () {
        const output = document.getElementById("outputText").value;
        if (!output) return;

        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "encrypted.txt";
        a.click();
        URL.revokeObjectURL(url);
      };
    
