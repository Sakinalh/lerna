export class LocalStorageMock {
    private store: {
        hookia_token: string;
    } | null = {
      hookia_token: "someKey"
    };

    clear() {
      this.store = null;
    }

    getItem(key: "hookia_token") {
      return (
        (this.store as {
                hookia_token: string;
            })[key] || null
      );
    }

    setItem(key: "hookia_token", value: string) {
      (this.store as {
            hookia_token: string;
        })[key] = value;
    }

    removeItem(key: "hookia_token") {
      delete (this.store as any)[key];
    }
}
