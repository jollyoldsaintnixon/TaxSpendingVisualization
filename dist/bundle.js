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
    debugger;
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
    debugger;

    // const svg1 = circle_container.append('svg')
    //     .attr('width', width).attr('height', height)
    //     .attr('class', 'circle-svg').attr('id', 'circle-svg-1');

    // const svg2 = circle_container.append('svg')
    //     .attr('width', width).attr('height', height)
    //     .attr('class', 'circle-svg').attr('id', 'circle-svg-2');

    var rscale = d3.scaleLinear().domain([0, d3.max(data)]).range([1, height / 2]);

    debugger;
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
        debugger;
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
exports.removeClass = exports.remove = exports.pSBC = exports.subArrayLocator = exports.findAmount = exports.assignBox = undefined;

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
var COLORS = exports.COLORS = ["#a6751e", "#9a0047", "#66a51e", "#7470b3", "#e82b8a"]; // A lot of this code was based heavily off of Karthik Thota's youtube tutorial "Introduction to d3.js = Pie Chart and Donut Chart"
// The legend code was from Crypters Infotech's youtube tutorial "Pie Chart using D3.js"

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

        (0, _subdata_generator.updateSubData)(container_array, pie_num)();
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
        }).on('click', (0, _subdata_generator.updateSubData)(container_array, pie_num, true));
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
            (0, _subdata_generator.tooltipCreator)(pie_num);
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
exports.tooltipCreator = exports.updateSubData = exports.subData = undefined;

var _helper_functions = __webpack_require__(/*! ./helper_functions */ "./src/components/helper_functions.js");

var _pie_chart_generator = __webpack_require__(/*! ./pie_chart_generator */ "./src/components/pie_chart_generator.js");

var _sub_data_legend = __webpack_require__(/*! ./sub_data_legend */ "./src/components/sub_data_legend.js");

var width = 90; // setting the dimensions to correspond to the pie charts'
var height = 750;
// const height = 90  // setting the dimensions to correspond to the pie charts'
// const width = 500

var tooltipWidth = 120; // will alter these as needed
var tooltipHeight = 40;

var subData = exports.subData = function subData(container_array, pie_num) {
    var color_string = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#3F6D2A";

    // a lot of this code was learned from Michael Stanaland's "Stacked bar chart with tooltips" tutorial at http://bl.ocks.org/mstanaland/6100713

    (0, _helper_functions.remove)('sub-data-svg-' + pie_num);
    (0, _helper_functions.remove)('sub-data-legend-svg-' + pie_num);

    var svg = d3.select("#sub-data-" + pie_num).append("svg").attr("width", width).attr("height", height).attr('id', 'sub-data-svg-' + pie_num).append("g").attr('class', 'sub-data-' + pie_num).attr('id', 'sub-data-g-' + pie_num);
    console.log(svg);
    updateSubData(container_array, svg, pie_num)(null);
};

var updateSubData = exports.updateSubData = function updateSubData(container_array, pie_num) {

    return function (ele) {

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

var tooltipCreator = exports.tooltipCreator = function tooltipCreator(pie_num, tax_type) {
    // const vanilla_tooltip = document.createElement('p')
    // vanilla_tooltip.classList.add('sub-data-tooltip', `tooltip`, `hidden`)

    // // const over_svg = d3.select('#sub-data-svg-' + pie_num)
    var vanilla_svg = document.getElementById('sub-data-svg-' + pie_num);
    var sub_data_details = document.getElementById('data-details-type-' + pie_num);
    var relative_percent_details = document.getElementById('relative-percent-' + pie_num);
    var overall_percent_details = document.getElementById('overall-percent-' + pie_num);

    if (!sub_data_details.innerHTML) {
        sub_data_details.innerHTML = 'Click on a section of the pie chart to see how that tax category breaks down';
        relative_percent_details.innerHTML = 'Then sccroll over the stacked bar to reveal details about the sub-taxes';
        sub_data_details.innerHTML = legend_text.innerHTML;
    }
    // vanilla_svg.appendChild(vanilla_tooltip)

    vanilla_svg.addEventListener('mouseover', function (e) {
        var split_id = e.target.id.split('-');
        var legend_text = document.getElementById('legend-text-' + split_id[1] + '-' + split_id[2]);
        debugger;
        if (!tax_type || tax_type === "Sales and Gross Receipts Taxes") {
            tax_type = 'Sales Taxes';
        }

        // const legend_item = document.getElementById(`legend-item-${split_id[1]}-${split_id[2]}`)
        var side = pie_num === 1 ? 'left' : 'right';
        var index = _pie_chart_generator.LABELS.indexOf(tax_type);
        var box_data = document.getElementById(side + '-box-' + index).innerHTML;

        var relative_percent = e.target.height.baseVal.value / height * 100;
        relative_percent = Math.round(100 * relative_percent) / 100;

        var overall_percent = parseFloat(box_data.slice(0, -1));
        overall_percent = Math.round(100 * overall_percent * relative_percent / 100) / 100;
        // let overall_percent = 
        // legend_item.classList.remove('hidden')
        overall_percent_details.innerHTML = 'Percent of total budget: ' + overall_percent;
        relative_percent_details.innerHTML = 'Percent of category: ' + relative_percent;
        sub_data_details.innerHTML = legend_text.innerHTML;
        // vanilla_tooltip.classList.remove('hidden')
    });
    // vanilla_svg.addEventListener('mousemove', e => {
    //     // const xPos = e.pageX - (tooltipWidth / 2) // this[0] corresponds to mouse's x pos, and pushing it left by half of the tooltip's width ensure it is centered
    //     // const yPos = e.pageY - 25 // puts the tooltip up a bit above the cursor
    //     // vanilla_tooltip.attr("transform", "translate(" + xPos + ',' + yPos + ')')
    //     // vanilla_tooltip.style.transform = `translate(${xPos}, ${yPos})`
    //     // vanilla_tooltip.select('text').text(((e.target.height.baseVal.value - e.target.y.baseVal) / height * 100) + ` percent of ` + tax_type) // shows the percent  
    //     // vanilla_tooltip.innerText = (((e.target.height.baseVal.value - e.target.y.baseVal.value) / height * 100) + ` percent of ` + tax_type) // shows the percent  
    // })
    vanilla_svg.addEventListener('mouseout', function (e) {
        // const split_id = e.target.id.split('-')
        // const legend_item = document.getElementById(`legend-item-${split_id[1]}-${split_id[2]}`)
        // const sub_data_details = document.getElementById(`data-details-type-${pie_num}`)
        // const relative_percent_details = document.getElementById(`relative-percent-${pie_num}`)
        // const overall_percent_details = document.getElementById(`overall-percent-${pie_num}`)

        // legend_item.classList.add('hidden')
        // sub_data_details.innerHTML = ''
        // relative_percent_details.innerHTML = ''
        // legend_text.classList.add('hidden')
        // vanilla_tooltip.classList.add("hidden")
    });
};

var legendCreator = function legendCreator(pie_num, keys, new_colors) {

    var color_count = 0;
    var id_count = 0;

    var legend = d3.select("#sub-data-legend-" + pie_num).append('svg').attr('class', 'sub-data-legend-svg-' + pie_num).attr('id', 'sub-data-legend-svg-' + pie_num).append('g');
    // .attr('transform', 'translate(' + (padding + 12) + ', 0)');

    // legend.selectAll('rect')
    //     .data(keys.reverse())
    //     .enter()
    //     .insert('rect').attr('id', (d, i) => {

    //         return `legend-item-${pie_num}-${id_count++}`
    //     })
    //     // .attr('x', 0).attr('y', function (d, i) {
    //     //     return i * 18;
    //     // })
    //     .attr('x', 0).attr('y', '0')
    //     .attr('width', 20).attr('height', 20)
    //     .attr('fill', function (d, i) {
    //         return new_colors(++color_count)
    //     })
    // .attr('class', 'hidden')

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnVkZ2V0X2NpcmNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9oZWxwZXJfZnVuY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGllX2xlZ2VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdGF0ZV9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdWJfZGF0YV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3ViZGF0YV9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYXBwLnNjc3MiXSwibmFtZXMiOlsiYnVkZ2V0Q2lyY2xlIiwidG90YWwxIiwidG90YWwyIiwidXBkYXRlIiwiTWF0aCIsInNxcnQiLCJjaXJjbGVfY29udGFpbmVyIiwiZDMiLCJzZWxlY3QiLCJoZWlnaHQiLCJ3aWR0aCIsInN2ZzEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYXBwZW5kIiwiYXR0ciIsInN2ZzIiLCJkYXRhIiwicnNjYWxlIiwic2NhbGVMaW5lYXIiLCJkb21haW4iLCJtYXgiLCJyYW5nZSIsImNpcmNsZTEiLCJzZWxlY3RBbGwiLCJjaXJjbGUyIiwiZW50ZXIiLCJkIiwiaSIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsIkxpZ2h0ZW5EYXJrZW5Db2xvciIsImFzc2lnbkJveCIsImFycmF5X29mX29ianMiLCJwaWVfbnVtIiwic2lkZSIsImZvckVhY2giLCJvYmoiLCJrZXkiLCJib3giLCJkZWNpbWFscyIsIlN0cmluZyIsInBlcmNlbnQiLCJzcGxpdCIsImludGVnZXJzIiwic2xpY2VkIiwic2xpY2UiLCJpbm5lckhUTUwiLCJmaW5kQW1vdW50IiwiYW1vdW50Iiwiam9pbiIsInN1YkFycmF5TG9jYXRvciIsInRheF90eXBlIiwiY29udGFpbmVyX2FycmF5IiwiY29sIiwiYW10IiwidXNlUG91bmQiLCJudW0iLCJwYXJzZUludCIsInIiLCJiIiwiZyIsInRvU3RyaW5nIiwicFNCQyIsInAiLCJjMCIsImMxIiwibCIsIlAiLCJmIiwidCIsImgiLCJtIiwicm91bmQiLCJhIiwicFNCQ3IiLCJuIiwibGVuZ3RoIiwieCIsInBhcnNlRmxvYXQiLCJ1bmRlZmluZWQiLCJyZW1vdmUiLCJpZCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInJlbW92ZUNsYXNzIiwicmVtb3ZlX2xpc3QiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwiUGllQ2hhcnRHZW5lcmF0b3IiLCJDT0xPUlMiLCJDSVJDTEVfQ09MT1JTIiwiTEFCRUxTIiwic3RhdGUiLCJjc3YiLCJoMSIsInNwYW4iLCJoMiIsIlRPVEFMIiwiVFlQRVMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJyYWRpdXMiLCJjb2xvcnMiLCJzY2FsZU9yZGluYWwiLCJhcmMiLCJvdXRlclJhZGl1cyIsImlubmVyUmFkaXVzIiwicGllIiwidmFsdWUiLCJzdmciLCJ0aGVuIiwic2FsZXNfdGF4ZXMiLCJsaWNlbnNlX3RheGVzIiwiaW5jb21lX3RheGVzIiwib3RoZXJfdGF4ZXMiLCJwcm9wZXJ0eV90YXhlcyIsIkdlb19OYW1lIiwiaXRlbSIsIkFNT1VOVCIsInRheF9vYmoiLCJUYXhfVHlwZSIsInBlcmNlbnRfb2ZfdG90YWwiLCJwdXNoIiwiaW5jbHVkZXMiLCJ0ZXh0IiwiZm9ybWF0Iiwic3R5bGUiLCJwYXRoIiwiZWFzZSIsImVhc2VMaW5lYXIiLCJhdHRyVHdlZW4iLCJwaWVUd2VlbiIsInN1Yl9kYXRhX3N2ZyIsIm9uIiwiY29uc29sZSIsImxvZyIsInNwYW4xIiwic3BhbjIiLCJpbm5lclRleHQiLCJjYXRjaCIsImVycm9yIiwiaW50ZXJwb2xhdGUiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJwaWVMZWdlbmQiLCJtYXN0ZXJfbGlzdCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJsZWZ0X2xpc3QiLCJ0ZXh0X2xpc3QiLCJyaWdodF9saXN0IiwibGVmdF9ib3giLCJ0ZXh0X2JveCIsInJpZ2h0X2JveCIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyIiwiYXBwZW5kQ2hpbGQiLCJzdWJsaXN0cyIsImxhYmVsIiwibGlzdHMiLCJsZXN0bGlzdCIsInRleHRsaXN0IiwicmlnaHRsaXN0IiwibGVmdEJveCIsInJpZ2h0Qm94IiwibGkiLCJzdWJsaXN0IiwiVE9QX0xFVkVMIiwiU1RBVEVfTkFNRVMiLCJzdGF0ZV9zZWxlY3RvciIsIndyYXBwZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInN0YXRlX2xpc3QiLCJ0b2dnbGUiLCJib2R5IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdGF0ZVNlbGVjdG9yIiwic3RhdGVfbGlzdF9pdGVtIiwic2V0QXR0cmlidXRlIiwic3ViRGF0YUxlZ2VuZCIsImxhYmVscyIsImhlaWdodHMiLCJtYXN0ZXJfc3ViX2RhdGFfbGlzdCIsInBlcmNlbnRfbGlzdCIsImxhYmVsX2xpc3QiLCJjb2xvcl9ib3giLCJ0b29sdGlwV2lkdGgiLCJ0b29sdGlwSGVpZ2h0Iiwic3ViRGF0YSIsImNvbG9yX3N0cmluZyIsInVwZGF0ZVN1YkRhdGEiLCJlbGUiLCJjb2xvckNob29zZXIiLCJzdWJfYXJyYXkiLCJjb2xvcl9jb3VudCIsImlkX2NvdW50IiwidGF4X3N0YWNrIiwia2V5cyIsInN1Yl90YXgiLCJzdGFjayIsIm9yZGVyIiwic3RhY2tPcmRlck5vbmUiLCJvZmZzZXQiLCJzdGFja09mZnNldE5vbmUiLCJ0YXhfc3RhY2tfYXJyYXkiLCJsYXllcnMiLCJ4U2NhbGUiLCJuZXdfY29sb3JzIiwieVNjYWxlIiwic3VtIiwiT2JqZWN0IiwidmFsdWVzIiwicmVjdCIsImxheWVyIiwiZXhpdCIsIm1lcmdlIiwiYmFyIiwidG9vbHRpcENyZWF0b3IiLCJsZWdlbmRDcmVhdG9yIiwidmFuaWxsYV9zdmciLCJzdWJfZGF0YV9kZXRhaWxzIiwicmVsYXRpdmVfcGVyY2VudF9kZXRhaWxzIiwib3ZlcmFsbF9wZXJjZW50X2RldGFpbHMiLCJsZWdlbmRfdGV4dCIsInNwbGl0X2lkIiwidGFyZ2V0IiwiaW5kZXgiLCJpbmRleE9mIiwiYm94X2RhdGEiLCJyZWxhdGl2ZV9wZXJjZW50IiwiYmFzZVZhbCIsIm92ZXJhbGxfcGVyY2VudCIsImxlZ2VuZCIsInJldmVyc2UiLCJpbnNlcnQiLCJyb290IiwidWwiLCJzZWxlY3RfMSIsInNlbGVjdF8yIiwic2VsZWN0b3JfY29udGFpbmVyIiwieWVhclNlbGVjdG9yIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7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TzZCLEdBUDdCLEVBUUtBLElBUkwsQ0FRVSxhQVJWLEVBUXlCLE9BUnpCLEVBU0tBLElBVEwsQ0FTVSxvQkFUVixFQVNnQyxTQVRoQyxFQVVLQSxJQVZMLENBVVUsT0FWVixFQVVtQixRQVZuQixFQVdLQSxJQVhMLENBV1UsSUFYVixFQVdnQixhQUFLO0FBQ2IsZ0NBQXNCbUIsT0FBdEIsU0FBaUN5SyxVQUFqQztBQUNILEtBYkw7QUFjSCxDQTVDRCxDOzs7Ozs7Ozs7Ozs7OztBQy9OQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQS9MLFNBQVNxSyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTs7QUFFaEQ7O0FBRUEsUUFBTWtFLE9BQU92TyxTQUFTQyxjQUFULENBQXdCLE1BQXhCLENBQWI7QUFDQTtBQUNBLFFBQU11TyxLQUFLLDRCQUFYO0FBQ0EsUUFBTUMsV0FBVyxvQ0FBZSxDQUFmLENBQWpCO0FBQ0EsUUFBTUMsV0FBVyxvQ0FBZSxDQUFmLENBQWpCO0FBQ0EsUUFBTUMscUJBQXFCM08sU0FBUzJFLHNCQUFULENBQWdDLG9CQUFoQyxFQUFzRCxDQUF0RCxDQUEzQjtBQUNBLFFBQU1pSyxlQUFlQSxZQUFyQjs7QUFFQUQsdUJBQW1CckYsV0FBbkIsQ0FBK0JtRixRQUEvQjtBQUNBRSx1QkFBbUJyRixXQUFuQixDQUErQm9GLFFBQS9CO0FBQ0FILFNBQUtqRixXQUFMLENBQWlCa0YsRUFBakI7O0FBRUEsZ0RBQWtCLFNBQWxCLEVBQTZCdkUseUJBQTdCLEVBQXdDLENBQXhDLEVBQTJDLGlEQUEzQyxFQUE4RixLQUE5RjtBQUNBLGdEQUFrQixTQUFsQixFQUE2QkEseUJBQTdCLEVBQXdDLENBQXhDLEVBQTJDLGlEQUEzQyxFQUE4RixLQUE5RjtBQUNBO0FBQ0E7QUFFSCxDQXJCRCxFOzs7Ozs7Ozs7OztBQ1BBLHVDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5cbmV4cG9ydCBjb25zdCBidWRnZXRDaXJjbGUgPSAodG90YWwxLCB0b3RhbDIsIHVwZGF0ZSkgPT4ge1xuICAgIC8vIEkgZ290IGEgbG90IG9mIGhlbHAgZnJvbSBCZW4gR2FvLCBhbiBBcHAgQWNhZGVteSBUQVxuICAgIGRlYnVnZ2VyXG4gICAgaWYgKCF0b3RhbDEgfHwgIXRvdGFsMikge1xuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgdG90YWwxID0gTWF0aC5zcXJ0KHRvdGFsMSlcbiAgICB0b3RhbDIgPSBNYXRoLnNxcnQodG90YWwyKVxuXG4gICAgY29uc3QgY2lyY2xlX2NvbnRhaW5lciA9IGQzLnNlbGVjdCgnI2J1ZGdldC1jaXJjbGUtY29udGFpbmVyJylcblxuICAgIGNvbnN0IGhlaWdodCA9IDMwMFxuICAgIGNvbnN0IHdpZHRoID0gNTAwXG4gICAgXG4gICAgY29uc3Qgc3ZnMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtc3ZnLTEnKSA/IGQzLnNlbGVjdCgnI2NpcmNsZS1zdmctMScpIDogY2lyY2xlX2NvbnRhaW5lci5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJykuYXR0cignaWQnLCAnY2lyY2xlLXN2Zy0xJyk7XG4gICAgY29uc3Qgc3ZnMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtc3ZnLTInKSA/IGQzLnNlbGVjdCgnI2NpcmNsZS1zdmctMicpIDogY2lyY2xlX2NvbnRhaW5lci5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJykuYXR0cignaWQnLCAnY2lyY2xlLXN2Zy0yJyk7XG5cbiAgICBjb25zdCBkYXRhID0gW3RvdGFsMSwgdG90YWwyXVxuICAgIGRlYnVnZ2VyXG5cbiAgICAvLyBjb25zdCBzdmcxID0gY2lyY2xlX2NvbnRhaW5lci5hcHBlbmQoJ3N2ZycpXG4gICAgLy8gICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgLy8gICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJykuYXR0cignaWQnLCAnY2lyY2xlLXN2Zy0xJyk7XG5cbiAgICAvLyBjb25zdCBzdmcyID0gY2lyY2xlX2NvbnRhaW5lci5hcHBlbmQoJ3N2ZycpXG4gICAgLy8gICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgLy8gICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJykuYXR0cignaWQnLCAnY2lyY2xlLXN2Zy0yJyk7XG5cbiAgICBjb25zdCByc2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oWzAsIChkMy5tYXgoZGF0YSkpXSlcbiAgICAgICAgLnJhbmdlKFsxLCBoZWlnaHQgLyAyXSlcblxuICAgICAgICBkZWJ1Z2dlclxuICAgIGlmICghdXBkYXRlKSB7XG4gICAgICAgIGNvbnN0IGNpcmNsZTEgPSBzdmcxLnNlbGVjdEFsbCgnLmNpcmNsZXMtMScpLmRhdGEoW3RvdGFsMV0pXG4gICAgICAgIGNvbnN0IGNpcmNsZTIgPSBzdmcyLnNlbGVjdEFsbCgnLmNpcmNsZXMtMicpLmRhdGEoW3RvdGFsMl0pXG4gICAgICAgIGNpcmNsZTEuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcnNjYWxlKGQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZXMtMScpLmF0dHIoJ2N5JywgaGVpZ2h0IC8gMilcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIChkLCBpKSA9PiB3aWR0aCAvIDIpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICcjMGE4MGFlJylcblxuICAgICAgICBjaXJjbGUyLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlcy0yJykuYXR0cignY3knLCBoZWlnaHQgLyAyKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgKGQsIGkpID0+IHdpZHRoIC8gMilcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJyMwYTgwYWUnKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIGQzLnNlbGVjdCgnLmNpcmNsZXMtMScpXG4gICAgICAgIC5kYXRhKFt0b3RhbDFdKVxuICAgICAgICAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIGQzLnNlbGVjdCgnLmNpcmNsZXMtMicpXG4gICAgICAgIC5kYXRhKFt0b3RhbDJdKVxuICAgICAgICAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgfVxuICAgIFxufSIsImltcG9ydCB7IENJUkNMRV9DT0xPUlMgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBhc3NpZ25Cb3ggPSAoYXJyYXlfb2Zfb2JqcywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQtYm94LScgOiAncmlnaHQtYm94LSdcbiAgICBhcnJheV9vZl9vYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGkgPSA0O1xuICAgICAgICBzd2l0Y2ggKG9iai5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAwIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAxIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMiBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAzIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBpKVxuICAgICAgICBjb25zdCBkZWNpbWFscyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVsxXVxuICAgICAgICBjb25zdCBpbnRlZ2VycyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVswXVxuICAgICAgICBjb25zdCBzbGljZWQgPSBvYmoucGVyY2VudCA/IGludGVnZXJzICsgJy4nICsgZGVjaW1hbHMuc2xpY2UoMCwgMikgOiAwXG4gICAgICAgIGJveC5pbm5lckhUTUwgPSBzbGljZWQgKyAnJSdcbiAgICB9KTtcbn1cblxuLy8gZC5BTU9VTlQgPT09ICdYJyA/IDAgOiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMCxcbmV4cG9ydCBjb25zdCBmaW5kQW1vdW50ID0gKGFtb3VudCkgPT4ge1xuICAgIHJldHVybiBhbW91bnQgPT09ICdYJyA/IDAgOiBhbW91bnQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDBcbn1cblxuLy8gZXhwb3J0IGNvbnN0IHN1YkRhdGFQdXNoZXIgPSAoaXRlbSkgPT4ge1xuLy8gICAgIGlmIChpdGVtICE9IFwiVDAwXCIgJiYgaXRlbSAhPSBcIlQwMVwiKSB7XG4vLyAgICAgICAgIHN3aXRjaCAoaXRlbS5zbGljZSgwLCAyKSkge1xuLy8gICAgICAgICAgICAgY2FzZSAoXCJUMFwiIHx8IFwiVDFcIik6XG4vLyAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh7XG4vLyAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbi8vICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbi8vICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICBcbi8vICAgICAgICAgICAgIGNhc2UgXCJUMlwiOlxuLy8gICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh7XG4gICAgXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1cblxuXG5cbmV4cG9ydCBjb25zdCBzdWJBcnJheUxvY2F0b3IgPSAodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSkgPT4geyAgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBmaW5kaW5nIHRoZSByaWdodCBzdWIgYXJyYXkuIEEgYml0IGhhcmQtY29kZWQuXG4gICAgc3dpdGNoICh0YXhfdHlwZSkge1xuICAgICAgICBjYXNlIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzBdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzFdXG4gICAgICAgIGNhc2UgXCJJbmNvbWUgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMl1cbiAgICAgICAgY2FzZSBcIk90aGVyIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzNdXG4gICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVs0XVxuICAgIH1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiB3YXMgdGFrZW4gZnJvbSB1c2VyIFBpbXAgVHJpemtpdHMgcG9zdCBvbiBzdGFja292ZXJmbG93IGF0IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU1NjAyNDgvcHJvZ3JhbW1hdGljYWxseS1saWdodGVuLW9yLWRhcmtlbi1hLWhleC1jb2xvci1vci1yZ2ItYW5kLWJsZW5kLWNvbG9yc1xuZXhwb3J0IGZ1bmN0aW9uIExpZ2h0ZW5EYXJrZW5Db2xvcihjb2wsIGFtdCkge1xuICAgIHZhciB1c2VQb3VuZCA9IGZhbHNlO1xuICAgIGlmIChjb2xbMF0gPT0gXCIjXCIpIHtcbiAgICAgICAgY29sID0gY29sLnNsaWNlKDEpO1xuICAgICAgICB1c2VQb3VuZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIG51bSA9IHBhcnNlSW50KGNvbCwgMTYpO1xuXG4gICAgdmFyIHIgPSAobnVtID4+IDE2KSArIGFtdDtcblxuICAgIGlmIChyID4gMjU1KSByID0gMjU1O1xuICAgIGVsc2UgaWYgKHIgPCAwKSByID0gMDtcblxuICAgIHZhciBiID0gKChudW0gPj4gOCkgJiAweDAwRkYpICsgYW10O1xuXG4gICAgaWYgKGIgPiAyNTUpIGIgPSAyNTU7XG4gICAgZWxzZSBpZiAoYiA8IDApIGIgPSAwO1xuXG4gICAgdmFyIGcgPSAobnVtICYgMHgwMDAwRkYpICsgYW10O1xuXG4gICAgaWYgKGcgPiAyNTUpIGcgPSAyNTU7XG4gICAgZWxzZSBpZiAoZyA8IDApIGcgPSAwO1xuXG4gICAgcmV0dXJuICh1c2VQb3VuZCA/IFwiI1wiIDogXCJcIikgKyAoZyB8IChiIDw8IDgpIHwgKHIgPDwgMTYpKS50b1N0cmluZygxNik7XG59XG4vLyBUaGlzIGZ1bmN0aW9uIHdhcyBhbHNvIHRha2VuIGZyb20gdXNlciBQaW1wIFRyaXpraXRzIHBvc3Qgb24gc3RhY2tvdmVyZmxvdyBhdCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTYwMjQ4L3Byb2dyYW1tYXRpY2FsbHktbGlnaHRlbi1vci1kYXJrZW4tYS1oZXgtY29sb3Itb3ItcmdiLWFuZC1ibGVuZC1jb2xvcnNcbmV4cG9ydCBjb25zdCBwU0JDID0gKHAsIGMwLCBjMSwgbCkgPT4ge1xuICAgIGxldCByLCBnLCBiLCBQLCBmLCB0LCBoLCBpID0gcGFyc2VJbnQsIG0gPSBNYXRoLnJvdW5kLCBhID0gdHlwZW9mIChjMSkgPT0gXCJzdHJpbmdcIjtcbiAgICBpZiAodHlwZW9mIChwKSAhPSBcIm51bWJlclwiIHx8IHAgPCAtMSB8fCBwID4gMSB8fCB0eXBlb2YgKGMwKSAhPSBcInN0cmluZ1wiIHx8IChjMFswXSAhPSAncicgJiYgYzBbMF0gIT0gJyMnKSB8fCAoYzEgJiYgIWEpKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIXRoaXMucFNCQ3IpIHRoaXMucFNCQ3IgPSAoZCkgPT4ge1xuICAgICAgICBsZXQgbiA9IGQubGVuZ3RoLCB4ID0ge307XG4gICAgICAgIGlmIChuID4gOSkge1xuICAgICAgICAgICAgW3IsIGcsIGIsIGFdID0gZCA9IGQuc3BsaXQoXCIsXCIpLCBuID0gZC5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobiA8IDMgfHwgbiA+IDQpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgeC5yID0gaShyWzNdID09IFwiYVwiID8gci5zbGljZSg1KSA6IHIuc2xpY2UoNCkpLCB4LmcgPSBpKGcpLCB4LmIgPSBpKGIpLCB4LmEgPSBhID8gcGFyc2VGbG9hdChhKSA6IC0xXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobiA9PSA4IHx8IG4gPT0gNiB8fCBuIDwgNCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAobiA8IDYpIGQgPSBcIiNcIiArIGRbMV0gKyBkWzFdICsgZFsyXSArIGRbMl0gKyBkWzNdICsgZFszXSArIChuID4gNCA/IGRbNF0gKyBkWzRdIDogXCJcIik7XG4gICAgICAgICAgICBkID0gaShkLnNsaWNlKDEpLCAxNik7XG4gICAgICAgICAgICBpZiAobiA9PSA5IHx8IG4gPT0gNSkgeC5yID0gZCA+PiAyNCAmIDI1NSwgeC5nID0gZCA+PiAxNiAmIDI1NSwgeC5iID0gZCA+PiA4ICYgMjU1LCB4LmEgPSBtKChkICYgMjU1KSAvIDAuMjU1KSAvIDEwMDA7XG4gICAgICAgICAgICBlbHNlIHguciA9IGQgPj4gMTYsIHguZyA9IGQgPj4gOCAmIDI1NSwgeC5iID0gZCAmIDI1NSwgeC5hID0gLTFcbiAgICAgICAgfSByZXR1cm4geFxuICAgIH07XG4gICAgaCA9IGMwLmxlbmd0aCA+IDksIGggPSBhID8gYzEubGVuZ3RoID4gOSA/IHRydWUgOiBjMSA9PSBcImNcIiA/ICFoIDogZmFsc2UgOiBoLCBmID0gcFNCQ3IoYzApLCBQID0gcCA8IDAsIHQgPSBjMSAmJiBjMSAhPSBcImNcIiA/IHBTQkNyKGMxKSA6IFAgPyB7IHI6IDAsIGc6IDAsIGI6IDAsIGE6IC0xIH0gOiB7IHI6IDI1NSwgZzogMjU1LCBiOiAyNTUsIGE6IC0xIH0sIHAgPSBQID8gcCAqIC0xIDogcCwgUCA9IDEgLSBwO1xuICAgIGlmICghZiB8fCAhdCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGwpIHIgPSBtKFAgKiBmLnIgKyBwICogdC5yKSwgZyA9IG0oUCAqIGYuZyArIHAgKiB0LmcpLCBiID0gbShQICogZi5iICsgcCAqIHQuYik7XG4gICAgZWxzZSByID0gbSgoUCAqIGYuciAqKiAyICsgcCAqIHQuciAqKiAyKSAqKiAwLjUpLCBnID0gbSgoUCAqIGYuZyAqKiAyICsgcCAqIHQuZyAqKiAyKSAqKiAwLjUpLCBiID0gbSgoUCAqIGYuYiAqKiAyICsgcCAqIHQuYiAqKiAyKSAqKiAwLjUpO1xuICAgIGEgPSBmLmEsIHQgPSB0LmEsIGYgPSBhID49IDAgfHwgdCA+PSAwLCBhID0gZiA/IGEgPCAwID8gdCA6IHQgPCAwID8gYSA6IGEgKiBQICsgdCAqIHAgOiAwO1xuICAgIGlmIChoKSByZXR1cm4gXCJyZ2JcIiArIChmID8gXCJhKFwiIDogXCIoXCIpICsgciArIFwiLFwiICsgZyArIFwiLFwiICsgYiArIChmID8gXCIsXCIgKyBtKGEgKiAxMDAwKSAvIDEwMDAgOiBcIlwiKSArIFwiKVwiO1xuICAgIGVsc2UgcmV0dXJuIFwiI1wiICsgKDQyOTQ5NjcyOTYgKyByICogMTY3NzcyMTYgKyBnICogNjU1MzYgKyBiICogMjU2ICsgKGYgPyBtKGEgKiAyNTUpIDogMCkpLnRvU3RyaW5nKDE2KS5zbGljZSgxLCBmID8gdW5kZWZpbmVkIDogLTIpXG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoaWQpID0+IHtcbiAgICBjb25zdCByZW1vdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcbiAgICByZW1vdmUgPyByZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUpIDogbnVsbFxufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2xhc3MgPSBjbGFzc05hbWUgPT4ge1xuICAgIGNvbnN0IHJlbW92ZV9saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpXG4gICAgZGVidWdnZXJcbiAgICByZW1vdmVfbGlzdC5sZW5ndGggPyByZW1vdmVfbGlzdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG59IiwiLy8gQSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBiYXNlZCBoZWF2aWx5IG9mZiBvZiBLYXJ0aGlrIFRob3RhJ3MgeW91dHViZSB0dXRvcmlhbCBcIkludHJvZHVjdGlvbiB0byBkMy5qcyA9IFBpZSBDaGFydCBhbmQgRG9udXQgQ2hhcnRcIlxuLy8gVGhlIGxlZ2VuZCBjb2RlIHdhcyBmcm9tIENyeXB0ZXJzIEluZm90ZWNoJ3MgeW91dHViZSB0dXRvcmlhbCBcIlBpZSBDaGFydCB1c2luZyBEMy5qc1wiXG5cbmltcG9ydCB7IGFzc2lnbkJveCwgZmluZEFtb3VudCB9IGZyb20gJy4vaGVscGVyX2Z1bmN0aW9ucydcbmltcG9ydCB7IGJ1ZGdldENpcmNsZSB9IGZyb20gJy4vYnVkZ2V0X2NpcmNsZSdcbmltcG9ydCB7IHN1YkRhdGEsIHVwZGF0ZVN1YkRhdGEgfSBmcm9tICcuL3N1YmRhdGFfZ2VuZXJhdG9yJ1xuLy8gXG5leHBvcnQgY29uc3QgQ09MT1JTID0gW1wiI2E2NzUxZVwiLCBcIiM5YTAwNDdcIiwgXCIjNjZhNTFlXCIsIFwiIzc0NzBiM1wiLCBcIiNlODJiOGFcIl1cbmV4cG9ydCBjb25zdCBDSVJDTEVfQ09MT1JTID0gW0NPTE9SU1sxXSwgQ09MT1JTWzBdLCBDT0xPUlNbNF0sIENPTE9SU1syXSwgQ09MT1JTWzNdXVxuLy8gZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIk90aGVyIFRheGVzXCJdXG5leHBvcnQgY29uc3QgTEFCRUxTID0gW1wiT3RoZXIgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBUYXhlc1wiXVxuLy8gZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKGNzdlBhdGgsIHNlY3RvciwgYW1vdW50LCBzdGF0ZSwgbXVsdGlwbGllciA9IDEsIHNraXAgPSAxKSB7XG5leHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUsIHRheF90eXBlLCBwaWVfbnVtLCBjc3YgPSBcIi4vc3JjL2Fzc2V0cy9kYXRhL0ZZMjAxOC1TVEMtRGV0YWlsZWQtVGFibGUuY3N2XCIsIHVwZGF0ZSA9IHRydWUpIHtcblxuICAgIC8vIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YWxzLVwiICsgcGllX251bSlcbiAgICAvLyByZW1vdmUgPyByZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUpIDogbnVsbFxuICAgIC8vIGNvbnN0IHJlbW92ZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRldGFpbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZTIgPyByZW1vdmUyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlMikgOiBudWxsXG5cbiAgICBjb25zdCBoMSA9IGQzLnNlbGVjdCgnI3RvdGFscy1oZWFkZXItJyArIHBpZV9udW0pXG4gICAgY29uc3Qgc3BhbiA9IGQzLnNlbGVjdCgnI3RvdGFscy1zcGFuLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IGgyID0gZDMuc2VsZWN0KFwiI2RldGFpbHMtXCIgKyBwaWVfbnVtKVxuXG5cbiAgICBsZXQgVE9UQUwgPSAwO1xuICAgIGxldCBUWVBFUyA9IFtdXG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cblxuXG4gICAgY29uc3QgY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKENPTE9SUyk7XG5cbiAgICAvLyBhcmMgZ2VuZXJhdG9yXG4gICAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDEwKVxuICAgICAgICAvLyAuaW5uZXJSYWRpdXMoMCk7IC8vIGZvciBjaXJjbGVcbiAgICAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDEwMCkgLy8gZm9yIGRvbnV0XG5cbiAgICAvLyBjb25zdCBsYWJsZUFyYyA9IGQzLmFyYygpXG4gICAgLy8gICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSA1MClcbiAgICAvLyAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDUwKTtcblxuICAgIC8vIHBpZSBnZW5lcmF0b3JcbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgICAvLyAuc29ydChudWxsKVxuICAgICAgICAudmFsdWUoZCA9PiBkLmFtb3VudCk7XG5cbiAgICAvLyBkZWZpbmUgc3ZnIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIi5waWUtXCIgKyBwaWVfbnVtKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKVxuXG4gICAgLy8gaW1wb3J0IGRhdGFcbiAgICBkMy5jc3YoY3N2KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgYXJyYXlzIHRoYXQgd2lsbCBjb250YWluIHRoZSBzdWIgbGV2ZWwgdGF4IGRhdGFcbiAgICAgICAgbGV0IHNhbGVzX3RheGVzID0gW11cbiAgICAgICAgbGV0IGxpY2Vuc2VfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgaW5jb21lX3RheGVzID0gW11cbiAgICAgICAgbGV0IG90aGVyX3RheGVzID0gW11cbiAgICAgICAgbGV0IHByb3BlcnR5X3RheGVzID0gW11cbiAgICAgICAgLy8gbGV0IHNhbGVzX3RheF9vYmogPSB7IHRheF9ncm91cDogTEFCRUxTWzRdIH1cbiAgICAgICAgLy8gcGFyc2UgdGhlIGNzdlxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9IFwiVDAwXCIpIHsgIC8vIGRvbid0IHdhbnQgdG8gY2F0Y2ggVG90YWwgb3IgUHJvcGVydHkgVGF4ZXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRheF9vYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudF9vZl90b3RhbDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkLml0ZW0uc2xpY2UoMCwyKSkgeyAvLyBmaWxsIHVwIHN1YiBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gPT09IFwiVDA5XCIpIHsgc2FsZXNfdGF4ZXMucHVzaCh0YXhfb2JqKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDFcIikgeyBwcm9wZXJ0eV90YXhlcy5wdXNoKHRheF9vYmopIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzYWxlc190YXhfb2JqW2QuVGF4X1R5cGVdID0gZmluZEFtb3VudChkLkFNT1VOVClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMlwiOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29tZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9ICdUMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUWVBFUy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZC5rZXkgPSBkLlRheF9UeXBlO1xuICAgICAgICAgICAgICAgICAgICBkLmFtb3VudCA9IGZpbmRBbW91bnQoZC5BTU9VTlQpO1xuICAgICAgICAgICAgICAgICAgICBkLnBlcmNlbnQgPSAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWluZXJfYXJyYXkgPSBbXSAgLy8gc2V0dGluZyB1cCBjb250YWluZXIgYXJyYXkgZm9yIHBhc3NpbmcgaW50byBjbGljayBoYW5kbGVyXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChwcm9wZXJ0eV90YXhlcylcblxuICAgICAgICB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkoKVxuICAgICAgICAvLyBzZXQgaDEgYWZ0ZXIgdG90YWwgaGFzIGJlZW4gZGVmaW5lZFxuICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgXCIpXG4gICAgICAgIHNwYW4udGV4dChcIiRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgaDIudGV4dChcIlwiKVxuICAgICAgICAvLyBhdHRlbXB0IGJ1ZGdldENpcmNsZSBjYWxsXG4gICAgICAgIC8vIGJ1ZGdldENpcmNsZShUT1RBTClcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwZXJjZW50YWdlcyBpbiB0aGUgY2VudGVyIGJveFxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgYXJjKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBkID0+IGNvbG9ycyhkLmRhdGEua2V5KSlcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgICAgICAuZHVyYXRpb24oNzUwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbignZCcsIHBpZVR3ZWVuKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHBhdGgub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIC8vIHdoeSBkb2Vzbid0IHRoaXMgd29yaz9cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gICAgICAgICAgICAgLmR1cmF0aW9uKCc1MCcpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIGRldGVybWluZSBob3cgdG8gZmxpcCB0aGUgcGllc1xuICAgICAgICBpZiAocGllX251bSA9PT0gMikgey8vIGZsaXAgdGhlIHNlY29uZCBwaWVcbiAgICAgICAgICAgIGcuYXR0cihcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVgoLTEpIHRyYW5zbGF0ZSgzMDBweCwgMHB4KSBzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgY29uc3Qgc3ViX2RhdGFfc3ZnID0gZDMuc2VsZWN0KCcjc3ViLWRhdGEtZy0nICsgcGllX251bSkuc2VsZWN0QWxsKCcuc3ViLWRhdGEtJyArIHBpZV9udW0pXG4gICAgICAgIGcub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coZClcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oJzUwJylcbiAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsICcuODUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgIC8vIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE4IHdhcyAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICAvLyBoMi50ZXh0KFwiXCIpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2snLCB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSwgdHJ1ZSkpXG4gICAgICAgIC8vIC5vbignY2xpY2snLCB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgc3ViX2RhdGFfc3ZnLCBwaWVfbnVtKSlcbiAgICAgICAgY29uc29sZS5sb2cocGllX251bSlcbiAgICAgICAgY29uc3Qgc3BhbjEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWxzLXNwYW4tMScpXG4gICAgICAgIGNvbnN0IHNwYW4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFscy1zcGFuLTInKVxuXG4gICAgICAgIGlmIChzcGFuMS5pbm5lclRleHRcbiAgICAgICAgICAgICYmIHNwYW4yLmlubmVyVGV4dCkge1xuICAgICAgICAgICAgY29uc3QgdG90YWwxID0gcGFyc2VJbnQoc3BhbjEuaW5uZXJUZXh0LnNsaWNlKDEpLnNwbGl0KCcsJykuam9pbignJykpXG4gICAgICAgICAgICBjb25zdCB0b3RhbDIgPSBwYXJzZUludChzcGFuMi5pbm5lclRleHQuc2xpY2UoMSkuc3BsaXQoJywnKS5qb2luKCcnKSlcbiAgICAgICAgICAgIGJ1ZGdldENpcmNsZSh0b3RhbDEsIHRvdGFsMiwgdXBkYXRlKVxuICAgICAgICB9ICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHsgaWYgKGVycm9yKSB0aHJvdyBlcnJvciB9KVxuICAgIFxuICAgIGNvbnN0IHBpZVR3ZWVuID0gYiA9PiB7XG4gICAgICAgIGIuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZTogMCB9LCBiKVxuICAgICAgICByZXR1cm4gKHQpID0+IHsgcmV0dXJuIGFyYyhpKHQpKSB9XG4gICAgfSAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgICIsImltcG9ydCB7IENJUkNMRV9DT0xPUlMsIExBQkVMU30gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgcGllTGVnZW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IG1hc3Rlcl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgbWFzdGVyX2xpc3QuY2xhc3NMaXN0LmFkZCgnbWFzdGVyLWxpc3QnKVxuXG4gICAgY29uc3QgbGVmdF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHRleHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCByaWdodF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgbGVmdF9saXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnQtbGlzdCcpICBcbiAgICB0ZXh0X2xpc3QuY2xhc3NMaXN0LmFkZCgndGV4dC1saXN0JykgIFxuICAgIHJpZ2h0X2xpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHQtbGlzdCcpIFxuXG4gICAgZm9yIChsZXQgaSA9IExBQkVMUy5sZW5ndGggLSAxIDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxlZnRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCB0ZXh0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgcmlnaHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIGxlZnRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdsZWZ0LWJveCcpXG4gICAgICAgIGxlZnRfYm94LmlkID0gKCdsZWZ0LWJveC0nICsgaSlcbiAgICAgICAgbGVmdF9ib3guc3R5bGUuY29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgcmlnaHRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdyaWdodC1ib3gnKVxuICAgICAgICByaWdodF9ib3guaWQgPSAoJ3JpZ2h0LWJveC0nICsgaSlcbiAgICAgICAgcmlnaHRfYm94LnN0eWxlLmNvbG9yID0gQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIHRleHRfYm94LmNsYXNzTGlzdC5hZGQoJ3RleHQtYm94JylcbiAgICAgICAgdGV4dF9ib3guaW5uZXJIVE1MID0gTEFCRUxTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgXCIgKyBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgbGVmdF9saXN0LmFwcGVuZENoaWxkKGxlZnRfYm94KVxuICAgICAgICB0ZXh0X2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9ib3gpXG4gICAgICAgIHJpZ2h0X2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfYm94KVxuICAgIH1cblxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKGxlZnRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfbGlzdClcbiAgICByZXR1cm4gbWFzdGVyX2xpc3Rcbn1cblxuY29uc3Qgc3VibGlzdHMgPSAobGFiZWwsIGNvbG9yKSA9PiB7XG4gICAgY29uc3QgbGlzdHMgPSBbXVxuXG5cbiAgICBsZXN0bGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0bGlzdCcpXG4gICAgdGV4dGxpc3QuY2xhc3NMaXN0LmFkZCgndGV4dGxpc3QnKVxuICAgIHJpZ2h0bGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodGxpc3QnKVxuXG4gICAgY29uc3QgbGVmdEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCByaWdodEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG5cbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsZWZ0Qm94KVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGkpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChyaWdodEJveClcbiAgICByZXR1cm4gc3VibGlzdFxufSIsImltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgdG9vbHRpcENyZWF0b3IgfSBmcm9tICcuL3N1YmRhdGFfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgVE9QX0xFVkVMID0gWydUMDAnLCAnVDAxJywgJ1RBMScsICdUQTMnLCAnVEE0JywgJ1RBNSddXG5jb25zdCBTVEFURV9OQU1FUyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggQ2Fyb2xpbmEnLCAnTm9ydGggRGFrb3RhJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ11cblxuZXhwb3J0IGNvbnN0IHN0YXRlX3NlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcbiBcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcInNlbGVjdC13cmFwcGVyLVwiICsgcGllX251bSlcbiAgICB3cmFwcGVyLmlkID0gXCJzZWxlY3Qtd3JhcHBlci1cIiArIHBpZV9udW1cblxuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgc2VsZWN0LmlubmVySFRNTCA9IHBpZV9udW0gPT09IDEgPyAnQWxhYmFtYScgOiAnV3lvbWluZydcbiAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwic2VsZWN0LVwiICsgcGllX251bSlcbiAgICBzZWxlY3QuaWQgPSBcInNlbGVjdC1cIiArIHBpZV9udW1cblxuICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgfSlcbiAgICBcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSAgLy8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHNvIHRoYXQgaWYgSSBjbGljayBhbnl3aGVyZSBlbHNlIHRoZSBsaXN0IGRpc2FwcGVhcnNcbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICB9KVxuICAgIFxuICAgIGNvbnN0IHN0YXRlU2VsZWN0b3IgPSBzdGF0ZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdC1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzZWxlY3QuaW5uZXJUZXh0ID0gc3RhdGVcbiAgICAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIHN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZylcbiAgICAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG4gICAgICAgICAgICB0b29sdGlwQ3JlYXRvcihwaWVfbnVtKVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHN0YXRlX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdzdGF0ZS1saXN0LScgKyBwaWVfbnVtKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICBzdGF0ZV9saXN0LmlkID0gJ3N0YXRlLWxpc3QtJyArIHBpZV9udW1cbiAgICBcbiAgICBTVEFURV9OQU1FUy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGVfbGlzdF9pdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5pbm5lckhUTUwgPSBzdGF0ZVxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4gICAgICAgIHN0YXRlX2xpc3QuYXBwZW5kQ2hpbGQoc3RhdGVfbGlzdF9pdGVtKVxuICAgIH0pXG4gICAgXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChzZWxlY3QpXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChzdGF0ZV9saXN0KVxuICAgIFxuICAgIHJldHVybiB3cmFwcGVyXG59XG5cbi8vIGNvbnN0IHBoYXNlT3V0ID0gKG5vZGUpID0+IHtcblxuLy8gICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxuLy8gfSIsImV4cG9ydCBjb25zdCBzdWJEYXRhTGVnZW5kID0gKGNvbG9ycywgbGFiZWxzLCBoZWlnaHRzLCBwaWVfbnVtKSA9PiB7XG4gICAgY29uc3QgbWFzdGVyX3N1Yl9kYXRhX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcbiAgICBtYXN0ZXJfc3ViX2RhdGFfbGlzdC5jbGFzc0xpc3QuYWRkKCdtYXN0ZXItc3ViLWRhdGEtbGlzdC0nICsgcGllX251bSlcbiAgICBtYXN0ZXJfc3ViX2RhdGFfbGlzdC5pZCA9ICdtYXN0ZXItc3ViLWRhdGEtbGlzdC0nICsgcGllX251bVxuXG4gICAgY29uc3QgcGVyY2VudF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IGxhYmVsX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgY29sb3JfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgZm9yIChsZXQgaSA9IGxhYmVscy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXG4gICAgICAgIC8vIGNvbnN0IHJlbGF0aXZlX3BlcmNlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIC8vIGNvbnN0IG92ZXJhbGxfcGVyY2VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IGNvbG9yX2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICB0ZXh0X2JveC5jbGFzc0xpc3QuYWRkKCdzdWItZGF0YS1sYWJlbC0nICsgcGllX251bSlcbiAgICAgICAgdGV4dF9ib3guaW5uZXJIVE1MID0gbGFiZWxzW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCBcIiArIENJUkNMRV9DT0xPUlNbaV1cbiAgICB9XG59IiwiaW1wb3J0IHsgc3ViQXJyYXlMb2NhdG9yLCBMaWdodGVuRGFya2VuQ29sb3IsIHJlbW92ZSwgcmVtb3ZlQ2xhc3MgfSBmcm9tICcuL2hlbHBlcl9mdW5jdGlvbnMnXG5pbXBvcnQgeyBDSVJDTEVfQ09MT1JTLCBMQUJFTFMgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InO1xuaW1wb3J0IHsgc3ViRGF0YUxlZ2VuZCB9IGZyb20gJy4vc3ViX2RhdGFfbGVnZW5kJ1xuXG5jb25zdCB3aWR0aCA9IDkwICAvLyBzZXR0aW5nIHRoZSBkaW1lbnNpb25zIHRvIGNvcnJlc3BvbmQgdG8gdGhlIHBpZSBjaGFydHMnXG5jb25zdCBoZWlnaHQgPSA3NTBcbi8vIGNvbnN0IGhlaWdodCA9IDkwICAvLyBzZXR0aW5nIHRoZSBkaW1lbnNpb25zIHRvIGNvcnJlc3BvbmQgdG8gdGhlIHBpZSBjaGFydHMnXG4vLyBjb25zdCB3aWR0aCA9IDUwMFxuXG5jb25zdCB0b29sdGlwV2lkdGggPSAxMjAgLy8gd2lsbCBhbHRlciB0aGVzZSBhcyBuZWVkZWRcbmNvbnN0IHRvb2x0aXBIZWlnaHQgPSA0MFxuXG5leHBvcnQgY29uc3Qgc3ViRGF0YSA9IChjb250YWluZXJfYXJyYXksIHBpZV9udW0sIGNvbG9yX3N0cmluZyA9IFwiIzNGNkQyQVwiKSA9PiB7XG4gICAgLy8gYSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBsZWFybmVkIGZyb20gTWljaGFlbCBTdGFuYWxhbmQncyBcIlN0YWNrZWQgYmFyIGNoYXJ0IHdpdGggdG9vbHRpcHNcIiB0dXRvcmlhbCBhdCBodHRwOi8vYmwub2Nrcy5vcmcvbXN0YW5hbGFuZC82MTAwNzEzXG5cbiAgICByZW1vdmUoJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcbiAgICByZW1vdmUoJ3N1Yi1kYXRhLWxlZ2VuZC1zdmctJyArIHBpZV9udW0pXG5cbiAgICBcbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIjc3ViLWRhdGEtXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXBwZW5kKFwic3ZnXCIpIFxuICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKS5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCkuYXR0cignaWQnLCAnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnc3ViLWRhdGEtJyArIHBpZV9udW0pLmF0dHIoJ2lkJywgJ3N1Yi1kYXRhLWctJyArIHBpZV9udW0pXG4gICAgY29uc29sZS5sb2coc3ZnKVxuICAgIHVwZGF0ZVN1YkRhdGEoY29udGFpbmVyX2FycmF5LCBzdmcsIHBpZV9udW0pKG51bGwpXG5cbn1cblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVN1YkRhdGEgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSA9PiB7XG4gICAgXG4gICAgcmV0dXJuIChlbGUpID0+IHtcblxuICAgICAgICByZW1vdmUoJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcbiAgICAgICAgcmVtb3ZlKCdzdWItZGF0YS1sZWdlbmQtc3ZnLScgKyBwaWVfbnVtKVxuXG5cbiAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiI3N1Yi1kYXRhLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKVxuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtZy0nICsgcGllX251bSlcbiAgICAgICAgICAgIC8vIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIilcblxuXG5cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRheF90eXBlID0gZWxlID8gZWxlLmRhdGEua2V5IDogXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIlxuICAgICAgICBjb25zdCBjb2xvcl9zdHJpbmcgPSBjb2xvckNob29zZXIodGF4X3R5cGUpXG4gICAgICAgIGNvbnN0IHN1Yl9hcnJheSA9IHN1YkFycmF5TG9jYXRvcih0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KVxuICAgICAgICBsZXQgY29sb3JfY291bnQgPSAwXG4gICAgICAgIGxldCBpZF9jb3VudCA9IDBcbiAgICBcbiAgICAgICAgbGV0IHRheF9zdGFjayA9IHt9XG4gICAgICAgIC8vIHNldHRpbmcgdXAga2V5c1xuICAgICAgICBsZXQga2V5cyA9IFtdXG4gICAgICAgIC8vIGtleXMucHVzaCh0YXhfdHlwZSlcbiAgICAgICAgc3ViX2FycmF5LmZvckVhY2goKHN1Yl90YXgsIGkpID0+IHtcbiAgICAgICAgICAgIGtleXMucHVzaChzdWJfdGF4LmtleSlcbiAgICAgICAgICAgIHRheF9zdGFja1tzdWJfdGF4LmtleV0gPSBzdWJfdGF4LnBlcmNlbnRfb2ZfdG90YWxcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZDMuc3RhY2soKVxuICAgICAgICAgICAgLmtleXMoa2V5cylcbiAgICAgICAgICAgIC5vcmRlcihkMy5zdGFja09yZGVyTm9uZSlcbiAgICAgICAgICAgIC5vZmZzZXQoZDMuc3RhY2tPZmZzZXROb25lKVxuICAgICAgICBsZXQgdGF4X3N0YWNrX2FycmF5ID0gW11cbiAgICAgICAgdGF4X3N0YWNrX2FycmF5LnB1c2godGF4X3N0YWNrKVxuICAgICAgICBjb25zdCBsYXllcnMgPSBzdGFjayh0YXhfc3RhY2tfYXJyYXkpXG4gICAgXG4gICAgICAgIC8vIGNvbnN0IHggPSBkMy5zY2FsZU9yZGluYWwoKVxuICAgICAgICAvLyAgICAgLmRvbWFpbihsYXllcnNbMF0ubWFwKGQgPT4gZC54KSlcbiAgICAgICAgLy8gICAgIC8vIC5yYW5nZShbMTAsIHdpZHRoXSwgMCkgIC8vIG1heSBiZSBhIHF1aWNrZXIgd2F5IHRvIGRvIHRoaXMgYXMgdGhlcmUgaXMgb25seSBvbmUgYmFyXG4gICAgICAgIC8vICAgICAucmFuZ2UoW3dpZHRoXSlcbiAgICAgICAgY29uc3QgeFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbMCwgMV0pXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICBcbiAgICAgICAgLy8gY29uc3QgY29sb3JzID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAvLyAgICAgLmRvbWFpbihbMSwgMTBdKVxuICAgICAgICAvLyAgICAgLnJhbmdlKFtcInJlZFwiLCBcImJsdWVcIl0pXG5cbiAgICAgICAgY29uc3QgbmV3X2NvbG9ycyA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFswLCBrZXlzLmxlbmd0aF0pXG4gICAgICAgICAgICAucmFuZ2UoW1wid2hpdGVcIiwgY29sb3Jfc3RyaW5nXSlcbiAgICAgICAgXG4gICAgICAgIC8vIGNvbnN0IGNvbG9ycyA9IFtjb2xvcl9zdHJpbmddXG4gICAgICAgIC8vIGNvbnN0IGRlY3JlbWVudCA9IDEwMCAvIGtleXMubGVuZ3RoXG4gICAgICAgIC8vIGxldCBuZXh0X2NvbG9yID0gTGlnaHRlbkRhcmtlbkNvbG9yKGNvbG9yX3N0cmluZywgZGVjcmVtZW50KVxuICAgICAgICAvLyB3aGlsZSAoY29sb3JzLmxlbmd0aCA8IGtleXMubGVuZ3RoKSB7XG4gICAgICAgIC8vICAgICBjb2xvcnMucHVzaChuZXh0X2NvbG9yKVxuICAgICAgICAvLyAgICAgbmV4dF9jb2xvciA9IExpZ2h0ZW5EYXJrZW5Db2xvcihuZXh0X2NvbG9yLCBkZWNyZW1lbnQpXG4gICAgICAgIC8vIH0gICAgXG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIGQzLnN1bShPYmplY3QudmFsdWVzKHRheF9zdGFjaykpXSkgIC8vIHRoZSBpbmNyZW1lbnQgdXAgdG8gdGhlIHRvdGFsXG4gICAgICAgICAgICAvLyAucmFuZ2UoW2hlaWdodCwgMF0pXG4gICAgICAgICAgICAucmFuZ2UoWzAsIGhlaWdodF0pXG4gICAgXG4gICAgICAgIGNvbnN0IGcgPSBzdmcuc2VsZWN0QWxsKFwiLnN1Yi10YXhlcy1cIiArIHBpZV9udW0pICAvLyBubyBnIGF0IHRoaXMgcG9pbnQsIGJ1dCB0aGV5IHdpbGwgaGF2ZSB0aGlzIGNsYXNzXG4gICAgICAgICAgICAuZGF0YShsYXllcnMpLmVudGVyKCkgIC8vIG5vdyB0aGVyZSB3aWxsIGJlIGEgZyBmb3IgZXZlcnkgYmFyIHdpdGhpbiB0aGUgZ3JhcGguXG4gICAgICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInN1Yi10YXhlcy1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBcbiAgICAgICAgLy8gLmF0dHIoJ2ZpbGwnLCBkID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgcmV0dXJuIGNvbG9ycyhkKX0pXG4gICAgXG4gICAgICAgIGNvbnN0IHJlY3QgPSBnLnNlbGVjdEFsbChcInJlY3RcIikgIC8vIG1ha2luZyBlYWNoIG9iaiBvZiB0aGUgY29ycmVzcG9uZCB0byBhIHJlY3Qgd2l0aGluIHRoZSBnXG4gICAgICAgICAgICAuZGF0YShsYXllciA9PiBsYXllcik7IC8vIHB1bGxpbmcgb3V0IGVhY2ggaW5kaXZpZHVhbCBvYmpcbiAgICAgICAgICAgIHJlY3QuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmVjdC5lbnRlcigpLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIGQgPT4geFNjYWxlKDApKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHhTY2FsZSgxKSkgIC8vIHByb2JhYmx5IGNhbiBoYXJkIGNvZGUsIHNpbmNlIG9ubHkgb25lIGJhclxuICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsIChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgc3RhY2stJHtwaWVfbnVtfS0ke2lkX2NvdW50Kyt9YFxuICAgICAgICAgICAgICAgIH0pLm1lcmdlKHJlY3QpXG5cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAuYXR0cigneCcsIGQgPT4geFNjYWxlKDApKSAgLy8gcGFzc2luZyBlYWNoIG9iaidzIHggdmFsdWUgdG8gdGhlIGQzIHggZnVuY3Rpb24gZGVmaW5lZCBhYm92ZVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBsYXllciA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodCAtIHlTY2FsZShsYXllclsxXSlcbiAgICAgICAgICAgIH0pICAvLyB5MCBpcyB0aGUgaGVpZ2h0IHdoZXJlIGVhY2ggc2VnbWVudCBpbiB0aGUgc3RhY2sgc3RhcnRzXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4U2NhbGUoMSkpICAvLyBwcm9iYWJseSBjYW4gaGFyZCBjb2RlLCBzaW5jZSBvbmx5IG9uZSBiYXJcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBiYXIgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB5U2NhbGUoYmFyWzFdIC0gYmFyWzBdKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3X2NvbG9ycygrK2NvbG9yX2NvdW50KVxuICAgICAgICAgICAgfSkgXG5cbiAgICAgICAgdG9vbHRpcENyZWF0b3IocGllX251bSwgdGF4X3R5cGUpXG5cbiAgICBsZWdlbmRDcmVhdG9yKHBpZV9udW0sIGtleXMsIG5ld19jb2xvcnMpXG4gICAgLy8gc3ViRGF0YUxlZ2VuZChuZXdfY29sb3JzLCApXG5cbiAgICB9XG5cbn1cblxuY29uc3QgY29sb3JDaG9vc2VyID0gKHRheF90eXBlKSA9PiB7XG4gICAgc3dpdGNoICh0YXhfdHlwZSkge1xuICAgICAgICBjYXNlIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gQ0lSQ0xFX0NPTE9SU1s0XVxuICAgICAgICBjYXNlICdQcm9wZXJ0eSBUYXhlcyc6XG4gICAgICAgICAgICByZXR1cm4gQ0lSQ0xFX0NPTE9SU1szXVxuICAgICAgICBjYXNlIFwiTGljZW5zZSBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbMl1cbiAgICAgICAgY2FzZSAnSW5jb21lIFRheGVzJzpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzFdXG4gICAgICAgIGNhc2UgJ090aGVyIFRheGVzJzpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzBdXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgdG9vbHRpcENyZWF0b3IgPSAocGllX251bSwgdGF4X3R5cGUpID0+IHtcbiAgICAvLyBjb25zdCB2YW5pbGxhX3Rvb2x0aXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAvLyB2YW5pbGxhX3Rvb2x0aXAuY2xhc3NMaXN0LmFkZCgnc3ViLWRhdGEtdG9vbHRpcCcsIGB0b29sdGlwYCwgYGhpZGRlbmApXG5cbiAgICAvLyAvLyBjb25zdCBvdmVyX3N2ZyA9IGQzLnNlbGVjdCgnI3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcbiAgICBjb25zdCB2YW5pbGxhX3N2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWItZGF0YS1zdmctJyArIHBpZV9udW0pXG4gICAgY29uc3Qgc3ViX2RhdGFfZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBkYXRhLWRldGFpbHMtdHlwZS0ke3BpZV9udW19YClcbiAgICBjb25zdCByZWxhdGl2ZV9wZXJjZW50X2RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcmVsYXRpdmUtcGVyY2VudC0ke3BpZV9udW19YClcbiAgICBjb25zdCBvdmVyYWxsX3BlcmNlbnRfZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBvdmVyYWxsLXBlcmNlbnQtJHtwaWVfbnVtfWApXG4gICAgXG4gICAgaWYgKCFzdWJfZGF0YV9kZXRhaWxzLmlubmVySFRNTCkge1xuICAgICAgICBzdWJfZGF0YV9kZXRhaWxzLmlubmVySFRNTCA9ICdDbGljayBvbiBhIHNlY3Rpb24gb2YgdGhlIHBpZSBjaGFydCB0byBzZWUgaG93IHRoYXQgdGF4IGNhdGVnb3J5IGJyZWFrcyBkb3duJ1xuICAgICAgICByZWxhdGl2ZV9wZXJjZW50X2RldGFpbHMuaW5uZXJIVE1MID0gJ1RoZW4gc2Njcm9sbCBvdmVyIHRoZSBzdGFja2VkIGJhciB0byByZXZlYWwgZGV0YWlscyBhYm91dCB0aGUgc3ViLXRheGVzJ1xuICAgICAgICBzdWJfZGF0YV9kZXRhaWxzLmlubmVySFRNTCA9IGxlZ2VuZF90ZXh0LmlubmVySFRNTFxuICAgIH1cbiAgICAvLyB2YW5pbGxhX3N2Zy5hcHBlbmRDaGlsZCh2YW5pbGxhX3Rvb2x0aXApXG4gICAgXG4gICAgdmFuaWxsYV9zdmcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcbiAgICAgICAgY29uc3Qgc3BsaXRfaWQgID0gZS50YXJnZXQuaWQuc3BsaXQoJy0nKVxuICAgICAgICBjb25zdCBsZWdlbmRfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsZWdlbmQtdGV4dC0ke3NwbGl0X2lkWzFdfS0ke3NwbGl0X2lkWzJdfWApXG4gICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIGlmICghdGF4X3R5cGUgfHwgdGF4X3R5cGUgPT09IFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCIpIHtcbiAgICAgICAgICAgIHRheF90eXBlID0gJ1NhbGVzIFRheGVzJ1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc3QgbGVnZW5kX2l0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGVnZW5kLWl0ZW0tJHtzcGxpdF9pZFsxXX0tJHtzcGxpdF9pZFsyXX1gKVxuICAgICAgICBjb25zdCBzaWRlID0gcGllX251bSA9PT0gMSA/ICdsZWZ0JyA6ICdyaWdodCdcbiAgICAgICAgY29uc3QgaW5kZXggPSBMQUJFTFMuaW5kZXhPZih0YXhfdHlwZSlcbiAgICAgICAgY29uc3QgYm94X2RhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaWRlICsgYC1ib3gtYCArIGluZGV4KS5pbm5lckhUTUxcblxuICAgICAgICBsZXQgcmVsYXRpdmVfcGVyY2VudCA9IChlLnRhcmdldC5oZWlnaHQuYmFzZVZhbC52YWx1ZSAvIGhlaWdodCkgKiAxMDBcbiAgICAgICAgcmVsYXRpdmVfcGVyY2VudCA9IE1hdGgucm91bmQoMTAwICogcmVsYXRpdmVfcGVyY2VudCkgLyAxMDBcbiAgICAgICAgXG4gICAgICAgIGxldCBvdmVyYWxsX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGJveF9kYXRhLnNsaWNlKDAsIC0xKSlcbiAgICAgICAgb3ZlcmFsbF9wZXJjZW50ID0gTWF0aC5yb3VuZCgxMDAgKiBvdmVyYWxsX3BlcmNlbnQgKiByZWxhdGl2ZV9wZXJjZW50IC8gMTAwKSAvIDEwMFxuICAgICAgICAvLyBsZXQgb3ZlcmFsbF9wZXJjZW50ID0gXG4gICAgICAgIC8vIGxlZ2VuZF9pdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIG92ZXJhbGxfcGVyY2VudF9kZXRhaWxzLmlubmVySFRNTCA9IGBQZXJjZW50IG9mIHRvdGFsIGJ1ZGdldDogYCArIG92ZXJhbGxfcGVyY2VudFxuICAgICAgICByZWxhdGl2ZV9wZXJjZW50X2RldGFpbHMuaW5uZXJIVE1MID0gYFBlcmNlbnQgb2YgY2F0ZWdvcnk6ICR7cmVsYXRpdmVfcGVyY2VudH1gXG4gICAgICAgIHN1Yl9kYXRhX2RldGFpbHMuaW5uZXJIVE1MID0gbGVnZW5kX3RleHQuaW5uZXJIVE1MXG4gICAgICAgIC8vIHZhbmlsbGFfdG9vbHRpcC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgIH0pXG4gICAgLy8gdmFuaWxsYV9zdmcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgLy8gICAgIC8vIGNvbnN0IHhQb3MgPSBlLnBhZ2VYIC0gKHRvb2x0aXBXaWR0aCAvIDIpIC8vIHRoaXNbMF0gY29ycmVzcG9uZHMgdG8gbW91c2UncyB4IHBvcywgYW5kIHB1c2hpbmcgaXQgbGVmdCBieSBoYWxmIG9mIHRoZSB0b29sdGlwJ3Mgd2lkdGggZW5zdXJlIGl0IGlzIGNlbnRlcmVkXG4gICAgLy8gICAgIC8vIGNvbnN0IHlQb3MgPSBlLnBhZ2VZIC0gMjUgLy8gcHV0cyB0aGUgdG9vbHRpcCB1cCBhIGJpdCBhYm92ZSB0aGUgY3Vyc29yXG4gICAgLy8gICAgIC8vIHZhbmlsbGFfdG9vbHRpcC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgeFBvcyArICcsJyArIHlQb3MgKyAnKScpXG4gICAgLy8gICAgIC8vIHZhbmlsbGFfdG9vbHRpcC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eFBvc30sICR7eVBvc30pYFxuICAgIC8vICAgICAvLyB2YW5pbGxhX3Rvb2x0aXAuc2VsZWN0KCd0ZXh0JykudGV4dCgoKGUudGFyZ2V0LmhlaWdodC5iYXNlVmFsLnZhbHVlIC0gZS50YXJnZXQueS5iYXNlVmFsKSAvIGhlaWdodCAqIDEwMCkgKyBgIHBlcmNlbnQgb2YgYCArIHRheF90eXBlKSAvLyBzaG93cyB0aGUgcGVyY2VudCAgXG4gICAgLy8gICAgIC8vIHZhbmlsbGFfdG9vbHRpcC5pbm5lclRleHQgPSAoKChlLnRhcmdldC5oZWlnaHQuYmFzZVZhbC52YWx1ZSAtIGUudGFyZ2V0LnkuYmFzZVZhbC52YWx1ZSkgLyBoZWlnaHQgKiAxMDApICsgYCBwZXJjZW50IG9mIGAgKyB0YXhfdHlwZSkgLy8gc2hvd3MgdGhlIHBlcmNlbnQgIFxuICAgIC8vIH0pXG4gICAgdmFuaWxsYV9zdmcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBlID0+IHtcbiAgICAgICAgLy8gY29uc3Qgc3BsaXRfaWQgPSBlLnRhcmdldC5pZC5zcGxpdCgnLScpXG4gICAgICAgIC8vIGNvbnN0IGxlZ2VuZF9pdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGxlZ2VuZC1pdGVtLSR7c3BsaXRfaWRbMV19LSR7c3BsaXRfaWRbMl19YClcbiAgICAgICAgLy8gY29uc3Qgc3ViX2RhdGFfZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBkYXRhLWRldGFpbHMtdHlwZS0ke3BpZV9udW19YClcbiAgICAgICAgLy8gY29uc3QgcmVsYXRpdmVfcGVyY2VudF9kZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHJlbGF0aXZlLXBlcmNlbnQtJHtwaWVfbnVtfWApXG4gICAgICAgIC8vIGNvbnN0IG92ZXJhbGxfcGVyY2VudF9kZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG92ZXJhbGwtcGVyY2VudC0ke3BpZV9udW19YClcblxuICAgICAgICAvLyBsZWdlbmRfaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAvLyBzdWJfZGF0YV9kZXRhaWxzLmlubmVySFRNTCA9ICcnXG4gICAgICAgIC8vIHJlbGF0aXZlX3BlcmNlbnRfZGV0YWlscy5pbm5lckhUTUwgPSAnJ1xuICAgICAgICAvLyBsZWdlbmRfdGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAvLyB2YW5pbGxhX3Rvb2x0aXAuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKVxuICAgIH0pXG5cbn1cblxuY29uc3QgbGVnZW5kQ3JlYXRvciA9IChwaWVfbnVtLCBrZXlzLCBuZXdfY29sb3JzKSA9PiB7XG5cbiAgICBsZXQgY29sb3JfY291bnQgPSAwXG4gICAgbGV0IGlkX2NvdW50ID0gMFxuXG4gICAgY29uc3QgbGVnZW5kID0gZDMuc2VsZWN0KFwiI3N1Yi1kYXRhLWxlZ2VuZC1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS1sZWdlbmQtc3ZnLScgKyBwaWVfbnVtKS5hdHRyKCdpZCcsICdzdWItZGF0YS1sZWdlbmQtc3ZnLScgKyBwaWVfbnVtKVxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAvLyAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgKHBhZGRpbmcgKyAxMikgKyAnLCAwKScpO1xuXG4gICAgLy8gbGVnZW5kLnNlbGVjdEFsbCgncmVjdCcpXG4gICAgLy8gICAgIC5kYXRhKGtleXMucmV2ZXJzZSgpKVxuICAgIC8vICAgICAuZW50ZXIoKVxuICAgIC8vICAgICAuaW5zZXJ0KCdyZWN0JykuYXR0cignaWQnLCAoZCwgaSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgLy8gICAgICAgICByZXR1cm4gYGxlZ2VuZC1pdGVtLSR7cGllX251bX0tJHtpZF9jb3VudCsrfWBcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgICAgLy8gLmF0dHIoJ3gnLCAwKS5hdHRyKCd5JywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAvLyAgICAgLy8gICAgIHJldHVybiBpICogMTg7XG4gICAgLy8gICAgIC8vIH0pXG4gICAgLy8gICAgIC5hdHRyKCd4JywgMCkuYXR0cigneScsICcwJylcbiAgICAvLyAgICAgLmF0dHIoJ3dpZHRoJywgMjApLmF0dHIoJ2hlaWdodCcsIDIwKVxuICAgIC8vICAgICAuYXR0cignZmlsbCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gbmV3X2NvbG9ycygrK2NvbG9yX2NvdW50KVxuICAgIC8vICAgICB9KVxuICAgICAgICAvLyAuYXR0cignY2xhc3MnLCAnaGlkZGVuJylcblxuICAgIGlkX2NvdW50ID0gMFxuXG4gICAgbGVnZW5kLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAgIC5kYXRhKGtleXMucmV2ZXJzZSgpKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuaW5zZXJ0KCd0ZXh0JylcbiAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cigneCcsIDE4KS5hdHRyKCd5JywgJzAnKVxuICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnc3RhcnQnKVxuICAgICAgICAuYXR0cignYWxpZ25tZW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnaGlkZGVuJylcbiAgICAgICAgLmF0dHIoJ2lkJywgZCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYGxlZ2VuZC10ZXh0LSR7cGllX251bX0tJHtpZF9jb3VudCsrfWA7XG4gICAgICAgIH0pXG59XG5cbiIsImltcG9ydCB7IHRvb2x0aXBDcmVhdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3N1YmRhdGFfZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHBpZUxlZ2VuZCB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfbGVnZW5kJ1xuaW1wb3J0IHsgc3RhdGVfc2VsZWN0b3IsIFRPUF9MRVZFTCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGF0ZV9zZWxlY3RvcidcbmltcG9ydCB7IGJ1ZGdldENpcmNsZSB9IGZyb20gJy4vY29tcG9uZW50cy9idWRnZXRfY2lyY2xlJ1xuaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2NzcydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIFxuICAgIC8vIFBDRyAtPiBjc3ZQYXRoLCBzZWN0b3IsIGFtb3V0LCBsb2NhdGlvbiwgbXVsdGlwbGllciwgc2tpcFxuICAgIFxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgICAvLyBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHNlbGVjdF8xID0gc3RhdGVfc2VsZWN0b3IoMSlcbiAgICBjb25zdCBzZWxlY3RfMiA9IHN0YXRlX3NlbGVjdG9yKDIpXG4gICAgY29uc3Qgc2VsZWN0b3JfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdG9yLWNvbnRhaW5lclwiKVswXVxuICAgIGNvbnN0IHllYXJTZWxlY3RvciA9IHllYXJTZWxlY3RvclxuXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8xKVxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMilcbiAgICByb290LmFwcGVuZENoaWxkKHVsKVxuXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJBbGFiYW1hXCIsIFRPUF9MRVZFTCwgMSwgXCIuL3NyYy9hc3NldHMvZGF0YS9GWTIwMTgtU1RDLURldGFpbGVkLVRhYmxlLmNzdlwiLCBmYWxzZSlcbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIld5b21pbmdcIiwgVE9QX0xFVkVMLCAyLCBcIi4vc3JjL2Fzc2V0cy9kYXRhL0ZZMjAxOC1TVEMtRGV0YWlsZWQtVGFibGUuY3N2XCIsIGZhbHNlKVxuICAgIC8vIHRvb2x0aXBDcmVhdG9yKDEpXG4gICAgLy8gdG9vbHRpcENyZWF0b3IoMilcbiAgICBcbn0pXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9