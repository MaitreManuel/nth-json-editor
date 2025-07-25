import { Deletable } from '../utils/Deletable.ts';
import { Expandable } from '../utils/Expandable.ts';

import type { Component } from '../registries/componentsRegistry.ts';
import { Addable } from '../utils/Addable.ts';

const handler = () => false;

const support = (value: unknown) => typeof value === 'object' && value !== null && !Array.isArray(value);

const renderChildren = (value: unknown, parentPath: string | null = null, _key: string, registry: (value: unknown) => Component) => {
  return Object.entries(value!).map(([childKey, childValue]: [string, unknown]) => {
    const component: Component | undefined = registry(childValue);

    return component ? component.render(childValue as unknown, parentPath, childKey, registry) : '';
  }).join('');
};

const renderLabel = (key: string, path: string) => {
  return `
    <label class="component__node--key" for="${path}">
      ${key} :
    </label>
  `;
};

const renderExpanded = (value: unknown, path: string, _key: string, registry: (value: unknown) => Component) => {
  return `
    <div class="component__node--value">
      ${renderChildren(value as Record<string, unknown>, path, '', registry)}
      ${Addable.isAddFormOpened(path) ? Addable.renderForm(path) : Addable.renderButton(path)}
    </div>
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

export const ObjectComponent: Component = {
  handler,
  support,
  render,
};
