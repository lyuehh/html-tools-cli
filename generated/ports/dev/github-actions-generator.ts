// @ts-nocheck
// Generated from tools/dev/github-actions-generator.html
// Source SHA-256: 1552c15777ef3d3c7f5e3ba7c7d5d8c59e3d7bee99e0c9c48b23e9d305ff38cc
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var workflowNameEl = document.getElementById("workflowName");
      var branchesEl = document.getElementById("branches");
      var nodeVersionsEl = document.getElementById("nodeVersions");
      var runsOnEl = document.getElementById("runsOn");
      var enableCacheEl = document.getElementById("enableCache");
      var enableLintEl = document.getElementById("enableLint");
      var enableTestEl = document.getElementById("enableTest");
      var enableBuildEl = document.getElementById("enableBuild");
      var enableCoverageEl = document.getElementById("enableCoverage");
      var enableArtifactEl = document.getElementById("enableArtifact");
      var outputEl = document.getElementById("output");
      var statusEl = document.getElementById("status");

      var currentTemplate = "node-ci";

      var templates = {
        "node-ci": {
          name: "CI",
          branches: "main, master",
          nodeVersions: "18, 20",
          cache: true,
          lint: true,
          test: true,
          build: true,
          coverage: false,
          artifact: false
        },
        "python-ci": {
          name: "Python CI",
          branches: "main, master",
          nodeVersions: "3.10, 3.11, 3.12",
          cache: true,
          lint: true,
          test: true,
          build: false,
          coverage: true,
          artifact: false
        },
        "docker-build": {
          name: "Docker Build",
          branches: "main",
          nodeVersions: "",
          cache: false,
          lint: false,
          test: false,
          build: true,
          coverage: false,
          artifact: false
        },
        "deploy-pages": {
          name: "Deploy to GitHub Pages",
          branches: "main",
          nodeVersions: "20",
          cache: true,
          lint: false,
          test: false,
          build: true,
          coverage: false,
          artifact: false
        },
        release: {
          name: "Release",
          branches: "",
          nodeVersions: "20",
          cache: true,
          lint: false,
          test: true,
          build: true,
          coverage: false,
          artifact: true
        },
        lint: {
          name: "Lint",
          branches: "main, master",
          nodeVersions: "20",
          cache: true,
          lint: true,
          test: false,
          build: false,
          coverage: false,
          artifact: false
        }
      };

      function applyTemplate(name) {
        currentTemplate = name;
        var t = templates[name];
        if (!t) return;

        workflowNameEl.value = t.name;
        branchesEl.value = t.branches;
        nodeVersionsEl.value = t.nodeVersions;
        enableCacheEl.checked = t.cache;
        enableLintEl.checked = t.lint;
        enableTestEl.checked = t.test;
        enableBuildEl.checked = t.build;
        enableCoverageEl.checked = t.coverage;
        enableArtifactEl.checked = t.artifact;

        document.querySelectorAll(".template-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.template === name);
        });

        generate();
      }

      window.generate = function () {
        var name = workflowNameEl.value || "CI";
        var branches = branchesEl.value
          .split(",")
          .map(function (b) {
            return b.trim();
          })
          .filter(Boolean);
        var versions = nodeVersionsEl.value
          .split(",")
          .map(function (v) {
            return v.trim();
          })
          .filter(Boolean);
        var runsOn = runsOnEl.value;
        var enableCache = enableCacheEl.checked;
        var enableLint = enableLintEl.checked;
        var enableTest = enableTestEl.checked;
        var enableBuild = enableBuildEl.checked;
        var enableCoverage = enableCoverageEl.checked;
        var enableArtifact = enableArtifactEl.checked;

        var isPython = currentTemplate === "python-ci";
        var isDocker = currentTemplate === "docker-build";
        var isPages = currentTemplate === "deploy-pages";
        var isRelease = currentTemplate === "release";

        var lines = [];

        lines.push("name: " + name);
        lines.push("");
        lines.push("on:");

        if (isRelease) {
          lines.push("  push:");
          lines.push("    tags:");
          lines.push('      - "v*"');
        } else if (branches.length > 0) {
          lines.push("  push:");
          lines.push("    branches: [" + branches.join(", ") + "]");
          lines.push("  pull_request:");
          lines.push("    branches: [" + branches.join(", ") + "]");
        } else {
          lines.push("  push:");
          lines.push("  pull_request:");
        }

        if (isPages) {
          lines.push("  workflow_dispatch:");
          lines.push("");
          lines.push("permissions:");
          lines.push("  contents: read");
          lines.push("  pages: write");
          lines.push("  id-token: write");
          lines.push("");
          lines.push("concurrency:");
          lines.push('  group: "pages"');
          lines.push("  cancel-in-progress: false");
        }

        lines.push("");
        lines.push("jobs:");

        if (isDocker) {
          // Docker build workflow
          lines.push("  build:");
          lines.push("    runs-on: " + runsOn);
          lines.push("    steps:");
          lines.push("      - name: Checkout");
          lines.push("        uses: actions/checkout@v4");
          lines.push("");
          lines.push("      - name: Set up Docker Buildx");
          lines.push("        uses: docker/setup-buildx-action@v3");
          lines.push("");
          lines.push("      - name: Login to Docker Hub");
          lines.push("        uses: docker/login-action@v3");
          lines.push("        with:");
          lines.push("          username: ${{ secrets.DOCKERHUB_USERNAME }}");
          lines.push("          password: ${{ secrets.DOCKERHUB_TOKEN }}");
          lines.push("");
          lines.push("      - name: Build and push");
          lines.push("        uses: docker/build-push-action@v5");
          lines.push("        with:");
          lines.push("          context: .");
          lines.push("          push: true");
          lines.push("          tags: |");
          lines.push("            ${{ secrets.DOCKERHUB_USERNAME }}/app:latest");
          lines.push("            ${{ secrets.DOCKERHUB_USERNAME }}/app:${{ github.sha }}");
          lines.push("          cache-from: type=gha");
          lines.push("          cache-to: type=gha,mode=max");
        } else if (isPages) {
          // GitHub Pages deployment
          lines.push("  build:");
          lines.push("    runs-on: " + runsOn);
          lines.push("    steps:");
          lines.push("      - name: Checkout");
          lines.push("        uses: actions/checkout@v4");
          lines.push("");
          if (versions.length > 0) {
            lines.push("      - name: Setup Node.js");
            lines.push("        uses: actions/setup-node@v4");
            lines.push("        with:");
            lines.push("          node-version: " + versions[0]);
            if (enableCache) {
              lines.push("          cache: npm");
            }
            lines.push("");
            lines.push("      - name: Install dependencies");
            lines.push("        run: npm ci");
            lines.push("");
            lines.push("      - name: Build");
            lines.push("        run: npm run build");
            lines.push("");
          }
          lines.push("      - name: Setup Pages");
          lines.push("        uses: actions/configure-pages@v4");
          lines.push("");
          lines.push("      - name: Upload artifact");
          lines.push("        uses: actions/upload-pages-artifact@v3");
          lines.push("        with:");
          lines.push("          path: ./dist");
          lines.push("");
          lines.push("  deploy:");
          lines.push("    environment:");
          lines.push("      name: github-pages");
          lines.push("      url: ${{ steps.deployment.outputs.page_url }}");
          lines.push("    runs-on: " + runsOn);
          lines.push("    needs: build");
          lines.push("    steps:");
          lines.push("      - name: Deploy to GitHub Pages");
          lines.push("        id: deployment");
          lines.push("        uses: actions/deploy-pages@v4");
        } else if (isPython) {
          // Python CI
          lines.push("  test:");
          lines.push("    runs-on: " + runsOn);
          if (versions.length > 1) {
            lines.push("    strategy:");
            lines.push("      matrix:");
            lines.push(
              "        python-version: [" +
                versions
                  .map(function (v) {
                    return '"' + v + '"';
                  })
                  .join(", ") +
                "]"
            );
          }
          lines.push("    steps:");
          lines.push("      - name: Checkout");
          lines.push("        uses: actions/checkout@v4");
          lines.push("");
          lines.push("      - name: Set up Python");
          lines.push("        uses: actions/setup-python@v5");
          lines.push("        with:");
          lines.push(
            "          python-version: " +
              (versions.length > 1 ? "${{ matrix.python-version }}" : versions[0] || "3.12")
          );
          if (enableCache) {
            lines.push("          cache: pip");
          }
          lines.push("");
          lines.push("      - name: Install dependencies");
          lines.push("        run: |");
          lines.push("          python -m pip install --upgrade pip");
          lines.push("          pip install -r requirements.txt");
          if (enableLint) {
            lines.push("");
            lines.push("      - name: Lint with ruff");
            lines.push("        run: |");
            lines.push("          pip install ruff");
            lines.push("          ruff check .");
          }
          if (enableTest) {
            lines.push("");
            lines.push("      - name: Test with pytest");
            lines.push("        run: |");
            lines.push("          pip install pytest" + (enableCoverage ? " pytest-cov" : ""));
            lines.push("          pytest" + (enableCoverage ? " --cov=./ --cov-report=xml" : ""));
          }
          if (enableCoverage) {
            lines.push("");
            lines.push("      - name: Upload coverage");
            lines.push("        uses: codecov/codecov-action@v4");
            lines.push("        with:");
            lines.push("          token: ${{ secrets.CODECOV_TOKEN }}");
          }
        } else {
          // Node.js CI (default)
          lines.push("  build:");
          lines.push("    runs-on: " + runsOn);
          if (versions.length > 1) {
            lines.push("    strategy:");
            lines.push("      matrix:");
            lines.push("        node-version: [" + versions.join(", ") + "]");
          }
          lines.push("    steps:");
          lines.push("      - name: Checkout");
          lines.push("        uses: actions/checkout@v4");
          lines.push("");
          lines.push("      - name: Setup Node.js");
          lines.push("        uses: actions/setup-node@v4");
          lines.push("        with:");
          lines.push(
            "          node-version: " +
              (versions.length > 1 ? "${{ matrix.node-version }}" : versions[0] || "20")
          );
          if (enableCache) {
            lines.push("          cache: npm");
          }
          lines.push("");
          lines.push("      - name: Install dependencies");
          lines.push("        run: npm ci");

          if (enableLint) {
            lines.push("");
            lines.push("      - name: Lint");
            lines.push("        run: npm run lint");
          }

          if (enableTest) {
            lines.push("");
            lines.push("      - name: Test");
            lines.push("        run: npm test");
          }

          if (enableBuild) {
            lines.push("");
            lines.push("      - name: Build");
            lines.push("        run: npm run build");
          }

          if (enableCoverage) {
            lines.push("");
            lines.push("      - name: Upload coverage");
            lines.push("        uses: codecov/codecov-action@v4");
            lines.push("        with:");
            lines.push("          token: ${{ secrets.CODECOV_TOKEN }}");
          }

          if (enableArtifact) {
            lines.push("");
            lines.push("      - name: Upload artifact");
            lines.push("        uses: actions/upload-artifact@v4");
            lines.push("        with:");
            lines.push("          name: build-${{ github.sha }}");
            lines.push("          path: dist/");
          }

          if (isRelease) {
            lines.push("");
            lines.push("  release:");
            lines.push("    needs: build");
            lines.push("    runs-on: " + runsOn);
            lines.push("    steps:");
            lines.push("      - name: Checkout");
            lines.push("        uses: actions/checkout@v4");
            lines.push("");
            lines.push("      - name: Download artifact");
            lines.push("        uses: actions/download-artifact@v4");
            lines.push("        with:");
            lines.push("          name: build-${{ github.sha }}");
            lines.push("          path: dist/");
            lines.push("");
            lines.push("      - name: Create Release");
            lines.push("        uses: softprops/action-gh-release@v1");
            lines.push("        with:");
            lines.push("          files: dist/*");
            lines.push("          generate_release_notes: true");
          }
        }

        outputEl.textContent = lines.join("\n");
        saveToUrl();
      };

      // Template buttons
      document.querySelectorAll(".template-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          applyTemplate(btn.dataset.template);
        });
      });

      // Generate button
      document.getElementById("btnGenerate").addEventListener("click", generate);

      // Auto-generate on input change
      [
        workflowNameEl,
        branchesEl,
        nodeVersionsEl,
        runsOnEl,
        enableCacheEl,
        enableLintEl,
        enableTestEl,
        enableBuildEl,
        enableCoverageEl,
        enableArtifactEl
      ].forEach(function (el) {
        el.addEventListener("change", generate);
        el.addEventListener("input", generate);
      });

      // Copy
      document.getElementById("btnCopy").addEventListener("click", async function () {
        try {
          await navigator.clipboard.writeText(outputEl.textContent);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      });

      // Download
      document.getElementById("btnDownload").addEventListener("click", function () {
        var content = outputEl.textContent;
        var blob = new Blob([content], { type: "text/yaml" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "ci.yml";
        a.click();
        URL.revokeObjectURL(url);
        showStatus("已下载 ci.yml", "success");
      });

      // Share
      document.getElementById("btnShare").addEventListener("click", async function () {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          showStatus("分享链接已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      });

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // URL state
      function saveToUrl() {
        var state = {
          t: currentTemplate,
          n: workflowNameEl.value,
          b: branchesEl.value,
          v: nodeVersionsEl.value,
          r: runsOnEl.value,
          c: enableCacheEl.checked,
          l: enableLintEl.checked,
          te: enableTestEl.checked,
          bu: enableBuildEl.checked,
          co: enableCoverageEl.checked,
          ar: enableArtifactEl.checked
        };
        try {
          history.replaceState(null, "", "#" + btoa(JSON.stringify(state)));
        } catch (e) {
          // ignore
        }
      }

      window.loadFromUrl = function () {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          var state = JSON.parse(atob(hash));
          if (state.t) currentTemplate = state.t;
          if (state.n) workflowNameEl.value = state.n;
          if (state.b !== undefined) branchesEl.value = state.b;
          if (state.v !== undefined) nodeVersionsEl.value = state.v;
          if (state.r) runsOnEl.value = state.r;
          if (state.c !== undefined) enableCacheEl.checked = state.c;
          if (state.l !== undefined) enableLintEl.checked = state.l;
          if (state.te !== undefined) enableTestEl.checked = state.te;
          if (state.bu !== undefined) enableBuildEl.checked = state.bu;
          if (state.co !== undefined) enableCoverageEl.checked = state.co;
          if (state.ar !== undefined) enableArtifactEl.checked = state.ar;

          document.querySelectorAll(".template-btn").forEach(function (btn) {
            btn.classList.toggle("active", btn.dataset.template === currentTemplate);
          });
          return true;
        } catch (e) {
          // ignore
        }
        return false;
      };

      // Theme
      window.toggleTheme = function () {
        var html = document.documentElement;
        var btn = document.querySelector(".theme-toggle");
        var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      };

      // Init
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          var btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "dark" ? "🌙" : "☀️";
        }

        if (!loadFromUrl()) {
          generate();
        } else {
          generate();
        }
      })();
    
