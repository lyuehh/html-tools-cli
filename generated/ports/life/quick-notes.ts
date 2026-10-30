// @ts-nocheck
// Generated from tools/life/quick-notes.html
// Source SHA-256: 59934833afbd5ed765cbf74338f7f17d366ff9966358abfa0619662eb9a1962c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const COLORS = ["#fef3c7", "#dbeafe", "#d1fae5", "#fce7f3", "#e0e7ff", "#fecaca"];
      let notes = [];

      document.addEventListener("DOMContentLoaded", () => {
        initTheme();
        loadNotes();
        renderNotes();
      });

      function initTheme() {
        const s = localStorage.getItem("theme");
        if (s) document.documentElement.setAttribute("data-theme", s);
      }
      window.toggleTheme = function () {
        const c = document.documentElement.getAttribute("data-theme");
        const n = c === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", n);
        localStorage.setItem("theme", n);
      };

      function loadNotes() {
        const s = localStorage.getItem("quickNotes");
        if (s)
          try {
            notes = JSON.parse(s);
          } catch (e) {
            notes = [];
          }
      }
      function saveNotes() {
        localStorage.setItem("quickNotes", JSON.stringify(notes));
      }

      window.addNote = function () {
        notes.unshift({
          id: Date.now(),
          content: "",
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          created: Date.now(),
          updated: Date.now()
        });
        saveNotes();
        renderNotes();
      };

      window.updateNote = function (id, content) {
        const note = notes.find((n) => n.id === id);
        if (note) {
          note.content = content;
          note.updated = Date.now();
          saveNotes();
        }
      };

      window.changeColor = function (id, color) {
        const note = notes.find((n) => n.id === id);
        if (note) {
          note.color = color;
          saveNotes();
          renderNotes();
        }
      };

      window.deleteNote = function (id) {
        if (confirm("确定删除此便签？")) {
          notes = notes.filter((n) => n.id !== id);
          saveNotes();
          renderNotes();
        }
      };

      window.copyNote = function (id) {
        const note = notes.find((n) => n.id === id);
        if (note) {
          navigator.clipboard.writeText(note.content);
          showToast("已复制");
        }
      };

      function renderNotes() {
        const search = document.getElementById("searchInput").value.toLowerCase();
        const filtered = notes.filter((n) => n.content.toLowerCase().includes(search));
        document.getElementById("noteCount").textContent = notes.length;

        const grid = document.getElementById("notesGrid");
        grid.innerHTML =
          '<div class="add-note" onclick="addNote()"><span style="font-size:2rem">➕</span></div>' +
          filtered
            .map((note) => {
              const time = new Date(note.updated).toLocaleString();
              const colorPicker = COLORS.map(
                (c) =>
                  '<span style="background:' +
                  c +
                  '" class="' +
                  (c === note.color ? "active" : "") +
                  '" onclick="changeColor(' +
                  note.id +
                  ",'" +
                  c +
                  "')\"></span>"
              ).join("");
              return (
                '<div class="note-card" style="background:' +
                note.color +
                '">' +
                '<div class="actions">' +
                '<button onclick="copyNote(' +
                note.id +
                ')" aria-label="📋">📋</button>' +
                '<button onclick="deleteNote(' +
                note.id +
                ')" aria-label="🗑️">🗑️</button>' +
                "</div>" +
                '<textarea placeholder="写点什么..." oninput="updateNote(' +
                note.id +
                ', this.value)">' +
                escapeHtml(note.content) +
                "</textarea>" +
                '<div class="color-picker">' +
                colorPicker +
                "</div>" +
                '<div class="meta"><span>' +
                time +
                "</span><span>" +
                note.content.length +
                " 字</span></div>" +
                "</div>"
              );
            })
            .join("");
      }

      window.exportNotes = function () {
        const b = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.download = "quick-notes.json";
        a.click();
        showToast("已导出");
      };
      window.importNotes = function () {
        document.getElementById("importInput").click();
      };
      window.handleImport = function (e) {
        const f = e.target.files[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = (ev) => {
          try {
            const data = JSON.parse(ev.target.result);
            notes = [...data, ...notes];
            saveNotes();
            renderNotes();
            showToast("已导入 " + data.length + " 个便签");
          } catch (err) {
            showToast("导入失败");
          }
        };
        r.readAsText(f);
        e.target.value = "";
      };

      window.escapeHtml = function (t) {
        return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      };
      function showToast(m) {
        const t = document.createElement("div");
        t.className = "toast";
        t.textContent = m;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2000);
      }
    
