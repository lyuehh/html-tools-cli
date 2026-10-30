// @ts-nocheck
// Generated from tools/dev/json-minifier.html
// Source SHA-256: f76b4acaf4c87cf36a282efd90e27a67cce6a078466ed3a1799d8206ab2cefb6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.querySelector(".theme-toggle").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      // 加载保存的主题
      function loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      // 标签切换
      window.switchTab = function (tab) {
        document.querySelectorAll(".tabs button").forEach((btn) => btn.classList.add("secondary"));
        document
          .querySelectorAll(".tab-content")
          .forEach((content) => content.classList.remove("active"));

        document.getElementById(`tab-${tab}`).classList.remove("secondary");
        document.getElementById(`${tab}-content`).classList.add("active");
      };

      // 显示错误
      function showError(message) {
        const errorBox = document.getElementById("error-box");
        errorBox.textContent = message;
        errorBox.classList.add("show");
        document.getElementById("success-box").classList.remove("show");
      }

      // 显示成功
      function showSuccess(message) {
        const successBox = document.getElementById("success-box");
        successBox.textContent = message;
        successBox.classList.add("show");
        document.getElementById("error-box").classList.remove("show");
      }

      // 隐藏消息
      function hideMessages() {
        document.getElementById("error-box").classList.remove("show");
        document.getElementById("success-box").classList.remove("show");
      }

      // 预处理 JSON（处理尾随逗号）
      function preprocessJSON(str) {
        if (document.getElementById("opt-trailing-comma").checked) {
          // 移除对象和数组末尾的逗号
          str = str.replace(/,(\s*[}\]])/g, "$1");
        }
        return str;
      }

      // 解析 JSON
      function parseJSON(input) {
        const processed = preprocessJSON(input);
        return JSON.parse(processed);
      }

      // 排序对象键
      function sortObjectKeys(obj) {
        if (Array.isArray(obj)) {
          return obj.map(sortObjectKeys);
        } else if (obj !== null && typeof obj === "object") {
          const sorted = {};
          Object.keys(obj)
            .sort()
            .forEach((key) => {
              sorted[key] = sortObjectKeys(obj[key]);
            });
          return sorted;
        }
        return obj;
      }

      // 转义 Unicode
      function escapeUnicode(str) {
        return str.replace(/[\u0080-\uffff]/g, (char) => {
          return "\\u" + ("0000" + char.charCodeAt(0).toString(16)).slice(-4);
        });
      }

      // 获取缩进字符
      function getIndent() {
        const indentSize = document.getElementById("indent-size").value;
        if (indentSize === "tab") {
          return "\t";
        }
        return parseInt(indentSize);
      }

      // 计算 JSON 统计
      function calculateStats(obj, depth = 0) {
        let stats = {
          keys: 0,
          maxDepth: depth,
          arrays: 0
        };

        if (Array.isArray(obj)) {
          stats.arrays++;
          obj.forEach((item) => {
            const subStats = calculateStats(item, depth + 1);
            stats.keys += subStats.keys;
            stats.maxDepth = Math.max(stats.maxDepth, subStats.maxDepth);
            stats.arrays += subStats.arrays;
          });
        } else if (obj !== null && typeof obj === "object") {
          const keys = Object.keys(obj);
          stats.keys += keys.length;
          keys.forEach((key) => {
            const subStats = calculateStats(obj[key], depth + 1);
            stats.keys += subStats.keys;
            stats.maxDepth = Math.max(stats.maxDepth, subStats.maxDepth);
            stats.arrays += subStats.arrays;
          });
        }

        return stats;
      }

      // 压缩 JSON
      window.minifyJSON = function () {
        hideMessages();
        const input = document.getElementById("json-input").value;

        try {
          let obj = parseJSON(input);

          if (document.getElementById("opt-sort-keys").checked) {
            obj = sortObjectKeys(obj);
          }

          let output = JSON.stringify(obj);

          if (document.getElementById("opt-escape-unicode").checked) {
            output = escapeUnicode(output);
          }

          document.getElementById("json-output").value = output;
          updateStats(input, output, obj);
          renderTree(obj);
          showSuccess("JSON 压缩成功！");
        } catch (error) {
          showError(`JSON 解析错误: ${error.message}`);
        }
      };

      // 美化 JSON
      function beautifyJSON() {
        hideMessages();
        const input = document.getElementById("json-input").value;

        try {
          let obj = parseJSON(input);

          if (document.getElementById("opt-sort-keys").checked) {
            obj = sortObjectKeys(obj);
          }

          let output = JSON.stringify(obj, null, getIndent());

          if (document.getElementById("opt-escape-unicode").checked) {
            output = escapeUnicode(output);
          }

          document.getElementById("json-output").value = output;
          updateStats(input, output, obj);
          renderTree(obj);
          showSuccess("JSON 美化成功！");
        } catch (error) {
          showError(`JSON 解析错误: ${error.message}`);
        }
      }

      // 验证 JSON
      window.validateJSON = function () {
        hideMessages();
        const input = document.getElementById("json-input").value;

        try {
          parseJSON(input);
          showSuccess("JSON 格式正确！");
        } catch (error) {
          showError(`JSON 语法错误: ${error.message}`);
        }
      };

      // 更新统计
      function updateStats(input, output, obj) {
        const originalSize = new Blob([input]).size;
        const minifiedSize = new Blob([output]).size;
        const savings = originalSize > 0 ? ((1 - minifiedSize / originalSize) * 100).toFixed(1) : 0;

        const stats = calculateStats(obj);

        document.getElementById("original-size").textContent = formatSize(originalSize);
        document.getElementById("minified-size").textContent = formatSize(minifiedSize);
        document.getElementById("savings").textContent = savings + "%";
        document.getElementById("key-count").textContent = stats.keys;
        document.getElementById("depth").textContent = stats.maxDepth;
        document.getElementById("array-count").textContent = stats.arrays;

        document.getElementById("input-stats").textContent =
          `行数: ${input.split("\n").length} | 字符: ${input.length}`;
        document.getElementById("output-stats").textContent =
          `行数: ${output.split("\n").length} | 字符: ${output.length}`;
      }

      // 格式化大小
      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
      }

      // 渲染树形视图
      function renderTree(obj) {
        const container = document.getElementById("json-tree");
        container.innerHTML = "";
        container.appendChild(createTreeNode(obj, ""));
      }

      // 创建树节点
      function createTreeNode(value, path, key = null) {
        const wrapper = document.createElement("div");
        wrapper.style.marginLeft = key !== null ? "20px" : "0";

        if (value === null) {
          wrapper.innerHTML = formatKeyValue(key, '<span class="json-null">null</span>', path);
        } else if (typeof value === "boolean") {
          wrapper.innerHTML = formatKeyValue(
            key,
            `<span class="json-boolean">${value}</span>`,
            path
          );
        } else if (typeof value === "number") {
          wrapper.innerHTML = formatKeyValue(
            key,
            `<span class="json-number">${value}</span>`,
            path
          );
        } else if (typeof value === "string") {
          const escaped = value.replace(/"/g, '\\"').replace(/\n/g, "\\n");
          wrapper.innerHTML = formatKeyValue(
            key,
            `<span class="json-string">"${escapeHtml(escaped)}"</span>`,
            path
          );
        } else if (Array.isArray(value)) {
          const header = document.createElement("span");
          header.className = "collapsible";
          header.innerHTML = formatKeyValue(
            key,
            `<span class="json-bracket">[</span> ${value.length} 项`,
            path
          );
          header.onclick = (e) => {
            e.stopPropagation();
            header.classList.toggle("collapsed");
          };
          wrapper.appendChild(header);

          const children = document.createElement("div");
          children.className = "json-children";
          value.forEach((item, index) => {
            const childPath = path ? `${path}[${index}]` : `[${index}]`;
            children.appendChild(createTreeNode(item, childPath, index));
          });
          const closing = document.createElement("span");
          closing.innerHTML = '<span class="json-bracket">]</span>';
          closing.style.marginLeft = "20px";
          children.appendChild(closing);
          wrapper.appendChild(children);
        } else if (typeof value === "object") {
          const keys = Object.keys(value);
          const header = document.createElement("span");
          header.className = "collapsible";
          header.innerHTML = formatKeyValue(
            key,
            `<span class="json-bracket">{</span> ${keys.length} 个键`,
            path
          );
          header.onclick = (e) => {
            e.stopPropagation();
            header.classList.toggle("collapsed");
          };
          wrapper.appendChild(header);

          const children = document.createElement("div");
          children.className = "json-children";
          keys.forEach((k) => {
            const childPath = path ? `${path}.${k}` : k;
            children.appendChild(createTreeNode(value[k], childPath, k));
          });
          const closing = document.createElement("span");
          closing.innerHTML = '<span class="json-bracket">}</span>';
          closing.style.marginLeft = "20px";
          children.appendChild(closing);
          wrapper.appendChild(children);
        }

        // 点击显示路径
        wrapper.addEventListener("click", (e) => {
          e.stopPropagation();
          document.getElementById("json-path").textContent = path || "(根)";
        });

        return wrapper;
      }

      // 格式化键值对
      function formatKeyValue(key, value, path) {
        if (key !== null) {
          const keyStr = typeof key === "number" ? key : `"${key}"`;
          return `<span class="json-key">${keyStr}</span>: ${value}`;
        }
        return value;
      }

      // HTML 转义
      window.escapeHtml = function (str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
      };

      // 复制
      window.copyJSON = function () {
        const json = document.getElementById("json-output").value;
        navigator.clipboard
          .writeText(json)
          .then(() => {
            showSuccess("JSON 已复制到剪贴板！");
          })
          .catch((err) => {
            console.error("复制失败:", err);
            const textarea = document.getElementById("json-output");
            textarea.select();
            document.execCommand("copy");
            showSuccess("JSON 已复制到剪贴板！");
          });
      };

      // 下载
      window.downloadJSON = function () {
        const json = document.getElementById("json-output").value;
        const blob = new Blob([json], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.json";
        a.click();
        URL.revokeObjectURL(url);
      };

      // 清空
      window.clearAll = function () {
        document.getElementById("json-input").value = "";
        document.getElementById("json-output").value = "";
        document.getElementById("json-tree").innerHTML = "";
        document.getElementById("json-path").textContent = "点击节点查看路径";
        document.getElementById("original-size").textContent = "0";
        document.getElementById("minified-size").textContent = "0";
        document.getElementById("savings").textContent = "0%";
        document.getElementById("key-count").textContent = "0";
        document.getElementById("depth").textContent = "0";
        document.getElementById("array-count").textContent = "0";
        hideMessages();
        updateInputStats();
      };

      // 更新输入统计
      function updateInputStats() {
        const input = document.getElementById("json-input").value;
        document.getElementById("input-stats").textContent =
          `行数: ${input.split("\n").length} | 字符: ${input.length}`;
      }

      // 加载示例
      window.loadSample = function () {
        const sample = {
          项目信息: {
            名称: "示例项目",
            版本: "2.0.0",
            描述: "这是一个功能丰富的示例 JSON 数据",
            作者: {
              姓名: "张三",
              邮箱: "zhangsan@example.com",
              网站: "https://zhangsan.example.com"
            },
            许可证: "MIT"
          },
          配置: {
            服务器: {
              主机: "localhost",
              端口: 3000,
              SSL: true,
              超时: 30000
            },
            数据库: {
              类型: "PostgreSQL",
              主机: "db.example.com",
              端口: 5432,
              名称: "app_production",
              连接池: {
                最小: 5,
                最大: 20
              }
            },
            缓存: {
              启用: true,
              类型: "Redis",
              过期时间: 3600
            }
          },
          用户列表: [
            {
              ID: 1,
              用户名: "admin",
              角色: ["管理员", "编辑"],
              活跃: true,
              创建时间: "2024-01-01T00:00:00Z"
            },
            {
              ID: 2,
              用户名: "user1",
              角色: ["用户"],
              活跃: true,
              创建时间: "2024-02-15T10:30:00Z"
            },
            {
              ID: 3,
              用户名: "guest",
              角色: ["访客"],
              活跃: false,
              创建时间: "2024-03-20T14:45:00Z"
            }
          ],
          统计数据: {
            访问量: 1234567,
            用户数: 50000,
            文章数: 1500,
            评论数: 25000,
            增长率: {
              日: 2.5,
              周: 15.3,
              月: 45.8
            }
          },
          功能开关: {
            暗色模式: true,
            实验性功能: false,
            调试模式: null,
            维护模式: false
          },
          元数据: {
            生成时间: "2024-12-28T12:00:00Z",
            格式版本: 1,
            校验和: "sha256:abc123def456"
          }
        };

        document.getElementById("json-input").value = JSON.stringify(sample, null, 2);
        beautifyJSON();
      };

      // 实时更新输入统计
      document.getElementById("json-input").addEventListener("input", updateInputStats);

      // 初始化
      loadTheme();
      beautifyJSON();
    
