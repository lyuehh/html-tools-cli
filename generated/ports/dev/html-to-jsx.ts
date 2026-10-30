// @ts-nocheck
// Generated from tools/dev/html-to-jsx.html
// Source SHA-256: 0dc3cfbe9fb261943b771bb80b6c6ea2086d920b3f6a67e347bdfdfa51298ef8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.querySelector(".theme-toggle").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      // 加载保存的主题
      function loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      // HTML 属性到 JSX 属性的映射
      const attributeMap = {
        class: "className",
        for: "htmlFor",
        tabindex: "tabIndex",
        readonly: "readOnly",
        maxlength: "maxLength",
        minlength: "minLength",
        colspan: "colSpan",
        rowspan: "rowSpan",
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        frameborder: "frameBorder",
        allowfullscreen: "allowFullScreen",
        autocomplete: "autoComplete",
        autofocus: "autoFocus",
        autoplay: "autoPlay",
        enctype: "encType",
        formaction: "formAction",
        formenctype: "formEncType",
        formmethod: "formMethod",
        formnovalidate: "formNoValidate",
        formtarget: "formTarget",
        hreflang: "hrefLang",
        inputmode: "inputMode",
        srcdoc: "srcDoc",
        srcset: "srcSet",
        usemap: "useMap",
        datetime: "dateTime",
        crossorigin: "crossOrigin",
        charset: "charSet",
        contenteditable: "contentEditable",
        contextmenu: "contextMenu",
        spellcheck: "spellCheck",
        accesskey: "accessKey",
        acceptcharset: "acceptCharset"
      };

      // 事件属性映射 (小写到驼峰)
      const eventMap = {
        onclick: "onClick",
        ondblclick: "onDoubleClick",
        onmousedown: "onMouseDown",
        onmouseup: "onMouseUp",
        onmouseover: "onMouseOver",
        onmouseout: "onMouseOut",
        onmousemove: "onMouseMove",
        onmouseenter: "onMouseEnter",
        onmouseleave: "onMouseLeave",
        onkeydown: "onKeyDown",
        onkeyup: "onKeyUp",
        onkeypress: "onKeyPress",
        onfocus: "onFocus",
        onblur: "onBlur",
        onchange: "onChange",
        oninput: "onInput",
        onsubmit: "onSubmit",
        onreset: "onReset",
        onscroll: "onScroll",
        onwheel: "onWheel",
        ondrag: "onDrag",
        ondragstart: "onDragStart",
        ondragend: "onDragEnd",
        ondragenter: "onDragEnter",
        ondragleave: "onDragLeave",
        ondragover: "onDragOver",
        ondrop: "onDrop",
        onload: "onLoad",
        onerror: "onError",
        ontouchstart: "onTouchStart",
        ontouchend: "onTouchEnd",
        ontouchmove: "onTouchMove",
        ontouchcancel: "onTouchCancel",
        onanimationstart: "onAnimationStart",
        onanimationend: "onAnimationEnd",
        onanimationiteration: "onAnimationIteration",
        ontransitionend: "onTransitionEnd",
        oncopy: "onCopy",
        oncut: "onCut",
        onpaste: "onPaste",
        onselect: "onSelect"
      };

      // 自闭合标签
      const selfClosingTags = [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
      ];

      // 转换内联样式为对象
      function convertStyleToObject(styleString) {
        if (!styleString) return null;

        const styles = {};
        const declarations = styleString.split(";").filter((s) => s.trim());

        declarations.forEach((declaration) => {
          const colonIndex = declaration.indexOf(":");
          if (colonIndex === -1) return;

          let property = declaration.substring(0, colonIndex).trim();
          let value = declaration.substring(colonIndex + 1).trim();

          // 转换为驼峰命名
          property = property.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());

          // 处理数值
          if (/^\d+px$/.test(value)) {
            value = parseInt(value);
          } else if (/^\d+$/.test(value)) {
            value = parseInt(value);
          } else {
            value = `"${value}"`;
          }

          styles[property] = value;
        });

        const styleEntries = Object.entries(styles)
          .map(([key, val]) => `${key}: ${val}`)
          .join(", ");

        return `{{ ${styleEntries} }}`;
      }

      // 转换 HTML 到 JSX
      function htmlToJsx(html) {
        let jsx = html;

        // 转换注释
        jsx = jsx.replace(/<!--([\s\S]*?)-->/g, "{/*$1*/}");

        // 处理自闭合标签
        selfClosingTags.forEach((tag) => {
          const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, "gi");
          jsx = jsx.replace(regex, `<${tag}$1 />`);
        });

        // 转换 class 为 className
        jsx = jsx.replace(/\bclass=/g, "className=");

        // 转换 for 为 htmlFor
        jsx = jsx.replace(/\bfor=/g, "htmlFor=");

        // 转换其他属性
        Object.entries(attributeMap).forEach(([html, jsxAttr]) => {
          const regex = new RegExp(`\\b${html}=`, "gi");
          jsx = jsx.replace(regex, `${jsxAttr}=`);
        });

        // 转换事件处理器
        Object.entries(eventMap).forEach(([html, jsxEvent]) => {
          const regex = new RegExp(`\\b${html}=`, "gi");
          jsx = jsx.replace(regex, `${jsxEvent}=`);
        });

        // 转换布尔属性
        jsx = jsx.replace(
          /\b(disabled|checked|selected|required|multiple|hidden|autoFocus|autoPlay|controls|loop|muted|default|defer|async|noValidate|readOnly)(?=[\s>\/])/gi,
          (match) => {
            const camelCase = match.charAt(0).toLowerCase() + match.slice(1);
            return `${camelCase}={true}`;
          }
        );

        // 转换内联样式
        jsx = jsx.replace(/style="([^"]*)"/g, (match, styleContent) => {
          const styleObj = convertStyleToObject(styleContent);
          return styleObj ? `style=${styleObj}` : match;
        });

        // 将事件处理器的值转换为花括号
        jsx = jsx.replace(/(on[A-Z][a-zA-Z]*)="([^"]*)"/g, "$1={$2}");

        return jsx;
      }

      // 生成完整组件
      function generateComponent(jsxContent) {
        const useComponent = document.getElementById("opt-component").checked;
        const useTypeScript = document.getElementById("opt-typescript").checked;
        const useArrow = document.getElementById("opt-arrow").checked;
        const useMemo = document.getElementById("opt-memo").checked;
        const componentName = document.getElementById("component-name").value || "MyComponent";

        if (!useComponent) {
          return jsxContent;
        }

        let output = "";
        const typeAnnotation = useTypeScript ? ": React.FC" : "";
        const importMemo = useMemo ? ", memo" : "";

        output += `import React${importMemo} from 'react';\n\n`;

        if (useArrow) {
          output += `const ${componentName}${typeAnnotation} = () => {\n`;
          output += "  return (\n";
        } else {
          output += `function ${componentName}()${useTypeScript ? ": JSX.Element" : ""} {\n`;
          output += "  return (\n";
        }

        // 缩进 JSX 内容
        const indentedJsx = jsxContent
          .split("\n")
          .map((line) => "    " + line)
          .join("\n");
        output += indentedJsx + "\n";

        output += "  );\n";
        output += `}${useArrow ? ";" : ""}\n\n`;

        if (useMemo) {
          output += `export default memo(${componentName});\n`;
        } else {
          output += `export default ${componentName};\n`;
        }

        return output;
      }

      // 转换
      function convertToJSX() {
        const input = document.getElementById("html-input").value;
        const jsx = htmlToJsx(input);
        const output = generateComponent(jsx);

        document.getElementById("jsx-output").value = output;
        updateStats();
      }

      // 更新统计
      function updateStats() {
        const input = document.getElementById("html-input").value;
        const output = document.getElementById("jsx-output").value;

        document.getElementById("input-stats").textContent =
          `字符: ${input.length} | 行数: ${input.split("\n").length}`;
        document.getElementById("output-stats").textContent =
          `字符: ${output.length} | 行数: ${output.split("\n").length}`;
      }

      // 复制
      window.copyJSX = function () {
        const jsx = document.getElementById("jsx-output").value;
        navigator.clipboard
          .writeText(jsx)
          .then(() => {
            alert("JSX 代码已复制到剪贴板！");
          })
          .catch((err) => {
            console.error("复制失败:", err);
            const textarea = document.getElementById("jsx-output");
            textarea.select();
            document.execCommand("copy");
            alert("JSX 代码已复制到剪贴板！");
          });
      };

      // 下载
      window.downloadJSX = function () {
        const jsx = document.getElementById("jsx-output").value;
        const useTypeScript = document.getElementById("opt-typescript").checked;
        const componentName = document.getElementById("component-name").value || "MyComponent";
        const ext = useTypeScript ? "tsx" : "jsx";

        const blob = new Blob([jsx], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${componentName}.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
      };

      // 清空
      window.clearAll = function () {
        document.getElementById("html-input").value = "";
        document.getElementById("jsx-output").value = "";
        updateStats();
      };

      // 加载示例
      window.loadSample = function () {
        const sample = `<div class="app">
    <header class="header">
        <h2 class="title">我的应用</h2>
        <nav class="nav">
            <a href="#home" class="nav-link active">首页</a>
            <a href="#about" class="nav-link">关于</a>
            <a href="#contact" class="nav-link">联系</a>
        </nav>
    </header>
    
    <main class="main-content">
        <section class="hero" style="background-color: #f5f5f5; padding: 20px;">
            <h2>欢迎来到我的网站</h2>
            <p style="color: #666; font-size: 14px;">这是一段描述文字</p>
            <button onclick="handleClick()" class="btn primary">开始使用</button>
        </section>
        
        <form class="contact-form" onsubmit="handleSubmit(event)">
            <div class="form-group">
                <label for="name">姓名:</label>
                <input type="text" id="name" class="form-input" required>
            </div>
            <div class="form-group">
                <label for="email">邮箱:</label>
                <input type="email" id="email" class="form-input" maxlength="100">
            </div>
            <div class="form-group">
                <label for="message">留言:</label>
                <textarea id="message" class="form-textarea" rows="5"></textarea>
            </div>
            <button type="submit" class="btn" disabled>提交</button>
        </form>
        
        <!-- 图片展示区 -->
        <div class="gallery">
            <img src="photo1.jpg" alt="图片1" class="gallery-img">
            <img src="photo2.jpg" alt="图片2" class="gallery-img">
        </div>
    </main>
    
    <footer class="footer">
        <p>&copy; 2024 我的应用</p>
    </footer>
</div>`;
        document.getElementById("html-input").value = sample;
        convertToJSX();
      };

      // 实时转换
      document.getElementById("html-input").addEventListener("input", convertToJSX);
      document.querySelectorAll(".options-panel input").forEach((input) => {
        input.addEventListener("change", convertToJSX);
      });
      document.getElementById("component-name").addEventListener("input", convertToJSX);

      // 初始化
      loadTheme();
      convertToJSX();
    
