// @ts-nocheck
// Generated from tools/network/port-lookup.html
// Source SHA-256: 5a41cfc7a08fa0038cfc8b991e0ef9e43c96f207d659968fe610a3bc4b8cecc3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const ports = [
        { port: 20, proto: "TCP", svc: "FTP-Data", desc: "FTP数据传输", cat: "file" },
        { port: 21, proto: "TCP", svc: "FTP", desc: "FTP控制连接", cat: "file" },
        { port: 22, proto: "TCP", svc: "SSH", desc: "安全远程登录", cat: "remote" },
        { port: 23, proto: "TCP", svc: "Telnet", desc: "远程终端(不安全)", cat: "remote" },
        { port: 25, proto: "TCP", svc: "SMTP", desc: "邮件传输", cat: "mail" },
        { port: 53, proto: "TCP/UDP", svc: "DNS", desc: "域名解析", cat: "web" },
        { port: 80, proto: "TCP", svc: "HTTP", desc: "Web服务", cat: "web" },
        { port: 110, proto: "TCP", svc: "POP3", desc: "邮件接收", cat: "mail" },
        { port: 143, proto: "TCP", svc: "IMAP", desc: "邮件访问", cat: "mail" },
        { port: 443, proto: "TCP", svc: "HTTPS", desc: "安全Web服务", cat: "web" },
        { port: 445, proto: "TCP", svc: "SMB", desc: "Windows文件共享", cat: "file" },
        { port: 465, proto: "TCP", svc: "SMTPS", desc: "SMTP over SSL", cat: "mail" },
        { port: 587, proto: "TCP", svc: "SMTP", desc: "邮件提交", cat: "mail" },
        { port: 993, proto: "TCP", svc: "IMAPS", desc: "IMAP over SSL", cat: "mail" },
        { port: 995, proto: "TCP", svc: "POP3S", desc: "POP3 over SSL", cat: "mail" },
        { port: 1433, proto: "TCP", svc: "MSSQL", desc: "SQL Server", cat: "db" },
        { port: 1521, proto: "TCP", svc: "Oracle", desc: "Oracle数据库", cat: "db" },
        { port: 3000, proto: "TCP", svc: "Dev", desc: "开发服务器", cat: "web" },
        { port: 3306, proto: "TCP", svc: "MySQL", desc: "MySQL数据库", cat: "db" },
        { port: 3389, proto: "TCP", svc: "RDP", desc: "Windows远程桌面", cat: "remote" },
        { port: 5432, proto: "TCP", svc: "PostgreSQL", desc: "PostgreSQL数据库", cat: "db" },
        { port: 5900, proto: "TCP", svc: "VNC", desc: "远程桌面", cat: "remote" },
        { port: 6379, proto: "TCP", svc: "Redis", desc: "Redis缓存", cat: "db" },
        { port: 8080, proto: "TCP", svc: "HTTP-Alt", desc: "HTTP备用", cat: "web" },
        { port: 8443, proto: "TCP", svc: "HTTPS-Alt", desc: "HTTPS备用", cat: "web" },
        { port: 9200, proto: "TCP", svc: "Elasticsearch", desc: "ES HTTP", cat: "db" },
        { port: 27017, proto: "TCP", svc: "MongoDB", desc: "MongoDB数据库", cat: "db" }
      ];
      let curCat = "all";
      function render(data) {
        document.getElementById("tbody").innerHTML = data
          .map(
            (p) =>
              '<tr><td><span class="port-num">' +
              p.port +
              '</span></td><td><span class="protocol">' +
              p.proto +
              "</span></td><td>" +
              p.svc +
              "</td><td>" +
              p.desc +
              "</td></tr>"
          )
          .join("");
        document.getElementById("count").textContent = "共 " + data.length + " 条";
      }
      function filter() {
        const q = document.getElementById("search").value.toLowerCase();
        let d = ports;
        if (curCat !== "all") d = d.filter((p) => p.cat === curCat);
        if (q)
          d = d.filter(
            (p) =>
              String(p.port).includes(q) || p.svc.toLowerCase().includes(q) || p.desc.includes(q)
          );
        render(d);
      }
      document.querySelectorAll(".cat-btn").forEach((b) => {
        b.onclick = function () {
          document.querySelectorAll(".cat-btn").forEach((x) => x.classList.remove("active"));
          this.classList.add("active");
          curCat = this.dataset.cat;
          filter();
        };
      });
      document.getElementById("search").addEventListener("input", filter);
      render(ports);
      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
