import { get, set } from '../store/store.ts';

const handler = (event: Event) => {
  const element = event?.target as HTMLElement | undefined;
  const expanded = get('expanded') as string[] | undefined;

  switch(true) {
    case !element || !element.dataset.path:
      break;
    case element?.dataset.role === 'collapse' && event.type === 'click':
      if (expanded?.length) {
        set('expanded', expanded.filter((path: string) => path !== element.dataset.path));
      }

      break;
    case element?.dataset.role === 'expand' && event.type === 'click':
      if (expanded?.length) {
        set('expanded', [...expanded, element.dataset.path]);
      } else {
        set('expanded', [element.dataset.path]);
      }

      break;
  }
};

const isExpanded = (path: string): boolean => (get('expanded') as string[])?.includes(path);

const renderButton = (path: string) => {
  const editState = get('edit') === path;
  const expandedState = isExpanded(path);

  return `
    <button
      class=""
      data-event="expandable"
      data-path="${path}"
      data-role="${expandedState ? 'collapse' : 'expand'}"
      ${editState ? 'disabled' : '' }
    >
      ${expandedState ? '&#11206;' : '&#11208;'}
    </button>
  `;
};

const renderCollapsed = (_key: unknown, path: string) => {
  return `
    <button
      class=""
      data-event="expandable"
      data-path="${path}"
      data-role="expand"
    >
      { ... }
    </button>
  `;
};

const support = () => false;
const render = () => '';

export const Expandable = {
  handler,
  isExpanded,
  support,
  render,
  renderButton,
  renderCollapsed,
};
