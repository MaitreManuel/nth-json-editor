import Editor from './Editor.tsx';

import data from '../../data/example.json';

import '../styles/components/App.css'

function App () {
  const currentTheme = 'solarized';

  return (
    <>
      <header>
        <h1>JSON Editor</h1>
      </header>
      <main role="main">
        <Editor
          data={data}
          theme={currentTheme}
        />
      </main>
    </>
  )
}

export default App
