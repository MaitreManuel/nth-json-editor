import { remove } from '../store/store.ts';

const handler = (event: Event) => {
  const element = event?.target as HTMLElement | undefined;

  switch(true) {
    case !element || !element.dataset.path:
      break;
    case element?.dataset.index && element?.dataset.role === 'delete' && event.type === 'click':
      remove(`data.${element.dataset.path}`, element.dataset.index);
      break;
    case element?.dataset.role === 'delete' && event.type === 'click':
      remove(`data.${element.dataset.path}`);
      break;
  }
};

const renderButton = (path: string, index?: string) => {
  return `
    <button
      class=""
      data-event="deletable"
      ${index ? `data-index="${index}"` : ''}
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
