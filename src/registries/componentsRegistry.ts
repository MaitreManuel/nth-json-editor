import { Keyable } from '../utils/Keyable.ts';
import { ArrayComponent } from '../components/ArrayComponent.ts';
import { BooleanComponent } from '../components/BooleanComponent.ts';
import { Deletable } from '../utils/Deletable.ts';
import { Expandable } from '../utils/Expandable.ts';
import { NumberComponent } from '../components/NumberComponent.ts';
import { NullComponent } from '../components/NullComponent.ts';
import { ObjectComponent } from '../components/ObjectComponent.ts';
import { Itemable } from '../utils/Itemable.ts';
import { Orderable } from '../utils/Orderable.ts';
import { StringArrayComponent } from '../components/StringArrayComponent.ts';
import { StringComponent } from '../components/StringComponent.ts';

export interface Component {
  support: (value: unknown) => boolean,
  handler: (event: Event) => void,
  render: (value: any, parentPath: string | null, key: string, registry: (value: unknown) => Component, deletable?: boolean) => string,
}

const registry: Record<string, Component> = {
  keyable: Keyable,
  deletable: Deletable,
  expandable: Expandable,
  orderable: Orderable,
  stringArray: StringArrayComponent,
  itemable: Itemable,
  array: ArrayComponent,
  boolean: BooleanComponent,
  number: NumberComponent,
  null: NullComponent,
  object: ObjectComponent,
  string: StringComponent,
};

export const getComponent = (value: unknown) => Object.values(registry).reduce(
  (acc: Component | undefined, component: Component) => !acc && component.support(value) ? component : acc, undefined
);

export const getHandler =
  (componentCode: string) => registry[componentCode] ? registry[componentCode].handler : undefined;
