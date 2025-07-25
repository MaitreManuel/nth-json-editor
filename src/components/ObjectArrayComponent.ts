import { Addable } from '../utils/Addable.ts';
import { Deletable } from '../utils/Deletable.ts';
import { Expandable } from '../utils/Expandable.ts';
import { ObjectComponent } from './ObjectComponent.ts';
import { Orderable } from '../utils/Orderable.ts';

import type { Component } from '../registries/componentsRegistry.ts';
import { get } from '../store/store.ts';

const handler = () => false;

const support = (value: unknown) => (
  Array.isArray(value)
  && value.reduce((acc: boolean, current: unknown) => acc ? typeof current === 'object' && current !== null && !Array.isArray(current) : acc, true)
);

const renderExpanded = (value: unknown, path: string, _key: string, registry: (value: unknown) => Component) => {
  const template = Object.entries(value!).map(([childKey, childValue]: [string, unknown]) => {
    return `
      <div class="array-object__item--container">
        ${ObjectComponent.render(childValue as unknown, path, childKey, registry, false)}
        <div class="">
          ${Deletable.renderButton(path, childKey)}
        </div>
        <div class="">
          ${Orderable.renderButtons(path, parseInt(childKey))}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="component__node--value">
      ${template}
      ${Addable.render(path, get(`data.${path}`).length)}
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

const render = (value: unknown, parentPath: string | null = null, key: string, registry: (value: unknown) => Component) => {
  const path = `${parentPath ? `${parentPath}.`: ''}${key}`;

  return `
    <div class="component__node">
      ${Expandable.renderButton(path)}
      ${renderLabel(key, path)}
      ${Deletable.renderButton(path)}
      ${(Expandable.isExpanded(path) ? renderExpanded : Expandable.renderCollapsed)(value, path, key, registry)}
    </div>
  `;
};

export const ObjectArrayComponent: Component = {
  handler,
  support,
  render,
};
