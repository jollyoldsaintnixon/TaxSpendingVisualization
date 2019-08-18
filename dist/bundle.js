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

        var x = d3.scaleOrdinal().domain(layers[0].map(function (d) {
            return d.x;
        }))
        // .range([10, width], 0)  // may be a quicker way to do this as there is only one bar
        .range([width]);

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
        // determine how to flip the pies
        if (pie_num === 2) {
            // flip the second pie
            g.attr("position", "absolute");
            g.style("transform", "scaleX(-1) translate(300px, 0px) scaleY(-1)");
        } else {
            g.style("transform", "scaleY(-1)");
        }
        // event handlers
        g.on("mouseover", function (ele) {
            console.log(ele);
            // h1.text(ele.data.key + " accounts for $" + d3.format(',')(ele.data.amount) + " out of $" + d3.format(',')(TOTAL))
            // h2.text("This is " + String((ele.data.amount / TOTAL) * 100).slice(0, 5) + "% of the total")
        }).on("mouseout", function (ele) {
            // h1.text(state + "'s tax revenue for 2018 was $" + d3.format(',')(TOTAL))
            // h2.text("")
        }).on("click", (0, _event_handlers.cssSubDataDisplay)(container_array, pie_num));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZXZlbnRfaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbInN1YkRhdGEiLCJjb250YWluZXJfYXJyYXkiLCJwaWVfbnVtIiwiZWxlIiwidGF4X3R5cGUiLCJkYXRhIiwia2V5Iiwic3ViX2FycmF5Iiwic3ViQXJyYXlMb2NhdG9yIiwidGF4X3N0YWNrIiwia2V5cyIsImZvckVhY2giLCJzdWJfdGF4IiwiaSIsInB1c2giLCJhbW91bnQiLCJ3aWR0aCIsImhlaWdodCIsInRvb2x0aXBXaWR0aCIsInRvb2x0aXBIZWlnaHQiLCJzdmciLCJkMyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJzdGFjayIsIm9yZGVyIiwic3RhY2tPcmRlck5vbmUiLCJvZmZzZXQiLCJzdGFja09mZnNldE5vbmUiLCJsYXllcnMiLCJ4Iiwic2NhbGVPcmRpbmFsIiwiZG9tYWluIiwibWFwIiwiZCIsInJhbmdlIiwieSIsInNjYWxlTGluZWFyIiwibWF4IiwieTAiLCJnIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJyZWN0Iiwib24iLCJ0b29sdGlwIiwic3R5bGUiLCJ4UG9zIiwibW91c2UiLCJ5UG9zIiwidGV4dCIsInBlcmNlbnQiLCJjc3NTdWJEYXRhRGlzcGxheSIsInRvdGFsIiwib2JqIiwicm9vdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ1bCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJpZCIsImxpIiwicGVyY2VudF9vZl90b3RhbCIsImFwcGVuZENoaWxkIiwiZ3JvdXBUb3RhbCIsImFycmF5IiwiYXNzaWduQm94IiwiYXJyYXlfb2Zfb2JqcyIsInNpZGUiLCJib3giLCJkZWNpbWFscyIsIlN0cmluZyIsInNwbGl0IiwiaW50ZWdlcnMiLCJzbGljZWQiLCJzbGljZSIsImlubmVySFRNTCIsImZpbmRBbW91bnQiLCJqb2luIiwiUGllQ2hhcnRHZW5lcmF0b3IiLCJDT0xPUlMiLCJMQUJFTFMiLCJzdGF0ZSIsInJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInJlbW92ZTIiLCJkaXYiLCJoMSIsInNwYW4iLCJoMiIsIlRPVEFMIiwiVFlQRVMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJyYWRpdXMiLCJjb2xvcnMiLCJzY2hlbWVEYXJrMiIsImFyYyIsIm91dGVyUmFkaXVzIiwiaW5uZXJSYWRpdXMiLCJwaWUiLCJ2YWx1ZSIsImNzdiIsInRoZW4iLCJzYWxlc190YXhlcyIsImxpY2Vuc2VfdGF4ZXMiLCJpbmNvbWVfdGF4ZXMiLCJvdGhlcl90YXhlcyIsIkdlb19OYW1lIiwiaXRlbSIsIkFNT1VOVCIsInRheF9vYmoiLCJUYXhfVHlwZSIsImluY2x1ZGVzIiwiZm9ybWF0IiwidHJhbnNpdGlvbiIsImVhc2UiLCJlYXNlTGluZWFyIiwiZHVyYXRpb24iLCJhdHRyVHdlZW4iLCJwaWVUd2VlbiIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaCIsImVycm9yIiwiYiIsImludGVycG9sYXRlIiwic3RhcnRBbmdsZSIsImVuZEFuZ2xlIiwidCIsInBpZUxlZ2VuZCIsIm1hc3Rlcl9saXN0IiwibGVmdF9saXN0IiwidGV4dF9saXN0IiwicmlnaHRfbGlzdCIsImxlbmd0aCIsImxlZnRfYm94IiwidGV4dF9ib3giLCJyaWdodF9ib3giLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlciIsInN1Ymxpc3RzIiwibGFiZWwiLCJsaXN0cyIsImxlc3RsaXN0IiwidGV4dGxpc3QiLCJyaWdodGxpc3QiLCJsZWZ0Qm94IiwicmlnaHRCb3giLCJzdWJsaXN0IiwiVE9QX0xFVkVMIiwic2VsZWN0b3IiLCJTVEFURV9OQU1FUyIsInNldEF0dHJpYnV0ZSIsInN0YXRlU2VsZWN0b3IiLCJlIiwidGFyZ2V0IiwiZGVmYXVsdF9zdGF0ZSIsIm9wdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJwaGFzZU91dCIsIm5vZGUiLCJzZWxlY3RfMSIsInNlbGVjdF8yIiwic2VsZWN0b3JfY29udGFpbmVyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBOztBQUVPLElBQU1BLDRCQUFVLFNBQVZBLE9BQVUsQ0FBQ0MsZUFBRCxFQUFrQkMsT0FBbEIsRUFBOEI7QUFDakQ7QUFDQSxXQUFPLFVBQUNDLEdB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QWdDLElBQWhDO0FBQ0g7QUFDREssZUFBT3ZGLFNBQVAsR0FBbUJNLEtBQW5CO0FBQ0FpRixlQUFPTCxZQUFQLENBQW9CLE9BQXBCLEVBQTZCNUUsS0FBN0I7QUFDQTtBQUNBO0FBQ0EvRCxlQUFPNEMsV0FBUCxDQUFtQm9HLE1BQW5CO0FBQ0gsS0FYRDtBQVlBaEosV0FBT2lKLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDTCxhQUFsQztBQUNBO0FBQ0E7QUFDQSxXQUFPNUksTUFBUDtBQUNILENBcENNOztBQXNDUCxJQUFNa0osV0FBVyxTQUFYQSxRQUFXLENBQUNDLElBQUQsRUFBVTs7QUFFdkJBLFNBQUtsRixVQUFMLENBQWdCQyxXQUFoQixDQUE0QmlGLElBQTVCO0FBQ0gsQ0FIRCxDOzs7Ozs7Ozs7Ozs7OztBQ3pDQTs7QUFDQTs7QUFDQTs7QUFFQWhILFNBQVM4RyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTs7QUFFaEQ7O0FBRUEsUUFBTS9HLE9BQU9DLFNBQVNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYjtBQUNBO0FBQ0EsUUFBTUMsS0FBSyw0QkFBWDtBQUNBLFFBQU0rRyxXQUFXLHdCQUFTLENBQVQsQ0FBakI7QUFDQSxRQUFNQyxXQUFXLHdCQUFTLENBQVQsQ0FBakI7QUFDQSxRQUFNQyxxQkFBcUJuSCxTQUFTb0gsc0JBQVQsQ0FBZ0Msb0JBQWhDLEVBQXNELENBQXRELENBQTNCOztBQUVBRCx1QkFBbUIxRyxXQUFuQixDQUErQndHLFFBQS9CO0FBQ0FFLHVCQUFtQjFHLFdBQW5CLENBQStCeUcsUUFBL0I7QUFDQW5ILFNBQUtVLFdBQUwsQ0FBaUJQLEVBQWpCOztBQUVBLGdEQUFrQixTQUFsQixFQUE2Qm1HLG1CQUE3QixFQUF3QyxDQUF4QztBQUNBLGdEQUFrQixTQUFsQixFQUE2QkEsbUJBQTdCLEVBQXdDLENBQXhDO0FBQ0gsQ0FqQkQsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuLy8gY29udGFpbmVyX2FycmF5LnB1c2gobGljZW5zZV90YXhlcylcbi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKGluY29tZV90YXhlcylcbi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuXG5leHBvcnQgY29uc3Qgc3ViRGF0YSA9IChjb250YWluZXJfYXJyYXksIHBpZV9udW0pID0+IHtcbiAgICAvLyBhIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGxlYXJuZWQgZnJvbSBNaWNoYWVsIFN0YW5hbGFuZCdzIFwiU3RhY2tlZCBiYXIgY2hhcnQgd2l0aCB0b29sdGlwc1wiIHR1dG9yaWFsIGF0IGh0dHA6Ly9ibC5vY2tzLm9yZy9tc3RhbmFsYW5kLzYxMDA3MTNcbiAgICByZXR1cm4gKGVsZSkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGF4X3R5cGUgPSBlbGUuZGF0YS5rZXlcblxuICAgICAgICBjb25zdCBzdWJfYXJyYXkgPSBzdWJBcnJheUxvY2F0b3IodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSlcblxuICAgICAgICAvLyBzZXR0aW5nIHVwIHRoZSB0YXggc3RhY2sgdG8gY29tcGx5IHdpdGggZDMgdjVcbiAgICAgICAgbGV0IHRheF9zdGFjayA9IHsgXG4gICAgICAgICAgICB0YXhfdHlwZTogdGF4X3R5cGUsXG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0dGluZyB1cCBrZXlzXG4gICAgICAgIGxldCBrZXlzID0gW11cbiAgICAgICAgc3ViX2FycmF5LmZvckVhY2goKHN1Yl90YXgsIGkpID0+IHtcbiAgICAgICAgICAgIGtleXMucHVzaChzdWJfdGF4LmtleSlcbiAgICAgICAgICAgIHRheF9zdGFja1tzdWJfdGF4LmtleV0gPSBzdWJfdGF4LmFtb3VudFxuICAgICAgICB9KTtcblxuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gOTAgIC8vIHNldHRpbmcgdGhlIGRpbWVuc2lvbnMgdG8gY29ycmVzcG9uZCB0byB0aGUgcGllIGNoYXJ0cydcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gNjAwXG5cbiAgICAgICAgY29uc3QgdG9vbHRpcFdpZHRoID0gMTIwIC8vIHdpbGwgYWx0ZXIgdGhlc2UgYXMgbmVlZGVkXG4gICAgICAgIGNvbnN0IHRvb2x0aXBIZWlnaHQgPSA0MCBcblxuICAgICAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCJtYWluXCIpLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCkuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuXG4gICAgICAgIC8vIHNldCB0aGUgbGF5ZXJzIG9mIHRoZSBzdGFja2VkIGJhclxuICAgICAgICAvLyBjb25zdCBsYXllcnMgPSBkMy5zdGFjaygpKFt0YXhfdHlwZV0ubWFwKHRheCA9PiB7ICAvLyBzaG91bGQgdWx0aW1hdGVseSBqdXN0IGJlIHRoZSBvbmUgbGF5ZXJcbiAgICAgICAgLy8gICAgIHJldHVybiBzdWJfYXJyYXkubWFwKGQgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB7IHg6IGQua2V5LCB5OiBkLmFtb3VudCwgcGVyY2VudDogZC5wZXJjZW50IH1cbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIH0pKVxuICAgICAgICBjb25zdCBzdGFjayA9IGQzLnN0YWNrKClcbiAgICAgICAgICAgIC5rZXlzKGtleXMpXG4gICAgICAgICAgICAub3JkZXIoZDMuc3RhY2tPcmRlck5vbmUpXG4gICAgICAgICAgICAub2Zmc2V0KGQzLnN0YWNrT2Zmc2V0Tm9uZSlcblxuICAgICAgICBjb25zdCBsYXllcnMgPSBzdGFjayhzdWJfYXJyYXkpXG5cbiAgICAgICAgY29uc3QgeCA9IGQzLnNjYWxlT3JkaW5hbCgpXG4gICAgICAgICAgICAuZG9tYWluKGxheWVyc1swXS5tYXAoZCA9PiBkLngpKVxuICAgICAgICAgICAgLy8gLnJhbmdlKFsxMCwgd2lkdGhdLCAwKSAgLy8gbWF5IGJlIGEgcXVpY2tlciB3YXkgdG8gZG8gdGhpcyBhcyB0aGVyZSBpcyBvbmx5IG9uZSBiYXJcbiAgICAgICAgICAgIC5yYW5nZShbd2lkdGhdKVxuXG4gICAgICAgIGNvbnN0IHkgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKGxheWVyc1swXS5tYXAoZCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQzLm1heChkLCBkID0+IGQueTAgKyBkLnkpICAvLyB0aGUgaW5jcmVtZW50IHVwIHRvIHRoZSB0b3RhbFxuICAgICAgICAgICAgfSkpLnJhbmdlKFtoZWlnaHQsIDBdKVxuXG4gICAgICAgIGNvbnN0IGcgPSBzdmcuc2VsZWN0QWxsKFwiLnN1Yi10YXhlc1wiKSAgLy8gbm8gZyBhdCB0aGlzIHBvaW50LCBidXQgdGhleSB3aWxsIGhhdmUgdGhpcyBjbGFzc1xuICAgICAgICAgICAgLmRhdGEobGF5ZXJzKS5lbnRlcigpICAvLyBub3cgdGhlcmUgd2lsbCBiZSBhIGcgZm9yIGV2ZXJ5IG9iaiBpbiBzdWJfYXJyYXkuICBzaG91bGQgYmUganVzdCBvbmUgZ1xuICAgICAgICAgICAgLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIFwic3ViLXRheGVzXCIpICBcbiAgICAgICAgICAgIFxuICAgICAgICBjb25zdCByZWN0ID0gZy5zZWxlY3RBbGwoXCJyZWN0XCIpICAvLyBtYWtpbmcgZWFjaCBvYmogb2YgdGhlIGNvcnJlc3BvbmQgdG8gYSByZWN0IHdpdGhpbiB0aGUgZ1xuICAgICAgICAgICAgLmRhdGEoZCA9PiBkKSAvLyBwdWxsaW5nIG91dCBlYWNoIGluZGl2aWR1YWwgb2JqXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgICAgICAuYXR0cigneCcsIGQgPT4geChkLngpKSAgLy8gcGFzc2luZyBlYWNoIG9iaidzIHggdmFsdWUgdG8gdGhlIGQzIHggZnVuY3Rpb24gZGVmaW5lZCBhYm92ZVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkID0+IHkoZC55ICsgZC55MCkpICAvLyB5MCBpcyB0aGUgaGVpZ2h0IHdoZXJlIGVhY2ggc2VnbWVudCBpbiB0aGUgc3RhY2sgc3RhcnRzXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4LnJhbmdlKCkpICAvLyBwcm9iYWJseSBjYW4gaGFyZCBjb2RlLCBzaW5jZSBvbmx5IG9uZSBiYXJcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBkID0+IHkoZC55MCkgLSB5KGQueTAgKyBkLnkpKSAgLy8gaGVpZ2h0IGlzIHNldCB0byB0aGUgc3RhcnRpbmcgcG9pbnQgcGx1cyB0aGUgaGVpZ2h0LCBhbmQgYWxsIHRoYXQgc3VidHJhY3RlZCBmcm9tIHRoZSBzdGFydGluZyBwb2ludCBkdWUgdG8geSB2YWx1ZXMgYmVnaW5pbmcgYXQgdG9wIG9mIHNjcmVlblxuICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB0b29sdGlwLnN0eWxlKFwiZGlzcGxheVwiLCB0cnVlKSkgIC8vIHdhbnQgdGhlIGluZm8gYm94IHRvIHN3aXRjaCBiZXR3ZWVuIHZpc2libGUgYW5kIGluaXZpcyBiYXNlZCBvbiBtb3VzZW92ZXJcbiAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCAoKSA9PiB0b29sdGlwLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIikpXG4gICAgICAgICAgICAub24oJ21vdXNlbW92ZScsIGQgPT4geyAgLy8gdGhpcyBpcyBnb2luZyB0byBiZSBhIHN3ZWV0IGVmZmVjdCFcbiAgICAgICAgICAgICAgICBjb25zdCB4UG9zID0gZDMubW91c2UodGhpcylbMF0gLSAodG9vbHRpcFdpZHRoIC8gMikgLy8gdGhpc1swXSBjb3JyZXNwb25kcyB0byBtb3VzZSdzIHggcG9zLCBhbmQgcHVzaGluZyBpdCBsZWZ0IGJ5IGhhbGYgb2YgdGhlIHRvb2x0aXAncyB3aWR0aCBlbnN1cmUgaXQgaXMgY2VudGVyZWRcbiAgICAgICAgICAgICAgICBjb25zdCB5UG9zID0gZDMubW91c2UodGhpcylbMV0gLSAyNSAvLyBwdXRzIHRoZSB0b29sdGlwIHVwIGEgYml0IGFib3ZlIHRoZSBjdXJzb3JcbiAgICAgICAgICAgICAgICB0b29sdGlwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB4UG9zICsgJywnICsgeVBvcyArICcpJylcbiAgICAgICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgndGV4dCcpLnRleHQoZC5wZXJjZW50KSAvLyBzaG93cyB0aGUgcGVyY2VudCAgXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHRvb2x0aXAgPSBzdmcuYXBwZW5kKCdnJykgLy8gc2V0dGluZyB1cCB0aGlzIHN3ZWV0IHRvb2x0aXAuIEV4Y2l0aW5nIVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLXRvb2x0aXAgdG9vbHRpcCcpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKSAvLyBzdGFydHMgaW52aXNpYmxlXG4gICAgICAgICAgICAvLyBhZGRpbmcgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIGJveFxuICAgICAgICAgICAgLmFwcGVuZCgncmVjdCcpLmF0dHIoJ3dpZHRoJywgdG9vbHRpcFdpZHRoKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRvb2x0aXBIZWlnaHQpLmF0dHIoJ2ZpbGwnLCAnd2hpdGUnKS5zdHlsZSgnb3BhY2l0eScsIDAuNSkgLy8gbWFraW5nIGl0IHBhcnRpYWxseSBzZWUtdGhyb3VnaFxuICAgICAgICAgICAgLy8gYWRkaW5nIHRoZSB0ZXh0IGNvbnRlbnRcbiAgICAgICAgICAgIC5hcHBlbmQoJ3RleHQnKS5hdHRyKCd4JywgMTUpXG4gICAgICAgICAgICAuYXR0cignZHknLCAnLjhlbScpLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgIH1cbiAgICBcbn1cblxuY29uc3Qgc3ViQXJyYXlMb2NhdG9yID0gKHRheF90eXBlLCBjb250YWluZXJfYXJyYXkpID0+IHsgIC8vIGhlbHBlciBmdW5jdGlvbiBmb3IgZmluZGluZyB0aGUgcmlnaHQgc3ViIGFycmF5LiBBIGJpdCBoYXJkLWNvZGVkLlxuICAgIHN3aXRjaCAodGF4X3R5cGUpIHtcbiAgICAgICAgY2FzZSBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVswXVxuICAgICAgICBjYXNlIFwiTGljZW5zZSBUYXhlc1wiOiBcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMV1cbiAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOiBcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMl1cbiAgICAgICAgY2FzZSBcIk90aGVyIFRheGVzXCI6IFxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVszXVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNzc1N1YkRhdGFEaXNwbGF5ID0gKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkgPT4ge1xuXG4gICAgY29uc3Qgd2lkdGggPSA5MCAgLy8gc2V0dGluZyB0aGUgZGltZW5zaW9ucyB0byBjb3JyZXNwb25kIHRvIHRoZSBwaWUgY2hhcnRzJ1xuICAgIGNvbnN0IGhlaWdodCA9IDYwMFxuXG4gICAgcmV0dXJuIChlbGUpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRheF90eXBlID0gZWxlLmRhdGEua2V5XG4gICAgICAgIGNvbnN0IHN1Yl9hcnJheSA9IHN1YkFycmF5TG9jYXRvcih0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KSAvLyBnZXQgcmlnaHQgc3ViX2FycmF5XG4gICAgICAgIC8vIGNvbnN0IGdyb3VwVG90YWwgPSBncm91cFRvdGFsKHN1Yl9hcnJheSkgLy8gbm90IHN1cmUgd2h5IHRoaXMgaXMgbm90IGludm9raW5nIHRoZSBmdW5jaXRvbiBiZWxvd1xuICAgICAgICBsZXQgdG90YWwgPSAwXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICB0b3RhbCArPSBvYmouYW1vdW50XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpIC8vIGdyYWIgdGhlIHJvb3QgdG8gYXR0YWNoIGxhdGVyXG5cbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIikgLy8gc2V0IHVwIHVsIGNvbnRhaW5lclxuICAgICAgICB1bC5jbGFzc0xpc3QuYWRkKFwic3ViLWRhdGEtbGlzdC1cIiArIHBpZV9udW0pXG4gICAgICAgIHVsLmlkID0gKFwic3ViLWRhdGEtbGlzdC1cIiArIHBpZV9udW0pXG5cbiAgICAgICAgc3ViX2FycmF5LmZvckVhY2goc3ViX3RheCA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgIGxpLnN0eWxlLmhlaWdodCA9IChzdWJfdGF4LnBlcmNlbnRfb2ZfdG90YWwgKiA2KSArICdweCdcbiAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKVxuICAgICAgICB9KTtcblxuICAgICAgICByb290LmFwcGVuZENoaWxkKHVsKVxuICAgIH1cbn1cblxuY29uc3QgZ3JvdXBUb3RhbCA9IGFycmF5ID0+IHtcbiAgICBsZXQgdG90YWwgPSAwXG4gICAgYXJyYXkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICB0b3RhbCArPSBvYmouYW1vdW50XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvdGFsXG59IiwiXG5cbmV4cG9ydCBjb25zdCBhc3NpZ25Cb3ggPSAoYXJyYXlfb2Zfb2JqcywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQtYm94LScgOiAncmlnaHQtYm94LSdcbiAgICBhcnJheV9vZl9vYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGkgPSA0O1xuICAgICAgICBzd2l0Y2ggKG9iai5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAwIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAxIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMiBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAzIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBpKVxuICAgICAgICBjb25zdCBkZWNpbWFscyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVsxXVxuICAgICAgICBjb25zdCBpbnRlZ2VycyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVswXVxuICAgICAgICBjb25zdCBzbGljZWQgPSBvYmoucGVyY2VudCA/IGludGVnZXJzICsgJy4nICsgZGVjaW1hbHMuc2xpY2UoMCwgMikgOiAwXG4gICAgICAgIGJveC5pbm5lckhUTUwgPSBzbGljZWQgKyAnJSdcbiAgICB9KTtcbn1cblxuLy8gZC5BTU9VTlQgPT09ICdYJyA/IDAgOiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMCxcbmV4cG9ydCBjb25zdCBmaW5kQW1vdW50ID0gKGFtb3VudCkgPT4ge1xuICAgIHJldHVybiBhbW91bnQgPT09ICdYJyA/IDAgOiBhbW91bnQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDBcbn1cblxuLy8gZXhwb3J0IGNvbnN0IHN1YkRhdGFQdXNoZXIgPSAoaXRlbSkgPT4ge1xuLy8gICAgIGlmIChpdGVtICE9IFwiVDAwXCIgJiYgaXRlbSAhPSBcIlQwMVwiKSB7XG4vLyAgICAgICAgIHN3aXRjaCAoaXRlbS5zbGljZSgwLCAyKSkge1xuLy8gICAgICAgICAgICAgY2FzZSAoXCJUMFwiIHx8IFwiVDFcIik6XG4vLyAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh7XG4vLyAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbi8vICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbi8vICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICBcbi8vICAgICAgICAgICAgIGNhc2UgXCJUMlwiOlxuLy8gICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh7XG4gICAgXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH0iLCIvLyBBIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGJhc2VkIGhlYXZpbHkgb2ZmIG9mIEthcnRoaWsgVGhvdGEncyB5b3V0dWJlIHR1dG9yaWFsIFwiSW50cm9kdWN0aW9uIHRvIGQzLmpzID0gUGllIENoYXJ0IGFuZCBEb251dCBDaGFydFwiXG4vLyBUaGUgbGVnZW5kIGNvZGUgd2FzIGZyb20gQ3J5cHRlcnMgSW5mb3RlY2gncyB5b3V0dWJlIHR1dG9yaWFsIFwiUGllIENoYXJ0IHVzaW5nIEQzLmpzXCJcblxuaW1wb3J0IHsgYXNzaWduQm94LCBmaW5kQW1vdW50IH0gZnJvbSAnLi9oZWxwZXJfZnVuY3Rpb25zJ1xuaW1wb3J0IHsgc3ViRGF0YSwgY3NzU3ViRGF0YURpc3BsYXkgfSBmcm9tICcuL2V2ZW50X2hhbmRsZXJzJ1xuXG5leHBvcnQgY29uc3QgQ09MT1JTID0gW1wiI2E2NzUxZVwiLCBcIiNlN2FiMDRcIiwgXCIjNjZhNTFlXCIsIFwiIzc0NzBiM1wiLCBcIiNlODJiOGFcIl1cbi8vIGV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJPdGhlciBUYXhlc1wiXVxuZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIk90aGVyIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgVGF4ZXNcIl1cbi8vIGV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihjc3ZQYXRoLCBzZWN0b3IsIGFtb3VudCwgc3RhdGUsIG11bHRpcGxpZXIgPSAxLCBza2lwID0gMSkge1xuZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCB0YXhfdHlwZSwgcGllX251bSkge1xuXG4gICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtXCIgKyBwaWVfbnVtKVxuICAgIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG5cbiAgICBjb25zdCByZW1vdmUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtXCIgKyBwaWVfbnVtKVxuICAgIHJlbW92ZTIgPyByZW1vdmUyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlMikgOiBudWxsXG5cblxuICAgIGNvbnN0IGRpdiA9IGQzLnNlbGVjdChcIiN0b3RhbHNcIilcbiAgICAgICAgLmFwcGVuZChcImRpdlwiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwidG90YWxzLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInRvdGFscy1cIiArIHBpZV9udW0pXG5cbiAgICBjb25zdCBoMSA9IGRpdlxuICAgICAgICAuYXBwZW5kKFwiaDFcIilcbiAgICAgICAgLy8gLmF0dHIoJ2lkJywgJ3JldmVudWUtJyArIHBpZV9udW0pXG5cbiAgICBjb25zdCBzcGFuID0gZGl2XG4gICAgICAgIC5hcHBlbmQoXCJzcGFuXCIpXG5cbiAgICBjb25zdCBoMiA9IGQzLnNlbGVjdChcIiNkZXRhaWxzXCIpXG4gICAgICAgIC5hcHBlbmQoXCJoMlwiKVxuICAgICAgICAvLyAuYXR0cignaWQnLCAncGVyY2VudC0nICsgcGllX251bSlcblxuICAgIGxldCBUT1RBTCA9IDA7XG4gICAgbGV0IFRZUEVTID0gW11cbiAgICAvLyBDSVJDTEUgVElNRSBCQUJZXG4gICAgLy8gbWFyZ2luIGFuZCByYWRpdXNcbiAgICBjb25zdCBtYXJnaW4gPSB7IHRvcDogMjAwLCByaWdodDogMjAwLCBib3R0b206IDIwMCwgbGVmdDogMjAwIH0sXG4gICAgICAgIGhlaWdodCA9IDEwMDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSxcbiAgICAgICAgd2lkdGggPSAxMDAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXG4gICAgICAgIHJhZGl1cyA9IHdpZHRoIC8gMjtcblxuXG5cbiAgICBjb25zdCBjb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lRGFyazIpO1xuXG4gICAgLy8gYXJjIGdlbmVyYXRvclxuICAgIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSAxMClcbiAgICAgICAgLy8gLmlubmVyUmFkaXVzKDApOyAvLyBmb3IgY2lyY2xlXG4gICAgICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSAxMDApIC8vIGZvciBkb251dFxuXG4gICAgLy8gY29uc3QgbGFibGVBcmMgPSBkMy5hcmMoKVxuICAgIC8vICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gNTApXG4gICAgLy8gICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSA1MCk7XG5cbiAgICAvLyBwaWUgZ2VuZXJhdG9yXG4gICAgY29uc3QgcGllID0gZDMucGllKClcbiAgICAgICAgLy8gLnNvcnQobnVsbClcbiAgICAgICAgLnZhbHVlKGQgPT4gZC5hbW91bnQpO1xuXG4gICAgLy8gZGVmaW5lIHN2ZyBcbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIucGllLVwiICsgcGllX251bSkuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwiaWRcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB3aWR0aCAvIDIgKyBcIixcIiArIGhlaWdodCAvIDIgKyBcIilcIilcblxuICAgIC8vIGltcG9ydCBkYXRhXG4gICAgZDMuY3N2KFwiLi9zcmMvYXNzZXRzL2RhdGEvRlkyMDE4X3RheF9yZXZlbnVlX2RldGFpbGVkLmNzdlwiKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgYXJyYXlzIHRoYXQgd2lsbCBjb250YWluIHRoZSBzdWIgbGV2ZWwgdGF4IGRhdGFcbiAgICAgICAgbGV0IHNhbGVzX3RheGVzID0gW11cbiAgICAgICAgbGV0IGxpY2Vuc2VfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgaW5jb21lX3RheGVzID0gW11cbiAgICAgICAgbGV0IG90aGVyX3RheGVzID0gW11cbiAgICAgICAgLy8gbGV0IHNhbGVzX3RheF9vYmogPSB7IHRheF9ncm91cDogTEFCRUxTWzRdIH1cbiAgICAgICAgLy8gcGFyc2UgdGhlIGNzdlxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9IFwiVDAwXCIgJiYgZC5pdGVtICE9IFwiVDAxXCIpIHsgIC8vIGRvbid0IHdhbnQgdG8gY2F0Y2ggVG90YWwgb3IgUHJvcGVydHkgVGF4ZXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRheF9vYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudF9vZl90b3RhbDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkLml0ZW0uc2xpY2UoMCwyKSkgeyAvLyBmaWxsIHVwIHN1YiBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iaikgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzYWxlc190YXhfb2JqW2QuVGF4X1R5cGVdID0gZmluZEFtb3VudChkLkFNT1VOVClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMlwiOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29tZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9ICdUMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUWVBFUy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZC5rZXkgPSBkLlRheF9UeXBlO1xuICAgICAgICAgICAgICAgICAgICBkLmFtb3VudCA9IGZpbmRBbW91bnQoZC5BTU9VTlQpO1xuICAgICAgICAgICAgICAgICAgICBkLnBlcmNlbnQgPSAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWluZXJfYXJyYXkgPSBbXSAgLy8gc2V0dGluZyB1cCBjb250YWluZXIgYXJyYXkgZm9yIHBhc3NpbmcgaW50byBjbGljayBoYW5kbGVyXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuICAgICAgICAvLyBzZXQgaDEgYWZ0ZXIgdG90YWwgaGFzIGJlZW4gZGVmaW5lZFxuICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgXCIpXG4gICAgICAgIHNwYW4udGV4dChcIiRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgaDIudGV4dChcIlwiKVxuICAgICAgICAvLyBzZXQgdXAgdGhlIHBlcmNlbnRhZ2VzIGluIHRoZSBjZW50ZXIgYm94XG4gICAgICAgIGFzc2lnbkJveChUWVBFUywgcGllX251bSlcblxuICAgICAgICBjb25zdCBnID0gc3ZnLnNlbGVjdEFsbChcIi5hcmNcIilcbiAgICAgICAgICAgIC5kYXRhKHBpZShkYXRhKSlcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcImdcIikgIC8vIEFuZCB0aGlzIGxpbmUgdG8gZ3JvdyB0aGUgbnVtYmVyIG9mIGcncyB0byB0aGUgZGF0YSBzZXQgc2l6ZVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImFyY1wiKVxuICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCAoZCwgaSkgPT4gZC52YWx1ZSA9PT0gVE9UQUwgPyBcIm5vbmVcIiA6IFwibnVsbFwiKTsgIC8vIGF0dGVtcHQgdG8gcmVuZGVyIGhhbGYgdGhlIGNoYXJ0IGludmlzaWJsZVxuICAgICAgICAgICAgXG4gICAgICAgIC8vIGFwcGVuZCB0aGUgcGF0aCBvZiB0aGUgYXJjXG4gICAgICAgIGcuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIGFyYylcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZCA9PiBjb2xvcnMoZC5kYXRhLmtleSkpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZWFzZShkMy5lYXNlTGluZWFyKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oJ2QnLCBwaWVUd2Vlbik7XG4gICAgICAgIC8vIGRldGVybWluZSBob3cgdG8gZmxpcCB0aGUgcGllc1xuICAgICAgICBpZiAocGllX251bSA9PT0gMikgey8vIGZsaXAgdGhlIHNlY29uZCBwaWVcbiAgICAgICAgICAgIGcuYXR0cihcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVgoLTEpIHRyYW5zbGF0ZSgzMDBweCwgMHB4KSBzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgZy5vbihcIm1vdXNlb3ZlclwiLCBlbGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlKVxuICAgICAgICAgICAgLy8gaDEudGV4dChlbGUuZGF0YS5rZXkgKyBcIiBhY2NvdW50cyBmb3IgJFwiICsgZDMuZm9ybWF0KCcsJykoZWxlLmRhdGEuYW1vdW50KSArIFwiIG91dCBvZiAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICAvLyBoMi50ZXh0KFwiVGhpcyBpcyBcIiArIFN0cmluZygoZWxlLmRhdGEuYW1vdW50IC8gVE9UQUwpICogMTAwKS5zbGljZSgwLCA1KSArIFwiJSBvZiB0aGUgdG90YWxcIilcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgIC8vIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE4IHdhcyAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICAvLyBoMi50ZXh0KFwiXCIpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbihcImNsaWNrXCIsIGNzc1N1YkRhdGFEaXNwbGF5KGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkpO1xuXG4gICAgICAgIC8vIGlmIChwaWVfbnVtID09PSAyKSB7XG4gICAgICAgIC8vICAgICBjb25zdCBsZWdlbmRzID0gc3ZnLmFwcGVuZChcImdcIikuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNjMsIC0xMjgpXCIpXG4gICAgICAgIC8vICAgICAgICAgLnNlbGVjdEFsbChcIi5sZWdlbmRzXCIpLmRhdGEoVFlQRVMpO1xuICAgIFxuICAgICAgICAvLyAgICAgY29uc3QgbGVnZW5kID0gbGVnZW5kcy5lbnRlcigpLmFwcGVuZChcImdcIikuY2xhc3NlZChcImxlZ2VuZHNcIiwgdHJ1ZSkuYXR0cihcInRyYW5zZm9ybVwiLCAoZCAsIGkpID0+IFwidHJhbnNsYXRlKDAsXCIgKyAoaSsxKSAqIDMwICsgIFwiKVwiKTtcbiAgICAgICAgLy8gICAgIGxlZ2VuZC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgIC8vICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCAyMClcbiAgICAgICAgLy8gICAgICAgICAuYXR0cihcImhlaWdodFwiLCAyMCk7XG4gICAgXG4gICAgICAgIC8vICAgICBkZWJ1Z2dlclxuICAgICAgICAvLyAgICAgbGVnZW5kLnN0eWxlKFwic3Ryb2tlXCIsIChkLCBpKSA9PiBpID8gQ09MT1JTW2kgLSAxXSA6IG51bGwpXG4gICAgICAgIC8vICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgIC8vICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCAoZCwgaSkgPT4gaSA/IFwibnVsbFwiIDogXCJub25lXCIpXG4gICAgXG4gICAgICAgIC8vICAgICAvLyBsZWdlbmQuYXBwZW5kKFwidGV4dFwiKS5jbGFzc2VkKFwibGFiZWxcIiwgdHJ1ZSkudGV4dCgoZCwgaSkgPT4gTEFCRUxTW2ktMV0pXG4gICAgICAgIC8vICAgICAvLyAgICAgLmF0dHIoXCJmaWxsXCIsIChkLCBpKSA9PiBpID8gQ09MT1JTW2kgLSAxXSA6IG51bGwpXG4gICAgICAgIC8vICAgICAvLyAgICAgLmF0dHIoXCJ4XCIsIDMwKVxuICAgICAgICAvLyAgICAgLy8gICAgIC5hdHRyKFwieVwiLCAyMClcbiAgICAgICAgLy8gICAgIC8vICAgICAuYXR0cihcImJvcmRlclwiLCAoZCwgaSkgPT4gXCIzcHggc29saWQgXCIgKyBDT0xPUlNbaSAtIDFdKVxuICAgICAgICAvLyAgICAgbGVnZW5kLmFwcGVuZChcInRleHRcIikuY2xhc3NlZChcImxhYmVsXCIsIHRydWUpLnRleHQoKGQsIGkpID0+IExBQkVMU1tpLTFdKVxuICAgICAgICAvLyAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIm5vbmVcIilcbiAgICAgICAgLy8gICAgICAgICAuYXR0cihcImZpbGxcIiwgKGQsIGkpID0+IGkgPyBDT0xPUlNbaSAtIDFdIDogbnVsbClcbiAgICAgICAgLy8gICAgICAgICAuYXR0cihcInhcIiwgMzApXG4gICAgICAgIC8vICAgICAgICAgLmF0dHIoXCJ5XCIsIDIwKVxuICAgICAgICAvLyAgICAgICAgIC5hdHRyKFwiYm9yZGVyXCIsIChkLCBpKSA9PiBcIjNweCBzb2xpZCBcIiArIENPTE9SU1tpIC0gMV0pXG4gICAgICAgIC8vIH1cbiAgICAgICAgICAgIFxuICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7IGlmIChlcnJvcikgdGhyb3cgZXJyb3IgfSlcblxuICAgIGNvbnN0IHBpZVR3ZWVuID0gYiA9PiB7XG4gICAgICAgIGIuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZTogMCB9LCBiKVxuICAgICAgICByZXR1cm4gKHQpID0+IHsgcmV0dXJuIGFyYyhpKHQpKSB9XG4gICAgfSAgICBcblxuXG59XG4iLCJpbXBvcnQgeyBDT0xPUlMsIExBQkVMU30gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgcGllTGVnZW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IG1hc3Rlcl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgbWFzdGVyX2xpc3QuY2xhc3NMaXN0LmFkZCgnbWFzdGVyLWxpc3QnKVxuXG4gICAgY29uc3QgbGVmdF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHRleHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCByaWdodF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgbGVmdF9saXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnQtbGlzdCcpICBcbiAgICB0ZXh0X2xpc3QuY2xhc3NMaXN0LmFkZCgndGV4dC1saXN0JykgIFxuICAgIHJpZ2h0X2xpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHQtbGlzdCcpIFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBMQUJFTFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbGVmdF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IHRleHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCByaWdodF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgbGVmdF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ2xlZnQtYm94JylcbiAgICAgICAgbGVmdF9ib3guaWQgPSAoJ2xlZnQtYm94LScgKyBpKVxuICAgICAgICBsZWZ0X2JveC5zdHlsZS5jb2xvciA9IENPTE9SU1tpXVxuXG4gICAgICAgIHJpZ2h0X2JveC5jbGFzc0xpc3QuYWRkKCdib3gnLCAncmlnaHQtYm94JylcbiAgICAgICAgcmlnaHRfYm94LmlkID0gKCdyaWdodC1ib3gtJyArIGkpXG4gICAgICAgIHJpZ2h0X2JveC5zdHlsZS5jb2xvciA9IENPTE9SU1tpXVxuXG4gICAgICAgIHRleHRfYm94LmNsYXNzTGlzdC5hZGQoJ3RleHQtYm94JylcbiAgICAgICAgdGV4dF9ib3guaW5uZXJIVE1MID0gTEFCRUxTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBDT0xPUlNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCBcIiArIENPTE9SU1tpXVxuXG4gICAgICAgIGxlZnRfbGlzdC5hcHBlbmRDaGlsZChsZWZ0X2JveClcbiAgICAgICAgdGV4dF9saXN0LmFwcGVuZENoaWxkKHRleHRfYm94KVxuICAgICAgICByaWdodF9saXN0LmFwcGVuZENoaWxkKHJpZ2h0X2JveClcbiAgICB9XG5cbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZChsZWZ0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9saXN0KVxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKHJpZ2h0X2xpc3QpXG4gICAgcmV0dXJuIG1hc3Rlcl9saXN0XG59XG5cbmNvbnN0IHN1Ymxpc3RzID0gKGxhYmVsLCBjb2xvcikgPT4ge1xuICAgIGNvbnN0IGxpc3RzID0gW11cblxuXG4gICAgbGVzdGxpc3QuY2xhc3NMaXN0LmFkZCgnbGVmdGxpc3QnKVxuICAgIHRleHRsaXN0LmNsYXNzTGlzdC5hZGQoJ3RleHRsaXN0JylcbiAgICByaWdodGxpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHRsaXN0JylcblxuICAgIGNvbnN0IGxlZnRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgY29uc3QgcmlnaHRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cblxuXG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cblxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGVmdEJveClcbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKGxpKVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQocmlnaHRCb3gpXG4gICAgcmV0dXJuIHN1Ymxpc3Rcbn0iLCJpbXBvcnQgeyBQaWVDaGFydEdlbmVyYXRvciB9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IFRPUF9MRVZFTCA9IFsnVDAwJywgJ1QwMScsICdUQTEnLCAnVEEzJywgJ1RBNCcsICdUQTUnXVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuICAgIGNvbnN0IFNUQVRFX05BTUVTID0gWydBbGFiYW1hJywgJ0FsYXNrYScsICdBcml6b25hJywgJ0Fya2Fuc2FzJywgJ0NhbGlmb3JuaWEnLCAnQ29sb3JhZG8nLCAnQ29ubmVjdGljdXQnLCAnRGVsYXdhcmUnLCAnRmxvcmlkYScsICdHZW9yZ2lhJywgJ0hhd2FpaScsICdJZGFobycsICdJbGxpbm9pcycsICdJbmRpYW5hJywgJ0lvd2EnLCAnS2Fuc2FzJywgJ0tlbnR1Y2t5JywgJ0xvdWlzaWFuYScsICdNYWluZScsICdNYXJ5bGFuZCcsICdNYXNzYWNodXNldHRzJywgJ01pY2hpZ2FuJywgJ01pbm5lc290YScsICdNaXNzaXNzaXBwaScsICdNaXNzb3VyaScsICdNb250YW5hJywgJ05lYnJhc2thJywgJ05ldmFkYScsICdOZXcgSGFtcHNoaXJlJywgJ05ldyBKZXJzZXknLCAnTmV3IE1leGljbycsICdOZXcgWW9yaycsICdOb3J0aCBDYXJvbGluYScsICdOb3J0aCBEYWtvdGEnLCAnT2hpbycsICdPa2xhaG9tYScsICdPcmVnb24nLCAnUGVubnN5bHZhbmlhJywgJ1Job2RlIElzbGFuZCcsICdTb3V0aCBDYXJvbGluYScsICdTb3V0aCBEYWtvdGEnLCAnVGVubmVzc2VlJywgJ1RleGFzJywgJ1V0YWgnLCAnVmVybW9udCcsICdWaXJnaW5pYScsICdXYXNoaW5ndG9uJywgJ1dlc3QgVmlyZ2luaWEnLCAnV2lzY29uc2luJywgJ1d5b21pbmcnXVxuXG4gICAgLy8gY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgIC8vIHJldmlzaXQgaWYgdGltZSB0byBtYWtlIGN1c3RvbSBzZWxlY3RcbiAgICAvLyBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5pdGlhbC1jb250YWluZXInKVxuXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKVxuICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNlbGVjdC1cIiArIHBpZV9udW0pXG5cbiAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gZSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4gICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3Qgc2lkZSA9IHBpZV9udW0gPT09IDEgPyBcIi1sZWZ0XCIgOiBcIi1yaWdodFwiXG4gICAgICAgIC8vIGNvbnN0IGgyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN0YXRlXCIgKyBzaWRlKVswXVxuICAgICAgICAvLyBoMi5pbm5lckhUTUwgPSBzdGF0ZVxuICAgIH1cblxuICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBkZWZhdWx0X3N0YXRlID0gcGllX251bSA9PT0gMSA/IFNUQVRFX05BTUVTWzBdIDogU1RBVEVfTkFNRVNbU1RBVEVfTkFNRVMubGVuZ3RoIC0gMV1cbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuICAgICAgICBpZiAoc3RhdGUgPT09IGRlZmF1bHRfc3RhdGUpIHtcbiAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCB0cnVlKVxuICAgICAgICB9XG4gICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBzdGF0ZVxuICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4gICAgICAgIC8vIG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4gICAgICAgIC8vIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKVxuICAgIH0pXG4gICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc3RhdGVTZWxlY3RvcilcbiAgICAvLyBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KVxuICAgIC8vIHJldHVybiBjb250YWluZXJcbiAgICByZXR1cm4gc2VsZWN0XG59XG5cbmNvbnN0IHBoYXNlT3V0ID0gKG5vZGUpID0+IHtcblxuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxufSIsIlxuaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvcidcbmltcG9ydCB7IHBpZUxlZ2VuZCB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfbGVnZW5kJ1xuaW1wb3J0IHsgc2VsZWN0b3IsIFRPUF9MRVZFTCB9IGZyb20gJy4vY29tcG9uZW50cy9zZWxlY3RvcidcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIFxuICAgIC8vIFBDRyAtPiBjc3ZQYXRoLCBzZWN0b3IsIGFtb3V0LCBsb2NhdGlvbiwgbXVsdGlwbGllciwgc2tpcFxuICAgIFxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgICAvLyBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHNlbGVjdF8xID0gc2VsZWN0b3IoMSlcbiAgICBjb25zdCBzZWxlY3RfMiA9IHNlbGVjdG9yKDIpXG4gICAgY29uc3Qgc2VsZWN0b3JfY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdG9yLWNvbnRhaW5lclwiKVswXVxuICAgIFxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMSlcbiAgICBzZWxlY3Rvcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0XzIpXG4gICAgcm9vdC5hcHBlbmRDaGlsZCh1bClcblxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKFwiQWxhYmFtYVwiLCBUT1BfTEVWRUwsIDEpXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJXeW9taW5nXCIsIFRPUF9MRVZFTCwgMilcbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9