import JsonKey from './JsonKey.tsx';
import JsonNode from './JsonNode.tsx';
import JsonValue from './JsonValue.tsx';

import '../styles/components/Editor.css'

interface EditorProps {
  data: object,
  theme: string,
}

function Editor({ data, theme }: EditorProps) {
  const ExtractRecursive = (rawNodes: object) => {
    return Object.entries(rawNodes).map(([key, value]: [string, any]) => (
      <div
        className="json-node__container-outer"
        key={`node-${key}`}
      >
        {typeof value === 'object' && value !== null ?
            <JsonNode
              keyName={key}
              nbItems={Object.keys(value).length}
            >
              {ExtractRecursive(value)}
            </JsonNode>
        :
          <div className="editor__entry">
            <JsonKey label={key} />
            <JsonValue value={value} />
          </div>
        }
      </div>
    ));
  };

  return (
    <>
      <div className={`editor__container theme__${theme}`}>
        <div className="editor__body theme__background">
          <JsonNode nbItems={Object.keys(data).length}>
            {ExtractRecursive(data)}
          </JsonNode>
        </div>
      </div>
    </>
  )
}

export default Editor
