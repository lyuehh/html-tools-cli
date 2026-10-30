// @ts-nocheck
// Generated from tools/dev/js-minifier.html
// Source SHA-256: 0320b34d460e2302c3cf4b6ab34cd4f87c7300e81d092c19f2510cf687b3e6e2
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

      // 显示错误
      function showError(message) {
        const errorBox = document.getElementById("error-box");
        errorBox.textContent = message;
        errorBox.classList.add("show");
      }

      // 隐藏错误
      function hideError() {
        const errorBox = document.getElementById("error-box");
        errorBox.classList.remove("show");
      }

      // JavaScript 压缩
      async function minifyJS() {
        hideError();
        const input = document.getElementById("js-input").value;
        const originalSize = new Blob([input]).size;

        const options = {
          compress: document.getElementById("opt-compress").checked
            ? {
                dead_code: document.getElementById("opt-dead-code").checked,
                drop_console: document.getElementById("opt-drop-console").checked,
                drop_debugger: document.getElementById("opt-drop-debugger").checked,
                passes: 2
              }
            : false,
          mangle: document.getElementById("opt-mangle").checked
            ? {
                keep_fnames: document.getElementById("opt-keep-fnames").checked,
                keep_classnames: document.getElementById("opt-keep-classnames").checked
              }
            : false,
          sourceMap: document.getElementById("opt-sourcemap").checked
            ? {
                url: "inline"
              }
            : false,
          output: {
            comments: false
          }
        };

        try {
          document.querySelector("main").classList.add("processing");

          const result = await Terser.minify(input, options);

          if (result.error) {
            throw result.error;
          }

          document.getElementById("js-output").value = result.code;

          // 更新统计
          const minifiedSize = new Blob([result.code]).size;
          const savings =
            originalSize > 0 ? ((1 - minifiedSize / originalSize) * 100).toFixed(1) : 0;
          const gzipEstimate = Math.round(minifiedSize * 0.3);

          document.getElementById("original-size").textContent = originalSize.toLocaleString();
          document.getElementById("minified-size").textContent = minifiedSize.toLocaleString();
          document.getElementById("savings").textContent = savings + "%";
          document.getElementById("gzip-estimate").textContent = gzipEstimate.toLocaleString();
        } catch (error) {
          showError(`压缩错误: ${error.message || error}`);
          document.getElementById("js-output").value = "";
        } finally {
          document.querySelector("main").classList.remove("processing");
          updateStats();
        }
      }

      // 验证 JavaScript 语法
      window.validateJS = async function () {
        hideError();
        const input = document.getElementById("js-input").value;

        try {
          // 使用 Terser 解析来验证语法
          await Terser.minify(input, { compress: false, mangle: false });
          alert("语法验证通过！代码没有语法错误。");
        } catch (error) {
          showError(`语法错误: ${error.message || error}`);
        }
      };

      // 更新统计
      function updateStats() {
        const input = document.getElementById("js-input").value;
        const output = document.getElementById("js-output").value;

        // 统计函数数量
        const functionCount = (input.match(/function\s+\w+|=>\s*{|\bclass\s+\w+/g) || []).length;

        // 统计变量数量
        const varCount = (input.match(/\b(var|let|const)\s+\w+/g) || []).length;

        document.getElementById("input-stats").textContent =
          `行数: ${input.split("\n").length} | 函数/类: ${functionCount} | 变量: ${varCount}`;
        document.getElementById("output-stats").textContent = `行数: ${output.split("\n").length}`;
      }

      // 复制
      window.copyJS = function () {
        const js = document.getElementById("js-output").value;
        navigator.clipboard
          .writeText(js)
          .then(() => {
            alert("JavaScript 代码已复制到剪贴板！");
          })
          .catch((err) => {
            console.error("复制失败:", err);
            const textarea = document.getElementById("js-output");
            textarea.select();
            document.execCommand("copy");
            alert("JavaScript 代码已复制到剪贴板！");
          });
      };

      // 下载
      window.downloadJS = function () {
        const js = document.getElementById("js-output").value;
        const blob = new Blob([js], { type: "text/javascript;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "script.min.js";
        a.click();
        URL.revokeObjectURL(url);
      };

      // 清空
      window.clearAll = function () {
        document.getElementById("js-input").value = "";
        document.getElementById("js-output").value = "";
        document.getElementById("original-size").textContent = "0";
        document.getElementById("minified-size").textContent = "0";
        document.getElementById("savings").textContent = "0%";
        document.getElementById("gzip-estimate").textContent = "0";
        hideError();
        updateStats();
      };

      // 加载示例
      window.loadSample = function () {
        const sample = `/**
 * 高级表单验证器
 * 支持多种验证规则和自定义错误消息
 */
class FormValidator {
    constructor(formElement, options = {}) {
        this.form = typeof formElement === 'string' 
            ? document.querySelector(formElement) 
            : formElement;
        
        this.options = {
            validateOnBlur: true,
            validateOnInput: false,
            showErrorMessages: true,
            errorClass: 'is-invalid',
            successClass: 'is-valid',
            ...options
        };
        
        this.validators = new Map();
        this.errors = new Map();
        
        this.initializeEventListeners();
    }
    
    // 内置验证规则
    static rules = {
        required: (value) => {
            return value.trim().length > 0;
        },
        
        email: (value) => {
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            return emailRegex.test(value);
        },
        
        minLength: (value, min) => {
            return value.length >= min;
        },
        
        maxLength: (value, max) => {
            return value.length <= max;
        },
        
        pattern: (value, regex) => {
            return new RegExp(regex).test(value);
        },
        
        numeric: (value) => {
            return /^\\d+$/.test(value);
        },
        
        phone: (value) => {
            return /^1[3-9]\\d{9}$/.test(value);
        },
        
        url: (value) => {
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        },
        
        match: (value, fieldName, form) => {
            const otherField = form.querySelector(\`[name="\${fieldName}"]\`);
            return otherField && value === otherField.value;
        }
    };
    
    // 默认错误消息
    static messages = {
        required: '此字段为必填项',
        email: '请输入有效的邮箱地址',
        minLength: '最少需要 {0} 个字符',
        maxLength: '最多允许 {0} 个字符',
        pattern: '格式不正确',
        numeric: '请输入数字',
        phone: '请输入有效的手机号码',
        url: '请输入有效的 URL',
        match: '两次输入不匹配'
    };
    
    initializeEventListeners() {
        if (!this.form) {
            console.error('Form element not found');
            return;
        }
        
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.validateAll();
        });
        
        if (this.options.validateOnBlur) {
            this.form.querySelectorAll('input, textarea, select').forEach(field => {
                field.addEventListener('blur', () => this.validateField(field));
            });
        }
        
        if (this.options.validateOnInput) {
            this.form.querySelectorAll('input, textarea, select').forEach(field => {
                field.addEventListener('input', () => this.validateField(field));
            });
        }
    }
    
    addValidator(fieldName, rules) {
        this.validators.set(fieldName, rules);
        return this;
    }
    
    validateField(field) {
        const fieldName = field.name;
        const rules = this.validators.get(fieldName);
        
        if (!rules) return true;
        
        const value = field.value;
        let isValid = true;
        let errorMessage = '';
        
        for (const rule of rules) {
            const ruleName = typeof rule === 'string' ? rule : rule.rule;
            const ruleParams = typeof rule === 'object' ? rule.params : [];
            const customMessage = typeof rule === 'object' ? rule.message : null;
            
            const validator = FormValidator.rules[ruleName];
            
            if (validator && !validator(value, ...ruleParams, this.form)) {
                isValid = false;
                errorMessage = customMessage || this.formatMessage(
                    FormValidator.messages[ruleName], 
                    ruleParams
                );
                break;
            }
        }
        
        this.updateFieldStatus(field, isValid, errorMessage);
        return isValid;
    }
    
    validateAll() {
        let isFormValid = true;
        
        this.validators.forEach((rules, fieldName) => {
            const field = this.form.querySelector(\`[name="\${fieldName}"]\`);
            if (field && !this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            this.onSuccess();
        } else {
            this.onError();
        }
        
        return isFormValid;
    }
    
    updateFieldStatus(field, isValid, errorMessage) {
        const { errorClass, successClass, showErrorMessages } = this.options;
        
        field.classList.remove(errorClass, successClass);
        field.classList.add(isValid ? successClass : errorClass);
        
        // 移除旧的错误消息
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // 显示新的错误消息
        if (!isValid && showErrorMessages && errorMessage) {
            const errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            field.parentNode.appendChild(errorElement);
        }
        
        this.errors.set(field.name, isValid ? null : errorMessage);
    }
    
    formatMessage(template, params) {
        return template.replace(/{(\\d+)}/g, (match, index) => {
            return params[index] !== undefined ? params[index] : match;
        });
    }
    
    onSuccess() {
        console.log('表单验证通过');
        const event = new CustomEvent('formValid', { detail: this.getFormData() });
        this.form.dispatchEvent(event);
    }
    
    onError() {
        console.log('表单验证失败', this.errors);
        const event = new CustomEvent('formInvalid', { detail: this.errors });
        this.form.dispatchEvent(event);
    }
    
    getFormData() {
        return new FormData(this.form);
    }
    
    reset() {
        this.errors.clear();
        this.form.reset();
        this.form.querySelectorAll('input, textarea, select').forEach(field => {
            field.classList.remove(this.options.errorClass, this.options.successClass);
        });
        this.form.querySelectorAll('.error-message').forEach(el => el.remove());
    }
}

// 使用示例
document.addEventListener('DOMContentLoaded', () => {
    const validator = new FormValidator('#registration-form', {
        validateOnBlur: true,
        showErrorMessages: true
    });
    
    validator
        .addValidator('username', [
            'required',
            { rule: 'minLength', params: [3], message: '用户名至少3个字符' },
            { rule: 'maxLength', params: [20] }
        ])
        .addValidator('email', ['required', 'email'])
        .addValidator('phone', ['required', 'phone'])
        .addValidator('password', [
            'required',
            { rule: 'minLength', params: [8], message: '密码至少8个字符' },
            { rule: 'pattern', params: ['^(?=.*[a-z])(?=.*[A-Z])(?=.*\\\\d)'], message: '密码需包含大小写字母和数字' }
        ])
        .addValidator('confirmPassword', [
            'required',
            { rule: 'match', params: ['password'], message: '两次密码输入不一致' }
        ]);
    
    // 调试
    debugger;
    
    console.log('表单验证器已初始化');
});`;
        document.getElementById("js-input").value = sample;
        minifyJS();
      };

      // 实时更新统计
      document.getElementById("js-input").addEventListener("input", updateStats);

      // 初始化
      loadTheme();
      updateStats();
      // 初始压缩
      setTimeout(minifyJS, 500);
    
