
var WeakMap = require("../weak-map");

var weakMap = new WeakMap();
var p = Object.freeze({});
var o = {};

it("adds a non-extant entry", function () {
    expect(weakMap.has(o)).toBe(false);
    expect(weakMap.get(o)).toBe(undefined);
    weakMap.set(o, 10);
    expect(weakMap.has(o)).toBe(true);
    expect(weakMap.get(o)).toBe(10);
});

it("adds an extant entry", function () {
    expect(weakMap.has(o)).toBe(true);
    weakMap.set(o, 11);
    expect(weakMap.has(o)).toBe(true);
    expect(weakMap.get(o)).toBe(11);
});

it("adds a non-extant frozen entry", function () {
    expect(weakMap.has(p)).toBe(false);
    expect(weakMap.get(p)).toBe(undefined);
    weakMap.set(p, 12);
    expect(weakMap.has(p)).toBe(true);
    expect(weakMap.get(p)).toBe(12);
});

it("adds an extant frozen entry", function () {
    expect(weakMap.has(p)).toBe(true);
    expect(weakMap.get(p)).toBe(12);
    weakMap.set(p, 13);
    expect(weakMap.has(p)).toBe(true);
    expect(weakMap.get(p)).toBe(13);
});

it("deletes an extant frozen entry", function () {
    expect(weakMap.delete(p)).toBe(true);
    expect(weakMap.has(p)).toBe(false);
});

it("deletes a non-extant frozen entry", function () {
    expect(weakMap.delete(p)).toBe(false);
    expect(weakMap.has(p)).toBe(false);
    expect(weakMap.get(p)).toBe(undefined);
});

it("gets extant entry after freezing", function () {
    Object.freeze(o);
    expect(weakMap.has(o)).toBe(true);
    expect(weakMap.get(o)).toBe(11);
});

it("deletes an extant entry post freeze", function () {
    expect(weakMap.delete(o)).toBe(true);
    expect(weakMap.has(o)).toBe(false);
});

it("deletes a non-extant entry post freeze", function () {
    expect(weakMap.delete(o)).toBe(false);
    expect(weakMap.has(o)).toBe(false);
});

it("set returns self", function () {
    console.log("known issue with native WeakMap in Node.js/V8");
    var weakMap = new WeakMap();
    expect(weakMap.set({}, 10)).toBe(weakMap);
});

