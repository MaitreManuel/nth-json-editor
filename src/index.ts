import { getComponent, getHandler } from './registries/componentsRegistry.ts';
import { get, set } from './store/store.ts';

import data from '../../../data.json';

import './styles/theme.css';
import './styles/components.css';
import './styles/atomic.css';

const buildPage = () => {
  const $container = document.querySelector('#nth-json-editor');

  if ($container) {
    $container.innerHTML = rootRender(data);

    document.querySelectorAll('[data-event]').forEach(
      (element) => {
        ['click', 'submit'].forEach(
          (eventName: string) => {
            element.addEventListener(eventName, (event) => {
              const componentType = element.getAttribute('data-event');

              if (componentType) {
                const handler: any = getHandler(componentType);

                handler(event);
              }
            });
          }
        );
      }
    );
  }
};

const rootRender = (rawNodes: object) => {
  return Object.entries(rawNodes).map(([key, value]: [string, unknown]) => {
    const component: any = getComponent(value);

    return component.render(value, '', key, getComponent);
  }).join('');
};

document.addEventListener('DOMContentLoaded', () => {
  set('data', data);
  set('snapshot', data);

  buildPage();
});

document.addEventListener('DOMRefresh', () => {
  console.log(get('add'));

  buildPage();
});
