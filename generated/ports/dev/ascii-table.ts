// @ts-nocheck
// Generated from tools/dev/ascii-table.html
// Source SHA-256: 6c23d95a71866944b19d5b9d72e651c5862100ece32d6e7cb75f0501365b0fa8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var ctrlNames = [
        "NUL (空)",
        "SOH (标题开始)",
        "STX (正文开始)",
        "ETX (正文结束)",
        "EOT (传输结束)",
        "ENQ (请求)",
        "ACK (确认)",
        "BEL (响铃)",
        "BS (退格)",
        "HT (水平制表)",
        "LF (换行)",
        "VT (垂直制表)",
        "FF (换页)",
        "CR (回车)",
        "SO (移出)",
        "SI (移入)",
        "DLE (数据链路转义)",
        "DC1 (设备控制1)",
        "DC2 (设备控制2)",
        "DC3 (设备控制3)",
        "DC4 (设备控制4)",
        "NAK (否认)",
        "SYN (同步)",
        "ETB (传输块结束)",
        "CAN (取消)",
        "EM (媒介结束)",
        "SUB (替换)",
        "ESC (转义)",
        "FS (文件分隔)",
        "GS (组分隔)",
        "RS (记录分隔)",
        "US (单元分隔)"
      ];

      var currentRange = "all";
      var searchTerm = "";

      function getCharDisplay(code) {
        if (code < 32) return ctrlNames[code].split(" ")[0];
        if (code === 32) return "SP";
        if (code === 127) return "DEL";
        if (code > 127 && code < 160) return "·";
        return String.fromCharCode(code);
      }

      function getDescription(code) {
        if (code < 32) return ctrlNames[code];
        if (code === 32) return "Space (空格)";
        if (code === 127) return "DEL (删除)";
        if (code >= 48 && code <= 57) return "数字 " + String.fromCharCode(code);
        if (code >= 65 && code <= 90) return "大写字母 " + String.fromCharCode(code);
        if (code >= 97 && code <= 122) return "小写字母 " + String.fromCharCode(code);
        if (code > 127) return "扩展 ASCII";
        return "标点/符号";
      }

      function buildTable() {
        var tbody = document.getElementById("tableBody");
        while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

        var start = 0,
          end = 127;
        if (currentRange === "ctrl") {
          start = 0;
          end = 31;
        } else if (currentRange === "print") {
          start = 32;
          end = 126;
        } else if (currentRange === "ext") {
          start = 128;
          end = 255;
        }

        for (var i = start; i <= end; i++) {
          var dec = i.toString();
          var hex = "0x" + i.toString(16).toUpperCase().padStart(2, "0");
          var oct = "0" + i.toString(8).padStart(3, "0");
          var bin = i.toString(2).padStart(8, "0");
          var char = getCharDisplay(i);
          var desc = getDescription(i);

          var match = !searchTerm;
          if (searchTerm) {
            var term = searchTerm.toLowerCase();
            match =
              dec.includes(term) ||
              hex.toLowerCase().includes(term) ||
              char.toLowerCase().includes(term) ||
              desc.toLowerCase().includes(term);
          }

          if (match) {
            var tr = document.createElement("tr");
            if (searchTerm) tr.className = "highlight";

            var tdDec = document.createElement("td");
            tdDec.textContent = dec;
            tr.appendChild(tdDec);

            var tdHex = document.createElement("td");
            tdHex.textContent = hex;
            tr.appendChild(tdHex);

            var tdOct = document.createElement("td");
            tdOct.textContent = oct;
            tr.appendChild(tdOct);

            var tdBin = document.createElement("td");
            tdBin.textContent = bin;
            tr.appendChild(tdBin);

            var tdChar = document.createElement("td");
            tdChar.className = i < 32 || i === 127 ? "char-display ctrl-char" : "char-display";
            tdChar.textContent = char;
            tr.appendChild(tdChar);

            var tdDesc = document.createElement("td");
            tdDesc.textContent = desc;
            tr.appendChild(tdDesc);

            tbody.appendChild(tr);
          }
        }
      }

      window.setRange = function (range) {
        currentRange = range;
        var tabs = document.querySelectorAll(".tab");
        tabs.forEach(function (tab) {
          tab.classList.toggle("active", tab.dataset.range === range);
        });
        buildTable();
      };

      window.filterTable = function () {
        searchTerm = document.getElementById("search").value.trim();
        buildTable();
      };

      buildTable();

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
    
