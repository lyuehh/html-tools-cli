// @ts-nocheck
// Generated from tools/dev/regex-tester.html
// Source SHA-256: 4151a0843a40894692044a7f49ebcecc7bb5aa4c9e5ba9ec22b0dfdb8073f5df
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function testRegex() {
        var pattern = document.getElementById("regex").value;
        var text = document.getElementById("text").value;
        var flags =
          (document.getElementById("flagG").checked ? "g" : "") +
          (document.getElementById("flagI").checked ? "i" : "") +
          (document.getElementById("flagM").checked ? "m" : "");

        if (!pattern || !text) {
          document.getElementById("result").textContent = "-";
          document.getElementById("info").textContent = "";
          return;
        }

        try {
          var regex = new RegExp(pattern, flags);
          var matches = text.match(regex);

          if (matches) {
            var highlighted = escapeHtml(text);
            // Create regex for replacement with escaped pattern
            var replaceRegex = new RegExp(escapeRegex(pattern), flags);
            highlighted = text.replace(regex, function (m) {
              return '<span class="match">' + escapeHtml(m) + "</span>";
            });
            document.getElementById("result").innerHTML = highlighted;
            document.getElementById("info").textContent =
              "找到 " + matches.length + " 个匹配: " + matches.join(", ");
            document.getElementById("info").className = "result-info";
          } else {
            document.getElementById("result").textContent = text;
            document.getElementById("info").textContent = "没有匹配";
            document.getElementById("info").className = "result-info";
          }
        } catch (e) {
          document.getElementById("result").innerHTML =
            '<span class="error-msg">无效的正则表达式: ' + escapeHtml(e.message) + "</span>";
          document.getElementById("info").textContent = "";
        }
      }

      function escapeHtml(text) {
        var div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }

      function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }

      // Theme
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
    
