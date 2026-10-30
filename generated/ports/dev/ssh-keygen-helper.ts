// @ts-nocheck
// Generated from tools/dev/ssh-keygen-helper.html
// Source SHA-256: 636a923c2c121fba14a732a4099e083462f715782c0fdf850b9a366f88e8c95e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      /* global BigInt */

      var pubKeyEl = document.getElementById("pubKeyOut");
      var privKeyEl = document.getElementById("privKeyOut");
      var statusEl = document.getElementById("status");
      var fingerprintSection = document.getElementById("fingerprintSection");
      var fingerprintOut = document.getElementById("fingerprintOut");
      var keyTypeEl = document.getElementById("keyType");
      var keyCommentEl = document.getElementById("keyComment");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      /* ── Base64 helpers ── */
      function uint8ToBase64(bytes) {
        var binary = "";
        for (var i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }

      function base64ToUint8(b64) {
        var binary = atob(b64);
        var bytes = new Uint8Array(binary.length);
        for (var i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
      }

      /* ── SSH wire-format helpers ── */
      function encodeSSHString(data) {
        /* Prefix 4-byte big-endian length then data */
        var len = data.length;
        var buf = new Uint8Array(4 + len);
        buf[0] = (len >>> 24) & 0xff;
        buf[1] = (len >>> 16) & 0xff;
        buf[2] = (len >>> 8) & 0xff;
        buf[3] = len & 0xff;
        buf.set(data, 4);
        return buf;
      }

      function encodeSSHText(str) {
        var enc = new TextEncoder();
        return encodeSSHString(enc.encode(str));
      }

      function concatBytes() {
        var args = Array.prototype.slice.call(arguments);
        var total = 0;
        for (var i = 0; i < args.length; i++) {
          total += args[i].length;
        }
        var result = new Uint8Array(total);
        var offset = 0;
        for (var j = 0; j < args.length; j++) {
          result.set(args[j], offset);
          offset += args[j].length;
        }
        return result;
      }

      /* ── Ed25519 public key → OpenSSH authorized_keys line ── */
      function buildEd25519PubKey(rawPub, comment) {
        /* SSH wire format: string("ssh-ed25519") + string(32-byte pub) */
        var typeBytes = encodeSSHText("ssh-ed25519");
        var pubBytes = encodeSSHString(rawPub);
        var blob = concatBytes(typeBytes, pubBytes);
        return "ssh-ed25519 " + uint8ToBase64(blob) + (comment ? " " + comment : "");
      }

      /* ── Ed25519 private key → OpenSSH PEM ── */
      function buildEd25519PrivKey(rawPub, rawPriv, comment) {
        /*
         * OpenSSH private key format:
         * "openssh-key-v1\0"
         * string(ciphername="none")
         * string(kdfname="none")
         * string(kdfoptions="")
         * uint32(number of keys = 1)
         * string(public-key-blob)
         * string(private-key-blob)
         *
         * private-key-blob:
         * uint32(check1) uint32(check2) [same random value]
         * string("ssh-ed25519")
         * string(pub 32 bytes)
         * string(priv 64 bytes = seed||pub)
         * string(comment)
         * padding bytes 1,2,3,...
         */

        var magic = new Uint8Array([
          111, 112, 101, 110, 115, 115, 104, 45, 107, 101, 121, 45, 118, 49, 0
        ]); /* "openssh-key-v1\0" */

        var ciphername = encodeSSHText("none");
        var kdfname = encodeSSHText("none");
        var kdfoptions = encodeSSHString(new Uint8Array(0));
        var numKeys = new Uint8Array([0, 0, 0, 1]);

        /* public key blob */
        var pubBlob = concatBytes(encodeSSHText("ssh-ed25519"), encodeSSHString(rawPub));
        var pubBlobWrapped = encodeSSHString(pubBlob);

        /* private key blob */
        var checkInt = Math.floor(Math.random() * 0xffffffff) >>> 0;
        var check = new Uint8Array([
          (checkInt >>> 24) & 0xff,
          (checkInt >>> 16) & 0xff,
          (checkInt >>> 8) & 0xff,
          checkInt & 0xff
        ]);

        /* Ed25519 private in OpenSSH is seed(32) + pub(32) = 64 bytes */
        var privFull = concatBytes(rawPriv, rawPub);

        var commentBytes = encodeSSHText(comment || "");
        var innerCore = concatBytes(
          check,
          check,
          encodeSSHText("ssh-ed25519"),
          encodeSSHString(rawPub),
          encodeSSHString(privFull),
          commentBytes
        );

        /* pad to blocksize 8 */
        var padLen = (8 - (innerCore.length % 8)) % 8;
        var pad = new Uint8Array(padLen);
        for (var i = 0; i < padLen; i++) {
          pad[i] = i + 1;
        }
        var innerBlob = concatBytes(innerCore, pad);
        var innerWrapped = encodeSSHString(innerBlob);

        var body = concatBytes(
          magic,
          ciphername,
          kdfname,
          kdfoptions,
          numKeys,
          pubBlobWrapped,
          innerWrapped
        );

        var b64 = uint8ToBase64(body);
        var lines = ["-----BEGIN OPENSSH PRIVATE KEY-----"]; // gitleaks:allow -- generated marker, not committed key material
        for (var j = 0; j < b64.length; j += 70) {
          lines.push(b64.slice(j, j + 70));
        }
        lines.push("-----END OPENSSH PRIVATE KEY-----");
        return lines.join("\n") + "\n";
      }

      /* ── RSA helpers ── */
      /* big-endian positive MPI (SSH mpint) */
      function mpiFromBigInt(n) {
        /* convert BigInt to bytes */
        var hex = n.toString(16);
        if (hex.length % 2 !== 0) {
          hex = "0" + hex;
        }
        var bytes = new Uint8Array(hex.length / 2);
        for (var i = 0; i < bytes.length; i++) {
          bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
        }
        /* if high bit set, prepend 0x00 */
        if (bytes[0] & 0x80) {
          var padded = new Uint8Array(bytes.length + 1);
          padded.set(bytes, 1);
          return padded;
        }
        return bytes;
      }

      function encodeSSHMpint(n) {
        return encodeSSHString(mpiFromBigInt(n));
      }

      function b64urlToBigInt(s) {
        var normalized = s.replace(/-/g, "+").replace(/_/g, "/");
        /* add padding if needed */
        while (normalized.length % 4 !== 0) {
          normalized += "=";
        }
        return BigInt(
          "0x" +
            Array.from(base64ToUint8(normalized))
              .map(function (b) {
                return b.toString(16).padStart(2, "0");
              })
              .join("")
        );
      }

      /* Export RSA CryptoKey to OpenSSH authorized_keys line */
      async function buildRsaPubKey(cryptoKey, comment) {
        var jwk = await crypto.subtle.exportKey("jwk", cryptoKey);
        var n = b64urlToBigInt(jwk.n);
        var e = b64urlToBigInt(jwk.e);

        var blob = concatBytes(encodeSSHText("ssh-rsa"), encodeSSHMpint(e), encodeSSHMpint(n));
        return "ssh-rsa " + uint8ToBase64(blob) + (comment ? " " + comment : "");
      }

      /* Export RSA CryptoKey pair to OpenSSH PEM private key */
      async function buildRsaPrivKey(privateKey, publicKey, comment) {
        var pubJwk = await crypto.subtle.exportKey("jwk", publicKey);
        var privJwk = await crypto.subtle.exportKey("jwk", privateKey);

        var n = b64urlToBigInt(pubJwk.n);
        var e = b64urlToBigInt(pubJwk.e);
        var d = b64urlToBigInt(privJwk.d);
        var p = b64urlToBigInt(privJwk.p);
        var q = b64urlToBigInt(privJwk.q);
        var dp = b64urlToBigInt(privJwk.dp);
        var dq = b64urlToBigInt(privJwk.dq);
        var qi = b64urlToBigInt(privJwk.qi);

        var checkInt = Math.floor(Math.random() * 0xffffffff) >>> 0;
        var check = new Uint8Array([
          (checkInt >>> 24) & 0xff,
          (checkInt >>> 16) & 0xff,
          (checkInt >>> 8) & 0xff,
          checkInt & 0xff
        ]);

        var pubBlob = concatBytes(encodeSSHText("ssh-rsa"), encodeSSHMpint(e), encodeSSHMpint(n));
        var pubBlobWrapped = encodeSSHString(pubBlob);

        var commentBytes = encodeSSHText(comment || "");
        var innerCore = concatBytes(
          check,
          check,
          encodeSSHText("ssh-rsa"),
          encodeSSHMpint(n),
          encodeSSHMpint(e),
          encodeSSHMpint(d),
          encodeSSHMpint(p),
          encodeSSHMpint(q),
          encodeSSHMpint(dp),
          encodeSSHMpint(dq),
          encodeSSHMpint(qi),
          commentBytes
        );

        var padLen = (8 - (innerCore.length % 8)) % 8;
        var pad = new Uint8Array(padLen);
        for (var i = 0; i < padLen; i++) {
          pad[i] = i + 1;
        }
        var innerBlob = concatBytes(innerCore, pad);

        var magic = new Uint8Array([
          111, 112, 101, 110, 115, 115, 104, 45, 107, 101, 121, 45, 118, 49, 0
        ]);
        var ciphername = encodeSSHText("none");
        var kdfname = encodeSSHText("none");
        var kdfoptions = encodeSSHString(new Uint8Array(0));
        var numKeys = new Uint8Array([0, 0, 0, 1]);

        var body = concatBytes(
          magic,
          ciphername,
          kdfname,
          kdfoptions,
          numKeys,
          pubBlobWrapped,
          encodeSSHString(innerBlob)
        );

        var b64 = uint8ToBase64(body);
        var lines = ["-----BEGIN OPENSSH PRIVATE KEY-----"]; // gitleaks:allow -- generated marker, not committed key material
        for (var j = 0; j < b64.length; j += 70) {
          lines.push(b64.slice(j, j + 70));
        }
        lines.push("-----END OPENSSH PRIVATE KEY-----");
        return lines.join("\n") + "\n";
      }

      /* ── Fingerprint ── */
      async function computeFingerprint(pubLine) {
        /* Extract the base64 blob portion */
        var parts = pubLine.trim().split(/\s+/);
        if (parts.length < 2) return "";
        var normalized = parts[1];
        /* add padding if needed */
        while (normalized.length % 4 !== 0) {
          normalized += "=";
        }
        var blob = base64ToUint8(normalized);
        var hash = await crypto.subtle.digest("SHA-256", blob);
        var b64 = uint8ToBase64(new Uint8Array(hash)).replace(/=/g, "");
        return "SHA256:" + b64;
      }

      /* ── Download helper ── */
      function downloadText(filename, text) {
        var blob = new Blob([text], { type: "text/plain" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      /* ── Generate ── */
      document.getElementById("btnGenerate").onclick = async function () {
        var btn = document.getElementById("btnGenerate");
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> 生成中...';
        showStatus("", "");
        pubKeyEl.value = "";
        privKeyEl.value = "";
        fingerprintSection.style.display = "none";

        var type = keyTypeEl.value;
        var comment = keyCommentEl.value.trim() || "user@webutils";

        try {
          var pubLine;
          var privPem;

          if (type === "ed25519") {
            var keyPair = await crypto.subtle.generateKey({ name: "Ed25519" }, true, [
              "sign",
              "verify"
            ]);
            var rawPub = new Uint8Array(await crypto.subtle.exportKey("raw", keyPair.publicKey));
            /* Ed25519 seed via PKCS8 export: bytes 16..47 of the DER */
            var pkcs8 = new Uint8Array(await crypto.subtle.exportKey("pkcs8", keyPair.privateKey));
            /* PKCS8 for Ed25519: fixed header of 16 bytes, then 34-byte OCTET STRING wrapping 32-byte seed */
            /* offset 16 = SEQUENCE(34) { OCTET STRING(32) { seed } } → skip 2 more bytes for tag+len */
            var seed = pkcs8.slice(16 + 2, 16 + 2 + 32);

            pubLine = buildEd25519PubKey(rawPub, comment);
            privPem = buildEd25519PrivKey(rawPub, seed, comment);
          } else {
            var bits = type === "rsa4096" ? 4096 : 2048;
            var rsaPair = await crypto.subtle.generateKey(
              {
                name: "RSASSA-PKCS1-v1_5",
                modulusLength: bits,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: "SHA-256"
              },
              true,
              ["sign", "verify"]
            );
            pubLine = await buildRsaPubKey(rsaPair.publicKey, comment);
            privPem = await buildRsaPrivKey(rsaPair.privateKey, rsaPair.publicKey, comment);
          }

          pubKeyEl.value = pubLine;
          privKeyEl.value = privPem;

          var fp = await computeFingerprint(pubLine);
          fingerprintOut.textContent = fp;
          fingerprintSection.style.display = "";

          showStatus("密钥对生成成功", "success");
        } catch (err) {
          showStatus("生成失败: " + err.message, "error");
        } finally {
          btn.disabled = false;
          btn.textContent = "生成密钥对";
        }
      };

      /* ── Copy ── */
      document.getElementById("btnCopyPub").onclick = async function () {
        if (!pubKeyEl.value) {
          showStatus("尚未生成密钥", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(pubKeyEl.value);
          showStatus("公钥已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnCopyPriv").onclick = async function () {
        if (!privKeyEl.value) {
          showStatus("尚未生成密钥", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(privKeyEl.value);
          showStatus("私钥已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      /* ── Download ── */
      document.getElementById("btnDownloadPub").onclick = function () {
        if (!pubKeyEl.value) {
          showStatus("尚未生成密钥", "error");
          return;
        }
        var typeVal = keyTypeEl.value.replace(/\d+$/, "");
        downloadText("id_" + typeVal + ".pub", pubKeyEl.value);
        showStatus("公钥已下载", "success");
      };

      document.getElementById("btnDownloadPriv").onclick = function () {
        if (!privKeyEl.value) {
          showStatus("尚未生成密钥", "error");
          return;
        }
        var typeVal = keyTypeEl.value.replace(/\d+$/, "");
        downloadText("id_" + typeVal, privKeyEl.value);
        showStatus("私钥已下载", "success");
      };

      /* ── Clear ── */
      document.getElementById("btnClear").onclick = function () {
        pubKeyEl.value = "";
        privKeyEl.value = "";
        fingerprintSection.style.display = "none";
        fingerprintOut.textContent = "";
        statusEl.textContent = "";
        statusEl.className = "status";
      };

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
