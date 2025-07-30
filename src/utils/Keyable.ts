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
    case element?.dataset.role === 'submit' && event.type === 'click':
      const formElement: HTMLFormElement | null = element.closest('[data-role="form"]');

      if (formElement) {
        save(formElement);
        closeKeyable(formElement);
      }

      break;
  }
};

const isKeyableOpened = (path: string): boolean => (get('keyableEdit') as string[])?.includes(path);

const save = (element: HTMLFormElement) => {
  const keyElement = element.querySelector('[data-save="keyableKey"]') as HTMLInputElement;
  const valueElement = element.querySelector('[data-save="keyableValue"]') as HTMLInputElement;

  setRawData(valueElement.value.trim(), `${element.dataset.path}.${keyElement.value.trim()}`);
};

const renderButton = (path: string) => {
  return `
    <div class="keyable__container">
      <div class="keyable__actions">
        <button
          class="btn btn-tertiary"
          data-event="keyable"
          data-path="${path}"
          data-role="add-key"
        >
          &#43; Nouvelle donnée
        </button>
      </div>
    </div>
  `;
};

const renderForm = (path: string) => {
  return `
    <div
      class="keyable__container keyable__container--form"
      data-path="${path}"
      data-role="form"
    >
      <div class="keyable__key">
        <label
          class="sr-only"
          for="add-key-${path}"
        >
          Nom :
        </label>
        <input
          id="add-key-${path}"
          data-save="keyableKey"
          name="keyableKey"
          placeholder="Nom"
          type="text"
        />
      </div>
      <div class="keyable__value">
        <label
          class="sr-only"
          for="add-value-${path}"
        >
          Valeur :
        </label>
        <textarea
          id="add-value-${path}"
          data-save="keyableValue"
          name="keyableValue"
          placeholder="Valeur"
        ></textarea>
      </div>
      <div class="keyable__actions">
        <button
          class="btn btn-secondary mr-1"
          data-event="keyable"
          data-role="submit"
          type="button"
        >
          &#10003; Ajouter
        </button>
        <button
          class="btn"
          data-event="keyable"
          data-path="${path}"
          data-role="cancel"
          type="button"
        >
          &#9932; Annuler
        </button>
      </div>
    </div>
  `;
};

const support = () => false;

const render = (path?: string) => {
  const prefixRootPath = `data${path ? `.${path}` : ''}`;

  return `${(Keyable.isKeyableOpened(prefixRootPath) ? Keyable.renderForm : Keyable.renderButton)(prefixRootPath)}`;
};

export const Keyable = {
  handler,
  isKeyableOpened,
  support,
  render,
  renderButton,
  renderForm,
}
