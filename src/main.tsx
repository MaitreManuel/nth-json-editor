import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './components/App.tsx';

import store from './stores/store'

import './styles/atomic.css';
import './styles/theme.css';

createRoot(document.getElementById('nth-json-editor')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
