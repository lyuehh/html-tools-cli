// @ts-nocheck
// Generated from tools/education/binary-tree.html
// Source SHA-256: 04fb207ac2a84d060fbdef32f092bae1d95e75c4599db265247bdefd3656882e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var root = null;
      var highlightedNode = null;

      function TreeNode(value) {
        this.value = value;
        this.left = null;
        this.right = null;
      }

      function insert(node, value) {
        if (node === null) {
          return new TreeNode(value);
        }
        if (value < node.value) {
          node.left = insert(node.left, value);
        } else if (value > node.value) {
          node.right = insert(node.right, value);
        }
        return node;
      }

      function findMin(node) {
        while (node.left !== null) {
          node = node.left;
        }
        return node;
      }

      function deleteNodeHelper(node, value) {
        if (node === null) return null;

        if (value < node.value) {
          node.left = deleteNodeHelper(node.left, value);
        } else if (value > node.value) {
          node.right = deleteNodeHelper(node.right, value);
        } else {
          if (node.left === null) return node.right;
          if (node.right === null) return node.left;

          var minNode = findMin(node.right);
          node.value = minNode.value;
          node.right = deleteNodeHelper(node.right, minNode.value);
        }
        return node;
      }

      function search(node, value) {
        if (node === null) return null;
        if (value === node.value) return node;
        if (value < node.value) return search(node.left, value);
        return search(node.right, value);
      }

      function getHeight(node) {
        if (node === null) return 0;
        return 1 + Math.max(getHeight(node.left), getHeight(node.right));
      }

      function countNodes(node) {
        if (node === null) return 0;
        return 1 + countNodes(node.left) + countNodes(node.right);
      }

      function getMin(node) {
        if (node === null) return null;
        while (node.left !== null) node = node.left;
        return node.value;
      }

      function getMax(node) {
        if (node === null) return null;
        while (node.right !== null) node = node.right;
        return node.value;
      }

      function preorder(node, result) {
        if (node === null) return;
        result.push(node.value);
        preorder(node.left, result);
        preorder(node.right, result);
      }

      function inorder(node, result) {
        if (node === null) return;
        inorder(node.left, result);
        result.push(node.value);
        inorder(node.right, result);
      }

      function postorder(node, result) {
        if (node === null) return;
        postorder(node.left, result);
        postorder(node.right, result);
        result.push(node.value);
      }

      function levelorder(node) {
        if (node === null) return [];
        var result = [];
        var queue = [node];
        while (queue.length > 0) {
          var current = queue.shift();
          result.push(current.value);
          if (current.left) queue.push(current.left);
          if (current.right) queue.push(current.right);
        }
        return result;
      }

      function insertNode() {
        var value = parseInt(document.getElementById("valueInput").value);
        if (isNaN(value)) {
          alert("请输入有效的整数");
          return;
        }
        root = insert(root, value);
        highlightedNode = value;
        draw();
        updateInfo();
        document.getElementById("valueInput").value = "";
        setTimeout(function () {
          highlightedNode = null;
          draw();
        }, 1000);
      }

      function deleteNode() {
        var value = parseInt(document.getElementById("valueInput").value);
        if (isNaN(value)) {
          alert("请输入有效的整数");
          return;
        }
        root = deleteNodeHelper(root, value);
        draw();
        updateInfo();
        document.getElementById("valueInput").value = "";
      }

      function searchNode() {
        var value = parseInt(document.getElementById("valueInput").value);
        if (isNaN(value)) {
          alert("请输入有效的整数");
          return;
        }
        var found = search(root, value);
        if (found) {
          highlightedNode = value;
          draw();
          setTimeout(function () {
            highlightedNode = null;
            draw();
          }, 1500);
        } else {
          alert("未找到节点 " + value);
        }
      }

      function clearTree() {
        root = null;
        draw();
        updateInfo();
        document.getElementById("traversalOutput").textContent = "-";
      }

      function buildPreset(values) {
        root = null;
        values.forEach(function (v) {
          root = insert(root, v);
        });
        draw();
        updateInfo();
      }

      function buildRandom() {
        root = null;
        var count = 7 + Math.floor(Math.random() * 8);
        var values = [];
        while (values.length < count) {
          var v = Math.floor(Math.random() * 100) + 1;
          if (values.indexOf(v) === -1) {
            values.push(v);
            root = insert(root, v);
          }
        }
        draw();
        updateInfo();
      }

      function traverse(type) {
        var result = [];
        switch (type) {
          case "preorder":
            preorder(root, result);
            break;
          case "inorder":
            inorder(root, result);
            break;
          case "postorder":
            postorder(root, result);
            break;
          case "levelorder":
            result = levelorder(root);
            break;
        }
        document.getElementById("traversalOutput").textContent =
          result.length > 0 ? result.join(" → ") : "-";
      }

      function updateInfo() {
        document.getElementById("nodeCount").textContent = countNodes(root);
        document.getElementById("treeHeight").textContent = getHeight(root);
        var min = getMin(root);
        var max = getMax(root);
        document.getElementById("minValue").textContent = min !== null ? min : "-";
        document.getElementById("maxValue").textContent = max !== null ? max : "-";
      }

      function draw() {
        var container = canvas.parentElement;
        var width = container.clientWidth;
        var height = Math.max(400, getHeight(root) * 80 + 100);

        canvas.width = width;
        canvas.height = height;

        var isDark =
          window.matchMedia("(prefers-color-scheme: dark)").matches ||
          getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() === "#0a0a0f";

        ctx.fillStyle = isDark ? "#0a0a0f" : "#f5f5f5";
        ctx.fillRect(0, 0, width, height);

        if (root === null) {
          ctx.fillStyle = isDark ? "#888" : "#666";
          ctx.font = "16px system-ui";
          ctx.textAlign = "center";
          ctx.fillText("空树 - 请插入节点", width / 2, height / 2);
          return;
        }

        var nodeRadius = 22;
        var levelHeight = 70;

        function drawNode(node, x, y, level, xOffset) {
          if (node === null) return;

          var childY = y + levelHeight;
          var childOffset = xOffset / 2;

          // Draw edges
          ctx.strokeStyle = isDark ? "#2a2a3a" : "#e0e0e0";
          ctx.lineWidth = 2;

          if (node.left) {
            ctx.beginPath();
            ctx.moveTo(x, y + nodeRadius);
            ctx.lineTo(x - childOffset, childY - nodeRadius);
            ctx.stroke();
            drawNode(node.left, x - childOffset, childY, level + 1, childOffset);
          }

          if (node.right) {
            ctx.beginPath();
            ctx.moveTo(x, y + nodeRadius);
            ctx.lineTo(x + childOffset, childY - nodeRadius);
            ctx.stroke();
            drawNode(node.right, x + childOffset, childY, level + 1, childOffset);
          }

          // Draw node circle
          var isHighlighted = node.value === highlightedNode;

          ctx.beginPath();
          ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);

          if (isHighlighted) {
            ctx.fillStyle = "#22c55e";
          } else {
            ctx.fillStyle = "#8b5cf6";
          }
          ctx.fill();

          ctx.strokeStyle = isHighlighted ? "#16a34a" : "#7c3aed";
          ctx.lineWidth = 3;
          ctx.stroke();

          // Draw value
          ctx.fillStyle = "white";
          ctx.font = "bold 14px system-ui";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.value.toString(), x, y);
        }

        var treeHeight = getHeight(root);
        var initialOffset = Math.min(width / 4, Math.pow(2, treeHeight - 1) * 40);

        drawNode(root, width / 2, 50, 0, initialOffset);
      }

      // Initialize
      buildPreset([50, 30, 70, 20, 40, 60, 80]);

      window.addEventListener("resize", function () {
        draw();
      });

      document.getElementById("valueInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          insertNode();
        }
      });

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
    
