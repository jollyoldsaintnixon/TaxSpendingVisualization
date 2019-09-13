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

    var height = 200;
    var width = 797;

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

    remove_list.length ? remove_list.parentNode.removeChild(remove) : null;
};

var percentify = exports.percentify = function percentify(number) {
    if ((typeof number === 'undefined' ? 'undefined' : _typeof(number)) === String) {
        number = parseFloat(number.split('$')[1]);
    }
    return Math.floor(number * 100) / 100;
};

/***/ }),

/***/ "./src/components/modal.js":
/*!*********************************!*\
  !*** ./src/components/modal.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.wrapper = wrapper;
// class Modal {
//     constructor() {
//     }
function wrapper() {
    var modal_wrapper = document.createElement('div');
    modal_wrapper.classList.add('modal-wrapper');
    modal_wrapper.addEventListener('click', function (e) {
        self = e.currentTarget;
        self.style.display = 'none';
    });
    var form = modal();
    modal_wrapper.appendChild(form);

    return modal_wrapper;
}

function modal() {
    var form = document.createElement('form');
    form.classList.add('modal');

    var title = document.createElement('h1');
    title.innerText = 'How to use this app';

    var sub_title = document.createElement('h2');
    sub_title.innerText = 'Select two states to compare from the blue circles in the top corners of the screen';

    var pie_chart_text = document.createElement('p');
    pie_chart_text.innerText = 'Half of a pie chart will be rendered for each state.  ' + '\xa0 The charts are broken down into colored sections representing the percent that each of five tax categories contributed to that state\'s tax revenue in 2018.' + '\n\n' + 'Click on a section to see how that tax category breaks down on the bar to the outside of the pie chart.  ' + '\xa0 Hovering over the shaded bands on the bar reveals details about the corresponding sub tax category.  ' + '\xa0 Each state renders the sales tax breakdown initially.' + '\n\n' + 'The blue circles represent how the total tax revenue compares between the two states.' + '\n\n' + 'This app represents taxes collected at the state level, therefore some tax categories may comprise a surprising percent of the state\'s tax revenue (such as property tax)';

    var submit = document.createElement('span');
    submit.innerText = 'Got it!';

    form.appendChild(title);
    form.appendChild(sub_title);
    form.appendChild(pie_chart_text);
    form.appendChild(submit);
    return form;
}
// }

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

            path.transition().duration('500').attr('opacity', '.85').attr("cursor", 'pointer');
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
        // 
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

var _modal = __webpack_require__(/*! ./components/modal */ "./src/components/modal.js");

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
    // making this to transform everything down while mainting main's size
    // const overall = document.createElement('section')
    // overall.classList.add('overall')
    // overall.appendChild(ul)

    (0, _pie_chart_generator.PieChartGenerator)("Alabama", _state_selector.TOP_LEVEL, 1, "./src/assets/data/FY2018-STC-Detailed-Table.csv", false);
    (0, _pie_chart_generator.PieChartGenerator)("Wyoming", _state_selector.TOP_LEVEL, 2, "./src/assets/data/FY2018-STC-Detailed-Table.csv", false);
    // tooltipCreator(1)
    // tooltipCreator(2)
    // Make the modal
    var modal = (0, _modal.wrapper)();
    var body = document.getElementsByTagName('body');

    root.appendChild(ul);
    root.appendChild(modal);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnVkZ2V0X2NpcmNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9oZWxwZXJfZnVuY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21vZGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGllX2xlZ2VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdGF0ZV9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zdWJfZGF0YV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3ViZGF0YV9nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYXBwLnNjc3M/ZmY0OCJdLCJuYW1lcyI6WyJidWRnZXRDaXJjbGUiLCJ0b3RhbDEiLCJ0b3RhbDIiLCJ1cGRhdGUiLCJNYXRoIiwic3FydCIsImNpcmNsZV9jb250YWluZXIiLCJkMyIsInNlbGVjdCIsImhlaWdodCIsIndpZHRoIiwic3ZnMSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhcHBlbmQiLCJhdHRyIiwic3ZnMiIsImRhdGEiLCJyc2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsIm1heCIsInJhbmdlIiwiY2lyY2xlMSIsInNlbGVjdEFsbCIsImNpcmNsZTIiLCJlbnRlciIsImQiLCJpIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwiTGlnaHRlbkRhcmtlbkNvbG9yIiwiYXNzaWduQm94IiwiYXJyYXlfb2Zfb2JqcyIsInBpZV9udW0iLCJzaWRlIiwiZm9yRWFjaCIsIm9iaiIsImtleSIsImJveCIsImRlY2ltYWxzIiwiU3RyaW5nIiwicGVyY2VudCIsInNwbGl0IiwiaW50ZWdlcnMiLCJzbGljZWQiLCJzbGljZSIsImlubmVySFRNTCIsImZpbmRBbW91bnQiLCJhbW91bnQiLCJqb2luIiwic3ViQXJyYXlMb2NhdG9yIiwidGF4X3R5cGUiLCJjb250YWluZXJfYXJyYXkiLCJjb2wiLCJhbXQiLCJ1c2VQb3VuZCIsIm51bSIsInBhcnNlSW50IiwiciIsImIiLCJnIiwidG9TdHJpbmciLCJwU0JDIiwicCIsImMwIiwiYzEiLCJsIiwiUCIsImYiLCJ0IiwiaCIsIm0iLCJyb3VuZCIsImEiLCJwU0JDciIsIm4iLCJsZW5ndGgiLCJ4IiwicGFyc2VGbG9hdCIsInVuZGVmaW5lZCIsInJlbW92ZSIsImlkIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwicmVtb3ZlQ2xhc3MiLCJyZW1vdmVfbGlzdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbGFzc05hbWUiLCJwZXJjZW50aWZ5IiwibnVtYmVyIiwiZmxvb3IiLCJ3cmFwcGVyIiwibW9kYWxfd3JhcHBlciIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhZGRFdmVudExpc3RlbmVyIiwic2VsZiIsImUiLCJjdXJyZW50VGFyZ2V0Iiwic3R5bGUiLCJkaXNwbGF5IiwiZm9ybSIsIm1vZGFsIiwiYXBwZW5kQ2hpbGQiLCJ0aXRsZSIsImlubmVyVGV4dCIsInN1Yl90aXRsZSIsInBpZV9jaGFydF90ZXh0Iiwic3VibWl0IiwiUGllQ2hhcnRHZW5lcmF0b3IiLCJDT0xPUlMiLCJDSVJDTEVfQ09MT1JTIiwiTEFCRUxTIiwic3RhdGUiLCJjc3YiLCJoMSIsInNwYW4iLCJoMiIsIlRPVEFMIiwiVFlQRVMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJyYWRpdXMiLCJjb2xvcnMiLCJzY2FsZU9yZGluYWwiLCJhcmMiLCJvdXRlclJhZGl1cyIsImlubmVyUmFkaXVzIiwicGllIiwidmFsdWUiLCJzdmciLCJ0aGVuIiwic2FsZXNfdGF4ZXMiLCJsaWNlbnNlX3RheGVzIiwiaW5jb21lX3RheGVzIiwib3RoZXJfdGF4ZXMiLCJwcm9wZXJ0eV90YXhlcyIsIkdlb19OYW1lIiwiaXRlbSIsIkFNT1VOVCIsInRheF9vYmoiLCJUYXhfVHlwZSIsInBlcmNlbnRfb2ZfdG90YWwiLCJwdXNoIiwiaW5jbHVkZXMiLCJ0ZXh0IiwiZm9ybWF0IiwicGF0aCIsImVhc2UiLCJlYXNlTGluZWFyIiwiYXR0clR3ZWVuIiwicGllVHdlZW4iLCJzdWJfZGF0YV9zdmciLCJvbiIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVDbGljayIsInNwYW4xIiwic3BhbjIiLCJjYXRjaCIsImVycm9yIiwiaW50ZXJwb2xhdGUiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJlbGUiLCJwaWVMZWdlbmQiLCJtYXN0ZXJfbGlzdCIsImxlZnRfbGlzdCIsInRleHRfbGlzdCIsInJpZ2h0X2xpc3QiLCJsZWZ0X2JveCIsInRleHRfYm94IiwicmlnaHRfYm94IiwiYmFja2dyb3VuZCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiYm9yZGVyIiwic3VibGlzdHMiLCJsYWJlbCIsImxpc3RzIiwibGVzdGxpc3QiLCJ0ZXh0bGlzdCIsInJpZ2h0bGlzdCIsImxlZnRCb3giLCJyaWdodEJveCIsImxpIiwic3VibGlzdCIsIlRPUF9MRVZFTCIsIlNUQVRFX05BTUVTIiwic3RhdGVfc2VsZWN0b3IiLCJzdG9wUHJvcGFnYXRpb24iLCJzdGF0ZV9saXN0IiwidG9nZ2xlIiwiYm9keSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3RhdGVTZWxlY3RvciIsInN0YXRlX2xpc3RfaXRlbSIsInNldEF0dHJpYnV0ZSIsInN1YkRhdGFMZWdlbmQiLCJsYWJlbHMiLCJoZWlnaHRzIiwibWFzdGVyX3N1Yl9kYXRhX2xpc3QiLCJwZXJjZW50X2xpc3QiLCJsYWJlbF9saXN0IiwiY29sb3JfYm94IiwidG9vbHRpcFdpZHRoIiwidG9vbHRpcEhlaWdodCIsInVwZGF0ZVN1YkRhdGEiLCJjb2xvcl9zdHJpbmciLCJjb2xvckNob29zZXIiLCJzdWJfYXJyYXkiLCJjb2xvcl9jb3VudCIsImlkX2NvdW50IiwidGF4X3N0YWNrIiwia2V5cyIsInN1Yl90YXgiLCJzdGFjayIsIm9yZGVyIiwic3RhY2tPcmRlck5vbmUiLCJvZmZzZXQiLCJzdGFja09mZnNldE5vbmUiLCJ0YXhfc3RhY2tfYXJyYXkiLCJsYXllcnMiLCJ4U2NhbGUiLCJuZXdfY29sb3JzIiwieVNjYWxlIiwic3VtIiwiT2JqZWN0IiwidmFsdWVzIiwicmVjdCIsImxheWVyIiwiZXhpdCIsIm1lcmdlIiwiYmFyIiwic2V0VGltZW91dCIsInRvb2x0aXBDcmVhdG9yIiwibGVnZW5kQ3JlYXRvciIsInN1Yl9kYXRhX2RldGFpbHMiLCJyZWxhdGl2ZV9wZXJjZW50X2RldGFpbHMiLCJvdmVyYWxsX3BlcmNlbnRfZGV0YWlscyIsImxpc3QiLCJ2YW5pbGxhX3N2ZyIsImluZGV4IiwiaW5kZXhPZiIsInNwbGl0X2lkIiwidGFyZ2V0IiwibGVnZW5kX3RleHQiLCJib3hfZGF0YSIsInJlbGF0aXZlX3BlcmNlbnQiLCJiYXNlVmFsIiwib3ZlcmFsbF9wZXJjZW50IiwibGVnZW5kIiwicmV2ZXJzZSIsImluc2VydCIsInJvb3QiLCJ1bCIsInNlbGVjdF8xIiwic2VsZWN0XzIiLCJzZWxlY3Rvcl9jb250YWluZXIiLCJ5ZWFyU2VsZWN0b3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FB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d0IsTUFBeEIsQ0FBYjtBQUNBO0FBQ0EsUUFBTXVQLEtBQUssNEJBQVg7QUFDQSxRQUFNQyxXQUFXLG9DQUFlLENBQWYsQ0FBakI7QUFDQSxRQUFNQyxXQUFXLG9DQUFlLENBQWYsQ0FBakI7QUFDQSxRQUFNQyxxQkFBcUIzUCxTQUFTMkUsc0JBQVQsQ0FBZ0Msb0JBQWhDLEVBQXNELENBQXRELENBQTNCO0FBQ0EsUUFBTWlMLGVBQWVBLFlBQXJCOztBQUVBRCx1QkFBbUI5SixXQUFuQixDQUErQjRKLFFBQS9CO0FBQ0FFLHVCQUFtQjlKLFdBQW5CLENBQStCNkosUUFBL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnREFBa0IsU0FBbEIsRUFBNkJ0RSx5QkFBN0IsRUFBd0MsQ0FBeEMsRUFBMkMsaURBQTNDLEVBQThGLEtBQTlGO0FBQ0EsZ0RBQWtCLFNBQWxCLEVBQTZCQSx5QkFBN0IsRUFBd0MsQ0FBeEMsRUFBMkMsaURBQTNDLEVBQThGLEtBQTlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTXhGLFFBQVEscUJBQWQ7QUFDQSxRQUFNOEYsT0FBTzFMLFNBQVMyTCxvQkFBVCxDQUE4QixNQUE5QixDQUFiOztBQUVBNEQsU0FBSzFKLFdBQUwsQ0FBaUIySixFQUFqQjtBQUNBRCxTQUFLMUosV0FBTCxDQUFpQkQsS0FBakI7QUFFSCxDQTlCRCxFOzs7Ozs7Ozs7OztBQ1JBLHVDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG5cbmV4cG9ydCBjb25zdCBidWRnZXRDaXJjbGUgPSAodG90YWwxLCB0b3RhbDIsIHVwZGF0ZSkgPT4ge1xuICAgIC8vIEkgZ290IGEgbG90IG9mIGhlbHAgZnJvbSBCZW4gR2FvLCBhbiBBcHAgQWNhZGVteSBUQVxuICAgIGlmICghdG90YWwxIHx8ICF0b3RhbDIpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRvdGFsMSA9IE1hdGguc3FydCh0b3RhbDEpXG4gICAgdG90YWwyID0gTWF0aC5zcXJ0KHRvdGFsMilcblxuICAgIGNvbnN0IGNpcmNsZV9jb250YWluZXIgPSBkMy5zZWxlY3QoJyNidWRnZXQtY2lyY2xlLWNvbnRhaW5lcicpXG5cbiAgICBjb25zdCBoZWlnaHQgPSAyMDBcbiAgICBjb25zdCB3aWR0aCA9IDc5N1xuICAgIFxuICAgIGNvbnN0IHN2ZzEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLXN2Zy0xJykgPyBkMy5zZWxlY3QoJyNjaXJjbGUtc3ZnLTEnKSA6IGNpcmNsZV9jb250YWluZXIuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpLmF0dHIoJ2lkJywgJ2NpcmNsZS1zdmctMScpO1xuICAgIGNvbnN0IHN2ZzIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLXN2Zy0yJykgPyBkMy5zZWxlY3QoJyNjaXJjbGUtc3ZnLTInKSA6IGNpcmNsZV9jb250YWluZXIuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpLmF0dHIoJ2lkJywgJ2NpcmNsZS1zdmctMicpO1xuXG4gICAgY29uc3QgZGF0YSA9IFt0b3RhbDEsIHRvdGFsMl1cblxuICAgIC8vIGNvbnN0IHN2ZzEgPSBjaXJjbGVfY29udGFpbmVyLmFwcGVuZCgnc3ZnJylcbiAgICAvLyAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAvLyAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKS5hdHRyKCdpZCcsICdjaXJjbGUtc3ZnLTEnKTtcblxuICAgIC8vIGNvbnN0IHN2ZzIgPSBjaXJjbGVfY29udGFpbmVyLmFwcGVuZCgnc3ZnJylcbiAgICAvLyAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAvLyAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKS5hdHRyKCdpZCcsICdjaXJjbGUtc3ZnLTInKTtcblxuICAgIGNvbnN0IHJzY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbihbMCwgKGQzLm1heChkYXRhKSldKVxuICAgICAgICAucmFuZ2UoWzEsIGhlaWdodCAvIDJdKVxuXG4gICAgaWYgKCF1cGRhdGUpIHtcbiAgICAgICAgY29uc3QgY2lyY2xlMSA9IHN2ZzEuc2VsZWN0QWxsKCcuY2lyY2xlcy0xJykuZGF0YShbdG90YWwxXSlcbiAgICAgICAgY29uc3QgY2lyY2xlMiA9IHN2ZzIuc2VsZWN0QWxsKCcuY2lyY2xlcy0yJykuZGF0YShbdG90YWwyXSlcbiAgICAgICAgY2lyY2xlMS5lbnRlcigpLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlcy0xJykuYXR0cignY3knLCBoZWlnaHQgLyAyKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgKGQsIGkpID0+IHdpZHRoIC8gMilcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJyMwYTgwYWUnKVxuXG4gICAgICAgIGNpcmNsZTIuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJzY2FsZShkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGVzLTInKS5hdHRyKCdjeScsIGhlaWdodCAvIDIpXG4gICAgICAgICAgICAuYXR0cignY3gnLCAoZCwgaSkgPT4gd2lkdGggLyAyKVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnIzBhODBhZScpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgZDMuc2VsZWN0KCcuY2lyY2xlcy0xJylcbiAgICAgICAgLmRhdGEoW3RvdGFsMV0pXG4gICAgICAgIC50cmFuc2l0aW9uKCkuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJzY2FsZShkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgZDMuc2VsZWN0KCcuY2lyY2xlcy0yJylcbiAgICAgICAgLmRhdGEoW3RvdGFsMl0pXG4gICAgICAgIC50cmFuc2l0aW9uKCkuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbiAoZCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJzY2FsZShkKVxuICAgICAgICAgICAgfSlcbiAgICB9XG4gICAgXG59IiwiaW1wb3J0IHsgQ0lSQ0xFX0NPTE9SUyB9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkJveCA9IChhcnJheV9vZl9vYmpzLCBwaWVfbnVtKSA9PiB7XG4gICAgY29uc3Qgc2lkZSA9IHBpZV9udW0gPT09IDEgPyAnbGVmdC1ib3gtJyA6ICdyaWdodC1ib3gtJ1xuICAgIGFycmF5X29mX29ianMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgaSA9IDQ7XG4gICAgICAgIHN3aXRjaCAob2JqLmtleSkge1xuICAgICAgICAgICAgY2FzZSBcIk90aGVyIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiSW5jb21lIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDEgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTGljZW5zZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAyIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlByb3BlcnR5IFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDMgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2lkZSArIGkpXG4gICAgICAgIGNvbnN0IGRlY2ltYWxzID0gU3RyaW5nKG9iai5wZXJjZW50KS5zcGxpdCgnLicpWzFdXG4gICAgICAgIGNvbnN0IGludGVnZXJzID0gU3RyaW5nKG9iai5wZXJjZW50KS5zcGxpdCgnLicpWzBdXG4gICAgICAgIGNvbnN0IHNsaWNlZCA9IG9iai5wZXJjZW50ID8gaW50ZWdlcnMgKyAnLicgKyBkZWNpbWFscy5zbGljZSgwLCAyKSA6IDBcbiAgICAgICAgYm94LmlubmVySFRNTCA9IHNsaWNlZCArICclJ1xuICAgIH0pO1xufVxuXG4vLyBkLkFNT1VOVCA9PT0gJ1gnID8gMCA6IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwLFxuZXhwb3J0IGNvbnN0IGZpbmRBbW91bnQgPSAoYW1vdW50KSA9PiB7XG4gICAgcmV0dXJuIGFtb3VudCA9PT0gJ1gnID8gMCA6IGFtb3VudC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMFxufVxuXG4vLyBleHBvcnQgY29uc3Qgc3ViRGF0YVB1c2hlciA9IChpdGVtKSA9PiB7XG4vLyAgICAgaWYgKGl0ZW0gIT0gXCJUMDBcIiAmJiBpdGVtICE9IFwiVDAxXCIpIHtcbi8vICAgICAgICAgc3dpdGNoIChpdGVtLnNsaWNlKDAsIDIpKSB7XG4vLyAgICAgICAgICAgICBjYXNlIChcIlQwXCIgfHwgXCJUMVwiKTpcbi8vICAgICAgICAgICAgICAgICBzYWxlc190YXhlcy5wdXNoKHtcbi8vICAgICAgICAgICAgICAgICAgICAga2V5OiBkLlRheF9UeXBlLFxuLy8gICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuLy8gICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoZmluZEFtb3VudChkLkFNT1VOVCkgLyBUT1RBTCkgKiAxMDBcbi8vICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgIFxuLy8gICAgICAgICAgICAgY2FzZSBcIlQyXCI6XG4vLyAgICAgICAgICAgICAgICAgbGljZW5zZV90YXhlcy5wdXNoKHtcbiAgICBcbi8vICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfVxuXG5cblxuZXhwb3J0IGNvbnN0IHN1YkFycmF5TG9jYXRvciA9ICh0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KSA9PiB7ICAvLyBoZWxwZXIgZnVuY3Rpb24gZm9yIGZpbmRpbmcgdGhlIHJpZ2h0IHN1YiBhcnJheS4gQSBiaXQgaGFyZC1jb2RlZC5cbiAgICBzd2l0Y2ggKHRheF90eXBlKSB7XG4gICAgICAgIGNhc2UgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMF1cbiAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMV1cbiAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsyXVxuICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbM11cbiAgICAgICAgY2FzZSBcIlByb3BlcnR5IFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzRdXG4gICAgfVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHdhcyB0YWtlbiBmcm9tIHVzZXIgUGltcCBUcml6a2l0cyBwb3N0IG9uIHN0YWNrb3ZlcmZsb3cgYXQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTU2MDI0OC9wcm9ncmFtbWF0aWNhbGx5LWxpZ2h0ZW4tb3ItZGFya2VuLWEtaGV4LWNvbG9yLW9yLXJnYi1hbmQtYmxlbmQtY29sb3JzXG5leHBvcnQgZnVuY3Rpb24gTGlnaHRlbkRhcmtlbkNvbG9yKGNvbCwgYW10KSB7XG4gICAgdmFyIHVzZVBvdW5kID0gZmFsc2U7XG4gICAgaWYgKGNvbFswXSA9PSBcIiNcIikge1xuICAgICAgICBjb2wgPSBjb2wuc2xpY2UoMSk7XG4gICAgICAgIHVzZVBvdW5kID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgbnVtID0gcGFyc2VJbnQoY29sLCAxNik7XG5cbiAgICB2YXIgciA9IChudW0gPj4gMTYpICsgYW10O1xuXG4gICAgaWYgKHIgPiAyNTUpIHIgPSAyNTU7XG4gICAgZWxzZSBpZiAociA8IDApIHIgPSAwO1xuXG4gICAgdmFyIGIgPSAoKG51bSA+PiA4KSAmIDB4MDBGRikgKyBhbXQ7XG5cbiAgICBpZiAoYiA+IDI1NSkgYiA9IDI1NTtcbiAgICBlbHNlIGlmIChiIDwgMCkgYiA9IDA7XG5cbiAgICB2YXIgZyA9IChudW0gJiAweDAwMDBGRikgKyBhbXQ7XG5cbiAgICBpZiAoZyA+IDI1NSkgZyA9IDI1NTtcbiAgICBlbHNlIGlmIChnIDwgMCkgZyA9IDA7XG5cbiAgICByZXR1cm4gKHVzZVBvdW5kID8gXCIjXCIgOiBcIlwiKSArIChnIHwgKGIgPDwgOCkgfCAociA8PCAxNikpLnRvU3RyaW5nKDE2KTtcbn1cbi8vIFRoaXMgZnVuY3Rpb24gd2FzIGFsc28gdGFrZW4gZnJvbSB1c2VyIFBpbXAgVHJpemtpdHMgcG9zdCBvbiBzdGFja292ZXJmbG93IGF0IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU1NjAyNDgvcHJvZ3JhbW1hdGljYWxseS1saWdodGVuLW9yLWRhcmtlbi1hLWhleC1jb2xvci1vci1yZ2ItYW5kLWJsZW5kLWNvbG9yc1xuZXhwb3J0IGNvbnN0IHBTQkMgPSAocCwgYzAsIGMxLCBsKSA9PiB7XG4gICAgbGV0IHIsIGcsIGIsIFAsIGYsIHQsIGgsIGkgPSBwYXJzZUludCwgbSA9IE1hdGgucm91bmQsIGEgPSB0eXBlb2YgKGMxKSA9PSBcInN0cmluZ1wiO1xuICAgIGlmICh0eXBlb2YgKHApICE9IFwibnVtYmVyXCIgfHwgcCA8IC0xIHx8IHAgPiAxIHx8IHR5cGVvZiAoYzApICE9IFwic3RyaW5nXCIgfHwgKGMwWzBdICE9ICdyJyAmJiBjMFswXSAhPSAnIycpIHx8IChjMSAmJiAhYSkpIHJldHVybiBudWxsO1xuICAgIGlmICghdGhpcy5wU0JDcikgdGhpcy5wU0JDciA9IChkKSA9PiB7XG4gICAgICAgIGxldCBuID0gZC5sZW5ndGgsIHggPSB7fTtcbiAgICAgICAgaWYgKG4gPiA5KSB7XG4gICAgICAgICAgICBbciwgZywgYiwgYV0gPSBkID0gZC5zcGxpdChcIixcIiksIG4gPSBkLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChuIDwgMyB8fCBuID4gNCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB4LnIgPSBpKHJbM10gPT0gXCJhXCIgPyByLnNsaWNlKDUpIDogci5zbGljZSg0KSksIHguZyA9IGkoZyksIHguYiA9IGkoYiksIHguYSA9IGEgPyBwYXJzZUZsb2F0KGEpIDogLTFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChuID09IDggfHwgbiA9PSA2IHx8IG4gPCA0KSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGlmIChuIDwgNikgZCA9IFwiI1wiICsgZFsxXSArIGRbMV0gKyBkWzJdICsgZFsyXSArIGRbM10gKyBkWzNdICsgKG4gPiA0ID8gZFs0XSArIGRbNF0gOiBcIlwiKTtcbiAgICAgICAgICAgIGQgPSBpKGQuc2xpY2UoMSksIDE2KTtcbiAgICAgICAgICAgIGlmIChuID09IDkgfHwgbiA9PSA1KSB4LnIgPSBkID4+IDI0ICYgMjU1LCB4LmcgPSBkID4+IDE2ICYgMjU1LCB4LmIgPSBkID4+IDggJiAyNTUsIHguYSA9IG0oKGQgJiAyNTUpIC8gMC4yNTUpIC8gMTAwMDtcbiAgICAgICAgICAgIGVsc2UgeC5yID0gZCA+PiAxNiwgeC5nID0gZCA+PiA4ICYgMjU1LCB4LmIgPSBkICYgMjU1LCB4LmEgPSAtMVxuICAgICAgICB9IHJldHVybiB4XG4gICAgfTtcbiAgICBoID0gYzAubGVuZ3RoID4gOSwgaCA9IGEgPyBjMS5sZW5ndGggPiA5ID8gdHJ1ZSA6IGMxID09IFwiY1wiID8gIWggOiBmYWxzZSA6IGgsIGYgPSBwU0JDcihjMCksIFAgPSBwIDwgMCwgdCA9IGMxICYmIGMxICE9IFwiY1wiID8gcFNCQ3IoYzEpIDogUCA/IHsgcjogMCwgZzogMCwgYjogMCwgYTogLTEgfSA6IHsgcjogMjU1LCBnOiAyNTUsIGI6IDI1NSwgYTogLTEgfSwgcCA9IFAgPyBwICogLTEgOiBwLCBQID0gMSAtIHA7XG4gICAgaWYgKCFmIHx8ICF0KSByZXR1cm4gbnVsbDtcbiAgICBpZiAobCkgciA9IG0oUCAqIGYuciArIHAgKiB0LnIpLCBnID0gbShQICogZi5nICsgcCAqIHQuZyksIGIgPSBtKFAgKiBmLmIgKyBwICogdC5iKTtcbiAgICBlbHNlIHIgPSBtKChQICogZi5yICoqIDIgKyBwICogdC5yICoqIDIpICoqIDAuNSksIGcgPSBtKChQICogZi5nICoqIDIgKyBwICogdC5nICoqIDIpICoqIDAuNSksIGIgPSBtKChQICogZi5iICoqIDIgKyBwICogdC5iICoqIDIpICoqIDAuNSk7XG4gICAgYSA9IGYuYSwgdCA9IHQuYSwgZiA9IGEgPj0gMCB8fCB0ID49IDAsIGEgPSBmID8gYSA8IDAgPyB0IDogdCA8IDAgPyBhIDogYSAqIFAgKyB0ICogcCA6IDA7XG4gICAgaWYgKGgpIHJldHVybiBcInJnYlwiICsgKGYgPyBcImEoXCIgOiBcIihcIikgKyByICsgXCIsXCIgKyBnICsgXCIsXCIgKyBiICsgKGYgPyBcIixcIiArIG0oYSAqIDEwMDApIC8gMTAwMCA6IFwiXCIpICsgXCIpXCI7XG4gICAgZWxzZSByZXR1cm4gXCIjXCIgKyAoNDI5NDk2NzI5NiArIHIgKiAxNjc3NzIxNiArIGcgKiA2NTUzNiArIGIgKiAyNTYgKyAoZiA/IG0oYSAqIDI1NSkgOiAwKSkudG9TdHJpbmcoMTYpLnNsaWNlKDEsIGYgPyB1bmRlZmluZWQgOiAtMilcbn1cblxuZXhwb3J0IGNvbnN0IHJlbW92ZSA9IChpZCkgPT4ge1xuICAgIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxuICAgIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVDbGFzcyA9IGNsYXNzTmFtZSA9PiB7XG4gICAgY29uc3QgcmVtb3ZlX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlcbiAgICBcbiAgICByZW1vdmVfbGlzdC5sZW5ndGggPyByZW1vdmVfbGlzdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG59XG5cbmV4cG9ydCBjb25zdCBwZXJjZW50aWZ5ID0gbnVtYmVyID0+IHtcbiAgICBpZiAodHlwZW9mIG51bWJlciA9PT0gU3RyaW5nKSB7XG4gICAgICAgIG51bWJlciA9IHBhcnNlRmxvYXQobnVtYmVyLnNwbGl0KCckJylbMV0pXG4gICAgfVxuICAgIHJldHVybiBNYXRoLmZsb29yKG51bWJlciAqIDEwMCkgLyAxMDBcbn0iLCIvLyBjbGFzcyBNb2RhbCB7XG4vLyAgICAgY29uc3RydWN0b3IoKSB7XG4vLyAgICAgfVxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBwZXIoKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsX3dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBtb2RhbF93cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLXdyYXBwZXInKVxuICAgICAgICBtb2RhbF93cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICBzZWxmID0gZS5jdXJyZW50VGFyZ2V0XG4gICAgICAgICAgICBzZWxmLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgZm9ybSA9IG1vZGFsKClcbiAgICAgICAgbW9kYWxfd3JhcHBlci5hcHBlbmRDaGlsZChmb3JtKVxuXG4gICAgICAgIHJldHVybiBtb2RhbF93cmFwcGVyXG4gICAgfVxuXG5mdW5jdGlvbiBtb2RhbCgpIHtcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKVxuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ21vZGFsJylcblxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJylcbiAgICAgICAgdGl0bGUuaW5uZXJUZXh0ID0gJ0hvdyB0byB1c2UgdGhpcyBhcHAnXG5cbiAgICAgICAgY29uc3Qgc3ViX3RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKVxuICAgICAgICBzdWJfdGl0bGUuaW5uZXJUZXh0ID0gJ1NlbGVjdCB0d28gc3RhdGVzIHRvIGNvbXBhcmUgZnJvbSB0aGUgYmx1ZSBjaXJjbGVzIGluIHRoZSB0b3AgY29ybmVycyBvZiB0aGUgc2NyZWVuJ1xuXG4gICAgICAgIGNvbnN0IHBpZV9jaGFydF90ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICAgIHBpZV9jaGFydF90ZXh0LmlubmVyVGV4dCA9ICdIYWxmIG9mIGEgcGllIGNoYXJ0IHdpbGwgYmUgcmVuZGVyZWQgZm9yIGVhY2ggc3RhdGUuICAnICtcbiAgICAgICAgICdcXHhhMCBUaGUgY2hhcnRzIGFyZSBicm9rZW4gZG93biBpbnRvIGNvbG9yZWQgc2VjdGlvbnMgcmVwcmVzZW50aW5nIHRoZSBwZXJjZW50IHRoYXQgZWFjaCBvZiBmaXZlIHRheCBjYXRlZ29yaWVzIGNvbnRyaWJ1dGVkIHRvIHRoYXQgc3RhdGVcXCdzIHRheCByZXZlbnVlIGluIDIwMTguJyArXG4gICAgICAgICAnXFxuXFxuJyArICdDbGljayBvbiBhIHNlY3Rpb24gdG8gc2VlIGhvdyB0aGF0IHRheCBjYXRlZ29yeSBicmVha3MgZG93biBvbiB0aGUgYmFyIHRvIHRoZSBvdXRzaWRlIG9mIHRoZSBwaWUgY2hhcnQuICAnICsgXG4gICAgICAgICAnXFx4YTAgSG92ZXJpbmcgb3ZlciB0aGUgc2hhZGVkIGJhbmRzIG9uIHRoZSBiYXIgcmV2ZWFscyBkZXRhaWxzIGFib3V0IHRoZSBjb3JyZXNwb25kaW5nIHN1YiB0YXggY2F0ZWdvcnkuICAnICsgXG4gICAgICAgICAnXFx4YTAgRWFjaCBzdGF0ZSByZW5kZXJzIHRoZSBzYWxlcyB0YXggYnJlYWtkb3duIGluaXRpYWxseS4nICsgJ1xcblxcbicgK1xuICAgICAgICAgJ1RoZSBibHVlIGNpcmNsZXMgcmVwcmVzZW50IGhvdyB0aGUgdG90YWwgdGF4IHJldmVudWUgY29tcGFyZXMgYmV0d2VlbiB0aGUgdHdvIHN0YXRlcy4nICsnXFxuXFxuJyArXG4gICAgICAgICAnVGhpcyBhcHAgcmVwcmVzZW50cyB0YXhlcyBjb2xsZWN0ZWQgYXQgdGhlIHN0YXRlIGxldmVsLCB0aGVyZWZvcmUgc29tZSB0YXggY2F0ZWdvcmllcyBtYXkgY29tcHJpc2UgYSBzdXJwcmlzaW5nIHBlcmNlbnQgb2YgdGhlIHN0YXRlXFwncyB0YXggcmV2ZW51ZSAoc3VjaCBhcyBwcm9wZXJ0eSB0YXgpJ1xuXG4gICAgICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBzdWJtaXQuaW5uZXJUZXh0ID0gJ0dvdCBpdCEnXG5cbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZCh0aXRsZSlcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChzdWJfdGl0bGUpXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQocGllX2NoYXJ0X3RleHQpXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0KVxuICAgICAgICByZXR1cm4gZm9ybVxuICAgIH1cbi8vIH1cblxuIiwiLy8gQSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBiYXNlZCBoZWF2aWx5IG9mZiBvZiBLYXJ0aGlrIFRob3RhJ3MgeW91dHViZSB0dXRvcmlhbCBcIkludHJvZHVjdGlvbiB0byBkMy5qcyA9IFBpZSBDaGFydCBhbmQgRG9udXQgQ2hhcnRcIlxuLy8gVGhlIGxlZ2VuZCBjb2RlIHdhcyBmcm9tIENyeXB0ZXJzIEluZm90ZWNoJ3MgeW91dHViZSB0dXRvcmlhbCBcIlBpZSBDaGFydCB1c2luZyBEMy5qc1wiXG5cbmltcG9ydCB7IGFzc2lnbkJveCwgZmluZEFtb3VudCB9IGZyb20gJy4vaGVscGVyX2Z1bmN0aW9ucydcbmltcG9ydCB7IGJ1ZGdldENpcmNsZSB9IGZyb20gJy4vYnVkZ2V0X2NpcmNsZSdcbmltcG9ydCB7IHN1YkRhdGEsIHVwZGF0ZVN1YkRhdGEgfSBmcm9tICcuL3N1YmRhdGFfZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgdG9vbHRpcENyZWF0b3IgfSBmcm9tICcuL3N1YmRhdGFfZ2VuZXJhdG9yJ1xuLy8gXG5leHBvcnQgY29uc3QgQ09MT1JTID0gW1wiI2E2NzUxZVwiLCBcIiM5YTAwNDdcIiwgXCIjNjZhNTFlXCIsIFwiI2VlNzczMVwiLCBcIiNlODJiOGFcIl1cbmV4cG9ydCBjb25zdCBDSVJDTEVfQ09MT1JTID0gW0NPTE9SU1sxXSwgQ09MT1JTWzBdLCBDT0xPUlNbNF0sIENPTE9SU1syXSwgQ09MT1JTWzNdXVxuLy8gZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIk90aGVyIFRheGVzXCJdXG5leHBvcnQgY29uc3QgTEFCRUxTID0gW1wiT3RoZXIgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBUYXhlc1wiXVxuLy8gZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKGNzdlBhdGgsIHNlY3RvciwgYW1vdW50LCBzdGF0ZSwgbXVsdGlwbGllciA9IDEsIHNraXAgPSAxKSB7XG5leHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUsIHRheF90eXBlLCBwaWVfbnVtLCBjc3YgPSBcIi4vc3JjL2Fzc2V0cy9kYXRhL0ZZMjAxOC1TVEMtRGV0YWlsZWQtVGFibGUuY3N2XCIsIHVwZGF0ZSA9IHRydWUpIHtcblxuICAgIC8vIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YWxzLVwiICsgcGllX251bSlcbiAgICAvLyByZW1vdmUgPyByZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUpIDogbnVsbFxuICAgIC8vIGNvbnN0IHJlbW92ZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRldGFpbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZTIgPyByZW1vdmUyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlMikgOiBudWxsXG5cbiAgICBjb25zdCBoMSA9IGQzLnNlbGVjdCgnI3RvdGFscy1oZWFkZXItJyArIHBpZV9udW0pXG4gICAgY29uc3Qgc3BhbiA9IGQzLnNlbGVjdCgnI3RvdGFscy1zcGFuLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IGgyID0gZDMuc2VsZWN0KFwiI2RldGFpbHMtXCIgKyBwaWVfbnVtKVxuXG5cbiAgICBsZXQgVE9UQUwgPSAwO1xuICAgIGxldCBUWVBFUyA9IFtdXG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cblxuXG4gICAgY29uc3QgY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKENPTE9SUyk7XG5cbiAgICAvLyBhcmMgZ2VuZXJhdG9yXG4gICAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDEwKVxuICAgICAgICAvLyAuaW5uZXJSYWRpdXMoMCk7IC8vIGZvciBjaXJjbGVcbiAgICAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDEwMCkgLy8gZm9yIGRvbnV0XG5cbiAgICAvLyBjb25zdCBsYWJsZUFyYyA9IGQzLmFyYygpXG4gICAgLy8gICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSA1MClcbiAgICAvLyAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDUwKTtcblxuICAgIC8vIHBpZSBnZW5lcmF0b3JcbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgICAvLyAuc29ydChudWxsKVxuICAgICAgICAudmFsdWUoZCA9PiBkLmFtb3VudCk7XG5cbiAgICAvLyBkZWZpbmUgc3ZnIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIi5waWUtXCIgKyBwaWVfbnVtKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKVxuXG4gICAgLy8gaW1wb3J0IGRhdGFcbiAgICBkMy5jc3YoY3N2KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgYXJyYXlzIHRoYXQgd2lsbCBjb250YWluIHRoZSBzdWIgbGV2ZWwgdGF4IGRhdGFcbiAgICAgICAgbGV0IHNhbGVzX3RheGVzID0gW11cbiAgICAgICAgbGV0IGxpY2Vuc2VfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgaW5jb21lX3RheGVzID0gW11cbiAgICAgICAgbGV0IG90aGVyX3RheGVzID0gW11cbiAgICAgICAgbGV0IHByb3BlcnR5X3RheGVzID0gW11cbiAgICAgICAgLy8gbGV0IHN0YXRlX2J1ZGdldHMgPSB7fVxuICAgICAgICAvLyBsZXQgc2FsZXNfdGF4X29iaiA9IHsgdGF4X2dyb3VwOiBMQUJFTFNbNF0gfVxuICAgICAgICAvLyBwYXJzZSB0aGUgY3N2XG4gICAgICAgIGRhdGEuZm9yRWFjaCgoZCwgaSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZC5HZW9fTmFtZSA9PT0gc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtID09PSBcIlQwMFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIFRPVEFMID0gZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gIT0gXCJUMDBcIikgeyAgLy8gZG9uJ3Qgd2FudCB0byBjYXRjaCBUb3RhbCBvciBQcm9wZXJ0eSBUYXhlc1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGF4X29iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50X29mX3RvdGFsOiAoZmluZEFtb3VudChkLkFNT1VOVCkgLyBUT1RBTCkgKiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGQuaXRlbS5zbGljZSgwLDIpKSB7IC8vIGZpbGwgdXAgc3ViIGFycmF5c1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQwXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDlcIikgeyBzYWxlc190YXhlcy5wdXNoKHRheF9vYmopIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtID09PSBcIlQwMVwiKSB7IHByb3BlcnR5X3RheGVzLnB1c2godGF4X29iaikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNhbGVzX3RheF9vYmpbZC5UYXhfVHlwZV0gPSBmaW5kQW1vdW50KGQuQU1PVU5UKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQxXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQyXCI6IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQ0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jb21lX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUOVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0YXhfdHlwZS5pbmNsdWRlcyhkLml0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gIT0gJ1QwMCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRZUEVTLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnQ6ICgoZmluZEFtb3VudChkLkFNT1VOVCkpIC8gVE9UQUwpICogMTAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkLmtleSA9IGQuVGF4X1R5cGU7XG4gICAgICAgICAgICAgICAgICAgIGQuYW1vdW50ID0gZmluZEFtb3VudChkLkFNT1VOVCk7XG4gICAgICAgICAgICAgICAgICAgIGQucGVyY2VudCA9ICgoZmluZEFtb3VudChkLkFNT1VOVCkpIC8gVE9UQUwpICogMTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcl9hcnJheSA9IFtdICAvLyBzZXR0aW5nIHVwIGNvbnRhaW5lciBhcnJheSBmb3IgcGFzc2luZyBpbnRvIGNsaWNrIGhhbmRsZXJcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2goc2FsZXNfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKGxpY2Vuc2VfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKGluY29tZV90YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2gob3RoZXJfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHByb3BlcnR5X3RheGVzKVxuXG4gICAgICAgIHVwZGF0ZVN1YkRhdGEoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKVxuICAgICAgICAvLyBzZXQgaDEgYWZ0ZXIgdG90YWwgaGFzIGJlZW4gZGVmaW5lZFxuICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgXCIpXG4gICAgICAgIHNwYW4udGV4dChcIiRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgaDIudGV4dChcIlwiKVxuICAgICAgICAvLyBhdHRlbXB0IGJ1ZGdldENpcmNsZSBjYWxsXG4gICAgICAgIC8vIGJ1ZGdldENpcmNsZShUT1RBTClcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwZXJjZW50YWdlcyBpbiB0aGUgY2VudGVyIGJveFxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgYXJjKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBkID0+IGNvbG9ycyhkLmRhdGEua2V5KSlcbiAgICAgICAgXG4gICAgICAgIHBhdGgudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZWFzZShkMy5lYXNlTGluZWFyKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oJ2QnLCBwaWVUd2Vlbik7XG4gICAgICAgIFxuICAgICAgICAvLyBwYXRoLm9uKFwibW91c2VvdmVyXCIsIChkLCBpKSA9PiB7ICAvLyB3aHkgZG9lc24ndCB0aGlzIHdvcms/XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZClcbiAgICAgICAgLy8gICAgICAgICBkMy5zZWxlY3QodGhpcykudHJhbnNpdGlvbigpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5kdXJhdGlvbignNTAnKVxuICAgICAgICAvLyAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsICcuODUnKVxuICAgICAgICAvLyAgICAgICAgICAgICAuYXR0cihcImN1cnNvclwiLCAncG9pbnRlcicpXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyBkZXRlcm1pbmUgaG93IHRvIGZsaXAgdGhlIHBpZXNcbiAgICAgICAgaWYgKHBpZV9udW0gPT09IDIpIHsvLyBmbGlwIHRoZSBzZWNvbmQgcGllXG4gICAgICAgICAgICBnLmF0dHIoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICBnLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwic2NhbGVYKC0xKSB0cmFuc2xhdGUoMzAwcHgsIDBweCkgc2NhbGVZKC0xKVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgIGNvbnN0IHN1Yl9kYXRhX3N2ZyA9IGQzLnNlbGVjdCgnI3N1Yi1kYXRhLWctJyArIHBpZV9udW0pLnNlbGVjdEFsbCgnLnN1Yi1kYXRhLScgKyBwaWVfbnVtKVxuICAgICAgICBwYXRoLm9uKFwibW91c2VvdmVyXCIsIChkLCBpKSA9PiB7ICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpXG4gICAgICAgICAgICBjb25zdCBwYXRoID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHBhdGgudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKCc1MDAnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgJ3BvaW50ZXInKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oXCJtb3VzZW91dFwiLCBlbGUgPT4ge1xuICAgICAgICAgICAgLy8gaDEudGV4dChzdGF0ZSArIFwiJ3MgdGF4IHJldmVudWUgZm9yIDIwMTggd2FzICRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgICAgIC8vIGgyLnRleHQoXCJcIilcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljaycsIGhhbmRsZUNsaWNrKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkpXG4gICAgICAgIC8vIC5vbignY2xpY2snLCB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgc3ViX2RhdGFfc3ZnLCBwaWVfbnVtKSlcbiAgICAgICAgY29uc29sZS5sb2cocGllX251bSlcbiAgICAgICAgY29uc3Qgc3BhbjEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWxzLXNwYW4tMScpXG4gICAgICAgIGNvbnN0IHNwYW4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFscy1zcGFuLTInKVxuXG4gICAgICAgIGlmIChzcGFuMS5pbm5lclRleHRcbiAgICAgICAgICAgICYmIHNwYW4yLmlubmVyVGV4dCkge1xuICAgICAgICAgICAgY29uc3QgdG90YWwxID0gcGFyc2VJbnQoc3BhbjEuaW5uZXJUZXh0LnNsaWNlKDEpLnNwbGl0KCcsJykuam9pbignJykpXG4gICAgICAgICAgICBjb25zdCB0b3RhbDIgPSBwYXJzZUludChzcGFuMi5pbm5lclRleHQuc2xpY2UoMSkuc3BsaXQoJywnKS5qb2luKCcnKSlcbiAgICAgICAgICAgIGJ1ZGdldENpcmNsZSh0b3RhbDEsIHRvdGFsMiwgdXBkYXRlKVxuICAgICAgICB9ICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHsgaWYgKGVycm9yKSB0aHJvdyBlcnJvciB9KVxuICAgIFxuICAgIGNvbnN0IHBpZVR3ZWVuID0gYiA9PiB7XG4gICAgICAgIGIuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZTogMCB9LCBiKVxuICAgICAgICByZXR1cm4gKHQpID0+IHsgcmV0dXJuIGFyYyhpKHQpKSB9XG4gICAgfSAgICBcbn1cblxuY29uc3QgaGFuZGxlQ2xpY2sgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSA9PiB7XG4gICAgcmV0dXJuIGVsZSA9PiB7XG4gICAgICAgIFxuICAgICAgICB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSwgZWxlKVxuICAgICAgICB0b29sdGlwQ3JlYXRvcihwaWVfbnVtLCBlbGUuZGF0YS5UYXhfVHlwZSwgZWxlLmRhdGEucGVyY2VudClcbiAgICB9XG59XG4gICAgICAgICIsImltcG9ydCB7IENJUkNMRV9DT0xPUlMsIExBQkVMU30gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgdXBkYXRlU3ViRGF0YSB9IGZyb20gJy4vc3ViZGF0YV9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBwaWVMZWdlbmQgPSAoKSA9PiB7XG4gICAgY29uc3QgbWFzdGVyX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcbiAgICBtYXN0ZXJfbGlzdC5jbGFzc0xpc3QuYWRkKCdtYXN0ZXItbGlzdCcpXG5cbiAgICBjb25zdCBsZWZ0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgdGV4dF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHJpZ2h0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgICBsZWZ0X2xpc3QuY2xhc3NMaXN0LmFkZCgnbGVmdC1saXN0JykgIFxuICAgIHRleHRfbGlzdC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWxpc3QnKSAgXG4gICAgcmlnaHRfbGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodC1saXN0JykgXG5cbiAgICBmb3IgKGxldCBpID0gTEFCRUxTLmxlbmd0aCAtIDEgOyBpID49IDA7IGktLSkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbGVmdF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IHRleHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCByaWdodF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgbGVmdF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ2xlZnQtYm94JylcbiAgICAgICAgbGVmdF9ib3guaWQgPSAoJ2xlZnQtYm94LScgKyBpKVxuICAgICAgICBsZWZ0X2JveC5zdHlsZS5iYWNrZ3JvdW5kID0gQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIHJpZ2h0X2JveC5jbGFzc0xpc3QuYWRkKCdib3gnLCAncmlnaHQtYm94JylcbiAgICAgICAgcmlnaHRfYm94LmlkID0gKCdyaWdodC1ib3gtJyArIGkpXG4gICAgICAgIHJpZ2h0X2JveC5zdHlsZS5iYWNrZ3JvdW5kID0gQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIHRleHRfYm94LmNsYXNzTGlzdC5hZGQoJ3RleHQtYm94JylcbiAgICAgICAgdGV4dF9ib3guaW5uZXJIVE1MID0gTEFCRUxTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgXCIgKyBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgbGVmdF9saXN0LmFwcGVuZENoaWxkKGxlZnRfYm94KVxuICAgICAgICB0ZXh0X2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9ib3gpXG4gICAgICAgIHJpZ2h0X2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfYm94KVxuICAgIH1cblxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKGxlZnRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfbGlzdClcbiAgICByZXR1cm4gbWFzdGVyX2xpc3Rcbn1cblxuY29uc3Qgc3VibGlzdHMgPSAobGFiZWwsIGNvbG9yKSA9PiB7XG4gICAgY29uc3QgbGlzdHMgPSBbXVxuXG5cbiAgICBsZXN0bGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0bGlzdCcpXG4gICAgdGV4dGxpc3QuY2xhc3NMaXN0LmFkZCgndGV4dGxpc3QnKVxuICAgIHJpZ2h0bGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodGxpc3QnKVxuXG4gICAgY29uc3QgbGVmdEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCByaWdodEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG5cbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsZWZ0Qm94KVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGkpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChyaWdodEJveClcbiAgICByZXR1cm4gc3VibGlzdFxufVxuXG4iLCJpbXBvcnQgeyBQaWVDaGFydEdlbmVyYXRvciB9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHRvb2x0aXBDcmVhdG9yIH0gZnJvbSAnLi9zdWJkYXRhX2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IFRPUF9MRVZFTCA9IFsnVDAwJywgJ1QwMScsICdUQTEnLCAnVEEzJywgJ1RBNCcsICdUQTUnXVxuY29uc3QgU1RBVEVfTkFNRVMgPSBbJ0FsYWJhbWEnLCAnQWxhc2thJywgJ0FyaXpvbmEnLCAnQXJrYW5zYXMnLCAnQ2FsaWZvcm5pYScsICdDb2xvcmFkbycsICdDb25uZWN0aWN1dCcsICdEZWxhd2FyZScsICdGbG9yaWRhJywgJ0dlb3JnaWEnLCAnSGF3YWlpJywgJ0lkYWhvJywgJ0lsbGlub2lzJywgJ0luZGlhbmEnLCAnSW93YScsICdLYW5zYXMnLCAnS2VudHVja3knLCAnTG91aXNpYW5hJywgJ01haW5lJywgJ01hcnlsYW5kJywgJ01hc3NhY2h1c2V0dHMnLCAnTWljaGlnYW4nLCAnTWlubmVzb3RhJywgJ01pc3Npc3NpcHBpJywgJ01pc3NvdXJpJywgJ01vbnRhbmEnLCAnTmVicmFza2EnLCAnTmV2YWRhJywgJ05ldyBIYW1wc2hpcmUnLCAnTmV3IEplcnNleScsICdOZXcgTWV4aWNvJywgJ05ldyBZb3JrJywgJ05vcnRoIENhcm9saW5hJywgJ05vcnRoIERha290YScsICdPaGlvJywgJ09rbGFob21hJywgJ09yZWdvbicsICdQZW5uc3lsdmFuaWEnLCAnUmhvZGUgSXNsYW5kJywgJ1NvdXRoIENhcm9saW5hJywgJ1NvdXRoIERha290YScsICdUZW5uZXNzZWUnLCAnVGV4YXMnLCAnVXRhaCcsICdWZXJtb250JywgJ1ZpcmdpbmlhJywgJ1dhc2hpbmd0b24nLCAnV2VzdCBWaXJnaW5pYScsICdXaXNjb25zaW4nLCAnV3lvbWluZyddXG5cbmV4cG9ydCBjb25zdCBzdGF0ZV9zZWxlY3RvciA9IChwaWVfbnVtKSA9PiB7XG4gXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJzZWxlY3Qtd3JhcHBlci1cIiArIHBpZV9udW0pXG4gICAgd3JhcHBlci5pZCA9IFwic2VsZWN0LXdyYXBwZXItXCIgKyBwaWVfbnVtXG5cbiAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAgIHNlbGVjdC5pbm5lckhUTUwgPSBwaWVfbnVtID09PSAxID8gJ0FsYWJhbWEnIDogJ1d5b21pbmcnXG4gICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcInNlbGVjdC1cIiArIHBpZV9udW0pXG4gICAgc2VsZWN0LmlkID0gXCJzZWxlY3QtXCIgKyBwaWVfbnVtXG5cbiAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKVxuICAgIH0pXG4gICAgXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0gIC8vIGFkZCBhbiBldmVudCBsaXN0ZW5lciBzbyB0aGF0IGlmIEkgY2xpY2sgYW55d2hlcmUgZWxzZSB0aGUgbGlzdCBkaXNhcHBlYXJzXG4gICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgfSlcbiAgICBcbiAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gc3RhdGUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGUgPT4ge1xuICAgICAgICAgICAgLy8gY29uc3Qgc3RhdGUgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuICAgICAgICAgICAgc2VsZWN0LmlubmVyVGV4dCA9IHN0YXRlXG4gICAgICAgICAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4gICAgICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgVE9QX0xFVkVMLCBwaWVfbnVtKVxuICAgICAgICAgICAgLy8gdG9vbHRpcENyZWF0b3IocGllX251bSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBzdGF0ZV9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnc3RhdGUtbGlzdC0nICsgcGllX251bSlcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgc3RhdGVfbGlzdC5pZCA9ICdzdGF0ZS1saXN0LScgKyBwaWVfbnVtXG4gICAgXG4gICAgU1RBVEVfTkFNRVMuZm9yRWFjaChzdGF0ZSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlX2xpc3RfaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uaW5uZXJIVE1MID0gc3RhdGVcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHN0YXRlKVxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuICAgICAgICBzdGF0ZV9saXN0LmFwcGVuZENoaWxkKHN0YXRlX2xpc3RfaXRlbSlcbiAgICB9KVxuICAgIFxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KVxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc3RhdGVfbGlzdClcbiAgICBcbiAgICByZXR1cm4gd3JhcHBlclxufVxuXG4vLyBjb25zdCBwaGFzZU91dCA9IChub2RlKSA9PiB7XG5cbi8vICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbi8vIH0iLCJleHBvcnQgY29uc3Qgc3ViRGF0YUxlZ2VuZCA9IChjb2xvcnMsIGxhYmVscywgaGVpZ2h0cywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IG1hc3Rlcl9zdWJfZGF0YV9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgbWFzdGVyX3N1Yl9kYXRhX2xpc3QuY2xhc3NMaXN0LmFkZCgnbWFzdGVyLXN1Yi1kYXRhLWxpc3QtJyArIHBpZV9udW0pXG4gICAgbWFzdGVyX3N1Yl9kYXRhX2xpc3QuaWQgPSAnbWFzdGVyLXN1Yi1kYXRhLWxpc3QtJyArIHBpZV9udW1cblxuICAgIGNvbnN0IHBlcmNlbnRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCBsYWJlbF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IGNvbG9yX2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgIGZvciAobGV0IGkgPSBsYWJlbHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblxuICAgICAgICAvLyBjb25zdCByZWxhdGl2ZV9wZXJjZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAvLyBjb25zdCBvdmVyYWxsX3BlcmNlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCBjb2xvcl9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgdGV4dF9ib3guY2xhc3NMaXN0LmFkZCgnc3ViLWRhdGEtbGFiZWwtJyArIHBpZV9udW0pXG4gICAgICAgIHRleHRfYm94LmlubmVySFRNTCA9IGxhYmVsc1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JzW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgXCIgKyBDSVJDTEVfQ09MT1JTW2ldXG4gICAgfVxufSIsImltcG9ydCB7IHN1YkFycmF5TG9jYXRvciwgcGVyY2VudGlmeSwgTGlnaHRlbkRhcmtlbkNvbG9yLCByZW1vdmUsIHJlbW92ZUNsYXNzIH0gZnJvbSAnLi9oZWxwZXJfZnVuY3Rpb25zJ1xuaW1wb3J0IHsgQ0lSQ0xFX0NPTE9SUywgTEFCRUxTIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJztcbmltcG9ydCB7IHN1YkRhdGFMZWdlbmQgfSBmcm9tICcuL3N1Yl9kYXRhX2xlZ2VuZCdcblxuY29uc3Qgd2lkdGggPSA5MCAgLy8gc2V0dGluZyB0aGUgZGltZW5zaW9ucyB0byBjb3JyZXNwb25kIHRvIHRoZSBwaWUgY2hhcnRzJ1xuY29uc3QgaGVpZ2h0ID0gNzUwXG4vLyBjb25zdCBoZWlnaHQgPSA5MCAgLy8gc2V0dGluZyB0aGUgZGltZW5zaW9ucyB0byBjb3JyZXNwb25kIHRvIHRoZSBwaWUgY2hhcnRzJ1xuLy8gY29uc3Qgd2lkdGggPSA1MDBcblxuY29uc3QgdG9vbHRpcFdpZHRoID0gMTIwIC8vIHdpbGwgYWx0ZXIgdGhlc2UgYXMgbmVlZGVkXG5jb25zdCB0b29sdGlwSGVpZ2h0ID0gNDBcblxuLy8gZXhwb3J0IGNvbnN0IHN1YkRhdGEgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtLCBjb2xvcl9zdHJpbmcgPSBcIiMzRjZEMkFcIikgPT4ge1xuLy8gICAgIC8vIGEgbG90IG9mIHRoaXMgY29kZSB3YXMgbGVhcm5lZCBmcm9tIE1pY2hhZWwgU3RhbmFsYW5kJ3MgXCJTdGFja2VkIGJhciBjaGFydCB3aXRoIHRvb2x0aXBzXCIgdHV0b3JpYWwgYXQgaHR0cDovL2JsLm9ja3Mub3JnL21zdGFuYWxhbmQvNjEwMDcxM1xuXG4vLyAgICAgcmVtb3ZlKCdzdWItZGF0YS1zdmctJyArIHBpZV9udW0pXG4vLyAgICAgcmVtb3ZlKCdzdWItZGF0YS1sZWdlbmQtc3ZnLScgKyBwaWVfbnVtKVxuXG4gICAgXG4vLyAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiI3N1Yi1kYXRhLVwiICsgcGllX251bSlcbi8vICAgICAgICAgLmFwcGVuZChcInN2Z1wiKSBcbi8vICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCkuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpLmF0dHIoJ2lkJywgJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcbi8vICAgICAgICAgLmFwcGVuZChcImdcIilcbi8vICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLScgKyBwaWVfbnVtKS5hdHRyKCdpZCcsICdzdWItZGF0YS1nLScgKyBwaWVfbnVtKVxuLy8gICAgIGNvbnNvbGUubG9nKHN2Zylcbi8vICAgICB1cGRhdGVTdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgc3ZnLCBwaWVfbnVtKShudWxsKVxuLy8gfVxuXG5cbmV4cG9ydCBjb25zdCB1cGRhdGVTdWJEYXRhID0gKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSwgZWxlKSA9PiB7XG4gICAgXG4gICAgLy8gcmV0dXJuIChlbGUpID0+IHtcblxuICAgICAgICByZW1vdmUoJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSlcbiAgICAgICAgcmVtb3ZlKCdzdWItZGF0YS1sZWdlbmQtc3ZnLScgKyBwaWVfbnVtKVxuXG5cbiAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiI3N1Yi1kYXRhLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLXN2Zy0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtc3ZnLScgKyBwaWVfbnVtKVxuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtZy0nICsgcGllX251bSlcbiAgICAgICAgICAgIC8vIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIilcblxuXG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YXhfdHlwZSA9IGVsZSA/IGVsZS5kYXRhLmtleSA6IFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCJcbiAgICAgICAgY29uc3QgY29sb3Jfc3RyaW5nID0gY29sb3JDaG9vc2VyKHRheF90eXBlKVxuICAgICAgICBjb25zdCBzdWJfYXJyYXkgPSBzdWJBcnJheUxvY2F0b3IodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSlcbiAgICAgICAgbGV0IGNvbG9yX2NvdW50ID0gMFxuICAgICAgICBsZXQgaWRfY291bnQgPSAwXG4gICAgXG4gICAgICAgIGxldCB0YXhfc3RhY2sgPSB7fVxuICAgICAgICAvLyBzZXR0aW5nIHVwIGtleXNcbiAgICAgICAgbGV0IGtleXMgPSBbXVxuICAgICAgICAvLyBrZXlzLnB1c2godGF4X3R5cGUpXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKChzdWJfdGF4LCBpKSA9PiB7XG4gICAgICAgICAgICBrZXlzLnB1c2goc3ViX3RheC5rZXkpXG4gICAgICAgICAgICB0YXhfc3RhY2tbc3ViX3RheC5rZXldID0gc3ViX3RheC5wZXJjZW50X29mX3RvdGFsXG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBjb25zdCBzdGFjayA9IGQzLnN0YWNrKClcbiAgICAgICAgICAgIC5rZXlzKGtleXMpXG4gICAgICAgICAgICAub3JkZXIoZDMuc3RhY2tPcmRlck5vbmUpXG4gICAgICAgICAgICAub2Zmc2V0KGQzLnN0YWNrT2Zmc2V0Tm9uZSlcbiAgICAgICAgbGV0IHRheF9zdGFja19hcnJheSA9IFtdXG4gICAgICAgIHRheF9zdGFja19hcnJheS5wdXNoKHRheF9zdGFjaylcbiAgICAgICAgY29uc3QgbGF5ZXJzID0gc3RhY2sodGF4X3N0YWNrX2FycmF5KVxuICAgIFxuICAgICAgICBjb25zdCB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCAxXSlcbiAgICAgICAgICAgIC5yYW5nZShbMCwgd2lkdGhdKVxuXG4gICAgICAgIGNvbnN0IG5ld19jb2xvcnMgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbMCwga2V5cy5sZW5ndGhdKVxuICAgICAgICAgICAgLnJhbmdlKFtcIndoaXRlXCIsIGNvbG9yX3N0cmluZ10pXG5cbiAgICAgICAgY29uc3QgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbMCwgZDMuc3VtKE9iamVjdC52YWx1ZXModGF4X3N0YWNrKSldKSAgLy8gdGhlIGluY3JlbWVudCB1cCB0byB0aGUgdG90YWxcbiAgICAgICAgICAgIC8vIC5yYW5nZShbaGVpZ2h0LCAwXSlcbiAgICAgICAgICAgIC5yYW5nZShbMCwgaGVpZ2h0XSlcbiAgICBcbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuc3ViLXRheGVzLVwiICsgcGllX251bSkgIC8vIG5vIGcgYXQgdGhpcyBwb2ludCwgYnV0IHRoZXkgd2lsbCBoYXZlIHRoaXMgY2xhc3NcbiAgICAgICAgICAgIC5kYXRhKGxheWVycykuZW50ZXIoKSAgLy8gbm93IHRoZXJlIHdpbGwgYmUgYSBnIGZvciBldmVyeSBiYXIgd2l0aGluIHRoZSBncmFwaC5cbiAgICAgICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3ViLXRheGVzLVwiICsgcGllX251bSlcbiAgICBcbiAgICAgICAgY29uc3QgcmVjdCA9IGcuc2VsZWN0QWxsKFwicmVjdFwiKSAgLy8gbWFraW5nIGVhY2ggb2JqIG9mIHRoZSBjb3JyZXNwb25kIHRvIGEgcmVjdCB3aXRoaW4gdGhlIGdcbiAgICAgICAgICAgIC5kYXRhKGxheWVyID0+IGxheWVyKTsgLy8gcHVsbGluZyBvdXQgZWFjaCBpbmRpdmlkdWFsIG9ialxuICAgICAgICAgICAgcmVjdC5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICByZWN0LmVudGVyKCkuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB4U2NhbGUoMCkpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgeFNjYWxlKDEpKSAgLy8gcHJvYmFibHkgY2FuIGhhcmQgY29kZSwgc2luY2Ugb25seSBvbmUgYmFyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBzdGFjay0ke3BpZV9udW19LSR7aWRfY291bnQrK31gXG4gICAgICAgICAgICAgICAgfSkubWVyZ2UocmVjdClcblxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB4U2NhbGUoMCkpICAvLyBwYXNzaW5nIGVhY2ggb2JqJ3MgeCB2YWx1ZSB0byB0aGUgZDMgeCBmdW5jdGlvbiBkZWZpbmVkIGFib3ZlXG4gICAgICAgICAgICAuYXR0cigneScsIGxheWVyID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0IC0geVNjYWxlKGxheWVyWzFdKVxuICAgICAgICAgICAgfSkgIC8vIHkwIGlzIHRoZSBoZWlnaHQgd2hlcmUgZWFjaCBzZWdtZW50IGluIHRoZSBzdGFjayBzdGFydHNcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHhTY2FsZSgxKSkgIC8vIHByb2JhYmx5IGNhbiBoYXJkIGNvZGUsIHNpbmNlIG9ubHkgb25lIGJhclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGJhciA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHlTY2FsZShiYXJbMV0gLSBiYXJbMF0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCAoZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdfY29sb3JzKCsrY29sb3JfY291bnQpXG4gICAgICAgICAgICB9KSBcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBlbGUgPyBlbGUuZGF0YS5wZXJjZW50IDogbnVsbFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHt0b29sdGlwQ3JlYXRvcihwaWVfbnVtLCB0YXhfdHlwZSwgcGVyY2VudCl9LCAwKVxuICAgICAgICAvLyB0b29sdGlwQ3JlYXRvcihwaWVfbnVtLCB0YXhfdHlwZSlcblxuICAgIGxlZ2VuZENyZWF0b3IocGllX251bSwga2V5cywgbmV3X2NvbG9ycylcbiAgICAvLyBzdWJEYXRhTGVnZW5kKG5ld19jb2xvcnMsIClcblxuICAgIC8vIH1cblxufVxuXG5jb25zdCBjb2xvckNob29zZXIgPSAodGF4X3R5cGUpID0+IHtcbiAgICBzd2l0Y2ggKHRheF90eXBlKSB7XG4gICAgICAgIGNhc2UgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzRdXG4gICAgICAgIGNhc2UgJ1Byb3BlcnR5IFRheGVzJzpcbiAgICAgICAgICAgIHJldHVybiBDSVJDTEVfQ09MT1JTWzNdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gQ0lSQ0xFX0NPTE9SU1syXVxuICAgICAgICBjYXNlICdJbmNvbWUgVGF4ZXMnOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbMV1cbiAgICAgICAgY2FzZSAnT3RoZXIgVGF4ZXMnOlxuICAgICAgICAgICAgcmV0dXJuIENJUkNMRV9DT0xPUlNbMF1cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCB0b29sdGlwQ3JlYXRvciA9IChwaWVfbnVtLCB0YXhfdHlwZSwgcGVyY2VudCkgPT4ge1xuICAgIFxuICAgIGNvbnN0IHN1Yl9kYXRhX2RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZGF0YS1kZXRhaWxzLXR5cGUtJHtwaWVfbnVtfWApXG4gICAgY29uc3QgcmVsYXRpdmVfcGVyY2VudF9kZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHJlbGF0aXZlLXBlcmNlbnQtJHtwaWVfbnVtfWApXG4gICAgY29uc3Qgb3ZlcmFsbF9wZXJjZW50X2RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgb3ZlcmFsbC1wZXJjZW50LSR7cGllX251bX1gKVxuICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ViLWRhdGEtZGV0YWlscy0nICsgcGllX251bSlcbiAgICBjb25zdCBzaWRlID0gcGllX251bSA9PT0gMSA/ICdsZWZ0JyA6ICdyaWdodCdcbiAgICBjb25zdCB2YW5pbGxhX3N2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWItZGF0YS1zdmctJyArIHBpZV9udW0pXG4gICAgbGV0IGluZGV4O1xuXG4gICAgaWYgKCF0YXhfdHlwZSB8fCB0YXhfdHlwZSA9PT0gXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIikge1xuICAgICAgICB0YXhfdHlwZSA9ICdTYWxlcyBUYXhlcydcbiAgICAgICAgaW5kZXggPSBMQUJFTFMuaW5kZXhPZih0YXhfdHlwZSlcbiAgICAgICAgcGVyY2VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBgLWJveC1gICsgaW5kZXgpLmlubmVySFRNTFxuICAgICAgICBwZXJjZW50ID0gcGFyc2VGbG9hdChwZXJjZW50LnNsaWNlKDAsIC0xKSlcbiAgICB9XG4gICAgXG4gICAgaW5kZXggPSBMQUJFTFMuaW5kZXhPZih0YXhfdHlwZSlcbiAgICBzdWJfZGF0YV9kZXRhaWxzLmlubmVySFRNTCA9IGAke3RheF90eXBlfWBcbiAgICByZWxhdGl2ZV9wZXJjZW50X2RldGFpbHMuaW5uZXJIVE1MID0gYFBlcmNlbnQgb2YgdG90YWwgYnVkZ2V0OiAke3BlcmNlbnRpZnkocGVyY2VudCl9YFxuICAgIG92ZXJhbGxfcGVyY2VudF9kZXRhaWxzLmlubmVySFRNTCA9ICdTY3JvbGwgb3ZlciBzaWRlIGJhciB0byBzZWUgc3ViIHRheCBkYXRhIGZvciB0aGlzIGNhdGVnb3J5J1xuICAgIGxpc3Quc3R5bGUuYmFja2dyb3VuZCA9IENJUkNMRV9DT0xPUlNbaW5kZXhdXG4gICAgLy8gdmFuaWxsYV9zdmcuYXBwZW5kQ2hpbGQodmFuaWxsYV90b29sdGlwKVxuICAgIFxuICAgIHZhbmlsbGFfc3ZnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgICAgIGluZGV4ID0gTEFCRUxTLmluZGV4T2YodGF4X3R5cGUpXG4gICAgICAgIGNvbnN0IHNwbGl0X2lkICA9IGUudGFyZ2V0LmlkLnNwbGl0KCctJylcbiAgICAgICAgY29uc3QgbGVnZW5kX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGVnZW5kLXRleHQtJHtzcGxpdF9pZFsxXX0tJHtzcGxpdF9pZFsyXX1gKVxuICAgICAgICAvLyBjb25zdCBsZWdlbmRfaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsZWdlbmQtaXRlbS0ke3NwbGl0X2lkWzFdfS0ke3NwbGl0X2lkWzJdfWApXG4gICAgICAgIGNvbnN0IGJveF9kYXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2lkZSArIGAtYm94LWAgKyBpbmRleCkuaW5uZXJIVE1MXG4gICAgICAgIFxuICAgICAgICBsZXQgcmVsYXRpdmVfcGVyY2VudCA9IChlLnRhcmdldC5oZWlnaHQuYmFzZVZhbC52YWx1ZSAvIGhlaWdodCkgKiAxMDBcbiAgICAgICAgcmVsYXRpdmVfcGVyY2VudCA9IE1hdGgucm91bmQoMTAwICogcmVsYXRpdmVfcGVyY2VudCkgLyAxMDBcbiAgICAgICAgXG4gICAgICAgIGxldCBvdmVyYWxsX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGJveF9kYXRhLnNsaWNlKDAsIC0xKSlcbiAgICAgICAgb3ZlcmFsbF9wZXJjZW50ID0gTWF0aC5yb3VuZCgxMDAgKiBvdmVyYWxsX3BlcmNlbnQgKiByZWxhdGl2ZV9wZXJjZW50IC8gMTAwKSAvIDEwMFxuICAgICAgICAvLyBsZXQgb3ZlcmFsbF9wZXJjZW50ID0gXG4gICAgICAgIC8vIGxlZ2VuZF9pdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIG92ZXJhbGxfcGVyY2VudF9kZXRhaWxzLmlubmVySFRNTCA9IGBQZXJjZW50IG9mIHRvdGFsIGJ1ZGdldDogYCArIG92ZXJhbGxfcGVyY2VudFxuICAgICAgICByZWxhdGl2ZV9wZXJjZW50X2RldGFpbHMuaW5uZXJIVE1MID0gYFBlcmNlbnQgb2YgY2F0ZWdvcnk6ICR7cmVsYXRpdmVfcGVyY2VudH1gXG4gICAgICAgIGlmIChsZWdlbmRfdGV4dCkgeyBzdWJfZGF0YV9kZXRhaWxzLmlubmVySFRNTCA9IGxlZ2VuZF90ZXh0LmlubmVySFRNTCB9XG4gICAgICAgIC8vIFxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY29sb3I6ICcgKyBDSVJDTEVfQ09MT1JTW2luZGV4XSlcbiAgICAgICAgLy8gbGlzdF9jb2xvci5zdHlsZS5ib3JkZXIgPSBgNHB4IHNvbGlkICR7Q0lSQ0xFX0NPTE9SU1tpbmRleF19YFxuICAgICAgICAvLyB2YW5pbGxhX3Rvb2x0aXAuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICB9KVxuICAgIHZhbmlsbGFfc3ZnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZSA9PiB7XG5cbiAgICB9KVxuXG59XG5cbmNvbnN0IGxlZ2VuZENyZWF0b3IgPSAocGllX251bSwga2V5cywgbmV3X2NvbG9ycykgPT4ge1xuXG4gICAgbGV0IGNvbG9yX2NvdW50ID0gMFxuICAgIGxldCBpZF9jb3VudCA9IDBcblxuICAgIGNvbnN0IGxlZ2VuZCA9IGQzLnNlbGVjdChcIiNzdWItZGF0YS1sZWdlbmQtXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnc3ViLWRhdGEtbGVnZW5kLXN2Zy0nICsgcGllX251bSkuYXR0cignaWQnLCAnc3ViLWRhdGEtbGVnZW5kLXN2Zy0nICsgcGllX251bSlcbiAgICAgICAgLmFwcGVuZCgnZycpXG5cbiAgICBpZF9jb3VudCA9IDBcblxuICAgIGxlZ2VuZC5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgICAuZGF0YShrZXlzLnJldmVyc2UoKSlcbiAgICAgICAgLmVudGVyKClcbiAgICAgICAgLmluc2VydCgndGV4dCcpXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3gnLCAxOCkuYXR0cigneScsICcwJylcbiAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ3N0YXJ0JylcbiAgICAgICAgLmF0dHIoJ2FsaWdubWVudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2hpZGRlbicpXG4gICAgICAgIC5hdHRyKCdpZCcsIGQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBsZWdlbmQtdGV4dC0ke3BpZV9udW19LSR7aWRfY291bnQrK31gO1xuICAgICAgICB9KVxufVxuXG4iLCJpbXBvcnQgeyB0b29sdGlwQ3JlYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9zdWJkYXRhX2dlbmVyYXRvcidcbmltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3InXG5pbXBvcnQgeyBwaWVMZWdlbmQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2xlZ2VuZCdcbmltcG9ydCB7IHN0YXRlX3NlbGVjdG9yLCBUT1BfTEVWRUwgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3InXG5pbXBvcnQgeyBidWRnZXRDaXJjbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvYnVkZ2V0X2NpcmNsZSdcbmltcG9ydCB7IHdyYXBwZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwnXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJ1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgXG4gICAgLy8gUENHIC0+IGNzdlBhdGgsIHNlY3RvciwgYW1vdXQsIGxvY2F0aW9uLCBtdWx0aXBsaWVyLCBza2lwXG4gICAgXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKVxuICAgIC8vIGNvbnN0IHVsID0gcGllTGVnZW5kKClcbiAgICBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3Qgc2VsZWN0XzEgPSBzdGF0ZV9zZWxlY3RvcigxKVxuICAgIGNvbnN0IHNlbGVjdF8yID0gc3RhdGVfc2VsZWN0b3IoMilcbiAgICBjb25zdCBzZWxlY3Rvcl9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VsZWN0b3ItY29udGFpbmVyXCIpWzBdXG4gICAgY29uc3QgeWVhclNlbGVjdG9yID0geWVhclNlbGVjdG9yXG5cbiAgICBzZWxlY3Rvcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0XzEpXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8yKVxuICAgIC8vIG1ha2luZyB0aGlzIHRvIHRyYW5zZm9ybSBldmVyeXRoaW5nIGRvd24gd2hpbGUgbWFpbnRpbmcgbWFpbidzIHNpemVcbiAgICAvLyBjb25zdCBvdmVyYWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpXG4gICAgLy8gb3ZlcmFsbC5jbGFzc0xpc3QuYWRkKCdvdmVyYWxsJylcbiAgICAvLyBvdmVyYWxsLmFwcGVuZENoaWxkKHVsKVxuXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJBbGFiYW1hXCIsIFRPUF9MRVZFTCwgMSwgXCIuL3NyYy9hc3NldHMvZGF0YS9GWTIwMTgtU1RDLURldGFpbGVkLVRhYmxlLmNzdlwiLCBmYWxzZSlcbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIld5b21pbmdcIiwgVE9QX0xFVkVMLCAyLCBcIi4vc3JjL2Fzc2V0cy9kYXRhL0ZZMjAxOC1TVEMtRGV0YWlsZWQtVGFibGUuY3N2XCIsIGZhbHNlKVxuICAgIC8vIHRvb2x0aXBDcmVhdG9yKDEpXG4gICAgLy8gdG9vbHRpcENyZWF0b3IoMilcbiAgICAvLyBNYWtlIHRoZSBtb2RhbFxuICAgIGNvbnN0IG1vZGFsID0gd3JhcHBlcigpXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylcblxuICAgIHJvb3QuYXBwZW5kQ2hpbGQodWwpXG4gICAgcm9vdC5hcHBlbmRDaGlsZChtb2RhbClcbiAgICBcbn0pXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9