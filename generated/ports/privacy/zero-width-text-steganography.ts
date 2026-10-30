// @ts-nocheck
// Generated from tools/privacy/zero-width-text-steganography.html
// Source SHA-256: d0021ed5eee4bab8e3e9ca0fa55fabf83fbb6efd37db2f1f9f0697738d007fa0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 零宽字符常量 — 使用转义序列避免被编辑器意外剥离
      var ZW_ZWSP = "​"; // ZERO WIDTH SPACE         → bit 0 / digit 0
      var ZW_ZWNJ = "‌"; // ZERO WIDTH NON-JOINER    → bit 1 / digit 1
      var ZW_ZWJ = "‍"; // ZERO WIDTH JOINER        → digit 2 (ternary)
      var ZW_FEFF = "﻿"; // BYTE ORDER MARK (BOM)
      var ZW_WJ = "⁠"; // WORD JOINER

      var ZW_SET = new Set([ZW_ZWSP, ZW_ZWNJ, ZW_ZWJ, ZW_FEFF, ZW_WJ]);

      // DOM refs
      var modeSelect = document.getElementById("modeSelect");
      var encodingMethodEl = document.getElementById("encodingMethod");
      var insertPosEl = document.getElementById("insertPos");
      var carrierInputEl = document.getElementById("carrierInput");
      var secretInputEl = document.getElementById("secretInput");
      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");
      var detectPanelEl = document.getElementById("detectPanel");
      var detectResultEl = document.getElementById("detectResult");
      var encodingMethodWrap = document.getElementById("encodingMethodWrap");
      var insertPosWrap = document.getElementById("insertPosWrap");
      var leftLabelEl = document.getElementById("leftLabel");
      var rightLabelEl = document.getElementById("rightLabel");

      // ── 编码：文本 → 零宽字符序列 ──────────────────
      function textToZeroWidth(secret, method) {
        var result = [];
        var i = 0;
        while (i < secret.length) {
          var cp = secret.codePointAt(i);
          i += cp > 0xffff ? 2 : 1;
          if (method === "ternary") {
            // 14 位三进制（3^14 = 4782969 > 0x10FFFF）
            var digits = [];
            var n = cp;
            for (var d = 0; d < 14; d++) {
              digits.unshift(n % 3);
              n = Math.floor(n / 3);
            }
            for (var j = 0; j < digits.length; j++) {
              if (digits[j] === 0) result.push(ZW_ZWSP);
              else if (digits[j] === 1) result.push(ZW_ZWNJ);
              else result.push(ZW_ZWJ);
            }
          } else {
            // 16 位二进制
            var bits = cp.toString(2).padStart(16, "0");
            for (var b = 0; b < bits.length; b++) {
              result.push(bits[b] === "0" ? ZW_ZWSP : ZW_ZWNJ);
            }
          }
        }
        return result.join("");
      }

      // ── 插入：嵌入载体文本 ──────────────────────────
      function embedInCarrier(carrier, zwSeq, pos) {
        if (!carrier) return zwSeq;
        if (pos === "end") return carrier + zwSeq;
        if (pos === "after-first") {
          var idx = carrier.search(/\s/);
          if (idx === -1) return carrier + zwSeq;
          return carrier.slice(0, idx) + zwSeq + carrier.slice(idx);
        }
        // between-words
        var parts = carrier.split(/(\s+)/);
        if (parts.length <= 1) return carrier + zwSeq;
        var chunk = Math.ceil(zwSeq.length / (Math.floor(parts.length / 2) + 1));
        var out = "";
        var pos2 = 0;
        for (var wi = 0; wi < parts.length; wi++) {
          out += parts[wi];
          if (wi % 2 === 0 && pos2 < zwSeq.length) {
            out += zwSeq.slice(pos2, pos2 + chunk);
            pos2 += chunk;
          }
        }
        if (pos2 < zwSeq.length) out += zwSeq.slice(pos2);
        return out;
      }

      // ── 解码：提取零宽序列 → 还原文本 ───────────────
      function extractZeroWidth(text) {
        var seq = [];
        for (var i = 0; i < text.length; i++) {
          var c = text[i];
          if (c === ZW_ZWSP || c === ZW_ZWNJ || c === ZW_ZWJ) seq.push(c);
        }
        return seq;
      }

      function zeroWidthToText(seq, method) {
        if (seq.length === 0) return "";
        var result = "";
        var step = method === "ternary" ? 14 : 16;
        for (var i = 0; i + step <= seq.length; i += step) {
          var chunk = seq.slice(i, i + step);
          var n = 0;
          if (method === "ternary") {
            for (var j = 0; j < chunk.length; j++) {
              var digit = chunk[j] === ZW_ZWSP ? 0 : chunk[j] === ZW_ZWNJ ? 1 : 2;
              n = n * 3 + digit;
            }
          } else {
            var bits = chunk.map(function (c) {
              return c === ZW_ZWSP ? "0" : "1";
            });
            n = parseInt(bits.join(""), 2);
          }
          if (n === 0) continue;
          try {
            result += String.fromCodePoint(n);
          } catch (e) {
            result += "?";
          }
        }
        return result;
      }

      // ── 检测：可视化零宽字符 ─────────────────────────
      function buildDetectHTML(text) {
        var html = "";
        for (var i = 0; i < text.length; i++) {
          var c = text[i];
          if (c === ZW_ZWSP) {
            html += '<span class="zw-highlight zw-200b">ZWSP</span>';
          } else if (c === ZW_ZWNJ) {
            html += '<span class="zw-highlight zw-200c">ZWNJ</span>';
          } else if (c === ZW_ZWJ) {
            html += '<span class="zw-highlight zw-200d">ZWJ</span>';
          } else if (c === ZW_FEFF) {
            html += '<span class="zw-highlight zw-feff">BOM</span>';
          } else if (c === ZW_WJ) {
            html += '<span class="zw-highlight zw-2060">WJ</span>';
          } else if (ZW_SET.has(c)) {
            html += '<span class="zw-highlight zw-other">ZW?</span>';
          } else if (c === "&") {
            html += "&amp;";
          } else if (c === "<") {
            html += "&lt;";
          } else if (c === ">") {
            html += "&gt;";
          } else {
            html += c;
          }
        }
        return html;
      }

      function countZeroWidth(text) {
        var count = 0;
        for (var i = 0; i < text.length; i++) {
          if (ZW_SET.has(text[i])) count++;
        }
        return count;
      }

      function stripZeroWidth(text) {
        var out = "";
        for (var i = 0; i < text.length; i++) {
          if (!ZW_SET.has(text[i])) out += text[i];
        }
        return out;
      }

      // ── UI helpers ───────────────────────────────────
      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function showStats(zwCount, carrierCount, secretBits) {
        document.getElementById("statZW").textContent = zwCount;
        document.getElementById("statCarrier").textContent = carrierCount;
        document.getElementById("statSecret").textContent = secretBits;
        statsEl.classList.add("show");
      }

      function updateUI() {
        var mode = modeSelect.value;
        var isEncode = mode === "encode";
        var isDecode = mode === "decode";
        var isDetect = mode === "detect" || mode === "strip";

        encodingMethodWrap.style.display = isEncode || isDecode ? "" : "none";
        insertPosWrap.style.display = isEncode ? "" : "none";
        detectPanelEl.style.display = isDetect ? "" : "none";

        if (isEncode) {
          leftLabelEl.textContent = "载体文本";
          rightLabelEl.textContent = "隐藏信息";
          carrierInputEl.placeholder = "在此输入载体文本（明文）...";
          carrierInputEl.readOnly = false;
          secretInputEl.placeholder = "在此输入要隐藏的秘密信息...";
          secretInputEl.readOnly = false;
        } else if (isDecode) {
          leftLabelEl.textContent = "含隐写的文本";
          rightLabelEl.textContent = "提取到的隐藏信息（输出）";
          carrierInputEl.placeholder = "粘贴含有零宽字符隐写的文本...";
          carrierInputEl.readOnly = false;
          secretInputEl.placeholder = "提取结果将显示在此...";
          secretInputEl.readOnly = true;
        } else if (mode === "detect") {
          leftLabelEl.textContent = "待检测文本";
          rightLabelEl.textContent = "（检测模式不使用）";
          carrierInputEl.placeholder = "粘贴任意文本，检测其中的零宽字符...";
          carrierInputEl.readOnly = false;
          secretInputEl.placeholder = "";
          secretInputEl.readOnly = true;
        } else {
          leftLabelEl.textContent = "待清除的文本";
          rightLabelEl.textContent = "清除结果（输出）";
          carrierInputEl.placeholder = "粘贴含有零宽字符的文本...";
          carrierInputEl.readOnly = false;
          secretInputEl.placeholder = "清除后的文本将显示在此...";
          secretInputEl.readOnly = true;
        }
      }

      // ── 主逻辑 ───────────────────────────────────────
      function runAction() {
        var mode = modeSelect.value;
        var method = encodingMethodEl.value;
        var carrier = carrierInputEl.value;
        var secret = secretInputEl.value;

        statsEl.classList.remove("show");
        detectResultEl.innerHTML = "";

        if (mode === "encode") {
          if (!secret) {
            showStatus("请输入要隐藏的信息", "error");
            return;
          }
          var zwSeq = textToZeroWidth(secret, method);
          var encoded = embedInCarrier(carrier || "", zwSeq, insertPosEl.value);
          carrierInputEl.value = encoded;
          showStats(countZeroWidth(encoded), carrier.length, zwSeq.length);
          showStatus(
            "隐写完成！已嵌入 " +
              zwSeq.length +
              " 个零宽字符（" +
              secret.length +
              " 字符的秘密信息）",
            "success"
          );
        } else if (mode === "decode") {
          if (!carrier) {
            showStatus("请输入含隐写的文本", "error");
            return;
          }
          var seq = extractZeroWidth(carrier);
          if (seq.length === 0) {
            showStatus("未检测到零宽字符序列", "error");
            return;
          }
          var extracted = zeroWidthToText(seq, method);
          secretInputEl.value = extracted;
          var step = method === "ternary" ? 14 : 16;
          var bits = Math.floor(seq.length / step) * step;
          showStats(seq.length, carrier.length, bits);
          showStatus(
            "提取完成！共 " + seq.length + " 个零宽字符，还原 " + extracted.length + " 字符",
            "success"
          );
        } else if (mode === "detect") {
          if (!carrier) {
            showStatus("请输入待检测的文本", "error");
            return;
          }
          var zwCount = countZeroWidth(carrier);
          detectResultEl.innerHTML = buildDetectHTML(carrier);
          detectPanelEl.style.display = "";
          showStats(zwCount, carrier.length, 0);
          if (zwCount > 0) {
            showStatus("检测到 " + zwCount + " 个零宽字符（已高亮显示）", "success");
          } else {
            showStatus("未检测到任何零宽字符", "");
          }
        } else {
          // strip
          if (!carrier) {
            showStatus("请输入待清除的文本", "error");
            return;
          }
          var cleaned = stripZeroWidth(carrier);
          var removed = carrier.length - cleaned.length;
          secretInputEl.value = cleaned;
          showStats(0, cleaned.length, 0);
          showStatus("已清除 " + removed + " 个零宽字符", "success");
        }
      }

      // ── 事件绑定 ─────────────────────────────────────
      document.getElementById("btnRun").onclick = runAction;

      document.getElementById("btnCopyResult").onclick = async function () {
        var mode = modeSelect.value;
        var text =
          mode === "encode" || mode === "detect" ? carrierInputEl.value : secretInputEl.value;
        if (!text) {
          showStatus("没有可复制的内容", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(text);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        carrierInputEl.value = "";
        secretInputEl.value = "";
        detectResultEl.innerHTML = "";
        statusEl.textContent = "";
        statusEl.className = "status";
        statsEl.classList.remove("show");
      };

      modeSelect.addEventListener("change", updateUI);

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          runAction();
        }
      });

      // ── 初始化 ───────────────────────────────────────
      updateUI();

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
    
