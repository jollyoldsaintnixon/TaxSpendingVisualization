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
exports.state_selector = exports.selector = exports.TOP_LEVEL = undefined;

var _pie_chart_generator = __webpack_require__(/*! ./pie_chart_generator */ "./src/components/pie_chart_generator.js");

var TOP_LEVEL = exports.TOP_LEVEL = ['T00', 'T01', 'TA1', 'TA3', 'TA4', 'TA5'];
var STATE_NAMES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

var selector = exports.selector = function selector(pie_num) {

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

var state_selector = exports.state_selector = function state_selector(pie_num) {

    var wrapper = document.createElement('div');
    wrapper.classList.add("class", "select-wrapper-" + pie_num);
    wrapper.id = "select-wrapper-" + pie_num;

    var select = document.createElement("span");
    select.innerHTML = pie_num === 1 ? 'Alabama' : 'Wyoming';
    select.classList.add("class", "select-" + pie_num);
    select.id = "select-" + pie_num;

    wrapper.addEventListener('click', function (e) {
        document.getElementById('state-list-' + pie_num).classList.toggle('hidden');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZXZlbnRfaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMveWVhcl9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9hcHAuc2NzcyJdLCJuYW1lcyI6WyJzdWJEYXRhIiwiY29udGFpbmVyX2FycmF5IiwicGllX251bSIsImVsZSIsInRheF90eXBlIiwiZGF0YSIsImtleSIsInN1Yl9hcnJheSIsInN1YkFycmF5TG9jYXRvciIsInRheF9zdGFjayIsImtleXMiLCJmb3JFYWNoIiwic3ViX3RheCIsImkiLCJwdXNoIiwiYW1vdW50Iiwid2lkdGgiLCJoZWlnaHQiLCJ0b29sdGlwV2lkdGgiLCJ0b29sdGlwSGVpZ2h0Iiwic3ZnIiwiZDMiLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwic3RhY2siLCJvcmRlciIsInN0YWNrT3JkZXJOb25lIiwib2Zmc2V0Iiwic3RhY2tPZmZzZXROb25lIiwibGF5ZXJzIiwieCIsInNjYWxlQmFuZCIsInJhbmdlIiwicGFkZGluZyIsInkiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsIm1hcCIsIm1heCIsImQiLCJ5MCIsImciLCJzZWxlY3RBbGwiLCJlbnRlciIsInJlY3QiLCJvbiIsInRvb2x0aXAiLCJzdHlsZSIsInhQb3MiLCJtb3VzZSIsInlQb3MiLCJ0ZXh0IiwicGVyY2VudCIsImNzc1N1YkRhdGFEaXNwbGF5IiwicmVtb3ZlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInRvdGFsIiwib2JqIiwicm9vdCIsInVsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImlkIiwibGkiLCJwZXJjZW50X29mX3RvdGFsIiwiYXBwZW5kQ2hpbGQiLCJncm91cFRvdGFsIiwiYXJyYXkiLCJhc3NpZ25Cb3giLCJhcnJheV9vZl9vYmpzIiwic2lkZSIsImJveCIsImRlY2ltYWxzIiwiU3RyaW5nIiwic3BsaXQiLCJpbnRlZ2VycyIsInNsaWNlZCIsInNsaWNlIiwiaW5uZXJIVE1MIiwiZmluZEFtb3VudCIsImpvaW4iLCJidWRnZXRDaXJjbGUiLCJkYXR1bTEiLCJkYXR1bTIiLCJjaXJjbGVEaXYiLCJkaXNwbGF5IiwicnNjYWxlIiwiUGllQ2hhcnRHZW5lcmF0b3IiLCJDT0xPUlMiLCJMQUJFTFMiLCJzdGF0ZSIsImNzdiIsImgxIiwic3BhbiIsImgyIiwiVE9UQUwiLCJUWVBFUyIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInJhZGl1cyIsImNvbG9ycyIsInNjYWxlT3JkaW5hbCIsInNjaGVtZURhcmsyIiwiYXJjIiwib3V0ZXJSYWRpdXMiLCJpbm5lclJhZGl1cyIsInBpZSIsInZhbHVlIiwidGhlbiIsInNhbGVzX3RheGVzIiwibGljZW5zZV90YXhlcyIsImluY29tZV90YXhlcyIsIm90aGVyX3RheGVzIiwiR2VvX05hbWUiLCJpdGVtIiwiQU1PVU5UIiwidGF4X29iaiIsIlRheF9UeXBlIiwiaW5jbHVkZXMiLCJmb3JtYXQiLCJwYXRoIiwidHJhbnNpdGlvbiIsImVhc2UiLCJlYXNlTGluZWFyIiwiZHVyYXRpb24iLCJhdHRyVHdlZW4iLCJwaWVUd2VlbiIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaCIsImVycm9yIiwiYiIsImludGVycG9sYXRlIiwic3RhcnRBbmdsZSIsImVuZEFuZ2xlIiwidCIsInBpZUxlZ2VuZCIsIm1hc3Rlcl9saXN0IiwibGVmdF9saXN0IiwidGV4dF9saXN0IiwicmlnaHRfbGlzdCIsImxlbmd0aCIsImxlZnRfYm94IiwidGV4dF9ib3giLCJyaWdodF9ib3giLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlciIsInN1Ymxpc3RzIiwibGFiZWwiLCJsaXN0cyIsImxlc3RsaXN0IiwidGV4dGxpc3QiLCJyaWdodGxpc3QiLCJsZWZ0Qm94IiwicmlnaHRCb3giLCJzdWJsaXN0IiwiVE9QX0xFVkVMIiwiU1RBVEVfTkFNRVMiLCJzZWxlY3RvciIsInNldEF0dHJpYnV0ZSIsInN0YXRlU2VsZWN0b3IiLCJlIiwidGFyZ2V0IiwiZGVmYXVsdF9zdGF0ZSIsIm9wdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJwaGFzZU91dCIsIm5vZGUiLCJzdGF0ZV9zZWxlY3RvciIsIndyYXBwZXIiLCJ0b2dnbGUiLCJpbm5lclRleHQiLCJzdGF0ZV9saXN0Iiwic3RhdGVfbGlzdF9pdGVtIiwiWUVBUlMiLCJ5ZWFyU2VsZWN0b3IiLCJ5ZWFyIiwieWVhckNob2ljZSIsInN0YXRlMSIsInN0YXRlMiIsInN2ZzEiLCJzdmcyIiwieWVhcl9saXN0X2l0ZW0iLCJ5ZWFyX2xpc3QiLCJzZWxlY3RfMSIsInNlbGVjdF8yIiwic2VsZWN0b3JfY29udGFpbmVyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtR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QUF5Q1ksV0FBV0QsSUFBWCxDQUF6QztBQUNBTyxrQkFBVTFILFdBQVYsQ0FBc0J5SCxjQUF0QjtBQUNILEtBTkQ7QUFPSCxDQTlDTSxDOzs7Ozs7Ozs7Ozs7OztBQ0RQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBdkksU0FBU3NILGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNOztBQUVoRDs7QUFFQSxRQUFNaEgsT0FBT04sU0FBU0MsY0FBVCxDQUF3QixNQUF4QixDQUFiO0FBQ0E7QUFDQSxRQUFNTSxLQUFLLDRCQUFYO0FBQ0EsUUFBTWtJLFdBQVcsb0NBQWUsQ0FBZixDQUFqQjtBQUNBLFFBQU1DLFdBQVcsb0NBQWUsQ0FBZixDQUFqQjtBQUNBLFFBQU1DLHFCQUFxQjNJLFNBQVM0SSxzQkFBVCxDQUFnQyxvQkFBaEMsRUFBc0QsQ0FBdEQsQ0FBM0I7O0FBRUEsUUFBTVosZUFBZUEsWUFBckI7O0FBRUFXLHVCQUFtQjdILFdBQW5CLENBQStCMkgsUUFBL0I7QUFDQUUsdUJBQW1CN0gsV0FBbkIsQ0FBK0I0SCxRQUEvQjtBQUNBcEksU0FBS1EsV0FBTCxDQUFpQlAsRUFBakI7O0FBRUEsZ0RBQWtCLFNBQWxCLEVBQTZCc0cseUJBQTdCLEVBQXdDLENBQXhDO0FBQ0EsZ0RBQWtCLFNBQWxCLEVBQTZCQSx5QkFBN0IsRUFBd0MsQ0FBeEM7QUFDSCxDQW5CRCxFOzs7Ozs7Ozs7OztBQ1BBLHVDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gY29udGFpbmVyX2FycmF5LnB1c2goc2FsZXNfdGF4ZXMpXG4vLyBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuLy8gY29udGFpbmVyX2FycmF5LnB1c2goaW5jb21lX3RheGVzKVxuLy8gY29udGFpbmVyX2FycmF5LnB1c2gob3RoZXJfdGF4ZXMpXG5cbmV4cG9ydCBjb25zdCBzdWJEYXRhID0gKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkgPT4ge1xuICAgIC8vIGEgbG90IG9mIHRoaXMgY29kZSB3YXMgbGVhcm5lZCBmcm9tIE1pY2hhZWwgU3RhbmFsYW5kJ3MgXCJTdGFja2VkIGJhciBjaGFydCB3aXRoIHRvb2x0aXBzXCIgdHV0b3JpYWwgYXQgaHR0cDovL2JsLm9ja3Mub3JnL21zdGFuYWxhbmQvNjEwMDcxM1xuICAgIHJldHVybiAoZWxlKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YXhfdHlwZSA9IGVsZS5kYXRhLmtleVxuXG4gICAgICAgIGNvbnN0IHN1Yl9hcnJheSA9IHN1YkFycmF5TG9jYXRvcih0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KVxuXG4gICAgICAgIC8vIHNldHRpbmcgdXAgdGhlIHRheCBzdGFjayB0byBjb21wbHkgd2l0aCBkMyB2NVxuICAgICAgICBsZXQgdGF4X3N0YWNrID0geyBcbiAgICAgICAgICAgIHRheF90eXBlOiB0YXhfdHlwZSxcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXR0aW5nIHVwIGtleXNcbiAgICAgICAgbGV0IGtleXMgPSBbXVxuICAgICAgICBzdWJfYXJyYXkuZm9yRWFjaCgoc3ViX3RheCwgaSkgPT4ge1xuICAgICAgICAgICAga2V5cy5wdXNoKHN1Yl90YXgua2V5KVxuICAgICAgICAgICAgdGF4X3N0YWNrW3N1Yl90YXgua2V5XSA9IHN1Yl90YXguYW1vdW50XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSA5MCAgLy8gc2V0dGluZyB0aGUgZGltZW5zaW9ucyB0byBjb3JyZXNwb25kIHRvIHRoZSBwaWUgY2hhcnRzJ1xuICAgICAgICBjb25zdCBoZWlnaHQgPSA2MDBcblxuICAgICAgICBjb25zdCB0b29sdGlwV2lkdGggPSAxMjAgLy8gd2lsbCBhbHRlciB0aGVzZSBhcyBuZWVkZWRcbiAgICAgICAgY29uc3QgdG9vbHRpcEhlaWdodCA9IDQwIFxuXG4gICAgICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIm1haW5cIikuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKS5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgICAgIC5hcHBlbmQoXCJnXCIpXG5cbiAgICAgICAgLy8gc2V0IHRoZSBsYXllcnMgb2YgdGhlIHN0YWNrZWQgYmFyXG4gICAgICAgIC8vIGNvbnN0IGxheWVycyA9IGQzLnN0YWNrKCkoW3RheF90eXBlXS5tYXAodGF4ID0+IHsgIC8vIHNob3VsZCB1bHRpbWF0ZWx5IGp1c3QgYmUgdGhlIG9uZSBsYXllclxuICAgICAgICAvLyAgICAgcmV0dXJuIHN1Yl9hcnJheS5tYXAoZCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHsgeDogZC5rZXksIHk6IGQuYW1vdW50LCBwZXJjZW50OiBkLnBlcmNlbnQgfVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gfSkpXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZDMuc3RhY2soKVxuICAgICAgICAgICAgLmtleXMoa2V5cylcbiAgICAgICAgICAgIC5vcmRlcihkMy5zdGFja09yZGVyTm9uZSlcbiAgICAgICAgICAgIC5vZmZzZXQoZDMuc3RhY2tPZmZzZXROb25lKVxuXG4gICAgICAgIGNvbnN0IGxheWVycyA9IHN0YWNrKHN1Yl9hcnJheSlcblxuICAgICAgICAvLyBjb25zdCB4ID0gZDMuc2NhbGVPcmRpbmFsKClcbiAgICAgICAgLy8gICAgIC5kb21haW4obGF5ZXJzWzBdLm1hcChkID0+IGQueCkpXG4gICAgICAgIC8vICAgICAvLyAucmFuZ2UoWzEwLCB3aWR0aF0sIDApICAvLyBtYXkgYmUgYSBxdWlja2VyIHdheSB0byBkbyB0aGlzIGFzIHRoZXJlIGlzIG9ubHkgb25lIGJhclxuICAgICAgICAvLyAgICAgLnJhbmdlKFt3aWR0aF0pXG4gICAgICAgIGNvbnN0IHggPSBkMy5zY2FsZUJhbmQoKVxuICAgICAgICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXG4gICAgICAgICAgICAucGFkZGluZygwLjEpXG5cbiAgICAgICAgY29uc3QgeSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4obGF5ZXJzWzBdLm1hcChkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDMubWF4KGQsIGQgPT4gZC55MCArIGQueSkgIC8vIHRoZSBpbmNyZW1lbnQgdXAgdG8gdGhlIHRvdGFsXG4gICAgICAgICAgICB9KSkucmFuZ2UoW2hlaWdodCwgMF0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuc3ViLXRheGVzXCIpICAvLyBubyBnIGF0IHRoaXMgcG9pbnQsIGJ1dCB0aGV5IHdpbGwgaGF2ZSB0aGlzIGNsYXNzXG4gICAgICAgICAgICAuZGF0YShsYXllcnMpLmVudGVyKCkgIC8vIG5vdyB0aGVyZSB3aWxsIGJlIGEgZyBmb3IgZXZlcnkgb2JqIGluIHN1Yl9hcnJheS4gIHNob3VsZCBiZSBqdXN0IG9uZSBnXG4gICAgICAgICAgICAuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgXCJzdWItdGF4ZXNcIikgIFxuICAgICAgICAgICAgXG4gICAgICAgIGNvbnN0IHJlY3QgPSBnLnNlbGVjdEFsbChcInJlY3RcIikgIC8vIG1ha2luZyBlYWNoIG9iaiBvZiB0aGUgY29ycmVzcG9uZCB0byBhIHJlY3Qgd2l0aGluIHRoZSBnXG4gICAgICAgICAgICAuZGF0YShkID0+IGQpIC8vIHB1bGxpbmcgb3V0IGVhY2ggaW5kaXZpZHVhbCBvYmpcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB4KGQueCkpICAvLyBwYXNzaW5nIGVhY2ggb2JqJ3MgeCB2YWx1ZSB0byB0aGUgZDMgeCBmdW5jdGlvbiBkZWZpbmVkIGFib3ZlXG4gICAgICAgICAgICAuYXR0cigneScsIGQgPT4geShkLnkgKyBkLnkwKSkgIC8vIHkwIGlzIHRoZSBoZWlnaHQgd2hlcmUgZWFjaCBzZWdtZW50IGluIHRoZSBzdGFjayBzdGFydHNcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHgucmFuZ2UoKSkgIC8vIHByb2JhYmx5IGNhbiBoYXJkIGNvZGUsIHNpbmNlIG9ubHkgb25lIGJhclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGQgPT4geShkLnkwKSAtIHkoZC55MCArIGQueSkpICAvLyBoZWlnaHQgaXMgc2V0IHRvIHRoZSBzdGFydGluZyBwb2ludCBwbHVzIHRoZSBoZWlnaHQsIGFuZCBhbGwgdGhhdCBzdWJ0cmFjdGVkIGZyb20gdGhlIHN0YXJ0aW5nIHBvaW50IGR1ZSB0byB5IHZhbHVlcyBiZWdpbmluZyBhdCB0b3Agb2Ygc2NyZWVuXG4gICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsICgpID0+IHRvb2x0aXAuc3R5bGUoXCJkaXNwbGF5XCIsIHRydWUpKSAgLy8gd2FudCB0aGUgaW5mbyBib3ggdG8gc3dpdGNoIGJldHdlZW4gdmlzaWJsZSBhbmQgaW5pdmlzIGJhc2VkIG9uIG1vdXNlb3ZlclxuICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsICgpID0+IHRvb2x0aXAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKSlcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlJywgZCA9PiB7ICAvLyB0aGlzIGlzIGdvaW5nIHRvIGJlIGEgc3dlZXQgZWZmZWN0IVxuICAgICAgICAgICAgICAgIGNvbnN0IHhQb3MgPSBkMy5tb3VzZSh0aGlzKVswXSAtICh0b29sdGlwV2lkdGggLyAyKSAvLyB0aGlzWzBdIGNvcnJlc3BvbmRzIHRvIG1vdXNlJ3MgeCBwb3MsIGFuZCBwdXNoaW5nIGl0IGxlZnQgYnkgaGFsZiBvZiB0aGUgdG9vbHRpcCdzIHdpZHRoIGVuc3VyZSBpdCBpcyBjZW50ZXJlZFxuICAgICAgICAgICAgICAgIGNvbnN0IHlQb3MgPSBkMy5tb3VzZSh0aGlzKVsxXSAtIDI1IC8vIHB1dHMgdGhlIHRvb2x0aXAgdXAgYSBiaXQgYWJvdmUgdGhlIGN1cnNvclxuICAgICAgICAgICAgICAgIHRvb2x0aXAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHhQb3MgKyAnLCcgKyB5UG9zICsgJyknKVxuICAgICAgICAgICAgICAgIHRvb2x0aXAuc2VsZWN0KCd0ZXh0JykudGV4dChkLnBlcmNlbnQpIC8vIHNob3dzIHRoZSBwZXJjZW50ICBcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgdG9vbHRpcCA9IHN2Zy5hcHBlbmQoJ2cnKSAvLyBzZXR0aW5nIHVwIHRoaXMgc3dlZXQgdG9vbHRpcC4gRXhjaXRpbmchXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnc3ViLWRhdGEtdG9vbHRpcCB0b29sdGlwJykuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpIC8vIHN0YXJ0cyBpbnZpc2libGVcbiAgICAgICAgICAgIC8vIGFkZGluZyB0aGUgZGltZW5zaW9ucyBvZiB0aGUgYm94XG4gICAgICAgICAgICAuYXBwZW5kKCdyZWN0JykuYXR0cignd2lkdGgnLCB0b29sdGlwV2lkdGgpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdG9vbHRpcEhlaWdodCkuYXR0cignZmlsbCcsICd3aGl0ZScpLnN0eWxlKCdvcGFjaXR5JywgMC41KSAvLyBtYWtpbmcgaXQgcGFydGlhbGx5IHNlZS10aHJvdWdoXG4gICAgICAgICAgICAvLyBhZGRpbmcgdGhlIHRleHQgY29udGVudFxuICAgICAgICAgICAgLmFwcGVuZCgndGV4dCcpLmF0dHIoJ3gnLCAxNSlcbiAgICAgICAgICAgIC5hdHRyKCdkeScsICcuOGVtJykuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgfVxuICAgIFxufVxuXG5jb25zdCBzdWJBcnJheUxvY2F0b3IgPSAodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSkgPT4geyAgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBmaW5kaW5nIHRoZSByaWdodCBzdWIgYXJyYXkuIEEgYml0IGhhcmQtY29kZWQuXG4gICAgc3dpdGNoICh0YXhfdHlwZSkge1xuICAgICAgICBjYXNlIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCI6XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzBdXG4gICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6IFxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsxXVxuICAgICAgICBjYXNlIFwiSW5jb21lIFRheGVzXCI6IFxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVsyXVxuICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjogXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzNdXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgY3NzU3ViRGF0YURpc3BsYXkgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSA9PiB7XG5cbiAgICBjb25zdCB3aWR0aCA9IDkwICAvLyBzZXR0aW5nIHRoZSBkaW1lbnNpb25zIHRvIGNvcnJlc3BvbmQgdG8gdGhlIHBpZSBjaGFydHMnXG4gICAgY29uc3QgaGVpZ2h0ID0gNjAwXG5cbiAgICByZXR1cm4gKGVsZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ViLWRhdGEtbGlzdC1cIiArIHBpZV9udW0pXG4gICAgICAgIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YXhfdHlwZSA9IGVsZS5kYXRhLmtleVxuICAgICAgICBjb25zdCBzdWJfYXJyYXkgPSBzdWJBcnJheUxvY2F0b3IodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSkgLy8gZ2V0IHJpZ2h0IHN1Yl9hcnJheVxuICAgICAgICAvLyBjb25zdCBncm91cFRvdGFsID0gZ3JvdXBUb3RhbChzdWJfYXJyYXkpIC8vIG5vdCBzdXJlIHdoeSB0aGlzIGlzIG5vdCBpbnZva2luZyB0aGUgZnVuY2l0b24gYmVsb3dcbiAgICAgICAgbGV0IHRvdGFsID0gMFxuICAgICAgICBzdWJfYXJyYXkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgdG90YWwgKz0gb2JqLmFtb3VudFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSAvLyBncmFiIHRoZSByb290IHRvIGF0dGFjaCBsYXRlclxuXG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpIC8vIHNldCB1cCB1bCBjb250YWluZXJcbiAgICAgICAgdWwuY2xhc3NMaXN0LmFkZChcInN1Yi1kYXRhLWxpc3QtXCIgKyBwaWVfbnVtKVxuICAgICAgICB1bC5pZCA9IChcInN1Yi1kYXRhLWxpc3QtXCIgKyBwaWVfbnVtKVxuXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKHN1Yl90YXggPT4ge1xuICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICBsaS5zdHlsZS5oZWlnaHQgPSAoc3ViX3RheC5wZXJjZW50X29mX3RvdGFsICogNikgKyAncHgnXG4gICAgICAgICAgICB1bC5hcHBlbmRDaGlsZChsaSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZCh1bClcbiAgICB9XG59XG5cbmNvbnN0IGdyb3VwVG90YWwgPSBhcnJheSA9PiB7XG4gICAgbGV0IHRvdGFsID0gMFxuICAgIGFycmF5LmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgdG90YWwgKz0gb2JqLmFtb3VudFxuICAgIH0pO1xuICAgIHJldHVybiB0b3RhbFxufSIsIlxuXG5leHBvcnQgY29uc3QgYXNzaWduQm94ID0gKGFycmF5X29mX29ianMsIHBpZV9udW0pID0+IHtcbiAgICBjb25zdCBzaWRlID0gcGllX251bSA9PT0gMSA/ICdsZWZ0LWJveC0nIDogJ3JpZ2h0LWJveC0nXG4gICAgYXJyYXlfb2Zfb2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBpID0gNDtcbiAgICAgICAgc3dpdGNoIChvYmoua2V5KSB7XG4gICAgICAgICAgICBjYXNlIFwiT3RoZXIgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMCBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJJbmNvbWUgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMSBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJMaWNlbnNlIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDIgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiUHJvcGVydHkgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMyBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaWRlICsgaSlcbiAgICAgICAgY29uc3QgZGVjaW1hbHMgPSBTdHJpbmcob2JqLnBlcmNlbnQpLnNwbGl0KCcuJylbMV1cbiAgICAgICAgY29uc3QgaW50ZWdlcnMgPSBTdHJpbmcob2JqLnBlcmNlbnQpLnNwbGl0KCcuJylbMF1cbiAgICAgICAgY29uc3Qgc2xpY2VkID0gb2JqLnBlcmNlbnQgPyBpbnRlZ2VycyArICcuJyArIGRlY2ltYWxzLnNsaWNlKDAsIDIpIDogMFxuICAgICAgICBib3guaW5uZXJIVE1MID0gc2xpY2VkICsgJyUnXG4gICAgfSk7XG59XG5cbi8vIGQuQU1PVU5UID09PSAnWCcgPyAwIDogZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDAsXG5leHBvcnQgY29uc3QgZmluZEFtb3VudCA9IChhbW91bnQpID0+IHtcbiAgICByZXR1cm4gYW1vdW50ID09PSAnWCcgPyAwIDogYW1vdW50LnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwXG59XG5cbi8vIGV4cG9ydCBjb25zdCBzdWJEYXRhUHVzaGVyID0gKGl0ZW0pID0+IHtcbi8vICAgICBpZiAoaXRlbSAhPSBcIlQwMFwiICYmIGl0ZW0gIT0gXCJUMDFcIikge1xuLy8gICAgICAgICBzd2l0Y2ggKGl0ZW0uc2xpY2UoMCwgMikpIHtcbi8vICAgICAgICAgICAgIGNhc2UgKFwiVDBcIiB8fCBcIlQxXCIpOlxuLy8gICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2goe1xuLy8gICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4vLyAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4vLyAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnQ6IChmaW5kQW1vdW50KGQuQU1PVU5UKSAvIFRPVEFMKSAqIDEwMFxuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgXG4vLyAgICAgICAgICAgICBjYXNlIFwiVDJcIjpcbi8vICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2goe1xuICAgIFxuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9XG5cbmV4cG9ydCBjb25zdCBidWRnZXRDaXJjbGUgPSAoZGF0dW0xKSA9PiB7XG4gICAgLy8gYmFzZWQgb24gTWF0dGhldyBNY0tlbm5hJ3MgZXhhbXBsZSBhdCBodHRwOi8vYmwub2Nrcy5vcmcvbXBtY2tlbm5hOC9yYXcvNTY2NTA5ZGQzZDlhMDhlNWY5YjIvXG4gICAgLy8gZGVidWdnZXJcbiAgICByZXR1cm4gZGF0dW0yID0+IHtcbiAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgZGF0YSA9IFtkYXR1bTEsIGRhdHVtMl1cblxuICAgICAgICBjb25zdCBoZWlnaHQgPSAxMDBcbiAgICAgICAgY29uc3Qgd2lkdGggPSAxMDAwXG4gICAgXG4gICAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpXG4gICAgICAgIGNvbnN0IGNpcmNsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgY2lyY2xlRGl2LmNsYXNzTGlzdC5hZGQoXCJjaXJjbGUtY29udGFpbmVyXCIpXG4gICAgICAgIGNpcmNsZURpdi5pZCA9IFwiY2lyY2xlLWNvbnRhaW5lclwiXG4gICAgICAgIGNpcmNsZURpdi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG4gICAgICAgIGNpcmNsZURpdi5zdHlsZS5oZWlnaHQgPSBoZWlnaHRcbiAgICAgICAgY2lyY2xlRGl2LnN0eWxlLndpZHRoID0gd2lkdGhcbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZChjaXJjbGVEaXYpXG4gICAgXG4gICAgICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdCgnI2NpcmNsZS1jb250YWluZXInKS5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZS1zdmcnKTtcbiAgICBcbiAgICAgICAgY29uc3QgcnNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbMCwgKGQzLm1heChkYXRhKSkgXSlcbiAgICAgICAgICAgIC5yYW5nZShbMywgMjBdKVxuICAgIFxuICAgICAgICBzdmcuc2VsZWN0QWxsKCcuY2lyY2xlcycpLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcnNjYWxlKGQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZXMnKS5hdHRyKCdjeScsIGhlaWdodCAvIDIpXG4gICAgICAgICAgICAuYXR0cignY3gnLCAoZCwgaSkgPT4gMjAgKyA0MCAqIGkpXG4gICAgfVxufSIsIi8vIEEgbG90IG9mIHRoaXMgY29kZSB3YXMgYmFzZWQgaGVhdmlseSBvZmYgb2YgS2FydGhpayBUaG90YSdzIHlvdXR1YmUgdHV0b3JpYWwgXCJJbnRyb2R1Y3Rpb24gdG8gZDMuanMgPSBQaWUgQ2hhcnQgYW5kIERvbnV0IENoYXJ0XCJcbi8vIFRoZSBsZWdlbmQgY29kZSB3YXMgZnJvbSBDcnlwdGVycyBJbmZvdGVjaCdzIHlvdXR1YmUgdHV0b3JpYWwgXCJQaWUgQ2hhcnQgdXNpbmcgRDMuanNcIlxuXG5pbXBvcnQgeyBhc3NpZ25Cb3gsIGZpbmRBbW91bnQsIGJ1ZGdldENpcmNsZSB9IGZyb20gJy4vaGVscGVyX2Z1bmN0aW9ucydcbmltcG9ydCB7IHN1YkRhdGEsIGNzc1N1YkRhdGFEaXNwbGF5IH0gZnJvbSAnLi9ldmVudF9oYW5kbGVycydcblxuZXhwb3J0IGNvbnN0IENPTE9SUyA9IFtcIiNhNjc1MWVcIiwgXCIjZTdhYjA0XCIsIFwiIzY2YTUxZVwiLCBcIiM3NDcwYjNcIiwgXCIjZTgyYjhhXCJdXG4vLyBleHBvcnQgY29uc3QgTEFCRUxTID0gW1wiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiT3RoZXIgVGF4ZXNcIl1cbmV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJPdGhlciBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIFRheGVzXCJdXG4vLyBleHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3IoY3N2UGF0aCwgc2VjdG9yLCBhbW91bnQsIHN0YXRlLCBtdWx0aXBsaWVyID0gMSwgc2tpcCA9IDEpIHtcbmV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgdGF4X3R5cGUsIHBpZV9udW0sIGNzdiA9IFwiLi9zcmMvYXNzZXRzL2RhdGEvRlkyMDE4LVNUQy1EZXRhaWxlZC1UYWJsZS5jc3ZcIikge1xuXG4gICAgLy8gY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtXCIgKyBwaWVfbnVtKVxuICAgIC8vIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG5cbiAgICAvLyBjb25zdCByZW1vdmUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXRhaWxzLVwiICsgcGllX251bSlcbiAgICAvLyByZW1vdmUyID8gcmVtb3ZlMi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZTIpIDogbnVsbFxuXG4gICAgY29uc3QgaDEgPSBkMy5zZWxlY3QoJyN0b3RhbHMtaGVhZGVyLScgKyBwaWVfbnVtKVxuICAgIGNvbnN0IHNwYW4gPSBkMy5zZWxlY3QoJyN0b3RhbHMtc3Bhbi0nICsgcGllX251bSlcbiAgICBjb25zdCBoMiA9IGQzLnNlbGVjdChcIiNkZXRhaWxzLVwiICsgcGllX251bSlcblxuXG4gICAgbGV0IFRPVEFMID0gMDtcbiAgICBsZXQgVFlQRVMgPSBbXVxuICAgIC8vIENJUkNMRSBUSU1FIEJBQllcbiAgICAvLyBtYXJnaW4gYW5kIHJhZGl1c1xuICAgIGNvbnN0IG1hcmdpbiA9IHsgdG9wOiAyMDAsIHJpZ2h0OiAyMDAsIGJvdHRvbTogMjAwLCBsZWZ0OiAyMDAgfSxcbiAgICAgICAgaGVpZ2h0ID0gMTAwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tLFxuICAgICAgICB3aWR0aCA9IDEwMDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCxcbiAgICAgICAgcmFkaXVzID0gd2lkdGggLyAyO1xuXG5cblxuICAgIGNvbnN0IGNvbG9ycyA9IGQzLnNjYWxlT3JkaW5hbChkMy5zY2hlbWVEYXJrMik7XG5cbiAgICAvLyBhcmMgZ2VuZXJhdG9yXG4gICAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDEwKVxuICAgICAgICAvLyAuaW5uZXJSYWRpdXMoMCk7IC8vIGZvciBjaXJjbGVcbiAgICAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDEwMCkgLy8gZm9yIGRvbnV0XG5cbiAgICAvLyBjb25zdCBsYWJsZUFyYyA9IGQzLmFyYygpXG4gICAgLy8gICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSA1MClcbiAgICAvLyAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDUwKTtcblxuICAgIC8vIHBpZSBnZW5lcmF0b3JcbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgICAvLyAuc29ydChudWxsKVxuICAgICAgICAudmFsdWUoZCA9PiBkLmFtb3VudCk7XG5cbiAgICAvLyBkZWZpbmUgc3ZnIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcIi5waWUtXCIgKyBwaWVfbnVtKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKVxuXG4gICAgLy8gaW1wb3J0IGRhdGFcbiAgICBkMy5jc3YoY3N2KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgYXJyYXlzIHRoYXQgd2lsbCBjb250YWluIHRoZSBzdWIgbGV2ZWwgdGF4IGRhdGFcbiAgICAgICAgbGV0IHNhbGVzX3RheGVzID0gW11cbiAgICAgICAgbGV0IGxpY2Vuc2VfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgaW5jb21lX3RheGVzID0gW11cbiAgICAgICAgbGV0IG90aGVyX3RheGVzID0gW11cbiAgICAgICAgLy8gbGV0IHNhbGVzX3RheF9vYmogPSB7IHRheF9ncm91cDogTEFCRUxTWzRdIH1cbiAgICAgICAgLy8gcGFyc2UgdGhlIGNzdlxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGQuR2VvX05hbWUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSA9PT0gXCJUMDBcIikge1xuICAgICAgICAgICAgICAgICAgICBUT1RBTCA9IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9IFwiVDAwXCIgJiYgZC5pdGVtICE9IFwiVDAxXCIpIHsgIC8vIGRvbid0IHdhbnQgdG8gY2F0Y2ggVG90YWwgb3IgUHJvcGVydHkgVGF4ZXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRheF9vYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudF9vZl90b3RhbDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkLml0ZW0uc2xpY2UoMCwyKSkgeyAvLyBmaWxsIHVwIHN1YiBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iaikgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzYWxlc190YXhfb2JqW2QuVGF4X1R5cGVdID0gZmluZEFtb3VudChkLkFNT1VOVClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUMlwiOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29tZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcl90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGF4X3R5cGUuaW5jbHVkZXMoZC5pdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5pdGVtICE9ICdUMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUWVBFUy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGQuVGF4X1R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZC5rZXkgPSBkLlRheF9UeXBlO1xuICAgICAgICAgICAgICAgICAgICBkLmFtb3VudCA9IGZpbmRBbW91bnQoZC5BTU9VTlQpO1xuICAgICAgICAgICAgICAgICAgICBkLnBlcmNlbnQgPSAoKGZpbmRBbW91bnQoZC5BTU9VTlQpKSAvIFRPVEFMKSAqIDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250YWluZXJfYXJyYXkgPSBbXSAgLy8gc2V0dGluZyB1cCBjb250YWluZXIgYXJyYXkgZm9yIHBhc3NpbmcgaW50byBjbGljayBoYW5kbGVyXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChsaWNlbnNlX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuICAgICAgICAvLyBzZXQgaDEgYWZ0ZXIgdG90YWwgaGFzIGJlZW4gZGVmaW5lZFxuICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgXCIpXG4gICAgICAgIHNwYW4udGV4dChcIiRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgaDIudGV4dChcIlwiKVxuICAgICAgICAvLyBhdHRlbXB0IGJ1ZGdldENpcmNsZSBjYWxsXG4gICAgICAgIGJ1ZGdldENpcmNsZShUT1RBTClcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwZXJjZW50YWdlcyBpbiB0aGUgY2VudGVyIGJveFxuICAgICAgICBhc3NpZ25Cb3goVFlQRVMsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUoZGF0YSkpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIilcbiAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgKGQsIGkpID0+IGQudmFsdWUgPT09IFRPVEFMID8gXCJub25lXCIgOiBcIm51bGxcIik7ICAvLyBhdHRlbXB0IHRvIHJlbmRlciBoYWxmIHRoZSBjaGFydCBpbnZpc2libGVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgYXJjKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBkID0+IGNvbG9ycyhkLmRhdGEua2V5KSlcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbignZCcsIHBpZVR3ZWVuKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHBhdGgub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIC8vIHdoeSBkb2Vzbid0IHRoaXMgd29yaz9cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gICAgICAgICAgICAgLmR1cmF0aW9uKCc1MCcpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIGRldGVybWluZSBob3cgdG8gZmxpcCB0aGUgcGllc1xuICAgICAgICBpZiAocGllX251bSA9PT0gMikgey8vIGZsaXAgdGhlIHNlY29uZCBwaWVcbiAgICAgICAgICAgIGcuYXR0cihcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVgoLTEpIHRyYW5zbGF0ZSgzMDBweCwgMHB4KSBzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWSgtMSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgZy5vbihcIm1vdXNlb3ZlclwiLCAoZCwgaSkgPT4geyAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZClcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbignNTAnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsICcuODUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcImN1cnNvclwiLCAncG9pbnRlcicpXG4gICAgICAgICAgICB9KVxuICAgICAgICBnLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgIC8vIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE4IHdhcyAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICAvLyBoMi50ZXh0KFwiXCIpXG4gICAgICAgIH0pXG4gICAgICAgIC8vIC5vbihcImNsaWNrXCIsIGNzc1N1YkRhdGFEaXNwbGF5KGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkpO1xuICAgICAgICAgICAgXG4gICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHsgaWYgKGVycm9yKSB0aHJvdyBlcnJvciB9KVxuXG4gICAgY29uc3QgcGllVHdlZW4gPSBiID0+IHtcbiAgICAgICAgYi5pbm5lclJhZGl1cyA9IDA7XG4gICAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZSh7IHN0YXJ0QW5nbGU6IDAsIGVuZEFuZ2xlOiAwIH0sIGIpXG4gICAgICAgIHJldHVybiAodCkgPT4geyByZXR1cm4gYXJjKGkodCkpIH1cbiAgICB9ICAgIFxuXG59XG4iLCJpbXBvcnQgeyBDT0xPUlMsIExBQkVMU30gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgcGllTGVnZW5kID0gKCkgPT4ge1xuICAgIGNvbnN0IG1hc3Rlcl9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG4gICAgbWFzdGVyX2xpc3QuY2xhc3NMaXN0LmFkZCgnbWFzdGVyLWxpc3QnKVxuXG4gICAgY29uc3QgbGVmdF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHRleHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCByaWdodF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgbGVmdF9saXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnQtbGlzdCcpICBcbiAgICB0ZXh0X2xpc3QuY2xhc3NMaXN0LmFkZCgndGV4dC1saXN0JykgIFxuICAgIHJpZ2h0X2xpc3QuY2xhc3NMaXN0LmFkZCgncmlnaHQtbGlzdCcpIFxuXG4gICAgZm9yIChsZXQgaSA9IExBQkVMUy5sZW5ndGggLSAxIDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxlZnRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCB0ZXh0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgcmlnaHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIGxlZnRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdsZWZ0LWJveCcpXG4gICAgICAgIGxlZnRfYm94LmlkID0gKCdsZWZ0LWJveC0nICsgaSlcbiAgICAgICAgbGVmdF9ib3guc3R5bGUuY29sb3IgPSBDT0xPUlNbaV1cblxuICAgICAgICByaWdodF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ3JpZ2h0LWJveCcpXG4gICAgICAgIHJpZ2h0X2JveC5pZCA9ICgncmlnaHQtYm94LScgKyBpKVxuICAgICAgICByaWdodF9ib3guc3R5bGUuY29sb3IgPSBDT0xPUlNbaV1cblxuICAgICAgICB0ZXh0X2JveC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWJveCcpXG4gICAgICAgIHRleHRfYm94LmlubmVySFRNTCA9IExBQkVMU1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gQ09MT1JTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgXCIgKyBDT0xPUlNbaV1cblxuICAgICAgICBsZWZ0X2xpc3QuYXBwZW5kQ2hpbGQobGVmdF9ib3gpXG4gICAgICAgIHRleHRfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2JveClcbiAgICAgICAgcmlnaHRfbGlzdC5hcHBlbmRDaGlsZChyaWdodF9ib3gpXG4gICAgfVxuXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQobGVmdF9saXN0KVxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKHRleHRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZChyaWdodF9saXN0KVxuICAgIHJldHVybiBtYXN0ZXJfbGlzdFxufVxuXG5jb25zdCBzdWJsaXN0cyA9IChsYWJlbCwgY29sb3IpID0+IHtcbiAgICBjb25zdCBsaXN0cyA9IFtdXG5cblxuICAgIGxlc3RsaXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnRsaXN0JylcbiAgICB0ZXh0bGlzdC5jbGFzc0xpc3QuYWRkKCd0ZXh0bGlzdCcpXG4gICAgcmlnaHRsaXN0LmNsYXNzTGlzdC5hZGQoJ3JpZ2h0bGlzdCcpXG5cbiAgICBjb25zdCBsZWZ0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGNvbnN0IHJpZ2h0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG5cblxuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG5cbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKGxlZnRCb3gpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsaSlcbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKHJpZ2h0Qm94KVxuICAgIHJldHVybiBzdWJsaXN0XG59IiwiaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBUT1BfTEVWRUwgPSBbJ1QwMCcsICdUMDEnLCAnVEExJywgJ1RBMycsICdUQTQnLCAnVEE1J11cbmNvbnN0IFNUQVRFX05BTUVTID0gWydBbGFiYW1hJywgJ0FsYXNrYScsICdBcml6b25hJywgJ0Fya2Fuc2FzJywgJ0NhbGlmb3JuaWEnLCAnQ29sb3JhZG8nLCAnQ29ubmVjdGljdXQnLCAnRGVsYXdhcmUnLCAnRmxvcmlkYScsICdHZW9yZ2lhJywgJ0hhd2FpaScsICdJZGFobycsICdJbGxpbm9pcycsICdJbmRpYW5hJywgJ0lvd2EnLCAnS2Fuc2FzJywgJ0tlbnR1Y2t5JywgJ0xvdWlzaWFuYScsICdNYWluZScsICdNYXJ5bGFuZCcsICdNYXNzYWNodXNldHRzJywgJ01pY2hpZ2FuJywgJ01pbm5lc290YScsICdNaXNzaXNzaXBwaScsICdNaXNzb3VyaScsICdNb250YW5hJywgJ05lYnJhc2thJywgJ05ldmFkYScsICdOZXcgSGFtcHNoaXJlJywgJ05ldyBKZXJzZXknLCAnTmV3IE1leGljbycsICdOZXcgWW9yaycsICdOb3J0aCBDYXJvbGluYScsICdOb3J0aCBEYWtvdGEnLCAnT2hpbycsICdPa2xhaG9tYScsICdPcmVnb24nLCAnUGVubnN5bHZhbmlhJywgJ1Job2RlIElzbGFuZCcsICdTb3V0aCBDYXJvbGluYScsICdTb3V0aCBEYWtvdGEnLCAnVGVubmVzc2VlJywgJ1RleGFzJywgJ1V0YWgnLCAnVmVybW9udCcsICdWaXJnaW5pYScsICdXYXNoaW5ndG9uJywgJ1dlc3QgVmlyZ2luaWEnLCAnV2lzY29uc2luJywgJ1d5b21pbmcnXVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuXG4gICAgLy8gY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgIC8vIHJldmlzaXQgaWYgdGltZSB0byBtYWtlIGN1c3RvbSBzZWxlY3RcbiAgICAvLyBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5pdGlhbC1jb250YWluZXInKVxuXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKVxuICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNlbGVjdC1cIiArIHBpZV9udW0pXG5cbiAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gZSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4gICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3Qgc2lkZSA9IHBpZV9udW0gPT09IDEgPyBcIi1sZWZ0XCIgOiBcIi1yaWdodFwiXG4gICAgICAgIC8vIGNvbnN0IGgyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN0YXRlXCIgKyBzaWRlKVswXVxuICAgICAgICAvLyBoMi5pbm5lckhUTUwgPSBzdGF0ZVxuICAgIH1cblxuICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBkZWZhdWx0X3N0YXRlID0gcGllX251bSA9PT0gMSA/IFNUQVRFX05BTUVTWzBdIDogU1RBVEVfTkFNRVNbU1RBVEVfTkFNRVMubGVuZ3RoIC0gMV1cbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuICAgICAgICBpZiAoc3RhdGUgPT09IGRlZmF1bHRfc3RhdGUpIHtcbiAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCB0cnVlKVxuICAgICAgICB9XG4gICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBzdGF0ZVxuICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4gICAgICAgIC8vIG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4gICAgICAgIC8vIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKVxuICAgIH0pXG4gICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc3RhdGVTZWxlY3RvcilcbiAgICAvLyBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KVxuICAgIC8vIHJldHVybiBjb250YWluZXJcbiAgICByZXR1cm4gc2VsZWN0XG59XG5cbmNvbnN0IHBoYXNlT3V0ID0gKG5vZGUpID0+IHtcblxuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxufVxuXG5leHBvcnQgY29uc3Qgc3RhdGVfc2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuIFxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwic2VsZWN0LXdyYXBwZXItXCIgKyBwaWVfbnVtKVxuICAgIHdyYXBwZXIuaWQgPSBcInNlbGVjdC13cmFwcGVyLVwiICsgcGllX251bVxuXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICBzZWxlY3QuaW5uZXJIVE1MID0gcGllX251bSA9PT0gMSA/ICdBbGFiYW1hJyA6ICdXeW9taW5nJ1xuICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuICAgIHNlbGVjdC5pZCA9IFwic2VsZWN0LVwiICsgcGllX251bVxuXG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdGUtbGlzdC0nICsgcGllX251bSkuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICB9KVxuICAgIFxuICAgIGNvbnN0IHN0YXRlU2VsZWN0b3IgPSBzdGF0ZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdC1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzZWxlY3QuaW5uZXJUZXh0ID0gc3RhdGVcbiAgICAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIHN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZylcbiAgICAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RhdGVfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ3N0YXRlLWxpc3QtJyArIHBpZV9udW0pXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIHN0YXRlX2xpc3QuaWQgPSAnc3RhdGUtbGlzdC0nICsgcGllX251bVxuICAgIFxuICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZV9saXN0X2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmlubmVySFRNTCA9IHN0YXRlXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzdGF0ZSlcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbiAgICAgICAgc3RhdGVfbGlzdC5hcHBlbmRDaGlsZChzdGF0ZV9saXN0X2l0ZW0pXG4gICAgfSlcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNlbGVjdClcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHN0YXRlX2xpc3QpXG4gICAgXG4gICAgcmV0dXJuIHdyYXBwZXJcbn1cblxuLy8gY29uc3QgcGhhc2VPdXQgPSAobm9kZSkgPT4ge1xuXG4vLyAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4vLyB9IiwiY29uc3QgWUVBUlMgPSBbMjAxOCwgMjAxN11cblxuZXhwb3J0IGNvbnN0IHllYXJTZWxlY3RvciA9IHllYXIgPT4ge1xuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgc2VsZWN0LmlubmVySFRNTCA9IHllYXJcbiAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwieWVhci1zZWxlY3RcIilcbiAgICBzZWxlY3QuaWQgPSAneWVhci1zZWxlY3QnXG4gICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIFxuICAgIH0pXG5cbiAgICBjb25zdCB5ZWFyQ2hvaWNlID0gKHllYXIgPSAyMDE4KSA9PiB7XG4gICAgICAgIHJldHVybiBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNzdiA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneWVhci1zZWxlY3QnKVxuICAgICAgICAgICAgc2VsZWN0LmlubmVySFRNTCA9IHllYXJcbiAgICAgICAgICAgIC8vIGdldCBzdGF0ZXNcbiAgICAgICAgICAgIHN0YXRlMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3QtMScpLmlubmVySFRNTFxuICAgICAgICAgICAgc3RhdGUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdC0yJykuaW5uZXJIVE1MXG5cbiAgICAgICAgICAgIC8vIG1ha2UgdHdvIG5ldyBwaWVzXG4gICAgICAgICAgICBjb25zdCBzdmcxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctMVwiKVxuICAgICAgICAgICAgY29uc3Qgc3ZnMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLTJcIilcbiAgICAgICAgICAgIHN2ZzEucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcxKVxuICAgICAgICAgICAgc3ZnMi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZzIpXG4gICAgICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZTEsIFRPUF9MRVZFTCwgMSwgY3N2KVxuICAgICAgICAgICAgUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUyLCBUT1BfTEVWRUwsIDIsIGNzdilcblxuXG5cbiAgICAgICAgICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gXCItbGVmdFwiIDogXCItcmlnaHRcIlxuICAgICAgICAgICAgLy8gY29uc3QgaDIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwieWVhclwiICsgc2lkZSlbMF1cbiAgICAgICAgICAgIC8vIGgyLmlubmVySFRNTCA9IHllYXJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCd5ZWFyLWxpc3QnKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICBzdGF0ZV9saXN0LmlkID0gJ3llYXItbGlzdCdcblxuICAgIFlFQVJTLmZvckVhY2goeWVhciA9PiB7XG4gICAgICAgIGNvbnN0IHllYXJfbGlzdF9pdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgYC4vc3JjL2Fzc2V0cy9kYXRhL0ZZJHt5ZWFyfS1TVEMtRGV0YWlsZWQtVGFibGUuY3N2YClcbiAgICAgICAgeWVhcl9saXN0X2l0ZW0uaW5uZXJIVE1MID0geWVhclxuICAgICAgICB5ZWFyX2xpc3RfaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgeWVhckNob2ljZSh5ZWFyKSlcbiAgICAgICAgeWVhcl9saXN0LmFwcGVuZENoaWxkKHllYXJfbGlzdF9pdGVtKVxuICAgIH0pXG59IiwiXG5pbXBvcnQgeyBQaWVDaGFydEdlbmVyYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgcGllTGVnZW5kIH0gZnJvbSAnLi9jb21wb25lbnRzL3BpZV9sZWdlbmQnXG5pbXBvcnQgeyBzdGF0ZV9zZWxlY3RvciwgVE9QX0xFVkVMIH0gZnJvbSAnLi9jb21wb25lbnRzL3N0YXRlX3NlbGVjdG9yJ1xuaW1wb3J0IHsgeWVhclNlbGVjdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3llYXJfc2VsZWN0b3InXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJ1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgXG4gICAgLy8gUENHIC0+IGNzdlBhdGgsIHNlY3RvciwgYW1vdXQsIGxvY2F0aW9uLCBtdWx0aXBsaWVyLCBza2lwXG4gICAgXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKVxuICAgIC8vIGNvbnN0IHVsID0gcGllTGVnZW5kKClcbiAgICBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3Qgc2VsZWN0XzEgPSBzdGF0ZV9zZWxlY3RvcigxKVxuICAgIGNvbnN0IHNlbGVjdF8yID0gc3RhdGVfc2VsZWN0b3IoMilcbiAgICBjb25zdCBzZWxlY3Rvcl9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VsZWN0b3ItY29udGFpbmVyXCIpWzBdXG4gICAgXG4gICAgY29uc3QgeWVhclNlbGVjdG9yID0geWVhclNlbGVjdG9yXG5cbiAgICBzZWxlY3Rvcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0XzEpXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8yKVxuICAgIHJvb3QuYXBwZW5kQ2hpbGQodWwpXG5cbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIkFsYWJhbWFcIiwgVE9QX0xFVkVMLCAxKVxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKFwiV3lvbWluZ1wiLCBUT1BfTEVWRUwsIDIpXG59KVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==