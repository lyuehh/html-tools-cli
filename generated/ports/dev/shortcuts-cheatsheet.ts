// @ts-nocheck
// Generated from tools/dev/shortcuts-cheatsheet.html
// Source SHA-256: 4d0b9b6dc96066cf845eede10b8e4164adc43843430f9b8e5b20081c2ba8572e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentOS = "mac";
      let currentEditor = "vscode";
      let searchQuery = "";

      const shortcuts = {
        vscode: {
          name: "VS Code",
          categories: {
            基础编辑: [
              { desc: "剪切行", mac: ["Cmd", "X"], win: ["Ctrl", "X"] },
              { desc: "复制行", mac: ["Cmd", "C"], win: ["Ctrl", "C"] },
              { desc: "向下移动行", mac: ["Option", "↓"], win: ["Alt", "↓"] },
              { desc: "向上移动行", mac: ["Option", "↑"], win: ["Alt", "↑"] },
              { desc: "向下复制行", mac: ["Shift", "Option", "↓"], win: ["Shift", "Alt", "↓"] },
              { desc: "删除行", mac: ["Cmd", "Shift", "K"], win: ["Ctrl", "Shift", "K"] },
              { desc: "在下方插入行", mac: ["Cmd", "Enter"], win: ["Ctrl", "Enter"] },
              {
                desc: "在上方插入行",
                mac: ["Cmd", "Shift", "Enter"],
                win: ["Ctrl", "Shift", "Enter"]
              },
              { desc: "跳转到匹配括号", mac: ["Cmd", "Shift", "\\"], win: ["Ctrl", "Shift", "\\"] },
              { desc: "增加缩进", mac: ["Cmd", "]"], win: ["Ctrl", "]"] },
              { desc: "减少缩进", mac: ["Cmd", "["], win: ["Ctrl", "["] },
              { desc: "行注释", mac: ["Cmd", "/"], win: ["Ctrl", "/"] },
              { desc: "块注释", mac: ["Shift", "Option", "A"], win: ["Shift", "Alt", "A"] }
            ],
            多光标与选择: [
              { desc: "插入光标", mac: ["Option", "点击"], win: ["Alt", "点击"] },
              { desc: "在上方插入光标", mac: ["Option", "Cmd", "↑"], win: ["Ctrl", "Alt", "↑"] },
              { desc: "在下方插入光标", mac: ["Option", "Cmd", "↓"], win: ["Ctrl", "Alt", "↓"] },
              { desc: "撤销光标", mac: ["Cmd", "U"], win: ["Ctrl", "U"] },
              { desc: "选中所有匹配项", mac: ["Cmd", "Shift", "L"], win: ["Ctrl", "Shift", "L"] },
              { desc: "选中当前单词", mac: ["Cmd", "D"], win: ["Ctrl", "D"] },
              { desc: "选中当前行", mac: ["Cmd", "L"], win: ["Ctrl", "L"] },
              { desc: "列选择", mac: ["Shift", "Option", "拖动"], win: ["Shift", "Alt", "拖动"] }
            ],
            搜索与替换: [
              { desc: "查找", mac: ["Cmd", "F"], win: ["Ctrl", "F"] },
              { desc: "替换", mac: ["Cmd", "H"], win: ["Ctrl", "H"] },
              { desc: "查找下一个", mac: ["Cmd", "G"], win: ["F3"] },
              { desc: "查找上一个", mac: ["Cmd", "Shift", "G"], win: ["Shift", "F3"] },
              { desc: "全局搜索", mac: ["Cmd", "Shift", "F"], win: ["Ctrl", "Shift", "F"] },
              { desc: "全局替换", mac: ["Cmd", "Shift", "H"], win: ["Ctrl", "Shift", "H"] }
            ],
            导航: [
              { desc: "快速打开文件", mac: ["Cmd", "P"], win: ["Ctrl", "P"] },
              { desc: "跳转到行", mac: ["Ctrl", "G"], win: ["Ctrl", "G"] },
              { desc: "跳转到符号", mac: ["Cmd", "Shift", "O"], win: ["Ctrl", "Shift", "O"] },
              { desc: "命令面板", mac: ["Cmd", "Shift", "P"], win: ["Ctrl", "Shift", "P"] },
              { desc: "切换标签页", mac: ["Cmd", "Option", "←/→"], win: ["Ctrl", "PageUp/Down"] },
              { desc: "返回", mac: ["Ctrl", "-"], win: ["Alt", "←"] },
              { desc: "前进", mac: ["Ctrl", "Shift", "-"], win: ["Alt", "→"] },
              { desc: "跳转到定义", mac: ["F12"], win: ["F12"] },
              { desc: "查看定义", mac: ["Option", "F12"], win: ["Alt", "F12"] }
            ],
            窗口管理: [
              { desc: "新建窗口", mac: ["Cmd", "Shift", "N"], win: ["Ctrl", "Shift", "N"] },
              { desc: "关闭窗口", mac: ["Cmd", "W"], win: ["Ctrl", "W"] },
              { desc: "切换侧边栏", mac: ["Cmd", "B"], win: ["Ctrl", "B"] },
              { desc: "切换终端", mac: ["Ctrl", "`"], win: ["Ctrl", "`"] },
              { desc: "分割编辑器", mac: ["Cmd", "\\"], win: ["Ctrl", "\\"] },
              { desc: "切换全屏", mac: ["Ctrl", "Cmd", "F"], win: ["F11"] },
              { desc: "放大", mac: ["Cmd", "+"], win: ["Ctrl", "+"] },
              { desc: "缩小", mac: ["Cmd", "-"], win: ["Ctrl", "-"] }
            ],
            调试: [
              { desc: "开始/继续调试", mac: ["F5"], win: ["F5"] },
              { desc: "停止调试", mac: ["Shift", "F5"], win: ["Shift", "F5"] },
              { desc: "单步跳过", mac: ["F10"], win: ["F10"] },
              { desc: "单步进入", mac: ["F11"], win: ["F11"] },
              { desc: "单步跳出", mac: ["Shift", "F11"], win: ["Shift", "F11"] },
              { desc: "切换断点", mac: ["F9"], win: ["F9"] }
            ]
          }
        },
        jetbrains: {
          name: "JetBrains IDE",
          categories: {
            基础编辑: [
              { desc: "复制行", mac: ["Cmd", "D"], win: ["Ctrl", "D"] },
              { desc: "删除行", mac: ["Cmd", "Backspace"], win: ["Ctrl", "Y"] },
              { desc: "移动行", mac: ["Shift", "Option", "↑/↓"], win: ["Shift", "Alt", "↑/↓"] },
              { desc: "行注释", mac: ["Cmd", "/"], win: ["Ctrl", "/"] },
              { desc: "块注释", mac: ["Cmd", "Shift", "/"], win: ["Ctrl", "Shift", "/"] },
              { desc: "格式化代码", mac: ["Cmd", "Option", "L"], win: ["Ctrl", "Alt", "L"] },
              { desc: "优化导入", mac: ["Ctrl", "Option", "O"], win: ["Ctrl", "Alt", "O"] },
              { desc: "扩展选择", mac: ["Option", "↑"], win: ["Ctrl", "W"] },
              { desc: "收缩选择", mac: ["Option", "↓"], win: ["Ctrl", "Shift", "W"] }
            ],
            搜索与导航: [
              { desc: "全局搜索", mac: ["Shift", "Shift"], win: ["Shift", "Shift"] },
              { desc: "查找文件", mac: ["Cmd", "Shift", "O"], win: ["Ctrl", "Shift", "N"] },
              { desc: "查找类", mac: ["Cmd", "O"], win: ["Ctrl", "N"] },
              { desc: "查找符号", mac: ["Cmd", "Option", "O"], win: ["Ctrl", "Alt", "Shift", "N"] },
              { desc: "查找操作", mac: ["Cmd", "Shift", "A"], win: ["Ctrl", "Shift", "A"] },
              { desc: "跳转到定义", mac: ["Cmd", "B"], win: ["Ctrl", "B"] },
              { desc: "查找用法", mac: ["Option", "F7"], win: ["Alt", "F7"] },
              { desc: "跳转到行", mac: ["Cmd", "L"], win: ["Ctrl", "G"] },
              { desc: "最近文件", mac: ["Cmd", "E"], win: ["Ctrl", "E"] }
            ],
            重构: [
              { desc: "重命名", mac: ["Shift", "F6"], win: ["Shift", "F6"] },
              { desc: "提取变量", mac: ["Cmd", "Option", "V"], win: ["Ctrl", "Alt", "V"] },
              { desc: "提取方法", mac: ["Cmd", "Option", "M"], win: ["Ctrl", "Alt", "M"] },
              { desc: "提取常量", mac: ["Cmd", "Option", "C"], win: ["Ctrl", "Alt", "C"] },
              { desc: "内联", mac: ["Cmd", "Option", "N"], win: ["Ctrl", "Alt", "N"] },
              { desc: "移动", mac: ["F6"], win: ["F6"] },
              { desc: "安全删除", mac: ["Cmd", "Delete"], win: ["Alt", "Delete"] }
            ],
            代码生成: [
              { desc: "生成代码", mac: ["Cmd", "N"], win: ["Alt", "Insert"] },
              { desc: "覆盖方法", mac: ["Ctrl", "O"], win: ["Ctrl", "O"] },
              { desc: "实现方法", mac: ["Ctrl", "I"], win: ["Ctrl", "I"] },
              { desc: "环绕代码", mac: ["Cmd", "Option", "T"], win: ["Ctrl", "Alt", "T"] },
              { desc: "代码补全", mac: ["Ctrl", "Space"], win: ["Ctrl", "Space"] },
              { desc: "智能补全", mac: ["Ctrl", "Shift", "Space"], win: ["Ctrl", "Shift", "Space"] }
            ],
            运行与调试: [
              { desc: "运行", mac: ["Ctrl", "R"], win: ["Shift", "F10"] },
              { desc: "调试", mac: ["Ctrl", "D"], win: ["Shift", "F9"] },
              { desc: "停止", mac: ["Cmd", "F2"], win: ["Ctrl", "F2"] },
              { desc: "单步跳过", mac: ["F8"], win: ["F8"] },
              { desc: "单步进入", mac: ["F7"], win: ["F7"] },
              { desc: "单步跳出", mac: ["Shift", "F8"], win: ["Shift", "F8"] },
              { desc: "切换断点", mac: ["Cmd", "F8"], win: ["Ctrl", "F8"] }
            ]
          }
        },
        vim: {
          name: "Vim",
          categories: {
            模式切换: [
              { desc: "进入插入模式", mac: ["i"], win: ["i"] },
              { desc: "行首插入", mac: ["I"], win: ["I"] },
              { desc: "行尾追加", mac: ["A"], win: ["A"] },
              { desc: "下方新行", mac: ["o"], win: ["o"] },
              { desc: "上方新行", mac: ["O"], win: ["O"] },
              { desc: "退出插入模式", mac: ["Esc"], win: ["Esc"] },
              { desc: "可视模式", mac: ["v"], win: ["v"] },
              { desc: "可视行模式", mac: ["V"], win: ["V"] },
              { desc: "可视块模式", mac: ["Ctrl", "v"], win: ["Ctrl", "v"] }
            ],
            移动: [
              { desc: "左/下/上/右", mac: ["h/j/k/l"], win: ["h/j/k/l"] },
              { desc: "单词前进", mac: ["w"], win: ["w"] },
              { desc: "单词后退", mac: ["b"], win: ["b"] },
              { desc: "行首", mac: ["0"], win: ["0"] },
              { desc: "行首非空", mac: ["^"], win: ["^"] },
              { desc: "行尾", mac: ["$"], win: ["$"] },
              { desc: "文件开头", mac: ["gg"], win: ["gg"] },
              { desc: "文件结尾", mac: ["G"], win: ["G"] },
              { desc: "跳转到行", mac: ["数字", "G"], win: ["数字", "G"] },
              { desc: "下一页", mac: ["Ctrl", "f"], win: ["Ctrl", "f"] },
              { desc: "上一页", mac: ["Ctrl", "b"], win: ["Ctrl", "b"] }
            ],
            编辑: [
              { desc: "删除字符", mac: ["x"], win: ["x"] },
              { desc: "删除行", mac: ["dd"], win: ["dd"] },
              { desc: "删除单词", mac: ["dw"], win: ["dw"] },
              { desc: "删除到行尾", mac: ["D"], win: ["D"] },
              { desc: "复制行", mac: ["yy"], win: ["yy"] },
              { desc: "复制单词", mac: ["yw"], win: ["yw"] },
              { desc: "粘贴", mac: ["p"], win: ["p"] },
              { desc: "撤销", mac: ["u"], win: ["u"] },
              { desc: "重做", mac: ["Ctrl", "r"], win: ["Ctrl", "r"] },
              { desc: "替换字符", mac: ["r"], win: ["r"] },
              { desc: "改变单词", mac: ["cw"], win: ["cw"] }
            ],
            搜索: [
              { desc: "向下搜索", mac: ["/"], win: ["/"] },
              { desc: "向上搜索", mac: ["?"], win: ["?"] },
              { desc: "下一个", mac: ["n"], win: ["n"] },
              { desc: "上一个", mac: ["N"], win: ["N"] },
              { desc: "搜索当前词", mac: ["*"], win: ["*"] },
              { desc: "替换", mac: [":%s/old/new/g"], win: [":%s/old/new/g"] }
            ],
            文件操作: [
              { desc: "保存", mac: [":w"], win: [":w"] },
              { desc: "退出", mac: [":q"], win: [":q"] },
              { desc: "保存退出", mac: [":wq"], win: [":wq"] },
              { desc: "强制退出", mac: [":q!"], win: [":q!"] },
              { desc: "打开文件", mac: [":e 文件名"], win: [":e 文件名"] },
              { desc: "分割窗口", mac: [":sp"], win: [":sp"] },
              { desc: "垂直分割", mac: [":vsp"], win: [":vsp"] }
            ]
          }
        },
        sublime: {
          name: "Sublime Text",
          categories: {
            基础编辑: [
              { desc: "复制行", mac: ["Cmd", "Shift", "D"], win: ["Ctrl", "Shift", "D"] },
              { desc: "删除行", mac: ["Ctrl", "Shift", "K"], win: ["Ctrl", "Shift", "K"] },
              { desc: "移动行上/下", mac: ["Cmd", "Ctrl", "↑/↓"], win: ["Ctrl", "Shift", "↑/↓"] },
              { desc: "选中当前行", mac: ["Cmd", "L"], win: ["Ctrl", "L"] },
              { desc: "行注释", mac: ["Cmd", "/"], win: ["Ctrl", "/"] },
              { desc: "块注释", mac: ["Cmd", "Option", "/"], win: ["Ctrl", "Shift", "/"] },
              { desc: "合并行", mac: ["Cmd", "J"], win: ["Ctrl", "J"] },
              { desc: "大写", mac: ["Cmd", "K", "U"], win: ["Ctrl", "K", "U"] },
              { desc: "小写", mac: ["Cmd", "K", "L"], win: ["Ctrl", "K", "L"] }
            ],
            多光标: [
              { desc: "添加光标", mac: ["Cmd", "点击"], win: ["Ctrl", "点击"] },
              { desc: "选中下一个相同", mac: ["Cmd", "D"], win: ["Ctrl", "D"] },
              { desc: "选中所有相同", mac: ["Cmd", "Ctrl", "G"], win: ["Alt", "F3"] },
              { desc: "列选择", mac: ["Ctrl", "Shift", "↑/↓"], win: ["Ctrl", "Alt", "↑/↓"] },
              { desc: "分割选区为行", mac: ["Cmd", "Shift", "L"], win: ["Ctrl", "Shift", "L"] }
            ],
            导航: [
              { desc: "快速打开", mac: ["Cmd", "P"], win: ["Ctrl", "P"] },
              { desc: "跳转到符号", mac: ["Cmd", "R"], win: ["Ctrl", "R"] },
              { desc: "跳转到行", mac: ["Ctrl", "G"], win: ["Ctrl", "G"] },
              { desc: "命令面板", mac: ["Cmd", "Shift", "P"], win: ["Ctrl", "Shift", "P"] },
              { desc: "跳转到定义", mac: ["Cmd", "Option", "↓"], win: ["F12"] },
              { desc: "切换标签", mac: ["Cmd", "Option", "←/→"], win: ["Ctrl", "PageUp/Down"] }
            ],
            查找替换: [
              { desc: "查找", mac: ["Cmd", "F"], win: ["Ctrl", "F"] },
              { desc: "替换", mac: ["Cmd", "Option", "F"], win: ["Ctrl", "H"] },
              { desc: "在文件中查找", mac: ["Cmd", "Shift", "F"], win: ["Ctrl", "Shift", "F"] },
              { desc: "查找下一个", mac: ["Cmd", "G"], win: ["F3"] },
              { desc: "使用选区查找", mac: ["Cmd", "E"], win: ["Ctrl", "E"] }
            ]
          }
        }
      };

      function init() {
        renderTabs();
        renderShortcuts();

        const savedTheme = localStorage.getItem("shortcuts-theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        }

        const savedOS = localStorage.getItem("shortcuts-os");
        if (savedOS) {
          setOS(savedOS);
        } else {
          const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
          setOS(isMac ? "mac" : "win");
        }
      }

      function renderTabs() {
        const tabsContainer = document.getElementById("tabs");
        while (tabsContainer.firstChild) {
          tabsContainer.removeChild(tabsContainer.firstChild);
        }

        Object.keys(shortcuts).forEach(function (key) {
          const tab = document.createElement("button");
          tab.className = "tab" + (key === currentEditor ? " active" : "");
          tab.textContent = shortcuts[key].name;
          tab.onclick = function () {
            selectEditor(key);
          };
          tabsContainer.appendChild(tab);
        });
      }

      function selectEditor(editor) {
        currentEditor = editor;
        renderTabs();
        renderShortcuts();
      }

      function setOS(os) {
        currentOS = os;
        document.querySelectorAll(".os-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.os === os);
        });
        localStorage.setItem("shortcuts-os", os);
        renderShortcuts();
      }

      function highlightText(text, query) {
        if (!query) return [{ text: text, highlight: false }];

        const parts = [];
        const lowerText = text.toLowerCase();
        const lowerQuery = query.toLowerCase();
        let lastIndex = 0;
        let index = lowerText.indexOf(lowerQuery);

        while (index !== -1) {
          if (index > lastIndex) {
            parts.push({ text: text.slice(lastIndex, index), highlight: false });
          }
          parts.push({ text: text.slice(index, index + query.length), highlight: true });
          lastIndex = index + query.length;
          index = lowerText.indexOf(lowerQuery, lastIndex);
        }

        if (lastIndex < text.length) {
          parts.push({ text: text.slice(lastIndex), highlight: false });
        }

        return parts;
      }

      function renderShortcuts() {
        const grid = document.getElementById("shortcutGrid");
        const noResults = document.getElementById("noResults");

        while (grid.firstChild) {
          grid.removeChild(grid.firstChild);
        }

        const editorData = shortcuts[currentEditor];
        let hasResults = false;

        Object.keys(editorData.categories).forEach(function (categoryName) {
          const items = editorData.categories[categoryName].filter(function (item) {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return (
              item.desc.toLowerCase().includes(query) ||
              item[currentOS].join(" ").toLowerCase().includes(query)
            );
          });

          if (items.length === 0) return;
          hasResults = true;

          const category = document.createElement("div");
          category.className = "shortcut-category";

          const title = document.createElement("h3");
          title.textContent = categoryName;
          category.appendChild(title);

          items.forEach(function (item) {
            const itemEl = document.createElement("div");
            itemEl.className = "shortcut-item";

            const desc = document.createElement("span");
            desc.className = "shortcut-desc";

            const parts = highlightText(item.desc, searchQuery);
            parts.forEach(function (part) {
              if (part.highlight) {
                const span = document.createElement("span");
                span.className = "highlight";
                span.textContent = part.text;
                desc.appendChild(span);
              } else {
                desc.appendChild(document.createTextNode(part.text));
              }
            });

            const keys = document.createElement("div");
            keys.className = "shortcut-keys";

            item[currentOS].forEach(function (key, index) {
              if (index > 0) {
                const sep = document.createElement("span");
                sep.className = "key-separator";
                sep.textContent = "+";
                keys.appendChild(sep);
              }
              const keyEl = document.createElement("span");
              keyEl.className = "key";
              keyEl.textContent = key;
              keys.appendChild(keyEl);
            });

            itemEl.appendChild(desc);
            itemEl.appendChild(keys);
            category.appendChild(itemEl);
          });

          grid.appendChild(category);
        });

        noResults.style.display = hasResults ? "none" : "block";
      }

      window.filterShortcuts = function () {
        searchQuery = document.getElementById("searchInput").value;
        renderShortcuts();
      };

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("shortcuts-theme", newTheme);
      };

      init();
    
