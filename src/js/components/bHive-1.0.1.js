function bHive(a) {
    this.setStageDimensions(a.width, a.height);
    this.setStageObject(a.domobject);
    this.init();
    if (a.hasOwnProperty("backgroundColor")) {this.setStageColor(a.backgroundColor)}
    if (a.hasOwnProperty("globalCompositeOperation")) {this.setGlobalComposite(a.globalCompositeOperation)}
}
bHive.fn = bHive.prototype = {stageTarget: null, stageObject: null, stage2d: null, undef: "undefined", defGA: 1, _objects: [], _events: [], _radians: Math.PI / 180, _mouseX: 0, _mouseY: 0, _stageHeight: 320, _stageWidth: 256, _frameRate: 33, _initialisedAt: null, _loopIdent: null, _loopFunction: null, _gfxLibrary: [], _gfxErrorCount: 0, _gfxLoaded: 0, _ready: false, _globalCompositeOperation: "source-over", init: function () {
    this.stageObject = document.createElement("canvas");
    this.stage2d = this.stageObject.getContext("2d");
    this.stageObject.height = this.sh = this._stageHeight;
    this.stageObject.width = this.sw = this._stageWidth;
    this.stage2d.globalAlpha = this.defGA;
    var a = this;
    addListener(this.stageObject, "mousemove", function (c) {return function (d) {c.mouseMover(d)}}(a), true);
    addListener(this.stageObject, "click", function (c) {return function (d) {c.mouseClick(d)}}(a), true);
    addListener(this.stageObject, "mousedown", function (c) {return function (d) {c.mouseDown(d)}}(a), true);
    addListener(this.stageObject, "mouseup", function (c) {return function (d) {c.mouseUp(d)}}(a), true);
    addListener(window, "keydown", function (c) {return function (d) {c.keyDown(d, c)}}(a), true);
    addListener(window, "keyup", function (c) {return function (d) {c.keyUp(d, c)}}(a), true);
    this.attachStage();
    this._initialisedAt = new Date()
}, addEventListener: function (c, a) {this._events[c] = a}, sizeof: function (d) {
    var c = 0;
    var e = /function (.{1,})\(/;
    for (var a in d) {
        result = e.exec(d[a].constructor.toString());
        if (result != null && result[1] == "Array") {c += this.sizeof(d[a])}
        else {c++}
    }
    return c
}, KeyEvent: function (a) {
    this.keyCode = (a.keyCode) ? a.keyCode : a.which;
    this.altKey = (a.altKey) ? true : false;
    this.altLeft = (a.altLeft) ? true : false;
    this.ctrlKey = (a.ctrlKey) ? true : false;
    this.ctrlLeft = (a.ctrlLeft) ? true : false;
    this.shiftKey = (a.shiftKey) ? true : false;
    this.shiftLeft = (a.shiftLeft) ? true : false
}, mainController: function () {
    var a = this;
    this.stage2d.clearRect(0, 0, this._stageWidth, this._stageHeight);
    if (typeof this._loopFunction == "function") {this._loopFunction.call(this)}
    this._loopIdent = setTimeout(function (c) {return function () {c.mainController()}}(a), this._frameRate)
}, mouseMover: function (a) {
    a = new MouseEvent(a);
    var c = getPosition(this.stageObject);
    this._mouseX = a.x - c[0];
    this._mouseY = a.y - c[1]
}, mouseClick: function (d) {
    d = new MouseEvent(d);
    xIn = yIn = false;
    if (typeof this._events.onclick != this.undef) {
        this._events.onclick.apply(this, [
            {x: this._mouseX, y: this._mouseY}
        ])
    }
    for (var a in this._objects) {
        var c = this._objects[a];
        if (c instanceof bHive.Clip) {
            if (this._mouseX > c.x && this._mouseX < c.x + c.width()) {xIn = true}
            if (this._mouseY > c.y && this._mouseY < c.y + c.height()) {yIn = true}
            if (xIn && yIn && typeof c.events.onclick == "function") {c.events.onclick({x: this._mouseX, y: this._mouseY, src: c})}
        }
    }
}, mouseDown: function (d) {
    d = new MouseEvent(d);
    xIn = yIn = false;
    if (typeof this._events.mousedown != this.undef) {
        this._events.mousedown.apply(this, [
            {x: this._mouseX, y: this._mouseY}
        ])
    }
    for (var a in this._objects) {
        var c = this._objects[a];
        if (c instanceof bHive.Clip) {
            if (this._mouseX > c.x && this._mouseX < c.x + c.width()) {xIn = true}
            if (this._mouseY > c.y && this._mouseY < c.y + c.height()) {yIn = true}
            if (xIn && yIn && typeof c.events.onclick == "function") {c.events.mousedown({x: this._mouseX, y: this._mouseY, src: c})}
        }
    }
}, mouseUp: function (d) {
    d = new MouseEvent(d);
    xIn = yIn = false;
    if (typeof this._events.mouseup != this.undef) {
        this._events.mouseup.apply(this, [
            {x: this._mouseX, y: this._mouseY}
        ])
    }
    for (var a in this._objects) {
        var c = this._objects[a];
        if (c instanceof bHive.Clip) {
            if (this._mouseX > c.x && this._mouseX < c.x + c.width()) {xIn = true}
            if (this._mouseY > c.y && this._mouseY < c.y + c.height()) {yIn = true}
            if (xIn && yIn && typeof c.events.onclick == "function") {c.events.mouseup({x: this._mouseX, y: this._mouseY, src: c})}
        }
    }
}, keyDown: function (f, c) {
    this.engine = c;
    f = new this.engine.KeyEvent(f);
    if (typeof this._events.onkeydown != this.undef) {this._events.onkeydown.apply(this, [f])}
    for (var a in this._objects) {
        var d = this._objects[a];
        if (d instanceof bHive.Clip) {if (typeof d.events.onkeydown == "function") {d.events.onkeydown(f)}}
    }
}, keyUp: function (f, c) {
    this.engine = c;
    f = new this.engine.KeyEvent(f);
    if (typeof this._events.onkeyup != this.undef) {this._events.onkeyup.apply(this, [f])}
    for (var a in this._objects) {
        var d = this._objects[a];
        if (d instanceof bHive.Clip) {if (typeof d.events.onkeyup == "function") {d.events.onkeyup(f)}}
    }
}, setStageDimensions: function (a, c) {
    this._stageHeight = c;
    this._stageWidth = a
}, setStageColor: function (a) {
    this._stageColor = a;
    this.stageObject.style.backgroundColor = a
}, setGlobalComposite: function (a) {
    this._globalCompositeOperation = a;
    this.stage2d.globalCompositeOperation = a
}, setStageObject: function (a) {
    if (typeof a == "string") {
        var c = document.getElementById(a);
        if (c !== this.undef) {this.stageTarget = c}
        else {}
    }
    else {this.stageTarget = a}
}, attachStage: function () {this.stageTarget.appendChild(this.stageObject)}, storeObject: function (c) {
    var a = this._objects.length;
    this._objects.push(c);
    return this._objects[a]
}, createClip: function (a) {
    var c = this;
    return this.storeObject(new bHive.Clip(a, c))
}, createBitmap: function (a) {
    var c = this;
    return this.storeObject(new bHive.Bitmap(a, c))
}, createLine: function (a) {
    var c = this;
    return this.storeObject(new bHive.Line(a, c))
}, createText: function (a) {
    var c = this;
    return this.storeObject(new bHive.Text(a, c))
}, createShape: function (a) {
    var c = this;
    return this.storeObject(new bHive.Shape(a, c))
}, theLoop: function (c) {
    var a = this;
    this._loopFunction = c;
    this._loopIdent = setTimeout(function (d) {return function () {d.mainController()}}(a), this._frameRate)
}, getRotatedSize: function (a) {
    radians = (2 * Math.PI * a.rotation) / 360;
    cosine = Math.cos(radians);
    sine = Math.sin(radians);
    objNH = a.image.naturalHeight;
    objNW = a.image.naturalWidth;
    point1_x = -objNH * sine;
    point1_y = objNH * cosine;
    point2_x = objNW * cosine - objNH * sine;
    point2_y = objNH * cosine + objNW * sine;
    point3_x = objNW * cosine;
    point3_y = objNW * sine;
    minx = Math.min(0, Math.min(point1_x, Math.min(point2_x, point3_x)));
    miny = Math.min(0, Math.min(point1_y, Math.min(point2_y, point3_y)));
    maxx = Math.max(point1_x, Math.max(point2_x, point3_x));
    maxy = Math.max(point1_y, Math.max(point2_y, point3_y));
    rotwidth = Math.round(maxx - minx);
    rotheight = Math.round(maxy - miny);
    return{width: rotwidth, height: rotheight}
}, hex2RGBa: function (d, f) {
    var e = g = b = 0;
    var c = 1;
    if (f > 100) {f = 100}
    else {if (f < 0) {f = 0}}
    c = f / 100;
    d = (d.charAt(0) == "#") ? d.substring(1, d.length) : d;
    if (d.length == 3) {
        e = parseInt(d.substring(0, 1) + d.substring(0, 1), 16);
        g = parseInt(d.substring(1, 2) + d.substring(1, 2), 16);
        b = parseInt(d.substring(2, 3) + d.substring(2, 3), 16)
    }
    else {
        e = parseInt(d.substring(0, 2), 16);
        g = parseInt(d.substring(2, 4), 16);
        b = parseInt(d.substring(4, 6), 16)
    }
    return"rgba(" + e + ", " + g + ", " + b + ", " + c + ")"
}};
bHive.Bitmap = function (a, e) {
    var d = this;
    this.engine = e;
    this.events = [];
    for (var c in a) {this[c] = a[c]}
    this.image = new Image();
    this.image.src = this.src;
    this.image.onload = (function (f) {return function () {if (typeof f.events.onload != f.engine.undef) {f.events.onload()}}})(d)
};
bHive.Bitmap.prototype = {engine: null, src: "", image: null, events: null, x: 0, y: 0, registration_x: 0, registration_y: 0, rotation: 0, visible: true, alpha: 100, x_scale: 100, y_scale: 100, addEventListener: function (c, a) {this.events[c] = a}, draw: function (d, c) {
    d = (typeof d == this.engine.undef) ? 0 : d;
    c = (typeof c == this.engine.undef) ? 0 : c;
    if (typeof this.parent != this.engine.undef) {
        pA = this.parent.alpha;
        A = this.alpha;
        if (pA < 100) {
            newGA = pA;
            if (A < 100) {
                percentage = pA * (A / 100);
                newGA = pA - percentage
            }
            this.engine.stage2d.globalAlpha = Math.abs(newGA) / 100
        }
        else {if (A < 100) {this.engine.stage2d.globalAlpha = A / 100}}
    }
    else {if (this.alpha < 100) {this.engine.stage2d.globalAlpha = this.alpha / 100}}
    iW = this.image.naturalWidth;
    iH = this.image.naturalHeight;
    if (typeof this.parent != this.engine.undef) {
        if (this.x_scale != 100) {iW = iW * (this.x_scale / 100)}
        if (this.parent.x_scale != 100) {iW = iW * (this.parent.x_scale / 100)}
    }
    else {if (this.x_scale != 100) {iW = this.iW * (this.x_scale / 100)}}
    if (typeof this.parent != this.engine.undef) {
        if (this.x_scale != 100) {iH = iH * (this.y_scale / 100)}
        if (this.parent.x_scale != 100) {iH = iH * (this.parent.y_scale / 100)}
    }
    else {if (this.y_scale != 100) {iH = iH * (this.y_scale / 100)}}
    if (this.rotation != 0) {
        this.engine.stage2d.save();
        var a = d + this.x;
        var e = c + this.y;
        if (this.rotation > 360) {this.rotation = 0}
        this.engine.stage2d.translate(a, e);
        this.engine.stage2d.rotate(this.rotation * this.engine._radians);
        this.engine.stage2d.drawImage(this.image, this.registration_x * -1, this.registration_y * -1, iW, iH);
        this.engine.stage2d.restore()
    }
    else {this.engine.stage2d.drawImage(this.image, d + this.x, c + this.y, iW, iH)}
    if (this.alpha < 100) {this.engine.stage2d.globalAlpha = this.engine.defGA}
}};
bHive.Clip = function (a, d) {
    this.engine = d;
    this._childObjects = [];
    this.events = [];
    for (var c in a) {this[c] = a[c]}
};
bHive.Clip.prototype = {id: null, events: null, visible: true, _childObjects: null, alpha: 100, x: 0, y: 0, x_scale: 100, y_scale: 100, addEventListener: function (c, a) {this.events[c] = a}, add: function (a) {
    this._childObjects.push(a);
    var c = this;
    a.parent = c
}, draw: function (d, c) {
    d = (typeof d == this.engine.undef) ? 0 : d;
    c = (typeof c == this.engine.undef) ? 0 : c;
    if (this.visible) {for (var a in this._childObjects) {this._childObjects[a].draw(d + this.x, c + this.y)}}
}, point: function (a, f, c) {
    var c = 2 * Math.PI * c / 360;
    var e = a * Math.cos(c) + f * Math.sin(c);
    var d = f * Math.cos(c) - a * Math.sin(c);
    return[e, d]
}, width: function () {
    var a = [];
    if (this._childObjects.length > 0) {
        for (var d in this._childObjects) {
            var c = this._childObjects[d];
            if (c instanceof bHive.Bitmap) {
                if (c.rotation > 0) {
                    rotatedDimensions = engine.getRotatedSize(c);
                    a.push(rotatedDimensions.width + c.x)
                }
                else {a.push(c.image.naturalWidth + c.x)}
            }
            else {if (c instanceof bHive.Clip && c.visible) {a.push(c.width() + c.x)}}
        }
        return Math.max.apply(0, a)
    }
    else {return 0}
}, height: function () {
    var a = [];
    if (this._childObjects.length > 0) {
        for (var d in this._childObjects) {
            var c = this._childObjects[d];
            if (c instanceof bHive.Bitmap) {
                if (c.rotation > 0) {
                    rotatedDimensions = engine.getRotatedSize(c);
                    a.push(rotatedDimensions.height + c.y)
                }
                else {a.push(c.image.naturalHeight + c.y)}
            }
            else {if (c instanceof bHive.Clip) {a.push(c.height() + c.y)}}
        }
        return Math.max.apply(0, a)
    }
    else {return 0}
}};
bHive.Line = function (a, d) {
    this.engine = d;
    for (var c in a) {this[c] = a[c]}
};
bHive.Line.prototype = {weight: 1, cap: "butt", corner: "miter", start: null, end: null, visible: true, draw: function () {
    if (this.start instanceof Array) {
        x1 = this.start[0];
        y1 = this.start[1]
    }
    else {
        if (typeof this.start == "string") {
            switch (this.start) {
                case"mouse":
                    x1 = this.engine._mouseX;
                    y1 = this.engine._mouseY;
                    break
            }
        }
        else {
            if (this.start instanceof Object) {
                x1 = this.start.x;
                y1 = this.start.y
            }
        }
    }
    if (this.end instanceof Array) {
        x2 = this.end[0];
        y2 = this.end[1]
    }
    else {
        if (typeof this.end == "string") {
            switch (this.end) {
                case"mouse":
                    x2 = this.engine._mouseX;
                    y2 = this.engine._mouseY;
                    break
            }
        }
        else {
            if (this.start instanceof Object) {
                x2 = this.end.x;
                y2 = this.end.y
            }
        }
    }
    this.engine.stage2d.save();
    this.engine.stage2d.beginPath();
    this.engine.stage2d.lineWidth = this.weight;
    this.engine.stage2d.lineCap = this.cap;
    this.engine.stage2d.lineJoin = this.corner;
    this.engine.stage2d.moveTo(x1, y1);
    this.engine.stage2d.lineTo(x2, y2);
    this.engine.stage2d.stroke();
    this.engine.stage2d.restore()
}};
bHive.Text = function (a, d) {
    this.engine = d;
    for (var c in a) {this[c] = a[c]}
};
bHive.Text.prototype = {text: null, x: 0, y: 0, align: "top", color: "rgb(0, 0, 0, 0)", visible: true, draw: function (c, a) {
    c = (typeof c == this.engine.undef) ? 0 : c;
    a = (typeof a == this.engine.undef) ? 0 : a;
    this.engine.stage2d.textBaseline = this.align;
    this.engine.stage2d.fillStyle = this.color;
    this.engine.stage2d.fillText(this.text, c + this.x, a + this.y)
}, };
bHive.Shape = function (a, d) {
    this.engine = d;
    for (var c in a) {this[c] = a[c]}
};
bHive.Shape.prototype = {shape: "square", style: "filled", x: 0, y: 0, width: 0, height: 0, radius: 0, backgroundColor: "rgba(0, 0, 0, 1)", strokeColor: "rgba(0, 0, 0, 1)", strokeWeight: 1, alpha: 100, draw: function () {
    var a = this.engine.stage2d;
    var c = (this.backgroundColor.indexOf("rgba") != -1 || this.backgroundColor.indexOf("rgb") != -1) ? this.backgroundColor : this.engine.hex2RGBa(this.backgroundColor, this.alpha);
    switch (this.shape) {
        case"square":
            a.save();
            if (this.style == "filled") {
                a.fillStyle = c;
                a.fillRect(this.x, this.y, this.width, this.height)
            }
            else {
                a.lineWidth = 1;
                a.strokeStyle = this.engine.hex2RGBa(this.backgroundColor, this.alpha);
                a.strokeRect(this.x, this.y, this.width, this.height)
            }
            a.restore();
            break;
        case"circle":
            a.save();
            if (this.style == "filled") {
                a.beginPath();
                a.fillStyle = c;
                a.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
                a.fill()
            }
            else {
                a.beginPath();
                a.strokeStyle = this.engine.hex2RGBa(this.strokeColor, this.alpha);
                a.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
                a.stroke()
            }
            a.restore();
            break
    }
}};