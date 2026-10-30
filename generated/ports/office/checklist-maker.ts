// @ts-nocheck
// Generated from tools/office/checklist-maker.html
// Source SHA-256: 0bb1e9704b5c787d811f7bbcac9521450594ad9869b9d6ff7c03f0630182ff5f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "checklist_maker_data_v1";
      let items = [];
      let draggedItem = null;

      const newItemInput = document.getElementById("newItemInput");
      const addBtn = document.getElementById("addBtn");
      const checklist = document.getElementById("checklist");
      const emptyState = document.getElementById("emptyState");
      const progressFill = document.getElementById("progressFill");
      const completedCount = document.getElementById("completedCount");
      const totalCount = document.getElementById("totalCount");
      const shareBtn = document.getElementById("shareBtn");
      const printBtn = document.getElementById("printBtn");
      const clearCompletedBtn = document.getElementById("clearCompletedBtn");
      const clearAllBtn = document.getElementById("clearAllBtn");

      function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
      }

      function saveToStorage() {
        localStorage.setItem(LS_KEY, JSON.stringify(items));
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            items = JSON.parse(saved);
            return true;
          } catch (e) {
            items = [];
          }
        }
        return false;
      }

      function saveToUrl() {
        try {
          if (items.length === 0) {
            history.replaceState(null, "", location.pathname);
            return;
          }
          const data = JSON.stringify(items);
          if (data.length > 2000) return;
          history.replaceState(null, "", "#" + btoa(encodeURIComponent(data)));
        } catch (e) {}
      }

      function loadFromUrl() {
        const hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          const data = decodeURIComponent(atob(hash));
          items = JSON.parse(data);
          return true;
        } catch (e) {
          return false;
        }
      }

      function updateProgress() {
        const total = items.length;
        const completed = items.filter(function (item) {
          return item.completed;
        }).length;
        const percent = total > 0 ? (completed / total) * 100 : 0;

        progressFill.style.width = percent + "%";
        completedCount.textContent = completed;
        totalCount.textContent = total;
      }

      function createSvgElement(path, viewBox) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", viewBox || "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");

        const paths = path.split("|");
        paths.forEach(function (p) {
          if (p.startsWith("c:")) {
            const parts = p.substring(2).split(",");
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", parts[0]);
            circle.setAttribute("cy", parts[1]);
            circle.setAttribute("r", parts[2]);
            svg.appendChild(circle);
          } else if (p.startsWith("l:")) {
            const parts = p.substring(2).split(",");
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", parts[0]);
            line.setAttribute("y1", parts[1]);
            line.setAttribute("x2", parts[2]);
            line.setAttribute("y2", parts[3]);
            svg.appendChild(line);
          } else if (p.startsWith("pl:")) {
            const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            polyline.setAttribute("points", p.substring(3));
            svg.appendChild(polyline);
          } else {
            const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathEl.setAttribute("d", p);
            svg.appendChild(pathEl);
          }
        });

        return svg;
      }

      function createItemElement(item, index) {
        const div = document.createElement("div");
        div.className = "checklist-item" + (item.completed ? " completed" : "");
        div.setAttribute("data-id", item.id);
        div.setAttribute("draggable", "true");

        const dragHandle = document.createElement("div");
        dragHandle.className = "drag-handle";
        dragHandle.title = "拖拽排序";
        dragHandle.appendChild(
          createSvgElement("c:9,5,1|c:9,12,1|c:9,19,1|c:15,5,1|c:15,12,1|c:15,19,1")
        );

        const checkbox = document.createElement("div");
        checkbox.className = "item-checkbox" + (item.completed ? " checked" : "");
        checkbox.setAttribute("role", "checkbox");
        checkbox.setAttribute("aria-checked", item.completed.toString());
        checkbox.setAttribute("tabindex", "0");
        const checkSvg = createSvgElement("pl:20 6 9 17 4 12");
        checkSvg.setAttribute("stroke-width", "3");
        checkbox.appendChild(checkSvg);

        const textSpan = document.createElement("span");
        textSpan.className = "item-text";
        textSpan.textContent = item.text;

        const actions = document.createElement("div");
        actions.className = "item-actions";

        const moveUpBtn = document.createElement("button");
        moveUpBtn.className = "item-btn move-up";
        moveUpBtn.title = "上移";
        if (index === 0) moveUpBtn.disabled = true;
        moveUpBtn.appendChild(createSvgElement("pl:18 15 12 9 6 15"));

        const moveDownBtn = document.createElement("button");
        moveDownBtn.className = "item-btn move-down";
        moveDownBtn.title = "下移";
        if (index === items.length - 1) moveDownBtn.disabled = true;
        moveDownBtn.appendChild(createSvgElement("pl:6 9 12 15 18 9"));

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "item-btn delete";
        deleteBtn.title = "删除";
        deleteBtn.appendChild(createSvgElement("l:18,6,6,18|l:6,6,18,18"));

        actions.appendChild(moveUpBtn);
        actions.appendChild(moveDownBtn);
        actions.appendChild(deleteBtn);

        div.appendChild(dragHandle);
        div.appendChild(checkbox);
        div.appendChild(textSpan);
        div.appendChild(actions);

        checkbox.addEventListener("click", function () {
          toggleItem(item.id);
        });
        checkbox.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleItem(item.id);
          }
        });

        moveUpBtn.addEventListener("click", function () {
          moveItem(item.id, -1);
        });
        moveDownBtn.addEventListener("click", function () {
          moveItem(item.id, 1);
        });
        deleteBtn.addEventListener("click", function () {
          deleteItem(item.id);
        });

        div.addEventListener("dragstart", handleDragStart);
        div.addEventListener("dragend", handleDragEnd);
        div.addEventListener("dragover", handleDragOver);
        div.addEventListener("dragenter", handleDragEnter);
        div.addEventListener("dragleave", handleDragLeave);
        div.addEventListener("drop", handleDrop);

        return div;
      }

      function render() {
        const itemElements = checklist.querySelectorAll(".checklist-item");
        itemElements.forEach(function (el) {
          el.remove();
        });

        if (items.length === 0) {
          emptyState.style.display = "flex";
        } else {
          emptyState.style.display = "none";
          items.forEach(function (item, index) {
            checklist.appendChild(createItemElement(item, index));
          });
        }

        updateProgress();
      }

      function addItem(text) {
        const trimmed = text.trim();
        if (!trimmed) return;

        items.push({
          id: generateId(),
          text: trimmed,
          completed: false
        });

        saveToStorage();
        saveToUrl();
        render();
      }

      function toggleItem(id) {
        const item = items.find(function (i) {
          return i.id === id;
        });
        if (item) {
          item.completed = !item.completed;
          saveToStorage();
          saveToUrl();
          render();
        }
      }

      function deleteItem(id) {
        items = items.filter(function (i) {
          return i.id !== id;
        });
        saveToStorage();
        saveToUrl();
        render();
      }

      function moveItem(id, direction) {
        const index = items.findIndex(function (i) {
          return i.id === id;
        });
        if (index === -1) return;

        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= items.length) return;

        const temp = items[index];
        items[index] = items[newIndex];
        items[newIndex] = temp;

        saveToStorage();
        saveToUrl();
        render();
      }

      function handleDragStart(e) {
        draggedItem = this;
        this.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", this.getAttribute("data-id"));
      }

      function handleDragEnd() {
        this.classList.remove("dragging");
        document.querySelectorAll(".checklist-item").forEach(function (item) {
          item.classList.remove("drag-over");
        });
        draggedItem = null;
      }

      function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }

      function handleDragEnter(e) {
        e.preventDefault();
        if (this !== draggedItem) {
          this.classList.add("drag-over");
        }
      }

      function handleDragLeave() {
        this.classList.remove("drag-over");
      }

      function handleDrop(e) {
        e.preventDefault();
        this.classList.remove("drag-over");

        if (this === draggedItem) return;

        const draggedId = e.dataTransfer.getData("text/plain");
        const targetId = this.getAttribute("data-id");

        const draggedIndex = items.findIndex(function (i) {
          return i.id === draggedId;
        });
        const targetIndex = items.findIndex(function (i) {
          return i.id === targetId;
        });

        if (draggedIndex === -1 || targetIndex === -1) return;

        const draggedItemData = items.splice(draggedIndex, 1)[0];
        items.splice(targetIndex, 0, draggedItemData);

        saveToStorage();
        saveToUrl();
        render();
      }

      addBtn.addEventListener("click", function () {
        addItem(newItemInput.value);
        newItemInput.value = "";
        newItemInput.focus();
      });

      newItemInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          addItem(newItemInput.value);
          newItemInput.value = "";
        }
      });

      shareBtn.addEventListener("click", async function () {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          shareBtn.textContent = "已复制!";
          setTimeout(function () {
            shareBtn.textContent = "";
            const svg = createSvgElement(
              "c:18,5,3|c:6,12,3|c:18,19,3|l:8.59,13.51,15.42,17.49|l:15.41,6.51,8.59,10.49"
            );
            shareBtn.appendChild(svg);
            shareBtn.appendChild(document.createTextNode(" 分享"));
          }, 2000);
        } catch (e) {
          alert("复制失败，请手动复制地址栏链接");
        }
      });

      printBtn.addEventListener("click", function () {
        window.print();
      });

      clearCompletedBtn.addEventListener("click", function () {
        const completedItems = items.filter(function (i) {
          return i.completed;
        });
        if (completedItems.length === 0) return;
        if (confirm("确定要清除所有已完成的项目吗？")) {
          items = items.filter(function (i) {
            return !i.completed;
          });
          saveToStorage();
          saveToUrl();
          render();
        }
      });

      clearAllBtn.addEventListener("click", function () {
        if (items.length === 0) return;
        if (confirm("确定要清空所有项目吗？此操作不可恢复。")) {
          items = [];
          saveToStorage();
          history.replaceState(null, "", location.pathname);
          render();
        }
      });

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme")) {
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
        }
      });

      initTheme();
      if (!loadFromUrl()) {
        loadFromStorage();
      }
      render();
    
