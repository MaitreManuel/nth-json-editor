import { remove } from '../store/store.ts';

const handler = (event: Event) => {
  const element = event?.target as HTMLElement | undefined;

  switch(true) {
    case !element || !element.dataset.path:
      break;
    case element?.dataset.role === 'delete' && event.type === 'click':
      remove(`data.${element.dataset.path}`);
      break;
  }
};

const renderButton = (path: string) => {
  return `
    <button
      class=""
      data-event="deletable"
      data-path="${path}"
      data-role="delete"
    >
      &#9932;
    </button>
  `;
};

const support = () => false;
const render = () => '';

export const Deletable = {
  handler,
  support,
  render,
  renderButton,
}
