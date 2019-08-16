/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/pie_chart_generator.js":
/*!***********************************************!*\
  !*** ./src/components/pie_chart_generator.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PieChartGenerator = PieChartGenerator;
// A lot of this code was based heavily off of Karthik Thota's youtube tutorial "Introduction to d3.js = Pie Chart and Donut Chart"
// Many other videos and static resources were used, but this one had the most influence on the code by far.

// export function PieChartGenerator(csvPath, sector, amount, state, multiplier = 1, skip = 1) {
function PieChartGenerator(state, tax_type) {

    var TOTAL = 0;
    // CIRCLE TIME BABY
    // margin and radius
    var margin = { top: 200, right: 200, bottom: 200, left: 200 },
        height = 1000 - margin.top - margin.bottom,
        width = 1000 - margin.left - margin.right,
        radius = width / 2;

    var colors = d3.scaleOrdinal(d3.schemeDark2);

    // arc generator
    var arc = d3.arc().outerRadius(radius - 10)
    // .innerRadius(0); // for circle
    .innerRadius(radius - 100); // for donut

    var lableArc = d3.arc().outerRadius(radius - 50).innerRadius(radius - 50);

    // pie generator
    var pie = d3.pie()
    // .sort(null)
    .value(function (d) {
        return d.amount;
    });

    // define svg 
    var svg = d3.select("main").append("svg").attr("id", "svg").attr("width", width).attr("height", height).style("display", "flex").style("background", "yellow").append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // import data
    d3.csv("./src/assets/data/FY2018_tax_revenue_detailed.csv").then(function (data) {
        // parse

        data.forEach(function (d, i) {
            debugger;
            if (d.Geo_Name === state) {
                if (d.item === "T00") {
                    TOTAL = d.AMOUNT.split(',').join('') * 1000;
                }
                if (tax_type.includes(d.item)) {
                    d.key = d.Tax_Type;
                    d.amount = d.AMOUNT.split(',').join('') * 1000;
                }
            }
        });

        console.log(d3.format(',')(TOTAL));
        // attempt to nest
        var nestedData = d3.nest().key(function (d) {
            return d.Geo_Name;
        }).rollup(function (v) {
            return d3.sum(v, function (d) {
                return d.amount;
            });
        }).entries(data);

        console.log(JSON.stringify(nestedData));
        // append g elements arc
        var g = svg.selectAll(".arc").data(pie(data))

        // g.exit().remove();  // Throwing this line in to account for there being more g's than the current data set accounts for

        .enter().append("g") // And this line to grow the number of g's to the data set size
        .attr("class", "arc");

        // append the path of the arc
        g.append("path").attr("d", arc).style("fill", function (d) {
            return colors(d.data.key);
        }).on("mouseover", function (ele) {
            console.log(ele);
            h1.text(ele.data.key + " accounts for $" + d3.format(',')(ele.data.amount) + " out of $" + d3.format(',')(TOTAL));
            h2.text("This is " + String(ele.data.amount / TOTAL * 100).slice(0, 5) + "% of the total");
        }).on("mouseout", function (ele) {
            h1.text(state + "'s tax revenue for 2019 was $" + d3.format(',')(TOTAL));
            h2.text("");
        });

        g.append("text").style("fill", function (d) {
            return "black";
        })
        // .ease(d3.easeLinear)
        // .duration(2000)
        .attr("transform", function (d) {
            return "translate(" + lableArc.centroid(d) + ")";
        }).attr("dy", ".5em").text(function (d) {
            return d.data.key;
        }).style("width", "fit-content").style("z-index", "1");
        // .ease(d3.easeLinear)
        // .duration(2000)
        // .attrTween("d", pieTween)

    }).catch(function (error) {
        if (error) throw error;
    });

    var h1 = d3.select("main").append("h1");

    var h2 = d3.select("main").append("h2");

    var pieTween = function pieTween(b) {
        b.innerRadius = 0;
        var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
        return function (t) {
            return arc(i(t));
        };
    };
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pie_chart_generator = __webpack_require__(/*! ./components/pie_chart_generator */ "./src/components/pie_chart_generator.js");

var TOP_LEVEL = ['T01', 'TA1', 'TA3', 'TA4', 'TA5'];
// console.log(total)
var STATE_NAMES = ['United States', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

document.addEventListener("DOMContentLoaded", function () {
    debugger;
    (0, _pie_chart_generator.PieChartGenerator)("United States", TOP_LEVEL);
    // PCG -> csvPath, sector, amout, location, multiplier, skip

    window.chapel_hill = ["./src/assets/data/chapel_hill_2016.csv", 'function', 'revised_budget', 'C-Thrill'];
    window.nc = ["./src/assets/data/NC_Budget_Data_FY2018-Update.csv", "Committee", "Appropriations", "North Carolina", 1, 3];
    window.cali = ["./src/assets/data/california_2019.csv", "StateAgencies", "TotalStateFunds", "California", 1000];
    var root = document.getElementById("root");
    var select = document.createElement("select");
    var stateSelector = function stateSelector(e) {
        debugger;
        var svg = document.getElementById("svg");
        svg.parentNode.removeChild(svg);
        (0, _pie_chart_generator.PieChartGenerator)(e.target.value, TOP_LEVEL);
    };
    STATE_NAMES.forEach(function (state) {
        var option = document.createElement("option");
        option.innerHTML = state;
        option.setAttribute("value", state);
        // option.addEventListener("click", stateSelector(state))
        // option.setAttribute("onclick", stateSelector(state))
        select.appendChild(option);
    });
    select.addEventListener("change", stateSelector);
    root.appendChild(select);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiUGllQ2hhcnRHZW5lcmF0b3IiLCJzdGF0ZSIsInRheF90eXBlIiwiVE9UQUwiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJoZWlnaHQiLCJ3aWR0aCIsInJhZGl1cyIsImNvbG9ycyIsImQzIiwic2NhbGVPcmRpbmFsIiwic2NoZW1lRGFyazIiLCJhcmMiLCJvdXRlclJhZGl1cyIsImlubmVyUmFkaXVzIiwibGFibGVBcmMiLCJwaWUiLCJ2YWx1ZSIsImQiLCJhbW91bnQiLCJzdmciLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwic3R5bGUiLCJjc3YiLCJ0aGVuIiwiZGF0YSIsImZvckVhY2giLCJpIiwiR2VvX05hbWUiLCJpdGVtIiwiQU1PVU5UIiwic3BsaXQiLCJqb2luIiwiaW5jbHVkZXMiLCJrZXkiLCJUYXhfVHlwZSIsImNvbnNvbGUiLCJsb2ciLCJmb3JtYXQiLCJuZXN0ZWREYXRhIiwibmVzdCIsInJvbGx1cCIsInN1bSIsInYiLCJlbnRyaWVzIiwiSlNPTiIsInN0cmluZ2lmeSIsImciLCJzZWxlY3RBbGwiLCJlbnRlciIsIm9uIiwiZWxlIiwiaDEiLCJ0ZXh0IiwiaDIiLCJTdHJpbmciLCJzbGljZSIsImNlbnRyb2lkIiwiY2F0Y2giLCJlcnJvciIsInBpZVR3ZWVuIiwiYiIsImludGVycG9sYXRlIiwic3RhcnRBbmdsZSIsImVuZEFuZ2xlIiwidCIsIlRPUF9MRVZFTCIsIlNUQVRFX05BTUVTIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2luZG93IiwiY2hhcGVsX2hpbGwiLCJuYyIsImNhbGkiLCJyb290IiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50Iiwic3RhdGVTZWxlY3RvciIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImUiLCJ0YXJnZXQiLCJvcHRpb24iLCJpbm5lckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FDOUVnQkEsaUIsR0FBQUEsaUI7QUFKaEI7QUFDQTs7QUFFQTtBQUNPLFNBQVNBLGlCQUFULENBQTJCQyxLQUEzQixFQUFrQ0MsUUFBbEMsRUFBNEM7O0FBRS9DLFFBQUlDLFFBQVEsQ0FBWjtBQUNBO0FBQ0E7QUFDQSxRQUFNQyxTQUFTLEVBQUVDLEtBQUssR0FBUCxFQUFZQyxPQUFPLEdBQW5CLEVBQXdCQyxRQUFRLEdBQWhDLEVBQXFDQyxNQUFNLEdBQTNDLEVBQWY7QUFBQSxRQUNJQyxTQUFTLE9BQU9MLE9BQU9DLEdBQWQsR0FBb0JELE9BQU9HLE1BRHhDO0FBQUEsUUFFSUcsUUFBUSxPQUFPTixPQUFPSSxJQUFk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YUFBVCxDQUF1QixRQUF2QixDQUFmO0FBQ0EsUUFBTUMsZ0JBQWdCLFNBQWhCQSxhQUFnQixJQUFLO0FBQ25CO0FBQ0EsWUFBTTNELE1BQU1rRCxTQUFTTyxjQUFULENBQXdCLEtBQXhCLENBQVo7QUFDQXpELFlBQUk0RCxVQUFKLENBQWVDLFdBQWYsQ0FBMkI3RCxHQUEzQjtBQUNBLG9EQUFrQjhELEVBQUVDLE1BQUYsQ0FBU2xFLEtBQTNCLEVBQWtDbUQsU0FBbEM7QUFDUCxLQUxEO0FBTUFDLGdCQUFZekMsT0FBWixDQUFvQixpQkFBUztBQUN6QixZQUFNd0QsU0FBU2QsU0FBU1EsYUFBVCxDQUF1QixRQUF2QixDQUFmO0FBQ0FNLGVBQU9DLFNBQVAsR0FBbUJ4RixLQUFuQjtBQUNBdUYsZUFBT0UsWUFBUCxDQUFvQixPQUFwQixFQUE2QnpGLEtBQTdCO0FBQ0E7QUFDQTtBQUNBd0IsZUFBT2tFLFdBQVAsQ0FBbUJILE1BQW5CO0FBQ0gsS0FQRDtBQVFBL0QsV0FBT2tELGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDUSxhQUFsQztBQUNBSCxTQUFLVyxXQUFMLENBQWlCbEUsTUFBakI7QUFDSCxDQTFCRCxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIEEgbG90IG9mIHRoaXMgY29kZSB3YXMgYmFzZWQgaGVhdmlseSBvZmYgb2YgS2FydGhpayBUaG90YSdzIHlvdXR1YmUgdHV0b3JpYWwgXCJJbnRyb2R1Y3Rpb24gdG8gZDMuanMgPSBQaWUgQ2hhcnQgYW5kIERvbnV0IENoYXJ0XCJcbi8vIE1hbnkgb3RoZXIgdmlkZW9zIGFuZCBzdGF0aWMgcmVzb3VyY2VzIHdlcmUgdXNlZCwgYnV0IHRoaXMgb25lIGhhZCB0aGUgbW9zdCBpbmZsdWVuY2Ugb24gdGhlIGNvZGUgYnkgZmFyLlxuXG4vLyBleHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3IoY3N2UGF0aCwgc2VjdG9yLCBhbW91bnQsIHN0YXRlLCBtdWx0aXBsaWVyID0gMSwgc2tpcCA9IDEpIHtcbmV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgdGF4X3R5cGUpIHtcblxuICAgIGxldCBUT1RBTCA9IDA7XG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cbiAgICBjb25zdCBjb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lRGFyazIpO1xuXG4gICAgLy8gYXJjIGdlbmVyYXRvclxuICAgIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSAxMClcbiAgICAgICAgLy8gLmlubmVyUmFkaXVzKDApOyAvLyBmb3IgY2lyY2xlXG4gICAgICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSAxMDApIC8vIGZvciBkb251dFxuXG4gICAgY29uc3QgbGFibGVBcmMgPSBkMy5hcmMoKVxuICAgICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gNTApXG4gICAgICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSA1MCk7XG5cbiAgICAvLyBwaWUgZ2VuZXJhdG9yXG4gICAgY29uc3QgcGllID0gZDMucGllKClcbiAgICAgICAgLy8gLnNvcnQobnVsbClcbiAgICAgICAgLnZhbHVlKGQgPT4gZC5hbW91bnQpO1xuXG4gICAgLy8gZGVmaW5lIHN2ZyBcbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCJtYWluXCIpLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAuYXR0cihcImlkXCIsIFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZFwiLCBcInllbGxvd1wiKVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKTtcblxuICAgIC8vIGltcG9ydCBkYXRhXG4gICAgZDMuY3N2KFwiLi9zcmMvYXNzZXRzL2RhdGEvRlkyMDE4X3RheF9yZXZlbnVlX2RldGFpbGVkLmNzdlwiKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIHBhcnNlXG5cbiAgICAgICAgZGF0YS5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkgeyBcbiAgICAgICAgICAgICAgICAgICAgZC5rZXkgPSBkLlRheF9UeXBlO1xuICAgICAgICAgICAgICAgICAgICBkLmFtb3VudCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBjb25zb2xlLmxvZyhkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgIC8vIGF0dGVtcHQgdG8gbmVzdFxuICAgICAgICBjb25zdCBuZXN0ZWREYXRhID0gZDMubmVzdCgpXG4gICAgICAgICAgICAua2V5KGQgPT4gZC5HZW9fTmFtZSlcbiAgICAgICAgICAgIC5yb2xsdXAodiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQzLnN1bSh2LCBkID0+IGQuYW1vdW50KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lbnRyaWVzKGRhdGEpXG5cbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobmVzdGVkRGF0YSkpXG4gICAgICAgIC8vIGFwcGVuZCBnIGVsZW1lbnRzIGFyY1xuICAgICAgICBjb25zdCBnID0gc3ZnLnNlbGVjdEFsbChcIi5hcmNcIilcbiAgICAgICAgICAgIC5kYXRhKHBpZShkYXRhKSlcblxuICAgICAgICAgICAgLy8gZy5leGl0KCkucmVtb3ZlKCk7ICAvLyBUaHJvd2luZyB0aGlzIGxpbmUgaW4gdG8gYWNjb3VudCBmb3IgdGhlcmUgYmVpbmcgbW9yZSBnJ3MgdGhhbiB0aGUgY3VycmVudCBkYXRhIHNldCBhY2NvdW50cyBmb3JcblxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwiZ1wiKSAgLy8gQW5kIHRoaXMgbGluZSB0byBncm93IHRoZSBudW1iZXIgb2YgZydzIHRvIHRoZSBkYXRhIHNldCBzaXplXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYXJjXCIpO1xuXG4gICAgICAgIC8vIGFwcGVuZCB0aGUgcGF0aCBvZiB0aGUgYXJjXG4gICAgICAgIGcuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIGFyYylcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZCA9PiBjb2xvcnMoZC5kYXRhLmtleSkpXG4gICAgICAgICAgICAub24oXCJtb3VzZW92ZXJcIiwgZWxlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlbGUpXG4gICAgICAgICAgICAgICAgaDEudGV4dChlbGUuZGF0YS5rZXkgKyBcIiBhY2NvdW50cyBmb3IgJFwiICsgZDMuZm9ybWF0KCcsJykoZWxlLmRhdGEuYW1vdW50KSArIFwiIG91dCBvZiAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICAgICAgaDIudGV4dChcIlRoaXMgaXMgXCIgKyBTdHJpbmcoKGVsZS5kYXRhLmFtb3VudCAvIFRPVEFMKSAqIDEwMCkuc2xpY2UoMCwgNSkgKyBcIiUgb2YgdGhlIHRvdGFsXCIpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOSB3YXMgJFwiICsgZDMuZm9ybWF0KCcsJykoVE9UQUwpKVxuICAgICAgICAgICAgICAgIGgyLnRleHQoXCJcIilcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGcuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBkID0+IFwiYmxhY2tcIilcbiAgICAgICAgICAgIC8vIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgICAgICAvLyAuZHVyYXRpb24oMjAwMClcbiAgICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGQgPT4geyByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyBsYWJsZUFyYy5jZW50cm9pZChkKSArIFwiKVwiOyB9KVxuICAgICAgICAgICAgLmF0dHIoXCJkeVwiLCBcIi41ZW1cIilcbiAgICAgICAgICAgIC50ZXh0KGQgPT4gZC5kYXRhLmtleSlcbiAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiZml0LWNvbnRlbnRcIilcbiAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCIxXCIpXG4gICAgICAgIC8vIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgIC8vIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAvLyAuYXR0clR3ZWVuKFwiZFwiLCBwaWVUd2VlbilcblxuXG4gICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHsgaWYgKGVycm9yKSB0aHJvdyBlcnJvciB9KVxuXG5cbiAgICBjb25zdCBoMSA9IGQzLnNlbGVjdChcIm1haW5cIilcbiAgICAgICAgLmFwcGVuZChcImgxXCIpXG5cbiAgICBjb25zdCBoMiA9IGQzLnNlbGVjdChcIm1haW5cIilcbiAgICAgICAgLmFwcGVuZChcImgyXCIpXG5cbiAgICBjb25zdCBwaWVUd2VlbiA9IGIgPT4ge1xuICAgICAgICBiLmlubmVyUmFkaXVzID0gMDtcbiAgICAgICAgY29uc3QgaSA9IGQzLmludGVycG9sYXRlKHsgc3RhcnRBbmdsZTogMCwgZW5kQW5nbGU6IDAgfSwgYilcbiAgICAgICAgcmV0dXJuICh0KSA9PiB7IHJldHVybiBhcmMoaSh0KSkgfVxuICAgIH0gICAgXG59XG4iLCJcbmltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmNvbnN0IFRPUF9MRVZFTCA9IFsnVDAxJywgJ1RBMScsICdUQTMnLCAnVEE0JywgJ1RBNSddXG4vLyBjb25zb2xlLmxvZyh0b3RhbClcbmNvbnN0IFNUQVRFX05BTUVTID0gWydVbml0ZWQgU3RhdGVzJywgJ0FsYWJhbWEnLCAnQWxhc2thJywgJ0FyaXpvbmEnLCAnQXJrYW5zYXMnLCAnQ2FsaWZvcm5pYScsICdDb2xvcmFkbycsICdDb25uZWN0aWN1dCcsICdEZWxhd2FyZScsICdGbG9yaWRhJywgJ0dlb3JnaWEnLCAnSGF3YWlpJywgJ0lkYWhvJywgJ0lsbGlub2lzJywgJ0luZGlhbmEnLCAnSW93YScsICdLYW5zYXMnLCAnS2VudHVja3knLCAnTG91aXNpYW5hJywgJ01haW5lJywgJ01hcnlsYW5kJywgJ01hc3NhY2h1c2V0dHMnLCAnTWljaGlnYW4nLCAnTWlubmVzb3RhJywgJ01pc3Npc3NpcHBpJywgJ01pc3NvdXJpJywgJ01vbnRhbmEnLCAnTmVicmFza2EnLCAnTmV2YWRhJywgJ05ldyBIYW1wc2hpcmUnLCAnTmV3IEplcnNleScsICdOZXcgTWV4aWNvJywgJ05ldyBZb3JrJywgJ05vcnRoIENhcm9saW5hJywgJ05vcnRoIERha290YScsICdPaGlvJywgJ09rbGFob21hJywgJ09yZWdvbicsICdQZW5uc3lsdmFuaWEnLCAnUmhvZGUgSXNsYW5kJywgJ1NvdXRoIENhcm9saW5hJywgJ1NvdXRoIERha290YScsICdUZW5uZXNzZWUnLCAnVGV4YXMnLCAnVXRhaCcsICdWZXJtb250JywgJ1ZpcmdpbmlhJywgJ1dhc2hpbmd0b24nLCAnV2VzdCBWaXJnaW5pYScsICdXaXNjb25zaW4nLCAnV3lvbWluZyddXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBkZWJ1Z2dlclxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKFwiVW5pdGVkIFN0YXRlc1wiLCBUT1BfTEVWRUwpXG4gICAgLy8gUENHIC0+IGNzdlBhdGgsIHNlY3RvciwgYW1vdXQsIGxvY2F0aW9uLCBtdWx0aXBsaWVyLCBza2lwXG5cbiAgICB3aW5kb3cuY2hhcGVsX2hpbGwgPSBbXCIuL3NyYy9hc3NldHMvZGF0YS9jaGFwZWxfaGlsbF8yMDE2LmNzdlwiLCAnZnVuY3Rpb24nLCAncmV2aXNlZF9idWRnZXQnLCAnQy1UaHJpbGwnXVxuICAgIHdpbmRvdy5uYyA9IFtcIi4vc3JjL2Fzc2V0cy9kYXRhL05DX0J1ZGdldF9EYXRhX0ZZMjAxOC1VcGRhdGUuY3N2XCIsIFwiQ29tbWl0dGVlXCIsIFwiQXBwcm9wcmlhdGlvbnNcIiwgXCJOb3J0aCBDYXJvbGluYVwiLCAxLCAzXVxuICAgIHdpbmRvdy5jYWxpID0gW1wiLi9zcmMvYXNzZXRzL2RhdGEvY2FsaWZvcm5pYV8yMDE5LmNzdlwiLCBcIlN0YXRlQWdlbmNpZXNcIiwgXCJUb3RhbFN0YXRlRnVuZHNcIiwgXCJDYWxpZm9ybmlhXCIsIDEwMDBdXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKVxuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIilcbiAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gZSA9PiB7XG4gICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmdcIilcbiAgICAgICAgICAgIHN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZylcbiAgICAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKGUudGFyZ2V0LnZhbHVlLCBUT1BfTEVWRUwpXG4gICAgfVxuICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpXG4gICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBzdGF0ZVxuICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4gICAgICAgIC8vIG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4gICAgICAgIC8vIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKVxuICAgIH0pXG4gICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc3RhdGVTZWxlY3RvcilcbiAgICByb290LmFwcGVuZENoaWxkKHNlbGVjdClcbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9