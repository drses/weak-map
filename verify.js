var WeakMap = require("./weak-map");
if (WeakMap === global.WeakMap) {
    console.log("native");
} else {
    console.log("shim");
}
var wm1 = new WeakMap();
var wm2 = new WeakMap();
var o = {};
wm1.set(o, 10);
wm2.set(o, 20);
if (wm1.get(o) !== 10) {
    console.log("error");
}

