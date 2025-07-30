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
  const inputElement: HTMLInputElement | null = element.querySelector('[data-save="booleanValue"]');

  if (inputElement) {
    const value: boolean = inputElement.checked;

    set(`data.${element.dataset.path}`, value);
    set('edit', undefined);
  }
};

const support = (value: unknown) => typeof value === 'boolean';

const renderLabel = (key: string, path: string) => {
  return `
    <div class="component__key">
      <label
        class="component__key--label"
        for="${path}"
      >
        ${key} :
      </label>
    </div>
  `;
};

const renderEdit = (value: boolean, path: string, key: string) => {
  return `
    <div
      class="component__container"
      data-path="${path}"
      data-role="form"
    >
      ${renderLabel(key, path)}
      <div class="component__value">
        <input
          id="edit-${path}"
          data-save="booleanValue"
          name="booleanValue"
          type="checkbox"
          ${value ? 'checked' : ''}
        />
        <button
          class="btn-sm btn-secondary mr-1"
          data-event="boolean"
          data-role="submit"
          type="button"
        >
          &#10003; Valider
        </button>
        <button
          class="btn-sm"
          data-event="boolean"
          data-path="${path}"
          data-role="cancel"
          type="button"
        >
          &#9932; Annuler
        </button>
      </div>
    </div>
  `;
};

const renderView = (value: boolean, path: string, key: string) => {
  return `
    <div class="component__container">
      ${renderLabel(key, path)}
      <div class="component__value">
        <button
          id="view-${path}"
          class="component__value--edit"
          data-event="boolean"
          data-path="${path}"
          data-role="edit"
          type="button"
        >
          ${value}
        </button>
        <button
          class="btn-sm mr-1"
          data-event="boolean"
          data-path="${path}"
          data-role="edit"
          type="button"
        >
          &#9998; Modifier
        </button>
      </div>
      ${Deletable.renderButton(path, true)}
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
