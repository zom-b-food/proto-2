/* Browser Functions library */

isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
isWindows = (navigator.appVersion.indexOf("Windows") != -1) ? true : false;

function addLoadEvent(func) {
    var curOnLoad = window.onload;

    if (typeof window.onload != 'function') {
        window.onload = func;
    }
    else {
        window.onload = function () {
            curOnLoad();
            func();
        }
    }
}

function delete_children(node) {
    // clean up on aisle 10..
    if (node.hasChildNodes()) {
        while (node.childNodes.length >= 1) {
            node.removeChild(node.firstChild);
        }
    }
}

function __obsolete_findPosition(obj) {
    var curLeft = curTop = 0;
    cssPos = (obj.style.position == 'absolute') ? obj.style.position : getStyle(obj.id.toString(), 'position');

    if (cssPos == "absolute") {
        curLeft = (obj.style.left != '') ? parseInt(obj.style.left) : parseInt(getStyle(obj.id.toString(), 'left'));
        curTop = (obj.style.top != '') ? parseInt(obj.style.top) : parseInt(getStyle(obj.id.toString(), 'top'));
    }
    else {
        if (obj.offsetParent) {
            curLeft = obj.offsetLeft;
            curTop = obj.offsetTop;

            while (obj = obj.offsetParent) {
                curLeft += obj.offsetLeft;
                curTop += obj.offsetTop;
            }
        }
    }
    return [curLeft, curTop];
}

function getPosition(obj) {
    var curLeft = curTop = 0;
    if (obj.offsetParent) {
        do {
            curLeft += obj.offsetLeft;
            curTop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    else {
        curLeft = obj.offsetLeft;
        curTop = obj.offsetTop;
    }


    return [curLeft, curTop];
}

function findSize(obj) {
    sx = (obj.style.width) ? parseInt(obj.style.width) : 0;
    sy = (obj.style.height) ? parseInt(obj.style.height) : 0;
    return [sx, sy];
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function __$(id) {
    if (!document.getElementById) return false;

    if (document.getElementById(id) == null || document.getElementById(id) == undefined) {
        return false;
    }
    else {
        return document.getElementById(id);
    }
}

function addListener(obj, type, callback, bubble) {
    if (document.addEventListener) {
        obj.addEventListener(type, callback, bubble);
    }
    else if (document.attachEvent) {
        obj.attachEvent("on" + type, callback, bubble);
    }
}

function removeListener(obj, type, callback) {
    if (document.removeEventListener) {
        obj.removeEventListener(type, callback, false);
    }
    else if (document.detachEvent) {
        obj.detachEvent("on" + type, callback, false);
    }
}

function MouseEvent(e) {
    this.e = (e) ? e : window.event;
    this.x = (e.PageX) ? e.PageX : e.clientX;
    this.y = (e.PageY) ? e.PageY : e.clientY;
    this.target = (e.target) ? e.target : e.srcElement;
    this.button = (e.button) ? e.button : e.button;
}

function MouseWheelEvent(e) {
    this.e = (e) ? e : window.event;
    this.delta = (e.detail) ? e.detail * -1 : e.wheelDelta / 40;
}

function cancelEvent(e) {
    e = (e) ? e : window.event;
    if (e.stopPropagation)
        e.stopPropagation();

    if (e.preventDefault)
        e.preventDefault();

    e.cancelBubble = true;
    e.cancel = true;
    e.returnValue = false;
    return false;
}

function KeyEvent(e) {
    this.keyCode = (e.keyCode) ? e.keyCode : e.which;

    // Alt Keys
    this.altKey = (e.altKey) ? true : false;
    this.altLeft = (e.altLeft) ? true : false;

    // Control Keys
    this.ctrlKey = (e.ctrlKey) ? true : false;
    this.ctrlLeft = (e.ctrlLeft) ? true : false;

    // Shift Keys
    this.shiftKey = (e.shiftKey) ? true : false;
    this.shiftLeft = (e.shiftLeft) ? true : false;
}

function getStyle(el, styleProp) {
    var x = $(el);
    if (x.currentStyle)
        var y = x.currentStyle[styleProp];
    else if (window.getComputedStyle)
        var y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
    return y;
}

function disableContext() {
    return false;
}