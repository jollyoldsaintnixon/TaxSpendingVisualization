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
        }).transition().ease(d3.easeLinear).duration(500).attrTween('d', pieTween);

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
        g.on("mouseover", function (d, i) {
            console.log(d);
            d3.select(_this).transition().duration('50').attr('opacity', '.85').attr("cursor", 'pointer');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnVkZ2V0X2NpcmNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9oZWxwZXJfZnVuY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGllX2xlZ2VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdGF0ZV9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdWJfZGF0YV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3ViZGF0YV9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYXBwLnNjc3MiXSwibmFtZXMiOlsiYnVkZ2V0Q2lyY2xlIiwidG90YWwxIiwidG90YWwyIiwidXBkYXRlIiwiTWF0aCIsInNxcnQiLCJjaXJjbGVfY29udGFpbmVyIiwiZDMiLCJzZWxlY3QiLCJoZWlnaHQiLCJ3aWR0aCIsInN2ZzEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYXBwZW5kIiwiYXR0ciIsInN2ZzIiLCJkYXRhIiwicnNjYWxlIiwic2NhbGVMaW5lYXIiLCJkb21haW4iLCJtYXgiLCJyYW5nZSIsImNpcmNsZTEiLCJzZWxlY3RBbGwiLCJjaXJjbGUyIiwiZW50ZXIiLCJkIiwiaSIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsIkxpZ2h0ZW5EYXJrZW5Db2xvciIsImFzc2lnbkJveCIsImFycmF5X29mX29ianMiLCJwaWVfbnVtIiwic2lkZSIsImZvckVhY2giLCJvYmoiLCJrZXkiLCJib3giLCJkZWNpbWFscyIsIlN0cmluZyIsInBlcmNlbnQiLCJzcGxpdCIsImludGVnZXJzIiwic2xpY2VkIiwic2xpY2UiLCJpbm5lckhUTUwiLCJmaW5kQW1vdW50IiwiYW1vdW50Iiwiam9pbiIsInN1YkFycmF5TG9jYXRvciIsInRheF90eXBlIiwiY29udGFpbmVyX2FycmF5IiwiY29sIiwiYW10IiwidXNlUG91bmQiLCJudW0iLCJwYXJzZUludCIsInIiLCJiIiwiZyIsInRvU3RyaW5nIiwicFNCQyIsInAiLCJjMCIsImMxIiwibCIsIlAiLCJmIiwidCIsImgiLCJtIiwicm91bmQiLCJhIiwicFNCQ3IiLCJuIiwibGVuZ3RoIiwieCIsInBhcnNlRmxvYXQiLCJ1bmRlZmluZWQiLCJyZW1vdmUiLCJpZCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInJlbW92ZUNsYXNzIiwicmVtb3ZlX2xpc3QiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwicGVyY2VudGlmeSIsIm51bWJlciIsImZsb29yIiwiUGllQ2hhcnRHZW5lcmF0b3IiLCJDT0xPUlMiLCJDSVJDTEVfQ09MT1JTIiwiTEFCRUxTIiwic3RhdGUiLCJjc3YiLCJoMSIsInNwYW4iLCJoMiIsIlRPVEFMIiwiVFlQRVMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJyYWRpdXMiLCJjb2xvcnMiLCJzY2FsZU9yZGluYWwiLCJhcmMiLCJvdXRlclJhZGl1cyIsImlubmVyUmFkaXVzIiwicGllIiwidmFsdWUiLCJzdmciLCJ0aGVuIiwic2FsZXNfdGF4ZXMiLCJsaWNlbnNlX3RheGVzIiwiaW5jb21lX3RheGVzIiwib3RoZXJfdGF4ZXMiLCJwcm9wZXJ0eV90YXhlcyIsIkdlb19OYW1lIiwiaXRlbSIsIkFNT1VOVCIsInRheF9vYmoiLCJUYXhfVHlwZSIsInBlcmNlbnRfb2ZfdG90YWwiLCJwdXNoIiwiaW5jbHVkZXMiLCJ0ZXh0IiwiZm9ybWF0Iiwic3R5bGUiLCJwYXRoIiwiZWFzZSIsImVhc2VMaW5lYXIiLCJhdHRyVHdlZW4iLCJwaWVUd2VlbiIsInN1Yl9kYXRhX3N2ZyIsIm9uIiwiY29uc29sZSIsImxvZyIsImhhbmRsZUNsaWNrIiwic3BhbjEiLCJzcGFuMiIsImlubmVyVGV4dCIsImNhdGNoIiwiZXJyb3IiLCJpbnRlcnBvbGF0ZSIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsImVsZSIsInBpZUxlZ2VuZCIsIm1hc3Rlcl9saXN0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImxlZnRfbGlzdCIsInRleHRfbGlzdCIsInJpZ2h0X2xpc3QiLCJsZWZ0X2JveCIsInRleHRfYm94IiwicmlnaHRfYm94IiwiYmFja2dyb3VuZCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiYm9yZGVyIiwiYXBwZW5kQ2hpbGQiLCJzdWJsaXN0cyIsImxhYmVsIiwibGlzdHMiLCJsZXN0bGlzdCIsInRleHRsaXN0IiwicmlnaHRsaXN0IiwibGVmdEJveCIsInJpZ2h0Qm94IiwibGkiLCJzdWJsaXN0IiwiVE9QX0xFVkVMIiwiU1RBVEVfTkFNRVMiLCJzdGF0ZV9zZWxlY3RvciIsIndyYXBwZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInN0YXRlX2xpc3QiLCJ0b2dnbGUiLCJib2R5IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdGF0ZVNlbGVjdG9yIiwic3RhdGVfbGlzdF9pdGVtIiwic2V0QXR0cmlidXRlIiwic3ViRGF0YUxlZ2VuZCIsImxhYmVscyIsImhlaWdodHMiLCJtYXN0ZXJfc3ViX2RhdGFfbGlzdCIsInBlcmNlbnRfbGlzdCIsImxhYmVsX2xpc3QiLCJjb2xvcl9ib3giLCJ0b29sdGlwV2lkdGgiLCJ0b29sdGlwSGVpZ2h0IiwidXBkYXRlU3ViRGF0YSIsImNvbG9yX3N0cmluZyIsImNvbG9yQ2hvb3NlciIsInN1Yl9hcnJheSIsImNvbG9yX2NvdW50IiwiaWRfY291bnQiLCJ0YXhfc3RhY2siLCJrZXlzIiwic3ViX3RheCIsInN0YWNrIiwib3JkZXIiLCJzdGFja09yZGVyTm9uZSIsIm9mZnNldCIsInN0YWNrT2Zmc2V0Tm9uZSIsInRheF9zdGFja19hcnJheSIsImxheWVycyIsInhTY2FsZSIsIm5ld19jb2xvcnMiLCJ5U2NhbGUiLCJzdW0iLCJPYmplY3QiLCJ2YWx1ZXMiLCJyZWN0IiwibGF5ZXIiLCJleGl0IiwibWVyZ2UiLCJiYXIiLCJzZXRUaW1lb3V0IiwidG9vbHRpcENyZWF0b3IiLCJsZWdlbmRDcmVhdG9yIiwic3ViX2RhdGFfZGV0YWlscyIsInJlbGF0aXZlX3BlcmNlbnRfZGV0YWlscyIsIm92ZXJhbGxfcGVyY2VudF9kZXRhaWxzIiwibGlzdCIsInZhbmlsbGFfc3ZnIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaXRfaWQiLCJ0YXJnZXQiLCJsZWdlbmRfdGV4dCIsImJveF9kYXRhIiwicmVsYXRpdmVfcGVyY2VudCIsImJhc2VWYWwiLCJvdmVyYWxsX3BlcmNlbnQiLCJsZWdlbmQiLCJyZXZlcnNlIiwiaW5zZXJ0Iiwicm9vdCIsInVsIiwic2VsZWN0XzEiLCJzZWxlY3RfMiIsInNlbGVjdG9yX2NvbnRhaW5lciIsInllYXJTZWxlY3RvciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFD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LFNBQWxCLEVBQTZCQSx5QkFBN0IsRUFBd0MsQ0FBeEMsRUFBMkMsaURBQTNDLEVBQThGLEtBQTlGO0FBQ0E7QUFDQTtBQUVILENBckJELEU7Ozs7Ozs7Ozs7O0FDUEEsdUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcblxuZXhwb3J0IGNvbnN0IGJ1ZGdldENpcmNsZSA9ICh0b3RhbDEsIHRvdGFsMiwgdXBkYXRlKSA9PiB7XG4gICAgLy8gSSBnb3QgYSBsb3Qgb2YgaGVscCBmcm9tIEJlbiBHYW8sIGFuIEFwcCBBY2FkZW15IFRBXG4gICAgaWYgKCF0b3RhbDEgfHwgIXRvdGFsMikge1xuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgdG90YWwxID0gTWF0aC5zcXJ0KHRvdGFsMSlcbiAgICB0b3RhbDIgPSBNYXRoLnNxcnQodG90YWwyKVxuXG4gICAgY29uc3QgY2lyY2xlX2NvbnRhaW5lciA9IGQzLnNlbGVjdCgnI2J1ZGdldC1jaXJjbGUtY29udGFpbmVyJylcblxuICAgIGNvbnN0IGhlaWdodCA9IDMwMFxuICAgIGNvbnN0IHdpZHRoID0gNTAwXG4gICAgXG4gICAgY29uc3Qgc3ZnMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtc3ZnLTEnKSA/IGQzLnNlbGVjdCgnI2NpcmNsZS1zdmctMScpIDogY2lyY2xlX2NvbnRhaW5lci5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJykuYXR0cignaWQnLCAnY2lyY2xlLXN2Zy0xJyk7XG4gICAgY29uc3Qgc3ZnMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtc3ZnLTInKSA/IGQzLnNlbGVjdCgnI2NpcmNsZS1zdmctMicpIDogY2lyY2xlX2NvbnRhaW5lci5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJykuYXR0cignaWQnLCAnY2lyY2xlLXN2Zy0yJyk7XG5cbiAgICBjb25zdCBkYXRhID0gW3RvdGFsMSwgdG90YWwyXVxuXG4gICAgLy8gY29uc3Qgc3ZnMSA9IGNpcmNsZV9jb250YWluZXIuYXBwZW5kKCdzdmcnKVxuICAgIC8vICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgIC8vICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpLmF0dHIoJ2lkJywgJ2NpcmNsZS1zdmctMScpO1xuXG4gICAgLy8gY29uc3Qgc3ZnMiA9IGNpcmNsZV9jb250YWluZXIuYXBwZW5kKCdzdmcnKVxuICAgIC8vICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgIC8vICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpLmF0dHIoJ2lkJywgJ2NpcmNsZS1zdmctMicpO1xuXG4gICAgY29uc3QgcnNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKFswLCAoZDMubWF4KGRhdGEpKV0pXG4gICAgICAgIC5yYW5nZShbMSwgaGVpZ2h0IC8gMl0pXG5cbiAgICBpZiAoIXVwZGF0ZSkge1xuICAgICAgICBjb25zdCBjaXJjbGUxID0gc3ZnMS5zZWxlY3RBbGwoJy5jaXJjbGVzLTEnKS5kYXRhKFt0b3RhbDFdKVxuICAgICAgICBjb25zdCBjaXJjbGUyID0gc3ZnMi5zZWxlY3RBbGwoJy5jaXJjbGVzLTInKS5kYXRhKFt0b3RhbDJdKVxuICAgICAgICBjaXJjbGUxLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJzY2FsZShkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGVzLTEnKS5hdHRyKCdjeScsIGhlaWdodCAvIDIpXG4gICAgICAgICAgICAuYXR0cignY3gnLCAoZCwgaSkgPT4gd2lkdGggLyAyKVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnIzBhODBhZScpXG5cbiAgICAgICAgY2lyY2xlMi5lbnRlcigpLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcnNjYWxlKGQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZXMtMicpLmF0dHIoJ2N5JywgaGVpZ2h0IC8gMilcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIChkLCBpKSA9PiB3aWR0aCAvIDIpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICcjMGE4MGFlJylcbiAgICB9IGVsc2Uge1xuICAgICAgICBkMy5zZWxlY3QoJy5jaXJjbGVzLTEnKVxuICAgICAgICAuZGF0YShbdG90YWwxXSlcbiAgICAgICAgLnRyYW5zaXRpb24oKS5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcnNjYWxlKGQpXG4gICAgICAgICAgICB9KVxuICAgICAgICBkMy5zZWxlY3QoJy5jaXJjbGVzLTInKVxuICAgICAgICAuZGF0YShbdG90YWwyXSlcbiAgICAgICAgLnRyYW5zaXRpb24oKS5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcnNjYWxlKGQpXG4gICAgICAgICAgICB9KVxuICAgIH1cbiAgICBcbn0iLCJpbXBvcnQgeyBDSVJDTEVfQ09MT1JTIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgYXNzaWduQm94ID0gKGFycmF5X29mX29ianMsIHBpZV9udW0pID0+IHtcbiAgICBjb25zdCBzaWRlID0gcGllX251bSA9PT0gMSA/ICdsZWZ0LWJveC0nIDogJ3JpZ2h0LWJveC0nXG4gICAgYXJyYXlfb2Zfb2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBpID0gNDtcbiAgICAgICAgc3dpdGNoIChvYmoua2V5KSB7XG4gICAgICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMCBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJJbmNvbWUgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMSBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDIgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiUHJvcGVydHkgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMyBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaWRlICsgaSlcbiAgICAgICAgY29uc3QgZGVjaW1hbHMgPSBTdHJpbmcob2JqLnBlcmNlbnQpLnNwbGl0KCcuJylbMV1cbiAgICAgICAgY29uc3QgaW50ZWdlcnMgPSBTdHJpbmcob2JqLnBlcmNlbnQpLnNwbGl0KCcuJylbMF1cbiAgICAgICAgY29uc3Qgc2xpY2VkID0gb2JqLnBlcmNlbnQgPyBpbnRlZ2VycyArICcuJyArIGRlY2ltYWxzLnNsaWNlKDAsIDIpIDogMFxuICAgICAgICBib3guaW5uZXJIVE1MID0gc2xpY2VkICsgJyUnXG4gICAgfSk7XG59XG5cbi8vIGQuQU1PVU5UID09PSAnWCcgPyAwIDogZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDAsXG5leHBvcnQgY29uc3QgZmluZEFtb3VudCA9IChhbW91bnQpID0+IHtcbiAgICByZXR1cm4gYW1vdW50ID09PSAnWCcgPyAwIDogYW1vdW50LnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwXG59XG5cbi8vIGV4cG9ydCBjb25zdCBzdWJEYXRhUHVzaGVyID0gKGl0ZW0pID0+IHtcbi8vICAgICBpZiAoaXRlbSAhPSBcIlQwMFwiICYmIGl0ZW0gIT0gXCJUMDFcIikge1xuLy8gICAgICAgICBzd2l0Y2ggKGl0ZW0uc2xpY2UoMCwgMikpIHtcbi8vICAgICAgICAgICAgIGNhc2UgKFwiVDBcIiB8fCBcIlQxXCIpOlxuLy8gICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2goe1xuLy8gICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4vLyAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4vLyAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnQ6IChmaW5kQW1vdW50KGQuQU1PVU5UKSAvIFRPVEFMKSAqIDEwMFxuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgXG4vLyAgICAgICAgICAgICBjYXNlIFwiVDJcIjpcbi8vICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2goe1xuICAgIFxuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9XG5cblxuXG5leHBvcnQgY29uc3Qgc3ViQXJyYXlMb2NhdG9yID0gKHRheF90eXBlLCBjb250YWluZXJfYXJyYXkpID0+IHsgIC8vIGhlbHBlciBmdW5jdGlvbiBmb3IgZmluZGluZyB0aGUgcmlnaHQgc3ViIGFycmF5LiBBIGJpdCBoYXJkLWNvZGVkLlxuICAgIHN3aXRjaCAodGF4X3R5cGUpIHtcbiAgICAgICAgY2FzZSBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVswXVxuICAgICAgICBjYXNlIFwiTGljZW5zZSBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsxXVxuICAgICAgICBjYXNlIFwiSW5jb21lIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzJdXG4gICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVszXVxuICAgICAgICBjYXNlIFwiUHJvcGVydHkgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbNF1cbiAgICB9XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gd2FzIHRha2VuIGZyb20gdXNlciBQaW1wIFRyaXpraXRzIHBvc3Qgb24gc3RhY2tvdmVyZmxvdyBhdCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTYwMjQ4L3Byb2dyYW1tYXRpY2FsbHktbGlnaHRlbi1vci1kYXJrZW4tYS1oZXgtY29sb3Itb3ItcmdiLWFuZC1ibGVuZC1jb2xvcnNcbmV4cG9ydCBmdW5jdGlvbiBMaWdodGVuRGFya2VuQ29sb3IoY29sLCBhbXQpIHtcbiAgICB2YXIgdXNlUG91bmQgPSBmYWxzZTtcbiAgICBpZiAoY29sWzBdID09IFwiI1wiKSB7XG4gICAgICAgIGNvbCA9IGNvbC5zbGljZSgxKTtcbiAgICAgICAgdXNlUG91bmQgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBudW0gPSBwYXJzZUludChjb2wsIDE2KTtcblxuICAgIHZhciByID0gKG51bSA+PiAxNikgKyBhbXQ7XG5cbiAgICBpZiAociA+IDI1NSkgciA9IDI1NTtcbiAgICBlbHNlIGlmIChyIDwgMCkgciA9IDA7XG5cbiAgICB2YXIgYiA9ICgobnVtID4+IDgpICYgMHgwMEZGKSArIGFtdDtcblxuICAgIGlmIChiID4gMjU1KSBiID0gMjU1O1xuICAgIGVsc2UgaWYgKGIgPCAwKSBiID0gMDtcblxuICAgIHZhciBnID0gKG51bSAmIDB4MDAwMEZGKSArIGFtdDtcblxuICAgIGlmIChnID4gMjU1KSBnID0gMjU1O1xuICAgIGVsc2UgaWYgKGcgPCAwKSBnID0gMDtcblxuICAgIHJldHVybiAodXNlUG91bmQgPyBcIiNcIiA6IFwiXCIpICsgKGcgfCAoYiA8PCA4KSB8IChyIDw8IDE2KSkudG9TdHJpbmcoMTYpO1xufVxuLy8gVGhpcyBmdW5jdGlvbiB3YXMgYWxzbyB0YWtlbiBmcm9tIHVzZXIgUGltcCBUcml6a2l0cyBwb3N0IG9uIHN0YWNrb3ZlcmZsb3cgYXQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTU2MDI0OC9wcm9ncmFtbWF0aWNhbGx5LWxpZ2h0ZW4tb3ItZGFya2VuLWEtaGV4LWNvbG9yLW9yLXJnYi1hbmQtYmxlbmQtY29sb3JzXG5leHBvcnQgY29uc3QgcFNCQyA9IChwLCBjMCwgYzEsIGwpID0+IHtcbiAgICBsZXQgciwgZywgYiwgUCwgZiwgdCwgaCwgaSA9IHBhcnNlSW50LCBtID0gTWF0aC5yb3VuZCwgYSA9IHR5cGVvZiAoYzEpID09IFwic3RyaW5nXCI7XG4gICAgaWYgKHR5cGVvZiAocCkgIT0gXCJudW1iZXJcIiB8fCBwIDwgLTEgfHwgcCA+IDEgfHwgdHlwZW9mIChjMCkgIT0gXCJzdHJpbmdcIiB8fCAoYzBbMF0gIT0gJ3InICYmIGMwWzBdICE9ICcjJykgfHwgKGMxICYmICFhKSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCF0aGlzLnBTQkNyKSB0aGlzLnBTQkNyID0gKGQpID0+IHtcbiAgICAgICAgbGV0IG4gPSBkLmxlbmd0aCwgeCA9IHt9O1xuICAgICAgICBpZiAobiA+IDkpIHtcbiAgICAgICAgICAgIFtyLCBnLCBiLCBhXSA9IGQgPSBkLnNwbGl0KFwiLFwiKSwgbiA9IGQubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKG4gPCAzIHx8IG4gPiA0KSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHguciA9IGkoclszXSA9PSBcImFcIiA/IHIuc2xpY2UoNSkgOiByLnNsaWNlKDQpKSwgeC5nID0gaShnKSwgeC5iID0gaShiKSwgeC5hID0gYSA/IHBhcnNlRmxvYXQoYSkgOiAtMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG4gPT0gOCB8fCBuID09IDYgfHwgbiA8IDQpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKG4gPCA2KSBkID0gXCIjXCIgKyBkWzFdICsgZFsxXSArIGRbMl0gKyBkWzJdICsgZFszXSArIGRbM10gKyAobiA+IDQgPyBkWzRdICsgZFs0XSA6IFwiXCIpO1xuICAgICAgICAgICAgZCA9IGkoZC5zbGljZSgxKSwgMTYpO1xuICAgICAgICAgICAgaWYgKG4gPT0gOSB8fCBuID09IDUpIHguciA9IGQgPj4gMjQgJiAyNTUsIHguZyA9IGQgPj4gMTYgJiAyNTUsIHguYiA9IGQgPj4gOCAmIDI1NSwgeC5hID0gbSgoZCAmIDI1NSkgLyAwLjI1NSkgLyAxMDAwO1xuICAgICAgICAgICAgZWxzZSB4LnIgPSBkID4+IDE2LCB4LmcgPSBkID4+IDggJiAyNTUsIHguYiA9IGQgJiAyNTUsIHguYSA9IC0xXG4gICAgICAgIH0gcmV0dXJuIHhcbiAgICB9O1xuICAgIGggPSBjMC5sZW5ndGggPiA5LCBoID0gYSA/IGMxLmxlbmd0aCA+IDkgPyB0cnVlIDogYzEgPT0gXCJjXCIgPyAhaCA6IGZhbHNlIDogaCwgZiA9IHBTQkNyKGMwKSwgUCA9IHAgPCAwLCB0ID0gYzEgJiYgYzEgIT0gXCJjXCIgPyBwU0JDcihjMSkgOiBQID8geyByOiAwLCBnOiAwLCBiOiAwLCBhOiAtMSB9IDogeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1LCBhOiAtMSB9LCBwID0gUCA/IHAgKiAtMSA6IHAsIFAgPSAxIC0gcDtcbiAgICBpZiAoIWYgfHwgIXQpIHJldHVybiBudWxsO1xuICAgIGlmIChsKSByID0gbShQICogZi5yICsgcCAqIHQuciksIGcgPSBtKFAgKiBmLmcgKyBwICogdC5nKSwgYiA9IG0oUCAqIGYuYiArIHAgKiB0LmIpO1xuICAgIGVsc2UgciA9IG0oKFAgKiBmLnIgKiogMiArIHAgKiB0LnIgKiogMikgKiogMC41KSwgZyA9IG0oKFAgKiBmLmcgKiogMiArIHAgKiB0LmcgKiogMikgKiogMC41KSwgYiA9IG0oKFAgKiBmLmIgKiogMiArIHAgKiB0LmIgKiogMikgKiogMC41KTtcbiAgICBhID0gZi5hLCB0ID0gdC5hLCBmID0gYSA+PSAwIHx8IHQgPj0gMCwgYSA9IGYgPyBhIDwgMCA/IHQgOiB0IDwgMCA/IGEgOiBhICogUCArIHQgKiBwIDogMDtcbiAgICBpZiAoaCkgcmV0dXJuIFwicmdiXCIgKyAoZiA/IFwiYShcIiA6IFwiKFwiKSArIHIgKyBcIixcIiArIGcgKyBcIixcIiArIGIgKyAoZiA/IFwiLFwiICsgbShhICogMTAwMCkgLyAxMDAwIDogXCJcIikgKyBcIilcIjtcbiAgICBlbHNlIHJldHVybiBcIiNcIiArICg0Mjk0OTY3Mjk2ICsgciAqIDE2Nzc3MjE2ICsgZyAqIDY1NTM2ICsgYiAqIDI1NiArIChmID8gbShhICogMjU1KSA6IDApKS50b1N0cmluZygxNikuc2xpY2UoMSwgZiA/IHVuZGVmaW5lZCA6IC0yKVxufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlID0gKGlkKSA9PiB7XG4gICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG4gICAgcmVtb3ZlID8gcmVtb3ZlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlKSA6IG51bGxcbn1cblxuZXhwb3J0IGNvbnN0IHJlbW92ZUNsYXNzID0gY2xhc3NOYW1lID0+IHtcbiAgICBjb25zdCByZW1vdmVfbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKVxuICAgIGRlYnVnZ2VyXG4gICAgcmVtb3ZlX2xpc3QubGVuZ3RoID8gcmVtb3ZlX2xpc3QucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUpIDogbnVsbFxufVxuXG5leHBvcnQgY29uc3QgcGVyY2VudGlmeSA9IG51bWJlciA9PiB7XG4gICAgaWYgKHR5cGVvZiBudW1iZXIgPT09IFN0cmluZykge1xuICAgICAgICBudW1iZXIgPSBwYXJzZUZsb2F0KG51bWJlci5zcGxpdCgnJCcpWzFdKVxuICAgIH1cbiAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXIgKiAxMDApIC8gMTAwXG59IiwiLy8gQSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBiYXNlZCBoZWF2aWx5IG9mZiBvZiBLYXJ0aGlrIFRob3RhJ3MgeW91dHViZSB0dXRvcmlhbCBcIkludHJvZHVjdGlvbiB0byBkMy5qcyA9IFBpZSBDaGFydCBhbmQgRG9udXQgQ2hhcnRcIlxuLy8gVGhlIGxlZ2VuZCBjb2RlIHdhcyBmcm9tIENyeXB0ZXJzIEluZm90ZWNoJ3MgeW91dHViZSB0dXRvcmlhbCBcIlBpZSBDaGFydCB1c2luZyBEMy5qc1wiXG5cbmltcG9ydCB7IGFzc2lnbkJveCwgZmluZEFtb3VudCB9IGZyb20gJy4vaGVscGVyX2Z1bmN0aW9ucydcbmltcG9ydCB7IGJ1ZGdldENpcmNsZSB9IGZyb20gJy4vYnVkZ2V0X2NpcmNsZSdcbmltcG9ydCB7IHN1YkRhdGEsIHVwZGF0ZVN1YkRhdGEgfSBmcm9tICcuL3N1YmRhdGFfZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgdG9vbHRpcENyZWF0b3IgfSBmcm9tICcuL3N1YmRhdGFfZ2VuZXJhdG9yJ1xuLy8gXG5leHBvcnQgY29uc3QgQ09MT1JTID0gW1wiI2E2NzUxZVwiLCBcIiM5YTAwNDdcIiwgXCIjNjZhNTFlXCIsIFwiI2VlNzczMVwiLCBcIiNlODJiOGFcIl1cbmV4cG9ydCBjb25zdCBDSVJDTEVfQ09MT1JTID0gW0NPTE9SU1sxXSwgQ09MT1JTWzBdLCBDT0xPUlNbNF0sIENPTE9SU1syXSwgQ09MT1JTWzNdXVxuLy8gZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIk90aGVyIFRheGVzXCJdXG5leHBvcnQgY29uc3QgTEFCRUxTID0gW1wiT3RoZXIgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBUYXhlc1wiXVxuLy8gZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKGNzdlBhdGgsIHNlY3RvciwgYW1vdW50LCBzdGF0ZSwgbXVsdGlwbGllciA9IDEsIHNraXAgPSAxKSB7XG5leHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUsIHRheF90eXBlLCBwaWVfbnVtLCBjc3YgPSBcIi4vc3JjL2Fzc2V0cy9kYXRhL0ZZMjAxOC1TVEMtRGV0YWlsZWQtVGFibGUuY3N2XCIsIHVwZGF0ZSA9IHRydWUpIHtcblxuICAgIC8vIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YWxzLVwiICsgcGllX251bSlcbiAgICAvLyByZW1vdmUgPyByZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUpIDogbnVsbFxuICAgIC8vIGNvbnN0IHJlbW92ZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRldGFpbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZTIgPyByZW1vdmUyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlMikgOiBudWxsXG5cbiAgICBjb25zdCBoMSA9IGQzLnNlbGVjdCgnI3RvdGFscy1oZWFkZXItJyArIHBpZV9udW0pXG4gICAgY29uc3Qgc3BhbiA9IGQzLnNlbGVjdCgnI3RvdGFscy1zcGFuLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IGgyID0gZDMuc2VsZWN0KFwiI2RldGFpbHMtXCIgKyBwaWVfbnVtKVxuXG5cbiAgICBsZXQgVE9UQUwgPSAwO1xuICAgIGxldCBUWVBFUyA9IFtdXG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cblxuXG4gICAgY29uc3QgY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKENPTE9SUyk7XG5cbiAgICAvLyBhcmMgZ2VuZXJhdG9yXG4gICAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDEwKVxuICAgICAgICAvLyAuaW5uZXJSYWRpdXMoMCk7IC8vIGZvciBjaXJjbGVcbiAgICAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDEwMCkgLy8gZm9yIGRvbnV0XG5cbiAgICAvLyBjb25zdCBsYWJsZUFyYyA9IGQzLmFyYygpXG4gICAgLy8gICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSA1MClcbiAgICAvLyAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDUwKTtcblxuICAgIC8vIHBpZSBnZW5lcmF0b3JcbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgICAvLyAuc29ydChudWxsKVxuICAgICAgICAudmFsdWUoZCA9PiBkLmFtb3VudCk7XG5cbiAgICAvLyBkZWZpbmUgc3ZnIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIi5waWUtXCIgKyBwaWVfbnVtKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKVxuXG4gICAgLy8gaW1wb3J0IGRhdGFcbiAgICBkMy5jc3YoY3N2KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgYXJyYXlzIHRoYXQgd2lsbCBjb250YWluIHRoZSBzdWIgbGV2ZWwgdGF4IGRhdGFcbiAgICAgICAgbGV0IHNhbGVzX3RheGVzID0gW11cbiAgICAgICAgbGV0IGxpY2Vuc2VfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgaW5jb21lX3RheGVzID0gW11cbiAgICAgICAgbGV0IG90aGVyX3RheGVzID0gW11cbiAgICAgICAgbGV0IHByb3BlcnR5X3RheGVzID0gW11cbiAgICAgICAgLy8gbGV0IHN0YXRlX2J1ZGdldHMgPSB7fVxuICAgICAgICAvLyBsZXQgc2FsZXNfdGF4X29iaiA9IHsgdGF4X2dyb3VwOiBMQUJFTFNbNF0gfVxuICAgICAgICAvLyBwYXJzZSB0aGUgY3N2XG4gICAgICAgIGRhdGEuZm9yRWFjaCgoZCwgaSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZC5HZW9fTmFtZSA9PT0gc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtID09PSBcIlQwMFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIFRPVEFMID0gZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gIT0gXCJUMDBcIikgeyAgLy8gZG9uJ3Qgd2FudCB0byBjYXRjaCBUb3RhbCBvciBQcm9wZXJ0eSBUYXhlc1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGF4X29iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50X29mX3RvdGFsOiAoZmluZEFtb3VudChkLkFNT1VOVCkgLyBUT1RBTCkgKiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGQuaXRlbS5zbGljZSgwLDIpKSB7IC8vIGZpbGwgdXAgc3ViIGFycmF5c1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQwXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDlcIikgeyBzYWxlc190YXhlcy5wdXNoKHRheF9vYmopIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtID09PSBcIlQwMVwiKSB7IHByb3BlcnR5X3RheGVzLnB1c2godGF4X29iaikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNhbGVzX3RheF9vYmpbZC5UYXhfVHlwZV0gPSBmaW5kQW1vdW50KGQuQU1PVU5UKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQxXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQyXCI6IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQ0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jb21lX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUOVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0YXhfdHlwZS5pbmNsdWRlcyhkLml0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gIT0gJ1QwMCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRZUEVTLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnQ6ICgoZmluZEFtb3VudChkLkFNT1VOVCkpIC8gVE9UQUwpICogMTAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkLmtleSA9IGQuVGF4X1R5cGU7XG4gICAgICAgICAgICAgICAgICAgIGQuYW1vdW50ID0gZmluZEFtb3VudChkLkFNT1VOVCk7XG4gICAgICAgICAgICAgICAgICAgIGQucGVyY2VudCA9ICgoZmluZEFtb3VudChkLkFNT1VOVCkpIC8gVE9UQUwpICogMTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcl9hcnJheSA9IFtdICAvLyBzZXR0aW5nIHVwIGNvbnRhaW5lciBhcnJheSBmb3IgcGFzc2luZyBpbnRvIGNsaWNrIGhhbmRsZXJcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2goc2FsZXNfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKGxpY2Vuc2VfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKGluY29tZV90YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2gob3RoZXJfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHByb3BlcnR5X3RheGVzKVxuXG4gICAgICAgIHVwZGF0ZVN1YkRhdGEoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKVxuICAgICAgICAvLyBzZXQgaDEgYWZ0ZXIgdG90YWwgaGFzIGJlZW4gZGVmaW5lZFxuICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgXCIpXG4gICAgICAgIHNwYW4udGV4dChcIiRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgaDIudGV4dChcIlwiKVxuICAgICAgICAvLyBhdHRlbXB0IGJ1ZGdldENpcmNsZSBjYWxsXG4gICAgICAgIC8vIGJ1ZGdldENpcmNsZShUT1RBTClcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwZXJjZW50YWdlcyBpbiB0aGUgY2VudGVyIGJveFxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgYXJjKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBkID0+IGNvbG9ycyhkLmRhdGEua2V5KSlcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbignZCcsIHBpZVR3ZWVuKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHBhdGgub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIC8vIHdoeSBkb2Vzbid0IHRoaXMgd29yaz9cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gICAgICAgICAgICAgLmR1cmF0aW9uKCc1MCcpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIGRldGVybWluZSBob3cgdG8gZmxpcCB0aGUgcGllc1xuICAgICAgICBpZiAocGllX251bSA9PT0gMikgey8vIGZsaXAgdGhlIHNlY29uZCBwaWVcbiAgICAgICAgICAgIGcuYXR0cihcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVgoLTEpIHRyYW5zbGF0ZSgzMDBweCwgMHB4KSBzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgY29uc3Qgc3ViX2RhdGFfc3ZnID0gZDMuc2VsZWN0KCcjc3ViLWRhdGEtZy0nICsgcGllX251bSkuc2VsZWN0QWxsKCcuc3ViLWRhdGEtJyArIHBpZV9udW0pXG4gICAgICAgIGcub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coZClcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oJzUwJylcbiAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsICcuODUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgIC8vIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE4IHdhcyAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICAvLyBoMi50ZXh0KFwiXCIpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2snLCBoYW5kbGVDbGljayhjb250YWluZXJfYXJyYXksIHBpZV9udW0pKVxuICAgICAgICAvLyAub24oJ2NsaWNrJywgdXBkYXRlU3ViRGF0YShjb250YWluZXJfYXJyYXksIHN1Yl9kYXRhX3N2ZywgcGllX251bSkpXG4gICAgICAgIGNvbnNvbGUubG9nKHBpZV9udW0pXG4gICAgICAgIGNvbnN0IHNwYW4xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFscy1zcGFuLTEnKVxuICAgICAgICBjb25zdCBzcGFuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbHMtc3Bhbi0yJylcblxuICAgICAgICBpZiAoc3BhbjEuaW5uZXJUZXh0XG4gICAgICAgICAgICAmJiBzcGFuMi5pbm5lclRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsMSA9IHBhcnNlSW50KHNwYW4xLmlubmVyVGV4dC5zbGljZSgxKS5zcGxpdCgnLCcpLmpvaW4oJycpKVxuICAgICAgICAgICAgY29uc3QgdG90YWwyID0gcGFyc2VJbnQoc3BhbjIuaW5uZXJUZXh0LnNsaWNlKDEpLnNwbGl0KCcsJykuam9pbignJykpXG4gICAgICAgICAgICBidWRnZXRDaXJjbGUodG90YWwxLCB0b3RhbDIsIHVwZGF0ZSlcbiAgICAgICAgfSAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7IGlmIChlcnJvcikgdGhyb3cgZXJyb3IgfSlcbiAgICBcbiAgICBjb25zdCBwaWVUd2VlbiA9IGIgPT4ge1xuICAgICAgICBiLmlubmVyUmFkaXVzID0gMDtcbiAgICAgICAgY29uc3QgaSA9IGQzLmludGVycG9sYXRlKHsgc3RhcnRBbmdsZTogMCwgZW5kQW5nbGU6IDAgfSwgYilcbiAgICAgICAgcmV0dXJuICh0KSA9PiB7IHJldHVybiBhcmMoaSh0KSkgfVxuICAgIH0gICAgXG59XG5cbmNvbnN0IGhhbmRsZUNsaWNrID0gKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkgPT4ge1xuICAgIHJldHVybiBlbGUgPT4ge1xuICAgICAgICBcbiAgICAgICAgdXBkYXRlU3ViRGF0YShjb250YWluZXJfYXJyYXksIHBpZV9udW0sIGVsZSlcbiAgICAgICAgdG9vbHRpcENyZWF0b3IocGllX251bSwgZWxlLmRhdGEuVGF4X1R5cGUsIGVsZS5kYXRhLnBlcmNlbnQpXG4gICAgfVxufVxuICAgICAgICAiLCJpbXBvcnQgeyBDSVJDTEVfQ09MT1JTLCBMQUJFTFN9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHVwZGF0ZVN1YkRhdGEgfSBmcm9tICcuL3N1YmRhdGFfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgcGllTGVnZW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IG1hc3Rlcl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgbWFzdGVyX2xpc3QuY2xhc3NMaXN0LmFkZCgnbWFzdGVyLWxpc3QnKVxuXG4gICAgY29uc3QgbGVmdF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHRleHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCByaWdodF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgbGVmdF9saXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnQtbGlzdCcpICBcbiAgICB0ZXh0X2xpc3QuY2xhc3NMaXN0LmFkZCgndGV4dC1saXN0JykgIFxuICAgIHJpZ2h0X2xpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHQtbGlzdCcpIFxuXG4gICAgZm9yIChsZXQgaSA9IExBQkVMUy5sZW5ndGggLSAxIDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxlZnRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCB0ZXh0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgcmlnaHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIGxlZnRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdsZWZ0LWJveCcpXG4gICAgICAgIGxlZnRfYm94LmlkID0gKCdsZWZ0LWJveC0nICsgaSlcbiAgICAgICAgbGVmdF9ib3guc3R5bGUuYmFja2dyb3VuZCA9IENJUkNMRV9DT0xPUlNbaV1cblxuICAgICAgICByaWdodF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ3JpZ2h0LWJveCcpXG4gICAgICAgIHJpZ2h0X2JveC5pZCA9ICgncmlnaHQtYm94LScgKyBpKVxuICAgICAgICByaWdodF9ib3guc3R5bGUuYmFja2dyb3VuZCA9IENJUkNMRV9DT0xPUlNbaV1cblxuICAgICAgICB0ZXh0X2JveC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWJveCcpXG4gICAgICAgIHRleHRfYm94LmlubmVySFRNTCA9IExBQkVMU1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gQ0lSQ0xFX0NPTE9SU1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkIFwiICsgQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIGxlZnRfbGlzdC5hcHBlbmRDaGlsZChsZWZ0X2JveClcbiAgICAgICAgdGV4dF9saXN0LmFwcGVuZENoaWxkKHRleHRfYm94KVxuICAgICAgICByaWdodF9saXN0LmFwcGVuZENoaWxkKHJpZ2h0X2JveClcbiAgICB9XG5cbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZChsZWZ0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9saXN0KVxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKHJpZ2h0X2xpc3QpXG4gICAgcmV0dXJuIG1hc3Rlcl9saXN0XG59XG5cbmNvbnN0IHN1Ymxpc3RzID0gKGxhYmVsLCBjb2xvcikgPT4ge1xuICAgIGNvbnN0IGxpc3RzID0gW11cblxuXG4gICAgbGVzdGxpc3QuY2xhc3NMaXN0LmFkZCgnbGVmdGxpc3QnKVxuICAgIHRleHRsaXN0LmNsYXNzTGlzdC5hZGQoJ3RleHRsaXN0JylcbiAgICByaWdodGxpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHRsaXN0JylcblxuICAgIGNvbnN0IGxlZnRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgY29uc3QgcmlnaHRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cblxuXG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cblxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGVmdEJveClcbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKGxpKVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQocmlnaHRCb3gpXG4gICAgcmV0dXJuIHN1Ymxpc3Rcbn1cblxuIiwiaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5pbXBvcnQgeyB0b29sdGlwQ3JlYXRvciB9IGZyb20gJy4vc3ViZGF0YV9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBUT1BfTEVWRUwgPSBbJ1QwMCcsICdUMDEnLCAnVEExJywgJ1RBMycsICdUQTQnLCAnVEE1J11cbmNvbnN0IFNUQVRFX05BTUVTID0gWydBbGFiYW1hJywgJ0FsYXNrYScsICdBcml6b25hJywgJ0Fya2Fuc2FzJywgJ0NhbGlmb3JuaWEnLCAnQ29sb3JhZG8nLCAnQ29ubmVjdGljdXQnLCAnRGVsYXdhcmUnLCAnRmxvcmlkYScsICdHZW9yZ2lhJywgJ0hhd2FpaScsICdJZGFobycsICdJbGxpbm9pcycsICdJbmRpYW5hJywgJ0lvd2EnLCAnS2Fuc2FzJywgJ0tlbnR1Y2t5JywgJ0xvdWlzaWFuYScsICdNYWluZScsICdNYXJ5bGFuZCcsICdNYXNzYWNodXNldHRzJywgJ01pY2hpZ2FuJywgJ01pbm5lc290YScsICdNaXNzaXNzaXBwaScsICdNaXNzb3VyaScsICdNb250YW5hJywgJ05lYnJhc2thJywgJ05ldmFkYScsICdOZXcgSGFtcHNoaXJlJywgJ05ldyBKZXJzZXknLCAnTmV3IE1leGljbycsICdOZXcgWW9yaycsICdOb3J0aCBDYXJvbGluYScsICdOb3J0aCBEYWtvdGEnLCAnT2hpbycsICdPa2xhaG9tYScsICdPcmVnb24nLCAnUGVubnN5bHZhbmlhJywgJ1Job2RlIElzbGFuZCcsICdTb3V0aCBDYXJvbGluYScsICdTb3V0aCBEYWtvdGEnLCAnVGVubmVzc2VlJywgJ1RleGFzJywgJ1V0YWgnLCAnVmVybW9udCcsICdWaXJnaW5pYScsICdXYXNoaW5ndG9uJywgJ1dlc3QgVmlyZ2luaWEnLCAnV2lzY29uc2luJywgJ1d5b21pbmcnXVxuXG5leHBvcnQgY29uc3Qgc3RhdGVfc2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuIFxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwic2VsZWN0LXdyYXBwZXItXCIgKyBwaWVfbnVtKVxuICAgIHdyYXBwZXIuaWQgPSBcInNlbGVjdC13cmFwcGVyLVwiICsgcGllX251bVxuXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICBzZWxlY3QuaW5uZXJIVE1MID0gcGllX251bSA9PT0gMSA/ICdBbGFiYW1hJyA6ICdXeW9taW5nJ1xuICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuICAgIHNlbGVjdC5pZCA9IFwic2VsZWN0LVwiICsgcGllX251bVxuXG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICB9KVxuICAgIFxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdICAvLyBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgc28gdGhhdCBpZiBJIGNsaWNrIGFueXdoZXJlIGVsc2UgdGhlIGxpc3QgZGlzYXBwZWFyc1xuICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIH0pXG4gICAgXG4gICAgY29uc3Qgc3RhdGVTZWxlY3RvciA9IHN0YXRlID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnN0IHN0YXRlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0LVwiICsgcGllX251bSlcbiAgICAgICAgICAgIHNlbGVjdC5pbm5lclRleHQgPSBzdGF0ZVxuICAgICAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAgICAgc3ZnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3ZnKVxuICAgICAgICAgICAgUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUsIFRPUF9MRVZFTCwgcGllX251bSlcbiAgICAgICAgICAgIC8vIHRvb2x0aXBDcmVhdG9yKHBpZV9udW0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RhdGVfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ3N0YXRlLWxpc3QtJyArIHBpZV9udW0pXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIHN0YXRlX2xpc3QuaWQgPSAnc3RhdGUtbGlzdC0nICsgcGllX251bVxuICAgIFxuICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZV9saXN0X2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmlubmVySFRNTCA9IHN0YXRlXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzdGF0ZSlcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbiAgICAgICAgc3RhdGVfbGlzdC5hcHBlbmRDaGlsZChzdGF0ZV9saXN0X2l0ZW0pXG4gICAgfSlcbiAgICBcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNlbGVjdClcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHN0YXRlX2xpc3QpXG4gICAgXG4gICAgcmV0dXJuIHdyYXBwZXJcbn1cblxuLy8gY29uc3QgcGhhc2VPdXQgPSAobm9kZSkgPT4ge1xuXG4vLyAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4vLyB9IiwiZXhwb3J0IGNvbnN0IHN1YkRhdGFMZWdlbmQgPSAoY29sb3JzLCBsYWJlbHMsIGhlaWdodHMsIHBpZV9udW0pID0+IHtcbiAgICBjb25zdCBtYXN0ZXJfc3ViX2RhdGFfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuICAgIG1hc3Rlcl9zdWJfZGF0YV9saXN0LmNsYXNzTGlzdC5hZGQoJ21hc3Rlci1zdWItZGF0YS1saXN0LScgKyBwaWVfbnVtKVxuICAgIG1hc3Rlcl9zdWJfZGF0YV9saXN0LmlkID0gJ21hc3Rlci1zdWItZGF0YS1saXN0LScgKyBwaWVfbnVtXG5cbiAgICBjb25zdCBwZXJjZW50X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgbGFiZWxfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCBjb2xvcl9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgICBmb3IgKGxldCBpID0gbGFiZWxzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cbiAgICAgICAgLy8gY29uc3QgcmVsYXRpdmVfcGVyY2VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgLy8gY29uc3Qgb3ZlcmFsbF9wZXJjZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgY29sb3JfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIHRleHRfYm94LmNsYXNzTGlzdC5hZGQoJ3N1Yi1kYXRhLWxhYmVsLScgKyBwaWVfbnVtKVxuICAgICAgICB0ZXh0X2JveC5pbm5lckhUTUwgPSBsYWJlbHNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yc1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkIFwiICsgQ0lSQ0xFX0NPTE9SU1tpXVxuICAgIH1cbn0iLCJpbXBvcnQgeyBzdWJBcnJheUxvY2F0b3IsIHBlcmNlbnRpZnksIExpZ2h0ZW5EYXJrZW5Db2xvciwgcmVtb3ZlLCByZW1vdmVDbGFzcyB9IGZyb20gJy4vaGVscGVyX2Z1bmN0aW9ucydcbmltcG9ydCB7IENJUkNMRV9DT0xPUlMsIExBQkVMUyB9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcic7XG5pbXBvcnQgeyBzdWJEYXRhTGVnZW5kIH0gZnJvbSAnLi9zdWJfZGF0YV9sZWdlbmQnXG5cbmNvbnN0IHdpZHRoID0gOTAgIC8vIHNldHRpbmcgdGhlIGRpbWVuc2lvbnMgdG8gY29ycmVzcG9uZCB0byB0aGUgcGllIGNoYXJ0cydcbmNvbnN0IGhlaWdodCA9IDc1MFxuLy8gY29uc3QgaGVpZ2h0ID0gOTAgIC8vIHNldHRpbmcgdGhlIGRpbWVuc2lvbnMgdG8gY29ycmVzcG9uZCB0byB0aGUgcGllIGNoYXJ0cydcbi8vIGNvbnN0IHdpZHRoID0gNTAwXG5cbmNvbnN0IHRvb2x0aXBXaWR0aCA9IDEyMCAvLyB3aWxsIGFsdGVyIHRoZXNlIGFzIG5lZWRlZFxuY29uc3QgdG9vbHRpcEhlaWdodCA9IDQwXG5cbi8vIGV4cG9ydCBjb25zdCBzdWJEYXRhID0gKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSwgY29sb3Jfc3RyaW5nID0gXCIjM0Y2RDJBXCIpID0+IHtcbi8vICAgICAvLyBhIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGxlYXJuZWQgZnJvbSBNaWNoYWVsIFN0YW5hbGFuZCdzIFwiU3RhY2tlZCBiYXIgY2hhcnQgd2l0aCB0b29sdGlwc1wiIHR1dG9yaWFsIGF0IGh0dHA6Ly9ibC5vY2tzLm9yZy9tc3RhbmFsYW5kLzYxMDA3MTNcblxuLy8gICAgIHJlbW92ZSgnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKVxuLy8gICAgIHJlbW92ZSgnc3ViLWRhdGEtbGVnZW5kLXN2Zy0nICsgcGllX251bSlcblxuICAgIFxuLy8gICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIiNzdWItZGF0YS1cIiArIHBpZV9udW0pXG4vLyAgICAgICAgIC5hcHBlbmQoXCJzdmdcIikgXG4vLyAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KS5hdHRyKCdpZCcsICdzdWItZGF0YS1zdmctJyArIHBpZV9udW0pXG4vLyAgICAgICAgIC5hcHBlbmQoXCJnXCIpXG4vLyAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtZy0nICsgcGllX251bSlcbi8vICAgICBjb25zb2xlLmxvZyhzdmcpXG4vLyAgICAgdXBkYXRlU3ViRGF0YShjb250YWluZXJfYXJyYXksIHN2ZywgcGllX251bSkobnVsbClcbi8vIH1cblxuXG5leHBvcnQgY29uc3QgdXBkYXRlU3ViRGF0YSA9IChjb250YWluZXJfYXJyYXksIHBpZV9udW0sIGVsZSkgPT4ge1xuICAgIFxuICAgIC8vIHJldHVybiAoZWxlKSA9PiB7XG5cbiAgICAgICAgcmVtb3ZlKCdzdWItZGF0YS1zdmctJyArIHBpZV9udW0pXG4gICAgICAgIHJlbW92ZSgnc3ViLWRhdGEtbGVnZW5kLXN2Zy0nICsgcGllX251bSlcblxuXG4gICAgICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIiNzdWItZGF0YS1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKS5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS1zdmctJyArIHBpZV9udW0pLmF0dHIoJ2lkJywgJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcbiAgICAgICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnc3ViLWRhdGEtJyArIHBpZV9udW0pLmF0dHIoJ2lkJywgJ3N1Yi1kYXRhLWctJyArIHBpZV9udW0pXG4gICAgICAgICAgICAvLyAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVkoLTEpXCIpXG5cblxuICAgICAgICBcbiAgICAgICAgY29uc3QgdGF4X3R5cGUgPSBlbGUgPyBlbGUuZGF0YS5rZXkgOiBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiXG4gICAgICAgIGNvbnN0IGNvbG9yX3N0cmluZyA9IGNvbG9yQ2hvb3Nlcih0YXhfdHlwZSlcbiAgICAgICAgY29uc3Qgc3ViX2FycmF5ID0gc3ViQXJyYXlMb2NhdG9yKHRheF90eXBlLCBjb250YWluZXJfYXJyYXkpXG4gICAgICAgIGxldCBjb2xvcl9jb3VudCA9IDBcbiAgICAgICAgbGV0IGlkX2NvdW50ID0gMFxuICAgIFxuICAgICAgICBsZXQgdGF4X3N0YWNrID0ge31cbiAgICAgICAgLy8gc2V0dGluZyB1cCBrZXlzXG4gICAgICAgIGxldCBrZXlzID0gW11cbiAgICAgICAgLy8ga2V5cy5wdXNoKHRheF90eXBlKVxuICAgICAgICBzdWJfYXJyYXkuZm9yRWFjaCgoc3ViX3RheCwgaSkgPT4ge1xuICAgICAgICAgICAga2V5cy5wdXNoKHN1Yl90YXgua2V5KVxuICAgICAgICAgICAgdGF4X3N0YWNrW3N1Yl90YXgua2V5XSA9IHN1Yl90YXgucGVyY2VudF9vZl90b3RhbFxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBkMy5zdGFjaygpXG4gICAgICAgICAgICAua2V5cyhrZXlzKVxuICAgICAgICAgICAgLm9yZGVyKGQzLnN0YWNrT3JkZXJOb25lKVxuICAgICAgICAgICAgLm9mZnNldChkMy5zdGFja09mZnNldE5vbmUpXG4gICAgICAgIGxldCB0YXhfc3RhY2tfYXJyYXkgPSBbXVxuICAgICAgICB0YXhfc3RhY2tfYXJyYXkucHVzaCh0YXhfc3RhY2spXG4gICAgICAgIGNvbnN0IGxheWVycyA9IHN0YWNrKHRheF9zdGFja19hcnJheSlcbiAgICBcbiAgICAgICAgY29uc3QgeFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbMCwgMV0pXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcblxuICAgICAgICBjb25zdCBuZXdfY29sb3JzID0gZDMuc2NhbGVMaW5lYXIoKS5kb21haW4oWzAsIGtleXMubGVuZ3RoXSlcbiAgICAgICAgICAgIC5yYW5nZShbXCJ3aGl0ZVwiLCBjb2xvcl9zdHJpbmddKVxuXG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIGQzLnN1bShPYmplY3QudmFsdWVzKHRheF9zdGFjaykpXSkgIC8vIHRoZSBpbmNyZW1lbnQgdXAgdG8gdGhlIHRvdGFsXG4gICAgICAgICAgICAvLyAucmFuZ2UoW2hlaWdodCwgMF0pXG4gICAgICAgICAgICAucmFuZ2UoWzAsIGhlaWdodF0pXG4gICAgXG4gICAgICAgIGNvbnN0IGcgPSBzdmcuc2VsZWN0QWxsKFwiLnN1Yi10YXhlcy1cIiArIHBpZV9udW0pICAvLyBubyBnIGF0IHRoaXMgcG9pbnQsIGJ1dCB0aGV5IHdpbGwgaGF2ZSB0aGlzIGNsYXNzXG4gICAgICAgICAgICAuZGF0YShsYXllcnMpLmVudGVyKCkgIC8vIG5vdyB0aGVyZSB3aWxsIGJlIGEgZyBmb3IgZXZlcnkgYmFyIHdpdGhpbiB0aGUgZ3JhcGguXG4gICAgICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInN1Yi10YXhlcy1cIiArIHBpZV9udW0pXG4gICAgXG4gICAgICAgIGNvbnN0IHJlY3QgPSBnLnNlbGVjdEFsbChcInJlY3RcIikgIC8vIG1ha2luZyBlYWNoIG9iaiBvZiB0aGUgY29ycmVzcG9uZCB0byBhIHJlY3Qgd2l0aGluIHRoZSBnXG4gICAgICAgICAgICAuZGF0YShsYXllciA9PiBsYXllcik7IC8vIHB1bGxpbmcgb3V0IGVhY2ggaW5kaXZpZHVhbCBvYmpcbiAgICAgICAgICAgIHJlY3QuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmVjdC5lbnRlcigpLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIGQgPT4geFNjYWxlKDApKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHhTY2FsZSgxKSkgIC8vIHByb2JhYmx5IGNhbiBoYXJkIGNvZGUsIHNpbmNlIG9ubHkgb25lIGJhclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgc3RhY2stJHtwaWVfbnVtfS0ke2lkX2NvdW50Kyt9YFxuICAgICAgICAgICAgICAgIH0pLm1lcmdlKHJlY3QpXG5cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAuYXR0cigneCcsIGQgPT4geFNjYWxlKDApKSAgLy8gcGFzc2luZyBlYWNoIG9iaidzIHggdmFsdWUgdG8gdGhlIGQzIHggZnVuY3Rpb24gZGVmaW5lZCBhYm92ZVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBsYXllciA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodCAtIHlTY2FsZShsYXllclsxXSlcbiAgICAgICAgICAgIH0pICAvLyB5MCBpcyB0aGUgaGVpZ2h0IHdoZXJlIGVhY2ggc2VnbWVudCBpbiB0aGUgc3RhY2sgc3RhcnRzXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4U2NhbGUoMSkpICAvLyBwcm9iYWJseSBjYW4gaGFyZCBjb2RlLCBzaW5jZSBvbmx5IG9uZSBiYXJcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBiYXIgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB5U2NhbGUoYmFyWzFdIC0gYmFyWzBdKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3X2NvbG9ycygrK2NvbG9yX2NvdW50KVxuICAgICAgICAgICAgfSkgXG4gICAgICAgIFxuICAgICAgICBjb25zdCBwZXJjZW50ID0gZWxlID8gZWxlLmRhdGEucGVyY2VudCA6IG51bGxcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7dG9vbHRpcENyZWF0b3IocGllX251bSwgdGF4X3R5cGUsIHBlcmNlbnQpfSwgMClcbiAgICAgICAgLy8gdG9vbHRpcENyZWF0b3IocGllX251bSwgdGF4X3R5cGUpXG5cbiAgICBsZWdlbmRDcmVhdG9yKHBpZV9udW0sIGtleXMsIG5ld19jb2xvcnMpXG4gICAgLy8gc3ViRGF0YUxlZ2VuZChuZXdfY29sb3JzLCApXG5cbiAgICAvLyB9XG5cbn1cblxuY29uc3QgY29sb3JDaG9vc2VyID0gKHRheF90eXBlKSA9PiB7XG4gICAgc3dpdGNoICh0YXhfdHlwZSkge1xuICAgICAgICBjYXNlIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gQ0lSQ0xFX0NPTE9SU1s0XVxuICAgICAgICBjYXNlICdQcm9wZXJ0eSBUYXhlcyc6XG4gICAgICAgICAgICByZXR1cm4gQ0lSQ0xFX0NPTE9SU1szXVxuICAgICAgICBjYXNlIFwiTGljZW5zZSBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbMl1cbiAgICAgICAgY2FzZSAnSW5jb21lIFRheGVzJzpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzFdXG4gICAgICAgIGNhc2UgJ090aGVyIFRheGVzJzpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzBdXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgdG9vbHRpcENyZWF0b3IgPSAocGllX251bSwgdGF4X3R5cGUsIHBlcmNlbnQpID0+IHtcbiAgICBcbiAgICBjb25zdCBzdWJfZGF0YV9kZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGRhdGEtZGV0YWlscy10eXBlLSR7cGllX251bX1gKVxuICAgIGNvbnN0IHJlbGF0aXZlX3BlcmNlbnRfZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByZWxhdGl2ZS1wZXJjZW50LSR7cGllX251bX1gKVxuICAgIGNvbnN0IG92ZXJhbGxfcGVyY2VudF9kZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG92ZXJhbGwtcGVyY2VudC0ke3BpZV9udW19YClcbiAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Yi1kYXRhLWRldGFpbHMtJyArIHBpZV9udW0pXG4gICAgY29uc3Qgc2lkZSA9IHBpZV9udW0gPT09IDEgPyAnbGVmdCcgOiAncmlnaHQnXG4gICAgY29uc3QgdmFuaWxsYV9zdmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKVxuICAgIGxldCBpbmRleDtcblxuICAgIGlmICghdGF4X3R5cGUgfHwgdGF4X3R5cGUgPT09IFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCIpIHtcbiAgICAgICAgdGF4X3R5cGUgPSAnU2FsZXMgVGF4ZXMnXG4gICAgICAgIGluZGV4ID0gTEFCRUxTLmluZGV4T2YodGF4X3R5cGUpXG4gICAgICAgIHBlcmNlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaWRlICsgYC1ib3gtYCArIGluZGV4KS5pbm5lckhUTUxcbiAgICAgICAgcGVyY2VudCA9IHBhcnNlRmxvYXQocGVyY2VudC5zbGljZSgwLCAtMSkpXG4gICAgfVxuICAgIFxuICAgIGluZGV4ID0gTEFCRUxTLmluZGV4T2YodGF4X3R5cGUpXG4gICAgc3ViX2RhdGFfZGV0YWlscy5pbm5lckhUTUwgPSBgJHt0YXhfdHlwZX1gXG4gICAgcmVsYXRpdmVfcGVyY2VudF9kZXRhaWxzLmlubmVySFRNTCA9IGBQZXJjZW50IG9mIHRvdGFsIGJ1ZGdldDogJHtwZXJjZW50aWZ5KHBlcmNlbnQpfWBcbiAgICBvdmVyYWxsX3BlcmNlbnRfZGV0YWlscy5pbm5lckhUTUwgPSAnU2Nyb2xsIG92ZXIgc2lkZSBiYXIgdG8gc2VlIHN1YiB0YXggZGF0YSBmb3IgdGhpcyBjYXRlZ29yeSdcbiAgICBsaXN0LnN0eWxlLmJhY2tncm91bmQgPSBDSVJDTEVfQ09MT1JTW2luZGV4XVxuICAgIC8vIHZhbmlsbGFfc3ZnLmFwcGVuZENoaWxkKHZhbmlsbGFfdG9vbHRpcClcbiAgICBcbiAgICB2YW5pbGxhX3N2Zy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAgICAgICBpbmRleCA9IExBQkVMUy5pbmRleE9mKHRheF90eXBlKVxuICAgICAgICBjb25zdCBzcGxpdF9pZCAgPSBlLnRhcmdldC5pZC5zcGxpdCgnLScpXG4gICAgICAgIGNvbnN0IGxlZ2VuZF90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGxlZ2VuZC10ZXh0LSR7c3BsaXRfaWRbMV19LSR7c3BsaXRfaWRbMl19YClcbiAgICAgICAgLy8gY29uc3QgbGVnZW5kX2l0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGVnZW5kLWl0ZW0tJHtzcGxpdF9pZFsxXX0tJHtzcGxpdF9pZFsyXX1gKVxuICAgICAgICBjb25zdCBib3hfZGF0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBgLWJveC1gICsgaW5kZXgpLmlubmVySFRNTFxuICAgICAgICBcbiAgICAgICAgbGV0IHJlbGF0aXZlX3BlcmNlbnQgPSAoZS50YXJnZXQuaGVpZ2h0LmJhc2VWYWwudmFsdWUgLyBoZWlnaHQpICogMTAwXG4gICAgICAgIHJlbGF0aXZlX3BlcmNlbnQgPSBNYXRoLnJvdW5kKDEwMCAqIHJlbGF0aXZlX3BlcmNlbnQpIC8gMTAwXG4gICAgICAgIFxuICAgICAgICBsZXQgb3ZlcmFsbF9wZXJjZW50ID0gcGFyc2VGbG9hdChib3hfZGF0YS5zbGljZSgwLCAtMSkpXG4gICAgICAgIG92ZXJhbGxfcGVyY2VudCA9IE1hdGgucm91bmQoMTAwICogb3ZlcmFsbF9wZXJjZW50ICogcmVsYXRpdmVfcGVyY2VudCAvIDEwMCkgLyAxMDBcbiAgICAgICAgLy8gbGV0IG92ZXJhbGxfcGVyY2VudCA9IFxuICAgICAgICAvLyBsZWdlbmRfaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICBvdmVyYWxsX3BlcmNlbnRfZGV0YWlscy5pbm5lckhUTUwgPSBgUGVyY2VudCBvZiB0b3RhbCBidWRnZXQ6IGAgKyBvdmVyYWxsX3BlcmNlbnRcbiAgICAgICAgcmVsYXRpdmVfcGVyY2VudF9kZXRhaWxzLmlubmVySFRNTCA9IGBQZXJjZW50IG9mIGNhdGVnb3J5OiAke3JlbGF0aXZlX3BlcmNlbnR9YFxuICAgICAgICBpZiAobGVnZW5kX3RleHQpIHsgc3ViX2RhdGFfZGV0YWlscy5pbm5lckhUTUwgPSBsZWdlbmRfdGV4dC5pbm5lckhUTUwgfVxuICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY29sb3I6ICcgKyBDSVJDTEVfQ09MT1JTW2luZGV4XSlcbiAgICAgICAgLy8gbGlzdF9jb2xvci5zdHlsZS5ib3JkZXIgPSBgNHB4IHNvbGlkICR7Q0lSQ0xFX0NPTE9SU1tpbmRleF19YFxuICAgICAgICAvLyB2YW5pbGxhX3Rvb2x0aXAuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICB9KVxuICAgIHZhbmlsbGFfc3ZnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZSA9PiB7XG5cbiAgICB9KVxuXG59XG5cbmNvbnN0IGxlZ2VuZENyZWF0b3IgPSAocGllX251bSwga2V5cywgbmV3X2NvbG9ycykgPT4ge1xuXG4gICAgbGV0IGNvbG9yX2NvdW50ID0gMFxuICAgIGxldCBpZF9jb3VudCA9IDBcblxuICAgIGNvbnN0IGxlZ2VuZCA9IGQzLnNlbGVjdChcIiNzdWItZGF0YS1sZWdlbmQtXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnc3ViLWRhdGEtbGVnZW5kLXN2Zy0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtbGVnZW5kLXN2Zy0nICsgcGllX251bSlcbiAgICAgICAgLmFwcGVuZCgnZycpXG5cbiAgICBpZF9jb3VudCA9IDBcblxuICAgIGxlZ2VuZC5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgICAuZGF0YShrZXlzLnJldmVyc2UoKSlcbiAgICAgICAgLmVudGVyKClcbiAgICAgICAgLmluc2VydCgndGV4dCcpXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3gnLCAxOCkuYXR0cigneScsICcwJylcbiAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ3N0YXJ0JylcbiAgICAgICAgLmF0dHIoJ2FsaWdubWVudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2hpZGRlbicpXG4gICAgICAgIC5hdHRyKCdpZCcsIGQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBsZWdlbmQtdGV4dC0ke3BpZV9udW19LSR7aWRfY291bnQrK31gO1xuICAgICAgICB9KVxufVxuXG4iLCJpbXBvcnQgeyB0b29sdGlwQ3JlYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9zdWJkYXRhX2dlbmVyYXRvcidcbmltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3InXG5pbXBvcnQgeyBwaWVMZWdlbmQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2xlZ2VuZCdcbmltcG9ydCB7IHN0YXRlX3NlbGVjdG9yLCBUT1BfTEVWRUwgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3InXG5pbXBvcnQgeyBidWRnZXRDaXJjbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvYnVkZ2V0X2NpcmNsZSdcbmltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBcbiAgICAvLyBQQ0cgLT4gY3N2UGF0aCwgc2VjdG9yLCBhbW91dCwgbG9jYXRpb24sIG11bHRpcGxpZXIsIHNraXBcbiAgICBcbiAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpXG4gICAgLy8gY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHVsID0gcGllTGVnZW5kKClcbiAgICBjb25zdCBzZWxlY3RfMSA9IHN0YXRlX3NlbGVjdG9yKDEpXG4gICAgY29uc3Qgc2VsZWN0XzIgPSBzdGF0ZV9zZWxlY3RvcigyKVxuICAgIGNvbnN0IHNlbGVjdG9yX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3Rvci1jb250YWluZXJcIilbMF1cbiAgICBjb25zdCB5ZWFyU2VsZWN0b3IgPSB5ZWFyU2VsZWN0b3JcblxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMSlcbiAgICBzZWxlY3Rvcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0XzIpXG4gICAgcm9vdC5hcHBlbmRDaGlsZCh1bClcblxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKFwiQWxhYmFtYVwiLCBUT1BfTEVWRUwsIDEsIFwiLi9zcmMvYXNzZXRzL2RhdGEvRlkyMDE4LVNUQy1EZXRhaWxlZC1UYWJsZS5jc3ZcIiwgZmFsc2UpXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJXeW9taW5nXCIsIFRPUF9MRVZFTCwgMiwgXCIuL3NyYy9hc3NldHMvZGF0YS9GWTIwMTgtU1RDLURldGFpbGVkLVRhYmxlLmNzdlwiLCBmYWxzZSlcbiAgICAvLyB0b29sdGlwQ3JlYXRvcigxKVxuICAgIC8vIHRvb2x0aXBDcmVhdG9yKDIpXG4gICAgXG59KVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==