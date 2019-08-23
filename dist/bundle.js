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
exports.updateSubData = exports.subData = undefined;

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

        tooltipCreator(pie_num, new_colors, tax_type);

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

var tooltipCreator = function tooltipCreator(pie_num, new_colors, tax_type) {
    // const vanilla_tooltip = document.createElement('p')
    // vanilla_tooltip.classList.add('sub-data-tooltip', `tooltip`, `hidden`)

    // // const over_svg = d3.select('#sub-data-svg-' + pie_num)
    var vanilla_svg = document.getElementById('sub-data-svg-' + pie_num);
    // vanilla_svg.appendChild(vanilla_tooltip)

    vanilla_svg.addEventListener('mouseover', function (e) {
        debugger;
        if (tax_type === "Sales and Gross Receipts Taxes") {
            tax_type = 'Sales Taxes';
        }

        var split_id = e.target.id.split('-');
        // const legend_item = document.getElementById(`legend-item-${split_id[1]}-${split_id[2]}`)
        var legend_text = document.getElementById('legend-text-' + split_id[1] + '-' + split_id[2]);
        var sub_data_details = document.getElementById('data-details-type-' + pie_num);
        var relative_percent_details = document.getElementById('relative-percent-' + pie_num);
        var overall_percent_details = document.getElementById('overall-percent-' + pie_num);

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
    vanilla_svg.addEventListener('mousemove', function (e) {
        // const xPos = e.pageX - (tooltipWidth / 2) // this[0] corresponds to mouse's x pos, and pushing it left by half of the tooltip's width ensure it is centered
        // const yPos = e.pageY - 25 // puts the tooltip up a bit above the cursor
        // vanilla_tooltip.attr("transform", "translate(" + xPos + ',' + yPos + ')')
        // vanilla_tooltip.style.transform = `translate(${xPos}, ${yPos})`
        // vanilla_tooltip.select('text').text(((e.target.height.baseVal.value - e.target.y.baseVal) / height * 100) + ` percent of ` + tax_type) // shows the percent  
        // vanilla_tooltip.innerText = (((e.target.height.baseVal.value - e.target.y.baseVal.value) / height * 100) + ` percent of ` + tax_type) // shows the percent  
    });
    vanilla_svg.addEventListener('mouseout', function (e) {
        var split_id = e.target.id.split('-');
        var legend_item = document.getElementById('legend-item-' + split_id[1] + '-' + split_id[2]);
        var sub_data_details = document.getElementById('data-details-type-' + pie_num);
        var relative_percent_details = document.getElementById('relative-percent-' + pie_num);
        var overall_percent_details = document.getElementById('overall-percent-' + pie_num);

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

    legend.selectAll('rect').data(keys.reverse()).enter().insert('rect').attr('id', function (d, i) {

        return 'legend-item-' + pie_num + '-' + id_count++;
    })
    // .attr('x', 0).attr('y', function (d, i) {
    //     return i * 18;
    // })
    .attr('x', 0).attr('y', '0').attr('width', 20).attr('height', 20).attr('fill', function (d, i) {
        return new_colors(++color_count);
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnVkZ2V0X2NpcmNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9oZWxwZXJfZnVuY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGllX2xlZ2VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdGF0ZV9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdWJfZGF0YV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3ViZGF0YV9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYXBwLnNjc3MiXSwibmFtZXMiOlsiYnVkZ2V0Q2lyY2xlIiwidG90YWwxIiwidG90YWwyIiwidXBkYXRlIiwiTWF0aCIsInNxcnQiLCJjaXJjbGVfY29udGFpbmVyIiwiZDMiLCJzZWxlY3QiLCJoZWlnaHQiLCJ3aWR0aCIsInN2ZzEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYXBwZW5kIiwiYXR0ciIsInN2ZzIiLCJkYXRhIiwicnNjYWxlIiwic2NhbGVMaW5lYXIiLCJkb21haW4iLCJtYXgiLCJyYW5nZSIsImNpcmNsZTEiLCJzZWxlY3RBbGwiLCJjaXJjbGUyIiwiZW50ZXIiLCJkIiwiaSIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsIkxpZ2h0ZW5EYXJrZW5Db2xvciIsImFzc2lnbkJveCIsImFycmF5X29mX29ianMiLCJwaWVfbnVtIiwic2lkZSIsImZvckVhY2giLCJvYmoiLCJrZXkiLCJib3giLCJkZWNpbWFscyIsIlN0cmluZyIsInBlcmNlbnQiLCJzcGxpdCIsImludGVnZXJzIiwic2xpY2VkIiwic2xpY2UiLCJpbm5lckhUTUwiLCJmaW5kQW1vdW50IiwiYW1vdW50Iiwiam9pbiIsInN1YkFycmF5TG9jYXRvciIsInRheF90eXBlIiwiY29udGFpbmVyX2FycmF5IiwiY29sIiwiYW10IiwidXNlUG91bmQiLCJudW0iLCJwYXJzZUludCIsInIiLCJiIiwiZyIsInRvU3RyaW5nIiwicFNCQyIsInAiLCJjMCIsImMxIiwibCIsIlAiLCJmIiwidCIsImgiLCJtIiwicm91bmQiLCJhIiwicFNCQ3IiLCJuIiwibGVuZ3RoIiwieCIsInBhcnNlRmxvYXQiLCJ1bmRlZmluZWQiLCJyZW1vdmUiLCJpZCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInJlbW92ZUNsYXNzIiwicmVtb3ZlX2xpc3QiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwiUGllQ2hhcnRHZW5lcmF0b3IiLCJDT0xPUlMiLCJDSVJDTEVfQ09MT1JTIiwiTEFCRUxTIiwic3RhdGUiLCJjc3YiLCJoMSIsInNwYW4iLCJoMiIsIlRPVEFMIiwiVFlQRVMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJyYWRpdXMiLCJjb2xvcnMiLCJzY2FsZU9yZGluYWwiLCJhcmMiLCJvdXRlclJhZGl1cyIsImlubmVyUmFkaXVzIiwicGllIiwidmFsdWUiLCJzdmciLCJ0aGVuIiwic2FsZXNfdGF4ZXMiLCJsaWNlbnNlX3RheGVzIiwiaW5jb21lX3RheGVzIiwib3RoZXJfdGF4ZXMiLCJwcm9wZXJ0eV90YXhlcyIsIkdlb19OYW1lIiwiaXRlbSIsIkFNT1VOVCIsInRheF9vYmoiLCJUYXhfVHlwZSIsInBlcmNlbnRfb2ZfdG90YWwiLCJwdXNoIiwiaW5jbHVkZXMiLCJ0ZXh0IiwiZm9ybWF0Iiwic3R5bGUiLCJwYXRoIiwiZWFzZSIsImVhc2VMaW5lYXIiLCJhdHRyVHdlZW4iLCJwaWVUd2VlbiIsInN1Yl9kYXRhX3N2ZyIsIm9uIiwiY29uc29sZSIsImxvZyIsInNwYW4xIiwic3BhbjIiLCJpbm5lclRleHQiLCJjYXRjaCIsImVycm9yIiwiaW50ZXJwb2xhdGUiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJwaWVMZWdlbmQiLCJtYXN0ZXJfbGlzdCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJsZWZ0X2xpc3QiLCJ0ZXh0X2xpc3QiLCJyaWdodF9saXN0IiwibGVmdF9ib3giLCJ0ZXh0X2JveCIsInJpZ2h0X2JveCIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyIiwiYXBwZW5kQ2hpbGQiLCJzdWJsaXN0cyIsImxhYmVsIiwibGlzdHMiLCJsZXN0bGlzdCIsInRleHRsaXN0IiwicmlnaHRsaXN0IiwibGVmdEJveCIsInJpZ2h0Qm94IiwibGkiLCJzdWJsaXN0IiwiVE9QX0xFVkVMIiwiU1RBVEVfTkFNRVMiLCJzdGF0ZV9zZWxlY3RvciIsIndyYXBwZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInN0YXRlX2xpc3QiLCJ0b2dnbGUiLCJib2R5IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdGF0ZVNlbGVjdG9yIiwic3RhdGVfbGlzdF9pdGVtIiwic2V0QXR0cmlidXRlIiwic3ViRGF0YUxlZ2VuZCIsImxhYmVscyIsImhlaWdodHMiLCJtYXN0ZXJfc3ViX2RhdGFfbGlzdCIsInBlcmNlbnRfbGlzdCIsImxhYmVsX2xpc3QiLCJjb2xvcl9ib3giLCJ0b29sdGlwV2lkdGgiLCJ0b29sdGlwSGVpZ2h0Iiwic3ViRGF0YSIsImNvbG9yX3N0cmluZyIsInVwZGF0ZVN1YkRhdGEiLCJlbGUiLCJjb2xvckNob29zZXIiLCJzdWJfYXJyYXkiLCJjb2xvcl9jb3VudCIsImlkX2NvdW50IiwidGF4X3N0YWNrIiwia2V5cyIsInN1Yl90YXgiLCJzdGFjayIsIm9yZGVyIiwic3RhY2tPcmRlck5vbmUiLCJvZmZzZXQiLCJzdGFja09mZnNldE5vbmUiLCJ0YXhfc3RhY2tfYXJyYXkiLCJsYXllcnMiLCJ4U2NhbGUiLCJuZXdfY29sb3JzIiwieVNjYWxlIiwic3VtIiwiT2JqZWN0IiwidmFsdWVzIiwicmVjdCIsImxheWVyIiwiZXhpdCIsIm1lcmdlIiwiYmFyIiwidG9vbHRpcENyZWF0b3IiLCJsZWdlbmRDcmVhdG9yIiwidmFuaWxsYV9zdmciLCJzcGxpdF9pZCIsInRhcmdldCIsImxlZ2VuZF90ZXh0Iiwic3ViX2RhdGFfZGV0YWlscyIsInJlbGF0aXZlX3BlcmNlbnRfZGV0YWlscyIsIm92ZXJhbGxfcGVyY2VudF9kZXRhaWxzIiwiaW5kZXgiLCJpbmRleE9mIiwiYm94X2RhdGEiLCJyZWxhdGl2ZV9wZXJjZW50IiwiYmFzZVZhbCIsIm92ZXJhbGxfcGVyY2VudCIsImxlZ2VuZF9pdGVtIiwibGVnZW5kIiwicmV2ZXJzZSIsImluc2VydCIsInJvb3QiLCJ1bCIsInNlbGVjdF8xIiwic2VsZWN0XzIiLCJzZWxlY3Rvcl9jb250YWluZXIiLCJ5ZWFyU2VsZWN0b3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztR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Qm1CLE9BQXRCLFNBQWlDeUssVUFBakM7QUFDSCxLQWJMO0FBY0gsQ0E1Q0QsQzs7Ozs7Ozs7Ozs7Ozs7QUMxTkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEvTCxTQUFTcUssZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07O0FBRWhEOztBQUVBLFFBQU1tRSxPQUFPeE8sU0FBU0MsY0FBVCxDQUF3QixNQUF4QixDQUFiO0FBQ0E7QUFDQSxRQUFNd08sS0FBSyw0QkFBWDtBQUNBLFFBQU1DLFdBQVcsb0NBQWUsQ0FBZixDQUFqQjtBQUNBLFFBQU1DLFdBQVcsb0NBQWUsQ0FBZixDQUFqQjtBQUNBLFFBQU1DLHFCQUFxQjVPLFNBQVMyRSxzQkFBVCxDQUFnQyxvQkFBaEMsRUFBc0QsQ0FBdEQsQ0FBM0I7QUFDQSxRQUFNa0ssZUFBZUEsWUFBckI7O0FBRUFELHVCQUFtQnRGLFdBQW5CLENBQStCb0YsUUFBL0I7QUFDQUUsdUJBQW1CdEYsV0FBbkIsQ0FBK0JxRixRQUEvQjtBQUNBSCxTQUFLbEYsV0FBTCxDQUFpQm1GLEVBQWpCOztBQUVBLGdEQUFrQixTQUFsQixFQUE2QnhFLHlCQUE3QixFQUF3QyxDQUF4QyxFQUEyQyxpREFBM0MsRUFBOEYsS0FBOUY7QUFDQSxnREFBa0IsU0FBbEIsRUFBNkJBLHlCQUE3QixFQUF3QyxDQUF4QyxFQUEyQyxpREFBM0MsRUFBOEYsS0FBOUY7QUFHSCxDQXBCRCxFOzs7Ozs7Ozs7OztBQ1BBLHVDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5cbmV4cG9ydCBjb25zdCBidWRnZXRDaXJjbGUgPSAodG90YWwxLCB0b3RhbDIsIHVwZGF0ZSkgPT4ge1xuICAgIC8vIEkgZ290IGEgbG90IG9mIGhlbHAgZnJvbSBCZW4gR2FvLCBhbiBBcHAgQWNhZGVteSBUQVxuICAgIGRlYnVnZ2VyXG4gICAgaWYgKCF0b3RhbDEgfHwgIXRvdGFsMikge1xuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgdG90YWwxID0gTWF0aC5zcXJ0KHRvdGFsMSlcbiAgICB0b3RhbDIgPSBNYXRoLnNxcnQodG90YWwyKVxuXG4gICAgY29uc3QgY2lyY2xlX2NvbnRhaW5lciA9IGQzLnNlbGVjdCgnI2J1ZGdldC1jaXJjbGUtY29udGFpbmVyJylcblxuICAgIGNvbnN0IGhlaWdodCA9IDMwMFxuICAgIGNvbnN0IHdpZHRoID0gNTAwXG4gICAgXG4gICAgY29uc3Qgc3ZnMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtc3ZnLTEnKSA/IGQzLnNlbGVjdCgnI2NpcmNsZS1zdmctMScpIDogY2lyY2xlX2NvbnRhaW5lci5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJykuYXR0cignaWQnLCAnY2lyY2xlLXN2Zy0xJyk7XG4gICAgY29uc3Qgc3ZnMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtc3ZnLTInKSA/IGQzLnNlbGVjdCgnI2NpcmNsZS1zdmctMicpIDogY2lyY2xlX2NvbnRhaW5lci5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJykuYXR0cignaWQnLCAnY2lyY2xlLXN2Zy0yJyk7XG5cbiAgICBjb25zdCBkYXRhID0gW3RvdGFsMSwgdG90YWwyXVxuICAgIGRlYnVnZ2VyXG5cbiAgICAvLyBjb25zdCBzdmcxID0gY2lyY2xlX2NvbnRhaW5lci5hcHBlbmQoJ3N2ZycpXG4gICAgLy8gICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgLy8gICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJykuYXR0cignaWQnLCAnY2lyY2xlLXN2Zy0xJyk7XG5cbiAgICAvLyBjb25zdCBzdmcyID0gY2lyY2xlX2NvbnRhaW5lci5hcHBlbmQoJ3N2ZycpXG4gICAgLy8gICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpXG4gICAgLy8gICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJykuYXR0cignaWQnLCAnY2lyY2xlLXN2Zy0yJyk7XG5cbiAgICBjb25zdCByc2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oWzAsIChkMy5tYXgoZGF0YSkpXSlcbiAgICAgICAgLnJhbmdlKFsxLCBoZWlnaHQgLyAyXSlcblxuICAgICAgICBkZWJ1Z2dlclxuICAgIGlmICghdXBkYXRlKSB7XG4gICAgICAgIGNvbnN0IGNpcmNsZTEgPSBzdmcxLnNlbGVjdEFsbCgnLmNpcmNsZXMtMScpLmRhdGEoW3RvdGFsMV0pXG4gICAgICAgIGNvbnN0IGNpcmNsZTIgPSBzdmcyLnNlbGVjdEFsbCgnLmNpcmNsZXMtMicpLmRhdGEoW3RvdGFsMl0pXG4gICAgICAgIGNpcmNsZTEuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcnNjYWxlKGQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZXMtMScpLmF0dHIoJ2N5JywgaGVpZ2h0IC8gMilcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIChkLCBpKSA9PiB3aWR0aCAvIDIpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsICcjMGE4MGFlJylcblxuICAgICAgICBjaXJjbGUyLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlcy0yJykuYXR0cignY3knLCBoZWlnaHQgLyAyKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgKGQsIGkpID0+IHdpZHRoIC8gMilcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJyMwYTgwYWUnKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIGQzLnNlbGVjdCgnLmNpcmNsZXMtMScpXG4gICAgICAgIC5kYXRhKFt0b3RhbDFdKVxuICAgICAgICAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIGQzLnNlbGVjdCgnLmNpcmNsZXMtMicpXG4gICAgICAgIC5kYXRhKFt0b3RhbDJdKVxuICAgICAgICAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgfVxuICAgIFxufSIsImltcG9ydCB7IENJUkNMRV9DT0xPUlMgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBhc3NpZ25Cb3ggPSAoYXJyYXlfb2Zfb2JqcywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQtYm94LScgOiAncmlnaHQtYm94LSdcbiAgICBhcnJheV9vZl9vYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGkgPSA0O1xuICAgICAgICBzd2l0Y2ggKG9iai5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAwIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAxIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMiBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAzIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBpKVxuICAgICAgICBjb25zdCBkZWNpbWFscyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVsxXVxuICAgICAgICBjb25zdCBpbnRlZ2VycyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVswXVxuICAgICAgICBjb25zdCBzbGljZWQgPSBvYmoucGVyY2VudCA/IGludGVnZXJzICsgJy4nICsgZGVjaW1hbHMuc2xpY2UoMCwgMikgOiAwXG4gICAgICAgIGJveC5pbm5lckhUTUwgPSBzbGljZWQgKyAnJSdcbiAgICB9KTtcbn1cblxuLy8gZC5BTU9VTlQgPT09ICdYJyA/IDAgOiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMCxcbmV4cG9ydCBjb25zdCBmaW5kQW1vdW50ID0gKGFtb3VudCkgPT4ge1xuICAgIHJldHVybiBhbW91bnQgPT09ICdYJyA/IDAgOiBhbW91bnQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDBcbn1cblxuLy8gZXhwb3J0IGNvbnN0IHN1YkRhdGFQdXNoZXIgPSAoaXRlbSkgPT4ge1xuLy8gICAgIGlmIChpdGVtICE9IFwiVDAwXCIgJiYgaXRlbSAhPSBcIlQwMVwiKSB7XG4vLyAgICAgICAgIHN3aXRjaCAoaXRlbS5zbGljZSgwLCAyKSkge1xuLy8gICAgICAgICAgICAgY2FzZSAoXCJUMFwiIHx8IFwiVDFcIik6XG4vLyAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh7XG4vLyAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbi8vICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbi8vICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICBcbi8vICAgICAgICAgICAgIGNhc2UgXCJUMlwiOlxuLy8gICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh7XG4gICAgXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1cblxuXG5cbmV4cG9ydCBjb25zdCBzdWJBcnJheUxvY2F0b3IgPSAodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSkgPT4geyAgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBmaW5kaW5nIHRoZSByaWdodCBzdWIgYXJyYXkuIEEgYml0IGhhcmQtY29kZWQuXG4gICAgc3dpdGNoICh0YXhfdHlwZSkge1xuICAgICAgICBjYXNlIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzBdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzFdXG4gICAgICAgIGNhc2UgXCJJbmNvbWUgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMl1cbiAgICAgICAgY2FzZSBcIk90aGVyIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzNdXG4gICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVs0XVxuICAgIH1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiB3YXMgdGFrZW4gZnJvbSB1c2VyIFBpbXAgVHJpemtpdHMgcG9zdCBvbiBzdGFja292ZXJmbG93IGF0IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU1NjAyNDgvcHJvZ3JhbW1hdGljYWxseS1saWdodGVuLW9yLWRhcmtlbi1hLWhleC1jb2xvci1vci1yZ2ItYW5kLWJsZW5kLWNvbG9yc1xuZXhwb3J0IGZ1bmN0aW9uIExpZ2h0ZW5EYXJrZW5Db2xvcihjb2wsIGFtdCkge1xuICAgIHZhciB1c2VQb3VuZCA9IGZhbHNlO1xuICAgIGlmIChjb2xbMF0gPT0gXCIjXCIpIHtcbiAgICAgICAgY29sID0gY29sLnNsaWNlKDEpO1xuICAgICAgICB1c2VQb3VuZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIG51bSA9IHBhcnNlSW50KGNvbCwgMTYpO1xuXG4gICAgdmFyIHIgPSAobnVtID4+IDE2KSArIGFtdDtcblxuICAgIGlmIChyID4gMjU1KSByID0gMjU1O1xuICAgIGVsc2UgaWYgKHIgPCAwKSByID0gMDtcblxuICAgIHZhciBiID0gKChudW0gPj4gOCkgJiAweDAwRkYpICsgYW10O1xuXG4gICAgaWYgKGIgPiAyNTUpIGIgPSAyNTU7XG4gICAgZWxzZSBpZiAoYiA8IDApIGIgPSAwO1xuXG4gICAgdmFyIGcgPSAobnVtICYgMHgwMDAwRkYpICsgYW10O1xuXG4gICAgaWYgKGcgPiAyNTUpIGcgPSAyNTU7XG4gICAgZWxzZSBpZiAoZyA8IDApIGcgPSAwO1xuXG4gICAgcmV0dXJuICh1c2VQb3VuZCA/IFwiI1wiIDogXCJcIikgKyAoZyB8IChiIDw8IDgpIHwgKHIgPDwgMTYpKS50b1N0cmluZygxNik7XG59XG4vLyBUaGlzIGZ1bmN0aW9uIHdhcyBhbHNvIHRha2VuIGZyb20gdXNlciBQaW1wIFRyaXpraXRzIHBvc3Qgb24gc3RhY2tvdmVyZmxvdyBhdCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTYwMjQ4L3Byb2dyYW1tYXRpY2FsbHktbGlnaHRlbi1vci1kYXJrZW4tYS1oZXgtY29sb3Itb3ItcmdiLWFuZC1ibGVuZC1jb2xvcnNcbmV4cG9ydCBjb25zdCBwU0JDID0gKHAsIGMwLCBjMSwgbCkgPT4ge1xuICAgIGxldCByLCBnLCBiLCBQLCBmLCB0LCBoLCBpID0gcGFyc2VJbnQsIG0gPSBNYXRoLnJvdW5kLCBhID0gdHlwZW9mIChjMSkgPT0gXCJzdHJpbmdcIjtcbiAgICBpZiAodHlwZW9mIChwKSAhPSBcIm51bWJlclwiIHx8IHAgPCAtMSB8fCBwID4gMSB8fCB0eXBlb2YgKGMwKSAhPSBcInN0cmluZ1wiIHx8IChjMFswXSAhPSAncicgJiYgYzBbMF0gIT0gJyMnKSB8fCAoYzEgJiYgIWEpKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIXRoaXMucFNCQ3IpIHRoaXMucFNCQ3IgPSAoZCkgPT4ge1xuICAgICAgICBsZXQgbiA9IGQubGVuZ3RoLCB4ID0ge307XG4gICAgICAgIGlmIChuID4gOSkge1xuICAgICAgICAgICAgW3IsIGcsIGIsIGFdID0gZCA9IGQuc3BsaXQoXCIsXCIpLCBuID0gZC5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobiA8IDMgfHwgbiA+IDQpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgeC5yID0gaShyWzNdID09IFwiYVwiID8gci5zbGljZSg1KSA6IHIuc2xpY2UoNCkpLCB4LmcgPSBpKGcpLCB4LmIgPSBpKGIpLCB4LmEgPSBhID8gcGFyc2VGbG9hdChhKSA6IC0xXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobiA9PSA4IHx8IG4gPT0gNiB8fCBuIDwgNCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAobiA8IDYpIGQgPSBcIiNcIiArIGRbMV0gKyBkWzFdICsgZFsyXSArIGRbMl0gKyBkWzNdICsgZFszXSArIChuID4gNCA/IGRbNF0gKyBkWzRdIDogXCJcIik7XG4gICAgICAgICAgICBkID0gaShkLnNsaWNlKDEpLCAxNik7XG4gICAgICAgICAgICBpZiAobiA9PSA5IHx8IG4gPT0gNSkgeC5yID0gZCA+PiAyNCAmIDI1NSwgeC5nID0gZCA+PiAxNiAmIDI1NSwgeC5iID0gZCA+PiA4ICYgMjU1LCB4LmEgPSBtKChkICYgMjU1KSAvIDAuMjU1KSAvIDEwMDA7XG4gICAgICAgICAgICBlbHNlIHguciA9IGQgPj4gMTYsIHguZyA9IGQgPj4gOCAmIDI1NSwgeC5iID0gZCAmIDI1NSwgeC5hID0gLTFcbiAgICAgICAgfSByZXR1cm4geFxuICAgIH07XG4gICAgaCA9IGMwLmxlbmd0aCA+IDksIGggPSBhID8gYzEubGVuZ3RoID4gOSA/IHRydWUgOiBjMSA9PSBcImNcIiA/ICFoIDogZmFsc2UgOiBoLCBmID0gcFNCQ3IoYzApLCBQID0gcCA8IDAsIHQgPSBjMSAmJiBjMSAhPSBcImNcIiA/IHBTQkNyKGMxKSA6IFAgPyB7IHI6IDAsIGc6IDAsIGI6IDAsIGE6IC0xIH0gOiB7IHI6IDI1NSwgZzogMjU1LCBiOiAyNTUsIGE6IC0xIH0sIHAgPSBQID8gcCAqIC0xIDogcCwgUCA9IDEgLSBwO1xuICAgIGlmICghZiB8fCAhdCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGwpIHIgPSBtKFAgKiBmLnIgKyBwICogdC5yKSwgZyA9IG0oUCAqIGYuZyArIHAgKiB0LmcpLCBiID0gbShQICogZi5iICsgcCAqIHQuYik7XG4gICAgZWxzZSByID0gbSgoUCAqIGYuciAqKiAyICsgcCAqIHQuciAqKiAyKSAqKiAwLjUpLCBnID0gbSgoUCAqIGYuZyAqKiAyICsgcCAqIHQuZyAqKiAyKSAqKiAwLjUpLCBiID0gbSgoUCAqIGYuYiAqKiAyICsgcCAqIHQuYiAqKiAyKSAqKiAwLjUpO1xuICAgIGEgPSBmLmEsIHQgPSB0LmEsIGYgPSBhID49IDAgfHwgdCA+PSAwLCBhID0gZiA/IGEgPCAwID8gdCA6IHQgPCAwID8gYSA6IGEgKiBQICsgdCAqIHAgOiAwO1xuICAgIGlmIChoKSByZXR1cm4gXCJyZ2JcIiArIChmID8gXCJhKFwiIDogXCIoXCIpICsgciArIFwiLFwiICsgZyArIFwiLFwiICsgYiArIChmID8gXCIsXCIgKyBtKGEgKiAxMDAwKSAvIDEwMDAgOiBcIlwiKSArIFwiKVwiO1xuICAgIGVsc2UgcmV0dXJuIFwiI1wiICsgKDQyOTQ5NjcyOTYgKyByICogMTY3NzcyMTYgKyBnICogNjU1MzYgKyBiICogMjU2ICsgKGYgPyBtKGEgKiAyNTUpIDogMCkpLnRvU3RyaW5nKDE2KS5zbGljZSgxLCBmID8gdW5kZWZpbmVkIDogLTIpXG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoaWQpID0+IHtcbiAgICBjb25zdCByZW1vdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcbiAgICByZW1vdmUgPyByZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUpIDogbnVsbFxufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2xhc3MgPSBjbGFzc05hbWUgPT4ge1xuICAgIGNvbnN0IHJlbW92ZV9saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpXG4gICAgZGVidWdnZXJcbiAgICByZW1vdmVfbGlzdC5sZW5ndGggPyByZW1vdmVfbGlzdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG59IiwiLy8gQSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBiYXNlZCBoZWF2aWx5IG9mZiBvZiBLYXJ0aGlrIFRob3RhJ3MgeW91dHViZSB0dXRvcmlhbCBcIkludHJvZHVjdGlvbiB0byBkMy5qcyA9IFBpZSBDaGFydCBhbmQgRG9udXQgQ2hhcnRcIlxuLy8gVGhlIGxlZ2VuZCBjb2RlIHdhcyBmcm9tIENyeXB0ZXJzIEluZm90ZWNoJ3MgeW91dHViZSB0dXRvcmlhbCBcIlBpZSBDaGFydCB1c2luZyBEMy5qc1wiXG5cbmltcG9ydCB7IGFzc2lnbkJveCwgZmluZEFtb3VudCB9IGZyb20gJy4vaGVscGVyX2Z1bmN0aW9ucydcbmltcG9ydCB7IGJ1ZGdldENpcmNsZSB9IGZyb20gJy4vYnVkZ2V0X2NpcmNsZSdcbmltcG9ydCB7IHN1YkRhdGEsIHVwZGF0ZVN1YkRhdGEgfSBmcm9tICcuL3N1YmRhdGFfZ2VuZXJhdG9yJ1xuLy8gXG5leHBvcnQgY29uc3QgQ09MT1JTID0gW1wiI2E2NzUxZVwiLCBcIiM5YTAwNDdcIiwgXCIjNjZhNTFlXCIsIFwiIzc0NzBiM1wiLCBcIiNlODJiOGFcIl1cbmV4cG9ydCBjb25zdCBDSVJDTEVfQ09MT1JTID0gW0NPTE9SU1sxXSwgQ09MT1JTWzBdLCBDT0xPUlNbNF0sIENPTE9SU1syXSwgQ09MT1JTWzNdXVxuLy8gZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIk90aGVyIFRheGVzXCJdXG5leHBvcnQgY29uc3QgTEFCRUxTID0gW1wiT3RoZXIgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBUYXhlc1wiXVxuLy8gZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKGNzdlBhdGgsIHNlY3RvciwgYW1vdW50LCBzdGF0ZSwgbXVsdGlwbGllciA9IDEsIHNraXAgPSAxKSB7XG5leHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUsIHRheF90eXBlLCBwaWVfbnVtLCBjc3YgPSBcIi4vc3JjL2Fzc2V0cy9kYXRhL0ZZMjAxOC1TVEMtRGV0YWlsZWQtVGFibGUuY3N2XCIsIHVwZGF0ZSA9IHRydWUpIHtcblxuICAgIC8vIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YWxzLVwiICsgcGllX251bSlcbiAgICAvLyByZW1vdmUgPyByZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUpIDogbnVsbFxuICAgIC8vIGNvbnN0IHJlbW92ZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRldGFpbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZTIgPyByZW1vdmUyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlMikgOiBudWxsXG5cbiAgICBjb25zdCBoMSA9IGQzLnNlbGVjdCgnI3RvdGFscy1oZWFkZXItJyArIHBpZV9udW0pXG4gICAgY29uc3Qgc3BhbiA9IGQzLnNlbGVjdCgnI3RvdGFscy1zcGFuLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IGgyID0gZDMuc2VsZWN0KFwiI2RldGFpbHMtXCIgKyBwaWVfbnVtKVxuXG5cbiAgICBsZXQgVE9UQUwgPSAwO1xuICAgIGxldCBUWVBFUyA9IFtdXG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cblxuXG4gICAgY29uc3QgY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKENPTE9SUyk7XG5cbiAgICAvLyBhcmMgZ2VuZXJhdG9yXG4gICAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDEwKVxuICAgICAgICAvLyAuaW5uZXJSYWRpdXMoMCk7IC8vIGZvciBjaXJjbGVcbiAgICAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDEwMCkgLy8gZm9yIGRvbnV0XG5cbiAgICAvLyBjb25zdCBsYWJsZUFyYyA9IGQzLmFyYygpXG4gICAgLy8gICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSA1MClcbiAgICAvLyAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDUwKTtcblxuICAgIC8vIHBpZSBnZW5lcmF0b3JcbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgICAvLyAuc29ydChudWxsKVxuICAgICAgICAudmFsdWUoZCA9PiBkLmFtb3VudCk7XG5cbiAgICAvLyBkZWZpbmUgc3ZnIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIi5waWUtXCIgKyBwaWVfbnVtKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKVxuXG4gICAgLy8gaW1wb3J0IGRhdGFcbiAgICBkMy5jc3YoY3N2KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgYXJyYXlzIHRoYXQgd2lsbCBjb250YWluIHRoZSBzdWIgbGV2ZWwgdGF4IGRhdGFcbiAgICAgICAgbGV0IHNhbGVzX3RheGVzID0gW11cbiAgICAgICAgbGV0IGxpY2Vuc2VfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgaW5jb21lX3RheGVzID0gW11cbiAgICAgICAgbGV0IG90aGVyX3RheGVzID0gW11cbiAgICAgICAgbGV0IHByb3BlcnR5X3RheGVzID0gW11cbiAgICAgICAgLy8gbGV0IHNhbGVzX3RheF9vYmogPSB7IHRheF9ncm91cDogTEFCRUxTWzRdIH1cbiAgICAgICAgLy8gcGFyc2UgdGhlIGNzdlxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9IFwiVDAwXCIpIHsgIC8vIGRvbid0IHdhbnQgdG8gY2F0Y2ggVG90YWwgb3IgUHJvcGVydHkgVGF4ZXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRheF9vYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudF9vZl90b3RhbDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkLml0ZW0uc2xpY2UoMCwyKSkgeyAvLyBmaWxsIHVwIHN1YiBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gPT09IFwiVDA5XCIpIHsgc2FsZXNfdGF4ZXMucHVzaCh0YXhfb2JqKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDFcIikgeyBwcm9wZXJ0eV90YXhlcy5wdXNoKHRheF9vYmopIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzYWxlc190YXhfb2JqW2QuVGF4X1R5cGVdID0gZmluZEFtb3VudChkLkFNT1VOVClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMlwiOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29tZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9ICdUMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUWVBFUy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZC5rZXkgPSBkLlRheF9UeXBlO1xuICAgICAgICAgICAgICAgICAgICBkLmFtb3VudCA9IGZpbmRBbW91bnQoZC5BTU9VTlQpO1xuICAgICAgICAgICAgICAgICAgICBkLnBlcmNlbnQgPSAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWluZXJfYXJyYXkgPSBbXSAgLy8gc2V0dGluZyB1cCBjb250YWluZXIgYXJyYXkgZm9yIHBhc3NpbmcgaW50byBjbGljayBoYW5kbGVyXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChwcm9wZXJ0eV90YXhlcylcblxuICAgICAgICB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkoKVxuICAgICAgICAvLyBzZXQgaDEgYWZ0ZXIgdG90YWwgaGFzIGJlZW4gZGVmaW5lZFxuICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgXCIpXG4gICAgICAgIHNwYW4udGV4dChcIiRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgaDIudGV4dChcIlwiKVxuICAgICAgICAvLyBhdHRlbXB0IGJ1ZGdldENpcmNsZSBjYWxsXG4gICAgICAgIC8vIGJ1ZGdldENpcmNsZShUT1RBTClcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwZXJjZW50YWdlcyBpbiB0aGUgY2VudGVyIGJveFxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgYXJjKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBkID0+IGNvbG9ycyhkLmRhdGEua2V5KSlcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgICAgICAuZHVyYXRpb24oNzUwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbignZCcsIHBpZVR3ZWVuKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHBhdGgub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIC8vIHdoeSBkb2Vzbid0IHRoaXMgd29yaz9cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gICAgICAgICAgICAgLmR1cmF0aW9uKCc1MCcpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIGRldGVybWluZSBob3cgdG8gZmxpcCB0aGUgcGllc1xuICAgICAgICBpZiAocGllX251bSA9PT0gMikgey8vIGZsaXAgdGhlIHNlY29uZCBwaWVcbiAgICAgICAgICAgIGcuYXR0cihcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVgoLTEpIHRyYW5zbGF0ZSgzMDBweCwgMHB4KSBzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgY29uc3Qgc3ViX2RhdGFfc3ZnID0gZDMuc2VsZWN0KCcjc3ViLWRhdGEtZy0nICsgcGllX251bSkuc2VsZWN0QWxsKCcuc3ViLWRhdGEtJyArIHBpZV9udW0pXG4gICAgICAgIGcub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coZClcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oJzUwJylcbiAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsICcuODUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgIC8vIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE4IHdhcyAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICAvLyBoMi50ZXh0KFwiXCIpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2snLCB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSwgdHJ1ZSkpXG4gICAgICAgIC8vIC5vbignY2xpY2snLCB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgc3ViX2RhdGFfc3ZnLCBwaWVfbnVtKSlcbiAgICAgICAgY29uc29sZS5sb2cocGllX251bSlcbiAgICAgICAgY29uc3Qgc3BhbjEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWxzLXNwYW4tMScpXG4gICAgICAgIGNvbnN0IHNwYW4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFscy1zcGFuLTInKVxuXG4gICAgICAgIGlmIChzcGFuMS5pbm5lclRleHRcbiAgICAgICAgICAgICYmIHNwYW4yLmlubmVyVGV4dCkge1xuICAgICAgICAgICAgY29uc3QgdG90YWwxID0gcGFyc2VJbnQoc3BhbjEuaW5uZXJUZXh0LnNsaWNlKDEpLnNwbGl0KCcsJykuam9pbignJykpXG4gICAgICAgICAgICBjb25zdCB0b3RhbDIgPSBwYXJzZUludChzcGFuMi5pbm5lclRleHQuc2xpY2UoMSkuc3BsaXQoJywnKS5qb2luKCcnKSlcbiAgICAgICAgICAgIGJ1ZGdldENpcmNsZSh0b3RhbDEsIHRvdGFsMiwgdXBkYXRlKVxuICAgICAgICB9ICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHsgaWYgKGVycm9yKSB0aHJvdyBlcnJvciB9KVxuICAgIFxuICAgIGNvbnN0IHBpZVR3ZWVuID0gYiA9PiB7XG4gICAgICAgIGIuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZTogMCB9LCBiKVxuICAgICAgICByZXR1cm4gKHQpID0+IHsgcmV0dXJuIGFyYyhpKHQpKSB9XG4gICAgfSAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgICIsImltcG9ydCB7IENJUkNMRV9DT0xPUlMsIExBQkVMU30gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgcGllTGVnZW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IG1hc3Rlcl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgbWFzdGVyX2xpc3QuY2xhc3NMaXN0LmFkZCgnbWFzdGVyLWxpc3QnKVxuXG4gICAgY29uc3QgbGVmdF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHRleHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCByaWdodF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgbGVmdF9saXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnQtbGlzdCcpICBcbiAgICB0ZXh0X2xpc3QuY2xhc3NMaXN0LmFkZCgndGV4dC1saXN0JykgIFxuICAgIHJpZ2h0X2xpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHQtbGlzdCcpIFxuXG4gICAgZm9yIChsZXQgaSA9IExBQkVMUy5sZW5ndGggLSAxIDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxlZnRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCB0ZXh0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgcmlnaHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIGxlZnRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdsZWZ0LWJveCcpXG4gICAgICAgIGxlZnRfYm94LmlkID0gKCdsZWZ0LWJveC0nICsgaSlcbiAgICAgICAgbGVmdF9ib3guc3R5bGUuY29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgcmlnaHRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdyaWdodC1ib3gnKVxuICAgICAgICByaWdodF9ib3guaWQgPSAoJ3JpZ2h0LWJveC0nICsgaSlcbiAgICAgICAgcmlnaHRfYm94LnN0eWxlLmNvbG9yID0gQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIHRleHRfYm94LmNsYXNzTGlzdC5hZGQoJ3RleHQtYm94JylcbiAgICAgICAgdGV4dF9ib3guaW5uZXJIVE1MID0gTEFCRUxTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgXCIgKyBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgbGVmdF9saXN0LmFwcGVuZENoaWxkKGxlZnRfYm94KVxuICAgICAgICB0ZXh0X2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9ib3gpXG4gICAgICAgIHJpZ2h0X2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfYm94KVxuICAgIH1cblxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKGxlZnRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfbGlzdClcbiAgICByZXR1cm4gbWFzdGVyX2xpc3Rcbn1cblxuY29uc3Qgc3VibGlzdHMgPSAobGFiZWwsIGNvbG9yKSA9PiB7XG4gICAgY29uc3QgbGlzdHMgPSBbXVxuXG5cbiAgICBsZXN0bGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0bGlzdCcpXG4gICAgdGV4dGxpc3QuY2xhc3NMaXN0LmFkZCgndGV4dGxpc3QnKVxuICAgIHJpZ2h0bGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodGxpc3QnKVxuXG4gICAgY29uc3QgbGVmdEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCByaWdodEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG5cbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsZWZ0Qm94KVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGkpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChyaWdodEJveClcbiAgICByZXR1cm4gc3VibGlzdFxufSIsImltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgVE9QX0xFVkVMID0gWydUMDAnLCAnVDAxJywgJ1RBMScsICdUQTMnLCAnVEE0JywgJ1RBNSddXG5jb25zdCBTVEFURV9OQU1FUyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggQ2Fyb2xpbmEnLCAnTm9ydGggRGFrb3RhJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ11cblxuLy8gZXhwb3J0IGNvbnN0IHNlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcblxuLy8gICAgIC8vIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpICAvLyByZXZpc2l0IGlmIHRpbWUgdG8gbWFrZSBjdXN0b20gc2VsZWN0XG4vLyAgICAgLy8gY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luaXRpYWwtY29udGFpbmVyJylcblxuLy8gICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIilcbi8vICAgICBzZWxlY3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuXG4vLyAgICAgY29uc3Qgc3RhdGVTZWxlY3RvciA9IGUgPT4ge1xuLy8gICAgICAgICBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4vLyAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbi8vICAgICAgICAgc3ZnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3ZnKVxuLy8gICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgVE9QX0xFVkVMLCBwaWVfbnVtKVxuXG4vLyAgICAgICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gXCItbGVmdFwiIDogXCItcmlnaHRcIlxuLy8gICAgICAgICAvLyBjb25zdCBoMiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzdGF0ZVwiICsgc2lkZSlbMF1cbi8vICAgICAgICAgLy8gaDIuaW5uZXJIVE1MID0gc3RhdGVcbi8vICAgICB9XG5cbi8vICAgICBTVEFURV9OQU1FUy5mb3JFYWNoKHN0YXRlID0+IHtcbi8vICAgICAgICAgY29uc3QgZGVmYXVsdF9zdGF0ZSA9IHBpZV9udW0gPT09IDEgPyBTVEFURV9OQU1FU1swXSA6IFNUQVRFX05BTUVTW1NUQVRFX05BTUVTLmxlbmd0aCAtIDFdXG4vLyAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcbi8vICAgICAgICAgaWYgKHN0YXRlID09PSBkZWZhdWx0X3N0YXRlKSB7XG4vLyAgICAgICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgdHJ1ZSlcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBvcHRpb24uaW5uZXJIVE1MID0gc3RhdGVcbi8vICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHN0YXRlKVxuLy8gICAgICAgICAvLyBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuLy8gICAgICAgICAvLyBvcHRpb24uc2V0QXR0cmlidXRlKFwib25jbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbi8vICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbilcbi8vICAgICB9KVxuLy8gICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHN0YXRlU2VsZWN0b3IpXG4vLyAgICAgLy8gY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdClcbi8vICAgICAvLyByZXR1cm4gY29udGFpbmVyXG4vLyAgICAgcmV0dXJuIHNlbGVjdFxuLy8gfVxuXG4vLyBjb25zdCBwaGFzZU91dCA9IChub2RlKSA9PiB7XG5cbi8vICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbi8vIH1cblxuZXhwb3J0IGNvbnN0IHN0YXRlX3NlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcbiBcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcInNlbGVjdC13cmFwcGVyLVwiICsgcGllX251bSlcbiAgICB3cmFwcGVyLmlkID0gXCJzZWxlY3Qtd3JhcHBlci1cIiArIHBpZV9udW1cblxuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgc2VsZWN0LmlubmVySFRNTCA9IHBpZV9udW0gPT09IDEgPyAnQWxhYmFtYScgOiAnV3lvbWluZydcbiAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwic2VsZWN0LVwiICsgcGllX251bSlcbiAgICBzZWxlY3QuaWQgPSBcInNlbGVjdC1cIiArIHBpZV9udW1cblxuICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgfSlcbiAgICBcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSAgLy8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHNvIHRoYXQgaWYgSSBjbGljayBhbnl3aGVyZSBlbHNlIHRoZSBsaXN0IGRpc2FwcGVhcnNcbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICB9KVxuICAgIFxuICAgIGNvbnN0IHN0YXRlU2VsZWN0b3IgPSBzdGF0ZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdC1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzZWxlY3QuaW5uZXJUZXh0ID0gc3RhdGVcbiAgICAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIHN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZylcbiAgICAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RhdGVfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ3N0YXRlLWxpc3QtJyArIHBpZV9udW0pXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIHN0YXRlX2xpc3QuaWQgPSAnc3RhdGUtbGlzdC0nICsgcGllX251bVxuICAgIFxuICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZV9saXN0X2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmlubmVySFRNTCA9IHN0YXRlXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzdGF0ZSlcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbiAgICAgICAgc3RhdGVfbGlzdC5hcHBlbmRDaGlsZChzdGF0ZV9saXN0X2l0ZW0pXG4gICAgfSlcbiAgICBcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNlbGVjdClcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHN0YXRlX2xpc3QpXG4gICAgXG4gICAgcmV0dXJuIHdyYXBwZXJcbn1cblxuLy8gY29uc3QgcGhhc2VPdXQgPSAobm9kZSkgPT4ge1xuXG4vLyAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4vLyB9IiwiZXhwb3J0IGNvbnN0IHN1YkRhdGFMZWdlbmQgPSAoY29sb3JzLCBsYWJlbHMsIGhlaWdodHMsIHBpZV9udW0pID0+IHtcbiAgICBjb25zdCBtYXN0ZXJfc3ViX2RhdGFfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuICAgIG1hc3Rlcl9zdWJfZGF0YV9saXN0LmNsYXNzTGlzdC5hZGQoJ21hc3Rlci1zdWItZGF0YS1saXN0LScgKyBwaWVfbnVtKVxuICAgIG1hc3Rlcl9zdWJfZGF0YV9saXN0LmlkID0gJ21hc3Rlci1zdWItZGF0YS1saXN0LScgKyBwaWVfbnVtXG5cbiAgICBjb25zdCBwZXJjZW50X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgbGFiZWxfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCBjb2xvcl9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgICBmb3IgKGxldCBpID0gbGFiZWxzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cbiAgICAgICAgLy8gY29uc3QgcmVsYXRpdmVfcGVyY2VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgLy8gY29uc3Qgb3ZlcmFsbF9wZXJjZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgY29sb3JfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIHRleHRfYm94LmNsYXNzTGlzdC5hZGQoJ3N1Yi1kYXRhLWxhYmVsLScgKyBwaWVfbnVtKVxuICAgICAgICB0ZXh0X2JveC5pbm5lckhUTUwgPSBsYWJlbHNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yc1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkIFwiICsgQ0lSQ0xFX0NPTE9SU1tpXVxuICAgIH1cbn0iLCJpbXBvcnQgeyBzdWJBcnJheUxvY2F0b3IsIExpZ2h0ZW5EYXJrZW5Db2xvciwgcmVtb3ZlLCByZW1vdmVDbGFzcyB9IGZyb20gJy4vaGVscGVyX2Z1bmN0aW9ucydcbmltcG9ydCB7IENJUkNMRV9DT0xPUlMsIExBQkVMUyB9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcic7XG5pbXBvcnQgeyBzdWJEYXRhTGVnZW5kIH0gZnJvbSAnLi9zdWJfZGF0YV9sZWdlbmQnXG5cbmNvbnN0IHdpZHRoID0gOTAgIC8vIHNldHRpbmcgdGhlIGRpbWVuc2lvbnMgdG8gY29ycmVzcG9uZCB0byB0aGUgcGllIGNoYXJ0cydcbmNvbnN0IGhlaWdodCA9IDc1MFxuLy8gY29uc3QgaGVpZ2h0ID0gOTAgIC8vIHNldHRpbmcgdGhlIGRpbWVuc2lvbnMgdG8gY29ycmVzcG9uZCB0byB0aGUgcGllIGNoYXJ0cydcbi8vIGNvbnN0IHdpZHRoID0gNTAwXG5cbmNvbnN0IHRvb2x0aXBXaWR0aCA9IDEyMCAvLyB3aWxsIGFsdGVyIHRoZXNlIGFzIG5lZWRlZFxuY29uc3QgdG9vbHRpcEhlaWdodCA9IDQwXG5cbmV4cG9ydCBjb25zdCBzdWJEYXRhID0gKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSwgY29sb3Jfc3RyaW5nID0gXCIjM0Y2RDJBXCIpID0+IHtcbiAgICAvLyBhIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGxlYXJuZWQgZnJvbSBNaWNoYWVsIFN0YW5hbGFuZCdzIFwiU3RhY2tlZCBiYXIgY2hhcnQgd2l0aCB0b29sdGlwc1wiIHR1dG9yaWFsIGF0IGh0dHA6Ly9ibC5vY2tzLm9yZy9tc3RhbmFsYW5kLzYxMDA3MTNcblxuICAgIHJlbW92ZSgnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKVxuICAgIHJlbW92ZSgnc3ViLWRhdGEtbGVnZW5kLXN2Zy0nICsgcGllX251bSlcblxuICAgIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIiNzdWItZGF0YS1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hcHBlbmQoXCJzdmdcIikgXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KS5hdHRyKCdpZCcsICdzdWItZGF0YS1zdmctJyArIHBpZV9udW0pXG4gICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtZy0nICsgcGllX251bSlcbiAgICBjb25zb2xlLmxvZyhzdmcpXG4gICAgdXBkYXRlU3ViRGF0YShjb250YWluZXJfYXJyYXksIHN2ZywgcGllX251bSkobnVsbClcblxufVxuXG5leHBvcnQgY29uc3QgdXBkYXRlU3ViRGF0YSA9IChjb250YWluZXJfYXJyYXksIHBpZV9udW0pID0+IHtcbiAgICBcbiAgICByZXR1cm4gKGVsZSkgPT4ge1xuXG4gICAgICAgIHJlbW92ZSgnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKVxuICAgICAgICByZW1vdmUoJ3N1Yi1kYXRhLWxlZ2VuZC1zdmctJyArIHBpZV9udW0pXG5cblxuICAgICAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIjc3ViLWRhdGEtXCIgKyBwaWVfbnVtKVxuICAgICAgICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCkuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKS5hdHRyKCdpZCcsICdzdWItZGF0YS1zdmctJyArIHBpZV9udW0pXG4gICAgICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLScgKyBwaWVfbnVtKS5hdHRyKCdpZCcsICdzdWItZGF0YS1nLScgKyBwaWVfbnVtKVxuICAgICAgICAgICAgLy8gLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwic2NhbGVZKC0xKVwiKVxuXG5cblxuICAgICAgICBcbiAgICAgICAgY29uc3QgdGF4X3R5cGUgPSBlbGUgPyBlbGUuZGF0YS5rZXkgOiBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiXG4gICAgICAgIGNvbnN0IGNvbG9yX3N0cmluZyA9IGNvbG9yQ2hvb3Nlcih0YXhfdHlwZSlcbiAgICAgICAgY29uc3Qgc3ViX2FycmF5ID0gc3ViQXJyYXlMb2NhdG9yKHRheF90eXBlLCBjb250YWluZXJfYXJyYXkpXG4gICAgICAgIGxldCBjb2xvcl9jb3VudCA9IDBcbiAgICAgICAgbGV0IGlkX2NvdW50ID0gMFxuICAgIFxuICAgICAgICBsZXQgdGF4X3N0YWNrID0ge31cbiAgICAgICAgLy8gc2V0dGluZyB1cCBrZXlzXG4gICAgICAgIGxldCBrZXlzID0gW11cbiAgICAgICAgLy8ga2V5cy5wdXNoKHRheF90eXBlKVxuICAgICAgICBzdWJfYXJyYXkuZm9yRWFjaCgoc3ViX3RheCwgaSkgPT4ge1xuICAgICAgICAgICAga2V5cy5wdXNoKHN1Yl90YXgua2V5KVxuICAgICAgICAgICAgdGF4X3N0YWNrW3N1Yl90YXgua2V5XSA9IHN1Yl90YXgucGVyY2VudF9vZl90b3RhbFxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBkMy5zdGFjaygpXG4gICAgICAgICAgICAua2V5cyhrZXlzKVxuICAgICAgICAgICAgLm9yZGVyKGQzLnN0YWNrT3JkZXJOb25lKVxuICAgICAgICAgICAgLm9mZnNldChkMy5zdGFja09mZnNldE5vbmUpXG4gICAgICAgIGxldCB0YXhfc3RhY2tfYXJyYXkgPSBbXVxuICAgICAgICB0YXhfc3RhY2tfYXJyYXkucHVzaCh0YXhfc3RhY2spXG4gICAgICAgIGNvbnN0IGxheWVycyA9IHN0YWNrKHRheF9zdGFja19hcnJheSlcbiAgICBcbiAgICAgICAgLy8gY29uc3QgeCA9IGQzLnNjYWxlT3JkaW5hbCgpXG4gICAgICAgIC8vICAgICAuZG9tYWluKGxheWVyc1swXS5tYXAoZCA9PiBkLngpKVxuICAgICAgICAvLyAgICAgLy8gLnJhbmdlKFsxMCwgd2lkdGhdLCAwKSAgLy8gbWF5IGJlIGEgcXVpY2tlciB3YXkgdG8gZG8gdGhpcyBhcyB0aGVyZSBpcyBvbmx5IG9uZSBiYXJcbiAgICAgICAgLy8gICAgIC5yYW5nZShbd2lkdGhdKVxuICAgICAgICBjb25zdCB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCAxXSlcbiAgICAgICAgICAgIC5yYW5nZShbMCwgd2lkdGhdKVxuICAgIFxuICAgICAgICAvLyBjb25zdCBjb2xvcnMgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC8vICAgICAuZG9tYWluKFsxLCAxMF0pXG4gICAgICAgIC8vICAgICAucmFuZ2UoW1wicmVkXCIsIFwiYmx1ZVwiXSlcblxuICAgICAgICBjb25zdCBuZXdfY29sb3JzID0gZDMuc2NhbGVMaW5lYXIoKS5kb21haW4oWzAsIGtleXMubGVuZ3RoXSlcbiAgICAgICAgICAgIC5yYW5nZShbXCJ3aGl0ZVwiLCBjb2xvcl9zdHJpbmddKVxuICAgICAgICBcbiAgICAgICAgLy8gY29uc3QgY29sb3JzID0gW2NvbG9yX3N0cmluZ11cbiAgICAgICAgLy8gY29uc3QgZGVjcmVtZW50ID0gMTAwIC8ga2V5cy5sZW5ndGhcbiAgICAgICAgLy8gbGV0IG5leHRfY29sb3IgPSBMaWdodGVuRGFya2VuQ29sb3IoY29sb3Jfc3RyaW5nLCBkZWNyZW1lbnQpXG4gICAgICAgIC8vIHdoaWxlIChjb2xvcnMubGVuZ3RoIDwga2V5cy5sZW5ndGgpIHtcbiAgICAgICAgLy8gICAgIGNvbG9ycy5wdXNoKG5leHRfY29sb3IpXG4gICAgICAgIC8vICAgICBuZXh0X2NvbG9yID0gTGlnaHRlbkRhcmtlbkNvbG9yKG5leHRfY29sb3IsIGRlY3JlbWVudClcbiAgICAgICAgLy8gfSAgICBcbiAgICAgICAgY29uc3QgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbMCwgZDMuc3VtKE9iamVjdC52YWx1ZXModGF4X3N0YWNrKSldKSAgLy8gdGhlIGluY3JlbWVudCB1cCB0byB0aGUgdG90YWxcbiAgICAgICAgICAgIC8vIC5yYW5nZShbaGVpZ2h0LCAwXSlcbiAgICAgICAgICAgIC5yYW5nZShbMCwgaGVpZ2h0XSlcbiAgICBcbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuc3ViLXRheGVzLVwiICsgcGllX251bSkgIC8vIG5vIGcgYXQgdGhpcyBwb2ludCwgYnV0IHRoZXkgd2lsbCBoYXZlIHRoaXMgY2xhc3NcbiAgICAgICAgICAgIC5kYXRhKGxheWVycykuZW50ZXIoKSAgLy8gbm93IHRoZXJlIHdpbGwgYmUgYSBnIGZvciBldmVyeSBiYXIgd2l0aGluIHRoZSBncmFwaC5cbiAgICAgICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3ViLXRheGVzLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIFxuICAgICAgICAvLyAuYXR0cignZmlsbCcsIGQgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICByZXR1cm4gY29sb3JzKGQpfSlcbiAgICBcbiAgICAgICAgY29uc3QgcmVjdCA9IGcuc2VsZWN0QWxsKFwicmVjdFwiKSAgLy8gbWFraW5nIGVhY2ggb2JqIG9mIHRoZSBjb3JyZXNwb25kIHRvIGEgcmVjdCB3aXRoaW4gdGhlIGdcbiAgICAgICAgICAgIC5kYXRhKGxheWVyID0+IGxheWVyKTsgLy8gcHVsbGluZyBvdXQgZWFjaCBpbmRpdmlkdWFsIG9ialxuICAgICAgICAgICAgcmVjdC5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICByZWN0LmVudGVyKCkuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB4U2NhbGUoMCkpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgeFNjYWxlKDEpKSAgLy8gcHJvYmFibHkgY2FuIGhhcmQgY29kZSwgc2luY2Ugb25seSBvbmUgYmFyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBzdGFjay0ke3BpZV9udW19LSR7aWRfY291bnQrK31gXG4gICAgICAgICAgICAgICAgfSkubWVyZ2UocmVjdClcblxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB4U2NhbGUoMCkpICAvLyBwYXNzaW5nIGVhY2ggb2JqJ3MgeCB2YWx1ZSB0byB0aGUgZDMgeCBmdW5jdGlvbiBkZWZpbmVkIGFib3ZlXG4gICAgICAgICAgICAuYXR0cigneScsIGxheWVyID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0IC0geVNjYWxlKGxheWVyWzFdKVxuICAgICAgICAgICAgfSkgIC8vIHkwIGlzIHRoZSBoZWlnaHQgd2hlcmUgZWFjaCBzZWdtZW50IGluIHRoZSBzdGFjayBzdGFydHNcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHhTY2FsZSgxKSkgIC8vIHByb2JhYmx5IGNhbiBoYXJkIGNvZGUsIHNpbmNlIG9ubHkgb25lIGJhclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGJhciA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHlTY2FsZShiYXJbMV0gLSBiYXJbMF0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAoZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdfY29sb3JzKCsrY29sb3JfY291bnQpXG4gICAgICAgICAgICB9KSBcblxuICAgICAgICB0b29sdGlwQ3JlYXRvcihwaWVfbnVtLCBuZXdfY29sb3JzLCB0YXhfdHlwZSlcblxuICAgIGxlZ2VuZENyZWF0b3IocGllX251bSwga2V5cywgbmV3X2NvbG9ycylcbiAgICAvLyBzdWJEYXRhTGVnZW5kKG5ld19jb2xvcnMsIClcblxuICAgIH1cblxufVxuXG5jb25zdCBjb2xvckNob29zZXIgPSAodGF4X3R5cGUpID0+IHtcbiAgICBzd2l0Y2ggKHRheF90eXBlKSB7XG4gICAgICAgIGNhc2UgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzRdXG4gICAgICAgIGNhc2UgJ1Byb3BlcnR5IFRheGVzJzpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzNdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gQ0lSQ0xFX0NPTE9SU1syXVxuICAgICAgICBjYXNlICdJbmNvbWUgVGF4ZXMnOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbMV1cbiAgICAgICAgY2FzZSAnT3RoZXIgVGF4ZXMnOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbMF1cbiAgICB9XG59XG5cbmNvbnN0IHRvb2x0aXBDcmVhdG9yID0gKHBpZV9udW0sIG5ld19jb2xvcnMsIHRheF90eXBlKSA9PiB7XG4gICAgLy8gY29uc3QgdmFuaWxsYV90b29sdGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgLy8gdmFuaWxsYV90b29sdGlwLmNsYXNzTGlzdC5hZGQoJ3N1Yi1kYXRhLXRvb2x0aXAnLCBgdG9vbHRpcGAsIGBoaWRkZW5gKVxuXG4gICAgLy8gLy8gY29uc3Qgb3Zlcl9zdmcgPSBkMy5zZWxlY3QoJyNzdWItZGF0YS1zdmctJyArIHBpZV9udW0pXG4gICAgY29uc3QgdmFuaWxsYV9zdmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKVxuICAgIC8vIHZhbmlsbGFfc3ZnLmFwcGVuZENoaWxkKHZhbmlsbGFfdG9vbHRpcClcblxuICAgIHZhbmlsbGFfc3ZnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIGlmICh0YXhfdHlwZSA9PT0gXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIikge1xuICAgICAgICAgICAgdGF4X3R5cGUgPSAnU2FsZXMgVGF4ZXMnXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzcGxpdF9pZCAgPSBlLnRhcmdldC5pZC5zcGxpdCgnLScpXG4gICAgICAgIC8vIGNvbnN0IGxlZ2VuZF9pdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGxlZ2VuZC1pdGVtLSR7c3BsaXRfaWRbMV19LSR7c3BsaXRfaWRbMl19YClcbiAgICAgICAgY29uc3QgbGVnZW5kX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGVnZW5kLXRleHQtJHtzcGxpdF9pZFsxXX0tJHtzcGxpdF9pZFsyXX1gKVxuICAgICAgICBjb25zdCBzdWJfZGF0YV9kZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGRhdGEtZGV0YWlscy10eXBlLSR7cGllX251bX1gKVxuICAgICAgICBjb25zdCByZWxhdGl2ZV9wZXJjZW50X2RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcmVsYXRpdmUtcGVyY2VudC0ke3BpZV9udW19YClcbiAgICAgICAgY29uc3Qgb3ZlcmFsbF9wZXJjZW50X2RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgb3ZlcmFsbC1wZXJjZW50LSR7cGllX251bX1gKVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2lkZSA9IHBpZV9udW0gPT09IDEgPyAnbGVmdCcgOiAncmlnaHQnXG4gICAgICAgIGNvbnN0IGluZGV4ID0gTEFCRUxTLmluZGV4T2YodGF4X3R5cGUpXG4gICAgICAgIGNvbnN0IGJveF9kYXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2lkZSArIGAtYm94LWAgKyBpbmRleCkuaW5uZXJIVE1MXG5cbiAgICAgICAgbGV0IHJlbGF0aXZlX3BlcmNlbnQgPSAoZS50YXJnZXQuaGVpZ2h0LmJhc2VWYWwudmFsdWUgLyBoZWlnaHQpICogMTAwXG4gICAgICAgIHJlbGF0aXZlX3BlcmNlbnQgPSBNYXRoLnJvdW5kKDEwMCAqIHJlbGF0aXZlX3BlcmNlbnQpIC8gMTAwXG4gICAgICAgIFxuICAgICAgICBsZXQgb3ZlcmFsbF9wZXJjZW50ID0gcGFyc2VGbG9hdChib3hfZGF0YS5zbGljZSgwLCAtMSkpXG4gICAgICAgIG92ZXJhbGxfcGVyY2VudCA9IE1hdGgucm91bmQoMTAwICogb3ZlcmFsbF9wZXJjZW50ICogcmVsYXRpdmVfcGVyY2VudCAvIDEwMCkgLyAxMDBcbiAgICAgICAgLy8gbGV0IG92ZXJhbGxfcGVyY2VudCA9IFxuXG4gICAgICAgIC8vIGxlZ2VuZF9pdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIG92ZXJhbGxfcGVyY2VudF9kZXRhaWxzLmlubmVySFRNTCA9IGBQZXJjZW50IG9mIHRvdGFsIGJ1ZGdldDogYCArIG92ZXJhbGxfcGVyY2VudFxuICAgICAgICByZWxhdGl2ZV9wZXJjZW50X2RldGFpbHMuaW5uZXJIVE1MID0gYFBlcmNlbnQgb2YgY2F0ZWdvcnk6ICR7cmVsYXRpdmVfcGVyY2VudH1gXG4gICAgICAgIHN1Yl9kYXRhX2RldGFpbHMuaW5uZXJIVE1MID0gbGVnZW5kX3RleHQuaW5uZXJIVE1MXG4gICAgICAgIC8vIHZhbmlsbGFfdG9vbHRpcC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgIH0pXG4gICAgdmFuaWxsYV9zdmcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgICAgIC8vIGNvbnN0IHhQb3MgPSBlLnBhZ2VYIC0gKHRvb2x0aXBXaWR0aCAvIDIpIC8vIHRoaXNbMF0gY29ycmVzcG9uZHMgdG8gbW91c2UncyB4IHBvcywgYW5kIHB1c2hpbmcgaXQgbGVmdCBieSBoYWxmIG9mIHRoZSB0b29sdGlwJ3Mgd2lkdGggZW5zdXJlIGl0IGlzIGNlbnRlcmVkXG4gICAgICAgIC8vIGNvbnN0IHlQb3MgPSBlLnBhZ2VZIC0gMjUgLy8gcHV0cyB0aGUgdG9vbHRpcCB1cCBhIGJpdCBhYm92ZSB0aGUgY3Vyc29yXG4gICAgICAgIC8vIHZhbmlsbGFfdG9vbHRpcC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgeFBvcyArICcsJyArIHlQb3MgKyAnKScpXG4gICAgICAgIC8vIHZhbmlsbGFfdG9vbHRpcC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eFBvc30sICR7eVBvc30pYFxuICAgICAgICAvLyB2YW5pbGxhX3Rvb2x0aXAuc2VsZWN0KCd0ZXh0JykudGV4dCgoKGUudGFyZ2V0LmhlaWdodC5iYXNlVmFsLnZhbHVlIC0gZS50YXJnZXQueS5iYXNlVmFsKSAvIGhlaWdodCAqIDEwMCkgKyBgIHBlcmNlbnQgb2YgYCArIHRheF90eXBlKSAvLyBzaG93cyB0aGUgcGVyY2VudCAgXG4gICAgICAgIC8vIHZhbmlsbGFfdG9vbHRpcC5pbm5lclRleHQgPSAoKChlLnRhcmdldC5oZWlnaHQuYmFzZVZhbC52YWx1ZSAtIGUudGFyZ2V0LnkuYmFzZVZhbC52YWx1ZSkgLyBoZWlnaHQgKiAxMDApICsgYCBwZXJjZW50IG9mIGAgKyB0YXhfdHlwZSkgLy8gc2hvd3MgdGhlIHBlcmNlbnQgIFxuICAgIH0pXG4gICAgdmFuaWxsYV9zdmcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBlID0+IHtcbiAgICAgICAgY29uc3Qgc3BsaXRfaWQgPSBlLnRhcmdldC5pZC5zcGxpdCgnLScpXG4gICAgICAgIGNvbnN0IGxlZ2VuZF9pdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGxlZ2VuZC1pdGVtLSR7c3BsaXRfaWRbMV19LSR7c3BsaXRfaWRbMl19YClcbiAgICAgICAgY29uc3Qgc3ViX2RhdGFfZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBkYXRhLWRldGFpbHMtdHlwZS0ke3BpZV9udW19YClcbiAgICAgICAgY29uc3QgcmVsYXRpdmVfcGVyY2VudF9kZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHJlbGF0aXZlLXBlcmNlbnQtJHtwaWVfbnVtfWApXG4gICAgICAgIGNvbnN0IG92ZXJhbGxfcGVyY2VudF9kZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG92ZXJhbGwtcGVyY2VudC0ke3BpZV9udW19YClcblxuICAgICAgICAvLyBsZWdlbmRfaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAvLyBzdWJfZGF0YV9kZXRhaWxzLmlubmVySFRNTCA9ICcnXG4gICAgICAgIC8vIHJlbGF0aXZlX3BlcmNlbnRfZGV0YWlscy5pbm5lckhUTUwgPSAnJ1xuICAgICAgICAvLyBsZWdlbmRfdGV4dC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAvLyB2YW5pbGxhX3Rvb2x0aXAuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKVxuICAgIH0pXG5cbn1cblxuY29uc3QgbGVnZW5kQ3JlYXRvciA9IChwaWVfbnVtLCBrZXlzLCBuZXdfY29sb3JzKSA9PiB7XG5cbiAgICBsZXQgY29sb3JfY291bnQgPSAwXG4gICAgbGV0IGlkX2NvdW50ID0gMFxuXG4gICAgY29uc3QgbGVnZW5kID0gZDMuc2VsZWN0KFwiI3N1Yi1kYXRhLWxlZ2VuZC1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS1sZWdlbmQtc3ZnLScgKyBwaWVfbnVtKS5hdHRyKCdpZCcsICdzdWItZGF0YS1sZWdlbmQtc3ZnLScgKyBwaWVfbnVtKVxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAvLyAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgKHBhZGRpbmcgKyAxMikgKyAnLCAwKScpO1xuXG4gICAgbGVnZW5kLnNlbGVjdEFsbCgncmVjdCcpXG4gICAgICAgIC5kYXRhKGtleXMucmV2ZXJzZSgpKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuaW5zZXJ0KCdyZWN0JykuYXR0cignaWQnLCAoZCwgaSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gYGxlZ2VuZC1pdGVtLSR7cGllX251bX0tJHtpZF9jb3VudCsrfWBcbiAgICAgICAgfSlcbiAgICAgICAgLy8gLmF0dHIoJ3gnLCAwKS5hdHRyKCd5JywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgLy8gICAgIHJldHVybiBpICogMTg7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC5hdHRyKCd4JywgMCkuYXR0cigneScsICcwJylcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgMjApLmF0dHIoJ2hlaWdodCcsIDIwKVxuICAgICAgICAuYXR0cignZmlsbCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3X2NvbG9ycygrK2NvbG9yX2NvdW50KVxuICAgICAgICB9KVxuICAgICAgICAvLyAuYXR0cignY2xhc3MnLCAnaGlkZGVuJylcblxuICAgIGlkX2NvdW50ID0gMFxuXG4gICAgbGVnZW5kLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAgIC5kYXRhKGtleXMucmV2ZXJzZSgpKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuaW5zZXJ0KCd0ZXh0JylcbiAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cigneCcsIDE4KS5hdHRyKCd5JywgJzAnKVxuICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnc3RhcnQnKVxuICAgICAgICAuYXR0cignYWxpZ25tZW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnaGlkZGVuJylcbiAgICAgICAgLmF0dHIoJ2lkJywgZCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYGxlZ2VuZC10ZXh0LSR7cGllX251bX0tJHtpZF9jb3VudCsrfWA7XG4gICAgICAgIH0pXG59XG5cbiIsIlxuaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHBpZUxlZ2VuZCB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfbGVnZW5kJ1xuaW1wb3J0IHsgc3RhdGVfc2VsZWN0b3IsIFRPUF9MRVZFTCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGF0ZV9zZWxlY3RvcidcbmltcG9ydCB7IGJ1ZGdldENpcmNsZSB9IGZyb20gJy4vY29tcG9uZW50cy9idWRnZXRfY2lyY2xlJ1xuaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2NzcydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIFxuICAgIC8vIFBDRyAtPiBjc3ZQYXRoLCBzZWN0b3IsIGFtb3V0LCBsb2NhdGlvbiwgbXVsdGlwbGllciwgc2tpcFxuICAgIFxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgICAvLyBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHNlbGVjdF8xID0gc3RhdGVfc2VsZWN0b3IoMSlcbiAgICBjb25zdCBzZWxlY3RfMiA9IHN0YXRlX3NlbGVjdG9yKDIpXG4gICAgY29uc3Qgc2VsZWN0b3JfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdG9yLWNvbnRhaW5lclwiKVswXVxuICAgIGNvbnN0IHllYXJTZWxlY3RvciA9IHllYXJTZWxlY3RvclxuXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8xKVxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMilcbiAgICByb290LmFwcGVuZENoaWxkKHVsKVxuXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJBbGFiYW1hXCIsIFRPUF9MRVZFTCwgMSwgXCIuL3NyYy9hc3NldHMvZGF0YS9GWTIwMTgtU1RDLURldGFpbGVkLVRhYmxlLmNzdlwiLCBmYWxzZSlcbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIld5b21pbmdcIiwgVE9QX0xFVkVMLCAyLCBcIi4vc3JjL2Fzc2V0cy9kYXRhL0ZZMjAxOC1TVEMtRGV0YWlsZWQtVGFibGUuY3N2XCIsIGZhbHNlKVxuXG4gICAgXG59KVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==