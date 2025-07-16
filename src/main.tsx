import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import store from './stores/store'

import Editor from './components/Editor.tsx'

import * as data from '../data/example.json';

import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <header>
      <h1>JSON Editor</h1>
    </header>
    <main role="main">
      <Editor data={data} />
    </main>
  </Provider>,
)
