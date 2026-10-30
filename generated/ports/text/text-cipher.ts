// @ts-nocheck
// Generated from tools/text/text-cipher.html
// Source SHA-256: 3431b079dd3e6d16ea544e612b88ebd1c8d1c9ae122d60afd635730192c6f268
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const cipherEl = document.getElementById("cipher");
      const shiftEl = document.getElementById("shift");
      const keyEl = document.getElementById("key");
      const shiftGroup = document.getElementById("shiftGroup");
      const keyGroup = document.getElementById("keyGroup");
      const cipherInfoEl = document.getElementById("cipherInfo");
      const LS_KEY = "text_cipher_v1";

      const cipherInfos = {
        caesar: "凯撒密码：将每个字母按字母表移动固定位数。偏移量3时，A→D, B→E...",
        rot13: "ROT13：凯撒密码的特例，固定偏移13位。加密和解密使用相同操作。",
        atbash: "阿特巴希码：字母表首尾互换。A↔Z, B↔Y, C↔X...",
        vigenere: "维吉尼亚密码：使用密钥字符串，每个字母按密钥对应字母的位置偏移。",
        reverse: "反转字符串：将文本按字符顺序颠倒。",
        binary: "二进制编码：将每个字符转换为8位二进制表示。",
        hex: "十六进制编码：将每个字符转换为两位十六进制表示。"
      };

      window.updateUI = function () {
        const cipher = cipherEl.value;

        // Show/hide options
        shiftGroup.style.display = cipher === "caesar" ? "flex" : "none";
        keyGroup.style.display = cipher === "vigenere" ? "flex" : "none";

        // Update info
        cipherInfoEl.textContent = cipherInfos[cipher];
      };

      // Caesar cipher
      function caesar(text, shift, decrypt) {
        if (decrypt) shift = 26 - shift;
        return text.replace(/[a-zA-Z]/g, function (char) {
          const base = char <= "Z" ? 65 : 97;
          return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
        });
      }

      // ROT13 (Caesar with shift 13)
      function rot13(text) {
        return caesar(text, 13, false);
      }

      // Atbash cipher
      function atbash(text) {
        return text.replace(/[a-zA-Z]/g, function (char) {
          const base = char <= "Z" ? 65 : 97;
          return String.fromCharCode(base + 25 - (char.charCodeAt(0) - base));
        });
      }

      // Vigenère cipher
      function vigenere(text, key, decrypt) {
        if (!key) return text;
        key = key.toLowerCase().replace(/[^a-z]/g, "");
        if (!key) return text;

        let keyIndex = 0;
        return text.replace(/[a-zA-Z]/g, function (char) {
          const base = char <= "Z" ? 65 : 97;
          const charCode = char.charCodeAt(0) - base;
          const keyCode = key.charCodeAt(keyIndex % key.length) - 97;
          keyIndex++;

          let newCode;
          if (decrypt) {
            newCode = (charCode - keyCode + 26) % 26;
          } else {
            newCode = (charCode + keyCode) % 26;
          }
          return String.fromCharCode(newCode + base);
        });
      }

      // Reverse string
      function reverseStr(text) {
        return text.split("").reverse().join("");
      }

      // Binary encoding
      function toBinary(text) {
        return text
          .split("")
          .map(function (char) {
            return char.charCodeAt(0).toString(2).padStart(8, "0");
          })
          .join(" ");
      }

      function fromBinary(text) {
        return text
          .split(/\s+/)
          .map(function (bin) {
            const code = parseInt(bin, 2);
            return isNaN(code) ? "" : String.fromCharCode(code);
          })
          .join("");
      }

      // Hex encoding
      function toHex(text) {
        return text
          .split("")
          .map(function (char) {
            return char.charCodeAt(0).toString(16).padStart(2, "0");
          })
          .join(" ");
      }

      function fromHex(text) {
        return text
          .split(/\s+/)
          .map(function (hex) {
            const code = parseInt(hex, 16);
            return isNaN(code) ? "" : String.fromCharCode(code);
          })
          .join("");
      }

      function process(encrypt) {
        const text = inputEl.value;
        if (!text) {
          showStatus("请输入文本", "error");
          return;
        }

        const cipher = cipherEl.value;
        let result;

        try {
          switch (cipher) {
            case "caesar":
              const shift = parseInt(shiftEl.value) || 3;
              result = caesar(text, shift, !encrypt);
              break;
            case "rot13":
              result = rot13(text);
              break;
            case "atbash":
              result = atbash(text);
              break;
            case "vigenere":
              const key = keyEl.value;
              if (!key) {
                showStatus("请输入密钥", "error");
                return;
              }
              result = vigenere(text, key, !encrypt);
              break;
            case "reverse":
              result = reverseStr(text);
              break;
            case "binary":
              result = encrypt ? toBinary(text) : fromBinary(text);
              break;
            case "hex":
              result = encrypt ? toHex(text) : fromHex(text);
              break;
            default:
              result = text;
          }

          outputEl.value = result;
          saveToStorage();
          showStatus((encrypt ? "加密" : "解密") + "完成", "success");
        } catch (e) {
          showStatus("处理失败: " + e.message, "error");
        }
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function saveToStorage() {
        const data = {
          input: inputEl.value,
          cipher: cipherEl.value,
          shift: shiftEl.value,
          key: keyEl.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const data = JSON.parse(saved);
            inputEl.value = data.input || "";
            cipherEl.value = data.cipher || "caesar";
            shiftEl.value = data.shift || "3";
            keyEl.value = data.key || "";
            updateUI();
          }
        } catch (e) {
          // Ignore parse errors
        }
      }

      document.getElementById("btnEncrypt").onclick = function () {
        process(true);
      };
      document.getElementById("btnDecrypt").onclick = function () {
        process(false);
      };

      document.getElementById("btnCopy").onclick = async function () {
        if (!outputEl.value) {
          showStatus("没有内容可复制", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(outputEl.value);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnSwap").onclick = function () {
        const temp = inputEl.value;
        inputEl.value = outputEl.value;
        outputEl.value = temp;
        saveToStorage();
      };

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        outputEl.value = "";
        statusEl.textContent = "";
        localStorage.removeItem(LS_KEY);
      };

      cipherEl.addEventListener("change", function () {
        updateUI();
        saveToStorage();
      });

      inputEl.addEventListener("input", saveToStorage);
      shiftEl.addEventListener("input", saveToStorage);
      keyEl.addEventListener("input", saveToStorage);

      loadFromStorage();
      updateUI();

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
    
