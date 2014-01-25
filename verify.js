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
if (wm1.set(o, 10) !== wm1) {
  console.log("error adding a non-extant entry");
}
if (wm1.set(o, 10) !== wm1) {
  console.log("error adding an extant entry");
}
if (wm1.set(p, 11) !== wm1) {
  console.log("error adding a non-extant frozen entry");
}
if (wm1.set(p, 11) !== wm1) {
  console.log("error adding an extant frozen entry");
}
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

if (wm1.delete(o) !== true) {
  console.log("error on delete extant value");
}
if (wm1.delete({}) !== false) {
  console.log("error on delete non-extant value");
}
if (wm1.delete(p) !== true) {
  console.log("error on delete frozen extant value");
}
if (wm1.delete(Object.freeze({})) !== false) {
  console.log("error on delete frozen non-extant value");
}
