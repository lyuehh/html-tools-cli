// @ts-nocheck
// Generated from tools/text/frequency-analyzer.html
// Source SHA-256: 599aecdbd9302fe172a646838d967bdf9770baffa8c4cbee931602de375db7d9
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentData = [];
      let currentMode = "char";

      window.analyze = function () {
        const text = document.getElementById("textInput").value;
        const mode = document.getElementById("modeSelect").value;
        const ignoreCase = document.getElementById("ignoreCase").checked;
        const ignoreSpaces = document.getElementById("ignoreSpaces").checked;
        const ignorePunct = document.getElementById("ignorePunct").checked;
        const ngramSize = parseInt(document.getElementById("ngramSize").value);

        currentMode = mode;
        let processedText = text;

        if (ignoreCase) processedText = processedText.toLowerCase();
        if (ignorePunct) processedText = processedText.replace(/[^\w\s\u4e00-\u9fff]/g, "");

        let items = [];

        if (mode === "char") {
          items = processedText.split("");
          if (ignoreSpaces) items = items.filter((c) => !/\s/.test(c));
        } else if (mode === "word") {
          // 支持中英文分词
          items = processedText.match(/[\u4e00-\u9fff]|[a-zA-Z]+/g) || [];
        } else if (mode === "ngram") {
          const chars = processedText.split("").filter((c) => !ignoreSpaces || !/\s/.test(c));
          for (let i = 0; i <= chars.length - ngramSize; i++) {
            items.push(chars.slice(i, i + ngramSize).join(""));
          }
        }

        // 统计频率
        const freq = {};
        items.forEach((item) => {
          freq[item] = (freq[item] || 0) + 1;
        });

        // 转换为数组并排序
        currentData = Object.entries(freq)
          .map(([item, count]) => ({
            item,
            count,
            percent: ((count / items.length) * 100).toFixed(2)
          }))
          .sort((a, b) => b.count - a.count);

        // 更新统计
        updateStats(items.length, currentData);

        // 更新视图
        updateTableView();
        updateChartView();
        updateCloudView();
      };

      function updateStats(total, data) {
        document.getElementById("totalChars").textContent = total;
        document.getElementById("uniqueItems").textContent = data.length;
        document.getElementById("topItem").textContent =
          data.length > 0
            ? data[0].item.length > 5
              ? data[0].item.slice(0, 5) + "..."
              : data[0].item
            : "-";

        // 计算信息熵
        let entropy = 0;
        data.forEach((d) => {
          const p = d.count / total;
          if (p > 0) entropy -= p * Math.log2(p);
        });
        document.getElementById("entropy").textContent = entropy.toFixed(3);
      }

      function updateTableView() {
        const tbody = document.getElementById("freqTableBody");
        const maxCount = currentData.length > 0 ? currentData[0].count : 1;

        tbody.textContent = "";
        currentData.slice(0, 100).forEach((d, i) => {
          const tr = document.createElement("tr");

          const rankTd = document.createElement("td");
          rankTd.textContent = i + 1;
          tr.appendChild(rankTd);

          const itemTd = document.createElement("td");
          const itemSpan = document.createElement("span");
          itemSpan.className = "char-display";
          itemSpan.textContent = d.item === " " ? "␣" : d.item === "\n" ? "↵" : d.item;
          itemTd.appendChild(itemSpan);
          tr.appendChild(itemTd);

          const countTd = document.createElement("td");
          countTd.textContent = d.count;
          tr.appendChild(countTd);

          const percentTd = document.createElement("td");
          percentTd.textContent = d.percent + "%";
          tr.appendChild(percentTd);

          const barTd = document.createElement("td");
          const barContainer = document.createElement("div");
          barContainer.className = "freq-bar-container";
          const bar = document.createElement("div");
          bar.className = "freq-bar";
          bar.style.width = (d.count / maxCount) * 100 + "%";
          barContainer.appendChild(bar);
          barTd.appendChild(barContainer);
          tr.appendChild(barTd);

          tbody.appendChild(tr);
        });
      }

      function updateChartView() {
        const canvas = document.getElementById("freqChart");
        const ctx = canvas.getContext("2d");
        const data = currentData.slice(0, 20);

        // 清空画布
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = 300;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (data.length === 0) return;

        const padding = { top: 20, right: 20, bottom: 60, left: 50 };
        const chartWidth = canvas.width - padding.left - padding.right;
        const chartHeight = canvas.height - padding.top - padding.bottom;
        const barWidth = (chartWidth / data.length) * 0.8;
        const barGap = (chartWidth / data.length) * 0.2;
        const maxCount = data[0].count;

        // 绘制背景色适配主题
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        ctx.fillStyle = isDark ? "#1a1a2e" : "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 绘制柱状图
        data.forEach((d, i) => {
          const x = padding.left + i * (barWidth + barGap);
          const barHeight = (d.count / maxCount) * chartHeight;
          const y = padding.top + chartHeight - barHeight;

          // 渐变色
          const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
          gradient.addColorStop(0, "#667eea");
          gradient.addColorStop(1, "#764ba2");

          ctx.fillStyle = gradient;
          ctx.fillRect(x, y, barWidth, barHeight);

          // 标签
          ctx.fillStyle = isDark ? "#e0e0e0" : "#333333";
          ctx.font = "12px sans-serif";
          ctx.textAlign = "center";

          // X轴标签
          ctx.save();
          ctx.translate(x + barWidth / 2, canvas.height - padding.bottom + 15);
          ctx.rotate(-Math.PI / 4);
          const label =
            d.item === " " ? "␣" : d.item.length > 8 ? d.item.slice(0, 8) + ".." : d.item;
          ctx.fillText(label, 0, 0);
          ctx.restore();

          // 数值
          ctx.fillText(d.count, x + barWidth / 2, y - 5);
        });

        // Y轴
        ctx.strokeStyle = isDark ? "#444" : "#ddd";
        ctx.beginPath();
        ctx.moveTo(padding.left, padding.top);
        ctx.lineTo(padding.left, padding.top + chartHeight);
        ctx.stroke();
      }

      function updateCloudView() {
        const cloud = document.getElementById("wordCloud");
        cloud.textContent = "";

        const data = currentData.slice(0, 50);
        if (data.length === 0) return;

        const maxCount = data[0].count;
        const minSize = 14;
        const maxSize = 48;

        data.forEach((d) => {
          const span = document.createElement("span");
          const size = minSize + (d.count / maxCount) * (maxSize - minSize);
          span.style.fontSize = size + "px";
          span.style.opacity = 0.5 + (d.count / maxCount) * 0.5;
          span.textContent = d.item === " " ? "␣" : d.item;
          span.title = d.item + ": " + d.count + " (" + d.percent + "%)";
          cloud.appendChild(span);
        });
      }

      window.showView = function (view) {
        document.querySelectorAll(".tabs button").forEach((btn) => btn.classList.remove("active"));
        document.querySelector('.tabs button[onclick*="' + view + '"]').classList.add("active");

        document.getElementById("tableView").classList.toggle("hidden", view !== "table");
        document.getElementById("chartView").classList.toggle("hidden", view !== "chart");
        document.getElementById("cloudView").classList.toggle("hidden", view !== "cloud");

        if (view === "chart") updateChartView();
      };

      window.exportCSV = function () {
        if (currentData.length === 0) {
          alert("请先进行分析");
          return;
        }

        const headers = ["排名", "内容", "频次", "占比(%)"];
        const rows = currentData.map((d, i) => [
          i + 1,
          '"' + d.item.replace(/"/g, '""') + '"',
          d.count,
          d.percent
        ]);
        const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

        const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "frequency_analysis.csv";
        a.click();
        URL.revokeObjectURL(url);
      };

      // 模式切换时显示/隐藏 N-gram 大小设置
      document.getElementById("modeSelect").addEventListener("change", function () {
        document.getElementById("ngramSizeLabel").style.display =
          this.value === "ngram" ? "flex" : "none";
      });

      // 主题切换
      const themeToggle = document.getElementById("themeToggle");
      const html = document.documentElement;
      const savedTheme = localStorage.getItem("theme") || "light";
      html.setAttribute("data-theme", savedTheme);

      themeToggle.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        if (!document.getElementById("chartView").classList.contains("hidden")) {
          updateChartView();
        }
      });

      // 窗口大小变化时重绘图表
      window.addEventListener("resize", () => {
        if (!document.getElementById("chartView").classList.contains("hidden")) {
          updateChartView();
        }
      });

      // 初始化
      document.getElementById("ngramSizeLabel").style.display = "none";
      analyze();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
