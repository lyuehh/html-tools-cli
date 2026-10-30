// @ts-nocheck
// Generated from tools/dev/curl-converter.html
// Source SHA-256: a7b7ac4b2820db7ee4fbb8250b166a7d3c93b59035aa5c2410e37cab47316027
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var languages = ["JavaScript", "Python", "Go", "PHP", "Java", "Node.js"];
      var currentLang = "JavaScript";

      function initTabs() {
        var tabs = document.getElementById("langTabs");
        languages.forEach(function (lang) {
          var btn = document.createElement("button");
          btn.className = "tab" + (lang === currentLang ? " active" : "");
          btn.textContent = lang;
          btn.onclick = function () {
            setLang(lang);
          };
          tabs.appendChild(btn);
        });
      }

      function setLang(lang) {
        currentLang = lang;
        var tabs = document.querySelectorAll(".tab");
        tabs.forEach(function (t) {
          t.classList.toggle("active", t.textContent === lang);
        });
        convert();
      }

      function parseCurl(curl) {
        var result = { method: "GET", url: "", headers: {}, data: null };

        curl = curl.replace(/\\\n/g, " ").trim();
        if (!curl.toLowerCase().startsWith("curl")) return result;

        var urlMatch =
          curl.match(/curl\s+['"]?([^'" ]+)['"]?/i) || curl.match(/--url\s+['"]?([^'" ]+)['"]?/i);
        if (urlMatch) result.url = urlMatch[1];

        var methodMatch = curl.match(/-X\s+['"]?(\w+)['"]?/i);
        if (methodMatch) result.method = methodMatch[1].toUpperCase();

        var headerRegex = /-H\s+['"]([^'"]+)['"]/gi;
        var hm;
        while ((hm = headerRegex.exec(curl)) !== null) {
          var parts = hm[1].split(":");
          if (parts.length >= 2) {
            result.headers[parts[0].trim()] = parts.slice(1).join(":").trim();
          }
        }

        var dataMatch =
          curl.match(/(?:-d|--data|--data-raw)\s+['"](.+?)['"]\s*(?:-|$)/s) ||
          curl.match(/(?:-d|--data|--data-raw)\s+['"](.+)['"]\s*$/s);
        if (dataMatch) {
          result.data = dataMatch[1];
          if (result.method === "GET") result.method = "POST";
        }

        return result;
      }

      function toJavaScript(req) {
        var lines = ["fetch(" + JSON.stringify(req.url) + ", {"];
        lines.push("  method: " + JSON.stringify(req.method) + ",");
        if (Object.keys(req.headers).length > 0) {
          lines.push(
            "  headers: " +
              JSON.stringify(req.headers, null, 2)
                .split("\n")
                .map(function (l, i) {
                  return i === 0 ? l : "  " + l;
                })
                .join("\n") +
              ","
          );
        }
        if (req.data) {
          lines.push("  body: " + JSON.stringify(req.data));
        }
        lines.push("})");
        lines.push(".then(response => response.json())");
        lines.push(".then(data => console.log(data));");
        return lines.join("\n");
      }

      function toPython(req) {
        var lines = ["import requests", ""];
        lines.push("url = " + JSON.stringify(req.url));
        if (Object.keys(req.headers).length > 0) {
          lines.push(
            "headers = " +
              JSON.stringify(req.headers, null, 2).replace(/": /g, '": ').replace(/\n/g, "\n")
          );
        }
        if (req.data) {
          lines.push("data = " + JSON.stringify(req.data));
        }
        lines.push("");
        var args = ["url"];
        if (Object.keys(req.headers).length > 0) args.push("headers=headers");
        if (req.data) args.push("data=data");
        lines.push("response = requests." + req.method.toLowerCase() + "(" + args.join(", ") + ")");
        lines.push("print(response.json())");
        return lines.join("\n");
      }

      function toGo(req) {
        var lines = ["package main", "", "import (", '  "fmt"', '  "net/http"', '  "io/ioutil"'];
        if (req.data) lines.push('  "strings"');
        lines.push(")", "", "func main() {");
        if (req.data) {
          lines.push("  body := strings.NewReader(" + JSON.stringify(req.data) + ")");
          lines.push(
            "  req, _ := http.NewRequest(" +
              JSON.stringify(req.method) +
              ", " +
              JSON.stringify(req.url) +
              ", body)"
          );
        } else {
          lines.push(
            "  req, _ := http.NewRequest(" +
              JSON.stringify(req.method) +
              ", " +
              JSON.stringify(req.url) +
              ", nil)"
          );
        }
        Object.keys(req.headers).forEach(function (k) {
          lines.push(
            "  req.Header.Set(" + JSON.stringify(k) + ", " + JSON.stringify(req.headers[k]) + ")"
          );
        });
        lines.push("", "  client := &http.Client{}");
        lines.push("  resp, _ := client.Do(req)");
        lines.push("  defer resp.Body.Close()");
        lines.push("  data, _ := ioutil.ReadAll(resp.Body)");
        lines.push("  fmt.Println(string(data))");
        lines.push("}");
        return lines.join("\n");
      }

      function toPHP(req) {
        var lines = [
          "<?php",
          "",
          "$ch = curl_init();",
          "",
          "curl_setopt($ch, CURLOPT_URL, " + JSON.stringify(req.url) + ");"
        ];
        lines.push("curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);");
        if (req.method !== "GET") {
          lines.push(
            "curl_setopt($ch, CURLOPT_CUSTOMREQUEST, " + JSON.stringify(req.method) + ");"
          );
        }
        if (Object.keys(req.headers).length > 0) {
          lines.push("curl_setopt($ch, CURLOPT_HTTPHEADER, [");
          Object.keys(req.headers).forEach(function (k) {
            lines.push("  " + JSON.stringify(k + ": " + req.headers[k]) + ",");
          });
          lines.push("]);");
        }
        if (req.data) {
          lines.push("curl_setopt($ch, CURLOPT_POSTFIELDS, " + JSON.stringify(req.data) + ");");
        }
        lines.push("", "$response = curl_exec($ch);", "curl_close($ch);", "", "echo $response;");
        return lines.join("\n");
      }

      function toJava(req) {
        var lines = [
          "import java.net.http.*;",
          "import java.net.URI;",
          "",
          "public class Main {",
          "  public static void main(String[] args) throws Exception {"
        ];
        lines.push("    HttpClient client = HttpClient.newHttpClient();");
        lines.push("    HttpRequest.Builder builder = HttpRequest.newBuilder()");
        lines.push("      .uri(URI.create(" + JSON.stringify(req.url) + "))");
        Object.keys(req.headers).forEach(function (k) {
          lines.push(
            "      .header(" + JSON.stringify(k) + ", " + JSON.stringify(req.headers[k]) + ")"
          );
        });
        if (req.data) {
          lines.push(
            "      .method(" +
              JSON.stringify(req.method) +
              ", HttpRequest.BodyPublishers.ofString(" +
              JSON.stringify(req.data) +
              "));"
          );
        } else if (req.method === "GET" || req.method === "DELETE") {
          lines.push("      ." + req.method + "();");
        } else {
          lines.push(
            "      .method(" +
              JSON.stringify(req.method) +
              ", HttpRequest.BodyPublishers.noBody());"
          );
        }
        lines.push("    HttpRequest request = builder.build();");
        lines.push(
          "    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());"
        );
        lines.push("    System.out.println(response.body());");
        lines.push("  }", "}");
        return lines.join("\n");
      }

      function toNode(req) {
        var lines = ['const https = require("https");', 'const url = require("url");', ""];
        lines.push("const options = {");
        lines.push("  ...url.parse(" + JSON.stringify(req.url) + "),");
        lines.push("  method: " + JSON.stringify(req.method) + ",");
        if (Object.keys(req.headers).length > 0) {
          lines.push(
            "  headers: " +
              JSON.stringify(req.headers, null, 2)
                .split("\n")
                .map(function (l, i) {
                  return i === 0 ? l : "  " + l;
                })
                .join("\n")
          );
        }
        lines.push("};", "");
        lines.push("const req = https.request(options, (res) => {");
        lines.push('  let data = "";');
        lines.push('  res.on("data", (chunk) => data += chunk);');
        lines.push('  res.on("end", () => console.log(data));');
        lines.push("});");
        if (req.data) {
          lines.push("req.write(" + JSON.stringify(req.data) + ");");
        }
        lines.push("req.end();");
        return lines.join("\n");
      }

      function convert() {
        var curl = document.getElementById("curlInput").value;
        var req = parseCurl(curl);
        var output = "";

        if (req.url) {
          switch (currentLang) {
            case "JavaScript":
              output = toJavaScript(req);
              break;
            case "Python":
              output = toPython(req);
              break;
            case "Go":
              output = toGo(req);
              break;
            case "PHP":
              output = toPHP(req);
              break;
            case "Java":
              output = toJava(req);
              break;
            case "Node.js":
              output = toNode(req);
              break;
          }
        }

        document.getElementById("output").value = output;
      }

      window.copyOutput = function () {
        navigator.clipboard.writeText(document.getElementById("output").value).then(function () {
          var btn = document.querySelector(".copy-btn");
          btn.textContent = "已复制!";
          setTimeout(function () {
            btn.textContent = "复制";
          }, 1500);
        });
      };

      initTabs();

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
    
