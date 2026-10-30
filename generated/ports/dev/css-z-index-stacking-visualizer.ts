// @ts-nocheck
// Generated from tools/dev/css-z-index-stacking-visualizer.html
// Source SHA-256: 5d25cf405684eca8cfe0b7ac5359ebc1e3102a4e3642749acf6019d032494e46
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      /* =========================================================
       *  CSS z-index 层叠上下文可视化
       *  纯客户端，无第三方依赖
       * ========================================================= */

      // 元素数据结构
      // id, name, parentId('root' or id), position, zIndex, opacity, transform, isolation, color
      var elements = [];
      var nextId = 1;
      var selectedId = null;

      var COLORS = [
        "#f72585",
        "#4cc9f0",
        "#fbbf24",
        "#10b981",
        "#8b5cf6",
        "#ff9f1c",
        "#06d6a0",
        "#ef476f",
        "#118ab2",
        "#ffd166",
        "#6a4c93",
        "#1982c4"
      ];
      var colorIdx = 0;

      function nextColor() {
        var c = COLORS[colorIdx % COLORS.length];
        colorIdx++;
        return c;
      }

      function isStackingContext(el) {
        if (el.parentId === "root") return true; // root is always a context
        if (el.isolation === "isolate") return true;
        if (el.opacity < 1) return true;
        if (el.transform !== "none") return true;
        if (
          (el.position === "relative" ||
            el.position === "absolute" ||
            el.position === "fixed" ||
            el.position === "sticky") &&
          el.zIndex !== "auto" &&
          !isNaN(parseInt(el.zIndex))
        )
          return true;
        return false;
      }

      function addElement(data) {
        var el = {
          id: "el" + nextId++,
          name: data.name || ".element",
          parentId: data.parentId || "root",
          position: data.position || "relative",
          zIndex: data.zIndex !== undefined ? parseInt(data.zIndex) : 1,
          opacity: data.opacity !== undefined ? parseFloat(data.opacity) : 1,
          transform: data.transform || "none",
          isolation: data.isolation || "auto",
          color: data.color || nextColor()
        };
        elements.push(el);
        render();
        return el;
      }

      function removeElement(id) {
        // Also remove children
        var toRemove = collectDescendants(id);
        toRemove.push(id);
        elements = elements.filter(function (e) {
          return toRemove.indexOf(e.id) === -1;
        });
        if (selectedId && toRemove.indexOf(selectedId) !== -1) selectedId = null;
        render();
      }

      function collectDescendants(parentId) {
        var result = [];
        elements.forEach(function (e) {
          if (e.parentId === parentId) {
            result.push(e.id);
            collectDescendants(e.id).forEach(function (d) {
              result.push(d);
            });
          }
        });
        return result;
      }

      function getById(id) {
        return elements.find(function (e) {
          return e.id === id;
        });
      }

      // Sort elements by their effective stacking order (within a context)
      // Returns array sorted bottom→top
      function sortedByStack(els) {
        return els.slice().sort(function (a, b) {
          var az = isNaN(parseInt(a.zIndex)) ? 0 : parseInt(a.zIndex);
          var bz = isNaN(parseInt(b.zIndex)) ? 0 : parseInt(b.zIndex);
          if (az !== bz) return az - bz;
          return elements.indexOf(a) - elements.indexOf(b);
        });
      }

      // Get stacking order string for an element
      function effectiveZIndex(el) {
        return isNaN(parseInt(el.zIndex)) ? 0 : parseInt(el.zIndex);
      }

      // Lay out elements on canvas with pseudo-overlap positions
      function computeLayout() {
        var W = 600;
        var H = 360;
        var placed = {};

        // Assign positions: stagger overlapping elements for visibility
        // Root children first
        var rootChildren = elements.filter(function (e) {
          return e.parentId === "root";
        });
        var sorted = sortedByStack(rootChildren);
        var positions = {};

        sorted.forEach(function (el, i) {
          var baseX = 30 + (i % 4) * 120;
          var baseY = 30 + Math.floor(i / 4) * 90;
          var w = 160;
          var h = 80;
          positions[el.id] = { x: baseX, y: baseY, w: w, h: h, depth: 0 };
          placed[el.id] = true;

          // Children of this element
          var children = elements.filter(function (e) {
            return e.parentId === el.id;
          });
          var sortedC = sortedByStack(children);
          sortedC.forEach(function (child, ci) {
            var cx = baseX + 20 + ci * 30;
            var cy = baseY + 20 + ci * 8;
            if (cx + 130 > baseX + w) {
              cx = baseX + 10;
              cy = baseY + 30 + ci * 12;
            }
            positions[child.id] = { x: cx, y: cy, w: 130, h: 55, depth: 1 };
            placed[child.id] = true;
          });
        });

        // Anything left (deeper nesting) - place at end
        elements.forEach(function (el) {
          if (!placed[el.id]) {
            positions[el.id] = { x: 20, y: H - 80, w: 120, h: 50, depth: 2 };
          }
        });

        // Clamp
        Object.keys(positions).forEach(function (id) {
          var p = positions[id];
          p.x = Math.max(4, Math.min(p.x, W - p.w - 4));
          p.y = Math.max(4, Math.min(p.y, H - p.h - 4));
        });

        return positions;
      }

      // Determine effective render order (bottom→top) for the whole tree
      function globalRenderOrder() {
        // For simplicity: sort all by (parentZIndex, zIndex, dom order)
        // This approximates real stacking but keeps the tool intuitive
        var order = [];
        function visit(parentId, baseZ) {
          var children = elements.filter(function (e) {
            return e.parentId === parentId;
          });
          var sorted = sortedByStack(children);
          sorted.forEach(function (el) {
            order.push({ el: el, effectiveZ: baseZ * 10000 + effectiveZIndex(el) });
            if (isStackingContext(el)) {
              // Children are painted within this context, inherit parent's effective z
              visit(el.id, baseZ * 10000 + effectiveZIndex(el));
            } else {
              visit(el.id, baseZ);
            }
          });
        }
        visit("root", 0);
        // stable sort by effectiveZ
        order.sort(function (a, b) {
          return a.effectiveZ - b.effectiveZ;
        });
        return order.map(function (o) {
          return o.el;
        });
      }

      function render() {
        renderElementList();
        renderCanvas();
        renderOrderBar();
        renderCssOutput();
        renderParentSelect();
        renderEditPanel();
      }

      function renderElementList() {
        var list = document.getElementById("elementList");
        list.innerHTML = "";
        document.getElementById("elCount").textContent = "(" + elements.length + ")";
        if (elements.length === 0) {
          var empty = document.createElement("div");
          empty.style.cssText =
            "font-family:var(--font-mono);font-size:.75rem;color:var(--color-text-muted);padding:8px 0;text-align:center;";
          empty.textContent = "暂无元素，点击「添加元素」";
          list.appendChild(empty);
          return;
        }
        elements.forEach(function (el) {
          var item = document.createElement("div");
          item.className = "element-item" + (selectedId === el.id ? " selected" : "");
          item.dataset.id = el.id;

          var dot = document.createElement("div");
          dot.className = "element-color-dot";
          dot.style.background = el.color;

          var name = document.createElement("div");
          name.className = "element-name";
          name.textContent = (el.parentId !== "root" ? "  ↳ " : "") + el.name;

          var badge = document.createElement("div");
          badge.className = "element-badge";
          badge.textContent = "z:" + el.zIndex;

          var del = document.createElement("button");
          del.className = "element-delete";
          del.textContent = "✕";
          del.title = "删除";
          del.dataset.id = el.id;
          del.addEventListener("click", function (ev) {
            ev.stopPropagation();
            removeElement(this.dataset.id);
            showStatus("已删除 " + el.name);
          });

          item.appendChild(dot);
          item.appendChild(name);
          item.appendChild(badge);
          if (isStackingContext(el)) {
            var ctx = document.createElement("div");
            ctx.className = "element-badge";
            ctx.style.background = "rgba(0,245,212,.12)";
            ctx.style.color = "var(--color-accent-primary)";
            ctx.textContent = "SC";
            ctx.title = "Stacking Context";
            item.appendChild(ctx);
          }
          item.appendChild(del);

          item.addEventListener("click", function () {
            selectedId = this.dataset.id;
            render();
          });

          list.appendChild(item);
        });
      }

      function renderCanvas() {
        var canvas = document.getElementById("stackingCanvas");
        canvas.innerHTML = "";
        if (elements.length === 0) {
          var hint = document.createElement("div");
          hint.style.cssText =
            "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:.8125rem;color:var(--color-text-muted);";
          hint.textContent = "添加元素后在此查看层叠效果";
          canvas.appendChild(hint);
          return;
        }

        var renderOrder = globalRenderOrder();
        var positions = computeLayout();

        renderOrder.forEach(function (el) {
          var pos = positions[el.id];
          if (!pos) return;
          var div = document.createElement("div");
          div.className = "stack-el" + (selectedId === el.id ? " highlighted" : "");
          div.style.left = pos.x + "px";
          div.style.top = pos.y + "px";
          div.style.width = pos.w + "px";
          div.style.height = pos.h + "px";
          div.style.zIndex = effectiveZIndex(el);
          div.style.borderColor = el.color;
          div.style.background =
            el.color.replace(")", "").replace("rgb(", "rgba(").replace(/^#/, "") +
            (el.color.startsWith("#")
              ? "; background: " + hexToRgba(el.color, pos.depth === 0 ? 0.25 : 0.35)
              : "");
          // Simpler background
          div.style.background = hexToRgba(el.color, pos.depth === 0 ? 0.22 : 0.32);
          div.dataset.id = el.id;

          var nameEl = document.createElement("div");
          nameEl.className = "stack-el-name";
          nameEl.textContent = el.name;

          var infoEl = document.createElement("div");
          infoEl.className = "stack-el-info";
          infoEl.textContent = "z-index: " + el.zIndex + " | " + el.position;

          div.appendChild(nameEl);
          div.appendChild(infoEl);

          if (isStackingContext(el)) {
            var sc = document.createElement("div");
            sc.className = "stack-context-badge";
            sc.textContent = "Stacking Context";
            div.appendChild(sc);
          }

          div.addEventListener("click", function () {
            selectedId = this.dataset.id;
            render();
          });

          canvas.appendChild(div);
        });
      }

      function hexToRgba(hex, alpha) {
        var r = parseInt(hex.slice(1, 3), 16);
        var g = parseInt(hex.slice(3, 5), 16);
        var b = parseInt(hex.slice(5, 7), 16);
        return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
      }

      function renderOrderBar() {
        var bar = document.getElementById("orderList");
        bar.innerHTML = "";
        var order = globalRenderOrder();
        if (order.length === 0) {
          var em = document.createElement("span");
          em.style.cssText =
            "font-family:var(--font-mono);font-size:.75rem;color:var(--color-text-muted);";
          em.textContent = "暂无元素";
          bar.appendChild(em);
          return;
        }
        order.forEach(function (el, idx) {
          if (idx > 0) {
            var arrow = document.createElement("span");
            arrow.className = "order-arrow";
            arrow.textContent = "→";
            bar.appendChild(arrow);
          }
          var chip = document.createElement("div");
          chip.className = "order-chip";
          chip.style.borderColor = el.color;
          chip.style.background = hexToRgba(el.color, 0.1);
          chip.style.color = el.color;
          chip.dataset.id = el.id;

          var dot = document.createElement("div");
          dot.className = "order-chip-dot";
          dot.style.background = el.color;

          var label = document.createElement("span");
          label.textContent = el.name + " (z:" + el.zIndex + ")";

          chip.appendChild(dot);
          chip.appendChild(label);
          chip.addEventListener("click", function () {
            selectedId = this.dataset.id;
            render();
          });
          bar.appendChild(chip);
        });
      }

      function renderEditPanel() {
        var nameEl = document.getElementById("editPanelName");
        var content = document.getElementById("editPanelContent");
        if (!selectedId) {
          nameEl.textContent = "—";
          content.innerHTML =
            '<div class="edit-panel-empty">点击左侧元素或画布中元素，选择后编辑属性</div>';
          return;
        }
        var el = getById(selectedId);
        if (!el) {
          selectedId = null;
          renderEditPanel();
          return;
        }
        nameEl.textContent = el.name;

        var sc = isStackingContext(el);
        var scTag = sc
          ? '<span class="explain-tag yes">是</span>'
          : '<span class="explain-tag no">否</span>';

        content.innerHTML =
          '<div style="font-family:var(--font-mono);font-size:.75rem;color:var(--color-text-secondary);margin-bottom:8px;">' +
          "是否为层叠上下文：" +
          scTag +
          "</div>" +
          '<div class="edit-panel-grid">' +
          buildEditField("editPos", "position", "select", el.position, [
            "static",
            "relative",
            "absolute",
            "fixed",
            "sticky"
          ]) +
          buildEditField("editZ", "z-index", "number", el.zIndex) +
          buildEditField("editOp", "opacity", "number", el.opacity, null, "0", "1", "0.1") +
          buildEditField("editTr", "transform", "select", el.transform, [
            "none",
            "translateZ(0)",
            "scale(1.05)",
            "rotate(5deg)"
          ]) +
          buildEditField("editIso", "isolation", "select", el.isolation, ["auto", "isolate"]) +
          buildEditField("editName", "name", "text", el.name) +
          "</div>";

        // Bind edit handlers
        bindEditField("editPos", el, "position");
        bindEditField("editZ", el, "zIndex", true);
        bindEditField("editOp", el, "opacity", false, true);
        bindEditField("editTr", el, "transform");
        bindEditField("editIso", el, "isolation");
        bindEditField("editName", el, "name");
      }

      function buildEditField(id, label, type, value, options, min, max, step) {
        var html =
          '<div class="form-row"><label class="form-label" for="' + id + '">' + label + "</label>";
        if (type === "select") {
          html += '<select id="' + id + '" class="form-select">';
          options.forEach(function (o) {
            html +=
              '<option value="' +
              o +
              '"' +
              (o === String(value) ? " selected" : "") +
              ">" +
              o +
              "</option>";
          });
          html += "</select>";
        } else if (type === "number") {
          html +=
            '<input id="' +
            id +
            '" class="form-input" type="number" value="' +
            value +
            '"' +
            (min !== undefined ? ' min="' + min + '"' : "") +
            (max !== undefined ? ' max="' + max + '"' : "") +
            (step !== undefined ? ' step="' + step + '"' : "") +
            " />";
        } else {
          html +=
            '<input id="' +
            id +
            '" class="form-input" type="text" value="' +
            value +
            '" maxlength="20" />';
        }
        html += "</div>";
        return html;
      }

      function bindEditField(id, el, prop, isInt, isFloat) {
        var input = document.getElementById(id);
        if (!input) return;
        input.addEventListener("change", function () {
          var v = this.value;
          if (isInt) v = parseInt(v) || 0;
          else if (isFloat) v = parseFloat(v);
          el[prop] = v;
          render();
        });
      }

      function renderCssOutput() {
        var out = "";
        elements.forEach(function (el) {
          out += el.name + " {\n";
          out += "  position: " + el.position + ";\n";
          if (el.position !== "static" && !isNaN(parseInt(el.zIndex))) {
            out += "  z-index: " + el.zIndex + ";\n";
          }
          if (el.opacity < 1) out += "  opacity: " + el.opacity + ";\n";
          if (el.transform !== "none") out += "  transform: " + el.transform + ";\n";
          if (el.isolation !== "auto") out += "  isolation: " + el.isolation + ";\n";
          out += "}\n\n";
        });
        document.getElementById("cssOutput").textContent = out || "/* 添加元素后自动生成 CSS */";
      }

      function renderParentSelect() {
        var sel = document.getElementById("newParent");
        var prev = sel.value;
        sel.innerHTML = '<option value="root">根层叠上下文</option>';
        elements.forEach(function (el) {
          var opt = document.createElement("option");
          opt.value = el.id;
          opt.textContent = el.name + (isStackingContext(el) ? " (SC)" : "");
          sel.appendChild(opt);
        });
        if (prev && prev !== "root") sel.value = prev;
      }

      function showStatus(msg, type) {
        var el = document.getElementById("statusMsg");
        el.textContent = msg;
        el.className = "status " + (type || "success");
      }

      // Load default example
      function loadDefaultExample() {
        elements = [];
        nextId = 1;
        colorIdx = 0;
        addElement({
          name: ".page",
          parentId: "root",
          position: "relative",
          zIndex: 0,
          opacity: 1,
          transform: "none",
          isolation: "auto"
        });
        addElement({
          name: ".sidebar",
          parentId: "root",
          position: "relative",
          zIndex: 100,
          opacity: 1,
          transform: "none",
          isolation: "auto"
        });
        addElement({
          name: ".overlay",
          parentId: "root",
          position: "fixed",
          zIndex: 200,
          opacity: 0.9,
          transform: "none",
          isolation: "auto"
        });
        addElement({
          name: ".modal",
          parentId: "root",
          position: "fixed",
          zIndex: 300,
          opacity: 1,
          transform: "none",
          isolation: "isolate"
        });
        addElement({
          name: ".modal-btn",
          parentId: "el4",
          position: "relative",
          zIndex: 9999,
          opacity: 1,
          transform: "none",
          isolation: "auto"
        });
        addElement({
          name: ".tooltip",
          parentId: "root",
          position: "fixed",
          zIndex: 400,
          opacity: 1,
          transform: "none",
          isolation: "auto"
        });
      }

      // Bind toolbar buttons
      document.getElementById("btnAddEl").addEventListener("click", function () {
        document.getElementById("newName").focus();
        showStatus("填写左侧表单后点击「确认添加」");
      });

      document.getElementById("btnConfirmAdd").addEventListener("click", function () {
        var name = document.getElementById("newName").value.trim();
        if (!name) {
          showStatus("请输入元素名称", "error");
          return;
        }
        var parent = document.getElementById("newParent").value;
        var pos = document.getElementById("newPosition").value;
        var z = parseInt(document.getElementById("newZIndex").value) || 0;
        var op = parseFloat(document.getElementById("newOpacity").value);
        if (isNaN(op)) op = 1;
        var tr = document.getElementById("newTransform").value;
        var iso = document.getElementById("newIsolation").value;
        addElement({
          name: name,
          parentId: parent,
          position: pos,
          zIndex: z,
          opacity: op,
          transform: tr,
          isolation: iso
        });
        document.getElementById("newName").value = "";
        document.getElementById("newZIndex").value = "1";
        document.getElementById("newOpacity").value = "1";
        showStatus("已添加 " + name);
      });

      document.getElementById("btnReset").addEventListener("click", function () {
        loadDefaultExample();
        selectedId = null;
        showStatus("已重置示例");
      });

      document.getElementById("btnCopyCSS").addEventListener("click", function () {
        var css = document.getElementById("cssOutput").textContent;
        navigator.clipboard.writeText(css).then(
          function () {
            showStatus("CSS 已复制到剪贴板");
          },
          function () {
            showStatus("复制失败，请手动选择复制", "error");
          }
        );
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
      loadDefaultExample();
    
