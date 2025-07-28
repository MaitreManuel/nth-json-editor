import { get, set } from '../store/store.ts';

const handler = (event: Event) => {
  const element = event?.target as HTMLElement | undefined;
  const itemable = get('itemable') as string[] | undefined;

  const closeItemable = (element: HTMLElement) => {
    if (itemable?.length) {
      set('itemable', itemable.filter((path: string) => path !== element.dataset.path));
    }
  };

  switch(true) {
    case !element || !element.dataset.path:
      break;
    case element?.dataset.role === 'add' && event.type === 'click':
      if (itemable?.length) {
        set('itemable', [...itemable, element.dataset.path]);
      } else {
        set('itemable', [element.dataset.path]);
      }
      closeItemable(element);
      break;
    case element?.dataset.role === 'cancel' && event.type === 'click':
      closeItemable(element);
      break;
    case element?.dataset.role === 'form' && event.type === 'submit':
      save(element as HTMLFormElement);
      closeItemable(element);
      break;
  }
};

const isItemableOpened = (path: string): boolean => (get('itemable') as string[])?.includes(path);

const save = (element: HTMLFormElement) => {
  const rawValue = element.elements.namedItem('itemableValue') as HTMLTextAreaElement;
  const tab = get(`data.${element.dataset.path}`);

  set(`data.${element.dataset.path}`, [...tab, JSON.parse(rawValue.value)]);
  set('itemable', undefined);
};

const renderButton = (path: string) => {
  return `
    <div class="formable__container">
      <div class="formable__separator"></div>
      <button
        class=""
        data-event="itemable"
        data-path="${path}"
        data-role="add"
      >
        &#43;
      </button>
    </div>
  `;
};

const renderForm = (path: string) => {
  return `
    <form
      class="formable__container formable__container--form"
      data-event="itemable"
      data-path="${path}"
      data-role="form"
      onsubmit="return false;"
    >
      <div class="">
        <textarea
          name="itemableValue"
          rows="10"
        ></textarea>
      </div>
      <div class="">
        <button
          data-event="itemable"
          data-role="submit"
          type="submit"
        >
          &#10003;
        </button>
        <button
          data-event="itemable"
          data-path="${path}"
          data-role="cancel"
          type="button"
        >
          &#9932;
        </button>
      </div>
    </form>
  `;
};

const support = () => false;

const render = (path: string) =>
  `${(Itemable.isItemableOpened(path) ? Itemable.renderForm : Itemable.renderButton)(path)}`;

export const Itemable = {
  handler,
  isItemableOpened,
  support,
  render,
  renderButton,
  renderForm,
}
