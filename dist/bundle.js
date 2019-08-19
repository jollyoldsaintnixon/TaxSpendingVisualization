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
    var STATE_NAMES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZXZlbnRfaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaGVscGVyX2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BpZV9sZWdlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc3RhdGVfc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMveWVhcl9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9hcHAuc2NzcyJdLCJuYW1lcyI6WyJzdWJEYXRhIiwiY29udGFpbmVyX2FycmF5IiwicGllX251bSIsImVsZSIsInRheF90eXBlIiwiZGF0YSIsImtleSIsInN1Yl9hcnJheSIsInN1YkFycmF5TG9jYXRvciIsInRheF9zdGFjayIsImtleXMiLCJmb3JFYWNoIiwic3ViX3RheCIsImkiLCJwdXNoIiwiYW1vdW50Iiwid2lkdGgiLCJoZWlnaHQiLCJ0b29sdGlwV2lkdGgiLCJ0b29sdGlwSGVpZ2h0Iiwic3ZnIiwiZDMiLCJzZWxlY3QiLCJhcHBlbmQiLCJhdHRyIiwic3RhY2siLCJvcmRlciIsInN0YWNrT3JkZXJOb25lIiwib2Zmc2V0Iiwic3RhY2tPZmZzZXROb25lIiwibGF5ZXJzIiwieCIsInNjYWxlQmFuZCIsInJhbmdlIiwicGFkZGluZyIsInkiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsIm1hcCIsIm1heCIsImQiLCJ5MCIsImciLCJzZWxlY3RBbGwiLCJlbnRlciIsInJlY3QiLCJvbiIsInRvb2x0aXAiLCJzdHlsZSIsInhQb3MiLCJtb3VzZSIsInlQb3MiLCJ0ZXh0IiwicGVyY2VudCIsImNzc1N1YkRhdGFEaXNwbGF5IiwicmVtb3ZlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInRvdGFsIiwib2JqIiwicm9vdCIsInVsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImlkIiwibGkiLCJwZXJjZW50X29mX3RvdGFsIiwiYXBwZW5kQ2hpbGQiLCJncm91cFRvdGFsIiwiYXJyYXkiLCJhc3NpZ25Cb3giLCJhcnJheV9vZl9vYmpzIiwic2lkZSIsImJveCIsImRlY2ltYWxzIiwiU3RyaW5nIiwic3BsaXQiLCJpbnRlZ2VycyIsInNsaWNlZCIsInNsaWNlIiwiaW5uZXJIVE1MIiwiZmluZEFtb3VudCIsImpvaW4iLCJidWRnZXRDaXJjbGUiLCJkYXR1bTEiLCJkYXR1bTIiLCJjaXJjbGVEaXYiLCJkaXNwbGF5IiwicnNjYWxlIiwiUGllQ2hhcnRHZW5lcmF0b3IiLCJDT0xPUlMiLCJMQUJFTFMiLCJzdGF0ZSIsImNzdiIsInJlbW92ZTIiLCJkaXYiLCJoMSIsInNwYW4iLCJoMiIsIlRPVEFMIiwiVFlQRVMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJyYWRpdXMiLCJjb2xvcnMiLCJzY2FsZU9yZGluYWwiLCJzY2hlbWVEYXJrMiIsImFyYyIsIm91dGVyUmFkaXVzIiwiaW5uZXJSYWRpdXMiLCJwaWUiLCJ2YWx1ZSIsInRoZW4iLCJzYWxlc190YXhlcyIsImxpY2Vuc2VfdGF4ZXMiLCJpbmNvbWVfdGF4ZXMiLCJvdGhlcl90YXhlcyIsIkdlb19OYW1lIiwiaXRlbSIsIkFNT1VOVCIsInRheF9vYmoiLCJUYXhfVHlwZSIsImluY2x1ZGVzIiwiZm9ybWF0IiwicGF0aCIsInRyYW5zaXRpb24iLCJlYXNlIiwiZWFzZUxpbmVhciIsImR1cmF0aW9uIiwiYXR0clR3ZWVuIiwicGllVHdlZW4iLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlcnJvciIsImIiLCJpbnRlcnBvbGF0ZSIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsInQiLCJwaWVMZWdlbmQiLCJtYXN0ZXJfbGlzdCIsImxlZnRfbGlzdCIsInRleHRfbGlzdCIsInJpZ2h0X2xpc3QiLCJsZW5ndGgiLCJsZWZ0X2JveCIsInRleHRfYm94IiwicmlnaHRfYm94IiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXIiLCJzdWJsaXN0cyIsImxhYmVsIiwibGlzdHMiLCJsZXN0bGlzdCIsInRleHRsaXN0IiwicmlnaHRsaXN0IiwibGVmdEJveCIsInJpZ2h0Qm94Iiwic3VibGlzdCIsIlRPUF9MRVZFTCIsIlNUQVRFX05BTUVTIiwic2VsZWN0b3IiLCJzZXRBdHRyaWJ1dGUiLCJzdGF0ZVNlbGVjdG9yIiwiZSIsInRhcmdldCIsImRlZmF1bHRfc3RhdGUiLCJvcHRpb24iLCJhZGRFdmVudExpc3RlbmVyIiwicGhhc2VPdXQiLCJub2RlIiwic3RhdGVfc2VsZWN0b3IiLCJ3cmFwcGVyIiwidG9nZ2xlIiwiaW5uZXJUZXh0Iiwic3RhdGVfbGlzdCIsInN0YXRlX2xpc3RfaXRlbSIsIllFQVJTIiwieWVhclNlbGVjdG9yIiwieWVhciIsInllYXJDaG9pY2UiLCJzdGF0ZTEiLCJzdGF0ZTIiLCJzdmcxIiwic3ZnMiIsInllYXJfbGlzdF9pdGVtIiwieWVhcl9saXN0Iiwic2VsZWN0XzEiLCJzZWxlY3RfMiIsInNlbGVjdG9yX2NvbnRhaW5lciIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNB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QjtBQUNBd0gsd0JBQWdCZCxZQUFoQixDQUE2QixPQUE3QiwyQkFBNkRpQixJQUE3RDtBQUNBTSx1QkFBZTlHLFNBQWYsR0FBMkJ3RyxJQUEzQjtBQUNBTSx1QkFBZWpCLGdCQUFmLENBQWdDLE9BQWhDLEVBQXlDWSxXQUFXRCxJQUFYLENBQXpDO0FBQ0FPLGtCQUFVNUgsV0FBVixDQUFzQjJILGNBQXRCO0FBQ0gsS0FORDtBQU9ILENBOUNNLEM7Ozs7Ozs7Ozs7Ozs7O0FDRFA7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUF6SSxTQUFTd0gsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07O0FBRWhEOztBQUVBLFFBQU1sSCxPQUFPTixTQUFTQyxjQUFULENBQXdCLE1BQXhCLENBQWI7QUFDQTtBQUNBLFFBQU1NLEtBQUssNEJBQVg7QUFDQSxRQUFNb0ksV0FBVyxvQ0FBZSxDQUFmLENBQWpCO0FBQ0EsUUFBTUMsV0FBVyxvQ0FBZSxDQUFmLENBQWpCO0FBQ0EsUUFBTUMscUJBQXFCN0ksU0FBUzhJLHNCQUFULENBQWdDLG9CQUFoQyxFQUFzRCxDQUF0RCxDQUEzQjs7QUFFQSxRQUFNWixlQUFlQSxZQUFyQjs7QUFFQVcsdUJBQW1CL0gsV0FBbkIsQ0FBK0I2SCxRQUEvQjtBQUNBRSx1QkFBbUIvSCxXQUFuQixDQUErQjhILFFBQS9CO0FBQ0F0SSxTQUFLUSxXQUFMLENBQWlCUCxFQUFqQjs7QUFFQSxnREFBa0IsU0FBbEIsRUFBNkJ3Ryx5QkFBN0IsRUFBd0MsQ0FBeEM7QUFDQSxnREFBa0IsU0FBbEIsRUFBNkJBLHlCQUE3QixFQUF3QyxDQUF4QztBQUNILENBbkJELEU7Ozs7Ozs7Ozs7O0FDUEEsdUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBjb250YWluZXJfYXJyYXkucHVzaChzYWxlc190YXhlcylcbi8vIGNvbnRhaW5lcl9hcnJheS5wdXNoKGxpY2Vuc2VfdGF4ZXMpXG4vLyBjb250YWluZXJfYXJyYXkucHVzaChpbmNvbWVfdGF4ZXMpXG4vLyBjb250YWluZXJfYXJyYXkucHVzaChvdGhlcl90YXhlcylcblxuZXhwb3J0IGNvbnN0IHN1YkRhdGEgPSAoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSA9PiB7XG4gICAgLy8gYSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBsZWFybmVkIGZyb20gTWljaGFlbCBTdGFuYWxhbmQncyBcIlN0YWNrZWQgYmFyIGNoYXJ0IHdpdGggdG9vbHRpcHNcIiB0dXRvcmlhbCBhdCBodHRwOi8vYmwub2Nrcy5vcmcvbXN0YW5hbGFuZC82MTAwNzEzXG4gICAgcmV0dXJuIChlbGUpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRheF90eXBlID0gZWxlLmRhdGEua2V5XG5cbiAgICAgICAgY29uc3Qgc3ViX2FycmF5ID0gc3ViQXJyYXlMb2NhdG9yKHRheF90eXBlLCBjb250YWluZXJfYXJyYXkpXG5cbiAgICAgICAgLy8gc2V0dGluZyB1cCB0aGUgdGF4IHN0YWNrIHRvIGNvbXBseSB3aXRoIGQzIHY1XG4gICAgICAgIGxldCB0YXhfc3RhY2sgPSB7IFxuICAgICAgICAgICAgdGF4X3R5cGU6IHRheF90eXBlLFxuICAgICAgICB9XG4gICAgICAgIC8vIHNldHRpbmcgdXAga2V5c1xuICAgICAgICBsZXQga2V5cyA9IFtdXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKChzdWJfdGF4LCBpKSA9PiB7XG4gICAgICAgICAgICBrZXlzLnB1c2goc3ViX3RheC5rZXkpXG4gICAgICAgICAgICB0YXhfc3RhY2tbc3ViX3RheC5rZXldID0gc3ViX3RheC5hbW91bnRcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBjb25zdCB3aWR0aCA9IDkwICAvLyBzZXR0aW5nIHRoZSBkaW1lbnNpb25zIHRvIGNvcnJlc3BvbmQgdG8gdGhlIHBpZSBjaGFydHMnXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDYwMFxuXG4gICAgICAgIGNvbnN0IHRvb2x0aXBXaWR0aCA9IDEyMCAvLyB3aWxsIGFsdGVyIHRoZXNlIGFzIG5lZWRlZFxuICAgICAgICBjb25zdCB0b29sdGlwSGVpZ2h0ID0gNDAgXG5cbiAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwibWFpblwiKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAgICAgLmFwcGVuZChcImdcIilcblxuICAgICAgICAvLyBzZXQgdGhlIGxheWVycyBvZiB0aGUgc3RhY2tlZCBiYXJcbiAgICAgICAgLy8gY29uc3QgbGF5ZXJzID0gZDMuc3RhY2soKShbdGF4X3R5cGVdLm1hcCh0YXggPT4geyAgLy8gc2hvdWxkIHVsdGltYXRlbHkganVzdCBiZSB0aGUgb25lIGxheWVyXG4gICAgICAgIC8vICAgICByZXR1cm4gc3ViX2FycmF5Lm1hcChkID0+IHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4geyB4OiBkLmtleSwgeTogZC5hbW91bnQsIHBlcmNlbnQ6IGQucGVyY2VudCB9XG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyB9KSlcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBkMy5zdGFjaygpXG4gICAgICAgICAgICAua2V5cyhrZXlzKVxuICAgICAgICAgICAgLm9yZGVyKGQzLnN0YWNrT3JkZXJOb25lKVxuICAgICAgICAgICAgLm9mZnNldChkMy5zdGFja09mZnNldE5vbmUpXG5cbiAgICAgICAgY29uc3QgbGF5ZXJzID0gc3RhY2soc3ViX2FycmF5KVxuXG4gICAgICAgIC8vIGNvbnN0IHggPSBkMy5zY2FsZU9yZGluYWwoKVxuICAgICAgICAvLyAgICAgLmRvbWFpbihsYXllcnNbMF0ubWFwKGQgPT4gZC54KSlcbiAgICAgICAgLy8gICAgIC8vIC5yYW5nZShbMTAsIHdpZHRoXSwgMCkgIC8vIG1heSBiZSBhIHF1aWNrZXIgd2F5IHRvIGRvIHRoaXMgYXMgdGhlcmUgaXMgb25seSBvbmUgYmFyXG4gICAgICAgIC8vICAgICAucmFuZ2UoW3dpZHRoXSlcbiAgICAgICAgY29uc3QgeCA9IGQzLnNjYWxlQmFuZCgpXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAgICAgICAgIC5wYWRkaW5nKDAuMSlcblxuICAgICAgICBjb25zdCB5ID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihsYXllcnNbMF0ubWFwKGQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkMy5tYXgoZCwgZCA9PiBkLnkwICsgZC55KSAgLy8gdGhlIGluY3JlbWVudCB1cCB0byB0aGUgdG90YWxcbiAgICAgICAgICAgIH0pKS5yYW5nZShbaGVpZ2h0LCAwXSlcblxuICAgICAgICBjb25zdCBnID0gc3ZnLnNlbGVjdEFsbChcIi5zdWItdGF4ZXNcIikgIC8vIG5vIGcgYXQgdGhpcyBwb2ludCwgYnV0IHRoZXkgd2lsbCBoYXZlIHRoaXMgY2xhc3NcbiAgICAgICAgICAgIC5kYXRhKGxheWVycykuZW50ZXIoKSAgLy8gbm93IHRoZXJlIHdpbGwgYmUgYSBnIGZvciBldmVyeSBvYmogaW4gc3ViX2FycmF5LiAgc2hvdWxkIGJlIGp1c3Qgb25lIGdcbiAgICAgICAgICAgIC5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBcInN1Yi10YXhlc1wiKSAgXG4gICAgICAgICAgICBcbiAgICAgICAgY29uc3QgcmVjdCA9IGcuc2VsZWN0QWxsKFwicmVjdFwiKSAgLy8gbWFraW5nIGVhY2ggb2JqIG9mIHRoZSBjb3JyZXNwb25kIHRvIGEgcmVjdCB3aXRoaW4gdGhlIGdcbiAgICAgICAgICAgIC5kYXRhKGQgPT4gZCkgLy8gcHVsbGluZyBvdXQgZWFjaCBpbmRpdmlkdWFsIG9ialxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCBkID0+IHgoZC54KSkgIC8vIHBhc3NpbmcgZWFjaCBvYmoncyB4IHZhbHVlIHRvIHRoZSBkMyB4IGZ1bmN0aW9uIGRlZmluZWQgYWJvdmVcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZCA9PiB5KGQueSArIGQueTApKSAgLy8geTAgaXMgdGhlIGhlaWdodCB3aGVyZSBlYWNoIHNlZ21lbnQgaW4gdGhlIHN0YWNrIHN0YXJ0c1xuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgeC5yYW5nZSgpKSAgLy8gcHJvYmFibHkgY2FuIGhhcmQgY29kZSwgc2luY2Ugb25seSBvbmUgYmFyXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgZCA9PiB5KGQueTApIC0geShkLnkwICsgZC55KSkgIC8vIGhlaWdodCBpcyBzZXQgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IHBsdXMgdGhlIGhlaWdodCwgYW5kIGFsbCB0aGF0IHN1YnRyYWN0ZWQgZnJvbSB0aGUgc3RhcnRpbmcgcG9pbnQgZHVlIHRvIHkgdmFsdWVzIGJlZ2luaW5nIGF0IHRvcCBvZiBzY3JlZW5cbiAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgKCkgPT4gdG9vbHRpcC5zdHlsZShcImRpc3BsYXlcIiwgdHJ1ZSkpICAvLyB3YW50IHRoZSBpbmZvIGJveCB0byBzd2l0Y2ggYmV0d2VlbiB2aXNpYmxlIGFuZCBpbml2aXMgYmFzZWQgb24gbW91c2VvdmVyXG4gICAgICAgICAgICAub24oJ21vdXNlb3V0JywgKCkgPT4gdG9vbHRpcC5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpKVxuICAgICAgICAgICAgLm9uKCdtb3VzZW1vdmUnLCBkID0+IHsgIC8vIHRoaXMgaXMgZ29pbmcgdG8gYmUgYSBzd2VldCBlZmZlY3QhXG4gICAgICAgICAgICAgICAgY29uc3QgeFBvcyA9IGQzLm1vdXNlKHRoaXMpWzBdIC0gKHRvb2x0aXBXaWR0aCAvIDIpIC8vIHRoaXNbMF0gY29ycmVzcG9uZHMgdG8gbW91c2UncyB4IHBvcywgYW5kIHB1c2hpbmcgaXQgbGVmdCBieSBoYWxmIG9mIHRoZSB0b29sdGlwJ3Mgd2lkdGggZW5zdXJlIGl0IGlzIGNlbnRlcmVkXG4gICAgICAgICAgICAgICAgY29uc3QgeVBvcyA9IGQzLm1vdXNlKHRoaXMpWzFdIC0gMjUgLy8gcHV0cyB0aGUgdG9vbHRpcCB1cCBhIGJpdCBhYm92ZSB0aGUgY3Vyc29yXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgeFBvcyArICcsJyArIHlQb3MgKyAnKScpXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5zZWxlY3QoJ3RleHQnKS50ZXh0KGQucGVyY2VudCkgLy8gc2hvd3MgdGhlIHBlcmNlbnQgIFxuICAgICAgICAgICAgfSlcblxuICAgICAgICBjb25zdCB0b29sdGlwID0gc3ZnLmFwcGVuZCgnZycpIC8vIHNldHRpbmcgdXAgdGhpcyBzd2VldCB0b29sdGlwLiBFeGNpdGluZyFcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdWItZGF0YS10b29sdGlwIHRvb2x0aXAnKS5zdHlsZSgnZGlzcGxheScsICdub25lJykgLy8gc3RhcnRzIGludmlzaWJsZVxuICAgICAgICAgICAgLy8gYWRkaW5nIHRoZSBkaW1lbnNpb25zIG9mIHRoZSBib3hcbiAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKS5hdHRyKCd3aWR0aCcsIHRvb2x0aXBXaWR0aClcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0b29sdGlwSGVpZ2h0KS5hdHRyKCdmaWxsJywgJ3doaXRlJykuc3R5bGUoJ29wYWNpdHknLCAwLjUpIC8vIG1ha2luZyBpdCBwYXJ0aWFsbHkgc2VlLXRocm91Z2hcbiAgICAgICAgICAgIC8vIGFkZGluZyB0aGUgdGV4dCBjb250ZW50XG4gICAgICAgICAgICAuYXBwZW5kKCd0ZXh0JykuYXR0cigneCcsIDE1KVxuICAgICAgICAgICAgLmF0dHIoJ2R5JywgJy44ZW0nKS5zdHlsZSgndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICB9XG4gICAgXG59XG5cbmNvbnN0IHN1YkFycmF5TG9jYXRvciA9ICh0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KSA9PiB7ICAvLyBoZWxwZXIgZnVuY3Rpb24gZm9yIGZpbmRpbmcgdGhlIHJpZ2h0IHN1YiBhcnJheS4gQSBiaXQgaGFyZC1jb2RlZC5cbiAgICBzd2l0Y2ggKHRheF90eXBlKSB7XG4gICAgICAgIGNhc2UgXCJTYWxlcyBhbmQgR3Jvc3MgUmVjZWlwdHMgVGF4ZXNcIjpcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbMF1cbiAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjogXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzFdXG4gICAgICAgIGNhc2UgXCJJbmNvbWUgVGF4ZXNcIjogXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyX2FycmF5WzJdXG4gICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOiBcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJfYXJyYXlbM11cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBjc3NTdWJEYXRhRGlzcGxheSA9IChjb250YWluZXJfYXJyYXksIHBpZV9udW0pID0+IHtcblxuICAgIGNvbnN0IHdpZHRoID0gOTAgIC8vIHNldHRpbmcgdGhlIGRpbWVuc2lvbnMgdG8gY29ycmVzcG9uZCB0byB0aGUgcGllIGNoYXJ0cydcbiAgICBjb25zdCBoZWlnaHQgPSA2MDBcblxuICAgIHJldHVybiAoZWxlKSA9PiB7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWItZGF0YS1saXN0LVwiICsgcGllX251bSlcbiAgICAgICAgcmVtb3ZlID8gcmVtb3ZlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocmVtb3ZlKSA6IG51bGxcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRheF90eXBlID0gZWxlLmRhdGEua2V5XG4gICAgICAgIGNvbnN0IHN1Yl9hcnJheSA9IHN1YkFycmF5TG9jYXRvcih0YXhfdHlwZSwgY29udGFpbmVyX2FycmF5KSAvLyBnZXQgcmlnaHQgc3ViX2FycmF5XG4gICAgICAgIC8vIGNvbnN0IGdyb3VwVG90YWwgPSBncm91cFRvdGFsKHN1Yl9hcnJheSkgLy8gbm90IHN1cmUgd2h5IHRoaXMgaXMgbm90IGludm9raW5nIHRoZSBmdW5jaXRvbiBiZWxvd1xuICAgICAgICBsZXQgdG90YWwgPSAwXG4gICAgICAgIHN1Yl9hcnJheS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICB0b3RhbCArPSBvYmouYW1vdW50XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpIC8vIGdyYWIgdGhlIHJvb3QgdG8gYXR0YWNoIGxhdGVyXG5cbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIikgLy8gc2V0IHVwIHVsIGNvbnRhaW5lclxuICAgICAgICB1bC5jbGFzc0xpc3QuYWRkKFwic3ViLWRhdGEtbGlzdC1cIiArIHBpZV9udW0pXG4gICAgICAgIHVsLmlkID0gKFwic3ViLWRhdGEtbGlzdC1cIiArIHBpZV9udW0pXG5cbiAgICAgICAgc3ViX2FycmF5LmZvckVhY2goc3ViX3RheCA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgIGxpLnN0eWxlLmhlaWdodCA9IChzdWJfdGF4LnBlcmNlbnRfb2ZfdG90YWwgKiA2KSArICdweCdcbiAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKVxuICAgICAgICB9KTtcblxuICAgICAgICByb290LmFwcGVuZENoaWxkKHVsKVxuICAgIH1cbn1cblxuY29uc3QgZ3JvdXBUb3RhbCA9IGFycmF5ID0+IHtcbiAgICBsZXQgdG90YWwgPSAwXG4gICAgYXJyYXkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICB0b3RhbCArPSBvYmouYW1vdW50XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvdGFsXG59IiwiXG5cbmV4cG9ydCBjb25zdCBhc3NpZ25Cb3ggPSAoYXJyYXlfb2Zfb2JqcywgcGllX251bSkgPT4ge1xuICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gJ2xlZnQtYm94LScgOiAncmlnaHQtYm94LSdcbiAgICBhcnJheV9vZl9vYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IGkgPSA0O1xuICAgICAgICBzd2l0Y2ggKG9iai5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJPdGhlciBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAwIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkluY29tZSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAxIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxpY2Vuc2UgVGF4ZXNcIjpcbiAgICAgICAgICAgICAgICBpID0gMiBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQcm9wZXJ0eSBUYXhlc1wiOlxuICAgICAgICAgICAgICAgIGkgPSAzIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNpZGUgKyBpKVxuICAgICAgICBjb25zdCBkZWNpbWFscyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVsxXVxuICAgICAgICBjb25zdCBpbnRlZ2VycyA9IFN0cmluZyhvYmoucGVyY2VudCkuc3BsaXQoJy4nKVswXVxuICAgICAgICBjb25zdCBzbGljZWQgPSBvYmoucGVyY2VudCA/IGludGVnZXJzICsgJy4nICsgZGVjaW1hbHMuc2xpY2UoMCwgMikgOiAwXG4gICAgICAgIGJveC5pbm5lckhUTUwgPSBzbGljZWQgKyAnJSdcbiAgICB9KTtcbn1cblxuLy8gZC5BTU9VTlQgPT09ICdYJyA/IDAgOiBkLkFNT1VOVC5zcGxpdCgnLCcpLmpvaW4oJycpICogMTAwMCxcbmV4cG9ydCBjb25zdCBmaW5kQW1vdW50ID0gKGFtb3VudCkgPT4ge1xuICAgIHJldHVybiBhbW91bnQgPT09ICdYJyA/IDAgOiBhbW91bnQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDBcbn1cblxuLy8gZXhwb3J0IGNvbnN0IHN1YkRhdGFQdXNoZXIgPSAoaXRlbSkgPT4ge1xuLy8gICAgIGlmIChpdGVtICE9IFwiVDAwXCIgJiYgaXRlbSAhPSBcIlQwMVwiKSB7XG4vLyAgICAgICAgIHN3aXRjaCAoaXRlbS5zbGljZSgwLCAyKSkge1xuLy8gICAgICAgICAgICAgY2FzZSAoXCJUMFwiIHx8IFwiVDFcIik6XG4vLyAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh7XG4vLyAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbi8vICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBmaW5kQW1vdW50KGQuQU1PVU5UKSxcbi8vICAgICAgICAgICAgICAgICAgICAgcGVyY2VudDogKGZpbmRBbW91bnQoZC5BTU9VTlQpIC8gVE9UQUwpICogMTAwXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbiAgICBcbi8vICAgICAgICAgICAgIGNhc2UgXCJUMlwiOlxuLy8gICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh7XG4gICAgXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1cblxuZXhwb3J0IGNvbnN0IGJ1ZGdldENpcmNsZSA9IChkYXR1bTEpID0+IHtcbiAgICAvLyBiYXNlZCBvbiBNYXR0aGV3IE1jS2VubmEncyBleGFtcGxlIGF0IGh0dHA6Ly9ibC5vY2tzLm9yZy9tcG1ja2VubmE4L3Jhdy81NjY1MDlkZDNkOWEwOGU1ZjliMi9cbiAgICBkZWJ1Z2dlclxuICAgIHJldHVybiBkYXR1bTIgPT4ge1xuICAgICAgICBkZWJ1Z2dlclxuICAgICAgICBkYXRhID0gW2RhdHVtMSwgZGF0dW0yXVxuXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDEwMFxuICAgICAgICBjb25zdCB3aWR0aCA9IDEwMDBcbiAgICBcbiAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JylcbiAgICAgICAgY29uc3QgY2lyY2xlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICBjaXJjbGVEaXYuY2xhc3NMaXN0LmFkZChcImNpcmNsZS1jb250YWluZXJcIilcbiAgICAgICAgY2lyY2xlRGl2LmlkID0gXCJjaXJjbGUtY29udGFpbmVyXCJcbiAgICAgICAgY2lyY2xlRGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbiAgICAgICAgY2lyY2xlRGl2LnN0eWxlLmhlaWdodCA9IGhlaWdodFxuICAgICAgICBjaXJjbGVEaXYuc3R5bGUud2lkdGggPSB3aWR0aFxuICAgICAgICByb290LmFwcGVuZENoaWxkKGNpcmNsZURpdilcbiAgICBcbiAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KCcjY2lyY2xlLWNvbnRhaW5lcicpLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpLmF0dHIoJ2hlaWdodCcsIGhlaWdodCkuYXR0cignY2xhc3MnLCAnY2lyY2xlLXN2ZycpO1xuICAgIFxuICAgICAgICBjb25zdCByc2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCAoZDMubWF4KGRhdGEpKSBdKVxuICAgICAgICAgICAgLnJhbmdlKFszLCAyMF0pXG4gICAgXG4gICAgICAgIHN2Zy5zZWxlY3RBbGwoJy5jaXJjbGVzJykuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByc2NhbGUoZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlcycpLmF0dHIoJ2N5JywgaGVpZ2h0IC8gMilcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIChkLCBpKSA9PiAyMCArIDQwICogaSlcbiAgICB9XG59IiwiLy8gQSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBiYXNlZCBoZWF2aWx5IG9mZiBvZiBLYXJ0aGlrIFRob3RhJ3MgeW91dHViZSB0dXRvcmlhbCBcIkludHJvZHVjdGlvbiB0byBkMy5qcyA9IFBpZSBDaGFydCBhbmQgRG9udXQgQ2hhcnRcIlxuLy8gVGhlIGxlZ2VuZCBjb2RlIHdhcyBmcm9tIENyeXB0ZXJzIEluZm90ZWNoJ3MgeW91dHViZSB0dXRvcmlhbCBcIlBpZSBDaGFydCB1c2luZyBEMy5qc1wiXG5cbmltcG9ydCB7IGFzc2lnbkJveCwgZmluZEFtb3VudCwgYnVkZ2V0Q2lyY2xlIH0gZnJvbSAnLi9oZWxwZXJfZnVuY3Rpb25zJ1xuaW1wb3J0IHsgc3ViRGF0YSwgY3NzU3ViRGF0YURpc3BsYXkgfSBmcm9tICcuL2V2ZW50X2hhbmRsZXJzJ1xuXG5leHBvcnQgY29uc3QgQ09MT1JTID0gW1wiI2E2NzUxZVwiLCBcIiNlN2FiMDRcIiwgXCIjNjZhNTFlXCIsIFwiIzc0NzBiM1wiLCBcIiNlODJiOGFcIl1cbi8vIGV4cG9ydCBjb25zdCBMQUJFTFMgPSBbXCJQcm9wZXJ0eSBUYXhlc1wiLCBcIlNhbGVzIGFuZCBHcm9zcyBSZWNlaXB0cyBUYXhlc1wiLCBcIkxpY2Vuc2UgVGF4ZXNcIiwgXCJJbmNvbWUgVGF4ZXNcIiwgXCJPdGhlciBUYXhlc1wiXVxuZXhwb3J0IGNvbnN0IExBQkVMUyA9IFtcIk90aGVyIFRheGVzXCIsIFwiSW5jb21lIFRheGVzXCIsIFwiTGljZW5zZSBUYXhlc1wiLCBcIlByb3BlcnR5IFRheGVzXCIsIFwiU2FsZXMgVGF4ZXNcIl1cbi8vIGV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihjc3ZQYXRoLCBzZWN0b3IsIGFtb3VudCwgc3RhdGUsIG11bHRpcGxpZXIgPSAxLCBza2lwID0gMSkge1xuZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCB0YXhfdHlwZSwgcGllX251bSwgY3N2ID0gXCJGWTIwMTgtU1RDLURldGFpbGVkLVRhYmxlXCIpIHtcblxuICAgIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YWxzLVwiICsgcGllX251bSlcbiAgICByZW1vdmUgPyByZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZW1vdmUpIDogbnVsbFxuXG4gICAgY29uc3QgcmVtb3ZlMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YWxzLVwiICsgcGllX251bSlcbiAgICByZW1vdmUyID8gcmVtb3ZlMi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlbW92ZTIpIDogbnVsbFxuXG5cbiAgICBjb25zdCBkaXYgPSBkMy5zZWxlY3QoXCIjdG90YWxzXCIpXG4gICAgICAgIC5hcHBlbmQoXCJkaXZcIilcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInRvdGFscy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwiaWRcIiwgXCJ0b3RhbHMtXCIgKyBwaWVfbnVtKVxuXG4gICAgY29uc3QgaDEgPSBkaXZcbiAgICAgICAgLmFwcGVuZChcImgxXCIpXG4gICAgICAgIC8vIC5hdHRyKCdpZCcsICdyZXZlbnVlLScgKyBwaWVfbnVtKVxuXG4gICAgY29uc3Qgc3BhbiA9IGRpdlxuICAgICAgICAuYXBwZW5kKFwic3BhblwiKVxuXG4gICAgY29uc3QgaDIgPSBkMy5zZWxlY3QoXCIjZGV0YWlsc1wiKVxuICAgICAgICAuYXBwZW5kKFwiaDJcIilcbiAgICAgICAgLy8gLmF0dHIoJ2lkJywgJ3BlcmNlbnQtJyArIHBpZV9udW0pXG5cbiAgICBsZXQgVE9UQUwgPSAwO1xuICAgIGxldCBUWVBFUyA9IFtdXG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cblxuXG4gICAgY29uc3QgY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKGQzLnNjaGVtZURhcmsyKTtcblxuICAgIC8vIGFyYyBnZW5lcmF0b3JcbiAgICBjb25zdCBhcmMgPSBkMy5hcmMoKVxuICAgICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gMTApXG4gICAgICAgIC8vIC5pbm5lclJhZGl1cygwKTsgLy8gZm9yIGNpcmNsZVxuICAgICAgICAuaW5uZXJSYWRpdXMocmFkaXVzIC0gMTAwKSAvLyBmb3IgZG9udXRcblxuICAgIC8vIGNvbnN0IGxhYmxlQXJjID0gZDMuYXJjKClcbiAgICAvLyAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDUwKVxuICAgIC8vICAgICAuaW5uZXJSYWRpdXMocmFkaXVzIC0gNTApO1xuXG4gICAgLy8gcGllIGdlbmVyYXRvclxuICAgIGNvbnN0IHBpZSA9IGQzLnBpZSgpXG4gICAgICAgIC8vIC5zb3J0KG51bGwpXG4gICAgICAgIC52YWx1ZShkID0+IGQuYW1vdW50KTtcblxuICAgIC8vIGRlZmluZSBzdmcgXG4gICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwiLnBpZS1cIiArIHBpZV9udW0pLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAuYXR0cihcImlkXCIsIFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInN2Zy1cIiArIHBpZV9udW0pXG4gICAgICAgIC5hdHRyKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgd2lkdGggLyAyICsgXCIsXCIgKyBoZWlnaHQgLyAyICsgXCIpXCIpXG5cbiAgICAvLyBpbXBvcnQgZGF0YVxuICAgIGQzLmNzdihjc3YpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBhcnJheXMgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIHN1YiBsZXZlbCB0YXggZGF0YVxuICAgICAgICBsZXQgc2FsZXNfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgbGljZW5zZV90YXhlcyA9IFtdXG4gICAgICAgIGxldCBpbmNvbWVfdGF4ZXMgPSBbXVxuICAgICAgICBsZXQgb3RoZXJfdGF4ZXMgPSBbXVxuICAgICAgICAvLyBsZXQgc2FsZXNfdGF4X29iaiA9IHsgdGF4X2dyb3VwOiBMQUJFTFNbNF0gfVxuICAgICAgICAvLyBwYXJzZSB0aGUgY3N2XG4gICAgICAgIGRhdGEuZm9yRWFjaCgoZCwgaSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZC5HZW9fTmFtZSA9PT0gc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5pdGVtID09PSBcIlQwMFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIFRPVEFMID0gZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKSAqIDEwMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gIT0gXCJUMDBcIiAmJiBkLml0ZW0gIT0gXCJUMDFcIikgeyAgLy8gZG9uJ3Qgd2FudCB0byBjYXRjaCBUb3RhbCBvciBQcm9wZXJ0eSBUYXhlc1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGF4X29iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogZmluZEFtb3VudChkLkFNT1VOVCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50X29mX3RvdGFsOiAoZmluZEFtb3VudChkLkFNT1VOVCkgLyBUT1RBTCkgKiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGQuaXRlbS5zbGljZSgwLDIpKSB7IC8vIGZpbGwgdXAgc3ViIGFycmF5c1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQwXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh0YXhfb2JqKSAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNhbGVzX3RheF9vYmpbZC5UYXhfVHlwZV0gPSBmaW5kQW1vdW50KGQuQU1PVU5UKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQxXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FsZXNfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQyXCI6IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpY2Vuc2VfdGF4ZXMucHVzaCh0YXhfb2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlQ0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jb21lX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUNVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJUOVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyX3RheGVzLnB1c2godGF4X29iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0YXhfdHlwZS5pbmNsdWRlcyhkLml0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLml0ZW0gIT0gJ1QwMCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRZUEVTLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogZC5UYXhfVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGZpbmRBbW91bnQoZC5BTU9VTlQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnQ6ICgoZmluZEFtb3VudChkLkFNT1VOVCkpIC8gVE9UQUwpICogMTAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkLmtleSA9IGQuVGF4X1R5cGU7XG4gICAgICAgICAgICAgICAgICAgIGQuYW1vdW50ID0gZmluZEFtb3VudChkLkFNT1VOVCk7XG4gICAgICAgICAgICAgICAgICAgIGQucGVyY2VudCA9ICgoZmluZEFtb3VudChkLkFNT1VOVCkpIC8gVE9UQUwpICogMTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcl9hcnJheSA9IFtdICAvLyBzZXR0aW5nIHVwIGNvbnRhaW5lciBhcnJheSBmb3IgcGFzc2luZyBpbnRvIGNsaWNrIGhhbmRsZXJcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2goc2FsZXNfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKGxpY2Vuc2VfdGF4ZXMpXG4gICAgICAgIGNvbnRhaW5lcl9hcnJheS5wdXNoKGluY29tZV90YXhlcylcbiAgICAgICAgY29udGFpbmVyX2FycmF5LnB1c2gob3RoZXJfdGF4ZXMpXG4gICAgICAgIC8vIHNldCBoMSBhZnRlciB0b3RhbCBoYXMgYmVlbiBkZWZpbmVkXG4gICAgICAgIGgxLnRleHQoc3RhdGUgKyBcIidzIHRheCByZXZlbnVlIGZvciAyMDE4IHdhcyBcIilcbiAgICAgICAgc3Bhbi50ZXh0KFwiJFwiICsgZDMuZm9ybWF0KCcsJykoVE9UQUwpKVxuICAgICAgICBoMi50ZXh0KFwiXCIpXG4gICAgICAgIC8vIGF0dGVtcHQgYnVkZ2V0Q2lyY2xlIGNhbGxcbiAgICAgICAgYnVkZ2V0Q2lyY2xlKFRPVEFMKVxuICAgICAgICAvLyBzZXQgdXAgdGhlIHBlcmNlbnRhZ2VzIGluIHRoZSBjZW50ZXIgYm94XG4gICAgICAgIGFzc2lnbkJveChUWVBFUywgcGllX251bSlcblxuICAgICAgICBjb25zdCBnID0gc3ZnLnNlbGVjdEFsbChcIi5hcmNcIilcbiAgICAgICAgICAgIC5kYXRhKHBpZShkYXRhKSlcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcImdcIikgIC8vIEFuZCB0aGlzIGxpbmUgdG8gZ3JvdyB0aGUgbnVtYmVyIG9mIGcncyB0byB0aGUgZGF0YSBzZXQgc2l6ZVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImFyY1wiKVxuICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCAoZCwgaSkgPT4gZC52YWx1ZSA9PT0gVE9UQUwgPyBcIm5vbmVcIiA6IFwibnVsbFwiKTsgIC8vIGF0dGVtcHQgdG8gcmVuZGVyIGhhbGYgdGhlIGNoYXJ0IGludmlzaWJsZVxuICAgICAgICAgICAgXG4gICAgICAgIC8vIGFwcGVuZCB0aGUgcGF0aCBvZiB0aGUgYXJjXG4gICAgICAgIGNvbnN0IHBhdGggPSBnLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBhcmMpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGQgPT4gY29sb3JzKGQuZGF0YS5rZXkpKVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmVhc2UoZDMuZWFzZUxpbmVhcilcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAuYXR0clR3ZWVuKCdkJywgcGllVHdlZW4pO1xuICAgICAgICBcbiAgICAgICAgLy8gcGF0aC5vbihcIm1vdXNlb3ZlclwiLCAoZCwgaSkgPT4geyAgLy8gd2h5IGRvZXNuJ3QgdGhpcyB3b3JrP1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGQpXG4gICAgICAgIC8vICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnRyYW5zaXRpb24oKVxuICAgICAgICAvLyAgICAgICAgICAgICAuZHVyYXRpb24oJzUwJylcbiAgICAgICAgLy8gICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAnLjg1JylcbiAgICAgICAgLy8gICAgICAgICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgJ3BvaW50ZXInKVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gZGV0ZXJtaW5lIGhvdyB0byBmbGlwIHRoZSBwaWVzXG4gICAgICAgIGlmIChwaWVfbnVtID09PSAyKSB7Ly8gZmxpcCB0aGUgc2Vjb25kIHBpZVxuICAgICAgICAgICAgZy5hdHRyKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgZy5zdHlsZShcInRyYW5zZm9ybVwiLCBcInNjYWxlWCgtMSkgdHJhbnNsYXRlKDMwMHB4LCAwcHgpIHNjYWxlWSgtMSlcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwic2NhbGVZKC0xKVwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBldmVudCBoYW5kbGVyc1xuICAgICAgICBnLm9uKFwibW91c2VvdmVyXCIsIChkLCBpKSA9PiB7ICBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKCc1MCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgJy44NScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsICdwb2ludGVyJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIGcub24oXCJtb3VzZW91dFwiLCBlbGUgPT4ge1xuICAgICAgICAgICAgLy8gaDEudGV4dChzdGF0ZSArIFwiJ3MgdGF4IHJldmVudWUgZm9yIDIwMTggd2FzICRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgICAgIC8vIGgyLnRleHQoXCJcIilcbiAgICAgICAgfSlcbiAgICAgICAgLy8gLm9uKFwiY2xpY2tcIiwgY3NzU3ViRGF0YURpc3BsYXkoY29udGFpbmVyX2FycmF5LCBwaWVfbnVtKSk7XG4gICAgICAgICAgICBcbiAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4geyBpZiAoZXJyb3IpIHRocm93IGVycm9yIH0pXG5cbiAgICBjb25zdCBwaWVUd2VlbiA9IGIgPT4ge1xuICAgICAgICBiLmlubmVyUmFkaXVzID0gMDtcbiAgICAgICAgY29uc3QgaSA9IGQzLmludGVycG9sYXRlKHsgc3RhcnRBbmdsZTogMCwgZW5kQW5nbGU6IDAgfSwgYilcbiAgICAgICAgcmV0dXJuICh0KSA9PiB7IHJldHVybiBhcmMoaSh0KSkgfVxuICAgIH0gICAgXG5cbn1cbiIsImltcG9ydCB7IENPTE9SUywgTEFCRUxTfSBmcm9tICcuL3BpZV9jaGFydF9nZW5lcmF0b3InXG5cbmV4cG9ydCBjb25zdCBwaWVMZWdlbmQgPSAoKSA9PiB7XG4gICAgY29uc3QgbWFzdGVyX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcbiAgICBtYXN0ZXJfbGlzdC5jbGFzc0xpc3QuYWRkKCdtYXN0ZXItbGlzdCcpXG5cbiAgICBjb25zdCBsZWZ0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgY29uc3QgdGV4dF9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGNvbnN0IHJpZ2h0X2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgICBsZWZ0X2xpc3QuY2xhc3NMaXN0LmFkZCgnbGVmdC1saXN0JykgIFxuICAgIHRleHRfbGlzdC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWxpc3QnKSAgXG4gICAgcmlnaHRfbGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodC1saXN0JykgXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IExBQkVMUy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBsZWZ0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgdGV4dF9ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IHJpZ2h0X2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICBsZWZ0X2JveC5jbGFzc0xpc3QuYWRkKCdib3gnLCAnbGVmdC1ib3gnKVxuICAgICAgICBsZWZ0X2JveC5pZCA9ICgnbGVmdC1ib3gtJyArIGkpXG4gICAgICAgIGxlZnRfYm94LnN0eWxlLmNvbG9yID0gQ09MT1JTW2ldXG5cbiAgICAgICAgcmlnaHRfYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcsICdyaWdodC1ib3gnKVxuICAgICAgICByaWdodF9ib3guaWQgPSAoJ3JpZ2h0LWJveC0nICsgaSlcbiAgICAgICAgcmlnaHRfYm94LnN0eWxlLmNvbG9yID0gQ09MT1JTW2ldXG5cbiAgICAgICAgdGV4dF9ib3guY2xhc3NMaXN0LmFkZCgndGV4dC1ib3gnKVxuICAgICAgICB0ZXh0X2JveC5pbm5lckhUTUwgPSBMQUJFTFNbaV07XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IENPTE9SU1tpXTtcbiAgICAgICAgdGV4dF9ib3guc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIHRleHRfYm94LnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkIFwiICsgQ09MT1JTW2ldXG5cbiAgICAgICAgbGVmdF9saXN0LmFwcGVuZENoaWxkKGxlZnRfYm94KVxuICAgICAgICB0ZXh0X2xpc3QuYXBwZW5kQ2hpbGQodGV4dF9ib3gpXG4gICAgICAgIHJpZ2h0X2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfYm94KVxuICAgIH1cblxuICAgIG1hc3Rlcl9saXN0LmFwcGVuZENoaWxkKGxlZnRfbGlzdClcbiAgICBtYXN0ZXJfbGlzdC5hcHBlbmRDaGlsZCh0ZXh0X2xpc3QpXG4gICAgbWFzdGVyX2xpc3QuYXBwZW5kQ2hpbGQocmlnaHRfbGlzdClcbiAgICByZXR1cm4gbWFzdGVyX2xpc3Rcbn1cblxuY29uc3Qgc3VibGlzdHMgPSAobGFiZWwsIGNvbG9yKSA9PiB7XG4gICAgY29uc3QgbGlzdHMgPSBbXVxuXG5cbiAgICBsZXN0bGlzdC5jbGFzc0xpc3QuYWRkKCdsZWZ0bGlzdCcpXG4gICAgdGV4dGxpc3QuY2xhc3NMaXN0LmFkZCgndGV4dGxpc3QnKVxuICAgIHJpZ2h0bGlzdC5jbGFzc0xpc3QuYWRkKCdyaWdodGxpc3QnKVxuXG4gICAgY29uc3QgbGVmdEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCByaWdodEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG5cbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChsZWZ0Qm94KVxuICAgIHN1Ymxpc3QuYXBwZW5kQ2hpbGQobGkpXG4gICAgc3VibGlzdC5hcHBlbmRDaGlsZChyaWdodEJveClcbiAgICByZXR1cm4gc3VibGlzdFxufSIsImltcG9ydCB7IFBpZUNoYXJ0R2VuZXJhdG9yIH0gZnJvbSAnLi9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG5leHBvcnQgY29uc3QgVE9QX0xFVkVMID0gWydUMDAnLCAnVDAxJywgJ1RBMScsICdUQTMnLCAnVEE0JywgJ1RBNSddXG5jb25zdCBTVEFURV9OQU1FUyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggQ2Fyb2xpbmEnLCAnTm9ydGggRGFrb3RhJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ11cblxuZXhwb3J0IGNvbnN0IHNlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcblxuICAgIC8vIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpICAvLyByZXZpc2l0IGlmIHRpbWUgdG8gbWFrZSBjdXN0b20gc2VsZWN0XG4gICAgLy8gY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luaXRpYWwtY29udGFpbmVyJylcblxuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIilcbiAgICBzZWxlY3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuXG4gICAgY29uc3Qgc3RhdGVTZWxlY3RvciA9IGUgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgc3ZnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3ZnKVxuICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZSwgVE9QX0xFVkVMLCBwaWVfbnVtKVxuXG4gICAgICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gXCItbGVmdFwiIDogXCItcmlnaHRcIlxuICAgICAgICAvLyBjb25zdCBoMiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzdGF0ZVwiICsgc2lkZSlbMF1cbiAgICAgICAgLy8gaDIuaW5uZXJIVE1MID0gc3RhdGVcbiAgICB9XG5cbiAgICBTVEFURV9OQU1FUy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgY29uc3QgZGVmYXVsdF9zdGF0ZSA9IHBpZV9udW0gPT09IDEgPyBTVEFURV9OQU1FU1swXSA6IFNUQVRFX05BTUVTW1NUQVRFX05BTUVTLmxlbmd0aCAtIDFdXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcbiAgICAgICAgaWYgKHN0YXRlID09PSBkZWZhdWx0X3N0YXRlKSB7XG4gICAgICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgICBvcHRpb24uaW5uZXJIVE1MID0gc3RhdGVcbiAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHN0YXRlKVxuICAgICAgICAvLyBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXRlU2VsZWN0b3Ioc3RhdGUpKVxuICAgICAgICAvLyBvcHRpb24uc2V0QXR0cmlidXRlKFwib25jbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbiAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbilcbiAgICB9KVxuICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHN0YXRlU2VsZWN0b3IpXG4gICAgLy8gY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdClcbiAgICAvLyByZXR1cm4gY29udGFpbmVyXG4gICAgcmV0dXJuIHNlbGVjdFxufVxuXG5jb25zdCBwaGFzZU91dCA9IChub2RlKSA9PiB7XG5cbiAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbn1cblxuZXhwb3J0IGNvbnN0IHN0YXRlX3NlbGVjdG9yID0gKHBpZV9udW0pID0+IHtcbiAgICBjb25zdCBTVEFURV9OQU1FUyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggQ2Fyb2xpbmEnLCAnTm9ydGggRGFrb3RhJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ11cblxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwic2VsZWN0LXdyYXBwZXItXCIgKyBwaWVfbnVtKVxuICAgIHdyYXBwZXIuaWQgPSBcInNlbGVjdC13cmFwcGVyLVwiICsgcGllX251bVxuXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICBzZWxlY3QuaW5uZXJIVE1MID0gcGllX251bSA9PT0gMSA/ICdBbGFiYW1hJyA6ICdXeW9taW5nJ1xuICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJzZWxlY3QtXCIgKyBwaWVfbnVtKVxuICAgIHNlbGVjdC5pZCA9IFwic2VsZWN0LVwiICsgcGllX251bVxuXG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdGUtbGlzdC0nICsgcGllX251bSkuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJylcbiAgICB9KVxuICAgIFxuICAgIGNvbnN0IHN0YXRlU2VsZWN0b3IgPSBzdGF0ZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCBzdGF0ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdC1cIiArIHBpZV9udW0pXG4gICAgICAgICAgICBzZWxlY3QuaW5uZXJUZXh0ID0gc3RhdGVcbiAgICAgICAgICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLVwiICsgcGllX251bSlcbiAgICAgICAgICAgIHN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZylcbiAgICAgICAgICAgIFBpZUNoYXJ0R2VuZXJhdG9yKHN0YXRlLCBUT1BfTEVWRUwsIHBpZV9udW0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RhdGVfbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBzdGF0ZV9saXN0LmNsYXNzTGlzdC5hZGQoJ3N0YXRlLWxpc3QtJyArIHBpZV9udW0pXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIHN0YXRlX2xpc3QuaWQgPSAnc3RhdGUtbGlzdC0nICsgcGllX251bVxuICAgIFxuICAgIFNUQVRFX05BTUVTLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZV9saXN0X2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmlubmVySFRNTCA9IHN0YXRlXG4gICAgICAgIHN0YXRlX2xpc3RfaXRlbS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzdGF0ZSlcbiAgICAgICAgc3RhdGVfbGlzdF9pdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGF0ZVNlbGVjdG9yKHN0YXRlKSlcbiAgICAgICAgc3RhdGVfbGlzdC5hcHBlbmRDaGlsZChzdGF0ZV9saXN0X2l0ZW0pXG4gICAgfSlcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNlbGVjdClcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHN0YXRlX2xpc3QpXG4gICAgXG4gICAgcmV0dXJuIHdyYXBwZXJcbn1cblxuLy8gY29uc3QgcGhhc2VPdXQgPSAobm9kZSkgPT4ge1xuXG4vLyAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4vLyB9IiwiY29uc3QgWUVBUlMgPSBbMjAxOCwgMjAxN11cblxuZXhwb3J0IGNvbnN0IHllYXJTZWxlY3RvciA9IHllYXIgPT4ge1xuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgc2VsZWN0LmlubmVySFRNTCA9IHllYXJcbiAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwieWVhci1zZWxlY3RcIilcbiAgICBzZWxlY3QuaWQgPSAneWVhci1zZWxlY3QnXG4gICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIFxuICAgIH0pXG5cbiAgICBjb25zdCB5ZWFyQ2hvaWNlID0gKHllYXIgPSAyMDE4KSA9PiB7XG4gICAgICAgIHJldHVybiBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNzdiA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneWVhci1zZWxlY3QnKVxuICAgICAgICAgICAgc2VsZWN0LmlubmVySFRNTCA9IHllYXJcbiAgICAgICAgICAgIC8vIGdldCBzdGF0ZXNcbiAgICAgICAgICAgIHN0YXRlMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3QtMScpLmlubmVySFRNTFxuICAgICAgICAgICAgc3RhdGUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdC0yJykuaW5uZXJIVE1MXG5cbiAgICAgICAgICAgIC8vIG1ha2UgdHdvIG5ldyBwaWVzXG4gICAgICAgICAgICBjb25zdCBzdmcxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdmctMVwiKVxuICAgICAgICAgICAgY29uc3Qgc3ZnMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZnLTJcIilcbiAgICAgICAgICAgIHN2ZzEucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdmcxKVxuICAgICAgICAgICAgc3ZnMi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN2ZzIpXG4gICAgICAgICAgICBQaWVDaGFydEdlbmVyYXRvcihzdGF0ZTEsIFRPUF9MRVZFTCwgMSwgY3N2KVxuICAgICAgICAgICAgUGllQ2hhcnRHZW5lcmF0b3Ioc3RhdGUyLCBUT1BfTEVWRUwsIDIsIGNzdilcblxuXG5cbiAgICAgICAgICAgIGNvbnN0IHNpZGUgPSBwaWVfbnVtID09PSAxID8gXCItbGVmdFwiIDogXCItcmlnaHRcIlxuICAgICAgICAgICAgLy8gY29uc3QgaDIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwieWVhclwiICsgc2lkZSlbMF1cbiAgICAgICAgICAgIC8vIGgyLmlubmVySFRNTCA9IHllYXJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlX2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgc3RhdGVfbGlzdC5jbGFzc0xpc3QuYWRkKCd5ZWFyLWxpc3QnKVxuICAgIHN0YXRlX2xpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICBzdGF0ZV9saXN0LmlkID0gJ3llYXItbGlzdCdcblxuICAgIFlFQVJTLmZvckVhY2goeWVhciA9PiB7XG4gICAgICAgIGNvbnN0IHllYXJfbGlzdF9pdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBzdGF0ZV9saXN0X2l0ZW0uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgYC4vc3JjL2Fzc2V0cy9kYXRhL0ZZJHt5ZWFyfS1TVEMtRGV0YWlsZWQtVGFibGUuY3N2YClcbiAgICAgICAgeWVhcl9saXN0X2l0ZW0uaW5uZXJIVE1MID0geWVhclxuICAgICAgICB5ZWFyX2xpc3RfaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgeWVhckNob2ljZSh5ZWFyKSlcbiAgICAgICAgeWVhcl9saXN0LmFwcGVuZENoaWxkKHllYXJfbGlzdF9pdGVtKVxuICAgIH0pXG59IiwiXG5pbXBvcnQgeyBQaWVDaGFydEdlbmVyYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuaW1wb3J0IHsgcGllTGVnZW5kIH0gZnJvbSAnLi9jb21wb25lbnRzL3BpZV9sZWdlbmQnXG5pbXBvcnQgeyBzdGF0ZV9zZWxlY3RvciwgVE9QX0xFVkVMIH0gZnJvbSAnLi9jb21wb25lbnRzL3N0YXRlX3NlbGVjdG9yJ1xuaW1wb3J0IHsgeWVhclNlbGVjdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3llYXJfc2VsZWN0b3InXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJ1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgXG4gICAgLy8gUENHIC0+IGNzdlBhdGgsIHNlY3RvciwgYW1vdXQsIGxvY2F0aW9uLCBtdWx0aXBsaWVyLCBza2lwXG4gICAgXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKVxuICAgIC8vIGNvbnN0IHVsID0gcGllTGVnZW5kKClcbiAgICBjb25zdCB1bCA9IHBpZUxlZ2VuZCgpXG4gICAgY29uc3Qgc2VsZWN0XzEgPSBzdGF0ZV9zZWxlY3RvcigxKVxuICAgIGNvbnN0IHNlbGVjdF8yID0gc3RhdGVfc2VsZWN0b3IoMilcbiAgICBjb25zdCBzZWxlY3Rvcl9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VsZWN0b3ItY29udGFpbmVyXCIpWzBdXG4gICAgXG4gICAgY29uc3QgeWVhclNlbGVjdG9yID0geWVhclNlbGVjdG9yXG5cbiAgICBzZWxlY3Rvcl9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0XzEpXG4gICAgc2VsZWN0b3JfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdF8yKVxuICAgIHJvb3QuYXBwZW5kQ2hpbGQodWwpXG5cbiAgICBQaWVDaGFydEdlbmVyYXRvcihcIkFsYWJhbWFcIiwgVE9QX0xFVkVMLCAxKVxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKFwiV3lvbWluZ1wiLCBUT1BfTEVWRUwsIDIpXG59KVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==