const set = function recurse(map, keys, value) {
    const [key, ...remainingKeys] = keys;
    const isLast = keys.length === 1;
    const isValid = map.has(key);
    const result =
        (!isValid || isLast) && map.set(key, isLast ? value : new WeakMap());
    return isLast ? result : recurse(map.get(key), remainingKeys, value);
};

const get = f =>
    function recurse(map, keys) {
        const [key, ...remainingKeys] = keys;
        const isLast = keys.length === 1;
        const isValid = map.has(key);
        return isLast || !isValid
            ? f.call(map, key)
            : recurse(map.get(key), remainingKeys);
    };

export default class WeakTree {
    constructor() {
        const m = (this.map = new WeakMap());
        this.helpers = {
            set: set,
            get: get(m.get),
            has: get(m.has),
            delete: get(m.delete)
        };
    }

    set(keys, value) {
        return this.helpers.set(this.map, keys, value);
    }

    get(keys) {
        return this.helpers.get(this.map, keys);
    }

    has(keys) {
        return this.helpers.has(this.map, keys);
    }

    delete(keys) {
        return this.helpers.delete(this.map, keys);
    }
}
