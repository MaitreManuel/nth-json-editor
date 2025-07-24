import { Deletable } from '../utils/Deletable.ts';
import { Expandable } from '../utils/Expandable.ts';

import type { Component } from '../registries/componentsRegistry.ts';

const handler = () => false;

const support = (value: unknown) => Array.isArray(value);

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
      ${(Expandable.isExpanded(path) ? Expandable.renderExpanded : Expandable.renderCollapsed)(value, path, key, registry)}
    </div>
  `;
};

export const ArrayComponent: Component = {
  handler,
  support,
  render,
};
