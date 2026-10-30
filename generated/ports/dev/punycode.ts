// @ts-nocheck
// Generated from tools/dev/punycode.html
// Source SHA-256: 6dc7e006e14931acb304640ef50dee1c95f58669fff31e564373a53c68059e06
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Punycode implementation
      const punycode = {
        base: 36,
        tmin: 1,
        tmax: 26,
        skew: 38,
        damp: 700,
        initialBias: 72,
        initialN: 128,
        delimiter: "-",

        decode(input) {
          const output = [];
          let i = 0,
            n = this.initialN,
            bias = this.initialBias;
          let basic = input.lastIndexOf(this.delimiter);
          if (basic < 0) basic = 0;
          for (let j = 0; j < basic; ++j) {
            output.push(input.charCodeAt(j));
          }
          for (let index = basic > 0 ? basic + 1 : 0; index < input.length;) {
            let oldi = i;
            for (let w = 1, k = this.base; ; k += this.base) {
              const digit = this.digitToBasic(input.charCodeAt(index++));
              i += digit * w;
              const t = k <= bias ? this.tmin : k >= bias + this.tmax ? this.tmax : k - bias;
              if (digit < t) break;
              w *= this.base - t;
            }
            const out = output.length + 1;
            bias = this.adapt(i - oldi, out, oldi === 0);
            n += Math.floor(i / out);
            i %= out;
            output.splice(i++, 0, n);
          }
          return String.fromCodePoint(...output);
        },

        encode(input) {
          const output = [];
          input = [...input].map((c) => c.codePointAt(0));
          let n = this.initialN,
            delta = 0,
            bias = this.initialBias;
          for (const c of input) if (c < 128) output.push(String.fromCharCode(c));
          const basicLength = output.length;
          let handledCPCount = basicLength;
          if (basicLength) output.push(this.delimiter);
          while (handledCPCount < input.length) {
            let m = Infinity;
            for (const c of input) if (c >= n && c < m) m = c;
            delta += (m - n) * (handledCPCount + 1);
            n = m;
            for (const c of input) {
              if (c < n) ++delta;
              if (c === n) {
                let q = delta;
                for (let k = this.base; ; k += this.base) {
                  const t = k <= bias ? this.tmin : k >= bias + this.tmax ? this.tmax : k - bias;
                  if (q < t) break;
                  output.push(
                    String.fromCharCode(this.basicToDigit(t + ((q - t) % (this.base - t))))
                  );
                  q = Math.floor((q - t) / (this.base - t));
                }
                output.push(String.fromCharCode(this.basicToDigit(q)));
                bias = this.adapt(delta, handledCPCount + 1, handledCPCount === basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
            ++delta;
            ++n;
          }
          return output.join("");
        },

        adapt(delta, numPoints, firstTime) {
          delta = firstTime ? Math.floor(delta / this.damp) : delta >> 1;
          delta += Math.floor(delta / numPoints);
          let k = 0;
          while (delta > ((this.base - this.tmin) * this.tmax) >> 1) {
            delta = Math.floor(delta / (this.base - this.tmin));
            k += this.base;
          }
          return Math.floor(k + ((this.base - this.tmin + 1) * delta) / (delta + this.skew));
        },

        digitToBasic(cp) {
          return cp - 48 < 10
            ? cp - 22
            : cp - 65 < 26
              ? cp - 65
              : cp - 97 < 26
                ? cp - 97
                : this.base;
        },

        basicToDigit(digit) {
          return digit + 22 + 75 * (digit < 26);
        }
      };

      function domainToPunycode(domain) {
        return domain
          .split(".")
          .map((label) => {
            if (/[^\x00-\x7F]/.test(label)) {
              return "xn--" + punycode.encode(label);
            }
            return label;
          })
          .join(".");
      }

      function domainToUnicode(domain) {
        return domain
          .split(".")
          .map((label) => {
            if (label.toLowerCase().startsWith("xn--")) {
              try {
                return punycode.decode(label.slice(4));
              } catch (e) {
                return label;
              }
            }
            return label;
          })
          .join(".");
      }

      function toPunycode() {
        const input = document.getElementById("unicodeInput").value.trim();
        if (!input) return;
        const result = domainToPunycode(input);
        document.getElementById("punycodeInput").value = result;
        updateInfo();
      }

      window.toUnicode = function () {
        const input = document.getElementById("punycodeInput").value.trim();
        if (!input) return;
        const result = domainToUnicode(input);
        document.getElementById("unicodeInput").value = result;
        updateInfo();
      };

      function updateInfo() {
        const unicode = document.getElementById("unicodeInput").value;
        const puny = document.getElementById("punycodeInput").value;
        document.getElementById("unicodeInfo").textContent = unicode
          ? `字符数: ${[...unicode].length}`
          : "";
        document.getElementById("punycodeInfo").textContent = puny
          ? `长度: ${puny.length} 字符`
          : "";
      }

      window.copyResult = function () {
        const puny = document.getElementById("punycodeInput").value;
        if (puny) {
          navigator.clipboard.writeText(puny);
          event.target.textContent = "✓ 已复制";
          setTimeout(() => (event.target.textContent = "📋 复制结果"), 2000);
        }
      };

      // Example buttons
      document.querySelectorAll(".example-btn").forEach((btn) => {
        btn.onclick = () => {
          document.getElementById("unicodeInput").value = btn.dataset.unicode;
          toPunycode();
        };
      });

      // Auto convert on input
      document.getElementById("unicodeInput").addEventListener("input", () => {
        clearTimeout(window.convertTimeout);
        window.convertTimeout = setTimeout(toPunycode, 300);
      });

      // Theme toggle
      const theme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", theme);
      document.getElementById("themeToggle").textContent = theme === "dark" ? "☀️" : "🌙";
      document.getElementById("themeToggle").onclick = () => {
        const next =
          document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        document.getElementById("themeToggle").textContent = next === "dark" ? "☀️" : "🌙";
      };

      // Initial conversion
      toPunycode();

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
    
