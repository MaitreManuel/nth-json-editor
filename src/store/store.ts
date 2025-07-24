// @ts-ignore
import _ from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm';

const store: Record<string, unknown> = {};

const get = (path: string) => {
  return store[path];
};

const set = (path: string, value: unknown) => {
  console.log(_.get(store, path))
  _.set(store, path, value);
  console.log(_.get(store, path))

  document.dispatchEvent(new CustomEvent('DOMRefresh'));
};

export { get, set };
