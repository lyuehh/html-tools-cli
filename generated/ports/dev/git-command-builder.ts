// @ts-nocheck
// Generated from tools/dev/git-command-builder.html
// Source SHA-256: 0a47dc0fe3ade627cf5e06b1e59fd805040ec6dc8888c4863be45c92d71d2545
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentPanel = "clone";

      function showPanel(name) {
        currentPanel = name;
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
        event.target.classList.add("active");
        document.getElementById("panel-" + name).classList.add("active");

        // Build command for new panel
        const builders = {
          clone: buildClone,
          commit: buildCommit,
          branch: buildBranch,
          merge: buildMerge,
          reset: buildReset,
          stash: buildStash,
          remote: buildRemote
        };
        if (builders[name]) builders[name]();
      }

      function setCommand(cmd) {
        document.getElementById("command").textContent = cmd;
      }

      function buildClone() {
        const url = document.getElementById("clone-url").value.trim();
        const dir = document.getElementById("clone-dir").value.trim();
        const depth = document.getElementById("clone-depth").checked;
        const branchEnabled = document.getElementById("clone-branch").checked;
        const branch = document.getElementById("clone-branch-name").value.trim();

        document.getElementById("clone-branch-input").style.display = branchEnabled
          ? "block"
          : "none";

        let cmd = "git clone";
        if (depth) cmd += " --depth 1";
        if (branchEnabled && branch) cmd += ` -b ${branch}`;
        cmd += ` ${url || "<repository-url>"}`;
        if (dir) cmd += ` ${dir}`;

        setCommand(cmd);
      }

      function buildCommit() {
        const msg = document.getElementById("commit-msg").value.trim();
        const all = document.getElementById("commit-all").checked;
        const amend = document.getElementById("commit-amend").checked;
        const sign = document.getElementById("commit-sign").checked;

        let cmd = "git commit";
        if (all) cmd += " -a";
        if (sign) cmd += " -S";
        if (amend) cmd += " --amend";
        if (msg) cmd += ` -m "${msg}"`;
        else if (!amend) cmd += ' -m "<message>"';

        setCommand(cmd);
      }

      function buildBranch() {
        const action = document.getElementById("branch-action").value;
        const name = document.getElementById("branch-name").value.trim();
        const newName = document.getElementById("branch-new-name").value.trim();
        const force = document.getElementById("branch-force").checked;
        const remote = document.getElementById("branch-remote").checked;

        document.getElementById("branch-name-group").style.display =
          action !== "list" ? "block" : "none";
        document.getElementById("branch-new-name-group").style.display =
          action === "rename" ? "block" : "none";

        let cmd = "git ";
        switch (action) {
          case "create":
            cmd += `checkout -b ${name || "<branch-name>"}`;
            break;
          case "delete":
            cmd += `branch ${force ? "-D" : "-d"} ${name || "<branch-name>"}`;
            break;
          case "rename":
            cmd += `branch -m ${name || "<old-name>"} ${newName || "<new-name>"}`;
            break;
          case "list":
            cmd += `branch${remote ? " -a" : ""}`;
            break;
          case "checkout":
            cmd += `checkout ${name || "<branch-name>"}`;
            break;
        }

        setCommand(cmd);
      }

      function buildMerge() {
        const branch = document.getElementById("merge-branch").value.trim();
        const noFF = document.getElementById("merge-no-ff").checked;
        const squash = document.getElementById("merge-squash").checked;

        let cmd = "git merge";
        if (noFF) cmd += " --no-ff";
        if (squash) cmd += " --squash";
        cmd += ` ${branch || "<branch-name>"}`;

        setCommand(cmd);
      }

      function buildReset() {
        const mode = document.getElementById("reset-mode").value;
        const target = document.getElementById("reset-target").value.trim();

        setCommand(`git reset --${mode} ${target || "HEAD~1"}`);
      }

      function buildStash() {
        const action = document.getElementById("stash-action").value;
        const msg = document.getElementById("stash-msg").value.trim();

        document.getElementById("stash-msg-group").style.display =
          action === "push" ? "block" : "none";

        let cmd = "git stash";
        if (action !== "push" || action === "list" || action === "clear") {
          cmd += ` ${action}`;
        } else if (msg) {
          cmd += ` push -m "${msg}"`;
        }

        setCommand(cmd);
      }

      function buildRemote() {
        const action = document.getElementById("remote-action").value;
        const name = document.getElementById("remote-name").value.trim() || "origin";
        const url = document.getElementById("remote-url").value.trim();
        const branch = document.getElementById("remote-branch").value.trim() || "main";

        const showUrl = ["add"].includes(action);
        const showBranch = ["fetch", "pull", "push"].includes(action);
        const showName = action !== "list";

        document.getElementById("remote-name-group").style.display = showName ? "block" : "none";
        document.getElementById("remote-url-group").style.display = showUrl ? "block" : "none";
        document.getElementById("remote-branch-group").style.display = showBranch
          ? "block"
          : "none";

        let cmd = "git remote";
        switch (action) {
          case "add":
            cmd += ` add ${name} ${url || "<url>"}`;
            break;
          case "remove":
            cmd += ` remove ${name}`;
            break;
          case "rename":
            cmd += ` rename ${name} <new-name>`;
            break;
          case "list":
            cmd += " -v";
            break;
          case "fetch":
            cmd = `git fetch ${name} ${branch}`;
            break;
          case "pull":
            cmd = `git pull ${name} ${branch}`;
            break;
          case "push":
            cmd = `git push ${name} ${branch}`;
            break;
        }

        setCommand(cmd);
      }

      function copyCommand() {
        const cmd = document.getElementById("command").textContent;
        navigator.clipboard.writeText(cmd);
      }

      buildClone();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
