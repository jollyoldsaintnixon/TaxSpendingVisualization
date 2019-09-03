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

/***/ "./src/components/budget_circle.js":
/*!*****************************************!*\
  !*** ./src/components/budget_circle.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var budgetCircle = exports.budgetCircle = function budgetCircle(total1, total2, update) {
    // I got a lot of help from Ben Gao, an App Academy TA
    if (!total1 || !total2) {
        return;
    }
    total1 = Math.sqrt(total1);
    total2 = Math.sqrt(total2);

    var circle_container = d3.select('#budget-circle-container');

    var height = 300;
    var width = 500;

    var svg1 = document.getElementById('circle-svg-1') ? d3.select('#circle-svg-1') : circle_container.append('svg').attr('width', width).attr('height', height).attr('class', 'circle-svg').attr('id', 'circle-svg-1');
    var svg2 = document.getElementById('circle-svg-2') ? d3.select('#circle-svg-2') : circle_container.append('svg').attr('width', width).attr('height', height).attr('class', 'circle-svg').attr('id', 'circle-svg-2');

    var data = [total1, total2];

    // const svg1 = circle_container.append('svg')
    //     .attr('width', width).attr('height', height)
    //     .attr('class', 'circle-svg').attr('id', 'circle-svg-1');

    // const svg2 = circle_container.append('svg')
    //     .attr('width', width).attr('height', height)
    //     .attr('class', 'circle-svg').attr('id', 'circle-svg-2');

    var rscale = d3.scaleLinear().domain([0, d3.max(data)]).range([1, height / 2]);

    if (!update) {
        var circle1 = svg1.selectAll('.circles-1').data([total1]);
        var circle2 = svg2.selectAll('.circles-2').data([total2]);
        circle1.enter().append('circle').attr('r', function (d) {

            return rscale(d);
        }).attr('class', 'circles-1').attr('cy', height / 2).attr('cx', function (d, i) {
            return width / 2;
        }).attr('fill', '#0a80ae');

        circle2.enter().append('circle').attr('r', function (d) {
            return rscale(d);
        }).attr('class', 'circles-2').attr('cy', height / 2).attr('cx', function (d, i) {
            return width / 2;
        }).attr('fill', '#0a80ae');
    } else {
        d3.select('.circles-1').data([total1]).transition().duration(500).attr('r', function (d) {

            return rscale(d);
        });
        d3.select('.circles-2').data([total2]).transition().duration(500).attr('r', function (d) {

            return rscale(d);
        });
    }
};

/***/ }),

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
exports.percentify = exports.removeClass = exports.remove = exports.pSBC = exports.subArrayLocator = exports.findAmount = exports.assignBox = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.LightenDarkenColor = LightenDarkenColor;

var _pie_chart_generator = __webpack_require__(/*! ./pie_chart_generator */ "./src/components/pie_chart_generator.js");

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

// d.AMOUNT === 'X' ? 0 : d.AMOUNT.split(',').join('') * 1000,
var findAmount = exports.findAmount = function findAmount(amount) {
    return amount === 'X' ? 0 : amount.split(',').join('') * 1000;
};

// export const subDataPusher = (item) => {
//     if (item != "T00" && item != "T01") {
//         switch (item.slice(0, 2)) {
//             case ("T0" || "T1"):
//                 sales_taxes.push({
//                     key: d.Tax_Type,
//                     amount: findAmount(d.AMOUNT),
//                     percent: (findAmount(d.AMOUNT) / TOTAL) * 100
//                 })
//                 break;

//             case "T2":
//                 license_taxes.push({

//                 })
//                 break;
//         }
//     }
// }


var subArrayLocator = exports.subArrayLocator = function subArrayLocator(tax_type, container_array) {
    // helper function for finding the right sub array. A bit hard-coded.
    switch (tax_type) {
        case "Sales and Gross Receipts Taxes":
            return container_array[0];
        case "License Taxes":
            return container_array[1];
        case "Income Taxes":
            return container_array[2];
        case "Other Taxes":
            return container_array[3];
        case "Property Taxes":
            return container_array[4];
    }
};

// This function was taken from user Pimp Trizkits post on stackoverflow at https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function LightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;else if (r < 0) r = 0;

    var b = (num >> 8 & 0x00FF) + amt;

    if (b > 255) b = 255;else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | b << 8 | r << 16).toString(16);
}
// This function was also taken from user Pimp Trizkits post on stackoverflow at https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
var pSBC = exports.pSBC = function pSBC(p, c0, c1, l) {
    var r = void 0,
        g = void 0,
        b = void 0,
        P = void 0,
        f = void 0,
        t = void 0,
        h = void 0,
        i = parseInt,
        m = Math.round,
        a = typeof c1 == "string";
    if (typeof p != "number" || p < -1 || p > 1 || typeof c0 != "string" || c0[0] != 'r' && c0[0] != '#' || c1 && !a) return null;
    if (!undefined.pSBCr) undefined.pSBCr = function (d) {
        var n = d.length,
            x = {};
        if (n > 9) {
            var _d, _d2;

            (_d = d = d.split(","), _d2 = _slicedToArray(_d, 4), r = _d2[0], g = _d2[1], b = _d2[2], a = _d2[3], _d), n = d.length;
            if (n < 3 || n > 4) return null;
            x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1;
        } else {
            if (n == 8 || n == 6 || n < 4) return null;
            if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
            d = i(d.slice(1), 16);
            if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1;
        }return x;
    };
    h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p;
    if (!f || !t) return null;
    if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);else r = m(Math.pow(P * Math.pow(f.r, 2) + p * Math.pow(t.r, 2), 0.5)), g = m(Math.pow(P * Math.pow(f.g, 2) + p * Math.pow(t.g, 2), 0.5)), b = m(Math.pow(P * Math.pow(f.b, 2) + p * Math.pow(t.b, 2), 0.5));
    a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
    if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2);
};

var remove = exports.remove = function remove(id) {
    var remove = document.getElementById(id);
    remove ? remove.parentNode.removeChild(remove) : null;
};

var removeClass = exports.removeClass = function removeClass(className) {
    var remove_list = document.getElementsByClassName(className);
    debugger;
    remove_list.length ? remove_list.parentNode.removeChild(remove) : null;
};

var percentify = exports.percentify = function percentify(number) {
    if ((typeof number === 'undefined' ? 'undefined' : _typeof(number)) === String) {
        number = parseFloat(number.split('$')[1]);
    }
    return Math.floor(number * 100) / 100;
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
exports.LABELS = exports.CIRCLE_COLORS = exports.COLORS = undefined;
exports.PieChartGenerator = PieChartGenerator;

var _helper_functions = __webpack_require__(/*! ./helper_functions */ "./src/components/helper_functions.js");

var _budget_circle = __webpack_require__(/*! ./budget_circle */ "./src/components/budget_circle.js");

var _subdata_generator = __webpack_require__(/*! ./subdata_generator */ "./src/components/subdata_generator.js");

// 
// A lot of this code was based heavily off of Karthik Thota's youtube tutorial "Introduction to d3.js = Pie Chart and Donut Chart"
// The legend code was from Crypters Infotech's youtube tutorial "Pie Chart using D3.js"

var COLORS = exports.COLORS = ["#a6751e", "#9a0047", "#66a51e", "#ee7731", "#e82b8a"];
var CIRCLE_COLORS = exports.CIRCLE_COLORS = [COLORS[1], COLORS[0], COLORS[4], COLORS[2], COLORS[3]];
// export const LABELS = ["Property Taxes", "Sales and Gross Receipts Taxes", "License Taxes", "Income Taxes", "Other Taxes"]
var LABELS = exports.LABELS = ["Other Taxes", "Income Taxes", "License Taxes", "Property Taxes", "Sales Taxes"];
// export function PieChartGenerator(csvPath, sector, amount, state, multiplier = 1, skip = 1) {
function PieChartGenerator(state, tax_type, pie_num) {
    var csv = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "./src/assets/data/FY2018-STC-Detailed-Table.csv";
    var update = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;


    // const remove = document.getElementById("totals-" + pie_num)
    // remove ? remove.parentNode.removeChild(remove) : null
    // const remove2 = document.getElementById("details-" + pie_num)
    // remove2 ? remove2.parentNode.removeChild(remove2) : null

    var h1 = d3.select('#totals-header-' + pie_num);
    var span = d3.select('#totals-span-' + pie_num);
    var h2 = d3.select("#details-" + pie_num);

    var TOTAL = 0;
    var TYPES = [];
    // CIRCLE TIME BABY
    // margin and radius
    var margin = { top: 200, right: 200, bottom: 200, left: 200 },
        height = 1000 - margin.top - margin.bottom,
        width = 1000 - margin.left - margin.right,
        radius = width / 2;

    var colors = d3.scaleOrdinal(COLORS);

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
    d3.csv(csv).then(function (data) {
        var _this = this;

        // initialize arrays that will contain the sub level tax data
        var sales_taxes = [];
        var license_taxes = [];
        var income_taxes = [];
        var other_taxes = [];
        var property_taxes = [];
        // let state_budgets = {}
        // let sales_tax_obj = { tax_group: LABELS[4] }
        // parse the csv
        data.forEach(function (d, i) {

            if (d.Geo_Name === state) {
                if (d.item === "T00") {
                    TOTAL = d.AMOUNT.split(',').join('') * 1000;
                }

                if (d.item != "T00") {
                    // don't want to catch Total or Property Taxes
                    var tax_obj = {
                        key: d.Tax_Type,
                        amount: (0, _helper_functions.findAmount)(d.AMOUNT),
                        percent_of_total: (0, _helper_functions.findAmount)(d.AMOUNT) / TOTAL * 100
                    };

                    switch (d.item.slice(0, 2)) {// fill up sub arrays
                        case "T0":
                            if (d.item === "T09") {
                                sales_taxes.push(tax_obj);
                            }
                            if (d.item === "T01") {
                                property_taxes.push(tax_obj);
                            }
                            // sales_tax_obj[d.Tax_Type] = findAmount(d.AMOUNT)
                            break;
                        case "T1":
                            sales_taxes.push(tax_obj);
                            break;
                        case "T2":
                            license_taxes.push(tax_obj);
                            break;
                        case "T4":
                            income_taxes.push(tax_obj);
                            break;
                        case "T5":
                            other_taxes.push(tax_obj);
                            break;
                        case "T9":
                            other_taxes.push(tax_obj);
                            break;
                    }
                }

                if (tax_type.includes(d.item)) {
                    if (d.item != 'T00') {
                        TYPES.push({
                            key: d.Tax_Type,
                            amount: (0, _helper_functions.findAmount)(d.AMOUNT),
                            percent: (0, _helper_functions.findAmount)(d.AMOUNT) / TOTAL * 100
                        });
                    }
                    d.key = d.Tax_Type;
                    d.amount = (0, _helper_functions.findAmount)(d.AMOUNT);
                    d.percent = (0, _helper_functions.findAmount)(d.AMOUNT) / TOTAL * 100;
                }
            }
        });

        var container_array = []; // setting up container array for passing into click handler
        container_array.push(sales_taxes);
        container_array.push(license_taxes);
        container_array.push(income_taxes);
        container_array.push(other_taxes);
        container_array.push(property_taxes);

        (0, _subdata_generator.updateSubData)(container_array, pie_num);
        // set h1 after total has been defined
        h1.text(state + "'s tax revenue for 2018 was ");
        span.text("$" + d3.format(',')(TOTAL));
        h2.text("");
        // attempt budgetCircle call
        // budgetCircle(TOTAL)
        // set up the percentages in the center box
        (0, _helper_functions.assignBox)(TYPES, pie_num);

        var g = svg.selectAll(".arc").data(pie(data)).enter().append("g") // And this line to grow the number of g's to the data set size
        .attr("class", "arc").style("display", function (d, i) {
            return d.value === TOTAL ? "none" : "null";
        }); // attempt to render half the chart invisible

        // append the path of the arc
        var path = g.append("path").attr("d", arc).style("fill", function (d) {
            return colors(d.data.key);
        });

        path.transition().ease(d3.easeLinear).duration(500).attrTween('d', pieTween);

        // path.on("mouseover", (d, i) => {  // why doesn't this work?
        //         console.log(d)
        //         d3.select(this).transition()
        //             .duration('50')
        //             .attr('opacity', '.85')
        //             .attr("cursor", 'pointer')
        //     })
        // determine how to flip the pies
        if (pie_num === 2) {
            // flip the second pie
            g.attr("position", "absolute");
            g.style("transform", "scaleX(-1) translate(300px, 0px) scaleY(-1)");
        } else {
            g.style("transform", "scaleY(-1)");
        }
        // event handlers
        var sub_data_svg = d3.select('#sub-data-g-' + pie_num).selectAll('.sub-data-' + pie_num);
        path.on("mouseover", function (d, i) {
            console.log(d);
            var path = d3.select(_this);
            debugger;
            path.transition().duration('500').attr('opacity', '.85').attr("cursor", 'pointer');
            debugger;
        }).on("mouseout", function (ele) {
            // h1.text(state + "'s tax revenue for 2018 was $" + d3.format(',')(TOTAL))
            // h2.text("")
        }).on('click', handleClick(container_array, pie_num));
        // .on('click', updateSubData(container_array, sub_data_svg, pie_num))
        console.log(pie_num);
        var span1 = document.getElementById('totals-span-1');
        var span2 = document.getElementById('totals-span-2');

        if (span1.innerText && span2.innerText) {
            var total1 = parseInt(span1.innerText.slice(1).split(',').join(''));
            var total2 = parseInt(span2.innerText.slice(1).split(',').join(''));
            (0, _budget_circle.budgetCircle)(total1, total2, update);
        }
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

var handleClick = function handleClick(container_array, pie_num) {
    return function (ele) {

        (0, _subdata_generator.updateSubData)(container_array, pie_num, ele);
        (0, _subdata_generator.tooltipCreator)(pie_num, ele.data.Tax_Type, ele.data.percent);
    };
};

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

var _subdata_generator = __webpack_require__(/*! ./subdata_generator */ "./src/components/subdata_generator.js");

var pieLegend = exports.pieLegend = function pieLegend() {
    var master_list = document.createElement("ul");
    master_list.classList.add('master-list');

    var left_list = document.createElement('ul');
    var text_list = document.createElement('ul');
    var right_list = document.createElement('ul');

    left_list.classList.add('left-list');
    text_list.classList.add('text-list');
    right_list.classList.add('right-list');

    for (var i = _pie_chart_generator.LABELS.length - 1; i >= 0; i--) {

        var left_box = document.createElement('li');
        var text_box = document.createElement('li');
        var right_box = document.createElement('li');

        left_box.classList.add('box', 'left-box');
        left_box.id = 'left-box-' + i;
        left_box.style.background = _pie_chart_generator.CIRCLE_COLORS[i];

        right_box.classList.add('box', 'right-box');
        right_box.id = 'right-box-' + i;
        right_box.style.background = _pie_chart_generator.CIRCLE_COLORS[i];

        text_box.classList.add('text-box');
        text_box.innerHTML = _pie_chart_generator.LABELS[i];
        text_box.style.backgroundColor = _pie_chart_generator.CIRCLE_COLORS[i];
        text_box.style.color = "white";
        text_box.style.border = "2px solid " + _pie_chart_generator.CIRCLE_COLORS[i];

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

/***/ "./src/components/state_selector.js":
/*!******************************************!*\
  !*** ./src/components/state_selector.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.state_selector = exports.TOP_LEVEL = undefined;

var _pie_chart_generator = __webpack_require__(/*! ./pie_chart_generator */ "./src/components/pie_chart_generator.js");

var _subdata_generator = __webpack_require__(/*! ./subdata_generator */ "./src/components/subdata_generator.js");

var TOP_LEVEL = exports.TOP_LEVEL = ['T00', 'T01', 'TA1', 'TA3', 'TA4', 'TA5'];
var STATE_NAMES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

var state_selector = exports.state_selector = function state_selector(pie_num) {

    var wrapper = document.createElement('div');
    wrapper.classList.add("class", "select-wrapper-" + pie_num);
    wrapper.id = "select-wrapper-" + pie_num;

    var select = document.createElement("span");
    select.innerHTML = pie_num === 1 ? 'Alabama' : 'Wyoming';
    select.classList.add("class", "select-" + pie_num);
    select.id = "select-" + pie_num;

    wrapper.addEventListener('click', function (e) {
        e.stopPropagation();
        state_list.classList.toggle('hidden');
    });

    var body = document.getElementsByTagName('body')[0]; // add an event listener so that if I click anywhere else the list disappears
    body.addEventListener('click', function (e) {
        state_list.classList.add('hidden');
    });

    var stateSelector = function stateSelector(state) {
        return function (e) {
            // const state = e.target.value
            var select = document.getElementById("select-" + pie_num);
            select.innerText = state;
            var svg = document.getElementById("svg-" + pie_num);
            svg.parentNode.removeChild(svg);
            (0, _pie_chart_generator.PieChartGenerator)(state, TOP_LEVEL, pie_num);
            // tooltipCreator(pie_num)
        };
    };
    var state_list = document.createElement('ul');
    state_list.classList.add('state-list-' + pie_num);
    state_list.classList.add('hidden');
    state_list.id = 'state-list-' + pie_num;

    STATE_NAMES.forEach(function (state) {
        var state_list_item = document.createElement('li');

        state_list_item.innerHTML = state;
        state_list_item.setAttribute("value", state);
        state_list_item.addEventListener("click", stateSelector(state));
        state_list.appendChild(state_list_item);
    });

    wrapper.appendChild(select);
    wrapper.appendChild(state_list);

    return wrapper;
};

// const phaseOut = (node) => {

//     node.parentNode.removeChild(node)
// }

/***/ }),

/***/ "./src/components/sub_data_legend.js":
/*!*******************************************!*\
  !*** ./src/components/sub_data_legend.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var subDataLegend = exports.subDataLegend = function subDataLegend(colors, labels, heights, pie_num) {
    var master_sub_data_list = document.createElement("ul");
    master_sub_data_list.classList.add('master-sub-data-list-' + pie_num);
    master_sub_data_list.id = 'master-sub-data-list-' + pie_num;

    var percent_list = document.createElement('ul');
    var label_list = document.createElement('ul');
    var color_box = document.createElement('ul');

    for (var i = labels.length - 1; i >= 0; i--) {

        // const relative_percent = document.createElement('li')
        // const overall_percent = document.createElement('li')
        var label = document.createElement('li');
        var _color_box = document.createElement('li');

        text_box.classList.add('sub-data-label-' + pie_num);
        text_box.innerHTML = labels[i];
        text_box.style.backgroundColor = colors[i];
        text_box.style.color = "white";
        text_box.style.border = "2px solid " + CIRCLE_COLORS[i];
    }
};

/***/ }),

/***/ "./src/components/subdata_generator.js":
/*!*********************************************!*\
  !*** ./src/components/subdata_generator.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tooltipCreator = exports.updateSubData = undefined;

var _helper_functions = __webpack_require__(/*! ./helper_functions */ "./src/components/helper_functions.js");

var _pie_chart_generator = __webpack_require__(/*! ./pie_chart_generator */ "./src/components/pie_chart_generator.js");

var _sub_data_legend = __webpack_require__(/*! ./sub_data_legend */ "./src/components/sub_data_legend.js");

var width = 90; // setting the dimensions to correspond to the pie charts'
var height = 750;
// const height = 90  // setting the dimensions to correspond to the pie charts'
// const width = 500

var tooltipWidth = 120; // will alter these as needed
var tooltipHeight = 40;

// export const subData = (container_array, pie_num, color_string = "#3F6D2A") => {
//     // a lot of this code was learned from Michael Stanaland's "Stacked bar chart with tooltips" tutorial at http://bl.ocks.org/mstanaland/6100713

//     remove('sub-data-svg-' + pie_num)
//     remove('sub-data-legend-svg-' + pie_num)


//     const svg = d3.select("#sub-data-" + pie_num)
//         .append("svg") 
//         .attr("width", width).attr("height", height).attr('id', 'sub-data-svg-' + pie_num)
//         .append("g")
//         .attr('class', 'sub-data-' + pie_num).attr('id', 'sub-data-g-' + pie_num)
//     console.log(svg)
//     updateSubData(container_array, svg, pie_num)(null)
// }


var updateSubData = exports.updateSubData = function updateSubData(container_array, pie_num, ele) {

    // return (ele) => {

    (0, _helper_functions.remove)('sub-data-svg-' + pie_num);
    (0, _helper_functions.remove)('sub-data-legend-svg-' + pie_num);

    var svg = d3.select("#sub-data-" + pie_num).append("svg").attr("width", width).attr("height", height).attr('class', 'sub-data-svg-' + pie_num).attr('id', 'sub-data-svg-' + pie_num).append("g").attr('class', 'sub-data-' + pie_num).attr('id', 'sub-data-g-' + pie_num);
    // .style("transform", "scaleY(-1)")


    var tax_type = ele ? ele.data.key : "Sales and Gross Receipts Taxes";
    var color_string = colorChooser(tax_type);
    var sub_array = (0, _helper_functions.subArrayLocator)(tax_type, container_array);
    var color_count = 0;
    var id_count = 0;

    var tax_stack = {};
    // setting up keys
    var keys = [];
    // keys.push(tax_type)
    sub_array.forEach(function (sub_tax, i) {
        keys.push(sub_tax.key);
        tax_stack[sub_tax.key] = sub_tax.percent_of_total;
    });

    var stack = d3.stack().keys(keys).order(d3.stackOrderNone).offset(d3.stackOffsetNone);
    var tax_stack_array = [];
    tax_stack_array.push(tax_stack);
    var layers = stack(tax_stack_array);

    var xScale = d3.scaleLinear().domain([0, 1]).range([0, width]);

    var new_colors = d3.scaleLinear().domain([0, keys.length]).range(["white", color_string]);

    var yScale = d3.scaleLinear().domain([0, d3.sum(Object.values(tax_stack))]) // the increment up to the total
    // .range([height, 0])
    .range([0, height]);

    var g = svg.selectAll(".sub-taxes-" + pie_num) // no g at this point, but they will have this class
    .data(layers).enter() // now there will be a g for every bar within the graph.
    .append("g").attr("class", "sub-taxes-" + pie_num);

    var rect = g.selectAll("rect") // making each obj of the correspond to a rect within the g
    .data(function (layer) {
        return layer;
    }); // pulling out each individual obj
    rect.exit().remove();
    rect.enter().append("rect").attr('x', function (d) {
        return xScale(0);
    }).attr('width', xScale(1)) // probably can hard code, since only one bar
    .attr('id', function (d, i) {
        return 'stack-' + pie_num + '-' + id_count++;
    }).merge(rect).transition().duration(500).attr('x', function (d) {
        return xScale(0);
    }) // passing each obj's x value to the d3 x function defined above
    .attr('y', function (layer) {

        return height - yScale(layer[1]);
    }) // y0 is the height where each segment in the stack starts
    .attr('width', xScale(1)) // probably can hard code, since only one bar
    .attr('height', function (bar) {

        return yScale(bar[1] - bar[0]);
    }).attr('fill', function (d, i) {
        return new_colors(++color_count);
    });

    var percent = ele ? ele.data.percent : null;
    setTimeout(function () {
        tooltipCreator(pie_num, tax_type, percent);
    }, 0);
    // tooltipCreator(pie_num, tax_type)

    legendCreator(pie_num, keys, new_colors);
    // subDataLegend(new_colors, )

    // }
};

var colorChooser = function colorChooser(tax_type) {
    switch (tax_type) {
        case "Sales and Gross Receipts Taxes":
            return _pie_chart_generator.CIRCLE_COLORS[4];
        case 'Property Taxes':
            return _pie_chart_generator.CIRCLE_COLORS[3];
        case "License Taxes":
            return _pie_chart_generator.CIRCLE_COLORS[2];
        case 'Income Taxes':
            return _pie_chart_generator.CIRCLE_COLORS[1];
        case 'Other Taxes':
            return _pie_chart_generator.CIRCLE_COLORS[0];
    }
};

var tooltipCreator = exports.tooltipCreator = function tooltipCreator(pie_num, tax_type, percent) {

    var sub_data_details = document.getElementById('data-details-type-' + pie_num);
    var relative_percent_details = document.getElementById('relative-percent-' + pie_num);
    var overall_percent_details = document.getElementById('overall-percent-' + pie_num);
    var list = document.getElementById('sub-data-details-' + pie_num);
    var side = pie_num === 1 ? 'left' : 'right';
    var vanilla_svg = document.getElementById('sub-data-svg-' + pie_num);
    var index = void 0;

    if (!tax_type || tax_type === "Sales and Gross Receipts Taxes") {
        tax_type = 'Sales Taxes';
        index = _pie_chart_generator.LABELS.indexOf(tax_type);
        percent = document.getElementById(side + '-box-' + index).innerHTML;
        percent = parseFloat(percent.slice(0, -1));
    }

    index = _pie_chart_generator.LABELS.indexOf(tax_type);
    sub_data_details.innerHTML = '' + tax_type;
    relative_percent_details.innerHTML = 'Percent of total budget: ' + (0, _helper_functions.percentify)(percent);
    overall_percent_details.innerHTML = 'Scroll over side bar to see sub tax data for this category';
    list.style.background = _pie_chart_generator.CIRCLE_COLORS[index];
    // vanilla_svg.appendChild(vanilla_tooltip)

    vanilla_svg.addEventListener('mouseover', function (e) {
        index = _pie_chart_generator.LABELS.indexOf(tax_type);
        var split_id = e.target.id.split('-');
        var legend_text = document.getElementById('legend-text-' + split_id[1] + '-' + split_id[2]);
        // const legend_item = document.getElementById(`legend-item-${split_id[1]}-${split_id[2]}`)
        var box_data = document.getElementById(side + '-box-' + index).innerHTML;

        var relative_percent = e.target.height.baseVal.value / height * 100;
        relative_percent = Math.round(100 * relative_percent) / 100;

        var overall_percent = parseFloat(box_data.slice(0, -1));
        overall_percent = Math.round(100 * overall_percent * relative_percent / 100) / 100;
        // let overall_percent = 
        // legend_item.classList.remove('hidden')
        overall_percent_details.innerHTML = 'Percent of total budget: ' + overall_percent;
        relative_percent_details.innerHTML = 'Percent of category: ' + relative_percent;
        if (legend_text) {
            sub_data_details.innerHTML = legend_text.innerHTML;
        }
        // debugger
        // console.log('color: ' + CIRCLE_COLORS[index])
        // list_color.style.border = `4px solid ${CIRCLE_COLORS[index]}`
        // vanilla_tooltip.classList.remove('hidden')
    });
    vanilla_svg.addEventListener('mouseout', function (e) {});
};

var legendCreator = function legendCreator(pie_num, keys, new_colors) {

    var color_count = 0;
    var id_count = 0;

    var legend = d3.select("#sub-data-legend-" + pie_num).append('svg').attr('class', 'sub-data-legend-svg-' + pie_num).attr('id', 'sub-data-legend-svg-' + pie_num).append('g');

    id_count = 0;

    legend.selectAll('text').data(keys.reverse()).enter().insert('text').text(function (d) {
        return d;
    }).attr('x', 18).attr('y', '0').attr('text-anchor', 'start').attr('alignment-baseline', 'hanging').attr('class', 'hidden').attr('id', function (d) {
        return 'legend-text-' + pie_num + '-' + id_count++;
    });
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _subdata_generator = __webpack_require__(/*! ./components/subdata_generator */ "./src/components/subdata_generator.js");

var _pie_chart_generator = __webpack_require__(/*! ./components/pie_chart_generator */ "./src/components/pie_chart_generator.js");

var _pie_legend = __webpack_require__(/*! ./components/pie_legend */ "./src/components/pie_legend.js");

var _state_selector = __webpack_require__(/*! ./components/state_selector */ "./src/components/state_selector.js");

var _budget_circle = __webpack_require__(/*! ./components/budget_circle */ "./src/components/budget_circle.js");

__webpack_require__(/*! ./styles/app.scss */ "./src/styles/app.scss");

document.addEventListener("DOMContentLoaded", function () {

    // PCG -> csvPath, sector, amout, location, multiplier, skip

    var root = document.getElementById("root");
    // const ul = pieLegend()
    var ul = (0, _pie_legend.pieLegend)();
    var select_1 = (0, _state_selector.state_selector)(1);
    var select_2 = (0, _state_selector.state_selector)(2);
    var selector_container = document.getElementsByClassName("selector-container")[0];
    var yearSelector = yearSelector;

    selector_container.appendChild(select_1);
    selector_container.appendChild(select_2);
    root.appendChild(ul);

    (0, _pie_chart_generator.PieChartGenerator)("Alabama", _state_selector.TOP_LEVEL, 1, "./src/assets/data/FY2018-STC-Detailed-Table.csv", false);
    (0, _pie_chart_generator.PieChartGenerator)("Wyoming", _state_selector.TOP_LEVEL, 2, "./src/assets/data/FY2018-STC-Detailed-Table.csv", false);
    // tooltipCreator(1)
    // tooltipCreator(2)
});

/***/ }),

/***/ "./src/styles/app.scss":
/*!*****************************!*\
  !*** ./src/styles/app.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnVkZ2V0X2NpcmNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9oZWxwZXJfZnVuY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGllX2xlZ2VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdGF0ZV9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdWJfZGF0YV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3ViZGF0YV9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYXBwLnNjc3M/ZmY0OCJdLCJuYW1lcyI6WyJidWRnZXRDaXJjbGUiLCJ0b3RhbDEiLCJ0b3RhbDIiLCJ1cGRhdGUiLCJNYXRoIiwic3FydCIsImNpcmNsZV9jb250YWluZXIiLCJkMyIsInNlbGVjdCIsImhlaWdodCIsIndpZHRoIiwic3ZnMSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhcHBlbmQiLCJhdHRyIiwic3ZnMiIsImRhdGEiLCJyc2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsIm1heCIsInJhbmdlIiwiY2lyY2xlMSIsInNlbGVjdEFsbCIsImNpcmNsZTIiLCJlbnRlciIsImQiLCJpIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwiTGlnaHRlbkRhcmtlbkNvbG9yIiwiYXNzaWduQm94IiwiYXJyYXlfb2Zfb2JqcyIsInBpZV9udW0iLCJzaWRlIiwiZm9yRWFjaCIsIm9iaiIsImtleSIsImJveCIsImRlY2ltYWxzIiwiU3RyaW5nIiwicGVyY2VudCIsInNwbGl0IiwiaW50ZWdlcnMiLCJzbGljZWQiLCJzbGljZSIsImlubmVySFRNTCIsImZpbmRBbW91bnQiLCJhbW91bnQiLCJqb2luIiwic3ViQXJyYXlMb2NhdG9yIiwidGF4X3R5cGUiLCJjb250YWluZXJfYXJyYXkiLCJjb2wiLCJhbXQiLCJ1c2VQb3VuZCIsIm51bSIsInBhcnNlSW50IiwiciIsImIiLCJnIiwidG9TdHJpbmciLCJwU0JDIiwicCIsImMwIiwiYzEiLCJsIiwiUCIsImYiLCJ0IiwiaCIsIm0iLCJyb3VuZCIsImEiLCJwU0JDciIsIm4iLCJsZW5ndGgiLCJ4IiwicGFyc2VGbG9hdCIsInVuZGVmaW5lZCIsInJlbW92ZSIsImlkIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwicmVtb3ZlQ2xhc3MiLCJyZW1vdmVfbGlzdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbGFzc05hbWUiLCJwZXJjZW50aWZ5IiwibnVtYmVyIiwiZmxvb3IiLCJQaWVDaGFydEdlbmVyYXRvciIsIkNPTE9SUyIsIkNJUkNMRV9DT0xPUlMiLCJMQUJFTFMiLCJzdGF0ZSIsImNzdiIsImgxIiwic3BhbiIsImgyIiwiVE9UQUwiLCJUWVBFUyIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInJhZGl1cyIsImNvbG9ycyIsInNjYWxlT3JkaW5hbCIsImFyYyIsIm91dGVyUmFkaXVzIiwiaW5uZXJSYWRpdXMiLCJwaWUiLCJ2YWx1ZSIsInN2ZyIsInRoZW4iLCJzYWxlc190YXhlcyIsImxpY2Vuc2VfdGF4ZXMiLCJpbmNvbWVfdGF4ZXMiLCJvdGhlcl90YXhlcyIsInByb3BlcnR5X3RheGVzIiwiR2VvX05hbWUiLCJpdGVtIiwiQU1PVU5UIiwidGF4X29iaiIsIlRheF9UeXBlIiwicGVyY2VudF9vZl90b3RhbCIsInB1c2giLCJpbmNsdWRlcyIsInRleHQiLCJmb3JtYXQiLCJzdHlsZSIsInBhdGgiLCJlYXNlIiwiZWFzZUxpbmVhciIsImF0dHJUd2VlbiIsInBpZVR3ZWVuIiwic3ViX2RhdGFfc3ZnIiwib24iLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlQ2xpY2siLCJzcGFuMSIsInNwYW4yIiwiaW5uZXJUZXh0IiwiY2F0Y2giLCJlcnJvciIsImludGVycG9sYXRlIiwic3RhcnRBbmdsZSIsImVuZEFuZ2xlIiwiZWxlIiwicGllTGVnZW5kIiwibWFzdGVyX2xpc3QiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwibGVmdF9saXN0IiwidGV4dF9saXN0IiwicmlnaHRfbGlzdCIsImxlZnRfYm94IiwidGV4dF9ib3giLCJyaWdodF9ib3giLCJiYWNrZ3JvdW5kIiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJib3JkZXIiLCJhcHBlbmRDaGlsZCIsInN1Ymxpc3RzIiwibGFiZWwiLCJsaXN0cyIsImxlc3RsaXN0IiwidGV4dGxpc3QiLCJyaWdodGxpc3QiLCJsZWZ0Qm94IiwicmlnaHRCb3giLCJsaSIsInN1Ymxpc3QiLCJUT1BfTEVWRUwiLCJTVEFURV9OQU1FUyIsInN0YXRlX3NlbGVjdG9yIiwid3JhcHBlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwic3RhdGVfbGlzdCIsInRvZ2dsZSIsImJvZHkiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0YXRlU2VsZWN0b3IiLCJzdGF0ZV9saXN0X2l0ZW0iLCJzZXRBdHRyaWJ1dGUiLCJzdWJEYXRhTGVnZW5kIiwibGFiZWxzIiwiaGVpZ2h0cyIsIm1hc3Rlcl9zdWJfZGF0YV9saXN0IiwicGVyY2VudF9saXN0IiwibGFiZWxfbGlzdCIsImNvbG9yX2JveCIsInRvb2x0aXBXaWR0aCIsInRvb2x0aXBIZWlnaHQiLCJ1cGRhdGVTdWJEYXRhIiwiY29sb3Jfc3RyaW5nIiwiY29sb3JDaG9vc2VyIiwic3ViX2FycmF5IiwiY29sb3JfY291bnQiLCJpZF9jb3VudCIsInRheF9zdGFjayIsImtleXMiLCJzdWJfdGF4Iiwic3RhY2siLCJvcmRlciIsInN0YWNrT3JkZXJOb25lIiwib2Zmc2V0Iiwic3RhY2tPZmZzZXROb25lIiwidGF4X3N0YWNrX2FycmF5IiwibGF5ZXJzIiwieFNjYWxlIiwibmV3X2NvbG9ycyIsInlTY2FsZSIsInN1bSIsIk9iamVjdCIsInZhbHVlcyIsInJlY3QiLCJsYXllciIsImV4aXQiLCJtZXJnZSIsImJhciIsInNldFRpbWVvdXQiLCJ0b29sdGlwQ3JlYXRvciIsImxlZ2VuZENyZWF0b3IiLCJzdWJfZGF0YV9kZXRhaWxzIiwicmVsYXRpdmVfcGVyY2VudF9kZXRhaWxzIiwib3ZlcmFsbF9wZXJjZW50X2RldGFpbHMiLCJsaXN0IiwidmFuaWxsYV9zdmciLCJpbmRleCIsImluZGV4T2YiLCJzcGxpdF9pZCIsInRhcmdldCIsImxlZ2VuZF90ZXh0IiwiYm94X2RhdGEiLCJyZWxhdGl2ZV9wZXJjZW50IiwiYmFzZVZhbCIsIm92ZXJhbGxfcGVyY2VudCIsImxlZ2VuZCIsInJldmVyc2UiLCJpbnNlcnQiLCJyb290IiwidWwiLCJzZWxlY3RfMSIsInNlbGVjdF8yIiwic2VsZWN0b3JfY29udGFpbmVyIiwieWVhclNlbGVjdG9yIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFB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LEVBQXdDLENBQXhDLEVBQTJDLGlEQUEzQyxFQUE4RixLQUE5RjtBQUNBLGdEQUFrQixTQUFsQixFQUE2QkEseUJBQTdCLEVBQXdDLENBQXhDLEVBQTJDLGlEQUEzQyxFQUE4RixLQUE5RjtBQUNBO0FBQ0E7QUFFSCxDQXJCRCxFOzs7Ozs7Ozs7OztBQ1BBLHVDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5cbmV4cG9ydCBjb25zdCBidWRnZXRDaXJjbGUgPSAodG90YWwxLCB0b3RhbDIsIHVwZGF0ZSkgPT4ge1xuICAgIC8vIEkgZ290IGEgbG90IG9mIGhlbHAgZnJvbSBCZW4gR2FvLCBhbiBBcHAgQWNhZGVteSBUQVxuICAgIGlmICghdG90YWwxIHx8ICF0b3RhbDIpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRvdGFsMSA9IE1hdGguc3FydCh0b3RhbDEpXG4gICAgdG90YWwyID0gTWF0aC5zcXJ0KHRvdGFsMilcblxuICAgIGNvbnN0IGNpcmNsZV9jb250YWluZXIgPSBkMy5zZWxlY3QoJyNidWRnZXQtY2lyY2xlLWNvbnRhaW5lcicpXG5cbiAgICBjb25zdCBoZWlnaHQgPSAzMDBcbiAgICBjb25zdCB3aWR0aCA9IDUwMFxuICAgIFxuICAgIGNvbnN0IHN2ZzEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLXN2Zy0xJykgPyBkMy5zZWxlY3QoJyNjaXJjbGUtc3ZnLTEnKSA6IGNpcmNsZV9jb250YWluZXIuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpLmF0dHIoJ2lkJywgJ2NpcmNsZS1zdmctMScpO1xuICAgIGNvbnN0IHN2ZzIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLXN2Zy0yJykgPyBkMy5zZWxlY3QoJyNjaXJjbGUtc3ZnLTInKSA6IGNpcmNsZV9jb250YWluZXIuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpLmF0dHIoJ2lkJywgJ2NpcmNsZS1zdmctMicpO1xuXG4gICAgY29uc3QgZGF0YSA9IFt0b3RhbDEsIHRvdGFsMl1cblxuICAgIC8vIGNvbnN0IHN2ZzEgPSBjaXJjbGVfY29udGFpbmVyLmFwcGVuZCgnc3ZnJylcbiAgICAvLyAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAvLyAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKS5hdHRyKCdpZCcsICdjaXJjbGUtc3ZnLTEnKTtcblxuICAgIC8vIGNvbnN0IHN2ZzIgPSBjaXJjbGVfY29udGFpbmVyLmFwcGVuZCgnc3ZnJylcbiAgICAvLyAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAvLyAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKS5hdHRyKCdpZCcsICdjaXJjbGUtc3ZnLTInKTtcblxuICAgIGNvbnN0IHJzY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbihbMCwgKGQzLm1heChkYXRhKSldKVxuICAgICAgICAucmFuZ2UoWzEsIGhlaWdodCAvIDJdKVxuXG4gICAgaWYgKCF1cGRhdGUpIHtcbiAgICAgICAgY29uc3QgY2lyY2xlMSA9IHN2ZzEuc2VsZWN0QWxsKCcuY2lyY2xlcy0xJykuZGF0YShbdG90YWwxXSlcbiAgICAgICAgY29uc3QgY2lyY2xlMiA9IHN2ZzIuc2VsZWN0QWxsKCcuY2lyY2xlcy0yJykuZGF0YShbdG90YWwyXSlcbiAgICAgICAgY2lyY2xlMS5lbnRlcigpLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlcy0xJykuYXR0cignY3knLCBoZWlnaHQgLyAyKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgKGQsIGkpID0+IHdpZHRoIC8gMilcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJyMwYTgwYWUnKVxuXG4gICAgICAgIGNpcmNsZTIuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJzY2FsZShkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGVzLTInKS5hdHRyKCdjeScsIGhlaWdodCAvIDIpXG4gICAgICAgICAgICAuYXR0cignY3gnLCAoZCwgaSkgPT4gd2lkdGggLyAyKVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnIzBhODBhZScpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgZDMuc2VsZWN0KCcuY2lyY2xlcy0xJylcbiAgICAgICAgLmRhdGEoW3RvdGFsMV0pXG4gICAgICAgIC50cmFuc2l0aW9uKCkuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJzY2FsZShkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgZDMuc2VsZWN0KCcuY2lyY2xlcy0yJylcbiAgICAgICAgLmRhdGEoW3RvdGFsMl0pXG4gICAgICAgIC50cmFuc2l0aW9uKCkuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJzY2FsZShkKVxuICAgICAgICAgICAgfSlcbiAgICB9XG4gICAgXG59IiwiaW1wb3J0IHsgQ0lSQ0xFX0NPTE9SUyB9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkJveCA9IChhcnJheV9vZl9vYmpzLCBwaWVfbnVtKSA9PiB7XG4gICAgY29uc3Qgc2lkZSA9IHBpZV9udW0gPT09IDEgPyAnbGVmdC1ib3gtJyA6ICdyaWdodC1ib3gtJ1xuICAgIGFycmF5X29mX29ianMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgaSA9IDQ7XG4gICAgICAgIHN3aXRjaCAob2JqLmtleSkge1xuICAgICAgICAgICAgY2FzZSBcIk90aGVyIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiSW5jb21lIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDEgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTGljZW5zZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAyIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlByb3BlcnR5IFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDMgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2lkZSArIGkpXG4gICAgICAgIGNvbnN0IGRlY2ltYWxzID0gU3RyaW5nKG9iai5wZXJjZW50KS5zcGxpdCgnLicpWzFdXG4gICAgICAgIGNvbnN0IGludGVnZXJzID0gU3RyaW5nKG9iai5wZXJjZW50KS5zcGxpdCgnLicpWzBdXG4gICAgICAgIGNvbnN0IHNsaWNlZCA9IG9iai5wZXJjZW50ID8gaW50ZWdlcnMgKyAnLicgKyBkZWNpbWFscy5zbGljZSgwLCAyKSA6IDBcbiAgICAgICAgYm94LmlubmVySFRNTCA9IHNsaWNlZCArICclJ1xuICAgIH0pO1xufVxuXG4vLyBkLkFNT1VOVCA9PT0gJ1gnID8gMCA6IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwLFxuZXhwb3J0IGNvbnN0IGZpbmRBbW91bnQgPSAoYW1vdW50KSA9PiB7XG4gICAgcmV0dXJuIGFtb3VudCA9PT0gJ1gnID8gMCA6IGFtb3VudC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMFxufVxuXG4vLyBleHBvcnQgY29uc3Qgc3ViRGF0YVB1c2hlciA9IChpdGVtKSA9PiB7XG4vLyAgICAgaWYgKGl0ZW0gIT0gXCJUMDBcIiAmJiBpdGVtICE9IFwiVDAxXCIpIHtcbi8vICAgICAgICAgc3dpdGNoIChpdGVtLnNsaWNlKDAsIDIpKSB7XG4vLyAgICAgICAgICAgICBjYXNlIChcIlQwXCIgfHwgXCJUMVwiKTpcbi8vICAgICAgICAgICAgICAgICBzYWxlc190YXhlcy5wdXNoKHtcbi8vICAgICAgICAgICAgICAgICAgICAga2V5OiBkLlRheF9UeXBlLFxuLy8gICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuLy8gICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoZmluZEFtb3VudChkLkFNT1VOVCkgLyBUT1RBTCkgKiAxMDBcbi8vICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgIFxuLy8gICAgICAgICAgICAgY2FzZSBcIlQyXCI6XG4vLyAgICAgICAgICAgICAgICAgbGljZW5zZV90YXhlcy5wdXNoKHtcbiAgICBcbi8vICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfVxuXG5cblxuZXhwb3J0IGNvbnN0IHN1YkFycmF5TG9jYXRvciA9ICh0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KSA9PiB7ICAvLyBoZWxwZXIgZnVuY3Rpb24gZm9yIGZpbmRpbmcgdGhlIHJpZ2h0IHN1YiBhcnJheS4gQSBiaXQgaGFyZC1jb2RlZC5cbiAgICBzd2l0Y2ggKHRheF90eXBlKSB7XG4gICAgICAgIGNhc2UgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMF1cbiAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMV1cbiAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsyXVxuICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbM11cbiAgICAgICAgY2FzZSBcIlByb3BlcnR5IFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzRdXG4gICAgfVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHdhcyB0YWtlbiBmcm9tIHVzZXIgUGltcCBUcml6a2l0cyBwb3N0IG9uIHN0YWNrb3ZlcmZsb3cgYXQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTU2MDI0OC9wcm9ncmFtbWF0aWNhbGx5LWxpZ2h0ZW4tb3ItZGFya2VuLWEtaGV4LWNvbG9yLW9yLXJnYi1hbmQtYmxlbmQtY29sb3JzXG5leHBvcnQgZnVuY3Rpb24gTGlnaHRlbkRhcmtlbkNvbG9yKGNvbCwgYW10KSB7XG4gICAgdmFyIHVzZVBvdW5kID0gZmFsc2U7XG4gICAgaWYgKGNvbFswXSA9PSBcIiNcIikge1xuICAgICAgICBjb2wgPSBjb2wuc2xpY2UoMSk7XG4gICAgICAgIHVzZVBvdW5kID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgbnVtID0gcGFyc2VJbnQoY29sLCAxNik7XG5cbiAgICB2YXIgciA9IChudW0gPj4gMTYpICsgYW10O1xuXG4gICAgaWYgKHIgPiAyNTUpIHIgPSAyNTU7XG4gICAgZWxzZSBpZiAociA8IDApIHIgPSAwO1xuXG4gICAgdmFyIGIgPSAoKG51bSA+PiA4KSAmIDB4MDBGRikgKyBhbXQ7XG5cbiAgICBpZiAoYiA+IDI1NSkgYiA9IDI1NTtcbiAgICBlbHNlIGlmIChiIDwgMCkgYiA9IDA7XG5cbiAgICB2YXIgZyA9IChudW0gJiAweDAwMDBGRikgKyBhbXQ7XG5cbiAgICBpZiAoZyA+IDI1NSkgZyA9IDI1NTtcbiAgICBlbHNlIGlmIChnIDwgMCkgZyA9IDA7XG5cbiAgICByZXR1cm4gKHVzZVBvdW5kID8gXCIjXCIgOiBcIlwiKSArIChnIHwgKGIgPDwgOCkgfCAociA8PCAxNikpLnRvU3RyaW5nKDE2KTtcbn1cbi8vIFRoaXMgZnVuY3Rpb24gd2FzIGFsc28gdGFrZW4gZnJvbSB1c2VyIFBpbXAgVHJpemtpdHMgcG9zdCBvbiBzdGFja292ZXJmbG93IGF0IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU1NjAyNDgvcHJvZ3JhbW1hdGljYWxseS1saWdodGVuLW9yLWRhcmtlbi1hLWhleC1jb2xvci1vci1yZ2ItYW5kLWJsZW5kLWNvbG9yc1xuZXhwb3J0IGNvbnN0IHBTQkMgPSAocCwgYzAsIGMxLCBsKSA9PiB7XG4gICAgbGV0IHIsIGcsIGIsIFAsIGYsIHQsIGgsIGkgPSBwYXJzZUludCwgbSA9IE1hdGgucm91bmQsIGEgPSB0eXBlb2YgKGMxKSA9PSBcInN0cmluZ1wiO1xuICAgIGlmICh0eXBlb2YgKHApICE9IFwibnVtYmVyXCIgfHwgcCA8IC0xIHx8IHAgPiAxIHx8IHR5cGVvZiAoYzApICE9IFwic3RyaW5nXCIgfHwgKGMwWzBdICE9ICdyJyAmJiBjMFswXSAhPSAnIycpIHx8IChjMSAmJiAhYSkpIHJldHVybiBudWxsO1xuICAgIGlmICghdGhpcy5wU0JDcikgdGhpcy5wU0JDciA9IChkKSA9PiB7XG4gICAgICAgIGxldCBuID0gZC5sZW5ndGgsIHggPSB7fTtcbiAgICAgICAgaWYgKG4gPiA5KSB7XG4gICAgICAgICAgICBbciwgZywgYiwgYV0gPSBkID0gZC5zcGxpdChcIixcIiksIG4gPSBkLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChuIDwgMyB8fCBuID4gNCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB4LnIgPSBpKHJbM10gPT0gXCJhXCIgPyByLnNsaWNlKDUpIDogci5zbGljZSg0KSksIHguZyA9IGkoZyksIHguYiA9IGkoYiksIHguYSA9IGEgPyBwYXJzZUZsb2F0KGEpIDogLTFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChuID09IDggfHwgbiA9PSA2IHx8IG4gPCA0KSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGlmIChuIDwgNikgZCA9IFwiI1wiICsgZFsxXSArIGRbMV0gKyBkWzJdICsgZFsyXSArIGRbM10gKyBkWzNdICsgKG4gPiA0ID8gZFs0XSArIGRbNF0gOiBcIlwiKTtcbiAgICAgICAgICAgIGQgPSBpKGQuc2xpY2UoMSksIDE2KTtcbiAgICAgICAgICAgIGlmIChuID09IDkgfHwgbiA9PSA1KSB4LnIgPSBkID4+IDI0ICYgMjU1LCB4LmcgPSBkID4+IDE2ICYgMjU1LCB4LmIgPSBkID4+IDggJiAyNTUsIHguYSA9IG0oKGQgJiAyNTUpIC8gMC4yNTUpIC8gMTAwMDtcbiAgICAgICAgICAgIGVsc2UgeC5yID0gZCA+PiAxNiwgeC5nID0gZCA+PiA4ICYgMjU1LCB4LmIgPSBkICYgMjU1LCB4LmEgPSAtMVxuICAgICAgICB9IHJldHVybiB4XG4gICAgfTtcbiAgICBoID0gYzAubGVuZ3RoID4gOSwgaCA9IGEgPyBjMS5sZW5ndGggPiA5ID8gdHJ1ZSA6IGMxID09IFwiY1wiID8gIWggOiBmYWxzZSA6IGgsIGYgPSBwU0JDcihjMCksIFAgPSBwIDwgMCwgdCA9IGMxICYmIGMxICE9IFwiY1wiID8gcFNCQ3IoYzEpIDogUCA/IHsgcjogMCwgZzogMCwgYjogMCwgYTogLTEgfSA6IHsgcjogMjU1LCBnOiAyNTUsIGI6IDI1NSwgYTogLTEgfSwgcCA9IFAgPyBwICogLTEgOiBwLCBQID0gMSAtIHA7XG4gICAgaWYgKCFmIHx8ICF0KSByZXR1cm4gbnVsbDtcbiAgICBpZiAobCkgciA9IG0oUCAqIGYuciArIHAgKiB0LnIpLCBnID0gbShQICogZi5nICsgcCAqIHQuZyksIGIgPSBtKFAgKiBmLmIgKyBwICogdC5iKTtcbiAgICBlbHNlIHIgPSBtKChQICogZi5yICoqIDIgKyBwICogdC5yICoqIDIpICoqIDAuNSksIGcgPSBtKChQICogZi5nICoqIDIgKyBwICogdC5nICoqIDIpICoqIDAuNSksIGIgPSBtKChQICogZi5iICoqIDIgKyBwICogdC5iICoqIDIpICoqIDAuNSk7XG4gICAgYSA9IGYuYSwgdCA9IHQuYSwgZiA9IGEgPj0gMCB8fCB0ID49IDAsIGEgPSBmID8gYSA8IDAgPyB0IDogdCA8IDAgPyBhIDogYSAqIFAgKyB0ICogcCA6IDA7XG4gICAgaWYgKGgpIHJldHVybiBcInJnYlwiICsgKGYgPyBcImEoXCIgOiBcIihcIikgKyByICsgXCIsXCIgKyBnICsgXCIsXCIgKyBiICsgKGYgPyBcIixcIiArIG0oYSAqIDEwMDApIC8gMTAwMCA6IFwiXCIpICsgXCIpXCI7XG4gICAgZWxzZSByZXR1cm4gXCIjXCIgKyAoNDI5NDk2NzI5NiArIHIgKiAxNjc3NzIxNiArIGcgKiA2NTUzNiArIGIgKiAyNTYgKyAoZiA/IG0oYSAqIDI1NSkgOiAwKSkudG9TdHJpbmcoMTYpLnNsaWNlKDEsIGYgPyB1bmRlZmluZWQgOiAtMilcbn1cblxuZXhwb3J0IGNvbnN0IHJlbW92ZSA9IChpZCkgPT4ge1xuICAgIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxuICAgIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVDbGFzcyA9IGNsYXNzTmFtZSA9PiB7XG4gICAgY29uc3QgcmVtb3ZlX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlcbiAgICBkZWJ1Z2dlclxuICAgIHJlbW92ZV9saXN0Lmxlbmd0aCA/IHJlbW92ZV9saXN0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlKSA6IG51bGxcbn1cblxuZXhwb3J0IGNvbnN0IHBlcmNlbnRpZnkgPSBudW1iZXIgPT4ge1xuICAgIGlmICh0eXBlb2YgbnVtYmVyID09PSBTdHJpbmcpIHtcbiAgICAgICAgbnVtYmVyID0gcGFyc2VGbG9hdChudW1iZXIuc3BsaXQoJyQnKVsxXSlcbiAgICB9XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyICogMTAwKSAvIDEwMFxufSIsIi8vIEEgbG90IG9mIHRoaXMgY29kZSB3YXMgYmFzZWQgaGVhdmlseSBvZmYgb2YgS2FydGhpayBUaG90YSdzIHlvdXR1YmUgdHV0b3JpYWwgXCJJbnRyb2R1Y3Rpb24gdG8gZDMuanMgPSBQaWUgQ2hhcnQgYW5kIERvbnV0IENoYXJ0XCJcbi8vIFRoZSBsZWdlbmQgY29kZSB3YXMgZnJvbSBDcnlwdGVycyBJbmZvdGVjaCdzIHlvdXR1YmUgdHV0b3JpYWwgXCJQaWUgQ2hhcnQgdXNpbmcgRDMuanNcIlxuXG5pbXBvcnQgeyBhc3NpZ25Cb3gsIGZpbmRBbW91bnQgfSBmcm9tICcuL2hlbHBlcl9mdW5jdGlvbnMnXG5pbXBvcnQgeyBidWRnZXRDaXJjbGUgfSBmcm9tICcuL2J1ZGdldF9jaXJjbGUnXG5pbXBvcnQgeyBzdWJEYXRhLCB1cGRhdGVTdWJEYXRhIH0gZnJvbSAnLi9zdWJkYXRhX2dlbmVyYXRvcidcbmltcG9ydCB7IHRvb2x0aXBDcmVhdG9yIH0gZnJvbSAnLi9zdWJkYXRhX2dlbmVyYXRvcidcbi8vIFxuZXhwb3J0IGNvbnN0IENPTE9SUyA9IFtcIiNhNjc1MWVcIiwgXCIjOWEwMDQ3XCIsIFwiIzY2YTUxZVwiLCBcIiNlZTc3MzFcIiwgXCIjZTgyYjhhXCJdXG5leHBvcnQgY29uc3QgQ0lSQ0xFX0NPTE9SUyA9IFtDT0xPUlNbMV0sIENPTE9SU1swXSwgQ09MT1JTWzRdLCBDT0xPUlNbMl0sIENPTE9SU1szXV1cbi8vIGV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJPdGhlciBUYXhlc1wiXVxuZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIk90aGVyIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgVGF4ZXNcIl1cbi8vIGV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihjc3ZQYXRoLCBzZWN0b3IsIGFtb3VudCwgc3RhdGUsIG11bHRpcGxpZXIgPSAxLCBza2lwID0gMSkge1xuZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCB0YXhfdHlwZSwgcGllX251bSwgY3N2ID0gXCIuL3NyYy9hc3NldHMvZGF0YS9GWTIwMTgtU1RDLURldGFpbGVkLVRhYmxlLmNzdlwiLCB1cGRhdGUgPSB0cnVlKSB7XG5cbiAgICAvLyBjb25zdCByZW1vdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvdGFscy1cIiArIHBpZV9udW0pXG4gICAgLy8gcmVtb3ZlID8gcmVtb3ZlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlKSA6IG51bGxcbiAgICAvLyBjb25zdCByZW1vdmUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXRhaWxzLVwiICsgcGllX251bSlcbiAgICAvLyByZW1vdmUyID8gcmVtb3ZlMi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZTIpIDogbnVsbFxuXG4gICAgY29uc3QgaDEgPSBkMy5zZWxlY3QoJyN0b3RhbHMtaGVhZGVyLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IHNwYW4gPSBkMy5zZWxlY3QoJyN0b3RhbHMtc3Bhbi0nICsgcGllX251bSlcbiAgICBjb25zdCBoMiA9IGQzLnNlbGVjdChcIiNkZXRhaWxzLVwiICsgcGllX251bSlcblxuXG4gICAgbGV0IFRPVEFMID0gMDtcbiAgICBsZXQgVFlQRVMgPSBbXVxuICAgIC8vIENJUkNMRSBUSU1FIEJBQllcbiAgICAvLyBtYXJnaW4gYW5kIHJhZGl1c1xuICAgIGNvbnN0IG1hcmdpbiA9IHsgdG9wOiAyMDAsIHJpZ2h0OiAyMDAsIGJvdHRvbTogMjAwLCBsZWZ0OiAyMDAgfSxcbiAgICAgICAgaGVpZ2h0ID0gMTAwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tLFxuICAgICAgICB3aWR0aCA9IDEwMDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCxcbiAgICAgICAgcmFkaXVzID0gd2lkdGggLyAyO1xuXG5cblxuICAgIGNvbnN0IGNvbG9ycyA9IGQzLnNjYWxlT3JkaW5hbChDT0xPUlMpO1xuXG4gICAgLy8gYXJjIGdlbmVyYXRvclxuICAgIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSAxMClcbiAgICAgICAgLy8gLmlubmVyUmFkaXVzKDApOyAvLyBmb3IgY2lyY2xlXG4gICAgICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSAxMDApIC8vIGZvciBkb251dFxuXG4gICAgLy8gY29uc3QgbGFibGVBcmMgPSBkMy5hcmMoKVxuICAgIC8vICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gNTApXG4gICAgLy8gICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSA1MCk7XG5cbiAgICAvLyBwaWUgZ2VuZXJhdG9yXG4gICAgY29uc3QgcGllID0gZDMucGllKClcbiAgICAgICAgLy8gLnNvcnQobnVsbClcbiAgICAgICAgLnZhbHVlKGQgPT4gZC5hbW91bnQpO1xuXG4gICAgLy8gZGVmaW5lIHN2ZyBcbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIucGllLVwiICsgcGllX251bSkuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwiaWRcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB3aWR0aCAvIDIgKyBcIixcIiArIGhlaWdodCAvIDIgKyBcIilcIilcblxuICAgIC8vIGltcG9ydCBkYXRhXG4gICAgZDMuY3N2KGNzdikudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAvLyBpbml0aWFsaXplIGFycmF5cyB0aGF0IHdpbGwgY29udGFpbiB0aGUgc3ViIGxldmVsIHRheCBkYXRhXG4gICAgICAgIGxldCBzYWxlc190YXhlcyA9IFtdXG4gICAgICAgIGxldCBsaWNlbnNlX3RheGVzID0gW11cbiAgICAgICAgbGV0IGluY29tZV90YXhlcyA9IFtdXG4gICAgICAgIGxldCBvdGhlcl90YXhlcyA9IFtdXG4gICAgICAgIGxldCBwcm9wZXJ0eV90YXhlcyA9IFtdXG4gICAgICAgIC8vIGxldCBzdGF0ZV9idWRnZXRzID0ge31cbiAgICAgICAgLy8gbGV0IHNhbGVzX3RheF9vYmogPSB7IHRheF9ncm91cDogTEFCRUxTWzRdIH1cbiAgICAgICAgLy8gcGFyc2UgdGhlIGNzdlxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9IFwiVDAwXCIpIHsgIC8vIGRvbid0IHdhbnQgdG8gY2F0Y2ggVG90YWwgb3IgUHJvcGVydHkgVGF4ZXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRheF9vYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudF9vZl90b3RhbDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkLml0ZW0uc2xpY2UoMCwyKSkgeyAvLyBmaWxsIHVwIHN1YiBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gPT09IFwiVDA5XCIpIHsgc2FsZXNfdGF4ZXMucHVzaCh0YXhfb2JqKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDFcIikgeyBwcm9wZXJ0eV90YXhlcy5wdXNoKHRheF9vYmopIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzYWxlc190YXhfb2JqW2QuVGF4X1R5cGVdID0gZmluZEFtb3VudChkLkFNT1VOVClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMlwiOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29tZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9ICdUMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUWVBFUy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZC5rZXkgPSBkLlRheF9UeXBlO1xuICAgICAgICAgICAgICAgICAgICBkLmFtb3VudCA9IGZpbmRBbW91bnQoZC5BTU9VTlQpO1xuICAgICAgICAgICAgICAgICAgICBkLnBlcmNlbnQgPSAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWluZXJfYXJyYXkgPSBbXSAgLy8gc2V0dGluZyB1cCBjb250YWluZXIgYXJyYXkgZm9yIHBhc3NpbmcgaW50byBjbGljayBoYW5kbGVyXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChwcm9wZXJ0eV90YXhlcylcblxuICAgICAgICB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSlcbiAgICAgICAgLy8gc2V0IGgxIGFmdGVyIHRvdGFsIGhhcyBiZWVuIGRlZmluZWRcbiAgICAgICAgaDEudGV4dChzdGF0ZSArIFwiJ3MgdGF4IHJldmVudWUgZm9yIDIwMTggd2FzIFwiKVxuICAgICAgICBzcGFuLnRleHQoXCIkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgIGgyLnRleHQoXCJcIilcbiAgICAgICAgLy8gYXR0ZW1wdCBidWRnZXRDaXJjbGUgY2FsbFxuICAgICAgICAvLyBidWRnZXRDaXJjbGUoVE9UQUwpXG4gICAgICAgIC8vIHNldCB1cCB0aGUgcGVyY2VudGFnZXMgaW4gdGhlIGNlbnRlciBib3hcbiAgICAgICAgYXNzaWduQm94KFRZUEVTLCBwaWVfbnVtKVxuXG4gICAgICAgIGNvbnN0IGcgPSBzdmcuc2VsZWN0QWxsKFwiLmFyY1wiKVxuICAgICAgICAgICAgLmRhdGEocGllKGRhdGEpKVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwiZ1wiKSAgLy8gQW5kIHRoaXMgbGluZSB0byBncm93IHRoZSBudW1iZXIgb2YgZydzIHRvIHRoZSBkYXRhIHNldCBzaXplXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYXJjXCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIChkLCBpKSA9PiBkLnZhbHVlID09PSBUT1RBTCA/IFwibm9uZVwiIDogXCJudWxsXCIpOyAgLy8gYXR0ZW1wdCB0byByZW5kZXIgaGFsZiB0aGUgY2hhcnQgaW52aXNpYmxlXG4gICAgICAgICAgICBcbiAgICAgICAgLy8gYXBwZW5kIHRoZSBwYXRoIG9mIHRoZSBhcmNcbiAgICAgICAgY29uc3QgcGF0aCA9IGcuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIGFyYylcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZCA9PiBjb2xvcnMoZC5kYXRhLmtleSkpXG4gICAgICAgIFxuICAgICAgICBwYXRoLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmVhc2UoZDMuZWFzZUxpbmVhcilcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAuYXR0clR3ZWVuKCdkJywgcGllVHdlZW4pO1xuICAgICAgICBcbiAgICAgICAgLy8gcGF0aC5vbihcIm1vdXNlb3ZlclwiLCAoZCwgaSkgPT4geyAgLy8gd2h5IGRvZXNuJ3QgdGhpcyB3b3JrP1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGQpXG4gICAgICAgIC8vICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnRyYW5zaXRpb24oKVxuICAgICAgICAvLyAgICAgICAgICAgICAuZHVyYXRpb24oJzUwJylcbiAgICAgICAgLy8gICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAnLjg1JylcbiAgICAgICAgLy8gICAgICAgICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgJ3BvaW50ZXInKVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gZGV0ZXJtaW5lIGhvdyB0byBmbGlwIHRoZSBwaWVzXG4gICAgICAgIGlmIChwaWVfbnVtID09PSAyKSB7Ly8gZmxpcCB0aGUgc2Vjb25kIHBpZVxuICAgICAgICAgICAgZy5hdHRyKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWCgtMSkgdHJhbnNsYXRlKDMwMHB4LCAwcHgpIHNjYWxlWSgtMSlcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwic2NhbGVZKC0xKVwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBldmVudCBoYW5kbGVyc1xuICAgICAgICBjb25zdCBzdWJfZGF0YV9zdmcgPSBkMy5zZWxlY3QoJyNzdWItZGF0YS1nLScgKyBwaWVfbnVtKS5zZWxlY3RBbGwoJy5zdWItZGF0YS0nICsgcGllX251bSlcbiAgICAgICAgcGF0aC5vbihcIm1vdXNlb3ZlclwiLCAoZCwgaSkgPT4geyAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICAgIHBhdGgudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKCc1MDAnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgJ3BvaW50ZXInKVxuICAgICAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIH0pXG4gICAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGVsZSA9PiB7XG4gICAgICAgICAgICAvLyBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgJFwiICsgZDMuZm9ybWF0KCcsJykoVE9UQUwpKVxuICAgICAgICAgICAgLy8gaDIudGV4dChcIlwiKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrJywgaGFuZGxlQ2xpY2soY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSlcbiAgICAgICAgLy8gLm9uKCdjbGljaycsIHVwZGF0ZVN1YkRhdGEoY29udGFpbmVyX2FycmF5LCBzdWJfZGF0YV9zdmcsIHBpZV9udW0pKVxuICAgICAgICBjb25zb2xlLmxvZyhwaWVfbnVtKVxuICAgICAgICBjb25zdCBzcGFuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbHMtc3Bhbi0xJylcbiAgICAgICAgY29uc3Qgc3BhbjIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWxzLXNwYW4tMicpXG5cbiAgICAgICAgaWYgKHNwYW4xLmlubmVyVGV4dFxuICAgICAgICAgICAgJiYgc3BhbjIuaW5uZXJUZXh0KSB7XG4gICAgICAgICAgICBjb25zdCB0b3RhbDEgPSBwYXJzZUludChzcGFuMS5pbm5lclRleHQuc2xpY2UoMSkuc3BsaXQoJywnKS5qb2luKCcnKSlcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsMiA9IHBhcnNlSW50KHNwYW4yLmlubmVyVGV4dC5zbGljZSgxKS5zcGxpdCgnLCcpLmpvaW4oJycpKVxuICAgICAgICAgICAgYnVkZ2V0Q2lyY2xlKHRvdGFsMSwgdG90YWwyLCB1cGRhdGUpXG4gICAgICAgIH0gICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4geyBpZiAoZXJyb3IpIHRocm93IGVycm9yIH0pXG4gICAgXG4gICAgY29uc3QgcGllVHdlZW4gPSBiID0+IHtcbiAgICAgICAgYi5pbm5lclJhZGl1cyA9IDA7XG4gICAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZSh7IHN0YXJ0QW5nbGU6IDAsIGVuZEFuZ2xlOiAwIH0sIGIpXG4gICAgICAgIHJldHVybiAodCkgPT4geyByZXR1cm4gYXJjKGkodCkpIH1cbiAgICB9ICAgIFxufVxuXG5jb25zdCBoYW5kbGVDbGljayA9IChjb250YWluZXJfYXJyYXksIHBpZV9udW0pID0+IHtcbiAgICByZXR1cm4gZWxlID0+IHtcbiAgICAgICAgXG4gICAgICAgIHVwZGF0ZVN1YkRhdGEoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtLCBlbGUpXG4gICAgICAgIHRvb2x0aXBDcmVhdG9yKHBpZV9udW0sIGVsZS5kYXRhLlRheF9UeXBlLCBlbGUuZGF0YS5wZXJjZW50KVxuICAgIH1cbn1cbiAgICAgICAgIiwiaW1wb3J0IHsgQ0lSQ0xFX0NPTE9SUywgTEFCRUxTfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5pbXBvcnQgeyB1cGRhdGVTdWJEYXRhIH0gZnJvbSAnLi9zdWJkYXRhX2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IHBpZUxlZ2VuZCA9ICgpID0+IHtcbiAgICBjb25zdCBtYXN0ZXJfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuICAgIG1hc3Rlcl9saXN0LmNsYXNzTGlzdC5hZGQoJ21hc3Rlci1saXN0JylcblxuICAgIGNvbnN0IGxlZnRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCB0ZXh0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgcmlnaHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgIGxlZnRfbGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0LWxpc3QnKSAgXG4gICAgdGV4dF9saXN0LmNsYXNzTGlzdC5hZGQoJ3RleHQtbGlzdCcpICBcbiAgICByaWdodF9saXN0LmNsYXNzTGlzdC5hZGQoJ3JpZ2h0LWxpc3QnKSBcblxuICAgIGZvciAobGV0IGkgPSBMQUJFTFMubGVuZ3RoIC0gMSA7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBsZWZ0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgdGV4dF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IHJpZ2h0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICBsZWZ0X2JveC5jbGFzc0xpc3QuYWRkKCdib3gnLCAnbGVmdC1ib3gnKVxuICAgICAgICBsZWZ0X2JveC5pZCA9ICgnbGVmdC1ib3gtJyArIGkpXG4gICAgICAgIGxlZnRfYm94LnN0eWxlLmJhY2tncm91bmQgPSBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgcmlnaHRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdyaWdodC1ib3gnKVxuICAgICAgICByaWdodF9ib3guaWQgPSAoJ3JpZ2h0LWJveC0nICsgaSlcbiAgICAgICAgcmlnaHRfYm94LnN0eWxlLmJhY2tncm91bmQgPSBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgdGV4dF9ib3guY2xhc3NMaXN0LmFkZCgndGV4dC1ib3gnKVxuICAgICAgICB0ZXh0X2JveC5pbm5lckhUTUwgPSBMQUJFTFNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IENJUkNMRV9DT0xPUlNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCBcIiArIENJUkNMRV9DT0xPUlNbaV1cblxuICAgICAgICBsZWZ0X2xpc3QuYXBwZW5kQ2hpbGQobGVmdF9ib3gpXG4gICAgICAgIHRleHRfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2JveClcbiAgICAgICAgcmlnaHRfbGlzdC5hcHBlbmRDaGlsZChyaWdodF9ib3gpXG4gICAgfVxuXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQobGVmdF9saXN0KVxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKHRleHRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZChyaWdodF9saXN0KVxuICAgIHJldHVybiBtYXN0ZXJfbGlzdFxufVxuXG5jb25zdCBzdWJsaXN0cyA9IChsYWJlbCwgY29sb3IpID0+IHtcbiAgICBjb25zdCBsaXN0cyA9IFtdXG5cblxuICAgIGxlc3RsaXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnRsaXN0JylcbiAgICB0ZXh0bGlzdC5jbGFzc0xpc3QuYWRkKCd0ZXh0bGlzdCcpXG4gICAgcmlnaHRsaXN0LmNsYXNzTGlzdC5hZGQoJ3JpZ2h0bGlzdCcpXG5cbiAgICBjb25zdCBsZWZ0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGNvbnN0IHJpZ2h0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG5cblxuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG5cbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKGxlZnRCb3gpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsaSlcbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKHJpZ2h0Qm94KVxuICAgIHJldHVybiBzdWJsaXN0XG59XG5cbiIsImltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgdG9vbHRpcENyZWF0b3IgfSBmcm9tICcuL3N1YmRhdGFfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgVE9QX0xFVkVMID0gWydUMDAnLCAnVDAxJywgJ1RBMScsICdUQTMnLCAnVEE0JywgJ1RBNSddXG5jb25zdCBTVEFURV9OQU1FUyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggQ2Fyb2xpbmEnLCAnTm9ydGggRGFrb3RhJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ11cblxuZXhwb3J0IGNvbnN0IHN0YXRlX3NlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcbiBcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcInNlbGVjdC13cmFwcGVyLVwiICsgcGllX251bSlcbiAgICB3cmFwcGVyLmlkID0gXCJzZWxlY3Qtd3JhcHBlci1cIiArIHBpZV9udW1cblxuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgc2VsZWN0LmlubmVySFRNTCA9IHBpZV9udW0gPT09IDEgPyAnQWxhYmFtYScgOiAnV3lvbWluZydcbiAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwic2VsZWN0LVwiICsgcGllX251bSlcbiAgICBzZWxlY3QuaWQgPSBcInNlbGVjdC1cIiArIHBpZV9udW1cblxuICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgfSlcbiAgICBcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSAgLy8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHNvIHRoYXQgaWYgSSBjbGljayBhbnl3aGVyZSBlbHNlIHRoZSBsaXN0IGRpc2FwcGVhcnNcbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICB9KVxuICAgIFxuICAgIGNvbnN0IHN0YXRlU2VsZWN0b3IgPSBzdGF0ZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdC1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzZWxlY3QuaW5uZXJUZXh0ID0gc3RhdGVcbiAgICAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIHN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZylcbiAgICAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG4gICAgICAgICAgICAvLyB0b29sdGlwQ3JlYXRvcihwaWVfbnVtKVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHN0YXRlX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdzdGF0ZS1saXN0LScgKyBwaWVfbnVtKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICBzdGF0ZV9saXN0LmlkID0gJ3N0YXRlLWxpc3QtJyArIHBpZV9udW1cbiAgICBcbiAgICBTVEFURV9OQU1FUy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGVfbGlzdF9pdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5pbm5lckhUTUwgPSBzdGF0ZVxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4gICAgICAgIHN0YXRlX2xpc3QuYXBwZW5kQ2hpbGQoc3RhdGVfbGlzdF9pdGVtKVxuICAgIH0pXG4gICAgXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChzZWxlY3QpXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChzdGF0ZV9saXN0KVxuICAgIFxuICAgIHJldHVybiB3cmFwcGVyXG59XG5cbi8vIGNvbnN0IHBoYXNlT3V0ID0gKG5vZGUpID0+IHtcblxuLy8gICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxuLy8gfSIsImV4cG9ydCBjb25zdCBzdWJEYXRhTGVnZW5kID0gKGNvbG9ycywgbGFiZWxzLCBoZWlnaHRzLCBwaWVfbnVtKSA9PiB7XG4gICAgY29uc3QgbWFzdGVyX3N1Yl9kYXRhX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcbiAgICBtYXN0ZXJfc3ViX2RhdGFfbGlzdC5jbGFzc0xpc3QuYWRkKCdtYXN0ZXItc3ViLWRhdGEtbGlzdC0nICsgcGllX251bSlcbiAgICBtYXN0ZXJfc3ViX2RhdGFfbGlzdC5pZCA9ICdtYXN0ZXItc3ViLWRhdGEtbGlzdC0nICsgcGllX251bVxuXG4gICAgY29uc3QgcGVyY2VudF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IGxhYmVsX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgY29sb3JfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgZm9yIChsZXQgaSA9IGxhYmVscy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXG4gICAgICAgIC8vIGNvbnN0IHJlbGF0aXZlX3BlcmNlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIC8vIGNvbnN0IG92ZXJhbGxfcGVyY2VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IGNvbG9yX2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICB0ZXh0X2JveC5jbGFzc0xpc3QuYWRkKCdzdWItZGF0YS1sYWJlbC0nICsgcGllX251bSlcbiAgICAgICAgdGV4dF9ib3guaW5uZXJIVE1MID0gbGFiZWxzW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCBcIiArIENJUkNMRV9DT0xPUlNbaV1cbiAgICB9XG59IiwiaW1wb3J0IHsgc3ViQXJyYXlMb2NhdG9yLCBwZXJjZW50aWZ5LCBMaWdodGVuRGFya2VuQ29sb3IsIHJlbW92ZSwgcmVtb3ZlQ2xhc3MgfSBmcm9tICcuL2hlbHBlcl9mdW5jdGlvbnMnXG5pbXBvcnQgeyBDSVJDTEVfQ09MT1JTLCBMQUJFTFMgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InO1xuaW1wb3J0IHsgc3ViRGF0YUxlZ2VuZCB9IGZyb20gJy4vc3ViX2RhdGFfbGVnZW5kJ1xuXG5jb25zdCB3aWR0aCA9IDkwICAvLyBzZXR0aW5nIHRoZSBkaW1lbnNpb25zIHRvIGNvcnJlc3BvbmQgdG8gdGhlIHBpZSBjaGFydHMnXG5jb25zdCBoZWlnaHQgPSA3NTBcbi8vIGNvbnN0IGhlaWdodCA9IDkwICAvLyBzZXR0aW5nIHRoZSBkaW1lbnNpb25zIHRvIGNvcnJlc3BvbmQgdG8gdGhlIHBpZSBjaGFydHMnXG4vLyBjb25zdCB3aWR0aCA9IDUwMFxuXG5jb25zdCB0b29sdGlwV2lkdGggPSAxMjAgLy8gd2lsbCBhbHRlciB0aGVzZSBhcyBuZWVkZWRcbmNvbnN0IHRvb2x0aXBIZWlnaHQgPSA0MFxuXG4vLyBleHBvcnQgY29uc3Qgc3ViRGF0YSA9IChjb250YWluZXJfYXJyYXksIHBpZV9udW0sIGNvbG9yX3N0cmluZyA9IFwiIzNGNkQyQVwiKSA9PiB7XG4vLyAgICAgLy8gYSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBsZWFybmVkIGZyb20gTWljaGFlbCBTdGFuYWxhbmQncyBcIlN0YWNrZWQgYmFyIGNoYXJ0IHdpdGggdG9vbHRpcHNcIiB0dXRvcmlhbCBhdCBodHRwOi8vYmwub2Nrcy5vcmcvbXN0YW5hbGFuZC82MTAwNzEzXG5cbi8vICAgICByZW1vdmUoJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcbi8vICAgICByZW1vdmUoJ3N1Yi1kYXRhLWxlZ2VuZC1zdmctJyArIHBpZV9udW0pXG5cbiAgICBcbi8vICAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIjc3ViLWRhdGEtXCIgKyBwaWVfbnVtKVxuLy8gICAgICAgICAuYXBwZW5kKFwic3ZnXCIpIFxuLy8gICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKS5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCkuYXR0cignaWQnLCAnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKVxuLy8gICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuLy8gICAgICAgICAuYXR0cignY2xhc3MnLCAnc3ViLWRhdGEtJyArIHBpZV9udW0pLmF0dHIoJ2lkJywgJ3N1Yi1kYXRhLWctJyArIHBpZV9udW0pXG4vLyAgICAgY29uc29sZS5sb2coc3ZnKVxuLy8gICAgIHVwZGF0ZVN1YkRhdGEoY29udGFpbmVyX2FycmF5LCBzdmcsIHBpZV9udW0pKG51bGwpXG4vLyB9XG5cblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVN1YkRhdGEgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtLCBlbGUpID0+IHtcbiAgICBcbiAgICAvLyByZXR1cm4gKGVsZSkgPT4ge1xuXG4gICAgICAgIHJlbW92ZSgnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKVxuICAgICAgICByZW1vdmUoJ3N1Yi1kYXRhLWxlZ2VuZC1zdmctJyArIHBpZV9udW0pXG5cblxuICAgICAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIjc3ViLWRhdGEtXCIgKyBwaWVfbnVtKVxuICAgICAgICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCkuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKS5hdHRyKCdpZCcsICdzdWItZGF0YS1zdmctJyArIHBpZV9udW0pXG4gICAgICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLScgKyBwaWVfbnVtKS5hdHRyKCdpZCcsICdzdWItZGF0YS1nLScgKyBwaWVfbnVtKVxuICAgICAgICAgICAgLy8gLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwic2NhbGVZKC0xKVwiKVxuXG5cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRheF90eXBlID0gZWxlID8gZWxlLmRhdGEua2V5IDogXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIlxuICAgICAgICBjb25zdCBjb2xvcl9zdHJpbmcgPSBjb2xvckNob29zZXIodGF4X3R5cGUpXG4gICAgICAgIGNvbnN0IHN1Yl9hcnJheSA9IHN1YkFycmF5TG9jYXRvcih0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KVxuICAgICAgICBsZXQgY29sb3JfY291bnQgPSAwXG4gICAgICAgIGxldCBpZF9jb3VudCA9IDBcbiAgICBcbiAgICAgICAgbGV0IHRheF9zdGFjayA9IHt9XG4gICAgICAgIC8vIHNldHRpbmcgdXAga2V5c1xuICAgICAgICBsZXQga2V5cyA9IFtdXG4gICAgICAgIC8vIGtleXMucHVzaCh0YXhfdHlwZSlcbiAgICAgICAgc3ViX2FycmF5LmZvckVhY2goKHN1Yl90YXgsIGkpID0+IHtcbiAgICAgICAgICAgIGtleXMucHVzaChzdWJfdGF4LmtleSlcbiAgICAgICAgICAgIHRheF9zdGFja1tzdWJfdGF4LmtleV0gPSBzdWJfdGF4LnBlcmNlbnRfb2ZfdG90YWxcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZDMuc3RhY2soKVxuICAgICAgICAgICAgLmtleXMoa2V5cylcbiAgICAgICAgICAgIC5vcmRlcihkMy5zdGFja09yZGVyTm9uZSlcbiAgICAgICAgICAgIC5vZmZzZXQoZDMuc3RhY2tPZmZzZXROb25lKVxuICAgICAgICBsZXQgdGF4X3N0YWNrX2FycmF5ID0gW11cbiAgICAgICAgdGF4X3N0YWNrX2FycmF5LnB1c2godGF4X3N0YWNrKVxuICAgICAgICBjb25zdCBsYXllcnMgPSBzdGFjayh0YXhfc3RhY2tfYXJyYXkpXG4gICAgXG4gICAgICAgIGNvbnN0IHhTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIDFdKVxuICAgICAgICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXG5cbiAgICAgICAgY29uc3QgbmV3X2NvbG9ycyA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFswLCBrZXlzLmxlbmd0aF0pXG4gICAgICAgICAgICAucmFuZ2UoW1wid2hpdGVcIiwgY29sb3Jfc3RyaW5nXSlcblxuICAgICAgICBjb25zdCB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCBkMy5zdW0oT2JqZWN0LnZhbHVlcyh0YXhfc3RhY2spKV0pICAvLyB0aGUgaW5jcmVtZW50IHVwIHRvIHRoZSB0b3RhbFxuICAgICAgICAgICAgLy8gLnJhbmdlKFtoZWlnaHQsIDBdKVxuICAgICAgICAgICAgLnJhbmdlKFswLCBoZWlnaHRdKVxuICAgIFxuICAgICAgICBjb25zdCBnID0gc3ZnLnNlbGVjdEFsbChcIi5zdWItdGF4ZXMtXCIgKyBwaWVfbnVtKSAgLy8gbm8gZyBhdCB0aGlzIHBvaW50LCBidXQgdGhleSB3aWxsIGhhdmUgdGhpcyBjbGFzc1xuICAgICAgICAgICAgLmRhdGEobGF5ZXJzKS5lbnRlcigpICAvLyBub3cgdGhlcmUgd2lsbCBiZSBhIGcgZm9yIGV2ZXJ5IGJhciB3aXRoaW4gdGhlIGdyYXBoLlxuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdWItdGF4ZXMtXCIgKyBwaWVfbnVtKVxuICAgIFxuICAgICAgICBjb25zdCByZWN0ID0gZy5zZWxlY3RBbGwoXCJyZWN0XCIpICAvLyBtYWtpbmcgZWFjaCBvYmogb2YgdGhlIGNvcnJlc3BvbmQgdG8gYSByZWN0IHdpdGhpbiB0aGUgZ1xuICAgICAgICAgICAgLmRhdGEobGF5ZXIgPT4gbGF5ZXIpOyAvLyBwdWxsaW5nIG91dCBlYWNoIGluZGl2aWR1YWwgb2JqXG4gICAgICAgICAgICByZWN0LmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJlY3QuZW50ZXIoKS5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBkID0+IHhTY2FsZSgwKSlcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4U2NhbGUoMSkpICAvLyBwcm9iYWJseSBjYW4gaGFyZCBjb2RlLCBzaW5jZSBvbmx5IG9uZSBiYXJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCAoZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYHN0YWNrLSR7cGllX251bX0tJHtpZF9jb3VudCsrfWBcbiAgICAgICAgICAgICAgICB9KS5tZXJnZShyZWN0KVxuXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBkID0+IHhTY2FsZSgwKSkgIC8vIHBhc3NpbmcgZWFjaCBvYmoncyB4IHZhbHVlIHRvIHRoZSBkMyB4IGZ1bmN0aW9uIGRlZmluZWQgYWJvdmVcbiAgICAgICAgICAgIC5hdHRyKCd5JywgbGF5ZXIgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHQgLSB5U2NhbGUobGF5ZXJbMV0pXG4gICAgICAgICAgICB9KSAgLy8geTAgaXMgdGhlIGhlaWdodCB3aGVyZSBlYWNoIHNlZ21lbnQgaW4gdGhlIHN0YWNrIHN0YXJ0c1xuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgeFNjYWxlKDEpKSAgLy8gcHJvYmFibHkgY2FuIGhhcmQgY29kZSwgc2luY2Ugb25seSBvbmUgYmFyXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgYmFyID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4geVNjYWxlKGJhclsxXSAtIGJhclswXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsIChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld19jb2xvcnMoKytjb2xvcl9jb3VudClcbiAgICAgICAgICAgIH0pIFxuICAgICAgICBcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IGVsZSA/IGVsZS5kYXRhLnBlcmNlbnQgOiBudWxsXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge3Rvb2x0aXBDcmVhdG9yKHBpZV9udW0sIHRheF90eXBlLCBwZXJjZW50KX0sIDApXG4gICAgICAgIC8vIHRvb2x0aXBDcmVhdG9yKHBpZV9udW0sIHRheF90eXBlKVxuXG4gICAgbGVnZW5kQ3JlYXRvcihwaWVfbnVtLCBrZXlzLCBuZXdfY29sb3JzKVxuICAgIC8vIHN1YkRhdGFMZWdlbmQobmV3X2NvbG9ycywgKVxuXG4gICAgLy8gfVxuXG59XG5cbmNvbnN0IGNvbG9yQ2hvb3NlciA9ICh0YXhfdHlwZSkgPT4ge1xuICAgIHN3aXRjaCAodGF4X3R5cGUpIHtcbiAgICAgICAgY2FzZSBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbNF1cbiAgICAgICAgY2FzZSAnUHJvcGVydHkgVGF4ZXMnOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbM11cbiAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzJdXG4gICAgICAgIGNhc2UgJ0luY29tZSBUYXhlcyc6XG4gICAgICAgICAgICByZXR1cm4gQ0lSQ0xFX0NPTE9SU1sxXVxuICAgICAgICBjYXNlICdPdGhlciBUYXhlcyc6XG4gICAgICAgICAgICByZXR1cm4gQ0lSQ0xFX0NPTE9SU1swXVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRvb2x0aXBDcmVhdG9yID0gKHBpZV9udW0sIHRheF90eXBlLCBwZXJjZW50KSA9PiB7XG4gICAgXG4gICAgY29uc3Qgc3ViX2RhdGFfZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBkYXRhLWRldGFpbHMtdHlwZS0ke3BpZV9udW19YClcbiAgICBjb25zdCByZWxhdGl2ZV9wZXJjZW50X2RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcmVsYXRpdmUtcGVyY2VudC0ke3BpZV9udW19YClcbiAgICBjb25zdCBvdmVyYWxsX3BlcmNlbnRfZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBvdmVyYWxsLXBlcmNlbnQtJHtwaWVfbnVtfWApXG4gICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWItZGF0YS1kZXRhaWxzLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICAgIGNvbnN0IHZhbmlsbGFfc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcbiAgICBsZXQgaW5kZXg7XG5cbiAgICBpZiAoIXRheF90eXBlIHx8IHRheF90eXBlID09PSBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiKSB7XG4gICAgICAgIHRheF90eXBlID0gJ1NhbGVzIFRheGVzJ1xuICAgICAgICBpbmRleCA9IExBQkVMUy5pbmRleE9mKHRheF90eXBlKVxuICAgICAgICBwZXJjZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2lkZSArIGAtYm94LWAgKyBpbmRleCkuaW5uZXJIVE1MXG4gICAgICAgIHBlcmNlbnQgPSBwYXJzZUZsb2F0KHBlcmNlbnQuc2xpY2UoMCwgLTEpKVxuICAgIH1cbiAgICBcbiAgICBpbmRleCA9IExBQkVMUy5pbmRleE9mKHRheF90eXBlKVxuICAgIHN1Yl9kYXRhX2RldGFpbHMuaW5uZXJIVE1MID0gYCR7dGF4X3R5cGV9YFxuICAgIHJlbGF0aXZlX3BlcmNlbnRfZGV0YWlscy5pbm5lckhUTUwgPSBgUGVyY2VudCBvZiB0b3RhbCBidWRnZXQ6ICR7cGVyY2VudGlmeShwZXJjZW50KX1gXG4gICAgb3ZlcmFsbF9wZXJjZW50X2RldGFpbHMuaW5uZXJIVE1MID0gJ1Njcm9sbCBvdmVyIHNpZGUgYmFyIHRvIHNlZSBzdWIgdGF4IGRhdGEgZm9yIHRoaXMgY2F0ZWdvcnknXG4gICAgbGlzdC5zdHlsZS5iYWNrZ3JvdW5kID0gQ0lSQ0xFX0NPTE9SU1tpbmRleF1cbiAgICAvLyB2YW5pbGxhX3N2Zy5hcHBlbmRDaGlsZCh2YW5pbGxhX3Rvb2x0aXApXG4gICAgXG4gICAgdmFuaWxsYV9zdmcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcbiAgICAgICAgaW5kZXggPSBMQUJFTFMuaW5kZXhPZih0YXhfdHlwZSlcbiAgICAgICAgY29uc3Qgc3BsaXRfaWQgID0gZS50YXJnZXQuaWQuc3BsaXQoJy0nKVxuICAgICAgICBjb25zdCBsZWdlbmRfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsZWdlbmQtdGV4dC0ke3NwbGl0X2lkWzFdfS0ke3NwbGl0X2lkWzJdfWApXG4gICAgICAgIC8vIGNvbnN0IGxlZ2VuZF9pdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGxlZ2VuZC1pdGVtLSR7c3BsaXRfaWRbMV19LSR7c3BsaXRfaWRbMl19YClcbiAgICAgICAgY29uc3QgYm94X2RhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaWRlICsgYC1ib3gtYCArIGluZGV4KS5pbm5lckhUTUxcbiAgICAgICAgXG4gICAgICAgIGxldCByZWxhdGl2ZV9wZXJjZW50ID0gKGUudGFyZ2V0LmhlaWdodC5iYXNlVmFsLnZhbHVlIC8gaGVpZ2h0KSAqIDEwMFxuICAgICAgICByZWxhdGl2ZV9wZXJjZW50ID0gTWF0aC5yb3VuZCgxMDAgKiByZWxhdGl2ZV9wZXJjZW50KSAvIDEwMFxuICAgICAgICBcbiAgICAgICAgbGV0IG92ZXJhbGxfcGVyY2VudCA9IHBhcnNlRmxvYXQoYm94X2RhdGEuc2xpY2UoMCwgLTEpKVxuICAgICAgICBvdmVyYWxsX3BlcmNlbnQgPSBNYXRoLnJvdW5kKDEwMCAqIG92ZXJhbGxfcGVyY2VudCAqIHJlbGF0aXZlX3BlcmNlbnQgLyAxMDApIC8gMTAwXG4gICAgICAgIC8vIGxldCBvdmVyYWxsX3BlcmNlbnQgPSBcbiAgICAgICAgLy8gbGVnZW5kX2l0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgb3ZlcmFsbF9wZXJjZW50X2RldGFpbHMuaW5uZXJIVE1MID0gYFBlcmNlbnQgb2YgdG90YWwgYnVkZ2V0OiBgICsgb3ZlcmFsbF9wZXJjZW50XG4gICAgICAgIHJlbGF0aXZlX3BlcmNlbnRfZGV0YWlscy5pbm5lckhUTUwgPSBgUGVyY2VudCBvZiBjYXRlZ29yeTogJHtyZWxhdGl2ZV9wZXJjZW50fWBcbiAgICAgICAgaWYgKGxlZ2VuZF90ZXh0KSB7IHN1Yl9kYXRhX2RldGFpbHMuaW5uZXJIVE1MID0gbGVnZW5kX3RleHQuaW5uZXJIVE1MIH1cbiAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2NvbG9yOiAnICsgQ0lSQ0xFX0NPTE9SU1tpbmRleF0pXG4gICAgICAgIC8vIGxpc3RfY29sb3Iuc3R5bGUuYm9yZGVyID0gYDRweCBzb2xpZCAke0NJUkNMRV9DT0xPUlNbaW5kZXhdfWBcbiAgICAgICAgLy8gdmFuaWxsYV90b29sdGlwLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgfSlcbiAgICB2YW5pbGxhX3N2Zy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGUgPT4ge1xuXG4gICAgfSlcblxufVxuXG5jb25zdCBsZWdlbmRDcmVhdG9yID0gKHBpZV9udW0sIGtleXMsIG5ld19jb2xvcnMpID0+IHtcblxuICAgIGxldCBjb2xvcl9jb3VudCA9IDBcbiAgICBsZXQgaWRfY291bnQgPSAwXG5cbiAgICBjb25zdCBsZWdlbmQgPSBkMy5zZWxlY3QoXCIjc3ViLWRhdGEtbGVnZW5kLVwiICsgcGllX251bSlcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLWxlZ2VuZC1zdmctJyArIHBpZV9udW0pLmF0dHIoJ2lkJywgJ3N1Yi1kYXRhLWxlZ2VuZC1zdmctJyArIHBpZV9udW0pXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxuXG4gICAgaWRfY291bnQgPSAwXG5cbiAgICBsZWdlbmQuc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAgICAgLmRhdGEoa2V5cy5yZXZlcnNlKCkpXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5pbnNlcnQoJ3RleHQnKVxuICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCd4JywgMTgpLmF0dHIoJ3knLCAnMCcpXG4gICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdzdGFydCcpXG4gICAgICAgIC5hdHRyKCdhbGlnbm1lbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdoaWRkZW4nKVxuICAgICAgICAuYXR0cignaWQnLCBkID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgbGVnZW5kLXRleHQtJHtwaWVfbnVtfS0ke2lkX2NvdW50Kyt9YDtcbiAgICAgICAgfSlcbn1cblxuIiwiaW1wb3J0IHsgdG9vbHRpcENyZWF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvc3ViZGF0YV9nZW5lcmF0b3InXG5pbXBvcnQgeyBQaWVDaGFydEdlbmVyYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgcGllTGVnZW5kIH0gZnJvbSAnLi9jb21wb25lbnRzL3BpZV9sZWdlbmQnXG5pbXBvcnQgeyBzdGF0ZV9zZWxlY3RvciwgVE9QX0xFVkVMIH0gZnJvbSAnLi9jb21wb25lbnRzL3N0YXRlX3NlbGVjdG9yJ1xuaW1wb3J0IHsgYnVkZ2V0Q2lyY2xlIH0gZnJvbSAnLi9jb21wb25lbnRzL2J1ZGdldF9jaXJjbGUnXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJ1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgXG4gICAgLy8gUENHIC0+IGNzdlBhdGgsIHNlY3RvciwgYW1vdXQsIGxvY2F0aW9uLCBtdWx0aXBsaWVyLCBza2lwXG4gICAgXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKVxuICAgIC8vIGNvbnN0IHVsID0gcGllTGVnZW5kKClcbiAgICBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3Qgc2VsZWN0XzEgPSBzdGF0ZV9zZWxlY3RvcigxKVxuICAgIGNvbnN0IHNlbGVjdF8yID0gc3RhdGVfc2VsZWN0b3IoMilcbiAgICBjb25zdCBzZWxlY3Rvcl9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VsZWN0b3ItY29udGFpbmVyXCIpWzBdXG4gICAgY29uc3QgeWVhclNlbGVjdG9yID0geWVhclNlbGVjdG9yXG5cbiAgICBzZWxlY3Rvcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0XzEpXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8yKVxuICAgIHJvb3QuYXBwZW5kQ2hpbGQodWwpXG5cbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIkFsYWJhbWFcIiwgVE9QX0xFVkVMLCAxLCBcIi4vc3JjL2Fzc2V0cy9kYXRhL0ZZMjAxOC1TVEMtRGV0YWlsZWQtVGFibGUuY3N2XCIsIGZhbHNlKVxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKFwiV3lvbWluZ1wiLCBUT1BfTEVWRUwsIDIsIFwiLi9zcmMvYXNzZXRzL2RhdGEvRlkyMDE4LVNUQy1EZXRhaWxlZC1UYWJsZS5jc3ZcIiwgZmFsc2UpXG4gICAgLy8gdG9vbHRpcENyZWF0b3IoMSlcbiAgICAvLyB0b29sdGlwQ3JlYXRvcigyKVxuICAgIFxufSlcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=