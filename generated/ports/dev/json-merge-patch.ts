// @ts-nocheck
// Generated from tools/dev/json-merge-patch.html
// Source SHA-256: 1e64b9d26c9395461b80921abee9058a3f8c3995b2b58776a7a833b46f9cf332
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var targetEl = document.getElementById("inputTarget");
      var patchEl = document.getElementById("inputPatch");
      var diffViewEl = document.getElementById("diffView");
      var statusEl = document.getElementById("status");
      var errorDetailEl = document.getElementById("errorDetail");
      var statsEl = document.getElementById("stats");
      var indentEl = document.getElementById("indent");
      var autoApplyEl = document.getElementById("autoApply");
      var showDiffEl = document.getElementById("showDiff");

      var LS_TARGET = "json_merge_patch_target_v1";
      var LS_PATCH = "json_merge_patch_patch_v1";

      // RFC 7396 JSON Merge Patch implementation
      function mergePatch(target, patch) {
        if (patch !== null && typeof patch === "object" && !Array.isArray(patch)) {
          var result =
            target !== null && typeof target === "object" && !Array.isArray(target)
              ? Object.assign({}, target)
              : {};
          var keys = Object.keys(patch);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var patchVal = patch[key];
            if (patchVal === null) {
              delete result[key];
            } else {
              result[key] = mergePatch(result[key], patchVal);
            }
          }
          return result;
        }
        return patch;
      }

      function getIndent() {
        var val = indentEl.value;
        return val === "tab" ? "\t" : parseInt(val, 10);
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // Count changes between target and result given a patch
      function countChanges(target, patch) {
        var added = 0;
        var modified = 0;
        var deleted = 0;

        if (patch !== null && typeof patch === "object" && !Array.isArray(patch)) {
          var keys = Object.keys(patch);
          var targetIsObj = target !== null && typeof target === "object" && !Array.isArray(target);

          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var patchVal = patch[key];

            if (patchVal === null) {
              if (targetIsObj && Object.prototype.hasOwnProperty.call(target, key)) {
                deleted++;
              }
            } else if (targetIsObj && Object.prototype.hasOwnProperty.call(target, key)) {
              modified++;
            } else {
              added++;
            }
          }
        }
        return { added: added, modified: modified, deleted: deleted };
      }

      function countKeys(obj) {
        if (obj === null || typeof obj !== "object") return 0;
        var count = Object.keys(obj).length;
        Object.values(obj).forEach(function (v) {
          count += countKeys(v);
        });
        return count;
      }

      // Build a diff view of the result, highlighting changes
      function buildDiffLines(target, patch, result, indent, depth) {
        var lines = [];
        depth = depth || 0;

        var indStr =
          indent === "\t"
            ? new Array(depth + 1).join("\t")
            : new Array(depth * indent + 1).join(" ");
        var childInd =
          indent === "\t"
            ? new Array(depth + 2).join("\t")
            : new Array((depth + 1) * indent + 1).join(" ");

        var tgtIsObj = target !== null && typeof target === "object" && !Array.isArray(target);
        var ptchIsObj = patch !== null && typeof patch === "object" && !Array.isArray(patch);
        var resIsObj = result !== null && typeof result === "object" && !Array.isArray(result);

        if (!resIsObj) {
          lines.push({ text: indStr + JSON.stringify(result), type: "added" });
          return lines;
        }

        lines.push({ text: indStr + "{", type: "unchanged" });

        // Deleted keys (in patch with null value, existing in target)
        if (ptchIsObj && tgtIsObj) {
          Object.keys(patch).forEach(function (key) {
            if (patch[key] === null && Object.prototype.hasOwnProperty.call(target, key)) {
              lines.push({
                text: childInd + JSON.stringify(key) + ": " + JSON.stringify(target[key]),
                type: "removed"
              });
            }
          });
        }

        // Result keys
        var resKeys = Object.keys(result);
        resKeys.forEach(function (key, idx) {
          var comma = idx < resKeys.length - 1 ? "," : "";
          var tgtVal = tgtIsObj ? target[key] : undefined;
          var ptchVal = ptchIsObj ? patch[key] : undefined;
          var resVal = result[key];

          var hasPatch = ptchVal !== undefined && ptchVal !== null;
          var wasInTarget = tgtVal !== undefined;

          if (hasPatch && !wasInTarget) {
            // New key added
            lines.push({
              text: childInd + JSON.stringify(key) + ": " + JSON.stringify(resVal) + comma,
              type: "added"
            });
          } else if (
            hasPatch &&
            wasInTarget &&
            ptchIsObj &&
            typeof ptchVal === "object" &&
            !Array.isArray(ptchVal) &&
            resVal !== null &&
            typeof resVal === "object"
          ) {
            // Nested object - recurse
            var nested = buildDiffLines(tgtVal, ptchVal, resVal, indent, depth + 1);
            // First line of nested is '{', we need to prefix with key
            if (nested.length > 0) {
              nested[0].text = childInd + JSON.stringify(key) + ": " + nested[0].text.trimStart();
            }
            // Last line gets the comma
            if (nested.length > 0 && comma) {
              nested[nested.length - 1].text += comma;
            }
            lines = lines.concat(nested);
          } else if (hasPatch && wasInTarget) {
            // Modified key - show old then new
            lines.push({
              text: childInd + JSON.stringify(key) + ": " + JSON.stringify(tgtVal) + comma,
              type: "removed"
            });
            lines.push({
              text: childInd + JSON.stringify(key) + ": " + JSON.stringify(resVal) + comma,
              type: "added"
            });
          } else {
            // Unchanged
            lines.push({
              text: childInd + JSON.stringify(key) + ": " + JSON.stringify(resVal) + comma,
              type: "unchanged"
            });
          }
        });

        lines.push({ text: indStr + "}", type: "unchanged" });
        return lines;
      }

      function applyPatch() {
        var targetText = targetEl.value.trim();
        var patchText = patchEl.value.trim();

        errorDetailEl.classList.remove("show");
        errorDetailEl.textContent = "";
        targetEl.classList.remove("error");
        patchEl.classList.remove("error");

        if (!targetText && !patchText) {
          diffViewEl.innerHTML = '<div class="diff-empty">填写左侧两栏后自动执行合并</div>';
          diffViewEl.dataset.result = "";
          statsEl.classList.remove("show");
          statusEl.textContent = "";
          statusEl.className = "status";
          return;
        }

        var target, patch;

        if (targetText) {
          try {
            target = JSON.parse(targetText);
          } catch (e) {
            targetEl.classList.add("error");
            errorDetailEl.textContent = "原始文档解析失败: " + e.message;
            errorDetailEl.classList.add("show");
            showStatus("原始文档 JSON 无效", "error");
            return;
          }
        } else {
          target = {};
        }

        if (patchText) {
          try {
            patch = JSON.parse(patchText);
          } catch (e) {
            patchEl.classList.add("error");
            errorDetailEl.textContent = "Patch 文档解析失败: " + e.message;
            errorDetailEl.classList.add("show");
            showStatus("Patch 文档 JSON 无效", "error");
            return;
          }
        } else {
          patch = {};
        }

        var result = mergePatch(target, patch);
        var indent = getIndent();

        var changes = countChanges(target, patch);
        document.getElementById("statAdded").textContent = changes.added;
        document.getElementById("statModified").textContent = changes.modified;
        document.getElementById("statDeleted").textContent = changes.deleted;
        document.getElementById("statKeys").textContent = countKeys(result);
        statsEl.classList.add("show");

        var resultJson = JSON.stringify(result, null, indent);
        diffViewEl.dataset.result = resultJson;

        var useDiff = showDiffEl.checked;

        if (useDiff) {
          var diffLines = buildDiffLines(target, patch, result, indent, 0);
          var fragment = document.createDocumentFragment();
          diffLines.forEach(function (line) {
            var span = document.createElement("span");
            span.textContent = line.text + "\n";
            if (line.type === "added") {
              span.className = "diff-line-added";
            } else if (line.type === "removed") {
              span.className = "diff-line-removed";
            } else {
              span.className = "diff-line-unchanged";
            }
            fragment.appendChild(span);
          });
          diffViewEl.innerHTML = "";
          diffViewEl.appendChild(fragment);
        } else {
          diffViewEl.textContent = resultJson;
        }

        var totalChanges = changes.added + changes.modified + changes.deleted;
        showStatus(
          "合并成功 · " +
            totalChanges +
            " 处变更（+" +
            changes.added +
            " ~" +
            changes.modified +
            " -" +
            changes.deleted +
            "）",
          "success"
        );
      }

      function loadFromStorage() {
        var t = localStorage.getItem(LS_TARGET);
        var p = localStorage.getItem(LS_PATCH);
        if (t) targetEl.value = t;
        if (p) patchEl.value = p;
      }

      function saveToStorage() {
        localStorage.setItem(LS_TARGET, targetEl.value);
        localStorage.setItem(LS_PATCH, patchEl.value);
      }

      var applyTimer = null;
      function scheduleApply() {
        if (!autoApplyEl.checked) return;
        clearTimeout(applyTimer);
        applyTimer = setTimeout(applyPatch, 400);
      }

      document.getElementById("btnApply").onclick = applyPatch;

      document.getElementById("btnSwap").onclick = function () {
        var existingResult = diffViewEl.dataset.result;
        var currentPatch = patchEl.value;
        if (existingResult) {
          targetEl.value = existingResult;
          patchEl.value = currentPatch;
        } else {
          var t = targetEl.value;
          targetEl.value = currentPatch;
          patchEl.value = t;
        }
        saveToStorage();
        applyPatch();
      };

      document.getElementById("btnLoadExample").onclick = function () {
        targetEl.value = JSON.stringify(
          {
            name: "Alice",
            age: 30,
            email: "alice@example.com",
            address: {
              city: "Beijing",
              country: "China"
            },
            tags: ["admin", "user"]
          },
          null,
          2
        );
        patchEl.value = JSON.stringify(
          {
            age: 31,
            email: null,
            phone: "+86-138-0000-0000",
            address: {
              city: "Shanghai"
            }
          },
          null,
          2
        );
        saveToStorage();
        applyPatch();
      };

      document.getElementById("btnCopyResult").onclick = async function () {
        var res = diffViewEl.dataset.result;
        if (!res) {
          showStatus("没有合并结果", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(res);
          showStatus("结果已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnCopyPatch").onclick = async function () {
        if (!patchEl.value.trim()) {
          showStatus("没有 Patch 内容", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(patchEl.value);
          showStatus("Patch 已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        targetEl.value = "";
        patchEl.value = "";
        targetEl.classList.remove("error");
        patchEl.classList.remove("error");
        errorDetailEl.classList.remove("show");
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
        diffViewEl.innerHTML = '<div class="diff-empty">填写左侧两栏后自动执行合并</div>';
        diffViewEl.dataset.result = "";
        localStorage.removeItem(LS_TARGET);
        localStorage.removeItem(LS_PATCH);
      };

      targetEl.addEventListener("input", function () {
        saveToStorage();
        scheduleApply();
      });

      patchEl.addEventListener("input", function () {
        saveToStorage();
        scheduleApply();
      });

      showDiffEl.addEventListener("change", function () {
        applyPatch();
      });

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          applyPatch();
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
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
      loadFromStorage();
      if (targetEl.value || patchEl.value) applyPatch();
    
