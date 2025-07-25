import { get, set } from '../store/store.ts';

const handler = (event: Event) => {
  const element = event?.target as HTMLElement | undefined;

  switch(true) {
    case !element || !element.dataset.path:
      break;
    case element?.dataset.role === 'add' && event.type === 'click':
      set('add', element.dataset.path);
      break;
    case element?.dataset.role === 'form' && event.type === 'submit':
      save(element as HTMLFormElement);
      break;
  }
};

const isAddFormOpened = (path: string): boolean => (get('add') as string[])?.includes(path);

const save = (element: HTMLFormElement) => {
  const rawKey = element.elements.namedItem('addableKey') as HTMLInputElement;
  const rawValue = element.elements.namedItem('addableValue') as HTMLInputElement;

  const cleanKey = rawKey.value.trim();
  const cleanValue = rawValue.value.trim();

  set(`data.${element.dataset.path}.${cleanKey}`, cleanValue);
  set('add', undefined);
};

const renderForm = (path: string) => {
  return `
    <form
      class="addable__container addable__container--form"
      data-event="addable"
      data-path="${path}"
      data-role="form"
      onsubmit="return false;"
    >
      <div class="addable__key--container">
        <label for="add-key-${path}">
          Key :
        </label>
        <input
          id="add-key-${path}"
          name="addableKey"
          type="text"
        />
      </div>
      <div class="addable__value--container">
        <label for="add-value-${path}">
          Value :
        </label>
        <input
          id="add-value-${path}"
          name="addableValue"
          type="text"
        />
      </div>
      <button
        data-event="addable"
        data-role="submit"
        type="submit"
      >
        &#10003;
      </button>
    </form>
 `;
};

const renderButton = (path: string) => {
  return `
    <div class="addable__container">
      <div class="addable__separator"></div>
      <button
        class=""
        data-event="addable"
        data-path="${path}"
        data-role="add"
      >
        &#43;
      </button>
    </div>
  `;
};

const support = () => false;
const render = () => '';

export const Addable = {
  handler,
  isAddFormOpened,
  support,
  render,
  renderButton,
  renderForm,
}
