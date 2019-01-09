import * as u from './utils.js';

export default class WeakTree {
    constructor() {
        const map = new WeakMap();
        this.helpers = {
            set: u.set(map),
            get: u.fetch('get', map),
            has: u.fetch('has', map),
            delete: u.remove(map)
        };
    }

    set(keys, value) {
        return this.helpers.set(keys, value);
    }

    get(keys) {
        return this.helpers.get(keys);
    }

    has(keys) {
        return this.helpers.has(keys);
    }

    delete(keys) {
        return this.helpers.delete(keys);
    }
}
