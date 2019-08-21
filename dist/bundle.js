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
exports.pSBC = exports.subArrayLocator = exports.budgetCircle = exports.findAmount = exports.assignBox = undefined;

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

var _subdata_generator = __webpack_require__(/*! ./subdata_generator */ "./src/components/subdata_generator.js");

// 
// A lot of this code was based heavily off of Karthik Thota's youtube tutorial "Introduction to d3.js = Pie Chart and Donut Chart"
// The legend code was from Crypters Infotech's youtube tutorial "Pie Chart using D3.js"

var COLORS = exports.COLORS = ["#a6751e", "#9a0047", "#66a51e", "#7470b3", "#e82b8a"];
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
        var property_taxes = [];
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
                            debugger;
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
        console.log(pie_num);
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

var _pie_chart_generator = __webpack_require__(/*! ./pie_chart_generator */ "./src/components/pie_chart_generator.js");

var subData = exports.subData = function subData(container_array, pie_num) {
    var color_string = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#3F6D2A";

    // a lot of this code was learned from Michael Stanaland's "Stacked bar chart with tooltips" tutorial at http://bl.ocks.org/mstanaland/6100713
    return function (ele) {
        debugger;

        var tax_type = ele.data.key;
        color_string = colorChooser(tax_type);
        var sub_array = (0, _helper_functions.subArrayLocator)(tax_type, container_array);

        var tax_stack = {};
        // setting up keys
        var keys = [];
        // keys.push(tax_type)
        sub_array.forEach(function (sub_tax, i) {
            keys.push(sub_tax.key);
            tax_stack[sub_tax.key] = sub_tax.percent_of_total;
        });

        var width = 90; // setting the dimensions to correspond to the pie charts'
        var height = 500;

        var tooltipWidth = 120; // will alter these as needed
        var tooltipHeight = 40;

        var svg = d3.select("#sub-data-" + pie_num).append("svg").attr("width", width).attr("height", height).append("g").attr('class', 'sub-data-' + pie_num);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3ViZGF0YV9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYXBwLnNjc3MiXSwibmFtZXMiOlsiTGlnaHRlbkRhcmtlbkNvbG9yIiwiYXNzaWduQm94IiwiYXJyYXlfb2Zfb2JqcyIsInBpZV9udW0iLCJzaWRlIiwiZm9yRWFjaCIsIm9iaiIsImkiLCJrZXkiLCJib3giLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZGVjaW1hbHMiLCJTdHJpbmciLCJwZXJjZW50Iiwic3BsaXQiLCJpbnRlZ2VycyIsInNsaWNlZCIsInNsaWNlIiwiaW5uZXJIVE1MIiwiZmluZEFtb3VudCIsImFtb3VudCIsImpvaW4iLCJidWRnZXRDaXJjbGUiLCJ0b3RhbDEiLCJ0b3RhbDIiLCJNYXRoIiwic3FydCIsIm9sZF9jaXJsY2VfMSIsIm9sZF9jaXJsY2VfMiIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImRhdGEiLCJoZWlnaHQiLCJ3aWR0aCIsImNpcmNsZV9jb250YWluZXIiLCJkMyIsInNlbGVjdCIsInN2ZzEiLCJhcHBlbmQiLCJhdHRyIiwic3ZnMiIsInJzY2FsZSIsInNjYWxlTGluZWFyIiwiZG9tYWluIiwibWF4IiwicmFuZ2UiLCJzZWxlY3RBbGwiLCJlbnRlciIsImQiLCJzdWJBcnJheUxvY2F0b3IiLCJ0YXhfdHlwZSIsImNvbnRhaW5lcl9hcnJheSIsImNvbCIsImFtdCIsInVzZVBvdW5kIiwibnVtIiwicGFyc2VJbnQiLCJyIiwiYiIsImciLCJ0b1N0cmluZyIsInBTQkMiLCJwIiwiYzAiLCJjMSIsImwiLCJQIiwiZiIsInQiLCJoIiwibSIsInJvdW5kIiwiYSIsInBTQkNyIiwibiIsImxlbmd0aCIsIngiLCJwYXJzZUZsb2F0IiwidW5kZWZpbmVkIiwiUGllQ2hhcnRHZW5lcmF0b3IiLCJDT0xPUlMiLCJDSVJDTEVfQ09MT1JTIiwiTEFCRUxTIiwic3RhdGUiLCJjc3YiLCJoMSIsInNwYW4iLCJoMiIsIlRPVEFMIiwiVFlQRVMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJyYWRpdXMiLCJjb2xvcnMiLCJzY2FsZU9yZGluYWwiLCJhcmMiLCJvdXRlclJhZGl1cyIsImlubmVyUmFkaXVzIiwicGllIiwidmFsdWUiLCJzdmciLCJ0aGVuIiwic2FsZXNfdGF4ZXMiLCJsaWNlbnNlX3RheGVzIiwiaW5jb21lX3RheGVzIiwib3RoZXJfdGF4ZXMiLCJwcm9wZXJ0eV90YXhlcyIsIkdlb19OYW1lIiwiaXRlbSIsIkFNT1VOVCIsInRheF9vYmoiLCJUYXhfVHlwZSIsInBlcmNlbnRfb2ZfdG90YWwiLCJwdXNoIiwiaW5jbHVkZXMiLCJ0ZXh0IiwiZm9ybWF0Iiwic3R5bGUiLCJwYXRoIiwidHJhbnNpdGlvbiIsImVhc2UiLCJlYXNlTGluZWFyIiwiZHVyYXRpb24iLCJhdHRyVHdlZW4iLCJwaWVUd2VlbiIsIm9uIiwiY29uc29sZSIsImxvZyIsInNwYW4xIiwic3BhbjIiLCJpbm5lclRleHQiLCJjYXRjaCIsImVycm9yIiwiaW50ZXJwb2xhdGUiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJwaWVMZWdlbmQiLCJtYXN0ZXJfbGlzdCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJsZWZ0X2xpc3QiLCJ0ZXh0X2xpc3QiLCJyaWdodF9saXN0IiwibGVmdF9ib3giLCJ0ZXh0X2JveCIsInJpZ2h0X2JveCIsImlkIiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXIiLCJhcHBlbmRDaGlsZCIsInN1Ymxpc3RzIiwibGFiZWwiLCJsaXN0cyIsImxlc3RsaXN0IiwidGV4dGxpc3QiLCJyaWdodGxpc3QiLCJsZWZ0Qm94IiwicmlnaHRCb3giLCJsaSIsInN1Ymxpc3QiLCJUT1BfTEVWRUwiLCJTVEFURV9OQU1FUyIsInN0YXRlX3NlbGVjdG9yIiwid3JhcHBlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwic3RhdGVfbGlzdCIsInRvZ2dsZSIsImJvZHkiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0YXRlU2VsZWN0b3IiLCJzdGF0ZV9saXN0X2l0ZW0iLCJzZXRBdHRyaWJ1dGUiLCJzdWJEYXRhIiwiY29sb3Jfc3RyaW5nIiwiZWxlIiwiY29sb3JDaG9vc2VyIiwic3ViX2FycmF5IiwidGF4X3N0YWNrIiwia2V5cyIsInN1Yl90YXgiLCJ0b29sdGlwV2lkdGgiLCJ0b29sdGlwSGVpZ2h0Iiwic3RhY2siLCJvcmRlciIsInN0YWNrT3JkZXJOb25lIiwib2Zmc2V0Iiwic3RhY2tPZmZzZXROb25lIiwidGF4X3N0YWNrX2FycmF5IiwibGF5ZXJzIiwieFNjYWxlIiwiZGVjcmVtZW50IiwibmV4dF9jb2xvciIsInlTY2FsZSIsInN1bSIsIk9iamVjdCIsInZhbHVlcyIsInJlY3QiLCJsYXllciIsImJhciIsInBvcCIsInJvb3QiLCJ1bCIsInNlbGVjdF8xIiwic2VsZWN0XzIiLCJzZWxlY3Rvcl9jb250YWluZXIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwieWVhclNlbGVjdG9yIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7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Qzs7Ozs7Ozs7Ozs7Ozs7QUN2SEE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUF4RSxTQUFTZ0ssZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07O0FBRWhEOztBQUVBLFFBQU1zQyxPQUFPdE0sU0FBU0MsY0FBVCxDQUF3QixNQUF4QixDQUFiO0FBQ0E7QUFDQSxRQUFNc00sS0FBSyw0QkFBWDtBQUNBLFFBQU1DLFdBQVcsb0NBQWUsQ0FBZixDQUFqQjtBQUNBLFFBQU1DLFdBQVcsb0NBQWUsQ0FBZixDQUFqQjtBQUNBLFFBQU1DLHFCQUFxQjFNLFNBQVMyTSxzQkFBVCxDQUFnQyxvQkFBaEMsRUFBc0QsQ0FBdEQsQ0FBM0I7O0FBRUEsUUFBTUMsZUFBZUEsWUFBckI7O0FBRUFGLHVCQUFtQnpELFdBQW5CLENBQStCdUQsUUFBL0I7QUFDQUUsdUJBQW1CekQsV0FBbkIsQ0FBK0J3RCxRQUEvQjtBQUNBSCxTQUFLckQsV0FBTCxDQUFpQnNELEVBQWpCOztBQUVBLGdEQUFrQixTQUFsQixFQUE2QjNDLHlCQUE3QixFQUF3QyxDQUF4QztBQUNBLGdEQUFrQixTQUFsQixFQUE2QkEseUJBQTdCLEVBQXdDLENBQXhDO0FBR0gsQ0FyQkQsRTs7Ozs7Ozs7Ozs7QUNQQSx1QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCB7IENJUkNMRV9DT0xPUlMgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBhc3NpZ25Cb3ggPSAoYXJyYXlfb2Zfb2JqcywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQtYm94LScgOiAncmlnaHQtYm94LSdcbiAgICBhcnJheV9vZl9vYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGkgPSA0O1xuICAgICAgICBzd2l0Y2ggKG9iai5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAwIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAxIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMiBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAzIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBpKVxuICAgICAgICBjb25zdCBkZWNpbWFscyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVsxXVxuICAgICAgICBjb25zdCBpbnRlZ2VycyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVswXVxuICAgICAgICBjb25zdCBzbGljZWQgPSBvYmoucGVyY2VudCA/IGludGVnZXJzICsgJy4nICsgZGVjaW1hbHMuc2xpY2UoMCwgMikgOiAwXG4gICAgICAgIGJveC5pbm5lckhUTUwgPSBzbGljZWQgKyAnJSdcbiAgICB9KTtcbn1cblxuLy8gZC5BTU9VTlQgPT09ICdYJyA/IDAgOiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMCxcbmV4cG9ydCBjb25zdCBmaW5kQW1vdW50ID0gKGFtb3VudCkgPT4ge1xuICAgIHJldHVybiBhbW91bnQgPT09ICdYJyA/IDAgOiBhbW91bnQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDBcbn1cblxuLy8gZXhwb3J0IGNvbnN0IHN1YkRhdGFQdXNoZXIgPSAoaXRlbSkgPT4ge1xuLy8gICAgIGlmIChpdGVtICE9IFwiVDAwXCIgJiYgaXRlbSAhPSBcIlQwMVwiKSB7XG4vLyAgICAgICAgIHN3aXRjaCAoaXRlbS5zbGljZSgwLCAyKSkge1xuLy8gICAgICAgICAgICAgY2FzZSAoXCJUMFwiIHx8IFwiVDFcIik6XG4vLyAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh7XG4vLyAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbi8vICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbi8vICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICBcbi8vICAgICAgICAgICAgIGNhc2UgXCJUMlwiOlxuLy8gICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh7XG4gICAgXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1cblxuZXhwb3J0IGNvbnN0IGJ1ZGdldENpcmNsZSA9ICh0b3RhbDEsIHRvdGFsMikgPT4ge1xuICAgIC8vIGJhc2VkIG9uIE1hdHRoZXcgTWNLZW5uYSdzIGV4YW1wbGUgYXQgaHR0cDovL2JsLm9ja3Mub3JnL21wbWNrZW5uYTgvcmF3LzU2NjUwOWRkM2Q5YTA4ZTVmOWIyL1xuICAgIGlmICghdG90YWwxIHx8ICF0b3RhbDIpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRvdGFsMSA9IE1hdGguc3FydCh0b3RhbDEpXG4gICAgdG90YWwyID0gTWF0aC5zcXJ0KHRvdGFsMilcbiAgICAvLyBkZWxldGUgb2xkIGNpcmNsZXNcbiAgICBjb25zdCBvbGRfY2lybGNlXzEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLXN2Zy0xJylcbiAgICBjb25zdCBvbGRfY2lybGNlXzIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLXN2Zy0yJylcbiAgICBvbGRfY2lybGNlXzEgPyBvbGRfY2lybGNlXzEucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGRfY2lybGNlXzEpIDogbnVsbFxuICAgIG9sZF9jaXJsY2VfMiA/IG9sZF9jaXJsY2VfMi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZF9jaXJsY2VfMikgOiBudWxsXG4gICAgXG4gICAgY29uc3QgZGF0YSA9IFt0b3RhbDEsIHRvdGFsMl1cblxuICAgIGNvbnN0IGhlaWdodCA9IDMwMFxuICAgIGNvbnN0IHdpZHRoID0gNTAwXG5cbiAgICBjb25zdCBjaXJjbGVfY29udGFpbmVyID0gZDMuc2VsZWN0KCcjYnVkZ2V0LWNpcmNsZS1jb250YWluZXInKVxuXG4gICAgY29uc3Qgc3ZnMSA9IGNpcmNsZV9jb250YWluZXIuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpLmF0dHIoJ2lkJywgJ2NpcmNsZS1zdmctMScpO1xuXG4gICAgY29uc3Qgc3ZnMiA9IGNpcmNsZV9jb250YWluZXIuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpLmF0dHIoJ2lkJywgJ2NpcmNsZS1zdmctMicpO1xuXG4gICAgY29uc3QgcnNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKFswLCAoZDMubWF4KGRhdGEpKSBdKVxuICAgICAgICAucmFuZ2UoWzEsIDE1MF0pXG5cbiAgICBzdmcxLnNlbGVjdEFsbCgnLmNpcmNsZXMnKS5kYXRhKFt0b3RhbDFdKVxuICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJzY2FsZShkKVxuICAgICAgICB9KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlcycpLmF0dHIoJ2N5JywgaGVpZ2h0IC8gMilcbiAgICAgICAgLmF0dHIoJ2N4JywgKGQsIGkpID0+IHdpZHRoIC8gMilcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnIzBhODBhZScpXG5cbiAgICBzdmcyLnNlbGVjdEFsbCgnLmNpcmNsZXMnKS5kYXRhKFt0b3RhbDJdKVxuICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZXMnKS5hdHRyKCdjeScsIGhlaWdodCAvIDIpXG4gICAgICAgIC5hdHRyKCdjeCcsIChkLCBpKSA9PiB3aWR0aCAvIDIpXG4gICAgICAgIC5hdHRyKCdmaWxsJywgJyMwYTgwYWUnKVxufVxuXG5leHBvcnQgY29uc3Qgc3ViQXJyYXlMb2NhdG9yID0gKHRheF90eXBlLCBjb250YWluZXJfYXJyYXkpID0+IHsgIC8vIGhlbHBlciBmdW5jdGlvbiBmb3IgZmluZGluZyB0aGUgcmlnaHQgc3ViIGFycmF5LiBBIGJpdCBoYXJkLWNvZGVkLlxuICAgIHN3aXRjaCAodGF4X3R5cGUpIHtcbiAgICAgICAgY2FzZSBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVswXVxuICAgICAgICBjYXNlIFwiTGljZW5zZSBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsxXVxuICAgICAgICBjYXNlIFwiSW5jb21lIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzJdXG4gICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVszXVxuICAgICAgICBjYXNlIFwiUHJvcGVydHkgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbNF1cbiAgICB9XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gd2FzIHRha2VuIGZyb20gdXNlciBQaW1wIFRyaXpraXRzIHBvc3Qgb24gc3RhY2tvdmVyZmxvdyBhdCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTYwMjQ4L3Byb2dyYW1tYXRpY2FsbHktbGlnaHRlbi1vci1kYXJrZW4tYS1oZXgtY29sb3Itb3ItcmdiLWFuZC1ibGVuZC1jb2xvcnNcbmV4cG9ydCBmdW5jdGlvbiBMaWdodGVuRGFya2VuQ29sb3IoY29sLCBhbXQpIHtcbiAgICB2YXIgdXNlUG91bmQgPSBmYWxzZTtcbiAgICBpZiAoY29sWzBdID09IFwiI1wiKSB7XG4gICAgICAgIGNvbCA9IGNvbC5zbGljZSgxKTtcbiAgICAgICAgdXNlUG91bmQgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBudW0gPSBwYXJzZUludChjb2wsIDE2KTtcblxuICAgIHZhciByID0gKG51bSA+PiAxNikgKyBhbXQ7XG5cbiAgICBpZiAociA+IDI1NSkgciA9IDI1NTtcbiAgICBlbHNlIGlmIChyIDwgMCkgciA9IDA7XG5cbiAgICB2YXIgYiA9ICgobnVtID4+IDgpICYgMHgwMEZGKSArIGFtdDtcblxuICAgIGlmIChiID4gMjU1KSBiID0gMjU1O1xuICAgIGVsc2UgaWYgKGIgPCAwKSBiID0gMDtcblxuICAgIHZhciBnID0gKG51bSAmIDB4MDAwMEZGKSArIGFtdDtcblxuICAgIGlmIChnID4gMjU1KSBnID0gMjU1O1xuICAgIGVsc2UgaWYgKGcgPCAwKSBnID0gMDtcblxuICAgIHJldHVybiAodXNlUG91bmQgPyBcIiNcIiA6IFwiXCIpICsgKGcgfCAoYiA8PCA4KSB8IChyIDw8IDE2KSkudG9TdHJpbmcoMTYpO1xufVxuLy8gVGhpcyBmdW5jdGlvbiB3YXMgYWxzbyB0YWtlbiBmcm9tIHVzZXIgUGltcCBUcml6a2l0cyBwb3N0IG9uIHN0YWNrb3ZlcmZsb3cgYXQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTU2MDI0OC9wcm9ncmFtbWF0aWNhbGx5LWxpZ2h0ZW4tb3ItZGFya2VuLWEtaGV4LWNvbG9yLW9yLXJnYi1hbmQtYmxlbmQtY29sb3JzXG5leHBvcnQgY29uc3QgcFNCQyA9IChwLCBjMCwgYzEsIGwpID0+IHtcbiAgICBsZXQgciwgZywgYiwgUCwgZiwgdCwgaCwgaSA9IHBhcnNlSW50LCBtID0gTWF0aC5yb3VuZCwgYSA9IHR5cGVvZiAoYzEpID09IFwic3RyaW5nXCI7XG4gICAgaWYgKHR5cGVvZiAocCkgIT0gXCJudW1iZXJcIiB8fCBwIDwgLTEgfHwgcCA+IDEgfHwgdHlwZW9mIChjMCkgIT0gXCJzdHJpbmdcIiB8fCAoYzBbMF0gIT0gJ3InICYmIGMwWzBdICE9ICcjJykgfHwgKGMxICYmICFhKSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCF0aGlzLnBTQkNyKSB0aGlzLnBTQkNyID0gKGQpID0+IHtcbiAgICAgICAgbGV0IG4gPSBkLmxlbmd0aCwgeCA9IHt9O1xuICAgICAgICBpZiAobiA+IDkpIHtcbiAgICAgICAgICAgIFtyLCBnLCBiLCBhXSA9IGQgPSBkLnNwbGl0KFwiLFwiKSwgbiA9IGQubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKG4gPCAzIHx8IG4gPiA0KSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHguciA9IGkoclszXSA9PSBcImFcIiA/IHIuc2xpY2UoNSkgOiByLnNsaWNlKDQpKSwgeC5nID0gaShnKSwgeC5iID0gaShiKSwgeC5hID0gYSA/IHBhcnNlRmxvYXQoYSkgOiAtMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG4gPT0gOCB8fCBuID09IDYgfHwgbiA8IDQpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKG4gPCA2KSBkID0gXCIjXCIgKyBkWzFdICsgZFsxXSArIGRbMl0gKyBkWzJdICsgZFszXSArIGRbM10gKyAobiA+IDQgPyBkWzRdICsgZFs0XSA6IFwiXCIpO1xuICAgICAgICAgICAgZCA9IGkoZC5zbGljZSgxKSwgMTYpO1xuICAgICAgICAgICAgaWYgKG4gPT0gOSB8fCBuID09IDUpIHguciA9IGQgPj4gMjQgJiAyNTUsIHguZyA9IGQgPj4gMTYgJiAyNTUsIHguYiA9IGQgPj4gOCAmIDI1NSwgeC5hID0gbSgoZCAmIDI1NSkgLyAwLjI1NSkgLyAxMDAwO1xuICAgICAgICAgICAgZWxzZSB4LnIgPSBkID4+IDE2LCB4LmcgPSBkID4+IDggJiAyNTUsIHguYiA9IGQgJiAyNTUsIHguYSA9IC0xXG4gICAgICAgIH0gcmV0dXJuIHhcbiAgICB9O1xuICAgIGggPSBjMC5sZW5ndGggPiA5LCBoID0gYSA/IGMxLmxlbmd0aCA+IDkgPyB0cnVlIDogYzEgPT0gXCJjXCIgPyAhaCA6IGZhbHNlIDogaCwgZiA9IHBTQkNyKGMwKSwgUCA9IHAgPCAwLCB0ID0gYzEgJiYgYzEgIT0gXCJjXCIgPyBwU0JDcihjMSkgOiBQID8geyByOiAwLCBnOiAwLCBiOiAwLCBhOiAtMSB9IDogeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1LCBhOiAtMSB9LCBwID0gUCA/IHAgKiAtMSA6IHAsIFAgPSAxIC0gcDtcbiAgICBpZiAoIWYgfHwgIXQpIHJldHVybiBudWxsO1xuICAgIGlmIChsKSByID0gbShQICogZi5yICsgcCAqIHQuciksIGcgPSBtKFAgKiBmLmcgKyBwICogdC5nKSwgYiA9IG0oUCAqIGYuYiArIHAgKiB0LmIpO1xuICAgIGVsc2UgciA9IG0oKFAgKiBmLnIgKiogMiArIHAgKiB0LnIgKiogMikgKiogMC41KSwgZyA9IG0oKFAgKiBmLmcgKiogMiArIHAgKiB0LmcgKiogMikgKiogMC41KSwgYiA9IG0oKFAgKiBmLmIgKiogMiArIHAgKiB0LmIgKiogMikgKiogMC41KTtcbiAgICBhID0gZi5hLCB0ID0gdC5hLCBmID0gYSA+PSAwIHx8IHQgPj0gMCwgYSA9IGYgPyBhIDwgMCA/IHQgOiB0IDwgMCA/IGEgOiBhICogUCArIHQgKiBwIDogMDtcbiAgICBpZiAoaCkgcmV0dXJuIFwicmdiXCIgKyAoZiA/IFwiYShcIiA6IFwiKFwiKSArIHIgKyBcIixcIiArIGcgKyBcIixcIiArIGIgKyAoZiA/IFwiLFwiICsgbShhICogMTAwMCkgLyAxMDAwIDogXCJcIikgKyBcIilcIjtcbiAgICBlbHNlIHJldHVybiBcIiNcIiArICg0Mjk0OTY3Mjk2ICsgciAqIDE2Nzc3MjE2ICsgZyAqIDY1NTM2ICsgYiAqIDI1NiArIChmID8gbShhICogMjU1KSA6IDApKS50b1N0cmluZygxNikuc2xpY2UoMSwgZiA/IHVuZGVmaW5lZCA6IC0yKVxufVxuIiwiLy8gQSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBiYXNlZCBoZWF2aWx5IG9mZiBvZiBLYXJ0aGlrIFRob3RhJ3MgeW91dHViZSB0dXRvcmlhbCBcIkludHJvZHVjdGlvbiB0byBkMy5qcyA9IFBpZSBDaGFydCBhbmQgRG9udXQgQ2hhcnRcIlxuLy8gVGhlIGxlZ2VuZCBjb2RlIHdhcyBmcm9tIENyeXB0ZXJzIEluZm90ZWNoJ3MgeW91dHViZSB0dXRvcmlhbCBcIlBpZSBDaGFydCB1c2luZyBEMy5qc1wiXG5cbmltcG9ydCB7IGFzc2lnbkJveCwgZmluZEFtb3VudCwgYnVkZ2V0Q2lyY2xlIH0gZnJvbSAnLi9oZWxwZXJfZnVuY3Rpb25zJ1xuaW1wb3J0IHsgc3ViRGF0YSB9IGZyb20gJy4vc3ViZGF0YV9nZW5lcmF0b3InXG4vLyBcbmV4cG9ydCBjb25zdCBDT0xPUlMgPSBbXCIjYTY3NTFlXCIsIFwiIzlhMDA0N1wiLCBcIiM2NmE1MWVcIiwgXCIjNzQ3MGIzXCIsIFwiI2U4MmI4YVwiXVxuZXhwb3J0IGNvbnN0IENJUkNMRV9DT0xPUlMgPSBbQ09MT1JTWzFdLCBDT0xPUlNbMF0sIENPTE9SU1s0XSwgQ09MT1JTWzJdLCBDT0xPUlNbM11dXG4vLyBleHBvcnQgY29uc3QgTEFCRUxTID0gW1wiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiT3RoZXIgVGF4ZXNcIl1cbmV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJPdGhlciBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIFRheGVzXCJdXG4vLyBleHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3IoY3N2UGF0aCwgc2VjdG9yLCBhbW91bnQsIHN0YXRlLCBtdWx0aXBsaWVyID0gMSwgc2tpcCA9IDEpIHtcbmV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgdGF4X3R5cGUsIHBpZV9udW0sIGNzdiA9IFwiLi9zcmMvYXNzZXRzL2RhdGEvRlkyMDE4LVNUQy1EZXRhaWxlZC1UYWJsZS5jc3ZcIikge1xuXG4gICAgLy8gY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG5cbiAgICAvLyBjb25zdCByZW1vdmUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXRhaWxzLVwiICsgcGllX251bSlcbiAgICAvLyByZW1vdmUyID8gcmVtb3ZlMi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZTIpIDogbnVsbFxuXG4gICAgY29uc3QgaDEgPSBkMy5zZWxlY3QoJyN0b3RhbHMtaGVhZGVyLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IHNwYW4gPSBkMy5zZWxlY3QoJyN0b3RhbHMtc3Bhbi0nICsgcGllX251bSlcbiAgICBjb25zdCBoMiA9IGQzLnNlbGVjdChcIiNkZXRhaWxzLVwiICsgcGllX251bSlcblxuXG4gICAgbGV0IFRPVEFMID0gMDtcbiAgICBsZXQgVFlQRVMgPSBbXVxuICAgIC8vIENJUkNMRSBUSU1FIEJBQllcbiAgICAvLyBtYXJnaW4gYW5kIHJhZGl1c1xuICAgIGNvbnN0IG1hcmdpbiA9IHsgdG9wOiAyMDAsIHJpZ2h0OiAyMDAsIGJvdHRvbTogMjAwLCBsZWZ0OiAyMDAgfSxcbiAgICAgICAgaGVpZ2h0ID0gMTAwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tLFxuICAgICAgICB3aWR0aCA9IDEwMDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCxcbiAgICAgICAgcmFkaXVzID0gd2lkdGggLyAyO1xuXG5cblxuICAgIGNvbnN0IGNvbG9ycyA9IGQzLnNjYWxlT3JkaW5hbChDT0xPUlMpO1xuXG4gICAgLy8gYXJjIGdlbmVyYXRvclxuICAgIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSAxMClcbiAgICAgICAgLy8gLmlubmVyUmFkaXVzKDApOyAvLyBmb3IgY2lyY2xlXG4gICAgICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSAxMDApIC8vIGZvciBkb251dFxuXG4gICAgLy8gY29uc3QgbGFibGVBcmMgPSBkMy5hcmMoKVxuICAgIC8vICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gNTApXG4gICAgLy8gICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSA1MCk7XG5cbiAgICAvLyBwaWUgZ2VuZXJhdG9yXG4gICAgY29uc3QgcGllID0gZDMucGllKClcbiAgICAgICAgLy8gLnNvcnQobnVsbClcbiAgICAgICAgLnZhbHVlKGQgPT4gZC5hbW91bnQpO1xuXG4gICAgLy8gZGVmaW5lIHN2ZyBcbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIucGllLVwiICsgcGllX251bSkuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwiaWRcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB3aWR0aCAvIDIgKyBcIixcIiArIGhlaWdodCAvIDIgKyBcIilcIilcblxuICAgIC8vIGltcG9ydCBkYXRhXG4gICAgZDMuY3N2KGNzdikudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAvLyBpbml0aWFsaXplIGFycmF5cyB0aGF0IHdpbGwgY29udGFpbiB0aGUgc3ViIGxldmVsIHRheCBkYXRhXG4gICAgICAgIGxldCBzYWxlc190YXhlcyA9IFtdXG4gICAgICAgIGxldCBsaWNlbnNlX3RheGVzID0gW11cbiAgICAgICAgbGV0IGluY29tZV90YXhlcyA9IFtdXG4gICAgICAgIGxldCBvdGhlcl90YXhlcyA9IFtdXG4gICAgICAgIGxldCBwcm9wZXJ0eV90YXhlcyA9IFtdXG4gICAgICAgIC8vIGxldCBzYWxlc190YXhfb2JqID0geyB0YXhfZ3JvdXA6IExBQkVMU1s0XSB9XG4gICAgICAgIC8vIHBhcnNlIHRoZSBjc3ZcbiAgICAgICAgZGF0YS5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkLkdlb19OYW1lID09PSBzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gPT09IFwiVDAwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgVE9UQUwgPSBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSAhPSBcIlQwMFwiKSB7ICAvLyBkb24ndCB3YW50IHRvIGNhdGNoIFRvdGFsIG9yIFByb3BlcnR5IFRheGVzXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXhfb2JqID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBkLlRheF9UeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnRfb2ZfdG90YWw6IChmaW5kQW1vdW50KGQuQU1PVU5UKSAvIFRPVEFMKSAqIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZC5pdGVtLnNsaWNlKDAsMikpIHsgLy8gZmlsbCB1cCBzdWIgYXJyYXlzXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDBcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtID09PSBcIlQwOVwiKSB7IHNhbGVzX3RheGVzLnB1c2godGF4X29iaikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDFcIikgeyBwcm9wZXJ0eV90YXhlcy5wdXNoKHRheF9vYmopIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzYWxlc190YXhfb2JqW2QuVGF4X1R5cGVdID0gZmluZEFtb3VudChkLkFNT1VOVClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMlwiOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29tZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9ICdUMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUWVBFUy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZC5rZXkgPSBkLlRheF9UeXBlO1xuICAgICAgICAgICAgICAgICAgICBkLmFtb3VudCA9IGZpbmRBbW91bnQoZC5BTU9VTlQpO1xuICAgICAgICAgICAgICAgICAgICBkLnBlcmNlbnQgPSAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWluZXJfYXJyYXkgPSBbXSAgLy8gc2V0dGluZyB1cCBjb250YWluZXIgYXJyYXkgZm9yIHBhc3NpbmcgaW50byBjbGljayBoYW5kbGVyXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChwcm9wZXJ0eV90YXhlcylcbiAgICAgICAgLy8gc2V0IGgxIGFmdGVyIHRvdGFsIGhhcyBiZWVuIGRlZmluZWRcbiAgICAgICAgaDEudGV4dChzdGF0ZSArIFwiJ3MgdGF4IHJldmVudWUgZm9yIDIwMTggd2FzIFwiKVxuICAgICAgICBzcGFuLnRleHQoXCIkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgIGgyLnRleHQoXCJcIilcbiAgICAgICAgLy8gYXR0ZW1wdCBidWRnZXRDaXJjbGUgY2FsbFxuICAgICAgICBidWRnZXRDaXJjbGUoVE9UQUwpXG4gICAgICAgIC8vIHNldCB1cCB0aGUgcGVyY2VudGFnZXMgaW4gdGhlIGNlbnRlciBib3hcbiAgICAgICAgYXNzaWduQm94KFRZUEVTLCBwaWVfbnVtKVxuXG4gICAgICAgIGNvbnN0IGcgPSBzdmcuc2VsZWN0QWxsKFwiLmFyY1wiKVxuICAgICAgICAgICAgLmRhdGEocGllKGRhdGEpKVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwiZ1wiKSAgLy8gQW5kIHRoaXMgbGluZSB0byBncm93IHRoZSBudW1iZXIgb2YgZydzIHRvIHRoZSBkYXRhIHNldCBzaXplXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYXJjXCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIChkLCBpKSA9PiBkLnZhbHVlID09PSBUT1RBTCA/IFwibm9uZVwiIDogXCJudWxsXCIpOyAgLy8gYXR0ZW1wdCB0byByZW5kZXIgaGFsZiB0aGUgY2hhcnQgaW52aXNpYmxlXG4gICAgICAgICAgICBcbiAgICAgICAgLy8gYXBwZW5kIHRoZSBwYXRoIG9mIHRoZSBhcmNcbiAgICAgICAgY29uc3QgcGF0aCA9IGcuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIGFyYylcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZCA9PiBjb2xvcnMoZC5kYXRhLmtleSkpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZWFzZShkMy5lYXNlTGluZWFyKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oJ2QnLCBwaWVUd2Vlbik7XG4gICAgICAgIFxuICAgICAgICAvLyBwYXRoLm9uKFwibW91c2VvdmVyXCIsIChkLCBpKSA9PiB7ICAvLyB3aHkgZG9lc24ndCB0aGlzIHdvcms/XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZClcbiAgICAgICAgLy8gICAgICAgICBkMy5zZWxlY3QodGhpcykudHJhbnNpdGlvbigpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5kdXJhdGlvbignNTAnKVxuICAgICAgICAvLyAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsICcuODUnKVxuICAgICAgICAvLyAgICAgICAgICAgICAuYXR0cihcImN1cnNvclwiLCAncG9pbnRlcicpXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyBkZXRlcm1pbmUgaG93IHRvIGZsaXAgdGhlIHBpZXNcbiAgICAgICAgaWYgKHBpZV9udW0gPT09IDIpIHsvLyBmbGlwIHRoZSBzZWNvbmQgcGllXG4gICAgICAgICAgICBnLmF0dHIoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICBnLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwic2NhbGVYKC0xKSB0cmFuc2xhdGUoMzAwcHgsIDBweCkgc2NhbGVZKC0xKVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgIGcub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coZClcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oJzUwJylcbiAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsICcuODUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgIC8vIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE4IHdhcyAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICAvLyBoMi50ZXh0KFwiXCIpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2snLCBzdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkpXG4gICAgICAgIGNvbnNvbGUubG9nKHBpZV9udW0pXG4gICAgICAgIGNvbnN0IHNwYW4xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFscy1zcGFuLTEnKVxuICAgICAgICBjb25zdCBzcGFuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbHMtc3Bhbi0yJylcblxuICAgICAgICBpZiAoc3BhbjEuaW5uZXJUZXh0XG4gICAgICAgICAgICAmJiBzcGFuMi5pbm5lclRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsMSA9IHBhcnNlSW50KHNwYW4xLmlubmVyVGV4dC5zbGljZSgxKS5zcGxpdCgnLCcpLmpvaW4oJycpKVxuICAgICAgICAgICAgY29uc3QgdG90YWwyID0gcGFyc2VJbnQoc3BhbjIuaW5uZXJUZXh0LnNsaWNlKDEpLnNwbGl0KCcsJykuam9pbignJykpXG4gICAgICAgICAgICBidWRnZXRDaXJjbGUodG90YWwxLCB0b3RhbDIpXG4gICAgICAgIH0gICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4geyBpZiAoZXJyb3IpIHRocm93IGVycm9yIH0pXG4gICAgXG4gICAgY29uc3QgcGllVHdlZW4gPSBiID0+IHtcbiAgICAgICAgYi5pbm5lclJhZGl1cyA9IDA7XG4gICAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZSh7IHN0YXJ0QW5nbGU6IDAsIGVuZEFuZ2xlOiAwIH0sIGIpXG4gICAgICAgIHJldHVybiAodCkgPT4geyByZXR1cm4gYXJjKGkodCkpIH1cbiAgICB9ICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgIiwiaW1wb3J0IHsgQ0lSQ0xFX0NPTE9SUywgTEFCRUxTfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBwaWVMZWdlbmQgPSAoKSA9PiB7XG4gICAgY29uc3QgbWFzdGVyX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcbiAgICBtYXN0ZXJfbGlzdC5jbGFzc0xpc3QuYWRkKCdtYXN0ZXItbGlzdCcpXG5cbiAgICBjb25zdCBsZWZ0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgdGV4dF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHJpZ2h0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgICBsZWZ0X2xpc3QuY2xhc3NMaXN0LmFkZCgnbGVmdC1saXN0JykgIFxuICAgIHRleHRfbGlzdC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWxpc3QnKSAgXG4gICAgcmlnaHRfbGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodC1saXN0JykgXG5cbiAgICBmb3IgKGxldCBpID0gTEFCRUxTLmxlbmd0aCAtIDEgOyBpID49IDA7IGktLSkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbGVmdF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IHRleHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCByaWdodF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgbGVmdF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ2xlZnQtYm94JylcbiAgICAgICAgbGVmdF9ib3guaWQgPSAoJ2xlZnQtYm94LScgKyBpKVxuICAgICAgICBsZWZ0X2JveC5zdHlsZS5jb2xvciA9IENJUkNMRV9DT0xPUlNbaV1cblxuICAgICAgICByaWdodF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ3JpZ2h0LWJveCcpXG4gICAgICAgIHJpZ2h0X2JveC5pZCA9ICgncmlnaHQtYm94LScgKyBpKVxuICAgICAgICByaWdodF9ib3guc3R5bGUuY29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgdGV4dF9ib3guY2xhc3NMaXN0LmFkZCgndGV4dC1ib3gnKVxuICAgICAgICB0ZXh0X2JveC5pbm5lckhUTUwgPSBMQUJFTFNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IENJUkNMRV9DT0xPUlNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCBcIiArIENJUkNMRV9DT0xPUlNbaV1cblxuICAgICAgICBsZWZ0X2xpc3QuYXBwZW5kQ2hpbGQobGVmdF9ib3gpXG4gICAgICAgIHRleHRfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2JveClcbiAgICAgICAgcmlnaHRfbGlzdC5hcHBlbmRDaGlsZChyaWdodF9ib3gpXG4gICAgfVxuXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQobGVmdF9saXN0KVxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKHRleHRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZChyaWdodF9saXN0KVxuICAgIHJldHVybiBtYXN0ZXJfbGlzdFxufVxuXG5jb25zdCBzdWJsaXN0cyA9IChsYWJlbCwgY29sb3IpID0+IHtcbiAgICBjb25zdCBsaXN0cyA9IFtdXG5cblxuICAgIGxlc3RsaXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnRsaXN0JylcbiAgICB0ZXh0bGlzdC5jbGFzc0xpc3QuYWRkKCd0ZXh0bGlzdCcpXG4gICAgcmlnaHRsaXN0LmNsYXNzTGlzdC5hZGQoJ3JpZ2h0bGlzdCcpXG5cbiAgICBjb25zdCBsZWZ0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGNvbnN0IHJpZ2h0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG5cblxuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG5cbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKGxlZnRCb3gpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsaSlcbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKHJpZ2h0Qm94KVxuICAgIHJldHVybiBzdWJsaXN0XG59IiwiaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBUT1BfTEVWRUwgPSBbJ1QwMCcsICdUMDEnLCAnVEExJywgJ1RBMycsICdUQTQnLCAnVEE1J11cbmNvbnN0IFNUQVRFX05BTUVTID0gWydBbGFiYW1hJywgJ0FsYXNrYScsICdBcml6b25hJywgJ0Fya2Fuc2FzJywgJ0NhbGlmb3JuaWEnLCAnQ29sb3JhZG8nLCAnQ29ubmVjdGljdXQnLCAnRGVsYXdhcmUnLCAnRmxvcmlkYScsICdHZW9yZ2lhJywgJ0hhd2FpaScsICdJZGFobycsICdJbGxpbm9pcycsICdJbmRpYW5hJywgJ0lvd2EnLCAnS2Fuc2FzJywgJ0tlbnR1Y2t5JywgJ0xvdWlzaWFuYScsICdNYWluZScsICdNYXJ5bGFuZCcsICdNYXNzYWNodXNldHRzJywgJ01pY2hpZ2FuJywgJ01pbm5lc290YScsICdNaXNzaXNzaXBwaScsICdNaXNzb3VyaScsICdNb250YW5hJywgJ05lYnJhc2thJywgJ05ldmFkYScsICdOZXcgSGFtcHNoaXJlJywgJ05ldyBKZXJzZXknLCAnTmV3IE1leGljbycsICdOZXcgWW9yaycsICdOb3J0aCBDYXJvbGluYScsICdOb3J0aCBEYWtvdGEnLCAnT2hpbycsICdPa2xhaG9tYScsICdPcmVnb24nLCAnUGVubnN5bHZhbmlhJywgJ1Job2RlIElzbGFuZCcsICdTb3V0aCBDYXJvbGluYScsICdTb3V0aCBEYWtvdGEnLCAnVGVubmVzc2VlJywgJ1RleGFzJywgJ1V0YWgnLCAnVmVybW9udCcsICdWaXJnaW5pYScsICdXYXNoaW5ndG9uJywgJ1dlc3QgVmlyZ2luaWEnLCAnV2lzY29uc2luJywgJ1d5b21pbmcnXVxuXG4vLyBleHBvcnQgY29uc3Qgc2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuXG4vLyAgICAgLy8gY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgIC8vIHJldmlzaXQgaWYgdGltZSB0byBtYWtlIGN1c3RvbSBzZWxlY3Rcbi8vICAgICAvLyBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5pdGlhbC1jb250YWluZXInKVxuXG4vLyAgICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKVxuLy8gICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNlbGVjdC1cIiArIHBpZV9udW0pXG5cbi8vICAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gZSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHN0YXRlID0gZS50YXJnZXQudmFsdWVcbi8vICAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctXCIgKyBwaWVfbnVtKVxuLy8gICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4vLyAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG5cbi8vICAgICAgICAgY29uc3Qgc2lkZSA9IHBpZV9udW0gPT09IDEgPyBcIi1sZWZ0XCIgOiBcIi1yaWdodFwiXG4vLyAgICAgICAgIC8vIGNvbnN0IGgyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN0YXRlXCIgKyBzaWRlKVswXVxuLy8gICAgICAgICAvLyBoMi5pbm5lckhUTUwgPSBzdGF0ZVxuLy8gICAgIH1cblxuLy8gICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuLy8gICAgICAgICBjb25zdCBkZWZhdWx0X3N0YXRlID0gcGllX251bSA9PT0gMSA/IFNUQVRFX05BTUVTWzBdIDogU1RBVEVfTkFNRVNbU1RBVEVfTkFNRVMubGVuZ3RoIC0gMV1cbi8vICAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuLy8gICAgICAgICBpZiAoc3RhdGUgPT09IGRlZmF1bHRfc3RhdGUpIHtcbi8vICAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCB0cnVlKVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBzdGF0ZVxuLy8gICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4vLyAgICAgICAgIC8vIG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4vLyAgICAgICAgIC8vIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuLy8gICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKVxuLy8gICAgIH0pXG4vLyAgICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc3RhdGVTZWxlY3Rvcilcbi8vICAgICAvLyBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KVxuLy8gICAgIC8vIHJldHVybiBjb250YWluZXJcbi8vICAgICByZXR1cm4gc2VsZWN0XG4vLyB9XG5cbi8vIGNvbnN0IHBoYXNlT3V0ID0gKG5vZGUpID0+IHtcblxuLy8gICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxuLy8gfVxuXG5leHBvcnQgY29uc3Qgc3RhdGVfc2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuIFxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwic2VsZWN0LXdyYXBwZXItXCIgKyBwaWVfbnVtKVxuICAgIHdyYXBwZXIuaWQgPSBcInNlbGVjdC13cmFwcGVyLVwiICsgcGllX251bVxuXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICBzZWxlY3QuaW5uZXJIVE1MID0gcGllX251bSA9PT0gMSA/ICdBbGFiYW1hJyA6ICdXeW9taW5nJ1xuICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuICAgIHNlbGVjdC5pZCA9IFwic2VsZWN0LVwiICsgcGllX251bVxuXG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICB9KVxuICAgIFxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdICAvLyBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgc28gdGhhdCBpZiBJIGNsaWNrIGFueXdoZXJlIGVsc2UgdGhlIGxpc3QgZGlzYXBwZWFyc1xuICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIH0pXG4gICAgXG4gICAgY29uc3Qgc3RhdGVTZWxlY3RvciA9IHN0YXRlID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnN0IHN0YXRlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0LVwiICsgcGllX251bSlcbiAgICAgICAgICAgIHNlbGVjdC5pbm5lclRleHQgPSBzdGF0ZVxuICAgICAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAgICAgc3ZnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3ZnKVxuICAgICAgICAgICAgUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUsIFRPUF9MRVZFTCwgcGllX251bSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBzdGF0ZV9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnc3RhdGUtbGlzdC0nICsgcGllX251bSlcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgc3RhdGVfbGlzdC5pZCA9ICdzdGF0ZS1saXN0LScgKyBwaWVfbnVtXG4gICAgXG4gICAgU1RBVEVfTkFNRVMuZm9yRWFjaChzdGF0ZSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlX2xpc3RfaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uaW5uZXJIVE1MID0gc3RhdGVcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHN0YXRlKVxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuICAgICAgICBzdGF0ZV9saXN0LmFwcGVuZENoaWxkKHN0YXRlX2xpc3RfaXRlbSlcbiAgICB9KVxuICAgIFxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KVxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc3RhdGVfbGlzdClcbiAgICBcbiAgICByZXR1cm4gd3JhcHBlclxufVxuXG4vLyBjb25zdCBwaGFzZU91dCA9IChub2RlKSA9PiB7XG5cbi8vICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbi8vIH0iLCJpbXBvcnQgeyBzdWJBcnJheUxvY2F0b3IsIExpZ2h0ZW5EYXJrZW5Db2xvciB9IGZyb20gJy4vaGVscGVyX2Z1bmN0aW9ucydcbmltcG9ydCB7IENJUkNMRV9DT0xPUlMgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InO1xuXG5leHBvcnQgY29uc3Qgc3ViRGF0YSA9IChjb250YWluZXJfYXJyYXksIHBpZV9udW0sIGNvbG9yX3N0cmluZyA9IFwiIzNGNkQyQVwiKSA9PiB7XG4gICAgLy8gYSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBsZWFybmVkIGZyb20gTWljaGFlbCBTdGFuYWxhbmQncyBcIlN0YWNrZWQgYmFyIGNoYXJ0IHdpdGggdG9vbHRpcHNcIiB0dXRvcmlhbCBhdCBodHRwOi8vYmwub2Nrcy5vcmcvbXN0YW5hbGFuZC82MTAwNzEzXG4gICAgcmV0dXJuIChlbGUpID0+IHtcbiAgICAgICAgZGVidWdnZXJcblxuICAgICAgICBjb25zdCB0YXhfdHlwZSA9IGVsZS5kYXRhLmtleVxuICAgICAgICBjb2xvcl9zdHJpbmcgPSBjb2xvckNob29zZXIodGF4X3R5cGUpXG4gICAgICAgIGNvbnN0IHN1Yl9hcnJheSA9IHN1YkFycmF5TG9jYXRvcih0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KVxuXG4gICAgICAgIFxuICAgICAgICBsZXQgdGF4X3N0YWNrID0ge31cbiAgICAgICAgLy8gc2V0dGluZyB1cCBrZXlzXG4gICAgICAgIGxldCBrZXlzID0gW11cbiAgICAgICAgLy8ga2V5cy5wdXNoKHRheF90eXBlKVxuICAgICAgICBzdWJfYXJyYXkuZm9yRWFjaCgoc3ViX3RheCwgaSkgPT4ge1xuICAgICAgICAgICAga2V5cy5wdXNoKHN1Yl90YXgua2V5KVxuICAgICAgICAgICAgdGF4X3N0YWNrW3N1Yl90YXgua2V5XSA9IHN1Yl90YXgucGVyY2VudF9vZl90b3RhbFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IDkwICAvLyBzZXR0aW5nIHRoZSBkaW1lbnNpb25zIHRvIGNvcnJlc3BvbmQgdG8gdGhlIHBpZSBjaGFydHMnXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDUwMFxuXG4gICAgICAgIGNvbnN0IHRvb2x0aXBXaWR0aCA9IDEyMCAvLyB3aWxsIGFsdGVyIHRoZXNlIGFzIG5lZWRlZFxuICAgICAgICBjb25zdCB0b29sdGlwSGVpZ2h0ID0gNDBcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIiNzdWItZGF0YS1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICAuYXBwZW5kKFwic3ZnXCIpIFxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCkuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAgICAgICAuYXBwZW5kKFwiZ1wiKS5hdHRyKCdjbGFzcycsICdzdWItZGF0YS0nICsgcGllX251bSlcblxuICAgICAgICAvLyBzZXQgdGhlIGxheWVycyBvZiB0aGUgc3RhY2tlZCBiYXJcbiAgICAgICAgLy8gY29uc3QgbGF5ZXJzID0gZDMuc3RhY2soKShbdGF4X3R5cGVdLm1hcCh0YXggPT4geyAgLy8gc2hvdWxkIHVsdGltYXRlbHkganVzdCBiZSB0aGUgb25lIGxheWVyXG4gICAgICAgIC8vICAgICByZXR1cm4gc3ViX2FycmF5Lm1hcChkID0+IHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4geyB4OiBkLmtleSwgeTogZC5hbW91bnQsIHBlcmNlbnQ6IGQucGVyY2VudCB9XG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyB9KSlcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBkMy5zdGFjaygpXG4gICAgICAgICAgICAua2V5cyhrZXlzKVxuICAgICAgICAgICAgLm9yZGVyKGQzLnN0YWNrT3JkZXJOb25lKVxuICAgICAgICAgICAgLm9mZnNldChkMy5zdGFja09mZnNldE5vbmUpXG4gICAgICAgIGxldCB0YXhfc3RhY2tfYXJyYXkgPSBbXVxuICAgICAgICB0YXhfc3RhY2tfYXJyYXkucHVzaCh0YXhfc3RhY2spXG4gICAgICAgIGNvbnN0IGxheWVycyA9IHN0YWNrKHRheF9zdGFja19hcnJheSlcblxuICAgICAgICAvLyBjb25zdCB4ID0gZDMuc2NhbGVPcmRpbmFsKClcbiAgICAgICAgLy8gICAgIC5kb21haW4obGF5ZXJzWzBdLm1hcChkID0+IGQueCkpXG4gICAgICAgIC8vICAgICAvLyAucmFuZ2UoWzEwLCB3aWR0aF0sIDApICAvLyBtYXkgYmUgYSBxdWlja2VyIHdheSB0byBkbyB0aGlzIGFzIHRoZXJlIGlzIG9ubHkgb25lIGJhclxuICAgICAgICAvLyAgICAgLnJhbmdlKFt3aWR0aF0pXG4gICAgICAgIGNvbnN0IHhTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIDFdKVxuICAgICAgICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXG5cbiAgICAgICAgLy8gY29uc3QgY29sb3JzID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAvLyAgICAgLmRvbWFpbihbMSwgMTBdKVxuICAgICAgICAvLyAgICAgLnJhbmdlKFtcInJlZFwiLCBcImJsdWVcIl0pXG5cbiAgICAgICAgY29uc3QgY29sb3JzID0gW2NvbG9yX3N0cmluZ11cbiAgICAgICAgY29uc3QgZGVjcmVtZW50ID0gMTAwIC8ga2V5cy5sZW5ndGhcbiAgICAgICAgbGV0IG5leHRfY29sb3IgPSBMaWdodGVuRGFya2VuQ29sb3IoY29sb3Jfc3RyaW5nLCBkZWNyZW1lbnQpXG4gICAgICAgIHdoaWxlIChjb2xvcnMubGVuZ3RoIDwga2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbG9ycy5wdXNoKG5leHRfY29sb3IpXG4gICAgICAgICAgICBuZXh0X2NvbG9yID0gTGlnaHRlbkRhcmtlbkNvbG9yKG5leHRfY29sb3IsIGRlY3JlbWVudClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKGNvbG9ycylcblxuICAgICAgICBjb25zdCB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCBkMy5zdW0oT2JqZWN0LnZhbHVlcyh0YXhfc3RhY2spKV0pICAvLyB0aGUgaW5jcmVtZW50IHVwIHRvIHRoZSB0b3RhbFxuICAgICAgICAgICAgLy8gLnJhbmdlKFtoZWlnaHQsIDBdKVxuICAgICAgICAgICAgLnJhbmdlKFswLCBoZWlnaHRdKVxuXG4gICAgICAgIGNvbnN0IGcgPSBzdmcuc2VsZWN0QWxsKFwiLnN1Yi10YXhlc1wiKSAgLy8gbm8gZyBhdCB0aGlzIHBvaW50LCBidXQgdGhleSB3aWxsIGhhdmUgdGhpcyBjbGFzc1xuICAgICAgICAgICAgLmRhdGEobGF5ZXJzKS5lbnRlcigpICAvLyBub3cgdGhlcmUgd2lsbCBiZSBhIGcgZm9yIGV2ZXJ5IGJhciB3aXRoaW4gdGhlIGdyYXBoLlxuICAgICAgICAgICAgLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIFwic3ViLXRheGVzXCIpXG4gICAgICAgIC8vIC5hdHRyKCdmaWxsJywgZCA9PiB7XG4gICAgICAgIC8vICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAvLyAgICAgcmV0dXJuIGNvbG9ycyhkKX0pXG5cbiAgICAgICAgY29uc3QgcmVjdCA9IGcuc2VsZWN0QWxsKFwicmVjdFwiKSAgLy8gbWFraW5nIGVhY2ggb2JqIG9mIHRoZSBjb3JyZXNwb25kIHRvIGEgcmVjdCB3aXRoaW4gdGhlIGdcbiAgICAgICAgICAgIC5kYXRhKGxheWVyID0+IGxheWVyKSAvLyBwdWxsaW5nIG91dCBlYWNoIGluZGl2aWR1YWwgb2JqXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgICAgICAuYXR0cigneCcsIGQgPT4geFNjYWxlKDApKSAgLy8gcGFzc2luZyBlYWNoIG9iaidzIHggdmFsdWUgdG8gdGhlIGQzIHggZnVuY3Rpb24gZGVmaW5lZCBhYm92ZVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBsYXllciA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0IC0geVNjYWxlKGxheWVyWzFdKVxuICAgICAgICAgICAgfSkgIC8vIHkwIGlzIHRoZSBoZWlnaHQgd2hlcmUgZWFjaCBzZWdtZW50IGluIHRoZSBzdGFjayBzdGFydHNcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHhTY2FsZSgxKSkgIC8vIHByb2JhYmx5IGNhbiBoYXJkIGNvZGUsIHNpbmNlIG9ubHkgb25lIGJhclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGJhciA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgICAgICByZXR1cm4geVNjYWxlKGJhclsxXSAtIGJhclswXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsIGQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbG9ycy5wb3AoKVxuICAgICAgICAgICAgfSkgIC8vIGhlaWdodCBpcyBzZXQgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IHBsdXMgdGhlIGhlaWdodCwgYW5kIGFsbCB0aGF0IHN1YnRyYWN0ZWQgZnJvbSB0aGUgc3RhcnRpbmcgcG9pbnQgZHVlIHRvIHkgdmFsdWVzIGJlZ2luaW5nIGF0IHRvcCBvZiBzY3JlZW5cbiAgICAgICAgLy8gICAgIC5vbignbW91c2VvdmVyJywgKCkgPT4gdG9vbHRpcC5zdHlsZShcImRpc3BsYXlcIiwgdHJ1ZSkpICAvLyB3YW50IHRoZSBpbmZvIGJveCB0byBzd2l0Y2ggYmV0d2VlbiB2aXNpYmxlIGFuZCBpbml2aXMgYmFzZWQgb24gbW91c2VvdmVyXG4gICAgICAgIC8vICAgICAub24oJ21vdXNlb3V0JywgKCkgPT4gdG9vbHRpcC5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpKVxuICAgICAgICAvLyAgICAgLm9uKCdtb3VzZW1vdmUnLCBkID0+IHsgIC8vIHRoaXMgaXMgZ29pbmcgdG8gYmUgYSBzd2VldCBlZmZlY3QhXG4gICAgICAgIC8vICAgICAgICAgY29uc3QgeFBvcyA9IGQzLm1vdXNlKHRoaXMpWzBdIC0gKHRvb2x0aXBXaWR0aCAvIDIpIC8vIHRoaXNbMF0gY29ycmVzcG9uZHMgdG8gbW91c2UncyB4IHBvcywgYW5kIHB1c2hpbmcgaXQgbGVmdCBieSBoYWxmIG9mIHRoZSB0b29sdGlwJ3Mgd2lkdGggZW5zdXJlIGl0IGlzIGNlbnRlcmVkXG4gICAgICAgIC8vICAgICAgICAgY29uc3QgeVBvcyA9IGQzLm1vdXNlKHRoaXMpWzFdIC0gMjUgLy8gcHV0cyB0aGUgdG9vbHRpcCB1cCBhIGJpdCBhYm92ZSB0aGUgY3Vyc29yXG4gICAgICAgIC8vICAgICAgICAgdG9vbHRpcC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgeFBvcyArICcsJyArIHlQb3MgKyAnKScpXG4gICAgICAgIC8vICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJ3RleHQnKS50ZXh0KGQucGVyY2VudF9vZl90b3RhbCkgLy8gc2hvd3MgdGhlIHBlcmNlbnQgIFxuICAgICAgICAvLyAgICAgfSlcblxuICAgICAgICAvLyBjb25zdCB0b29sdGlwID0gc3ZnLmFwcGVuZCgnZycpIC8vIHNldHRpbmcgdXAgdGhpcyBzd2VldCB0b29sdGlwLiBFeGNpdGluZyFcbiAgICAgICAgLy8gICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS10b29sdGlwIHRvb2x0aXAnKS5zdHlsZSgnZGlzcGxheScsICdub25lJykgLy8gc3RhcnRzIGludmlzaWJsZVxuICAgICAgICAvLyAgICAgLy8gYWRkaW5nIHRoZSBkaW1lbnNpb25zIG9mIHRoZSBib3hcbiAgICAgICAgLy8gICAgIC5hcHBlbmQoJ3JlY3QnKS5hdHRyKCd3aWR0aCcsIHRvb2x0aXBXaWR0aClcbiAgICAgICAgLy8gICAgIC5hdHRyKCdoZWlnaHQnLCB0b29sdGlwSGVpZ2h0KS5hdHRyKCdmaWxsJywgJ3doaXRlJykuc3R5bGUoJ29wYWNpdHknLCAwLjUpIC8vIG1ha2luZyBpdCBwYXJ0aWFsbHkgc2VlLXRocm91Z2hcbiAgICAgICAgLy8gICAgIC8vIGFkZGluZyB0aGUgdGV4dCBjb250ZW50XG4gICAgICAgIC8vICAgICAuYXBwZW5kKCd0ZXh0JykuYXR0cigneCcsIDE1KVxuICAgICAgICAvLyAgICAgLmF0dHIoJ2R5JywgJy44ZW0nKS5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICB9XG59XG5cblxuXG5jb25zdCBjb2xvckNob29zZXIgPSAodGF4X3R5cGUpID0+IHtcbiAgICBzd2l0Y2ggKHRheF90eXBlKSB7XG4gICAgICAgIGNhc2UgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzRdXG4gICAgICAgIGNhc2UgJ1Byb3BlcnR5IFRheGVzJzpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzNdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gQ0lSQ0xFX0NPTE9SU1syXVxuICAgICAgICBjYXNlICdJbmNvbWUgVGF4ZXMnOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbMV1cbiAgICAgICAgY2FzZSAnT3RoZXIgVGF4ZXMnOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbMF1cbiAgICB9XG59XG5cbiIsIlxuaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHBpZUxlZ2VuZCB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfbGVnZW5kJ1xuaW1wb3J0IHsgc3RhdGVfc2VsZWN0b3IsIFRPUF9MRVZFTCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGF0ZV9zZWxlY3RvcidcbmltcG9ydCB7IGJ1ZGdldENpcmNsZSB9IGZyb20gJy4vY29tcG9uZW50cy9oZWxwZXJfZnVuY3Rpb25zJ1xuaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2NzcydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIFxuICAgIC8vIFBDRyAtPiBjc3ZQYXRoLCBzZWN0b3IsIGFtb3V0LCBsb2NhdGlvbiwgbXVsdGlwbGllciwgc2tpcFxuICAgIFxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgICAvLyBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHNlbGVjdF8xID0gc3RhdGVfc2VsZWN0b3IoMSlcbiAgICBjb25zdCBzZWxlY3RfMiA9IHN0YXRlX3NlbGVjdG9yKDIpXG4gICAgY29uc3Qgc2VsZWN0b3JfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdG9yLWNvbnRhaW5lclwiKVswXVxuICAgIFxuICAgIGNvbnN0IHllYXJTZWxlY3RvciA9IHllYXJTZWxlY3RvclxuXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8xKVxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMilcbiAgICByb290LmFwcGVuZENoaWxkKHVsKVxuXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJBbGFiYW1hXCIsIFRPUF9MRVZFTCwgMSlcbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIld5b21pbmdcIiwgVE9QX0xFVkVMLCAyKVxuXG4gICAgXG59KVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==