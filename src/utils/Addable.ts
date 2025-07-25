import { get, set } from '../store/store.ts';

const handler = (event: Event) => {
  const element = event?.target as HTMLElement | undefined;

  switch(true) {
    case !element || !element.dataset.path:
      break;
    case element?.dataset.role === 'add' && event.type === 'click':
      if (element.dataset.index) {
        console.log(element);
      }
      set('add', element.dataset.path);
      break;
    case element?.dataset.role === 'form' && event.type === 'submit':
      save(element as HTMLFormElement);
      break;
  }
};

const isAddFormOpened = (path: string): boolean => (get('add') as string[])?.includes(path);

const save = (element: HTMLFormElement) => {
  const insertIndex = element.dataset.index;

  console.log(insertIndex);

  if (!insertIndex) {
    const rawKey = element.elements.namedItem('addableKey') as HTMLInputElement;
    const rawValue = element.elements.namedItem('addableValue') as HTMLInputElement;

    const cleanKey = rawKey.value.trim();
    const cleanValue = rawValue.value.trim();

    set(`data.${element.dataset.path}.${cleanKey}`, cleanValue);
    set('add', undefined);
  } else {
    console.log(element.elements);
  }
};

const renderForm = (path: string, insertIndex: number) => {
  return `
    <form
      class="addable__container addable__container--form"
      data-event="addable"
      ${insertIndex > -1 ? `data-index="${insertIndex}"` : ''}
      data-path="${path}"
      data-role="form"
      onsubmit="return false;"
    >
      ${insertIndex > -1 ? renderFormObjectArray(path) : renderFormKeyValue(path)}
      <button
        data-event="addable"
        ${insertIndex > -1 ? `data-index="${insertIndex}"` : ''}
        data-role="submit"
        type="submit"
      >
        &#10003;
      </button>
    </form>
  `;
};

const renderFormObjectArray = (path: string) => {
  const objectSkeleton = get(`snapshot.${path}.0`);

  console.log(objectSkeleton);

  return Object.keys(objectSkeleton).map((key: string) => {
    return `
      <div class="addable__entry">
        <div class="addable__value">
          <label for="add-value-${key}">
            ${key} :
          </label>
          <input
            id="add-value-${key}"
            name="addableValue${key}"
            type="text"
          />
        </div>
      </div>
    `
  }).join('');
};

const renderFormKeyValue = (path: string) => {
  return `
    <div class="addable__entry">
      <div class="addable__key">
        <label for="add-key-${path}">
          Key :
        </label>
        <input
          id="add-key-${path}"
          name="addableKey"
          type="text"
        />
      </div>
      <div class="addable__value">
        <label for="add-value-${path}">
          Value :
        </label>
        <input
          id="add-value-${path}"
          name="addableValue"
          type="text"
        />
      </div>
    </div>
  `;
};

const renderButton = (path: string, insertIndex: number) => {
  return `
    <div class="addable__container">
      <div class="addable__separator"></div>
      <button
        class=""
        ${insertIndex > -1 ? `data-index="${insertIndex}"` : ''}
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

const render = (path: string, insertIndex: number = -1) =>
  `${(Addable.isAddFormOpened(path) ? Addable.renderForm : Addable.renderButton)(path, insertIndex)}`;

export const Addable = {
  handler,
  isAddFormOpened,
  support,
  render,
  renderButton,
  renderForm,
}
