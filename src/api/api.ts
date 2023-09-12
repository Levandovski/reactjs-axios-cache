import { setup } from 'axios-cache-adapter';
import localforage from 'localforage';
import { getURLCached } from './cache';

const localforageStore = localforage.createInstance({
  driver: [localforage.LOCALSTORAGE, localforage.INDEXEDDB],
  name: 'NOME_QUE APARECE_NO_LOCALSTORAGE',
});

const api = setup({
  baseURL: process.env.REACT_APP_HOST_API,
  cache: {
    maxAge: 2 * 60 * 1000,
    store: localforageStore,
    exclude: {
      filter: (req: any) => {
        if (getURLCached(req)) {
          console.log('AQUI', false);
          return false;
        }
      }, // true não cacheia, false cacheia
      query: false,
    },
  },
});

export default api;
