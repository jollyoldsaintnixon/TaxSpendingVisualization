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
    debugger;
    return function (datum2) {
        debugger;
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
    var csv = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "FY2018-STC-Detailed-Table";


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
exports.customSelector = exports.selector = exports.TOP_LEVEL = undefined;

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

var customSelector = exports.customSelector = function customSelector(pie_num) {
    var STATE_NAMES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    // const container = document.createElement('div')  // revisit if time to make custom select
    // container.classList.add('initial-container')

    var select = document.createElement("span");
    select.innerHTML = pie_num === 1 ? 'Alabama' : 'Wyoming';
    select.classList.add("class", "select-" + pie_num);
    select.id = "select-" + pie_num;
    select.addEventListener('click', function (e) {
        document.getElementById('state-list-' + pie_num).classList.toggle('hidden');
    });

    var stateSelector = function stateSelector(state) {
        return function (e) {
            // const state = e.target.value
            var select = document.getElementById("select-" + pie_num);
            select.innerHTML = state;
            var svg = document.getElementById("svg-" + pie_num);
            svg.parentNode.removeChild(svg);
            (0, _pie_chart_generator.PieChartGenerator)(state, TOP_LEVEL, pie_num);

            var side = pie_num === 1 ? "-left" : "-right";
            // const h2 = document.getElementsByClassName("state" + side)[0]
            // h2.innerHTML = state
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
    // container.appendChild(select)
    // return container
    select.appendChild(state_list);
    return select;
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

var _selector = __webpack_require__(/*! ./components/selector */ "./src/components/selector.js");

var _year_selector = __webpack_require__(/*! ./components/year_selector */ "./src/components/year_selector.js");

document.addEventListener("DOMContentLoaded", function () {

    // PCG -> csvPath, sector, amout, location, multiplier, skip

    var root = document.getElementById("root");
    // const ul = pieLegend()
    var ul = (0, _pie_legend.pieLegend)();
    var select_1 = (0, _selector.customSelector)(1);
    var select_2 = (0, _selector.customSelector)(2);
    var selector_container = document.getElementsByClassName("selector-container")[0];

    var yearSelector = yearSelector;

    selector_container.appendChild(select_1);
    selector_container.appendChild(select_2);
    root.appendChild(ul);

    (0, _pie_chart_generator.PieChartGenerator)("Alabama", _selector.TOP_LEVEL, 1);
    (0, _pie_chart_generator.PieChartGenerator)("Wyoming", _selector.TOP_LEVEL, 2);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZXZlbnRfaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMveWVhcl9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsic3ViRGF0YSIsImNvbnRhaW5lcl9hcnJheSIsInBpZV9udW0iLCJlbGUiLCJ0YXhfdHlwZSIsImRhdGEiLCJrZXkiLCJzdWJfYXJyYXkiLCJzdWJBcnJheUxvY2F0b3IiLCJ0YXhfc3RhY2siLCJrZXlzIiwiZm9yRWFjaCIsInN1Yl90YXgiLCJpIiwicHVzaCIsImFtb3VudCIsIndpZHRoIiwiaGVpZ2h0IiwidG9vbHRpcFdpZHRoIiwidG9vbHRpcEhlaWdodCIsInN2ZyIsImQzIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInN0YWNrIiwib3JkZXIiLCJzdGFja09yZGVyTm9uZSIsIm9mZnNldCIsInN0YWNrT2Zmc2V0Tm9uZSIsImxheWVycyIsIngiLCJzY2FsZUJhbmQiLCJyYW5nZSIsInBhZGRpbmciLCJ5Iiwic2NhbGVMaW5lYXIiLCJkb21haW4iLCJtYXAiLCJtYXgiLCJkIiwieTAiLCJnIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJyZWN0Iiwib24iLCJ0b29sdGlwIiwic3R5bGUiLCJ4UG9zIiwibW91c2UiLCJ5UG9zIiwidGV4dCIsInBlcmNlbnQiLCJjc3NTdWJEYXRhRGlzcGxheSIsInJlbW92ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJ0b3RhbCIsIm9iaiIsInJvb3QiLCJ1bCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJpZCIsImxpIiwicGVyY2VudF9vZl90b3RhbCIsImFwcGVuZENoaWxkIiwiZ3JvdXBUb3RhbCIsImFycmF5IiwiYXNzaWduQm94IiwiYXJyYXlfb2Zfb2JqcyIsInNpZGUiLCJib3giLCJkZWNpbWFscyIsIlN0cmluZyIsInNwbGl0IiwiaW50ZWdlcnMiLCJzbGljZWQiLCJzbGljZSIsImlubmVySFRNTCIsImZpbmRBbW91bnQiLCJqb2luIiwiYnVkZ2V0Q2lyY2xlIiwiZGF0dW0xIiwiZGF0dW0yIiwiY2lyY2xlRGl2IiwiZGlzcGxheSIsInJzY2FsZSIsIlBpZUNoYXJ0R2VuZXJhdG9yIiwiQ09MT1JTIiwiTEFCRUxTIiwic3RhdGUiLCJjc3YiLCJyZW1vdmUyIiwiZGl2IiwiaDEiLCJzcGFuIiwiaDIiLCJUT1RBTCIsIlRZUEVTIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwicmFkaXVzIiwiY29sb3JzIiwic2NhbGVPcmRpbmFsIiwic2NoZW1lRGFyazIiLCJhcmMiLCJvdXRlclJhZGl1cyIsImlubmVyUmFkaXVzIiwicGllIiwidmFsdWUiLCJ0aGVuIiwic2FsZXNfdGF4ZXMiLCJsaWNlbnNlX3RheGVzIiwiaW5jb21lX3RheGVzIiwib3RoZXJfdGF4ZXMiLCJHZW9fTmFtZSIsIml0ZW0iLCJBTU9VTlQiLCJ0YXhfb2JqIiwiVGF4X1R5cGUiLCJpbmNsdWRlcyIsImZvcm1hdCIsInBhdGgiLCJ0cmFuc2l0aW9uIiwiZWFzZSIsImVhc2VMaW5lYXIiLCJkdXJhdGlvbiIsImF0dHJUd2VlbiIsInBpZVR3ZWVuIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyb3IiLCJiIiwiaW50ZXJwb2xhdGUiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJ0IiwicGllTGVnZW5kIiwibWFzdGVyX2xpc3QiLCJsZWZ0X2xpc3QiLCJ0ZXh0X2xpc3QiLCJyaWdodF9saXN0IiwibGVuZ3RoIiwibGVmdF9ib3giLCJ0ZXh0X2JveCIsInJpZ2h0X2JveCIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyIiwic3VibGlzdHMiLCJsYWJlbCIsImxpc3RzIiwibGVzdGxpc3QiLCJ0ZXh0bGlzdCIsInJpZ2h0bGlzdCIsImxlZnRCb3giLCJyaWdodEJveCIsInN1Ymxpc3QiLCJUT1BfTEVWRUwiLCJTVEFURV9OQU1FUyIsInNlbGVjdG9yIiwic2V0QXR0cmlidXRlIiwic3RhdGVTZWxlY3RvciIsImUiLCJ0YXJnZXQiLCJkZWZhdWx0X3N0YXRlIiwib3B0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBoYXNlT3V0Iiwibm9kZSIsImN1c3RvbVNlbGVjdG9yIiwidG9nZ2xlIiwic3RhdGVfbGlzdCIsInN0YXRlX2xpc3RfaXRlbSIsIllFQVJTIiwieWVhclNlbGVjdG9yIiwieWVhciIsInllYXJDaG9pY2UiLCJzdGF0ZTEiLCJzdGF0ZTIiLCJzdmcxIiwic3ZnMiIsInllYXJfbGlzdF9pdGVtIiwieWVhcl9saXN0Iiwic2VsZWN0XzEiLCJzZWxlY3RfMiIsInNlbGVjdG9yX2NvbnRhaW5lciIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFD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eUgsY0FBdEI7QUFDSCxLQU5EO0FBT0gsQ0E5Q00sQzs7Ozs7Ozs7Ozs7Ozs7QUNEUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQXZJLFNBQVN3SCxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTs7QUFFaEQ7O0FBRUEsUUFBTWxILE9BQU9OLFNBQVNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYjtBQUNBO0FBQ0EsUUFBTU0sS0FBSyw0QkFBWDtBQUNBLFFBQU1rSSxXQUFXLDhCQUFlLENBQWYsQ0FBakI7QUFDQSxRQUFNQyxXQUFXLDhCQUFlLENBQWYsQ0FBakI7QUFDQSxRQUFNQyxxQkFBcUIzSSxTQUFTNEksc0JBQVQsQ0FBZ0Msb0JBQWhDLEVBQXNELENBQXRELENBQTNCOztBQUVBLFFBQU1aLGVBQWVBLFlBQXJCOztBQUVBVyx1QkFBbUI3SCxXQUFuQixDQUErQjJILFFBQS9CO0FBQ0FFLHVCQUFtQjdILFdBQW5CLENBQStCNEgsUUFBL0I7QUFDQXBJLFNBQUtRLFdBQUwsQ0FBaUJQLEVBQWpCOztBQUVBLGdEQUFrQixTQUFsQixFQUE2QndHLG1CQUE3QixFQUF3QyxDQUF4QztBQUNBLGdEQUFrQixTQUFsQixFQUE2QkEsbUJBQTdCLEVBQXdDLENBQXhDO0FBQ0gsQ0FuQkQsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKHNhbGVzX3RheGVzKVxuLy8gY29udGFpbmVyX2FycmF5LnB1c2gobGljZW5zZV90YXhlcylcbi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKGluY29tZV90YXhlcylcbi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKG90aGVyX3RheGVzKVxuXG5leHBvcnQgY29uc3Qgc3ViRGF0YSA9IChjb250YWluZXJfYXJyYXksIHBpZV9udW0pID0+IHtcbiAgICAvLyBhIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGxlYXJuZWQgZnJvbSBNaWNoYWVsIFN0YW5hbGFuZCdzIFwiU3RhY2tlZCBiYXIgY2hhcnQgd2l0aCB0b29sdGlwc1wiIHR1dG9yaWFsIGF0IGh0dHA6Ly9ibC5vY2tzLm9yZy9tc3RhbmFsYW5kLzYxMDA3MTNcbiAgICByZXR1cm4gKGVsZSkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGF4X3R5cGUgPSBlbGUuZGF0YS5rZXlcblxuICAgICAgICBjb25zdCBzdWJfYXJyYXkgPSBzdWJBcnJheUxvY2F0b3IodGF4X3R5cGUsIGNvbnRhaW5lcl9hcnJheSlcblxuICAgICAgICAvLyBzZXR0aW5nIHVwIHRoZSB0YXggc3RhY2sgdG8gY29tcGx5IHdpdGggZDMgdjVcbiAgICAgICAgbGV0IHRheF9zdGFjayA9IHsgXG4gICAgICAgICAgICB0YXhfdHlwZTogdGF4X3R5cGUsXG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0dGluZyB1cCBrZXlzXG4gICAgICAgIGxldCBrZXlzID0gW11cbiAgICAgICAgc3ViX2FycmF5LmZvckVhY2goKHN1Yl90YXgsIGkpID0+IHtcbiAgICAgICAgICAgIGtleXMucHVzaChzdWJfdGF4LmtleSlcbiAgICAgICAgICAgIHRheF9zdGFja1tzdWJfdGF4LmtleV0gPSBzdWJfdGF4LmFtb3VudFxuICAgICAgICB9KTtcblxuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gOTAgIC8vIHNldHRpbmcgdGhlIGRpbWVuc2lvbnMgdG8gY29ycmVzcG9uZCB0byB0aGUgcGllIGNoYXJ0cydcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gNjAwXG5cbiAgICAgICAgY29uc3QgdG9vbHRpcFdpZHRoID0gMTIwIC8vIHdpbGwgYWx0ZXIgdGhlc2UgYXMgbmVlZGVkXG4gICAgICAgIGNvbnN0IHRvb2x0aXBIZWlnaHQgPSA0MCBcblxuICAgICAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCJtYWluXCIpLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCkuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuXG4gICAgICAgIC8vIHNldCB0aGUgbGF5ZXJzIG9mIHRoZSBzdGFja2VkIGJhclxuICAgICAgICAvLyBjb25zdCBsYXllcnMgPSBkMy5zdGFjaygpKFt0YXhfdHlwZV0ubWFwKHRheCA9PiB7ICAvLyBzaG91bGQgdWx0aW1hdGVseSBqdXN0IGJlIHRoZSBvbmUgbGF5ZXJcbiAgICAgICAgLy8gICAgIHJldHVybiBzdWJfYXJyYXkubWFwKGQgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB7IHg6IGQua2V5LCB5OiBkLmFtb3VudCwgcGVyY2VudDogZC5wZXJjZW50IH1cbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIH0pKVxuICAgICAgICBjb25zdCBzdGFjayA9IGQzLnN0YWNrKClcbiAgICAgICAgICAgIC5rZXlzKGtleXMpXG4gICAgICAgICAgICAub3JkZXIoZDMuc3RhY2tPcmRlck5vbmUpXG4gICAgICAgICAgICAub2Zmc2V0KGQzLnN0YWNrT2Zmc2V0Tm9uZSlcblxuICAgICAgICBjb25zdCBsYXllcnMgPSBzdGFjayhzdWJfYXJyYXkpXG5cbiAgICAgICAgLy8gY29uc3QgeCA9IGQzLnNjYWxlT3JkaW5hbCgpXG4gICAgICAgIC8vICAgICAuZG9tYWluKGxheWVyc1swXS5tYXAoZCA9PiBkLngpKVxuICAgICAgICAvLyAgICAgLy8gLnJhbmdlKFsxMCwgd2lkdGhdLCAwKSAgLy8gbWF5IGJlIGEgcXVpY2tlciB3YXkgdG8gZG8gdGhpcyBhcyB0aGVyZSBpcyBvbmx5IG9uZSBiYXJcbiAgICAgICAgLy8gICAgIC5yYW5nZShbd2lkdGhdKVxuICAgICAgICBjb25zdCB4ID0gZDMuc2NhbGVCYW5kKClcbiAgICAgICAgICAgIC5yYW5nZShbMCwgd2lkdGhdKVxuICAgICAgICAgICAgLnBhZGRpbmcoMC4xKVxuXG4gICAgICAgIGNvbnN0IHkgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKGxheWVyc1swXS5tYXAoZCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQzLm1heChkLCBkID0+IGQueTAgKyBkLnkpICAvLyB0aGUgaW5jcmVtZW50IHVwIHRvIHRoZSB0b3RhbFxuICAgICAgICAgICAgfSkpLnJhbmdlKFtoZWlnaHQsIDBdKVxuXG4gICAgICAgIGNvbnN0IGcgPSBzdmcuc2VsZWN0QWxsKFwiLnN1Yi10YXhlc1wiKSAgLy8gbm8gZyBhdCB0aGlzIHBvaW50LCBidXQgdGhleSB3aWxsIGhhdmUgdGhpcyBjbGFzc1xuICAgICAgICAgICAgLmRhdGEobGF5ZXJzKS5lbnRlcigpICAvLyBub3cgdGhlcmUgd2lsbCBiZSBhIGcgZm9yIGV2ZXJ5IG9iaiBpbiBzdWJfYXJyYXkuICBzaG91bGQgYmUganVzdCBvbmUgZ1xuICAgICAgICAgICAgLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIFwic3ViLXRheGVzXCIpICBcbiAgICAgICAgICAgIFxuICAgICAgICBjb25zdCByZWN0ID0gZy5zZWxlY3RBbGwoXCJyZWN0XCIpICAvLyBtYWtpbmcgZWFjaCBvYmogb2YgdGhlIGNvcnJlc3BvbmQgdG8gYSByZWN0IHdpdGhpbiB0aGUgZ1xuICAgICAgICAgICAgLmRhdGEoZCA9PiBkKSAvLyBwdWxsaW5nIG91dCBlYWNoIGluZGl2aWR1YWwgb2JqXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgICAgICAuYXR0cigneCcsIGQgPT4geChkLngpKSAgLy8gcGFzc2luZyBlYWNoIG9iaidzIHggdmFsdWUgdG8gdGhlIGQzIHggZnVuY3Rpb24gZGVmaW5lZCBhYm92ZVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkID0+IHkoZC55ICsgZC55MCkpICAvLyB5MCBpcyB0aGUgaGVpZ2h0IHdoZXJlIGVhY2ggc2VnbWVudCBpbiB0aGUgc3RhY2sgc3RhcnRzXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB4LnJhbmdlKCkpICAvLyBwcm9iYWJseSBjYW4gaGFyZCBjb2RlLCBzaW5jZSBvbmx5IG9uZSBiYXJcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBkID0+IHkoZC55MCkgLSB5KGQueTAgKyBkLnkpKSAgLy8gaGVpZ2h0IGlzIHNldCB0byB0aGUgc3RhcnRpbmcgcG9pbnQgcGx1cyB0aGUgaGVpZ2h0LCBhbmQgYWxsIHRoYXQgc3VidHJhY3RlZCBmcm9tIHRoZSBzdGFydGluZyBwb2ludCBkdWUgdG8geSB2YWx1ZXMgYmVnaW5pbmcgYXQgdG9wIG9mIHNjcmVlblxuICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB0b29sdGlwLnN0eWxlKFwiZGlzcGxheVwiLCB0cnVlKSkgIC8vIHdhbnQgdGhlIGluZm8gYm94IHRvIHN3aXRjaCBiZXR3ZWVuIHZpc2libGUgYW5kIGluaXZpcyBiYXNlZCBvbiBtb3VzZW92ZXJcbiAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCAoKSA9PiB0b29sdGlwLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIikpXG4gICAgICAgICAgICAub24oJ21vdXNlbW92ZScsIGQgPT4geyAgLy8gdGhpcyBpcyBnb2luZyB0byBiZSBhIHN3ZWV0IGVmZmVjdCFcbiAgICAgICAgICAgICAgICBjb25zdCB4UG9zID0gZDMubW91c2UodGhpcylbMF0gLSAodG9vbHRpcFdpZHRoIC8gMikgLy8gdGhpc1swXSBjb3JyZXNwb25kcyB0byBtb3VzZSdzIHggcG9zLCBhbmQgcHVzaGluZyBpdCBsZWZ0IGJ5IGhhbGYgb2YgdGhlIHRvb2x0aXAncyB3aWR0aCBlbnN1cmUgaXQgaXMgY2VudGVyZWRcbiAgICAgICAgICAgICAgICBjb25zdCB5UG9zID0gZDMubW91c2UodGhpcylbMV0gLSAyNSAvLyBwdXRzIHRoZSB0b29sdGlwIHVwIGEgYml0IGFib3ZlIHRoZSBjdXJzb3JcbiAgICAgICAgICAgICAgICB0b29sdGlwLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB4UG9zICsgJywnICsgeVBvcyArICcpJylcbiAgICAgICAgICAgICAgICB0b29sdGlwLnNlbGVjdCgndGV4dCcpLnRleHQoZC5wZXJjZW50KSAvLyBzaG93cyB0aGUgcGVyY2VudCAgXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHRvb2x0aXAgPSBzdmcuYXBwZW5kKCdnJykgLy8gc2V0dGluZyB1cCB0aGlzIHN3ZWV0IHRvb2x0aXAuIEV4Y2l0aW5nIVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N1Yi1kYXRhLXRvb2x0aXAgdG9vbHRpcCcpLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKSAvLyBzdGFydHMgaW52aXNpYmxlXG4gICAgICAgICAgICAvLyBhZGRpbmcgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIGJveFxuICAgICAgICAgICAgLmFwcGVuZCgncmVjdCcpLmF0dHIoJ3dpZHRoJywgdG9vbHRpcFdpZHRoKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRvb2x0aXBIZWlnaHQpLmF0dHIoJ2ZpbGwnLCAnd2hpdGUnKS5zdHlsZSgnb3BhY2l0eScsIDAuNSkgLy8gbWFraW5nIGl0IHBhcnRpYWxseSBzZWUtdGhyb3VnaFxuICAgICAgICAgICAgLy8gYWRkaW5nIHRoZSB0ZXh0IGNvbnRlbnRcbiAgICAgICAgICAgIC5hcHBlbmQoJ3RleHQnKS5hdHRyKCd4JywgMTUpXG4gICAgICAgICAgICAuYXR0cignZHknLCAnLjhlbScpLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgIH1cbiAgICBcbn1cblxuY29uc3Qgc3ViQXJyYXlMb2NhdG9yID0gKHRheF90eXBlLCBjb250YWluZXJfYXJyYXkpID0+IHsgIC8vIGhlbHBlciBmdW5jdGlvbiBmb3IgZmluZGluZyB0aGUgcmlnaHQgc3ViIGFycmF5LiBBIGJpdCBoYXJkLWNvZGVkLlxuICAgIHN3aXRjaCAodGF4X3R5cGUpIHtcbiAgICAgICAgY2FzZSBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVswXVxuICAgICAgICBjYXNlIFwiTGljZW5zZSBUYXhlc1wiOiBcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMV1cbiAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOiBcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMl1cbiAgICAgICAgY2FzZSBcIk90aGVyIFRheGVzXCI6IFxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcl9hcnJheVszXVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNzc1N1YkRhdGFEaXNwbGF5ID0gKGNvbnRhaW5lcl9hcnJheSwgcGllX251bSkgPT4ge1xuXG4gICAgY29uc3Qgd2lkdGggPSA5MCAgLy8gc2V0dGluZyB0aGUgZGltZW5zaW9ucyB0byBjb3JyZXNwb25kIHRvIHRoZSBwaWUgY2hhcnRzJ1xuICAgIGNvbnN0IGhlaWdodCA9IDYwMFxuXG4gICAgcmV0dXJuIChlbGUpID0+IHtcblxuICAgICAgICBjb25zdCByZW1vdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Yi1kYXRhLWxpc3QtXCIgKyBwaWVfbnVtKVxuICAgICAgICByZW1vdmUgPyByZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUpIDogbnVsbFxuICAgICAgICBcbiAgICAgICAgY29uc3QgdGF4X3R5cGUgPSBlbGUuZGF0YS5rZXlcbiAgICAgICAgY29uc3Qgc3ViX2FycmF5ID0gc3ViQXJyYXlMb2NhdG9yKHRheF90eXBlLCBjb250YWluZXJfYXJyYXkpIC8vIGdldCByaWdodCBzdWJfYXJyYXlcbiAgICAgICAgLy8gY29uc3QgZ3JvdXBUb3RhbCA9IGdyb3VwVG90YWwoc3ViX2FycmF5KSAvLyBub3Qgc3VyZSB3aHkgdGhpcyBpcyBub3QgaW52b2tpbmcgdGhlIGZ1bmNpdG9uIGJlbG93XG4gICAgICAgIGxldCB0b3RhbCA9IDBcbiAgICAgICAgc3ViX2FycmF5LmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgIHRvdGFsICs9IG9iai5hbW91bnRcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikgLy8gZ3JhYiB0aGUgcm9vdCB0byBhdHRhY2ggbGF0ZXJcblxuICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKSAvLyBzZXQgdXAgdWwgY29udGFpbmVyXG4gICAgICAgIHVsLmNsYXNzTGlzdC5hZGQoXCJzdWItZGF0YS1saXN0LVwiICsgcGllX251bSlcbiAgICAgICAgdWwuaWQgPSAoXCJzdWItZGF0YS1saXN0LVwiICsgcGllX251bSlcblxuICAgICAgICBzdWJfYXJyYXkuZm9yRWFjaChzdWJfdGF4ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAgICAgbGkuc3R5bGUuaGVpZ2h0ID0gKHN1Yl90YXgucGVyY2VudF9vZl90b3RhbCAqIDYpICsgJ3B4J1xuICAgICAgICAgICAgdWwuYXBwZW5kQ2hpbGQobGkpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQodWwpXG4gICAgfVxufVxuXG5jb25zdCBncm91cFRvdGFsID0gYXJyYXkgPT4ge1xuICAgIGxldCB0b3RhbCA9IDBcbiAgICBhcnJheS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgIHRvdGFsICs9IG9iai5hbW91bnRcbiAgICB9KTtcbiAgICByZXR1cm4gdG90YWxcbn0iLCJcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkJveCA9IChhcnJheV9vZl9vYmpzLCBwaWVfbnVtKSA9PiB7XG4gICAgY29uc3Qgc2lkZSA9IHBpZV9udW0gPT09IDEgPyAnbGVmdC1ib3gtJyA6ICdyaWdodC1ib3gtJ1xuICAgIGFycmF5X29mX29ianMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgaSA9IDQ7XG4gICAgICAgIHN3aXRjaCAob2JqLmtleSkge1xuICAgICAgICAgICAgY2FzZSBcIk90aGVyIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiSW5jb21lIFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDEgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTGljZW5zZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAyIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlByb3BlcnR5IFRheGVzXCI6XG4gICAgICAgICAgICAgICAgaSA9IDMgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2lkZSArIGkpXG4gICAgICAgIGNvbnN0IGRlY2ltYWxzID0gU3RyaW5nKG9iai5wZXJjZW50KS5zcGxpdCgnLicpWzFdXG4gICAgICAgIGNvbnN0IGludGVnZXJzID0gU3RyaW5nKG9iai5wZXJjZW50KS5zcGxpdCgnLicpWzBdXG4gICAgICAgIGNvbnN0IHNsaWNlZCA9IG9iai5wZXJjZW50ID8gaW50ZWdlcnMgKyAnLicgKyBkZWNpbWFscy5zbGljZSgwLCAyKSA6IDBcbiAgICAgICAgYm94LmlubmVySFRNTCA9IHNsaWNlZCArICclJ1xuICAgIH0pO1xufVxuXG4vLyBkLkFNT1VOVCA9PT0gJ1gnID8gMCA6IGQuQU1PVU5ULnNwbGl0KCcsJykuam9pbignJykgKiAxMDAwLFxuZXhwb3J0IGNvbnN0IGZpbmRBbW91bnQgPSAoYW1vdW50KSA9PiB7XG4gICAgcmV0dXJuIGFtb3VudCA9PT0gJ1gnID8gMCA6IGFtb3VudC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMFxufVxuXG4vLyBleHBvcnQgY29uc3Qgc3ViRGF0YVB1c2hlciA9IChpdGVtKSA9PiB7XG4vLyAgICAgaWYgKGl0ZW0gIT0gXCJUMDBcIiAmJiBpdGVtICE9IFwiVDAxXCIpIHtcbi8vICAgICAgICAgc3dpdGNoIChpdGVtLnNsaWNlKDAsIDIpKSB7XG4vLyAgICAgICAgICAgICBjYXNlIChcIlQwXCIgfHwgXCJUMVwiKTpcbi8vICAgICAgICAgICAgICAgICBzYWxlc190YXhlcy5wdXNoKHtcbi8vICAgICAgICAgICAgICAgICAgICAga2V5OiBkLlRheF9UeXBlLFxuLy8gICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuLy8gICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiAoZmluZEFtb3VudChkLkFNT1VOVCkgLyBUT1RBTCkgKiAxMDBcbi8vICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgIFxuLy8gICAgICAgICAgICAgY2FzZSBcIlQyXCI6XG4vLyAgICAgICAgICAgICAgICAgbGljZW5zZV90YXhlcy5wdXNoKHtcbiAgICBcbi8vICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfVxuXG5leHBvcnQgY29uc3QgYnVkZ2V0Q2lyY2xlID0gKGRhdHVtMSkgPT4ge1xuICAgIC8vIGJhc2VkIG9uIE1hdHRoZXcgTWNLZW5uYSdzIGV4YW1wbGUgYXQgaHR0cDovL2JsLm9ja3Mub3JnL21wbWNrZW5uYTgvcmF3LzU2NjUwOWRkM2Q5YTA4ZTVmOWIyL1xuICAgIGRlYnVnZ2VyXG4gICAgcmV0dXJuIGRhdHVtMiA9PiB7XG4gICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIGRhdGEgPSBbZGF0dW0xLCBkYXR1bTJdXG5cbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gMTAwXG4gICAgICAgIGNvbnN0IHdpZHRoID0gMTAwMFxuICAgIFxuICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuICAgICAgICBjb25zdCBjaXJjbGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIGNpcmNsZURpdi5jbGFzc0xpc3QuYWRkKFwiY2lyY2xlLWNvbnRhaW5lclwiKVxuICAgICAgICBjaXJjbGVEaXYuaWQgPSBcImNpcmNsZS1jb250YWluZXJcIlxuICAgICAgICBjaXJjbGVEaXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICAgICAgICBjaXJjbGVEaXYuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgIGNpcmNsZURpdi5zdHlsZS53aWR0aCA9IHdpZHRoXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQoY2lyY2xlRGl2KVxuICAgIFxuICAgICAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoJyNjaXJjbGUtY29udGFpbmVyJykuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KS5hdHRyKCdjbGFzcycsICdjaXJjbGUtc3ZnJyk7XG4gICAgXG4gICAgICAgIGNvbnN0IHJzY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIChkMy5tYXgoZGF0YSkpIF0pXG4gICAgICAgICAgICAucmFuZ2UoWzMsIDIwXSlcbiAgICBcbiAgICAgICAgc3ZnLnNlbGVjdEFsbCgnLmNpcmNsZXMnKS5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cigncicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJzY2FsZShkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGVzJykuYXR0cignY3knLCBoZWlnaHQgLyAyKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgKGQsIGkpID0+IDIwICsgNDAgKiBpKVxuICAgIH1cbn0iLCIvLyBBIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGJhc2VkIGhlYXZpbHkgb2ZmIG9mIEthcnRoaWsgVGhvdGEncyB5b3V0dWJlIHR1dG9yaWFsIFwiSW50cm9kdWN0aW9uIHRvIGQzLmpzID0gUGllIENoYXJ0IGFuZCBEb251dCBDaGFydFwiXG4vLyBUaGUgbGVnZW5kIGNvZGUgd2FzIGZyb20gQ3J5cHRlcnMgSW5mb3RlY2gncyB5b3V0dWJlIHR1dG9yaWFsIFwiUGllIENoYXJ0IHVzaW5nIEQzLmpzXCJcblxuaW1wb3J0IHsgYXNzaWduQm94LCBmaW5kQW1vdW50LCBidWRnZXRDaXJjbGUgfSBmcm9tICcuL2hlbHBlcl9mdW5jdGlvbnMnXG5pbXBvcnQgeyBzdWJEYXRhLCBjc3NTdWJEYXRhRGlzcGxheSB9IGZyb20gJy4vZXZlbnRfaGFuZGxlcnMnXG5cbmV4cG9ydCBjb25zdCBDT0xPUlMgPSBbXCIjYTY3NTFlXCIsIFwiI2U3YWIwNFwiLCBcIiM2NmE1MWVcIiwgXCIjNzQ3MGIzXCIsIFwiI2U4MmI4YVwiXVxuLy8gZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgYW5kIEdyb3NzIFJlY2VpcHRzIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIkluY29tZSBUYXhlc1wiLCBcIk90aGVyIFRheGVzXCJdXG5leHBvcnQgY29uc3QgTEFCRUxTID0gW1wiT3RoZXIgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJMaWNlbnNlIFRheGVzXCIsIFwiUHJvcGVydHkgVGF4ZXNcIiwgXCJTYWxlcyBUYXhlc1wiXVxuLy8gZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKGNzdlBhdGgsIHNlY3RvciwgYW1vdW50LCBzdGF0ZSwgbXVsdGlwbGllciA9IDEsIHNraXAgPSAxKSB7XG5leHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUsIHRheF90eXBlLCBwaWVfbnVtLCBjc3YgPSBcIkZZMjAxOC1TVEMtRGV0YWlsZWQtVGFibGVcIikge1xuXG4gICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtXCIgKyBwaWVfbnVtKVxuICAgIHJlbW92ZSA/IHJlbW92ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZSkgOiBudWxsXG5cbiAgICBjb25zdCByZW1vdmUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbHMtXCIgKyBwaWVfbnVtKVxuICAgIHJlbW92ZTIgPyByZW1vdmUyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlMikgOiBudWxsXG5cblxuICAgIGNvbnN0IGRpdiA9IGQzLnNlbGVjdChcIiN0b3RhbHNcIilcbiAgICAgICAgLmFwcGVuZChcImRpdlwiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwidG90YWxzLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJpZFwiLCBcInRvdGFscy1cIiArIHBpZV9udW0pXG5cbiAgICBjb25zdCBoMSA9IGRpdlxuICAgICAgICAuYXBwZW5kKFwiaDFcIilcbiAgICAgICAgLy8gLmF0dHIoJ2lkJywgJ3JldmVudWUtJyArIHBpZV9udW0pXG5cbiAgICBjb25zdCBzcGFuID0gZGl2XG4gICAgICAgIC5hcHBlbmQoXCJzcGFuXCIpXG5cbiAgICBjb25zdCBoMiA9IGQzLnNlbGVjdChcIiNkZXRhaWxzXCIpXG4gICAgICAgIC5hcHBlbmQoXCJoMlwiKVxuICAgICAgICAvLyAuYXR0cignaWQnLCAncGVyY2VudC0nICsgcGllX251bSlcblxuICAgIGxldCBUT1RBTCA9IDA7XG4gICAgbGV0IFRZUEVTID0gW11cbiAgICAvLyBDSVJDTEUgVElNRSBCQUJZXG4gICAgLy8gbWFyZ2luIGFuZCByYWRpdXNcbiAgICBjb25zdCBtYXJnaW4gPSB7IHRvcDogMjAwLCByaWdodDogMjAwLCBib3R0b206IDIwMCwgbGVmdDogMjAwIH0sXG4gICAgICAgIGhlaWdodCA9IDEwMDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSxcbiAgICAgICAgd2lkdGggPSAxMDAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXG4gICAgICAgIHJhZGl1cyA9IHdpZHRoIC8gMjtcblxuXG5cbiAgICBjb25zdCBjb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lRGFyazIpO1xuXG4gICAgLy8gYXJjIGdlbmVyYXRvclxuICAgIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSAxMClcbiAgICAgICAgLy8gLmlubmVyUmFkaXVzKDApOyAvLyBmb3IgY2lyY2xlXG4gICAgICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSAxMDApIC8vIGZvciBkb251dFxuXG4gICAgLy8gY29uc3QgbGFibGVBcmMgPSBkMy5hcmMoKVxuICAgIC8vICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gNTApXG4gICAgLy8gICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSA1MCk7XG5cbiAgICAvLyBwaWUgZ2VuZXJhdG9yXG4gICAgY29uc3QgcGllID0gZDMucGllKClcbiAgICAgICAgLy8gLnNvcnQobnVsbClcbiAgICAgICAgLnZhbHVlKGQgPT4gZC5hbW91bnQpO1xuXG4gICAgLy8gZGVmaW5lIHN2ZyBcbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIucGllLVwiICsgcGllX251bSkuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwiaWRcIiwgXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB3aWR0aCAvIDIgKyBcIixcIiArIGhlaWdodCAvIDIgKyBcIilcIilcblxuICAgIC8vIGltcG9ydCBkYXRhXG4gICAgZDMuY3N2KGNzdikudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAvLyBpbml0aWFsaXplIGFycmF5cyB0aGF0IHdpbGwgY29udGFpbiB0aGUgc3ViIGxldmVsIHRheCBkYXRhXG4gICAgICAgIGxldCBzYWxlc190YXhlcyA9IFtdXG4gICAgICAgIGxldCBsaWNlbnNlX3RheGVzID0gW11cbiAgICAgICAgbGV0IGluY29tZV90YXhlcyA9IFtdXG4gICAgICAgIGxldCBvdGhlcl90YXhlcyA9IFtdXG4gICAgICAgIC8vIGxldCBzYWxlc190YXhfb2JqID0geyB0YXhfZ3JvdXA6IExBQkVMU1s0XSB9XG4gICAgICAgIC8vIHBhcnNlIHRoZSBjc3ZcbiAgICAgICAgZGF0YS5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkLkdlb19OYW1lID09PSBzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gPT09IFwiVDAwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgVE9UQUwgPSBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGQuaXRlbSAhPSBcIlQwMFwiICYmIGQuaXRlbSAhPSBcIlQwMVwiKSB7ICAvLyBkb24ndCB3YW50IHRvIGNhdGNoIFRvdGFsIG9yIFByb3BlcnR5IFRheGVzXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXhfb2JqID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBkLlRheF9UeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnRfb2ZfdG90YWw6IChmaW5kQW1vdW50KGQuQU1PVU5UKSAvIFRPVEFMKSAqIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZC5pdGVtLnNsaWNlKDAsMikpIHsgLy8gZmlsbCB1cCBzdWIgYXJyYXlzXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDBcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYWxlc190YXhlcy5wdXNoKHRheF9vYmopICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2FsZXNfdGF4X29ialtkLlRheF9UeXBlXSA9IGZpbmRBbW91bnQoZC5BTU9VTlQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDFcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYWxlc190YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDJcIjogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGljZW5zZV90YXhlcy5wdXNoKHRheF9vYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiVDRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNvbWVfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQ1XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQ5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRheF90eXBlLmluY2x1ZGVzKGQuaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuaXRlbSAhPSAnVDAwJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVFlQRVMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBkLlRheF9UeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKChmaW5kQW1vdW50KGQuQU1PVU5UKSkgLyBUT1RBTCkgKiAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGQua2V5ID0gZC5UYXhfVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgZC5hbW91bnQgPSBmaW5kQW1vdW50KGQuQU1PVU5UKTtcbiAgICAgICAgICAgICAgICAgICAgZC5wZXJjZW50ID0gKChmaW5kQW1vdW50KGQuQU1PVU5UKSkgLyBUT1RBTCkgKiAxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgY29uc3QgY29udGFpbmVyX2FycmF5ID0gW10gIC8vIHNldHRpbmcgdXAgY29udGFpbmVyIGFycmF5IGZvciBwYXNzaW5nIGludG8gY2xpY2sgaGFuZGxlclxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChzYWxlc190YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2gobGljZW5zZV90YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2goaW5jb21lX3RheGVzKVxuICAgICAgICBjb250YWluZXJfYXJyYXkucHVzaChvdGhlcl90YXhlcylcbiAgICAgICAgLy8gc2V0IGgxIGFmdGVyIHRvdGFsIGhhcyBiZWVuIGRlZmluZWRcbiAgICAgICAgaDEudGV4dChzdGF0ZSArIFwiJ3MgdGF4IHJldmVudWUgZm9yIDIwMTggd2FzIFwiKVxuICAgICAgICBzcGFuLnRleHQoXCIkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgIGgyLnRleHQoXCJcIilcbiAgICAgICAgLy8gYXR0ZW1wdCBidWRnZXRDaXJjbGUgY2FsbFxuICAgICAgICBidWRnZXRDaXJjbGUoVE9UQUwpXG4gICAgICAgIC8vIHNldCB1cCB0aGUgcGVyY2VudGFnZXMgaW4gdGhlIGNlbnRlciBib3hcbiAgICAgICAgYXNzaWduQm94KFRZUEVTLCBwaWVfbnVtKVxuXG4gICAgICAgIGNvbnN0IGcgPSBzdmcuc2VsZWN0QWxsKFwiLmFyY1wiKVxuICAgICAgICAgICAgLmRhdGEocGllKGRhdGEpKVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwiZ1wiKSAgLy8gQW5kIHRoaXMgbGluZSB0byBncm93IHRoZSBudW1iZXIgb2YgZydzIHRvIHRoZSBkYXRhIHNldCBzaXplXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYXJjXCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIChkLCBpKSA9PiBkLnZhbHVlID09PSBUT1RBTCA/IFwibm9uZVwiIDogXCJudWxsXCIpOyAgLy8gYXR0ZW1wdCB0byByZW5kZXIgaGFsZiB0aGUgY2hhcnQgaW52aXNpYmxlXG4gICAgICAgICAgICBcbiAgICAgICAgLy8gYXBwZW5kIHRoZSBwYXRoIG9mIHRoZSBhcmNcbiAgICAgICAgY29uc3QgcGF0aCA9IGcuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIGFyYylcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZCA9PiBjb2xvcnMoZC5kYXRhLmtleSkpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZWFzZShkMy5lYXNlTGluZWFyKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oJ2QnLCBwaWVUd2Vlbik7XG4gICAgICAgIFxuICAgICAgICAvLyBwYXRoLm9uKFwibW91c2VvdmVyXCIsIChkLCBpKSA9PiB7ICAvLyB3aHkgZG9lc24ndCB0aGlzIHdvcms/XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZClcbiAgICAgICAgLy8gICAgICAgICBkMy5zZWxlY3QodGhpcykudHJhbnNpdGlvbigpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5kdXJhdGlvbignNTAnKVxuICAgICAgICAvLyAgICAgICAgICAgICAuYXR0cignb3BhY2l0eScsICcuODUnKVxuICAgICAgICAvLyAgICAgICAgICAgICAuYXR0cihcImN1cnNvclwiLCAncG9pbnRlcicpXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyBkZXRlcm1pbmUgaG93IHRvIGZsaXAgdGhlIHBpZXNcbiAgICAgICAgaWYgKHBpZV9udW0gPT09IDIpIHsvLyBmbGlwIHRoZSBzZWNvbmQgcGllXG4gICAgICAgICAgICBnLmF0dHIoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICBnLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwic2NhbGVYKC0xKSB0cmFuc2xhdGUoMzAwcHgsIDBweCkgc2NhbGVZKC0xKVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGcuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJzY2FsZVkoLTEpXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgIGcub24oXCJtb3VzZW92ZXJcIiwgKGQsIGkpID0+IHsgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oJzUwJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAnLjg1JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgJ3BvaW50ZXInKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgZy5vbihcIm1vdXNlb3V0XCIsIGVsZSA9PiB7XG4gICAgICAgICAgICAvLyBoMS50ZXh0KHN0YXRlICsgXCIncyB0YXggcmV2ZW51ZSBmb3IgMjAxOCB3YXMgJFwiICsgZDMuZm9ybWF0KCcsJykoVE9UQUwpKVxuICAgICAgICAgICAgLy8gaDIudGV4dChcIlwiKVxuICAgICAgICB9KVxuICAgICAgICAvLyAub24oXCJjbGlja1wiLCBjc3NTdWJEYXRhRGlzcGxheShjb250YWluZXJfYXJyYXksIHBpZV9udW0pKTtcbiAgICAgICAgICAgIFxuICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7IGlmIChlcnJvcikgdGhyb3cgZXJyb3IgfSlcblxuICAgIGNvbnN0IHBpZVR3ZWVuID0gYiA9PiB7XG4gICAgICAgIGIuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZTogMCB9LCBiKVxuICAgICAgICByZXR1cm4gKHQpID0+IHsgcmV0dXJuIGFyYyhpKHQpKSB9XG4gICAgfSAgICBcblxufVxuIiwiaW1wb3J0IHsgQ09MT1JTLCBMQUJFTFN9IGZyb20gJy4vcGllX2NoYXJ0X2dlbmVyYXRvcidcblxuZXhwb3J0IGNvbnN0IHBpZUxlZ2VuZCA9ICgpID0+IHtcbiAgICBjb25zdCBtYXN0ZXJfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKVxuICAgIG1hc3Rlcl9saXN0LmNsYXNzTGlzdC5hZGQoJ21hc3Rlci1saXN0JylcblxuICAgIGNvbnN0IGxlZnRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBjb25zdCB0ZXh0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgcmlnaHRfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgIGxlZnRfbGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0LWxpc3QnKSAgXG4gICAgdGV4dF9saXN0LmNsYXNzTGlzdC5hZGQoJ3RleHQtbGlzdCcpICBcbiAgICByaWdodF9saXN0LmNsYXNzTGlzdC5hZGQoJ3JpZ2h0LWxpc3QnKSBcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTEFCRUxTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGxlZnRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCB0ZXh0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgcmlnaHRfYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIGxlZnRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdsZWZ0LWJveCcpXG4gICAgICAgIGxlZnRfYm94LmlkID0gKCdsZWZ0LWJveC0nICsgaSlcbiAgICAgICAgbGVmdF9ib3guc3R5bGUuY29sb3IgPSBDT0xPUlNbaV1cblxuICAgICAgICByaWdodF9ib3guY2xhc3NMaXN0LmFkZCgnYm94JywgJ3JpZ2h0LWJveCcpXG4gICAgICAgIHJpZ2h0X2JveC5pZCA9ICgncmlnaHQtYm94LScgKyBpKVxuICAgICAgICByaWdodF9ib3guc3R5bGUuY29sb3IgPSBDT0xPUlNbaV1cblxuICAgICAgICB0ZXh0X2JveC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWJveCcpXG4gICAgICAgIHRleHRfYm94LmlubmVySFRNTCA9IExBQkVMU1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gQ09MT1JTW2ldO1xuICAgICAgICB0ZXh0X2JveC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgXCIgKyBDT0xPUlNbaV1cblxuICAgICAgICBsZWZ0X2xpc3QuYXBwZW5kQ2hpbGQobGVmdF9ib3gpXG4gICAgICAgIHRleHRfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2JveClcbiAgICAgICAgcmlnaHRfbGlzdC5hcHBlbmRDaGlsZChyaWdodF9ib3gpXG4gICAgfVxuXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQobGVmdF9saXN0KVxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKHRleHRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZChyaWdodF9saXN0KVxuICAgIHJldHVybiBtYXN0ZXJfbGlzdFxufVxuXG5jb25zdCBzdWJsaXN0cyA9IChsYWJlbCwgY29sb3IpID0+IHtcbiAgICBjb25zdCBsaXN0cyA9IFtdXG5cblxuICAgIGxlc3RsaXN0LmNsYXNzTGlzdC5hZGQoJ2xlZnRsaXN0JylcbiAgICB0ZXh0bGlzdC5jbGFzc0xpc3QuYWRkKCd0ZXh0bGlzdCcpXG4gICAgcmlnaHRsaXN0LmNsYXNzTGlzdC5hZGQoJ3JpZ2h0bGlzdCcpXG5cbiAgICBjb25zdCBsZWZ0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGNvbnN0IHJpZ2h0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG5cblxuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG5cbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKGxlZnRCb3gpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsaSlcbiAgICBzdWJsaXN0LmFwcGVuZENoaWxkKHJpZ2h0Qm94KVxuICAgIHJldHVybiBzdWJsaXN0XG59IiwiaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBUT1BfTEVWRUwgPSBbJ1QwMCcsICdUMDEnLCAnVEExJywgJ1RBMycsICdUQTQnLCAnVEE1J11cbmNvbnN0IFNUQVRFX05BTUVTID0gWydBbGFiYW1hJywgJ0FsYXNrYScsICdBcml6b25hJywgJ0Fya2Fuc2FzJywgJ0NhbGlmb3JuaWEnLCAnQ29sb3JhZG8nLCAnQ29ubmVjdGljdXQnLCAnRGVsYXdhcmUnLCAnRmxvcmlkYScsICdHZW9yZ2lhJywgJ0hhd2FpaScsICdJZGFobycsICdJbGxpbm9pcycsICdJbmRpYW5hJywgJ0lvd2EnLCAnS2Fuc2FzJywgJ0tlbnR1Y2t5JywgJ0xvdWlzaWFuYScsICdNYWluZScsICdNYXJ5bGFuZCcsICdNYXNzYWNodXNldHRzJywgJ01pY2hpZ2FuJywgJ01pbm5lc290YScsICdNaXNzaXNzaXBwaScsICdNaXNzb3VyaScsICdNb250YW5hJywgJ05lYnJhc2thJywgJ05ldmFkYScsICdOZXcgSGFtcHNoaXJlJywgJ05ldyBKZXJzZXknLCAnTmV3IE1leGljbycsICdOZXcgWW9yaycsICdOb3J0aCBDYXJvbGluYScsICdOb3J0aCBEYWtvdGEnLCAnT2hpbycsICdPa2xhaG9tYScsICdPcmVnb24nLCAnUGVubnN5bHZhbmlhJywgJ1Job2RlIElzbGFuZCcsICdTb3V0aCBDYXJvbGluYScsICdTb3V0aCBEYWtvdGEnLCAnVGVubmVzc2VlJywgJ1RleGFzJywgJ1V0YWgnLCAnVmVybW9udCcsICdWaXJnaW5pYScsICdXYXNoaW5ndG9uJywgJ1dlc3QgVmlyZ2luaWEnLCAnV2lzY29uc2luJywgJ1d5b21pbmcnXVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuXG4gICAgLy8gY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgIC8vIHJldmlzaXQgaWYgdGltZSB0byBtYWtlIGN1c3RvbSBzZWxlY3RcbiAgICAvLyBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5pdGlhbC1jb250YWluZXInKVxuXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKVxuICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNlbGVjdC1cIiArIHBpZV9udW0pXG5cbiAgICBjb25zdCBzdGF0ZVNlbGVjdG9yID0gZSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctXCIgKyBwaWVfbnVtKVxuICAgICAgICBzdmcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcpXG4gICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG5cbiAgICAgICAgY29uc3Qgc2lkZSA9IHBpZV9udW0gPT09IDEgPyBcIi1sZWZ0XCIgOiBcIi1yaWdodFwiXG4gICAgICAgIC8vIGNvbnN0IGgyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN0YXRlXCIgKyBzaWRlKVswXVxuICAgICAgICAvLyBoMi5pbm5lckhUTUwgPSBzdGF0ZVxuICAgIH1cblxuICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBkZWZhdWx0X3N0YXRlID0gcGllX251bSA9PT0gMSA/IFNUQVRFX05BTUVTWzBdIDogU1RBVEVfTkFNRVNbU1RBVEVfTkFNRVMubGVuZ3RoIC0gMV1cbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuICAgICAgICBpZiAoc3RhdGUgPT09IGRlZmF1bHRfc3RhdGUpIHtcbiAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCB0cnVlKVxuICAgICAgICB9XG4gICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBzdGF0ZVxuICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4gICAgICAgIC8vIG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4gICAgICAgIC8vIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKVxuICAgIH0pXG4gICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc3RhdGVTZWxlY3RvcilcbiAgICAvLyBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KVxuICAgIC8vIHJldHVybiBjb250YWluZXJcbiAgICByZXR1cm4gc2VsZWN0XG59XG5cbmNvbnN0IHBoYXNlT3V0ID0gKG5vZGUpID0+IHtcblxuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKVxufVxuXG5leHBvcnQgY29uc3QgY3VzdG9tU2VsZWN0b3IgPSAocGllX251bSkgPT4ge1xuICAgIGNvbnN0IFNUQVRFX05BTUVTID0gWydBbGFiYW1hJywgJ0FsYXNrYScsICdBcml6b25hJywgJ0Fya2Fuc2FzJywgJ0NhbGlmb3JuaWEnLCAnQ29sb3JhZG8nLCAnQ29ubmVjdGljdXQnLCAnRGVsYXdhcmUnLCAnRmxvcmlkYScsICdHZW9yZ2lhJywgJ0hhd2FpaScsICdJZGFobycsICdJbGxpbm9pcycsICdJbmRpYW5hJywgJ0lvd2EnLCAnS2Fuc2FzJywgJ0tlbnR1Y2t5JywgJ0xvdWlzaWFuYScsICdNYWluZScsICdNYXJ5bGFuZCcsICdNYXNzYWNodXNldHRzJywgJ01pY2hpZ2FuJywgJ01pbm5lc290YScsICdNaXNzaXNzaXBwaScsICdNaXNzb3VyaScsICdNb250YW5hJywgJ05lYnJhc2thJywgJ05ldmFkYScsICdOZXcgSGFtcHNoaXJlJywgJ05ldyBKZXJzZXknLCAnTmV3IE1leGljbycsICdOZXcgWW9yaycsICdOb3J0aCBDYXJvbGluYScsICdOb3J0aCBEYWtvdGEnLCAnT2hpbycsICdPa2xhaG9tYScsICdPcmVnb24nLCAnUGVubnN5bHZhbmlhJywgJ1Job2RlIElzbGFuZCcsICdTb3V0aCBDYXJvbGluYScsICdTb3V0aCBEYWtvdGEnLCAnVGVubmVzc2VlJywgJ1RleGFzJywgJ1V0YWgnLCAnVmVybW9udCcsICdWaXJnaW5pYScsICdXYXNoaW5ndG9uJywgJ1dlc3QgVmlyZ2luaWEnLCAnV2lzY29uc2luJywgJ1d5b21pbmcnXVxuXG4gICAgLy8gY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgIC8vIHJldmlzaXQgaWYgdGltZSB0byBtYWtlIGN1c3RvbSBzZWxlY3RcbiAgICAvLyBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5pdGlhbC1jb250YWluZXInKVxuXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICBzZWxlY3QuaW5uZXJIVE1MID0gcGllX251bSA9PT0gMSA/ICdBbGFiYW1hJyA6ICdXeW9taW5nJ1xuICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuICAgIHNlbGVjdC5pZCA9IFwic2VsZWN0LVwiICsgcGllX251bVxuICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdGUtbGlzdC0nICsgcGllX251bSkuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICB9KVxuICAgIFxuICAgIGNvbnN0IHN0YXRlU2VsZWN0b3IgPSBzdGF0ZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdC1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzZWxlY3QuaW5uZXJIVE1MID0gc3RhdGVcbiAgICAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIHN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZylcbiAgICAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG5cbiAgICAgICAgICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gXCItbGVmdFwiIDogXCItcmlnaHRcIlxuICAgICAgICAgICAgLy8gY29uc3QgaDIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3RhdGVcIiArIHNpZGUpWzBdXG4gICAgICAgICAgICAvLyBoMi5pbm5lckhUTUwgPSBzdGF0ZVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHN0YXRlX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdzdGF0ZS1saXN0LScgKyBwaWVfbnVtKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICBzdGF0ZV9saXN0LmlkID0gJ3N0YXRlLWxpc3QtJyArIHBpZV9udW1cbiAgICBcbiAgICBTVEFURV9OQU1FUy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGVfbGlzdF9pdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5pbm5lckhUTUwgPSBzdGF0ZVxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc3RhdGUpXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhdGVTZWxlY3RvcihzdGF0ZSkpXG4gICAgICAgIHN0YXRlX2xpc3QuYXBwZW5kQ2hpbGQoc3RhdGVfbGlzdF9pdGVtKVxuICAgIH0pXG4gICAgLy8gY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdClcbiAgICAvLyByZXR1cm4gY29udGFpbmVyXG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKHN0YXRlX2xpc3QpXG4gICAgcmV0dXJuIHNlbGVjdFxufVxuXG4vLyBjb25zdCBwaGFzZU91dCA9IChub2RlKSA9PiB7XG5cbi8vICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbi8vIH0iLCJjb25zdCBZRUFSUyA9IFsyMDE4LCAyMDE3XVxuXG5leHBvcnQgY29uc3QgeWVhclNlbGVjdG9yID0geWVhciA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICBzZWxlY3QuaW5uZXJIVE1MID0geWVhclxuICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJ5ZWFyLXNlbGVjdFwiKVxuICAgIHNlbGVjdC5pZCA9ICd5ZWFyLXNlbGVjdCdcbiAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgXG4gICAgfSlcblxuICAgIGNvbnN0IHllYXJDaG9pY2UgPSAoeWVhciA9IDIwMTgpID0+IHtcbiAgICAgICAgcmV0dXJuIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3N2ID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5ZWFyLXNlbGVjdCcpXG4gICAgICAgICAgICBzZWxlY3QuaW5uZXJIVE1MID0geWVhclxuICAgICAgICAgICAgLy8gZ2V0IHN0YXRlc1xuICAgICAgICAgICAgc3RhdGUxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdC0xJykuaW5uZXJIVE1MXG4gICAgICAgICAgICBzdGF0ZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0LTInKS5pbm5lckhUTUxcblxuICAgICAgICAgICAgLy8gbWFrZSB0d28gbmV3IHBpZXNcbiAgICAgICAgICAgIGNvbnN0IHN2ZzEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN2Zy0xXCIpXG4gICAgICAgICAgICBjb25zdCBzdmcyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctMlwiKVxuICAgICAgICAgICAgc3ZnMS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZzEpXG4gICAgICAgICAgICBzdmcyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3ZnMilcbiAgICAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlMSwgVE9QX0xFVkVMLCAxLCBjc3YpXG4gICAgICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZTIsIFRPUF9MRVZFTCwgMiwgY3N2KVxuXG5cblxuICAgICAgICAgICAgY29uc3Qgc2lkZSA9IHBpZV9udW0gPT09IDEgPyBcIi1sZWZ0XCIgOiBcIi1yaWdodFwiXG4gICAgICAgICAgICAvLyBjb25zdCBoMiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ5ZWFyXCIgKyBzaWRlKVswXVxuICAgICAgICAgICAgLy8gaDIuaW5uZXJIVE1MID0geWVhclxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGVfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ3llYXItbGlzdCcpXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIHN0YXRlX2xpc3QuaWQgPSAneWVhci1saXN0J1xuXG4gICAgWUVBUlMuZm9yRWFjaCh5ZWFyID0+IHtcbiAgICAgICAgY29uc3QgeWVhcl9saXN0X2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBgLi9zcmMvYXNzZXRzL2RhdGEvRlkke3llYXJ9LVNUQy1EZXRhaWxlZC1UYWJsZS5jc3ZgKVxuICAgICAgICB5ZWFyX2xpc3RfaXRlbS5pbm5lckhUTUwgPSB5ZWFyXG4gICAgICAgIHllYXJfbGlzdF9pdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB5ZWFyQ2hvaWNlKHllYXIpKVxuICAgICAgICB5ZWFyX2xpc3QuYXBwZW5kQ2hpbGQoeWVhcl9saXN0X2l0ZW0pXG4gICAgfSlcbn0iLCJcbmltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3BpZV9jaGFydF9nZW5lcmF0b3InXG5pbXBvcnQgeyBwaWVMZWdlbmQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2xlZ2VuZCdcbmltcG9ydCB7IHNlbGVjdG9yLCBjdXN0b21TZWxlY3RvciwgVE9QX0xFVkVMIH0gZnJvbSAnLi9jb21wb25lbnRzL3NlbGVjdG9yJ1xuaW1wb3J0IHsgeWVhclNlbGVjdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3llYXJfc2VsZWN0b3InXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBcbiAgICAvLyBQQ0cgLT4gY3N2UGF0aCwgc2VjdG9yLCBhbW91dCwgbG9jYXRpb24sIG11bHRpcGxpZXIsIHNraXBcbiAgICBcbiAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpXG4gICAgLy8gY29uc3QgdWwgPSBwaWVMZWdlbmQoKVxuICAgIGNvbnN0IHVsID0gcGllTGVnZW5kKClcbiAgICBjb25zdCBzZWxlY3RfMSA9IGN1c3RvbVNlbGVjdG9yKDEpXG4gICAgY29uc3Qgc2VsZWN0XzIgPSBjdXN0b21TZWxlY3RvcigyKVxuICAgIGNvbnN0IHNlbGVjdG9yX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3Rvci1jb250YWluZXJcIilbMF1cbiAgICBcbiAgICBjb25zdCB5ZWFyU2VsZWN0b3IgPSB5ZWFyU2VsZWN0b3JcblxuICAgIHNlbGVjdG9yX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RfMSlcbiAgICBzZWxlY3Rvcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0XzIpXG4gICAgcm9vdC5hcHBlbmRDaGlsZCh1bClcblxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKFwiQWxhYmFtYVwiLCBUT1BfTEVWRUwsIDEpXG4gICAgUGllQ2hhcnRHZW5lcmF0b3IoXCJXeW9taW5nXCIsIFRPUF9MRVZFTCwgMilcbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9