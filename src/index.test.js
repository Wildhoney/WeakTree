import test from 'ava';
import WeakTree from './index.js';

const key = {
    adam: function adam() {},
    maria: function maria() {},
    watford: function watford() {}
};

test('It should be able to set, get and delete from the composited WeakMap;', t => {
    const wt = new WeakTree();
    wt.set([key.watford, key.adam], 'Adam');
    wt.set([key.watford, key.maria], 'Maria');
    t.is(wt.get([key.watford, key.adam]), 'Adam');
    t.is(wt.get([key.watford, key.maria]), 'Maria');
    wt.delete([key.watford, key.adam]);
    t.false(wt.has([key.watford, key.adam]));
    t.true(wt.has([key.watford, key.maria]));
});

test('It should return the same types from the functions as WeakMap itself;', t => {
    const wt = new WeakTree();
    const wm = new WeakMap();
    t.is(
        wt.set([key.watford], 'Watford').toString(),
        wm.set(key.watford, 'Watford').toString()
    );
    t.is(wt.get([key.watford]), wm.get(key.watford));
    t.is(wt.has([key.watford]), wm.has(key.watford));
    t.is(wt.delete([key.watford]), wm.delete(key.watford));
});
