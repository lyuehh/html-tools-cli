// @ts-nocheck
// Generated from tools/diy/material-calculator.html
// Source SHA-256: c44c6dc06a0401296089b89ba9aefdb21b5a382fa64fb2ad39562a6ddfc925f3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calc() {
        const l = parseFloat(document.getElementById("length").value) || 0;
        const w = parseFloat(document.getElementById("width").value) || 0;
        const area = l * w;
        document.getElementById("result").textContent = `面积: ${area.toFixed(2)} 平方米`;
      }
    
