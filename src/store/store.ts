// @ts-ignore
import _ from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm';

const store: Record<string, unknown> = {};

const addArrayPath = (path: string) => {
  _.set(store, 'arrayPaths', [...(get(`arrayPaths`) || []), path]);
};

const get = (path: string) => {
  return _.get(store, path);
};

const isArrayPath = (path: string) => {
  return get(`arrayPaths`).includes(path);
};

const move = (path: string, index: number, indexToSwitch: number) => {
  const tabBuffer = [...get(path)];

  if (index > -1 && index < tabBuffer.length) {
    [tabBuffer[index], tabBuffer[indexToSwitch]] = [tabBuffer[indexToSwitch], tabBuffer[index]];
  }

  set(path, tabBuffer);

  document.dispatchEvent(new CustomEvent('DOMRefresh'));
};

const remove = (path: string) => {
  const splitPath = path.split('.');
  const parentPath = splitPath.slice(0, splitPath.length - 1).join('.');

  if (isArrayPath(parentPath)) {
    const index = parseInt(splitPath[splitPath.length -1]);
    const value = get(parentPath);

    value.splice(index, 1);

    set(parentPath, value);
  } else {
    _.unset(store, path);
  }

  document.dispatchEvent(new CustomEvent('DOMRefresh'));
};

const set = (path: string, value: unknown) => {
  _.set(store, path, value);

  document.dispatchEvent(new CustomEvent('DOMRefresh'));
};

export {
  addArrayPath,
  get,
  move,
  remove,
  set
};
