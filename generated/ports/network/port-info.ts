// @ts-nocheck
// Generated from tools/network/port-info.html
// Source SHA-256: 00c23e081ea40839a9e5397e9a1d85f97c86cba007ccdfb93bd24ceaa6ed5861
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const ports = [
        { port: 20, name: "FTP-Data", desc: "FTP数据传输", proto: "TCP", cat: "file" },
        { port: 21, name: "FTP", desc: "文件传输协议控制", proto: "TCP", cat: "file" },
        { port: 22, name: "SSH", desc: "安全外壳协议", proto: "TCP", cat: "remote" },
        { port: 23, name: "Telnet", desc: "远程登录服务", proto: "TCP", cat: "remote" },
        { port: 25, name: "SMTP", desc: "简单邮件传输协议", proto: "TCP", cat: "mail" },
        { port: 53, name: "DNS", desc: "域名系统", proto: "TCP/UDP", cat: "web" },
        { port: 67, name: "DHCP-Server", desc: "DHCP服务器", proto: "UDP", cat: "web" },
        { port: 68, name: "DHCP-Client", desc: "DHCP客户端", proto: "UDP", cat: "web" },
        { port: 80, name: "HTTP", desc: "超文本传输协议", proto: "TCP", cat: "web" },
        { port: 110, name: "POP3", desc: "邮局协议版本3", proto: "TCP", cat: "mail" },
        { port: 119, name: "NNTP", desc: "网络新闻传输协议", proto: "TCP", cat: "web" },
        { port: 123, name: "NTP", desc: "网络时间协议", proto: "UDP", cat: "web" },
        { port: 143, name: "IMAP", desc: "互联网消息访问协议", proto: "TCP", cat: "mail" },
        { port: 161, name: "SNMP", desc: "简单网络管理协议", proto: "UDP", cat: "web" },
        { port: 443, name: "HTTPS", desc: "安全超文本传输协议", proto: "TCP", cat: "web" },
        { port: 465, name: "SMTPS", desc: "SMTP over SSL", proto: "TCP", cat: "mail" },
        { port: 587, name: "SMTP-Submit", desc: "SMTP邮件提交", proto: "TCP", cat: "mail" },
        { port: 993, name: "IMAPS", desc: "IMAP over SSL", proto: "TCP", cat: "mail" },
        { port: 995, name: "POP3S", desc: "POP3 over SSL", proto: "TCP", cat: "mail" },
        { port: 1433, name: "MSSQL", desc: "Microsoft SQL Server", proto: "TCP", cat: "db" },
        { port: 1521, name: "Oracle", desc: "Oracle数据库", proto: "TCP", cat: "db" },
        { port: 3306, name: "MySQL", desc: "MySQL数据库", proto: "TCP", cat: "db" },
        { port: 3389, name: "RDP", desc: "Windows远程桌面", proto: "TCP", cat: "remote" },
        { port: 5432, name: "PostgreSQL", desc: "PostgreSQL数据库", proto: "TCP", cat: "db" },
        { port: 5900, name: "VNC", desc: "虚拟网络计算", proto: "TCP", cat: "remote" },
        { port: 6379, name: "Redis", desc: "Redis缓存数据库", proto: "TCP", cat: "db" },
        { port: 8080, name: "HTTP-Alt", desc: "HTTP代理/备用端口", proto: "TCP", cat: "web" },
        { port: 8443, name: "HTTPS-Alt", desc: "HTTPS备用端口", proto: "TCP", cat: "web" },
        { port: 9200, name: "Elasticsearch", desc: "Elasticsearch HTTP", proto: "TCP", cat: "db" },
        { port: 27017, name: "MongoDB", desc: "MongoDB数据库", proto: "TCP", cat: "db" },
        { port: 11211, name: "Memcached", desc: "Memcached缓存", proto: "TCP/UDP", cat: "db" }
      ];

      let currentCategory = "all";

      function renderPorts(list) {
        document.getElementById("portList").innerHTML = list
          .map(
            (p) => `
                <div class="port-card">
                    <div class="port-num">${p.port}</div>
                    <div class="port-name">${p.name}</div>
                    <div class="port-desc">${p.desc}</div>
                    <span class="port-proto">${p.proto}</span>
                </div>
            `
          )
          .join("");
      }

      function search() {
        const query = document.getElementById("searchInput").value.toLowerCase().trim();
        if (!query) {
          document.getElementById("searchResult").innerHTML = "";
          filterCategory(currentCategory);
          return;
        }

        const results = ports.filter(
          (p) =>
            p.port.toString().includes(query) ||
            p.name.toLowerCase().includes(query) ||
            p.desc.toLowerCase().includes(query)
        );

        renderPorts(results);

        if (results.length === 0) {
          document.getElementById("searchResult").innerHTML = `
                    <div class="result">
                        <p>未找到匹配的端口信息。端口 ${query} 可能是非标准端口。</p>
                        <p style="margin-top: 8px; color: #666;">端口范围：0-65535</p>
                        <p style="color: #666;">0-1023: 知名端口 | 1024-49151: 注册端口 | 49152-65535: 动态/私有端口</p>
                    </div>
                `;
        } else {
          document.getElementById("searchResult").innerHTML = "";
        }
      }

      function searchPort(port) {
        document.getElementById("searchInput").value = port;
        search();
      }

      function filterCategory(cat) {
        currentCategory = cat;
        document.querySelectorAll(".cat-tab").forEach((t) => {
          t.classList.toggle(
            "active",
            t.textContent.includes(
              cat === "all"
                ? "全部"
                : cat === "web"
                  ? "Web"
                  : cat === "db"
                    ? "数据库"
                    : cat === "mail"
                      ? "邮件"
                      : cat === "remote"
                        ? "远程"
                        : "文件"
            )
          );
        });

        const filtered = cat === "all" ? ports : ports.filter((p) => p.cat === cat);
        renderPorts(filtered);
      }

      filterCategory("all");
    
