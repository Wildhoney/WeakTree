import test from 'ava';
import WeakTree from './index.js';

const adam = {};
const maria = {};
const watford = {};

test('It should be able to set, get and delete from the composited WeakMap;', t => {
    const wt = new WeakTree();

    wt.set([watford, adam], 'Adam');
    wt.set([watford, maria], 'Maria');

    t.true(wt.get([watford]) instanceof WeakMap);
    t.is(wt.get([watford, adam]), 'Adam');
    t.is(wt.get([watford, maria]), 'Maria');

    t.true(wt.delete([watford, adam]));
    t.false(wt.has([watford, adam]));
    t.true(wt.has([watford, maria]));

    t.false(wt.has([adam, maria]));
    t.false(wt.delete([adam, maria]));
});

test('It should be able to initialise the tree with a set of predefined values;', t => {
    const keys = [[[watford, adam], 'Adam'], [[watford, maria], 'Maria']];

    const wt = new WeakTree(keys);
    t.is(wt.get([watford, adam]), 'Adam');
    t.is(wt.get([watford, maria]), 'Maria');
});

test('It should return the same types from the functions as WeakMap itself;', t => {
    const wt = new WeakTree();
    const wm = new WeakMap();
    t.is(
        wt.set([watford], 'Watford').toString(),
        wm.set(watford, 'Watford').toString()
    );
    t.is(wt.get([watford]), wm.get(watford));
    t.is(wt.has([watford]), wm.has(watford));
    t.is(wt.delete([watford]), wm.delete(watford));
});
