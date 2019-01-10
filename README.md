<img src="media/logo.png" alt="Switzerland" width="300" />

> WeakMap implementation that allows for composite keys in a tree formation.

![Travis](http://img.shields.io/travis/Wildhoney/WeakTree.svg?style=for-the-badge)
&nbsp;
![npm](http://img.shields.io/npm/v/weaktree.svg?style=for-the-badge)
&nbsp;
![License MIT](http://img.shields.io/badge/license-mit-lightgrey.svg?style=for-the-badge)
&nbsp;
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

**npm**: `npm install weaktree`

## Getting Started

Use the array notation to set keys for your `WeakTree`. You can perform the same operations on a `WeakTree` as you can on a `WeakMap`, such as `set`, `get`, `has` and `delete`.

```javascript
import WeakTree from 'weaktree';

const tree = new WeakTree();

const a = {};
const b = {};

const x = {};
const y = {};
const z = {};

tree.set([a, b, x], `Life without love is like a tree without blossoms or fruit.`);
tree.set([a, b, y], `If you don't like how things are, change it! You're not a tree.`);
tree.set([a, b, z], `I looked up my family tree and found out I was the sap.`);

tree.get([a, b, y]); // If you don't like how things are, change it! You're not a tree.
```
