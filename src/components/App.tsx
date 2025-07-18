import Editor from './Editor.tsx'

import '../styles/components/App.css'

const data = {
  "id": "872gf4-dgf6hg7-098hgf-87kgnc09",
  "source": {
    "phonenumber": "077 4820 0343",
    "address": {
      "country": "United Kingdom",
      "city": "Tresmeer",
      "address": "49 Glandovey Terrace",
      "postalCode": "PL15 4QP"
    },
    "isAdjoining": false,
    "hasFencesClosed": null,
    "rooms": {
      "chambers": [
        {
          "comment": "Has fireplace",
          "doorsIn": 1,
          "doorsOut": 1,
          "squarefeet": 26,
          "windows": 1
        },
        {
          "doorsIn": 2,
          "doorsOut": 1,
          "name": "Friend's room + office",
          "squarefeet": 34,
          "windows": 2
        },
        {
          "doorsIn": 2,
          "doorsOut": 0,
          "name": "Office + Roof",
          "squarefeet": 15,
          "windows": 3
        }
      ]
    }
  }
};

function App () {
  const currentTheme = 'solarized'

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
