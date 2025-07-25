import { Addable } from '../utils/Addable.ts';
import { ArrayComponent } from '../components/ArrayComponent.ts';
import { BooleanComponent } from '../components/BooleanComponent.ts';
import { Deletable } from '../utils/Deletable.ts';
import { Expandable } from '../utils/Expandable.ts';
import { NumberComponent } from '../components/NumberComponent.ts';
import { NullComponent } from '../components/NullComponent.ts';
import { ObjectArrayComponent } from '../components/ObjectArrayComponent.ts';
import { ObjectComponent } from '../components/ObjectComponent.ts';
import { Orderable } from '../utils/Orderable.ts';
import { StringArrayComponent } from '../components/StringArrayComponent.ts';
import { StringComponent } from '../components/StringComponent.ts';

export interface Component {
  support: (value: unknown) => boolean,
  handler: (event: Event) => void,
  render: (value: any, parentPath: string | null, key: string, registry: (value: unknown) => Component) => string,
}

const registry: Record<string, Component> = {
  addable: Addable,
  deletable: Deletable,
  expandable: Expandable,
  orderable: Orderable,
  stringArray: StringArrayComponent,
  objectArray: ObjectArrayComponent,
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
