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
exports.LABELS = exports.COLORS = undefined;
exports.PieChartGenerator = PieChartGenerator;

var _helper_functions = __webpack_require__(/*! ./helper_functions */ "./src/components/helper_functions.js");

var _event_handlers = __webpack_require__(/*! ./event_handlers */ "./src/components/event_handlers.js");

// export const COLORS = ["#a6751e", "#e7ab04", "#66a51e", "#7470b3", "#e82b8a"]
// A lot of this code was based heavily off of Karthik Thota's youtube tutorial "Introduction to d3.js = Pie Chart and Donut Chart"
// The legend code was from Crypters Infotech's youtube tutorial "Pie Chart using D3.js"

var COLORS = exports.COLORS = ["#a6751e", "#e7ab04", "#66a51e", "#7470b3", "#e82b8a"];
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
        left_box.style.color = _pie_chart_generator.COLORS[i];

        right_box.classList.add('box', 'right-box');
        right_box.id = 'right-box-' + i;
        right_box.style.color = _pie_chart_generator.COLORS[i];

        text_box.classList.add('text-box');
        text_box.innerHTML = _pie_chart_generator.LABELS[i];
        text_box.style.backgroundColor = _pie_chart_generator.COLORS[i];
        text_box.style.color = "white";
        text_box.style.border = "2px solid " + _pie_chart_generator.COLORS[i];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZXZlbnRfaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMveWVhcl9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9hcHAuc2NzcyJdLCJuYW1lcyI6WyJzdWJEYXRhIiwiY29udGFpbmVyX2FycmF5IiwicGllX251bSIsImVsZSIsInRheF90eXBlIiwiZGF0YSIsImtleSIsInN1Yl9hcnJheSIsInN1YkFycmF5TG9jYXRvciIsInRheF9zdGFjayIsImtleXMiLCJmb3JFYWNoIiwic3ViX3RheCIsImkiLCJwdXNoIiwiYW1vdW50Iiwid2lkdGgiLCJoZWlnaHQiLCJ0b29sdGlwV2lkdGgiLCJ0b29sdGlwSGVpZ2h0Iiwic3ZnIiwiZDMiLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwic3RhY2siLCJvcmRlciIsInN0YWNrT3JkZXJOb25lIiwib2Zmc2V0Iiwic3RhY2tPZmZzZXROb25lIiwibGF5ZXJzIiwieCIsInNjYWxlQmFuZCIsInJhbmdlIiwicGFkZGluZyIsInkiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsIm1hcCIsIm1heCIsImQiLCJ5MCIsImciLCJzZWxlY3RBbGwiLCJlbnRlciIsInJlY3QiLCJvbiIsInRvb2x0aXAiLCJzdHlsZSIsInhQb3MiLCJtb3VzZSIsInlQb3MiLCJ0ZXh0IiwicGVyY2VudCIsImNzc1N1YkRhdGFEaXNwbGF5IiwicmVtb3ZlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInRvdGFsIiwib2JqIiwicm9vdCIsInVsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImlkIiwibGkiLCJwZXJjZW50X29mX3RvdGFsIiwiYXBwZW5kQ2hpbGQiLCJncm91cFRvdGFsIiwiYXJyYXkiLCJhc3NpZ25Cb3giLCJhcnJheV9vZl9vYmpzIiwic2lkZSIsImJveCIsImRlY2ltYWxzIiwiU3RyaW5nIiwic3BsaXQiLCJpbnRlZ2VycyIsInNsaWNlZCIsInNsaWNlIiwiaW5uZXJIVE1MIiwiZmluZEFtb3VudCIsImpvaW4iLCJidWRnZXRDaXJjbGUiLCJkYXR1bTEiLCJkYXR1bTIiLCJjaXJjbGVEaXYiLCJkaXNwbGF5IiwicnNjYWxlIiwiUGllQ2hhcnRHZW5lcmF0b3IiLCJDT0xPUlMiLCJMQUJFTFMiLCJzdGF0ZSIsImNzdiIsImgxIiwic3BhbiIsImgyIiwiVE9UQUwiLCJUWVBFUyIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInJhZGl1cyIsImNvbG9ycyIsInNjYWxlT3JkaW5hbCIsImFyYyIsIm91dGVyUmFkaXVzIiwiaW5uZXJSYWRpdXMiLCJwaWUiLCJ2YWx1ZSIsInRoZW4iLCJzYWxlc190YXhlcyIsImxpY2Vuc2VfdGF4ZXMiLCJpbmNvbWVfdGF4ZXMiLCJvdGhlcl90YXhlcyIsIkdlb19OYW1lIiwiaXRlbSIsIkFNT1VOVCIsInRheF9vYmoiLCJUYXhfVHlwZSIsImluY2x1ZGVzIiwiZm9ybWF0IiwicGF0aCIsInRyYW5zaXRpb24iLCJlYXNlIiwiZWFzZUxpbmVhciIsImR1cmF0aW9uIiwiYXR0clR3ZWVuIiwicGllVHdlZW4iLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlcnJvciIsImIiLCJpbnRlcnBvbGF0ZSIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsInQiLCJwaWVMZWdlbmQiLCJtYXN0ZXJfbGlzdCIsImxlZnRfbGlzdCIsInRleHRfbGlzdCIsInJpZ2h0X2xpc3QiLCJsZW5ndGgiLCJsZWZ0X2JveCIsInRleHRfYm94IiwicmlnaHRfYm94IiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXIiLCJzdWJsaXN0cyIsImxhYmVsIiwibGlzdHMiLCJsZXN0bGlzdCIsInRleHRsaXN0IiwicmlnaHRsaXN0IiwibGVmdEJveCIsInJpZ2h0Qm94Iiwic3VibGlzdCIsIlRPUF9MRVZFTCIsIlNUQVRFX05BTUVTIiwic3RhdGVfc2VsZWN0b3IiLCJ3cmFwcGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0YXRlX2xpc3QiLCJ0b2dnbGUiLCJzdGF0ZVNlbGVjdG9yIiwiaW5uZXJUZXh0Iiwic3RhdGVfbGlzdF9pdGVtIiwic2V0QXR0cmlidXRlIiwiWUVBUlMiLCJ5ZWFyU2VsZWN0b3IiLCJ5ZWFyIiwieWVhckNob2ljZSIsImUiLCJ0YXJnZXQiLCJzdGF0ZTEiLCJzdGF0ZTIiLCJzdmcxIiwic3ZnMiIsInllYXJfbGlzdF9pdGVtIiwieWVhcl9saXN0Iiwic2VsZWN0XzEiLCJzZWxlY3RfMiIsInNlbGVjdG9yX2NvbnRhaW5lciIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7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USxhQUFULENBQXVCLElBQXZCLENBQXZCO0FBQ0E2Ryx3QkFBZ0JDLFlBQWhCLENBQTZCLE9BQTdCLDJCQUE2REcsSUFBN0Q7QUFDQVEsdUJBQWV0RyxTQUFmLEdBQTJCOEYsSUFBM0I7QUFDQVEsdUJBQWVqQixnQkFBZixDQUFnQyxPQUFoQyxFQUF5Q1UsV0FBV0QsSUFBWCxDQUF6QztBQUNBUyxrQkFBVXBILFdBQVYsQ0FBc0JtSCxjQUF0QjtBQUNILEtBTkQ7QUFPSCxDQTlDTSxDOzs7Ozs7Ozs7Ozs7OztBQ0RQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBakksU0FBU2dILGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNOztBQUVoRDs7QUFFQSxRQUFNMUcsT0FBT04sU0FBU0MsY0FBVCxDQUF3QixNQUF4QixDQUFiO0FBQ0E7QUFDQSxRQUFNTSxLQUFLLDRCQUFYO0FBQ0EsUUFBTTRILFdBQVcsb0NBQWUsQ0FBZixDQUFqQjtBQUNBLFFBQU1DLFdBQVcsb0NBQWUsQ0FBZixDQUFqQjtBQUNBLFFBQU1DLHFCQUFxQnJJLFNBQVNzSSxzQkFBVCxDQUFnQyxvQkFBaEMsRUFBc0QsQ0FBdEQsQ0FBM0I7O0FBRUEsUUFBTWQsZUFBZUEsWUFBckI7O0FBRUFhLHVCQUFtQnZILFdBQW5CLENBQStCcUgsUUFBL0I7QUFDQUUsdUJBQW1CdkgsV0FBbkIsQ0FBK0JzSCxRQUEvQjtBQUNBOUgsU0FBS1EsV0FBTCxDQUFpQlAsRUFBakI7O0FBRUEsZ0RBQWtCLFNBQWxCLEVBQTZCcUcseUJBQTdCLEVBQXdDLENBQXhDO0FBQ0EsZ0RBQWtCLFNBQWxCLEVBQTZCQSx5QkFBN0IsRUFBd0MsQ0FBeEM7QUFDSCxDQW5CRCxFOzs7Ozs7Ozs7OztBQ1BBLHVDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gY29udGFpbmVyX2FycmF5LnB1c2goc2FsZXNfdGF4ZXMpXG4vLyBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuLy8gY29udGFpbmVyX2FycmF5LnB1c2goaW5jb21lX3RheGVzKVxuLy8gY29udGFpbmVyX2FycmF5LnB1c2gob3RoZXJfdGF4ZXMpXG5cbmV4cG9ydCBjb25zdCBzdWJEYXRhID0gKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkgPT4ge1xuICAgIC8vIGEgbG90IG9mIHRoaXMgY29kZSB3YXMgbGVhcm5lZCBmcm9tIE1pY2hhZWwgU3RhbmFsYW5kJ3MgXCJTdGFja2VkIGJhciBjaGFydCB3aXRoIHRvb2x0aXBzXCIgdHV0b3JpYWwgYXQgaHR0cDovL2JsLm9ja3Mub3JnL21zdGFuYWxhbmQvNjEwMDcxM1xuICAgIHJldHVybiAoZWxlKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YXhfdHlwZSA9IGVsZS5kYXRhLmtleVxuXG4gICAgICAgIGNvbnN0IHN1Yl9hcnJheSA9IHN1YkFycmF5TG9jYXRvcih0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KVxuXG4gICAgICAgIC8vIHNldHRpbmcgdXAgdGhlIHRheCBzdGFjayB0byBjb21wbHkgd2l0aCBkMyB2NVxuICAgICAgICBsZXQgdGF4X3N0YWNrID0geyBcbiAgICAgICAgICAgIHRheF90eXBlOiB0YXhfdHlwZSxcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXR0aW5nIHVwIGtleXNcbiAgICAgICAgbGV0IGtleXMgPSBbXVxuICAgICAgICBzdWJfYXJyYXkuZm9yRWFjaCgoc3ViX3RheCwgaSkgPT4ge1xuICAgICAgICAgICAga2V5cy5wdXNoKHN1Yl90YXgua2V5KVxuICAgICAgICAgICAgdGF4X3N0YWNrW3N1Yl90YXgua2V5XSA9IHN1Yl90YXguYW1vdW50XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSA5MCAgLy8gc2V0dGluZyB0aGUgZGltZW5zaW9ucyB0byBjb3JyZXNwb25kIHRvIHRoZSBwaWUgY2hhcnRzJ1xuICAgICAgICBjb25zdCBoZWlnaHQgPSA2MDBcblxuICAgICAgICBjb25zdCB0b29sdGlwV2lkdGggPSAxMjAgLy8gd2lsbCBhbHRlciB0aGVzZSBhcyBuZWVkZWRcbiAgICAgICAgY29uc3QgdG9vbHRpcEhlaWdodCA9IDQwIFxuXG4gICAgICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIm1haW5cIikuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKS5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJnXCIpXG5cbiAgICAgICAgLy8gc2V0IHRoZSBsYXllcnMgb2YgdGhlIHN0YWNrZWQgYmFyXG4gICAgICAgIC8vIGNvbnN0IGxheWVycyA9IGQzLnN0YWNrKCkoW3RheF90eXBlXS5tYXAodGF4ID0+IHsgIC8vIHNob3VsZCB1bHRpbWF0ZWx5IGp1c3QgYmUgdGhlIG9uZSBsYXllclxuICAgICAgICAvLyAgICAgcmV0dXJuIHN1Yl9hcnJheS5tYXAoZCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHsgeDogZC5rZXksIHk6IGQuYW1vdW50LCBwZXJjZW50OiBkLnBlcmNlbnQgfVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gfSkpXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZDMuc3RhY2soKVxuICAgICAgICAgICAgLmtleXMoa2V5cylcbiAgICAgICAgICAgIC5vcmRlcihkMy5zdGFja09yZGVyTm9uZSlcbiAgICAgICAgICAgIC5vZmZzZXQoZDMuc3RhY2tPZmZzZXROb25lKVxuXG4gICAgICAgIGNvbnN0IGxheWVycyA9IHN0YWNrKHN1Yl9hcnJheSlcblxuICAgICAgICAvLyBjb25zdCB4ID0gZDMuc2NhbGVPcmRpbmFsKClcbiAgICAgICAgLy8gICAgIC5kb21haW4obGF5ZXJzWzBdLm1hcChkID0+IGQueCkpXG4gICAgICAgIC8vICAgICAvLyAucmFuZ2UoWzEwLCB3aWR0aF0sIDApICAvLyBtYXkgYmUgYSBxdWlja2VyIHdheSB0byBkbyB0aGlzIGFzIHRoZXJlIGlzIG9ubHkgb25lIGJhclxuICAgICAgICAvLyAgICAgLnJhbmdlKFt3aWR0aF0pXG4gICAgICAgIGNvbnN0IHggPSBkMy5zY2FsZUJhbmQoKVxuICAgICAgICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXG4gICAgICAgICAgICAucGFkZGluZygwLjEpXG5cbiAgICAgICAgY29uc3QgeSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4obGF5ZXJzWzBdLm1hcChkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDMubWF4KGQsIGQgPT4gZC55MCArIGQueSkgIC8vIHRoZSBpbmNyZW1lbnQgdXAgdG8gdGhlIHRvdGFsXG4gICAgICAgICAgICB9KSkucmFuZ2UoW2hlaWdodCwgMF0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuc3ViLXRheGVzXCIpICAvLyBubyBnIGF0IHRoaXMgcG9pbnQsIGJ1dCB0aGV5IHdpbGwgaGF2ZSB0aGlzIGNsYXNzXG4gICAgICAgICAgICAuZGF0YShsYXllcnMpLmVudGVyKCkgIC8vIG5vdyB0aGVyZSB3aWxsIGJlIGEgZyBmb3IgZXZlcnkgb2JqIGluIHN1Yl9hcnJheS4gIHNob3VsZCBiZSBqdXN0IG9uZSBnXG4gICAgICAgICAgICAuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgXCJzdWItdGF4ZXNcIikgIFxuICAgICAgICAgICAgXG4gICAgICAgIGNvbnN0IHJlY3QgPSBnLnNlbGVjdEFsbChcInJlY3RcIikgIC8vIG1ha2luZyBlYWNoIG9iaiBvZiB0aGUgY29ycmVzcG9uZCB0byBhIHJlY3Qgd2l0aGluIHRoZSBnXG4gICAgICAgICAgICAuZGF0YShkID0+IGQpIC8vIHB1bGxpbmcgb3V0IGVhY2ggaW5kaXZpZHVhbCBvYmpcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB4KGQueCkpICAvLyBwYXNzaW5nIGVhY2ggb2JqJ3MgeCB2YWx1ZSB0byB0aGUgZDMgeCBmdW5jdGlvbiBkZWZpbmVkIGFib3ZlXG4gICAgICAgICAgICAuYXR0cigneScsIGQgPT4geShkLnkgKyBkLnkwKSkgIC8vIHkwIGlzIHRoZSBoZWlnaHQgd2hlcmUgZWFjaCBzZWdtZW50IGluIHRoZSBzdGFjayBzdGFydHNcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHgucmFuZ2UoKSkgIC8vIHByb2JhYmx5IGNhbiBoYXJkIGNvZGUsIHNpbmNlIG9ubHkgb25lIGJhclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGQgPT4geShkLnkwKSAtIHkoZC55MCArIGQueSkpICAvLyBoZWlnaHQgaXMgc2V0IHRvIHRoZSBzdGFydGluZyBwb2ludCBwbHVzIHRoZSBoZWlnaHQsIGFuZCBhbGwgdGhhdCBzdWJ0cmFjdGVkIGZyb20gdGhlIHN0YXJ0aW5nIHBvaW50IGR1ZSB0byB5IHZhbHVlcyBiZWdpbmluZyBhdCB0b3Agb2Ygc2NyZWVuXG4gICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsICgpID0+IHRvb2x0aXAuc3R5bGUoXCJkaXNwbGF5XCIsIHRydWUpKSAgLy8gd2FudCB0aGUgaW5mbyBib3ggdG8gc3dpdGNoIGJldHdlZW4gdmlzaWJsZSBhbmQgaW5pdmlzIGJhc2VkIG9uIG1vdXNlb3ZlclxuICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsICgpID0+IHRvb2x0aXAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKSlcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlJywgZCA9PiB7ICAvLyB0aGlzIGlzIGdvaW5nIHRvIGJlIGEgc3dlZXQgZWZmZWN0IVxuICAgICAgICAgICAgICAgIGNvbnN0IHhQb3MgPSBkMy5tb3VzZSh0aGlzKVswXSAtICh0b29sdGlwV2lkdGggLyAyKSAvLyB0aGlzWzBdIGNvcnJlc3BvbmRzIHRvIG1vdXNlJ3MgeCBwb3MsIGFuZCBwdXNoaW5nIGl0IGxlZnQgYnkgaGFsZiBvZiB0aGUgdG9vbHRpcCdzIHdpZHRoIGVuc3VyZSBpdCBpcyBjZW50ZXJlZFxuICAgICAgICAgICAgICAgIGNvbnN0IHlQb3MgPSBkMy5tb3VzZSh0aGlzKVsxXSAtIDI1IC8vIHB1dHMgdGhlIHRvb2x0aXAgdXAgYSBiaXQgYWJvdmUgdGhlIGN1cnNvclxuICAgICAgICAgICAgICAgIHRvb2x0aXAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHhQb3MgKyAnLCcgKyB5UG9zICsgJyknKVxuICAgICAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCd0ZXh0JykudGV4dChkLnBlcmNlbnQpIC8vIHNob3dzIHRoZSBwZXJjZW50ICBcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgdG9vbHRpcCA9IHN2Zy5hcHBlbmQoJ2cnKSAvLyBzZXR0aW5nIHVwIHRoaXMgc3dlZXQgdG9vbHRpcC4gRXhjaXRpbmchXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnc3ViLWRhdGEtdG9vbHRpcCB0b29sdGlwJykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpIC8vIHN0YXJ0cyBpbnZpc2libGVcbiAgICAgICAgICAgIC8vIGFkZGluZyB0aGUgZGltZW5zaW9ucyBvZiB0aGUgYm94XG4gICAgICAgICAgICAuYXBwZW5kKCdyZWN0JykuYXR0cignd2lkdGgnLCB0b29sdGlwV2lkdGgpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdG9vbHRpcEhlaWdodCkuYXR0cignZmlsbCcsICd3aGl0ZScpLnN0eWxlKCdvcGFjaXR5JywgMC41KSAvLyBtYWtpbmcgaXQgcGFydGlhbGx5IHNlZS10aHJvdWdoXG4gICAgICAgICAgICAvLyBhZGRpbmcgdGhlIHRleHQgY29udGVudFxuICAgICAgICAgICAgLmFwcGVuZCgndGV4dCcpLmF0dHIoJ3gnLCAxNSlcbiAgICAgICAgICAgIC5hdHRyKCdkeScsICcuOGVtJykuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgfVxuICAgIFxufVxuXG5jb25zdCBzdWJBcnJheUxvY2F0b3IgPSAodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSkgPT4geyAgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBmaW5kaW5nIHRoZSByaWdodCBzdWIgYXJyYXkuIEEgYml0IGhhcmQtY29kZWQuXG4gICAgc3dpdGNoICh0YXhfdHlwZSkge1xuICAgICAgICBjYXNlIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzBdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6IFxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsxXVxuICAgICAgICBjYXNlIFwiSW5jb21lIFRheGVzXCI6IFxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsyXVxuICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjogXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzNdXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgY3NzU3ViRGF0YURpc3BsYXkgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSA9PiB7XG5cbiAgICBjb25zdCB3aWR0aCA9IDkwICAvLyBzZXR0aW5nIHRoZSBkaW1lbnNpb25zIHRvIGNvcnJlc3BvbmQgdG8gdGhlIHBpZSBjaGFydHMnXG4gICAgY29uc3QgaGVpZ2h0ID0gNjAwXG5cbiAgICByZXR1cm4gKGVsZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ViLWRhdGEtbGlzdC1cIiArIHBpZV9udW0pXG4gICAgICAgIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YXhfdHlwZSA9IGVsZS5kYXRhLmtleVxuICAgICAgICBjb25zdCBzdWJfYXJyYXkgPSBzdWJBcnJheUxvY2F0b3IodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSkgLy8gZ2V0IHJpZ2h0IHN1Yl9hcnJheVxuICAgICAgICAvLyBjb25zdCBncm91cFRvdGFsID0gZ3JvdXBUb3RhbChzdWJfYXJyYXkpIC8vIG5vdCBzdXJlIHdoeSB0aGlzIGlzIG5vdCBpbnZva2luZyB0aGUgZnVuY2l0b24gYmVsb3dcbiAgICAgICAgbGV0IHRvdGFsID0gMFxuICAgICAgICBzdWJfYXJyYXkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgdG90YWwgKz0gb2JqLmFtb3VudFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSAvLyBncmFiIHRoZSByb290IHRvIGF0dGFjaCBsYXRlclxuXG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpIC8vIHNldCB1cCB1bCBjb250YWluZXJcbiAgICAgICAgdWwuY2xhc3NMaXN0LmFkZChcInN1Yi1kYXRhLWxpc3QtXCIgKyBwaWVfbnVtKVxuICAgICAgICB1bC5pZCA9IChcInN1Yi1kYXRhLWxpc3QtXCIgKyBwaWVfbnVtKVxuXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKHN1Yl90YXggPT4ge1xuICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICBsaS5zdHlsZS5oZWlnaHQgPSAoc3ViX3RheC5wZXJjZW50X29mX3RvdGFsICogNikgKyAncHgnXG4gICAgICAgICAgICB1bC5hcHBlbmRDaGlsZChsaSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZCh1bClcbiAgICB9XG59XG5cbmNvbnN0IGdyb3VwVG90YWwgPSBhcnJheSA9PiB7XG4gICAgbGV0IHRvdGFsID0gMFxuICAgIGFycmF5LmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgdG90YWwgKz0gb2JqLmFtb3VudFxuICAgIH0pO1xuICAgIHJldHVybiB0b3RhbFxufSIsIlxuXG5leHBvcnQgY29uc3QgYXNzaWduQm94ID0gKGFycmF5X29mX29ianMsIHBpZV9udW0pID0+IHtcbiAgICBjb25zdCBzaWRlID0gcGllX251bSA9PT0gMSA/ICdsZWZ0LWJveC0nIDogJ3JpZ2h0LWJveC0nXG4gICAgYXJyYXlfb2Zfb2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBpID0gNDtcbiAgICAgICAgc3dpdGNoIChvYmoua2V5KSB7XG4gICAgICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMCBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJJbmNvbWUgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMSBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDIgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiUHJvcGVydHkgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMyBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaWRlICsgaSlcbiAgICAgICAgY29uc3QgZGVjaW1hbHMgPSBTdHJpbmcob2JqLnBlcmNlbnQpLnNwbGl0KCcuJylbMV1cbiAgICAgICAgY29uc3QgaW50ZWdlcnMgPSBTdHJpbmcob2JqLnBlcmNlbnQpLnNwbGl0KCcuJylbMF1cbiAgICAgICAgY29uc3Qgc2xpY2VkID0gb2JqLnBlcmNlbnQgPyBpbnRlZ2VycyArICcuJyArIGRlY2ltYWxzLnNsaWNlKDAsIDIpIDogMFxuICAgICAgICBib3guaW5uZXJIVE1MID0gc2xpY2VkICsgJyUnXG4gICAgfSk7XG59XG5cbi8vIGQuQU1PVU5UID09PSAnWCcgPyAwIDogZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDAsXG5leHBvcnQgY29uc3QgZmluZEFtb3VudCA9IChhbW91bnQpID0+IHtcbiAgICByZXR1cm4gYW1vdW50ID09PSAnWCcgPyAwIDogYW1vdW50LnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwXG59XG5cbi8vIGV4cG9ydCBjb25zdCBzdWJEYXRhUHVzaGVyID0gKGl0ZW0pID0+IHtcbi8vICAgICBpZiAoaXRlbSAhPSBcIlQwMFwiICYmIGl0ZW0gIT0gXCJUMDFcIikge1xuLy8gICAgICAgICBzd2l0Y2ggKGl0ZW0uc2xpY2UoMCwgMikpIHtcbi8vICAgICAgICAgICAgIGNhc2UgKFwiVDBcIiB8fCBcIlQxXCIpOlxuLy8gICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2goe1xuLy8gICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4vLyAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4vLyAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnQ6IChmaW5kQW1vdW50KGQuQU1PVU5UKSAvIFRPVEFMKSAqIDEwMFxuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgXG4vLyAgICAgICAgICAgICBjYXNlIFwiVDJcIjpcbi8vICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2goe1xuICAgIFxuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9XG5cbmV4cG9ydCBjb25zdCBidWRnZXRDaXJjbGUgPSAoZGF0dW0xKSA9PiB7XG4gICAgLy8gYmFzZWQgb24gTWF0dGhldyBNY0tlbm5hJ3MgZXhhbXBsZSBhdCBodHRwOi8vYmwub2Nrcy5vcmcvbXBtY2tlbm5hOC9yYXcvNTY2NTA5ZGQzZDlhMDhlNWY5YjIvXG4gICAgLy8gZGVidWdnZXJcbiAgICByZXR1cm4gZGF0dW0yID0+IHtcbiAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgZGF0YSA9IFtkYXR1bTEsIGRhdHVtMl1cblxuICAgICAgICBjb25zdCBoZWlnaHQgPSAxMDBcbiAgICAgICAgY29uc3Qgd2lkdGggPSAxMDAwXG4gICAgXG4gICAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpXG4gICAgICAgIGNvbnN0IGNpcmNsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgY2lyY2xlRGl2LmNsYXNzTGlzdC5hZGQoXCJjaXJjbGUtY29udGFpbmVyXCIpXG4gICAgICAgIGNpcmNsZURpdi5pZCA9IFwiY2lyY2xlLWNvbnRhaW5lclwiXG4gICAgICAgIGNpcmNsZURpdi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG4gICAgICAgIGNpcmNsZURpdi5zdHlsZS5oZWlnaHQgPSBoZWlnaHRcbiAgICAgICAgY2lyY2xlRGl2LnN0eWxlLndpZHRoID0gd2lkdGhcbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZChjaXJjbGVEaXYpXG4gICAgXG4gICAgICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdCgnI2NpcmNsZS1jb250YWluZXInKS5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKTtcbiAgICBcbiAgICAgICAgY29uc3QgcnNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbMCwgKGQzLm1heChkYXRhKSkgXSlcbiAgICAgICAgICAgIC5yYW5nZShbMywgMjBdKVxuICAgIFxuICAgICAgICBzdmcuc2VsZWN0QWxsKCcuY2lyY2xlcycpLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcnNjYWxlKGQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZXMnKS5hdHRyKCdjeScsIGhlaWdodCAvIDIpXG4gICAgICAgICAgICAuYXR0cignY3gnLCAoZCwgaSkgPT4gMjAgKyA0MCAqIGkpXG4gICAgfVxufSIsIi8vIEEgbG90IG9mIHRoaXMgY29kZSB3YXMgYmFzZWQgaGVhdmlseSBvZmYgb2YgS2FydGhpayBUaG90YSdzIHlvdXR1YmUgdHV0b3JpYWwgXCJJbnRyb2R1Y3Rpb24gdG8gZDMuanMgPSBQaWUgQ2hhcnQgYW5kIERvbnV0IENoYXJ0XCJcbi8vIFRoZSBsZWdlbmQgY29kZSB3YXMgZnJvbSBDcnlwdGVycyBJbmZvdGVjaCdzIHlvdXR1YmUgdHV0b3JpYWwgXCJQaWUgQ2hhcnQgdXNpbmcgRDMuanNcIlxuXG5pbXBvcnQgeyBhc3NpZ25Cb3gsIGZpbmRBbW91bnQsIGJ1ZGdldENpcmNsZSB9IGZyb20gJy4vaGVscGVyX2Z1bmN0aW9ucydcbmltcG9ydCB7IHN1YkRhdGEsIGNzc1N1YkRhdGFEaXNwbGF5IH0gZnJvbSAnLi9ldmVudF9oYW5kbGVycydcblxuLy8gZXhwb3J0IGNvbnN0IENPTE9SUyA9IFtcIiNhNjc1MWVcIiwgXCIjZTdhYjA0XCIsIFwiIzY2YTUxZVwiLCBcIiM3NDcwYjNcIiwgXCIjZTgyYjhhXCJdXG5leHBvcnQgY29uc3QgQ09MT1JTID0gW1wiI2E2NzUxZVwiLCBcIiNlN2FiMDRcIiwgXCIjNjZhNTFlXCIsIFwiIzc0NzBiM1wiLCBcIiNlODJiOGFcIl1cbi8vIGV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJPdGhlciBUYXhlc1wiXVxuZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIk90aGVyIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgVGF4ZXNcIl1cbi8vIGV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihjc3ZQYXRoLCBzZWN0b3IsIGFtb3VudCwgc3RhdGUsIG11bHRpcGxpZXIgPSAxLCBza2lwID0gMSkge1xuZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCB0YXhfdHlwZSwgcGllX251bSwgY3N2ID0gXCIuL3NyYy9hc3NldHMvZGF0YS9GWTIwMTgtU1RDLURldGFpbGVkLVRhYmxlLmNzdlwiKSB7XG5cbiAgICAvLyBjb25zdCByZW1vdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvdGFscy1cIiArIHBpZV9udW0pXG4gICAgLy8gcmVtb3ZlID8gcmVtb3ZlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlKSA6IG51bGxcblxuICAgIC8vIGNvbnN0IHJlbW92ZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRldGFpbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZTIgPyByZW1vdmUyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlMikgOiBudWxsXG5cbiAgICBjb25zdCBoMSA9IGQzLnNlbGVjdCgnI3RvdGFscy1oZWFkZXItJyArIHBpZV9udW0pXG4gICAgY29uc3Qgc3BhbiA9IGQzLnNlbGVjdCgnI3RvdGFscy1zcGFuLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IGgyID0gZDMuc2VsZWN0KFwiI2RldGFpbHMtXCIgKyBwaWVfbnVtKVxuXG5cbiAgICBsZXQgVE9UQUwgPSAwO1xuICAgIGxldCBUWVBFUyA9IFtdXG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cblxuXG4gICAgY29uc3QgY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKENPTE9SUyk7XG5cbiAgICAvLyBhcmMgZ2VuZXJhdG9yXG4gICAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDEwKVxuICAgICAgICAvLyAuaW5uZXJSYWRpdXMoMCk7IC8vIGZvciBjaXJjbGVcbiAgICAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDEwMCkgLy8gZm9yIGRvbnV0XG5cbiAgICAvLyBjb25zdCBsYWJsZUFyYyA9IGQzLmFyYygpXG4gICAgLy8gICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSA1MClcbiAgICAvLyAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDUwKTtcblxuICAgIC8vIHBpZSBnZW5lcmF0b3JcbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgICAvLyAuc29ydChudWxsKVxuICAgICAgICAudmFsdWUoZCA9PiBkLmFtb3VudCk7XG5cbiAgICAvLyBkZWZpbmUgc3ZnIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIi5waWUtXCIgKyBwaWVfbnVtKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKVxuXG4gICAgLy8gaW1wb3J0IGRhdGFcbiAgICBkMy5jc3YoY3N2KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgYXJyYXlzIHRoYXQgd2lsbCBjb250YWluIHRoZSBzdWIgbGV2ZWwgdGF4IGRhdGFcbiAgICAgICAgbGV0IHNhbGVzX3RheGVzID0gW11cbiAgICAgICAgbGV0IGxpY2Vuc2VfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgaW5jb21lX3RheGVzID0gW11cbiAgICAgICAgbGV0IG90aGVyX3RheGVzID0gW11cbiAgICAgICAgLy8gbGV0IHNhbGVzX3RheF9vYmogPSB7IHRheF9ncm91cDogTEFCRUxTWzRdIH1cbiAgICAgICAgLy8gcGFyc2UgdGhlIGNzdlxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9IFwiVDAwXCIgJiYgZC5pdGVtICE9IFwiVDAxXCIpIHsgIC8vIGRvbid0IHdhbnQgdG8gY2F0Y2ggVG90YWwgb3IgUHJvcGVydHkgVGF4ZXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRheF9vYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudF9vZl90b3RhbDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkLml0ZW0uc2xpY2UoMCwyKSkgeyAvLyBmaWxsIHVwIHN1YiBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iaikgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzYWxlc190YXhfb2JqW2QuVGF4X1R5cGVdID0gZmluZEFtb3VudChkLkFNT1VOVClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMlwiOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29tZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9ICdUMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUWVBFUy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZC5rZXkgPSBkLlRheF9UeXBlO1xuICAgICAgICAgICAgICAgICAgICBkLmFtb3VudCA9IGZpbmRBbW91bnQoZC5BTU9VTlQpO1xuICAgICAgICAgICAgICAgICAgICBkLnBlcmNlbnQgPSAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWluZXJfYXJyYXkgPSBbXSAgLy8gc2V0dGluZyB1cCBjb250YWluZXIgYXJyYXkgZm9yIHBhc3NpbmcgaW50byBjbGljayBoYW5kbGVyXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuICAgICAgICAvLyBzZXQgaDEgYWZ0ZXIgdG90YWwgaGFzIGJlZW4gZGVmaW5lZFxuICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgXCIpXG4gICAgICAgIHNwYW4udGV4dChcIiRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgaDIudGV4dChcIlwiKVxuICAgICAgICAvLyBhdHRlbXB0IGJ1ZGdldENpcmNsZSBjYWxsXG4gICAgICAgIGJ1ZGdldENpcmNsZShUT1RBTClcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwZXJjZW50YWdlcyBpbiB0aGUgY2VudGVyIGJveFxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgYXJjKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBkID0+IGNvbG9ycyhkLmRhdGEua2V5KSlcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbignZCcsIHBpZVR3ZWVuKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHBhdGgub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIC8vIHdoeSBkb2Vzbid0IHRoaXMgd29yaz9cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gICAgICAgICAgICAgLmR1cmF0aW9uKCc1MCcpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIGRldGVybWluZSBob3cgdG8gZmxpcCB0aGUgcGllc1xuICAgICAgICBpZiAocGllX251bSA9PT0gMikgey8vIGZsaXAgdGhlIHNlY29uZCBwaWVcbiAgICAgICAgICAgIGcuYXR0cihcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVgoLTEpIHRyYW5zbGF0ZSgzMDBweCwgMHB4KSBzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgZy5vbihcIm1vdXNlb3ZlclwiLCAoZCwgaSkgPT4geyAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZClcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbignNTAnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsICcuODUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcImN1cnNvclwiLCAncG9pbnRlcicpXG4gICAgICAgICAgICB9KVxuICAgICAgICBnLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgIC8vIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE4IHdhcyAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICAvLyBoMi50ZXh0KFwiXCIpXG4gICAgICAgIH0pXG4gICAgICAgIC8vIC5vbihcImNsaWNrXCIsIGNzc1N1YkRhdGFEaXNwbGF5KGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkpO1xuICAgICAgICAgICAgXG4gICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHsgaWYgKGVycm9yKSB0aHJvdyBlcnJvciB9KVxuXG4gICAgY29uc3QgcGllVHdlZW4gPSBiID0+IHtcbiAgICAgICAgYi5pbm5lclJhZGl1cyA9IDA7XG4gICAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZSh7IHN0YXJ0QW5nbGU6IDAsIGVuZEFuZ2xlOiAwIH0sIGIpXG4gICAgICAgIHJldHVybiAodCkgPT4geyByZXR1cm4gYXJjKGkodCkpIH1cbiAgICB9ICAgIFxuXG59XG4iLCJpbXBvcnQgeyBDT0xPUlMsIExBQkVMU30gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgcGllTGVnZW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IG1hc3Rlcl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgbWFzdGVyX2xpc3QuY2xhc3NMaXN0LmFkZCgnbWFzdGVyLWxpc3QnKVxuXG4gICAgY29uc3QgbGVmdF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHRleHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCByaWdodF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgbGVmdF9saXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnQtbGlzdCcpICBcbiAgICB0ZXh0X2xpc3QuY2xhc3NMaXN0LmFkZCgndGV4dC1saXN0JykgIFxuICAgIHJpZ2h0X2xpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHQtbGlzdCcpIFxuXG4gICAgZm9yIChsZXQgaSA9IExBQkVMUy5sZW5ndGggLSAxIDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxlZnRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCB0ZXh0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgcmlnaHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIGxlZnRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdsZWZ0LWJveCcpXG4gICAgICAgIGxlZnRfYm94LmlkID0gKCdsZWZ0LWJveC0nICsgaSlcbiAgICAgICAgbGVmdF9ib3guc3R5bGUuY29sb3IgPSBDT0xPUlNbaV1cblxuICAgICAgICByaWdodF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ3JpZ2h0LWJveCcpXG4gICAgICAgIHJpZ2h0X2JveC5pZCA9ICgncmlnaHQtYm94LScgKyBpKVxuICAgICAgICByaWdodF9ib3guc3R5bGUuY29sb3IgPSBDT0xPUlNbaV1cblxuICAgICAgICB0ZXh0X2JveC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWJveCcpXG4gICAgICAgIHRleHRfYm94LmlubmVySFRNTCA9IExBQkVMU1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gQ09MT1JTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgXCIgKyBDT0xPUlNbaV1cblxuICAgICAgICBsZWZ0X2xpc3QuYXBwZW5kQ2hpbGQobGVmdF9ib3gpXG4gICAgICAgIHRleHRfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2JveClcbiAgICAgICAgcmlnaHRfbGlzdC5hcHBlbmRDaGlsZChyaWdodF9ib3gpXG4gICAgfVxuXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQobGVmdF9saXN0KVxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKHRleHRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZChyaWdodF9saXN0KVxuICAgIHJldHVybiBtYXN0ZXJfbGlzdFxufVxuXG5jb25zdCBzdWJsaXN0cyA9IChsYWJlbCwgY29sb3IpID0+IHtcbiAgICBjb25zdCBsaXN0cyA9IFtdXG5cblxuICAgIGxlc3RsaXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnRsaXN0JylcbiAgICB0ZXh0bGlzdC5jbGFzc0xpc3QuYWRkKCd0ZXh0bGlzdCcpXG4gICAgcmlnaHRsaXN0LmNsYXNzTGlzdC5hZGQoJ3JpZ2h0bGlzdCcpXG5cbiAgICBjb25zdCBsZWZ0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGNvbnN0IHJpZ2h0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG5cblxuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG5cbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKGxlZnRCb3gpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsaSlcbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKHJpZ2h0Qm94KVxuICAgIHJldHVybiBzdWJsaXN0XG59IiwiaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBUT1BfTEVWRUwgPSBbJ1QwMCcsICdUMDEnLCAnVEExJywgJ1RBMycsICdUQTQnLCAnVEE1J11cbmNvbnN0IFNUQVRFX05BTUVTID0gWydBbGFiYW1hJywgJ0FsYXNrYScsICdBcml6b25hJywgJ0Fya2Fuc2FzJywgJ0NhbGlmb3JuaWEnLCAnQ29sb3JhZG8nLCAnQ29ubmVjdGljdXQnLCAnRGVsYXdhcmUnLCAnRmxvcmlkYScsICdHZW9yZ2lhJywgJ0hhd2FpaScsICdJZGFobycsICdJbGxpbm9pcycsICdJbmRpYW5hJywgJ0lvd2EnLCAnS2Fuc2FzJywgJ0tlbnR1Y2t5JywgJ0xvdWlzaWFuYScsICdNYWluZScsICdNYXJ5bGFuZCcsICdNYXNzYWNodXNldHRzJywgJ01pY2hpZ2FuJywgJ01pbm5lc290YScsICdNaXNzaXNzaXBwaScsICdNaXNzb3VyaScsICdNb250YW5hJywgJ05lYnJhc2thJywgJ05ldmFkYScsICdOZXcgSGFtcHNoaXJlJywgJ05ldyBKZXJzZXknLCAnTmV3IE1leGljbycsICdOZXcgWW9yaycsICdOb3J0aCBDYXJvbGluYScsICdOb3J0aCBEYWtvdGEnLCAnT2hpbycsICdPa2xhaG9tYScsICdPcmVnb24nLCAnUGVubnN5bHZhbmlhJywgJ1Job2RlIElzbGFuZCcsICdTb3V0aCBDYXJvbGluYScsICdTb3V0aCBEYWtvdGEnLCAnVGVubmVzc2VlJywgJ1RleGFzJywgJ1V0YWgnLCAnVmVybW9udCcsICdWaXJnaW5pYScsICdXYXNoaW5ndG9uJywgJ1dlc3QgVmlyZ2luaWEnLCAnV2lzY29uc2luJywgJ1d5b21pbmcnXVxuXG4vLyBleHBvcnQgY29uc3Qgc2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuXG4vLyAgICAgLy8gY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgIC8vIHJldmlzaXQgaWYgdGltZSB0byBtYWtlIGN1c3RvbSBzZWxlY3Rcbi8vICAgICAvLyBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5pdGlhbC1jb250YWluZXInKVxuXG4vLyAgICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKVxuLy8gICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNlbGVjdC1cIiArIHBpZV9udW0pXG5cbi8vICAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gZSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHN0YXRlID0gZS50YXJnZXQudmFsdWVcbi8vICAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctXCIgKyBwaWVfbnVtKVxuLy8gICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4vLyAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG5cbi8vICAgICAgICAgY29uc3Qgc2lkZSA9IHBpZV9udW0gPT09IDEgPyBcIi1sZWZ0XCIgOiBcIi1yaWdodFwiXG4vLyAgICAgICAgIC8vIGNvbnN0IGgyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN0YXRlXCIgKyBzaWRlKVswXVxuLy8gICAgICAgICAvLyBoMi5pbm5lckhUTUwgPSBzdGF0ZVxuLy8gICAgIH1cblxuLy8gICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuLy8gICAgICAgICBjb25zdCBkZWZhdWx0X3N0YXRlID0gcGllX251bSA9PT0gMSA/IFNUQVRFX05BTUVTWzBdIDogU1RBVEVfTkFNRVNbU1RBVEVfTkFNRVMubGVuZ3RoIC0gMV1cbi8vICAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuLy8gICAgICAgICBpZiAoc3RhdGUgPT09IGRlZmF1bHRfc3RhdGUpIHtcbi8vICAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCB0cnVlKVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBzdGF0ZVxuLy8gICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4vLyAgICAgICAgIC8vIG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4vLyAgICAgICAgIC8vIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuLy8gICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKVxuLy8gICAgIH0pXG4vLyAgICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc3RhdGVTZWxlY3Rvcilcbi8vICAgICAvLyBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KVxuLy8gICAgIC8vIHJldHVybiBjb250YWluZXJcbi8vICAgICByZXR1cm4gc2VsZWN0XG4vLyB9XG5cbi8vIGNvbnN0IHBoYXNlT3V0ID0gKG5vZGUpID0+IHtcblxuLy8gICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxuLy8gfVxuXG5leHBvcnQgY29uc3Qgc3RhdGVfc2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuIFxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwic2VsZWN0LXdyYXBwZXItXCIgKyBwaWVfbnVtKVxuICAgIHdyYXBwZXIuaWQgPSBcInNlbGVjdC13cmFwcGVyLVwiICsgcGllX251bVxuXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICBzZWxlY3QuaW5uZXJIVE1MID0gcGllX251bSA9PT0gMSA/ICdBbGFiYW1hJyA6ICdXeW9taW5nJ1xuICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuICAgIHNlbGVjdC5pZCA9IFwic2VsZWN0LVwiICsgcGllX251bVxuXG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgfSlcbiAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBlID0+IHtcbiAgICAgICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIH0pXG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGUgPT4ge1xuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgfSlcbiAgICBcbiAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gc3RhdGUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGUgPT4ge1xuICAgICAgICAgICAgLy8gY29uc3Qgc3RhdGUgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuICAgICAgICAgICAgc2VsZWN0LmlubmVyVGV4dCA9IHN0YXRlXG4gICAgICAgICAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4gICAgICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgVE9QX0xFVkVMLCBwaWVfbnVtKVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHN0YXRlX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdzdGF0ZS1saXN0LScgKyBwaWVfbnVtKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICBzdGF0ZV9saXN0LmlkID0gJ3N0YXRlLWxpc3QtJyArIHBpZV9udW1cbiAgICBcbiAgICBTVEFURV9OQU1FUy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGVfbGlzdF9pdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5pbm5lckhUTUwgPSBzdGF0ZVxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4gICAgICAgIHN0YXRlX2xpc3QuYXBwZW5kQ2hpbGQoc3RhdGVfbGlzdF9pdGVtKVxuICAgIH0pXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChzZWxlY3QpXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChzdGF0ZV9saXN0KVxuICAgIFxuICAgIHJldHVybiB3cmFwcGVyXG59XG5cbi8vIGNvbnN0IHBoYXNlT3V0ID0gKG5vZGUpID0+IHtcblxuLy8gICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxuLy8gfSIsImNvbnN0IFlFQVJTID0gWzIwMTgsIDIwMTddXG5cbmV4cG9ydCBjb25zdCB5ZWFyU2VsZWN0b3IgPSB5ZWFyID0+IHtcbiAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAgIHNlbGVjdC5pbm5lckhUTUwgPSB5ZWFyXG4gICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcInllYXItc2VsZWN0XCIpXG4gICAgc2VsZWN0LmlkID0gJ3llYXItc2VsZWN0J1xuICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBcbiAgICB9KVxuXG4gICAgY29uc3QgeWVhckNob2ljZSA9ICh5ZWFyID0gMjAxOCkgPT4ge1xuICAgICAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjc3YgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3llYXItc2VsZWN0JylcbiAgICAgICAgICAgIHNlbGVjdC5pbm5lckhUTUwgPSB5ZWFyXG4gICAgICAgICAgICAvLyBnZXQgc3RhdGVzXG4gICAgICAgICAgICBzdGF0ZTEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0LTEnKS5pbm5lckhUTUxcbiAgICAgICAgICAgIHN0YXRlMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3QtMicpLmlubmVySFRNTFxuXG4gICAgICAgICAgICAvLyBtYWtlIHR3byBuZXcgcGllc1xuICAgICAgICAgICAgY29uc3Qgc3ZnMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLTFcIilcbiAgICAgICAgICAgIGNvbnN0IHN2ZzIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN2Zy0yXCIpXG4gICAgICAgICAgICBzdmcxLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3ZnMSlcbiAgICAgICAgICAgIHN2ZzIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcyKVxuICAgICAgICAgICAgUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUxLCBUT1BfTEVWRUwsIDEsIGNzdilcbiAgICAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlMiwgVE9QX0xFVkVMLCAyLCBjc3YpXG5cblxuXG4gICAgICAgICAgICBjb25zdCBzaWRlID0gcGllX251bSA9PT0gMSA/IFwiLWxlZnRcIiA6IFwiLXJpZ2h0XCJcbiAgICAgICAgICAgIC8vIGNvbnN0IGgyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInllYXJcIiArIHNpZGUpWzBdXG4gICAgICAgICAgICAvLyBoMi5pbm5lckhUTUwgPSB5ZWFyXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZV9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgneWVhci1saXN0JylcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgc3RhdGVfbGlzdC5pZCA9ICd5ZWFyLWxpc3QnXG5cbiAgICBZRUFSUy5mb3JFYWNoKHllYXIgPT4ge1xuICAgICAgICBjb25zdCB5ZWFyX2xpc3RfaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGAuL3NyYy9hc3NldHMvZGF0YS9GWSR7eWVhcn0tU1RDLURldGFpbGVkLVRhYmxlLmNzdmApXG4gICAgICAgIHllYXJfbGlzdF9pdGVtLmlubmVySFRNTCA9IHllYXJcbiAgICAgICAgeWVhcl9saXN0X2l0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHllYXJDaG9pY2UoeWVhcikpXG4gICAgICAgIHllYXJfbGlzdC5hcHBlbmRDaGlsZCh5ZWFyX2xpc3RfaXRlbSlcbiAgICB9KVxufSIsIlxuaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHBpZUxlZ2VuZCB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfbGVnZW5kJ1xuaW1wb3J0IHsgc3RhdGVfc2VsZWN0b3IsIFRPUF9MRVZFTCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGF0ZV9zZWxlY3RvcidcbmltcG9ydCB7IHllYXJTZWxlY3RvciB9IGZyb20gJy4vY29tcG9uZW50cy95ZWFyX3NlbGVjdG9yJ1xuaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2NzcydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIFxuICAgIC8vIFBDRyAtPiBjc3ZQYXRoLCBzZWN0b3IsIGFtb3V0LCBsb2NhdGlvbiwgbXVsdGlwbGllciwgc2tpcFxuICAgIFxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgICAvLyBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHNlbGVjdF8xID0gc3RhdGVfc2VsZWN0b3IoMSlcbiAgICBjb25zdCBzZWxlY3RfMiA9IHN0YXRlX3NlbGVjdG9yKDIpXG4gICAgY29uc3Qgc2VsZWN0b3JfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdG9yLWNvbnRhaW5lclwiKVswXVxuICAgIFxuICAgIGNvbnN0IHllYXJTZWxlY3RvciA9IHllYXJTZWxlY3RvclxuXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8xKVxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMilcbiAgICByb290LmFwcGVuZENoaWxkKHVsKVxuXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJBbGFiYW1hXCIsIFRPUF9MRVZFTCwgMSlcbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIld5b21pbmdcIiwgVE9QX0xFVkVMLCAyKVxufSlcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=