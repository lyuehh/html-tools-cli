// @ts-nocheck
// Generated from tools/converter/json-yaml.html
// Source SHA-256: 543b5d52df55192edd901f83a24c9cb712b3bb3267d44a1cc986ec71c1c75ae8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 示例数据
      const samples = {
        simple: {
          name: "示例项目",
          version: "1.0.0",
          description: "一个简单的示例",
          author: "开发者",
          license: "MIT"
        },
        nested: {
          database: {
            host: "localhost",
            port: 5432,
            credentials: {
              username: "admin",
              password: "secret"
            }
          },
          cache: {
            enabled: true,
            ttl: 3600
          }
        },
        array: {
          users: [
            { id: 1, name: "张三", role: "admin" },
            { id: 2, name: "李四", role: "user" },
            { id: 3, name: "王五", role: "user" }
          ],
          tags: ["javascript", "yaml", "json", "converter"]
        },
        config: {
          server: {
            host: "0.0.0.0",
            port: 8080,
            ssl: {
              enabled: true,
              cert: "/path/to/cert.pem",
              key: "/path/to/key.pem"
            }
          },
          logging: {
            level: "info",
            format: "json",
            outputs: ["stdout", "file"]
          },
          features: {
            authentication: true,
            rateLimit: {
              enabled: true,
              maxRequests: 100,
              windowMs: 60000
            }
          }
        }
      };

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        document.querySelector(".theme-toggle").textContent = newTheme === "light" ? "🌙" : "☀️";
      };

      function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      // 加载示例
      window.loadSample = function (type) {
        const json = JSON.stringify(samples[type], null, 2);
        document.getElementById("jsonInput").value = json;
        updateStats("json");
        jsonToYaml();
      };

      // JSON 转 YAML
      function jsonToYaml() {
        const jsonInput = document.getElementById("jsonInput").value.trim();
        if (!jsonInput) {
          showStatus("请输入 JSON 内容", "error");
          return;
        }

        try {
          const obj = JSON.parse(jsonInput);
          const indent = parseInt(document.getElementById("indentSize").value) || 2;
          const sortKeys = document.getElementById("sortKeys").checked;
          const quoteStyle = document.getElementById("quoteStyle").value;

          let quotingType;
          if (quoteStyle === "single") quotingType = "'";
          else if (quoteStyle === "double") quotingType = '"';

          const yamlOptions = {
            indent: indent,
            sortKeys: sortKeys,
            lineWidth: -1,
            quotingType: quotingType,
            forceQuotes: quoteStyle !== "minimal"
          };

          const yaml = jsyaml.dump(obj, yamlOptions);
          document.getElementById("yamlInput").value = yaml;
          updateStats("yaml");
          showStatus("JSON → YAML 转换成功", "success");
        } catch (e) {
          showStatus("JSON 解析错误: " + e.message, "error");
        }
      }

      // YAML 转 JSON
      window.yamlToJson = function () {
        const yamlInput = document.getElementById("yamlInput").value.trim();
        if (!yamlInput) {
          showStatus("请输入 YAML 内容", "error");
          return;
        }

        try {
          const obj = jsyaml.load(yamlInput);
          const indent = parseInt(document.getElementById("indentSize").value) || 2;
          const sortKeys = document.getElementById("sortKeys").checked;

          let json;
          if (sortKeys) {
            json = JSON.stringify(obj, Object.keys(obj).sort(), indent);
          } else {
            json = JSON.stringify(obj, null, indent);
          }

          document.getElementById("jsonInput").value = json;
          updateStats("json");
          showStatus("YAML → JSON 转换成功", "success");
        } catch (e) {
          showStatus("YAML 解析错误: " + e.message, "error");
        }
      };

      // 格式化 JSON
      window.formatJSON = function () {
        const jsonInput = document.getElementById("jsonInput").value.trim();
        if (!jsonInput) return;

        try {
          const obj = JSON.parse(jsonInput);
          const indent = parseInt(document.getElementById("indentSize").value) || 2;
          document.getElementById("jsonInput").value = JSON.stringify(obj, null, indent);
          updateStats("json");
        } catch (e) {
          showStatus("JSON 格式化错误: " + e.message, "error");
        }
      };

      // 压缩 JSON
      window.minifyJSON = function () {
        const jsonInput = document.getElementById("jsonInput").value.trim();
        if (!jsonInput) return;

        try {
          const obj = JSON.parse(jsonInput);
          document.getElementById("jsonInput").value = JSON.stringify(obj);
          updateStats("json");
        } catch (e) {
          showStatus("JSON 压缩错误: " + e.message, "error");
        }
      };

      // 更新统计信息
      function updateStats(type) {
        const textarea = document.getElementById(type + "Input");
        const stats = document.getElementById(type + "Stats");
        const valid = document.getElementById(type + "Valid");
        const content = textarea.value;

        const chars = content.length;
        const lines = content ? content.split("\n").length : 0;
        stats.textContent = chars + " 字符 | " + lines + " 行";

        // 验证格式
        if (content.trim()) {
          try {
            if (type === "json") {
              JSON.parse(content);
            } else {
              jsyaml.load(content);
            }
            valid.textContent = "✓ 有效";
            valid.style.color = "var(--accent-green)";
          } catch (e) {
            valid.textContent = "✗ 无效";
            valid.style.color = "var(--accent-red)";
          }
        } else {
          valid.textContent = "";
        }
      }

      // 显示状态
      function showStatus(message, type) {
        const bar = document.getElementById("statusBar");
        bar.textContent = message;
        bar.className = "status-bar " + type;
        setTimeout(() => {
          bar.className = "status-bar";
        }, 3000);
      }

      // 复制文本
      window.copyText = function (id) {
        const textarea = document.getElementById(id);
        navigator.clipboard.writeText(textarea.value).then(() => {
          showStatus("已复制到剪贴板", "success");
        });
      };

      // 清除文本
      window.clearText = function (id) {
        document.getElementById(id).value = "";
        updateStats(id.replace("Input", ""));
      };

      // 下载文件
      window.downloadFile = function (type) {
        const content = document.getElementById(type + "Input").value;
        if (!content) {
          showStatus("没有内容可下载", "error");
          return;
        }

        const ext = type === "json" ? ".json" : ".yaml";
        const mime = type === "json" ? "application/json" : "text/yaml";
        const blob = new Blob([content], { type: mime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data" + ext;
        a.click();
        URL.revokeObjectURL(url);
      };

      // 初始化
      initTheme();
      loadSample("config");
    
