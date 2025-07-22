import type { Component } from '../registries/componentsRegistry.ts';

export const NullComponent = {
  support: (value: unknown) => value === null,
  render: function (key: string, value: unknown, registry:  (value: unknown) => Component, parentPath: string | null = null) {
    return '';
  }
};
