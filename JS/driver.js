/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _queryURL = __webpack_require__(1);
	
	var _queryURL2 = _interopRequireDefault(_queryURL);
	
	var _getViewNumber = __webpack_require__(3);
	
	var _getViewNumber2 = _interopRequireDefault(_getViewNumber);
	
	var _rollsOnPage = __webpack_require__(4);
	
	var _rollsOnPage2 = _interopRequireDefault(_rollsOnPage);
	
	var _drawImageTags = __webpack_require__(5);
	
	var _drawImageTags2 = _interopRequireDefault(_drawImageTags);
	
	var _getDataFromApi = __webpack_require__(6);
	
	var _getDataFromApi2 = _interopRequireDefault(_getDataFromApi);
	
	var _bodyRender = __webpack_require__(7);
	
	var _bodyRender2 = _interopRequireDefault(_bodyRender);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var l = console.log;
	var NEXT_TOKEN = '';
	var nowPage = void 0;
	var bufer = void 0;
	var leftest = void 0;
	var pushToBufer = function pushToBufer(data) {
	    // l(data)
	    NEXT_TOKEN = data.nextPageToken;
	    if (data.items.length !== 0) {
	        data.items.forEach(function (item) {
	            var currentItem = {
	                number: bufer.length + 1,
	                header: item.snippet.title,
	                link: 'https://www.youtube.com/watch?v=' + item.id.videoId,
	                prevImg: item.snippet.thumbnails.high.url,
	                author: item.snippet.channelTitle,
	                published: new Date(item.snippet.publishedAt),
	                id: item.id.videoId,
	                descr: item.snippet.description
	            };
	            bufer.push(currentItem);
	            // console.log('Bufer added.')
	            // l(currentItem)
	        });
	    }
	};
	
	var displayPage = function displayPage(pageNum, numberOfItems, left) {
	    var firstItemOnPage = void 0;
	    var lastItemOnPage = void 0;
	    if (pageNum === undefined) {
	        // l('case1');
	        firstItemOnPage = left;
	        lastItemOnPage = left + numberOfItems - 1;
	    } else if (bufer[(pageNum - 1) * numberOfItems] === undefined) {
	        firstItemOnPage = 0;
	        // l('case2');
	        lastItemOnPage = firstItemOnPage + numberOfItems - 1;
	        document.getElementById('tooltip-animation').innerHTML = 'NOW IS 1\'th';
	    } else {
	        // l('case3');
	        firstItemOnPage = (pageNum - 1) * numberOfItems;
	        lastItemOnPage = firstItemOnPage + numberOfItems - 1;
	        document.getElementById('tooltip-animation').innerHTML = 'NOW IS ' + pageNum + '\'th';
	    }
	    // l('First image item number = ' + firstItemOnPage);
	    // l('Last image item number = ' + lastItemOnPage);
	    leftest = firstItemOnPage;
	
	    if (pageNum === 1) {
	        document.getElementById('no-results').setAttribute('hidden', true);
	        document.getElementById('search-results').removeAttribute('hidden');
	    }
	
	    var col = 0;
	    for (var i = firstItemOnPage; i <= lastItemOnPage; i += 1) {
	        document.getElementById('col-' + col).style['background-image'] = 'url("' + bufer[i].prevImg + '")';
	        // l("prevImg of i = " + i + 'is: ' + bufer[i].prevImg)
	        var thisHeader = bufer[i].header.substring(0, 40);
	        if (thisHeader.length < bufer[i].header) thisHeader += '...';
	        thisHeader = bufer[i].number + '. ' + thisHeader;
	        thisHeader = '<a href="' + bufer[i].link + '" class="link-to-YT">' + thisHeader + '</a>';
	        document.getElementById('headerImg-' + col).innerHTML = thisHeader;
	
	        // drawing author
	        var thisAuthor = bufer[i].author.substring(0, 18);
	        if (thisAuthor !== bufer[i].author) thisAuthor += '...';
	        document.getElementById('pAuthor-' + col).innerHTML = '<i class="fa fa-user-circle-o" aria-hidden="true"></i> ' + thisAuthor;
	        // drawing date of publication
	        var thisDay = bufer[i].published.getDay();
	        if (thisDay.length !== 2) thisDay = '0' + thisDay;
	        var thisMonth = bufer[i].published.getMonth();
	        if (thisMonth.length !== 2) thisMonth = '0' + thisMonth;
	        document.getElementById('pPublished-' + col).innerHTML = '<i class="fa fa-download" aria-hidden="true"></i> ' + thisDay + ' - ' + thisMonth + ' - ' + bufer[i].published.getFullYear();
	        // drawing views number
	        (0, _getViewNumber2.default)(bufer[i].id, col);
	
	        // drawing paragraf "about"
	        var thisAbout = bufer[i].descr.substring(0, 100);
	        if (thisAbout !== bufer[i].descr) thisAbout += '...';
	        document.getElementById('pAbout-' + col).innerHTML = thisAbout;
	        col += 1;
	    }
	};
	
	var fillBuferIfNeed = function fillBuferIfNeed(page, rolls, userEntry) {
	    if (bufer.length < (page + 5) * rolls) {
	        l('Inisilized filling of the bufer');
	        (0, _getDataFromApi2.default)((0, _queryURL2.default)(userEntry, NEXT_TOKEN), pushToBufer);
	    }
	};
	
	var searchSubmit = function searchSubmit() {
	    l('SSrun');
	    document.getElementById('js-youtube-search-form').addEventListener('submit', function (event) {
	        event.preventDefault();
	        document.getElementById('spy-label').style['display'] = "inline";
	        bufer = [];
	        l('SSsubm');
	        var numberOfDisplayed = (0, _rollsOnPage2.default)();
	        l('SSsubm2');
	        var userEntry = document.querySelector('#search-entry').value;
	        l('SSsubm3');
	        (0, _drawImageTags2.default)(numberOfDisplayed);
	        l('SSsubm4');
	        nowPage = 1;
	        l('SSsubm5');
	
	        document.getElementById('navPages').innerHTML = '<ul class="pagination" id="pagination"><li id="btn-previous" class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li><li id="page-link-1" class="active"><a href="#">1</a></li><li id="page-link-2"><a href="#">2</a></li><li id="page-link-3"><a href="#">3</a></li><li id="page-link-4"><a href="#">4</a></li><li id="page-link-5"><a href="#">5</a></li><li  id="btn-next"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li></ul>';
	        (0, _getDataFromApi2.default)((0, _queryURL2.default)(userEntry, 'submit'), pushToBufer, displayPage, nowPage, (0, _rollsOnPage2.default)());
	        fillBuferIfNeed(nowPage, _rollsOnPage2.default, userEntry);
	
	        var nextHandler = function nextHandler() {
	            l('function nextHandler activated');
	            // make btn-prev active
	            document.getElementById('btn-previous').classList.remove('disabled');
	            // change page markers and 'nowPage'
	            if (nowPage < 3) {
	                document.getElementById('page-link-' + nowPage).classList.remove('active');
	                nowPage += 1;
	                document.getElementById('page-link-' + nowPage).classList.add('active');
	            } else {
	                nowPage += 1;
	                document.getElementById('page-link-1').innerHTML = '<a href="#">' + (nowPage - 2) + '</a>';
	                document.getElementById('page-link-2').innerHTML = '<a href="#">' + (nowPage - 1) + '</a>';
	                document.getElementById('page-link-3').innerHTML = '<a href="#">' + nowPage + '</a>';
	                document.getElementById('page-link-4').innerHTML = '<a href="#">' + (nowPage + 1) + '</a>';
	                document.getElementById('page-link-5').innerHTML = '<a href="#">' + (nowPage + 2) + '</a>';
	            }
	
	            // displaying next page
	            displayPage(nowPage, (0, _rollsOnPage2.default)());
	            fillBuferIfNeed(nowPage, (0, _rollsOnPage2.default)(), userEntry);
	        };
	
	        var prevHandler = function prevHandler() {
	            if (nowPage <= 3) {
	                nowPage -= 1;
	                document.getElementById('page-link-' + nowPage).classList.add('active');
	                document.getElementById('page-link-' + (nowPage + 1)).classList.remove('active');
	            } else {
	                nowPage -= 1;
	                document.getElementById('page-link-1').innerHTML = '<a href="#">' + (nowPage - 2) + '</a>';
	                document.getElementById('page-link-2').innerHTML = '<a href="#">' + (nowPage - 1) + '</a>';
	                document.getElementById('page-link-3').innerHTML = '<a href="#">' + nowPage + '</a>';
	                document.getElementById('page-link-4').innerHTML = '<a href="#">' + (nowPage + 1) + '</a>';
	                document.getElementById('page-link-5').innerHTML = '<a href="#">' + (nowPage + 2) + '</a>';
	            }
	            displayPage(nowPage, (0, _rollsOnPage2.default)());
	            if (bufer[(nowPage - 1) * (0, _rollsOnPage2.default)() - 1] === undefined) {
	                document.getElementById('btn-previous').classList.add('disabled');
	            }
	        };
	
	        // btn-next handler
	        document.getElementById('btn-next').addEventListener('click', nextHandler);
	        // btn-prev handler
	        document.getElementById('btn-previous').addEventListener('click', prevHandler);
	
	        var activeLinkIs = function activeLinkIs() {
	            var link = void 0;
	            if (document.getElementById('page-link-1').classList.contains('active')) {
	                link = 1;
	            } else if (document.getElementById('page-link-2').classList.contains('active')) {
	                link = 2;
	            } else if (document.getElementById('page-link-3').classList.contains('active')) {
	                link = 3;
	            } else if (document.getElementById('page-link-4').classList.contains('active')) {
	                link = 4;
	            } else if (document.getElementById('page-link-5').classList.contains('active')) {
	                link = 5;
	            }
	            return link;
	        };
	        var startX = void 0;
	        var endX = void 0;
	        // mousedown handler
	        document.getElementById('row').addEventListener('mousedown', function (evt) {
	            startX = evt.screenX;
	            l('sreenX on mousedown = ' + startX);
	        });
	        // mouseup handler
	        document.getElementById('row').addEventListener('mouseup', function (evt) {
	            endX = evt.screenX;
	            l('screenX on mouseup = ' + endX);
	            if (endX > startX + 15 && nowPage !== 1) {
	                l('Activated mouse-swipe prev handler');
	                prevHandler();
	            }
	            if (endX < startX - 15) {
	                l('Activated mouse-swipe next handler');
	                nextHandler();
	            }
	        });
	        // touchstart handler
	        document.getElementById('row').addEventListener('touchstart', function (evt) {
	            startX = evt.touches[0].screenX;
	            l('sreenX on touchstart = ' + startX);
	        });
	        //  touchmove handler
	        document.getElementById('row').addEventListener('touchmove', function (evt) {
	            endX = evt.touches[0].screenX;
	        });
	        // touchend handler
	        document.getElementById('row').addEventListener('touchend', function () {
	            l('sreenX on touchend = ' + endX);
	            if (endX > startX + 15 && nowPage !== 1) {
	                l('Activated touch-swipe prev handler');
	                prevHandler();
	            }
	            if (endX < startX - 15) {
	                l('Activated touch-swipe next handler');
	                nextHandler();
	            }
	        });
	        // page-link-1 handler
	        document.getElementById('page-link-1').addEventListener('click', function () {
	            var active = activeLinkIs();
	            if (active === 2) prevHandler();
	            if (active === 3) {
	                prevHandler();prevHandler();
	            }
	            if (active === 4) {
	                prevHandler();prevHandler();prevHandler();
	            }
	            if (active === 5) {
	                prevHandler();prevHandler();prevHandler();prevHandler();
	            }
	        });
	        // page-link-2 handler
	        document.getElementById('page-link-2').addEventListener('click', function () {
	            var active = activeLinkIs();
	            if (active === 1) nextHandler();
	            if (active === 3) prevHandler();
	            if (active === 4) {
	                prevHandler();prevHandler();
	            }
	            if (active === 5) {
	                prevHandler();prevHandler();prevHandler();
	            }
	        });
	        // page-link-3 handler
	        document.getElementById('page-link-3').addEventListener('click', function () {
	            var active = activeLinkIs();
	            if (active === 1) {
	                nextHandler();nextHandler();
	            }
	            if (active === 2) nextHandler();
	            if (active === 4) {
	                prevHandler();
	            }
	            if (active === 5) {
	                prevHandler();prevHandler();
	            }
	        });
	        // page-link-4 handler
	        document.getElementById('page-link-4').addEventListener('click', function () {
	            var active = activeLinkIs();
	            if (active === 1) {
	                nextHandler();nextHandler();nextHandler();
	            }
	            if (active === 2) {
	                nextHandler();nextHandler();
	            }
	            if (active === 3) {
	                nextHandler();
	            }
	            if (active === 5) {
	                prevHandler();
	            }
	        });
	        // page-link-5 handler
	        document.getElementById('page-link-5').addEventListener('click', function () {
	            var active = activeLinkIs();
	            if (active === 1) {
	                nextHandler();nextHandler();nextHandler();nextHandler();
	            }
	            if (active === 2) {
	                nextHandler();nextHandler();nextHandler();
	            }
	            if (active === 3) {
	                nextHandler();nextHandler();
	            }
	            if (active === 4) {
	                nextHandler();
	            }
	        });
	        // tooltip showing
	        document.getElementById('pagination').addEventListener('mouseenter', function () {
	            setTimeout(function () {
	                document.getElementById('tooltip-animation').classList.add('animated-tooltip');
	            }, 200);
	        });
	        // tooltip hiding
	        document.getElementById('pagination').addEventListener('mouseleave', function () {
	            document.getElementById('tooltip-animation').classList.remove('animated-tooltip');
	        });
	
	        // window resize handler
	        window.addEventListener('resize', function () {
	            // l('Window resized');
	            if (numberOfDisplayed !== (0, _rollsOnPage2.default)()) {
	                // l('Activated resize handler');
	                // l('Nuber of the leftest = ' + leftest);
	                numberOfDisplayed = (0, _rollsOnPage2.default)();
	                // l('\'numberOfDisplayed\' recalculated: ' + numberOfDisplayed);
	                (0, _drawImageTags2.default)(numberOfDisplayed);
	                // l('Tags redrawn');
	                displayPage(undefined, numberOfDisplayed, leftest);
	                // l('Displlaying finished.');
	                // l('Started recalculating of nowPage.');
	                nowPage = Math.floor(leftest / numberOfDisplayed) + 1;
	                // l("nowPage recalculated: " + nowPage);
	                if (nowPage <= 3) {
	                    document.getElementById('page-link-' + activeLinkIs()).classList.remove('active');
	                    document.getElementById('page-link-' + nowPage).classList.add('active');
	                } else {
	                    document.getElementById('page-link-' + activeLinkIs()).classList.remove('active');
	                    document.getElementById('page-link-3').classList.add('active');
	                    document.getElementById('page-link-1').innerHTML = '<a href="#">' + (nowPage - 2) + '</a>';
	                    document.getElementById('page-link-2').innerHTML = '<a href="#">' + (nowPage - 1) + '</a>';
	                    document.getElementById('page-link-3').innerHTML = '<a href="#">' + nowPage + '</a>';
	                    document.getElementById('page-link-4').innerHTML = '<a href="#">' + (nowPage + 1) + '</a>';
	                    document.getElementById('page-link-5').innerHTML = '<a href="#">' + (nowPage + 2) + '</a>';
	                }
	            }
	        });
	    });
	};
	
	new _bodyRender2.default();
	
	searchSubmit();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _YT_parametres = __webpack_require__(2);
	
	exports.default = function (searchTerm, task) {
	    var url = _YT_parametres.YT_SEARCH_URL + '?part=snippet&key=' + _YT_parametres.YT_API_KEY[1] + '&q=' + searchTerm + '&maxResults=15&type=video';
	    if (task) url += '&pageToken=' + task;
	    return url;
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var key = {
	    1: 'AIzaSyAOlN6_KVX0PqPLsaA6raMgHhyA8DeX5Hw',
	    2: 'AIzaSyDFNcossL1cLuUP5CvkLoLhHGKQ5kafuSA',
	    3: 'AIzaSyBsbWeC2Mj35LdTXafKHO7LTAiIJVTJPyM',
	    4: 'AIzaSyDv3TkvD7OO4S4-wlIGEz_odJG1T5Qrbao',
	    5: 'AIzaSyCJ-StAmOvpw37mVaPdv4pFEJuq9p1ZUyc',
	    6: 'AIzaSyCxVxsC5k46b8I-CLXlF3cZHjpiqP_myVk',
	    7: 'AIzaSyBM3XlO94bHBN6P8AbfG4w4Z-JSWOhDYrM',
	    8: 'AIzaSyDnsMk4Y7RINwOrlMXIGdywKsE-fvVisxk',
	    9: 'AIzaSyBxG_Tf2uvKip5sJLaFUPEjwAx5nd-iJ88'
	};
	
	var YT_API_KEY = exports.YT_API_KEY = key;
	var YT_VIEW_URL = exports.YT_VIEW_URL = 'https://www.googleapis.com/youtube/v3/videos/';
	var YT_SEARCH_URL = exports.YT_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search/';

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _YT_parametres = __webpack_require__(2);
	
	exports.default = function (id, call) {
	    // l('getViewNumber runed');
	    var req2 = new XMLHttpRequest();
	    req2.open('GET', _YT_parametres.YT_VIEW_URL + '?part=statistics&key=' + _YT_parametres.YT_API_KEY[2] + '&id=' + id);
	    req2.onreadystatechange = function () {
	        if (req2.readyState === 4) {
	            document.getElementById('pViews-' + call).innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>  ' + JSON.parse(req2.responseText).items[0].statistics.viewCount;
	        }
	    };
	    req2.send(null);
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    var width = document.querySelector('#form-entry').offsetWidth;
	    // l('#form-entry width = ' + width);
	    var imageWidth = 200;
	    return Math.floor(width / imageWidth);
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	// it draws necessary number of tags for rolls
	exports.default = function (rolls) {
	    // console.log('Drawing image tags:');
	    var inner = '';
	    for (var i = 0; i <= rolls - 1; i += 1) {
	        console.log(i);
	        inner += '<div class="col col-' + i + ' result" id="col-' + i + '">\n                        <h2 id="headerImg-' + i + '" class=\'result-header\'></h2>\n                        <p id="pAbout-' + i + '" class=\'paragraf-about\'></p>\n                        <p id="pAuthor-' + i + '" class=\'paragraf-author\'></p>\n                        <p id="pPublished-' + i + '" class=\'paragraf-published\'></p>\n                        <p id="pViews-' + i + '" class=\'paragraf-views\'></p>\n                    </div>';
	    }
	    document.querySelector('#row').innerHTML = inner;
	    // l('Tags filled. innerHTML = ' + inner);
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (query, callPush, callDisplay, whatPage, numberOfImg) {
	    // console.log('Sending query: '+ query)
	    var req = new XMLHttpRequest();
	    req.open('GET', query);
	    req.onreadystatechange = function () {
	        if (req.readyState === 4) {
	            callPush(JSON.parse(req.responseText));
	            // l('New data just pushed to buffer:');
	            console.log(req.responseText);
	            if (callDisplay !== undefined) {
	                callDisplay(whatPage, numberOfImg);
	            }
	        }
	    };
	    req.send(null);
	};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function _class() {
	    _classCallCheck(this, _class);
	
	    document.querySelector('body').innerHTML = '<div class="container-1">\n                <h1 class="main-header">YouTube Spy</h1>\n                <section id="form-entry">\n                    <form id="js-youtube-search-form">\n                        <label class="entry-label" for="search-entry" id="spy-label"><b>SPY MESSAGE....</b></label>\n                        <input type="text" name="search-entry" id="search-entry" class="search-input" placeholder="e.g., qwerty" required>\n                        <button type="submit" class="search-button">Search</button>\n                    </form>\n                </section>\n                <section id="search-results" class="search-results" hidden>\n                    <!--search-results-->\n                    <div class="row-1" id="row">\n                    </div>\n                    <div class="tooltip" id="tooltip-animation">\n                    </div>\n                    <!--pagination-->  \n                    <nav aria-label="Page navigation" id="navPages">\n                    </nav>\n                </section>\n                <section id="no-results" hidden>\n                    <p>Sorry, no results were found for your query.</p>\n                </section>\n            </div>';
	};
	
	exports.default = _class;

/***/ })
/******/ ]);
//# sourceMappingURL=driver.js.map