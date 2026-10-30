// @ts-nocheck
// Generated from tools/life/event-countdown.html
// Source SHA-256: b733fd3c1a462c854826cf3e12593c71a94719fe3f1019336985c8b0a945bf55
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const name = document.getElementById("eventName").value;
        const date = new Date(document.getElementById("eventDate").value);
        const now = new Date();
        const diff = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
        document.getElementById("result").textContent =
          diff > 0 ? `${name || "事件"}还有 ${diff} 天` : "已过期";
      }
    
