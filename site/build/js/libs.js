"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 angular-file-upload v2.5.0
 https://github.com/nervgh/angular-file-upload
*/

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports["angular-file-upload"] = t() : e["angular-file-upload"] = t();
}(undefined, function () {
  return function (e) {
    function t(o) {
      if (n[o]) return n[o].exports;var r = n[o] = { exports: {}, id: o, loaded: !1 };return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports;
    }var n = {};return t.m = e, t.c = n, t.p = "", t(0);
  }([function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }var r = n(1),
        i = o(r),
        s = n(2),
        a = o(s),
        u = n(3),
        l = o(u),
        p = n(4),
        c = o(p),
        f = n(5),
        d = o(f),
        h = n(6),
        y = o(h),
        v = n(7),
        m = o(v),
        _ = n(8),
        g = o(_),
        b = n(9),
        F = o(b),
        O = n(10),
        C = o(O),
        w = n(11),
        A = o(w),
        I = n(12),
        T = o(I),
        U = n(13),
        x = o(U);angular.module(i["default"].name, []).value("fileUploaderOptions", a["default"]).factory("FileUploader", l["default"]).factory("FileLikeObject", c["default"]).factory("FileItem", d["default"]).factory("FileDirective", y["default"]).factory("FileSelect", m["default"]).factory("FileDrop", F["default"]).factory("FileOver", C["default"]).factory("Pipeline", g["default"]).directive("nvFileSelect", A["default"]).directive("nvFileDrop", T["default"]).directive("nvFileOver", x["default"]).run(["FileUploader", "FileLikeObject", "FileItem", "FileDirective", "FileSelect", "FileDrop", "FileOver", "Pipeline", function (e, t, n, o, r, i, s, a) {
      e.FileLikeObject = t, e.FileItem = n, e.FileDirective = o, e.FileSelect = r, e.FileDrop = i, e.FileOver = s, e.Pipeline = a;
    }]);
  }, function (e, t) {
    e.exports = { name: "angularFileUpload" };
  }, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = { url: "/", alias: "file", headers: {}, queue: [], progress: 0, autoUpload: !1, removeAfterUpload: !1, method: "POST", filters: [], formData: [], queueLimit: Number.MAX_VALUE, withCredentials: !1, disableMultipart: !1 };
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function i(e, t, n, o, i, a, u, g) {
      var b = o.File,
          F = o.FormData,
          O = function () {
        function o(t) {
          r(this, o);var n = p(e);c(this, n, t, { isUploading: !1, _nextIndex: 0, _directives: { select: [], drop: [], over: [] } }), this.filters.unshift({ name: "queueLimit", fn: this._queueLimitFilter }), this.filters.unshift({ name: "folder", fn: this._folderFilter });
        }return o.prototype.addToQueue = function (e, t, n) {
          var o = this,
              r = this.isArrayLikeObject(e) ? Array.prototype.slice.call(e) : [e],
              i = this._getFilters(n),
              l = this.queue.length,
              p = [],
              c = function d() {
            var e = r.shift();if (m(e)) return f();var n = o.isFile(e) ? e : new a(e),
                l = o._convertFiltersToPipes(i),
                c = new g(l),
                h = function h(e) {
              var t = e.pipe.originalFilter,
                  n = s(e.args, 2),
                  r = n[0],
                  i = n[1];o._onWhenAddingFileFailed(r, t, i), d();
            },
                y = function y(e, t) {
              var n = new u(o, e, t);p.push(n), o.queue.push(n), o._onAfterAddingFile(n), d();
            };c.onThrown = h, c.onSuccessful = y, c.exec(n, t);
          },
              f = function f() {
            o.queue.length !== l && (o._onAfterAddingAll(p), o.progress = o._getTotalProgress()), o._render(), o.autoUpload && o.uploadAll();
          };c();
        }, o.prototype.removeFromQueue = function (e) {
          var t = this.getIndexOfItem(e),
              n = this.queue[t];n.isUploading && n.cancel(), this.queue.splice(t, 1), n._destroy(), this.progress = this._getTotalProgress();
        }, o.prototype.clearQueue = function () {
          for (; this.queue.length;) {
            this.queue[0].remove();
          }this.progress = 0;
        }, o.prototype.uploadItem = function (e) {
          var t = this.getIndexOfItem(e),
              n = this.queue[t],
              o = this.isHTML5 ? "_xhrTransport" : "_iframeTransport";n._prepareToUploading(), this.isUploading || (this._onBeforeUploadItem(n), n.isCancel || (n.isUploading = !0, this.isUploading = !0, this[o](n), this._render()));
        }, o.prototype.cancelItem = function (e) {
          var t = this,
              n = this.getIndexOfItem(e),
              o = this.queue[n],
              r = this.isHTML5 ? "_xhr" : "_form";o && (o.isCancel = !0, o.isUploading ? o[r].abort() : !function () {
            var e = [void 0, 0, {}],
                n = function n() {
              t._onCancelItem.apply(t, [o].concat(e)), t._onCompleteItem.apply(t, [o].concat(e));
            };i(n);
          }());
        }, o.prototype.uploadAll = function () {
          var e = this.getNotUploadedItems().filter(function (e) {
            return !e.isUploading;
          });e.length && (f(e, function (e) {
            return e._prepareToUploading();
          }), e[0].upload());
        }, o.prototype.cancelAll = function () {
          var e = this.getNotUploadedItems();f(e, function (e) {
            return e.cancel();
          });
        }, o.prototype.isFile = function (e) {
          return this.constructor.isFile(e);
        }, o.prototype.isFileLikeObject = function (e) {
          return this.constructor.isFileLikeObject(e);
        }, o.prototype.isArrayLikeObject = function (e) {
          return this.constructor.isArrayLikeObject(e);
        }, o.prototype.getIndexOfItem = function (e) {
          return h(e) ? e : this.queue.indexOf(e);
        }, o.prototype.getNotUploadedItems = function () {
          return this.queue.filter(function (e) {
            return !e.isUploaded;
          });
        }, o.prototype.getReadyItems = function () {
          return this.queue.filter(function (e) {
            return e.isReady && !e.isUploading;
          }).sort(function (e, t) {
            return e.index - t.index;
          });
        }, o.prototype.destroy = function () {
          var e = this;f(this._directives, function (t) {
            f(e._directives[t], function (e) {
              e.destroy();
            });
          });
        }, o.prototype.onAfterAddingAll = function (e) {}, o.prototype.onAfterAddingFile = function (e) {}, o.prototype.onWhenAddingFileFailed = function (e, t, n) {}, o.prototype.onBeforeUploadItem = function (e) {}, o.prototype.onProgressItem = function (e, t) {}, o.prototype.onProgressAll = function (e) {}, o.prototype.onSuccessItem = function (e, t, n, o) {}, o.prototype.onErrorItem = function (e, t, n, o) {}, o.prototype.onCancelItem = function (e, t, n, o) {}, o.prototype.onCompleteItem = function (e, t, n, o) {}, o.prototype.onCompleteAll = function () {}, o.prototype._getTotalProgress = function (e) {
          if (this.removeAfterUpload) return e || 0;var t = this.getNotUploadedItems().length,
              n = t ? this.queue.length - t : this.queue.length,
              o = 100 / this.queue.length,
              r = (e || 0) * o / 100;return Math.round(n * o + r);
        }, o.prototype._getFilters = function (e) {
          if (!e) return this.filters;if (v(e)) return e;var t = e.match(/[^\s,]+/g);return this.filters.filter(function (e) {
            return -1 !== t.indexOf(e.name);
          });
        }, o.prototype._convertFiltersToPipes = function (e) {
          var t = this;return e.map(function (e) {
            var n = l(t, e.fn);return n.isAsync = 3 === e.fn.length, n.originalFilter = e, n;
          });
        }, o.prototype._render = function () {
          t.$$phase || t.$apply();
        }, o.prototype._folderFilter = function (e) {
          return !(!e.size && !e.type);
        }, o.prototype._queueLimitFilter = function () {
          return this.queue.length < this.queueLimit;
        }, o.prototype._isSuccessCode = function (e) {
          return e >= 200 && 300 > e || 304 === e;
        }, o.prototype._transformResponse = function (e, t) {
          var o = this._headersGetter(t);return f(n.defaults.transformResponse, function (t) {
            e = t(e, o);
          }), e;
        }, o.prototype._parseHeaders = function (e) {
          var t,
              n,
              o,
              r = {};return e ? (f(e.split("\n"), function (e) {
            o = e.indexOf(":"), t = e.slice(0, o).trim().toLowerCase(), n = e.slice(o + 1).trim(), t && (r[t] = r[t] ? r[t] + ", " + n : n);
          }), r) : r;
        }, o.prototype._headersGetter = function (e) {
          return function (t) {
            return t ? e[t.toLowerCase()] || null : e;
          };
        }, o.prototype._xhrTransport = function (e) {
          var t,
              n = this,
              o = e._xhr = new XMLHttpRequest();if (e.disableMultipart ? t = e._file : (t = new F(), f(e.formData, function (e) {
            f(e, function (e, n) {
              t.append(n, e);
            });
          }), t.append(e.alias, e._file, e.file.name)), "number" != typeof e._file.size) throw new TypeError("The file specified is no longer valid");o.upload.onprogress = function (t) {
            var o = Math.round(t.lengthComputable ? 100 * t.loaded / t.total : 0);n._onProgressItem(e, o);
          }, o.onload = function () {
            var t = n._parseHeaders(o.getAllResponseHeaders()),
                r = n._transformResponse(o.response, t),
                i = n._isSuccessCode(o.status) ? "Success" : "Error",
                s = "_on" + i + "Item";n[s](e, r, o.status, t), n._onCompleteItem(e, r, o.status, t);
          }, o.onerror = function () {
            var t = n._parseHeaders(o.getAllResponseHeaders()),
                r = n._transformResponse(o.response, t);n._onErrorItem(e, r, o.status, t), n._onCompleteItem(e, r, o.status, t);
          }, o.onabort = function () {
            var t = n._parseHeaders(o.getAllResponseHeaders()),
                r = n._transformResponse(o.response, t);n._onCancelItem(e, r, o.status, t), n._onCompleteItem(e, r, o.status, t);
          }, o.open(e.method, e.url, !0), o.withCredentials = e.withCredentials, f(e.headers, function (e, t) {
            o.setRequestHeader(t, e);
          }), o.send(t);
        }, o.prototype._iframeTransport = function (e) {
          var t = this,
              n = _('<form style="display: none;" />'),
              o = _('<iframe name="iframeTransport' + Date.now() + '">'),
              r = e._input;e._form && e._form.replaceWith(r), e._form = n, r.prop("name", e.alias), f(e.formData, function (e) {
            f(e, function (e, t) {
              var o = _('<input type="hidden" name="' + t + '" />');o.val(e), n.append(o);
            });
          }), n.prop({ action: e.url, method: "POST", target: o.prop("name"), enctype: "multipart/form-data", encoding: "multipart/form-data" }), o.bind("load", function () {
            var n = "",
                r = 200;try {
              n = o[0].contentDocument.body.innerHTML;
            } catch (i) {
              r = 500;
            }var s = { response: n, status: r, dummy: !0 },
                a = {},
                u = t._transformResponse(s.response, a);t._onSuccessItem(e, u, s.status, a), t._onCompleteItem(e, u, s.status, a);
          }), n.abort = function () {
            var i,
                s = { status: 0, dummy: !0 },
                a = {};o.unbind("load").prop("src", "javascript:false;"), n.replaceWith(r), t._onCancelItem(e, i, s.status, a), t._onCompleteItem(e, i, s.status, a);
          }, r.after(n), n.append(r).append(o), n[0].submit();
        }, o.prototype._onWhenAddingFileFailed = function (e, t, n) {
          this.onWhenAddingFileFailed(e, t, n);
        }, o.prototype._onAfterAddingFile = function (e) {
          this.onAfterAddingFile(e);
        }, o.prototype._onAfterAddingAll = function (e) {
          this.onAfterAddingAll(e);
        }, o.prototype._onBeforeUploadItem = function (e) {
          e._onBeforeUpload(), this.onBeforeUploadItem(e);
        }, o.prototype._onProgressItem = function (e, t) {
          var n = this._getTotalProgress(t);this.progress = n, e._onProgress(t), this.onProgressItem(e, t), this.onProgressAll(n), this._render();
        }, o.prototype._onSuccessItem = function (e, t, n, o) {
          e._onSuccess(t, n, o), this.onSuccessItem(e, t, n, o);
        }, o.prototype._onErrorItem = function (e, t, n, o) {
          e._onError(t, n, o), this.onErrorItem(e, t, n, o);
        }, o.prototype._onCancelItem = function (e, t, n, o) {
          e._onCancel(t, n, o), this.onCancelItem(e, t, n, o);
        }, o.prototype._onCompleteItem = function (e, t, n, o) {
          e._onComplete(t, n, o), this.onCompleteItem(e, t, n, o);var r = this.getReadyItems()[0];return this.isUploading = !1, y(r) ? void r.upload() : (this.onCompleteAll(), this.progress = this._getTotalProgress(), void this._render());
        }, o.isFile = function (e) {
          return b && e instanceof b;
        }, o.isFileLikeObject = function (e) {
          return e instanceof a;
        }, o.isArrayLikeObject = function (e) {
          return d(e) && "length" in e;
        }, o.inherit = function (e, t) {
          e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.super_ = t;
        }, o;
      }();return O.prototype.isHTML5 = !(!b || !F), O.isHTML5 = O.prototype.isHTML5, O;
    }Object.defineProperty(t, "__esModule", { value: !0 });var s = function () {
      function e(e, t) {
        var n = [],
            o = !0,
            r = !1,
            i = void 0;try {
          for (var s, a = e[Symbol.iterator](); !(o = (s = a.next()).done) && (n.push(s.value), !t || n.length !== t); o = !0) {}
        } catch (u) {
          r = !0, i = u;
        } finally {
          try {
            !o && a["return"] && a["return"]();
          } finally {
            if (r) throw i;
          }
        }return n;
      }return function (t, n) {
        if (Array.isArray(t)) return t;if (Symbol.iterator in Object(t)) return e(t, n);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }();t["default"] = i;var a = n(1),
        u = (o(a), angular),
        l = u.bind,
        p = u.copy,
        c = u.extend,
        f = u.forEach,
        d = u.isObject,
        h = u.isNumber,
        y = u.isDefined,
        v = u.isArray,
        m = u.isUndefined,
        _ = u.element;i.$inject = ["fileUploaderOptions", "$rootScope", "$http", "$window", "$timeout", "FileLikeObject", "FileItem", "Pipeline"];
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function i() {
      return function () {
        function e(t) {
          r(this, e);var n = l(t),
              o = n ? t.value : t,
              i = p(o) ? "FakePath" : "Object",
              s = "_createFrom" + i;this[s](o);
        }return e.prototype._createFromFakePath = function (e) {
          this.lastModifiedDate = null, this.size = null, this.type = "like/" + e.slice(e.lastIndexOf(".") + 1).toLowerCase(), this.name = e.slice(e.lastIndexOf("/") + e.lastIndexOf("\\") + 2);
        }, e.prototype._createFromObject = function (e) {
          this.lastModifiedDate = u(e.lastModifiedDate), this.size = e.size, this.type = e.type, this.name = e.name;
        }, e;
      }();
    }Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = i;var s = n(1),
        a = (o(s), angular),
        u = a.copy,
        l = a.isElement,
        p = a.isString;
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function i(e, t) {
      return function () {
        function n(e, o, i) {
          r(this, n);var s = c(o),
              a = s ? p(o) : null,
              f = s ? null : o;l(this, { url: e.url, alias: e.alias, headers: u(e.headers), formData: u(e.formData), removeAfterUpload: e.removeAfterUpload, withCredentials: e.withCredentials, disableMultipart: e.disableMultipart, method: e.method }, i, { uploader: e, file: new t(o), isReady: !1, isUploading: !1, isUploaded: !1, isSuccess: !1, isCancel: !1, isError: !1, progress: 0, index: null, _file: f, _input: a }), a && this._replaceNode(a);
        }return n.prototype.upload = function () {
          try {
            this.uploader.uploadItem(this);
          } catch (e) {
            var t = e.name + ":" + e.message;this.uploader._onCompleteItem(this, t, e.code, []), this.uploader._onErrorItem(this, t, e.code, []);
          }
        }, n.prototype.cancel = function () {
          this.uploader.cancelItem(this);
        }, n.prototype.remove = function () {
          this.uploader.removeFromQueue(this);
        }, n.prototype.onBeforeUpload = function () {}, n.prototype.onProgress = function (e) {}, n.prototype.onSuccess = function (e, t, n) {}, n.prototype.onError = function (e, t, n) {}, n.prototype.onCancel = function (e, t, n) {}, n.prototype.onComplete = function (e, t, n) {}, n.prototype._onBeforeUpload = function () {
          this.isReady = !0, this.isUploading = !1, this.isUploaded = !1, this.isSuccess = !1, this.isCancel = !1, this.isError = !1, this.progress = 0, this.onBeforeUpload();
        }, n.prototype._onProgress = function (e) {
          this.progress = e, this.onProgress(e);
        }, n.prototype._onSuccess = function (e, t, n) {
          this.isReady = !1, this.isUploading = !1, this.isUploaded = !0, this.isSuccess = !0, this.isCancel = !1, this.isError = !1, this.progress = 100, this.index = null, this.onSuccess(e, t, n);
        }, n.prototype._onError = function (e, t, n) {
          this.isReady = !1, this.isUploading = !1, this.isUploaded = !0, this.isSuccess = !1, this.isCancel = !1, this.isError = !0, this.progress = 0, this.index = null, this.onError(e, t, n);
        }, n.prototype._onCancel = function (e, t, n) {
          this.isReady = !1, this.isUploading = !1, this.isUploaded = !1, this.isSuccess = !1, this.isCancel = !0, this.isError = !1, this.progress = 0, this.index = null, this.onCancel(e, t, n);
        }, n.prototype._onComplete = function (e, t, n) {
          this.onComplete(e, t, n), this.removeAfterUpload && this.remove();
        }, n.prototype._destroy = function () {
          this._input && this._input.remove(), this._form && this._form.remove(), delete this._form, delete this._input;
        }, n.prototype._prepareToUploading = function () {
          this.index = this.index || ++this.uploader._nextIndex, this.isReady = !0;
        }, n.prototype._replaceNode = function (t) {
          var n = e(t.clone())(t.scope());n.prop("value", null), t.css("display", "none"), t.after(n);
        }, n;
      }();
    }Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = i;var s = n(1),
        a = (o(s), angular),
        u = a.copy,
        l = a.extend,
        p = a.element,
        c = a.isElement;i.$inject = ["$compile", "FileLikeObject"];
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function i() {
      var e = function () {
        function e(t) {
          r(this, e), u(this, t), this.uploader._directives[this.prop].push(this), this._saveLinks(), this.bind();
        }return e.prototype.bind = function () {
          for (var e in this.events) {
            var t = this.events[e];this.element.bind(e, this[t]);
          }
        }, e.prototype.unbind = function () {
          for (var e in this.events) {
            this.element.unbind(e, this.events[e]);
          }
        }, e.prototype.destroy = function () {
          var e = this.uploader._directives[this.prop].indexOf(this);this.uploader._directives[this.prop].splice(e, 1), this.unbind();
        }, e.prototype._saveLinks = function () {
          for (var e in this.events) {
            var t = this.events[e];this[t] = this[t].bind(this);
          }
        }, e;
      }();return e.prototype.events = {}, e;
    }Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = i;var s = n(1),
        a = (o(s), angular),
        u = a.extend;
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
    }function s(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }function a(e, t) {
      return function (t) {
        function n(e) {
          r(this, n);var o = p(e, { events: { $destroy: "destroy", change: "onChange" }, prop: "select" }),
              s = i(this, t.call(this, o));return s.uploader.isHTML5 || s.element.removeAttr("multiple"), s.element.prop("value", null), s;
        }return s(n, t), n.prototype.getOptions = function () {}, n.prototype.getFilters = function () {}, n.prototype.isEmptyAfterSelection = function () {
          return !!this.element.attr("multiple");
        }, n.prototype.onChange = function () {
          var t = this.uploader.isHTML5 ? this.element[0].files : this.element[0],
              n = this.getOptions(),
              o = this.getFilters();this.uploader.isHTML5 || this.destroy(), this.uploader.addToQueue(t, n, o), this.isEmptyAfterSelection() && (this.element.prop("value", null), this.element.replaceWith(e(this.element.clone())(this.scope)));
        }, n;
      }(t);
    }Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = a;var u = n(1),
        l = (o(u), angular),
        p = l.extend;a.$inject = ["$compile", "FileDirective"];
  }, function (e, t) {
    "use strict";
    function n(e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) {
          n[t] = e[t];
        }return n;
      }return Array.from(e);
    }function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function r(e) {
      return function () {
        function t() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];o(this, t), this.pipes = e;
        }return t.prototype.next = function (t) {
          var o = this.pipes.shift();if (a(o)) return void this.onSuccessful.apply(this, n(t));var r = new Error("The filter has not passed");if (r.pipe = o, r.args = t, o.isAsync) {
            var i = e.defer(),
                u = s(this, this.next, t),
                l = s(this, this.onThrown, r);i.promise.then(u, l), o.apply(void 0, n(t).concat([i]));
          } else {
            var p = Boolean(o.apply(void 0, n(t)));p ? this.next(t) : this.onThrown(r);
          }
        }, t.prototype.exec = function () {
          for (var e = arguments.length, t = Array(e), n = 0; e > n; n++) {
            t[n] = arguments[n];
          }this.next(t);
        }, t.prototype.onThrown = function (e) {}, t.prototype.onSuccessful = function () {}, t;
      }();
    }Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = r;var i = angular,
        s = i.bind,
        a = i.isUndefined;r.$inject = ["$q"];
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
    }function s(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }function a(e) {
      return function (e) {
        function t(n) {
          r(this, t);var o = p(n, { events: { $destroy: "destroy", drop: "onDrop", dragover: "onDragOver", dragleave: "onDragLeave" }, prop: "drop" });return i(this, e.call(this, o));
        }return s(t, e), t.prototype.getOptions = function () {}, t.prototype.getFilters = function () {}, t.prototype.onDrop = function (e) {
          var t = this._getTransfer(e);if (t) {
            var n = this.getOptions(),
                o = this.getFilters();this._preventAndStop(e), c(this.uploader._directives.over, this._removeOverClass, this), this.uploader.addToQueue(t.files, n, o);
          }
        }, t.prototype.onDragOver = function (e) {
          var t = this._getTransfer(e);this._haveFiles(t.types) && (t.dropEffect = "copy", this._preventAndStop(e), c(this.uploader._directives.over, this._addOverClass, this));
        }, t.prototype.onDragLeave = function (e) {
          e.currentTarget !== this.element[0] && (this._preventAndStop(e), c(this.uploader._directives.over, this._removeOverClass, this));
        }, t.prototype._getTransfer = function (e) {
          return e.dataTransfer ? e.dataTransfer : e.originalEvent.dataTransfer;
        }, t.prototype._preventAndStop = function (e) {
          e.preventDefault(), e.stopPropagation();
        }, t.prototype._haveFiles = function (e) {
          return e ? e.indexOf ? -1 !== e.indexOf("Files") : e.contains ? e.contains("Files") : !1 : !1;
        }, t.prototype._addOverClass = function (e) {
          e.addOverClass();
        }, t.prototype._removeOverClass = function (e) {
          e.removeOverClass();
        }, t;
      }(e);
    }Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = a;var u = n(1),
        l = (o(u), angular),
        p = l.extend,
        c = l.forEach;a.$inject = ["FileDirective"];
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
    }function s(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }function a(e) {
      return function (e) {
        function t(n) {
          r(this, t);var o = p(n, { events: { $destroy: "destroy" }, prop: "over", overClass: "nv-file-over" });return i(this, e.call(this, o));
        }return s(t, e), t.prototype.addOverClass = function () {
          this.element.addClass(this.getOverClass());
        }, t.prototype.removeOverClass = function () {
          this.element.removeClass(this.getOverClass());
        }, t.prototype.getOverClass = function () {
          return this.overClass;
        }, t;
      }(e);
    }Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = a;var u = n(1),
        l = (o(u), angular),
        p = l.extend;a.$inject = ["FileDirective"];
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }function r(e, t, n) {
      return { link: function link(o, r, i) {
          var s = o.$eval(i.uploader);if (!(s instanceof t)) throw new TypeError('"Uploader" must be an instance of FileUploader');var a = new n({ uploader: s, element: r, scope: o });a.getOptions = e(i.options).bind(a, o), a.getFilters = function () {
            return i.filters;
          };
        } };
    }Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = r;var i = n(1);o(i);r.$inject = ["$parse", "FileUploader", "FileSelect"];
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }function r(e, t, n) {
      return { link: function link(o, r, i) {
          var s = o.$eval(i.uploader);if (!(s instanceof t)) throw new TypeError('"Uploader" must be an instance of FileUploader');if (s.isHTML5) {
            var a = new n({ uploader: s, element: r });a.getOptions = e(i.options).bind(a, o), a.getFilters = function () {
              return i.filters;
            };
          }
        } };
    }Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = r;var i = n(1);o(i);r.$inject = ["$parse", "FileUploader", "FileDrop"];
  }, function (e, t, n) {
    "use strict";
    function o(e) {
      return e && e.__esModule ? e : { "default": e };
    }function r(e, t) {
      return { link: function link(n, o, r) {
          var i = n.$eval(r.uploader);if (!(i instanceof e)) throw new TypeError('"Uploader" must be an instance of FileUploader');var s = new t({ uploader: i, element: o });s.getOverClass = function () {
            return r.overClass || s.overClass;
          };
        } };
    }Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = r;var i = n(1);o(i);r.$inject = ["FileUploader", "FileOver"];
  }]);
});
//# sourceMappingURL=angular-file-upload.min.js.map
"use strict";

/*
 AngularJS v1.6.2
 (c) 2010-2017 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (J, d) {
  'use strict';
  function A(d) {
    k && d.get("$route");
  }function B(t, u, g) {
    return { restrict: "ECA", terminal: !0, priority: 400, transclude: "element", link: function link(a, f, b, c, m) {
        function v() {
          l && (g.cancel(l), l = null);n && (n.$destroy(), n = null);p && (l = g.leave(p), l.done(function (a) {
            !1 !== a && (l = null);
          }), p = null);
        }function E() {
          var b = t.current && t.current.locals;if (d.isDefined(b && b.$template)) {
            var b = a.$new(),
                c = t.current;p = m(b, function (b) {
              g.enter(b, null, p || f).done(function (b) {
                !1 === b || !d.isDefined(w) || w && !a.$eval(w) || u();
              });
              v();
            });n = c.scope = b;n.$emit("$viewContentLoaded");n.$eval(k);
          } else v();
        }var n,
            p,
            l,
            w = b.autoscroll,
            k = b.onload || "";a.$on("$routeChangeSuccess", E);E();
      } };
  }function C(d, k, g) {
    return { restrict: "ECA", priority: -400, link: function link(a, f) {
        var b = g.current,
            c = b.locals;f.html(c.$template);var m = d(f.contents());if (b.controller) {
          c.$scope = a;var v = k(b.controller, c);b.controllerAs && (a[b.controllerAs] = v);f.data("$ngControllerController", v);f.children().data("$ngControllerController", v);
        }a[b.resolveAs || "$resolve"] = c;m(a);
      } };
  }var x,
      y,
      F,
      G,
      z = d.module("ngRoute", []).provider("$route", function () {
    function t(a, f) {
      return d.extend(Object.create(a), f);
    }function u(a, d) {
      var b = d.caseInsensitiveMatch,
          c = { originalPath: a, regexp: a },
          g = c.keys = [];a = a.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)(\*\?|[?*])?/g, function (a, b, d, c) {
        a = "?" === c || "*?" === c ? "?" : null;c = "*" === c || "*?" === c ? "*" : null;g.push({ name: d, optional: !!a });b = b || "";return "" + (a ? "" : b) + "(?:" + (a ? b : "") + (c && "(.+?)" || "([^/]+)") + (a || "") + ")" + (a || "");
      }).replace(/([/$*])/g, "\\$1");c.regexp = new RegExp("^" + a + "$", b ? "i" : "");return c;
    }x = d.isArray;y = d.isObject;F = d.isDefined;G = d.noop;var g = {};this.when = function (a, f) {
      var b;b = void 0;if (x(f)) {
        b = b || [];for (var c = 0, m = f.length; c < m; c++) {
          b[c] = f[c];
        }
      } else if (y(f)) for (c in b = b || {}, f) {
        if ("$" !== c.charAt(0) || "$" !== c.charAt(1)) b[c] = f[c];
      }b = b || f;d.isUndefined(b.reloadOnSearch) && (b.reloadOnSearch = !0);d.isUndefined(b.caseInsensitiveMatch) && (b.caseInsensitiveMatch = this.caseInsensitiveMatch);g[a] = d.extend(b, a && u(a, b));a && (c = "/" === a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/", g[c] = d.extend({ redirectTo: a }, u(c, b)));return this;
    };this.caseInsensitiveMatch = !1;this.otherwise = function (a) {
      "string" === typeof a && (a = { redirectTo: a });this.when(null, a);return this;
    };k = !0;this.eagerInstantiationEnabled = function (a) {
      return F(a) ? (k = a, this) : k;
    };this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", "$browser", function (a, f, b, c, m, k, u, n) {
      function p(e) {
        var h = q.current;(y = (s = C()) && h && s.$$route === h.$$route && d.equals(s.pathParams, h.pathParams) && !s.reloadOnSearch && !D) || !h && !s || a.$broadcast("$routeChangeStart", s, h).defaultPrevented && e && e.preventDefault();
      }function l() {
        var e = q.current,
            h = s;if (y) e.params = h.params, d.copy(e.params, b), a.$broadcast("$routeUpdate", e);else if (h || e) {
          D = !1;q.current = h;var H = c.resolve(h);n.$$incOutstandingRequestCount();H.then(w).then(z).then(function (c) {
            return c && H.then(A).then(function (c) {
              h === q.current && (h && (h.locals = c, d.copy(h.params, b)), a.$broadcast("$routeChangeSuccess", h, e));
            });
          }).catch(function (b) {
            h === q.current && a.$broadcast("$routeChangeError", h, e, b);
          }).finally(function () {
            n.$$completeOutstandingRequest(G);
          });
        }
      }
      function w(e) {
        var a = { route: e, hasRedirection: !1 };if (e) if (e.redirectTo) {
          if (d.isString(e.redirectTo)) a.path = x(e.redirectTo, e.params), a.search = e.params, a.hasRedirection = !0;else {
            var b = f.path(),
                g = f.search();e = e.redirectTo(e.pathParams, b, g);d.isDefined(e) && (a.url = e, a.hasRedirection = !0);
          }
        } else if (e.resolveRedirectTo) return c.resolve(m.invoke(e.resolveRedirectTo)).then(function (e) {
          d.isDefined(e) && (a.url = e, a.hasRedirection = !0);return a;
        });return a;
      }function z(a) {
        var b = !0;if (a.route !== q.current) b = !1;else if (a.hasRedirection) {
          var d = f.url(),
              c = a.url;c ? f.url(c).replace() : c = f.path(a.path).search(a.search).replace().url();c !== d && (b = !1);
        }return b;
      }function A(a) {
        if (a) {
          var b = d.extend({}, a.resolve);d.forEach(b, function (a, e) {
            b[e] = d.isString(a) ? m.get(a) : m.invoke(a, null, null, e);
          });a = B(a);d.isDefined(a) && (b.$template = a);return c.all(b);
        }
      }function B(a) {
        var b, c;d.isDefined(b = a.template) ? d.isFunction(b) && (b = b(a.params)) : d.isDefined(c = a.templateUrl) && (d.isFunction(c) && (c = c(a.params)), d.isDefined(c) && (a.loadedTemplateUrl = u.valueOf(c), b = k(c)));return b;
      }
      function C() {
        var a, b;d.forEach(g, function (c, g) {
          var r;if (r = !b) {
            var k = f.path();r = c.keys;var m = {};if (c.regexp) {
              if (k = c.regexp.exec(k)) {
                for (var l = 1, n = k.length; l < n; ++l) {
                  var p = r[l - 1],
                      q = k[l];p && q && (m[p.name] = q);
                }r = m;
              } else r = null;
            } else r = null;r = a = r;
          }r && (b = t(c, { params: d.extend({}, f.search(), a), pathParams: a }), b.$$route = c);
        });return b || g[null] && t(g[null], { params: {}, pathParams: {} });
      }function x(a, b) {
        var c = [];d.forEach((a || "").split(":"), function (a, d) {
          if (0 === d) c.push(a);else {
            var e = a.match(/(\w+)(?:[?*])?(.*)/),
                f = e[1];
            c.push(b[f]);c.push(e[2] || "");delete b[f];
          }
        });return c.join("");
      }var D = !1,
          s,
          y,
          q = { routes: g, reload: function reload() {
          D = !0;var b = { defaultPrevented: !1, preventDefault: function preventDefault() {
              this.defaultPrevented = !0;D = !1;
            } };a.$evalAsync(function () {
            p(b);b.defaultPrevented || l();
          });
        }, updateParams: function updateParams(a) {
          if (this.current && this.current.$$route) a = d.extend({}, this.current.params, a), f.path(x(this.current.$$route.originalPath, a)), f.search(a);else throw I("norout");
        } };a.$on("$locationChangeStart", p);a.$on("$locationChangeSuccess", l);
      return q;
    }];
  }).run(A),
      I = d.$$minErr("ngRoute"),
      k;A.$inject = ["$injector"];z.provider("$routeParams", function () {
    this.$get = function () {
      return {};
    };
  });z.directive("ngView", B);z.directive("ngView", C);B.$inject = ["$route", "$anchorScroll", "$animate"];C.$inject = ["$compile", "$controller", "$route"];
})(window, window.angular);
//# sourceMappingURL=angular-route.min.js.map
"use strict";

/*
 AngularJS v1.6.2
 (c) 2010-2017 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (s, g) {
  'use strict';
  function H(g) {
    var l = [];t(l, A).chars(g);return l.join("");
  }var B = g.$$minErr("$sanitize"),
      C,
      l,
      D,
      E,
      q,
      A,
      F,
      t;g.module("ngSanitize", []).provider("$sanitize", function () {
    function k(a, e) {
      var b = {},
          c = a.split(","),
          h;for (h = 0; h < c.length; h++) {
        b[e ? q(c[h]) : c[h]] = !0;
      }return b;
    }function I(a) {
      for (var e = {}, b = 0, c = a.length; b < c; b++) {
        var h = a[b];e[h.name] = h.value;
      }return e;
    }function G(a) {
      return a.replace(/&/g, "&amp;").replace(J, function (a) {
        var b = a.charCodeAt(0);a = a.charCodeAt(1);return "&#" + (1024 * (b - 55296) + (a - 56320) + 65536) + ";";
      }).replace(K, function (a) {
        return "&#" + a.charCodeAt(0) + ";";
      }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }function x(a) {
      for (; a;) {
        if (a.nodeType === s.Node.ELEMENT_NODE) for (var e = a.attributes, b = 0, c = e.length; b < c; b++) {
          var h = e[b],
              d = h.name.toLowerCase();if ("xmlns:ns1" === d || 0 === d.lastIndexOf("ns1:", 0)) a.removeAttributeNode(h), b--, c--;
        }(e = a.firstChild) && x(e);a = a.nextSibling;
      }
    }var u = !1;this.$get = ["$$sanitizeUri", function (a) {
      u && l(v, w);return function (e) {
        var b = [];F(e, t(b, function (b, h) {
          return !/^unsafe:/.test(a(b, h));
        }));return b.join("");
      };
    }];this.enableSvg = function (a) {
      return E(a) ? (u = a, this) : u;
    };C = g.bind;l = g.extend;D = g.forEach;E = g.isDefined;q = g.lowercase;A = g.noop;F = function F(a, e) {
      null === a || void 0 === a ? a = "" : "string" !== typeof a && (a = "" + a);f.innerHTML = a;var b = 5;do {
        if (0 === b) throw B("uinput");b--;s.document.documentMode && x(f);a = f.innerHTML;f.innerHTML = a;
      } while (a !== f.innerHTML);for (b = f.firstChild; b;) {
        switch (b.nodeType) {case 1:
            e.start(b.nodeName.toLowerCase(), I(b.attributes));break;case 3:
            e.chars(b.textContent);}var c;if (!(c = b.firstChild) && (1 === b.nodeType && e.end(b.nodeName.toLowerCase()), c = b.nextSibling, !c)) for (; null == c;) {
          b = b.parentNode;if (b === f) break;c = b.nextSibling;1 === b.nodeType && e.end(b.nodeName.toLowerCase());
        }b = c;
      }for (; b = f.firstChild;) {
        f.removeChild(b);
      }
    };t = function t(a, e) {
      var b = !1,
          c = C(a, a.push);return { start: function start(a, d) {
          a = q(a);!b && z[a] && (b = a);b || !0 !== v[a] || (c("<"), c(a), D(d, function (b, d) {
            var f = q(d),
                g = "img" === a && "src" === f || "background" === f;!0 !== m[f] || !0 === n[f] && !e(b, g) || (c(" "), c(d), c('="'), c(G(b)), c('"'));
          }), c(">"));
        },
        end: function end(a) {
          a = q(a);b || !0 !== v[a] || !0 === y[a] || (c("</"), c(a), c(">"));a == b && (b = !1);
        }, chars: function chars(a) {
          b || c(G(a));
        } };
    };var J = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        K = /([^#-~ |!])/g,
        y = k("area,br,col,hr,img,wbr"),
        d = k("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        r = k("rp,rt"),
        p = l({}, r, d),
        d = l({}, d, k("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")),
        r = l({}, r, k("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
        w = k("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"),
        z = k("script,style"),
        v = l({}, y, d, r, p),
        n = k("background,cite,href,longdesc,src,xlink:href"),
        p = k("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),
        r = k("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan", !0),
        m = l({}, n, r, p),
        f;(function (a) {
      if (a.document && a.document.implementation) a = a.document.implementation.createHTMLDocument("inert");else throw B("noinert");var e = (a.documentElement || a.getDocumentElement()).getElementsByTagName("body");1 === e.length ? f = e[0] : (e = a.createElement("html"), f = a.createElement("body"), e.appendChild(f), a.appendChild(e));
    })(s);
  });g.module("ngSanitize").filter("linky", ["$sanitize", function (k) {
    var l = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
        q = /^mailto:/i,
        x = g.$$minErr("linky"),
        u = g.isDefined,
        s = g.isFunction,
        t = g.isObject,
        y = g.isString;return function (d, g, p) {
      function w(a) {
        a && m.push(H(a));
      }function z(a, b) {
        var c,
            d = v(a);m.push("<a ");for (c in d) {
          m.push(c + '="' + d[c] + '" ');
        }!u(g) || "target" in d || m.push('target="', g, '" ');m.push('href="', a.replace(/"/g, "&quot;"), '">');w(b);m.push("</a>");
      }if (null == d || "" === d) return d;if (!y(d)) throw x("notstring", d);for (var v = s(p) ? p : t(p) ? function () {
        return p;
      } : function () {
        return {};
      }, n = d, m = [], f, a; d = n.match(l);) {
        f = d[0], d[2] || d[4] || (f = (d[3] ? "http://" : "mailto:") + f), a = d.index, w(n.substr(0, a)), z(f, d[0].replace(q, "")), n = n.substring(a + d[0].length);
      }w(n);return k(m.join(""));
    };
  }]);
})(window, window.angular);
//# sourceMappingURL=angular-sanitize.min.js.map
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * angular-translate - v2.15.1 - 2017-03-04
 * 
 * Copyright (c) 2017 The angular-translate team, Pascal Precht; Licensed MIT
 */
!function (a, b) {
  "function" == typeof define && define.amd ? define([], function () {
    return b();
  }) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = b() : b();
}(undefined, function () {
  function a(a) {
    "use strict";
    var b = a.storageKey(),
        c = a.storage(),
        d = function d() {
      var d = a.preferredLanguage();angular.isString(d) ? a.use(d) : c.put(b, a.use());
    };d.displayName = "fallbackFromIncorrectStorageValue", c ? c.get(b) ? a.use(c.get(b)).catch(d) : d() : angular.isString(a.preferredLanguage()) && a.use(a.preferredLanguage());
  }function b() {
    "use strict";
    var a,
        b,
        c,
        d = null,
        e = !1,
        f = !1;c = { sanitize: function sanitize(a, b) {
        return "text" === b && (a = h(a)), a;
      }, escape: function escape(a, b) {
        return "text" === b && (a = g(a)), a;
      }, sanitizeParameters: function sanitizeParameters(a, b) {
        return "params" === b && (a = j(a, h)), a;
      }, escapeParameters: function escapeParameters(a, b) {
        return "params" === b && (a = j(a, g)), a;
      }, sce: function sce(a, b, c) {
        return "text" === b ? a = i(a) : "params" === b && "filter" !== c && (a = j(a, g)), a;
      }, sceParameters: function sceParameters(a, b) {
        return "params" === b && (a = j(a, i)), a;
      } }, c.escaped = c.escapeParameters, this.addStrategy = function (a, b) {
      return c[a] = b, this;
    }, this.removeStrategy = function (a) {
      return delete c[a], this;
    }, this.useStrategy = function (a) {
      return e = !0, d = a, this;
    }, this.$get = ["$injector", "$log", function (g, h) {
      var i = {},
          j = function j(a, b, d, e) {
        return angular.forEach(e, function (e) {
          if (angular.isFunction(e)) a = e(a, b, d);else if (angular.isFunction(c[e])) a = c[e](a, b, d);else {
            if (!angular.isString(c[e])) throw new Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '" + e + "'");if (!i[c[e]]) try {
              i[c[e]] = g.get(c[e]);
            } catch (a) {
              throw i[c[e]] = function () {}, new Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '" + e + "'");
            }a = i[c[e]](a, b, d);
          }
        }), a;
      },
          k = function k() {
        e || f || (h.warn("pascalprecht.translate.$translateSanitization: No sanitization strategy has been configured. This can have serious security implications. See http://angular-translate.github.io/docs/#/guide/19_security for details."), f = !0);
      };return g.has("$sanitize") && (a = g.get("$sanitize")), g.has("$sce") && (b = g.get("$sce")), { useStrategy: function (a) {
          return function (b) {
            a.useStrategy(b);
          };
        }(this), sanitize: function sanitize(a, b, c, e) {
          if (d || k(), c || null === c || (c = d), !c) return a;e || (e = "service");var f = angular.isArray(c) ? c : [c];return j(a, b, e, f);
        } };
    }];var g = function g(a) {
      var b = angular.element("<div></div>");return b.text(a), b.html();
    },
        h = function h(b) {
      if (!a) throw new Error("pascalprecht.translate.$translateSanitization: Error cannot find $sanitize service. Either include the ngSanitize module (https://docs.angularjs.org/api/ngSanitize) or use a sanitization strategy which does not depend on $sanitize, such as 'escape'.");return a(b);
    },
        i = function i(a) {
      if (!b) throw new Error("pascalprecht.translate.$translateSanitization: Error cannot find $sce service.");return b.trustAsHtml(a);
    },
        j = function j(a, b, c) {
      if (angular.isDate(a)) return a;if (angular.isObject(a)) {
        var d = angular.isArray(a) ? [] : {};if (c) {
          if (c.indexOf(a) > -1) throw new Error("pascalprecht.translate.$translateSanitization: Error cannot interpolate parameter due recursive object");
        } else c = [];return c.push(a), angular.forEach(a, function (a, e) {
          angular.isFunction(a) || (d[e] = j(a, b, c));
        }), c.splice(-1, 1), d;
      }return angular.isNumber(a) ? a : angular.isUndefined(a) || null === a ? a : b(a);
    };
  }function c(a, b, c, d) {
    "use strict";
    var e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u = {},
        v = [],
        w = a,
        x = [],
        y = "translate-cloak",
        z = !1,
        A = !1,
        B = ".",
        C = !1,
        D = !1,
        E = 0,
        F = !0,
        G = "default",
        H = { default: function _default(a) {
        return (a || "").split("-").join("_");
      }, java: function java(a) {
        var b = (a || "").split("-").join("_"),
            c = b.split("_");return c.length > 1 ? c[0].toLowerCase() + "_" + c[1].toUpperCase() : b;
      }, bcp47: function bcp47(a) {
        var b = (a || "").split("_").join("-"),
            c = b.split("-");return c.length > 1 ? c[0].toLowerCase() + "-" + c[1].toUpperCase() : b;
      }, "iso639-1": function iso6391(a) {
        var b = (a || "").split("_").join("-"),
            c = b.split("-");return c[0].toLowerCase();
      } },
        I = "2.15.1",
        J = function J() {
      if (angular.isFunction(d.getLocale)) return d.getLocale();var a,
          c,
          e = b.$get().navigator,
          f = ["language", "browserLanguage", "systemLanguage", "userLanguage"];if (angular.isArray(e.languages)) for (a = 0; a < e.languages.length; a++) {
        if (c = e.languages[a], c && c.length) return c;
      }for (a = 0; a < f.length; a++) {
        if (c = e[f[a]], c && c.length) return c;
      }return null;
    };J.displayName = "angular-translate/service: getFirstBrowserLanguage";var K = function K() {
      var a = J() || "";return H[G] && (a = H[G](a)), a;
    };K.displayName = "angular-translate/service: getLocale";var L = function L(a, b) {
      for (var c = 0, d = a.length; c < d; c++) {
        if (a[c] === b) return c;
      }return -1;
    },
        M = function M() {
      return this.toString().replace(/^\s+|\s+$/g, "");
    },
        N = function N(a) {
      if (a) {
        for (var b = [], c = angular.lowercase(a), d = 0, e = v.length; d < e; d++) {
          b.push(angular.lowercase(v[d]));
        }if (L(b, c) > -1) return a;if (f) {
          var g;for (var h in f) {
            if (f.hasOwnProperty(h)) {
              var i = !1,
                  j = Object.prototype.hasOwnProperty.call(f, h) && angular.lowercase(h) === angular.lowercase(a);if ("*" === h.slice(-1) && (i = h.slice(0, -1) === a.slice(0, h.length - 1)), (j || i) && (g = f[h], L(b, angular.lowercase(g)) > -1)) return g;
            }
          }
        }var k = a.split("_");return k.length > 1 && L(b, angular.lowercase(k[0])) > -1 ? k[0] : void 0;
      }
    },
        O = function O(a, b) {
      if (!a && !b) return u;if (a && !b) {
        if (angular.isString(a)) return u[a];
      } else angular.isObject(u[a]) || (u[a] = {}), angular.extend(u[a], P(b));return this;
    };this.translations = O, this.cloakClassName = function (a) {
      return a ? (y = a, this) : y;
    }, this.nestedObjectDelimeter = function (a) {
      return a ? (B = a, this) : B;
    };var P = function P(a, b, c, d) {
      var e, f, g, h;b || (b = []), c || (c = {});for (e in a) {
        Object.prototype.hasOwnProperty.call(a, e) && (h = a[e], angular.isObject(h) ? P(h, b.concat(e), c, e) : (f = b.length ? "" + b.join(B) + B + e : e, b.length && e === d && (g = "" + b.join(B), c[g] = "@:" + f), c[f] = h));
      }return c;
    };P.displayName = "flatObject", this.addInterpolation = function (a) {
      return x.push(a), this;
    }, this.useMessageFormatInterpolation = function () {
      return this.useInterpolation("$translateMessageFormatInterpolation");
    }, this.useInterpolation = function (a) {
      return n = a, this;
    }, this.useSanitizeValueStrategy = function (a) {
      return c.useStrategy(a), this;
    }, this.preferredLanguage = function (a) {
      return a ? (Q(a), this) : e;
    };var Q = function Q(a) {
      return a && (e = a), e;
    };this.translationNotFoundIndicator = function (a) {
      return this.translationNotFoundIndicatorLeft(a), this.translationNotFoundIndicatorRight(a), this;
    }, this.translationNotFoundIndicatorLeft = function (a) {
      return a ? (q = a, this) : q;
    }, this.translationNotFoundIndicatorRight = function (a) {
      return a ? (r = a, this) : r;
    }, this.fallbackLanguage = function (a) {
      return R(a), this;
    };var R = function R(a) {
      return a ? (angular.isString(a) ? (h = !0, g = [a]) : angular.isArray(a) && (h = !1, g = a), angular.isString(e) && L(g, e) < 0 && g.push(e), this) : h ? g[0] : g;
    };this.use = function (a) {
      if (a) {
        if (!u[a] && !o) throw new Error("$translateProvider couldn't find translationTable for langKey: '" + a + "'");return i = a, this;
      }return i;
    }, this.resolveClientLocale = function () {
      return K();
    };var S = function S(a) {
      return a ? (w = a, this) : l ? l + w : w;
    };this.storageKey = S, this.useUrlLoader = function (a, b) {
      return this.useLoader("$translateUrlLoader", angular.extend({ url: a }, b));
    }, this.useStaticFilesLoader = function (a) {
      return this.useLoader("$translateStaticFilesLoader", a);
    }, this.useLoader = function (a, b) {
      return o = a, p = b || {}, this;
    }, this.useLocalStorage = function () {
      return this.useStorage("$translateLocalStorage");
    }, this.useCookieStorage = function () {
      return this.useStorage("$translateCookieStorage");
    }, this.useStorage = function (a) {
      return k = a, this;
    }, this.storagePrefix = function (a) {
      return a ? (l = a, this) : a;
    }, this.useMissingTranslationHandlerLog = function () {
      return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog");
    }, this.useMissingTranslationHandler = function (a) {
      return m = a, this;
    }, this.usePostCompiling = function (a) {
      return z = !!a, this;
    }, this.forceAsyncReload = function (a) {
      return A = !!a, this;
    }, this.uniformLanguageTag = function (a) {
      return a ? angular.isString(a) && (a = { standard: a }) : a = {}, G = a.standard, this;
    }, this.determinePreferredLanguage = function (a) {
      var b = a && angular.isFunction(a) ? a() : K();return e = v.length ? N(b) || b : b, this;
    }, this.registerAvailableLanguageKeys = function (a, b) {
      return a ? (v = a, b && (f = b), this) : v;
    }, this.useLoaderCache = function (a) {
      return a === !1 ? s = void 0 : a === !0 ? s = !0 : "undefined" == typeof a ? s = "$translationCache" : a && (s = a), this;
    }, this.directivePriority = function (a) {
      return void 0 === a ? E : (E = a, this);
    }, this.statefulFilter = function (a) {
      return void 0 === a ? F : (F = a, this);
    }, this.postProcess = function (a) {
      return t = a ? a : void 0, this;
    }, this.keepContent = function (a) {
      return D = !!a, this;
    }, this.$get = ["$log", "$injector", "$rootScope", "$q", function (a, b, c, d) {
      var f,
          l,
          G,
          H = b.get(n || "$translateDefaultInterpolation"),
          J = !1,
          T = {},
          U = {},
          V = function V(a, b, c, h, j) {
        !i && e && (i = e);var m = j && j !== i ? N(j) || j : i;if (j && ka(j), angular.isArray(a)) {
          var n = function n(a) {
            for (var e = {}, f = [], g = function g(a) {
              var f = d.defer(),
                  g = function g(b) {
                e[a] = b, f.resolve([a, b]);
              };return V(a, b, c, h, j).then(g, g), f.promise;
            }, i = 0, k = a.length; i < k; i++) {
              f.push(g(a[i]));
            }return d.all(f).then(function () {
              return e;
            });
          };return n(a);
        }var o = d.defer();a && (a = M.apply(a));var p = function () {
          var a = e ? U[e] : U[m];if (l = 0, k && !a) {
            var b = f.get(w);if (a = U[b], g && g.length) {
              var c = L(g, b);l = 0 === c ? 1 : 0, L(g, e) < 0 && g.push(e);
            }
          }return a;
        }();if (p) {
          var q = function q() {
            j || (m = i), ga(a, b, c, h, m).then(o.resolve, o.reject);
          };q.displayName = "promiseResolved", p.finally(q).catch(angular.noop);
        } else ga(a, b, c, h, m).then(o.resolve, o.reject);return o.promise;
      },
          W = function W(a) {
        return q && (a = [q, a].join(" ")), r && (a = [a, r].join(" ")), a;
      },
          X = function X(a) {
        i = a, k && f.put(V.storageKey(), i), c.$emit("$translateChangeSuccess", { language: a }), H.setLocale(i);var b = function b(a, _b) {
          T[_b].setLocale(i);
        };b.displayName = "eachInterpolatorLocaleSetter", angular.forEach(T, b), c.$emit("$translateChangeEnd", { language: a });
      },
          Y = function Y(a) {
        if (!a) throw "No language key specified for loading.";var e = d.defer();c.$emit("$translateLoadingStart", { language: a }), J = !0;var f = s;"string" == typeof f && (f = b.get(f));var g = angular.extend({}, p, { key: a, $http: angular.extend({}, { cache: f }, p.$http) }),
            h = function h(b) {
          var d = {};c.$emit("$translateLoadingSuccess", { language: a }), angular.isArray(b) ? angular.forEach(b, function (a) {
            angular.extend(d, P(a));
          }) : angular.extend(d, P(b)), J = !1, e.resolve({ key: a, table: d }), c.$emit("$translateLoadingEnd", { language: a });
        };h.displayName = "onLoaderSuccess";var i = function i(a) {
          c.$emit("$translateLoadingError", { language: a }), e.reject(a), c.$emit("$translateLoadingEnd", { language: a });
        };return i.displayName = "onLoaderError", b.get(o)(g).then(h, i), e.promise;
      };if (k && (f = b.get(k), !f.get || !f.put)) throw new Error("Couldn't use storage '" + k + "', missing get() or put() method!");if (x.length) {
        var Z = function Z(a) {
          var c = b.get(a);c.setLocale(e || i), T[c.getInterpolationIdentifier()] = c;
        };Z.displayName = "interpolationFactoryAdder", angular.forEach(x, Z);
      }var $ = function $(a) {
        var b = d.defer();if (Object.prototype.hasOwnProperty.call(u, a)) b.resolve(u[a]);else if (U[a]) {
          var c = function c(a) {
            O(a.key, a.table), b.resolve(a.table);
          };c.displayName = "translationTableResolver", U[a].then(c, b.reject);
        } else b.reject();return b.promise;
      },
          _ = function _(a, b, c, e, f) {
        var g = d.defer(),
            h = function h(d) {
          if (Object.prototype.hasOwnProperty.call(d, b) && null !== d[b]) {
            e.setLocale(a);var h = d[b];if ("@:" === h.substr(0, 2)) _(a, h.substr(2), c, e, f).then(g.resolve, g.reject);else {
              var j = e.interpolate(d[b], c, "service", f, b);j = ja(b, d[b], j, c, a), g.resolve(j);
            }e.setLocale(i);
          } else g.reject();
        };return h.displayName = "fallbackTranslationResolver", $(a).then(h, g.reject), g.promise;
      },
          aa = function aa(a, b, c, d, e) {
        var f,
            g = u[a];if (g && Object.prototype.hasOwnProperty.call(g, b) && null !== g[b]) {
          if (d.setLocale(a), f = d.interpolate(g[b], c, "filter", e, b), f = ja(b, g[b], f, c, a, e), !angular.isString(f) && angular.isFunction(f.$$unwrapTrustedValue)) {
            var h = f.$$unwrapTrustedValue();if ("@:" === h.substr(0, 2)) return aa(a, h.substr(2), c, d, e);
          } else if ("@:" === f.substr(0, 2)) return aa(a, f.substr(2), c, d, e);d.setLocale(i);
        }return f;
      },
          ba = function ba(a, c, d, e) {
        return m ? b.get(m)(a, i, c, d, e) : a;
      },
          ca = function ca(a, b, c, e, f, h) {
        var i = d.defer();if (a < g.length) {
          var j = g[a];_(j, b, c, e, h).then(function (a) {
            i.resolve(a);
          }, function () {
            return ca(a + 1, b, c, e, f, h).then(i.resolve, i.reject);
          });
        } else if (f) i.resolve(f);else {
          var k = ba(b, c, f);m && k ? i.resolve(k) : i.reject(W(b));
        }return i.promise;
      },
          da = function da(a, b, c, d, e) {
        var f;if (a < g.length) {
          var h = g[a];f = aa(h, b, c, d, e), f || "" === f || (f = da(a + 1, b, c, d));
        }return f;
      },
          ea = function ea(a, b, c, d, e) {
        return ca(G > 0 ? G : l, a, b, c, d, e);
      },
          fa = function fa(a, b, c, d) {
        return da(G > 0 ? G : l, a, b, c, d);
      },
          ga = function ga(a, b, c, e, f, h) {
        var i = d.defer(),
            j = f ? u[f] : u,
            k = c ? T[c] : H;if (j && Object.prototype.hasOwnProperty.call(j, a) && null !== j[a]) {
          var l = j[a];if ("@:" === l.substr(0, 2)) V(l.substr(2), b, c, e, f).then(i.resolve, i.reject);else {
            var n = k.interpolate(l, b, "service", h, a);n = ja(a, l, n, b, f), i.resolve(n);
          }
        } else {
          var o;m && !J && (o = ba(a, b, e)), f && g && g.length ? ea(a, b, k, e, h).then(function (a) {
            i.resolve(a);
          }, function (a) {
            i.reject(W(a));
          }) : m && !J && o ? e ? i.resolve(e) : i.resolve(o) : e ? i.resolve(e) : i.reject(W(a));
        }return i.promise;
      },
          ha = function ha(a, b, c, d, e) {
        var f,
            h = d ? u[d] : u,
            i = H;if (T && Object.prototype.hasOwnProperty.call(T, c) && (i = T[c]), h && Object.prototype.hasOwnProperty.call(h, a) && null !== h[a]) {
          var j = h[a];"@:" === j.substr(0, 2) ? f = ha(j.substr(2), b, c, d, e) : (f = i.interpolate(j, b, "filter", e, a), f = ja(a, j, f, b, d, e));
        } else {
          var k;m && !J && (k = ba(a, b, e)), d && g && g.length ? (l = 0, f = fa(a, b, i, e)) : f = m && !J && k ? k : W(a);
        }return f;
      },
          ia = function ia(a) {
        j === a && (j = void 0), U[a] = void 0;
      },
          ja = function ja(a, c, d, e, f, g) {
        var h = t;return h && ("string" == typeof h && (h = b.get(h)), h) ? h(a, c, d, e, f, g) : d;
      },
          ka = function ka(a) {
        u[a] || !o || U[a] || (U[a] = Y(a).then(function (a) {
          return O(a.key, a.table), a;
        }));
      };V.preferredLanguage = function (a) {
        return a && Q(a), e;
      }, V.cloakClassName = function () {
        return y;
      }, V.nestedObjectDelimeter = function () {
        return B;
      }, V.fallbackLanguage = function (a) {
        if (void 0 !== a && null !== a) {
          if (R(a), o && g && g.length) for (var b = 0, c = g.length; b < c; b++) {
            U[g[b]] || (U[g[b]] = Y(g[b]));
          }V.use(V.use());
        }return h ? g[0] : g;
      }, V.useFallbackLanguage = function (a) {
        if (void 0 !== a && null !== a) if (a) {
          var b = L(g, a);b > -1 && (G = b);
        } else G = 0;
      }, V.proposedLanguage = function () {
        return j;
      }, V.storage = function () {
        return f;
      }, V.negotiateLocale = N, V.use = function (a) {
        if (!a) return i;var b = d.defer();b.promise.then(null, angular.noop), c.$emit("$translateChangeStart", { language: a });var e = N(a);return v.length > 0 && !e ? d.reject(a) : (e && (a = e), j = a, !A && u[a] || !o || U[a] ? U[a] ? U[a].then(function (a) {
          return j === a.key && X(a.key), b.resolve(a.key), a;
        }, function (a) {
          return !i && g && g.length > 0 && g[0] !== a ? V.use(g[0]).then(b.resolve, b.reject) : b.reject(a);
        }) : (b.resolve(a), X(a)) : (U[a] = Y(a).then(function (c) {
          return O(c.key, c.table), b.resolve(c.key), j === a && X(c.key), c;
        }, function (a) {
          return c.$emit("$translateChangeError", { language: a }), b.reject(a), c.$emit("$translateChangeEnd", { language: a }), d.reject(a);
        }), U[a].finally(function () {
          ia(a);
        }).catch(angular.noop)), b.promise);
      }, V.resolveClientLocale = function () {
        return K();
      }, V.storageKey = function () {
        return S();
      }, V.isPostCompilingEnabled = function () {
        return z;
      }, V.isForceAsyncReloadEnabled = function () {
        return A;
      }, V.isKeepContent = function () {
        return D;
      }, V.refresh = function (a) {
        function b(a) {
          var b = Y(a);return U[a] = b, b.then(function (b) {
            u[a] = {}, O(a, b.table), f[a] = !0;
          }, angular.noop), b;
        }if (!o) throw new Error("Couldn't refresh translation table, no loader registered!");c.$emit("$translateRefreshStart", { language: a });var e = d.defer(),
            f = {};if (e.promise.then(function () {
          for (var a in u) {
            u.hasOwnProperty(a) && (a in f || delete u[a]);
          }i && X(i);
        }, angular.noop).finally(function () {
          c.$emit("$translateRefreshEnd", { language: a });
        }), a) u[a] ? b(a).then(e.resolve, e.reject) : e.reject();else {
          var h = g && g.slice() || [];i && h.indexOf(i) === -1 && h.push(i), d.all(h.map(b)).then(e.resolve, e.reject);
        }return e.promise;
      }, V.instant = function (a, b, c, d, f) {
        var h = d && d !== i ? N(d) || d : i;if (null === a || angular.isUndefined(a)) return a;if (d && ka(d), angular.isArray(a)) {
          for (var j = {}, k = 0, l = a.length; k < l; k++) {
            j[a[k]] = V.instant(a[k], b, c, d, f);
          }return j;
        }if (angular.isString(a) && a.length < 1) return a;a && (a = M.apply(a));var n,
            o = [];e && o.push(e), h && o.push(h), g && g.length && (o = o.concat(g));for (var p = 0, s = o.length; p < s; p++) {
          var t = o[p];if (u[t] && "undefined" != typeof u[t][a] && (n = ha(a, b, c, h, f)), "undefined" != typeof n) break;
        }if (!n && "" !== n) if (q || r) n = W(a);else {
          n = H.interpolate(a, b, "filter", f);var v;m && !J && (v = ba(a, b, f)), m && !J && v && (n = v);
        }return n;
      }, V.versionInfo = function () {
        return I;
      }, V.loaderCache = function () {
        return s;
      }, V.directivePriority = function () {
        return E;
      }, V.statefulFilter = function () {
        return F;
      }, V.isReady = function () {
        return C;
      };var la = d.defer();la.promise.then(function () {
        C = !0;
      }), V.onReady = function (a) {
        var b = d.defer();return angular.isFunction(a) && b.promise.then(a), C ? b.resolve() : la.promise.then(b.resolve), b.promise;
      }, V.getAvailableLanguageKeys = function () {
        return v.length > 0 ? v : null;
      }, V.getTranslationTable = function (a) {
        return a = a || V.use(), a && u[a] ? angular.copy(u[a]) : null;
      };var ma = c.$on("$translateReady", function () {
        la.resolve(), ma(), ma = null;
      }),
          na = c.$on("$translateChangeEnd", function () {
        la.resolve(), na(), na = null;
      });if (o) {
        if (angular.equals(u, {}) && V.use() && V.use(V.use()), g && g.length) for (var oa = function oa(a) {
          return O(a.key, a.table), c.$emit("$translateChangeEnd", { language: a.key }), a;
        }, pa = 0, qa = g.length; pa < qa; pa++) {
          var ra = g[pa];!A && u[ra] || (U[ra] = Y(ra).then(oa));
        }
      } else c.$emit("$translateReady", { language: V.use() });return V;
    }];
  }function d(a, b) {
    "use strict";
    var c,
        d = {},
        e = "default";return d.setLocale = function (a) {
      c = a;
    }, d.getInterpolationIdentifier = function () {
      return e;
    }, d.useSanitizeValueStrategy = function (a) {
      return b.useStrategy(a), this;
    }, d.interpolate = function (c, d, e, f, g) {
      d = d || {}, d = b.sanitize(d, "params", f, e);var h;return angular.isNumber(c) ? h = "" + c : angular.isString(c) ? (h = a(c)(d), h = b.sanitize(h, "text", f, e)) : h = "", h;
    }, d;
  }function e(a, b, c, d, e) {
    "use strict";
    var g = function g() {
      return this.toString().replace(/^\s+|\s+$/g, "");
    };return { restrict: "AE", scope: !0, priority: a.directivePriority(), compile: function compile(h, i) {
        var j = i.translateValues ? i.translateValues : void 0,
            k = i.translateInterpolation ? i.translateInterpolation : void 0,
            l = h[0].outerHTML.match(/translate-value-+/i),
            m = "^(.*)(" + b.startSymbol() + ".*" + b.endSymbol() + ")(.*)",
            n = "^(.*)" + b.startSymbol() + "(.*)" + b.endSymbol() + "(.*)";return function (h, o, p) {
          h.interpolateParams = {}, h.preText = "", h.postText = "", h.translateNamespace = f(h);var q = {},
              r = function r(a, b, c) {
            if (b.translateValues && angular.extend(a, d(b.translateValues)(h.$parent)), l) for (var e in c) {
              if (Object.prototype.hasOwnProperty.call(b, e) && "translateValue" === e.substr(0, 14) && "translateValues" !== e) {
                var f = angular.lowercase(e.substr(14, 1)) + e.substr(15);a[f] = c[e];
              }
            }
          },
              s = function s(a) {
            if (angular.isFunction(s._unwatchOld) && (s._unwatchOld(), s._unwatchOld = void 0), angular.equals(a, "") || !angular.isDefined(a)) {
              var c = g.apply(o.text()),
                  d = c.match(m);if (angular.isArray(d)) {
                h.preText = d[1], h.postText = d[3], q.translate = b(d[2])(h.$parent);var e = c.match(n);angular.isArray(e) && e[2] && e[2].length && (s._unwatchOld = h.$watch(e[2], function (a) {
                  q.translate = a, y();
                }));
              } else q.translate = c ? c : void 0;
            } else q.translate = a;y();
          },
              t = function t(a) {
            p.$observe(a, function (b) {
              q[a] = b, y();
            });
          };r(h.interpolateParams, p, i);var u = !0;p.$observe("translate", function (a) {
            "undefined" == typeof a ? s("") : "" === a && u || (q.translate = a, y()), u = !1;
          });for (var v in p) {
            p.hasOwnProperty(v) && "translateAttr" === v.substr(0, 13) && v.length > 13 && t(v);
          }if (p.$observe("translateDefault", function (a) {
            h.defaultText = a, y();
          }), j && p.$observe("translateValues", function (a) {
            a && h.$parent.$watch(function () {
              angular.extend(h.interpolateParams, d(a)(h.$parent));
            });
          }), l) {
            var w = function w(a) {
              p.$observe(a, function (b) {
                var c = angular.lowercase(a.substr(14, 1)) + a.substr(15);h.interpolateParams[c] = b;
              });
            };for (var x in p) {
              Object.prototype.hasOwnProperty.call(p, x) && "translateValue" === x.substr(0, 14) && "translateValues" !== x && w(x);
            }
          }var y = function y() {
            for (var a in q) {
              q.hasOwnProperty(a) && void 0 !== q[a] && z(a, q[a], h, h.interpolateParams, h.defaultText, h.translateNamespace);
            }
          },
              z = function z(b, c, d, e, f, g) {
            c ? (g && "." === c.charAt(0) && (c = g + c), a(c, e, k, f, d.translateLanguage).then(function (a) {
              A(a, d, !0, b);
            }, function (a) {
              A(a, d, !1, b);
            })) : A(c, d, !1, b);
          },
              A = function A(b, d, e, f) {
            if (e || "undefined" != typeof d.defaultText && (b = d.defaultText), "translate" === f) {
              (e || !e && !a.isKeepContent() && "undefined" == typeof p.translateKeepContent) && o.empty().append(d.preText + b + d.postText);var g = a.isPostCompilingEnabled(),
                  h = "undefined" != typeof i.translateCompile,
                  j = h && "false" !== i.translateCompile;(g && !h || j) && c(o.contents())(d);
            } else {
              var k = p.$attr[f];"data-" === k.substr(0, 5) && (k = k.substr(5)), k = k.substr(15), o.attr(k, b);
            }
          };(j || l || p.translateDefault) && h.$watch("interpolateParams", y, !0), h.$on("translateLanguageChanged", y);var B = e.$on("$translateChangeSuccess", y);o.text().length ? s(p.translate ? p.translate : "") : p.translate && s(p.translate), y(), h.$on("$destroy", B);
        };
      } };
  }function f(a) {
    "use strict";
    return a.translateNamespace ? a.translateNamespace : a.$parent ? f(a.$parent) : void 0;
  }function g(a, b) {
    "use strict";
    return { restrict: "A", priority: a.directivePriority(), link: function link(c, d, e) {
        var f,
            g,
            i = {},
            j = function j() {
          angular.forEach(f, function (b, f) {
            b && (i[f] = !0, c.translateNamespace && "." === b.charAt(0) && (b = c.translateNamespace + b), a(b, g, e.translateInterpolation, void 0, c.translateLanguage).then(function (a) {
              d.attr(f, a);
            }, function (a) {
              d.attr(f, a);
            }));
          }), angular.forEach(i, function (a, b) {
            f[b] || (d.removeAttr(b), delete i[b]);
          });
        };h(c, e.translateAttr, function (a) {
          f = a;
        }, j), h(c, e.translateValues, function (a) {
          g = a;
        }, j), e.translateValues && c.$watch(e.translateValues, j, !0), c.$on("translateLanguageChanged", j);var k = b.$on("$translateChangeSuccess", j);j(), c.$on("$destroy", k);
      } };
  }function h(a, b, c, d) {
    "use strict";
    b && ("::" === b.substr(0, 2) ? b = b.substr(2) : a.$watch(b, function (a) {
      c(a), d();
    }, !0), c(a.$eval(b)));
  }function i(a, b) {
    "use strict";
    return { compile: function compile(c) {
        var d = function d(b) {
          b.addClass(a.cloakClassName());
        },
            e = function e(b) {
          b.removeClass(a.cloakClassName());
        };return d(c), function (c, f, g) {
          var h = e.bind(this, f),
              i = d.bind(this, f);g.translateCloak && g.translateCloak.length ? (g.$observe("translateCloak", function (b) {
            a(b).then(h, i);
          }), b.$on("$translateChangeSuccess", function () {
            a(g.translateCloak).then(h, i);
          })) : a.onReady(h);
        };
      } };
  }function j() {
    "use strict";
    return { restrict: "A", scope: !0, compile: function compile() {
        return { pre: function pre(a, b, c) {
            a.translateNamespace = f(a), a.translateNamespace && "." === c.translateNamespace.charAt(0) ? a.translateNamespace += c.translateNamespace : a.translateNamespace = c.translateNamespace;
          } };
      } };
  }function f(a) {
    "use strict";
    return a.translateNamespace ? a.translateNamespace : a.$parent ? f(a.$parent) : void 0;
  }function k() {
    "use strict";
    return { restrict: "A", scope: !0, compile: function compile() {
        return function (a, b, c) {
          c.$observe("translateLanguage", function (b) {
            a.translateLanguage = b;
          }), a.$watch("translateLanguage", function () {
            a.$broadcast("translateLanguageChanged");
          });
        };
      } };
  }function l(a, b) {
    "use strict";
    var c = function c(_c, d, e, f) {
      if (!angular.isObject(d)) {
        var g = this || { __SCOPE_IS_NOT_AVAILABLE: "More info at https://github.com/angular/angular.js/commit/8863b9d04c722b278fa93c5d66ad1e578ad6eb1f" };d = a(d)(g);
      }return b.instant(_c, d, e, f);
    };return b.statefulFilter() && (c.$stateful = !0), c;
  }function m(a) {
    "use strict";
    return a("translations");
  }return a.$inject = ["$translate"], c.$inject = ["$STORAGE_KEY", "$windowProvider", "$translateSanitizationProvider", "pascalprechtTranslateOverrider"], d.$inject = ["$interpolate", "$translateSanitization"], e.$inject = ["$translate", "$interpolate", "$compile", "$parse", "$rootScope"], g.$inject = ["$translate", "$rootScope"], i.$inject = ["$translate", "$rootScope"], l.$inject = ["$parse", "$translate"], m.$inject = ["$cacheFactory"], angular.module("pascalprecht.translate", ["ng"]).run(a), a.displayName = "runTranslate", angular.module("pascalprecht.translate").provider("$translateSanitization", b), angular.module("pascalprecht.translate").constant("pascalprechtTranslateOverrider", {}).provider("$translate", c), c.displayName = "displayName", angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation", d), d.displayName = "$translateDefaultInterpolation", angular.module("pascalprecht.translate").constant("$STORAGE_KEY", "NG_TRANSLATE_LANG_KEY"), angular.module("pascalprecht.translate").directive("translate", e), e.displayName = "translateDirective", angular.module("pascalprecht.translate").directive("translateAttr", g), g.displayName = "translateAttrDirective", angular.module("pascalprecht.translate").directive("translateCloak", i), i.displayName = "translateCloakDirective", angular.module("pascalprecht.translate").directive("translateNamespace", j), j.displayName = "translateNamespaceDirective", angular.module("pascalprecht.translate").directive("translateLanguage", k), k.displayName = "translateLanguageDirective", angular.module("pascalprecht.translate").filter("translate", l), l.displayName = "translateFilterFactory", angular.module("pascalprecht.translate").factory("$translationCache", m), m.displayName = "$translationCache", "pascalprecht.translate";
});
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 AngularJS v1.6.2
 (c) 2010-2017 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (z) {
  'use strict';
  function M(a, b) {
    b = b || Error;return function () {
      var d = arguments[0],
          c;c = "[" + (a ? a + ":" : "") + d + "] http://errors.angularjs.org/1.6.2/" + (a ? a + "/" : "") + d;for (d = 1; d < arguments.length; d++) {
        c = c + (1 == d ? "?" : "&") + "p" + (d - 1) + "=";var f = encodeURIComponent,
            e;e = arguments[d];e = "function" == typeof e ? e.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof e ? "undefined" : "string" != typeof e ? JSON.stringify(e) : e;c += f(e);
      }return new b(c);
    };
  }function sa(a) {
    if (null == a || Va(a)) return !1;if (C(a) || E(a) || D && a instanceof D) return !0;var b = "length" in Object(a) && a.length;return Y(b) && (0 <= b && (b - 1 in a || a instanceof Array) || "function" === typeof a.item);
  }function q(a, b, d) {
    var c, f;if (a) if (y(a)) for (c in a) {
      "prototype" !== c && "length" !== c && "name" !== c && a.hasOwnProperty(c) && b.call(d, a[c], c, a);
    } else if (C(a) || sa(a)) {
      var e = "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a));c = 0;for (f = a.length; c < f; c++) {
        (e || c in a) && b.call(d, a[c], c, a);
      }
    } else if (a.forEach && a.forEach !== q) a.forEach(b, d, a);else if (Dc(a)) for (c in a) {
      b.call(d, a[c], c, a);
    } else if ("function" === typeof a.hasOwnProperty) for (c in a) {
      a.hasOwnProperty(c) && b.call(d, a[c], c, a);
    } else for (c in a) {
      ua.call(a, c) && b.call(d, a[c], c, a);
    }return a;
  }function Ec(a, b, d) {
    for (var c = Object.keys(a).sort(), f = 0; f < c.length; f++) {
      b.call(d, a[c[f]], c[f]);
    }return c;
  }function Fc(a) {
    return function (b, d) {
      a(d, b);
    };
  }function je() {
    return ++qb;
  }function Sb(a, b, d) {
    for (var c = a.$$hashKey, f = 0, e = b.length; f < e; ++f) {
      var g = b[f];if (F(g) || y(g)) for (var h = Object.keys(g), k = 0, l = h.length; k < l; k++) {
        var m = h[k],
            n = g[m];d && F(n) ? ga(n) ? a[m] = new Date(n.valueOf()) : Wa(n) ? a[m] = new RegExp(n) : n.nodeName ? a[m] = n.cloneNode(!0) : Tb(n) ? a[m] = n.clone() : (F(a[m]) || (a[m] = C(n) ? [] : {}), Sb(a[m], [n], !0)) : a[m] = n;
      }
    }c ? a.$$hashKey = c : delete a.$$hashKey;return a;
  }function R(a) {
    return Sb(a, va.call(arguments, 1), !1);
  }function ke(a) {
    return Sb(a, va.call(arguments, 1), !0);
  }function Z(a) {
    return parseInt(a, 10);
  }function Ub(a, b) {
    return R(Object.create(a), b);
  }function w() {}function Xa(a) {
    return a;
  }function ma(a) {
    return function () {
      return a;
    };
  }function Vb(a) {
    return y(a.toString) && a.toString !== na;
  }function x(a) {
    return "undefined" === typeof a;
  }function v(a) {
    return "undefined" !== typeof a;
  }function F(a) {
    return null !== a && "object" === (typeof a === "undefined" ? "undefined" : _typeof(a));
  }function Dc(a) {
    return null !== a && "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && !Gc(a);
  }function E(a) {
    return "string" === typeof a;
  }function Y(a) {
    return "number" === typeof a;
  }function ga(a) {
    return "[object Date]" === na.call(a);
  }function y(a) {
    return "function" === typeof a;
  }function Wa(a) {
    return "[object RegExp]" === na.call(a);
  }function Va(a) {
    return a && a.window === a;
  }function Ya(a) {
    return a && a.$evalAsync && a.$watch;
  }function Ia(a) {
    return "boolean" === typeof a;
  }function le(a) {
    return a && Y(a.length) && me.test(na.call(a));
  }function Tb(a) {
    return !(!a || !(a.nodeName || a.prop && a.attr && a.find));
  }function ne(a) {
    var b = {};a = a.split(",");var d;for (d = 0; d < a.length; d++) {
      b[a[d]] = !0;
    }return b;
  }function wa(a) {
    return P(a.nodeName || a[0] && a[0].nodeName);
  }function Za(a, b) {
    var d = a.indexOf(b);0 <= d && a.splice(d, 1);return d;
  }function xa(a, b) {
    function d(a, b) {
      var d = b.$$hashKey,
          e;if (C(a)) {
        e = 0;for (var f = a.length; e < f; e++) {
          b.push(c(a[e]));
        }
      } else if (Dc(a)) for (e in a) {
        b[e] = c(a[e]);
      } else if (a && "function" === typeof a.hasOwnProperty) for (e in a) {
        a.hasOwnProperty(e) && (b[e] = c(a[e]));
      } else for (e in a) {
        ua.call(a, e) && (b[e] = c(a[e]));
      }d ? b.$$hashKey = d : delete b.$$hashKey;return b;
    }function c(a) {
      if (!F(a)) return a;var b = e.indexOf(a);if (-1 !== b) return g[b];if (Va(a) || Ya(a)) throw Fa("cpws");var b = !1,
          c = f(a);void 0 === c && (c = C(a) ? [] : Object.create(Gc(a)), b = !0);e.push(a);g.push(c);return b ? d(a, c) : c;
    }function f(a) {
      switch (na.call(a)) {case "[object Int8Array]":case "[object Int16Array]":case "[object Int32Array]":case "[object Float32Array]":case "[object Float64Array]":case "[object Uint8Array]":case "[object Uint8ClampedArray]":case "[object Uint16Array]":case "[object Uint32Array]":
          return new a.constructor(c(a.buffer), a.byteOffset, a.length);case "[object ArrayBuffer]":
          if (!a.slice) {
            var b = new ArrayBuffer(a.byteLength);new Uint8Array(b).set(new Uint8Array(a));return b;
          }return a.slice(0);case "[object Boolean]":case "[object Number]":case "[object String]":case "[object Date]":
          return new a.constructor(a.valueOf());case "[object RegExp]":
          return b = new RegExp(a.source, a.toString().match(/[^/]*$/)[0]), b.lastIndex = a.lastIndex, b;case "[object Blob]":
          return new a.constructor([a], { type: a.type });}if (y(a.cloneNode)) return a.cloneNode(!0);
    }
    var e = [],
        g = [];if (b) {
      if (le(b) || "[object ArrayBuffer]" === na.call(b)) throw Fa("cpta");if (a === b) throw Fa("cpi");C(b) ? b.length = 0 : q(b, function (a, d) {
        "$$hashKey" !== d && delete b[d];
      });e.push(a);g.push(b);return d(a, b);
    }return c(a);
  }function qa(a, b) {
    if (a === b) return !0;if (null === a || null === b) return !1;if (a !== a && b !== b) return !0;var d = typeof a === "undefined" ? "undefined" : _typeof(a),
        c;if (d === (typeof b === "undefined" ? "undefined" : _typeof(b)) && "object" === d) if (C(a)) {
      if (!C(b)) return !1;if ((d = a.length) === b.length) {
        for (c = 0; c < d; c++) {
          if (!qa(a[c], b[c])) return !1;
        }return !0;
      }
    } else {
      if (ga(a)) return ga(b) ? qa(a.getTime(), b.getTime()) : !1;if (Wa(a)) return Wa(b) ? a.toString() === b.toString() : !1;if (Ya(a) || Ya(b) || Va(a) || Va(b) || C(b) || ga(b) || Wa(b)) return !1;d = W();for (c in a) {
        if ("$" !== c.charAt(0) && !y(a[c])) {
          if (!qa(a[c], b[c])) return !1;d[c] = !0;
        }
      }for (c in b) {
        if (!(c in d) && "$" !== c.charAt(0) && v(b[c]) && !y(b[c])) return !1;
      }return !0;
    }return !1;
  }function $a(a, b, d) {
    return a.concat(va.call(b, d));
  }function ab(a, b) {
    var d = 2 < arguments.length ? va.call(arguments, 2) : [];return !y(b) || b instanceof RegExp ? b : d.length ? function () {
      return arguments.length ? b.apply(a, $a(d, arguments, 0)) : b.apply(a, d);
    } : function () {
      return arguments.length ? b.apply(a, arguments) : b.call(a);
    };
  }function Hc(a, b) {
    var d = b;"string" === typeof a && "$" === a.charAt(0) && "$" === a.charAt(1) ? d = void 0 : Va(b) ? d = "$WINDOW" : b && z.document === b ? d = "$DOCUMENT" : Ya(b) && (d = "$SCOPE");return d;
  }function bb(a, b) {
    if (!x(a)) return Y(b) || (b = b ? 2 : null), JSON.stringify(a, Hc, b);
  }function Ic(a) {
    return E(a) ? JSON.parse(a) : a;
  }function Jc(a, b) {
    a = a.replace(oe, "");var d = Date.parse("Jan 01, 1970 00:00:00 " + a) / 6E4;return da(d) ? b : d;
  }function Wb(a, b, d) {
    d = d ? -1 : 1;var c = a.getTimezoneOffset();b = Jc(b, c);d *= b - c;a = new Date(a.getTime());a.setMinutes(a.getMinutes() + d);return a;
  }function ya(a) {
    a = D(a).clone();try {
      a.empty();
    } catch (b) {}var d = D("<div>").append(a).html();try {
      return a[0].nodeType === Ja ? P(d) : d.match(/^(<[^>]+>)/)[1].replace(/^<([\w-]+)/, function (a, b) {
        return "<" + P(b);
      });
    } catch (c) {
      return P(d);
    }
  }function Kc(a) {
    try {
      return decodeURIComponent(a);
    } catch (b) {}
  }function Lc(a) {
    var b = {};q((a || "").split("&"), function (a) {
      var c, f, e;a && (f = a = a.replace(/\+/g, "%20"), c = a.indexOf("="), -1 !== c && (f = a.substring(0, c), e = a.substring(c + 1)), f = Kc(f), v(f) && (e = v(e) ? Kc(e) : !0, ua.call(b, f) ? C(b[f]) ? b[f].push(e) : b[f] = [b[f], e] : b[f] = e));
    });return b;
  }function Xb(a) {
    var b = [];q(a, function (a, c) {
      C(a) ? q(a, function (a) {
        b.push(ka(c, !0) + (!0 === a ? "" : "=" + ka(a, !0)));
      }) : b.push(ka(c, !0) + (!0 === a ? "" : "=" + ka(a, !0)));
    });return b.length ? b.join("&") : "";
  }function cb(a) {
    return ka(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
  }function ka(a, b) {
    return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, b ? "%20" : "+");
  }function pe(a, b) {
    var d,
        c,
        f = Ka.length;for (c = 0; c < f; ++c) {
      if (d = Ka[c] + b, E(d = a.getAttribute(d))) return d;
    }return null;
  }function qe(a, b) {
    var d,
        c,
        f = {};q(Ka, function (b) {
      b += "app";!d && a.hasAttribute && a.hasAttribute(b) && (d = a, c = a.getAttribute(b));
    });q(Ka, function (b) {
      b += "app";var f;!d && (f = a.querySelector("[" + b.replace(":", "\\:") + "]")) && (d = f, c = f.getAttribute(b));
    });d && (re ? (f.strictDi = null !== pe(d, "strict-di"), b(d, c ? [c] : [], f)) : z.console.error("Angular: disabling automatic bootstrap. <script> protocol indicates an extension, document.location.href does not match."));
  }function Mc(a, b, d) {
    F(d) || (d = {});d = R({ strictDi: !1 }, d);var c = function c() {
      a = D(a);if (a.injector()) {
        var c = a[0] === z.document ? "document" : ya(a);throw Fa("btstrpd", c.replace(/</, "&lt;").replace(/>/, "&gt;"));
      }b = b || [];b.unshift(["$provide", function (b) {
        b.value("$rootElement", a);
      }]);d.debugInfoEnabled && b.push(["$compileProvider", function (a) {
        a.debugInfoEnabled(!0);
      }]);
      b.unshift("ng");c = db(b, d.strictDi);c.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function (a, b, c, d) {
        a.$apply(function () {
          b.data("$injector", d);c(b)(a);
        });
      }]);return c;
    },
        f = /^NG_ENABLE_DEBUG_INFO!/,
        e = /^NG_DEFER_BOOTSTRAP!/;z && f.test(z.name) && (d.debugInfoEnabled = !0, z.name = z.name.replace(f, ""));if (z && !e.test(z.name)) return c();z.name = z.name.replace(e, "");$.resumeBootstrap = function (a) {
      q(a, function (a) {
        b.push(a);
      });return c();
    };y($.resumeDeferredBootstrap) && $.resumeDeferredBootstrap();
  }function se() {
    z.name = "NG_ENABLE_DEBUG_INFO!" + z.name;z.location.reload();
  }function te(a) {
    a = $.element(a).injector();if (!a) throw Fa("test");return a.get("$$testability");
  }function Nc(a, b) {
    b = b || "_";return a.replace(ue, function (a, c) {
      return (c ? b : "") + a.toLowerCase();
    });
  }function ve() {
    var a;if (!Oc) {
      var b = rb();(ta = x(b) ? z.jQuery : b ? z[b] : void 0) && ta.fn.on ? (D = ta, R(ta.fn, { scope: Oa.scope, isolateScope: Oa.isolateScope, controller: Oa.controller, injector: Oa.injector, inheritedData: Oa.inheritedData }), a = ta.cleanData, ta.cleanData = function (b) {
        for (var c, f = 0, e; null != (e = b[f]); f++) {
          (c = ta._data(e, "events")) && c.$destroy && ta(e).triggerHandler("$destroy");
        }a(b);
      }) : D = X;$.element = D;Oc = !0;
    }
  }function eb(a, b, d) {
    if (!a) throw Fa("areq", b || "?", d || "required");return a;
  }function sb(a, b, d) {
    d && C(a) && (a = a[a.length - 1]);eb(y(a), b, "not a function, got " + (a && "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) ? a.constructor.name || "Object" : typeof a === "undefined" ? "undefined" : _typeof(a)));return a;
  }function La(a, b) {
    if ("hasOwnProperty" === a) throw Fa("badname", b);
  }function Pc(a, b, d) {
    if (!b) return a;b = b.split(".");for (var c, f = a, e = b.length, g = 0; g < e; g++) {
      c = b[g], a && (a = (f = a)[c]);
    }return !d && y(a) ? ab(f, a) : a;
  }function tb(a) {
    for (var b = a[0], d = a[a.length - 1], c, f = 1; b !== d && (b = b.nextSibling); f++) {
      if (c || a[f] !== b) c || (c = D(va.call(a, 0, f))), c.push(b);
    }return c || a;
  }function W() {
    return Object.create(null);
  }function Yb(a) {
    if (null == a) return "";switch (typeof a === "undefined" ? "undefined" : _typeof(a)) {case "string":
        break;case "number":
        a = "" + a;break;default:
        a = !Vb(a) || C(a) || ga(a) ? bb(a) : a.toString();}return a;
  }function we(a) {
    function b(a, b, c) {
      return a[b] || (a[b] = c());
    }var d = M("$injector"),
        c = M("ng");a = b(a, "angular", Object);a.$$minErr = a.$$minErr || M;return b(a, "module", function () {
      var a = {};return function (e, g, h) {
        if ("hasOwnProperty" === e) throw c("badname", "module");g && a.hasOwnProperty(e) && (a[e] = null);return b(a, e, function () {
          function a(b, d, e, f) {
            f || (f = c);return function () {
              f[e || "push"]([b, d, arguments]);return J;
            };
          }function b(a, d, f) {
            f || (f = c);return function (b, c) {
              c && y(c) && (c.$$moduleName = e);f.push([a, d, arguments]);return J;
            };
          }if (!g) throw d("nomod", e);var c = [],
              f = [],
              p = [],
              r = a("$injector", "invoke", "push", f),
              J = { _invokeQueue: c, _configBlocks: f, _runBlocks: p,
            requires: g, name: e, provider: b("$provide", "provider"), factory: b("$provide", "factory"), service: b("$provide", "service"), value: a("$provide", "value"), constant: a("$provide", "constant", "unshift"), decorator: b("$provide", "decorator", f), animation: b("$animateProvider", "register"), filter: b("$filterProvider", "register"), controller: b("$controllerProvider", "register"), directive: b("$compileProvider", "directive"), component: b("$compileProvider", "component"), config: r, run: function run(a) {
              p.push(a);return this;
            } };h && r(h);return J;
        });
      };
    });
  }
  function ra(a, b) {
    if (C(a)) {
      b = b || [];for (var d = 0, c = a.length; d < c; d++) {
        b[d] = a[d];
      }
    } else if (F(a)) for (d in b = b || {}, a) {
      if ("$" !== d.charAt(0) || "$" !== d.charAt(1)) b[d] = a[d];
    }return b || a;
  }function xe(a) {
    var b = [];return JSON.stringify(a, function (a, c) {
      c = Hc(a, c);if (F(c)) {
        if (0 <= b.indexOf(c)) return "...";b.push(c);
      }return c;
    });
  }function ye(a) {
    R(a, { bootstrap: Mc, copy: xa, extend: R, merge: ke, equals: qa, element: D, forEach: q, injector: db, noop: w, bind: ab, toJson: bb, fromJson: Ic, identity: Xa, isUndefined: x, isDefined: v, isString: E, isFunction: y,
      isObject: F, isNumber: Y, isElement: Tb, isArray: C, version: ze, isDate: ga, lowercase: P, uppercase: ub, callbacks: { $$counter: 0 }, getTestability: te, reloadWithDebugInfo: se, $$minErr: M, $$csp: Ga, $$encodeUriSegment: cb, $$encodeUriQuery: ka, $$stringify: Yb });Zb = we(z);Zb("ng", ["ngLocale"], ["$provide", function (a) {
      a.provider({ $$sanitizeUri: Ae });a.provider("$compile", Qc).directive({ a: Be, input: Rc, textarea: Rc, form: Ce, script: De, select: Ee, option: Fe, ngBind: Ge, ngBindHtml: He, ngBindTemplate: Ie, ngClass: Je, ngClassEven: Ke, ngClassOdd: Le,
        ngCloak: Me, ngController: Ne, ngForm: Oe, ngHide: Pe, ngIf: Qe, ngInclude: Re, ngInit: Se, ngNonBindable: Te, ngPluralize: Ue, ngRepeat: Ve, ngShow: We, ngStyle: Xe, ngSwitch: Ye, ngSwitchWhen: Ze, ngSwitchDefault: $e, ngOptions: af, ngTransclude: bf, ngModel: cf, ngList: df, ngChange: ef, pattern: Sc, ngPattern: Sc, required: Tc, ngRequired: Tc, minlength: Uc, ngMinlength: Uc, maxlength: Vc, ngMaxlength: Vc, ngValue: ff, ngModelOptions: gf }).directive({ ngInclude: hf }).directive(vb).directive(Wc);a.provider({ $anchorScroll: jf, $animate: kf, $animateCss: lf, $$animateJs: mf,
        $$animateQueue: nf, $$AnimateRunner: of, $$animateAsyncRun: pf, $browser: qf, $cacheFactory: rf, $controller: sf, $document: tf, $$isDocumentHidden: uf, $exceptionHandler: vf, $filter: Xc, $$forceReflow: wf, $interpolate: xf, $interval: yf, $http: zf, $httpParamSerializer: Af, $httpParamSerializerJQLike: Bf, $httpBackend: Cf, $xhrFactory: Df, $jsonpCallbacks: Ef, $location: Ff, $log: Gf, $parse: Hf, $rootScope: If, $q: Jf, $$q: Kf, $sce: Lf, $sceDelegate: Mf, $sniffer: Nf, $templateCache: Of, $templateRequest: Pf, $$testability: Qf, $timeout: Rf, $window: Sf, $$rAF: Tf,
        $$jqLite: Uf, $$Map: Vf, $$cookieReader: Wf });
    }]);
  }function fb(a, b) {
    return b.toUpperCase();
  }function wb(a) {
    return a.replace(Xf, fb);
  }function Yc(a) {
    a = a.nodeType;return 1 === a || !a || 9 === a;
  }function Zc(a, b) {
    var d,
        c,
        f = b.createDocumentFragment(),
        e = [];if ($b.test(a)) {
      d = f.appendChild(b.createElement("div"));c = (Yf.exec(a) || ["", ""])[1].toLowerCase();c = ha[c] || ha._default;d.innerHTML = c[1] + a.replace(Zf, "<$1></$2>") + c[2];for (c = c[0]; c--;) {
        d = d.lastChild;
      }e = $a(e, d.childNodes);d = f.firstChild;d.textContent = "";
    } else e.push(b.createTextNode(a));
    f.textContent = "";f.innerHTML = "";q(e, function (a) {
      f.appendChild(a);
    });return f;
  }function X(a) {
    if (a instanceof X) return a;var b;E(a) && (a = S(a), b = !0);if (!(this instanceof X)) {
      if (b && "<" !== a.charAt(0)) throw ac("nosel");return new X(a);
    }if (b) {
      b = z.document;var d;a = (d = $f.exec(a)) ? [b.createElement(d[1])] : (d = Zc(a, b)) ? d.childNodes : [];bc(this, a);
    } else y(a) ? $c(a) : bc(this, a);
  }function cc(a) {
    return a.cloneNode(!0);
  }function xb(a, b) {
    b || gb(a);if (a.querySelectorAll) for (var d = a.querySelectorAll("*"), c = 0, f = d.length; c < f; c++) {
      gb(d[c]);
    }
  }
  function ad(a, b, d, c) {
    if (v(c)) throw ac("offargs");var f = (c = yb(a)) && c.events,
        e = c && c.handle;if (e) if (b) {
      var g = function g(b) {
        var c = f[b];v(d) && Za(c || [], d);v(d) && c && 0 < c.length || (a.removeEventListener(b, e), delete f[b]);
      };q(b.split(" "), function (a) {
        g(a);zb[a] && g(zb[a]);
      });
    } else for (b in f) {
      "$destroy" !== b && a.removeEventListener(b, e), delete f[b];
    }
  }function gb(a, b) {
    var d = a.ng339,
        c = d && hb[d];c && (b ? delete c.data[b] : (c.handle && (c.events.$destroy && c.handle({}, "$destroy"), ad(a)), delete hb[d], a.ng339 = void 0));
  }function yb(a, b) {
    var d = a.ng339,
        d = d && hb[d];b && !d && (a.ng339 = d = ++ag, d = hb[d] = { events: {}, data: {}, handle: void 0 });return d;
  }function dc(a, b, d) {
    if (Yc(a)) {
      var c,
          f = v(d),
          e = !f && b && !F(b),
          g = !b;a = (a = yb(a, !e)) && a.data;if (f) a[wb(b)] = d;else {
        if (g) return a;if (e) return a && a[wb(b)];for (c in b) {
          a[wb(c)] = b[c];
        }
      }
    }
  }function Ab(a, b) {
    return a.getAttribute ? -1 < (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") : !1;
  }function Bb(a, b) {
    b && a.setAttribute && q(b.split(" "), function (b) {
      a.setAttribute("class", S((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + S(b) + " ", " ")));
    });
  }function Cb(a, b) {
    if (b && a.setAttribute) {
      var d = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");q(b.split(" "), function (a) {
        a = S(a);-1 === d.indexOf(" " + a + " ") && (d += a + " ");
      });a.setAttribute("class", S(d));
    }
  }function bc(a, b) {
    if (b) if (b.nodeType) a[a.length++] = b;else {
      var d = b.length;if ("number" === typeof d && b.window !== b) {
        if (d) for (var c = 0; c < d; c++) {
          a[a.length++] = b[c];
        }
      } else a[a.length++] = b;
    }
  }function bd(a, b) {
    return Db(a, "$" + (b || "ngController") + "Controller");
  }function Db(a, b, d) {
    9 === a.nodeType && (a = a.documentElement);for (b = C(b) ? b : [b]; a;) {
      for (var c = 0, f = b.length; c < f; c++) {
        if (v(d = D.data(a, b[c]))) return d;
      }a = a.parentNode || 11 === a.nodeType && a.host;
    }
  }function cd(a) {
    for (xb(a, !0); a.firstChild;) {
      a.removeChild(a.firstChild);
    }
  }function Eb(a, b) {
    b || xb(a);var d = a.parentNode;d && d.removeChild(a);
  }function bg(a, b) {
    b = b || z;if ("complete" === b.document.readyState) b.setTimeout(a);else D(b).on("load", a);
  }function $c(a) {
    function b() {
      z.document.removeEventListener("DOMContentLoaded", b);z.removeEventListener("load", b);a();
    }"complete" === z.document.readyState ? z.setTimeout(a) : (z.document.addEventListener("DOMContentLoaded", b), z.addEventListener("load", b));
  }function dd(a, b) {
    var d = Fb[b.toLowerCase()];return d && ed[wa(a)] && d;
  }function cg(a, b) {
    var d = function d(c, _d) {
      c.isDefaultPrevented = function () {
        return c.defaultPrevented;
      };var e = b[_d || c.type],
          g = e ? e.length : 0;if (g) {
        if (x(c.immediatePropagationStopped)) {
          var h = c.stopImmediatePropagation;c.stopImmediatePropagation = function () {
            c.immediatePropagationStopped = !0;c.stopPropagation && c.stopPropagation();h && h.call(c);
          };
        }c.isImmediatePropagationStopped = function () {
          return !0 === c.immediatePropagationStopped;
        };var k = e.specialHandlerWrapper || dg;1 < g && (e = ra(e));for (var l = 0; l < g; l++) {
          c.isImmediatePropagationStopped() || k(a, c, e[l]);
        }
      }
    };d.elem = a;return d;
  }function dg(a, b, d) {
    d.call(a, b);
  }function eg(a, b, d) {
    var c = b.relatedTarget;c && (c === a || fg.call(a, c)) || d.call(a, b);
  }function Uf() {
    this.$get = function () {
      return R(X, { hasClass: function hasClass(a, b) {
          a.attr && (a = a[0]);return Ab(a, b);
        }, addClass: function addClass(a, b) {
          a.attr && (a = a[0]);return Cb(a, b);
        }, removeClass: function removeClass(a, b) {
          a.attr && (a = a[0]);return Bb(a, b);
        } });
    };
  }function Pa(a, b) {
    var d = a && a.$$hashKey;if (d) return "function" === typeof d && (d = a.$$hashKey()), d;d = typeof a === "undefined" ? "undefined" : _typeof(a);return d = "function" === d || "object" === d && null !== a ? a.$$hashKey = d + ":" + (b || je)() : d + ":" + a;
  }function fd() {
    this._keys = [];this._values = [];this._lastKey = NaN;this._lastIndex = -1;
  }function gd(a) {
    a = Function.prototype.toString.call(a).replace(gg, "");return a.match(hg) || a.match(ig);
  }function jg(a) {
    return (a = gd(a)) ? "function(" + (a[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn";
  }function db(a, b) {
    function d(a) {
      return function (b, c) {
        if (F(b)) q(b, Fc(a));else return a(b, c);
      };
    }function c(a, b) {
      La(a, "service");if (y(b) || C(b)) b = p.instantiate(b);if (!b.$get) throw za("pget", a);return n[a + "Provider"] = b;
    }function f(a, b) {
      return function () {
        var c = O.invoke(b, this);if (x(c)) throw za("undef", a);return c;
      };
    }function e(a, b, d) {
      return c(a, { $get: !1 !== d ? f(a, b) : b });
    }function g(a) {
      eb(x(a) || C(a), "modulesToLoad", "not an array");var b = [],
          c;q(a, function (a) {
        function d(a) {
          var b, c;b = 0;for (c = a.length; b < c; b++) {
            var e = a[b],
                f = p.get(e[0]);f[e[1]].apply(f, e[2]);
          }
        }if (!m.get(a)) {
          m.set(a, !0);try {
            E(a) ? (c = Zb(a), b = b.concat(g(c.requires)).concat(c._runBlocks), d(c._invokeQueue), d(c._configBlocks)) : y(a) ? b.push(p.invoke(a)) : C(a) ? b.push(p.invoke(a)) : sb(a, "module");
          } catch (e) {
            throw C(a) && (a = a[a.length - 1]), e.message && e.stack && -1 === e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), za("modulerr", a, e.stack || e.message || e);
          }
        }
      });return b;
    }function h(a, c) {
      function d(b, e) {
        if (a.hasOwnProperty(b)) {
          if (a[b] === k) throw za("cdep", b + " <- " + l.join(" <- "));return a[b];
        }try {
          return l.unshift(b), a[b] = k, a[b] = c(b, e), a[b];
        } catch (f) {
          throw a[b] === k && delete a[b], f;
        } finally {
          l.shift();
        }
      }function e(a, c, f) {
        var g = [];a = db.$$annotate(a, b, f);for (var h = 0, k = a.length; h < k; h++) {
          var l = a[h];if ("string" !== typeof l) throw za("itkn", l);g.push(c && c.hasOwnProperty(l) ? c[l] : d(l, f));
        }return g;
      }return { invoke: function invoke(a, b, c, d) {
          "string" === typeof c && (d = c, c = null);c = e(a, c, d);C(a) && (a = a[a.length - 1]);d = a;if (Ha || "function" !== typeof d) d = !1;else {
            var f = d.$$ngIsClass;
            Ia(f) || (f = d.$$ngIsClass = /^(?:class\b|constructor\()/.test(Function.prototype.toString.call(d)));d = f;
          }return d ? (c.unshift(null), new (Function.prototype.bind.apply(a, c))()) : a.apply(b, c);
        }, instantiate: function instantiate(a, b, c) {
          var d = C(a) ? a[a.length - 1] : a;a = e(a, b, c);a.unshift(null);return new (Function.prototype.bind.apply(d, a))();
        }, get: d, annotate: db.$$annotate, has: function has(b) {
          return n.hasOwnProperty(b + "Provider") || a.hasOwnProperty(b);
        } };
    }b = !0 === b;var k = {},
        l = [],
        m = new Gb(),
        n = { $provide: { provider: d(c), factory: d(e), service: d(function (a, b) {
          return e(a, ["$injector", function (a) {
            return a.instantiate(b);
          }]);
        }), value: d(function (a, b) {
          return e(a, ma(b), !1);
        }), constant: d(function (a, b) {
          La(a, "constant");n[a] = b;r[a] = b;
        }), decorator: function decorator(a, b) {
          var c = p.get(a + "Provider"),
              d = c.$get;c.$get = function () {
            var a = O.invoke(d, c);return O.invoke(b, null, { $delegate: a });
          };
        } } },
        p = n.$injector = h(n, function (a, b) {
      $.isString(b) && l.push(b);throw za("unpr", l.join(" <- "));
    }),
        r = {},
        J = h(r, function (a, b) {
      var c = p.get(a + "Provider", b);return O.invoke(c.$get, c, void 0, a);
    }),
        O = J;n.$injectorProvider = { $get: ma(J) };var u = g(a),
        O = J.get("$injector");O.strictDi = b;q(u, function (a) {
      a && O.invoke(a);
    });return O;
  }function jf() {
    var a = !0;this.disableAutoScrolling = function () {
      a = !1;
    };this.$get = ["$window", "$location", "$rootScope", function (b, d, c) {
      function f(a) {
        var b = null;Array.prototype.some.call(a, function (a) {
          if ("a" === wa(a)) return b = a, !0;
        });return b;
      }function e(a) {
        if (a) {
          a.scrollIntoView();var c;c = g.yOffset;y(c) ? c = c() : Tb(c) ? (c = c[0], c = "fixed" !== b.getComputedStyle(c).position ? 0 : c.getBoundingClientRect().bottom) : Y(c) || (c = 0);c && (a = a.getBoundingClientRect().top, b.scrollBy(0, a - c));
        } else b.scrollTo(0, 0);
      }function g(a) {
        a = E(a) ? a : Y(a) ? a.toString() : d.hash();var b;a ? (b = h.getElementById(a)) ? e(b) : (b = f(h.getElementsByName(a))) ? e(b) : "top" === a && e(null) : e(null);
      }var h = b.document;a && c.$watch(function () {
        return d.hash();
      }, function (a, b) {
        a === b && "" === a || bg(function () {
          c.$evalAsync(g);
        });
      });return g;
    }];
  }function ib(a, b) {
    if (!a && !b) return "";if (!a) return b;if (!b) return a;C(a) && (a = a.join(" "));C(b) && (b = b.join(" "));return a + " " + b;
  }function kg(a) {
    E(a) && (a = a.split(" "));var b = W();q(a, function (a) {
      a.length && (b[a] = !0);
    });return b;
  }function ea(a) {
    return F(a) ? a : {};
  }function lg(a, b, d, c) {
    function f(a) {
      try {
        a.apply(null, va.call(arguments, 1));
      } finally {
        if (J--, 0 === J) for (; O.length;) {
          try {
            O.pop()();
          } catch (b) {
            d.error(b);
          }
        }
      }
    }function e() {
      ia = null;h();
    }function g() {
      u = A();u = x(u) ? null : u;qa(u, B) && (u = B);H = B = u;
    }function h() {
      var a = H;g();if (V !== k.url() || a !== u) V = k.url(), H = u, q(K, function (a) {
        a(k.url(), u);
      });
    }var k = this,
        l = a.location,
        m = a.history,
        n = a.setTimeout,
        p = a.clearTimeout,
        r = {};k.isMock = !1;var J = 0,
        O = [];k.$$completeOutstandingRequest = f;k.$$incOutstandingRequestCount = function () {
      J++;
    };k.notifyWhenNoOutstandingRequests = function (a) {
      0 === J ? a() : O.push(a);
    };var u,
        H,
        V = l.href,
        t = b.find("base"),
        ia = null,
        A = c.history ? function () {
      try {
        return m.state;
      } catch (a) {}
    } : w;g();k.url = function (b, d, e) {
      x(e) && (e = null);l !== a.location && (l = a.location);m !== a.history && (m = a.history);if (b) {
        var f = H === e;if (V === b && (!c.history || f)) return k;var h = V && Aa(V) === Aa(b);V = b;H = e;!c.history || h && f ? (h || (ia = b), d ? l.replace(b) : h ? (d = l, e = b.indexOf("#"), e = -1 === e ? "" : b.substr(e), d.hash = e) : l.href = b, l.href !== b && (ia = b)) : (m[d ? "replaceState" : "pushState"](e, "", b), g());ia && (ia = b);return k;
      }return ia || l.href.replace(/%27/g, "'");
    };k.state = function () {
      return u;
    };var K = [],
        I = !1,
        B = null;k.onUrlChange = function (b) {
      if (!I) {
        if (c.history) D(a).on("popstate", e);D(a).on("hashchange", e);I = !0;
      }K.push(b);return b;
    };k.$$applicationDestroyed = function () {
      D(a).off("hashchange popstate", e);
    };k.$$checkUrlChange = h;k.baseHref = function () {
      var a = t.attr("href");return a ? a.replace(/^(https?:)?\/\/[^/]*/, "") : "";
    };k.defer = function (a, b) {
      var c;J++;c = n(function () {
        delete r[c];f(a);
      }, b || 0);r[c] = !0;return c;
    };k.defer.cancel = function (a) {
      return r[a] ? (delete r[a], p(a), f(w), !0) : !1;
    };
  }function qf() {
    this.$get = ["$window", "$log", "$sniffer", "$document", function (a, b, d, c) {
      return new lg(a, c, b, d);
    }];
  }function rf() {
    this.$get = function () {
      function a(a, c) {
        function f(a) {
          a !== n && (p ? p === a && (p = a.n) : p = a, e(a.n, a.p), e(a, n), n = a, n.n = null);
        }function e(a, b) {
          a !== b && (a && (a.p = b), b && (b.n = a));
        }if (a in b) throw M("$cacheFactory")("iid", a);var g = 0,
            h = R({}, c, { id: a }),
            k = W(),
            l = c && c.capacity || Number.MAX_VALUE,
            m = W(),
            n = null,
            p = null;return b[a] = { put: function put(a, b) {
            if (!x(b)) {
              if (l < Number.MAX_VALUE) {
                var c = m[a] || (m[a] = { key: a });f(c);
              }a in k || g++;k[a] = b;g > l && this.remove(p.key);return b;
            }
          }, get: function get(a) {
            if (l < Number.MAX_VALUE) {
              var b = m[a];if (!b) return;f(b);
            }return k[a];
          }, remove: function remove(a) {
            if (l < Number.MAX_VALUE) {
              var b = m[a];if (!b) return;b === n && (n = b.p);b === p && (p = b.n);e(b.n, b.p);delete m[a];
            }a in k && (delete k[a], g--);
          }, removeAll: function removeAll() {
            k = W();g = 0;m = W();n = p = null;
          }, destroy: function destroy() {
            m = h = k = null;delete b[a];
          }, info: function info() {
            return R({}, h, { size: g });
          } };
      }var b = {};a.info = function () {
        var a = {};q(b, function (b, f) {
          a[f] = b.info();
        });return a;
      };a.get = function (a) {
        return b[a];
      };return a;
    };
  }function Of() {
    this.$get = ["$cacheFactory", function (a) {
      return a("templates");
    }];
  }function Qc(a, b) {
    function d(a, b, c) {
      var d = /^\s*([@&<]|=(\*?))(\??)\s*([\w$]*)\s*$/,
          e = W();q(a, function (a, f) {
        if (a in n) e[f] = n[a];else {
          var g = a.match(d);if (!g) throw fa("iscp", b, f, a, c ? "controller bindings definition" : "isolate scope definition");
          e[f] = { mode: g[1][0], collection: "*" === g[2], optional: "?" === g[3], attrName: g[4] || f };g[4] && (n[a] = e[f]);
        }
      });return e;
    }function c(a) {
      var b = a.charAt(0);if (!b || b !== P(b)) throw fa("baddir", a);if (a !== a.trim()) throw fa("baddir", a);
    }function f(a) {
      var b = a.require || a.controller && a.name;!C(b) && F(b) && q(b, function (a, c) {
        var d = a.match(l);a.substring(d[0].length) || (b[c] = d[0] + c);
      });return b;
    }var e = {},
        g = /^\s*directive:\s*([\w-]+)\s+(.*)$/,
        h = /(([\w-]+)(?::([^;]+))?;?)/,
        k = ne("ngSrc,ngSrcset,src,srcset"),
        l = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
        m = /^(on[a-z]+|formaction)$/,
        n = W();this.directive = function V(b, d) {
      eb(b, "name");La(b, "directive");E(b) ? (c(b), eb(d, "directiveFactory"), e.hasOwnProperty(b) || (e[b] = [], a.factory(b + "Directive", ["$injector", "$exceptionHandler", function (a, c) {
        var d = [];q(e[b], function (e, g) {
          try {
            var h = a.invoke(e);y(h) ? h = { compile: ma(h) } : !h.compile && h.link && (h.compile = ma(h.link));h.priority = h.priority || 0;h.index = g;h.name = h.name || b;h.require = f(h);var k = h,
                l = h.restrict;if (l && (!E(l) || !/[EACM]/.test(l))) throw fa("badrestrict", l, b);k.restrict = l || "EA";h.$$moduleName = e.$$moduleName;d.push(h);
          } catch (m) {
            c(m);
          }
        });return d;
      }])), e[b].push(d)) : q(b, Fc(V));return this;
    };this.component = function (a, b) {
      function c(a) {
        function e(b) {
          return y(b) || C(b) ? function (c, d) {
            return a.invoke(b, this, { $element: c, $attrs: d });
          } : b;
        }var f = b.template || b.templateUrl ? b.template : "",
            g = { controller: d, controllerAs: mg(b.controller) || b.controllerAs || "$ctrl", template: e(f), templateUrl: e(b.templateUrl), transclude: b.transclude, scope: {}, bindToController: b.bindings || {}, restrict: "E", require: b.require };
        q(b, function (a, b) {
          "$" === b.charAt(0) && (g[b] = a);
        });return g;
      }var d = b.controller || function () {};q(b, function (a, b) {
        "$" === b.charAt(0) && (c[b] = a, y(d) && (d[b] = a));
      });c.$inject = ["$injector"];return this.directive(a, c);
    };this.aHrefSanitizationWhitelist = function (a) {
      return v(a) ? (b.aHrefSanitizationWhitelist(a), this) : b.aHrefSanitizationWhitelist();
    };this.imgSrcSanitizationWhitelist = function (a) {
      return v(a) ? (b.imgSrcSanitizationWhitelist(a), this) : b.imgSrcSanitizationWhitelist();
    };var p = !0;this.debugInfoEnabled = function (a) {
      return v(a) ? (p = a, this) : p;
    };var r = !1;this.preAssignBindingsEnabled = function (a) {
      return v(a) ? (r = a, this) : r;
    };var J = 10;this.onChangesTtl = function (a) {
      return arguments.length ? (J = a, this) : J;
    };var O = !0;this.commentDirectivesEnabled = function (a) {
      return arguments.length ? (O = a, this) : O;
    };var u = !0;this.cssClassDirectivesEnabled = function (a) {
      return arguments.length ? (u = a, this) : u;
    };this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function (a, b, c, f, n, I, B, L, N, G) {
      function T() {
        try {
          if (! --za) throw ea = void 0, fa("infchng", J);B.$apply(function () {
            for (var a = [], b = 0, c = ea.length; b < c; ++b) {
              try {
                ea[b]();
              } catch (d) {
                a.push(d);
              }
            }ea = void 0;if (a.length) throw a;
          });
        } finally {
          za++;
        }
      }function s(a, b) {
        if (b) {
          var c = Object.keys(b),
              d,
              e,
              f;d = 0;for (e = c.length; d < e; d++) {
            f = c[d], this[f] = b[f];
          }
        } else this.$attr = {};this.$$element = a;
      }function Q(a, b, c) {
        xa.innerHTML = "<span " + b + ">";b = xa.firstChild.attributes;var d = b[0];b.removeNamedItem(d.name);d.value = c;a.attributes.setNamedItem(d);
      }function Ma(a, b) {
        try {
          a.addClass(b);
        } catch (c) {}
      }function ba(a, b, c, d, e) {
        a instanceof D || (a = D(a));var f = Na(a, b, a, c, d, e);ba.$$addScopeClass(a);var g = null;return function (b, c, d) {
          if (!a) throw fa("multilink");eb(b, "scope");e && e.needsNewScope && (b = b.$parent.$new());d = d || {};var h = d.parentBoundTranscludeFn,
              k = d.transcludeControllers;d = d.futureParentElement;h && h.$$boundTransclude && (h = h.$$boundTransclude);g || (g = (d = d && d[0]) ? "foreignobject" !== wa(d) && na.call(d).match(/SVG/) ? "svg" : "html" : "html");d = "html" !== g ? D(ha(g, D("<div>").append(a).html())) : c ? Oa.clone.call(a) : a;if (k) for (var l in k) {
            d.data("$" + l + "Controller", k[l].instance);
          }ba.$$addScopeInfo(d, b);c && c(d, b);f && f(b, d, d, h);c || (a = f = null);return d;
        };
      }function Na(a, b, c, d, e, f) {
        function g(a, c, d, e) {
          var f, k, l, m, n, p, r;if (K) for (r = Array(c.length), m = 0; m < h.length; m += 3) {
            f = h[m], r[f] = c[f];
          } else r = c;m = 0;for (n = h.length; m < n;) {
            k = r[h[m++]], c = h[m++], f = h[m++], c ? (c.scope ? (l = a.$new(), ba.$$addScopeInfo(D(k), l)) : l = a, p = c.transcludeOnThisElement ? ja(a, c.transclude, e) : !c.templateOnThisElement && e ? e : !e && b ? ja(a, b) : null, c(f, l, k, d, p)) : f && f(a, k.childNodes, void 0, e);
          }
        }for (var h = [], k = C(a) || a instanceof D, l, m, n, p, K, r = 0; r < a.length; r++) {
          l = new s();11 === Ha && M(a, r, k);m = fc(a[r], [], l, 0 === r ? d : void 0, e);(f = m.length ? X(m, a[r], l, b, c, null, [], [], f) : null) && f.scope && ba.$$addScopeClass(l.$$element);l = f && f.terminal || !(n = a[r].childNodes) || !n.length ? null : Na(n, f ? (f.transcludeOnThisElement || !f.templateOnThisElement) && f.transclude : b);if (f || l) h.push(r, f, l), p = !0, K = K || f;f = null;
        }return p ? g : null;
      }function M(a, b, c) {
        var d = a[b],
            e = d.parentNode,
            f;if (d.nodeType === Ja) for (;;) {
          f = e ? d.nextSibling : a[b + 1];if (!f || f.nodeType !== Ja) break;d.nodeValue += f.nodeValue;f.parentNode && f.parentNode.removeChild(f);c && f === a[b + 1] && a.splice(b + 1, 1);
        }
      }function ja(a, b, c) {
        function d(e, f, g, h, k) {
          e || (e = a.$new(!1, k), e.$$transcluded = !0);return b(e, f, { parentBoundTranscludeFn: c, transcludeControllers: g, futureParentElement: h });
        }var e = d.$$slots = W(),
            f;for (f in b.$$slots) {
          e[f] = b.$$slots[f] ? ja(a, b.$$slots[f], c) : null;
        }return d;
      }function fc(a, b, c, d, e) {
        var f = c.$attr,
            g;switch (a.nodeType) {case 1:
            g = wa(a);Y(b, Ba(g), "E", d, e);for (var k, l, m, n, p = a.attributes, K = 0, r = p && p.length; K < r; K++) {
              var A = !1,
                  B = !1;k = p[K];l = k.name;m = k.value;k = Ba(l);(n = Ka.test(k)) && (l = l.replace(hd, "").substr(8).replace(/_(.)/g, function (a, b) {
                return b.toUpperCase();
              }));(k = k.match(La)) && Z(k[1]) && (A = l, B = l.substr(0, l.length - 5) + "end", l = l.substr(0, l.length - 6));k = Ba(l.toLowerCase());f[k] = l;if (n || !c.hasOwnProperty(k)) c[k] = m, dd(a, k) && (c[k] = !0);ra(a, b, m, k, n);Y(b, k, "A", d, e, A, B);
            }"input" === g && "hidden" === a.getAttribute("type") && a.setAttribute("autocomplete", "off");if (!Ga) break;f = a.className;F(f) && (f = f.animVal);if (E(f) && "" !== f) for (; a = h.exec(f);) {
              k = Ba(a[2]), Y(b, k, "C", d, e) && (c[k] = S(a[3])), f = f.substr(a.index + a[0].length);
            }break;case Ja:
            ma(b, a.nodeValue);break;case 8:
            if (!Fa) break;jb(a, b, c, d, e);}b.sort(ka);return b;
      }function jb(a, b, c, d, e) {
        try {
          var f = g.exec(a.nodeValue);if (f) {
            var h = Ba(f[1]);Y(b, h, "M", d, e) && (c[h] = S(f[2]));
          }
        } catch (k) {}
      }function id(a, b, c) {
        var d = [],
            e = 0;if (b && a.hasAttribute && a.hasAttribute(b)) {
          do {
            if (!a) throw fa("uterdir", b, c);1 === a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--);d.push(a);a = a.nextSibling;
          } while (0 < e);
        } else d.push(a);return D(d);
      }function jd(a, b, c) {
        return function (d, e, f, g, h) {
          e = id(e[0], b, c);return a(d, e, f, g, h);
        };
      }function gc(a, b, c, d, e, f) {
        var g;return a ? ba(b, c, d, e, f) : function () {
          g || (g = ba(b, c, d, e, f), b = c = f = null);return g.apply(this, arguments);
        };
      }function X(a, b, d, e, f, g, h, k, l) {
        function m(a, b, c, d) {
          if (a) {
            c && (a = jd(a, c, d));a.require = t.require;a.directiveName = L;if (B === t || t.$$isolateScope) a = sa(a, { isolateScope: !0 });h.push(a);
          }if (b) {
            c && (b = jd(b, c, d));b.require = t.require;b.directiveName = L;if (B === t || t.$$isolateScope) b = sa(b, { isolateScope: !0 });k.push(b);
          }
        }function n(a, e, f, g, l) {
          function m(a, b, c, d) {
            var e;Ya(a) || (d = c, c = b, b = a, a = void 0);V && (e = N);c || (c = V ? L.parent() : L);if (d) {
              var f = l.$$slots[d];if (f) return f(a, b, e, c, Q);if (x(f)) throw fa("noslot", d, ya(L));
            } else return l(a, b, e, c, Q);
          }var p, t, u, G, J, N, T, L;b === f ? (g = d, L = d.$$element) : (L = D(f), g = new s(L, d));J = e;B ? G = e.$new(!0) : K && (J = e.$parent);l && (T = m, T.$$boundTransclude = l, T.isSlotFilled = function (a) {
            return !!l.$$slots[a];
          });A && (N = ca(L, g, T, A, G, e, B));B && (ba.$$addScopeInfo(L, G, !0, !(I && (I === B || I === B.$$originalDirective))), ba.$$addScopeClass(L, !0), G.$$isolateBindings = B.$$isolateBindings, t = oa(e, g, G, G.$$isolateBindings, B), t.removeWatches && G.$on("$destroy", t.removeWatches));for (p in N) {
            t = A[p];u = N[p];var Hb = t.$$bindings.bindToController;if (r) {
              u.bindingInfo = Hb ? oa(J, g, u.instance, Hb, t) : {};var O = u();O !== u.instance && (u.instance = O, L.data("$" + t.name + "Controller", O), u.bindingInfo.removeWatches && u.bindingInfo.removeWatches(), u.bindingInfo = oa(J, g, u.instance, Hb, t));
            } else u.instance = u(), L.data("$" + t.name + "Controller", u.instance), u.bindingInfo = oa(J, g, u.instance, Hb, t);
          }q(A, function (a, b) {
            var c = a.require;a.bindToController && !C(c) && F(c) && R(N[b].instance, U(b, c, L, N));
          });q(N, function (a) {
            var b = a.instance;if (y(b.$onChanges)) try {
              b.$onChanges(a.bindingInfo.initialChanges);
            } catch (d) {
              c(d);
            }if (y(b.$onInit)) try {
              b.$onInit();
            } catch (e) {
              c(e);
            }y(b.$doCheck) && (J.$watch(function () {
              b.$doCheck();
            }), b.$doCheck());y(b.$onDestroy) && J.$on("$destroy", function () {
              b.$onDestroy();
            });
          });
          p = 0;for (t = h.length; p < t; p++) {
            u = h[p], ta(u, u.isolateScope ? G : e, L, g, u.require && U(u.directiveName, u.require, L, N), T);
          }var Q = e;B && (B.template || null === B.templateUrl) && (Q = G);a && a(Q, f.childNodes, void 0, l);for (p = k.length - 1; 0 <= p; p--) {
            u = k[p], ta(u, u.isolateScope ? G : e, L, g, u.require && U(u.directiveName, u.require, L, N), T);
          }q(N, function (a) {
            a = a.instance;y(a.$postLink) && a.$postLink();
          });
        }l = l || {};for (var p = -Number.MAX_VALUE, K = l.newScopeDirective, A = l.controllerDirectives, B = l.newIsolateScopeDirective, I = l.templateDirective, u = l.nonTlbTranscludeDirective, J = !1, N = !1, V = l.hasElementTranscludeDirective, G = d.$$element = D(b), t, L, T, O = e, Q, v = !1, Ma = !1, w, z = 0, E = a.length; z < E; z++) {
          t = a[z];var Na = t.$$start,
              M = t.$$end;Na && (G = id(b, Na, M));T = void 0;if (p > t.priority) break;if (w = t.scope) t.templateUrl || (F(w) ? ($("new/isolated scope", B || K, t, G), B = t) : $("new/isolated scope", B, t, G)), K = K || t;L = t.name;if (!v && (t.replace && (t.templateUrl || t.template) || t.transclude && !t.$$tlb)) {
            for (w = z + 1; v = a[w++];) {
              if (v.transclude && !v.$$tlb || v.replace && (v.templateUrl || v.template)) {
                Ma = !0;break;
              }
            }v = !0;
          }!t.templateUrl && t.controller && (A = A || W(), $("'" + L + "' controller", A[L], t, G), A[L] = t);if (w = t.transclude) if (J = !0, t.$$tlb || ($("transclusion", u, t, G), u = t), "element" === w) V = !0, p = t.priority, T = G, G = d.$$element = D(ba.$$createComment(L, d[L])), b = G[0], la(f, va.call(T, 0), b), T[0].$$parentNode = T[0].parentNode, O = gc(Ma, T, e, p, g && g.name, { nonTlbTranscludeDirective: u });else {
            var ja = W();if (F(w)) {
              T = [];var P = W(),
                  jb = W();q(w, function (a, b) {
                var c = "?" === a.charAt(0);a = c ? a.substring(1) : a;P[a] = b;ja[b] = null;jb[b] = c;
              });q(G.contents(), function (a) {
                var b = P[Ba(wa(a))];
                b ? (jb[b] = !0, ja[b] = ja[b] || [], ja[b].push(a)) : T.push(a);
              });q(jb, function (a, b) {
                if (!a) throw fa("reqslot", b);
              });for (var ec in ja) {
                ja[ec] && (ja[ec] = gc(Ma, ja[ec], e));
              }
            } else T = D(cc(b)).contents();G.empty();O = gc(Ma, T, e, void 0, void 0, { needsNewScope: t.$$isolateScope || t.$$newScope });O.$$slots = ja;
          }if (t.template) if (N = !0, $("template", I, t, G), I = t, w = y(t.template) ? t.template(G, d) : t.template, w = Ea(w), t.replace) {
            g = t;T = $b.test(w) ? kd(ha(t.templateNamespace, S(w))) : [];b = T[0];if (1 !== T.length || 1 !== b.nodeType) throw fa("tplrt", L, "");
            la(f, G, b);E = { $attr: {} };w = fc(b, [], E);var Y = a.splice(z + 1, a.length - (z + 1));(B || K) && aa(w, B, K);a = a.concat(w).concat(Y);da(d, E);E = a.length;
          } else G.html(w);if (t.templateUrl) N = !0, $("template", I, t, G), I = t, t.replace && (g = t), n = ga(a.splice(z, a.length - z), G, d, f, J && O, h, k, { controllerDirectives: A, newScopeDirective: K !== t && K, newIsolateScopeDirective: B, templateDirective: I, nonTlbTranscludeDirective: u }), E = a.length;else if (t.compile) try {
            Q = t.compile(G, d, O);var Z = t.$$originalDirective || t;y(Q) ? m(null, ab(Z, Q), Na, M) : Q && m(ab(Z, Q.pre), ab(Z, Q.post), Na, M);
          } catch (ea) {
            c(ea, ya(G));
          }t.terminal && (n.terminal = !0, p = Math.max(p, t.priority));
        }n.scope = K && !0 === K.scope;n.transcludeOnThisElement = J;n.templateOnThisElement = N;n.transclude = O;l.hasElementTranscludeDirective = V;return n;
      }function U(a, b, c, d) {
        var e;if (E(b)) {
          var f = b.match(l);b = b.substring(f[0].length);var g = f[1] || f[3],
              f = "?" === f[2];"^^" === g ? c = c.parent() : e = (e = d && d[b]) && e.instance;if (!e) {
            var h = "$" + b + "Controller";e = g ? c.inheritedData(h) : c.data(h);
          }if (!e && !f) throw fa("ctreq", b, a);
        } else if (C(b)) for (e = [], g = 0, f = b.length; g < f; g++) {
          e[g] = U(a, b[g], c, d);
        } else F(b) && (e = {}, q(b, function (b, f) {
          e[f] = U(a, b, c, d);
        }));return e || null;
      }function ca(a, b, c, d, e, f, g) {
        var h = W(),
            k;for (k in d) {
          var l = d[k],
              m = { $scope: l === g || l.$$isolateScope ? e : f, $element: a, $attrs: b, $transclude: c },
              n = l.controller;"@" === n && (n = b[l.name]);m = I(n, m, !0, l.controllerAs);h[l.name] = m;a.data("$" + l.name + "Controller", m.instance);
        }return h;
      }function aa(a, b, c) {
        for (var d = 0, e = a.length; d < e; d++) {
          a[d] = Ub(a[d], { $$isolateScope: b, $$newScope: c });
        }
      }function Y(b, c, f, g, h, k, l) {
        if (c === h) return null;var m = null;if (e.hasOwnProperty(c)) {
          h = a.get(c + "Directive");for (var n = 0, p = h.length; n < p; n++) {
            if (c = h[n], (x(g) || g > c.priority) && -1 !== c.restrict.indexOf(f)) {
              k && (c = Ub(c, { $$start: k, $$end: l }));if (!c.$$bindings) {
                var K = m = c,
                    r = c.name,
                    A = { isolateScope: null, bindToController: null };F(K.scope) && (!0 === K.bindToController ? (A.bindToController = d(K.scope, r, !0), A.isolateScope = {}) : A.isolateScope = d(K.scope, r, !1));F(K.bindToController) && (A.bindToController = d(K.bindToController, r, !0));if (A.bindToController && !K.controller) throw fa("noctrl", r);m = m.$$bindings = A;F(m.isolateScope) && (c.$$isolateBindings = m.isolateScope);
              }b.push(c);m = c;
            }
          }
        }return m;
      }function Z(b) {
        if (e.hasOwnProperty(b)) for (var c = a.get(b + "Directive"), d = 0, f = c.length; d < f; d++) {
          if (b = c[d], b.multiElement) return !0;
        }return !1;
      }function da(a, b) {
        var c = b.$attr,
            d = a.$attr;q(a, function (d, e) {
          "$" !== e.charAt(0) && (b[e] && b[e] !== d && (d = d.length ? d + (("style" === e ? ";" : " ") + b[e]) : b[e]), a.$set(e, d, !0, c[e]));
        });q(b, function (b, e) {
          a.hasOwnProperty(e) || "$" === e.charAt(0) || (a[e] = b, "class" !== e && "style" !== e && (d[e] = c[e]));
        });
      }
      function ga(a, b, d, e, g, h, k, l) {
        var m = [],
            n,
            p,
            K = b[0],
            r = a.shift(),
            u = Ub(r, { templateUrl: null, transclude: null, replace: null, $$originalDirective: r }),
            t = y(r.templateUrl) ? r.templateUrl(b, d) : r.templateUrl,
            B = r.templateNamespace;b.empty();f(t).then(function (c) {
          var f, A;c = Ea(c);if (r.replace) {
            c = $b.test(c) ? kd(ha(B, S(c))) : [];f = c[0];if (1 !== c.length || 1 !== f.nodeType) throw fa("tplrt", r.name, t);c = { $attr: {} };la(e, b, f);var I = fc(f, [], c);F(r.scope) && aa(I, !0);a = I.concat(a);da(d, c);
          } else f = K, b.html(c);a.unshift(u);n = X(a, f, d, g, b, r, h, k, l);q(e, function (a, c) {
            a === f && (e[c] = b[0]);
          });for (p = Na(b[0].childNodes, g); m.length;) {
            c = m.shift();A = m.shift();var G = m.shift(),
                J = m.shift(),
                I = b[0];if (!c.$$destroyed) {
              if (A !== K) {
                var N = A.className;l.hasElementTranscludeDirective && r.replace || (I = cc(f));la(G, D(A), I);Ma(D(I), N);
              }A = n.transcludeOnThisElement ? ja(c, n.transclude, J) : J;n(p, c, I, e, A);
            }
          }m = null;
        }).catch(function (a) {
          a instanceof Error && c(a);
        });return function (a, b, c, d, e) {
          a = e;b.$$destroyed || (m ? m.push(b, c, d, a) : (n.transcludeOnThisElement && (a = ja(b, n.transclude, e)), n(p, b, c, d, a)));
        };
      }function ka(a, b) {
        var c = b.priority - a.priority;return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index;
      }function $(a, b, c, d) {
        function e(a) {
          return a ? " (module: " + a + ")" : "";
        }if (b) throw fa("multidir", b.name, e(b.$$moduleName), c.name, e(c.$$moduleName), a, ya(d));
      }function ma(a, c) {
        var d = b(c, !0);d && a.push({ priority: 0, compile: function compile(a) {
            a = a.parent();var b = !!a.length;b && ba.$$addBindingClass(a);return function (a, c) {
              var e = c.parent();b || ba.$$addBindingClass(e);ba.$$addBindingInfo(e, d.expressions);
              a.$watch(d, function (a) {
                c[0].nodeValue = a;
              });
            };
          } });
      }function ha(a, b) {
        a = P(a || "html");switch (a) {case "svg":case "math":
            var c = z.document.createElement("div");c.innerHTML = "<" + a + ">" + b + "</" + a + ">";return c.childNodes[0].childNodes;default:
            return b;}
      }function pa(a, b) {
        if ("srcdoc" === b) return L.HTML;var c = wa(a);if ("src" === b || "ngSrc" === b) {
          if (-1 === ["img", "video", "audio", "source", "track"].indexOf(c)) return L.RESOURCE_URL;
        } else if ("xlinkHref" === b || "form" === c && "action" === b || "link" === c && "href" === b) return L.RESOURCE_URL;
      }function ra(a, c, d, e, f) {
        var g = pa(a, e),
            h = k[e] || f,
            l = b(d, !f, g, h);if (l) {
          if ("multiple" === e && "select" === wa(a)) throw fa("selmulti", ya(a));if (m.test(e)) throw fa("nodomevents");c.push({ priority: 100, compile: function compile() {
              return { pre: function pre(a, c, f) {
                  c = f.$$observers || (f.$$observers = W());var k = f[e];k !== d && (l = k && b(k, !0, g, h), d = k);l && (f[e] = l(a), (c[e] || (c[e] = [])).$$inter = !0, (f.$$observers && f.$$observers[e].$$scope || a).$watch(l, function (a, b) {
                    "class" === e && a !== b ? f.$updateClass(a, b) : f.$set(e, a);
                  }));
                } };
            } });
        }
      }function la(a, b, c) {
        var d = b[0],
            e = b.length,
            f = d.parentNode,
            g,
            h;if (a) for (g = 0, h = a.length; g < h; g++) {
          if (a[g] === d) {
            a[g++] = c;h = g + e - 1;for (var k = a.length; g < k; g++, h++) {
              h < k ? a[g] = a[h] : delete a[g];
            }a.length -= e - 1;a.context === d && (a.context = c);break;
          }
        }f && f.replaceChild(c, d);a = z.document.createDocumentFragment();for (g = 0; g < e; g++) {
          a.appendChild(b[g]);
        }D.hasData(d) && (D.data(c, D.data(d)), D(d).off("$destroy"));D.cleanData(a.querySelectorAll("*"));for (g = 1; g < e; g++) {
          delete b[g];
        }b[0] = c;b.length = 1;
      }function sa(a, b) {
        return R(function () {
          return a.apply(null, arguments);
        }, a, b);
      }function ta(a, b, d, e, f, g) {
        try {
          a(b, d, e, f, g);
        } catch (h) {
          c(h, ya(d));
        }
      }function oa(a, c, d, e, f) {
        function g(b, c, e) {
          !y(d.$onChanges) || c === e || c !== c && e !== e || (ea || (a.$$postDigest(T), ea = []), m || (m = {}, ea.push(h)), m[b] && (e = m[b].previousValue), m[b] = new Ib(e, c));
        }function h() {
          d.$onChanges(m);m = void 0;
        }var k = [],
            l = {},
            m;q(e, function (e, h) {
          var m = e.attrName,
              p = e.optional,
              r,
              A,
              u,
              B;switch (e.mode) {case "@":
              p || ua.call(c, m) || (d[h] = c[m] = void 0);p = c.$observe(m, function (a) {
                if (E(a) || Ia(a)) g(h, a, d[h]), d[h] = a;
              });c.$$observers[m].$$scope = a;r = c[m];E(r) ? d[h] = b(r)(a) : Ia(r) && (d[h] = r);l[h] = new Ib(hc, d[h]);k.push(p);break;case "=":
              if (!ua.call(c, m)) {
                if (p) break;c[m] = void 0;
              }if (p && !c[m]) break;A = n(c[m]);B = A.literal ? qa : function (a, b) {
                return a === b || a !== a && b !== b;
              };u = A.assign || function () {
                r = d[h] = A(a);throw fa("nonassign", c[m], m, f.name);
              };r = d[h] = A(a);p = function p(b) {
                B(b, d[h]) || (B(b, r) ? u(a, b = d[h]) : d[h] = b);return r = b;
              };p.$stateful = !0;p = e.collection ? a.$watchCollection(c[m], p) : a.$watch(n(c[m], p), null, A.literal);k.push(p);break;case "<":
              if (!ua.call(c, m)) {
                if (p) break;
                c[m] = void 0;
              }if (p && !c[m]) break;A = n(c[m]);var I = A.literal,
                  G = d[h] = A(a);l[h] = new Ib(hc, d[h]);p = a.$watch(A, function (a, b) {
                if (b === a) {
                  if (b === G || I && qa(b, G)) return;b = G;
                }g(h, a, b);d[h] = a;
              }, I);k.push(p);break;case "&":
              A = c.hasOwnProperty(m) ? n(c[m]) : w;if (A === w && p) break;d[h] = function (b) {
                return A(a, b);
              };}
        });return { initialChanges: l, removeWatches: k.length && function () {
            for (var a = 0, b = k.length; a < b; ++a) {
              k[a]();
            }
          } };
      }var Da = /^\w/,
          xa = z.document.createElement("div"),
          Fa = O,
          Ga = u,
          za = J,
          ea;s.prototype = { $normalize: Ba, $addClass: function $addClass(a) {
          a && 0 < a.length && N.addClass(this.$$element, a);
        }, $removeClass: function $removeClass(a) {
          a && 0 < a.length && N.removeClass(this.$$element, a);
        }, $updateClass: function $updateClass(a, b) {
          var c = ld(a, b);c && c.length && N.addClass(this.$$element, c);(c = ld(b, a)) && c.length && N.removeClass(this.$$element, c);
        }, $set: function $set(a, b, d, e) {
          var f = dd(this.$$element[0], a),
              g = md[a],
              h = a;f ? (this.$$element.prop(a, b), e = f) : g && (this[g] = b, h = g);this[a] = b;e ? this.$attr[a] = e : (e = this.$attr[a]) || (this.$attr[a] = e = Nc(a, "-"));f = wa(this.$$element);if ("a" === f && ("href" === a || "xlinkHref" === a) || "img" === f && "src" === a) this[a] = b = G(b, "src" === a);else if ("img" === f && "srcset" === a && v(b)) {
            for (var f = "", g = S(b), k = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, k = /\s/.test(g) ? k : /(,)/, g = g.split(k), k = Math.floor(g.length / 2), l = 0; l < k; l++) {
              var m = 2 * l,
                  f = f + G(S(g[m]), !0),
                  f = f + (" " + S(g[m + 1]));
            }g = S(g[2 * l]).split(/\s/);f += G(S(g[0]), !0);2 === g.length && (f += " " + S(g[1]));this[a] = b = f;
          }!1 !== d && (null === b || x(b) ? this.$$element.removeAttr(e) : Da.test(e) ? this.$$element.attr(e, b) : Q(this.$$element[0], e, b));(a = this.$$observers) && q(a[h], function (a) {
            try {
              a(b);
            } catch (d) {
              c(d);
            }
          });
        },
        $observe: function $observe(a, b) {
          var c = this,
              d = c.$$observers || (c.$$observers = W()),
              e = d[a] || (d[a] = []);e.push(b);B.$evalAsync(function () {
            e.$$inter || !c.hasOwnProperty(a) || x(c[a]) || b(c[a]);
          });return function () {
            Za(e, b);
          };
        } };var Aa = b.startSymbol(),
          Ca = b.endSymbol(),
          Ea = "{{" === Aa && "}}" === Ca ? Xa : function (a) {
        return a.replace(/\{\{/g, Aa).replace(/}}/g, Ca);
      },
          Ka = /^ngAttr[A-Z]/,
          La = /^(.+)Start$/;ba.$$addBindingInfo = p ? function (a, b) {
        var c = a.data("$binding") || [];C(b) ? c = c.concat(b) : c.push(b);a.data("$binding", c);
      } : w;ba.$$addBindingClass = p ? function (a) {
        Ma(a, "ng-binding");
      } : w;ba.$$addScopeInfo = p ? function (a, b, c, d) {
        a.data(c ? d ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope", b);
      } : w;ba.$$addScopeClass = p ? function (a, b) {
        Ma(a, b ? "ng-isolate-scope" : "ng-scope");
      } : w;ba.$$createComment = function (a, b) {
        var c = "";p && (c = " " + (a || "") + ": ", b && (c += b + " "));return z.document.createComment(c);
      };return ba;
    }];
  }function Ib(a, b) {
    this.previousValue = a;this.currentValue = b;
  }function Ba(a) {
    return a.replace(hd, "").replace(ng, fb);
  }function ld(a, b) {
    var d = "",
        c = a.split(/\s+/),
        f = b.split(/\s+/),
        e = 0;a: for (; e < c.length; e++) {
      for (var g = c[e], h = 0; h < f.length; h++) {
        if (g === f[h]) continue a;
      }d += (0 < d.length ? " " : "") + g;
    }return d;
  }function kd(a) {
    a = D(a);var b = a.length;if (1 >= b) return a;for (; b--;) {
      var d = a[b];(8 === d.nodeType || d.nodeType === Ja && "" === d.nodeValue.trim()) && og.call(a, b, 1);
    }return a;
  }function mg(a, b) {
    if (b && E(b)) return b;if (E(a)) {
      var d = nd.exec(a);if (d) return d[3];
    }
  }function sf() {
    var a = {},
        b = !1;this.has = function (b) {
      return a.hasOwnProperty(b);
    };this.register = function (b, c) {
      La(b, "controller");F(b) ? R(a, b) : a[b] = c;
    };this.allowGlobals = function () {
      b = !0;
    };this.$get = ["$injector", "$window", function (d, c) {
      function f(a, b, c, d) {
        if (!a || !F(a.$scope)) throw M("$controller")("noscp", d, b);a.$scope[b] = c;
      }return function (e, g, h, k) {
        var l, m, n;h = !0 === h;k && E(k) && (n = k);if (E(e)) {
          k = e.match(nd);if (!k) throw od("ctrlfmt", e);m = k[1];n = n || k[3];e = a.hasOwnProperty(m) ? a[m] : Pc(g.$scope, m, !0) || (b ? Pc(c, m, !0) : void 0);if (!e) throw od("ctrlreg", m);sb(e, m, !0);
        }if (h) return h = (C(e) ? e[e.length - 1] : e).prototype, l = Object.create(h || null), n && f(g, n, l, m || e.name), R(function () {
          var a = d.invoke(e, l, g, m);a !== l && (F(a) || y(a)) && (l = a, n && f(g, n, l, m || e.name));return l;
        }, { instance: l, identifier: n });l = d.instantiate(e, g, m);n && f(g, n, l, m || e.name);return l;
      };
    }];
  }function tf() {
    this.$get = ["$window", function (a) {
      return D(a.document);
    }];
  }function uf() {
    this.$get = ["$document", "$rootScope", function (a, b) {
      function d() {
        f = c.hidden;
      }var c = a[0],
          f = c && c.hidden;a.on("visibilitychange", d);b.$on("$destroy", function () {
        a.off("visibilitychange", d);
      });return function () {
        return f;
      };
    }];
  }function vf() {
    this.$get = ["$log", function (a) {
      return function (b, d) {
        a.error.apply(a, arguments);
      };
    }];
  }function ic(a) {
    return F(a) ? ga(a) ? a.toISOString() : bb(a) : a;
  }function Af() {
    this.$get = function () {
      return function (a) {
        if (!a) return "";var b = [];Ec(a, function (a, c) {
          null === a || x(a) || (C(a) ? q(a, function (a) {
            b.push(ka(c) + "=" + ka(ic(a)));
          }) : b.push(ka(c) + "=" + ka(ic(a))));
        });return b.join("&");
      };
    };
  }function Bf() {
    this.$get = function () {
      return function (a) {
        function b(a, f, e) {
          null === a || x(a) || (C(a) ? q(a, function (a, c) {
            b(a, f + "[" + (F(a) ? c : "") + "]");
          }) : F(a) && !ga(a) ? Ec(a, function (a, c) {
            b(a, f + (e ? "" : "[") + c + (e ? "" : "]"));
          }) : d.push(ka(f) + "=" + ka(ic(a))));
        }if (!a) return "";var d = [];b(a, "", !0);return d.join("&");
      };
    };
  }function jc(a, b) {
    if (E(a)) {
      var d = a.replace(pg, "").trim();if (d) {
        var c = b("Content-Type");(c = c && 0 === c.indexOf(pd)) || (c = (c = d.match(qg)) && rg[c[0]].test(d));c && (a = Ic(d));
      }
    }return a;
  }function qd(a) {
    var b = W(),
        d;E(a) ? q(a.split("\n"), function (a) {
      d = a.indexOf(":");var f = P(S(a.substr(0, d)));a = S(a.substr(d + 1));f && (b[f] = b[f] ? b[f] + ", " + a : a);
    }) : F(a) && q(a, function (a, d) {
      var e = P(d),
          g = S(a);e && (b[e] = b[e] ? b[e] + ", " + g : g);
    });return b;
  }function rd(a) {
    var b;return function (d) {
      b || (b = qd(a));return d ? (d = b[P(d)], void 0 === d && (d = null), d) : b;
    };
  }function sd(a, b, d, c) {
    if (y(c)) return c(a, b, d);q(c, function (c) {
      a = c(a, b, d);
    });return a;
  }function zf() {
    var a = this.defaults = { transformResponse: [jc], transformRequest: [function (a) {
        return F(a) && "[object File]" !== na.call(a) && "[object Blob]" !== na.call(a) && "[object FormData]" !== na.call(a) ? bb(a) : a;
      }], headers: { common: { Accept: "application/json, text/plain, */*" }, post: ra(kc), put: ra(kc),
        patch: ra(kc) }, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", paramSerializer: "$httpParamSerializer", jsonpCallbackParam: "callback" },
        b = !1;this.useApplyAsync = function (a) {
      return v(a) ? (b = !!a, this) : b;
    };var d = this.interceptors = [];this.$get = ["$browser", "$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", "$sce", function (c, f, e, g, h, k, l, m) {
      function n(b) {
        function d(a, b) {
          for (var c = 0, e = b.length; c < e;) {
            var f = b[c++],
                g = b[c++];a = a.then(f, g);
          }b.length = 0;return a;
        }function e(a, b) {
          var c,
              d = {};q(a, function (a, e) {
            y(a) ? (c = a(b), null != c && (d[e] = c)) : d[e] = a;
          });return d;
        }function f(a) {
          var b = R({}, a);b.data = sd(a.data, a.headers, a.status, g.transformResponse);a = a.status;return 200 <= a && 300 > a ? b : k.reject(b);
        }if (!F(b)) throw M("$http")("badreq", b);if (!E(m.valueOf(b.url))) throw M("$http")("badreq", b.url);var g = R({ method: "get", transformRequest: a.transformRequest, transformResponse: a.transformResponse, paramSerializer: a.paramSerializer, jsonpCallbackParam: a.jsonpCallbackParam }, b);g.headers = function (b) {
          var c = a.headers,
              d = R({}, b.headers),
              f,
              g,
              h,
              c = R({}, c.common, c[P(b.method)]);a: for (f in c) {
            g = P(f);for (h in d) {
              if (P(h) === g) continue a;
            }d[f] = c[f];
          }return e(d, ra(b));
        }(b);g.method = ub(g.method);g.paramSerializer = E(g.paramSerializer) ? l.get(g.paramSerializer) : g.paramSerializer;c.$$incOutstandingRequestCount();var h = [],
            n = [];b = k.resolve(g);q(u, function (a) {
          (a.request || a.requestError) && h.unshift(a.request, a.requestError);(a.response || a.responseError) && n.push(a.response, a.responseError);
        });b = d(b, h);b = b.then(function (b) {
          var c = b.headers,
              d = sd(b.data, rd(c), void 0, b.transformRequest);x(d) && q(c, function (a, b) {
            "content-type" === P(b) && delete c[b];
          });x(b.withCredentials) && !x(a.withCredentials) && (b.withCredentials = a.withCredentials);return p(b, d).then(f, f);
        });b = d(b, n);return b = b.finally(function () {
          c.$$completeOutstandingRequest(w);
        });
      }function p(c, d) {
        function g(a) {
          if (a) {
            var c = {};q(a, function (a, d) {
              c[d] = function (c) {
                function d() {
                  a(c);
                }b ? h.$applyAsync(d) : h.$$phase ? d() : h.$apply(d);
              };
            });return c;
          }
        }function l(a, c, d, e) {
          function f() {
            p(c, a, d, e);
          }N && (200 <= a && 300 > a ? N.put(Q, [a, c, qd(d), e]) : N.remove(Q));b ? h.$applyAsync(f) : (f(), h.$$phase || h.$apply());
        }function p(a, b, d, e) {
          b = -1 <= b ? b : 0;(200 <= b && 300 > b ? B.resolve : B.reject)({ data: a, status: b, headers: rd(d), config: c, statusText: e });
        }function K(a) {
          p(a.data, a.status, ra(a.headers()), a.statusText);
        }function u() {
          var a = n.pendingRequests.indexOf(c);-1 !== a && n.pendingRequests.splice(a, 1);
        }var B = k.defer(),
            L = B.promise,
            N,
            G,
            T = c.headers,
            s = "jsonp" === P(c.method),
            Q = c.url;s ? Q = m.getTrustedResourceUrl(Q) : E(Q) || (Q = m.valueOf(Q));Q = r(Q, c.paramSerializer(c.params));s && (Q = J(Q, c.jsonpCallbackParam));n.pendingRequests.push(c);L.then(u, u);!c.cache && !a.cache || !1 === c.cache || "GET" !== c.method && "JSONP" !== c.method || (N = F(c.cache) ? c.cache : F(a.cache) ? a.cache : O);N && (G = N.get(Q), v(G) ? G && y(G.then) ? G.then(K, K) : C(G) ? p(G[1], G[0], ra(G[2]), G[3]) : p(G, 200, {}, "OK") : N.put(Q, L));x(G) && ((G = td(c.url) ? e()[c.xsrfCookieName || a.xsrfCookieName] : void 0) && (T[c.xsrfHeaderName || a.xsrfHeaderName] = G), f(c.method, Q, d, l, T, c.timeout, c.withCredentials, c.responseType, g(c.eventHandlers), g(c.uploadEventHandlers)));return L;
      }function r(a, b) {
        0 < b.length && (a += (-1 === a.indexOf("?") ? "?" : "&") + b);return a;
      }function J(a, b) {
        if (/[&?][^=]+=JSON_CALLBACK/.test(a)) throw ud("badjsonp", a);if (new RegExp("[&?]" + b + "=").test(a)) throw ud("badjsonp", b, a);return a += (-1 === a.indexOf("?") ? "?" : "&") + b + "=JSON_CALLBACK";
      }var O = g("$http");a.paramSerializer = E(a.paramSerializer) ? l.get(a.paramSerializer) : a.paramSerializer;var u = [];q(d, function (a) {
        u.unshift(E(a) ? l.get(a) : l.invoke(a));
      });n.pendingRequests = [];(function (a) {
        q(arguments, function (a) {
          n[a] = function (b, c) {
            return n(R({}, c || {}, { method: a, url: b }));
          };
        });
      })("get", "delete", "head", "jsonp");(function (a) {
        q(arguments, function (a) {
          n[a] = function (b, c, d) {
            return n(R({}, d || {}, { method: a, url: b, data: c }));
          };
        });
      })("post", "put", "patch");n.defaults = a;return n;
    }];
  }function Df() {
    this.$get = function () {
      return function () {
        return new z.XMLHttpRequest();
      };
    };
  }function Cf() {
    this.$get = ["$browser", "$jsonpCallbacks", "$document", "$xhrFactory", function (a, b, d, c) {
      return sg(a, c, a.defer, b, d[0]);
    }];
  }function sg(a, b, d, c, f) {
    function e(a, b, d) {
      a = a.replace("JSON_CALLBACK", b);var e = f.createElement("script"),
          _m = null;e.type = "text/javascript";e.src = a;e.async = !0;_m = function m(a) {
        e.removeEventListener("load", _m);e.removeEventListener("error", _m);f.body.removeChild(e);e = null;var g = -1,
            r = "unknown";a && ("load" !== a.type || c.wasCalled(b) || (a = { type: "error" }), r = a.type, g = "error" === a.type ? 404 : 200);d && d(g, r);
      };e.addEventListener("load", _m);e.addEventListener("error", _m);f.body.appendChild(e);return _m;
    }return function (f, h, k, l, m, n, p, r, J, O) {
      function u() {
        V && V();t && t.abort();
      }h = h || a.url();if ("jsonp" === P(f)) var H = c.createCallback(h),
          V = e(h, H, function (a, b) {
        var e = 200 === a && c.getResponse(H);v(A) && d.cancel(A);V = t = null;l(a, e, "", b);c.removeCallback(H);
      });else {
        var t = b(f, h);t.open(f, h, !0);q(m, function (a, b) {
          v(a) && t.setRequestHeader(b, a);
        });t.onload = function () {
          var a = t.statusText || "",
              b = "response" in t ? t.response : t.responseText,
              c = 1223 === t.status ? 204 : t.status;0 === c && (c = b ? 200 : "file" === oa(h).protocol ? 404 : 0);var e = t.getAllResponseHeaders();v(A) && d.cancel(A);V = t = null;l(c, b, e, a);
        };f = function f() {
          v(A) && d.cancel(A);V = t = null;l(-1, null, null, "");
        };t.onerror = f;t.onabort = f;t.ontimeout = f;q(J, function (a, b) {
          t.addEventListener(b, a);
        });q(O, function (a, b) {
          t.upload.addEventListener(b, a);
        });p && (t.withCredentials = !0);if (r) try {
          t.responseType = r;
        } catch (s) {
          if ("json" !== r) throw s;
        }t.send(x(k) ? null : k);
      }if (0 < n) var A = d(u, n);else n && y(n.then) && n.then(u);
    };
  }function xf() {
    var a = "{{",
        b = "}}";this.startSymbol = function (b) {
      return b ? (a = b, this) : a;
    };this.endSymbol = function (a) {
      return a ? (b = a, this) : b;
    };this.$get = ["$parse", "$exceptionHandler", "$sce", function (d, c, f) {
      function e(a) {
        return "\\\\\\" + a;
      }function g(c) {
        return c.replace(n, a).replace(p, b);
      }function h(a, b, c, d) {
        var e = a.$watch(function (a) {
          e();return d(a);
        }, b, c);return e;
      }function k(e, k, n, p) {
        function H(a) {
          try {
            var b = a;a = n ? f.getTrusted(n, b) : f.valueOf(b);return p && !v(a) ? a : Yb(a);
          } catch (d) {
            c(Ca.interr(e, d));
          }
        }if (!e.length || -1 === e.indexOf(a)) {
          var q;k || (k = g(e), q = ma(k), q.exp = e, q.expressions = [], q.$$watchDelegate = h);return q;
        }p = !!p;var t,
            s,
            A = 0,
            K = [],
            I = [];q = e.length;for (var B = [], L = []; A < q;) {
          if (-1 !== (t = e.indexOf(a, A)) && -1 !== (s = e.indexOf(b, t + l))) A !== t && B.push(g(e.substring(A, t))), A = e.substring(t + l, s), K.push(A), I.push(d(A, H)), A = s + m, L.push(B.length), B.push("");else {
            A !== q && B.push(g(e.substring(A)));break;
          }
        }n && 1 < B.length && Ca.throwNoconcat(e);if (!k || K.length) {
          var N = function N(a) {
            for (var b = 0, c = K.length; b < c; b++) {
              if (p && x(a[b])) return;B[L[b]] = a[b];
            }return B.join("");
          };return R(function (a) {
            var b = 0,
                d = K.length,
                f = Array(d);try {
              for (; b < d; b++) {
                f[b] = I[b](a);
              }return N(f);
            } catch (g) {
              c(Ca.interr(e, g));
            }
          }, { exp: e, expressions: K, $$watchDelegate: function $$watchDelegate(a, b) {
              var c;return a.$watchGroup(I, function (d, e) {
                var f = N(d);y(b) && b.call(this, f, d !== e ? c : f, a);c = f;
              });
            } });
        }
      }var l = a.length,
          m = b.length,
          n = new RegExp(a.replace(/./g, e), "g"),
          p = new RegExp(b.replace(/./g, e), "g");k.startSymbol = function () {
        return a;
      };k.endSymbol = function () {
        return b;
      };return k;
    }];
  }function yf() {
    this.$get = ["$rootScope", "$window", "$q", "$$q", "$browser", function (a, b, d, c, f) {
      function e(e, k, l, m) {
        function n() {
          p ? e.apply(null, r) : e(u);
        }var p = 4 < arguments.length,
            r = p ? va.call(arguments, 4) : [],
            J = b.setInterval,
            q = b.clearInterval,
            u = 0,
            H = v(m) && !m,
            V = (H ? c : d).defer(),
            t = V.promise;l = v(l) ? l : 0;t.$$intervalId = J(function () {
          H ? f.defer(n) : a.$evalAsync(n);V.notify(u++);0 < l && u >= l && (V.resolve(u), q(t.$$intervalId), delete g[t.$$intervalId]);H || a.$apply();
        }, k);g[t.$$intervalId] = V;return t;
      }var g = {};e.cancel = function (a) {
        return a && a.$$intervalId in g ? (g[a.$$intervalId].promise.catch(w), g[a.$$intervalId].reject("canceled"), b.clearInterval(a.$$intervalId), delete g[a.$$intervalId], !0) : !1;
      };return e;
    }];
  }function lc(a) {
    a = a.split("/");for (var b = a.length; b--;) {
      a[b] = cb(a[b]);
    }return a.join("/");
  }function vd(a, b) {
    var d = oa(a);b.$$protocol = d.protocol;b.$$host = d.hostname;b.$$port = Z(d.port) || tg[d.protocol] || null;
  }function wd(a, b) {
    if (ug.test(a)) throw kb("badpath", a);var d = "/" !== a.charAt(0);d && (a = "/" + a);var c = oa(a);b.$$path = decodeURIComponent(d && "/" === c.pathname.charAt(0) ? c.pathname.substring(1) : c.pathname);b.$$search = Lc(c.search);b.$$hash = decodeURIComponent(c.hash);b.$$path && "/" !== b.$$path.charAt(0) && (b.$$path = "/" + b.$$path);
  }function mc(a, b) {
    return a.slice(0, b.length) === b;
  }function la(a, b) {
    if (mc(b, a)) return b.substr(a.length);
  }function Aa(a) {
    var b = a.indexOf("#");return -1 === b ? a : a.substr(0, b);
  }function lb(a) {
    return a.replace(/(#.+)|#$/, "$1");
  }function nc(a, b, d) {
    this.$$html5 = !0;d = d || "";vd(a, this);this.$$parse = function (a) {
      var d = la(b, a);if (!E(d)) throw kb("ipthprfx", a, b);wd(d, this);this.$$path || (this.$$path = "/");this.$$compose();
    };this.$$compose = function () {
      var a = Xb(this.$$search),
          d = this.$$hash ? "#" + cb(this.$$hash) : "";this.$$url = lc(this.$$path) + (a ? "?" + a : "") + d;this.$$absUrl = b + this.$$url.substr(1);this.$$urlUpdatedByLocation = !0;
    };this.$$parseLinkUrl = function (c, f) {
      if (f && "#" === f[0]) return this.hash(f.slice(1)), !0;var e, g;v(e = la(a, c)) ? (g = e, g = d && v(e = la(d, e)) ? b + (la("/", e) || e) : a + g) : v(e = la(b, c)) ? g = b + e : b === c + "/" && (g = b);g && this.$$parse(g);return !!g;
    };
  }function oc(a, b, d) {
    vd(a, this);this.$$parse = function (c) {
      var f = la(a, c) || la(b, c),
          e;x(f) || "#" !== f.charAt(0) ? this.$$html5 ? e = f : (e = "", x(f) && (a = c, this.replace())) : (e = la(d, f), x(e) && (e = f));wd(e, this);c = this.$$path;var f = a,
          g = /^\/[A-Z]:(\/.*)/;mc(e, f) && (e = e.replace(f, ""));g.exec(e) || (c = (e = g.exec(c)) ? e[1] : c);this.$$path = c;this.$$compose();
    };this.$$compose = function () {
      var b = Xb(this.$$search),
          f = this.$$hash ? "#" + cb(this.$$hash) : "";this.$$url = lc(this.$$path) + (b ? "?" + b : "") + f;this.$$absUrl = a + (this.$$url ? d + this.$$url : "");this.$$urlUpdatedByLocation = !0;
    };this.$$parseLinkUrl = function (b, d) {
      return Aa(a) === Aa(b) ? (this.$$parse(b), !0) : !1;
    };
  }function xd(a, b, d) {
    this.$$html5 = !0;oc.apply(this, arguments);this.$$parseLinkUrl = function (c, f) {
      if (f && "#" === f[0]) return this.hash(f.slice(1)), !0;var e, g;a === Aa(c) ? e = c : (g = la(b, c)) ? e = a + d + g : b === c + "/" && (e = b);e && this.$$parse(e);return !!e;
    };this.$$compose = function () {
      var b = Xb(this.$$search),
          f = this.$$hash ? "#" + cb(this.$$hash) : "";this.$$url = lc(this.$$path) + (b ? "?" + b : "") + f;this.$$absUrl = a + d + this.$$url;this.$$urlUpdatedByLocation = !0;
    };
  }function Jb(a) {
    return function () {
      return this[a];
    };
  }function yd(a, b) {
    return function (d) {
      if (x(d)) return this[a];this[a] = b(d);this.$$compose();return this;
    };
  }function Ff() {
    var a = "!",
        b = { enabled: !1, requireBase: !0, rewriteLinks: !0 };
    this.hashPrefix = function (b) {
      return v(b) ? (a = b, this) : a;
    };this.html5Mode = function (a) {
      if (Ia(a)) return b.enabled = a, this;if (F(a)) {
        Ia(a.enabled) && (b.enabled = a.enabled);Ia(a.requireBase) && (b.requireBase = a.requireBase);if (Ia(a.rewriteLinks) || E(a.rewriteLinks)) b.rewriteLinks = a.rewriteLinks;return this;
      }return b;
    };this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function (d, c, f, e, g) {
      function h(a, b, d) {
        var e = l.url(),
            f = l.$$state;try {
          c.url(a, b, d), l.$$state = c.state();
        } catch (g) {
          throw l.url(e), l.$$state = f, g;
        }
      }function k(a, b) {
        d.$broadcast("$locationChangeSuccess", l.absUrl(), a, l.$$state, b);
      }var l, m;m = c.baseHref();var n = c.url(),
          p;if (b.enabled) {
        if (!m && b.requireBase) throw kb("nobase");p = n.substring(0, n.indexOf("/", n.indexOf("//") + 2)) + (m || "/");m = f.history ? nc : xd;
      } else p = Aa(n), m = oc;var r = p.substr(0, Aa(p).lastIndexOf("/") + 1);l = new m(p, r, "#" + a);l.$$parseLinkUrl(n, n);l.$$state = c.state();var J = /^\s*(javascript|mailto):/i;e.on("click", function (a) {
        var f = b.rewriteLinks;if (f && !a.ctrlKey && !a.metaKey && !a.shiftKey && 2 !== a.which && 2 !== a.button) {
          for (var h = D(a.target); "a" !== wa(h[0]);) {
            if (h[0] === e[0] || !(h = h.parent())[0]) return;
          }if (!E(f) || !x(h.attr(f))) {
            var f = h.prop("href"),
                k = h.attr("href") || h.attr("xlink:href");F(f) && "[object SVGAnimatedString]" === f.toString() && (f = oa(f.animVal).href);J.test(f) || !f || h.attr("target") || a.isDefaultPrevented() || !l.$$parseLinkUrl(f, k) || (a.preventDefault(), l.absUrl() !== c.url() && (d.$apply(), g.angular["ff-684208-preventDefault"] = !0));
          }
        }
      });lb(l.absUrl()) !== lb(n) && c.url(l.absUrl(), !0);var q = !0;
      c.onUrlChange(function (a, b) {
        mc(a, r) ? (d.$evalAsync(function () {
          var c = l.absUrl(),
              e = l.$$state,
              f;a = lb(a);l.$$parse(a);l.$$state = b;f = d.$broadcast("$locationChangeStart", a, c, b, e).defaultPrevented;l.absUrl() === a && (f ? (l.$$parse(c), l.$$state = e, h(c, !1, e)) : (q = !1, k(c, e)));
        }), d.$$phase || d.$digest()) : g.location.href = a;
      });d.$watch(function () {
        if (q || l.$$urlUpdatedByLocation) {
          l.$$urlUpdatedByLocation = !1;var a = lb(c.url()),
              b = lb(l.absUrl()),
              e = c.state(),
              g = l.$$replace,
              m = a !== b || l.$$html5 && f.history && e !== l.$$state;if (q || m) q = !1, d.$evalAsync(function () {
            var b = l.absUrl(),
                c = d.$broadcast("$locationChangeStart", b, a, l.$$state, e).defaultPrevented;l.absUrl() === b && (c ? (l.$$parse(a), l.$$state = e) : (m && h(b, g, e === l.$$state ? null : l.$$state), k(a, e)));
          });
        }l.$$replace = !1;
      });return l;
    }];
  }function Gf() {
    var a = !0,
        b = this;this.debugEnabled = function (b) {
      return v(b) ? (a = b, this) : a;
    };this.$get = ["$window", function (d) {
      function c(a) {
        a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line));return a;
      }function f(a) {
        var b = d.console || {},
            f = b[a] || b.log || w;a = !1;try {
          a = !!f.apply;
        } catch (k) {}return a ? function () {
          var a = [];q(arguments, function (b) {
            a.push(c(b));
          });return f.apply(b, a);
        } : function (a, b) {
          f(a, null == b ? "" : b);
        };
      }return { log: f("log"), info: f("info"), warn: f("warn"), error: f("error"), debug: function () {
          var c = f("debug");return function () {
            a && c.apply(b, arguments);
          };
        }() };
    }];
  }function vg(a) {
    return a + "";
  }function wg(a, b) {
    return "undefined" !== typeof a ? a : b;
  }function zd(a, b) {
    return "undefined" === typeof a ? b : "undefined" === typeof b ? a : a + b;
  }function U(a, b) {
    var d, c, f;switch (a.type) {case s.Program:
        d = !0;q(a.body, function (a) {
          U(a.expression, b);d = d && a.expression.constant;
        });a.constant = d;break;case s.Literal:
        a.constant = !0;a.toWatch = [];break;case s.UnaryExpression:
        U(a.argument, b);a.constant = a.argument.constant;a.toWatch = a.argument.toWatch;break;case s.BinaryExpression:
        U(a.left, b);U(a.right, b);a.constant = a.left.constant && a.right.constant;a.toWatch = a.left.toWatch.concat(a.right.toWatch);break;case s.LogicalExpression:
        U(a.left, b);U(a.right, b);a.constant = a.left.constant && a.right.constant;a.toWatch = a.constant ? [] : [a];break;case s.ConditionalExpression:
        U(a.test, b);U(a.alternate, b);U(a.consequent, b);a.constant = a.test.constant && a.alternate.constant && a.consequent.constant;a.toWatch = a.constant ? [] : [a];break;case s.Identifier:
        a.constant = !1;a.toWatch = [a];break;case s.MemberExpression:
        U(a.object, b);a.computed && U(a.property, b);a.constant = a.object.constant && (!a.computed || a.property.constant);a.toWatch = [a];break;case s.CallExpression:
        d = f = a.filter ? !b(a.callee.name).$stateful : !1;c = [];q(a.arguments, function (a) {
          U(a, b);d = d && a.constant;a.constant || c.push.apply(c, a.toWatch);
        });a.constant = d;a.toWatch = f ? c : [a];break;case s.AssignmentExpression:
        U(a.left, b);U(a.right, b);a.constant = a.left.constant && a.right.constant;a.toWatch = [a];break;case s.ArrayExpression:
        d = !0;c = [];q(a.elements, function (a) {
          U(a, b);d = d && a.constant;a.constant || c.push.apply(c, a.toWatch);
        });a.constant = d;a.toWatch = c;break;case s.ObjectExpression:
        d = !0;c = [];q(a.properties, function (a) {
          U(a.value, b);d = d && a.value.constant && !a.computed;a.value.constant || c.push.apply(c, a.value.toWatch);a.computed && (U(a.key, b), a.key.constant || c.push.apply(c, a.key.toWatch));
        });a.constant = d;a.toWatch = c;break;case s.ThisExpression:
        a.constant = !1;a.toWatch = [];break;case s.LocalsExpression:
        a.constant = !1, a.toWatch = [];}
  }function Ad(a) {
    if (1 === a.length) {
      a = a[0].expression;var b = a.toWatch;return 1 !== b.length ? b : b[0] !== a ? b : void 0;
    }
  }function Bd(a) {
    return a.type === s.Identifier || a.type === s.MemberExpression;
  }function Cd(a) {
    if (1 === a.body.length && Bd(a.body[0].expression)) return { type: s.AssignmentExpression, left: a.body[0].expression, right: { type: s.NGValueParameter }, operator: "=" };
  }function Dd(a) {
    return 0 === a.body.length || 1 === a.body.length && (a.body[0].expression.type === s.Literal || a.body[0].expression.type === s.ArrayExpression || a.body[0].expression.type === s.ObjectExpression);
  }function Ed(a, b) {
    this.astBuilder = a;this.$filter = b;
  }function Fd(a, b) {
    this.astBuilder = a;this.$filter = b;
  }function pc(a) {
    return y(a.valueOf) ? a.valueOf() : xg.call(a);
  }function Hf() {
    var a = W(),
        b = { "true": !0, "false": !1, "null": null, undefined: void 0 },
        d,
        c;this.addLiteral = function (a, c) {
      b[a] = c;
    };this.setIdentifierFns = function (a, b) {
      d = a;c = b;return this;
    };this.$get = ["$filter", function (f) {
      function e(a, b, c) {
        return null == a || null == b ? a === b : "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a)) || c || (a = pc(a), "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a))) ? a === b || a !== a && b !== b : !1;
      }function g(a, b, c, d, f) {
        var g = d.inputs,
            h;if (1 === g.length) {
          var k = e,
              g = g[0];return a.$watch(function (a) {
            var b = g(a);e(b, k, d.literal) || (h = d(a, void 0, void 0, [b]), k = b && pc(b));return h;
          }, b, c, f);
        }for (var l = [], m = [], n = 0, I = g.length; n < I; n++) {
          l[n] = e, m[n] = null;
        }return a.$watch(function (a) {
          for (var b = !1, c = 0, f = g.length; c < f; c++) {
            var k = g[c](a);if (b || (b = !e(k, l[c], d.literal))) m[c] = k, l[c] = k && pc(k);
          }b && (h = d(a, void 0, void 0, m));return h;
        }, b, c, f);
      }function h(a, b, c, d, e) {
        function f(a) {
          return d(a);
        }function h(a, c, d) {
          l = a;y(b) && b(a, c, d);v(a) && d.$$postDigest(function () {
            v(l) && k();
          });
        }var k, l;return k = d.inputs ? g(a, h, c, d, e) : a.$watch(f, h, c);
      }function k(a, b, c, d) {
        function e(a) {
          var b = !0;q(a, function (a) {
            v(a) || (b = !1);
          });return b;
        }var f, g;return f = a.$watch(function (a) {
          return d(a);
        }, function (a, c, d) {
          g = a;y(b) && b(a, c, d);e(a) && d.$$postDigest(function () {
            e(g) && f();
          });
        }, c);
      }function l(a, b, c, d) {
        var e = a.$watch(function (a) {
          e();return d(a);
        }, b, c);return e;
      }function m(a, b) {
        if (!b) return a;var c = a.$$watchDelegate,
            d = !1,
            c = c !== k && c !== h ? function (c, e, f, g) {
          f = d && g ? g[0] : a(c, e, f, g);return b(f, c, e);
        } : function (c, d, e, f) {
          e = a(c, d, e, f);c = b(e, c, d);return v(e) ? c : e;
        },
            d = !a.inputs;a.$$watchDelegate && a.$$watchDelegate !== g ? (c.$$watchDelegate = a.$$watchDelegate, c.inputs = a.inputs) : b.$stateful || (c.$$watchDelegate = g, c.inputs = a.inputs ? a.inputs : [a]);return c;
      }var n = { csp: Ga().noUnsafeEval, literals: xa(b), isIdentifierStart: y(d) && d, isIdentifierContinue: y(c) && c };return function (b, c) {
        var d, e, u;switch (typeof b === "undefined" ? "undefined" : _typeof(b)) {case "string":
            return u = b = b.trim(), d = a[u], d || (":" === b.charAt(0) && ":" === b.charAt(1) && (e = !0, b = b.substring(2)), d = new qc(n), d = new rc(d, f, n).parse(b), d.constant ? d.$$watchDelegate = l : e ? d.$$watchDelegate = d.literal ? k : h : d.inputs && (d.$$watchDelegate = g), a[u] = d), m(d, c);case "function":
            return m(b, c);default:
            return m(w, c);}
      };
    }];
  }function Jf() {
    var a = !0;this.$get = ["$rootScope", "$exceptionHandler", function (b, d) {
      return Gd(function (a) {
        b.$evalAsync(a);
      }, d, a);
    }];this.errorOnUnhandledRejections = function (b) {
      return v(b) ? (a = b, this) : a;
    };
  }function Kf() {
    var a = !0;this.$get = ["$browser", "$exceptionHandler", function (b, d) {
      return Gd(function (a) {
        b.defer(a);
      }, d, a);
    }];this.errorOnUnhandledRejections = function (b) {
      return v(b) ? (a = b, this) : a;
    };
  }function Gd(a, b, d) {
    function c() {
      return new f();
    }function f() {
      var a = this.promise = new e();this.resolve = function (b) {
        k(a, b);
      };this.reject = function (b) {
        m(a, b);
      };this.notify = function (b) {
        p(a, b);
      };
    }function e() {
      this.$$state = { status: 0 };
    }function g() {
      for (; !v && t.length;) {
        var a = t.shift();if (!a.pur) {
          a.pur = !0;var c = a.value,
              c = "Possibly unhandled rejection: " + ("function" === typeof c ? c.toString().replace(/ \{[\s\S]*$/, "") : x(c) ? "undefined" : "string" !== typeof c ? xe(c) : c);a.value instanceof Error ? b(a.value, c) : b(c);
        }
      }
    }function h(b) {
      !d || b.pending || 2 !== b.status || b.pur || (0 === v && 0 === t.length && a(g), t.push(b));!b.processScheduled && b.pending && (b.processScheduled = !0, ++v, a(function () {
        var c, e, f;f = b.pending;b.processScheduled = !1;b.pending = void 0;try {
          for (var h = 0, l = f.length; h < l; ++h) {
            b.pur = !0;e = f[h][0];c = f[h][b.status];try {
              y(c) ? k(e, c(b.value)) : 1 === b.status ? k(e, b.value) : m(e, b.value);
            } catch (n) {
              m(e, n);
            }
          }
        } finally {
          --v, d && 0 === v && a(g);
        }
      }));
    }function k(a, b) {
      a.$$state.status || (b === a ? n(a, H("qcycle", b)) : l(a, b));
    }function l(a, b) {
      function c(b) {
        g || (g = !0, l(a, b));
      }function d(b) {
        g || (g = !0, n(a, b));
      }function e(b) {
        p(a, b);
      }var f,
          g = !1;try {
        if (F(b) || y(b)) f = b.then;y(f) ? (a.$$state.status = -1, f.call(b, c, d, e)) : (a.$$state.value = b, a.$$state.status = 1, h(a.$$state));
      } catch (k) {
        d(k);
      }
    }function m(a, b) {
      a.$$state.status || n(a, b);
    }function n(a, b) {
      a.$$state.value = b;a.$$state.status = 2;h(a.$$state);
    }function p(c, d) {
      var e = c.$$state.pending;0 >= c.$$state.status && e && e.length && a(function () {
        for (var a, c, f = 0, g = e.length; f < g; f++) {
          c = e[f][0];a = e[f][3];try {
            p(c, y(a) ? a(d) : d);
          } catch (h) {
            b(h);
          }
        }
      });
    }function r(a) {
      var b = new e();m(b, a);return b;
    }function J(a, b, c) {
      var d = null;try {
        y(c) && (d = c());
      } catch (e) {
        return r(e);
      }return d && y(d.then) ? d.then(function () {
        return b(a);
      }, r) : b(a);
    }function s(a, b, c, d) {
      var f = new e();k(f, a);return f.then(b, c, d);
    }function u(a) {
      if (!y(a)) throw H("norslvr", a);var b = new e();a(function (a) {
        k(b, a);
      }, function (a) {
        m(b, a);
      });return b;
    }var H = M("$q", TypeError),
        v = 0,
        t = [];R(e.prototype, { then: function then(a, b, c) {
        if (x(a) && x(b) && x(c)) return this;var d = new e();this.$$state.pending = this.$$state.pending || [];this.$$state.pending.push([d, a, b, c]);0 < this.$$state.status && h(this.$$state);return d;
      }, "catch": function _catch(a) {
        return this.then(null, a);
      }, "finally": function _finally(a, b) {
        return this.then(function (b) {
          return J(b, w, a);
        }, function (b) {
          return J(b, r, a);
        }, b);
      } });var w = s;u.prototype = e.prototype;u.defer = c;u.reject = r;u.when = s;u.resolve = w;u.all = function (a) {
      var b = new e(),
          c = 0,
          d = C(a) ? [] : {};q(a, function (a, e) {
        c++;s(a).then(function (a) {
          d[e] = a;--c || k(b, d);
        }, function (a) {
          m(b, a);
        });
      });0 === c && k(b, d);return b;
    };u.race = function (a) {
      var b = c();q(a, function (a) {
        s(a).then(b.resolve, b.reject);
      });return b.promise;
    };return u;
  }function Tf() {
    this.$get = ["$window", "$timeout", function (a, b) {
      var d = a.requestAnimationFrame || a.webkitRequestAnimationFrame,
          c = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame,
          f = !!d,
          e = f ? function (a) {
        var b = d(a);return function () {
          c(b);
        };
      } : function (a) {
        var c = b(a, 16.66, !1);return function () {
          b.cancel(c);
        };
      };e.supported = f;return e;
    }];
  }function If() {
    function a(a) {
      function b() {
        this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null;this.$$listeners = {};this.$$listenerCount = {};this.$$watchersCount = 0;this.$id = ++qb;this.$$ChildScope = null;
      }b.prototype = a;return b;
    }var b = 10,
        d = M("$rootScope"),
        c = null,
        f = null;this.digestTtl = function (a) {
      arguments.length && (b = a);return b;
    };this.$get = ["$exceptionHandler", "$parse", "$browser", function (e, g, h) {
      function k(a) {
        a.currentScope.$$destroyed = !0;
      }function l(a) {
        9 === Ha && (a.$$childHead && l(a.$$childHead), a.$$nextSibling && l(a.$$nextSibling));a.$parent = a.$$nextSibling = a.$$prevSibling = a.$$childHead = a.$$childTail = a.$root = a.$$watchers = null;
      }function m() {
        this.$id = ++qb;this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;this.$root = this;this.$$destroyed = !1;this.$$listeners = {};this.$$listenerCount = {};this.$$watchersCount = 0;this.$$isolateBindings = null;
      }function n(a) {
        if (H.$$phase) throw d("inprog", H.$$phase);H.$$phase = a;
      }function p(a, b) {
        do {
          a.$$watchersCount += b;
        } while (a = a.$parent);
      }function r(a, b, c) {
        do {
          a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c];
        } while (a = a.$parent);
      }function J() {}function s() {
        for (; ia.length;) {
          try {
            ia.shift()();
          } catch (a) {
            e(a);
          }
        }f = null;
      }function u() {
        null === f && (f = h.defer(function () {
          H.$apply(s);
        }));
      }
      m.prototype = { constructor: m, $new: function $new(b, c) {
          var d;c = c || this;b ? (d = new m(), d.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = a(this)), d = new this.$$ChildScope());d.$parent = c;d.$$prevSibling = c.$$childTail;c.$$childHead ? (c.$$childTail.$$nextSibling = d, c.$$childTail = d) : c.$$childHead = c.$$childTail = d;(b || c !== this) && d.$on("$destroy", k);return d;
        }, $watch: function $watch(a, b, d, e) {
          var f = g(a);if (f.$$watchDelegate) return f.$$watchDelegate(this, b, d, f, a);var h = this,
              k = h.$$watchers,
              l = { fn: b, last: J, get: f, exp: e || a, eq: !!d };
          c = null;y(b) || (l.fn = w);k || (k = h.$$watchers = [], k.$$digestWatchIndex = -1);k.unshift(l);k.$$digestWatchIndex++;p(this, 1);return function () {
            var a = Za(k, l);0 <= a && (p(h, -1), a < k.$$digestWatchIndex && k.$$digestWatchIndex--);c = null;
          };
        }, $watchGroup: function $watchGroup(a, b) {
          function c() {
            h = !1;k ? (k = !1, b(e, e, g)) : b(e, d, g);
          }var d = Array(a.length),
              e = Array(a.length),
              f = [],
              g = this,
              h = !1,
              k = !0;if (!a.length) {
            var l = !0;g.$evalAsync(function () {
              l && b(e, e, g);
            });return function () {
              l = !1;
            };
          }if (1 === a.length) return this.$watch(a[0], function (a, c, f) {
            e[0] = a;d[0] = c;b(e, a === c ? e : d, f);
          });q(a, function (a, b) {
            var k = g.$watch(a, function (a, f) {
              e[b] = a;d[b] = f;h || (h = !0, g.$evalAsync(c));
            });f.push(k);
          });return function () {
            for (; f.length;) {
              f.shift()();
            }
          };
        }, $watchCollection: function $watchCollection(a, b) {
          function c(a) {
            e = a;var b, d, g, h;if (!x(e)) {
              if (F(e)) {
                if (sa(e)) for (f !== n && (f = n, t = f.length = 0, l++), a = e.length, t !== a && (l++, f.length = t = a), b = 0; b < a; b++) {
                  h = f[b], g = e[b], d = h !== h && g !== g, d || h === g || (l++, f[b] = g);
                } else {
                  f !== p && (f = p = {}, t = 0, l++);a = 0;for (b in e) {
                    ua.call(e, b) && (a++, g = e[b], h = f[b], b in f ? (d = h !== h && g !== g, d || h === g || (l++, f[b] = g)) : (t++, f[b] = g, l++));
                  }if (t > a) for (b in l++, f) {
                    ua.call(e, b) || (t--, delete f[b]);
                  }
                }
              } else f !== e && (f = e, l++);return l;
            }
          }c.$stateful = !0;var d = this,
              e,
              f,
              h,
              k = 1 < b.length,
              l = 0,
              m = g(a, c),
              n = [],
              p = {},
              r = !0,
              t = 0;return this.$watch(m, function () {
            r ? (r = !1, b(e, e, d)) : b(e, h, d);if (k) if (F(e)) {
              if (sa(e)) {
                h = Array(e.length);for (var a = 0; a < e.length; a++) {
                  h[a] = e[a];
                }
              } else for (a in h = {}, e) {
                ua.call(e, a) && (h[a] = e[a]);
              }
            } else h = e;
          });
        }, $digest: function $digest() {
          var a,
              g,
              k,
              l,
              m,
              p,
              r,
              u = b,
              q,
              w = [],
              x,
              ia;n("$digest");h.$$checkUrlChange();this === H && null !== f && (h.defer.cancel(f), s());c = null;do {
            r = !1;q = this;for (p = 0; p < v.length; p++) {
              try {
                ia = v[p], ia.scope.$eval(ia.expression, ia.locals);
              } catch (z) {
                e(z);
              }c = null;
            }v.length = 0;a: do {
              if (p = q.$$watchers) for (p.$$digestWatchIndex = p.length; p.$$digestWatchIndex--;) {
                try {
                  if (a = p[p.$$digestWatchIndex]) if (m = a.get, (g = m(q)) !== (k = a.last) && !(a.eq ? qa(g, k) : da(g) && da(k))) r = !0, c = a, a.last = a.eq ? xa(g, null) : g, l = a.fn, l(g, k === J ? g : k, q), 5 > u && (x = 4 - u, w[x] || (w[x] = []), w[x].push({ msg: y(a.exp) ? "fn: " + (a.exp.name || a.exp.toString()) : a.exp, newVal: g, oldVal: k }));else if (a === c) {
                    r = !1;break a;
                  }
                } catch (D) {
                  e(D);
                }
              }if (!(p = q.$$watchersCount && q.$$childHead || q !== this && q.$$nextSibling)) for (; q !== this && !(p = q.$$nextSibling);) {
                q = q.$parent;
              }
            } while (q = p);if ((r || v.length) && !u--) throw H.$$phase = null, d("infdig", b, w);
          } while (r || v.length);for (H.$$phase = null; A < t.length;) {
            try {
              t[A++]();
            } catch (E) {
              e(E);
            }
          }t.length = A = 0;h.$$checkUrlChange();
        }, $destroy: function $destroy() {
          if (!this.$$destroyed) {
            var a = this.$parent;this.$broadcast("$destroy");this.$$destroyed = !0;this === H && h.$$applicationDestroyed();p(this, -this.$$watchersCount);
            for (var b in this.$$listenerCount) {
              r(this, this.$$listenerCount[b], b);
            }a && a.$$childHead === this && (a.$$childHead = this.$$nextSibling);a && a.$$childTail === this && (a.$$childTail = this.$$prevSibling);this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling);this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling);this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = w;this.$on = this.$watch = this.$watchGroup = function () {
              return w;
            };this.$$listeners = {};this.$$nextSibling = null;l(this);
          }
        }, $eval: function $eval(a, b) {
          return g(a)(this, b);
        }, $evalAsync: function $evalAsync(a, b) {
          H.$$phase || v.length || h.defer(function () {
            v.length && H.$digest();
          });v.push({ scope: this, expression: g(a), locals: b });
        }, $$postDigest: function $$postDigest(a) {
          t.push(a);
        }, $apply: function $apply(a) {
          try {
            n("$apply");try {
              return this.$eval(a);
            } finally {
              H.$$phase = null;
            }
          } catch (b) {
            e(b);
          } finally {
            try {
              H.$digest();
            } catch (c) {
              throw e(c), c;
            }
          }
        }, $applyAsync: function $applyAsync(a) {
          function b() {
            c.$eval(a);
          }var c = this;a && ia.push(b);a = g(a);u();
        }, $on: function $on(a, b) {
          var c = this.$$listeners[a];
          c || (this.$$listeners[a] = c = []);c.push(b);var d = this;do {
            d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++;
          } while (d = d.$parent);var e = this;return function () {
            var d = c.indexOf(b);-1 !== d && (c[d] = null, r(e, 1, a));
          };
        }, $emit: function $emit(a, b) {
          var c = [],
              d,
              f = this,
              g = !1,
              h = { name: a, targetScope: f, stopPropagation: function stopPropagation() {
              g = !0;
            }, preventDefault: function preventDefault() {
              h.defaultPrevented = !0;
            }, defaultPrevented: !1 },
              k = $a([h], arguments, 1),
              l,
              m;do {
            d = f.$$listeners[a] || c;h.currentScope = f;l = 0;for (m = d.length; l < m; l++) {
              if (d[l]) try {
                d[l].apply(null, k);
              } catch (n) {
                e(n);
              } else d.splice(l, 1), l--, m--;
            }if (g) return h.currentScope = null, h;f = f.$parent;
          } while (f);h.currentScope = null;return h;
        }, $broadcast: function $broadcast(a, b) {
          var c = this,
              d = this,
              f = { name: a, targetScope: this, preventDefault: function preventDefault() {
              f.defaultPrevented = !0;
            }, defaultPrevented: !1 };if (!this.$$listenerCount[a]) return f;for (var g = $a([f], arguments, 1), h, k; c = d;) {
            f.currentScope = c;d = c.$$listeners[a] || [];h = 0;for (k = d.length; h < k; h++) {
              if (d[h]) try {
                d[h].apply(null, g);
              } catch (l) {
                e(l);
              } else d.splice(h, 1), h--, k--;
            }if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling)) for (; c !== this && !(d = c.$$nextSibling);) {
              c = c.$parent;
            }
          }f.currentScope = null;return f;
        } };var H = new m(),
          v = H.$$asyncQueue = [],
          t = H.$$postDigestQueue = [],
          ia = H.$$applyAsyncQueue = [],
          A = 0;return H;
    }];
  }function Ae() {
    var a = /^\s*(https?|ftp|mailto|tel|file):/,
        b = /^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist = function (b) {
      return v(b) ? (a = b, this) : a;
    };this.imgSrcSanitizationWhitelist = function (a) {
      return v(a) ? (b = a, this) : b;
    };this.$get = function () {
      return function (d, c) {
        var f = c ? b : a,
            e;e = oa(d).href;return "" === e || e.match(f) ? d : "unsafe:" + e;
      };
    };
  }function yg(a) {
    if ("self" === a) return a;if (E(a)) {
      if (-1 < a.indexOf("***")) throw Da("iwcard", a);a = Hd(a).replace(/\\\*\\\*/g, ".*").replace(/\\\*/g, "[^:/.?&;]*");return new RegExp("^" + a + "$");
    }if (Wa(a)) return new RegExp("^" + a.source + "$");throw Da("imatcher");
  }function Id(a) {
    var b = [];v(a) && q(a, function (a) {
      b.push(yg(a));
    });return b;
  }function Mf() {
    this.SCE_CONTEXTS = pa;var a = ["self"],
        b = [];this.resourceUrlWhitelist = function (b) {
      arguments.length && (a = Id(b));return a;
    };this.resourceUrlBlacklist = function (a) {
      arguments.length && (b = Id(a));return b;
    };this.$get = ["$injector", function (d) {
      function c(a, b) {
        return "self" === a ? td(b) : !!a.exec(b.href);
      }function f(a) {
        var b = function b(a) {
          this.$$unwrapTrustedValue = function () {
            return a;
          };
        };a && (b.prototype = new a());b.prototype.valueOf = function () {
          return this.$$unwrapTrustedValue();
        };b.prototype.toString = function () {
          return this.$$unwrapTrustedValue().toString();
        };return b;
      }var e = function e(a) {
        throw Da("unsafe");
      };d.has("$sanitize") && (e = d.get("$sanitize"));var g = f(),
          h = {};h[pa.HTML] = f(g);h[pa.CSS] = f(g);h[pa.URL] = f(g);h[pa.JS] = f(g);h[pa.RESOURCE_URL] = f(h[pa.URL]);return { trustAs: function trustAs(a, b) {
          var c = h.hasOwnProperty(a) ? h[a] : null;if (!c) throw Da("icontext", a, b);if (null === b || x(b) || "" === b) return b;if ("string" !== typeof b) throw Da("itype", a);return new c(b);
        }, getTrusted: function getTrusted(d, f) {
          if (null === f || x(f) || "" === f) return f;var g = h.hasOwnProperty(d) ? h[d] : null;if (g && f instanceof g) return f.$$unwrapTrustedValue();if (d === pa.RESOURCE_URL) {
            var g = oa(f.toString()),
                n,
                p,
                r = !1;n = 0;for (p = a.length; n < p; n++) {
              if (c(a[n], g)) {
                r = !0;break;
              }
            }if (r) for (n = 0, p = b.length; n < p; n++) {
              if (c(b[n], g)) {
                r = !1;break;
              }
            }if (r) return f;throw Da("insecurl", f.toString());
          }if (d === pa.HTML) return e(f);throw Da("unsafe");
        }, valueOf: function valueOf(a) {
          return a instanceof g ? a.$$unwrapTrustedValue() : a;
        } };
    }];
  }function Lf() {
    var a = !0;this.enabled = function (b) {
      arguments.length && (a = !!b);return a;
    };this.$get = ["$parse", "$sceDelegate", function (b, d) {
      if (a && 8 > Ha) throw Da("iequirks");var c = ra(pa);c.isEnabled = function () {
        return a;
      };c.trustAs = d.trustAs;c.getTrusted = d.getTrusted;c.valueOf = d.valueOf;a || (c.trustAs = c.getTrusted = function (a, b) {
        return b;
      }, c.valueOf = Xa);c.parseAs = function (a, d) {
        var e = b(d);return e.literal && e.constant ? e : b(d, function (b) {
          return c.getTrusted(a, b);
        });
      };var f = c.parseAs,
          e = c.getTrusted,
          g = c.trustAs;q(pa, function (a, b) {
        var d = P(b);c[("parse_as_" + d).replace(sc, fb)] = function (b) {
          return f(a, b);
        };c[("get_trusted_" + d).replace(sc, fb)] = function (b) {
          return e(a, b);
        };c[("trust_as_" + d).replace(sc, fb)] = function (b) {
          return g(a, b);
        };
      });return c;
    }];
  }
  function Nf() {
    this.$get = ["$window", "$document", function (a, b) {
      var d = {},
          c = !((!a.nw || !a.nw.process) && a.chrome && (a.chrome.app && a.chrome.app.runtime || !a.chrome.app && a.chrome.runtime && a.chrome.runtime.id)) && a.history && a.history.pushState,
          f = Z((/android (\d+)/.exec(P((a.navigator || {}).userAgent)) || [])[1]),
          e = /Boxee/i.test((a.navigator || {}).userAgent),
          g = b[0] || {},
          h = g.body && g.body.style,
          k = !1,
          l = !1;h && (k = !!("transition" in h || "webkitTransition" in h), l = !!("animation" in h || "webkitAnimation" in h));return { history: !(!c || 4 > f || e), hasEvent: function hasEvent(a) {
          if ("input" === a && Ha) return !1;if (x(d[a])) {
            var b = g.createElement("div");d[a] = "on" + a in b;
          }return d[a];
        }, csp: Ga(), transitions: k, animations: l, android: f };
    }];
  }function Pf() {
    var a;this.httpOptions = function (b) {
      return b ? (a = b, this) : a;
    };this.$get = ["$exceptionHandler", "$templateCache", "$http", "$q", "$sce", function (b, d, c, f, e) {
      function g(h, k) {
        g.totalPendingRequests++;if (!E(h) || x(d.get(h))) h = e.getTrustedResourceUrl(h);var l = c.defaults && c.defaults.transformResponse;C(l) ? l = l.filter(function (a) {
          return a !== jc;
        }) : l === jc && (l = null);return c.get(h, R({ cache: d, transformResponse: l }, a)).finally(function () {
          g.totalPendingRequests--;
        }).then(function (a) {
          d.put(h, a.data);return a.data;
        }, function (a) {
          k || (a = zg("tpload", h, a.status, a.statusText), b(a));return f.reject(a);
        });
      }g.totalPendingRequests = 0;return g;
    }];
  }function Qf() {
    this.$get = ["$rootScope", "$browser", "$location", function (a, b, d) {
      return { findBindings: function findBindings(a, b, d) {
          a = a.getElementsByClassName("ng-binding");var g = [];q(a, function (a) {
            var c = $.element(a).data("$binding");c && q(c, function (c) {
              d ? new RegExp("(^|\\s)" + Hd(b) + "(\\s|\\||$)").test(c) && g.push(a) : -1 !== c.indexOf(b) && g.push(a);
            });
          });return g;
        }, findModels: function findModels(a, b, d) {
          for (var g = ["ng-", "data-ng-", "ng\\:"], h = 0; h < g.length; ++h) {
            var k = a.querySelectorAll("[" + g[h] + "model" + (d ? "=" : "*=") + '"' + b + '"]');if (k.length) return k;
          }
        }, getLocation: function getLocation() {
          return d.url();
        }, setLocation: function setLocation(b) {
          b !== d.url() && (d.url(b), a.$digest());
        }, whenStable: function whenStable(a) {
          b.notifyWhenNoOutstandingRequests(a);
        } };
    }];
  }function Rf() {
    this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function (a, b, d, c, f) {
      function e(e, k, l) {
        y(e) || (l = k, k = e, e = w);var m = va.call(arguments, 3),
            n = v(l) && !l,
            p = (n ? c : d).defer(),
            r = p.promise,
            q;q = b.defer(function () {
          try {
            p.resolve(e.apply(null, m));
          } catch (b) {
            p.reject(b), f(b);
          } finally {
            delete g[r.$$timeoutId];
          }n || a.$apply();
        }, k);r.$$timeoutId = q;g[q] = p;return r;
      }var g = {};e.cancel = function (a) {
        return a && a.$$timeoutId in g ? (g[a.$$timeoutId].promise.catch(w), g[a.$$timeoutId].reject("canceled"), delete g[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)) : !1;
      };return e;
    }];
  }function oa(a) {
    Ha && (ca.setAttribute("href", a), a = ca.href);ca.setAttribute("href", a);return { href: ca.href, protocol: ca.protocol ? ca.protocol.replace(/:$/, "") : "", host: ca.host, search: ca.search ? ca.search.replace(/^\?/, "") : "", hash: ca.hash ? ca.hash.replace(/^#/, "") : "", hostname: ca.hostname, port: ca.port, pathname: "/" === ca.pathname.charAt(0) ? ca.pathname : "/" + ca.pathname };
  }function td(a) {
    a = E(a) ? oa(a) : a;return a.protocol === Jd.protocol && a.host === Jd.host;
  }function Sf() {
    this.$get = ma(z);
  }function Kd(a) {
    function b(a) {
      try {
        return decodeURIComponent(a);
      } catch (b) {
        return a;
      }
    }
    var d = a[0] || {},
        c = {},
        f = "";return function () {
      var a, g, h, k, l;try {
        a = d.cookie || "";
      } catch (m) {
        a = "";
      }if (a !== f) for (f = a, a = f.split("; "), c = {}, h = 0; h < a.length; h++) {
        g = a[h], k = g.indexOf("="), 0 < k && (l = b(g.substring(0, k)), x(c[l]) && (c[l] = b(g.substring(k + 1))));
      }return c;
    };
  }function Wf() {
    this.$get = Kd;
  }function Xc(a) {
    function b(d, c) {
      if (F(d)) {
        var f = {};q(d, function (a, c) {
          f[c] = b(c, a);
        });return f;
      }return a.factory(d + "Filter", c);
    }this.register = b;this.$get = ["$injector", function (a) {
      return function (b) {
        return a.get(b + "Filter");
      };
    }];b("currency", Ld);b("date", Md);b("filter", Ag);b("json", Bg);b("limitTo", Cg);b("lowercase", Dg);b("number", Nd);b("orderBy", Od);b("uppercase", Eg);
  }function Ag() {
    return function (a, b, d, c) {
      if (!sa(a)) {
        if (null == a) return a;throw M("filter")("notarray", a);
      }c = c || "$";var f;switch (tc(b)) {case "function":
          break;case "boolean":case "null":case "number":case "string":
          f = !0;case "object":
          b = Fg(b, d, c, f);break;default:
          return a;}return Array.prototype.filter.call(a, b);
    };
  }function Fg(a, b, d, c) {
    var f = F(a) && d in a;!0 === b ? b = qa : y(b) || (b = function b(a, _b) {
      if (x(a)) return !1;if (null === a || null === _b) return a === _b;if (F(_b) || F(a) && !Vb(a)) return !1;a = P("" + a);_b = P("" + _b);return -1 !== a.indexOf(_b);
    });return function (e) {
      return f && !F(e) ? Ea(e, a[d], b, d, !1) : Ea(e, a, b, d, c);
    };
  }function Ea(a, b, d, c, f, e) {
    var g = tc(a),
        h = tc(b);if ("string" === h && "!" === b.charAt(0)) return !Ea(a, b.substring(1), d, c, f);if (C(a)) return a.some(function (a) {
      return Ea(a, b, d, c, f);
    });switch (g) {case "object":
        var k;if (f) {
          for (k in a) {
            if ("$" !== k.charAt(0) && Ea(a[k], b, d, c, !0)) return !0;
          }return e ? !1 : Ea(a, b, d, c, !1);
        }if ("object" === h) {
          for (k in b) {
            if (e = b[k], !y(e) && !x(e) && (g = k === c, !Ea(g ? a : a[k], e, d, c, g, g))) return !1;
          }return !0;
        }return d(a, b);case "function":
        return !1;default:
        return d(a, b);}
  }function tc(a) {
    return null === a ? "null" : typeof a === "undefined" ? "undefined" : _typeof(a);
  }function Ld(a) {
    var b = a.NUMBER_FORMATS;return function (a, c, f) {
      x(c) && (c = b.CURRENCY_SYM);x(f) && (f = b.PATTERNS[1].maxFrac);return null == a ? a : Pd(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, f).replace(/\u00A4/g, c);
    };
  }function Nd(a) {
    var b = a.NUMBER_FORMATS;return function (a, c) {
      return null == a ? a : Pd(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c);
    };
  }function Gg(a) {
    var b = 0,
        d,
        c,
        f,
        e,
        g;-1 < (c = a.indexOf(Qd)) && (a = a.replace(Qd, ""));0 < (f = a.search(/e/i)) ? (0 > c && (c = f), c += +a.slice(f + 1), a = a.substring(0, f)) : 0 > c && (c = a.length);for (f = 0; a.charAt(f) === uc; f++) {}if (f === (g = a.length)) d = [0], c = 1;else {
      for (g--; a.charAt(g) === uc;) {
        g--;
      }c -= f;d = [];for (e = 0; f <= g; f++, e++) {
        d[e] = +a.charAt(f);
      }
    }c > Rd && (d = d.splice(0, Rd - 1), b = c - 1, c = 1);return { d: d, e: b, i: c };
  }function Hg(a, b, d, c) {
    var f = a.d,
        e = f.length - a.i;b = x(b) ? Math.min(Math.max(d, e), c) : +b;d = b + a.i;c = f[d];if (0 < d) {
      f.splice(Math.max(a.i, d));for (var g = d; g < f.length; g++) {
        f[g] = 0;
      }
    } else for (e = Math.max(0, e), a.i = 1, f.length = Math.max(1, d = b + 1), f[0] = 0, g = 1; g < d; g++) {
      f[g] = 0;
    }if (5 <= c) if (0 > d - 1) {
      for (c = 0; c > d; c--) {
        f.unshift(0), a.i++;
      }f.unshift(1);a.i++;
    } else f[d - 1]++;for (; e < Math.max(0, b); e++) {
      f.push(0);
    }if (b = f.reduceRight(function (a, b, c, d) {
      b += a;d[c] = b % 10;return Math.floor(b / 10);
    }, 0)) f.unshift(b), a.i++;
  }function Pd(a, b, d, c, f) {
    if (!E(a) && !Y(a) || isNaN(a)) return "";var e = !isFinite(a),
        g = !1,
        h = Math.abs(a) + "",
        k = "";if (e) k = "\u221E";else {
      g = Gg(h);Hg(g, f, b.minFrac, b.maxFrac);
      k = g.d;h = g.i;f = g.e;e = [];for (g = k.reduce(function (a, b) {
        return a && !b;
      }, !0); 0 > h;) {
        k.unshift(0), h++;
      }0 < h ? e = k.splice(h, k.length) : (e = k, k = [0]);h = [];for (k.length >= b.lgSize && h.unshift(k.splice(-b.lgSize, k.length).join("")); k.length > b.gSize;) {
        h.unshift(k.splice(-b.gSize, k.length).join(""));
      }k.length && h.unshift(k.join(""));k = h.join(d);e.length && (k += c + e.join(""));f && (k += "e+" + f);
    }return 0 > a && !g ? b.negPre + k + b.negSuf : b.posPre + k + b.posSuf;
  }function Kb(a, b, d, c) {
    var f = "";if (0 > a || c && 0 >= a) c ? a = -a + 1 : (a = -a, f = "-");for (a = "" + a; a.length < b;) {
      a = uc + a;
    }d && (a = a.substr(a.length - b));return f + a;
  }function aa(a, b, d, c, f) {
    d = d || 0;return function (e) {
      e = e["get" + a]();if (0 < d || e > -d) e += d;0 === e && -12 === d && (e = 12);return Kb(e, b, c, f);
    };
  }function mb(a, b, d) {
    return function (c, f) {
      var e = c["get" + a](),
          g = ub((d ? "STANDALONE" : "") + (b ? "SHORT" : "") + a);return f[g][e];
    };
  }function Sd(a) {
    var b = new Date(a, 0, 1).getDay();return new Date(a, 0, (4 >= b ? 5 : 12) - b);
  }function Td(a) {
    return function (b) {
      var d = Sd(b.getFullYear());b = +new Date(b.getFullYear(), b.getMonth(), b.getDate() + (4 - b.getDay())) - +d;b = 1 + Math.round(b / 6048E5);return Kb(b, a);
    };
  }function vc(a, b) {
    return 0 >= a.getFullYear() ? b.ERAS[0] : b.ERAS[1];
  }function Md(a) {
    function b(a) {
      var b;if (b = a.match(d)) {
        a = new Date(0);var e = 0,
            g = 0,
            h = b[8] ? a.setUTCFullYear : a.setFullYear,
            k = b[8] ? a.setUTCHours : a.setHours;b[9] && (e = Z(b[9] + b[10]), g = Z(b[9] + b[11]));h.call(a, Z(b[1]), Z(b[2]) - 1, Z(b[3]));e = Z(b[4] || 0) - e;g = Z(b[5] || 0) - g;h = Z(b[6] || 0);b = Math.round(1E3 * parseFloat("0." + (b[7] || 0)));k.call(a, e, g, h, b);
      }return a;
    }var d = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    return function (c, d, e) {
      var g = "",
          h = [],
          k,
          l;d = d || "mediumDate";d = a.DATETIME_FORMATS[d] || d;E(c) && (c = Ig.test(c) ? Z(c) : b(c));Y(c) && (c = new Date(c));if (!ga(c) || !isFinite(c.getTime())) return c;for (; d;) {
        (l = Jg.exec(d)) ? (h = $a(h, l, 1), d = h.pop()) : (h.push(d), d = null);
      }var m = c.getTimezoneOffset();e && (m = Jc(e, m), c = Wb(c, e, !0));q(h, function (b) {
        k = Kg[b];g += k ? k(c, a.DATETIME_FORMATS, m) : "''" === b ? "'" : b.replace(/(^'|'$)/g, "").replace(/''/g, "'");
      });return g;
    };
  }function Bg() {
    return function (a, b) {
      x(b) && (b = 2);return bb(a, b);
    };
  }function Cg() {
    return function (a, b, d) {
      b = Infinity === Math.abs(Number(b)) ? Number(b) : Z(b);if (da(b)) return a;Y(a) && (a = a.toString());if (!sa(a)) return a;d = !d || isNaN(d) ? 0 : Z(d);d = 0 > d ? Math.max(0, a.length + d) : d;return 0 <= b ? wc(a, d, d + b) : 0 === d ? wc(a, b, a.length) : wc(a, Math.max(0, d + b), d);
    };
  }function wc(a, b, d) {
    return E(a) ? a.slice(b, d) : va.call(a, b, d);
  }function Od(a) {
    function b(b) {
      return b.map(function (b) {
        var c = 1,
            d = Xa;if (y(b)) d = b;else if (E(b)) {
          if ("+" === b.charAt(0) || "-" === b.charAt(0)) c = "-" === b.charAt(0) ? -1 : 1, b = b.substring(1);if ("" !== b && (d = a(b), d.constant)) var f = d(),
              d = function d(a) {
            return a[f];
          };
        }return { get: d, descending: c };
      });
    }function d(a) {
      switch (typeof a === "undefined" ? "undefined" : _typeof(a)) {case "number":case "boolean":case "string":
          return !0;default:
          return !1;}
    }function c(a, b) {
      var c = 0,
          d = a.type,
          k = b.type;if (d === k) {
        var k = a.value,
            l = b.value;"string" === d ? (k = k.toLowerCase(), l = l.toLowerCase()) : "object" === d && (F(k) && (k = a.index), F(l) && (l = b.index));k !== l && (c = k < l ? -1 : 1);
      } else c = d < k ? -1 : 1;return c;
    }return function (a, e, g, h) {
      if (null == a) return a;if (!sa(a)) throw M("orderBy")("notarray", a);C(e) || (e = [e]);0 === e.length && (e = ["+"]);var k = b(e),
          l = g ? -1 : 1,
          m = y(h) ? h : c;a = Array.prototype.map.call(a, function (a, b) {
        return { value: a, tieBreaker: { value: b, type: "number", index: b }, predicateValues: k.map(function (c) {
            var e = c.get(a);c = typeof e === "undefined" ? "undefined" : _typeof(e);if (null === e) c = "string", e = "null";else if ("object" === c) a: {
              if (y(e.valueOf) && (e = e.valueOf(), d(e))) break a;Vb(e) && (e = e.toString(), d(e));
            }return { value: e, type: c, index: b };
          }) };
      });a.sort(function (a, b) {
        for (var c = 0, d = k.length; c < d; c++) {
          var e = m(a.predicateValues[c], b.predicateValues[c]);if (e) return e * k[c].descending * l;
        }return m(a.tieBreaker, b.tieBreaker) * l;
      });return a = a.map(function (a) {
        return a.value;
      });
    };
  }function Qa(a) {
    y(a) && (a = { link: a });a.restrict = a.restrict || "AC";return ma(a);
  }function Lb(a, b, d, c, f) {
    this.$$controls = [];this.$error = {};this.$$success = {};this.$pending = void 0;this.$name = f(b.name || b.ngForm || "")(d);this.$dirty = !1;this.$valid = this.$pristine = !0;this.$submitted = this.$invalid = !1;this.$$parentForm = Mb;this.$$element = a;this.$$animate = c;Ud(this);
  }function Ud(a) {
    a.$$classCache = {};a.$$classCache[Vd] = !(a.$$classCache[nb] = a.$$element.hasClass(nb));
  }function Wd(a) {
    function b(a, b, c) {
      c && !a.$$classCache[b] ? (a.$$animate.addClass(a.$$element, b), a.$$classCache[b] = !0) : !c && a.$$classCache[b] && (a.$$animate.removeClass(a.$$element, b), a.$$classCache[b] = !1);
    }function d(a, c, d) {
      c = c ? "-" + Nc(c, "-") : "";b(a, nb + c, !0 === d);b(a, Vd + c, !1 === d);
    }var c = a.set,
        f = a.unset;a.clazz.prototype.$setValidity = function (a, g, h) {
      x(g) ? (this.$pending || (this.$pending = {}), c(this.$pending, a, h)) : (this.$pending && f(this.$pending, a, h), Xd(this.$pending) && (this.$pending = void 0));
      Ia(g) ? g ? (f(this.$error, a, h), c(this.$$success, a, h)) : (c(this.$error, a, h), f(this.$$success, a, h)) : (f(this.$error, a, h), f(this.$$success, a, h));this.$pending ? (b(this, "ng-pending", !0), this.$valid = this.$invalid = void 0, d(this, "", null)) : (b(this, "ng-pending", !1), this.$valid = Xd(this.$error), this.$invalid = !this.$valid, d(this, "", this.$valid));g = this.$pending && this.$pending[a] ? void 0 : this.$error[a] ? !1 : this.$$success[a] ? !0 : null;d(this, a, g);this.$$parentForm.$setValidity(a, g, this);
    };
  }function Xd(a) {
    if (a) for (var b in a) {
      if (a.hasOwnProperty(b)) return !1;
    }return !0;
  }function xc(a) {
    a.$formatters.push(function (b) {
      return a.$isEmpty(b) ? b : b.toString();
    });
  }function Ra(a, b, d, c, f, e) {
    var g = P(b[0].type);if (!f.android) {
      var h = !1;b.on("compositionstart", function () {
        h = !0;
      });b.on("compositionend", function () {
        h = !1;l();
      });
    }var k,
        l = function l(a) {
      k && (e.defer.cancel(k), k = null);if (!h) {
        var f = b.val();a = a && a.type;"password" === g || d.ngTrim && "false" === d.ngTrim || (f = S(f));(c.$viewValue !== f || "" === f && c.$$hasNativeValidators) && c.$setViewValue(f, a);
      }
    };if (f.hasEvent("input")) b.on("input", l);else {
      var m = function m(a, b, c) {
        k || (k = e.defer(function () {
          k = null;b && b.value === c || l(a);
        }));
      };b.on("keydown", function (a) {
        var b = a.keyCode;91 === b || 15 < b && 19 > b || 37 <= b && 40 >= b || m(a, this, this.value);
      });if (f.hasEvent("paste")) b.on("paste cut", m);
    }b.on("change", l);if (Yd[g] && c.$$hasNativeValidators && g === d.type) b.on("keydown wheel mousedown", function (a) {
      if (!k) {
        var b = this.validity,
            c = b.badInput,
            d = b.typeMismatch;k = e.defer(function () {
          k = null;b.badInput === c && b.typeMismatch === d || l(a);
        });
      }
    });c.$render = function () {
      var a = c.$isEmpty(c.$viewValue) ? "" : c.$viewValue;b.val() !== a && b.val(a);
    };
  }function Nb(a, b) {
    return function (d, c) {
      var f, e;if (ga(d)) return d;if (E(d)) {
        '"' === d.charAt(0) && '"' === d.charAt(d.length - 1) && (d = d.substring(1, d.length - 1));if (Lg.test(d)) return new Date(d);a.lastIndex = 0;if (f = a.exec(d)) return f.shift(), e = c ? { yyyy: c.getFullYear(), MM: c.getMonth() + 1, dd: c.getDate(), HH: c.getHours(), mm: c.getMinutes(), ss: c.getSeconds(), sss: c.getMilliseconds() / 1E3 } : { yyyy: 1970, MM: 1, dd: 1, HH: 0, mm: 0, ss: 0, sss: 0 }, q(f, function (a, c) {
          c < b.length && (e[b[c]] = +a);
        }), new Date(e.yyyy, e.MM - 1, e.dd, e.HH, e.mm, e.ss || 0, 1E3 * e.sss || 0);
      }return NaN;
    };
  }function ob(a, b, d, c) {
    return function (f, e, g, h, k, l, m) {
      function n(a) {
        return a && !(a.getTime && a.getTime() !== a.getTime());
      }function p(a) {
        return v(a) && !ga(a) ? d(a) || void 0 : a;
      }yc(f, e, g, h);Ra(f, e, g, h, k, l);var r = h && h.$options.getOption("timezone"),
          q;h.$$parserName = a;h.$parsers.push(function (a) {
        if (h.$isEmpty(a)) return null;if (b.test(a)) return a = d(a, q), r && (a = Wb(a, r)), a;
      });h.$formatters.push(function (a) {
        if (a && !ga(a)) throw pb("datefmt", a);if (n(a)) return (q = a) && r && (q = Wb(q, r, !0)), m("date")(a, c, r);q = null;return "";
      });if (v(g.min) || g.ngMin) {
        var s;h.$validators.min = function (a) {
          return !n(a) || x(s) || d(a) >= s;
        };g.$observe("min", function (a) {
          s = p(a);h.$validate();
        });
      }if (v(g.max) || g.ngMax) {
        var u;h.$validators.max = function (a) {
          return !n(a) || x(u) || d(a) <= u;
        };g.$observe("max", function (a) {
          u = p(a);h.$validate();
        });
      }
    };
  }function yc(a, b, d, c) {
    (c.$$hasNativeValidators = F(b[0].validity)) && c.$parsers.push(function (a) {
      var c = b.prop("validity") || {};return c.badInput || c.typeMismatch ? void 0 : a;
    });
  }function Zd(a) {
    a.$$parserName = "number";a.$parsers.push(function (b) {
      if (a.$isEmpty(b)) return null;if (Mg.test(b)) return parseFloat(b);
    });a.$formatters.push(function (b) {
      if (!a.$isEmpty(b)) {
        if (!Y(b)) throw pb("numfmt", b);b = b.toString();
      }return b;
    });
  }function Sa(a) {
    v(a) && !Y(a) && (a = parseFloat(a));return da(a) ? void 0 : a;
  }function zc(a) {
    var b = a.toString(),
        d = b.indexOf(".");return -1 === d ? -1 < a && 1 > a && (a = /e-(\d+)$/.exec(b)) ? Number(a[1]) : 0 : b.length - d - 1;
  }function $d(a, b, d) {
    a = Number(a);var c = (a | 0) !== a,
        f = (b | 0) !== b,
        e = (d | 0) !== d;if (c || f || e) {
      var g = c ? zc(a) : 0,
          h = f ? zc(b) : 0,
          k = e ? zc(d) : 0,
          g = Math.max(g, h, k),
          g = Math.pow(10, g);a *= g;b *= g;d *= g;c && (a = Math.round(a));f && (b = Math.round(b));e && (d = Math.round(d));
    }return 0 === (a - b) % d;
  }function ae(a, b, d, c, f) {
    if (v(c)) {
      a = a(c);if (!a.constant) throw pb("constexpr", d, c);return a(b);
    }return f;
  }function Ac(a, b) {
    function d(a, b) {
      if (!a || !a.length) return [];if (!b || !b.length) return a;var c = [],
          d = 0;a: for (; d < a.length; d++) {
        for (var e = a[d], f = 0; f < b.length; f++) {
          if (e === b[f]) continue a;
        }c.push(e);
      }return c;
    }function c(a) {
      var b = a;C(a) ? b = a.map(c).join(" ") : F(a) && (b = Object.keys(a).filter(function (b) {
        return a[b];
      }).join(" "));return b;
    }function f(a) {
      var b = a;if (C(a)) b = a.map(f);else if (F(a)) {
        var c = !1,
            b = Object.keys(a).filter(function (b) {
          b = a[b];!c && x(b) && (c = !0);return b;
        });c && b.push(void 0);
      }return b;
    }a = "ngClass" + a;var e;return ["$parse", function (g) {
      return { restrict: "AC", link: function link(h, k, l) {
          function m(a, b) {
            var c = [];q(a, function (a) {
              if (0 < b || H[a]) H[a] = (H[a] || 0) + b, H[a] === +(0 < b) && c.push(a);
            });return c.join(" ");
          }function n(a) {
            if (a === b) {
              var c = t,
                  c = m(c && c.split(" "), 1);
              l.$addClass(c);
            } else c = t, c = m(c && c.split(" "), -1), l.$removeClass(c);w = a;
          }function p(a) {
            a = c(a);a !== t && r(a);
          }function r(a) {
            if (w === b) {
              var c = t && t.split(" "),
                  e = a && a.split(" "),
                  f = d(c, e),
                  c = d(e, c),
                  f = m(f, -1),
                  c = m(c, 1);l.$addClass(c);l.$removeClass(f);
            }t = a;
          }var s = l[a].trim(),
              v = ":" === s.charAt(0) && ":" === s.charAt(1),
              s = g(s, v ? f : c),
              u = v ? p : r,
              H = k.data("$classCounts"),
              w = !0,
              t;H || (H = W(), k.data("$classCounts", H));"ngClass" !== a && (e || (e = g("$index", function (a) {
            return a & 1;
          })), h.$watch(e, n));h.$watch(s, u, v);
        } };
    }];
  }function Ob(a, b, d, c, f, e, g, h, k) {
    this.$modelValue = this.$viewValue = Number.NaN;this.$$rawModelValue = void 0;this.$validators = {};this.$asyncValidators = {};this.$parsers = [];this.$formatters = [];this.$viewChangeListeners = [];this.$untouched = !0;this.$touched = !1;this.$pristine = !0;this.$dirty = !1;this.$valid = !0;this.$invalid = !1;this.$error = {};this.$$success = {};this.$pending = void 0;this.$name = k(d.name || "", !1)(a);this.$$parentForm = Mb;this.$options = Pb;this.$$parsedNgModel = f(d.ngModel);this.$$parsedNgModelAssign = this.$$parsedNgModel.assign;
    this.$$ngModelGet = this.$$parsedNgModel;this.$$ngModelSet = this.$$parsedNgModelAssign;this.$$pendingDebounce = null;this.$$parserValid = void 0;this.$$currentValidationRunId = 0;this.$$scope = a;this.$$attr = d;this.$$element = c;this.$$animate = e;this.$$timeout = g;this.$$parse = f;this.$$q = h;this.$$exceptionHandler = b;Ud(this);Ng(this);
  }function Ng(a) {
    a.$$scope.$watch(function () {
      var b = a.$$ngModelGet(a.$$scope);if (b !== a.$modelValue && (a.$modelValue === a.$modelValue || b === b)) {
        a.$modelValue = a.$$rawModelValue = b;a.$$parserValid = void 0;for (var d = a.$formatters, c = d.length, f = b; c--;) {
          f = d[c](f);
        }a.$viewValue !== f && (a.$$updateEmptyClasses(f), a.$viewValue = a.$$lastCommittedViewValue = f, a.$render(), a.$$runValidators(a.$modelValue, a.$viewValue, w));
      }return b;
    });
  }function Bc(a) {
    this.$$options = a;
  }function be(a, b) {
    q(b, function (b, c) {
      v(a[c]) || (a[c] = b);
    });
  }var Og = /^\/(.+)\/([a-z]*)$/,
      ua = Object.prototype.hasOwnProperty,
      P = function P(a) {
    return E(a) ? a.toLowerCase() : a;
  },
      ub = function ub(a) {
    return E(a) ? a.toUpperCase() : a;
  },
      Ha,
      D,
      ta,
      va = [].slice,
      og = [].splice,
      Pg = [].push,
      na = Object.prototype.toString,
      Gc = Object.getPrototypeOf,
      Fa = M("ng"),
      $ = z.angular || (z.angular = {}),
      Zb,
      qb = 0;Ha = z.document.documentMode;var da = Number.isNaN || function (a) {
    return a !== a;
  };w.$inject = [];Xa.$inject = [];var C = Array.isArray,
      me = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/,
      S = function S(a) {
    return E(a) ? a.trim() : a;
  },
      Hd = function Hd(a) {
    return a.replace(/([-()[\]{}+?*.$^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
  },
      Ga = function Ga() {
    if (!v(Ga.rules)) {
      var a = z.document.querySelector("[ng-csp]") || z.document.querySelector("[data-ng-csp]");if (a) {
        var b = a.getAttribute("ng-csp") || a.getAttribute("data-ng-csp");Ga.rules = { noUnsafeEval: !b || -1 !== b.indexOf("no-unsafe-eval"), noInlineStyle: !b || -1 !== b.indexOf("no-inline-style") };
      } else {
        a = Ga;try {
          new Function(""), b = !1;
        } catch (d) {
          b = !0;
        }a.rules = { noUnsafeEval: b, noInlineStyle: !1 };
      }
    }return Ga.rules;
  },
      rb = function rb() {
    if (v(rb.name_)) return rb.name_;var a,
        b,
        d = Ka.length,
        c,
        f;for (b = 0; b < d; ++b) {
      if (c = Ka[b], a = z.document.querySelector("[" + c.replace(":", "\\:") + "jq]")) {
        f = a.getAttribute(c + "jq");break;
      }
    }return rb.name_ = f;
  },
      oe = /:/g,
      Ka = ["ng-", "data-ng-", "ng:", "x-ng-"],
      re = function (a) {
    var b = a.currentScript,
        b = b && b.getAttribute("src");if (!b) return !0;var d = a.createElement("a");d.href = b;if (a.location.origin === d.origin) return !0;switch (d.protocol) {case "http:":case "https:":case "ftp:":case "blob:":case "file:":case "data:":
        return !0;default:
        return !1;}
  }(z.document),
      ue = /[A-Z]/g,
      Oc = !1,
      Ja = 3,
      ze = { full: "1.6.2", major: 1, minor: 6, dot: 2, codeName: "llamacorn-lovehug" };X.expando = "ng339";var hb = X.cache = {},
      ag = 1;
  X._data = function (a) {
    return this.cache[a[this.expando]] || {};
  };var Xf = /-([a-z])/g,
      Qg = /^-ms-/,
      zb = { mouseleave: "mouseout", mouseenter: "mouseover" },
      ac = M("jqLite"),
      $f = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
      $b = /<|&#?\w+;/,
      Yf = /<([\w:-]+)/,
      Zf = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      ha = { option: [1, '<select multiple="multiple">', "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };ha.optgroup = ha.option;ha.tbody = ha.tfoot = ha.colgroup = ha.caption = ha.thead;ha.th = ha.td;var fg = z.Node.prototype.contains || function (a) {
    return !!(this.compareDocumentPosition(a) & 16);
  },
      Oa = X.prototype = { ready: $c, toString: function toString() {
      var a = [];q(this, function (b) {
        a.push("" + b);
      });return "[" + a.join(", ") + "]";
    }, eq: function eq(a) {
      return 0 <= a ? D(this[a]) : D(this[this.length + a]);
    }, length: 0, push: Pg, sort: [].sort, splice: [].splice },
      Fb = {};q("multiple selected checked disabled readOnly required open".split(" "), function (a) {
    Fb[P(a)] = a;
  });var ed = {};q("input select option textarea button form details".split(" "), function (a) {
    ed[a] = !0;
  });var md = { ngMinlength: "minlength", ngMaxlength: "maxlength", ngMin: "min", ngMax: "max", ngPattern: "pattern", ngStep: "step" };q({ data: dc, removeData: gb, hasData: function hasData(a) {
      for (var b in hb[a.ng339]) {
        return !0;
      }return !1;
    }, cleanData: function cleanData(a) {
      for (var b = 0, d = a.length; b < d; b++) {
        gb(a[b]);
      }
    } }, function (a, b) {
    X[b] = a;
  });q({ data: dc, inheritedData: Db, scope: function scope(a) {
      return D.data(a, "$scope") || Db(a.parentNode || a, ["$isolateScope", "$scope"]);
    }, isolateScope: function isolateScope(a) {
      return D.data(a, "$isolateScope") || D.data(a, "$isolateScopeNoTemplate");
    }, controller: bd, injector: function injector(a) {
      return Db(a, "$injector");
    }, removeAttr: function removeAttr(a, b) {
      a.removeAttribute(b);
    }, hasClass: Ab, css: function css(a, b, d) {
      b = wb(b.replace(Qg, "ms-"));if (v(d)) a.style[b] = d;else return a.style[b];
    }, attr: function attr(a, b, d) {
      var c = a.nodeType;if (c !== Ja && 2 !== c && 8 !== c && a.getAttribute) {
        var c = P(b),
            f = Fb[c];if (v(d)) null === d || !1 === d && f ? a.removeAttribute(b) : a.setAttribute(b, f ? c : d);else return a = a.getAttribute(b), f && null !== a && (a = c), null === a ? void 0 : a;
      }
    }, prop: function prop(a, b, d) {
      if (v(d)) a[b] = d;else return a[b];
    }, text: function () {
      function a(a, d) {
        if (x(d)) {
          var c = a.nodeType;return 1 === c || c === Ja ? a.textContent : "";
        }a.textContent = d;
      }a.$dv = "";return a;
    }(), val: function val(a, b) {
      if (x(b)) {
        if (a.multiple && "select" === wa(a)) {
          var d = [];q(a.options, function (a) {
            a.selected && d.push(a.value || a.text);
          });return d;
        }return a.value;
      }a.value = b;
    }, html: function html(a, b) {
      if (x(b)) return a.innerHTML;xb(a, !0);a.innerHTML = b;
    },
    empty: cd }, function (a, b) {
    X.prototype[b] = function (b, c) {
      var f,
          e,
          g = this.length;if (a !== cd && x(2 === a.length && a !== Ab && a !== bd ? b : c)) {
        if (F(b)) {
          for (f = 0; f < g; f++) {
            if (a === dc) a(this[f], b);else for (e in b) {
              a(this[f], e, b[e]);
            }
          }return this;
        }f = a.$dv;g = x(f) ? Math.min(g, 1) : g;for (e = 0; e < g; e++) {
          var h = a(this[e], b, c);f = f ? f + h : h;
        }return f;
      }for (f = 0; f < g; f++) {
        a(this[f], b, c);
      }return this;
    };
  });q({ removeData: gb, on: function on(a, b, d, c) {
      if (v(c)) throw ac("onargs");if (Yc(a)) {
        c = yb(a, !0);var f = c.events,
            e = c.handle;e || (e = c.handle = cg(a, f));c = 0 <= b.indexOf(" ") ? b.split(" ") : [b];for (var g = c.length, h = function h(b, c, g) {
          var h = f[b];h || (h = f[b] = [], h.specialHandlerWrapper = c, "$destroy" === b || g || a.addEventListener(b, e));h.push(d);
        }; g--;) {
          b = c[g], zb[b] ? (h(zb[b], eg), h(b, void 0, !0)) : h(b);
        }
      }
    }, off: ad, one: function one(a, b, d) {
      a = D(a);a.on(b, function f() {
        a.off(b, d);a.off(b, f);
      });a.on(b, d);
    }, replaceWith: function replaceWith(a, b) {
      var d,
          c = a.parentNode;xb(a);q(new X(b), function (b) {
        d ? c.insertBefore(b, d.nextSibling) : c.replaceChild(b, a);d = b;
      });
    }, children: function children(a) {
      var b = [];q(a.childNodes, function (a) {
        1 === a.nodeType && b.push(a);
      });return b;
    }, contents: function contents(a) {
      return a.contentDocument || a.childNodes || [];
    }, append: function append(a, b) {
      var d = a.nodeType;if (1 === d || 11 === d) {
        b = new X(b);for (var d = 0, c = b.length; d < c; d++) {
          a.appendChild(b[d]);
        }
      }
    }, prepend: function prepend(a, b) {
      if (1 === a.nodeType) {
        var d = a.firstChild;q(new X(b), function (b) {
          a.insertBefore(b, d);
        });
      }
    }, wrap: function wrap(a, b) {
      var d = D(b).eq(0).clone()[0],
          c = a.parentNode;c && c.replaceChild(d, a);d.appendChild(a);
    }, remove: Eb, detach: function detach(a) {
      Eb(a, !0);
    }, after: function after(a, b) {
      var d = a,
          c = a.parentNode;
      if (c) {
        b = new X(b);for (var f = 0, e = b.length; f < e; f++) {
          var g = b[f];c.insertBefore(g, d.nextSibling);d = g;
        }
      }
    }, addClass: Cb, removeClass: Bb, toggleClass: function toggleClass(a, b, d) {
      b && q(b.split(" "), function (b) {
        var f = d;x(f) && (f = !Ab(a, b));(f ? Cb : Bb)(a, b);
      });
    }, parent: function parent(a) {
      return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
    }, next: function next(a) {
      return a.nextElementSibling;
    }, find: function find(a, b) {
      return a.getElementsByTagName ? a.getElementsByTagName(b) : [];
    }, clone: cc, triggerHandler: function triggerHandler(a, b, d) {
      var c,
          f,
          e = b.type || b,
          g = yb(a);if (g = (g = g && g.events) && g[e]) c = { preventDefault: function preventDefault() {
          this.defaultPrevented = !0;
        }, isDefaultPrevented: function isDefaultPrevented() {
          return !0 === this.defaultPrevented;
        }, stopImmediatePropagation: function stopImmediatePropagation() {
          this.immediatePropagationStopped = !0;
        }, isImmediatePropagationStopped: function isImmediatePropagationStopped() {
          return !0 === this.immediatePropagationStopped;
        }, stopPropagation: w, type: e, target: a }, b.type && (c = R(c, b)), b = ra(g), f = d ? [c].concat(d) : [c], q(b, function (b) {
        c.isImmediatePropagationStopped() || b.apply(a, f);
      });
    } }, function (a, b) {
    X.prototype[b] = function (b, c, f) {
      for (var e, g = 0, h = this.length; g < h; g++) {
        x(e) ? (e = a(this[g], b, c, f), v(e) && (e = D(e))) : bc(e, a(this[g], b, c, f));
      }return v(e) ? e : this;
    };
  });X.prototype.bind = X.prototype.on;X.prototype.unbind = X.prototype.off;var Rg = Object.create(null);fd.prototype = { _idx: function _idx(a) {
      if (a === this._lastKey) return this._lastIndex;this._lastKey = a;return this._lastIndex = this._keys.indexOf(a);
    }, _transformKey: function _transformKey(a) {
      return da(a) ? Rg : a;
    }, get: function get(a) {
      a = this._transformKey(a);a = this._idx(a);if (-1 !== a) return this._values[a];
    }, set: function set(a, b) {
      a = this._transformKey(a);var d = this._idx(a);-1 === d && (d = this._lastIndex = this._keys.length);this._keys[d] = a;this._values[d] = b;
    }, delete: function _delete(a) {
      a = this._transformKey(a);a = this._idx(a);if (-1 === a) return !1;this._keys.splice(a, 1);this._values.splice(a, 1);this._lastKey = NaN;this._lastIndex = -1;return !0;
    } };var Gb = fd,
      Vf = [function () {
    this.$get = [function () {
      return Gb;
    }];
  }],
      hg = /^([^(]+?)=>/,
      ig = /^[^(]*\(\s*([^)]*)\)/m,
      Sg = /,/,
      Tg = /^\s*(_?)(\S+?)\1\s*$/,
      gg = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
      za = M("$injector");db.$$annotate = function (a, b, d) {
    var c;if ("function" === typeof a) {
      if (!(c = a.$inject)) {
        c = [];if (a.length) {
          if (b) throw E(d) && d || (d = a.name || jg(a)), za("strictdi", d);b = gd(a);q(b[1].split(Sg), function (a) {
            a.replace(Tg, function (a, b, d) {
              c.push(d);
            });
          });
        }a.$inject = c;
      }
    } else C(a) ? (b = a.length - 1, sb(a[b], "fn"), c = a.slice(0, b)) : sb(a, "fn", !0);return c;
  };var ce = M("$animate"),
      mf = function mf() {
    this.$get = w;
  },
      nf = function nf() {
    var a = new Gb(),
        b = [];this.$get = ["$$AnimateRunner", "$rootScope", function (d, c) {
      function f(a, b, c) {
        var d = !1;b && (b = E(b) ? b.split(" ") : C(b) ? b : [], q(b, function (b) {
          b && (d = !0, a[b] = c);
        }));
        return d;
      }function e() {
        q(b, function (b) {
          var c = a.get(b);if (c) {
            var d = kg(b.attr("class")),
                e = "",
                f = "";q(c, function (a, b) {
              a !== !!d[b] && (a ? e += (e.length ? " " : "") + b : f += (f.length ? " " : "") + b);
            });q(b, function (a) {
              e && Cb(a, e);f && Bb(a, f);
            });a.delete(b);
          }
        });b.length = 0;
      }return { enabled: w, on: w, off: w, pin: w, push: function push(g, h, k, l) {
          l && l();k = k || {};k.from && g.css(k.from);k.to && g.css(k.to);if (k.addClass || k.removeClass) if (h = k.addClass, l = k.removeClass, k = a.get(g) || {}, h = f(k, h, !0), l = f(k, l, !1), h || l) a.set(g, k), b.push(g), 1 === b.length && c.$$postDigest(e);
          g = new d();g.complete();return g;
        } };
    }];
  },
      kf = ["$provide", function (a) {
    var b = this;this.$$registeredAnimations = Object.create(null);this.register = function (d, c) {
      if (d && "." !== d.charAt(0)) throw ce("notcsel", d);var f = d + "-animation";b.$$registeredAnimations[d.substr(1)] = f;a.factory(f, c);
    };this.classNameFilter = function (a) {
      if (1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null) && /(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString())) throw ce("nongcls", "ng-animate");return this.$$classNameFilter;
    };
    this.$get = ["$$animateQueue", function (a) {
      function b(a, c, d) {
        if (d) {
          var h;a: {
            for (h = 0; h < d.length; h++) {
              var k = d[h];if (1 === k.nodeType) {
                h = k;break a;
              }
            }h = void 0;
          }!h || h.parentNode || h.previousElementSibling || (d = null);
        }d ? d.after(a) : c.prepend(a);
      }return { on: a.on, off: a.off, pin: a.pin, enabled: a.enabled, cancel: function cancel(a) {
          a.end && a.end();
        }, enter: function enter(f, e, g, h) {
          e = e && D(e);g = g && D(g);e = e || g.parent();b(f, e, g);return a.push(f, "enter", ea(h));
        }, move: function move(f, e, g, h) {
          e = e && D(e);g = g && D(g);e = e || g.parent();b(f, e, g);return a.push(f, "move", ea(h));
        }, leave: function leave(b, c) {
          return a.push(b, "leave", ea(c), function () {
            b.remove();
          });
        }, addClass: function addClass(b, c, g) {
          g = ea(g);g.addClass = ib(g.addclass, c);return a.push(b, "addClass", g);
        }, removeClass: function removeClass(b, c, g) {
          g = ea(g);g.removeClass = ib(g.removeClass, c);return a.push(b, "removeClass", g);
        }, setClass: function setClass(b, c, g, h) {
          h = ea(h);h.addClass = ib(h.addClass, c);h.removeClass = ib(h.removeClass, g);return a.push(b, "setClass", h);
        }, animate: function animate(b, c, g, h, k) {
          k = ea(k);k.from = k.from ? R(k.from, c) : c;k.to = k.to ? R(k.to, g) : g;k.tempClasses = ib(k.tempClasses, h || "ng-inline-animate");return a.push(b, "animate", k);
        } };
    }];
  }],
      pf = function pf() {
    this.$get = ["$$rAF", function (a) {
      function b(b) {
        d.push(b);1 < d.length || a(function () {
          for (var a = 0; a < d.length; a++) {
            d[a]();
          }d = [];
        });
      }var d = [];return function () {
        var a = !1;b(function () {
          a = !0;
        });return function (d) {
          a ? d() : b(d);
        };
      };
    }];
  },
      of = function of() {
    this.$get = ["$q", "$sniffer", "$$animateAsyncRun", "$$isDocumentHidden", "$timeout", function (a, b, d, c, f) {
      function e(a) {
        this.setHost(a);var b = d();this._doneCallbacks = [];this._tick = function (a) {
          c() ? f(a, 0, !1) : b(a);
        };this._state = 0;
      }e.chain = function (a, b) {
        function c() {
          if (d === a.length) b(!0);else a[d](function (a) {
            !1 === a ? b(!1) : (d++, c());
          });
        }var d = 0;c();
      };e.all = function (a, b) {
        function c(f) {
          e = e && f;++d === a.length && b(e);
        }var d = 0,
            e = !0;q(a, function (a) {
          a.done(c);
        });
      };e.prototype = { setHost: function setHost(a) {
          this.host = a || {};
        }, done: function done(a) {
          2 === this._state ? a() : this._doneCallbacks.push(a);
        }, progress: w, getPromise: function getPromise() {
          if (!this.promise) {
            var b = this;this.promise = a(function (a, c) {
              b.done(function (b) {
                !1 === b ? c() : a();
              });
            });
          }return this.promise;
        },
        then: function then(a, b) {
          return this.getPromise().then(a, b);
        }, "catch": function _catch(a) {
          return this.getPromise()["catch"](a);
        }, "finally": function _finally(a) {
          return this.getPromise()["finally"](a);
        }, pause: function pause() {
          this.host.pause && this.host.pause();
        }, resume: function resume() {
          this.host.resume && this.host.resume();
        }, end: function end() {
          this.host.end && this.host.end();this._resolve(!0);
        }, cancel: function cancel() {
          this.host.cancel && this.host.cancel();this._resolve(!1);
        }, complete: function complete(a) {
          var b = this;0 === b._state && (b._state = 1, b._tick(function () {
            b._resolve(a);
          }));
        },
        _resolve: function _resolve(a) {
          2 !== this._state && (q(this._doneCallbacks, function (b) {
            b(a);
          }), this._doneCallbacks.length = 0, this._state = 2);
        } };return e;
    }];
  },
      lf = function lf() {
    this.$get = ["$$rAF", "$q", "$$AnimateRunner", function (a, b, d) {
      return function (b, f) {
        function e() {
          a(function () {
            g.addClass && (b.addClass(g.addClass), g.addClass = null);g.removeClass && (b.removeClass(g.removeClass), g.removeClass = null);g.to && (b.css(g.to), g.to = null);h || k.complete();h = !0;
          });return k;
        }var g = f || {};g.$$prepared || (g = xa(g));g.cleanupStyles && (g.from = g.to = null);g.from && (b.css(g.from), g.from = null);var h,
            k = new d();return { start: e, end: e };
      };
    }];
  },
      fa = M("$compile"),
      hc = new function () {}();Qc.$inject = ["$provide", "$$sanitizeUriProvider"];Ib.prototype.isFirstChange = function () {
    return this.previousValue === hc;
  };var hd = /^((?:x|data)[:\-_])/i,
      ng = /[:\-_]+(.)/g,
      od = M("$controller"),
      nd = /^(\S+)(\s+as\s+([\w$]+))?$/,
      wf = function wf() {
    this.$get = ["$document", function (a) {
      return function (b) {
        b ? !b.nodeType && b instanceof D && (b = b[0]) : b = a[0].body;return b.offsetWidth + 1;
      };
    }];
  },
      pd = "application/json",
      kc = { "Content-Type": pd + ";charset=utf-8" },
      qg = /^\[|^\{(?!\{)/,
      rg = { "[": /]$/, "{": /}$/ },
      pg = /^\)]\}',?\n/,
      ud = M("$http"),
      Ca = $.$interpolateMinErr = M("$interpolate");Ca.throwNoconcat = function (a) {
    throw Ca("noconcat", a);
  };Ca.interr = function (a, b) {
    return Ca("interr", a, b.toString());
  };var Ef = function Ef() {
    this.$get = ["$window", function (a) {
      function b(a) {
        var b = function b(a) {
          b.data = a;b.called = !0;
        };b.id = a;return b;
      }var d = a.angular.callbacks,
          c = {};return { createCallback: function createCallback(a) {
          a = "_" + (d.$$counter++).toString(36);var e = "angular.callbacks." + a,
              g = b(a);c[e] = d[a] = g;return e;
        }, wasCalled: function wasCalled(a) {
          return c[a].called;
        }, getResponse: function getResponse(a) {
          return c[a].data;
        }, removeCallback: function removeCallback(a) {
          delete d[c[a].id];delete c[a];
        } };
    }];
  },
      Ug = /^([^?#]*)(\?([^#]*))?(#(.*))?$/,
      tg = { http: 80, https: 443, ftp: 21 },
      kb = M("$location"),
      ug = /^\s*[\\/]{2,}/,
      Vg = { $$absUrl: "", $$html5: !1, $$replace: !1, absUrl: Jb("$$absUrl"), url: function url(a) {
      if (x(a)) return this.$$url;var b = Ug.exec(a);(b[1] || "" === a) && this.path(decodeURIComponent(b[1]));(b[2] || b[1] || "" === a) && this.search(b[3] || "");this.hash(b[5] || "");return this;
    }, protocol: Jb("$$protocol"), host: Jb("$$host"), port: Jb("$$port"), path: yd("$$path", function (a) {
      a = null !== a ? a.toString() : "";return "/" === a.charAt(0) ? a : "/" + a;
    }), search: function search(a, b) {
      switch (arguments.length) {case 0:
          return this.$$search;case 1:
          if (E(a) || Y(a)) a = a.toString(), this.$$search = Lc(a);else if (F(a)) a = xa(a, {}), q(a, function (b, c) {
            null == b && delete a[c];
          }), this.$$search = a;else throw kb("isrcharg");break;default:
          x(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b;}this.$$compose();return this;
    },
    hash: yd("$$hash", function (a) {
      return null !== a ? a.toString() : "";
    }), replace: function replace() {
      this.$$replace = !0;return this;
    } };q([xd, oc, nc], function (a) {
    a.prototype = Object.create(Vg);a.prototype.state = function (b) {
      if (!arguments.length) return this.$$state;if (a !== nc || !this.$$html5) throw kb("nostate");this.$$state = x(b) ? null : b;this.$$urlUpdatedByLocation = !0;return this;
    };
  });var Ta = M("$parse"),
      xg = {}.constructor.prototype.valueOf,
      Qb = W();q("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function (a) {
    Qb[a] = !0;
  });
  var Wg = { n: "\n", f: "\f", r: "\r", t: "\t", v: "\v", "'": "'", '"': '"' },
      qc = function qc(a) {
    this.options = a;
  };qc.prototype = { constructor: qc, lex: function lex(a) {
      this.text = a;this.index = 0;for (this.tokens = []; this.index < this.text.length;) {
        if (a = this.text.charAt(this.index), '"' === a || "'" === a) this.readString(a);else if (this.isNumber(a) || "." === a && this.isNumber(this.peek())) this.readNumber();else if (this.isIdentifierStart(this.peekMultichar())) this.readIdent();else if (this.is(a, "(){}[].,;:?")) this.tokens.push({ index: this.index, text: a }), this.index++;else if (this.isWhitespace(a)) this.index++;else {
          var b = a + this.peek(),
              d = b + this.peek(2),
              c = Qb[b],
              f = Qb[d];Qb[a] || c || f ? (a = f ? d : c ? b : a, this.tokens.push({ index: this.index, text: a, operator: !0 }), this.index += a.length) : this.throwError("Unexpected next character ", this.index, this.index + 1);
        }
      }return this.tokens;
    }, is: function is(a, b) {
      return -1 !== b.indexOf(a);
    }, peek: function peek(a) {
      a = a || 1;return this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1;
    }, isNumber: function isNumber(a) {
      return "0" <= a && "9" >= a && "string" === typeof a;
    },
    isWhitespace: function isWhitespace(a) {
      return " " === a || "\r" === a || "\t" === a || "\n" === a || "\v" === a || "\xA0" === a;
    }, isIdentifierStart: function isIdentifierStart(a) {
      return this.options.isIdentifierStart ? this.options.isIdentifierStart(a, this.codePointAt(a)) : this.isValidIdentifierStart(a);
    }, isValidIdentifierStart: function isValidIdentifierStart(a) {
      return "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "_" === a || "$" === a;
    }, isIdentifierContinue: function isIdentifierContinue(a) {
      return this.options.isIdentifierContinue ? this.options.isIdentifierContinue(a, this.codePointAt(a)) : this.isValidIdentifierContinue(a);
    },
    isValidIdentifierContinue: function isValidIdentifierContinue(a, b) {
      return this.isValidIdentifierStart(a, b) || this.isNumber(a);
    }, codePointAt: function codePointAt(a) {
      return 1 === a.length ? a.charCodeAt(0) : (a.charCodeAt(0) << 10) + a.charCodeAt(1) - 56613888;
    }, peekMultichar: function peekMultichar() {
      var a = this.text.charAt(this.index),
          b = this.peek();if (!b) return a;var d = a.charCodeAt(0),
          c = b.charCodeAt(0);return 55296 <= d && 56319 >= d && 56320 <= c && 57343 >= c ? a + b : a;
    }, isExpOperator: function isExpOperator(a) {
      return "-" === a || "+" === a || this.isNumber(a);
    }, throwError: function throwError(a, b, d) {
      d = d || this.index;b = v(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, d) + "]" : " " + d;throw Ta("lexerr", a, b, this.text);
    }, readNumber: function readNumber() {
      for (var a = "", b = this.index; this.index < this.text.length;) {
        var d = P(this.text.charAt(this.index));if ("." === d || this.isNumber(d)) a += d;else {
          var c = this.peek();if ("e" === d && this.isExpOperator(c)) a += d;else if (this.isExpOperator(d) && c && this.isNumber(c) && "e" === a.charAt(a.length - 1)) a += d;else if (!this.isExpOperator(d) || c && this.isNumber(c) || "e" !== a.charAt(a.length - 1)) break;else this.throwError("Invalid exponent");
        }this.index++;
      }this.tokens.push({ index: b,
        text: a, constant: !0, value: Number(a) });
    }, readIdent: function readIdent() {
      var a = this.index;for (this.index += this.peekMultichar().length; this.index < this.text.length;) {
        var b = this.peekMultichar();if (!this.isIdentifierContinue(b)) break;this.index += b.length;
      }this.tokens.push({ index: a, text: this.text.slice(a, this.index), identifier: !0 });
    }, readString: function readString(a) {
      var b = this.index;this.index++;for (var d = "", c = a, f = !1; this.index < this.text.length;) {
        var e = this.text.charAt(this.index),
            c = c + e;if (f) "u" === e ? (f = this.text.substring(this.index + 1, this.index + 5), f.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + f + "]"), this.index += 4, d += String.fromCharCode(parseInt(f, 16))) : d += Wg[e] || e, f = !1;else if ("\\" === e) f = !0;else {
          if (e === a) {
            this.index++;this.tokens.push({ index: b, text: c, constant: !0, value: d });return;
          }d += e;
        }this.index++;
      }this.throwError("Unterminated quote", b);
    } };var s = function s(a, b) {
    this.lexer = a;this.options = b;
  };s.Program = "Program";s.ExpressionStatement = "ExpressionStatement";s.AssignmentExpression = "AssignmentExpression";s.ConditionalExpression = "ConditionalExpression";s.LogicalExpression = "LogicalExpression";s.BinaryExpression = "BinaryExpression";s.UnaryExpression = "UnaryExpression";s.CallExpression = "CallExpression";s.MemberExpression = "MemberExpression";s.Identifier = "Identifier";s.Literal = "Literal";s.ArrayExpression = "ArrayExpression";s.Property = "Property";s.ObjectExpression = "ObjectExpression";s.ThisExpression = "ThisExpression";s.LocalsExpression = "LocalsExpression";s.NGValueParameter = "NGValueParameter";s.prototype = { ast: function ast(a) {
      this.text = a;this.tokens = this.lexer.lex(a);a = this.program();0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]);return a;
    }, program: function program() {
      for (var a = [];;) {
        if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.expressionStatement()), !this.expect(";")) return { type: s.Program, body: a };
      }
    }, expressionStatement: function expressionStatement() {
      return { type: s.ExpressionStatement, expression: this.filterChain() };
    }, filterChain: function filterChain() {
      for (var a = this.expression(); this.expect("|");) {
        a = this.filter(a);
      }return a;
    },
    expression: function expression() {
      return this.assignment();
    }, assignment: function assignment() {
      var a = this.ternary();if (this.expect("=")) {
        if (!Bd(a)) throw Ta("lval");a = { type: s.AssignmentExpression, left: a, right: this.assignment(), operator: "=" };
      }return a;
    }, ternary: function ternary() {
      var a = this.logicalOR(),
          b,
          d;return this.expect("?") && (b = this.expression(), this.consume(":")) ? (d = this.expression(), { type: s.ConditionalExpression, test: a, alternate: b, consequent: d }) : a;
    }, logicalOR: function logicalOR() {
      for (var a = this.logicalAND(); this.expect("||");) {
        a = { type: s.LogicalExpression,
          operator: "||", left: a, right: this.logicalAND() };
      }return a;
    }, logicalAND: function logicalAND() {
      for (var a = this.equality(); this.expect("&&");) {
        a = { type: s.LogicalExpression, operator: "&&", left: a, right: this.equality() };
      }return a;
    }, equality: function equality() {
      for (var a = this.relational(), b; b = this.expect("==", "!=", "===", "!==");) {
        a = { type: s.BinaryExpression, operator: b.text, left: a, right: this.relational() };
      }return a;
    }, relational: function relational() {
      for (var a = this.additive(), b; b = this.expect("<", ">", "<=", ">=");) {
        a = { type: s.BinaryExpression, operator: b.text,
          left: a, right: this.additive() };
      }return a;
    }, additive: function additive() {
      for (var a = this.multiplicative(), b; b = this.expect("+", "-");) {
        a = { type: s.BinaryExpression, operator: b.text, left: a, right: this.multiplicative() };
      }return a;
    }, multiplicative: function multiplicative() {
      for (var a = this.unary(), b; b = this.expect("*", "/", "%");) {
        a = { type: s.BinaryExpression, operator: b.text, left: a, right: this.unary() };
      }return a;
    }, unary: function unary() {
      var a;return (a = this.expect("+", "-", "!")) ? { type: s.UnaryExpression, operator: a.text, prefix: !0, argument: this.unary() } : this.primary();
    },
    primary: function primary() {
      var a;this.expect("(") ? (a = this.filterChain(), this.consume(")")) : this.expect("[") ? a = this.arrayDeclaration() : this.expect("{") ? a = this.object() : this.selfReferential.hasOwnProperty(this.peek().text) ? a = xa(this.selfReferential[this.consume().text]) : this.options.literals.hasOwnProperty(this.peek().text) ? a = { type: s.Literal, value: this.options.literals[this.consume().text] } : this.peek().identifier ? a = this.identifier() : this.peek().constant ? a = this.constant() : this.throwError("not a primary expression", this.peek());for (var b; b = this.expect("(", "[", ".");) {
        "(" === b.text ? (a = { type: s.CallExpression, callee: a, arguments: this.parseArguments() }, this.consume(")")) : "[" === b.text ? (a = { type: s.MemberExpression, object: a, property: this.expression(), computed: !0 }, this.consume("]")) : "." === b.text ? a = { type: s.MemberExpression, object: a, property: this.identifier(), computed: !1 } : this.throwError("IMPOSSIBLE");
      }return a;
    }, filter: function filter(a) {
      a = [a];for (var b = { type: s.CallExpression, callee: this.identifier(), arguments: a, filter: !0 }; this.expect(":");) {
        a.push(this.expression());
      }return b;
    }, parseArguments: function parseArguments() {
      var a = [];if (")" !== this.peekToken().text) {
        do {
          a.push(this.filterChain());
        } while (this.expect(","));
      }return a;
    }, identifier: function identifier() {
      var a = this.consume();a.identifier || this.throwError("is not a valid identifier", a);return { type: s.Identifier, name: a.text };
    }, constant: function constant() {
      return { type: s.Literal, value: this.consume().value };
    }, arrayDeclaration: function arrayDeclaration() {
      var a = [];if ("]" !== this.peekToken().text) {
        do {
          if (this.peek("]")) break;a.push(this.expression());
        } while (this.expect(","));
      }this.consume("]");
      return { type: s.ArrayExpression, elements: a };
    }, object: function object() {
      var a = [],
          b;if ("}" !== this.peekToken().text) {
        do {
          if (this.peek("}")) break;b = { type: s.Property, kind: "init" };this.peek().constant ? (b.key = this.constant(), b.computed = !1, this.consume(":"), b.value = this.expression()) : this.peek().identifier ? (b.key = this.identifier(), b.computed = !1, this.peek(":") ? (this.consume(":"), b.value = this.expression()) : b.value = b.key) : this.peek("[") ? (this.consume("["), b.key = this.expression(), this.consume("]"), b.computed = !0, this.consume(":"), b.value = this.expression()) : this.throwError("invalid key", this.peek());a.push(b);
        } while (this.expect(","));
      }this.consume("}");return { type: s.ObjectExpression, properties: a };
    }, throwError: function throwError(a, b) {
      throw Ta("syntax", b.text, a, b.index + 1, this.text, this.text.substring(b.index));
    }, consume: function consume(a) {
      if (0 === this.tokens.length) throw Ta("ueoe", this.text);var b = this.expect(a);b || this.throwError("is unexpected, expecting [" + a + "]", this.peek());return b;
    }, peekToken: function peekToken() {
      if (0 === this.tokens.length) throw Ta("ueoe", this.text);return this.tokens[0];
    }, peek: function peek(a, b, d, c) {
      return this.peekAhead(0, a, b, d, c);
    }, peekAhead: function peekAhead(a, b, d, c, f) {
      if (this.tokens.length > a) {
        a = this.tokens[a];var e = a.text;if (e === b || e === d || e === c || e === f || !(b || d || c || f)) return a;
      }return !1;
    }, expect: function expect(a, b, d, c) {
      return (a = this.peek(a, b, d, c)) ? (this.tokens.shift(), a) : !1;
    }, selfReferential: { "this": { type: s.ThisExpression }, $locals: { type: s.LocalsExpression } } };Ed.prototype = { compile: function compile(a) {
      var b = this;a = this.astBuilder.ast(a);this.state = { nextId: 0, filters: {},
        fn: { vars: [], body: [], own: {} }, assign: { vars: [], body: [], own: {} }, inputs: [] };U(a, b.$filter);var d = "",
          c;this.stage = "assign";if (c = Cd(a)) this.state.computing = "assign", d = this.nextId(), this.recurse(c, d), this.return_(d), d = "fn.assign=" + this.generateFunction("assign", "s,v,l");c = Ad(a.body);b.stage = "inputs";q(c, function (a, c) {
        var d = "fn" + c;b.state[d] = { vars: [], body: [], own: {} };b.state.computing = d;var h = b.nextId();b.recurse(a, h);b.return_(h);b.state.inputs.push(d);a.watchId = c;
      });this.state.computing = "fn";this.stage = "main";
      this.recurse(a);d = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + d + this.watchFns() + "return fn;";d = new Function("$filter", "getStringValue", "ifDefined", "plus", d)(this.$filter, vg, wg, zd);this.state = this.stage = void 0;d.literal = Dd(a);d.constant = a.constant;return d;
    }, USE: "use", STRICT: "strict", watchFns: function watchFns() {
      var a = [],
          b = this.state.inputs,
          d = this;q(b, function (b) {
        a.push("var " + b + "=" + d.generateFunction(b, "s"));
      });b.length && a.push("fn.inputs=[" + b.join(",") + "];");return a.join("");
    }, generateFunction: function generateFunction(a, b) {
      return "function(" + b + "){" + this.varsPrefix(a) + this.body(a) + "};";
    }, filterPrefix: function filterPrefix() {
      var a = [],
          b = this;q(this.state.filters, function (d, c) {
        a.push(d + "=$filter(" + b.escape(c) + ")");
      });return a.length ? "var " + a.join(",") + ";" : "";
    }, varsPrefix: function varsPrefix(a) {
      return this.state[a].vars.length ? "var " + this.state[a].vars.join(",") + ";" : "";
    }, body: function body(a) {
      return this.state[a].body.join("");
    }, recurse: function recurse(a, b, d, c, f, e) {
      var g,
          h,
          k = this,
          l,
          m,
          n;c = c || w;if (!e && v(a.watchId)) b = b || this.nextId(), this.if_("i", this.lazyAssign(b, this.computedMember("i", a.watchId)), this.lazyRecurse(a, b, d, c, f, !0));else switch (a.type) {case s.Program:
          q(a.body, function (b, c) {
            k.recurse(b.expression, void 0, void 0, function (a) {
              h = a;
            });c !== a.body.length - 1 ? k.current().body.push(h, ";") : k.return_(h);
          });break;case s.Literal:
          m = this.escape(a.value);this.assign(b, m);c(b || m);break;case s.UnaryExpression:
          this.recurse(a.argument, void 0, void 0, function (a) {
            h = a;
          });m = a.operator + "(" + this.ifDefined(h, 0) + ")";this.assign(b, m);c(m);break;case s.BinaryExpression:
          this.recurse(a.left, void 0, void 0, function (a) {
            g = a;
          });this.recurse(a.right, void 0, void 0, function (a) {
            h = a;
          });m = "+" === a.operator ? this.plus(g, h) : "-" === a.operator ? this.ifDefined(g, 0) + a.operator + this.ifDefined(h, 0) : "(" + g + ")" + a.operator + "(" + h + ")";this.assign(b, m);c(m);break;case s.LogicalExpression:
          b = b || this.nextId();k.recurse(a.left, b);k.if_("&&" === a.operator ? b : k.not(b), k.lazyRecurse(a.right, b));c(b);break;case s.ConditionalExpression:
          b = b || this.nextId();k.recurse(a.test, b);k.if_(b, k.lazyRecurse(a.alternate, b), k.lazyRecurse(a.consequent, b));c(b);break;case s.Identifier:
          b = b || this.nextId();d && (d.context = "inputs" === k.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", a.name) + "?l:s"), d.computed = !1, d.name = a.name);k.if_("inputs" === k.stage || k.not(k.getHasOwnProperty("l", a.name)), function () {
            k.if_("inputs" === k.stage || "s", function () {
              f && 1 !== f && k.if_(k.isNull(k.nonComputedMember("s", a.name)), k.lazyAssign(k.nonComputedMember("s", a.name), "{}"));k.assign(b, k.nonComputedMember("s", a.name));
            });
          }, b && k.lazyAssign(b, k.nonComputedMember("l", a.name)));c(b);break;case s.MemberExpression:
          g = d && (d.context = this.nextId()) || this.nextId();b = b || this.nextId();k.recurse(a.object, g, void 0, function () {
            k.if_(k.notNull(g), function () {
              a.computed ? (h = k.nextId(), k.recurse(a.property, h), k.getStringValue(h), f && 1 !== f && k.if_(k.not(k.computedMember(g, h)), k.lazyAssign(k.computedMember(g, h), "{}")), m = k.computedMember(g, h), k.assign(b, m), d && (d.computed = !0, d.name = h)) : (f && 1 !== f && k.if_(k.isNull(k.nonComputedMember(g, a.property.name)), k.lazyAssign(k.nonComputedMember(g, a.property.name), "{}")), m = k.nonComputedMember(g, a.property.name), k.assign(b, m), d && (d.computed = !1, d.name = a.property.name));
            }, function () {
              k.assign(b, "undefined");
            });c(b);
          }, !!f);break;case s.CallExpression:
          b = b || this.nextId();a.filter ? (h = k.filter(a.callee.name), l = [], q(a.arguments, function (a) {
            var b = k.nextId();k.recurse(a, b);l.push(b);
          }), m = h + "(" + l.join(",") + ")", k.assign(b, m), c(b)) : (h = k.nextId(), g = {}, l = [], k.recurse(a.callee, h, g, function () {
            k.if_(k.notNull(h), function () {
              q(a.arguments, function (b) {
                k.recurse(b, a.constant ? void 0 : k.nextId(), void 0, function (a) {
                  l.push(a);
                });
              });m = g.name ? k.member(g.context, g.name, g.computed) + "(" + l.join(",") + ")" : h + "(" + l.join(",") + ")";k.assign(b, m);
            }, function () {
              k.assign(b, "undefined");
            });c(b);
          }));break;case s.AssignmentExpression:
          h = this.nextId();g = {};this.recurse(a.left, void 0, g, function () {
            k.if_(k.notNull(g.context), function () {
              k.recurse(a.right, h);m = k.member(g.context, g.name, g.computed) + a.operator + h;k.assign(b, m);c(b || m);
            });
          }, 1);break;
        case s.ArrayExpression:
          l = [];q(a.elements, function (b) {
            k.recurse(b, a.constant ? void 0 : k.nextId(), void 0, function (a) {
              l.push(a);
            });
          });m = "[" + l.join(",") + "]";this.assign(b, m);c(b || m);break;case s.ObjectExpression:
          l = [];n = !1;q(a.properties, function (a) {
            a.computed && (n = !0);
          });n ? (b = b || this.nextId(), this.assign(b, "{}"), q(a.properties, function (a) {
            a.computed ? (g = k.nextId(), k.recurse(a.key, g)) : g = a.key.type === s.Identifier ? a.key.name : "" + a.key.value;h = k.nextId();k.recurse(a.value, h);k.assign(k.member(b, g, a.computed), h);
          })) : (q(a.properties, function (b) {
            k.recurse(b.value, a.constant ? void 0 : k.nextId(), void 0, function (a) {
              l.push(k.escape(b.key.type === s.Identifier ? b.key.name : "" + b.key.value) + ":" + a);
            });
          }), m = "{" + l.join(",") + "}", this.assign(b, m));c(b || m);break;case s.ThisExpression:
          this.assign(b, "s");c(b || "s");break;case s.LocalsExpression:
          this.assign(b, "l");c(b || "l");break;case s.NGValueParameter:
          this.assign(b, "v"), c(b || "v");}
    }, getHasOwnProperty: function getHasOwnProperty(a, b) {
      var d = a + "." + b,
          c = this.current().own;c.hasOwnProperty(d) || (c[d] = this.nextId(!1, a + "&&(" + this.escape(b) + " in " + a + ")"));return c[d];
    }, assign: function assign(a, b) {
      if (a) return this.current().body.push(a, "=", b, ";"), a;
    }, filter: function filter(a) {
      this.state.filters.hasOwnProperty(a) || (this.state.filters[a] = this.nextId(!0));return this.state.filters[a];
    }, ifDefined: function ifDefined(a, b) {
      return "ifDefined(" + a + "," + this.escape(b) + ")";
    }, plus: function plus(a, b) {
      return "plus(" + a + "," + b + ")";
    }, return_: function return_(a) {
      this.current().body.push("return ", a, ";");
    }, if_: function if_(a, b, d) {
      if (!0 === a) b();else {
        var c = this.current().body;c.push("if(", a, "){");b();c.push("}");d && (c.push("else{"), d(), c.push("}"));
      }
    }, not: function not(a) {
      return "!(" + a + ")";
    }, isNull: function isNull(a) {
      return a + "==null";
    }, notNull: function notNull(a) {
      return a + "!=null";
    }, nonComputedMember: function nonComputedMember(a, b) {
      var d = /[^$_a-zA-Z0-9]/g;return (/^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(b) ? a + "." + b : a + '["' + b.replace(d, this.stringEscapeFn) + '"]'
      );
    }, computedMember: function computedMember(a, b) {
      return a + "[" + b + "]";
    }, member: function member(a, b, d) {
      return d ? this.computedMember(a, b) : this.nonComputedMember(a, b);
    }, getStringValue: function getStringValue(a) {
      this.assign(a, "getStringValue(" + a + ")");
    }, lazyRecurse: function lazyRecurse(a, b, d, c, f, e) {
      var g = this;return function () {
        g.recurse(a, b, d, c, f, e);
      };
    }, lazyAssign: function lazyAssign(a, b) {
      var d = this;return function () {
        d.assign(a, b);
      };
    }, stringEscapeRegex: /[^ a-zA-Z0-9]/g, stringEscapeFn: function stringEscapeFn(a) {
      return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
    }, escape: function escape(a) {
      if (E(a)) return "'" + a.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";if (Y(a)) return a.toString();if (!0 === a) return "true";if (!1 === a) return "false";if (null === a) return "null";
      if ("undefined" === typeof a) return "undefined";throw Ta("esc");
    }, nextId: function nextId(a, b) {
      var d = "v" + this.state.nextId++;a || this.current().vars.push(d + (b ? "=" + b : ""));return d;
    }, current: function current() {
      return this.state[this.state.computing];
    } };Fd.prototype = { compile: function compile(a) {
      var b = this;a = this.astBuilder.ast(a);U(a, b.$filter);var d, c;if (d = Cd(a)) c = this.recurse(d);d = Ad(a.body);var f;d && (f = [], q(d, function (a, c) {
        var d = b.recurse(a);a.input = d;f.push(d);a.watchId = c;
      }));var e = [];q(a.body, function (a) {
        e.push(b.recurse(a.expression));
      });
      d = 0 === a.body.length ? w : 1 === a.body.length ? e[0] : function (a, b) {
        var c;q(e, function (d) {
          c = d(a, b);
        });return c;
      };c && (d.assign = function (a, b, d) {
        return c(a, d, b);
      });f && (d.inputs = f);d.literal = Dd(a);d.constant = a.constant;return d;
    }, recurse: function recurse(a, b, d) {
      var c,
          f,
          e = this,
          g;if (a.input) return this.inputs(a.input, a.watchId);switch (a.type) {case s.Literal:
          return this.value(a.value, b);case s.UnaryExpression:
          return f = this.recurse(a.argument), this["unary" + a.operator](f, b);case s.BinaryExpression:
          return c = this.recurse(a.left), f = this.recurse(a.right), this["binary" + a.operator](c, f, b);case s.LogicalExpression:
          return c = this.recurse(a.left), f = this.recurse(a.right), this["binary" + a.operator](c, f, b);case s.ConditionalExpression:
          return this["ternary?:"](this.recurse(a.test), this.recurse(a.alternate), this.recurse(a.consequent), b);case s.Identifier:
          return e.identifier(a.name, b, d);case s.MemberExpression:
          return c = this.recurse(a.object, !1, !!d), a.computed || (f = a.property.name), a.computed && (f = this.recurse(a.property)), a.computed ? this.computedMember(c, f, b, d) : this.nonComputedMember(c, f, b, d);case s.CallExpression:
          return g = [], q(a.arguments, function (a) {
            g.push(e.recurse(a));
          }), a.filter && (f = this.$filter(a.callee.name)), a.filter || (f = this.recurse(a.callee, !0)), a.filter ? function (a, c, d, e) {
            for (var n = [], p = 0; p < g.length; ++p) {
              n.push(g[p](a, c, d, e));
            }a = f.apply(void 0, n, e);return b ? { context: void 0, name: void 0, value: a } : a;
          } : function (a, c, d, e) {
            var n = f(a, c, d, e),
                p;if (null != n.value) {
              p = [];for (var r = 0; r < g.length; ++r) {
                p.push(g[r](a, c, d, e));
              }p = n.value.apply(n.context, p);
            }return b ? { value: p } : p;
          };case s.AssignmentExpression:
          return c = this.recurse(a.left, !0, 1), f = this.recurse(a.right), function (a, d, e, g) {
            var n = c(a, d, e, g);a = f(a, d, e, g);n.context[n.name] = a;return b ? { value: a } : a;
          };case s.ArrayExpression:
          return g = [], q(a.elements, function (a) {
            g.push(e.recurse(a));
          }), function (a, c, d, e) {
            for (var f = [], p = 0; p < g.length; ++p) {
              f.push(g[p](a, c, d, e));
            }return b ? { value: f } : f;
          };case s.ObjectExpression:
          return g = [], q(a.properties, function (a) {
            a.computed ? g.push({ key: e.recurse(a.key), computed: !0, value: e.recurse(a.value) }) : g.push({ key: a.key.type === s.Identifier ? a.key.name : "" + a.key.value, computed: !1, value: e.recurse(a.value) });
          }), function (a, c, d, e) {
            for (var f = {}, p = 0; p < g.length; ++p) {
              g[p].computed ? f[g[p].key(a, c, d, e)] = g[p].value(a, c, d, e) : f[g[p].key] = g[p].value(a, c, d, e);
            }return b ? { value: f } : f;
          };case s.ThisExpression:
          return function (a) {
            return b ? { value: a } : a;
          };case s.LocalsExpression:
          return function (a, c) {
            return b ? { value: c } : c;
          };case s.NGValueParameter:
          return function (a, c, d) {
            return b ? { value: d } : d;
          };}
    }, "unary+": function unary(a, b) {
      return function (d, c, f, e) {
        d = a(d, c, f, e);d = v(d) ? +d : 0;return b ? { value: d } : d;
      };
    }, "unary-": function unary(a, b) {
      return function (d, c, f, e) {
        d = a(d, c, f, e);d = v(d) ? -d : -0;return b ? { value: d } : d;
      };
    }, "unary!": function unary(a, b) {
      return function (d, c, f, e) {
        d = !a(d, c, f, e);return b ? { value: d } : d;
      };
    }, "binary+": function binary(a, b, d) {
      return function (c, f, e, g) {
        var h = a(c, f, e, g);c = b(c, f, e, g);h = zd(h, c);return d ? { value: h } : h;
      };
    }, "binary-": function binary(a, b, d) {
      return function (c, f, e, g) {
        var h = a(c, f, e, g);c = b(c, f, e, g);h = (v(h) ? h : 0) - (v(c) ? c : 0);return d ? { value: h } : h;
      };
    }, "binary*": function binary(a, b, d) {
      return function (c, f, e, g) {
        c = a(c, f, e, g) * b(c, f, e, g);return d ? { value: c } : c;
      };
    }, "binary/": function binary(a, b, d) {
      return function (c, f, e, g) {
        c = a(c, f, e, g) / b(c, f, e, g);return d ? { value: c } : c;
      };
    }, "binary%": function binary(a, b, d) {
      return function (c, f, e, g) {
        c = a(c, f, e, g) % b(c, f, e, g);return d ? { value: c } : c;
      };
    }, "binary===": function binary(a, b, d) {
      return function (c, f, e, g) {
        c = a(c, f, e, g) === b(c, f, e, g);return d ? { value: c } : c;
      };
    }, "binary!==": function binary(a, b, d) {
      return function (c, f, e, g) {
        c = a(c, f, e, g) !== b(c, f, e, g);return d ? { value: c } : c;
      };
    }, "binary==": function binary(a, b, d) {
      return function (c, f, e, g) {
        c = a(c, f, e, g) == b(c, f, e, g);return d ? { value: c } : c;
      };
    }, "binary!=": function binary(a, b, d) {
      return function (c, f, e, g) {
        c = a(c, f, e, g) != b(c, f, e, g);return d ? { value: c } : c;
      };
    }, "binary<": function binary(a, b, d) {
      return function (c, f, e, g) {
        c = a(c, f, e, g) < b(c, f, e, g);return d ? { value: c } : c;
      };
    }, "binary>": function binary(a, b, d) {
      return function (c, f, e, g) {
        c = a(c, f, e, g) > b(c, f, e, g);return d ? { value: c } : c;
      };
    }, "binary<=": function binary(a, b, d) {
      return function (c, f, e, g) {
        c = a(c, f, e, g) <= b(c, f, e, g);return d ? { value: c } : c;
      };
    }, "binary>=": function binary(a, b, d) {
      return function (c, f, e, g) {
        c = a(c, f, e, g) >= b(c, f, e, g);return d ? { value: c } : c;
      };
    }, "binary&&": function binary(a, b, d) {
      return function (c, f, e, g) {
        c = a(c, f, e, g) && b(c, f, e, g);return d ? { value: c } : c;
      };
    }, "binary||": function binary(a, b, d) {
      return function (c, f, e, g) {
        c = a(c, f, e, g) || b(c, f, e, g);return d ? { value: c } : c;
      };
    }, "ternary?:": function ternary(a, b, d, c) {
      return function (f, e, g, h) {
        f = a(f, e, g, h) ? b(f, e, g, h) : d(f, e, g, h);return c ? { value: f } : f;
      };
    }, value: function value(a, b) {
      return function () {
        return b ? { context: void 0, name: void 0, value: a } : a;
      };
    }, identifier: function identifier(a, b, d) {
      return function (c, f, e, g) {
        c = f && a in f ? f : c;d && 1 !== d && c && null == c[a] && (c[a] = {});f = c ? c[a] : void 0;return b ? { context: c, name: a, value: f } : f;
      };
    }, computedMember: function computedMember(a, b, d, c) {
      return function (f, e, g, h) {
        var k = a(f, e, g, h),
            l,
            m;null != k && (l = b(f, e, g, h), l += "", c && 1 !== c && k && !k[l] && (k[l] = {}), m = k[l]);return d ? { context: k, name: l, value: m } : m;
      };
    }, nonComputedMember: function nonComputedMember(a, b, d, c) {
      return function (f, e, g, h) {
        f = a(f, e, g, h);c && 1 !== c && f && null == f[b] && (f[b] = {});e = null != f ? f[b] : void 0;return d ? { context: f, name: b, value: e } : e;
      };
    }, inputs: function inputs(a, b) {
      return function (d, c, f, e) {
        return e ? e[b] : a(d, c, f);
      };
    } };var rc = function rc(a, b, d) {
    this.lexer = a;this.$filter = b;this.options = d;this.ast = new s(a, d);this.astCompiler = d.csp ? new Fd(this.ast, b) : new Ed(this.ast, b);
  };rc.prototype = { constructor: rc, parse: function parse(a) {
      return this.astCompiler.compile(a);
    } };var Da = M("$sce"),
      pa = { HTML: "html", CSS: "css", URL: "url", RESOURCE_URL: "resourceUrl", JS: "js" },
      sc = /_([a-z])/g,
      zg = M("$compile"),
      ca = z.document.createElement("a"),
      Jd = oa(z.location.href);Kd.$inject = ["$document"];Xc.$inject = ["$provide"];var Rd = 22,
      Qd = ".",
      uc = "0";Ld.$inject = ["$locale"];Nd.$inject = ["$locale"];var Kg = { yyyy: aa("FullYear", 4, 0, !1, !0), yy: aa("FullYear", 2, 0, !0, !0), y: aa("FullYear", 1, 0, !1, !0), MMMM: mb("Month"), MMM: mb("Month", !0), MM: aa("Month", 2, 1), M: aa("Month", 1, 1), LLLL: mb("Month", !1, !0), dd: aa("Date", 2), d: aa("Date", 1), HH: aa("Hours", 2), H: aa("Hours", 1), hh: aa("Hours", 2, -12), h: aa("Hours", 1, -12), mm: aa("Minutes", 2), m: aa("Minutes", 1), ss: aa("Seconds", 2), s: aa("Seconds", 1), sss: aa("Milliseconds", 3), EEEE: mb("Day"), EEE: mb("Day", !0), a: function a(_a, b) {
      return 12 > _a.getHours() ? b.AMPMS[0] : b.AMPMS[1];
    }, Z: function Z(a, b, d) {
      a = -1 * d;return a = (0 <= a ? "+" : "") + (Kb(Math[0 < a ? "floor" : "ceil"](a / 60), 2) + Kb(Math.abs(a % 60), 2));
    }, ww: Td(2), w: Td(1), G: vc, GG: vc, GGG: vc, GGGG: function GGGG(a, b) {
      return 0 >= a.getFullYear() ? b.ERANAMES[0] : b.ERANAMES[1];
    } },
      Jg = /((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
      Ig = /^-?\d+$/;Md.$inject = ["$locale"];var Dg = ma(P),
      Eg = ma(ub);Od.$inject = ["$parse"];var Be = ma({ restrict: "E", compile: function compile(a, b) {
      if (!b.href && !b.xlinkHref) return function (a, b) {
        if ("a" === b[0].nodeName.toLowerCase()) {
          var f = "[object SVGAnimatedString]" === na.call(b.prop("href")) ? "xlink:href" : "href";b.on("click", function (a) {
            b.attr(f) || a.preventDefault();
          });
        }
      };
    } }),
      vb = {};q(Fb, function (a, b) {
    function d(a, d, f) {
      a.$watch(f[c], function (a) {
        f.$set(b, !!a);
      });
    }if ("multiple" !== a) {
      var c = Ba("ng-" + b),
          f = d;"checked" === a && (f = function f(a, b, _f) {
        _f.ngModel !== _f[c] && d(a, b, _f);
      });vb[c] = function () {
        return { restrict: "A", priority: 100, link: f };
      };
    }
  });q(md, function (a, b) {
    vb[b] = function () {
      return { priority: 100, link: function link(a, c, f) {
          if ("ngPattern" === b && "/" === f.ngPattern.charAt(0) && (c = f.ngPattern.match(Og))) {
            f.$set("ngPattern", new RegExp(c[1], c[2]));return;
          }a.$watch(f[b], function (a) {
            f.$set(b, a);
          });
        } };
    };
  });q(["src", "srcset", "href"], function (a) {
    var b = Ba("ng-" + a);vb[b] = function () {
      return { priority: 99, link: function link(d, c, f) {
          var e = a,
              g = a;"href" === a && "[object SVGAnimatedString]" === na.call(c.prop("href")) && (g = "xlinkHref", f.$attr[g] = "xlink:href", e = null);f.$observe(b, function (b) {
            b ? (f.$set(g, b), Ha && e && c.prop(e, f[g])) : "href" === a && f.$set(g, null);
          });
        } };
    };
  });
  var Mb = { $addControl: w, $$renameControl: function $$renameControl(a, b) {
      a.$name = b;
    }, $removeControl: w, $setValidity: w, $setDirty: w, $setPristine: w, $setSubmitted: w };Lb.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];Lb.prototype = { $rollbackViewValue: function $rollbackViewValue() {
      q(this.$$controls, function (a) {
        a.$rollbackViewValue();
      });
    }, $commitViewValue: function $commitViewValue() {
      q(this.$$controls, function (a) {
        a.$commitViewValue();
      });
    }, $addControl: function $addControl(a) {
      La(a.$name, "input");this.$$controls.push(a);a.$name && (this[a.$name] = a);a.$$parentForm = this;
    },
    $$renameControl: function $$renameControl(a, b) {
      var d = a.$name;this[d] === a && delete this[d];this[b] = a;a.$name = b;
    }, $removeControl: function $removeControl(a) {
      a.$name && this[a.$name] === a && delete this[a.$name];q(this.$pending, function (b, d) {
        this.$setValidity(d, null, a);
      }, this);q(this.$error, function (b, d) {
        this.$setValidity(d, null, a);
      }, this);q(this.$$success, function (b, d) {
        this.$setValidity(d, null, a);
      }, this);Za(this.$$controls, a);a.$$parentForm = Mb;
    }, $setDirty: function $setDirty() {
      this.$$animate.removeClass(this.$$element, Ua);this.$$animate.addClass(this.$$element, Rb);this.$dirty = !0;this.$pristine = !1;this.$$parentForm.$setDirty();
    }, $setPristine: function $setPristine() {
      this.$$animate.setClass(this.$$element, Ua, Rb + " ng-submitted");this.$dirty = !1;this.$pristine = !0;this.$submitted = !1;q(this.$$controls, function (a) {
        a.$setPristine();
      });
    }, $setUntouched: function $setUntouched() {
      q(this.$$controls, function (a) {
        a.$setUntouched();
      });
    }, $setSubmitted: function $setSubmitted() {
      this.$$animate.addClass(this.$$element, "ng-submitted");this.$submitted = !0;this.$$parentForm.$setSubmitted();
    } };Wd({ clazz: Lb, set: function set(a, b, d) {
      var c = a[b];c ? -1 === c.indexOf(d) && c.push(d) : a[b] = [d];
    }, unset: function unset(a, b, d) {
      var c = a[b];c && (Za(c, d), 0 === c.length && delete a[b]);
    } });var de = function de(a) {
    return ["$timeout", "$parse", function (b, d) {
      function c(a) {
        return "" === a ? d('this[""]').assign : d(a).assign || w;
      }return { name: "form", restrict: a ? "EAC" : "E", require: ["form", "^^?form"], controller: Lb, compile: function compile(d, e) {
          d.addClass(Ua).addClass(nb);var g = e.name ? "name" : a && e.ngForm ? "ngForm" : !1;return { pre: function pre(a, d, e, f) {
              var n = f[0];if (!("action" in e)) {
                var p = function p(b) {
                  a.$apply(function () {
                    n.$commitViewValue();
                    n.$setSubmitted();
                  });b.preventDefault();
                };d[0].addEventListener("submit", p);d.on("$destroy", function () {
                  b(function () {
                    d[0].removeEventListener("submit", p);
                  }, 0, !1);
                });
              }(f[1] || n.$$parentForm).$addControl(n);var r = g ? c(n.$name) : w;g && (r(a, n), e.$observe(g, function (b) {
                n.$name !== b && (r(a, void 0), n.$$parentForm.$$renameControl(n, b), r = c(n.$name), r(a, n));
              }));d.on("$destroy", function () {
                n.$$parentForm.$removeControl(n);r(a, void 0);R(n, Mb);
              });
            } };
        } };
    }];
  },
      Ce = de(),
      Oe = de(!0),
      Lg = /^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/,
      Xg = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
      Yg = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,
      Mg = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,
      ee = /^(\d{4,})-(\d{2})-(\d{2})$/,
      fe = /^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
      Cc = /^(\d{4,})-W(\d\d)$/,
      ge = /^(\d{4,})-(\d\d)$/,
      he = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
      Yd = W();q(["date", "datetime-local", "month", "time", "week"], function (a) {
    Yd[a] = !0;
  });var ie = { text: function text(a, b, d, c, f, e) {
      Ra(a, b, d, c, f, e);xc(c);
    }, date: ob("date", ee, Nb(ee, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"), "datetime-local": ob("datetimelocal", fe, Nb(fe, "yyyy MM dd HH mm ss sss".split(" ")), "yyyy-MM-ddTHH:mm:ss.sss"), time: ob("time", he, Nb(he, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"), week: ob("week", Cc, function (a, b) {
      if (ga(a)) return a;if (E(a)) {
        Cc.lastIndex = 0;var d = Cc.exec(a);
        if (d) {
          var c = +d[1],
              f = +d[2],
              e = d = 0,
              g = 0,
              h = 0,
              k = Sd(c),
              f = 7 * (f - 1);b && (d = b.getHours(), e = b.getMinutes(), g = b.getSeconds(), h = b.getMilliseconds());return new Date(c, 0, k.getDate() + f, d, e, g, h);
        }
      }return NaN;
    }, "yyyy-Www"), month: ob("month", ge, Nb(ge, ["yyyy", "MM"]), "yyyy-MM"), number: function number(a, b, d, c, f, e) {
      yc(a, b, d, c);Zd(c);Ra(a, b, d, c, f, e);var g, h;if (v(d.min) || d.ngMin) c.$validators.min = function (a) {
        return c.$isEmpty(a) || x(g) || a >= g;
      }, d.$observe("min", function (a) {
        g = Sa(a);c.$validate();
      });if (v(d.max) || d.ngMax) c.$validators.max = function (a) {
        return c.$isEmpty(a) || x(h) || a <= h;
      }, d.$observe("max", function (a) {
        h = Sa(a);c.$validate();
      });if (v(d.step) || d.ngStep) {
        var k;c.$validators.step = function (a, b) {
          return c.$isEmpty(b) || x(k) || $d(b, g || 0, k);
        };d.$observe("step", function (a) {
          k = Sa(a);c.$validate();
        });
      }
    }, url: function url(a, b, d, c, f, e) {
      Ra(a, b, d, c, f, e);xc(c);c.$$parserName = "url";c.$validators.url = function (a, b) {
        var d = a || b;return c.$isEmpty(d) || Xg.test(d);
      };
    }, email: function email(a, b, d, c, f, e) {
      Ra(a, b, d, c, f, e);xc(c);c.$$parserName = "email";c.$validators.email = function (a, b) {
        var d = a || b;return c.$isEmpty(d) || Yg.test(d);
      };
    }, radio: function radio(a, b, d, c) {
      var f = !d.ngTrim || "false" !== S(d.ngTrim);x(d.name) && b.attr("name", ++qb);b.on("click", function (a) {
        var g;b[0].checked && (g = d.value, f && (g = S(g)), c.$setViewValue(g, a && a.type));
      });c.$render = function () {
        var a = d.value;f && (a = S(a));b[0].checked = a === c.$viewValue;
      };d.$observe("value", c.$render);
    }, range: function range(a, b, d, c, f, e) {
      function g(a, c) {
        b.attr(a, d[a]);d.$observe(a, c);
      }function h(a) {
        n = Sa(a);da(c.$modelValue) || (m ? (a = b.val(), n > a && (a = n, b.val(a)), c.$setViewValue(a)) : c.$validate());
      }function k(a) {
        p = Sa(a);da(c.$modelValue) || (m ? (a = b.val(), p < a && (b.val(p), a = p < n ? n : p), c.$setViewValue(a)) : c.$validate());
      }function l(a) {
        r = Sa(a);da(c.$modelValue) || (m && c.$viewValue !== b.val() ? c.$setViewValue(b.val()) : c.$validate());
      }yc(a, b, d, c);Zd(c);Ra(a, b, d, c, f, e);var m = c.$$hasNativeValidators && "range" === b[0].type,
          n = m ? 0 : void 0,
          p = m ? 100 : void 0,
          r = m ? 1 : void 0,
          q = b[0].validity;a = v(d.min);f = v(d.max);e = v(d.step);var s = c.$render;c.$render = m && v(q.rangeUnderflow) && v(q.rangeOverflow) ? function () {
        s();c.$setViewValue(b.val());
      } : s;a && (c.$validators.min = m ? function () {
        return !0;
      } : function (a, b) {
        return c.$isEmpty(b) || x(n) || b >= n;
      }, g("min", h));f && (c.$validators.max = m ? function () {
        return !0;
      } : function (a, b) {
        return c.$isEmpty(b) || x(p) || b <= p;
      }, g("max", k));e && (c.$validators.step = m ? function () {
        return !q.stepMismatch;
      } : function (a, b) {
        return c.$isEmpty(b) || x(r) || $d(b, n || 0, r);
      }, g("step", l));
    }, checkbox: function checkbox(a, b, d, c, f, e, g, h) {
      var k = ae(h, a, "ngTrueValue", d.ngTrueValue, !0),
          l = ae(h, a, "ngFalseValue", d.ngFalseValue, !1);b.on("click", function (a) {
        c.$setViewValue(b[0].checked, a && a.type);
      });c.$render = function () {
        b[0].checked = c.$viewValue;
      };c.$isEmpty = function (a) {
        return !1 === a;
      };c.$formatters.push(function (a) {
        return qa(a, k);
      });c.$parsers.push(function (a) {
        return a ? k : l;
      });
    }, hidden: w, button: w, submit: w, reset: w, file: w },
      Rc = ["$browser", "$sniffer", "$filter", "$parse", function (a, b, d, c) {
    return { restrict: "E", require: ["?ngModel"], link: { pre: function pre(f, e, g, h) {
          h[0] && (ie[P(g.type)] || ie.text)(f, e, g, h[0], b, a, d, c);
        } } };
  }],
      Zg = /^(true|false|\d+)$/,
      ff = function ff() {
    function a(a, d, c) {
      var f = v(c) ? c : 9 === Ha ? "" : null;a.prop("value", f);d.$set("value", c);
    }return { restrict: "A", priority: 100, compile: function compile(b, d) {
        return Zg.test(d.ngValue) ? function (b, d, e) {
          b = b.$eval(e.ngValue);a(d, e, b);
        } : function (b, d, e) {
          b.$watch(e.ngValue, function (b) {
            a(d, e, b);
          });
        };
      } };
  },
      Ge = ["$compile", function (a) {
    return { restrict: "AC", compile: function compile(b) {
        a.$$addBindingClass(b);return function (b, c, f) {
          a.$$addBindingInfo(c, f.ngBind);c = c[0];b.$watch(f.ngBind, function (a) {
            c.textContent = Yb(a);
          });
        };
      } };
  }],
      Ie = ["$interpolate", "$compile", function (a, b) {
    return { compile: function compile(d) {
        b.$$addBindingClass(d);return function (c, d, e) {
          c = a(d.attr(e.$attr.ngBindTemplate));b.$$addBindingInfo(d, c.expressions);d = d[0];e.$observe("ngBindTemplate", function (a) {
            d.textContent = x(a) ? "" : a;
          });
        };
      } };
  }],
      He = ["$sce", "$parse", "$compile", function (a, b, d) {
    return { restrict: "A", compile: function compile(c, f) {
        var e = b(f.ngBindHtml),
            g = b(f.ngBindHtml, function (b) {
          return a.valueOf(b);
        });d.$$addBindingClass(c);return function (b, c, f) {
          d.$$addBindingInfo(c, f.ngBindHtml);b.$watch(g, function () {
            var d = e(b);c.html(a.getTrustedHtml(d) || "");
          });
        };
      } };
  }],
      ef = ma({ restrict: "A", require: "ngModel", link: function link(a, b, d, c) {
      c.$viewChangeListeners.push(function () {
        a.$eval(d.ngChange);
      });
    } }),
      Je = Ac("", !0),
      Le = Ac("Odd", 0),
      Ke = Ac("Even", 1),
      Me = Qa({ compile: function compile(a, b) {
      b.$set("ngCloak", void 0);a.removeClass("ng-cloak");
    } }),
      Ne = [function () {
    return { restrict: "A", scope: !0, controller: "@", priority: 500 };
  }],
      Wc = {},
      $g = { blur: !0, focus: !0 };q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (a) {
    var b = Ba("ng-" + a);Wc[b] = ["$parse", "$rootScope", function (d, c) {
      return { restrict: "A", compile: function compile(f, e) {
          var g = d(e[b]);return function (b, d) {
            d.on(a, function (d) {
              var e = function e() {
                g(b, { $event: d });
              };$g[a] && c.$$phase ? b.$evalAsync(e) : b.$apply(e);
            });
          };
        } };
    }];
  });var Qe = ["$animate", "$compile", function (a, b) {
    return { multiElement: !0, transclude: "element", priority: 600, terminal: !0, restrict: "A", $$tlb: !0, link: function link(d, c, f, e, g) {
        var h, k, l;d.$watch(f.ngIf, function (d) {
          d ? k || g(function (d, e) {
            k = e;d[d.length++] = b.$$createComment("end ngIf", f.ngIf);h = { clone: d };a.enter(d, c.parent(), c);
          }) : (l && (l.remove(), l = null), k && (k.$destroy(), k = null), h && (l = tb(h.clone), a.leave(l).done(function (a) {
            !1 !== a && (l = null);
          }), h = null));
        });
      } };
  }],
      Re = ["$templateRequest", "$anchorScroll", "$animate", function (a, b, d) {
    return { restrict: "ECA", priority: 400, terminal: !0, transclude: "element", controller: $.noop, compile: function compile(c, f) {
        var e = f.ngInclude || f.src,
            g = f.onload || "",
            h = f.autoscroll;return function (c, f, m, n, p) {
          var q = 0,
              s,
              w,
              u,
              H = function H() {
            w && (w.remove(), w = null);s && (s.$destroy(), s = null);
            u && (d.leave(u).done(function (a) {
              !1 !== a && (w = null);
            }), w = u, u = null);
          };c.$watch(e, function (e) {
            var m = function m(a) {
              !1 === a || !v(h) || h && !c.$eval(h) || b();
            },
                w = ++q;e ? (a(e, !0).then(function (a) {
              if (!c.$$destroyed && w === q) {
                var b = c.$new();n.template = a;a = p(b, function (a) {
                  H();d.enter(a, null, f).done(m);
                });s = b;u = a;s.$emit("$includeContentLoaded", e);c.$eval(g);
              }
            }, function () {
              c.$$destroyed || w !== q || (H(), c.$emit("$includeContentError", e));
            }), c.$emit("$includeContentRequested", e)) : (H(), n.template = null);
          });
        };
      } };
  }],
      hf = ["$compile", function (a) {
    return { restrict: "ECA",
      priority: -400, require: "ngInclude", link: function link(b, d, c, f) {
        na.call(d[0]).match(/SVG/) ? (d.empty(), a(Zc(f.template, z.document).childNodes)(b, function (a) {
          d.append(a);
        }, { futureParentElement: d })) : (d.html(f.template), a(d.contents())(b));
      } };
  }],
      Se = Qa({ priority: 450, compile: function compile() {
      return { pre: function pre(a, b, d) {
          a.$eval(d.ngInit);
        } };
    } }),
      df = function df() {
    return { restrict: "A", priority: 100, require: "ngModel", link: function link(a, b, d, c) {
        var f = d.ngList || ", ",
            e = "false" !== d.ngTrim,
            g = e ? S(f) : f;c.$parsers.push(function (a) {
          if (!x(a)) {
            var b = [];a && q(a.split(g), function (a) {
              a && b.push(e ? S(a) : a);
            });return b;
          }
        });c.$formatters.push(function (a) {
          if (C(a)) return a.join(f);
        });c.$isEmpty = function (a) {
          return !a || !a.length;
        };
      } };
  },
      nb = "ng-valid",
      Vd = "ng-invalid",
      Ua = "ng-pristine",
      Rb = "ng-dirty",
      pb = M("ngModel");Ob.$inject = "$scope $exceptionHandler $attrs $element $parse $animate $timeout $q $interpolate".split(" ");Ob.prototype = { $$initGetterSetters: function $$initGetterSetters() {
      if (this.$options.getOption("getterSetter")) {
        var a = this.$$parse(this.$$attr.ngModel + "()"),
            b = this.$$parse(this.$$attr.ngModel + "($$$p)");this.$$ngModelGet = function (b) {
          var c = this.$$parsedNgModel(b);y(c) && (c = a(b));return c;
        };this.$$ngModelSet = function (a, c) {
          y(this.$$parsedNgModel(a)) ? b(a, { $$$p: c }) : this.$$parsedNgModelAssign(a, c);
        };
      } else if (!this.$$parsedNgModel.assign) throw pb("nonassign", this.$$attr.ngModel, ya(this.$$element));
    }, $render: w, $isEmpty: function $isEmpty(a) {
      return x(a) || "" === a || null === a || a !== a;
    }, $$updateEmptyClasses: function $$updateEmptyClasses(a) {
      this.$isEmpty(a) ? (this.$$animate.removeClass(this.$$element, "ng-not-empty"), this.$$animate.addClass(this.$$element, "ng-empty")) : (this.$$animate.removeClass(this.$$element, "ng-empty"), this.$$animate.addClass(this.$$element, "ng-not-empty"));
    }, $setPristine: function $setPristine() {
      this.$dirty = !1;this.$pristine = !0;this.$$animate.removeClass(this.$$element, Rb);this.$$animate.addClass(this.$$element, Ua);
    }, $setDirty: function $setDirty() {
      this.$dirty = !0;this.$pristine = !1;this.$$animate.removeClass(this.$$element, Ua);this.$$animate.addClass(this.$$element, Rb);this.$$parentForm.$setDirty();
    }, $setUntouched: function $setUntouched() {
      this.$touched = !1;this.$untouched = !0;this.$$animate.setClass(this.$$element, "ng-untouched", "ng-touched");
    }, $setTouched: function $setTouched() {
      this.$touched = !0;this.$untouched = !1;this.$$animate.setClass(this.$$element, "ng-touched", "ng-untouched");
    }, $rollbackViewValue: function $rollbackViewValue() {
      this.$$timeout.cancel(this.$$pendingDebounce);this.$viewValue = this.$$lastCommittedViewValue;this.$render();
    }, $validate: function $validate() {
      if (!da(this.$modelValue)) {
        var a = this.$$lastCommittedViewValue,
            b = this.$$rawModelValue,
            d = this.$valid,
            c = this.$modelValue,
            f = this.$options.getOption("allowInvalid"),
            e = this;this.$$runValidators(b, a, function (a) {
          f || d === a || (e.$modelValue = a ? b : void 0, e.$modelValue !== c && e.$$writeModelToScope());
        });
      }
    }, $$runValidators: function $$runValidators(a, b, d) {
      function c() {
        var c = !0;q(k.$validators, function (d, f) {
          var g = Boolean(d(a, b));c = c && g;e(f, g);
        });return c ? !0 : (q(k.$asyncValidators, function (a, b) {
          e(b, null);
        }), !1);
      }function f() {
        var c = [],
            d = !0;q(k.$asyncValidators, function (f, g) {
          var h = f(a, b);if (!h || !y(h.then)) throw pb("nopromise", h);e(g, void 0);c.push(h.then(function () {
            e(g, !0);
          }, function () {
            d = !1;e(g, !1);
          }));
        });
        c.length ? k.$$q.all(c).then(function () {
          g(d);
        }, w) : g(!0);
      }function e(a, b) {
        h === k.$$currentValidationRunId && k.$setValidity(a, b);
      }function g(a) {
        h === k.$$currentValidationRunId && d(a);
      }this.$$currentValidationRunId++;var h = this.$$currentValidationRunId,
          k = this;(function () {
        var a = k.$$parserName || "parse";if (x(k.$$parserValid)) e(a, null);else return k.$$parserValid || (q(k.$validators, function (a, b) {
          e(b, null);
        }), q(k.$asyncValidators, function (a, b) {
          e(b, null);
        })), e(a, k.$$parserValid), k.$$parserValid;return !0;
      })() ? c() ? f() : g(!1) : g(!1);
    }, $commitViewValue: function $commitViewValue() {
      var a = this.$viewValue;this.$$timeout.cancel(this.$$pendingDebounce);if (this.$$lastCommittedViewValue !== a || "" === a && this.$$hasNativeValidators) this.$$updateEmptyClasses(a), this.$$lastCommittedViewValue = a, this.$pristine && this.$setDirty(), this.$$parseAndValidate();
    }, $$parseAndValidate: function $$parseAndValidate() {
      var a = this.$$lastCommittedViewValue,
          b = this;if (this.$$parserValid = x(a) ? void 0 : !0) for (var d = 0; d < this.$parsers.length; d++) {
        if (a = this.$parsers[d](a), x(a)) {
          this.$$parserValid = !1;break;
        }
      }da(this.$modelValue) && (this.$modelValue = this.$$ngModelGet(this.$$scope));var c = this.$modelValue,
          f = this.$options.getOption("allowInvalid");this.$$rawModelValue = a;f && (this.$modelValue = a, b.$modelValue !== c && b.$$writeModelToScope());this.$$runValidators(a, this.$$lastCommittedViewValue, function (d) {
        f || (b.$modelValue = d ? a : void 0, b.$modelValue !== c && b.$$writeModelToScope());
      });
    }, $$writeModelToScope: function $$writeModelToScope() {
      this.$$ngModelSet(this.$$scope, this.$modelValue);q(this.$viewChangeListeners, function (a) {
        try {
          a();
        } catch (b) {
          this.$$exceptionHandler(b);
        }
      }, this);
    }, $setViewValue: function $setViewValue(a, b) {
      this.$viewValue = a;this.$options.getOption("updateOnDefault") && this.$$debounceViewValueCommit(b);
    }, $$debounceViewValueCommit: function $$debounceViewValueCommit(a) {
      var b = this.$options.getOption("debounce");Y(b[a]) ? b = b[a] : Y(b["default"]) && (b = b["default"]);this.$$timeout.cancel(this.$$pendingDebounce);var d = this;0 < b ? this.$$pendingDebounce = this.$$timeout(function () {
        d.$commitViewValue();
      }, b) : this.$$scope.$root.$$phase ? this.$commitViewValue() : this.$$scope.$apply(function () {
        d.$commitViewValue();
      });
    },
    $overrideModelOptions: function $overrideModelOptions(a) {
      this.$options = this.$options.createChild(a);
    } };Wd({ clazz: Ob, set: function set(a, b) {
      a[b] = !0;
    }, unset: function unset(a, b) {
      delete a[b];
    } });var cf = ["$rootScope", function (a) {
    return { restrict: "A", require: ["ngModel", "^?form", "^?ngModelOptions"], controller: Ob, priority: 1, compile: function compile(b) {
        b.addClass(Ua).addClass("ng-untouched").addClass(nb);return { pre: function pre(a, b, f, e) {
            var g = e[0];b = e[1] || g.$$parentForm;if (e = e[2]) g.$options = e.$options;g.$$initGetterSetters();b.$addControl(g);f.$observe("name", function (a) {
              g.$name !== a && g.$$parentForm.$$renameControl(g, a);
            });a.$on("$destroy", function () {
              g.$$parentForm.$removeControl(g);
            });
          }, post: function post(b, c, f, e) {
            function g() {
              h.$setTouched();
            }var h = e[0];if (h.$options.getOption("updateOn")) c.on(h.$options.getOption("updateOn"), function (a) {
              h.$$debounceViewValueCommit(a && a.type);
            });c.on("blur", function () {
              h.$touched || (a.$$phase ? b.$evalAsync(g) : b.$apply(g));
            });
          } };
      } };
  }],
      Pb,
      ah = /(\s+|^)default(\s+|$)/;Bc.prototype = { getOption: function getOption(a) {
      return this.$$options[a];
    }, createChild: function createChild(a) {
      var b = !1;a = R({}, a);q(a, function (d, c) {
        "$inherit" === d ? "*" === c ? b = !0 : (a[c] = this.$$options[c], "updateOn" === c && (a.updateOnDefault = this.$$options.updateOnDefault)) : "updateOn" === c && (a.updateOnDefault = !1, a[c] = S(d.replace(ah, function () {
          a.updateOnDefault = !0;return " ";
        })));
      }, this);b && (delete a["*"], be(a, this.$$options));be(a, Pb.$$options);return new Bc(a);
    } };Pb = new Bc({ updateOn: "", updateOnDefault: !0, debounce: 0, getterSetter: !1, allowInvalid: !1, timezone: null });var gf = function gf() {
    function a(a, d) {
      this.$$attrs = a;this.$$scope = d;
    }a.$inject = ["$attrs", "$scope"];a.prototype = { $onInit: function $onInit() {
        var a = this.parentCtrl ? this.parentCtrl.$options : Pb,
            d = this.$$scope.$eval(this.$$attrs.ngModelOptions);this.$options = a.createChild(d);
      } };return { restrict: "A", priority: 10, require: { parentCtrl: "?^^ngModelOptions" }, bindToController: !0, controller: a };
  },
      Te = Qa({ terminal: !0, priority: 1E3 }),
      bh = M("ngOptions"),
      ch = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([$\w][$\w]*)|(?:\(\s*([$\w][$\w]*)\s*,\s*([$\w][$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
      af = ["$compile", "$document", "$parse", function (a, b, d) {
    function c(a, b, c) {
      function e(a, b, c, d, f) {
        this.selectValue = a;this.viewValue = b;this.label = c;this.group = d;this.disabled = f;
      }function f(a) {
        var b;if (!q && sa(a)) b = a;else {
          b = [];for (var c in a) {
            a.hasOwnProperty(c) && "$" !== c.charAt(0) && b.push(c);
          }
        }return b;
      }var n = a.match(ch);if (!n) throw bh("iexp", a, ya(b));var p = n[5] || n[7],
          q = n[6];a = / as /.test(n[0]) && n[1];var s = n[9];b = d(n[2] ? n[1] : p);var v = a && d(a) || b,
          u = s && d(s),
          w = s ? function (a, b) {
        return u(c, b);
      } : function (a) {
        return Pa(a);
      },
          x = function x(a, b) {
        return w(a, B(a, b));
      },
          t = d(n[2] || n[1]),
          z = d(n[3] || ""),
          A = d(n[4] || ""),
          K = d(n[8]),
          I = {},
          B = q ? function (a, b) {
        I[q] = b;I[p] = a;return I;
      } : function (a) {
        I[p] = a;return I;
      };return { trackBy: s, getTrackByValue: x, getWatchables: d(K, function (a) {
          var b = [];a = a || [];for (var d = f(a), e = d.length, g = 0; g < e; g++) {
            var h = a === d ? g : d[g],
                l = a[h],
                h = B(l, h),
                l = w(l, h);b.push(l);if (n[2] || n[1]) l = t(c, h), b.push(l);n[4] && (h = A(c, h), b.push(h));
          }return b;
        }), getOptions: function getOptions() {
          for (var a = [], b = {}, d = K(c) || [], g = f(d), h = g.length, n = 0; n < h; n++) {
            var p = d === g ? n : g[n],
                q = B(d[p], p),
                r = v(c, q),
                p = w(r, q),
                u = t(c, q),
                I = z(c, q),
                q = A(c, q),
                r = new e(p, r, u, I, q);a.push(r);b[p] = r;
          }return { items: a, selectValueMap: b, getOptionFromViewValue: function getOptionFromViewValue(a) {
              return b[x(a)];
            }, getViewValueFromOption: function getViewValueFromOption(a) {
              return s ? xa(a.viewValue) : a.viewValue;
            } };
        } };
    }var f = z.document.createElement("option"),
        e = z.document.createElement("optgroup");return { restrict: "A", terminal: !0, require: ["select", "ngModel"], link: { pre: function pre(a, b, c, d) {
          d[0].registerOption = w;
        }, post: function post(d, h, k, l) {
          function m(a) {
            var b = (a = t.getOptionFromViewValue(a)) && a.element;b && !b.selected && (b.selected = !0);return a;
          }function n(a, b) {
            a.element = b;b.disabled = a.disabled;a.label !== b.label && (b.label = a.label, b.textContent = a.label);b.value = a.selectValue;
          }function p() {
            var a = t && r.readValue();if (t) for (var b = t.items.length - 1; 0 <= b; b--) {
              var c = t.items[b];v(c.group) ? Eb(c.element.parentNode) : Eb(c.element);
            }t = y.getOptions();var d = {};z && h.prepend(r.emptyOption);t.items.forEach(function (a) {
              var b;if (v(a.group)) {
                b = d[a.group];b || (b = e.cloneNode(!1), A.appendChild(b), b.label = null === a.group ? "null" : a.group, d[a.group] = b);var c = f.cloneNode(!1);
              } else b = A, c = f.cloneNode(!1);b.appendChild(c);n(a, c);
            });h[0].appendChild(A);s.$render();s.$isEmpty(a) || (b = r.readValue(), (y.trackBy || w ? qa(a, b) : a === b) || (s.$setViewValue(b), s.$render()));
          }var r = l[0],
              s = l[1],
              w = k.multiple;l = 0;for (var u = h.children(), x = u.length; l < x; l++) {
            if ("" === u[l].value) {
              r.hasEmptyOption = !0;r.emptyOption = u.eq(l);break;
            }
          }var z = !!r.emptyOption;D(f.cloneNode(!1)).val("?");var t,
              y = c(k.ngOptions, h, d),
              A = b[0].createDocumentFragment();r.generateUnknownOptionValue = function (a) {
            return "?";
          };w ? (r.writeValue = function (a) {
            var b = a && a.map(m) || [];t.items.forEach(function (a) {
              a.element.selected && -1 === Array.prototype.indexOf.call(b, a) && (a.element.selected = !1);
            });
          }, r.readValue = function () {
            var a = h.val() || [],
                b = [];q(a, function (a) {
              (a = t.selectValueMap[a]) && !a.disabled && b.push(t.getViewValueFromOption(a));
            });return b;
          }, y.trackBy && d.$watchCollection(function () {
            if (C(s.$viewValue)) return s.$viewValue.map(function (a) {
              return y.getTrackByValue(a);
            });
          }, function () {
            s.$render();
          })) : (r.writeValue = function (a) {
            var b = t.selectValueMap[h.val()],
                c = t.getOptionFromViewValue(a);b && b.element.removeAttribute("selected");c ? (h[0].value !== c.selectValue && (r.removeUnknownOption(), r.unselectEmptyOption(), h[0].value = c.selectValue, c.element.selected = !0), c.element.setAttribute("selected", "selected")) : z ? r.selectEmptyOption() : r.unknownOption.parent().length ? r.updateUnknownOption(a) : r.renderUnknownOption(a);
          }, r.readValue = function () {
            var a = t.selectValueMap[h.val()];return a && !a.disabled ? (r.unselectEmptyOption(), r.removeUnknownOption(), t.getViewValueFromOption(a)) : null;
          }, y.trackBy && d.$watch(function () {
            return y.getTrackByValue(s.$viewValue);
          }, function () {
            s.$render();
          }));z && (r.emptyOption.remove(), a(r.emptyOption)(d), 8 === r.emptyOption[0].nodeType ? (r.hasEmptyOption = !1, r.registerOption = function (a, b) {
            "" === b.val() && (r.hasEmptyOption = !0, r.emptyOption = b, r.emptyOption.removeClass("ng-scope"), s.$render(), b.on("$destroy", function () {
              r.hasEmptyOption = !1;r.emptyOption = void 0;
            }));
          }) : r.emptyOption.removeClass("ng-scope"));h.empty();p();d.$watchCollection(y.getWatchables, p);
        } } };
  }],
      Ue = ["$locale", "$interpolate", "$log", function (a, b, d) {
    var c = /{}/g,
        f = /^when(Minus)?(.+)$/;return { link: function link(e, g, h) {
        function k(a) {
          g.text(a || "");
        }var l = h.count,
            m = h.$attr.when && g.attr(h.$attr.when),
            n = h.offset || 0,
            p = e.$eval(m) || {},
            r = {},
            s = b.startSymbol(),
            v = b.endSymbol(),
            u = s + l + "-" + n + v,
            H = $.noop,
            y;q(h, function (a, b) {
          var c = f.exec(b);c && (c = (c[1] ? "-" : "") + P(c[2]), p[c] = g.attr(h.$attr[b]));
        });q(p, function (a, d) {
          r[d] = b(a.replace(c, u));
        });e.$watch(l, function (b) {
          var c = parseFloat(b),
              f = da(c);f || c in p || (c = a.pluralCat(c - n));c === y || f && da(y) || (H(), f = r[c], x(f) ? (null != b && d.debug("ngPluralize: no rule defined for '" + c + "' in " + m), H = w, k()) : H = e.$watch(f, k), y = c);
        });
      } };
  }],
      Ve = ["$parse", "$animate", "$compile", function (a, b, d) {
    var c = M("ngRepeat"),
        f = function f(a, b, c, d, _f2, m, n) {
      a[c] = d;_f2 && (a[_f2] = m);a.$index = b;a.$first = 0 === b;a.$last = b === n - 1;a.$middle = !(a.$first || a.$last);a.$odd = !(a.$even = 0 === (b & 1));
    };return { restrict: "A", multiElement: !0, transclude: "element", priority: 1E3, terminal: !0, $$tlb: !0, compile: function compile(e, g) {
        var h = g.ngRepeat,
            k = d.$$createComment("end ngRepeat", h),
            l = h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if (!l) throw c("iexp", h);var m = l[1],
            n = l[2],
            p = l[3],
            r = l[4],
            l = m.match(/^(?:(\s*[$\w]+)|\(\s*([$\w]+)\s*,\s*([$\w]+)\s*\))$/);if (!l) throw c("iidexp", m);var s = l[3] || l[1],
            v = l[2];if (p && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(p) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(p))) throw c("badident", p);var u,
            w,
            x,
            t,
            y = { $id: Pa };r ? u = a(r) : (x = function x(a, b) {
          return Pa(b);
        }, t = function t(a) {
          return a;
        });return function (a, d, e, g, l) {
          u && (w = function w(b, c, d) {
            v && (y[v] = b);y[s] = c;y.$index = d;return u(a, y);
          });var m = W();a.$watchCollection(n, function (e) {
            var g,
                n,
                r = d[0],
                u,
                y = W(),
                z,
                D,
                E,
                B,
                F,
                C,
                I;p && (a[p] = e);if (sa(e)) F = e, n = w || x;else for (I in n = w || t, F = [], e) {
              ua.call(e, I) && "$" !== I.charAt(0) && F.push(I);
            }z = F.length;I = Array(z);for (g = 0; g < z; g++) {
              if (D = e === F ? g : F[g], E = e[D], B = n(D, E, g), m[B]) C = m[B], delete m[B], y[B] = C, I[g] = C;else {
                if (y[B]) throw q(I, function (a) {
                  a && a.scope && (m[a.id] = a);
                }), c("dupes", h, B, E);I[g] = { id: B,
                  scope: void 0, clone: void 0 };y[B] = !0;
              }
            }for (u in m) {
              C = m[u];B = tb(C.clone);b.leave(B);if (B[0].parentNode) for (g = 0, n = B.length; g < n; g++) {
                B[g].$$NG_REMOVED = !0;
              }C.scope.$destroy();
            }for (g = 0; g < z; g++) {
              if (D = e === F ? g : F[g], E = e[D], C = I[g], C.scope) {
                u = r;do {
                  u = u.nextSibling;
                } while (u && u.$$NG_REMOVED);C.clone[0] !== u && b.move(tb(C.clone), null, r);r = C.clone[C.clone.length - 1];f(C.scope, g, s, E, v, D, z);
              } else l(function (a, c) {
                C.scope = c;var d = k.cloneNode(!1);a[a.length++] = d;b.enter(a, null, r);r = d;C.clone = a;y[C.id] = C;f(C.scope, g, s, E, v, D, z);
              });
            }m = y;
          });
        };
      } };
  }],
      We = ["$animate", function (a) {
    return { restrict: "A", multiElement: !0, link: function link(b, d, c) {
        b.$watch(c.ngShow, function (b) {
          a[b ? "removeClass" : "addClass"](d, "ng-hide", { tempClasses: "ng-hide-animate" });
        });
      } };
  }],
      Pe = ["$animate", function (a) {
    return { restrict: "A", multiElement: !0, link: function link(b, d, c) {
        b.$watch(c.ngHide, function (b) {
          a[b ? "addClass" : "removeClass"](d, "ng-hide", { tempClasses: "ng-hide-animate" });
        });
      } };
  }],
      Xe = Qa(function (a, b, d) {
    a.$watch(d.ngStyle, function (a, d) {
      d && a !== d && q(d, function (a, c) {
        b.css(c, "");
      });a && b.css(a);
    }, !0);
  }),
      Ye = ["$animate", "$compile", function (a, b) {
    return { require: "ngSwitch", controller: ["$scope", function () {
        this.cases = {};
      }], link: function link(d, c, f, e) {
        var g = [],
            h = [],
            k = [],
            l = [],
            m = function m(a, b) {
          return function (c) {
            !1 !== c && a.splice(b, 1);
          };
        };d.$watch(f.ngSwitch || f.on, function (c) {
          for (var d, f; k.length;) {
            a.cancel(k.pop());
          }d = 0;for (f = l.length; d < f; ++d) {
            var s = tb(h[d].clone);l[d].$destroy();(k[d] = a.leave(s)).done(m(k, d));
          }h.length = 0;l.length = 0;(g = e.cases["!" + c] || e.cases["?"]) && q(g, function (c) {
            c.transclude(function (d, e) {
              l.push(e);
              var f = c.element;d[d.length++] = b.$$createComment("end ngSwitchWhen");h.push({ clone: d });a.enter(d, f.parent(), f);
            });
          });
        });
      } };
  }],
      Ze = Qa({ transclude: "element", priority: 1200, require: "^ngSwitch", multiElement: !0, link: function link(a, b, d, c, f) {
      a = d.ngSwitchWhen.split(d.ngSwitchWhenSeparator).sort().filter(function (a, b, c) {
        return c[b - 1] !== a;
      });q(a, function (a) {
        c.cases["!" + a] = c.cases["!" + a] || [];c.cases["!" + a].push({ transclude: f, element: b });
      });
    } }),
      $e = Qa({ transclude: "element", priority: 1200, require: "^ngSwitch", multiElement: !0, link: function link(a, b, d, c, f) {
      c.cases["?"] = c.cases["?"] || [];c.cases["?"].push({ transclude: f, element: b });
    } }),
      dh = M("ngTransclude"),
      bf = ["$compile", function (a) {
    return { restrict: "EAC", terminal: !0, compile: function compile(b) {
        var d = a(b.contents());b.empty();return function (a, b, e, g, h) {
          function k() {
            d(a, function (a) {
              b.append(a);
            });
          }if (!h) throw dh("orphan", ya(b));e.ngTransclude === e.$attr.ngTransclude && (e.ngTransclude = "");e = e.ngTransclude || e.ngTranscludeSlot;h(function (a, c) {
            var d;if (d = a.length) a: {
              d = 0;for (var e = a.length; d < e; d++) {
                var g = a[d];if (g.nodeType !== Ja || g.nodeValue.trim()) {
                  d = !0;break a;
                }
              }d = void 0;
            }d ? b.append(a) : (k(), c.$destroy());
          }, null, e);e && !h.isSlotFilled(e) && k();
        };
      } };
  }],
      De = ["$templateCache", function (a) {
    return { restrict: "E", terminal: !0, compile: function compile(b, d) {
        "text/ng-template" === d.type && a.put(d.id, b[0].text);
      } };
  }],
      eh = { $setViewValue: w, $render: w },
      fh = ["$element", "$scope", function (a, b) {
    function d() {
      h || (h = !0, b.$$postDigest(function () {
        h = !1;e.ngModelCtrl.$render();
      }));
    }function c(a) {
      k || (k = !0, b.$$postDigest(function () {
        b.$$destroyed || (k = !1, e.ngModelCtrl.$setViewValue(e.readValue()), a && e.ngModelCtrl.$render());
      }));
    }function f(a) {
      a.prop("selected", !0);a.attr("selected", !0);
    }var e = this,
        g = new Gb();e.selectValueMap = {};e.ngModelCtrl = eh;e.multiple = !1;e.unknownOption = D(z.document.createElement("option"));e.hasEmptyOption = !1;e.emptyOption = void 0;e.renderUnknownOption = function (b) {
      b = e.generateUnknownOptionValue(b);e.unknownOption.val(b);a.prepend(e.unknownOption);f(e.unknownOption);a.val(b);
    };e.updateUnknownOption = function (b) {
      b = e.generateUnknownOptionValue(b);e.unknownOption.val(b);f(e.unknownOption);
      a.val(b);
    };e.generateUnknownOptionValue = function (a) {
      return "? " + Pa(a) + " ?";
    };e.removeUnknownOption = function () {
      e.unknownOption.parent() && e.unknownOption.remove();
    };e.selectEmptyOption = function () {
      e.emptyOption && (a.val(""), f(e.emptyOption));
    };e.unselectEmptyOption = function () {
      e.hasEmptyOption && e.emptyOption.removeAttr("selected");
    };b.$on("$destroy", function () {
      e.renderUnknownOption = w;
    });e.readValue = function () {
      var b = a.val(),
          b = b in e.selectValueMap ? e.selectValueMap[b] : b;return e.hasOption(b) ? b : null;
    };e.writeValue = function (b) {
      var c = a[0].options[a[0].selectedIndex];c && c.removeAttribute("selected");e.hasOption(b) ? (e.removeUnknownOption(), c = Pa(b), a.val(c in e.selectValueMap ? c : b), f(D(a[0].options[a[0].selectedIndex]))) : null == b && e.emptyOption ? (e.removeUnknownOption(), e.selectEmptyOption()) : e.unknownOption.parent().length ? e.updateUnknownOption(b) : e.renderUnknownOption(b);
    };e.addOption = function (a, b) {
      if (8 !== b[0].nodeType) {
        La(a, '"option value"');"" === a && (e.hasEmptyOption = !0, e.emptyOption = b);var c = g.get(a) || 0;g.set(a, c + 1);d();
      }
    };e.removeOption = function (a) {
      var b = g.get(a);b && (1 === b ? (g.delete(a), "" === a && (e.hasEmptyOption = !1, e.emptyOption = void 0)) : g.set(a, b - 1));
    };e.hasOption = function (a) {
      return !!g.get(a);
    };var h = !1,
        k = !1;e.registerOption = function (a, b, f, g, h) {
      if (f.$attr.ngValue) {
        var k,
            q = NaN;f.$observe("value", function (a) {
          var d,
              f = b.prop("selected");v(q) && (e.removeOption(k), delete e.selectValueMap[q], d = !0);q = Pa(a);k = a;e.selectValueMap[q] = a;e.addOption(a, b);b.attr("value", q);d && f && c();
        });
      } else g ? f.$observe("value", function (a) {
        e.readValue();
        var d,
            f = b.prop("selected");v(k) && (e.removeOption(k), d = !0);k = a;e.addOption(a, b);d && f && c();
      }) : h ? a.$watch(h, function (a, d) {
        f.$set("value", a);var g = b.prop("selected");d !== a && e.removeOption(d);e.addOption(a, b);d && g && c();
      }) : e.addOption(f.value, b);f.$observe("disabled", function (a) {
        if ("true" === a || a && b.prop("selected")) e.multiple ? c(!0) : (e.ngModelCtrl.$setViewValue(null), e.ngModelCtrl.$render());
      });b.on("$destroy", function () {
        var a = e.readValue(),
            b = f.value;e.removeOption(b);d();(e.multiple && a && -1 !== a.indexOf(b) || a === b) && c(!0);
      });
    };
  }],
      Ee = function Ee() {
    return { restrict: "E", require: ["select", "?ngModel"], controller: fh, priority: 1, link: { pre: function pre(a, b, d, c) {
          var f = c[0],
              e = c[1];if (e) {
            if (f.ngModelCtrl = e, b.on("change", function () {
              f.removeUnknownOption();a.$apply(function () {
                e.$setViewValue(f.readValue());
              });
            }), d.multiple) {
              f.multiple = !0;f.readValue = function () {
                var a = [];q(b.find("option"), function (b) {
                  b.selected && !b.disabled && (b = b.value, a.push(b in f.selectValueMap ? f.selectValueMap[b] : b));
                });return a;
              };f.writeValue = function (a) {
                q(b.find("option"), function (b) {
                  b.selected = !!a && (-1 !== Array.prototype.indexOf.call(a, b.value) || -1 !== Array.prototype.indexOf.call(a, f.selectValueMap[b.value]));
                });
              };var g,
                  h = NaN;a.$watch(function () {
                h !== e.$viewValue || qa(g, e.$viewValue) || (g = ra(e.$viewValue), e.$render());h = e.$viewValue;
              });e.$isEmpty = function (a) {
                return !a || 0 === a.length;
              };
            }
          } else f.registerOption = w;
        }, post: function post(a, b, d, c) {
          var f = c[1];if (f) {
            var e = c[0];f.$render = function () {
              e.writeValue(f.$viewValue);
            };
          }
        } } };
  },
      Fe = ["$interpolate", function (a) {
    return { restrict: "E", priority: 100,
      compile: function compile(b, d) {
        var c, f;v(d.ngValue) || (v(d.value) ? c = a(d.value, !0) : (f = a(b.text(), !0)) || d.$set("value", b.text()));return function (a, b, d) {
          var k = b.parent();(k = k.data("$selectController") || k.parent().data("$selectController")) && k.registerOption(a, b, d, c, f);
        };
      } };
  }],
      Tc = function Tc() {
    return { restrict: "A", require: "?ngModel", link: function link(a, b, d, c) {
        c && (d.required = !0, c.$validators.required = function (a, b) {
          return !d.required || !c.$isEmpty(b);
        }, d.$observe("required", function () {
          c.$validate();
        }));
      } };
  },
      Sc = function Sc() {
    return { restrict: "A",
      require: "?ngModel", link: function link(a, b, d, c) {
        if (c) {
          var f,
              e = d.ngPattern || d.pattern;d.$observe("pattern", function (a) {
            E(a) && 0 < a.length && (a = new RegExp("^" + a + "$"));if (a && !a.test) throw M("ngPattern")("noregexp", e, a, ya(b));f = a || void 0;c.$validate();
          });c.$validators.pattern = function (a, b) {
            return c.$isEmpty(b) || x(f) || f.test(b);
          };
        }
      } };
  },
      Vc = function Vc() {
    return { restrict: "A", require: "?ngModel", link: function link(a, b, d, c) {
        if (c) {
          var f = -1;d.$observe("maxlength", function (a) {
            a = Z(a);f = da(a) ? -1 : a;c.$validate();
          });c.$validators.maxlength = function (a, b) {
            return 0 > f || c.$isEmpty(b) || b.length <= f;
          };
        }
      } };
  },
      Uc = function Uc() {
    return { restrict: "A", require: "?ngModel", link: function link(a, b, d, c) {
        if (c) {
          var f = 0;d.$observe("minlength", function (a) {
            f = Z(a) || 0;c.$validate();
          });c.$validators.minlength = function (a, b) {
            return c.$isEmpty(b) || b.length >= f;
          };
        }
      } };
  };z.angular.bootstrap ? z.console && console.log("WARNING: Tried to load angular more than once.") : (ve(), ye($), $.module("ngLocale", [], ["$provide", function (a) {
    function b(a) {
      a += "";var b = a.indexOf(".");return -1 == b ? 0 : a.length - b - 1;
    }a.value("$locale", { DATETIME_FORMATS: { AMPMS: ["AM", "PM"], DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), ERANAMES: ["Before Christ", "Anno Domini"], ERAS: ["BC", "AD"], FIRSTDAYOFWEEK: 6, MONTH: "January February March April May June July August September October November December".split(" "), SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "), SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), STANDALONEMONTH: "January February March April May June July August September October November December".split(" "),
        WEEKENDRANGE: [5, 6], fullDate: "EEEE, MMMM d, y", longDate: "MMMM d, y", medium: "MMM d, y h:mm:ss a", mediumDate: "MMM d, y", mediumTime: "h:mm:ss a", "short": "M/d/yy h:mm a", shortDate: "M/d/yy", shortTime: "h:mm a" }, NUMBER_FORMATS: { CURRENCY_SYM: "$", DECIMAL_SEP: ".", GROUP_SEP: ",", PATTERNS: [{ gSize: 3, lgSize: 3, maxFrac: 3, minFrac: 0, minInt: 1, negPre: "-", negSuf: "", posPre: "", posSuf: "" }, { gSize: 3, lgSize: 3, maxFrac: 2, minFrac: 2, minInt: 1, negPre: "-\xA4", negSuf: "", posPre: "\xA4", posSuf: "" }] }, id: "en-us", localeID: "en_US", pluralCat: function pluralCat(a, c) {
        var f = a | 0,
            e = c;void 0 === e && (e = Math.min(b(a), 3));Math.pow(10, e);return 1 == f && 0 == e ? "one" : "other";
      } });
  }]), D(function () {
    qe(z.document, Mc);
  }));
})(window);!window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");+function (a) {
  "use strict";
  var b = a.fn.jquery.split(" ")[0].split(".");if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
}(jQuery), +function (a) {
  "use strict";
  function b() {
    var a = document.createElement("bootstrap"),
        b = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };for (var c in b) {
      if (void 0 !== a.style[c]) return { end: b[c] };
    }return !1;
  }a.fn.emulateTransitionEnd = function (b) {
    var c = !1,
        d = this;a(this).one("bsTransitionEnd", function () {
      c = !0;
    });var e = function e() {
      c || a(d).trigger(a.support.transition.end);
    };return setTimeout(e, b), this;
  }, a(function () {
    a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = { bindType: a.support.transition.end, delegateType: a.support.transition.end, handle: function handle(b) {
        return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0;
      } });
  });
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    return this.each(function () {
      var c = a(this),
          e = c.data("bs.alert");e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c);
    });
  }var c = '[data-dismiss="alert"]',
      d = function d(b) {
    a(b).on("click", c, this.close);
  };d.VERSION = "3.3.5", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
    function c() {
      g.detach().trigger("closed.bs.alert").remove();
    }var e = a(this),
        f = e.attr("data-target");f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));var g = a(f);b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
  };var e = a.fn.alert;a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
    return a.fn.alert = e, this;
  }, a(document).on("click.bs.alert.data-api", c, d.prototype.close);
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.button"),
          f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b);
    });
  }var c = function c(b, d) {
    this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
  };c.VERSION = "3.3.5", c.DEFAULTS = { loadingText: "loading..." }, c.prototype.setState = function (b) {
    var c = "disabled",
        d = this.$element,
        e = d.is("input") ? "val" : "html",
        f = d.data();b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
      d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c));
    }, this), 0);
  }, c.prototype.toggle = function () {
    var a = !0,
        b = this.$element.closest('[data-toggle="buttons"]');if (b.length) {
      var c = this.$element.find("input");"radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change");
    } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
  };var d = a.fn.button;a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
    return a.fn.button = d, this;
  }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
    var d = a(c.target);d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault();
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
    a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type));
  });
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.carousel"),
          f = a.extend({}, c.DEFAULTS, d.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b),
          g = "string" == typeof b ? b : f.slide;e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
    });
  }var c = function c(b, _c) {
    this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = _c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
  };c.VERSION = "3.3.5", c.TRANSITION_DURATION = 600, c.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }, c.prototype.keydown = function (a) {
    if (!/input|textarea/i.test(a.target.tagName)) {
      switch (a.which) {case 37:
          this.prev();break;case 39:
          this.next();break;default:
          return;}a.preventDefault();
    }
  }, c.prototype.cycle = function (b) {
    return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
  }, c.prototype.getItemIndex = function (a) {
    return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active);
  }, c.prototype.getItemForDirection = function (a, b) {
    var c = this.getItemIndex(b),
        d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;if (d && !this.options.wrap) return b;var e = "prev" == a ? -1 : 1,
        f = (c + e) % this.$items.length;return this.$items.eq(f);
  }, c.prototype.to = function (a) {
    var b = this,
        c = this.getItemIndex(this.$active = this.$element.find(".item.active"));return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
      b.to(a);
    }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
  }, c.prototype.pause = function (b) {
    return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this;
  }, c.prototype.next = function () {
    return this.sliding ? void 0 : this.slide("next");
  }, c.prototype.prev = function () {
    return this.sliding ? void 0 : this.slide("prev");
  }, c.prototype.slide = function (b, d) {
    var e = this.$element.find(".item.active"),
        f = d || this.getItemForDirection(b, e),
        g = this.interval,
        h = "next" == b ? "left" : "right",
        i = this;if (f.hasClass("active")) return this.sliding = !1;var j = f[0],
        k = a.Event("slide.bs.carousel", { relatedTarget: j, direction: h });if (this.$element.trigger(k), !k.isDefaultPrevented()) {
      if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
        this.$indicators.find(".active").removeClass("active");var l = a(this.$indicators.children()[this.getItemIndex(f)]);l && l.addClass("active");
      }var m = a.Event("slid.bs.carousel", { relatedTarget: j, direction: h });return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
        f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
          i.$element.trigger(m);
        }, 0);
      }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this;
    }
  };var d = a.fn.carousel;a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
    return a.fn.carousel = d, this;
  };var e = function e(c) {
    var d,
        e = a(this),
        f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));if (f.hasClass("carousel")) {
      var g = a.extend({}, f.data(), e.data()),
          h = e.attr("data-slide-to");h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
    }
  };a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
    a('[data-ride="carousel"]').each(function () {
      var c = a(this);b.call(c, c.data());
    });
  });
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    var c,
        d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");return a(d);
  }function c(b) {
    return this.each(function () {
      var c = a(this),
          e = c.data("bs.collapse"),
          f = a.extend({}, d.DEFAULTS, c.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b);!e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]();
    });
  }var d = function d(b, c) {
    this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle();
  };d.VERSION = "3.3.5", d.TRANSITION_DURATION = 350, d.DEFAULTS = { toggle: !0 }, d.prototype.dimension = function () {
    var a = this.$element.hasClass("width");return a ? "width" : "height";
  }, d.prototype.show = function () {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var b,
          e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
        var f = a.Event("show.bs.collapse");if (this.$element.trigger(f), !f.isDefaultPrevented()) {
          e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));var g = this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;var h = function h() {
            this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
          };if (!a.support.transition) return h.call(this);var i = a.camelCase(["scroll", g].join("-"));this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);
        }
      }
    }
  }, d.prototype.hide = function () {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var b = a.Event("hide.bs.collapse");if (this.$element.trigger(b), !b.isDefaultPrevented()) {
        var c = this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;var e = function e() {
          this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
        };return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);
      }
    }
  }, d.prototype.toggle = function () {
    this[this.$element.hasClass("in") ? "hide" : "show"]();
  }, d.prototype.getParent = function () {
    return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
      var e = a(d);this.addAriaAndCollapsedClass(b(e), e);
    }, this)).end();
  }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
    var c = a.hasClass("in");a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c);
  };var e = a.fn.collapse;a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
    return a.fn.collapse = e, this;
  }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
    var e = a(this);e.attr("data-target") || d.preventDefault();var f = b(e),
        g = f.data("bs.collapse"),
        h = g ? "toggle" : e.data();c.call(f, h);
  });
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    var c = b.attr("data-target");c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));var d = c && a(c);return d && d.length ? d : b.parent();
  }function c(c) {
    c && 3 === c.which || (a(e).remove(), a(f).each(function () {
      var d = a(this),
          e = b(d),
          f = { relatedTarget: this };e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f))));
    }));
  }function d(b) {
    return this.each(function () {
      var c = a(this),
          d = c.data("bs.dropdown");d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c);
    });
  }var e = ".dropdown-backdrop",
      f = '[data-toggle="dropdown"]',
      g = function g(b) {
    a(b).on("click.bs.dropdown", this.toggle);
  };g.VERSION = "3.3.5", g.prototype.toggle = function (d) {
    var e = a(this);if (!e.is(".disabled, :disabled")) {
      var f = b(e),
          g = f.hasClass("open");if (c(), !g) {
        "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);var h = { relatedTarget: this };if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h);
      }return !1;
    }
  }, g.prototype.keydown = function (c) {
    if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
      var d = a(this);if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
        var e = b(d),
            g = e.hasClass("open");if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");var h = " li:not(.disabled):visible a",
            i = e.find(".dropdown-menu" + h);if (i.length) {
          var j = i.index(c.target);38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus");
        }
      }
    }
  };var h = a.fn.dropdown;a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
    return a.fn.dropdown = h, this;
  }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
    a.stopPropagation();
  }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown);
}(jQuery), +function (a) {
  "use strict";
  function b(b, d) {
    return this.each(function () {
      var e = a(this),
          f = e.data("bs.modal"),
          g = a.extend({}, c.DEFAULTS, e.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b);f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d);
    });
  }var c = function c(b, _c2) {
    this.options = _c2, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
      this.$element.trigger("loaded.bs.modal");
    }, this));
  };c.VERSION = "3.3.5", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }, c.prototype.toggle = function (a) {
    return this.isShown ? this.hide() : this.show(a);
  }, c.prototype.show = function (b) {
    var d = this,
        e = a.Event("show.bs.modal", { relatedTarget: b });this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
      d.$element.one("mouseup.dismiss.bs.modal", function (b) {
        a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
      });
    }), this.backdrop(function () {
      var e = a.support.transition && d.$element.hasClass("fade");d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();var f = a.Event("shown.bs.modal", { relatedTarget: b });e ? d.$dialog.one("bsTransitionEnd", function () {
        d.$element.trigger("focus").trigger(f);
      }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f);
    }));
  }, c.prototype.hide = function (b) {
    b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());
  }, c.prototype.enforceFocus = function () {
    a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
      this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
    }, this));
  }, c.prototype.escape = function () {
    this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
      27 == a.which && this.hide();
    }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
  }, c.prototype.resize = function () {
    this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal");
  }, c.prototype.hideModal = function () {
    var a = this;this.$element.hide(), this.backdrop(function () {
      a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal");
    });
  }, c.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
  }, c.prototype.backdrop = function (b) {
    var d = this,
        e = this.$element.hasClass("fade") ? "fade" : "";if (this.isShown && this.options.backdrop) {
      var f = a.support.transition && e;if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
        return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
      }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass("in");var g = function g() {
        d.removeBackdrop(), b && b();
      };a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();
    } else b && b();
  }, c.prototype.handleUpdate = function () {
    this.adjustDialog();
  }, c.prototype.adjustDialog = function () {
    var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;this.$element.css({ paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : "" });
  }, c.prototype.resetAdjustments = function () {
    this.$element.css({ paddingLeft: "", paddingRight: "" });
  }, c.prototype.checkScrollbar = function () {
    var a = window.innerWidth;if (!a) {
      var b = document.documentElement.getBoundingClientRect();a = b.right - Math.abs(b.left);
    }this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar();
  }, c.prototype.setScrollbar = function () {
    var a = parseInt(this.$body.css("padding-right") || 0, 10);this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth);
  }, c.prototype.resetScrollbar = function () {
    this.$body.css("padding-right", this.originalBodyPad);
  }, c.prototype.measureScrollbar = function () {
    var a = document.createElement("div");a.className = "modal-scrollbar-measure", this.$body.append(a);var b = a.offsetWidth - a.clientWidth;return this.$body[0].removeChild(a), b;
  };var d = a.fn.modal;a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
    return a.fn.modal = d, this;
  }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
    var d = a(this),
        e = d.attr("href"),
        f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
        g = f.data("bs.modal") ? "toggle" : a.extend({ remote: !/#/.test(e) && e }, f.data(), d.data());d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
      a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
        d.is(":visible") && d.trigger("focus");
      });
    }), b.call(f, g, this);
  });
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.tooltip"),
          f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;(e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]());
    });
  }var c = function c(a, b) {
    this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b);
  };c.VERSION = "3.3.5", c.TRANSITION_DURATION = 150, c.DEFAULTS = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1, viewport: { selector: "body", padding: 0 } }, c.prototype.init = function (b, c, d) {
    if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = { click: !1, hover: !1, focus: !1 }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
      var g = e[f];if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));else if ("manual" != g) {
        var h = "hover" == g ? "mouseenter" : "focusin",
            i = "hover" == g ? "mouseleave" : "focusout";this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
      }
    }this.options.selector ? this._options = a.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle();
  }, c.prototype.getDefaults = function () {
    return c.DEFAULTS;
  }, c.prototype.getOptions = function (b) {
    return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = { show: b.delay, hide: b.delay }), b;
  }, c.prototype.getDelegateOptions = function () {
    var b = {},
        c = this.getDefaults();return this._options && a.each(this._options, function (a, d) {
      c[a] != d && (b[a] = d);
    }), b;
  }, c.prototype.enter = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void (c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {
      "in" == c.hoverState && c.show();
    }, c.options.delay.show)) : c.show());
  }, c.prototype.isInStateTrue = function () {
    for (var a in this.inState) {
      if (this.inState[a]) return !0;
    }return !1;
  }, c.prototype.leave = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {
      "out" == c.hoverState && c.hide();
    }, c.options.delay.hide)) : c.hide());
  }, c.prototype.show = function () {
    var b = a.Event("show.bs." + this.type);if (this.hasContent() && this.enabled) {
      this.$element.trigger(b);var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);if (b.isDefaultPrevented() || !d) return;var e = this,
          f = this.tip(),
          g = this.getUID(this.type);this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
          i = /\s?auto?\s?/i,
          j = i.test(h);j && (h = h.replace(i, "") || "top"), f.detach().css({ top: 0, left: 0, display: "block" }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);var k = this.getPosition(),
          l = f[0].offsetWidth,
          m = f[0].offsetHeight;if (j) {
        var n = h,
            o = this.getPosition(this.$viewport);h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h);
      }var p = this.getCalculatedOffset(h, k, l, m);this.applyPlacement(p, h);var q = function q() {
        var a = e.hoverState;e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e);
      };a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q();
    }
  }, c.prototype.applyPlacement = function (b, c) {
    var d = this.tip(),
        e = d[0].offsetWidth,
        f = d[0].offsetHeight,
        g = parseInt(d.css("margin-top"), 10),
        h = parseInt(d.css("margin-left"), 10);isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({ using: function using(a) {
        d.css({ top: Math.round(a.top), left: Math.round(a.left) });
      } }, b), 0), d.addClass("in");var i = d[0].offsetWidth,
        j = d[0].offsetHeight;"top" == c && j != f && (b.top = b.top + f - j);var k = this.getViewportAdjustedDelta(c, b, i, j);k.left ? b.left += k.left : b.top += k.top;var l = /top|bottom/.test(c),
        m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
        n = l ? "offsetWidth" : "offsetHeight";d.offset(b), this.replaceArrow(m, d[0][n], l);
  }, c.prototype.replaceArrow = function (a, b, c) {
    this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "");
  }, c.prototype.setContent = function () {
    var a = this.tip(),
        b = this.getTitle();a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
  }, c.prototype.hide = function (b) {
    function d() {
      "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b();
    }var e = this,
        f = a(this.$tip),
        g = a.Event("hide.bs." + this.type);return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this);
  }, c.prototype.fixTitle = function () {
    var a = this.$element;(a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
  }, c.prototype.hasContent = function () {
    return this.getTitle();
  }, c.prototype.getPosition = function (b) {
    b = b || this.$element;var c = b[0],
        d = "BODY" == c.tagName,
        e = c.getBoundingClientRect();null == e.width && (e = a.extend({}, e, { width: e.right - e.left, height: e.bottom - e.top }));var f = d ? { top: 0, left: 0 } : b.offset(),
        g = { scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop() },
        h = d ? { width: a(window).width(), height: a(window).height() } : null;return a.extend({}, e, g, h, f);
  }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
    return "bottom" == a ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 } : "top" == a ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 } : "left" == a ? { top: b.top + b.height / 2 - d / 2, left: b.left - c } : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width };
  }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
    var e = { top: 0, left: 0 };if (!this.$viewport) return e;var f = this.options.viewport && this.options.viewport.padding || 0,
        g = this.getPosition(this.$viewport);if (/right|left/.test(a)) {
      var h = b.top - f - g.scroll,
          i = b.top + f - g.scroll + d;h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
    } else {
      var j = b.left - f,
          k = b.left + f + c;j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k);
    }return e;
  }, c.prototype.getTitle = function () {
    var a,
        b = this.$element,
        c = this.options;return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
  }, c.prototype.getUID = function (a) {
    do {
      a += ~~(1e6 * Math.random());
    } while (document.getElementById(a));return a;
  }, c.prototype.tip = function () {
    if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");return this.$tip;
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
  }, c.prototype.enable = function () {
    this.enabled = !0;
  }, c.prototype.disable = function () {
    this.enabled = !1;
  }, c.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  }, c.prototype.toggle = function (b) {
    var c = this;b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
  }, c.prototype.destroy = function () {
    var a = this;clearTimeout(this.timeout), this.hide(function () {
      a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null;
    });
  };var d = a.fn.tooltip;a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
    return a.fn.tooltip = d, this;
  };
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.popover"),
          f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;(e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]());
    });
  }var c = function c(a, b) {
    this.init("popover", a, b);
  };if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");c.VERSION = "3.3.5", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
    return c.DEFAULTS;
  }, c.prototype.setContent = function () {
    var a = this.tip(),
        b = this.getTitle(),
        c = this.getContent();a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
  }, c.prototype.hasContent = function () {
    return this.getTitle() || this.getContent();
  }, c.prototype.getContent = function () {
    var a = this.$element,
        b = this.options;return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".arrow");
  };var d = a.fn.popover;a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
    return a.fn.popover = d, this;
  };
}(jQuery), +function (a) {
  "use strict";
  function b(c, d) {
    this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process();
  }function c(c) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.scrollspy"),
          f = "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) && c;e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
    });
  }b.VERSION = "3.3.5", b.DEFAULTS = { offset: 10 }, b.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  }, b.prototype.refresh = function () {
    var b = this,
        c = "offset",
        d = 0;this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
      var b = a(this),
          e = b.data("target") || b.attr("href"),
          f = /^#./.test(e) && a(e);return f && f.length && f.is(":visible") && [[f[c]().top + d, e]] || null;
    }).sort(function (a, b) {
      return a[0] - b[0];
    }).each(function () {
      b.offsets.push(this[0]), b.targets.push(this[1]);
    });
  }, b.prototype.process = function () {
    var a,
        b = this.$scrollElement.scrollTop() + this.options.offset,
        c = this.getScrollHeight(),
        d = this.options.offset + c - this.$scrollElement.height(),
        e = this.offsets,
        f = this.targets,
        g = this.activeTarget;if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);if (g && b < e[0]) return this.activeTarget = null, this.clear();for (a = e.length; a--;) {
      g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);
    }
  }, b.prototype.activate = function (b) {
    this.activeTarget = b, this.clear();var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
        d = a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy");
  }, b.prototype.clear = function () {
    a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
  };var d = a.fn.scrollspy;a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
    return a.fn.scrollspy = d, this;
  }, a(window).on("load.bs.scrollspy.data-api", function () {
    a('[data-spy="scroll"]').each(function () {
      var b = a(this);c.call(b, b.data());
    });
  });
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.tab");e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]();
    });
  }var c = function c(b) {
    this.element = a(b);
  };c.VERSION = "3.3.5", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
    var b = this.element,
        c = b.closest("ul:not(.dropdown-menu)"),
        d = b.data("target");if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
      var e = c.find(".active:last a"),
          f = a.Event("hide.bs.tab", { relatedTarget: b[0] }),
          g = a.Event("show.bs.tab", { relatedTarget: e[0] });if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
        var h = a(d);this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
          e.trigger({ type: "hidden.bs.tab", relatedTarget: b[0] }), b.trigger({ type: "shown.bs.tab", relatedTarget: e[0] });
        });
      }
    }
  }, c.prototype.activate = function (b, d, e) {
    function f() {
      g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e();
    }var g = d.find("> .active"),
        h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in");
  };var d = a.fn.tab;a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
    return a.fn.tab = d, this;
  };var e = function e(c) {
    c.preventDefault(), b.call(a(this), "show");
  };a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.affix"),
          f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]();
    });
  }var c = function c(b, d) {
    this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition();
  };c.VERSION = "3.3.5", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = { offset: 0, target: window }, c.prototype.getState = function (a, b, c, d) {
    var e = this.$target.scrollTop(),
        f = this.$element.offset(),
        g = this.$target.height();if (null != c && "top" == this.affixed) return c > e ? "top" : !1;if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";var h = null == this.affixed,
        i = h ? e : f.top,
        j = h ? g : b;return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1;
  }, c.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a = this.$target.scrollTop(),
        b = this.$element.offset();return this.pinnedOffset = b.top - a;
  }, c.prototype.checkPositionWithEventLoop = function () {
    setTimeout(a.proxy(this.checkPosition, this), 1);
  }, c.prototype.checkPosition = function () {
    if (this.$element.is(":visible")) {
      var b = this.$element.height(),
          d = this.options.offset,
          e = d.top,
          f = d.bottom,
          g = Math.max(a(document).height(), a(document.body).height());"object" != (typeof d === "undefined" ? "undefined" : _typeof(d)) && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));var h = this.getState(g, b, e, f);if (this.affixed != h) {
        null != this.unpin && this.$element.css("top", "");var i = "affix" + (h ? "-" + h : ""),
            j = a.Event(i + ".bs.affix");if (this.$element.trigger(j), j.isDefaultPrevented()) return;this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix");
      }"bottom" == h && this.$element.offset({ top: g - b - f });
    }
  };var d = a.fn.affix;a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
    return a.fn.affix = d, this;
  }, a(window).on("load", function () {
    a('[data-spy="affix"]').each(function () {
      var c = a(this),
          d = c.data();d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
    });
  });
}(jQuery);
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery UI - v1.12.1 - 2016-09-14
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/draggable.js, widgets/droppable.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/resizable.js, widgets/selectable.js, widgets/selectmenu.js, widgets/slider.js, widgets/sortable.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (t) {
  function e(t) {
    for (var e = t.css("visibility"); "inherit" === e;) {
      t = t.parent(), e = t.css("visibility");
    }return "hidden" !== e;
  }function i(t) {
    for (var e, i; t.length && t[0] !== document;) {
      if (e = t.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (i = parseInt(t.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;t = t.parent();
    }return 0;
  }function s() {
    this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = { closeText: "Done", prevText: "Prev", nextText: "Next", currentText: "Today", monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekHeader: "Wk", dateFormat: "mm/dd/yy", firstDay: 0, isRTL: !1, showMonthAfterYear: !1, yearSuffix: "" }, this._defaults = { showOn: "focus", showAnim: "fadeIn", showOptions: {}, defaultDate: null, appendText: "", buttonText: "...", buttonImage: "", buttonImageOnly: !1, hideIfNoPrevNext: !1, navigationAsDateFormat: !1, gotoCurrent: !1, changeMonth: !1, changeYear: !1, yearRange: "c-10:c+10", showOtherMonths: !1, selectOtherMonths: !1, showWeek: !1, calculateWeek: this.iso8601Week, shortYearCutoff: "+10", minDate: null, maxDate: null, duration: "fast", beforeShowDay: null, beforeShow: null, onSelect: null, onChangeMonthYear: null, onClose: null, numberOfMonths: 1, showCurrentAtPos: 0, stepMonths: 1, stepBigMonths: 12, altField: "", altFormat: "", constrainInput: !0, showButtonPanel: !1, autoSize: !1, disabled: !1 }, t.extend(this._defaults, this.regional[""]), this.regional.en = t.extend(!0, {}, this.regional[""]), this.regional["en-US"] = t.extend(!0, {}, this.regional.en), this.dpDiv = n(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
  }function n(e) {
    var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.on("mouseout", i, function () {
      t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover");
    }).on("mouseover", i, o);
  }function o() {
    t.datepicker._isDisabledDatepicker(m.inline ? m.dpDiv.parent()[0] : m.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"));
  }function a(e, i) {
    t.extend(e, i);for (var s in i) {
      null == i[s] && (e[s] = i[s]);
    }return e;
  }function r(t) {
    return function () {
      var e = this.element.val();t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change");
    };
  }t.ui = t.ui || {}, t.ui.version = "1.12.1";var h = 0,
      l = Array.prototype.slice;t.cleanData = function (e) {
    return function (i) {
      var s, n, o;for (o = 0; null != (n = i[o]); o++) {
        try {
          s = t._data(n, "events"), s && s.remove && t(n).triggerHandler("remove");
        } catch (a) {}
      }e(i);
    };
  }(t.cleanData), t.widget = function (e, i, s) {
    var n,
        o,
        a,
        r = {},
        h = e.split(".")[0];e = e.split(".")[1];var l = h + "-" + e;return s || (s = i, i = t.Widget), t.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))), t.expr[":"][l.toLowerCase()] = function (e) {
      return !!t.data(e, l);
    }, t[h] = t[h] || {}, n = t[h][e], o = t[h][e] = function (t, e) {
      return this._createWidget ? (arguments.length && this._createWidget(t, e), void 0) : new o(t, e);
    }, t.extend(o, n, { version: s.version, _proto: t.extend({}, s), _childConstructors: [] }), a = new i(), a.options = t.widget.extend({}, a.options), t.each(s, function (e, s) {
      return t.isFunction(s) ? (r[e] = function () {
        function t() {
          return i.prototype[e].apply(this, arguments);
        }function n(t) {
          return i.prototype[e].apply(this, t);
        }return function () {
          var e,
              i = this._super,
              o = this._superApply;return this._super = t, this._superApply = n, e = s.apply(this, arguments), this._super = i, this._superApply = o, e;
        };
      }(), void 0) : (r[e] = s, void 0);
    }), o.prototype = t.widget.extend(a, { widgetEventPrefix: n ? a.widgetEventPrefix || e : e }, r, { constructor: o, namespace: h, widgetName: e, widgetFullName: l }), n ? (t.each(n._childConstructors, function (e, i) {
      var s = i.prototype;t.widget(s.namespace + "." + s.widgetName, o, i._proto);
    }), delete n._childConstructors) : i._childConstructors.push(o), t.widget.bridge(e, o), o;
  }, t.widget.extend = function (e) {
    for (var i, s, n = l.call(arguments, 1), o = 0, a = n.length; a > o; o++) {
      for (i in n[o]) {
        s = n[o][i], n[o].hasOwnProperty(i) && void 0 !== s && (e[i] = t.isPlainObject(s) ? t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], s) : t.widget.extend({}, s) : s);
      }
    }return e;
  }, t.widget.bridge = function (e, i) {
    var s = i.prototype.widgetFullName || e;t.fn[e] = function (n) {
      var o = "string" == typeof n,
          a = l.call(arguments, 1),
          r = this;return o ? this.length || "instance" !== n ? this.each(function () {
        var i,
            o = t.data(this, s);return "instance" === n ? (r = o, !1) : o ? t.isFunction(o[n]) && "_" !== n.charAt(0) ? (i = o[n].apply(o, a), i !== o && void 0 !== i ? (r = i && i.jquery ? r.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + n + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; " + "attempted to call method '" + n + "'");
      }) : r = void 0 : (a.length && (n = t.widget.extend.apply(null, [n].concat(a))), this.each(function () {
        var e = t.data(this, s);e ? (e.option(n || {}), e._init && e._init()) : t.data(this, s, new i(n, this));
      })), r;
    };
  }, t.Widget = function () {}, t.Widget._childConstructors = [], t.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: { classes: {}, disabled: !1, create: null }, _createWidget: function _createWidget(e, i) {
      i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = h++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), this.classesElementLookup = {}, i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, { remove: function remove(t) {
          t.target === i && this.destroy();
        } }), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init();
    }, _getCreateOptions: function _getCreateOptions() {
      return {};
    }, _getCreateEventData: t.noop, _create: t.noop, _init: t.noop, destroy: function destroy() {
      var e = this;this._destroy(), t.each(this.classesElementLookup, function (t, i) {
        e._removeClass(i, t);
      }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace);
    }, _destroy: t.noop, widget: function widget() {
      return this.element;
    }, option: function option(e, i) {
      var s,
          n,
          o,
          a = e;if (0 === arguments.length) return t.widget.extend({}, this.options);if ("string" == typeof e) if (a = {}, s = e.split("."), e = s.shift(), s.length) {
        for (n = a[e] = t.widget.extend({}, this.options[e]), o = 0; s.length - 1 > o; o++) {
          n[s[o]] = n[s[o]] || {}, n = n[s[o]];
        }if (e = s.pop(), 1 === arguments.length) return void 0 === n[e] ? null : n[e];n[e] = i;
      } else {
        if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];a[e] = i;
      }return this._setOptions(a), this;
    }, _setOptions: function _setOptions(t) {
      var e;for (e in t) {
        this._setOption(e, t[e]);
      }return this;
    }, _setOption: function _setOption(t, e) {
      return "classes" === t && this._setOptionClasses(e), this.options[t] = e, "disabled" === t && this._setOptionDisabled(e), this;
    }, _setOptionClasses: function _setOptionClasses(e) {
      var i, s, n;for (i in e) {
        n = this.classesElementLookup[i], e[i] !== this.options.classes[i] && n && n.length && (s = t(n.get()), this._removeClass(n, i), s.addClass(this._classes({ element: s, keys: i, classes: e, add: !0 })));
      }
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"));
    }, enable: function enable() {
      return this._setOptions({ disabled: !1 });
    }, disable: function disable() {
      return this._setOptions({ disabled: !0 });
    }, _classes: function _classes(e) {
      function i(i, o) {
        var a, r;for (r = 0; i.length > r; r++) {
          a = n.classesElementLookup[i[r]] || t(), a = e.add ? t(t.unique(a.get().concat(e.element.get()))) : t(a.not(e.element).get()), n.classesElementLookup[i[r]] = a, s.push(i[r]), o && e.classes[i[r]] && s.push(e.classes[i[r]]);
        }
      }var s = [],
          n = this;return e = t.extend({ element: this.element, classes: this.options.classes || {} }, e), this._on(e.element, { remove: "_untrackClassesElement" }), e.keys && i(e.keys.match(/\S+/g) || [], !0), e.extra && i(e.extra.match(/\S+/g) || []), s.join(" ");
    }, _untrackClassesElement: function _untrackClassesElement(e) {
      var i = this;t.each(i.classesElementLookup, function (s, n) {
        -1 !== t.inArray(e.target, n) && (i.classesElementLookup[s] = t(n.not(e.target).get()));
      });
    }, _removeClass: function _removeClass(t, e, i) {
      return this._toggleClass(t, e, i, !1);
    }, _addClass: function _addClass(t, e, i) {
      return this._toggleClass(t, e, i, !0);
    }, _toggleClass: function _toggleClass(t, e, i, s) {
      s = "boolean" == typeof s ? s : i;var n = "string" == typeof t || null === t,
          o = { extra: n ? e : i, keys: n ? t : e, element: n ? this.element : t, add: s };return o.element.toggleClass(this._classes(o), s), this;
    }, _on: function _on(e, i, s) {
      var n,
          o = this;"boolean" != typeof e && (s = i, i = e, e = !1), s ? (i = n = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), t.each(s, function (s, a) {
        function r() {
          return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0;
        }"string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);var h = s.match(/^([\w:-]*)\s*(.*)$/),
            l = h[1] + o.eventNamespace,
            c = h[2];c ? n.on(l, c, r) : i.on(l, r);
      });
    }, _off: function _off(e, i) {
      i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.off(i).off(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get());
    }, _delay: function _delay(t, e) {
      function i() {
        return ("string" == typeof t ? s[t] : t).apply(s, arguments);
      }var s = this;return setTimeout(i, e || 0);
    }, _hoverable: function _hoverable(e) {
      this.hoverable = this.hoverable.add(e), this._on(e, { mouseenter: function mouseenter(e) {
          this._addClass(t(e.currentTarget), null, "ui-state-hover");
        }, mouseleave: function mouseleave(e) {
          this._removeClass(t(e.currentTarget), null, "ui-state-hover");
        } });
    }, _focusable: function _focusable(e) {
      this.focusable = this.focusable.add(e), this._on(e, { focusin: function focusin(e) {
          this._addClass(t(e.currentTarget), null, "ui-state-focus");
        }, focusout: function focusout(e) {
          this._removeClass(t(e.currentTarget), null, "ui-state-focus");
        } });
    }, _trigger: function _trigger(e, i, s) {
      var n,
          o,
          a = this.options[e];if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent) for (n in o) {
        n in i || (i[n] = o[n]);
      }return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented());
    } }, t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, i) {
    t.Widget.prototype["_" + e] = function (s, n, o) {
      "string" == typeof n && (n = { effect: n });var a,
          r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;n = n || {}, "number" == typeof n && (n = { duration: n }), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function (i) {
        t(this)[e](), o && o.call(s[0]), i();
      });
    };
  }), t.widget, function () {
    function e(t, e, i) {
      return [parseFloat(t[0]) * (u.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (u.test(t[1]) ? i / 100 : 1)];
    }function i(e, i) {
      return parseInt(t.css(e, i), 10) || 0;
    }function s(e) {
      var i = e[0];return 9 === i.nodeType ? { width: e.width(), height: e.height(), offset: { top: 0, left: 0 } } : t.isWindow(i) ? { width: e.width(), height: e.height(), offset: { top: e.scrollTop(), left: e.scrollLeft() } } : i.preventDefault ? { width: 0, height: 0, offset: { top: i.pageY, left: i.pageX } } : { width: e.outerWidth(), height: e.outerHeight(), offset: e.offset() };
    }var n,
        o = Math.max,
        a = Math.abs,
        r = /left|center|right/,
        h = /top|center|bottom/,
        l = /[\+\-]\d+(\.[\d]+)?%?/,
        c = /^\w+/,
        u = /%$/,
        d = t.fn.position;t.position = { scrollbarWidth: function scrollbarWidth() {
        if (void 0 !== n) return n;var e,
            i,
            s = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
            o = s.children()[0];return t("body").append(s), e = o.offsetWidth, s.css("overflow", "scroll"), i = o.offsetWidth, e === i && (i = s[0].clientWidth), s.remove(), n = e - i;
      }, getScrollInfo: function getScrollInfo(e) {
        var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
            s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
            n = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
            o = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight;return { width: o ? t.position.scrollbarWidth() : 0, height: n ? t.position.scrollbarWidth() : 0 };
      }, getWithinInfo: function getWithinInfo(e) {
        var i = t(e || window),
            s = t.isWindow(i[0]),
            n = !!i[0] && 9 === i[0].nodeType,
            o = !s && !n;return { element: i, isWindow: s, isDocument: n, offset: o ? t(e).offset() : { left: 0, top: 0 }, scrollLeft: i.scrollLeft(), scrollTop: i.scrollTop(), width: i.outerWidth(), height: i.outerHeight() };
      } }, t.fn.position = function (n) {
      if (!n || !n.of) return d.apply(this, arguments);n = t.extend({}, n);var u,
          p,
          f,
          g,
          m,
          _,
          v = t(n.of),
          b = t.position.getWithinInfo(n.within),
          y = t.position.getScrollInfo(b),
          w = (n.collision || "flip").split(" "),
          k = {};return _ = s(v), v[0].preventDefault && (n.at = "left top"), p = _.width, f = _.height, g = _.offset, m = t.extend({}, g), t.each(["my", "at"], function () {
        var t,
            e,
            i = (n[this] || "").split(" ");1 === i.length && (i = r.test(i[0]) ? i.concat(["center"]) : h.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = r.test(i[0]) ? i[0] : "center", i[1] = h.test(i[1]) ? i[1] : "center", t = l.exec(i[0]), e = l.exec(i[1]), k[this] = [t ? t[0] : 0, e ? e[0] : 0], n[this] = [c.exec(i[0])[0], c.exec(i[1])[0]];
      }), 1 === w.length && (w[1] = w[0]), "right" === n.at[0] ? m.left += p : "center" === n.at[0] && (m.left += p / 2), "bottom" === n.at[1] ? m.top += f : "center" === n.at[1] && (m.top += f / 2), u = e(k.at, p, f), m.left += u[0], m.top += u[1], this.each(function () {
        var s,
            r,
            h = t(this),
            l = h.outerWidth(),
            c = h.outerHeight(),
            d = i(this, "marginLeft"),
            _ = i(this, "marginTop"),
            x = l + d + i(this, "marginRight") + y.width,
            C = c + _ + i(this, "marginBottom") + y.height,
            D = t.extend({}, m),
            I = e(k.my, h.outerWidth(), h.outerHeight());"right" === n.my[0] ? D.left -= l : "center" === n.my[0] && (D.left -= l / 2), "bottom" === n.my[1] ? D.top -= c : "center" === n.my[1] && (D.top -= c / 2), D.left += I[0], D.top += I[1], s = { marginLeft: d, marginTop: _ }, t.each(["left", "top"], function (e, i) {
          t.ui.position[w[e]] && t.ui.position[w[e]][i](D, { targetWidth: p, targetHeight: f, elemWidth: l, elemHeight: c, collisionPosition: s, collisionWidth: x, collisionHeight: C, offset: [u[0] + I[0], u[1] + I[1]], my: n.my, at: n.at, within: b, elem: h });
        }), n.using && (r = function r(t) {
          var e = g.left - D.left,
              i = e + p - l,
              s = g.top - D.top,
              r = s + f - c,
              u = { target: { element: v, left: g.left, top: g.top, width: p, height: f }, element: { element: h, left: D.left, top: D.top, width: l, height: c }, horizontal: 0 > i ? "left" : e > 0 ? "right" : "center", vertical: 0 > r ? "top" : s > 0 ? "bottom" : "middle" };l > p && p > a(e + i) && (u.horizontal = "center"), c > f && f > a(s + r) && (u.vertical = "middle"), u.important = o(a(e), a(i)) > o(a(s), a(r)) ? "horizontal" : "vertical", n.using.call(this, t, u);
        }), h.offset(t.extend(D, { using: r }));
      });
    }, t.ui.position = { fit: { left: function left(t, e) {
          var i,
              s = e.within,
              n = s.isWindow ? s.scrollLeft : s.offset.left,
              a = s.width,
              r = t.left - e.collisionPosition.marginLeft,
              h = n - r,
              l = r + e.collisionWidth - a - n;e.collisionWidth > a ? h > 0 && 0 >= l ? (i = t.left + h + e.collisionWidth - a - n, t.left += h - i) : t.left = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionWidth : n : h > 0 ? t.left += h : l > 0 ? t.left -= l : t.left = o(t.left - r, t.left);
        }, top: function top(t, e) {
          var i,
              s = e.within,
              n = s.isWindow ? s.scrollTop : s.offset.top,
              a = e.within.height,
              r = t.top - e.collisionPosition.marginTop,
              h = n - r,
              l = r + e.collisionHeight - a - n;e.collisionHeight > a ? h > 0 && 0 >= l ? (i = t.top + h + e.collisionHeight - a - n, t.top += h - i) : t.top = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionHeight : n : h > 0 ? t.top += h : l > 0 ? t.top -= l : t.top = o(t.top - r, t.top);
        } }, flip: { left: function left(t, e) {
          var i,
              s,
              n = e.within,
              o = n.offset.left + n.scrollLeft,
              r = n.width,
              h = n.isWindow ? n.scrollLeft : n.offset.left,
              l = t.left - e.collisionPosition.marginLeft,
              c = l - h,
              u = l + e.collisionWidth - r - h,
              d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
              p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
              f = -2 * e.offset[0];0 > c ? (i = t.left + d + p + f + e.collisionWidth - r - o, (0 > i || a(c) > i) && (t.left += d + p + f)) : u > 0 && (s = t.left - e.collisionPosition.marginLeft + d + p + f - h, (s > 0 || u > a(s)) && (t.left += d + p + f));
        }, top: function top(t, e) {
          var i,
              s,
              n = e.within,
              o = n.offset.top + n.scrollTop,
              r = n.height,
              h = n.isWindow ? n.scrollTop : n.offset.top,
              l = t.top - e.collisionPosition.marginTop,
              c = l - h,
              u = l + e.collisionHeight - r - h,
              d = "top" === e.my[1],
              p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
              f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
              g = -2 * e.offset[1];0 > c ? (s = t.top + p + f + g + e.collisionHeight - r - o, (0 > s || a(c) > s) && (t.top += p + f + g)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + g - h, (i > 0 || u > a(i)) && (t.top += p + f + g));
        } }, flipfit: { left: function left() {
          t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments);
        }, top: function top() {
          t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments);
        } } };
  }(), t.ui.position, t.extend(t.expr[":"], { data: t.expr.createPseudo ? t.expr.createPseudo(function (e) {
      return function (i) {
        return !!t.data(i, e);
      };
    }) : function (e, i, s) {
      return !!t.data(e, s[3]);
    } }), t.fn.extend({ disableSelection: function () {
      var t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";return function () {
        return this.on(t + ".ui-disableSelection", function (t) {
          t.preventDefault();
        });
      };
    }(), enableSelection: function enableSelection() {
      return this.off(".ui-disableSelection");
    } });var c = "ui-effects-",
      u = "ui-effects-style",
      d = "ui-effects-animated",
      p = t;t.effects = { effect: {} }, function (t, e) {
    function i(t, e, i) {
      var s = u[e.type] || {};return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : 0 > t ? 0 : t > s.max ? s.max : t);
    }function s(i) {
      var s = l(),
          n = s._rgba = [];return i = i.toLowerCase(), f(h, function (t, o) {
        var a,
            r = o.re.exec(i),
            h = r && o.parse(r),
            l = o.space || "rgba";return h ? (a = s[l](h), s[c[l].cache] = a[c[l].cache], n = s._rgba = a._rgba, !1) : e;
      }), n.length ? ("0,0,0,0" === n.join() && t.extend(n, o.transparent), s) : o[i];
    }function n(t, e, i) {
      return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t;
    }var o,
        a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
        r = /^([\-+])=\s*(\d+\.?\d*)/,
        h = [{ re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function parse(t) {
        return [t[1], t[2], t[3], t[4]];
      } }, { re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function parse(t) {
        return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
      } }, { re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function parse(t) {
        return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)];
      } }, { re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function parse(t) {
        return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)];
      } }, { re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, space: "hsla", parse: function parse(t) {
        return [t[1], t[2] / 100, t[3] / 100, t[4]];
      } }],
        l = t.Color = function (e, i, s, n) {
      return new t.Color.fn.parse(e, i, s, n);
    },
        c = { rgba: { props: { red: { idx: 0, type: "byte" }, green: { idx: 1, type: "byte" }, blue: { idx: 2, type: "byte" } } }, hsla: { props: { hue: { idx: 0, type: "degrees" }, saturation: { idx: 1, type: "percent" }, lightness: { idx: 2, type: "percent" } } } },
        u = { "byte": { floor: !0, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: !0 } },
        d = l.support = {},
        p = t("<p>")[0],
        f = t.each;p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function (t, e) {
      e.cache = "_" + t, e.props.alpha = { idx: 3, type: "percent", def: 1 };
    }), l.fn = t.extend(l.prototype, { parse: function parse(n, a, r, h) {
        if (n === e) return this._rgba = [null, null, null, null], this;(n.jquery || n.nodeType) && (n = t(n).css(a), a = e);var u = this,
            d = t.type(n),
            p = this._rgba = [];return a !== e && (n = [n, a, r, h], d = "array"), "string" === d ? this.parse(s(n) || o._default) : "array" === d ? (f(c.rgba.props, function (t, e) {
          p[e.idx] = i(n[e.idx], e);
        }), this) : "object" === d ? (n instanceof l ? f(c, function (t, e) {
          n[e.cache] && (u[e.cache] = n[e.cache].slice());
        }) : f(c, function (e, s) {
          var o = s.cache;f(s.props, function (t, e) {
            if (!u[o] && s.to) {
              if ("alpha" === t || null == n[t]) return;u[o] = s.to(u._rgba);
            }u[o][e.idx] = i(n[t], e, !0);
          }), u[o] && 0 > t.inArray(null, u[o].slice(0, 3)) && (u[o][3] = 1, s.from && (u._rgba = s.from(u[o])));
        }), this) : e;
      }, is: function is(t) {
        var i = l(t),
            s = !0,
            n = this;return f(c, function (t, o) {
          var a,
              r = i[o.cache];return r && (a = n[o.cache] || o.to && o.to(n._rgba) || [], f(o.props, function (t, i) {
            return null != r[i.idx] ? s = r[i.idx] === a[i.idx] : e;
          })), s;
        }), s;
      }, _space: function _space() {
        var t = [],
            e = this;return f(c, function (i, s) {
          e[s.cache] && t.push(i);
        }), t.pop();
      }, transition: function transition(t, e) {
        var s = l(t),
            n = s._space(),
            o = c[n],
            a = 0 === this.alpha() ? l("transparent") : this,
            r = a[o.cache] || o.to(a._rgba),
            h = r.slice();return s = s[o.cache], f(o.props, function (t, n) {
          var o = n.idx,
              a = r[o],
              l = s[o],
              c = u[n.type] || {};null !== l && (null === a ? h[o] = l : (c.mod && (l - a > c.mod / 2 ? a += c.mod : a - l > c.mod / 2 && (a -= c.mod)), h[o] = i((l - a) * e + a, n)));
        }), this[n](h);
      }, blend: function blend(e) {
        if (1 === this._rgba[3]) return this;var i = this._rgba.slice(),
            s = i.pop(),
            n = l(e)._rgba;return l(t.map(i, function (t, e) {
          return (1 - s) * n[e] + s * t;
        }));
      }, toRgbaString: function toRgbaString() {
        var e = "rgba(",
            i = t.map(this._rgba, function (t, e) {
          return null == t ? e > 2 ? 1 : 0 : t;
        });return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")";
      }, toHslaString: function toHslaString() {
        var e = "hsla(",
            i = t.map(this.hsla(), function (t, e) {
          return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t;
        });return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")";
      }, toHexString: function toHexString(e) {
        var i = this._rgba.slice(),
            s = i.pop();return e && i.push(~~(255 * s)), "#" + t.map(i, function (t) {
          return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t;
        }).join("");
      }, toString: function toString() {
        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
      } }), l.fn.parse.prototype = l.fn, c.hsla.to = function (t) {
      if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];var e,
          i,
          s = t[0] / 255,
          n = t[1] / 255,
          o = t[2] / 255,
          a = t[3],
          r = Math.max(s, n, o),
          h = Math.min(s, n, o),
          l = r - h,
          c = r + h,
          u = .5 * c;return e = h === r ? 0 : s === r ? 60 * (n - o) / l + 360 : n === r ? 60 * (o - s) / l + 120 : 60 * (s - n) / l + 240, i = 0 === l ? 0 : .5 >= u ? l / c : l / (2 - c), [Math.round(e) % 360, i, u, null == a ? 1 : a];
    }, c.hsla.from = function (t) {
      if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];var e = t[0] / 360,
          i = t[1],
          s = t[2],
          o = t[3],
          a = .5 >= s ? s * (1 + i) : s + i - s * i,
          r = 2 * s - a;return [Math.round(255 * n(r, a, e + 1 / 3)), Math.round(255 * n(r, a, e)), Math.round(255 * n(r, a, e - 1 / 3)), o];
    }, f(c, function (s, n) {
      var o = n.props,
          a = n.cache,
          h = n.to,
          c = n.from;l.fn[s] = function (s) {
        if (h && !this[a] && (this[a] = h(this._rgba)), s === e) return this[a].slice();var n,
            r = t.type(s),
            u = "array" === r || "object" === r ? s : arguments,
            d = this[a].slice();return f(o, function (t, e) {
          var s = u["object" === r ? t : e.idx];null == s && (s = d[e.idx]), d[e.idx] = i(s, e);
        }), c ? (n = l(c(d)), n[a] = d, n) : l(d);
      }, f(o, function (e, i) {
        l.fn[e] || (l.fn[e] = function (n) {
          var o,
              a = t.type(n),
              h = "alpha" === e ? this._hsla ? "hsla" : "rgba" : s,
              l = this[h](),
              c = l[i.idx];return "undefined" === a ? c : ("function" === a && (n = n.call(this, c), a = t.type(n)), null == n && i.empty ? this : ("string" === a && (o = r.exec(n), o && (n = c + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))), l[i.idx] = n, this[h](l)));
        });
      });
    }), l.hook = function (e) {
      var i = e.split(" ");f(i, function (e, i) {
        t.cssHooks[i] = { set: function set(e, n) {
            var o,
                a,
                r = "";if ("transparent" !== n && ("string" !== t.type(n) || (o = s(n)))) {
              if (n = l(o || n), !d.rgba && 1 !== n._rgba[3]) {
                for (a = "backgroundColor" === i ? e.parentNode : e; ("" === r || "transparent" === r) && a && a.style;) {
                  try {
                    r = t.css(a, "backgroundColor"), a = a.parentNode;
                  } catch (h) {}
                }n = n.blend(r && "transparent" !== r ? r : "_default");
              }n = n.toRgbaString();
            }try {
              e.style[i] = n;
            } catch (h) {}
          } }, t.fx.step[i] = function (e) {
          e.colorInit || (e.start = l(e.elem, i), e.end = l(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos));
        };
      });
    }, l.hook(a), t.cssHooks.borderColor = { expand: function expand(t) {
        var e = {};return f(["Top", "Right", "Bottom", "Left"], function (i, s) {
          e["border" + s + "Color"] = t;
        }), e;
      } }, o = t.Color.names = { aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff", gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00", transparent: [null, null, null, 0], _default: "#ffffff" };
  }(p), function () {
    function e(e) {
      var i,
          s,
          n = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
          o = {};if (n && n.length && n[0] && n[n[0]]) for (s = n.length; s--;) {
        i = n[s], "string" == typeof n[i] && (o[t.camelCase(i)] = n[i]);
      } else for (i in n) {
        "string" == typeof n[i] && (o[i] = n[i]);
      }return o;
    }function i(e, i) {
      var s,
          o,
          a = {};for (s in i) {
        o = i[s], e[s] !== o && (n[s] || (t.fx.step[s] || !isNaN(parseFloat(o))) && (a[s] = o));
      }return a;
    }var s = ["add", "remove", "toggle"],
        n = { border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1 };t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (e, i) {
      t.fx.step[i] = function (t) {
        ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (p.style(t.elem, i, t.end), t.setAttr = !0);
      };
    }), t.fn.addBack || (t.fn.addBack = function (t) {
      return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
    }), t.effects.animateClass = function (n, o, a, r) {
      var h = t.speed(o, a, r);return this.queue(function () {
        var o,
            a = t(this),
            r = a.attr("class") || "",
            l = h.children ? a.find("*").addBack() : a;l = l.map(function () {
          var i = t(this);return { el: i, start: e(this) };
        }), o = function o() {
          t.each(s, function (t, e) {
            n[e] && a[e + "Class"](n[e]);
          });
        }, o(), l = l.map(function () {
          return this.end = e(this.el[0]), this.diff = i(this.start, this.end), this;
        }), a.attr("class", r), l = l.map(function () {
          var e = this,
              i = t.Deferred(),
              s = t.extend({}, h, { queue: !1, complete: function complete() {
              i.resolve(e);
            } });return this.el.animate(this.diff, s), i.promise();
        }), t.when.apply(t, l.get()).done(function () {
          o(), t.each(arguments, function () {
            var e = this.el;t.each(this.diff, function (t) {
              e.css(t, "");
            });
          }), h.complete.call(a[0]);
        });
      });
    }, t.fn.extend({ addClass: function (e) {
        return function (i, s, n, o) {
          return s ? t.effects.animateClass.call(this, { add: i }, s, n, o) : e.apply(this, arguments);
        };
      }(t.fn.addClass), removeClass: function (e) {
        return function (i, s, n, o) {
          return arguments.length > 1 ? t.effects.animateClass.call(this, { remove: i }, s, n, o) : e.apply(this, arguments);
        };
      }(t.fn.removeClass), toggleClass: function (e) {
        return function (i, s, n, o, a) {
          return "boolean" == typeof s || void 0 === s ? n ? t.effects.animateClass.call(this, s ? { add: i } : { remove: i }, n, o, a) : e.apply(this, arguments) : t.effects.animateClass.call(this, { toggle: i }, s, n, o);
        };
      }(t.fn.toggleClass), switchClass: function switchClass(e, i, s, n, o) {
        return t.effects.animateClass.call(this, { add: i, remove: e }, s, n, o);
      } });
  }(), function () {
    function e(e, i, s, n) {
      return t.isPlainObject(e) && (i = e, e = e.effect), e = { effect: e }, null == i && (i = {}), t.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (n = s, s = i, i = {}), t.isFunction(s) && (n = s, s = null), i && t.extend(e, i), s = s || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default, e.complete = n || i.complete, e;
    }function i(e) {
      return !e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) || e.effect ? !1 : !0 : !0;
    }function s(t, e) {
      var i = e.outerWidth(),
          s = e.outerHeight(),
          n = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,
          o = n.exec(t) || ["", 0, i, s, 0];return { top: parseFloat(o[1]) || 0, right: "auto" === o[2] ? i : parseFloat(o[2]), bottom: "auto" === o[3] ? s : parseFloat(o[3]), left: parseFloat(o[4]) || 0 };
    }t.expr && t.expr.filters && t.expr.filters.animated && (t.expr.filters.animated = function (e) {
      return function (i) {
        return !!t(i).data(d) || e(i);
      };
    }(t.expr.filters.animated)), t.uiBackCompat !== !1 && t.extend(t.effects, { save: function save(t, e) {
        for (var i = 0, s = e.length; s > i; i++) {
          null !== e[i] && t.data(c + e[i], t[0].style[e[i]]);
        }
      }, restore: function restore(t, e) {
        for (var i, s = 0, n = e.length; n > s; s++) {
          null !== e[s] && (i = t.data(c + e[s]), t.css(e[s], i));
        }
      }, setMode: function setMode(t, e) {
        return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e;
      }, createWrapper: function createWrapper(e) {
        if (e.parent().is(".ui-effects-wrapper")) return e.parent();var i = { width: e.outerWidth(!0), height: e.outerHeight(!0), "float": e.css("float") },
            s = t("<div></div>").addClass("ui-effects-wrapper").css({ fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0 }),
            n = { width: e.width(), height: e.height() },
            o = document.activeElement;try {
          o.id;
        } catch (a) {
          o = document.body;
        }return e.wrap(s), (e[0] === o || t.contains(e[0], o)) && t(o).trigger("focus"), s = e.parent(), "static" === e.css("position") ? (s.css({ position: "relative" }), e.css({ position: "relative" })) : (t.extend(i, { position: e.css("position"), zIndex: e.css("z-index") }), t.each(["top", "left", "bottom", "right"], function (t, s) {
          i[s] = e.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto");
        }), e.css({ position: "relative", top: 0, left: 0, right: "auto", bottom: "auto" })), e.css(n), s.css(i).show();
      }, removeWrapper: function removeWrapper(e) {
        var i = document.activeElement;return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).trigger("focus")), e;
      } }), t.extend(t.effects, { version: "1.12.1", define: function define(e, i, s) {
        return s || (s = i, i = "effect"), t.effects.effect[e] = s, t.effects.effect[e].mode = i, s;
      }, scaledDimensions: function scaledDimensions(t, e, i) {
        if (0 === e) return { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };var s = "horizontal" !== i ? (e || 100) / 100 : 1,
            n = "vertical" !== i ? (e || 100) / 100 : 1;return { height: t.height() * n, width: t.width() * s, outerHeight: t.outerHeight() * n, outerWidth: t.outerWidth() * s };
      }, clipToBox: function clipToBox(t) {
        return { width: t.clip.right - t.clip.left, height: t.clip.bottom - t.clip.top, left: t.clip.left, top: t.clip.top };
      }, unshift: function unshift(t, e, i) {
        var s = t.queue();e > 1 && s.splice.apply(s, [1, 0].concat(s.splice(e, i))), t.dequeue();
      }, saveStyle: function saveStyle(t) {
        t.data(u, t[0].style.cssText);
      }, restoreStyle: function restoreStyle(t) {
        t[0].style.cssText = t.data(u) || "", t.removeData(u);
      }, mode: function mode(t, e) {
        var i = t.is(":hidden");return "toggle" === e && (e = i ? "show" : "hide"), (i ? "hide" === e : "show" === e) && (e = "none"), e;
      }, getBaseline: function getBaseline(t, e) {
        var i, s;switch (t[0]) {case "top":
            i = 0;break;case "middle":
            i = .5;break;case "bottom":
            i = 1;break;default:
            i = t[0] / e.height;}switch (t[1]) {case "left":
            s = 0;break;case "center":
            s = .5;break;case "right":
            s = 1;break;default:
            s = t[1] / e.width;}return { x: s, y: i };
      }, createPlaceholder: function createPlaceholder(e) {
        var i,
            s = e.css("position"),
            n = e.position();return e.css({ marginTop: e.css("marginTop"), marginBottom: e.css("marginBottom"), marginLeft: e.css("marginLeft"), marginRight: e.css("marginRight") }).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()), /^(static|relative)/.test(s) && (s = "absolute", i = t("<" + e[0].nodeName + ">").insertAfter(e).css({ display: /^(inline|ruby)/.test(e.css("display")) ? "inline-block" : "block", visibility: "hidden", marginTop: e.css("marginTop"), marginBottom: e.css("marginBottom"), marginLeft: e.css("marginLeft"), marginRight: e.css("marginRight"), "float": e.css("float") }).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).addClass("ui-effects-placeholder"), e.data(c + "placeholder", i)), e.css({ position: s, left: n.left, top: n.top }), i;
      }, removePlaceholder: function removePlaceholder(t) {
        var e = c + "placeholder",
            i = t.data(e);i && (i.remove(), t.removeData(e));
      }, cleanUp: function cleanUp(e) {
        t.effects.restoreStyle(e), t.effects.removePlaceholder(e);
      }, setTransition: function setTransition(e, i, s, n) {
        return n = n || {}, t.each(i, function (t, i) {
          var o = e.cssUnit(i);o[0] > 0 && (n[i] = o[0] * s + o[1]);
        }), n;
      } }), t.fn.extend({ effect: function effect() {
        function i(e) {
          function i() {
            r.removeData(d), t.effects.cleanUp(r), "hide" === s.mode && r.hide(), a();
          }function a() {
            t.isFunction(h) && h.call(r[0]), t.isFunction(e) && e();
          }var r = t(this);s.mode = c.shift(), t.uiBackCompat === !1 || o ? "none" === s.mode ? (r[l](), a()) : n.call(r[0], s, i) : (r.is(":hidden") ? "hide" === l : "show" === l) ? (r[l](), a()) : n.call(r[0], s, a);
        }var s = e.apply(this, arguments),
            n = t.effects.effect[s.effect],
            o = n.mode,
            a = s.queue,
            r = a || "fx",
            h = s.complete,
            l = s.mode,
            c = [],
            u = function u(e) {
          var i = t(this),
              s = t.effects.mode(i, l) || o;i.data(d, !0), c.push(s), o && ("show" === s || s === o && "hide" === s) && i.show(), o && "none" === s || t.effects.saveStyle(i), t.isFunction(e) && e();
        };return t.fx.off || !n ? l ? this[l](s.duration, h) : this.each(function () {
          h && h.call(this);
        }) : a === !1 ? this.each(u).each(i) : this.queue(r, u).queue(r, i);
      }, show: function (t) {
        return function (s) {
          if (i(s)) return t.apply(this, arguments);var n = e.apply(this, arguments);return n.mode = "show", this.effect.call(this, n);
        };
      }(t.fn.show), hide: function (t) {
        return function (s) {
          if (i(s)) return t.apply(this, arguments);var n = e.apply(this, arguments);return n.mode = "hide", this.effect.call(this, n);
        };
      }(t.fn.hide), toggle: function (t) {
        return function (s) {
          if (i(s) || "boolean" == typeof s) return t.apply(this, arguments);var n = e.apply(this, arguments);return n.mode = "toggle", this.effect.call(this, n);
        };
      }(t.fn.toggle), cssUnit: function cssUnit(e) {
        var i = this.css(e),
            s = [];return t.each(["em", "px", "%", "pt"], function (t, e) {
          i.indexOf(e) > 0 && (s = [parseFloat(i), e]);
        }), s;
      }, cssClip: function cssClip(t) {
        return t ? this.css("clip", "rect(" + t.top + "px " + t.right + "px " + t.bottom + "px " + t.left + "px)") : s(this.css("clip"), this);
      }, transfer: function transfer(e, i) {
        var s = t(this),
            n = t(e.to),
            o = "fixed" === n.css("position"),
            a = t("body"),
            r = o ? a.scrollTop() : 0,
            h = o ? a.scrollLeft() : 0,
            l = n.offset(),
            c = { top: l.top - r, left: l.left - h, height: n.innerHeight(), width: n.innerWidth() },
            u = s.offset(),
            d = t("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(e.className).css({ top: u.top - r, left: u.left - h, height: s.innerHeight(), width: s.innerWidth(), position: o ? "fixed" : "absolute" }).animate(c, e.duration, e.easing, function () {
          d.remove(), t.isFunction(i) && i();
        });
      } }), t.fx.step.clip = function (e) {
      e.clipInit || (e.start = t(e.elem).cssClip(), "string" == typeof e.end && (e.end = s(e.end, e.elem)), e.clipInit = !0), t(e.elem).cssClip({ top: e.pos * (e.end.top - e.start.top) + e.start.top, right: e.pos * (e.end.right - e.start.right) + e.start.right, bottom: e.pos * (e.end.bottom - e.start.bottom) + e.start.bottom, left: e.pos * (e.end.left - e.start.left) + e.start.left });
    };
  }(), function () {
    var e = {};t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, i) {
      e[i] = function (e) {
        return Math.pow(e, t + 2);
      };
    }), t.extend(e, { Sine: function Sine(t) {
        return 1 - Math.cos(t * Math.PI / 2);
      }, Circ: function Circ(t) {
        return 1 - Math.sqrt(1 - t * t);
      }, Elastic: function Elastic(t) {
        return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15);
      }, Back: function Back(t) {
        return t * t * (3 * t - 2);
      }, Bounce: function Bounce(t) {
        for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t;) {}return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2);
      } }), t.each(e, function (e, i) {
      t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function (t) {
        return 1 - i(1 - t);
      }, t.easing["easeInOut" + e] = function (t) {
        return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2;
      };
    });
  }();var f = t.effects;t.effects.define("blind", "hide", function (e, i) {
    var s = { up: ["bottom", "top"], vertical: ["bottom", "top"], down: ["top", "bottom"], left: ["right", "left"], horizontal: ["right", "left"], right: ["left", "right"] },
        n = t(this),
        o = e.direction || "up",
        a = n.cssClip(),
        r = { clip: t.extend({}, a) },
        h = t.effects.createPlaceholder(n);r.clip[s[o][0]] = r.clip[s[o][1]], "show" === e.mode && (n.cssClip(r.clip), h && h.css(t.effects.clipToBox(r)), r.clip = a), h && h.animate(t.effects.clipToBox(r), e.duration, e.easing), n.animate(r, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
  }), t.effects.define("bounce", function (e, i) {
    var s,
        n,
        o,
        a = t(this),
        r = e.mode,
        h = "hide" === r,
        l = "show" === r,
        c = e.direction || "up",
        u = e.distance,
        d = e.times || 5,
        p = 2 * d + (l || h ? 1 : 0),
        f = e.duration / p,
        g = e.easing,
        m = "up" === c || "down" === c ? "top" : "left",
        _ = "up" === c || "left" === c,
        v = 0,
        b = a.queue().length;for (t.effects.createPlaceholder(a), o = a.css(m), u || (u = a["top" === m ? "outerHeight" : "outerWidth"]() / 3), l && (n = { opacity: 1 }, n[m] = o, a.css("opacity", 0).css(m, _ ? 2 * -u : 2 * u).animate(n, f, g)), h && (u /= Math.pow(2, d - 1)), n = {}, n[m] = o; d > v; v++) {
      s = {}, s[m] = (_ ? "-=" : "+=") + u, a.animate(s, f, g).animate(n, f, g), u = h ? 2 * u : u / 2;
    }h && (s = { opacity: 0 }, s[m] = (_ ? "-=" : "+=") + u, a.animate(s, f, g)), a.queue(i), t.effects.unshift(a, b, p + 1);
  }), t.effects.define("clip", "hide", function (e, i) {
    var s,
        n = {},
        o = t(this),
        a = e.direction || "vertical",
        r = "both" === a,
        h = r || "horizontal" === a,
        l = r || "vertical" === a;s = o.cssClip(), n.clip = { top: l ? (s.bottom - s.top) / 2 : s.top, right: h ? (s.right - s.left) / 2 : s.right, bottom: l ? (s.bottom - s.top) / 2 : s.bottom, left: h ? (s.right - s.left) / 2 : s.left }, t.effects.createPlaceholder(o), "show" === e.mode && (o.cssClip(n.clip), n.clip = s), o.animate(n, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
  }), t.effects.define("drop", "hide", function (e, i) {
    var s,
        n = t(this),
        o = e.mode,
        a = "show" === o,
        r = e.direction || "left",
        h = "up" === r || "down" === r ? "top" : "left",
        l = "up" === r || "left" === r ? "-=" : "+=",
        c = "+=" === l ? "-=" : "+=",
        u = { opacity: 0 };t.effects.createPlaceholder(n), s = e.distance || n["top" === h ? "outerHeight" : "outerWidth"](!0) / 2, u[h] = l + s, a && (n.css(u), u[h] = c + s, u.opacity = 1), n.animate(u, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
  }), t.effects.define("explode", "hide", function (e, i) {
    function s() {
      b.push(this), b.length === u * d && n();
    }function n() {
      p.css({ visibility: "visible" }), t(b).remove(), i();
    }var o,
        a,
        r,
        h,
        l,
        c,
        u = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
        d = u,
        p = t(this),
        f = e.mode,
        g = "show" === f,
        m = p.show().css("visibility", "hidden").offset(),
        _ = Math.ceil(p.outerWidth() / d),
        v = Math.ceil(p.outerHeight() / u),
        b = [];for (o = 0; u > o; o++) {
      for (h = m.top + o * v, c = o - (u - 1) / 2, a = 0; d > a; a++) {
        r = m.left + a * _, l = a - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({ position: "absolute", visibility: "visible", left: -a * _, top: -o * v }).parent().addClass("ui-effects-explode").css({ position: "absolute", overflow: "hidden", width: _, height: v, left: r + (g ? l * _ : 0), top: h + (g ? c * v : 0), opacity: g ? 0 : 1 }).animate({ left: r + (g ? 0 : l * _), top: h + (g ? 0 : c * v), opacity: g ? 1 : 0 }, e.duration || 500, e.easing, s);
      }
    }
  }), t.effects.define("fade", "toggle", function (e, i) {
    var s = "show" === e.mode;t(this).css("opacity", s ? 0 : 1).animate({ opacity: s ? 1 : 0 }, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
  }), t.effects.define("fold", "hide", function (e, i) {
    var s = t(this),
        n = e.mode,
        o = "show" === n,
        a = "hide" === n,
        r = e.size || 15,
        h = /([0-9]+)%/.exec(r),
        l = !!e.horizFirst,
        c = l ? ["right", "bottom"] : ["bottom", "right"],
        u = e.duration / 2,
        d = t.effects.createPlaceholder(s),
        p = s.cssClip(),
        f = { clip: t.extend({}, p) },
        g = { clip: t.extend({}, p) },
        m = [p[c[0]], p[c[1]]],
        _ = s.queue().length;h && (r = parseInt(h[1], 10) / 100 * m[a ? 0 : 1]), f.clip[c[0]] = r, g.clip[c[0]] = r, g.clip[c[1]] = 0, o && (s.cssClip(g.clip), d && d.css(t.effects.clipToBox(g)), g.clip = p), s.queue(function (i) {
      d && d.animate(t.effects.clipToBox(f), u, e.easing).animate(t.effects.clipToBox(g), u, e.easing), i();
    }).animate(f, u, e.easing).animate(g, u, e.easing).queue(i), t.effects.unshift(s, _, 4);
  }), t.effects.define("highlight", "show", function (e, i) {
    var s = t(this),
        n = { backgroundColor: s.css("backgroundColor") };"hide" === e.mode && (n.opacity = 0), t.effects.saveStyle(s), s.css({ backgroundImage: "none", backgroundColor: e.color || "#ffff99" }).animate(n, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
  }), t.effects.define("size", function (e, i) {
    var s,
        n,
        o,
        a = t(this),
        r = ["fontSize"],
        h = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
        l = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
        c = e.mode,
        u = "effect" !== c,
        d = e.scale || "both",
        p = e.origin || ["middle", "center"],
        f = a.css("position"),
        g = a.position(),
        m = t.effects.scaledDimensions(a),
        _ = e.from || m,
        v = e.to || t.effects.scaledDimensions(a, 0);t.effects.createPlaceholder(a), "show" === c && (o = _, _ = v, v = o), n = { from: { y: _.height / m.height, x: _.width / m.width }, to: { y: v.height / m.height, x: v.width / m.width } }, ("box" === d || "both" === d) && (n.from.y !== n.to.y && (_ = t.effects.setTransition(a, h, n.from.y, _), v = t.effects.setTransition(a, h, n.to.y, v)), n.from.x !== n.to.x && (_ = t.effects.setTransition(a, l, n.from.x, _), v = t.effects.setTransition(a, l, n.to.x, v))), ("content" === d || "both" === d) && n.from.y !== n.to.y && (_ = t.effects.setTransition(a, r, n.from.y, _), v = t.effects.setTransition(a, r, n.to.y, v)), p && (s = t.effects.getBaseline(p, m), _.top = (m.outerHeight - _.outerHeight) * s.y + g.top, _.left = (m.outerWidth - _.outerWidth) * s.x + g.left, v.top = (m.outerHeight - v.outerHeight) * s.y + g.top, v.left = (m.outerWidth - v.outerWidth) * s.x + g.left), a.css(_), ("content" === d || "both" === d) && (h = h.concat(["marginTop", "marginBottom"]).concat(r), l = l.concat(["marginLeft", "marginRight"]), a.find("*[width]").each(function () {
      var i = t(this),
          s = t.effects.scaledDimensions(i),
          o = { height: s.height * n.from.y, width: s.width * n.from.x, outerHeight: s.outerHeight * n.from.y, outerWidth: s.outerWidth * n.from.x },
          a = { height: s.height * n.to.y, width: s.width * n.to.x, outerHeight: s.height * n.to.y, outerWidth: s.width * n.to.x };n.from.y !== n.to.y && (o = t.effects.setTransition(i, h, n.from.y, o), a = t.effects.setTransition(i, h, n.to.y, a)), n.from.x !== n.to.x && (o = t.effects.setTransition(i, l, n.from.x, o), a = t.effects.setTransition(i, l, n.to.x, a)), u && t.effects.saveStyle(i), i.css(o), i.animate(a, e.duration, e.easing, function () {
        u && t.effects.restoreStyle(i);
      });
    })), a.animate(v, { queue: !1, duration: e.duration, easing: e.easing, complete: function complete() {
        var e = a.offset();0 === v.opacity && a.css("opacity", _.opacity), u || (a.css("position", "static" === f ? "relative" : f).offset(e), t.effects.saveStyle(a)), i();
      } });
  }), t.effects.define("scale", function (e, i) {
    var s = t(this),
        n = e.mode,
        o = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "effect" !== n ? 0 : 100),
        a = t.extend(!0, { from: t.effects.scaledDimensions(s), to: t.effects.scaledDimensions(s, o, e.direction || "both"), origin: e.origin || ["middle", "center"] }, e);e.fade && (a.from.opacity = 1, a.to.opacity = 0), t.effects.effect.size.call(this, a, i);
  }), t.effects.define("puff", "hide", function (e, i) {
    var s = t.extend(!0, {}, e, { fade: !0, percent: parseInt(e.percent, 10) || 150 });t.effects.effect.scale.call(this, s, i);
  }), t.effects.define("pulsate", "show", function (e, i) {
    var s = t(this),
        n = e.mode,
        o = "show" === n,
        a = "hide" === n,
        r = o || a,
        h = 2 * (e.times || 5) + (r ? 1 : 0),
        l = e.duration / h,
        c = 0,
        u = 1,
        d = s.queue().length;for ((o || !s.is(":visible")) && (s.css("opacity", 0).show(), c = 1); h > u; u++) {
      s.animate({ opacity: c }, l, e.easing), c = 1 - c;
    }s.animate({ opacity: c }, l, e.easing), s.queue(i), t.effects.unshift(s, d, h + 1);
  }), t.effects.define("shake", function (e, i) {
    var s = 1,
        n = t(this),
        o = e.direction || "left",
        a = e.distance || 20,
        r = e.times || 3,
        h = 2 * r + 1,
        l = Math.round(e.duration / h),
        c = "up" === o || "down" === o ? "top" : "left",
        u = "up" === o || "left" === o,
        d = {},
        p = {},
        f = {},
        g = n.queue().length;for (t.effects.createPlaceholder(n), d[c] = (u ? "-=" : "+=") + a, p[c] = (u ? "+=" : "-=") + 2 * a, f[c] = (u ? "-=" : "+=") + 2 * a, n.animate(d, l, e.easing); r > s; s++) {
      n.animate(p, l, e.easing).animate(f, l, e.easing);
    }n.animate(p, l, e.easing).animate(d, l / 2, e.easing).queue(i), t.effects.unshift(n, g, h + 1);
  }), t.effects.define("slide", "show", function (e, i) {
    var s,
        n,
        o = t(this),
        a = { up: ["bottom", "top"], down: ["top", "bottom"], left: ["right", "left"], right: ["left", "right"] },
        r = e.mode,
        h = e.direction || "left",
        l = "up" === h || "down" === h ? "top" : "left",
        c = "up" === h || "left" === h,
        u = e.distance || o["top" === l ? "outerHeight" : "outerWidth"](!0),
        d = {};t.effects.createPlaceholder(o), s = o.cssClip(), n = o.position()[l], d[l] = (c ? -1 : 1) * u + n, d.clip = o.cssClip(), d.clip[a[h][1]] = d.clip[a[h][0]], "show" === r && (o.cssClip(d.clip), o.css(l, d[l]), d.clip = s, d[l] = n), o.animate(d, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
  });var f;t.uiBackCompat !== !1 && (f = t.effects.define("transfer", function (e, i) {
    t(this).transfer(e, i);
  })), t.ui.focusable = function (i, s) {
    var n,
        o,
        a,
        r,
        h,
        l = i.nodeName.toLowerCase();return "area" === l ? (n = i.parentNode, o = n.name, i.href && o && "map" === n.nodeName.toLowerCase() ? (a = t("img[usemap='#" + o + "']"), a.length > 0 && a.is(":visible")) : !1) : (/^(input|select|textarea|button|object)$/.test(l) ? (r = !i.disabled, r && (h = t(i).closest("fieldset")[0], h && (r = !h.disabled))) : r = "a" === l ? i.href || s : s, r && t(i).is(":visible") && e(t(i)));
  }, t.extend(t.expr[":"], { focusable: function focusable(e) {
      return t.ui.focusable(e, null != t.attr(e, "tabindex"));
    } }), t.ui.focusable, t.fn.form = function () {
    return "string" == typeof this[0].form ? this.closest("form") : t(this[0].form);
  }, t.ui.formResetMixin = { _formResetHandler: function _formResetHandler() {
      var e = t(this);setTimeout(function () {
        var i = e.data("ui-form-reset-instances");t.each(i, function () {
          this.refresh();
        });
      });
    }, _bindFormResetHandler: function _bindFormResetHandler() {
      if (this.form = this.element.form(), this.form.length) {
        var t = this.form.data("ui-form-reset-instances") || [];t.length || this.form.on("reset.ui-form-reset", this._formResetHandler), t.push(this), this.form.data("ui-form-reset-instances", t);
      }
    }, _unbindFormResetHandler: function _unbindFormResetHandler() {
      if (this.form.length) {
        var e = this.form.data("ui-form-reset-instances");e.splice(t.inArray(this, e), 1), e.length ? this.form.data("ui-form-reset-instances", e) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset");
      }
    } }, "1.7" === t.fn.jquery.substring(0, 3) && (t.each(["Width", "Height"], function (e, i) {
    function s(e, i, s, o) {
      return t.each(n, function () {
        i -= parseFloat(t.css(e, "padding" + this)) || 0, s && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), o && (i -= parseFloat(t.css(e, "margin" + this)) || 0);
      }), i;
    }var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
        o = i.toLowerCase(),
        a = { innerWidth: t.fn.innerWidth, innerHeight: t.fn.innerHeight, outerWidth: t.fn.outerWidth, outerHeight: t.fn.outerHeight };t.fn["inner" + i] = function (e) {
      return void 0 === e ? a["inner" + i].call(this) : this.each(function () {
        t(this).css(o, s(this, e) + "px");
      });
    }, t.fn["outer" + i] = function (e, n) {
      return "number" != typeof e ? a["outer" + i].call(this, e) : this.each(function () {
        t(this).css(o, s(this, e, !0, n) + "px");
      });
    };
  }), t.fn.addBack = function (t) {
    return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
  }), t.ui.keyCode = { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 }, t.ui.escapeSelector = function () {
    var t = /([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g;return function (e) {
      return e.replace(t, "\\$1");
    };
  }(), t.fn.labels = function () {
    var e, i, s, n, o;return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (n = this.eq(0).parents("label"), s = this.attr("id"), s && (e = this.eq(0).parents().last(), o = e.add(e.length ? e.siblings() : this.siblings()), i = "label[for='" + t.ui.escapeSelector(s) + "']", n = n.add(o.find(i).addBack(i))), this.pushStack(n));
  }, t.fn.scrollParent = function (e) {
    var i = this.css("position"),
        s = "absolute" === i,
        n = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
        o = this.parents().filter(function () {
      var e = t(this);return s && "static" === e.css("position") ? !1 : n.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"));
    }).eq(0);return "fixed" !== i && o.length ? o : t(this[0].ownerDocument || document);
  }, t.extend(t.expr[":"], { tabbable: function tabbable(e) {
      var i = t.attr(e, "tabindex"),
          s = null != i;return (!s || i >= 0) && t.ui.focusable(e, s);
    } }), t.fn.extend({ uniqueId: function () {
      var t = 0;return function () {
        return this.each(function () {
          this.id || (this.id = "ui-id-" + ++t);
        });
      };
    }(), removeUniqueId: function removeUniqueId() {
      return this.each(function () {
        /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id");
      });
    } }), t.widget("ui.accordion", { version: "1.12.1", options: { active: 0, animate: {}, classes: { "ui-accordion-header": "ui-corner-top", "ui-accordion-header-collapsed": "ui-corner-all", "ui-accordion-content": "ui-corner-bottom" }, collapsible: !1, event: "click", header: "> li > :first-child, > :not(li):even", heightStyle: "auto", icons: { activeHeader: "ui-icon-triangle-1-s", header: "ui-icon-triangle-1-e" }, activate: null, beforeActivate: null }, hideProps: { borderTopWidth: "hide", borderBottomWidth: "hide", paddingTop: "hide", paddingBottom: "hide", height: "hide" }, showProps: { borderTopWidth: "show", borderBottomWidth: "show", paddingTop: "show", paddingBottom: "show", height: "show" }, _create: function _create() {
      var e = this.options;this.prevShow = this.prevHide = t(), this._addClass("ui-accordion", "ui-widget ui-helper-reset"), this.element.attr("role", "tablist"), e.collapsible || e.active !== !1 && null != e.active || (e.active = 0), this._processPanels(), 0 > e.active && (e.active += this.headers.length), this._refresh();
    }, _getCreateEventData: function _getCreateEventData() {
      return { header: this.active, panel: this.active.length ? this.active.next() : t() };
    }, _createIcons: function _createIcons() {
      var e,
          i,
          s = this.options.icons;s && (e = t("<span>"), this._addClass(e, "ui-accordion-header-icon", "ui-icon " + s.header), e.prependTo(this.headers), i = this.active.children(".ui-accordion-header-icon"), this._removeClass(i, s.header)._addClass(i, null, s.activeHeader)._addClass(this.headers, "ui-accordion-icons"));
    }, _destroyIcons: function _destroyIcons() {
      this._removeClass(this.headers, "ui-accordion-icons"), this.headers.children(".ui-accordion-header-icon").remove();
    }, _destroy: function _destroy() {
      var t;this.element.removeAttr("role"), this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(), this._destroyIcons(), t = this.headers.next().css("display", "").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && t.css("height", "");
    }, _setOption: function _setOption(t, e) {
      return "active" === t ? (this._activate(e), void 0) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || this.options.active !== !1 || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons()), void 0);
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this._super(t), this.element.attr("aria-disabled", t), this._toggleClass(null, "ui-state-disabled", !!t), this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled", !!t);
    }, _keydown: function _keydown(e) {
      if (!e.altKey && !e.ctrlKey) {
        var i = t.ui.keyCode,
            s = this.headers.length,
            n = this.headers.index(e.target),
            o = !1;switch (e.keyCode) {case i.RIGHT:case i.DOWN:
            o = this.headers[(n + 1) % s];break;case i.LEFT:case i.UP:
            o = this.headers[(n - 1 + s) % s];break;case i.SPACE:case i.ENTER:
            this._eventHandler(e);break;case i.HOME:
            o = this.headers[0];break;case i.END:
            o = this.headers[s - 1];}o && (t(e.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), t(o).trigger("focus"), e.preventDefault());
      }
    }, _panelKeyDown: function _panelKeyDown(e) {
      e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().trigger("focus");
    }, refresh: function refresh() {
      var e = this.options;this._processPanels(), e.active === !1 && e.collapsible === !0 || !this.headers.length ? (e.active = !1, this.active = t()) : e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active), this._destroyIcons(), this._refresh();
    }, _processPanels: function _processPanels() {
      var t = this.headers,
          e = this.panels;this.headers = this.element.find(this.options.header), this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed", "ui-state-default"), this.panels = this.headers.next().filter(":not(.ui-accordion-content-active)").hide(), this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content"), e && (this._off(t.not(this.headers)), this._off(e.not(this.panels)));
    }, _refresh: function _refresh() {
      var e,
          i = this.options,
          s = i.heightStyle,
          n = this.element.parent();this.active = this._findActive(i.active), this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")._removeClass(this.active, "ui-accordion-header-collapsed"), this._addClass(this.active.next(), "ui-accordion-content-active"), this.active.next().show(), this.headers.attr("role", "tab").each(function () {
        var e = t(this),
            i = e.uniqueId().attr("id"),
            s = e.next(),
            n = s.uniqueId().attr("id");e.attr("aria-controls", n), s.attr("aria-labelledby", i);
      }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({ "aria-selected": "false", "aria-expanded": "false", tabIndex: -1 }).next().attr({ "aria-hidden": "true" }).hide(), this.active.length ? this.active.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 }).next().attr({ "aria-hidden": "false" }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(i.event), "fill" === s ? (e = n.height(), this.element.siblings(":visible").each(function () {
        var i = t(this),
            s = i.css("position");"absolute" !== s && "fixed" !== s && (e -= i.outerHeight(!0));
      }), this.headers.each(function () {
        e -= t(this).outerHeight(!0);
      }), this.headers.next().each(function () {
        t(this).height(Math.max(0, e - t(this).innerHeight() + t(this).height()));
      }).css("overflow", "auto")) : "auto" === s && (e = 0, this.headers.next().each(function () {
        var i = t(this).is(":visible");i || t(this).show(), e = Math.max(e, t(this).css("height", "").height()), i || t(this).hide();
      }).height(e));
    }, _activate: function _activate(e) {
      var i = this._findActive(e)[0];i !== this.active[0] && (i = i || this.active[0], this._eventHandler({ target: i, currentTarget: i, preventDefault: t.noop }));
    }, _findActive: function _findActive(e) {
      return "number" == typeof e ? this.headers.eq(e) : t();
    }, _setupEvents: function _setupEvents(e) {
      var i = { keydown: "_keydown" };e && t.each(e.split(" "), function (t, e) {
        i[e] = "_eventHandler";
      }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), { keydown: "_panelKeyDown" }), this._hoverable(this.headers), this._focusable(this.headers);
    }, _eventHandler: function _eventHandler(e) {
      var i,
          s,
          n = this.options,
          o = this.active,
          a = t(e.currentTarget),
          r = a[0] === o[0],
          h = r && n.collapsible,
          l = h ? t() : a.next(),
          c = o.next(),
          u = { oldHeader: o, oldPanel: c, newHeader: h ? t() : a, newPanel: l };e.preventDefault(), r && !n.collapsible || this._trigger("beforeActivate", e, u) === !1 || (n.active = h ? !1 : this.headers.index(a), this.active = r ? t() : a, this._toggle(u), this._removeClass(o, "ui-accordion-header-active", "ui-state-active"), n.icons && (i = o.children(".ui-accordion-header-icon"), this._removeClass(i, null, n.icons.activeHeader)._addClass(i, null, n.icons.header)), r || (this._removeClass(a, "ui-accordion-header-collapsed")._addClass(a, "ui-accordion-header-active", "ui-state-active"), n.icons && (s = a.children(".ui-accordion-header-icon"), this._removeClass(s, null, n.icons.header)._addClass(s, null, n.icons.activeHeader)), this._addClass(a.next(), "ui-accordion-content-active")));
    }, _toggle: function _toggle(e) {
      var i = e.newPanel,
          s = this.prevShow.length ? this.prevShow : e.oldPanel;this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = s, this.options.animate ? this._animate(i, s, e) : (s.hide(), i.show(), this._toggleComplete(e)), s.attr({ "aria-hidden": "true" }), s.prev().attr({ "aria-selected": "false", "aria-expanded": "false" }), i.length && s.length ? s.prev().attr({ tabIndex: -1, "aria-expanded": "false" }) : i.length && this.headers.filter(function () {
        return 0 === parseInt(t(this).attr("tabIndex"), 10);
      }).attr("tabIndex", -1), i.attr("aria-hidden", "false").prev().attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 });
    }, _animate: function _animate(t, e, i) {
      var s,
          n,
          o,
          a = this,
          r = 0,
          h = t.css("box-sizing"),
          l = t.length && (!e.length || t.index() < e.index()),
          c = this.options.animate || {},
          u = l && c.down || c,
          d = function d() {
        a._toggleComplete(i);
      };return "number" == typeof u && (o = u), "string" == typeof u && (n = u), n = n || u.easing || c.easing, o = o || u.duration || c.duration, e.length ? t.length ? (s = t.show().outerHeight(), e.animate(this.hideProps, { duration: o, easing: n, step: function step(t, e) {
          e.now = Math.round(t);
        } }), t.hide().animate(this.showProps, { duration: o, easing: n, complete: d, step: function step(t, i) {
          i.now = Math.round(t), "height" !== i.prop ? "content-box" === h && (r += i.now) : "content" !== a.options.heightStyle && (i.now = Math.round(s - e.outerHeight() - r), r = 0);
        } }), void 0) : e.animate(this.hideProps, o, n, d) : t.animate(this.showProps, o, n, d);
    }, _toggleComplete: function _toggleComplete(t) {
      var e = t.oldPanel,
          i = e.prev();this._removeClass(e, "ui-accordion-content-active"), this._removeClass(i, "ui-accordion-header-active")._addClass(i, "ui-accordion-header-collapsed"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t);
    } }), t.ui.safeActiveElement = function (t) {
    var e;try {
      e = t.activeElement;
    } catch (i) {
      e = t.body;
    }return e || (e = t.body), e.nodeName || (e = t.body), e;
  }, t.widget("ui.menu", { version: "1.12.1", defaultElement: "<ul>", delay: 300, options: { icons: { submenu: "ui-icon-caret-1-e" }, items: "> *", menus: "ul", position: { my: "left top", at: "right top" }, role: "menu", blur: null, focus: null, select: null }, _create: function _create() {
      this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().attr({ role: this.options.role, tabIndex: 0 }), this._addClass("ui-menu", "ui-widget ui-widget-content"), this._on({ "mousedown .ui-menu-item": function mousedownUiMenuItem(t) {
          t.preventDefault();
        }, "click .ui-menu-item": function clickUiMenuItem(e) {
          var i = t(e.target),
              s = t(t.ui.safeActiveElement(this.document[0]));!this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(e), e.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(e) : !this.element.is(":focus") && s.closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)));
        }, "mouseenter .ui-menu-item": function mouseenterUiMenuItem(e) {
          if (!this.previousFilter) {
            var i = t(e.target).closest(".ui-menu-item"),
                s = t(e.currentTarget);i[0] === s[0] && (this._removeClass(s.siblings().children(".ui-state-active"), null, "ui-state-active"), this.focus(e, s));
          }
        }, mouseleave: "collapseAll", "mouseleave .ui-menu": "collapseAll", focus: function focus(t, e) {
          var i = this.active || this.element.find(this.options.items).eq(0);e || this.focus(t, i);
        }, blur: function blur(e) {
          this._delay(function () {
            var i = !t.contains(this.element[0], t.ui.safeActiveElement(this.document[0]));i && this.collapseAll(e);
          });
        }, keydown: "_keydown" }), this.refresh(), this._on(this.document, { click: function click(t) {
          this._closeOnDocumentClick(t) && this.collapseAll(t), this.mouseHandled = !1;
        } });
    }, _destroy: function _destroy() {
      var e = this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),
          i = e.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(), i.children().each(function () {
        var e = t(this);e.data("ui-menu-submenu-caret") && e.remove();
      });
    }, _keydown: function _keydown(e) {
      var i,
          s,
          n,
          o,
          a = !0;switch (e.keyCode) {case t.ui.keyCode.PAGE_UP:
          this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:
          this.nextPage(e);break;case t.ui.keyCode.HOME:
          this._move("first", "first", e);break;case t.ui.keyCode.END:
          this._move("last", "last", e);break;case t.ui.keyCode.UP:
          this.previous(e);break;case t.ui.keyCode.DOWN:
          this.next(e);break;case t.ui.keyCode.LEFT:
          this.collapse(e);break;case t.ui.keyCode.RIGHT:
          this.active && !this.active.is(".ui-state-disabled") && this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:
          this._activate(e);break;case t.ui.keyCode.ESCAPE:
          this.collapse(e);break;default:
          a = !1, s = this.previousFilter || "", o = !1, n = e.keyCode >= 96 && 105 >= e.keyCode ? "" + (e.keyCode - 96) : String.fromCharCode(e.keyCode), clearTimeout(this.filterTimer), n === s ? o = !0 : n = s + n, i = this._filterMenuItems(n), i = o && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i, i.length || (n = String.fromCharCode(e.keyCode), i = this._filterMenuItems(n)), i.length ? (this.focus(e, i), this.previousFilter = n, this.filterTimer = this._delay(function () {
            delete this.previousFilter;
          }, 1e3)) : delete this.previousFilter;}a && e.preventDefault();
    }, _activate: function _activate(t) {
      this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(t) : this.select(t));
    }, refresh: function refresh() {
      var e,
          i,
          s,
          n,
          o,
          a = this,
          r = this.options.icons.submenu,
          h = this.element.find(this.options.menus);this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length), s = h.filter(":not(.ui-menu)").hide().attr({ role: this.options.role, "aria-hidden": "true", "aria-expanded": "false" }).each(function () {
        var e = t(this),
            i = e.prev(),
            s = t("<span>").data("ui-menu-submenu-caret", !0);a._addClass(s, "ui-menu-icon", "ui-icon " + r), i.attr("aria-haspopup", "true").prepend(s), e.attr("aria-labelledby", i.attr("id"));
      }), this._addClass(s, "ui-menu", "ui-widget ui-widget-content ui-front"), e = h.add(this.element), i = e.find(this.options.items), i.not(".ui-menu-item").each(function () {
        var e = t(this);a._isDivider(e) && a._addClass(e, "ui-menu-divider", "ui-widget-content");
      }), n = i.not(".ui-menu-item, .ui-menu-divider"), o = n.children().not(".ui-menu").uniqueId().attr({ tabIndex: -1, role: this._itemRole() }), this._addClass(n, "ui-menu-item")._addClass(o, "ui-menu-item-wrapper"), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur();
    }, _itemRole: function _itemRole() {
      return { menu: "menuitem", listbox: "option" }[this.options.role];
    }, _setOption: function _setOption(t, e) {
      if ("icons" === t) {
        var i = this.element.find(".ui-menu-icon");this._removeClass(i, null, this.options.icons.submenu)._addClass(i, null, e.submenu);
      }this._super(t, e);
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this._super(t), this.element.attr("aria-disabled", t + ""), this._toggleClass(null, "ui-state-disabled", !!t);
    }, focus: function focus(t, e) {
      var i, s, n;this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), s = this.active.children(".ui-menu-item-wrapper"), this._addClass(s, null, "ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), n = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"), this._addClass(n, null, "ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function () {
        this._close();
      }, this.delay), i = e.children(".ui-menu"), i.length && t && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, { item: e });
    }, _scrollIntoView: function _scrollIntoView(e) {
      var i, s, n, o, a, r;this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, n = e.offset().top - this.activeMenu.offset().top - i - s, o = this.activeMenu.scrollTop(), a = this.activeMenu.height(), r = e.outerHeight(), 0 > n ? this.activeMenu.scrollTop(o + n) : n + r > a && this.activeMenu.scrollTop(o + n - a + r));
    }, blur: function blur(t, e) {
      e || clearTimeout(this.timer), this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"), this._trigger("blur", t, { item: this.active }), this.active = null);
    }, _startOpening: function _startOpening(t) {
      clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function () {
        this._close(), this._open(t);
      }, this.delay));
    }, _open: function _open(e) {
      var i = t.extend({ of: this.active }, this.options.position);clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i);
    }, collapseAll: function collapseAll(e, i) {
      clearTimeout(this.timer), this.timer = this._delay(function () {
        var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));s.length || (s = this.element), this._close(s), this.blur(e), this._removeClass(s.find(".ui-state-active"), null, "ui-state-active"), this.activeMenu = s;
      }, this.delay);
    }, _close: function _close(t) {
      t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false");
    }, _closeOnDocumentClick: function _closeOnDocumentClick(e) {
      return !t(e.target).closest(".ui-menu").length;
    }, _isDivider: function _isDivider(t) {
      return !/[^\-\u2014\u2013\s]/.test(t.text());
    }, collapse: function collapse(t) {
      var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);e && e.length && (this._close(), this.focus(t, e));
    }, expand: function expand(t) {
      var e = this.active && this.active.children(".ui-menu ").find(this.options.items).first();e && e.length && (this._open(e.parent()), this._delay(function () {
        this.focus(t, e);
      }));
    }, next: function next(t) {
      this._move("next", "first", t);
    }, previous: function previous(t) {
      this._move("prev", "last", t);
    }, isFirstItem: function isFirstItem() {
      return this.active && !this.active.prevAll(".ui-menu-item").length;
    }, isLastItem: function isLastItem() {
      return this.active && !this.active.nextAll(".ui-menu-item").length;
    }, _move: function _move(t, e, i) {
      var s;this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.find(this.options.items)[e]()), this.focus(i, s);
    }, nextPage: function nextPage(e) {
      var i, s, n;return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
        return i = t(this), 0 > i.offset().top - s - n;
      }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]())), void 0) : (this.next(e), void 0);
    }, previousPage: function previousPage(e) {
      var i, s, n;return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
        return i = t(this), i.offset().top - s + n > 0;
      }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items).first())), void 0) : (this.next(e), void 0);
    }, _hasScroll: function _hasScroll() {
      return this.element.outerHeight() < this.element.prop("scrollHeight");
    }, select: function select(e) {
      this.active = this.active || t(e.target).closest(".ui-menu-item");var i = { item: this.active };this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i);
    }, _filterMenuItems: function _filterMenuItems(e) {
      var i = e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
          s = RegExp("^" + i, "i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function () {
        return s.test(t.trim(t(this).children(".ui-menu-item-wrapper").text()));
      });
    } }), t.widget("ui.autocomplete", { version: "1.12.1", defaultElement: "<input>", options: { appendTo: null, autoFocus: !1, delay: 300, minLength: 1, position: { my: "left top", at: "left bottom", collision: "none" }, source: null, change: null, close: null, focus: null, open: null, response: null, search: null, select: null }, requestIndex: 0, pending: 0, _create: function _create() {
      var e,
          i,
          s,
          n = this.element[0].nodeName.toLowerCase(),
          o = "textarea" === n,
          a = "input" === n;
      this.isMultiLine = o || !a && this._isContentEditable(this.element), this.valueMethod = this.element[o || a ? "val" : "text"], this.isNewMenu = !0, this._addClass("ui-autocomplete-input"), this.element.attr("autocomplete", "off"), this._on(this.element, { keydown: function keydown(n) {
          if (this.element.prop("readOnly")) return e = !0, s = !0, i = !0, void 0;e = !1, s = !1, i = !1;var o = t.ui.keyCode;switch (n.keyCode) {case o.PAGE_UP:
              e = !0, this._move("previousPage", n);break;case o.PAGE_DOWN:
              e = !0, this._move("nextPage", n);break;case o.UP:
              e = !0, this._keyEvent("previous", n);break;case o.DOWN:
              e = !0, this._keyEvent("next", n);break;case o.ENTER:
              this.menu.active && (e = !0, n.preventDefault(), this.menu.select(n));break;case o.TAB:
              this.menu.active && this.menu.select(n);break;case o.ESCAPE:
              this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(n), n.preventDefault());break;default:
              i = !0, this._searchTimeout(n);}
        }, keypress: function keypress(s) {
          if (e) return e = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault(), void 0;if (!i) {
            var n = t.ui.keyCode;switch (s.keyCode) {case n.PAGE_UP:
                this._move("previousPage", s);break;case n.PAGE_DOWN:
                this._move("nextPage", s);break;case n.UP:
                this._keyEvent("previous", s);break;case n.DOWN:
                this._keyEvent("next", s);}
          }
        }, input: function input(t) {
          return s ? (s = !1, t.preventDefault(), void 0) : (this._searchTimeout(t), void 0);
        }, focus: function focus() {
          this.selectedItem = null, this.previous = this._value();
        }, blur: function blur(t) {
          return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(t), this._change(t), void 0);
        } }), this._initSource(), this.menu = t("<ul>").appendTo(this._appendTo()).menu({ role: null }).hide().menu("instance"), this._addClass(this.menu.element, "ui-autocomplete", "ui-front"), this._on(this.menu.element, { mousedown: function mousedown(e) {
          e.preventDefault(), this.cancelBlur = !0, this._delay(function () {
            delete this.cancelBlur, this.element[0] !== t.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus");
          });
        }, menufocus: function menufocus(e, i) {
          var s, n;return this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type)) ? (this.menu.blur(), this.document.one("mousemove", function () {
            t(e.target).trigger(e.originalEvent);
          }), void 0) : (n = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", e, { item: n }) && e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(n.value), s = i.item.attr("aria-label") || n.value, s && t.trim(s).length && (this.liveRegion.children().hide(), t("<div>").text(s).appendTo(this.liveRegion)), void 0);
        }, menuselect: function menuselect(e, i) {
          var s = i.item.data("ui-autocomplete-item"),
              n = this.previous;this.element[0] !== t.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"), this.previous = n, this._delay(function () {
            this.previous = n, this.selectedItem = s;
          })), !1 !== this._trigger("select", e, { item: s }) && this._value(s.value), this.term = this._value(), this.close(e), this.selectedItem = s;
        } }), this.liveRegion = t("<div>", { role: "status", "aria-live": "assertive", "aria-relevant": "additions" }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this._on(this.window, { beforeunload: function beforeunload() {
          this.element.removeAttr("autocomplete");
        } });
    }, _destroy: function _destroy() {
      clearTimeout(this.searching), this.element.removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove();
    }, _setOption: function _setOption(t, e) {
      this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort();
    }, _isEventTargetInWidget: function _isEventTargetInWidget(e) {
      var i = this.menu.element[0];return e.target === this.element[0] || e.target === i || t.contains(i, e.target);
    }, _closeOnClickOutside: function _closeOnClickOutside(t) {
      this._isEventTargetInWidget(t) || this.close();
    }, _appendTo: function _appendTo() {
      var e = this.options.appendTo;return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front, dialog")), e.length || (e = this.document[0].body), e;
    }, _initSource: function _initSource() {
      var e,
          i,
          s = this;t.isArray(this.options.source) ? (e = this.options.source, this.source = function (i, s) {
        s(t.ui.autocomplete.filter(e, i.term));
      }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function (e, n) {
        s.xhr && s.xhr.abort(), s.xhr = t.ajax({ url: i, data: e, dataType: "json", success: function success(t) {
            n(t);
          }, error: function error() {
            n([]);
          } });
      }) : this.source = this.options.source;
    }, _searchTimeout: function _searchTimeout(t) {
      clearTimeout(this.searching), this.searching = this._delay(function () {
        var e = this.term === this._value(),
            i = this.menu.element.is(":visible"),
            s = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;(!e || e && !i && !s) && (this.selectedItem = null, this.search(null, t));
      }, this.options.delay);
    }, search: function search(t, e) {
      return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : void 0;
    }, _search: function _search(t) {
      this.pending++, this._addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({ term: t }, this._response());
    }, _response: function _response() {
      var e = ++this.requestIndex;return t.proxy(function (t) {
        e === this.requestIndex && this.__response(t), this.pending--, this.pending || this._removeClass("ui-autocomplete-loading");
      }, this);
    }, __response: function __response(t) {
      t && (t = this._normalize(t)), this._trigger("response", null, { content: t }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close();
    }, close: function close(t) {
      this.cancelSearch = !0, this._close(t);
    }, _close: function _close(t) {
      this._off(this.document, "mousedown"), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t));
    }, _change: function _change(t) {
      this.previous !== this._value() && this._trigger("change", t, { item: this.selectedItem });
    }, _normalize: function _normalize(e) {
      return e.length && e[0].label && e[0].value ? e : t.map(e, function (e) {
        return "string" == typeof e ? { label: e, value: e } : t.extend({}, e, { label: e.label || e.value, value: e.value || e.label });
      });
    }, _suggest: function _suggest(e) {
      var i = this.menu.element.empty();this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({ of: this.element }, this.options.position)), this.options.autoFocus && this.menu.next(), this._on(this.document, { mousedown: "_closeOnClickOutside" });
    }, _resizeMenu: function _resizeMenu() {
      var t = this.menu.element;t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()));
    }, _renderMenu: function _renderMenu(e, i) {
      var s = this;t.each(i, function (t, i) {
        s._renderItemData(e, i);
      });
    }, _renderItemData: function _renderItemData(t, e) {
      return this._renderItem(t, e).data("ui-autocomplete-item", e);
    }, _renderItem: function _renderItem(e, i) {
      return t("<li>").append(t("<div>").text(i.label)).appendTo(e);
    }, _move: function _move(t, e) {
      return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this.isMultiLine || this._value(this.term), this.menu.blur(), void 0) : (this.menu[t](e), void 0) : (this.search(null, e), void 0);
    }, widget: function widget() {
      return this.menu.element;
    }, _value: function _value() {
      return this.valueMethod.apply(this.element, arguments);
    }, _keyEvent: function _keyEvent(t, e) {
      (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault());
    }, _isContentEditable: function _isContentEditable(t) {
      if (!t.length) return !1;var e = t.prop("contentEditable");return "inherit" === e ? this._isContentEditable(t.parent()) : "true" === e;
    } }), t.extend(t.ui.autocomplete, { escapeRegex: function escapeRegex(t) {
      return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }, filter: function filter(e, i) {
      var s = RegExp(t.ui.autocomplete.escapeRegex(i), "i");return t.grep(e, function (t) {
        return s.test(t.label || t.value || t);
      });
    } }), t.widget("ui.autocomplete", t.ui.autocomplete, { options: { messages: { noResults: "No search results.", results: function results(t) {
          return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
        } } }, __response: function __response(e) {
      var i;this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults, this.liveRegion.children().hide(), t("<div>").text(i).appendTo(this.liveRegion));
    } }), t.ui.autocomplete;var g = /ui-corner-([a-z]){2,6}/g;t.widget("ui.controlgroup", { version: "1.12.1", defaultElement: "<div>", options: { direction: "horizontal", disabled: null, onlyVisible: !0, items: { button: "input[type=button], input[type=submit], input[type=reset], button, a", controlgroupLabel: ".ui-controlgroup-label", checkboxradio: "input[type='checkbox'], input[type='radio']", selectmenu: "select", spinner: ".ui-spinner-input" } }, _create: function _create() {
      this._enhance();
    }, _enhance: function _enhance() {
      this.element.attr("role", "toolbar"), this.refresh();
    }, _destroy: function _destroy() {
      this._callChildMethod("destroy"), this.childWidgets.removeData("ui-controlgroup-data"), this.element.removeAttr("role"), this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap();
    }, _initWidgets: function _initWidgets() {
      var e = this,
          i = [];t.each(this.options.items, function (s, n) {
        var o,
            a = {};return n ? "controlgroupLabel" === s ? (o = e.element.find(n), o.each(function () {
          var e = t(this);e.children(".ui-controlgroup-label-contents").length || e.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>");
        }), e._addClass(o, null, "ui-widget ui-widget-content ui-state-default"), i = i.concat(o.get()), void 0) : (t.fn[s] && (a = e["_" + s + "Options"] ? e["_" + s + "Options"]("middle") : { classes: {} }, e.element.find(n).each(function () {
          var n = t(this),
              o = n[s]("instance"),
              r = t.widget.extend({}, a);if ("button" !== s || !n.parent(".ui-spinner").length) {
            o || (o = n[s]()[s]("instance")), o && (r.classes = e._resolveClassesValues(r.classes, o)), n[s](r);var h = n[s]("widget");t.data(h[0], "ui-controlgroup-data", o ? o : n[s]("instance")), i.push(h[0]);
          }
        })), void 0) : void 0;
      }), this.childWidgets = t(t.unique(i)), this._addClass(this.childWidgets, "ui-controlgroup-item");
    }, _callChildMethod: function _callChildMethod(e) {
      this.childWidgets.each(function () {
        var i = t(this),
            s = i.data("ui-controlgroup-data");s && s[e] && s[e]();
      });
    }, _updateCornerClass: function _updateCornerClass(t, e) {
      var i = "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",
          s = this._buildSimpleOptions(e, "label").classes.label;this._removeClass(t, null, i), this._addClass(t, null, s);
    }, _buildSimpleOptions: function _buildSimpleOptions(t, e) {
      var i = "vertical" === this.options.direction,
          s = { classes: {} };return s.classes[e] = { middle: "", first: "ui-corner-" + (i ? "top" : "left"), last: "ui-corner-" + (i ? "bottom" : "right"), only: "ui-corner-all" }[t], s;
    }, _spinnerOptions: function _spinnerOptions(t) {
      var e = this._buildSimpleOptions(t, "ui-spinner");return e.classes["ui-spinner-up"] = "", e.classes["ui-spinner-down"] = "", e;
    }, _buttonOptions: function _buttonOptions(t) {
      return this._buildSimpleOptions(t, "ui-button");
    }, _checkboxradioOptions: function _checkboxradioOptions(t) {
      return this._buildSimpleOptions(t, "ui-checkboxradio-label");
    }, _selectmenuOptions: function _selectmenuOptions(t) {
      var e = "vertical" === this.options.direction;return { width: e ? "auto" : !1, classes: { middle: { "ui-selectmenu-button-open": "", "ui-selectmenu-button-closed": "" }, first: { "ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"), "ui-selectmenu-button-closed": "ui-corner-" + (e ? "top" : "left") }, last: { "ui-selectmenu-button-open": e ? "" : "ui-corner-tr", "ui-selectmenu-button-closed": "ui-corner-" + (e ? "bottom" : "right") }, only: { "ui-selectmenu-button-open": "ui-corner-top", "ui-selectmenu-button-closed": "ui-corner-all" } }[t] };
    }, _resolveClassesValues: function _resolveClassesValues(e, i) {
      var s = {};return t.each(e, function (n) {
        var o = i.options.classes[n] || "";o = t.trim(o.replace(g, "")), s[n] = (o + " " + e[n]).replace(/\s+/g, " ");
      }), s;
    }, _setOption: function _setOption(t, e) {
      return "direction" === t && this._removeClass("ui-controlgroup-" + this.options.direction), this._super(t, e), "disabled" === t ? (this._callChildMethod(e ? "disable" : "enable"), void 0) : (this.refresh(), void 0);
    }, refresh: function refresh() {
      var e,
          i = this;this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction), "horizontal" === this.options.direction && this._addClass(null, "ui-helper-clearfix"), this._initWidgets(), e = this.childWidgets, this.options.onlyVisible && (e = e.filter(":visible")), e.length && (t.each(["first", "last"], function (t, s) {
        var n = e[s]().data("ui-controlgroup-data");if (n && i["_" + n.widgetName + "Options"]) {
          var o = i["_" + n.widgetName + "Options"](1 === e.length ? "only" : s);o.classes = i._resolveClassesValues(o.classes, n), n.element[n.widgetName](o);
        } else i._updateCornerClass(e[s](), s);
      }), this._callChildMethod("refresh"));
    } }), t.widget("ui.checkboxradio", [t.ui.formResetMixin, { version: "1.12.1", options: { disabled: null, label: null, icon: !0, classes: { "ui-checkboxradio-label": "ui-corner-all", "ui-checkboxradio-icon": "ui-corner-all" } }, _getCreateOptions: function _getCreateOptions() {
      var e,
          i,
          s = this,
          n = this._super() || {};return this._readType(), i = this.element.labels(), this.label = t(i[i.length - 1]), this.label.length || t.error("No label found for checkboxradio widget"), this.originalLabel = "", this.label.contents().not(this.element[0]).each(function () {
        s.originalLabel += 3 === this.nodeType ? t(this).text() : this.outerHTML;
      }), this.originalLabel && (n.label = this.originalLabel), e = this.element[0].disabled, null != e && (n.disabled = e), n;
    }, _create: function _create() {
      var t = this.element[0].checked;this._bindFormResetHandler(), null == this.options.disabled && (this.options.disabled = this.element[0].disabled), this._setOption("disabled", this.options.disabled), this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"), this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget"), "radio" === this.type && this._addClass(this.label, "ui-checkboxradio-radio-label"), this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel), this._enhance(), t && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"), this.icon && this._addClass(this.icon, null, "ui-state-hover")), this._on({ change: "_toggleClasses", focus: function focus() {
          this._addClass(this.label, null, "ui-state-focus ui-visual-focus");
        }, blur: function blur() {
          this._removeClass(this.label, null, "ui-state-focus ui-visual-focus");
        } });
    }, _readType: function _readType() {
      var e = this.element[0].nodeName.toLowerCase();this.type = this.element[0].type, "input" === e && /radio|checkbox/.test(this.type) || t.error("Can't create checkboxradio on element.nodeName=" + e + " and element.type=" + this.type);
    }, _enhance: function _enhance() {
      this._updateIcon(this.element[0].checked);
    }, widget: function widget() {
      return this.label;
    }, _getRadioGroup: function _getRadioGroup() {
      var e,
          i = this.element[0].name,
          s = "input[name='" + t.ui.escapeSelector(i) + "']";return i ? (e = this.form.length ? t(this.form[0].elements).filter(s) : t(s).filter(function () {
        return 0 === t(this).form().length;
      }), e.not(this.element)) : t([]);
    }, _toggleClasses: function _toggleClasses() {
      var e = this.element[0].checked;this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", e), this.options.icon && "checkbox" === this.type && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", e)._toggleClass(this.icon, null, "ui-icon-blank", !e), "radio" === this.type && this._getRadioGroup().each(function () {
        var e = t(this).checkboxradio("instance");e && e._removeClass(e.label, "ui-checkboxradio-checked", "ui-state-active");
      });
    }, _destroy: function _destroy() {
      this._unbindFormResetHandler(), this.icon && (this.icon.remove(), this.iconSpace.remove());
    }, _setOption: function _setOption(t, e) {
      return "label" !== t || e ? (this._super(t, e), "disabled" === t ? (this._toggleClass(this.label, null, "ui-state-disabled", e), this.element[0].disabled = e, void 0) : (this.refresh(), void 0)) : void 0;
    }, _updateIcon: function _updateIcon(e) {
      var i = "ui-icon ui-icon-background ";this.options.icon ? (this.icon || (this.icon = t("<span>"), this.iconSpace = t("<span> </span>"), this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")), "checkbox" === this.type ? (i += e ? "ui-icon-check ui-state-checked" : "ui-icon-blank", this._removeClass(this.icon, null, e ? "ui-icon-blank" : "ui-icon-check")) : i += "ui-icon-blank", this._addClass(this.icon, "ui-checkboxradio-icon", i), e || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"), this.icon.prependTo(this.label).after(this.iconSpace)) : void 0 !== this.icon && (this.icon.remove(), this.iconSpace.remove(), delete this.icon);
    }, _updateLabel: function _updateLabel() {
      var t = this.label.contents().not(this.element[0]);this.icon && (t = t.not(this.icon[0])), this.iconSpace && (t = t.not(this.iconSpace[0])), t.remove(), this.label.append(this.options.label);
    }, refresh: function refresh() {
      var t = this.element[0].checked,
          e = this.element[0].disabled;this._updateIcon(t), this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t), null !== this.options.label && this._updateLabel(), e !== this.options.disabled && this._setOptions({ disabled: e });
    } }]), t.ui.checkboxradio, t.widget("ui.button", { version: "1.12.1", defaultElement: "<button>", options: { classes: { "ui-button": "ui-corner-all" }, disabled: null, icon: null, iconPosition: "beginning", label: null, showLabel: !0 }, _getCreateOptions: function _getCreateOptions() {
      var t,
          e = this._super() || {};return this.isInput = this.element.is("input"), t = this.element[0].disabled, null != t && (e.disabled = t), this.originalLabel = this.isInput ? this.element.val() : this.element.html(), this.originalLabel && (e.label = this.originalLabel), e;
    }, _create: function _create() {
      !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0), null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1), this.hasTitle = !!this.element.attr("title"), this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)), this._addClass("ui-button", "ui-widget"), this._setOption("disabled", this.options.disabled), this._enhance(), this.element.is("a") && this._on({ keyup: function keyup(e) {
          e.keyCode === t.ui.keyCode.SPACE && (e.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click"));
        } });
    }, _enhance: function _enhance() {
      this.element.is("button") || this.element.attr("role", "button"), this.options.icon && (this._updateIcon("icon", this.options.icon), this._updateTooltip());
    }, _updateTooltip: function _updateTooltip() {
      this.title = this.element.attr("title"), this.options.showLabel || this.title || this.element.attr("title", this.options.label);
    }, _updateIcon: function _updateIcon(e, i) {
      var s = "iconPosition" !== e,
          n = s ? this.options.iconPosition : i,
          o = "top" === n || "bottom" === n;this.icon ? s && this._removeClass(this.icon, null, this.options.icon) : (this.icon = t("<span>"), this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only")), s && this._addClass(this.icon, null, i), this._attachIcon(n), o ? (this._addClass(this.icon, null, "ui-widget-icon-block"), this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = t("<span> </span>"), this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"), this._attachIconSpace(n));
    }, _destroy: function _destroy() {
      this.element.removeAttr("role"), this.icon && this.icon.remove(), this.iconSpace && this.iconSpace.remove(), this.hasTitle || this.element.removeAttr("title");
    }, _attachIconSpace: function _attachIconSpace(t) {
      this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](this.iconSpace);
    }, _attachIcon: function _attachIcon(t) {
      this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](this.icon);
    }, _setOptions: function _setOptions(t) {
      var e = void 0 === t.showLabel ? this.options.showLabel : t.showLabel,
          i = void 0 === t.icon ? this.options.icon : t.icon;e || i || (t.showLabel = !0), this._super(t);
    }, _setOption: function _setOption(t, e) {
      "icon" === t && (e ? this._updateIcon(t, e) : this.icon && (this.icon.remove(), this.iconSpace && this.iconSpace.remove())), "iconPosition" === t && this._updateIcon(t, e), "showLabel" === t && (this._toggleClass("ui-button-icon-only", null, !e), this._updateTooltip()), "label" === t && (this.isInput ? this.element.val(e) : (this.element.html(e), this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition)))), this._super(t, e), "disabled" === t && (this._toggleClass(null, "ui-state-disabled", e), this.element[0].disabled = e, e && this.element.blur());
    }, refresh: function refresh() {
      var t = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");t !== this.options.disabled && this._setOptions({ disabled: t }), this._updateTooltip();
    } }), t.uiBackCompat !== !1 && (t.widget("ui.button", t.ui.button, { options: { text: !0, icons: { primary: null, secondary: null } }, _create: function _create() {
      this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text), !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel), this.options.icon || !this.options.icons.primary && !this.options.icons.secondary ? this.options.icon && (this.options.icons.primary = this.options.icon) : this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary, this.options.iconPosition = "end"), this._super();
    }, _setOption: function _setOption(t, e) {
      return "text" === t ? (this._super("showLabel", e), void 0) : ("showLabel" === t && (this.options.text = e), "icon" === t && (this.options.icons.primary = e), "icons" === t && (e.primary ? (this._super("icon", e.primary), this._super("iconPosition", "beginning")) : e.secondary && (this._super("icon", e.secondary), this._super("iconPosition", "end"))), this._superApply(arguments), void 0);
    } }), t.fn.button = function (e) {
    return function () {
      return !this.length || this.length && "INPUT" !== this[0].tagName || this.length && "INPUT" === this[0].tagName && "checkbox" !== this.attr("type") && "radio" !== this.attr("type") ? e.apply(this, arguments) : (t.ui.checkboxradio || t.error("Checkboxradio widget missing"), 0 === arguments.length ? this.checkboxradio({ icon: !1 }) : this.checkboxradio.apply(this, arguments));
    };
  }(t.fn.button), t.fn.buttonset = function () {
    return t.ui.controlgroup || t.error("Controlgroup widget missing"), "option" === arguments[0] && "items" === arguments[1] && arguments[2] ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : "option" === arguments[0] && "items" === arguments[1] ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : ("object" == _typeof(arguments[0]) && arguments[0].items && (arguments[0].items = { button: arguments[0].items }), this.controlgroup.apply(this, arguments));
  }), t.ui.button, t.extend(t.ui, { datepicker: { version: "1.12.1" } });var m;t.extend(s.prototype, { markerClassName: "hasDatepicker", maxRows: 4, _widgetDatepicker: function _widgetDatepicker() {
      return this.dpDiv;
    }, setDefaults: function setDefaults(t) {
      return a(this._defaults, t || {}), this;
    }, _attachDatepicker: function _attachDatepicker(e, i) {
      var s, n, o;s = e.nodeName.toLowerCase(), n = "div" === s || "span" === s, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), o = this._newInst(t(e), n), o.settings = t.extend({}, i || {}), "input" === s ? this._connectDatepicker(e, o) : n && this._inlineDatepicker(e, o);
    }, _newInst: function _newInst(e, i) {
      var s = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");return { id: s, input: e, selectedDay: 0, selectedMonth: 0, selectedYear: 0, drawMonth: 0, drawYear: 0, inline: i, dpDiv: i ? n(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv };
    }, _connectDatepicker: function _connectDatepicker(e, i) {
      var s = t(e);i.append = t([]), i.trigger = t([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(i), t.data(e, "datepicker", i), i.settings.disabled && this._disableDatepicker(e));
    }, _attachments: function _attachments(e, i) {
      var s,
          n,
          o,
          a = this._get(i, "appendText"),
          r = this._get(i, "isRTL");i.append && i.append.remove(), a && (i.append = t("<span class='" + this._appendClass + "'>" + a + "</span>"), e[r ? "before" : "after"](i.append)), e.off("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && e.on("focus", this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), o = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({ src: o, alt: n, title: n }) : t("<button type='button'></button>").addClass(this._triggerClass).html(o ? t("<img/>").attr({ src: o, alt: n, title: n }) : n)), e[r ? "before" : "after"](i.trigger), i.trigger.on("click", function () {
        return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1;
      }));
    }, _autoSize: function _autoSize(t) {
      if (this._get(t, "autoSize") && !t.inline) {
        var e,
            i,
            s,
            n,
            o = new Date(2009, 11, 20),
            a = this._get(t, "dateFormat");a.match(/[DM]/) && (e = function e(t) {
          for (i = 0, s = 0, n = 0; t.length > n; n++) {
            t[n].length > i && (i = t[n].length, s = n);
          }return s;
        }, o.setMonth(e(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))), o.setDate(e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())), t.input.attr("size", this._formatDate(t, o).length);
      }
    }, _inlineDatepicker: function _inlineDatepicker(e, i) {
      var s = t(e);s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), t.data(e, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"));
    }, _dialogDatepicker: function _dialogDatepicker(e, i, s, n, o) {
      var r,
          h,
          l,
          c,
          u,
          d = this._dialogInst;return d || (this.uuid += 1, r = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + r + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), t("body").append(this._dialogInput), d = this._dialogInst = this._newInst(this._dialogInput, !1), d.settings = {}, t.data(this._dialogInput[0], "datepicker", d)), a(d.settings, n || {}), i = i && i.constructor === Date ? this._formatDate(d, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (h = document.documentElement.clientWidth, l = document.documentElement.clientHeight, c = document.documentElement.scrollLeft || document.body.scrollLeft, u = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + c, l / 2 - 150 + u]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), d.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], "datepicker", d), this;
    }, _destroyDatepicker: function _destroyDatepicker(e) {
      var i,
          s = t(e),
          n = t.data(e, "datepicker");s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, "datepicker"), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty(), m === n && (m = null));
    }, _enableDatepicker: function _enableDatepicker(e) {
      var i,
          s,
          n = t(e),
          o = t.data(e, "datepicker");n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, o.trigger.filter("button").each(function () {
        this.disabled = !1;
      }).end().filter("img").css({ opacity: "1.0", cursor: "" })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function (t) {
        return t === e ? null : t;
      }));
    }, _disableDatepicker: function _disableDatepicker(e) {
      var i,
          s,
          n = t(e),
          o = t.data(e, "datepicker");n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, o.trigger.filter("button").each(function () {
        this.disabled = !0;
      }).end().filter("img").css({ opacity: "0.5", cursor: "default" })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function (t) {
        return t === e ? null : t;
      }), this._disabledInputs[this._disabledInputs.length] = e);
    }, _isDisabledDatepicker: function _isDisabledDatepicker(t) {
      if (!t) return !1;for (var e = 0; this._disabledInputs.length > e; e++) {
        if (this._disabledInputs[e] === t) return !0;
      }return !1;
    }, _getInst: function _getInst(e) {
      try {
        return t.data(e, "datepicker");
      } catch (i) {
        throw "Missing instance data for this datepicker";
      }
    }, _optionDatepicker: function _optionDatepicker(e, i, s) {
      var n,
          o,
          r,
          h,
          l = this._getInst(e);return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? t.extend({}, t.datepicker._defaults) : l ? "all" === i ? t.extend({}, l.settings) : this._get(l, i) : null : (n = i || {}, "string" == typeof i && (n = {}, n[i] = s), l && (this._curInst === l && this._hideDatepicker(), o = this._getDateDatepicker(e, !0), r = this._getMinMaxDate(l, "min"), h = this._getMinMaxDate(l, "max"), a(l.settings, n), null !== r && void 0 !== n.dateFormat && void 0 === n.minDate && (l.settings.minDate = this._formatDate(l, r)), null !== h && void 0 !== n.dateFormat && void 0 === n.maxDate && (l.settings.maxDate = this._formatDate(l, h)), "disabled" in n && (n.disabled ? this._disableDatepicker(e) : this._enableDatepicker(e)), this._attachments(t(e), l), this._autoSize(l), this._setDate(l, o), this._updateAlternate(l), this._updateDatepicker(l)), void 0);
    }, _changeDatepicker: function _changeDatepicker(t, e, i) {
      this._optionDatepicker(t, e, i);
    }, _refreshDatepicker: function _refreshDatepicker(t) {
      var e = this._getInst(t);e && this._updateDatepicker(e);
    }, _setDateDatepicker: function _setDateDatepicker(t, e) {
      var i = this._getInst(t);i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i));
    }, _getDateDatepicker: function _getDateDatepicker(t, e) {
      var i = this._getInst(t);return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null;
    }, _doKeyDown: function _doKeyDown(e) {
      var i,
          s,
          n,
          o = t.datepicker._getInst(e.target),
          a = !0,
          r = o.dpDiv.is(".ui-datepicker-rtl");if (o._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {case 9:
          t.datepicker._hideDatepicker(), a = !1;break;case 13:
          return n = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", o.dpDiv), n[0] && t.datepicker._selectDay(e.target, o.selectedMonth, o.selectedYear, n[0]), i = t.datepicker._get(o, "onSelect"), i ? (s = t.datepicker._formatDate(o), i.apply(o.input ? o.input[0] : null, [s, o])) : t.datepicker._hideDatepicker(), !1;case 27:
          t.datepicker._hideDatepicker();break;case 33:
          t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");break;case 34:
          t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");break;case 35:
          (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), a = e.ctrlKey || e.metaKey;break;case 36:
          (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), a = e.ctrlKey || e.metaKey;break;case 37:
          (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");break;case 38:
          (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), a = e.ctrlKey || e.metaKey;break;case 39:
          (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");break;case 40:
          (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), a = e.ctrlKey || e.metaKey;break;default:
          a = !1;} else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : a = !1;a && (e.preventDefault(), e.stopPropagation());
    }, _doKeyPress: function _doKeyPress(e) {
      var i,
          s,
          n = t.datepicker._getInst(e.target);return t.datepicker._get(n, "constrainInput") ? (i = t.datepicker._possibleChars(t.datepicker._get(n, "dateFormat")), s = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || " " > s || !i || i.indexOf(s) > -1) : void 0;
    }, _doKeyUp: function _doKeyUp(e) {
      var i,
          s = t.datepicker._getInst(e.target);if (s.input.val() !== s.lastVal) try {
        i = t.datepicker.parseDate(t.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, t.datepicker._getFormatConfig(s)), i && (t.datepicker._setDateFromField(s), t.datepicker._updateAlternate(s), t.datepicker._updateDatepicker(s));
      } catch (n) {}return !0;
    }, _showDatepicker: function _showDatepicker(e) {
      if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
        var s, n, o, r, h, l, c;s = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== s && (t.datepicker._curInst.dpDiv.stop(!0, !0), s && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), n = t.datepicker._get(s, "beforeShow"), o = n ? n.apply(e, [e, s]) : {}, o !== !1 && (a(s.settings, o), s.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(s), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), r = !1, t(e).parents().each(function () {
          return r |= "fixed" === t(this).css("position"), !r;
        }), h = { left: t.datepicker._pos[0], top: t.datepicker._pos[1] }, t.datepicker._pos = null, s.dpDiv.empty(), s.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" }), t.datepicker._updateDatepicker(s), h = t.datepicker._checkOffset(s, h, r), s.dpDiv.css({ position: t.datepicker._inDialog && t.blockUI ? "static" : r ? "fixed" : "absolute", display: "none", left: h.left + "px", top: h.top + "px" }), s.inline || (l = t.datepicker._get(s, "showAnim"), c = t.datepicker._get(s, "duration"), s.dpDiv.css("z-index", i(t(e)) + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[l] ? s.dpDiv.show(l, t.datepicker._get(s, "showOptions"), c) : s.dpDiv[l || "show"](l ? c : null), t.datepicker._shouldFocusInput(s) && s.input.trigger("focus"), t.datepicker._curInst = s));
      }
    }, _updateDatepicker: function _updateDatepicker(e) {
      this.maxRows = 4, m = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);var i,
          s = this._getNumberOfMonths(e),
          n = s[1],
          a = 17,
          r = e.dpDiv.find("." + this._dayOverClass + " a");r.length > 0 && o.apply(r.get(0)), e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", a * n + "em"), e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.trigger("focus"), e.yearshtml && (i = e.yearshtml, setTimeout(function () {
        i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null;
      }, 0));
    }, _shouldFocusInput: function _shouldFocusInput(t) {
      return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus");
    }, _checkOffset: function _checkOffset(e, i, s) {
      var n = e.dpDiv.outerWidth(),
          o = e.dpDiv.outerHeight(),
          a = e.input ? e.input.outerWidth() : 0,
          r = e.input ? e.input.outerHeight() : 0,
          h = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft()),
          l = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop());return i.left -= this._get(e, "isRTL") ? n - a : 0, i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= s && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0), i.top -= Math.min(i.top, i.top + o > l && l > o ? Math.abs(o + r) : 0), i;
    }, _findPos: function _findPos(e) {
      for (var i, s = this._getInst(e), n = this._get(s, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) {
        e = e[n ? "previousSibling" : "nextSibling"];
      }return i = t(e).offset(), [i.left, i.top];
    }, _hideDatepicker: function _hideDatepicker(e) {
      var i,
          s,
          n,
          o,
          a = this._curInst;!a || e && a !== t.data(e, "datepicker") || this._datepickerShowing && (i = this._get(a, "showAnim"), s = this._get(a, "duration"), n = function n() {
        t.datepicker._tidyDialog(a);
      }, t.effects && (t.effects.effect[i] || t.effects[i]) ? a.dpDiv.hide(i, t.datepicker._get(a, "showOptions"), s, n) : a.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, o = this._get(a, "onClose"), o && o.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a]), this._lastInput = null, this._inDialog && (this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1);
    }, _tidyDialog: function _tidyDialog(t) {
      t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
    }, _checkExternalClick: function _checkExternalClick(e) {
      if (t.datepicker._curInst) {
        var i = t(e.target),
            s = t.datepicker._getInst(i[0]);(i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== s) && t.datepicker._hideDatepicker();
      }
    }, _adjustDate: function _adjustDate(e, i, s) {
      var n = t(e),
          o = this._getInst(n[0]);this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(o, i + ("M" === s ? this._get(o, "showCurrentAtPos") : 0), s), this._updateDatepicker(o));
    }, _gotoToday: function _gotoToday(e) {
      var i,
          s = t(e),
          n = this._getInst(s[0]);this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date(), n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s);
    }, _selectMonthYear: function _selectMonthYear(e, i, s) {
      var n = t(e),
          o = this._getInst(n[0]);o["selected" + ("M" === s ? "Month" : "Year")] = o["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(o), this._adjustDate(n);
    }, _selectDay: function _selectDay(e, i, s, n) {
      var o,
          a = t(e);t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(a[0]) || (o = this._getInst(a[0]), o.selectedDay = o.currentDay = t("a", n).html(), o.selectedMonth = o.currentMonth = i, o.selectedYear = o.currentYear = s, this._selectDate(e, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)));
    }, _clearDate: function _clearDate(e) {
      var i = t(e);this._selectDate(i, "");
    }, _selectDate: function _selectDate(e, i) {
      var s,
          n = t(e),
          o = this._getInst(n[0]);i = null != i ? i : this._formatDate(o), o.input && o.input.val(i), this._updateAlternate(o), s = this._get(o, "onSelect"), s ? s.apply(o.input ? o.input[0] : null, [i, o]) : o.input && o.input.trigger("change"), o.inline ? this._updateDatepicker(o) : (this._hideDatepicker(), this._lastInput = o.input[0], "object" != _typeof(o.input[0]) && o.input.trigger("focus"), this._lastInput = null);
    }, _updateAlternate: function _updateAlternate(e) {
      var i,
          s,
          n,
          o = this._get(e, "altField");o && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), s = this._getDate(e), n = this.formatDate(i, s, this._getFormatConfig(e)), t(o).val(n));
    }, noWeekends: function noWeekends(t) {
      var e = t.getDay();return [e > 0 && 6 > e, ""];
    }, iso8601Week: function iso8601Week(t) {
      var e,
          i = new Date(t.getTime());return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1;
    }, parseDate: function parseDate(e, i, s) {
      if (null == e || null == i) throw "Invalid arguments";if (i = "object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) ? "" + i : i + "", "" === i) return null;var n,
          o,
          a,
          r,
          h = 0,
          l = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
          c = "string" != typeof l ? l : new Date().getFullYear() % 100 + parseInt(l, 10),
          u = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
          d = (s ? s.dayNames : null) || this._defaults.dayNames,
          p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
          f = (s ? s.monthNames : null) || this._defaults.monthNames,
          g = -1,
          m = -1,
          _ = -1,
          v = -1,
          b = !1,
          y = function y(t) {
        var i = e.length > n + 1 && e.charAt(n + 1) === t;return i && n++, i;
      },
          w = function w(t) {
        var e = y(t),
            s = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
            n = "y" === t ? s : 1,
            o = RegExp("^\\d{" + n + "," + s + "}"),
            a = i.substring(h).match(o);if (!a) throw "Missing number at position " + h;return h += a[0].length, parseInt(a[0], 10);
      },
          k = function k(e, s, n) {
        var o = -1,
            a = t.map(y(e) ? n : s, function (t, e) {
          return [[e, t]];
        }).sort(function (t, e) {
          return -(t[1].length - e[1].length);
        });if (t.each(a, function (t, e) {
          var s = e[1];return i.substr(h, s.length).toLowerCase() === s.toLowerCase() ? (o = e[0], h += s.length, !1) : void 0;
        }), -1 !== o) return o + 1;throw "Unknown name at position " + h;
      },
          x = function x() {
        if (i.charAt(h) !== e.charAt(n)) throw "Unexpected literal at position " + h;h++;
      };for (n = 0; e.length > n; n++) {
        if (b) "'" !== e.charAt(n) || y("'") ? x() : b = !1;else switch (e.charAt(n)) {case "d":
            _ = w("d");break;case "D":
            k("D", u, d);break;case "o":
            v = w("o");break;case "m":
            m = w("m");break;case "M":
            m = k("M", p, f);break;case "y":
            g = w("y");break;case "@":
            r = new Date(w("@")), g = r.getFullYear(), m = r.getMonth() + 1, _ = r.getDate();break;case "!":
            r = new Date((w("!") - this._ticksTo1970) / 1e4), g = r.getFullYear(), m = r.getMonth() + 1, _ = r.getDate();break;case "'":
            y("'") ? x() : b = !0;break;default:
            x();}
      }if (i.length > h && (a = i.substr(h), !/^\s+/.test(a))) throw "Extra/unparsed characters found in date: " + a;if (-1 === g ? g = new Date().getFullYear() : 100 > g && (g += new Date().getFullYear() - new Date().getFullYear() % 100 + (c >= g ? 0 : -100)), v > -1) for (m = 1, _ = v;;) {
        if (o = this._getDaysInMonth(g, m - 1), o >= _) break;m++, _ -= o;
      }if (r = this._daylightSavingAdjust(new Date(g, m - 1, _)), r.getFullYear() !== g || r.getMonth() + 1 !== m || r.getDate() !== _) throw "Invalid date";return r;
    }, ATOM: "yy-mm-dd", COOKIE: "D, dd M yy", ISO_8601: "yy-mm-dd", RFC_822: "D, d M y", RFC_850: "DD, dd-M-y", RFC_1036: "D, d M y", RFC_1123: "D, d M yy", RFC_2822: "D, d M yy", RSS: "D, d M y", TICKS: "!", TIMESTAMP: "@", W3C: "yy-mm-dd", _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)), formatDate: function formatDate(t, e, i) {
      if (!e) return "";var s,
          n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
          o = (i ? i.dayNames : null) || this._defaults.dayNames,
          a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
          r = (i ? i.monthNames : null) || this._defaults.monthNames,
          h = function h(e) {
        var i = t.length > s + 1 && t.charAt(s + 1) === e;return i && s++, i;
      },
          l = function l(t, e, i) {
        var s = "" + e;if (h(t)) for (; i > s.length;) {
          s = "0" + s;
        }return s;
      },
          c = function c(t, e, i, s) {
        return h(t) ? s[e] : i[e];
      },
          u = "",
          d = !1;if (e) for (s = 0; t.length > s; s++) {
        if (d) "'" !== t.charAt(s) || h("'") ? u += t.charAt(s) : d = !1;else switch (t.charAt(s)) {case "d":
            u += l("d", e.getDate(), 2);break;case "D":
            u += c("D", e.getDay(), n, o);break;case "o":
            u += l("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);break;case "m":
            u += l("m", e.getMonth() + 1, 2);break;case "M":
            u += c("M", e.getMonth(), a, r);break;case "y":
            u += h("y") ? e.getFullYear() : (10 > e.getFullYear() % 100 ? "0" : "") + e.getFullYear() % 100;break;case "@":
            u += e.getTime();break;case "!":
            u += 1e4 * e.getTime() + this._ticksTo1970;break;case "'":
            h("'") ? u += "'" : d = !0;break;default:
            u += t.charAt(s);}
      }return u;
    }, _possibleChars: function _possibleChars(t) {
      var e,
          i = "",
          s = !1,
          n = function n(i) {
        var s = t.length > e + 1 && t.charAt(e + 1) === i;return s && e++, s;
      };for (e = 0; t.length > e; e++) {
        if (s) "'" !== t.charAt(e) || n("'") ? i += t.charAt(e) : s = !1;else switch (t.charAt(e)) {case "d":case "m":case "y":case "@":
            i += "0123456789";break;case "D":case "M":
            return null;case "'":
            n("'") ? i += "'" : s = !0;break;default:
            i += t.charAt(e);}
      }return i;
    }, _get: function _get(t, e) {
      return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e];
    }, _setDateFromField: function _setDateFromField(t, e) {
      if (t.input.val() !== t.lastVal) {
        var i = this._get(t, "dateFormat"),
            s = t.lastVal = t.input ? t.input.val() : null,
            n = this._getDefaultDate(t),
            o = n,
            a = this._getFormatConfig(t);try {
          o = this.parseDate(i, s, a) || n;
        } catch (r) {
          s = e ? "" : s;
        }t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), t.currentDay = s ? o.getDate() : 0, t.currentMonth = s ? o.getMonth() : 0, t.currentYear = s ? o.getFullYear() : 0, this._adjustInstDate(t);
      }
    }, _getDefaultDate: function _getDefaultDate(t) {
      return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date()));
    }, _determineDate: function _determineDate(e, i, s) {
      var n = function n(t) {
        var e = new Date();return e.setDate(e.getDate() + t), e;
      },
          o = function o(i) {
        try {
          return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e));
        } catch (s) {}for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date(), o = n.getFullYear(), a = n.getMonth(), r = n.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l;) {
          switch (l[2] || "d") {case "d":case "D":
              r += parseInt(l[1], 10);break;case "w":case "W":
              r += 7 * parseInt(l[1], 10);break;case "m":case "M":
              a += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a));break;case "y":case "Y":
              o += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a));}l = h.exec(i);
        }return new Date(o, a, r);
      },
          a = null == i || "" === i ? s : "string" == typeof i ? o(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());return a = a && "Invalid Date" == "" + a ? s : a, a && (a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)), this._daylightSavingAdjust(a);
    }, _daylightSavingAdjust: function _daylightSavingAdjust(t) {
      return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null;
    }, _setDate: function _setDate(t, e, i) {
      var s = !e,
          n = t.selectedMonth,
          o = t.selectedYear,
          a = this._restrictMinMax(t, this._determineDate(t, e, new Date()));t.selectedDay = t.currentDay = a.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = a.getMonth(), t.drawYear = t.selectedYear = t.currentYear = a.getFullYear(), n === t.selectedMonth && o === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t));
    }, _getDate: function _getDate(t) {
      var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));return e;
    }, _attachHandlers: function _attachHandlers(e) {
      var i = this._get(e, "stepMonths"),
          s = "#" + e.id.replace(/\\\\/g, "\\");e.dpDiv.find("[data-handler]").map(function () {
        var e = { prev: function prev() {
            t.datepicker._adjustDate(s, -i, "M");
          }, next: function next() {
            t.datepicker._adjustDate(s, +i, "M");
          }, hide: function hide() {
            t.datepicker._hideDatepicker();
          }, today: function today() {
            t.datepicker._gotoToday(s);
          }, selectDay: function selectDay() {
            return t.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1;
          }, selectMonth: function selectMonth() {
            return t.datepicker._selectMonthYear(s, this, "M"), !1;
          }, selectYear: function selectYear() {
            return t.datepicker._selectMonthYear(s, this, "Y"), !1;
          } };t(this).on(this.getAttribute("data-event"), e[this.getAttribute("data-handler")]);
      });
    }, _generateHTML: function _generateHTML(t) {
      var e,
          i,
          s,
          n,
          o,
          a,
          r,
          h,
          l,
          c,
          u,
          d,
          p,
          f,
          g,
          m,
          _,
          v,
          b,
          y,
          w,
          k,
          x,
          C,
          D,
          I,
          T,
          P,
          M,
          S,
          H,
          z,
          O,
          A,
          N,
          W,
          E,
          F,
          L,
          R = new Date(),
          B = this._daylightSavingAdjust(new Date(R.getFullYear(), R.getMonth(), R.getDate())),
          Y = this._get(t, "isRTL"),
          j = this._get(t, "showButtonPanel"),
          q = this._get(t, "hideIfNoPrevNext"),
          K = this._get(t, "navigationAsDateFormat"),
          U = this._getNumberOfMonths(t),
          V = this._get(t, "showCurrentAtPos"),
          $ = this._get(t, "stepMonths"),
          X = 1 !== U[0] || 1 !== U[1],
          G = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
          Q = this._getMinMaxDate(t, "min"),
          J = this._getMinMaxDate(t, "max"),
          Z = t.drawMonth - V,
          te = t.drawYear;if (0 > Z && (Z += 12, te--), J) for (e = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - U[0] * U[1] + 1, J.getDate())), e = Q && Q > e ? Q : e; this._daylightSavingAdjust(new Date(te, Z, 1)) > e;) {
        Z--, 0 > Z && (Z = 11, te--);
      }for (t.drawMonth = Z, t.drawYear = te, i = this._get(t, "prevText"), i = K ? this.formatDate(i, this._daylightSavingAdjust(new Date(te, Z - $, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>" : q ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(t, "nextText"), n = K ? this.formatDate(n, this._daylightSavingAdjust(new Date(te, Z + $, 1)), this._getFormatConfig(t)) : n, o = this._canAdjustMonth(t, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>" : q ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>", a = this._get(t, "currentText"), r = this._get(t, "gotoCurrent") && t.currentDay ? G : B, a = K ? this.formatDate(a, r, this._getFormatConfig(t)) : a, h = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", l = j ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + a + "</button>" : "") + (Y ? "" : h) + "</div>" : "", c = parseInt(this._get(t, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), g = this._get(t, "monthNamesShort"), m = this._get(t, "beforeShowDay"), _ = this._get(t, "showOtherMonths"), v = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), y = "", k = 0; U[0] > k; k++) {
        for (x = "", this.maxRows = 4, C = 0; U[1] > C; C++) {
          if (D = this._daylightSavingAdjust(new Date(te, Z, t.selectedDay)), I = " ui-corner-all", T = "", X) {
            if (T += "<div class='ui-datepicker-group", U[1] > 1) switch (C) {case 0:
                T += " ui-datepicker-group-first", I = " ui-corner-" + (Y ? "right" : "left");break;case U[1] - 1:
                T += " ui-datepicker-group-last", I = " ui-corner-" + (Y ? "left" : "right");break;default:
                T += " ui-datepicker-group-middle", I = "";}T += "'>";
          }for (T += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + I + "'>" + (/all|left/.test(I) && 0 === k ? Y ? o : s : "") + (/all|right/.test(I) && 0 === k ? Y ? s : o : "") + this._generateMonthYearHeader(t, Z, te, Q, J, k > 0 || C > 0, f, g) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", P = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", w = 0; 7 > w; w++) {
            M = (w + c) % 7, P += "<th scope='col'" + ((w + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + d[M] + "'>" + p[M] + "</span></th>";
          }for (T += P + "</tr></thead><tbody>", S = this._getDaysInMonth(te, Z), te === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, S)), H = (this._getFirstDayOfMonth(te, Z) - c + 7) % 7, z = Math.ceil((H + S) / 7), O = X ? this.maxRows > z ? this.maxRows : z : z, this.maxRows = O, A = this._daylightSavingAdjust(new Date(te, Z, 1 - H)), N = 0; O > N; N++) {
            for (T += "<tr>", W = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(A) + "</td>" : "", w = 0; 7 > w; w++) {
              E = m ? m.apply(t.input ? t.input[0] : null, [A]) : [!0, ""], F = A.getMonth() !== Z, L = F && !v || !E[0] || Q && Q > A || J && A > J, W += "<td class='" + ((w + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (F ? " ui-datepicker-other-month" : "") + (A.getTime() === D.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === A.getTime() && b.getTime() === D.getTime() ? " " + this._dayOverClass : "") + (L ? " " + this._unselectableClass + " ui-state-disabled" : "") + (F && !_ ? "" : " " + E[1] + (A.getTime() === G.getTime() ? " " + this._currentClass : "") + (A.getTime() === B.getTime() ? " ui-datepicker-today" : "")) + "'" + (F && !_ || !E[2] ? "" : " title='" + E[2].replace(/'/g, "&#39;") + "'") + (L ? "" : " data-handler='selectDay' data-event='click' data-month='" + A.getMonth() + "' data-year='" + A.getFullYear() + "'") + ">" + (F && !_ ? "&#xa0;" : L ? "<span class='ui-state-default'>" + A.getDate() + "</span>" : "<a class='ui-state-default" + (A.getTime() === B.getTime() ? " ui-state-highlight" : "") + (A.getTime() === G.getTime() ? " ui-state-active" : "") + (F ? " ui-priority-secondary" : "") + "' href='#'>" + A.getDate() + "</a>") + "</td>", A.setDate(A.getDate() + 1), A = this._daylightSavingAdjust(A);
            }T += W + "</tr>";
          }Z++, Z > 11 && (Z = 0, te++), T += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && C === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += T;
        }y += x;
      }return y += l, t._keyEvent = !1, y;
    }, _generateMonthYearHeader: function _generateMonthYearHeader(t, e, i, s, n, o, a, r) {
      var h,
          l,
          c,
          u,
          d,
          p,
          f,
          g,
          m = this._get(t, "changeMonth"),
          _ = this._get(t, "changeYear"),
          v = this._get(t, "showMonthAfterYear"),
          b = "<div class='ui-datepicker-title'>",
          y = "";if (o || !m) y += "<span class='ui-datepicker-month'>" + a[e] + "</span>";else {
        for (h = s && s.getFullYear() === i, l = n && n.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; 12 > c; c++) {
          (!h || c >= s.getMonth()) && (!l || n.getMonth() >= c) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + r[c] + "</option>");
        }y += "</select>";
      }if (v || (b += y + (!o && m && _ ? "" : "&#xa0;")), !t.yearshtml) if (t.yearshtml = "", o || !_) b += "<span class='ui-datepicker-year'>" + i + "</span>";else {
        for (u = this._get(t, "yearRange").split(":"), d = new Date().getFullYear(), p = function p(t) {
          var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);return isNaN(e) ? d : e;
        }, f = p(u[0]), g = Math.max(f, p(u[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, g = n ? Math.min(g, n.getFullYear()) : g, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; g >= f; f++) {
          t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
        }t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null;
      }return b += this._get(t, "yearSuffix"), v && (b += (!o && m && _ ? "" : "&#xa0;") + y), b += "</div>";
    }, _adjustInstDate: function _adjustInstDate(t, e, i) {
      var s = t.selectedYear + ("Y" === i ? e : 0),
          n = t.selectedMonth + ("M" === i ? e : 0),
          o = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0),
          a = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, o)));t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t);
    }, _restrictMinMax: function _restrictMinMax(t, e) {
      var i = this._getMinMaxDate(t, "min"),
          s = this._getMinMaxDate(t, "max"),
          n = i && i > e ? i : e;return s && n > s ? s : n;
    }, _notifyChange: function _notifyChange(t) {
      var e = this._get(t, "onChangeMonthYear");e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t]);
    }, _getNumberOfMonths: function _getNumberOfMonths(t) {
      var e = this._get(t, "numberOfMonths");return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e;
    }, _getMinMaxDate: function _getMinMaxDate(t, e) {
      return this._determineDate(t, this._get(t, e + "Date"), null);
    }, _getDaysInMonth: function _getDaysInMonth(t, e) {
      return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate();
    }, _getFirstDayOfMonth: function _getFirstDayOfMonth(t, e) {
      return new Date(t, e, 1).getDay();
    }, _canAdjustMonth: function _canAdjustMonth(t, e, i, s) {
      var n = this._getNumberOfMonths(t),
          o = this._daylightSavingAdjust(new Date(i, s + (0 > e ? e : n[0] * n[1]), 1));return 0 > e && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o);
    }, _isInRange: function _isInRange(t, e) {
      var i,
          s,
          n = this._getMinMaxDate(t, "min"),
          o = this._getMinMaxDate(t, "max"),
          a = null,
          r = null,
          h = this._get(t, "yearRange");return h && (i = h.split(":"), s = new Date().getFullYear(), a = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (a += s), i[1].match(/[+\-].*/) && (r += s)), (!n || e.getTime() >= n.getTime()) && (!o || e.getTime() <= o.getTime()) && (!a || e.getFullYear() >= a) && (!r || r >= e.getFullYear());
    }, _getFormatConfig: function _getFormatConfig(t) {
      var e = this._get(t, "shortYearCutoff");return e = "string" != typeof e ? e : new Date().getFullYear() % 100 + parseInt(e, 10), { shortYearCutoff: e, dayNamesShort: this._get(t, "dayNamesShort"), dayNames: this._get(t, "dayNames"), monthNamesShort: this._get(t, "monthNamesShort"), monthNames: this._get(t, "monthNames") };
    }, _formatDate: function _formatDate(t, e, i, s) {
      e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);var n = e ? "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t));
    } }), t.fn.datepicker = function (e) {
    if (!this.length) return this;t.datepicker.initialized || (t(document).on("mousedown", t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);var i = Array.prototype.slice.call(arguments, 1);return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function () {
      "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e);
    }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i));
  }, t.datepicker = new s(), t.datepicker.initialized = !1, t.datepicker.uuid = new Date().getTime(), t.datepicker.version = "1.12.1", t.datepicker, t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());var _ = !1;t(document).on("mouseup", function () {
    _ = !1;
  }), t.widget("ui.mouse", { version: "1.12.1", options: { cancel: "input, textarea, button, select, option", distance: 1, delay: 0 }, _mouseInit: function _mouseInit() {
      var e = this;this.element.on("mousedown." + this.widgetName, function (t) {
        return e._mouseDown(t);
      }).on("click." + this.widgetName, function (i) {
        return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0;
      }), this.started = !1;
    }, _mouseDestroy: function _mouseDestroy() {
      this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
    }, _mouseDown: function _mouseDown(e) {
      if (!_) {
        this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;var i = this,
            s = 1 === e.which,
            n = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length : !1;return s && !n && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
          i.mouseDelayMet = !0;
        }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (t) {
          return i._mouseMove(t);
        }, this._mouseUpDelegate = function (t) {
          return i._mouseUp(t);
        }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), _ = !0, !0)) : !0;
      }
    }, _mouseMove: function _mouseMove(e) {
      if (this._mouseMoved) {
        if (t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button) return this._mouseUp(e);if (!e.which) if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) this.ignoreMissingWhich = !0;else if (!this.ignoreMissingWhich) return this._mouseUp(e);
      }return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted);
    }, _mouseUp: function _mouseUp(e) {
      this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, _ = !1, e.preventDefault();
    }, _mouseDistanceMet: function _mouseDistanceMet(t) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance;
    }, _mouseDelayMet: function _mouseDelayMet() {
      return this.mouseDelayMet;
    }, _mouseStart: function _mouseStart() {}, _mouseDrag: function _mouseDrag() {}, _mouseStop: function _mouseStop() {}, _mouseCapture: function _mouseCapture() {
      return !0;
    } }), t.ui.plugin = { add: function add(e, i, s) {
      var n,
          o = t.ui[e].prototype;for (n in s) {
        o.plugins[n] = o.plugins[n] || [], o.plugins[n].push([i, s[n]]);
      }
    }, call: function call(t, e, i, s) {
      var n,
          o = t.plugins[e];if (o && (s || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)) for (n = 0; o.length > n; n++) {
        t.options[o[n][0]] && o[n][1].apply(t.element, i);
      }
    } }, t.ui.safeBlur = function (e) {
    e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur");
  }, t.widget("ui.draggable", t.ui.mouse, { version: "1.12.1", widgetEventPrefix: "drag", options: { addClasses: !0, appendTo: "parent", axis: !1, connectToSortable: !1, containment: !1, cursor: "auto", cursorAt: !1, grid: !1, handle: !1, helper: "original", iframeFix: !1, opacity: !1, refreshPositions: !1, revert: !1, revertDuration: 500, scope: "default", scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, snap: !1, snapMode: "both", snapTolerance: 20, stack: !1, zIndex: !1, drag: null, start: null, stop: null }, _create: function _create() {
      "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit();
    }, _setOption: function _setOption(t, e) {
      this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName());
    }, _destroy: function _destroy() {
      return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this._removeHandleClassName(), this._mouseDestroy(), void 0);
    }, _mouseCapture: function _mouseCapture(e) {
      var i = this.options;return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (this._blurActiveElement(e), this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1);
    }, _blockFrames: function _blockFrames(e) {
      this.iframeBlocks = this.document.find(e).map(function () {
        var e = t(this);return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0];
      });
    }, _unblockFrames: function _unblockFrames() {
      this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
    }, _blurActiveElement: function _blurActiveElement(e) {
      var i = t.ui.safeActiveElement(this.document[0]),
          s = t(e.target);s.closest(i).length || t.ui.safeBlur(i);
    }, _mouseStart: function _mouseStart(e) {
      var i = this.options;return this.helper = this._createHelper(e), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function () {
        return "fixed" === t(this).css("position");
      }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(e), this.originalPosition = this.position = this._generatePosition(e, !1), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0);
    }, _refreshOffsets: function _refreshOffsets(t) {
      this.offset = { top: this.positionAbs.top - this.margins.top, left: this.positionAbs.left - this.margins.left, scroll: !1, parent: this._getParentOffset(), relative: this._getRelativeOffset() }, this.offset.click = { left: t.pageX - this.offset.left, top: t.pageY - this.offset.top };
    }, _mouseDrag: function _mouseDrag(e, i) {
      if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
        var s = this._uiHash();if (this._trigger("drag", e, s) === !1) return this._mouseUp(new t.Event("mouseup", e)), !1;this.position = s.position;
      }return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1;
    }, _mouseStop: function _mouseStop(e) {
      var i = this,
          s = !1;return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
        i._trigger("stop", e) !== !1 && i._clear();
      }) : this._trigger("stop", e) !== !1 && this._clear(), !1;
    }, _mouseUp: function _mouseUp(e) {
      return this._unblockFrames(), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.handleElement.is(e.target) && this.element.trigger("focus"), t.ui.mouse.prototype._mouseUp.call(this, e);
    }, cancel: function cancel() {
      return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new t.Event("mouseup", { target: this.element[0] })) : this._clear(), this;
    }, _getHandle: function _getHandle(e) {
      return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0;
    }, _setHandleClassName: function _setHandleClassName() {
      this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this._addClass(this.handleElement, "ui-draggable-handle");
    }, _removeHandleClassName: function _removeHandleClassName() {
      this._removeClass(this.handleElement, "ui-draggable-handle");
    }, _createHelper: function _createHelper(e) {
      var i = this.options,
          s = t.isFunction(i.helper),
          n = s ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s && n[0] === this.element[0] && this._setPositionRelative(), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n;
    }, _setPositionRelative: function _setPositionRelative() {
      /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
    }, _adjustOffsetFromHelper: function _adjustOffsetFromHelper(e) {
      "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
    }, _isRootNode: function _isRootNode(t) {
      return (/(html|body)/i.test(t.tagName) || t === this.document[0]
      );
    }, _getParentOffset: function _getParentOffset() {
      var e = this.offsetParent.offset(),
          i = this.document[0];return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (e = { top: 0, left: 0 }), { top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) };
    }, _getRelativeOffset: function _getRelativeOffset() {
      if ("relative" !== this.cssPosition) return { top: 0, left: 0 };var t = this.element.position(),
          e = this._isRootNode(this.scrollParent[0]);return { top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()), left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft()) };
    }, _cacheMargins: function _cacheMargins() {
      this.margins = { left: parseInt(this.element.css("marginLeft"), 10) || 0, top: parseInt(this.element.css("marginTop"), 10) || 0, right: parseInt(this.element.css("marginRight"), 10) || 0, bottom: parseInt(this.element.css("marginBottom"), 10) || 0 };
    }, _cacheHelperProportions: function _cacheHelperProportions() {
      this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
    }, _setContainment: function _setContainment() {
      var e,
          i,
          s,
          n = this.options,
          o = this.document[0];return this.relativeContainer = null, n.containment ? "window" === n.containment ? (this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === n.containment ? (this.containment = [0, 0, t(o).width() - this.helperProportions.width - this.margins.left, (t(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : n.containment.constructor === Array ? (this.containment = n.containment, void 0) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = t(n.containment), s = i[0], s && (e = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i), void 0) : (this.containment = null, void 0);
    }, _convertPositionTo: function _convertPositionTo(t, e) {
      e || (e = this.position);var i = "absolute" === t ? 1 : -1,
          s = this._isRootNode(this.scrollParent[0]);return { top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i, left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i };
    }, _generatePosition: function _generatePosition(t, e) {
      var i,
          s,
          n,
          o,
          a = this.options,
          r = this._isRootNode(this.scrollParent[0]),
          h = t.pageX,
          l = t.pageY;return r && this.offset.scroll || (this.offset.scroll = { top: this.scrollParent.scrollTop(), left: this.scrollParent.scrollLeft() }), e && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), a.grid && (n = a.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - a.grid[1] : n + a.grid[1] : n, o = a.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, h = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o), "y" === a.axis && (h = this.originalPageX), "x" === a.axis && (l = this.originalPageY)), { top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top), left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left) };
    }, _clear: function _clear() {
      this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy();
    }, _trigger: function _trigger(e, i, s) {
      return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s, this], !0), /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), t.Widget.prototype._trigger.call(this, e, i, s);
    }, plugins: {}, _uiHash: function _uiHash() {
      return { helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs };
    } }), t.ui.plugin.add("draggable", "connectToSortable", { start: function start(e, i, s) {
      var n = t.extend({}, i, { item: s.element });s.sortables = [], t(s.options.connectToSortable).each(function () {
        var i = t(this).sortable("instance");i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, n));
      });
    }, stop: function stop(e, i, s) {
      var n = t.extend({}, i, { item: s.element });s.cancelHelperRemoval = !1, t.each(s.sortables, function () {
        var t = this;t.isOver ? (t.isOver = 0, s.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = { position: t.placeholder.css("position"), top: t.placeholder.css("top"), left: t.placeholder.css("left") }, t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, n));
      });
    }, drag: function drag(e, i, s) {
      t.each(s.sortables, function () {
        var n = !1,
            o = this;o.positionAbs = s.positionAbs, o.helperProportions = s.helperProportions, o.offset.click = s.offset.click, o._intersectsWith(o.containerCache) && (n = !0, t.each(s.sortables, function () {
          return this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== o && this._intersectsWith(this.containerCache) && t.contains(o.element[0], this.element[0]) && (n = !1), n;
        })), n ? (o.isOver || (o.isOver = 1, s._parent = i.helper.parent(), o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0), o.options._helper = o.options.helper, o.options.helper = function () {
          return i.helper[0];
        }, e.target = o.currentItem[0], o._mouseCapture(e, !0), o._mouseStart(e, !0, !0), o.offset.click.top = s.offset.click.top, o.offset.click.left = s.offset.click.left, o.offset.parent.left -= s.offset.parent.left - o.offset.parent.left, o.offset.parent.top -= s.offset.parent.top - o.offset.parent.top, s._trigger("toSortable", e), s.dropped = o.element, t.each(s.sortables, function () {
          this.refreshPositions();
        }), s.currentItem = s.element, o.fromOutside = s), o.currentItem && (o._mouseDrag(e), i.position = o.position)) : o.isOver && (o.isOver = 0, o.cancelHelperRemoval = !0, o.options._revert = o.options.revert, o.options.revert = !1, o._trigger("out", e, o._uiHash(o)), o._mouseStop(e, !0), o.options.revert = o.options._revert, o.options.helper = o.options._helper, o.placeholder && o.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(e), i.position = s._generatePosition(e, !0), s._trigger("fromSortable", e), s.dropped = !1, t.each(s.sortables, function () {
          this.refreshPositions();
        }));
      });
    } }), t.ui.plugin.add("draggable", "cursor", { start: function start(e, i, s) {
      var n = t("body"),
          o = s.options;n.css("cursor") && (o._cursor = n.css("cursor")), n.css("cursor", o.cursor);
    }, stop: function stop(e, i, s) {
      var n = s.options;n._cursor && t("body").css("cursor", n._cursor);
    } }), t.ui.plugin.add("draggable", "opacity", { start: function start(e, i, s) {
      var n = t(i.helper),
          o = s.options;n.css("opacity") && (o._opacity = n.css("opacity")), n.css("opacity", o.opacity);
    }, stop: function stop(e, i, s) {
      var n = s.options;n._opacity && t(i.helper).css("opacity", n._opacity);
    } }), t.ui.plugin.add("draggable", "scroll", { start: function start(t, e, i) {
      i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset());
    }, drag: function drag(e, i, s) {
      var n = s.options,
          o = !1,
          a = s.scrollParentNotHidden[0],
          r = s.document[0];a !== r && "HTML" !== a.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + a.offsetHeight - e.pageY < n.scrollSensitivity ? a.scrollTop = o = a.scrollTop + n.scrollSpeed : e.pageY - s.overflowOffset.top < n.scrollSensitivity && (a.scrollTop = o = a.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + a.offsetWidth - e.pageX < n.scrollSensitivity ? a.scrollLeft = o = a.scrollLeft + n.scrollSpeed : e.pageX - s.overflowOffset.left < n.scrollSensitivity && (a.scrollLeft = o = a.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (e.pageY - t(r).scrollTop() < n.scrollSensitivity ? o = t(r).scrollTop(t(r).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(r).scrollTop()) < n.scrollSensitivity && (o = t(r).scrollTop(t(r).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (e.pageX - t(r).scrollLeft() < n.scrollSensitivity ? o = t(r).scrollLeft(t(r).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(r).scrollLeft()) < n.scrollSensitivity && (o = t(r).scrollLeft(t(r).scrollLeft() + n.scrollSpeed)))), o !== !1 && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(s, e);
    } }), t.ui.plugin.add("draggable", "snap", { start: function start(e, i, s) {
      var n = s.options;s.snapElements = [], t(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function () {
        var e = t(this),
            i = e.offset();this !== s.element[0] && s.snapElements.push({ item: this, width: e.outerWidth(), height: e.outerHeight(), top: i.top, left: i.left });
      });
    }, drag: function drag(e, i, s) {
      var n,
          o,
          a,
          r,
          h,
          l,
          c,
          u,
          d,
          p,
          f = s.options,
          g = f.snapTolerance,
          m = i.offset.left,
          _ = m + s.helperProportions.width,
          v = i.offset.top,
          b = v + s.helperProportions.height;for (d = s.snapElements.length - 1; d >= 0; d--) {
        h = s.snapElements[d].left - s.margins.left, l = h + s.snapElements[d].width, c = s.snapElements[d].top - s.margins.top, u = c + s.snapElements[d].height, h - g > _ || m > l + g || c - g > b || v > u + g || !t.contains(s.snapElements[d].item.ownerDocument, s.snapElements[d].item) ? (s.snapElements[d].snapping && s.options.snap.release && s.options.snap.release.call(s.element, e, t.extend(s._uiHash(), { snapItem: s.snapElements[d].item })), s.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (n = g >= Math.abs(c - b), o = g >= Math.abs(u - v), a = g >= Math.abs(h - _), r = g >= Math.abs(l - m), n && (i.position.top = s._convertPositionTo("relative", { top: c - s.helperProportions.height, left: 0 }).top), o && (i.position.top = s._convertPositionTo("relative", { top: u, left: 0 }).top), a && (i.position.left = s._convertPositionTo("relative", { top: 0, left: h - s.helperProportions.width }).left), r && (i.position.left = s._convertPositionTo("relative", { top: 0, left: l }).left)), p = n || o || a || r, "outer" !== f.snapMode && (n = g >= Math.abs(c - v), o = g >= Math.abs(u - b), a = g >= Math.abs(h - m), r = g >= Math.abs(l - _), n && (i.position.top = s._convertPositionTo("relative", { top: c, left: 0 }).top), o && (i.position.top = s._convertPositionTo("relative", { top: u - s.helperProportions.height, left: 0 }).top), a && (i.position.left = s._convertPositionTo("relative", { top: 0, left: h }).left), r && (i.position.left = s._convertPositionTo("relative", { top: 0, left: l - s.helperProportions.width }).left)), !s.snapElements[d].snapping && (n || o || a || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, e, t.extend(s._uiHash(), { snapItem: s.snapElements[d].item })), s.snapElements[d].snapping = n || o || a || r || p);
      }
    } }), t.ui.plugin.add("draggable", "stack", { start: function start(e, i, s) {
      var n,
          o = s.options,
          a = t.makeArray(t(o.stack)).sort(function (e, i) {
        return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0);
      });a.length && (n = parseInt(t(a[0]).css("zIndex"), 10) || 0, t(a).each(function (e) {
        t(this).css("zIndex", n + e);
      }), this.css("zIndex", n + a.length));
    } }), t.ui.plugin.add("draggable", "zIndex", { start: function start(e, i, s) {
      var n = t(i.helper),
          o = s.options;n.css("zIndex") && (o._zIndex = n.css("zIndex")), n.css("zIndex", o.zIndex);
    }, stop: function stop(e, i, s) {
      var n = s.options;n._zIndex && t(i.helper).css("zIndex", n._zIndex);
    } }), t.ui.draggable, t.widget("ui.resizable", t.ui.mouse, { version: "1.12.1", widgetEventPrefix: "resize", options: { alsoResize: !1, animate: !1, animateDuration: "slow", animateEasing: "swing", aspectRatio: !1, autoHide: !1, classes: { "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se" }, containment: !1, ghost: !1, grid: !1, handles: "e,s,se", helper: !1, maxHeight: null, maxWidth: null, minHeight: 10, minWidth: 10, zIndex: 90, resize: null, start: null, stop: null }, _num: function _num(t) {
      return parseFloat(t) || 0;
    }, _isNumber: function _isNumber(t) {
      return !isNaN(parseFloat(t));
    }, _hasScroll: function _hasScroll(e, i) {
      if ("hidden" === t(e).css("overflow")) return !1;var s = i && "left" === i ? "scrollLeft" : "scrollTop",
          n = !1;return e[s] > 0 ? !0 : (e[s] = 1, n = e[s] > 0, e[s] = 0, n);
    }, _create: function _create() {
      var e,
          i = this.options,
          s = this;this._addClass("ui-resizable"), t.extend(this, { _aspectRatio: !!i.aspectRatio, aspectRatio: i.aspectRatio, originalElement: this.element, _proportionallyResizeElements: [], _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({ position: this.element.css("position"), width: this.element.outerWidth(), height: this.element.outerHeight(), top: this.element.css("top"), left: this.element.css("left") })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, e = { marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom"), marginLeft: this.originalElement.css("marginLeft") }, this.element.css(e), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({ position: "static", zoom: 1, display: "block" })), this.originalElement.css(e), this._proportionallyResize()), this._setupHandles(), i.autoHide && t(this.element).on("mouseenter", function () {
        i.disabled || (s._removeClass("ui-resizable-autohide"), s._handles.show());
      }).on("mouseleave", function () {
        i.disabled || s.resizing || (s._addClass("ui-resizable-autohide"), s._handles.hide());
      }), this._mouseInit();
    }, _destroy: function _destroy() {
      this._mouseDestroy();var e,
          i = function i(e) {
        t(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove();
      };return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({ position: e.css("position"), width: e.outerWidth(), height: e.outerHeight(), top: e.css("top"), left: e.css("left") }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this;
    }, _setOption: function _setOption(t, e) {
      switch (this._super(t, e), t) {case "handles":
          this._removeHandles(), this._setupHandles();break;default:}
    }, _setupHandles: function _setupHandles() {
      var e,
          i,
          s,
          n,
          o,
          a = this.options,
          r = this;if (this.handles = a.handles || (t(".ui-resizable-handle", this.element).length ? { n: ".ui-resizable-n", e: ".ui-resizable-e", s: ".ui-resizable-s", w: ".ui-resizable-w", se: ".ui-resizable-se", sw: ".ui-resizable-sw", ne: ".ui-resizable-ne", nw: ".ui-resizable-nw" } : "e,s,se"), this._handles = t(), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), s = this.handles.split(","), this.handles = {}, i = 0; s.length > i; i++) {
        e = t.trim(s[i]), n = "ui-resizable-" + e, o = t("<div>"), this._addClass(o, "ui-resizable-handle " + n), o.css({ zIndex: a.zIndex }), this.handles[e] = ".ui-resizable-" + e, this.element.append(o);
      }this._renderAxis = function (e) {
        var i, s, n, o;e = e || this.element;for (i in this.handles) {
          this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = t(this.handles[i]), this._on(this.handles[i], { mousedown: r._mouseDown })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = t(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(n, o), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i]);
        }
      }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.on("mouseover", function () {
        r.resizing || (this.className && (o = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), r.axis = o && o[1] ? o[1] : "se");
      }), a.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"));
    }, _removeHandles: function _removeHandles() {
      this._handles.remove();
    }, _mouseCapture: function _mouseCapture(e) {
      var i,
          s,
          n = !1;for (i in this.handles) {
        s = t(this.handles[i])[0], (s === e.target || t.contains(s, e.target)) && (n = !0);
      }return !this.options.disabled && n;
    }, _mouseStart: function _mouseStart(e) {
      var i,
          s,
          n,
          o = this.options,
          a = this.element;return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), s = this._num(this.helper.css("top")), o.containment && (i += t(o.containment).scrollLeft() || 0, s += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = { left: i, top: s }, this.size = this._helper ? { width: this.helper.width(), height: this.helper.height() } : { width: a.width(), height: a.height() }, this.originalSize = this._helper ? { width: a.outerWidth(), height: a.outerHeight() } : { width: a.width(), height: a.height() }, this.sizeDiff = { width: a.outerWidth() - a.width(), height: a.outerHeight() - a.height() }, this.originalPosition = { left: i, top: s }, this.originalMousePosition = { left: e.pageX, top: e.pageY }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, n = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === n ? this.axis + "-resize" : n), this._addClass("ui-resizable-resizing"), this._propagate("start", e), !0;
    }, _mouseDrag: function _mouseDrag(e) {
      var i,
          s,
          n = this.originalMousePosition,
          o = this.axis,
          a = e.pageX - n.left || 0,
          r = e.pageY - n.top || 0,
          h = this._change[o];return this._updatePrevProperties(), h ? (i = h.apply(this, [e, a, r]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger("resize", e, this.ui()), this._applyChanges()), !1) : !1;
    }, _mouseStop: function _mouseStop(e) {
      this.resizing = !1;var i,
          s,
          n,
          o,
          a,
          r,
          h,
          l = this.options,
          c = this;return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && this._hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, o = s ? 0 : c.sizeDiff.width, a = { width: c.helper.width() - o, height: c.helper.height() - n }, r = parseFloat(c.element.css("left")) + (c.position.left - c.originalPosition.left) || null, h = parseFloat(c.element.css("top")) + (c.position.top - c.originalPosition.top) || null, l.animate || this.element.css(t.extend(a, { top: h, left: r })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !l.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1;
    }, _updatePrevProperties: function _updatePrevProperties() {
      this.prevPosition = { top: this.position.top, left: this.position.left }, this.prevSize = { width: this.size.width, height: this.size.height };
    }, _applyChanges: function _applyChanges() {
      var t = {};return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"), this.helper.css(t), t;
    }, _updateVirtualBoundaries: function _updateVirtualBoundaries(t) {
      var e,
          i,
          s,
          n,
          o,
          a = this.options;o = { minWidth: this._isNumber(a.minWidth) ? a.minWidth : 0, maxWidth: this._isNumber(a.maxWidth) ? a.maxWidth : 1 / 0, minHeight: this._isNumber(a.minHeight) ? a.minHeight : 0, maxHeight: this._isNumber(a.maxHeight) ? a.maxHeight : 1 / 0 }, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, s = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, n = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), s > o.minHeight && (o.minHeight = s), o.maxWidth > i && (o.maxWidth = i), o.maxHeight > n && (o.maxHeight = n)), this._vBoundaries = o;
    }, _updateCache: function _updateCache(t) {
      this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width);
    }, _updateRatio: function _updateRatio(t) {
      var e = this.position,
          i = this.size,
          s = this.axis;return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), "sw" === s && (t.left = e.left + (i.width - t.width), t.top = null), "nw" === s && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t;
    }, _respectSize: function _respectSize(t) {
      var e = this._vBoundaries,
          i = this.axis,
          s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
          n = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
          o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
          a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
          r = this.originalPosition.left + this.originalSize.width,
          h = this.originalPosition.top + this.originalSize.height,
          l = /sw|nw|w/.test(i),
          c = /nw|ne|n/.test(i);return o && (t.width = e.minWidth), a && (t.height = e.minHeight), s && (t.width = e.maxWidth), n && (t.height = e.maxHeight), o && l && (t.left = r - e.minWidth), s && l && (t.left = r - e.maxWidth), a && c && (t.top = h - e.minHeight), n && c && (t.top = h - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t;
    }, _getPaddingPlusBorderDimensions: function _getPaddingPlusBorderDimensions(t) {
      for (var e = 0, i = [], s = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], n = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; 4 > e; e++) {
        i[e] = parseFloat(s[e]) || 0, i[e] += parseFloat(n[e]) || 0;
      }return { height: i[0] + i[2], width: i[1] + i[3] };
    }, _proportionallyResize: function _proportionallyResize() {
      if (this._proportionallyResizeElements.length) for (var t, e = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > e; e++) {
        t = this._proportionallyResizeElements[e], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({ height: i.height() - this.outerDimensions.height || 0, width: i.width() - this.outerDimensions.width || 0 });
      }
    }, _renderProxy: function _renderProxy() {
      var e = this.element,
          i = this.options;this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this._addClass(this.helper, this._helper), this.helper.css({ width: this.element.outerWidth(), height: this.element.outerHeight(), position: "absolute", left: this.elementOffset.left + "px", top: this.elementOffset.top + "px", zIndex: ++i.zIndex }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element;
    }, _change: { e: function e(t, _e) {
        return { width: this.originalSize.width + _e };
      }, w: function w(t, e) {
        var i = this.originalSize,
            s = this.originalPosition;return { left: s.left + e, width: i.width - e };
      }, n: function n(t, e, i) {
        var s = this.originalSize,
            n = this.originalPosition;return { top: n.top + i, height: s.height - i };
      }, s: function s(t, e, i) {
        return { height: this.originalSize.height + i };
      }, se: function se(e, i, s) {
        return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]));
      }, sw: function sw(e, i, s) {
        return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]));
      }, ne: function ne(e, i, s) {
        return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]));
      }, nw: function nw(e, i, s) {
        return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]));
      } }, _propagate: function _propagate(e, i) {
      t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui());
    }, plugins: {}, ui: function ui() {
      return { originalElement: this.originalElement, element: this.element, helper: this.helper, position: this.position, size: this.size, originalSize: this.originalSize, originalPosition: this.originalPosition };
    } }), t.ui.plugin.add("resizable", "animate", { stop: function stop(e) {
      var i = t(this).resizable("instance"),
          s = i.options,
          n = i._proportionallyResizeElements,
          o = n.length && /textarea/i.test(n[0].nodeName),
          a = o && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
          r = o ? 0 : i.sizeDiff.width,
          h = { width: i.size.width - r, height: i.size.height - a },
          l = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
          c = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;i.element.animate(t.extend(h, c && l ? { top: c, left: l } : {}), { duration: s.animateDuration, easing: s.animateEasing, step: function step() {
          var s = { width: parseFloat(i.element.css("width")), height: parseFloat(i.element.css("height")), top: parseFloat(i.element.css("top")), left: parseFloat(i.element.css("left")) };n && n.length && t(n[0]).css({ width: s.width, height: s.height }), i._updateCache(s), i._propagate("resize", e);
        } });
    } }), t.ui.plugin.add("resizable", "containment", { start: function start() {
      var e,
          i,
          s,
          n,
          o,
          a,
          r,
          h = t(this).resizable("instance"),
          l = h.options,
          c = h.element,
          u = l.containment,
          d = u instanceof t ? u.get(0) : /parent/.test(u) ? c.parent().get(0) : u;d && (h.containerElement = t(d), /document/.test(u) || u === document ? (h.containerOffset = { left: 0, top: 0 }, h.containerPosition = { left: 0, top: 0 }, h.parentData = { element: t(document), left: 0, top: 0, width: t(document).width(), height: t(document).height() || document.body.parentNode.scrollHeight }) : (e = t(d), i = [], t(["Top", "Right", "Left", "Bottom"]).each(function (t, s) {
        i[t] = h._num(e.css("padding" + s));
      }), h.containerOffset = e.offset(), h.containerPosition = e.position(), h.containerSize = { height: e.innerHeight() - i[3], width: e.innerWidth() - i[1] }, s = h.containerOffset, n = h.containerSize.height, o = h.containerSize.width, a = h._hasScroll(d, "left") ? d.scrollWidth : o, r = h._hasScroll(d) ? d.scrollHeight : n, h.parentData = { element: d, left: s.left, top: s.top, width: a, height: r }));
    }, resize: function resize(e) {
      var i,
          s,
          n,
          o,
          a = t(this).resizable("instance"),
          r = a.options,
          h = a.containerOffset,
          l = a.position,
          c = a._aspectRatio || e.shiftKey,
          u = { top: 0, left: 0 },
          d = a.containerElement,
          p = !0;d[0] !== document && /static/.test(d.css("position")) && (u = h), l.left < (a._helper ? h.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - h.left : a.position.left - u.left), c && (a.size.height = a.size.width / a.aspectRatio, p = !1), a.position.left = r.helper ? h.left : 0), l.top < (a._helper ? h.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - h.top : a.position.top), c && (a.size.width = a.size.height * a.aspectRatio, p = !1), a.position.top = a._helper ? h.top : 0), n = a.containerElement.get(0) === a.element.parent().get(0), o = /relative|absolute/.test(a.containerElement.css("position")), n && o ? (a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top) : (a.offset.left = a.element.offset().left, a.offset.top = a.element.offset().top), i = Math.abs(a.sizeDiff.width + (a._helper ? a.offset.left - u.left : a.offset.left - h.left)), s = Math.abs(a.sizeDiff.height + (a._helper ? a.offset.top - u.top : a.offset.top - h.top)), i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i, c && (a.size.height = a.size.width / a.aspectRatio, p = !1)), s + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - s, c && (a.size.width = a.size.height * a.aspectRatio, p = !1)), p || (a.position.left = a.prevPosition.left, a.position.top = a.prevPosition.top, a.size.width = a.prevSize.width, a.size.height = a.prevSize.height);
    }, stop: function stop() {
      var e = t(this).resizable("instance"),
          i = e.options,
          s = e.containerOffset,
          n = e.containerPosition,
          o = e.containerElement,
          a = t(e.helper),
          r = a.offset(),
          h = a.outerWidth() - e.sizeDiff.width,
          l = a.outerHeight() - e.sizeDiff.height;e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({ left: r.left - n.left - s.left, width: h, height: l }), e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({ left: r.left - n.left - s.left, width: h, height: l });
    } }), t.ui.plugin.add("resizable", "alsoResize", { start: function start() {
      var e = t(this).resizable("instance"),
          i = e.options;t(i.alsoResize).each(function () {
        var e = t(this);e.data("ui-resizable-alsoresize", { width: parseFloat(e.width()), height: parseFloat(e.height()), left: parseFloat(e.css("left")), top: parseFloat(e.css("top")) });
      });
    }, resize: function resize(e, i) {
      var s = t(this).resizable("instance"),
          n = s.options,
          o = s.originalSize,
          a = s.originalPosition,
          r = { height: s.size.height - o.height || 0, width: s.size.width - o.width || 0, top: s.position.top - a.top || 0, left: s.position.left - a.left || 0 };t(n.alsoResize).each(function () {
        var e = t(this),
            s = t(this).data("ui-resizable-alsoresize"),
            n = {},
            o = e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];t.each(o, function (t, e) {
          var i = (s[e] || 0) + (r[e] || 0);i && i >= 0 && (n[e] = i || null);
        }), e.css(n);
      });
    }, stop: function stop() {
      t(this).removeData("ui-resizable-alsoresize");
    } }), t.ui.plugin.add("resizable", "ghost", { start: function start() {
      var e = t(this).resizable("instance"),
          i = e.size;e.ghost = e.originalElement.clone(), e.ghost.css({ opacity: .25, display: "block", position: "relative", height: i.height, width: i.width, margin: 0, left: 0, top: 0 }), e._addClass(e.ghost, "ui-resizable-ghost"), t.uiBackCompat !== !1 && "string" == typeof e.options.ghost && e.ghost.addClass(this.options.ghost), e.ghost.appendTo(e.helper);
    }, resize: function resize() {
      var e = t(this).resizable("instance");e.ghost && e.ghost.css({ position: "relative", height: e.size.height, width: e.size.width });
    }, stop: function stop() {
      var e = t(this).resizable("instance");e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0));
    } }), t.ui.plugin.add("resizable", "grid", { resize: function resize() {
      var e,
          i = t(this).resizable("instance"),
          s = i.options,
          n = i.size,
          o = i.originalSize,
          a = i.originalPosition,
          r = i.axis,
          h = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
          l = h[0] || 1,
          c = h[1] || 1,
          u = Math.round((n.width - o.width) / l) * l,
          d = Math.round((n.height - o.height) / c) * c,
          p = o.width + u,
          f = o.height + d,
          g = s.maxWidth && p > s.maxWidth,
          m = s.maxHeight && f > s.maxHeight,
          _ = s.minWidth && s.minWidth > p,
          v = s.minHeight && s.minHeight > f;s.grid = h, _ && (p += l), v && (f += c), g && (p -= l), m && (f -= c), /^(se|s|e)$/.test(r) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.top = a.top - d) : /^(sw)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.left = a.left - u) : ((0 >= f - c || 0 >= p - l) && (e = i._getPaddingPlusBorderDimensions(this)), f - c > 0 ? (i.size.height = f, i.position.top = a.top - d) : (f = c - e.height, i.size.height = f, i.position.top = a.top + o.height - f), p - l > 0 ? (i.size.width = p, i.position.left = a.left - u) : (p = l - e.width, i.size.width = p, i.position.left = a.left + o.width - p));
    } }), t.ui.resizable, t.widget("ui.dialog", { version: "1.12.1", options: { appendTo: "body", autoOpen: !0, buttons: [], classes: { "ui-dialog": "ui-corner-all", "ui-dialog-titlebar": "ui-corner-all" }, closeOnEscape: !0, closeText: "Close", draggable: !0, hide: null, height: "auto", maxHeight: null, maxWidth: null, minHeight: 150, minWidth: 150, modal: !1, position: { my: "center", at: "center", of: window, collision: "fit", using: function using(e) {
          var i = t(this).css(e).offset().top;0 > i && t(this).css("top", e.top - i);
        } }, resizable: !0, show: null, title: null, width: 300, beforeClose: null, close: null, drag: null, dragStart: null, dragStop: null, focus: null, open: null, resize: null, resizeStart: null, resizeStop: null }, sizeRelatedOptions: { buttons: !0, height: !0, maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0, width: !0 }, resizableRelatedOptions: { maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0 }, _create: function _create() {
      this.originalCss = { display: this.element[0].style.display, width: this.element[0].style.width, minHeight: this.element[0].style.minHeight, maxHeight: this.element[0].style.maxHeight, height: this.element[0].style.height }, this.originalPosition = { parent: this.element.parent(), index: this.element.parent().children().index(this.element) }, this.originalTitle = this.element.attr("title"), null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle), this.options.disabled && (this.options.disabled = !1), this._createWrapper(), this.element.show().removeAttr("title").appendTo(this.uiDialog), this._addClass("ui-dialog-content", "ui-widget-content"), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus();
    }, _init: function _init() {
      this.options.autoOpen && this.open();
    }, _appendTo: function _appendTo() {
      var e = this.options.appendTo;return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0);
    }, _destroy: function _destroy() {
      var t,
          e = this.originalPosition;this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().css(this.originalCss).detach(), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element);
    }, widget: function widget() {
      return this.uiDialog;
    }, disable: t.noop, enable: t.noop, close: function close(e) {
      var i = this;this._isOpen && this._trigger("beforeClose", e) !== !1 && (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), this.opener.filter(":focusable").trigger("focus").length || t.ui.safeBlur(t.ui.safeActiveElement(this.document[0])), this._hide(this.uiDialog, this.options.hide, function () {
        i._trigger("close", e);
      }));
    }, isOpen: function isOpen() {
      return this._isOpen;
    }, moveToTop: function moveToTop() {
      this._moveToTop();
    }, _moveToTop: function _moveToTop(e, i) {
      var s = !1,
          n = this.uiDialog.siblings(".ui-front:visible").map(function () {
        return +t(this).css("z-index");
      }).get(),
          o = Math.max.apply(null, n);return o >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", o + 1), s = !0), s && !i && this._trigger("focus", e), s;
    }, open: function open() {
      var e = this;return this._isOpen ? (this._moveToTop() && this._focusTabbable(), void 0) : (this._isOpen = !0, this.opener = t(t.ui.safeActiveElement(this.document[0])), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function () {
        e._focusTabbable(), e._trigger("focus");
      }), this._makeFocusTarget(), this._trigger("open"), void 0);
    }, _focusTabbable: function _focusTabbable() {
      var t = this._focusedElement;t || (t = this.element.find("[autofocus]")), t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).trigger("focus");
    }, _keepFocus: function _keepFocus(e) {
      function i() {
        var e = t.ui.safeActiveElement(this.document[0]),
            i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e);i || this._focusTabbable();
      }e.preventDefault(), i.call(this), this._delay(i);
    }, _createWrapper: function _createWrapper() {
      this.uiDialog = t("<div>").hide().attr({ tabIndex: -1, role: "dialog" }).appendTo(this._appendTo()), this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front"), this._on(this.uiDialog, { keydown: function keydown(e) {
          if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(), this.close(e), void 0;if (e.keyCode === t.ui.keyCode.TAB && !e.isDefaultPrevented()) {
            var i = this.uiDialog.find(":tabbable"),
                s = i.filter(":first"),
                n = i.filter(":last");e.target !== n[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== s[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (this._delay(function () {
              n.trigger("focus");
            }), e.preventDefault()) : (this._delay(function () {
              s.trigger("focus");
            }), e.preventDefault());
          }
        }, mousedown: function mousedown(t) {
          this._moveToTop(t) && this._focusTabbable();
        } }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({ "aria-describedby": this.element.uniqueId().attr("id") });
    }, _createTitlebar: function _createTitlebar() {
      var e;this.uiDialogTitlebar = t("<div>"), this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"), this._on(this.uiDialogTitlebar, { mousedown: function mousedown(e) {
          t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus");
        } }), this.uiDialogTitlebarClose = t("<button type='button'></button>").button({ label: t("<a>").text(this.options.closeText).html(), icon: "ui-icon-closethick", showLabel: !1 }).appendTo(this.uiDialogTitlebar), this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"), this._on(this.uiDialogTitlebarClose, { click: function click(t) {
          t.preventDefault(), this.close(t);
        } }), e = t("<span>").uniqueId().prependTo(this.uiDialogTitlebar), this._addClass(e, "ui-dialog-title"), this._title(e), this.uiDialogTitlebar.prependTo(this.uiDialog), this.uiDialog.attr({ "aria-labelledby": e.attr("id") });
    }, _title: function _title(t) {
      this.options.title ? t.text(this.options.title) : t.html("&#160;");
    }, _createButtonPane: function _createButtonPane() {
      this.uiDialogButtonPane = t("<div>"), this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").appendTo(this.uiDialogButtonPane), this._addClass(this.uiButtonSet, "ui-dialog-buttonset"), this._createButtons();
    }, _createButtons: function _createButtons() {
      var e = this,
          i = this.options.buttons;return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length ? (this._removeClass(this.uiDialog, "ui-dialog-buttons"), void 0) : (t.each(i, function (i, s) {
        var n, o;s = t.isFunction(s) ? { click: s, text: i } : s, s = t.extend({ type: "button" }, s), n = s.click, o = { icon: s.icon, iconPosition: s.iconPosition, showLabel: s.showLabel, icons: s.icons, text: s.text }, delete s.click, delete s.icon, delete s.iconPosition, delete s.showLabel, delete s.icons, "boolean" == typeof s.text && delete s.text, t("<button></button>", s).button(o).appendTo(e.uiButtonSet).on("click", function () {
          n.apply(e.element[0], arguments);
        });
      }), this._addClass(this.uiDialog, "ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), void 0);
    }, _makeDraggable: function _makeDraggable() {
      function e(t) {
        return { position: t.position, offset: t.offset };
      }var i = this,
          s = this.options;this.uiDialog.draggable({ cancel: ".ui-dialog-content, .ui-dialog-titlebar-close", handle: ".ui-dialog-titlebar", containment: "document", start: function start(s, n) {
          i._addClass(t(this), "ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", s, e(n));
        }, drag: function drag(t, s) {
          i._trigger("drag", t, e(s));
        }, stop: function stop(n, o) {
          var a = o.offset.left - i.document.scrollLeft(),
              r = o.offset.top - i.document.scrollTop();s.position = { my: "left top", at: "left" + (a >= 0 ? "+" : "") + a + " " + "top" + (r >= 0 ? "+" : "") + r, of: i.window }, i._removeClass(t(this), "ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", n, e(o));
        } });
    }, _makeResizable: function _makeResizable() {
      function e(t) {
        return { originalPosition: t.originalPosition, originalSize: t.originalSize, position: t.position, size: t.size };
      }var i = this,
          s = this.options,
          n = s.resizable,
          o = this.uiDialog.css("position"),
          a = "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({ cancel: ".ui-dialog-content", containment: "document", alsoResize: this.element, maxWidth: s.maxWidth, maxHeight: s.maxHeight, minWidth: s.minWidth, minHeight: this._minHeight(), handles: a, start: function start(s, n) {
          i._addClass(t(this), "ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", s, e(n));
        }, resize: function resize(t, s) {
          i._trigger("resize", t, e(s));
        }, stop: function stop(n, o) {
          var a = i.uiDialog.offset(),
              r = a.left - i.document.scrollLeft(),
              h = a.top - i.document.scrollTop();s.height = i.uiDialog.height(), s.width = i.uiDialog.width(), s.position = { my: "left top", at: "left" + (r >= 0 ? "+" : "") + r + " " + "top" + (h >= 0 ? "+" : "") + h, of: i.window }, i._removeClass(t(this), "ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", n, e(o));
        } }).css("position", o);
    }, _trackFocus: function _trackFocus() {
      this._on(this.widget(), { focusin: function focusin(e) {
          this._makeFocusTarget(), this._focusedElement = t(e.target);
        } });
    }, _makeFocusTarget: function _makeFocusTarget() {
      this._untrackInstance(), this._trackingInstances().unshift(this);
    }, _untrackInstance: function _untrackInstance() {
      var e = this._trackingInstances(),
          i = t.inArray(this, e);-1 !== i && e.splice(i, 1);
    }, _trackingInstances: function _trackingInstances() {
      var t = this.document.data("ui-dialog-instances");return t || (t = [], this.document.data("ui-dialog-instances", t)), t;
    }, _minHeight: function _minHeight() {
      var t = this.options;return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height);
    }, _position: function _position() {
      var t = this.uiDialog.is(":visible");t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide();
    }, _setOptions: function _setOptions(e) {
      var i = this,
          s = !1,
          n = {};t.each(e, function (t, e) {
        i._setOption(t, e), t in i.sizeRelatedOptions && (s = !0), t in i.resizableRelatedOptions && (n[t] = e);
      }), s && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", n);
    }, _setOption: function _setOption(e, i) {
      var s,
          n,
          o = this.uiDialog;"disabled" !== e && (this._super(e, i), "appendTo" === e && this.uiDialog.appendTo(this._appendTo()), "buttons" === e && this._createButtons(), "closeText" === e && this.uiDialogTitlebarClose.button({ label: t("<a>").text("" + this.options.closeText).html() }), "draggable" === e && (s = o.is(":data(ui-draggable)"), s && !i && o.draggable("destroy"), !s && i && this._makeDraggable()), "position" === e && this._position(), "resizable" === e && (n = o.is(":data(ui-resizable)"), n && !i && o.resizable("destroy"), n && "string" == typeof i && o.resizable("option", "handles", i), n || i === !1 || this._makeResizable()), "title" === e && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
    }, _size: function _size() {
      var t,
          e,
          i,
          s = this.options;this.element.show().css({ width: "auto", minHeight: 0, maxHeight: "none", height: 0 }), s.minWidth > s.width && (s.width = s.minWidth), t = this.uiDialog.css({ height: "auto", width: s.width }).outerHeight(), e = Math.max(0, s.minHeight - t), i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - t) : "none", "auto" === s.height ? this.element.css({ minHeight: e, maxHeight: i, height: "auto" }) : this.element.height(Math.max(0, s.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight());
    }, _blockFrames: function _blockFrames() {
      this.iframeBlocks = this.document.find("iframe").map(function () {
        var e = t(this);return t("<div>").css({ position: "absolute", width: e.outerWidth(), height: e.outerHeight() }).appendTo(e.parent()).offset(e.offset())[0];
      });
    }, _unblockFrames: function _unblockFrames() {
      this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
    }, _allowInteraction: function _allowInteraction(e) {
      return t(e.target).closest(".ui-dialog").length ? !0 : !!t(e.target).closest(".ui-datepicker").length;
    }, _createOverlay: function _createOverlay() {
      if (this.options.modal) {
        var e = !0;this._delay(function () {
          e = !1;
        }), this.document.data("ui-dialog-overlays") || this._on(this.document, { focusin: function focusin(t) {
            e || this._allowInteraction(t) || (t.preventDefault(), this._trackingInstances()[0]._focusTabbable());
          } }), this.overlay = t("<div>").appendTo(this._appendTo()), this._addClass(this.overlay, null, "ui-widget-overlay ui-front"), this._on(this.overlay, { mousedown: "_keepFocus" }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1);
      }
    }, _destroyOverlay: function _destroyOverlay() {
      if (this.options.modal && this.overlay) {
        var t = this.document.data("ui-dialog-overlays") - 1;t ? this.document.data("ui-dialog-overlays", t) : (this._off(this.document, "focusin"), this.document.removeData("ui-dialog-overlays")), this.overlay.remove(), this.overlay = null;
      }
    } }), t.uiBackCompat !== !1 && t.widget("ui.dialog", t.ui.dialog, { options: { dialogClass: "" }, _createWrapper: function _createWrapper() {
      this._super(), this.uiDialog.addClass(this.options.dialogClass);
    }, _setOption: function _setOption(t, e) {
      "dialogClass" === t && this.uiDialog.removeClass(this.options.dialogClass).addClass(e), this._superApply(arguments);
    } }), t.ui.dialog, t.widget("ui.droppable", { version: "1.12.1", widgetEventPrefix: "drop", options: { accept: "*", addClasses: !0, greedy: !1, scope: "default", tolerance: "intersect", activate: null, deactivate: null, drop: null, out: null, over: null }, _create: function _create() {
      var e,
          i = this.options,
          s = i.accept;this.isover = !1, this.isout = !0, this.accept = t.isFunction(s) ? s : function (t) {
        return t.is(s);
      }, this.proportions = function () {
        return arguments.length ? (e = arguments[0], void 0) : e ? e : e = { width: this.element[0].offsetWidth, height: this.element[0].offsetHeight };
      }, this._addToManager(i.scope), i.addClasses && this._addClass("ui-droppable");
    }, _addToManager: function _addToManager(e) {
      t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [], t.ui.ddmanager.droppables[e].push(this);
    }, _splice: function _splice(t) {
      for (var e = 0; t.length > e; e++) {
        t[e] === this && t.splice(e, 1);
      }
    }, _destroy: function _destroy() {
      var e = t.ui.ddmanager.droppables[this.options.scope];this._splice(e);
    }, _setOption: function _setOption(e, i) {
      if ("accept" === e) this.accept = t.isFunction(i) ? i : function (t) {
        return t.is(i);
      };else if ("scope" === e) {
        var s = t.ui.ddmanager.droppables[this.options.scope];this._splice(s), this._addToManager(i);
      }this._super(e, i);
    }, _activate: function _activate(e) {
      var i = t.ui.ddmanager.current;this._addActiveClass(), i && this._trigger("activate", e, this.ui(i));
    }, _deactivate: function _deactivate(e) {
      var i = t.ui.ddmanager.current;this._removeActiveClass(), i && this._trigger("deactivate", e, this.ui(i));
    }, _over: function _over(e) {
      var i = t.ui.ddmanager.current;i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(), this._trigger("over", e, this.ui(i)));
    }, _out: function _out(e) {
      var i = t.ui.ddmanager.current;i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(), this._trigger("out", e, this.ui(i)));
    }, _drop: function _drop(e, i) {
      var s = i || t.ui.ddmanager.current,
          n = !1;return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
        var i = t(this).droppable("instance");return i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && v(s, t.extend(i, { offset: i.element.offset() }), i.options.tolerance, e) ? (n = !0, !1) : void 0;
      }), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", e, this.ui(s)), this.element) : !1) : !1;
    }, ui: function ui(t) {
      return { draggable: t.currentItem || t.element, helper: t.helper, position: t.position, offset: t.positionAbs };
    }, _addHoverClass: function _addHoverClass() {
      this._addClass("ui-droppable-hover");
    }, _removeHoverClass: function _removeHoverClass() {
      this._removeClass("ui-droppable-hover");
    }, _addActiveClass: function _addActiveClass() {
      this._addClass("ui-droppable-active");
    }, _removeActiveClass: function _removeActiveClass() {
      this._removeClass("ui-droppable-active");
    } });var v = t.ui.intersect = function () {
    function t(t, e, i) {
      return t >= e && e + i > t;
    }return function (e, i, s, n) {
      if (!i.offset) return !1;var o = (e.positionAbs || e.position.absolute).left + e.margins.left,
          a = (e.positionAbs || e.position.absolute).top + e.margins.top,
          r = o + e.helperProportions.width,
          h = a + e.helperProportions.height,
          l = i.offset.left,
          c = i.offset.top,
          u = l + i.proportions().width,
          d = c + i.proportions().height;switch (s) {case "fit":
          return o >= l && u >= r && a >= c && d >= h;case "intersect":
          return o + e.helperProportions.width / 2 > l && u > r - e.helperProportions.width / 2 && a + e.helperProportions.height / 2 > c && d > h - e.helperProportions.height / 2;case "pointer":
          return t(n.pageY, c, i.proportions().height) && t(n.pageX, l, i.proportions().width);case "touch":
          return (a >= c && d >= a || h >= c && d >= h || c > a && h > d) && (o >= l && u >= o || r >= l && u >= r || l > o && r > u);default:
          return !1;}
    };
  }();t.ui.ddmanager = { current: null, droppables: { "default": [] }, prepareOffsets: function prepareOffsets(e, i) {
      var s,
          n,
          o = t.ui.ddmanager.droppables[e.options.scope] || [],
          a = i ? i.type : null,
          r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();t: for (s = 0; o.length > s; s++) {
        if (!(o[s].options.disabled || e && !o[s].accept.call(o[s].element[0], e.currentItem || e.element))) {
          for (n = 0; r.length > n; n++) {
            if (r[n] === o[s].element[0]) {
              o[s].proportions().height = 0;continue t;
            }
          }o[s].visible = "none" !== o[s].element.css("display"), o[s].visible && ("mousedown" === a && o[s]._activate.call(o[s], i), o[s].offset = o[s].element.offset(), o[s].proportions({ width: o[s].element[0].offsetWidth, height: o[s].element[0].offsetHeight }));
        }
      }
    }, drop: function drop(e, i) {
      var s = !1;return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function () {
        this.options && (!this.options.disabled && this.visible && v(e, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)));
      }), s;
    }, dragStart: function dragStart(e, i) {
      e.element.parentsUntil("body").on("scroll.droppable", function () {
        e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
      });
    }, drag: function drag(e, i) {
      e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function () {
        if (!this.options.disabled && !this.greedyChild && this.visible) {
          var s,
              n,
              o,
              a = v(e, this, this.options.tolerance, i),
              r = !a && this.isover ? "isout" : a && !this.isover ? "isover" : null;r && (this.options.greedy && (n = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function () {
            return t(this).droppable("instance").options.scope === n;
          }), o.length && (s = t(o[0]).droppable("instance"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)));
        }
      });
    }, dragStop: function dragStop(e, i) {
      e.element.parentsUntil("body").off("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
    } }, t.uiBackCompat !== !1 && t.widget("ui.droppable", t.ui.droppable, { options: { hoverClass: !1, activeClass: !1 }, _addActiveClass: function _addActiveClass() {
      this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass);
    }, _removeActiveClass: function _removeActiveClass() {
      this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass);
    }, _addHoverClass: function _addHoverClass() {
      this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass);
    }, _removeHoverClass: function _removeHoverClass() {
      this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
    } }), t.ui.droppable, t.widget("ui.progressbar", { version: "1.12.1", options: { classes: { "ui-progressbar": "ui-corner-all", "ui-progressbar-value": "ui-corner-left", "ui-progressbar-complete": "ui-corner-right" }, max: 100, value: 0, change: null, complete: null }, min: 0, _create: function _create() {
      this.oldValue = this.options.value = this._constrainedValue(), this.element.attr({ role: "progressbar", "aria-valuemin": this.min }), this._addClass("ui-progressbar", "ui-widget ui-widget-content"), this.valueDiv = t("<div>").appendTo(this.element), this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header"), this._refreshValue();
    }, _destroy: function _destroy() {
      this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"), this.valueDiv.remove();
    }, value: function value(t) {
      return void 0 === t ? this.options.value : (this.options.value = this._constrainedValue(t), this._refreshValue(), void 0);
    }, _constrainedValue: function _constrainedValue(t) {
      return void 0 === t && (t = this.options.value), this.indeterminate = t === !1, "number" != typeof t && (t = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, t));
    }, _setOptions: function _setOptions(t) {
      var e = t.value;delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue();
    }, _setOption: function _setOption(t, e) {
      "max" === t && (e = Math.max(this.min, e)), this._super(t, e);
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this._super(t), this.element.attr("aria-disabled", t), this._toggleClass(null, "ui-state-disabled", !!t);
    }, _percentage: function _percentage() {
      return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min);
    }, _refreshValue: function _refreshValue() {
      var e = this.options.value,
          i = this._percentage();this.valueDiv.toggle(this.indeterminate || e > this.min).width(i.toFixed(0) + "%"), this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, e === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div>").appendTo(this.valueDiv), this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) : (this.element.attr({ "aria-valuemax": this.options.max, "aria-valuenow": e }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete");
    } }), t.widget("ui.selectable", t.ui.mouse, { version: "1.12.1", options: { appendTo: "body", autoRefresh: !0, distance: 0, filter: "*", tolerance: "touch", selected: null, selecting: null, start: null, stop: null, unselected: null, unselecting: null }, _create: function _create() {
      var e = this;this._addClass("ui-selectable"), this.dragged = !1, this.refresh = function () {
        e.elementPos = t(e.element[0]).offset(), e.selectees = t(e.options.filter, e.element[0]), e._addClass(e.selectees, "ui-selectee"), e.selectees.each(function () {
          var i = t(this),
              s = i.offset(),
              n = { left: s.left - e.elementPos.left, top: s.top - e.elementPos.top };t.data(this, "selectable-item", { element: this, $element: i, left: n.left, top: n.top, right: n.left + i.outerWidth(), bottom: n.top + i.outerHeight(), startselected: !1, selected: i.hasClass("ui-selected"), selecting: i.hasClass("ui-selecting"), unselecting: i.hasClass("ui-unselecting") });
        });
      }, this.refresh(), this._mouseInit(), this.helper = t("<div>"), this._addClass(this.helper, "ui-selectable-helper");
    }, _destroy: function _destroy() {
      this.selectees.removeData("selectable-item"), this._mouseDestroy();
    }, _mouseStart: function _mouseStart(e) {
      var i = this,
          s = this.options;this.opos = [e.pageX, e.pageY], this.elementPos = t(this.element[0]).offset(), this.options.disabled || (this.selectees = t(s.filter, this.element[0]), this._trigger("start", e), t(s.appendTo).append(this.helper), this.helper.css({ left: e.pageX, top: e.pageY, width: 0, height: 0 }), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
        var s = t.data(this, "selectable-item");s.startselected = !0, e.metaKey || e.ctrlKey || (i._removeClass(s.$element, "ui-selected"), s.selected = !1, i._addClass(s.$element, "ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", e, { unselecting: s.element }));
      }), t(e.target).parents().addBack().each(function () {
        var s,
            n = t.data(this, "selectable-item");return n ? (s = !e.metaKey && !e.ctrlKey || !n.$element.hasClass("ui-selected"), i._removeClass(n.$element, s ? "ui-unselecting" : "ui-selected")._addClass(n.$element, s ? "ui-selecting" : "ui-unselecting"), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger("selecting", e, { selecting: n.element }) : i._trigger("unselecting", e, { unselecting: n.element }), !1) : void 0;
      }));
    }, _mouseDrag: function _mouseDrag(e) {
      if (this.dragged = !0, !this.options.disabled) {
        var i,
            s = this,
            n = this.options,
            o = this.opos[0],
            a = this.opos[1],
            r = e.pageX,
            h = e.pageY;return o > r && (i = r, r = o, o = i), a > h && (i = h, h = a, a = i), this.helper.css({ left: o, top: a, width: r - o, height: h - a }), this.selectees.each(function () {
          var i = t.data(this, "selectable-item"),
              l = !1,
              c = {};i && i.element !== s.element[0] && (c.left = i.left + s.elementPos.left, c.right = i.right + s.elementPos.left, c.top = i.top + s.elementPos.top, c.bottom = i.bottom + s.elementPos.top, "touch" === n.tolerance ? l = !(c.left > r || o > c.right || c.top > h || a > c.bottom) : "fit" === n.tolerance && (l = c.left > o && r > c.right && c.top > a && h > c.bottom), l ? (i.selected && (s._removeClass(i.$element, "ui-selected"), i.selected = !1), i.unselecting && (s._removeClass(i.$element, "ui-unselecting"), i.unselecting = !1), i.selecting || (s._addClass(i.$element, "ui-selecting"), i.selecting = !0, s._trigger("selecting", e, { selecting: i.element }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (s._removeClass(i.$element, "ui-selecting"), i.selecting = !1, s._addClass(i.$element, "ui-selected"), i.selected = !0) : (s._removeClass(i.$element, "ui-selecting"), i.selecting = !1, i.startselected && (s._addClass(i.$element, "ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", e, { unselecting: i.element }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (s._removeClass(i.$element, "ui-selected"), i.selected = !1, s._addClass(i.$element, "ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", e, { unselecting: i.element })))));
        }), !1;
      }
    }, _mouseStop: function _mouseStop(e) {
      var i = this;return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function () {
        var s = t.data(this, "selectable-item");i._removeClass(s.$element, "ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", e, { unselected: s.element });
      }), t(".ui-selecting", this.element[0]).each(function () {
        var s = t.data(this, "selectable-item");i._removeClass(s.$element, "ui-selecting")._addClass(s.$element, "ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", e, { selected: s.element });
      }), this._trigger("stop", e), this.helper.remove(), !1;
    } }), t.widget("ui.selectmenu", [t.ui.formResetMixin, { version: "1.12.1", defaultElement: "<select>", options: { appendTo: null, classes: { "ui-selectmenu-button-open": "ui-corner-top", "ui-selectmenu-button-closed": "ui-corner-all" }, disabled: null, icons: { button: "ui-icon-triangle-1-s" }, position: { my: "left top", at: "left bottom", collision: "none" }, width: !1, change: null, close: null, focus: null, open: null, select: null }, _create: function _create() {
      var e = this.element.uniqueId().attr("id");this.ids = { element: e, button: e + "-button", menu: e + "-menu" }, this._drawButton(), this._drawMenu(), this._bindFormResetHandler(), this._rendered = !1, this.menuItems = t();
    }, _drawButton: function _drawButton() {
      var e,
          i = this,
          s = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);this.labels = this.element.labels().attr("for", this.ids.button), this._on(this.labels, { click: function click(t) {
          this.button.focus(), t.preventDefault();
        } }), this.element.hide(), this.button = t("<span>", { tabindex: this.options.disabled ? -1 : 0, id: this.ids.button, role: "combobox", "aria-expanded": "false", "aria-autocomplete": "list", "aria-owns": this.ids.menu, "aria-haspopup": "true", title: this.element.attr("title") }).insertAfter(this.element), this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget"), e = t("<span>").appendTo(this.button), this._addClass(e, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button), this.buttonItem = this._renderButtonItem(s).appendTo(this.button), this.options.width !== !1 && this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function () {
        i._rendered || i._refreshMenu();
      });
    }, _drawMenu: function _drawMenu() {
      var e = this;this.menu = t("<ul>", { "aria-hidden": "true", "aria-labelledby": this.ids.button, id: this.ids.menu }), this.menuWrap = t("<div>").append(this.menu), this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"), this.menuWrap.appendTo(this._appendTo()), this.menuInstance = this.menu.menu({ classes: { "ui-menu": "ui-corner-bottom" }, role: "listbox", select: function select(t, i) {
          t.preventDefault(), e._setSelection(), e._select(i.item.data("ui-selectmenu-item"), t);
        }, focus: function focus(t, i) {
          var s = i.item.data("ui-selectmenu-item");null != e.focusIndex && s.index !== e.focusIndex && (e._trigger("focus", t, { item: s }), e.isOpen || e._select(s, t)), e.focusIndex = s.index, e.button.attr("aria-activedescendant", e.menuItems.eq(s.index).attr("id"));
        } }).menu("instance"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function () {
        return !1;
      }, this.menuInstance._isDivider = function () {
        return !1;
      };
    }, refresh: function refresh() {
      this._refreshMenu(), this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {})), null === this.options.width && this._resizeButton();
    }, _refreshMenu: function _refreshMenu() {
      var t,
          e = this.element.find("option");this.menu.empty(), this._parseOptions(e), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"), this._rendered = !0, e.length && (t = this._getSelectedItem(), this.menuInstance.focus(null, t), this._setAria(t.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")));
    }, open: function open(t) {
      this.options.disabled || (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.menuItems.length && (this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", t)));
    }, _position: function _position() {
      this.menuWrap.position(t.extend({ of: this.button }, this.options.position));
    }, close: function close(t) {
      this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", t));
    }, widget: function widget() {
      return this.button;
    }, menuWidget: function menuWidget() {
      return this.menu;
    }, _renderButtonItem: function _renderButtonItem(e) {
      var i = t("<span>");return this._setText(i, e.label), this._addClass(i, "ui-selectmenu-text"), i;
    }, _renderMenu: function _renderMenu(e, i) {
      var s = this,
          n = "";t.each(i, function (i, o) {
        var a;o.optgroup !== n && (a = t("<li>", { text: o.optgroup }), s._addClass(a, "ui-selectmenu-optgroup", "ui-menu-divider" + (o.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")), a.appendTo(e), n = o.optgroup), s._renderItemData(e, o);
      });
    }, _renderItemData: function _renderItemData(t, e) {
      return this._renderItem(t, e).data("ui-selectmenu-item", e);
    }, _renderItem: function _renderItem(e, i) {
      var s = t("<li>"),
          n = t("<div>", { title: i.element.attr("title") });return i.disabled && this._addClass(s, null, "ui-state-disabled"), this._setText(n, i.label), s.append(n).appendTo(e);
    }, _setText: function _setText(t, e) {
      e ? t.text(e) : t.html("&#160;");
    }, _move: function _move(t, e) {
      var i,
          s,
          n = ".ui-menu-item";this.isOpen ? i = this.menuItems.eq(this.focusIndex).parent("li") : (i = this.menuItems.eq(this.element[0].selectedIndex).parent("li"), n += ":not(.ui-state-disabled)"), s = "first" === t || "last" === t ? i["first" === t ? "prevAll" : "nextAll"](n).eq(-1) : i[t + "All"](n).eq(0), s.length && this.menuInstance.focus(e, s);
    }, _getSelectedItem: function _getSelectedItem() {
      return this.menuItems.eq(this.element[0].selectedIndex).parent("li");
    }, _toggle: function _toggle(t) {
      this[this.isOpen ? "close" : "open"](t);
    }, _setSelection: function _setSelection() {
      var t;this.range && (window.getSelection ? (t = window.getSelection(), t.removeAllRanges(), t.addRange(this.range)) : this.range.select(), this.button.focus());
    }, _documentClick: { mousedown: function mousedown(e) {
        this.isOpen && (t(e.target).closest(".ui-selectmenu-menu, #" + t.ui.escapeSelector(this.ids.button)).length || this.close(e));
      } }, _buttonEvents: { mousedown: function mousedown() {
        var t;window.getSelection ? (t = window.getSelection(), t.rangeCount && (this.range = t.getRangeAt(0))) : this.range = document.selection.createRange();
      }, click: function click(t) {
        this._setSelection(), this._toggle(t);
      }, keydown: function keydown(e) {
        var i = !0;switch (e.keyCode) {case t.ui.keyCode.TAB:case t.ui.keyCode.ESCAPE:
            this.close(e), i = !1;break;case t.ui.keyCode.ENTER:
            this.isOpen && this._selectFocusedItem(e);break;case t.ui.keyCode.UP:
            e.altKey ? this._toggle(e) : this._move("prev", e);break;case t.ui.keyCode.DOWN:
            e.altKey ? this._toggle(e) : this._move("next", e);break;case t.ui.keyCode.SPACE:
            this.isOpen ? this._selectFocusedItem(e) : this._toggle(e);break;case t.ui.keyCode.LEFT:
            this._move("prev", e);break;case t.ui.keyCode.RIGHT:
            this._move("next", e);break;case t.ui.keyCode.HOME:case t.ui.keyCode.PAGE_UP:
            this._move("first", e);break;case t.ui.keyCode.END:case t.ui.keyCode.PAGE_DOWN:
            this._move("last", e);break;default:
            this.menu.trigger(e), i = !1;}i && e.preventDefault();
      } }, _selectFocusedItem: function _selectFocusedItem(t) {
      var e = this.menuItems.eq(this.focusIndex).parent("li");e.hasClass("ui-state-disabled") || this._select(e.data("ui-selectmenu-item"), t);
    }, _select: function _select(t, e) {
      var i = this.element[0].selectedIndex;this.element[0].selectedIndex = t.index, this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(t)), this._setAria(t), this._trigger("select", e, { item: t }), t.index !== i && this._trigger("change", e, { item: t }), this.close(e);
    }, _setAria: function _setAria(t) {
      var e = this.menuItems.eq(t.index).attr("id");this.button.attr({ "aria-labelledby": e, "aria-activedescendant": e }), this.menu.attr("aria-activedescendant", e);
    }, _setOption: function _setOption(t, e) {
      if ("icons" === t) {
        var i = this.button.find("span.ui-icon");this._removeClass(i, null, this.options.icons.button)._addClass(i, null, e.button);
      }this._super(t, e), "appendTo" === t && this.menuWrap.appendTo(this._appendTo()), "width" === t && this._resizeButton();
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this._super(t), this.menuInstance.option("disabled", t), this.button.attr("aria-disabled", t), this._toggleClass(this.button, null, "ui-state-disabled", t), this.element.prop("disabled", t), t ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0);
    }, _appendTo: function _appendTo() {
      var e = this.options.appendTo;return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front, dialog")), e.length || (e = this.document[0].body), e;
    }, _toggleAttr: function _toggleAttr() {
      this.button.attr("aria-expanded", this.isOpen), this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen), this.menu.attr("aria-hidden", !this.isOpen);
    }, _resizeButton: function _resizeButton() {
      var t = this.options.width;return t === !1 ? (this.button.css("width", ""), void 0) : (null === t && (t = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(t), void 0);
    }, _resizeMenu: function _resizeMenu() {
      this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1));
    }, _getCreateOptions: function _getCreateOptions() {
      var t = this._super();return t.disabled = this.element.prop("disabled"), t;
    }, _parseOptions: function _parseOptions(e) {
      var i = this,
          s = [];e.each(function (e, n) {
        s.push(i._parseOption(t(n), e));
      }), this.items = s;
    }, _parseOption: function _parseOption(t, e) {
      var i = t.parent("optgroup");return { element: t, index: e, value: t.val(), label: t.text(), optgroup: i.attr("label") || "", disabled: i.prop("disabled") || t.prop("disabled") };
    }, _destroy: function _destroy() {
      this._unbindFormResetHandler(), this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.labels.attr("for", this.ids.element);
    } }]), t.widget("ui.slider", t.ui.mouse, { version: "1.12.1", widgetEventPrefix: "slide", options: { animate: !1, classes: { "ui-slider": "ui-corner-all", "ui-slider-handle": "ui-corner-all", "ui-slider-range": "ui-corner-all ui-widget-header" }, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null }, numPages: 5, _create: function _create() {
      this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), this._refresh(), this._animateOff = !1;
    }, _refresh: function _refresh() {
      this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue();
    }, _createHandles: function _createHandles() {
      var e,
          i,
          s = this.options,
          n = this.element.find(".ui-slider-handle"),
          o = "<span tabindex='0'></span>",
          a = [];for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e = n.length; i > e; e++) {
        a.push(o);
      }this.handles = n.add(t(a.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), this.handle = this.handles.eq(0), this.handles.each(function (e) {
        t(this).data("ui-slider-handle-index", e).attr("tabIndex", 0);
      });
    }, _createRange: function _createRange() {
      var e = this.options;e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({ left: "", bottom: "" })) : (this.range = t("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), ("min" === e.range || "max" === e.range) && this._addClass(this.range, "ui-slider-range-" + e.range)) : (this.range && this.range.remove(), this.range = null);
    }, _setupEvents: function _setupEvents() {
      this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles);
    }, _destroy: function _destroy() {
      this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy();
    }, _mouseCapture: function _mouseCapture(e) {
      var i,
          s,
          n,
          o,
          a,
          r,
          h,
          l,
          c = this,
          u = this.options;return u.disabled ? !1 : (this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }, this.elementOffset = this.element.offset(), i = { x: e.pageX, y: e.pageY }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function (e) {
        var i = Math.abs(s - c.values(e));(n > i || n === i && (e === c._lastChangedValue || c.values(e) === u.min)) && (n = i, o = t(this), a = e);
      }), r = this._start(e, a), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = a, this._addClass(o, null, "ui-state-active"), o.trigger("focus"), h = o.offset(), l = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? { left: 0, top: 0 } : { left: e.pageX - h.left - o.width() / 2, top: e.pageY - h.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0) }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, s), this._animateOff = !0, !0));
    }, _mouseStart: function _mouseStart() {
      return !0;
    }, _mouseDrag: function _mouseDrag(t) {
      var e = { x: t.pageX, y: t.pageY },
          i = this._normValueFromMouse(e);return this._slide(t, this._handleIndex, i), !1;
    }, _mouseStop: function _mouseStop(t) {
      return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1;
    }, _detectOrientation: function _detectOrientation() {
      this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
    }, _normValueFromMouse: function _normValueFromMouse(t) {
      var e, i, s, n, o;return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / e, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), o = this._valueMin() + s * n, this._trimAlignValue(o);
    }, _uiHash: function _uiHash(t, e, i) {
      var s = { handle: this.handles[t], handleIndex: t, value: void 0 !== e ? e : this.value() };return this._hasMultipleValues() && (s.value = void 0 !== e ? e : this.values(t), s.values = i || this.values()), s;
    }, _hasMultipleValues: function _hasMultipleValues() {
      return this.options.values && this.options.values.length;
    }, _start: function _start(t, e) {
      return this._trigger("start", t, this._uiHash(e));
    }, _slide: function _slide(t, e, i) {
      var s,
          n,
          o = this.value(),
          a = this.values();this._hasMultipleValues() && (n = this.values(e ? 0 : 1), o = this.values(e), 2 === this.options.values.length && this.options.range === !0 && (i = 0 === e ? Math.min(n, i) : Math.max(n, i)), a[e] = i), i !== o && (s = this._trigger("slide", t, this._uiHash(e, i, a)), s !== !1 && (this._hasMultipleValues() ? this.values(e, i) : this.value(i)));
    }, _stop: function _stop(t, e) {
      this._trigger("stop", t, this._uiHash(e));
    }, _change: function _change(t, e) {
      this._keySliding || this._mouseSliding || (this._lastChangedValue = e, this._trigger("change", t, this._uiHash(e)));
    }, value: function value(t) {
      return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0), void 0) : this._value();
    }, values: function values(e, i) {
      var s, n, o;if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), this._change(null, e), void 0;if (!arguments.length) return this._values();if (!t.isArray(arguments[0])) return this._hasMultipleValues() ? this._values(e) : this.value();for (s = this.options.values, n = arguments[0], o = 0; s.length > o; o += 1) {
        s[o] = this._trimAlignValue(n[o]), this._change(null, o);
      }this._refreshValue();
    }, _setOption: function _setOption(e, i) {
      var s,
          n = 0;switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), this._super(e, i), e) {case "orientation":
          this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), this._refreshValue(), this.options.range && this._refreshRange(i), this.handles.css("horizontal" === i ? "bottom" : "left", "");break;case "value":
          this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;break;case "values":
          for (this._animateOff = !0, this._refreshValue(), s = n - 1; s >= 0; s--) {
            this._change(null, s);
          }this._animateOff = !1;break;case "step":case "min":case "max":
          this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;break;case "range":
          this._animateOff = !0, this._refresh(), this._animateOff = !1;}
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this._super(t), this._toggleClass(null, "ui-state-disabled", !!t);
    }, _value: function _value() {
      var t = this.options.value;return t = this._trimAlignValue(t);
    }, _values: function _values(t) {
      var e, i, s;if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);if (this._hasMultipleValues()) {
        for (i = this.options.values.slice(), s = 0; i.length > s; s += 1) {
          i[s] = this._trimAlignValue(i[s]);
        }return i;
      }return [];
    }, _trimAlignValue: function _trimAlignValue(t) {
      if (this._valueMin() >= t) return this._valueMin();if (t >= this._valueMax()) return this._valueMax();var e = this.options.step > 0 ? this.options.step : 1,
          i = (t - this._valueMin()) % e,
          s = t - i;return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5));
    }, _calculateNewMax: function _calculateNewMax() {
      var t = this.options.max,
          e = this._valueMin(),
          i = this.options.step,
          s = Math.round((t - e) / i) * i;t = s + e, t > this.options.max && (t -= i), this.max = parseFloat(t.toFixed(this._precision()));
    }, _precision: function _precision() {
      var t = this._precisionOf(this.options.step);return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t;
    }, _precisionOf: function _precisionOf(t) {
      var e = "" + t,
          i = e.indexOf(".");return -1 === i ? 0 : e.length - i - 1;
    }, _valueMin: function _valueMin() {
      return this.options.min;
    }, _valueMax: function _valueMax() {
      return this.max;
    }, _refreshRange: function _refreshRange(t) {
      "vertical" === t && this.range.css({ width: "", left: "" }), "horizontal" === t && this.range.css({ height: "", bottom: "" });
    }, _refreshValue: function _refreshValue() {
      var e,
          i,
          s,
          n,
          o,
          a = this.options.range,
          r = this.options,
          h = this,
          l = this._animateOff ? !1 : r.animate,
          c = {};this._hasMultipleValues() ? this.handles.each(function (s) {
        i = 100 * ((h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin())), c["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[l ? "animate" : "css"](c, r.animate), h.options.range === !0 && ("horizontal" === h.orientation ? (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({ left: i + "%" }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({ width: i - e + "%" }, { queue: !1, duration: r.animate })) : (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({ bottom: i + "%" }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({ height: i - e + "%" }, { queue: !1, duration: r.animate }))), e = i;
      }) : (s = this.value(), n = this._valueMin(), o = this._valueMax(), i = o !== n ? 100 * ((s - n) / (o - n)) : 0, c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](c, r.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ width: i + "%" }, r.animate), "max" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ width: 100 - i + "%" }, r.animate), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ height: i + "%" }, r.animate), "max" === a && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ height: 100 - i + "%" }, r.animate));
    }, _handleEvents: { keydown: function keydown(e) {
        var i,
            s,
            n,
            o,
            a = t(e.target).data("ui-slider-handle-index");switch (e.keyCode) {case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:
            if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(t(e.target), null, "ui-state-active"), i = this._start(e, a), i === !1)) return;}switch (o = this.options.step, s = n = this._hasMultipleValues() ? this.values(a) : this.value(), e.keyCode) {case t.ui.keyCode.HOME:
            n = this._valueMin();break;case t.ui.keyCode.END:
            n = this._valueMax();break;case t.ui.keyCode.PAGE_UP:
            n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages);break;case t.ui.keyCode.PAGE_DOWN:
            n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:
            if (s === this._valueMax()) return;n = this._trimAlignValue(s + o);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:
            if (s === this._valueMin()) return;n = this._trimAlignValue(s - o);}this._slide(e, a, n);
      }, keyup: function keyup(e) {
        var i = t(e.target).data("ui-slider-handle-index");this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), this._removeClass(t(e.target), null, "ui-state-active"));
      } } }), t.widget("ui.sortable", t.ui.mouse, { version: "1.12.1", widgetEventPrefix: "sort", ready: !1, options: { appendTo: "parent", axis: !1, connectWith: !1, containment: !1, cursor: "auto", cursorAt: !1, dropOnEmpty: !0, forcePlaceholderSize: !1, forceHelperSize: !1, grid: !1, handle: !1, helper: "original", items: "> *", opacity: !1, placeholder: !1, revert: !1, scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, scope: "default", tolerance: "intersect", zIndex: 1e3, activate: null, beforeStop: null, change: null, deactivate: null, out: null, over: null, receive: null, remove: null, sort: null, start: null, stop: null, update: null }, _isOverAxis: function _isOverAxis(t, e, i) {
      return t >= e && e + i > t;
    }, _isFloating: function _isFloating(t) {
      return (/left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
      );
    }, _create: function _create() {
      this.containerCache = {}, this._addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0;
    }, _setOption: function _setOption(t, e) {
      this._super(t, e), "handle" === t && this._setHandleClassName();
    }, _setHandleClassName: function _setHandleClassName() {
      var e = this;this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"), t.each(this.items, function () {
        e._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle");
      });
    }, _destroy: function _destroy() {
      this._mouseDestroy();for (var t = this.items.length - 1; t >= 0; t--) {
        this.items[t].item.removeData(this.widgetName + "-item");
      }return this;
    }, _mouseCapture: function _mouseCapture(e, i) {
      var s = null,
          n = !1,
          o = this;return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function () {
        return t.data(this, o.widgetName + "-item") === o ? (s = t(this), !1) : void 0;
      }), t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)), s ? !this.options.handle || i || (t(this.options.handle, s).find("*").addBack().each(function () {
        this === e.target && (n = !0);
      }), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1 : !1);
    }, _mouseStart: function _mouseStart(e, i, s) {
      var n,
          o,
          a = this.options;if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = { top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left }, t.extend(this.offset, { click: { left: e.pageX - this.offset.left, top: e.pageY - this.offset.top }, parent: this._getParentOffset(), relative: this._getRelativeOffset() }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s) for (n = this.containers.length - 1; n >= 0; n--) {
        this.containers[n]._trigger("activate", e, this._uiHash(this));
      }return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this._addClass(this.helper, "ui-sortable-helper"), this._mouseDrag(e), !0;
    }, _mouseDrag: function _mouseDrag(e) {
      var i,
          s,
          n,
          o,
          a = this.options,
          r = !1;for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - this.document.scrollTop() < a.scrollSensitivity ? r = this.document.scrollTop(this.document.scrollTop() - a.scrollSpeed) : this.window.height() - (e.pageY - this.document.scrollTop()) < a.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + a.scrollSpeed)), e.pageX - this.document.scrollLeft() < a.scrollSensitivity ? r = this.document.scrollLeft(this.document.scrollLeft() - a.scrollSpeed) : this.window.width() - (e.pageX - this.document.scrollLeft()) < a.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + a.scrollSpeed))), r !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--) {
        if (s = this.items[i], n = s.item[0], o = this._intersectsWithPointer(s), o && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : !0)) {
          if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) break;this._rearrange(e, s), this._trigger("change", e, this._uiHash());break;
        }
      }return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1;
    }, _mouseStop: function _mouseStop(e, i) {
      if (e) {
        if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
          var s = this,
              n = this.placeholder.offset(),
              o = this.options.axis,
              a = {};o && "x" !== o || (a.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (a.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function () {
            s._clear(e);
          });
        } else this._clear(e, i);return !1;
      }
    }, cancel: function cancel() {
      if (this.dragging) {
        this._mouseUp(new t.Event("mouseup", { target: null })), "original" === this.options.helper ? (this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();for (var e = this.containers.length - 1; e >= 0; e--) {
          this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0);
        }
      }return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, { helper: null, dragging: !1, reverting: !1, _noFinalSort: null }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this;
    }, serialize: function serialize(e) {
      var i = this._getItemsAsjQuery(e && e.connected),
          s = [];return e = e || {}, t(i).each(function () {
        var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]));
      }), !s.length && e.key && s.push(e.key + "="), s.join("&");
    }, toArray: function toArray(e) {
      var i = this._getItemsAsjQuery(e && e.connected),
          s = [];return e = e || {}, i.each(function () {
        s.push(t(e.item || this).attr(e.attribute || "id") || "");
      }), s;
    }, _intersectsWith: function _intersectsWith(t) {
      var e = this.positionAbs.left,
          i = e + this.helperProportions.width,
          s = this.positionAbs.top,
          n = s + this.helperProportions.height,
          o = t.left,
          a = o + t.width,
          r = t.top,
          h = r + t.height,
          l = this.offset.click.top,
          c = this.offset.click.left,
          u = "x" === this.options.axis || s + l > r && h > s + l,
          d = "y" === this.options.axis || e + c > o && a > e + c,
          p = u && d;return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > o && a > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2;
    }, _intersectsWithPointer: function _intersectsWithPointer(t) {
      var e,
          i,
          s = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
          n = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width),
          o = s && n;return o ? (e = this._getDragVerticalDirection(), i = this._getDragHorizontalDirection(), this.floating ? "right" === i || "down" === e ? 2 : 1 : e && ("down" === e ? 2 : 1)) : !1;
    }, _intersectsWithSides: function _intersectsWithSides(t) {
      var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
          i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
          s = this._getDragVerticalDirection(),
          n = this._getDragHorizontalDirection();return this.floating && n ? "right" === n && i || "left" === n && !i : s && ("down" === s && e || "up" === s && !e);
    }, _getDragVerticalDirection: function _getDragVerticalDirection() {
      var t = this.positionAbs.top - this.lastPositionAbs.top;return 0 !== t && (t > 0 ? "down" : "up");
    }, _getDragHorizontalDirection: function _getDragHorizontalDirection() {
      var t = this.positionAbs.left - this.lastPositionAbs.left;return 0 !== t && (t > 0 ? "right" : "left");
    }, refresh: function refresh(t) {
      return this._refreshItems(t), this._setHandleClassName(), this.refreshPositions(), this;
    }, _connectWith: function _connectWith() {
      var t = this.options;return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith;
    }, _getItemsAsjQuery: function _getItemsAsjQuery(e) {
      function i() {
        r.push(this);
      }var s,
          n,
          o,
          a,
          r = [],
          h = [],
          l = this._connectWith();if (l && e) for (s = l.length - 1; s >= 0; s--) {
        for (o = t(l[s], this.document[0]), n = o.length - 1; n >= 0; n--) {
          a = t.data(o[n], this.widgetFullName), a && a !== this && !a.options.disabled && h.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
        }
      }for (h.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), s = h.length - 1; s >= 0; s--) {
        h[s][0].each(i);
      }return t(r);
    }, _removeCurrentsFromItems: function _removeCurrentsFromItems() {
      var e = this.currentItem.find(":data(" + this.widgetName + "-item)");this.items = t.grep(this.items, function (t) {
        for (var i = 0; e.length > i; i++) {
          if (e[i] === t.item[0]) return !1;
        }return !0;
      });
    }, _refreshItems: function _refreshItems(e) {
      this.items = [], this.containers = [this];var i,
          s,
          n,
          o,
          a,
          r,
          h,
          l,
          c = this.items,
          u = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, { item: this.currentItem }) : t(this.options.items, this.element), this]],
          d = this._connectWith();if (d && this.ready) for (i = d.length - 1; i >= 0; i--) {
        for (n = t(d[i], this.document[0]), s = n.length - 1; s >= 0; s--) {
          o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && (u.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, { item: this.currentItem }) : t(o.options.items, o.element), o]), this.containers.push(o));
        }
      }for (i = u.length - 1; i >= 0; i--) {
        for (a = u[i][1], r = u[i][0], s = 0, l = r.length; l > s; s++) {
          h = t(r[s]), h.data(this.widgetName + "-item", a), c.push({ item: h, instance: a, width: 0, height: 0, left: 0, top: 0 });
        }
      }
    }, refreshPositions: function refreshPositions(e) {
      this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1, this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());var i, s, n, o;for (i = this.items.length - 1; i >= 0; i--) {
        s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = n.outerWidth(), s.height = n.outerHeight()), o = n.offset(), s.left = o.left, s.top = o.top);
      }if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);else for (i = this.containers.length - 1; i >= 0; i--) {
        o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
      }return this;
    }, _createPlaceholder: function _createPlaceholder(e) {
      e = e || this;var i,
          s = e.options;s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = { element: function element() {
          var s = e.currentItem[0].nodeName.toLowerCase(),
              n = t("<" + s + ">", e.document[0]);return e._addClass(n, "ui-sortable-placeholder", i || e.currentItem[0].className)._removeClass(n, "ui-sortable-helper"), "tbody" === s ? e._createTrPlaceholder(e.currentItem.find("tr").eq(0), t("<tr>", e.document[0]).appendTo(n)) : "tr" === s ? e._createTrPlaceholder(e.currentItem, n) : "img" === s && n.attr("src", e.currentItem.attr("src")), i || n.css("visibility", "hidden"), n;
        }, update: function update(t, n) {
          (!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)));
        } }), e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), s.placeholder.update(e, e.placeholder);
    }, _createTrPlaceholder: function _createTrPlaceholder(e, i) {
      var s = this;e.children().each(function () {
        t("<td>&#160;</td>", s.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(i);
      });
    }, _contactContainers: function _contactContainers(e) {
      var i,
          s,
          n,
          o,
          a,
          r,
          h,
          l,
          c,
          u,
          d = null,
          p = null;for (i = this.containers.length - 1; i >= 0; i--) {
        if (!t.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
          if (d && t.contains(this.containers[i].element[0], d.element[0])) continue;d = this.containers[i], p = i;
        } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)), this.containers[i].containerCache.over = 0);
      }if (d) if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1);else {
        for (n = 1e4, o = null, c = d.floating || this._isFloating(this.currentItem), a = c ? "left" : "top", r = c ? "width" : "height", u = c ? "pageX" : "pageY", s = this.items.length - 1; s >= 0; s--) {
          t.contains(this.containers[p].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (h = this.items[s].item.offset()[a], l = !1, e[u] - h > this.items[s][r] / 2 && (l = !0), n > Math.abs(e[u] - h) && (n = Math.abs(e[u] - h), o = this.items[s], this.direction = l ? "up" : "down"));
        }if (!o && !this.options.dropOnEmpty) return;if (this.currentContainer === this.containers[p]) return this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash()), this.currentContainer.containerCache.over = 1), void 0;o ? this._rearrange(e, o, null, !0) : this._rearrange(e, null, this.containers[p].element, !0), this._trigger("change", e, this._uiHash()), this.containers[p]._trigger("change", e, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1;
      }
    }, _createHelper: function _createHelper(e) {
      var i = this.options,
          s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") }), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s;
    }, _adjustOffsetFromHelper: function _adjustOffsetFromHelper(e) {
      "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
    }, _getParentOffset: function _getParentOffset() {
      this.offsetParent = this.helper.offsetParent();var e = this.offsetParent.offset();return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = { top: 0, left: 0 }), { top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) };
    }, _getRelativeOffset: function _getRelativeOffset() {
      if ("relative" === this.cssPosition) {
        var t = this.currentItem.position();return { top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft() };
      }return { top: 0, left: 0 };
    }, _cacheMargins: function _cacheMargins() {
      this.margins = { left: parseInt(this.currentItem.css("marginLeft"), 10) || 0, top: parseInt(this.currentItem.css("marginTop"), 10) || 0 };
    }, _cacheHelperProportions: function _cacheHelperProportions() {
      this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
    }, _setContainment: function _setContainment() {
      var e,
          i,
          s,
          n = this.options;"parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === n.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === n.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0], i = t(n.containment).offset(), s = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]);
    }, _convertPositionTo: function _convertPositionTo(e, i) {
      i || (i = this.position);var s = "absolute" === e ? 1 : -1,
          n = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
          o = /(html|body)/i.test(n[0].tagName);return { top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s, left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s };
    }, _generatePosition: function _generatePosition(e) {
      var i,
          s,
          n = this.options,
          o = e.pageX,
          a = e.pageY,
          r = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
          h = /(html|body)/i.test(r[0].tagName);return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0], o = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), { top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()), left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft()) };
    }, _rearrange: function _rearrange(t, e, i, s) {
      i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;var n = this.counter;
      this._delay(function () {
        n === this.counter && this.refreshPositions(!s);
      });
    }, _clear: function _clear(t, e) {
      function i(t, e, i) {
        return function (s) {
          i._trigger(t, s, e._uiHash(e));
        };
      }this.reverting = !1;var s,
          n = [];if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
        for (s in this._storedCSS) {
          ("auto" === this._storedCSS[s] || "static" === this._storedCSS[s]) && (this._storedCSS[s] = "");
        }this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper");
      } else this.currentItem.show();for (this.fromOutside && !e && n.push(function (t) {
        this._trigger("receive", t, this._uiHash(this.fromOutside));
      }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || n.push(function (t) {
        this._trigger("update", t, this._uiHash());
      }), this !== this.currentContainer && (e || (n.push(function (t) {
        this._trigger("remove", t, this._uiHash());
      }), n.push(function (t) {
        return function (e) {
          t._trigger("receive", e, this._uiHash(this));
        };
      }.call(this, this.currentContainer)), n.push(function (t) {
        return function (e) {
          t._trigger("update", e, this._uiHash(this));
        };
      }.call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--) {
        e || n.push(i("deactivate", this, this.containers[s])), this.containers[s].containerCache.over && (n.push(i("out", this, this.containers[s])), this.containers[s].containerCache.over = 0);
      }if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !e) {
        for (s = 0; n.length > s; s++) {
          n[s].call(this, t);
        }this._trigger("stop", t, this._uiHash());
      }return this.fromOutside = !1, !this.cancelHelperRemoval;
    }, _trigger: function _trigger() {
      t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
    }, _uiHash: function _uiHash(e) {
      var i = e || this;return { helper: i.helper, placeholder: i.placeholder || t([]), position: i.position, originalPosition: i.originalPosition, offset: i.positionAbs, item: i.currentItem, sender: e ? e.element : null };
    } }), t.widget("ui.spinner", { version: "1.12.1", defaultElement: "<input>", widgetEventPrefix: "spin", options: { classes: { "ui-spinner": "ui-corner-all", "ui-spinner-down": "ui-corner-br", "ui-spinner-up": "ui-corner-tr" }, culture: null, icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" }, incremental: !0, max: null, min: null, numberFormat: null, page: 10, step: 1, change: null, spin: null, start: null, stop: null }, _create: function _create() {
      this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, { beforeunload: function beforeunload() {
          this.element.removeAttr("autocomplete");
        } });
    }, _getCreateOptions: function _getCreateOptions() {
      var e = this._super(),
          i = this.element;return t.each(["min", "max", "step"], function (t, s) {
        var n = i.attr(s);null != n && n.length && (e[s] = n);
      }), e;
    }, _events: { keydown: function keydown(t) {
        this._start(t) && this._keydown(t) && t.preventDefault();
      }, keyup: "_stop", focus: function focus() {
        this.previous = this.element.val();
      }, blur: function blur(t) {
        return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", t), void 0);
      }, mousewheel: function mousewheel(t, e) {
        if (e) {
          if (!this.spinning && !this._start(t)) return !1;this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function () {
            this.spinning && this._stop(t);
          }, 100), t.preventDefault();
        }
      }, "mousedown .ui-spinner-button": function mousedownUiSpinnerButton(e) {
        function i() {
          var e = this.element[0] === t.ui.safeActiveElement(this.document[0]);e || (this.element.trigger("focus"), this.previous = s, this._delay(function () {
            this.previous = s;
          }));
        }var s;s = this.element[0] === t.ui.safeActiveElement(this.document[0]) ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function () {
          delete this.cancelBlur, i.call(this);
        }), this._start(e) !== !1 && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e);
      }, "mouseup .ui-spinner-button": "_stop", "mouseenter .ui-spinner-button": function mouseenterUiSpinnerButton(e) {
        return t(e.currentTarget).hasClass("ui-state-active") ? this._start(e) === !1 ? !1 : (this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e), void 0) : void 0;
      }, "mouseleave .ui-spinner-button": "_stop" }, _enhance: function _enhance() {
      this.uiSpinner = this.element.attr("autocomplete", "off").wrap("<span>").parent().append("<a></a><a></a>");
    }, _draw: function _draw() {
      this._enhance(), this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content"), this._addClass("ui-spinner-input"), this.element.attr("role", "spinbutton"), this.buttons = this.uiSpinner.children("a").attr("tabIndex", -1).attr("aria-hidden", !0).button({ classes: { "ui-button": "" } }), this._removeClass(this.buttons, "ui-corner-all"), this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up"), this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down"), this.buttons.first().button({ icon: this.options.icons.up, showLabel: !1 }), this.buttons.last().button({ icon: this.options.icons.down, showLabel: !1 }), this.buttons.height() > Math.ceil(.5 * this.uiSpinner.height()) && this.uiSpinner.height() > 0 && this.uiSpinner.height(this.uiSpinner.height());
    }, _keydown: function _keydown(e) {
      var i = this.options,
          s = t.ui.keyCode;switch (e.keyCode) {case s.UP:
          return this._repeat(null, 1, e), !0;case s.DOWN:
          return this._repeat(null, -1, e), !0;case s.PAGE_UP:
          return this._repeat(null, i.page, e), !0;case s.PAGE_DOWN:
          return this._repeat(null, -i.page, e), !0;}return !1;
    }, _start: function _start(t) {
      return this.spinning || this._trigger("start", t) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1;
    }, _repeat: function _repeat(t, e, i) {
      t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function () {
        this._repeat(40, e, i);
      }, t), this._spin(e * this.options.step, i);
    }, _spin: function _spin(t, e) {
      var i = this.value() || 0;this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && this._trigger("spin", e, { value: i }) === !1 || (this._value(i), this.counter++);
    }, _increment: function _increment(e) {
      var i = this.options.incremental;return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1;
    }, _precision: function _precision() {
      var t = this._precisionOf(this.options.step);return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t;
    }, _precisionOf: function _precisionOf(t) {
      var e = "" + t,
          i = e.indexOf(".");return -1 === i ? 0 : e.length - i - 1;
    }, _adjustValue: function _adjustValue(t) {
      var e,
          i,
          s = this.options;return e = null !== s.min ? s.min : 0, i = t - e, i = Math.round(i / s.step) * s.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== s.max && t > s.max ? s.max : null !== s.min && s.min > t ? s.min : t;
    }, _stop: function _stop(t) {
      this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t));
    }, _setOption: function _setOption(t, e) {
      var i, s, n;return "culture" === t || "numberFormat" === t ? (i = this._parse(this.element.val()), this.options[t] = e, this.element.val(this._format(i)), void 0) : (("max" === t || "min" === t || "step" === t) && "string" == typeof e && (e = this._parse(e)), "icons" === t && (s = this.buttons.first().find(".ui-icon"), this._removeClass(s, null, this.options.icons.up), this._addClass(s, null, e.up), n = this.buttons.last().find(".ui-icon"), this._removeClass(n, null, this.options.icons.down), this._addClass(n, null, e.down)), this._super(t, e), void 0);
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this._super(t), this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!t), this.element.prop("disabled", !!t), this.buttons.button(t ? "disable" : "enable");
    }, _setOptions: r(function (t) {
      this._super(t);
    }), _parse: function _parse(t) {
      return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t;
    }, _format: function _format(t) {
      return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t;
    }, _refresh: function _refresh() {
      this.element.attr({ "aria-valuemin": this.options.min, "aria-valuemax": this.options.max, "aria-valuenow": this._parse(this.element.val()) });
    }, isValid: function isValid() {
      var t = this.value();return null === t ? !1 : t === this._adjustValue(t);
    }, _value: function _value(t, e) {
      var i;"" !== t && (i = this._parse(t), null !== i && (e || (i = this._adjustValue(i)), t = this._format(i))), this.element.val(t), this._refresh();
    }, _destroy: function _destroy() {
      this.element.prop("disabled", !1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"), this.uiSpinner.replaceWith(this.element);
    }, stepUp: r(function (t) {
      this._stepUp(t);
    }), _stepUp: function _stepUp(t) {
      this._start() && (this._spin((t || 1) * this.options.step), this._stop());
    }, stepDown: r(function (t) {
      this._stepDown(t);
    }), _stepDown: function _stepDown(t) {
      this._start() && (this._spin((t || 1) * -this.options.step), this._stop());
    }, pageUp: r(function (t) {
      this._stepUp((t || 1) * this.options.page);
    }), pageDown: r(function (t) {
      this._stepDown((t || 1) * this.options.page);
    }), value: function value(t) {
      return arguments.length ? (r(this._value).call(this, t), void 0) : this._parse(this.element.val());
    }, widget: function widget() {
      return this.uiSpinner;
    } }), t.uiBackCompat !== !1 && t.widget("ui.spinner", t.ui.spinner, { _enhance: function _enhance() {
      this.uiSpinner = this.element.attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
    }, _uiSpinnerHtml: function _uiSpinnerHtml() {
      return "<span>";
    }, _buttonHtml: function _buttonHtml() {
      return "<a></a><a></a>";
    } }), t.ui.spinner, t.widget("ui.tabs", { version: "1.12.1", delay: 300, options: { active: null, classes: { "ui-tabs": "ui-corner-all", "ui-tabs-nav": "ui-corner-all", "ui-tabs-panel": "ui-corner-bottom", "ui-tabs-tab": "ui-corner-top" }, collapsible: !1, event: "click", heightStyle: "content", hide: null, show: null, activate: null, beforeActivate: null, beforeLoad: null, load: null }, _isLocal: function () {
      var t = /#.*$/;return function (e) {
        var i, s;i = e.href.replace(t, ""), s = location.href.replace(t, "");try {
          i = decodeURIComponent(i);
        } catch (n) {}try {
          s = decodeURIComponent(s);
        } catch (n) {}return e.hash.length > 1 && i === s;
      };
    }(), _create: function _create() {
      var e = this,
          i = this.options;this.running = !1, this._addClass("ui-tabs", "ui-widget ui-widget-content"), this._toggleClass("ui-tabs-collapsible", null, i.collapsible), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function (t) {
        return e.tabs.index(t);
      }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(), this._refresh(), this.active.length && this.load(i.active);
    }, _initialActive: function _initialActive() {
      var e = this.options.active,
          i = this.options.collapsible,
          s = location.hash.substring(1);return null === e && (s && this.tabs.each(function (i, n) {
        return t(n).attr("aria-controls") === s ? (e = i, !1) : void 0;
      }), null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === e || -1 === e) && (e = this.tabs.length ? 0 : !1)), e !== !1 && (e = this.tabs.index(this.tabs.eq(e)), -1 === e && (e = i ? !1 : 0)), !i && e === !1 && this.anchors.length && (e = 0), e;
    }, _getCreateEventData: function _getCreateEventData() {
      return { tab: this.active, panel: this.active.length ? this._getPanelForTab(this.active) : t() };
    }, _tabKeydown: function _tabKeydown(e) {
      var i = t(t.ui.safeActiveElement(this.document[0])).closest("li"),
          s = this.tabs.index(i),
          n = !0;if (!this._handlePageNav(e)) {
        switch (e.keyCode) {case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:
            s++;break;case t.ui.keyCode.UP:case t.ui.keyCode.LEFT:
            n = !1, s--;break;case t.ui.keyCode.END:
            s = this.anchors.length - 1;break;case t.ui.keyCode.HOME:
            s = 0;break;case t.ui.keyCode.SPACE:
            return e.preventDefault(), clearTimeout(this.activating), this._activate(s), void 0;case t.ui.keyCode.ENTER:
            return e.preventDefault(), clearTimeout(this.activating), this._activate(s === this.options.active ? !1 : s), void 0;default:
            return;}e.preventDefault(), clearTimeout(this.activating), s = this._focusNextTab(s, n), e.ctrlKey || e.metaKey || (i.attr("aria-selected", "false"), this.tabs.eq(s).attr("aria-selected", "true"), this.activating = this._delay(function () {
          this.option("active", s);
        }, this.delay));
      }
    }, _panelKeydown: function _panelKeydown(e) {
      this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.trigger("focus"));
    }, _handlePageNav: function _handlePageNav(e) {
      return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0;
    }, _findNextTab: function _findNextTab(e, i) {
      function s() {
        return e > n && (e = 0), 0 > e && (e = n), e;
      }for (var n = this.tabs.length - 1; -1 !== t.inArray(s(), this.options.disabled);) {
        e = i ? e + 1 : e - 1;
      }return e;
    }, _focusNextTab: function _focusNextTab(t, e) {
      return t = this._findNextTab(t, e), this.tabs.eq(t).trigger("focus"), t;
    }, _setOption: function _setOption(t, e) {
      return "active" === t ? (this._activate(e), void 0) : (this._super(t, e), "collapsible" === t && (this._toggleClass("ui-tabs-collapsible", null, e), e || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(e), "heightStyle" === t && this._setupHeightStyle(e), void 0);
    }, _sanitizeSelector: function _sanitizeSelector(t) {
      return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "";
    }, refresh: function refresh() {
      var e = this.options,
          i = this.tablist.children(":has(a[href])");e.disabled = t.map(i.filter(".ui-state-disabled"), function (t) {
        return i.index(t);
      }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh();
    }, _refresh: function _refresh() {
      this._setOptionDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({ "aria-selected": "false", "aria-expanded": "false", tabIndex: -1 }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({ "aria-hidden": "true" }), this.active.length ? (this.active.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 }), this._addClass(this.active, "ui-tabs-active", "ui-state-active"), this._getPanelForTab(this.active).show().attr({ "aria-hidden": "false" })) : this.tabs.eq(0).attr("tabIndex", 0);
    }, _processTabs: function _processTabs() {
      var e = this,
          i = this.tabs,
          s = this.anchors,
          n = this.panels;this.tablist = this._getList().attr("role", "tablist"), this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header"), this.tablist.on("mousedown" + this.eventNamespace, "> li", function (e) {
        t(this).is(".ui-state-disabled") && e.preventDefault();
      }).on("focus" + this.eventNamespace, ".ui-tabs-anchor", function () {
        t(this).closest("li").is(".ui-state-disabled") && this.blur();
      }), this.tabs = this.tablist.find("> li:has(a[href])").attr({ role: "tab", tabIndex: -1 }), this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"), this.anchors = this.tabs.map(function () {
        return t("a", this)[0];
      }).attr({ role: "presentation", tabIndex: -1 }), this._addClass(this.anchors, "ui-tabs-anchor"), this.panels = t(), this.anchors.each(function (i, s) {
        var n,
            o,
            a,
            r = t(s).uniqueId().attr("id"),
            h = t(s).closest("li"),
            l = h.attr("aria-controls");e._isLocal(s) ? (n = s.hash, a = n.substring(1), o = e.element.find(e._sanitizeSelector(n))) : (a = h.attr("aria-controls") || t({}).uniqueId()[0].id, n = "#" + a, o = e.element.find(n), o.length || (o = e._createPanel(a), o.insertAfter(e.panels[i - 1] || e.tablist)), o.attr("aria-live", "polite")), o.length && (e.panels = e.panels.add(o)), l && h.data("ui-tabs-aria-controls", l), h.attr({ "aria-controls": a, "aria-labelledby": r }), o.attr("aria-labelledby", r);
      }), this.panels.attr("role", "tabpanel"), this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"), i && (this._off(i.not(this.tabs)), this._off(s.not(this.anchors)), this._off(n.not(this.panels)));
    }, _getList: function _getList() {
      return this.tablist || this.element.find("ol, ul").eq(0);
    }, _createPanel: function _createPanel(e) {
      return t("<div>").attr("id", e).data("ui-tabs-destroy", !0);
    }, _setOptionDisabled: function _setOptionDisabled(e) {
      var i, s, n;for (t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1), n = 0; s = this.tabs[n]; n++) {
        i = t(s), e === !0 || -1 !== t.inArray(n, e) ? (i.attr("aria-disabled", "true"), this._addClass(i, null, "ui-state-disabled")) : (i.removeAttr("aria-disabled"), this._removeClass(i, null, "ui-state-disabled"));
      }this.options.disabled = e, this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, e === !0);
    }, _setupEvents: function _setupEvents(e) {
      var i = {};e && t.each(e.split(" "), function (t, e) {
        i[e] = "_eventHandler";
      }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, { click: function click(t) {
          t.preventDefault();
        } }), this._on(this.anchors, i), this._on(this.tabs, { keydown: "_tabKeydown" }), this._on(this.panels, { keydown: "_panelKeydown" }), this._focusable(this.tabs), this._hoverable(this.tabs);
    }, _setupHeightStyle: function _setupHeightStyle(e) {
      var i,
          s = this.element.parent();"fill" === e ? (i = s.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function () {
        var e = t(this),
            s = e.css("position");"absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0));
      }), this.element.children().not(this.panels).each(function () {
        i -= t(this).outerHeight(!0);
      }), this.panels.each(function () {
        t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()));
      }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function () {
        i = Math.max(i, t(this).height("").height());
      }).height(i));
    }, _eventHandler: function _eventHandler(e) {
      var i = this.options,
          s = this.active,
          n = t(e.currentTarget),
          o = n.closest("li"),
          a = o[0] === s[0],
          r = a && i.collapsible,
          h = r ? t() : this._getPanelForTab(o),
          l = s.length ? this._getPanelForTab(s) : t(),
          c = { oldTab: s, oldPanel: l, newTab: r ? t() : o, newPanel: h };e.preventDefault(), o.hasClass("ui-state-disabled") || o.hasClass("ui-tabs-loading") || this.running || a && !i.collapsible || this._trigger("beforeActivate", e, c) === !1 || (i.active = r ? !1 : this.tabs.index(o), this.active = a ? t() : o, this.xhr && this.xhr.abort(), l.length || h.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), h.length && this.load(this.tabs.index(o), e), this._toggle(e, c));
    }, _toggle: function _toggle(e, i) {
      function s() {
        o.running = !1, o._trigger("activate", e, i);
      }function n() {
        o._addClass(i.newTab.closest("li"), "ui-tabs-active", "ui-state-active"), a.length && o.options.show ? o._show(a, o.options.show, s) : (a.show(), s());
      }var o = this,
          a = i.newPanel,
          r = i.oldPanel;this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function () {
        o._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), n();
      }) : (this._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), r.hide(), n()), r.attr("aria-hidden", "true"), i.oldTab.attr({ "aria-selected": "false", "aria-expanded": "false" }), a.length && r.length ? i.oldTab.attr("tabIndex", -1) : a.length && this.tabs.filter(function () {
        return 0 === t(this).attr("tabIndex");
      }).attr("tabIndex", -1), a.attr("aria-hidden", "false"), i.newTab.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 });
    }, _activate: function _activate(e) {
      var i,
          s = this._findActive(e);s[0] !== this.active[0] && (s.length || (s = this.active), i = s.find(".ui-tabs-anchor")[0], this._eventHandler({ target: i, currentTarget: i, preventDefault: t.noop }));
    }, _findActive: function _findActive(e) {
      return e === !1 ? t() : this.tabs.eq(e);
    }, _getIndex: function _getIndex(e) {
      return "string" == typeof e && (e = this.anchors.index(this.anchors.filter("[href$='" + t.ui.escapeSelector(e) + "']"))), e;
    }, _destroy: function _destroy() {
      this.xhr && this.xhr.abort(), this.tablist.removeAttr("role").off(this.eventNamespace), this.anchors.removeAttr("role tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function () {
        t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded");
      }), this.tabs.each(function () {
        var e = t(this),
            i = e.data("ui-tabs-aria-controls");i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls");
      }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "");
    }, enable: function enable(e) {
      var i = this.options.disabled;i !== !1 && (void 0 === e ? i = !1 : (e = this._getIndex(e), i = t.isArray(i) ? t.map(i, function (t) {
        return t !== e ? t : null;
      }) : t.map(this.tabs, function (t, i) {
        return i !== e ? i : null;
      })), this._setOptionDisabled(i));
    }, disable: function disable(e) {
      var i = this.options.disabled;if (i !== !0) {
        if (void 0 === e) i = !0;else {
          if (e = this._getIndex(e), -1 !== t.inArray(e, i)) return;i = t.isArray(i) ? t.merge([e], i).sort() : [e];
        }this._setOptionDisabled(i);
      }
    }, load: function load(e, i) {
      e = this._getIndex(e);var s = this,
          n = this.tabs.eq(e),
          o = n.find(".ui-tabs-anchor"),
          a = this._getPanelForTab(n),
          r = { tab: n, panel: a },
          h = function h(t, e) {
        "abort" === e && s.panels.stop(!1, !0), s._removeClass(n, "ui-tabs-loading"), a.removeAttr("aria-busy"), t === s.xhr && delete s.xhr;
      };this._isLocal(o[0]) || (this.xhr = t.ajax(this._ajaxSettings(o, i, r)), this.xhr && "canceled" !== this.xhr.statusText && (this._addClass(n, "ui-tabs-loading"), a.attr("aria-busy", "true"), this.xhr.done(function (t, e, n) {
        setTimeout(function () {
          a.html(t), s._trigger("load", i, r), h(n, e);
        }, 1);
      }).fail(function (t, e) {
        setTimeout(function () {
          h(t, e);
        }, 1);
      })));
    }, _ajaxSettings: function _ajaxSettings(e, i, s) {
      var n = this;return { url: e.attr("href").replace(/#.*$/, ""), beforeSend: function beforeSend(e, o) {
          return n._trigger("beforeLoad", i, t.extend({ jqXHR: e, ajaxSettings: o }, s));
        } };
    }, _getPanelForTab: function _getPanelForTab(e) {
      var i = t(e).attr("aria-controls");return this.element.find(this._sanitizeSelector("#" + i));
    } }), t.uiBackCompat !== !1 && t.widget("ui.tabs", t.ui.tabs, { _processTabs: function _processTabs() {
      this._superApply(arguments), this._addClass(this.tabs, "ui-tab");
    } }), t.ui.tabs, t.widget("ui.tooltip", { version: "1.12.1", options: { classes: { "ui-tooltip": "ui-corner-all ui-widget-shadow" }, content: function content() {
        var e = t(this).attr("title") || "";return t("<a>").text(e).html();
      }, hide: !0, items: "[title]:not([disabled])", position: { my: "left top+15", at: "left bottom", collision: "flipfit flip" }, show: !0, track: !1, close: null, open: null }, _addDescribedBy: function _addDescribedBy(e, i) {
      var s = (e.attr("aria-describedby") || "").split(/\s+/);s.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(s.join(" ")));
    }, _removeDescribedBy: function _removeDescribedBy(e) {
      var i = e.data("ui-tooltip-id"),
          s = (e.attr("aria-describedby") || "").split(/\s+/),
          n = t.inArray(i, s);-1 !== n && s.splice(n, 1), e.removeData("ui-tooltip-id"), s = t.trim(s.join(" ")), s ? e.attr("aria-describedby", s) : e.removeAttr("aria-describedby");
    }, _create: function _create() {
      this._on({ mouseover: "open", focusin: "open" }), this.tooltips = {}, this.parents = {}, this.liveRegion = t("<div>").attr({ role: "log", "aria-live": "assertive", "aria-relevant": "additions" }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this.disabledTitles = t([]);
    }, _setOption: function _setOption(e, i) {
      var s = this;this._super(e, i), "content" === e && t.each(this.tooltips, function (t, e) {
        s._updateContent(e.element);
      });
    }, _setOptionDisabled: function _setOptionDisabled(t) {
      this[t ? "_disable" : "_enable"]();
    }, _disable: function _disable() {
      var e = this;t.each(this.tooltips, function (i, s) {
        var n = t.Event("blur");n.target = n.currentTarget = s.element[0], e.close(n, !0);
      }), this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function () {
        var e = t(this);return e.is("[title]") ? e.data("ui-tooltip-title", e.attr("title")).removeAttr("title") : void 0;
      }));
    }, _enable: function _enable() {
      this.disabledTitles.each(function () {
        var e = t(this);e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"));
      }), this.disabledTitles = t([]);
    }, open: function open(e) {
      var i = this,
          s = t(e ? e.target : this.element).closest(this.options.items);s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), e && "mouseover" === e.type && s.parents().each(function () {
        var e,
            s = t(this);s.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = { element: this, title: s.attr("title") }, s.attr("title", ""));
      }), this._registerCloseHandlers(e, s), this._updateContent(s, e));
    }, _updateContent: function _updateContent(t, e) {
      var i,
          s = this.options.content,
          n = this,
          o = e ? e.type : null;return "string" == typeof s || s.nodeType || s.jquery ? this._open(e, t, s) : (i = s.call(t[0], function (i) {
        n._delay(function () {
          t.data("ui-tooltip-open") && (e && (e.type = o), this._open(e, t, i));
        });
      }), i && this._open(e, t, i), void 0);
    }, _open: function _open(e, i, s) {
      function n(t) {
        l.of = t, a.is(":hidden") || a.position(l);
      }var o,
          a,
          r,
          h,
          l = t.extend({}, this.options.position);if (s) {
        if (o = this._find(i)) return o.tooltip.find(".ui-tooltip-content").html(s), void 0;i.is("[title]") && (e && "mouseover" === e.type ? i.attr("title", "") : i.removeAttr("title")), o = this._tooltip(i), a = o.tooltip, this._addDescribedBy(i, a.attr("id")), a.find(".ui-tooltip-content").html(s), this.liveRegion.children().hide(), h = t("<div>").html(a.find(".ui-tooltip-content").html()), h.removeAttr("name").find("[name]").removeAttr("name"), h.removeAttr("id").find("[id]").removeAttr("id"), h.appendTo(this.liveRegion), this.options.track && e && /^mouse/.test(e.type) ? (this._on(this.document, { mousemove: n }), n(e)) : a.position(t.extend({ of: i }, this.options.position)), a.hide(), this._show(a, this.options.show), this.options.track && this.options.show && this.options.show.delay && (r = this.delayedShow = setInterval(function () {
          a.is(":visible") && (n(l.of), clearInterval(r));
        }, t.fx.interval)), this._trigger("open", e, { tooltip: a });
      }
    }, _registerCloseHandlers: function _registerCloseHandlers(e, i) {
      var s = { keyup: function keyup(e) {
          if (e.keyCode === t.ui.keyCode.ESCAPE) {
            var s = t.Event(e);s.currentTarget = i[0], this.close(s, !0);
          }
        } };i[0] !== this.element[0] && (s.remove = function () {
        this._removeTooltip(this._find(i).tooltip);
      }), e && "mouseover" !== e.type || (s.mouseleave = "close"), e && "focusin" !== e.type || (s.focusout = "close"), this._on(!0, i, s);
    }, close: function close(e) {
      var i,
          s = this,
          n = t(e ? e.currentTarget : this.element),
          o = this._find(n);return o ? (i = o.tooltip, o.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && !n.attr("title") && n.attr("title", n.data("ui-tooltip-title")), this._removeDescribedBy(n), o.hiding = !0, i.stop(!0), this._hide(i, this.options.hide, function () {
        s._removeTooltip(t(this));
      }), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function (e, i) {
        t(i.element).attr("title", i.title), delete s.parents[e];
      }), o.closing = !0, this._trigger("close", e, { tooltip: i }), o.hiding || (o.closing = !1)), void 0) : (n.removeData("ui-tooltip-open"), void 0);
    }, _tooltip: function _tooltip(e) {
      var i = t("<div>").attr("role", "tooltip"),
          s = t("<div>").appendTo(i),
          n = i.uniqueId().attr("id");return this._addClass(s, "ui-tooltip-content"), this._addClass(i, "ui-tooltip", "ui-widget ui-widget-content"), i.appendTo(this._appendTo(e)), this.tooltips[n] = { element: e, tooltip: i };
    }, _find: function _find(t) {
      var e = t.data("ui-tooltip-id");return e ? this.tooltips[e] : null;
    }, _removeTooltip: function _removeTooltip(t) {
      t.remove(), delete this.tooltips[t.attr("id")];
    }, _appendTo: function _appendTo(t) {
      var e = t.closest(".ui-front, dialog");return e.length || (e = this.document[0].body), e;
    }, _destroy: function _destroy() {
      var e = this;t.each(this.tooltips, function (i, s) {
        var n = t.Event("blur"),
            o = s.element;n.target = n.currentTarget = o[0], e.close(n, !0), t("#" + i).remove(), o.data("ui-tooltip-title") && (o.attr("title") || o.attr("title", o.data("ui-tooltip-title")), o.removeData("ui-tooltip-title"));
      }), this.liveRegion.remove();
    } }), t.uiBackCompat !== !1 && t.widget("ui.tooltip", t.ui.tooltip, { options: { tooltipClass: null }, _tooltip: function _tooltip() {
      var t = this._superApply(arguments);return this.options.tooltipClass && t.tooltip.addClass(this.options.tooltipClass), t;
    } }), t.ui.tooltip;
});
"use strict";

/**
 * jQuery Masonry v2.1.08
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
(function (e, t, n) {
  "use strict";
  var r = t.event,
      i;r.special.smartresize = { setup: function setup() {
      t(this).bind("resize", r.special.smartresize.handler);
    }, teardown: function teardown() {
      t(this).unbind("resize", r.special.smartresize.handler);
    }, handler: function handler(e, t) {
      var n = this,
          s = arguments;e.type = "smartresize", i && clearTimeout(i), i = setTimeout(function () {
        r.dispatch.apply(n, s);
      }, t === "execAsap" ? 0 : 100);
    } }, t.fn.smartresize = function (e) {
    return e ? this.bind("smartresize", e) : this.trigger("smartresize", ["execAsap"]);
  }, t.Mason = function (e, n) {
    this.element = t(n), this._create(e), this._init();
  }, t.Mason.settings = { isResizable: !0, isAnimated: !1, animationOptions: { queue: !1, duration: 500 }, gutterWidth: 0, isRTL: !1, isFitWidth: !1, containerStyle: { position: "relative" } }, t.Mason.prototype = { _filterFindBricks: function _filterFindBricks(e) {
      var t = this.options.itemSelector;return t ? e.filter(t).add(e.find(t)) : e;
    }, _getBricks: function _getBricks(e) {
      var t = this._filterFindBricks(e).css({ position: "absolute" }).addClass("masonry-brick");return t;
    }, _create: function _create(n) {
      this.options = t.extend(!0, {}, t.Mason.settings, n), this.styleQueue = [];var r = this.element[0].style;this.originalStyle = { height: r.height || "" };var i = this.options.containerStyle;for (var s in i) {
        this.originalStyle[s] = r[s] || "";
      }this.element.css(i), this.horizontalDirection = this.options.isRTL ? "right" : "left";var o = this.element.css("padding-" + this.horizontalDirection),
          u = this.element.css("padding-top");this.offset = { x: o ? parseInt(o, 10) : 0, y: u ? parseInt(u, 10) : 0 }, this.isFluid = this.options.columnWidth && typeof this.options.columnWidth == "function";var a = this;setTimeout(function () {
        a.element.addClass("masonry");
      }, 0), this.options.isResizable && t(e).bind("smartresize.masonry", function () {
        a.resize();
      }), this.reloadItems();
    }, _init: function _init(e) {
      this._getColumns(), this._reLayout(e);
    }, option: function option(e, n) {
      t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e));
    }, layout: function layout(e, t) {
      for (var n = 0, r = e.length; n < r; n++) {
        this._placeBrick(e[n]);
      }var i = {};i.height = Math.max.apply(Math, this.colYs);if (this.options.isFitWidth) {
        var s = 0;n = this.cols;while (--n) {
          if (this.colYs[n] !== 0) break;s++;
        }i.width = (this.cols - s) * this.columnWidth - this.options.gutterWidth;
      }this.styleQueue.push({ $el: this.element, style: i });var o = this.isLaidOut ? this.options.isAnimated ? "animate" : "css" : "css",
          u = this.options.animationOptions,
          a;for (n = 0, r = this.styleQueue.length; n < r; n++) {
        a = this.styleQueue[n], a.$el[o](a.style, u);
      }this.styleQueue = [], t && t.call(e), this.isLaidOut = !0;
    }, _getColumns: function _getColumns() {
      var e = this.options.isFitWidth ? this.element.parent() : this.element,
          t = e.width();this.columnWidth = this.isFluid ? this.options.columnWidth(t) : this.options.columnWidth || this.$bricks.outerWidth(!0) || t, this.columnWidth += this.options.gutterWidth, this.cols = Math.floor((t + this.options.gutterWidth) / this.columnWidth), this.cols = Math.max(this.cols, 1);
    }, _placeBrick: function _placeBrick(e) {
      var n = t(e),
          r,
          i,
          s,
          o,
          u;r = Math.ceil(n.outerWidth(!0) / this.columnWidth), r = Math.min(r, this.cols);if (r === 1) s = this.colYs;else {
        i = this.cols + 1 - r, s = [];for (u = 0; u < i; u++) {
          o = this.colYs.slice(u, u + r), s[u] = Math.max.apply(Math, o);
        }
      }var a = Math.min.apply(Math, s),
          f = 0;for (var l = 0, c = s.length; l < c; l++) {
        if (s[l] === a) {
          f = l;break;
        }
      }var h = { top: a + this.offset.y };h[this.horizontalDirection] = this.columnWidth * f + this.offset.x, this.styleQueue.push({ $el: n, style: h });var p = a + n.outerHeight(!0),
          d = this.cols + 1 - c;for (l = 0; l < d; l++) {
        this.colYs[f + l] = p;
      }
    }, resize: function resize() {
      var e = this.cols;this._getColumns(), (this.isFluid || this.cols !== e) && this._reLayout();
    }, _reLayout: function _reLayout(e) {
      var t = this.cols;this.colYs = [];while (t--) {
        this.colYs.push(0);
      }this.layout(this.$bricks, e);
    }, reloadItems: function reloadItems() {
      this.$bricks = this._getBricks(this.element.children());
    }, reload: function reload(e) {
      this.reloadItems(), this._init(e);
    }, appended: function appended(e, t, n) {
      if (t) {
        this._filterFindBricks(e).css({ top: this.element.height() });var r = this;setTimeout(function () {
          r._appended(e, n);
        }, 1);
      } else this._appended(e, n);
    }, _appended: function _appended(e, t) {
      var n = this._getBricks(e);this.$bricks = this.$bricks.add(n), this.layout(n, t);
    }, remove: function remove(e) {
      this.$bricks = this.$bricks.not(e), e.remove();
    }, destroy: function destroy() {
      this.$bricks.removeClass("masonry-brick").each(function () {
        this.style.position = "", this.style.top = "", this.style.left = "";
      });var n = this.element[0].style;for (var r in this.originalStyle) {
        n[r] = this.originalStyle[r];
      }this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"), t(e).unbind(".masonry");
    } }, t.fn.imagesLoaded = function (e) {
    function u() {
      e.call(n, r);
    }function a(e) {
      var n = e.target;n.src !== s && t.inArray(n, o) === -1 && (o.push(n), --i <= 0 && (setTimeout(u), r.unbind(".imagesLoaded", a)));
    }var n = this,
        r = n.find("img").add(n.filter("img")),
        i = r.length,
        s = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
        o = [];return i || u(), r.bind("load.imagesLoaded error.imagesLoaded", a).each(function () {
      var e = this.src;this.src = s, this.src = e;
    }), n;
  };var s = function s(t) {
    e.console && e.console.error(t);
  };t.fn.masonry = function (e) {
    if (typeof e == "string") {
      var n = Array.prototype.slice.call(arguments, 1);this.each(function () {
        var r = t.data(this, "masonry");if (!r) {
          s("cannot call methods on masonry prior to initialization; attempted to call method '" + e + "'");return;
        }if (!t.isFunction(r[e]) || e.charAt(0) === "_") {
          s("no such method '" + e + "' for masonry instance");return;
        }r[e].apply(r, n);
      });
    } else this.each(function () {
      var n = t.data(this, "masonry");n ? (n.option(e || {}), n._init()) : t.data(this, "masonry", new t.Mason(e, this));
    });return this;
  };
})(window, jQuery);
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, t) {
  function n(e) {
    var t = e.length,
        n = ce.type(e);return ce.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e);
  }function r(e) {
    var t = ke[e] = {};return ce.each(e.match(pe) || [], function (e, n) {
      t[n] = !0;
    }), t;
  }function i(e, n, r, i) {
    if (ce.acceptData(e)) {
      var o,
          a,
          s = ce.expando,
          u = e.nodeType,
          l = u ? ce.cache : e,
          c = u ? e[s] : e[s] && s;if (c && l[c] && (i || l[c].data) || r !== t || "string" != typeof n) return c || (c = u ? e[s] = te.pop() || ce.guid++ : s), l[c] || (l[c] = u ? {} : { toJSON: ce.noop }), ("object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) || "function" == typeof n) && (i ? l[c] = ce.extend(l[c], n) : l[c].data = ce.extend(l[c].data, n)), a = l[c], i || (a.data || (a.data = {}), a = a.data), r !== t && (a[ce.camelCase(n)] = r), "string" == typeof n ? (o = a[n], null == o && (o = a[ce.camelCase(n)])) : o = a, o;
    }
  }function o(e, t, n) {
    if (ce.acceptData(e)) {
      var r,
          i,
          o = e.nodeType,
          a = o ? ce.cache : e,
          u = o ? e[ce.expando] : ce.expando;if (a[u]) {
        if (t && (r = n ? a[u] : a[u].data)) {
          ce.isArray(t) ? t = t.concat(ce.map(t, ce.camelCase)) : t in r ? t = [t] : (t = ce.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;for (; i--;) {
            delete r[t[i]];
          }if (n ? !s(r) : !ce.isEmptyObject(r)) return;
        }(n || (delete a[u].data, s(a[u]))) && (o ? ce.cleanData([e], !0) : ce.support.deleteExpando || a != a.window ? delete a[u] : a[u] = null);
      }
    }
  }function a(e, n, r) {
    if (r === t && 1 === e.nodeType) {
      var i = "data-" + n.replace(Se, "-$1").toLowerCase();if (r = e.getAttribute(i), "string" == typeof r) {
        try {
          r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : Ee.test(r) ? ce.parseJSON(r) : r;
        } catch (o) {}ce.data(e, n, r);
      } else r = t;
    }return r;
  }function s(e) {
    var t;for (t in e) {
      if (("data" !== t || !ce.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
    }return !0;
  }function u() {
    return !0;
  }function l() {
    return !1;
  }function c() {
    try {
      return G.activeElement;
    } catch (e) {}
  }function f(e, t) {
    do {
      e = e[t];
    } while (e && 1 !== e.nodeType);return e;
  }function p(e, t, n) {
    if (ce.isFunction(t)) return ce.grep(e, function (e, r) {
      return !!t.call(e, r, e) !== n;
    });if (t.nodeType) return ce.grep(e, function (e) {
      return e === t !== n;
    });if ("string" == typeof t) {
      if ($e.test(t)) return ce.filter(t, e, n);t = ce.filter(t, e);
    }return ce.grep(e, function (e) {
      return ce.inArray(e, t) >= 0 !== n;
    });
  }function d(e) {
    var t = Ue.split("|"),
        n = e.createDocumentFragment();if (n.createElement) for (; t.length;) {
      n.createElement(t.pop());
    }return n;
  }function h(e, t) {
    return ce.nodeName(e, "table") && ce.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
  }function g(e) {
    return e.type = (null !== ce.find.attr(e, "type")) + "/" + e.type, e;
  }function m(e) {
    var t = it.exec(e.type);return t ? e.type = t[1] : e.removeAttribute("type"), e;
  }function y(e, t) {
    for (var n, r = 0; null != (n = e[r]); r++) {
      ce._data(n, "globalEval", !t || ce._data(t[r], "globalEval"));
    }
  }function v(e, t) {
    if (1 === t.nodeType && ce.hasData(e)) {
      var n,
          r,
          i,
          o = ce._data(e),
          a = ce._data(t, o),
          s = o.events;if (s) {
        delete a.handle, a.events = {};for (n in s) {
          for (r = 0, i = s[n].length; i > r; r++) {
            ce.event.add(t, n, s[n][r]);
          }
        }
      }a.data && (a.data = ce.extend({}, a.data));
    }
  }function b(e, t) {
    var n, r, i;if (1 === t.nodeType) {
      if (n = t.nodeName.toLowerCase(), !ce.support.noCloneEvent && t[ce.expando]) {
        i = ce._data(t);for (r in i.events) {
          ce.removeEvent(t, r, i.handle);
        }t.removeAttribute(ce.expando);
      }"script" === n && t.text !== e.text ? (g(t).text = e.text, m(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ce.support.html5Clone && e.innerHTML && !ce.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && tt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
    }
  }function x(e, n) {
    var r,
        i,
        o = 0,
        a = _typeof(e.getElementsByTagName) !== Y ? e.getElementsByTagName(n || "*") : _typeof(e.querySelectorAll) !== Y ? e.querySelectorAll(n || "*") : t;if (!a) for (a = [], r = e.childNodes || e; null != (i = r[o]); o++) {
      !n || ce.nodeName(i, n) ? a.push(i) : ce.merge(a, x(i, n));
    }return n === t || n && ce.nodeName(e, n) ? ce.merge([e], a) : a;
  }function w(e) {
    tt.test(e.type) && (e.defaultChecked = e.checked);
  }function T(e, t) {
    if (t in e) return t;for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = Nt.length; i--;) {
      if (t = Nt[i] + n, t in e) return t;
    }return r;
  }function C(e, t) {
    return e = t || e, "none" === ce.css(e, "display") || !ce.contains(e.ownerDocument, e);
  }function N(e, t) {
    for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++) {
      r = e[a], r.style && (o[a] = ce._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && C(r) && (o[a] = ce._data(r, "olddisplay", A(r.nodeName)))) : o[a] || (i = C(r), (n && "none" !== n || !i) && ce._data(r, "olddisplay", i ? n : ce.css(r, "display"))));
    }for (a = 0; s > a; a++) {
      r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
    }return e;
  }function k(e, t, n) {
    var r = yt.exec(t);return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
  }function E(e, t, n, r, i) {
    for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) {
      "margin" === n && (a += ce.css(e, n + Ct[o], !0, i)), r ? ("content" === n && (a -= ce.css(e, "padding" + Ct[o], !0, i)), "margin" !== n && (a -= ce.css(e, "border" + Ct[o] + "Width", !0, i))) : (a += ce.css(e, "padding" + Ct[o], !0, i), "padding" !== n && (a += ce.css(e, "border" + Ct[o] + "Width", !0, i)));
    }return a;
  }function S(e, t, n) {
    var r = !0,
        i = "width" === t ? e.offsetWidth : e.offsetHeight,
        o = ct(e),
        a = ce.support.boxSizing && "border-box" === ce.css(e, "boxSizing", !1, o);if (0 >= i || null == i) {
      if (i = ft(e, t, o), (0 > i || null == i) && (i = e.style[t]), vt.test(i)) return i;r = a && (ce.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0;
    }return i + E(e, t, n || (a ? "border" : "content"), r, o) + "px";
  }function A(e) {
    var t = G,
        n = xt[e];return n || (n = j(e, t), "none" !== n && n || (lt = (lt || ce("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (lt[0].contentWindow || lt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = j(e, t), lt.detach()), xt[e] = n), n;
  }function j(e, t) {
    var n = ce(t.createElement(e)).appendTo(t.body),
        r = ce.css(n[0], "display");return n.remove(), r;
  }function D(e, t, n, r) {
    var i;if (ce.isArray(t)) ce.each(t, function (t, i) {
      n || Et.test(e) ? r(e, i) : D(e + "[" + ("object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) ? t : "") + "]", i, n, r);
    });else if (n || "object" !== ce.type(t)) r(e, t);else for (i in t) {
      D(e + "[" + i + "]", t[i], n, r);
    }
  }function L(e) {
    return function (t, n) {
      "string" != typeof t && (n = t, t = "*");var r,
          i = 0,
          o = t.toLowerCase().match(pe) || [];if (ce.isFunction(n)) for (; r = o[i++];) {
        "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
      }
    };
  }function H(e, t, n, r) {
    function i(s) {
      var u;return o[s] = !0, ce.each(e[s] || [], function (e, s) {
        var l = s(t, n, r);return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1);
      }), u;
    }var o = {},
        a = e === It;return i(t.dataTypes[0]) || !o["*"] && i("*");
  }function q(e, n) {
    var r,
        i,
        o = ce.ajaxSettings.flatOptions || {};for (i in n) {
      n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
    }return r && ce.extend(!0, e, r), e;
  }function _(e, n, r) {
    for (var i, o, a, s, u = e.contents, l = e.dataTypes; "*" === l[0];) {
      l.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
    }if (o) for (s in u) {
      if (u[s] && u[s].test(o)) {
        l.unshift(s);break;
      }
    }if (l[0] in r) a = l[0];else {
      for (s in r) {
        if (!l[0] || e.converters[s + " " + l[0]]) {
          a = s;break;
        }i || (i = s);
      }a = a || i;
    }return a ? (a !== l[0] && l.unshift(a), r[a]) : void 0;
  }function M(e, t, n, r) {
    var i,
        o,
        a,
        s,
        u,
        l = {},
        c = e.dataTypes.slice();if (c[1]) for (a in e.converters) {
      l[a.toLowerCase()] = e.converters[a];
    }for (o = c.shift(); o;) {
      if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;else if ("*" !== u && u !== o) {
        if (a = l[u + " " + o] || l["* " + o], !a) for (i in l) {
          if (s = i.split(" "), s[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
            a === !0 ? a = l[i] : l[i] !== !0 && (o = s[0], c.unshift(s[1]));break;
          }
        }if (a !== !0) if (a && e["throws"]) t = a(t);else try {
          t = a(t);
        } catch (f) {
          return { state: "parsererror", error: a ? f : "No conversion from " + u + " to " + o };
        }
      }
    }return { state: "success", data: t };
  }function O() {
    try {
      return new e.XMLHttpRequest();
    } catch (t) {}
  }function F() {
    try {
      return new e.ActiveXObject("Microsoft.XMLHTTP");
    } catch (t) {}
  }function B() {
    return setTimeout(function () {
      Kt = t;
    }), Kt = ce.now();
  }function P(e, t, n) {
    for (var r, i = (on[t] || []).concat(on["*"]), o = 0, a = i.length; a > o; o++) {
      if (r = i[o].call(n, t, e)) return r;
    }
  }function R(e, t, n) {
    var r,
        i,
        o = 0,
        a = rn.length,
        s = ce.Deferred().always(function () {
      delete u.elem;
    }),
        u = function u() {
      if (i) return !1;for (var t = Kt || B(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; u > a; a++) {
        l.tweens[a].run(o);
      }return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1);
    },
        l = s.promise({ elem: e, props: ce.extend({}, t), opts: ce.extend(!0, { specialEasing: {} }, n), originalProperties: t, originalOptions: n, startTime: Kt || B(), duration: n.duration, tweens: [], createTween: function createTween(t, n) {
        var r = ce.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);return l.tweens.push(r), r;
      }, stop: function stop(t) {
        var n = 0,
            r = t ? l.tweens.length : 0;if (i) return this;for (i = !0; r > n; n++) {
          l.tweens[n].run(1);
        }return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this;
      } }),
        c = l.props;for (W(c, l.opts.specialEasing); a > o; o++) {
      if (r = rn[o].call(l, e, c, l.opts)) return r;
    }return ce.map(c, P, l), ce.isFunction(l.opts.start) && l.opts.start.call(e, l), ce.fx.timer(ce.extend(u, { elem: e, anim: l, queue: l.opts.queue })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always);
  }function W(e, t) {
    var n, r, i, o, a;for (n in e) {
      if (r = ce.camelCase(n), i = t[r], o = e[n], ce.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = ce.cssHooks[r], a && "expand" in a) {
        o = a.expand(o), delete e[r];for (n in o) {
          n in e || (e[n] = o[n], t[n] = i);
        }
      } else t[r] = i;
    }
  }function $(e, t, n) {
    var r,
        i,
        o,
        a,
        s,
        u,
        l = this,
        c = {},
        f = e.style,
        p = e.nodeType && C(e),
        d = ce._data(e, "fxshow");n.queue || (s = ce._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function () {
      s.unqueued || u();
    }), s.unqueued++, l.always(function () {
      l.always(function () {
        s.unqueued--, ce.queue(e, "fx").length || s.empty.fire();
      });
    })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], "inline" === ce.css(e, "display") && "none" === ce.css(e, "float") && (ce.support.inlineBlockNeedsLayout && "inline" !== A(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")), n.overflow && (f.overflow = "hidden", ce.support.shrinkWrapBlocks || l.always(function () {
      f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2];
    }));for (r in t) {
      if (i = t[r], en.exec(i)) {
        if (delete t[r], o = o || "toggle" === i, i === (p ? "hide" : "show")) continue;c[r] = d && d[r] || ce.style(e, r);
      }
    }if (!ce.isEmptyObject(c)) {
      d ? "hidden" in d && (p = d.hidden) : d = ce._data(e, "fxshow", {}), o && (d.hidden = !p), p ? ce(e).show() : l.done(function () {
        ce(e).hide();
      }), l.done(function () {
        var t;ce._removeData(e, "fxshow");for (t in c) {
          ce.style(e, t, c[t]);
        }
      });for (r in c) {
        a = P(p ? d[r] : 0, r, l), r in d || (d[r] = a.start, p && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0));
      }
    }
  }function I(e, t, n, r, i) {
    return new I.prototype.init(e, t, n, r, i);
  }function z(e, t) {
    var n,
        r = { height: e },
        i = 0;for (t = t ? 1 : 0; 4 > i; i += 2 - t) {
      n = Ct[i], r["margin" + n] = r["padding" + n] = e;
    }return t && (r.opacity = r.width = e), r;
  }function X(e) {
    return ce.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1;
  }var U,
      V,
      Y = typeof t === "undefined" ? "undefined" : _typeof(t),
      J = e.location,
      G = e.document,
      Q = G.documentElement,
      K = e.jQuery,
      Z = e.$,
      ee = {},
      te = [],
      ne = "1.10.2",
      re = te.concat,
      ie = te.push,
      oe = te.slice,
      ae = te.indexOf,
      se = ee.toString,
      ue = ee.hasOwnProperty,
      le = ne.trim,
      ce = function ce(e, t) {
    return new ce.fn.init(e, t, V);
  },
      fe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      pe = /\S+/g,
      de = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      he = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      ge = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      me = /^[\],:{}\s]*$/,
      ye = /(?:^|:|,)(?:\s*\[)+/g,
      ve = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
      be = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
      xe = /^-ms-/,
      we = /-([\da-z])/gi,
      Te = function Te(e, t) {
    return t.toUpperCase();
  },
      Ce = function Ce(e) {
    (G.addEventListener || "load" === e.type || "complete" === G.readyState) && (Ne(), ce.ready());
  },
      Ne = function Ne() {
    G.addEventListener ? (G.removeEventListener("DOMContentLoaded", Ce, !1), e.removeEventListener("load", Ce, !1)) : (G.detachEvent("onreadystatechange", Ce), e.detachEvent("onload", Ce));
  };ce.fn = ce.prototype = { jquery: ne, constructor: ce, init: function init(e, n, r) {
      var i, o;if (!e) return this;if ("string" == typeof e) {
        if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : he.exec(e), !i || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);if (i[1]) {
          if (n = n instanceof ce ? n[0] : n, ce.merge(this, ce.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : G, !0)), ge.test(i[1]) && ce.isPlainObject(n)) for (i in n) {
            ce.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
          }return this;
        }if (o = G.getElementById(i[2]), o && o.parentNode) {
          if (o.id !== i[2]) return r.find(e);this.length = 1, this[0] = o;
        }return this.context = G, this.selector = e, this;
      }return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ce.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), ce.makeArray(e, this));
    }, selector: "", length: 0, toArray: function toArray() {
      return oe.call(this);
    }, get: function get(e) {
      return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e];
    }, pushStack: function pushStack(e) {
      var t = ce.merge(this.constructor(), e);return t.prevObject = this, t.context = this.context, t;
    }, each: function each(e, t) {
      return ce.each(this, e, t);
    }, ready: function ready(e) {
      return ce.ready.promise().done(e), this;
    }, slice: function slice() {
      return this.pushStack(oe.apply(this, arguments));
    }, first: function first() {
      return this.eq(0);
    }, last: function last() {
      return this.eq(-1);
    }, eq: function eq(e) {
      var t = this.length,
          n = +e + (0 > e ? t : 0);return this.pushStack(n >= 0 && t > n ? [this[n]] : []);
    }, map: function map(e) {
      return this.pushStack(ce.map(this, function (t, n) {
        return e.call(t, n, t);
      }));
    }, end: function end() {
      return this.prevObject || this.constructor(null);
    }, push: ie, sort: [].sort, splice: [].splice }, ce.fn.init.prototype = ce.fn, ce.extend = ce.fn.extend = function () {
    var e,
        n,
        r,
        i,
        o,
        a,
        s = arguments[0] || {},
        u = 1,
        l = arguments.length,
        c = !1;for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, u = 2), "object" == (typeof s === "undefined" ? "undefined" : _typeof(s)) || ce.isFunction(s) || (s = {}), l === u && (s = this, --u); l > u; u++) {
      if (null != (o = arguments[u])) for (i in o) {
        e = s[i], r = o[i], s !== r && (c && r && (ce.isPlainObject(r) || (n = ce.isArray(r))) ? (n ? (n = !1, a = e && ce.isArray(e) ? e : []) : a = e && ce.isPlainObject(e) ? e : {}, s[i] = ce.extend(c, a, r)) : r !== t && (s[i] = r));
      }
    }return s;
  }, ce.extend({ expando: "jQuery" + (ne + Math.random()).replace(/\D/g, ""), noConflict: function noConflict(t) {
      return e.$ === ce && (e.$ = Z), t && e.jQuery === ce && (e.jQuery = K), ce;
    }, isReady: !1, readyWait: 1, holdReady: function holdReady(e) {
      e ? ce.readyWait++ : ce.ready(!0);
    }, ready: function ready(e) {
      if (e === !0 ? ! --ce.readyWait : !ce.isReady) {
        if (!G.body) return setTimeout(ce.ready);ce.isReady = !0, e !== !0 && --ce.readyWait > 0 || (U.resolveWith(G, [ce]), ce.fn.trigger && ce(G).trigger("ready").off("ready"));
      }
    }, isFunction: function isFunction(e) {
      return "function" === ce.type(e);
    }, isArray: Array.isArray || function (e) {
      return "array" === ce.type(e);
    }, isWindow: function isWindow(e) {
      return null != e && e == e.window;
    }, isNumeric: function isNumeric(e) {
      return !isNaN(parseFloat(e)) && isFinite(e);
    }, type: function type(e) {
      return null == e ? String(e) : "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "function" == typeof e ? ee[se.call(e)] || "object" : typeof e === "undefined" ? "undefined" : _typeof(e);
    }, isPlainObject: function isPlainObject(e) {
      var n;if (!e || "object" !== ce.type(e) || e.nodeType || ce.isWindow(e)) return !1;try {
        if (e.constructor && !ue.call(e, "constructor") && !ue.call(e.constructor.prototype, "isPrototypeOf")) return !1;
      } catch (r) {
        return !1;
      }if (ce.support.ownLast) for (n in e) {
        return ue.call(e, n);
      }for (n in e) {}return n === t || ue.call(e, n);
    }, isEmptyObject: function isEmptyObject(e) {
      var t;for (t in e) {
        return !1;
      }return !0;
    }, error: function error(e) {
      throw new Error(e);
    }, parseHTML: function parseHTML(e, t, n) {
      if (!e || "string" != typeof e) return null;"boolean" == typeof t && (n = t, t = !1), t = t || G;var r = ge.exec(e),
          i = !n && [];return r ? [t.createElement(r[1])] : (r = ce.buildFragment([e], t, i), i && ce(i).remove(), ce.merge([], r.childNodes));
    }, parseJSON: function parseJSON(t) {
      return e.JSON && e.JSON.parse ? e.JSON.parse(t) : null === t ? t : "string" == typeof t && (t = ce.trim(t), t && me.test(t.replace(ve, "@").replace(be, "]").replace(ye, ""))) ? new Function("return " + t)() : void ce.error("Invalid JSON: " + t);
    }, parseXML: function parseXML(n) {
      var r, i;if (!n || "string" != typeof n) return null;try {
        e.DOMParser ? (i = new DOMParser(), r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n));
      } catch (o) {
        r = t;
      }return r && r.documentElement && !r.getElementsByTagName("parsererror").length || ce.error("Invalid XML: " + n), r;
    }, noop: function noop() {}, globalEval: function globalEval(t) {
      t && ce.trim(t) && (e.execScript || function (t) {
        e.eval.call(e, t);
      })(t);
    }, camelCase: function camelCase(e) {
      return e.replace(xe, "ms-").replace(we, Te);
    }, nodeName: function nodeName(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
    }, each: function each(e, t, r) {
      var i,
          o = 0,
          a = e.length,
          s = n(e);if (r) {
        if (s) for (; a > o && (i = t.apply(e[o], r), i !== !1); o++) {} else for (o in e) {
          if (i = t.apply(e[o], r), i === !1) break;
        }
      } else if (s) for (; a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++) {} else for (o in e) {
        if (i = t.call(e[o], o, e[o]), i === !1) break;
      }return e;
    }, trim: le && !le.call("\uFEFF\xA0") ? function (e) {
      return null == e ? "" : le.call(e);
    } : function (e) {
      return null == e ? "" : (e + "").replace(de, "");
    }, makeArray: function makeArray(e, t) {
      var r = t || [];return null != e && (n(Object(e)) ? ce.merge(r, "string" == typeof e ? [e] : e) : ie.call(r, e)), r;
    }, inArray: function inArray(e, t, n) {
      var r;if (t) {
        if (ae) return ae.call(t, e, n);for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) {
          if (n in t && t[n] === e) return n;
        }
      }return -1;
    }, merge: function merge(e, n) {
      var r = n.length,
          i = e.length,
          o = 0;if ("number" == typeof r) for (; r > o; o++) {
        e[i++] = n[o];
      } else for (; n[o] !== t;) {
        e[i++] = n[o++];
      }return e.length = i, e;
    }, grep: function grep(e, t, n) {
      var r,
          i = [],
          o = 0,
          a = e.length;for (n = !!n; a > o; o++) {
        r = !!t(e[o], o), n !== r && i.push(e[o]);
      }return i;
    }, map: function map(e, t, r) {
      var i,
          o = 0,
          a = e.length,
          s = n(e),
          u = [];if (s) for (; a > o; o++) {
        i = t(e[o], o, r), null != i && (u[u.length] = i);
      } else for (o in e) {
        i = t(e[o], o, r), null != i && (u[u.length] = i);
      }return re.apply([], u);
    }, guid: 1, proxy: function proxy(e, n) {
      var r, i, o;return "string" == typeof n && (o = e[n], n = e, e = o), ce.isFunction(e) ? (r = oe.call(arguments, 2), i = function i() {
        return e.apply(n || this, r.concat(oe.call(arguments)));
      }, i.guid = e.guid = e.guid || ce.guid++, i) : t;
    }, access: function access(e, n, r, i, o, a, s) {
      var u = 0,
          l = e.length,
          c = null == r;if ("object" === ce.type(r)) {
        o = !0;for (u in r) {
          ce.access(e, n, u, r[u], !0, a, s);
        }
      } else if (i !== t && (o = !0, ce.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function n(e, t, _n) {
        return c.call(ce(e), _n);
      })), n)) for (; l > u; u++) {
        n(e[u], r, s ? i : i.call(e[u], u, n(e[u], r)));
      }return o ? e : c ? n.call(e) : l ? n(e[0], r) : a;
    }, now: function now() {
      return new Date().getTime();
    }, swap: function swap(e, t, n, r) {
      var i,
          o,
          a = {};for (o in t) {
        a[o] = e.style[o], e.style[o] = t[o];
      }i = n.apply(e, r || []);for (o in t) {
        e.style[o] = a[o];
      }return i;
    } }), ce.ready.promise = function (t) {
    if (!U) if (U = ce.Deferred(), "complete" === G.readyState) setTimeout(ce.ready);else if (G.addEventListener) G.addEventListener("DOMContentLoaded", Ce, !1), e.addEventListener("load", Ce, !1);else {
      G.attachEvent("onreadystatechange", Ce), e.attachEvent("onload", Ce);var n = !1;try {
        n = null == e.frameElement && G.documentElement;
      } catch (r) {}n && n.doScroll && !function i() {
        if (!ce.isReady) {
          try {
            n.doScroll("left");
          } catch (e) {
            return setTimeout(i, 50);
          }Ne(), ce.ready();
        }
      }();
    }return U.promise(t);
  }, ce.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
    ee["[object " + t + "]"] = t.toLowerCase();
  }), V = ce(G), function (e, t) {
    function n(e, t, n, r) {
      var i, o, a, s, u, l, c, f, h, g;if ((t ? t.ownerDocument || t : R) !== H && L(t), t = t || H, n = n || [], !e || "string" != typeof e) return n;if (1 !== (s = t.nodeType) && 9 !== s) return [];if (_ && !r) {
        if (i = be.exec(e)) if (a = i[1]) {
          if (9 === s) {
            if (o = t.getElementById(a), !o || !o.parentNode) return n;if (o.id === a) return n.push(o), n;
          } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && B(t, o) && o.id === a) return n.push(o), n;
        } else {
          if (i[2]) return ee.apply(n, t.getElementsByTagName(e)), n;if ((a = i[3]) && C.getElementsByClassName && t.getElementsByClassName) return ee.apply(n, t.getElementsByClassName(a)), n;
        }if (C.qsa && (!M || !M.test(e))) {
          if (f = c = P, h = t, g = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
            for (l = p(e), (c = t.getAttribute("id")) ? f = c.replace(Te, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", u = l.length; u--;) {
              l[u] = f + d(l[u]);
            }h = de.test(e) && t.parentNode || t, g = l.join(",");
          }if (g) try {
            return ee.apply(n, h.querySelectorAll(g)), n;
          } catch (m) {} finally {
            c || t.removeAttribute("id");
          }
        }
      }return w(e.replace(le, "$1"), t, n, r);
    }function r() {
      function e(n, r) {
        return t.push(n += " ") > k.cacheLength && delete e[t.shift()], e[n] = r;
      }var t = [];return e;
    }function i(e) {
      return e[P] = !0, e;
    }function o(e) {
      var t = H.createElement("div");try {
        return !!e(t);
      } catch (n) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null;
      }
    }function a(e, t) {
      for (var n = e.split("|"), r = e.length; r--;) {
        k.attrHandle[n[r]] = t;
      }
    }function s(e, t) {
      var n = t && e,
          r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || J) - (~e.sourceIndex || J);if (r) return r;if (n) for (; n = n.nextSibling;) {
        if (n === t) return -1;
      }return e ? 1 : -1;
    }function u(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();return "input" === n && t.type === e;
      };
    }function l(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();return ("input" === n || "button" === n) && t.type === e;
      };
    }function c(e) {
      return i(function (t) {
        return t = +t, i(function (n, r) {
          for (var i, o = e([], n.length, t), a = o.length; a--;) {
            n[i = o[a]] && (n[i] = !(r[i] = n[i]));
          }
        });
      });
    }function f() {}function p(e, t) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c = z[e + " "];if (c) return t ? 0 : c.slice(0);for (s = e, u = [], l = k.preFilter; s;) {
        (!r || (i = fe.exec(s))) && (i && (s = s.slice(i[0].length) || s), u.push(o = [])), r = !1, (i = pe.exec(s)) && (r = i.shift(), o.push({ value: r, type: i[0].replace(le, " ") }), s = s.slice(r.length));for (a in k.filter) {
          !(i = ye[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(), o.push({ value: r, type: a, matches: i }), s = s.slice(r.length));
        }if (!r) break;
      }return t ? s.length : s ? n.error(e) : z(e, u).slice(0);
    }function d(e) {
      for (var t = 0, n = e.length, r = ""; n > t; t++) {
        r += e[t].value;
      }return r;
    }function h(e, t, n) {
      var r = t.dir,
          i = n && "parentNode" === r,
          o = $++;return t.first ? function (t, n, o) {
        for (; t = t[r];) {
          if (1 === t.nodeType || i) return e(t, n, o);
        }
      } : function (t, n, a) {
        var s,
            u,
            l,
            c = W + " " + o;if (a) {
          for (; t = t[r];) {
            if ((1 === t.nodeType || i) && e(t, n, a)) return !0;
          }
        } else for (; t = t[r];) {
          if (1 === t.nodeType || i) if (l = t[P] || (t[P] = {}), (u = l[r]) && u[0] === c) {
            if ((s = u[1]) === !0 || s === N) return s === !0;
          } else if (u = l[r] = [c], u[1] = e(t, n, a) || N, u[1] === !0) return !0;
        }
      };
    }function g(e) {
      return e.length > 1 ? function (t, n, r) {
        for (var i = e.length; i--;) {
          if (!e[i](t, n, r)) return !1;
        }return !0;
      } : e[0];
    }function m(e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = null != t; u > s; s++) {
        (o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s));
      }return a;
    }function y(e, t, n, r, o, a) {
      return r && !r[P] && (r = y(r)), o && !o[P] && (o = y(o, a)), i(function (i, a, s, u) {
        var l,
            c,
            f,
            p = [],
            d = [],
            h = a.length,
            g = i || x(t || "*", s.nodeType ? [s] : s, []),
            y = !e || !i && t ? g : m(g, p, e, s, u),
            v = n ? o || (i ? e : h || r) ? [] : a : y;if (n && n(y, v, s, u), r) for (l = m(v, d), r(l, [], s, u), c = l.length; c--;) {
          (f = l[c]) && (v[d[c]] = !(y[d[c]] = f));
        }if (i) {
          if (o || e) {
            if (o) {
              for (l = [], c = v.length; c--;) {
                (f = v[c]) && l.push(y[c] = f);
              }o(null, v = [], l, u);
            }for (c = v.length; c--;) {
              (f = v[c]) && (l = o ? ne.call(i, f) : p[c]) > -1 && (i[l] = !(a[l] = f));
            }
          }
        } else v = m(v === a ? v.splice(h, v.length) : v), o ? o(null, a, v, u) : ee.apply(a, v);
      });
    }function v(e) {
      for (var t, n, r, i = e.length, o = k.relative[e[0].type], a = o || k.relative[" "], s = o ? 1 : 0, u = h(function (e) {
        return e === t;
      }, a, !0), l = h(function (e) {
        return ne.call(t, e) > -1;
      }, a, !0), c = [function (e, n, r) {
        return !o && (r || n !== j) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
      }]; i > s; s++) {
        if (n = k.relative[e[s].type]) c = [h(g(c), n)];else {
          if (n = k.filter[e[s].type].apply(null, e[s].matches), n[P]) {
            for (r = ++s; i > r && !k.relative[e[r].type]; r++) {}return y(s > 1 && g(c), s > 1 && d(e.slice(0, s - 1).concat({ value: " " === e[s - 2].type ? "*" : "" })).replace(le, "$1"), n, r > s && v(e.slice(s, r)), i > r && v(e = e.slice(r)), i > r && d(e));
          }c.push(n);
        }
      }return g(c);
    }function b(e, t) {
      var r = 0,
          o = t.length > 0,
          a = e.length > 0,
          s = function s(i, _s, u, l, c) {
        var f,
            p,
            d,
            h = [],
            g = 0,
            y = "0",
            v = i && [],
            b = null != c,
            x = j,
            w = i || a && k.find.TAG("*", c && _s.parentNode || _s),
            T = W += null == x ? 1 : Math.random() || .1;for (b && (j = _s !== H && _s, N = r); null != (f = w[y]); y++) {
          if (a && f) {
            for (p = 0; d = e[p++];) {
              if (d(f, _s, u)) {
                l.push(f);break;
              }
            }b && (W = T, N = ++r);
          }o && ((f = !d && f) && g--, i && v.push(f));
        }if (g += y, o && y !== g) {
          for (p = 0; d = t[p++];) {
            d(v, h, _s, u);
          }if (i) {
            if (g > 0) for (; y--;) {
              v[y] || h[y] || (h[y] = K.call(l));
            }h = m(h);
          }ee.apply(l, h), b && !i && h.length > 0 && g + t.length > 1 && n.uniqueSort(l);
        }return b && (W = T, j = x), v;
      };return o ? i(s) : s;
    }function x(e, t, r) {
      for (var i = 0, o = t.length; o > i; i++) {
        n(e, t[i], r);
      }return r;
    }function w(e, t, n, r) {
      var i,
          o,
          a,
          s,
          u,
          l = p(e);if (!r && 1 === l.length) {
        if (o = l[0] = l[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && C.getById && 9 === t.nodeType && _ && k.relative[o[1].type]) {
          if (t = (k.find.ID(a.matches[0].replace(Ce, Ne), t) || [])[0], !t) return n;e = e.slice(o.shift().value.length);
        }for (i = ye.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !k.relative[s = a.type]);) {
          if ((u = k.find[s]) && (r = u(a.matches[0].replace(Ce, Ne), de.test(o[0].type) && t.parentNode || t))) {
            if (o.splice(i, 1), e = r.length && d(o), !e) return ee.apply(n, r), n;break;
          }
        }
      }return A(e, l)(r, t, !_, n, de.test(e)), n;
    }var T,
        C,
        N,
        k,
        E,
        S,
        A,
        j,
        D,
        L,
        H,
        q,
        _,
        M,
        O,
        F,
        B,
        P = "sizzle" + -new Date(),
        R = e.document,
        W = 0,
        $ = 0,
        I = r(),
        z = r(),
        X = r(),
        U = !1,
        V = function V(e, t) {
      return e === t ? (U = !0, 0) : 0;
    },
        Y = typeof t === "undefined" ? "undefined" : _typeof(t),
        J = 1 << 31,
        G = {}.hasOwnProperty,
        Q = [],
        K = Q.pop,
        Z = Q.push,
        ee = Q.push,
        te = Q.slice,
        ne = Q.indexOf || function (e) {
      for (var t = 0, n = this.length; n > t; t++) {
        if (this[t] === e) return t;
      }return -1;
    },
        re = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        ie = "[\\x20\\t\\r\\n\\f]",
        oe = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        ae = oe.replace("w", "w#"),
        se = "\\[" + ie + "*(" + oe + ")" + ie + "*(?:([*^$|!~]?=)" + ie + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ae + ")|)|)" + ie + "*\\]",
        ue = ":(" + oe + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + se.replace(3, 8) + ")*)|.*)\\)|)",
        le = new RegExp("^" + ie + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ie + "+$", "g"),
        fe = new RegExp("^" + ie + "*," + ie + "*"),
        pe = new RegExp("^" + ie + "*([>+~]|" + ie + ")" + ie + "*"),
        de = new RegExp(ie + "*[+~]"),
        he = new RegExp("=" + ie + "*([^\\]'\"]*)" + ie + "*\\]", "g"),
        ge = new RegExp(ue),
        me = new RegExp("^" + ae + "$"),
        ye = { ID: new RegExp("^#(" + oe + ")"), CLASS: new RegExp("^\\.(" + oe + ")"), TAG: new RegExp("^(" + oe.replace("w", "w*") + ")"), ATTR: new RegExp("^" + se), PSEUDO: new RegExp("^" + ue), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ie + "*(even|odd|(([+-]|)(\\d*)n|)" + ie + "*(?:([+-]|)" + ie + "*(\\d+)|))" + ie + "*\\)|)", "i"), bool: new RegExp("^(?:" + re + ")$", "i"), needsContext: new RegExp("^" + ie + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ie + "*((?:-\\d)?\\d*)" + ie + "*\\)|)(?=[^-]|$)", "i") },
        ve = /^[^{]+\{\s*\[native \w/,
        be = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        xe = /^(?:input|select|textarea|button)$/i,
        we = /^h\d$/i,
        Te = /'|\\/g,
        Ce = new RegExp("\\\\([\\da-f]{1,6}" + ie + "?|(" + ie + ")|.)", "ig"),
        Ne = function Ne(e, t, n) {
      var r = "0x" + t - 65536;return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320);
    };try {
      ee.apply(Q = te.call(R.childNodes), R.childNodes), Q[R.childNodes.length].nodeType;
    } catch (ke) {
      ee = { apply: Q.length ? function (e, t) {
          Z.apply(e, te.call(t));
        } : function (e, t) {
          for (var n = e.length, r = 0; e[n++] = t[r++];) {}e.length = n - 1;
        } };
    }S = n.isXML = function (e) {
      var t = e && (e.ownerDocument || e).documentElement;return t ? "HTML" !== t.nodeName : !1;
    }, C = n.support = {}, L = n.setDocument = function (e) {
      var t = e ? e.ownerDocument || e : R,
          n = t.defaultView;return t !== H && 9 === t.nodeType && t.documentElement ? (H = t, q = t.documentElement, _ = !S(t), n && n.attachEvent && n !== n.top && n.attachEvent("onbeforeunload", function () {
        L();
      }), C.attributes = o(function (e) {
        return e.className = "i", !e.getAttribute("className");
      }), C.getElementsByTagName = o(function (e) {
        return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length;
      }), C.getElementsByClassName = o(function (e) {
        return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length;
      }), C.getById = o(function (e) {
        return q.appendChild(e).id = P, !t.getElementsByName || !t.getElementsByName(P).length;
      }), C.getById ? (k.find.ID = function (e, t) {
        if (_typeof(t.getElementById) !== Y && _) {
          var n = t.getElementById(e);return n && n.parentNode ? [n] : [];
        }
      }, k.filter.ID = function (e) {
        var t = e.replace(Ce, Ne);return function (e) {
          return e.getAttribute("id") === t;
        };
      }) : (delete k.find.ID, k.filter.ID = function (e) {
        var t = e.replace(Ce, Ne);return function (e) {
          var n = _typeof(e.getAttributeNode) !== Y && e.getAttributeNode("id");return n && n.value === t;
        };
      }), k.find.TAG = C.getElementsByTagName ? function (e, t) {
        return _typeof(t.getElementsByTagName) !== Y ? t.getElementsByTagName(e) : void 0;
      } : function (e, t) {
        var n,
            r = [],
            i = 0,
            o = t.getElementsByTagName(e);if ("*" === e) {
          for (; n = o[i++];) {
            1 === n.nodeType && r.push(n);
          }return r;
        }return o;
      }, k.find.CLASS = C.getElementsByClassName && function (e, t) {
        return _typeof(t.getElementsByClassName) !== Y && _ ? t.getElementsByClassName(e) : void 0;
      }, O = [], M = [], (C.qsa = ve.test(t.querySelectorAll)) && (o(function (e) {
        e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || M.push("\\[" + ie + "*(?:value|" + re + ")"), e.querySelectorAll(":checked").length || M.push(":checked");
      }), o(function (e) {
        var n = t.createElement("input");n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && M.push("[*^$]=" + ie + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || M.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), M.push(",.*:");
      })), (C.matchesSelector = ve.test(F = q.webkitMatchesSelector || q.mozMatchesSelector || q.oMatchesSelector || q.msMatchesSelector)) && o(function (e) {
        C.disconnectedMatch = F.call(e, "div"), F.call(e, "[s!='']:x"), O.push("!=", ue);
      }), M = M.length && new RegExp(M.join("|")), O = O.length && new RegExp(O.join("|")), B = ve.test(q.contains) || q.compareDocumentPosition ? function (e, t) {
        var n = 9 === e.nodeType ? e.documentElement : e,
            r = t && t.parentNode;return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
      } : function (e, t) {
        if (t) for (; t = t.parentNode;) {
          if (t === e) return !0;
        }return !1;
      }, V = q.compareDocumentPosition ? function (e, n) {
        if (e === n) return U = !0, 0;var r = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);return r ? 1 & r || !C.sortDetached && n.compareDocumentPosition(e) === r ? e === t || B(R, e) ? -1 : n === t || B(R, n) ? 1 : D ? ne.call(D, e) - ne.call(D, n) : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1;
      } : function (e, n) {
        var r,
            i = 0,
            o = e.parentNode,
            a = n.parentNode,
            u = [e],
            l = [n];if (e === n) return U = !0, 0;if (!o || !a) return e === t ? -1 : n === t ? 1 : o ? -1 : a ? 1 : D ? ne.call(D, e) - ne.call(D, n) : 0;if (o === a) return s(e, n);for (r = e; r = r.parentNode;) {
          u.unshift(r);
        }for (r = n; r = r.parentNode;) {
          l.unshift(r);
        }for (; u[i] === l[i];) {
          i++;
        }return i ? s(u[i], l[i]) : u[i] === R ? -1 : l[i] === R ? 1 : 0;
      }, t) : H;
    }, n.matches = function (e, t) {
      return n(e, null, null, t);
    }, n.matchesSelector = function (e, t) {
      if ((e.ownerDocument || e) !== H && L(e), t = t.replace(he, "='$1']"), C.matchesSelector && _ && (!O || !O.test(t)) && (!M || !M.test(t))) try {
        var r = F.call(e, t);if (r || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r;
      } catch (i) {}return n(t, H, null, [e]).length > 0;
    }, n.contains = function (e, t) {
      return (e.ownerDocument || e) !== H && L(e), B(e, t);
    }, n.attr = function (e, n) {
      (e.ownerDocument || e) !== H && L(e);var r = k.attrHandle[n.toLowerCase()],
          i = r && G.call(k.attrHandle, n.toLowerCase()) ? r(e, n, !_) : t;return i === t ? C.attributes || !_ ? e.getAttribute(n) : (i = e.getAttributeNode(n)) && i.specified ? i.value : null : i;
    }, n.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }, n.uniqueSort = function (e) {
      var t,
          n = [],
          r = 0,
          i = 0;if (U = !C.detectDuplicates, D = !C.sortStable && e.slice(0), e.sort(V), U) {
        for (; t = e[i++];) {
          t === e[i] && (r = n.push(i));
        }for (; r--;) {
          e.splice(n[r], 1);
        }
      }return e;
    }, E = n.getText = function (e) {
      var t,
          n = "",
          r = 0,
          i = e.nodeType;if (i) {
        if (1 === i || 9 === i || 11 === i) {
          if ("string" == typeof e.textContent) return e.textContent;for (e = e.firstChild; e; e = e.nextSibling) {
            n += E(e);
          }
        } else if (3 === i || 4 === i) return e.nodeValue;
      } else for (; t = e[r]; r++) {
        n += E(t);
      }return n;
    }, k = n.selectors = { cacheLength: 50, createPseudo: i, match: ye, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(e) {
          return e[1] = e[1].replace(Ce, Ne), e[3] = (e[4] || e[5] || "").replace(Ce, Ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
        }, CHILD: function CHILD(e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]), e;
        }, PSEUDO: function PSEUDO(e) {
          var n,
              r = !e[5] && e[2];return ye.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && ge.test(r) && (n = p(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), e[2] = r.slice(0, n)), e.slice(0, 3));
        } }, filter: { TAG: function TAG(e) {
          var t = e.replace(Ce, Ne).toLowerCase();return "*" === e ? function () {
            return !0;
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t;
          };
        }, CLASS: function CLASS(e) {
          var t = I[e + " "];return t || (t = new RegExp("(^|" + ie + ")" + e + "(" + ie + "|$)")) && I(e, function (e) {
            return t.test("string" == typeof e.className && e.className || _typeof(e.getAttribute) !== Y && e.getAttribute("class") || "");
          });
        }, ATTR: function ATTR(e, t, r) {
          return function (i) {
            var o = n.attr(i, e);return null == o ? "!=" === t : t ? (o += "", "=" === t ? o === r : "!=" === t ? o !== r : "^=" === t ? r && 0 === o.indexOf(r) : "*=" === t ? r && o.indexOf(r) > -1 : "$=" === t ? r && o.slice(-r.length) === r : "~=" === t ? (" " + o + " ").indexOf(r) > -1 : "|=" === t ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0;
          };
        }, CHILD: function CHILD(e, t, n, r, i) {
          var o = "nth" !== e.slice(0, 3),
              a = "last" !== e.slice(-4),
              s = "of-type" === t;
          return 1 === r && 0 === i ? function (e) {
            return !!e.parentNode;
          } : function (t, n, u) {
            var l,
                c,
                f,
                p,
                d,
                h,
                g = o !== a ? "nextSibling" : "previousSibling",
                m = t.parentNode,
                y = s && t.nodeName.toLowerCase(),
                v = !u && !s;if (m) {
              if (o) {
                for (; g;) {
                  for (f = t; f = f[g];) {
                    if (s ? f.nodeName.toLowerCase() === y : 1 === f.nodeType) return !1;
                  }h = g = "only" === e && !h && "nextSibling";
                }return !0;
              }if (h = [a ? m.firstChild : m.lastChild], a && v) {
                for (c = m[P] || (m[P] = {}), l = c[e] || [], d = l[0] === W && l[1], p = l[0] === W && l[2], f = d && m.childNodes[d]; f = ++d && f && f[g] || (p = d = 0) || h.pop();) {
                  if (1 === f.nodeType && ++p && f === t) {
                    c[e] = [W, d, p];break;
                  }
                }
              } else if (v && (l = (t[P] || (t[P] = {}))[e]) && l[0] === W) p = l[1];else for (; (f = ++d && f && f[g] || (p = d = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== y : 1 !== f.nodeType) || !++p || (v && ((f[P] || (f[P] = {}))[e] = [W, p]), f !== t));) {}return p -= i, p === r || p % r === 0 && p / r >= 0;
            }
          };
        }, PSEUDO: function PSEUDO(e, t) {
          var r,
              o = k.pseudos[e] || k.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);return o[P] ? o(t) : o.length > 1 ? (r = [e, e, "", t], k.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, n) {
            for (var r, i = o(e, t), a = i.length; a--;) {
              r = ne.call(e, i[a]), e[r] = !(n[r] = i[a]);
            }
          }) : function (e) {
            return o(e, 0, r);
          }) : o;
        } }, pseudos: { not: i(function (e) {
          var t = [],
              n = [],
              r = A(e.replace(le, "$1"));return r[P] ? i(function (e, t, n, i) {
            for (var o, a = r(e, null, i, []), s = e.length; s--;) {
              (o = a[s]) && (e[s] = !(t[s] = o));
            }
          }) : function (e, i, o) {
            return t[0] = e, r(t, null, o, n), !n.pop();
          };
        }), has: i(function (e) {
          return function (t) {
            return n(e, t).length > 0;
          };
        }), contains: i(function (e) {
          return function (t) {
            return (t.textContent || t.innerText || E(t)).indexOf(e) > -1;
          };
        }), lang: i(function (e) {
          return me.test(e || "") || n.error("unsupported lang: " + e), e = e.replace(Ce, Ne).toLowerCase(), function (t) {
            var n;do {
              if (n = _ ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
            } while ((t = t.parentNode) && 1 === t.nodeType);return !1;
          };
        }), target: function target(t) {
          var n = e.location && e.location.hash;return n && n.slice(1) === t.id;
        }, root: function root(e) {
          return e === q;
        }, focus: function focus(e) {
          return e === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
        }, enabled: function enabled(e) {
          return e.disabled === !1;
        }, disabled: function disabled(e) {
          return e.disabled === !0;
        }, checked: function checked(e) {
          var t = e.nodeName.toLowerCase();return "input" === t && !!e.checked || "option" === t && !!e.selected;
        }, selected: function selected(e) {
          return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
        }, empty: function empty(e) {
          for (e = e.firstChild; e; e = e.nextSibling) {
            if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
          }return !0;
        }, parent: function parent(e) {
          return !k.pseudos.empty(e);
        }, header: function header(e) {
          return we.test(e.nodeName);
        }, input: function input(e) {
          return xe.test(e.nodeName);
        }, button: function button(e) {
          var t = e.nodeName.toLowerCase();return "input" === t && "button" === e.type || "button" === t;
        }, text: function text(e) {
          var t;return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type);
        }, first: c(function () {
          return [0];
        }), last: c(function (e, t) {
          return [t - 1];
        }), eq: c(function (e, t, n) {
          return [0 > n ? n + t : n];
        }), even: c(function (e, t) {
          for (var n = 0; t > n; n += 2) {
            e.push(n);
          }return e;
        }), odd: c(function (e, t) {
          for (var n = 1; t > n; n += 2) {
            e.push(n);
          }return e;
        }), lt: c(function (e, t, n) {
          for (var r = 0 > n ? n + t : n; --r >= 0;) {
            e.push(r);
          }return e;
        }), gt: c(function (e, t, n) {
          for (var r = 0 > n ? n + t : n; ++r < t;) {
            e.push(r);
          }return e;
        }) } }, k.pseudos.nth = k.pseudos.eq;for (T in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
      k.pseudos[T] = u(T);
    }for (T in { submit: !0, reset: !0 }) {
      k.pseudos[T] = l(T);
    }f.prototype = k.filters = k.pseudos, k.setFilters = new f(), A = n.compile = function (e, t) {
      var n,
          r = [],
          i = [],
          o = X[e + " "];if (!o) {
        for (t || (t = p(e)), n = t.length; n--;) {
          o = v(t[n]), o[P] ? r.push(o) : i.push(o);
        }o = X(e, b(i, r));
      }return o;
    }, C.sortStable = P.split("").sort(V).join("") === P, C.detectDuplicates = U, L(), C.sortDetached = o(function (e) {
      return 1 & e.compareDocumentPosition(H.createElement("div"));
    }), o(function (e) {
      return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
    }) || a("type|href|height|width", function (e, t, n) {
      return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
    }), C.attributes && o(function (e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
    }) || a("value", function (e, t, n) {
      return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue;
    }), o(function (e) {
      return null == e.getAttribute("disabled");
    }) || a(re, function (e, t, n) {
      var r;return n ? void 0 : (r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === !0 ? t.toLowerCase() : null;
    }), ce.find = n, ce.expr = n.selectors, ce.expr[":"] = ce.expr.pseudos, ce.unique = n.uniqueSort, ce.text = n.getText, ce.isXMLDoc = n.isXML, ce.contains = n.contains;
  }(e);var ke = {};ce.Callbacks = function (e) {
    e = "string" == typeof e ? ke[e] || r(e) : ce.extend({}, e);var n,
        i,
        o,
        a,
        s,
        u,
        l = [],
        c = !e.once && [],
        f = function f(t) {
      for (i = e.memory && t, o = !0, s = u || 0, u = 0, a = l.length, n = !0; l && a > s; s++) {
        if (l[s].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
          i = !1;break;
        }
      }n = !1, l && (c ? c.length && f(c.shift()) : i ? l = [] : p.disable());
    },
        p = { add: function add() {
        if (l) {
          var t = l.length;!function r(t) {
            ce.each(t, function (t, n) {
              var i = ce.type(n);"function" === i ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== i && r(n);
            });
          }(arguments), n ? a = l.length : i && (u = t, f(i));
        }return this;
      }, remove: function remove() {
        return l && ce.each(arguments, function (e, t) {
          for (var r; (r = ce.inArray(t, l, r)) > -1;) {
            l.splice(r, 1), n && (a >= r && a--, s >= r && s--);
          }
        }), this;
      }, has: function has(e) {
        return e ? ce.inArray(e, l) > -1 : !(!l || !l.length);
      }, empty: function empty() {
        return l = [], a = 0, this;
      }, disable: function disable() {
        return l = c = i = t, this;
      }, disabled: function disabled() {
        return !l;
      }, lock: function lock() {
        return c = t, i || p.disable(), this;
      }, locked: function locked() {
        return !c;
      }, fireWith: function fireWith(e, t) {
        return !l || o && !c || (t = t || [], t = [e, t.slice ? t.slice() : t], n ? c.push(t) : f(t)), this;
      }, fire: function fire() {
        return p.fireWith(this, arguments), this;
      }, fired: function fired() {
        return !!o;
      } };return p;
  }, ce.extend({ Deferred: function Deferred(e) {
      var t = [["resolve", "done", ce.Callbacks("once memory"), "resolved"], ["reject", "fail", ce.Callbacks("once memory"), "rejected"], ["notify", "progress", ce.Callbacks("memory")]],
          n = "pending",
          r = { state: function state() {
          return n;
        }, always: function always() {
          return i.done(arguments).fail(arguments), this;
        }, then: function then() {
          var e = arguments;return ce.Deferred(function (n) {
            ce.each(t, function (t, o) {
              var a = o[0],
                  s = ce.isFunction(e[t]) && e[t];i[o[1]](function () {
                var e = s && s.apply(this, arguments);e && ce.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments);
              });
            }), e = null;
          }).promise();
        }, promise: function promise(e) {
          return null != e ? ce.extend(e, r) : r;
        } },
          i = {};return r.pipe = r.then, ce.each(t, function (e, o) {
        var a = o[2],
            s = o[3];r[o[1]] = a.add, s && a.add(function () {
          n = s;
        }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
          return i[o[0] + "With"](this === i ? r : this, arguments), this;
        }, i[o[0] + "With"] = a.fireWith;
      }), r.promise(i), e && e.call(i, i), i;
    }, when: function when(e) {
      var t,
          n,
          r,
          i = 0,
          o = oe.call(arguments),
          a = o.length,
          s = 1 !== a || e && ce.isFunction(e.promise) ? a : 0,
          u = 1 === s ? e : ce.Deferred(),
          l = function l(e, n, r) {
        return function (i) {
          n[e] = this, r[e] = arguments.length > 1 ? oe.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r);
        };
      };if (a > 1) for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++) {
        o[i] && ce.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --s;
      }return s || u.resolveWith(r, o), u.promise();
    } }), ce.support = function (t) {
    var n,
        r,
        i,
        o,
        a,
        s,
        u,
        l,
        c,
        f = G.createElement("div");if (f.setAttribute("className", "t"), f.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = f.getElementsByTagName("*") || [], r = f.getElementsByTagName("a")[0], !r || !r.style || !n.length) return t;o = G.createElement("select"), s = o.appendChild(G.createElement("option")), i = f.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== f.className, t.leadingWhitespace = 3 === f.firstChild.nodeType, t.tbody = !f.getElementsByTagName("tbody").length, t.htmlSerialize = !!f.getElementsByTagName("link").length, t.style = /top/.test(r.getAttribute("style")), t.hrefNormalized = "/a" === r.getAttribute("href"), t.opacity = /^0.5/.test(r.style.opacity), t.cssFloat = !!r.style.cssFloat, t.checkOn = !!i.value, t.optSelected = s.selected, t.enctype = !!G.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== G.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, i.checked = !0, t.noCloneChecked = i.cloneNode(!0).checked, o.disabled = !0, t.optDisabled = !s.disabled;try {
      delete f.test;
    } catch (p) {
      t.deleteExpando = !1;
    }i = G.createElement("input"), i.setAttribute("value", ""), t.input = "" === i.getAttribute("value"), i.value = "t", i.setAttribute("type", "radio"), t.radioValue = "t" === i.value, i.setAttribute("checked", "t"), i.setAttribute("name", "t"), a = G.createDocumentFragment(), a.appendChild(i), t.appendChecked = i.checked, t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, f.attachEvent && (f.attachEvent("onclick", function () {
      t.noCloneEvent = !1;
    }), f.cloneNode(!0).click());for (c in { submit: !0, change: !0, focusin: !0 }) {
      f.setAttribute(u = "on" + c, "t"), t[c + "Bubbles"] = u in e || f.attributes[u].expando === !1;
    }f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === f.style.backgroundClip;for (c in ce(t)) {
      break;
    }return t.ownLast = "0" !== c, ce(function () {
      var n,
          r,
          i,
          o = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
          a = G.getElementsByTagName("body")[0];a && (n = G.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(f), f.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = f.getElementsByTagName("td"), i[0].style.cssText = "padding:0;margin:0;border:0;display:none", l = 0 === i[0].offsetHeight, i[0].style.display = "", i[1].style.display = "none", t.reliableHiddenOffsets = l && 0 === i[0].offsetHeight, f.innerHTML = "", f.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", ce.swap(a, null != a.style.zoom ? { zoom: 1 } : {}, function () {
        t.boxSizing = 4 === f.offsetWidth;
      }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(f, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(f, null) || { width: "4px" }).width, r = f.appendChild(G.createElement("div")), r.style.cssText = f.style.cssText = o, r.style.marginRight = r.style.width = "0", f.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), _typeof(f.style.zoom) !== Y && (f.innerHTML = "", f.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === f.offsetWidth, f.style.display = "block", f.innerHTML = "<div></div>", f.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== f.offsetWidth, t.inlineBlockNeedsLayout && (a.style.zoom = 1)), a.removeChild(n), n = f = i = r = null);
    }), n = o = a = s = r = i = null, t;
  }({});var Ee = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
      Se = /([A-Z])/g;ce.extend({ cache: {}, noData: { applet: !0, embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" }, hasData: function hasData(e) {
      return e = e.nodeType ? ce.cache[e[ce.expando]] : e[ce.expando], !!e && !s(e);
    }, data: function data(e, t, n) {
      return i(e, t, n);
    }, removeData: function removeData(e, t) {
      return o(e, t);
    }, _data: function _data(e, t, n) {
      return i(e, t, n, !0);
    }, _removeData: function _removeData(e, t) {
      return o(e, t, !0);
    }, acceptData: function acceptData(e) {
      if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;var t = e.nodeName && ce.noData[e.nodeName.toLowerCase()];return !t || t !== !0 && e.getAttribute("classid") === t;
    } }), ce.fn.extend({ data: function data(e, n) {
      var r,
          i,
          o = null,
          s = 0,
          u = this[0];if (e === t) {
        if (this.length && (o = ce.data(u), 1 === u.nodeType && !ce._data(u, "parsedAttrs"))) {
          for (r = u.attributes; s < r.length; s++) {
            i = r[s].name, 0 === i.indexOf("data-") && (i = ce.camelCase(i.slice(5)), a(u, i, o[i]));
          }ce._data(u, "parsedAttrs", !0);
        }return o;
      }return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? this.each(function () {
        ce.data(this, e);
      }) : arguments.length > 1 ? this.each(function () {
        ce.data(this, e, n);
      }) : u ? a(u, e, ce.data(u, e)) : null;
    }, removeData: function removeData(e) {
      return this.each(function () {
        ce.removeData(this, e);
      });
    } }), ce.extend({ queue: function queue(e, t, n) {
      var r;return e ? (t = (t || "fx") + "queue", r = ce._data(e, t), n && (!r || ce.isArray(n) ? r = ce._data(e, t, ce.makeArray(n)) : r.push(n)), r || []) : void 0;
    }, dequeue: function dequeue(e, t) {
      t = t || "fx";var n = ce.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = ce._queueHooks(e, t),
          a = function a() {
        ce.dequeue(e, t);
      };"inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire();
    }, _queueHooks: function _queueHooks(e, t) {
      var n = t + "queueHooks";return ce._data(e, n) || ce._data(e, n, { empty: ce.Callbacks("once memory").add(function () {
          ce._removeData(e, t + "queue"), ce._removeData(e, n);
        }) });
    } }), ce.fn.extend({ queue: function queue(e, n) {
      var r = 2;return "string" != typeof e && (n = e, e = "fx", r--), arguments.length < r ? ce.queue(this[0], e) : n === t ? this : this.each(function () {
        var t = ce.queue(this, e, n);ce._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && ce.dequeue(this, e);
      });
    }, dequeue: function dequeue(e) {
      return this.each(function () {
        ce.dequeue(this, e);
      });
    }, delay: function delay(e, t) {
      return e = ce.fx ? ce.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
        var r = setTimeout(t, e);n.stop = function () {
          clearTimeout(r);
        };
      });
    }, clearQueue: function clearQueue(e) {
      return this.queue(e || "fx", []);
    }, promise: function promise(e, n) {
      var r,
          i = 1,
          o = ce.Deferred(),
          a = this,
          s = this.length,
          u = function u() {
        --i || o.resolveWith(a, [a]);
      };for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--;) {
        r = ce._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(u));
      }return u(), o.promise(n);
    } });var Ae,
      je,
      De = /[\t\r\n\f]/g,
      Le = /\r/g,
      He = /^(?:input|select|textarea|button|object)$/i,
      qe = /^(?:a|area)$/i,
      _e = /^(?:checked|selected)$/i,
      Me = ce.support.getSetAttribute,
      Oe = ce.support.input;ce.fn.extend({ attr: function attr(e, t) {
      return ce.access(this, ce.attr, e, t, arguments.length > 1);
    }, removeAttr: function removeAttr(e) {
      return this.each(function () {
        ce.removeAttr(this, e);
      });
    }, prop: function prop(e, t) {
      return ce.access(this, ce.prop, e, t, arguments.length > 1);
    }, removeProp: function removeProp(e) {
      return e = ce.propFix[e] || e, this.each(function () {
        try {
          this[e] = t, delete this[e];
        } catch (n) {}
      });
    }, addClass: function addClass(e) {
      var t,
          n,
          r,
          i,
          o,
          a = 0,
          s = this.length,
          u = "string" == typeof e && e;if (ce.isFunction(e)) return this.each(function (t) {
        ce(this).addClass(e.call(this, t, this.className));
      });if (u) for (t = (e || "").match(pe) || []; s > a; a++) {
        if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(De, " ") : " ")) {
          for (o = 0; i = t[o++];) {
            r.indexOf(" " + i + " ") < 0 && (r += i + " ");
          }n.className = ce.trim(r);
        }
      }return this;
    }, removeClass: function removeClass(e) {
      var t,
          n,
          r,
          i,
          o,
          a = 0,
          s = this.length,
          u = 0 === arguments.length || "string" == typeof e && e;if (ce.isFunction(e)) return this.each(function (t) {
        ce(this).removeClass(e.call(this, t, this.className));
      });if (u) for (t = (e || "").match(pe) || []; s > a; a++) {
        if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(De, " ") : "")) {
          for (o = 0; i = t[o++];) {
            for (; r.indexOf(" " + i + " ") >= 0;) {
              r = r.replace(" " + i + " ", " ");
            }
          }n.className = e ? ce.trim(r) : "";
        }
      }return this;
    }, toggleClass: function toggleClass(e, t) {
      var n = typeof e === "undefined" ? "undefined" : _typeof(e);return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : ce.isFunction(e) ? this.each(function (n) {
        ce(this).toggleClass(e.call(this, n, this.className, t), t);
      }) : this.each(function () {
        if ("string" === n) for (var t, r = 0, i = ce(this), o = e.match(pe) || []; t = o[r++];) {
          i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
        } else (n === Y || "boolean" === n) && (this.className && ce._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ce._data(this, "__className__") || "");
      });
    }, hasClass: function hasClass(e) {
      for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++) {
        if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(De, " ").indexOf(t) >= 0) return !0;
      }return !1;
    }, val: function val(e) {
      var n,
          r,
          i,
          o = this[0];{
        if (arguments.length) return i = ce.isFunction(e), this.each(function (n) {
          var o;1 === this.nodeType && (o = i ? e.call(this, n, ce(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : ce.isArray(o) && (o = ce.map(o, function (e) {
            return null == e ? "" : e + "";
          })), r = ce.valHooks[this.type] || ce.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, o, "value") !== t || (this.value = o));
        });if (o) return r = ce.valHooks[o.type] || ce.valHooks[o.nodeName.toLowerCase()], r && "get" in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(Le, "") : null == n ? "" : n);
      }
    } }), ce.extend({ valHooks: { option: { get: function get(e) {
          var t = ce.find.attr(e, "value");return null != t ? t : e.text;
        } }, select: { get: function get(e) {
          for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++) {
            if (n = r[u], (n.selected || u === i) && (ce.support.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !ce.nodeName(n.parentNode, "optgroup"))) {
              if (t = ce(n).val(), o) return t;a.push(t);
            }
          }return a;
        }, set: function set(e, t) {
          for (var n, r, i = e.options, o = ce.makeArray(t), a = i.length; a--;) {
            r = i[a], (r.selected = ce.inArray(ce(r).val(), o) >= 0) && (n = !0);
          }return n || (e.selectedIndex = -1), o;
        } } }, attr: function attr(e, n, r) {
      var i,
          o,
          a = e.nodeType;if (e && 3 !== a && 8 !== a && 2 !== a) return _typeof(e.getAttribute) === Y ? ce.prop(e, n, r) : (1 === a && ce.isXMLDoc(e) || (n = n.toLowerCase(), i = ce.attrHooks[n] || (ce.expr.match.bool.test(n) ? je : Ae)), r === t ? i && "get" in i && null !== (o = i.get(e, n)) ? o : (o = ce.find.attr(e, n), null == o ? t : o) : null !== r ? i && "set" in i && (o = i.set(e, r, n)) !== t ? o : (e.setAttribute(n, r + ""), r) : void ce.removeAttr(e, n));
    }, removeAttr: function removeAttr(e, t) {
      var n,
          r,
          i = 0,
          o = t && t.match(pe);if (o && 1 === e.nodeType) for (; n = o[i++];) {
        r = ce.propFix[n] || n, ce.expr.match.bool.test(n) ? Oe && Me || !_e.test(n) ? e[r] = !1 : e[ce.camelCase("default-" + n)] = e[r] = !1 : ce.attr(e, n, ""), e.removeAttribute(Me ? n : r);
      }
    }, attrHooks: { type: { set: function set(e, t) {
          if (!ce.support.radioValue && "radio" === t && ce.nodeName(e, "input")) {
            var n = e.value;return e.setAttribute("type", t), n && (e.value = n), t;
          }
        } } }, propFix: { "for": "htmlFor", "class": "className" }, prop: function prop(e, n, r) {
      var i,
          o,
          a,
          s = e.nodeType;if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !ce.isXMLDoc(e), a && (n = ce.propFix[n] || n, o = ce.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n];
    }, propHooks: { tabIndex: { get: function get(e) {
          var t = ce.find.attr(e, "tabindex");return t ? parseInt(t, 10) : He.test(e.nodeName) || qe.test(e.nodeName) && e.href ? 0 : -1;
        } } } }), je = { set: function set(e, t, n) {
      return t === !1 ? ce.removeAttr(e, n) : Oe && Me || !_e.test(n) ? e.setAttribute(!Me && ce.propFix[n] || n, n) : e[ce.camelCase("default-" + n)] = e[n] = !0, n;
    } }, ce.each(ce.expr.match.bool.source.match(/\w+/g), function (e, n) {
    var r = ce.expr.attrHandle[n] || ce.find.attr;ce.expr.attrHandle[n] = Oe && Me || !_e.test(n) ? function (e, n, i) {
      var o = ce.expr.attrHandle[n],
          a = i ? t : (ce.expr.attrHandle[n] = t) != r(e, n, i) ? n.toLowerCase() : null;return ce.expr.attrHandle[n] = o, a;
    } : function (e, n, r) {
      return r ? t : e[ce.camelCase("default-" + n)] ? n.toLowerCase() : null;
    };
  }), Oe && Me || (ce.attrHooks.value = { set: function set(e, t, n) {
      return ce.nodeName(e, "input") ? void (e.defaultValue = t) : Ae && Ae.set(e, t, n);
    } }), Me || (Ae = { set: function set(e, n, r) {
      var i = e.getAttributeNode(r);return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t;
    } }, ce.expr.attrHandle.id = ce.expr.attrHandle.name = ce.expr.attrHandle.coords = function (e, n, r) {
    var i;return r ? t : (i = e.getAttributeNode(n)) && "" !== i.value ? i.value : null;
  }, ce.valHooks.button = { get: function get(e, n) {
      var r = e.getAttributeNode(n);return r && r.specified ? r.value : t;
    }, set: Ae.set }, ce.attrHooks.contenteditable = { set: function set(e, t, n) {
      Ae.set(e, "" === t ? !1 : t, n);
    } }, ce.each(["width", "height"], function (e, t) {
    ce.attrHooks[t] = { set: function set(e, n) {
        return "" === n ? (e.setAttribute(t, "auto"), n) : void 0;
      } };
  })), ce.support.hrefNormalized || ce.each(["href", "src"], function (e, t) {
    ce.propHooks[t] = { get: function get(e) {
        return e.getAttribute(t, 4);
      } };
  }), ce.support.style || (ce.attrHooks.style = { get: function get(e) {
      return e.style.cssText || t;
    }, set: function set(e, t) {
      return e.style.cssText = t + "";
    } }), ce.support.optSelected || (ce.propHooks.selected = { get: function get(e) {
      var t = e.parentNode;return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
    } }), ce.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    ce.propFix[this.toLowerCase()] = this;
  }), ce.support.enctype || (ce.propFix.enctype = "encoding"), ce.each(["radio", "checkbox"], function () {
    ce.valHooks[this] = { set: function set(e, t) {
        return ce.isArray(t) ? e.checked = ce.inArray(ce(e).val(), t) >= 0 : void 0;
      } }, ce.support.checkOn || (ce.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value;
    });
  });var Fe = /^(?:input|select|textarea)$/i,
      Be = /^key/,
      Pe = /^(?:mouse|contextmenu)|click/,
      Re = /^(?:focusinfocus|focusoutblur)$/,
      We = /^([^.]*)(?:\.(.+)|)$/;ce.event = { global: {}, add: function add(e, n, r, i, o) {
      var a,
          s,
          u,
          l,
          c,
          f,
          p,
          d,
          h,
          g,
          m,
          y = ce._data(e);if (y) {
        for (r.handler && (l = r, r = l.handler, o = l.selector), r.guid || (r.guid = ce.guid++), (s = y.events) || (s = y.events = {}), (f = y.handle) || (f = y.handle = function (e) {
          return (typeof ce === "undefined" ? "undefined" : _typeof(ce)) === Y || e && ce.event.triggered === e.type ? t : ce.event.dispatch.apply(f.elem, arguments);
        }, f.elem = e), n = (n || "").match(pe) || [""], u = n.length; u--;) {
          a = We.exec(n[u]) || [], h = m = a[1], g = (a[2] || "").split(".").sort(), h && (c = ce.event.special[h] || {}, h = (o ? c.delegateType : c.bindType) || h, c = ce.event.special[h] || {}, p = ce.extend({ type: h, origType: m, data: i, handler: r, guid: r.guid, selector: o, needsContext: o && ce.expr.match.needsContext.test(o), namespace: g.join(".") }, l), (d = s[h]) || (d = s[h] = [], d.delegateCount = 0, c.setup && c.setup.call(e, i, g, f) !== !1 || (e.addEventListener ? e.addEventListener(h, f, !1) : e.attachEvent && e.attachEvent("on" + h, f))), c.add && (c.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), o ? d.splice(d.delegateCount++, 0, p) : d.push(p), ce.event.global[h] = !0);
        }e = null;
      }
    }, remove: function remove(e, t, n, r, i) {
      var o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          d,
          h,
          g,
          m = ce.hasData(e) && ce._data(e);if (m && (c = m.events)) {
        for (t = (t || "").match(pe) || [""], l = t.length; l--;) {
          if (s = We.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
            for (f = ce.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = c[d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = p.length; o--;) {
              a = p[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, f.remove && f.remove.call(e, a));
            }u && !p.length && (f.teardown && f.teardown.call(e, h, m.handle) !== !1 || ce.removeEvent(e, d, m.handle), delete c[d]);
          } else for (d in c) {
            ce.event.remove(e, d + t[l], n, r, !0);
          }
        }ce.isEmptyObject(c) && (delete m.handle, ce._removeData(e, "events"));
      }
    }, trigger: function trigger(n, r, i, o) {
      var a,
          s,
          u,
          l,
          c,
          f,
          p,
          d = [i || G],
          h = ue.call(n, "type") ? n.type : n,
          g = ue.call(n, "namespace") ? n.namespace.split(".") : [];if (u = f = i = i || G, 3 !== i.nodeType && 8 !== i.nodeType && !Re.test(h + ce.event.triggered) && (h.indexOf(".") >= 0 && (g = h.split("."), h = g.shift(), g.sort()), s = h.indexOf(":") < 0 && "on" + h, n = n[ce.expando] ? n : new ce.Event(h, "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && n), n.isTrigger = o ? 2 : 3, n.namespace = g.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : ce.makeArray(r, [n]), c = ce.event.special[h] || {}, o || !c.trigger || c.trigger.apply(i, r) !== !1)) {
        if (!o && !c.noBubble && !ce.isWindow(i)) {
          for (l = c.delegateType || h, Re.test(l + h) || (u = u.parentNode); u; u = u.parentNode) {
            d.push(u), f = u;
          }f === (i.ownerDocument || G) && d.push(f.defaultView || f.parentWindow || e);
        }for (p = 0; (u = d[p++]) && !n.isPropagationStopped();) {
          n.type = p > 1 ? l : c.bindType || h, a = (ce._data(u, "events") || {})[n.type] && ce._data(u, "handle"), a && a.apply(u, r), a = s && u[s], a && ce.acceptData(u) && a.apply && a.apply(u, r) === !1 && n.preventDefault();
        }if (n.type = h, !o && !n.isDefaultPrevented() && (!c._default || c._default.apply(d.pop(), r) === !1) && ce.acceptData(i) && s && i[h] && !ce.isWindow(i)) {
          f = i[s], f && (i[s] = null), ce.event.triggered = h;try {
            i[h]();
          } catch (m) {}ce.event.triggered = t, f && (i[s] = f);
        }return n.result;
      }
    }, dispatch: function dispatch(e) {
      e = ce.event.fix(e);var n,
          r,
          i,
          o,
          a,
          s = [],
          u = oe.call(arguments),
          l = (ce._data(this, "events") || {})[e.type] || [],
          c = ce.event.special[e.type] || {};if (u[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
        for (s = ce.event.handlers.call(this, e, l), n = 0; (o = s[n++]) && !e.isPropagationStopped();) {
          for (e.currentTarget = o.elem, a = 0; (i = o.handlers[a++]) && !e.isImmediatePropagationStopped();) {
            (!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((ce.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, u), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
          }
        }return c.postDispatch && c.postDispatch.call(this, e), e.result;
      }
    }, handlers: function handlers(e, n) {
      var r,
          i,
          o,
          a,
          s = [],
          u = n.delegateCount,
          l = e.target;if (u && l.nodeType && (!e.button || "click" !== e.type)) for (; l != this; l = l.parentNode || this) {
        if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
          for (o = [], a = 0; u > a; a++) {
            i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? ce(r, this).index(l) >= 0 : ce.find(r, this, null, [l]).length), o[r] && o.push(i);
          }o.length && s.push({ elem: l, handlers: o });
        }
      }return u < n.length && s.push({ elem: this, handlers: n.slice(u) }), s;
    }, fix: function fix(e) {
      if (e[ce.expando]) return e;var t,
          n,
          r,
          i = e.type,
          o = e,
          a = this.fixHooks[i];for (a || (this.fixHooks[i] = a = Pe.test(i) ? this.mouseHooks : Be.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new ce.Event(o), t = r.length; t--;) {
        n = r[t], e[n] = o[n];
      }return e.target || (e.target = o.srcElement || G), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e;
    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function filter(e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e;
      } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function filter(e, n) {
        var r,
            i,
            o,
            a = n.button,
            s = n.fromElement;return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || G, o = i.documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement : s), e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e;
      } }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
          if (this !== c() && this.focus) try {
            return this.focus(), !1;
          } catch (e) {}
        }, delegateType: "focusin" }, blur: { trigger: function trigger() {
          return this === c() && this.blur ? (this.blur(), !1) : void 0;
        }, delegateType: "focusout" }, click: { trigger: function trigger() {
          return ce.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0;
        }, _default: function _default(e) {
          return ce.nodeName(e.target, "a");
        } }, beforeunload: { postDispatch: function postDispatch(e) {
          e.result !== t && (e.originalEvent.returnValue = e.result);
        } } }, simulate: function simulate(e, t, n, r) {
      var i = ce.extend(new ce.Event(), n, { type: e, isSimulated: !0, originalEvent: {} });r ? ce.event.trigger(i, null, t) : ce.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
    } }, ce.removeEvent = G.removeEventListener ? function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n, !1);
  } : function (e, t, n) {
    var r = "on" + t;e.detachEvent && (_typeof(e[r]) === Y && (e[r] = null), e.detachEvent(r, n));
  }, ce.Event = function (e, t) {
    return this instanceof ce.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? u : l) : this.type = e, t && ce.extend(this, t), this.timeStamp = e && e.timeStamp || ce.now(), void (this[ce.expando] = !0)) : new ce.Event(e, t);
  }, ce.Event.prototype = { isDefaultPrevented: l, isPropagationStopped: l, isImmediatePropagationStopped: l, preventDefault: function preventDefault() {
      var e = this.originalEvent;this.isDefaultPrevented = u, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
    }, stopPropagation: function stopPropagation() {
      var e = this.originalEvent;this.isPropagationStopped = u, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0);
    }, stopImmediatePropagation: function stopImmediatePropagation() {
      this.isImmediatePropagationStopped = u, this.stopPropagation();
    } }, ce.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (e, t) {
    ce.event.special[e] = { delegateType: t, bindType: t, handle: function handle(e) {
        var n,
            r = this,
            i = e.relatedTarget,
            o = e.handleObj;return (!i || i !== r && !ce.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n;
      } };
  }), ce.support.submitBubbles || (ce.event.special.submit = { setup: function setup() {
      return ce.nodeName(this, "form") ? !1 : void ce.event.add(this, "click._submit keypress._submit", function (e) {
        var n = e.target,
            r = ce.nodeName(n, "input") || ce.nodeName(n, "button") ? n.form : t;r && !ce._data(r, "submitBubbles") && (ce.event.add(r, "submit._submit", function (e) {
          e._submit_bubble = !0;
        }), ce._data(r, "submitBubbles", !0));
      });
    }, postDispatch: function postDispatch(e) {
      e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ce.event.simulate("submit", this.parentNode, e, !0));
    }, teardown: function teardown() {
      return ce.nodeName(this, "form") ? !1 : void ce.event.remove(this, "._submit");
    } }), ce.support.changeBubbles || (ce.event.special.change = { setup: function setup() {
      return Fe.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ce.event.add(this, "propertychange._change", function (e) {
        "checked" === e.originalEvent.propertyName && (this._just_changed = !0);
      }), ce.event.add(this, "click._change", function (e) {
        this._just_changed && !e.isTrigger && (this._just_changed = !1), ce.event.simulate("change", this, e, !0);
      })), !1) : void ce.event.add(this, "beforeactivate._change", function (e) {
        var t = e.target;Fe.test(t.nodeName) && !ce._data(t, "changeBubbles") && (ce.event.add(t, "change._change", function (e) {
          !this.parentNode || e.isSimulated || e.isTrigger || ce.event.simulate("change", this.parentNode, e, !0);
        }), ce._data(t, "changeBubbles", !0));
      });
    }, handle: function handle(e) {
      var t = e.target;return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0;
    }, teardown: function teardown() {
      return ce.event.remove(this, "._change"), !Fe.test(this.nodeName);
    } }), ce.support.focusinBubbles || ce.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
    var n = 0,
        r = function r(e) {
      ce.event.simulate(t, e.target, ce.event.fix(e), !0);
    };ce.event.special[t] = { setup: function setup() {
        0 === n++ && G.addEventListener(e, r, !0);
      }, teardown: function teardown() {
        0 === --n && G.removeEventListener(e, r, !0);
      } };
  }), ce.fn.extend({ on: function on(e, n, r, i, o) {
      var a, s;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
        "string" != typeof n && (r = r || n, n = t);for (a in e) {
          this.on(a, n, r, e[a], o);
        }return this;
      }if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = l;else if (!i) return this;return 1 === o && (s = i, i = function i(e) {
        return ce().off(e), s.apply(this, arguments);
      }, i.guid = s.guid || (s.guid = ce.guid++)), this.each(function () {
        ce.event.add(this, e, i, r, n);
      });
    }, one: function one(e, t, n, r) {
      return this.on(e, t, n, r, 1);
    }, off: function off(e, n, r) {
      var i, o;if (e && e.preventDefault && e.handleObj) return i = e.handleObj, ce(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
        for (o in e) {
          this.off(o, n, e[o]);
        }return this;
      }return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = l), this.each(function () {
        ce.event.remove(this, e, r, n);
      });
    }, trigger: function trigger(e, t) {
      return this.each(function () {
        ce.event.trigger(e, t, this);
      });
    }, triggerHandler: function triggerHandler(e, t) {
      var n = this[0];return n ? ce.event.trigger(e, t, n, !0) : void 0;
    } });var $e = /^.[^:#\[\.,]*$/,
      Ie = /^(?:parents|prev(?:Until|All))/,
      ze = ce.expr.match.needsContext,
      Xe = { children: !0, contents: !0, next: !0, prev: !0 };ce.fn.extend({ find: function find(e) {
      var t,
          n = [],
          r = this,
          i = r.length;if ("string" != typeof e) return this.pushStack(ce(e).filter(function () {
        for (t = 0; i > t; t++) {
          if (ce.contains(r[t], this)) return !0;
        }
      }));for (t = 0; i > t; t++) {
        ce.find(e, r[t], n);
      }return n = this.pushStack(i > 1 ? ce.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n;
    }, has: function has(e) {
      var t,
          n = ce(e, this),
          r = n.length;return this.filter(function () {
        for (t = 0; r > t; t++) {
          if (ce.contains(this, n[t])) return !0;
        }
      });
    }, not: function not(e) {
      return this.pushStack(p(this, e || [], !0));
    }, filter: function filter(e) {
      return this.pushStack(p(this, e || [], !1));
    }, is: function is(e) {
      return !!p(this, "string" == typeof e && ze.test(e) ? ce(e) : e || [], !1).length;
    }, closest: function closest(e, t) {
      for (var n, r = 0, i = this.length, o = [], a = ze.test(e) || "string" != typeof e ? ce(e, t || this.context) : 0; i > r; r++) {
        for (n = this[r]; n && n !== t; n = n.parentNode) {
          if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && ce.find.matchesSelector(n, e))) {
            n = o.push(n);break;
          }
        }
      }return this.pushStack(o.length > 1 ? ce.unique(o) : o);
    }, index: function index(e) {
      return e ? "string" == typeof e ? ce.inArray(this[0], ce(e)) : ce.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    }, add: function add(e, t) {
      var n = "string" == typeof e ? ce(e, t) : ce.makeArray(e && e.nodeType ? [e] : e),
          r = ce.merge(this.get(), n);return this.pushStack(ce.unique(r));
    }, addBack: function addBack(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    } }), ce.each({ parent: function parent(e) {
      var t = e.parentNode;return t && 11 !== t.nodeType ? t : null;
    }, parents: function parents(e) {
      return ce.dir(e, "parentNode");
    }, parentsUntil: function parentsUntil(e, t, n) {
      return ce.dir(e, "parentNode", n);
    }, next: function next(e) {
      return f(e, "nextSibling");
    }, prev: function prev(e) {
      return f(e, "previousSibling");
    }, nextAll: function nextAll(e) {
      return ce.dir(e, "nextSibling");
    }, prevAll: function prevAll(e) {
      return ce.dir(e, "previousSibling");
    }, nextUntil: function nextUntil(e, t, n) {
      return ce.dir(e, "nextSibling", n);
    }, prevUntil: function prevUntil(e, t, n) {
      return ce.dir(e, "previousSibling", n);
    }, siblings: function siblings(e) {
      return ce.sibling((e.parentNode || {}).firstChild, e);
    }, children: function children(e) {
      return ce.sibling(e.firstChild);
    }, contents: function contents(e) {
      return ce.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ce.merge([], e.childNodes);
    } }, function (e, t) {
    ce.fn[e] = function (n, r) {
      var i = ce.map(this, t, n);return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = ce.filter(r, i)), this.length > 1 && (Xe[e] || (i = ce.unique(i)), Ie.test(e) && (i = i.reverse())), this.pushStack(i);
    };
  }), ce.extend({ filter: function filter(e, t, n) {
      var r = t[0];return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? ce.find.matchesSelector(r, e) ? [r] : [] : ce.find.matches(e, ce.grep(t, function (e) {
        return 1 === e.nodeType;
      }));
    }, dir: function dir(e, n, r) {
      for (var i = [], o = e[n]; o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !ce(o).is(r));) {
        1 === o.nodeType && i.push(o), o = o[n];
      }return i;
    }, sibling: function sibling(e, t) {
      for (var n = []; e; e = e.nextSibling) {
        1 === e.nodeType && e !== t && n.push(e);
      }return n;
    } });var Ue = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
      Ve = / jQuery\d+="(?:null|\d+)"/g,
      Ye = new RegExp("<(?:" + Ue + ")[\\s/>]", "i"),
      Je = /^\s+/,
      Ge = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      Qe = /<([\w:]+)/,
      Ke = /<tbody/i,
      Ze = /<|&#?\w+;/,
      et = /<(?:script|style|link)/i,
      tt = /^(?:checkbox|radio)$/i,
      nt = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rt = /^$|\/(?:java|ecma)script/i,
      it = /^true\/(.*)/,
      ot = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      at = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: ce.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"] },
      st = d(G),
      ut = st.appendChild(G.createElement("div"));at.optgroup = at.option, at.tbody = at.tfoot = at.colgroup = at.caption = at.thead, at.th = at.td, ce.fn.extend({ text: function text(e) {
      return ce.access(this, function (e) {
        return e === t ? ce.text(this) : this.empty().append((this[0] && this[0].ownerDocument || G).createTextNode(e));
      }, null, e, arguments.length);
    }, append: function append() {
      return this.domManip(arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = h(this, e);t.appendChild(e);
        }
      });
    }, prepend: function prepend() {
      return this.domManip(arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = h(this, e);t.insertBefore(e, t.firstChild);
        }
      });
    }, before: function before() {
      return this.domManip(arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this);
      });
    }, after: function after() {
      return this.domManip(arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
      });
    }, remove: function remove(e, t) {
      for (var n, r = e ? ce.filter(e, this) : this, i = 0; null != (n = r[i]); i++) {
        t || 1 !== n.nodeType || ce.cleanData(x(n)), n.parentNode && (t && ce.contains(n.ownerDocument, n) && y(x(n, "script")), n.parentNode.removeChild(n));
      }return this;
    }, empty: function empty() {
      for (var e, t = 0; null != (e = this[t]); t++) {
        for (1 === e.nodeType && ce.cleanData(x(e, !1)); e.firstChild;) {
          e.removeChild(e.firstChild);
        }e.options && ce.nodeName(e, "select") && (e.options.length = 0);
      }return this;
    }, clone: function clone(e, t) {
      return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
        return ce.clone(this, e, t);
      });
    }, html: function html(e) {
      return ce.access(this, function (e) {
        var n = this[0] || {},
            r = 0,
            i = this.length;if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Ve, "") : t;if ("string" == typeof e && !et.test(e) && (ce.support.htmlSerialize || !Ye.test(e)) && (ce.support.leadingWhitespace || !Je.test(e)) && !at[(Qe.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = e.replace(Ge, "<$1></$2>");try {
            for (; i > r; r++) {
              n = this[r] || {}, 1 === n.nodeType && (ce.cleanData(x(n, !1)), n.innerHTML = e);
            }n = 0;
          } catch (o) {}
        }n && this.empty().append(e);
      }, null, e, arguments.length);
    }, replaceWith: function replaceWith() {
      var e = ce.map(this, function (e) {
        return [e.nextSibling, e.parentNode];
      }),
          t = 0;return this.domManip(arguments, function (n) {
        var r = e[t++],
            i = e[t++];i && (r && r.parentNode !== i && (r = this.nextSibling), ce(this).remove(), i.insertBefore(n, r));
      }, !0), t ? this : this.remove();
    }, detach: function detach(e) {
      return this.remove(e, !0);
    }, domManip: function domManip(e, t, n) {
      e = re.apply([], e);var r,
          i,
          o,
          a,
          s,
          u,
          l = 0,
          c = this.length,
          f = this,
          p = c - 1,
          d = e[0],
          h = ce.isFunction(d);if (h || !(1 >= c || "string" != typeof d || ce.support.checkClone) && nt.test(d)) return this.each(function (r) {
        var i = f.eq(r);h && (e[0] = d.call(this, r, i.html())), i.domManip(e, t, n);
      });if (c && (u = ce.buildFragment(e, this[0].ownerDocument, !1, !n && this), r = u.firstChild, 1 === u.childNodes.length && (u = r), r)) {
        for (a = ce.map(x(u, "script"), g), o = a.length; c > l; l++) {
          i = u, l !== p && (i = ce.clone(i, !0, !0), o && ce.merge(a, x(i, "script"))), t.call(this[l], i, l);
        }if (o) for (s = a[a.length - 1].ownerDocument, ce.map(a, m), l = 0; o > l; l++) {
          i = a[l], rt.test(i.type || "") && !ce._data(i, "globalEval") && ce.contains(s, i) && (i.src ? ce._evalUrl(i.src) : ce.globalEval((i.text || i.textContent || i.innerHTML || "").replace(ot, "")));
        }u = r = null;
      }return this;
    } }), ce.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) {
    ce.fn[e] = function (e) {
      for (var n, r = 0, i = [], o = ce(e), a = o.length - 1; a >= r; r++) {
        n = r === a ? this : this.clone(!0), ce(o[r])[t](n), ie.apply(i, n.get());
      }return this.pushStack(i);
    };
  }), ce.extend({ clone: function clone(e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u = ce.contains(e.ownerDocument, e);if (ce.support.html5Clone || ce.isXMLDoc(e) || !Ye.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (ut.innerHTML = e.outerHTML, ut.removeChild(o = ut.firstChild)), !(ce.support.noCloneEvent && ce.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ce.isXMLDoc(e))) for (r = x(o), s = x(e), a = 0; null != (i = s[a]); ++a) {
        r[a] && b(i, r[a]);
      }if (t) if (n) for (s = s || x(e), r = r || x(o), a = 0; null != (i = s[a]); a++) {
        v(i, r[a]);
      } else v(e, o);return r = x(o, "script"), r.length > 0 && y(r, !u && x(e, "script")), r = s = i = null, o;
    }, buildFragment: function buildFragment(e, t, n, r) {
      for (var i, o, a, s, u, l, c, f = e.length, p = d(t), h = [], g = 0; f > g; g++) {
        if (o = e[g], o || 0 === o) if ("object" === ce.type(o)) ce.merge(h, o.nodeType ? [o] : o);else if (Ze.test(o)) {
          for (s = s || p.appendChild(t.createElement("div")), u = (Qe.exec(o) || ["", ""])[1].toLowerCase(), c = at[u] || at._default, s.innerHTML = c[1] + o.replace(Ge, "<$1></$2>") + c[2], i = c[0]; i--;) {
            s = s.lastChild;
          }if (!ce.support.leadingWhitespace && Je.test(o) && h.push(t.createTextNode(Je.exec(o)[0])), !ce.support.tbody) for (o = "table" !== u || Ke.test(o) ? "<table>" !== c[1] || Ke.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length; i--;) {
            ce.nodeName(l = o.childNodes[i], "tbody") && !l.childNodes.length && o.removeChild(l);
          }for (ce.merge(h, s.childNodes), s.textContent = ""; s.firstChild;) {
            s.removeChild(s.firstChild);
          }s = p.lastChild;
        } else h.push(t.createTextNode(o));
      }for (s && p.removeChild(s), ce.support.appendChecked || ce.grep(x(h, "input"), w), g = 0; o = h[g++];) {
        if ((!r || -1 === ce.inArray(o, r)) && (a = ce.contains(o.ownerDocument, o), s = x(p.appendChild(o), "script"), a && y(s), n)) for (i = 0; o = s[i++];) {
          rt.test(o.type || "") && n.push(o);
        }
      }return s = null, p;
    }, cleanData: function cleanData(e, t) {
      for (var n, r, i, o, a = 0, s = ce.expando, u = ce.cache, l = ce.support.deleteExpando, c = ce.event.special; null != (n = e[a]); a++) {
        if ((t || ce.acceptData(n)) && (i = n[s], o = i && u[i])) {
          if (o.events) for (r in o.events) {
            c[r] ? ce.event.remove(n, r) : ce.removeEvent(n, r, o.handle);
          }u[i] && (delete u[i], l ? delete n[s] : _typeof(n.removeAttribute) !== Y ? n.removeAttribute(s) : n[s] = null, te.push(i));
        }
      }
    }, _evalUrl: function _evalUrl(e) {
      return ce.ajax({ url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 });
    } }), ce.fn.extend({ wrapAll: function wrapAll(e) {
      if (ce.isFunction(e)) return this.each(function (t) {
        ce(this).wrapAll(e.call(this, t));
      });if (this[0]) {
        var t = ce(e, this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
          for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) {
            e = e.firstChild;
          }return e;
        }).append(this);
      }return this;
    }, wrapInner: function wrapInner(e) {
      return ce.isFunction(e) ? this.each(function (t) {
        ce(this).wrapInner(e.call(this, t));
      }) : this.each(function () {
        var t = ce(this),
            n = t.contents();n.length ? n.wrapAll(e) : t.append(e);
      });
    }, wrap: function wrap(e) {
      var t = ce.isFunction(e);return this.each(function (n) {
        ce(this).wrapAll(t ? e.call(this, n) : e);
      });
    }, unwrap: function unwrap() {
      return this.parent().each(function () {
        ce.nodeName(this, "body") || ce(this).replaceWith(this.childNodes);
      }).end();
    } });var lt,
      ct,
      ft,
      pt = /alpha\([^)]*\)/i,
      dt = /opacity\s*=\s*([^)]*)/,
      ht = /^(top|right|bottom|left)$/,
      gt = /^(none|table(?!-c[ea]).+)/,
      mt = /^margin/,
      yt = new RegExp("^(" + fe + ")(.*)$", "i"),
      vt = new RegExp("^(" + fe + ")(?!px)[a-z%]+$", "i"),
      bt = new RegExp("^([+-])=(" + fe + ")", "i"),
      xt = { BODY: "block" },
      wt = { position: "absolute", visibility: "hidden", display: "block" },
      Tt = { letterSpacing: 0, fontWeight: 400 },
      Ct = ["Top", "Right", "Bottom", "Left"],
      Nt = ["Webkit", "O", "Moz", "ms"];ce.fn.extend({ css: function css(e, n) {
      return ce.access(this, function (e, n, r) {
        var i,
            o,
            a = {},
            s = 0;if (ce.isArray(n)) {
          for (o = ct(e), i = n.length; i > s; s++) {
            a[n[s]] = ce.css(e, n[s], !1, o);
          }return a;
        }return r !== t ? ce.style(e, n, r) : ce.css(e, n);
      }, e, n, arguments.length > 1);
    }, show: function show() {
      return N(this, !0);
    }, hide: function hide() {
      return N(this);
    }, toggle: function toggle(e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        C(this) ? ce(this).show() : ce(this).hide();
      });
    } }), ce.extend({ cssHooks: { opacity: { get: function get(e, t) {
          if (t) {
            var n = ft(e, "opacity");return "" === n ? "1" : n;
          }
        } } }, cssNumber: { columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": ce.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function style(e, n, r, i) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var o,
            a,
            s,
            u = ce.camelCase(n),
            l = e.style;if (n = ce.cssProps[u] || (ce.cssProps[u] = T(l, u)), s = ce.cssHooks[n] || ce.cssHooks[u], r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : l[n];if (a = typeof r === "undefined" ? "undefined" : _typeof(r), "string" === a && (o = bt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(ce.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || ce.cssNumber[u] || (r += "px"), ce.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (l[n] = "inherit"), s && "set" in s && (r = s.set(e, r, i)) === t))) try {
          l[n] = r;
        } catch (c) {}
      }
    }, css: function css(e, n, r, i) {
      var o,
          a,
          s,
          u = ce.camelCase(n);return n = ce.cssProps[u] || (ce.cssProps[u] = T(e.style, u)), s = ce.cssHooks[n] || ce.cssHooks[u], s && "get" in s && (a = s.get(e, !0, r)), a === t && (a = ft(e, n, i)), "normal" === a && n in Tt && (a = Tt[n]), "" === r || r ? (o = parseFloat(a), r === !0 || ce.isNumeric(o) ? o || 0 : a) : a;
    } }), e.getComputedStyle ? (ct = function ct(t) {
    return e.getComputedStyle(t, null);
  }, ft = function ft(e, n, r) {
    var i,
        o,
        a,
        s = r || ct(e),
        u = s ? s.getPropertyValue(n) || s[n] : t,
        l = e.style;return s && ("" !== u || ce.contains(e.ownerDocument, e) || (u = ce.style(e, n)), vt.test(u) && mt.test(n) && (i = l.width, o = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = u, u = s.width, l.width = i, l.minWidth = o, l.maxWidth = a)), u;
  }) : G.documentElement.currentStyle && (ct = function ct(e) {
    return e.currentStyle;
  }, ft = function ft(e, n, r) {
    var i,
        o,
        a,
        s = r || ct(e),
        u = s ? s[n] : t,
        l = e.style;return null == u && l && l[n] && (u = l[n]), vt.test(u) && !ht.test(n) && (i = l.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), l.left = "fontSize" === n ? "1em" : u, u = l.pixelLeft + "px", l.left = i, a && (o.left = a)), "" === u ? "auto" : u;
  }), ce.each(["height", "width"], function (e, t) {
    ce.cssHooks[t] = { get: function get(e, n, r) {
        return n ? 0 === e.offsetWidth && gt.test(ce.css(e, "display")) ? ce.swap(e, wt, function () {
          return S(e, t, r);
        }) : S(e, t, r) : void 0;
      }, set: function set(e, n, r) {
        var i = r && ct(e);return k(e, n, r ? E(e, t, r, ce.support.boxSizing && "border-box" === ce.css(e, "boxSizing", !1, i), i) : 0);
      } };
  }), ce.support.opacity || (ce.cssHooks.opacity = { get: function get(e, t) {
      return dt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
    }, set: function set(e, t) {
      var n = e.style,
          r = e.currentStyle,
          i = ce.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
          o = r && r.filter || n.filter || "";n.zoom = 1, (t >= 1 || "" === t) && "" === ce.trim(o.replace(pt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = pt.test(o) ? o.replace(pt, i) : o + " " + i);
    } }), ce(function () {
    ce.support.reliableMarginRight || (ce.cssHooks.marginRight = { get: function get(e, t) {
        return t ? ce.swap(e, { display: "inline-block" }, ft, [e, "marginRight"]) : void 0;
      } }), !ce.support.pixelPosition && ce.fn.position && ce.each(["top", "left"], function (e, t) {
      ce.cssHooks[t] = { get: function get(e, n) {
          return n ? (n = ft(e, t), vt.test(n) ? ce(e).position()[t] + "px" : n) : void 0;
        } };
    });
  }), ce.expr && ce.expr.filters && (ce.expr.filters.hidden = function (e) {
    return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ce.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ce.css(e, "display"));
  }, ce.expr.filters.visible = function (e) {
    return !ce.expr.filters.hidden(e);
  }), ce.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
    ce.cssHooks[e + t] = { expand: function expand(n) {
        for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) {
          i[e + Ct[r] + t] = o[r] || o[r - 2] || o[0];
        }return i;
      } }, mt.test(e) || (ce.cssHooks[e + t].set = k);
  });var kt = /%20/g,
      Et = /\[\]$/,
      St = /\r?\n/g,
      At = /^(?:submit|button|image|reset|file)$/i,
      jt = /^(?:input|select|textarea|keygen)/i;ce.fn.extend({ serialize: function serialize() {
      return ce.param(this.serializeArray());
    }, serializeArray: function serializeArray() {
      return this.map(function () {
        var e = ce.prop(this, "elements");return e ? ce.makeArray(e) : this;
      }).filter(function () {
        var e = this.type;return this.name && !ce(this).is(":disabled") && jt.test(this.nodeName) && !At.test(e) && (this.checked || !tt.test(e));
      }).map(function (e, t) {
        var n = ce(this).val();return null == n ? null : ce.isArray(n) ? ce.map(n, function (e) {
          return { name: t.name, value: e.replace(St, "\r\n") };
        }) : { name: t.name, value: n.replace(St, "\r\n") };
      }).get();
    } }), ce.param = function (e, n) {
    var r,
        i = [],
        o = function o(e, t) {
      t = ce.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
    };if (n === t && (n = ce.ajaxSettings && ce.ajaxSettings.traditional), ce.isArray(e) || e.jquery && !ce.isPlainObject(e)) ce.each(e, function () {
      o(this.name, this.value);
    });else for (r in e) {
      D(r, e[r], n, o);
    }return i.join("&").replace(kt, "+");
  }, ce.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
    ce.fn[t] = function (e, n) {
      return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
    };
  }), ce.fn.extend({ hover: function hover(e, t) {
      return this.mouseenter(e).mouseleave(t || e);
    }, bind: function bind(e, t, n) {
      return this.on(e, null, t, n);
    }, unbind: function unbind(e, t) {
      return this.off(e, null, t);
    }, delegate: function delegate(e, t, n, r) {
      return this.on(t, e, n, r);
    }, undelegate: function undelegate(e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
    } });var Dt,
      Lt,
      Ht = ce.now(),
      qt = /\?/,
      _t = /#.*$/,
      Mt = /([?&])_=[^&]*/,
      Ot = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
      Ft = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      Bt = /^(?:GET|HEAD)$/,
      Pt = /^\/\//,
      Rt = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
      Wt = ce.fn.load,
      $t = {},
      It = {},
      zt = "*/".concat("*");try {
    Lt = J.href;
  } catch (Xt) {
    Lt = G.createElement("a"), Lt.href = "", Lt = Lt.href;
  }Dt = Rt.exec(Lt.toLowerCase()) || [], ce.fn.load = function (e, n, r) {
    if ("string" != typeof e && Wt) return Wt.apply(this, arguments);var i,
        o,
        a,
        s = this,
        u = e.indexOf(" ");return u >= 0 && (i = e.slice(u, e.length), e = e.slice(0, u)), ce.isFunction(n) ? (r = n, n = t) : n && "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && (a = "POST"), s.length > 0 && ce.ajax({ url: e, type: a, dataType: "html", data: n }).done(function (e) {
      o = arguments, s.html(i ? ce("<div>").append(ce.parseHTML(e)).find(i) : e);
    }).complete(r && function (e, t) {
      s.each(r, o || [e.responseText, t, e]);
    }), this;
  }, ce.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    ce.fn[t] = function (e) {
      return this.on(t, e);
    };
  }), ce.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: Lt, type: "GET", isLocal: Ft.test(Dt[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": zt, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": ce.parseJSON, "text xml": ce.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(e, t) {
      return t ? q(q(e, ce.ajaxSettings), t) : q(ce.ajaxSettings, e);
    }, ajaxPrefilter: L($t), ajaxTransport: L(It), ajax: function ajax(e, n) {
      function r(e, n, r, i) {
        var o,
            f,
            v,
            b,
            w,
            C = n;2 !== x && (x = 2, u && clearTimeout(u), c = t, s = i || "", T.readyState = e > 0 ? 4 : 0, o = e >= 200 && 300 > e || 304 === e, r && (b = _(p, T, r)), b = M(p, b, T, o), o ? (p.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (ce.lastModified[a] = w), w = T.getResponseHeader("etag"), w && (ce.etag[a] = w)), 204 === e || "HEAD" === p.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = b.state, f = b.data, v = b.error, o = !v)) : (v = C, (e || !C) && (C = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (n || C) + "", o ? g.resolveWith(d, [f, C, T]) : g.rejectWith(d, [T, C, v]), T.statusCode(y), y = t, l && h.trigger(o ? "ajaxSuccess" : "ajaxError", [T, p, o ? f : v]), m.fireWith(d, [T, C]), l && (h.trigger("ajaxComplete", [T, p]), --ce.active || ce.event.trigger("ajaxStop")));
      }"object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && (n = e, e = t), n = n || {};var i,
          o,
          a,
          s,
          u,
          l,
          c,
          f,
          p = ce.ajaxSetup({}, n),
          d = p.context || p,
          h = p.context && (d.nodeType || d.jquery) ? ce(d) : ce.event,
          g = ce.Deferred(),
          m = ce.Callbacks("once memory"),
          y = p.statusCode || {},
          v = {},
          b = {},
          x = 0,
          w = "canceled",
          T = { readyState: 0, getResponseHeader: function getResponseHeader(e) {
          var t;if (2 === x) {
            if (!f) for (f = {}; t = Ot.exec(s);) {
              f[t[1].toLowerCase()] = t[2];
            }t = f[e.toLowerCase()];
          }return null == t ? null : t;
        }, getAllResponseHeaders: function getAllResponseHeaders() {
          return 2 === x ? s : null;
        }, setRequestHeader: function setRequestHeader(e, t) {
          var n = e.toLowerCase();return x || (e = b[n] = b[n] || e, v[e] = t), this;
        }, overrideMimeType: function overrideMimeType(e) {
          return x || (p.mimeType = e), this;
        }, statusCode: function statusCode(e) {
          var t;if (e) if (2 > x) for (t in e) {
            y[t] = [y[t], e[t]];
          } else T.always(e[T.status]);return this;
        }, abort: function abort(e) {
          var t = e || w;return c && c.abort(t), r(0, t), this;
        } };if (g.promise(T).complete = m.add, T.success = T.done, T.error = T.fail, p.url = ((e || p.url || Lt) + "").replace(_t, "").replace(Pt, Dt[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = ce.trim(p.dataType || "*").toLowerCase().match(pe) || [""], null == p.crossDomain && (i = Rt.exec(p.url.toLowerCase()), p.crossDomain = !(!i || i[1] === Dt[1] && i[2] === Dt[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (Dt[3] || ("http:" === Dt[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = ce.param(p.data, p.traditional)), H($t, p, n, T), 2 === x) return T;l = p.global, l && 0 === ce.active++ && ce.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Bt.test(p.type), a = p.url, p.hasContent || (p.data && (a = p.url += (qt.test(a) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = Mt.test(a) ? a.replace(Mt, "$1_=" + Ht++) : a + (qt.test(a) ? "&" : "?") + "_=" + Ht++)), p.ifModified && (ce.lastModified[a] && T.setRequestHeader("If-Modified-Since", ce.lastModified[a]), ce.etag[a] && T.setRequestHeader("If-None-Match", ce.etag[a])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", p.contentType), T.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + zt + "; q=0.01" : "") : p.accepts["*"]);for (o in p.headers) {
        T.setRequestHeader(o, p.headers[o]);
      }if (p.beforeSend && (p.beforeSend.call(d, T, p) === !1 || 2 === x)) return T.abort();w = "abort";for (o in { success: 1, error: 1, complete: 1 }) {
        T[o](p[o]);
      }if (c = H(It, p, n, T)) {
        T.readyState = 1, l && h.trigger("ajaxSend", [T, p]), p.async && p.timeout > 0 && (u = setTimeout(function () {
          T.abort("timeout");
        }, p.timeout));try {
          x = 1, c.send(v, r);
        } catch (C) {
          if (!(2 > x)) throw C;r(-1, C);
        }
      } else r(-1, "No Transport");return T;
    }, getJSON: function getJSON(e, t, n) {
      return ce.get(e, t, n, "json");
    }, getScript: function getScript(e, n) {
      return ce.get(e, t, n, "script");
    } }), ce.each(["get", "post"], function (e, n) {
    ce[n] = function (e, r, i, o) {
      return ce.isFunction(r) && (o = o || i, i = r, r = t), ce.ajax({ url: e, type: n, dataType: o, data: r, success: i });
    };
  }), ce.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function textScript(e) {
        return ce.globalEval(e), e;
      } } }), ce.ajaxPrefilter("script", function (e) {
    e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1);
  }), ce.ajaxTransport("script", function (e) {
    if (e.crossDomain) {
      var n,
          r = G.head || ce("head")[0] || G.documentElement;return { send: function send(t, i) {
          n = G.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, t) {
            (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"));
          }, r.insertBefore(n, r.firstChild);
        }, abort: function abort() {
          n && n.onload(t, !0);
        } };
    }
  });var Ut = [],
      Vt = /(=)\?(?=&|$)|\?\?/;ce.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
      var e = Ut.pop() || ce.expando + "_" + Ht++;return this[e] = !0, e;
    } }), ce.ajaxPrefilter("json jsonp", function (n, r, i) {
    var o,
        a,
        s,
        u = n.jsonp !== !1 && (Vt.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Vt.test(n.data) && "data");return u || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = ce.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(Vt, "$1" + o) : n.jsonp !== !1 && (n.url += (qt.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function () {
      return s || ce.error(o + " was not called"), s[0];
    }, n.dataTypes[0] = "json", a = e[o], e[o] = function () {
      s = arguments;
    }, i.always(function () {
      e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Ut.push(o)), s && ce.isFunction(a) && a(s[0]), s = a = t;
    }), "script") : void 0;
  });var Yt,
      Jt,
      Gt = 0,
      Qt = e.ActiveXObject && function () {
    var e;for (e in Yt) {
      Yt[e](t, !0);
    }
  };ce.ajaxSettings.xhr = e.ActiveXObject ? function () {
    return !this.isLocal && O() || F();
  } : O, Jt = ce.ajaxSettings.xhr(), ce.support.cors = !!Jt && "withCredentials" in Jt, Jt = ce.support.ajax = !!Jt, Jt && ce.ajaxTransport(function (n) {
    if (!n.crossDomain || ce.support.cors) {
      var _r;return { send: function send(i, o) {
          var a,
              s,
              u = n.xhr();if (n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async), n.xhrFields) for (s in n.xhrFields) {
            u[s] = n.xhrFields[s];
          }n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");try {
            for (s in i) {
              u.setRequestHeader(s, i[s]);
            }
          } catch (l) {}u.send(n.hasContent && n.data || null), _r = function r(e, i) {
            var s, l, c, f;try {
              if (_r && (i || 4 === u.readyState)) if (_r = t, a && (u.onreadystatechange = ce.noop, Qt && delete Yt[a]), i) 4 !== u.readyState && u.abort();else {
                f = {}, s = u.status, l = u.getAllResponseHeaders(), "string" == typeof u.responseText && (f.text = u.responseText);try {
                  c = u.statusText;
                } catch (p) {
                  c = "";
                }s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = f.text ? 200 : 404;
              }
            } catch (d) {
              i || o(-1, d);
            }f && o(s, c, f, l);
          }, n.async ? 4 === u.readyState ? setTimeout(_r) : (a = ++Gt, Qt && (Yt || (Yt = {}, ce(e).unload(Qt)), Yt[a] = _r), u.onreadystatechange = _r) : _r();
        }, abort: function abort() {
          _r && _r(t, !0);
        } };
    }
  });var Kt,
      Zt,
      en = /^(?:toggle|show|hide)$/,
      tn = new RegExp("^(?:([+-])=|)(" + fe + ")([a-z%]*)$", "i"),
      nn = /queueHooks$/,
      rn = [$],
      on = { "*": [function (e, t) {
      var n = this.createTween(e, t),
          r = n.cur(),
          i = tn.exec(t),
          o = i && i[3] || (ce.cssNumber[e] ? "" : "px"),
          a = (ce.cssNumber[e] || "px" !== o && +r) && tn.exec(ce.css(n.elem, e)),
          s = 1,
          u = 20;if (a && a[3] !== o) {
        o = o || a[3], i = i || [], a = +r || 1;do {
          s = s || ".5", a /= s, ce.style(n.elem, e, a + o);
        } while (s !== (s = n.cur() / r) && 1 !== s && --u);
      }return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n;
    }] };ce.Animation = ce.extend(R, { tweener: function tweener(e, t) {
      ce.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");for (var n, r = 0, i = e.length; i > r; r++) {
        n = e[r], on[n] = on[n] || [], on[n].unshift(t);
      }
    }, prefilter: function prefilter(e, t) {
      t ? rn.unshift(e) : rn.push(e);
    } }), ce.Tween = I, I.prototype = { constructor: I, init: function init(e, t, n, r, i, o) {
      this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (ce.cssNumber[n] ? "" : "px");
    }, cur: function cur() {
      var e = I.propHooks[this.prop];return e && e.get ? e.get(this) : I.propHooks._default.get(this);
    }, run: function run(e) {
      var t,
          n = I.propHooks[this.prop];return this.options.duration ? this.pos = t = ce.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : I.propHooks._default.set(this), this;
    } }, I.prototype.init.prototype = I.prototype, I.propHooks = { _default: { get: function get(e) {
        var t;return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ce.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop];
      }, set: function set(e) {
        ce.fx.step[e.prop] ? ce.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ce.cssProps[e.prop]] || ce.cssHooks[e.prop]) ? ce.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
      } } }, I.propHooks.scrollTop = I.propHooks.scrollLeft = { set: function set(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
    } }, ce.each(["toggle", "show", "hide"], function (e, t) {
    var n = ce.fn[t];ce.fn[t] = function (e, r, i) {
      return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(z(t, !0), e, r, i);
    };
  }), ce.fn.extend({ fadeTo: function fadeTo(e, t, n, r) {
      return this.filter(C).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r);
    }, animate: function animate(e, t, n, r) {
      var i = ce.isEmptyObject(e),
          o = ce.speed(t, n, r),
          a = function a() {
        var t = R(this, ce.extend({}, e), o);(i || ce._data(this, "finish")) && t.stop(!0);
      };return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a);
    }, stop: function stop(e, n, r) {
      var i = function i(e) {
        var t = e.stop;delete e.stop, t(r);
      };return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
        var t = !0,
            n = null != e && e + "queueHooks",
            o = ce.timers,
            a = ce._data(this);if (n) a[n] && a[n].stop && i(a[n]);else for (n in a) {
          a[n] && a[n].stop && nn.test(n) && i(a[n]);
        }for (n = o.length; n--;) {
          o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1));
        }(t || !r) && ce.dequeue(this, e);
      });
    }, finish: function finish(e) {
      return e !== !1 && (e = e || "fx"), this.each(function () {
        var t,
            n = ce._data(this),
            r = n[e + "queue"],
            i = n[e + "queueHooks"],
            o = ce.timers,
            a = r ? r.length : 0;for (n.finish = !0, ce.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) {
          o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
        }for (t = 0; a > t; t++) {
          r[t] && r[t].finish && r[t].finish.call(this);
        }delete n.finish;
      });
    } }), ce.each({ slideDown: z("show"), slideUp: z("hide"), slideToggle: z("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) {
    ce.fn[e] = function (e, n, r) {
      return this.animate(t, e, n, r);
    };
  }), ce.speed = function (e, t, n) {
    var r = e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? ce.extend({}, e) : { complete: n || !n && t || ce.isFunction(e) && e, duration: e, easing: n && t || t && !ce.isFunction(t) && t };return r.duration = ce.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ce.fx.speeds ? ce.fx.speeds[r.duration] : ce.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
      ce.isFunction(r.old) && r.old.call(this), r.queue && ce.dequeue(this, r.queue);
    }, r;
  }, ce.easing = { linear: function linear(e) {
      return e;
    }, swing: function swing(e) {
      return .5 - Math.cos(e * Math.PI) / 2;
    } }, ce.timers = [], ce.fx = I.prototype.init, ce.fx.tick = function () {
    var e,
        n = ce.timers,
        r = 0;for (Kt = ce.now(); r < n.length; r++) {
      e = n[r], e() || n[r] !== e || n.splice(r--, 1);
    }n.length || ce.fx.stop(), Kt = t;
  }, ce.fx.timer = function (e) {
    e() && ce.timers.push(e) && ce.fx.start();
  }, ce.fx.interval = 13, ce.fx.start = function () {
    Zt || (Zt = setInterval(ce.fx.tick, ce.fx.interval));
  }, ce.fx.stop = function () {
    clearInterval(Zt), Zt = null;
  }, ce.fx.speeds = { slow: 600, fast: 200, _default: 400 }, ce.fx.step = {}, ce.expr && ce.expr.filters && (ce.expr.filters.animated = function (e) {
    return ce.grep(ce.timers, function (t) {
      return e === t.elem;
    }).length;
  }), ce.fn.offset = function (e) {
    if (arguments.length) return e === t ? this : this.each(function (t) {
      ce.offset.setOffset(this, e, t);
    });var n,
        r,
        i = { top: 0, left: 0 },
        o = this[0],
        a = o && o.ownerDocument;if (a) return n = a.documentElement, ce.contains(n, o) ? (_typeof(o.getBoundingClientRect) !== Y && (i = o.getBoundingClientRect()), r = X(a), { top: i.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0), left: i.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0) }) : i;
  }, ce.offset = { setOffset: function setOffset(e, t, n) {
      var r = ce.css(e, "position");"static" === r && (e.style.position = "relative");var i,
          o,
          a = ce(e),
          s = a.offset(),
          u = ce.css(e, "top"),
          l = ce.css(e, "left"),
          c = ("absolute" === r || "fixed" === r) && ce.inArray("auto", [u, l]) > -1,
          f = {},
          p = {};c ? (p = a.position(), i = p.top, o = p.left) : (i = parseFloat(u) || 0, o = parseFloat(l) || 0), ce.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (f.top = t.top - s.top + i), null != t.left && (f.left = t.left - s.left + o), "using" in t ? t.using.call(e, f) : a.css(f);
    } }, ce.fn.extend({ position: function position() {
      if (this[0]) {
        var e,
            t,
            n = { top: 0, left: 0 },
            r = this[0];return "fixed" === ce.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ce.nodeName(e[0], "html") || (n = e.offset()), n.top += ce.css(e[0], "borderTopWidth", !0), n.left += ce.css(e[0], "borderLeftWidth", !0)), { top: t.top - n.top - ce.css(r, "marginTop", !0), left: t.left - n.left - ce.css(r, "marginLeft", !0) };
      }
    }, offsetParent: function offsetParent() {
      return this.map(function () {
        for (var e = this.offsetParent || Q; e && !ce.nodeName(e, "html") && "static" === ce.css(e, "position");) {
          e = e.offsetParent;
        }return e || Q;
      });
    } }), ce.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, n) {
    var r = /Y/.test(n);ce.fn[e] = function (i) {
      return ce.access(this, function (e, i, o) {
        var a = X(e);return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : void (a ? a.scrollTo(r ? ce(a).scrollLeft() : o, r ? o : ce(a).scrollTop()) : e[i] = o);
      }, e, i, arguments.length, null);
    };
  }), ce.each({ Height: "height", Width: "width" }, function (e, n) {
    ce.each({ padding: "inner" + e, content: n, "": "outer" + e }, function (r, i) {
      ce.fn[i] = function (i, o) {
        var a = arguments.length && (r || "boolean" != typeof i),
            s = r || (i === !0 || o === !0 ? "margin" : "border");return ce.access(this, function (n, r, i) {
          var o;return ce.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? ce.css(n, r, s) : ce.style(n, r, i, s);
        }, n, a ? i : t, a, null);
      };
    });
  }), ce.fn.size = function () {
    return this.length;
  }, ce.fn.andSelf = ce.fn.addBack, "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module && "object" == _typeof(module.exports) ? module.exports = ce : (e.jQuery = e.$ = ce, "function" == typeof define && define.amd && define("jquery", [], function () {
    return ce;
  }));
}(window);
"use strict";

!function (t) {
  function o(t) {
    return "undefined" == typeof t.which ? !0 : "number" == typeof t.which && t.which > 0 ? !t.ctrlKey && !t.metaKey && !t.altKey && 8 != t.which && 9 != t.which && 13 != t.which && 16 != t.which && 17 != t.which && 20 != t.which && 27 != t.which : !1;
  }function i(o) {
    var i = t(o);i.prop("disabled") || i.closest(".form-group").addClass("is-focused");
  }function n(o) {
    o.closest("label").hover(function () {
      var o = t(this).find("input");o.prop("disabled") || i(o);
    }, function () {
      e(t(this).find("input"));
    });
  }function e(o) {
    t(o).closest(".form-group").removeClass("is-focused");
  }t.expr[":"].notmdproc = function (o) {
    return t(o).data("mdproc") ? !1 : !0;
  }, t.material = { options: { validate: !0, input: !0, ripples: !0, checkbox: !0, togglebutton: !0, radio: !0, arrive: !0, autofill: !1, withRipples: [".btn:not(.btn-link)", ".card-image", ".navbar a:not(.withoutripple)", ".footer a:not(.withoutripple)", ".dropdown-menu a", ".nav-tabs a:not(.withoutripple)", ".withripple", ".pagination li:not(.active):not(.disabled) a:not(.withoutripple)"].join(","), inputElements: "input.form-control, textarea.form-control, select.form-control", checkboxElements: ".checkbox > label > input[type=checkbox]", togglebuttonElements: ".togglebutton > label > input[type=checkbox]", radioElements: ".radio > label > input[type=radio]" }, checkbox: function checkbox(o) {
      var i = t(o ? o : this.options.checkboxElements).filter(":notmdproc").data("mdproc", !0).after("<span class='checkbox-material'><span class='check'></span></span>");n(i);
    }, togglebutton: function togglebutton(o) {
      var i = t(o ? o : this.options.togglebuttonElements).filter(":notmdproc").data("mdproc", !0).after("<span class='toggle'></span>");n(i);
    }, radio: function radio(o) {
      var i = t(o ? o : this.options.radioElements).filter(":notmdproc").data("mdproc", !0).after("<span class='circle'></span><span class='check'></span>");n(i);
    }, input: function input(o) {
      t(o ? o : this.options.inputElements).filter(":notmdproc").data("mdproc", !0).each(function () {
        var o = t(this),
            i = o.closest(".form-group");0 === i.length && (o.wrap("<div class='form-group'></div>"), i = o.closest(".form-group")), o.attr("data-hint") && (o.after("<p class='help-block'>" + o.attr("data-hint") + "</p>"), o.removeAttr("data-hint"));var n = { "input-lg": "form-group-lg", "input-sm": "form-group-sm" };if (t.each(n, function (t, n) {
          o.hasClass(t) && (o.removeClass(t), i.addClass(n));
        }), o.hasClass("floating-label")) {
          var e = o.attr("placeholder");o.attr("placeholder", null).removeClass("floating-label");var a = o.attr("id"),
              r = "";a && (r = "for='" + a + "'"), i.addClass("label-floating"), o.after("<label " + r + "class='control-label'>" + e + "</label>");
        }(null === o.val() || "undefined" == o.val() || "" === o.val()) && i.addClass("is-empty"), i.append("<span class='material-input'></span>"), i.find("input[type=file]").length > 0 && i.addClass("is-fileinput");
      });
    }, attachInputEventHandlers: function attachInputEventHandlers() {
      var n = this.options.validate;t(document).on("change", ".checkbox input[type=checkbox]", function () {
        t(this).blur();
      }).on("keydown paste", ".form-control", function (i) {
        o(i) && t(this).closest(".form-group").removeClass("is-empty");
      }).on("keyup change", ".form-control", function () {
        var o = t(this),
            i = o.closest(".form-group"),
            e = "undefined" == typeof o[0].checkValidity || o[0].checkValidity();"" === o.val() ? i.addClass("is-empty") : i.removeClass("is-empty"), n && (e ? i.removeClass("has-error") : i.addClass("has-error"));
      }).on("focus", ".form-control, .form-group.is-fileinput", function () {
        i(this);
      }).on("blur", ".form-control, .form-group.is-fileinput", function () {
        e(this);
      }).on("change", ".form-group input", function () {
        var o = t(this);if ("file" != o.attr("type")) {
          var i = o.closest(".form-group"),
              n = o.val();n ? i.removeClass("is-empty") : i.addClass("is-empty");
        }
      }).on("change", ".form-group.is-fileinput input[type='file']", function () {
        var o = t(this),
            i = o.closest(".form-group"),
            n = "";t.each(this.files, function (t, o) {
          n += o.name + ", ";
        }), n = n.substring(0, n.length - 2), n ? i.removeClass("is-empty") : i.addClass("is-empty"), i.find("input.form-control[readonly]").val(n);
      });
    }, ripples: function ripples(o) {
      t(o ? o : this.options.withRipples).ripples();
    }, autofill: function autofill() {
      var o = setInterval(function () {
        t("input[type!=checkbox]").each(function () {
          var o = t(this);o.val() && o.val() !== o.attr("value") && o.trigger("change");
        });
      }, 100);setTimeout(function () {
        clearInterval(o);
      }, 1e4);
    }, attachAutofillEventHandlers: function attachAutofillEventHandlers() {
      var o;t(document).on("focus", "input", function () {
        var i = t(this).parents("form").find("input").not("[type=file]");o = setInterval(function () {
          i.each(function () {
            var o = t(this);o.val() !== o.attr("value") && o.trigger("change");
          });
        }, 100);
      }).on("blur", ".form-group input", function () {
        clearInterval(o);
      });
    }, init: function init(o) {
      this.options = t.extend({}, this.options, o);var i = t(document);t.fn.ripples && this.options.ripples && this.ripples(), this.options.input && (this.input(), this.attachInputEventHandlers()), this.options.checkbox && this.checkbox(), this.options.togglebutton && this.togglebutton(), this.options.radio && this.radio(), this.options.autofill && (this.autofill(), this.attachAutofillEventHandlers()), document.arrive && this.options.arrive && (t.fn.ripples && this.options.ripples && i.arrive(this.options.withRipples, function () {
        t.material.ripples(t(this));
      }), this.options.input && i.arrive(this.options.inputElements, function () {
        t.material.input(t(this));
      }), this.options.checkbox && i.arrive(this.options.checkboxElements, function () {
        t.material.checkbox(t(this));
      }), this.options.radio && i.arrive(this.options.radioElements, function () {
        t.material.radio(t(this));
      }), this.options.togglebutton && i.arrive(this.options.togglebuttonElements, function () {
        t.material.togglebutton(t(this));
      }));
    } };
}(jQuery), function (t, o, i, n) {
  "use strict";
  function e(o, i) {
    r = this, this.element = t(o), this.options = t.extend({}, s, i), this._defaults = s, this._name = a, this.init();
  }var a = "ripples",
      r = null,
      s = {};e.prototype.init = function () {
    var i = this.element;i.on("mousedown touchstart", function (n) {
      if (!r.isTouch() || "mousedown" !== n.type) {
        i.find(".ripple-container").length || i.append('<div class="ripple-container"></div>');var e = i.children(".ripple-container"),
            a = r.getRelY(e, n),
            s = r.getRelX(e, n);if (a || s) {
          var l = r.getRipplesColor(i),
              p = t("<div></div>");p.addClass("ripple").css({ left: s, top: a, "background-color": l }), e.append(p), function () {
            return o.getComputedStyle(p[0]).opacity;
          }(), r.rippleOn(i, p), setTimeout(function () {
            r.rippleEnd(p);
          }, 500), i.on("mouseup mouseleave touchend", function () {
            p.data("mousedown", "off"), "off" === p.data("animating") && r.rippleOut(p);
          });
        }
      }
    });
  }, e.prototype.getNewSize = function (t, o) {
    return Math.max(t.outerWidth(), t.outerHeight()) / o.outerWidth() * 2.5;
  }, e.prototype.getRelX = function (t, o) {
    var i = t.offset();return r.isTouch() ? (o = o.originalEvent, 1 === o.touches.length ? o.touches[0].pageX - i.left : !1) : o.pageX - i.left;
  }, e.prototype.getRelY = function (t, o) {
    var i = t.offset();return r.isTouch() ? (o = o.originalEvent, 1 === o.touches.length ? o.touches[0].pageY - i.top : !1) : o.pageY - i.top;
  }, e.prototype.getRipplesColor = function (t) {
    var i = t.data("ripple-color") ? t.data("ripple-color") : o.getComputedStyle(t[0]).color;return i;
  }, e.prototype.hasTransitionSupport = function () {
    var t = i.body || i.documentElement,
        o = t.style,
        e = o.transition !== n || o.WebkitTransition !== n || o.MozTransition !== n || o.MsTransition !== n || o.OTransition !== n;return e;
  }, e.prototype.isTouch = function () {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  }, e.prototype.rippleEnd = function (t) {
    t.data("animating", "off"), "off" === t.data("mousedown") && r.rippleOut(t);
  }, e.prototype.rippleOut = function (t) {
    t.off(), r.hasTransitionSupport() ? t.addClass("ripple-out") : t.animate({ opacity: 0 }, 100, function () {
      t.trigger("transitionend");
    }), t.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
      t.remove();
    });
  }, e.prototype.rippleOn = function (t, o) {
    var i = r.getNewSize(t, o);r.hasTransitionSupport() ? o.css({ "-ms-transform": "scale(" + i + ")", "-moz-transform": "scale(" + i + ")", "-webkit-transform": "scale(" + i + ")", transform: "scale(" + i + ")" }).addClass("ripple-on").data("animating", "on").data("mousedown", "on") : o.animate({ width: 2 * Math.max(t.outerWidth(), t.outerHeight()), height: 2 * Math.max(t.outerWidth(), t.outerHeight()), "margin-left": -1 * Math.max(t.outerWidth(), t.outerHeight()), "margin-top": -1 * Math.max(t.outerWidth(), t.outerHeight()), opacity: .2 }, 500, function () {
      o.trigger("transitionend");
    });
  }, t.fn.ripples = function (o) {
    return this.each(function () {
      t.data(this, "plugin_" + a) || t.data(this, "plugin_" + a, new e(this, o));
    });
  };
}(jQuery, window, document);
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*

$.Link (part of noUiSlider) - WTFPL */
(function (c) {
  function m(a, c, d) {
    if ((a[c] || a[d]) && a[c] === a[d]) throw Error("(Link) '" + c + "' can't match '" + d + "'.'");
  }function r(a) {
    void 0 === a && (a = {});if ("object" !== (typeof a === "undefined" ? "undefined" : _typeof(a))) throw Error("(Format) 'format' option must be an object.");var h = {};c(u).each(function (c, n) {
      if (void 0 === a[n]) h[n] = A[c];else if (_typeof(a[n]) === _typeof(A[c])) {
        if ("decimals" === n && (0 > a[n] || 7 < a[n])) throw Error("(Format) 'format.decimals' option must be between 0 and 7.");h[n] = a[n];
      } else throw Error("(Format) 'format." + n + "' must be a " + _typeof(A[c]) + ".");
    });m(h, "mark", "thousand");m(h, "prefix", "negative");m(h, "prefix", "negativeBefore");this.r = h;
  }function k(a, h) {
    "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a)) && c.error("(Link) Initialize with an object.");return new k.prototype.p(a.target || function () {}, a.method, a.format || {}, h);
  }var u = "decimals mark thousand prefix postfix encoder decoder negative negativeBefore to from".split(" "),
      A = [2, ".", "", "", "", function (a) {
    return a;
  }, function (a) {
    return a;
  }, "-", "", function (a) {
    return a;
  }, function (a) {
    return a;
  }];r.prototype.a = function (a) {
    return this.r[a];
  };
  r.prototype.L = function (a) {
    function c(a) {
      return a.split("").reverse().join("");
    }a = this.a("encoder")(a);var d = this.a("decimals"),
        n = "",
        k = "",
        m = "",
        r = "";0 === parseFloat(a.toFixed(d)) && (a = "0");0 > a && (n = this.a("negative"), k = this.a("negativeBefore"));a = Math.abs(a).toFixed(d).toString();a = a.split(".");this.a("thousand") ? (m = c(a[0]).match(/.{1,3}/g), m = c(m.join(c(this.a("thousand"))))) : m = a[0];this.a("mark") && 1 < a.length && (r = this.a("mark") + a[1]);return this.a("to")(k + this.a("prefix") + n + m + r + this.a("postfix"));
  };r.prototype.w = function (a) {
    function c(a) {
      return a.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g, "\\$&");
    }var d;if (null === a || void 0 === a) return !1;a = this.a("from")(a);a = a.toString();d = a.replace(RegExp("^" + c(this.a("negativeBefore"))), "");a !== d ? (a = d, d = "-") : d = "";a = a.replace(RegExp("^" + c(this.a("prefix"))), "");this.a("negative") && (d = "", a = a.replace(RegExp("^" + c(this.a("negative"))), "-"));a = a.replace(RegExp(c(this.a("postfix")) + "$"), "").replace(RegExp(c(this.a("thousand")), "g"), "").replace(this.a("mark"), ".");a = this.a("decoder")(parseFloat(d + a));return isNaN(a) ? !1 : a;
  };k.prototype.K = function (a, h) {
    this.method = h || "html";this.j = c(a.replace("-tooltip-", "") || "<div/>")[0];
  };k.prototype.H = function (a) {
    this.method = "val";this.j = document.createElement("input");this.j.name = a;this.j.type = "hidden";
  };k.prototype.G = function (a) {
    function h(a, c) {
      return [c ? null : a, c ? a : null];
    }var d = this;this.method = "val";this.target = a.on("change", function (a) {
      d.B.val(h(c(a.target).val(), d.t), { link: d, set: !0 });
    });
  };k.prototype.p = function (a, h, d, k) {
    this.g = d;this.update = !k;if ("string" === typeof a && 0 === a.indexOf("-tooltip-")) this.K(a, h);else if ("string" === typeof a && 0 !== a.indexOf("-")) this.H(a);else if ("function" === typeof a) this.target = !1, this.method = a;else {
      if (a instanceof c || c.zepto && c.zepto.isZ(a)) {
        if (!h) {
          if (a.is("input, select, textarea")) {
            this.G(a);return;
          }h = "html";
        }if ("function" === typeof h || "string" === typeof h && a[h]) {
          this.method = h;this.target = a;return;
        }
      }throw new RangeError("(Link) Invalid Link.");
    }
  };k.prototype.write = function (a, c, d, k) {
    if (!this.update || !1 !== k) if (this.u = a, this.F = a = this.format(a), "function" === typeof this.method) this.method.call(this.target[0] || d[0], a, c, d);else this.target[this.method](a, c, d);
  };k.prototype.q = function (a) {
    this.g = new r(c.extend({}, a, this.g instanceof r ? this.g.r : this.g));
  };k.prototype.J = function (a) {
    this.B = a;
  };k.prototype.I = function (a) {
    this.t = a;
  };k.prototype.format = function (a) {
    return this.g.L(a);
  };k.prototype.A = function (a) {
    return this.g.w(a);
  };k.prototype.p.prototype = k.prototype;c.Link = k;
})(window.jQuery || window.Zepto); /*
                                   $.fn.noUiSlider - WTFPL - refreshless.com/nouislider/ */
(function (c) {
  function m(e) {
    return "number" === typeof e && !isNaN(e) && isFinite(e);
  }function r(e) {
    return c.isArray(e) ? e : [e];
  }function k(e, b) {
    e.addClass(b);setTimeout(function () {
      e.removeClass(b);
    }, 300);
  }function u(e, b) {
    return 100 * b / (e[1] - e[0]);
  }function A(e, b) {
    if (b >= e.d.slice(-1)[0]) return 100;for (var a = 1, c, f, d; b >= e.d[a];) {
      a++;
    }c = e.d[a - 1];f = e.d[a];d = e.c[a - 1];c = [c, f];return d + u(c, 0 > c[0] ? b + Math.abs(c[0]) : b - c[0]) / (100 / (e.c[a] - d));
  }function a(e, b) {
    if (100 <= b) return e.d.slice(-1)[0];for (var a = 1, c, f, d; b >= e.c[a];) {
      a++;
    }c = e.d[a - 1];f = e.d[a];d = e.c[a - 1];c = [c, f];return 100 / (e.c[a] - d) * (b - d) * (c[1] - c[0]) / 100 + c[0];
  }function h(a, b) {
    for (var c = 1, g; (a.dir ? 100 - b : b) >= a.c[c];) {
      c++;
    }if (a.m) return g = a.c[c - 1], c = a.c[c], b - g > (c - g) / 2 ? c : g;a.h[c - 1] ? (g = a.h[c - 1], c = a.c[c - 1] + Math.round((b - a.c[c - 1]) / g) * g) : c = b;return c;
  }function d(a, b) {
    if (!m(b)) throw Error("noUiSlider: 'step' is not numeric.");a.h[0] = b;
  }function n(a, b) {
    if ("object" !== (typeof b === "undefined" ? "undefined" : _typeof(b)) || c.isArray(b)) throw Error("noUiSlider: 'range' is not an object.");if (void 0 === b.min || void 0 === b.max) throw Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
    c.each(b, function (b, g) {
      var d;"number" === typeof g && (g = [g]);if (!c.isArray(g)) throw Error("noUiSlider: 'range' contains invalid value.");d = "min" === b ? 0 : "max" === b ? 100 : parseFloat(b);if (!m(d) || !m(g[0])) throw Error("noUiSlider: 'range' value isn't numeric.");a.c.push(d);a.d.push(g[0]);d ? a.h.push(isNaN(g[1]) ? !1 : g[1]) : isNaN(g[1]) || (a.h[0] = g[1]);
    });c.each(a.h, function (b, c) {
      if (!c) return !0;a.h[b] = u([a.d[b], a.d[b + 1]], c) / (100 / (a.c[b + 1] - a.c[b]));
    });
  }function E(a, b) {
    "number" === typeof b && (b = [b]);if (!c.isArray(b) || !b.length || 2 < b.length) throw Error("noUiSlider: 'start' option is incorrect.");a.b = b.length;a.start = b;
  }function I(a, b) {
    a.m = b;if ("boolean" !== typeof b) throw Error("noUiSlider: 'snap' option must be a boolean.");
  }function J(a, b) {
    if ("lower" === b && 1 === a.b) a.i = 1;else if ("upper" === b && 1 === a.b) a.i = 2;else if (!0 === b && 2 === a.b) a.i = 3;else if (!1 === b) a.i = 0;else throw Error("noUiSlider: 'connect' option doesn't match handle count.");
  }function D(a, b) {
    switch (b) {case "horizontal":
        a.k = 0;break;case "vertical":
        a.k = 1;break;default:
        throw Error("noUiSlider: 'orientation' option is invalid.");
    }
  }function K(a, b) {
    if (2 < a.c.length) throw Error("noUiSlider: 'margin' option is only supported on linear sliders.");a.margin = u(a.d, b);if (!m(b)) throw Error("noUiSlider: 'margin' option must be numeric.");
  }function L(a, b) {
    switch (b) {case "ltr":
        a.dir = 0;break;case "rtl":
        a.dir = 1;a.i = [0, 2, 1, 3][a.i];break;default:
        throw Error("noUiSlider: 'direction' option was not recognized.");}
  }function M(a, b) {
    if ("string" !== typeof b) throw Error("noUiSlider: 'behaviour' must be a string containing options.");var c = 0 <= b.indexOf("snap");
    a.n = { s: 0 <= b.indexOf("tap") || c, extend: 0 <= b.indexOf("extend"), v: 0 <= b.indexOf("drag"), fixed: 0 <= b.indexOf("fixed"), m: c };
  }function N(a, b, d) {
    a.o = [b.lower, b.upper];a.g = b.format;c.each(a.o, function (a, e) {
      if (!c.isArray(e)) throw Error("noUiSlider: 'serialization." + (a ? "upper" : "lower") + "' must be an array.");c.each(e, function () {
        if (!(this instanceof c.Link)) throw Error("noUiSlider: 'serialization." + (a ? "upper" : "lower") + "' can only contain Link instances.");this.I(a);this.J(d);this.q(b.format);
      });
    });a.dir && 1 < a.b && a.o.reverse();
  }
  function O(a, b) {
    var f = { c: [], d: [], h: [!1], margin: 0 },
        g;g = { step: { e: !1, f: d }, start: { e: !0, f: E }, connect: { e: !0, f: J }, direction: { e: !0, f: L }, range: { e: !0, f: n }, snap: { e: !1, f: I }, orientation: { e: !1, f: D }, margin: { e: !1, f: K }, behaviour: { e: !0, f: M }, serialization: { e: !0, f: N } };a = c.extend({ connect: !1, direction: "ltr", behaviour: "tap", orientation: "horizontal" }, a);a.serialization = c.extend({ lower: [], upper: [], format: {} }, a.serialization);c.each(g, function (c, d) {
      if (void 0 === a[c]) {
        if (d.e) throw Error("noUiSlider: '" + c + "' is required.");
        return !0;
      }d.f(f, a[c], b);
    });f.style = f.k ? "top" : "left";return f;
  }function P(a, b) {
    var d = c("<div><div/></div>").addClass(f[2]),
        g = ["-lower", "-upper"];a.dir && g.reverse();d.children().addClass(f[3] + " " + f[3] + g[b]);return d;
  }function Q(a, b) {
    b.j && (b = new c.Link({ target: c(b.j).clone().appendTo(a), method: b.method, format: b.g }, !0));return b;
  }function R(a, b) {
    var d,
        f = [];for (d = 0; d < a.b; d++) {
      var k = f,
          h = d,
          m = a.o[d],
          n = b[d].children(),
          r = a.g,
          s = void 0,
          v = [],
          s = new c.Link({}, !0);s.q(r);v.push(s);for (s = 0; s < m.length; s++) {
        v.push(Q(n, m[s]));
      }k[h] = v;
    }return f;
  }function S(a, b, c) {
    switch (a) {case 1:
        b.addClass(f[7]);c[0].addClass(f[6]);break;case 3:
        c[1].addClass(f[6]);case 2:
        c[0].addClass(f[7]);case 0:
        b.addClass(f[6]);}
  }function T(a, b) {
    var c,
        d = [];for (c = 0; c < a.b; c++) {
      d.push(P(a, c).appendTo(b));
    }return d;
  }function U(a, b) {
    b.addClass([f[0], f[8 + a.dir], f[4 + a.k]].join(" "));return c("<div/>").appendTo(b).addClass(f[1]);
  }function V(d, b, m) {
    function g() {
      return t[["width", "height"][b.k]]();
    }function n(a) {
      var b,
          c = [q.val()];for (b = 0; b < a.length; b++) {
        q.trigger(a[b], c);
      }
    }function u(d, p, e) {
      var g = d[0] !== l[0][0] ? 1 : 0,
          H = x[0] + b.margin,
          k = x[1] - b.margin;e && 1 < l.length && (p = g ? Math.max(p, H) : Math.min(p, k));100 > p && (p = h(b, p));p = Math.max(Math.min(parseFloat(p.toFixed(7)), 100), 0);if (p === x[g]) return 1 === l.length ? !1 : p === H || p === k ? 0 : !1;d.css(b.style, p + "%");d.is(":first-child") && d.toggleClass(f[17], 50 < p);x[g] = p;b.dir && (p = 100 - p);c(y[g]).each(function () {
        this.write(a(b, p), d.children(), q);
      });return !0;
    }function B(a, b, c) {
      c || k(q, f[14]);u(a, b, !1);n(["slide", "set", "change"]);
    }function w(a, c, d, e) {
      a = a.replace(/\s/g, ".nui ") + ".nui";c.on(a, function (a) {
        var c = q.attr("disabled");if (q.hasClass(f[14]) || void 0 !== c && null !== c) return !1;a.preventDefault();var c = 0 === a.type.indexOf("touch"),
            p = 0 === a.type.indexOf("mouse"),
            F = 0 === a.type.indexOf("pointer"),
            g,
            k,
            l = a;0 === a.type.indexOf("MSPointer") && (F = !0);a.originalEvent && (a = a.originalEvent);c && (g = a.changedTouches[0].pageX, k = a.changedTouches[0].pageY);if (p || F) F || void 0 !== window.pageXOffset || (window.pageXOffset = document.documentElement.scrollLeft, window.pageYOffset = document.documentElement.scrollTop), g = a.clientX + window.pageXOffset, k = a.clientY + window.pageYOffset;l.C = [g, k];l.cursor = p;a = l;a.l = a.C[b.k];d(a, e);
      });
    }function C(a, c) {
      var b = c.b || l,
          d,
          e = !1,
          e = 100 * (a.l - c.start) / g(),
          f = b[0][0] !== l[0][0] ? 1 : 0;var k = c.D;d = e + k[0];e += k[1];1 < b.length ? (0 > d && (e += Math.abs(d)), 100 < e && (d -= e - 100), d = [Math.max(Math.min(d, 100), 0), Math.max(Math.min(e, 100), 0)]) : d = [d, e];e = u(b[0], d[f], 1 === b.length);1 < b.length && (e = u(b[1], d[f ? 0 : 1], !1) || e);e && n(["slide"]);
    }function s(a) {
      c("." + f[15]).removeClass(f[15]);
      a.cursor && c("body").css("cursor", "").off(".nui");G.off(".nui");q.removeClass(f[12]);n(["set", "change"]);
    }function v(a, b) {
      1 === b.b.length && b.b[0].children().addClass(f[15]);a.stopPropagation();w(z.move, G, C, { start: a.l, b: b.b, D: [x[0], x[l.length - 1]] });w(z.end, G, s, null);a.cursor && (c("body").css("cursor", c(a.target).css("cursor")), 1 < l.length && q.addClass(f[12]), c("body").on("selectstart.nui", !1));
    }function D(a) {
      var d = a.l,
          e = 0;a.stopPropagation();c.each(l, function () {
        e += this.offset()[b.style];
      });e = d < e / 2 || 1 === l.length ? 0 : 1;d -= t.offset()[b.style];d = 100 * d / g();B(l[e], d, b.n.m);b.n.m && v(a, { b: [l[e]] });
    }function E(a) {
      var c = (a = a.l < t.offset()[b.style]) ? 0 : 100;a = a ? 0 : l.length - 1;B(l[a], c, !1);
    }var q = c(d),
        x = [-1, -1],
        t,
        y,
        l;if (q.hasClass(f[0])) throw Error("Slider was already initialized.");t = U(b, q);l = T(b, t);y = R(b, l);S(b.i, q, l);(function (a) {
      var b;if (!a.fixed) for (b = 0; b < l.length; b++) {
        w(z.start, l[b].children(), v, { b: [l[b]] });
      }a.s && w(z.start, t, D, { b: l });a.extend && (q.addClass(f[16]), a.s && w(z.start, q, E, { b: l }));a.v && (b = t.find("." + f[7]).addClass(f[10]), a.fixed && (b = b.add(t.children().not(b).children())), w(z.start, b, v, { b: l }));
    })(b.n);d.vSet = function () {
      var a = Array.prototype.slice.call(arguments, 0),
          d,
          e,
          g,
          h,
          m,
          s,
          t = r(a[0]);"object" === _typeof(a[1]) ? (d = a[1].set, e = a[1].link, g = a[1].update, h = a[1].animate) : !0 === a[1] && (d = !0);b.dir && 1 < b.b && t.reverse();h && k(q, f[14]);a = 1 < l.length ? 3 : 1;1 === t.length && (a = 1);for (m = 0; m < a; m++) {
        h = e || y[m % 2][0], h = h.A(t[m % 2]), !1 !== h && (h = A(b, h), b.dir && (h = 100 - h), !0 !== u(l[m % 2], h, !0) && c(y[m % 2]).each(function (a) {
          if (!a) return s = this.u, !0;this.write(s, l[m % 2].children(), q, g);
        }));
      }!0 === d && n(["set"]);return this;
    };d.vGet = function () {
      var a,
          c = [];for (a = 0; a < b.b; a++) {
        c[a] = y[a][0].F;
      }return 1 === c.length ? c[0] : b.dir ? c.reverse() : c;
    };d.destroy = function () {
      c.each(y, function () {
        c.each(this, function () {
          this.target && this.target.off(".nui");
        });
      });c(this).off(".nui").removeClass(f.join(" ")).empty();return m;
    };q.val(b.start);
  }function W(a) {
    if (!this.length) throw Error("noUiSlider: Can't initialize slider on empty selection.");var b = O(a, this);return this.each(function () {
      V(this, b, a);
    });
  }function X(a) {
    return this.each(function () {
      var b = c(this).val(),
          d = this.destroy(),
          f = c.extend({}, d, a);c(this).noUiSlider(f);d.start === f.start && c(this).val(b);
    });
  }function B() {
    return this[0][arguments.length ? "vSet" : "vGet"].apply(this[0], arguments);
  }var G = c(document),
      C = c.fn.val,
      z = window.navigator.pointerEnabled ? { start: "pointerdown", move: "pointermove", end: "pointerup" } : window.navigator.msPointerEnabled ? { start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp" } : { start: "mousedown touchstart", move: "mousemove touchmove",
    end: "mouseup touchend" },
      f = "noUi-target noUi-base noUi-origin noUi-handle noUi-horizontal noUi-vertical noUi-background noUi-connect noUi-ltr noUi-rtl noUi-dragable  noUi-state-drag  noUi-state-tap noUi-active noUi-extended noUi-stacking".split(" ");c.fn.val = function () {
    var a = arguments,
        b = c(this[0]);return arguments.length ? this.each(function () {
      (c(this).hasClass(f[0]) ? B : C).apply(c(this), a);
    }) : (b.hasClass(f[0]) ? B : C).call(b);
  };c.noUiSlider = { Link: c.Link };c.fn.noUiSlider = function (a, b) {
    return (b ? X : W).call(this, a);
  };
})(window.jQuery || window.Zepto);