// @ts-nocheck
// Generated from tools/ai/ai-pricing.html
// Source SHA-256: 1aef7bb695786dc2b1879bd4d39471894ac7df9fc29d06743f5cd15cf6707ab2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // AI 模型价格数据 (USD per 1M tokens)
      const models = [
        // OpenAI
        {
          id: "gpt-4o",
          name: "GPT-4o",
          vendor: "OpenAI",
          badge: "openai",
          inputPrice: 2.5,
          outputPrice: 10,
          context: "128K",
          selected: true
        },
        {
          id: "gpt-4o-mini",
          name: "GPT-4o Mini",
          vendor: "OpenAI",
          badge: "openai",
          inputPrice: 0.15,
          outputPrice: 0.6,
          context: "128K",
          selected: true
        },
        {
          id: "gpt-4-turbo",
          name: "GPT-4 Turbo",
          vendor: "OpenAI",
          badge: "openai",
          inputPrice: 10,
          outputPrice: 30,
          context: "128K",
          selected: false
        },
        {
          id: "o1",
          name: "o1",
          vendor: "OpenAI",
          badge: "openai",
          inputPrice: 15,
          outputPrice: 60,
          context: "200K",
          selected: false
        },
        {
          id: "o1-mini",
          name: "o1-mini",
          vendor: "OpenAI",
          badge: "openai",
          inputPrice: 3,
          outputPrice: 12,
          context: "128K",
          selected: false
        },
        {
          id: "o3-mini",
          name: "o3-mini",
          vendor: "OpenAI",
          badge: "openai",
          inputPrice: 1.1,
          outputPrice: 4.4,
          context: "200K",
          selected: true
        },

        // Anthropic
        {
          id: "claude-opus-4",
          name: "Claude Opus 4",
          vendor: "Anthropic",
          badge: "anthropic",
          inputPrice: 15,
          outputPrice: 75,
          context: "200K",
          selected: false
        },
        {
          id: "claude-sonnet-4",
          name: "Claude Sonnet 4",
          vendor: "Anthropic",
          badge: "anthropic",
          inputPrice: 3,
          outputPrice: 15,
          context: "200K",
          selected: true
        },
        {
          id: "claude-3.5-sonnet",
          name: "Claude 3.5 Sonnet",
          vendor: "Anthropic",
          badge: "anthropic",
          inputPrice: 3,
          outputPrice: 15,
          context: "200K",
          selected: false
        },
        {
          id: "claude-3.5-haiku",
          name: "Claude 3.5 Haiku",
          vendor: "Anthropic",
          badge: "anthropic",
          inputPrice: 0.8,
          outputPrice: 4,
          context: "200K",
          selected: true
        },

        // Google
        {
          id: "gemini-2.5-pro",
          name: "Gemini 2.5 Pro",
          vendor: "Google",
          badge: "google",
          inputPrice: 1.25,
          outputPrice: 10,
          context: "1M",
          selected: true
        },
        {
          id: "gemini-2.5-flash",
          name: "Gemini 2.5 Flash",
          vendor: "Google",
          badge: "google",
          inputPrice: 0.15,
          outputPrice: 0.6,
          context: "1M",
          selected: true
        },
        {
          id: "gemini-2.0-flash",
          name: "Gemini 2.0 Flash",
          vendor: "Google",
          badge: "google",
          inputPrice: 0.1,
          outputPrice: 0.4,
          context: "1M",
          selected: false
        },

        // DeepSeek
        {
          id: "deepseek-v3",
          name: "DeepSeek V3",
          vendor: "DeepSeek",
          badge: "deepseek",
          inputPrice: 0.27,
          outputPrice: 1.1,
          context: "64K",
          selected: true
        },
        {
          id: "deepseek-r1",
          name: "DeepSeek R1",
          vendor: "DeepSeek",
          badge: "deepseek",
          inputPrice: 0.55,
          outputPrice: 2.19,
          context: "64K",
          selected: true
        },

        // Meta (via API providers)
        {
          id: "llama-3.3-70b",
          name: "Llama 3.3 70B",
          vendor: "Meta",
          badge: "meta",
          inputPrice: 0.8,
          outputPrice: 0.8,
          context: "128K",
          selected: false
        },
        {
          id: "llama-3.1-405b",
          name: "Llama 3.1 405B",
          vendor: "Meta",
          badge: "meta",
          inputPrice: 3,
          outputPrice: 3,
          context: "128K",
          selected: false
        }
      ];

      // 初始化
      function init() {
        renderModelGrid();
        calculate();
        loadTheme();
      }

      // 渲染模型选择网格
      function renderModelGrid() {
        const grid = document.getElementById("modelGrid");
        grid.innerHTML = models
          .map(
            (model, idx) => `
        <label class="model-item ${model.selected ? "selected" : ""}" data-idx="${idx}">
          <input type="checkbox" ${model.selected ? "checked" : ""} onchange="toggleModel(${idx})">
          <div class="model-info">
            <div class="model-name">${model.name}</div>
            <div class="model-vendor">${model.vendor} · ${model.context}</div>
          </div>
          <span class="model-badge badge-${model.badge}">${model.vendor.slice(0, 2)}</span>
        </label>
      `
          )
          .join("");
      }

      // 切换模型选择
      window.toggleModel = function (idx) {
        models[idx].selected = !models[idx].selected;
        const item = document.querySelector(`.model-item[data-idx="${idx}"]`);
        item.classList.toggle("selected", models[idx].selected);
        calculate();
      };

      // 计算成本
      window.calculate = function () {
        const inputTokens = parseInt(document.getElementById("inputTokens").value) || 0;
        const outputTokens = parseInt(document.getElementById("outputTokens").value) || 0;
        const dailyRequests = parseInt(document.getElementById("dailyRequests").value) || 0;
        const period = parseInt(document.getElementById("period").value) || 30;

        const selectedModels = models.filter((m) => m.selected);
        const results = selectedModels.map((model) => {
          const inputCost = (inputTokens / 1000000) * model.inputPrice;
          const outputCost = (outputTokens / 1000000) * model.outputPrice;
          const perRequestCost = inputCost + outputCost;
          const totalCost = perRequestCost * dailyRequests * period;
          return {
            ...model,
            inputCost,
            outputCost,
            perRequestCost,
            totalCost
          };
        });

        // 按总成本排序
        results.sort((a, b) => a.totalCost - b.totalCost);

        // 找出最低价
        const minCost = results.length > 0 ? results[0].totalCost : 0;

        // 渲染结果表格
        const tbody = document.getElementById("resultsBody");
        tbody.innerHTML = results
          .map(
            (r, _idx) => `
        <tr>
          <td>
            <div class="model-col">
              <span class="vendor-icon badge-${r.badge}">${r.vendor.slice(0, 2).toUpperCase()}</span>
              <span>${r.name}</span>
            </div>
          </td>
          <td class="price-cell">$${r.inputPrice}/M</td>
          <td class="price-cell">$${r.outputPrice}/M</td>
          <td class="price-cell">$${r.perRequestCost.toFixed(6)}</td>
          <td class="price-cell ${r.totalCost === minCost && results.length > 1 ? "best-price" : ""}">
            $${r.totalCost.toFixed(2)}
            ${r.totalCost === minCost && results.length > 1 ? " ✓" : ""}
          </td>
        </tr>
      `
          )
          .join("");

        // 渲染统计信息
        const totalRequests = dailyRequests * period;
        const totalInputTokens = inputTokens * totalRequests;
        const totalOutputTokens = outputTokens * totalRequests;
        const periodLabel = { 1: "天", 7: "周", 30: "月", 365: "年" }[period];

        const statsGrid = document.getElementById("statsGrid");
        statsGrid.innerHTML = `
        <div class="stat-item">
          <div class="stat-value">${formatNumber(totalRequests)}</div>
          <div class="stat-label">总请求数 / ${periodLabel}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${formatTokens(totalInputTokens)}</div>
          <div class="stat-label">总输入 Tokens</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${formatTokens(totalOutputTokens)}</div>
          <div class="stat-label">总输出 Tokens</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" style="color: var(--accent-green)">$${minCost.toFixed(2)}</div>
          <div class="stat-label">最低成本</div>
        </div>
      `;
      };

      // 格式化数字
      function formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num.toString();
      }

      function formatTokens(num) {
        if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num.toString();
      }

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const isDark = html.getAttribute("data-theme") !== "light";
        html.setAttribute("data-theme", isDark ? "light" : "dark");
        document.querySelector(".theme-toggle").textContent = isDark ? "☀️" : "🌙";
        localStorage.setItem("theme", isDark ? "light" : "dark");
      };

      function loadTheme() {
        const saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.documentElement.setAttribute("data-theme", "light");
          document.querySelector(".theme-toggle").textContent = "☀️";
        }
      }

      // 启动
      init();
    
