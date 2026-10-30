// @ts-nocheck
// Generated from tools/travel/travel-checklist.html
// Source SHA-256: 3d5e2cd1d7c9e158e3b5532ae79dcc06812383702aafd7cd38e139be457a2257
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var DEFAULT_ITEMS = {
        证件: ["护照", "身份证", "签证", "机票/车票", "酒店预订确认", "驾照"],
        电子设备: ["手机", "充电器", "充电宝", "相机", "耳机", "转换插头", "数据线"],
        衣物: ["内衣裤", "袜子", "T恤", "裤子", "外套", "睡衣", "泳衣"],
        洗漱用品: ["牙刷牙膏", "洗面奶", "护肤品", "防晒霜", "梳子", "毛巾"],
        药品: ["常用药", "创可贴", "晕车药", "肠胃药", "退烧药"],
        其他: ["现金", "信用卡", "雨伞", "墨镜", "帽子", "零食"]
      };

      var LS_KEY = "webutils_travel_checklist";
      var checklist = {};

      function init() {
        initTheme();
        populateCategorySelect();
        loadChecklist();
        renderChecklist();
      }

      function populateCategorySelect() {
        var select = document.getElementById("categorySelect");
        Object.keys(DEFAULT_ITEMS).forEach(function (cat) {
          var option = document.createElement("option");
          option.value = cat;
          option.textContent = cat;
          select.appendChild(option);
        });
      }

      function loadChecklist() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            checklist = JSON.parse(saved);
          } else {
            Object.keys(DEFAULT_ITEMS).forEach(function (cat) {
              checklist[cat] = DEFAULT_ITEMS[cat].map(function (item) {
                return { text: item, checked: false };
              });
            });
            saveChecklist();
          }
        } catch (e) {
          checklist = {};
        }
      }

      function saveChecklist() {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(checklist));
        } catch (e) {}
      }

      function renderChecklist() {
        var container = document.getElementById("checklistContainer");
        container.textContent = "";

        var categories = Object.keys(checklist);
        if (categories.length === 0) {
          var empty = document.createElement("div");
          empty.className = "empty-state";
          empty.textContent = "清单为空，添加一些物品吧！";
          container.appendChild(empty);
          updateProgress();
          return;
        }

        categories.forEach(function (catName) {
          var items = checklist[catName];
          if (items.length === 0) return;

          var category = document.createElement("div");
          category.className = "category";

          var header = document.createElement("div");
          header.className = "category-header";
          header.onclick = function () {
            category.classList.toggle("collapsed");
          };

          var title = document.createElement("div");
          title.className = "category-title";

          var titleText = document.createElement("span");
          titleText.textContent = catName;
          title.appendChild(titleText);

          var checkedCount = items.filter(function (i) {
            return i.checked;
          }).length;
          var count = document.createElement("span");
          count.className = "category-count";
          count.textContent = "(" + checkedCount + "/" + items.length + ")";
          title.appendChild(count);

          header.appendChild(title);

          var toggle = document.createElement("div");
          toggle.className = "category-toggle";
          var toggleSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          toggleSvg.setAttribute("viewBox", "0 0 24 24");
          toggleSvg.setAttribute("width", "16");
          toggleSvg.setAttribute("height", "16");
          toggleSvg.setAttribute("fill", "none");
          toggleSvg.setAttribute("stroke", "currentColor");
          toggleSvg.setAttribute("stroke-width", "2");
          var polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
          polyline.setAttribute("points", "6 9 12 15 18 9");
          toggleSvg.appendChild(polyline);
          toggle.appendChild(toggleSvg);
          header.appendChild(toggle);

          category.appendChild(header);

          var itemsContainer = document.createElement("div");
          itemsContainer.className = "category-items";

          items.forEach(function (item, index) {
            var itemEl = createItemElement(catName, index, item);
            itemsContainer.appendChild(itemEl);
          });

          category.appendChild(itemsContainer);
          container.appendChild(category);
        });

        updateProgress();
      }

      function createItemElement(catName, index, item) {
        var el = document.createElement("div");
        el.className = "checklist-item";

        var checkbox = document.createElement("div");
        checkbox.className = "checkbox" + (item.checked ? " checked" : "");

        var checkSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        checkSvg.setAttribute("viewBox", "0 0 24 24");
        checkSvg.setAttribute("fill", "none");
        checkSvg.setAttribute("stroke", "currentColor");
        checkSvg.setAttribute("stroke-width", "3");
        var checkPolyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        checkPolyline.setAttribute("points", "20 6 9 17 4 12");
        checkSvg.appendChild(checkPolyline);
        checkbox.appendChild(checkSvg);

        checkbox.onclick = function () {
          toggleItem(catName, index);
        };
        el.appendChild(checkbox);

        var text = document.createElement("span");
        text.className = "item-text" + (item.checked ? " checked" : "");
        text.textContent = item.text;
        el.appendChild(text);

        var deleteBtn = document.createElement("button");
        deleteBtn.className = "item-delete";

        var deleteSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        deleteSvg.setAttribute("viewBox", "0 0 24 24");
        deleteSvg.setAttribute("width", "16");
        deleteSvg.setAttribute("height", "16");
        deleteSvg.setAttribute("fill", "none");
        deleteSvg.setAttribute("stroke", "currentColor");
        deleteSvg.setAttribute("stroke-width", "2");
        var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", "18");
        line1.setAttribute("y1", "6");
        line1.setAttribute("x2", "6");
        line1.setAttribute("y2", "18");
        deleteSvg.appendChild(line1);
        var line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", "6");
        line2.setAttribute("y1", "6");
        line2.setAttribute("x2", "18");
        line2.setAttribute("y2", "18");
        deleteSvg.appendChild(line2);
        deleteBtn.appendChild(deleteSvg);

        deleteBtn.onclick = function () {
          deleteItem(catName, index);
        };
        el.appendChild(deleteBtn);

        return el;
      }

      function toggleItem(catName, index) {
        checklist[catName][index].checked = !checklist[catName][index].checked;
        saveChecklist();
        renderChecklist();
      }

      function deleteItem(catName, index) {
        checklist[catName].splice(index, 1);
        if (checklist[catName].length === 0) {
          delete checklist[catName];
        }
        saveChecklist();
        renderChecklist();
      }

      function addItem() {
        var input = document.getElementById("newItemInput");
        var category = document.getElementById("categorySelect").value;
        var text = input.value.trim();

        if (!text) return;

        if (!checklist[category]) {
          checklist[category] = [];
        }

        checklist[category].push({ text: text, checked: false });
        saveChecklist();
        renderChecklist();

        input.value = "";
        input.focus();
      }

      function handleKeyPress(event) {
        if (event.key === "Enter") {
          addItem();
        }
      }

      function uncheckAll() {
        Object.keys(checklist).forEach(function (cat) {
          checklist[cat].forEach(function (item) {
            item.checked = false;
          });
        });
        saveChecklist();
        renderChecklist();
      }

      function resetList() {
        if (!confirm("确定要重置清单吗？这将恢复默认物品并清除所有勾选状态。")) {
          return;
        }

        checklist = {};
        Object.keys(DEFAULT_ITEMS).forEach(function (cat) {
          checklist[cat] = DEFAULT_ITEMS[cat].map(function (item) {
            return { text: item, checked: false };
          });
        });
        saveChecklist();
        renderChecklist();
      }

      function updateProgress() {
        var total = 0;
        var checked = 0;

        Object.keys(checklist).forEach(function (cat) {
          checklist[cat].forEach(function (item) {
            total++;
            if (item.checked) checked++;
          });
        });

        var percent = total === 0 ? 0 : Math.round((checked / total) * 100);
        document.getElementById("progressFill").style.width = percent + "%";
        document.getElementById("progressText").textContent = percent + "%";
      }

      function toggleTheme() {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      init();
    
