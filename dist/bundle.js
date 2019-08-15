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
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

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
exports.PieChartGenerator = PieChartGenerator;
// A lot of this code was based heavily off of Karthik Thota's youtube tutorial "Introduction to d3.js = Pie Chart and Donut Chart"
// Many other videos and static resources were used, but this one had the most influence on the code by far.

function PieChartGenerator(csvPath, sector, amount, state) {
    var multiplier = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    var skip = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;


    var TOTAL = 0;
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

    var lableArc = d3.arc().outerRadius(radius - 50).innerRadius(radius - 50);

    // pie generator
    var pie = d3.pie()
    // .sort(null)
    .value(function (d) {
        return d.value;
    });

    // define svg 
    var svg = d3.select("svg").attr("width", width).attr("height", height).style("display", "flex").style("background", "yellow").append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // import data
    d3.csv(csvPath).then(function (data) {
        // parse

        data.forEach(function (d, i) {
            debugger;
            if (i % skip === 0) {
                d.sector = d[sector];
                d.amount = parseFloat(d[amount].split(',').join('')) * multiplier;
                TOTAL += parseFloat(d[amount].split(',').join('')) * multiplier;
            }
        });

        console.log(d3.format(',')(TOTAL));
        // attempt to nest
        var nestedData = d3.nest().key(function (d) {
            return d.sector;
        }).rollup(function (v) {
            return d3.sum(v, function (d) {
                return d.amount;
            });
        }).entries(data);

        console.log(JSON.stringify(nestedData));
        // append g elements arc
        var g = svg.selectAll(".arc").data(pie(nestedData))

        // g.exit().remove();  // Throwing this line in to account for there being more g's than the current data set accounts for

        .enter().append("g") // And this line to grow the number of g's to the data set size
        .attr("class", "arc");

        // append the path of the arc
        g.append("path").attr("d", arc).style("fill", function (d) {
            return colors(d.data.key);
        }).on("mouseover", function (ele) {
            console.log(ele);
            h1.text(ele.data.key + " accounts for $" + ele.data.value + " out of $" + TOTAL);
            h2.text("This is " + String(ele.data.value / TOTAL * 100).slice(0, 5) + "% of the total");
        }).on("mouseout", function (ele) {
            h1.text(state + "'s total budget for 2019 was $" + d3.format(',')(TOTAL));
            h2.text("");
        });

        g.append("text").style("fill", function (d) {
            return "black";
        })
        // .ease(d3.easeLinear)
        // .duration(2000)
        .attr("transform", function (d) {
            return "translate(" + lableArc.centroid(d) + ")";
        }).attr("dy", ".5em").text(function (d) {
            return d.data.key;
        }).style("width", "fit-content").style("z-index", "1");
        // .ease(d3.easeLinear)
        // .duration(2000)
        // .attrTween("d", pieTween)

    }).catch(function (error) {
        if (error) throw error;
    });

    var h1 = d3.select("main").append("h1");

    var h2 = d3.select("main").append("h2");

    var pieTween = function pieTween(b) {
        b.innerRadius = 0;
        var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
        return function (t) {
            return arc(i(t));
        };
    };
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pie_chart_generator = __webpack_require__(/*! ./components/pie_chart_generator */ "./src/components/pie_chart_generator.js");

// console.log(total)
document.addEventListener("DOMContentLoaded", function () {
    debugger;
    window.PieChartGenerator = _pie_chart_generator.PieChartGenerator;
    // PCG -> csvPath, sector, amout, location, multiplier, skip
    window.chapel_hill = ["./src/assets/data/NC_Budget_Data_FY2018-Update.csv"];
    window.nc = ["./src/assets/data/NC_Budget_Data_FY2018-Update.csv", "Committee", "Appropriations", "North Carolina", 1, 3];
    window.cali = ["./src/assets/data/california_2019.csv", "StateAgencies", "TotalStateFunds", "California", 1000];
    var root = document.getElementById("root");
    var h3 = document.createElement("h3");
    root.appendChild(h3);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiUGllQ2hhcnRHZW5lcmF0b3IiLCJjc3ZQYXRoIiwic2VjdG9yIiwiYW1vdW50Iiwic3RhdGUiLCJtdWx0aXBsaWVyIiwic2tpcCIsIlRPVEFMIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwiaGVpZ2h0Iiwid2lkdGgiLCJyYWRpdXMiLCJjb2xvcnMiLCJkMyIsInNjYWxlT3JkaW5hbCIsInNjaGVtZURhcmsyIiwiYXJjIiwib3V0ZXJSYWRpdXMiLCJpbm5lclJhZGl1cyIsImxhYmxlQXJjIiwicGllIiwidmFsdWUiLCJkIiwic3ZnIiwic2VsZWN0IiwiYXR0ciIsInN0eWxlIiwiYXBwZW5kIiwiY3N2IiwidGhlbiIsImRhdGEiLCJmb3JFYWNoIiwiaSIsInBhcnNlRmxvYXQiLCJzcGxpdCIsImpvaW4iLCJjb25zb2xlIiwibG9nIiwiZm9ybWF0IiwibmVzdGVkRGF0YSIsIm5lc3QiLCJrZXkiLCJyb2xsdXAiLCJzdW0iLCJ2IiwiZW50cmllcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJnIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJvbiIsImVsZSIsImgxIiwidGV4dCIsImgyIiwiU3RyaW5nIiwic2xpY2UiLCJjZW50cm9pZCIsImNhdGNoIiwiZXJyb3IiLCJwaWVUd2VlbiIsImIiLCJpbnRlcnBvbGF0ZSIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsInQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3aW5kb3ciLCJjaGFwZWxfaGlsbCIsIm5jIiwiY2FsaSIsInJvb3QiLCJnZXRFbGVtZW50QnlJZCIsImgzIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFD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XHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi4vZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBBIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGJhc2VkIGhlYXZpbHkgb2ZmIG9mIEthcnRoaWsgVGhvdGEncyB5b3V0dWJlIHR1dG9yaWFsIFwiSW50cm9kdWN0aW9uIHRvIGQzLmpzID0gUGllIENoYXJ0IGFuZCBEb251dCBDaGFydFwiXG4vLyBNYW55IG90aGVyIHZpZGVvcyBhbmQgc3RhdGljIHJlc291cmNlcyB3ZXJlIHVzZWQsIGJ1dCB0aGlzIG9uZSBoYWQgdGhlIG1vc3QgaW5mbHVlbmNlIG9uIHRoZSBjb2RlIGJ5IGZhci5cblxuZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKGNzdlBhdGgsIHNlY3RvciwgYW1vdW50LCBzdGF0ZSwgbXVsdGlwbGllciA9IDEsIHNraXAgPSAxKSB7XG5cbiAgICBsZXQgVE9UQUwgPSAwO1xuICAgIC8vIENJUkNMRSBUSU1FIEJBQllcbiAgICAvLyBtYXJnaW4gYW5kIHJhZGl1c1xuICAgIGNvbnN0IG1hcmdpbiA9IHsgdG9wOiAyMDAsIHJpZ2h0OiAyMDAsIGJvdHRvbTogMjAwLCBsZWZ0OiAyMDAgfSxcbiAgICAgICAgaGVpZ2h0ID0gMTAwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tLFxuICAgICAgICB3aWR0aCA9IDEwMDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodCxcbiAgICAgICAgcmFkaXVzID0gd2lkdGggLyAyO1xuXG4gICAgY29uc3QgY29sb3JzID0gZDMuc2NhbGVPcmRpbmFsKGQzLnNjaGVtZURhcmsyKTtcblxuICAgIC8vIGFyYyBnZW5lcmF0b3JcbiAgICBjb25zdCBhcmMgPSBkMy5hcmMoKVxuICAgICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gMTApXG4gICAgICAgIC8vIC5pbm5lclJhZGl1cygwKTsgLy8gZm9yIGNpcmNsZVxuICAgICAgICAuaW5uZXJSYWRpdXMocmFkaXVzIC0gMTAwKSAvLyBmb3IgZG9udXRcblxuICAgIGNvbnN0IGxhYmxlQXJjID0gZDMuYXJjKClcbiAgICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDUwKVxuICAgICAgICAuaW5uZXJSYWRpdXMocmFkaXVzIC0gNTApO1xuXG4gICAgLy8gcGllIGdlbmVyYXRvclxuICAgIGNvbnN0IHBpZSA9IGQzLnBpZSgpXG4gICAgICAgIC8vIC5zb3J0KG51bGwpXG4gICAgICAgIC52YWx1ZShkID0+IGQudmFsdWUpO1xuXG4gICAgLy8gZGVmaW5lIHN2ZyBcbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCJzdmdcIilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kXCIsIFwieWVsbG93XCIpXG4gICAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgd2lkdGggLyAyICsgXCIsXCIgKyBoZWlnaHQgLyAyICsgXCIpXCIpO1xuXG4gICAgLy8gaW1wb3J0IGRhdGFcbiAgICBkMy5jc3YoY3N2UGF0aCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAvLyBwYXJzZVxuXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoZCwgaSkgPT4ge1xuICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICAgIGlmIChpICUgc2tpcCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGQuc2VjdG9yID0gZFtzZWN0b3JdO1xuICAgICAgICAgICAgICAgIGQuYW1vdW50ID0gcGFyc2VGbG9hdChkW2Ftb3VudF0uc3BsaXQoJywnKS5qb2luKCcnKSkgKiBtdWx0aXBsaWVyO1xuICAgICAgICAgICAgICAgIFRPVEFMICs9IHBhcnNlRmxvYXQoZFthbW91bnRdLnNwbGl0KCcsJykuam9pbignJykpICogbXVsdGlwbGllcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBjb25zb2xlLmxvZyhkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgIC8vIGF0dGVtcHQgdG8gbmVzdFxuICAgICAgICBjb25zdCBuZXN0ZWREYXRhID0gZDMubmVzdCgpXG4gICAgICAgICAgICAua2V5KGQgPT4gZC5zZWN0b3IpXG4gICAgICAgICAgICAucm9sbHVwKHYgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkMy5zdW0odiwgZCA9PiBkLmFtb3VudClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZW50cmllcyhkYXRhKVxuXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG5lc3RlZERhdGEpKVxuICAgICAgICAvLyBhcHBlbmQgZyBlbGVtZW50cyBhcmNcbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUobmVzdGVkRGF0YSkpXG5cbiAgICAgICAgICAgIC8vIGcuZXhpdCgpLnJlbW92ZSgpOyAgLy8gVGhyb3dpbmcgdGhpcyBsaW5lIGluIHRvIGFjY291bnQgZm9yIHRoZXJlIGJlaW5nIG1vcmUgZydzIHRoYW4gdGhlIGN1cnJlbnQgZGF0YSBzZXQgYWNjb3VudHMgZm9yXG5cbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcImdcIikgIC8vIEFuZCB0aGlzIGxpbmUgdG8gZ3JvdyB0aGUgbnVtYmVyIG9mIGcncyB0byB0aGUgZGF0YSBzZXQgc2l6ZVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImFyY1wiKTtcblxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBnLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBhcmMpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGQgPT4gY29sb3JzKGQuZGF0YS5rZXkpKVxuICAgICAgICAgICAgLm9uKFwibW91c2VvdmVyXCIsIGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWxlKVxuICAgICAgICAgICAgICAgIGgxLnRleHQoZWxlLmRhdGEua2V5ICsgXCIgYWNjb3VudHMgZm9yICRcIiArIGVsZS5kYXRhLnZhbHVlICsgXCIgb3V0IG9mICRcIiArIFRPVEFMKVxuICAgICAgICAgICAgICAgIGgyLnRleHQoXCJUaGlzIGlzIFwiICsgU3RyaW5nKChlbGUuZGF0YS52YWx1ZSAvIFRPVEFMKSAqIDEwMCkuc2xpY2UoMCwgNSkgKyBcIiUgb2YgdGhlIHRvdGFsXCIpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0b3RhbCBidWRnZXQgZm9yIDIwMTkgd2FzICRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgICAgICAgICBoMi50ZXh0KFwiXCIpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBnLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZCA9PiBcImJsYWNrXCIpXG4gICAgICAgICAgICAvLyAuZWFzZShkMy5lYXNlTGluZWFyKVxuICAgICAgICAgICAgLy8gLmR1cmF0aW9uKDIwMDApXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBkID0+IHsgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgbGFibGVBcmMuY2VudHJvaWQoZCkgKyBcIilcIjsgfSlcbiAgICAgICAgICAgIC5hdHRyKFwiZHlcIiwgXCIuNWVtXCIpXG4gICAgICAgICAgICAudGV4dChkID0+IGQuZGF0YS5rZXkpXG4gICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiMVwiKVxuICAgICAgICAvLyAuZWFzZShkMy5lYXNlTGluZWFyKVxuICAgICAgICAvLyAuZHVyYXRpb24oMjAwMClcbiAgICAgICAgLy8gLmF0dHJUd2VlbihcImRcIiwgcGllVHdlZW4pXG5cblxuICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7IGlmIChlcnJvcikgdGhyb3cgZXJyb3IgfSlcblxuXG4gICAgY29uc3QgaDEgPSBkMy5zZWxlY3QoXCJtYWluXCIpXG4gICAgICAgIC5hcHBlbmQoXCJoMVwiKVxuXG4gICAgY29uc3QgaDIgPSBkMy5zZWxlY3QoXCJtYWluXCIpXG4gICAgICAgIC5hcHBlbmQoXCJoMlwiKVxuXG4gICAgY29uc3QgcGllVHdlZW4gPSBiID0+IHtcbiAgICAgICAgYi5pbm5lclJhZGl1cyA9IDA7XG4gICAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZSh7IHN0YXJ0QW5nbGU6IDAsIGVuZEFuZ2xlOiAwIH0sIGIpXG4gICAgICAgIHJldHVybiAodCkgPT4geyByZXR1cm4gYXJjKGkodCkpIH1cbiAgICB9ICAgIFxufVxuIiwiXG5pbXBvcnQgeyBQaWVDaGFydEdlbmVyYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG4vLyBjb25zb2xlLmxvZyh0b3RhbClcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBkZWJ1Z2dlclxuICAgIHdpbmRvdy5QaWVDaGFydEdlbmVyYXRvciA9IFBpZUNoYXJ0R2VuZXJhdG9yXG4gICAgLy8gUENHIC0+IGNzdlBhdGgsIHNlY3RvciwgYW1vdXQsIGxvY2F0aW9uLCBtdWx0aXBsaWVyLCBza2lwXG4gICAgd2luZG93LmNoYXBlbF9oaWxsID0gW1wiLi9zcmMvYXNzZXRzL2RhdGEvTkNfQnVkZ2V0X0RhdGFfRlkyMDE4LVVwZGF0ZS5jc3ZcIl1cbiAgICB3aW5kb3cubmMgPSBbXCIuL3NyYy9hc3NldHMvZGF0YS9OQ19CdWRnZXRfRGF0YV9GWTIwMTgtVXBkYXRlLmNzdlwiLCBcIkNvbW1pdHRlZVwiLCBcIkFwcHJvcHJpYXRpb25zXCIsIFwiTm9ydGggQ2Fyb2xpbmFcIiwgMSwgM11cbiAgICB3aW5kb3cuY2FsaSA9IFtcIi4vc3JjL2Fzc2V0cy9kYXRhL2NhbGlmb3JuaWFfMjAxOS5jc3ZcIiwgXCJTdGF0ZUFnZW5jaWVzXCIsIFwiVG90YWxTdGF0ZUZ1bmRzXCIsIFwiQ2FsaWZvcm5pYVwiLCAxMDAwXVxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgICBjb25zdCBoMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKVxuICAgIHJvb3QuYXBwZW5kQ2hpbGQoaDMpXG59KVxuIl0sInNvdXJjZVJvb3QiOiIifQ==