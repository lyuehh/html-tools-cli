// @ts-nocheck
// Generated from tools/generator/nanoid-generator.html
// Source SHA-256: e4d1fbf1702eb1c0b78773d57b623fe54192e871f9170585d4a511d240466eec
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const ALPHABETS = {
        default: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-",
        alphanumeric: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        lowercase: "abcdefghijklmnopqrstuvwxyz0123456789",
        hex: "0123456789abcdef",
        numbers: "0123456789"
      };

      // 存储生成的 ID，用于复制
      let generatedIds = [];

      document.getElementById("alphabet").addEventListener("change", (e) => {
        document.getElementById("customAlphabetGroup").style.display =
          e.target.value === "custom" ? "block" : "none";
      });

      function nanoid(size, alphabet) {
        const array = new Uint8Array(size);
        crypto.getRandomValues(array);
        let id = "";
        for (let i = 0; i < size; i++) {
          id += alphabet[array[i] % alphabet.length];
        }
        return id;
      }

      window.generate = function () {
        const length = parseInt(document.getElementById("length").value);
        const count = parseInt(document.getElementById("count").value);
        const alphabetType = document.getElementById("alphabet").value;
        const alphabet =
          alphabetType === "custom"
            ? document.getElementById("customAlphabet").value
            : ALPHABETS[alphabetType];

        generatedIds = [];
        for (let i = 0; i < count; i++) {
          generatedIds.push(nanoid(length, alphabet));
        }

        // 使用 DOM API 安全构建元素，避免 XSS
        const output = document.getElementById("output");
        output.innerHTML = "";
        generatedIds.forEach((id, i) => {
          const item = document.createElement("div");
          item.className = "id-item";

          const code = document.createElement("code");
          code.textContent = id;

          const btn = document.createElement("button");
          btn.textContent = "复制";
          btn.onclick = () => copyId(i);

          item.appendChild(code);
          item.appendChild(btn);
          output.appendChild(item);
        });

        // Calculate collision probability
        const bitsPerChar = Math.log2(alphabet.length);
        const totalBits = length * bitsPerChar;
        const speedInfo = totalBits >= 128 ? "非常安全" : totalBits >= 64 ? "安全" : "较弱";

        document.getElementById("info").innerHTML = `
        <strong>统计信息:</strong><br>
        字符集大小: ${alphabet.length} 字符<br>
        每字符熵: ${bitsPerChar.toFixed(2)} 位<br>
        总熵: ${totalBits.toFixed(0)} 位<br>
        安全性: ${speedInfo}<br>
        生日悖论碰撞概率: ~2^-${(totalBits / 2).toFixed(0)}
      `;
      };

      function copyId(index) {
        navigator.clipboard.writeText(generatedIds[index]);
      }

      window.copyAll = function () {
        navigator.clipboard.writeText(generatedIds.join("\n"));
      };

      generate();

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
    
