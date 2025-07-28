// @ts-ignore
import _ from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm';

const store: Record<string, unknown> = {};

const addArrayPath = (path: string) => {
  _.set(store, 'arrayPaths', [...(get(`arrayPaths`) || []), path]);
};

const addArrayItem = () => {

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

const setRawData = (value: string, path: string) => {
  let typedValue: unknown = value;

  try {
    typedValue = JSON.parse(value);
  } catch (error) {}

  switch (true) {
    case ['false', 'true'].includes(value):
      typedValue = value === 'true';
      break;
    case !isNaN(Number(value)):
      typedValue = Number(value);
      break;
  }

  if (isArrayPath(path)) {
    set(path, [...get(path), typedValue]);
  } else {
    set(path, typedValue);
  }
};

export {
  addArrayItem,
  addArrayPath,
  get,
  move,
  remove,
  set,
  setRawData,
};
