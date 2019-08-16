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

    var remove = document.getElementById("totals-" + pie_num);
    remove ? remove.parentNode.removeChild(remove) : null;

    var remove2 = document.getElementById("totals-" + pie_num);
    remove2 ? remove2.parentNode.removeChild(remove2) : null;

    var div = d3.select("#totals").append("div").attr("class", "totals-" + pie_num).attr("id", "totals-" + pie_num);

    var h1 = div.append("h1");
    // .attr('id', 'revenue-' + pie_num)

    var span = div.append("span");

    var h2 = d3.select("#details").append("h2");
    // .attr('id', 'percent-' + pie_num)

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
    var svg = d3.select(".pie-" + pie_num).append("svg").attr("id", "svg-" + pie_num).attr("class", "svg-" + pie_num).attr("position", "relative").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

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

        // set h1 after total has been defined
        h1.text(state + "'s tax revenue for 2018 was ");
        span.text("$" + d3.format(',')(TOTAL));
        h2.text("");
        // set up the percentages in the center box
        (0, _helper_functions.assignBox)(TYPES, pie_num);

        var g = svg.selectAll(".arc").data(pie(data)).enter().append("g") // And this line to grow the number of g's to the data set size
        .attr("class", "arc").style("display", function (d, i) {
            return d.value === TOTAL ? "none" : "null";
        }); // attempt to render half the chart invisible

        // append the path of the arc
        g.append("path").attr("d", arc).style("fill", function (d) {
            return colors(d.data.key);
        }).transition().ease(d3.easeLinear).duration(500).attrTween('d', pieTween);

        if (pie_num === 2) {
            // flip the second pie
            g.attr("position", "absolute");
            g.style("transform", "scaleX(-1) translate(300px, 0px)");
            debugger;

            debugger;
        }
        // event handlers
        g.on("mouseover", function (ele) {
            // console.log(ele)
            // h1.text(ele.data.key + " accounts for $" + d3.format(',')(ele.data.amount) + " out of $" + d3.format(',')(TOTAL))
            // h2.text("This is " + String((ele.data.amount / TOTAL) * 100).slice(0, 5) + "% of the total")
        }).on("mouseout", function (ele) {
            // h1.text(state + "'s tax revenue for 2018 was $" + d3.format(',')(TOTAL))
            // h2.text("")
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

    left_list.classList.add('left-list');
    text_list.classList.add('text-list');
    right_list.classList.add('right-list');

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
        text_box.style.backgroundColor = _pie_chart_generator.COLORS[i];
        text_box.style.color = "white";
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

    // const container = document.createElement('div')  // revisit if time to make custom select
    // container.classList.add('initial-container')

    var select = document.createElement("select");
    select.setAttribute("class", "select-" + pie_num);

    var stateSelector = function stateSelector(e) {
        var state = e.target.value;
        var svg = document.getElementById("svg-" + pie_num);
        svg.parentNode.removeChild(svg);
        (0, _pie_chart_generator.PieChartGenerator)(state, TOP_LEVEL, pie_num);

        var side = pie_num === 1 ? "-left" : "-right";
        // const h2 = document.getElementsByClassName("state" + side)[0]
        // h2.innerHTML = state
    };

    STATE_NAMES.forEach(function (state) {
        var default_state = pie_num === 1 ? STATE_NAMES[0] : STATE_NAMES[STATE_NAMES.length - 1];
        var option = document.createElement("option");
        if (state === default_state) {
            option.setAttribute("selected", true);
        }
        option.innerHTML = state;
        option.setAttribute("value", state);
        // option.addEventListener("click", stateSelector(state))
        // option.setAttribute("onclick", stateSelector(state))
        select.appendChild(option);
    });
    select.addEventListener("change", stateSelector);
    // container.appendChild(select)
    // return container
    return select;
};

var phaseOut = function phaseOut(node) {

    node.parentNode.removeChild(node);
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

    (0, _pie_chart_generator.PieChartGenerator)("Alabama", _selector.TOP_LEVEL, 1);
    (0, _pie_chart_generator.PieChartGenerator)("Wyoming", _selector.TOP_LEVEL, 2);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImFzc2lnbkJveCIsImFycmF5X29mX29ianMiLCJwaWVfbnVtIiwic2lkZSIsImZvckVhY2giLCJvYmoiLCJpIiwia2V5IiwiYm94IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImRlY2ltYWxzIiwiU3RyaW5nIiwicGVyY2VudCIsInNwbGl0IiwiaW50ZWdlcnMiLCJzbGljZWQiLCJzbGljZSIsImlubmVySFRNTCIsIlBpZUNoYXJ0R2VuZXJhdG9yIiwiQ09MT1JTIiwiTEFCRUxTIiwic3RhdGUiLCJ0YXhfdHlwZSIsInJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInJlbW92ZTIiLCJkaXYiLCJkMyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJoMSIsInNwYW4iLCJoMiIsIlRPVEFMIiwiVFlQRVMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJoZWlnaHQiLCJ3aWR0aCIsInJhZGl1cyIsImNvbG9ycyIsInNjYWxlT3JkaW5hbCIsInNjaGVtZURhcmsyIiwiYXJjIiwib3V0ZXJSYWRpdXMiLCJpbm5lclJhZGl1cyIsInBpZSIsInZhbHVlIiwiZCIsImFtb3VudCIsInN2ZyIsImNzdiIsInRoZW4iLCJkYXRhIiwiR2VvX05hbWUiLCJpdGVtIiwiQU1PVU5UIiwiam9pbiIsImluY2x1ZGVzIiwicHVzaCIsIlRheF9UeXBlIiwidGV4dCIsImZvcm1hdCIsImciLCJzZWxlY3RBbGwiLCJlbnRlciIsInN0eWxlIiwidHJhbnNpdGlvbiIsImVhc2UiLCJlYXNlTGluZWFyIiwiZHVyYXRpb24iLCJhdHRyVHdlZW4iLCJwaWVUd2VlbiIsIm9uIiwiY2F0Y2giLCJlcnJvciIsImIiLCJpbnRlcnBvbGF0ZSIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsInQiLCJwaWVMZWdlbmQiLCJtYXN0ZXJfbGlzdCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJsZWZ0X2xpc3QiLCJ0ZXh0X2xpc3QiLCJyaWdodF9saXN0IiwibGVuZ3RoIiwibGVmdF9ib3giLCJ0ZXh0X2JveCIsInJpZ2h0X2JveCIsImlkIiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXIiLCJhcHBlbmRDaGlsZCIsInN1Ymxpc3RzIiwibGFiZWwiLCJsaXN0cyIsImxlc3RsaXN0IiwidGV4dGxpc3QiLCJyaWdodGxpc3QiLCJsZWZ0Qm94IiwicmlnaHRCb3giLCJsaSIsInN1Ymxpc3QiLCJUT1BfTEVWRUwiLCJzZWxlY3RvciIsIlNUQVRFX05BTUVTIiwic2V0QXR0cmlidXRlIiwic3RhdGVTZWxlY3RvciIsImUiLCJ0YXJnZXQiLCJkZWZhdWx0X3N0YXRlIiwib3B0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBoYXNlT3V0Iiwibm9kZSIsInJvb3QiLCJ1bCIsInNlbGVjdF8xIiwic2VsZWN0XzIiLCJzZWxlY3Rvcl9jb250YWluZXIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Es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QUhELEM7Ozs7Ozs7Ozs7Ozs7O0FDekNBOztBQUNBOztBQUNBOztBQUVBcEgsU0FBU2tILGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNOztBQUVoRDs7QUFFQSxRQUFNRyxPQUFPckgsU0FBU0MsY0FBVCxDQUF3QixNQUF4QixDQUFiO0FBQ0E7QUFDQSxRQUFNcUgsS0FBSyw0QkFBWDtBQUNBLFFBQU1DLFdBQVcsd0JBQVMsQ0FBVCxDQUFqQjtBQUNBLFFBQU1DLFdBQVcsd0JBQVMsQ0FBVCxDQUFqQjtBQUNBLFFBQU1DLHFCQUFxQnpILFNBQVMwSCxzQkFBVCxDQUFnQyxvQkFBaEMsRUFBc0QsQ0FBdEQsQ0FBM0I7O0FBRUFELHVCQUFtQjNCLFdBQW5CLENBQStCeUIsUUFBL0I7QUFDQUUsdUJBQW1CM0IsV0FBbkIsQ0FBK0IwQixRQUEvQjtBQUNBSCxTQUFLdkIsV0FBTCxDQUFpQndCLEVBQWpCOztBQUVBLGdEQUFrQixTQUFsQixFQUE2QmIsbUJBQTdCLEVBQXdDLENBQXhDO0FBQ0EsZ0RBQWtCLFNBQWxCLEVBQTZCQSxtQkFBN0IsRUFBd0MsQ0FBeEM7QUFDSCxDQWpCRCxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5cbmV4cG9ydCBjb25zdCBhc3NpZ25Cb3ggPSAoYXJyYXlfb2Zfb2JqcywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQtYm94LScgOiAncmlnaHQtYm94LSdcbiAgICBhcnJheV9vZl9vYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGkgPSA0O1xuICAgICAgICBzd2l0Y2ggKG9iai5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAwIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAxIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMiBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAzIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBpKVxuICAgICAgICBjb25zdCBkZWNpbWFscyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVsxXVxuICAgICAgICBjb25zdCBpbnRlZ2VycyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVswXVxuICAgICAgICBjb25zdCBzbGljZWQgPSBvYmoucGVyY2VudCA/IGludGVnZXJzICsgJy4nICsgZGVjaW1hbHMuc2xpY2UoMCwgMikgOiAwXG4gICAgICAgIGJveC5pbm5lckhUTUwgPSBzbGljZWQgKyAnJSdcbiAgICB9KTtcbn0iLCIvLyBBIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGJhc2VkIGhlYXZpbHkgb2ZmIG9mIEthcnRoaWsgVGhvdGEncyB5b3V0dWJlIHR1dG9yaWFsIFwiSW50cm9kdWN0aW9uIHRvIGQzLmpzID0gUGllIENoYXJ0IGFuZCBEb251dCBDaGFydFwiXG4vLyBUaGUgbGVnZW5kIGNvZGUgd2FzIGZyb20gQ3J5cHRlcnMgSW5mb3RlY2gncyB5b3V0dWJlIHR1dG9yaWFsIFwiUGllIENoYXJ0IHVzaW5nIEQzLmpzXCJcblxuaW1wb3J0IHsgYXNzaWduQm94IH0gZnJvbSAnLi9oZWxwZXJfZnVuY3Rpb25zJ1xuXG5leHBvcnQgY29uc3QgQ09MT1JTID0gW1wiI2E2NzUxZVwiLCBcIiNlN2FiMDRcIiwgXCIjNjZhNTFlXCIsIFwiIzc0NzBiM1wiLCBcIiNlODJiOGFcIl1cbi8vIGV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJPdGhlciBUYXhlc1wiXVxuZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIk90aGVyIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgVGF4ZXNcIl1cbi8vIGV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihjc3ZQYXRoLCBzZWN0b3IsIGFtb3VudCwgc3RhdGUsIG11bHRpcGxpZXIgPSAxLCBza2lwID0gMSkge1xuZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCB0YXhfdHlwZSwgcGllX251bSkge1xuXG4gICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtXCIgKyBwaWVfbnVtKVxuICAgIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG5cbiAgICBjb25zdCByZW1vdmUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtXCIgKyBwaWVfbnVtKVxuICAgIHJlbW92ZTIgPyByZW1vdmUyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlMikgOiBudWxsXG5cblxuICAgIGNvbnN0IGRpdiA9IGQzLnNlbGVjdChcIiN0b3RhbHNcIilcbiAgICAgICAgLmFwcGVuZChcImRpdlwiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwidG90YWxzLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInRvdGFscy1cIiArIHBpZV9udW0pXG5cbiAgICBjb25zdCBoMSA9IGRpdlxuICAgICAgICAuYXBwZW5kKFwiaDFcIilcbiAgICAgICAgLy8gLmF0dHIoJ2lkJywgJ3JldmVudWUtJyArIHBpZV9udW0pXG5cbiAgICBjb25zdCBzcGFuID0gZGl2XG4gICAgICAgIC5hcHBlbmQoXCJzcGFuXCIpXG5cbiAgICBjb25zdCBoMiA9IGQzLnNlbGVjdChcIiNkZXRhaWxzXCIpXG4gICAgICAgIC5hcHBlbmQoXCJoMlwiKVxuICAgICAgICAvLyAuYXR0cignaWQnLCAncGVyY2VudC0nICsgcGllX251bSlcblxuICAgIGxldCBUT1RBTCA9IDA7XG4gICAgbGV0IFRZUEVTID0gW11cbiAgICAvLyBDSVJDTEUgVElNRSBCQUJZXG4gICAgLy8gbWFyZ2luIGFuZCByYWRpdXNcbiAgICBjb25zdCBtYXJnaW4gPSB7IHRvcDogMjAwLCByaWdodDogMjAwLCBib3R0b206IDIwMCwgbGVmdDogMjAwIH0sXG4gICAgICAgIGhlaWdodCA9IDEwMDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSxcbiAgICAgICAgd2lkdGggPSAxMDAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXG4gICAgICAgIHJhZGl1cyA9IHdpZHRoIC8gMjtcblxuXG5cbiAgICBjb25zdCBjb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lRGFyazIpO1xuXG4gICAgLy8gYXJjIGdlbmVyYXRvclxuICAgIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSAxMClcbiAgICAgICAgLy8gLmlubmVyUmFkaXVzKDApOyAvLyBmb3IgY2lyY2xlXG4gICAgICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSAxMDApIC8vIGZvciBkb251dFxuXG4gICAgLy8gY29uc3QgbGFibGVBcmMgPSBkMy5hcmMoKVxuICAgIC8vICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gNTApXG4gICAgLy8gICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSA1MCk7XG5cbiAgICAvLyBwaWUgZ2VuZXJhdG9yXG4gICAgY29uc3QgcGllID0gZDMucGllKClcbiAgICAgICAgLy8gLnNvcnQobnVsbClcbiAgICAgICAgLnZhbHVlKGQgPT4gZC5hbW91bnQpO1xuXG4gICAgLy8gZGVmaW5lIHN2ZyBcbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIucGllLVwiICsgcGllX251bSkuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwiaWRcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB3aWR0aCAvIDIgKyBcIixcIiArIGhlaWdodCAvIDIgKyBcIilcIilcblxuICAgIC8vIGltcG9ydCBkYXRhXG4gICAgZDMuY3N2KFwiLi9zcmMvYXNzZXRzL2RhdGEvRlkyMDE4X3RheF9yZXZlbnVlX2RldGFpbGVkLmNzdlwiKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIHBhcnNlXG5cbiAgICAgICAgZGF0YS5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkLkdlb19OYW1lID09PSBzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gPT09IFwiVDAwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgVE9UQUwgPSBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRheF90eXBlLmluY2x1ZGVzKGQuaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSAhPSAnVDAwJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVFlQRVMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBkLlRheF9UeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZC5BTU9VTlQgPT09ICdYJyA/IDAgOiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoKGQuQU1PVU5UID09PSAnWCcgPyAwIDogZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDApIC8gVE9UQUwpICogMTAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkLmtleSA9IGQuVGF4X1R5cGU7XG4gICAgICAgICAgICAgICAgICAgIGQuYW1vdW50ID0gZC5BTU9VTlQgPT09ICdYJyA/IDAgOiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgZC5wZXJjZW50ID0gKChkLkFNT1VOVCA9PT0gJ1gnID8gMCA6IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwKSAvIFRPVEFMKSAqIDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gc2V0IGgxIGFmdGVyIHRvdGFsIGhhcyBiZWVuIGRlZmluZWRcbiAgICAgICAgaDEudGV4dChzdGF0ZSArIFwiJ3MgdGF4IHJldmVudWUgZm9yIDIwMTggd2FzIFwiKVxuICAgICAgICBzcGFuLnRleHQoXCIkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgIGgyLnRleHQoXCJcIilcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwZXJjZW50YWdlcyBpbiB0aGUgY2VudGVyIGJveFxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBnLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBhcmMpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGQgPT4gY29sb3JzKGQuZGF0YS5rZXkpKVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmVhc2UoZDMuZWFzZUxpbmVhcilcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAuYXR0clR3ZWVuKCdkJywgcGllVHdlZW4pO1xuXG4gICAgICAgIGlmIChwaWVfbnVtID09PSAyKSB7Ly8gZmxpcCB0aGUgc2Vjb25kIHBpZVxuICAgICAgICAgICAgZy5hdHRyKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWCgtMSkgdHJhbnNsYXRlKDMwMHB4LCAwcHgpXCIpO1xuICAgICAgICAgICAgZGVidWdnZXJcblxuICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgfVxuICAgICAgICAvLyBldmVudCBoYW5kbGVyc1xuICAgICAgICBnLm9uKFwibW91c2VvdmVyXCIsIGVsZSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlbGUpXG4gICAgICAgICAgICAvLyBoMS50ZXh0KGVsZS5kYXRhLmtleSArIFwiIGFjY291bnRzIGZvciAkXCIgKyBkMy5mb3JtYXQoJywnKShlbGUuZGF0YS5hbW91bnQpICsgXCIgb3V0IG9mICRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgICAgIC8vIGgyLnRleHQoXCJUaGlzIGlzIFwiICsgU3RyaW5nKChlbGUuZGF0YS5hbW91bnQgLyBUT1RBTCkgKiAxMDApLnNsaWNlKDAsIDUpICsgXCIlIG9mIHRoZSB0b3RhbFwiKVxuICAgICAgICB9KVxuICAgICAgICAub24oXCJtb3VzZW91dFwiLCBlbGUgPT4ge1xuICAgICAgICAgICAgLy8gaDEudGV4dChzdGF0ZSArIFwiJ3MgdGF4IHJldmVudWUgZm9yIDIwMTggd2FzICRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgICAgIC8vIGgyLnRleHQoXCJcIilcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaWYgKHBpZV9udW0gPT09IDIpIHtcbiAgICAgICAgLy8gICAgIGNvbnN0IGxlZ2VuZHMgPSBzdmcuYXBwZW5kKFwiZ1wiKS5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKC02MywgLTEyOClcIilcbiAgICAgICAgLy8gICAgICAgICAuc2VsZWN0QWxsKFwiLmxlZ2VuZHNcIikuZGF0YShUWVBFUyk7XG4gICAgXG4gICAgICAgIC8vICAgICBjb25zdCBsZWdlbmQgPSBsZWdlbmRzLmVudGVyKCkuYXBwZW5kKFwiZ1wiKS5jbGFzc2VkKFwibGVnZW5kc1wiLCB0cnVlKS5hdHRyKFwidHJhbnNmb3JtXCIsIChkICwgaSkgPT4gXCJ0cmFuc2xhdGUoMCxcIiArIChpKzEpICogMzAgKyAgXCIpXCIpO1xuICAgICAgICAvLyAgICAgbGVnZW5kLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgLy8gICAgICAgICAuYXR0cihcIndpZHRoXCIsIDIwKVxuICAgICAgICAvLyAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIDIwKTtcbiAgICBcbiAgICAgICAgLy8gICAgIGRlYnVnZ2VyXG4gICAgICAgIC8vICAgICBsZWdlbmQuc3R5bGUoXCJzdHJva2VcIiwgKGQsIGkpID0+IGkgPyBDT0xPUlNbaSAtIDFdIDogbnVsbClcbiAgICAgICAgLy8gICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAgICAgLy8gICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIChkLCBpKSA9PiBpID8gXCJudWxsXCIgOiBcIm5vbmVcIilcbiAgICBcbiAgICAgICAgLy8gICAgIC8vIGxlZ2VuZC5hcHBlbmQoXCJ0ZXh0XCIpLmNsYXNzZWQoXCJsYWJlbFwiLCB0cnVlKS50ZXh0KChkLCBpKSA9PiBMQUJFTFNbaS0xXSlcbiAgICAgICAgLy8gICAgIC8vICAgICAuYXR0cihcImZpbGxcIiwgKGQsIGkpID0+IGkgPyBDT0xPUlNbaSAtIDFdIDogbnVsbClcbiAgICAgICAgLy8gICAgIC8vICAgICAuYXR0cihcInhcIiwgMzApXG4gICAgICAgIC8vICAgICAvLyAgICAgLmF0dHIoXCJ5XCIsIDIwKVxuICAgICAgICAvLyAgICAgLy8gICAgIC5hdHRyKFwiYm9yZGVyXCIsIChkLCBpKSA9PiBcIjNweCBzb2xpZCBcIiArIENPTE9SU1tpIC0gMV0pXG4gICAgICAgIC8vICAgICBsZWdlbmQuYXBwZW5kKFwidGV4dFwiKS5jbGFzc2VkKFwibGFiZWxcIiwgdHJ1ZSkudGV4dCgoZCwgaSkgPT4gTEFCRUxTW2ktMV0pXG4gICAgICAgIC8vICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwibm9uZVwiKVxuICAgICAgICAvLyAgICAgICAgIC5hdHRyKFwiZmlsbFwiLCAoZCwgaSkgPT4gaSA/IENPTE9SU1tpIC0gMV0gOiBudWxsKVxuICAgICAgICAvLyAgICAgICAgIC5hdHRyKFwieFwiLCAzMClcbiAgICAgICAgLy8gICAgICAgICAuYXR0cihcInlcIiwgMjApXG4gICAgICAgIC8vICAgICAgICAgLmF0dHIoXCJib3JkZXJcIiwgKGQsIGkpID0+IFwiM3B4IHNvbGlkIFwiICsgQ09MT1JTW2kgLSAxXSlcbiAgICAgICAgLy8gfVxuICAgICAgICAgICAgXG4gICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHsgaWYgKGVycm9yKSB0aHJvdyBlcnJvciB9KVxuXG4gICAgY29uc3QgcGllVHdlZW4gPSBiID0+IHtcbiAgICAgICAgYi5pbm5lclJhZGl1cyA9IDA7XG4gICAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZSh7IHN0YXJ0QW5nbGU6IDAsIGVuZEFuZ2xlOiAwIH0sIGIpXG4gICAgICAgIHJldHVybiAodCkgPT4geyByZXR1cm4gYXJjKGkodCkpIH1cbiAgICB9ICAgIFxuXG5cbn1cbiIsImltcG9ydCB7IENPTE9SUywgTEFCRUxTfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBwaWVMZWdlbmQgPSAoKSA9PiB7XG4gICAgY29uc3QgbWFzdGVyX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcbiAgICBtYXN0ZXJfbGlzdC5jbGFzc0xpc3QuYWRkKCdtYXN0ZXItbGlzdCcpXG5cbiAgICBjb25zdCBsZWZ0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgdGV4dF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHJpZ2h0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgICBsZWZ0X2xpc3QuY2xhc3NMaXN0LmFkZCgnbGVmdC1saXN0JykgIFxuICAgIHRleHRfbGlzdC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWxpc3QnKSAgXG4gICAgcmlnaHRfbGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodC1saXN0JykgXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IExBQkVMUy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBsZWZ0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgdGV4dF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IHJpZ2h0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICBsZWZ0X2JveC5jbGFzc0xpc3QuYWRkKCdib3gnLCAnbGVmdC1ib3gnKVxuICAgICAgICBsZWZ0X2JveC5pZCA9ICgnbGVmdC1ib3gtJyArIGkpXG4gICAgICAgIGxlZnRfYm94LnN0eWxlLmNvbG9yID0gQ09MT1JTW2ldXG5cbiAgICAgICAgcmlnaHRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdyaWdodC1ib3gnKVxuICAgICAgICByaWdodF9ib3guaWQgPSAoJ3JpZ2h0LWJveC0nICsgaSlcbiAgICAgICAgcmlnaHRfYm94LnN0eWxlLmNvbG9yID0gQ09MT1JTW2ldXG5cbiAgICAgICAgdGV4dF9ib3guY2xhc3NMaXN0LmFkZCgndGV4dC1ib3gnKVxuICAgICAgICB0ZXh0X2JveC5pbm5lckhUTUwgPSBMQUJFTFNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IENPTE9SU1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkIFwiICsgQ09MT1JTW2ldXG5cbiAgICAgICAgbGVmdF9saXN0LmFwcGVuZENoaWxkKGxlZnRfYm94KVxuICAgICAgICB0ZXh0X2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9ib3gpXG4gICAgICAgIHJpZ2h0X2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfYm94KVxuICAgIH1cblxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKGxlZnRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfbGlzdClcbiAgICByZXR1cm4gbWFzdGVyX2xpc3Rcbn1cblxuY29uc3Qgc3VibGlzdHMgPSAobGFiZWwsIGNvbG9yKSA9PiB7XG4gICAgY29uc3QgbGlzdHMgPSBbXVxuXG5cbiAgICBsZXN0bGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0bGlzdCcpXG4gICAgdGV4dGxpc3QuY2xhc3NMaXN0LmFkZCgndGV4dGxpc3QnKVxuICAgIHJpZ2h0bGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodGxpc3QnKVxuXG4gICAgY29uc3QgbGVmdEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCByaWdodEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG5cbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsZWZ0Qm94KVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGkpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChyaWdodEJveClcbiAgICByZXR1cm4gc3VibGlzdFxufSIsImltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgVE9QX0xFVkVMID0gWydUMDAnLCAnVDAxJywgJ1RBMScsICdUQTMnLCAnVEE0JywgJ1RBNSddXG5cbmV4cG9ydCBjb25zdCBzZWxlY3RvciA9IChwaWVfbnVtKSA9PiB7XG4gICAgY29uc3QgU1RBVEVfTkFNRVMgPSBbJ0FsYWJhbWEnLCAnQWxhc2thJywgJ0FyaXpvbmEnLCAnQXJrYW5zYXMnLCAnQ2FsaWZvcm5pYScsICdDb2xvcmFkbycsICdDb25uZWN0aWN1dCcsICdEZWxhd2FyZScsICdGbG9yaWRhJywgJ0dlb3JnaWEnLCAnSGF3YWlpJywgJ0lkYWhvJywgJ0lsbGlub2lzJywgJ0luZGlhbmEnLCAnSW93YScsICdLYW5zYXMnLCAnS2VudHVja3knLCAnTG91aXNpYW5hJywgJ01haW5lJywgJ01hcnlsYW5kJywgJ01hc3NhY2h1c2V0dHMnLCAnTWljaGlnYW4nLCAnTWlubmVzb3RhJywgJ01pc3Npc3NpcHBpJywgJ01pc3NvdXJpJywgJ01vbnRhbmEnLCAnTmVicmFza2EnLCAnTmV2YWRhJywgJ05ldyBIYW1wc2hpcmUnLCAnTmV3IEplcnNleScsICdOZXcgTWV4aWNvJywgJ05ldyBZb3JrJywgJ05vcnRoIENhcm9saW5hJywgJ05vcnRoIERha290YScsICdPaGlvJywgJ09rbGFob21hJywgJ09yZWdvbicsICdQZW5uc3lsdmFuaWEnLCAnUmhvZGUgSXNsYW5kJywgJ1NvdXRoIENhcm9saW5hJywgJ1NvdXRoIERha290YScsICdUZW5uZXNzZWUnLCAnVGV4YXMnLCAnVXRhaCcsICdWZXJtb250JywgJ1ZpcmdpbmlhJywgJ1dhc2hpbmd0b24nLCAnV2VzdCBWaXJnaW5pYScsICdXaXNjb25zaW4nLCAnV3lvbWluZyddXG5cbiAgICAvLyBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSAgLy8gcmV2aXNpdCBpZiB0aW1lIHRvIG1ha2UgY3VzdG9tIHNlbGVjdFxuICAgIC8vIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbml0aWFsLWNvbnRhaW5lcicpXG5cbiAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpXG4gICAgc2VsZWN0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2VsZWN0LVwiICsgcGllX251bSlcblxuICAgIGNvbnN0IHN0YXRlU2VsZWN0b3IgPSBlID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIHN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZylcbiAgICAgICAgUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUsIFRPUF9MRVZFTCwgcGllX251bSlcblxuICAgICAgICBjb25zdCBzaWRlID0gcGllX251bSA9PT0gMSA/IFwiLWxlZnRcIiA6IFwiLXJpZ2h0XCJcbiAgICAgICAgLy8gY29uc3QgaDIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3RhdGVcIiArIHNpZGUpWzBdXG4gICAgICAgIC8vIGgyLmlubmVySFRNTCA9IHN0YXRlXG4gICAgfVxuXG4gICAgU1RBVEVfTkFNRVMuZm9yRWFjaChzdGF0ZSA9PiB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRfc3RhdGUgPSBwaWVfbnVtID09PSAxID8gU1RBVEVfTkFNRVNbMF0gOiBTVEFURV9OQU1FU1tTVEFURV9OQU1FUy5sZW5ndGggLSAxXVxuICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gZGVmYXVsdF9zdGF0ZSkge1xuICAgICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIHRydWUpXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9uLmlubmVySFRNTCA9IHN0YXRlXG4gICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzdGF0ZSlcbiAgICAgICAgLy8gb3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbiAgICAgICAgLy8gb3B0aW9uLnNldEF0dHJpYnV0ZShcIm9uY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4gICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pXG4gICAgfSlcbiAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBzdGF0ZVNlbGVjdG9yKVxuICAgIC8vIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3QpXG4gICAgLy8gcmV0dXJuIGNvbnRhaW5lclxuICAgIHJldHVybiBzZWxlY3Rcbn1cblxuY29uc3QgcGhhc2VPdXQgPSAobm9kZSkgPT4ge1xuXG4gICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG59IiwiXG5pbXBvcnQgeyBQaWVDaGFydEdlbmVyYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgcGllTGVnZW5kIH0gZnJvbSAnLi9jb21wb25lbnRzL3BpZV9sZWdlbmQnXG5pbXBvcnQgeyBzZWxlY3RvciwgVE9QX0xFVkVMIH0gZnJvbSAnLi9jb21wb25lbnRzL3NlbGVjdG9yJ1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgXG4gICAgLy8gUENHIC0+IGNzdlBhdGgsIHNlY3RvciwgYW1vdXQsIGxvY2F0aW9uLCBtdWx0aXBsaWVyLCBza2lwXG4gICAgXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKVxuICAgIC8vIGNvbnN0IHVsID0gcGllTGVnZW5kKClcbiAgICBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3Qgc2VsZWN0XzEgPSBzZWxlY3RvcigxKVxuICAgIGNvbnN0IHNlbGVjdF8yID0gc2VsZWN0b3IoMilcbiAgICBjb25zdCBzZWxlY3Rvcl9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VsZWN0b3ItY29udGFpbmVyXCIpWzBdXG4gICAgXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8xKVxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMilcbiAgICByb290LmFwcGVuZENoaWxkKHVsKVxuXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJBbGFiYW1hXCIsIFRPUF9MRVZFTCwgMSlcbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIld5b21pbmdcIiwgVE9QX0xFVkVMLCAyKVxufSlcbiJdLCJzb3VyY2VSb290IjoiIn0=