
`WeakMap` is a new collection slated to be introduced to JavaScript with
EcmaScript 6.  It provides a mapping from objects to values, but allows
any entry to be garbage collected if the key is provably lost.

In order for it to be possible that a key is provably lost, weak maps do
not provide a way to access the key list.

This is a Node Packaged Module (NPM) that provides a suitable shim and
patcher for missing or broken WeakMap implementations.

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

