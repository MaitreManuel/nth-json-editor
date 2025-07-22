export const NumberComponent = {
  editMode: false,
  path: '',
  support: (value: unknown) => typeof value === 'number',
  handler: {},
  edit: function (key: string, value: boolean, parentPath: string | null = null) {
    return `
      <div class="json-edit__entry json-edit__number">
        <label for="${parentPath}">${key}</label>
        <input id="edit-${parentPath}" type="text" value="${value}" />
      </div>
    `;
  },
  view: function (key: string, value: boolean, parentPath: string | null = null) {
    return `
      <div class="json-view__entry json-view__number">
        <label class="json-view__key" for="view-${parentPath}">
          ${key} :
        </label>
        <p id="view-${parentPath}" class="json-view__value">
          ${value}
        </p>
      </div>
    `;
  },
  render: function (...args: any) {
    return (this.editMode ? this.edit : this.view)(...args);
  }
};
