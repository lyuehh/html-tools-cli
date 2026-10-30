// @ts-nocheck
// Generated from tools/dev/chmod-calculator.html
// Source SHA-256: d56d2438819cdf676017bb6e3fda37542a2e6216e80f5e5818bca4bc99ee0bf3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calc() {
        const o =
          (document.getElementById("or").checked ? 4 : 0) +
          (document.getElementById("ow").checked ? 2 : 0) +
          (document.getElementById("ox").checked ? 1 : 0);
        const g =
          (document.getElementById("gr").checked ? 4 : 0) +
          (document.getElementById("gw").checked ? 2 : 0) +
          (document.getElementById("gx").checked ? 1 : 0);
        const t =
          (document.getElementById("tr").checked ? 4 : 0) +
          (document.getElementById("tw").checked ? 2 : 0) +
          (document.getElementById("tx").checked ? 1 : 0);
        const numeric = `${o}${g}${t}`;
        const toSymbolic = (n) => (n & 4 ? "r" : "-") + (n & 2 ? "w" : "-") + (n & 1 ? "x" : "-");
        const symbolic = toSymbolic(o) + toSymbolic(g) + toSymbolic(t);
        document.getElementById("numeric").textContent = numeric;
        document.getElementById("symbolic").textContent = symbolic;
        document.getElementById("command").textContent = `chmod ${numeric} filename`;
      }
      function setPerms(o, g, t) {
        document.getElementById("or").checked = o & 4;
        document.getElementById("ow").checked = o & 2;
        document.getElementById("ox").checked = o & 1;
        document.getElementById("gr").checked = g & 4;
        document.getElementById("gw").checked = g & 2;
        document.getElementById("gx").checked = g & 1;
        document.getElementById("tr").checked = t & 4;
        document.getElementById("tw").checked = t & 2;
        document.getElementById("tx").checked = t & 1;
        calc();
      }
      function copyCommand() {
        const command = document.getElementById("command").textContent;
        navigator.clipboard.writeText(command).then(() => {
          const btn = event.target;
          const originalText = btn.textContent;
          btn.textContent = "✅ 已复制！";
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        });
      }
      function resetPerms() {
        setPerms(7, 5, 5); // 默认 755
      }
      calc();
    
