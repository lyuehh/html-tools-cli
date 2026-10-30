// @ts-nocheck
// Generated from tools/office/slide-notes.html
// Source SHA-256: 83013ee4520fc2a73955a3542115545bb0376356ab3302ef69e29595519ec187
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "slide_notes_data_v1";
      var slides = [];
      var currentIndex = 0;
      var editingIndex = -1;
      var timerInterval = null;
      var timerSeconds = 0;
      var timerRunning = false;

      // Initialize
      function init() {
        loadTheme();
        loadFromStorage();
        renderSlideList();
        updateDisplay();
        updateNavigation();

        // Add input listeners for auto-save
        document
          .getElementById("presentationTitle")
          .addEventListener("input", debounce(saveToStorage, 500));

        // Keyboard navigation
        document.addEventListener("keydown", function (e) {
          if (editingIndex >= 0) return; // Don't navigate while editing

          if (e.key === "ArrowLeft" || e.key === "PageUp") {
            prevSlide();
          } else if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
            e.preventDefault();
            nextSlide();
          }
        });
      }

      // Timer functions
      function toggleTimer() {
        if (timerRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      }

      function startTimer() {
        timerRunning = true;
        document.getElementById("timerPlayBtn").textContent = "⏸";
        document.getElementById("timerPlayBtn").classList.add("active");

        timerInterval = setInterval(function () {
          timerSeconds++;
          updateTimerDisplay();
        }, 1000);
      }

      function pauseTimer() {
        timerRunning = false;
        document.getElementById("timerPlayBtn").textContent = "▶";
        document.getElementById("timerPlayBtn").classList.remove("active");

        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
      }

      function resetTimer() {
        pauseTimer();
        timerSeconds = 0;
        updateTimerDisplay();
      }

      function updateTimerDisplay() {
        var hours = Math.floor(timerSeconds / 3600);
        var minutes = Math.floor((timerSeconds % 3600) / 60);
        var seconds = timerSeconds % 60;

        var display =
          String(hours).padStart(2, "0") +
          ":" +
          String(minutes).padStart(2, "0") +
          ":" +
          String(seconds).padStart(2, "0");

        document.getElementById("timerDisplay").textContent = display;
      }

      // Slide navigation
      function prevSlide() {
        if (currentIndex > 0) {
          currentIndex--;
          updateDisplay();
          updateNavigation();
        }
      }

      function nextSlide() {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
          updateDisplay();
          updateNavigation();
        }
      }

      function goToSlide(index) {
        if (index >= 0 && index < slides.length) {
          currentIndex = index;
          updateDisplay();
          updateNavigation();
          renderSlideList();
        }
      }

      function updateNavigation() {
        document.getElementById("prevBtn").disabled = currentIndex === 0;
        document.getElementById("nextBtn").disabled = currentIndex >= slides.length - 1;
        document.getElementById("currentSlideNum").textContent =
          slides.length > 0 ? currentIndex + 1 : 0;
        document.getElementById("totalSlides").textContent = slides.length;
      }

      function updateDisplay() {
        if (slides.length === 0) {
          document.getElementById("slideTitle").textContent = "请添加幻灯片";
          document.getElementById("slideNotes").textContent =
            '点击下方"添加幻灯片"开始创建演讲笔记';
          return;
        }

        var slide = slides[currentIndex];
        document.getElementById("slideTitle").textContent = slide.title || "(无标题)";
        document.getElementById("slideNotes").textContent = slide.notes || "(无备注)";
      }

      // Slide CRUD
      function addSlide() {
        editingIndex = -1;
        document.getElementById("editTitle").value = "";
        document.getElementById("editNotes").value = "";
        document.getElementById("editSection").classList.add("show");
        document.getElementById("editTitle").focus();
      }

      function editSlide(index) {
        editingIndex = index;
        var slide = slides[index];
        document.getElementById("editTitle").value = slide.title;
        document.getElementById("editNotes").value = slide.notes;
        document.getElementById("editSection").classList.add("show");
        document.getElementById("editTitle").focus();
      }

      function saveSlide() {
        var title = document.getElementById("editTitle").value.trim();
        var notes = document.getElementById("editNotes").value.trim();

        if (!title) {
          title = "幻灯片 " + (editingIndex >= 0 ? editingIndex + 1 : slides.length + 1);
        }

        if (editingIndex >= 0) {
          // Update existing
          slides[editingIndex].title = title;
          slides[editingIndex].notes = notes;
          showToast("已更新");
        } else {
          // Add new
          slides.push({ title: title, notes: notes });
          currentIndex = slides.length - 1;
          showToast("已添加");
        }

        cancelEdit();
        renderSlideList();
        updateDisplay();
        updateNavigation();
        saveToStorage();
      }

      function cancelEdit() {
        editingIndex = -1;
        document.getElementById("editSection").classList.remove("show");
      }

      function deleteSlide(index) {
        if (!confirm("确定要删除这张幻灯片吗？")) return;

        slides.splice(index, 1);

        if (currentIndex >= slides.length) {
          currentIndex = Math.max(0, slides.length - 1);
        }

        renderSlideList();
        updateDisplay();
        updateNavigation();
        saveToStorage();
        showToast("已删除");
      }

      // Render slide list
      function renderSlideList() {
        var container = document.getElementById("slideList");
        container.textContent = "";

        if (slides.length === 0) {
          var placeholder = document.createElement("div");
          placeholder.style.textAlign = "center";
          placeholder.style.color = "var(--color-text-muted)";
          placeholder.style.padding = "40px 0";
          placeholder.textContent = "暂无幻灯片";
          container.appendChild(placeholder);
          return;
        }

        for (var i = 0; i < slides.length; i++) {
          var item = createSlideItem(slides[i], i);
          container.appendChild(item);
        }
      }

      function createSlideItem(slide, index) {
        var item = document.createElement("div");
        item.className = "slide-item" + (index === currentIndex ? " active" : "");

        item.addEventListener("click", function (e) {
          if (e.target.closest(".slide-item-actions")) return;
          goToSlide(index);
        });

        var number = document.createElement("div");
        number.className = "slide-number";
        number.textContent = index + 1;
        item.appendChild(number);

        var content = document.createElement("div");
        content.className = "slide-content";

        var title = document.createElement("div");
        title.className = "slide-item-title";
        title.textContent = slide.title || "(无标题)";
        content.appendChild(title);

        var preview = document.createElement("div");
        preview.className = "slide-item-preview";
        preview.textContent = slide.notes || "(无备注)";
        content.appendChild(preview);

        item.appendChild(content);

        var actions = document.createElement("div");
        actions.className = "slide-item-actions no-print";

        var editBtn = document.createElement("button");
        editBtn.className = "btn-icon";
        editBtn.title = "编辑";
        editBtn.textContent = "✎";
        editBtn.addEventListener("click", function () {
          editSlide(index);
        });
        actions.appendChild(editBtn);

        var deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-icon delete";
        deleteBtn.title = "删除";
        deleteBtn.textContent = "×";
        deleteBtn.addEventListener("click", function () {
          deleteSlide(index);
        });
        actions.appendChild(deleteBtn);

        item.appendChild(actions);

        return item;
      }

      // Debounce function
      function debounce(func, wait) {
        var timeout;
        return function () {
          var context = this;
          var args = arguments;
          var later = function () {
            clearTimeout(timeout);
            func.apply(context, args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }

      // Print notes
      function printNotes() {
        var title = document.getElementById("presentationTitle").value || "演讲笔记";
        document.getElementById("printPresentationTitle").textContent = title;
        window.print();
      }

      // Clear all
      function clearAll() {
        if (!confirm("确定要清空所有内容吗？")) return;

        document.getElementById("presentationTitle").value = "";
        slides = [];
        currentIndex = 0;
        resetTimer();
        cancelEdit();

        renderSlideList();
        updateDisplay();
        updateNavigation();

        localStorage.removeItem(LS_KEY);

        showToast("已清空");
      }

      // Save to localStorage
      function saveToStorage() {
        var data = {
          presentationTitle: document.getElementById("presentationTitle").value,
          slides: slides,
          currentIndex: currentIndex
        };

        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      // Load from localStorage
      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (!saved) return;

        try {
          var data = JSON.parse(saved);

          document.getElementById("presentationTitle").value = data.presentationTitle || "";
          slides = data.slides || [];
          currentIndex = data.currentIndex || 0;

          if (currentIndex >= slides.length) {
            currentIndex = Math.max(0, slides.length - 1);
          }
        } catch (e) {
          console.error("Failed to load saved data:", e);
        }
      }

      // Theme toggle
      function toggleTheme() {
        var body = document.body;
        var isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      // Load theme
      function loadTheme() {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      }

      // Show toast
      function showToast(msg) {
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      // Initialize on load
      init();
    
