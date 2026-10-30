// @ts-nocheck
// Generated from tools/dev/http-status-codes.html
// Source SHA-256: 663c16dce4672ad10d91bb58d51ccbb2d31e967d689fa2b50b94b2f0166641cb
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const statusCodes = {
        "1xx": {
          name: "信息响应",
          class: "category-1xx",
          codes: [
            { code: 100, name: "Continue", desc: "继续，客户端应继续其请求" },
            { code: 101, name: "Switching Protocols", desc: "切换协议" },
            { code: 102, name: "Processing", desc: "处理中(WebDAV)" }
          ]
        },
        "2xx": {
          name: "成功响应",
          class: "category-2xx",
          codes: [
            { code: 200, name: "OK", desc: "请求成功" },
            { code: 201, name: "Created", desc: "已创建，成功请求并创建了新资源" },
            { code: 202, name: "Accepted", desc: "已接受，已接受请求但未处理完成" },
            { code: 204, name: "No Content", desc: "无内容，成功但不返回内容" },
            { code: 206, name: "Partial Content", desc: "部分内容，范围请求成功" }
          ]
        },
        "3xx": {
          name: "重定向",
          class: "category-3xx",
          codes: [
            { code: 301, name: "Moved Permanently", desc: "永久移动" },
            { code: 302, name: "Found", desc: "临时移动" },
            { code: 303, name: "See Other", desc: "查看其他位置" },
            { code: 304, name: "Not Modified", desc: "未修改，使用缓存" },
            { code: 307, name: "Temporary Redirect", desc: "临时重定向" },
            { code: 308, name: "Permanent Redirect", desc: "永久重定向" }
          ]
        },
        "4xx": {
          name: "客户端错误",
          class: "category-4xx",
          codes: [
            { code: 400, name: "Bad Request", desc: "错误请求，语法错误" },
            { code: 401, name: "Unauthorized", desc: "未授权，需要身份验证" },
            { code: 403, name: "Forbidden", desc: "禁止访问" },
            { code: 404, name: "Not Found", desc: "未找到资源" },
            { code: 405, name: "Method Not Allowed", desc: "方法不允许" },
            { code: 408, name: "Request Timeout", desc: "请求超时" },
            { code: 409, name: "Conflict", desc: "冲突" },
            { code: 413, name: "Payload Too Large", desc: "请求体过大" },
            { code: 429, name: "Too Many Requests", desc: "请求过多，限流" }
          ]
        },
        "5xx": {
          name: "服务器错误",
          class: "category-5xx",
          codes: [
            { code: 500, name: "Internal Server Error", desc: "服务器内部错误" },
            { code: 501, name: "Not Implemented", desc: "未实现" },
            { code: 502, name: "Bad Gateway", desc: "网关错误" },
            { code: 503, name: "Service Unavailable", desc: "服务不可用" },
            { code: 504, name: "Gateway Timeout", desc: "网关超时" }
          ]
        }
      };
      function render(filter = "") {
        const content = document.getElementById("content");
        let html = "";
        for (const [key, cat] of Object.entries(statusCodes)) {
          const filteredCodes = cat.codes.filter(
            (c) =>
              !filter ||
              c.code.toString().includes(filter) ||
              c.name.toLowerCase().includes(filter.toLowerCase()) ||
              c.desc.includes(filter)
          );
          if (filteredCodes.length === 0) continue;
          html += `<div class="category"><div class="category-header ${cat.class}">${key} ${cat.name} <span>${filteredCodes.length}</span></div><div class="category-content">`;
          for (const c of filteredCodes) {
            html += `<div class="status-item"><span class="status-code">${c.code}</span><span class="status-name">${c.name}</span><span class="status-desc">${c.desc}</span></div>`;
          }
          html += "</div></div>";
        }
        content.innerHTML =
          html || '<p style="text-align:center;color:white">未找到匹配的状态码</p>';
      }
      document.getElementById("search").addEventListener("input", (e) => render(e.target.value));
      render();
    
