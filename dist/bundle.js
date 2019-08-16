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
var LABELS = exports.LABELS = ["Other Taxes", "Income Taxes", "License Taxes", "Property Taxes", "Sales Taxes"];
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

        // if (pie_num === 2) {
        //     const legends = svg.append("g").attr("transform", "translate(-63, -128)")
        //         .selectAll(".legends").data(TYPES);

        //     const legend = legends.enter().append("g").classed("legends", true).attr("transform", (d , i) => "translate(0," + (i+1) * 30 +  ")");
        //     legend.append("rect")
        //         .attr("width", 20)
        //         .attr("height", 20);

        //     debugger
        //     legend.style("stroke", (d, i) => i ? COLORS[i - 1] : null)
        //         .style("fill", "transparent")
        //         .style("display", (d, i) => i ? "null" : "none")

        //     // legend.append("text").classed("label", true).text((d, i) => LABELS[i-1])
        //     //     .attr("fill", (d, i) => i ? COLORS[i - 1] : null)
        //     //     .attr("x", 30)
        //     //     .attr("y", 20)
        //     //     .attr("border", (d, i) => "3px solid " + COLORS[i - 1])
        //     legend.append("text").classed("label", true).text((d, i) => LABELS[i-1])
        //         .style("stroke", "none")
        //         .attr("fill", (d, i) => i ? COLORS[i - 1] : null)
        //         .attr("x", 30)
        //         .attr("y", 20)
        //         .attr("border", (d, i) => "3px solid " + COLORS[i - 1])
        // }
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
    ul.classList.add('tax-types-list');
    for (var i = 0; i < _pie_chart_generator.LABELS.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = _pie_chart_generator.LABELS[i];
        li.style.color = _pie_chart_generator.COLORS[i];
        li.style.border = "2px solid " + _pie_chart_generator.COLORS[i];
        ul.appendChild(li);
    }
    return ul;
};

/***/ }),

/***/ "./src/components/selector.js":
/*!************************************!*\
  !*** ./src/components/selector.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selector = exports.TOP_LEVEL = undefined;

var _pie_chart_generator = __webpack_require__(/*! ./pie_chart_generator */ "./src/components/pie_chart_generator.js");

var TOP_LEVEL = exports.TOP_LEVEL = ['T00', 'T01', 'TA1', 'TA3', 'TA4', 'TA5'];

var selector = exports.selector = function selector(pie_num) {
    var STATE_NAMES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    var stateSelector = function stateSelector(e) {
        var svg = document.getElementById("svg-" + pie_num);
        svg.parentNode.removeChild(svg);
        (0, _pie_chart_generator.PieChartGenerator)(e.target.value, TOP_LEVEL, pie_num);
    };

    var select = document.createElement("select");
    select.setAttribute("class", "select-" + pie_num);

    STATE_NAMES.forEach(function (state) {
        var option = document.createElement("option");
        option.innerHTML = state;
        option.setAttribute("value", state);
        // option.addEventListener("click", stateSelector(state))
        // option.setAttribute("onclick", stateSelector(state))
        select.appendChild(option);
    });
    select.addEventListener("change", stateSelector);
    return select;
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

var _selector = __webpack_require__(/*! ./components/selector */ "./src/components/selector.js");

document.addEventListener("DOMContentLoaded", function () {

    (0, _pie_chart_generator.PieChartGenerator)('Alaska', _selector.TOP_LEVEL, 1);
    (0, _pie_chart_generator.PieChartGenerator)("Alabama", _selector.TOP_LEVEL, 2);
    // PCG -> csvPath, sector, amout, location, multiplier, skip

    var root = document.getElementById("root");
    // const ul = pieLegend()
    var select_1 = (0, _selector.selector)(1);
    var select_2 = (0, _selector.selector)(2);
    var ul = (0, _pie_legend.pieLegend)();

    root.appendChild(select_1);
    root.appendChild(select_2);
    root.appendChild(ul);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfbGVnZW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQaWVDaGFydEdlbmVyYXRvciIsIkNPTE9SUyIsIkxBQkVMUyIsInN0YXRlIiwidGF4X3R5cGUiLCJwaWVfbnVtIiwiVE9UQUwiLCJUWVBFUyIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsImhlaWdodCIsIndpZHRoIiwicmFkaXVzIiwiY29sb3JzIiwiZDMiLCJzY2FsZU9yZGluYWwiLCJzY2hlbWVEYXJrMiIsImFyYyIsIm91dGVyUmFkaXVzIiwiaW5uZXJSYWRpdXMiLCJwaWUiLCJ2YWx1ZSIsImQiLCJhbW91bnQiLCJzdmciLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwiY3N2IiwidGhlbiIsImRhdGEiLCJmb3JFYWNoIiwiaSIsIkdlb19OYW1lIiwiaXRlbSIsIkFNT1VOVCIsInNwbGl0Iiwiam9pbiIsImluY2x1ZGVzIiwicHVzaCIsImtleSIsIlRheF9UeXBlIiwiZyIsInNlbGVjdEFsbCIsImVudGVyIiwic3R5bGUiLCJvbiIsImNvbnNvbGUiLCJsb2ciLCJlbGUiLCJoMSIsInRleHQiLCJmb3JtYXQiLCJoMiIsIlN0cmluZyIsInNsaWNlIiwiY2F0Y2giLCJlcnJvciIsInBpZVR3ZWVuIiwiYiIsImludGVycG9sYXRlIiwic3RhcnRBbmdsZSIsImVuZEFuZ2xlIiwidCIsInBpZUxlZ2VuZCIsInVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwibGVuZ3RoIiwibGkiLCJpbm5lckhUTUwiLCJjb2xvciIsImJvcmRlciIsImFwcGVuZENoaWxkIiwiVE9QX0xFVkVMIiwic2VsZWN0b3IiLCJTVEFURV9OQU1FUyIsInN0YXRlU2VsZWN0b3IiLCJnZXRFbGVtZW50QnlJZCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImUiLCJ0YXJnZXQiLCJzZXRBdHRyaWJ1dGUiLCJvcHRpb24iLCJhZGRFdmVudExpc3RlbmVyIiwicm9vdCIsInNlbGVjdF8xIiwic2VsZWN0XzIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQzVFZ0JBLGlCLEdBQUFBLGlCO0FBTmhCO0FBQ0E7QUFDTyxJQUFNQywwQkFBUyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEVBQTZDLFNBQTdDLENBQWY7QUFDUDtBQUNPLElBQU1DLDBCQUFTLENBQUMsYUFBRCxFQUFnQixjQUFoQixFQUFnQyxlQUFoQyxFQUFpRCxnQkFBakQsRUFBbUUsYUFBbkUs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QU1TLFdBQVcsd0JBQVMsQ0FBVCxDQUFqQjtBQUNBLFFBQU1DLFdBQVcsd0JBQVMsQ0FBVCxDQUFqQjtBQUNBLFFBQU16QixLQUFLLDRCQUFYOztBQUVBdUIsU0FBS2IsV0FBTCxDQUFpQmMsUUFBakI7QUFDQUQsU0FBS2IsV0FBTCxDQUFpQmUsUUFBakI7QUFDQUYsU0FBS2IsV0FBTCxDQUFpQlYsRUFBakI7QUFDSCxDQWZELEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBBIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGJhc2VkIGhlYXZpbHkgb2ZmIG9mIEthcnRoaWsgVGhvdGEncyB5b3V0dWJlIHR1dG9yaWFsIFwiSW50cm9kdWN0aW9uIHRvIGQzLmpzID0gUGllIENoYXJ0IGFuZCBEb251dCBDaGFydFwiXG4vLyBUaGUgbGVnZW5kIGNvZGUgd2FzIGZyb20gQ3J5cHRlcnMgSW5mb3RlY2gncyB5b3V0dWJlIHR1dG9yaWFsIFwiUGllIENoYXJ0IHVzaW5nIEQzLmpzXCJcbmV4cG9ydCBjb25zdCBDT0xPUlMgPSBbXCIjYTY3NTFlXCIsIFwiI2U3YWIwNFwiLCBcIiM2NmE1MWVcIiwgXCIjNzQ3MGIzXCIsIFwiI2U4MmI4YVwiXVxuLy8gZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIk90aGVyIFRheGVzXCJdXG5leHBvcnQgY29uc3QgTEFCRUxTID0gW1wiT3RoZXIgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBUYXhlc1wiXVxuLy8gZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKGNzdlBhdGgsIHNlY3RvciwgYW1vdW50LCBzdGF0ZSwgbXVsdGlwbGllciA9IDEsIHNraXAgPSAxKSB7XG5leHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUsIHRheF90eXBlLCBwaWVfbnVtKSB7XG5cbiAgICBsZXQgVE9UQUwgPSAwO1xuICAgIGxldCBUWVBFUyA9IFtdXG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cbiAgICBjb25zdCBjb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lRGFyazIpO1xuXG4gICAgLy8gYXJjIGdlbmVyYXRvclxuICAgIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSAxMClcbiAgICAgICAgLy8gLmlubmVyUmFkaXVzKDApOyAvLyBmb3IgY2lyY2xlXG4gICAgICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSAxMDApIC8vIGZvciBkb251dFxuXG4gICAgLy8gY29uc3QgbGFibGVBcmMgPSBkMy5hcmMoKVxuICAgIC8vICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gNTApXG4gICAgLy8gICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSA1MCk7XG5cbiAgICAvLyBwaWUgZ2VuZXJhdG9yXG4gICAgY29uc3QgcGllID0gZDMucGllKClcbiAgICAgICAgLy8gLnNvcnQobnVsbClcbiAgICAgICAgLnZhbHVlKGQgPT4gZC5hbW91bnQpO1xuXG4gICAgLy8gZGVmaW5lIHN2ZyBcbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIucGllLVwiICsgcGllX251bSkuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwiaWRcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKVxuXG4gICAgLy8gaW1wb3J0IGRhdGFcbiAgICBkMy5jc3YoXCIuL3NyYy9hc3NldHMvZGF0YS9GWTIwMThfdGF4X3JldmVudWVfZGV0YWlsZWQuY3N2XCIpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgLy8gcGFyc2VcblxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBUWVBFUy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDBcbiAgICAgICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAgICAgICAgIGQua2V5ID0gZC5UYXhfVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgZC5hbW91bnQgPSBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBnLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBhcmMpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGQgPT4gY29sb3JzKGQuZGF0YS5rZXkpKVxuXG4gICAgICAgIGlmIChwaWVfbnVtID09PSAyKSB7Ly8gZmxpcCB0aGUgc2Vjb25kIHBpZVxuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWCgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgZy5vbihcIm1vdXNlb3ZlclwiLCBlbGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlKVxuICAgICAgICAgICAgaDEudGV4dChlbGUuZGF0YS5rZXkgKyBcIiBhY2NvdW50cyBmb3IgJFwiICsgZDMuZm9ybWF0KCcsJykoZWxlLmRhdGEuYW1vdW50KSArIFwiIG91dCBvZiAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICBoMi50ZXh0KFwiVGhpcyBpcyBcIiArIFN0cmluZygoZWxlLmRhdGEuYW1vdW50IC8gVE9UQUwpICogMTAwKS5zbGljZSgwLCA1KSArIFwiJSBvZiB0aGUgdG90YWxcIilcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE5IHdhcyAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICBoMi50ZXh0KFwiXCIpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGlmIChwaWVfbnVtID09PSAyKSB7XG4gICAgICAgIC8vICAgICBjb25zdCBsZWdlbmRzID0gc3ZnLmFwcGVuZChcImdcIikuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNjMsIC0xMjgpXCIpXG4gICAgICAgIC8vICAgICAgICAgLnNlbGVjdEFsbChcIi5sZWdlbmRzXCIpLmRhdGEoVFlQRVMpO1xuICAgIFxuICAgICAgICAvLyAgICAgY29uc3QgbGVnZW5kID0gbGVnZW5kcy5lbnRlcigpLmFwcGVuZChcImdcIikuY2xhc3NlZChcImxlZ2VuZHNcIiwgdHJ1ZSkuYXR0cihcInRyYW5zZm9ybVwiLCAoZCAsIGkpID0+IFwidHJhbnNsYXRlKDAsXCIgKyAoaSsxKSAqIDMwICsgIFwiKVwiKTtcbiAgICAgICAgLy8gICAgIGxlZ2VuZC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgIC8vICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCAyMClcbiAgICAgICAgLy8gICAgICAgICAuYXR0cihcImhlaWdodFwiLCAyMCk7XG4gICAgXG4gICAgICAgIC8vICAgICBkZWJ1Z2dlclxuICAgICAgICAvLyAgICAgbGVnZW5kLnN0eWxlKFwic3Ryb2tlXCIsIChkLCBpKSA9PiBpID8gQ09MT1JTW2kgLSAxXSA6IG51bGwpXG4gICAgICAgIC8vICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgIC8vICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCAoZCwgaSkgPT4gaSA/IFwibnVsbFwiIDogXCJub25lXCIpXG4gICAgXG4gICAgICAgIC8vICAgICAvLyBsZWdlbmQuYXBwZW5kKFwidGV4dFwiKS5jbGFzc2VkKFwibGFiZWxcIiwgdHJ1ZSkudGV4dCgoZCwgaSkgPT4gTEFCRUxTW2ktMV0pXG4gICAgICAgIC8vICAgICAvLyAgICAgLmF0dHIoXCJmaWxsXCIsIChkLCBpKSA9PiBpID8gQ09MT1JTW2kgLSAxXSA6IG51bGwpXG4gICAgICAgIC8vICAgICAvLyAgICAgLmF0dHIoXCJ4XCIsIDMwKVxuICAgICAgICAvLyAgICAgLy8gICAgIC5hdHRyKFwieVwiLCAyMClcbiAgICAgICAgLy8gICAgIC8vICAgICAuYXR0cihcImJvcmRlclwiLCAoZCwgaSkgPT4gXCIzcHggc29saWQgXCIgKyBDT0xPUlNbaSAtIDFdKVxuICAgICAgICAvLyAgICAgbGVnZW5kLmFwcGVuZChcInRleHRcIikuY2xhc3NlZChcImxhYmVsXCIsIHRydWUpLnRleHQoKGQsIGkpID0+IExBQkVMU1tpLTFdKVxuICAgICAgICAvLyAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIm5vbmVcIilcbiAgICAgICAgLy8gICAgICAgICAuYXR0cihcImZpbGxcIiwgKGQsIGkpID0+IGkgPyBDT0xPUlNbaSAtIDFdIDogbnVsbClcbiAgICAgICAgLy8gICAgICAgICAuYXR0cihcInhcIiwgMzApXG4gICAgICAgIC8vICAgICAgICAgLmF0dHIoXCJ5XCIsIDIwKVxuICAgICAgICAvLyAgICAgICAgIC5hdHRyKFwiYm9yZGVyXCIsIChkLCBpKSA9PiBcIjNweCBzb2xpZCBcIiArIENPTE9SU1tpIC0gMV0pXG4gICAgICAgIC8vIH1cbiAgICAgICAgICAgIFxuICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7IGlmIChlcnJvcikgdGhyb3cgZXJyb3IgfSlcblxuXG4gICAgY29uc3QgaDEgPSBkMy5zZWxlY3QoXCJtYWluXCIpXG4gICAgICAgIC5hcHBlbmQoXCJoMVwiKVxuXG4gICAgY29uc3QgaDIgPSBkMy5zZWxlY3QoXCJtYWluXCIpXG4gICAgICAgIC5hcHBlbmQoXCJoMlwiKVxuXG4gICAgY29uc3QgcGllVHdlZW4gPSBiID0+IHtcbiAgICAgICAgYi5pbm5lclJhZGl1cyA9IDA7XG4gICAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZSh7IHN0YXJ0QW5nbGU6IDAsIGVuZEFuZ2xlOiAwIH0sIGIpXG4gICAgICAgIHJldHVybiAodCkgPT4geyByZXR1cm4gYXJjKGkodCkpIH1cbiAgICB9ICAgIFxufVxuIiwiaW1wb3J0IHsgQ09MT1JTLCBMQUJFTFN9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IHBpZUxlZ2VuZCA9ICgpID0+IHtcbiAgICBjb25zdCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuICAgIHVsLmNsYXNzTGlzdC5hZGQoJ3RheC10eXBlcy1saXN0JylcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IExBQkVMUy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgbGkuaW5uZXJIVE1MID0gTEFCRUxTW2ldO1xuICAgICAgICBsaS5zdHlsZS5jb2xvciA9IENPTE9SU1tpXVxuICAgICAgICBsaS5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCBcIiArIENPTE9SU1tpXVxuICAgICAgICB1bC5hcHBlbmRDaGlsZChsaSlcbiAgICB9XG4gICAgcmV0dXJuIHVsXG59IiwiaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBUT1BfTEVWRUwgPSBbJ1QwMCcsICdUMDEnLCAnVEExJywgJ1RBMycsICdUQTQnLCAnVEE1J11cblxuZXhwb3J0IGNvbnN0IHNlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcbiAgICBjb25zdCBTVEFURV9OQU1FUyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggQ2Fyb2xpbmEnLCAnTm9ydGggRGFrb3RhJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ11cblxuICAgIGNvbnN0IHN0YXRlU2VsZWN0b3IgPSBlID0+IHtcbiAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4gICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKGUudGFyZ2V0LnZhbHVlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKVxuICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNlbGVjdC1cIiArIHBpZV9udW0pXG5cbiAgICBTVEFURV9OQU1FUy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuICAgICAgICBvcHRpb24uaW5uZXJIVE1MID0gc3RhdGVcbiAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHN0YXRlKVxuICAgICAgICAvLyBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuICAgICAgICAvLyBvcHRpb24uc2V0QXR0cmlidXRlKFwib25jbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbiAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbilcbiAgICB9KVxuICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHN0YXRlU2VsZWN0b3IpXG4gICAgcmV0dXJuIHNlbGVjdFxufSIsIlxuaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHBpZUxlZ2VuZCB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfbGVnZW5kJ1xuaW1wb3J0IHsgc2VsZWN0b3IsIFRPUF9MRVZFTCB9IGZyb20gJy4vY29tcG9uZW50cy9zZWxlY3RvcidcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIFxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKCdBbGFza2EnLCBUT1BfTEVWRUwsIDEpXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJBbGFiYW1hXCIsIFRPUF9MRVZFTCwgMilcbiAgICAvLyBQQ0cgLT4gY3N2UGF0aCwgc2VjdG9yLCBhbW91dCwgbG9jYXRpb24sIG11bHRpcGxpZXIsIHNraXBcblxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgICAvLyBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3Qgc2VsZWN0XzEgPSBzZWxlY3RvcigxKVxuICAgIGNvbnN0IHNlbGVjdF8yID0gc2VsZWN0b3IoMilcbiAgICBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgXG4gICAgcm9vdC5hcHBlbmRDaGlsZChzZWxlY3RfMSlcbiAgICByb290LmFwcGVuZENoaWxkKHNlbGVjdF8yKVxuICAgIHJvb3QuYXBwZW5kQ2hpbGQodWwpXG59KVxuIl0sInNvdXJjZVJvb3QiOiIifQ==