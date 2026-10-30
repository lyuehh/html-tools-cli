// @ts-nocheck
// Generated from tools/data/data-diff.html
// Source SHA-256: ac0d74ae65a414c458ed3cc79fa4cbfcfc8aaa7e8cff8e176c67daedffa0c002
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "data-diff-data";
      var lastDiff = { added: [], removed: [], unchanged: [] };

      function toggleTheme() {
        var body = document.body;
        var isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      (function () {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      function parseLines(text) {
        return text
          .trim()
          .split("\n")
          .map(function (line) {
            return line.trim();
          })
          .filter(function (line) {
            return line !== "";
          });
      }

      function compare() {
        var textA = document.getElementById("dataA").value;
        var textB = document.getElementById("dataB").value;

        var linesA = parseLines(textA);
        var linesB = parseLines(textB);

        if (linesA.length === 0 && linesB.length === 0) {
          showToast("请输入数据", "error");
          return;
        }

        var setA = {};
        var setB = {};

        linesA.forEach(function (line) {
          setA[line] = true;
        });
        linesB.forEach(function (line) {
          setB[line] = true;
        });

        var added = [];
        var removed = [];
        var unchanged = [];

        linesA.forEach(function (line) {
          if (!setB[line]) {
            removed.push(line);
          }
        });

        linesB.forEach(function (line) {
          if (!setA[line]) {
            added.push(line);
          } else {
            unchanged.push(line);
          }
        });

        lastDiff = { added: added, removed: removed, unchanged: unchanged };

        renderDiff(added, removed, unchanged);
        document.getElementById("addedCount").textContent = added.length;
        document.getElementById("removedCount").textContent = removed.length;
        document.getElementById("unchangedCount").textContent = unchanged.length;
        document.getElementById("statsBar").style.display = "flex";

        saveToStorage();
        showToast("对比完成");
      }

      function renderDiff(added, removed, unchanged) {
        var output = document.getElementById("diffOutput");
        output.textContent = "";

        var total = added.length + removed.length + unchanged.length;
        if (total === 0) {
          var emptyDiv = document.createElement("div");
          emptyDiv.className = "empty-state";
          emptyDiv.textContent = "无数据";
          output.appendChild(emptyDiv);
          return;
        }

        removed.forEach(function (line) {
          var div = document.createElement("div");
          div.className = "diff-line removed";
          var prefix = document.createElement("span");
          prefix.className = "diff-prefix";
          prefix.textContent = "-";
          var content = document.createElement("span");
          content.className = "diff-content";
          content.textContent = line;
          div.appendChild(prefix);
          div.appendChild(content);
          output.appendChild(div);
        });

        added.forEach(function (line) {
          var div = document.createElement("div");
          div.className = "diff-line added";
          var prefix = document.createElement("span");
          prefix.className = "diff-prefix";
          prefix.textContent = "+";
          var content = document.createElement("span");
          content.className = "diff-content";
          content.textContent = line;
          div.appendChild(prefix);
          div.appendChild(content);
          output.appendChild(div);
        });

        unchanged.forEach(function (line) {
          var div = document.createElement("div");
          div.className = "diff-line unchanged";
          var prefix = document.createElement("span");
          prefix.className = "diff-prefix";
          prefix.textContent = "=";
          var content = document.createElement("span");
          content.className = "diff-content";
          content.textContent = line;
          div.appendChild(prefix);
          div.appendChild(content);
          output.appendChild(div);
        });
      }

      function copyAdded() {
        if (lastDiff.added.length === 0) {
          showToast("无新增数据", "error");
          return;
        }
        navigator.clipboard
          .writeText(lastDiff.added.join("\n"))
          .then(function () {
            showToast("已复制新增数据");
          })
          .catch(function () {
            showToast("复制失败", "error");
          });
      }

      function copyRemoved() {
        if (lastDiff.removed.length === 0) {
          showToast("无删除数据", "error");
          return;
        }
        navigator.clipboard
          .writeText(lastDiff.removed.join("\n"))
          .then(function () {
            showToast("已复制删除数据");
          })
          .catch(function () {
            showToast("复制失败", "error");
          });
      }

      function copyAll() {
        var lines = [];
        lastDiff.removed.forEach(function (line) {
          lines.push("- " + line);
        });
        lastDiff.added.forEach(function (line) {
          lines.push("+ " + line);
        });
        lastDiff.unchanged.forEach(function (line) {
          lines.push("= " + line);
        });

        if (lines.length === 0) {
          showToast("无数据可复制", "error");
          return;
        }

        navigator.clipboard
          .writeText(lines.join("\n"))
          .then(function () {
            showToast("已复制全部结果");
          })
          .catch(function () {
            showToast("复制失败", "error");
          });
      }

      function swapData() {
        var dataA = document.getElementById("dataA");
        var dataB = document.getElementById("dataB");
        var temp = dataA.value;
        dataA.value = dataB.value;
        dataB.value = temp;
        saveToStorage();
        showToast("已交换");
      }

      function loadSample() {
        document.getElementById("dataA").value = "apple\nbanana\ncherry\ndate\nelderberry\nfig";
        document.getElementById("dataB").value = "apple\nblueberry\ncherry\nfig\ngrape\nhoneydew";
        compare();
      }

      function clearAll() {
        document.getElementById("dataA").value = "";
        document.getElementById("dataB").value = "";
        var output = document.getElementById("diffOutput");
        output.textContent = "";
        var emptyDiv = document.createElement("div");
        emptyDiv.className = "empty-state";
        emptyDiv.textContent = "输入两组数据后点击对比";
        output.appendChild(emptyDiv);
        document.getElementById("statsBar").style.display = "none";
        lastDiff = { added: [], removed: [], unchanged: [] };
        localStorage.removeItem(LS_KEY);
        showToast("已清空");
      }

      function saveToStorage() {
        var data = {
          a: document.getElementById("dataA").value,
          b: document.getElementById("dataB").value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (!saved) return;

        try {
          var data = JSON.parse(saved);
          if (data.a) document.getElementById("dataA").value = data.a;
          if (data.b) document.getElementById("dataB").value = data.b;
        } catch (e) {
          // ignore
        }
      }

      function showToast(msg, type) {
        type = type || "success";
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.className = "toast" + (type === "error" ? " error" : "");
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      document.addEventListener("DOMContentLoaded", function () {
        loadFromStorage();

        document.querySelectorAll("textarea").forEach(function (el) {
          el.addEventListener("input", saveToStorage);
        });
      });
    
