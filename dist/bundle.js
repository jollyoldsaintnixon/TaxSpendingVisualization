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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnVkZ2V0X2NpcmNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9oZWxwZXJfZnVuY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGllX2xlZ2VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdGF0ZV9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdWJfZGF0YV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3ViZGF0YV9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYXBwLnNjc3MiXSwibmFtZXMiOlsiYnVkZ2V0Q2lyY2xlIiwidG90YWwxIiwidG90YWwyIiwidXBkYXRlIiwiTWF0aCIsInNxcnQiLCJjaXJjbGVfY29udGFpbmVyIiwiZDMiLCJzZWxlY3QiLCJoZWlnaHQiLCJ3aWR0aCIsInN2ZzEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYXBwZW5kIiwiYXR0ciIsInN2ZzIiLCJkYXRhIiwicnNjYWxlIiwic2NhbGVMaW5lYXIiLCJkb21haW4iLCJtYXgiLCJyYW5nZSIsImNpcmNsZTEiLCJzZWxlY3RBbGwiLCJjaXJjbGUyIiwiZW50ZXIiLCJkIiwiaSIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsIkxpZ2h0ZW5EYXJrZW5Db2xvciIsImFzc2lnbkJveCIsImFycmF5X29mX29ianMiLCJwaWVfbnVtIiwic2lkZSIsImZvckVhY2giLCJvYmoiLCJrZXkiLCJib3giLCJkZWNpbWFscyIsIlN0cmluZyIsInBlcmNlbnQiLCJzcGxpdCIsImludGVnZXJzIiwic2xpY2VkIiwic2xpY2UiLCJpbm5lckhUTUwiLCJmaW5kQW1vdW50IiwiYW1vdW50Iiwiam9pbiIsInN1YkFycmF5TG9jYXRvciIsInRheF90eXBlIiwiY29udGFpbmVyX2FycmF5IiwiY29sIiwiYW10IiwidXNlUG91bmQiLCJudW0iLCJwYXJzZUludCIsInIiLCJiIiwiZyIsInRvU3RyaW5nIiwicFNCQyIsInAiLCJjMCIsImMxIiwibCIsIlAiLCJmIiwidCIsImgiLCJtIiwicm91bmQiLCJhIiwicFNCQ3IiLCJuIiwibGVuZ3RoIiwieCIsInBhcnNlRmxvYXQiLCJ1bmRlZmluZWQiLCJyZW1vdmUiLCJpZCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInJlbW92ZUNsYXNzIiwicmVtb3ZlX2xpc3QiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwicGVyY2VudGlmeSIsIm51bWJlciIsImZsb29yIiwiUGllQ2hhcnRHZW5lcmF0b3IiLCJDT0xPUlMiLCJDSVJDTEVfQ09MT1JTIiwiTEFCRUxTIiwic3RhdGUiLCJjc3YiLCJoMSIsInNwYW4iLCJoMiIsIlRPVEFMIiwiVFlQRVMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJyYWRpdXMiLCJjb2xvcnMiLCJzY2FsZU9yZGluYWwiLCJhcmMiLCJvdXRlclJhZGl1cyIsImlubmVyUmFkaXVzIiwicGllIiwidmFsdWUiLCJzdmciLCJ0aGVuIiwic2FsZXNfdGF4ZXMiLCJsaWNlbnNlX3RheGVzIiwiaW5jb21lX3RheGVzIiwib3RoZXJfdGF4ZXMiLCJwcm9wZXJ0eV90YXhlcyIsIkdlb19OYW1lIiwiaXRlbSIsIkFNT1VOVCIsInRheF9vYmoiLCJUYXhfVHlwZSIsInBlcmNlbnRfb2ZfdG90YWwiLCJwdXNoIiwiaW5jbHVkZXMiLCJ0ZXh0IiwiZm9ybWF0Iiwic3R5bGUiLCJwYXRoIiwiZWFzZSIsImVhc2VMaW5lYXIiLCJhdHRyVHdlZW4iLCJwaWVUd2VlbiIsInN1Yl9kYXRhX3N2ZyIsIm9uIiwiY29uc29sZSIsImxvZyIsImhhbmRsZUNsaWNrIiwic3BhbjEiLCJzcGFuMiIsImlubmVyVGV4dCIsImNhdGNoIiwiZXJyb3IiLCJpbnRlcnBvbGF0ZSIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsImVsZSIsInBpZUxlZ2VuZCIsIm1hc3Rlcl9saXN0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImxlZnRfbGlzdCIsInRleHRfbGlzdCIsInJpZ2h0X2xpc3QiLCJsZWZ0X2JveCIsInRleHRfYm94IiwicmlnaHRfYm94IiwiYmFja2dyb3VuZCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiYm9yZGVyIiwiYXBwZW5kQ2hpbGQiLCJzdWJsaXN0cyIsImxhYmVsIiwibGlzdHMiLCJsZXN0bGlzdCIsInRleHRsaXN0IiwicmlnaHRsaXN0IiwibGVmdEJveCIsInJpZ2h0Qm94IiwibGkiLCJzdWJsaXN0IiwiVE9QX0xFVkVMIiwiU1RBVEVfTkFNRVMiLCJzdGF0ZV9zZWxlY3RvciIsIndyYXBwZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInN0YXRlX2xpc3QiLCJ0b2dnbGUiLCJib2R5IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdGF0ZVNlbGVjdG9yIiwic3RhdGVfbGlzdF9pdGVtIiwic2V0QXR0cmlidXRlIiwic3ViRGF0YUxlZ2VuZCIsImxhYmVscyIsImhlaWdodHMiLCJtYXN0ZXJfc3ViX2RhdGFfbGlzdCIsInBlcmNlbnRfbGlzdCIsImxhYmVsX2xpc3QiLCJjb2xvcl9ib3giLCJ0b29sdGlwV2lkdGgiLCJ0b29sdGlwSGVpZ2h0IiwidXBkYXRlU3ViRGF0YSIsImNvbG9yX3N0cmluZyIsImNvbG9yQ2hvb3NlciIsInN1Yl9hcnJheSIsImNvbG9yX2NvdW50IiwiaWRfY291bnQiLCJ0YXhfc3RhY2siLCJrZXlzIiwic3ViX3RheCIsInN0YWNrIiwib3JkZXIiLCJzdGFja09yZGVyTm9uZSIsIm9mZnNldCIsInN0YWNrT2Zmc2V0Tm9uZSIsInRheF9zdGFja19hcnJheSIsImxheWVycyIsInhTY2FsZSIsIm5ld19jb2xvcnMiLCJ5U2NhbGUiLCJzdW0iLCJPYmplY3QiLCJ2YWx1ZXMiLCJyZWN0IiwibGF5ZXIiLCJleGl0IiwibWVyZ2UiLCJiYXIiLCJzZXRUaW1lb3V0IiwidG9vbHRpcENyZWF0b3IiLCJsZWdlbmRDcmVhdG9yIiwic3ViX2RhdGFfZGV0YWlscyIsInJlbGF0aXZlX3BlcmNlbnRfZGV0YWlscyIsIm92ZXJhbGxfcGVyY2VudF9kZXRhaWxzIiwibGlzdCIsInZhbmlsbGFfc3ZnIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaXRfaWQiLCJ0YXJnZXQiLCJsZWdlbmRfdGV4dCIsImJveF9kYXRhIiwicmVsYXRpdmVfcGVyY2VudCIsImJhc2VWYWwiLCJvdmVyYWxsX3BlcmNlbnQiLCJsZWdlbmQiLCJyZXZlcnNlIiwiaW5zZXJ0Iiwicm9vdCIsInVsIiwic2VsZWN0XzEiLCJzZWxlY3RfMiIsInNlbGVjdG9yX2NvbnRhaW5lciIsInllYXJTZWxlY3RvciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFD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QyxDQUF4QyxFQUEyQyxpREFBM0MsRUFBOEYsS0FBOUY7QUFDQSxnREFBa0IsU0FBbEIsRUFBNkJBLHlCQUE3QixFQUF3QyxDQUF4QyxFQUEyQyxpREFBM0MsRUFBOEYsS0FBOUY7QUFDQTtBQUNBO0FBRUgsQ0FyQkQsRTs7Ozs7Ozs7Ozs7QUNQQSx1QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIlxuXG5leHBvcnQgY29uc3QgYnVkZ2V0Q2lyY2xlID0gKHRvdGFsMSwgdG90YWwyLCB1cGRhdGUpID0+IHtcbiAgICAvLyBJIGdvdCBhIGxvdCBvZiBoZWxwIGZyb20gQmVuIEdhbywgYW4gQXBwIEFjYWRlbXkgVEFcbiAgICBpZiAoIXRvdGFsMSB8fCAhdG90YWwyKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICB0b3RhbDEgPSBNYXRoLnNxcnQodG90YWwxKVxuICAgIHRvdGFsMiA9IE1hdGguc3FydCh0b3RhbDIpXG5cbiAgICBjb25zdCBjaXJjbGVfY29udGFpbmVyID0gZDMuc2VsZWN0KCcjYnVkZ2V0LWNpcmNsZS1jb250YWluZXInKVxuXG4gICAgY29uc3QgaGVpZ2h0ID0gMzAwXG4gICAgY29uc3Qgd2lkdGggPSA1MDBcbiAgICBcbiAgICBjb25zdCBzdmcxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1zdmctMScpID8gZDMuc2VsZWN0KCcjY2lyY2xlLXN2Zy0xJykgOiBjaXJjbGVfY29udGFpbmVyLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKS5hdHRyKCdpZCcsICdjaXJjbGUtc3ZnLTEnKTtcbiAgICBjb25zdCBzdmcyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1zdmctMicpID8gZDMuc2VsZWN0KCcjY2lyY2xlLXN2Zy0yJykgOiBjaXJjbGVfY29udGFpbmVyLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKS5hdHRyKCdpZCcsICdjaXJjbGUtc3ZnLTInKTtcblxuICAgIGNvbnN0IGRhdGEgPSBbdG90YWwxLCB0b3RhbDJdXG5cbiAgICAvLyBjb25zdCBzdmcxID0gY2lyY2xlX2NvbnRhaW5lci5hcHBlbmQoJ3N2ZycpXG4gICAgLy8gICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgLy8gICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJykuYXR0cignaWQnLCAnY2lyY2xlLXN2Zy0xJyk7XG5cbiAgICAvLyBjb25zdCBzdmcyID0gY2lyY2xlX2NvbnRhaW5lci5hcHBlbmQoJ3N2ZycpXG4gICAgLy8gICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgLy8gICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJykuYXR0cignaWQnLCAnY2lyY2xlLXN2Zy0yJyk7XG5cbiAgICBjb25zdCByc2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oWzAsIChkMy5tYXgoZGF0YSkpXSlcbiAgICAgICAgLnJhbmdlKFsxLCBoZWlnaHQgLyAyXSlcblxuICAgIGlmICghdXBkYXRlKSB7XG4gICAgICAgIGNvbnN0IGNpcmNsZTEgPSBzdmcxLnNlbGVjdEFsbCgnLmNpcmNsZXMtMScpLmRhdGEoW3RvdGFsMV0pXG4gICAgICAgIGNvbnN0IGNpcmNsZTIgPSBzdmcyLnNlbGVjdEFsbCgnLmNpcmNsZXMtMicpLmRhdGEoW3RvdGFsMl0pXG4gICAgICAgIGNpcmNsZTEuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcnNjYWxlKGQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZXMtMScpLmF0dHIoJ2N5JywgaGVpZ2h0IC8gMilcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIChkLCBpKSA9PiB3aWR0aCAvIDIpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICcjMGE4MGFlJylcblxuICAgICAgICBjaXJjbGUyLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlcy0yJykuYXR0cignY3knLCBoZWlnaHQgLyAyKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgKGQsIGkpID0+IHdpZHRoIC8gMilcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJyMwYTgwYWUnKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGQzLnNlbGVjdCgnLmNpcmNsZXMtMScpXG4gICAgICAgIC5kYXRhKFt0b3RhbDFdKVxuICAgICAgICAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIGQzLnNlbGVjdCgnLmNpcmNsZXMtMicpXG4gICAgICAgIC5kYXRhKFt0b3RhbDJdKVxuICAgICAgICAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgfVxuICAgIFxufSIsImltcG9ydCB7IENJUkNMRV9DT0xPUlMgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBhc3NpZ25Cb3ggPSAoYXJyYXlfb2Zfb2JqcywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQtYm94LScgOiAncmlnaHQtYm94LSdcbiAgICBhcnJheV9vZl9vYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGkgPSA0O1xuICAgICAgICBzd2l0Y2ggKG9iai5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAwIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAxIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMiBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAzIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBpKVxuICAgICAgICBjb25zdCBkZWNpbWFscyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVsxXVxuICAgICAgICBjb25zdCBpbnRlZ2VycyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVswXVxuICAgICAgICBjb25zdCBzbGljZWQgPSBvYmoucGVyY2VudCA/IGludGVnZXJzICsgJy4nICsgZGVjaW1hbHMuc2xpY2UoMCwgMikgOiAwXG4gICAgICAgIGJveC5pbm5lckhUTUwgPSBzbGljZWQgKyAnJSdcbiAgICB9KTtcbn1cblxuLy8gZC5BTU9VTlQgPT09ICdYJyA/IDAgOiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMCxcbmV4cG9ydCBjb25zdCBmaW5kQW1vdW50ID0gKGFtb3VudCkgPT4ge1xuICAgIHJldHVybiBhbW91bnQgPT09ICdYJyA/IDAgOiBhbW91bnQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDBcbn1cblxuLy8gZXhwb3J0IGNvbnN0IHN1YkRhdGFQdXNoZXIgPSAoaXRlbSkgPT4ge1xuLy8gICAgIGlmIChpdGVtICE9IFwiVDAwXCIgJiYgaXRlbSAhPSBcIlQwMVwiKSB7XG4vLyAgICAgICAgIHN3aXRjaCAoaXRlbS5zbGljZSgwLCAyKSkge1xuLy8gICAgICAgICAgICAgY2FzZSAoXCJUMFwiIHx8IFwiVDFcIik6XG4vLyAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh7XG4vLyAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbi8vICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbi8vICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICBcbi8vICAgICAgICAgICAgIGNhc2UgXCJUMlwiOlxuLy8gICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh7XG4gICAgXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1cblxuXG5cbmV4cG9ydCBjb25zdCBzdWJBcnJheUxvY2F0b3IgPSAodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSkgPT4geyAgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBmaW5kaW5nIHRoZSByaWdodCBzdWIgYXJyYXkuIEEgYml0IGhhcmQtY29kZWQuXG4gICAgc3dpdGNoICh0YXhfdHlwZSkge1xuICAgICAgICBjYXNlIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzBdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzFdXG4gICAgICAgIGNhc2UgXCJJbmNvbWUgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMl1cbiAgICAgICAgY2FzZSBcIk90aGVyIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzNdXG4gICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVs0XVxuICAgIH1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiB3YXMgdGFrZW4gZnJvbSB1c2VyIFBpbXAgVHJpemtpdHMgcG9zdCBvbiBzdGFja292ZXJmbG93IGF0IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU1NjAyNDgvcHJvZ3JhbW1hdGljYWxseS1saWdodGVuLW9yLWRhcmtlbi1hLWhleC1jb2xvci1vci1yZ2ItYW5kLWJsZW5kLWNvbG9yc1xuZXhwb3J0IGZ1bmN0aW9uIExpZ2h0ZW5EYXJrZW5Db2xvcihjb2wsIGFtdCkge1xuICAgIHZhciB1c2VQb3VuZCA9IGZhbHNlO1xuICAgIGlmIChjb2xbMF0gPT0gXCIjXCIpIHtcbiAgICAgICAgY29sID0gY29sLnNsaWNlKDEpO1xuICAgICAgICB1c2VQb3VuZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIG51bSA9IHBhcnNlSW50KGNvbCwgMTYpO1xuXG4gICAgdmFyIHIgPSAobnVtID4+IDE2KSArIGFtdDtcblxuICAgIGlmIChyID4gMjU1KSByID0gMjU1O1xuICAgIGVsc2UgaWYgKHIgPCAwKSByID0gMDtcblxuICAgIHZhciBiID0gKChudW0gPj4gOCkgJiAweDAwRkYpICsgYW10O1xuXG4gICAgaWYgKGIgPiAyNTUpIGIgPSAyNTU7XG4gICAgZWxzZSBpZiAoYiA8IDApIGIgPSAwO1xuXG4gICAgdmFyIGcgPSAobnVtICYgMHgwMDAwRkYpICsgYW10O1xuXG4gICAgaWYgKGcgPiAyNTUpIGcgPSAyNTU7XG4gICAgZWxzZSBpZiAoZyA8IDApIGcgPSAwO1xuXG4gICAgcmV0dXJuICh1c2VQb3VuZCA/IFwiI1wiIDogXCJcIikgKyAoZyB8IChiIDw8IDgpIHwgKHIgPDwgMTYpKS50b1N0cmluZygxNik7XG59XG4vLyBUaGlzIGZ1bmN0aW9uIHdhcyBhbHNvIHRha2VuIGZyb20gdXNlciBQaW1wIFRyaXpraXRzIHBvc3Qgb24gc3RhY2tvdmVyZmxvdyBhdCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTYwMjQ4L3Byb2dyYW1tYXRpY2FsbHktbGlnaHRlbi1vci1kYXJrZW4tYS1oZXgtY29sb3Itb3ItcmdiLWFuZC1ibGVuZC1jb2xvcnNcbmV4cG9ydCBjb25zdCBwU0JDID0gKHAsIGMwLCBjMSwgbCkgPT4ge1xuICAgIGxldCByLCBnLCBiLCBQLCBmLCB0LCBoLCBpID0gcGFyc2VJbnQsIG0gPSBNYXRoLnJvdW5kLCBhID0gdHlwZW9mIChjMSkgPT0gXCJzdHJpbmdcIjtcbiAgICBpZiAodHlwZW9mIChwKSAhPSBcIm51bWJlclwiIHx8IHAgPCAtMSB8fCBwID4gMSB8fCB0eXBlb2YgKGMwKSAhPSBcInN0cmluZ1wiIHx8IChjMFswXSAhPSAncicgJiYgYzBbMF0gIT0gJyMnKSB8fCAoYzEgJiYgIWEpKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIXRoaXMucFNCQ3IpIHRoaXMucFNCQ3IgPSAoZCkgPT4ge1xuICAgICAgICBsZXQgbiA9IGQubGVuZ3RoLCB4ID0ge307XG4gICAgICAgIGlmIChuID4gOSkge1xuICAgICAgICAgICAgW3IsIGcsIGIsIGFdID0gZCA9IGQuc3BsaXQoXCIsXCIpLCBuID0gZC5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobiA8IDMgfHwgbiA+IDQpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgeC5yID0gaShyWzNdID09IFwiYVwiID8gci5zbGljZSg1KSA6IHIuc2xpY2UoNCkpLCB4LmcgPSBpKGcpLCB4LmIgPSBpKGIpLCB4LmEgPSBhID8gcGFyc2VGbG9hdChhKSA6IC0xXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobiA9PSA4IHx8IG4gPT0gNiB8fCBuIDwgNCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAobiA8IDYpIGQgPSBcIiNcIiArIGRbMV0gKyBkWzFdICsgZFsyXSArIGRbMl0gKyBkWzNdICsgZFszXSArIChuID4gNCA/IGRbNF0gKyBkWzRdIDogXCJcIik7XG4gICAgICAgICAgICBkID0gaShkLnNsaWNlKDEpLCAxNik7XG4gICAgICAgICAgICBpZiAobiA9PSA5IHx8IG4gPT0gNSkgeC5yID0gZCA+PiAyNCAmIDI1NSwgeC5nID0gZCA+PiAxNiAmIDI1NSwgeC5iID0gZCA+PiA4ICYgMjU1LCB4LmEgPSBtKChkICYgMjU1KSAvIDAuMjU1KSAvIDEwMDA7XG4gICAgICAgICAgICBlbHNlIHguciA9IGQgPj4gMTYsIHguZyA9IGQgPj4gOCAmIDI1NSwgeC5iID0gZCAmIDI1NSwgeC5hID0gLTFcbiAgICAgICAgfSByZXR1cm4geFxuICAgIH07XG4gICAgaCA9IGMwLmxlbmd0aCA+IDksIGggPSBhID8gYzEubGVuZ3RoID4gOSA/IHRydWUgOiBjMSA9PSBcImNcIiA/ICFoIDogZmFsc2UgOiBoLCBmID0gcFNCQ3IoYzApLCBQID0gcCA8IDAsIHQgPSBjMSAmJiBjMSAhPSBcImNcIiA/IHBTQkNyKGMxKSA6IFAgPyB7IHI6IDAsIGc6IDAsIGI6IDAsIGE6IC0xIH0gOiB7IHI6IDI1NSwgZzogMjU1LCBiOiAyNTUsIGE6IC0xIH0sIHAgPSBQID8gcCAqIC0xIDogcCwgUCA9IDEgLSBwO1xuICAgIGlmICghZiB8fCAhdCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGwpIHIgPSBtKFAgKiBmLnIgKyBwICogdC5yKSwgZyA9IG0oUCAqIGYuZyArIHAgKiB0LmcpLCBiID0gbShQICogZi5iICsgcCAqIHQuYik7XG4gICAgZWxzZSByID0gbSgoUCAqIGYuciAqKiAyICsgcCAqIHQuciAqKiAyKSAqKiAwLjUpLCBnID0gbSgoUCAqIGYuZyAqKiAyICsgcCAqIHQuZyAqKiAyKSAqKiAwLjUpLCBiID0gbSgoUCAqIGYuYiAqKiAyICsgcCAqIHQuYiAqKiAyKSAqKiAwLjUpO1xuICAgIGEgPSBmLmEsIHQgPSB0LmEsIGYgPSBhID49IDAgfHwgdCA+PSAwLCBhID0gZiA/IGEgPCAwID8gdCA6IHQgPCAwID8gYSA6IGEgKiBQICsgdCAqIHAgOiAwO1xuICAgIGlmIChoKSByZXR1cm4gXCJyZ2JcIiArIChmID8gXCJhKFwiIDogXCIoXCIpICsgciArIFwiLFwiICsgZyArIFwiLFwiICsgYiArIChmID8gXCIsXCIgKyBtKGEgKiAxMDAwKSAvIDEwMDAgOiBcIlwiKSArIFwiKVwiO1xuICAgIGVsc2UgcmV0dXJuIFwiI1wiICsgKDQyOTQ5NjcyOTYgKyByICogMTY3NzcyMTYgKyBnICogNjU1MzYgKyBiICogMjU2ICsgKGYgPyBtKGEgKiAyNTUpIDogMCkpLnRvU3RyaW5nKDE2KS5zbGljZSgxLCBmID8gdW5kZWZpbmVkIDogLTIpXG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoaWQpID0+IHtcbiAgICBjb25zdCByZW1vdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcbiAgICByZW1vdmUgPyByZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUpIDogbnVsbFxufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2xhc3MgPSBjbGFzc05hbWUgPT4ge1xuICAgIGNvbnN0IHJlbW92ZV9saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpXG4gICAgZGVidWdnZXJcbiAgICByZW1vdmVfbGlzdC5sZW5ndGggPyByZW1vdmVfbGlzdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG59XG5cbmV4cG9ydCBjb25zdCBwZXJjZW50aWZ5ID0gbnVtYmVyID0+IHtcbiAgICBpZiAodHlwZW9mIG51bWJlciA9PT0gU3RyaW5nKSB7XG4gICAgICAgIG51bWJlciA9IHBhcnNlRmxvYXQobnVtYmVyLnNwbGl0KCckJylbMV0pXG4gICAgfVxuICAgIHJldHVybiBNYXRoLmZsb29yKG51bWJlciAqIDEwMCkgLyAxMDBcbn0iLCIvLyBBIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGJhc2VkIGhlYXZpbHkgb2ZmIG9mIEthcnRoaWsgVGhvdGEncyB5b3V0dWJlIHR1dG9yaWFsIFwiSW50cm9kdWN0aW9uIHRvIGQzLmpzID0gUGllIENoYXJ0IGFuZCBEb251dCBDaGFydFwiXG4vLyBUaGUgbGVnZW5kIGNvZGUgd2FzIGZyb20gQ3J5cHRlcnMgSW5mb3RlY2gncyB5b3V0dWJlIHR1dG9yaWFsIFwiUGllIENoYXJ0IHVzaW5nIEQzLmpzXCJcblxuaW1wb3J0IHsgYXNzaWduQm94LCBmaW5kQW1vdW50IH0gZnJvbSAnLi9oZWxwZXJfZnVuY3Rpb25zJ1xuaW1wb3J0IHsgYnVkZ2V0Q2lyY2xlIH0gZnJvbSAnLi9idWRnZXRfY2lyY2xlJ1xuaW1wb3J0IHsgc3ViRGF0YSwgdXBkYXRlU3ViRGF0YSB9IGZyb20gJy4vc3ViZGF0YV9nZW5lcmF0b3InXG5pbXBvcnQgeyB0b29sdGlwQ3JlYXRvciB9IGZyb20gJy4vc3ViZGF0YV9nZW5lcmF0b3InXG4vLyBcbmV4cG9ydCBjb25zdCBDT0xPUlMgPSBbXCIjYTY3NTFlXCIsIFwiIzlhMDA0N1wiLCBcIiM2NmE1MWVcIiwgXCIjZWU3NzMxXCIsIFwiI2U4MmI4YVwiXVxuZXhwb3J0IGNvbnN0IENJUkNMRV9DT0xPUlMgPSBbQ09MT1JTWzFdLCBDT0xPUlNbMF0sIENPTE9SU1s0XSwgQ09MT1JTWzJdLCBDT0xPUlNbM11dXG4vLyBleHBvcnQgY29uc3QgTEFCRUxTID0gW1wiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiT3RoZXIgVGF4ZXNcIl1cbmV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJPdGhlciBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIFRheGVzXCJdXG4vLyBleHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3IoY3N2UGF0aCwgc2VjdG9yLCBhbW91bnQsIHN0YXRlLCBtdWx0aXBsaWVyID0gMSwgc2tpcCA9IDEpIHtcbmV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgdGF4X3R5cGUsIHBpZV9udW0sIGNzdiA9IFwiLi9zcmMvYXNzZXRzL2RhdGEvRlkyMDE4LVNUQy1EZXRhaWxlZC1UYWJsZS5jc3ZcIiwgdXBkYXRlID0gdHJ1ZSkge1xuXG4gICAgLy8gY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG4gICAgLy8gY29uc3QgcmVtb3ZlMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGV0YWlscy1cIiArIHBpZV9udW0pXG4gICAgLy8gcmVtb3ZlMiA/IHJlbW92ZTIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUyKSA6IG51bGxcblxuICAgIGNvbnN0IGgxID0gZDMuc2VsZWN0KCcjdG90YWxzLWhlYWRlci0nICsgcGllX251bSlcbiAgICBjb25zdCBzcGFuID0gZDMuc2VsZWN0KCcjdG90YWxzLXNwYW4tJyArIHBpZV9udW0pXG4gICAgY29uc3QgaDIgPSBkMy5zZWxlY3QoXCIjZGV0YWlscy1cIiArIHBpZV9udW0pXG5cblxuICAgIGxldCBUT1RBTCA9IDA7XG4gICAgbGV0IFRZUEVTID0gW11cbiAgICAvLyBDSVJDTEUgVElNRSBCQUJZXG4gICAgLy8gbWFyZ2luIGFuZCByYWRpdXNcbiAgICBjb25zdCBtYXJnaW4gPSB7IHRvcDogMjAwLCByaWdodDogMjAwLCBib3R0b206IDIwMCwgbGVmdDogMjAwIH0sXG4gICAgICAgIGhlaWdodCA9IDEwMDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSxcbiAgICAgICAgd2lkdGggPSAxMDAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXG4gICAgICAgIHJhZGl1cyA9IHdpZHRoIC8gMjtcblxuXG5cbiAgICBjb25zdCBjb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoQ09MT1JTKTtcblxuICAgIC8vIGFyYyBnZW5lcmF0b3JcbiAgICBjb25zdCBhcmMgPSBkMy5hcmMoKVxuICAgICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gMTApXG4gICAgICAgIC8vIC5pbm5lclJhZGl1cygwKTsgLy8gZm9yIGNpcmNsZVxuICAgICAgICAuaW5uZXJSYWRpdXMocmFkaXVzIC0gMTAwKSAvLyBmb3IgZG9udXRcblxuICAgIC8vIGNvbnN0IGxhYmxlQXJjID0gZDMuYXJjKClcbiAgICAvLyAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDUwKVxuICAgIC8vICAgICAuaW5uZXJSYWRpdXMocmFkaXVzIC0gNTApO1xuXG4gICAgLy8gcGllIGdlbmVyYXRvclxuICAgIGNvbnN0IHBpZSA9IGQzLnBpZSgpXG4gICAgICAgIC8vIC5zb3J0KG51bGwpXG4gICAgICAgIC52YWx1ZShkID0+IGQuYW1vdW50KTtcblxuICAgIC8vIGRlZmluZSBzdmcgXG4gICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiLnBpZS1cIiArIHBpZV9udW0pLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAuYXR0cihcImlkXCIsIFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgd2lkdGggLyAyICsgXCIsXCIgKyBoZWlnaHQgLyAyICsgXCIpXCIpXG5cbiAgICAvLyBpbXBvcnQgZGF0YVxuICAgIGQzLmNzdihjc3YpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBhcnJheXMgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIHN1YiBsZXZlbCB0YXggZGF0YVxuICAgICAgICBsZXQgc2FsZXNfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgbGljZW5zZV90YXhlcyA9IFtdXG4gICAgICAgIGxldCBpbmNvbWVfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgb3RoZXJfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgcHJvcGVydHlfdGF4ZXMgPSBbXVxuICAgICAgICAvLyBsZXQgc3RhdGVfYnVkZ2V0cyA9IHt9XG4gICAgICAgIC8vIGxldCBzYWxlc190YXhfb2JqID0geyB0YXhfZ3JvdXA6IExBQkVMU1s0XSB9XG4gICAgICAgIC8vIHBhcnNlIHRoZSBjc3ZcbiAgICAgICAgZGF0YS5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkLkdlb19OYW1lID09PSBzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gPT09IFwiVDAwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgVE9UQUwgPSBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSAhPSBcIlQwMFwiKSB7ICAvLyBkb24ndCB3YW50IHRvIGNhdGNoIFRvdGFsIG9yIFByb3BlcnR5IFRheGVzXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXhfb2JqID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBkLlRheF9UeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnRfb2ZfdG90YWw6IChmaW5kQW1vdW50KGQuQU1PVU5UKSAvIFRPVEFMKSAqIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZC5pdGVtLnNsaWNlKDAsMikpIHsgLy8gZmlsbCB1cCBzdWIgYXJyYXlzXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDBcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtID09PSBcIlQwOVwiKSB7IHNhbGVzX3RheGVzLnB1c2godGF4X29iaikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gPT09IFwiVDAxXCIpIHsgcHJvcGVydHlfdGF4ZXMucHVzaCh0YXhfb2JqKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2FsZXNfdGF4X29ialtkLlRheF9UeXBlXSA9IGZpbmRBbW91bnQoZC5BTU9VTlQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDFcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYWxlc190YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDJcIjogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGljZW5zZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNvbWVfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQ1XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQ5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRheF90eXBlLmluY2x1ZGVzKGQuaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSAhPSAnVDAwJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVFlQRVMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBkLlRheF9UeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKChmaW5kQW1vdW50KGQuQU1PVU5UKSkgLyBUT1RBTCkgKiAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGQua2V5ID0gZC5UYXhfVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgZC5hbW91bnQgPSBmaW5kQW1vdW50KGQuQU1PVU5UKTtcbiAgICAgICAgICAgICAgICAgICAgZC5wZXJjZW50ID0gKChmaW5kQW1vdW50KGQuQU1PVU5UKSkgLyBUT1RBTCkgKiAxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgY29uc3QgY29udGFpbmVyX2FycmF5ID0gW10gIC8vIHNldHRpbmcgdXAgY29udGFpbmVyIGFycmF5IGZvciBwYXNzaW5nIGludG8gY2xpY2sgaGFuZGxlclxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChzYWxlc190YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2gobGljZW5zZV90YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2goaW5jb21lX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChvdGhlcl90YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2gocHJvcGVydHlfdGF4ZXMpXG5cbiAgICAgICAgdXBkYXRlU3ViRGF0YShjb250YWluZXJfYXJyYXksIHBpZV9udW0pXG4gICAgICAgIC8vIHNldCBoMSBhZnRlciB0b3RhbCBoYXMgYmVlbiBkZWZpbmVkXG4gICAgICAgIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE4IHdhcyBcIilcbiAgICAgICAgc3Bhbi50ZXh0KFwiJFwiICsgZDMuZm9ybWF0KCcsJykoVE9UQUwpKVxuICAgICAgICBoMi50ZXh0KFwiXCIpXG4gICAgICAgIC8vIGF0dGVtcHQgYnVkZ2V0Q2lyY2xlIGNhbGxcbiAgICAgICAgLy8gYnVkZ2V0Q2lyY2xlKFRPVEFMKVxuICAgICAgICAvLyBzZXQgdXAgdGhlIHBlcmNlbnRhZ2VzIGluIHRoZSBjZW50ZXIgYm94XG4gICAgICAgIGFzc2lnbkJveChUWVBFUywgcGllX251bSlcblxuICAgICAgICBjb25zdCBnID0gc3ZnLnNlbGVjdEFsbChcIi5hcmNcIilcbiAgICAgICAgICAgIC5kYXRhKHBpZShkYXRhKSlcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcImdcIikgIC8vIEFuZCB0aGlzIGxpbmUgdG8gZ3JvdyB0aGUgbnVtYmVyIG9mIGcncyB0byB0aGUgZGF0YSBzZXQgc2l6ZVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImFyY1wiKVxuICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCAoZCwgaSkgPT4gZC52YWx1ZSA9PT0gVE9UQUwgPyBcIm5vbmVcIiA6IFwibnVsbFwiKTsgIC8vIGF0dGVtcHQgdG8gcmVuZGVyIGhhbGYgdGhlIGNoYXJ0IGludmlzaWJsZVxuICAgICAgICAgICAgXG4gICAgICAgIC8vIGFwcGVuZCB0aGUgcGF0aCBvZiB0aGUgYXJjXG4gICAgICAgIGNvbnN0IHBhdGggPSBnLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBhcmMpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGQgPT4gY29sb3JzKGQuZGF0YS5rZXkpKVxuICAgICAgICBcbiAgICAgICAgcGF0aC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbignZCcsIHBpZVR3ZWVuKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHBhdGgub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIC8vIHdoeSBkb2Vzbid0IHRoaXMgd29yaz9cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gICAgICAgICAgICAgLmR1cmF0aW9uKCc1MCcpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIGRldGVybWluZSBob3cgdG8gZmxpcCB0aGUgcGllc1xuICAgICAgICBpZiAocGllX251bSA9PT0gMikgey8vIGZsaXAgdGhlIHNlY29uZCBwaWVcbiAgICAgICAgICAgIGcuYXR0cihcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVgoLTEpIHRyYW5zbGF0ZSgzMDBweCwgMHB4KSBzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgY29uc3Qgc3ViX2RhdGFfc3ZnID0gZDMuc2VsZWN0KCcjc3ViLWRhdGEtZy0nICsgcGllX251bSkuc2VsZWN0QWxsKCcuc3ViLWRhdGEtJyArIHBpZV9udW0pXG4gICAgICAgIHBhdGgub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coZClcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICBwYXRoLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbignNTAwJylcbiAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsICcuODUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICB9KVxuICAgICAgICAub24oXCJtb3VzZW91dFwiLCBlbGUgPT4ge1xuICAgICAgICAgICAgLy8gaDEudGV4dChzdGF0ZSArIFwiJ3MgdGF4IHJldmVudWUgZm9yIDIwMTggd2FzICRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgICAgIC8vIGgyLnRleHQoXCJcIilcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljaycsIGhhbmRsZUNsaWNrKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkpXG4gICAgICAgIC8vIC5vbignY2xpY2snLCB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgc3ViX2RhdGFfc3ZnLCBwaWVfbnVtKSlcbiAgICAgICAgY29uc29sZS5sb2cocGllX251bSlcbiAgICAgICAgY29uc3Qgc3BhbjEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWxzLXNwYW4tMScpXG4gICAgICAgIGNvbnN0IHNwYW4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFscy1zcGFuLTInKVxuXG4gICAgICAgIGlmIChzcGFuMS5pbm5lclRleHRcbiAgICAgICAgICAgICYmIHNwYW4yLmlubmVyVGV4dCkge1xuICAgICAgICAgICAgY29uc3QgdG90YWwxID0gcGFyc2VJbnQoc3BhbjEuaW5uZXJUZXh0LnNsaWNlKDEpLnNwbGl0KCcsJykuam9pbignJykpXG4gICAgICAgICAgICBjb25zdCB0b3RhbDIgPSBwYXJzZUludChzcGFuMi5pbm5lclRleHQuc2xpY2UoMSkuc3BsaXQoJywnKS5qb2luKCcnKSlcbiAgICAgICAgICAgIGJ1ZGdldENpcmNsZSh0b3RhbDEsIHRvdGFsMiwgdXBkYXRlKVxuICAgICAgICB9ICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHsgaWYgKGVycm9yKSB0aHJvdyBlcnJvciB9KVxuICAgIFxuICAgIGNvbnN0IHBpZVR3ZWVuID0gYiA9PiB7XG4gICAgICAgIGIuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZTogMCB9LCBiKVxuICAgICAgICByZXR1cm4gKHQpID0+IHsgcmV0dXJuIGFyYyhpKHQpKSB9XG4gICAgfSAgICBcbn1cblxuY29uc3QgaGFuZGxlQ2xpY2sgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSA9PiB7XG4gICAgcmV0dXJuIGVsZSA9PiB7XG4gICAgICAgIFxuICAgICAgICB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSwgZWxlKVxuICAgICAgICB0b29sdGlwQ3JlYXRvcihwaWVfbnVtLCBlbGUuZGF0YS5UYXhfVHlwZSwgZWxlLmRhdGEucGVyY2VudClcbiAgICB9XG59XG4gICAgICAgICIsImltcG9ydCB7IENJUkNMRV9DT0xPUlMsIExBQkVMU30gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgdXBkYXRlU3ViRGF0YSB9IGZyb20gJy4vc3ViZGF0YV9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBwaWVMZWdlbmQgPSAoKSA9PiB7XG4gICAgY29uc3QgbWFzdGVyX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcbiAgICBtYXN0ZXJfbGlzdC5jbGFzc0xpc3QuYWRkKCdtYXN0ZXItbGlzdCcpXG5cbiAgICBjb25zdCBsZWZ0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgdGV4dF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHJpZ2h0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgICBsZWZ0X2xpc3QuY2xhc3NMaXN0LmFkZCgnbGVmdC1saXN0JykgIFxuICAgIHRleHRfbGlzdC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWxpc3QnKSAgXG4gICAgcmlnaHRfbGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodC1saXN0JykgXG5cbiAgICBmb3IgKGxldCBpID0gTEFCRUxTLmxlbmd0aCAtIDEgOyBpID49IDA7IGktLSkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbGVmdF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IHRleHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCByaWdodF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgbGVmdF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ2xlZnQtYm94JylcbiAgICAgICAgbGVmdF9ib3guaWQgPSAoJ2xlZnQtYm94LScgKyBpKVxuICAgICAgICBsZWZ0X2JveC5zdHlsZS5iYWNrZ3JvdW5kID0gQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIHJpZ2h0X2JveC5jbGFzc0xpc3QuYWRkKCdib3gnLCAncmlnaHQtYm94JylcbiAgICAgICAgcmlnaHRfYm94LmlkID0gKCdyaWdodC1ib3gtJyArIGkpXG4gICAgICAgIHJpZ2h0X2JveC5zdHlsZS5iYWNrZ3JvdW5kID0gQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIHRleHRfYm94LmNsYXNzTGlzdC5hZGQoJ3RleHQtYm94JylcbiAgICAgICAgdGV4dF9ib3guaW5uZXJIVE1MID0gTEFCRUxTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgXCIgKyBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgbGVmdF9saXN0LmFwcGVuZENoaWxkKGxlZnRfYm94KVxuICAgICAgICB0ZXh0X2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9ib3gpXG4gICAgICAgIHJpZ2h0X2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfYm94KVxuICAgIH1cblxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKGxlZnRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfbGlzdClcbiAgICByZXR1cm4gbWFzdGVyX2xpc3Rcbn1cblxuY29uc3Qgc3VibGlzdHMgPSAobGFiZWwsIGNvbG9yKSA9PiB7XG4gICAgY29uc3QgbGlzdHMgPSBbXVxuXG5cbiAgICBsZXN0bGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0bGlzdCcpXG4gICAgdGV4dGxpc3QuY2xhc3NMaXN0LmFkZCgndGV4dGxpc3QnKVxuICAgIHJpZ2h0bGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodGxpc3QnKVxuXG4gICAgY29uc3QgbGVmdEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCByaWdodEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG5cbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsZWZ0Qm94KVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGkpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChyaWdodEJveClcbiAgICByZXR1cm4gc3VibGlzdFxufVxuXG4iLCJpbXBvcnQgeyBQaWVDaGFydEdlbmVyYXRvciB9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHRvb2x0aXBDcmVhdG9yIH0gZnJvbSAnLi9zdWJkYXRhX2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IFRPUF9MRVZFTCA9IFsnVDAwJywgJ1QwMScsICdUQTEnLCAnVEEzJywgJ1RBNCcsICdUQTUnXVxuY29uc3QgU1RBVEVfTkFNRVMgPSBbJ0FsYWJhbWEnLCAnQWxhc2thJywgJ0FyaXpvbmEnLCAnQXJrYW5zYXMnLCAnQ2FsaWZvcm5pYScsICdDb2xvcmFkbycsICdDb25uZWN0aWN1dCcsICdEZWxhd2FyZScsICdGbG9yaWRhJywgJ0dlb3JnaWEnLCAnSGF3YWlpJywgJ0lkYWhvJywgJ0lsbGlub2lzJywgJ0luZGlhbmEnLCAnSW93YScsICdLYW5zYXMnLCAnS2VudHVja3knLCAnTG91aXNpYW5hJywgJ01haW5lJywgJ01hcnlsYW5kJywgJ01hc3NhY2h1c2V0dHMnLCAnTWljaGlnYW4nLCAnTWlubmVzb3RhJywgJ01pc3Npc3NpcHBpJywgJ01pc3NvdXJpJywgJ01vbnRhbmEnLCAnTmVicmFza2EnLCAnTmV2YWRhJywgJ05ldyBIYW1wc2hpcmUnLCAnTmV3IEplcnNleScsICdOZXcgTWV4aWNvJywgJ05ldyBZb3JrJywgJ05vcnRoIENhcm9saW5hJywgJ05vcnRoIERha290YScsICdPaGlvJywgJ09rbGFob21hJywgJ09yZWdvbicsICdQZW5uc3lsdmFuaWEnLCAnUmhvZGUgSXNsYW5kJywgJ1NvdXRoIENhcm9saW5hJywgJ1NvdXRoIERha290YScsICdUZW5uZXNzZWUnLCAnVGV4YXMnLCAnVXRhaCcsICdWZXJtb250JywgJ1ZpcmdpbmlhJywgJ1dhc2hpbmd0b24nLCAnV2VzdCBWaXJnaW5pYScsICdXaXNjb25zaW4nLCAnV3lvbWluZyddXG5cbmV4cG9ydCBjb25zdCBzdGF0ZV9zZWxlY3RvciA9IChwaWVfbnVtKSA9PiB7XG4gXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJzZWxlY3Qtd3JhcHBlci1cIiArIHBpZV9udW0pXG4gICAgd3JhcHBlci5pZCA9IFwic2VsZWN0LXdyYXBwZXItXCIgKyBwaWVfbnVtXG5cbiAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAgIHNlbGVjdC5pbm5lckhUTUwgPSBwaWVfbnVtID09PSAxID8gJ0FsYWJhbWEnIDogJ1d5b21pbmcnXG4gICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcInNlbGVjdC1cIiArIHBpZV9udW0pXG4gICAgc2VsZWN0LmlkID0gXCJzZWxlY3QtXCIgKyBwaWVfbnVtXG5cbiAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuICAgIH0pXG4gICAgXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0gIC8vIGFkZCBhbiBldmVudCBsaXN0ZW5lciBzbyB0aGF0IGlmIEkgY2xpY2sgYW55d2hlcmUgZWxzZSB0aGUgbGlzdCBkaXNhcHBlYXJzXG4gICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgfSlcbiAgICBcbiAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gc3RhdGUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGUgPT4ge1xuICAgICAgICAgICAgLy8gY29uc3Qgc3RhdGUgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuICAgICAgICAgICAgc2VsZWN0LmlubmVyVGV4dCA9IHN0YXRlXG4gICAgICAgICAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4gICAgICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgVE9QX0xFVkVMLCBwaWVfbnVtKVxuICAgICAgICAgICAgLy8gdG9vbHRpcENyZWF0b3IocGllX251bSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBzdGF0ZV9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnc3RhdGUtbGlzdC0nICsgcGllX251bSlcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgc3RhdGVfbGlzdC5pZCA9ICdzdGF0ZS1saXN0LScgKyBwaWVfbnVtXG4gICAgXG4gICAgU1RBVEVfTkFNRVMuZm9yRWFjaChzdGF0ZSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlX2xpc3RfaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uaW5uZXJIVE1MID0gc3RhdGVcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHN0YXRlKVxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuICAgICAgICBzdGF0ZV9saXN0LmFwcGVuZENoaWxkKHN0YXRlX2xpc3RfaXRlbSlcbiAgICB9KVxuICAgIFxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KVxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc3RhdGVfbGlzdClcbiAgICBcbiAgICByZXR1cm4gd3JhcHBlclxufVxuXG4vLyBjb25zdCBwaGFzZU91dCA9IChub2RlKSA9PiB7XG5cbi8vICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbi8vIH0iLCJleHBvcnQgY29uc3Qgc3ViRGF0YUxlZ2VuZCA9IChjb2xvcnMsIGxhYmVscywgaGVpZ2h0cywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IG1hc3Rlcl9zdWJfZGF0YV9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgbWFzdGVyX3N1Yl9kYXRhX2xpc3QuY2xhc3NMaXN0LmFkZCgnbWFzdGVyLXN1Yi1kYXRhLWxpc3QtJyArIHBpZV9udW0pXG4gICAgbWFzdGVyX3N1Yl9kYXRhX2xpc3QuaWQgPSAnbWFzdGVyLXN1Yi1kYXRhLWxpc3QtJyArIHBpZV9udW1cblxuICAgIGNvbnN0IHBlcmNlbnRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCBsYWJlbF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IGNvbG9yX2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgIGZvciAobGV0IGkgPSBsYWJlbHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblxuICAgICAgICAvLyBjb25zdCByZWxhdGl2ZV9wZXJjZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAvLyBjb25zdCBvdmVyYWxsX3BlcmNlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCBjb2xvcl9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgdGV4dF9ib3guY2xhc3NMaXN0LmFkZCgnc3ViLWRhdGEtbGFiZWwtJyArIHBpZV9udW0pXG4gICAgICAgIHRleHRfYm94LmlubmVySFRNTCA9IGxhYmVsc1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JzW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgXCIgKyBDSVJDTEVfQ09MT1JTW2ldXG4gICAgfVxufSIsImltcG9ydCB7IHN1YkFycmF5TG9jYXRvciwgcGVyY2VudGlmeSwgTGlnaHRlbkRhcmtlbkNvbG9yLCByZW1vdmUsIHJlbW92ZUNsYXNzIH0gZnJvbSAnLi9oZWxwZXJfZnVuY3Rpb25zJ1xuaW1wb3J0IHsgQ0lSQ0xFX0NPTE9SUywgTEFCRUxTIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJztcbmltcG9ydCB7IHN1YkRhdGFMZWdlbmQgfSBmcm9tICcuL3N1Yl9kYXRhX2xlZ2VuZCdcblxuY29uc3Qgd2lkdGggPSA5MCAgLy8gc2V0dGluZyB0aGUgZGltZW5zaW9ucyB0byBjb3JyZXNwb25kIHRvIHRoZSBwaWUgY2hhcnRzJ1xuY29uc3QgaGVpZ2h0ID0gNzUwXG4vLyBjb25zdCBoZWlnaHQgPSA5MCAgLy8gc2V0dGluZyB0aGUgZGltZW5zaW9ucyB0byBjb3JyZXNwb25kIHRvIHRoZSBwaWUgY2hhcnRzJ1xuLy8gY29uc3Qgd2lkdGggPSA1MDBcblxuY29uc3QgdG9vbHRpcFdpZHRoID0gMTIwIC8vIHdpbGwgYWx0ZXIgdGhlc2UgYXMgbmVlZGVkXG5jb25zdCB0b29sdGlwSGVpZ2h0ID0gNDBcblxuLy8gZXhwb3J0IGNvbnN0IHN1YkRhdGEgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtLCBjb2xvcl9zdHJpbmcgPSBcIiMzRjZEMkFcIikgPT4ge1xuLy8gICAgIC8vIGEgbG90IG9mIHRoaXMgY29kZSB3YXMgbGVhcm5lZCBmcm9tIE1pY2hhZWwgU3RhbmFsYW5kJ3MgXCJTdGFja2VkIGJhciBjaGFydCB3aXRoIHRvb2x0aXBzXCIgdHV0b3JpYWwgYXQgaHR0cDovL2JsLm9ja3Mub3JnL21zdGFuYWxhbmQvNjEwMDcxM1xuXG4vLyAgICAgcmVtb3ZlKCdzdWItZGF0YS1zdmctJyArIHBpZV9udW0pXG4vLyAgICAgcmVtb3ZlKCdzdWItZGF0YS1sZWdlbmQtc3ZnLScgKyBwaWVfbnVtKVxuXG4gICAgXG4vLyAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiI3N1Yi1kYXRhLVwiICsgcGllX251bSlcbi8vICAgICAgICAgLmFwcGVuZChcInN2Z1wiKSBcbi8vICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCkuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpLmF0dHIoJ2lkJywgJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcbi8vICAgICAgICAgLmFwcGVuZChcImdcIilcbi8vICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLScgKyBwaWVfbnVtKS5hdHRyKCdpZCcsICdzdWItZGF0YS1nLScgKyBwaWVfbnVtKVxuLy8gICAgIGNvbnNvbGUubG9nKHN2Zylcbi8vICAgICB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgc3ZnLCBwaWVfbnVtKShudWxsKVxuLy8gfVxuXG5cbmV4cG9ydCBjb25zdCB1cGRhdGVTdWJEYXRhID0gKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSwgZWxlKSA9PiB7XG4gICAgXG4gICAgLy8gcmV0dXJuIChlbGUpID0+IHtcblxuICAgICAgICByZW1vdmUoJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcbiAgICAgICAgcmVtb3ZlKCdzdWItZGF0YS1sZWdlbmQtc3ZnLScgKyBwaWVfbnVtKVxuXG5cbiAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiI3N1Yi1kYXRhLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKVxuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtZy0nICsgcGllX251bSlcbiAgICAgICAgICAgIC8vIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIilcblxuXG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YXhfdHlwZSA9IGVsZSA/IGVsZS5kYXRhLmtleSA6IFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCJcbiAgICAgICAgY29uc3QgY29sb3Jfc3RyaW5nID0gY29sb3JDaG9vc2VyKHRheF90eXBlKVxuICAgICAgICBjb25zdCBzdWJfYXJyYXkgPSBzdWJBcnJheUxvY2F0b3IodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSlcbiAgICAgICAgbGV0IGNvbG9yX2NvdW50ID0gMFxuICAgICAgICBsZXQgaWRfY291bnQgPSAwXG4gICAgXG4gICAgICAgIGxldCB0YXhfc3RhY2sgPSB7fVxuICAgICAgICAvLyBzZXR0aW5nIHVwIGtleXNcbiAgICAgICAgbGV0IGtleXMgPSBbXVxuICAgICAgICAvLyBrZXlzLnB1c2godGF4X3R5cGUpXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKChzdWJfdGF4LCBpKSA9PiB7XG4gICAgICAgICAgICBrZXlzLnB1c2goc3ViX3RheC5rZXkpXG4gICAgICAgICAgICB0YXhfc3RhY2tbc3ViX3RheC5rZXldID0gc3ViX3RheC5wZXJjZW50X29mX3RvdGFsXG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBjb25zdCBzdGFjayA9IGQzLnN0YWNrKClcbiAgICAgICAgICAgIC5rZXlzKGtleXMpXG4gICAgICAgICAgICAub3JkZXIoZDMuc3RhY2tPcmRlck5vbmUpXG4gICAgICAgICAgICAub2Zmc2V0KGQzLnN0YWNrT2Zmc2V0Tm9uZSlcbiAgICAgICAgbGV0IHRheF9zdGFja19hcnJheSA9IFtdXG4gICAgICAgIHRheF9zdGFja19hcnJheS5wdXNoKHRheF9zdGFjaylcbiAgICAgICAgY29uc3QgbGF5ZXJzID0gc3RhY2sodGF4X3N0YWNrX2FycmF5KVxuICAgIFxuICAgICAgICBjb25zdCB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCAxXSlcbiAgICAgICAgICAgIC5yYW5nZShbMCwgd2lkdGhdKVxuXG4gICAgICAgIGNvbnN0IG5ld19jb2xvcnMgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbMCwga2V5cy5sZW5ndGhdKVxuICAgICAgICAgICAgLnJhbmdlKFtcIndoaXRlXCIsIGNvbG9yX3N0cmluZ10pXG5cbiAgICAgICAgY29uc3QgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbMCwgZDMuc3VtKE9iamVjdC52YWx1ZXModGF4X3N0YWNrKSldKSAgLy8gdGhlIGluY3JlbWVudCB1cCB0byB0aGUgdG90YWxcbiAgICAgICAgICAgIC8vIC5yYW5nZShbaGVpZ2h0LCAwXSlcbiAgICAgICAgICAgIC5yYW5nZShbMCwgaGVpZ2h0XSlcbiAgICBcbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuc3ViLXRheGVzLVwiICsgcGllX251bSkgIC8vIG5vIGcgYXQgdGhpcyBwb2ludCwgYnV0IHRoZXkgd2lsbCBoYXZlIHRoaXMgY2xhc3NcbiAgICAgICAgICAgIC5kYXRhKGxheWVycykuZW50ZXIoKSAgLy8gbm93IHRoZXJlIHdpbGwgYmUgYSBnIGZvciBldmVyeSBiYXIgd2l0aGluIHRoZSBncmFwaC5cbiAgICAgICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3ViLXRheGVzLVwiICsgcGllX251bSlcbiAgICBcbiAgICAgICAgY29uc3QgcmVjdCA9IGcuc2VsZWN0QWxsKFwicmVjdFwiKSAgLy8gbWFraW5nIGVhY2ggb2JqIG9mIHRoZSBjb3JyZXNwb25kIHRvIGEgcmVjdCB3aXRoaW4gdGhlIGdcbiAgICAgICAgICAgIC5kYXRhKGxheWVyID0+IGxheWVyKTsgLy8gcHVsbGluZyBvdXQgZWFjaCBpbmRpdmlkdWFsIG9ialxuICAgICAgICAgICAgcmVjdC5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICByZWN0LmVudGVyKCkuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB4U2NhbGUoMCkpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgeFNjYWxlKDEpKSAgLy8gcHJvYmFibHkgY2FuIGhhcmQgY29kZSwgc2luY2Ugb25seSBvbmUgYmFyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBzdGFjay0ke3BpZV9udW19LSR7aWRfY291bnQrK31gXG4gICAgICAgICAgICAgICAgfSkubWVyZ2UocmVjdClcblxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB4U2NhbGUoMCkpICAvLyBwYXNzaW5nIGVhY2ggb2JqJ3MgeCB2YWx1ZSB0byB0aGUgZDMgeCBmdW5jdGlvbiBkZWZpbmVkIGFib3ZlXG4gICAgICAgICAgICAuYXR0cigneScsIGxheWVyID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0IC0geVNjYWxlKGxheWVyWzFdKVxuICAgICAgICAgICAgfSkgIC8vIHkwIGlzIHRoZSBoZWlnaHQgd2hlcmUgZWFjaCBzZWdtZW50IGluIHRoZSBzdGFjayBzdGFydHNcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHhTY2FsZSgxKSkgIC8vIHByb2JhYmx5IGNhbiBoYXJkIGNvZGUsIHNpbmNlIG9ubHkgb25lIGJhclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGJhciA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHlTY2FsZShiYXJbMV0gLSBiYXJbMF0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAoZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdfY29sb3JzKCsrY29sb3JfY291bnQpXG4gICAgICAgICAgICB9KSBcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBlbGUgPyBlbGUuZGF0YS5wZXJjZW50IDogbnVsbFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHt0b29sdGlwQ3JlYXRvcihwaWVfbnVtLCB0YXhfdHlwZSwgcGVyY2VudCl9LCAwKVxuICAgICAgICAvLyB0b29sdGlwQ3JlYXRvcihwaWVfbnVtLCB0YXhfdHlwZSlcblxuICAgIGxlZ2VuZENyZWF0b3IocGllX251bSwga2V5cywgbmV3X2NvbG9ycylcbiAgICAvLyBzdWJEYXRhTGVnZW5kKG5ld19jb2xvcnMsIClcblxuICAgIC8vIH1cblxufVxuXG5jb25zdCBjb2xvckNob29zZXIgPSAodGF4X3R5cGUpID0+IHtcbiAgICBzd2l0Y2ggKHRheF90eXBlKSB7XG4gICAgICAgIGNhc2UgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzRdXG4gICAgICAgIGNhc2UgJ1Byb3BlcnR5IFRheGVzJzpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzNdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gQ0lSQ0xFX0NPTE9SU1syXVxuICAgICAgICBjYXNlICdJbmNvbWUgVGF4ZXMnOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbMV1cbiAgICAgICAgY2FzZSAnT3RoZXIgVGF4ZXMnOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbMF1cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCB0b29sdGlwQ3JlYXRvciA9IChwaWVfbnVtLCB0YXhfdHlwZSwgcGVyY2VudCkgPT4ge1xuICAgIFxuICAgIGNvbnN0IHN1Yl9kYXRhX2RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZGF0YS1kZXRhaWxzLXR5cGUtJHtwaWVfbnVtfWApXG4gICAgY29uc3QgcmVsYXRpdmVfcGVyY2VudF9kZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHJlbGF0aXZlLXBlcmNlbnQtJHtwaWVfbnVtfWApXG4gICAgY29uc3Qgb3ZlcmFsbF9wZXJjZW50X2RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgb3ZlcmFsbC1wZXJjZW50LSR7cGllX251bX1gKVxuICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ViLWRhdGEtZGV0YWlscy0nICsgcGllX251bSlcbiAgICBjb25zdCBzaWRlID0gcGllX251bSA9PT0gMSA/ICdsZWZ0JyA6ICdyaWdodCdcbiAgICBjb25zdCB2YW5pbGxhX3N2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWItZGF0YS1zdmctJyArIHBpZV9udW0pXG4gICAgbGV0IGluZGV4O1xuXG4gICAgaWYgKCF0YXhfdHlwZSB8fCB0YXhfdHlwZSA9PT0gXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIikge1xuICAgICAgICB0YXhfdHlwZSA9ICdTYWxlcyBUYXhlcydcbiAgICAgICAgaW5kZXggPSBMQUJFTFMuaW5kZXhPZih0YXhfdHlwZSlcbiAgICAgICAgcGVyY2VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBgLWJveC1gICsgaW5kZXgpLmlubmVySFRNTFxuICAgICAgICBwZXJjZW50ID0gcGFyc2VGbG9hdChwZXJjZW50LnNsaWNlKDAsIC0xKSlcbiAgICB9XG4gICAgXG4gICAgaW5kZXggPSBMQUJFTFMuaW5kZXhPZih0YXhfdHlwZSlcbiAgICBzdWJfZGF0YV9kZXRhaWxzLmlubmVySFRNTCA9IGAke3RheF90eXBlfWBcbiAgICByZWxhdGl2ZV9wZXJjZW50X2RldGFpbHMuaW5uZXJIVE1MID0gYFBlcmNlbnQgb2YgdG90YWwgYnVkZ2V0OiAke3BlcmNlbnRpZnkocGVyY2VudCl9YFxuICAgIG92ZXJhbGxfcGVyY2VudF9kZXRhaWxzLmlubmVySFRNTCA9ICdTY3JvbGwgb3ZlciBzaWRlIGJhciB0byBzZWUgc3ViIHRheCBkYXRhIGZvciB0aGlzIGNhdGVnb3J5J1xuICAgIGxpc3Quc3R5bGUuYmFja2dyb3VuZCA9IENJUkNMRV9DT0xPUlNbaW5kZXhdXG4gICAgLy8gdmFuaWxsYV9zdmcuYXBwZW5kQ2hpbGQodmFuaWxsYV90b29sdGlwKVxuICAgIFxuICAgIHZhbmlsbGFfc3ZnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgICAgIGluZGV4ID0gTEFCRUxTLmluZGV4T2YodGF4X3R5cGUpXG4gICAgICAgIGNvbnN0IHNwbGl0X2lkICA9IGUudGFyZ2V0LmlkLnNwbGl0KCctJylcbiAgICAgICAgY29uc3QgbGVnZW5kX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGVnZW5kLXRleHQtJHtzcGxpdF9pZFsxXX0tJHtzcGxpdF9pZFsyXX1gKVxuICAgICAgICAvLyBjb25zdCBsZWdlbmRfaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsZWdlbmQtaXRlbS0ke3NwbGl0X2lkWzFdfS0ke3NwbGl0X2lkWzJdfWApXG4gICAgICAgIGNvbnN0IGJveF9kYXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2lkZSArIGAtYm94LWAgKyBpbmRleCkuaW5uZXJIVE1MXG4gICAgICAgIFxuICAgICAgICBsZXQgcmVsYXRpdmVfcGVyY2VudCA9IChlLnRhcmdldC5oZWlnaHQuYmFzZVZhbC52YWx1ZSAvIGhlaWdodCkgKiAxMDBcbiAgICAgICAgcmVsYXRpdmVfcGVyY2VudCA9IE1hdGgucm91bmQoMTAwICogcmVsYXRpdmVfcGVyY2VudCkgLyAxMDBcbiAgICAgICAgXG4gICAgICAgIGxldCBvdmVyYWxsX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGJveF9kYXRhLnNsaWNlKDAsIC0xKSlcbiAgICAgICAgb3ZlcmFsbF9wZXJjZW50ID0gTWF0aC5yb3VuZCgxMDAgKiBvdmVyYWxsX3BlcmNlbnQgKiByZWxhdGl2ZV9wZXJjZW50IC8gMTAwKSAvIDEwMFxuICAgICAgICAvLyBsZXQgb3ZlcmFsbF9wZXJjZW50ID0gXG4gICAgICAgIC8vIGxlZ2VuZF9pdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIG92ZXJhbGxfcGVyY2VudF9kZXRhaWxzLmlubmVySFRNTCA9IGBQZXJjZW50IG9mIHRvdGFsIGJ1ZGdldDogYCArIG92ZXJhbGxfcGVyY2VudFxuICAgICAgICByZWxhdGl2ZV9wZXJjZW50X2RldGFpbHMuaW5uZXJIVE1MID0gYFBlcmNlbnQgb2YgY2F0ZWdvcnk6ICR7cmVsYXRpdmVfcGVyY2VudH1gXG4gICAgICAgIGlmIChsZWdlbmRfdGV4dCkgeyBzdWJfZGF0YV9kZXRhaWxzLmlubmVySFRNTCA9IGxlZ2VuZF90ZXh0LmlubmVySFRNTCB9XG4gICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjb2xvcjogJyArIENJUkNMRV9DT0xPUlNbaW5kZXhdKVxuICAgICAgICAvLyBsaXN0X2NvbG9yLnN0eWxlLmJvcmRlciA9IGA0cHggc29saWQgJHtDSVJDTEVfQ09MT1JTW2luZGV4XX1gXG4gICAgICAgIC8vIHZhbmlsbGFfdG9vbHRpcC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgIH0pXG4gICAgdmFuaWxsYV9zdmcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBlID0+IHtcblxuICAgIH0pXG5cbn1cblxuY29uc3QgbGVnZW5kQ3JlYXRvciA9IChwaWVfbnVtLCBrZXlzLCBuZXdfY29sb3JzKSA9PiB7XG5cbiAgICBsZXQgY29sb3JfY291bnQgPSAwXG4gICAgbGV0IGlkX2NvdW50ID0gMFxuXG4gICAgY29uc3QgbGVnZW5kID0gZDMuc2VsZWN0KFwiI3N1Yi1kYXRhLWxlZ2VuZC1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS1sZWdlbmQtc3ZnLScgKyBwaWVfbnVtKS5hdHRyKCdpZCcsICdzdWItZGF0YS1sZWdlbmQtc3ZnLScgKyBwaWVfbnVtKVxuICAgICAgICAuYXBwZW5kKCdnJylcblxuICAgIGlkX2NvdW50ID0gMFxuXG4gICAgbGVnZW5kLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAgIC5kYXRhKGtleXMucmV2ZXJzZSgpKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuaW5zZXJ0KCd0ZXh0JylcbiAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cigneCcsIDE4KS5hdHRyKCd5JywgJzAnKVxuICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnc3RhcnQnKVxuICAgICAgICAuYXR0cignYWxpZ25tZW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnaGlkZGVuJylcbiAgICAgICAgLmF0dHIoJ2lkJywgZCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYGxlZ2VuZC10ZXh0LSR7cGllX251bX0tJHtpZF9jb3VudCsrfWA7XG4gICAgICAgIH0pXG59XG5cbiIsImltcG9ydCB7IHRvb2x0aXBDcmVhdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3N1YmRhdGFfZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHBpZUxlZ2VuZCB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfbGVnZW5kJ1xuaW1wb3J0IHsgc3RhdGVfc2VsZWN0b3IsIFRPUF9MRVZFTCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGF0ZV9zZWxlY3RvcidcbmltcG9ydCB7IGJ1ZGdldENpcmNsZSB9IGZyb20gJy4vY29tcG9uZW50cy9idWRnZXRfY2lyY2xlJ1xuaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2NzcydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIFxuICAgIC8vIFBDRyAtPiBjc3ZQYXRoLCBzZWN0b3IsIGFtb3V0LCBsb2NhdGlvbiwgbXVsdGlwbGllciwgc2tpcFxuICAgIFxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgICAvLyBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHNlbGVjdF8xID0gc3RhdGVfc2VsZWN0b3IoMSlcbiAgICBjb25zdCBzZWxlY3RfMiA9IHN0YXRlX3NlbGVjdG9yKDIpXG4gICAgY29uc3Qgc2VsZWN0b3JfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdG9yLWNvbnRhaW5lclwiKVswXVxuICAgIGNvbnN0IHllYXJTZWxlY3RvciA9IHllYXJTZWxlY3RvclxuXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8xKVxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMilcbiAgICByb290LmFwcGVuZENoaWxkKHVsKVxuXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJBbGFiYW1hXCIsIFRPUF9MRVZFTCwgMSwgXCIuL3NyYy9hc3NldHMvZGF0YS9GWTIwMTgtU1RDLURldGFpbGVkLVRhYmxlLmNzdlwiLCBmYWxzZSlcbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIld5b21pbmdcIiwgVE9QX0xFVkVMLCAyLCBcIi4vc3JjL2Fzc2V0cy9kYXRhL0ZZMjAxOC1TVEMtRGV0YWlsZWQtVGFibGUuY3N2XCIsIGZhbHNlKVxuICAgIC8vIHRvb2x0aXBDcmVhdG9yKDEpXG4gICAgLy8gdG9vbHRpcENyZWF0b3IoMilcbiAgICBcbn0pXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9