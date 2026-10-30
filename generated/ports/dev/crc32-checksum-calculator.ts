// @ts-nocheck
// Generated from tools/dev/crc32-checksum-calculator.html
// Source SHA-256: 99ed56882369fa8ee9487f1956780d3133e53fa094f3e873beb46e652b4bc747
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ── CRC-32 lookup table (IEEE 802.3 polynomial 0xEDB88320) ──
      var crc32Table = (function () {
        var table = new Uint32Array(256);
        for (var i = 0; i < 256; i++) {
          var c = i;
          for (var k = 0; k < 8; k++) {
            c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
          }
          table[i] = c;
        }
        return table;
      })();

      function crc32(bytes) {
        var crc = 0xffffffff;
        for (var i = 0; i < bytes.length; i++) {
          crc = crc32Table[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
        }
        return (crc ^ 0xffffffff) >>> 0;
      }

      function adler32(bytes) {
        var MOD_ADLER = 65521;
        var a = 1;
        var b = 0;
        for (var i = 0; i < bytes.length; i++) {
          a = (a + bytes[i]) % MOD_ADLER;
          b = (b + a) % MOD_ADLER;
        }
        return ((b << 16) | a) >>> 0;
      }

      function fnv1a32(bytes) {
        var hash = 0x811c9dc5;
        for (var i = 0; i < bytes.length; i++) {
          hash = hash ^ bytes[i];
          hash =
            (hash + (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)) >>> 0;
        }
        return hash >>> 0;
      }

      function fnv1a64Hex(bytes) {
        if (typeof BigInt === "undefined") return null;
        var hash = BigInt("0xcbf29ce484222325");
        var prime = BigInt("0x00000100000001b3");
        var mask = BigInt("0xffffffffffffffff");
        for (var i = 0; i < bytes.length; i++) {
          hash = (hash ^ BigInt(bytes[i])) & mask;
          hash = (hash * prime) & mask;
        }
        return hash.toString(16).padStart(16, "0");
      }

      var crc16Table = (function () {
        var table = new Uint16Array(256);
        for (var i = 0; i < 256; i++) {
          var crc = i << 8;
          for (var j = 0; j < 8; j++) {
            crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
          }
          table[i] = crc & 0xffff;
        }
        return table;
      })();

      function crc16(bytes) {
        var crc = 0xffff;
        for (var i = 0; i < bytes.length; i++) {
          crc = ((crc << 8) ^ crc16Table[((crc >> 8) ^ bytes[i]) & 0xff]) & 0xffff;
        }
        return crc;
      }

      function encodeText(text, encoding) {
        if (encoding === "latin1") {
          var arr = new Uint8Array(text.length);
          for (var i = 0; i < text.length; i++) {
            arr[i] = text.charCodeAt(i) & 0xff;
          }
          return arr;
        }
        return new TextEncoder().encode(text);
      }

      function formatHex(num, bits, upper) {
        var digits = bits / 4;
        var hex = num.toString(16).padStart(digits, "0");
        return upper ? hex.toUpperCase() : hex;
      }

      function formatSize(byteCount) {
        if (byteCount < 1024) return byteCount + " B";
        if (byteCount < 1048576) return (byteCount / 1024).toFixed(2) + " KB";
        return (byteCount / 1048576).toFixed(2) + " MB";
      }

      var currentBytes = null;
      var currentFileName = null;

      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");
      var resultsGrid = document.getElementById("resultsGrid");
      var resultsEmpty = document.getElementById("resultsEmpty");
      var inputTextEl = document.getElementById("inputText");
      var encodingEl = document.getElementById("encoding");
      var upperCaseEl = document.getElementById("upperCase");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function showStats(sizeLabel) {
        document.getElementById("statBytes").textContent = sizeLabel;
        statsEl.classList.add("show");
      }

      function buildResultCard(algo, desc, hexVal, decVal, bits) {
        var card = document.createElement("div");
        card.className = "result-card";

        var algoEl = document.createElement("div");
        algoEl.className = "result-algo";
        algoEl.textContent = algo;
        card.appendChild(algoEl);

        var valEl = document.createElement("div");
        valEl.className = "result-value";
        valEl.textContent = "0x" + hexVal;
        card.appendChild(valEl);

        var metaEl = document.createElement("div");
        metaEl.className = "result-meta";
        metaEl.textContent =
          (decVal !== null ? "十进制: " + decVal : "") + (bits ? " | " + bits + "-bit" : "");
        card.appendChild(metaEl);

        if (desc) {
          var descEl = document.createElement("div");
          descEl.className = "result-meta";
          descEl.textContent = desc;
          card.appendChild(descEl);
        }

        var copyBtn = document.createElement("button");
        copyBtn.className = "result-copy";
        copyBtn.textContent = "复制十六进制";
        (function (btn, val) {
          btn.addEventListener("click", function () {
            navigator.clipboard.writeText("0x" + val).then(
              function () {
                btn.textContent = "已复制!";
                setTimeout(function () {
                  btn.textContent = "复制十六进制";
                }, 1500);
              },
              function () {
                btn.textContent = "复制失败";
              }
            );
          });
        })(copyBtn, hexVal);
        card.appendChild(copyBtn);

        return card;
      }

      function computeAndRender(bytes, sizeLabel) {
        var upper = upperCaseEl.checked;
        var c32 = crc32(bytes);
        var a32 = adler32(bytes);
        var fnv32 = fnv1a32(bytes);
        var fnv64val = fnv1a64Hex(bytes);
        var c16 = crc16(bytes);

        resultsGrid.innerHTML = "";

        resultsGrid.appendChild(
          buildResultCard(
            "CRC-32",
            "IEEE 802.3 / ZIP / zlib 标准多项式",
            formatHex(c32, 32, upper),
            c32.toString(10),
            "32"
          )
        );
        resultsGrid.appendChild(
          buildResultCard(
            "Adler-32",
            "zlib / PNG 格式使用，速度快",
            formatHex(a32, 32, upper),
            a32.toString(10),
            "32"
          )
        );
        resultsGrid.appendChild(
          buildResultCard(
            "FNV-1a 32-bit",
            "Fowler-Noll-Vo，哈希表常用",
            formatHex(fnv32, 32, upper),
            fnv32.toString(10),
            "32"
          )
        );

        if (fnv64val !== null) {
          var fnv64Display = upper ? fnv64val.toUpperCase() : fnv64val;
          resultsGrid.appendChild(
            buildResultCard(
              "FNV-1a 64-bit",
              "64-bit 大哈希空间，碰撞率更低",
              fnv64Display,
              null,
              "64"
            )
          );
        }

        resultsGrid.appendChild(
          buildResultCard(
            "CRC-16 CCITT",
            "串口通信、XMODEM 协议使用",
            formatHex(c16, 16, upper),
            c16.toString(10),
            "16"
          )
        );

        resultsEmpty.style.display = "none";
        resultsGrid.style.display = "";
        showStats(sizeLabel);
        showStatus("计算完成 — " + bytes.length + " 字节", "success");
      }

      function calculateFromText() {
        var text = inputTextEl.value;
        if (!text) {
          showStatus("请输入文本", "error");
          return;
        }
        var bytes = encodeText(text, encodingEl.value);
        currentBytes = bytes;
        currentFileName = null;
        computeAndRender(bytes, formatSize(bytes.length));
      }

      var debounceTimer = null;
      inputTextEl.addEventListener("input", function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
          if (inputTextEl.value) calculateFromText();
        }, 300);
      });

      encodingEl.addEventListener("change", function () {
        if (inputTextEl.value) calculateFromText();
      });

      upperCaseEl.addEventListener("change", function () {
        if (currentBytes) {
          var label = currentFileName !== null ? currentFileName : formatSize(currentBytes.length);
          computeAndRender(currentBytes, label);
        }
      });

      document.getElementById("btnCalculate").onclick = function () {
        var activeTab = document.getElementById("tabText").classList.contains("active")
          ? "text"
          : "file";
        if (activeTab === "text") {
          calculateFromText();
        } else if (currentBytes) {
          computeAndRender(currentBytes, currentFileName || formatSize(currentBytes.length));
        } else {
          showStatus("请先选择文件", "error");
        }
      };

      document.getElementById("btnPaste").onclick = async function () {
        try {
          var text = await navigator.clipboard.readText();
          inputTextEl.value = text;
          if (text) calculateFromText();
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        inputTextEl.value = "";
        currentBytes = null;
        currentFileName = null;
        resultsGrid.innerHTML = "";
        resultsGrid.style.display = "none";
        resultsEmpty.style.display = "";
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
        document.getElementById("fileInput").value = "";
      };

      document.getElementById("btnCopyAll").onclick = async function () {
        if (!currentBytes) {
          showStatus("没有计算结果", "error");
          return;
        }
        var upper = upperCaseEl.checked;
        var c32 = crc32(currentBytes);
        var a32 = adler32(currentBytes);
        var fnv32 = fnv1a32(currentBytes);
        var fnv64val = fnv1a64Hex(currentBytes);
        var c16 = crc16(currentBytes);
        var fnv64Str =
          fnv64val !== null ? "0x" + (upper ? fnv64val.toUpperCase() : fnv64val) : "N/A";
        var lines = [
          "CRC-32:       0x" + formatHex(c32, 32, upper) + " (" + c32 + ")",
          "Adler-32:     0x" + formatHex(a32, 32, upper) + " (" + a32 + ")",
          "FNV-1a 32bit: 0x" + formatHex(fnv32, 32, upper) + " (" + fnv32 + ")",
          "FNV-1a 64bit: " + fnv64Str,
          "CRC-16 CCITT: 0x" + formatHex(c16, 16, upper) + " (" + c16 + ")"
        ];
        try {
          await navigator.clipboard.writeText(lines.join("\n"));
          showStatus("已复制全部结果", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("tabText").onclick = function () {
        document.getElementById("tabText").classList.add("active");
        document.getElementById("tabFile").classList.remove("active");
        document.getElementById("sectionText").classList.add("active");
        document.getElementById("sectionFile").classList.remove("active");
      };
      document.getElementById("tabFile").onclick = function () {
        document.getElementById("tabFile").classList.add("active");
        document.getElementById("tabText").classList.remove("active");
        document.getElementById("sectionFile").classList.add("active");
        document.getElementById("sectionText").classList.remove("active");
      };

      function handleFile(file) {
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (e) {
          var buffer = e.target.result;
          var bytes = new Uint8Array(buffer);
          currentBytes = bytes;
          currentFileName = file.name + " (" + formatSize(file.size) + ")";
          computeAndRender(bytes, currentFileName);
        };
        reader.onerror = function () {
          showStatus("文件读取失败", "error");
        };
        reader.readAsArrayBuffer(file);
      }

      document.getElementById("fileInput").addEventListener("change", function (e) {
        var file = e.target.files && e.target.files[0];
        if (file) handleFile(file);
      });

      var dropZone = document.getElementById("dropZone");
      dropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropZone.classList.add("drag-over");
      });
      dropZone.addEventListener("dragleave", function () {
        dropZone.classList.remove("drag-over");
      });
      dropZone.addEventListener("drop", function (e) {
        e.preventDefault();
        dropZone.classList.remove("drag-over");
        var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (file) {
          document.getElementById("tabFile").click();
          handleFile(file);
        }
      });

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
