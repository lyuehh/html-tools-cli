// @ts-nocheck
// Generated from tools/office/attendance-sheet.html
// Source SHA-256: 5b49439def9b136c4ea26a3311174a38adeb532c5492bd2f52d318fb134dc6c4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "attendance_sheet_v2";
      let data = { roster: [], records: {} };
      const dateEl = document.getElementById("attendanceDate");
      const newNameEl = document.getElementById("newName");
      const rosterBodyEl = document.getElementById("rosterBody");
      const emptyStateEl = document.getElementById("emptyState");
      const statusEl = document.getElementById("status");
      const STATUS_LIST = ["present", "absent", "late", "leave"];
      const STATUS_LABEL = { present: "出勤", absent: "缺勤", late: "迟到", leave: "请假" };

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }
      function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
      }
      function saveToStorage() {
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }
      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            data = JSON.parse(saved);
            if (!data.roster) data.roster = [];
            if (!data.records) data.records = {};
          } catch (e) {
            data = { roster: [], records: {} };
          }
        }
      }
      function getCurrentDate() {
        return dateEl.value;
      }
      function setToday() {
        dateEl.value = new Date().toISOString().split("T")[0];
      }
      function changeDate(delta) {
        const d = new Date(dateEl.value);
        d.setDate(d.getDate() + delta);
        dateEl.value = d.toISOString().split("T")[0];
        renderRoster();
      }
      function getStatus(personId) {
        const date = getCurrentDate();
        return data.records[date] && data.records[date][personId]
          ? data.records[date][personId]
          : null;
      }
      function setStatus(personId, status) {
        const date = getCurrentDate();
        if (!data.records[date]) data.records[date] = {};
        data.records[date][personId] = status;
        saveToStorage();
        renderRoster();
      }
      function renderRoster() {
        rosterBodyEl.textContent = "";
        if (data.roster.length === 0) {
          emptyStateEl.style.display = "block";
        } else {
          emptyStateEl.style.display = "none";
          data.roster.forEach(function (person) {
            var tr = document.createElement("tr");
            var nameTd = document.createElement("td");
            nameTd.className = "name-cell";
            nameTd.textContent = person.name;
            var statusTd = document.createElement("td");
            var btnsDiv = document.createElement("div");
            btnsDiv.className = "status-btns";
            var currentStatus = getStatus(person.id);
            STATUS_LIST.forEach(function (st) {
              var btn = document.createElement("button");
              btn.className = "status-btn " + st + (currentStatus === st ? " active" : "");
              btn.textContent = STATUS_LABEL[st];
              btn.setAttribute("data-person", person.id);
              btn.setAttribute("data-status", st);
              btn.addEventListener("click", function () {
                setStatus(person.id, st);
              });
              btnsDiv.appendChild(btn);
            });
            statusTd.appendChild(btnsDiv);
            var actionTd = document.createElement("td");
            var removeBtn = document.createElement("button");
            removeBtn.className = "remove-btn";
            removeBtn.textContent = "×";
            removeBtn.title = "删除人员";
            removeBtn.addEventListener("click", function () {
              if (confirm("确定要删除「" + person.name + "」吗？该人员所有考勤记录也将被删除。")) {
                data.roster = data.roster.filter(function (p) {
                  return p.id !== person.id;
                });
                Object.keys(data.records).forEach(function (d) {
                  delete data.records[d][person.id];
                });
                saveToStorage();
                renderRoster();
              }
            });
            actionTd.appendChild(removeBtn);
            tr.appendChild(nameTd);
            tr.appendChild(statusTd);
            tr.appendChild(actionTd);
            rosterBodyEl.appendChild(tr);
          });
        }
        updateSummary();
      }
      function updateSummary() {
        var date = getCurrentDate();
        var records = data.records[date] || {};
        var total = data.roster.length;
        var present = 0,
          absent = 0,
          late = 0,
          leave = 0;
        data.roster.forEach(function (p) {
          var st = records[p.id];
          if (st === "present") present++;
          else if (st === "absent") absent++;
          else if (st === "late") late++;
          else if (st === "leave") leave++;
        });
        document.getElementById("totalCount").textContent = total;
        document.getElementById("presentCount").textContent = present;
        document.getElementById("absentCount").textContent = absent;
        document.getElementById("lateCount").textContent = late;
        document.getElementById("leaveCount").textContent = leave;
      }
      document.getElementById("btnAddName").addEventListener("click", function () {
        var name = newNameEl.value.trim();
        if (!name) return;
        if (
          data.roster.some(function (p) {
            return p.name === name;
          })
        ) {
          alert("该姓名已存在");
          return;
        }
        data.roster.push({ id: generateId(), name: name });
        newNameEl.value = "";
        saveToStorage();
        renderRoster();
        newNameEl.focus();
      });
      newNameEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter") document.getElementById("btnAddName").click();
      });
      dateEl.addEventListener("change", renderRoster);
      document.getElementById("btnPrevDay").addEventListener("click", function () {
        changeDate(-1);
      });
      document.getElementById("btnNextDay").addEventListener("click", function () {
        changeDate(1);
      });
      document.getElementById("btnToday").addEventListener("click", function () {
        setToday();
        renderRoster();
      });
      document.getElementById("btnExport").addEventListener("click", function () {
        if (data.roster.length === 0) {
          showStatus("没有数据可导出", "");
          return;
        }
        var date = getCurrentDate();
        var records = data.records[date] || {};
        var csv = "\uFEFF日期,姓名,状态\n";
        data.roster.forEach(function (p) {
          var st = records[p.id] || "未标记";
          var label = STATUS_LABEL[st] || st;
          csv += date + "," + p.name + "," + label + "\n";
        });
        var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "考勤表_" + date + ".csv";
        a.click();
        URL.revokeObjectURL(url);
        showStatus("已导出 CSV", "success");
      });
      document.getElementById("btnClear").addEventListener("click", function () {
        if (confirm("确定要清空所有数据吗？此操作不可恢复。")) {
          data = { roster: [], records: {} };
          localStorage.removeItem(LS_KEY);
          setToday();
          renderRoster();
          showStatus("已清空", "success");
        }
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
      initTheme();
      loadFromStorage();
      if (!dateEl.value) setToday();
      renderRoster();
    
