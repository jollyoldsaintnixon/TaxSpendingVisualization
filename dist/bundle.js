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
// container_array.push(sales_taxes)
// container_array.push(license_taxes)
// container_array.push(income_taxes)
// container_array.push(other_taxes)

var subData = exports.subData = function subData(container_array, pie_num) {
    // a lot of this code was learned from Michael Stanaland's "Stacked bar chart with tooltips" tutorial at http://bl.ocks.org/mstanaland/6100713
    return function (ele) {

        var tax_type = ele.data.key;

        var sub_array = subArrayLocator(tax_type, container_array);

        // setting up the tax stack to comply with d3 v5
        var tax_stack = {
            tax_type: tax_type
            // setting up keys
        };var keys = [];
        sub_array.forEach(function (sub_tax, i) {
            keys.push(sub_tax.key);
            tax_stack[sub_tax.key] = sub_tax.amount;
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

        var layers = stack(sub_array);

        // const x = d3.scaleOrdinal()
        //     .domain(layers[0].map(d => d.x))
        //     // .range([10, width], 0)  // may be a quicker way to do this as there is only one bar
        //     .range([width])
        var x = d3.scaleBand().range([0, width]).padding(0.1);

        var y = d3.scaleLinear().domain(layers[0].map(function (d) {
            return d3.max(d, function (d) {
                return d.y0 + d.y;
            }); // the increment up to the total
        })).range([height, 0]);

        var g = svg.selectAll(".sub-taxes") // no g at this point, but they will have this class
        .data(layers).enter() // now there will be a g for every obj in sub_array.  should be just one g
        .append("g").attr("class", "sub-taxes");

        var rect = g.selectAll("rect") // making each obj of the correspond to a rect within the g
        .data(function (d) {
            return d;
        }) // pulling out each individual obj
        .enter().append("rect").attr('x', function (d) {
            return x(d.x);
        }) // passing each obj's x value to the d3 x function defined above
        .attr('y', function (d) {
            return y(d.y + d.y0);
        }) // y0 is the height where each segment in the stack starts
        .attr('width', x.range()) // probably can hard code, since only one bar
        .attr('height', function (d) {
            return y(d.y0) - y(d.y0 + d.y);
        }) // height is set to the starting point plus the height, and all that subtracted from the starting point due to y values begining at top of screen
        .on('mouseover', function () {
            return tooltip.style("display", true);
        }) // want the info box to switch between visible and inivis based on mouseover
        .on('mouseout', function () {
            return tooltip.style("display", "none");
        }).on('mousemove', function (d) {
            // this is going to be a sweet effect!
            var xPos = d3.mouse(undefined)[0] - tooltipWidth / 2; // this[0] corresponds to mouse's x pos, and pushing it left by half of the tooltip's width ensure it is centered
            var yPos = d3.mouse(undefined)[1] - 25; // puts the tooltip up a bit above the cursor
            tooltip.attr("transform", "translate(" + xPos + ',' + yPos + ')');
            tooltip.select('text').text(d.percent); // shows the percent  
        });

        var tooltip = svg.append('g') // setting up this sweet tooltip. Exciting!
        .attr('class', 'sub-data-tooltip tooltip').style('display', 'none') // starts invisible
        // adding the dimensions of the box
        .append('rect').attr('width', tooltipWidth).attr('height', tooltipHeight).attr('fill', 'white').style('opacity', 0.5) // making it partially see-through
        // adding the text content
        .append('text').attr('x', 15).attr('dy', '.8em').style('text-anchor', 'middle');
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
    });

    svg2.selectAll('.circles').data([total2]).enter().append('circle').attr('r', function (d) {
        return rscale(d);
    }).attr('class', 'circles').attr('cy', height / 2).attr('cx', function (d, i) {
        return width / 2;
    });
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
        });
        g.on("mouseout", function (ele) {
            // h1.text(state + "'s tax revenue for 2018 was $" + d3.format(',')(TOTAL))
            // h2.text("")
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZXZlbnRfaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYXBwLnNjc3MiXSwibmFtZXMiOlsic3ViRGF0YSIsImNvbnRhaW5lcl9hcnJheSIsInBpZV9udW0iLCJlbGUiLCJ0YXhfdHlwZSIsImRhdGEiLCJrZXkiLCJzdWJfYXJyYXkiLCJzdWJBcnJheUxvY2F0b3IiLCJ0YXhfc3RhY2siLCJrZXlzIiwiZm9yRWFjaCIsInN1Yl90YXgiLCJpIiwicHVzaCIsImFtb3VudCIsIndpZHRoIiwiaGVpZ2h0IiwidG9vbHRpcFdpZHRoIiwidG9vbHRpcEhlaWdodCIsInN2ZyIsImQzIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInN0YWNrIiwib3JkZXIiLCJzdGFja09yZGVyTm9uZSIsIm9mZnNldCIsInN0YWNrT2Zmc2V0Tm9uZSIsImxheWVycyIsIngiLCJzY2FsZUJhbmQiLCJyYW5nZSIsInBhZGRpbmciLCJ5Iiwic2NhbGVMaW5lYXIiLCJkb21haW4iLCJtYXAiLCJtYXgiLCJkIiwieTAiLCJnIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJyZWN0Iiwib24iLCJ0b29sdGlwIiwic3R5bGUiLCJ4UG9zIiwibW91c2UiLCJ5UG9zIiwidGV4dCIsInBlcmNlbnQiLCJjc3NTdWJEYXRhRGlzcGxheSIsInJlbW92ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJ0b3RhbCIsIm9iaiIsInJvb3QiLCJ1bCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJpZCIsImxpIiwicGVyY2VudF9vZl90b3RhbCIsImFwcGVuZENoaWxkIiwiZ3JvdXBUb3RhbCIsImFycmF5IiwiYXNzaWduQm94IiwiYXJyYXlfb2Zfb2JqcyIsInNpZGUiLCJib3giLCJkZWNpbWFscyIsIlN0cmluZyIsInNwbGl0IiwiaW50ZWdlcnMiLCJzbGljZWQiLCJzbGljZSIsImlubmVySFRNTCIsImZpbmRBbW91bnQiLCJqb2luIiwiYnVkZ2V0Q2lyY2xlIiwidG90YWwxIiwidG90YWwyIiwiTWF0aCIsInNxcnQiLCJvbGRfY2lybGNlXzEiLCJvbGRfY2lybGNlXzIiLCJjaXJjbGVfY29udGFpbmVyIiwic3ZnMSIsInN2ZzIiLCJyc2NhbGUiLCJQaWVDaGFydEdlbmVyYXRvciIsIkNPTE9SUyIsIkNJUkNMRV9DT0xPUlMiLCJMQUJFTFMiLCJzdGF0ZSIsImNzdiIsImgxIiwic3BhbiIsImgyIiwiVE9UQUwiLCJUWVBFUyIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInJhZGl1cyIsImNvbG9ycyIsInNjYWxlT3JkaW5hbCIsImFyYyIsIm91dGVyUmFkaXVzIiwiaW5uZXJSYWRpdXMiLCJwaWUiLCJ2YWx1ZSIsInRoZW4iLCJzYWxlc190YXhlcyIsImxpY2Vuc2VfdGF4ZXMiLCJpbmNvbWVfdGF4ZXMiLCJvdGhlcl90YXhlcyIsIkdlb19OYW1lIiwiaXRlbSIsIkFNT1VOVCIsInRheF9vYmoiLCJUYXhfVHlwZSIsImluY2x1ZGVzIiwiZm9ybWF0IiwicGF0aCIsInRyYW5zaXRpb24iLCJlYXNlIiwiZWFzZUxpbmVhciIsImR1cmF0aW9uIiwiYXR0clR3ZWVuIiwicGllVHdlZW4iLCJjb25zb2xlIiwibG9nIiwic3BhbjEiLCJzcGFuMiIsImlubmVyVGV4dCIsInBhcnNlSW50IiwiY2F0Y2giLCJlcnJvciIsImIiLCJpbnRlcnBvbGF0ZSIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsInQiLCJwaWVMZWdlbmQiLCJtYXN0ZXJfbGlzdCIsImxlZnRfbGlzdCIsInRleHRfbGlzdCIsInJpZ2h0X2xpc3QiLCJsZW5ndGgiLCJsZWZ0X2JveCIsInRleHRfYm94IiwicmlnaHRfYm94IiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXIiLCJzdWJsaXN0cyIsImxhYmVsIiwibGlzdHMiLCJsZXN0bGlzdCIsInRleHRsaXN0IiwicmlnaHRsaXN0IiwibGVmdEJveCIsInJpZ2h0Qm94Iiwic3VibGlzdCIsIlRPUF9MRVZFTCIsIlNUQVRFX05BTUVTIiwic3RhdGVfc2VsZWN0b3IiLCJ3cmFwcGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJzdGF0ZV9saXN0IiwidG9nZ2xlIiwiYm9keSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3RhdGVTZWxlY3RvciIsInN0YXRlX2xpc3RfaXRlbSIsInNldEF0dHJpYnV0ZSIsInNlbGVjdF8xIiwic2VsZWN0XzIiLCJzZWxlY3Rvcl9jb250YWluZXIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwieWVhclNlbGVjdG9yIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlD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OztBQUVBLFFBQU1wSCxPQUFPTixTQUFTQyxjQUFULENBQXdCLE1BQXhCLENBQWI7QUFDQTtBQUNBLFFBQU1NLEtBQUssNEJBQVg7QUFDQSxRQUFNNkgsV0FBVyxvQ0FBZSxDQUFmLENBQWpCO0FBQ0EsUUFBTUMsV0FBVyxvQ0FBZSxDQUFmLENBQWpCO0FBQ0EsUUFBTUMscUJBQXFCdEksU0FBU3VJLHNCQUFULENBQWdDLG9CQUFoQyxFQUFzRCxDQUF0RCxDQUEzQjs7QUFFQSxRQUFNQyxlQUFlQSxZQUFyQjs7QUFFQUYsdUJBQW1CeEgsV0FBbkIsQ0FBK0JzSCxRQUEvQjtBQUNBRSx1QkFBbUJ4SCxXQUFuQixDQUErQnVILFFBQS9CO0FBQ0EvSCxTQUFLUSxXQUFMLENBQWlCUCxFQUFqQjs7QUFFQSxnREFBa0IsU0FBbEIsRUFBNkIrRyx5QkFBN0IsRUFBd0MsQ0FBeEM7QUFDQSxnREFBa0IsU0FBbEIsRUFBNkJBLHlCQUE3QixFQUF3QyxDQUF4QztBQUdILENBckJELEU7Ozs7Ozs7Ozs7O0FDUEEsdUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBjb250YWluZXJfYXJyYXkucHVzaChzYWxlc190YXhlcylcbi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKGxpY2Vuc2VfdGF4ZXMpXG4vLyBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4vLyBjb250YWluZXJfYXJyYXkucHVzaChvdGhlcl90YXhlcylcblxuZXhwb3J0IGNvbnN0IHN1YkRhdGEgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSA9PiB7XG4gICAgLy8gYSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBsZWFybmVkIGZyb20gTWljaGFlbCBTdGFuYWxhbmQncyBcIlN0YWNrZWQgYmFyIGNoYXJ0IHdpdGggdG9vbHRpcHNcIiB0dXRvcmlhbCBhdCBodHRwOi8vYmwub2Nrcy5vcmcvbXN0YW5hbGFuZC82MTAwNzEzXG4gICAgcmV0dXJuIChlbGUpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRheF90eXBlID0gZWxlLmRhdGEua2V5XG5cbiAgICAgICAgY29uc3Qgc3ViX2FycmF5ID0gc3ViQXJyYXlMb2NhdG9yKHRheF90eXBlLCBjb250YWluZXJfYXJyYXkpXG5cbiAgICAgICAgLy8gc2V0dGluZyB1cCB0aGUgdGF4IHN0YWNrIHRvIGNvbXBseSB3aXRoIGQzIHY1XG4gICAgICAgIGxldCB0YXhfc3RhY2sgPSB7IFxuICAgICAgICAgICAgdGF4X3R5cGU6IHRheF90eXBlLFxuICAgICAgICB9XG4gICAgICAgIC8vIHNldHRpbmcgdXAga2V5c1xuICAgICAgICBsZXQga2V5cyA9IFtdXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKChzdWJfdGF4LCBpKSA9PiB7XG4gICAgICAgICAgICBrZXlzLnB1c2goc3ViX3RheC5rZXkpXG4gICAgICAgICAgICB0YXhfc3RhY2tbc3ViX3RheC5rZXldID0gc3ViX3RheC5hbW91bnRcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBjb25zdCB3aWR0aCA9IDkwICAvLyBzZXR0aW5nIHRoZSBkaW1lbnNpb25zIHRvIGNvcnJlc3BvbmQgdG8gdGhlIHBpZSBjaGFydHMnXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDYwMFxuXG4gICAgICAgIGNvbnN0IHRvb2x0aXBXaWR0aCA9IDEyMCAvLyB3aWxsIGFsdGVyIHRoZXNlIGFzIG5lZWRlZFxuICAgICAgICBjb25zdCB0b29sdGlwSGVpZ2h0ID0gNDAgXG5cbiAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwibWFpblwiKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcblxuICAgICAgICAvLyBzZXQgdGhlIGxheWVycyBvZiB0aGUgc3RhY2tlZCBiYXJcbiAgICAgICAgLy8gY29uc3QgbGF5ZXJzID0gZDMuc3RhY2soKShbdGF4X3R5cGVdLm1hcCh0YXggPT4geyAgLy8gc2hvdWxkIHVsdGltYXRlbHkganVzdCBiZSB0aGUgb25lIGxheWVyXG4gICAgICAgIC8vICAgICByZXR1cm4gc3ViX2FycmF5Lm1hcChkID0+IHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4geyB4OiBkLmtleSwgeTogZC5hbW91bnQsIHBlcmNlbnQ6IGQucGVyY2VudCB9XG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyB9KSlcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBkMy5zdGFjaygpXG4gICAgICAgICAgICAua2V5cyhrZXlzKVxuICAgICAgICAgICAgLm9yZGVyKGQzLnN0YWNrT3JkZXJOb25lKVxuICAgICAgICAgICAgLm9mZnNldChkMy5zdGFja09mZnNldE5vbmUpXG5cbiAgICAgICAgY29uc3QgbGF5ZXJzID0gc3RhY2soc3ViX2FycmF5KVxuXG4gICAgICAgIC8vIGNvbnN0IHggPSBkMy5zY2FsZU9yZGluYWwoKVxuICAgICAgICAvLyAgICAgLmRvbWFpbihsYXllcnNbMF0ubWFwKGQgPT4gZC54KSlcbiAgICAgICAgLy8gICAgIC8vIC5yYW5nZShbMTAsIHdpZHRoXSwgMCkgIC8vIG1heSBiZSBhIHF1aWNrZXIgd2F5IHRvIGRvIHRoaXMgYXMgdGhlcmUgaXMgb25seSBvbmUgYmFyXG4gICAgICAgIC8vICAgICAucmFuZ2UoW3dpZHRoXSlcbiAgICAgICAgY29uc3QgeCA9IGQzLnNjYWxlQmFuZCgpXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAgICAgICAgIC5wYWRkaW5nKDAuMSlcblxuICAgICAgICBjb25zdCB5ID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihsYXllcnNbMF0ubWFwKGQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkMy5tYXgoZCwgZCA9PiBkLnkwICsgZC55KSAgLy8gdGhlIGluY3JlbWVudCB1cCB0byB0aGUgdG90YWxcbiAgICAgICAgICAgIH0pKS5yYW5nZShbaGVpZ2h0LCAwXSlcblxuICAgICAgICBjb25zdCBnID0gc3ZnLnNlbGVjdEFsbChcIi5zdWItdGF4ZXNcIikgIC8vIG5vIGcgYXQgdGhpcyBwb2ludCwgYnV0IHRoZXkgd2lsbCBoYXZlIHRoaXMgY2xhc3NcbiAgICAgICAgICAgIC5kYXRhKGxheWVycykuZW50ZXIoKSAgLy8gbm93IHRoZXJlIHdpbGwgYmUgYSBnIGZvciBldmVyeSBvYmogaW4gc3ViX2FycmF5LiAgc2hvdWxkIGJlIGp1c3Qgb25lIGdcbiAgICAgICAgICAgIC5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBcInN1Yi10YXhlc1wiKSAgXG4gICAgICAgICAgICBcbiAgICAgICAgY29uc3QgcmVjdCA9IGcuc2VsZWN0QWxsKFwicmVjdFwiKSAgLy8gbWFraW5nIGVhY2ggb2JqIG9mIHRoZSBjb3JyZXNwb25kIHRvIGEgcmVjdCB3aXRoaW4gdGhlIGdcbiAgICAgICAgICAgIC5kYXRhKGQgPT4gZCkgLy8gcHVsbGluZyBvdXQgZWFjaCBpbmRpdmlkdWFsIG9ialxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBkID0+IHgoZC54KSkgIC8vIHBhc3NpbmcgZWFjaCBvYmoncyB4IHZhbHVlIHRvIHRoZSBkMyB4IGZ1bmN0aW9uIGRlZmluZWQgYWJvdmVcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZCA9PiB5KGQueSArIGQueTApKSAgLy8geTAgaXMgdGhlIGhlaWdodCB3aGVyZSBlYWNoIHNlZ21lbnQgaW4gdGhlIHN0YWNrIHN0YXJ0c1xuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgeC5yYW5nZSgpKSAgLy8gcHJvYmFibHkgY2FuIGhhcmQgY29kZSwgc2luY2Ugb25seSBvbmUgYmFyXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgZCA9PiB5KGQueTApIC0geShkLnkwICsgZC55KSkgIC8vIGhlaWdodCBpcyBzZXQgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IHBsdXMgdGhlIGhlaWdodCwgYW5kIGFsbCB0aGF0IHN1YnRyYWN0ZWQgZnJvbSB0aGUgc3RhcnRpbmcgcG9pbnQgZHVlIHRvIHkgdmFsdWVzIGJlZ2luaW5nIGF0IHRvcCBvZiBzY3JlZW5cbiAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgKCkgPT4gdG9vbHRpcC5zdHlsZShcImRpc3BsYXlcIiwgdHJ1ZSkpICAvLyB3YW50IHRoZSBpbmZvIGJveCB0byBzd2l0Y2ggYmV0d2VlbiB2aXNpYmxlIGFuZCBpbml2aXMgYmFzZWQgb24gbW91c2VvdmVyXG4gICAgICAgICAgICAub24oJ21vdXNlb3V0JywgKCkgPT4gdG9vbHRpcC5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpKVxuICAgICAgICAgICAgLm9uKCdtb3VzZW1vdmUnLCBkID0+IHsgIC8vIHRoaXMgaXMgZ29pbmcgdG8gYmUgYSBzd2VldCBlZmZlY3QhXG4gICAgICAgICAgICAgICAgY29uc3QgeFBvcyA9IGQzLm1vdXNlKHRoaXMpWzBdIC0gKHRvb2x0aXBXaWR0aCAvIDIpIC8vIHRoaXNbMF0gY29ycmVzcG9uZHMgdG8gbW91c2UncyB4IHBvcywgYW5kIHB1c2hpbmcgaXQgbGVmdCBieSBoYWxmIG9mIHRoZSB0b29sdGlwJ3Mgd2lkdGggZW5zdXJlIGl0IGlzIGNlbnRlcmVkXG4gICAgICAgICAgICAgICAgY29uc3QgeVBvcyA9IGQzLm1vdXNlKHRoaXMpWzFdIC0gMjUgLy8gcHV0cyB0aGUgdG9vbHRpcCB1cCBhIGJpdCBhYm92ZSB0aGUgY3Vyc29yXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgeFBvcyArICcsJyArIHlQb3MgKyAnKScpXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJ3RleHQnKS50ZXh0KGQucGVyY2VudCkgLy8gc2hvd3MgdGhlIHBlcmNlbnQgIFxuICAgICAgICAgICAgfSlcblxuICAgICAgICBjb25zdCB0b29sdGlwID0gc3ZnLmFwcGVuZCgnZycpIC8vIHNldHRpbmcgdXAgdGhpcyBzd2VldCB0b29sdGlwLiBFeGNpdGluZyFcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS10b29sdGlwIHRvb2x0aXAnKS5zdHlsZSgnZGlzcGxheScsICdub25lJykgLy8gc3RhcnRzIGludmlzaWJsZVxuICAgICAgICAgICAgLy8gYWRkaW5nIHRoZSBkaW1lbnNpb25zIG9mIHRoZSBib3hcbiAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKS5hdHRyKCd3aWR0aCcsIHRvb2x0aXBXaWR0aClcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0b29sdGlwSGVpZ2h0KS5hdHRyKCdmaWxsJywgJ3doaXRlJykuc3R5bGUoJ29wYWNpdHknLCAwLjUpIC8vIG1ha2luZyBpdCBwYXJ0aWFsbHkgc2VlLXRocm91Z2hcbiAgICAgICAgICAgIC8vIGFkZGluZyB0aGUgdGV4dCBjb250ZW50XG4gICAgICAgICAgICAuYXBwZW5kKCd0ZXh0JykuYXR0cigneCcsIDE1KVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgJy44ZW0nKS5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICB9XG4gICAgXG59XG5cbmNvbnN0IHN1YkFycmF5TG9jYXRvciA9ICh0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KSA9PiB7ICAvLyBoZWxwZXIgZnVuY3Rpb24gZm9yIGZpbmRpbmcgdGhlIHJpZ2h0IHN1YiBhcnJheS4gQSBiaXQgaGFyZC1jb2RlZC5cbiAgICBzd2l0Y2ggKHRheF90eXBlKSB7XG4gICAgICAgIGNhc2UgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMF1cbiAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjogXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzFdXG4gICAgICAgIGNhc2UgXCJJbmNvbWUgVGF4ZXNcIjogXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzJdXG4gICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOiBcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbM11cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBjc3NTdWJEYXRhRGlzcGxheSA9IChjb250YWluZXJfYXJyYXksIHBpZV9udW0pID0+IHtcblxuICAgIGNvbnN0IHdpZHRoID0gOTAgIC8vIHNldHRpbmcgdGhlIGRpbWVuc2lvbnMgdG8gY29ycmVzcG9uZCB0byB0aGUgcGllIGNoYXJ0cydcbiAgICBjb25zdCBoZWlnaHQgPSA2MDBcblxuICAgIHJldHVybiAoZWxlKSA9PiB7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWItZGF0YS1saXN0LVwiICsgcGllX251bSlcbiAgICAgICAgcmVtb3ZlID8gcmVtb3ZlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlKSA6IG51bGxcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRheF90eXBlID0gZWxlLmRhdGEua2V5XG4gICAgICAgIGNvbnN0IHN1Yl9hcnJheSA9IHN1YkFycmF5TG9jYXRvcih0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KSAvLyBnZXQgcmlnaHQgc3ViX2FycmF5XG4gICAgICAgIC8vIGNvbnN0IGdyb3VwVG90YWwgPSBncm91cFRvdGFsKHN1Yl9hcnJheSkgLy8gbm90IHN1cmUgd2h5IHRoaXMgaXMgbm90IGludm9raW5nIHRoZSBmdW5jaXRvbiBiZWxvd1xuICAgICAgICBsZXQgdG90YWwgPSAwXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICB0b3RhbCArPSBvYmouYW1vdW50XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpIC8vIGdyYWIgdGhlIHJvb3QgdG8gYXR0YWNoIGxhdGVyXG5cbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIikgLy8gc2V0IHVwIHVsIGNvbnRhaW5lclxuICAgICAgICB1bC5jbGFzc0xpc3QuYWRkKFwic3ViLWRhdGEtbGlzdC1cIiArIHBpZV9udW0pXG4gICAgICAgIHVsLmlkID0gKFwic3ViLWRhdGEtbGlzdC1cIiArIHBpZV9udW0pXG5cbiAgICAgICAgc3ViX2FycmF5LmZvckVhY2goc3ViX3RheCA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgIGxpLnN0eWxlLmhlaWdodCA9IChzdWJfdGF4LnBlcmNlbnRfb2ZfdG90YWwgKiA2KSArICdweCdcbiAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKVxuICAgICAgICB9KTtcblxuICAgICAgICByb290LmFwcGVuZENoaWxkKHVsKVxuICAgIH1cbn1cblxuY29uc3QgZ3JvdXBUb3RhbCA9IGFycmF5ID0+IHtcbiAgICBsZXQgdG90YWwgPSAwXG4gICAgYXJyYXkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICB0b3RhbCArPSBvYmouYW1vdW50XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvdGFsXG59IiwiXG5cbmV4cG9ydCBjb25zdCBhc3NpZ25Cb3ggPSAoYXJyYXlfb2Zfb2JqcywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQtYm94LScgOiAncmlnaHQtYm94LSdcbiAgICBhcnJheV9vZl9vYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGkgPSA0O1xuICAgICAgICBzd2l0Y2ggKG9iai5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAwIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAxIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMiBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAzIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBpKVxuICAgICAgICBjb25zdCBkZWNpbWFscyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVsxXVxuICAgICAgICBjb25zdCBpbnRlZ2VycyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVswXVxuICAgICAgICBjb25zdCBzbGljZWQgPSBvYmoucGVyY2VudCA/IGludGVnZXJzICsgJy4nICsgZGVjaW1hbHMuc2xpY2UoMCwgMikgOiAwXG4gICAgICAgIGJveC5pbm5lckhUTUwgPSBzbGljZWQgKyAnJSdcbiAgICB9KTtcbn1cblxuLy8gZC5BTU9VTlQgPT09ICdYJyA/IDAgOiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMCxcbmV4cG9ydCBjb25zdCBmaW5kQW1vdW50ID0gKGFtb3VudCkgPT4ge1xuICAgIHJldHVybiBhbW91bnQgPT09ICdYJyA/IDAgOiBhbW91bnQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDBcbn1cblxuLy8gZXhwb3J0IGNvbnN0IHN1YkRhdGFQdXNoZXIgPSAoaXRlbSkgPT4ge1xuLy8gICAgIGlmIChpdGVtICE9IFwiVDAwXCIgJiYgaXRlbSAhPSBcIlQwMVwiKSB7XG4vLyAgICAgICAgIHN3aXRjaCAoaXRlbS5zbGljZSgwLCAyKSkge1xuLy8gICAgICAgICAgICAgY2FzZSAoXCJUMFwiIHx8IFwiVDFcIik6XG4vLyAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh7XG4vLyAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbi8vICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbi8vICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICBcbi8vICAgICAgICAgICAgIGNhc2UgXCJUMlwiOlxuLy8gICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh7XG4gICAgXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1cblxuZXhwb3J0IGNvbnN0IGJ1ZGdldENpcmNsZSA9ICh0b3RhbDEsIHRvdGFsMikgPT4ge1xuICAgIC8vIGJhc2VkIG9uIE1hdHRoZXcgTWNLZW5uYSdzIGV4YW1wbGUgYXQgaHR0cDovL2JsLm9ja3Mub3JnL21wbWNrZW5uYTgvcmF3LzU2NjUwOWRkM2Q5YTA4ZTVmOWIyL1xuICAgIGlmICghdG90YWwxIHx8ICF0b3RhbDIpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRvdGFsMSA9IE1hdGguc3FydCh0b3RhbDEpXG4gICAgdG90YWwyID0gTWF0aC5zcXJ0KHRvdGFsMilcbiAgICAvLyBkZWxldGUgb2xkIGNpcmNsZXNcbiAgICBjb25zdCBvbGRfY2lybGNlXzEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLXN2Zy0xJylcbiAgICBjb25zdCBvbGRfY2lybGNlXzIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLXN2Zy0yJylcbiAgICBvbGRfY2lybGNlXzEgPyBvbGRfY2lybGNlXzEucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGRfY2lybGNlXzEpIDogbnVsbFxuICAgIG9sZF9jaXJsY2VfMiA/IG9sZF9jaXJsY2VfMi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZF9jaXJsY2VfMikgOiBudWxsXG4gICAgXG4gICAgY29uc3QgZGF0YSA9IFt0b3RhbDEsIHRvdGFsMl1cblxuICAgIGNvbnN0IGhlaWdodCA9IDMwMFxuICAgIGNvbnN0IHdpZHRoID0gNTAwXG5cbiAgICBjb25zdCBjaXJjbGVfY29udGFpbmVyID0gZDMuc2VsZWN0KCcjYnVkZ2V0LWNpcmNsZS1jb250YWluZXInKVxuXG4gICAgY29uc3Qgc3ZnMSA9IGNpcmNsZV9jb250YWluZXIuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpLmF0dHIoJ2lkJywgJ2NpcmNsZS1zdmctMScpO1xuXG4gICAgY29uc3Qgc3ZnMiA9IGNpcmNsZV9jb250YWluZXIuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpLmF0dHIoJ2lkJywgJ2NpcmNsZS1zdmctMicpO1xuXG4gICAgY29uc3QgcnNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKFswLCAoZDMubWF4KGRhdGEpKSBdKVxuICAgICAgICAucmFuZ2UoWzEsIDE1MF0pXG5cbiAgICBzdmcxLnNlbGVjdEFsbCgnLmNpcmNsZXMnKS5kYXRhKFt0b3RhbDFdKVxuICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJzY2FsZShkKVxuICAgICAgICB9KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlcycpLmF0dHIoJ2N5JywgaGVpZ2h0IC8gMilcbiAgICAgICAgLmF0dHIoJ2N4JywgKGQsIGkpID0+IHdpZHRoIC8gMilcblxuICAgIHN2ZzIuc2VsZWN0QWxsKCcuY2lyY2xlcycpLmRhdGEoW3RvdGFsMl0pXG4gICAgICAgIC5lbnRlcigpLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJzY2FsZShkKVxuICAgICAgICB9KVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlcycpLmF0dHIoJ2N5JywgaGVpZ2h0IC8gMilcbiAgICAgICAgLmF0dHIoJ2N4JywgKGQsIGkpID0+IHdpZHRoIC8gMilcbn0iLCIvLyBBIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGJhc2VkIGhlYXZpbHkgb2ZmIG9mIEthcnRoaWsgVGhvdGEncyB5b3V0dWJlIHR1dG9yaWFsIFwiSW50cm9kdWN0aW9uIHRvIGQzLmpzID0gUGllIENoYXJ0IGFuZCBEb251dCBDaGFydFwiXG4vLyBUaGUgbGVnZW5kIGNvZGUgd2FzIGZyb20gQ3J5cHRlcnMgSW5mb3RlY2gncyB5b3V0dWJlIHR1dG9yaWFsIFwiUGllIENoYXJ0IHVzaW5nIEQzLmpzXCJcblxuaW1wb3J0IHsgYXNzaWduQm94LCBmaW5kQW1vdW50LCBidWRnZXRDaXJjbGUgfSBmcm9tICcuL2hlbHBlcl9mdW5jdGlvbnMnXG5pbXBvcnQgeyBzdWJEYXRhLCBjc3NTdWJEYXRhRGlzcGxheSB9IGZyb20gJy4vZXZlbnRfaGFuZGxlcnMnXG4vLyBcbmNvbnN0IENPTE9SUyA9IFtcIiNhNjc1MWVcIiwgXCIjOWEwMDQ3XCIsIFwiIzY2YTUxZVwiLCBcIiM3NDcwYjNcIiwgXCIjZTgyYjhhXCJdXG5leHBvcnQgY29uc3QgQ0lSQ0xFX0NPTE9SUyA9IFtDT0xPUlNbMV0sIENPTE9SU1swXSwgQ09MT1JTWzRdLCBDT0xPUlNbMl0sIENPTE9SU1szXV1cbi8vIGV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJPdGhlciBUYXhlc1wiXVxuZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIk90aGVyIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgVGF4ZXNcIl1cbi8vIGV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihjc3ZQYXRoLCBzZWN0b3IsIGFtb3VudCwgc3RhdGUsIG11bHRpcGxpZXIgPSAxLCBza2lwID0gMSkge1xuZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCB0YXhfdHlwZSwgcGllX251bSwgY3N2ID0gXCIuL3NyYy9hc3NldHMvZGF0YS9GWTIwMTgtU1RDLURldGFpbGVkLVRhYmxlLmNzdlwiKSB7XG5cbiAgICAvLyBjb25zdCByZW1vdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvdGFscy1cIiArIHBpZV9udW0pXG4gICAgLy8gcmVtb3ZlID8gcmVtb3ZlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlKSA6IG51bGxcblxuICAgIC8vIGNvbnN0IHJlbW92ZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRldGFpbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZTIgPyByZW1vdmUyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlMikgOiBudWxsXG5cbiAgICBjb25zdCBoMSA9IGQzLnNlbGVjdCgnI3RvdGFscy1oZWFkZXItJyArIHBpZV9udW0pXG4gICAgY29uc3Qgc3BhbiA9IGQzLnNlbGVjdCgnI3RvdGFscy1zcGFuLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IGgyID0gZDMuc2VsZWN0KFwiI2RldGFpbHMtXCIgKyBwaWVfbnVtKVxuXG5cbiAgICBsZXQgVE9UQUwgPSAwO1xuICAgIGxldCBUWVBFUyA9IFtdXG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cblxuXG4gICAgY29uc3QgY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKENPTE9SUyk7XG5cbiAgICAvLyBhcmMgZ2VuZXJhdG9yXG4gICAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDEwKVxuICAgICAgICAvLyAuaW5uZXJSYWRpdXMoMCk7IC8vIGZvciBjaXJjbGVcbiAgICAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDEwMCkgLy8gZm9yIGRvbnV0XG5cbiAgICAvLyBjb25zdCBsYWJsZUFyYyA9IGQzLmFyYygpXG4gICAgLy8gICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSA1MClcbiAgICAvLyAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDUwKTtcblxuICAgIC8vIHBpZSBnZW5lcmF0b3JcbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgICAvLyAuc29ydChudWxsKVxuICAgICAgICAudmFsdWUoZCA9PiBkLmFtb3VudCk7XG5cbiAgICAvLyBkZWZpbmUgc3ZnIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIi5waWUtXCIgKyBwaWVfbnVtKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKVxuXG4gICAgLy8gaW1wb3J0IGRhdGFcbiAgICBkMy5jc3YoY3N2KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgYXJyYXlzIHRoYXQgd2lsbCBjb250YWluIHRoZSBzdWIgbGV2ZWwgdGF4IGRhdGFcbiAgICAgICAgbGV0IHNhbGVzX3RheGVzID0gW11cbiAgICAgICAgbGV0IGxpY2Vuc2VfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgaW5jb21lX3RheGVzID0gW11cbiAgICAgICAgbGV0IG90aGVyX3RheGVzID0gW11cbiAgICAgICAgLy8gbGV0IHNhbGVzX3RheF9vYmogPSB7IHRheF9ncm91cDogTEFCRUxTWzRdIH1cbiAgICAgICAgLy8gcGFyc2UgdGhlIGNzdlxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9IFwiVDAwXCIgJiYgZC5pdGVtICE9IFwiVDAxXCIpIHsgIC8vIGRvbid0IHdhbnQgdG8gY2F0Y2ggVG90YWwgb3IgUHJvcGVydHkgVGF4ZXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRheF9vYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudF9vZl90b3RhbDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkLml0ZW0uc2xpY2UoMCwyKSkgeyAvLyBmaWxsIHVwIHN1YiBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iaikgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzYWxlc190YXhfb2JqW2QuVGF4X1R5cGVdID0gZmluZEFtb3VudChkLkFNT1VOVClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMlwiOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29tZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9ICdUMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUWVBFUy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZC5rZXkgPSBkLlRheF9UeXBlO1xuICAgICAgICAgICAgICAgICAgICBkLmFtb3VudCA9IGZpbmRBbW91bnQoZC5BTU9VTlQpO1xuICAgICAgICAgICAgICAgICAgICBkLnBlcmNlbnQgPSAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWluZXJfYXJyYXkgPSBbXSAgLy8gc2V0dGluZyB1cCBjb250YWluZXIgYXJyYXkgZm9yIHBhc3NpbmcgaW50byBjbGljayBoYW5kbGVyXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuICAgICAgICAvLyBzZXQgaDEgYWZ0ZXIgdG90YWwgaGFzIGJlZW4gZGVmaW5lZFxuICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgXCIpXG4gICAgICAgIHNwYW4udGV4dChcIiRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgaDIudGV4dChcIlwiKVxuICAgICAgICAvLyBhdHRlbXB0IGJ1ZGdldENpcmNsZSBjYWxsXG4gICAgICAgIGJ1ZGdldENpcmNsZShUT1RBTClcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwZXJjZW50YWdlcyBpbiB0aGUgY2VudGVyIGJveFxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgYXJjKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBkID0+IGNvbG9ycyhkLmRhdGEua2V5KSlcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbignZCcsIHBpZVR3ZWVuKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHBhdGgub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIC8vIHdoeSBkb2Vzbid0IHRoaXMgd29yaz9cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gICAgICAgICAgICAgLmR1cmF0aW9uKCc1MCcpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIGRldGVybWluZSBob3cgdG8gZmxpcCB0aGUgcGllc1xuICAgICAgICBpZiAocGllX251bSA9PT0gMikgey8vIGZsaXAgdGhlIHNlY29uZCBwaWVcbiAgICAgICAgICAgIGcuYXR0cihcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVgoLTEpIHRyYW5zbGF0ZSgzMDBweCwgMHB4KSBzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgZy5vbihcIm1vdXNlb3ZlclwiLCAoZCwgaSkgPT4geyAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbignNTAnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgJ3BvaW50ZXInKVxuICAgICAgICB9KVxuICAgICAgICBnLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgIC8vIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE4IHdhcyAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICAvLyBoMi50ZXh0KFwiXCIpXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IHNwYW4xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFscy1zcGFuLTEnKVxuICAgICAgICBjb25zdCBzcGFuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbHMtc3Bhbi0yJylcblxuICAgICAgICBpZiAoc3BhbjEuaW5uZXJUZXh0XG4gICAgICAgICAgICAmJiBzcGFuMi5pbm5lclRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsMSA9IHBhcnNlSW50KHNwYW4xLmlubmVyVGV4dC5zbGljZSgxKS5zcGxpdCgnLCcpLmpvaW4oJycpKVxuICAgICAgICAgICAgY29uc3QgdG90YWwyID0gcGFyc2VJbnQoc3BhbjIuaW5uZXJUZXh0LnNsaWNlKDEpLnNwbGl0KCcsJykuam9pbignJykpXG4gICAgICAgICAgICBidWRnZXRDaXJjbGUodG90YWwxLCB0b3RhbDIpXG4gICAgICAgIH0gICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4geyBpZiAoZXJyb3IpIHRocm93IGVycm9yIH0pXG4gICAgXG4gICAgY29uc3QgcGllVHdlZW4gPSBiID0+IHtcbiAgICAgICAgYi5pbm5lclJhZGl1cyA9IDA7XG4gICAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZSh7IHN0YXJ0QW5nbGU6IDAsIGVuZEFuZ2xlOiAwIH0sIGIpXG4gICAgICAgIHJldHVybiAodCkgPT4geyByZXR1cm4gYXJjKGkodCkpIH1cbiAgICB9ICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgIiwiaW1wb3J0IHsgQ0lSQ0xFX0NPTE9SUywgTEFCRUxTfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBwaWVMZWdlbmQgPSAoKSA9PiB7XG4gICAgY29uc3QgbWFzdGVyX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcbiAgICBtYXN0ZXJfbGlzdC5jbGFzc0xpc3QuYWRkKCdtYXN0ZXItbGlzdCcpXG5cbiAgICBjb25zdCBsZWZ0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgdGV4dF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHJpZ2h0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgICBsZWZ0X2xpc3QuY2xhc3NMaXN0LmFkZCgnbGVmdC1saXN0JykgIFxuICAgIHRleHRfbGlzdC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWxpc3QnKSAgXG4gICAgcmlnaHRfbGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodC1saXN0JykgXG5cbiAgICBmb3IgKGxldCBpID0gTEFCRUxTLmxlbmd0aCAtIDEgOyBpID49IDA7IGktLSkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbGVmdF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IHRleHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCByaWdodF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgbGVmdF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ2xlZnQtYm94JylcbiAgICAgICAgbGVmdF9ib3guaWQgPSAoJ2xlZnQtYm94LScgKyBpKVxuICAgICAgICBsZWZ0X2JveC5zdHlsZS5jb2xvciA9IENJUkNMRV9DT0xPUlNbaV1cblxuICAgICAgICByaWdodF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ3JpZ2h0LWJveCcpXG4gICAgICAgIHJpZ2h0X2JveC5pZCA9ICgncmlnaHQtYm94LScgKyBpKVxuICAgICAgICByaWdodF9ib3guc3R5bGUuY29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgdGV4dF9ib3guY2xhc3NMaXN0LmFkZCgndGV4dC1ib3gnKVxuICAgICAgICB0ZXh0X2JveC5pbm5lckhUTUwgPSBMQUJFTFNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IENJUkNMRV9DT0xPUlNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCBcIiArIENJUkNMRV9DT0xPUlNbaV1cblxuICAgICAgICBsZWZ0X2xpc3QuYXBwZW5kQ2hpbGQobGVmdF9ib3gpXG4gICAgICAgIHRleHRfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2JveClcbiAgICAgICAgcmlnaHRfbGlzdC5hcHBlbmRDaGlsZChyaWdodF9ib3gpXG4gICAgfVxuXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQobGVmdF9saXN0KVxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKHRleHRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZChyaWdodF9saXN0KVxuICAgIHJldHVybiBtYXN0ZXJfbGlzdFxufVxuXG5jb25zdCBzdWJsaXN0cyA9IChsYWJlbCwgY29sb3IpID0+IHtcbiAgICBjb25zdCBsaXN0cyA9IFtdXG5cblxuICAgIGxlc3RsaXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnRsaXN0JylcbiAgICB0ZXh0bGlzdC5jbGFzc0xpc3QuYWRkKCd0ZXh0bGlzdCcpXG4gICAgcmlnaHRsaXN0LmNsYXNzTGlzdC5hZGQoJ3JpZ2h0bGlzdCcpXG5cbiAgICBjb25zdCBsZWZ0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGNvbnN0IHJpZ2h0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG5cblxuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG5cbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKGxlZnRCb3gpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsaSlcbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKHJpZ2h0Qm94KVxuICAgIHJldHVybiBzdWJsaXN0XG59IiwiaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBUT1BfTEVWRUwgPSBbJ1QwMCcsICdUMDEnLCAnVEExJywgJ1RBMycsICdUQTQnLCAnVEE1J11cbmNvbnN0IFNUQVRFX05BTUVTID0gWydBbGFiYW1hJywgJ0FsYXNrYScsICdBcml6b25hJywgJ0Fya2Fuc2FzJywgJ0NhbGlmb3JuaWEnLCAnQ29sb3JhZG8nLCAnQ29ubmVjdGljdXQnLCAnRGVsYXdhcmUnLCAnRmxvcmlkYScsICdHZW9yZ2lhJywgJ0hhd2FpaScsICdJZGFobycsICdJbGxpbm9pcycsICdJbmRpYW5hJywgJ0lvd2EnLCAnS2Fuc2FzJywgJ0tlbnR1Y2t5JywgJ0xvdWlzaWFuYScsICdNYWluZScsICdNYXJ5bGFuZCcsICdNYXNzYWNodXNldHRzJywgJ01pY2hpZ2FuJywgJ01pbm5lc290YScsICdNaXNzaXNzaXBwaScsICdNaXNzb3VyaScsICdNb250YW5hJywgJ05lYnJhc2thJywgJ05ldmFkYScsICdOZXcgSGFtcHNoaXJlJywgJ05ldyBKZXJzZXknLCAnTmV3IE1leGljbycsICdOZXcgWW9yaycsICdOb3J0aCBDYXJvbGluYScsICdOb3J0aCBEYWtvdGEnLCAnT2hpbycsICdPa2xhaG9tYScsICdPcmVnb24nLCAnUGVubnN5bHZhbmlhJywgJ1Job2RlIElzbGFuZCcsICdTb3V0aCBDYXJvbGluYScsICdTb3V0aCBEYWtvdGEnLCAnVGVubmVzc2VlJywgJ1RleGFzJywgJ1V0YWgnLCAnVmVybW9udCcsICdWaXJnaW5pYScsICdXYXNoaW5ndG9uJywgJ1dlc3QgVmlyZ2luaWEnLCAnV2lzY29uc2luJywgJ1d5b21pbmcnXVxuXG4vLyBleHBvcnQgY29uc3Qgc2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuXG4vLyAgICAgLy8gY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgIC8vIHJldmlzaXQgaWYgdGltZSB0byBtYWtlIGN1c3RvbSBzZWxlY3Rcbi8vICAgICAvLyBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5pdGlhbC1jb250YWluZXInKVxuXG4vLyAgICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKVxuLy8gICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNlbGVjdC1cIiArIHBpZV9udW0pXG5cbi8vICAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gZSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHN0YXRlID0gZS50YXJnZXQudmFsdWVcbi8vICAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctXCIgKyBwaWVfbnVtKVxuLy8gICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4vLyAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG5cbi8vICAgICAgICAgY29uc3Qgc2lkZSA9IHBpZV9udW0gPT09IDEgPyBcIi1sZWZ0XCIgOiBcIi1yaWdodFwiXG4vLyAgICAgICAgIC8vIGNvbnN0IGgyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN0YXRlXCIgKyBzaWRlKVswXVxuLy8gICAgICAgICAvLyBoMi5pbm5lckhUTUwgPSBzdGF0ZVxuLy8gICAgIH1cblxuLy8gICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuLy8gICAgICAgICBjb25zdCBkZWZhdWx0X3N0YXRlID0gcGllX251bSA9PT0gMSA/IFNUQVRFX05BTUVTWzBdIDogU1RBVEVfTkFNRVNbU1RBVEVfTkFNRVMubGVuZ3RoIC0gMV1cbi8vICAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuLy8gICAgICAgICBpZiAoc3RhdGUgPT09IGRlZmF1bHRfc3RhdGUpIHtcbi8vICAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCB0cnVlKVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBzdGF0ZVxuLy8gICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4vLyAgICAgICAgIC8vIG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4vLyAgICAgICAgIC8vIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuLy8gICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKVxuLy8gICAgIH0pXG4vLyAgICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc3RhdGVTZWxlY3Rvcilcbi8vICAgICAvLyBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KVxuLy8gICAgIC8vIHJldHVybiBjb250YWluZXJcbi8vICAgICByZXR1cm4gc2VsZWN0XG4vLyB9XG5cbi8vIGNvbnN0IHBoYXNlT3V0ID0gKG5vZGUpID0+IHtcblxuLy8gICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxuLy8gfVxuXG5leHBvcnQgY29uc3Qgc3RhdGVfc2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuIFxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwic2VsZWN0LXdyYXBwZXItXCIgKyBwaWVfbnVtKVxuICAgIHdyYXBwZXIuaWQgPSBcInNlbGVjdC13cmFwcGVyLVwiICsgcGllX251bVxuXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICBzZWxlY3QuaW5uZXJIVE1MID0gcGllX251bSA9PT0gMSA/ICdBbGFiYW1hJyA6ICdXeW9taW5nJ1xuICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuICAgIHNlbGVjdC5pZCA9IFwic2VsZWN0LVwiICsgcGllX251bVxuXG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICB9KVxuICAgIFxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdICAvLyBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgc28gdGhhdCBpZiBJIGNsaWNrIGFueXdoZXJlIGVsc2UgdGhlIGxpc3QgZGlzYXBwZWFyc1xuICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIH0pXG4gICAgXG4gICAgY29uc3Qgc3RhdGVTZWxlY3RvciA9IHN0YXRlID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnN0IHN0YXRlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0LVwiICsgcGllX251bSlcbiAgICAgICAgICAgIHNlbGVjdC5pbm5lclRleHQgPSBzdGF0ZVxuICAgICAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAgICAgc3ZnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3ZnKVxuICAgICAgICAgICAgUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUsIFRPUF9MRVZFTCwgcGllX251bSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBzdGF0ZV9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnc3RhdGUtbGlzdC0nICsgcGllX251bSlcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgc3RhdGVfbGlzdC5pZCA9ICdzdGF0ZS1saXN0LScgKyBwaWVfbnVtXG4gICAgXG4gICAgU1RBVEVfTkFNRVMuZm9yRWFjaChzdGF0ZSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlX2xpc3RfaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uaW5uZXJIVE1MID0gc3RhdGVcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHN0YXRlKVxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuICAgICAgICBzdGF0ZV9saXN0LmFwcGVuZENoaWxkKHN0YXRlX2xpc3RfaXRlbSlcbiAgICB9KVxuICAgIFxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KVxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc3RhdGVfbGlzdClcbiAgICBcbiAgICByZXR1cm4gd3JhcHBlclxufVxuXG4vLyBjb25zdCBwaGFzZU91dCA9IChub2RlKSA9PiB7XG5cbi8vICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbi8vIH0iLCJcbmltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3InXG5pbXBvcnQgeyBwaWVMZWdlbmQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2xlZ2VuZCdcbmltcG9ydCB7IHN0YXRlX3NlbGVjdG9yLCBUT1BfTEVWRUwgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3InXG5pbXBvcnQgeyBidWRnZXRDaXJjbGUgfSBmcm9tICcuL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucydcbmltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBcbiAgICAvLyBQQ0cgLT4gY3N2UGF0aCwgc2VjdG9yLCBhbW91dCwgbG9jYXRpb24sIG11bHRpcGxpZXIsIHNraXBcbiAgICBcbiAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpXG4gICAgLy8gY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHVsID0gcGllTGVnZW5kKClcbiAgICBjb25zdCBzZWxlY3RfMSA9IHN0YXRlX3NlbGVjdG9yKDEpXG4gICAgY29uc3Qgc2VsZWN0XzIgPSBzdGF0ZV9zZWxlY3RvcigyKVxuICAgIGNvbnN0IHNlbGVjdG9yX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3Rvci1jb250YWluZXJcIilbMF1cbiAgICBcbiAgICBjb25zdCB5ZWFyU2VsZWN0b3IgPSB5ZWFyU2VsZWN0b3JcblxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMSlcbiAgICBzZWxlY3Rvcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0XzIpXG4gICAgcm9vdC5hcHBlbmRDaGlsZCh1bClcblxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKFwiQWxhYmFtYVwiLCBUT1BfTEVWRUwsIDEpXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJXeW9taW5nXCIsIFRPUF9MRVZFTCwgMilcblxuICAgIFxufSlcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=