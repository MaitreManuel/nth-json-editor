import { Deletable } from '../utils/Deletable.ts';
import { Expandable } from '../utils/Expandable.ts';
import { Itemable } from '../utils/Itemable.ts';

import { addArrayPath } from '../store/store.ts';


import type { Component } from '../registries/componentsRegistry.ts';
import { Orderable } from '../utils/Orderable.ts';

const handler = () => false;

const support = (value: unknown) => Array.isArray(value);

const renderChildren = (value: unknown, path: string , registry: (value: unknown) => Component) => {
  return Object.entries(value!).map(([childKey, childValue]: [string, unknown]) => {
    const component: Component | undefined = registry(childValue);

    return component ? `
        <div class="array-component__inner">
          ${component.render(childValue as unknown, path, childKey, registry)}
          ${Orderable.renderButtons(path, parseInt(childKey))}
        </div>
      ` : '';
  }).join('');
};

const renderCollapsed = (value: unknown, path: string) => {
  return `
    <div class="array-component__value">
      ${Expandable.renderCollapsed(value, path)}
    </div>
  `;
};

const renderExpanded = (value: unknown, path: string, registry: (value: unknown) => Component) => {
  return `
    <div class="array-component__value">
      ${renderChildren(value as Record<string, unknown>, path, registry)}
      ${Itemable.render(path)}
    </div>
    ${Deletable.renderButton(path)}
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

const render = (value: unknown, parentPath: string | null = null, key: string, registry: (value: unknown) => Component) => {
  const path = `${parentPath ? `${parentPath}.`: ''}${key}`;

  const renderState = Expandable.isExpanded(path) ? renderExpanded : renderCollapsed;

  addArrayPath(`data.${path}`);

  return `
    <div class="array-component__container component__container--collapsable ${ Expandable.isExpanded(path) ? 'expanded' : 'collpased' }">
      ${renderLabel(key, path)}
      ${renderState(value, path, registry)}
    </div>
  `;
};

export const ArrayComponent: Component = {
  handler,
  support,
  render,
};
