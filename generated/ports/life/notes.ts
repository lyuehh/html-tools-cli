// @ts-nocheck
// Generated from tools/life/notes.html
// Source SHA-256: 837f0b3e5ab6d22a7580c781e0c767409868002b1c17d8dd72718f77e635d629
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const colors = [
        "#ff6b6b",
        "#feca57",
        "#48dbfb",
        "#1dd1a1",
        "#5f27cd",
        "#ff9ff3",
        "#54a0ff",
        "#00d2d3"
      ];
      let notes = JSON.parse(localStorage.getItem("notes") || "[]");
      let editingId = null;
      let selectedColor = colors[0];
      let searchTerm = "";

      function save() {
        localStorage.setItem("notes", JSON.stringify(notes));
      }

      function render() {
        const filtered = notes.filter(
          (n) =>
            n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            n.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const grid = document.getElementById("notesGrid");
        if (!grid) return;
        if (filtered.length === 0) {
          grid.innerHTML = '<div class="empty">暂无笔记，点击"新建笔记"开始</div>';
        } else {
          grid.innerHTML = filtered
            .map(
              (n) => `
                    <div class="note">
                        <div class="note-color" style="background: ${n.color}"></div>
                        <div class="note-title">${escapeHtml(n.title) || "无标题"}</div>
                        <div class="note-content">${escapeHtml(n.content)}</div>
                        <div class="note-footer">
                            <span class="note-date">${new Date(n.date).toLocaleDateString()}</span>
                            <div class="note-actions">
                                <button class="note-btn" onclick="editNote(${n.id})">✏️</button>
                                <button class="note-btn" onclick="deleteNote(${n.id})">🗑️</button>
                            </div>
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

      function openModal(id = null) {
        editingId = id;
        const note = id ? notes.find((n) => n.id === id) : null;
        document.getElementById("modalTitle").textContent = id ? "编辑笔记" : "新建笔记";
        document.getElementById("noteTitle").value = note ? note.title : "";
        document.getElementById("noteContent").value = note ? note.content : "";
        selectedColor = note ? note.color : colors[0];
        renderColorPicker();
        document.getElementById("modal").classList.add("show");
      }

      function closeModal() {
        document.getElementById("modal").classList.remove("show");
        editingId = null;
      }

      function renderColorPicker() {
        const colorPicker = document.getElementById("colorPicker");
        if (!colorPicker) return;
        colorPicker.innerHTML = colors
          .map(
            (c) =>
              `<div class="color-option ${c === selectedColor ? "selected" : ""}" style="background: ${c}" onclick="selectColor('${c}')"></div>`
          )
          .join("");
      }

      function selectColor(color) {
        selectedColor = color;
        renderColorPicker();
      }

      function saveNote() {
        const title = document.getElementById("noteTitle").value.trim();
        const content = document.getElementById("noteContent").value.trim();
        if (!title && !content) return;

        if (editingId) {
          const note = notes.find((n) => n.id === editingId);
          if (note) {
            note.title = title;
            note.content = content;
            note.color = selectedColor;
          }
        } else {
          notes.unshift({
            id: Date.now(),
            title,
            content,
            color: selectedColor,
            date: new Date().toISOString()
          });
        }
        save();
        render();
        closeModal();
      }

      function editNote(id) {
        openModal(id);
      }

      function deleteNote(id) {
        if (confirm("确定删除这条笔记？")) {
          notes = notes.filter((n) => n.id !== id);
          save();
          render();
        }
      }

      function search(term) {
        searchTerm = term;
        render();
      }

      renderColorPicker();
      render();
    
