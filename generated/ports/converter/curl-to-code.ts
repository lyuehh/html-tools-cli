// @ts-nocheck
// Generated from tools/converter/curl-to-code.html
// Source SHA-256: a2a9b19a2f1391024bb9f5e0ced4cef31ede78d68ec7993623fddffdc1ae85af
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const samples = {
        get: 'curl -X GET "https://api.example.com/users?page=1" -H "Accept: application/json"',
        post: 'curl -X POST "https://api.example.com/users" -H "Content-Type: application/json" -d \'{"name": "张三", "email": "test@example.com"}\'',
        auth: 'curl -X GET "https://api.example.com/protected" -H "Authorization: Bearer ${API_TOKEN}"',
        form: 'curl -X POST "https://api.example.com/login" -d "username=admin&password=secret"'
      };

      let parsedCurl = null;
      let currentLang = "javascript";

      window.toggleTheme = function () {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        document.querySelector(".theme-toggle").textContent = newTheme === "light" ? "🌙" : "☀️";
      };

      function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      document.querySelectorAll(".lang-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          document.querySelectorAll(".lang-tab").forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
          currentLang = tab.dataset.lang;
          if (parsedCurl) generateCode(parsedCurl);
        });
      });

      window.loadSample = function (type) {
        document.getElementById("curlInput").value = samples[type];
        convertCurl();
      };

      function parseCurl(curlCmd) {
        curlCmd = curlCmd
          .replace(/\\\s*\n/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        const result = { method: "GET", url: "", headers: {}, data: null };

        curlCmd = curlCmd.replace(/^curl\s+/, "");

        const urlMatch = curlCmd.match(/(['"]?)(https?:\/\/[^\s'"]+)\1/);
        if (urlMatch) result.url = urlMatch[2];

        const methodMatch = curlCmd.match(/-X\s+(['"]?)(\w+)\1/i);
        if (methodMatch) result.method = methodMatch[2].toUpperCase();

        const headerRegex = /-H\s+(['"])(.*?)\1/g;
        let headerMatch;
        while ((headerMatch = headerRegex.exec(curlCmd)) !== null) {
          const colonIndex = headerMatch[2].indexOf(":");
          if (colonIndex > 0) {
            result.headers[headerMatch[2].substring(0, colonIndex).trim()] = headerMatch[2]
              .substring(colonIndex + 1)
              .trim();
          }
        }

        const dataMatch = curlCmd.match(/-d\s+(['"])([\s\S]*?)\1/);
        if (dataMatch) {
          result.data = dataMatch[2];
          if (!methodMatch) result.method = "POST";
        }

        return result;
      }

      function convertCurl() {
        const curlInput = document.getElementById("curlInput").value.trim();
        if (!curlInput) {
          showStatus("请输入 cURL 命令", "error");
          return;
        }

        try {
          parsedCurl = parseCurl(curlInput);
          if (!parsedCurl.url) {
            showStatus("无法解析 URL", "error");
            return;
          }
          generateCode(parsedCurl);
          renderParsedInfo(parsedCurl);
          document.getElementById("outputCard").style.display = "block";
          showStatus("转换成功", "success");
        } catch (e) {
          showStatus("解析错误: " + e.message, "error");
        }
      }

      function generateCode(p) {
        const generators = {
          javascript: genJS,
          python: genPython,
          go: genGo,
          php: genPHP,
          java: genJava,
          node: genNode
        };
        const names = {
          javascript: "JavaScript (fetch)",
          python: "Python (requests)",
          go: "Go (net/http)",
          php: "PHP (cURL)",
          java: "Java (HttpClient)",
          node: "Node.js (axios)"
        };
        document.getElementById("codeOutput").textContent = generators[currentLang](p);
        document.getElementById("langLabel").textContent = names[currentLang];
      }

      function genJS(p) {
        let code = "const response = await fetch('" + p.url + "', {\n  method: '" + p.method + "'";
        if (Object.keys(p.headers).length > 0) {
          code += ",\n  headers: {\n";
          Object.entries(p.headers).forEach(([k, v], i, arr) => {
            code += "    '" + k + "': '" + v + "'" + (i < arr.length - 1 ? "," : "") + "\n";
          });
          code += "  }";
        }
        if (p.data) code += ",\n  body: '" + p.data.replace(/'/g, "\\'") + "'";
        code += "\n});\n\nconst data = await response.json();\nconsole.log(data);";
        return code;
      }

      function genPython(p) {
        let code =
          "import requests\n\nresponse = requests." +
          p.method.toLowerCase() +
          "(\n    '" +
          p.url +
          "'";
        if (Object.keys(p.headers).length > 0) {
          code += ",\n    headers={\n";
          Object.entries(p.headers).forEach(([k, v]) => {
            code += "        '" + k + "': '" + v + "',\n";
          });
          code += "    }";
        }
        if (p.data) code += ",\n    data='" + p.data + "'";
        code += "\n)\n\nprint(response.json())";
        return code;
      }

      function genGo(p) {
        let code = 'package main\n\nimport (\n    "fmt"\n    "io/ioutil"\n    "net/http"\n';
        if (p.data) code += '    "strings"\n';
        code += ")\n\nfunc main() {\n";
        if (p.data) {
          code += "    payload := strings.NewReader(`" + p.data + "`)\n";
          code += '    req, _ := http.NewRequest("' + p.method + '", "' + p.url + '", payload)\n';
        } else {
          code += '    req, _ := http.NewRequest("' + p.method + '", "' + p.url + '", nil)\n';
        }
        Object.entries(p.headers).forEach(([k, v]) => {
          code += '    req.Header.Add("' + k + '", "' + v + '")\n';
        });
        code +=
          "\n    client := &http.Client{}\n    resp, _ := client.Do(req)\n    defer resp.Body.Close()\n\n    body, _ := ioutil.ReadAll(resp.Body)\n    fmt.Println(string(body))\n}";
        return code;
      }

      function genPHP(p) {
        let code = "<?php\n\n$curl = curl_init();\n\ncurl_setopt_array($curl, [\n";
        code +=
          '    CURLOPT_URL => "' +
          p.url +
          '",\n    CURLOPT_RETURNTRANSFER => true,\n    CURLOPT_CUSTOMREQUEST => "' +
          p.method +
          '",\n';
        if (Object.keys(p.headers).length > 0) {
          code += "    CURLOPT_HTTPHEADER => [\n";
          Object.entries(p.headers).forEach(([k, v]) => {
            code += '        "' + k + ": " + v + '",\n';
          });
          code += "    ],\n";
        }
        if (p.data) code += "    CURLOPT_POSTFIELDS => '" + p.data.replace(/'/g, "\\'") + "',\n";
        code += "]);\n\n$response = curl_exec($curl);\ncurl_close($curl);\n\necho $response;\n?>";
        return code;
      }

      function genJava(p) {
        let code =
          'import java.net.URI;\nimport java.net.http.HttpClient;\nimport java.net.http.HttpRequest;\nimport java.net.http.HttpResponse;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        HttpClient client = HttpClient.newHttpClient();\n\n        HttpRequest request = HttpRequest.newBuilder()\n            .uri(URI.create("' +
          p.url +
          '"))\n            .method("' +
          p.method +
          '"';
        if (p.data)
          code += ', HttpRequest.BodyPublishers.ofString("' + p.data.replace(/"/g, '\\"') + '"))\n';
        else code += ", HttpRequest.BodyPublishers.noBody())\n";
        Object.entries(p.headers).forEach(([k, v]) => {
          code += '            .header("' + k + '", "' + v + '")\n';
        });
        code +=
          "            .build();\n\n        HttpResponse<String> response = client.send(request,\n            HttpResponse.BodyHandlers.ofString());\n\n        System.out.println(response.body());\n    }\n}";
        return code;
      }

      function genNode(p) {
        let code =
          "const axios = require('axios');\n\naxios({\n  method: '" +
          p.method.toLowerCase() +
          "',\n  url: '" +
          p.url +
          "'";
        if (Object.keys(p.headers).length > 0) {
          code += ",\n  headers: {\n";
          Object.entries(p.headers).forEach(([k, v], i, arr) => {
            code += "    '" + k + "': '" + v + "'" + (i < arr.length - 1 ? "," : "") + "\n";
          });
          code += "  }";
        }
        if (p.data) code += ",\n  data: '" + p.data.replace(/'/g, "\\'") + "'";
        code +=
          "\n})\n  .then(response => console.log(response.data))\n  .catch(error => console.error(error));";
        return code;
      }

      function renderParsedInfo(p) {
        const container = document.getElementById("parsedInfo");
        container.textContent = "";

        const h4 = document.createElement("h4");
        h4.textContent = "📋 解析结果";
        container.appendChild(h4);

        [
          { label: "URL", value: p.url },
          { label: "方法", value: p.method },
          { label: "请求头", value: Object.keys(p.headers).length + " 个" },
          ...(p.data
            ? [
                {
                  label: "数据",
                  value: p.data.substring(0, 80) + (p.data.length > 80 ? "..." : "")
                }
              ]
            : [])
        ].forEach((item) => {
          const div = document.createElement("div");
          div.className = "parsed-item";
          const label = document.createElement("span");
          label.className = "parsed-label";
          label.textContent = item.label + ":";
          const value = document.createElement("span");
          value.className = "parsed-value";
          value.textContent = item.value;
          div.appendChild(label);
          div.appendChild(value);
          container.appendChild(div);
        });
      }

      function showStatus(msg, type) {
        const bar = document.getElementById("statusBar");
        bar.textContent = msg;
        bar.className = "status-bar " + type;
        setTimeout(() => {
          bar.className = "status-bar";
        }, 3000);
      }

      window.copyCode = function () {
        navigator.clipboard
          .writeText(document.getElementById("codeOutput").textContent)
          .then(() => showStatus("代码已复制", "success"));
      };

      window.clearAll = function () {
        document.getElementById("curlInput").value = "";
        document.getElementById("outputCard").style.display = "none";
        parsedCurl = null;
      };

      initTheme();
    
