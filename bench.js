
var WeakMap = require("./weak-map");

var keys = [];
for (var i = 0; i < 1000; i++) {
    keys.push({});
}

suite("WeakMap", function () {
    bench("set", function () {
        var map = new WeakMap();
        for (var i = 0; i < keys.length; i++) {
            map.set(keys[i], i);
        }
    });
    bench("get", function () {
        var map = new WeakMap();
        for (var i = 0; i < keys.length; i++) {
            map.get(keys[i]);
        }
    });
});

