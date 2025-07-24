import { get, set } from '../store/store.ts';

import type { Component } from '../registries/componentsRegistry.ts';

const handler = (event: Event) => {
  if (!event?.target) {
    return;
  }

  switch (event.type) {
    case 'submit':
      console.log('coucou le sub');
      break;
    case 'click':
    default:
      const $element = event.target as HTMLElement;

      if (!$element.dataset?.path) {
        return;
      }

      set('edit', $element.dataset.path);
      break;
  }
};

const support = (value: unknown) => typeof value === 'number';

const renderLabel = (key: string, path: string) => {
  return `
    <label class="component__node--key" for="${path}">
      ${key} :
    </label>
  `;
};

const renderEdit = (value: number, path: string, key: string) => {
  return `
      <div
        class="component-edit__entry"
      >
        <label for="edit-${path}">${key}</label>
        <input id="edit-${path}" type="number" value="${value}" />
        <button
          data-event="number"
          type="submit"
        >
          Save
        </button>
      </div>
    `;
};

const renderView = (value: number, path: string, key: string) => {
  return `
      <div class="component-view__entry">
        ${renderLabel(key, path)}
        <button
          id="view-${path}"
          class="component__action component-view__value"
          data-event="number"
          data-path="${path}"
          type="button"
        >
          ${value}
        </button>
      </div>
    `;
};

const render = (value: number, parentPath: string | null = null, key: string) => {
  const path = `${parentPath ? `${parentPath}.`: ''}${key}`;
  const componentMode = get('edit') === path ? renderEdit : renderView;

  return componentMode(value, path, key);
};

export const NumberComponent: Component = {
  handler,
  support,
  render,
};
