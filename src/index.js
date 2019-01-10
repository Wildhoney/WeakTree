const set = function recurse(map, [key, ...keys], value) {
    const isLast = keys.length === 0;
    const isValid = map.has(key);
    const result =
        (!isValid || isLast) && map.set(key, isLast ? value : new WeakMap());
    return isLast ? result : recurse(map.get(key), keys, value);
};

const get = f =>
    function recurse(map, [key, ...keys]) {
        const isLast = keys.length === 0;
        const isValid = map.has(key);
        return isLast || !isValid
            ? f.call(map, key)
            : recurse(map.get(key), keys);
    };

export default function WeakTree(iterator) {
    const map = new WeakMap();

    const helpers = {
        set: set,
        get: get(map.get),
        has: get(map.has),
        delete: get(map.delete)
    };

    const isIterable =
        iterator && typeof iterator[Symbol.iterator] === 'function';
    isIterable &&
        iterator.forEach(([keys, value]) => helpers.set(map, keys, value));

    return {
        set: (keys, value) => helpers.set(map, keys, value),
        get: keys => helpers.get(map, keys),
        has: keys => helpers.has(map, keys),
        delete: keys => helpers.delete(map, keys)
    };
}
