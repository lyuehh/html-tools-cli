// @ts-nocheck
// Generated from tools/life/todo-list.html
// Source SHA-256: db8973b3670431f69f47049db52b4a67fe9acebe6b0a5d14c3a00bf5fd7ee4bd
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let todos = JSON.parse(localStorage.getItem("todos") || "[]");
      let filter = "all";

      function save() {
        localStorage.setItem("todos", JSON.stringify(todos));
      }

      function render() {
        const filtered = todos.filter((t) => {
          if (filter === "active") return !t.completed;
          if (filter === "completed") return t.completed;
          return true;
        });

        const list = document.getElementById("todoList");
        if (filtered.length === 0) {
          list.innerHTML = '<div class="empty">暂无任务</div>';
        } else {
          list.innerHTML = filtered
            .map(
              (t) => `
                    <div class="todo-item ${t.completed ? "completed" : ""}">
                        <div class="todo-checkbox ${t.completed ? "checked" : ""}" onclick="toggleTodo(${t.id})"></div>
                        <span class="todo-text">${escapeHtml(t.text)}</span>
                        <button class="todo-delete" onclick="deleteTodo(${t.id})">×</button>
                    </div>
                `
            )
            .join("");
        }

        const remaining = todos.filter((t) => !t.completed).length;
        document.getElementById("remaining").textContent = `${remaining} 项未完成`;
      }

      function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }

      function addTodo() {
        const input = document.getElementById("newTodo");
        const text = input.value.trim();
        if (!text) return;
        todos.push({ id: Date.now(), text, completed: false });
        input.value = "";
        save();
        render();
      }

      function toggleTodo(id) {
        const todo = todos.find((t) => t.id === id);
        if (todo) todo.completed = !todo.completed;
        save();
        render();
      }

      function deleteTodo(id) {
        todos = todos.filter((t) => t.id !== id);
        save();
        render();
      }

      function clearCompleted() {
        todos = todos.filter((t) => !t.completed);
        save();
        render();
      }

      function setFilter(f) {
        filter = f;
        document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
        event.target.classList.add("active");
        render();
      }

      render();
    
