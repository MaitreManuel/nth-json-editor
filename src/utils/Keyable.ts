import { get, set, setRawData } from '../store/store.ts';

const handler = (event: Event) => {
  const element = event?.target as HTMLElement | undefined;
  const keyableEdit = get('keyableEdit') as string[] | undefined;

  const closeKeyable = (element: HTMLElement) => {
    if (keyableEdit?.length) {
      set('keyableEdit', keyableEdit.filter((path: string) => path !== element.dataset.path));
    }
  };

  switch(true) {
    case !element || !element.dataset.path:
      break;
    case element?.dataset.role === 'add-key' && event.type === 'click':
      if (keyableEdit?.length) {
        set('keyableEdit', [...keyableEdit, element.dataset.path]);
      } else {
        set('keyableEdit', [element.dataset.path]);
      }

      break;
    case element?.dataset.role === 'cancel' && event.type === 'click':
      closeKeyable(element);
      break;
    case element?.dataset.role === 'form' && event.type === 'submit':
      save(element as HTMLFormElement);
      closeKeyable(element);
      break;
  }
};

const isKeyableOpened = (path: string): boolean => (get('keyableEdit') as string[])?.includes(path);

const save = (element: HTMLFormElement) => {
  const rawKey = element.elements.namedItem('keyableKey') as HTMLInputElement;
  const rawValue = element.elements.namedItem('keyableValue') as HTMLInputElement;

  setRawData(rawValue.value.trim(), `data.${element.dataset.path}.${rawKey.value.trim()}`);
};

const renderButton = (path: string) => {
  return `
    <div class="formable__container">
      <div class="formable__separator"></div>
      <button
        class=""
        data-event="keyable"
        data-path="${path}"
        data-role="add-key"
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
      data-event="keyable"
      data-path="${path}"
      data-role="form"
      onsubmit="return false;"
    >
      <div class="formable__entry">
        <div class="formable__key">
          <label for="add-key-${path}">
            Key :
          </label>
          <input
            id="add-key-${path}"
            name="keyableKey"
            type="text"
          />
        </div>
        <div class="formable__value">
          <label for="add-value-${path}">
            Value :
          </label>
          <input
            id="add-value-${path}"
            name="keyableValue"
            type="text"
          />
        </div>
      </div>
      <div class="">
        <button
          data-event="keyable"
          data-role="submit"
          type="submit"
        >
          &#10003;
        </button>
        <button
          data-event="keyable"
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
  `${(Keyable.isKeyableOpened(path) ? Keyable.renderForm : Keyable.renderButton)(path)}`;

export const Keyable = {
  handler,
  isKeyableOpened,
  support,
  render,
  renderButton,
  renderForm,
}
