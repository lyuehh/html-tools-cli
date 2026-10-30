// @ts-nocheck
// Generated from tools/dev/docker-command-builder.html
// Source SHA-256: e5df5bb54b43f2b25b01030af6ebb962b58a99297bb8d977c81dffcf9fbf4ad0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentPanel = "run";

      function showPanel(name) {
        currentPanel = name;
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
        event.target.classList.add("active");
        document.getElementById("panel-" + name).classList.add("active");

        const builders = {
          run: buildRun,
          build: buildBuild,
          exec: buildExec,
          compose: buildCompose,
          image: buildImage,
          container: buildContainer
        };
        if (builders[name]) builders[name]();
      }

      function setCommand(cmd) {
        document.getElementById("command").textContent = cmd;
      }

      function buildRun() {
        const image = document.getElementById("run-image").value.trim() || "<image>";
        const name = document.getElementById("run-name").value.trim();
        const ports = document.getElementById("run-ports").value.trim();
        const volumes = document.getElementById("run-volumes").value.trim();
        const env = document.getElementById("run-env").value.trim();
        const detach = document.getElementById("run-detach").checked;
        const rm = document.getElementById("run-rm").checked;
        const it = document.getElementById("run-it").checked;
        const restart = document.getElementById("run-restart").checked;
        const cmd = document.getElementById("run-cmd").value.trim();

        let command = "docker run";
        if (detach) command += " -d";
        if (rm) command += " --rm";
        if (it) command += " -it";
        if (restart) command += " --restart=unless-stopped";
        if (name) command += ` --name ${name}`;

        if (ports) {
          ports.split(",").forEach((p) => {
            command += ` -p ${p.trim()}`;
          });
        }

        if (volumes) {
          volumes.split(",").forEach((v) => {
            command += ` -v ${v.trim()}`;
          });
        }

        if (env) {
          env.split("\n").forEach((e) => {
            if (e.trim()) command += ` -e ${e.trim()}`;
          });
        }

        command += ` ${image}`;
        if (cmd) command += ` ${cmd}`;

        setCommand(command);
      }

      function buildBuild() {
        const tag = document.getElementById("build-tag").value.trim() || "<tag>";
        const file = document.getElementById("build-file").value.trim();
        const context = document.getElementById("build-context").value.trim() || ".";
        const args = document.getElementById("build-args").value.trim();
        const noCache = document.getElementById("build-no-cache").checked;
        const pull = document.getElementById("build-pull").checked;

        let command = "docker build";
        command += ` -t ${tag}`;
        if (file) command += ` -f ${file}`;
        if (noCache) command += " --no-cache";
        if (pull) command += " --pull";

        if (args) {
          args.split("\n").forEach((a) => {
            if (a.trim()) command += ` --build-arg ${a.trim()}`;
          });
        }

        command += ` ${context}`;
        setCommand(command);
      }

      function buildExec() {
        const container = document.getElementById("exec-container").value.trim() || "<container>";
        const cmd = document.getElementById("exec-cmd").value.trim() || "/bin/bash";
        const it = document.getElementById("exec-it").checked;
        const userEnabled = document.getElementById("exec-user").checked;
        const user = document.getElementById("exec-user-name").value.trim();

        document.getElementById("exec-user-input").style.display = userEnabled ? "block" : "none";

        let command = "docker exec";
        if (it) command += " -it";
        if (userEnabled && user) command += ` -u ${user}`;
        command += ` ${container} ${cmd}`;

        setCommand(command);
      }

      function buildCompose() {
        const action = document.getElementById("compose-action").value;
        const file = document.getElementById("compose-file").value.trim();
        const service = document.getElementById("compose-service").value.trim();
        const detach = document.getElementById("compose-detach").checked;
        const build = document.getElementById("compose-build").checked;
        const follow = document.getElementById("compose-follow").checked;

        let command = "docker compose";
        if (file) command += ` -f ${file}`;
        command += ` ${action}`;

        if (action === "up") {
          if (detach) command += " -d";
          if (build) command += " --build";
        }
        if (action === "logs" && follow) command += " -f";

        if (service) command += ` ${service}`;
        setCommand(command);
      }

      function buildImage() {
        const action = document.getElementById("image-action").value;
        const name = document.getElementById("image-name").value.trim();
        const newTag = document.getElementById("image-new-tag").value.trim();

        document.getElementById("image-name-group").style.display = ["ls", "prune"].includes(action)
          ? "none"
          : "block";
        document.getElementById("image-new-tag-group").style.display =
          action === "tag" ? "block" : "none";

        let command = "docker";
        switch (action) {
          case "pull":
            command += ` pull ${name || "<image>"}`;
            break;
          case "push":
            command += ` push ${name || "<image>"}`;
            break;
          case "tag":
            command += ` tag ${name || "<image>"} ${newTag || "<new-tag>"}`;
            break;
          case "rmi":
            command += ` rmi ${name || "<image>"}`;
            break;
          case "ls":
            command += " images";
            break;
          case "prune":
            command += " image prune -a";
            break;
        }

        setCommand(command);
      }

      function buildContainer() {
        const action = document.getElementById("container-action").value;
        const name = document.getElementById("container-name").value.trim();
        const force = document.getElementById("container-force").checked;
        const all = document.getElementById("container-all").checked;
        const follow = document.getElementById("container-follow").checked;

        document.getElementById("container-name-group").style.display =
          action === "ps" ? "none" : "block";

        let command = "docker";
        switch (action) {
          case "start":
          case "stop":
          case "restart":
            command += ` ${action} ${name || "<container>"}`;
            break;
          case "rm":
            command += ` rm${force ? " -f" : ""} ${name || "<container>"}`;
            break;
          case "logs":
            command += ` logs${follow ? " -f" : ""} ${name || "<container>"}`;
            break;
          case "ps":
            command += ` ps${all ? " -a" : ""}`;
            break;
          case "inspect":
            command += ` inspect ${name || "<container>"}`;
            break;
        }

        setCommand(command);
      }

      function copyCommand() {
        const cmd = document.getElementById("command").textContent;
        navigator.clipboard.writeText(cmd);
      }

      buildRun();

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
    
