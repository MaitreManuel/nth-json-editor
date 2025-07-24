import type { Component } from '../registries/componentsRegistry.ts';

const handler = () => true;

const support = (value: unknown) => Array.isArray(value);

const renderChildren = (value: unknown, parentPath: string | null = null, _key: string, registry: (value: unknown) => Component) => {
  return Object.entries(value!).map(([childKey, childValue]: [string, unknown]) => {
    const component: Component | undefined = registry(childValue);

    return component ? component.render(childValue as unknown, parentPath, childKey, registry) : '';
  }).join('');
};

const render = (value: unknown, parentPath: string | null = null, key: string, registry: (value: unknown) => Component) => {
  return `
      <div class="component__node">
        <label class="component__node--key" for="">
          ${key} :
        </label>
        <div class="component__node--value">
          ${renderChildren(value as Record<string, unknown>, `${parentPath ? `${parentPath}.`: ''}${key}`, '', registry)}
        </div>
      </div>
    `;
};

export const ArrayComponent: Component = {
  handler,
  support,
  render,
};
