// @ts-nocheck
// Generated from tools/dev/graphql-builder.html
// Source SHA-256: 52961b4306b1883aad4306b5ef623bb4efb7732b0af37650c41bec640ac1d378
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let operationType = "query";
      let variables = [];
      let rootFields = [];
      let fragments = [];
      let schema = null;
      let variableId = 0;
      let fieldId = 0;
      let fragmentId = 0;

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      (function () {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      const examples = {
        blog: `type User {
  id: ID!
  name: String!
  email: String
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String
  published: Boolean!
  author: User!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  text: String!
  author: User!
}

type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
  post(id: ID!): Post
  posts(published: Boolean, limit: Int): [Post!]!
}

type Mutation {
  createUser(name: String!, email: String): User!
  createPost(title: String!, content: String, authorId: ID!): Post!
  publishPost(id: ID!): Post
}

type Subscription {
  postPublished: Post!
}`,
        ecommerce: `type Product {
  id: ID!
  name: String!
  description: String
  price: Float!
  inStock: Boolean!
  category: Category!
}

type Category {
  id: ID!
  name: String!
  products: [Product!]!
}

type Order {
  id: ID!
  items: [OrderItem!]!
  total: Float!
  status: String!
}

type OrderItem {
  product: Product!
  quantity: Int!
  price: Float!
}

type Query {
  product(id: ID!): Product
  products(category: ID, inStock: Boolean, minPrice: Float, maxPrice: Float): [Product!]!
  categories: [Category!]!
  order(id: ID!): Order
  orders(status: String): [Order!]!
}

type Mutation {
  createProduct(name: String!, price: Float!, categoryId: ID!): Product!
  createOrder(items: [OrderItemInput!]!): Order!
  updateOrderStatus(id: ID!, status: String!): Order!
}

input OrderItemInput {
  productId: ID!
  quantity: Int!
}`,
        social: `type User {
  id: ID!
  username: String!
  displayName: String
  avatar: String
  followers: [User!]!
  following: [User!]!
  posts: [Post!]!
}

type Post {
  id: ID!
  content: String!
  author: User!
  likes: Int!
  likedBy: [User!]!
  createdAt: String!
}

type Query {
  me: User
  user(id: ID, username: String): User
  feed(limit: Int, cursor: String): [Post!]!
  search(query: String!): [User!]!
}

type Mutation {
  follow(userId: ID!): User!
  unfollow(userId: ID!): User!
  createPost(content: String!): Post!
  likePost(postId: ID!): Post!
}

type Subscription {
  newPost: Post!
  newFollower: User!
}`
      };

      window.loadExample = function (type) {
        document.getElementById("schemaInput").value = examples[type];
        parseSchema();
      };

      window.setOperationType = function (type) {
        operationType = type;
        document.querySelectorAll(".operation-tabs button").forEach((btn) => {
          btn.classList.remove("active");
        });
        document.getElementById(type + "Tab").classList.add("active");
        generateQuery();
      };

      // Variable management
      window.addVariable = function () {
        const id = variableId++;
        variables.push({
          id,
          name: "",
          type: "String",
          required: false,
          defaultValue: ""
        });
        renderVariables();
        generateQuery();
      };

      function removeVariable(id) {
        variables = variables.filter((v) => v.id !== id);
        renderVariables();
        generateQuery();
      }

      function renderVariables() {
        const container = document.getElementById("variablesContainer");
        container.replaceChildren();

        variables.forEach((v) => {
          const row = document.createElement("div");
          row.className = "arg-row";

          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.value = v.name;
          nameInput.placeholder = "变量名";
          nameInput.style.flex = "1";
          nameInput.onchange = (e) => {
            v.name = e.target.value;
            generateQuery();
          };

          const typeSelect = document.createElement("select");
          typeSelect.style.flex = "1";
          ["String", "Int", "Float", "Boolean", "ID", "[String]", "[Int]", "[ID]"].forEach((t) => {
            const opt = document.createElement("option");
            opt.value = t;
            opt.textContent = t;
            opt.selected = v.type === t;
            typeSelect.appendChild(opt);
          });
          typeSelect.onchange = (e) => {
            v.type = e.target.value;
            generateQuery();
          };

          const reqLabel = document.createElement("label");
          reqLabel.style.cssText =
            "margin:0;display:flex;align-items:center;gap:0.25rem;white-space:nowrap;";
          const reqCheck = document.createElement("input");
          reqCheck.type = "checkbox";
          reqCheck.checked = v.required;
          reqCheck.onchange = (e) => {
            v.required = e.target.checked;
            generateQuery();
          };
          reqLabel.appendChild(reqCheck);
          reqLabel.appendChild(document.createTextNode("必填"));

          const defaultInput = document.createElement("input");
          defaultInput.type = "text";
          defaultInput.value = v.defaultValue;
          defaultInput.placeholder = "默认值";
          defaultInput.style.flex = "1";
          defaultInput.onchange = (e) => {
            v.defaultValue = e.target.value;
            generateQuery();
          };

          const delBtn = document.createElement("button");
          delBtn.className = "outline secondary";
          delBtn.style.padding = "0.25rem 0.5rem";
          delBtn.textContent = "×";
          delBtn.onclick = () => removeVariable(v.id);

          row.appendChild(nameInput);
          row.appendChild(typeSelect);
          row.appendChild(reqLabel);
          row.appendChild(defaultInput);
          row.appendChild(delBtn);
          container.appendChild(row);
        });
      }

      // Root field management
      function addRootField() {
        const id = fieldId++;
        rootFields.push({
          id,
          name: "",
          alias: "",
          args: [],
          fields: []
        });
        renderFields();
        generateQuery();
      }

      function removeRootField(id) {
        rootFields = rootFields.filter((f) => f.id !== id);
        renderFields();
        generateQuery();
      }

      function renderFields() {
        const container = document.getElementById("fieldsContainer");
        container.replaceChildren();

        rootFields.forEach((field) => {
          const fieldEl = createFieldElement(field, true);
          container.appendChild(fieldEl);
        });
      }

      function createFieldElement(field, isRoot = false) {
        const div = document.createElement("div");
        div.className = "schema-type";

        const header = document.createElement("div");
        header.style.cssText = "display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;";

        const aliasInput = document.createElement("input");
        aliasInput.type = "text";
        aliasInput.className = "alias-input";
        aliasInput.value = field.alias || "";
        aliasInput.placeholder = "别名";
        aliasInput.onchange = (e) => {
          field.alias = e.target.value;
          generateQuery();
        };

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = field.name;
        nameInput.placeholder = "字段名";
        nameInput.style.flex = "1";
        nameInput.onchange = (e) => {
          field.name = e.target.value;
          generateQuery();
        };

        const delBtn = document.createElement("button");
        delBtn.className = "outline secondary";
        delBtn.style.padding = "0.25rem 0.5rem";
        delBtn.textContent = "×";
        delBtn.onclick = () => {
          if (isRoot) {
            removeRootField(field.id);
          } else {
            field.removed = true;
            renderFields();
            generateQuery();
          }
        };

        header.appendChild(aliasInput);
        header.appendChild(nameInput);
        header.appendChild(delBtn);
        div.appendChild(header);

        // Arguments
        const argsDetails = document.createElement("details");
        const argsSummary = document.createElement("summary");
        argsSummary.textContent = "参数 (" + field.args.length + ")";
        argsDetails.appendChild(argsSummary);

        const argsContainer = document.createElement("div");
        field.args.forEach((arg, i) => {
          const argRow = document.createElement("div");
          argRow.className = "arg-row";

          const argName = document.createElement("input");
          argName.type = "text";
          argName.value = arg.name;
          argName.placeholder = "参数名";
          argName.style.flex = "1";
          argName.onchange = (e) => {
            arg.name = e.target.value;
            generateQuery();
          };

          const argValue = document.createElement("input");
          argValue.type = "text";
          argValue.value = arg.value;
          argValue.placeholder = "值 (使用 $变量名 引用变量)";
          argValue.style.flex = "2";
          argValue.onchange = (e) => {
            arg.value = e.target.value;
            generateQuery();
          };

          const argDel = document.createElement("button");
          argDel.className = "outline secondary";
          argDel.style.padding = "0.25rem 0.5rem";
          argDel.textContent = "×";
          argDel.onclick = () => {
            field.args.splice(i, 1);
            renderFields();
            generateQuery();
          };

          argRow.appendChild(argName);
          argRow.appendChild(argValue);
          argRow.appendChild(argDel);
          argsContainer.appendChild(argRow);
        });
        argsDetails.appendChild(argsContainer);

        const addArgBtn = document.createElement("button");
        addArgBtn.className = "outline";
        addArgBtn.style.cssText = "padding:0.25rem 0.5rem;font-size:0.8rem;";
        addArgBtn.textContent = "+ 参数";
        addArgBtn.onclick = () => {
          field.args.push({ name: "", value: "" });
          renderFields();
          generateQuery();
        };
        argsDetails.appendChild(addArgBtn);
        div.appendChild(argsDetails);

        // Nested fields
        const fieldsDetails = document.createElement("details");
        fieldsDetails.open = true;
        const fieldsSummary = document.createElement("summary");
        fieldsSummary.textContent =
          "子字段 (" + field.fields.filter((f) => !f.removed).length + ")";
        fieldsDetails.appendChild(fieldsSummary);

        const fieldsContainer = document.createElement("div");
        fieldsContainer.className = "nested-fields";

        field.fields
          .filter((f) => !f.removed)
          .forEach((subField) => {
            const subEl = createFieldElement(subField, false);
            fieldsContainer.appendChild(subEl);
          });
        fieldsDetails.appendChild(fieldsContainer);

        // Simple field input for quick add
        const quickAddRow = document.createElement("div");
        quickAddRow.style.cssText = "display:flex;gap:0.5rem;margin-top:0.5rem;";

        const quickInput = document.createElement("input");
        quickInput.type = "text";
        quickInput.placeholder = "快速添加字段 (空格分隔多个)";
        quickInput.style.flex = "1";

        const quickAddBtn = document.createElement("button");
        quickAddBtn.className = "outline";
        quickAddBtn.style.cssText = "padding:0.25rem 0.5rem;font-size:0.8rem;";
        quickAddBtn.textContent = "+ 添加";
        quickAddBtn.onclick = () => {
          const names = quickInput.value
            .trim()
            .split(/\s+/)
            .filter((n) => n);
          names.forEach((name) => {
            field.fields.push({
              id: fieldId++,
              name: name,
              alias: "",
              args: [],
              fields: []
            });
          });
          quickInput.value = "";
          renderFields();
          generateQuery();
        };

        quickAddRow.appendChild(quickInput);
        quickAddRow.appendChild(quickAddBtn);
        fieldsDetails.appendChild(quickAddRow);

        // Add nested object field button
        const addNestedBtn = document.createElement("button");
        addNestedBtn.className = "outline";
        addNestedBtn.style.cssText = "padding:0.25rem 0.5rem;font-size:0.8rem;margin-left:0.5rem;";
        addNestedBtn.textContent = "+ 嵌套对象";
        addNestedBtn.onclick = () => {
          field.fields.push({
            id: fieldId++,
            name: "",
            alias: "",
            args: [],
            fields: []
          });
          renderFields();
          generateQuery();
        };
        quickAddRow.appendChild(addNestedBtn);

        div.appendChild(fieldsDetails);

        return div;
      }

      // Fragment management
      window.addFragment = function () {
        const id = fragmentId++;
        fragments.push({
          id,
          name: "Fragment" + id,
          onType: "",
          fields: []
        });
        renderFragments();
        generateQuery();
      };

      function removeFragment(id) {
        fragments = fragments.filter((f) => f.id !== id);
        renderFragments();
        generateQuery();
      }

      function renderFragments() {
        const container = document.getElementById("fragmentsContainer");
        container.replaceChildren();

        fragments.forEach((frag) => {
          const div = document.createElement("div");
          div.className = "schema-type";

          const header = document.createElement("div");
          header.style.cssText = "display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;";

          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.value = frag.name;
          nameInput.placeholder = "Fragment 名称";
          nameInput.style.flex = "1";
          nameInput.onchange = (e) => {
            frag.name = e.target.value;
            generateQuery();
          };

          const onLabel = document.createElement("span");
          onLabel.textContent = "on";
          onLabel.style.padding = "0 0.25rem";

          const typeInput = document.createElement("input");
          typeInput.type = "text";
          typeInput.value = frag.onType;
          typeInput.placeholder = "类型名";
          typeInput.style.flex = "1";
          typeInput.onchange = (e) => {
            frag.onType = e.target.value;
            generateQuery();
          };

          const delBtn = document.createElement("button");
          delBtn.className = "outline secondary";
          delBtn.style.padding = "0.25rem 0.5rem";
          delBtn.textContent = "×";
          delBtn.onclick = () => removeFragment(frag.id);

          header.appendChild(nameInput);
          header.appendChild(onLabel);
          header.appendChild(typeInput);
          header.appendChild(delBtn);
          div.appendChild(header);

          // Fields
          const fieldsLabel = document.createElement("label");
          fieldsLabel.textContent = "字段 (每行一个)";
          const fieldsArea = document.createElement("textarea");
          fieldsArea.rows = 3;
          fieldsArea.value = frag.fields.join("\n");
          fieldsArea.onchange = (e) => {
            frag.fields = e.target.value.split("\n").filter((f) => f.trim());
            generateQuery();
          };
          fieldsLabel.appendChild(fieldsArea);
          div.appendChild(fieldsLabel);

          container.appendChild(div);
        });
      }

      // Query generation
      function generateQuery() {
        let query = "";
        const opName = document.getElementById("operationName").value.trim();

        // Build variable definition
        let varDef = "";
        if (variables.length > 0) {
          const validVars = variables.filter((v) => v.name);
          if (validVars.length > 0) {
            const varParts = validVars.map((v) => {
              let def = "$" + v.name + ": " + v.type;
              if (v.required) def += "!";
              if (v.defaultValue) def += " = " + formatValue(v.defaultValue, v.type);
              return def;
            });
            varDef = "(" + varParts.join(", ") + ")";
          }
        }

        // Operation line
        query += operationType;
        if (opName || varDef) {
          query += " " + (opName || "");
          query += varDef;
        }
        query += " {\n";

        // Root fields
        rootFields.forEach((field) => {
          query += generateFieldQuery(field, 1);
        });

        query += "}\n";

        // Fragments
        fragments.forEach((frag) => {
          if (frag.name && frag.onType) {
            query += "\nfragment " + frag.name + " on " + frag.onType + " {\n";
            frag.fields.forEach((f) => {
              query += "  " + f + "\n";
            });
            query += "}\n";
          }
        });

        document.getElementById("queryOutput").textContent = query;

        // Generate variables JSON
        const varsJson = {};
        variables
          .filter((v) => v.name && v.defaultValue)
          .forEach((v) => {
            varsJson[v.name] = parseDefaultValue(v.defaultValue, v.type);
          });
        document.getElementById("variablesOutput").textContent = JSON.stringify(varsJson, null, 2);

        generateCurl();
      }

      function generateFieldQuery(field, indent) {
        if (!field.name) return "";

        const spaces = "  ".repeat(indent);
        let line = spaces;

        // Alias
        if (field.alias) {
          line += field.alias + ": ";
        }

        line += field.name;

        // Arguments
        if (field.args.length > 0) {
          const validArgs = field.args.filter((a) => a.name && a.value);
          if (validArgs.length > 0) {
            const argParts = validArgs.map((a) => {
              let val = a.value;
              if (
                !val.startsWith("$") &&
                !val.startsWith('"') &&
                !val.startsWith("[") &&
                val !== "true" &&
                val !== "false" &&
                val !== "null" &&
                isNaN(val)
              ) {
                val = '"' + val + '"';
              }
              return a.name + ": " + val;
            });
            line += "(" + argParts.join(", ") + ")";
          }
        }

        // Nested fields
        const nestedFields = field.fields.filter((f) => !f.removed);
        if (nestedFields.length > 0) {
          line += " {\n";
          nestedFields.forEach((subField) => {
            if (subField.fields && subField.fields.length > 0) {
              line += generateFieldQuery(subField, indent + 1);
            } else if (subField.name) {
              line += "  ".repeat(indent + 1);
              if (subField.alias) line += subField.alias + ": ";
              line += subField.name + "\n";
            }
          });
          line += spaces + "}\n";
        } else {
          line += "\n";
        }

        return line;
      }

      function formatValue(value, type) {
        if (type === "String" || type === "[String]") {
          return '"' + value + '"';
        }
        if (type === "Boolean") {
          return value.toLowerCase() === "true" ? "true" : "false";
        }
        return value;
      }

      function parseDefaultValue(value, type) {
        if (type === "Int") return parseInt(value) || 0;
        if (type === "Float") return parseFloat(value) || 0;
        if (type === "Boolean") return value.toLowerCase() === "true";
        if (type.startsWith("[")) {
          try {
            return JSON.parse(value);
          } catch {
            return value.split(",").map((v) => v.trim());
          }
        }
        return value;
      }

      function generateCurl() {
        const endpoint = document.getElementById("endpoint").value;
        const query = document.getElementById("queryOutput").textContent;
        const vars = document.getElementById("variablesOutput").textContent;

        const body = JSON.stringify({
          query: query,
          variables: JSON.parse(vars || "{}")
        });

        const curl = `curl -X POST '${endpoint}' \\
  -H 'Content-Type: application/json' \\
  -d '${body.replace(/'/g, "'\\''")}'`;

        document.getElementById("curlOutput").textContent = curl;
      }

      window.copyQuery = function () {
        const query = document.getElementById("queryOutput").textContent;
        navigator.clipboard.writeText(query).then(() => {
          alert("查询已复制到剪贴板！");
        });
      };

      window.copyVariables = function () {
        const vars = document.getElementById("variablesOutput").textContent;
        navigator.clipboard.writeText(vars).then(() => {
          alert("变量已复制到剪贴板！");
        });
      };

      window.copyCurl = function () {
        const curl = document.getElementById("curlOutput").textContent;
        navigator.clipboard.writeText(curl).then(() => {
          alert("cURL 命令已复制到剪贴板！");
        });
      };

      window.formatQuery = function () {
        // Query is already formatted by generation
        generateQuery();
      };

      function parseSchema() {
        const sdl = document.getElementById("schemaInput").value;
        // Basic SDL parsing - this is simplified
        // In production, you'd use a proper GraphQL parser

        // Extract types and fields
        const typeRegex = /type\s+(\w+)\s*\{([^}]+)\}/g;
        let match;
        schema = { types: {} };

        while ((match = typeRegex.exec(sdl)) !== null) {
          const typeName = match[1];
          const fieldsStr = match[2];
          const fields = [];

          const fieldRegex = /(\w+)(?:\(([^)]+)\))?:\s*([\[\]\w!]+)/g;
          let fieldMatch;
          while ((fieldMatch = fieldRegex.exec(fieldsStr)) !== null) {
            fields.push({
              name: fieldMatch[1],
              args: fieldMatch[2] || "",
              type: fieldMatch[3]
            });
          }

          schema.types[typeName] = fields;
        }

        alert("Schema 已解析！发现 " + Object.keys(schema.types).length + " 个类型。");
      }

      // Initialize
      addRootField();
      generateQuery();
    
