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
/******/ 	__webpack_require__.p = "/dist/";
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
// The legend code was from Crypters Infotech's youtube tutorial "Pie Chart using D3.js"
var COLORS = exports.COLORS = ["#a6751e", "#e7ab04", "#66a51e", "#7470b3", "#e82b8a"];
// export const LABELS = ["Property Taxes", "Sales and Gross Receipts Taxes", "License Taxes", "Income Taxes", "Other Taxes"]
var LABELS = exports.LABELS = ["Other Taxes", "Income Taxes", "License Taxes", "Property Taxes", "Sales and Gross Receipts Taxes"];
// export function PieChartGenerator(csvPath, sector, amount, state, multiplier = 1, skip = 1) {
function PieChartGenerator(state, tax_type, pie_num) {

    var TOTAL = 0;
    var TYPES = [];
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

    // const lableArc = d3.arc()
    //     .outerRadius(radius - 50)
    //     .innerRadius(radius - 50);

    // pie generator
    var pie = d3.pie()
    // .sort(null)
    .value(function (d) {
        return d.amount;
    });

    // define svg 
    var svg = d3.select(".pie-" + pie_num).append("svg").attr("id", "svg-" + pie_num).attr("class", "svg-" + pie_num).attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // import data
    d3.csv("./src/assets/data/FY2018_tax_revenue_detailed.csv").then(function (data) {
        // parse

        data.forEach(function (d, i) {

            if (d.Geo_Name === state) {
                if (d.item === "T00") {
                    TOTAL = d.AMOUNT.split(',').join('') * 1000;
                }

                if (tax_type.includes(d.item)) {
                    TYPES.push({
                        key: d.Tax_Type,
                        amount: d.AMOUNT.split(',').join('') * 1000
                    });
                    d.key = d.Tax_Type;
                    d.amount = d.AMOUNT.split(',').join('') * 1000;
                }
            }
        });

        var g = svg.selectAll(".arc").data(pie(data)).enter().append("g") // And this line to grow the number of g's to the data set size
        .attr("class", "arc").style("display", function (d, i) {
            return d.value === TOTAL ? "none" : "null";
        }); // attempt to render half the chart invisible

        // append the path of the arc
        g.append("path").attr("d", arc).style("fill", function (d) {
            return colors(d.data.key);
        });

        if (pie_num === 2) {
            // flip the second pie
            g.style("transform", "scaleX(-1)");
        }
        // event handlers
        g.on("mouseover", function (ele) {
            console.log(ele);
            h1.text(ele.data.key + " accounts for $" + d3.format(',')(ele.data.amount) + " out of $" + d3.format(',')(TOTAL));
            h2.text("This is " + String(ele.data.amount / TOTAL * 100).slice(0, 5) + "% of the total");
        }).on("mouseout", function (ele) {
            h1.text(state + "'s tax revenue for 2019 was $" + d3.format(',')(TOTAL));
            h2.text("");
        });

        var legends = svg.append("g").attr("transform", "translate(0, -50)").selectAll(".legends").data(TYPES);

        var legend = legends.enter().append("g").classed("legends", true).attr("transform", function (d, i) {
            return "translate(0," + (i + 1) * 30 + ")";
        });
        legend.append("rect").attr("width", 20).attr("height", 20);

        debugger;
        legend.attr("fill", function (d, i) {
            return i ? COLORS[i - 1] : null;
        }).attr("display", function (d, i) {
            return i ? "null" : "none";
        });

        legend.append("text").classed("label", true).text(function (d, i) {
            return LABELS[i - 1];
        }).attr("fill", function (d, i) {
            return i ? COLORS[i - 1] : null;
        }).attr("x", 30).attr("y", 20);
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

/***/ "./src/components/pie_legend.js":
/*!**************************************!*\
  !*** ./src/components/pie_legend.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pieLegend = undefined;

var _pie_chart_generator = __webpack_require__(/*! ./pie_chart_generator */ "./src/components/pie_chart_generator.js");

var pieLegend = exports.pieLegend = function pieLegend() {
    var ul = document.createElement("ul");
    for (var i = 0; i < _pie_chart_generator.LABELS.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = _pie_chart_generator.LABELS[i];
        li.setAttribute("color", _pie_chart_generator.COLORS[i]);
        ul.appendChild(li);
    }
    return ul;
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pie_chart_generator = __webpack_require__(/*! ./components/pie_chart_generator */ "./src/components/pie_chart_generator.js");

var _pie_legend = __webpack_require__(/*! ./components/pie_legend */ "./src/components/pie_legend.js");

var TOP_LEVEL = ['T00', 'T01', 'TA1', 'TA3', 'TA4', 'TA5'];
var COLORS = ["blue", "red", "green", "yellow", "purple", "orange"];
// console.log(total)
var STATE_NAMES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

document.addEventListener("DOMContentLoaded", function () {

    (0, _pie_chart_generator.PieChartGenerator)('Alaska', TOP_LEVEL, 1);
    (0, _pie_chart_generator.PieChartGenerator)("Alabama", TOP_LEVEL, 2);
    // PCG -> csvPath, sector, amout, location, multiplier, skip

    var root = document.getElementById("root");
    // const ul = pieLegend()
    var select = document.createElement("select");
    var stateSelector = function stateSelector(e) {

        var svg = document.getElementById("svg-1");
        svg.parentNode.removeChild(svg);
        (0, _pie_chart_generator.PieChartGenerator)(e.target.value, TOP_LEVEL, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfbGVnZW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQaWVDaGFydEdlbmVyYXRvciIsIkNPTE9SUyIsIkxBQkVMUyIsInN0YXRlIiwidGF4X3R5cGUiLCJwaWVfbnVtIiwiVE9UQUwiLCJUWVBFUyIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsImhlaWdodCIsIndpZHRoIiwicmFkaXVzIiwiY29sb3JzIiwiZDMiLCJzY2FsZU9yZGluYWwiLCJzY2hlbWVEYXJrMiIsImFyYyIsIm91dGVyUmFkaXVzIiwiaW5uZXJSYWRpdXMiLCJwaWUiLCJ2YWx1ZSIsImQiLCJhbW91bnQiLCJzdmciLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwiY3N2IiwidGhlbiIsImRhdGEiLCJmb3JFYWNoIiwiaSIsIkdlb19OYW1lIiwiaXRlbSIsIkFNT1VOVCIsInNwbGl0Iiwiam9pbiIsImluY2x1ZGVzIiwicHVzaCIsImtleSIsIlRheF9UeXBlIiwiZyIsInNlbGVjdEFsbCIsImVudGVyIiwic3R5bGUiLCJvbiIsImNvbnNvbGUiLCJsb2ciLCJlbGUiLCJoMSIsInRleHQiLCJmb3JtYXQiLCJoMiIsIlN0cmluZyIsInNsaWNlIiwibGVnZW5kcyIsImxlZ2VuZCIsImNsYXNzZWQiLCJjYXRjaCIsImVycm9yIiwicGllVHdlZW4iLCJiIiwiaW50ZXJwb2xhdGUiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJ0IiwicGllTGVnZW5kIiwidWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJsZW5ndGgiLCJsaSIsImlubmVySFRNTCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiVE9QX0xFVkVMIiwiU1RBVEVfTkFNRVMiLCJhZGRFdmVudExpc3RlbmVyIiwicm9vdCIsImdldEVsZW1lbnRCeUlkIiwic3RhdGVTZWxlY3RvciIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImUiLCJ0YXJnZXQiLCJvcHRpb24iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQzVFZ0JBLGlCLEdBQUFBLGlCO0FBTmhCO0FBQ0E7QUFDTyxJQUFNQywwQkFBUyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEVBQTZDLFNBQTdDLENBQWY7QUFDUDtBQUNPLElBQU1DLDBCQUFTLENBQUMsYUFBRCxFQUFnQixjQUFoQixFQUFnQyxlQUFoQyxFQUFpRCxnQkFBakQsRUFBbUUsZ0NBQW5FLENBQWY7QUFDUDtBQUNPLFNBQVNGLGlCQUFULENBQTJCRyxLQUEzQixFQUFrQ0MsUUFBbEMsRUFBNENDLE9BQTVDLEVBQXFEOztBQUV4RCxR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QyxDQUF2QztBQUNBLGdEQUFrQixTQUFsQixFQUE2QkEsU0FBN0IsRUFBd0MsQ0FBeEM7QUFDQTs7QUFFQSxRQUFNRyxPQUFPVixTQUFTVyxjQUFULENBQXdCLE1BQXhCLENBQWI7QUFDQTtBQUNBLFFBQU12RCxTQUFTNEMsU0FBU0MsYUFBVCxDQUF1QixRQUF2QixDQUFmO0FBQ0EsUUFBTVcsZ0JBQWdCLFNBQWhCQSxhQUFnQixJQUFLOztBQUVuQixZQUFNekQsTUFBTTZDLFNBQVNXLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBWjtBQUNBeEQsWUFBSTBELFVBQUosQ0FBZUMsV0FBZixDQUEyQjNELEdBQTNCO0FBQ0Esb0RBQWtCNEQsRUFBRUMsTUFBRixDQUFTaEUsS0FBM0IsRUFBa0N1RCxTQUFsQyxFQUE2QyxDQUE3QztBQUNQLEtBTEQ7QUFNQUMsZ0JBQVk5QyxPQUFaLENBQW9CLGlCQUFTO0FBQ3pCLFlBQU11RCxTQUFTakIsU0FBU0MsYUFBVCxDQUF1QixRQUF2QixDQUFmO0FBQ0FnQixlQUFPYixTQUFQLEdBQW1CekUsS0FBbkI7QUFDQXNGLGVBQU9aLFlBQVAsQ0FBb0IsT0FBcEIsRUFBNkIxRSxLQUE3QjtBQUNBO0FBQ0E7QUFDQXlCLGVBQU9rRCxXQUFQLENBQW1CVyxNQUFuQjtBQUNILEtBUEQ7QUFRQTdELFdBQU9xRCxnQkFBUCxDQUF3QixRQUF4QixFQUFrQ0csYUFBbEM7QUFDQUYsU0FBS0osV0FBTCxDQUFpQmxELE1BQWpCO0FBQ0gsQ0F6QkQsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIEEgbG90IG9mIHRoaXMgY29kZSB3YXMgYmFzZWQgaGVhdmlseSBvZmYgb2YgS2FydGhpayBUaG90YSdzIHlvdXR1YmUgdHV0b3JpYWwgXCJJbnRyb2R1Y3Rpb24gdG8gZDMuanMgPSBQaWUgQ2hhcnQgYW5kIERvbnV0IENoYXJ0XCJcbi8vIFRoZSBsZWdlbmQgY29kZSB3YXMgZnJvbSBDcnlwdGVycyBJbmZvdGVjaCdzIHlvdXR1YmUgdHV0b3JpYWwgXCJQaWUgQ2hhcnQgdXNpbmcgRDMuanNcIlxuZXhwb3J0IGNvbnN0IENPTE9SUyA9IFtcIiNhNjc1MWVcIiwgXCIjZTdhYjA0XCIsIFwiIzY2YTUxZVwiLCBcIiM3NDcwYjNcIiwgXCIjZTgyYjhhXCJdXG4vLyBleHBvcnQgY29uc3QgTEFCRUxTID0gW1wiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiT3RoZXIgVGF4ZXNcIl1cbmV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJPdGhlciBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiLCBdXG4vLyBleHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3IoY3N2UGF0aCwgc2VjdG9yLCBhbW91bnQsIHN0YXRlLCBtdWx0aXBsaWVyID0gMSwgc2tpcCA9IDEpIHtcbmV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgdGF4X3R5cGUsIHBpZV9udW0pIHtcblxuICAgIGxldCBUT1RBTCA9IDA7XG4gICAgbGV0IFRZUEVTID0gW11cbiAgICAvLyBDSVJDTEUgVElNRSBCQUJZXG4gICAgLy8gbWFyZ2luIGFuZCByYWRpdXNcbiAgICBjb25zdCBtYXJnaW4gPSB7IHRvcDogMjAwLCByaWdodDogMjAwLCBib3R0b206IDIwMCwgbGVmdDogMjAwIH0sXG4gICAgICAgIGhlaWdodCA9IDEwMDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSxcbiAgICAgICAgd2lkdGggPSAxMDAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXG4gICAgICAgIHJhZGl1cyA9IHdpZHRoIC8gMjtcblxuICAgIGNvbnN0IGNvbG9ycyA9IGQzLnNjYWxlT3JkaW5hbChkMy5zY2hlbWVEYXJrMik7XG5cbiAgICAvLyBhcmMgZ2VuZXJhdG9yXG4gICAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDEwKVxuICAgICAgICAvLyAuaW5uZXJSYWRpdXMoMCk7IC8vIGZvciBjaXJjbGVcbiAgICAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDEwMCkgLy8gZm9yIGRvbnV0XG5cbiAgICAvLyBjb25zdCBsYWJsZUFyYyA9IGQzLmFyYygpXG4gICAgLy8gICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSA1MClcbiAgICAvLyAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDUwKTtcblxuICAgIC8vIHBpZSBnZW5lcmF0b3JcbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgICAvLyAuc29ydChudWxsKVxuICAgICAgICAudmFsdWUoZCA9PiBkLmFtb3VudCk7XG5cbiAgICAvLyBkZWZpbmUgc3ZnIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIi5waWUtXCIgKyBwaWVfbnVtKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgd2lkdGggLyAyICsgXCIsXCIgKyBoZWlnaHQgLyAyICsgXCIpXCIpXG5cbiAgICAvLyBpbXBvcnQgZGF0YVxuICAgIGQzLmNzdihcIi4vc3JjL2Fzc2V0cy9kYXRhL0ZZMjAxOF90YXhfcmV2ZW51ZV9kZXRhaWxlZC5jc3ZcIikudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAvLyBwYXJzZVxuXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoZCwgaSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZC5HZW9fTmFtZSA9PT0gc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtID09PSBcIlQwMFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIFRPVEFMID0gZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0YXhfdHlwZS5pbmNsdWRlcyhkLml0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIFRZUEVTLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBkLlRheF9UeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMFxuICAgICAgICAgICAgICAgICAgICB9KSBcbiAgICAgICAgICAgICAgICAgICAgZC5rZXkgPSBkLlRheF9UeXBlO1xuICAgICAgICAgICAgICAgICAgICBkLmFtb3VudCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBnID0gc3ZnLnNlbGVjdEFsbChcIi5hcmNcIilcbiAgICAgICAgICAgIC5kYXRhKHBpZShkYXRhKSlcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcImdcIikgIC8vIEFuZCB0aGlzIGxpbmUgdG8gZ3JvdyB0aGUgbnVtYmVyIG9mIGcncyB0byB0aGUgZGF0YSBzZXQgc2l6ZVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImFyY1wiKVxuICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCAoZCwgaSkgPT4gZC52YWx1ZSA9PT0gVE9UQUwgPyBcIm5vbmVcIiA6IFwibnVsbFwiKTsgIC8vIGF0dGVtcHQgdG8gcmVuZGVyIGhhbGYgdGhlIGNoYXJ0IGludmlzaWJsZVxuICAgICAgICAgICAgXG4gICAgICAgIC8vIGFwcGVuZCB0aGUgcGF0aCBvZiB0aGUgYXJjXG4gICAgICAgIGcuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIGFyYylcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZCA9PiBjb2xvcnMoZC5kYXRhLmtleSkpXG5cbiAgICAgICAgaWYgKHBpZV9udW0gPT09IDIpIHsvLyBmbGlwIHRoZSBzZWNvbmQgcGllXG4gICAgICAgICAgICBnLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwic2NhbGVYKC0xKVwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBldmVudCBoYW5kbGVyc1xuICAgICAgICBnLm9uKFwibW91c2VvdmVyXCIsIGVsZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbGUpXG4gICAgICAgICAgICBoMS50ZXh0KGVsZS5kYXRhLmtleSArIFwiIGFjY291bnRzIGZvciAkXCIgKyBkMy5mb3JtYXQoJywnKShlbGUuZGF0YS5hbW91bnQpICsgXCIgb3V0IG9mICRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgICAgIGgyLnRleHQoXCJUaGlzIGlzIFwiICsgU3RyaW5nKChlbGUuZGF0YS5hbW91bnQgLyBUT1RBTCkgKiAxMDApLnNsaWNlKDAsIDUpICsgXCIlIG9mIHRoZSB0b3RhbFwiKVxuICAgICAgICB9KVxuICAgICAgICAub24oXCJtb3VzZW91dFwiLCBlbGUgPT4ge1xuICAgICAgICAgICAgaDEudGV4dChzdGF0ZSArIFwiJ3MgdGF4IHJldmVudWUgZm9yIDIwMTkgd2FzICRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgICAgIGgyLnRleHQoXCJcIilcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgbGVnZW5kcyA9IHN2Zy5hcHBlbmQoXCJnXCIpLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCwgLTUwKVwiKVxuICAgICAgICAgICAgLnNlbGVjdEFsbChcIi5sZWdlbmRzXCIpLmRhdGEoVFlQRVMpO1xuXG4gICAgICAgIGNvbnN0IGxlZ2VuZCA9IGxlZ2VuZHMuZW50ZXIoKS5hcHBlbmQoXCJnXCIpLmNsYXNzZWQoXCJsZWdlbmRzXCIsIHRydWUpLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgKGQgLCBpKSA9PiBcInRyYW5zbGF0ZSgwLFwiICsgKGkrMSkgKiAzMCArICBcIilcIik7XG4gICAgICAgIGxlZ2VuZC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIDIwKVxuICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgMjApO1xuXG4gICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIGxlZ2VuZC5hdHRyKFwiZmlsbFwiLCAoZCwgaSkgPT4gaSA/IENPTE9SU1tpIC0gMV0gOiBudWxsKVxuICAgICAgICAgICAgLmF0dHIoXCJkaXNwbGF5XCIsIChkLCBpKSA9PiBpID8gXCJudWxsXCIgOiBcIm5vbmVcIilcblxuICAgICAgICBsZWdlbmQuYXBwZW5kKFwidGV4dFwiKS5jbGFzc2VkKFwibGFiZWxcIiwgdHJ1ZSkudGV4dCgoZCwgaSkgPT4gTEFCRUxTW2ktMV0pXG4gICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgKGQsIGkpID0+IGkgPyBDT0xPUlNbaSAtIDFdIDogbnVsbClcbiAgICAgICAgICAgIC5hdHRyKFwieFwiLCAzMClcbiAgICAgICAgICAgIC5hdHRyKFwieVwiLCAyMClcbiAgICAgICAgICAgIFxuICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7IGlmIChlcnJvcikgdGhyb3cgZXJyb3IgfSlcblxuXG4gICAgY29uc3QgaDEgPSBkMy5zZWxlY3QoXCJtYWluXCIpXG4gICAgICAgIC5hcHBlbmQoXCJoMVwiKVxuXG4gICAgY29uc3QgaDIgPSBkMy5zZWxlY3QoXCJtYWluXCIpXG4gICAgICAgIC5hcHBlbmQoXCJoMlwiKVxuXG4gICAgY29uc3QgcGllVHdlZW4gPSBiID0+IHtcbiAgICAgICAgYi5pbm5lclJhZGl1cyA9IDA7XG4gICAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZSh7IHN0YXJ0QW5nbGU6IDAsIGVuZEFuZ2xlOiAwIH0sIGIpXG4gICAgICAgIHJldHVybiAodCkgPT4geyByZXR1cm4gYXJjKGkodCkpIH1cbiAgICB9ICAgIFxufVxuIiwiaW1wb3J0IHsgQ09MT1JTLCBMQUJFTFN9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IHBpZUxlZ2VuZCA9ICgpID0+IHtcbiAgICBjb25zdCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTEFCRUxTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBsaS5pbm5lckhUTUwgPSBMQUJFTFNbaV07XG4gICAgICAgIGxpLnNldEF0dHJpYnV0ZShcImNvbG9yXCIsIENPTE9SU1tpXSlcbiAgICAgICAgdWwuYXBwZW5kQ2hpbGQobGkpXG4gICAgfVxuICAgIHJldHVybiB1bFxufSIsIlxuaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHBpZUxlZ2VuZCB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfbGVnZW5kJ1xuXG5jb25zdCBUT1BfTEVWRUwgPSBbJ1QwMCcsICdUMDEnLCAnVEExJywgJ1RBMycsICdUQTQnLCAnVEE1J11cbmNvbnN0IENPTE9SUyA9IFtcImJsdWVcIiwgXCJyZWRcIiwgXCJncmVlblwiLCBcInllbGxvd1wiLCBcInB1cnBsZVwiLCBcIm9yYW5nZVwiXVxuLy8gY29uc29sZS5sb2codG90YWwpXG5jb25zdCBTVEFURV9OQU1FUyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggQ2Fyb2xpbmEnLCAnTm9ydGggRGFrb3RhJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ11cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIFxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKCdBbGFza2EnLCBUT1BfTEVWRUwsIDEpXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJBbGFiYW1hXCIsIFRPUF9MRVZFTCwgMilcbiAgICAvLyBQQ0cgLT4gY3N2UGF0aCwgc2VjdG9yLCBhbW91dCwgbG9jYXRpb24sIG11bHRpcGxpZXIsIHNraXBcblxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgICAvLyBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKVxuICAgIGNvbnN0IHN0YXRlU2VsZWN0b3IgPSBlID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctMVwiKVxuICAgICAgICAgICAgc3ZnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3ZnKVxuICAgICAgICAgICAgUGllQ2hhcnRHZW5lcmF0b3IoZS50YXJnZXQudmFsdWUsIFRPUF9MRVZFTCwgMSlcbiAgICB9XG4gICAgU1RBVEVfTkFNRVMuZm9yRWFjaChzdGF0ZSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcbiAgICAgICAgb3B0aW9uLmlubmVySFRNTCA9IHN0YXRlXG4gICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzdGF0ZSlcbiAgICAgICAgLy8gb3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbiAgICAgICAgLy8gb3B0aW9uLnNldEF0dHJpYnV0ZShcIm9uY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4gICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pXG4gICAgfSlcbiAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBzdGF0ZVNlbGVjdG9yKVxuICAgIHJvb3QuYXBwZW5kQ2hpbGQoc2VsZWN0KVxufSlcbiJdLCJzb3VyY2VSb290IjoiIn0=