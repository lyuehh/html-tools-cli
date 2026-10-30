// @ts-nocheck
// Generated from tools/dev/http-status.html
// Source SHA-256: 648d3830f069d0d055925445447fa3b5f6f198f0ec6fee0ec1af32aed2914a71
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // HTTP Status Codes Database
      const statusCodes = [
        // 1xx Informational
        {
          code: 100,
          name: "Continue",
          nameCn: "继续",
          brief: "服务器已收到请求头，客户端应继续发送请求体",
          description:
            "表示目前为止一切正常，客户端应该继续请求，如果已完成请求则忽略。这通常用于客户端发送带有Expect: 100-continue头的POST请求。",
          usage: "用于分块上传大文件前的预检",
          tags: ["上传", "预检"],
          example: `// 发送带有 Expect 头的请求
fetch('/upload', {
  method: 'POST',
  headers: {
    'Expect': '100-continue',
    'Content-Type': 'application/octet-stream'
  },
  body: largeFile
});`
        },
        {
          code: 101,
          name: "Switching Protocols",
          nameCn: "切换协议",
          brief: "服务器正在根据客户端的请求切换协议",
          description:
            "服务器理解并同意客户端的协议升级请求。最常见的用途是将HTTP连接升级为WebSocket连接。",
          usage: "WebSocket握手、HTTP/2升级",
          tags: ["WebSocket", "协议升级"],
          example: `// WebSocket 握手
const ws = new WebSocket('wss://example.com/socket');
// 服务器响应 101 Switching Protocols
// Upgrade: websocket
// Connection: Upgrade`
        },
        {
          code: 102,
          name: "Processing",
          nameCn: "处理中",
          brief: "服务器正在处理请求，但尚未完成（WebDAV）",
          description:
            "此代码表示服务器已收到并正在处理请求，但尚无响应可用。这可以防止客户端在等待响应时超时。",
          usage: "WebDAV长时间操作",
          tags: ["WebDAV", "长操作"]
        },
        {
          code: 103,
          name: "Early Hints",
          nameCn: "预提示",
          brief: "用于在最终响应之前返回一些响应头",
          description:
            "允许服务器在准备响应时发送一些响应头，让浏览器提前开始预加载资源，提升页面加载速度。",
          usage: "预加载关键资源",
          tags: ["性能优化", "Link预加载"],
          example: `// 服务器响应
HTTP/1.1 103 Early Hints
Link: </style.css>; rel=preload; as=style
Link: </script.js>; rel=preload; as=script`
        },

        // 2xx Success
        {
          code: 200,
          name: "OK",
          nameCn: "成功",
          brief: "请求成功，返回了请求的数据",
          description:
            "标准的成功响应。对于GET请求，响应将包含请求的资源。对于POST请求，响应将包含描述或包含操作结果的实体。",
          usage: "所有成功的GET、POST等请求",
          tags: ["GET", "POST", "常用"],
          example: `// API 成功响应
{
  "status": 200,
  "data": {
    "id": 1,
    "name": "示例数据"
  }
}`
        },
        {
          code: 201,
          name: "Created",
          nameCn: "已创建",
          brief: "请求成功，服务器创建了新资源",
          description:
            "请求已成功且服务器创建了一个新资源。通常用于POST或PUT请求后的响应。响应的Location头应该包含新创建资源的URI。",
          usage: "POST创建新资源成功",
          tags: ["POST", "REST API", "常用"],
          example: `// 创建用户成功
HTTP/1.1 201 Created
Location: /api/users/123

{
  "id": 123,
  "name": "新用户",
  "created_at": "2024-01-01T00:00:00Z"
}`
        },
        {
          code: 202,
          name: "Accepted",
          nameCn: "已接受",
          brief: "请求已接受处理，但处理尚未完成",
          description:
            "请求已被接受进行处理，但处理尚未完成。请求可能会也可能不会最终执行。适用于异步任务或批处理操作。",
          usage: "异步任务、队列处理",
          tags: ["异步", "队列"],
          example: `// 异步任务接受
{
  "status": "accepted",
  "task_id": "abc123",
  "check_status_url": "/api/tasks/abc123"
}`
        },
        {
          code: 203,
          name: "Non-Authoritative Information",
          nameCn: "非权威信息",
          brief: "返回的元数据可能来自本地或第三方副本",
          description:
            "服务器成功处理了请求，但返回的信息可能来自另一源。通常用于代理服务器或镜像站点。",
          usage: "代理服务器、CDN缓存",
          tags: ["代理", "缓存"]
        },
        {
          code: 204,
          name: "No Content",
          nameCn: "无内容",
          brief: "请求成功，但没有返回内容",
          description:
            "服务器成功处理了请求，但不需要返回任何实体内容。常用于DELETE请求成功后，或更新操作不需要返回更新后的数据时。",
          usage: "DELETE成功、更新操作",
          tags: ["DELETE", "PUT", "常用"],
          example: `// DELETE 请求成功
DELETE /api/users/123 HTTP/1.1

HTTP/1.1 204 No Content`
        },
        {
          code: 205,
          name: "Reset Content",
          nameCn: "重置内容",
          brief: "请求成功，客户端应重置文档视图",
          description: "服务器成功处理了请求，告诉客户端重置文档视图，如清空表单以便再次输入。",
          usage: "表单提交后重置",
          tags: ["表单"]
        },
        {
          code: 206,
          name: "Partial Content",
          nameCn: "部分内容",
          brief: "服务器成功处理了部分GET请求",
          description:
            "服务器已成功处理了部分GET请求。用于支持断点续传的资源下载，客户端通过Range头指定请求的字节范围。",
          usage: "断点续传、视频流媒体",
          tags: ["下载", "流媒体", "Range"],
          example: `// 请求部分内容
GET /video.mp4 HTTP/1.1
Range: bytes=0-1023

HTTP/1.1 206 Partial Content
Content-Range: bytes 0-1023/10240
Content-Length: 1024`
        },
        {
          code: 207,
          name: "Multi-Status",
          nameCn: "多状态",
          brief: "响应体包含多个状态码（WebDAV）",
          description: "响应体是一个XML文档，包含多个独立操作的状态码。用于WebDAV批量操作。",
          usage: "WebDAV批量操作",
          tags: ["WebDAV", "批量"]
        },
        {
          code: 208,
          name: "Already Reported",
          nameCn: "已报告",
          brief: "成员已在之前的响应中列出（WebDAV）",
          description: "用于WebDAV绑定的成员，避免重复枚举。",
          usage: "WebDAV",
          tags: ["WebDAV"]
        },
        {
          code: 226,
          name: "IM Used",
          nameCn: "使用了IM",
          brief: "服务器已完成对资源的GET请求，响应是对当前实例应用的一个或多个实例操作的结果表示",
          description:
            "服务器已经完成了对资源的请求，并且响应是应用于当前实例的一个或多个实例操作的结果。",
          usage: "Delta编码",
          tags: ["Delta"]
        },

        // 3xx Redirection
        {
          code: 300,
          name: "Multiple Choices",
          nameCn: "多种选择",
          brief: "请求的资源有多种表示形式",
          description: "表示请求的资源有多种可选择的回应。用户或用户代理可以选择其中一个。",
          usage: "内容协商",
          tags: ["协商"]
        },
        {
          code: 301,
          name: "Moved Permanently",
          nameCn: "永久移动",
          brief: "资源已永久移动到新位置",
          description:
            "请求的资源已被永久移动到新URI。以后所有请求都应使用新URI。搜索引擎会更新链接。",
          usage: "网站迁移、URL规范化",
          tags: ["SEO", "重定向", "常用"],
          example: `// 永久重定向
HTTP/1.1 301 Moved Permanently
Location: https://new-domain.com/page

// Nginx 配置
server {
    return 301 https://new-domain.com$request_uri;
}`
        },
        {
          code: 302,
          name: "Found",
          nameCn: "临时移动",
          brief: "资源临时移动到其他位置",
          description:
            "请求的资源临时位于另一个URI。由于重定向可能会不时更改，客户端应继续使用原URI。",
          usage: "临时重定向、登录跳转",
          tags: ["重定向", "常用"],
          example: `// 临时重定向
HTTP/1.1 302 Found
Location: /login?redirect=/dashboard`
        },
        {
          code: 303,
          name: "See Other",
          nameCn: "查看其他",
          brief: "应使用GET请求另一个URI来获取资源",
          description:
            "服务器发送此响应，指示客户端应使用GET请求在另一个URI获取请求的资源。常用于POST处理后重定向到结果页面。",
          usage: "POST后重定向（PRG模式）",
          tags: ["PRG", "POST"],
          example: `// POST-Redirect-Get 模式
POST /order HTTP/1.1
// 处理订单...

HTTP/1.1 303 See Other
Location: /order/123/confirmation`
        },
        {
          code: 304,
          name: "Not Modified",
          nameCn: "未修改",
          brief: "资源未修改，可使用缓存版本",
          description:
            "表示资源自上次请求后未被修改，客户端可以使用缓存的版本。这是条件请求的结果。",
          usage: "浏览器缓存、CDN缓存验证",
          tags: ["缓存", "ETag", "常用"],
          example: `// 条件请求
GET /style.css HTTP/1.1
If-None-Match: "abc123"

HTTP/1.1 304 Not Modified
ETag: "abc123"`
        },
        {
          code: 305,
          name: "Use Proxy",
          nameCn: "使用代理",
          brief: "请求必须通过代理访问（已废弃）",
          description: "被请求的资源必须通过指定的代理才能被访问。由于安全原因，此状态码已被废弃。",
          usage: "已废弃",
          tags: ["已废弃"]
        },
        {
          code: 307,
          name: "Temporary Redirect",
          nameCn: "临时重定向",
          brief: "临时重定向，保持请求方法不变",
          description: "与302类似，但明确要求客户端保持请求方法不变。POST请求重定向后仍使用POST。",
          usage: "HTTPS升级、API版本迁移",
          tags: ["重定向", "HTTPS"],
          example: `// HTTP 到 HTTPS 重定向
HTTP/1.1 307 Temporary Redirect
Location: https://example.com/api/users`
        },
        {
          code: 308,
          name: "Permanent Redirect",
          nameCn: "永久重定向",
          brief: "永久重定向，保持请求方法不变",
          description: "与301类似，但明确要求客户端保持请求方法不变。这是301的严格版本。",
          usage: "永久迁移，保持POST方法",
          tags: ["重定向", "SEO"]
        },

        // 4xx Client Errors
        {
          code: 400,
          name: "Bad Request",
          nameCn: "错误请求",
          brief: "服务器无法理解请求的语法",
          description:
            "服务器无法处理请求，因为客户端错误（如语法错误、无效的请求消息框架或欺骗性请求路由）。",
          usage: "参数验证失败、格式错误",
          tags: ["验证", "常用"],
          example: `// 验证错误响应
{
  "error": "Bad Request",
  "message": "Invalid email format",
  "field": "email"
}`
        },
        {
          code: 401,
          name: "Unauthorized",
          nameCn: "未授权",
          brief: "请求需要身份验证",
          description:
            "请求需要用户身份验证。响应必须包含WWW-Authenticate头字段，包含适用于请求资源的质询信息。",
          usage: "未登录、Token过期",
          tags: ["认证", "常用"],
          example: `// 未认证响应
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="api"

{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}`
        },
        {
          code: 402,
          name: "Payment Required",
          nameCn: "需要付款",
          brief: "保留供将来使用，最初用于数字支付系统",
          description:
            "此代码保留供将来使用。最初的意图是用于数字现金或微支付系统，但目前未被广泛使用。",
          usage: "付费功能、订阅服务",
          tags: ["支付"]
        },
        {
          code: 403,
          name: "Forbidden",
          nameCn: "禁止",
          brief: "服务器拒绝执行请求",
          description: "服务器理解请求但拒绝授权。与401不同，重新进行身份验证不会有任何帮助。",
          usage: "权限不足、IP被封",
          tags: ["权限", "常用"],
          example: `// 权限不足响应
{
  "error": "Forbidden",
  "message": "You don't have permission to access this resource"
}`
        },
        {
          code: 404,
          name: "Not Found",
          nameCn: "未找到",
          brief: "服务器找不到请求的资源",
          description:
            "服务器找不到请求的资源。这是最常见的错误状态码之一。也可能用于隐藏资源存在与否的信息。",
          usage: "资源不存在、URL错误",
          tags: ["常用"],
          example: `// 资源未找到
{
  "error": "Not Found",
  "message": "User with ID 123 not found"
}`
        },
        {
          code: 405,
          name: "Method Not Allowed",
          nameCn: "方法不允许",
          brief: "请求方法不被目标资源支持",
          description:
            "请求中使用的HTTP方法不被目标资源支持。响应必须包含Allow头，列出支持的方法。",
          usage: "REST API方法限制",
          tags: ["REST API"],
          example: `// 方法不允许
HTTP/1.1 405 Method Not Allowed
Allow: GET, POST

{
  "error": "Method Not Allowed",
  "allowed": ["GET", "POST"]
}`
        },
        {
          code: 406,
          name: "Not Acceptable",
          nameCn: "不可接受",
          brief: "服务器无法生成客户端可接受的响应",
          description: "服务器无法根据请求中的Accept头生成客户端可接受的内容。",
          usage: "内容协商失败",
          tags: ["协商", "Accept"]
        },
        {
          code: 407,
          name: "Proxy Authentication Required",
          nameCn: "需要代理认证",
          brief: "客户端必须首先与代理服务器进行身份验证",
          description: "类似于401，但表示客户端必须首先使用代理进行身份验证。",
          usage: "代理服务器认证",
          tags: ["代理", "认证"]
        },
        {
          code: 408,
          name: "Request Timeout",
          nameCn: "请求超时",
          brief: "服务器等待请求超时",
          description: "服务器在准备等待的时间内未收到完整的请求。客户端可以重新发送请求。",
          usage: "慢速客户端、大文件上传",
          tags: ["超时"]
        },
        {
          code: 409,
          name: "Conflict",
          nameCn: "冲突",
          brief: "请求与服务器当前状态冲突",
          description: "请求与资源的当前状态冲突。通常用于并发更新或重复创建资源。",
          usage: "并发冲突、重复资源",
          tags: ["并发", "常用"],
          example: `// 冲突响应
{
  "error": "Conflict",
  "message": "Email already exists",
  "conflicting_field": "email"
}`
        },
        {
          code: 410,
          name: "Gone",
          nameCn: "已删除",
          brief: "资源已永久删除",
          description: "请求的资源在服务器上已不再可用，且没有转发地址。与404不同，这是永久性的。",
          usage: "已下架内容、已删除账户",
          tags: ["删除", "SEO"]
        },
        {
          code: 411,
          name: "Length Required",
          nameCn: "需要内容长度",
          brief: "请求未指定Content-Length头",
          description: "服务器拒绝接受不带Content-Length头字段的请求。",
          usage: "强制要求Content-Length",
          tags: ["请求头"]
        },
        {
          code: 412,
          name: "Precondition Failed",
          nameCn: "前提条件失败",
          brief: "请求头中的前提条件评估为false",
          description: "请求头中的一个或多个条件在服务器上评估为false。用于条件请求。",
          usage: "ETag验证、乐观锁",
          tags: ["条件请求", "ETag"],
          example: `// 条件更新失败
PUT /api/article/1 HTTP/1.1
If-Match: "old-etag"

HTTP/1.1 412 Precondition Failed`
        },
        {
          code: 413,
          name: "Payload Too Large",
          nameCn: "请求体过大",
          brief: "请求体超过服务器限制",
          description: "请求实体大于服务器愿意或能够处理的大小。",
          usage: "文件上传限制",
          tags: ["上传", "限制"]
        },
        {
          code: 414,
          name: "URI Too Long",
          nameCn: "URI过长",
          brief: "请求的URI超过服务器限制",
          description: "客户端请求的URI长度超过服务器愿意解释的长度。",
          usage: "GET参数过长",
          tags: ["URL", "限制"]
        },
        {
          code: 415,
          name: "Unsupported Media Type",
          nameCn: "不支持的媒体类型",
          brief: "服务器不支持请求的媒体格式",
          description: "服务器不支持请求中提交的媒体格式，因此拒绝请求。",
          usage: "Content-Type验证",
          tags: ["Content-Type"],
          example: `// 不支持的格式
POST /api/data HTTP/1.1
Content-Type: application/xml

HTTP/1.1 415 Unsupported Media Type
// 服务器只接受 application/json`
        },
        {
          code: 416,
          name: "Range Not Satisfiable",
          nameCn: "范围无法满足",
          brief: "请求的范围超出资源大小",
          description: "客户端请求的Range头字段中的范围无法满足，可能是因为超出了资源的大小。",
          usage: "断点续传失败",
          tags: ["Range", "下载"]
        },
        {
          code: 417,
          name: "Expectation Failed",
          nameCn: "期望失败",
          brief: "服务器无法满足Expect请求头的期望",
          description: "服务器无法满足Expect请求头字段中指定的期望。",
          usage: "Expect头验证",
          tags: ["Expect"]
        },
        {
          code: 418,
          name: "I'm a teapot",
          nameCn: "我是茶壶",
          brief: "服务器拒绝尝试用茶壶煮咖啡（愚人节玩笑）",
          description:
            "这是1998年愚人节玩笑中的超文本咖啡壶控制协议的一部分。某些网站用它来表示不想处理请求。",
          usage: "彩蛋、拒绝自动化请求",
          tags: ["彩蛋", "趣味"]
        },
        {
          code: 421,
          name: "Misdirected Request",
          nameCn: "误导请求",
          brief: "请求被定向到无法产生响应的服务器",
          description: "请求被定向到一个无法为该请求生成响应的服务器。",
          usage: "HTTP/2连接复用问题",
          tags: ["HTTP/2"]
        },
        {
          code: 422,
          name: "Unprocessable Entity",
          nameCn: "无法处理的实体",
          brief: "请求格式正确但语义错误",
          description: "请求格式良好，但由于语义错误而无法遵循。常用于验证错误。",
          usage: "业务验证失败",
          tags: ["验证", "REST API", "常用"],
          example: `// 验证错误详情
{
  "error": "Unprocessable Entity",
  "errors": [
    {"field": "age", "message": "必须大于0"},
    {"field": "email", "message": "格式无效"}
  ]
}`
        },
        {
          code: 423,
          name: "Locked",
          nameCn: "已锁定",
          brief: "资源已被锁定（WebDAV）",
          description: "正在访问的资源被锁定。用于WebDAV。",
          usage: "WebDAV文件锁定",
          tags: ["WebDAV", "锁定"]
        },
        {
          code: 424,
          name: "Failed Dependency",
          nameCn: "依赖失败",
          brief: "由于之前的请求失败，请求也失败了（WebDAV）",
          description: "由于依赖于另一个请求，而该请求失败，所以此请求也失败。",
          usage: "WebDAV批量操作",
          tags: ["WebDAV", "依赖"]
        },
        {
          code: 425,
          name: "Too Early",
          nameCn: "太早",
          brief: "服务器不愿意处理可能被重放的请求",
          description: "服务器不愿意冒险处理可能被重放的请求。",
          usage: "TLS早期数据",
          tags: ["TLS", "安全"]
        },
        {
          code: 426,
          name: "Upgrade Required",
          nameCn: "需要升级",
          brief: "客户端应切换到不同的协议",
          description: "服务器拒绝使用当前协议执行请求，但可能在客户端升级到不同协议后愿意这样做。",
          usage: "强制HTTPS、协议升级",
          tags: ["协议", "升级"]
        },
        {
          code: 428,
          name: "Precondition Required",
          nameCn: "需要前提条件",
          brief: "服务器要求请求是有条件的",
          description: '服务器要求请求是有条件的。旨在防止"丢失更新"问题。',
          usage: "防止丢失更新",
          tags: ["条件请求", "并发"]
        },
        {
          code: 429,
          name: "Too Many Requests",
          nameCn: "请求过多",
          brief: "用户在给定时间内发送了太多请求",
          description: '用户在给定的时间内发送了太多请求（"速率限制"）。响应应包含Retry-After头。',
          usage: "API限流",
          tags: ["限流", "常用"],
          example: `// 限流响应
HTTP/1.1 429 Too Many Requests
Retry-After: 60
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0

{
  "error": "Too Many Requests",
  "retry_after": 60
}`
        },
        {
          code: 431,
          name: "Request Header Fields Too Large",
          nameCn: "请求头字段过大",
          brief: "请求头字段过大",
          description: "服务器不愿意处理请求，因为其头字段太大。",
          usage: "Cookie过大、请求头限制",
          tags: ["请求头", "限制"]
        },
        {
          code: 451,
          name: "Unavailable For Legal Reasons",
          nameCn: "因法律原因不可用",
          brief: "由于法律原因资源不可用",
          description:
            "用户代理请求了一个因法律原因而无法合法提供的资源。源自雷·布拉德伯里的小说《华氏451》。",
          usage: "内容审查、版权限制",
          tags: ["法律", "审查"]
        },

        // 5xx Server Errors
        {
          code: 500,
          name: "Internal Server Error",
          nameCn: "服务器内部错误",
          brief: "服务器遇到意外情况，无法完成请求",
          description: '服务器遇到意外情况，阻止其完成请求。这是一个通用的"兜底"响应。',
          usage: "未捕获的异常、服务器崩溃",
          tags: ["常用", "错误"],
          example: `// 服务器错误响应
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred",
  "request_id": "abc123"
}`
        },
        {
          code: 501,
          name: "Not Implemented",
          nameCn: "未实现",
          brief: "服务器不支持完成请求所需的功能",
          description:
            "服务器不支持完成请求所需的功能。当服务器不识别请求方法且无法对任何资源支持该方法时使用。",
          usage: "未实现的API端点",
          tags: ["开发中"]
        },
        {
          code: 502,
          name: "Bad Gateway",
          nameCn: "错误网关",
          brief: "网关或代理从上游服务器收到无效响应",
          description: "服务器作为网关或代理，从上游服务器收到了无效的响应。",
          usage: "上游服务不可用、负载均衡问题",
          tags: ["代理", "网关", "常用"],
          example: `// Nginx 返回502
// 通常表示后端服务无响应
upstream backend {
    server 127.0.0.1:3000;
}
// 后端服务崩溃或无法连接时返回502`
        },
        {
          code: 503,
          name: "Service Unavailable",
          nameCn: "服务不可用",
          brief: "服务器暂时无法处理请求",
          description:
            "服务器目前无法使用（由于过载或停机维护）。通常是暂时状态。响应应包含Retry-After头。",
          usage: "维护模式、服务过载",
          tags: ["维护", "过载", "常用"],
          example: `// 维护模式响应
HTTP/1.1 503 Service Unavailable
Retry-After: 3600

{
  "error": "Service Unavailable",
  "message": "系统维护中，预计1小时后恢复"
}`
        },
        {
          code: 504,
          name: "Gateway Timeout",
          nameCn: "网关超时",
          brief: "网关或代理服务器未及时收到上游响应",
          description: "服务器作为网关或代理，未能及时从上游服务器收到响应。",
          usage: "上游服务响应慢",
          tags: ["代理", "超时", "常用"]
        },
        {
          code: 505,
          name: "HTTP Version Not Supported",
          nameCn: "不支持的HTTP版本",
          brief: "服务器不支持请求中使用的HTTP版本",
          description: "服务器不支持请求消息中使用的HTTP协议版本。",
          usage: "HTTP版本兼容性",
          tags: ["HTTP版本"]
        },
        {
          code: 506,
          name: "Variant Also Negotiates",
          nameCn: "变体也在协商",
          brief: "服务器存在内部配置错误",
          description: "服务器存在内部配置错误：透明内容协商导致循环引用。",
          usage: "配置错误",
          tags: ["配置"]
        },
        {
          code: 507,
          name: "Insufficient Storage",
          nameCn: "存储空间不足",
          brief: "服务器无法存储完成请求所需的表示（WebDAV）",
          description: "服务器无法存储完成请求所需的表示。",
          usage: "磁盘空间不足",
          tags: ["WebDAV", "存储"]
        },
        {
          code: 508,
          name: "Loop Detected",
          nameCn: "检测到循环",
          brief: "服务器检测到处理请求时的无限循环（WebDAV）",
          description: "服务器在处理请求时检测到无限循环。",
          usage: "WebDAV循环引用",
          tags: ["WebDAV", "循环"]
        },
        {
          code: 510,
          name: "Not Extended",
          nameCn: "未扩展",
          brief: "需要进一步扩展请求才能完成",
          description: "服务器需要进一步扩展请求才能完成请求。",
          usage: "HTTP扩展框架",
          tags: ["扩展"]
        },
        {
          code: 511,
          name: "Network Authentication Required",
          nameCn: "需要网络认证",
          brief: "客户端需要认证以获得网络访问权限",
          description:
            "客户端需要进行身份验证才能获得网络访问权限。用于强制门户（如WiFi登录页面）。",
          usage: "WiFi登录门户",
          tags: ["网络", "认证"]
        }
      ];

      let currentCategory = "all";
      let searchQuery = "";

      // Theme
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      function loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      // Get category class
      function getCategoryClass(code) {
        if (code >= 100 && code < 200) return "status-1xx";
        if (code >= 200 && code < 300) return "status-2xx";
        if (code >= 300 && code < 400) return "status-3xx";
        if (code >= 400 && code < 500) return "status-4xx";
        if (code >= 500 && code < 600) return "status-5xx";
        return "";
      }

      // Get category name
      function getCategoryName(code) {
        if (code >= 100 && code < 200) return "信息响应";
        if (code >= 200 && code < 300) return "成功";
        if (code >= 300 && code < 400) return "重定向";
        if (code >= 400 && code < 500) return "客户端错误";
        if (code >= 500 && code < 600) return "服务器错误";
        return "";
      }

      // Filter functions
      window.filterCodes = function () {
        searchQuery = document.getElementById("searchInput").value.toLowerCase();
        renderStatusCodes();
      };

      window.filterByCategory = function (category) {
        currentCategory = category;

        // Update active tab
        document.querySelectorAll(".category-tab").forEach((tab) => {
          tab.classList.toggle("active", tab.dataset.category === category);
        });

        renderStatusCodes();
      };

      window.jumpToCode = function (code) {
        document.getElementById("searchInput").value = code.toString();
        searchQuery = code.toString();
        currentCategory = "all";

        document.querySelectorAll(".category-tab").forEach((tab) => {
          tab.classList.toggle("active", tab.dataset.category === "all");
        });

        renderStatusCodes();

        // Expand the card
        setTimeout(() => {
          const card = document.querySelector(`[data-code="${code}"]`);
          if (card) {
            card.classList.add("expanded");
            card.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      };

      // Toggle card expansion
      window.toggleCard = function (card) {
        card.classList.toggle("expanded");
      };

      // Render status codes
      function renderStatusCodes() {
        const grid = document.getElementById("statusGrid");
        const noResults = document.getElementById("noResults");

        // Filter codes
        let filteredCodes = statusCodes.filter((status) => {
          // Category filter
          if (currentCategory !== "all") {
            const catPrefix = currentCategory.replace("xx", "");
            if (!status.code.toString().startsWith(catPrefix)) {
              return false;
            }
          }

          // Search filter
          if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            return (
              status.code.toString().includes(searchQuery) ||
              status.name.toLowerCase().includes(searchLower) ||
              status.nameCn.includes(searchQuery) ||
              status.brief.toLowerCase().includes(searchLower) ||
              (status.tags && status.tags.some((tag) => tag.toLowerCase().includes(searchLower)))
            );
          }

          return true;
        });

        // Update counts
        updateCounts();

        if (filteredCodes.length === 0) {
          grid.innerHTML = "";
          noResults.style.display = "block";
          return;
        }

        noResults.style.display = "none";

        grid.innerHTML = filteredCodes
          .map((status) => {
            const categoryClass = getCategoryClass(status.code);
            const categoryName = getCategoryName(status.code);

            return `
                    <div class="status-card ${categoryClass}" data-code="${status.code}" onclick="toggleCard(this)">
                        <div class="status-card-header">
                            <span class="status-code">${status.code}</span>
                            <div class="status-info">
                                <div class="status-name">${status.name}</div>
                                <div class="status-brief">${status.nameCn} - ${status.brief}</div>
                            </div>
                            <span class="status-category-badge">${categoryName}</span>
                            <svg class="expand-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </div>
                        <div class="status-card-body">
                            <div class="detail-section">
                                <h4>详细说明</h4>
                                <p>${status.description}</p>
                            </div>
                            ${
                              status.usage
                                ? `
                            <div class="detail-section">
                                <h4>使用场景</h4>
                                <p>${status.usage}</p>
                            </div>
                            `
                                : ""
                            }
                            ${
                              status.tags
                                ? `
                            <div class="detail-section">
                                <h4>标签</h4>
                                <div class="tags">
                                    ${status.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                                </div>
                            </div>
                            `
                                : ""
                            }
                            ${
                              status.example
                                ? `
                            <div class="detail-section">
                                <h4>示例</h4>
                                <div class="code-block"><pre>${escapeHtml(status.example)}</pre></div>
                            </div>
                            `
                                : ""
                            }
                        </div>
                    </div>
                `;
          })
          .join("");
      }

      function updateCounts() {
        document.getElementById("countAll").textContent = statusCodes.length;
        document.getElementById("count1xx").textContent = statusCodes.filter(
          (s) => s.code >= 100 && s.code < 200
        ).length;
        document.getElementById("count2xx").textContent = statusCodes.filter(
          (s) => s.code >= 200 && s.code < 300
        ).length;
        document.getElementById("count3xx").textContent = statusCodes.filter(
          (s) => s.code >= 300 && s.code < 400
        ).length;
        document.getElementById("count4xx").textContent = statusCodes.filter(
          (s) => s.code >= 400 && s.code < 500
        ).length;
        document.getElementById("count5xx").textContent = statusCodes.filter(
          (s) => s.code >= 500 && s.code < 600
        ).length;
      }

      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      // Initialize
      document.addEventListener("DOMContentLoaded", () => {
        loadTheme();
        renderStatusCodes();
      });
    
