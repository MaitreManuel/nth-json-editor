import { Deletable } from '../utils/Deletable.ts';
import { Expandable } from '../utils/Expandable.ts';
import { Keyable } from '../utils/Keyable.ts';

import type { Component } from '../registries/componentsRegistry.ts';

const handler = () => false;

const support = (value: unknown) => typeof value === 'object' && value !== null && !Array.isArray(value);

const renderChildren = (value: unknown, parentPath: string | null = null, _key: string, registry: (value: unknown) => Component) => {
  return Object.entries(value!).map(([childKey, childValue]: [string, unknown]) => {
    const component: Component | undefined = registry(childValue);

    return component ? component.render(childValue as unknown, parentPath, childKey, registry) : '';
  }).join('');
};

const renderCollapsed = (value: unknown, path: string) => {
  return `
    <div class="component__value">
      ${Expandable.renderCollapsed(value, path)}
    </div>
  `;
};

const renderExpanded = (value: unknown, path: string, _key: string, registry: (value: unknown) => Component, deletable: boolean) => {
  return `
    <div class="component__value">
      ${renderChildren(value as Record<string, unknown>, path, '', registry)}
      ${Keyable.render(path)}
    </div>
    ${deletable ? Deletable.renderButton(path) : ''}
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

const render = (value: unknown, parentPath: string | null = null, key: string, registry: (value: unknown) => Component, deletable: boolean = true) => {
  const path = `${parentPath ? `${parentPath}.`: ''}${key}`;

  return `
    <div class="component__container component__container--collapsable ${ Expandable.isExpanded(path) ? 'expanded' : 'collapsed' }">
      ${renderLabel(key, path)}
      ${(Expandable.isExpanded(path) ? renderExpanded : renderCollapsed)(value, path, key, registry, deletable)}
    </div>
  `;
};

export const ObjectComponent: Component = {
  handler,
  support,
  render,
};
