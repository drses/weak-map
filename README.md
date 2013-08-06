
`WeakMap` is a new collection slated to be introduced to JavaScript with
EcmaScript 6.  It provides a mapping from objects to values, but allows
any entry to be garbage collected if the key is provably lost.

In order for it to be possible that a key is provably lost, weak maps do
not provide a way to access the key list.

This is a Node Packaged Module (NPM) that provides a shim and patcher
for missing or broken WeakMap implementations suitable for use in
Node.js and browsers that provide the EcmaScript 5 property description
interfaces provided that it hosted by a CommonJS loader or bundler like
[Browserify][], [Montage][], [Mr][], or [Mop][].

[Browserify]: https://github.com/substack/node-browserify
[Montage]: https://github.com/montagejs/mr
[Mr]: https://github.com/montagejs/mr
[Mop]: https://github.com/montagejs/mop

```
npm install weak-map --save
```

```javascript
var WeakMap = require("weak-map");
var map = new WeakMap();
var key = {};
map.set(key, "Hello, World!");
map.get(key) === "Hello, World!";
key = null;
// "Hello, World!" may be collected
```

See [MDN][] for the API details.

[MDN]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap

At time of writing, prototype implementations of `WeakMap` exist in V8
and Spidermonkey.  The prototype is available in Node.js v0.10 with the
`--harmony_collections` V8 option.  In v0.8, it was available with
`--harmony_weakmaps`.  The purpose of this package is to enable
dependees to use weak maps regardless of whether they are implemented by
the underlying engine, albeit in a way that leaks memory in some
non-obvious cases.

The canonical implementation of `WeakMap` exists in the Google Caja
Subversion repository at http://google-caja.googlecode.com/svn/trunk.
It was written by Mark S. Miller.  It is released by Google with the
Apache 2.0 license.  This package is maintained by Kris Kowal.

In a nutshell, the WeakMap shim emulates a WeakMap by adding a hidden
property to the key that associates the weak map with the retained
object.  Thus, in many cases, if the key is garbage collected, the value
may be garbage collected.  I will leave [Mark Miller][Proposal] to
evince the details.  The shim depends on EcmaScript 5’s API’s to cover
its tracks.

[Proposal]: http://wiki.ecmascript.org/doku.php?id=harmony:weak_maps

