// @ts-nocheck
// Generated from tools/converter/number-base.html
// Source SHA-256: fb61086c1e8285c212f64a82e20e504dd28e9ee3e7eda63d02949c51cce28ec3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const t =
          document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      window.setBase = function (type, base) {
        document.getElementById(type + "Base").value = base;
        convert();
      };

      function convert() {
        const input = document.getElementById("inputValue");
        const value = input.value.trim().toUpperCase();
        const fromBase = parseInt(document.getElementById("fromBase").value);
        const toBase = parseInt(document.getElementById("toBase").value);

        input.classList.remove("error");

        if (!value) {
          document.getElementById("outputValue").value = "";
          document.getElementById("resultBox").style.display = "none";
          document.getElementById("allBases").innerHTML = "";
          return;
        }

        try {
          // Validate input for the given base
          const validChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, fromBase);
          const isValid = [...value].every((c) => validChars.includes(c));

          if (!isValid) {
            throw new Error("Invalid character for base " + fromBase);
          }

          // Convert to decimal first
          const decimal = parseInt(value, fromBase);

          if (isNaN(decimal)) {
            throw new Error("Invalid number");
          }

          // Convert to target base
          const result = decimal.toString(toBase).toUpperCase();
          document.getElementById("outputValue").value = result;

          document.getElementById("resultBox").style.display = "block";
          document.getElementById("resultValue").textContent = result;

          // Show all bases
          showAllBases(decimal);
        } catch (e) {
          input.classList.add("error");
          document.getElementById("outputValue").value = "错误";
          document.getElementById("resultBox").style.display = "none";
        }
      }

      function showAllBases(decimal) {
        const bases = [
          { base: 2, name: "二进制" },
          { base: 8, name: "八进制" },
          { base: 10, name: "十进制" },
          { base: 16, name: "十六进制" },
          { base: 32, name: "三十二进制" },
          { base: 36, name: "三十六进制" }
        ];

        const html = bases
          .map(
            ({ base, name }) => `
                <div class="base-item" onclick="copyValue('${decimal.toString(base).toUpperCase()}')">
                    <div class="label">${name} (Base ${base})</div>
                    <div class="value">${decimal.toString(base).toUpperCase()}</div>
                </div>
            `
          )
          .join("");

        document.getElementById("allBases").innerHTML = html;
      }

      window.swapBases = function () {
        const fromBase = document.getElementById("fromBase");
        const toBase = document.getElementById("toBase");
        const temp = fromBase.value;
        fromBase.value = toBase.value;
        toBase.value = temp;

        // Also swap the values
        const output = document.getElementById("outputValue").value;
        if (output && output !== "错误") {
          document.getElementById("inputValue").value = output;
        }
        convert();
      };

      window.copyResult = function () {
        const result = document.getElementById("resultValue").textContent;
        copyValue(result);
      };

      window.copyValue = function (value) {
        navigator.clipboard.writeText(value);
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      };

      convert();
    
