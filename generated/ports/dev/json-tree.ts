// @ts-nocheck
// Generated from tools/dev/json-tree.html
// Source SHA-256: 1c5d94be869c89f17c9d3d9bc99ea07f701088b108ccd854b3964528e41a6059
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var currentPath = "";
      var jsonData = null;

      window.toggleTheme = function () {
        var html = document.documentElement;
        var newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        document.querySelector(".theme-icon").textContent = newTheme === "light" ? "🌙" : "☀️";
      };
      (function () {
        var savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-icon").textContent = savedTheme === "light" ? "🌙" : "☀️";
      })();

      var input = document.getElementById("jsonInput");
      var debounceTimer;
      input.addEventListener("input", function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(parseAndRender, 300);
      });

      function parseAndRender() {
        var text = input.value.trim();
        var treeView = document.getElementById("treeView");
        var statsBar = document.getElementById("statsBar");

        if (!text) {
          treeView.innerHTML =
            '<div style="padding:2rem;text-align:center;color:var(--pico-muted-color);">输入 JSON 数据开始可视化</div>';
          statsBar.innerHTML = "";
          jsonData = null;
          return;
        }

        try {
          jsonData = JSON.parse(text);
          var stats = getStats(jsonData);
          treeView.innerHTML = renderNode(jsonData, "", true);
          statsBar.innerHTML =
            "<span>对象: " +
            stats.objects +
            "</span>" +
            "<span>数组: " +
            stats.arrays +
            "</span>" +
            "<span>字符串: " +
            stats.strings +
            "</span>" +
            "<span>数字: " +
            stats.numbers +
            "</span>" +
            "<span>布尔: " +
            stats.booleans +
            "</span>" +
            "<span>Null: " +
            stats.nulls +
            "</span>" +
            "<span>深度: " +
            stats.depth +
            "</span>";
        } catch (e) {
          treeView.innerHTML = '<div class="error-msg">JSON 解析错误: ' + e.message + "</div>";
          statsBar.innerHTML = "";
          jsonData = null;
        }
      }

      function renderNode(data, path, isRoot) {
        var type = getType(data);
        var html = '<div class="tree-node' + (isRoot ? " tree-root" : "") + '">';

        if (type === "object") {
          var keys = Object.keys(data);
          html +=
            '<div class="tree-line" onclick="selectNode(this, \'' + escapePath(path) + "')\">";
          if (keys.length > 0) {
            html += '<span class="tree-toggle" onclick="toggleNode(event, this)">▼</span>';
          } else {
            html += '<span class="tree-toggle"></span>';
          }
          html += '<span class="tree-bracket">{</span>';
          html += '<span class="tree-count">' + keys.length + " keys</span>";
          html += "</div>";
          html += '<div class="tree-children">';
          keys.forEach(function (key, idx) {
            var childPath = path ? path + "." + key : key;
            if (key.match(/[.\[\]]/))
              childPath = path ? path + '["' + key + '"]' : '["' + key + '"]';
            html += renderKeyValue(key, data[key], childPath, idx === keys.length - 1);
          });
          html += "</div>";
          html +=
            '<div class="tree-line"><span class="tree-toggle"></span><span class="tree-bracket">}</span></div>';
        } else if (type === "array") {
          html +=
            '<div class="tree-line" onclick="selectNode(this, \'' + escapePath(path) + "')\">";
          if (data.length > 0) {
            html += '<span class="tree-toggle" onclick="toggleNode(event, this)">▼</span>';
          } else {
            html += '<span class="tree-toggle"></span>';
          }
          html += '<span class="tree-bracket">[</span>';
          html += '<span class="tree-count">' + data.length + " items</span>";
          html += "</div>";
          html += '<div class="tree-children">';
          data.forEach(function (item, idx) {
            var childPath = path + "[" + idx + "]";
            html += renderKeyValue(idx, item, childPath, idx === data.length - 1);
          });
          html += "</div>";
          html +=
            '<div class="tree-line"><span class="tree-toggle"></span><span class="tree-bracket">]</span></div>';
        } else {
          html += renderValue(data, path);
        }

        html += "</div>";
        return html;
      }

      function renderKeyValue(key, value, path, isLast) {
        var type = getType(value);
        var html = "";

        if (type === "object" || type === "array") {
          var count = type === "object" ? Object.keys(value).length : value.length;
          var bracket = type === "object" ? "{" : "[";
          var closeBracket = type === "object" ? "}" : "]";
          var label = type === "object" ? count + " keys" : count + " items";

          html += '<div class="tree-node">';
          html +=
            '<div class="tree-line" onclick="selectNode(this, \'' + escapePath(path) + "')\">";
          if (count > 0) {
            html += '<span class="tree-toggle" onclick="toggleNode(event, this)">▼</span>';
          } else {
            html += '<span class="tree-toggle"></span>';
          }
          html += '<span class="tree-key">' + escapeHtml(String(key)) + "</span>";
          html += '<span class="tree-colon">:</span>';
          html += '<span class="tree-bracket">' + bracket + "</span>";
          html += '<span class="tree-count">' + label + "</span>";
          html += "</div>";

          if (count > 0) {
            html += '<div class="tree-children">';
            if (type === "object") {
              var keys = Object.keys(value);
              keys.forEach(function (k, i) {
                var childPath = path + "." + k;
                if (k.match(/[.\[\]]/)) childPath = path + '["' + k + '"]';
                html += renderKeyValue(k, value[k], childPath, i === keys.length - 1);
              });
            } else {
              value.forEach(function (item, i) {
                html += renderKeyValue(i, item, path + "[" + i + "]", i === value.length - 1);
              });
            }
            html += "</div>";
          }
          html +=
            '<div class="tree-line"><span class="tree-toggle"></span><span class="tree-bracket">' +
            closeBracket +
            "</span></div>";
          html += "</div>";
        } else {
          html +=
            '<div class="tree-line" onclick="selectNode(this, \'' + escapePath(path) + "')\">";
          html += '<span class="tree-toggle"></span>';
          html += '<span class="tree-key">' + escapeHtml(String(key)) + "</span>";
          html += '<span class="tree-colon">:</span>';
          html += renderValueSpan(value);
          html += "</div>";
        }

        return html;
      }

      function renderValue(value, path) {
        return (
          '<div class="tree-line" onclick="selectNode(this, \'' +
          escapePath(path) +
          "')\">" +
          '<span class="tree-toggle"></span>' +
          renderValueSpan(value) +
          "</div>"
        );
      }

      function renderValueSpan(value) {
        var type = getType(value);
        if (type === "string") {
          return '<span class="tree-string">' + escapeHtml(value) + "</span>";
        } else if (type === "number") {
          return '<span class="tree-number">' + value + "</span>";
        } else if (type === "boolean") {
          return '<span class="tree-boolean">' + value + "</span>";
        } else if (type === "null") {
          return '<span class="tree-null">null</span>';
        }
        return "<span>" + escapeHtml(String(value)) + "</span>";
      }

      function getType(value) {
        if (value === null) return "null";
        if (Array.isArray(value)) return "array";
        return typeof value;
      }

      function getStats(data, depth) {
        depth = depth || 1;
        var stats = {
          objects: 0,
          arrays: 0,
          strings: 0,
          numbers: 0,
          booleans: 0,
          nulls: 0,
          depth: depth
        };

        function count(val, d) {
          var type = getType(val);
          if (type === "object") {
            stats.objects++;
            Object.values(val).forEach(function (v) {
              count(v, d + 1);
            });
          } else if (type === "array") {
            stats.arrays++;
            val.forEach(function (v) {
              count(v, d + 1);
            });
          } else if (type === "string") stats.strings++;
          else if (type === "number") stats.numbers++;
          else if (type === "boolean") stats.booleans++;
          else if (type === "null") stats.nulls++;
          if (d > stats.depth) stats.depth = d;
        }
        count(data, 1);
        return stats;
      }

      window.toggleNode = function (e, el) {
        e.stopPropagation();
        var node = el.closest(".tree-node");
        node.classList.toggle("tree-collapsed");
        el.textContent = node.classList.contains("tree-collapsed") ? "▶" : "▼";
      };

      window.selectNode = function (el, path) {
        document.querySelectorAll(".tree-line.selected").forEach(function (n) {
          n.classList.remove("selected");
        });
        el.classList.add("selected");
        currentPath = path || "$";
        document.getElementById("treePath").innerHTML = "路径: <code>" + (path || "$") + "</code>";
      };

      window.expandAll = function () {
        document.querySelectorAll(".tree-node.tree-collapsed").forEach(function (n) {
          n.classList.remove("tree-collapsed");
          var toggle = n.querySelector(".tree-toggle");
          if (toggle && toggle.textContent === "▶") toggle.textContent = "▼";
        });
      };

      window.collapseAll = function () {
        document.querySelectorAll(".tree-node").forEach(function (n) {
          if (n.querySelector(".tree-children")) {
            n.classList.add("tree-collapsed");
            var toggle = n.querySelector(".tree-toggle");
            if (toggle && toggle.textContent === "▼") toggle.textContent = "▶";
          }
        });
      };

      window.copyPath = function () {
        if (currentPath) {
          navigator.clipboard.writeText(currentPath);
          alert("路径已复制: " + currentPath);
        }
      };

      window.searchTree = function () {
        var query = document.getElementById("searchInput").value.toLowerCase();
        document.querySelectorAll(".highlight").forEach(function (el) {
          el.classList.remove("highlight");
        });
        if (!query) return;

        document.querySelectorAll(".tree-key, .tree-string, .tree-number").forEach(function (el) {
          if (el.textContent.toLowerCase().includes(query)) {
            el.classList.add("highlight");
            var node = el.closest(".tree-node");
            while (node) {
              node.classList.remove("tree-collapsed");
              var toggle = node.querySelector(":scope > .tree-line .tree-toggle");
              if (toggle && toggle.textContent === "▶") toggle.textContent = "▼";
              node = node.parentElement.closest(".tree-node");
            }
          }
        });
      };

      window.formatInput = function () {
        try {
          var data = JSON.parse(input.value);
          input.value = JSON.stringify(data, null, 2);
        } catch (e) {}
      };

      window.minifyInput = function () {
        try {
          var data = JSON.parse(input.value);
          input.value = JSON.stringify(data);
        } catch (e) {}
      };

      window.clearInput = function () {
        input.value = "";
        parseAndRender();
      };

      window.loadSample = function () {
        input.value = JSON.stringify(
          {
            name: "HTML Tools",
            version: "1.0.0",
            description: "在线开发工具集合",
            features: ["JSON 格式化", "Base64 编解码", "时间戳转换", "颜色转换"],
            stats: { tools: 150, categories: 12, active: true },
            author: { name: "Developer", email: "dev@example.com" },
            tags: null,
            config: { theme: "dark", lang: "zh-CN", autoSave: false }
          },
          null,
          2
        );
        parseAndRender();
      };

      window.escapeHtml = function (str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      };

      function escapePath(path) {
        return path.replace(/'/g, "\\'");
      }

      loadSample();
    
