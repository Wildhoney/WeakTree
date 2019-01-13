const set = function recurse(map) {
    return ([key, ...keys], value) => {
        const isLast = keys.length === 0;
        const isValid = map.has(key);
        const result =
            (!isValid || isLast) &&
            map.set(key, isLast ? value : new WeakMap());
        return isLast ? result : recurse(map.get(key))(keys, value);
    };
};

const get = f =>
    function recurse(map) {
        return ([key, ...keys]) => {
            const isLast = keys.length === 0;
            const isValid = map.has(key);
            return isLast || !isValid
                ? f.call(map, key)
                : recurse(map.get(key))(keys);
        };
    };

const isWeakMap = a => a instanceof WeakMap;

const isIterable = a => a && typeof a[Symbol.iterator] === 'function';

export default function WeakTree(data) {
    const map = isWeakMap(data) ? data : new WeakMap();

    const f = {
        set: set(map),
        get: get(map.get)(map),
        has: get(map.has)(map),
        delete: get(map.delete)(map)
    };

    isIterable(data) && data.forEach(([keys, value]) => f.set(keys, value));

    return {
        set: f.set,
        get: f.get,
        has: f.has,
        delete: f.delete,
        slice: keys => {
            const value = f.get(keys);
            return isWeakMap(value) ? new WeakTree(value) : value;
        }
    };
}
