import type { Component } from '../registries/componentsRegistry.ts';

const handler = () => true;
const support = (value: unknown) => value === null;
const render = (value: unknown, parentPath: string | null = null, key: string) => {
  const path = `${parentPath ? `${parentPath}.`: ''}${key}`;

  return `
      <div class="component-view__entry component-view__number">
        <label class="component-view__key" for="view-${path}">
          ${key} :
        </label>
        <p id="view-${path}" class="component-view__value">
          ${value}
        </p>
      </div>
    `;
}

export const NullComponent: Component = {
  handler,
  support,
  render,
};
