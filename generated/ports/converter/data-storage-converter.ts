// @ts-nocheck
// Generated from tools/converter/data-storage-converter.html
// Source SHA-256: 839704a50c6b5b52848b2308cde7b84acb1e1a15f2ff85ac53cdb55a47bca0ba
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const units = {
        bit: 1 / 8,
        byte: 1,
        kb: 1000,
        mb: 1000000,
        gb: 1000000000,
        tb: 1000000000000,
        pb: 1000000000000000,
        kib: 1024,
        mib: 1048576,
        gib: 1073741824,
        tib: 1099511627776
      };
      const labels = {
        bit: "比特 (bit)",
        byte: "字节 (Byte)",
        kb: "千字节 (KB)",
        mb: "兆字节 (MB)",
        gb: "吉字节 (GB)",
        tb: "太字节 (TB)",
        pb: "拍字节 (PB)",
        kib: "KiB",
        mib: "MiB",
        gib: "GiB",
        tib: "TiB"
      };
      function convert() {
        const value = parseFloat(document.getElementById("value").value) || 0;
        const unit = document.getElementById("unit").value;
        const bytes = value * units[unit];
        let html = "";
        for (const [key, factor] of Object.entries(units)) {
          const result = bytes / factor;
          const formatted =
            result < 0.0001
              ? result.toExponential(4)
              : result > 999999
                ? result.toExponential(4)
                : result.toLocaleString("zh-CN", { maximumFractionDigits: 6 });
          html += `<div class="result-item"><span class="result-label">${labels[key]}</span><span class="result-value">${formatted}</span></div>`;
        }
        document.getElementById("results").innerHTML = html;
      }
      document.getElementById("value").addEventListener("input", convert);
      document.getElementById("unit").addEventListener("change", convert);
      convert();
    
