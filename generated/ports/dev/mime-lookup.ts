// @ts-nocheck
// Generated from tools/dev/mime-lookup.html
// Source SHA-256: 16530b3932b41b9f03ee096f4aea10cebe817d3b577ea874abded8dd593b5f2c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const MIME_TYPES = {
        文本: [
          { ext: ".txt", mime: "text/plain", desc: "纯文本" },
          { ext: ".html", mime: "text/html", desc: "HTML 网页" },
          { ext: ".htm", mime: "text/html", desc: "HTML 网页" },
          { ext: ".css", mime: "text/css", desc: "CSS 样式表" },
          { ext: ".csv", mime: "text/csv", desc: "CSV 数据" },
          { ext: ".xml", mime: "text/xml", desc: "XML 文档" },
          { ext: ".md", mime: "text/markdown", desc: "Markdown 文档" }
        ],
        "JavaScript/JSON": [
          { ext: ".js", mime: "text/javascript", desc: "JavaScript" },
          { ext: ".mjs", mime: "text/javascript", desc: "ES Module" },
          { ext: ".json", mime: "application/json", desc: "JSON 数据" },
          { ext: ".map", mime: "application/json", desc: "Source Map" },
          { ext: ".ts", mime: "text/typescript", desc: "TypeScript" },
          { ext: ".tsx", mime: "text/typescript-jsx", desc: "TypeScript JSX" },
          { ext: ".jsx", mime: "text/jsx", desc: "JavaScript JSX" }
        ],
        图片: [
          { ext: ".jpg", mime: "image/jpeg", desc: "JPEG 图片" },
          { ext: ".jpeg", mime: "image/jpeg", desc: "JPEG 图片" },
          { ext: ".png", mime: "image/png", desc: "PNG 图片" },
          { ext: ".gif", mime: "image/gif", desc: "GIF 图片" },
          { ext: ".webp", mime: "image/webp", desc: "WebP 图片" },
          { ext: ".svg", mime: "image/svg+xml", desc: "SVG 矢量图" },
          { ext: ".ico", mime: "image/x-icon", desc: "ICO 图标" },
          { ext: ".bmp", mime: "image/bmp", desc: "BMP 位图" },
          { ext: ".tiff", mime: "image/tiff", desc: "TIFF 图片" },
          { ext: ".avif", mime: "image/avif", desc: "AVIF 图片" }
        ],
        音频: [
          { ext: ".mp3", mime: "audio/mpeg", desc: "MP3 音频" },
          { ext: ".wav", mime: "audio/wav", desc: "WAV 音频" },
          { ext: ".ogg", mime: "audio/ogg", desc: "OGG 音频" },
          { ext: ".m4a", mime: "audio/mp4", desc: "M4A 音频" },
          { ext: ".flac", mime: "audio/flac", desc: "FLAC 无损" },
          { ext: ".aac", mime: "audio/aac", desc: "AAC 音频" },
          { ext: ".webm", mime: "audio/webm", desc: "WebM 音频" }
        ],
        视频: [
          { ext: ".mp4", mime: "video/mp4", desc: "MP4 视频" },
          { ext: ".webm", mime: "video/webm", desc: "WebM 视频" },
          { ext: ".ogg", mime: "video/ogg", desc: "OGG 视频" },
          { ext: ".avi", mime: "video/x-msvideo", desc: "AVI 视频" },
          { ext: ".mov", mime: "video/quicktime", desc: "QuickTime" },
          { ext: ".mkv", mime: "video/x-matroska", desc: "MKV 视频" },
          { ext: ".wmv", mime: "video/x-ms-wmv", desc: "WMV 视频" }
        ],
        文档: [
          { ext: ".pdf", mime: "application/pdf", desc: "PDF 文档" },
          { ext: ".doc", mime: "application/msword", desc: "Word 文档" },
          {
            ext: ".docx",
            mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            desc: "Word 文档"
          },
          { ext: ".xls", mime: "application/vnd.ms-excel", desc: "Excel 表格" },
          {
            ext: ".xlsx",
            mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            desc: "Excel 表格"
          },
          { ext: ".ppt", mime: "application/vnd.ms-powerpoint", desc: "PPT 演示" },
          {
            ext: ".pptx",
            mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            desc: "PPT 演示"
          }
        ],
        压缩包: [
          { ext: ".zip", mime: "application/zip", desc: "ZIP 压缩包" },
          { ext: ".rar", mime: "application/vnd.rar", desc: "RAR 压缩包" },
          { ext: ".7z", mime: "application/x-7z-compressed", desc: "7Z 压缩包" },
          { ext: ".tar", mime: "application/x-tar", desc: "TAR 归档" },
          { ext: ".gz", mime: "application/gzip", desc: "GZIP 压缩" },
          { ext: ".bz2", mime: "application/x-bzip2", desc: "BZIP2 压缩" }
        ],
        字体: [
          { ext: ".woff", mime: "font/woff", desc: "WOFF 字体" },
          { ext: ".woff2", mime: "font/woff2", desc: "WOFF2 字体" },
          { ext: ".ttf", mime: "font/ttf", desc: "TrueType 字体" },
          { ext: ".otf", mime: "font/otf", desc: "OpenType 字体" },
          { ext: ".eot", mime: "application/vnd.ms-fontobject", desc: "EOT 字体" }
        ],
        其他: [
          { ext: ".wasm", mime: "application/wasm", desc: "WebAssembly" },
          { ext: ".bin", mime: "application/octet-stream", desc: "二进制数据" },
          { ext: ".exe", mime: "application/octet-stream", desc: "可执行文件" },
          { ext: ".dmg", mime: "application/octet-stream", desc: "DMG 镜像" },
          { ext: ".iso", mime: "application/octet-stream", desc: "ISO 镜像" },
          { ext: ".apk", mime: "application/vnd.android.package-archive", desc: "Android APK" },
          { ext: ".ipa", mime: "application/octet-stream", desc: "iOS IPA" }
        ]
      };

      function renderStats() {
        const container = document.getElementById("stats");
        let total = 0;
        const catCount = Object.keys(MIME_TYPES).length;
        Object.values(MIME_TYPES).forEach(function (items) {
          total += items.length;
        });

        const stats = [
          { number: total, label: "总条目数" },
          { number: catCount, label: "分类数" }
        ];

        stats.forEach(function (s) {
          const item = document.createElement("div");
          item.className = "stat-item";
          const num = document.createElement("div");
          num.className = "number";
          num.textContent = s.number;
          const label = document.createElement("div");
          label.className = "label";
          label.textContent = s.label;
          item.appendChild(num);
          item.appendChild(label);
          container.appendChild(item);
        });
      }

      function renderResults(filter) {
        const container = document.getElementById("results");
        container.innerHTML = "";
        const search = (filter || "").toLowerCase().replace(/^\./, "");

        Object.keys(MIME_TYPES).forEach(function (cat) {
          const items = MIME_TYPES[cat].filter(function (item) {
            if (!search) return true;
            return (
              item.ext.toLowerCase().includes(search) ||
              item.mime.toLowerCase().includes(search) ||
              item.desc.toLowerCase().includes(search)
            );
          });

          if (items.length === 0) return;

          const section = document.createElement("div");
          section.className = "category-section";

          const title = document.createElement("h2");
          title.className = "category-title";
          title.textContent = cat + " (" + items.length + ")";
          section.appendChild(title);

          items.forEach(function (item) {
            const row = document.createElement("div");
            row.className = "result-item";

            const ext = document.createElement("div");
            ext.className = "ext";
            ext.textContent = item.ext;

            const mime = document.createElement("div");
            mime.className = "mime";
            mime.textContent = item.mime;
            mime.title = item.desc;

            const copyBtn = document.createElement("button");
            copyBtn.className = "copy-btn";
            copyBtn.textContent = "复制";
            copyBtn.addEventListener("click", async function () {
              try {
                await navigator.clipboard.writeText(item.mime);
                copyBtn.textContent = "✓";
                setTimeout(function () {
                  copyBtn.textContent = "复制";
                }, 1000);
              } catch (e) {}
            });

            row.appendChild(ext);
            row.appendChild(mime);
            row.appendChild(copyBtn);
            section.appendChild(row);
          });

          container.appendChild(section);
        });

        if (container.children.length === 0) {
          const noResult = document.createElement("div");
          noResult.style.textAlign = "center";
          noResult.style.padding = "40px";
          noResult.style.color = "var(--text-muted)";
          noResult.textContent = "没有找到匹配的 MIME 类型";
          container.appendChild(noResult);
        }
      }

      document.getElementById("search").addEventListener("input", function (e) {
        renderResults(e.target.value);
      });

      renderStats();
      renderResults();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "dark" ? "" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next || "light");
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = "🌙";
        }
      })();
    
