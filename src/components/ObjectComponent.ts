import { get } from '../store/store.ts';

import type { Component } from '../registries/componentsRegistry.ts';

const handler = () => {
  return true;
};

const support = (value: unknown) => typeof value === 'object' && value !== null && !Array.isArray(value);

const renderChildren = (value: unknown, parentPath: string | null = null, _key: string, registry: (value: unknown) => Component) => {
  return Object.entries(value!).map(([childKey, childValue]: [string, unknown]) => {
    const component: Component | undefined = registry(childValue);

    return component ? component.render(childValue as unknown, parentPath, childKey, registry) : '';
  }).join('');
};

const renderCollapsed = () => {
  return `
    <p>{ collapsed }</p>
  `;
};

const renderExpanded = (value: unknown, parentPath: string | null = null, key: string, registry: (value: unknown) => Component) => {
  return `
    <div class="component__node--value">
      ${renderChildren(value as Record<string, unknown>, `${parentPath ? `${parentPath}.`: ''}${key}`, '', registry)}
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

  const editState = get('edit') === path;
  const expandedState = (get('expanded') as string[])?.includes(path);

  return `
      <div class="component__node">
        <button
          class=""
          data-role="${expandedState ? 'collapse' : 'expand'}"
          "${editState ? 'disabled' : '' }"
        >
          ${expandedState ? '&#11206;' : '&#11208;'}
        </button>
        ${renderLabel(key, path)}
        ${(expandedState ? renderExpanded : renderCollapsed)(value, parentPath, key, registry)}
      </div>
    `;
};

export const ObjectComponent: Component = {
  handler,
  support,
  render,
};
