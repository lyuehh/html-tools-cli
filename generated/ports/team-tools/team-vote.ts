// @ts-nocheck
// Generated from tools/team-tools/team-vote.html
// Source SHA-256: 95e8177e6746be8119c07514134bbdbdf02707990f53435c6f2e0eb5a6615a6f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "team-vote-data";
      var voteType = "single";
      var options = [];
      var votes = {};
      var currentSelections = [];

      function init() {
        var savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }

        loadFromUrl() || loadFromStorage();

        if (options.length === 0) {
          options = [
            { id: generateId(), text: "选项 A", score: 0 },
            { id: generateId(), text: "选项 B", score: 0 },
            { id: generateId(), text: "选项 C", score: 0 }
          ];
        }

        document.getElementById("voteTitle").addEventListener("input", function () {
          saveToStorage();
        });

        renderAll();
      }

      function generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
      }

      function setVoteType(type, btn) {
        voteType = type;
        currentSelections = [];
        document.querySelectorAll(".vote-type-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");

        var modeText = {
          single: "单选模式 - 请选择一个选项",
          multi:
            "多选模式 - 最多选择 " + document.getElementById("maxSelections").value + " 个选项",
          score: "评分模式 - 为每个选项打分 (1-5分)"
        };
        document.getElementById("voteMode").textContent = modeText[type];

        renderVotingOptions();
        saveToStorage();
      }

      function addOption() {
        var input = document.getElementById("newOptionInput");
        var text = input.value.trim();
        if (text) {
          options.push({ id: generateId(), text: text, score: 0 });
          input.value = "";
          renderAll();
          saveToStorage();
        }
      }

      function handleOptionKeypress(e) {
        if (e.key === "Enter") {
          addOption();
        }
      }

      function removeOption(id) {
        options = options.filter(function (opt) {
          return opt.id !== id;
        });
        renderAll();
        saveToStorage();
      }

      function renderAll() {
        renderOptionsList();
        renderVotingOptions();
        renderResults();
      }

      function renderOptionsList() {
        var container = document.getElementById("optionsList");
        container.textContent = "";

        options.forEach(function (opt, index) {
          var div = document.createElement("div");
          div.className = "option-item";
          div.style.cursor = "default";

          var number = document.createElement("div");
          number.className = "option-checkbox";
          number.style.background = "var(--accent-color)";
          number.style.border = "none";
          number.style.color = "#000";
          number.style.fontWeight = "bold";
          number.style.fontSize = "12px";
          number.textContent = index + 1;

          var content = document.createElement("div");
          content.className = "option-content";

          var input = document.createElement("input");
          input.type = "text";
          input.value = opt.text;
          input.style.background = "var(--bg-card)";
          input.style.border = "1px solid var(--border-subtle)";
          input.style.borderRadius = "6px";
          input.style.padding = "8px";
          input.style.color = "var(--text-color)";
          input.style.width = "100%";
          input.addEventListener("input", function (e) {
            opt.text = e.target.value;
            renderVotingOptions();
            renderResults();
            saveToStorage();
          });

          content.appendChild(input);

          var deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger";
          deleteBtn.textContent = "×";
          deleteBtn.onclick = function () {
            removeOption(opt.id);
          };

          div.appendChild(number);
          div.appendChild(content);
          div.appendChild(deleteBtn);
          container.appendChild(div);
        });

        document.getElementById("optionCount").textContent = options.length;

        if (options.length > 0) {
          document.getElementById("votingPanel").style.display = "block";
        }
      }

      function renderVotingOptions() {
        var container = document.getElementById("votingOptions");
        container.textContent = "";

        var voterName = document.getElementById("voterName").value.trim();
        var hasVoted = voterName && votes[voterName];

        options.forEach(function (opt) {
          var div = document.createElement("div");
          var isSelected = currentSelections.indexOf(opt.id) !== -1;
          div.className =
            "option-item" + (isSelected ? " selected" : "") + (hasVoted ? " voted" : "");

          if (!hasVoted) {
            div.onclick = function () {
              toggleSelection(opt.id);
            };
          }

          var checkbox = document.createElement("div");
          checkbox.className = "option-checkbox";

          var content = document.createElement("div");
          content.className = "option-content";

          var text = document.createElement("div");
          text.className = "option-text";
          text.textContent = opt.text;
          content.appendChild(text);

          if (voteType === "score" && !hasVoted) {
            var scoreRow = document.createElement("div");
            scoreRow.style.display = "flex";
            scoreRow.style.gap = "5px";
            scoreRow.style.marginTop = "8px";

            for (var i = 1; i <= 5; i++) {
              (function (score) {
                var starBtn = document.createElement("button");
                starBtn.style.cssText =
                  "width:30px;height:30px;border-radius:50%;border:1px solid var(--border-subtle);background:var(--bg-input);color:var(--text-color);cursor:pointer;font-size:14px;";
                starBtn.textContent = score;
                starBtn.onclick = function (e) {
                  e.stopPropagation();
                  setScore(opt.id, score);
                };
                if (getScore(opt.id) === score) {
                  starBtn.style.background = "var(--accent-color)";
                  starBtn.style.color = "#000";
                }
                scoreRow.appendChild(starBtn);
              })(i);
            }
            content.appendChild(scoreRow);
          }

          div.appendChild(checkbox);
          div.appendChild(content);
          container.appendChild(div);
        });
      }

      function toggleSelection(id) {
        if (voteType === "score") return;

        var index = currentSelections.indexOf(id);

        if (voteType === "single") {
          currentSelections = index !== -1 ? [] : [id];
        } else {
          var maxSelections = parseInt(document.getElementById("maxSelections").value) || 3;
          if (index !== -1) {
            currentSelections.splice(index, 1);
          } else if (currentSelections.length < maxSelections) {
            currentSelections.push(id);
          } else {
            showToast("最多只能选择 " + maxSelections + " 个选项");
            return;
          }
        }

        renderVotingOptions();
      }

      var scores = {};

      function setScore(optId, score) {
        scores[optId] = score;
        renderVotingOptions();
      }

      function getScore(optId) {
        return scores[optId] || 0;
      }

      function submitVote() {
        var voterName = document.getElementById("voterName").value.trim();
        if (!voterName) {
          showToast("请输入您的名字");
          return;
        }

        if (votes[voterName]) {
          showToast("您已经投过票了");
          return;
        }

        if (voteType === "score") {
          var hasAnyScore = options.some(function (opt) {
            return scores[opt.id] > 0;
          });
          if (!hasAnyScore) {
            showToast("请至少为一个选项打分");
            return;
          }
          votes[voterName] = { type: "score", scores: Object.assign({}, scores) };
        } else {
          if (currentSelections.length === 0) {
            showToast("请选择至少一个选项");
            return;
          }
          votes[voterName] = { type: voteType, selections: currentSelections.slice() };
        }

        currentSelections = [];
        scores = {};

        renderAll();
        saveToStorage();
        showToast("投票成功！");
      }

      function renderResults() {
        var container = document.getElementById("resultsList");
        container.textContent = "";

        var optionVotes = {};
        var optionVoters = {};
        var optionScores = {};
        var totalVotes = 0;
        var voterNames = Object.keys(votes);

        options.forEach(function (opt) {
          optionVotes[opt.id] = 0;
          optionVoters[opt.id] = [];
          optionScores[opt.id] = 0;
        });

        voterNames.forEach(function (voter) {
          var vote = votes[voter];
          if (vote.type === "score") {
            Object.keys(vote.scores).forEach(function (optId) {
              if (optionScores[optId] !== undefined) {
                optionScores[optId] += vote.scores[optId];
                optionVoters[optId].push(voter + "(" + vote.scores[optId] + "分)");
              }
            });
          } else {
            vote.selections.forEach(function (optId) {
              if (optionVotes[optId] !== undefined) {
                optionVotes[optId]++;
                optionVoters[optId].push(voter);
                totalVotes++;
              }
            });
          }
        });

        var maxVotes = Math.max.apply(
          null,
          options.map(function (opt) {
            return voteType === "score" ? optionScores[opt.id] : optionVotes[opt.id];
          })
        );

        var winnerBanner = document.getElementById("winnerBanner");
        if (voterNames.length > 0 && maxVotes > 0) {
          var winners = options.filter(function (opt) {
            return (voteType === "score" ? optionScores[opt.id] : optionVotes[opt.id]) === maxVotes;
          });
          if (winners.length === 1) {
            winnerBanner.textContent = "🏆 领先选项: " + winners[0].text;
            winnerBanner.style.display = "block";
          } else if (winners.length > 1) {
            winnerBanner.textContent =
              "⚖️ 平局: " +
              winners
                .map(function (w) {
                  return w.text;
                })
                .join(", ");
            winnerBanner.style.display = "block";
          }
        } else {
          winnerBanner.style.display = "none";
        }

        options.forEach(function (opt) {
          var div = document.createElement("div");
          div.className = "option-item";
          div.style.cursor = "default";

          var content = document.createElement("div");
          content.className = "option-content";

          var text = document.createElement("div");
          text.className = "option-text";
          text.textContent = opt.text;

          var bar = document.createElement("div");
          bar.className = "option-bar";

          var fill = document.createElement("div");
          fill.className = "option-bar-fill";
          var voteCount = voteType === "score" ? optionScores[opt.id] : optionVotes[opt.id];
          var percent = maxVotes > 0 ? (voteCount / maxVotes) * 100 : 0;
          fill.style.width = percent + "%";
          bar.appendChild(fill);

          var stats = document.createElement("div");
          stats.className = "option-stats";
          if (voteType === "score") {
            stats.textContent =
              "总分: " +
              optionScores[opt.id] +
              " | 平均: " +
              (voterNames.length > 0 ? (optionScores[opt.id] / voterNames.length).toFixed(1) : 0);
          } else {
            var percentage =
              totalVotes > 0 ? ((optionVotes[opt.id] / totalVotes) * 100).toFixed(1) : 0;
            stats.textContent = optionVotes[opt.id] + " 票 (" + percentage + "%)";
          }

          content.appendChild(text);
          content.appendChild(bar);
          content.appendChild(stats);

          if (optionVoters[opt.id].length > 0) {
            var voterList = document.createElement("div");
            voterList.className = "voter-list";
            optionVoters[opt.id].forEach(function (voter) {
              var tag = document.createElement("span");
              tag.className = "voter-tag";
              tag.textContent = voter;
              voterList.appendChild(tag);
            });
            content.appendChild(voterList);
          }

          div.appendChild(content);
          container.appendChild(div);
        });

        document.getElementById("totalVoters").textContent = voterNames.length;
        document.getElementById("totalVotes").textContent = totalVotes;
      }

      function shareLink() {
        var data = {
          title: document.getElementById("voteTitle").value,
          type: voteType,
          maxSelections: parseInt(document.getElementById("maxSelections").value),
          options: options,
          votes: votes
        };

        try {
          var encoded = btoa(encodeURIComponent(JSON.stringify(data)));
          var url = location.origin + location.pathname + "#" + encoded;
          navigator.clipboard.writeText(url);
          showToast("分享链接已复制");
        } catch (e) {
          showToast("生成链接失败");
        }
      }

      function exportResults() {
        var title = document.getElementById("voteTitle").value || "团队投票";
        var lines = [];
        lines.push("投票主题: " + title);
        lines.push(
          "投票类型: " + (voteType === "single" ? "单选" : voteType === "multi" ? "多选" : "评分")
        );
        lines.push("投票人数: " + Object.keys(votes).length);
        lines.push("");
        lines.push("投票结果:");
        lines.push("─".repeat(40));

        options.forEach(function (opt, index) {
          var count = 0;
          var voters = [];
          Object.keys(votes).forEach(function (voter) {
            var vote = votes[voter];
            if (vote.type === "score") {
              if (vote.scores[opt.id]) {
                count += vote.scores[opt.id];
                voters.push(voter + "(" + vote.scores[opt.id] + "分)");
              }
            } else {
              if (vote.selections.indexOf(opt.id) !== -1) {
                count++;
                voters.push(voter);
              }
            }
          });
          lines.push(
            index + 1 + ". " + opt.text + ": " + count + (voteType === "score" ? "分" : "票")
          );
          if (voters.length > 0) {
            lines.push("   投票人: " + voters.join(", "));
          }
        });

        var content = lines.join("\n");
        var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = title + "_投票结果.txt";
        a.click();
        URL.revokeObjectURL(url);
      }

      function resetVote() {
        if (confirm("确定要重置所有投票数据吗？")) {
          votes = {};
          currentSelections = [];
          scores = {};
          renderAll();
          saveToStorage();
          showToast("已重置");
        }
      }

      function loadFromUrl() {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          var data = JSON.parse(decodeURIComponent(atob(hash)));
          document.getElementById("voteTitle").value = data.title || "";
          voteType = data.type || "single";
          document.getElementById("maxSelections").value = data.maxSelections || 3;
          if (data.options) options = data.options;
          if (data.votes) votes = data.votes;

          document.querySelectorAll(".vote-type-btn").forEach(function (btn) {
            btn.classList.remove("active");
            if (
              btn.textContent.indexOf(
                voteType === "single" ? "单选" : voteType === "multi" ? "多选" : "评分"
              ) !== -1
            ) {
              btn.classList.add("active");
            }
          });

          return true;
        } catch (e) {
          return false;
        }
      }

      function saveToStorage() {
        var data = {
          title: document.getElementById("voteTitle").value,
          type: voteType,
          maxSelections: parseInt(document.getElementById("maxSelections").value),
          options: options,
          votes: votes
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            var data = JSON.parse(saved);
            document.getElementById("voteTitle").value = data.title || "";
            voteType = data.type || "single";
            document.getElementById("maxSelections").value = data.maxSelections || 3;
            if (data.options) options = data.options;
            if (data.votes) votes = data.votes;

            document.querySelectorAll(".vote-type-btn").forEach(function (btn) {
              btn.classList.remove("active");
              if (
                btn.textContent.indexOf(
                  voteType === "single" ? "单选" : voteType === "multi" ? "多选" : "评分"
                ) !== -1
              ) {
                btn.classList.add("active");
              }
            });
          } catch (e) {
            console.error("Failed to load from storage");
          }
        }
      }

      function showToast(message) {
        var toast = document.createElement("div");
        toast.style.cssText =
          "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--accent-color);color:#000;padding:12px 24px;border-radius:8px;z-index:1000;font-size:14px;";
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(function () {
          toast.remove();
        }, 2000);
      }

      window.toggleTheme = function () {
        var body = document.body;
        var currentTheme = body.getAttribute("data-theme");
        var newTheme = currentTheme === "light" ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      init();
    
