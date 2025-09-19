export interface BaseStorage<T> {
    set(data: T): void;
    get(): T | null;

    remove(): void;

    setRaw(data: string): void;
    getRaw(): string;
}

export const baseStorage = <T>(key: string): BaseStorage<T> => {
    const localStorage: Storage = window.localStorage;

    const set = (data: T): void => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    const get = (): T | null => {
        try {
            const value = localStorage.getItem(key);

            return value ? JSON.parse(value) as T : null;
        } catch {
            return null;
        }
    };

    const remove = (): void => {
        localStorage.removeItem(key);
    };

    const setRaw = (data: string): void => {
        localStorage.setItem(key, data);
    };

    const getRaw = (): string => {
        return localStorage.getItem(key) || '';
    };

    return {
        set,
        get,
        remove,
        setRaw,
        getRaw,
    };
};
