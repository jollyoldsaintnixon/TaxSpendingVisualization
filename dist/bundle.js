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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.LightenDarkenColor = LightenDarkenColor;
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

var budgetCircle = exports.budgetCircle = function budgetCircle(total1, total2) {
    // based on Matthew McKenna's example at http://bl.ocks.org/mpmckenna8/raw/566509dd3d9a08e5f9b2/
    if (!total1 || !total2) {
        return;
    }
    total1 = Math.sqrt(total1);
    total2 = Math.sqrt(total2);
    // delete old circles
    var old_cirlce_1 = document.getElementById('circle-svg-1');
    var old_cirlce_2 = document.getElementById('circle-svg-2');
    old_cirlce_1 ? old_cirlce_1.parentNode.removeChild(old_cirlce_1) : null;
    old_cirlce_2 ? old_cirlce_2.parentNode.removeChild(old_cirlce_2) : null;

    var data = [total1, total2];

    var height = 300;
    var width = 500;

    var circle_container = d3.select('#budget-circle-container');

    var svg1 = circle_container.append('svg').attr('width', width).attr('height', height).attr('class', 'circle-svg').attr('id', 'circle-svg-1');

    var svg2 = circle_container.append('svg').attr('width', width).attr('height', height).attr('class', 'circle-svg').attr('id', 'circle-svg-2');

    var rscale = d3.scaleLinear().domain([0, d3.max(data)]).range([1, 150]);

    svg1.selectAll('.circles').data([total1]).enter().append('circle').attr('r', function (d) {

        return rscale(d);
    }).attr('class', 'circles').attr('cy', height / 2).attr('cx', function (d, i) {
        return width / 2;
    }).attr('fill', '#0a80ae');

    svg2.selectAll('.circles').data([total2]).enter().append('circle').attr('r', function (d) {
        return rscale(d);
    }).attr('class', 'circles').attr('cy', height / 2).attr('cx', function (d, i) {
        return width / 2;
    }).attr('fill', '#0a80ae');
};

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
exports.LABELS = exports.CIRCLE_COLORS = undefined;
exports.PieChartGenerator = PieChartGenerator;

var _helper_functions = __webpack_require__(/*! ./helper_functions */ "./src/components/helper_functions.js");

var _subdata_generator = __webpack_require__(/*! ./subdata_generator */ "./src/components/subdata_generator.js");

// 
// A lot of this code was based heavily off of Karthik Thota's youtube tutorial "Introduction to d3.js = Pie Chart and Donut Chart"
// The legend code was from Crypters Infotech's youtube tutorial "Pie Chart using D3.js"

var COLORS = ["#a6751e", "#9a0047", "#66a51e", "#7470b3", "#e82b8a"];
var CIRCLE_COLORS = exports.CIRCLE_COLORS = [COLORS[1], COLORS[0], COLORS[4], COLORS[2], COLORS[3]];
// export const LABELS = ["Property Taxes", "Sales and Gross Receipts Taxes", "License Taxes", "Income Taxes", "Other Taxes"]
var LABELS = exports.LABELS = ["Other Taxes", "Income Taxes", "License Taxes", "Property Taxes", "Sales Taxes"];
// export function PieChartGenerator(csvPath, sector, amount, state, multiplier = 1, skip = 1) {
function PieChartGenerator(state, tax_type, pie_num) {
    var csv = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "./src/assets/data/FY2018-STC-Detailed-Table.csv";


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
        // let sales_tax_obj = { tax_group: LABELS[4] }
        // parse the csv
        data.forEach(function (d, i) {

            if (d.Geo_Name === state) {
                if (d.item === "T00") {
                    TOTAL = d.AMOUNT.split(',').join('') * 1000;
                }

                if (d.item != "T00" && d.item != "T01") {
                    // don't want to catch Total or Property Taxes
                    var tax_obj = {
                        key: d.Tax_Type,
                        amount: (0, _helper_functions.findAmount)(d.AMOUNT),
                        percent_of_total: (0, _helper_functions.findAmount)(d.AMOUNT) / TOTAL * 100
                    };

                    switch (d.item.slice(0, 2)) {// fill up sub arrays
                        case "T0":
                            sales_taxes.push(tax_obj);
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
        // set h1 after total has been defined
        h1.text(state + "'s tax revenue for 2018 was ");
        span.text("$" + d3.format(',')(TOTAL));
        h2.text("");
        // attempt budgetCircle call
        (0, _helper_functions.budgetCircle)(TOTAL);
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
        g.on("mouseover", function (d, i) {
            console.log(d);
            d3.select(_this).transition().duration('50').attr('opacity', '.85').attr("cursor", 'pointer');
        }).on("mouseout", function (ele) {
            // h1.text(state + "'s tax revenue for 2018 was $" + d3.format(',')(TOTAL))
            // h2.text("")
        }).on('click', (0, _subdata_generator.subData)(container_array, pie_num));

        var span1 = document.getElementById('totals-span-1');
        var span2 = document.getElementById('totals-span-2');

        if (span1.innerText && span2.innerText) {
            var total1 = parseInt(span1.innerText.slice(1).split(',').join(''));
            var total2 = parseInt(span2.innerText.slice(1).split(',').join(''));
            (0, _helper_functions.budgetCircle)(total1, total2);
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

    for (var i = _pie_chart_generator.LABELS.length - 1; i >= 0; i--) {

        var left_box = document.createElement('li');
        var text_box = document.createElement('li');
        var right_box = document.createElement('li');

        left_box.classList.add('box', 'left-box');
        left_box.id = 'left-box-' + i;
        left_box.style.color = _pie_chart_generator.CIRCLE_COLORS[i];

        right_box.classList.add('box', 'right-box');
        right_box.id = 'right-box-' + i;
        right_box.style.color = _pie_chart_generator.CIRCLE_COLORS[i];

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

var TOP_LEVEL = exports.TOP_LEVEL = ['T00', 'T01', 'TA1', 'TA3', 'TA4', 'TA5'];
var STATE_NAMES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

// export const selector = (pie_num) => {

//     // const container = document.createElement('div')  // revisit if time to make custom select
//     // container.classList.add('initial-container')

//     const select = document.createElement("select")
//     select.setAttribute("class", "select-" + pie_num)

//     const stateSelector = e => {
//         const state = e.target.value
//         const svg = document.getElementById("svg-" + pie_num)
//         svg.parentNode.removeChild(svg)
//         PieChartGenerator(state, TOP_LEVEL, pie_num)

//         const side = pie_num === 1 ? "-left" : "-right"
//         // const h2 = document.getElementsByClassName("state" + side)[0]
//         // h2.innerHTML = state
//     }

//     STATE_NAMES.forEach(state => {
//         const default_state = pie_num === 1 ? STATE_NAMES[0] : STATE_NAMES[STATE_NAMES.length - 1]
//         const option = document.createElement("option")
//         if (state === default_state) {
//             option.setAttribute("selected", true)
//         }
//         option.innerHTML = state
//         option.setAttribute("value", state)
//         // option.addEventListener("click", stateSelector(state))
//         // option.setAttribute("onclick", stateSelector(state))
//         select.appendChild(option)
//     })
//     select.addEventListener("change", stateSelector)
//     // container.appendChild(select)
//     // return container
//     return select
// }

// const phaseOut = (node) => {

//     node.parentNode.removeChild(node)
// }

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
exports.subData = undefined;

var _helper_functions = __webpack_require__(/*! ./helper_functions */ "./src/components/helper_functions.js");

var subData = exports.subData = function subData(container_array, pie_num) {
    var color_string = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#3F6D2A";

    // a lot of this code was learned from Michael Stanaland's "Stacked bar chart with tooltips" tutorial at http://bl.ocks.org/mstanaland/6100713
    return function (ele) {
        // debugger
        var tax_type = ele.data.key;

        var sub_array = (0, _helper_functions.subArrayLocator)(tax_type, container_array);

        // setting up the tax stack to comply with d3 v5
        var tax_stack = {}
        // tax_type: tax_type,

        // setting up keys
        ;var keys = [];
        // keys.push(tax_type)
        sub_array.forEach(function (sub_tax, i) {
            keys.push(sub_tax.key);
            tax_stack[sub_tax.key] = sub_tax.percent_of_total;
        });

        var width = 90; // setting the dimensions to correspond to the pie charts'
        var height = 600;

        var tooltipWidth = 120; // will alter these as needed
        var tooltipHeight = 40;

        var svg = d3.select("pie-" + pie_num).append("svg").attr("width", width).attr("height", height).append("g").attr('class', 'sub-data-' + pie_num);

        // set the layers of the stacked bar
        // const layers = d3.stack()([tax_type].map(tax => {  // should ultimately just be the one layer
        //     return sub_array.map(d => {
        //         return { x: d.key, y: d.amount, percent: d.percent }
        //     })
        // }))
        var stack = d3.stack().keys(keys).order(d3.stackOrderNone).offset(d3.stackOffsetNone);
        var tax_stack_array = [];
        tax_stack_array.push(tax_stack);
        var layers = stack(tax_stack_array);

        // const x = d3.scaleOrdinal()
        //     .domain(layers[0].map(d => d.x))
        //     // .range([10, width], 0)  // may be a quicker way to do this as there is only one bar
        //     .range([width])
        var xScale = d3.scaleLinear().domain([0, 1]).range([0, width]);

        // const colors = d3.scaleLinear()
        //     .domain([1, 10])
        //     .range(["red", "blue"])

        var colors = [color_string];
        var decrement = 100 / keys.length;
        var next_color = (0, _helper_functions.LightenDarkenColor)(color_string, decrement);
        while (colors.length < keys.length) {
            colors.push(next_color);
            next_color = (0, _helper_functions.LightenDarkenColor)(next_color, decrement);
        }

        console.log(colors);

        var yScale = d3.scaleLinear().domain([0, d3.sum(Object.values(tax_stack))]) // the increment up to the total
        // .range([height, 0])
        .range([0, height]);

        var g = svg.selectAll(".sub-taxes") // no g at this point, but they will have this class
        .data(layers).enter() // now there will be a g for every bar within the graph.
        .append("g").attr("class", "sub-taxes");
        // .attr('fill', d => {
        //     // debugger
        //     return colors(d)})

        var rect = g.selectAll("rect") // making each obj of the correspond to a rect within the g
        .data(function (layer) {
            return layer;
        }) // pulling out each individual obj
        .enter().append("rect").attr('x', function (d) {
            return xScale(0);
        }) // passing each obj's x value to the d3 x function defined above
        .attr('y', function (layer) {
            // debugger
            return height - yScale(layer[1]);
        }) // y0 is the height where each segment in the stack starts
        .attr('width', xScale(1)) // probably can hard code, since only one bar
        .attr('height', function (bar) {
            // debugger
            return yScale(bar[1] - bar[0]);
        }).attr('fill', function (d) {
            // debugger
            return colors.pop();
        }); // height is set to the starting point plus the height, and all that subtracted from the starting point due to y values begining at top of screen
        //     .on('mouseover', () => tooltip.style("display", true))  // want the info box to switch between visible and inivis based on mouseover
        //     .on('mouseout', () => tooltip.style("display", "none"))
        //     .on('mousemove', d => {  // this is going to be a sweet effect!
        //         const xPos = d3.mouse(this)[0] - (tooltipWidth / 2) // this[0] corresponds to mouse's x pos, and pushing it left by half of the tooltip's width ensure it is centered
        //         const yPos = d3.mouse(this)[1] - 25 // puts the tooltip up a bit above the cursor
        //         tooltip.attr("transform", "translate(" + xPos + ',' + yPos + ')')
        //         tooltip.select('text').text(d.percent_of_total) // shows the percent  
        //     })

        // const tooltip = svg.append('g') // setting up this sweet tooltip. Exciting!
        //     .attr('class', 'sub-data-tooltip tooltip').style('display', 'none') // starts invisible
        //     // adding the dimensions of the box
        //     .append('rect').attr('width', tooltipWidth)
        //     .attr('height', tooltipHeight).attr('fill', 'white').style('opacity', 0.5) // making it partially see-through
        //     // adding the text content
        //     .append('text').attr('x', 15)
        //     .attr('dy', '.8em').style('text-anchor', 'middle')
    };
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

var _state_selector = __webpack_require__(/*! ./components/state_selector */ "./src/components/state_selector.js");

var _helper_functions = __webpack_require__(/*! ./components/helper_functions */ "./src/components/helper_functions.js");

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

    (0, _pie_chart_generator.PieChartGenerator)("Alabama", _state_selector.TOP_LEVEL, 1);
    (0, _pie_chart_generator.PieChartGenerator)("Wyoming", _state_selector.TOP_LEVEL, 2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3ViZGF0YV9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYXBwLnNjc3MiXSwibmFtZXMiOlsiTGlnaHRlbkRhcmtlbkNvbG9yIiwiYXNzaWduQm94IiwiYXJyYXlfb2Zfb2JqcyIsInBpZV9udW0iLCJzaWRlIiwiZm9yRWFjaCIsIm9iaiIsImkiLCJrZXkiLCJib3giLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZGVjaW1hbHMiLCJTdHJpbmciLCJwZXJjZW50Iiwic3BsaXQiLCJpbnRlZ2VycyIsInNsaWNlZCIsInNsaWNlIiwiaW5uZXJIVE1MIiwiZmluZEFtb3VudCIsImFtb3VudCIsImpvaW4iLCJidWRnZXRDaXJjbGUiLCJ0b3RhbDEiLCJ0b3RhbDIiLCJNYXRoIiwic3FydCIsIm9sZF9jaXJsY2VfMSIsIm9sZF9jaXJsY2VfMiIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImRhdGEiLCJoZWlnaHQiLCJ3aWR0aCIsImNpcmNsZV9jb250YWluZXIiLCJkMyIsInNlbGVjdCIsInN2ZzEiLCJhcHBlbmQiLCJhdHRyIiwic3ZnMiIsInJzY2FsZSIsInNjYWxlTGluZWFyIiwiZG9tYWluIiwibWF4IiwicmFuZ2UiLCJzZWxlY3RBbGwiLCJlbnRlciIsImQiLCJzdWJBcnJheUxvY2F0b3IiLCJ0YXhfdHlwZSIsImNvbnRhaW5lcl9hcnJheSIsImNvbCIsImFtdCIsInVzZVBvdW5kIiwibnVtIiwicGFyc2VJbnQiLCJyIiwiYiIsImciLCJ0b1N0cmluZyIsInBTQkMiLCJwIiwiYzAiLCJjMSIsImwiLCJQIiwiZiIsInQiLCJoIiwibSIsInJvdW5kIiwiYSIsInBTQkNyIiwibiIsImxlbmd0aCIsIngiLCJwYXJzZUZsb2F0IiwidW5kZWZpbmVkIiwiUGllQ2hhcnRHZW5lcmF0b3IiLCJDT0xPUlMiLCJDSVJDTEVfQ09MT1JTIiwiTEFCRUxTIiwic3RhdGUiLCJjc3YiLCJoMSIsInNwYW4iLCJoMiIsIlRPVEFMIiwiVFlQRVMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJyYWRpdXMiLCJjb2xvcnMiLCJzY2FsZU9yZGluYWwiLCJhcmMiLCJvdXRlclJhZGl1cyIsImlubmVyUmFkaXVzIiwicGllIiwidmFsdWUiLCJzdmciLCJ0aGVuIiwic2FsZXNfdGF4ZXMiLCJsaWNlbnNlX3RheGVzIiwiaW5jb21lX3RheGVzIiwib3RoZXJfdGF4ZXMiLCJHZW9fTmFtZSIsIml0ZW0iLCJBTU9VTlQiLCJ0YXhfb2JqIiwiVGF4X1R5cGUiLCJwZXJjZW50X29mX3RvdGFsIiwicHVzaCIsImluY2x1ZGVzIiwidGV4dCIsImZvcm1hdCIsInN0eWxlIiwicGF0aCIsInRyYW5zaXRpb24iLCJlYXNlIiwiZWFzZUxpbmVhciIsImR1cmF0aW9uIiwiYXR0clR3ZWVuIiwicGllVHdlZW4iLCJvbiIsImNvbnNvbGUiLCJsb2ciLCJzcGFuMSIsInNwYW4yIiwiaW5uZXJUZXh0IiwiY2F0Y2giLCJlcnJvciIsImludGVycG9sYXRlIiwic3RhcnRBbmdsZSIsImVuZEFuZ2xlIiwicGllTGVnZW5kIiwibWFzdGVyX2xpc3QiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwibGVmdF9saXN0IiwidGV4dF9saXN0IiwicmlnaHRfbGlzdCIsImxlZnRfYm94IiwidGV4dF9ib3giLCJyaWdodF9ib3giLCJpZCIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyIiwiYXBwZW5kQ2hpbGQiLCJzdWJsaXN0cyIsImxhYmVsIiwibGlzdHMiLCJsZXN0bGlzdCIsInRleHRsaXN0IiwicmlnaHRsaXN0IiwibGVmdEJveCIsInJpZ2h0Qm94IiwibGkiLCJzdWJsaXN0IiwiVE9QX0xFVkVMIiwiU1RBVEVfTkFNRVMiLCJzdGF0ZV9zZWxlY3RvciIsIndyYXBwZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInN0YXRlX2xpc3QiLCJ0b2dnbGUiLCJib2R5IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdGF0ZVNlbGVjdG9yIiwic3RhdGVfbGlzdF9pdGVtIiwic2V0QXR0cmlidXRlIiwic3ViRGF0YSIsImNvbG9yX3N0cmluZyIsImVsZSIsInN1Yl9hcnJheSIsInRheF9zdGFjayIsImtleXMiLCJzdWJfdGF4IiwidG9vbHRpcFdpZHRoIiwidG9vbHRpcEhlaWdodCIsInN0YWNrIiwib3JkZXIiLCJzdGFja09yZGVyTm9uZSIsIm9mZnNldCIsInN0YWNrT2Zmc2V0Tm9uZSIsInRheF9zdGFja19hcnJheSIsImxheWVycyIsInhTY2FsZSIsImRlY3JlbWVudCIsIm5leHRfY29sb3IiLCJ5U2NhbGUiLCJzdW0iLCJPYmplY3QiLCJ2YWx1ZXMiLCJyZWN0IiwibGF5ZXIiLCJiYXIiLCJwb3AiLCJyb290IiwidWwiLCJzZWxlY3RfMSIsInNlbGVjdF8yIiwic2VsZWN0b3JfY29udGFpbmVyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInllYXJTZWxlY3RvciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFn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ZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5cbmV4cG9ydCBjb25zdCBhc3NpZ25Cb3ggPSAoYXJyYXlfb2Zfb2JqcywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQtYm94LScgOiAncmlnaHQtYm94LSdcbiAgICBhcnJheV9vZl9vYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGkgPSA0O1xuICAgICAgICBzd2l0Y2ggKG9iai5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAwIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAxIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMiBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAzIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBpKVxuICAgICAgICBjb25zdCBkZWNpbWFscyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVsxXVxuICAgICAgICBjb25zdCBpbnRlZ2VycyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVswXVxuICAgICAgICBjb25zdCBzbGljZWQgPSBvYmoucGVyY2VudCA/IGludGVnZXJzICsgJy4nICsgZGVjaW1hbHMuc2xpY2UoMCwgMikgOiAwXG4gICAgICAgIGJveC5pbm5lckhUTUwgPSBzbGljZWQgKyAnJSdcbiAgICB9KTtcbn1cblxuLy8gZC5BTU9VTlQgPT09ICdYJyA/IDAgOiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMCxcbmV4cG9ydCBjb25zdCBmaW5kQW1vdW50ID0gKGFtb3VudCkgPT4ge1xuICAgIHJldHVybiBhbW91bnQgPT09ICdYJyA/IDAgOiBhbW91bnQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDBcbn1cblxuLy8gZXhwb3J0IGNvbnN0IHN1YkRhdGFQdXNoZXIgPSAoaXRlbSkgPT4ge1xuLy8gICAgIGlmIChpdGVtICE9IFwiVDAwXCIgJiYgaXRlbSAhPSBcIlQwMVwiKSB7XG4vLyAgICAgICAgIHN3aXRjaCAoaXRlbS5zbGljZSgwLCAyKSkge1xuLy8gICAgICAgICAgICAgY2FzZSAoXCJUMFwiIHx8IFwiVDFcIik6XG4vLyAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh7XG4vLyAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbi8vICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbi8vICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICBcbi8vICAgICAgICAgICAgIGNhc2UgXCJUMlwiOlxuLy8gICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh7XG4gICAgXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1cblxuZXhwb3J0IGNvbnN0IGJ1ZGdldENpcmNsZSA9ICh0b3RhbDEsIHRvdGFsMikgPT4ge1xuICAgIC8vIGJhc2VkIG9uIE1hdHRoZXcgTWNLZW5uYSdzIGV4YW1wbGUgYXQgaHR0cDovL2JsLm9ja3Mub3JnL21wbWNrZW5uYTgvcmF3LzU2NjUwOWRkM2Q5YTA4ZTVmOWIyL1xuICAgIGlmICghdG90YWwxIHx8ICF0b3RhbDIpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRvdGFsMSA9IE1hdGguc3FydCh0b3RhbDEpXG4gICAgdG90YWwyID0gTWF0aC5zcXJ0KHRvdGFsMilcbiAgICAvLyBkZWxldGUgb2xkIGNpcmNsZXNcbiAgICBjb25zdCBvbGRfY2lybGNlXzEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLXN2Zy0xJylcbiAgICBjb25zdCBvbGRfY2lybGNlXzIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLXN2Zy0yJylcbiAgICBvbGRfY2lybGNlXzEgPyBvbGRfY2lybGNlXzEucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGRfY2lybGNlXzEpIDogbnVsbFxuICAgIG9sZF9jaXJsY2VfMiA/IG9sZF9jaXJsY2VfMi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZF9jaXJsY2VfMikgOiBudWxsXG4gICAgXG4gICAgY29uc3QgZGF0YSA9IFt0b3RhbDEsIHRvdGFsMl1cblxuICAgIGNvbnN0IGhlaWdodCA9IDMwMFxuICAgIGNvbnN0IHdpZHRoID0gNTAwXG5cbiAgICBjb25zdCBjaXJjbGVfY29udGFpbmVyID0gZDMuc2VsZWN0KCcjYnVkZ2V0LWNpcmNsZS1jb250YWluZXInKVxuXG4gICAgY29uc3Qgc3ZnMSA9IGNpcmNsZV9jb250YWluZXIuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpLmF0dHIoJ2lkJywgJ2NpcmNsZS1zdmctMScpO1xuXG4gICAgY29uc3Qgc3ZnMiA9IGNpcmNsZV9jb250YWluZXIuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpLmF0dHIoJ2lkJywgJ2NpcmNsZS1zdmctMicpO1xuXG4gICAgY29uc3QgcnNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKFswLCAoZDMubWF4KGRhdGEpKSBdKVxuICAgICAgICAucmFuZ2UoWzEsIDE1MF0pXG5cbiAgICBzdmcxLnNlbGVjdEFsbCgnLmNpcmNsZXMnKS5kYXRhKFt0b3RhbDFdKVxuICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJzY2FsZShkKVxuICAgICAgICB9KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlcycpLmF0dHIoJ2N5JywgaGVpZ2h0IC8gMilcbiAgICAgICAgLmF0dHIoJ2N4JywgKGQsIGkpID0+IHdpZHRoIC8gMilcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnIzBhODBhZScpXG5cbiAgICBzdmcyLnNlbGVjdEFsbCgnLmNpcmNsZXMnKS5kYXRhKFt0b3RhbDJdKVxuICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZXMnKS5hdHRyKCdjeScsIGhlaWdodCAvIDIpXG4gICAgICAgIC5hdHRyKCdjeCcsIChkLCBpKSA9PiB3aWR0aCAvIDIpXG4gICAgICAgIC5hdHRyKCdmaWxsJywgJyMwYTgwYWUnKVxufVxuXG5leHBvcnQgY29uc3Qgc3ViQXJyYXlMb2NhdG9yID0gKHRheF90eXBlLCBjb250YWluZXJfYXJyYXkpID0+IHsgIC8vIGhlbHBlciBmdW5jdGlvbiBmb3IgZmluZGluZyB0aGUgcmlnaHQgc3ViIGFycmF5LiBBIGJpdCBoYXJkLWNvZGVkLlxuICAgIHN3aXRjaCAodGF4X3R5cGUpIHtcbiAgICAgICAgY2FzZSBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVswXVxuICAgICAgICBjYXNlIFwiTGljZW5zZSBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsxXVxuICAgICAgICBjYXNlIFwiSW5jb21lIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzJdXG4gICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVszXVxuICAgIH1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiB3YXMgdGFrZW4gZnJvbSB1c2VyIFBpbXAgVHJpemtpdHMgcG9zdCBvbiBzdGFja292ZXJmbG93IGF0IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU1NjAyNDgvcHJvZ3JhbW1hdGljYWxseS1saWdodGVuLW9yLWRhcmtlbi1hLWhleC1jb2xvci1vci1yZ2ItYW5kLWJsZW5kLWNvbG9yc1xuZXhwb3J0IGZ1bmN0aW9uIExpZ2h0ZW5EYXJrZW5Db2xvcihjb2wsIGFtdCkge1xuICAgIHZhciB1c2VQb3VuZCA9IGZhbHNlO1xuICAgIGlmIChjb2xbMF0gPT0gXCIjXCIpIHtcbiAgICAgICAgY29sID0gY29sLnNsaWNlKDEpO1xuICAgICAgICB1c2VQb3VuZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIG51bSA9IHBhcnNlSW50KGNvbCwgMTYpO1xuXG4gICAgdmFyIHIgPSAobnVtID4+IDE2KSArIGFtdDtcblxuICAgIGlmIChyID4gMjU1KSByID0gMjU1O1xuICAgIGVsc2UgaWYgKHIgPCAwKSByID0gMDtcblxuICAgIHZhciBiID0gKChudW0gPj4gOCkgJiAweDAwRkYpICsgYW10O1xuXG4gICAgaWYgKGIgPiAyNTUpIGIgPSAyNTU7XG4gICAgZWxzZSBpZiAoYiA8IDApIGIgPSAwO1xuXG4gICAgdmFyIGcgPSAobnVtICYgMHgwMDAwRkYpICsgYW10O1xuXG4gICAgaWYgKGcgPiAyNTUpIGcgPSAyNTU7XG4gICAgZWxzZSBpZiAoZyA8IDApIGcgPSAwO1xuXG4gICAgcmV0dXJuICh1c2VQb3VuZCA/IFwiI1wiIDogXCJcIikgKyAoZyB8IChiIDw8IDgpIHwgKHIgPDwgMTYpKS50b1N0cmluZygxNik7XG59XG4vLyBUaGlzIGZ1bmN0aW9uIHdhcyBhbHNvIHRha2VuIGZyb20gdXNlciBQaW1wIFRyaXpraXRzIHBvc3Qgb24gc3RhY2tvdmVyZmxvdyBhdCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTYwMjQ4L3Byb2dyYW1tYXRpY2FsbHktbGlnaHRlbi1vci1kYXJrZW4tYS1oZXgtY29sb3Itb3ItcmdiLWFuZC1ibGVuZC1jb2xvcnNcbmV4cG9ydCBjb25zdCBwU0JDID0gKHAsIGMwLCBjMSwgbCkgPT4ge1xuICAgIGxldCByLCBnLCBiLCBQLCBmLCB0LCBoLCBpID0gcGFyc2VJbnQsIG0gPSBNYXRoLnJvdW5kLCBhID0gdHlwZW9mIChjMSkgPT0gXCJzdHJpbmdcIjtcbiAgICBpZiAodHlwZW9mIChwKSAhPSBcIm51bWJlclwiIHx8IHAgPCAtMSB8fCBwID4gMSB8fCB0eXBlb2YgKGMwKSAhPSBcInN0cmluZ1wiIHx8IChjMFswXSAhPSAncicgJiYgYzBbMF0gIT0gJyMnKSB8fCAoYzEgJiYgIWEpKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIXRoaXMucFNCQ3IpIHRoaXMucFNCQ3IgPSAoZCkgPT4ge1xuICAgICAgICBsZXQgbiA9IGQubGVuZ3RoLCB4ID0ge307XG4gICAgICAgIGlmIChuID4gOSkge1xuICAgICAgICAgICAgW3IsIGcsIGIsIGFdID0gZCA9IGQuc3BsaXQoXCIsXCIpLCBuID0gZC5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobiA8IDMgfHwgbiA+IDQpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgeC5yID0gaShyWzNdID09IFwiYVwiID8gci5zbGljZSg1KSA6IHIuc2xpY2UoNCkpLCB4LmcgPSBpKGcpLCB4LmIgPSBpKGIpLCB4LmEgPSBhID8gcGFyc2VGbG9hdChhKSA6IC0xXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobiA9PSA4IHx8IG4gPT0gNiB8fCBuIDwgNCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAobiA8IDYpIGQgPSBcIiNcIiArIGRbMV0gKyBkWzFdICsgZFsyXSArIGRbMl0gKyBkWzNdICsgZFszXSArIChuID4gNCA/IGRbNF0gKyBkWzRdIDogXCJcIik7XG4gICAgICAgICAgICBkID0gaShkLnNsaWNlKDEpLCAxNik7XG4gICAgICAgICAgICBpZiAobiA9PSA5IHx8IG4gPT0gNSkgeC5yID0gZCA+PiAyNCAmIDI1NSwgeC5nID0gZCA+PiAxNiAmIDI1NSwgeC5iID0gZCA+PiA4ICYgMjU1LCB4LmEgPSBtKChkICYgMjU1KSAvIDAuMjU1KSAvIDEwMDA7XG4gICAgICAgICAgICBlbHNlIHguciA9IGQgPj4gMTYsIHguZyA9IGQgPj4gOCAmIDI1NSwgeC5iID0gZCAmIDI1NSwgeC5hID0gLTFcbiAgICAgICAgfSByZXR1cm4geFxuICAgIH07XG4gICAgaCA9IGMwLmxlbmd0aCA+IDksIGggPSBhID8gYzEubGVuZ3RoID4gOSA/IHRydWUgOiBjMSA9PSBcImNcIiA/ICFoIDogZmFsc2UgOiBoLCBmID0gcFNCQ3IoYzApLCBQID0gcCA8IDAsIHQgPSBjMSAmJiBjMSAhPSBcImNcIiA/IHBTQkNyKGMxKSA6IFAgPyB7IHI6IDAsIGc6IDAsIGI6IDAsIGE6IC0xIH0gOiB7IHI6IDI1NSwgZzogMjU1LCBiOiAyNTUsIGE6IC0xIH0sIHAgPSBQID8gcCAqIC0xIDogcCwgUCA9IDEgLSBwO1xuICAgIGlmICghZiB8fCAhdCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGwpIHIgPSBtKFAgKiBmLnIgKyBwICogdC5yKSwgZyA9IG0oUCAqIGYuZyArIHAgKiB0LmcpLCBiID0gbShQICogZi5iICsgcCAqIHQuYik7XG4gICAgZWxzZSByID0gbSgoUCAqIGYuciAqKiAyICsgcCAqIHQuciAqKiAyKSAqKiAwLjUpLCBnID0gbSgoUCAqIGYuZyAqKiAyICsgcCAqIHQuZyAqKiAyKSAqKiAwLjUpLCBiID0gbSgoUCAqIGYuYiAqKiAyICsgcCAqIHQuYiAqKiAyKSAqKiAwLjUpO1xuICAgIGEgPSBmLmEsIHQgPSB0LmEsIGYgPSBhID49IDAgfHwgdCA+PSAwLCBhID0gZiA/IGEgPCAwID8gdCA6IHQgPCAwID8gYSA6IGEgKiBQICsgdCAqIHAgOiAwO1xuICAgIGlmIChoKSByZXR1cm4gXCJyZ2JcIiArIChmID8gXCJhKFwiIDogXCIoXCIpICsgciArIFwiLFwiICsgZyArIFwiLFwiICsgYiArIChmID8gXCIsXCIgKyBtKGEgKiAxMDAwKSAvIDEwMDAgOiBcIlwiKSArIFwiKVwiO1xuICAgIGVsc2UgcmV0dXJuIFwiI1wiICsgKDQyOTQ5NjcyOTYgKyByICogMTY3NzcyMTYgKyBnICogNjU1MzYgKyBiICogMjU2ICsgKGYgPyBtKGEgKiAyNTUpIDogMCkpLnRvU3RyaW5nKDE2KS5zbGljZSgxLCBmID8gdW5kZWZpbmVkIDogLTIpXG59IiwiLy8gQSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBiYXNlZCBoZWF2aWx5IG9mZiBvZiBLYXJ0aGlrIFRob3RhJ3MgeW91dHViZSB0dXRvcmlhbCBcIkludHJvZHVjdGlvbiB0byBkMy5qcyA9IFBpZSBDaGFydCBhbmQgRG9udXQgQ2hhcnRcIlxuLy8gVGhlIGxlZ2VuZCBjb2RlIHdhcyBmcm9tIENyeXB0ZXJzIEluZm90ZWNoJ3MgeW91dHViZSB0dXRvcmlhbCBcIlBpZSBDaGFydCB1c2luZyBEMy5qc1wiXG5cbmltcG9ydCB7IGFzc2lnbkJveCwgZmluZEFtb3VudCwgYnVkZ2V0Q2lyY2xlIH0gZnJvbSAnLi9oZWxwZXJfZnVuY3Rpb25zJ1xuaW1wb3J0IHsgc3ViRGF0YSB9IGZyb20gJy4vc3ViZGF0YV9nZW5lcmF0b3InXG4vLyBcbmNvbnN0IENPTE9SUyA9IFtcIiNhNjc1MWVcIiwgXCIjOWEwMDQ3XCIsIFwiIzY2YTUxZVwiLCBcIiM3NDcwYjNcIiwgXCIjZTgyYjhhXCJdXG5leHBvcnQgY29uc3QgQ0lSQ0xFX0NPTE9SUyA9IFtDT0xPUlNbMV0sIENPTE9SU1swXSwgQ09MT1JTWzRdLCBDT0xPUlNbMl0sIENPTE9SU1szXV1cbi8vIGV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJPdGhlciBUYXhlc1wiXVxuZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIk90aGVyIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgVGF4ZXNcIl1cbi8vIGV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihjc3ZQYXRoLCBzZWN0b3IsIGFtb3VudCwgc3RhdGUsIG11bHRpcGxpZXIgPSAxLCBza2lwID0gMSkge1xuZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCB0YXhfdHlwZSwgcGllX251bSwgY3N2ID0gXCIuL3NyYy9hc3NldHMvZGF0YS9GWTIwMTgtU1RDLURldGFpbGVkLVRhYmxlLmNzdlwiKSB7XG5cbiAgICAvLyBjb25zdCByZW1vdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvdGFscy1cIiArIHBpZV9udW0pXG4gICAgLy8gcmVtb3ZlID8gcmVtb3ZlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlKSA6IG51bGxcblxuICAgIC8vIGNvbnN0IHJlbW92ZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRldGFpbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZTIgPyByZW1vdmUyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlMikgOiBudWxsXG5cbiAgICBjb25zdCBoMSA9IGQzLnNlbGVjdCgnI3RvdGFscy1oZWFkZXItJyArIHBpZV9udW0pXG4gICAgY29uc3Qgc3BhbiA9IGQzLnNlbGVjdCgnI3RvdGFscy1zcGFuLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IGgyID0gZDMuc2VsZWN0KFwiI2RldGFpbHMtXCIgKyBwaWVfbnVtKVxuXG5cbiAgICBsZXQgVE9UQUwgPSAwO1xuICAgIGxldCBUWVBFUyA9IFtdXG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cblxuXG4gICAgY29uc3QgY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKENPTE9SUyk7XG5cbiAgICAvLyBhcmMgZ2VuZXJhdG9yXG4gICAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDEwKVxuICAgICAgICAvLyAuaW5uZXJSYWRpdXMoMCk7IC8vIGZvciBjaXJjbGVcbiAgICAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDEwMCkgLy8gZm9yIGRvbnV0XG5cbiAgICAvLyBjb25zdCBsYWJsZUFyYyA9IGQzLmFyYygpXG4gICAgLy8gICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSA1MClcbiAgICAvLyAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDUwKTtcblxuICAgIC8vIHBpZSBnZW5lcmF0b3JcbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgICAvLyAuc29ydChudWxsKVxuICAgICAgICAudmFsdWUoZCA9PiBkLmFtb3VudCk7XG5cbiAgICAvLyBkZWZpbmUgc3ZnIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIi5waWUtXCIgKyBwaWVfbnVtKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKVxuXG4gICAgLy8gaW1wb3J0IGRhdGFcbiAgICBkMy5jc3YoY3N2KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgYXJyYXlzIHRoYXQgd2lsbCBjb250YWluIHRoZSBzdWIgbGV2ZWwgdGF4IGRhdGFcbiAgICAgICAgbGV0IHNhbGVzX3RheGVzID0gW11cbiAgICAgICAgbGV0IGxpY2Vuc2VfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgaW5jb21lX3RheGVzID0gW11cbiAgICAgICAgbGV0IG90aGVyX3RheGVzID0gW11cbiAgICAgICAgLy8gbGV0IHNhbGVzX3RheF9vYmogPSB7IHRheF9ncm91cDogTEFCRUxTWzRdIH1cbiAgICAgICAgLy8gcGFyc2UgdGhlIGNzdlxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9IFwiVDAwXCIgJiYgZC5pdGVtICE9IFwiVDAxXCIpIHsgIC8vIGRvbid0IHdhbnQgdG8gY2F0Y2ggVG90YWwgb3IgUHJvcGVydHkgVGF4ZXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRheF9vYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudF9vZl90b3RhbDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkLml0ZW0uc2xpY2UoMCwyKSkgeyAvLyBmaWxsIHVwIHN1YiBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iaikgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzYWxlc190YXhfb2JqW2QuVGF4X1R5cGVdID0gZmluZEFtb3VudChkLkFNT1VOVClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMlwiOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29tZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9ICdUMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUWVBFUy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZC5rZXkgPSBkLlRheF9UeXBlO1xuICAgICAgICAgICAgICAgICAgICBkLmFtb3VudCA9IGZpbmRBbW91bnQoZC5BTU9VTlQpO1xuICAgICAgICAgICAgICAgICAgICBkLnBlcmNlbnQgPSAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWluZXJfYXJyYXkgPSBbXSAgLy8gc2V0dGluZyB1cCBjb250YWluZXIgYXJyYXkgZm9yIHBhc3NpbmcgaW50byBjbGljayBoYW5kbGVyXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuICAgICAgICAvLyBzZXQgaDEgYWZ0ZXIgdG90YWwgaGFzIGJlZW4gZGVmaW5lZFxuICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgXCIpXG4gICAgICAgIHNwYW4udGV4dChcIiRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgaDIudGV4dChcIlwiKVxuICAgICAgICAvLyBhdHRlbXB0IGJ1ZGdldENpcmNsZSBjYWxsXG4gICAgICAgIGJ1ZGdldENpcmNsZShUT1RBTClcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwZXJjZW50YWdlcyBpbiB0aGUgY2VudGVyIGJveFxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgYXJjKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBkID0+IGNvbG9ycyhkLmRhdGEua2V5KSlcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbignZCcsIHBpZVR3ZWVuKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHBhdGgub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIC8vIHdoeSBkb2Vzbid0IHRoaXMgd29yaz9cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gICAgICAgICAgICAgLmR1cmF0aW9uKCc1MCcpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIGRldGVybWluZSBob3cgdG8gZmxpcCB0aGUgcGllc1xuICAgICAgICBpZiAocGllX251bSA9PT0gMikgey8vIGZsaXAgdGhlIHNlY29uZCBwaWVcbiAgICAgICAgICAgIGcuYXR0cihcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVgoLTEpIHRyYW5zbGF0ZSgzMDBweCwgMHB4KSBzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgZy5vbihcIm1vdXNlb3ZlclwiLCAoZCwgaSkgPT4geyAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbignNTAnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgJ3BvaW50ZXInKVxuICAgICAgICB9KVxuICAgICAgICAub24oXCJtb3VzZW91dFwiLCBlbGUgPT4ge1xuICAgICAgICAgICAgLy8gaDEudGV4dChzdGF0ZSArIFwiJ3MgdGF4IHJldmVudWUgZm9yIDIwMTggd2FzICRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgICAgIC8vIGgyLnRleHQoXCJcIilcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljaycsIHN1YkRhdGEoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSlcblxuICAgICAgICBjb25zdCBzcGFuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbHMtc3Bhbi0xJylcbiAgICAgICAgY29uc3Qgc3BhbjIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWxzLXNwYW4tMicpXG5cbiAgICAgICAgaWYgKHNwYW4xLmlubmVyVGV4dFxuICAgICAgICAgICAgJiYgc3BhbjIuaW5uZXJUZXh0KSB7XG4gICAgICAgICAgICBjb25zdCB0b3RhbDEgPSBwYXJzZUludChzcGFuMS5pbm5lclRleHQuc2xpY2UoMSkuc3BsaXQoJywnKS5qb2luKCcnKSlcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsMiA9IHBhcnNlSW50KHNwYW4yLmlubmVyVGV4dC5zbGljZSgxKS5zcGxpdCgnLCcpLmpvaW4oJycpKVxuICAgICAgICAgICAgYnVkZ2V0Q2lyY2xlKHRvdGFsMSwgdG90YWwyKVxuICAgICAgICB9ICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHsgaWYgKGVycm9yKSB0aHJvdyBlcnJvciB9KVxuICAgIFxuICAgIGNvbnN0IHBpZVR3ZWVuID0gYiA9PiB7XG4gICAgICAgIGIuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZTogMCB9LCBiKVxuICAgICAgICByZXR1cm4gKHQpID0+IHsgcmV0dXJuIGFyYyhpKHQpKSB9XG4gICAgfSAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgICIsImltcG9ydCB7IENJUkNMRV9DT0xPUlMsIExBQkVMU30gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgcGllTGVnZW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IG1hc3Rlcl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgbWFzdGVyX2xpc3QuY2xhc3NMaXN0LmFkZCgnbWFzdGVyLWxpc3QnKVxuXG4gICAgY29uc3QgbGVmdF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHRleHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCByaWdodF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgbGVmdF9saXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnQtbGlzdCcpICBcbiAgICB0ZXh0X2xpc3QuY2xhc3NMaXN0LmFkZCgndGV4dC1saXN0JykgIFxuICAgIHJpZ2h0X2xpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHQtbGlzdCcpIFxuXG4gICAgZm9yIChsZXQgaSA9IExBQkVMUy5sZW5ndGggLSAxIDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxlZnRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCB0ZXh0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgcmlnaHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIGxlZnRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdsZWZ0LWJveCcpXG4gICAgICAgIGxlZnRfYm94LmlkID0gKCdsZWZ0LWJveC0nICsgaSlcbiAgICAgICAgbGVmdF9ib3guc3R5bGUuY29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgcmlnaHRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdyaWdodC1ib3gnKVxuICAgICAgICByaWdodF9ib3guaWQgPSAoJ3JpZ2h0LWJveC0nICsgaSlcbiAgICAgICAgcmlnaHRfYm94LnN0eWxlLmNvbG9yID0gQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIHRleHRfYm94LmNsYXNzTGlzdC5hZGQoJ3RleHQtYm94JylcbiAgICAgICAgdGV4dF9ib3guaW5uZXJIVE1MID0gTEFCRUxTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgXCIgKyBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgbGVmdF9saXN0LmFwcGVuZENoaWxkKGxlZnRfYm94KVxuICAgICAgICB0ZXh0X2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9ib3gpXG4gICAgICAgIHJpZ2h0X2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfYm94KVxuICAgIH1cblxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKGxlZnRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfbGlzdClcbiAgICByZXR1cm4gbWFzdGVyX2xpc3Rcbn1cblxuY29uc3Qgc3VibGlzdHMgPSAobGFiZWwsIGNvbG9yKSA9PiB7XG4gICAgY29uc3QgbGlzdHMgPSBbXVxuXG5cbiAgICBsZXN0bGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0bGlzdCcpXG4gICAgdGV4dGxpc3QuY2xhc3NMaXN0LmFkZCgndGV4dGxpc3QnKVxuICAgIHJpZ2h0bGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodGxpc3QnKVxuXG4gICAgY29uc3QgbGVmdEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCByaWdodEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG5cbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsZWZ0Qm94KVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGkpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChyaWdodEJveClcbiAgICByZXR1cm4gc3VibGlzdFxufSIsImltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgVE9QX0xFVkVMID0gWydUMDAnLCAnVDAxJywgJ1RBMScsICdUQTMnLCAnVEE0JywgJ1RBNSddXG5jb25zdCBTVEFURV9OQU1FUyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggQ2Fyb2xpbmEnLCAnTm9ydGggRGFrb3RhJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ11cblxuLy8gZXhwb3J0IGNvbnN0IHNlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcblxuLy8gICAgIC8vIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpICAvLyByZXZpc2l0IGlmIHRpbWUgdG8gbWFrZSBjdXN0b20gc2VsZWN0XG4vLyAgICAgLy8gY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luaXRpYWwtY29udGFpbmVyJylcblxuLy8gICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIilcbi8vICAgICBzZWxlY3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuXG4vLyAgICAgY29uc3Qgc3RhdGVTZWxlY3RvciA9IGUgPT4ge1xuLy8gICAgICAgICBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4vLyAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbi8vICAgICAgICAgc3ZnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3ZnKVxuLy8gICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgVE9QX0xFVkVMLCBwaWVfbnVtKVxuXG4vLyAgICAgICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gXCItbGVmdFwiIDogXCItcmlnaHRcIlxuLy8gICAgICAgICAvLyBjb25zdCBoMiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzdGF0ZVwiICsgc2lkZSlbMF1cbi8vICAgICAgICAgLy8gaDIuaW5uZXJIVE1MID0gc3RhdGVcbi8vICAgICB9XG5cbi8vICAgICBTVEFURV9OQU1FUy5mb3JFYWNoKHN0YXRlID0+IHtcbi8vICAgICAgICAgY29uc3QgZGVmYXVsdF9zdGF0ZSA9IHBpZV9udW0gPT09IDEgPyBTVEFURV9OQU1FU1swXSA6IFNUQVRFX05BTUVTW1NUQVRFX05BTUVTLmxlbmd0aCAtIDFdXG4vLyAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcbi8vICAgICAgICAgaWYgKHN0YXRlID09PSBkZWZhdWx0X3N0YXRlKSB7XG4vLyAgICAgICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgdHJ1ZSlcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBvcHRpb24uaW5uZXJIVE1MID0gc3RhdGVcbi8vICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHN0YXRlKVxuLy8gICAgICAgICAvLyBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuLy8gICAgICAgICAvLyBvcHRpb24uc2V0QXR0cmlidXRlKFwib25jbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbi8vICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbilcbi8vICAgICB9KVxuLy8gICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHN0YXRlU2VsZWN0b3IpXG4vLyAgICAgLy8gY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdClcbi8vICAgICAvLyByZXR1cm4gY29udGFpbmVyXG4vLyAgICAgcmV0dXJuIHNlbGVjdFxuLy8gfVxuXG4vLyBjb25zdCBwaGFzZU91dCA9IChub2RlKSA9PiB7XG5cbi8vICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbi8vIH1cblxuZXhwb3J0IGNvbnN0IHN0YXRlX3NlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcbiBcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcInNlbGVjdC13cmFwcGVyLVwiICsgcGllX251bSlcbiAgICB3cmFwcGVyLmlkID0gXCJzZWxlY3Qtd3JhcHBlci1cIiArIHBpZV9udW1cblxuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgc2VsZWN0LmlubmVySFRNTCA9IHBpZV9udW0gPT09IDEgPyAnQWxhYmFtYScgOiAnV3lvbWluZydcbiAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwic2VsZWN0LVwiICsgcGllX251bSlcbiAgICBzZWxlY3QuaWQgPSBcInNlbGVjdC1cIiArIHBpZV9udW1cblxuICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgfSlcbiAgICBcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSAgLy8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHNvIHRoYXQgaWYgSSBjbGljayBhbnl3aGVyZSBlbHNlIHRoZSBsaXN0IGRpc2FwcGVhcnNcbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICB9KVxuICAgIFxuICAgIGNvbnN0IHN0YXRlU2VsZWN0b3IgPSBzdGF0ZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdC1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzZWxlY3QuaW5uZXJUZXh0ID0gc3RhdGVcbiAgICAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIHN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZylcbiAgICAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RhdGVfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ3N0YXRlLWxpc3QtJyArIHBpZV9udW0pXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIHN0YXRlX2xpc3QuaWQgPSAnc3RhdGUtbGlzdC0nICsgcGllX251bVxuICAgIFxuICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZV9saXN0X2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmlubmVySFRNTCA9IHN0YXRlXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzdGF0ZSlcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbiAgICAgICAgc3RhdGVfbGlzdC5hcHBlbmRDaGlsZChzdGF0ZV9saXN0X2l0ZW0pXG4gICAgfSlcbiAgICBcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNlbGVjdClcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHN0YXRlX2xpc3QpXG4gICAgXG4gICAgcmV0dXJuIHdyYXBwZXJcbn1cblxuLy8gY29uc3QgcGhhc2VPdXQgPSAobm9kZSkgPT4ge1xuXG4vLyAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4vLyB9IiwiaW1wb3J0IHsgc3ViQXJyYXlMb2NhdG9yLCBMaWdodGVuRGFya2VuQ29sb3IgfSBmcm9tICcuL2hlbHBlcl9mdW5jdGlvbnMnXG5cbmV4cG9ydCBjb25zdCBzdWJEYXRhID0gKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSwgY29sb3Jfc3RyaW5nID0gXCIjM0Y2RDJBXCIpID0+IHtcbiAgICAvLyBhIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGxlYXJuZWQgZnJvbSBNaWNoYWVsIFN0YW5hbGFuZCdzIFwiU3RhY2tlZCBiYXIgY2hhcnQgd2l0aCB0b29sdGlwc1wiIHR1dG9yaWFsIGF0IGh0dHA6Ly9ibC5vY2tzLm9yZy9tc3RhbmFsYW5kLzYxMDA3MTNcbiAgICByZXR1cm4gKGVsZSkgPT4ge1xuICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICBjb25zdCB0YXhfdHlwZSA9IGVsZS5kYXRhLmtleVxuXG4gICAgICAgIGNvbnN0IHN1Yl9hcnJheSA9IHN1YkFycmF5TG9jYXRvcih0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KVxuXG4gICAgICAgIC8vIHNldHRpbmcgdXAgdGhlIHRheCBzdGFjayB0byBjb21wbHkgd2l0aCBkMyB2NVxuICAgICAgICBsZXQgdGF4X3N0YWNrID0ge1xuICAgICAgICAgICAgLy8gdGF4X3R5cGU6IHRheF90eXBlLFxuICAgICAgICB9XG4gICAgICAgIC8vIHNldHRpbmcgdXAga2V5c1xuICAgICAgICBsZXQga2V5cyA9IFtdXG4gICAgICAgIC8vIGtleXMucHVzaCh0YXhfdHlwZSlcbiAgICAgICAgc3ViX2FycmF5LmZvckVhY2goKHN1Yl90YXgsIGkpID0+IHtcbiAgICAgICAgICAgIGtleXMucHVzaChzdWJfdGF4LmtleSlcbiAgICAgICAgICAgIHRheF9zdGFja1tzdWJfdGF4LmtleV0gPSBzdWJfdGF4LnBlcmNlbnRfb2ZfdG90YWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSA5MCAgLy8gc2V0dGluZyB0aGUgZGltZW5zaW9ucyB0byBjb3JyZXNwb25kIHRvIHRoZSBwaWUgY2hhcnRzJ1xuICAgICAgICBjb25zdCBoZWlnaHQgPSA2MDBcblxuICAgICAgICBjb25zdCB0b29sdGlwV2lkdGggPSAxMjAgLy8gd2lsbCBhbHRlciB0aGVzZSBhcyBuZWVkZWRcbiAgICAgICAgY29uc3QgdG9vbHRpcEhlaWdodCA9IDQwXG5cbiAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwicGllLVwiICsgcGllX251bSkuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKS5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJnXCIpLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLScgKyBwaWVfbnVtKVxuXG4gICAgICAgIC8vIHNldCB0aGUgbGF5ZXJzIG9mIHRoZSBzdGFja2VkIGJhclxuICAgICAgICAvLyBjb25zdCBsYXllcnMgPSBkMy5zdGFjaygpKFt0YXhfdHlwZV0ubWFwKHRheCA9PiB7ICAvLyBzaG91bGQgdWx0aW1hdGVseSBqdXN0IGJlIHRoZSBvbmUgbGF5ZXJcbiAgICAgICAgLy8gICAgIHJldHVybiBzdWJfYXJyYXkubWFwKGQgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB7IHg6IGQua2V5LCB5OiBkLmFtb3VudCwgcGVyY2VudDogZC5wZXJjZW50IH1cbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIH0pKVxuICAgICAgICBjb25zdCBzdGFjayA9IGQzLnN0YWNrKClcbiAgICAgICAgICAgIC5rZXlzKGtleXMpXG4gICAgICAgICAgICAub3JkZXIoZDMuc3RhY2tPcmRlck5vbmUpXG4gICAgICAgICAgICAub2Zmc2V0KGQzLnN0YWNrT2Zmc2V0Tm9uZSlcbiAgICAgICAgbGV0IHRheF9zdGFja19hcnJheSA9IFtdXG4gICAgICAgIHRheF9zdGFja19hcnJheS5wdXNoKHRheF9zdGFjaylcbiAgICAgICAgY29uc3QgbGF5ZXJzID0gc3RhY2sodGF4X3N0YWNrX2FycmF5KVxuXG4gICAgICAgIC8vIGNvbnN0IHggPSBkMy5zY2FsZU9yZGluYWwoKVxuICAgICAgICAvLyAgICAgLmRvbWFpbihsYXllcnNbMF0ubWFwKGQgPT4gZC54KSlcbiAgICAgICAgLy8gICAgIC8vIC5yYW5nZShbMTAsIHdpZHRoXSwgMCkgIC8vIG1heSBiZSBhIHF1aWNrZXIgd2F5IHRvIGRvIHRoaXMgYXMgdGhlcmUgaXMgb25seSBvbmUgYmFyXG4gICAgICAgIC8vICAgICAucmFuZ2UoW3dpZHRoXSlcbiAgICAgICAgY29uc3QgeFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbMCwgMV0pXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcblxuICAgICAgICAvLyBjb25zdCBjb2xvcnMgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC8vICAgICAuZG9tYWluKFsxLCAxMF0pXG4gICAgICAgIC8vICAgICAucmFuZ2UoW1wicmVkXCIsIFwiYmx1ZVwiXSlcblxuICAgICAgICBjb25zdCBjb2xvcnMgPSBbY29sb3Jfc3RyaW5nXVxuICAgICAgICBjb25zdCBkZWNyZW1lbnQgPSAxMDAgLyBrZXlzLmxlbmd0aFxuICAgICAgICBsZXQgbmV4dF9jb2xvciA9IExpZ2h0ZW5EYXJrZW5Db2xvcihjb2xvcl9zdHJpbmcsIGRlY3JlbWVudClcbiAgICAgICAgd2hpbGUgKGNvbG9ycy5sZW5ndGggPCBrZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29sb3JzLnB1c2gobmV4dF9jb2xvcilcbiAgICAgICAgICAgIG5leHRfY29sb3IgPSBMaWdodGVuRGFya2VuQ29sb3IobmV4dF9jb2xvciwgZGVjcmVtZW50KVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coY29sb3JzKVxuXG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIGQzLnN1bShPYmplY3QudmFsdWVzKHRheF9zdGFjaykpXSkgIC8vIHRoZSBpbmNyZW1lbnQgdXAgdG8gdGhlIHRvdGFsXG4gICAgICAgICAgICAvLyAucmFuZ2UoW2hlaWdodCwgMF0pXG4gICAgICAgICAgICAucmFuZ2UoWzAsIGhlaWdodF0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuc3ViLXRheGVzXCIpICAvLyBubyBnIGF0IHRoaXMgcG9pbnQsIGJ1dCB0aGV5IHdpbGwgaGF2ZSB0aGlzIGNsYXNzXG4gICAgICAgICAgICAuZGF0YShsYXllcnMpLmVudGVyKCkgIC8vIG5vdyB0aGVyZSB3aWxsIGJlIGEgZyBmb3IgZXZlcnkgYmFyIHdpdGhpbiB0aGUgZ3JhcGguXG4gICAgICAgICAgICAuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgXCJzdWItdGF4ZXNcIilcbiAgICAgICAgLy8gLmF0dHIoJ2ZpbGwnLCBkID0+IHtcbiAgICAgICAgLy8gICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgIC8vICAgICByZXR1cm4gY29sb3JzKGQpfSlcblxuICAgICAgICBjb25zdCByZWN0ID0gZy5zZWxlY3RBbGwoXCJyZWN0XCIpICAvLyBtYWtpbmcgZWFjaCBvYmogb2YgdGhlIGNvcnJlc3BvbmQgdG8gYSByZWN0IHdpdGhpbiB0aGUgZ1xuICAgICAgICAgICAgLmRhdGEobGF5ZXIgPT4gbGF5ZXIpIC8vIHB1bGxpbmcgb3V0IGVhY2ggaW5kaXZpZHVhbCBvYmpcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB4U2NhbGUoMCkpICAvLyBwYXNzaW5nIGVhY2ggb2JqJ3MgeCB2YWx1ZSB0byB0aGUgZDMgeCBmdW5jdGlvbiBkZWZpbmVkIGFib3ZlXG4gICAgICAgICAgICAuYXR0cigneScsIGxheWVyID0+IHtcbiAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHQgLSB5U2NhbGUobGF5ZXJbMV0pXG4gICAgICAgICAgICB9KSAgLy8geTAgaXMgdGhlIGhlaWdodCB3aGVyZSBlYWNoIHNlZ21lbnQgaW4gdGhlIHN0YWNrIHN0YXJ0c1xuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgeFNjYWxlKDEpKSAgLy8gcHJvYmFibHkgY2FuIGhhcmQgY29kZSwgc2luY2Ugb25seSBvbmUgYmFyXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgYmFyID0+IHtcbiAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAgICAgICAgIHJldHVybiB5U2NhbGUoYmFyWzFdIC0gYmFyWzBdKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sb3JzLnBvcCgpXG4gICAgICAgICAgICB9KSAgLy8gaGVpZ2h0IGlzIHNldCB0byB0aGUgc3RhcnRpbmcgcG9pbnQgcGx1cyB0aGUgaGVpZ2h0LCBhbmQgYWxsIHRoYXQgc3VidHJhY3RlZCBmcm9tIHRoZSBzdGFydGluZyBwb2ludCBkdWUgdG8geSB2YWx1ZXMgYmVnaW5pbmcgYXQgdG9wIG9mIHNjcmVlblxuICAgICAgICAvLyAgICAgLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB0b29sdGlwLnN0eWxlKFwiZGlzcGxheVwiLCB0cnVlKSkgIC8vIHdhbnQgdGhlIGluZm8gYm94IHRvIHN3aXRjaCBiZXR3ZWVuIHZpc2libGUgYW5kIGluaXZpcyBiYXNlZCBvbiBtb3VzZW92ZXJcbiAgICAgICAgLy8gICAgIC5vbignbW91c2VvdXQnLCAoKSA9PiB0b29sdGlwLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIikpXG4gICAgICAgIC8vICAgICAub24oJ21vdXNlbW92ZScsIGQgPT4geyAgLy8gdGhpcyBpcyBnb2luZyB0byBiZSBhIHN3ZWV0IGVmZmVjdCFcbiAgICAgICAgLy8gICAgICAgICBjb25zdCB4UG9zID0gZDMubW91c2UodGhpcylbMF0gLSAodG9vbHRpcFdpZHRoIC8gMikgLy8gdGhpc1swXSBjb3JyZXNwb25kcyB0byBtb3VzZSdzIHggcG9zLCBhbmQgcHVzaGluZyBpdCBsZWZ0IGJ5IGhhbGYgb2YgdGhlIHRvb2x0aXAncyB3aWR0aCBlbnN1cmUgaXQgaXMgY2VudGVyZWRcbiAgICAgICAgLy8gICAgICAgICBjb25zdCB5UG9zID0gZDMubW91c2UodGhpcylbMV0gLSAyNSAvLyBwdXRzIHRoZSB0b29sdGlwIHVwIGEgYml0IGFib3ZlIHRoZSBjdXJzb3JcbiAgICAgICAgLy8gICAgICAgICB0b29sdGlwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB4UG9zICsgJywnICsgeVBvcyArICcpJylcbiAgICAgICAgLy8gICAgICAgICB0b29sdGlwLnNlbGVjdCgndGV4dCcpLnRleHQoZC5wZXJjZW50X29mX3RvdGFsKSAvLyBzaG93cyB0aGUgcGVyY2VudCAgXG4gICAgICAgIC8vICAgICB9KVxuXG4gICAgICAgIC8vIGNvbnN0IHRvb2x0aXAgPSBzdmcuYXBwZW5kKCdnJykgLy8gc2V0dGluZyB1cCB0aGlzIHN3ZWV0IHRvb2x0aXAuIEV4Y2l0aW5nIVxuICAgICAgICAvLyAgICAgLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLXRvb2x0aXAgdG9vbHRpcCcpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKSAvLyBzdGFydHMgaW52aXNpYmxlXG4gICAgICAgIC8vICAgICAvLyBhZGRpbmcgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIGJveFxuICAgICAgICAvLyAgICAgLmFwcGVuZCgncmVjdCcpLmF0dHIoJ3dpZHRoJywgdG9vbHRpcFdpZHRoKVxuICAgICAgICAvLyAgICAgLmF0dHIoJ2hlaWdodCcsIHRvb2x0aXBIZWlnaHQpLmF0dHIoJ2ZpbGwnLCAnd2hpdGUnKS5zdHlsZSgnb3BhY2l0eScsIDAuNSkgLy8gbWFraW5nIGl0IHBhcnRpYWxseSBzZWUtdGhyb3VnaFxuICAgICAgICAvLyAgICAgLy8gYWRkaW5nIHRoZSB0ZXh0IGNvbnRlbnRcbiAgICAgICAgLy8gICAgIC5hcHBlbmQoJ3RleHQnKS5hdHRyKCd4JywgMTUpXG4gICAgICAgIC8vICAgICAuYXR0cignZHknLCAnLjhlbScpLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgIH1cblxufVxuXG4iLCJcbmltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3InXG5pbXBvcnQgeyBwaWVMZWdlbmQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2xlZ2VuZCdcbmltcG9ydCB7IHN0YXRlX3NlbGVjdG9yLCBUT1BfTEVWRUwgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3InXG5pbXBvcnQgeyBidWRnZXRDaXJjbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucydcbmltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBcbiAgICAvLyBQQ0cgLT4gY3N2UGF0aCwgc2VjdG9yLCBhbW91dCwgbG9jYXRpb24sIG11bHRpcGxpZXIsIHNraXBcbiAgICBcbiAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpXG4gICAgLy8gY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHVsID0gcGllTGVnZW5kKClcbiAgICBjb25zdCBzZWxlY3RfMSA9IHN0YXRlX3NlbGVjdG9yKDEpXG4gICAgY29uc3Qgc2VsZWN0XzIgPSBzdGF0ZV9zZWxlY3RvcigyKVxuICAgIGNvbnN0IHNlbGVjdG9yX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3Rvci1jb250YWluZXJcIilbMF1cbiAgICBcbiAgICBjb25zdCB5ZWFyU2VsZWN0b3IgPSB5ZWFyU2VsZWN0b3JcblxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMSlcbiAgICBzZWxlY3Rvcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0XzIpXG4gICAgcm9vdC5hcHBlbmRDaGlsZCh1bClcblxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKFwiQWxhYmFtYVwiLCBUT1BfTEVWRUwsIDEpXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJXeW9taW5nXCIsIFRPUF9MRVZFTCwgMilcblxuICAgIFxufSlcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=