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

        var colors = d3.scaleOrdinal().domain(keys).range(["#952846", "#461188"]);

        var yScale = d3.scaleLinear().domain([0, d3.sum(Object.values(tax_stack))]) // the increment up to the total
        // .range([height, 0])
        .range([0, height]);

        var g = svg.selectAll(".sub-taxes") // no g at this point, but they will have this class
        .data(layers).enter() // now there will be a g for every bar within the graph.
        .append("g").attr("class", "sub-taxes");
        // .attr('fill', (d, i) => colors[i])

        var rect = g.selectAll("rect") // making each obj of the correspond to a rect within the g
        .data(function (layer) {
            return layer;
        }) // pulling out each individual obj
        .enter().append("rect").attr('x', function (d) {
            return xScale(0);
        }) // passing each obj's x value to the d3 x function defined above
        .attr('y', function (layer) {
            debugger;
            return height - yScale(layer[1]);
        }) // y0 is the height where each segment in the stack starts
        .attr('width', xScale(1)) // probably can hard code, since only one bar
        .attr('height', function (bar) {
            debugger;
            return yScale(bar[1] - bar[0]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZXZlbnRfaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvYXBwLnNjc3MiXSwibmFtZXMiOlsic3ViRGF0YSIsImNvbnRhaW5lcl9hcnJheSIsInBpZV9udW0iLCJlbGUiLCJ0YXhfdHlwZSIsImRhdGEiLCJrZXkiLCJzdWJfYXJyYXkiLCJzdWJBcnJheUxvY2F0b3IiLCJ0YXhfc3RhY2siLCJrZXlzIiwiZm9yRWFjaCIsInN1Yl90YXgiLCJpIiwicHVzaCIsInBlcmNlbnRfb2ZfdG90YWwiLCJ3aWR0aCIsImhlaWdodCIsInRvb2x0aXBXaWR0aCIsInRvb2x0aXBIZWlnaHQiLCJzdmciLCJkMyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJzdGFjayIsIm9yZGVyIiwic3RhY2tPcmRlck5vbmUiLCJvZmZzZXQiLCJzdGFja09mZnNldE5vbmUiLCJ0YXhfc3RhY2tfYXJyYXkiLCJsYXllcnMiLCJ4U2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwiY29sb3JzIiwic2NhbGVPcmRpbmFsIiwieVNjYWxlIiwic3VtIiwiT2JqZWN0IiwidmFsdWVzIiwiZyIsInNlbGVjdEFsbCIsImVudGVyIiwicmVjdCIsImxheWVyIiwiYmFyIiwiY3NzU3ViRGF0YURpc3BsYXkiLCJyZW1vdmUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwidG90YWwiLCJvYmoiLCJhbW91bnQiLCJyb290IiwidWwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaWQiLCJsaSIsInN0eWxlIiwiYXBwZW5kQ2hpbGQiLCJncm91cFRvdGFsIiwiYXJyYXkiLCJhc3NpZ25Cb3giLCJhcnJheV9vZl9vYmpzIiwic2lkZSIsImJveCIsImRlY2ltYWxzIiwiU3RyaW5nIiwicGVyY2VudCIsInNwbGl0IiwiaW50ZWdlcnMiLCJzbGljZWQiLCJzbGljZSIsImlubmVySFRNTCIsImZpbmRBbW91bnQiLCJqb2luIiwiYnVkZ2V0Q2lyY2xlIiwidG90YWwxIiwidG90YWwyIiwiTWF0aCIsInNxcnQiLCJvbGRfY2lybGNlXzEiLCJvbGRfY2lybGNlXzIiLCJjaXJjbGVfY29udGFpbmVyIiwic3ZnMSIsInN2ZzIiLCJyc2NhbGUiLCJtYXgiLCJkIiwiUGllQ2hhcnRHZW5lcmF0b3IiLCJDT0xPUlMiLCJDSVJDTEVfQ09MT1JTIiwiTEFCRUxTIiwic3RhdGUiLCJjc3YiLCJoMSIsInNwYW4iLCJoMiIsIlRPVEFMIiwiVFlQRVMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJyYWRpdXMiLCJhcmMiLCJvdXRlclJhZGl1cyIsImlubmVyUmFkaXVzIiwicGllIiwidmFsdWUiLCJ0aGVuIiwic2FsZXNfdGF4ZXMiLCJsaWNlbnNlX3RheGVzIiwiaW5jb21lX3RheGVzIiwib3RoZXJfdGF4ZXMiLCJHZW9fTmFtZSIsIml0ZW0iLCJBTU9VTlQiLCJ0YXhfb2JqIiwiVGF4X1R5cGUiLCJpbmNsdWRlcyIsInRleHQiLCJmb3JtYXQiLCJwYXRoIiwidHJhbnNpdGlvbiIsImVhc2UiLCJlYXNlTGluZWFyIiwiZHVyYXRpb24iLCJhdHRyVHdlZW4iLCJwaWVUd2VlbiIsIm9uIiwiY29uc29sZSIsImxvZyIsInNwYW4xIiwic3BhbjIiLCJpbm5lclRleHQiLCJwYXJzZUludCIsImNhdGNoIiwiZXJyb3IiLCJiIiwiaW50ZXJwb2xhdGUiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJ0IiwicGllTGVnZW5kIiwibWFzdGVyX2xpc3QiLCJsZWZ0X2xpc3QiLCJ0ZXh0X2xpc3QiLCJyaWdodF9saXN0IiwibGVuZ3RoIiwibGVmdF9ib3giLCJ0ZXh0X2JveCIsInJpZ2h0X2JveCIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyIiwic3VibGlzdHMiLCJsYWJlbCIsImxpc3RzIiwibGVzdGxpc3QiLCJ0ZXh0bGlzdCIsInJpZ2h0bGlzdCIsImxlZnRCb3giLCJyaWdodEJveCIsInN1Ymxpc3QiLCJUT1BfTEVWRUwiLCJTVEFURV9OQU1FUyIsInN0YXRlX3NlbGVjdG9yIiwid3JhcHBlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwic3RhdGVfbGlzdCIsInRvZ2dsZSIsImJvZHkiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0YXRlU2VsZWN0b3IiLCJzdGF0ZV9saXN0X2l0ZW0iLCJzZXRBdHRyaWJ1dGUiLCJzZWxlY3RfMSIsInNlbGVjdF8yIiwic2VsZWN0b3JfY29udGFpbmVyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInllYXJTZWxlY3RvciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFp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QXVCdUgsZUFBdkI7QUFDSCxLQVBEOztBQVNBVCxZQUFROUcsV0FBUixDQUFvQjNDLE1BQXBCO0FBQ0F5SixZQUFROUcsV0FBUixDQUFvQmtILFVBQXBCOztBQUVBLFdBQU9KLE9BQVA7QUFDSCxDQWpETTs7QUFtRFA7O0FBRUE7QUFDQSxJOzs7Ozs7Ozs7Ozs7OztBQ3BHQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTdILFNBQVM4SCxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTs7QUFFaEQ7O0FBRUEsUUFBTXZILE9BQU9QLFNBQVNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYjtBQUNBO0FBQ0EsUUFBTU8sS0FBSyw0QkFBWDtBQUNBLFFBQU1nSSxXQUFXLG9DQUFlLENBQWYsQ0FBakI7QUFDQSxRQUFNQyxXQUFXLG9DQUFlLENBQWYsQ0FBakI7QUFDQSxRQUFNQyxxQkFBcUIxSSxTQUFTMkksc0JBQVQsQ0FBZ0Msb0JBQWhDLEVBQXNELENBQXRELENBQTNCOztBQUVBLFFBQU1DLGVBQWVBLFlBQXJCOztBQUVBRix1QkFBbUIzSCxXQUFuQixDQUErQnlILFFBQS9CO0FBQ0FFLHVCQUFtQjNILFdBQW5CLENBQStCMEgsUUFBL0I7QUFDQWxJLFNBQUtRLFdBQUwsQ0FBaUJQLEVBQWpCOztBQUVBLGdEQUFrQixTQUFsQixFQUE2QmtILHlCQUE3QixFQUF3QyxDQUF4QztBQUNBLGdEQUFrQixTQUFsQixFQUE2QkEseUJBQTdCLEVBQXdDLENBQXhDO0FBR0gsQ0FyQkQsRTs7Ozs7Ozs7Ozs7QUNQQSx1QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuLy8gY29udGFpbmVyX2FycmF5LnB1c2gobGljZW5zZV90YXhlcylcbi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKGluY29tZV90YXhlcylcbi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuXG5leHBvcnQgY29uc3Qgc3ViRGF0YSA9IChjb250YWluZXJfYXJyYXksIHBpZV9udW0pID0+IHtcbiAgICAvLyBhIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGxlYXJuZWQgZnJvbSBNaWNoYWVsIFN0YW5hbGFuZCdzIFwiU3RhY2tlZCBiYXIgY2hhcnQgd2l0aCB0b29sdGlwc1wiIHR1dG9yaWFsIGF0IGh0dHA6Ly9ibC5vY2tzLm9yZy9tc3RhbmFsYW5kLzYxMDA3MTNcbiAgICByZXR1cm4gKGVsZSkgPT4ge1xuICAgICAgICBkZWJ1Z2dlclxuICAgICAgICBjb25zdCB0YXhfdHlwZSA9IGVsZS5kYXRhLmtleVxuXG4gICAgICAgIGNvbnN0IHN1Yl9hcnJheSA9IHN1YkFycmF5TG9jYXRvcih0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KVxuXG4gICAgICAgIC8vIHNldHRpbmcgdXAgdGhlIHRheCBzdGFjayB0byBjb21wbHkgd2l0aCBkMyB2NVxuICAgICAgICBsZXQgdGF4X3N0YWNrID0geyBcbiAgICAgICAgICAgIC8vIHRheF90eXBlOiB0YXhfdHlwZSxcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXR0aW5nIHVwIGtleXNcbiAgICAgICAgbGV0IGtleXMgPSBbXVxuICAgICAgICAvLyBrZXlzLnB1c2godGF4X3R5cGUpXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKChzdWJfdGF4LCBpKSA9PiB7XG4gICAgICAgICAgICBrZXlzLnB1c2goc3ViX3RheC5rZXkpXG4gICAgICAgICAgICB0YXhfc3RhY2tbc3ViX3RheC5rZXldID0gc3ViX3RheC5wZXJjZW50X29mX3RvdGFsXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSA5MCAgLy8gc2V0dGluZyB0aGUgZGltZW5zaW9ucyB0byBjb3JyZXNwb25kIHRvIHRoZSBwaWUgY2hhcnRzJ1xuICAgICAgICBjb25zdCBoZWlnaHQgPSA2MDBcblxuICAgICAgICBjb25zdCB0b29sdGlwV2lkdGggPSAxMjAgLy8gd2lsbCBhbHRlciB0aGVzZSBhcyBuZWVkZWRcbiAgICAgICAgY29uc3QgdG9vbHRpcEhlaWdodCA9IDQwIFxuXG4gICAgICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIm1haW5cIikuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKS5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJnXCIpXG5cbiAgICAgICAgLy8gc2V0IHRoZSBsYXllcnMgb2YgdGhlIHN0YWNrZWQgYmFyXG4gICAgICAgIC8vIGNvbnN0IGxheWVycyA9IGQzLnN0YWNrKCkoW3RheF90eXBlXS5tYXAodGF4ID0+IHsgIC8vIHNob3VsZCB1bHRpbWF0ZWx5IGp1c3QgYmUgdGhlIG9uZSBsYXllclxuICAgICAgICAvLyAgICAgcmV0dXJuIHN1Yl9hcnJheS5tYXAoZCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHsgeDogZC5rZXksIHk6IGQuYW1vdW50LCBwZXJjZW50OiBkLnBlcmNlbnQgfVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gfSkpXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZDMuc3RhY2soKVxuICAgICAgICAgICAgLmtleXMoa2V5cylcbiAgICAgICAgICAgIC5vcmRlcihkMy5zdGFja09yZGVyTm9uZSlcbiAgICAgICAgICAgIC5vZmZzZXQoZDMuc3RhY2tPZmZzZXROb25lKVxuICAgICAgICBsZXQgdGF4X3N0YWNrX2FycmF5ID0gW11cbiAgICAgICAgdGF4X3N0YWNrX2FycmF5LnB1c2godGF4X3N0YWNrKVxuICAgICAgICBjb25zdCBsYXllcnMgPSBzdGFjayh0YXhfc3RhY2tfYXJyYXkpXG5cbiAgICAgICAgLy8gY29uc3QgeCA9IGQzLnNjYWxlT3JkaW5hbCgpXG4gICAgICAgIC8vICAgICAuZG9tYWluKGxheWVyc1swXS5tYXAoZCA9PiBkLngpKVxuICAgICAgICAvLyAgICAgLy8gLnJhbmdlKFsxMCwgd2lkdGhdLCAwKSAgLy8gbWF5IGJlIGEgcXVpY2tlciB3YXkgdG8gZG8gdGhpcyBhcyB0aGVyZSBpcyBvbmx5IG9uZSBiYXJcbiAgICAgICAgLy8gICAgIC5yYW5nZShbd2lkdGhdKVxuICAgICAgICBjb25zdCB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpIFxuICAgICAgICAgICAgLmRvbWFpbihbMCwgMV0pXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAgICAgICAgIFxuICAgICAgICBjb25zdCBjb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoKVxuICAgICAgICAgICAgLmRvbWFpbihrZXlzKVxuICAgICAgICAgICAgLnJhbmdlKFtcIiM5NTI4NDZcIiwgXCIjNDYxMTg4XCJdKVxuXG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIGQzLnN1bShPYmplY3QudmFsdWVzKHRheF9zdGFjaykpXSkgIC8vIHRoZSBpbmNyZW1lbnQgdXAgdG8gdGhlIHRvdGFsXG4gICAgICAgICAgICAvLyAucmFuZ2UoW2hlaWdodCwgMF0pXG4gICAgICAgICAgICAucmFuZ2UoWzAsIGhlaWdodF0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuc3ViLXRheGVzXCIpICAvLyBubyBnIGF0IHRoaXMgcG9pbnQsIGJ1dCB0aGV5IHdpbGwgaGF2ZSB0aGlzIGNsYXNzXG4gICAgICAgICAgICAuZGF0YShsYXllcnMpLmVudGVyKCkgIC8vIG5vdyB0aGVyZSB3aWxsIGJlIGEgZyBmb3IgZXZlcnkgYmFyIHdpdGhpbiB0aGUgZ3JhcGguXG4gICAgICAgICAgICAuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgXCJzdWItdGF4ZXNcIikgIFxuICAgICAgICAgICAgLy8gLmF0dHIoJ2ZpbGwnLCAoZCwgaSkgPT4gY29sb3JzW2ldKVxuICAgICAgICAgICAgXG4gICAgICAgIGNvbnN0IHJlY3QgPSBnLnNlbGVjdEFsbChcInJlY3RcIikgIC8vIG1ha2luZyBlYWNoIG9iaiBvZiB0aGUgY29ycmVzcG9uZCB0byBhIHJlY3Qgd2l0aGluIHRoZSBnXG4gICAgICAgICAgICAuZGF0YShsYXllciA9PiBsYXllcikgLy8gcHVsbGluZyBvdXQgZWFjaCBpbmRpdmlkdWFsIG9ialxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBkID0+IHhTY2FsZSgwKSkgIC8vIHBhc3NpbmcgZWFjaCBvYmoncyB4IHZhbHVlIHRvIHRoZSBkMyB4IGZ1bmN0aW9uIGRlZmluZWQgYWJvdmVcbiAgICAgICAgICAgIC5hdHRyKCd5JywgbGF5ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodCAtIHlTY2FsZShsYXllclsxXSl9KSAgLy8geTAgaXMgdGhlIGhlaWdodCB3aGVyZSBlYWNoIHNlZ21lbnQgaW4gdGhlIHN0YWNrIHN0YXJ0c1xuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgeFNjYWxlKDEpKSAgLy8gcHJvYmFibHkgY2FuIGhhcmQgY29kZSwgc2luY2Ugb25seSBvbmUgYmFyXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgYmFyID0+IHtcbiAgICAgICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgICAgIHJldHVybiB5U2NhbGUoYmFyWzFdIC0gYmFyWzBdKX0pICAvLyBoZWlnaHQgaXMgc2V0IHRvIHRoZSBzdGFydGluZyBwb2ludCBwbHVzIHRoZSBoZWlnaHQsIGFuZCBhbGwgdGhhdCBzdWJ0cmFjdGVkIGZyb20gdGhlIHN0YXJ0aW5nIHBvaW50IGR1ZSB0byB5IHZhbHVlcyBiZWdpbmluZyBhdCB0b3Agb2Ygc2NyZWVuXG4gICAgICAgIC8vICAgICAub24oJ21vdXNlb3ZlcicsICgpID0+IHRvb2x0aXAuc3R5bGUoXCJkaXNwbGF5XCIsIHRydWUpKSAgLy8gd2FudCB0aGUgaW5mbyBib3ggdG8gc3dpdGNoIGJldHdlZW4gdmlzaWJsZSBhbmQgaW5pdmlzIGJhc2VkIG9uIG1vdXNlb3ZlclxuICAgICAgICAvLyAgICAgLm9uKCdtb3VzZW91dCcsICgpID0+IHRvb2x0aXAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKSlcbiAgICAgICAgLy8gICAgIC5vbignbW91c2Vtb3ZlJywgZCA9PiB7ICAvLyB0aGlzIGlzIGdvaW5nIHRvIGJlIGEgc3dlZXQgZWZmZWN0IVxuICAgICAgICAvLyAgICAgICAgIGNvbnN0IHhQb3MgPSBkMy5tb3VzZSh0aGlzKVswXSAtICh0b29sdGlwV2lkdGggLyAyKSAvLyB0aGlzWzBdIGNvcnJlc3BvbmRzIHRvIG1vdXNlJ3MgeCBwb3MsIGFuZCBwdXNoaW5nIGl0IGxlZnQgYnkgaGFsZiBvZiB0aGUgdG9vbHRpcCdzIHdpZHRoIGVuc3VyZSBpdCBpcyBjZW50ZXJlZFxuICAgICAgICAvLyAgICAgICAgIGNvbnN0IHlQb3MgPSBkMy5tb3VzZSh0aGlzKVsxXSAtIDI1IC8vIHB1dHMgdGhlIHRvb2x0aXAgdXAgYSBiaXQgYWJvdmUgdGhlIGN1cnNvclxuICAgICAgICAvLyAgICAgICAgIHRvb2x0aXAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHhQb3MgKyAnLCcgKyB5UG9zICsgJyknKVxuICAgICAgICAvLyAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCd0ZXh0JykudGV4dChkLnBlcmNlbnQpIC8vIHNob3dzIHRoZSBwZXJjZW50ICBcbiAgICAgICAgLy8gICAgIH0pXG5cbiAgICAgICAgLy8gY29uc3QgdG9vbHRpcCA9IHN2Zy5hcHBlbmQoJ2cnKSAvLyBzZXR0aW5nIHVwIHRoaXMgc3dlZXQgdG9vbHRpcC4gRXhjaXRpbmchXG4gICAgICAgIC8vICAgICAuYXR0cignY2xhc3MnLCAnc3ViLWRhdGEtdG9vbHRpcCB0b29sdGlwJykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpIC8vIHN0YXJ0cyBpbnZpc2libGVcbiAgICAgICAgLy8gICAgIC8vIGFkZGluZyB0aGUgZGltZW5zaW9ucyBvZiB0aGUgYm94XG4gICAgICAgIC8vICAgICAuYXBwZW5kKCdyZWN0JykuYXR0cignd2lkdGgnLCB0b29sdGlwV2lkdGgpXG4gICAgICAgIC8vICAgICAuYXR0cignaGVpZ2h0JywgdG9vbHRpcEhlaWdodCkuYXR0cignZmlsbCcsICd3aGl0ZScpLnN0eWxlKCdvcGFjaXR5JywgMC41KSAvLyBtYWtpbmcgaXQgcGFydGlhbGx5IHNlZS10aHJvdWdoXG4gICAgICAgIC8vICAgICAvLyBhZGRpbmcgdGhlIHRleHQgY29udGVudFxuICAgICAgICAvLyAgICAgLmFwcGVuZCgndGV4dCcpLmF0dHIoJ3gnLCAxNSlcbiAgICAgICAgLy8gICAgIC5hdHRyKCdkeScsICcuOGVtJykuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgfVxuICAgIFxufVxuXG5jb25zdCBzdWJBcnJheUxvY2F0b3IgPSAodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSkgPT4geyAgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBmaW5kaW5nIHRoZSByaWdodCBzdWIgYXJyYXkuIEEgYml0IGhhcmQtY29kZWQuXG4gICAgc3dpdGNoICh0YXhfdHlwZSkge1xuICAgICAgICBjYXNlIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzBdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6IFxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsxXVxuICAgICAgICBjYXNlIFwiSW5jb21lIFRheGVzXCI6IFxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsyXVxuICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjogXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzNdXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgY3NzU3ViRGF0YURpc3BsYXkgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSA9PiB7XG5cbiAgICBjb25zdCB3aWR0aCA9IDkwICAvLyBzZXR0aW5nIHRoZSBkaW1lbnNpb25zIHRvIGNvcnJlc3BvbmQgdG8gdGhlIHBpZSBjaGFydHMnXG4gICAgY29uc3QgaGVpZ2h0ID0gNjAwXG5cbiAgICByZXR1cm4gKGVsZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ViLWRhdGEtbGlzdC1cIiArIHBpZV9udW0pXG4gICAgICAgIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YXhfdHlwZSA9IGVsZS5kYXRhLmtleVxuICAgICAgICBjb25zdCBzdWJfYXJyYXkgPSBzdWJBcnJheUxvY2F0b3IodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSkgLy8gZ2V0IHJpZ2h0IHN1Yl9hcnJheVxuICAgICAgICAvLyBjb25zdCBncm91cFRvdGFsID0gZ3JvdXBUb3RhbChzdWJfYXJyYXkpIC8vIG5vdCBzdXJlIHdoeSB0aGlzIGlzIG5vdCBpbnZva2luZyB0aGUgZnVuY2l0b24gYmVsb3dcbiAgICAgICAgbGV0IHRvdGFsID0gMFxuICAgICAgICBzdWJfYXJyYXkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgdG90YWwgKz0gb2JqLmFtb3VudFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSAvLyBncmFiIHRoZSByb290IHRvIGF0dGFjaCBsYXRlclxuXG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpIC8vIHNldCB1cCB1bCBjb250YWluZXJcbiAgICAgICAgdWwuY2xhc3NMaXN0LmFkZChcInN1Yi1kYXRhLWxpc3QtXCIgKyBwaWVfbnVtKVxuICAgICAgICB1bC5pZCA9IChcInN1Yi1kYXRhLWxpc3QtXCIgKyBwaWVfbnVtKVxuXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKHN1Yl90YXggPT4ge1xuICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICBsaS5zdHlsZS5oZWlnaHQgPSAoc3ViX3RheC5wZXJjZW50X29mX3RvdGFsICogNikgKyAncHgnXG4gICAgICAgICAgICB1bC5hcHBlbmRDaGlsZChsaSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZCh1bClcbiAgICB9XG59XG5cbmNvbnN0IGdyb3VwVG90YWwgPSBhcnJheSA9PiB7XG4gICAgbGV0IHRvdGFsID0gMFxuICAgIGFycmF5LmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgdG90YWwgKz0gb2JqLmFtb3VudFxuICAgIH0pO1xuICAgIHJldHVybiB0b3RhbFxufSIsIlxuXG5leHBvcnQgY29uc3QgYXNzaWduQm94ID0gKGFycmF5X29mX29ianMsIHBpZV9udW0pID0+IHtcbiAgICBjb25zdCBzaWRlID0gcGllX251bSA9PT0gMSA/ICdsZWZ0LWJveC0nIDogJ3JpZ2h0LWJveC0nXG4gICAgYXJyYXlfb2Zfb2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBpID0gNDtcbiAgICAgICAgc3dpdGNoIChvYmoua2V5KSB7XG4gICAgICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMCBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJJbmNvbWUgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMSBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDIgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiUHJvcGVydHkgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMyBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaWRlICsgaSlcbiAgICAgICAgY29uc3QgZGVjaW1hbHMgPSBTdHJpbmcob2JqLnBlcmNlbnQpLnNwbGl0KCcuJylbMV1cbiAgICAgICAgY29uc3QgaW50ZWdlcnMgPSBTdHJpbmcob2JqLnBlcmNlbnQpLnNwbGl0KCcuJylbMF1cbiAgICAgICAgY29uc3Qgc2xpY2VkID0gb2JqLnBlcmNlbnQgPyBpbnRlZ2VycyArICcuJyArIGRlY2ltYWxzLnNsaWNlKDAsIDIpIDogMFxuICAgICAgICBib3guaW5uZXJIVE1MID0gc2xpY2VkICsgJyUnXG4gICAgfSk7XG59XG5cbi8vIGQuQU1PVU5UID09PSAnWCcgPyAwIDogZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDAsXG5leHBvcnQgY29uc3QgZmluZEFtb3VudCA9IChhbW91bnQpID0+IHtcbiAgICByZXR1cm4gYW1vdW50ID09PSAnWCcgPyAwIDogYW1vdW50LnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwXG59XG5cbi8vIGV4cG9ydCBjb25zdCBzdWJEYXRhUHVzaGVyID0gKGl0ZW0pID0+IHtcbi8vICAgICBpZiAoaXRlbSAhPSBcIlQwMFwiICYmIGl0ZW0gIT0gXCJUMDFcIikge1xuLy8gICAgICAgICBzd2l0Y2ggKGl0ZW0uc2xpY2UoMCwgMikpIHtcbi8vICAgICAgICAgICAgIGNhc2UgKFwiVDBcIiB8fCBcIlQxXCIpOlxuLy8gICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2goe1xuLy8gICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4vLyAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4vLyAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnQ6IChmaW5kQW1vdW50KGQuQU1PVU5UKSAvIFRPVEFMKSAqIDEwMFxuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgXG4vLyAgICAgICAgICAgICBjYXNlIFwiVDJcIjpcbi8vICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2goe1xuICAgIFxuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9XG5cbmV4cG9ydCBjb25zdCBidWRnZXRDaXJjbGUgPSAodG90YWwxLCB0b3RhbDIpID0+IHtcbiAgICAvLyBiYXNlZCBvbiBNYXR0aGV3IE1jS2VubmEncyBleGFtcGxlIGF0IGh0dHA6Ly9ibC5vY2tzLm9yZy9tcG1ja2VubmE4L3Jhdy81NjY1MDlkZDNkOWEwOGU1ZjliMi9cbiAgICBpZiAoIXRvdGFsMSB8fCAhdG90YWwyKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICB0b3RhbDEgPSBNYXRoLnNxcnQodG90YWwxKVxuICAgIHRvdGFsMiA9IE1hdGguc3FydCh0b3RhbDIpXG4gICAgLy8gZGVsZXRlIG9sZCBjaXJjbGVzXG4gICAgY29uc3Qgb2xkX2NpcmxjZV8xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1zdmctMScpXG4gICAgY29uc3Qgb2xkX2NpcmxjZV8yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1zdmctMicpXG4gICAgb2xkX2NpcmxjZV8xID8gb2xkX2NpcmxjZV8xLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob2xkX2NpcmxjZV8xKSA6IG51bGxcbiAgICBvbGRfY2lybGNlXzIgPyBvbGRfY2lybGNlXzIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGRfY2lybGNlXzIpIDogbnVsbFxuICAgIFxuICAgIGNvbnN0IGRhdGEgPSBbdG90YWwxLCB0b3RhbDJdXG5cbiAgICBjb25zdCBoZWlnaHQgPSAzMDBcbiAgICBjb25zdCB3aWR0aCA9IDUwMFxuXG4gICAgY29uc3QgY2lyY2xlX2NvbnRhaW5lciA9IGQzLnNlbGVjdCgnI2J1ZGdldC1jaXJjbGUtY29udGFpbmVyJylcblxuICAgIGNvbnN0IHN2ZzEgPSBjaXJjbGVfY29udGFpbmVyLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKS5hdHRyKCdpZCcsICdjaXJjbGUtc3ZnLTEnKTtcblxuICAgIGNvbnN0IHN2ZzIgPSBjaXJjbGVfY29udGFpbmVyLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKS5hdHRyKCdpZCcsICdjaXJjbGUtc3ZnLTInKTtcblxuICAgIGNvbnN0IHJzY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbihbMCwgKGQzLm1heChkYXRhKSkgXSlcbiAgICAgICAgLnJhbmdlKFsxLCAxNTBdKVxuXG4gICAgc3ZnMS5zZWxlY3RBbGwoJy5jaXJjbGVzJykuZGF0YShbdG90YWwxXSlcbiAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZXMnKS5hdHRyKCdjeScsIGhlaWdodCAvIDIpXG4gICAgICAgIC5hdHRyKCdjeCcsIChkLCBpKSA9PiB3aWR0aCAvIDIpXG4gICAgICAgIC5hdHRyKCdmaWxsJywgJyMwYTgwYWUnKVxuXG4gICAgc3ZnMi5zZWxlY3RBbGwoJy5jaXJjbGVzJykuZGF0YShbdG90YWwyXSlcbiAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gcnNjYWxlKGQpXG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGVzJykuYXR0cignY3knLCBoZWlnaHQgLyAyKVxuICAgICAgICAuYXR0cignY3gnLCAoZCwgaSkgPT4gd2lkdGggLyAyKVxuICAgICAgICAuYXR0cignZmlsbCcsICcjMGE4MGFlJylcbn0iLCIvLyBBIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGJhc2VkIGhlYXZpbHkgb2ZmIG9mIEthcnRoaWsgVGhvdGEncyB5b3V0dWJlIHR1dG9yaWFsIFwiSW50cm9kdWN0aW9uIHRvIGQzLmpzID0gUGllIENoYXJ0IGFuZCBEb251dCBDaGFydFwiXG4vLyBUaGUgbGVnZW5kIGNvZGUgd2FzIGZyb20gQ3J5cHRlcnMgSW5mb3RlY2gncyB5b3V0dWJlIHR1dG9yaWFsIFwiUGllIENoYXJ0IHVzaW5nIEQzLmpzXCJcblxuaW1wb3J0IHsgYXNzaWduQm94LCBmaW5kQW1vdW50LCBidWRnZXRDaXJjbGUgfSBmcm9tICcuL2hlbHBlcl9mdW5jdGlvbnMnXG5pbXBvcnQgeyBzdWJEYXRhLCBjc3NTdWJEYXRhRGlzcGxheSB9IGZyb20gJy4vZXZlbnRfaGFuZGxlcnMnXG4vLyBcbmNvbnN0IENPTE9SUyA9IFtcIiNhNjc1MWVcIiwgXCIjOWEwMDQ3XCIsIFwiIzY2YTUxZVwiLCBcIiM3NDcwYjNcIiwgXCIjZTgyYjhhXCJdXG5leHBvcnQgY29uc3QgQ0lSQ0xFX0NPTE9SUyA9IFtDT0xPUlNbMV0sIENPTE9SU1swXSwgQ09MT1JTWzRdLCBDT0xPUlNbMl0sIENPTE9SU1szXV1cbi8vIGV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJPdGhlciBUYXhlc1wiXVxuZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIk90aGVyIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgVGF4ZXNcIl1cbi8vIGV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihjc3ZQYXRoLCBzZWN0b3IsIGFtb3VudCwgc3RhdGUsIG11bHRpcGxpZXIgPSAxLCBza2lwID0gMSkge1xuZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCB0YXhfdHlwZSwgcGllX251bSwgY3N2ID0gXCIuL3NyYy9hc3NldHMvZGF0YS9GWTIwMTgtU1RDLURldGFpbGVkLVRhYmxlLmNzdlwiKSB7XG5cbiAgICAvLyBjb25zdCByZW1vdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvdGFscy1cIiArIHBpZV9udW0pXG4gICAgLy8gcmVtb3ZlID8gcmVtb3ZlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlKSA6IG51bGxcblxuICAgIC8vIGNvbnN0IHJlbW92ZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRldGFpbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZTIgPyByZW1vdmUyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlMikgOiBudWxsXG5cbiAgICBjb25zdCBoMSA9IGQzLnNlbGVjdCgnI3RvdGFscy1oZWFkZXItJyArIHBpZV9udW0pXG4gICAgY29uc3Qgc3BhbiA9IGQzLnNlbGVjdCgnI3RvdGFscy1zcGFuLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IGgyID0gZDMuc2VsZWN0KFwiI2RldGFpbHMtXCIgKyBwaWVfbnVtKVxuXG5cbiAgICBsZXQgVE9UQUwgPSAwO1xuICAgIGxldCBUWVBFUyA9IFtdXG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cblxuXG4gICAgY29uc3QgY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKENPTE9SUyk7XG5cbiAgICAvLyBhcmMgZ2VuZXJhdG9yXG4gICAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDEwKVxuICAgICAgICAvLyAuaW5uZXJSYWRpdXMoMCk7IC8vIGZvciBjaXJjbGVcbiAgICAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDEwMCkgLy8gZm9yIGRvbnV0XG5cbiAgICAvLyBjb25zdCBsYWJsZUFyYyA9IGQzLmFyYygpXG4gICAgLy8gICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSA1MClcbiAgICAvLyAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDUwKTtcblxuICAgIC8vIHBpZSBnZW5lcmF0b3JcbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgICAvLyAuc29ydChudWxsKVxuICAgICAgICAudmFsdWUoZCA9PiBkLmFtb3VudCk7XG5cbiAgICAvLyBkZWZpbmUgc3ZnIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIi5waWUtXCIgKyBwaWVfbnVtKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKVxuXG4gICAgLy8gaW1wb3J0IGRhdGFcbiAgICBkMy5jc3YoY3N2KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgYXJyYXlzIHRoYXQgd2lsbCBjb250YWluIHRoZSBzdWIgbGV2ZWwgdGF4IGRhdGFcbiAgICAgICAgbGV0IHNhbGVzX3RheGVzID0gW11cbiAgICAgICAgbGV0IGxpY2Vuc2VfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgaW5jb21lX3RheGVzID0gW11cbiAgICAgICAgbGV0IG90aGVyX3RheGVzID0gW11cbiAgICAgICAgLy8gbGV0IHNhbGVzX3RheF9vYmogPSB7IHRheF9ncm91cDogTEFCRUxTWzRdIH1cbiAgICAgICAgLy8gcGFyc2UgdGhlIGNzdlxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9IFwiVDAwXCIgJiYgZC5pdGVtICE9IFwiVDAxXCIpIHsgIC8vIGRvbid0IHdhbnQgdG8gY2F0Y2ggVG90YWwgb3IgUHJvcGVydHkgVGF4ZXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRheF9vYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudF9vZl90b3RhbDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkLml0ZW0uc2xpY2UoMCwyKSkgeyAvLyBmaWxsIHVwIHN1YiBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iaikgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzYWxlc190YXhfb2JqW2QuVGF4X1R5cGVdID0gZmluZEFtb3VudChkLkFNT1VOVClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMlwiOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29tZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9ICdUMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUWVBFUy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZC5rZXkgPSBkLlRheF9UeXBlO1xuICAgICAgICAgICAgICAgICAgICBkLmFtb3VudCA9IGZpbmRBbW91bnQoZC5BTU9VTlQpO1xuICAgICAgICAgICAgICAgICAgICBkLnBlcmNlbnQgPSAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWluZXJfYXJyYXkgPSBbXSAgLy8gc2V0dGluZyB1cCBjb250YWluZXIgYXJyYXkgZm9yIHBhc3NpbmcgaW50byBjbGljayBoYW5kbGVyXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuICAgICAgICAvLyBzZXQgaDEgYWZ0ZXIgdG90YWwgaGFzIGJlZW4gZGVmaW5lZFxuICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgXCIpXG4gICAgICAgIHNwYW4udGV4dChcIiRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgaDIudGV4dChcIlwiKVxuICAgICAgICAvLyBhdHRlbXB0IGJ1ZGdldENpcmNsZSBjYWxsXG4gICAgICAgIGJ1ZGdldENpcmNsZShUT1RBTClcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwZXJjZW50YWdlcyBpbiB0aGUgY2VudGVyIGJveFxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgYXJjKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBkID0+IGNvbG9ycyhkLmRhdGEua2V5KSlcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbignZCcsIHBpZVR3ZWVuKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHBhdGgub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIC8vIHdoeSBkb2Vzbid0IHRoaXMgd29yaz9cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gICAgICAgICAgICAgLmR1cmF0aW9uKCc1MCcpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIGRldGVybWluZSBob3cgdG8gZmxpcCB0aGUgcGllc1xuICAgICAgICBpZiAocGllX251bSA9PT0gMikgey8vIGZsaXAgdGhlIHNlY29uZCBwaWVcbiAgICAgICAgICAgIGcuYXR0cihcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVgoLTEpIHRyYW5zbGF0ZSgzMDBweCwgMHB4KSBzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgZy5vbihcIm1vdXNlb3ZlclwiLCAoZCwgaSkgPT4geyAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbignNTAnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgJ3BvaW50ZXInKVxuICAgICAgICB9KVxuICAgICAgICAub24oXCJtb3VzZW91dFwiLCBlbGUgPT4ge1xuICAgICAgICAgICAgLy8gaDEudGV4dChzdGF0ZSArIFwiJ3MgdGF4IHJldmVudWUgZm9yIDIwMTggd2FzICRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgICAgIC8vIGgyLnRleHQoXCJcIilcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljaycsIHN1YkRhdGEoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSlcblxuICAgICAgICBjb25zdCBzcGFuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbHMtc3Bhbi0xJylcbiAgICAgICAgY29uc3Qgc3BhbjIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWxzLXNwYW4tMicpXG5cbiAgICAgICAgaWYgKHNwYW4xLmlubmVyVGV4dFxuICAgICAgICAgICAgJiYgc3BhbjIuaW5uZXJUZXh0KSB7XG4gICAgICAgICAgICBjb25zdCB0b3RhbDEgPSBwYXJzZUludChzcGFuMS5pbm5lclRleHQuc2xpY2UoMSkuc3BsaXQoJywnKS5qb2luKCcnKSlcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsMiA9IHBhcnNlSW50KHNwYW4yLmlubmVyVGV4dC5zbGljZSgxKS5zcGxpdCgnLCcpLmpvaW4oJycpKVxuICAgICAgICAgICAgYnVkZ2V0Q2lyY2xlKHRvdGFsMSwgdG90YWwyKVxuICAgICAgICB9ICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHsgaWYgKGVycm9yKSB0aHJvdyBlcnJvciB9KVxuICAgIFxuICAgIGNvbnN0IHBpZVR3ZWVuID0gYiA9PiB7XG4gICAgICAgIGIuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZTogMCB9LCBiKVxuICAgICAgICByZXR1cm4gKHQpID0+IHsgcmV0dXJuIGFyYyhpKHQpKSB9XG4gICAgfSAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgICIsImltcG9ydCB7IENJUkNMRV9DT0xPUlMsIExBQkVMU30gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgcGllTGVnZW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IG1hc3Rlcl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgbWFzdGVyX2xpc3QuY2xhc3NMaXN0LmFkZCgnbWFzdGVyLWxpc3QnKVxuXG4gICAgY29uc3QgbGVmdF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHRleHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCByaWdodF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgbGVmdF9saXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnQtbGlzdCcpICBcbiAgICB0ZXh0X2xpc3QuY2xhc3NMaXN0LmFkZCgndGV4dC1saXN0JykgIFxuICAgIHJpZ2h0X2xpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHQtbGlzdCcpIFxuXG4gICAgZm9yIChsZXQgaSA9IExBQkVMUy5sZW5ndGggLSAxIDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxlZnRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCB0ZXh0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgcmlnaHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIGxlZnRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdsZWZ0LWJveCcpXG4gICAgICAgIGxlZnRfYm94LmlkID0gKCdsZWZ0LWJveC0nICsgaSlcbiAgICAgICAgbGVmdF9ib3guc3R5bGUuY29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgcmlnaHRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdyaWdodC1ib3gnKVxuICAgICAgICByaWdodF9ib3guaWQgPSAoJ3JpZ2h0LWJveC0nICsgaSlcbiAgICAgICAgcmlnaHRfYm94LnN0eWxlLmNvbG9yID0gQ0lSQ0xFX0NPTE9SU1tpXVxuXG4gICAgICAgIHRleHRfYm94LmNsYXNzTGlzdC5hZGQoJ3RleHQtYm94JylcbiAgICAgICAgdGV4dF9ib3guaW5uZXJIVE1MID0gTEFCRUxTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBDSVJDTEVfQ09MT1JTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgXCIgKyBDSVJDTEVfQ09MT1JTW2ldXG5cbiAgICAgICAgbGVmdF9saXN0LmFwcGVuZENoaWxkKGxlZnRfYm94KVxuICAgICAgICB0ZXh0X2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9ib3gpXG4gICAgICAgIHJpZ2h0X2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfYm94KVxuICAgIH1cblxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKGxlZnRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfbGlzdClcbiAgICByZXR1cm4gbWFzdGVyX2xpc3Rcbn1cblxuY29uc3Qgc3VibGlzdHMgPSAobGFiZWwsIGNvbG9yKSA9PiB7XG4gICAgY29uc3QgbGlzdHMgPSBbXVxuXG5cbiAgICBsZXN0bGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0bGlzdCcpXG4gICAgdGV4dGxpc3QuY2xhc3NMaXN0LmFkZCgndGV4dGxpc3QnKVxuICAgIHJpZ2h0bGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodGxpc3QnKVxuXG4gICAgY29uc3QgbGVmdEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCByaWdodEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG5cbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsZWZ0Qm94KVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGkpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChyaWdodEJveClcbiAgICByZXR1cm4gc3VibGlzdFxufSIsImltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgVE9QX0xFVkVMID0gWydUMDAnLCAnVDAxJywgJ1RBMScsICdUQTMnLCAnVEE0JywgJ1RBNSddXG5jb25zdCBTVEFURV9OQU1FUyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggQ2Fyb2xpbmEnLCAnTm9ydGggRGFrb3RhJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ11cblxuLy8gZXhwb3J0IGNvbnN0IHNlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcblxuLy8gICAgIC8vIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpICAvLyByZXZpc2l0IGlmIHRpbWUgdG8gbWFrZSBjdXN0b20gc2VsZWN0XG4vLyAgICAgLy8gY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luaXRpYWwtY29udGFpbmVyJylcblxuLy8gICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIilcbi8vICAgICBzZWxlY3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuXG4vLyAgICAgY29uc3Qgc3RhdGVTZWxlY3RvciA9IGUgPT4ge1xuLy8gICAgICAgICBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4vLyAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbi8vICAgICAgICAgc3ZnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3ZnKVxuLy8gICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgVE9QX0xFVkVMLCBwaWVfbnVtKVxuXG4vLyAgICAgICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gXCItbGVmdFwiIDogXCItcmlnaHRcIlxuLy8gICAgICAgICAvLyBjb25zdCBoMiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzdGF0ZVwiICsgc2lkZSlbMF1cbi8vICAgICAgICAgLy8gaDIuaW5uZXJIVE1MID0gc3RhdGVcbi8vICAgICB9XG5cbi8vICAgICBTVEFURV9OQU1FUy5mb3JFYWNoKHN0YXRlID0+IHtcbi8vICAgICAgICAgY29uc3QgZGVmYXVsdF9zdGF0ZSA9IHBpZV9udW0gPT09IDEgPyBTVEFURV9OQU1FU1swXSA6IFNUQVRFX05BTUVTW1NUQVRFX05BTUVTLmxlbmd0aCAtIDFdXG4vLyAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcbi8vICAgICAgICAgaWYgKHN0YXRlID09PSBkZWZhdWx0X3N0YXRlKSB7XG4vLyAgICAgICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgdHJ1ZSlcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBvcHRpb24uaW5uZXJIVE1MID0gc3RhdGVcbi8vICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHN0YXRlKVxuLy8gICAgICAgICAvLyBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuLy8gICAgICAgICAvLyBvcHRpb24uc2V0QXR0cmlidXRlKFwib25jbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbi8vICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbilcbi8vICAgICB9KVxuLy8gICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHN0YXRlU2VsZWN0b3IpXG4vLyAgICAgLy8gY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdClcbi8vICAgICAvLyByZXR1cm4gY29udGFpbmVyXG4vLyAgICAgcmV0dXJuIHNlbGVjdFxuLy8gfVxuXG4vLyBjb25zdCBwaGFzZU91dCA9IChub2RlKSA9PiB7XG5cbi8vICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbi8vIH1cblxuZXhwb3J0IGNvbnN0IHN0YXRlX3NlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcbiBcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcInNlbGVjdC13cmFwcGVyLVwiICsgcGllX251bSlcbiAgICB3cmFwcGVyLmlkID0gXCJzZWxlY3Qtd3JhcHBlci1cIiArIHBpZV9udW1cblxuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgc2VsZWN0LmlubmVySFRNTCA9IHBpZV9udW0gPT09IDEgPyAnQWxhYmFtYScgOiAnV3lvbWluZydcbiAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwic2VsZWN0LVwiICsgcGllX251bSlcbiAgICBzZWxlY3QuaWQgPSBcInNlbGVjdC1cIiArIHBpZV9udW1cblxuICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpXG4gICAgfSlcbiAgICBcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSAgLy8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHNvIHRoYXQgaWYgSSBjbGljayBhbnl3aGVyZSBlbHNlIHRoZSBsaXN0IGRpc2FwcGVhcnNcbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICB9KVxuICAgIFxuICAgIGNvbnN0IHN0YXRlU2VsZWN0b3IgPSBzdGF0ZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdC1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzZWxlY3QuaW5uZXJUZXh0ID0gc3RhdGVcbiAgICAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIHN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZylcbiAgICAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RhdGVfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ3N0YXRlLWxpc3QtJyArIHBpZV9udW0pXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIHN0YXRlX2xpc3QuaWQgPSAnc3RhdGUtbGlzdC0nICsgcGllX251bVxuICAgIFxuICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZV9saXN0X2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmlubmVySFRNTCA9IHN0YXRlXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzdGF0ZSlcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbiAgICAgICAgc3RhdGVfbGlzdC5hcHBlbmRDaGlsZChzdGF0ZV9saXN0X2l0ZW0pXG4gICAgfSlcbiAgICBcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNlbGVjdClcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHN0YXRlX2xpc3QpXG4gICAgXG4gICAgcmV0dXJuIHdyYXBwZXJcbn1cblxuLy8gY29uc3QgcGhhc2VPdXQgPSAobm9kZSkgPT4ge1xuXG4vLyAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4vLyB9IiwiXG5pbXBvcnQgeyBQaWVDaGFydEdlbmVyYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgcGllTGVnZW5kIH0gZnJvbSAnLi9jb21wb25lbnRzL3BpZV9sZWdlbmQnXG5pbXBvcnQgeyBzdGF0ZV9zZWxlY3RvciwgVE9QX0xFVkVMIH0gZnJvbSAnLi9jb21wb25lbnRzL3N0YXRlX3NlbGVjdG9yJ1xuaW1wb3J0IHsgYnVkZ2V0Q2lyY2xlIH0gZnJvbSAnLi9jb21wb25lbnRzL2hlbHBlcl9mdW5jdGlvbnMnXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJ1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgXG4gICAgLy8gUENHIC0+IGNzdlBhdGgsIHNlY3RvciwgYW1vdXQsIGxvY2F0aW9uLCBtdWx0aXBsaWVyLCBza2lwXG4gICAgXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKVxuICAgIC8vIGNvbnN0IHVsID0gcGllTGVnZW5kKClcbiAgICBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3Qgc2VsZWN0XzEgPSBzdGF0ZV9zZWxlY3RvcigxKVxuICAgIGNvbnN0IHNlbGVjdF8yID0gc3RhdGVfc2VsZWN0b3IoMilcbiAgICBjb25zdCBzZWxlY3Rvcl9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VsZWN0b3ItY29udGFpbmVyXCIpWzBdXG4gICAgXG4gICAgY29uc3QgeWVhclNlbGVjdG9yID0geWVhclNlbGVjdG9yXG5cbiAgICBzZWxlY3Rvcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0XzEpXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8yKVxuICAgIHJvb3QuYXBwZW5kQ2hpbGQodWwpXG5cbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIkFsYWJhbWFcIiwgVE9QX0xFVkVMLCAxKVxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKFwiV3lvbWluZ1wiLCBUT1BfTEVWRUwsIDIpXG5cbiAgICBcbn0pXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9