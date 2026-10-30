// @ts-nocheck
// Generated from tools/calculator/inflation-calculator.html
// Source SHA-256: 502efc43285dfe7bd6b5d49db8f69e1834d40772482ad2264caee3178b408450
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Historical annual CPI data (index values).
      // US: BLS CPI-U annual averages 1913-2024 (base 1982-84=100)
      // CN: China NBS CPI, rebased to 1985=100 from annual YoY % changes
      // EU: Eurostat HICP annual averages 2000-2024 (base 2015=100)
      // UK: ONS CPI annual averages 1988-2024 (base 2015=100)
      // JP: Japan Statistics Bureau CPI 1970-2024 (base 2020=100)

      var CPI_DATA = {
        us: {
          name: "美国",
          currency: "USD",
          symbol: "$",
          minYear: 1913,
          maxYear: 2024,
          values: {
            1913: 9.9,
            1914: 10.0,
            1915: 10.1,
            1916: 10.9,
            1917: 12.8,
            1918: 15.1,
            1919: 17.3,
            1920: 20.0,
            1921: 17.9,
            1922: 16.8,
            1923: 17.1,
            1924: 17.1,
            1925: 17.5,
            1926: 17.7,
            1927: 17.4,
            1928: 17.1,
            1929: 17.1,
            1930: 16.7,
            1931: 15.2,
            1932: 13.7,
            1933: 13.0,
            1934: 13.4,
            1935: 13.7,
            1936: 13.9,
            1937: 14.4,
            1938: 14.1,
            1939: 13.9,
            1940: 14.0,
            1941: 14.7,
            1942: 16.3,
            1943: 17.3,
            1944: 17.6,
            1945: 18.0,
            1946: 19.5,
            1947: 22.3,
            1948: 24.1,
            1949: 23.8,
            1950: 24.1,
            1951: 26.0,
            1952: 26.5,
            1953: 26.7,
            1954: 26.9,
            1955: 26.8,
            1956: 27.2,
            1957: 28.1,
            1958: 28.9,
            1959: 29.1,
            1960: 29.6,
            1961: 29.9,
            1962: 30.2,
            1963: 30.6,
            1964: 31.0,
            1965: 31.5,
            1966: 32.4,
            1967: 33.4,
            1968: 34.8,
            1969: 36.7,
            1970: 38.8,
            1971: 40.5,
            1972: 41.8,
            1973: 44.4,
            1974: 49.3,
            1975: 53.8,
            1976: 56.9,
            1977: 60.6,
            1978: 65.2,
            1979: 72.6,
            1980: 82.4,
            1981: 90.9,
            1982: 96.5,
            1983: 99.6,
            1984: 103.9,
            1985: 107.6,
            1986: 109.6,
            1987: 113.6,
            1988: 118.3,
            1989: 124.0,
            1990: 130.7,
            1991: 136.2,
            1992: 140.3,
            1993: 144.5,
            1994: 148.2,
            1995: 152.4,
            1996: 156.9,
            1997: 160.5,
            1998: 163.0,
            1999: 166.6,
            2000: 172.2,
            2001: 177.1,
            2002: 179.9,
            2003: 184.0,
            2004: 188.9,
            2005: 195.3,
            2006: 201.6,
            2007: 207.3,
            2008: 215.3,
            2009: 214.5,
            2010: 218.1,
            2011: 224.9,
            2012: 229.6,
            2013: 232.9,
            2014: 236.7,
            2015: 237.0,
            2016: 240.0,
            2017: 245.1,
            2018: 251.1,
            2019: 255.7,
            2020: 258.8,
            2021: 270.9,
            2022: 292.7,
            2023: 304.7,
            2024: 313.5
          }
        },
        cn: {
          name: "中国",
          currency: "CNY",
          symbol: "¥",
          minYear: 1985,
          maxYear: 2024,
          values: {
            1985: 100.0,
            1986: 106.5,
            1987: 113.9,
            1988: 131.6,
            1989: 151.7,
            1990: 155.5,
            1991: 160.8,
            1992: 170.8,
            1993: 191.1,
            1994: 229.6,
            1995: 259.0,
            1996: 275.9,
            1997: 281.5,
            1998: 279.8,
            1999: 277.2,
            2000: 278.0,
            2001: 279.4,
            2002: 277.8,
            2003: 279.6,
            2004: 289.5,
            2005: 293.9,
            2006: 296.9,
            2007: 308.5,
            2008: 325.8,
            2009: 325.1,
            2010: 334.6,
            2011: 350.2,
            2012: 357.4,
            2013: 364.9,
            2014: 371.5,
            2015: 374.0,
            2016: 377.3,
            2017: 382.5,
            2018: 388.9,
            2019: 394.0,
            2020: 399.4,
            2021: 404.3,
            2022: 408.5,
            2023: 409.6,
            2024: 409.2
          }
        },
        eu: {
          name: "欧元区",
          currency: "EUR",
          symbol: "€",
          minYear: 2000,
          maxYear: 2024,
          values: {
            2000: 78.8,
            2001: 81.1,
            2002: 82.9,
            2003: 84.4,
            2004: 86.3,
            2005: 88.4,
            2006: 90.7,
            2007: 92.9,
            2008: 96.2,
            2009: 96.1,
            2010: 97.7,
            2011: 100.6,
            2012: 103.0,
            2013: 104.5,
            2014: 105.1,
            2015: 105.5,
            2016: 105.8,
            2017: 107.6,
            2018: 109.7,
            2019: 111.1,
            2020: 111.2,
            2021: 114.8,
            2022: 125.2,
            2023: 133.0,
            2024: 136.5
          }
        },
        uk: {
          name: "英国",
          currency: "GBP",
          symbol: "£",
          minYear: 1988,
          maxYear: 2024,
          values: {
            1988: 54.8,
            1989: 58.6,
            1990: 64.1,
            1991: 68.0,
            1992: 70.0,
            1993: 71.0,
            1994: 72.3,
            1995: 74.6,
            1996: 76.1,
            1997: 77.7,
            1998: 79.4,
            1999: 80.4,
            2000: 81.3,
            2001: 82.4,
            2002: 83.4,
            2003: 84.9,
            2004: 86.3,
            2005: 88.0,
            2006: 90.3,
            2007: 92.6,
            2008: 96.0,
            2009: 96.9,
            2010: 100.0,
            2011: 104.5,
            2012: 107.6,
            2013: 110.1,
            2014: 111.6,
            2015: 111.9,
            2016: 113.7,
            2017: 116.8,
            2018: 120.2,
            2019: 122.0,
            2020: 122.8,
            2021: 126.0,
            2022: 139.6,
            2023: 150.8,
            2024: 154.0
          }
        },
        jp: {
          name: "日本",
          currency: "JPY",
          symbol: "¥",
          minYear: 1970,
          maxYear: 2024,
          values: {
            1970: 42.0,
            1971: 44.4,
            1972: 46.4,
            1973: 52.0,
            1974: 63.0,
            1975: 68.1,
            1976: 73.3,
            1977: 78.3,
            1978: 80.9,
            1979: 83.3,
            1980: 89.6,
            1981: 93.5,
            1982: 95.6,
            1983: 97.2,
            1984: 99.3,
            1985: 101.0,
            1986: 100.7,
            1987: 100.5,
            1988: 101.3,
            1989: 103.5,
            1990: 106.9,
            1991: 110.7,
            1992: 112.6,
            1993: 113.9,
            1994: 114.0,
            1995: 113.9,
            1996: 113.9,
            1997: 116.8,
            1998: 117.4,
            1999: 116.8,
            2000: 116.0,
            2001: 115.4,
            2002: 114.4,
            2003: 113.9,
            2004: 113.9,
            2005: 113.2,
            2006: 113.6,
            2007: 113.9,
            2008: 115.9,
            2009: 114.4,
            2010: 113.1,
            2011: 113.0,
            2012: 112.9,
            2013: 113.7,
            2014: 116.9,
            2015: 117.2,
            2016: 116.9,
            2017: 117.5,
            2018: 118.8,
            2019: 119.8,
            2020: 120.0,
            2021: 120.3,
            2022: 123.9,
            2023: 129.6,
            2024: 132.5
          }
        }
      };

      var currentRegion = "us";

      function getRegionData() {
        return CPI_DATA[currentRegion];
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function fmt(num, decimals) {
        var d = decimals === undefined ? 2 : decimals;
        return num.toLocaleString("zh-CN", {
          minimumFractionDigits: d,
          maximumFractionDigits: d
        });
      }

      function updateYearRangeNote() {
        var rd = getRegionData();
        document.getElementById("yearRangeNote").textContent =
          "可用范围：" + rd.minYear + "–" + rd.maxYear;
        document.getElementById("fromYear").min = rd.minYear;
        document.getElementById("fromYear").max = rd.maxYear;
        document.getElementById("toYear").min = rd.minYear;
        document.getElementById("toYear").max = rd.maxYear;
      }

      function getAccentColor() {
        var c = getComputedStyle(document.documentElement).getPropertyValue("--accent-cyan").trim();
        return c && c.length >= 4 ? c : "#00f5d4";
      }

      function drawChart(rd, fromYear, toYear) {
        var chartEl = document.getElementById("cpiChart");
        var startY = Math.min(fromYear, toYear);
        var endY = Math.max(fromYear, toYear);
        var years = [];
        var vals = [];
        for (var y = startY; y <= endY; y++) {
          if (rd.values[y] !== undefined) {
            years.push(y);
            vals.push(rd.values[y]);
          }
        }
        if (years.length < 2) {
          chartEl.innerHTML = "";
          return;
        }
        var minVal = Math.min.apply(null, vals);
        var maxVal = Math.max.apply(null, vals);
        var range = maxVal - minVal || 1;
        var w = 800;
        var h = 160;
        var padTop = 10;
        var padRight = 10;
        var padBottom = 20;
        var padLeft = 0;
        var innerW = w - padLeft - padRight;
        var innerH = h - padTop - padBottom;
        var points = years.map(function (yr, i) {
          return {
            x: padLeft + (i / (years.length - 1)) * innerW,
            y: padTop + innerH - ((vals[i] - minVal) / range) * innerH,
            yr: yr,
            val: vals[i]
          };
        });
        var pathD = points
          .map(function (p, i) {
            return (i === 0 ? "M" : "L") + p.x.toFixed(1) + "," + p.y.toFixed(1);
          })
          .join(" ");
        var lastPt = points[points.length - 1];
        var areaD =
          pathD +
          " L" +
          lastPt.x.toFixed(1) +
          "," +
          (padTop + innerH) +
          " L" +
          padLeft +
          "," +
          (padTop + innerH) +
          " Z";
        var fromPt = points[0];
        var toPt = points[points.length - 1];
        var accentColor = getAccentColor();
        chartEl.innerHTML =
          '<svg viewBox="0 0 ' +
          w +
          " " +
          h +
          '" xmlns="http://www.w3.org/2000/svg">' +
          "<defs>" +
          '<linearGradient id="cpiGrad" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="' +
          accentColor +
          '" stop-opacity="0.3"/>' +
          '<stop offset="100%" stop-color="' +
          accentColor +
          '" stop-opacity="0.02"/>' +
          "</linearGradient>" +
          "</defs>" +
          '<path d="' +
          areaD +
          '" fill="url(#cpiGrad)"/>' +
          '<path d="' +
          pathD +
          '" fill="none" stroke="' +
          accentColor +
          '" stroke-width="2"/>' +
          '<circle cx="' +
          fromPt.x.toFixed(1) +
          '" cy="' +
          fromPt.y.toFixed(1) +
          '" r="4" fill="' +
          accentColor +
          '"/>' +
          '<circle cx="' +
          toPt.x.toFixed(1) +
          '" cy="' +
          toPt.y.toFixed(1) +
          '" r="4" fill="' +
          accentColor +
          '"/>' +
          '<text x="' +
          (fromPt.x + 6).toFixed(1) +
          '" y="' +
          (fromPt.y - 6).toFixed(1) +
          '" fill="' +
          accentColor +
          '" font-size="11" font-family="monospace">' +
          fromPt.yr +
          "</text>" +
          '<text x="' +
          (toPt.x - 30).toFixed(1) +
          '" y="' +
          (toPt.y - 6).toFixed(1) +
          '" fill="' +
          accentColor +
          '" font-size="11" font-family="monospace">' +
          toPt.yr +
          "</text>" +
          "</svg>";

        var sourceMap = {
          us: "美国劳工统计局 BLS CPI-U",
          cn: "中国国家统计局 NBS",
          eu: "欧盟统计局 Eurostat HICP",
          uk: "英国国家统计局 ONS CPI",
          jp: "日本总务省统计局 CPI"
        };
        document.getElementById("chartNote").textContent =
          "数据来源：" + (sourceMap[currentRegion] || "") + "（内置历史数据，仅供参考）";
      }

      function calculate() {
        var rd = getRegionData();
        var amount = parseFloat(document.getElementById("amountInput").value);
        var fromYear = parseInt(document.getElementById("fromYear").value, 10);
        var toYear = parseInt(document.getElementById("toYear").value, 10);

        if (isNaN(amount) || amount <= 0) {
          showStatus("请输入有效金额（大于 0）", "error");
          return;
        }
        if (isNaN(fromYear) || isNaN(toYear)) {
          showStatus("请输入有效年份", "error");
          return;
        }
        if (fromYear < rd.minYear || fromYear > rd.maxYear) {
          showStatus("起始年份超出范围（" + rd.minYear + "–" + rd.maxYear + "）", "error");
          return;
        }
        if (toYear < rd.minYear || toYear > rd.maxYear) {
          showStatus("目标年份超出范围（" + rd.minYear + "–" + rd.maxYear + "）", "error");
          return;
        }

        var cpiFrom = rd.values[fromYear];
        var cpiTo = rd.values[toYear];
        if (cpiFrom === undefined || cpiTo === undefined) {
          showStatus("所选年份暂无 CPI 数据", "error");
          return;
        }

        var equivalent = (amount * cpiTo) / cpiFrom;
        var inflTotal = ((cpiTo - cpiFrom) / cpiFrom) * 100;
        var years = Math.abs(toYear - fromYear);
        var annualRate = years > 0 ? (Math.pow(cpiTo / cpiFrom, 1 / years) - 1) * 100 : 0;
        var powerChange = (cpiFrom / cpiTo - 1) * 100;

        var direction = toYear >= fromYear ? "等值于今日" : "等值于当年";
        document.getElementById("resultLabel").textContent =
          rd.symbol +
          fmt(amount) +
          " (" +
          fromYear +
          " 年) " +
          direction +
          " (" +
          toYear +
          " 年)：";
        document.getElementById("resultCurrencyPrefix").textContent = rd.symbol;
        document.getElementById("resultValue").textContent = fmt(equivalent);

        document.getElementById("metricCpiFrom").textContent = fmt(cpiFrom);
        document.getElementById("metricCpiFromLabel").textContent = fromYear + " 年 CPI";
        document.getElementById("metricCpiTo").textContent = fmt(cpiTo);
        document.getElementById("metricCpiToLabel").textContent = toYear + " 年 CPI";
        document.getElementById("metricInflTotal").textContent =
          (inflTotal >= 0 ? "+" : "") + fmt(inflTotal) + "%";
        document.getElementById("metricInflAnnual").textContent =
          years > 0 ? (annualRate >= 0 ? "+" : "") + fmt(annualRate) + "%/年" : "—";
        document.getElementById("metricPowerChange").textContent =
          (powerChange >= 0 ? "+" : "") + fmt(powerChange) + "%";
        document.getElementById("metricYears").textContent = years + " 年";

        document.getElementById("statFrom").textContent = rd.symbol + fmt(amount);
        document.getElementById("statTo").textContent = rd.symbol + fmt(equivalent);
        document.getElementById("statRate").textContent =
          years > 0 ? (annualRate >= 0 ? "+" : "") + fmt(annualRate) + "%/年" : "—";
        document.getElementById("stats").classList.add("show");

        drawChart(rd, fromYear, toYear);
        document.getElementById("resultBox").classList.add("show");
        showStatus("计算完成", "success");
      }

      document.getElementById("btnCalc").onclick = calculate;

      document.getElementById("btnSwap").onclick = function () {
        var fromEl = document.getElementById("fromYear");
        var toEl = document.getElementById("toYear");
        var tmp = fromEl.value;
        fromEl.value = toEl.value;
        toEl.value = tmp;
      };

      document.getElementById("btnReset").onclick = function () {
        var rd = getRegionData();
        document.getElementById("amountInput").value = "1000";
        document.getElementById("fromYear").value = rd.minYear < 2000 ? 2000 : rd.minYear;
        document.getElementById("toYear").value = rd.maxYear;
        document.getElementById("resultBox").classList.remove("show");
        document.getElementById("stats").classList.remove("show");
        var statusEl = document.getElementById("status");
        statusEl.textContent = "";
        statusEl.className = "status";
      };

      document.getElementById("regionSelect").addEventListener("change", function () {
        currentRegion = this.value;
        updateYearRangeNote();
        var rd = getRegionData();
        var fromEl = document.getElementById("fromYear");
        var toEl = document.getElementById("toYear");
        var fv = parseInt(fromEl.value, 10);
        var tv = parseInt(toEl.value, 10);
        if (isNaN(fv) || fv < rd.minYear) fromEl.value = rd.minYear;
        if (isNaN(fv) || fv > rd.maxYear) fromEl.value = rd.maxYear - 10;
        if (isNaN(tv) || tv < rd.minYear) toEl.value = rd.minYear + 1;
        if (isNaN(tv) || tv > rd.maxYear) toEl.value = rd.maxYear;
        document.getElementById("resultBox").classList.remove("show");
        document.getElementById("stats").classList.remove("show");
        var statusEl = document.getElementById("status");
        statusEl.textContent = "";
        statusEl.className = "status";
      });

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          calculate();
        }
      });

      updateYearRangeNote();

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
    
