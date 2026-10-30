// @ts-nocheck
// Generated from tools/network/ip-lookup.html
// Source SHA-256: f5ed7961df9763fe199f4c0e405c777949106d27d0d1817838502977e21178f0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      fetch("https://api.ipify.org?format=json")
        .then((r) => r.json())
        .then((d) => {
          document.getElementById("myIp").textContent = d.ip;
          document.getElementById("ip").value = d.ip;
          lookup();
        })
        .catch(() => (document.getElementById("myIp").textContent = "获取失败"));
      function lookup() {
        const ip = document.getElementById("ip").value.trim();
        if (!ip) return;
        document.getElementById("results").innerHTML = '<div class="loading">查询中...</div>';
        fetch("https://ipapi.co/" + ip + "/json/")
          .then((r) => r.json())
          .then((d) => {
            if (d.error) throw new Error(d.reason);
            document.getElementById("results").innerHTML = [
              ["IP", d.ip],
              ["城市", d.city],
              ["地区", d.region],
              ["国家", d.country_name],
              ["ISP", d.org],
              ["时区", d.timezone],
              ["经纬度", d.latitude + ", " + d.longitude]
            ]
              .map(
                ([k, v]) =>
                  '<div class="result-row"><span>' +
                  k +
                  "</span><span>" +
                  (v || "-") +
                  "</span></div>"
              )
              .join("");
          })
          .catch(
            (e) =>
              (document.getElementById("results").innerHTML =
                '<div class="loading">查询失败: ' + e.message + "</div>")
          );
      }
    
