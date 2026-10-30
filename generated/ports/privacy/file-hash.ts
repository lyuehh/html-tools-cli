// @ts-nocheck
// Generated from tools/privacy/file-hash.html
// Source SHA-256: cd50b7558900cd19db363d87bfb7570b7dd692bf5c6dce0cbd180c1f4d8c006f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Elements
      // ============================================
      var dropZone = document.getElementById("dropZone");
      var fileInput = document.getElementById("fileInput");
      var fileInfo = document.getElementById("fileInfo");
      var progressContainer = document.getElementById("progressContainer");
      var progressFill = document.getElementById("progressFill");
      var progressText = document.getElementById("progressText");
      var hashResults = document.getElementById("hashResults");
      var verifyInput = document.getElementById("verifyInput");
      var verifyResult = document.getElementById("verifyResult");
      var statusEl = document.getElementById("status");

      var currentHashes = {};

      // ============================================
      // Utility Functions
      // ============================================
      window.formatFileSize = function (bytes) {
        if (bytes === 0) return "0 B";
        var k = 1024;
        var sizes = ["B", "KB", "MB", "GB", "TB"];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
      };

      function arrayBufferToWordArray(ab) {
        var i8a = new Uint8Array(ab);
        var a = [];
        for (var i = 0; i < i8a.length; i += 4) {
          a.push((i8a[i] << 24) | (i8a[i + 1] << 16) | (i8a[i + 2] << 8) | i8a[i + 3]);
        }
        return CryptoJS.lib.WordArray.create(a, i8a.length);
      }

      // ============================================
      // Hash Calculation
      // ============================================
      async function calculateHashes(file) {
        fileInfo.classList.add("visible");
        document.getElementById("fileName").textContent = file.name;
        document.getElementById("fileMeta").textContent =
          formatFileSize(file.size) + " · " + (file.type || "未知类型");

        progressContainer.classList.add("visible");
        hashResults.classList.remove("visible");
        verifyResult.className = "verify-result";

        var chunkSize = 2 * 1024 * 1024; // 2MB chunks
        var chunks = Math.ceil(file.size / chunkSize);
        var currentChunk = 0;

        var md5 = CryptoJS.algo.MD5.create();
        var sha1 = CryptoJS.algo.SHA1.create();
        var sha256 = CryptoJS.algo.SHA256.create();
        var sha512 = CryptoJS.algo.SHA512.create();

        function readChunk(start) {
          return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            var end = Math.min(start + chunkSize, file.size);
            var blob = file.slice(start, end);

            reader.onload = function (e) {
              resolve(e.target.result);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
          });
        }

        for (var i = 0; i < chunks; i++) {
          var chunk = await readChunk(i * chunkSize);
          var wordArray = arrayBufferToWordArray(chunk);

          md5.update(wordArray);
          sha1.update(wordArray);
          sha256.update(wordArray);
          sha512.update(wordArray);

          var progress = Math.round(((i + 1) / chunks) * 100);
          progressFill.style.width = progress + "%";
          progressText.textContent = "计算中... " + progress + "%";
        }

        currentHashes = {
          md5: md5.finalize().toString(),
          sha1: sha1.finalize().toString(),
          sha256: sha256.finalize().toString(),
          sha512: sha512.finalize().toString()
        };

        document.getElementById("md5Hash").textContent = currentHashes.md5;
        document.getElementById("sha1Hash").textContent = currentHashes.sha1;
        document.getElementById("sha256Hash").textContent = currentHashes.sha256;
        document.getElementById("sha512Hash").textContent = currentHashes.sha512;

        progressContainer.classList.remove("visible");
        hashResults.classList.add("visible");
        showStatus("哈希计算完成");
      }

      function handleFile(file) {
        if (!file) return;
        calculateHashes(file);
      }

      // ============================================
      // Drop Zone Events
      // ============================================
      dropZone.addEventListener("click", function () {
        fileInput.click();
      });

      dropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });

      dropZone.addEventListener("dragleave", function () {
        dropZone.classList.remove("dragover");
      });

      dropZone.addEventListener("drop", function (e) {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        var files = e.dataTransfer.files;
        if (files.length > 0) {
          handleFile(files[0]);
        }
      });

      fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
          handleFile(fileInput.files[0]);
        }
      });

      // ============================================
      // Copy Buttons
      // ============================================
      document.querySelectorAll(".copy-btn").forEach(function (btn) {
        btn.addEventListener("click", async function () {
          var hashType = btn.getAttribute("data-hash");
          var hash = currentHashes[hashType];
          if (hash) {
            try {
              await navigator.clipboard.writeText(hash);
              showStatus(hashType.toUpperCase() + " 已复制");
            } catch (e) {
              showStatus("复制失败");
            }
          }
        });
      });

      // ============================================
      // Verify Hash
      // ============================================
      document.getElementById("btnVerify").addEventListener("click", function () {
        var input = verifyInput.value.trim().toLowerCase();
        if (!input) {
          verifyResult.className = "verify-result";
          return;
        }

        var matched = false;
        var matchedType = "";

        for (var type in currentHashes) {
          if (currentHashes[type].toLowerCase() === input) {
            matched = true;
            matchedType = type.toUpperCase();
            break;
          }
        }

        if (matched) {
          verifyResult.className = "verify-result match";
          verifyResult.textContent = "✓ 哈希值匹配！(" + matchedType + ")";
        } else {
          verifyResult.className = "verify-result mismatch";
          verifyResult.textContent = "✗ 哈希值不匹配";
        }
      });

      verifyInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          document.getElementById("btnVerify").click();
        }
      });

      // ============================================
      // Status Message
      // ============================================
      function showStatus(msg) {
        statusEl.textContent = msg;
        setTimeout(function () {
          statusEl.textContent = "";
        }, 2000);
      }

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Initialize
      // ============================================
      initTheme();
    
