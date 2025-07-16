import JsonNode from './JsonNode.tsx';

import '../styles/Editor.css'

interface EditorProps {
  data: object
}

function Editor({ data }: EditorProps) {
  const ExtractRecursive = (rawNodes: object) => {
    return Object.entries(rawNodes).map(([key, value]: [string, any]) =>
      <JsonNode keyName={<><span style={{fontWeight: 'bold'}}>"{key}":</span></>}>
        {typeof value === 'object' && value !== null ? (
          ExtractRecursive(value)
        ) : (
          <p>"{value}"</p>
        )}
      </JsonNode>
    );
  };

  return (
    <>
      {ExtractRecursive(data)}
    </>
  )
}

export default Editor
