// @ts-nocheck
// Generated from tools/text/text-encrypt.html
// Source SHA-256: 8c51d3867f102f46588bd3488432f22b372883ec4f1dcb0c7a2fdbc8346615d3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var currentMode = "encrypt";
      var currentAlgorithm = "base64";

      // Theme toggle
      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme");
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Load saved theme
      (function () {
        var savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      function showMessage(msg, isError) {
        var messageDiv = document.getElementById("message");
        var p = document.createElement("p");
        p.className = isError ? "error" : "success-msg";
        p.textContent = msg;
        messageDiv.textContent = "";
        messageDiv.appendChild(p);
        setTimeout(function () {
          messageDiv.textContent = "";
        }, 3000);
      }

      window.setMode = function (mode) {
        currentMode = mode;
        document.getElementById("encryptMode").className = mode === "encrypt" ? "active" : "";
        document.getElementById("decryptMode").className = mode === "decrypt" ? "active" : "";

        document.getElementById("inputLabel").textContent = mode === "encrypt" ? "原文" : "密文";
        document.getElementById("outputLabel").textContent = mode === "encrypt" ? "密文" : "原文";
        document.getElementById("processBtn").textContent = mode === "encrypt" ? "加密" : "解密";
        document.getElementById("inputText").placeholder =
          mode === "encrypt" ? "输入要加密的文本" : "输入要解密的文本";
        document.getElementById("outputText").placeholder =
          mode === "encrypt" ? "加密结果将显示在这里" : "解密结果将显示在这里";
      };

      window.selectAlgorithm = function (element) {
        var items = document.querySelectorAll(".algorithm-item");
        items.forEach(function (item) {
          item.classList.remove("selected");
        });
        element.classList.add("selected");
        currentAlgorithm = element.getAttribute("data-algorithm");

        updateKeySection();
      };

      function updateKeySection() {
        var keySection = document.getElementById("keySection");
        var keyLabel = document.getElementById("keyLabel");
        var keyInput = document.getElementById("keyInput");
        var strengthMeter = document.getElementById("strengthMeter");

        var needsKey = ["caesar", "vigenere", "xor", "aes"].indexOf(currentAlgorithm) >= 0;
        keySection.style.display = needsKey ? "block" : "none";

        if (currentAlgorithm === "caesar") {
          keyLabel.textContent = "位移量 (1-25)";
          keyInput.placeholder = "输入数字 1-25";
          keyInput.type = "number";
          keyInput.min = 1;
          keyInput.max = 25;
          strengthMeter.style.display = "none";
        } else if (currentAlgorithm === "vigenere") {
          keyLabel.textContent = "密钥词";
          keyInput.placeholder = "输入字母密钥";
          keyInput.type = "text";
          strengthMeter.style.display = "block";
        } else if (currentAlgorithm === "xor" || currentAlgorithm === "aes") {
          keyLabel.textContent = "密钥";
          keyInput.placeholder = "输入密钥";
          keyInput.type = "text";
          strengthMeter.style.display = "block";
        }
      }

      window.generateKey = function () {
        var key = "";
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        var length = currentAlgorithm === "caesar" ? 2 : 16;

        if (currentAlgorithm === "caesar") {
          key = String(Math.floor(Math.random() * 25) + 1);
        } else {
          for (var i = 0; i < length; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
          }
        }

        document.getElementById("keyInput").value = key;
        updateStrength();
      };

      function updateStrength() {
        var key = document.getElementById("keyInput").value;
        var fill = document.getElementById("strengthFill");

        if (!key) {
          fill.className = "strength-fill";
          return;
        }

        var strength = 0;
        if (key.length >= 8) strength++;
        if (key.length >= 16) strength++;
        if (/[a-z]/.test(key) && /[A-Z]/.test(key)) strength++;
        if (/\d/.test(key)) strength++;
        if (/[^a-zA-Z0-9]/.test(key)) strength++;

        if (strength <= 2) {
          fill.className = "strength-fill strength-weak";
        } else if (strength <= 3) {
          fill.className = "strength-fill strength-medium";
        } else {
          fill.className = "strength-fill strength-strong";
        }
      }

      document.getElementById("keyInput").addEventListener("input", updateStrength);

      window.swapTexts = function () {
        var input = document.getElementById("inputText");
        var output = document.getElementById("outputText");
        var temp = input.value;
        input.value = output.value;
        output.value = temp;
      };

      window.clearAll = function () {
        document.getElementById("inputText").value = "";
        document.getElementById("outputText").value = "";
        document.getElementById("keyInput").value = "";
      };

      window.copyResult = function () {
        var output = document.getElementById("outputText");
        if (!output.value) {
          showMessage("没有可复制的内容", true);
          return;
        }
        navigator.clipboard
          .writeText(output.value)
          .then(function () {
            showMessage("已复制到剪贴板", false);
          })
          .catch(function () {
            showMessage("复制失败", true);
          });
      };

      // Encryption algorithms
      var algorithms = {
        base64: {
          encrypt: function (text) {
            return btoa(unescape(encodeURIComponent(text)));
          },
          decrypt: function (text) {
            try {
              return decodeURIComponent(escape(atob(text)));
            } catch (e) {
              throw new Error("无效的Base64编码");
            }
          }
        },

        caesar: {
          encrypt: function (text, shift) {
            shift = parseInt(shift) || 3;
            return text
              .split("")
              .map(function (char) {
                if (char.match(/[a-z]/i)) {
                  var code = char.charCodeAt(0);
                  var base = code >= 65 && code <= 90 ? 65 : 97;
                  return String.fromCharCode(((code - base + shift) % 26) + base);
                }
                return char;
              })
              .join("");
          },
          decrypt: function (text, shift) {
            shift = parseInt(shift) || 3;
            return this.encrypt(text, 26 - (shift % 26));
          }
        },

        rot13: {
          encrypt: function (text) {
            return algorithms.caesar.encrypt(text, 13);
          },
          decrypt: function (text) {
            return algorithms.caesar.encrypt(text, 13);
          }
        },

        vigenere: {
          encrypt: function (text, key) {
            if (!key) throw new Error("请输入密钥");
            key = key.toUpperCase().replace(/[^A-Z]/g, "");
            if (!key) throw new Error("密钥必须包含字母");

            var keyIndex = 0;
            return text
              .split("")
              .map(function (char) {
                if (char.match(/[a-z]/i)) {
                  var code = char.charCodeAt(0);
                  var base = code >= 65 && code <= 90 ? 65 : 97;
                  var shift = key.charCodeAt(keyIndex % key.length) - 65;
                  keyIndex++;
                  return String.fromCharCode(((code - base + shift) % 26) + base);
                }
                return char;
              })
              .join("");
          },
          decrypt: function (text, key) {
            if (!key) throw new Error("请输入密钥");
            key = key.toUpperCase().replace(/[^A-Z]/g, "");
            if (!key) throw new Error("密钥必须包含字母");

            var keyIndex = 0;
            return text
              .split("")
              .map(function (char) {
                if (char.match(/[a-z]/i)) {
                  var code = char.charCodeAt(0);
                  var base = code >= 65 && code <= 90 ? 65 : 97;
                  var shift = key.charCodeAt(keyIndex % key.length) - 65;
                  keyIndex++;
                  return String.fromCharCode(((code - base - shift + 26) % 26) + base);
                }
                return char;
              })
              .join("");
          }
        },

        xor: {
          encrypt: function (text, key) {
            if (!key) throw new Error("请输入密钥");
            var result = "";
            for (var i = 0; i < text.length; i++) {
              result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            }
            return btoa(unescape(encodeURIComponent(result)));
          },
          decrypt: function (text, key) {
            if (!key) throw new Error("请输入密钥");
            try {
              var decoded = decodeURIComponent(escape(atob(text)));
              var result = "";
              for (var i = 0; i < decoded.length; i++) {
                result += String.fromCharCode(
                  decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                );
              }
              return result;
            } catch (e) {
              throw new Error("解密失败，请检查密钥是否正确");
            }
          }
        },

        aes: {
          encrypt: function (text, key) {
            if (!key) throw new Error("请输入密钥");
            // Simple AES-like encryption using SubtleCrypto API simulation
            // For demo purposes, using a simplified version
            var keyHash = simpleHash(key);
            var result = "";
            for (var i = 0; i < text.length; i++) {
              var charCode = text.charCodeAt(i);
              var keyChar = keyHash.charCodeAt(i % keyHash.length);
              var encrypted = (charCode + keyChar) % 65536;
              result += String.fromCharCode(encrypted);
            }
            return btoa(unescape(encodeURIComponent(result)));
          },
          decrypt: function (text, key) {
            if (!key) throw new Error("请输入密钥");
            try {
              var decoded = decodeURIComponent(escape(atob(text)));
              var keyHash = simpleHash(key);
              var result = "";
              for (var i = 0; i < decoded.length; i++) {
                var charCode = decoded.charCodeAt(i);
                var keyChar = keyHash.charCodeAt(i % keyHash.length);
                var decrypted = (charCode - keyChar + 65536) % 65536;
                result += String.fromCharCode(decrypted);
              }
              return result;
            } catch (e) {
              throw new Error("解密失败，请检查密钥是否正确");
            }
          }
        },

        reverse: {
          encrypt: function (text) {
            return text.split("").reverse().join("");
          },
          decrypt: function (text) {
            return text.split("").reverse().join("");
          }
        },

        morse: {
          code: {
            A: ".-",
            B: "-...",
            C: "-.-.",
            D: "-..",
            E: ".",
            F: "..-.",
            G: "--.",
            H: "....",
            I: "..",
            J: ".---",
            K: "-.-",
            L: ".-..",
            M: "--",
            N: "-.",
            O: "---",
            P: ".--.",
            Q: "--.-",
            R: ".-.",
            S: "...",
            T: "-",
            U: "..-",
            V: "...-",
            W: ".--",
            X: "-..-",
            Y: "-.--",
            Z: "--..",
            0: "-----",
            1: ".----",
            2: "..---",
            3: "...--",
            4: "....-",
            5: ".....",
            6: "-....",
            7: "--...",
            8: "---..",
            9: "----.",
            " ": "/",
            ".": ".-.-.-",
            ",": "--..--",
            "?": "..--..",
            "!": "-.-.--",
            "'": ".----.",
            '"': ".-..-.",
            "/": "-..-.",
            "(": "-.--.",
            ")": "-.--.-",
            "&": ".-...",
            ":": "---...",
            ";": "-.-.-.",
            "=": "-...-",
            "+": ".-.-.",
            "-": "-....-",
            _: "..--.-",
            "@": ".--.-."
          },
          encrypt: function (text) {
            var self = this;
            return text
              .toUpperCase()
              .split("")
              .map(function (char) {
                return self.code[char] || char;
              })
              .join(" ");
          },
          decrypt: function (text) {
            var self = this;
            var reverseCode = {};
            for (var key in self.code) {
              reverseCode[self.code[key]] = key;
            }
            return text
              .split(" ")
              .map(function (code) {
                if (code === "/") return " ";
                return reverseCode[code] || code;
              })
              .join("");
          }
        },

        binary: {
          encrypt: function (text) {
            return text
              .split("")
              .map(function (char) {
                return char.charCodeAt(0).toString(2).padStart(8, "0");
              })
              .join(" ");
          },
          decrypt: function (text) {
            return text
              .split(" ")
              .map(function (bin) {
                return String.fromCharCode(parseInt(bin, 2));
              })
              .join("");
          }
        },

        hex: {
          encrypt: function (text) {
            return text
              .split("")
              .map(function (char) {
                return char.charCodeAt(0).toString(16).padStart(2, "0");
              })
              .join(" ");
          },
          decrypt: function (text) {
            return text
              .split(" ")
              .map(function (hex) {
                return String.fromCharCode(parseInt(hex, 16));
              })
              .join("");
          }
        },

        unicode: {
          encrypt: function (text) {
            return text
              .split("")
              .map(function (char) {
                return "\\u" + char.charCodeAt(0).toString(16).padStart(4, "0");
              })
              .join("");
          },
          decrypt: function (text) {
            return text.replace(/\\u([0-9a-fA-F]{4})/g, function (match, hex) {
              return String.fromCharCode(parseInt(hex, 16));
            });
          }
        },

        atbash: {
          encrypt: function (text) {
            return text
              .split("")
              .map(function (char) {
                if (char.match(/[a-z]/)) {
                  return String.fromCharCode(219 - char.charCodeAt(0));
                }
                if (char.match(/[A-Z]/)) {
                  return String.fromCharCode(155 - char.charCodeAt(0));
                }
                return char;
              })
              .join("");
          },
          decrypt: function (text) {
            return this.encrypt(text); // Atbash is self-inverse
          }
        }
      };

      function simpleHash(str) {
        var hash = "";
        for (var i = 0; i < 32; i++) {
          var charSum = 0;
          for (var j = 0; j < str.length; j++) {
            charSum += str.charCodeAt(j) * (i + j + 1);
          }
          hash += String.fromCharCode((charSum % 94) + 33);
        }
        return hash;
      }

      function processText() {
        var input = document.getElementById("inputText").value;
        var key = document.getElementById("keyInput").value;
        var output = document.getElementById("outputText");

        if (!input) {
          showMessage("请输入文本", true);
          return;
        }

        try {
          var algorithm = algorithms[currentAlgorithm];
          var result;

          if (currentMode === "encrypt") {
            result = algorithm.encrypt(input, key);
          } else {
            result = algorithm.decrypt(input, key);
          }

          output.value = result;
          showMessage(currentMode === "encrypt" ? "加密成功" : "解密成功", false);
        } catch (e) {
          output.value = "";
          showMessage(e.message || "处理失败", true);
        }
      }

      // Auto-process on input (debounced)
      var timeout;
      document.getElementById("inputText").addEventListener("input", function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          if (document.getElementById("inputText").value) {
            processText();
          }
        }, 500);
      });

      // Initialize
      updateKeySection();
    
