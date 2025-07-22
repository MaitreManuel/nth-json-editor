export const StringComponent = {
  editMode: false,
  path: '',
  support: (value: unknown) => typeof value === 'string',
  handler: () => true,
  edit: function (key: string, value: boolean, parentPath: string | null = null) {
    return `
      <div class="json-edit__entry">
        <label for="edit-${parentPath}">${key}</label>
        <input id="edit-${parentPath}" type="text" value="${value}" />
        <button type="button">
          Save
        </button>
      </div>
    `;
  },
  view: function (key: string, value: boolean, parentPath: string | null = null) {
    return `
      <div class="json-view__entry json-view__string">
        <label class="json-view__key" for="view-${parentPath}">
          ${key} :
        </label>
        <button
          id="view-${parentPath}"
          class="json-view__value"
          data-action="edit"
          type="button"
        >
          ${value}
        </button>
      </div>
    `;
  },
  render: function (...args: any) {
    return (this.editMode ? this.edit : this.view)(...args);
  }
};
