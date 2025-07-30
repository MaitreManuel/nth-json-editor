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
      class="expandable__action-toggle"
      data-event="expandable"
      data-path="${path}"
      data-role="${expandedState ? 'collapse' : 'expand'}"
      ${editState ? 'disabled' : '' }
      type="button"
    >
      ${expandedState ? '&#11206;' : '&#11208;'}
    </button>
  `;
};

const renderCollapsed = (_value: unknown, path: string) => {
  return `
    <div class="expandable__container">
      <button
        class="expandable__value-toggle"
        data-event="expandable"
        data-path="${path}"
        data-role="expand"
        type="button"
      >
        { ... }
      </button>
    </div>
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
