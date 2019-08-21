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
        }); // pulling out each individual obj
        rect.exit().remove();
        rect.enter().append("rect").attr('x', function (d) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3ViZGF0YV9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYXBwLnNjc3MiXSwibmFtZXMiOlsiTGlnaHRlbkRhcmtlbkNvbG9yIiwiYXNzaWduQm94IiwiYXJyYXlfb2Zfb2JqcyIsInBpZV9udW0iLCJzaWRlIiwiZm9yRWFjaCIsIm9iaiIsImkiLCJrZXkiLCJib3giLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZGVjaW1hbHMiLCJTdHJpbmciLCJwZXJjZW50Iiwic3BsaXQiLCJpbnRlZ2VycyIsInNsaWNlZCIsInNsaWNlIiwiaW5uZXJIVE1MIiwiZmluZEFtb3VudCIsImFtb3VudCIsImpvaW4iLCJidWRnZXRDaXJjbGUiLCJ0b3RhbDEiLCJ0b3RhbDIiLCJNYXRoIiwic3FydCIsIm9sZF9jaXJsY2VfMSIsIm9sZF9jaXJsY2VfMiIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImRhdGEiLCJoZWlnaHQiLCJ3aWR0aCIsImNpcmNsZV9jb250YWluZXIiLCJkMyIsInNlbGVjdCIsInN2ZzEiLCJhcHBlbmQiLCJhdHRyIiwic3ZnMiIsInJzY2FsZSIsInNjYWxlTGluZWFyIiwiZG9tYWluIiwibWF4IiwicmFuZ2UiLCJzZWxlY3RBbGwiLCJlbnRlciIsImQiLCJzdWJBcnJheUxvY2F0b3IiLCJ0YXhfdHlwZSIsImNvbnRhaW5lcl9hcnJheSIsImNvbCIsImFtdCIsInVzZVBvdW5kIiwibnVtIiwicGFyc2VJbnQiLCJyIiwiYiIsImciLCJ0b1N0cmluZyIsInBTQkMiLCJwIiwiYzAiLCJjMSIsImwiLCJQIiwiZiIsInQiLCJoIiwibSIsInJvdW5kIiwiYSIsInBTQkNyIiwibiIsImxlbmd0aCIsIngiLCJwYXJzZUZsb2F0IiwidW5kZWZpbmVkIiwiUGllQ2hhcnRHZW5lcmF0b3IiLCJDT0xPUlMiLCJDSVJDTEVfQ09MT1JTIiwiTEFCRUxTIiwic3RhdGUiLCJjc3YiLCJoMSIsInNwYW4iLCJoMiIsIlRPVEFMIiwiVFlQRVMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJyYWRpdXMiLCJjb2xvcnMiLCJzY2FsZU9yZGluYWwiLCJhcmMiLCJvdXRlclJhZGl1cyIsImlubmVyUmFkaXVzIiwicGllIiwidmFsdWUiLCJzdmciLCJ0aGVuIiwic2FsZXNfdGF4ZXMiLCJsaWNlbnNlX3RheGVzIiwiaW5jb21lX3RheGVzIiwib3RoZXJfdGF4ZXMiLCJwcm9wZXJ0eV90YXhlcyIsIkdlb19OYW1lIiwiaXRlbSIsIkFNT1VOVCIsInRheF9vYmoiLCJUYXhfVHlwZSIsInBlcmNlbnRfb2ZfdG90YWwiLCJwdXNoIiwiaW5jbHVkZXMiLCJ0ZXh0IiwiZm9ybWF0Iiwic3R5bGUiLCJwYXRoIiwidHJhbnNpdGlvbiIsImVhc2UiLCJlYXNlTGluZWFyIiwiZHVyYXRpb24iLCJhdHRyVHdlZW4iLCJwaWVUd2VlbiIsIm9uIiwiY29uc29sZSIsImxvZyIsInNwYW4xIiwic3BhbjIiLCJpbm5lclRleHQiLCJjYXRjaCIsImVycm9yIiwiaW50ZXJwb2xhdGUiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJwaWVMZWdlbmQiLCJtYXN0ZXJfbGlzdCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJsZWZ0X2xpc3QiLCJ0ZXh0X2xpc3QiLCJyaWdodF9saXN0IiwibGVmdF9ib3giLCJ0ZXh0X2JveCIsInJpZ2h0X2JveCIsImlkIiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXIiLCJhcHBlbmRDaGlsZCIsInN1Ymxpc3RzIiwibGFiZWwiLCJsaXN0cyIsImxlc3RsaXN0IiwidGV4dGxpc3QiLCJyaWdodGxpc3QiLCJsZWZ0Qm94IiwicmlnaHRCb3giLCJsaSIsInN1Ymxpc3QiLCJUT1BfTEVWRUwiLCJTVEFURV9OQU1FUyIsInN0YXRlX3NlbGVjdG9yIiwid3JhcHBlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwic3RhdGVfbGlzdCIsInRvZ2dsZSIsImJvZHkiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0YXRlU2VsZWN0b3IiLCJzdGF0ZV9saXN0X2l0ZW0iLCJzZXRBdHRyaWJ1dGUiLCJzdWJEYXRhIiwiY29sb3Jfc3RyaW5nIiwiZWxlIiwiY29sb3JDaG9vc2VyIiwic3ViX2FycmF5IiwidGF4X3N0YWNrIiwia2V5cyIsInN1Yl90YXgiLCJ0b29sdGlwV2lkdGgiLCJ0b29sdGlwSGVpZ2h0Iiwic3RhY2siLCJvcmRlciIsInN0YWNrT3JkZXJOb25lIiwib2Zmc2V0Iiwic3RhY2tPZmZzZXROb25lIiwidGF4X3N0YWNrX2FycmF5IiwibGF5ZXJzIiwieFNjYWxlIiwiZGVjcmVtZW50IiwibmV4dF9jb2xvciIsInlTY2FsZSIsInN1bSIsIk9iamVjdCIsInZhbHVlcyIsInJlY3QiLCJsYXllciIsImV4aXQiLCJyZW1vdmUiLCJiYXIiLCJwb3AiLCJyb290IiwidWwiLCJzZWxlY3RfMSIsInNlbGVjdF8yIiwic2VsZWN0b3JfY29udGFpbmVyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInllYXJTZWxlY3RvciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtR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QUFDSixhQUFLLGFBQUw7QUFDSSxtQkFBT0EsbUNBQWMsQ0FBZCxDQUFQO0FBVlI7QUFZSCxDQWJELEM7Ozs7Ozs7Ozs7Ozs7O0FDeEhBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBeEUsU0FBU2dLLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNOztBQUVoRDs7QUFFQSxRQUFNd0MsT0FBT3hNLFNBQVNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYjtBQUNBO0FBQ0EsUUFBTXdNLEtBQUssNEJBQVg7QUFDQSxRQUFNQyxXQUFXLG9DQUFlLENBQWYsQ0FBakI7QUFDQSxRQUFNQyxXQUFXLG9DQUFlLENBQWYsQ0FBakI7QUFDQSxRQUFNQyxxQkFBcUI1TSxTQUFTNk0sc0JBQVQsQ0FBZ0Msb0JBQWhDLEVBQXNELENBQXRELENBQTNCOztBQUVBLFFBQU1DLGVBQWVBLFlBQXJCOztBQUVBRix1QkFBbUIzRCxXQUFuQixDQUErQnlELFFBQS9CO0FBQ0FFLHVCQUFtQjNELFdBQW5CLENBQStCMEQsUUFBL0I7QUFDQUgsU0FBS3ZELFdBQUwsQ0FBaUJ3RCxFQUFqQjs7QUFFQSxnREFBa0IsU0FBbEIsRUFBNkI3Qyx5QkFBN0IsRUFBd0MsQ0FBeEM7QUFDQSxnREFBa0IsU0FBbEIsRUFBNkJBLHlCQUE3QixFQUF3QyxDQUF4QztBQUdILENBckJELEU7Ozs7Ozs7Ozs7O0FDUEEsdUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgeyBDSVJDTEVfQ09MT1JTIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgYXNzaWduQm94ID0gKGFycmF5X29mX29ianMsIHBpZV9udW0pID0+IHtcbiAgICBjb25zdCBzaWRlID0gcGllX251bSA9PT0gMSA/ICdsZWZ0LWJveC0nIDogJ3JpZ2h0LWJveC0nXG4gICAgYXJyYXlfb2Zfb2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBpID0gNDtcbiAgICAgICAgc3dpdGNoIChvYmoua2V5KSB7XG4gICAgICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMCBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJJbmNvbWUgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMSBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDIgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiUHJvcGVydHkgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMyBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaWRlICsgaSlcbiAgICAgICAgY29uc3QgZGVjaW1hbHMgPSBTdHJpbmcob2JqLnBlcmNlbnQpLnNwbGl0KCcuJylbMV1cbiAgICAgICAgY29uc3QgaW50ZWdlcnMgPSBTdHJpbmcob2JqLnBlcmNlbnQpLnNwbGl0KCcuJylbMF1cbiAgICAgICAgY29uc3Qgc2xpY2VkID0gb2JqLnBlcmNlbnQgPyBpbnRlZ2VycyArICcuJyArIGRlY2ltYWxzLnNsaWNlKDAsIDIpIDogMFxuICAgICAgICBib3guaW5uZXJIVE1MID0gc2xpY2VkICsgJyUnXG4gICAgfSk7XG59XG5cbi8vIGQuQU1PVU5UID09PSAnWCcgPyAwIDogZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDAsXG5leHBvcnQgY29uc3QgZmluZEFtb3VudCA9IChhbW91bnQpID0+IHtcbiAgICByZXR1cm4gYW1vdW50ID09PSAnWCcgPyAwIDogYW1vdW50LnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwXG59XG5cbi8vIGV4cG9ydCBjb25zdCBzdWJEYXRhUHVzaGVyID0gKGl0ZW0pID0+IHtcbi8vICAgICBpZiAoaXRlbSAhPSBcIlQwMFwiICYmIGl0ZW0gIT0gXCJUMDFcIikge1xuLy8gICAgICAgICBzd2l0Y2ggKGl0ZW0uc2xpY2UoMCwgMikpIHtcbi8vICAgICAgICAgICAgIGNhc2UgKFwiVDBcIiB8fCBcIlQxXCIpOlxuLy8gICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2goe1xuLy8gICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4vLyAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4vLyAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnQ6IChmaW5kQW1vdW50KGQuQU1PVU5UKSAvIFRPVEFMKSAqIDEwMFxuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgXG4vLyAgICAgICAgICAgICBjYXNlIFwiVDJcIjpcbi8vICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2goe1xuICAgIFxuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9XG5cbmV4cG9ydCBjb25zdCBidWRnZXRDaXJjbGUgPSAodG90YWwxLCB0b3RhbDIpID0+IHtcbiAgICAvLyBiYXNlZCBvbiBNYXR0aGV3IE1jS2VubmEncyBleGFtcGxlIGF0IGh0dHA6Ly9ibC5vY2tzLm9yZy9tcG1ja2VubmE4L3Jhdy81NjY1MDlkZDNkOWEwOGU1ZjliMi9cbiAgICBpZiAoIXRvdGFsMSB8fCAhdG90YWwyKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICB0b3RhbDEgPSBNYXRoLnNxcnQodG90YWwxKVxuICAgIHRvdGFsMiA9IE1hdGguc3FydCh0b3RhbDIpXG4gICAgLy8gZGVsZXRlIG9sZCBjaXJjbGVzXG4gICAgY29uc3Qgb2xkX2NpcmxjZV8xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1zdmctMScpXG4gICAgY29uc3Qgb2xkX2NpcmxjZV8yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1zdmctMicpXG4gICAgb2xkX2NpcmxjZV8xID8gb2xkX2NpcmxjZV8xLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob2xkX2NpcmxjZV8xKSA6IG51bGxcbiAgICBvbGRfY2lybGNlXzIgPyBvbGRfY2lybGNlXzIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGRfY2lybGNlXzIpIDogbnVsbFxuICAgIFxuICAgIGNvbnN0IGRhdGEgPSBbdG90YWwxLCB0b3RhbDJdXG5cbiAgICBjb25zdCBoZWlnaHQgPSAzMDBcbiAgICBjb25zdCB3aWR0aCA9IDUwMFxuXG4gICAgY29uc3QgY2lyY2xlX2NvbnRhaW5lciA9IGQzLnNlbGVjdCgnI2J1ZGdldC1jaXJjbGUtY29udGFpbmVyJylcblxuICAgIGNvbnN0IHN2ZzEgPSBjaXJjbGVfY29udGFpbmVyLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKS5hdHRyKCdpZCcsICdjaXJjbGUtc3ZnLTEnKTtcblxuICAgIGNvbnN0IHN2ZzIgPSBjaXJjbGVfY29udGFpbmVyLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKS5hdHRyKCdpZCcsICdjaXJjbGUtc3ZnLTInKTtcblxuICAgIGNvbnN0IHJzY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbihbMCwgKGQzLm1heChkYXRhKSkgXSlcbiAgICAgICAgLnJhbmdlKFsxLCAxNTBdKVxuXG4gICAgc3ZnMS5zZWxlY3RBbGwoJy5jaXJjbGVzJykuZGF0YShbdG90YWwxXSlcbiAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZXMnKS5hdHRyKCdjeScsIGhlaWdodCAvIDIpXG4gICAgICAgIC5hdHRyKCdjeCcsIChkLCBpKSA9PiB3aWR0aCAvIDIpXG4gICAgICAgIC5hdHRyKCdmaWxsJywgJyMwYTgwYWUnKVxuXG4gICAgc3ZnMi5zZWxlY3RBbGwoJy5jaXJjbGVzJykuZGF0YShbdG90YWwyXSlcbiAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gcnNjYWxlKGQpXG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGVzJykuYXR0cignY3knLCBoZWlnaHQgLyAyKVxuICAgICAgICAuYXR0cignY3gnLCAoZCwgaSkgPT4gd2lkdGggLyAyKVxuICAgICAgICAuYXR0cignZmlsbCcsICcjMGE4MGFlJylcbn1cblxuZXhwb3J0IGNvbnN0IHN1YkFycmF5TG9jYXRvciA9ICh0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KSA9PiB7ICAvLyBoZWxwZXIgZnVuY3Rpb24gZm9yIGZpbmRpbmcgdGhlIHJpZ2h0IHN1YiBhcnJheS4gQSBiaXQgaGFyZC1jb2RlZC5cbiAgICBzd2l0Y2ggKHRheF90eXBlKSB7XG4gICAgICAgIGNhc2UgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMF1cbiAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMV1cbiAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsyXVxuICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbM11cbiAgICAgICAgY2FzZSBcIlByb3BlcnR5IFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzRdXG4gICAgfVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHdhcyB0YWtlbiBmcm9tIHVzZXIgUGltcCBUcml6a2l0cyBwb3N0IG9uIHN0YWNrb3ZlcmZsb3cgYXQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTU2MDI0OC9wcm9ncmFtbWF0aWNhbGx5LWxpZ2h0ZW4tb3ItZGFya2VuLWEtaGV4LWNvbG9yLW9yLXJnYi1hbmQtYmxlbmQtY29sb3JzXG5leHBvcnQgZnVuY3Rpb24gTGlnaHRlbkRhcmtlbkNvbG9yKGNvbCwgYW10KSB7XG4gICAgdmFyIHVzZVBvdW5kID0gZmFsc2U7XG4gICAgaWYgKGNvbFswXSA9PSBcIiNcIikge1xuICAgICAgICBjb2wgPSBjb2wuc2xpY2UoMSk7XG4gICAgICAgIHVzZVBvdW5kID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgbnVtID0gcGFyc2VJbnQoY29sLCAxNik7XG5cbiAgICB2YXIgciA9IChudW0gPj4gMTYpICsgYW10O1xuXG4gICAgaWYgKHIgPiAyNTUpIHIgPSAyNTU7XG4gICAgZWxzZSBpZiAociA8IDApIHIgPSAwO1xuXG4gICAgdmFyIGIgPSAoKG51bSA+PiA4KSAmIDB4MDBGRikgKyBhbXQ7XG5cbiAgICBpZiAoYiA+IDI1NSkgYiA9IDI1NTtcbiAgICBlbHNlIGlmIChiIDwgMCkgYiA9IDA7XG5cbiAgICB2YXIgZyA9IChudW0gJiAweDAwMDBGRikgKyBhbXQ7XG5cbiAgICBpZiAoZyA+IDI1NSkgZyA9IDI1NTtcbiAgICBlbHNlIGlmIChnIDwgMCkgZyA9IDA7XG5cbiAgICByZXR1cm4gKHVzZVBvdW5kID8gXCIjXCIgOiBcIlwiKSArIChnIHwgKGIgPDwgOCkgfCAociA8PCAxNikpLnRvU3RyaW5nKDE2KTtcbn1cbi8vIFRoaXMgZnVuY3Rpb24gd2FzIGFsc28gdGFrZW4gZnJvbSB1c2VyIFBpbXAgVHJpemtpdHMgcG9zdCBvbiBzdGFja292ZXJmbG93IGF0IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU1NjAyNDgvcHJvZ3JhbW1hdGljYWxseS1saWdodGVuLW9yLWRhcmtlbi1hLWhleC1jb2xvci1vci1yZ2ItYW5kLWJsZW5kLWNvbG9yc1xuZXhwb3J0IGNvbnN0IHBTQkMgPSAocCwgYzAsIGMxLCBsKSA9PiB7XG4gICAgbGV0IHIsIGcsIGIsIFAsIGYsIHQsIGgsIGkgPSBwYXJzZUludCwgbSA9IE1hdGgucm91bmQsIGEgPSB0eXBlb2YgKGMxKSA9PSBcInN0cmluZ1wiO1xuICAgIGlmICh0eXBlb2YgKHApICE9IFwibnVtYmVyXCIgfHwgcCA8IC0xIHx8IHAgPiAxIHx8IHR5cGVvZiAoYzApICE9IFwic3RyaW5nXCIgfHwgKGMwWzBdICE9ICdyJyAmJiBjMFswXSAhPSAnIycpIHx8IChjMSAmJiAhYSkpIHJldHVybiBudWxsO1xuICAgIGlmICghdGhpcy5wU0JDcikgdGhpcy5wU0JDciA9IChkKSA9PiB7XG4gICAgICAgIGxldCBuID0gZC5sZW5ndGgsIHggPSB7fTtcbiAgICAgICAgaWYgKG4gPiA5KSB7XG4gICAgICAgICAgICBbciwgZywgYiwgYV0gPSBkID0gZC5zcGxpdChcIixcIiksIG4gPSBkLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChuIDwgMyB8fCBuID4gNCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB4LnIgPSBpKHJbM10gPT0gXCJhXCIgPyByLnNsaWNlKDUpIDogci5zbGljZSg0KSksIHguZyA9IGkoZyksIHguYiA9IGkoYiksIHguYSA9IGEgPyBwYXJzZUZsb2F0KGEpIDogLTFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChuID09IDggfHwgbiA9PSA2IHx8IG4gPCA0KSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGlmIChuIDwgNikgZCA9IFwiI1wiICsgZFsxXSArIGRbMV0gKyBkWzJdICsgZFsyXSArIGRbM10gKyBkWzNdICsgKG4gPiA0ID8gZFs0XSArIGRbNF0gOiBcIlwiKTtcbiAgICAgICAgICAgIGQgPSBpKGQuc2xpY2UoMSksIDE2KTtcbiAgICAgICAgICAgIGlmIChuID09IDkgfHwgbiA9PSA1KSB4LnIgPSBkID4+IDI0ICYgMjU1LCB4LmcgPSBkID4+IDE2ICYgMjU1LCB4LmIgPSBkID4+IDggJiAyNTUsIHguYSA9IG0oKGQgJiAyNTUpIC8gMC4yNTUpIC8gMTAwMDtcbiAgICAgICAgICAgIGVsc2UgeC5yID0gZCA+PiAxNiwgeC5nID0gZCA+PiA4ICYgMjU1LCB4LmIgPSBkICYgMjU1LCB4LmEgPSAtMVxuICAgICAgICB9IHJldHVybiB4XG4gICAgfTtcbiAgICBoID0gYzAubGVuZ3RoID4gOSwgaCA9IGEgPyBjMS5sZW5ndGggPiA5ID8gdHJ1ZSA6IGMxID09IFwiY1wiID8gIWggOiBmYWxzZSA6IGgsIGYgPSBwU0JDcihjMCksIFAgPSBwIDwgMCwgdCA9IGMxICYmIGMxICE9IFwiY1wiID8gcFNCQ3IoYzEpIDogUCA/IHsgcjogMCwgZzogMCwgYjogMCwgYTogLTEgfSA6IHsgcjogMjU1LCBnOiAyNTUsIGI6IDI1NSwgYTogLTEgfSwgcCA9IFAgPyBwICogLTEgOiBwLCBQID0gMSAtIHA7XG4gICAgaWYgKCFmIHx8ICF0KSByZXR1cm4gbnVsbDtcbiAgICBpZiAobCkgciA9IG0oUCAqIGYuciArIHAgKiB0LnIpLCBnID0gbShQICogZi5nICsgcCAqIHQuZyksIGIgPSBtKFAgKiBmLmIgKyBwICogdC5iKTtcbiAgICBlbHNlIHIgPSBtKChQICogZi5yICoqIDIgKyBwICogdC5yICoqIDIpICoqIDAuNSksIGcgPSBtKChQICogZi5nICoqIDIgKyBwICogdC5nICoqIDIpICoqIDAuNSksIGIgPSBtKChQICogZi5iICoqIDIgKyBwICogdC5iICoqIDIpICoqIDAuNSk7XG4gICAgYSA9IGYuYSwgdCA9IHQuYSwgZiA9IGEgPj0gMCB8fCB0ID49IDAsIGEgPSBmID8gYSA8IDAgPyB0IDogdCA8IDAgPyBhIDogYSAqIFAgKyB0ICogcCA6IDA7XG4gICAgaWYgKGgpIHJldHVybiBcInJnYlwiICsgKGYgPyBcImEoXCIgOiBcIihcIikgKyByICsgXCIsXCIgKyBnICsgXCIsXCIgKyBiICsgKGYgPyBcIixcIiArIG0oYSAqIDEwMDApIC8gMTAwMCA6IFwiXCIpICsgXCIpXCI7XG4gICAgZWxzZSByZXR1cm4gXCIjXCIgKyAoNDI5NDk2NzI5NiArIHIgKiAxNjc3NzIxNiArIGcgKiA2NTUzNiArIGIgKiAyNTYgKyAoZiA/IG0oYSAqIDI1NSkgOiAwKSkudG9TdHJpbmcoMTYpLnNsaWNlKDEsIGYgPyB1bmRlZmluZWQgOiAtMilcbn1cbiIsIi8vIEEgbG90IG9mIHRoaXMgY29kZSB3YXMgYmFzZWQgaGVhdmlseSBvZmYgb2YgS2FydGhpayBUaG90YSdzIHlvdXR1YmUgdHV0b3JpYWwgXCJJbnRyb2R1Y3Rpb24gdG8gZDMuanMgPSBQaWUgQ2hhcnQgYW5kIERvbnV0IENoYXJ0XCJcbi8vIFRoZSBsZWdlbmQgY29kZSB3YXMgZnJvbSBDcnlwdGVycyBJbmZvdGVjaCdzIHlvdXR1YmUgdHV0b3JpYWwgXCJQaWUgQ2hhcnQgdXNpbmcgRDMuanNcIlxuXG5pbXBvcnQgeyBhc3NpZ25Cb3gsIGZpbmRBbW91bnQsIGJ1ZGdldENpcmNsZSB9IGZyb20gJy4vaGVscGVyX2Z1bmN0aW9ucydcbmltcG9ydCB7IHN1YkRhdGEgfSBmcm9tICcuL3N1YmRhdGFfZ2VuZXJhdG9yJ1xuLy8gXG5leHBvcnQgY29uc3QgQ09MT1JTID0gW1wiI2E2NzUxZVwiLCBcIiM5YTAwNDdcIiwgXCIjNjZhNTFlXCIsIFwiIzc0NzBiM1wiLCBcIiNlODJiOGFcIl1cbmV4cG9ydCBjb25zdCBDSVJDTEVfQ09MT1JTID0gW0NPTE9SU1sxXSwgQ09MT1JTWzBdLCBDT0xPUlNbNF0sIENPTE9SU1syXSwgQ09MT1JTWzNdXVxuLy8gZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIk90aGVyIFRheGVzXCJdXG5leHBvcnQgY29uc3QgTEFCRUxTID0gW1wiT3RoZXIgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBUYXhlc1wiXVxuLy8gZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKGNzdlBhdGgsIHNlY3RvciwgYW1vdW50LCBzdGF0ZSwgbXVsdGlwbGllciA9IDEsIHNraXAgPSAxKSB7XG5leHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUsIHRheF90eXBlLCBwaWVfbnVtLCBjc3YgPSBcIi4vc3JjL2Fzc2V0cy9kYXRhL0ZZMjAxOC1TVEMtRGV0YWlsZWQtVGFibGUuY3N2XCIpIHtcblxuICAgIC8vIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YWxzLVwiICsgcGllX251bSlcbiAgICAvLyByZW1vdmUgPyByZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUpIDogbnVsbFxuXG4gICAgLy8gY29uc3QgcmVtb3ZlMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGV0YWlscy1cIiArIHBpZV9udW0pXG4gICAgLy8gcmVtb3ZlMiA/IHJlbW92ZTIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUyKSA6IG51bGxcblxuICAgIGNvbnN0IGgxID0gZDMuc2VsZWN0KCcjdG90YWxzLWhlYWRlci0nICsgcGllX251bSlcbiAgICBjb25zdCBzcGFuID0gZDMuc2VsZWN0KCcjdG90YWxzLXNwYW4tJyArIHBpZV9udW0pXG4gICAgY29uc3QgaDIgPSBkMy5zZWxlY3QoXCIjZGV0YWlscy1cIiArIHBpZV9udW0pXG5cblxuICAgIGxldCBUT1RBTCA9IDA7XG4gICAgbGV0IFRZUEVTID0gW11cbiAgICAvLyBDSVJDTEUgVElNRSBCQUJZXG4gICAgLy8gbWFyZ2luIGFuZCByYWRpdXNcbiAgICBjb25zdCBtYXJnaW4gPSB7IHRvcDogMjAwLCByaWdodDogMjAwLCBib3R0b206IDIwMCwgbGVmdDogMjAwIH0sXG4gICAgICAgIGhlaWdodCA9IDEwMDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSxcbiAgICAgICAgd2lkdGggPSAxMDAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXG4gICAgICAgIHJhZGl1cyA9IHdpZHRoIC8gMjtcblxuXG5cbiAgICBjb25zdCBjb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoQ09MT1JTKTtcblxuICAgIC8vIGFyYyBnZW5lcmF0b3JcbiAgICBjb25zdCBhcmMgPSBkMy5hcmMoKVxuICAgICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gMTApXG4gICAgICAgIC8vIC5pbm5lclJhZGl1cygwKTsgLy8gZm9yIGNpcmNsZVxuICAgICAgICAuaW5uZXJSYWRpdXMocmFkaXVzIC0gMTAwKSAvLyBmb3IgZG9udXRcblxuICAgIC8vIGNvbnN0IGxhYmxlQXJjID0gZDMuYXJjKClcbiAgICAvLyAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDUwKVxuICAgIC8vICAgICAuaW5uZXJSYWRpdXMocmFkaXVzIC0gNTApO1xuXG4gICAgLy8gcGllIGdlbmVyYXRvclxuICAgIGNvbnN0IHBpZSA9IGQzLnBpZSgpXG4gICAgICAgIC8vIC5zb3J0KG51bGwpXG4gICAgICAgIC52YWx1ZShkID0+IGQuYW1vdW50KTtcblxuICAgIC8vIGRlZmluZSBzdmcgXG4gICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiLnBpZS1cIiArIHBpZV9udW0pLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAuYXR0cihcImlkXCIsIFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgd2lkdGggLyAyICsgXCIsXCIgKyBoZWlnaHQgLyAyICsgXCIpXCIpXG5cbiAgICAvLyBpbXBvcnQgZGF0YVxuICAgIGQzLmNzdihjc3YpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBhcnJheXMgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIHN1YiBsZXZlbCB0YXggZGF0YVxuICAgICAgICBsZXQgc2FsZXNfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgbGljZW5zZV90YXhlcyA9IFtdXG4gICAgICAgIGxldCBpbmNvbWVfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgb3RoZXJfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgcHJvcGVydHlfdGF4ZXMgPSBbXVxuICAgICAgICAvLyBsZXQgc2FsZXNfdGF4X29iaiA9IHsgdGF4X2dyb3VwOiBMQUJFTFNbNF0gfVxuICAgICAgICAvLyBwYXJzZSB0aGUgY3N2XG4gICAgICAgIGRhdGEuZm9yRWFjaCgoZCwgaSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZC5HZW9fTmFtZSA9PT0gc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtID09PSBcIlQwMFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIFRPVEFMID0gZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gIT0gXCJUMDBcIikgeyAgLy8gZG9uJ3Qgd2FudCB0byBjYXRjaCBUb3RhbCBvciBQcm9wZXJ0eSBUYXhlc1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGF4X29iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50X29mX3RvdGFsOiAoZmluZEFtb3VudChkLkFNT1VOVCkgLyBUT1RBTCkgKiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGQuaXRlbS5zbGljZSgwLDIpKSB7IC8vIGZpbGwgdXAgc3ViIGFycmF5c1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQwXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDlcIikgeyBzYWxlc190YXhlcy5wdXNoKHRheF9vYmopIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gPT09IFwiVDAxXCIpIHsgcHJvcGVydHlfdGF4ZXMucHVzaCh0YXhfb2JqKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2FsZXNfdGF4X29ialtkLlRheF9UeXBlXSA9IGZpbmRBbW91bnQoZC5BTU9VTlQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDFcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYWxlc190YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDJcIjogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGljZW5zZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNvbWVfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQ1XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQ5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRheF90eXBlLmluY2x1ZGVzKGQuaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSAhPSAnVDAwJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVFlQRVMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBkLlRheF9UeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKChmaW5kQW1vdW50KGQuQU1PVU5UKSkgLyBUT1RBTCkgKiAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGQua2V5ID0gZC5UYXhfVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgZC5hbW91bnQgPSBmaW5kQW1vdW50KGQuQU1PVU5UKTtcbiAgICAgICAgICAgICAgICAgICAgZC5wZXJjZW50ID0gKChmaW5kQW1vdW50KGQuQU1PVU5UKSkgLyBUT1RBTCkgKiAxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgY29uc3QgY29udGFpbmVyX2FycmF5ID0gW10gIC8vIHNldHRpbmcgdXAgY29udGFpbmVyIGFycmF5IGZvciBwYXNzaW5nIGludG8gY2xpY2sgaGFuZGxlclxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChzYWxlc190YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2gobGljZW5zZV90YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2goaW5jb21lX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChvdGhlcl90YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2gocHJvcGVydHlfdGF4ZXMpXG4gICAgICAgIC8vIHNldCBoMSBhZnRlciB0b3RhbCBoYXMgYmVlbiBkZWZpbmVkXG4gICAgICAgIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE4IHdhcyBcIilcbiAgICAgICAgc3Bhbi50ZXh0KFwiJFwiICsgZDMuZm9ybWF0KCcsJykoVE9UQUwpKVxuICAgICAgICBoMi50ZXh0KFwiXCIpXG4gICAgICAgIC8vIGF0dGVtcHQgYnVkZ2V0Q2lyY2xlIGNhbGxcbiAgICAgICAgYnVkZ2V0Q2lyY2xlKFRPVEFMKVxuICAgICAgICAvLyBzZXQgdXAgdGhlIHBlcmNlbnRhZ2VzIGluIHRoZSBjZW50ZXIgYm94XG4gICAgICAgIGFzc2lnbkJveChUWVBFUywgcGllX251bSlcblxuICAgICAgICBjb25zdCBnID0gc3ZnLnNlbGVjdEFsbChcIi5hcmNcIilcbiAgICAgICAgICAgIC5kYXRhKHBpZShkYXRhKSlcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcImdcIikgIC8vIEFuZCB0aGlzIGxpbmUgdG8gZ3JvdyB0aGUgbnVtYmVyIG9mIGcncyB0byB0aGUgZGF0YSBzZXQgc2l6ZVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImFyY1wiKVxuICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCAoZCwgaSkgPT4gZC52YWx1ZSA9PT0gVE9UQUwgPyBcIm5vbmVcIiA6IFwibnVsbFwiKTsgIC8vIGF0dGVtcHQgdG8gcmVuZGVyIGhhbGYgdGhlIGNoYXJ0IGludmlzaWJsZVxuICAgICAgICAgICAgXG4gICAgICAgIC8vIGFwcGVuZCB0aGUgcGF0aCBvZiB0aGUgYXJjXG4gICAgICAgIGNvbnN0IHBhdGggPSBnLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBhcmMpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGQgPT4gY29sb3JzKGQuZGF0YS5rZXkpKVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmVhc2UoZDMuZWFzZUxpbmVhcilcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAuYXR0clR3ZWVuKCdkJywgcGllVHdlZW4pO1xuICAgICAgICBcbiAgICAgICAgLy8gcGF0aC5vbihcIm1vdXNlb3ZlclwiLCAoZCwgaSkgPT4geyAgLy8gd2h5IGRvZXNuJ3QgdGhpcyB3b3JrP1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGQpXG4gICAgICAgIC8vICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnRyYW5zaXRpb24oKVxuICAgICAgICAvLyAgICAgICAgICAgICAuZHVyYXRpb24oJzUwJylcbiAgICAgICAgLy8gICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAnLjg1JylcbiAgICAgICAgLy8gICAgICAgICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgJ3BvaW50ZXInKVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gZGV0ZXJtaW5lIGhvdyB0byBmbGlwIHRoZSBwaWVzXG4gICAgICAgIGlmIChwaWVfbnVtID09PSAyKSB7Ly8gZmxpcCB0aGUgc2Vjb25kIHBpZVxuICAgICAgICAgICAgZy5hdHRyKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWCgtMSkgdHJhbnNsYXRlKDMwMHB4LCAwcHgpIHNjYWxlWSgtMSlcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwic2NhbGVZKC0xKVwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBldmVudCBoYW5kbGVyc1xuICAgICAgICBnLm9uKFwibW91c2VvdmVyXCIsIChkLCBpKSA9PiB7ICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKCc1MCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAnLjg1JylcbiAgICAgICAgICAgICAgICAuYXR0cihcImN1cnNvclwiLCAncG9pbnRlcicpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGVsZSA9PiB7XG4gICAgICAgICAgICAvLyBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgJFwiICsgZDMuZm9ybWF0KCcsJykoVE9UQUwpKVxuICAgICAgICAgICAgLy8gaDIudGV4dChcIlwiKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrJywgc3ViRGF0YShjb250YWluZXJfYXJyYXksIHBpZV9udW0pKVxuICAgICAgICBjb25zb2xlLmxvZyhwaWVfbnVtKVxuICAgICAgICBjb25zdCBzcGFuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbHMtc3Bhbi0xJylcbiAgICAgICAgY29uc3Qgc3BhbjIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWxzLXNwYW4tMicpXG5cbiAgICAgICAgaWYgKHNwYW4xLmlubmVyVGV4dFxuICAgICAgICAgICAgJiYgc3BhbjIuaW5uZXJUZXh0KSB7XG4gICAgICAgICAgICBjb25zdCB0b3RhbDEgPSBwYXJzZUludChzcGFuMS5pbm5lclRleHQuc2xpY2UoMSkuc3BsaXQoJywnKS5qb2luKCcnKSlcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsMiA9IHBhcnNlSW50KHNwYW4yLmlubmVyVGV4dC5zbGljZSgxKS5zcGxpdCgnLCcpLmpvaW4oJycpKVxuICAgICAgICAgICAgYnVkZ2V0Q2lyY2xlKHRvdGFsMSwgdG90YWwyKVxuICAgICAgICB9ICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHsgaWYgKGVycm9yKSB0aHJvdyBlcnJvciB9KVxuICAgIFxuICAgIGNvbnN0IHBpZVR3ZWVuID0gYiA9PiB7XG4gICAgICAgIGIuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZTogMCB9LCBiKVxuICAgICAgICByZXR1cm4gKHQpID0+IHsgcmV0dXJuIGFyYyhpKHQpKSB9XG4gICAgfSAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgICIsImltcG9ydCB7IENJUkNMRV9DT0xPUlMsIExBQkVMU30gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgcGllTGVnZW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IG1hc3Rlcl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgbWFzdGVyX2xpc3QuY2xhc3NMaXN0LmFkZCgnbWFzdGVyLWxpc3QnKVxuXG4gICAgY29uc3QgbGVmdF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHRleHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCByaWdodF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgbGVmdF9saXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnQtbGlzdCcpICBcbiAgICB0ZXh0X2xpc3QuY2xhc3NMaXN0LmFkZCgndGV4dC1saXN0JykgIFxuICAgIHJpZ2h0X2xpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHQtbGlzdCcpIFxuXG4gICAgZm9yIChsZXQgaSA9IExBQkVMUy5sZW5ndGggLSAxIDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxlZnRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCB0ZXh0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgcmlnaHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIGxlZnRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdsZWZ0LWJveCcpXG4gICAgICAgIGxlZnRfYm94LmlkID0gKCdsZWZ0LWJveC0nICsgaSlcbiAgICAgICAgbGVmdF9ib3guc3R5bGUuY29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgcmlnaHRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdyaWdodC1ib3gnKVxuICAgICAgICByaWdodF9ib3guaWQgPSAoJ3JpZ2h0LWJveC0nICsgaSlcbiAgICAgICAgcmlnaHRfYm94LnN0eWxlLmNvbG9yID0gQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIHRleHRfYm94LmNsYXNzTGlzdC5hZGQoJ3RleHQtYm94JylcbiAgICAgICAgdGV4dF9ib3guaW5uZXJIVE1MID0gTEFCRUxTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgXCIgKyBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgbGVmdF9saXN0LmFwcGVuZENoaWxkKGxlZnRfYm94KVxuICAgICAgICB0ZXh0X2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9ib3gpXG4gICAgICAgIHJpZ2h0X2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfYm94KVxuICAgIH1cblxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKGxlZnRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfbGlzdClcbiAgICByZXR1cm4gbWFzdGVyX2xpc3Rcbn1cblxuY29uc3Qgc3VibGlzdHMgPSAobGFiZWwsIGNvbG9yKSA9PiB7XG4gICAgY29uc3QgbGlzdHMgPSBbXVxuXG5cbiAgICBsZXN0bGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0bGlzdCcpXG4gICAgdGV4dGxpc3QuY2xhc3NMaXN0LmFkZCgndGV4dGxpc3QnKVxuICAgIHJpZ2h0bGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodGxpc3QnKVxuXG4gICAgY29uc3QgbGVmdEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCByaWdodEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG5cbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsZWZ0Qm94KVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGkpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChyaWdodEJveClcbiAgICByZXR1cm4gc3VibGlzdFxufSIsImltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgVE9QX0xFVkVMID0gWydUMDAnLCAnVDAxJywgJ1RBMScsICdUQTMnLCAnVEE0JywgJ1RBNSddXG5jb25zdCBTVEFURV9OQU1FUyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggQ2Fyb2xpbmEnLCAnTm9ydGggRGFrb3RhJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ11cblxuLy8gZXhwb3J0IGNvbnN0IHNlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcblxuLy8gICAgIC8vIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpICAvLyByZXZpc2l0IGlmIHRpbWUgdG8gbWFrZSBjdXN0b20gc2VsZWN0XG4vLyAgICAgLy8gY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luaXRpYWwtY29udGFpbmVyJylcblxuLy8gICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIilcbi8vICAgICBzZWxlY3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuXG4vLyAgICAgY29uc3Qgc3RhdGVTZWxlY3RvciA9IGUgPT4ge1xuLy8gICAgICAgICBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4vLyAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbi8vICAgICAgICAgc3ZnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3ZnKVxuLy8gICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgVE9QX0xFVkVMLCBwaWVfbnVtKVxuXG4vLyAgICAgICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gXCItbGVmdFwiIDogXCItcmlnaHRcIlxuLy8gICAgICAgICAvLyBjb25zdCBoMiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzdGF0ZVwiICsgc2lkZSlbMF1cbi8vICAgICAgICAgLy8gaDIuaW5uZXJIVE1MID0gc3RhdGVcbi8vICAgICB9XG5cbi8vICAgICBTVEFURV9OQU1FUy5mb3JFYWNoKHN0YXRlID0+IHtcbi8vICAgICAgICAgY29uc3QgZGVmYXVsdF9zdGF0ZSA9IHBpZV9udW0gPT09IDEgPyBTVEFURV9OQU1FU1swXSA6IFNUQVRFX05BTUVTW1NUQVRFX05BTUVTLmxlbmd0aCAtIDFdXG4vLyAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcbi8vICAgICAgICAgaWYgKHN0YXRlID09PSBkZWZhdWx0X3N0YXRlKSB7XG4vLyAgICAgICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgdHJ1ZSlcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBvcHRpb24uaW5uZXJIVE1MID0gc3RhdGVcbi8vICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHN0YXRlKVxuLy8gICAgICAgICAvLyBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuLy8gICAgICAgICAvLyBvcHRpb24uc2V0QXR0cmlidXRlKFwib25jbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbi8vICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbilcbi8vICAgICB9KVxuLy8gICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHN0YXRlU2VsZWN0b3IpXG4vLyAgICAgLy8gY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdClcbi8vICAgICAvLyByZXR1cm4gY29udGFpbmVyXG4vLyAgICAgcmV0dXJuIHNlbGVjdFxuLy8gfVxuXG4vLyBjb25zdCBwaGFzZU91dCA9IChub2RlKSA9PiB7XG5cbi8vICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbi8vIH1cblxuZXhwb3J0IGNvbnN0IHN0YXRlX3NlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcbiBcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcInNlbGVjdC13cmFwcGVyLVwiICsgcGllX251bSlcbiAgICB3cmFwcGVyLmlkID0gXCJzZWxlY3Qtd3JhcHBlci1cIiArIHBpZV9udW1cblxuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgc2VsZWN0LmlubmVySFRNTCA9IHBpZV9udW0gPT09IDEgPyAnQWxhYmFtYScgOiAnV3lvbWluZydcbiAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwic2VsZWN0LVwiICsgcGllX251bSlcbiAgICBzZWxlY3QuaWQgPSBcInNlbGVjdC1cIiArIHBpZV9udW1cblxuICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgfSlcbiAgICBcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSAgLy8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHNvIHRoYXQgaWYgSSBjbGljayBhbnl3aGVyZSBlbHNlIHRoZSBsaXN0IGRpc2FwcGVhcnNcbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICB9KVxuICAgIFxuICAgIGNvbnN0IHN0YXRlU2VsZWN0b3IgPSBzdGF0ZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdC1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzZWxlY3QuaW5uZXJUZXh0ID0gc3RhdGVcbiAgICAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIHN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZylcbiAgICAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RhdGVfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ3N0YXRlLWxpc3QtJyArIHBpZV9udW0pXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIHN0YXRlX2xpc3QuaWQgPSAnc3RhdGUtbGlzdC0nICsgcGllX251bVxuICAgIFxuICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZV9saXN0X2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmlubmVySFRNTCA9IHN0YXRlXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzdGF0ZSlcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbiAgICAgICAgc3RhdGVfbGlzdC5hcHBlbmRDaGlsZChzdGF0ZV9saXN0X2l0ZW0pXG4gICAgfSlcbiAgICBcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNlbGVjdClcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHN0YXRlX2xpc3QpXG4gICAgXG4gICAgcmV0dXJuIHdyYXBwZXJcbn1cblxuLy8gY29uc3QgcGhhc2VPdXQgPSAobm9kZSkgPT4ge1xuXG4vLyAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4vLyB9IiwiaW1wb3J0IHsgc3ViQXJyYXlMb2NhdG9yLCBMaWdodGVuRGFya2VuQ29sb3IgfSBmcm9tICcuL2hlbHBlcl9mdW5jdGlvbnMnXG5pbXBvcnQgeyBDSVJDTEVfQ09MT1JTIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJztcblxuZXhwb3J0IGNvbnN0IHN1YkRhdGEgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtLCBjb2xvcl9zdHJpbmcgPSBcIiMzRjZEMkFcIikgPT4ge1xuICAgIC8vIGEgbG90IG9mIHRoaXMgY29kZSB3YXMgbGVhcm5lZCBmcm9tIE1pY2hhZWwgU3RhbmFsYW5kJ3MgXCJTdGFja2VkIGJhciBjaGFydCB3aXRoIHRvb2x0aXBzXCIgdHV0b3JpYWwgYXQgaHR0cDovL2JsLm9ja3Mub3JnL21zdGFuYWxhbmQvNjEwMDcxM1xuICAgIHJldHVybiAoZWxlKSA9PiB7XG4gICAgICAgIGRlYnVnZ2VyXG5cbiAgICAgICAgY29uc3QgdGF4X3R5cGUgPSBlbGUuZGF0YS5rZXlcbiAgICAgICAgY29sb3Jfc3RyaW5nID0gY29sb3JDaG9vc2VyKHRheF90eXBlKVxuICAgICAgICBjb25zdCBzdWJfYXJyYXkgPSBzdWJBcnJheUxvY2F0b3IodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSlcblxuICAgICAgICBcbiAgICAgICAgbGV0IHRheF9zdGFjayA9IHt9XG4gICAgICAgIC8vIHNldHRpbmcgdXAga2V5c1xuICAgICAgICBsZXQga2V5cyA9IFtdXG4gICAgICAgIC8vIGtleXMucHVzaCh0YXhfdHlwZSlcbiAgICAgICAgc3ViX2FycmF5LmZvckVhY2goKHN1Yl90YXgsIGkpID0+IHtcbiAgICAgICAgICAgIGtleXMucHVzaChzdWJfdGF4LmtleSlcbiAgICAgICAgICAgIHRheF9zdGFja1tzdWJfdGF4LmtleV0gPSBzdWJfdGF4LnBlcmNlbnRfb2ZfdG90YWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSA5MCAgLy8gc2V0dGluZyB0aGUgZGltZW5zaW9ucyB0byBjb3JyZXNwb25kIHRvIHRoZSBwaWUgY2hhcnRzJ1xuICAgICAgICBjb25zdCBoZWlnaHQgPSA1MDBcblxuICAgICAgICBjb25zdCB0b29sdGlwV2lkdGggPSAxMjAgLy8gd2lsbCBhbHRlciB0aGVzZSBhcyBuZWVkZWRcbiAgICAgICAgY29uc3QgdG9vbHRpcEhlaWdodCA9IDQwXG4gICAgICAgIFxuICAgICAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIjc3ViLWRhdGEtXCIgKyBwaWVfbnVtKVxuICAgICAgICAgICAgLmFwcGVuZChcInN2Z1wiKSBcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAgICAgLmFwcGVuZChcImdcIikuYXR0cignY2xhc3MnLCAnc3ViLWRhdGEtJyArIHBpZV9udW0pXG5cbiAgICAgICAgLy8gc2V0IHRoZSBsYXllcnMgb2YgdGhlIHN0YWNrZWQgYmFyXG4gICAgICAgIC8vIGNvbnN0IGxheWVycyA9IGQzLnN0YWNrKCkoW3RheF90eXBlXS5tYXAodGF4ID0+IHsgIC8vIHNob3VsZCB1bHRpbWF0ZWx5IGp1c3QgYmUgdGhlIG9uZSBsYXllclxuICAgICAgICAvLyAgICAgcmV0dXJuIHN1Yl9hcnJheS5tYXAoZCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHsgeDogZC5rZXksIHk6IGQuYW1vdW50LCBwZXJjZW50OiBkLnBlcmNlbnQgfVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gfSkpXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZDMuc3RhY2soKVxuICAgICAgICAgICAgLmtleXMoa2V5cylcbiAgICAgICAgICAgIC5vcmRlcihkMy5zdGFja09yZGVyTm9uZSlcbiAgICAgICAgICAgIC5vZmZzZXQoZDMuc3RhY2tPZmZzZXROb25lKVxuICAgICAgICBsZXQgdGF4X3N0YWNrX2FycmF5ID0gW11cbiAgICAgICAgdGF4X3N0YWNrX2FycmF5LnB1c2godGF4X3N0YWNrKVxuICAgICAgICBjb25zdCBsYXllcnMgPSBzdGFjayh0YXhfc3RhY2tfYXJyYXkpXG5cbiAgICAgICAgLy8gY29uc3QgeCA9IGQzLnNjYWxlT3JkaW5hbCgpXG4gICAgICAgIC8vICAgICAuZG9tYWluKGxheWVyc1swXS5tYXAoZCA9PiBkLngpKVxuICAgICAgICAvLyAgICAgLy8gLnJhbmdlKFsxMCwgd2lkdGhdLCAwKSAgLy8gbWF5IGJlIGEgcXVpY2tlciB3YXkgdG8gZG8gdGhpcyBhcyB0aGVyZSBpcyBvbmx5IG9uZSBiYXJcbiAgICAgICAgLy8gICAgIC5yYW5nZShbd2lkdGhdKVxuICAgICAgICBjb25zdCB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCAxXSlcbiAgICAgICAgICAgIC5yYW5nZShbMCwgd2lkdGhdKVxuXG4gICAgICAgIC8vIGNvbnN0IGNvbG9ycyA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLy8gICAgIC5kb21haW4oWzEsIDEwXSlcbiAgICAgICAgLy8gICAgIC5yYW5nZShbXCJyZWRcIiwgXCJibHVlXCJdKVxuXG4gICAgICAgIGNvbnN0IGNvbG9ycyA9IFtjb2xvcl9zdHJpbmddXG4gICAgICAgIGNvbnN0IGRlY3JlbWVudCA9IDEwMCAvIGtleXMubGVuZ3RoXG4gICAgICAgIGxldCBuZXh0X2NvbG9yID0gTGlnaHRlbkRhcmtlbkNvbG9yKGNvbG9yX3N0cmluZywgZGVjcmVtZW50KVxuICAgICAgICB3aGlsZSAoY29sb3JzLmxlbmd0aCA8IGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb2xvcnMucHVzaChuZXh0X2NvbG9yKVxuICAgICAgICAgICAgbmV4dF9jb2xvciA9IExpZ2h0ZW5EYXJrZW5Db2xvcihuZXh0X2NvbG9yLCBkZWNyZW1lbnQpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhjb2xvcnMpXG5cbiAgICAgICAgY29uc3QgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbMCwgZDMuc3VtKE9iamVjdC52YWx1ZXModGF4X3N0YWNrKSldKSAgLy8gdGhlIGluY3JlbWVudCB1cCB0byB0aGUgdG90YWxcbiAgICAgICAgICAgIC8vIC5yYW5nZShbaGVpZ2h0LCAwXSlcbiAgICAgICAgICAgIC5yYW5nZShbMCwgaGVpZ2h0XSlcblxuICAgICAgICBjb25zdCBnID0gc3ZnLnNlbGVjdEFsbChcIi5zdWItdGF4ZXNcIikgIC8vIG5vIGcgYXQgdGhpcyBwb2ludCwgYnV0IHRoZXkgd2lsbCBoYXZlIHRoaXMgY2xhc3NcbiAgICAgICAgICAgIC5kYXRhKGxheWVycykuZW50ZXIoKSAgLy8gbm93IHRoZXJlIHdpbGwgYmUgYSBnIGZvciBldmVyeSBiYXIgd2l0aGluIHRoZSBncmFwaC5cbiAgICAgICAgICAgIC5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBcInN1Yi10YXhlc1wiKVxuICAgICAgICAvLyAuYXR0cignZmlsbCcsIGQgPT4ge1xuICAgICAgICAvLyAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgLy8gICAgIHJldHVybiBjb2xvcnMoZCl9KVxuXG4gICAgICAgIGNvbnN0IHJlY3QgPSBnLnNlbGVjdEFsbChcInJlY3RcIikgIC8vIG1ha2luZyBlYWNoIG9iaiBvZiB0aGUgY29ycmVzcG9uZCB0byBhIHJlY3Qgd2l0aGluIHRoZSBnXG4gICAgICAgICAgICAuZGF0YShsYXllciA9PiBsYXllcik7IC8vIHB1bGxpbmcgb3V0IGVhY2ggaW5kaXZpZHVhbCBvYmpcbiAgICAgICAgcmVjdC5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHJlY3QuZW50ZXIoKS5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgICAgICAuYXR0cigneCcsIGQgPT4geFNjYWxlKDApKSAgLy8gcGFzc2luZyBlYWNoIG9iaidzIHggdmFsdWUgdG8gdGhlIGQzIHggZnVuY3Rpb24gZGVmaW5lZCBhYm92ZVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBsYXllciA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0IC0geVNjYWxlKGxheWVyWzFdKVxuICAgICAgICAgICAgfSkgIC8vIHkwIGlzIHRoZSBoZWlnaHQgd2hlcmUgZWFjaCBzZWdtZW50IGluIHRoZSBzdGFjayBzdGFydHNcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHhTY2FsZSgxKSkgIC8vIHByb2JhYmx5IGNhbiBoYXJkIGNvZGUsIHNpbmNlIG9ubHkgb25lIGJhclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGJhciA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgICAgICByZXR1cm4geVNjYWxlKGJhclsxXSAtIGJhclswXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsIGQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbG9ycy5wb3AoKVxuICAgICAgICAgICAgfSkgIC8vIGhlaWdodCBpcyBzZXQgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IHBsdXMgdGhlIGhlaWdodCwgYW5kIGFsbCB0aGF0IHN1YnRyYWN0ZWQgZnJvbSB0aGUgc3RhcnRpbmcgcG9pbnQgZHVlIHRvIHkgdmFsdWVzIGJlZ2luaW5nIGF0IHRvcCBvZiBzY3JlZW5cbiAgICAgICAgLy8gICAgIC5vbignbW91c2VvdmVyJywgKCkgPT4gdG9vbHRpcC5zdHlsZShcImRpc3BsYXlcIiwgdHJ1ZSkpICAvLyB3YW50IHRoZSBpbmZvIGJveCB0byBzd2l0Y2ggYmV0d2VlbiB2aXNpYmxlIGFuZCBpbml2aXMgYmFzZWQgb24gbW91c2VvdmVyXG4gICAgICAgIC8vICAgICAub24oJ21vdXNlb3V0JywgKCkgPT4gdG9vbHRpcC5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpKVxuICAgICAgICAvLyAgICAgLm9uKCdtb3VzZW1vdmUnLCBkID0+IHsgIC8vIHRoaXMgaXMgZ29pbmcgdG8gYmUgYSBzd2VldCBlZmZlY3QhXG4gICAgICAgIC8vICAgICAgICAgY29uc3QgeFBvcyA9IGQzLm1vdXNlKHRoaXMpWzBdIC0gKHRvb2x0aXBXaWR0aCAvIDIpIC8vIHRoaXNbMF0gY29ycmVzcG9uZHMgdG8gbW91c2UncyB4IHBvcywgYW5kIHB1c2hpbmcgaXQgbGVmdCBieSBoYWxmIG9mIHRoZSB0b29sdGlwJ3Mgd2lkdGggZW5zdXJlIGl0IGlzIGNlbnRlcmVkXG4gICAgICAgIC8vICAgICAgICAgY29uc3QgeVBvcyA9IGQzLm1vdXNlKHRoaXMpWzFdIC0gMjUgLy8gcHV0cyB0aGUgdG9vbHRpcCB1cCBhIGJpdCBhYm92ZSB0aGUgY3Vyc29yXG4gICAgICAgIC8vICAgICAgICAgdG9vbHRpcC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgeFBvcyArICcsJyArIHlQb3MgKyAnKScpXG4gICAgICAgIC8vICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJ3RleHQnKS50ZXh0KGQucGVyY2VudF9vZl90b3RhbCkgLy8gc2hvd3MgdGhlIHBlcmNlbnQgIFxuICAgICAgICAvLyAgICAgfSlcblxuICAgICAgICAvLyBjb25zdCB0b29sdGlwID0gc3ZnLmFwcGVuZCgnZycpIC8vIHNldHRpbmcgdXAgdGhpcyBzd2VldCB0b29sdGlwLiBFeGNpdGluZyFcbiAgICAgICAgLy8gICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS10b29sdGlwIHRvb2x0aXAnKS5zdHlsZSgnZGlzcGxheScsICdub25lJykgLy8gc3RhcnRzIGludmlzaWJsZVxuICAgICAgICAvLyAgICAgLy8gYWRkaW5nIHRoZSBkaW1lbnNpb25zIG9mIHRoZSBib3hcbiAgICAgICAgLy8gICAgIC5hcHBlbmQoJ3JlY3QnKS5hdHRyKCd3aWR0aCcsIHRvb2x0aXBXaWR0aClcbiAgICAgICAgLy8gICAgIC5hdHRyKCdoZWlnaHQnLCB0b29sdGlwSGVpZ2h0KS5hdHRyKCdmaWxsJywgJ3doaXRlJykuc3R5bGUoJ29wYWNpdHknLCAwLjUpIC8vIG1ha2luZyBpdCBwYXJ0aWFsbHkgc2VlLXRocm91Z2hcbiAgICAgICAgLy8gICAgIC8vIGFkZGluZyB0aGUgdGV4dCBjb250ZW50XG4gICAgICAgIC8vICAgICAuYXBwZW5kKCd0ZXh0JykuYXR0cigneCcsIDE1KVxuICAgICAgICAvLyAgICAgLmF0dHIoJ2R5JywgJy44ZW0nKS5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICB9XG59XG5cblxuXG5jb25zdCBjb2xvckNob29zZXIgPSAodGF4X3R5cGUpID0+IHtcbiAgICBzd2l0Y2ggKHRheF90eXBlKSB7XG4gICAgICAgIGNhc2UgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzRdXG4gICAgICAgIGNhc2UgJ1Byb3BlcnR5IFRheGVzJzpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzNdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gQ0lSQ0xFX0NPTE9SU1syXVxuICAgICAgICBjYXNlICdJbmNvbWUgVGF4ZXMnOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbMV1cbiAgICAgICAgY2FzZSAnT3RoZXIgVGF4ZXMnOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbMF1cbiAgICB9XG59XG5cbiIsIlxuaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHBpZUxlZ2VuZCB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfbGVnZW5kJ1xuaW1wb3J0IHsgc3RhdGVfc2VsZWN0b3IsIFRPUF9MRVZFTCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGF0ZV9zZWxlY3RvcidcbmltcG9ydCB7IGJ1ZGdldENpcmNsZSB9IGZyb20gJy4vY29tcG9uZW50cy9oZWxwZXJfZnVuY3Rpb25zJ1xuaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2NzcydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIFxuICAgIC8vIFBDRyAtPiBjc3ZQYXRoLCBzZWN0b3IsIGFtb3V0LCBsb2NhdGlvbiwgbXVsdGlwbGllciwgc2tpcFxuICAgIFxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgICAvLyBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHNlbGVjdF8xID0gc3RhdGVfc2VsZWN0b3IoMSlcbiAgICBjb25zdCBzZWxlY3RfMiA9IHN0YXRlX3NlbGVjdG9yKDIpXG4gICAgY29uc3Qgc2VsZWN0b3JfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdG9yLWNvbnRhaW5lclwiKVswXVxuICAgIFxuICAgIGNvbnN0IHllYXJTZWxlY3RvciA9IHllYXJTZWxlY3RvclxuXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8xKVxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMilcbiAgICByb290LmFwcGVuZENoaWxkKHVsKVxuXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJBbGFiYW1hXCIsIFRPUF9MRVZFTCwgMSlcbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIld5b21pbmdcIiwgVE9QX0xFVkVMLCAyKVxuXG4gICAgXG59KVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==