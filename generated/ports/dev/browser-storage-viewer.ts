// @ts-nocheck
// Generated from tools/dev/browser-storage-viewer.html
// Source SHA-256: b002064d20f30283200ec889b63d61715cc0678e76bd2b8cf5b684cdb3525b33
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentStorage = "local";
      let editingKey = null;

      // Theme toggle
      window.toggleTheme = function () {
        const body = document.body;
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Load saved theme
      (function () {
        const savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      // Tab switching
      document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
          document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
          tab.classList.add("active");
          currentStorage = tab.dataset.storage;
          document.getElementById("content-" + currentStorage).classList.add("active");
          refreshStorage();
        });
      });

      // Search functionality
      document.getElementById("searchBox").addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        filterTable(query);
      });

      window.filterTable = function (query) {
        const table =
          document.getElementById(currentStorage + "StorageBody") ||
          document.getElementById("cookiesBody");
        if (!table) return;

        const rows = table.querySelectorAll("tr");
        rows.forEach((row) => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? "" : "none";
        });
      };

      function formatBytes(bytes) {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
      }

      function getByteSize(str) {
        return new Blob([str]).size;
      }

      function isJson(str) {
        try {
          JSON.parse(str);
          return true;
        } catch {
          return false;
        }
      }

      function formatValue(value) {
        if (isJson(value)) {
          try {
            const parsed = JSON.parse(value);
            return `<span class="json-value">${escapeHtml(JSON.stringify(parsed, null, 2))}</span>`;
          } catch {
            return escapeHtml(value);
          }
        }
        return escapeHtml(value);
      }

      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      function refreshStorage() {
        loadLocalStorage();
        loadSessionStorage();
        loadCookies();
        updateStats();
      }

      function loadLocalStorage() {
        const tbody = document.getElementById("localStorageBody");
        tbody.innerHTML = "";

        const count = localStorage.length;
        document.getElementById("localCount").textContent = count;

        if (count === 0) {
          tbody.innerHTML = `
                    <tr>
                        <td colspan="4">
                            <div class="empty-state">
                                <div class="icon">📦</div>
                                <p>LocalStorage 为空</p>
                            </div>
                        </td>
                    </tr>
                `;
          return;
        }

        for (let i = 0; i < count; i++) {
          const key = localStorage.key(i);
          const value = localStorage.getItem(key);
          const size = getByteSize(key + value);

          tbody.innerHTML += `
                    <tr>
                        <td class="key">${escapeHtml(key)}</td>
                        <td class="value">
                            <div class="value-preview">${formatValue(value)}</div>
                        </td>
                        <td class="size">${formatBytes(size)}</td>
                        <td class="actions">
                            <button class="action-btn copy" onclick="copyValue('local', '${escapeHtml(key)}')">📋</button>
                            <button class="action-btn edit" onclick="editItem('local', '${escapeHtml(key)}')">✏️</button>
                            <button class="action-btn delete" onclick="deleteItem('local', '${escapeHtml(key)}')">🗑️</button>
                        </td>
                    </tr>
                `;
        }
      }

      function loadSessionStorage() {
        const tbody = document.getElementById("sessionStorageBody");
        tbody.innerHTML = "";

        const count = sessionStorage.length;
        document.getElementById("sessionCount").textContent = count;

        if (count === 0) {
          tbody.innerHTML = `
                    <tr>
                        <td colspan="4">
                            <div class="empty-state">
                                <div class="icon">⏱️</div>
                                <p>SessionStorage 为空</p>
                            </div>
                        </td>
                    </tr>
                `;
          return;
        }

        for (let i = 0; i < count; i++) {
          const key = sessionStorage.key(i);
          const value = sessionStorage.getItem(key);
          const size = getByteSize(key + value);

          tbody.innerHTML += `
                    <tr>
                        <td class="key">${escapeHtml(key)}</td>
                        <td class="value">
                            <div class="value-preview">${formatValue(value)}</div>
                        </td>
                        <td class="size">${formatBytes(size)}</td>
                        <td class="actions">
                            <button class="action-btn copy" onclick="copyValue('session', '${escapeHtml(key)}')">📋</button>
                            <button class="action-btn edit" onclick="editItem('session', '${escapeHtml(key)}')">✏️</button>
                            <button class="action-btn delete" onclick="deleteItem('session', '${escapeHtml(key)}')">🗑️</button>
                        </td>
                    </tr>
                `;
        }
      }

      function loadCookies() {
        const tbody = document.getElementById("cookiesBody");
        tbody.innerHTML = "";

        const cookies = document.cookie.split(";").filter((c) => c.trim());
        const count = cookies.length;
        document.getElementById("cookieCount").textContent = count;

        if (count === 0 || (count === 1 && !cookies[0].trim())) {
          tbody.innerHTML = `
                    <tr>
                        <td colspan="3">
                            <div class="empty-state">
                                <div class="icon">🍪</div>
                                <p>没有可访问的 Cookies</p>
                            </div>
                        </td>
                    </tr>
                `;
          document.getElementById("cookieCount").textContent = 0;
          return;
        }

        cookies.forEach((cookie) => {
          const [name, ...valueParts] = cookie.trim().split("=");
          const value = valueParts.join("=");

          tbody.innerHTML += `
                    <tr>
                        <td class="key">${escapeHtml(name)}</td>
                        <td class="value">
                            <div class="value-preview">${escapeHtml(value)}</div>
                        </td>
                        <td class="actions">
                            <button class="action-btn copy" onclick="copyValue('cookie', '${escapeHtml(name)}')">📋</button>
                            <button class="action-btn edit" onclick="editItem('cookie', '${escapeHtml(name)}')">✏️</button>
                            <button class="action-btn delete" onclick="deleteItem('cookie', '${escapeHtml(name)}')">🗑️</button>
                        </td>
                    </tr>
                `;
        });
      }

      function updateStats() {
        let totalItems = localStorage.length + sessionStorage.length;
        let totalSize = 0;

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          totalSize += getByteSize(key + localStorage.getItem(key));
        }

        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          totalSize += getByteSize(key + sessionStorage.getItem(key));
        }

        const cookies = document.cookie.split(";").filter((c) => c.trim());
        totalItems += cookies.filter((c) => c.includes("=")).length;
        totalSize += getByteSize(document.cookie);

        document.getElementById("totalItems").textContent = totalItems;
        document.getElementById("totalSize").textContent = formatBytes(totalSize);
      }

      window.openAddModal = function () {
        editingKey = null;
        document.getElementById("modalTitle").textContent = "添加项目";
        document.getElementById("itemKey").value = "";
        document.getElementById("itemValue").value = "";
        document.getElementById("itemKey").disabled = false;
        document.getElementById("modalOverlay").classList.add("active");
      };

      window.editItem = function (storage, key) {
        editingKey = key;
        currentStorage = storage;
        document.getElementById("modalTitle").textContent = "编辑项目";
        document.getElementById("itemKey").value = key;
        document.getElementById("itemKey").disabled = true;

        let value = "";
        if (storage === "local") {
          value = localStorage.getItem(key) || "";
        } else if (storage === "session") {
          value = sessionStorage.getItem(key) || "";
        } else if (storage === "cookie") {
          const cookies = document.cookie.split(";");
          for (const cookie of cookies) {
            const [name, ...valueParts] = cookie.trim().split("=");
            if (name === key) {
              value = valueParts.join("=");
              break;
            }
          }
        }

        // Pretty print JSON if possible
        if (isJson(value)) {
          try {
            value = JSON.stringify(JSON.parse(value), null, 2);
          } catch {
            // Keep original value
          }
        }

        document.getElementById("itemValue").value = value;
        document.getElementById("modalOverlay").classList.add("active");
      };

      window.closeModal = function () {
        document.getElementById("modalOverlay").classList.remove("active");
        editingKey = null;
      };

      window.saveItem = function () {
        const key = document.getElementById("itemKey").value.trim();
        const value = document.getElementById("itemValue").value;

        if (!key) {
          showToast("请输入键名", true);
          return;
        }

        if (currentStorage === "local") {
          localStorage.setItem(key, value);
        } else if (currentStorage === "session") {
          sessionStorage.setItem(key, value);
        } else if (currentStorage === "cookie") {
          document.cookie = `${key}=${value};path=/`;
        }

        closeModal();
        refreshStorage();
        showToast("保存成功");
      };

      window.deleteItem = function (storage, key) {
        if (!confirm(`确定要删除 "${key}" 吗？`)) return;

        if (storage === "local") {
          localStorage.removeItem(key);
        } else if (storage === "session") {
          sessionStorage.removeItem(key);
        } else if (storage === "cookie") {
          document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }

        refreshStorage();
        showToast("删除成功");
      };

      window.copyValue = function (storage, key) {
        let value = "";
        if (storage === "local") {
          value = localStorage.getItem(key) || "";
        } else if (storage === "session") {
          value = sessionStorage.getItem(key) || "";
        } else if (storage === "cookie") {
          const cookies = document.cookie.split(";");
          for (const cookie of cookies) {
            const [name, ...valueParts] = cookie.trim().split("=");
            if (name === key) {
              value = valueParts.join("=");
              break;
            }
          }
        }

        navigator.clipboard.writeText(value).then(() => {
          showToast("已复制到剪贴板");
        });
      };

      window.clearAllStorage = function () {
        if (!confirm("确定要清空当前存储类型的所有数据吗？")) return;

        if (currentStorage === "local") {
          localStorage.clear();
        } else if (currentStorage === "session") {
          sessionStorage.clear();
        } else if (currentStorage === "cookie") {
          const cookies = document.cookie.split(";");
          cookies.forEach((cookie) => {
            const name = cookie.split("=")[0].trim();
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          });
        }

        refreshStorage();
        showToast("已清空");
      };

      window.exportStorage = function () {
        let data = {};

        if (currentStorage === "local") {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data[key] = localStorage.getItem(key);
          }
        } else if (currentStorage === "session") {
          for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            data[key] = sessionStorage.getItem(key);
          }
        } else if (currentStorage === "cookie") {
          const cookies = document.cookie.split(";");
          cookies.forEach((cookie) => {
            const [name, ...valueParts] = cookie.trim().split("=");
            if (name) {
              data[name] = valueParts.join("=");
            }
          });
        }

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${currentStorage}-storage-${Date.now()}.json`;
        a.click();

        URL.revokeObjectURL(url);
        showToast("导出成功");
      };

      window.importStorage = function () {
        document.getElementById("importData").value = "";
        document.getElementById("importModalOverlay").classList.add("active");
      };

      function closeImportModal() {
        document.getElementById("importModalOverlay").classList.remove("active");
      }

      window.doImport = function () {
        const jsonStr = document.getElementById("importData").value.trim();

        try {
          const data = JSON.parse(jsonStr);

          if (typeof data !== "object" || Array.isArray(data)) {
            throw new Error("数据格式错误");
          }

          Object.entries(data).forEach(([key, value]) => {
            const strValue = typeof value === "string" ? value : JSON.stringify(value);

            if (currentStorage === "local") {
              localStorage.setItem(key, strValue);
            } else if (currentStorage === "session") {
              sessionStorage.setItem(key, strValue);
            } else if (currentStorage === "cookie") {
              document.cookie = `${key}=${strValue};path=/`;
            }
          });

          closeImportModal();
          refreshStorage();
          showToast(`导入成功: ${Object.keys(data).length} 项`);
        } catch (err) {
          showToast("导入失败: " + err.message, true);
        }
      };

      function showToast(message, isError = false) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.className = "toast" + (isError ? " error" : "");
        toast.classList.add("show");

        setTimeout(() => {
          toast.classList.remove("show");
        }, 3000);
      }

      // Initial load
      refreshStorage();
    
