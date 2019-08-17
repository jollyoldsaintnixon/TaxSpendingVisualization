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
        // const div = d3.select("main").append("div")
        //     .attr("class", "sub-data-" + pie_num).attr("id", "sub-data-" + pie_num)

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
        var stack = d3.stack().keys([tax_type]).order(d3.stackOrderNone).offset(d3.stackOffsetNone);

        var layers = stack(sub_array);

        var x = d3.scaleOrdinal().domain(layers[0].map(function (d) {
            return d.x;
        })).range([10, width], 0); // may be a quicker way to do this as there is only one bar

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

// A lot of this code was based heavily off of Karthik Thota's youtube tutorial "Introduction to d3.js = Pie Chart and Donut Chart"
// The legend code was from Crypters Infotech's youtube tutorial "Pie Chart using D3.js"

var COLORS = exports.COLORS = ["#a6751e", "#e7ab04", "#66a51e", "#7470b3", "#e82b8a"];
// export const LABELS = ["Property Taxes", "Sales and Gross Receipts Taxes", "License Taxes", "Income Taxes", "Other Taxes"]
var LABELS = exports.LABELS = ["Other Taxes", "Income Taxes", "License Taxes", "Property Taxes", "Sales Taxes"];
// export function PieChartGenerator(csvPath, sector, amount, state, multiplier = 1, skip = 1) {
function PieChartGenerator(state, tax_type, pie_num) {

    var remove = document.getElementById("totals-" + pie_num);
    remove ? remove.parentNode.removeChild(remove) : null;

    var remove2 = document.getElementById("totals-" + pie_num);
    remove2 ? remove2.parentNode.removeChild(remove2) : null;

    var div = d3.select("#totals").append("div").attr("class", "totals-" + pie_num).attr("id", "totals-" + pie_num);

    var h1 = div.append("h1");
    // .attr('id', 'revenue-' + pie_num)

    var span = div.append("span");

    var h2 = d3.select("#details").append("h2");
    // .attr('id', 'percent-' + pie_num)

    var TOTAL = 0;
    var TYPES = [];
    // CIRCLE TIME BABY
    // margin and radius
    var margin = { top: 200, right: 200, bottom: 200, left: 200 },
        height = 1000 - margin.top - margin.bottom,
        width = 1000 - margin.left - margin.right,
        radius = width / 2;

    var colors = d3.scaleOrdinal(d3.schemeDark2);

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
    d3.csv("./src/assets/data/FY2018_tax_revenue_detailed.csv").then(function (data) {
        // initialize arrays that will contain the sub level tax data
        var sales_taxes = [];
        var license_taxes = [];
        var income_taxes = [];
        var other_taxes = [];
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
                        percent: (0, _helper_functions.findAmount)(d.AMOUNT) / TOTAL * 100
                    };
                    switch (d.item.slice(0, 2)) {// fill up sub arrays
                        case "T0":
                            sales_taxes.push(tax_obj);
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
        // set up the percentages in the center box
        (0, _helper_functions.assignBox)(TYPES, pie_num);

        var g = svg.selectAll(".arc").data(pie(data)).enter().append("g") // And this line to grow the number of g's to the data set size
        .attr("class", "arc").style("display", function (d, i) {
            return d.value === TOTAL ? "none" : "null";
        }); // attempt to render half the chart invisible

        // append the path of the arc
        g.append("path").attr("d", arc).style("fill", function (d) {
            return colors(d.data.key);
        }).transition().ease(d3.easeLinear).duration(500).attrTween('d', pieTween);

        if (pie_num === 2) {
            // flip the second pie
            g.attr("position", "absolute");
            g.style("transform", "scaleX(-1) translate(300px, 0px)");
        }
        // event handlers
        g.on("mouseover", function (ele) {
            console.log(ele);
            // h1.text(ele.data.key + " accounts for $" + d3.format(',')(ele.data.amount) + " out of $" + d3.format(',')(TOTAL))
            // h2.text("This is " + String((ele.data.amount / TOTAL) * 100).slice(0, 5) + "% of the total")
        }).on("mouseout", function (ele) {
            // h1.text(state + "'s tax revenue for 2018 was $" + d3.format(',')(TOTAL))
            // h2.text("")
        }).on("click", (0, _event_handlers.subData)(container_array, pie_num));

        // if (pie_num === 2) {
        //     const legends = svg.append("g").attr("transform", "translate(-63, -128)")
        //         .selectAll(".legends").data(TYPES);

        //     const legend = legends.enter().append("g").classed("legends", true).attr("transform", (d , i) => "translate(0," + (i+1) * 30 +  ")");
        //     legend.append("rect")
        //         .attr("width", 20)
        //         .attr("height", 20);

        //     debugger
        //     legend.style("stroke", (d, i) => i ? COLORS[i - 1] : null)
        //         .style("fill", "transparent")
        //         .style("display", (d, i) => i ? "null" : "none")

        //     // legend.append("text").classed("label", true).text((d, i) => LABELS[i-1])
        //     //     .attr("fill", (d, i) => i ? COLORS[i - 1] : null)
        //     //     .attr("x", 30)
        //     //     .attr("y", 20)
        //     //     .attr("border", (d, i) => "3px solid " + COLORS[i - 1])
        //     legend.append("text").classed("label", true).text((d, i) => LABELS[i-1])
        //         .style("stroke", "none")
        //         .attr("fill", (d, i) => i ? COLORS[i - 1] : null)
        //         .attr("x", 30)
        //         .attr("y", 20)
        //         .attr("border", (d, i) => "3px solid " + COLORS[i - 1])
        // }
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

    for (var i = 0; i < _pie_chart_generator.LABELS.length; i++) {
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

/***/ "./src/components/selector.js":
/*!************************************!*\
  !*** ./src/components/selector.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selector = exports.TOP_LEVEL = undefined;

var _pie_chart_generator = __webpack_require__(/*! ./pie_chart_generator */ "./src/components/pie_chart_generator.js");

var TOP_LEVEL = exports.TOP_LEVEL = ['T00', 'T01', 'TA1', 'TA3', 'TA4', 'TA5'];

var selector = exports.selector = function selector(pie_num) {
    var STATE_NAMES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    // const container = document.createElement('div')  // revisit if time to make custom select
    // container.classList.add('initial-container')

    var select = document.createElement("select");
    select.setAttribute("class", "select-" + pie_num);

    var stateSelector = function stateSelector(e) {
        var state = e.target.value;
        var svg = document.getElementById("svg-" + pie_num);
        svg.parentNode.removeChild(svg);
        (0, _pie_chart_generator.PieChartGenerator)(state, TOP_LEVEL, pie_num);

        var side = pie_num === 1 ? "-left" : "-right";
        // const h2 = document.getElementsByClassName("state" + side)[0]
        // h2.innerHTML = state
    };

    STATE_NAMES.forEach(function (state) {
        var default_state = pie_num === 1 ? STATE_NAMES[0] : STATE_NAMES[STATE_NAMES.length - 1];
        var option = document.createElement("option");
        if (state === default_state) {
            option.setAttribute("selected", true);
        }
        option.innerHTML = state;
        option.setAttribute("value", state);
        // option.addEventListener("click", stateSelector(state))
        // option.setAttribute("onclick", stateSelector(state))
        select.appendChild(option);
    });
    select.addEventListener("change", stateSelector);
    // container.appendChild(select)
    // return container
    return select;
};

var phaseOut = function phaseOut(node) {

    node.parentNode.removeChild(node);
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

var _selector = __webpack_require__(/*! ./components/selector */ "./src/components/selector.js");

document.addEventListener("DOMContentLoaded", function () {

    // PCG -> csvPath, sector, amout, location, multiplier, skip

    var root = document.getElementById("root");
    // const ul = pieLegend()
    var ul = (0, _pie_legend.pieLegend)();
    var select_1 = (0, _selector.selector)(1);
    var select_2 = (0, _selector.selector)(2);
    var selector_container = document.getElementsByClassName("selector-container")[0];

    selector_container.appendChild(select_1);
    selector_container.appendChild(select_2);
    root.appendChild(ul);

    (0, _pie_chart_generator.PieChartGenerator)("Alabama", _selector.TOP_LEVEL, 1);
    (0, _pie_chart_generator.PieChartGenerator)("Wyoming", _selector.TOP_LEVEL, 2);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZXZlbnRfaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbInN1YkRhdGEiLCJjb250YWluZXJfYXJyYXkiLCJwaWVfbnVtIiwiZWxlIiwidGF4X3R5cGUiLCJkYXRhIiwia2V5Iiwic3ViX2FycmF5Iiwic3ViQXJyYXlMb2NhdG9yIiwid2lkdGgiLCJoZWlnaHQiLCJ0b29sdGlwV2lkdGgiLCJ0b29sdGlwSGVpZ2h0Iiwic3ZnIiwiZDMiLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwic3RhY2siLCJrZXlzIiwib3JkZXIiLCJzdGFja09yZGVyTm9uZSIsIm9mZnNldCIsInN0YWNrT2Zmc2V0Tm9uZSIsImxheWVycyIsIngiLCJzY2FsZU9yZGluYWwiLCJkb21haW4iLCJtYXAiLCJkIiwicmFuZ2UiLCJ5Iiwic2NhbGVMaW5lYXIiLCJtYXgiLCJ5MCIsImciLCJzZWxlY3RBbGwiLCJlbnRlciIsInJlY3QiLCJvbiIsInRvb2x0aXAiLCJzdHlsZSIsInhQb3MiLCJtb3VzZSIsInlQb3MiLCJ0ZXh0IiwicGVyY2VudCIsImFzc2lnbkJveCIsImFycmF5X29mX29ianMiLCJzaWRlIiwiZm9yRWFjaCIsIm9iaiIsImkiLCJib3giLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZGVjaW1hbHMiLCJTdHJpbmciLCJzcGxpdCIsImludGVnZXJzIiwic2xpY2VkIiwic2xpY2UiLCJpbm5lckhUTUwiLCJmaW5kQW1vdW50IiwiYW1vdW50Iiwiam9pbiIsIlBpZUNoYXJ0R2VuZXJhdG9yIiwiQ09MT1JTIiwiTEFCRUxTIiwic3RhdGUiLCJyZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJyZW1vdmUyIiwiZGl2IiwiaDEiLCJzcGFuIiwiaDIiLCJUT1RBTCIsIlRZUEVTIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwicmFkaXVzIiwiY29sb3JzIiwic2NoZW1lRGFyazIiLCJhcmMiLCJvdXRlclJhZGl1cyIsImlubmVyUmFkaXVzIiwicGllIiwidmFsdWUiLCJjc3YiLCJ0aGVuIiwic2FsZXNfdGF4ZXMiLCJsaWNlbnNlX3RheGVzIiwiaW5jb21lX3RheGVzIiwib3RoZXJfdGF4ZXMiLCJHZW9fTmFtZSIsIml0ZW0iLCJBTU9VTlQiLCJ0YXhfb2JqIiwiVGF4X1R5cGUiLCJwdXNoIiwiaW5jbHVkZXMiLCJmb3JtYXQiLCJ0cmFuc2l0aW9uIiwiZWFzZSIsImVhc2VMaW5lYXIiLCJkdXJhdGlvbiIsImF0dHJUd2VlbiIsInBpZVR3ZWVuIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyb3IiLCJiIiwiaW50ZXJwb2xhdGUiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJ0IiwicGllTGVnZW5kIiwibWFzdGVyX2xpc3QiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwibGVmdF9saXN0IiwidGV4dF9saXN0IiwicmlnaHRfbGlzdCIsImxlbmd0aCIsImxlZnRfYm94IiwidGV4dF9ib3giLCJyaWdodF9ib3giLCJpZCIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyIiwiYXBwZW5kQ2hpbGQiLCJzdWJsaXN0cyIsImxhYmVsIiwibGlzdHMiLCJsZXN0bGlzdCIsInRleHRsaXN0IiwicmlnaHRsaXN0IiwibGVmdEJveCIsInJpZ2h0Qm94IiwibGkiLCJzdWJsaXN0IiwiVE9QX0xFVkVMIiwic2VsZWN0b3IiLCJTVEFURV9OQU1FUyIsInNldEF0dHJpYnV0ZSIsInN0YXRlU2VsZWN0b3IiLCJlIiwidGFyZ2V0IiwiZGVmYXVsdF9zdGF0ZSIsIm9wdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJwaGFzZU91dCIsIm5vZGUiLCJyb290IiwidWwiLCJzZWxlY3RfMSIsInNlbGVjdF8yIiwic2VsZWN0b3JfY29udGFpbmVyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBOztBQUVPLElBQU1BLDRCQUFVLFNBQVZBLE9BQVUsQ0FBQ0MsZUFBRCxFQUFrQkMsT0FBbEIsRUFBOEI7QUFDakQ7QUFDQSxXQUFPLFVBQUNDLEdBQUQsRUFBUzs7QUFFWixZQUFNQyxXQUFXRCxJQUFJRSxJQUFKLENBQVNDLEdBQTFCOztBQUVBLFlBQU1DLFlBQVlDLGdCQUFnQkosUUFBaEIsRUFBMEJILGVB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QVQsQ0FBd0IsTUFBeEIsQ0FBYjtBQUNBO0FBQ0EsUUFBTTJHLEtBQUssNEJBQVg7QUFDQSxRQUFNQyxXQUFXLHdCQUFTLENBQVQsQ0FBakI7QUFDQSxRQUFNQyxXQUFXLHdCQUFTLENBQVQsQ0FBakI7QUFDQSxRQUFNQyxxQkFBcUIvRyxTQUFTZ0gsc0JBQVQsQ0FBZ0Msb0JBQWhDLEVBQXNELENBQXRELENBQTNCOztBQUVBRCx1QkFBbUIzQixXQUFuQixDQUErQnlCLFFBQS9CO0FBQ0FFLHVCQUFtQjNCLFdBQW5CLENBQStCMEIsUUFBL0I7QUFDQUgsU0FBS3ZCLFdBQUwsQ0FBaUJ3QixFQUFqQjs7QUFFQSxnREFBa0IsU0FBbEIsRUFBNkJiLG1CQUE3QixFQUF3QyxDQUF4QztBQUNBLGdEQUFrQixTQUFsQixFQUE2QkEsbUJBQTdCLEVBQXdDLENBQXhDO0FBQ0gsQ0FqQkQsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuLy8gY29udGFpbmVyX2FycmF5LnB1c2gobGljZW5zZV90YXhlcylcbi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKGluY29tZV90YXhlcylcbi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuXG5leHBvcnQgY29uc3Qgc3ViRGF0YSA9IChjb250YWluZXJfYXJyYXksIHBpZV9udW0pID0+IHtcbiAgICAvLyBhIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGxlYXJuZWQgZnJvbSBNaWNoYWVsIFN0YW5hbGFuZCdzIFwiU3RhY2tlZCBiYXIgY2hhcnQgd2l0aCB0b29sdGlwc1wiIHR1dG9yaWFsIGF0IGh0dHA6Ly9ibC5vY2tzLm9yZy9tc3RhbmFsYW5kLzYxMDA3MTNcbiAgICByZXR1cm4gKGVsZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRheF90eXBlID0gZWxlLmRhdGEua2V5XG5cbiAgICAgICAgY29uc3Qgc3ViX2FycmF5ID0gc3ViQXJyYXlMb2NhdG9yKHRheF90eXBlLCBjb250YWluZXJfYXJyYXkpXG4gICAgICAgIC8vIGNvbnN0IGRpdiA9IGQzLnNlbGVjdChcIm1haW5cIikuYXBwZW5kKFwiZGl2XCIpXG4gICAgICAgIC8vICAgICAuYXR0cihcImNsYXNzXCIsIFwic3ViLWRhdGEtXCIgKyBwaWVfbnVtKS5hdHRyKFwiaWRcIiwgXCJzdWItZGF0YS1cIiArIHBpZV9udW0pXG4gICAgICAgIFxuICAgICAgICBjb25zdCB3aWR0aCA9IDkwICAvLyBzZXR0aW5nIHRoZSBkaW1lbnNpb25zIHRvIGNvcnJlc3BvbmQgdG8gdGhlIHBpZSBjaGFydHMnXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDYwMFxuXG4gICAgICAgIGNvbnN0IHRvb2x0aXBXaWR0aCA9IDEyMCAvLyB3aWxsIGFsdGVyIHRoZXNlIGFzIG5lZWRlZFxuICAgICAgICBjb25zdCB0b29sdGlwSGVpZ2h0ID0gNDAgXG5cbiAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwibWFpblwiKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcblxuICAgICAgICAvLyBzZXQgdGhlIGxheWVycyBvZiB0aGUgc3RhY2tlZCBiYXJcbiAgICAgICAgLy8gY29uc3QgbGF5ZXJzID0gZDMuc3RhY2soKShbdGF4X3R5cGVdLm1hcCh0YXggPT4geyAgLy8gc2hvdWxkIHVsdGltYXRlbHkganVzdCBiZSB0aGUgb25lIGxheWVyXG4gICAgICAgIC8vICAgICByZXR1cm4gc3ViX2FycmF5Lm1hcChkID0+IHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4geyB4OiBkLmtleSwgeTogZC5hbW91bnQsIHBlcmNlbnQ6IGQucGVyY2VudCB9XG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyB9KSlcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBkMy5zdGFjaygpXG4gICAgICAgICAgICAua2V5cyhbdGF4X3R5cGVdKVxuICAgICAgICAgICAgLm9yZGVyKGQzLnN0YWNrT3JkZXJOb25lKVxuICAgICAgICAgICAgLm9mZnNldChkMy5zdGFja09mZnNldE5vbmUpXG5cbiAgICAgICAgY29uc3QgbGF5ZXJzID0gc3RhY2soc3ViX2FycmF5KVxuXG4gICAgICAgIGNvbnN0IHggPSBkMy5zY2FsZU9yZGluYWwoKVxuICAgICAgICAgICAgLmRvbWFpbihsYXllcnNbMF0ubWFwKGQgPT4gZC54KSlcbiAgICAgICAgICAgIC5yYW5nZShbMTAsIHdpZHRoXSwgMCkgIC8vIG1heSBiZSBhIHF1aWNrZXIgd2F5IHRvIGRvIHRoaXMgYXMgdGhlcmUgaXMgb25seSBvbmUgYmFyXG5cbiAgICAgICAgY29uc3QgeSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4obGF5ZXJzWzBdLm1hcChkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDMubWF4KGQsIGQgPT4gZC55MCArIGQueSkgIC8vIHRoZSBpbmNyZW1lbnQgdXAgdG8gdGhlIHRvdGFsXG4gICAgICAgICAgICB9KSkucmFuZ2UoW2hlaWdodCwgMF0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuc3ViLXRheGVzXCIpICAvLyBubyBnIGF0IHRoaXMgcG9pbnQsIGJ1dCB0aGV5IHdpbGwgaGF2ZSB0aGlzIGNsYXNzXG4gICAgICAgICAgICAuZGF0YShsYXllcnMpLmVudGVyKCkgIC8vIG5vdyB0aGVyZSB3aWxsIGJlIGEgZyBmb3IgZXZlcnkgb2JqIGluIHN1Yl9hcnJheS4gIHNob3VsZCBiZSBqdXN0IG9uZSBnXG4gICAgICAgICAgICAuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgXCJzdWItdGF4ZXNcIikgIFxuICAgICAgICAgICAgXG4gICAgICAgIGNvbnN0IHJlY3QgPSBnLnNlbGVjdEFsbChcInJlY3RcIikgIC8vIG1ha2luZyBlYWNoIG9iaiBvZiB0aGUgY29ycmVzcG9uZCB0byBhIHJlY3Qgd2l0aGluIHRoZSBnXG4gICAgICAgICAgICAuZGF0YShkID0+IGQpIC8vIHB1bGxpbmcgb3V0IGVhY2ggaW5kaXZpZHVhbCBvYmpcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB4KGQueCkpICAvLyBwYXNzaW5nIGVhY2ggb2JqJ3MgeCB2YWx1ZSB0byB0aGUgZDMgeCBmdW5jdGlvbiBkZWZpbmVkIGFib3ZlXG4gICAgICAgICAgICAuYXR0cigneScsIGQgPT4geShkLnkgKyBkLnkwKSkgIC8vIHkwIGlzIHRoZSBoZWlnaHQgd2hlcmUgZWFjaCBzZWdtZW50IGluIHRoZSBzdGFjayBzdGFydHNcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHgucmFuZ2UoKSkgIC8vIHByb2JhYmx5IGNhbiBoYXJkIGNvZGUsIHNpbmNlIG9ubHkgb25lIGJhclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGQgPT4geShkLnkwKSAtIHkoZC55MCArIGQueSkpICAvLyBoZWlnaHQgaXMgc2V0IHRvIHRoZSBzdGFydGluZyBwb2ludCBwbHVzIHRoZSBoZWlnaHQsIGFuZCBhbGwgdGhhdCBzdWJ0cmFjdGVkIGZyb20gdGhlIHN0YXJ0aW5nIHBvaW50IGR1ZSB0byB5IHZhbHVlcyBiZWdpbmluZyBhdCB0b3Agb2Ygc2NyZWVuXG4gICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsICgpID0+IHRvb2x0aXAuc3R5bGUoXCJkaXNwbGF5XCIsIHRydWUpKSAgLy8gd2FudCB0aGUgaW5mbyBib3ggdG8gc3dpdGNoIGJldHdlZW4gdmlzaWJsZSBhbmQgaW5pdmlzIGJhc2VkIG9uIG1vdXNlb3ZlclxuICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsICgpID0+IHRvb2x0aXAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKSlcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlJywgZCA9PiB7ICAvLyB0aGlzIGlzIGdvaW5nIHRvIGJlIGEgc3dlZXQgZWZmZWN0IVxuICAgICAgICAgICAgICAgIGNvbnN0IHhQb3MgPSBkMy5tb3VzZSh0aGlzKVswXSAtICh0b29sdGlwV2lkdGggLyAyKSAvLyB0aGlzWzBdIGNvcnJlc3BvbmRzIHRvIG1vdXNlJ3MgeCBwb3MsIGFuZCBwdXNoaW5nIGl0IGxlZnQgYnkgaGFsZiBvZiB0aGUgdG9vbHRpcCdzIHdpZHRoIGVuc3VyZSBpdCBpcyBjZW50ZXJlZFxuICAgICAgICAgICAgICAgIGNvbnN0IHlQb3MgPSBkMy5tb3VzZSh0aGlzKVsxXSAtIDI1IC8vIHB1dHMgdGhlIHRvb2x0aXAgdXAgYSBiaXQgYWJvdmUgdGhlIGN1cnNvclxuICAgICAgICAgICAgICAgIHRvb2x0aXAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHhQb3MgKyAnLCcgKyB5UG9zICsgJyknKVxuICAgICAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCd0ZXh0JykudGV4dChkLnBlcmNlbnQpIC8vIHNob3dzIHRoZSBwZXJjZW50ICBcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgdG9vbHRpcCA9IHN2Zy5hcHBlbmQoJ2cnKSAvLyBzZXR0aW5nIHVwIHRoaXMgc3dlZXQgdG9vbHRpcC4gRXhjaXRpbmchXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnc3ViLWRhdGEtdG9vbHRpcCB0b29sdGlwJykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpIC8vIHN0YXJ0cyBpbnZpc2libGVcbiAgICAgICAgICAgIC8vIGFkZGluZyB0aGUgZGltZW5zaW9ucyBvZiB0aGUgYm94XG4gICAgICAgICAgICAuYXBwZW5kKCdyZWN0JykuYXR0cignd2lkdGgnLCB0b29sdGlwV2lkdGgpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdG9vbHRpcEhlaWdodCkuYXR0cignZmlsbCcsICd3aGl0ZScpLnN0eWxlKCdvcGFjaXR5JywgMC41KSAvLyBtYWtpbmcgaXQgcGFydGlhbGx5IHNlZS10aHJvdWdoXG4gICAgICAgICAgICAvLyBhZGRpbmcgdGhlIHRleHQgY29udGVudFxuICAgICAgICAgICAgLmFwcGVuZCgndGV4dCcpLmF0dHIoJ3gnLCAxNSlcbiAgICAgICAgICAgIC5hdHRyKCdkeScsICcuOGVtJykuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgfVxuICAgIFxufVxuXG5jb25zdCBzdWJBcnJheUxvY2F0b3IgPSAodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSkgPT4geyAgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBmaW5kaW5nIHRoZSByaWdodCBzdWIgYXJyYXkuIEEgYml0IGhhcmQtY29kZWQuXG4gICAgc3dpdGNoICh0YXhfdHlwZSkge1xuICAgICAgICBjYXNlIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzBdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6IFxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsxXVxuICAgICAgICBjYXNlIFwiSW5jb21lIFRheGVzXCI6IFxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsyXVxuICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjogXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzNdXG4gICAgfVxufSIsIlxuXG5leHBvcnQgY29uc3QgYXNzaWduQm94ID0gKGFycmF5X29mX29ianMsIHBpZV9udW0pID0+IHtcbiAgICBjb25zdCBzaWRlID0gcGllX251bSA9PT0gMSA/ICdsZWZ0LWJveC0nIDogJ3JpZ2h0LWJveC0nXG4gICAgYXJyYXlfb2Zfb2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBpID0gNDtcbiAgICAgICAgc3dpdGNoIChvYmoua2V5KSB7XG4gICAgICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMCBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJJbmNvbWUgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMSBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDIgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiUHJvcGVydHkgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMyBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaWRlICsgaSlcbiAgICAgICAgY29uc3QgZGVjaW1hbHMgPSBTdHJpbmcob2JqLnBlcmNlbnQpLnNwbGl0KCcuJylbMV1cbiAgICAgICAgY29uc3QgaW50ZWdlcnMgPSBTdHJpbmcob2JqLnBlcmNlbnQpLnNwbGl0KCcuJylbMF1cbiAgICAgICAgY29uc3Qgc2xpY2VkID0gb2JqLnBlcmNlbnQgPyBpbnRlZ2VycyArICcuJyArIGRlY2ltYWxzLnNsaWNlKDAsIDIpIDogMFxuICAgICAgICBib3guaW5uZXJIVE1MID0gc2xpY2VkICsgJyUnXG4gICAgfSk7XG59XG5cbi8vIGQuQU1PVU5UID09PSAnWCcgPyAwIDogZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDAsXG5leHBvcnQgY29uc3QgZmluZEFtb3VudCA9IChhbW91bnQpID0+IHtcbiAgICByZXR1cm4gYW1vdW50ID09PSAnWCcgPyAwIDogYW1vdW50LnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwXG59XG5cbi8vIGV4cG9ydCBjb25zdCBzdWJEYXRhUHVzaGVyID0gKGl0ZW0pID0+IHtcbi8vICAgICBpZiAoaXRlbSAhPSBcIlQwMFwiICYmIGl0ZW0gIT0gXCJUMDFcIikge1xuLy8gICAgICAgICBzd2l0Y2ggKGl0ZW0uc2xpY2UoMCwgMikpIHtcbi8vICAgICAgICAgICAgIGNhc2UgKFwiVDBcIiB8fCBcIlQxXCIpOlxuLy8gICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2goe1xuLy8gICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4vLyAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4vLyAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnQ6IChmaW5kQW1vdW50KGQuQU1PVU5UKSAvIFRPVEFMKSAqIDEwMFxuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgXG4vLyAgICAgICAgICAgICBjYXNlIFwiVDJcIjpcbi8vICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2goe1xuICAgIFxuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9IiwiLy8gQSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBiYXNlZCBoZWF2aWx5IG9mZiBvZiBLYXJ0aGlrIFRob3RhJ3MgeW91dHViZSB0dXRvcmlhbCBcIkludHJvZHVjdGlvbiB0byBkMy5qcyA9IFBpZSBDaGFydCBhbmQgRG9udXQgQ2hhcnRcIlxuLy8gVGhlIGxlZ2VuZCBjb2RlIHdhcyBmcm9tIENyeXB0ZXJzIEluZm90ZWNoJ3MgeW91dHViZSB0dXRvcmlhbCBcIlBpZSBDaGFydCB1c2luZyBEMy5qc1wiXG5cbmltcG9ydCB7IGFzc2lnbkJveCwgZmluZEFtb3VudCB9IGZyb20gJy4vaGVscGVyX2Z1bmN0aW9ucydcbmltcG9ydCB7IHN1YkRhdGEgfSBmcm9tICcuL2V2ZW50X2hhbmRsZXJzJ1xuXG5leHBvcnQgY29uc3QgQ09MT1JTID0gW1wiI2E2NzUxZVwiLCBcIiNlN2FiMDRcIiwgXCIjNjZhNTFlXCIsIFwiIzc0NzBiM1wiLCBcIiNlODJiOGFcIl1cbi8vIGV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJPdGhlciBUYXhlc1wiXVxuZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIk90aGVyIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgVGF4ZXNcIl1cbi8vIGV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihjc3ZQYXRoLCBzZWN0b3IsIGFtb3VudCwgc3RhdGUsIG11bHRpcGxpZXIgPSAxLCBza2lwID0gMSkge1xuZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCB0YXhfdHlwZSwgcGllX251bSkge1xuXG4gICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtXCIgKyBwaWVfbnVtKVxuICAgIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG5cbiAgICBjb25zdCByZW1vdmUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtXCIgKyBwaWVfbnVtKVxuICAgIHJlbW92ZTIgPyByZW1vdmUyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlMikgOiBudWxsXG5cblxuICAgIGNvbnN0IGRpdiA9IGQzLnNlbGVjdChcIiN0b3RhbHNcIilcbiAgICAgICAgLmFwcGVuZChcImRpdlwiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwidG90YWxzLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInRvdGFscy1cIiArIHBpZV9udW0pXG5cbiAgICBjb25zdCBoMSA9IGRpdlxuICAgICAgICAuYXBwZW5kKFwiaDFcIilcbiAgICAgICAgLy8gLmF0dHIoJ2lkJywgJ3JldmVudWUtJyArIHBpZV9udW0pXG5cbiAgICBjb25zdCBzcGFuID0gZGl2XG4gICAgICAgIC5hcHBlbmQoXCJzcGFuXCIpXG5cbiAgICBjb25zdCBoMiA9IGQzLnNlbGVjdChcIiNkZXRhaWxzXCIpXG4gICAgICAgIC5hcHBlbmQoXCJoMlwiKVxuICAgICAgICAvLyAuYXR0cignaWQnLCAncGVyY2VudC0nICsgcGllX251bSlcblxuICAgIGxldCBUT1RBTCA9IDA7XG4gICAgbGV0IFRZUEVTID0gW11cbiAgICAvLyBDSVJDTEUgVElNRSBCQUJZXG4gICAgLy8gbWFyZ2luIGFuZCByYWRpdXNcbiAgICBjb25zdCBtYXJnaW4gPSB7IHRvcDogMjAwLCByaWdodDogMjAwLCBib3R0b206IDIwMCwgbGVmdDogMjAwIH0sXG4gICAgICAgIGhlaWdodCA9IDEwMDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSxcbiAgICAgICAgd2lkdGggPSAxMDAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXG4gICAgICAgIHJhZGl1cyA9IHdpZHRoIC8gMjtcblxuXG5cbiAgICBjb25zdCBjb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lRGFyazIpO1xuXG4gICAgLy8gYXJjIGdlbmVyYXRvclxuICAgIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSAxMClcbiAgICAgICAgLy8gLmlubmVyUmFkaXVzKDApOyAvLyBmb3IgY2lyY2xlXG4gICAgICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSAxMDApIC8vIGZvciBkb251dFxuXG4gICAgLy8gY29uc3QgbGFibGVBcmMgPSBkMy5hcmMoKVxuICAgIC8vICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gNTApXG4gICAgLy8gICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSA1MCk7XG5cbiAgICAvLyBwaWUgZ2VuZXJhdG9yXG4gICAgY29uc3QgcGllID0gZDMucGllKClcbiAgICAgICAgLy8gLnNvcnQobnVsbClcbiAgICAgICAgLnZhbHVlKGQgPT4gZC5hbW91bnQpO1xuXG4gICAgLy8gZGVmaW5lIHN2ZyBcbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIucGllLVwiICsgcGllX251bSkuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwiaWRcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB3aWR0aCAvIDIgKyBcIixcIiArIGhlaWdodCAvIDIgKyBcIilcIilcblxuICAgIC8vIGltcG9ydCBkYXRhXG4gICAgZDMuY3N2KFwiLi9zcmMvYXNzZXRzL2RhdGEvRlkyMDE4X3RheF9yZXZlbnVlX2RldGFpbGVkLmNzdlwiKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgYXJyYXlzIHRoYXQgd2lsbCBjb250YWluIHRoZSBzdWIgbGV2ZWwgdGF4IGRhdGFcbiAgICAgICAgbGV0IHNhbGVzX3RheGVzID0gW11cbiAgICAgICAgbGV0IGxpY2Vuc2VfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgaW5jb21lX3RheGVzID0gW11cbiAgICAgICAgbGV0IG90aGVyX3RheGVzID0gW11cbiAgICAgICAgLy8gcGFyc2UgdGhlIGNzdlxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9IFwiVDAwXCIgJiYgZC5pdGVtICE9IFwiVDAxXCIpIHsgIC8vIGRvbid0IHdhbnQgdG8gY2F0Y2ggVG90YWwgb3IgUHJvcGVydHkgVGF4ZXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRheF9vYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkLml0ZW0uc2xpY2UoMCwyKSkgeyAvLyBmaWxsIHVwIHN1YiBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMlwiOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29tZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRheF90eXBlLmluY2x1ZGVzKGQuaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSAhPSAnVDAwJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVFlQRVMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBkLlRheF9UeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKChmaW5kQW1vdW50KGQuQU1PVU5UKSkgLyBUT1RBTCkgKiAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGQua2V5ID0gZC5UYXhfVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgZC5hbW91bnQgPSBmaW5kQW1vdW50KGQuQU1PVU5UKTtcbiAgICAgICAgICAgICAgICAgICAgZC5wZXJjZW50ID0gKChmaW5kQW1vdW50KGQuQU1PVU5UKSkgLyBUT1RBTCkgKiAxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgY29uc3QgY29udGFpbmVyX2FycmF5ID0gW10gIC8vIHNldHRpbmcgdXAgY29udGFpbmVyIGFycmF5IGZvciBwYXNzaW5nIGludG8gY2xpY2sgaGFuZGxlclxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChzYWxlc190YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2gobGljZW5zZV90YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2goaW5jb21lX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChvdGhlcl90YXhlcylcbiAgICAgICAgLy8gc2V0IGgxIGFmdGVyIHRvdGFsIGhhcyBiZWVuIGRlZmluZWRcbiAgICAgICAgaDEudGV4dChzdGF0ZSArIFwiJ3MgdGF4IHJldmVudWUgZm9yIDIwMTggd2FzIFwiKVxuICAgICAgICBzcGFuLnRleHQoXCIkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgIGgyLnRleHQoXCJcIilcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwZXJjZW50YWdlcyBpbiB0aGUgY2VudGVyIGJveFxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBnLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBhcmMpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGQgPT4gY29sb3JzKGQuZGF0YS5rZXkpKVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmVhc2UoZDMuZWFzZUxpbmVhcilcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAuYXR0clR3ZWVuKCdkJywgcGllVHdlZW4pO1xuXG4gICAgICAgIGlmIChwaWVfbnVtID09PSAyKSB7Ly8gZmxpcCB0aGUgc2Vjb25kIHBpZVxuICAgICAgICAgICAgZy5hdHRyKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWCgtMSkgdHJhbnNsYXRlKDMwMHB4LCAwcHgpXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgIGcub24oXCJtb3VzZW92ZXJcIiwgZWxlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZSlcbiAgICAgICAgICAgIC8vIGgxLnRleHQoZWxlLmRhdGEua2V5ICsgXCIgYWNjb3VudHMgZm9yICRcIiArIGQzLmZvcm1hdCgnLCcpKGVsZS5kYXRhLmFtb3VudCkgKyBcIiBvdXQgb2YgJFwiICsgZDMuZm9ybWF0KCcsJykoVE9UQUwpKVxuICAgICAgICAgICAgLy8gaDIudGV4dChcIlRoaXMgaXMgXCIgKyBTdHJpbmcoKGVsZS5kYXRhLmFtb3VudCAvIFRPVEFMKSAqIDEwMCkuc2xpY2UoMCwgNSkgKyBcIiUgb2YgdGhlIHRvdGFsXCIpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGVsZSA9PiB7XG4gICAgICAgICAgICAvLyBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgJFwiICsgZDMuZm9ybWF0KCcsJykoVE9UQUwpKVxuICAgICAgICAgICAgLy8gaDIudGV4dChcIlwiKVxuICAgICAgICB9KVxuICAgICAgICAub24oXCJjbGlja1wiLCBzdWJEYXRhKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkpO1xuXG4gICAgICAgIC8vIGlmIChwaWVfbnVtID09PSAyKSB7XG4gICAgICAgIC8vICAgICBjb25zdCBsZWdlbmRzID0gc3ZnLmFwcGVuZChcImdcIikuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNjMsIC0xMjgpXCIpXG4gICAgICAgIC8vICAgICAgICAgLnNlbGVjdEFsbChcIi5sZWdlbmRzXCIpLmRhdGEoVFlQRVMpO1xuICAgIFxuICAgICAgICAvLyAgICAgY29uc3QgbGVnZW5kID0gbGVnZW5kcy5lbnRlcigpLmFwcGVuZChcImdcIikuY2xhc3NlZChcImxlZ2VuZHNcIiwgdHJ1ZSkuYXR0cihcInRyYW5zZm9ybVwiLCAoZCAsIGkpID0+IFwidHJhbnNsYXRlKDAsXCIgKyAoaSsxKSAqIDMwICsgIFwiKVwiKTtcbiAgICAgICAgLy8gICAgIGxlZ2VuZC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgIC8vICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCAyMClcbiAgICAgICAgLy8gICAgICAgICAuYXR0cihcImhlaWdodFwiLCAyMCk7XG4gICAgXG4gICAgICAgIC8vICAgICBkZWJ1Z2dlclxuICAgICAgICAvLyAgICAgbGVnZW5kLnN0eWxlKFwic3Ryb2tlXCIsIChkLCBpKSA9PiBpID8gQ09MT1JTW2kgLSAxXSA6IG51bGwpXG4gICAgICAgIC8vICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgIC8vICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCAoZCwgaSkgPT4gaSA/IFwibnVsbFwiIDogXCJub25lXCIpXG4gICAgXG4gICAgICAgIC8vICAgICAvLyBsZWdlbmQuYXBwZW5kKFwidGV4dFwiKS5jbGFzc2VkKFwibGFiZWxcIiwgdHJ1ZSkudGV4dCgoZCwgaSkgPT4gTEFCRUxTW2ktMV0pXG4gICAgICAgIC8vICAgICAvLyAgICAgLmF0dHIoXCJmaWxsXCIsIChkLCBpKSA9PiBpID8gQ09MT1JTW2kgLSAxXSA6IG51bGwpXG4gICAgICAgIC8vICAgICAvLyAgICAgLmF0dHIoXCJ4XCIsIDMwKVxuICAgICAgICAvLyAgICAgLy8gICAgIC5hdHRyKFwieVwiLCAyMClcbiAgICAgICAgLy8gICAgIC8vICAgICAuYXR0cihcImJvcmRlclwiLCAoZCwgaSkgPT4gXCIzcHggc29saWQgXCIgKyBDT0xPUlNbaSAtIDFdKVxuICAgICAgICAvLyAgICAgbGVnZW5kLmFwcGVuZChcInRleHRcIikuY2xhc3NlZChcImxhYmVsXCIsIHRydWUpLnRleHQoKGQsIGkpID0+IExBQkVMU1tpLTFdKVxuICAgICAgICAvLyAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIm5vbmVcIilcbiAgICAgICAgLy8gICAgICAgICAuYXR0cihcImZpbGxcIiwgKGQsIGkpID0+IGkgPyBDT0xPUlNbaSAtIDFdIDogbnVsbClcbiAgICAgICAgLy8gICAgICAgICAuYXR0cihcInhcIiwgMzApXG4gICAgICAgIC8vICAgICAgICAgLmF0dHIoXCJ5XCIsIDIwKVxuICAgICAgICAvLyAgICAgICAgIC5hdHRyKFwiYm9yZGVyXCIsIChkLCBpKSA9PiBcIjNweCBzb2xpZCBcIiArIENPTE9SU1tpIC0gMV0pXG4gICAgICAgIC8vIH1cbiAgICAgICAgICAgIFxuICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7IGlmIChlcnJvcikgdGhyb3cgZXJyb3IgfSlcblxuICAgIGNvbnN0IHBpZVR3ZWVuID0gYiA9PiB7XG4gICAgICAgIGIuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZTogMCB9LCBiKVxuICAgICAgICByZXR1cm4gKHQpID0+IHsgcmV0dXJuIGFyYyhpKHQpKSB9XG4gICAgfSAgICBcblxuXG59XG4iLCJpbXBvcnQgeyBDT0xPUlMsIExBQkVMU30gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgcGllTGVnZW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IG1hc3Rlcl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgbWFzdGVyX2xpc3QuY2xhc3NMaXN0LmFkZCgnbWFzdGVyLWxpc3QnKVxuXG4gICAgY29uc3QgbGVmdF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHRleHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCByaWdodF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgbGVmdF9saXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnQtbGlzdCcpICBcbiAgICB0ZXh0X2xpc3QuY2xhc3NMaXN0LmFkZCgndGV4dC1saXN0JykgIFxuICAgIHJpZ2h0X2xpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHQtbGlzdCcpIFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBMQUJFTFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbGVmdF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IHRleHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCByaWdodF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgbGVmdF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ2xlZnQtYm94JylcbiAgICAgICAgbGVmdF9ib3guaWQgPSAoJ2xlZnQtYm94LScgKyBpKVxuICAgICAgICBsZWZ0X2JveC5zdHlsZS5jb2xvciA9IENPTE9SU1tpXVxuXG4gICAgICAgIHJpZ2h0X2JveC5jbGFzc0xpc3QuYWRkKCdib3gnLCAncmlnaHQtYm94JylcbiAgICAgICAgcmlnaHRfYm94LmlkID0gKCdyaWdodC1ib3gtJyArIGkpXG4gICAgICAgIHJpZ2h0X2JveC5zdHlsZS5jb2xvciA9IENPTE9SU1tpXVxuXG4gICAgICAgIHRleHRfYm94LmNsYXNzTGlzdC5hZGQoJ3RleHQtYm94JylcbiAgICAgICAgdGV4dF9ib3guaW5uZXJIVE1MID0gTEFCRUxTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBDT0xPUlNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCBcIiArIENPTE9SU1tpXVxuXG4gICAgICAgIGxlZnRfbGlzdC5hcHBlbmRDaGlsZChsZWZ0X2JveClcbiAgICAgICAgdGV4dF9saXN0LmFwcGVuZENoaWxkKHRleHRfYm94KVxuICAgICAgICByaWdodF9saXN0LmFwcGVuZENoaWxkKHJpZ2h0X2JveClcbiAgICB9XG5cbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZChsZWZ0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9saXN0KVxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKHJpZ2h0X2xpc3QpXG4gICAgcmV0dXJuIG1hc3Rlcl9saXN0XG59XG5cbmNvbnN0IHN1Ymxpc3RzID0gKGxhYmVsLCBjb2xvcikgPT4ge1xuICAgIGNvbnN0IGxpc3RzID0gW11cblxuXG4gICAgbGVzdGxpc3QuY2xhc3NMaXN0LmFkZCgnbGVmdGxpc3QnKVxuICAgIHRleHRsaXN0LmNsYXNzTGlzdC5hZGQoJ3RleHRsaXN0JylcbiAgICByaWdodGxpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHRsaXN0JylcblxuICAgIGNvbnN0IGxlZnRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgY29uc3QgcmlnaHRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cblxuXG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cblxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGVmdEJveClcbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKGxpKVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQocmlnaHRCb3gpXG4gICAgcmV0dXJuIHN1Ymxpc3Rcbn0iLCJpbXBvcnQgeyBQaWVDaGFydEdlbmVyYXRvciB9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IFRPUF9MRVZFTCA9IFsnVDAwJywgJ1QwMScsICdUQTEnLCAnVEEzJywgJ1RBNCcsICdUQTUnXVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuICAgIGNvbnN0IFNUQVRFX05BTUVTID0gWydBbGFiYW1hJywgJ0FsYXNrYScsICdBcml6b25hJywgJ0Fya2Fuc2FzJywgJ0NhbGlmb3JuaWEnLCAnQ29sb3JhZG8nLCAnQ29ubmVjdGljdXQnLCAnRGVsYXdhcmUnLCAnRmxvcmlkYScsICdHZW9yZ2lhJywgJ0hhd2FpaScsICdJZGFobycsICdJbGxpbm9pcycsICdJbmRpYW5hJywgJ0lvd2EnLCAnS2Fuc2FzJywgJ0tlbnR1Y2t5JywgJ0xvdWlzaWFuYScsICdNYWluZScsICdNYXJ5bGFuZCcsICdNYXNzYWNodXNldHRzJywgJ01pY2hpZ2FuJywgJ01pbm5lc290YScsICdNaXNzaXNzaXBwaScsICdNaXNzb3VyaScsICdNb250YW5hJywgJ05lYnJhc2thJywgJ05ldmFkYScsICdOZXcgSGFtcHNoaXJlJywgJ05ldyBKZXJzZXknLCAnTmV3IE1leGljbycsICdOZXcgWW9yaycsICdOb3J0aCBDYXJvbGluYScsICdOb3J0aCBEYWtvdGEnLCAnT2hpbycsICdPa2xhaG9tYScsICdPcmVnb24nLCAnUGVubnN5bHZhbmlhJywgJ1Job2RlIElzbGFuZCcsICdTb3V0aCBDYXJvbGluYScsICdTb3V0aCBEYWtvdGEnLCAnVGVubmVzc2VlJywgJ1RleGFzJywgJ1V0YWgnLCAnVmVybW9udCcsICdWaXJnaW5pYScsICdXYXNoaW5ndG9uJywgJ1dlc3QgVmlyZ2luaWEnLCAnV2lzY29uc2luJywgJ1d5b21pbmcnXVxuXG4gICAgLy8gY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgIC8vIHJldmlzaXQgaWYgdGltZSB0byBtYWtlIGN1c3RvbSBzZWxlY3RcbiAgICAvLyBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5pdGlhbC1jb250YWluZXInKVxuXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKVxuICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNlbGVjdC1cIiArIHBpZV9udW0pXG5cbiAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gZSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4gICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3Qgc2lkZSA9IHBpZV9udW0gPT09IDEgPyBcIi1sZWZ0XCIgOiBcIi1yaWdodFwiXG4gICAgICAgIC8vIGNvbnN0IGgyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN0YXRlXCIgKyBzaWRlKVswXVxuICAgICAgICAvLyBoMi5pbm5lckhUTUwgPSBzdGF0ZVxuICAgIH1cblxuICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBkZWZhdWx0X3N0YXRlID0gcGllX251bSA9PT0gMSA/IFNUQVRFX05BTUVTWzBdIDogU1RBVEVfTkFNRVNbU1RBVEVfTkFNRVMubGVuZ3RoIC0gMV1cbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuICAgICAgICBpZiAoc3RhdGUgPT09IGRlZmF1bHRfc3RhdGUpIHtcbiAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCB0cnVlKVxuICAgICAgICB9XG4gICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBzdGF0ZVxuICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4gICAgICAgIC8vIG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4gICAgICAgIC8vIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKVxuICAgIH0pXG4gICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc3RhdGVTZWxlY3RvcilcbiAgICAvLyBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KVxuICAgIC8vIHJldHVybiBjb250YWluZXJcbiAgICByZXR1cm4gc2VsZWN0XG59XG5cbmNvbnN0IHBoYXNlT3V0ID0gKG5vZGUpID0+IHtcblxuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxufSIsIlxuaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHBpZUxlZ2VuZCB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfbGVnZW5kJ1xuaW1wb3J0IHsgc2VsZWN0b3IsIFRPUF9MRVZFTCB9IGZyb20gJy4vY29tcG9uZW50cy9zZWxlY3RvcidcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIFxuICAgIC8vIFBDRyAtPiBjc3ZQYXRoLCBzZWN0b3IsIGFtb3V0LCBsb2NhdGlvbiwgbXVsdGlwbGllciwgc2tpcFxuICAgIFxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgICAvLyBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHNlbGVjdF8xID0gc2VsZWN0b3IoMSlcbiAgICBjb25zdCBzZWxlY3RfMiA9IHNlbGVjdG9yKDIpXG4gICAgY29uc3Qgc2VsZWN0b3JfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdG9yLWNvbnRhaW5lclwiKVswXVxuICAgIFxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMSlcbiAgICBzZWxlY3Rvcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0XzIpXG4gICAgcm9vdC5hcHBlbmRDaGlsZCh1bClcblxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKFwiQWxhYmFtYVwiLCBUT1BfTEVWRUwsIDEpXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJXeW9taW5nXCIsIFRPUF9MRVZFTCwgMilcbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9