// @ts-nocheck
// Generated from tools/automotive/tire-pressure-calc.html
// Source SHA-256: f596b0b246e0bd8bb685156a64b8ae6663c3e66d02968bee4e6abecca9597399
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function convert() {
        const psi = parseFloat(document.getElementById("psi-input").value) || 0;
        const bar = psi / 14.504;
        const kpa = psi * 6.895;
        document.getElementById("bar").textContent = bar.toFixed(2);
        document.getElementById("kpa").textContent = kpa.toFixed(1);
      }

      function copyResult() {
        const psi = document.getElementById("psi-input").value;
        const bar = document.getElementById("bar").textContent;
        const kpa = document.getElementById("kpa").textContent;
        const text = `胎压转换结果：\nPSI: ${psi}\nBar: ${bar}\nkPa: ${kpa}`;
        navigator.clipboard.writeText(text).then(() => {
          alert("已复制到剪贴板！");
        });
      }

      function reset() {
        document.getElementById("psi-input").value = "32";
        convert();
      }

      convert();
    
