// @ts-nocheck
// Generated from tools/dev/json-to-typescript.html
// Source SHA-256: a34f67cd36b84f059010e810fb52841b2a6ccc7e70bd77bfc5297471af73b027
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      (function () {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      const samples = {
        user: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          age: 30,
          isActive: true,
          tags: ["developer", "designer"],
          address: { street: "123 Main St", city: "New York", zipCode: "10001" },
          createdAt: "2024-01-15T10:30:00Z"
        },
        api: {
          success: true,
          code: 200,
          message: "Success",
          data: {
            items: [{ id: 1, title: "Item 1", price: 29.99 }],
            pagination: { page: 1, pageSize: 10, total: 100 }
          },
          timestamp: 1705312200000
        },
        config: {
          appName: "MyApp",
          version: "1.0.0",
          debug: false,
          features: { darkMode: true, notifications: true, analytics: false },
          api: { baseUrl: "https://api.example.com", timeout: 5000 }
        },
        nested: {
          level1: {
            level2: {
              level3: { value: "deep", items: [1, 2, 3] }
            },
            siblings: [{ name: "a" }, { name: "b" }]
          }
        }
      };

      window.loadSample = function (name) {
        document.getElementById("jsonInput").value = JSON.stringify(samples[name], null, 2);
        convert();
      };

      window.formatJson = function () {
        try {
          const json = JSON.parse(document.getElementById("jsonInput").value);
          document.getElementById("jsonInput").value = JSON.stringify(json, null, 2);
          hideError();
        } catch (e) {
          showError("JSON 格式错误: " + e.message);
        }
      };

      window.clearInput = function () {
        document.getElementById("jsonInput").value = "";
        document.getElementById("tsOutput").value = "";
        hideError();
      };

      function showError(msg) {
        const el = document.getElementById("errorMsg");
        el.textContent = msg;
        el.classList.add("show");
      }

      function hideError() {
        document.getElementById("errorMsg").classList.remove("show");
      }

      function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

      function getType(value, key, interfaces) {
        if (value === null) return "null";
        if (value === undefined) return "undefined";

        const type = typeof value;

        if (type === "string") {
          // Check for date string
          if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?/.test(value)) {
            return "string"; // Could return 'Date' with a comment
          }
          return "string";
        }
        if (type === "number") return "number";
        if (type === "boolean") return "boolean";

        if (Array.isArray(value)) {
          if (value.length === 0) return "unknown[]";

          // Check if all items are same type
          const itemTypes = new Set(
            value.map((item) => {
              if (typeof item === "object" && item !== null && !Array.isArray(item)) {
                const interfaceName = capitalize(key.replace(/s$/, "")) + "Item";
                generateInterface(item, interfaceName, interfaces);
                return interfaceName;
              }
              return getType(item, key, interfaces);
            })
          );

          if (itemTypes.size === 1) {
            return [...itemTypes][0] + "[]";
          }
          return "(" + [...itemTypes].join(" | ") + ")[]";
        }

        if (type === "object") {
          const interfaceName = capitalize(key);
          generateInterface(value, interfaceName, interfaces);
          return interfaceName;
        }

        return "unknown";
      }

      function generateInterface(obj, name, interfaces) {
        const useExport = document.getElementById("optExport").checked;
        const allOptional = document.getElementById("optOptional").checked;
        const readonly = document.getElementById("optReadonly").checked;
        const useType = document.getElementById("optType").checked;

        const exportPrefix = useExport ? "export " : "";
        const optionalMark = allOptional ? "?" : "";
        const readonlyPrefix = readonly ? "readonly " : "";

        const properties = Object.entries(obj).map(([key, value]) => {
          const propType = getType(value, key, interfaces);
          const safeName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
          return `  ${readonlyPrefix}${safeName}${optionalMark}: ${propType};`;
        });

        let definition;
        if (useType) {
          definition = `${exportPrefix}type ${name} = {\n${properties.join("\n")}\n};`;
        } else {
          definition = `${exportPrefix}interface ${name} {\n${properties.join("\n")}\n}`;
        }

        // Avoid duplicates
        if (!interfaces.some((i) => i.name === name)) {
          interfaces.push({ name, definition });
        }
      }

      function convert() {
        const input = document.getElementById("jsonInput").value.trim();
        if (!input) {
          document.getElementById("tsOutput").value = "";
          hideError();
          return;
        }

        try {
          const json = JSON.parse(input);
          hideError();

          const interfaces = [];
          const rootName = document.getElementById("rootName").value || "RootObject";

          if (Array.isArray(json)) {
            if (json.length > 0 && typeof json[0] === "object") {
              generateInterface(json[0], rootName, interfaces);
              const useExport = document.getElementById("optExport").checked;
              interfaces.push({
                name: rootName + "Array",
                definition: `${useExport ? "export " : ""}type ${rootName}Array = ${rootName}[];`
              });
            } else {
              const itemType = json.length > 0 ? typeof json[0] : "unknown";
              const useExport = document.getElementById("optExport").checked;
              interfaces.push({
                name: rootName,
                definition: `${useExport ? "export " : ""}type ${rootName} = ${itemType}[];`
              });
            }
          } else if (typeof json === "object" && json !== null) {
            generateInterface(json, rootName, interfaces);
          } else {
            const useExport = document.getElementById("optExport").checked;
            interfaces.push({
              name: rootName,
              definition: `${useExport ? "export " : ""}type ${rootName} = ${typeof json};`
            });
          }

          // Reverse to put root interface first, then nested ones
          const output = interfaces
            .reverse()
            .map((i) => i.definition)
            .join("\n\n");
          document.getElementById("tsOutput").value = output;
        } catch (e) {
          showError("JSON 解析错误: " + e.message);
          document.getElementById("tsOutput").value = "";
        }
      }

      window.copyOutput = function () {
        const output = document.getElementById("tsOutput").value;
        if (output) {
          navigator.clipboard.writeText(output);
          showToast();
        }
      };

      window.downloadOutput = function () {
        const output = document.getElementById("tsOutput").value;
        if (!output) return;

        const blob = new Blob([output], { type: "text/typescript" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "types.ts";
        a.click();
        URL.revokeObjectURL(url);
      };

      function showToast() {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Auto convert on input
      document.getElementById("jsonInput").addEventListener("input", convert);

      // Initial convert
      convert();
    
