// @ts-nocheck
// Generated from tools/education/flashcard.html
// Source SHA-256: d6ae4fecaaf8885ac68451088373e1fea097cdc8ebc3353e37a3cbc5ea4a14fb
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let decks = [];
      let currentDeckId = null;
      let studyCards = [];
      let currentIndex = 0;
      let stats = { easy: 0, hard: 0, forgot: 0 };
      let editingDeckId = null;

      function init() {
        loadData();
        renderDeckList();
        updateStudyView();

        document.querySelectorAll(".tab").forEach((tab) => {
          tab.addEventListener("click", () => switchTab(tab.dataset.tab));
        });
      }

      function loadData() {
        const saved = localStorage.getItem("flashcard_data");
        if (saved) {
          try {
            const data = JSON.parse(saved);
            decks = data.decks || [];
            currentDeckId = data.currentDeckId;
          } catch (e) {
            decks = [];
          }
        }

        if (decks.length === 0) {
          decks.push({
            id: Date.now(),
            name: "示例单词",
            cards: [
              { front: "Hello", back: "你好", example: "Hello, how are you?" },
              { front: "World", back: "世界", example: "Welcome to the world!" },
              { front: "Study", back: "学习", example: "I study every day." },
              { front: "Card", back: "卡片", example: "This is a flashcard." },
              { front: "Learn", back: "学习", example: "Learn something new today." }
            ]
          });
          currentDeckId = decks[0].id;
          saveData();
        }
      }

      function saveData() {
        localStorage.setItem(
          "flashcard_data",
          JSON.stringify({
            decks: decks,
            currentDeckId: currentDeckId
          })
        );
      }

      function switchTab(tabName) {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelector('[data-tab="' + tabName + '"]').classList.add("active");

        document.getElementById("studyTab").style.display = tabName === "study" ? "block" : "none";
        document.getElementById("manageTab").style.display =
          tabName === "manage" ? "block" : "none";
        document.getElementById("importTab").style.display =
          tabName === "import" ? "block" : "none";
      }

      function updateStudyView() {
        const deck = decks.find((d) => d.id === currentDeckId);

        if (!deck || deck.cards.length === 0) {
          document.getElementById("studyCard").style.display = "none";
          document.getElementById("emptyState").style.display = "block";
          return;
        }

        document.getElementById("studyCard").style.display = "block";
        document.getElementById("emptyState").style.display = "none";

        if (studyCards.length === 0 || studyCards[0].front !== deck.cards[0].front) {
          studyCards = [...deck.cards];
          currentIndex = 0;
          stats = { easy: 0, hard: 0, forgot: 0 };
        }

        showCurrentCard();
        updateStats();
      }

      function showCurrentCard() {
        const card = studyCards[currentIndex];
        if (!card) {
          document.getElementById("cardFront").textContent = "学习完成！";
          document.getElementById("cardPhonetic").textContent = "";
          document.getElementById("cardBack").textContent = '点击"重新开始"继续';
          document.getElementById("cardExample").textContent = "";
          return;
        }

        document.getElementById("flashcard").classList.remove("flipped");
        document.getElementById("cardFront").textContent = card.front;
        document.getElementById("cardPhonetic").textContent = card.phonetic || "";
        document.getElementById("cardBack").textContent = card.back;
        document.getElementById("cardExample").textContent = card.example || "";

        updateProgress();
      }

      function flipCard() {
        document.getElementById("flashcard").classList.toggle("flipped");
      }

      function markCard(result) {
        stats[result]++;

        if (result === "forgot") {
          studyCards.push(studyCards[currentIndex]);
        }

        currentIndex++;
        showCurrentCard();
        updateStats();
      }

      function updateProgress() {
        const total = studyCards.length;
        const current = Math.min(currentIndex + 1, total);
        const percent = total > 0 ? Math.round((currentIndex / total) * 100) : 0;

        document.getElementById("progressFill").style.width = percent + "%";
        document.getElementById("progressCurrent").textContent = current + "/" + total;
        document.getElementById("progressPercent").textContent = percent + "%";
      }

      function updateStats() {
        document.getElementById("statEasy").textContent = stats.easy;
        document.getElementById("statHard").textContent = stats.hard;
        document.getElementById("statForgot").textContent = stats.forgot;
        document.getElementById("statRemaining").textContent = Math.max(
          0,
          studyCards.length - currentIndex
        );
      }

      function restartStudy() {
        const deck = decks.find((d) => d.id === currentDeckId);
        if (deck) {
          studyCards = [...deck.cards];
          currentIndex = 0;
          stats = { easy: 0, hard: 0, forgot: 0 };
          showCurrentCard();
          updateStats();
        }
      }

      function shuffleCards() {
        const deck = decks.find((d) => d.id === currentDeckId);
        if (deck) {
          studyCards = [...deck.cards].sort(() => Math.random() - 0.5);
          currentIndex = 0;
          stats = { easy: 0, hard: 0, forgot: 0 };
          showCurrentCard();
          updateStats();
        }
      }

      function renderDeckList() {
        const container = document.getElementById("deckList");
        container.textContent = "";

        decks.forEach((deck) => {
          const item = document.createElement("div");
          item.className = "deck-item" + (deck.id === currentDeckId ? " active" : "");

          const info = document.createElement("div");
          info.className = "deck-info";

          const name = document.createElement("div");
          name.className = "name";
          name.textContent = deck.name;

          const count = document.createElement("div");
          count.className = "count";
          count.textContent = deck.cards.length + " 张卡片";

          info.appendChild(name);
          info.appendChild(count);

          const actions = document.createElement("div");
          actions.className = "deck-actions";

          const editBtn = document.createElement("button");
          editBtn.className = "btn btn-outline";
          editBtn.textContent = "编辑";
          editBtn.onclick = (e) => {
            e.stopPropagation();
            editDeck(deck.id);
          };

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-outline";
          deleteBtn.textContent = "删除";
          deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteDeck(deck.id);
          };

          actions.appendChild(editBtn);
          actions.appendChild(deleteBtn);

          item.appendChild(info);
          item.appendChild(actions);
          item.onclick = () => selectDeck(deck.id);

          container.appendChild(item);
        });
      }

      function selectDeck(id) {
        currentDeckId = id;
        studyCards = [];
        saveData();
        renderDeckList();
        updateStudyView();
      }

      function createNewDeck() {
        editingDeckId = null;
        document.getElementById("deckName").value = "";
        document.getElementById("deckContent").value = "";
        document.getElementById("deckEditor").style.display = "block";
      }

      function editDeck(id) {
        const deck = decks.find((d) => d.id === id);
        if (!deck) return;

        editingDeckId = id;
        document.getElementById("deckName").value = deck.name;
        document.getElementById("deckContent").value = deck.cards
          .map((c) => c.front + " | " + c.back + (c.example ? " | " + c.example : ""))
          .join("\n");
        document.getElementById("deckEditor").style.display = "block";
      }

      function cancelEdit() {
        editingDeckId = null;
        document.getElementById("deckEditor").style.display = "none";
      }

      function saveDeck() {
        const name = document.getElementById("deckName").value.trim();
        const content = document.getElementById("deckContent").value.trim();

        if (!name) {
          alert("请输入卡组名称");
          return;
        }

        const cards = parseCards(content);

        if (editingDeckId) {
          const deck = decks.find((d) => d.id === editingDeckId);
          if (deck) {
            deck.name = name;
            deck.cards = cards;
          }
        } else {
          decks.push({
            id: Date.now(),
            name: name,
            cards: cards
          });
        }

        saveData();
        renderDeckList();
        cancelEdit();
        updateStudyView();
      }

      function deleteDeck(id) {
        if (!confirm("确定要删除这个卡组吗？")) return;

        decks = decks.filter((d) => d.id !== id);
        if (currentDeckId === id) {
          currentDeckId = decks.length > 0 ? decks[0].id : null;
          studyCards = [];
        }

        saveData();
        renderDeckList();
        updateStudyView();
      }

      function parseCards(content) {
        const lines = content.split("\n").filter((l) => l.trim());
        return lines
          .map((line) => {
            const parts = line.split(/[|,\t]/).map((p) => p.trim());
            return {
              front: parts[0] || "",
              back: parts[1] || "",
              example: parts[2] || ""
            };
          })
          .filter((c) => c.front && c.back);
      }

      function importCards() {
        const name = document.getElementById("importDeckName").value.trim() || "导入卡组";
        const content = document.getElementById("importData").value.trim();

        if (!content) {
          alert("请输入卡片数据");
          return;
        }

        const cards = parseCards(content);

        if (cards.length === 0) {
          alert("未能解析到有效卡片");
          return;
        }

        const newDeck = {
          id: Date.now(),
          name: name,
          cards: cards
        };

        decks.push(newDeck);
        currentDeckId = newDeck.id;
        studyCards = [];

        saveData();
        renderDeckList();
        updateStudyView();

        alert("成功导入 " + cards.length + " 张卡片");
        switchTab("study");
      }

      function loadSampleData() {
        document.getElementById("importDeckName").value = "CET4 高频词汇";
        document.getElementById("importData").value =
          `abandon | 放弃，遗弃 | He abandoned his wife and children.
ability | 能力，才能 | She has the ability to solve problems.
abroad | 在国外，到国外 | He went abroad to study.
absence | 缺席，不在 | His absence was noticed by everyone.
absolute | 绝对的，完全的 | It's an absolute disaster.
absorb | 吸收，吸引 | The sponge absorbs water.
abstract | 抽象的；摘要 | The concept is too abstract.
abundant | 丰富的，充裕的 | The country has abundant resources.
academic | 学术的，学院的 | He has an academic career.
accept | 接受，认可 | I accept your apology.`;
      }

      init();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
