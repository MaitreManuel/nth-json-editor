import { get, move } from '../store/store.ts';

const support = () => false;
const render = () => '';

const handler = (event: Event) => {
  const element = event?.target as HTMLElement | undefined;
  const index: number = parseInt(element?.dataset.index || '-1');

  switch(true) {
    case !element || !element.dataset.path || !element.dataset.index:
      break;
    case element?.dataset.role === 'move-down' && event.type === 'click':
      move(`data.${element.dataset.path}`, index, index + 1);
      break;
    case element?.dataset.role === 'move-up' && event.type === 'click':
      move(`data.${element.dataset.path}`, index, index - 1);
      break;
  }
};

const renderButtons = (path: string, index: number) => {
  const cantMoveDown = (index + 1) >= get(`data.${path}`).length;
  const cantMoveUp = index < 1;

  return cantMoveDown && cantMoveUp ? '' : `
    <div class="orderable__container">
      <button
        class="abstract-component__action"
        data-event="orderable"
        data-index="${index}"
        data-path="${path}"
        data-role="move-up"
        ${cantMoveUp ? 'disabled' : '' }
      >
        &#129033;
      </button><button
        class="abstract-component__action"
        data-event="orderable"
        data-index="${index}"
        data-path="${path}"
        data-role="move-down"
        ${cantMoveDown ? 'disabled' : '' }
      >
        &#129035;
      </button>
    </div>
  `;
};

export const Orderable = {
  handler,
  support,
  render,
  renderButtons,
}
