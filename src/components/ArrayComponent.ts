import type { Component } from '../registries/componentsRegistry.ts';

export const ArrayComponent = {
  support: (value: unknown) => Array.isArray(value),
  renderChildren: function (value: Record<string, unknown>, registry: (value: unknown) => Component, parentPath: string) {
    return Object.entries(value).map(([childKey, childValue]: [string, unknown]) => {
      const component: Component | undefined = registry(childValue);

      return component ? component.render(childKey, childValue as unknown, registry, parentPath) : '';
    }).join('');
  },
  render: function (key: string, value: unknown, registry: (value: unknown) => Component, parentPath: string | null = null) {
    return `
      <div class="json__node">
        <label class="json__node--key" for="">
          ${key} :
        </label>
        <div class="json__node--value">
          ${this.renderChildren(value as Record<string, unknown>, registry, `${parentPath ?? ''}[${key}]`)}
        </div>
      </div>
    `;
  }
};
