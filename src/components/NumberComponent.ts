import { get, set } from '../store/store.ts';

import { Deletable } from '../utils/Deletable.ts';

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
    case element?.dataset.role === 'submit' && event.type === 'click':
      const formElement: HTMLFormElement | null = element.closest('[data-role="form"]');

      if (formElement) {
        save(formElement);
      }

      break;
  }
};

const save = (element: HTMLFormElement) => {
  const inputElement: HTMLInputElement | null = element.querySelector('[data-save="numberValue"]');

  if (inputElement) {
    const value: number = parseInt(inputElement.value);

    set(`data.${element.dataset.path}`, value);
    set('edit', undefined);
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
        class="component__node"
        data-path="${path}"
        data-role="form"
      >
        <label for="edit-${path}">${key}</label>
        <input
          id="edit-${path}"
          data-save="numberValue"
          name="numberValue"
          type="number"
          value="${value}"
        />
        <button
          data-event="number"
          data-role="submit"
          type="button"
        >
          &#10003;
        </button>
        <button
          data-event="number"
          data-path="${path}"
          data-role="cancel"
          type="button"
        >
          &#9932;
        </button>
      </div>
    `;
};

const renderView = (value: number, path: string, key: string) => {
  return `
    <div class="component-view__entry component-view__number">
      ${renderLabel(key, path)}
      <button
        id="view-${path}"
        class="component__action component-view__value"
        data-event="number"
        data-path="${path}"
        data-role="edit"
        type="button"
      >
        ${value}
      </button>
      <button
        data-event="number"
        data-path="${path}"
        data-role="edit"
        type="button"
      >
        &#9998;
      </button>
      ${Deletable.renderButton(path)}
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
