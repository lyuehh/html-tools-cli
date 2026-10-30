// @ts-nocheck
// Generated from tools/text/richtext-to-plain.html
// Source SHA-256: 94578965a4b8ae8b2a8aea1f45e0f0ba44560c5f29497b9ec7d085fd16d51839
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme");
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Load saved theme
      (function () {
        var savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      function showMessage(msg, isError) {
        var messageDiv = document.getElementById("message");
        var p = document.createElement("p");
        p.className = isError ? "error" : "success-msg";
        p.textContent = msg;
        messageDiv.textContent = "";
        messageDiv.appendChild(p);
        setTimeout(function () {
          messageDiv.textContent = "";
        }, 3000);
      }

      window.clearAll = function () {
        document.getElementById("richInput").innerHTML = "";
        document.getElementById("plainOutput").value = "";
        document.getElementById("htmlPreview").textContent = "";
        updateCounts();
        updateStats("");
      };

      window.copyResult = function () {
        var output = document.getElementById("plainOutput");
        if (!output.value) {
          showMessage("没有可复制的内容", true);
          return;
        }
        navigator.clipboard
          .writeText(output.value)
          .then(function () {
            showMessage("已复制到剪贴板", false);
          })
          .catch(function () {
            showMessage("复制失败", true);
          });
      };

      window.pasteFromClipboard = function () {
        navigator.clipboard
          .read()
          .then(function (clipboardItems) {
            for (var i = 0; i < clipboardItems.length; i++) {
              var item = clipboardItems[i];

              // Try HTML first
              if (item.types.indexOf("text/html") >= 0) {
                item.getType("text/html").then(function (blob) {
                  blob.text().then(function (html) {
                    document.getElementById("richInput").innerHTML = html;
                    convert();
                  });
                });
                return;
              }

              // Fall back to plain text
              if (item.types.indexOf("text/plain") >= 0) {
                item.getType("text/plain").then(function (blob) {
                  blob.text().then(function (text) {
                    document.getElementById("richInput").textContent = text;
                    convert();
                  });
                });
                return;
              }
            }
          })
          .catch(function () {
            // Fallback for browsers that don't support clipboard.read()
            navigator.clipboard
              .readText()
              .then(function (text) {
                document.getElementById("richInput").textContent = text;
                convert();
              })
              .catch(function (err) {
                showMessage("无法访问剪贴板: " + err.message, true);
              });
          });
      };

      window.loadHtml = function () {
        var html = prompt("请输入HTML代码:");
        if (html) {
          document.getElementById("richInput").innerHTML = html;
          convert();
        }
      };

      function updateCounts() {
        var richInput = document.getElementById("richInput");
        var plainOutput = document.getElementById("plainOutput");

        document.getElementById("inputCount").textContent = richInput.textContent.length + " 字符";
        document.getElementById("outputCount").textContent = plainOutput.value.length + " 字符";
      }

      function updateStats(text) {
        // Character count
        document.getElementById("statChars").textContent = text.length;

        // Characters without spaces
        var noSpaces = text.replace(/\s/g, "");
        document.getElementById("statCharsNoSpace").textContent = noSpaces.length;

        // Word count (for Chinese, count characters; for English, count words)
        var chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
        var englishWords = text.match(/[a-zA-Z]+/g) || [];
        document.getElementById("statWords").textContent =
          chineseChars.length + englishWords.length;

        // Line count
        var lines = text.split("\n");
        document.getElementById("statLines").textContent = lines.length;

        // Paragraph count (non-empty lines separated by empty lines)
        var paragraphs = text.split(/\n\s*\n/).filter(function (p) {
          return p.trim().length > 0;
        });
        document.getElementById("statParagraphs").textContent = Math.max(
          paragraphs.length,
          text.trim() ? 1 : 0
        );
      }

      // HTML to plain text converter
      function htmlToPlainText(html) {
        var options = {
          preserveLineBreaks: document.getElementById("optPreserveLineBreaks").checked,
          preserveLists: document.getElementById("optPreserveLists").checked,
          preserveLinks: document.getElementById("optPreserveLinks").checked,
          removeExtraSpaces: document.getElementById("optRemoveExtraSpaces").checked,
          trimLines: document.getElementById("optTrimLines").checked,
          removeEmptyLines: document.getElementById("optRemoveEmptyLines").checked,
          preserveTables: document.getElementById("optPreserveTables").checked
        };

        // Create a temporary element to parse HTML
        var temp = document.createElement("div");
        temp.innerHTML = html;

        // Process the content
        var result = processNode(temp, options);

        // Post-processing
        if (options.removeExtraSpaces) {
          result = result.replace(/[ \t]+/g, " ");
        }

        if (options.trimLines) {
          result = result
            .split("\n")
            .map(function (line) {
              return line.trim();
            })
            .join("\n");
        }

        if (options.removeEmptyLines) {
          result = result.replace(/\n\s*\n/g, "\n");
        } else {
          // Collapse multiple blank lines to maximum 2
          result = result.replace(/\n{3,}/g, "\n\n");
        }

        return result.trim();
      }

      function processNode(node, options) {
        var result = "";

        for (var i = 0; i < node.childNodes.length; i++) {
          var child = node.childNodes[i];

          if (child.nodeType === Node.TEXT_NODE) {
            result += child.textContent;
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            var tagName = child.tagName.toLowerCase();

            // Skip hidden elements
            if (
              child.style &&
              (child.style.display === "none" || child.style.visibility === "hidden")
            ) {
              continue;
            }

            // Skip script and style
            if (tagName === "script" || tagName === "style" || tagName === "noscript") {
              continue;
            }

            // Handle different elements
            switch (tagName) {
              case "br":
                if (options.preserveLineBreaks) {
                  result += "\n";
                }
                break;

              case "p":
              case "div":
              case "section":
              case "article":
              case "header":
              case "footer":
              case "main":
              case "aside":
                var content = processNode(child, options);
                if (content.trim()) {
                  if (result && !result.endsWith("\n")) {
                    result += "\n";
                  }
                  result += content;
                  if (options.preserveLineBreaks) {
                    result += "\n";
                  }
                }
                break;

              case "h1":
              case "h2":
              case "h3":
              case "h4":
              case "h5":
              case "h6":
                var headingContent = processNode(child, options);
                if (headingContent.trim()) {
                  if (result && !result.endsWith("\n")) {
                    result += "\n";
                  }
                  result += headingContent.toUpperCase();
                  if (options.preserveLineBreaks) {
                    result += "\n\n";
                  }
                }
                break;

              case "ul":
              case "ol":
                if (options.preserveLists) {
                  if (result && !result.endsWith("\n")) {
                    result += "\n";
                  }
                  result += processList(child, options, tagName === "ol", 0);
                } else {
                  result += processNode(child, options);
                }
                break;

              case "li":
                result += processNode(child, options);
                break;

              case "a":
                var linkText = processNode(child, options);
                if (options.preserveLinks) {
                  var href = child.getAttribute("href");
                  if (
                    href &&
                    href !== linkText &&
                    !href.startsWith("#") &&
                    !href.startsWith("javascript:")
                  ) {
                    result += linkText + " (" + href + ")";
                  } else {
                    result += linkText;
                  }
                } else {
                  result += linkText;
                }
                break;

              case "img":
                var alt = child.getAttribute("alt");
                if (alt) {
                  result += "[图片: " + alt + "]";
                }
                break;

              case "table":
                if (options.preserveTables) {
                  if (result && !result.endsWith("\n")) {
                    result += "\n";
                  }
                  result += processTable(child, options);
                } else {
                  result += processNode(child, options);
                }
                break;

              case "tr":
              case "td":
              case "th":
              case "thead":
              case "tbody":
              case "tfoot":
                result += processNode(child, options);
                break;

              case "blockquote":
                var quoteContent = processNode(child, options);
                if (quoteContent.trim()) {
                  var quoteLines = quoteContent
                    .split("\n")
                    .map(function (line) {
                      return "> " + line;
                    })
                    .join("\n");
                  if (result && !result.endsWith("\n")) {
                    result += "\n";
                  }
                  result += quoteLines + "\n";
                }
                break;

              case "pre":
              case "code":
                result += child.textContent;
                if (tagName === "pre" && options.preserveLineBreaks) {
                  result += "\n";
                }
                break;

              case "hr":
                if (result && !result.endsWith("\n")) {
                  result += "\n";
                }
                result += "---\n";
                break;

              default:
                result += processNode(child, options);
            }
          }
        }

        return result;
      }

      function processList(listNode, options, isOrdered, depth) {
        var result = "";
        var counter = 1;
        var indent = "";
        for (var d = 0; d < depth; d++) {
          indent += "  ";
        }

        for (var i = 0; i < listNode.children.length; i++) {
          var child = listNode.children[i];
          if (child.tagName.toLowerCase() === "li") {
            var prefix = isOrdered ? counter + ". " : "- ";
            var content = "";

            for (var j = 0; j < child.childNodes.length; j++) {
              var liChild = child.childNodes[j];
              if (liChild.nodeType === Node.TEXT_NODE) {
                content += liChild.textContent.trim();
              } else if (liChild.nodeType === Node.ELEMENT_NODE) {
                var liTagName = liChild.tagName.toLowerCase();
                if (liTagName === "ul" || liTagName === "ol") {
                  // Nested list
                  if (content.trim()) {
                    result += indent + prefix + content.trim() + "\n";
                    content = "";
                  }
                  result += processList(liChild, options, liTagName === "ol", depth + 1);
                } else {
                  content += processNode(liChild, options);
                }
              }
            }

            if (content.trim()) {
              result += indent + prefix + content.trim() + "\n";
            }
            counter++;
          }
        }

        return result;
      }

      function processTable(tableNode, options) {
        var rows = [];
        var maxCols = 0;

        // Extract all rows
        var trElements = tableNode.querySelectorAll("tr");
        for (var i = 0; i < trElements.length; i++) {
          var tr = trElements[i];
          var row = [];
          var cells = tr.querySelectorAll("td, th");
          for (var j = 0; j < cells.length; j++) {
            row.push(processNode(cells[j], options).trim());
          }
          if (row.length > 0) {
            rows.push(row);
            maxCols = Math.max(maxCols, row.length);
          }
        }

        if (rows.length === 0) return "";

        // Calculate column widths
        var colWidths = [];
        for (var c = 0; c < maxCols; c++) {
          var maxWidth = 0;
          for (var r = 0; r < rows.length; r++) {
            if (rows[r][c]) {
              maxWidth = Math.max(maxWidth, rows[r][c].length);
            }
          }
          colWidths.push(Math.max(maxWidth, 3));
        }

        // Build table string
        var result = "";

        for (var r = 0; r < rows.length; r++) {
          var line = "| ";
          for (var c = 0; c < maxCols; c++) {
            var cell = rows[r][c] || "";
            var padding = colWidths[c] - cell.length;
            line += cell;
            for (var p = 0; p < padding; p++) {
              line += " ";
            }
            line += " | ";
          }
          result += line.trim() + "\n";

          // Add separator after header row
          if (r === 0) {
            var separator = "| ";
            for (var c = 0; c < maxCols; c++) {
              for (var w = 0; w < colWidths[c]; w++) {
                separator += "-";
              }
              separator += " | ";
            }
            result += separator.trim() + "\n";
          }
        }

        return result;
      }

      function convert() {
        var richInput = document.getElementById("richInput");
        var plainOutput = document.getElementById("plainOutput");
        var htmlPreview = document.getElementById("htmlPreview");

        var html = richInput.innerHTML;

        if (!html.trim()) {
          showMessage("请输入内容", true);
          return;
        }

        try {
          var plainText = htmlToPlainText(html);
          plainOutput.value = plainText;
          htmlPreview.textContent = html;

          updateCounts();
          updateStats(plainText);

          showMessage("转换成功", false);
        } catch (e) {
          showMessage("转换错误: " + e.message, true);
        }
      }

      // Drag and drop handling
      var dropZone = document.getElementById("dropZone");
      var richInput = document.getElementById("richInput");

      dropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });

      dropZone.addEventListener("dragleave", function (e) {
        e.preventDefault();
        dropZone.classList.remove("dragover");
      });

      dropZone.addEventListener("drop", function (e) {
        e.preventDefault();
        dropZone.classList.remove("dragover");

        var files = e.dataTransfer.files;
        var items = e.dataTransfer.items;

        // Check for HTML content
        if (items) {
          for (var i = 0; i < items.length; i++) {
            if (items[i].type === "text/html") {
              items[i].getAsString(function (html) {
                richInput.innerHTML = html;
                convert();
              });
              return;
            }
          }
        }

        // Handle file drop
        if (files.length > 0) {
          var file = files[0];
          var reader = new FileReader();

          reader.onload = function (event) {
            var content = event.target.result;

            if (
              file.type === "text/html" ||
              file.name.endsWith(".html") ||
              file.name.endsWith(".htm")
            ) {
              richInput.innerHTML = content;
            } else {
              richInput.textContent = content;
            }

            convert();
          };

          reader.readAsText(file);
        }
      });

      // Auto-convert on input (debounced)
      var timeout;
      richInput.addEventListener("input", function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          if (richInput.innerHTML.trim()) {
            convert();
          } else {
            updateCounts();
          }
        }, 500);
      });

      // Handle paste events
      richInput.addEventListener("paste", function (e) {
        // Let the paste happen, then convert
        setTimeout(function () {
          convert();
        }, 100);
      });

      // Option change handlers
      var optionCheckboxes = document.querySelectorAll('.option-group input[type="checkbox"]');
      optionCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
          if (richInput.innerHTML.trim()) {
            convert();
          }
        });
      });

      // Initial count update
      updateCounts();
      updateStats("");
    
