
var Suite = require("jasminum");
var WeakMap = require("../weak-map");

var name = WeakMap === global.WeakMap ? "native WeakMap" : "shim WeakMap";
var suite = new Suite(name).describe(function () {
    require("./weak-map-test.js");
});

suite.runAndReport().done();

