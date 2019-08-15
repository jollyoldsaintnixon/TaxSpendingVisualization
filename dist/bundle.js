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

// export function PieChartGenerator(csvPath, sector, amount, state, multiplier = 1, skip = 1) {
function PieChartGenerator(csvPath, state) {

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
            // if (i % skip != 0) { continue }
            var amount = d.AMOUNT.split(',').join('');
            d.sector = d.Tax_Type;
            d.amount = amount;
            TOTAL += amount;
        });

        console.log(d3.format(',')(TOTAL));
        // attempt to nest
        var nestedData = d3.nest().key(function (d) {
            return d.Geo_Name;
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
    (0, _pie_chart_generator.PieChartGenerator)("./src/assets/data/FY2018_tax_revenue_detailed.csv", "All");
    // PCG -> csvPath, sector, amout, location, multiplier, skip

    window.chapel_hill = ["./src/assets/data/chapel_hill_2016.csv", 'function', 'revised_budget', 'C-Thrill'];
    window.nc = ["./src/assets/data/NC_Budget_Data_FY2018-Update.csv", "Committee", "Appropriations", "North Carolina", 1, 3];
    window.cali = ["./src/assets/data/california_2019.csv", "StateAgencies", "TotalStateFunds", "California", 1000];
    var root = document.getElementById("root");
    var h3 = document.createElement("h3");
    root.appendChild(h3);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiUGllQ2hhcnRHZW5lcmF0b3IiLCJjc3ZQYXRoIiwic3RhdGUiLCJUT1RBTCIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsImhlaWdodCIsIndpZHRoIiwicmFkaXVzIiwiY29sb3JzIiwiZDMiLCJzY2FsZU9yZGluYWwiLCJzY2hlbWVEYXJrMiIsImFyYyIsIm91dGVyUmFkaXVzIiwiaW5uZXJSYWRpdXMiLCJsYWJsZUFyYyIsInBpZSIsInZhbHVlIiwiZCIsInN2ZyIsInNlbGVjdCIsImF0dHIiLCJzdHlsZSIsImFwcGVuZCIsImNzdiIsInRoZW4iLCJkYXRhIiwiZm9yRWFjaCIsImkiLCJhbW91bnQiLCJBTU9VTlQiLCJzcGxpdCIsImpvaW4iLCJzZWN0b3IiLCJUYXhfVHlwZSIsImNvbnNvbGUiLCJsb2ciLCJmb3JtYXQiLCJuZXN0ZWREYXRhIiwibmVzdCIsImtleSIsIkdlb19OYW1lIiwicm9sbHVwIiwic3VtIiwidiIsImVudHJpZXMiLCJKU09OIiwic3RyaW5naWZ5IiwiZyIsInNlbGVjdEFsbCIsImVudGVyIiwib24iLCJlbGUiLCJoMSIsInRleHQiLCJoMiIsIlN0cmluZyIsInNsaWNlIiwiY2VudHJvaWQiLCJjYXRjaCIsImVycm9yIiwicGllVHdlZW4iLCJiIiwiaW50ZXJwb2xhdGUiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJ0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwid2luZG93IiwiY2hhcGVsX2hpbGwiLCJuYyIsImNhbGkiLCJyb290IiwiZ2V0RWxlbWVudEJ5SWQiLCJoMyIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7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bkIsR0FBR3NELFdBQUgsQ0FBZSxFQUFFQyxZQUFZLENBQWQsRUFBaUJDLFVBQVUsQ0FBM0IsRUFBZixFQUErQ0gsQ0FBL0MsQ0FBVjtBQUNBLGVBQU8sVUFBQ0ksQ0FBRCxFQUFPO0FBQUUsbUJBQU90RCxJQUFJZ0IsRUFBRXNDLENBQUYsQ0FBSixDQUFQO0FBQWtCLFNBQWxDO0FBQ0gsS0FKRDtBQUtILEM7Ozs7Ozs7Ozs7Ozs7O0FDbEhEOztBQUVBO0FBQ0FDLFNBQVNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2hEO0FBQ0EsZ0RBQWtCLG1EQUFsQixFQUF1RSxLQUF2RTtBQUNBOztBQUVBQyxXQUFPQyxXQUFQLEdBQXFCLENBQUMsd0NBQUQsRUFBMkMsVUFBM0MsRUFBdUQsZ0JBQXZELEVBQXlFLFVBQXpFLENBQXJCO0FBQ0FELFdBQU9FLEVBQVAsR0FBWSxDQUFDLG9EQUFELEVBQXVELFdBQXZELEVBQW9FLGdCQUFwRSxFQUFzRixnQkFBdEYsRUFBd0csQ0FBeEcsRUFBMkcsQ0FBM0csQ0FBWjtBQUNBRixXQUFPRyxJQUFQLEdBQWMsQ0FBQyx1Q0FBRCxFQUEwQyxlQUExQyxFQUEyRCxpQkFBM0QsRUFBOEUsWUFBOUUsRUFBNEYsSUFBNUYsQ0FBZDtBQUNBLFFBQU1DLE9BQU9OLFNBQVNPLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYjtBQUNBLFFBQU1DLEtBQUtSLFNBQVNTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWDtBQUNBSCxTQUFLSSxXQUFMLENBQWlCRixFQUFqQjtBQUNILENBWEQsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi4vZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBBIGxvdCBvZiB0aGlzIGNvZGUgd2FzIGJhc2VkIGhlYXZpbHkgb2ZmIG9mIEthcnRoaWsgVGhvdGEncyB5b3V0dWJlIHR1dG9yaWFsIFwiSW50cm9kdWN0aW9uIHRvIGQzLmpzID0gUGllIENoYXJ0IGFuZCBEb251dCBDaGFydFwiXG4vLyBNYW55IG90aGVyIHZpZGVvcyBhbmQgc3RhdGljIHJlc291cmNlcyB3ZXJlIHVzZWQsIGJ1dCB0aGlzIG9uZSBoYWQgdGhlIG1vc3QgaW5mbHVlbmNlIG9uIHRoZSBjb2RlIGJ5IGZhci5cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0R2VuZXJhdG9yKGNzdlBhdGgsIHNlY3RvciwgYW1vdW50LCBzdGF0ZSwgbXVsdGlwbGllciA9IDEsIHNraXAgPSAxKSB7XG5leHBvcnQgZnVuY3Rpb24gUGllQ2hhcnRHZW5lcmF0b3IoY3N2UGF0aCwgc3RhdGUpIHtcblxuICAgIGxldCBUT1RBTCA9IDA7XG4gICAgLy8gQ0lSQ0xFIFRJTUUgQkFCWVxuICAgIC8vIG1hcmdpbiBhbmQgcmFkaXVzXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAsIGxlZnQ6IDIwMCB9LFxuICAgICAgICBoZWlnaHQgPSAxMDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b20sXG4gICAgICAgIHdpZHRoID0gMTAwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICByYWRpdXMgPSB3aWR0aCAvIDI7XG5cbiAgICBjb25zdCBjb2xvcnMgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lRGFyazIpO1xuXG4gICAgLy8gYXJjIGdlbmVyYXRvclxuICAgIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSAxMClcbiAgICAgICAgLy8gLmlubmVyUmFkaXVzKDApOyAvLyBmb3IgY2lyY2xlXG4gICAgICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSAxMDApIC8vIGZvciBkb251dFxuXG4gICAgY29uc3QgbGFibGVBcmMgPSBkMy5hcmMoKVxuICAgICAgICAub3V0ZXJSYWRpdXMocmFkaXVzIC0gNTApXG4gICAgICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSA1MCk7XG5cbiAgICAvLyBwaWUgZ2VuZXJhdG9yXG4gICAgY29uc3QgcGllID0gZDMucGllKClcbiAgICAgICAgLy8gLnNvcnQobnVsbClcbiAgICAgICAgLnZhbHVlKGQgPT4gZC52YWx1ZSk7XG5cbiAgICAvLyBkZWZpbmUgc3ZnIFxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChcInN2Z1wiKVxuICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgIC5zdHlsZShcImJhY2tncm91bmRcIiwgXCJ5ZWxsb3dcIilcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB3aWR0aCAvIDIgKyBcIixcIiArIGhlaWdodCAvIDIgKyBcIilcIik7XG5cbiAgICAvLyBpbXBvcnQgZGF0YVxuICAgIGQzLmNzdihjc3ZQYXRoKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIHBhcnNlXG5cbiAgICAgICAgZGF0YS5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgLy8gaWYgKGkgJSBza2lwICE9IDApIHsgY29udGludWUgfVxuICAgICAgICAgICAgY29uc3QgYW1vdW50ID0gZC5BTU9VTlQuc3BsaXQoJywnKS5qb2luKCcnKTtcbiAgICAgICAgICAgIGQuc2VjdG9yID0gZC5UYXhfVHlwZTtcbiAgICAgICAgICAgIGQuYW1vdW50ID0gYW1vdW50XG4gICAgICAgICAgICBUT1RBTCArPSBhbW91bnQ7XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc29sZS5sb2coZDMuZm9ybWF0KCcsJykoVE9UQUwpKVxuICAgICAgICAvLyBhdHRlbXB0IHRvIG5lc3RcbiAgICAgICAgY29uc3QgbmVzdGVkRGF0YSA9IGQzLm5lc3QoKVxuICAgICAgICAgICAgLmtleShkID0+IGQuR2VvX05hbWUpXG4gICAgICAgICAgICAucm9sbHVwKHYgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkMy5zdW0odiwgZCA9PiBkLmFtb3VudClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZW50cmllcyhkYXRhKVxuXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG5lc3RlZERhdGEpKVxuICAgICAgICAvLyBhcHBlbmQgZyBlbGVtZW50cyBhcmNcbiAgICAgICAgY29uc3QgZyA9IHN2Zy5zZWxlY3RBbGwoXCIuYXJjXCIpXG4gICAgICAgICAgICAuZGF0YShwaWUobmVzdGVkRGF0YSkpXG5cbiAgICAgICAgICAgIC8vIGcuZXhpdCgpLnJlbW92ZSgpOyAgLy8gVGhyb3dpbmcgdGhpcyBsaW5lIGluIHRvIGFjY291bnQgZm9yIHRoZXJlIGJlaW5nIG1vcmUgZydzIHRoYW4gdGhlIGN1cnJlbnQgZGF0YSBzZXQgYWNjb3VudHMgZm9yXG5cbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcImdcIikgIC8vIEFuZCB0aGlzIGxpbmUgdG8gZ3JvdyB0aGUgbnVtYmVyIG9mIGcncyB0byB0aGUgZGF0YSBzZXQgc2l6ZVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImFyY1wiKTtcblxuICAgICAgICAvLyBhcHBlbmQgdGhlIHBhdGggb2YgdGhlIGFyY1xuICAgICAgICBnLmFwcGVuZChcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBhcmMpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGQgPT4gY29sb3JzKGQuZGF0YS5rZXkpKVxuICAgICAgICAgICAgLm9uKFwibW91c2VvdmVyXCIsIGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWxlKVxuICAgICAgICAgICAgICAgIGgxLnRleHQoZWxlLmRhdGEua2V5ICsgXCIgYWNjb3VudHMgZm9yICRcIiArIGVsZS5kYXRhLnZhbHVlICsgXCIgb3V0IG9mICRcIiArIFRPVEFMKVxuICAgICAgICAgICAgICAgIGgyLnRleHQoXCJUaGlzIGlzIFwiICsgU3RyaW5nKChlbGUuZGF0YS52YWx1ZSAvIFRPVEFMKSAqIDEwMCkuc2xpY2UoMCwgNSkgKyBcIiUgb2YgdGhlIHRvdGFsXCIpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZWxlID0+IHtcbiAgICAgICAgICAgICAgICBoMS50ZXh0KHN0YXRlICsgXCIncyB0b3RhbCBidWRnZXQgZm9yIDIwMTkgd2FzICRcIiArIGQzLmZvcm1hdCgnLCcpKFRPVEFMKSlcbiAgICAgICAgICAgICAgICBoMi50ZXh0KFwiXCIpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBnLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgZCA9PiBcImJsYWNrXCIpXG4gICAgICAgICAgICAvLyAuZWFzZShkMy5lYXNlTGluZWFyKVxuICAgICAgICAgICAgLy8gLmR1cmF0aW9uKDIwMDApXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBkID0+IHsgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgbGFibGVBcmMuY2VudHJvaWQoZCkgKyBcIilcIjsgfSlcbiAgICAgICAgICAgIC5hdHRyKFwiZHlcIiwgXCIuNWVtXCIpXG4gICAgICAgICAgICAudGV4dChkID0+IGQuZGF0YS5rZXkpXG4gICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiMVwiKVxuICAgICAgICAvLyAuZWFzZShkMy5lYXNlTGluZWFyKVxuICAgICAgICAvLyAuZHVyYXRpb24oMjAwMClcbiAgICAgICAgLy8gLmF0dHJUd2VlbihcImRcIiwgcGllVHdlZW4pXG5cblxuICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7IGlmIChlcnJvcikgdGhyb3cgZXJyb3IgfSlcblxuXG4gICAgY29uc3QgaDEgPSBkMy5zZWxlY3QoXCJtYWluXCIpXG4gICAgICAgIC5hcHBlbmQoXCJoMVwiKVxuXG4gICAgY29uc3QgaDIgPSBkMy5zZWxlY3QoXCJtYWluXCIpXG4gICAgICAgIC5hcHBlbmQoXCJoMlwiKVxuXG4gICAgY29uc3QgcGllVHdlZW4gPSBiID0+IHtcbiAgICAgICAgYi5pbm5lclJhZGl1cyA9IDA7XG4gICAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZSh7IHN0YXJ0QW5nbGU6IDAsIGVuZEFuZ2xlOiAwIH0sIGIpXG4gICAgICAgIHJldHVybiAodCkgPT4geyByZXR1cm4gYXJjKGkodCkpIH1cbiAgICB9ICAgIFxufVxuIiwiXG5pbXBvcnQgeyBQaWVDaGFydEdlbmVyYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9waWVfY2hhcnRfZ2VuZXJhdG9yJ1xuXG4vLyBjb25zb2xlLmxvZyh0b3RhbClcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBkZWJ1Z2dlclxuICAgIFBpZUNoYXJ0R2VuZXJhdG9yKFwiLi9zcmMvYXNzZXRzL2RhdGEvRlkyMDE4X3RheF9yZXZlbnVlX2RldGFpbGVkLmNzdlwiLCBcIkFsbFwiKVxuICAgIC8vIFBDRyAtPiBjc3ZQYXRoLCBzZWN0b3IsIGFtb3V0LCBsb2NhdGlvbiwgbXVsdGlwbGllciwgc2tpcFxuXG4gICAgd2luZG93LmNoYXBlbF9oaWxsID0gW1wiLi9zcmMvYXNzZXRzL2RhdGEvY2hhcGVsX2hpbGxfMjAxNi5jc3ZcIiwgJ2Z1bmN0aW9uJywgJ3JldmlzZWRfYnVkZ2V0JywgJ0MtVGhyaWxsJ11cbiAgICB3aW5kb3cubmMgPSBbXCIuL3NyYy9hc3NldHMvZGF0YS9OQ19CdWRnZXRfRGF0YV9GWTIwMTgtVXBkYXRlLmNzdlwiLCBcIkNvbW1pdHRlZVwiLCBcIkFwcHJvcHJpYXRpb25zXCIsIFwiTm9ydGggQ2Fyb2xpbmFcIiwgMSwgM11cbiAgICB3aW5kb3cuY2FsaSA9IFtcIi4vc3JjL2Fzc2V0cy9kYXRhL2NhbGlmb3JuaWFfMjAxOS5jc3ZcIiwgXCJTdGF0ZUFnZW5jaWVzXCIsIFwiVG90YWxTdGF0ZUZ1bmRzXCIsIFwiQ2FsaWZvcm5pYVwiLCAxMDAwXVxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcbiAgICBjb25zdCBoMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKVxuICAgIHJvb3QuYXBwZW5kQ2hpbGQoaDMpXG59KVxuIl0sInNvdXJjZVJvb3QiOiIifQ==