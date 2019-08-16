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

/***/ "./src/components/helper_functions.js":
/*!********************************************!*\
  !*** ./src/components/helper_functions.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var assignBox = exports.assignBox = function assignBox(array_of_objs, pie_num) {
    var side = pie_num === 1 ? 'left-box-' : 'right-box-';
    array_of_objs.forEach(function (obj) {
        debugger;
        var i = 4;
        switch (obj.key) {
            case "Other Taxes":
                i = 0;
                break;
            case "Income Taxes":
                i = 1;
                break;
            case "License Taxes":
                i = 2;
                break;
            case "Property Taxes":
                i = 3;
                break;
        }
        var box = document.getElementById(side + i);
        var decimals = String(obj.percent).split('.')[1];
        var integers = String(obj.percent).split('.')[0];
        var sliced = obj.percent ? integers + '.' + decimals.slice(0, 2) : 0;
        box.innerHTML = sliced + '%';
    });
};

/***/ }),

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
exports.LABELS = exports.COLORS = undefined;
exports.PieChartGenerator = PieChartGenerator;

var _helper_functions = __webpack_require__(/*! ./helper_functions */ "./src/components/helper_functions.js");

var COLORS = exports.COLORS = ["#a6751e", "#e7ab04", "#66a51e", "#7470b3", "#e82b8a"];
// export const LABELS = ["Property Taxes", "Sales and Gross Receipts Taxes", "License Taxes", "Income Taxes", "Other Taxes"]
// A lot of this code was based heavily off of Karthik Thota's youtube tutorial "Introduction to d3.js = Pie Chart and Donut Chart"
// The legend code was from Crypters Infotech's youtube tutorial "Pie Chart using D3.js"

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
                    if (d.item != 'T00') {
                        TYPES.push({
                            key: d.Tax_Type,
                            amount: d.AMOUNT === 'X' ? 0 : d.AMOUNT.split(',').join('') * 1000,
                            percent: (d.AMOUNT === 'X' ? 0 : d.AMOUNT.split(',').join('') * 1000) / TOTAL * 100
                        });
                    }
                    d.key = d.Tax_Type;
                    d.amount = d.AMOUNT === 'X' ? 0 : d.AMOUNT.split(',').join('') * 1000;
                    d.percent = (d.AMOUNT === 'X' ? 0 : d.AMOUNT.split(',').join('') * 1000) / TOTAL * 100;
                }
            }
        });

        (0, _helper_functions.assignBox)(TYPES, pie_num);

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
    var master_list = document.createElement("ul");
    master_list.classList.add('master-list');

    var left_list = document.createElement('ul');
    var text_list = document.createElement('ul');
    var right_list = document.createElement('ul');

    for (var i = 0; i < _pie_chart_generator.LABELS.length; i++) {
        var left_box = document.createElement('li');
        var text_box = document.createElement('li');
        var right_box = document.createElement('li');

        left_box.classList.add('box', 'left-box');
        left_box.id = 'left-box-' + i;
        left_box.style.color = _pie_chart_generator.COLORS[i];

        right_box.classList.add('box', 'right-box');
        right_box.id = 'right-box-' + i;
        right_box.style.color = _pie_chart_generator.COLORS[i];

        text_box.classList.add('text-box');
        text_box.innerHTML = _pie_chart_generator.LABELS[i];
        text_box.style.color = _pie_chart_generator.COLORS[i];
        text_box.style.border = "2px solid " + _pie_chart_generator.COLORS[i];

        left_list.appendChild(left_box);
        text_list.appendChild(text_box);
        right_list.appendChild(right_box);
    }

    master_list.appendChild(left_list);
    master_list.appendChild(text_list);
    master_list.appendChild(right_list);
    return master_list;
};

var sublists = function sublists(label, color) {
    var lists = [];

    lestlist.classList.add('leftlist');
    textlist.classList.add('textlist');
    rightlist.classList.add('rightlist');

    var leftBox = document.createElement('li');
    var rightBox = document.createElement('li');

    var li = document.createElement('li');

    sublist.appendChild(leftBox);
    sublist.appendChild(li);
    sublist.appendChild(rightBox);
    return sublist;
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

    // PCG -> csvPath, sector, amout, location, multiplier, skip

    var root = document.getElementById("root");
    // const ul = pieLegend()
    var ul = (0, _pie_legend.pieLegend)();
    var select_1 = (0, _selector.selector)(1);
    var select_2 = (0, _selector.selector)(2);
    var selector_container = document.getElementsByClassName("selector-container")[0];

    selector_container.appendChild(select_1);
    selector_container.appendChild(select_2);
    root.appendChild(ul);

    (0, _pie_chart_generator.PieChartGenerator)('Alabama', _selector.TOP_LEVEL, 1);
    (0, _pie_chart_generator.PieChartGenerator)("Alabama", _selector.TOP_LEVEL, 2);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImFzc2lnbkJveCIsImFycmF5X29mX29ianMiLCJwaWVfbnVtIiwic2lkZSIsImZvckVhY2giLCJvYmoiLCJpIiwia2V5IiwiYm94IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImRlY2ltYWxzIiwiU3RyaW5nIiwicGVyY2VudCIsInNwbGl0IiwiaW50ZWdlcnMiLCJzbGljZWQiLCJzbGljZSIsImlubmVySFRNTCIsIlBpZUNoYXJ0R2VuZXJhdG9yIiwiQ09MT1JTIiwiTEFCRUxTIiwic3RhdGUiLCJ0YXhfdHlwZSIsIlRPVEFMIiwiVFlQRVMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJoZWlnaHQiLCJ3aWR0aCIsInJhZGl1cyIsImNvbG9ycyIsImQzIiwic2NhbGVPcmRpbmFsIiwic2NoZW1lRGFyazIiLCJhcmMiLCJvdXRlclJhZGl1cyIsImlubmVyUmFkaXVzIiwicGllIiwidmFsdWUiLCJkIiwiYW1vdW50Iiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsImNzdiIsInRoZW4iLCJkYXRhIiwiR2VvX05hbWUiLCJpdGVtIiwiQU1PVU5UIiwiam9pbiIsImluY2x1ZGVzIiwicHVzaCIsIlRheF9UeXBlIiwiZyIsInNlbGVjdEFsbCIsImVudGVyIiwic3R5bGUiLCJvbiIsImNvbnNvbGUiLCJsb2ciLCJlbGUiLCJoMSIsInRleHQiLCJmb3JtYXQiLCJoMiIsImNhdGNoIiwiZXJyb3IiLCJwaWVUd2VlbiIsImIiLCJpbnRlcnBvbGF0ZSIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsInQiLCJwaWVMZWdlbmQiLCJtYXN0ZXJfbGlzdCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJsZWZ0X2xpc3QiLCJ0ZXh0X2xpc3QiLCJyaWdodF9saXN0IiwibGVuZ3RoIiwibGVmdF9ib3giLCJ0ZXh0X2JveCIsInJpZ2h0X2JveCIsImlkIiwiY29sb3IiLCJib3JkZXIiLCJhcHBlbmRDaGlsZCIsInN1Ymxpc3RzIiwibGFiZWwiLCJsaXN0cyIsImxlc3RsaXN0IiwidGV4dGxpc3QiLCJyaWdodGxpc3QiLCJsZWZ0Qm94IiwicmlnaHRCb3giLCJsaSIsInN1Ymxpc3QiLCJUT1BfTEVWRUwiLCJzZWxlY3RvciIsIlNUQVRFX05BTUVTIiwic3RhdGVTZWxlY3RvciIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImUiLCJ0YXJnZXQiLCJzZXRBdHRyaWJ1dGUiLCJvcHRpb24iLCJhZGRFdmVudExpc3RlbmVyIiwicm9vdCIsInVsIiwic2VsZWN0XzEiLCJzZWxlY3RfMiIsInNlbGVjdG9yX2NvbnRhaW5lciIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7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RDs7QUFFQSxRQUFNQyxPQUFPM0csU0FBU0MsY0FBVCxDQUF3QixNQUF4QixDQUFiO0FBQ0E7QUFDQSxRQUFNMkcsS0FBSyw0QkFBWDtBQUNBLFFBQU1DLFdBQVcsd0JBQVMsQ0FBVCxDQUFqQjtBQUNBLFFBQU1DLFdBQVcsd0JBQVMsQ0FBVCxDQUFqQjtBQUNBLFFBQU1DLHFCQUFxQi9HLFNBQVNnSCxzQkFBVCxDQUFnQyxvQkFBaEMsRUFBc0QsQ0FBdEQsQ0FBM0I7O0FBRUFELHVCQUFtQjFCLFdBQW5CLENBQStCd0IsUUFBL0I7QUFDQUUsdUJBQW1CMUIsV0FBbkIsQ0FBK0J5QixRQUEvQjtBQUNBSCxTQUFLdEIsV0FBTCxDQUFpQnVCLEVBQWpCOztBQUVBLGdEQUFrQixTQUFsQixFQUE2QlosbUJBQTdCLEVBQXdDLENBQXhDO0FBQ0EsZ0RBQWtCLFNBQWxCLEVBQTZCQSxtQkFBN0IsRUFBd0MsQ0FBeEM7QUFDSCxDQWpCRCxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5cbmV4cG9ydCBjb25zdCBhc3NpZ25Cb3ggPSAoYXJyYXlfb2Zfb2JqcywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQtYm94LScgOiAncmlnaHQtYm94LSdcbiAgICBhcnJheV9vZl9vYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBkZWJ1Z2dlclxuICAgICAgICBsZXQgaSA9IDQ7XG4gICAgICAgIHN3aXRjaCAob2JqLmtleSkge1xuICAgICAgICAgICAgY2FzZSBcIk90aGVyIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiSW5jb21lIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDEgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTGljZW5zZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAyIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlByb3BlcnR5IFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDMgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2lkZSArIGkpXG4gICAgICAgIGNvbnN0IGRlY2ltYWxzID0gU3RyaW5nKG9iai5wZXJjZW50KS5zcGxpdCgnLicpWzFdXG4gICAgICAgIGNvbnN0IGludGVnZXJzID0gU3RyaW5nKG9iai5wZXJjZW50KS5zcGxpdCgnLicpWzBdXG4gICAgICAgIGNvbnN0IHNsaWNlZCA9IG9iai5wZXJjZW50ID8gaW50ZWdlcnMgKyAnLicgKyBkZWNpbWFscy5zbGljZSgwLCAyKSA6IDBcbiAgICAgICAgYm94LmlubmVySFRNTCA9IHNsaWNlZCArICclJ1xuICAgIH0pO1xufSIsIi8vIEEgbG90IG9mIHRoaXMgY29kZSB3YXMgYmFzZWQgaGVhdmlseSBvZmYgb2YgS2FydGhpayBUaG90YSdzIHlvdXR1YmUgdHV0b3JpYWwgXCJJbnRyb2R1Y3Rpb24gdG8gZDMuanMgPSBQaWUgQ2hhcnQgYW5kIERvbnV0IENoYXJ0XCJcbi8vIFRoZSBsZWdlbmQgY29kZSB3YXMgZnJvbSBDcnlwdGVycyBJbmZvdGVjaCdzIHlvdXR1YmUgdHV0b3JpYWwgXCJQaWUgQ2hhcnQgdXNpbmcgRDMuanNcIlxuXG5pbXBvcnQgeyBhc3NpZ25Cb3ggfSBmcm9tICcuL2hlbHBlcl9mdW5jdGlvbnMnXG5cbmV4cG9ydCBjb25zdCBDT0xPUlMgPSBbXCIjYTY3NTFlXCIsIFwiI2U3YWIwNFwiLCBcIiM2NmE1MWVcIiwgXCIjNzQ3MGIzXCIsIFwiI2U4MmI4YVwiXVxuLy8gZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIk90aGVyIFRheGVzXCJdXG5leHBvcnQgY29uc3QgTEFCRUxTID0gW1wiT3RoZXIgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBUYXhlc1wiXVxuLy8gZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKGNzdlBhdGgsIHNlY3RvciwgYW1vdW50LCBzdGF0ZSwgbXVsdGlwbGllciA9IDEsIHNraXAgPSAxKSB7XG5leHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUsIHRheF90eXBlLCBwaWVfbnVtKSB7XG5cbiAgICBsZXQgVE9UQUwgPSAwO1xuICAgIGxldCBUWVBFUyA9IFtdXG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cbiAgICBjb25zdCBjb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lRGFyazIpO1xuXG4gICAgLy8gYXJjIGdlbmVyYXRvclxuICAgIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSAxMClcbiAgICAgICAgLy8gLmlubmVyUmFkaXVzKDApOyAvLyBmb3IgY2lyY2xlXG4gICAgICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSAxMDApIC8vIGZvciBkb251dFxuXG4gICAgLy8gY29uc3QgbGFibGVBcmMgPSBkMy5hcmMoKVxuICAgIC8vICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gNTApXG4gICAgLy8gICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSA1MCk7XG5cbiAgICAvLyBwaWUgZ2VuZXJhdG9yXG4gICAgY29uc3QgcGllID0gZDMucGllKClcbiAgICAgICAgLy8gLnNvcnQobnVsbClcbiAgICAgICAgLnZhbHVlKGQgPT4gZC5hbW91bnQpO1xuXG4gICAgLy8gZGVmaW5lIHN2ZyBcbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIucGllLVwiICsgcGllX251bSkuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwiaWRcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKVxuXG4gICAgLy8gaW1wb3J0IGRhdGFcbiAgICBkMy5jc3YoXCIuL3NyYy9hc3NldHMvZGF0YS9GWTIwMThfdGF4X3JldmVudWVfZGV0YWlsZWQuY3N2XCIpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgLy8gcGFyc2VcblxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9ICdUMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUWVBFUy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBkLkFNT1VOVCA9PT0gJ1gnID8gMCA6IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnQ6ICgoZC5BTU9VTlQgPT09ICdYJyA/IDAgOiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMCkgLyBUT1RBTCkgKiAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGQua2V5ID0gZC5UYXhfVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgZC5hbW91bnQgPSBkLkFNT1VOVCA9PT0gJ1gnID8gMCA6IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgICAgICBkLnBlcmNlbnQgPSAoKGQuQU1PVU5UID09PSAnWCcgPyAwIDogZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDApIC8gVE9UQUwpICogMTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBnLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBhcmMpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGQgPT4gY29sb3JzKGQuZGF0YS5rZXkpKVxuXG4gICAgICAgIGlmIChwaWVfbnVtID09PSAyKSB7Ly8gZmxpcCB0aGUgc2Vjb25kIHBpZVxuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWCgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgZy5vbihcIm1vdXNlb3ZlclwiLCBlbGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlKVxuICAgICAgICAgICAgaDEudGV4dChlbGUuZGF0YS5rZXkgKyBcIiBhY2NvdW50cyBmb3IgJFwiICsgZDMuZm9ybWF0KCcsJykoZWxlLmRhdGEuYW1vdW50KSArIFwiIG91dCBvZiAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICBoMi50ZXh0KFwiVGhpcyBpcyBcIiArIFN0cmluZygoZWxlLmRhdGEuYW1vdW50IC8gVE9UQUwpICogMTAwKS5zbGljZSgwLCA1KSArIFwiJSBvZiB0aGUgdG90YWxcIilcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE5IHdhcyAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICBoMi50ZXh0KFwiXCIpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGlmIChwaWVfbnVtID09PSAyKSB7XG4gICAgICAgIC8vICAgICBjb25zdCBsZWdlbmRzID0gc3ZnLmFwcGVuZChcImdcIikuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNjMsIC0xMjgpXCIpXG4gICAgICAgIC8vICAgICAgICAgLnNlbGVjdEFsbChcIi5sZWdlbmRzXCIpLmRhdGEoVFlQRVMpO1xuICAgIFxuICAgICAgICAvLyAgICAgY29uc3QgbGVnZW5kID0gbGVnZW5kcy5lbnRlcigpLmFwcGVuZChcImdcIikuY2xhc3NlZChcImxlZ2VuZHNcIiwgdHJ1ZSkuYXR0cihcInRyYW5zZm9ybVwiLCAoZCAsIGkpID0+IFwidHJhbnNsYXRlKDAsXCIgKyAoaSsxKSAqIDMwICsgIFwiKVwiKTtcbiAgICAgICAgLy8gICAgIGxlZ2VuZC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgIC8vICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCAyMClcbiAgICAgICAgLy8gICAgICAgICAuYXR0cihcImhlaWdodFwiLCAyMCk7XG4gICAgXG4gICAgICAgIC8vICAgICBkZWJ1Z2dlclxuICAgICAgICAvLyAgICAgbGVnZW5kLnN0eWxlKFwic3Ryb2tlXCIsIChkLCBpKSA9PiBpID8gQ09MT1JTW2kgLSAxXSA6IG51bGwpXG4gICAgICAgIC8vICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgIC8vICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCAoZCwgaSkgPT4gaSA/IFwibnVsbFwiIDogXCJub25lXCIpXG4gICAgXG4gICAgICAgIC8vICAgICAvLyBsZWdlbmQuYXBwZW5kKFwidGV4dFwiKS5jbGFzc2VkKFwibGFiZWxcIiwgdHJ1ZSkudGV4dCgoZCwgaSkgPT4gTEFCRUxTW2ktMV0pXG4gICAgICAgIC8vICAgICAvLyAgICAgLmF0dHIoXCJmaWxsXCIsIChkLCBpKSA9PiBpID8gQ09MT1JTW2kgLSAxXSA6IG51bGwpXG4gICAgICAgIC8vICAgICAvLyAgICAgLmF0dHIoXCJ4XCIsIDMwKVxuICAgICAgICAvLyAgICAgLy8gICAgIC5hdHRyKFwieVwiLCAyMClcbiAgICAgICAgLy8gICAgIC8vICAgICAuYXR0cihcImJvcmRlclwiLCAoZCwgaSkgPT4gXCIzcHggc29saWQgXCIgKyBDT0xPUlNbaSAtIDFdKVxuICAgICAgICAvLyAgICAgbGVnZW5kLmFwcGVuZChcInRleHRcIikuY2xhc3NlZChcImxhYmVsXCIsIHRydWUpLnRleHQoKGQsIGkpID0+IExBQkVMU1tpLTFdKVxuICAgICAgICAvLyAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIm5vbmVcIilcbiAgICAgICAgLy8gICAgICAgICAuYXR0cihcImZpbGxcIiwgKGQsIGkpID0+IGkgPyBDT0xPUlNbaSAtIDFdIDogbnVsbClcbiAgICAgICAgLy8gICAgICAgICAuYXR0cihcInhcIiwgMzApXG4gICAgICAgIC8vICAgICAgICAgLmF0dHIoXCJ5XCIsIDIwKVxuICAgICAgICAvLyAgICAgICAgIC5hdHRyKFwiYm9yZGVyXCIsIChkLCBpKSA9PiBcIjNweCBzb2xpZCBcIiArIENPTE9SU1tpIC0gMV0pXG4gICAgICAgIC8vIH1cbiAgICAgICAgICAgIFxuICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7IGlmIChlcnJvcikgdGhyb3cgZXJyb3IgfSlcblxuXG4gICAgY29uc3QgaDEgPSBkMy5zZWxlY3QoXCJtYWluXCIpXG4gICAgICAgIC5hcHBlbmQoXCJoMVwiKVxuXG4gICAgY29uc3QgaDIgPSBkMy5zZWxlY3QoXCJtYWluXCIpXG4gICAgICAgIC5hcHBlbmQoXCJoMlwiKVxuXG4gICAgY29uc3QgcGllVHdlZW4gPSBiID0+IHtcbiAgICAgICAgYi5pbm5lclJhZGl1cyA9IDA7XG4gICAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZSh7IHN0YXJ0QW5nbGU6IDAsIGVuZEFuZ2xlOiAwIH0sIGIpXG4gICAgICAgIHJldHVybiAodCkgPT4geyByZXR1cm4gYXJjKGkodCkpIH1cbiAgICB9ICAgIFxufVxuIiwiaW1wb3J0IHsgQ09MT1JTLCBMQUJFTFN9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IHBpZUxlZ2VuZCA9ICgpID0+IHtcbiAgICBjb25zdCBtYXN0ZXJfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuICAgIG1hc3Rlcl9saXN0LmNsYXNzTGlzdC5hZGQoJ21hc3Rlci1saXN0JylcblxuICAgIGNvbnN0IGxlZnRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCB0ZXh0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgcmlnaHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTEFCRUxTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGxlZnRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCB0ZXh0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgcmlnaHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIGxlZnRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdsZWZ0LWJveCcpXG4gICAgICAgIGxlZnRfYm94LmlkID0gKCdsZWZ0LWJveC0nICsgaSlcbiAgICAgICAgbGVmdF9ib3guc3R5bGUuY29sb3IgPSBDT0xPUlNbaV1cblxuICAgICAgICByaWdodF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ3JpZ2h0LWJveCcpXG4gICAgICAgIHJpZ2h0X2JveC5pZCA9ICgncmlnaHQtYm94LScgKyBpKVxuICAgICAgICByaWdodF9ib3guc3R5bGUuY29sb3IgPSBDT0xPUlNbaV1cblxuICAgICAgICB0ZXh0X2JveC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWJveCcpXG4gICAgICAgIHRleHRfYm94LmlubmVySFRNTCA9IExBQkVMU1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuY29sb3IgPSBDT0xPUlNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkIFwiICsgQ09MT1JTW2ldXG5cbiAgICAgICAgbGVmdF9saXN0LmFwcGVuZENoaWxkKGxlZnRfYm94KVxuICAgICAgICB0ZXh0X2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9ib3gpXG4gICAgICAgIHJpZ2h0X2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfYm94KVxuICAgIH1cblxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKGxlZnRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfbGlzdClcbiAgICByZXR1cm4gbWFzdGVyX2xpc3Rcbn1cblxuY29uc3Qgc3VibGlzdHMgPSAobGFiZWwsIGNvbG9yKSA9PiB7XG4gICAgY29uc3QgbGlzdHMgPSBbXVxuXG5cbiAgICBsZXN0bGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0bGlzdCcpXG4gICAgdGV4dGxpc3QuY2xhc3NMaXN0LmFkZCgndGV4dGxpc3QnKVxuICAgIHJpZ2h0bGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodGxpc3QnKVxuXG4gICAgY29uc3QgbGVmdEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCByaWdodEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG5cbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsZWZ0Qm94KVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGkpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChyaWdodEJveClcbiAgICByZXR1cm4gc3VibGlzdFxufSIsImltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgVE9QX0xFVkVMID0gWydUMDAnLCAnVDAxJywgJ1RBMScsICdUQTMnLCAnVEE0JywgJ1RBNSddXG5cbmV4cG9ydCBjb25zdCBzZWxlY3RvciA9IChwaWVfbnVtKSA9PiB7XG4gICAgY29uc3QgU1RBVEVfTkFNRVMgPSBbJ0FsYWJhbWEnLCAnQWxhc2thJywgJ0FyaXpvbmEnLCAnQXJrYW5zYXMnLCAnQ2FsaWZvcm5pYScsICdDb2xvcmFkbycsICdDb25uZWN0aWN1dCcsICdEZWxhd2FyZScsICdGbG9yaWRhJywgJ0dlb3JnaWEnLCAnSGF3YWlpJywgJ0lkYWhvJywgJ0lsbGlub2lzJywgJ0luZGlhbmEnLCAnSW93YScsICdLYW5zYXMnLCAnS2VudHVja3knLCAnTG91aXNpYW5hJywgJ01haW5lJywgJ01hcnlsYW5kJywgJ01hc3NhY2h1c2V0dHMnLCAnTWljaGlnYW4nLCAnTWlubmVzb3RhJywgJ01pc3Npc3NpcHBpJywgJ01pc3NvdXJpJywgJ01vbnRhbmEnLCAnTmVicmFza2EnLCAnTmV2YWRhJywgJ05ldyBIYW1wc2hpcmUnLCAnTmV3IEplcnNleScsICdOZXcgTWV4aWNvJywgJ05ldyBZb3JrJywgJ05vcnRoIENhcm9saW5hJywgJ05vcnRoIERha290YScsICdPaGlvJywgJ09rbGFob21hJywgJ09yZWdvbicsICdQZW5uc3lsdmFuaWEnLCAnUmhvZGUgSXNsYW5kJywgJ1NvdXRoIENhcm9saW5hJywgJ1NvdXRoIERha290YScsICdUZW5uZXNzZWUnLCAnVGV4YXMnLCAnVXRhaCcsICdWZXJtb250JywgJ1ZpcmdpbmlhJywgJ1dhc2hpbmd0b24nLCAnV2VzdCBWaXJnaW5pYScsICdXaXNjb25zaW4nLCAnV3lvbWluZyddXG5cbiAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gZSA9PiB7XG4gICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgc3ZnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3ZnKVxuICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihlLnRhcmdldC52YWx1ZSwgVE9QX0xFVkVMLCBwaWVfbnVtKVxuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIilcbiAgICBzZWxlY3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuXG4gICAgU1RBVEVfTkFNRVMuZm9yRWFjaChzdGF0ZSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcbiAgICAgICAgb3B0aW9uLmlubmVySFRNTCA9IHN0YXRlXG4gICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzdGF0ZSlcbiAgICAgICAgLy8gb3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbiAgICAgICAgLy8gb3B0aW9uLnNldEF0dHJpYnV0ZShcIm9uY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4gICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pXG4gICAgfSlcbiAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBzdGF0ZVNlbGVjdG9yKVxuICAgIHJldHVybiBzZWxlY3Rcbn0iLCJcbmltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3InXG5pbXBvcnQgeyBwaWVMZWdlbmQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2xlZ2VuZCdcbmltcG9ydCB7IHNlbGVjdG9yLCBUT1BfTEVWRUwgfSBmcm9tICcuL2NvbXBvbmVudHMvc2VsZWN0b3InXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBcbiAgICAvLyBQQ0cgLT4gY3N2UGF0aCwgc2VjdG9yLCBhbW91dCwgbG9jYXRpb24sIG11bHRpcGxpZXIsIHNraXBcbiAgICBcbiAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpXG4gICAgLy8gY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHVsID0gcGllTGVnZW5kKClcbiAgICBjb25zdCBzZWxlY3RfMSA9IHNlbGVjdG9yKDEpXG4gICAgY29uc3Qgc2VsZWN0XzIgPSBzZWxlY3RvcigyKVxuICAgIGNvbnN0IHNlbGVjdG9yX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3Rvci1jb250YWluZXJcIilbMF1cbiAgICBcbiAgICBzZWxlY3Rvcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0XzEpXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8yKVxuICAgIHJvb3QuYXBwZW5kQ2hpbGQodWwpXG5cbiAgICBQaWVDaGFydEdlbmVyYXRvcignQWxhYmFtYScsIFRPUF9MRVZFTCwgMSlcbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIkFsYWJhbWFcIiwgVE9QX0xFVkVMLCAyKVxufSlcbiJdLCJzb3VyY2VSb290IjoiIn0=