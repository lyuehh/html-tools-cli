// @ts-nocheck
// Generated from tools/dev/rsa-keygen.html
// Source SHA-256: 253259534bad9ba4d158f3cc389c9a91f0487dc5bd9e6e5e8cddfb560a6e6347
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var keySizeEl = document.getElementById("keySize");
      var formatEl = document.getElementById("format");
      var publicKeyEl = document.getElementById("publicKey");
      var privateKeyEl = document.getElementById("privateKey");
      var statusEl = document.getElementById("status");
      var btnGenerate = document.getElementById("btnGenerate");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function arrayBufferToBase64(buffer) {
        var bytes = new Uint8Array(buffer);
        var binary = "";
        for (var i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }

      function formatPEM(base64, type) {
        var lines = [];
        for (var i = 0; i < base64.length; i += 64) {
          lines.push(base64.slice(i, i + 64));
        }
        return "-----BEGIN " + type + "-----\n" + lines.join("\n") + "\n-----END " + type + "-----";
      }

      window.generateKeys = async function () {
        var keySize = parseInt(keySizeEl.value, 10);
        var format = formatEl.value;

        btnGenerate.disabled = true;
        showStatus("正在生成密钥...", "");

        try {
          var keyPair = await crypto.subtle.generateKey(
            {
              name: "RSA-OAEP",
              modulusLength: keySize,
              publicExponent: new Uint8Array([1, 0, 1]),
              hash: "SHA-256"
            },
            true,
            ["encrypt", "decrypt"]
          );

          if (format === "jwk") {
            var publicJwk = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
            var privateJwk = await crypto.subtle.exportKey("jwk", keyPair.privateKey);
            publicKeyEl.value = JSON.stringify(publicJwk, null, 2);
            privateKeyEl.value = JSON.stringify(privateJwk, null, 2);
          } else {
            var publicSpki = await crypto.subtle.exportKey("spki", keyPair.publicKey);
            var privatePkcs8 = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
            publicKeyEl.value = formatPEM(arrayBufferToBase64(publicSpki), "PUBLIC KEY");
            privateKeyEl.value = formatPEM(arrayBufferToBase64(privatePkcs8), "PRIVATE KEY");
          }

          showStatus("密钥对生成成功 (" + keySize + " 位)", "success");
        } catch (e) {
          showStatus("生成失败: " + e.message, "error");
        } finally {
          btnGenerate.disabled = false;
        }
      };

      window.download = function (content, filename) {
        var blob = new Blob([content], { type: "text/plain" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      };

      btnGenerate.onclick = generateKeys;

      document.getElementById("btnCopyPublic").onclick = async function () {
        if (publicKeyEl.value) {
          await navigator.clipboard.writeText(publicKeyEl.value);
          showStatus("公钥已复制", "success");
        }
      };

      document.getElementById("btnCopyPrivate").onclick = async function () {
        if (privateKeyEl.value) {
          await navigator.clipboard.writeText(privateKeyEl.value);
          showStatus("私钥已复制", "success");
        }
      };

      document.getElementById("btnDownloadPublic").onclick = function () {
        if (publicKeyEl.value) {
          var ext = formatEl.value === "jwk" ? "json" : "pem";
          download(publicKeyEl.value, "public_key." + ext);
        }
      };

      document.getElementById("btnDownloadPrivate").onclick = function () {
        if (privateKeyEl.value) {
          var ext = formatEl.value === "jwk" ? "json" : "pem";
          download(privateKeyEl.value, "private_key." + ext);
        }
      };

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
