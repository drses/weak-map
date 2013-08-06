var WeakMap = require("./weak-map");
if (WeakMap === global.WeakMap) {
    console.log("native");
} else {
    console.log("shim");
}
