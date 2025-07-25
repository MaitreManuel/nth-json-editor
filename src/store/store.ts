// @ts-ignore
import _ from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm';

const store: Record<string, unknown> = {};

const get = (path: string) => {
  return _.get(store, path);
};

const move = (path: string, index: number, indexToSwitch: number) => {
  const tabBuffer = [...get(path)];

  if (index > -1 && index < tabBuffer.length) {
    [tabBuffer[index], tabBuffer[indexToSwitch]] = [tabBuffer[indexToSwitch], tabBuffer[index]];
  }

  set(path, tabBuffer);

  document.dispatchEvent(new CustomEvent('DOMRefresh'));
};

const remove = (path: string, index?: string) => {
  if (index) {
    const tabBuffer = [...get(path)];

    tabBuffer.splice(parseInt(index), 1);

    set(path, tabBuffer);
  } else {
    _.unset(store, path);
  }

  document.dispatchEvent(new CustomEvent('DOMRefresh'));
};

const set = (path: string, value: unknown) => {
  _.set(store, path, value);

  document.dispatchEvent(new CustomEvent('DOMRefresh'));
};

export { get, move, remove, set };
