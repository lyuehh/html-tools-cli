// @ts-nocheck
// Generated from tools/network/whois-lookup.html
// Source SHA-256: 9db1deebe25271feefec667fade2d4bab674a969f384ef3e1757cc5d1f970d1a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function lookup() {
        const domain = document.getElementById("domain").value.trim();
        if (!domain) return;
        // 模拟数据
        const data = [
          { label: "域名", value: domain },
          { label: "注册商", value: "Example Registrar Inc." },
          { label: "注册日期", value: "2020-01-15" },
          { label: "到期日期", value: "2025-01-15" },
          { label: "更新日期", value: "2024-01-10" },
          { label: "状态", value: "clientTransferProhibited" },
          { label: "DNS服务器", value: "ns1.example.com, ns2.example.com" }
        ];
        document.getElementById("result").innerHTML = data
          .map(
            (d) =>
              '<div class="result-item"><div class="result-label">' +
              d.label +
              '</div><div class="result-value">' +
              d.value +
              "</div></div>"
          )
          .join("");
      }
    
