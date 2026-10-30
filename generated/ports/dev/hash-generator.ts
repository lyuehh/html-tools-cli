// @ts-nocheck
// Generated from tools/dev/hash-generator.html
// Source SHA-256: 0a20ceb7e7e48d04e01f85b2ff80b2a167fc22e998dd13dac1bff55078f25613
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Elements
      // ============================================
      const inputEl = document.getElementById("input");
      const statusEl = document.getElementById("status");
      const fileInput = document.getElementById("fileInput");
      const fileNameEl = document.getElementById("fileName");
      const fileStatusEl = document.getElementById("fileStatus");
      const fileResultsEl = document.getElementById("fileResults");
      const encodingEl = document.getElementById("encoding");
      const outputCaseEl = document.getElementById("outputCase");

      // ============================================
      // MD5 Implementation
      // ============================================
      const MD5 = (function () {
        function safeAdd(x, y) {
          const lsw = (x & 0xffff) + (y & 0xffff);
          const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
          return (msw << 16) | (lsw & 0xffff);
        }
        function bitRotateLeft(num, cnt) {
          return (num << cnt) | (num >>> (32 - cnt));
        }
        function md5cmn(q, a, b, x, s, t) {
          return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
        }
        function md5ff(a, b, c, d, x, s, t) {
          return md5cmn((b & c) | (~b & d), a, b, x, s, t);
        }
        function md5gg(a, b, c, d, x, s, t) {
          return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
        }
        function md5hh(a, b, c, d, x, s, t) {
          return md5cmn(b ^ c ^ d, a, b, x, s, t);
        }
        function md5ii(a, b, c, d, x, s, t) {
          return md5cmn(c ^ (b | ~d), a, b, x, s, t);
        }
        function binlMD5(x, len) {
          x[len >> 5] |= 0x80 << (len % 32);
          x[(((len + 64) >>> 9) << 4) + 14] = len;
          let a = 1732584193,
            b = -271733879,
            c = -1732584194,
            d = 271733878;
          for (let i = 0; i < x.length; i += 16) {
            const olda = a,
              oldb = b,
              oldc = c,
              oldd = d;
            a = md5ff(a, b, c, d, x[i], 7, -680876936);
            d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5gg(b, c, d, a, x[i], 20, -373897302);
            a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = md5ii(a, b, c, d, x[i], 6, -198630844);
            d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = safeAdd(a, olda);
            b = safeAdd(b, oldb);
            c = safeAdd(c, oldc);
            d = safeAdd(d, oldd);
          }
          return [a, b, c, d];
        }
        function binl2hex(binarray) {
          const hexTab = "0123456789abcdef";
          let str = "";
          for (let i = 0; i < binarray.length * 4; i++) {
            str +=
              hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xf) +
              hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xf);
          }
          return str;
        }
        function str2binl(str) {
          const bin = [];
          const mask = (1 << 8) - 1;
          for (let i = 0; i < str.length * 8; i += 8) {
            bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (i % 32);
          }
          return bin;
        }
        function utf8Encode(str) {
          return unescape(encodeURIComponent(str));
        }
        return function (str) {
          return binl2hex(binlMD5(str2binl(utf8Encode(str)), utf8Encode(str).length * 8));
        };
      })();

      // ============================================
      // SHA Implementation
      // ============================================
      async function sha(algorithm, text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      }

      async function shaFile(algorithm, file) {
        const arrayBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest(algorithm, arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      }

      // ============================================
      // MD5 for File
      // ============================================
      function md5File(file) {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const binary = e.target.result;
            resolve(MD5(binary));
          };
          reader.readAsBinaryString(file);
        });
      }

      // ============================================
      // Utilities
      // ============================================
      function formatHash(hash) {
        return outputCaseEl.value === "upper" ? hash.toUpperCase() : hash.toLowerCase();
      }

      function showStatus(el, msg, type) {
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
      }

      // ============================================
      // Hash Calculation
      // ============================================
      async function calculateHash() {
        const text = inputEl.value;
        if (!text) {
          showStatus(statusEl, "请输入内容", "error");
          return;
        }

        try {
          const md5 = formatHash(MD5(text));
          const sha1 = formatHash(await sha("SHA-1", text));
          const sha256 = formatHash(await sha("SHA-256", text));
          const sha512 = formatHash(await sha("SHA-512", text));

          document.getElementById("md5").textContent = md5;
          document.getElementById("sha1").textContent = sha1;
          document.getElementById("sha256").textContent = sha256;
          document.getElementById("sha512").textContent = sha512;

          showStatus(statusEl, "计算完成", "success");
        } catch (e) {
          showStatus(statusEl, "计算失败: " + e.message, "error");
        }
      }

      async function calculateFileHash(file) {
        try {
          showStatus(fileStatusEl, "正在计算...", "");
          fileResultsEl.style.display = "none";

          const md5 = formatHash(await md5File(file));
          const sha1 = formatHash(await shaFile("SHA-1", file));
          const sha256 = formatHash(await shaFile("SHA-256", file));
          const sha512 = formatHash(await shaFile("SHA-512", file));

          document.getElementById("fileMd5").textContent = md5;
          document.getElementById("fileSha1").textContent = sha1;
          document.getElementById("fileSha256").textContent = sha256;
          document.getElementById("fileSha512").textContent = sha512;

          fileResultsEl.style.display = "block";
          showStatus(fileStatusEl, "文件哈希计算完成", "success");
        } catch (e) {
          showStatus(fileStatusEl, "计算失败: " + e.message, "error");
        }
      }

      // ============================================
      // Event Handlers
      // ============================================
      document.getElementById("btnPaste").onclick = async () => {
        try {
          const text = await navigator.clipboard.readText();
          inputEl.value = text;
          showStatus(statusEl, "已粘贴", "success");
          calculateHash();
        } catch (e) {
          showStatus(statusEl, "无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnHash").onclick = calculateHash;

      document.getElementById("btnClear").onclick = () => {
        inputEl.value = "";
        fileNameEl.textContent = "";
        fileInput.value = "";
        document.getElementById("md5").textContent = "-";
        document.getElementById("sha1").textContent = "-";
        document.getElementById("sha256").textContent = "-";
        document.getElementById("sha512").textContent = "-";
        document.getElementById("fileMd5").textContent = "-";
        document.getElementById("fileSha1").textContent = "-";
        document.getElementById("fileSha256").textContent = "-";
        document.getElementById("fileSha512").textContent = "-";
        fileResultsEl.style.display = "none";
        showStatus(statusEl, "已清空", "success");
      };

      // Copy buttons
      document.querySelectorAll(".hash-copy").forEach((btn) => {
        btn.onclick = async () => {
          const targetId = btn.dataset.target;
          const value = document.getElementById(targetId).textContent;
          if (value === "-") {
            showStatus(statusEl, "没有可复制的内容", "error");
            return;
          }
          try {
            await navigator.clipboard.writeText(value);
            showStatus(statusEl, targetId.toUpperCase() + " 已复制", "success");
          } catch (e) {
            showStatus(statusEl, "复制失败", "error");
          }
        };
      });

      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          fileNameEl.textContent = file.name + " (" + formatSize(file.size) + ")";
          calculateFileHash(file);
        }
      };

      // Real-time calculation
      inputEl.addEventListener("input", () => {
        if (inputEl.value) {
          calculateHash();
        }
      });

      outputCaseEl.addEventListener("change", () => {
        if (inputEl.value) {
          calculateHash();
        }
      });

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Initialize
      // ============================================
      initTheme();
    
