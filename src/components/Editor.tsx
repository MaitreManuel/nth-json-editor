import { useEffect, useState } from 'react'

import JsonKey from './JsonKey.tsx';
import JsonNode from './JsonNode.tsx';
import JsonValue from './JsonValue.tsx';

import '../styles/components/Editor.css'

interface EditorProps {
  data: object,
  theme: string,
}

function Editor({ data, theme }: EditorProps) {
  let nbJsonLine = 2

  const [displayLines, setDisplayLines] = useState<number>(0)

  const ExtractRecursive = (rawNodes: object) => {
    return Object.entries(rawNodes).map(([key, value]: [string, unknown]) => {
      const isValueObject = ![null, undefined].includes(value) && typeof value === 'object';
      const isValueArray = isValueObject && Array.isArray(value);

      if (isValueObject) {
        nbJsonLine += 2;
      } else {
        nbJsonLine += 1;
      }

      return (
        <div
          className="json-node__container-inner"
          key={`node-${key}`}
        >
          {isValueObject
            ? <JsonNode
              isValueArray={isValueArray}
              keyName={key}
              nbItems={Object.keys(value).length || 0}
            >
              {ExtractRecursive(value)}
            </JsonNode>
            : <div className="editor__entry">
              <JsonKey
                isValueArray={isValueArray}
                label={key}
              />
              <JsonValue value={value} />
            </div>
          }
        </div>
      )
    });
  };

  useEffect(() => {
    setDisplayLines(nbJsonLine);
  }, [data, nbJsonLine])

  return (
    <>
      <div className={`editor__container theme__${theme}`}>
        <aside className="editor__aside theme__background-alt">
          {Array(displayLines).fill('').map((_, index) => (
            <p
              className="editor__line theme__comment"
              key={`line-${index + 1}`}>
              {index + 1}
            </p>
          ))}
        </aside>
        <div className="editor__body theme__background">
          <JsonNode
            isValueArray={Array.isArray(data)}
            nbItems={Object.keys(data).length}
          >
            {ExtractRecursive(data)}
          </JsonNode>
        </div>
      </div>
    </>
  )
}

export default Editor
