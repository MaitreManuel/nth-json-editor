import { get, set, setRawData } from '../store/store.ts';

import type { EnhancedHTMLFormElement } from '../types.d.ts';

const handler = (event: Event) => {
  const element = event?.target as HTMLElement | undefined;
  const itemEdit = get('itemEdit') as string[] | undefined;

  const closeItemable = (element: HTMLElement) => {
    if (itemEdit?.length) {
      set('itemEdit', itemEdit.filter((path: string) => path !== element.dataset.path));
    }
  };

  switch(true) {
    case element?.dataset.role === 'add-item' && event.type === 'click':
      if (itemEdit?.length) {
        set('itemEdit', [...itemEdit, element.dataset.path]);
      } else {
        set('itemEdit', [element.dataset.path]);
      }

      break;
    case element?.dataset.role === 'cancel' && event.type === 'click':
      closeItemable(element);
      break;
    case element?.dataset.role === 'submit' && event.type === 'click':
      const formElement: HTMLFormElement | null = element.closest('[data-role="form"]');

      if (formElement) {
        save(formElement);
        closeItemable(formElement);
      }

      break;
  }
};

const isItemableOpened = (path: string): boolean => (get('itemEdit') as string[])?.includes(path);

const save = (element: HTMLFormElement) => {
  const inputElement = element.querySelector('[data-save="itemableValue"]') as HTMLTextAreaElement;

  setRawData(inputElement.value.trim(), `data.${element.dataset.path}`);
};

const renderButton = (path: string) => {
  return `
    <div class="formable__container">
      <div class="formable__separator"></div>
      <button
        class=""
        data-event="itemable"
        data-path="${path}"
        data-role="add-item"
      >
        &#43;
      </button>
    </div>
  `;
};

const renderForm = (path: string) => {
  return `
    <div
      class="formable__container formable__container--form"
      data-path="${path}"
      data-role="form"
    >
      <div class="">
        <textarea
          data-save="itemableValue"
          name="itemableValue"
          cols="50"
          rows="10"
        ></textarea>
      </div>
      <div class="">
        <button
          data-event="itemable"
          data-role="submit"
          type="button"
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
    </div>
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
