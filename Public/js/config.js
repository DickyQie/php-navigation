var T, baidu = T = baidu || {
        version: "1.5.0"
    };
baidu.guid = "$BAIDU$";
window[baidu.guid] = window[baidu.guid] || {};
baidu.array = baidu.array || {};
baidu.each = baidu.array.forEach = baidu.array.each = function(A, $, _) {
    var C, B, E, D = A.length;
    if ("function" == typeof $) for (E = 0; E < D; E++) {
        B = A[E];
        C = $.call(_ || A, B, E);
        if (C === false) break
    }
    return A
};
baidu.array.unique = function(_, C) {
    var A = _.length,
        $ = _.slice(0),
        D,
        B;
    if ("function" != typeof C) C = function(_, $) {
        return _ === $
    };
    while (--A > 0) {
        B = $[A];
        D = A;
        while (D--) if (C(B, $[D])) {
            $.splice(A, 1);
            break
        }
    }
    return $
};
baidu.string = baidu.string || {};
baidu.string.decodeHTML = function(_) {
    var $ = String(_).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    return $.replace(/&#([\d]+);/g,
        function($, _) {
            return String.fromCharCode(parseInt(_, 10))
        })
};
baidu.decodeHTML = baidu.string.decodeHTML;
baidu.string.encodeHTML = function($) {
    return String($).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
};
baidu.encodeHTML = baidu.string.encodeHTML;
baidu.string.escapeReg = function($) {
    return String($).replace(new RegExp("([.*+?^=!:${}()|[\\]/\\\\])", "g"), "\\$1")
};
baidu.string.format = function(_, $) {
    _ = String(_);
    var A = Array.prototype.slice.call(arguments, 1),
        B = Object.prototype.toString;
    if (A.length) {
        A = A.length == 1 ? ($ !== null && (/\[object Array\]|\[object Object\]/.test(B.call($))) ? $: A) : A;
        return _.replace(/#\{(.+?)\}/g,
            function(_, C) {
                var $ = A[C];
                if ("[object Function]" == B.call($)) $ = $(C);
                return ("undefined" == typeof $ ? "": $)
            })
    }
    return _
};
baidu.format = baidu.string.format;
baidu.string.getByteLength = function($) {
    return String($).replace(/[^\x00-\xff]/g, "ci").length
};
baidu.string.subByte = function($, _, A) {
    $ = String($);
    A = A || "";
    if (_ < 0 || baidu.string.getByteLength($) <= _) return $ + A;
    $ = $.substr(0, _).replace(/([^\x00-\xff])/g, "$1 ").substr(0, _).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "$1");
    return $ + A
};
baidu.string.toCamelCase = function($) {
    if ($.indexOf("-") < 0 && $.indexOf("_") < 0) return $;
    return $.replace(/[-_][^-_]/g,
        function($) {
            return $.charAt(1).toUpperCase()
        })
}; (function() {
    var $ = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
    baidu.string.trim = function(_) {
        return String(_).replace($, "")
    }
})();
baidu.trim = baidu.string.trim;
baidu.string.wbr = function($) {
    return String($).replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, "$&<wbr>").replace(/><wbr>/g, ">")
};
baidu.ajax = baidu.ajax || {};
baidu.fn = baidu.fn || {};
baidu.fn.blank = function() {};
baidu.ajax.request = function(D, I) {
    var P = I || {},
        A = P.data || "",
        E = !(P.async === false),
        G = P.username || "",
        B = P.password || "",
        M = (P.method || "GET").toUpperCase(),
        $ = P.headers || {},
        O = P.timeout || 0,
        K = {},
        F,
        N,
        L;
    function H() {
        if (L.readyState == 4) {
            try {
                var _ = L.status
            } catch($) {
                C("failure");
                return
            }
            C(_);
            if ((_ >= 200 && _ < 300) || _ == 304 || _ == 1223) C("success");
            else C("failure");
            window.setTimeout(function() {
                    L.onreadystatechange = baidu.fn.blank;
                    if (E) L = null
                },
                0)
        }
    }
    function J() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP")
            } catch($) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch($) {}
            }
        }
        if (window.XMLHttpRequest) return new XMLHttpRequest()
    }
    function C(A) {
        A = "on" + A;
        var B = K[A],
            _ = baidu.ajax[A];
        if (B) {
            if (F) clearTimeout(F);
            if (A != "onsuccess") B(L);
            else {
                try {
                    L.responseText
                } catch($) {
                    return B(L)
                }
                B(L, L.responseText)
            }
        } else if (_) {
            if (A == "onsuccess") return;
            _(L)
        }
    }
    for (N in P) K[N] = P[N];
    $["X-Requested-With"] = "XMLHttpRequest";
    try {
        L = J();
        if (M == "GET") {
            if (A) {
                D += (D.indexOf("?") >= 0 ? "&": "?") + A;
                A = null
            }
            if (P.noCache) D += (D.indexOf("?") >= 0 ? "&": "?") + "b" + ( + new Date) + "=1"
        }
        if (G) L.open(M, D, E, G, B);
        else L.open(M, D, E);
        if (E) L.onreadystatechange = H;
        if (M == "POST") L.setRequestHeader("Content-Type", ($["Content-Type"] || "application/x-www-form-urlencoded"));
        for (N in $) if ($.hasOwnProperty(N)) L.setRequestHeader(N, $[N]);
        C("beforerequest");
        if (O) F = setTimeout(function() {
                L.onreadystatechange = baidu.fn.blank;
                L.abort();
                C("timeout")
            },
            O);
        L.send(A);
        if (!E) H()
    } catch(_) {
        C("failure")
    }
    return L
};
baidu.ajax.post = function(A, $, _) {
    return baidu.ajax.request(A, {
        onsuccess: _,
        method: "POST",
        data: $
    })
};
baidu.ajax.get = function(_, $) {
    return baidu.ajax.request(_, {
        onsuccess: $
    })
};
baidu.cookie = baidu.cookie || {};
baidu.cookie._isValidKey = function($) {
    return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$')).test($)
};
baidu.cookie.getRaw = function(A) {
    if (baidu.cookie._isValidKey(A)) {
        var _ = new RegExp("(^| )" + A + "=([^;]*)(;|$)"),
            $ = _.exec(document.cookie);
        if ($) return $[2] || null
    }
    return null
};
baidu.cookie.get = function(_) {
    var $ = baidu.cookie.getRaw(_);
    if ("string" == typeof $) {
        $ = decodeURIComponent($);
        return $
    }
    return null
};
baidu.cookie.setRaw = function(A, _, B) {
    if (!baidu.cookie._isValidKey(A)) return;
    B = B || {};
    var $ = B.expires;
    if ("number" == typeof B.expires) {
        $ = new Date();
        $.setTime($.getTime() + B.expires)
    }
    document.cookie = A + "=" + _ + (B.path ? "; path=" + B.path: "") + ($ ? "; expires=" + $.toGMTString() : "") + (B.domain ? "; domain=" + B.domain: "") + (B.secure ? "; secure": "")
};
baidu.cookie.remove = function($, _) {
    _ = _ || {};
    _.expires = new Date(0);
    baidu.cookie.setRaw($, "", _)
};
baidu.cookie.set = function(_, $, A) {
    baidu.cookie.setRaw(_, encodeURIComponent($), A)
};
baidu.date = baidu.date || {};
baidu.number = baidu.number || {};
baidu.number.pad = function($, B) {
    var _ = "",
        C = ($ < 0),
        A = String(Math.abs($));
    if (A.length < B) _ = (new Array(B - A.length + 1)).join("0");
    return (C ? "-": "") + _ + A
};
baidu.date.format = function(C, B) {
    if ("string" != typeof B) return C.toString();
    function _($, _) {
        B = B.replace($, _)
    }
    var $ = baidu.number.pad,
        H = C.getFullYear(),
        F = C.getMonth() + 1,
        G = C.getDate(),
        E = C.getHours(),
        A = C.getMinutes(),
        D = C.getSeconds();
    _(/yyyy/g, $(H, 4));
    _(/yy/g, $(parseInt(H.toString().slice(2), 10), 2));
    _(/MM/g, $(F, 2));
    _(/M/g, F);
    _(/dd/g, $(G, 2));
    _(/d/g, G);
    _(/HH/g, $(E, 2));
    _(/H/g, E);
    _(/hh/g, $(E % 12, 2));
    _(/h/g, E % 12);
    _(/mm/g, $(A, 2));
    _(/m/g, A);
    _(/ss/g, $(D, 2));
    _(/s/g, D);
    return B
};
baidu.date.parse = function(B) {
    var C = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+$");
    if ("string" == typeof B) if (C.test(B) || isNaN(Date.parse(B))) {
        var A = B.split(/ |T/),
            _ = A.length > 1 ? A[1].split(/[^\d]/) : [0, 0, 0],
            $ = A[0].split(/[^\d]/);
        return new Date($[0] - 0, $[1] - 1, $[2] - 0, _[0] - 0, _[1] - 0, _[2] - 0)
    } else return new Date(B);
    return new Date()
};
baidu.dom = baidu.dom || {};
baidu.dom.g = function($) {
    if ("string" == typeof $ || $ instanceof String) return document.getElementById($);
    else if ($ && $.nodeName && ($.nodeType == 1 || $.nodeType == 9)) return $;
    return null
};
baidu.g = baidu.G = baidu.dom.g;
baidu.dom.addClass = function(A, C) {
    A = baidu.dom.g(A);
    var $ = C.split(/\s+/),
        _ = A.className,
        D = " " + _ + " ",
        E = 0,
        B = $.length;
    for (; E < B; E++) if (D.indexOf(" " + $[E] + " ") < 0) _ += (_ ? " ": "") + $[E];
    A.className = _;
    return A
};
baidu.addClass = baidu.dom.addClass;
baidu.lang = baidu.lang || {};
baidu.lang.isString = function($) {
    return "[object String]" == Object.prototype.toString.call($)
};
baidu.isString = baidu.lang.isString;
baidu.dom._g = function($) {
    if (baidu.lang.isString($)) return document.getElementById($);
    return $
};
baidu._g = baidu.dom._g;
baidu.dom.contains = function(_, A) {
    var $ = baidu.dom._g;
    _ = $(_);
    A = $(A);
    return _.contains ? _ != A && _.contains(A) : !!(_.compareDocumentPosition(A) & 16)
};
baidu.dom.getDocument = function($) {
    $ = baidu.dom.g($);
    return $.nodeType == 9 ? $: $.ownerDocument || $.document
};
baidu.browser = baidu.browser || {};
baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || +RegExp.$1) : undefined;
baidu.dom.getComputedStyle = function($, B) {
    $ = baidu.dom._g($);
    var _ = baidu.dom.getDocument($),
        A;
    if (_.defaultView && _.defaultView.getComputedStyle) {
        A = _.defaultView.getComputedStyle($, null);
        if (A) return A[B] || A.getPropertyValue(B)
    }
    return ""
};
baidu.dom._styleFixer = baidu.dom._styleFixer || {};
baidu.dom._styleFilter = baidu.dom._styleFilter || [];
baidu.dom._styleFilter.filter = function(C, $, _) {
    for (var D = 0,
             B = baidu.dom._styleFilter,
             A; A = B[D]; D++) if (A = A[_]) $ = A(C, $);
    return $
};
baidu.dom.getStyle = function($, C) {
    var A = baidu.dom;
    $ = A.g($);
    C = baidu.string.toCamelCase(C);
    var B = $.style[C] || ($.currentStyle ? $.currentStyle[C] : "") || A.getComputedStyle($, C);
    if (!B) {
        var _ = A._styleFixer[C];
        if (_) B = _.get ? _.get($) : baidu.dom.getStyle($, _)
    }
    if (_ = A._styleFilter) B = _.filter(C, B, "get");
    return B
};
baidu.getStyle = baidu.dom.getStyle;
baidu.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ? +(RegExp.$6 || RegExp.$2) : undefined;
baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
baidu.browser.isStrict = document.compatMode == "CSS1Compat";
baidu.dom.getParent = function($) {
    $ = baidu.dom._g($);
    return $.parentElement || $.parentNode || null
};
baidu.dom.getPosition = function($) {
    $ = baidu.dom.g($);
    var G = baidu.dom.getDocument($),
        H = baidu.browser,
        C = baidu.dom.getStyle,
        J = H.isGecko > 0 && G.getBoxObjectFor && C($, "position") == "absolute" && ($.style.top === "" || $.style.left === ""),
        D = {
            left: 0,
            top: 0
        },
        _ = (H.ie && !H.isStrict) ? G.body: G.documentElement,
        B,
        I;
    if ($ == _) return D;
    if ($.getBoundingClientRect) {
        I = $.getBoundingClientRect();
        D.left = Math.floor(I.left) + Math.max(G.documentElement.scrollLeft, G.body.scrollLeft);
        D.top = Math.floor(I.top) + Math.max(G.documentElement.scrollTop, G.body.scrollTop);
        D.left -= G.documentElement.clientLeft;
        D.top -= G.documentElement.clientTop;
        var A = G.body,
            F = parseInt(C(A, "borderLeftWidth")),
            E = parseInt(C(A, "borderTopWidth"));
        if (H.ie && !H.isStrict) {
            D.left -= isNaN(F) ? 2 : F;
            D.top -= isNaN(E) ? 2 : E
        }
    } else {
        B = $;
        do {
            D.left += B.offsetLeft;
            D.top += B.offsetTop;
            if (H.isWebkit > 0 && C(B, "position") == "fixed") {
                D.left += G.body.scrollLeft;
                D.top += G.body.scrollTop;
                break
            }
            B = B.offsetParent
        } while ( B && B != $ ) if (H.opera > 0 || (H.isWebkit > 0 && C($, "position") == "absolute")) D.top -= G.body.offsetTop;
        B = $.offsetParent;
        while (B && B != G.body) {
            D.left -= B.scrollLeft;
            if (!H.opera || B.tagName != "TR") D.top -= B.scrollTop;
            B = B.offsetParent
        }
    }
    return D
};
baidu.dom.getText = function(_) {
    var $ = "",
        B, C = 0,
        A;
    _ = baidu._g(_);
    if (_.nodeType === 3 || _.nodeType === 4) $ += _.nodeValue;
    else if (_.nodeType !== 8) {
        B = _.childNodes;
        for (A = B.length; C < A; C++) $ += baidu.dom.getText(B[C])
    }
    return $
};
baidu.dom.hasClass = function(_, A) {
    _ = baidu.dom.g(_);
    var $ = baidu.string.trim(A).split(/\s+/),
        B = $.length;
    A = _.className.split(/\s+/).join(" ");
    while (B--) if (! (new RegExp("(^| )" + $[B] + "( |$)")).test(A)) return false;
    return true
};
baidu.dom.hide = function($) {
    $ = baidu.dom.g($);
    $.style.display = "none";
    return $
};
baidu.hide = baidu.dom.hide; (function() {
    var $ = navigator.userAgent;
    baidu.browser.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test($) && !/chrome/i.test($) ? +(RegExp.$1 || RegExp.$2) : undefined
})(); (function() {
    var $ = baidu.dom.ready = function() {
        var C = false,
            A = [],
            _;
        if (document.addEventListener) _ = function() {
            document.removeEventListener("DOMContentLoaded", _, false);
            D()
        };
        else if (document.attachEvent) _ = function() {
            if (document.readyState === "complete") {
                document.detachEvent("onreadystatechange", _);
                D()
            }
        };
        function D() {
            if (!D.isReady) {
                D.isReady = true;
                for (var _ = 0,
                         $ = A.length; _ < $; _++) A[_]()
            }
        }
        function B() {
            try {
                document.documentElement.doScroll("left")
            } catch($) {
                setTimeout(B, 1);
                return
            }
            D()
        }
        function $() {
            if (C) return;
            C = true;
            if (document.readyState === "complete") D.isReady = true;
            else if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", _, false);
                window.addEventListener("load", D, false)
            } else if (document.attachEvent) {
                document.attachEvent("onreadystatechange", _);
                window.attachEvent("onload", D);
                var $ = false;
                try {
                    $ = window.frameElement == null
                } catch(A) {}
                if (document.documentElement.doScroll && $) B()
            }
        }
        $();
        return function($) {
            D.isReady ? $() : A.push($)
        }
    } ();
    $.isReady = false
})();
baidu.dom.removeClass = function($, D) {
    $ = baidu.dom.g($);
    var C = $.className.split(/\s+/),
        _ = D.split(/\s+/),
        B,
        A = _.length,
        E,
        F = 0;
    for (; F < A; ++F) for (E = 0, B = C.length; E < B; ++E) if (C[E] == _[F]) {
        C.splice(E, 1);
        break
    }
    $.className = C.join(" ");
    return $
};
baidu.removeClass = baidu.dom.removeClass;
baidu.dom.setStyle = function($, C, B) {
    var A = baidu.dom,
        _;
    $ = A.g($);
    C = baidu.string.toCamelCase(C);
    if (_ = A._styleFilter) B = _.filter(C, B, "set");
    _ = A._styleFixer[C]; (_ && _.set) ? _.set($, B) : ($.style[_ || C] = B);
    return $
};
baidu.setStyle = baidu.dom.setStyle;
baidu.dom.show = function($) {
    $ = baidu.dom.g($);
    $.style.display = "";
    return $
};
baidu.show = baidu.dom.show;
baidu.event = baidu.event || {};
baidu.event.stopPropagation = function($) {
    if ($.stopPropagation) $.stopPropagation();
    else $.cancelBubble = true
};
baidu.event.preventDefault = function($) {
    if ($.preventDefault) $.preventDefault();
    else $.returnValue = false
};
baidu.event.stop = function(_) {
    var $ = baidu.event;
    $.stopPropagation(_);
    $.preventDefault(_)
};
baidu.event._listeners = baidu.event._listeners || [];
baidu.event.on = function(_, D, B) {
    D = D.replace(/^on/i, "");
    _ = baidu.dom._g(_);
    var A = function($) {
            B.call(_, $)
        },
        $ = baidu.event._listeners,
        E = baidu.event._eventFilter,
        F,
        C = D;
    D = D.toLowerCase();
    if (E && E[D]) {
        F = E[D](_, D, A);
        C = F.type;
        A = F.listener
    }
    if (_.addEventListener) _.addEventListener(C, A, false);
    else if (_.attachEvent) _.attachEvent("on" + C, A);
    $[$.length] = [_, D, B, A, C];
    return _
};
baidu.on = baidu.event.on;
baidu.event.un = function(_, G, C) {
    _ = baidu.dom._g(_);
    G = G.replace(/^on/i, "").toLowerCase();
    var $ = baidu.event._listeners,
        F = $.length,
        E = !C,
        B, D, A;
    while (F--) {
        B = $[F];
        if (B[1] === G && B[0] === _ && (E || B[2] === C)) {
            D = B[4];
            A = B[3];
            if (_.removeEventListener) _.removeEventListener(D, A, false);
            else if (_.detachEvent) _.detachEvent("on" + D, A);
            $.splice(F, 1)
        }
    }
    return _
};
baidu.un = baidu.event.un;
baidu.event.getTarget = function($) {
    return $.target || $.srcElement
};
baidu.json = baidu.json || {};
baidu.json.parse = function($) {
    return (new Function("return (" + $ + ")"))()
};
baidu.json.decode = baidu.json.parse;
baidu.json.stringify = (function() {
    var $ = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };
    function B(_) {
        if (/["\\\x00-\x1f]/.test(_)) _ = _.replace(/["\\\x00-\x1f]/g,
            function(A) {
                var _ = $[A];
                if (_) return _;
                _ = A.charCodeAt();
                return "\\u00" + Math.floor(_ / 16).toString(16) + (_ % 16).toString(16)
            });
        return '"' + _ + '"'
    }
    function C(A) {
        var _ = ["["],
            C = A.length,
            $,
            D,
            B;
        for (D = 0; D < C; D++) {
            B = A[D];
            switch (typeof B) {
                case "undefined":
                case "function":
                case "unknown":
                    break;
                default:
                    if ($) _.push(",");
                    _.push(baidu.json.stringify(B));
                    $ = 1
            }
        }
        _.push("]");
        return _.join("")
    }
    function _($) {
        return $ < 10 ? "0" + $: $
    }
    function A($) {
        return '"' + $.getFullYear() + "-" + _($.getMonth() + 1) + "-" + _($.getDate()) + "T" + _($.getHours()) + ":" + _($.getMinutes()) + ":" + _($.getSeconds()) + '"'
    }
    return function(F) {
        switch (typeof F) {
            case "undefined":
                return "undefined";
            case "number":
                return isFinite(F) ? String(F) : "null";
            case "string":
                return B(F);
            case "boolean":
                return String(F);
            default:
                if (F === null) return "null";
                else if (F instanceof Array) return C(F);
                else if (F instanceof Date) return A(F);
                else {
                    var D = ["{"],
                        _ = baidu.json.stringify,
                        $,
                        E;
                    for (var G in F) if (Object.prototype.hasOwnProperty.call(F, G)) {
                        E = F[G];
                        switch (typeof E) {
                            case "undefined":
                            case "unknown":
                            case "function":
                                break;
                            default:
                                if ($) D.push(",");
                                $ = 1;
                                D.push(_(G) + ":" + _(E))
                        }
                    }
                    D.push("}");
                    return D.join("")
                }
        }
    }
})();
baidu.json.encode = baidu.json.stringify; (function() {
    var $ = window[baidu.guid];
    baidu.lang.guid = function() {
        return "TANGRAM__" + ($._counter++).toString(36)
    };
    $._counter = $._counter || 1
})();
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.isFunction = function($) {
    return "[object Function]" == Object.prototype.toString.call($)
};
baidu.lang.Class = function($) {
    this.guid = $ || baidu.lang.guid();
    window[baidu.guid]._instances[this.guid] = this
};
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.Class.prototype.dispose = function() {
    delete window[baidu.guid]._instances[this.guid];
    for (var $ in this) if (!baidu.lang.isFunction(this[$])) delete this[$];
    this.disposed = true
};
baidu.lang.Class.prototype.toString = function() {
    return "[object " + (this._className || "Object") + "]"
};
baidu.lang.Event = function(_, $) {
    this.type = _;
    this.returnValue = true;
    this.target = $ || null;
    this.currentTarget = null
};
baidu.lang.Class.prototype.addEventListener = function(A, C, B) {
    if (!baidu.lang.isFunction(C)) return; ! this.__listeners && (this.__listeners = {});
    var _ = this.__listeners,
        $;
    if (typeof B == "string" && B) if (/[^\w\-]/.test(B)) throw ("nonstandard key:" + B);
    else {
        C.hashCode = B;
        $ = B
    }
    A.indexOf("on") != 0 && (A = "on" + A);
    typeof _[A] != "object" && (_[A] = {});
    $ = $ || baidu.lang.guid();
    C.hashCode = $;
    _[A][$] = C
};
baidu.lang.Class.prototype.removeEventListener = function(A, B) {
    if (typeof B != "undefined") if ((baidu.lang.isFunction(B) && !(B = B.hashCode)) || (!baidu.lang.isString(B))) return; ! this.__listeners && (this.__listeners = {});
    A.indexOf("on") != 0 && (A = "on" + A);
    var _ = this.__listeners;
    if (!_[A]) return;
    if (typeof B != "undefined") _[A][B] && delete _[A][B];
    else for (var $ in _[A]) delete _[A][$]
};
baidu.lang.Class.prototype.dispatchEvent = function(_, C) {
    if (baidu.lang.isString(_)) _ = new baidu.lang.Event(_); ! this.__listeners && (this.__listeners = {});
    C = C || {};
    for (var B in C) _[B] = C[B];
    var $ = this.__listeners,
        A = _.type;
    _.target = _.target || this;
    _.currentTarget = this;
    A.indexOf("on") != 0 && (A = "on" + A);
    baidu.lang.isFunction(this[A]) && this[A].apply(this, arguments);
    if (typeof $[A] == "object") for (B in $[A]) $[A][B].apply(this, arguments);
    return _.returnValue
};
baidu.lang.createSingle = function(_) {
    var $ = new baidu.lang.Class();
    for (var A in _) $[A] = _[A];
    return $
};
baidu.lang.eventCenter = baidu.lang.eventCenter || baidu.lang.createSingle();
baidu.lang.isArray = function($) {
    return "[object Array]" == Object.prototype.toString.call($)
};
baidu.lang.isBoolean = function($) {
    return typeof $ === "boolean"
};
baidu.lang.isDate = function($) {
    return {}.toString.call($) === "[object Date]" && $.toString() !== "Invalid Date" && !isNaN($)
};
baidu.lang.isElement = function($) {
    return !! ($ && $.nodeName && $.nodeType == 1)
};
baidu.lang.isNumber = function($) {
    return "[object Number]" == Object.prototype.toString.call($) && isFinite($)
};
baidu.lang.isObject = function($) {
    return "function" == typeof $ || !!($ && "object" == typeof $)
};
baidu.isObject = baidu.lang.isObject;
baidu.lang.toArray = function($) {
    if ($ === null || $ === undefined) return [];
    if (baidu.lang.isArray($)) return $;
    if (typeof $.length !== "number" || typeof $ === "string" || baidu.lang.isFunction($)) return [$];
    if ($.item) {
        var _ = $.length,
            A = new Array(_);
        while (_--) A[_] = $[_];
        return A
    }
    return [].slice.call($)
};
baidu.number.randomInt = function($, _) {
    return Math.floor(Math.random() * (_ - $ + 1) + $)
};
baidu.number.comma = function($, _) {
    if (!_ || _ < 1) _ = 3;
    $ = String($).split(".");
    $[0] = $[0].replace(new RegExp("(\\d)(?=(\\d{" + _ + "})+$)", "ig"), "$1,");
    return $.join(".")
};
baidu.object = baidu.object || {};
baidu.object.isPlain = function($) {
    var A = Object.prototype.hasOwnProperty,
        _;
    if (!$ || Object.prototype.toString.call($) !== "[object Object]" || !("isPrototypeOf" in $)) return false;
    if ($.constructor && !A.call($, "constructor") && !A.call($.constructor.prototype, "isPrototypeOf")) return false;
    for (_ in $);
    return _ === undefined || A.call($, _)
};
baidu.object.clone = function(_) {
    var $ = _,
        C, B;
    if (!_ || _ instanceof Number || _ instanceof String || _ instanceof Boolean) return $;
    else if (baidu.lang.isArray(_)) {
        $ = [];
        var A = 0;
        for (C = 0, B = _.length; C < B; C++) $[A++] = baidu.object.clone(_[C])
    } else if (baidu.object.isPlain(_)) {
        $ = {};
        for (C in _) if (_.hasOwnProperty(C)) $[C] = baidu.object.clone(_[C])
    }
    return $
};
baidu.object.each = function(_, $) {
    var B, C, A;
    if ("function" == typeof $) for (C in _) if (_.hasOwnProperty(C)) {
        A = _[C];
        B = $.call(_, A, C);
        if (B === false) break
    }
    return _
};
baidu.extend = baidu.object.extend = function(A, $) {
    for (var _ in $) if ($.hasOwnProperty(_)) A[_] = $[_];
    return A
};
baidu.sio = baidu.sio || {};
baidu.sio._createScriptTag = function($, A, _) {
    $.setAttribute("type", "text/javascript");
    _ && $.setAttribute("charset", _);
    $.setAttribute("src", A);
    document.getElementsByTagName("head")[0].appendChild($)
};
baidu.sio._removeScriptTag = function($) {
    if ($.clearAttributes) $.clearAttributes();
    else for (var _ in $) if ($.hasOwnProperty(_)) delete $[_];
    if ($ && $.parentNode) $.parentNode.removeChild($);
    $ = null
};
baidu.sio.callByBrowser = function(G, F, A) {
    var _ = document.createElement("SCRIPT"),
        $ = 0,
        H = A || {},
        E = H.charset,
        D = F ||
            function() {},
        B = H.timeOut || 0,
        C;
    _.onload = _.onreadystatechange = function() {
        if ($) return;
        var A = _.readyState;
        if ("undefined" == typeof A || A == "loaded" || A == "complete") {
            $ = 1;
            try {
                D();
                clearTimeout(C)
            } finally {
                _.onload = _.onreadystatechange = null;
                baidu.sio._removeScriptTag(_)
            }
        }
    };
    if (B) C = setTimeout(function() {
            _.onload = _.onreadystatechange = null;
            baidu.sio._removeScriptTag(_);
            H.onfailure && H.onfailure()
        },
        B);
    baidu.sio._createScriptTag(_, G, E)
};
baidu.sio.callByServer = function(C, J, E) {
    var _ = document.createElement("SCRIPT"),
        I = "bd__cbs__",
        L,
        K,
        M = E || {},
        B = M.charset,
        $ = M.queryField || "callback",
        F = M.timeOut || 0,
        H,
        G = new RegExp("(\\?|&)" + $ + "=([^&]*)"),
        D;
    if (baidu.lang.isFunction(J)) {
        L = I + Math.floor(Math.random() * 2147483648).toString(36);
        window[L] = A(0)
    } else if (baidu.lang.isString(J)) L = J;
    else if (D = G.exec(C)) L = D[2];
    if (F) H = setTimeout(A(1), F);
    C = C.replace(G, "$1" + $ + "=" + L);
    if (C.search(G) < 0) C += (C.indexOf("?") < 0 ? "?": "&") + $ + "=" + L;
    baidu.sio._createScriptTag(_, C, B);
    function A($) {
        return function() {
            try {
                if ($) M.onfailure && M.onfailure();
                else {
                    J.apply(window, arguments);
                    clearTimeout(H)
                }
                window[L] = null;
                delete window[L]
            } catch(A) {} finally {
                baidu.sio._removeScriptTag(_)
            }
        }
    }
};
baidu.url = baidu.url || {};
baidu.url.escapeSymbol = function($) {
    return String($).replace(/[#%&+=\/\\\ \\u3000\f\r\n\t]/g,
        function($) {
            return "%" + (256 + $.charCodeAt()).toString(16).substring(1).toUpperCase()
        })
};
baidu.url.jsonToQuery = function(B, C) {
    var $ = [],
        A,
        _ = C ||
            function($) {
                return baidu.url.escapeSymbol($)
            };
    baidu.object.each(B,
        function(B, C) {
            if (baidu.lang.isArray(B)) {
                A = B.length;
                while (A--) $.push(C + "=" + _(B[A], C))
            } else $.push(C + "=" + _(B, C))
        });
    return $.join("&")
};
baidu.url.queryToJson = function(G) {
    var A = G.substr(G.lastIndexOf("?") + 1),
        E = A.split("&"),
        D = E.length,
        $ = {},
        H = 0,
        F,
        C,
        B,
        _;
    for (; H < D; H++) {
        if (!E[H]) continue;
        _ = E[H].split("=");
        F = _[0];
        C = _[1];
        B = $[F];
        if ("undefined" == typeof B) $[F] = C;
        else if (baidu.lang.isArray(B)) B.push(C);
        else $[F] = [B, C]
    }
    return $
};
baidu.url.getQueryValue = function(B, A) {
    var $ = new RegExp("(^|&|\\?|#)" + baidu.string.escapeReg(A) + "=([^&#]*)(&|$|#)", ""),
        _ = B.match($);
    if (_) return _[2];
    return null
};
window.H || (window.H = {});
H.date = H.string = H.number = H.dom = H.event = H.effects = H.sio = H.calss = {};
H._f = function() {};
window.Model || (window.Model = {});
window.Model.Global || (window.Model.Global = {});
window.Model.Index || (window.Model.Index = {});
H.dom = {
    gn: function($) {
        return document.getElementsByName($)
    },
    disSelect: function($) {
        var _;
        if ($.style.MozUserSelect !== _) $.style.MozUserSelect = "none";
        else if ($.onselectstart !== _) $.onselectstart = function() {
            return H._f
        };
        else $.onmousedown = function() {
                return H._f
            }
    },
    setCursorPos: function(_, A) {
        if (_.setSelectionRange) {
            _.focus();
            _.setSelectionRange(A, A)
        } else if (_.createTextRange) {
            var $ = _.createTextRange();
            $.collapse(true);
            $.moveEnd("character", A);
            $.moveStart("character", A);
            $.select()
        }
    },
    getCoords: function(_) {
        var A = _.ownerDocument,
            $ = A.body,
            B = A.documentElement,
            C = _.getBoundingClientRect();
        return {
            x: C.left + (self.pageXOffset || B.scrollLeft || $.scrollLeft) - (B.clientLeft || $.clientLeft || 0),
            y: C.top + (self.pageYOffset || B.scrollTop || $.scrollTop) - (B.clientTop || $.clientTop || 0)
        }
    }
};
H.browser = function() {
    var D = window,
        G = document,
        H = navigator,
        J = H.userAgent.toLowerCase(),
        L = {
            ie: "msie",
            sf: "safari",
            tt: "tencenttraveler"
        },
        F = {
            browser: "(" + L.ie + "|" + L.sf + "|firefox|chrome|opera)",
            shell: "(maxthon|360se|360chrome|theworld|se|theworld|greenbrowser|qqbrowser)",
            tt: "(tencenttraveler)",
            os: "(windows nt|macintosh|solaris|linux)",
            kernel: "(webkit|gecko|like gecko)"
        },
        B = function(_) {
            var A = new RegExp(_ + "\\b[ \\/]?([\\w\\.]*)", "i"),
                $ = J.match(A);
            return $ ? $.slice(1) : ["", ""]
        },
        K = function() {
            var $ = J.indexOf("360chrome") > -1 ? !!1 : !1,
                A;
            try {
                if (D.external && D.external.twGetRunPath) {
                    A = D.external.twGetRunPath;
                    if (A && A.indexOf("360se") > -1) $ = !!1
                }
            } catch(_) {
                $ = !1
            }
            return $
        } (),
        C = function() {
            try {
                if (/(\d+\.\d)/.test(D.external.max_version)) return parseFloat(RegExp.$1)
            } catch($) {}
        } (),
        I = B(F.browser),
        _ = B(F.shell),
        A = B(F.os),
        E = B(F.kernel);
    if (I[0] === L.ie) {
        if (K) _ = ["360se", ""];
        else if (C) _ = ["maxthon", C];
        else if (_ == ",") _ = B(F.tt)
    } else if (I[0] === L.sf) I[1] = B("version") + "." + I[1];
    function $() {
        if (H.plugins && H.mimeTypes.length) {
            var A = H.plugins["Shockwave Flash"];
            if (A && A.description) return A.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
        } else if (D.ActiveXObject && !D.opera) for (var C = 12; C >= 2; C--) {
            try {
                var _ = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + C);
                if (_) {
                    var B = _.GetVariable("$version");
                    return B.replace(/WIN/g, "").replace(/,/g, ".")
                }
            } catch($) {}
        }
    }
    return {
        cookieEnabled: navigator.cookieEnabled,
        flash: $(),
        isStrict: (G.compatMode == "CSS1Compat"),
        isShell: !!_[0],
        shell: _,
        kernel: E,
        platform: A,
        types: I,
        chrome: (I[0] == "chrome") && I[1],
        firefox: (I[0] == "firefox") && I[1],
        ie: (I[0] == "msie") && I[1],
        opera: (I[0] == "opera") && I[1],
        safari: (I[0] == "safari") && I[1],
        maxthon: (_[0] == "maxthon") && _[1],
        isTT: (_[0] == "tencenttraveler") && _[1],
        is360: K
    }
} (); (function(F, E, A, O, L) {
    var $ = "HCD_",
        D = L || "hao123.com",
        J = $ + 0,
        N = encodeURIComponent,
        I = decodeURIComponent,
        G = null,
        K = function($) {
            return $ + "" === $ && $ !== ""
        },
        H = function($) {
            return (new Date).getTime() + $ * 86400000
        },
        P = function($) {
            if ($ === 0) return "";
            var _ = new Date;
            _.setTime(H($));
            return _.toUTCString()
        },
        C = function(_, A, B) {
            B = B || {};
            var $ = Number(B.expires);
            B = {
                expires: "; expires=" + P(A === null ? -1 : (B.expires === 0 || $ ? $: 365)),
                domain: "; domain=" + (K(B.domain) ? B.domain: "hao123.com"),
                path: "; path=" + (K(B.path) ? B.path: "/"),
                secure: B.secure ? "; secure": ""
            };
            E.cookie = _ + "=" + A + B.expires + B.domain + B.path + B.secure
        },
        B = function(_) {
            var $ = K(_) ? E.cookie.match("(?:^| )" + _ + "(?:(?:=([^;]*))|;|$)") : null;
            return $ ? $[1] : $
        },
        _ = function(_, A) {
            var $ = (A || "").match("(?:^|,)(" + N(_) + "\\|[^,]+)");
            return $ && $[1]
        },
        M = function($, _, A) {
            return (_ || _ === G || _ === "") ? C(N($), N(_), A) : I(B(N($)))
        };
    M.set = function(D, E, A) {
        C(N(D), null);
        var $ = B(J) || "",
            F = _(D, $) || "";
        C(J, $.replace(F, [N(D), N(E), H(A || 365)].join("|") + ($.length && !F ? ",": "")), {
            domain: "hao123.com"
        });
        return M
    };
    M.get = function($) {
        var C = B(N($));
        if (C !== null) return I(C);
        var A = B(J) || "",
            D = _($, A);
        if (!D) return D;
        D = D.split("|");
        if (Array(D[2]) > H(0)) return I(D[1]);
        M.del(N($));
        return null
    };
    M.move = function(_, $) {
        var A = B(N(_));
        A !== null && M.set(_, I(A), $ || 365);
        return M
    };
    M.del = function(A) {
        C(N(A), null);
        var D = B(J) || "",
            E = _(A, D) || "",
            $ = new RegExp(",?" + E.replace(/\|/g, "\\|") + ",?", "g");
        E && C(J, D.replace($, ""));
        return M
    };
    M.clear = function() {
        C(J, "");
        return M
    };
    M.is = !!navigator.cookieEnabled;
    F.H || (F.H = {});
    F.H[A] = M
})(window, document, "cookie");
H.event = {
    bind: function($, A, _) {
        T.event.on($, A,
            function($) {
                $ = $ || window.event;
                var A = $.srcElement || $.target;
                _.call(A, $)
            })
    }
};
H.sio.load = (function() {
    var D = document,
        A = D.getElementsByTagName("script")[0],
        I,
        B = true,
        $ = false,
        F = A.parentNode,
        G = {
            js: ["script", "type", "text/javascript", "src"],
            css: ["link", "rel", "stylesheet", "href"]
        },
        C = function($) {
            $.clearAttributes && $.clearAttributes();
            $.onload = $.onreadystatechange = $.onerror = null;
            $.parentNode && $.parentNode.removeChild($);
            $ = null
        },
        _ = function(_, $) {
            if (_ === I) return H.sio.load.loaded;
            if ($ === I) return H.sio.load.loaded[_];
            H.sio.load.loaded[_] = $
        },
        E = function(L, Q, H, I) {
            L = G[L];
            I = I || {};
            var M = 0,
                K = I.wait || 5000,
                P = null,
                O = T.lang.isArray(Q),
                E = L[0] === "script",
                $ = I.onError,
                N = null,
                J = function(A, $) {
                    _(A, 1);
                    E && $ && C($);
                    if (!O || O && M++===Q.length - 1) {
                        clearTimeout(P);
                        H && H()
                    }
                };
            if ($ || E) P = setTimeout(function() {
                    N && C(N);
                    $ && $()
                },
                K);
            T.array.each(O ? Q: [Q],
                function(G) {
                    var Q = _(G);
                    if (Q === 0) {
                        var K = load.cache;
                        K[G] = K[G] || {};
                        H && (K[G].onSuccess = K[G].onSuccess || []).push(H);
                        $ && (K[G].onError = K[G].onError || []).push($);
                        O && ++M
                    } else if (Q > 0) {
                        J(G);
                        _(G, ++Q)
                    } else {
                        _(G, 0);
                        N = D.createElement(L[0]);
                        N[L[1]] = L[2];
                        if (I.charset) N.charset = I.charset;
                        if (E) {
                            N.async = B;
                            if (N.addEventListener) {
                                T.event.on(N, "load",
                                    function() {
                                        J(G, N)
                                    });
                                T.event.on(N, "error",
                                    function() {
                                        clearTimeout(P);
                                        C(N);
                                        $ && $()
                                    })
                            } else T.event.on(N, "readystatechange",
                                function() {
                                    var $ = N.readyState;
                                    if ($ === "loaded" || $ === "complete") {
                                        N.onreadystatechange = null;
                                        J(G, N)
                                    }
                                })
                        } else if (H) if (isIE) on(N, "load",
                            function() {
                                J(G, N)
                            });
                        else {
                            var R = new Image;
                            on(R, "error",
                                function() {
                                    J(G, N)
                                });
                            R.src = G
                        }
                        N[L[3]] = G;
                        F.insertBefore(N, A)
                    }
                })
        };
    return {
        ref: A,
        remove: C,
        loaded: {},
        cache: {},
        js: function($, A, _) {
            E("js", $, A, _);
            return H.sio.load
        },
        css: function($, A, _) {
            E("css", $, A, _);
            return H.sio.load
        }
    }
})();
T.each = function($, _) {
    if (T.lang.isObject($)) T.object.each($, _);
    if (T.lang.isArray($)) T.array.each($, _)
};
T.object.extend(T.date, H.date);
T.object.extend(T.string, H.string);
T.object.extend(T.number, H.number);
T.object.extend(T.dom, H.dom);
T.object.extend(T.event, H.event);
T.object.extend(T.sio, H.sio);
T.object.extend(T.browser, H.browser);
T.cookie = H.cookie;
Model.Global.UT = {
    url: "http://www.hao123.comm/images/track.gif",
    send: function(B) {
        B = B || {};
        var _ = this,
            D = _.conf,
            F = D && D.url || _.url,
            A = B.r = +new Date,
            C = window["Model.Global.UT" + A] = new Image(),
            E = D && D.data,
            $ = [];
        E && T.each(E,
            function($, _) {
                if (! (_ in B) && $ !== undefined) B[_] = $
            });
        T.each(B,
            function(_, A) {
                $.push(encodeURIComponent(A) + "=" + encodeURIComponent(_))
            });
        C.onload = C.onerror = function() {
            window["Model.Global.UT" + A] = null
        };
        C.src = F + "?" + $.join("&");
        C = $ = null
    }
};
window.Conf || (window.Conf = {});
window.Conf.Index || (window.Conf.Index = {});
window.Conf.Global || (window.Conf.Global = {});
Conf.Global.s0 = "/";
Conf.Global.s1 = "/";
Conf.Global.setHomePage = {
    helpurl: "http://www.hao123.com/redian/sheshouyef.htm",
    shell: {
        "360se": "02",
        maxthon: "03",
        se: "04",
        qqbrowser: "05",
        tencenttraveler: "06",
        theworld: "10",
        greenbrowser: "12"
    },
    browser: {
        firefox: "ff",
        chrome: "08",
        opera: "09",
        safari: "11",
        msie: "01"
    }
};
Conf.Index.clock = {
    tpl: '<li class="box-date_ymd">#{y}\u5e74#{m}\u6708#{d}\u65e5 \u661f\u671f#{W}\uff08\u519c\u5386#{CM}#{CD}\uff09 <span>#{hh}:#{mm}</span></li>',
    rate: 30000
};
Conf.Index.mail = {
    mails: [{
        mail: "163",
        name: "@163.com",
        action: "/js/mail.asp?mail=163",
        params: {
            url: "http://entry.mail.163.com/coremail/fcg/ntesdoor2?lightweight=1&verifycookie=1&language=-1&style=15",
            username: "#{u}",
            password: "#{p}"
        }
    },
        {
            mail: "126",
            name: "@126.com",
            action: "/js/mail.asp?mail=126",
            params: {
                domain: "126.com",
                username: "#{u}@126.com",
                password: "#{p}",
                url: "http://entry.mail.126.com/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26language%3D0%26style%3D-1"
            }
        },
        {
            mail: "sina",
            name: "@sina.com",
            action: "http://mail.sina.com.cn/cgi-bin/login.cgi",
            params: {
                u: "#{u}@sina.com",
                psw: "#{p}"
            }
        },
        {
            mail: "yahoocomcn",
            name: "@yahoo.com.cn",
            action: "https://edit.bjs.yahoo.com/config/login",
            params: {
                login: "#{u}@yahoo.com.cn",
                passwd: "#{p}",
                domainss: "yahoo",
                ".intl": "cn",
                ".src": "ym"
            }
        },
        {
            mail: "yahoocn",
            name: "@yahoo.cn",
            action: "https://edit.bjs.yahoo.com/config/login",
            params: {
                login: "#{u}@yahoo.cn",
                passwd: "#{p}",
                domainss: "yahoocn",
                ".intl": "cn",
                ".done": "http://mail.cn.yahoo.com/inset.html"
            }
        },
        {
            mail: "sohu",
            name: "@sohu.com",
            action: "http://passport.sohu.com/login.jsp",
            params: {
                loginid: "#{u}@sohu.com",
                passwd: "#{p}",
                fl: "1",
                vr: "1|1",
                appid: "1000",
                ru: "http://login.mail.sohu.com/servlet/LoginServlet",
                ct: "1173080990",
                sg: "5082635c77272088ae7241ccdf7cf062"
            }
        },
        {
            mail: "yeah",
            name: "@yeah.net",
            action: "https://reg.163.com/logins.jsp",
            params: {
                domain: "yeah.net",
                username: "#{u}@yeah.net",
                password: "#{p}",
                url: "http://entry.mail.yeah.net/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26style%3D-1"
            }
        },
        {
            mail: "139",
            name: "@139.com",
            action: "https://mail.10086.cn/Login/Login.ashx",
            params: {
                UserName: "#{u}",
                Password: "#{p}",
                clientid: "5015"
            }
        },
        {
            mail: "tom",
            name: "@tom.com",
            action: "http://login.mail.tom.com/cgi/login",
            params: {
                user: "#{u}",
                pass: "#{p}"
            }
        },
        {
            mail: "21cn",
            name: "@21cn.com",
            action: "http://passport.21cn.com/maillogin.jsp",
            params: {
                UserName: "#{u}@21cn.com",
                passwd: "#{p}",
                domainname: "21cn.com"
            }
        },
        {
            mail: "renren",
            name: "\u4eba\u4eba\u7f51",
            action: "http://passport.renren.com/PLogin.do",
            params: {
                email: "#{u}",
                password: "#{p}",
                origURL: "http://www.renren.com/Home.do",
                domain: "renren.com"
            }
        },
        {
            mail: "baidu",
            name: "\u767b\u5f55\u767e\u5ea6",
            action: "https://passport.baidu.com/?login",
            params: {
                u: "http://passport.baidu.com/center",
                username: "#{u}",
                password: "#{p}"
            }
        },
        {
            mail: "51",
            name: "51.com",
            action: "http://passport.51.com/login.5p",
            params: {
                passport_51_user: "#{u}",
                passport_51_password: "#{p}",
                gourl: "http%3A%2F%2Fmy.51.com%2Fwebim%2Findex.php"
            }
        }],
    links: [{
        name: "\u652f\u4ed8\u5b9d",
        url: "https://www.alipay.com/user/login.htm"
    },
        {
            name: "@qq.com",
            url: "http://mail.qq.com"
        },
        {
            name: "QQ\u7a7a\u95f4",
            url: "http://qzone.qq.com/index.html"
        },
        {
            name: "webqq",
            url: "http://web2.qq.com"
        },
        {
            name: "\u65b0\u6d6a\u5fae\u535a",
            url: "http://weibo.com/login.php"
        },
        {
            name: "@gmail.com",
            url: "http://mail.google.com/mail/"
        },
        {
            name: "@hotmail.com",
            url: "http://www.hotmail.com"
        },
        {
            name: "\u5f00\u5fc3\u7f51",
            url: "http://www.kaixin001.com"
        }]
};
Conf.Index.searchGroup = {
    defaultConf: {
        logoPath: Conf.Global.s0 + "images/search_logo/",
        curN: 0,
        curName: "web",
        delay: 200,
        n: 10,
        data_log_prefix: "hao"
    },
    tabSwitchConf: {
        web: {
            alt: "\u6709\u9053\u9996\u9875",
            url: "http://www.sogou.com/index.htm?pid=sogou-netb-987797582-20141020",
            action: "http://www.sogou.com/sogou",
            q: "query",
            params: {
                pid: "sogou-netb-987797582-20141020"
            },
            sug: {
                requestQuery: "wd",
                url: "http://suggestion.baidu.com/su",
                callbackFn: "baidu.sug",
                callbackDataKey: "s",
                requestParas: {
                    sc: "hao123"
                }
            }
        },
        mp3: {
            alt: "\u767e\u5ea6MP3",
            url: "http://mp3.baidu.com/",
            action: "http://mp3.baidu.com/m",
            q: "word",
            params: {
                tn: "baidump3",
                ct: "134217728",
                ie: "gbk",
                sc: "hao123"
            },
            sug: {
                requestQuery: "wd",
                url: "http://nssug.baidu.com/su",
                callbackFn: "baidu.sug",
                callbackDataKey: "s",
                requestParas: {
                    prod: "mp3",
                    sc: "hao123"
                }
            }
        },
        video: {
            alt: "\u767e\u5ea6\u89c6\u9891\u641c\u7d22",
            url: "http://video.baidu.com/",
            action: "http://video.baidu.com/v",
            q: "word",
            params: {
                sc: "hao123",
                ie: "gbk"
            },
            sug: {
                requestQuery: "wd",
                url: "http://nssug.baidu.com/su",
                callbackFn: "baidu.sug",
                callbackDataKey: "s",
                requestParas: {
                    prod: "video",
                    sc: "hao123"
                }
            }
        },
        image: {
            alt: "\u767e\u5ea6\u56fe\u7247",
            url: "http://image.baidu.com/",
            action: "http://image.baidu.com/i",
            q: "word",
            params: {
                tn: "baiduimage",
                ct: "201326592",
                cl: "2",
                lm: "-1",
                ie: "gbk",
                fm: "hao123"
            },
            sug: {
                requestQuery: "wd",
                url: "http://nssug.baidu.com/su",
                callbackFn: "baidu.sug",
                callbackDataKey: "s",
                requestParas: {
                    prod: "image",
                    sc: "hao123"
                }
            }
        },
        tieba: {
            alt: "\u767e\u5ea6\u8d34\u5427",
            url: "http://tieba.baidu.com/",
            action: "http://tieba.baidu.com/f",
            q: "kw",
            params: {
                ie: "gbk",
                sc: "hao123"
            },
            sug: {
                requestQuery: "query",
                url: "http://tieba.baidu.com/sug",
                callbackFn: "baiduSugTieba",
                callbackDataKey: "msg",
                requestParas: {
                    callback: "baiduSugTieba",
                    sc: "hao123"
                }
            }
        },
        zhidao: {
            alt: "\u767e\u5ea6\u77e5\u9053",
            url: "http://zhidao.baidu.com/",
            action: "http://zhidao.baidu.com/q",
            q: "word",
            params: {
                tn: "ikaslist",
                ct: "17",
                ie: "gbk",
                sc: "hao123",
                rn: "20"
            },
            sug: {
                requestQuery: "wd",
                url: "http://nssug.baidu.com/su",
                callbackFn: "baidu.sug",
                callbackDataKey: "s",
                requestParas: {
                    prod: "zhidao",
                    sc: "hao123"
                }
            }
        },
        news: {
            alt: "\u767e\u5ea6\u65b0\u95fb\u641c\u7d22",
            url: "http://news.baidu.com/",
            action: "http://news.baidu.com/ns",
            q: "word",
            params: {
                tn: "news",
                ie: "gbk",
                sc: "hao123"
            },
            sug: {
                requestQuery: "wd",
                url: "http://nssug.baidu.com/su",
                callbackFn: "baidu.sug",
                callbackDataKey: "s",
                requestParas: {
                    prod: "news",
                    sc: "hao123"
                }
            }
        },
        map: {
            alt: "\u767e\u5ea6\u5730\u56fe\u641c\u7d22",
            url: "http://map.baidu.com/",
            action: "http://map.baidu.com/m",
            q: "word",
            params: {
                c: 1,
                sc: "hao123"
            },
            sug: {
                requestQuery: "wd",
                url: "http://map.baidu.com/su",
                callbackFn: "baidu.sug",
                callbackDataKey: "s",
                charset: "utf-8",
                requestParas: {
                    cid: 1,
                    type: 0,
                    newmap: 1,
                    sc: "hao123",
                    callback: "baidu.sug"
                },
                templ: function(D, C) {
                    D = D.s || [];
                    var _ = 0,
                        $ = Math.min(D.length, 10),
                        E = [],
                        B,
                        A;
                    for (; _ < $; _++) if (B = D[_]) {
                        B = B.split("$");
                        A = B[0] + B[1];
                        B = B[2] || "" + B[3] || "";
                        if (!B) {
                            B = D[_].split("$");
                            B = B[3] ? B[1] : B[0] + B[1];
                            A = !B[3] || B[3] != 0 ? "": B[0]
                        }
                        if (!B) {
                            B = D[_].split("$");
                            B = B[3] || "";
                            A = B[0] + B[1]
                        }
                        E.push('<li q="' + B + '"' + (B.indexOf(C) > -1 ? "": " class=sug-querynull") + ">" + B.replace(C, '<span class="sug-query">' + C + "</span>") + '<span class="sug-sub">' + A + "</span></li>")
                    }
                    return "<ol>" + E.join("") + "</ol>"
                }
            }
        }
    },
    moreConf: {
        wenku: {
            name: "\u6587 \u5e93",
            url: "http://wenku.baidu.com"
        },
        baike: {
            name: "\u767e \u79d1",
            url: "http://baike.baidu.com"
        },
        jingyan: {
            name: "\u7ecf \u9a8c",
            url: "http://jingyan.baidu.com"
        },
        hi: {
            name: "\u7a7a \u95f4",
            url: "http://hi.baidu.com"
        },
        top: {
            name: "\u98ce\u4e91\u699c",
            url: "http://top.baidu.com"
        },
        dict: {
            name: "\u8bcd \u5178",
            url: "http://dict.baidu.com"
        },
        s: {
            name: "\u8eab \u8fb9",
            url: "http://s.baidu.com"
        }
    }
};
Conf.Index.starSection = {
    url: "js/mcfg.js",
    tpl: '<li><em><a href="#{url}"><i class="i-#{icon}"></i>#{name}</a></em><acronym title="#{title}"><a href="#{href}" #{style}>#{text}</a></acronym></li>',
    list: [{
        icon: "tool",
        name: "\u5b9e\u7528\u67e5\u8be2",
        url: "life.htm"
    },
        {
            icon: "tv",
            name: "\u7535\u89c6\u5267",
            url: "tv.htm"
        },
        {
            icon: "movie",
            name: "\u7535\u3000\u5f71",
            url: "movie.htm"
        },
        {
            icon: "music",
            name: "\u97f3\u3000\u4e50",
            url: "music.htm"
        },
        {
            icon: "caipiao",
            name: "\u5f69\u3000\u7968",
            url: "caipiao.htm"
        },
        {
            icon: "tuan",
            name: "\u56e2\u3000\u8d2d",
            url: "tuan.htm"
        },
        {
            icon: "game",
            name: "\u5c0f\u6e38\u620f",
            url: "xyx.htm"
        }]
};
Conf.Index.weather = {
    "\u6674": "a0",
    "\u591a\u4e91": "a1",
    "\u9634": "a2",
    "\u9635\u96e8": "a3",
    "\u96f7\u9635\u96e8": "a4",
    "\u96f7\u9635\u96e8\u4f34\u6709\u51b0\u96f9": "a5",
    "\u96e8\u5939\u96ea": "a6",
    "\u5c0f\u96e8": "a7",
    "\u4e2d\u96e8": "a8",
    "\u5927\u96e8": "a9",
    "\u66b4\u96e8": "a10",
    "\u5927\u66b4\u96e8": "a11",
    "\u7279\u5927\u66b4\u96e8": "a12",
    "\u9635\u96ea": "a13",
    "\u5c0f\u96ea": "a14",
    "\u4e2d\u96ea": "a15",
    "\u5927\u96ea": "a16",
    "\u66b4\u96ea": "a17",
    "\u96fe": "a18",
    "\u51bb\u96e8": "a19",
    "\u6c99\u5c18\u66b4": "a20",
    "\u5c0f\u96e8-\u4e2d\u96e8": "a21",
    "\u5c0f\u5230\u4e2d\u96e8": "a21",
    "\u4e2d\u96e8-\u5927\u96e8": "a22",
    "\u4e2d\u5230\u5927\u96e8": "a22",
    "\u5927\u96e8-\u66b4\u96e8": "a23",
    "\u5927\u5230\u66b4\u96e8": "a23",
    "\u66b4\u96e8-\u5927\u66b4\u96e8": "a24",
    "\u5927\u66b4\u96e8-\u7279\u5927\u66b4\u96e8": "a25",
    "\u5c0f\u96ea-\u4e2d\u96ea": "a26",
    "\u5c0f\u5230\u4e2d\u96ea": "a26",
    "\u4e2d\u96ea-\u5927\u96ea": "a27",
    "\u4e2d\u5230\u5927\u96ea": "a27",
    "\u5927\u96ea-\u66b4\u96ea": "a28",
    "\u5927\u5230\u66b4\u96ea": "a28",
    "\u6d6e\u5c18": "a29",
    "\u626c\u6c99": "a30",
    "\u5f3a\u6c99\u5c18\u66b4": "a31"
}