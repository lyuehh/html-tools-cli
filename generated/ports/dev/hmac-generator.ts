// @ts-nocheck
// Generated from tools/dev/hmac-generator.html
// Source SHA-256: 598b874cd1e4cc3964c556a7d6ffaf78fc161f4bcba2e82b1db53077f0d28a7c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var keyInput = document.getElementById("keyInput");
      var msgInput = document.getElementById("msgInput");
      var algorithmEl = document.getElementById("algorithm");
      var outputFormatEl = document.getElementById("outputFormat");
      var resultEl = document.getElementById("result");
      var statusEl = document.getElementById("status");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function arrayBufferToHex(buffer) {
        var bytes = new Uint8Array(buffer);
        var hex = "";
        for (var i = 0; i < bytes.length; i++) {
          hex += bytes[i].toString(16).padStart(2, "0");
        }
        return hex;
      }

      function arrayBufferToBase64(buffer) {
        var bytes = new Uint8Array(buffer);
        var binary = "";
        for (var i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }

      async function generateHMAC() {
        var key = keyInput.value;
        var msg = msgInput.value;

        if (!key) {
          showStatus("请输入密钥", "error");
          return;
        }

        if (!msg) {
          showStatus("请输入消息", "error");
          return;
        }

        try {
          var algorithm = algorithmEl.value;
          var encoder = new TextEncoder();

          var cryptoKey = await crypto.subtle.importKey(
            "raw",
            encoder.encode(key),
            { name: "HMAC", hash: algorithm },
            false,
            ["sign"]
          );

          var signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(msg));

          var format = outputFormatEl.value;
          var output;
          if (format === "base64") {
            output = arrayBufferToBase64(signature);
          } else if (format === "HEX") {
            output = arrayBufferToHex(signature).toUpperCase();
          } else {
            output = arrayBufferToHex(signature);
          }

          resultEl.textContent = output;
          showStatus("生成成功", "success");
        } catch (e) {
          showStatus("生成失败: " + e.message, "error");
        }
      }

      document.getElementById("btnGenerate").onclick = generateHMAC;

      document.getElementById("btnClear").onclick = function () {
        keyInput.value = "";
        msgInput.value = "";
        resultEl.textContent = "-";
        showStatus("已清空", "success");
      };

      document.getElementById("btnCopy").onclick = async function () {
        var text = resultEl.textContent;
        if (text && text !== "-") {
          try {
            await navigator.clipboard.writeText(text);
            showStatus("已复制", "success");
          } catch (e) {
            showStatus("复制失败", "error");
          }
        }
      };

      keyInput.addEventListener("input", function () {
        if (keyInput.value && msgInput.value) generateHMAC();
      });

      msgInput.addEventListener("input", function () {
        if (keyInput.value && msgInput.value) generateHMAC();
      });

      algorithmEl.addEventListener("change", function () {
        if (keyInput.value && msgInput.value) generateHMAC();
      });

      outputFormatEl.addEventListener("change", function () {
        if (keyInput.value && msgInput.value) generateHMAC();
      });

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "dark" ? "" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next || "light");
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = "🌙";
        }
      })();
    
