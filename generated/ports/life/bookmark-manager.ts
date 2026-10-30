// @ts-nocheck
// Generated from tools/life/bookmark-manager.html
// Source SHA-256: e502bf722df091926ee0b937586819d697478fe1e764a80eeaa667cea34a2500
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      let editingId = null;
      let activeCategory = "全部";

      function save() {
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      }

      function getCategories() {
        const cats = new Set(bookmarks.map((b) => b.category));
        return ["全部", ...cats];
      }

      function getFavicon(url) {
        try {
          const domain = new URL(url).hostname;
          return domain.charAt(0).toUpperCase();
        } catch {
          return "🔗";
        }
      }

      function render() {
        const search = document.getElementById("search").value.toLowerCase();
        const cats = getCategories();

        document.getElementById("categories").innerHTML = cats
          .map(
            (c) =>
              `<button class="category-btn ${c === activeCategory ? "active" : ""}" onclick="setCategory('${c}')">${c}</button>`
          )
          .join("");

        const filtered = bookmarks.filter(
          (b) =>
            (activeCategory === "全部" || b.category === activeCategory) &&
            (b.title.toLowerCase().includes(search) || b.url.toLowerCase().includes(search))
        );

        if (filtered.length === 0) {
          document.getElementById("bookmarks").innerHTML = '<div class="empty">暂无书签</div>';
        } else {
          document.getElementById("bookmarks").innerHTML = filtered
            .map(
              (b) => `
                    <div class="bookmark">
                        <div class="bookmark-icon">${getFavicon(b.url)}</div>
                        <div class="bookmark-info">
                            <div class="bookmark-title">${escapeHtml(b.title)}</div>
                            <div class="bookmark-url">${escapeHtml(b.url)}</div>
                        </div>
                        <div class="bookmark-actions">
                            <button class="bookmark-btn" onclick="window.open('${b.url}', '_blank')">🔗</button>
                            <button class="bookmark-btn" onclick="editBookmark(${b.id})">✏️</button>
                            <button class="bookmark-btn" onclick="deleteBookmark(${b.id})">🗑️</button>
                        </div>
                    </div>
                `
            )
            .join("");
        }
      }

      function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }

      function setCategory(cat) {
        activeCategory = cat;
        render();
      }

      function openModal(id = null) {
        editingId = id;
        const bm = id ? bookmarks.find((b) => b.id === id) : null;
        document.getElementById("modalTitle").textContent = id ? "编辑书签" : "添加书签";
        document.getElementById("bmTitle").value = bm ? bm.title : "";
        document.getElementById("bmUrl").value = bm ? bm.url : "";
        document.getElementById("bmCategory").value = bm ? bm.category : "常用";
        document.getElementById("modal").classList.add("show");
      }

      function closeModal() {
        document.getElementById("modal").classList.remove("show");
        editingId = null;
      }

      function saveBookmark() {
        const title = document.getElementById("bmTitle").value.trim();
        const url = document.getElementById("bmUrl").value.trim();
        const category = document.getElementById("bmCategory").value;
        if (!title || !url) return alert("请填写标题和URL");

        if (editingId) {
          const bm = bookmarks.find((b) => b.id === editingId);
          if (bm) {
            bm.title = title;
            bm.url = url;
            bm.category = category;
          }
        } else {
          bookmarks.unshift({ id: Date.now(), title, url, category });
        }
        save();
        render();
        closeModal();
      }

      function editBookmark(id) {
        openModal(id);
      }

      function deleteBookmark(id) {
        if (confirm("确定删除这个书签？")) {
          bookmarks = bookmarks.filter((b) => b.id !== id);
          save();
          render();
        }
      }

      render();
    
