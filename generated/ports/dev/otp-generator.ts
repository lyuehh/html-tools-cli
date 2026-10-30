// @ts-nocheck
// Generated from tools/dev/otp-generator.html
// Source SHA-256: 70ef84256bd5db4967e0073c0dd8636b55ed2eeba48f9cec29ddd10e2a043c2e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var secretInput = document.getElementById("secretInput");
      var otpCodeEl = document.getElementById("otpCode");
      var timerEl = document.getElementById("timer");
      var progressEl = document.getElementById("progress");
      var digitsEl = document.getElementById("digits");
      var periodEl = document.getElementById("period");
      var statusEl = document.getElementById("status");

      var BASE32_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function base32Decode(str) {
        str = str.toUpperCase().replace(/[^A-Z2-7]/g, "");
        var bits = "";
        for (var i = 0; i < str.length; i++) {
          var val = BASE32_CHARS.indexOf(str[i]);
          if (val === -1) continue;
          bits += val.toString(2).padStart(5, "0");
        }
        var bytes = new Uint8Array(Math.floor(bits.length / 8));
        for (var j = 0; j < bytes.length; j++) {
          bytes[j] = parseInt(bits.slice(j * 8, j * 8 + 8), 2);
        }
        return bytes;
      }

      function base32Encode(bytes) {
        var bits = "";
        for (var i = 0; i < bytes.length; i++) {
          bits += bytes[i].toString(2).padStart(8, "0");
        }
        var result = "";
        for (var j = 0; j < bits.length; j += 5) {
          var chunk = bits.slice(j, j + 5);
          if (chunk.length < 5) chunk = chunk + "0".repeat(5 - chunk.length);
          result += BASE32_CHARS[parseInt(chunk, 2)];
        }
        return result;
      }

      window.generateSecret = function () {
        var bytes = new Uint8Array(20);
        crypto.getRandomValues(bytes);
        return base32Encode(bytes);
      };

      async function hmacSha1(key, data) {
        var cryptoKey = await crypto.subtle.importKey(
          "raw",
          key,
          { name: "HMAC", hash: "SHA-1" },
          false,
          ["sign"]
        );
        var sig = await crypto.subtle.sign("HMAC", cryptoKey, data);
        return new Uint8Array(sig);
      }

      async function generateTOTP(secret, digits, period) {
        var key = base32Decode(secret);
        var time = Math.floor(Date.now() / 1000 / period);

        var timeBytes = new Uint8Array(8);
        for (var i = 7; i >= 0; i--) {
          timeBytes[i] = time & 0xff;
          time = Math.floor(time / 256);
        }

        var hash = await hmacSha1(key, timeBytes);
        var offset = hash[hash.length - 1] & 0x0f;
        var code =
          ((hash[offset] & 0x7f) << 24) |
          ((hash[offset + 1] & 0xff) << 16) |
          ((hash[offset + 2] & 0xff) << 8) |
          (hash[offset + 3] & 0xff);

        code = code % Math.pow(10, digits);
        return code.toString().padStart(digits, "0");
      }

      async function updateOTP() {
        var secret = secretInput.value.trim();
        if (!secret) {
          otpCodeEl.textContent = "-".repeat(parseInt(digitsEl.value, 10));
          return;
        }

        try {
          var digits = parseInt(digitsEl.value, 10);
          var period = parseInt(periodEl.value, 10);
          var otp = await generateTOTP(secret, digits, period);
          otpCodeEl.textContent = otp;
        } catch (e) {
          otpCodeEl.textContent = "ERROR";
          showStatus("密钥格式错误", "error");
        }
      }

      function updateTimer() {
        var period = parseInt(periodEl.value, 10);
        var now = Math.floor(Date.now() / 1000);
        var remaining = period - (now % period);
        timerEl.textContent = "剩余 " + remaining + " 秒";
        progressEl.style.width = (remaining / period) * 100 + "%";

        if (remaining === period) {
          updateOTP();
        }
      }

      document.getElementById("btnCopy").onclick = async function () {
        var code = otpCodeEl.textContent;
        if (code && !code.includes("-") && code !== "ERROR") {
          await navigator.clipboard.writeText(code);
          showStatus("已复制", "success");
        }
      };

      document.getElementById("btnGenSecret").onclick = function () {
        secretInput.value = generateSecret();
        updateOTP();
        showStatus("已生成新密钥", "success");
      };

      secretInput.addEventListener("input", updateOTP);
      digitsEl.addEventListener("change", updateOTP);
      periodEl.addEventListener("change", function () {
        updateOTP();
        updateTimer();
      });

      setInterval(updateTimer, 1000);
      updateTimer();
      updateOTP();

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
    
