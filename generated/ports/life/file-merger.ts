// @ts-nocheck
// Generated from tools/life/file-merger.html
// Source SHA-256: afea0fa0ebda07aa5b5a2c622612cf692652fb11e259eca2675fe78d016f4890
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let files = [],
        mergedContent = "";
      document.addEventListener("DOMContentLoaded", () => {
        initTheme();
        initDropZone();
      });
      function initTheme() {
        const s = localStorage.getItem("theme");
        if (s) document.documentElement.setAttribute("data-theme", s);
      }
      window.toggleTheme = function () {
        const c = document.documentElement.getAttribute("data-theme");
        const n = c === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", n);
        localStorage.setItem("theme", n);
      };
      function initDropZone() {
        const dz = document.getElementById("dropZone"),
          fi = document.getElementById("fileInput");
        dz.addEventListener("click", () => fi.click());
        dz.addEventListener("dragover", (e) => {
          e.preventDefault();
          dz.classList.add("dragover");
        });
        dz.addEventListener("dragleave", () => dz.classList.remove("dragover"));
        dz.addEventListener("drop", (e) => {
          e.preventDefault();
          dz.classList.remove("dragover");
          handleFiles(e.dataTransfer.files);
        });
        fi.addEventListener("change", (e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        });
      }
      function handleFiles(fl) {
        Array.from(fl).forEach((f) => {
          const r = new FileReader();
          r.onload = (e) => {
            files.push({ name: f.name, size: f.size, content: e.target.result });
            renderList();
          };
          r.readAsText(f);
        });
      }
      function renderList() {
        document.getElementById("fileList").innerHTML = files
          .map(
            (f, i) =>
              '<div class="file-item"><span>📄</span><div class="info"><div class="name">' +
              f.name +
              '</div><div class="size">' +
              formatSize(f.size) +
              '</div></div><button class="remove" onclick="files.splice(' +
              i +
              ',1);renderList()">×</button></div>'
          )
          .join("");
      }
      window.clearAll = function () {
        files = [];
        renderList();
        document.getElementById("preview").textContent = "合并后的内容将显示在这里...";
      };
      function mergeFiles() {
        if (!files.length) {
          showToast("请先添加文件");
          return;
        }
        let sep = document.getElementById("separator").value.replace(/\\n/g, "\n");
        const addFn = document.getElementById("addFilename").checked,
          trim = document.getElementById("trimContent").checked;
        mergedContent = files
          .map((f) => {
            let c = f.content;
            if (trim) c = c.trim();
            if (addFn) c = "// === " + f.name + " ===\n" + c;
            return c;
          })
          .join(sep);
        document.getElementById("preview").textContent = mergedContent;
      }
      function downloadMerged() {
        if (!mergedContent) mergeFiles();
        if (!mergedContent) return;
        const b = new Blob([mergedContent], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.download = "merged.txt";
        a.click();
      }
      window.copyMerged = async function () {
        if (!mergedContent) mergeFiles();
        if (!mergedContent) return;
        await navigator.clipboard.writeText(mergedContent);
        showToast("已复制");
      };
      function formatSize(b) {
        if (b < 1024) return b + " B";
        if (b < 1048576) return (b / 1024).toFixed(1) + " KB";
        return (b / 1048576).toFixed(2) + " MB";
      }
      function showToast(m) {
        const t = document.createElement("div");
        t.className = "toast";
        t.textContent = m;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2000);
      }
    
