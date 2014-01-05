var p = Object.freeze({});
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
wm1.set(p, 11);
wm2.set(o, 20);
wm2.set(p, 21);

if (wm1.get(o) !== 10) {
  console.log("get error");
}

if (wm1.get(p) !== 11) {
  console.log("pre-freeze get error");
}

Object.freeze(o);
if (wm2.get(o) !== 20) {
  console.log("post-freeze get error");
}
if (wm2.has(o) !== true) {
  console.log("has error");
}
wm2.delete(o);
if (wm2.has(o) !== false) {
  console.log("error");
}
