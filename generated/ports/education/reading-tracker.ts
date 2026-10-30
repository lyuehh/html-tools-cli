// @ts-nocheck
// Generated from tools/education/reading-tracker.html
// Source SHA-256: f788c0593ca96167ee435fc669f2e0ea46d3656840990acdcb148d6e17e79dab
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let books = JSON.parse(localStorage.getItem("reading_tracker") || "[]");
      let currentFilter = "all";

      function showForm() {
        document.getElementById("addForm").classList.add("show");
        document.getElementById("bookTitle").focus();
      }

      function hideForm() {
        document.getElementById("addForm").classList.remove("show");
        document.getElementById("bookTitle").value = "";
        document.getElementById("bookAuthor").value = "";
        document.getElementById("bookPages").value = "";
      }

      function addBook() {
        const title = document.getElementById("bookTitle").value.trim();
        const author = document.getElementById("bookAuthor").value.trim();
        const totalPages = parseInt(document.getElementById("bookPages").value);

        if (!title || !author || !totalPages) {
          alert("请填写完整信息");
          return;
        }

        books.push({
          id: Date.now(),
          title,
          author,
          totalPages,
          currentPage: 0,
          status: "reading", // reading, finished
          startDate: new Date().toISOString()
        });

        localStorage.setItem("reading_tracker", JSON.stringify(books));
        hideForm();
        render();
      }

      function updateProgress(id) {
        const book = books.find((b) => b.id === id);
        const input = document.getElementById(`progress-${id}`);
        const newPage = parseInt(input.value);

        if (!newPage || newPage < 0 || newPage > book.totalPages) {
          alert(`请输入 0-${book.totalPages} 之间的页码`);
          return;
        }

        book.currentPage = newPage;

        if (newPage >= book.totalPages && book.status !== "finished") {
          book.status = "finished";
          book.finishDate = new Date().toISOString();
          alert(`🎉 恭喜完成《${book.title}》！`);
        } else if (newPage < book.totalPages && book.status === "finished") {
          book.status = "reading";
          delete book.finishDate;
        }

        localStorage.setItem("reading_tracker", JSON.stringify(books));
        render();
      }

      function deleteBook(id) {
        const book = books.find((b) => b.id === id);
        if (confirm(`确定要删除《${book.title}》吗？`)) {
          books = books.filter((b) => b.id !== id);
          localStorage.setItem("reading_tracker", JSON.stringify(books));
          render();
        }
      }

      function filterBooks(filter) {
        currentFilter = filter;
        document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
        event.target.classList.add("active");
        render();
      }

      function render() {
        // Update stats
        const reading = books.filter((b) => b.status === "reading").length;
        const finished = books.filter((b) => b.status === "finished").length;
        const totalPagesRead = books.reduce((sum, b) => sum + b.currentPage, 0);

        document.getElementById("totalBooks").textContent = books.length;
        document.getElementById("readingBooks").textContent = reading;
        document.getElementById("finishedBooks").textContent = finished;
        document.getElementById("totalPages").textContent = totalPagesRead;

        // Filter books
        let filteredBooks = books;
        if (currentFilter === "reading") {
          filteredBooks = books.filter((b) => b.status === "reading");
        } else if (currentFilter === "finished") {
          filteredBooks = books.filter((b) => b.status === "finished");
        }

        const list = document.getElementById("booksList");

        if (filteredBooks.length === 0) {
          const emptyText =
            currentFilter === "all"
              ? "还没有添加书籍"
              : currentFilter === "reading"
                ? "没有正在阅读的书籍"
                : "还没有完成任何书籍";
          list.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">📖</div>
            <div>${emptyText}</div>
            <div style="font-size:.85rem;margin-top:.25rem">点击下方按钮添加书籍</div>
          </div>
        `;
          return;
        }

        list.innerHTML = filteredBooks
          .map((book) => {
            const progress = Math.round((book.currentPage / book.totalPages) * 100);
            const statusText = book.status === "finished" ? "已完成" : "阅读中";
            const statusClass = book.status === "finished" ? "finished" : "reading";

            return `
          <div class="book-card ${statusClass}">
            <div class="book-header">
              <div class="book-info">
                <div class="book-title">
                  ${book.title}
                  <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
                <div class="book-author">${book.author} · ${book.totalPages}页</div>
              </div>
              <div class="book-actions">
                <button class="action-btn" onclick="deleteBook(${book.id})" title="删除">🗑️</button>
              </div>
            </div>
            <div class="book-progress">
              <div class="progress-bar-container">
                <div class="progress-bar" style="width:${progress}%"></div>
              </div>
              <div class="progress-text">
                <span>第 ${book.currentPage} 页</span>
                <span>${progress}%</span>
              </div>
            </div>
            <div class="update-progress">
              <input type="number" id="progress-${book.id}" placeholder="更新页码" min="0" max="${book.totalPages}">
              <button onclick="updateProgress(${book.id})">更新</button>
            </div>
          </div>
        `;
          })
          .join("");
      }

      // Initialize
      render();

      // Handle Enter key
      document.getElementById("bookPages").addEventListener("keypress", (e) => {
        if (e.key === "Enter") addBook();
      });

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
    
