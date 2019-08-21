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
exports.removeClass = exports.remove = exports.pSBC = exports.subArrayLocator = exports.budgetCircle = exports.findAmount = exports.assignBox = undefined;

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

var remove = exports.remove = function remove(id) {
    var remove = document.getElementById(id);
    remove ? remove.parentNode.removeChild(remove) : null;
};

var removeClass = exports.removeClass = function removeClass(className) {
    var remove_list = document.getElementsByClassName(className);
    debugger;
    remove_list.length ? remove_list.parentNode.removeChild(remove) : null;
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

        (0, _subdata_generator.updateSubData)(container_array, pie_num)();
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
        var sub_data_svg = d3.select('#sub-data-g-' + pie_num).selectAll('.sub-data-' + pie_num);
        g.on("mouseover", function (d, i) {
            console.log(d);
            d3.select(_this).transition().duration('50').attr('opacity', '.85').attr("cursor", 'pointer');
        }).on("mouseout", function (ele) {
            // h1.text(state + "'s tax revenue for 2018 was $" + d3.format(',')(TOTAL))
            // h2.text("")
        }).on('click', (0, _subdata_generator.updateSubData)(container_array, pie_num));
        // .on('click', updateSubData(container_array, sub_data_svg, pie_num))
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
exports.updateSubData = exports.subData = undefined;

var _helper_functions = __webpack_require__(/*! ./helper_functions */ "./src/components/helper_functions.js");

var _pie_chart_generator = __webpack_require__(/*! ./pie_chart_generator */ "./src/components/pie_chart_generator.js");

var width = 90; // setting the dimensions to correspond to the pie charts'
var height = 500;

var tooltipWidth = 120; // will alter these as needed
var tooltipHeight = 40;

var subData = exports.subData = function subData(container_array, pie_num) {
    var color_string = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#3F6D2A";

    // a lot of this code was learned from Michael Stanaland's "Stacked bar chart with tooltips" tutorial at http://bl.ocks.org/mstanaland/6100713
    // return (ele) => {
    //     debugger

    // const tax_type = ele.data.key
    // color_string = colorChooser(tax_type)
    // const sub_array = subArrayLocator(tax_type, container_array)


    // let tax_stack = {}
    // // setting up keys
    // let keys = []
    // // keys.push(tax_type)
    // sub_array.forEach((sub_tax, i) => {
    //     keys.push(sub_tax.key)
    //     tax_stack[sub_tax.key] = sub_tax.percent_of_total
    // });
    (0, _helper_functions.remove)('sub-data-svg-' + pie_num);

    var svg = d3.select("#sub-data-" + pie_num).append("svg").attr("width", width).attr("height", height).attr('id', 'sub-data-svg-' + pie_num).append("g").attr('class', 'sub-data-' + pie_num).attr('id', 'sub-data-g-' + pie_num);
    console.log(svg);
    updateSubData(container_array, svg, pie_num)(null);

    // set the layers of the stacked bar
    // const layers = d3.stack()([tax_type].map(tax => {  // should ultimately just be the one layer
    //     return sub_array.map(d => {
    //         return { x: d.key, y: d.amount, percent: d.percent }
    //     })
    // }))
    // const stack = d3.stack()
    //     .keys(keys)
    //     .order(d3.stackOrderNone)
    //     .offset(d3.stackOffsetNone)
    // let tax_stack_array = []
    // tax_stack_array.push(tax_stack)
    // const layers = stack(tax_stack_array)

    // // const x = d3.scaleOrdinal()
    // //     .domain(layers[0].map(d => d.x))
    // //     // .range([10, width], 0)  // may be a quicker way to do this as there is only one bar
    // //     .range([width])
    // const xScale = d3.scaleLinear()
    //     .domain([0, 1])
    //     .range([0, width])

    // // const colors = d3.scaleLinear()
    // //     .domain([1, 10])
    // //     .range(["red", "blue"])

    // const colors = [color_string]
    // const decrement = 100 / keys.length
    // let next_color = LightenDarkenColor(color_string, decrement)
    // while (colors.length < keys.length) {
    //     colors.push(next_color)
    //     next_color = LightenDarkenColor(next_color, decrement)
    // }

    // console.log(colors)

    // const yScale = d3.scaleLinear()
    //     .domain([0, d3.sum(Object.values(tax_stack))])  // the increment up to the total
    //     // .range([height, 0])
    //     .range([0, height])

    // const g = svg.selectAll(".sub-taxes")  // no g at this point, but they will have this class
    //     .data(layers).enter()  // now there will be a g for every bar within the graph.
    //     .append("g").attr("class", "sub-taxes")
    // // .attr('fill', d => {
    // //     // debugger
    // //     return colors(d)})

    // const rect = g.selectAll("rect")  // making each obj of the correspond to a rect within the g
    //     .data(layer => layer); // pulling out each individual obj
    // rect.exit().remove();
    // rect.enter().append("rect")
    //     .attr('x', d => xScale(0))  // passing each obj's x value to the d3 x function defined above
    //     .attr('y', layer => {
    //         // debugger
    //         return height - yScale(layer[1])
    //     })  // y0 is the height where each segment in the stack starts
    //     .attr('width', xScale(1))  // probably can hard code, since only one bar
    //     .attr('height', bar => {
    //         // debugger
    //         return yScale(bar[1] - bar[0])
    //     })
    //     .attr('fill', d => {
    //         // debugger
    //         return colors.pop()
    //     })  // height is set to the starting point plus the height, and all that subtracted from the starting point due to y values begining at top of screen
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
    // }
};

var updateSubData = exports.updateSubData = function updateSubData(container_array, pie_num) {

    return function (ele) {

        (0, _helper_functions.remove)('sub-data-svg-' + pie_num);

        var svg = d3.select("#sub-data-" + pie_num).append("svg").attr("width", width).attr("height", height).attr('id', 'sub-data-svg-' + pie_num).append("g").attr('class', 'sub-data-' + pie_num).attr('id', 'sub-data-g-' + pie_num);
        // .style("transform", "scaleY(-1)")


        var tax_type = ele ? ele.data.key : "Sales and Gross Receipts Taxes";
        var color_string = colorChooser(tax_type);
        var sub_array = (0, _helper_functions.subArrayLocator)(tax_type, container_array);
        var count = 0;

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

        // const x = d3.scaleOrdinal()
        //     .domain(layers[0].map(d => d.x))
        //     // .range([10, width], 0)  // may be a quicker way to do this as there is only one bar
        //     .range([width])
        var xScale = d3.scaleLinear().domain([0, 1]).range([0, width]);

        // const colors = d3.scaleLinear()
        //     .domain([1, 10])
        //     .range(["red", "blue"])

        var new_colors = d3.scaleLinear().domain([0, keys.length]).range(["white", color_string]);

        // const colors = [color_string]
        // const decrement = 100 / keys.length
        // let next_color = LightenDarkenColor(color_string, decrement)
        // while (colors.length < keys.length) {
        //     colors.push(next_color)
        //     next_color = LightenDarkenColor(next_color, decrement)
        // }    
        var yScale = d3.scaleLinear().domain([0, d3.sum(Object.values(tax_stack))]) // the increment up to the total
        // .range([height, 0])
        .range([0, height]);

        var g = svg.selectAll(".sub-taxes-" + pie_num) // no g at this point, but they will have this class
        .data(layers).enter() // now there will be a g for every bar within the graph.
        .append("g").attr("class", "sub-taxes-" + pie_num);

        // .attr('fill', d => {

        //     return colors(d)})

        var rect = g.selectAll("rect") // making each obj of the correspond to a rect within the g
        .data(function (layer) {
            return layer;
        }); // pulling out each individual obj
        rect.exit().remove();
        rect.enter().append("rect").attr('x', function (d) {
            return xScale(0);
        }).attr('width', xScale(1)) // probably can hard code, since only one bar
        // .attr('y', bar => {

        //     return yScale(bar[1] - bar[0])
        // }).attr('height', bar => {

        //     return yScale(bar[1] - bar[0])
        // })
        // .attr('y', layer => {

        //     return height - yScale(layer[1])
        // }) 
        .merge(rect)

        // .attr('y', layer => {
        //     return height - yScale(layer[1])
        // })
        // .attr('width', xScale(1))
        // .attr('height', bar => {
        //     return yScale(bar[1] - bar[0])
        // })
        // .attr('fill', d => {
        //     // debugger
        //     return colors.pop()
        // }) 
        .transition().duration(500).attr('x', function (d) {
            return xScale(0);
        }) // passing each obj's x value to the d3 x function defined above
        .attr('y', function (layer) {

            return height - yScale(layer[1]);
        }) // y0 is the height where each segment in the stack starts
        .attr('width', xScale(1)) // probably can hard code, since only one bar
        .attr('height', function (bar) {

            return yScale(bar[1] - bar[0]);
        }).attr('fill', function (d, i) {
            return new_colors(++count);
        });
        count = 0;

        var tooltip = svg.append('g') // setting up this sweet tooltip. Exciting!
        .attr('class', 'sub-data-tooltip tooltip').style('display', 'none') // starts invisible
        // adding the dimensions of the box
        .append('rect').attr('width', tooltipWidth).attr('height', tooltipHeight).attr('fill', 'white').style('opacity', 0.5) // making it partially see-through
        // adding the text content
        .append('text').attr('x', 15).attr('dy', '.8em').style('text-anchor', 'middle');

        svg.on('mouseover', function () {
            debugger;
            return tooltip.style("display", true);
        }); // want the info box to switch between visible and inivis based on mouseover
        svg.on('mouseout', function () {
            return tooltip.style("display", "none");
        });
        svg.on('mousemove', function (d) {
            // this is going to be a sweet effect!
            var mouse = d3.mouse(undefined);
            var xPos = mouse[0] - tooltipWidth / 2; // this[0] corresponds to mouse's x pos, and pushing it left by half of the tooltip's width ensure it is centered
            var yPos = mouse[1] - 25; // puts the tooltip up a bit above the cursor
            tooltip.attr("transform", "translate(" + xPos + ',' + yPos + ')');
            tooltip.select('text').text(d.percent_of_total); // shows the percent  
        });

        var legend = d3.select("#sub-data-" + pie_num).append('svg').append('g').attr('class', 'legend');
        // .attr('transform', 'translate(' + (padding + 12) + ', 0)');

        legend.selectAll('rect').data(keys.reverse()).enter().insert('rect').attr('x', 0).attr('y', function (d, i) {
            return i * 18;
        }).attr('width', 12).attr('height', 12).attr('fill', function (d, i) {
            return new_colors(++count);
        });

        legend.selectAll('text').data(keys.reverse()).enter().insert('text').text(function (d) {
            return d;
        }).attr('x', 18).attr('y', function (d, i) {
            return i * 18;
        }).attr('text-anchor', 'start').attr('alignment-baseline', 'hanging');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3ViZGF0YV9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYXBwLnNjc3MiXSwibmFtZXMiOlsiTGlnaHRlbkRhcmtlbkNvbG9yIiwiYXNzaWduQm94IiwiYXJyYXlfb2Zfb2JqcyIsInBpZV9udW0iLCJzaWRlIiwiZm9yRWFjaCIsIm9iaiIsImkiLCJrZXkiLCJib3giLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZGVjaW1hbHMiLCJTdHJpbmciLCJwZXJjZW50Iiwic3BsaXQiLCJpbnRlZ2VycyIsInNsaWNlZCIsInNsaWNlIiwiaW5uZXJIVE1MIiwiZmluZEFtb3VudCIsImFtb3VudCIsImpvaW4iLCJidWRnZXRDaXJjbGUiLCJ0b3RhbDEiLCJ0b3RhbDIiLCJNYXRoIiwic3FydCIsIm9sZF9jaXJsY2VfMSIsIm9sZF9jaXJsY2VfMiIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImRhdGEiLCJoZWlnaHQiLCJ3aWR0aCIsImNpcmNsZV9jb250YWluZXIiLCJkMyIsInNlbGVjdCIsInN2ZzEiLCJhcHBlbmQiLCJhdHRyIiwic3ZnMiIsInJzY2FsZSIsInNjYWxlTGluZWFyIiwiZG9tYWluIiwibWF4IiwicmFuZ2UiLCJzZWxlY3RBbGwiLCJlbnRlciIsImQiLCJzdWJBcnJheUxvY2F0b3IiLCJ0YXhfdHlwZSIsImNvbnRhaW5lcl9hcnJheSIsImNvbCIsImFtdCIsInVzZVBvdW5kIiwibnVtIiwicGFyc2VJbnQiLCJyIiwiYiIsImciLCJ0b1N0cmluZyIsInBTQkMiLCJwIiwiYzAiLCJjMSIsImwiLCJQIiwiZiIsInQiLCJoIiwibSIsInJvdW5kIiwiYSIsInBTQkNyIiwibiIsImxlbmd0aCIsIngiLCJwYXJzZUZsb2F0IiwidW5kZWZpbmVkIiwicmVtb3ZlIiwiaWQiLCJyZW1vdmVDbGFzcyIsInJlbW92ZV9saXN0IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNsYXNzTmFtZSIsIlBpZUNoYXJ0R2VuZXJhdG9yIiwiQ09MT1JTIiwiQ0lSQ0xFX0NPTE9SUyIsIkxBQkVMUyIsInN0YXRlIiwiY3N2IiwiaDEiLCJzcGFuIiwiaDIiLCJUT1RBTCIsIlRZUEVTIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwicmFkaXVzIiwiY29sb3JzIiwic2NhbGVPcmRpbmFsIiwiYXJjIiwib3V0ZXJSYWRpdXMiLCJpbm5lclJhZGl1cyIsInBpZSIsInZhbHVlIiwic3ZnIiwidGhlbiIsInNhbGVzX3RheGVzIiwibGljZW5zZV90YXhlcyIsImluY29tZV90YXhlcyIsIm90aGVyX3RheGVzIiwicHJvcGVydHlfdGF4ZXMiLCJHZW9fTmFtZSIsIml0ZW0iLCJBTU9VTlQiLCJ0YXhfb2JqIiwiVGF4X1R5cGUiLCJwZXJjZW50X29mX3RvdGFsIiwicHVzaCIsImluY2x1ZGVzIiwidGV4dCIsImZvcm1hdCIsInN0eWxlIiwicGF0aCIsInRyYW5zaXRpb24iLCJlYXNlIiwiZWFzZUxpbmVhciIsImR1cmF0aW9uIiwiYXR0clR3ZWVuIiwicGllVHdlZW4iLCJzdWJfZGF0YV9zdmciLCJvbiIsImNvbnNvbGUiLCJsb2ciLCJzcGFuMSIsInNwYW4yIiwiaW5uZXJUZXh0IiwiY2F0Y2giLCJlcnJvciIsImludGVycG9sYXRlIiwic3RhcnRBbmdsZSIsImVuZEFuZ2xlIiwicGllTGVnZW5kIiwibWFzdGVyX2xpc3QiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwibGVmdF9saXN0IiwidGV4dF9saXN0IiwicmlnaHRfbGlzdCIsImxlZnRfYm94IiwidGV4dF9ib3giLCJyaWdodF9ib3giLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlciIsImFwcGVuZENoaWxkIiwic3VibGlzdHMiLCJsYWJlbCIsImxpc3RzIiwibGVzdGxpc3QiLCJ0ZXh0bGlzdCIsInJpZ2h0bGlzdCIsImxlZnRCb3giLCJyaWdodEJveCIsImxpIiwic3VibGlzdCIsIlRPUF9MRVZFTCIsIlNUQVRFX05BTUVTIiwic3RhdGVfc2VsZWN0b3IiLCJ3cmFwcGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJzdGF0ZV9saXN0IiwidG9nZ2xlIiwiYm9keSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3RhdGVTZWxlY3RvciIsInN0YXRlX2xpc3RfaXRlbSIsInNldEF0dHJpYnV0ZSIsInRvb2x0aXBXaWR0aCIsInRvb2x0aXBIZWlnaHQiLCJzdWJEYXRhIiwiY29sb3Jfc3RyaW5nIiwidXBkYXRlU3ViRGF0YSIsImVsZSIsImNvbG9yQ2hvb3NlciIsInN1Yl9hcnJheSIsImNvdW50IiwidGF4X3N0YWNrIiwia2V5cyIsInN1Yl90YXgiLCJzdGFjayIsIm9yZGVyIiwic3RhY2tPcmRlck5vbmUiLCJvZmZzZXQiLCJzdGFja09mZnNldE5vbmUiLCJ0YXhfc3RhY2tfYXJyYXkiLCJsYXllcnMiLCJ4U2NhbGUiLCJuZXdfY29sb3JzIiwieVNjYWxlIiwic3VtIiwiT2JqZWN0IiwidmFsdWVzIiwicmVjdCIsImxheWVyIiwiZXhpdCIsIm1lcmdlIiwiYmFyIiwidG9vbHRpcCIsIm1vdXNlIiwieFBvcyIsInlQb3MiLCJsZWdlbmQiLCJyZXZlcnNlIiwiaW5zZXJ0Iiwicm9vdCIsInVsIiwic2VsZWN0XzEiLCJzZWxlY3RfMiIsInNlbGVjdG9yX2NvbnRhaW5lciIsInllYXJTZWxlY3RvciJdLCJt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QUFkLENBQVA7QUFDSixhQUFLLGdCQUFMO0FBQ0ksbUJBQU9BLG1DQUFjLENBQWQsQ0FBUDtBQUNKLGFBQUssZUFBTDtBQUNJLG1CQUFPQSxtQ0FBYyxDQUFkLENBQVA7QUFDSixhQUFLLGNBQUw7QUFDSSxtQkFBT0EsbUNBQWMsQ0FBZCxDQUFQO0FBQ0osYUFBSyxhQUFMO0FBQ0ksbUJBQU9BLG1DQUFjLENBQWQsQ0FBUDtBQVZSO0FBWUgsQ0FiRCxDOzs7Ozs7Ozs7Ozs7OztBQy9TQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTlFLFNBQVNzSyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTs7QUFFaEQ7O0FBRUEsUUFBTStDLE9BQU9yTixTQUFTQyxjQUFULENBQXdCLE1BQXhCLENBQWI7QUFDQTtBQUNBLFFBQU1xTixLQUFLLDRCQUFYO0FBQ0EsUUFBTUMsV0FBVyxvQ0FBZSxDQUFmLENBQWpCO0FBQ0EsUUFBTUMsV0FBVyxvQ0FBZSxDQUFmLENBQWpCO0FBQ0EsUUFBTUMscUJBQXFCek4sU0FBUzBFLHNCQUFULENBQWdDLG9CQUFoQyxFQUFzRCxDQUF0RCxDQUEzQjs7QUFFQSxRQUFNZ0osZUFBZUEsWUFBckI7O0FBRUFELHVCQUFtQmxFLFdBQW5CLENBQStCZ0UsUUFBL0I7QUFDQUUsdUJBQW1CbEUsV0FBbkIsQ0FBK0JpRSxRQUEvQjtBQUNBSCxTQUFLOUQsV0FBTCxDQUFpQitELEVBQWpCOztBQUVBLGdEQUFrQixTQUFsQixFQUE2QnBELHlCQUE3QixFQUF3QyxDQUF4QztBQUNBLGdEQUFrQixTQUFsQixFQUE2QkEseUJBQTdCLEVBQXdDLENBQXhDO0FBR0gsQ0FyQkQsRTs7Ozs7Ozs7Ozs7QUNQQSx1QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCB7IENJUkNMRV9DT0xPUlMgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBhc3NpZ25Cb3ggPSAoYXJyYXlfb2Zfb2JqcywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQtYm94LScgOiAncmlnaHQtYm94LSdcbiAgICBhcnJheV9vZl9vYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGkgPSA0O1xuICAgICAgICBzd2l0Y2ggKG9iai5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAwIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAxIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMiBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAzIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBpKVxuICAgICAgICBjb25zdCBkZWNpbWFscyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVsxXVxuICAgICAgICBjb25zdCBpbnRlZ2VycyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVswXVxuICAgICAgICBjb25zdCBzbGljZWQgPSBvYmoucGVyY2VudCA/IGludGVnZXJzICsgJy4nICsgZGVjaW1hbHMuc2xpY2UoMCwgMikgOiAwXG4gICAgICAgIGJveC5pbm5lckhUTUwgPSBzbGljZWQgKyAnJSdcbiAgICB9KTtcbn1cblxuLy8gZC5BTU9VTlQgPT09ICdYJyA/IDAgOiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMCxcbmV4cG9ydCBjb25zdCBmaW5kQW1vdW50ID0gKGFtb3VudCkgPT4ge1xuICAgIHJldHVybiBhbW91bnQgPT09ICdYJyA/IDAgOiBhbW91bnQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDBcbn1cblxuLy8gZXhwb3J0IGNvbnN0IHN1YkRhdGFQdXNoZXIgPSAoaXRlbSkgPT4ge1xuLy8gICAgIGlmIChpdGVtICE9IFwiVDAwXCIgJiYgaXRlbSAhPSBcIlQwMVwiKSB7XG4vLyAgICAgICAgIHN3aXRjaCAoaXRlbS5zbGljZSgwLCAyKSkge1xuLy8gICAgICAgICAgICAgY2FzZSAoXCJUMFwiIHx8IFwiVDFcIik6XG4vLyAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh7XG4vLyAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbi8vICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbi8vICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICBcbi8vICAgICAgICAgICAgIGNhc2UgXCJUMlwiOlxuLy8gICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh7XG4gICAgXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1cblxuZXhwb3J0IGNvbnN0IGJ1ZGdldENpcmNsZSA9ICh0b3RhbDEsIHRvdGFsMikgPT4ge1xuICAgIC8vIGJhc2VkIG9uIE1hdHRoZXcgTWNLZW5uYSdzIGV4YW1wbGUgYXQgaHR0cDovL2JsLm9ja3Mub3JnL21wbWNrZW5uYTgvcmF3LzU2NjUwOWRkM2Q5YTA4ZTVmOWIyL1xuICAgIGlmICghdG90YWwxIHx8ICF0b3RhbDIpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRvdGFsMSA9IE1hdGguc3FydCh0b3RhbDEpXG4gICAgdG90YWwyID0gTWF0aC5zcXJ0KHRvdGFsMilcbiAgICAvLyBkZWxldGUgb2xkIGNpcmNsZXNcbiAgICBjb25zdCBvbGRfY2lybGNlXzEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLXN2Zy0xJylcbiAgICBjb25zdCBvbGRfY2lybGNlXzIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLXN2Zy0yJylcbiAgICBvbGRfY2lybGNlXzEgPyBvbGRfY2lybGNlXzEucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGRfY2lybGNlXzEpIDogbnVsbFxuICAgIG9sZF9jaXJsY2VfMiA/IG9sZF9jaXJsY2VfMi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZF9jaXJsY2VfMikgOiBudWxsXG4gICAgXG4gICAgY29uc3QgZGF0YSA9IFt0b3RhbDEsIHRvdGFsMl1cblxuICAgIGNvbnN0IGhlaWdodCA9IDMwMFxuICAgIGNvbnN0IHdpZHRoID0gNTAwXG5cbiAgICBjb25zdCBjaXJjbGVfY29udGFpbmVyID0gZDMuc2VsZWN0KCcjYnVkZ2V0LWNpcmNsZS1jb250YWluZXInKVxuXG4gICAgY29uc3Qgc3ZnMSA9IGNpcmNsZV9jb250YWluZXIuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpLmF0dHIoJ2lkJywgJ2NpcmNsZS1zdmctMScpO1xuXG4gICAgY29uc3Qgc3ZnMiA9IGNpcmNsZV9jb250YWluZXIuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpLmF0dHIoJ2lkJywgJ2NpcmNsZS1zdmctMicpO1xuXG4gICAgY29uc3QgcnNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKFswLCAoZDMubWF4KGRhdGEpKSBdKVxuICAgICAgICAucmFuZ2UoWzEsIDE1MF0pXG5cbiAgICBzdmcxLnNlbGVjdEFsbCgnLmNpcmNsZXMnKS5kYXRhKFt0b3RhbDFdKVxuICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJzY2FsZShkKVxuICAgICAgICB9KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlcycpLmF0dHIoJ2N5JywgaGVpZ2h0IC8gMilcbiAgICAgICAgLmF0dHIoJ2N4JywgKGQsIGkpID0+IHdpZHRoIC8gMilcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnIzBhODBhZScpXG5cbiAgICBzdmcyLnNlbGVjdEFsbCgnLmNpcmNsZXMnKS5kYXRhKFt0b3RhbDJdKVxuICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZXMnKS5hdHRyKCdjeScsIGhlaWdodCAvIDIpXG4gICAgICAgIC5hdHRyKCdjeCcsIChkLCBpKSA9PiB3aWR0aCAvIDIpXG4gICAgICAgIC5hdHRyKCdmaWxsJywgJyMwYTgwYWUnKVxufVxuXG5leHBvcnQgY29uc3Qgc3ViQXJyYXlMb2NhdG9yID0gKHRheF90eXBlLCBjb250YWluZXJfYXJyYXkpID0+IHsgIC8vIGhlbHBlciBmdW5jdGlvbiBmb3IgZmluZGluZyB0aGUgcmlnaHQgc3ViIGFycmF5LiBBIGJpdCBoYXJkLWNvZGVkLlxuICAgIHN3aXRjaCAodGF4X3R5cGUpIHtcbiAgICAgICAgY2FzZSBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVswXVxuICAgICAgICBjYXNlIFwiTGljZW5zZSBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsxXVxuICAgICAgICBjYXNlIFwiSW5jb21lIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzJdXG4gICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVszXVxuICAgICAgICBjYXNlIFwiUHJvcGVydHkgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbNF1cbiAgICB9XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gd2FzIHRha2VuIGZyb20gdXNlciBQaW1wIFRyaXpraXRzIHBvc3Qgb24gc3RhY2tvdmVyZmxvdyBhdCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTYwMjQ4L3Byb2dyYW1tYXRpY2FsbHktbGlnaHRlbi1vci1kYXJrZW4tYS1oZXgtY29sb3Itb3ItcmdiLWFuZC1ibGVuZC1jb2xvcnNcbmV4cG9ydCBmdW5jdGlvbiBMaWdodGVuRGFya2VuQ29sb3IoY29sLCBhbXQpIHtcbiAgICB2YXIgdXNlUG91bmQgPSBmYWxzZTtcbiAgICBpZiAoY29sWzBdID09IFwiI1wiKSB7XG4gICAgICAgIGNvbCA9IGNvbC5zbGljZSgxKTtcbiAgICAgICAgdXNlUG91bmQgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBudW0gPSBwYXJzZUludChjb2wsIDE2KTtcblxuICAgIHZhciByID0gKG51bSA+PiAxNikgKyBhbXQ7XG5cbiAgICBpZiAociA+IDI1NSkgciA9IDI1NTtcbiAgICBlbHNlIGlmIChyIDwgMCkgciA9IDA7XG5cbiAgICB2YXIgYiA9ICgobnVtID4+IDgpICYgMHgwMEZGKSArIGFtdDtcblxuICAgIGlmIChiID4gMjU1KSBiID0gMjU1O1xuICAgIGVsc2UgaWYgKGIgPCAwKSBiID0gMDtcblxuICAgIHZhciBnID0gKG51bSAmIDB4MDAwMEZGKSArIGFtdDtcblxuICAgIGlmIChnID4gMjU1KSBnID0gMjU1O1xuICAgIGVsc2UgaWYgKGcgPCAwKSBnID0gMDtcblxuICAgIHJldHVybiAodXNlUG91bmQgPyBcIiNcIiA6IFwiXCIpICsgKGcgfCAoYiA8PCA4KSB8IChyIDw8IDE2KSkudG9TdHJpbmcoMTYpO1xufVxuLy8gVGhpcyBmdW5jdGlvbiB3YXMgYWxzbyB0YWtlbiBmcm9tIHVzZXIgUGltcCBUcml6a2l0cyBwb3N0IG9uIHN0YWNrb3ZlcmZsb3cgYXQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTU2MDI0OC9wcm9ncmFtbWF0aWNhbGx5LWxpZ2h0ZW4tb3ItZGFya2VuLWEtaGV4LWNvbG9yLW9yLXJnYi1hbmQtYmxlbmQtY29sb3JzXG5leHBvcnQgY29uc3QgcFNCQyA9IChwLCBjMCwgYzEsIGwpID0+IHtcbiAgICBsZXQgciwgZywgYiwgUCwgZiwgdCwgaCwgaSA9IHBhcnNlSW50LCBtID0gTWF0aC5yb3VuZCwgYSA9IHR5cGVvZiAoYzEpID09IFwic3RyaW5nXCI7XG4gICAgaWYgKHR5cGVvZiAocCkgIT0gXCJudW1iZXJcIiB8fCBwIDwgLTEgfHwgcCA+IDEgfHwgdHlwZW9mIChjMCkgIT0gXCJzdHJpbmdcIiB8fCAoYzBbMF0gIT0gJ3InICYmIGMwWzBdICE9ICcjJykgfHwgKGMxICYmICFhKSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCF0aGlzLnBTQkNyKSB0aGlzLnBTQkNyID0gKGQpID0+IHtcbiAgICAgICAgbGV0IG4gPSBkLmxlbmd0aCwgeCA9IHt9O1xuICAgICAgICBpZiAobiA+IDkpIHtcbiAgICAgICAgICAgIFtyLCBnLCBiLCBhXSA9IGQgPSBkLnNwbGl0KFwiLFwiKSwgbiA9IGQubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKG4gPCAzIHx8IG4gPiA0KSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHguciA9IGkoclszXSA9PSBcImFcIiA/IHIuc2xpY2UoNSkgOiByLnNsaWNlKDQpKSwgeC5nID0gaShnKSwgeC5iID0gaShiKSwgeC5hID0gYSA/IHBhcnNlRmxvYXQoYSkgOiAtMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG4gPT0gOCB8fCBuID09IDYgfHwgbiA8IDQpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKG4gPCA2KSBkID0gXCIjXCIgKyBkWzFdICsgZFsxXSArIGRbMl0gKyBkWzJdICsgZFszXSArIGRbM10gKyAobiA+IDQgPyBkWzRdICsgZFs0XSA6IFwiXCIpO1xuICAgICAgICAgICAgZCA9IGkoZC5zbGljZSgxKSwgMTYpO1xuICAgICAgICAgICAgaWYgKG4gPT0gOSB8fCBuID09IDUpIHguciA9IGQgPj4gMjQgJiAyNTUsIHguZyA9IGQgPj4gMTYgJiAyNTUsIHguYiA9IGQgPj4gOCAmIDI1NSwgeC5hID0gbSgoZCAmIDI1NSkgLyAwLjI1NSkgLyAxMDAwO1xuICAgICAgICAgICAgZWxzZSB4LnIgPSBkID4+IDE2LCB4LmcgPSBkID4+IDggJiAyNTUsIHguYiA9IGQgJiAyNTUsIHguYSA9IC0xXG4gICAgICAgIH0gcmV0dXJuIHhcbiAgICB9O1xuICAgIGggPSBjMC5sZW5ndGggPiA5LCBoID0gYSA/IGMxLmxlbmd0aCA+IDkgPyB0cnVlIDogYzEgPT0gXCJjXCIgPyAhaCA6IGZhbHNlIDogaCwgZiA9IHBTQkNyKGMwKSwgUCA9IHAgPCAwLCB0ID0gYzEgJiYgYzEgIT0gXCJjXCIgPyBwU0JDcihjMSkgOiBQID8geyByOiAwLCBnOiAwLCBiOiAwLCBhOiAtMSB9IDogeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1LCBhOiAtMSB9LCBwID0gUCA/IHAgKiAtMSA6IHAsIFAgPSAxIC0gcDtcbiAgICBpZiAoIWYgfHwgIXQpIHJldHVybiBudWxsO1xuICAgIGlmIChsKSByID0gbShQICogZi5yICsgcCAqIHQuciksIGcgPSBtKFAgKiBmLmcgKyBwICogdC5nKSwgYiA9IG0oUCAqIGYuYiArIHAgKiB0LmIpO1xuICAgIGVsc2UgciA9IG0oKFAgKiBmLnIgKiogMiArIHAgKiB0LnIgKiogMikgKiogMC41KSwgZyA9IG0oKFAgKiBmLmcgKiogMiArIHAgKiB0LmcgKiogMikgKiogMC41KSwgYiA9IG0oKFAgKiBmLmIgKiogMiArIHAgKiB0LmIgKiogMikgKiogMC41KTtcbiAgICBhID0gZi5hLCB0ID0gdC5hLCBmID0gYSA+PSAwIHx8IHQgPj0gMCwgYSA9IGYgPyBhIDwgMCA/IHQgOiB0IDwgMCA/IGEgOiBhICogUCArIHQgKiBwIDogMDtcbiAgICBpZiAoaCkgcmV0dXJuIFwicmdiXCIgKyAoZiA/IFwiYShcIiA6IFwiKFwiKSArIHIgKyBcIixcIiArIGcgKyBcIixcIiArIGIgKyAoZiA/IFwiLFwiICsgbShhICogMTAwMCkgLyAxMDAwIDogXCJcIikgKyBcIilcIjtcbiAgICBlbHNlIHJldHVybiBcIiNcIiArICg0Mjk0OTY3Mjk2ICsgciAqIDE2Nzc3MjE2ICsgZyAqIDY1NTM2ICsgYiAqIDI1NiArIChmID8gbShhICogMjU1KSA6IDApKS50b1N0cmluZygxNikuc2xpY2UoMSwgZiA/IHVuZGVmaW5lZCA6IC0yKVxufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlID0gKGlkKSA9PiB7XG4gICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG4gICAgcmVtb3ZlID8gcmVtb3ZlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlKSA6IG51bGxcbn1cblxuZXhwb3J0IGNvbnN0IHJlbW92ZUNsYXNzID0gY2xhc3NOYW1lID0+IHtcbiAgICBjb25zdCByZW1vdmVfbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKVxuICAgIGRlYnVnZ2VyXG4gICAgcmVtb3ZlX2xpc3QubGVuZ3RoID8gcmVtb3ZlX2xpc3QucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUpIDogbnVsbFxufSIsIi8vIEEgbG90IG9mIHRoaXMgY29kZSB3YXMgYmFzZWQgaGVhdmlseSBvZmYgb2YgS2FydGhpayBUaG90YSdzIHlvdXR1YmUgdHV0b3JpYWwgXCJJbnRyb2R1Y3Rpb24gdG8gZDMuanMgPSBQaWUgQ2hhcnQgYW5kIERvbnV0IENoYXJ0XCJcbi8vIFRoZSBsZWdlbmQgY29kZSB3YXMgZnJvbSBDcnlwdGVycyBJbmZvdGVjaCdzIHlvdXR1YmUgdHV0b3JpYWwgXCJQaWUgQ2hhcnQgdXNpbmcgRDMuanNcIlxuXG5pbXBvcnQgeyBhc3NpZ25Cb3gsIGZpbmRBbW91bnQsIGJ1ZGdldENpcmNsZSB9IGZyb20gJy4vaGVscGVyX2Z1bmN0aW9ucydcbmltcG9ydCB7IHN1YkRhdGEsIHVwZGF0ZVN1YkRhdGEgfSBmcm9tICcuL3N1YmRhdGFfZ2VuZXJhdG9yJ1xuLy8gXG5leHBvcnQgY29uc3QgQ09MT1JTID0gW1wiI2E2NzUxZVwiLCBcIiM5YTAwNDdcIiwgXCIjNjZhNTFlXCIsIFwiIzc0NzBiM1wiLCBcIiNlODJiOGFcIl1cbmV4cG9ydCBjb25zdCBDSVJDTEVfQ09MT1JTID0gW0NPTE9SU1sxXSwgQ09MT1JTWzBdLCBDT0xPUlNbNF0sIENPTE9SU1syXSwgQ09MT1JTWzNdXVxuLy8gZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIk90aGVyIFRheGVzXCJdXG5leHBvcnQgY29uc3QgTEFCRUxTID0gW1wiT3RoZXIgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBUYXhlc1wiXVxuLy8gZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKGNzdlBhdGgsIHNlY3RvciwgYW1vdW50LCBzdGF0ZSwgbXVsdGlwbGllciA9IDEsIHNraXAgPSAxKSB7XG5leHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUsIHRheF90eXBlLCBwaWVfbnVtLCBjc3YgPSBcIi4vc3JjL2Fzc2V0cy9kYXRhL0ZZMjAxOC1TVEMtRGV0YWlsZWQtVGFibGUuY3N2XCIpIHtcblxuICAgIC8vIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YWxzLVwiICsgcGllX251bSlcbiAgICAvLyByZW1vdmUgPyByZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUpIDogbnVsbFxuICAgIC8vIGNvbnN0IHJlbW92ZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRldGFpbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZTIgPyByZW1vdmUyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlMikgOiBudWxsXG5cbiAgICBjb25zdCBoMSA9IGQzLnNlbGVjdCgnI3RvdGFscy1oZWFkZXItJyArIHBpZV9udW0pXG4gICAgY29uc3Qgc3BhbiA9IGQzLnNlbGVjdCgnI3RvdGFscy1zcGFuLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IGgyID0gZDMuc2VsZWN0KFwiI2RldGFpbHMtXCIgKyBwaWVfbnVtKVxuXG5cbiAgICBsZXQgVE9UQUwgPSAwO1xuICAgIGxldCBUWVBFUyA9IFtdXG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cblxuXG4gICAgY29uc3QgY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKENPTE9SUyk7XG5cbiAgICAvLyBhcmMgZ2VuZXJhdG9yXG4gICAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDEwKVxuICAgICAgICAvLyAuaW5uZXJSYWRpdXMoMCk7IC8vIGZvciBjaXJjbGVcbiAgICAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDEwMCkgLy8gZm9yIGRvbnV0XG5cbiAgICAvLyBjb25zdCBsYWJsZUFyYyA9IGQzLmFyYygpXG4gICAgLy8gICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSA1MClcbiAgICAvLyAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDUwKTtcblxuICAgIC8vIHBpZSBnZW5lcmF0b3JcbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgICAvLyAuc29ydChudWxsKVxuICAgICAgICAudmFsdWUoZCA9PiBkLmFtb3VudCk7XG5cbiAgICAvLyBkZWZpbmUgc3ZnIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIi5waWUtXCIgKyBwaWVfbnVtKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKVxuXG4gICAgLy8gaW1wb3J0IGRhdGFcbiAgICBkMy5jc3YoY3N2KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgYXJyYXlzIHRoYXQgd2lsbCBjb250YWluIHRoZSBzdWIgbGV2ZWwgdGF4IGRhdGFcbiAgICAgICAgbGV0IHNhbGVzX3RheGVzID0gW11cbiAgICAgICAgbGV0IGxpY2Vuc2VfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgaW5jb21lX3RheGVzID0gW11cbiAgICAgICAgbGV0IG90aGVyX3RheGVzID0gW11cbiAgICAgICAgbGV0IHByb3BlcnR5X3RheGVzID0gW11cbiAgICAgICAgLy8gbGV0IHNhbGVzX3RheF9vYmogPSB7IHRheF9ncm91cDogTEFCRUxTWzRdIH1cbiAgICAgICAgLy8gcGFyc2UgdGhlIGNzdlxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9IFwiVDAwXCIpIHsgIC8vIGRvbid0IHdhbnQgdG8gY2F0Y2ggVG90YWwgb3IgUHJvcGVydHkgVGF4ZXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRheF9vYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudF9vZl90b3RhbDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkLml0ZW0uc2xpY2UoMCwyKSkgeyAvLyBmaWxsIHVwIHN1YiBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gPT09IFwiVDA5XCIpIHsgc2FsZXNfdGF4ZXMucHVzaCh0YXhfb2JqKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDFcIikgeyBwcm9wZXJ0eV90YXhlcy5wdXNoKHRheF9vYmopIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzYWxlc190YXhfb2JqW2QuVGF4X1R5cGVdID0gZmluZEFtb3VudChkLkFNT1VOVClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMlwiOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29tZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9ICdUMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUWVBFUy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZC5rZXkgPSBkLlRheF9UeXBlO1xuICAgICAgICAgICAgICAgICAgICBkLmFtb3VudCA9IGZpbmRBbW91bnQoZC5BTU9VTlQpO1xuICAgICAgICAgICAgICAgICAgICBkLnBlcmNlbnQgPSAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWluZXJfYXJyYXkgPSBbXSAgLy8gc2V0dGluZyB1cCBjb250YWluZXIgYXJyYXkgZm9yIHBhc3NpbmcgaW50byBjbGljayBoYW5kbGVyXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChwcm9wZXJ0eV90YXhlcylcblxuICAgICAgICB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkoKVxuICAgICAgICAvLyBzZXQgaDEgYWZ0ZXIgdG90YWwgaGFzIGJlZW4gZGVmaW5lZFxuICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgXCIpXG4gICAgICAgIHNwYW4udGV4dChcIiRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgaDIudGV4dChcIlwiKVxuICAgICAgICAvLyBhdHRlbXB0IGJ1ZGdldENpcmNsZSBjYWxsXG4gICAgICAgIGJ1ZGdldENpcmNsZShUT1RBTClcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwZXJjZW50YWdlcyBpbiB0aGUgY2VudGVyIGJveFxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgYXJjKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBkID0+IGNvbG9ycyhkLmRhdGEua2V5KSlcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbignZCcsIHBpZVR3ZWVuKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHBhdGgub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIC8vIHdoeSBkb2Vzbid0IHRoaXMgd29yaz9cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gICAgICAgICAgICAgLmR1cmF0aW9uKCc1MCcpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIGRldGVybWluZSBob3cgdG8gZmxpcCB0aGUgcGllc1xuICAgICAgICBpZiAocGllX251bSA9PT0gMikgey8vIGZsaXAgdGhlIHNlY29uZCBwaWVcbiAgICAgICAgICAgIGcuYXR0cihcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVgoLTEpIHRyYW5zbGF0ZSgzMDBweCwgMHB4KSBzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgY29uc3Qgc3ViX2RhdGFfc3ZnID0gZDMuc2VsZWN0KCcjc3ViLWRhdGEtZy0nICsgcGllX251bSkuc2VsZWN0QWxsKCcuc3ViLWRhdGEtJyArIHBpZV9udW0pXG4gICAgICAgIGcub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coZClcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oJzUwJylcbiAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsICcuODUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgIC8vIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE4IHdhcyAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICAvLyBoMi50ZXh0KFwiXCIpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2snLCB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkpXG4gICAgICAgIC8vIC5vbignY2xpY2snLCB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgc3ViX2RhdGFfc3ZnLCBwaWVfbnVtKSlcbiAgICAgICAgY29uc29sZS5sb2cocGllX251bSlcbiAgICAgICAgY29uc3Qgc3BhbjEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWxzLXNwYW4tMScpXG4gICAgICAgIGNvbnN0IHNwYW4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFscy1zcGFuLTInKVxuXG4gICAgICAgIGlmIChzcGFuMS5pbm5lclRleHRcbiAgICAgICAgICAgICYmIHNwYW4yLmlubmVyVGV4dCkge1xuICAgICAgICAgICAgY29uc3QgdG90YWwxID0gcGFyc2VJbnQoc3BhbjEuaW5uZXJUZXh0LnNsaWNlKDEpLnNwbGl0KCcsJykuam9pbignJykpXG4gICAgICAgICAgICBjb25zdCB0b3RhbDIgPSBwYXJzZUludChzcGFuMi5pbm5lclRleHQuc2xpY2UoMSkuc3BsaXQoJywnKS5qb2luKCcnKSlcbiAgICAgICAgICAgIGJ1ZGdldENpcmNsZSh0b3RhbDEsIHRvdGFsMilcbiAgICAgICAgfSAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7IGlmIChlcnJvcikgdGhyb3cgZXJyb3IgfSlcbiAgICBcbiAgICBjb25zdCBwaWVUd2VlbiA9IGIgPT4ge1xuICAgICAgICBiLmlubmVyUmFkaXVzID0gMDtcbiAgICAgICAgY29uc3QgaSA9IGQzLmludGVycG9sYXRlKHsgc3RhcnRBbmdsZTogMCwgZW5kQW5nbGU6IDAgfSwgYilcbiAgICAgICAgcmV0dXJuICh0KSA9PiB7IHJldHVybiBhcmMoaSh0KSkgfVxuICAgIH0gICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAiLCJpbXBvcnQgeyBDSVJDTEVfQ09MT1JTLCBMQUJFTFN9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IHBpZUxlZ2VuZCA9ICgpID0+IHtcbiAgICBjb25zdCBtYXN0ZXJfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuICAgIG1hc3Rlcl9saXN0LmNsYXNzTGlzdC5hZGQoJ21hc3Rlci1saXN0JylcblxuICAgIGNvbnN0IGxlZnRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCB0ZXh0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgcmlnaHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgIGxlZnRfbGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0LWxpc3QnKSAgXG4gICAgdGV4dF9saXN0LmNsYXNzTGlzdC5hZGQoJ3RleHQtbGlzdCcpICBcbiAgICByaWdodF9saXN0LmNsYXNzTGlzdC5hZGQoJ3JpZ2h0LWxpc3QnKSBcblxuICAgIGZvciAobGV0IGkgPSBMQUJFTFMubGVuZ3RoIC0gMSA7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBsZWZ0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgdGV4dF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IHJpZ2h0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICBsZWZ0X2JveC5jbGFzc0xpc3QuYWRkKCdib3gnLCAnbGVmdC1ib3gnKVxuICAgICAgICBsZWZ0X2JveC5pZCA9ICgnbGVmdC1ib3gtJyArIGkpXG4gICAgICAgIGxlZnRfYm94LnN0eWxlLmNvbG9yID0gQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIHJpZ2h0X2JveC5jbGFzc0xpc3QuYWRkKCdib3gnLCAncmlnaHQtYm94JylcbiAgICAgICAgcmlnaHRfYm94LmlkID0gKCdyaWdodC1ib3gtJyArIGkpXG4gICAgICAgIHJpZ2h0X2JveC5zdHlsZS5jb2xvciA9IENJUkNMRV9DT0xPUlNbaV1cblxuICAgICAgICB0ZXh0X2JveC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWJveCcpXG4gICAgICAgIHRleHRfYm94LmlubmVySFRNTCA9IExBQkVMU1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gQ0lSQ0xFX0NPTE9SU1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkIFwiICsgQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIGxlZnRfbGlzdC5hcHBlbmRDaGlsZChsZWZ0X2JveClcbiAgICAgICAgdGV4dF9saXN0LmFwcGVuZENoaWxkKHRleHRfYm94KVxuICAgICAgICByaWdodF9saXN0LmFwcGVuZENoaWxkKHJpZ2h0X2JveClcbiAgICB9XG5cbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZChsZWZ0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9saXN0KVxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKHJpZ2h0X2xpc3QpXG4gICAgcmV0dXJuIG1hc3Rlcl9saXN0XG59XG5cbmNvbnN0IHN1Ymxpc3RzID0gKGxhYmVsLCBjb2xvcikgPT4ge1xuICAgIGNvbnN0IGxpc3RzID0gW11cblxuXG4gICAgbGVzdGxpc3QuY2xhc3NMaXN0LmFkZCgnbGVmdGxpc3QnKVxuICAgIHRleHRsaXN0LmNsYXNzTGlzdC5hZGQoJ3RleHRsaXN0JylcbiAgICByaWdodGxpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHRsaXN0JylcblxuICAgIGNvbnN0IGxlZnRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgY29uc3QgcmlnaHRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cblxuXG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cblxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGVmdEJveClcbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKGxpKVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQocmlnaHRCb3gpXG4gICAgcmV0dXJuIHN1Ymxpc3Rcbn0iLCJpbXBvcnQgeyBQaWVDaGFydEdlbmVyYXRvciB9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IFRPUF9MRVZFTCA9IFsnVDAwJywgJ1QwMScsICdUQTEnLCAnVEEzJywgJ1RBNCcsICdUQTUnXVxuY29uc3QgU1RBVEVfTkFNRVMgPSBbJ0FsYWJhbWEnLCAnQWxhc2thJywgJ0FyaXpvbmEnLCAnQXJrYW5zYXMnLCAnQ2FsaWZvcm5pYScsICdDb2xvcmFkbycsICdDb25uZWN0aWN1dCcsICdEZWxhd2FyZScsICdGbG9yaWRhJywgJ0dlb3JnaWEnLCAnSGF3YWlpJywgJ0lkYWhvJywgJ0lsbGlub2lzJywgJ0luZGlhbmEnLCAnSW93YScsICdLYW5zYXMnLCAnS2VudHVja3knLCAnTG91aXNpYW5hJywgJ01haW5lJywgJ01hcnlsYW5kJywgJ01hc3NhY2h1c2V0dHMnLCAnTWljaGlnYW4nLCAnTWlubmVzb3RhJywgJ01pc3Npc3NpcHBpJywgJ01pc3NvdXJpJywgJ01vbnRhbmEnLCAnTmVicmFza2EnLCAnTmV2YWRhJywgJ05ldyBIYW1wc2hpcmUnLCAnTmV3IEplcnNleScsICdOZXcgTWV4aWNvJywgJ05ldyBZb3JrJywgJ05vcnRoIENhcm9saW5hJywgJ05vcnRoIERha290YScsICdPaGlvJywgJ09rbGFob21hJywgJ09yZWdvbicsICdQZW5uc3lsdmFuaWEnLCAnUmhvZGUgSXNsYW5kJywgJ1NvdXRoIENhcm9saW5hJywgJ1NvdXRoIERha290YScsICdUZW5uZXNzZWUnLCAnVGV4YXMnLCAnVXRhaCcsICdWZXJtb250JywgJ1ZpcmdpbmlhJywgJ1dhc2hpbmd0b24nLCAnV2VzdCBWaXJnaW5pYScsICdXaXNjb25zaW4nLCAnV3lvbWluZyddXG5cbi8vIGV4cG9ydCBjb25zdCBzZWxlY3RvciA9IChwaWVfbnVtKSA9PiB7XG5cbi8vICAgICAvLyBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSAgLy8gcmV2aXNpdCBpZiB0aW1lIHRvIG1ha2UgY3VzdG9tIHNlbGVjdFxuLy8gICAgIC8vIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbml0aWFsLWNvbnRhaW5lcicpXG5cbi8vICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpXG4vLyAgICAgc2VsZWN0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2VsZWN0LVwiICsgcGllX251bSlcblxuLy8gICAgIGNvbnN0IHN0YXRlU2VsZWN0b3IgPSBlID0+IHtcbi8vICAgICAgICAgY29uc3Qgc3RhdGUgPSBlLnRhcmdldC52YWx1ZVxuLy8gICAgICAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN2Zy1cIiArIHBpZV9udW0pXG4vLyAgICAgICAgIHN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2Zylcbi8vICAgICAgICAgUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUsIFRPUF9MRVZFTCwgcGllX251bSlcblxuLy8gICAgICAgICBjb25zdCBzaWRlID0gcGllX251bSA9PT0gMSA/IFwiLWxlZnRcIiA6IFwiLXJpZ2h0XCJcbi8vICAgICAgICAgLy8gY29uc3QgaDIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3RhdGVcIiArIHNpZGUpWzBdXG4vLyAgICAgICAgIC8vIGgyLmlubmVySFRNTCA9IHN0YXRlXG4vLyAgICAgfVxuXG4vLyAgICAgU1RBVEVfTkFNRVMuZm9yRWFjaChzdGF0ZSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IGRlZmF1bHRfc3RhdGUgPSBwaWVfbnVtID09PSAxID8gU1RBVEVfTkFNRVNbMF0gOiBTVEFURV9OQU1FU1tTVEFURV9OQU1FUy5sZW5ndGggLSAxXVxuLy8gICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpXG4vLyAgICAgICAgIGlmIChzdGF0ZSA9PT0gZGVmYXVsdF9zdGF0ZSkge1xuLy8gICAgICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIHRydWUpXG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgb3B0aW9uLmlubmVySFRNTCA9IHN0YXRlXG4vLyAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzdGF0ZSlcbi8vICAgICAgICAgLy8gb3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbi8vICAgICAgICAgLy8gb3B0aW9uLnNldEF0dHJpYnV0ZShcIm9uY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4vLyAgICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pXG4vLyAgICAgfSlcbi8vICAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBzdGF0ZVNlbGVjdG9yKVxuLy8gICAgIC8vIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3QpXG4vLyAgICAgLy8gcmV0dXJuIGNvbnRhaW5lclxuLy8gICAgIHJldHVybiBzZWxlY3Rcbi8vIH1cblxuLy8gY29uc3QgcGhhc2VPdXQgPSAobm9kZSkgPT4ge1xuXG4vLyAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4vLyB9XG5cbmV4cG9ydCBjb25zdCBzdGF0ZV9zZWxlY3RvciA9IChwaWVfbnVtKSA9PiB7XG4gXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJzZWxlY3Qtd3JhcHBlci1cIiArIHBpZV9udW0pXG4gICAgd3JhcHBlci5pZCA9IFwic2VsZWN0LXdyYXBwZXItXCIgKyBwaWVfbnVtXG5cbiAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAgIHNlbGVjdC5pbm5lckhUTUwgPSBwaWVfbnVtID09PSAxID8gJ0FsYWJhbWEnIDogJ1d5b21pbmcnXG4gICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcInNlbGVjdC1cIiArIHBpZV9udW0pXG4gICAgc2VsZWN0LmlkID0gXCJzZWxlY3QtXCIgKyBwaWVfbnVtXG5cbiAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuICAgIH0pXG4gICAgXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0gIC8vIGFkZCBhbiBldmVudCBsaXN0ZW5lciBzbyB0aGF0IGlmIEkgY2xpY2sgYW55d2hlcmUgZWxzZSB0aGUgbGlzdCBkaXNhcHBlYXJzXG4gICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgfSlcbiAgICBcbiAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gc3RhdGUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGUgPT4ge1xuICAgICAgICAgICAgLy8gY29uc3Qgc3RhdGUgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuICAgICAgICAgICAgc2VsZWN0LmlubmVyVGV4dCA9IHN0YXRlXG4gICAgICAgICAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4gICAgICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgVE9QX0xFVkVMLCBwaWVfbnVtKVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHN0YXRlX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdzdGF0ZS1saXN0LScgKyBwaWVfbnVtKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICBzdGF0ZV9saXN0LmlkID0gJ3N0YXRlLWxpc3QtJyArIHBpZV9udW1cbiAgICBcbiAgICBTVEFURV9OQU1FUy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGVfbGlzdF9pdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5pbm5lckhUTUwgPSBzdGF0ZVxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4gICAgICAgIHN0YXRlX2xpc3QuYXBwZW5kQ2hpbGQoc3RhdGVfbGlzdF9pdGVtKVxuICAgIH0pXG4gICAgXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChzZWxlY3QpXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChzdGF0ZV9saXN0KVxuICAgIFxuICAgIHJldHVybiB3cmFwcGVyXG59XG5cbi8vIGNvbnN0IHBoYXNlT3V0ID0gKG5vZGUpID0+IHtcblxuLy8gICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxuLy8gfSIsImltcG9ydCB7IHN1YkFycmF5TG9jYXRvciwgTGlnaHRlbkRhcmtlbkNvbG9yLCByZW1vdmUsIHJlbW92ZUNsYXNzIH0gZnJvbSAnLi9oZWxwZXJfZnVuY3Rpb25zJ1xuaW1wb3J0IHsgQ0lSQ0xFX0NPTE9SUyB9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcic7XG5cbmNvbnN0IHdpZHRoID0gOTAgIC8vIHNldHRpbmcgdGhlIGRpbWVuc2lvbnMgdG8gY29ycmVzcG9uZCB0byB0aGUgcGllIGNoYXJ0cydcbmNvbnN0IGhlaWdodCA9IDUwMFxuXG5jb25zdCB0b29sdGlwV2lkdGggPSAxMjAgLy8gd2lsbCBhbHRlciB0aGVzZSBhcyBuZWVkZWRcbmNvbnN0IHRvb2x0aXBIZWlnaHQgPSA0MFxuXG5leHBvcnQgY29uc3Qgc3ViRGF0YSA9IChjb250YWluZXJfYXJyYXksIHBpZV9udW0sIGNvbG9yX3N0cmluZyA9IFwiIzNGNkQyQVwiKSA9PiB7XG4gICAgLy8gYSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBsZWFybmVkIGZyb20gTWljaGFlbCBTdGFuYWxhbmQncyBcIlN0YWNrZWQgYmFyIGNoYXJ0IHdpdGggdG9vbHRpcHNcIiB0dXRvcmlhbCBhdCBodHRwOi8vYmwub2Nrcy5vcmcvbXN0YW5hbGFuZC82MTAwNzEzXG4gICAgLy8gcmV0dXJuIChlbGUpID0+IHtcbiAgICAvLyAgICAgZGVidWdnZXJcblxuICAgICAgICAvLyBjb25zdCB0YXhfdHlwZSA9IGVsZS5kYXRhLmtleVxuICAgICAgICAvLyBjb2xvcl9zdHJpbmcgPSBjb2xvckNob29zZXIodGF4X3R5cGUpXG4gICAgICAgIC8vIGNvbnN0IHN1Yl9hcnJheSA9IHN1YkFycmF5TG9jYXRvcih0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KVxuXG4gICAgICAgIFxuICAgICAgICAvLyBsZXQgdGF4X3N0YWNrID0ge31cbiAgICAgICAgLy8gLy8gc2V0dGluZyB1cCBrZXlzXG4gICAgICAgIC8vIGxldCBrZXlzID0gW11cbiAgICAgICAgLy8gLy8ga2V5cy5wdXNoKHRheF90eXBlKVxuICAgICAgICAvLyBzdWJfYXJyYXkuZm9yRWFjaCgoc3ViX3RheCwgaSkgPT4ge1xuICAgICAgICAvLyAgICAga2V5cy5wdXNoKHN1Yl90YXgua2V5KVxuICAgICAgICAvLyAgICAgdGF4X3N0YWNrW3N1Yl90YXgua2V5XSA9IHN1Yl90YXgucGVyY2VudF9vZl90b3RhbFxuICAgICAgICAvLyB9KTtcbiAgICByZW1vdmUoJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcblxuICAgIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIiNzdWItZGF0YS1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hcHBlbmQoXCJzdmdcIikgXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KS5hdHRyKCdpZCcsICdzdWItZGF0YS1zdmctJyArIHBpZV9udW0pXG4gICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtZy0nICsgcGllX251bSlcbiAgICBjb25zb2xlLmxvZyhzdmcpXG4gICAgdXBkYXRlU3ViRGF0YShjb250YWluZXJfYXJyYXksIHN2ZywgcGllX251bSkobnVsbClcblxuICAgICAgICAvLyBzZXQgdGhlIGxheWVycyBvZiB0aGUgc3RhY2tlZCBiYXJcbiAgICAgICAgLy8gY29uc3QgbGF5ZXJzID0gZDMuc3RhY2soKShbdGF4X3R5cGVdLm1hcCh0YXggPT4geyAgLy8gc2hvdWxkIHVsdGltYXRlbHkganVzdCBiZSB0aGUgb25lIGxheWVyXG4gICAgICAgIC8vICAgICByZXR1cm4gc3ViX2FycmF5Lm1hcChkID0+IHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4geyB4OiBkLmtleSwgeTogZC5hbW91bnQsIHBlcmNlbnQ6IGQucGVyY2VudCB9XG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyB9KSlcbiAgICAgICAgLy8gY29uc3Qgc3RhY2sgPSBkMy5zdGFjaygpXG4gICAgICAgIC8vICAgICAua2V5cyhrZXlzKVxuICAgICAgICAvLyAgICAgLm9yZGVyKGQzLnN0YWNrT3JkZXJOb25lKVxuICAgICAgICAvLyAgICAgLm9mZnNldChkMy5zdGFja09mZnNldE5vbmUpXG4gICAgICAgIC8vIGxldCB0YXhfc3RhY2tfYXJyYXkgPSBbXVxuICAgICAgICAvLyB0YXhfc3RhY2tfYXJyYXkucHVzaCh0YXhfc3RhY2spXG4gICAgICAgIC8vIGNvbnN0IGxheWVycyA9IHN0YWNrKHRheF9zdGFja19hcnJheSlcblxuICAgICAgICAvLyAvLyBjb25zdCB4ID0gZDMuc2NhbGVPcmRpbmFsKClcbiAgICAgICAgLy8gLy8gICAgIC5kb21haW4obGF5ZXJzWzBdLm1hcChkID0+IGQueCkpXG4gICAgICAgIC8vIC8vICAgICAvLyAucmFuZ2UoWzEwLCB3aWR0aF0sIDApICAvLyBtYXkgYmUgYSBxdWlja2VyIHdheSB0byBkbyB0aGlzIGFzIHRoZXJlIGlzIG9ubHkgb25lIGJhclxuICAgICAgICAvLyAvLyAgICAgLnJhbmdlKFt3aWR0aF0pXG4gICAgICAgIC8vIGNvbnN0IHhTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLy8gICAgIC5kb21haW4oWzAsIDFdKVxuICAgICAgICAvLyAgICAgLnJhbmdlKFswLCB3aWR0aF0pXG5cbiAgICAgICAgLy8gLy8gY29uc3QgY29sb3JzID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAvLyAvLyAgICAgLmRvbWFpbihbMSwgMTBdKVxuICAgICAgICAvLyAvLyAgICAgLnJhbmdlKFtcInJlZFwiLCBcImJsdWVcIl0pXG5cbiAgICAgICAgLy8gY29uc3QgY29sb3JzID0gW2NvbG9yX3N0cmluZ11cbiAgICAgICAgLy8gY29uc3QgZGVjcmVtZW50ID0gMTAwIC8ga2V5cy5sZW5ndGhcbiAgICAgICAgLy8gbGV0IG5leHRfY29sb3IgPSBMaWdodGVuRGFya2VuQ29sb3IoY29sb3Jfc3RyaW5nLCBkZWNyZW1lbnQpXG4gICAgICAgIC8vIHdoaWxlIChjb2xvcnMubGVuZ3RoIDwga2V5cy5sZW5ndGgpIHtcbiAgICAgICAgLy8gICAgIGNvbG9ycy5wdXNoKG5leHRfY29sb3IpXG4gICAgICAgIC8vICAgICBuZXh0X2NvbG9yID0gTGlnaHRlbkRhcmtlbkNvbG9yKG5leHRfY29sb3IsIGRlY3JlbWVudClcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbG9ycylcblxuICAgICAgICAvLyBjb25zdCB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC8vICAgICAuZG9tYWluKFswLCBkMy5zdW0oT2JqZWN0LnZhbHVlcyh0YXhfc3RhY2spKV0pICAvLyB0aGUgaW5jcmVtZW50IHVwIHRvIHRoZSB0b3RhbFxuICAgICAgICAvLyAgICAgLy8gLnJhbmdlKFtoZWlnaHQsIDBdKVxuICAgICAgICAvLyAgICAgLnJhbmdlKFswLCBoZWlnaHRdKVxuXG4gICAgICAgIC8vIGNvbnN0IGcgPSBzdmcuc2VsZWN0QWxsKFwiLnN1Yi10YXhlc1wiKSAgLy8gbm8gZyBhdCB0aGlzIHBvaW50LCBidXQgdGhleSB3aWxsIGhhdmUgdGhpcyBjbGFzc1xuICAgICAgICAvLyAgICAgLmRhdGEobGF5ZXJzKS5lbnRlcigpICAvLyBub3cgdGhlcmUgd2lsbCBiZSBhIGcgZm9yIGV2ZXJ5IGJhciB3aXRoaW4gdGhlIGdyYXBoLlxuICAgICAgICAvLyAgICAgLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIFwic3ViLXRheGVzXCIpXG4gICAgICAgIC8vIC8vIC5hdHRyKCdmaWxsJywgZCA9PiB7XG4gICAgICAgIC8vIC8vICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAvLyAvLyAgICAgcmV0dXJuIGNvbG9ycyhkKX0pXG5cbiAgICAgICAgLy8gY29uc3QgcmVjdCA9IGcuc2VsZWN0QWxsKFwicmVjdFwiKSAgLy8gbWFraW5nIGVhY2ggb2JqIG9mIHRoZSBjb3JyZXNwb25kIHRvIGEgcmVjdCB3aXRoaW4gdGhlIGdcbiAgICAgICAgLy8gICAgIC5kYXRhKGxheWVyID0+IGxheWVyKTsgLy8gcHVsbGluZyBvdXQgZWFjaCBpbmRpdmlkdWFsIG9ialxuICAgICAgICAvLyByZWN0LmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgLy8gcmVjdC5lbnRlcigpLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgLy8gICAgIC5hdHRyKCd4JywgZCA9PiB4U2NhbGUoMCkpICAvLyBwYXNzaW5nIGVhY2ggb2JqJ3MgeCB2YWx1ZSB0byB0aGUgZDMgeCBmdW5jdGlvbiBkZWZpbmVkIGFib3ZlXG4gICAgICAgIC8vICAgICAuYXR0cigneScsIGxheWVyID0+IHtcbiAgICAgICAgLy8gICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiBoZWlnaHQgLSB5U2NhbGUobGF5ZXJbMV0pXG4gICAgICAgIC8vICAgICB9KSAgLy8geTAgaXMgdGhlIGhlaWdodCB3aGVyZSBlYWNoIHNlZ21lbnQgaW4gdGhlIHN0YWNrIHN0YXJ0c1xuICAgICAgICAvLyAgICAgLmF0dHIoJ3dpZHRoJywgeFNjYWxlKDEpKSAgLy8gcHJvYmFibHkgY2FuIGhhcmQgY29kZSwgc2luY2Ugb25seSBvbmUgYmFyXG4gICAgICAgIC8vICAgICAuYXR0cignaGVpZ2h0JywgYmFyID0+IHtcbiAgICAgICAgLy8gICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB5U2NhbGUoYmFyWzFdIC0gYmFyWzBdKVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gICAgIC5hdHRyKCdmaWxsJywgZCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gY29sb3JzLnBvcCgpXG4gICAgICAgIC8vICAgICB9KSAgLy8gaGVpZ2h0IGlzIHNldCB0byB0aGUgc3RhcnRpbmcgcG9pbnQgcGx1cyB0aGUgaGVpZ2h0LCBhbmQgYWxsIHRoYXQgc3VidHJhY3RlZCBmcm9tIHRoZSBzdGFydGluZyBwb2ludCBkdWUgdG8geSB2YWx1ZXMgYmVnaW5pbmcgYXQgdG9wIG9mIHNjcmVlblxuICAgICAgICAvLyAgICAgLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB0b29sdGlwLnN0eWxlKFwiZGlzcGxheVwiLCB0cnVlKSkgIC8vIHdhbnQgdGhlIGluZm8gYm94IHRvIHN3aXRjaCBiZXR3ZWVuIHZpc2libGUgYW5kIGluaXZpcyBiYXNlZCBvbiBtb3VzZW92ZXJcbiAgICAgICAgLy8gICAgIC5vbignbW91c2VvdXQnLCAoKSA9PiB0b29sdGlwLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIikpXG4gICAgICAgIC8vICAgICAub24oJ21vdXNlbW92ZScsIGQgPT4geyAgLy8gdGhpcyBpcyBnb2luZyB0byBiZSBhIHN3ZWV0IGVmZmVjdCFcbiAgICAgICAgLy8gICAgICAgICBjb25zdCB4UG9zID0gZDMubW91c2UodGhpcylbMF0gLSAodG9vbHRpcFdpZHRoIC8gMikgLy8gdGhpc1swXSBjb3JyZXNwb25kcyB0byBtb3VzZSdzIHggcG9zLCBhbmQgcHVzaGluZyBpdCBsZWZ0IGJ5IGhhbGYgb2YgdGhlIHRvb2x0aXAncyB3aWR0aCBlbnN1cmUgaXQgaXMgY2VudGVyZWRcbiAgICAgICAgLy8gICAgICAgICBjb25zdCB5UG9zID0gZDMubW91c2UodGhpcylbMV0gLSAyNSAvLyBwdXRzIHRoZSB0b29sdGlwIHVwIGEgYml0IGFib3ZlIHRoZSBjdXJzb3JcbiAgICAgICAgLy8gICAgICAgICB0b29sdGlwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB4UG9zICsgJywnICsgeVBvcyArICcpJylcbiAgICAgICAgLy8gICAgICAgICB0b29sdGlwLnNlbGVjdCgndGV4dCcpLnRleHQoZC5wZXJjZW50X29mX3RvdGFsKSAvLyBzaG93cyB0aGUgcGVyY2VudCAgXG4gICAgICAgIC8vICAgICB9KVxuXG4gICAgICAgIC8vIGNvbnN0IHRvb2x0aXAgPSBzdmcuYXBwZW5kKCdnJykgLy8gc2V0dGluZyB1cCB0aGlzIHN3ZWV0IHRvb2x0aXAuIEV4Y2l0aW5nIVxuICAgICAgICAvLyAgICAgLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLXRvb2x0aXAgdG9vbHRpcCcpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKSAvLyBzdGFydHMgaW52aXNpYmxlXG4gICAgICAgIC8vICAgICAvLyBhZGRpbmcgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIGJveFxuICAgICAgICAvLyAgICAgLmFwcGVuZCgncmVjdCcpLmF0dHIoJ3dpZHRoJywgdG9vbHRpcFdpZHRoKVxuICAgICAgICAvLyAgICAgLmF0dHIoJ2hlaWdodCcsIHRvb2x0aXBIZWlnaHQpLmF0dHIoJ2ZpbGwnLCAnd2hpdGUnKS5zdHlsZSgnb3BhY2l0eScsIDAuNSkgLy8gbWFraW5nIGl0IHBhcnRpYWxseSBzZWUtdGhyb3VnaFxuICAgICAgICAvLyAgICAgLy8gYWRkaW5nIHRoZSB0ZXh0IGNvbnRlbnRcbiAgICAgICAgLy8gICAgIC5hcHBlbmQoJ3RleHQnKS5hdHRyKCd4JywgMTUpXG4gICAgICAgIC8vICAgICAuYXR0cignZHknLCAnLjhlbScpLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgIC8vIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVN1YkRhdGEgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSA9PiB7XG4gICAgXG4gICAgcmV0dXJuIChlbGUpID0+IHtcblxuICAgICAgICByZW1vdmUoJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcblxuXG4gICAgICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIiNzdWItZGF0YS1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKS5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCkuYXR0cignaWQnLCAnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKVxuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtZy0nICsgcGllX251bSlcbiAgICAgICAgICAgIC8vIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIilcblxuXG5cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRheF90eXBlID0gZWxlID8gZWxlLmRhdGEua2V5IDogXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIlxuICAgICAgICBjb25zdCBjb2xvcl9zdHJpbmcgPSBjb2xvckNob29zZXIodGF4X3R5cGUpXG4gICAgICAgIGNvbnN0IHN1Yl9hcnJheSA9IHN1YkFycmF5TG9jYXRvcih0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KVxuICAgICAgICBsZXQgY291bnQgPSAwXG4gICAgXG4gICAgICAgIGxldCB0YXhfc3RhY2sgPSB7fVxuICAgICAgICAvLyBzZXR0aW5nIHVwIGtleXNcbiAgICAgICAgbGV0IGtleXMgPSBbXVxuICAgICAgICAvLyBrZXlzLnB1c2godGF4X3R5cGUpXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKChzdWJfdGF4LCBpKSA9PiB7XG4gICAgICAgICAgICBrZXlzLnB1c2goc3ViX3RheC5rZXkpXG4gICAgICAgICAgICB0YXhfc3RhY2tbc3ViX3RheC5rZXldID0gc3ViX3RheC5wZXJjZW50X29mX3RvdGFsXG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBjb25zdCBzdGFjayA9IGQzLnN0YWNrKClcbiAgICAgICAgICAgIC5rZXlzKGtleXMpXG4gICAgICAgICAgICAub3JkZXIoZDMuc3RhY2tPcmRlck5vbmUpXG4gICAgICAgICAgICAub2Zmc2V0KGQzLnN0YWNrT2Zmc2V0Tm9uZSlcbiAgICAgICAgbGV0IHRheF9zdGFja19hcnJheSA9IFtdXG4gICAgICAgIHRheF9zdGFja19hcnJheS5wdXNoKHRheF9zdGFjaylcbiAgICAgICAgY29uc3QgbGF5ZXJzID0gc3RhY2sodGF4X3N0YWNrX2FycmF5KVxuICAgIFxuICAgICAgICAvLyBjb25zdCB4ID0gZDMuc2NhbGVPcmRpbmFsKClcbiAgICAgICAgLy8gICAgIC5kb21haW4obGF5ZXJzWzBdLm1hcChkID0+IGQueCkpXG4gICAgICAgIC8vICAgICAvLyAucmFuZ2UoWzEwLCB3aWR0aF0sIDApICAvLyBtYXkgYmUgYSBxdWlja2VyIHdheSB0byBkbyB0aGlzIGFzIHRoZXJlIGlzIG9ubHkgb25lIGJhclxuICAgICAgICAvLyAgICAgLnJhbmdlKFt3aWR0aF0pXG4gICAgICAgIGNvbnN0IHhTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIDFdKVxuICAgICAgICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXG4gICAgXG4gICAgICAgIC8vIGNvbnN0IGNvbG9ycyA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLy8gICAgIC5kb21haW4oWzEsIDEwXSlcbiAgICAgICAgLy8gICAgIC5yYW5nZShbXCJyZWRcIiwgXCJibHVlXCJdKVxuXG4gICAgICAgIGNvbnN0IG5ld19jb2xvcnMgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbMCwga2V5cy5sZW5ndGhdKVxuICAgICAgICAgICAgLnJhbmdlKFtcIndoaXRlXCIsIGNvbG9yX3N0cmluZ10pXG4gICAgICAgIFxuICAgICAgICAvLyBjb25zdCBjb2xvcnMgPSBbY29sb3Jfc3RyaW5nXVxuICAgICAgICAvLyBjb25zdCBkZWNyZW1lbnQgPSAxMDAgLyBrZXlzLmxlbmd0aFxuICAgICAgICAvLyBsZXQgbmV4dF9jb2xvciA9IExpZ2h0ZW5EYXJrZW5Db2xvcihjb2xvcl9zdHJpbmcsIGRlY3JlbWVudClcbiAgICAgICAgLy8gd2hpbGUgKGNvbG9ycy5sZW5ndGggPCBrZXlzLmxlbmd0aCkge1xuICAgICAgICAvLyAgICAgY29sb3JzLnB1c2gobmV4dF9jb2xvcilcbiAgICAgICAgLy8gICAgIG5leHRfY29sb3IgPSBMaWdodGVuRGFya2VuQ29sb3IobmV4dF9jb2xvciwgZGVjcmVtZW50KVxuICAgICAgICAvLyB9ICAgIFxuICAgICAgICBjb25zdCB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCBkMy5zdW0oT2JqZWN0LnZhbHVlcyh0YXhfc3RhY2spKV0pICAvLyB0aGUgaW5jcmVtZW50IHVwIHRvIHRoZSB0b3RhbFxuICAgICAgICAgICAgLy8gLnJhbmdlKFtoZWlnaHQsIDBdKVxuICAgICAgICAgICAgLnJhbmdlKFswLCBoZWlnaHRdKVxuICAgIFxuICAgICAgICBjb25zdCBnID0gc3ZnLnNlbGVjdEFsbChcIi5zdWItdGF4ZXMtXCIgKyBwaWVfbnVtKSAgLy8gbm8gZyBhdCB0aGlzIHBvaW50LCBidXQgdGhleSB3aWxsIGhhdmUgdGhpcyBjbGFzc1xuICAgICAgICAgICAgLmRhdGEobGF5ZXJzKS5lbnRlcigpICAvLyBub3cgdGhlcmUgd2lsbCBiZSBhIGcgZm9yIGV2ZXJ5IGJhciB3aXRoaW4gdGhlIGdyYXBoLlxuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdWItdGF4ZXMtXCIgKyBwaWVfbnVtKVxuICAgICAgICAgICAgXG4gICAgICAgIC8vIC5hdHRyKCdmaWxsJywgZCA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgLy8gICAgIHJldHVybiBjb2xvcnMoZCl9KVxuICAgIFxuICAgICAgICBjb25zdCByZWN0ID0gZy5zZWxlY3RBbGwoXCJyZWN0XCIpICAvLyBtYWtpbmcgZWFjaCBvYmogb2YgdGhlIGNvcnJlc3BvbmQgdG8gYSByZWN0IHdpdGhpbiB0aGUgZ1xuICAgICAgICAgICAgLmRhdGEobGF5ZXIgPT4gbGF5ZXIpOyAvLyBwdWxsaW5nIG91dCBlYWNoIGluZGl2aWR1YWwgb2JqXG4gICAgICAgICAgICByZWN0LmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJlY3QuZW50ZXIoKS5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBkID0+IHhTY2FsZSgwKSlcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4U2NhbGUoMSkpICAvLyBwcm9iYWJseSBjYW4gaGFyZCBjb2RlLCBzaW5jZSBvbmx5IG9uZSBiYXJcbiAgICAgICAgICAgICAgICAvLyAuYXR0cigneScsIGJhciA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIHlTY2FsZShiYXJbMV0gLSBiYXJbMF0pXG4gICAgICAgICAgICAgICAgLy8gfSkuYXR0cignaGVpZ2h0JywgYmFyID0+IHtcblxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4geVNjYWxlKGJhclsxXSAtIGJhclswXSlcbiAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgIC8vIC5hdHRyKCd5JywgbGF5ZXIgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBoZWlnaHQgLSB5U2NhbGUobGF5ZXJbMV0pXG4gICAgICAgICAgICAgICAgLy8gfSkgXG4gICAgICAgICAgICAgICAgLm1lcmdlKHJlY3QpXG5cbiAgICAgICAgICAgIC8vIC5hdHRyKCd5JywgbGF5ZXIgPT4ge1xuICAgICAgICAgICAgLy8gICAgIHJldHVybiBoZWlnaHQgLSB5U2NhbGUobGF5ZXJbMV0pXG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3dpZHRoJywgeFNjYWxlKDEpKVxuICAgICAgICAgICAgLy8gLmF0dHIoJ2hlaWdodCcsIGJhciA9PiB7XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIHlTY2FsZShiYXJbMV0gLSBiYXJbMF0pXG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgLy8gLmF0dHIoJ2ZpbGwnLCBkID0+IHtcbiAgICAgICAgICAgIC8vICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiBjb2xvcnMucG9wKClcbiAgICAgICAgICAgIC8vIH0pIFxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB4U2NhbGUoMCkpICAvLyBwYXNzaW5nIGVhY2ggb2JqJ3MgeCB2YWx1ZSB0byB0aGUgZDMgeCBmdW5jdGlvbiBkZWZpbmVkIGFib3ZlXG4gICAgICAgICAgICAuYXR0cigneScsIGxheWVyID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0IC0geVNjYWxlKGxheWVyWzFdKVxuICAgICAgICAgICAgfSkgIC8vIHkwIGlzIHRoZSBoZWlnaHQgd2hlcmUgZWFjaCBzZWdtZW50IGluIHRoZSBzdGFjayBzdGFydHNcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHhTY2FsZSgxKSkgIC8vIHByb2JhYmx5IGNhbiBoYXJkIGNvZGUsIHNpbmNlIG9ubHkgb25lIGJhclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGJhciA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHlTY2FsZShiYXJbMV0gLSBiYXJbMF0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAoZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdfY29sb3JzKCsrY291bnQpXG4gICAgICAgICAgICB9KSBcbiAgICAgICAgICAgIGNvdW50ID0gMFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB0b29sdGlwID0gc3ZnLmFwcGVuZCgnZycpIC8vIHNldHRpbmcgdXAgdGhpcyBzd2VldCB0b29sdGlwLiBFeGNpdGluZyFcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS10b29sdGlwIHRvb2x0aXAnKS5zdHlsZSgnZGlzcGxheScsICdub25lJykgLy8gc3RhcnRzIGludmlzaWJsZVxuICAgICAgICAgICAgLy8gYWRkaW5nIHRoZSBkaW1lbnNpb25zIG9mIHRoZSBib3hcbiAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKS5hdHRyKCd3aWR0aCcsIHRvb2x0aXBXaWR0aClcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0b29sdGlwSGVpZ2h0KS5hdHRyKCdmaWxsJywgJ3doaXRlJykuc3R5bGUoJ29wYWNpdHknLCAwLjUpIC8vIG1ha2luZyBpdCBwYXJ0aWFsbHkgc2VlLXRocm91Z2hcbiAgICAgICAgICAgIC8vIGFkZGluZyB0aGUgdGV4dCBjb250ZW50XG4gICAgICAgICAgICAuYXBwZW5kKCd0ZXh0JykuYXR0cigneCcsIDE1KVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgJy44ZW0nKS5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc3ZnLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9vbHRpcC5zdHlsZShcImRpc3BsYXlcIiwgdHJ1ZSl9KSAgLy8gd2FudCB0aGUgaW5mbyBib3ggdG8gc3dpdGNoIGJldHdlZW4gdmlzaWJsZSBhbmQgaW5pdmlzIGJhc2VkIG9uIG1vdXNlb3ZlclxuICAgICAgICAgICAgc3ZnLm9uKCdtb3VzZW91dCcsICgpID0+IHRvb2x0aXAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKSlcbiAgICAgICAgICAgIHN2Zy5vbignbW91c2Vtb3ZlJywgZCA9PiB7ICAvLyB0aGlzIGlzIGdvaW5nIHRvIGJlIGEgc3dlZXQgZWZmZWN0IVxuICAgICAgICAgICAgICAgIGNvbnN0IG1vdXNlID0gZDMubW91c2UodGhpcylcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeFBvcyA9IG1vdXNlWzBdIC0gKHRvb2x0aXBXaWR0aCAvIDIpIC8vIHRoaXNbMF0gY29ycmVzcG9uZHMgdG8gbW91c2UncyB4IHBvcywgYW5kIHB1c2hpbmcgaXQgbGVmdCBieSBoYWxmIG9mIHRoZSB0b29sdGlwJ3Mgd2lkdGggZW5zdXJlIGl0IGlzIGNlbnRlcmVkXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHlQb3MgPSBtb3VzZVsxXSAtIDI1IC8vIHB1dHMgdGhlIHRvb2x0aXAgdXAgYSBiaXQgYWJvdmUgdGhlIGN1cnNvclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB4UG9zICsgJywnICsgeVBvcyArICcpJylcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJ3RleHQnKS50ZXh0KGQucGVyY2VudF9vZl90b3RhbCkgLy8gc2hvd3MgdGhlIHBlcmNlbnQgIFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgdmFyIGxlZ2VuZCA9IGQzLnNlbGVjdChcIiNzdWItZGF0YS1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcbiAgICAgICAgICAgIC8vIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyAocGFkZGluZyArIDEyKSArICcsIDApJyk7XG5cbiAgICAgICAgbGVnZW5kLnNlbGVjdEFsbCgncmVjdCcpXG4gICAgICAgICAgICAuZGF0YShrZXlzLnJldmVyc2UoKSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuaW5zZXJ0KCdyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCd4JywgMClcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDE4O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIDEyKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDEyKVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdfY29sb3JzKCsrY291bnQpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsZWdlbmQuc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAgICAgICAgIC5kYXRhKGtleXMucmV2ZXJzZSgpKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5pbnNlcnQoJ3RleHQnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cigneCcsIDE4KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICogMTg7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ3N0YXJ0JylcbiAgICAgICAgICAgIC5hdHRyKCdhbGlnbm1lbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpO1xuICAgIH1cblxufVxuXG5jb25zdCBjb2xvckNob29zZXIgPSAodGF4X3R5cGUpID0+IHtcbiAgICBzd2l0Y2ggKHRheF90eXBlKSB7XG4gICAgICAgIGNhc2UgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzRdXG4gICAgICAgIGNhc2UgJ1Byb3BlcnR5IFRheGVzJzpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzNdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gQ0lSQ0xFX0NPTE9SU1syXVxuICAgICAgICBjYXNlICdJbmNvbWUgVGF4ZXMnOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbMV1cbiAgICAgICAgY2FzZSAnT3RoZXIgVGF4ZXMnOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbMF1cbiAgICB9XG59XG5cbiIsIlxuaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHBpZUxlZ2VuZCB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfbGVnZW5kJ1xuaW1wb3J0IHsgc3RhdGVfc2VsZWN0b3IsIFRPUF9MRVZFTCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGF0ZV9zZWxlY3RvcidcbmltcG9ydCB7IGJ1ZGdldENpcmNsZSB9IGZyb20gJy4vY29tcG9uZW50cy9oZWxwZXJfZnVuY3Rpb25zJ1xuaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2NzcydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIFxuICAgIC8vIFBDRyAtPiBjc3ZQYXRoLCBzZWN0b3IsIGFtb3V0LCBsb2NhdGlvbiwgbXVsdGlwbGllciwgc2tpcFxuICAgIFxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgICAvLyBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHNlbGVjdF8xID0gc3RhdGVfc2VsZWN0b3IoMSlcbiAgICBjb25zdCBzZWxlY3RfMiA9IHN0YXRlX3NlbGVjdG9yKDIpXG4gICAgY29uc3Qgc2VsZWN0b3JfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdG9yLWNvbnRhaW5lclwiKVswXVxuICAgIFxuICAgIGNvbnN0IHllYXJTZWxlY3RvciA9IHllYXJTZWxlY3RvclxuXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8xKVxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMilcbiAgICByb290LmFwcGVuZENoaWxkKHVsKVxuXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJBbGFiYW1hXCIsIFRPUF9MRVZFTCwgMSlcbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIld5b21pbmdcIiwgVE9QX0xFVkVMLCAyKVxuXG4gICAgXG59KVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==