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

/***/ "./src/components/event_handlers.js":
/*!******************************************!*\
  !*** ./src/components/event_handlers.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// container_array.push(sales_taxes)
// container_array.push(license_taxes)
// container_array.push(income_taxes)
// container_array.push(other_taxes)

var subData = exports.subData = function subData(container_array, pie_num) {
    var color_string = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#3F6D2A";

    // a lot of this code was learned from Michael Stanaland's "Stacked bar chart with tooltips" tutorial at http://bl.ocks.org/mstanaland/6100713
    return function (ele) {
        debugger;
        var tax_type = ele.data.key;

        var sub_array = subArrayLocator(tax_type, container_array);

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

        var svg = d3.select("main").append("svg").attr("width", width).attr("height", height).append("g");

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
        var next_color = LightenDarkenColor(color_string, decrement);
        while (colors.length < keys.length) {
            colors.push(next_color);
            next_color = LightenDarkenColor(next_color, decrement);
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
            debugger;
            return colors.pop();
        }); // height is set to the starting point plus the height, and all that subtracted from the starting point due to y values begining at top of screen
        //     .on('mouseover', () => tooltip.style("display", true))  // want the info box to switch between visible and inivis based on mouseover
        //     .on('mouseout', () => tooltip.style("display", "none"))
        //     .on('mousemove', d => {  // this is going to be a sweet effect!
        //         const xPos = d3.mouse(this)[0] - (tooltipWidth / 2) // this[0] corresponds to mouse's x pos, and pushing it left by half of the tooltip's width ensure it is centered
        //         const yPos = d3.mouse(this)[1] - 25 // puts the tooltip up a bit above the cursor
        //         tooltip.attr("transform", "translate(" + xPos + ',' + yPos + ')')
        //         tooltip.select('text').text(d.percent) // shows the percent  
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

var subArrayLocator = function subArrayLocator(tax_type, container_array) {
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

var cssSubDataDisplay = exports.cssSubDataDisplay = function cssSubDataDisplay(container_array, pie_num) {

    var width = 90; // setting the dimensions to correspond to the pie charts'
    var height = 600;

    return function (ele) {

        var remove = document.getElementById("sub-data-list-" + pie_num);
        remove ? remove.parentNode.removeChild(remove) : null;

        var tax_type = ele.data.key;
        var sub_array = subArrayLocator(tax_type, container_array); // get right sub_array
        // const groupTotal = groupTotal(sub_array) // not sure why this is not invoking the funciton below
        var total = 0;
        sub_array.forEach(function (obj) {
            total += obj.amount;
        });
        var root = document.getElementById("root"); // grab the root to attach later

        var ul = document.createElement("ul"); // set up ul container
        ul.classList.add("sub-data-list-" + pie_num);
        ul.id = "sub-data-list-" + pie_num;

        sub_array.forEach(function (sub_tax) {
            var li = document.createElement('li');
            li.style.height = sub_tax.percent_of_total * 6 + 'px';
            ul.appendChild(li);
        });

        root.appendChild(ul);
    };
};

var groupTotal = function groupTotal(array) {
    var total = 0;
    array.forEach(function (obj) {
        total += obj.amount;
    });
    return total;
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
// This function was taken from user Pimp Trizkits post on stackoverflow at https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
var pSBC = function pSBC(p, c0, c1, l) {
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

var _event_handlers = __webpack_require__(/*! ./event_handlers */ "./src/components/event_handlers.js");

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
        }).on('click', (0, _event_handlers.subData)(container_array, pie_num));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZXZlbnRfaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYXBwLnNjc3MiXSwibmFtZXMiOlsic3ViRGF0YSIsImNvbnRhaW5lcl9hcnJheSIsInBpZV9udW0iLCJjb2xvcl9zdHJpbmciLCJlbGUiLCJ0YXhfdHlwZSIsImRhdGEiLCJrZXkiLCJzdWJfYXJyYXkiLCJzdWJBcnJheUxvY2F0b3IiLCJ0YXhfc3RhY2siLCJrZXlzIiwiZm9yRWFjaCIsInN1Yl90YXgiLCJpIiwicHVzaCIsInBlcmNlbnRfb2ZfdG90YWwiLCJ3aWR0aCIsImhlaWdodCIsInRvb2x0aXBXaWR0aCIsInRvb2x0aXBIZWlnaHQiLCJzdmciLCJkMyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJzdGFjayIsIm9yZGVyIiwic3RhY2tPcmRlck5vbmUiLCJvZmZzZXQiLCJzdGFja09mZnNldE5vbmUiLCJ0YXhfc3RhY2tfYXJyYXkiLCJsYXllcnMiLCJ4U2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwiY29sb3JzIiwiZGVjcmVtZW50IiwibGVuZ3RoIiwibmV4dF9jb2xvciIsIkxpZ2h0ZW5EYXJrZW5Db2xvciIsImNvbnNvbGUiLCJsb2ciLCJ5U2NhbGUiLCJzdW0iLCJPYmplY3QiLCJ2YWx1ZXMiLCJnIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJyZWN0IiwibGF5ZXIiLCJiYXIiLCJwb3AiLCJjc3NTdWJEYXRhRGlzcGxheSIsInJlbW92ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJ0b3RhbCIsIm9iaiIsImFtb3VudCIsInJvb3QiLCJ1bCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJpZCIsImxpIiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsImdyb3VwVG90YWwiLCJhcnJheSIsImNvbCIsImFtdCIsInVzZVBvdW5kIiwic2xpY2UiLCJudW0iLCJwYXJzZUludCIsInIiLCJiIiwidG9TdHJpbmciLCJwU0JDIiwicCIsImMwIiwiYzEiLCJsIiwiUCIsImYiLCJ0IiwiaCIsIm0iLCJNYXRoIiwicm91bmQiLCJhIiwicFNCQ3IiLCJkIiwibiIsIngiLCJzcGxpdCIsInBhcnNlRmxvYXQiLCJ1bmRlZmluZWQiLCJhc3NpZ25Cb3giLCJhcnJheV9vZl9vYmpzIiwic2lkZSIsImJveCIsImRlY2ltYWxzIiwiU3RyaW5nIiwicGVyY2VudCIsImludGVnZXJzIiwic2xpY2VkIiwiaW5uZXJIVE1MIiwiZmluZEFtb3VudCIsImpvaW4iLCJidWRnZXRDaXJjbGUiLCJ0b3RhbDEiLCJ0b3RhbDIiLCJzcXJ0Iiwib2xkX2NpcmxjZV8xIiwib2xkX2NpcmxjZV8yIiwiY2lyY2xlX2NvbnRhaW5lciIsInN2ZzEiLCJzdmcyIiwicnNjYWxlIiwibWF4IiwiUGllQ2hhcnRHZW5lcmF0b3IiLCJDT0xPUlMiLCJDSVJDTEVfQ09MT1JTIiwiTEFCRUxTIiwic3RhdGUiLCJjc3YiLCJoMSIsInNwYW4iLCJoMiIsIlRPVEFMIiwiVFlQRVMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJyYWRpdXMiLCJzY2FsZU9yZGluYWwiLCJhcmMiLCJvdXRlclJhZGl1cyIsImlubmVyUmFkaXVzIiwicGllIiwidmFsdWUiLCJ0aGVuIiwic2FsZXNfdGF4ZXMiLCJsaWNlbnNlX3RheGVzIiwiaW5jb21lX3RheGVzIiwib3RoZXJfdGF4ZXMiLCJHZW9fTmFtZSIsIml0ZW0iLCJBTU9VTlQiLCJ0YXhfb2JqIiwiVGF4X1R5cGUiLCJpbmNsdWRlcyIsInRleHQiLCJmb3JtYXQiLCJwYXRoIiwidHJhbnNpdGlvbiIsImVhc2UiLCJlYXNlTGluZWFyIiwiZHVyYXRpb24iLCJhdHRyVHdlZW4iLCJwaWVUd2VlbiIsIm9uIiwic3BhbjEiLCJzcGFuMiIsImlubmVyVGV4dCIsImNhdGNoIiwiZXJyb3IiLCJpbnRlcnBvbGF0ZSIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsInBpZUxlZ2VuZCIsIm1hc3Rlcl9saXN0IiwibGVmdF9saXN0IiwidGV4dF9saXN0IiwicmlnaHRfbGlzdCIsImxlZnRfYm94IiwidGV4dF9ib3giLCJyaWdodF9ib3giLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlciIsInN1Ymxpc3RzIiwibGFiZWwiLCJsaXN0cyIsImxlc3RsaXN0IiwidGV4dGxpc3QiLCJyaWdodGxpc3QiLCJsZWZ0Qm94IiwicmlnaHRCb3giLCJzdWJsaXN0IiwiVE9QX0xFVkVMIiwiU1RBVEVfTkFNRVMiLCJzdGF0ZV9zZWxlY3RvciIsIndyYXBwZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInN0YXRlX2xpc3QiLCJ0b2dnbGUiLCJib2R5IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdGF0ZVNlbGVjdG9yIiwic3RhdGVfbGlzdF9pdGVtIiwic2V0QXR0cmlidXRlIiwic2VsZWN0XzEiLCJzZWxlY3RfMiIsInNlbGVjdG9yX2NvbnRhaW5lciIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ5ZWFyU2VsZWN0b3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7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QStCNkksUUFBL0I7QUFDQUUsdUJBQW1CL0ksV0FBbkIsQ0FBK0I4SSxRQUEvQjtBQUNBdEosU0FBS1EsV0FBTCxDQUFpQlAsRUFBakI7O0FBRUEsZ0RBQWtCLFNBQWxCLEVBQTZCc0kseUJBQTdCLEVBQXdDLENBQXhDO0FBQ0EsZ0RBQWtCLFNBQWxCLEVBQTZCQSx5QkFBN0IsRUFBd0MsQ0FBeEM7QUFHSCxDQXJCRCxFOzs7Ozs7Ozs7OztBQ1BBLHVDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gY29udGFpbmVyX2FycmF5LnB1c2goc2FsZXNfdGF4ZXMpXG4vLyBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuLy8gY29udGFpbmVyX2FycmF5LnB1c2goaW5jb21lX3RheGVzKVxuLy8gY29udGFpbmVyX2FycmF5LnB1c2gob3RoZXJfdGF4ZXMpXG5cbmV4cG9ydCBjb25zdCBzdWJEYXRhID0gKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSwgY29sb3Jfc3RyaW5nID0gXCIjM0Y2RDJBXCIpID0+IHtcbiAgICAvLyBhIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGxlYXJuZWQgZnJvbSBNaWNoYWVsIFN0YW5hbGFuZCdzIFwiU3RhY2tlZCBiYXIgY2hhcnQgd2l0aCB0b29sdGlwc1wiIHR1dG9yaWFsIGF0IGh0dHA6Ly9ibC5vY2tzLm9yZy9tc3RhbmFsYW5kLzYxMDA3MTNcbiAgICByZXR1cm4gKGVsZSkgPT4ge1xuICAgICAgICBkZWJ1Z2dlclxuICAgICAgICBjb25zdCB0YXhfdHlwZSA9IGVsZS5kYXRhLmtleVxuXG4gICAgICAgIGNvbnN0IHN1Yl9hcnJheSA9IHN1YkFycmF5TG9jYXRvcih0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KVxuXG4gICAgICAgIC8vIHNldHRpbmcgdXAgdGhlIHRheCBzdGFjayB0byBjb21wbHkgd2l0aCBkMyB2NVxuICAgICAgICBsZXQgdGF4X3N0YWNrID0geyBcbiAgICAgICAgICAgIC8vIHRheF90eXBlOiB0YXhfdHlwZSxcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXR0aW5nIHVwIGtleXNcbiAgICAgICAgbGV0IGtleXMgPSBbXVxuICAgICAgICAvLyBrZXlzLnB1c2godGF4X3R5cGUpXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKChzdWJfdGF4LCBpKSA9PiB7XG4gICAgICAgICAgICBrZXlzLnB1c2goc3ViX3RheC5rZXkpXG4gICAgICAgICAgICB0YXhfc3RhY2tbc3ViX3RheC5rZXldID0gc3ViX3RheC5wZXJjZW50X29mX3RvdGFsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gOTAgIC8vIHNldHRpbmcgdGhlIGRpbWVuc2lvbnMgdG8gY29ycmVzcG9uZCB0byB0aGUgcGllIGNoYXJ0cydcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gNjAwXG5cbiAgICAgICAgY29uc3QgdG9vbHRpcFdpZHRoID0gMTIwIC8vIHdpbGwgYWx0ZXIgdGhlc2UgYXMgbmVlZGVkXG4gICAgICAgIGNvbnN0IHRvb2x0aXBIZWlnaHQgPSA0MCBcblxuICAgICAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCJtYWluXCIpLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCkuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuXG4gICAgICAgIC8vIHNldCB0aGUgbGF5ZXJzIG9mIHRoZSBzdGFja2VkIGJhclxuICAgICAgICAvLyBjb25zdCBsYXllcnMgPSBkMy5zdGFjaygpKFt0YXhfdHlwZV0ubWFwKHRheCA9PiB7ICAvLyBzaG91bGQgdWx0aW1hdGVseSBqdXN0IGJlIHRoZSBvbmUgbGF5ZXJcbiAgICAgICAgLy8gICAgIHJldHVybiBzdWJfYXJyYXkubWFwKGQgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB7IHg6IGQua2V5LCB5OiBkLmFtb3VudCwgcGVyY2VudDogZC5wZXJjZW50IH1cbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIH0pKVxuICAgICAgICBjb25zdCBzdGFjayA9IGQzLnN0YWNrKClcbiAgICAgICAgICAgIC5rZXlzKGtleXMpXG4gICAgICAgICAgICAub3JkZXIoZDMuc3RhY2tPcmRlck5vbmUpXG4gICAgICAgICAgICAub2Zmc2V0KGQzLnN0YWNrT2Zmc2V0Tm9uZSlcbiAgICAgICAgbGV0IHRheF9zdGFja19hcnJheSA9IFtdXG4gICAgICAgIHRheF9zdGFja19hcnJheS5wdXNoKHRheF9zdGFjaylcbiAgICAgICAgY29uc3QgbGF5ZXJzID0gc3RhY2sodGF4X3N0YWNrX2FycmF5KVxuXG4gICAgICAgIC8vIGNvbnN0IHggPSBkMy5zY2FsZU9yZGluYWwoKVxuICAgICAgICAvLyAgICAgLmRvbWFpbihsYXllcnNbMF0ubWFwKGQgPT4gZC54KSlcbiAgICAgICAgLy8gICAgIC8vIC5yYW5nZShbMTAsIHdpZHRoXSwgMCkgIC8vIG1heSBiZSBhIHF1aWNrZXIgd2F5IHRvIGRvIHRoaXMgYXMgdGhlcmUgaXMgb25seSBvbmUgYmFyXG4gICAgICAgIC8vICAgICAucmFuZ2UoW3dpZHRoXSlcbiAgICAgICAgY29uc3QgeFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKSBcbiAgICAgICAgICAgIC5kb21haW4oWzAsIDFdKVxuICAgICAgICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXG4gICAgICAgICAgICBcbiAgICAgICAgLy8gY29uc3QgY29sb3JzID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAvLyAgICAgLmRvbWFpbihbMSwgMTBdKVxuICAgICAgICAvLyAgICAgLnJhbmdlKFtcInJlZFwiLCBcImJsdWVcIl0pXG5cbiAgICAgICAgY29uc3QgY29sb3JzID0gW2NvbG9yX3N0cmluZ11cbiAgICAgICAgY29uc3QgZGVjcmVtZW50ID0gMTAwIC8ga2V5cy5sZW5ndGhcbiAgICAgICAgbGV0IG5leHRfY29sb3IgPSBMaWdodGVuRGFya2VuQ29sb3IoY29sb3Jfc3RyaW5nLCBkZWNyZW1lbnQpXG4gICAgICAgIHdoaWxlIChjb2xvcnMubGVuZ3RoIDwga2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbG9ycy5wdXNoKG5leHRfY29sb3IpXG4gICAgICAgICAgICBuZXh0X2NvbG9yID0gTGlnaHRlbkRhcmtlbkNvbG9yKG5leHRfY29sb3IsIGRlY3JlbWVudClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKGNvbG9ycylcblxuICAgICAgICBjb25zdCB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCBkMy5zdW0oT2JqZWN0LnZhbHVlcyh0YXhfc3RhY2spKV0pICAvLyB0aGUgaW5jcmVtZW50IHVwIHRvIHRoZSB0b3RhbFxuICAgICAgICAgICAgLy8gLnJhbmdlKFtoZWlnaHQsIDBdKVxuICAgICAgICAgICAgLnJhbmdlKFswLCBoZWlnaHRdKVxuXG4gICAgICAgIGNvbnN0IGcgPSBzdmcuc2VsZWN0QWxsKFwiLnN1Yi10YXhlc1wiKSAgLy8gbm8gZyBhdCB0aGlzIHBvaW50LCBidXQgdGhleSB3aWxsIGhhdmUgdGhpcyBjbGFzc1xuICAgICAgICAgICAgLmRhdGEobGF5ZXJzKS5lbnRlcigpICAvLyBub3cgdGhlcmUgd2lsbCBiZSBhIGcgZm9yIGV2ZXJ5IGJhciB3aXRoaW4gdGhlIGdyYXBoLlxuICAgICAgICAgICAgLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIFwic3ViLXRheGVzXCIpICBcbiAgICAgICAgICAgIC8vIC5hdHRyKCdmaWxsJywgZCA9PiB7XG4gICAgICAgICAgICAvLyAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gY29sb3JzKGQpfSlcbiAgICAgICAgICAgIFxuICAgICAgICBjb25zdCByZWN0ID0gZy5zZWxlY3RBbGwoXCJyZWN0XCIpICAvLyBtYWtpbmcgZWFjaCBvYmogb2YgdGhlIGNvcnJlc3BvbmQgdG8gYSByZWN0IHdpdGhpbiB0aGUgZ1xuICAgICAgICAgICAgLmRhdGEobGF5ZXIgPT4gbGF5ZXIpIC8vIHB1bGxpbmcgb3V0IGVhY2ggaW5kaXZpZHVhbCBvYmpcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB4U2NhbGUoMCkpICAvLyBwYXNzaW5nIGVhY2ggb2JqJ3MgeCB2YWx1ZSB0byB0aGUgZDMgeCBmdW5jdGlvbiBkZWZpbmVkIGFib3ZlXG4gICAgICAgICAgICAuYXR0cigneScsIGxheWVyID0+IHtcbiAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAgICAgICAgIHJldHVybiBoZWlnaHQgLSB5U2NhbGUobGF5ZXJbMV0pfSkgIC8vIHkwIGlzIHRoZSBoZWlnaHQgd2hlcmUgZWFjaCBzZWdtZW50IGluIHRoZSBzdGFjayBzdGFydHNcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHhTY2FsZSgxKSkgIC8vIHByb2JhYmx5IGNhbiBoYXJkIGNvZGUsIHNpbmNlIG9ubHkgb25lIGJhclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGJhciA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgICAgICByZXR1cm4geVNjYWxlKGJhclsxXSAtIGJhclswXSl9KVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBkID0+IHtcbiAgICAgICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgICAgIHJldHVybiBjb2xvcnMucG9wKClcbiAgICAgICAgICAgIH0pICAvLyBoZWlnaHQgaXMgc2V0IHRvIHRoZSBzdGFydGluZyBwb2ludCBwbHVzIHRoZSBoZWlnaHQsIGFuZCBhbGwgdGhhdCBzdWJ0cmFjdGVkIGZyb20gdGhlIHN0YXJ0aW5nIHBvaW50IGR1ZSB0byB5IHZhbHVlcyBiZWdpbmluZyBhdCB0b3Agb2Ygc2NyZWVuXG4gICAgICAgIC8vICAgICAub24oJ21vdXNlb3ZlcicsICgpID0+IHRvb2x0aXAuc3R5bGUoXCJkaXNwbGF5XCIsIHRydWUpKSAgLy8gd2FudCB0aGUgaW5mbyBib3ggdG8gc3dpdGNoIGJldHdlZW4gdmlzaWJsZSBhbmQgaW5pdmlzIGJhc2VkIG9uIG1vdXNlb3ZlclxuICAgICAgICAvLyAgICAgLm9uKCdtb3VzZW91dCcsICgpID0+IHRvb2x0aXAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKSlcbiAgICAgICAgLy8gICAgIC5vbignbW91c2Vtb3ZlJywgZCA9PiB7ICAvLyB0aGlzIGlzIGdvaW5nIHRvIGJlIGEgc3dlZXQgZWZmZWN0IVxuICAgICAgICAvLyAgICAgICAgIGNvbnN0IHhQb3MgPSBkMy5tb3VzZSh0aGlzKVswXSAtICh0b29sdGlwV2lkdGggLyAyKSAvLyB0aGlzWzBdIGNvcnJlc3BvbmRzIHRvIG1vdXNlJ3MgeCBwb3MsIGFuZCBwdXNoaW5nIGl0IGxlZnQgYnkgaGFsZiBvZiB0aGUgdG9vbHRpcCdzIHdpZHRoIGVuc3VyZSBpdCBpcyBjZW50ZXJlZFxuICAgICAgICAvLyAgICAgICAgIGNvbnN0IHlQb3MgPSBkMy5tb3VzZSh0aGlzKVsxXSAtIDI1IC8vIHB1dHMgdGhlIHRvb2x0aXAgdXAgYSBiaXQgYWJvdmUgdGhlIGN1cnNvclxuICAgICAgICAvLyAgICAgICAgIHRvb2x0aXAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHhQb3MgKyAnLCcgKyB5UG9zICsgJyknKVxuICAgICAgICAvLyAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCd0ZXh0JykudGV4dChkLnBlcmNlbnQpIC8vIHNob3dzIHRoZSBwZXJjZW50ICBcbiAgICAgICAgLy8gICAgIH0pXG5cbiAgICAgICAgLy8gY29uc3QgdG9vbHRpcCA9IHN2Zy5hcHBlbmQoJ2cnKSAvLyBzZXR0aW5nIHVwIHRoaXMgc3dlZXQgdG9vbHRpcC4gRXhjaXRpbmchXG4gICAgICAgIC8vICAgICAuYXR0cignY2xhc3MnLCAnc3ViLWRhdGEtdG9vbHRpcCB0b29sdGlwJykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpIC8vIHN0YXJ0cyBpbnZpc2libGVcbiAgICAgICAgLy8gICAgIC8vIGFkZGluZyB0aGUgZGltZW5zaW9ucyBvZiB0aGUgYm94XG4gICAgICAgIC8vICAgICAuYXBwZW5kKCdyZWN0JykuYXR0cignd2lkdGgnLCB0b29sdGlwV2lkdGgpXG4gICAgICAgIC8vICAgICAuYXR0cignaGVpZ2h0JywgdG9vbHRpcEhlaWdodCkuYXR0cignZmlsbCcsICd3aGl0ZScpLnN0eWxlKCdvcGFjaXR5JywgMC41KSAvLyBtYWtpbmcgaXQgcGFydGlhbGx5IHNlZS10aHJvdWdoXG4gICAgICAgIC8vICAgICAvLyBhZGRpbmcgdGhlIHRleHQgY29udGVudFxuICAgICAgICAvLyAgICAgLmFwcGVuZCgndGV4dCcpLmF0dHIoJ3gnLCAxNSlcbiAgICAgICAgLy8gICAgIC5hdHRyKCdkeScsICcuOGVtJykuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgfVxuICAgIFxufVxuXG5jb25zdCBzdWJBcnJheUxvY2F0b3IgPSAodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSkgPT4geyAgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBmaW5kaW5nIHRoZSByaWdodCBzdWIgYXJyYXkuIEEgYml0IGhhcmQtY29kZWQuXG4gICAgc3dpdGNoICh0YXhfdHlwZSkge1xuICAgICAgICBjYXNlIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzBdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6IFxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsxXVxuICAgICAgICBjYXNlIFwiSW5jb21lIFRheGVzXCI6IFxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsyXVxuICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjogXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzNdXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgY3NzU3ViRGF0YURpc3BsYXkgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSA9PiB7XG5cbiAgICBjb25zdCB3aWR0aCA9IDkwICAvLyBzZXR0aW5nIHRoZSBkaW1lbnNpb25zIHRvIGNvcnJlc3BvbmQgdG8gdGhlIHBpZSBjaGFydHMnXG4gICAgY29uc3QgaGVpZ2h0ID0gNjAwXG5cbiAgICByZXR1cm4gKGVsZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ViLWRhdGEtbGlzdC1cIiArIHBpZV9udW0pXG4gICAgICAgIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YXhfdHlwZSA9IGVsZS5kYXRhLmtleVxuICAgICAgICBjb25zdCBzdWJfYXJyYXkgPSBzdWJBcnJheUxvY2F0b3IodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSkgLy8gZ2V0IHJpZ2h0IHN1Yl9hcnJheVxuICAgICAgICAvLyBjb25zdCBncm91cFRvdGFsID0gZ3JvdXBUb3RhbChzdWJfYXJyYXkpIC8vIG5vdCBzdXJlIHdoeSB0aGlzIGlzIG5vdCBpbnZva2luZyB0aGUgZnVuY2l0b24gYmVsb3dcbiAgICAgICAgbGV0IHRvdGFsID0gMFxuICAgICAgICBzdWJfYXJyYXkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgdG90YWwgKz0gb2JqLmFtb3VudFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSAvLyBncmFiIHRoZSByb290IHRvIGF0dGFjaCBsYXRlclxuXG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpIC8vIHNldCB1cCB1bCBjb250YWluZXJcbiAgICAgICAgdWwuY2xhc3NMaXN0LmFkZChcInN1Yi1kYXRhLWxpc3QtXCIgKyBwaWVfbnVtKVxuICAgICAgICB1bC5pZCA9IChcInN1Yi1kYXRhLWxpc3QtXCIgKyBwaWVfbnVtKVxuXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKHN1Yl90YXggPT4ge1xuICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICBsaS5zdHlsZS5oZWlnaHQgPSAoc3ViX3RheC5wZXJjZW50X29mX3RvdGFsICogNikgKyAncHgnXG4gICAgICAgICAgICB1bC5hcHBlbmRDaGlsZChsaSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZCh1bClcbiAgICB9XG59XG5cbmNvbnN0IGdyb3VwVG90YWwgPSBhcnJheSA9PiB7XG4gICAgbGV0IHRvdGFsID0gMFxuICAgIGFycmF5LmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgdG90YWwgKz0gb2JqLmFtb3VudFxuICAgIH0pO1xuICAgIHJldHVybiB0b3RhbFxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHdhcyB0YWtlbiBmcm9tIHVzZXIgUGltcCBUcml6a2l0cyBwb3N0IG9uIHN0YWNrb3ZlcmZsb3cgYXQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTU2MDI0OC9wcm9ncmFtbWF0aWNhbGx5LWxpZ2h0ZW4tb3ItZGFya2VuLWEtaGV4LWNvbG9yLW9yLXJnYi1hbmQtYmxlbmQtY29sb3JzXG5mdW5jdGlvbiBMaWdodGVuRGFya2VuQ29sb3IoY29sLCBhbXQpIHtcbiAgICB2YXIgdXNlUG91bmQgPSBmYWxzZTtcbiAgICBpZiAoY29sWzBdID09IFwiI1wiKSB7XG4gICAgICAgIGNvbCA9IGNvbC5zbGljZSgxKTtcbiAgICAgICAgdXNlUG91bmQgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBudW0gPSBwYXJzZUludChjb2wsIDE2KTtcblxuICAgIHZhciByID0gKG51bSA+PiAxNikgKyBhbXQ7XG5cbiAgICBpZiAociA+IDI1NSkgciA9IDI1NTtcbiAgICBlbHNlIGlmIChyIDwgMCkgciA9IDA7XG5cbiAgICB2YXIgYiA9ICgobnVtID4+IDgpICYgMHgwMEZGKSArIGFtdDtcblxuICAgIGlmIChiID4gMjU1KSBiID0gMjU1O1xuICAgIGVsc2UgaWYgKGIgPCAwKSBiID0gMDtcblxuICAgIHZhciBnID0gKG51bSAmIDB4MDAwMEZGKSArIGFtdDtcblxuICAgIGlmIChnID4gMjU1KSBnID0gMjU1O1xuICAgIGVsc2UgaWYgKGcgPCAwKSBnID0gMDtcblxuICAgIHJldHVybiAodXNlUG91bmQgPyBcIiNcIiA6IFwiXCIpICsgKGcgfCAoYiA8PCA4KSB8IChyIDw8IDE2KSkudG9TdHJpbmcoMTYpO1xufVxuLy8gVGhpcyBmdW5jdGlvbiB3YXMgdGFrZW4gZnJvbSB1c2VyIFBpbXAgVHJpemtpdHMgcG9zdCBvbiBzdGFja292ZXJmbG93IGF0IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU1NjAyNDgvcHJvZ3JhbW1hdGljYWxseS1saWdodGVuLW9yLWRhcmtlbi1hLWhleC1jb2xvci1vci1yZ2ItYW5kLWJsZW5kLWNvbG9yc1xuY29uc3QgcFNCQyA9IChwLCBjMCwgYzEsIGwpID0+IHtcbiAgICBsZXQgciwgZywgYiwgUCwgZiwgdCwgaCwgaSA9IHBhcnNlSW50LCBtID0gTWF0aC5yb3VuZCwgYSA9IHR5cGVvZiAoYzEpID09IFwic3RyaW5nXCI7XG4gICAgaWYgKHR5cGVvZiAocCkgIT0gXCJudW1iZXJcIiB8fCBwIDwgLTEgfHwgcCA+IDEgfHwgdHlwZW9mIChjMCkgIT0gXCJzdHJpbmdcIiB8fCAoYzBbMF0gIT0gJ3InICYmIGMwWzBdICE9ICcjJykgfHwgKGMxICYmICFhKSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCF0aGlzLnBTQkNyKSB0aGlzLnBTQkNyID0gKGQpID0+IHtcbiAgICAgICAgbGV0IG4gPSBkLmxlbmd0aCwgeCA9IHt9O1xuICAgICAgICBpZiAobiA+IDkpIHtcbiAgICAgICAgICAgIFtyLCBnLCBiLCBhXSA9IGQgPSBkLnNwbGl0KFwiLFwiKSwgbiA9IGQubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKG4gPCAzIHx8IG4gPiA0KSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHguciA9IGkoclszXSA9PSBcImFcIiA/IHIuc2xpY2UoNSkgOiByLnNsaWNlKDQpKSwgeC5nID0gaShnKSwgeC5iID0gaShiKSwgeC5hID0gYSA/IHBhcnNlRmxvYXQoYSkgOiAtMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG4gPT0gOCB8fCBuID09IDYgfHwgbiA8IDQpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKG4gPCA2KSBkID0gXCIjXCIgKyBkWzFdICsgZFsxXSArIGRbMl0gKyBkWzJdICsgZFszXSArIGRbM10gKyAobiA+IDQgPyBkWzRdICsgZFs0XSA6IFwiXCIpO1xuICAgICAgICAgICAgZCA9IGkoZC5zbGljZSgxKSwgMTYpO1xuICAgICAgICAgICAgaWYgKG4gPT0gOSB8fCBuID09IDUpIHguciA9IGQgPj4gMjQgJiAyNTUsIHguZyA9IGQgPj4gMTYgJiAyNTUsIHguYiA9IGQgPj4gOCAmIDI1NSwgeC5hID0gbSgoZCAmIDI1NSkgLyAwLjI1NSkgLyAxMDAwO1xuICAgICAgICAgICAgZWxzZSB4LnIgPSBkID4+IDE2LCB4LmcgPSBkID4+IDggJiAyNTUsIHguYiA9IGQgJiAyNTUsIHguYSA9IC0xXG4gICAgICAgIH0gcmV0dXJuIHhcbiAgICB9O1xuICAgIGggPSBjMC5sZW5ndGggPiA5LCBoID0gYSA/IGMxLmxlbmd0aCA+IDkgPyB0cnVlIDogYzEgPT0gXCJjXCIgPyAhaCA6IGZhbHNlIDogaCwgZiA9IHBTQkNyKGMwKSwgUCA9IHAgPCAwLCB0ID0gYzEgJiYgYzEgIT0gXCJjXCIgPyBwU0JDcihjMSkgOiBQID8geyByOiAwLCBnOiAwLCBiOiAwLCBhOiAtMSB9IDogeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1LCBhOiAtMSB9LCBwID0gUCA/IHAgKiAtMSA6IHAsIFAgPSAxIC0gcDtcbiAgICBpZiAoIWYgfHwgIXQpIHJldHVybiBudWxsO1xuICAgIGlmIChsKSByID0gbShQICogZi5yICsgcCAqIHQuciksIGcgPSBtKFAgKiBmLmcgKyBwICogdC5nKSwgYiA9IG0oUCAqIGYuYiArIHAgKiB0LmIpO1xuICAgIGVsc2UgciA9IG0oKFAgKiBmLnIgKiogMiArIHAgKiB0LnIgKiogMikgKiogMC41KSwgZyA9IG0oKFAgKiBmLmcgKiogMiArIHAgKiB0LmcgKiogMikgKiogMC41KSwgYiA9IG0oKFAgKiBmLmIgKiogMiArIHAgKiB0LmIgKiogMikgKiogMC41KTtcbiAgICBhID0gZi5hLCB0ID0gdC5hLCBmID0gYSA+PSAwIHx8IHQgPj0gMCwgYSA9IGYgPyBhIDwgMCA/IHQgOiB0IDwgMCA/IGEgOiBhICogUCArIHQgKiBwIDogMDtcbiAgICBpZiAoaCkgcmV0dXJuIFwicmdiXCIgKyAoZiA/IFwiYShcIiA6IFwiKFwiKSArIHIgKyBcIixcIiArIGcgKyBcIixcIiArIGIgKyAoZiA/IFwiLFwiICsgbShhICogMTAwMCkgLyAxMDAwIDogXCJcIikgKyBcIilcIjtcbiAgICBlbHNlIHJldHVybiBcIiNcIiArICg0Mjk0OTY3Mjk2ICsgciAqIDE2Nzc3MjE2ICsgZyAqIDY1NTM2ICsgYiAqIDI1NiArIChmID8gbShhICogMjU1KSA6IDApKS50b1N0cmluZygxNikuc2xpY2UoMSwgZiA/IHVuZGVmaW5lZCA6IC0yKVxufSIsIlxuXG5leHBvcnQgY29uc3QgYXNzaWduQm94ID0gKGFycmF5X29mX29ianMsIHBpZV9udW0pID0+IHtcbiAgICBjb25zdCBzaWRlID0gcGllX251bSA9PT0gMSA/ICdsZWZ0LWJveC0nIDogJ3JpZ2h0LWJveC0nXG4gICAgYXJyYXlfb2Zfb2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBpID0gNDtcbiAgICAgICAgc3dpdGNoIChvYmoua2V5KSB7XG4gICAgICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMCBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJJbmNvbWUgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMSBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDIgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiUHJvcGVydHkgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMyBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaWRlICsgaSlcbiAgICAgICAgY29uc3QgZGVjaW1hbHMgPSBTdHJpbmcob2JqLnBlcmNlbnQpLnNwbGl0KCcuJylbMV1cbiAgICAgICAgY29uc3QgaW50ZWdlcnMgPSBTdHJpbmcob2JqLnBlcmNlbnQpLnNwbGl0KCcuJylbMF1cbiAgICAgICAgY29uc3Qgc2xpY2VkID0gb2JqLnBlcmNlbnQgPyBpbnRlZ2VycyArICcuJyArIGRlY2ltYWxzLnNsaWNlKDAsIDIpIDogMFxuICAgICAgICBib3guaW5uZXJIVE1MID0gc2xpY2VkICsgJyUnXG4gICAgfSk7XG59XG5cbi8vIGQuQU1PVU5UID09PSAnWCcgPyAwIDogZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDAsXG5leHBvcnQgY29uc3QgZmluZEFtb3VudCA9IChhbW91bnQpID0+IHtcbiAgICByZXR1cm4gYW1vdW50ID09PSAnWCcgPyAwIDogYW1vdW50LnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwXG59XG5cbi8vIGV4cG9ydCBjb25zdCBzdWJEYXRhUHVzaGVyID0gKGl0ZW0pID0+IHtcbi8vICAgICBpZiAoaXRlbSAhPSBcIlQwMFwiICYmIGl0ZW0gIT0gXCJUMDFcIikge1xuLy8gICAgICAgICBzd2l0Y2ggKGl0ZW0uc2xpY2UoMCwgMikpIHtcbi8vICAgICAgICAgICAgIGNhc2UgKFwiVDBcIiB8fCBcIlQxXCIpOlxuLy8gICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2goe1xuLy8gICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4vLyAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4vLyAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnQ6IChmaW5kQW1vdW50KGQuQU1PVU5UKSAvIFRPVEFMKSAqIDEwMFxuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgXG4vLyAgICAgICAgICAgICBjYXNlIFwiVDJcIjpcbi8vICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2goe1xuICAgIFxuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9XG5cbmV4cG9ydCBjb25zdCBidWRnZXRDaXJjbGUgPSAodG90YWwxLCB0b3RhbDIpID0+IHtcbiAgICAvLyBiYXNlZCBvbiBNYXR0aGV3IE1jS2VubmEncyBleGFtcGxlIGF0IGh0dHA6Ly9ibC5vY2tzLm9yZy9tcG1ja2VubmE4L3Jhdy81NjY1MDlkZDNkOWEwOGU1ZjliMi9cbiAgICBpZiAoIXRvdGFsMSB8fCAhdG90YWwyKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICB0b3RhbDEgPSBNYXRoLnNxcnQodG90YWwxKVxuICAgIHRvdGFsMiA9IE1hdGguc3FydCh0b3RhbDIpXG4gICAgLy8gZGVsZXRlIG9sZCBjaXJjbGVzXG4gICAgY29uc3Qgb2xkX2NpcmxjZV8xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1zdmctMScpXG4gICAgY29uc3Qgb2xkX2NpcmxjZV8yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1zdmctMicpXG4gICAgb2xkX2NpcmxjZV8xID8gb2xkX2NpcmxjZV8xLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob2xkX2NpcmxjZV8xKSA6IG51bGxcbiAgICBvbGRfY2lybGNlXzIgPyBvbGRfY2lybGNlXzIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGRfY2lybGNlXzIpIDogbnVsbFxuICAgIFxuICAgIGNvbnN0IGRhdGEgPSBbdG90YWwxLCB0b3RhbDJdXG5cbiAgICBjb25zdCBoZWlnaHQgPSAzMDBcbiAgICBjb25zdCB3aWR0aCA9IDUwMFxuXG4gICAgY29uc3QgY2lyY2xlX2NvbnRhaW5lciA9IGQzLnNlbGVjdCgnI2J1ZGdldC1jaXJjbGUtY29udGFpbmVyJylcblxuICAgIGNvbnN0IHN2ZzEgPSBjaXJjbGVfY29udGFpbmVyLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKS5hdHRyKCdpZCcsICdjaXJjbGUtc3ZnLTEnKTtcblxuICAgIGNvbnN0IHN2ZzIgPSBjaXJjbGVfY29udGFpbmVyLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKS5hdHRyKCdpZCcsICdjaXJjbGUtc3ZnLTInKTtcblxuICAgIGNvbnN0IHJzY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbihbMCwgKGQzLm1heChkYXRhKSkgXSlcbiAgICAgICAgLnJhbmdlKFsxLCAxNTBdKVxuXG4gICAgc3ZnMS5zZWxlY3RBbGwoJy5jaXJjbGVzJykuZGF0YShbdG90YWwxXSlcbiAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZXMnKS5hdHRyKCdjeScsIGhlaWdodCAvIDIpXG4gICAgICAgIC5hdHRyKCdjeCcsIChkLCBpKSA9PiB3aWR0aCAvIDIpXG4gICAgICAgIC5hdHRyKCdmaWxsJywgJyMwYTgwYWUnKVxuXG4gICAgc3ZnMi5zZWxlY3RBbGwoJy5jaXJjbGVzJykuZGF0YShbdG90YWwyXSlcbiAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gcnNjYWxlKGQpXG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGVzJykuYXR0cignY3knLCBoZWlnaHQgLyAyKVxuICAgICAgICAuYXR0cignY3gnLCAoZCwgaSkgPT4gd2lkdGggLyAyKVxuICAgICAgICAuYXR0cignZmlsbCcsICcjMGE4MGFlJylcbn0iLCIvLyBBIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGJhc2VkIGhlYXZpbHkgb2ZmIG9mIEthcnRoaWsgVGhvdGEncyB5b3V0dWJlIHR1dG9yaWFsIFwiSW50cm9kdWN0aW9uIHRvIGQzLmpzID0gUGllIENoYXJ0IGFuZCBEb251dCBDaGFydFwiXG4vLyBUaGUgbGVnZW5kIGNvZGUgd2FzIGZyb20gQ3J5cHRlcnMgSW5mb3RlY2gncyB5b3V0dWJlIHR1dG9yaWFsIFwiUGllIENoYXJ0IHVzaW5nIEQzLmpzXCJcblxuaW1wb3J0IHsgYXNzaWduQm94LCBmaW5kQW1vdW50LCBidWRnZXRDaXJjbGUgfSBmcm9tICcuL2hlbHBlcl9mdW5jdGlvbnMnXG5pbXBvcnQgeyBzdWJEYXRhLCBjc3NTdWJEYXRhRGlzcGxheSB9IGZyb20gJy4vZXZlbnRfaGFuZGxlcnMnXG4vLyBcbmNvbnN0IENPTE9SUyA9IFtcIiNhNjc1MWVcIiwgXCIjOWEwMDQ3XCIsIFwiIzY2YTUxZVwiLCBcIiM3NDcwYjNcIiwgXCIjZTgyYjhhXCJdXG5leHBvcnQgY29uc3QgQ0lSQ0xFX0NPTE9SUyA9IFtDT0xPUlNbMV0sIENPTE9SU1swXSwgQ09MT1JTWzRdLCBDT0xPUlNbMl0sIENPTE9SU1szXV1cbi8vIGV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJPdGhlciBUYXhlc1wiXVxuZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIk90aGVyIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgVGF4ZXNcIl1cbi8vIGV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihjc3ZQYXRoLCBzZWN0b3IsIGFtb3VudCwgc3RhdGUsIG11bHRpcGxpZXIgPSAxLCBza2lwID0gMSkge1xuZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCB0YXhfdHlwZSwgcGllX251bSwgY3N2ID0gXCIuL3NyYy9hc3NldHMvZGF0YS9GWTIwMTgtU1RDLURldGFpbGVkLVRhYmxlLmNzdlwiKSB7XG5cbiAgICAvLyBjb25zdCByZW1vdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvdGFscy1cIiArIHBpZV9udW0pXG4gICAgLy8gcmVtb3ZlID8gcmVtb3ZlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlKSA6IG51bGxcblxuICAgIC8vIGNvbnN0IHJlbW92ZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRldGFpbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZTIgPyByZW1vdmUyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlMikgOiBudWxsXG5cbiAgICBjb25zdCBoMSA9IGQzLnNlbGVjdCgnI3RvdGFscy1oZWFkZXItJyArIHBpZV9udW0pXG4gICAgY29uc3Qgc3BhbiA9IGQzLnNlbGVjdCgnI3RvdGFscy1zcGFuLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IGgyID0gZDMuc2VsZWN0KFwiI2RldGFpbHMtXCIgKyBwaWVfbnVtKVxuXG5cbiAgICBsZXQgVE9UQUwgPSAwO1xuICAgIGxldCBUWVBFUyA9IFtdXG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cblxuXG4gICAgY29uc3QgY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKENPTE9SUyk7XG5cbiAgICAvLyBhcmMgZ2VuZXJhdG9yXG4gICAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDEwKVxuICAgICAgICAvLyAuaW5uZXJSYWRpdXMoMCk7IC8vIGZvciBjaXJjbGVcbiAgICAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDEwMCkgLy8gZm9yIGRvbnV0XG5cbiAgICAvLyBjb25zdCBsYWJsZUFyYyA9IGQzLmFyYygpXG4gICAgLy8gICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSA1MClcbiAgICAvLyAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDUwKTtcblxuICAgIC8vIHBpZSBnZW5lcmF0b3JcbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgICAvLyAuc29ydChudWxsKVxuICAgICAgICAudmFsdWUoZCA9PiBkLmFtb3VudCk7XG5cbiAgICAvLyBkZWZpbmUgc3ZnIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIi5waWUtXCIgKyBwaWVfbnVtKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKVxuXG4gICAgLy8gaW1wb3J0IGRhdGFcbiAgICBkMy5jc3YoY3N2KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgYXJyYXlzIHRoYXQgd2lsbCBjb250YWluIHRoZSBzdWIgbGV2ZWwgdGF4IGRhdGFcbiAgICAgICAgbGV0IHNhbGVzX3RheGVzID0gW11cbiAgICAgICAgbGV0IGxpY2Vuc2VfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgaW5jb21lX3RheGVzID0gW11cbiAgICAgICAgbGV0IG90aGVyX3RheGVzID0gW11cbiAgICAgICAgLy8gbGV0IHNhbGVzX3RheF9vYmogPSB7IHRheF9ncm91cDogTEFCRUxTWzRdIH1cbiAgICAgICAgLy8gcGFyc2UgdGhlIGNzdlxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9IFwiVDAwXCIgJiYgZC5pdGVtICE9IFwiVDAxXCIpIHsgIC8vIGRvbid0IHdhbnQgdG8gY2F0Y2ggVG90YWwgb3IgUHJvcGVydHkgVGF4ZXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRheF9vYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudF9vZl90b3RhbDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkLml0ZW0uc2xpY2UoMCwyKSkgeyAvLyBmaWxsIHVwIHN1YiBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iaikgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzYWxlc190YXhfb2JqW2QuVGF4X1R5cGVdID0gZmluZEFtb3VudChkLkFNT1VOVClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMlwiOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29tZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9ICdUMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUWVBFUy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZC5rZXkgPSBkLlRheF9UeXBlO1xuICAgICAgICAgICAgICAgICAgICBkLmFtb3VudCA9IGZpbmRBbW91bnQoZC5BTU9VTlQpO1xuICAgICAgICAgICAgICAgICAgICBkLnBlcmNlbnQgPSAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWluZXJfYXJyYXkgPSBbXSAgLy8gc2V0dGluZyB1cCBjb250YWluZXIgYXJyYXkgZm9yIHBhc3NpbmcgaW50byBjbGljayBoYW5kbGVyXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuICAgICAgICAvLyBzZXQgaDEgYWZ0ZXIgdG90YWwgaGFzIGJlZW4gZGVmaW5lZFxuICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgXCIpXG4gICAgICAgIHNwYW4udGV4dChcIiRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgaDIudGV4dChcIlwiKVxuICAgICAgICAvLyBhdHRlbXB0IGJ1ZGdldENpcmNsZSBjYWxsXG4gICAgICAgIGJ1ZGdldENpcmNsZShUT1RBTClcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwZXJjZW50YWdlcyBpbiB0aGUgY2VudGVyIGJveFxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgYXJjKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBkID0+IGNvbG9ycyhkLmRhdGEua2V5KSlcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbignZCcsIHBpZVR3ZWVuKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHBhdGgub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIC8vIHdoeSBkb2Vzbid0IHRoaXMgd29yaz9cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gICAgICAgICAgICAgLmR1cmF0aW9uKCc1MCcpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIGRldGVybWluZSBob3cgdG8gZmxpcCB0aGUgcGllc1xuICAgICAgICBpZiAocGllX251bSA9PT0gMikgey8vIGZsaXAgdGhlIHNlY29uZCBwaWVcbiAgICAgICAgICAgIGcuYXR0cihcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVgoLTEpIHRyYW5zbGF0ZSgzMDBweCwgMHB4KSBzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgZy5vbihcIm1vdXNlb3ZlclwiLCAoZCwgaSkgPT4geyAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbignNTAnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgJ3BvaW50ZXInKVxuICAgICAgICB9KVxuICAgICAgICAub24oXCJtb3VzZW91dFwiLCBlbGUgPT4ge1xuICAgICAgICAgICAgLy8gaDEudGV4dChzdGF0ZSArIFwiJ3MgdGF4IHJldmVudWUgZm9yIDIwMTggd2FzICRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgICAgIC8vIGgyLnRleHQoXCJcIilcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljaycsIHN1YkRhdGEoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSlcblxuICAgICAgICBjb25zdCBzcGFuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbHMtc3Bhbi0xJylcbiAgICAgICAgY29uc3Qgc3BhbjIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWxzLXNwYW4tMicpXG5cbiAgICAgICAgaWYgKHNwYW4xLmlubmVyVGV4dFxuICAgICAgICAgICAgJiYgc3BhbjIuaW5uZXJUZXh0KSB7XG4gICAgICAgICAgICBjb25zdCB0b3RhbDEgPSBwYXJzZUludChzcGFuMS5pbm5lclRleHQuc2xpY2UoMSkuc3BsaXQoJywnKS5qb2luKCcnKSlcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsMiA9IHBhcnNlSW50KHNwYW4yLmlubmVyVGV4dC5zbGljZSgxKS5zcGxpdCgnLCcpLmpvaW4oJycpKVxuICAgICAgICAgICAgYnVkZ2V0Q2lyY2xlKHRvdGFsMSwgdG90YWwyKVxuICAgICAgICB9ICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHsgaWYgKGVycm9yKSB0aHJvdyBlcnJvciB9KVxuICAgIFxuICAgIGNvbnN0IHBpZVR3ZWVuID0gYiA9PiB7XG4gICAgICAgIGIuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZTogMCB9LCBiKVxuICAgICAgICByZXR1cm4gKHQpID0+IHsgcmV0dXJuIGFyYyhpKHQpKSB9XG4gICAgfSAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgICIsImltcG9ydCB7IENJUkNMRV9DT0xPUlMsIExBQkVMU30gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgcGllTGVnZW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IG1hc3Rlcl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgbWFzdGVyX2xpc3QuY2xhc3NMaXN0LmFkZCgnbWFzdGVyLWxpc3QnKVxuXG4gICAgY29uc3QgbGVmdF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHRleHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCByaWdodF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgbGVmdF9saXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnQtbGlzdCcpICBcbiAgICB0ZXh0X2xpc3QuY2xhc3NMaXN0LmFkZCgndGV4dC1saXN0JykgIFxuICAgIHJpZ2h0X2xpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHQtbGlzdCcpIFxuXG4gICAgZm9yIChsZXQgaSA9IExBQkVMUy5sZW5ndGggLSAxIDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxlZnRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCB0ZXh0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgcmlnaHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIGxlZnRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdsZWZ0LWJveCcpXG4gICAgICAgIGxlZnRfYm94LmlkID0gKCdsZWZ0LWJveC0nICsgaSlcbiAgICAgICAgbGVmdF9ib3guc3R5bGUuY29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgcmlnaHRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdyaWdodC1ib3gnKVxuICAgICAgICByaWdodF9ib3guaWQgPSAoJ3JpZ2h0LWJveC0nICsgaSlcbiAgICAgICAgcmlnaHRfYm94LnN0eWxlLmNvbG9yID0gQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIHRleHRfYm94LmNsYXNzTGlzdC5hZGQoJ3RleHQtYm94JylcbiAgICAgICAgdGV4dF9ib3guaW5uZXJIVE1MID0gTEFCRUxTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgXCIgKyBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgbGVmdF9saXN0LmFwcGVuZENoaWxkKGxlZnRfYm94KVxuICAgICAgICB0ZXh0X2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9ib3gpXG4gICAgICAgIHJpZ2h0X2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfYm94KVxuICAgIH1cblxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKGxlZnRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfbGlzdClcbiAgICByZXR1cm4gbWFzdGVyX2xpc3Rcbn1cblxuY29uc3Qgc3VibGlzdHMgPSAobGFiZWwsIGNvbG9yKSA9PiB7XG4gICAgY29uc3QgbGlzdHMgPSBbXVxuXG5cbiAgICBsZXN0bGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0bGlzdCcpXG4gICAgdGV4dGxpc3QuY2xhc3NMaXN0LmFkZCgndGV4dGxpc3QnKVxuICAgIHJpZ2h0bGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodGxpc3QnKVxuXG4gICAgY29uc3QgbGVmdEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCByaWdodEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG5cbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsZWZ0Qm94KVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGkpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChyaWdodEJveClcbiAgICByZXR1cm4gc3VibGlzdFxufSIsImltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgVE9QX0xFVkVMID0gWydUMDAnLCAnVDAxJywgJ1RBMScsICdUQTMnLCAnVEE0JywgJ1RBNSddXG5jb25zdCBTVEFURV9OQU1FUyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggQ2Fyb2xpbmEnLCAnTm9ydGggRGFrb3RhJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ11cblxuLy8gZXhwb3J0IGNvbnN0IHNlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcblxuLy8gICAgIC8vIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpICAvLyByZXZpc2l0IGlmIHRpbWUgdG8gbWFrZSBjdXN0b20gc2VsZWN0XG4vLyAgICAgLy8gY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luaXRpYWwtY29udGFpbmVyJylcblxuLy8gICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIilcbi8vICAgICBzZWxlY3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuXG4vLyAgICAgY29uc3Qgc3RhdGVTZWxlY3RvciA9IGUgPT4ge1xuLy8gICAgICAgICBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4vLyAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbi8vICAgICAgICAgc3ZnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3ZnKVxuLy8gICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgVE9QX0xFVkVMLCBwaWVfbnVtKVxuXG4vLyAgICAgICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gXCItbGVmdFwiIDogXCItcmlnaHRcIlxuLy8gICAgICAgICAvLyBjb25zdCBoMiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzdGF0ZVwiICsgc2lkZSlbMF1cbi8vICAgICAgICAgLy8gaDIuaW5uZXJIVE1MID0gc3RhdGVcbi8vICAgICB9XG5cbi8vICAgICBTVEFURV9OQU1FUy5mb3JFYWNoKHN0YXRlID0+IHtcbi8vICAgICAgICAgY29uc3QgZGVmYXVsdF9zdGF0ZSA9IHBpZV9udW0gPT09IDEgPyBTVEFURV9OQU1FU1swXSA6IFNUQVRFX05BTUVTW1NUQVRFX05BTUVTLmxlbmd0aCAtIDFdXG4vLyAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcbi8vICAgICAgICAgaWYgKHN0YXRlID09PSBkZWZhdWx0X3N0YXRlKSB7XG4vLyAgICAgICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgdHJ1ZSlcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBvcHRpb24uaW5uZXJIVE1MID0gc3RhdGVcbi8vICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHN0YXRlKVxuLy8gICAgICAgICAvLyBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuLy8gICAgICAgICAvLyBvcHRpb24uc2V0QXR0cmlidXRlKFwib25jbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbi8vICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbilcbi8vICAgICB9KVxuLy8gICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHN0YXRlU2VsZWN0b3IpXG4vLyAgICAgLy8gY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdClcbi8vICAgICAvLyByZXR1cm4gY29udGFpbmVyXG4vLyAgICAgcmV0dXJuIHNlbGVjdFxuLy8gfVxuXG4vLyBjb25zdCBwaGFzZU91dCA9IChub2RlKSA9PiB7XG5cbi8vICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbi8vIH1cblxuZXhwb3J0IGNvbnN0IHN0YXRlX3NlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcbiBcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcInNlbGVjdC13cmFwcGVyLVwiICsgcGllX251bSlcbiAgICB3cmFwcGVyLmlkID0gXCJzZWxlY3Qtd3JhcHBlci1cIiArIHBpZV9udW1cblxuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgc2VsZWN0LmlubmVySFRNTCA9IHBpZV9udW0gPT09IDEgPyAnQWxhYmFtYScgOiAnV3lvbWluZydcbiAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwic2VsZWN0LVwiICsgcGllX251bSlcbiAgICBzZWxlY3QuaWQgPSBcInNlbGVjdC1cIiArIHBpZV9udW1cblxuICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgfSlcbiAgICBcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSAgLy8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHNvIHRoYXQgaWYgSSBjbGljayBhbnl3aGVyZSBlbHNlIHRoZSBsaXN0IGRpc2FwcGVhcnNcbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICB9KVxuICAgIFxuICAgIGNvbnN0IHN0YXRlU2VsZWN0b3IgPSBzdGF0ZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdC1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzZWxlY3QuaW5uZXJUZXh0ID0gc3RhdGVcbiAgICAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIHN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZylcbiAgICAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RhdGVfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ3N0YXRlLWxpc3QtJyArIHBpZV9udW0pXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIHN0YXRlX2xpc3QuaWQgPSAnc3RhdGUtbGlzdC0nICsgcGllX251bVxuICAgIFxuICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZV9saXN0X2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmlubmVySFRNTCA9IHN0YXRlXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzdGF0ZSlcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbiAgICAgICAgc3RhdGVfbGlzdC5hcHBlbmRDaGlsZChzdGF0ZV9saXN0X2l0ZW0pXG4gICAgfSlcbiAgICBcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNlbGVjdClcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHN0YXRlX2xpc3QpXG4gICAgXG4gICAgcmV0dXJuIHdyYXBwZXJcbn1cblxuLy8gY29uc3QgcGhhc2VPdXQgPSAobm9kZSkgPT4ge1xuXG4vLyAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4vLyB9IiwiXG5pbXBvcnQgeyBQaWVDaGFydEdlbmVyYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgcGllTGVnZW5kIH0gZnJvbSAnLi9jb21wb25lbnRzL3BpZV9sZWdlbmQnXG5pbXBvcnQgeyBzdGF0ZV9zZWxlY3RvciwgVE9QX0xFVkVMIH0gZnJvbSAnLi9jb21wb25lbnRzL3N0YXRlX3NlbGVjdG9yJ1xuaW1wb3J0IHsgYnVkZ2V0Q2lyY2xlIH0gZnJvbSAnLi9jb21wb25lbnRzL2hlbHBlcl9mdW5jdGlvbnMnXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJ1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgXG4gICAgLy8gUENHIC0+IGNzdlBhdGgsIHNlY3RvciwgYW1vdXQsIGxvY2F0aW9uLCBtdWx0aXBsaWVyLCBza2lwXG4gICAgXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKVxuICAgIC8vIGNvbnN0IHVsID0gcGllTGVnZW5kKClcbiAgICBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3Qgc2VsZWN0XzEgPSBzdGF0ZV9zZWxlY3RvcigxKVxuICAgIGNvbnN0IHNlbGVjdF8yID0gc3RhdGVfc2VsZWN0b3IoMilcbiAgICBjb25zdCBzZWxlY3Rvcl9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VsZWN0b3ItY29udGFpbmVyXCIpWzBdXG4gICAgXG4gICAgY29uc3QgeWVhclNlbGVjdG9yID0geWVhclNlbGVjdG9yXG5cbiAgICBzZWxlY3Rvcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0XzEpXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8yKVxuICAgIHJvb3QuYXBwZW5kQ2hpbGQodWwpXG5cbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIkFsYWJhbWFcIiwgVE9QX0xFVkVMLCAxKVxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKFwiV3lvbWluZ1wiLCBUT1BfTEVWRUwsIDIpXG5cbiAgICBcbn0pXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9