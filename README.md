
`WeakMap` is a collection slated to be introduced to JavaScript with
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

As stated by Mark Miller in the code:

> As with true WeakMaps, in this emulation, a key does not retain maps indexed by
> that key and (crucially) a map does not retain the keys it indexes. A map by
> itself also does not retain the values associated with that map.
>
> However, the values associated with a key in some map are retained so long as
> that key is retained and those associations are not overridden. For example,
> when used to support membranes, all values exported from a given membrane will
> live for the lifetime they would have had in the absence of an interposed
> membrane. Even when the membrane is revoked, all objects that would have been
> reachable in the absence of revocation will still be reachable, as far as the
> GC can tell, even though they will no longer be relevant to ongoing
> computation.
>
> The API implemented here is approximately the API as implemented
> in FF6.0a1 and agreed to by MarkM, Andreas Gal, and Dave Herman,
> rather than the offially approved proposal page.
>
> The first difference between the emulation here and that in FF6.0a1 is the
> presence of non enumerable `get___`, `has___`, `set___`, and `delete___`}
> methods on WeakMap instances to represent what would be the hidden internal
> properties of a primitive implementation. Whereas the FF6.0a1 WeakMap.prototype
> methods require their `this` to be a genuine WeakMap instance (i.e., an object
> of `[[Class]]` "WeakMap}), since there is nothing unforgeable about the
> pseudo-internal method names used here, nothing prevents these emulated
> prototype methods from being applied to non-WeakMaps with pseudo-internal
> methods of the same names.
>
> Another difference is that our emulated `WeakMap.prototype` is not itself a
> WeakMap. A problem with the current FF6.0a1 API is that WeakMap.prototype is
> itself a WeakMap providing ambient mutability and an ambient communications
> channel. Thus, if a WeakMap is already present and has this problem,
> repairES5.js wraps it in a safe wrappper in order to prevent access to this
> channel. (See PATCH_MUTABLE_FROZEN_WEAKMAP_PROTO in repairES5.js).

This refers to `repairES5.js` as provided by Google Caja.

