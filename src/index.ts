import { componentRegistry } from './registries/componentsRegistry.ts';

import data from '../../../data.json';

import './styles/theme.css';
import './styles/json.css';
import './styles/atomic.css';

const rootRender = (rawNodes: object) => {
  return Object.entries(rawNodes).map(([key, value]: [string, unknown]) => {
    const component: any = componentRegistry(value);

    return component.render(key, value, componentRegistry);
  }).join('');
};

document.addEventListener('DOMContentLoaded', () => {
  const $container = document.querySelector('#nth-json-editor');

  if ($container) {
    $container.innerHTML = `
    <div class="json__node">
      ${rootRender(data)}
    </div>
    `;
  }
});
