// @ts-nocheck
// Generated from tools/generator/license-generator.html
// Source SHA-256: de79c0a1bcad7f636e286e6fcc703fd62d9c52d6590fb3d791d042fd6c027dff
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      document.getElementById("year").value = new Date().getFullYear();
      const licenses = {
        mit: `MIT License

Copyright (c) {year} {author}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
        apache: `Apache License 2.0

Copyright {year} {author}

Licensed under the Apache License, Version 2.0...`,
        gpl3: `GNU GENERAL PUBLIC LICENSE Version 3

Copyright (C) {year} {author}

This program is free software...`,
        bsd3: `BSD 3-Clause License

Copyright (c) {year}, {author}
All rights reserved...`,
        isc: `ISC License

Copyright (c) {year}, {author}

Permission to use, copy, modify...`
      };
      function generate() {
        const license = document.getElementById("license").value;
        const year = document.getElementById("year").value || new Date().getFullYear();
        const author = document.getElementById("author").value || "[Author Name]";
        const text = licenses[license].replace(/{year}/g, year).replace(/{author}/g, author);
        document.getElementById("output").textContent = text;
      }
      function copy() {
        navigator.clipboard.writeText(document.getElementById("output").textContent);
        document.querySelector(".copy-btn").textContent = "已复制!";
        setTimeout(() => (document.querySelector(".copy-btn").textContent = "复制协议"), 1500);
      }
      document.getElementById("year").addEventListener("input", generate);
      document.getElementById("author").addEventListener("input", generate);
      generate();
    
