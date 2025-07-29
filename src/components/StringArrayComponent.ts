import { get, set } from '../store/store.ts';

import { Deletable } from '../utils/Deletable.ts';
import { Expandable } from '../utils/Expandable.ts';

import type { Component } from '../registries/componentsRegistry.ts';

const handler = (event: Event) => {
  const element = event?.target as HTMLElement | undefined;

  switch(true) {
    case element?.dataset.role === 'edit' && event.type === 'click':
      set('edit', element.dataset.path);
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
  const inputElement: HTMLInputElement | null = element.querySelector('[data-save="stringArrayValue"]');

  if (inputElement) {
    const value: string[] = inputElement.value.split('\n').reduce(
      (acc: string[], value: string) => value ? [...acc, value.trim()] : acc, []
    );

    set(`data.${element.dataset.path}`, value);
    set('edit', undefined);
  }
};

const support = (value: unknown) => (
  Array.isArray(value)
  && value.reduce((acc: boolean, current: unknown) => acc ? typeof current === 'string' : acc, true)
);

const renderEdit = (value: string[], path: string | null = null, key: string) => {
  return `
      <div
        class="component__node"
        data-path="${path}"
        data-role="form"
      >
        <label
          class="component__node--key"
          for=""
        >
          ${key} :
        </label>
        <button
          data-event="stringArray"
          data-role="submit"
          type="button"
        >
          &#10003;
        </button>
        <div class="component__node--value">
          <textarea
            data-save="stringArrayValue"
            name="stringArrayValue"
            rows="${value.length}"
          >${value.join('\n')}</textarea>
        </div>
      </div>
    `;
};

const renderExpanded = (value: string[], path: string | null = null) => {
  return `
      <div>
        <button
          id="view-${path}"
          class="component__action component-view__value"
          data-event="stringArray"
          data-path="${path}"
          data-role="edit"
          type="button"
        >
          &#9998;
        </button>
        <div class="component__node--value">
          ${value.map((item) => `<p class="m-0">${item}</p>`).join('')}
        </div>
      </div>
    `;
};

const renderLabel = (key: string, path: string) => {
  return `
    <label class="component__node--key" for="${path}">
      ${key} :
    </label>
  `;
};

const render = (value: string[], parentPath: string | null = null, key: string) => {
  const path = `${parentPath ? `${parentPath}.`: ''}${key}`;

  const editState = get('edit') === path;
  const expandedState = (get('expanded') as string[])?.includes(path);

  const stateRender = () => {
    switch(true) {
      case editState:
        return renderEdit;
      case expandedState:
        return renderExpanded;
      default:
        return Expandable.renderCollapsed;
    }
  };

  return `
    <div class="component__node">
      ${Expandable.renderButton(path)}
      ${renderLabel(key, path)}
      ${Deletable.renderButton(path)}
      ${stateRender()(value, path, key)}
    </div>
  `;
};

export const StringArrayComponent: Component = {
  handler,
  support,
  render,
};
