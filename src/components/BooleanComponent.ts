export const BooleanComponent = {
  editMode: false,
  path: '',
  support: (value: unknown) => typeof value === 'boolean',
  handler: {},
  edit: function (key: string, value: boolean, parentPath: string | null = null) {
    return `
      <div class="json-edit__entry json-edit__boolean">
        <label for="${parentPath}">${key}</label>
        <input id="edit-${parentPath}" type="checkbox" checked="${value}" />
      </div>
    `;
  },
  view: function (key: string, value: boolean, parentPath: string | null = null) {
    return `
      <div class="json-view__entry json-view__boolean">
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
