export const set = map =>
    function setR(keys, value) {
        const last = keys.length === 1;
        const [key, ...remainingKeys] = keys;
        map.set(key, value);
        return last ? map : setR(remainingKeys, value);
    };

export const fetch = (f, map) =>
    function fetchR(keys) {
        const last = keys.length === 1;
        const [key, ...remainingKeys] = keys;
        return last ? map[f](key) : fetchR(remainingKeys);
    };

export const remove = map =>
    function deleteR(keys) {
        const last = keys.length === 1;
        const [key, ...remainingKeys] = keys;
        return last ? map.delete(key) : deleteR(remainingKeys);
    };
