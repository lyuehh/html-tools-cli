// @ts-nocheck
// Generated from tools/dev/arrow-generator.html
// Source SHA-256: 8981ac0546b204a1c4a493fce2eb424c19dad0f342e033ebebe2982fd55464b3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const directions = [
        { id: "nw", label: "↖" },
        { id: "n", label: "↑" },
        { id: "ne", label: "↗" },
        { id: "w", label: "←" },
        { id: "center", label: "" },
        { id: "e", label: "→" },
        { id: "sw", label: "↙" },
        { id: "s", label: "↓" },
        { id: "se", label: "↘" }
      ];

      const arrowStyles = {
        simple: {
          name: "简单",
          arrows: { n: "↑", ne: "↗", e: "→", se: "↘", s: "↓", sw: "↙", w: "←", nw: "↖" }
        },
        double: {
          name: "双线",
          arrows: { n: "⇑", ne: "⇗", e: "⇒", se: "⇘", s: "⇓", sw: "⇙", w: "⇐", nw: "⇖" }
        },
        heavy: {
          name: "粗体",
          arrows: { n: "⬆", ne: "⬈", e: "➡", se: "⬊", s: "⬇", sw: "⬋", w: "⬅", nw: "⬉" }
        },
        outline: {
          name: "空心",
          arrows: { n: "⇧", ne: "⬀", e: "⇨", se: "⬂", s: "⇩", sw: "⬃", w: "⇦", nw: "⬁" }
        },
        triangle: {
          name: "三角",
          arrows: { n: "▲", ne: "◥", e: "▶", se: "◢", s: "▼", sw: "◣", w: "◀", nw: "◤" }
        },
        curved: {
          name: "弯曲",
          arrows: { n: "⤴", ne: "↱", e: "↪", se: "↳", s: "⤵", sw: "↲", w: "↩", nw: "↰" }
        }
      };

      const arrowGallery = {
        基本箭头: ["←", "→", "↑", "↓", "↔", "↕", "↖", "↗", "↘", "↙"],
        双线箭头: ["⇐", "⇒", "⇑", "⇓", "⇔", "⇕", "⇖", "⇗", "⇘", "⇙"],
        粗箭头: ["⬅", "➡", "⬆", "⬇", "⬈", "⬉", "⬊", "⬋"],
        圆形箭头: ["↺", "↻", "⟲", "⟳", "↶", "↷"],
        波浪箭头: ["↜", "↝", "↭", "⇜", "⇝"],
        虚线箭头: ["⇠", "⇢", "⇡", "⇣", "⤌", "⤍", "⤎", "⤏"],
        带尾箭头: ["↢", "↣", "↤", "↦", "↧", "↥"],
        双头箭头: ["↞", "↠", "↟", "↡", "⇞", "⇟"],
        手指箭头: ["☜", "☞", "☝", "☟", "👆", "👇", "👈", "👉"],
        特殊箭头: [
          "➔",
          "➙",
          "➛",
          "➜",
          "➝",
          "➞",
          "➟",
          "➠",
          "➢",
          "➣",
          "➤",
          "➥",
          "➦",
          "➧",
          "➨",
          "➩",
          "➪",
          "➫",
          "➬",
          "➭",
          "➮",
          "➯",
          "➱",
          "➲"
        ],
        数学箭头: ["⟵", "⟶", "⟷", "⟸", "⟹", "⟺", "⟻", "⟼", "⟽", "⟾", "⟿"],
        带圈箭头: ["➀", "➁", "➂", "➃", "➄", "➅", "➆", "➇", "➈", "➉"]
      };

      let currentDirection = "e";
      let currentStyle = "simple";

      function init() {
        renderDirectionGrid();
        renderStyleOptions();
        renderGallery();
        updateResult();

        const savedTheme = localStorage.getItem("arrow-generator-theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      }

      function renderDirectionGrid() {
        const grid = document.getElementById("directionGrid");
        while (grid.firstChild) {
          grid.removeChild(grid.firstChild);
        }

        directions.forEach(function (dir) {
          const btn = document.createElement("button");
          btn.className = "direction-btn" + (dir.id === currentDirection ? " active" : "");
          btn.textContent = dir.label;

          if (dir.id !== "center") {
            btn.onclick = function () {
              selectDirection(dir.id);
            };
          } else {
            btn.disabled = true;
            btn.style.visibility = "hidden";
          }

          grid.appendChild(btn);
        });
      }

      function renderStyleOptions() {
        const container = document.getElementById("styleOptions");
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        Object.keys(arrowStyles).forEach(function (styleId) {
          const style = arrowStyles[styleId];
          const btn = document.createElement("button");
          btn.className = "style-btn" + (styleId === currentStyle ? " active" : "");
          btn.textContent = style.name + " " + style.arrows.e;
          btn.onclick = function () {
            selectStyle(styleId);
          };
          container.appendChild(btn);
        });
      }

      function renderGallery() {
        const container = document.getElementById("galleryContent");
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        Object.keys(arrowGallery).forEach(function (categoryName) {
          const category = document.createElement("div");
          category.className = "gallery-category";

          const title = document.createElement("h4");
          title.textContent = categoryName;
          category.appendChild(title);

          const grid = document.createElement("div");
          grid.className = "gallery-grid";

          arrowGallery[categoryName].forEach(function (arrow) {
            const item = document.createElement("div");
            item.className = "gallery-item";
            item.textContent = arrow;
            item.title = "点击复制: " + arrow;
            item.onclick = function () {
              copyText(arrow);
            };
            grid.appendChild(item);
          });

          category.appendChild(grid);
          container.appendChild(category);
        });
      }

      function selectDirection(dir) {
        currentDirection = dir;
        renderDirectionGrid();
        updateResult();
      }

      window.selectStyle = function (style) {
        currentStyle = style;
        renderStyleOptions();
        updateResult();
      };

      function updateResult() {
        const arrow = arrowStyles[currentStyle].arrows[currentDirection];
        const resultArrow = document.getElementById("resultArrow");
        const resultInfo = document.getElementById("resultInfo");

        resultArrow.textContent = arrow;
        resultInfo.textContent =
          "Unicode: U+" + arrow.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0");
      }

      window.copyArrow = function () {
        const arrow = document.getElementById("resultArrow").textContent;
        copyText(arrow);
      };

      window.updateCustomArrow = function () {
        const left = document.getElementById("leftPart").value;
        const body = document.getElementById("bodyPart").value;
        const length = parseInt(document.getElementById("bodyLength").value) || 0;
        const right = document.getElementById("rightPart").value;

        const arrow = left + body.repeat(length) + right;
        document.getElementById("customPreview").textContent = arrow || "(空)";
      };

      window.copyCustomArrow = function () {
        const arrow = document.getElementById("customPreview").textContent;
        if (arrow && arrow !== "(空)") {
          copyText(arrow);
        }
      };

      window.copyText = function (text) {
        navigator.clipboard.writeText(text).then(function () {
          showToast("已复制: " + text);
        });
      };

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("arrow-generator-theme", newTheme);
      };

      init();
    
