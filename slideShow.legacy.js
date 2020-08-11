function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function () {
        var self = this, args = arguments;
        return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);

            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }

            _next(undefined);
        });
    };
}

function _asyncIterator(iterable) {
    var method;
    if (typeof Symbol !== "undefined") {
        if (Symbol.asyncIterator) {
            method = iterable[Symbol.asyncIterator];
            if (method != null) return method.call(iterable);
        }
        if (Symbol.iterator) {
            method = iterable[Symbol.iterator];
            if (method != null) return method.call(iterable);
        }
    }
    throw new TypeError("Object is not async iterable");
}

function runSlideShow() {
    document.body.classList.toggle('loaded', true);
    var slides = document.querySelectorAll('body>img');
    var slidesCount = slides.length;
    var currentSlide = -1;
    var nextSlide = 0;

    function showSlide() {
        nextSlide = slides[currentSlide + 1] ? currentSlide + 1 : 0;
        if (slides[nextSlide]) slides[nextSlide].style.setProperty('opacity', 1);
        if (slides[currentSlide]) slides[currentSlide].style.setProperty('opacity', 0);
        currentSlide = nextSlide;
    }

    showSlide();
    setInterval(showSlide, 15000);
}

function loadImage(src, i) {
    return new Promise(function (resolve, reject) {
        var img = document.createElement('img');

        img.onload = function () {
            return resolve(true);
        }; // img.style.setProperty('--i', i);


        img.src = src;
        document.body.appendChild(img);
    });
}

function init() {
    return _init.apply(this, arguments);
}

function _init() {
    _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var slides, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, slide;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return fetch('https://script.google.com/macros/s/AKfycbxOt0XDe9im0w1RYcWl-xs3QnVhw0K9Zwr9-kXDif_t1hTO7MF8/exec', {
                            mode: 'cors'
                        }).then(function (r) {
                            return r.json();
                        });

                    case 2:
                        slides = _context.sent;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _context.prev = 5;
                        _iterator = _asyncIterator(slides);

                    case 7:
                        _context.next = 9;
                        return _iterator.next();

                    case 9:
                        _step = _context.sent;
                        _iteratorNormalCompletion = _step.done;
                        _context.next = 13;
                        return _step.value;

                    case 13:
                        _value = _context.sent;

                        if (_iteratorNormalCompletion) {
                            _context.next = 21;
                            break;
                        }

                        slide = _value;
                        _context.next = 18;
                        return loadImage(slide, slides.indexOf(slide) + 1);

                    case 18:
                        _iteratorNormalCompletion = true;
                        _context.next = 7;
                        break;

                    case 21:
                        _context.next = 27;
                        break;

                    case 23:
                        _context.prev = 23;
                        _context.t0 = _context["catch"](5);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 27:
                        _context.prev = 27;
                        _context.prev = 28;

                        if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
                            _context.next = 32;
                            break;
                        }

                        _context.next = 32;
                        return _iterator["return"]();

                    case 32:
                        _context.prev = 32;

                        if (!_didIteratorError) {
                            _context.next = 35;
                            break;
                        }

                        throw _iteratorError;

                    case 35:
                        return _context.finish(32);

                    case 36:
                        return _context.finish(27);

                    case 37:
                        runSlideShow();

                    case 38:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, null, [[5, 23, 27, 37], [28, , 32, 36]]);
    }));
    return _init.apply(this, arguments);
}

init();