import { get, set } from '../store/store.ts';

import type { Component } from '../registries/componentsRegistry.ts';

const handler = (event: Event) => {
  const element = event?.target as HTMLElement | undefined;

  switch(true) {
    case element?.dataset.role === 'edit' && event.type === 'click':
      set('edit', element.dataset.path);
      break;
    case element?.dataset.role === 'cancel' && event.type === 'click':
      set('edit', undefined);
      break;
    case element?.dataset.role === 'form' && event.type === 'submit':
      save(element as HTMLFormElement);
      break;
  }
};

const save = (element: HTMLFormElement) => {
  const rawValue = element.elements.namedItem('booleanValue') as HTMLInputElement;
  const cleanValue = rawValue.checked;

  set(`data.${element.dataset.path}`, cleanValue);
  set('edit', undefined);
};

const support = (value: unknown) => typeof value === 'boolean';

const renderLabel = (key: string, path: string) => {
  return `
    <label class="component__node--key" for="${path}">
      ${key} :
    </label>
  `;
};

const renderEdit = (value: boolean, path: string, key: string) => {
  return `
      <form
        class="component__node"
        data-event="boolean"
        data-path="${path}"
        data-role="form"
        onsubmit="return false;"
      >
        <label for="edit-${path}">${key}</label>
        <input
          id="edit-${path}"
          name="booleanValue"
          type="checkbox"
          ${value ? 'checked' : ''}
        />
        <button
          data-event="boolean"
          type="submit"
        >
          &#10003;
        </button>
        <button
          data-event="boolean"
          data-path="${path}"
          data-role="cancel"
          type="button"
        >
          &#9932;
        </button>
      </form>
    `;
};

const renderView = (value: boolean, path: string, key: string) => {
  return `
    <div class="component-view__entry component-view__boolean">
      ${renderLabel(key, path)}
      <button
        id="view-${path}"
        class="component__action component-view__value"
        data-event="boolean"
        data-path="${path}"
        data-role="edit"
        type="button"
      >
        ${value}
      </button>
      <button
        data-event="boolean"
        data-path="${path}"
        data-role="edit"
        type="button"
      >
        &#9998;
      </button>
    </div>
  `;
};

const render = (value: boolean, parentPath: string | null = null, key: string) => {
  const path = `${parentPath ? `${parentPath}.`: ''}${key}`;
  const componentMode = get('edit') === path ? renderEdit : renderView;

  return componentMode(value, path, key);
};

export const BooleanComponent: Component = {
  handler,
  support,
  render,
};
