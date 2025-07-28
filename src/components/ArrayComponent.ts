import { Deletable } from '../utils/Deletable.ts';
import { Expandable } from '../utils/Expandable.ts';
import { Itemable } from '../utils/Itemable.ts';

import { addArrayPath } from '../store/store.ts';


import type { Component } from '../registries/componentsRegistry.ts';

const handler = () => false;

const support = (value: unknown) => Array.isArray(value);

const renderChildren = (value: unknown, parentPath: string | null = null, registry: (value: unknown) => Component) => {
  return Object.entries(value!).map(([childKey, childValue]: [string, unknown]) => {
    const component: Component | undefined = registry(childValue);

    return component ? component.render(childValue as unknown, parentPath, childKey, registry) : '';
  }).join('');
};

const renderExpanded = (value: unknown, path: string, registry: (value: unknown) => Component) => {
  return `
    <div class="component__node--value">
      ${renderChildren(value as Record<string, unknown>, path, registry)}
      ${Itemable.render(path)}
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

  const renderState = Expandable.isExpanded(path) ? renderExpanded : Expandable.renderCollapsed;

  addArrayPath(`data.${path}`);

  return `
    <div class="component__node">
      ${Expandable.renderButton(path)}
      ${renderLabel(key, path)}
      ${Deletable.renderButton(path)}
      ${renderState(value, path, registry)}
    </div>
  `;
};

export const ArrayComponent: Component = {
  handler,
  support,
  render,
};
