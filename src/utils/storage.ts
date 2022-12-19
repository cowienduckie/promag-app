const storagePrefix = "promag_app_react_";

const storage = {
  getToken: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    );
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
  getObject: (key: string) => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}${key}`) as string
    );
  },
  setObject: (key: string, object: object) => {
    window.localStorage.setItem(
      `${storagePrefix}${key}`,
      JSON.stringify(object)
    );
  },
  clearObject: (key: string) => {
    window.localStorage.removeItem(`${storagePrefix}${key}`);
  }
};

export default storage;
