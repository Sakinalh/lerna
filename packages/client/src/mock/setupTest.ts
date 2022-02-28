// @testing-library/react renders your components to document.body,
// this will ensure they're removed after each test.
import "@testing-library/react/cleanup-after-each";
// this adds jest-dom's custom assertions
import "jest-dom/extend-expect";

require("jest-localstorage-mock");

class LocalStorageMock {
    store;

    constructor() {
      this.store = {};
    }

    clear() {
      this.store = {};
    }

    getItem(key) {
      return this.store[key] || null;
    }

    setItem(key, value) {
      this.store[key] = value.toString();
    }

    removeItem(key) {
      delete this.store[key];
    }
}

(global as any).localStorage = new LocalStorageMock();
