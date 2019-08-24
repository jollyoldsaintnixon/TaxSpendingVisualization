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
        }).transition().ease(d3.easeLinear).duration(750).attrTween('d', pieTween);

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

    tooltipCreator(pie_num, tax_type);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnVkZ2V0X2NpcmNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9oZWxwZXJfZnVuY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGllX2xlZ2VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdGF0ZV9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdWJfZGF0YV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3ViZGF0YV9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYXBwLnNjc3M/ZmY0OCJdLCJuYW1lcyI6WyJidWRnZXRDaXJjbGUiLCJ0b3RhbDEiLCJ0b3RhbDIiLCJ1cGRhdGUiLCJNYXRoIiwic3FydCIsImNpcmNsZV9jb250YWluZXIiLCJkMyIsInNlbGVjdCIsImhlaWdodCIsIndpZHRoIiwic3ZnMSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhcHBlbmQiLCJhdHRyIiwic3ZnMiIsImRhdGEiLCJyc2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsIm1heCIsInJhbmdlIiwiY2lyY2xlMSIsInNlbGVjdEFsbCIsImNpcmNsZTIiLCJlbnRlciIsImQiLCJpIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwiTGlnaHRlbkRhcmtlbkNvbG9yIiwiYXNzaWduQm94IiwiYXJyYXlfb2Zfb2JqcyIsInBpZV9udW0iLCJzaWRlIiwiZm9yRWFjaCIsIm9iaiIsImtleSIsImJveCIsImRlY2ltYWxzIiwiU3RyaW5nIiwicGVyY2VudCIsInNwbGl0IiwiaW50ZWdlcnMiLCJzbGljZWQiLCJzbGljZSIsImlubmVySFRNTCIsImZpbmRBbW91bnQiLCJhbW91bnQiLCJqb2luIiwic3ViQXJyYXlMb2NhdG9yIiwidGF4X3R5cGUiLCJjb250YWluZXJfYXJyYXkiLCJjb2wiLCJhbXQiLCJ1c2VQb3VuZCIsIm51bSIsInBhcnNlSW50IiwiciIsImIiLCJnIiwidG9TdHJpbmciLCJwU0JDIiwicCIsImMwIiwiYzEiLCJsIiwiUCIsImYiLCJ0IiwiaCIsIm0iLCJyb3VuZCIsImEiLCJwU0JDciIsIm4iLCJsZW5ndGgiLCJ4IiwicGFyc2VGbG9hdCIsInVuZGVmaW5lZCIsInJlbW92ZSIsImlkIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwicmVtb3ZlQ2xhc3MiLCJyZW1vdmVfbGlzdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbGFzc05hbWUiLCJwZXJjZW50aWZ5IiwibnVtYmVyIiwiZmxvb3IiLCJQaWVDaGFydEdlbmVyYXRvciIsIkNPTE9SUyIsIkNJUkNMRV9DT0xPUlMiLCJMQUJFTFMiLCJzdGF0ZSIsImNzdiIsImgxIiwic3BhbiIsImgyIiwiVE9UQUwiLCJUWVBFUyIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInJhZGl1cyIsImNvbG9ycyIsInNjYWxlT3JkaW5hbCIsImFyYyIsIm91dGVyUmFkaXVzIiwiaW5uZXJSYWRpdXMiLCJwaWUiLCJ2YWx1ZSIsInN2ZyIsInRoZW4iLCJzYWxlc190YXhlcyIsImxpY2Vuc2VfdGF4ZXMiLCJpbmNvbWVfdGF4ZXMiLCJvdGhlcl90YXhlcyIsInByb3BlcnR5X3RheGVzIiwiR2VvX05hbWUiLCJpdGVtIiwiQU1PVU5UIiwidGF4X29iaiIsIlRheF9UeXBlIiwicGVyY2VudF9vZl90b3RhbCIsInB1c2giLCJpbmNsdWRlcyIsInRleHQiLCJmb3JtYXQiLCJzdHlsZSIsInBhdGgiLCJlYXNlIiwiZWFzZUxpbmVhciIsImF0dHJUd2VlbiIsInBpZVR3ZWVuIiwic3ViX2RhdGFfc3ZnIiwib24iLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlQ2xpY2siLCJzcGFuMSIsInNwYW4yIiwiaW5uZXJUZXh0IiwiY2F0Y2giLCJlcnJvciIsImludGVycG9sYXRlIiwic3RhcnRBbmdsZSIsImVuZEFuZ2xlIiwiZWxlIiwicGllTGVnZW5kIiwibWFzdGVyX2xpc3QiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwibGVmdF9saXN0IiwidGV4dF9saXN0IiwicmlnaHRfbGlzdCIsImxlZnRfYm94IiwidGV4dF9ib3giLCJyaWdodF9ib3giLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlciIsImFwcGVuZENoaWxkIiwic3VibGlzdHMiLCJsYWJlbCIsImxpc3RzIiwibGVzdGxpc3QiLCJ0ZXh0bGlzdCIsInJpZ2h0bGlzdCIsImxlZnRCb3giLCJyaWdodEJveCIsImxpIiwic3VibGlzdCIsIlRPUF9MRVZFTCIsIlNUQVRFX05BTUVTIiwic3RhdGVfc2VsZWN0b3IiLCJ3cmFwcGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJzdGF0ZV9saXN0IiwidG9nZ2xlIiwiYm9keSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3RhdGVTZWxlY3RvciIsInN0YXRlX2xpc3RfaXRlbSIsInNldEF0dHJpYnV0ZSIsInN1YkRhdGFMZWdlbmQiLCJsYWJlbHMiLCJoZWlnaHRzIiwibWFzdGVyX3N1Yl9kYXRhX2xpc3QiLCJwZXJjZW50X2xpc3QiLCJsYWJlbF9saXN0IiwiY29sb3JfYm94IiwidG9vbHRpcFdpZHRoIiwidG9vbHRpcEhlaWdodCIsInVwZGF0ZVN1YkRhdGEiLCJjb2xvcl9zdHJpbmciLCJjb2xvckNob29zZXIiLCJzdWJfYXJyYXkiLCJjb2xvcl9jb3VudCIsImlkX2NvdW50IiwidGF4X3N0YWNrIiwia2V5cyIsInN1Yl90YXgiLCJzdGFjayIsIm9yZGVyIiwic3RhY2tPcmRlck5vbmUiLCJvZmZzZXQiLCJzdGFja09mZnNldE5vbmUiLCJ0YXhfc3RhY2tfYXJyYXkiLCJsYXllcnMiLCJ4U2NhbGUiLCJuZXdfY29sb3JzIiwieVNjYWxlIiwic3VtIiwiT2JqZWN0IiwidmFsdWVzIiwicmVjdCIsImxheWVyIiwiZXhpdCIsIm1lcmdlIiwiYmFyIiwidG9vbHRpcENyZWF0b3IiLCJsZWdlbmRDcmVhdG9yIiwic3ViX2RhdGFfZGV0YWlscyIsInJlbGF0aXZlX3BlcmNlbnRfZGV0YWlscyIsIm92ZXJhbGxfcGVyY2VudF9kZXRhaWxzIiwibGlzdCIsInZhbmlsbGFfc3ZnIiwiaW5kZXgiLCJpbmRleE9mIiwiYmFja2dyb3VuZCIsInNwbGl0X2lkIiwidGFyZ2V0IiwibGVnZW5kX3RleHQiLCJib3hfZGF0YSIsInJlbGF0aXZlX3BlcmNlbnQiLCJiYXNlVmFsIiwib3ZlcmFsbF9wZXJjZW50IiwibGVnZW5kIiwicmV2ZXJzZSIsImluc2VydCIsInJvb3QiLCJ1bCIsInNlbGVjdF8xIiwic2VsZWN0XzIiLCJzZWxlY3Rvcl9jb250YWluZXIiLCJ5ZWFyU2VsZWN0b3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7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QUFDQTtBQUNBO0FBRUgsQ0FyQkQsRTs7Ozs7Ozs7Ozs7QUNQQSx1QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIlxuXG5leHBvcnQgY29uc3QgYnVkZ2V0Q2lyY2xlID0gKHRvdGFsMSwgdG90YWwyLCB1cGRhdGUpID0+IHtcbiAgICAvLyBJIGdvdCBhIGxvdCBvZiBoZWxwIGZyb20gQmVuIEdhbywgYW4gQXBwIEFjYWRlbXkgVEFcbiAgICBpZiAoIXRvdGFsMSB8fCAhdG90YWwyKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICB0b3RhbDEgPSBNYXRoLnNxcnQodG90YWwxKVxuICAgIHRvdGFsMiA9IE1hdGguc3FydCh0b3RhbDIpXG5cbiAgICBjb25zdCBjaXJjbGVfY29udGFpbmVyID0gZDMuc2VsZWN0KCcjYnVkZ2V0LWNpcmNsZS1jb250YWluZXInKVxuXG4gICAgY29uc3QgaGVpZ2h0ID0gMzAwXG4gICAgY29uc3Qgd2lkdGggPSA1MDBcbiAgICBcbiAgICBjb25zdCBzdmcxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1zdmctMScpID8gZDMuc2VsZWN0KCcjY2lyY2xlLXN2Zy0xJykgOiBjaXJjbGVfY29udGFpbmVyLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKS5hdHRyKCdpZCcsICdjaXJjbGUtc3ZnLTEnKTtcbiAgICBjb25zdCBzdmcyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1zdmctMicpID8gZDMuc2VsZWN0KCcjY2lyY2xlLXN2Zy0yJykgOiBjaXJjbGVfY29udGFpbmVyLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKS5hdHRyKCdpZCcsICdjaXJjbGUtc3ZnLTInKTtcblxuICAgIGNvbnN0IGRhdGEgPSBbdG90YWwxLCB0b3RhbDJdXG5cbiAgICAvLyBjb25zdCBzdmcxID0gY2lyY2xlX2NvbnRhaW5lci5hcHBlbmQoJ3N2ZycpXG4gICAgLy8gICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgLy8gICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJykuYXR0cignaWQnLCAnY2lyY2xlLXN2Zy0xJyk7XG5cbiAgICAvLyBjb25zdCBzdmcyID0gY2lyY2xlX2NvbnRhaW5lci5hcHBlbmQoJ3N2ZycpXG4gICAgLy8gICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgLy8gICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJykuYXR0cignaWQnLCAnY2lyY2xlLXN2Zy0yJyk7XG5cbiAgICBjb25zdCByc2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oWzAsIChkMy5tYXgoZGF0YSkpXSlcbiAgICAgICAgLnJhbmdlKFsxLCBoZWlnaHQgLyAyXSlcblxuICAgIGlmICghdXBkYXRlKSB7XG4gICAgICAgIGNvbnN0IGNpcmNsZTEgPSBzdmcxLnNlbGVjdEFsbCgnLmNpcmNsZXMtMScpLmRhdGEoW3RvdGFsMV0pXG4gICAgICAgIGNvbnN0IGNpcmNsZTIgPSBzdmcyLnNlbGVjdEFsbCgnLmNpcmNsZXMtMicpLmRhdGEoW3RvdGFsMl0pXG4gICAgICAgIGNpcmNsZTEuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcnNjYWxlKGQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZXMtMScpLmF0dHIoJ2N5JywgaGVpZ2h0IC8gMilcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIChkLCBpKSA9PiB3aWR0aCAvIDIpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICcjMGE4MGFlJylcblxuICAgICAgICBjaXJjbGUyLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlcy0yJykuYXR0cignY3knLCBoZWlnaHQgLyAyKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgKGQsIGkpID0+IHdpZHRoIC8gMilcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJyMwYTgwYWUnKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGQzLnNlbGVjdCgnLmNpcmNsZXMtMScpXG4gICAgICAgIC5kYXRhKFt0b3RhbDFdKVxuICAgICAgICAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIGQzLnNlbGVjdCgnLmNpcmNsZXMtMicpXG4gICAgICAgIC5kYXRhKFt0b3RhbDJdKVxuICAgICAgICAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgfVxuICAgIFxufSIsImltcG9ydCB7IENJUkNMRV9DT0xPUlMgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBhc3NpZ25Cb3ggPSAoYXJyYXlfb2Zfb2JqcywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQtYm94LScgOiAncmlnaHQtYm94LSdcbiAgICBhcnJheV9vZl9vYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGkgPSA0O1xuICAgICAgICBzd2l0Y2ggKG9iai5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAwIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAxIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMiBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAzIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBpKVxuICAgICAgICBjb25zdCBkZWNpbWFscyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVsxXVxuICAgICAgICBjb25zdCBpbnRlZ2VycyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVswXVxuICAgICAgICBjb25zdCBzbGljZWQgPSBvYmoucGVyY2VudCA/IGludGVnZXJzICsgJy4nICsgZGVjaW1hbHMuc2xpY2UoMCwgMikgOiAwXG4gICAgICAgIGJveC5pbm5lckhUTUwgPSBzbGljZWQgKyAnJSdcbiAgICB9KTtcbn1cblxuLy8gZC5BTU9VTlQgPT09ICdYJyA/IDAgOiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMCxcbmV4cG9ydCBjb25zdCBmaW5kQW1vdW50ID0gKGFtb3VudCkgPT4ge1xuICAgIHJldHVybiBhbW91bnQgPT09ICdYJyA/IDAgOiBhbW91bnQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDBcbn1cblxuLy8gZXhwb3J0IGNvbnN0IHN1YkRhdGFQdXNoZXIgPSAoaXRlbSkgPT4ge1xuLy8gICAgIGlmIChpdGVtICE9IFwiVDAwXCIgJiYgaXRlbSAhPSBcIlQwMVwiKSB7XG4vLyAgICAgICAgIHN3aXRjaCAoaXRlbS5zbGljZSgwLCAyKSkge1xuLy8gICAgICAgICAgICAgY2FzZSAoXCJUMFwiIHx8IFwiVDFcIik6XG4vLyAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh7XG4vLyAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbi8vICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbi8vICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICBcbi8vICAgICAgICAgICAgIGNhc2UgXCJUMlwiOlxuLy8gICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh7XG4gICAgXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1cblxuXG5cbmV4cG9ydCBjb25zdCBzdWJBcnJheUxvY2F0b3IgPSAodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSkgPT4geyAgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBmaW5kaW5nIHRoZSByaWdodCBzdWIgYXJyYXkuIEEgYml0IGhhcmQtY29kZWQuXG4gICAgc3dpdGNoICh0YXhfdHlwZSkge1xuICAgICAgICBjYXNlIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzBdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzFdXG4gICAgICAgIGNhc2UgXCJJbmNvbWUgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMl1cbiAgICAgICAgY2FzZSBcIk90aGVyIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzNdXG4gICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVs0XVxuICAgIH1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiB3YXMgdGFrZW4gZnJvbSB1c2VyIFBpbXAgVHJpemtpdHMgcG9zdCBvbiBzdGFja292ZXJmbG93IGF0IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU1NjAyNDgvcHJvZ3JhbW1hdGljYWxseS1saWdodGVuLW9yLWRhcmtlbi1hLWhleC1jb2xvci1vci1yZ2ItYW5kLWJsZW5kLWNvbG9yc1xuZXhwb3J0IGZ1bmN0aW9uIExpZ2h0ZW5EYXJrZW5Db2xvcihjb2wsIGFtdCkge1xuICAgIHZhciB1c2VQb3VuZCA9IGZhbHNlO1xuICAgIGlmIChjb2xbMF0gPT0gXCIjXCIpIHtcbiAgICAgICAgY29sID0gY29sLnNsaWNlKDEpO1xuICAgICAgICB1c2VQb3VuZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIG51bSA9IHBhcnNlSW50KGNvbCwgMTYpO1xuXG4gICAgdmFyIHIgPSAobnVtID4+IDE2KSArIGFtdDtcblxuICAgIGlmIChyID4gMjU1KSByID0gMjU1O1xuICAgIGVsc2UgaWYgKHIgPCAwKSByID0gMDtcblxuICAgIHZhciBiID0gKChudW0gPj4gOCkgJiAweDAwRkYpICsgYW10O1xuXG4gICAgaWYgKGIgPiAyNTUpIGIgPSAyNTU7XG4gICAgZWxzZSBpZiAoYiA8IDApIGIgPSAwO1xuXG4gICAgdmFyIGcgPSAobnVtICYgMHgwMDAwRkYpICsgYW10O1xuXG4gICAgaWYgKGcgPiAyNTUpIGcgPSAyNTU7XG4gICAgZWxzZSBpZiAoZyA8IDApIGcgPSAwO1xuXG4gICAgcmV0dXJuICh1c2VQb3VuZCA/IFwiI1wiIDogXCJcIikgKyAoZyB8IChiIDw8IDgpIHwgKHIgPDwgMTYpKS50b1N0cmluZygxNik7XG59XG4vLyBUaGlzIGZ1bmN0aW9uIHdhcyBhbHNvIHRha2VuIGZyb20gdXNlciBQaW1wIFRyaXpraXRzIHBvc3Qgb24gc3RhY2tvdmVyZmxvdyBhdCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTYwMjQ4L3Byb2dyYW1tYXRpY2FsbHktbGlnaHRlbi1vci1kYXJrZW4tYS1oZXgtY29sb3Itb3ItcmdiLWFuZC1ibGVuZC1jb2xvcnNcbmV4cG9ydCBjb25zdCBwU0JDID0gKHAsIGMwLCBjMSwgbCkgPT4ge1xuICAgIGxldCByLCBnLCBiLCBQLCBmLCB0LCBoLCBpID0gcGFyc2VJbnQsIG0gPSBNYXRoLnJvdW5kLCBhID0gdHlwZW9mIChjMSkgPT0gXCJzdHJpbmdcIjtcbiAgICBpZiAodHlwZW9mIChwKSAhPSBcIm51bWJlclwiIHx8IHAgPCAtMSB8fCBwID4gMSB8fCB0eXBlb2YgKGMwKSAhPSBcInN0cmluZ1wiIHx8IChjMFswXSAhPSAncicgJiYgYzBbMF0gIT0gJyMnKSB8fCAoYzEgJiYgIWEpKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIXRoaXMucFNCQ3IpIHRoaXMucFNCQ3IgPSAoZCkgPT4ge1xuICAgICAgICBsZXQgbiA9IGQubGVuZ3RoLCB4ID0ge307XG4gICAgICAgIGlmIChuID4gOSkge1xuICAgICAgICAgICAgW3IsIGcsIGIsIGFdID0gZCA9IGQuc3BsaXQoXCIsXCIpLCBuID0gZC5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobiA8IDMgfHwgbiA+IDQpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgeC5yID0gaShyWzNdID09IFwiYVwiID8gci5zbGljZSg1KSA6IHIuc2xpY2UoNCkpLCB4LmcgPSBpKGcpLCB4LmIgPSBpKGIpLCB4LmEgPSBhID8gcGFyc2VGbG9hdChhKSA6IC0xXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobiA9PSA4IHx8IG4gPT0gNiB8fCBuIDwgNCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAobiA8IDYpIGQgPSBcIiNcIiArIGRbMV0gKyBkWzFdICsgZFsyXSArIGRbMl0gKyBkWzNdICsgZFszXSArIChuID4gNCA/IGRbNF0gKyBkWzRdIDogXCJcIik7XG4gICAgICAgICAgICBkID0gaShkLnNsaWNlKDEpLCAxNik7XG4gICAgICAgICAgICBpZiAobiA9PSA5IHx8IG4gPT0gNSkgeC5yID0gZCA+PiAyNCAmIDI1NSwgeC5nID0gZCA+PiAxNiAmIDI1NSwgeC5iID0gZCA+PiA4ICYgMjU1LCB4LmEgPSBtKChkICYgMjU1KSAvIDAuMjU1KSAvIDEwMDA7XG4gICAgICAgICAgICBlbHNlIHguciA9IGQgPj4gMTYsIHguZyA9IGQgPj4gOCAmIDI1NSwgeC5iID0gZCAmIDI1NSwgeC5hID0gLTFcbiAgICAgICAgfSByZXR1cm4geFxuICAgIH07XG4gICAgaCA9IGMwLmxlbmd0aCA+IDksIGggPSBhID8gYzEubGVuZ3RoID4gOSA/IHRydWUgOiBjMSA9PSBcImNcIiA/ICFoIDogZmFsc2UgOiBoLCBmID0gcFNCQ3IoYzApLCBQID0gcCA8IDAsIHQgPSBjMSAmJiBjMSAhPSBcImNcIiA/IHBTQkNyKGMxKSA6IFAgPyB7IHI6IDAsIGc6IDAsIGI6IDAsIGE6IC0xIH0gOiB7IHI6IDI1NSwgZzogMjU1LCBiOiAyNTUsIGE6IC0xIH0sIHAgPSBQID8gcCAqIC0xIDogcCwgUCA9IDEgLSBwO1xuICAgIGlmICghZiB8fCAhdCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGwpIHIgPSBtKFAgKiBmLnIgKyBwICogdC5yKSwgZyA9IG0oUCAqIGYuZyArIHAgKiB0LmcpLCBiID0gbShQICogZi5iICsgcCAqIHQuYik7XG4gICAgZWxzZSByID0gbSgoUCAqIGYuciAqKiAyICsgcCAqIHQuciAqKiAyKSAqKiAwLjUpLCBnID0gbSgoUCAqIGYuZyAqKiAyICsgcCAqIHQuZyAqKiAyKSAqKiAwLjUpLCBiID0gbSgoUCAqIGYuYiAqKiAyICsgcCAqIHQuYiAqKiAyKSAqKiAwLjUpO1xuICAgIGEgPSBmLmEsIHQgPSB0LmEsIGYgPSBhID49IDAgfHwgdCA+PSAwLCBhID0gZiA/IGEgPCAwID8gdCA6IHQgPCAwID8gYSA6IGEgKiBQICsgdCAqIHAgOiAwO1xuICAgIGlmIChoKSByZXR1cm4gXCJyZ2JcIiArIChmID8gXCJhKFwiIDogXCIoXCIpICsgciArIFwiLFwiICsgZyArIFwiLFwiICsgYiArIChmID8gXCIsXCIgKyBtKGEgKiAxMDAwKSAvIDEwMDAgOiBcIlwiKSArIFwiKVwiO1xuICAgIGVsc2UgcmV0dXJuIFwiI1wiICsgKDQyOTQ5NjcyOTYgKyByICogMTY3NzcyMTYgKyBnICogNjU1MzYgKyBiICogMjU2ICsgKGYgPyBtKGEgKiAyNTUpIDogMCkpLnRvU3RyaW5nKDE2KS5zbGljZSgxLCBmID8gdW5kZWZpbmVkIDogLTIpXG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoaWQpID0+IHtcbiAgICBjb25zdCByZW1vdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcbiAgICByZW1vdmUgPyByZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUpIDogbnVsbFxufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2xhc3MgPSBjbGFzc05hbWUgPT4ge1xuICAgIGNvbnN0IHJlbW92ZV9saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpXG4gICAgZGVidWdnZXJcbiAgICByZW1vdmVfbGlzdC5sZW5ndGggPyByZW1vdmVfbGlzdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG59XG5cbmV4cG9ydCBjb25zdCBwZXJjZW50aWZ5ID0gbnVtYmVyID0+IHtcbiAgICBpZiAodHlwZW9mIG51bWJlciA9PT0gU3RyaW5nKSB7XG4gICAgICAgIG51bWJlciA9IHBhcnNlRmxvYXQobnVtYmVyLnNwbGl0KCckJylbMV0pXG4gICAgfVxuICAgIHJldHVybiBNYXRoLmZsb29yKG51bWJlciAqIDEwMCkgLyAxMDBcbn0iLCIvLyBBIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGJhc2VkIGhlYXZpbHkgb2ZmIG9mIEthcnRoaWsgVGhvdGEncyB5b3V0dWJlIHR1dG9yaWFsIFwiSW50cm9kdWN0aW9uIHRvIGQzLmpzID0gUGllIENoYXJ0IGFuZCBEb251dCBDaGFydFwiXG4vLyBUaGUgbGVnZW5kIGNvZGUgd2FzIGZyb20gQ3J5cHRlcnMgSW5mb3RlY2gncyB5b3V0dWJlIHR1dG9yaWFsIFwiUGllIENoYXJ0IHVzaW5nIEQzLmpzXCJcblxuaW1wb3J0IHsgYXNzaWduQm94LCBmaW5kQW1vdW50IH0gZnJvbSAnLi9oZWxwZXJfZnVuY3Rpb25zJ1xuaW1wb3J0IHsgYnVkZ2V0Q2lyY2xlIH0gZnJvbSAnLi9idWRnZXRfY2lyY2xlJ1xuaW1wb3J0IHsgc3ViRGF0YSwgdXBkYXRlU3ViRGF0YSB9IGZyb20gJy4vc3ViZGF0YV9nZW5lcmF0b3InXG5pbXBvcnQgeyB0b29sdGlwQ3JlYXRvciB9IGZyb20gJy4vc3ViZGF0YV9nZW5lcmF0b3InXG4vLyBcbmV4cG9ydCBjb25zdCBDT0xPUlMgPSBbXCIjYTY3NTFlXCIsIFwiIzlhMDA0N1wiLCBcIiM2NmE1MWVcIiwgXCIjZWU3NzMxXCIsIFwiI2U4MmI4YVwiXVxuZXhwb3J0IGNvbnN0IENJUkNMRV9DT0xPUlMgPSBbQ09MT1JTWzFdLCBDT0xPUlNbMF0sIENPTE9SU1s0XSwgQ09MT1JTWzJdLCBDT0xPUlNbM11dXG4vLyBleHBvcnQgY29uc3QgTEFCRUxTID0gW1wiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiT3RoZXIgVGF4ZXNcIl1cbmV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJPdGhlciBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIFRheGVzXCJdXG4vLyBleHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3IoY3N2UGF0aCwgc2VjdG9yLCBhbW91bnQsIHN0YXRlLCBtdWx0aXBsaWVyID0gMSwgc2tpcCA9IDEpIHtcbmV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgdGF4X3R5cGUsIHBpZV9udW0sIGNzdiA9IFwiLi9zcmMvYXNzZXRzL2RhdGEvRlkyMDE4LVNUQy1EZXRhaWxlZC1UYWJsZS5jc3ZcIiwgdXBkYXRlID0gdHJ1ZSkge1xuXG4gICAgLy8gY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG4gICAgLy8gY29uc3QgcmVtb3ZlMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGV0YWlscy1cIiArIHBpZV9udW0pXG4gICAgLy8gcmVtb3ZlMiA/IHJlbW92ZTIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUyKSA6IG51bGxcblxuICAgIGNvbnN0IGgxID0gZDMuc2VsZWN0KCcjdG90YWxzLWhlYWRlci0nICsgcGllX251bSlcbiAgICBjb25zdCBzcGFuID0gZDMuc2VsZWN0KCcjdG90YWxzLXNwYW4tJyArIHBpZV9udW0pXG4gICAgY29uc3QgaDIgPSBkMy5zZWxlY3QoXCIjZGV0YWlscy1cIiArIHBpZV9udW0pXG5cblxuICAgIGxldCBUT1RBTCA9IDA7XG4gICAgbGV0IFRZUEVTID0gW11cbiAgICAvLyBDSVJDTEUgVElNRSBCQUJZXG4gICAgLy8gbWFyZ2luIGFuZCByYWRpdXNcbiAgICBjb25zdCBtYXJnaW4gPSB7IHRvcDogMjAwLCByaWdodDogMjAwLCBib3R0b206IDIwMCwgbGVmdDogMjAwIH0sXG4gICAgICAgIGhlaWdodCA9IDEwMDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSxcbiAgICAgICAgd2lkdGggPSAxMDAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXG4gICAgICAgIHJhZGl1cyA9IHdpZHRoIC8gMjtcblxuXG5cbiAgICBjb25zdCBjb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoQ09MT1JTKTtcblxuICAgIC8vIGFyYyBnZW5lcmF0b3JcbiAgICBjb25zdCBhcmMgPSBkMy5hcmMoKVxuICAgICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gMTApXG4gICAgICAgIC8vIC5pbm5lclJhZGl1cygwKTsgLy8gZm9yIGNpcmNsZVxuICAgICAgICAuaW5uZXJSYWRpdXMocmFkaXVzIC0gMTAwKSAvLyBmb3IgZG9udXRcblxuICAgIC8vIGNvbnN0IGxhYmxlQXJjID0gZDMuYXJjKClcbiAgICAvLyAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDUwKVxuICAgIC8vICAgICAuaW5uZXJSYWRpdXMocmFkaXVzIC0gNTApO1xuXG4gICAgLy8gcGllIGdlbmVyYXRvclxuICAgIGNvbnN0IHBpZSA9IGQzLnBpZSgpXG4gICAgICAgIC8vIC5zb3J0KG51bGwpXG4gICAgICAgIC52YWx1ZShkID0+IGQuYW1vdW50KTtcblxuICAgIC8vIGRlZmluZSBzdmcgXG4gICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiLnBpZS1cIiArIHBpZV9udW0pLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAuYXR0cihcImlkXCIsIFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgd2lkdGggLyAyICsgXCIsXCIgKyBoZWlnaHQgLyAyICsgXCIpXCIpXG5cbiAgICAvLyBpbXBvcnQgZGF0YVxuICAgIGQzLmNzdihjc3YpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBhcnJheXMgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIHN1YiBsZXZlbCB0YXggZGF0YVxuICAgICAgICBsZXQgc2FsZXNfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgbGljZW5zZV90YXhlcyA9IFtdXG4gICAgICAgIGxldCBpbmNvbWVfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgb3RoZXJfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgcHJvcGVydHlfdGF4ZXMgPSBbXVxuICAgICAgICAvLyBsZXQgc2FsZXNfdGF4X29iaiA9IHsgdGF4X2dyb3VwOiBMQUJFTFNbNF0gfVxuICAgICAgICAvLyBwYXJzZSB0aGUgY3N2XG4gICAgICAgIGRhdGEuZm9yRWFjaCgoZCwgaSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZC5HZW9fTmFtZSA9PT0gc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtID09PSBcIlQwMFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIFRPVEFMID0gZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gIT0gXCJUMDBcIikgeyAgLy8gZG9uJ3Qgd2FudCB0byBjYXRjaCBUb3RhbCBvciBQcm9wZXJ0eSBUYXhlc1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGF4X29iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50X29mX3RvdGFsOiAoZmluZEFtb3VudChkLkFNT1VOVCkgLyBUT1RBTCkgKiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGQuaXRlbS5zbGljZSgwLDIpKSB7IC8vIGZpbGwgdXAgc3ViIGFycmF5c1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQwXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDlcIikgeyBzYWxlc190YXhlcy5wdXNoKHRheF9vYmopIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtID09PSBcIlQwMVwiKSB7IHByb3BlcnR5X3RheGVzLnB1c2godGF4X29iaikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNhbGVzX3RheF9vYmpbZC5UYXhfVHlwZV0gPSBmaW5kQW1vdW50KGQuQU1PVU5UKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQxXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQyXCI6IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQ0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jb21lX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUOVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0YXhfdHlwZS5pbmNsdWRlcyhkLml0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gIT0gJ1QwMCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRZUEVTLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnQ6ICgoZmluZEFtb3VudChkLkFNT1VOVCkpIC8gVE9UQUwpICogMTAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkLmtleSA9IGQuVGF4X1R5cGU7XG4gICAgICAgICAgICAgICAgICAgIGQuYW1vdW50ID0gZmluZEFtb3VudChkLkFNT1VOVCk7XG4gICAgICAgICAgICAgICAgICAgIGQucGVyY2VudCA9ICgoZmluZEFtb3VudChkLkFNT1VOVCkpIC8gVE9UQUwpICogMTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcl9hcnJheSA9IFtdICAvLyBzZXR0aW5nIHVwIGNvbnRhaW5lciBhcnJheSBmb3IgcGFzc2luZyBpbnRvIGNsaWNrIGhhbmRsZXJcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2goc2FsZXNfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKGxpY2Vuc2VfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKGluY29tZV90YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2gob3RoZXJfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHByb3BlcnR5X3RheGVzKVxuXG4gICAgICAgIHVwZGF0ZVN1YkRhdGEoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKVxuICAgICAgICAvLyBzZXQgaDEgYWZ0ZXIgdG90YWwgaGFzIGJlZW4gZGVmaW5lZFxuICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgXCIpXG4gICAgICAgIHNwYW4udGV4dChcIiRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgaDIudGV4dChcIlwiKVxuICAgICAgICAvLyBhdHRlbXB0IGJ1ZGdldENpcmNsZSBjYWxsXG4gICAgICAgIC8vIGJ1ZGdldENpcmNsZShUT1RBTClcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwZXJjZW50YWdlcyBpbiB0aGUgY2VudGVyIGJveFxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgYXJjKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBkID0+IGNvbG9ycyhkLmRhdGEua2V5KSlcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgICAgICAuZHVyYXRpb24oNzUwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbignZCcsIHBpZVR3ZWVuKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHBhdGgub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIC8vIHdoeSBkb2Vzbid0IHRoaXMgd29yaz9cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gICAgICAgICAgICAgLmR1cmF0aW9uKCc1MCcpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIGRldGVybWluZSBob3cgdG8gZmxpcCB0aGUgcGllc1xuICAgICAgICBpZiAocGllX251bSA9PT0gMikgey8vIGZsaXAgdGhlIHNlY29uZCBwaWVcbiAgICAgICAgICAgIGcuYXR0cihcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVgoLTEpIHRyYW5zbGF0ZSgzMDBweCwgMHB4KSBzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgY29uc3Qgc3ViX2RhdGFfc3ZnID0gZDMuc2VsZWN0KCcjc3ViLWRhdGEtZy0nICsgcGllX251bSkuc2VsZWN0QWxsKCcuc3ViLWRhdGEtJyArIHBpZV9udW0pXG4gICAgICAgIGcub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coZClcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oJzUwJylcbiAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsICcuODUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgIC8vIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE4IHdhcyAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICAvLyBoMi50ZXh0KFwiXCIpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2snLCBoYW5kbGVDbGljayhjb250YWluZXJfYXJyYXksIHBpZV9udW0pKVxuICAgICAgICAvLyAub24oJ2NsaWNrJywgdXBkYXRlU3ViRGF0YShjb250YWluZXJfYXJyYXksIHN1Yl9kYXRhX3N2ZywgcGllX251bSkpXG4gICAgICAgIGNvbnNvbGUubG9nKHBpZV9udW0pXG4gICAgICAgIGNvbnN0IHNwYW4xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFscy1zcGFuLTEnKVxuICAgICAgICBjb25zdCBzcGFuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbHMtc3Bhbi0yJylcblxuICAgICAgICBpZiAoc3BhbjEuaW5uZXJUZXh0XG4gICAgICAgICAgICAmJiBzcGFuMi5pbm5lclRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsMSA9IHBhcnNlSW50KHNwYW4xLmlubmVyVGV4dC5zbGljZSgxKS5zcGxpdCgnLCcpLmpvaW4oJycpKVxuICAgICAgICAgICAgY29uc3QgdG90YWwyID0gcGFyc2VJbnQoc3BhbjIuaW5uZXJUZXh0LnNsaWNlKDEpLnNwbGl0KCcsJykuam9pbignJykpXG4gICAgICAgICAgICBidWRnZXRDaXJjbGUodG90YWwxLCB0b3RhbDIsIHVwZGF0ZSlcbiAgICAgICAgfSAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7IGlmIChlcnJvcikgdGhyb3cgZXJyb3IgfSlcbiAgICBcbiAgICBjb25zdCBwaWVUd2VlbiA9IGIgPT4ge1xuICAgICAgICBiLmlubmVyUmFkaXVzID0gMDtcbiAgICAgICAgY29uc3QgaSA9IGQzLmludGVycG9sYXRlKHsgc3RhcnRBbmdsZTogMCwgZW5kQW5nbGU6IDAgfSwgYilcbiAgICAgICAgcmV0dXJuICh0KSA9PiB7IHJldHVybiBhcmMoaSh0KSkgfVxuICAgIH0gICAgXG59XG5cbmNvbnN0IGhhbmRsZUNsaWNrID0gKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkgPT4ge1xuICAgIHJldHVybiBlbGUgPT4ge1xuICAgICAgICBcbiAgICAgICAgdXBkYXRlU3ViRGF0YShjb250YWluZXJfYXJyYXksIHBpZV9udW0sIGVsZSlcbiAgICAgICAgdG9vbHRpcENyZWF0b3IocGllX251bSwgZWxlLmRhdGEuVGF4X1R5cGUsIGVsZS5kYXRhLnBlcmNlbnQpXG4gICAgfVxufVxuICAgICAgICAiLCJpbXBvcnQgeyBDSVJDTEVfQ09MT1JTLCBMQUJFTFN9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IHBpZUxlZ2VuZCA9ICgpID0+IHtcbiAgICBjb25zdCBtYXN0ZXJfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuICAgIG1hc3Rlcl9saXN0LmNsYXNzTGlzdC5hZGQoJ21hc3Rlci1saXN0JylcblxuICAgIGNvbnN0IGxlZnRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCB0ZXh0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgcmlnaHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgIGxlZnRfbGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0LWxpc3QnKSAgXG4gICAgdGV4dF9saXN0LmNsYXNzTGlzdC5hZGQoJ3RleHQtbGlzdCcpICBcbiAgICByaWdodF9saXN0LmNsYXNzTGlzdC5hZGQoJ3JpZ2h0LWxpc3QnKSBcblxuICAgIGZvciAobGV0IGkgPSBMQUJFTFMubGVuZ3RoIC0gMSA7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBsZWZ0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgdGV4dF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IHJpZ2h0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICBsZWZ0X2JveC5jbGFzc0xpc3QuYWRkKCdib3gnLCAnbGVmdC1ib3gnKVxuICAgICAgICBsZWZ0X2JveC5pZCA9ICgnbGVmdC1ib3gtJyArIGkpXG4gICAgICAgIGxlZnRfYm94LnN0eWxlLmNvbG9yID0gQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIHJpZ2h0X2JveC5jbGFzc0xpc3QuYWRkKCdib3gnLCAncmlnaHQtYm94JylcbiAgICAgICAgcmlnaHRfYm94LmlkID0gKCdyaWdodC1ib3gtJyArIGkpXG4gICAgICAgIHJpZ2h0X2JveC5zdHlsZS5jb2xvciA9IENJUkNMRV9DT0xPUlNbaV1cblxuICAgICAgICB0ZXh0X2JveC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWJveCcpXG4gICAgICAgIHRleHRfYm94LmlubmVySFRNTCA9IExBQkVMU1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gQ0lSQ0xFX0NPTE9SU1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkIFwiICsgQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIGxlZnRfbGlzdC5hcHBlbmRDaGlsZChsZWZ0X2JveClcbiAgICAgICAgdGV4dF9saXN0LmFwcGVuZENoaWxkKHRleHRfYm94KVxuICAgICAgICByaWdodF9saXN0LmFwcGVuZENoaWxkKHJpZ2h0X2JveClcbiAgICB9XG5cbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZChsZWZ0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9saXN0KVxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKHJpZ2h0X2xpc3QpXG4gICAgcmV0dXJuIG1hc3Rlcl9saXN0XG59XG5cbmNvbnN0IHN1Ymxpc3RzID0gKGxhYmVsLCBjb2xvcikgPT4ge1xuICAgIGNvbnN0IGxpc3RzID0gW11cblxuXG4gICAgbGVzdGxpc3QuY2xhc3NMaXN0LmFkZCgnbGVmdGxpc3QnKVxuICAgIHRleHRsaXN0LmNsYXNzTGlzdC5hZGQoJ3RleHRsaXN0JylcbiAgICByaWdodGxpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHRsaXN0JylcblxuICAgIGNvbnN0IGxlZnRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgY29uc3QgcmlnaHRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cblxuXG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cblxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGVmdEJveClcbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKGxpKVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQocmlnaHRCb3gpXG4gICAgcmV0dXJuIHN1Ymxpc3Rcbn0iLCJpbXBvcnQgeyBQaWVDaGFydEdlbmVyYXRvciB9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHRvb2x0aXBDcmVhdG9yIH0gZnJvbSAnLi9zdWJkYXRhX2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IFRPUF9MRVZFTCA9IFsnVDAwJywgJ1QwMScsICdUQTEnLCAnVEEzJywgJ1RBNCcsICdUQTUnXVxuY29uc3QgU1RBVEVfTkFNRVMgPSBbJ0FsYWJhbWEnLCAnQWxhc2thJywgJ0FyaXpvbmEnLCAnQXJrYW5zYXMnLCAnQ2FsaWZvcm5pYScsICdDb2xvcmFkbycsICdDb25uZWN0aWN1dCcsICdEZWxhd2FyZScsICdGbG9yaWRhJywgJ0dlb3JnaWEnLCAnSGF3YWlpJywgJ0lkYWhvJywgJ0lsbGlub2lzJywgJ0luZGlhbmEnLCAnSW93YScsICdLYW5zYXMnLCAnS2VudHVja3knLCAnTG91aXNpYW5hJywgJ01haW5lJywgJ01hcnlsYW5kJywgJ01hc3NhY2h1c2V0dHMnLCAnTWljaGlnYW4nLCAnTWlubmVzb3RhJywgJ01pc3Npc3NpcHBpJywgJ01pc3NvdXJpJywgJ01vbnRhbmEnLCAnTmVicmFza2EnLCAnTmV2YWRhJywgJ05ldyBIYW1wc2hpcmUnLCAnTmV3IEplcnNleScsICdOZXcgTWV4aWNvJywgJ05ldyBZb3JrJywgJ05vcnRoIENhcm9saW5hJywgJ05vcnRoIERha290YScsICdPaGlvJywgJ09rbGFob21hJywgJ09yZWdvbicsICdQZW5uc3lsdmFuaWEnLCAnUmhvZGUgSXNsYW5kJywgJ1NvdXRoIENhcm9saW5hJywgJ1NvdXRoIERha290YScsICdUZW5uZXNzZWUnLCAnVGV4YXMnLCAnVXRhaCcsICdWZXJtb250JywgJ1ZpcmdpbmlhJywgJ1dhc2hpbmd0b24nLCAnV2VzdCBWaXJnaW5pYScsICdXaXNjb25zaW4nLCAnV3lvbWluZyddXG5cbmV4cG9ydCBjb25zdCBzdGF0ZV9zZWxlY3RvciA9IChwaWVfbnVtKSA9PiB7XG4gXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJzZWxlY3Qtd3JhcHBlci1cIiArIHBpZV9udW0pXG4gICAgd3JhcHBlci5pZCA9IFwic2VsZWN0LXdyYXBwZXItXCIgKyBwaWVfbnVtXG5cbiAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAgIHNlbGVjdC5pbm5lckhUTUwgPSBwaWVfbnVtID09PSAxID8gJ0FsYWJhbWEnIDogJ1d5b21pbmcnXG4gICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcInNlbGVjdC1cIiArIHBpZV9udW0pXG4gICAgc2VsZWN0LmlkID0gXCJzZWxlY3QtXCIgKyBwaWVfbnVtXG5cbiAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuICAgIH0pXG4gICAgXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0gIC8vIGFkZCBhbiBldmVudCBsaXN0ZW5lciBzbyB0aGF0IGlmIEkgY2xpY2sgYW55d2hlcmUgZWxzZSB0aGUgbGlzdCBkaXNhcHBlYXJzXG4gICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgfSlcbiAgICBcbiAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gc3RhdGUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGUgPT4ge1xuICAgICAgICAgICAgLy8gY29uc3Qgc3RhdGUgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuICAgICAgICAgICAgc2VsZWN0LmlubmVyVGV4dCA9IHN0YXRlXG4gICAgICAgICAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4gICAgICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgVE9QX0xFVkVMLCBwaWVfbnVtKVxuICAgICAgICAgICAgLy8gdG9vbHRpcENyZWF0b3IocGllX251bSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBzdGF0ZV9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnc3RhdGUtbGlzdC0nICsgcGllX251bSlcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgc3RhdGVfbGlzdC5pZCA9ICdzdGF0ZS1saXN0LScgKyBwaWVfbnVtXG4gICAgXG4gICAgU1RBVEVfTkFNRVMuZm9yRWFjaChzdGF0ZSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlX2xpc3RfaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uaW5uZXJIVE1MID0gc3RhdGVcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHN0YXRlKVxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuICAgICAgICBzdGF0ZV9saXN0LmFwcGVuZENoaWxkKHN0YXRlX2xpc3RfaXRlbSlcbiAgICB9KVxuICAgIFxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KVxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc3RhdGVfbGlzdClcbiAgICBcbiAgICByZXR1cm4gd3JhcHBlclxufVxuXG4vLyBjb25zdCBwaGFzZU91dCA9IChub2RlKSA9PiB7XG5cbi8vICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbi8vIH0iLCJleHBvcnQgY29uc3Qgc3ViRGF0YUxlZ2VuZCA9IChjb2xvcnMsIGxhYmVscywgaGVpZ2h0cywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IG1hc3Rlcl9zdWJfZGF0YV9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgbWFzdGVyX3N1Yl9kYXRhX2xpc3QuY2xhc3NMaXN0LmFkZCgnbWFzdGVyLXN1Yi1kYXRhLWxpc3QtJyArIHBpZV9udW0pXG4gICAgbWFzdGVyX3N1Yl9kYXRhX2xpc3QuaWQgPSAnbWFzdGVyLXN1Yi1kYXRhLWxpc3QtJyArIHBpZV9udW1cblxuICAgIGNvbnN0IHBlcmNlbnRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCBsYWJlbF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IGNvbG9yX2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgIGZvciAobGV0IGkgPSBsYWJlbHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblxuICAgICAgICAvLyBjb25zdCByZWxhdGl2ZV9wZXJjZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAvLyBjb25zdCBvdmVyYWxsX3BlcmNlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCBjb2xvcl9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgdGV4dF9ib3guY2xhc3NMaXN0LmFkZCgnc3ViLWRhdGEtbGFiZWwtJyArIHBpZV9udW0pXG4gICAgICAgIHRleHRfYm94LmlubmVySFRNTCA9IGxhYmVsc1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JzW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgXCIgKyBDSVJDTEVfQ09MT1JTW2ldXG4gICAgfVxufSIsImltcG9ydCB7IHN1YkFycmF5TG9jYXRvciwgcGVyY2VudGlmeSwgTGlnaHRlbkRhcmtlbkNvbG9yLCByZW1vdmUsIHJlbW92ZUNsYXNzIH0gZnJvbSAnLi9oZWxwZXJfZnVuY3Rpb25zJ1xuaW1wb3J0IHsgQ0lSQ0xFX0NPTE9SUywgTEFCRUxTIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJztcbmltcG9ydCB7IHN1YkRhdGFMZWdlbmQgfSBmcm9tICcuL3N1Yl9kYXRhX2xlZ2VuZCdcblxuY29uc3Qgd2lkdGggPSA5MCAgLy8gc2V0dGluZyB0aGUgZGltZW5zaW9ucyB0byBjb3JyZXNwb25kIHRvIHRoZSBwaWUgY2hhcnRzJ1xuY29uc3QgaGVpZ2h0ID0gNzUwXG4vLyBjb25zdCBoZWlnaHQgPSA5MCAgLy8gc2V0dGluZyB0aGUgZGltZW5zaW9ucyB0byBjb3JyZXNwb25kIHRvIHRoZSBwaWUgY2hhcnRzJ1xuLy8gY29uc3Qgd2lkdGggPSA1MDBcblxuY29uc3QgdG9vbHRpcFdpZHRoID0gMTIwIC8vIHdpbGwgYWx0ZXIgdGhlc2UgYXMgbmVlZGVkXG5jb25zdCB0b29sdGlwSGVpZ2h0ID0gNDBcblxuLy8gZXhwb3J0IGNvbnN0IHN1YkRhdGEgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtLCBjb2xvcl9zdHJpbmcgPSBcIiMzRjZEMkFcIikgPT4ge1xuLy8gICAgIC8vIGEgbG90IG9mIHRoaXMgY29kZSB3YXMgbGVhcm5lZCBmcm9tIE1pY2hhZWwgU3RhbmFsYW5kJ3MgXCJTdGFja2VkIGJhciBjaGFydCB3aXRoIHRvb2x0aXBzXCIgdHV0b3JpYWwgYXQgaHR0cDovL2JsLm9ja3Mub3JnL21zdGFuYWxhbmQvNjEwMDcxM1xuXG4vLyAgICAgcmVtb3ZlKCdzdWItZGF0YS1zdmctJyArIHBpZV9udW0pXG4vLyAgICAgcmVtb3ZlKCdzdWItZGF0YS1sZWdlbmQtc3ZnLScgKyBwaWVfbnVtKVxuXG4gICAgXG4vLyAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiI3N1Yi1kYXRhLVwiICsgcGllX251bSlcbi8vICAgICAgICAgLmFwcGVuZChcInN2Z1wiKSBcbi8vICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCkuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpLmF0dHIoJ2lkJywgJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcbi8vICAgICAgICAgLmFwcGVuZChcImdcIilcbi8vICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLScgKyBwaWVfbnVtKS5hdHRyKCdpZCcsICdzdWItZGF0YS1nLScgKyBwaWVfbnVtKVxuLy8gICAgIGNvbnNvbGUubG9nKHN2Zylcbi8vICAgICB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgc3ZnLCBwaWVfbnVtKShudWxsKVxuLy8gfVxuXG5cbmV4cG9ydCBjb25zdCB1cGRhdGVTdWJEYXRhID0gKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSwgZWxlKSA9PiB7XG4gICAgXG4gICAgLy8gcmV0dXJuIChlbGUpID0+IHtcblxuICAgICAgICByZW1vdmUoJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcbiAgICAgICAgcmVtb3ZlKCdzdWItZGF0YS1sZWdlbmQtc3ZnLScgKyBwaWVfbnVtKVxuXG5cbiAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiI3N1Yi1kYXRhLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKVxuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtZy0nICsgcGllX251bSlcbiAgICAgICAgICAgIC8vIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIilcblxuXG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YXhfdHlwZSA9IGVsZSA/IGVsZS5kYXRhLmtleSA6IFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCJcbiAgICAgICAgY29uc3QgY29sb3Jfc3RyaW5nID0gY29sb3JDaG9vc2VyKHRheF90eXBlKVxuICAgICAgICBjb25zdCBzdWJfYXJyYXkgPSBzdWJBcnJheUxvY2F0b3IodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSlcbiAgICAgICAgbGV0IGNvbG9yX2NvdW50ID0gMFxuICAgICAgICBsZXQgaWRfY291bnQgPSAwXG4gICAgXG4gICAgICAgIGxldCB0YXhfc3RhY2sgPSB7fVxuICAgICAgICAvLyBzZXR0aW5nIHVwIGtleXNcbiAgICAgICAgbGV0IGtleXMgPSBbXVxuICAgICAgICAvLyBrZXlzLnB1c2godGF4X3R5cGUpXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKChzdWJfdGF4LCBpKSA9PiB7XG4gICAgICAgICAgICBrZXlzLnB1c2goc3ViX3RheC5rZXkpXG4gICAgICAgICAgICB0YXhfc3RhY2tbc3ViX3RheC5rZXldID0gc3ViX3RheC5wZXJjZW50X29mX3RvdGFsXG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBjb25zdCBzdGFjayA9IGQzLnN0YWNrKClcbiAgICAgICAgICAgIC5rZXlzKGtleXMpXG4gICAgICAgICAgICAub3JkZXIoZDMuc3RhY2tPcmRlck5vbmUpXG4gICAgICAgICAgICAub2Zmc2V0KGQzLnN0YWNrT2Zmc2V0Tm9uZSlcbiAgICAgICAgbGV0IHRheF9zdGFja19hcnJheSA9IFtdXG4gICAgICAgIHRheF9zdGFja19hcnJheS5wdXNoKHRheF9zdGFjaylcbiAgICAgICAgY29uc3QgbGF5ZXJzID0gc3RhY2sodGF4X3N0YWNrX2FycmF5KVxuICAgIFxuICAgICAgICAvLyBjb25zdCB4ID0gZDMuc2NhbGVPcmRpbmFsKClcbiAgICAgICAgLy8gICAgIC5kb21haW4obGF5ZXJzWzBdLm1hcChkID0+IGQueCkpXG4gICAgICAgIC8vICAgICAvLyAucmFuZ2UoWzEwLCB3aWR0aF0sIDApICAvLyBtYXkgYmUgYSBxdWlja2VyIHdheSB0byBkbyB0aGlzIGFzIHRoZXJlIGlzIG9ubHkgb25lIGJhclxuICAgICAgICAvLyAgICAgLnJhbmdlKFt3aWR0aF0pXG4gICAgICAgIGNvbnN0IHhTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIDFdKVxuICAgICAgICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXG4gICAgXG4gICAgICAgIC8vIGNvbnN0IGNvbG9ycyA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLy8gICAgIC5kb21haW4oWzEsIDEwXSlcbiAgICAgICAgLy8gICAgIC5yYW5nZShbXCJyZWRcIiwgXCJibHVlXCJdKVxuXG4gICAgICAgIGNvbnN0IG5ld19jb2xvcnMgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbMCwga2V5cy5sZW5ndGhdKVxuICAgICAgICAgICAgLnJhbmdlKFtcIndoaXRlXCIsIGNvbG9yX3N0cmluZ10pXG4gICAgICAgIFxuICAgICAgICAvLyBjb25zdCBjb2xvcnMgPSBbY29sb3Jfc3RyaW5nXVxuICAgICAgICAvLyBjb25zdCBkZWNyZW1lbnQgPSAxMDAgLyBrZXlzLmxlbmd0aFxuICAgICAgICAvLyBsZXQgbmV4dF9jb2xvciA9IExpZ2h0ZW5EYXJrZW5Db2xvcihjb2xvcl9zdHJpbmcsIGRlY3JlbWVudClcbiAgICAgICAgLy8gd2hpbGUgKGNvbG9ycy5sZW5ndGggPCBrZXlzLmxlbmd0aCkge1xuICAgICAgICAvLyAgICAgY29sb3JzLnB1c2gobmV4dF9jb2xvcilcbiAgICAgICAgLy8gICAgIG5leHRfY29sb3IgPSBMaWdodGVuRGFya2VuQ29sb3IobmV4dF9jb2xvciwgZGVjcmVtZW50KVxuICAgICAgICAvLyB9ICAgIFxuICAgICAgICBjb25zdCB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCBkMy5zdW0oT2JqZWN0LnZhbHVlcyh0YXhfc3RhY2spKV0pICAvLyB0aGUgaW5jcmVtZW50IHVwIHRvIHRoZSB0b3RhbFxuICAgICAgICAgICAgLy8gLnJhbmdlKFtoZWlnaHQsIDBdKVxuICAgICAgICAgICAgLnJhbmdlKFswLCBoZWlnaHRdKVxuICAgIFxuICAgICAgICBjb25zdCBnID0gc3ZnLnNlbGVjdEFsbChcIi5zdWItdGF4ZXMtXCIgKyBwaWVfbnVtKSAgLy8gbm8gZyBhdCB0aGlzIHBvaW50LCBidXQgdGhleSB3aWxsIGhhdmUgdGhpcyBjbGFzc1xuICAgICAgICAgICAgLmRhdGEobGF5ZXJzKS5lbnRlcigpICAvLyBub3cgdGhlcmUgd2lsbCBiZSBhIGcgZm9yIGV2ZXJ5IGJhciB3aXRoaW4gdGhlIGdyYXBoLlxuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdWItdGF4ZXMtXCIgKyBwaWVfbnVtKVxuICAgICAgICAgICAgXG4gICAgICAgIC8vIC5hdHRyKCdmaWxsJywgZCA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgLy8gICAgIHJldHVybiBjb2xvcnMoZCl9KVxuICAgIFxuICAgICAgICBjb25zdCByZWN0ID0gZy5zZWxlY3RBbGwoXCJyZWN0XCIpICAvLyBtYWtpbmcgZWFjaCBvYmogb2YgdGhlIGNvcnJlc3BvbmQgdG8gYSByZWN0IHdpdGhpbiB0aGUgZ1xuICAgICAgICAgICAgLmRhdGEobGF5ZXIgPT4gbGF5ZXIpOyAvLyBwdWxsaW5nIG91dCBlYWNoIGluZGl2aWR1YWwgb2JqXG4gICAgICAgICAgICByZWN0LmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJlY3QuZW50ZXIoKS5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBkID0+IHhTY2FsZSgwKSlcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4U2NhbGUoMSkpICAvLyBwcm9iYWJseSBjYW4gaGFyZCBjb2RlLCBzaW5jZSBvbmx5IG9uZSBiYXJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCAoZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYHN0YWNrLSR7cGllX251bX0tJHtpZF9jb3VudCsrfWBcbiAgICAgICAgICAgICAgICB9KS5tZXJnZShyZWN0KVxuXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBkID0+IHhTY2FsZSgwKSkgIC8vIHBhc3NpbmcgZWFjaCBvYmoncyB4IHZhbHVlIHRvIHRoZSBkMyB4IGZ1bmN0aW9uIGRlZmluZWQgYWJvdmVcbiAgICAgICAgICAgIC5hdHRyKCd5JywgbGF5ZXIgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHQgLSB5U2NhbGUobGF5ZXJbMV0pXG4gICAgICAgICAgICB9KSAgLy8geTAgaXMgdGhlIGhlaWdodCB3aGVyZSBlYWNoIHNlZ21lbnQgaW4gdGhlIHN0YWNrIHN0YXJ0c1xuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgeFNjYWxlKDEpKSAgLy8gcHJvYmFibHkgY2FuIGhhcmQgY29kZSwgc2luY2Ugb25seSBvbmUgYmFyXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgYmFyID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4geVNjYWxlKGJhclsxXSAtIGJhclswXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsIChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld19jb2xvcnMoKytjb2xvcl9jb3VudClcbiAgICAgICAgICAgIH0pIFxuXG4gICAgICAgIHRvb2x0aXBDcmVhdG9yKHBpZV9udW0sIHRheF90eXBlKVxuXG4gICAgbGVnZW5kQ3JlYXRvcihwaWVfbnVtLCBrZXlzLCBuZXdfY29sb3JzKVxuICAgIC8vIHN1YkRhdGFMZWdlbmQobmV3X2NvbG9ycywgKVxuXG4gICAgLy8gfVxuXG59XG5cbmNvbnN0IGNvbG9yQ2hvb3NlciA9ICh0YXhfdHlwZSkgPT4ge1xuICAgIHN3aXRjaCAodGF4X3R5cGUpIHtcbiAgICAgICAgY2FzZSBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbNF1cbiAgICAgICAgY2FzZSAnUHJvcGVydHkgVGF4ZXMnOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbM11cbiAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzJdXG4gICAgICAgIGNhc2UgJ0luY29tZSBUYXhlcyc6XG4gICAgICAgICAgICByZXR1cm4gQ0lSQ0xFX0NPTE9SU1sxXVxuICAgICAgICBjYXNlICdPdGhlciBUYXhlcyc6XG4gICAgICAgICAgICByZXR1cm4gQ0lSQ0xFX0NPTE9SU1swXVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRvb2x0aXBDcmVhdG9yID0gKHBpZV9udW0sIHRheF90eXBlLCBwZXJjZW50KSA9PiB7XG4gICAgY29uc3Qgc3ViX2RhdGFfZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBkYXRhLWRldGFpbHMtdHlwZS0ke3BpZV9udW19YClcbiAgICBjb25zdCByZWxhdGl2ZV9wZXJjZW50X2RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcmVsYXRpdmUtcGVyY2VudC0ke3BpZV9udW19YClcbiAgICBjb25zdCBvdmVyYWxsX3BlcmNlbnRfZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBvdmVyYWxsLXBlcmNlbnQtJHtwaWVfbnVtfWApXG4gICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWItZGF0YS1kZXRhaWxzLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICAgIGNvbnN0IHZhbmlsbGFfc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcbiAgICBsZXQgaW5kZXg7XG5cbiAgICBpZiAoIXRheF90eXBlIHx8IHRheF90eXBlID09PSBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiKSB7XG4gICAgICAgIHRheF90eXBlID0gJ1NhbGVzIFRheGVzJ1xuICAgICAgICBpbmRleCA9IExBQkVMUy5pbmRleE9mKHRheF90eXBlKVxuICAgICAgICBwZXJjZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2lkZSArIGAtYm94LWAgKyBpbmRleCkuaW5uZXJIVE1MXG4gICAgICAgIHBlcmNlbnQgPSBwYXJzZUZsb2F0KHBlcmNlbnQuc2xpY2UoMCwgLTEpKVxuICAgIH1cblxuICAgIGluZGV4ID0gTEFCRUxTLmluZGV4T2YodGF4X3R5cGUpXG4gICAgc3ViX2RhdGFfZGV0YWlscy5pbm5lckhUTUwgPSBgJHt0YXhfdHlwZX1gXG4gICAgcmVsYXRpdmVfcGVyY2VudF9kZXRhaWxzLmlubmVySFRNTCA9IGBQZXJjZW50IG9mIHRvdGFsIGJ1ZGdldDogJHtwZXJjZW50aWZ5KHBlcmNlbnQpfWBcbiAgICBvdmVyYWxsX3BlcmNlbnRfZGV0YWlscy5pbm5lckhUTUwgPSAnU2Nyb2xsIG92ZXIgc2lkZSBiYXIgdG8gc2VlIHN1YiB0YXggZGF0YSBmb3IgdGhpcyBjYXRlZ29yeSdcbiAgICBsaXN0LnN0eWxlLmJhY2tncm91bmQgPSBDSVJDTEVfQ09MT1JTW2luZGV4XVxuICAgIC8vIHZhbmlsbGFfc3ZnLmFwcGVuZENoaWxkKHZhbmlsbGFfdG9vbHRpcClcbiAgICBcbiAgICB2YW5pbGxhX3N2Zy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAgICAgICBpbmRleCA9IExBQkVMUy5pbmRleE9mKHRheF90eXBlKVxuICAgICAgICBjb25zdCBzcGxpdF9pZCAgPSBlLnRhcmdldC5pZC5zcGxpdCgnLScpXG4gICAgICAgIGNvbnN0IGxlZ2VuZF90ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGxlZ2VuZC10ZXh0LSR7c3BsaXRfaWRbMV19LSR7c3BsaXRfaWRbMl19YClcbiAgICAgICAgLy8gY29uc3QgbGVnZW5kX2l0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGVnZW5kLWl0ZW0tJHtzcGxpdF9pZFsxXX0tJHtzcGxpdF9pZFsyXX1gKVxuICAgICAgICBjb25zdCBib3hfZGF0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBgLWJveC1gICsgaW5kZXgpLmlubmVySFRNTFxuICAgICAgICBcbiAgICAgICAgbGV0IHJlbGF0aXZlX3BlcmNlbnQgPSAoZS50YXJnZXQuaGVpZ2h0LmJhc2VWYWwudmFsdWUgLyBoZWlnaHQpICogMTAwXG4gICAgICAgIHJlbGF0aXZlX3BlcmNlbnQgPSBNYXRoLnJvdW5kKDEwMCAqIHJlbGF0aXZlX3BlcmNlbnQpIC8gMTAwXG4gICAgICAgIFxuICAgICAgICBsZXQgb3ZlcmFsbF9wZXJjZW50ID0gcGFyc2VGbG9hdChib3hfZGF0YS5zbGljZSgwLCAtMSkpXG4gICAgICAgIG92ZXJhbGxfcGVyY2VudCA9IE1hdGgucm91bmQoMTAwICogb3ZlcmFsbF9wZXJjZW50ICogcmVsYXRpdmVfcGVyY2VudCAvIDEwMCkgLyAxMDBcbiAgICAgICAgLy8gbGV0IG92ZXJhbGxfcGVyY2VudCA9IFxuICAgICAgICAvLyBsZWdlbmRfaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICBvdmVyYWxsX3BlcmNlbnRfZGV0YWlscy5pbm5lckhUTUwgPSBgUGVyY2VudCBvZiB0b3RhbCBidWRnZXQ6IGAgKyBvdmVyYWxsX3BlcmNlbnRcbiAgICAgICAgcmVsYXRpdmVfcGVyY2VudF9kZXRhaWxzLmlubmVySFRNTCA9IGBQZXJjZW50IG9mIGNhdGVnb3J5OiAke3JlbGF0aXZlX3BlcmNlbnR9YFxuICAgICAgICBpZiAobGVnZW5kX3RleHQpIHsgc3ViX2RhdGFfZGV0YWlscy5pbm5lckhUTUwgPSBsZWdlbmRfdGV4dC5pbm5lckhUTUwgfVxuICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY29sb3I6ICcgKyBDSVJDTEVfQ09MT1JTW2luZGV4XSlcbiAgICAgICAgLy8gbGlzdF9jb2xvci5zdHlsZS5ib3JkZXIgPSBgNHB4IHNvbGlkICR7Q0lSQ0xFX0NPTE9SU1tpbmRleF19YFxuICAgICAgICAvLyB2YW5pbGxhX3Rvb2x0aXAuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICB9KVxuICAgIHZhbmlsbGFfc3ZnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZSA9PiB7XG5cbiAgICB9KVxuXG59XG5cbmNvbnN0IGxlZ2VuZENyZWF0b3IgPSAocGllX251bSwga2V5cywgbmV3X2NvbG9ycykgPT4ge1xuXG4gICAgbGV0IGNvbG9yX2NvdW50ID0gMFxuICAgIGxldCBpZF9jb3VudCA9IDBcblxuICAgIGNvbnN0IGxlZ2VuZCA9IGQzLnNlbGVjdChcIiNzdWItZGF0YS1sZWdlbmQtXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnc3ViLWRhdGEtbGVnZW5kLXN2Zy0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtbGVnZW5kLXN2Zy0nICsgcGllX251bSlcbiAgICAgICAgLmFwcGVuZCgnZycpXG5cbiAgICBpZF9jb3VudCA9IDBcblxuICAgIGxlZ2VuZC5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgICAuZGF0YShrZXlzLnJldmVyc2UoKSlcbiAgICAgICAgLmVudGVyKClcbiAgICAgICAgLmluc2VydCgndGV4dCcpXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3gnLCAxOCkuYXR0cigneScsICcwJylcbiAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ3N0YXJ0JylcbiAgICAgICAgLmF0dHIoJ2FsaWdubWVudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2hpZGRlbicpXG4gICAgICAgIC5hdHRyKCdpZCcsIGQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBsZWdlbmQtdGV4dC0ke3BpZV9udW19LSR7aWRfY291bnQrK31gO1xuICAgICAgICB9KVxufVxuXG4iLCJpbXBvcnQgeyB0b29sdGlwQ3JlYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9zdWJkYXRhX2dlbmVyYXRvcidcbmltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3InXG5pbXBvcnQgeyBwaWVMZWdlbmQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2xlZ2VuZCdcbmltcG9ydCB7IHN0YXRlX3NlbGVjdG9yLCBUT1BfTEVWRUwgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3InXG5pbXBvcnQgeyBidWRnZXRDaXJjbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvYnVkZ2V0X2NpcmNsZSdcbmltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBcbiAgICAvLyBQQ0cgLT4gY3N2UGF0aCwgc2VjdG9yLCBhbW91dCwgbG9jYXRpb24sIG11bHRpcGxpZXIsIHNraXBcbiAgICBcbiAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpXG4gICAgLy8gY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHVsID0gcGllTGVnZW5kKClcbiAgICBjb25zdCBzZWxlY3RfMSA9IHN0YXRlX3NlbGVjdG9yKDEpXG4gICAgY29uc3Qgc2VsZWN0XzIgPSBzdGF0ZV9zZWxlY3RvcigyKVxuICAgIGNvbnN0IHNlbGVjdG9yX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3Rvci1jb250YWluZXJcIilbMF1cbiAgICBjb25zdCB5ZWFyU2VsZWN0b3IgPSB5ZWFyU2VsZWN0b3JcblxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMSlcbiAgICBzZWxlY3Rvcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0XzIpXG4gICAgcm9vdC5hcHBlbmRDaGlsZCh1bClcblxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKFwiQWxhYmFtYVwiLCBUT1BfTEVWRUwsIDEsIFwiLi9zcmMvYXNzZXRzL2RhdGEvRlkyMDE4LVNUQy1EZXRhaWxlZC1UYWJsZS5jc3ZcIiwgZmFsc2UpXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJXeW9taW5nXCIsIFRPUF9MRVZFTCwgMiwgXCIuL3NyYy9hc3NldHMvZGF0YS9GWTIwMTgtU1RDLURldGFpbGVkLVRhYmxlLmNzdlwiLCBmYWxzZSlcbiAgICAvLyB0b29sdGlwQ3JlYXRvcigxKVxuICAgIC8vIHRvb2x0aXBDcmVhdG9yKDIpXG4gICAgXG59KVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==