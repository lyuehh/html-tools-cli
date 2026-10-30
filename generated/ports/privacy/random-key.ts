// @ts-nocheck
// Generated from tools/privacy/random-key.html
// Source SHA-256: 8c51f8962e3e40b045cb2c5f8e656bc3a0b4edbf07d26f55f3398f5e71cfab26
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.setPreset = function (type) {
        var presets = document.querySelectorAll(".preset");
        presets.forEach(function (p) {
          p.classList.remove("active");
        });
        event.target.classList.add("active");

        var length = document.getElementById("length");
        var format = document.getElementById("format");

        switch (type) {
          case "api":
            length.value = 32;
            format.value = "alphanumeric";
            break;
          case "secret":
            length.value = 64;
            format.value = "alphanumeric";
            break;
          case "token":
            length.value = 128;
            format.value = "base64";
            break;
          case "uuid":
            generateUUID();
            return;
          case "aes128":
            length.value = 16;
            format.value = "hex";
            break;
          case "aes256":
            length.value = 32;
            format.value = "hex";
            break;
        }
        generate();
      };

      window.generate = function () {
        var length = parseInt(document.getElementById("length").value) || 32;
        var format = document.getElementById("format").value;
        var result = "";

        if (format === "hex") {
          var bytes = new Uint8Array(Math.ceil(length / 2));
          crypto.getRandomValues(bytes);
          result = Array.from(bytes)
            .map(function (b) {
              return b.toString(16).padStart(2, "0");
            })
            .join("")
            .substring(0, length);
        } else if (format === "base64") {
          var bytes = new Uint8Array(Math.ceil(length * 0.75));
          crypto.getRandomValues(bytes);
          result = btoa(String.fromCharCode.apply(null, bytes)).substring(0, length);
        } else {
          var charset = "";
          if (document.getElementById("uppercase").checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          if (document.getElementById("lowercase").checked) charset += "abcdefghijklmnopqrstuvwxyz";
          if (document.getElementById("numbers").checked) charset += "0123456789";
          if (document.getElementById("symbols").checked) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
          if (format === "ascii" && !document.getElementById("symbols").checked) {
            charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
          }

          if (!charset) charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

          var bytes = new Uint8Array(length);
          crypto.getRandomValues(bytes);
          for (var i = 0; i < length; i++) {
            result += charset[bytes[i] % charset.length];
          }
        }

        document.getElementById("output").textContent = result;
      };

      function generateUUID() {
        var bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;

        var hex = Array.from(bytes)
          .map(function (b) {
            return b.toString(16).padStart(2, "0");
          })
          .join("");

        var uuid =
          hex.substring(0, 8) +
          "-" +
          hex.substring(8, 12) +
          "-" +
          hex.substring(12, 16) +
          "-" +
          hex.substring(16, 20) +
          "-" +
          hex.substring(20, 32);

        document.getElementById("output").textContent = uuid;
      }

      window.copyKey = function () {
        var key = document.getElementById("output").textContent;
        if (key && key !== "-") {
          navigator.clipboard.writeText(key).then(function () {
            event.target.textContent = "已复制!";
            setTimeout(function () {
              event.target.textContent = "复制密钥";
            }, 1500);
          });
        }
      };

      generate();

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
    
