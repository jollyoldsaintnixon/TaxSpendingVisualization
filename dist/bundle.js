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
    window.chapel_hill = ["./src/assets/data/chapel_hill_2016.csv", 'function', 'revised_budget', 'C-Thrill'];
    window.nc = ["./src/assets/data/NC_Budget_Data_FY2018-Update.csv", "Committee", "Appropriations", "North Carolina", 1, 3];
    window.cali = ["./src/assets/data/california_2019.csv", "StateAgencies", "TotalStateFunds", "California", 1000];
    var root = document.getElementById("root");
    var h3 = document.createElement("h3");
    root.appendChild(h3);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiUGllQ2hhcnRHZW5lcmF0b3IiLCJjc3ZQYXRoIiwic2VjdG9yIiwiYW1vdW50Iiwic3RhdGUiLCJtdWx0aXBsaWVyIiwic2tpcCIsIlRPVEFMIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwiaGVpZ2h0Iiwid2lkdGgiLCJyYWRpdXMiLCJjb2xvcnMiLCJkMyIsInNjYWxlT3JkaW5hbCIsInNjaGVtZURhcmsyIiwiYXJjIiwib3V0ZXJSYWRpdXMiLCJpbm5lclJhZGl1cyIsImxhYmxlQXJjIiwicGllIiwidmFsdWUiLCJkIiwic3ZnIiwic2VsZWN0IiwiYXR0ciIsInN0eWxlIiwiYXBwZW5kIiwiY3N2IiwidGhlbiIsImRhdGEiLCJmb3JFYWNoIiwiaSIsInBhcnNlRmxvYXQiLCJzcGxpdCIsImpvaW4iLCJjb25zb2xlIiwibG9nIiwiZm9ybWF0IiwibmVzdGVkRGF0YSIsIm5lc3QiLCJrZXkiLCJyb2xsdXAiLCJzdW0iLCJ2IiwiZW50cmllcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJnIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJvbiIsImVsZSIsImgxIiwidGV4dCIsImgyIiwiU3RyaW5nIiwic2xpY2UiLCJjZW50cm9pZCIsImNhdGNoIiwiZXJyb3IiLCJwaWVUd2VlbiIsImIiLCJpbnRlcnBvbGF0ZSIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsInQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3aW5kb3ciLCJjaGFwZWxfaGlsbCIsIm5jIiwiY2FsaSIsInJvb3QiLCJnZXRFbGVtZW50QnlJZCIsImgzIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFD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aWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gQSBsb3Qgb2YgdGhpcyBjb2RlIHdhcyBiYXNlZCBoZWF2aWx5IG9mZiBvZiBLYXJ0aGlrIFRob3RhJ3MgeW91dHViZSB0dXRvcmlhbCBcIkludHJvZHVjdGlvbiB0byBkMy5qcyA9IFBpZSBDaGFydCBhbmQgRG9udXQgQ2hhcnRcIlxuLy8gTWFueSBvdGhlciB2aWRlb3MgYW5kIHN0YXRpYyByZXNvdXJjZXMgd2VyZSB1c2VkLCBidXQgdGhpcyBvbmUgaGFkIHRoZSBtb3N0IGluZmx1ZW5jZSBvbiB0aGUgY29kZSBieSBmYXIuXG5cbmV4cG9ydCBmdW5jdGlvbiBQaWVDaGFydEdlbmVyYXRvcihjc3ZQYXRoLCBzZWN0b3IsIGFtb3VudCwgc3RhdGUsIG11bHRpcGxpZXIgPSAxLCBza2lwID0gMSkge1xuXG4gICAgbGV0IFRPVEFMID0gMDtcbiAgICAvLyBDSVJDTEUgVElNRSBCQUJZXG4gICAgLy8gbWFyZ2luIGFuZCByYWRpdXNcbiAgICBjb25zdCBtYXJnaW4gPSB7IHRvcDogMjAwLCByaWdodDogMjAwLCBib3R0b206IDIwMCwgbGVmdDogMjAwIH0sXG4gICAgICAgIGhlaWdodCA9IDEwMDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSxcbiAgICAgICAgd2lkdGggPSAxMDAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQsXG4gICAgICAgIHJhZGl1cyA9IHdpZHRoIC8gMjtcblxuICAgIGNvbnN0IGNvbG9ycyA9IGQzLnNjYWxlT3JkaW5hbChkMy5zY2hlbWVEYXJrMik7XG5cbiAgICAvLyBhcmMgZ2VuZXJhdG9yXG4gICAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAgICAgLm91dGVyUmFkaXVzKHJhZGl1cyAtIDEwKVxuICAgICAgICAvLyAuaW5uZXJSYWRpdXMoMCk7IC8vIGZvciBjaXJjbGVcbiAgICAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDEwMCkgLy8gZm9yIGRvbnV0XG5cbiAgICBjb25zdCBsYWJsZUFyYyA9IGQzLmFyYygpXG4gICAgICAgIC5vdXRlclJhZGl1cyhyYWRpdXMgLSA1MClcbiAgICAgICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDUwKTtcblxuICAgIC8vIHBpZSBnZW5lcmF0b3JcbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgICAvLyAuc29ydChudWxsKVxuICAgICAgICAudmFsdWUoZCA9PiBkLnZhbHVlKTtcblxuICAgIC8vIGRlZmluZSBzdmcgXG4gICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KFwic3ZnXCIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZFwiLCBcInllbGxvd1wiKVxuICAgICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHdpZHRoIC8gMiArIFwiLFwiICsgaGVpZ2h0IC8gMiArIFwiKVwiKTtcblxuICAgIC8vIGltcG9ydCBkYXRhXG4gICAgZDMuY3N2KGNzdlBhdGgpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgLy8gcGFyc2VcblxuICAgICAgICBkYXRhLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICBpZiAoaSAlIHNraXAgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkLnNlY3RvciA9IGRbc2VjdG9yXTtcbiAgICAgICAgICAgICAgICBkLmFtb3VudCA9IHBhcnNlRmxvYXQoZFthbW91bnRdLnNwbGl0KCcsJykuam9pbignJykpICogbXVsdGlwbGllcjtcbiAgICAgICAgICAgICAgICBUT1RBTCArPSBwYXJzZUZsb2F0KGRbYW1vdW50XS5zcGxpdCgnLCcpLmpvaW4oJycpKSAqIG11bHRpcGxpZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc29sZS5sb2coZDMuZm9ybWF0KCcsJykoVE9UQUwpKVxuICAgICAgICAvLyBhdHRlbXB0IHRvIG5lc3RcbiAgICAgICAgY29uc3QgbmVzdGVkRGF0YSA9IGQzLm5lc3QoKVxuICAgICAgICAgICAgLmtleShkID0+IGQuc2VjdG9yKVxuICAgICAgICAgICAgLnJvbGx1cCh2ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDMuc3VtKHYsIGQgPT4gZC5hbW91bnQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVudHJpZXMoZGF0YSlcblxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShuZXN0ZWREYXRhKSlcbiAgICAgICAgLy8gYXBwZW5kIGcgZWxlbWVudHMgYXJjXG4gICAgICAgIGNvbnN0IGcgPSBzdmcuc2VsZWN0QWxsKFwiLmFyY1wiKVxuICAgICAgICAgICAgLmRhdGEocGllKG5lc3RlZERhdGEpKVxuXG4gICAgICAgICAgICAvLyBnLmV4aXQoKS5yZW1vdmUoKTsgIC8vIFRocm93aW5nIHRoaXMgbGluZSBpbiB0byBhY2NvdW50IGZvciB0aGVyZSBiZWluZyBtb3JlIGcncyB0aGFuIHRoZSBjdXJyZW50IGRhdGEgc2V0IGFjY291bnRzIGZvclxuXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpICAvLyBBbmQgdGhpcyBsaW5lIHRvIGdyb3cgdGhlIG51bWJlciBvZiBnJ3MgdG8gdGhlIGRhdGEgc2V0IHNpemVcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJhcmNcIik7XG5cbiAgICAgICAgLy8gYXBwZW5kIHRoZSBwYXRoIG9mIHRoZSBhcmNcbiAgICAgICAgZy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgYXJjKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBkID0+IGNvbG9ycyhkLmRhdGEua2V5KSlcbiAgICAgICAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCBlbGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZSlcbiAgICAgICAgICAgICAgICBoMS50ZXh0KGVsZS5kYXRhLmtleSArIFwiIGFjY291bnRzIGZvciAkXCIgKyBlbGUuZGF0YS52YWx1ZSArIFwiIG91dCBvZiAkXCIgKyBUT1RBTClcbiAgICAgICAgICAgICAgICBoMi50ZXh0KFwiVGhpcyBpcyBcIiArIFN0cmluZygoZWxlLmRhdGEudmFsdWUgLyBUT1RBTCkgKiAxMDApLnNsaWNlKDAsIDUpICsgXCIlIG9mIHRoZSB0b3RhbFwiKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgaDEudGV4dChzdGF0ZSArIFwiJ3MgdG90YWwgYnVkZ2V0IGZvciAyMDE5IHdhcyAkXCIgKyBkMy5mb3JtYXQoJywnKShUT1RBTCkpXG4gICAgICAgICAgICAgICAgaDIudGV4dChcIlwiKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZy5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGQgPT4gXCJibGFja1wiKVxuICAgICAgICAgICAgLy8gLmVhc2UoZDMuZWFzZUxpbmVhcilcbiAgICAgICAgICAgIC8vIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZCA9PiB7IHJldHVybiBcInRyYW5zbGF0ZShcIiArIGxhYmxlQXJjLmNlbnRyb2lkKGQpICsgXCIpXCI7IH0pXG4gICAgICAgICAgICAuYXR0cihcImR5XCIsIFwiLjVlbVwiKVxuICAgICAgICAgICAgLnRleHQoZCA9PiBkLmRhdGEua2V5KVxuICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJmaXQtY29udGVudFwiKVxuICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjFcIilcbiAgICAgICAgLy8gLmVhc2UoZDMuZWFzZUxpbmVhcilcbiAgICAgICAgLy8gLmR1cmF0aW9uKDIwMDApXG4gICAgICAgIC8vIC5hdHRyVHdlZW4oXCJkXCIsIHBpZVR3ZWVuKVxuXG5cbiAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4geyBpZiAoZXJyb3IpIHRocm93IGVycm9yIH0pXG5cblxuICAgIGNvbnN0IGgxID0gZDMuc2VsZWN0KFwibWFpblwiKVxuICAgICAgICAuYXBwZW5kKFwiaDFcIilcblxuICAgIGNvbnN0IGgyID0gZDMuc2VsZWN0KFwibWFpblwiKVxuICAgICAgICAuYXBwZW5kKFwiaDJcIilcblxuICAgIGNvbnN0IHBpZVR3ZWVuID0gYiA9PiB7XG4gICAgICAgIGIuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZTogMCB9LCBiKVxuICAgICAgICByZXR1cm4gKHQpID0+IHsgcmV0dXJuIGFyYyhpKHQpKSB9XG4gICAgfSAgICBcbn1cbiIsIlxuaW1wb3J0IHsgUGllQ2hhcnRHZW5lcmF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvcGllX2NoYXJ0X2dlbmVyYXRvcidcblxuLy8gY29uc29sZS5sb2codG90YWwpXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgZGVidWdnZXJcbiAgICB3aW5kb3cuUGllQ2hhcnRHZW5lcmF0b3IgPSBQaWVDaGFydEdlbmVyYXRvclxuICAgIC8vIFBDRyAtPiBjc3ZQYXRoLCBzZWN0b3IsIGFtb3V0LCBsb2NhdGlvbiwgbXVsdGlwbGllciwgc2tpcFxuICAgIHdpbmRvdy5jaGFwZWxfaGlsbCA9IFtcIi4vc3JjL2Fzc2V0cy9kYXRhL2NoYXBlbF9oaWxsXzIwMTYuY3N2XCIsICdmdW5jdGlvbicsICdyZXZpc2VkX2J1ZGdldCcsICdDLVRocmlsbCddXG4gICAgd2luZG93Lm5jID0gW1wiLi9zcmMvYXNzZXRzL2RhdGEvTkNfQnVkZ2V0X0RhdGFfRlkyMDE4LVVwZGF0ZS5jc3ZcIiwgXCJDb21taXR0ZWVcIiwgXCJBcHByb3ByaWF0aW9uc1wiLCBcIk5vcnRoIENhcm9saW5hXCIsIDEsIDNdXG4gICAgd2luZG93LmNhbGkgPSBbXCIuL3NyYy9hc3NldHMvZGF0YS9jYWxpZm9ybmlhXzIwMTkuY3N2XCIsIFwiU3RhdGVBZ2VuY2llc1wiLCBcIlRvdGFsU3RhdGVGdW5kc1wiLCBcIkNhbGlmb3JuaWFcIiwgMTAwMF1cbiAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpXG4gICAgY29uc3QgaDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcbiAgICByb290LmFwcGVuZENoaWxkKGgzKVxufSlcbiJdLCJzb3VyY2VSb290IjoiIn0=