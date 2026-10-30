// @ts-nocheck
// Generated from tools/dev/js-playground.html
// Source SHA-256: fdc2cebf1618df05cf2b9b41c55c4c92416a870c0c4c75e65ab02716eb4bdbba
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const examples = {
        hello: `// Hello World 示例
console.log('Hello, World! 🌍');
console.log('当前时间:', new Date().toLocaleString());

// 不同类型的日志
console.log('普通日志');
console.warn('警告信息');
console.error('错误信息');
console.info('提示信息');

// 返回值
'JavaScript is awesome! 🚀'`,

        array: `// 数组操作示例
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map - 映射
const doubled = numbers.map(n => n * 2);
console.log('翻倍:', doubled);

// filter - 过滤
const evens = numbers.filter(n => n % 2 === 0);
console.log('偶数:', evens);

// reduce - 归约
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('求和:', sum);

// find - 查找
const found = numbers.find(n => n > 5);
console.log('第一个大于5的数:', found);

// some & every
console.log('是否有大于5的:', numbers.some(n => n > 5));
console.log('是否全部大于0:', numbers.every(n => n > 0));

// 链式调用
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n ** 2)
  .reduce((acc, n) => acc + n, 0);
console.log('偶数的平方和:', result);`,

        async: `// 异步编程示例
console.log('1. 开始执行');

// Promise
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// async/await
async function demo() {
  console.log('2. 进入异步函数');
  
  await delay(100);
  console.log('3. 100ms 后');
  
  await delay(100);
  console.log('4. 又 100ms 后');
  
  return '异步执行完成! ✨';
}

// Promise.all
async function parallel() {
  const start = Date.now();
  await Promise.all([
    delay(100),
    delay(100),
    delay(100)
  ]);
  console.log(\`并行执行耗时: \${Date.now() - start}ms\`);
}

demo().then(result => console.log('5.', result));
parallel();

console.log('注意: 这条会先输出，因为上面是异步的');`,

        fetch: `// Fetch API 示例 (使用公开 API)
console.log('开始请求数据...');

// 请求随机用户数据
fetch('https://randomuser.me/api/')
  .then(response => response.json())
  .then(data => {
    const user = data.results[0];
    console.log('获取到用户数据:');
    console.log('姓名:', user.name.first, user.name.last);
    console.log('邮箱:', user.email);
    console.log('国家:', user.location.country);
  })
  .catch(err => console.error('请求失败:', err));

// 使用 async/await
async function fetchJoke() {
  try {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    const joke = await res.json();
    console.log('\\n随机笑话:');
    console.log('Q:', joke.setup);
    console.log('A:', joke.punchline);
  } catch (err) {
    console.error('获取笑话失败');
  }
}

fetchJoke();`,

        class: `// ES6 Class 示例
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(\`\${this.name} 发出声音\`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    console.log(\`\${this.name} 汪汪叫! 🐕\`);
  }
  
  fetch() {
    console.log(\`\${this.name} 去捡球了!\`);
  }
  
  // Getter
  get info() {
    return \`\${this.name} 是一只 \${this.breed}\`;
  }
  
  // 静态方法
  static species() {
    return 'Canis familiaris';
  }
}

const dog = new Dog('旺财', '金毛');
dog.speak();
dog.fetch();
console.log(dog.info);
console.log('物种:', Dog.species());

// instanceof
console.log('dog instanceof Dog:', dog instanceof Dog);
console.log('dog instanceof Animal:', dog instanceof Animal);`,

        destructure: `// 解构赋值示例

// 数组解构
const [a, b, ...rest] = [1, 2, 3, 4, 5];
console.log('数组解构:', a, b, rest);

// 对象解构
const user = {
  name: '张三',
  age: 25,
  city: '北京',
  job: {
    title: '工程师',
    company: 'Tech Corp'
  }
};

const { name, age, city } = user;
console.log('对象解构:', name, age, city);

// 嵌套解构
const { job: { title, company } } = user;
console.log('嵌套解构:', title, company);

// 默认值
const { country = '中国' } = user;
console.log('默认值:', country);

// 重命名
const { name: userName, age: userAge } = user;
console.log('重命名:', userName, userAge);

// 函数参数解构
function greet({ name, age }) {
  console.log(\`你好，\${name}，你今年\${age}岁\`);
}
greet(user);

// 交换变量
let x = 1, y = 2;
[x, y] = [y, x];
console.log('交换后:', x, y);`
      };

      // Theme handling
      function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const newTheme = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Console override
      const consoleOutput = document.getElementById("consoleOutput");
      const originalConsole = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info
      };

      function addConsoleItem(type, args) {
        // Remove empty state
        const empty = consoleOutput.querySelector(".empty-console");
        if (empty) empty.remove();

        const item = document.createElement("div");
        item.className = `console-item ${type}`;

        const icons = {
          log: "●",
          warn: "⚠",
          error: "✖",
          info: "ℹ",
          result: "←"
        };

        const content = args
          .map((arg) => {
            if (arg === null) return "null";
            if (arg === undefined) return "undefined";
            if (typeof arg === "object") {
              try {
                return JSON.stringify(arg, null, 2);
              } catch {
                return String(arg);
              }
            }
            return String(arg);
          })
          .join(" ");

        item.innerHTML = `
                <span class="icon">${icons[type]}</span>
                <span class="content">${escapeHTML(content)}</span>
            `;

        consoleOutput.appendChild(item);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
      }

      function escapeHTML(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }

      function setupConsole() {
        console.log = (...args) => {
          originalConsole.log(...args);
          addConsoleItem("log", args);
        };
        console.warn = (...args) => {
          originalConsole.warn(...args);
          addConsoleItem("warn", args);
        };
        console.error = (...args) => {
          originalConsole.error(...args);
          addConsoleItem("error", args);
        };
        console.info = (...args) => {
          originalConsole.info(...args);
          addConsoleItem("info", args);
        };
      }

      function clearConsole() {
        consoleOutput.innerHTML = '<div class="empty-console">控制台已清空</div>';
      }

      // Run code
      function runCode() {
        clearConsole();
        const code = document.getElementById("codeEditor").value;

        try {
          // Use Function constructor for better isolation
          const result = new Function(code)();

          // Show return value if any
          if (result !== undefined) {
            setTimeout(() => {
              addConsoleItem("result", [result]);
            }, 0);
          }
        } catch (err) {
          console.error(err.toString());
        }
      }

      // Format code (basic)
      function formatCode() {
        const editor = document.getElementById("codeEditor");
        let code = editor.value;

        // Very basic formatting
        code = code.replace(/;(?!\n)/g, ";\n");
        code = code.replace(/\{(?!\n)/g, "{\n");
        code = code.replace(/(?<!\n)\}/g, "\n}");

        editor.value = code;
        updateStats();
      }

      // Load example
      window.loadExample = function (name) {
        document.getElementById("codeEditor").value = examples[name] || "";
        updateStats();
        clearConsole();
      };

      // Update stats
      function updateStats() {
        const code = document.getElementById("codeEditor").value;
        const lines = code.split("\n").length;
        const chars = code.length;
        document.getElementById("editorStats").textContent = `${lines} 行 | ${chars} 字符`;
      }

      // Tab handling
      document.getElementById("codeEditor").addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
          e.preventDefault();
          const start = this.selectionStart;
          const end = this.selectionEnd;
          this.value = this.value.substring(0, start) + "  " + this.value.substring(end);
          this.selectionStart = this.selectionEnd = start + 2;
        }

        // Ctrl+Enter to run
        if (e.key === "Enter" && e.ctrlKey) {
          e.preventDefault();
          runCode();
        }

        // Ctrl+S to format
        if (e.key === "s" && e.ctrlKey) {
          e.preventDefault();
          formatCode();
        }
      });

      document.getElementById("codeEditor").addEventListener("input", updateStats);

      // Initialize
      initTheme();
      setupConsole();
      loadExample("hello");
    
