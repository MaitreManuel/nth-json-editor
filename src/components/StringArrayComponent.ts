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
    case element?.dataset.role === 'form' && event.type === 'submit':
      save(element as HTMLFormElement);
      break;
  }
};

const save = (element: HTMLFormElement) => {
  const rawValue = element.elements.namedItem('stringArrayValue') as HTMLTextAreaElement;

  const cleanValue = rawValue.value.split('\n').reduce(
    (acc: string[], value: string) => value ? [...acc, value.trim()] : acc, []
  );

  set(`data.${element.dataset.path}`, cleanValue);
  set('edit', undefined);
};

const support = (value: unknown) => (
  Array.isArray(value)
  && value.reduce((acc: boolean, current: unknown) => acc ? typeof current === 'string' : acc, true)
);

const renderEdit = (value: string[], path: string | null = null, key: string) => {
  return `
      <form
        id="test"
        class="component__node"
        data-event="stringArray"
        data-path="${path}"
        data-role="form"
        onsubmit="return false;"
      >
        <label class="component__node--key" for="">
          ${key} :
        </label>
        <button
          data-event="stringArray"
          data-role="submit"
          form="test"
          type="submit"
        >
          Save
        </button>
        <div class="component__node--value">
          <textarea
            name="stringArrayValue"
            rows="${value.length}"
          >${value.join('\n')}</textarea>
        </div>
      </form>
    `;
};

const renderExpanded = (value: string[], path: string | null = null) => {
  return `
      <div >
        <button
          id="view-${path}"
          class="component__action component-view__value"
          data-event="stringArray"
          data-path="${path}"
          data-role="edit"
          type="button"
        >
          Edit
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
