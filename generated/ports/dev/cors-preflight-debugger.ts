// @ts-nocheck
// Generated from tools/dev/cors-preflight-debugger.html
// Source SHA-256: 546f5d98b13eba5fa52265f13a3499d3ebb18098582a1689e39b01766f3b6757
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================================
      // CORS Preflight Debugger Logic
      // ============================================================

      var currentMode = "live";

      // --- Tab switching ---
      document.getElementById("tabLive").onclick = function () {
        switchMode("live");
      };
      document.getElementById("tabManual").onclick = function () {
        switchMode("manual");
      };

      function switchMode(mode) {
        currentMode = mode;
        document.getElementById("tabLive").classList.toggle("active", mode === "live");
        document.getElementById("tabManual").classList.toggle("active", mode === "manual");
        document.getElementById("tabLive").setAttribute("aria-selected", String(mode === "live"));
        document
          .getElementById("tabManual")
          .setAttribute("aria-selected", String(mode === "manual"));
        document.getElementById("panelLive").classList.toggle("active", mode === "live");
        document.getElementById("panelManual").classList.toggle("active", mode === "manual");
        hideResult();
      }

      function hideResult() {
        document.getElementById("resultSection").classList.remove("show");
      }

      function showGlobalStatus(msg, type) {
        var el = document.getElementById("globalStatus");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      // --- CORS header metadata ---
      var CORS_HEADER_INFO = {
        "access-control-allow-origin": {
          label: "Access-Control-Allow-Origin",
          desc: "指定允许访问资源的源（Origin）。值为具体源（如 https://example.com）或通配符 *。",
          checkFn: function (val, ctx) {
            if (!val) return { status: "missing", msg: "缺少此头，浏览器将阻止跨域响应。" };
            if (val === "*" && ctx.hasCredentials) {
              return {
                status: "warn",
                msg: "值为 * 时不能与 credentials 一起使用（withCredentials / Cookie）。需改为具体源。"
              };
            }
            return { status: "ok", msg: "已设置，允许来自 " + val + " 的访问。" };
          }
        },
        "access-control-allow-methods": {
          label: "Access-Control-Allow-Methods",
          desc: "列出允许的 HTTP 方法，多个用逗号分隔。简单方法（GET/POST/HEAD）不需要 preflight，但仍建议明确列出。",
          checkFn: function (val, ctx) {
            if (!val) {
              if (ctx.needsPreflight) {
                return {
                  status: "missing",
                  msg: "非简单请求需要此头，缺少会导致 preflight 失败。"
                };
              }
              return { status: "info", msg: "未设置（简单请求可接受）。" };
            }
            var methods = val.split(",").map(function (m) {
              return m.trim().toUpperCase();
            });
            if (
              ctx.method &&
              !methods.includes(ctx.method.toUpperCase()) &&
              !methods.includes("*")
            ) {
              return { status: "warn", msg: "请求方法 " + ctx.method + " 未在允许列表中。" };
            }
            return { status: "ok", msg: "允许方法: " + val };
          }
        },
        "access-control-allow-headers": {
          label: "Access-Control-Allow-Headers",
          desc: "列出允许的请求头，非简单请求头（如 Authorization、Content-Type: application/json）必须在此列出。",
          checkFn: function (val, ctx) {
            if (!val) {
              if (ctx.hasCustomHeaders) {
                return {
                  status: "missing",
                  msg: "请求包含非简单头，但响应缺少此字段，preflight 将失败。"
                };
              }
              return { status: "info", msg: "未设置（无自定义请求头时可接受）。" };
            }
            return { status: "ok", msg: "允许头: " + val };
          }
        },
        "access-control-allow-credentials": {
          label: "Access-Control-Allow-Credentials",
          desc: "为 true 时允许请求携带凭证（Cookie、HTTP Auth）。需与请求端 withCredentials: true 配合，且 Allow-Origin 不能为 *。",
          checkFn: function (val) {
            if (!val) return { status: "info", msg: "未设置，不允许携带凭证（默认行为）。" };
            if (val.toLowerCase() === "true") {
              return {
                status: "ok",
                msg: "允许凭证（Cookie / Auth）。请确保 Allow-Origin 为具体源。"
              };
            }
            return { status: "warn", msg: '值应为 "true"，当前值: ' + val };
          }
        },
        "access-control-expose-headers": {
          label: "Access-Control-Expose-Headers",
          desc: "指定哪些响应头可以暴露给前端 JS（默认仅基本头可读）。",
          checkFn: function (val) {
            if (!val)
              return {
                status: "info",
                msg: "未设置，前端只能读取基本响应头（Cache-Control 等）。"
              };
            return { status: "ok", msg: "暴露头: " + val };
          }
        },
        "access-control-max-age": {
          label: "Access-Control-Max-Age",
          desc: "preflight 结果可缓存的秒数，减少重复 OPTIONS 请求。Chrome 最大 7200 秒，Firefox 最大 86400 秒。",
          checkFn: function (val) {
            if (!val) return { status: "info", msg: "未设置，浏览器不会缓存 preflight 结果。" };
            var n = parseInt(val, 10);
            if (isNaN(n) || n < 0) return { status: "warn", msg: "值应为非负整数秒数。" };
            if (n > 86400) {
              return {
                status: "warn",
                msg: "值 " + n + " 超过 Firefox 上限 86400s，实际会被截断。"
              };
            }
            return { status: "ok", msg: "缓存 " + n + " 秒。" };
          }
        },
        vary: {
          label: "Vary",
          desc: "告知缓存代理此响应因哪些请求头不同而变化。CORS 响应通常应包含 Origin，避免缓存污染。",
          checkFn: function (val) {
            if (!val)
              return {
                status: "warn",
                msg: "建议添加 Vary: Origin 避免缓存服务器错误缓存 CORS 响应。"
              };
            if (val.toLowerCase().includes("origin")) {
              return { status: "ok", msg: "已包含 Origin，缓存行为正确。" };
            }
            return {
              status: "warn",
              msg: "未包含 Origin（当前: " + val + "），建议添加以避免缓存污染。"
            };
          }
        }
      };

      // Simple CORS request headers (no preflight needed if only these)
      var SIMPLE_HEADERS = ["accept", "accept-language", "content-language", "content-type"];
      var SIMPLE_CONTENT_TYPES = [
        "application/x-www-form-urlencoded",
        "multipart/form-data",
        "text/plain"
      ];
      var SIMPLE_METHODS = ["GET", "POST", "HEAD"];

      function parseHeadersText(text) {
        var result = {};
        var lines = text.split("\n");
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i].trim();
          if (!line || line.startsWith("HTTP/")) continue;
          var colonIdx = line.indexOf(":");
          if (colonIdx < 0) continue;
          var key = line.slice(0, colonIdx).trim().toLowerCase();
          var val = line.slice(colonIdx + 1).trim();
          if (key) result[key] = val;
        }
        return result;
      }

      function needsPreflightCheck(method, reqHeaders) {
        var m = (method || "GET").toUpperCase();
        if (!SIMPLE_METHODS.includes(m)) return true;
        var keys = Object.keys(reqHeaders);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i].toLowerCase();
          if (!SIMPLE_HEADERS.includes(k)) return true;
          if (k === "content-type") {
            var ct = reqHeaders[keys[i]].split(";")[0].trim().toLowerCase();
            if (!SIMPLE_CONTENT_TYPES.includes(ct)) return true;
          }
        }
        return false;
      }

      function hasCustomHeaders(reqHeaders) {
        var keys = Object.keys(reqHeaders);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i].toLowerCase();
          if (!SIMPLE_HEADERS.includes(k)) return true;
          if (k === "content-type") {
            var ct = reqHeaders[keys[i]].split(";")[0].trim().toLowerCase();
            if (!SIMPLE_CONTENT_TYPES.includes(ct)) return true;
          }
        }
        return false;
      }

      function buildContext(method, reqHeadersObj, resHeadersObj) {
        var acao = resHeadersObj["access-control-allow-credentials"];
        return {
          method: method,
          reqHeaders: reqHeadersObj,
          needsPreflight: needsPreflightCheck(method, reqHeadersObj),
          hasCustomHeaders: hasCustomHeaders(reqHeadersObj),
          hasCredentials: acao && acao.toLowerCase() === "true"
        };
      }

      function analyzeHeaders(method, reqHeadersText, resHeadersObj, rawText) {
        var reqHeadersObj = parseHeadersText(reqHeadersText || "");
        var ctx = buildContext(method, reqHeadersObj, resHeadersObj);
        var issues = [];
        var allOk = true;
        var hasWarn = false;

        // Build header rows for all known CORS headers
        var rowsData = [];
        var corsKeys = Object.keys(CORS_HEADER_INFO);
        for (var i = 0; i < corsKeys.length; i++) {
          var key = corsKeys[i];
          var info = CORS_HEADER_INFO[key];
          var val = resHeadersObj[key] || null;
          var check = info.checkFn(val, ctx);
          rowsData.push({ key: info.label, val: val, check: check, desc: info.desc });
          if (check.status === "missing") {
            allOk = false;
            issues.push({ type: "error", msg: info.label + " — " + check.msg });
          } else if (check.status === "warn") {
            hasWarn = true;
            issues.push({ type: "warn", msg: info.label + " — " + check.msg });
          }
        }

        // Check for extra unknown CORS headers
        var resKeys = Object.keys(resHeadersObj);
        for (var j = 0; j < resKeys.length; j++) {
          var rk = resKeys[j];
          if (rk.startsWith("access-control-") && !CORS_HEADER_INFO[rk]) {
            rowsData.push({
              key: rk,
              val: resHeadersObj[rk],
              check: { status: "info", msg: "非标准 CORS 头，部分浏览器可能忽略。" },
              desc: "非标准扩展头。"
            });
          }
        }

        renderResult(rowsData, issues, allOk, hasWarn, rawText);
      }

      function renderResult(rowsData, issues, allOk, hasWarn, rawText) {
        // Summary
        var summaryEl = document.getElementById("resultSummary");
        summaryEl.className = "result-summary";
        if (!allOk) {
          summaryEl.classList.add("fail");
          summaryEl.innerHTML =
            '<span class="result-summary-icon">✗</span>' +
            '<span class="result-summary-text">CORS 配置存在错误，跨域请求将被浏览器阻止。</span>';
        } else if (hasWarn) {
          summaryEl.classList.add("warn");
          summaryEl.innerHTML =
            '<span class="result-summary-icon">⚠</span>' +
            '<span class="result-summary-text">CORS 配置有警告，部分场景可能出现问题。</span>';
        } else {
          summaryEl.classList.add("pass");
          summaryEl.innerHTML =
            '<span class="result-summary-icon">✓</span>' +
            '<span class="result-summary-text">CORS 配置正常，跨域请求应可通过。</span>';
        }

        // Issues
        var issuesSection = document.getElementById("issuesSection");
        var issuesList = document.getElementById("issuesList");
        issuesList.textContent = "";
        if (issues.length > 0) {
          issuesSection.style.display = "block";
          for (var i = 0; i < issues.length; i++) {
            var issue = issues[i];
            var div = document.createElement("div");
            div.className = "issue-item" + (issue.type === "warn" ? " issue-warn" : "");
            var iconSpan = document.createElement("span");
            iconSpan.className = "issue-icon";
            iconSpan.textContent = issue.type === "warn" ? "⚠" : "✗";
            var msgDiv = document.createElement("div");
            msgDiv.textContent = issue.msg;
            div.appendChild(iconSpan);
            div.appendChild(msgDiv);
            issuesList.appendChild(div);
          }
        } else {
          issuesSection.style.display = "none";
        }

        // Header rows
        var headerRowsEl = document.getElementById("headerRows");
        headerRowsEl.textContent = "";
        for (var j = 0; j < rowsData.length; j++) {
          var row = rowsData[j];
          var rowDiv = document.createElement("div");
          rowDiv.className = "header-row " + row.check.status;

          var keyEl = document.createElement("div");
          keyEl.className = "header-key";
          keyEl.textContent = row.key;

          var valEl = document.createElement("div");
          valEl.className = "header-val" + (row.val === null ? " missing-val" : "");
          valEl.textContent = row.val !== null ? row.val : "(未设置)";

          var descEl = document.createElement("div");
          descEl.className = "header-desc";
          descEl.innerHTML =
            row.desc + (row.check.msg ? " <strong>" + escapeHtml(row.check.msg) + "</strong>" : "");

          rowDiv.appendChild(keyEl);
          rowDiv.appendChild(valEl);
          rowDiv.appendChild(descEl);
          headerRowsEl.appendChild(rowDiv);
        }

        // Raw headers
        var rawSection = document.getElementById("rawSection");
        if (rawText) {
          rawSection.style.display = "block";
          document.getElementById("rawHeaders").value = rawText;
        } else {
          rawSection.style.display = "none";
        }

        document.getElementById("resultSection").classList.add("show");
      }

      function escapeHtml(str) {
        return str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      }

      // ---- Live request ----
      document.getElementById("btnSendPreflight").onclick = function () {
        sendRequest("OPTIONS");
      };

      document.getElementById("btnSendActual").onclick = function () {
        var method = document.getElementById("reqMethod").value;
        sendRequest(method);
      };

      document.getElementById("btnClearLive").onclick = function () {
        document.getElementById("targetUrl").value = "";
        document.getElementById("reqOrigin").value = "";
        document.getElementById("reqHeaders").value = "";
        document.getElementById("liveStatus").textContent = "";
        document.getElementById("liveStatus").className = "status";
        hideResult();
        showGlobalStatus("", "");
      };

      function setLiveStatus(msg, type) {
        var el = document.getElementById("liveStatus");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function sendRequest(method) {
        var urlVal = document.getElementById("targetUrl").value.trim();
        if (!urlVal) {
          setLiveStatus("请输入目标 URL", "error");
          return;
        }
        var originVal = document.getElementById("reqOrigin").value.trim();
        var reqHeadersText = document.getElementById("reqHeaders").value;
        var reqHeadersObj = parseHeadersText(reqHeadersText);

        // Build fetch options
        var fetchHeaders = {};
        if (originVal) fetchHeaders["Origin"] = originVal;
        // Copy custom request headers for actual requests
        if (method !== "OPTIONS") {
          var keys = Object.keys(reqHeadersObj);
          for (var i = 0; i < keys.length; i++) {
            fetchHeaders[keys[i]] = reqHeadersObj[keys[i]];
          }
        }

        var spinner = document.getElementById("liveSpinner");
        spinner.classList.add("show");
        setLiveStatus("", "");
        hideResult();
        showGlobalStatus("正在请求…", "");

        var fetchOptions = {
          method: method,
          headers: fetchHeaders,
          mode: "cors"
        };

        fetch(urlVal, fetchOptions)
          .then(function (res) {
            spinner.classList.remove("show");
            var rawLines = [];
            rawLines.push("HTTP/1.1 " + res.status + " " + res.statusText);
            var resHeadersObj = {};
            res.headers.forEach(function (val, key) {
              rawLines.push(key + ": " + val);
              resHeadersObj[key.toLowerCase()] = val;
            });
            var rawText = rawLines.join("\n");
            var actualMethod =
              method === "OPTIONS" ? document.getElementById("reqMethod").value : method;
            analyzeHeaders(actualMethod, reqHeadersText, resHeadersObj, rawText);
            setLiveStatus(
              method + " " + res.status + " " + res.statusText,
              res.ok ? "success" : "error"
            );
            showGlobalStatus("请求完成", "success");
          })
          .catch(function (err) {
            spinner.classList.remove("show");
            var msg = err.message || String(err);
            setLiveStatus("请求失败: " + msg, "error");
            showGlobalStatus("请求失败（可能是 CORS 阻断）", "error");
            // Show analysis with all headers missing to help diagnose
            analyzeHeaders(
              method === "OPTIONS" ? document.getElementById("reqMethod").value : method,
              reqHeadersText,
              {},
              "（请求被浏览器阻断，无法读取响应头。请使用「手动粘贴响应头」模式从 DevTools 粘贴头信息。）"
            );
          });
      }

      // ---- Manual mode ----
      document.getElementById("btnAnalyze").onclick = function () {
        var resText = document.getElementById("manualResHeaders").value.trim();
        if (!resText) {
          document.getElementById("manualStatus").textContent = "请粘贴响应头";
          document.getElementById("manualStatus").className = "status error";
          return;
        }
        var resHeadersObj = parseHeadersText(resText);
        var reqHeadersText = document.getElementById("manualReqHeaders").value;
        var method = document.getElementById("manualMethod").value;
        analyzeHeaders(method, reqHeadersText, resHeadersObj, resText);
        document.getElementById("manualStatus").textContent = "分析完成";
        document.getElementById("manualStatus").className = "status success";
        showGlobalStatus("分析完成", "success");
      };

      document.getElementById("btnClearManual").onclick = function () {
        document.getElementById("manualResHeaders").value = "";
        document.getElementById("manualReqHeaders").value = "";
        document.getElementById("manualStatus").textContent = "";
        document.getElementById("manualStatus").className = "status";
        hideResult();
        showGlobalStatus("", "");
      };

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
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
