// @ts-nocheck
// Generated from tools/privacy/rsa-tool.html
// Source SHA-256: dd9670eea9d626c0485d96eff6efc8a3647fe072ff265d0d05f4b470af5a1b22
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var keyPair = null;

      window.generateKeys = async function () {
        try {
          keyPair = await crypto.subtle.generateKey(
            {
              name: "RSA-OAEP",
              modulusLength: 2048,
              publicExponent: new Uint8Array([1, 0, 1]),
              hash: "SHA-256"
            },
            true,
            ["encrypt", "decrypt"]
          );

          var publicKeyExport = await crypto.subtle.exportKey("spki", keyPair.publicKey);
          var privateKeyExport = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

          document.getElementById("publicKey").value = formatPEM(publicKeyExport, "PUBLIC KEY");
          document.getElementById("privateKey").value = formatPEM(privateKeyExport, "PRIVATE KEY");
        } catch (e) {
          alert("生成密钥失败: " + e.message);
        }
      };

      function formatPEM(keyData, type) {
        var base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(keyData)));
        var lines = [];
        lines.push("-----BEGIN " + type + "-----");
        for (var i = 0; i < base64.length; i += 64) {
          lines.push(base64.substring(i, i + 64));
        }
        lines.push("-----END " + type + "-----");
        return lines.join("\n");
      }

      function parsePEM(pem) {
        var lines = pem.trim().split("\n");
        var base64 = "";
        for (var i = 0; i < lines.length; i++) {
          if (!lines[i].startsWith("-----")) {
            base64 += lines[i];
          }
        }
        var binaryString = atob(base64);
        var bytes = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
      }

      window.encryptText = async function () {
        var plaintext = document.getElementById("plaintext").value;
        var publicKeyPEM = document.getElementById("publicKey").value;

        if (!plaintext || !publicKeyPEM) {
          alert("请输入明文并确保已生成密钥");
          return;
        }

        try {
          var publicKeyData = parsePEM(publicKeyPEM);
          var publicKey = await crypto.subtle.importKey(
            "spki",
            publicKeyData,
            { name: "RSA-OAEP", hash: "SHA-256" },
            false,
            ["encrypt"]
          );

          var encoder = new TextEncoder();
          var data = encoder.encode(plaintext);
          var encrypted = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, data);
          var base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(encrypted)));

          document.getElementById("ciphertext").value = base64;
        } catch (e) {
          alert("加密失败: " + e.message);
        }
      };

      window.decryptText = async function () {
        var ciphertext = document.getElementById("encryptedInput").value;
        var privateKeyPEM = document.getElementById("privateKey").value;

        if (!ciphertext || !privateKeyPEM) {
          alert("请输入密文并确保已生成密钥");
          return;
        }

        try {
          var privateKeyData = parsePEM(privateKeyPEM);
          var privateKey = await crypto.subtle.importKey(
            "pkcs8",
            privateKeyData,
            { name: "RSA-OAEP", hash: "SHA-256" },
            false,
            ["decrypt"]
          );

          var binaryString = atob(ciphertext);
          var bytes = new Uint8Array(binaryString.length);
          for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          var decrypted = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, bytes);
          var decoder = new TextDecoder();
          document.getElementById("decryptedOutput").value = decoder.decode(decrypted);
        } catch (e) {
          alert("解密失败: " + e.message);
        }
      };

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
    
