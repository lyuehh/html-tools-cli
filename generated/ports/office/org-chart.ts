// @ts-nocheck
// Generated from tools/office/org-chart.html
// Source SHA-256: 0374c064803cf705e1f78c053db6cf3a9110fb34bf5bae33f8f8455805c957ca
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "org_chart_v1";
      var people = [];
      var nextId = 1;

      function saveToStorage() {
        localStorage.setItem(
          LS_KEY,
          JSON.stringify({
            people: people,
            nextId: nextId
          })
        );
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            var data = JSON.parse(saved);
            people = data.people || [];
            nextId = data.nextId || 1;
          } catch (e) {
            // ignore
          }
        }
      }

      window.addPerson = function () {
        var name = document.getElementById("personName").value.trim();
        var title = document.getElementById("personTitle").value.trim();
        var reportsTo = document.getElementById("reportsTo").value;

        if (!name) {
          alert("\u8BF7\u8F93\u5165\u59D3\u540D");
          return;
        }

        people.push({
          id: nextId++,
          name: name,
          title: title,
          reportsTo: reportsTo ? parseInt(reportsTo, 10) : null
        });

        document.getElementById("personName").value = "";
        document.getElementById("personTitle").value = "";
        document.getElementById("reportsTo").value = "";

        saveToStorage();
        renderPersonList();
        updateReportsToOptions();
        renderOrgChart();
      };

      window.removePerson = function (id) {
        // Check if anyone reports to this person
        var hasReports = people.some(function (p) {
          return p.reportsTo === id;
        });
        if (hasReports) {
          alert(
            "\u8BE5\u4EBA\u5458\u6709\u4E0B\u5C5E\uFF0C\u8BF7\u5148\u5220\u9664\u6216\u8C03\u6574\u4E0B\u5C5E"
          );
          return;
        }

        people = people.filter(function (p) {
          return p.id !== id;
        });
        saveToStorage();
        renderPersonList();
        updateReportsToOptions();
        renderOrgChart();
      };

      function renderPersonList() {
        var container = document.getElementById("personList");
        container.textContent = "";

        if (people.length === 0) {
          var emptyMsg = document.createElement("div");
          emptyMsg.style.color = "var(--color-text-muted)";
          emptyMsg.style.fontSize = "0.875rem";
          emptyMsg.style.textAlign = "center";
          emptyMsg.style.padding = "16px";
          emptyMsg.textContent = "\u6682\u65E0\u4EBA\u5458";
          container.appendChild(emptyMsg);
          return;
        }

        people.forEach(function (person) {
          var item = document.createElement("div");
          item.className = "person-item";

          var info = document.createElement("div");
          info.className = "person-item-info";

          var name = document.createElement("div");
          name.className = "person-item-name";
          name.textContent = person.name;

          var title = document.createElement("div");
          title.className = "person-item-title";
          title.textContent = person.title || "\u65E0\u804C\u4F4D";

          info.appendChild(name);
          info.appendChild(title);

          var removeBtn = document.createElement("button");
          removeBtn.className = "btn btn-sm btn-danger";
          removeBtn.textContent = "\u5220\u9664";
          removeBtn.onclick = function () {
            removePerson(person.id);
          };

          item.appendChild(info);
          item.appendChild(removeBtn);
          container.appendChild(item);
        });
      }

      function updateReportsToOptions() {
        var select = document.getElementById("reportsTo");
        var currentValue = select.value;
        select.textContent = "";

        var emptyOption = document.createElement("option");
        emptyOption.value = "";
        emptyOption.textContent = "\u65E0\uFF08\u9876\u5C42\uFF09";
        select.appendChild(emptyOption);

        people.forEach(function (person) {
          var option = document.createElement("option");
          option.value = person.id;
          option.textContent = person.name + (person.title ? " - " + person.title : "");
          select.appendChild(option);
        });

        select.value = currentValue;
      }

      function buildTree() {
        var map = {};
        var roots = [];

        people.forEach(function (person) {
          map[person.id] = { person: person, children: [] };
        });

        people.forEach(function (person) {
          if (person.reportsTo && map[person.reportsTo]) {
            map[person.reportsTo].children.push(map[person.id]);
          } else {
            roots.push(map[person.id]);
          }
        });

        return roots;
      }

      function renderOrgChart() {
        var container = document.getElementById("orgChart");
        container.textContent = "";

        var roots = buildTree();

        if (roots.length === 0) {
          var emptyMsg = document.createElement("div");
          emptyMsg.style.color = "#999";
          emptyMsg.style.textAlign = "center";
          emptyMsg.style.padding = "40px";
          emptyMsg.textContent =
            "\u6DFB\u52A0\u4EBA\u5458\u4EE5\u751F\u6210\u7EC4\u7EC7\u67B6\u6784\u56FE";
          container.appendChild(emptyMsg);
          return;
        }

        roots.forEach(function (root) {
          var nodeEl = renderNode(root, true);
          container.appendChild(nodeEl);
        });
      }

      function renderNode(node, isRoot) {
        var nodeEl = document.createElement("div");
        nodeEl.className = "org-node";

        var card = document.createElement("div");
        card.className = "org-card" + (isRoot ? " root" : "");

        var nameEl = document.createElement("div");
        nameEl.className = "org-card-name";
        nameEl.textContent = node.person.name;

        var titleEl = document.createElement("div");
        titleEl.className = "org-card-title";
        titleEl.textContent = node.person.title || "\u65E0\u804C\u4F4D";

        card.appendChild(nameEl);
        card.appendChild(titleEl);
        nodeEl.appendChild(card);

        if (node.children.length > 0) {
          var connector = document.createElement("div");
          connector.className = "org-connector-vertical";
          nodeEl.appendChild(connector);

          var childrenContainer = document.createElement("div");
          childrenContainer.className = "org-children";
          childrenContainer.style.marginTop = "40px";

          // Calculate connector width
          var childCount = node.children.length;
          if (childCount > 1) {
            childrenContainer.style.setProperty("--connector-width", (childCount - 1) * 190 + "px");
          } else {
            childrenContainer.style.setProperty("--connector-width", "0px");
          }

          node.children.forEach(function (child) {
            var childWrapper = document.createElement("div");
            childWrapper.style.position = "relative";

            var childConnector = document.createElement("div");
            childConnector.className = "org-child-connector";
            childWrapper.appendChild(childConnector);

            var childNode = renderNode(child, false);
            childWrapper.appendChild(childNode);
            childrenContainer.appendChild(childWrapper);
          });

          nodeEl.appendChild(childrenContainer);
        }

        return nodeEl;
      }

      document.getElementById("btnPrint").onclick = function () {
        window.print();
      };

      document.getElementById("btnClear").onclick = function () {
        if (confirm("\u786E\u5B9A\u8981\u6E05\u7A7A\u6240\u6709\u4EBA\u5458\u5417\uFF1F")) {
          people = [];
          nextId = 1;
          localStorage.removeItem(LS_KEY);
          renderPersonList();
          updateReportsToOptions();
          renderOrgChart();
        }
      };

      // Theme toggle
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

      // Initialize
      initTheme();
      loadFromStorage();
      renderPersonList();
      updateReportsToOptions();
      renderOrgChart();
    
