// @ts-nocheck
// Generated from tools/social-media/thread-splitter.html
// Source SHA-256: f29a1fea36c72e229ffa01107802224223ae2227eafc601b3ba66ffec74db54d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const charLimitEl = document.getElementById("charLimit");
      const addNumbersEl = document.getElementById("addNumbers");
      const smartBreakEl = document.getElementById("smartBreak");
      const separatorEl = document.getElementById("separator");
      const threadContainerEl = document.getElementById("threadContainer");
      const statsEl = document.getElementById("stats");
      const statusEl = document.getElementById("status");

      const LS_KEY = "thread_splitter_v1";

      function splitText() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入文本内容", "error");
          return;
        }

        const charLimit = parseInt(charLimitEl.value, 10) || 280;
        const addNumbers = addNumbersEl.checked;
        const smartBreak = smartBreakEl.checked;
        const separator = separatorEl.value;

        let chunks = [];

        if (separator === "paragraph") {
          chunks = splitByParagraph(text, charLimit, smartBreak);
        } else if (separator === "sentence") {
          chunks = splitBySentence(text, charLimit);
        } else {
          chunks = splitByChar(text, charLimit);
        }

        if (addNumbers) {
          const total = chunks.length;
          chunks = chunks.map(function (chunk, i) {
            const prefix = i + 1 + "/" + total + "\n\n";
            return prefix + chunk;
          });
        }

        displayThread(chunks);
        updateStats(text, chunks);
        saveToStorage();
        showStatus("已分割为 " + chunks.length + " 条推文", "success");
      }

      function splitByParagraph(text, limit, smart) {
        const paragraphs = text.split(/\n\n+/);
        const chunks = [];
        let current = "";

        for (const para of paragraphs) {
          const trimmedPara = para.trim();
          if (!trimmedPara) continue;

          if (current.length + trimmedPara.length + 2 <= limit) {
            current = current ? current + "\n\n" + trimmedPara : trimmedPara;
          } else {
            if (current) {
              chunks.push(current);
            }
            if (trimmedPara.length <= limit) {
              current = trimmedPara;
            } else {
              const subChunks = smart
                ? splitBySentence(trimmedPara, limit)
                : splitByChar(trimmedPara, limit);
              for (let i = 0; i < subChunks.length - 1; i++) {
                chunks.push(subChunks[i]);
              }
              current = subChunks[subChunks.length - 1];
            }
          }
        }

        if (current) {
          chunks.push(current);
        }

        return chunks;
      }

      function splitBySentence(text, limit) {
        const sentences = text.match(/[^。！？.!?]+[。！？.!?]?/g) || [text];
        const chunks = [];
        let current = "";

        for (const sentence of sentences) {
          const trimmedSentence = sentence.trim();
          if (!trimmedSentence) continue;

          if (current.length + trimmedSentence.length <= limit) {
            current = current + trimmedSentence;
          } else {
            if (current) {
              chunks.push(current.trim());
            }
            if (trimmedSentence.length <= limit) {
              current = trimmedSentence;
            } else {
              const subChunks = splitByChar(trimmedSentence, limit);
              for (let i = 0; i < subChunks.length - 1; i++) {
                chunks.push(subChunks[i]);
              }
              current = subChunks[subChunks.length - 1];
            }
          }
        }

        if (current) {
          chunks.push(current.trim());
        }

        return chunks;
      }

      function splitByChar(text, limit) {
        const chunks = [];
        let remaining = text;

        while (remaining.length > limit) {
          let breakPoint = limit;

          const spaceIndex = remaining.lastIndexOf(" ", limit);
          const newlineIndex = remaining.lastIndexOf("\n", limit);
          const bestBreak = Math.max(spaceIndex, newlineIndex);

          if (bestBreak > limit * 0.5) {
            breakPoint = bestBreak;
          }

          chunks.push(remaining.slice(0, breakPoint).trim());
          remaining = remaining.slice(breakPoint).trim();
        }

        if (remaining) {
          chunks.push(remaining);
        }

        return chunks;
      }

      function displayThread(chunks) {
        threadContainerEl.textContent = "";
        const charLimit = parseInt(charLimitEl.value, 10) || 280;

        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          const card = document.createElement("div");
          card.className = "tweet-card";

          const header = document.createElement("div");
          header.className = "tweet-header";

          const number = document.createElement("span");
          number.className = "tweet-number";
          number.textContent = "Tweet " + (i + 1);

          const length = document.createElement("span");
          length.className = "tweet-length";
          if (chunk.length > charLimit) {
            length.classList.add("warning");
          }
          length.textContent = chunk.length + " / " + charLimit;

          header.appendChild(number);
          header.appendChild(length);

          const content = document.createElement("div");
          content.className = "tweet-content";
          content.textContent = chunk;

          const actions = document.createElement("div");
          actions.className = "tweet-actions";

          const copyBtn = document.createElement("button");
          copyBtn.className = "tweet-action";
          copyBtn.textContent = "复制";
          copyBtn.addEventListener("click", function () {
            copyToClipboard(chunk);
          });

          actions.appendChild(copyBtn);

          card.appendChild(header);
          card.appendChild(content);
          card.appendChild(actions);
          threadContainerEl.appendChild(card);
        }
      }

      function updateStats(original, chunks) {
        document.getElementById("statTotal").textContent = original.length;
        document.getElementById("statTweets").textContent = chunks.length;
        const total = chunks.reduce(function (sum, c) {
          return sum + c.length;
        }, 0);
        document.getElementById("statAvg").textContent = Math.round(total / chunks.length);
        statsEl.style.display = "flex";
      }

      function copyToClipboard(text) {
        navigator.clipboard
          .writeText(text)
          .then(function () {
            showStatus("已复制到剪贴板", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function saveToStorage() {
        const data = {
          input: inputEl.value,
          charLimit: charLimitEl.value,
          addNumbers: addNumbersEl.checked,
          smartBreak: smartBreakEl.checked,
          separator: separatorEl.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const data = JSON.parse(saved);
            if (data.input) inputEl.value = data.input;
            if (data.charLimit) charLimitEl.value = data.charLimit;
            if (typeof data.addNumbers === "boolean") addNumbersEl.checked = data.addNumbers;
            if (typeof data.smartBreak === "boolean") smartBreakEl.checked = data.smartBreak;
            if (data.separator) separatorEl.value = data.separator;
          }
        } catch (e) {}
      }

      function loadFromUrl() {
        const hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          inputEl.value = decodeURIComponent(atob(hash));
          return true;
        } catch (e) {
          return false;
        }
      }

      document.getElementById("btnPaste").addEventListener("click", function () {
        navigator.clipboard
          .readText()
          .then(function (text) {
            inputEl.value = text;
            saveToStorage();
            showStatus("已粘贴", "success");
          })
          .catch(function () {
            showStatus("无法访问剪贴板", "error");
          });
      });

      document.getElementById("btnSplit").addEventListener("click", splitText);

      document.getElementById("btnCopyAll").addEventListener("click", function () {
        const cards = threadContainerEl.querySelectorAll(".tweet-content");
        if (cards.length === 0) {
          showStatus("没有内容可复制", "error");
          return;
        }

        const allText = Array.from(cards)
          .map(function (c) {
            return c.textContent;
          })
          .join("\n\n---\n\n");

        copyToClipboard(allText);
      });

      document.getElementById("btnShare").addEventListener("click", function () {
        try {
          if (inputEl.value.length > 2000) {
            showStatus("文本过长，无法分享", "error");
            return;
          }
          const encoded = btoa(encodeURIComponent(inputEl.value));
          history.replaceState(null, "", "#" + encoded);
          navigator.clipboard.writeText(location.href).then(function () {
            showStatus("链接已复制", "success");
          });
        } catch (e) {
          showStatus("分享失败", "error");
        }
      });

      document.getElementById("btnClear").addEventListener("click", function () {
        inputEl.value = "";
        threadContainerEl.textContent = "";
        statsEl.style.display = "none";
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
      });

      inputEl.addEventListener("input", function () {
        saveToStorage();
      });

      if (!loadFromUrl()) {
        loadFromStorage();
      }

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
