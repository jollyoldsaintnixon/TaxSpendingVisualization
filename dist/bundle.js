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

var budgetCircle = exports.budgetCircle = function budgetCircle(datum1) {
    // based on Matthew McKenna's example at http://bl.ocks.org/mpmckenna8/raw/566509dd3d9a08e5f9b2/
    // debugger
    return function (datum2) {
        // debugger
        data = [datum1, datum2];

        var height = 100;
        var width = 1000;

        var root = document.getElementById('root');
        var circleDiv = document.createElement("div");
        circleDiv.classList.add("circle-container");
        circleDiv.id = "circle-container";
        circleDiv.style.display = "block";
        circleDiv.style.height = height;
        circleDiv.style.width = width;
        root.appendChild(circleDiv);

        var svg = d3.select('#circle-container').append('svg').attr('width', width).attr('height', height).attr('class', 'circle-svg');

        var rscale = d3.scaleLinear().domain([0, d3.max(data)]).range([3, 20]);

        svg.selectAll('.circles').data(data).enter().append('circle').attr('r', function (d) {
            return rscale(d);
        }).attr('class', 'circles').attr('cy', height / 2).attr('cx', function (d, i) {
            return 20 + 40 * i;
        });
    };
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
        // .on("click", cssSubDataDisplay(container_array, pie_num));
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
        state_list.classList.toggle('hidden');
    });
    wrapper.addEventListener('blur', function (e) {
        state_list.classList.add('hidden');
    });
    wrapper.addEventListener('focusout', function (e) {
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

/***/ "./src/components/year_selector.js":
/*!*****************************************!*\
  !*** ./src/components/year_selector.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var YEARS = [2018, 2017];

var yearSelector = exports.yearSelector = function yearSelector(year) {
    var select = document.createElement("span");
    select.innerHTML = year;
    select.classList.add("class", "year-select");
    select.id = 'year-select';
    select.addEventListener('click', function (e) {});

    var yearChoice = function yearChoice() {
        var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2018;

        return function (e) {
            var csv = e.target.value;
            var select = document.getElementById('year-select');
            select.innerHTML = year;
            // get states
            state1 = document.getElementById('select-1').innerHTML;
            state2 = document.getElementById('select-2').innerHTML;

            // make two new pies
            var svg1 = document.getElementById("svg-1");
            var svg2 = document.getElementById("svg-2");
            svg1.parentNode.removeChild(svg1);
            svg2.parentNode.removeChild(svg2);
            PieChartGenerator(state1, TOP_LEVEL, 1, csv);
            PieChartGenerator(state2, TOP_LEVEL, 2, csv);

            var side = pie_num === 1 ? "-left" : "-right";
            // const h2 = document.getElementsByClassName("year" + side)[0]
            // h2.innerHTML = year
        };
    };

    var state_list = document.createElement('ul');
    state_list.classList.add('year-list');
    state_list.classList.add('hidden');
    state_list.id = 'year-list';

    YEARS.forEach(function (year) {
        var year_list_item = document.createElement('li');
        state_list_item.setAttribute("value", "./src/assets/data/FY" + year + "-STC-Detailed-Table.csv");
        year_list_item.innerHTML = year;
        year_list_item.addEventListener("click", yearChoice(year));
        year_list.appendChild(year_list_item);
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

var _year_selector = __webpack_require__(/*! ./components/year_selector */ "./src/components/year_selector.js");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZXZlbnRfaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMveWVhcl9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9hcHAuc2Nzcz9mZjQ4Il0sIm5hbWVzIjpbInN1YkRhdGEiLCJjb250YWluZXJfYXJyYXkiLCJwaWVfbnVtIiwiZWxlIiwidGF4X3R5cGUiLCJkYXRhIiwia2V5Iiwic3ViX2FycmF5Iiwic3ViQXJyYXlMb2NhdG9yIiwidGF4X3N0YWNrIiwia2V5cyIsImZvckVhY2giLCJzdWJfdGF4IiwiaSIsInB1c2giLCJhbW91bnQiLCJ3aWR0aCIsImhlaWdodCIsInRvb2x0aXBXaWR0aCIsInRvb2x0aXBIZWlnaHQiLCJzdmciLCJkMyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJzdGFjayIsIm9yZGVyIiwic3RhY2tPcmRlck5vbmUiLCJvZmZzZXQiLCJzdGFja09mZnNldE5vbmUiLCJsYXllcnMiLCJ4Iiwic2NhbGVCYW5kIiwicmFuZ2UiLCJwYWRkaW5nIiwieSIsInNjYWxlTGluZWFyIiwiZG9tYWluIiwibWFwIiwibWF4IiwiZCIsInkwIiwiZyIsInNlbGVjdEFsbCIsImVudGVyIiwicmVjdCIsIm9uIiwidG9vbHRpcCIsInN0eWxlIiwieFBvcyIsIm1vdXNlIiwieVBvcyIsInRleHQiLCJwZXJjZW50IiwiY3NzU3ViRGF0YURpc3BsYXkiLCJyZW1vdmUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwidG90YWwiLCJvYmoiLCJyb290IiwidWwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaWQiLCJsaSIsInBlcmNlbnRfb2ZfdG90YWwiLCJhcHBlbmRDaGlsZCIsImdyb3VwVG90YWwiLCJhcnJheSIsImFzc2lnbkJveCIsImFycmF5X29mX29ianMiLCJzaWRlIiwiYm94IiwiZGVjaW1hbHMiLCJTdHJpbmciLCJzcGxpdCIsImludGVnZXJzIiwic2xpY2VkIiwic2xpY2UiLCJpbm5lckhUTUwiLCJmaW5kQW1vdW50Iiwiam9pbiIsImJ1ZGdldENpcmNsZSIsImRhdHVtMSIsImRhdHVtMiIsImNpcmNsZURpdiIsImRpc3BsYXkiLCJyc2NhbGUiLCJQaWVDaGFydEdlbmVyYXRvciIsIkNPTE9SUyIsIkNJUkNMRV9DT0xPUlMiLCJMQUJFTFMiLCJzdGF0ZSIsImNzdiIsImgxIiwic3BhbiIsImgyIiwiVE9UQUwiLCJUWVBFUyIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInJhZGl1cyIsImNvbG9ycyIsInNjYWxlT3JkaW5hbCIsImFyYyIsIm91dGVyUmFkaXVzIiwiaW5uZXJSYWRpdXMiLCJwaWUiLCJ2YWx1ZSIsInRoZW4iLCJzYWxlc190YXhlcyIsImxpY2Vuc2VfdGF4ZXMiLCJpbmNvbWVfdGF4ZXMiLCJvdGhlcl90YXhlcyIsIkdlb19OYW1lIiwiaXRlbSIsIkFNT1VOVCIsInRheF9vYmoiLCJUYXhfVHlwZSIsImluY2x1ZGVzIiwiZm9ybWF0IiwicGF0aCIsInRyYW5zaXRpb24iLCJlYXNlIiwiZWFzZUxpbmVhciIsImR1cmF0aW9uIiwiYXR0clR3ZWVuIiwicGllVHdlZW4iLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlcnJvciIsImIiLCJpbnRlcnBvbGF0ZSIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsInQiLCJwaWVMZWdlbmQiLCJtYXN0ZXJfbGlzdCIsImxlZnRfbGlzdCIsInRleHRfbGlzdCIsInJpZ2h0X2xpc3QiLCJsZW5ndGgiLCJsZWZ0X2JveCIsInRleHRfYm94IiwicmlnaHRfYm94IiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXIiLCJzdWJsaXN0cyIsImxhYmVsIiwibGlzdHMiLCJsZXN0bGlzdCIsInRleHRsaXN0IiwicmlnaHRsaXN0IiwibGVmdEJveCIsInJpZ2h0Qm94Iiwic3VibGlzdCIsIlRPUF9MRVZFTCIsIlNUQVRFX05BTUVTIiwic3RhdGVfc2VsZWN0b3IiLCJ3cmFwcGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0YXRlX2xpc3QiLCJ0b2dnbGUiLCJzdGF0ZVNlbGVjdG9yIiwiaW5uZXJUZXh0Iiwic3RhdGVfbGlzdF9pdGVtIiwic2V0QXR0cmlidXRlIiwiWUVBUlMiLCJ5ZWFyU2VsZWN0b3IiLCJ5ZWFyIiwieWVhckNob2ljZSIsImUiLCJ0YXJnZXQiLCJzdGF0ZTEiLCJzdGF0ZTIiLCJzdmcxIiwic3ZnMiIsInllYXJfbGlzdF9pdGVtIiwieWVhcl9saXN0Iiwic2VsZWN0XzEiLCJzZWxlY3RfMiIsInNlbGVjdG9yX2NvbnRhaW5lciIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFD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Ozs7Ozs7Ozs7O0FDUEEsdUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBjb250YWluZXJfYXJyYXkucHVzaChzYWxlc190YXhlcylcbi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKGxpY2Vuc2VfdGF4ZXMpXG4vLyBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4vLyBjb250YWluZXJfYXJyYXkucHVzaChvdGhlcl90YXhlcylcblxuZXhwb3J0IGNvbnN0IHN1YkRhdGEgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSA9PiB7XG4gICAgLy8gYSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBsZWFybmVkIGZyb20gTWljaGFlbCBTdGFuYWxhbmQncyBcIlN0YWNrZWQgYmFyIGNoYXJ0IHdpdGggdG9vbHRpcHNcIiB0dXRvcmlhbCBhdCBodHRwOi8vYmwub2Nrcy5vcmcvbXN0YW5hbGFuZC82MTAwNzEzXG4gICAgcmV0dXJuIChlbGUpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRheF90eXBlID0gZWxlLmRhdGEua2V5XG5cbiAgICAgICAgY29uc3Qgc3ViX2FycmF5ID0gc3ViQXJyYXlMb2NhdG9yKHRheF90eXBlLCBjb250YWluZXJfYXJyYXkpXG5cbiAgICAgICAgLy8gc2V0dGluZyB1cCB0aGUgdGF4IHN0YWNrIHRvIGNvbXBseSB3aXRoIGQzIHY1XG4gICAgICAgIGxldCB0YXhfc3RhY2sgPSB7IFxuICAgICAgICAgICAgdGF4X3R5cGU6IHRheF90eXBlLFxuICAgICAgICB9XG4gICAgICAgIC8vIHNldHRpbmcgdXAga2V5c1xuICAgICAgICBsZXQga2V5cyA9IFtdXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKChzdWJfdGF4LCBpKSA9PiB7XG4gICAgICAgICAgICBrZXlzLnB1c2goc3ViX3RheC5rZXkpXG4gICAgICAgICAgICB0YXhfc3RhY2tbc3ViX3RheC5rZXldID0gc3ViX3RheC5hbW91bnRcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBjb25zdCB3aWR0aCA9IDkwICAvLyBzZXR0aW5nIHRoZSBkaW1lbnNpb25zIHRvIGNvcnJlc3BvbmQgdG8gdGhlIHBpZSBjaGFydHMnXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDYwMFxuXG4gICAgICAgIGNvbnN0IHRvb2x0aXBXaWR0aCA9IDEyMCAvLyB3aWxsIGFsdGVyIHRoZXNlIGFzIG5lZWRlZFxuICAgICAgICBjb25zdCB0b29sdGlwSGVpZ2h0ID0gNDAgXG5cbiAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwibWFpblwiKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcblxuICAgICAgICAvLyBzZXQgdGhlIGxheWVycyBvZiB0aGUgc3RhY2tlZCBiYXJcbiAgICAgICAgLy8gY29uc3QgbGF5ZXJzID0gZDMuc3RhY2soKShbdGF4X3R5cGVdLm1hcCh0YXggPT4geyAgLy8gc2hvdWxkIHVsdGltYXRlbHkganVzdCBiZSB0aGUgb25lIGxheWVyXG4gICAgICAgIC8vICAgICByZXR1cm4gc3ViX2FycmF5Lm1hcChkID0+IHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4geyB4OiBkLmtleSwgeTogZC5hbW91bnQsIHBlcmNlbnQ6IGQucGVyY2VudCB9XG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyB9KSlcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBkMy5zdGFjaygpXG4gICAgICAgICAgICAua2V5cyhrZXlzKVxuICAgICAgICAgICAgLm9yZGVyKGQzLnN0YWNrT3JkZXJOb25lKVxuICAgICAgICAgICAgLm9mZnNldChkMy5zdGFja09mZnNldE5vbmUpXG5cbiAgICAgICAgY29uc3QgbGF5ZXJzID0gc3RhY2soc3ViX2FycmF5KVxuXG4gICAgICAgIC8vIGNvbnN0IHggPSBkMy5zY2FsZU9yZGluYWwoKVxuICAgICAgICAvLyAgICAgLmRvbWFpbihsYXllcnNbMF0ubWFwKGQgPT4gZC54KSlcbiAgICAgICAgLy8gICAgIC8vIC5yYW5nZShbMTAsIHdpZHRoXSwgMCkgIC8vIG1heSBiZSBhIHF1aWNrZXIgd2F5IHRvIGRvIHRoaXMgYXMgdGhlcmUgaXMgb25seSBvbmUgYmFyXG4gICAgICAgIC8vICAgICAucmFuZ2UoW3dpZHRoXSlcbiAgICAgICAgY29uc3QgeCA9IGQzLnNjYWxlQmFuZCgpXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAgICAgICAgIC5wYWRkaW5nKDAuMSlcblxuICAgICAgICBjb25zdCB5ID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihsYXllcnNbMF0ubWFwKGQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkMy5tYXgoZCwgZCA9PiBkLnkwICsgZC55KSAgLy8gdGhlIGluY3JlbWVudCB1cCB0byB0aGUgdG90YWxcbiAgICAgICAgICAgIH0pKS5yYW5nZShbaGVpZ2h0LCAwXSlcblxuICAgICAgICBjb25zdCBnID0gc3ZnLnNlbGVjdEFsbChcIi5zdWItdGF4ZXNcIikgIC8vIG5vIGcgYXQgdGhpcyBwb2ludCwgYnV0IHRoZXkgd2lsbCBoYXZlIHRoaXMgY2xhc3NcbiAgICAgICAgICAgIC5kYXRhKGxheWVycykuZW50ZXIoKSAgLy8gbm93IHRoZXJlIHdpbGwgYmUgYSBnIGZvciBldmVyeSBvYmogaW4gc3ViX2FycmF5LiAgc2hvdWxkIGJlIGp1c3Qgb25lIGdcbiAgICAgICAgICAgIC5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBcInN1Yi10YXhlc1wiKSAgXG4gICAgICAgICAgICBcbiAgICAgICAgY29uc3QgcmVjdCA9IGcuc2VsZWN0QWxsKFwicmVjdFwiKSAgLy8gbWFraW5nIGVhY2ggb2JqIG9mIHRoZSBjb3JyZXNwb25kIHRvIGEgcmVjdCB3aXRoaW4gdGhlIGdcbiAgICAgICAgICAgIC5kYXRhKGQgPT4gZCkgLy8gcHVsbGluZyBvdXQgZWFjaCBpbmRpdmlkdWFsIG9ialxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBkID0+IHgoZC54KSkgIC8vIHBhc3NpbmcgZWFjaCBvYmoncyB4IHZhbHVlIHRvIHRoZSBkMyB4IGZ1bmN0aW9uIGRlZmluZWQgYWJvdmVcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZCA9PiB5KGQueSArIGQueTApKSAgLy8geTAgaXMgdGhlIGhlaWdodCB3aGVyZSBlYWNoIHNlZ21lbnQgaW4gdGhlIHN0YWNrIHN0YXJ0c1xuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgeC5yYW5nZSgpKSAgLy8gcHJvYmFibHkgY2FuIGhhcmQgY29kZSwgc2luY2Ugb25seSBvbmUgYmFyXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgZCA9PiB5KGQueTApIC0geShkLnkwICsgZC55KSkgIC8vIGhlaWdodCBpcyBzZXQgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IHBsdXMgdGhlIGhlaWdodCwgYW5kIGFsbCB0aGF0IHN1YnRyYWN0ZWQgZnJvbSB0aGUgc3RhcnRpbmcgcG9pbnQgZHVlIHRvIHkgdmFsdWVzIGJlZ2luaW5nIGF0IHRvcCBvZiBzY3JlZW5cbiAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgKCkgPT4gdG9vbHRpcC5zdHlsZShcImRpc3BsYXlcIiwgdHJ1ZSkpICAvLyB3YW50IHRoZSBpbmZvIGJveCB0byBzd2l0Y2ggYmV0d2VlbiB2aXNpYmxlIGFuZCBpbml2aXMgYmFzZWQgb24gbW91c2VvdmVyXG4gICAgICAgICAgICAub24oJ21vdXNlb3V0JywgKCkgPT4gdG9vbHRpcC5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpKVxuICAgICAgICAgICAgLm9uKCdtb3VzZW1vdmUnLCBkID0+IHsgIC8vIHRoaXMgaXMgZ29pbmcgdG8gYmUgYSBzd2VldCBlZmZlY3QhXG4gICAgICAgICAgICAgICAgY29uc3QgeFBvcyA9IGQzLm1vdXNlKHRoaXMpWzBdIC0gKHRvb2x0aXBXaWR0aCAvIDIpIC8vIHRoaXNbMF0gY29ycmVzcG9uZHMgdG8gbW91c2UncyB4IHBvcywgYW5kIHB1c2hpbmcgaXQgbGVmdCBieSBoYWxmIG9mIHRoZSB0b29sdGlwJ3Mgd2lkdGggZW5zdXJlIGl0IGlzIGNlbnRlcmVkXG4gICAgICAgICAgICAgICAgY29uc3QgeVBvcyA9IGQzLm1vdXNlKHRoaXMpWzFdIC0gMjUgLy8gcHV0cyB0aGUgdG9vbHRpcCB1cCBhIGJpdCBhYm92ZSB0aGUgY3Vyc29yXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgeFBvcyArICcsJyArIHlQb3MgKyAnKScpXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJ3RleHQnKS50ZXh0KGQucGVyY2VudCkgLy8gc2hvd3MgdGhlIHBlcmNlbnQgIFxuICAgICAgICAgICAgfSlcblxuICAgICAgICBjb25zdCB0b29sdGlwID0gc3ZnLmFwcGVuZCgnZycpIC8vIHNldHRpbmcgdXAgdGhpcyBzd2VldCB0b29sdGlwLiBFeGNpdGluZyFcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS10b29sdGlwIHRvb2x0aXAnKS5zdHlsZSgnZGlzcGxheScsICdub25lJykgLy8gc3RhcnRzIGludmlzaWJsZVxuICAgICAgICAgICAgLy8gYWRkaW5nIHRoZSBkaW1lbnNpb25zIG9mIHRoZSBib3hcbiAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKS5hdHRyKCd3aWR0aCcsIHRvb2x0aXBXaWR0aClcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0b29sdGlwSGVpZ2h0KS5hdHRyKCdmaWxsJywgJ3doaXRlJykuc3R5bGUoJ29wYWNpdHknLCAwLjUpIC8vIG1ha2luZyBpdCBwYXJ0aWFsbHkgc2VlLXRocm91Z2hcbiAgICAgICAgICAgIC8vIGFkZGluZyB0aGUgdGV4dCBjb250ZW50XG4gICAgICAgICAgICAuYXBwZW5kKCd0ZXh0JykuYXR0cigneCcsIDE1KVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgJy44ZW0nKS5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICB9XG4gICAgXG59XG5cbmNvbnN0IHN1YkFycmF5TG9jYXRvciA9ICh0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KSA9PiB7ICAvLyBoZWxwZXIgZnVuY3Rpb24gZm9yIGZpbmRpbmcgdGhlIHJpZ2h0IHN1YiBhcnJheS4gQSBiaXQgaGFyZC1jb2RlZC5cbiAgICBzd2l0Y2ggKHRheF90eXBlKSB7XG4gICAgICAgIGNhc2UgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMF1cbiAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjogXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzFdXG4gICAgICAgIGNhc2UgXCJJbmNvbWUgVGF4ZXNcIjogXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzJdXG4gICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOiBcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbM11cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBjc3NTdWJEYXRhRGlzcGxheSA9IChjb250YWluZXJfYXJyYXksIHBpZV9udW0pID0+IHtcblxuICAgIGNvbnN0IHdpZHRoID0gOTAgIC8vIHNldHRpbmcgdGhlIGRpbWVuc2lvbnMgdG8gY29ycmVzcG9uZCB0byB0aGUgcGllIGNoYXJ0cydcbiAgICBjb25zdCBoZWlnaHQgPSA2MDBcblxuICAgIHJldHVybiAoZWxlKSA9PiB7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWItZGF0YS1saXN0LVwiICsgcGllX251bSlcbiAgICAgICAgcmVtb3ZlID8gcmVtb3ZlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlKSA6IG51bGxcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRheF90eXBlID0gZWxlLmRhdGEua2V5XG4gICAgICAgIGNvbnN0IHN1Yl9hcnJheSA9IHN1YkFycmF5TG9jYXRvcih0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KSAvLyBnZXQgcmlnaHQgc3ViX2FycmF5XG4gICAgICAgIC8vIGNvbnN0IGdyb3VwVG90YWwgPSBncm91cFRvdGFsKHN1Yl9hcnJheSkgLy8gbm90IHN1cmUgd2h5IHRoaXMgaXMgbm90IGludm9raW5nIHRoZSBmdW5jaXRvbiBiZWxvd1xuICAgICAgICBsZXQgdG90YWwgPSAwXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICB0b3RhbCArPSBvYmouYW1vdW50XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpIC8vIGdyYWIgdGhlIHJvb3QgdG8gYXR0YWNoIGxhdGVyXG5cbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIikgLy8gc2V0IHVwIHVsIGNvbnRhaW5lclxuICAgICAgICB1bC5jbGFzc0xpc3QuYWRkKFwic3ViLWRhdGEtbGlzdC1cIiArIHBpZV9udW0pXG4gICAgICAgIHVsLmlkID0gKFwic3ViLWRhdGEtbGlzdC1cIiArIHBpZV9udW0pXG5cbiAgICAgICAgc3ViX2FycmF5LmZvckVhY2goc3ViX3RheCA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgIGxpLnN0eWxlLmhlaWdodCA9IChzdWJfdGF4LnBlcmNlbnRfb2ZfdG90YWwgKiA2KSArICdweCdcbiAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKVxuICAgICAgICB9KTtcblxuICAgICAgICByb290LmFwcGVuZENoaWxkKHVsKVxuICAgIH1cbn1cblxuY29uc3QgZ3JvdXBUb3RhbCA9IGFycmF5ID0+IHtcbiAgICBsZXQgdG90YWwgPSAwXG4gICAgYXJyYXkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICB0b3RhbCArPSBvYmouYW1vdW50XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvdGFsXG59IiwiXG5cbmV4cG9ydCBjb25zdCBhc3NpZ25Cb3ggPSAoYXJyYXlfb2Zfb2JqcywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQtYm94LScgOiAncmlnaHQtYm94LSdcbiAgICBhcnJheV9vZl9vYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGkgPSA0O1xuICAgICAgICBzd2l0Y2ggKG9iai5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAwIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAxIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMiBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAzIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBpKVxuICAgICAgICBjb25zdCBkZWNpbWFscyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVsxXVxuICAgICAgICBjb25zdCBpbnRlZ2VycyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVswXVxuICAgICAgICBjb25zdCBzbGljZWQgPSBvYmoucGVyY2VudCA/IGludGVnZXJzICsgJy4nICsgZGVjaW1hbHMuc2xpY2UoMCwgMikgOiAwXG4gICAgICAgIGJveC5pbm5lckhUTUwgPSBzbGljZWQgKyAnJSdcbiAgICB9KTtcbn1cblxuLy8gZC5BTU9VTlQgPT09ICdYJyA/IDAgOiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMCxcbmV4cG9ydCBjb25zdCBmaW5kQW1vdW50ID0gKGFtb3VudCkgPT4ge1xuICAgIHJldHVybiBhbW91bnQgPT09ICdYJyA/IDAgOiBhbW91bnQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDBcbn1cblxuLy8gZXhwb3J0IGNvbnN0IHN1YkRhdGFQdXNoZXIgPSAoaXRlbSkgPT4ge1xuLy8gICAgIGlmIChpdGVtICE9IFwiVDAwXCIgJiYgaXRlbSAhPSBcIlQwMVwiKSB7XG4vLyAgICAgICAgIHN3aXRjaCAoaXRlbS5zbGljZSgwLCAyKSkge1xuLy8gICAgICAgICAgICAgY2FzZSAoXCJUMFwiIHx8IFwiVDFcIik6XG4vLyAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh7XG4vLyAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbi8vICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbi8vICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICBcbi8vICAgICAgICAgICAgIGNhc2UgXCJUMlwiOlxuLy8gICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh7XG4gICAgXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1cblxuZXhwb3J0IGNvbnN0IGJ1ZGdldENpcmNsZSA9IChkYXR1bTEpID0+IHtcbiAgICAvLyBiYXNlZCBvbiBNYXR0aGV3IE1jS2VubmEncyBleGFtcGxlIGF0IGh0dHA6Ly9ibC5vY2tzLm9yZy9tcG1ja2VubmE4L3Jhdy81NjY1MDlkZDNkOWEwOGU1ZjliMi9cbiAgICAvLyBkZWJ1Z2dlclxuICAgIHJldHVybiBkYXR1bTIgPT4ge1xuICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICBkYXRhID0gW2RhdHVtMSwgZGF0dW0yXVxuXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDEwMFxuICAgICAgICBjb25zdCB3aWR0aCA9IDEwMDBcbiAgICBcbiAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JylcbiAgICAgICAgY29uc3QgY2lyY2xlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICBjaXJjbGVEaXYuY2xhc3NMaXN0LmFkZChcImNpcmNsZS1jb250YWluZXJcIilcbiAgICAgICAgY2lyY2xlRGl2LmlkID0gXCJjaXJjbGUtY29udGFpbmVyXCJcbiAgICAgICAgY2lyY2xlRGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbiAgICAgICAgY2lyY2xlRGl2LnN0eWxlLmhlaWdodCA9IGhlaWdodFxuICAgICAgICBjaXJjbGVEaXYuc3R5bGUud2lkdGggPSB3aWR0aFxuICAgICAgICByb290LmFwcGVuZENoaWxkKGNpcmNsZURpdilcbiAgICBcbiAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KCcjY2lyY2xlLWNvbnRhaW5lcicpLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodCkuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpO1xuICAgIFxuICAgICAgICBjb25zdCByc2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCAoZDMubWF4KGRhdGEpKSBdKVxuICAgICAgICAgICAgLnJhbmdlKFszLCAyMF0pXG4gICAgXG4gICAgICAgIHN2Zy5zZWxlY3RBbGwoJy5jaXJjbGVzJykuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlcycpLmF0dHIoJ2N5JywgaGVpZ2h0IC8gMilcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIChkLCBpKSA9PiAyMCArIDQwICogaSlcbiAgICB9XG59IiwiLy8gQSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBiYXNlZCBoZWF2aWx5IG9mZiBvZiBLYXJ0aGlrIFRob3RhJ3MgeW91dHViZSB0dXRvcmlhbCBcIkludHJvZHVjdGlvbiB0byBkMy5qcyA9IFBpZSBDaGFydCBhbmQgRG9udXQgQ2hhcnRcIlxuLy8gVGhlIGxlZ2VuZCBjb2RlIHdhcyBmcm9tIENyeXB0ZXJzIEluZm90ZWNoJ3MgeW91dHViZSB0dXRvcmlhbCBcIlBpZSBDaGFydCB1c2luZyBEMy5qc1wiXG5cbmltcG9ydCB7IGFzc2lnbkJveCwgZmluZEFtb3VudCwgYnVkZ2V0Q2lyY2xlIH0gZnJvbSAnLi9oZWxwZXJfZnVuY3Rpb25zJ1xuaW1wb3J0IHsgc3ViRGF0YSwgY3NzU3ViRGF0YURpc3BsYXkgfSBmcm9tICcuL2V2ZW50X2hhbmRsZXJzJ1xuLy8gXG5jb25zdCBDT0xPUlMgPSBbXCIjYTY3NTFlXCIsIFwiIzlhMDA0N1wiLCBcIiM2NmE1MWVcIiwgXCIjNzQ3MGIzXCIsIFwiI2U4MmI4YVwiXVxuZXhwb3J0IGNvbnN0IENJUkNMRV9DT0xPUlMgPSBbQ09MT1JTWzFdLCBDT0xPUlNbMF0sIENPTE9SU1s0XSwgQ09MT1JTWzJdLCBDT0xPUlNbM11dXG4vLyBleHBvcnQgY29uc3QgTEFCRUxTID0gW1wiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiT3RoZXIgVGF4ZXNcIl1cbmV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJPdGhlciBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIFRheGVzXCJdXG4vLyBleHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3IoY3N2UGF0aCwgc2VjdG9yLCBhbW91bnQsIHN0YXRlLCBtdWx0aXBsaWVyID0gMSwgc2tpcCA9IDEpIHtcbmV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgdGF4X3R5cGUsIHBpZV9udW0sIGNzdiA9IFwiLi9zcmMvYXNzZXRzL2RhdGEvRlkyMDE4LVNUQy1EZXRhaWxlZC1UYWJsZS5jc3ZcIikge1xuXG4gICAgLy8gY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG5cbiAgICAvLyBjb25zdCByZW1vdmUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXRhaWxzLVwiICsgcGllX251bSlcbiAgICAvLyByZW1vdmUyID8gcmVtb3ZlMi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZTIpIDogbnVsbFxuXG4gICAgY29uc3QgaDEgPSBkMy5zZWxlY3QoJyN0b3RhbHMtaGVhZGVyLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IHNwYW4gPSBkMy5zZWxlY3QoJyN0b3RhbHMtc3Bhbi0nICsgcGllX251bSlcbiAgICBjb25zdCBoMiA9IGQzLnNlbGVjdChcIiNkZXRhaWxzLVwiICsgcGllX251bSlcblxuXG4gICAgbGV0IFRPVEFMID0gMDtcbiAgICBsZXQgVFlQRVMgPSBbXVxuICAgIC8vIENJUkNMRSBUSU1FIEJBQllcbiAgICAvLyBtYXJnaW4gYW5kIHJhZGl1c1xuICAgIGNvbnN0IG1hcmdpbiA9IHsgdG9wOiAyMDAsIHJpZ2h0OiAyMDAsIGJvdHRvbTogMjAwLCBsZWZ0OiAyMDAgfSxcbiAgICAgICAgaGVpZ2h0ID0gMTAwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tLFxuICAgICAgICB3aWR0aCA9IDEwMDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCxcbiAgICAgICAgcmFkaXVzID0gd2lkdGggLyAyO1xuXG5cblxuICAgIGNvbnN0IGNvbG9ycyA9IGQzLnNjYWxlT3JkaW5hbChDT0xPUlMpO1xuXG4gICAgLy8gYXJjIGdlbmVyYXRvclxuICAgIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSAxMClcbiAgICAgICAgLy8gLmlubmVyUmFkaXVzKDApOyAvLyBmb3IgY2lyY2xlXG4gICAgICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSAxMDApIC8vIGZvciBkb251dFxuXG4gICAgLy8gY29uc3QgbGFibGVBcmMgPSBkMy5hcmMoKVxuICAgIC8vICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gNTApXG4gICAgLy8gICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSA1MCk7XG5cbiAgICAvLyBwaWUgZ2VuZXJhdG9yXG4gICAgY29uc3QgcGllID0gZDMucGllKClcbiAgICAgICAgLy8gLnNvcnQobnVsbClcbiAgICAgICAgLnZhbHVlKGQgPT4gZC5hbW91bnQpO1xuXG4gICAgLy8gZGVmaW5lIHN2ZyBcbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIucGllLVwiICsgcGllX251bSkuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwiaWRcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB3aWR0aCAvIDIgKyBcIixcIiArIGhlaWdodCAvIDIgKyBcIilcIilcblxuICAgIC8vIGltcG9ydCBkYXRhXG4gICAgZDMuY3N2KGNzdikudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAvLyBpbml0aWFsaXplIGFycmF5cyB0aGF0IHdpbGwgY29udGFpbiB0aGUgc3ViIGxldmVsIHRheCBkYXRhXG4gICAgICAgIGxldCBzYWxlc190YXhlcyA9IFtdXG4gICAgICAgIGxldCBsaWNlbnNlX3RheGVzID0gW11cbiAgICAgICAgbGV0IGluY29tZV90YXhlcyA9IFtdXG4gICAgICAgIGxldCBvdGhlcl90YXhlcyA9IFtdXG4gICAgICAgIC8vIGxldCBzYWxlc190YXhfb2JqID0geyB0YXhfZ3JvdXA6IExBQkVMU1s0XSB9XG4gICAgICAgIC8vIHBhcnNlIHRoZSBjc3ZcbiAgICAgICAgZGF0YS5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkLkdlb19OYW1lID09PSBzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gPT09IFwiVDAwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgVE9UQUwgPSBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSAhPSBcIlQwMFwiICYmIGQuaXRlbSAhPSBcIlQwMVwiKSB7ICAvLyBkb24ndCB3YW50IHRvIGNhdGNoIFRvdGFsIG9yIFByb3BlcnR5IFRheGVzXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXhfb2JqID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBkLlRheF9UeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnRfb2ZfdG90YWw6IChmaW5kQW1vdW50KGQuQU1PVU5UKSAvIFRPVEFMKSAqIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZC5pdGVtLnNsaWNlKDAsMikpIHsgLy8gZmlsbCB1cCBzdWIgYXJyYXlzXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDBcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYWxlc190YXhlcy5wdXNoKHRheF9vYmopICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2FsZXNfdGF4X29ialtkLlRheF9UeXBlXSA9IGZpbmRBbW91bnQoZC5BTU9VTlQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDFcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYWxlc190YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDJcIjogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGljZW5zZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNvbWVfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQ1XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQ5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRheF90eXBlLmluY2x1ZGVzKGQuaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSAhPSAnVDAwJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVFlQRVMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBkLlRheF9UeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKChmaW5kQW1vdW50KGQuQU1PVU5UKSkgLyBUT1RBTCkgKiAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGQua2V5ID0gZC5UYXhfVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgZC5hbW91bnQgPSBmaW5kQW1vdW50KGQuQU1PVU5UKTtcbiAgICAgICAgICAgICAgICAgICAgZC5wZXJjZW50ID0gKChmaW5kQW1vdW50KGQuQU1PVU5UKSkgLyBUT1RBTCkgKiAxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgY29uc3QgY29udGFpbmVyX2FycmF5ID0gW10gIC8vIHNldHRpbmcgdXAgY29udGFpbmVyIGFycmF5IGZvciBwYXNzaW5nIGludG8gY2xpY2sgaGFuZGxlclxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChzYWxlc190YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2gobGljZW5zZV90YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2goaW5jb21lX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChvdGhlcl90YXhlcylcbiAgICAgICAgLy8gc2V0IGgxIGFmdGVyIHRvdGFsIGhhcyBiZWVuIGRlZmluZWRcbiAgICAgICAgaDEudGV4dChzdGF0ZSArIFwiJ3MgdGF4IHJldmVudWUgZm9yIDIwMTggd2FzIFwiKVxuICAgICAgICBzcGFuLnRleHQoXCIkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgIGgyLnRleHQoXCJcIilcbiAgICAgICAgLy8gYXR0ZW1wdCBidWRnZXRDaXJjbGUgY2FsbFxuICAgICAgICBidWRnZXRDaXJjbGUoVE9UQUwpXG4gICAgICAgIC8vIHNldCB1cCB0aGUgcGVyY2VudGFnZXMgaW4gdGhlIGNlbnRlciBib3hcbiAgICAgICAgYXNzaWduQm94KFRZUEVTLCBwaWVfbnVtKVxuXG4gICAgICAgIGNvbnN0IGcgPSBzdmcuc2VsZWN0QWxsKFwiLmFyY1wiKVxuICAgICAgICAgICAgLmRhdGEocGllKGRhdGEpKVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwiZ1wiKSAgLy8gQW5kIHRoaXMgbGluZSB0byBncm93IHRoZSBudW1iZXIgb2YgZydzIHRvIHRoZSBkYXRhIHNldCBzaXplXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYXJjXCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIChkLCBpKSA9PiBkLnZhbHVlID09PSBUT1RBTCA/IFwibm9uZVwiIDogXCJudWxsXCIpOyAgLy8gYXR0ZW1wdCB0byByZW5kZXIgaGFsZiB0aGUgY2hhcnQgaW52aXNpYmxlXG4gICAgICAgICAgICBcbiAgICAgICAgLy8gYXBwZW5kIHRoZSBwYXRoIG9mIHRoZSBhcmNcbiAgICAgICAgY29uc3QgcGF0aCA9IGcuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIGFyYylcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZCA9PiBjb2xvcnMoZC5kYXRhLmtleSkpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZWFzZShkMy5lYXNlTGluZWFyKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oJ2QnLCBwaWVUd2Vlbik7XG4gICAgICAgIFxuICAgICAgICAvLyBwYXRoLm9uKFwibW91c2VvdmVyXCIsIChkLCBpKSA9PiB7ICAvLyB3aHkgZG9lc24ndCB0aGlzIHdvcms/XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZClcbiAgICAgICAgLy8gICAgICAgICBkMy5zZWxlY3QodGhpcykudHJhbnNpdGlvbigpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5kdXJhdGlvbignNTAnKVxuICAgICAgICAvLyAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsICcuODUnKVxuICAgICAgICAvLyAgICAgICAgICAgICAuYXR0cihcImN1cnNvclwiLCAncG9pbnRlcicpXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyBkZXRlcm1pbmUgaG93IHRvIGZsaXAgdGhlIHBpZXNcbiAgICAgICAgaWYgKHBpZV9udW0gPT09IDIpIHsvLyBmbGlwIHRoZSBzZWNvbmQgcGllXG4gICAgICAgICAgICBnLmF0dHIoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICBnLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwic2NhbGVYKC0xKSB0cmFuc2xhdGUoMzAwcHgsIDBweCkgc2NhbGVZKC0xKVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgIGcub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oJzUwJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAnLjg1JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgJ3BvaW50ZXInKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgZy5vbihcIm1vdXNlb3V0XCIsIGVsZSA9PiB7XG4gICAgICAgICAgICAvLyBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgJFwiICsgZDMuZm9ybWF0KCcsJykoVE9UQUwpKVxuICAgICAgICAgICAgLy8gaDIudGV4dChcIlwiKVxuICAgICAgICB9KVxuICAgICAgICAvLyAub24oXCJjbGlja1wiLCBjc3NTdWJEYXRhRGlzcGxheShjb250YWluZXJfYXJyYXksIHBpZV9udW0pKTtcbiAgICAgICAgICAgIFxuICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7IGlmIChlcnJvcikgdGhyb3cgZXJyb3IgfSlcblxuICAgIGNvbnN0IHBpZVR3ZWVuID0gYiA9PiB7XG4gICAgICAgIGIuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZTogMCB9LCBiKVxuICAgICAgICByZXR1cm4gKHQpID0+IHsgcmV0dXJuIGFyYyhpKHQpKSB9XG4gICAgfSAgICBcblxufVxuIiwiaW1wb3J0IHsgQ0lSQ0xFX0NPTE9SUywgTEFCRUxTfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBwaWVMZWdlbmQgPSAoKSA9PiB7XG4gICAgY29uc3QgbWFzdGVyX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcbiAgICBtYXN0ZXJfbGlzdC5jbGFzc0xpc3QuYWRkKCdtYXN0ZXItbGlzdCcpXG5cbiAgICBjb25zdCBsZWZ0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgdGV4dF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHJpZ2h0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgICBsZWZ0X2xpc3QuY2xhc3NMaXN0LmFkZCgnbGVmdC1saXN0JykgIFxuICAgIHRleHRfbGlzdC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWxpc3QnKSAgXG4gICAgcmlnaHRfbGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodC1saXN0JykgXG5cbiAgICBmb3IgKGxldCBpID0gTEFCRUxTLmxlbmd0aCAtIDEgOyBpID49IDA7IGktLSkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbGVmdF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IHRleHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCByaWdodF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgbGVmdF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ2xlZnQtYm94JylcbiAgICAgICAgbGVmdF9ib3guaWQgPSAoJ2xlZnQtYm94LScgKyBpKVxuICAgICAgICBsZWZ0X2JveC5zdHlsZS5jb2xvciA9IENJUkNMRV9DT0xPUlNbaV1cblxuICAgICAgICByaWdodF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ3JpZ2h0LWJveCcpXG4gICAgICAgIHJpZ2h0X2JveC5pZCA9ICgncmlnaHQtYm94LScgKyBpKVxuICAgICAgICByaWdodF9ib3guc3R5bGUuY29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgdGV4dF9ib3guY2xhc3NMaXN0LmFkZCgndGV4dC1ib3gnKVxuICAgICAgICB0ZXh0X2JveC5pbm5lckhUTUwgPSBMQUJFTFNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IENJUkNMRV9DT0xPUlNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCBcIiArIENJUkNMRV9DT0xPUlNbaV1cblxuICAgICAgICBsZWZ0X2xpc3QuYXBwZW5kQ2hpbGQobGVmdF9ib3gpXG4gICAgICAgIHRleHRfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2JveClcbiAgICAgICAgcmlnaHRfbGlzdC5hcHBlbmRDaGlsZChyaWdodF9ib3gpXG4gICAgfVxuXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQobGVmdF9saXN0KVxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKHRleHRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZChyaWdodF9saXN0KVxuICAgIHJldHVybiBtYXN0ZXJfbGlzdFxufVxuXG5jb25zdCBzdWJsaXN0cyA9IChsYWJlbCwgY29sb3IpID0+IHtcbiAgICBjb25zdCBsaXN0cyA9IFtdXG5cblxuICAgIGxlc3RsaXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnRsaXN0JylcbiAgICB0ZXh0bGlzdC5jbGFzc0xpc3QuYWRkKCd0ZXh0bGlzdCcpXG4gICAgcmlnaHRsaXN0LmNsYXNzTGlzdC5hZGQoJ3JpZ2h0bGlzdCcpXG5cbiAgICBjb25zdCBsZWZ0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGNvbnN0IHJpZ2h0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG5cblxuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG5cbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKGxlZnRCb3gpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsaSlcbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKHJpZ2h0Qm94KVxuICAgIHJldHVybiBzdWJsaXN0XG59IiwiaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBUT1BfTEVWRUwgPSBbJ1QwMCcsICdUMDEnLCAnVEExJywgJ1RBMycsICdUQTQnLCAnVEE1J11cbmNvbnN0IFNUQVRFX05BTUVTID0gWydBbGFiYW1hJywgJ0FsYXNrYScsICdBcml6b25hJywgJ0Fya2Fuc2FzJywgJ0NhbGlmb3JuaWEnLCAnQ29sb3JhZG8nLCAnQ29ubmVjdGljdXQnLCAnRGVsYXdhcmUnLCAnRmxvcmlkYScsICdHZW9yZ2lhJywgJ0hhd2FpaScsICdJZGFobycsICdJbGxpbm9pcycsICdJbmRpYW5hJywgJ0lvd2EnLCAnS2Fuc2FzJywgJ0tlbnR1Y2t5JywgJ0xvdWlzaWFuYScsICdNYWluZScsICdNYXJ5bGFuZCcsICdNYXNzYWNodXNldHRzJywgJ01pY2hpZ2FuJywgJ01pbm5lc290YScsICdNaXNzaXNzaXBwaScsICdNaXNzb3VyaScsICdNb250YW5hJywgJ05lYnJhc2thJywgJ05ldmFkYScsICdOZXcgSGFtcHNoaXJlJywgJ05ldyBKZXJzZXknLCAnTmV3IE1leGljbycsICdOZXcgWW9yaycsICdOb3J0aCBDYXJvbGluYScsICdOb3J0aCBEYWtvdGEnLCAnT2hpbycsICdPa2xhaG9tYScsICdPcmVnb24nLCAnUGVubnN5bHZhbmlhJywgJ1Job2RlIElzbGFuZCcsICdTb3V0aCBDYXJvbGluYScsICdTb3V0aCBEYWtvdGEnLCAnVGVubmVzc2VlJywgJ1RleGFzJywgJ1V0YWgnLCAnVmVybW9udCcsICdWaXJnaW5pYScsICdXYXNoaW5ndG9uJywgJ1dlc3QgVmlyZ2luaWEnLCAnV2lzY29uc2luJywgJ1d5b21pbmcnXVxuXG4vLyBleHBvcnQgY29uc3Qgc2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuXG4vLyAgICAgLy8gY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgIC8vIHJldmlzaXQgaWYgdGltZSB0byBtYWtlIGN1c3RvbSBzZWxlY3Rcbi8vICAgICAvLyBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5pdGlhbC1jb250YWluZXInKVxuXG4vLyAgICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKVxuLy8gICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNlbGVjdC1cIiArIHBpZV9udW0pXG5cbi8vICAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gZSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHN0YXRlID0gZS50YXJnZXQudmFsdWVcbi8vICAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctXCIgKyBwaWVfbnVtKVxuLy8gICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4vLyAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG5cbi8vICAgICAgICAgY29uc3Qgc2lkZSA9IHBpZV9udW0gPT09IDEgPyBcIi1sZWZ0XCIgOiBcIi1yaWdodFwiXG4vLyAgICAgICAgIC8vIGNvbnN0IGgyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN0YXRlXCIgKyBzaWRlKVswXVxuLy8gICAgICAgICAvLyBoMi5pbm5lckhUTUwgPSBzdGF0ZVxuLy8gICAgIH1cblxuLy8gICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuLy8gICAgICAgICBjb25zdCBkZWZhdWx0X3N0YXRlID0gcGllX251bSA9PT0gMSA/IFNUQVRFX05BTUVTWzBdIDogU1RBVEVfTkFNRVNbU1RBVEVfTkFNRVMubGVuZ3RoIC0gMV1cbi8vICAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuLy8gICAgICAgICBpZiAoc3RhdGUgPT09IGRlZmF1bHRfc3RhdGUpIHtcbi8vICAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCB0cnVlKVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBzdGF0ZVxuLy8gICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4vLyAgICAgICAgIC8vIG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4vLyAgICAgICAgIC8vIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuLy8gICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKVxuLy8gICAgIH0pXG4vLyAgICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc3RhdGVTZWxlY3Rvcilcbi8vICAgICAvLyBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KVxuLy8gICAgIC8vIHJldHVybiBjb250YWluZXJcbi8vICAgICByZXR1cm4gc2VsZWN0XG4vLyB9XG5cbi8vIGNvbnN0IHBoYXNlT3V0ID0gKG5vZGUpID0+IHtcblxuLy8gICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxuLy8gfVxuXG5leHBvcnQgY29uc3Qgc3RhdGVfc2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuIFxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwic2VsZWN0LXdyYXBwZXItXCIgKyBwaWVfbnVtKVxuICAgIHdyYXBwZXIuaWQgPSBcInNlbGVjdC13cmFwcGVyLVwiICsgcGllX251bVxuXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICBzZWxlY3QuaW5uZXJIVE1MID0gcGllX251bSA9PT0gMSA/ICdBbGFiYW1hJyA6ICdXeW9taW5nJ1xuICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuICAgIHNlbGVjdC5pZCA9IFwic2VsZWN0LVwiICsgcGllX251bVxuXG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgfSlcbiAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBlID0+IHtcbiAgICAgICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIH0pXG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGUgPT4ge1xuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgfSlcbiAgICBcbiAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gc3RhdGUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGUgPT4ge1xuICAgICAgICAgICAgLy8gY29uc3Qgc3RhdGUgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuICAgICAgICAgICAgc2VsZWN0LmlubmVyVGV4dCA9IHN0YXRlXG4gICAgICAgICAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4gICAgICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgVE9QX0xFVkVMLCBwaWVfbnVtKVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHN0YXRlX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdzdGF0ZS1saXN0LScgKyBwaWVfbnVtKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICBzdGF0ZV9saXN0LmlkID0gJ3N0YXRlLWxpc3QtJyArIHBpZV9udW1cbiAgICBcbiAgICBTVEFURV9OQU1FUy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGVfbGlzdF9pdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5pbm5lckhUTUwgPSBzdGF0ZVxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4gICAgICAgIHN0YXRlX2xpc3QuYXBwZW5kQ2hpbGQoc3RhdGVfbGlzdF9pdGVtKVxuICAgIH0pXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChzZWxlY3QpXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChzdGF0ZV9saXN0KVxuICAgIFxuICAgIHJldHVybiB3cmFwcGVyXG59XG5cbi8vIGNvbnN0IHBoYXNlT3V0ID0gKG5vZGUpID0+IHtcblxuLy8gICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxuLy8gfSIsImNvbnN0IFlFQVJTID0gWzIwMTgsIDIwMTddXG5cbmV4cG9ydCBjb25zdCB5ZWFyU2VsZWN0b3IgPSB5ZWFyID0+IHtcbiAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAgIHNlbGVjdC5pbm5lckhUTUwgPSB5ZWFyXG4gICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcInllYXItc2VsZWN0XCIpXG4gICAgc2VsZWN0LmlkID0gJ3llYXItc2VsZWN0J1xuICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBcbiAgICB9KVxuXG4gICAgY29uc3QgeWVhckNob2ljZSA9ICh5ZWFyID0gMjAxOCkgPT4ge1xuICAgICAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjc3YgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3llYXItc2VsZWN0JylcbiAgICAgICAgICAgIHNlbGVjdC5pbm5lckhUTUwgPSB5ZWFyXG4gICAgICAgICAgICAvLyBnZXQgc3RhdGVzXG4gICAgICAgICAgICBzdGF0ZTEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0LTEnKS5pbm5lckhUTUxcbiAgICAgICAgICAgIHN0YXRlMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3QtMicpLmlubmVySFRNTFxuXG4gICAgICAgICAgICAvLyBtYWtlIHR3byBuZXcgcGllc1xuICAgICAgICAgICAgY29uc3Qgc3ZnMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLTFcIilcbiAgICAgICAgICAgIGNvbnN0IHN2ZzIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN2Zy0yXCIpXG4gICAgICAgICAgICBzdmcxLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3ZnMSlcbiAgICAgICAgICAgIHN2ZzIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcyKVxuICAgICAgICAgICAgUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUxLCBUT1BfTEVWRUwsIDEsIGNzdilcbiAgICAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlMiwgVE9QX0xFVkVMLCAyLCBjc3YpXG5cblxuXG4gICAgICAgICAgICBjb25zdCBzaWRlID0gcGllX251bSA9PT0gMSA/IFwiLWxlZnRcIiA6IFwiLXJpZ2h0XCJcbiAgICAgICAgICAgIC8vIGNvbnN0IGgyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInllYXJcIiArIHNpZGUpWzBdXG4gICAgICAgICAgICAvLyBoMi5pbm5lckhUTUwgPSB5ZWFyXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZV9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgneWVhci1saXN0JylcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgc3RhdGVfbGlzdC5pZCA9ICd5ZWFyLWxpc3QnXG5cbiAgICBZRUFSUy5mb3JFYWNoKHllYXIgPT4ge1xuICAgICAgICBjb25zdCB5ZWFyX2xpc3RfaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGAuL3NyYy9hc3NldHMvZGF0YS9GWSR7eWVhcn0tU1RDLURldGFpbGVkLVRhYmxlLmNzdmApXG4gICAgICAgIHllYXJfbGlzdF9pdGVtLmlubmVySFRNTCA9IHllYXJcbiAgICAgICAgeWVhcl9saXN0X2l0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHllYXJDaG9pY2UoeWVhcikpXG4gICAgICAgIHllYXJfbGlzdC5hcHBlbmRDaGlsZCh5ZWFyX2xpc3RfaXRlbSlcbiAgICB9KVxufSIsIlxuaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHBpZUxlZ2VuZCB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfbGVnZW5kJ1xuaW1wb3J0IHsgc3RhdGVfc2VsZWN0b3IsIFRPUF9MRVZFTCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGF0ZV9zZWxlY3RvcidcbmltcG9ydCB7IHllYXJTZWxlY3RvciB9IGZyb20gJy4vY29tcG9uZW50cy95ZWFyX3NlbGVjdG9yJ1xuaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2NzcydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIFxuICAgIC8vIFBDRyAtPiBjc3ZQYXRoLCBzZWN0b3IsIGFtb3V0LCBsb2NhdGlvbiwgbXVsdGlwbGllciwgc2tpcFxuICAgIFxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgICAvLyBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHNlbGVjdF8xID0gc3RhdGVfc2VsZWN0b3IoMSlcbiAgICBjb25zdCBzZWxlY3RfMiA9IHN0YXRlX3NlbGVjdG9yKDIpXG4gICAgY29uc3Qgc2VsZWN0b3JfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdG9yLWNvbnRhaW5lclwiKVswXVxuICAgIFxuICAgIGNvbnN0IHllYXJTZWxlY3RvciA9IHllYXJTZWxlY3RvclxuXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8xKVxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMilcbiAgICByb290LmFwcGVuZENoaWxkKHVsKVxuXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJBbGFiYW1hXCIsIFRPUF9MRVZFTCwgMSlcbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIld5b21pbmdcIiwgVE9QX0xFVkVMLCAyKVxufSlcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=