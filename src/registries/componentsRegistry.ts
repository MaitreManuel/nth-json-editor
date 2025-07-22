import { ArrayComponent } from '../components/ArrayComponent.ts';
import { BooleanComponent } from '../components/BooleanComponent.ts';
import { NumberComponent } from '../components/NumberComponent.ts';
import { NullComponent } from '../components/NullComponent.ts';
import { ObjectComponent } from '../components/ObjectComponent.ts';
import { StringComponent } from '../components/StringComponent.ts';

export interface Component {
  support: (value: unknown) => boolean,
  render: (key: string, value: unknown, registry: (value: unknown) => Component, parentPath: string | null) => string,
}

const registry: Component[] = [
  ArrayComponent,
  BooleanComponent,
  NumberComponent,
  NullComponent,
  ObjectComponent,
  StringComponent,
];

export const componentRegistry = (value: unknown) => registry.reduce(
  (acc: Component | undefined, component: Component) => !acc && component.support(value) ? component : acc, undefined
);
