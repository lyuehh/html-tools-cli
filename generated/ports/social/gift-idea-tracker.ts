// @ts-nocheck
// Generated from tools/social/gift-idea-tracker.html
// Source SHA-256: b5f1d82463ded9a8c3b17b14f1ee41823fa1430c63b0fa2d1be072d279812c80
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const STORAGE_KEY = "html_tools_gift_ideas_v1";
      let people = [];

      // HTML escape function to prevent XSS
      function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }

      function loadData() {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          people = saved ? JSON.parse(saved) : [];
        } catch (e) {
          people = [];
        }
        render();
      }

      function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
      }

      function addPerson() {
        const name = document.getElementById("personName").value.trim();
        const relation = document.getElementById("relation").value;
        const interests = document.getElementById("interests").value.trim();

        if (!name) {
          alert("请输入姓名");
          return;
        }

        people.unshift({
          id: Date.now(),
          name,
          relation,
          interests,
          ideas: []
        });

        document.getElementById("personName").value = "";
        document.getElementById("interests").value = "";

        saveData();
        render();
      }

      function deletePerson(id) {
        if (!confirm("确定要删除这个人员吗？")) return;
        people = people.filter((p) => p.id !== id);
        saveData();
        render();
      }

      function addIdea(personId) {
        const input = document.getElementById(`idea-input-${personId}`);
        const idea = input.value.trim();

        if (!idea) return;

        const person = people.find((p) => p.id === personId);
        if (person) {
          person.ideas.unshift({
            id: Date.now(),
            text: idea,
            addedAt: new Date().toISOString()
          });
          saveData();
          render();
        }
      }

      function deleteIdea(personId, ideaId) {
        const person = people.find((p) => p.id === personId);
        if (person) {
          person.ideas = person.ideas.filter((i) => i.id !== ideaId);
          saveData();
          render();
        }
      }

      function render() {
        const container = document.getElementById("peopleList");

        if (people.length === 0) {
          container.innerHTML = `
          <div class="empty-state">
            <div class="icon">📝</div>
            <div>还没有添加人员<br>添加亲友信息，记录礼物灵感！</div>
          </div>
        `;
          return;
        }

        container.innerHTML = people
          .map(
            (person) => `
        <div class="person-card">
          <div class="person-header">
            <div>
              <div class="person-name">${escapeHtml(person.name)}</div>
              <div class="person-relation">${escapeHtml(person.relation)}${person.interests ? " · " + escapeHtml(person.interests) : ""}</div>
            </div>
            <div class="person-actions">
              <button onclick="deletePerson(${person.id})">删除</button>
            </div>
          </div>

          <div class="ideas-section">
            <div class="ideas-title">💡 礼物灵感 (${person.ideas.length})</div>
            ${person.ideas
              .map(
                (idea) => `
              <div class="idea-item">
                <div class="idea-text">${escapeHtml(idea.text)}</div>
                <button class="idea-delete" onclick="deleteIdea(${person.id}, ${idea.id})">×</button>
              </div>
            `
              )
              .join("")}
            <div class="add-idea-form">
              <input
                type="text"
                id="idea-input-${person.id}"
                placeholder="添加礼物想法..."
                onkeypress="if(event.key==='Enter') addIdea(${person.id})"
              />
              <button onclick="addIdea(${person.id})">添加</button>
            </div>
          </div>
        </div>
      `
          )
          .join("");
      }

      // Initialize
      loadData();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
