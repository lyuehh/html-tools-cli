// @ts-nocheck
// Generated from tools/fun/wheel-of-fortune.html
// Source SHA-256: 7377b07711f36d6a4d2b3f9ac12f61c469fa0cff20891e173cf7f85e19fb92e3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const colors = [
        "#e74c3c",
        "#3498db",
        "#2ecc71",
        "#f39c12",
        "#9b59b6",
        "#1abc9c",
        "#e67e22",
        "#34495e"
      ];
      let options = ["选项1", "选项2", "选项3", "选项4", "选项5", "选项6"];
      let spinning = false;
      let currentRotation = 0;

      function drawWheel() {
        const canvas = document.getElementById("wheel");
        const ctx = canvas.getContext("2d");
        const cx = 160,
          cy = 160,
          r = 150;
        const arc = (Math.PI * 2) / options.length;

        ctx.clearRect(0, 0, 320, 320);

        for (let i = 0; i < options.length; i++) {
          const startAngle = i * arc - Math.PI / 2;
          const endAngle = startAngle + arc;

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, r, startAngle, endAngle);
          ctx.fillStyle = colors[i % colors.length];
          ctx.fill();
          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw text
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(startAngle + arc / 2);
          ctx.fillStyle = "white";
          ctx.font = "bold 14px sans-serif";
          ctx.textAlign = "right";
          ctx.textBaseline = "middle";
          const text = options[i].length > 8 ? options[i].slice(0, 8) + "..." : options[i];
          ctx.fillText(text, r - 20, 0);
          ctx.restore();
        }

        // Center circle
        ctx.beginPath();
        ctx.arc(cx, cy, 20, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      function spin() {
        if (spinning || options.length < 2) return;
        spinning = true;
        document.querySelector(".spin-btn").disabled = true;
        document.getElementById("result").textContent = "旋转中...";

        const wheel = document.getElementById("wheel");
        const extraSpins = 5 + Math.random() * 5; // 5-10 full rotations
        const targetIndex = Math.floor(Math.random() * options.length);
        const arc = 360 / options.length;
        const targetRotation =
          currentRotation + extraSpins * 360 + (360 - targetIndex * arc - arc / 2 + 90);

        wheel.style.transform = `rotate(${targetRotation}deg)`;
        currentRotation = targetRotation % 360;

        setTimeout(() => {
          document.getElementById("result").textContent = "🎉 " + options[targetIndex];
          spinning = false;
          document.querySelector(".spin-btn").disabled = false;
        }, 4000);
      }

      function updateWheel() {
        const input = document.getElementById("optionsInput").value;
        options = input
          .split("\n")
          .map((s) => s.trim())
          .filter((s) => s);
        if (options.length < 2) {
          alert("至少需要2个选项");
          return;
        }
        drawWheel();
        document.getElementById("result").textContent = "点击按钮开始抽奖";
      }

      drawWheel();
    
