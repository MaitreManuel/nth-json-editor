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

const renderEdit = (value: string[], path: string | null = null) => {
  return `
      <div
        class="component__value"
        data-path="${path}"
        data-role="form"
      >
        <div class="string-array__value--edit">
          <textarea
            data-save="stringArrayValue"
            name="stringArrayValue"
            rows="${value.length}"
          >${value.join('\n')}</textarea>
        </div>
        <div class="component__actions">
          <button
            class="btn-secondary mr-1"
            data-event="stringArray"
            data-role="submit"
            type="button"
          >
            &#10003; Valider
          </button>
          <button
            class="btn"
            data-event="stringArray"
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

const renderCollapsed = (value: unknown, path: string) => {
  return `
    <div class="array-component__value">
      ${Expandable.renderCollapsed(value, path)}
    </div>
  `;
};

const renderExpanded = (value: string[], path: string) => {
  return `
    <div class="component__value">
      <div class="string-array__value--view">
        ${value.map((item) => `<p class="m-0">${item}</p>`).join('')}
      </div>
      <div class="component__actions">
        <button
          id="view-${path}"
          class="btn btn-tertiary mr-1"
          data-event="stringArray"
          data-path="${path}"
          data-role="edit"
          type="button"
        >
          &#9998; Modifier
        </button>
        ${Deletable.renderButton(path)}
      </div>
    </div>
  `;
};

const renderLabel = (key: string, path: string) => {
  return `
    <div class="component__key">
      ${Expandable.renderButton(path)}
      <label
        class="component__key--label"
        for="${path}"
      >
        ${key} :
      </label>
    </div>
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
        return renderCollapsed;
    }
  };

  return `
    <div
      class="string-array__container component__container component__container--collapsable ${expandedState ? 'expanded' : 'collapsed'}${get('edit') === path ? ' edit' : ''}"
    >
      ${renderLabel(key, path)}
      ${stateRender()(value, path)}
    </div>
  `;
};

export const StringArrayComponent: Component = {
  handler,
  support,
  render,
};
