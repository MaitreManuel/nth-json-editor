import { useState } from 'react'

import JsonKey from './JsonKey.tsx';

import type { Children } from 'react'

import '../styles/components/JsonNode.css'

interface JsonNodeProps {
  children: Children,
  isValueArray?: boolean,
  keyName?: string,
  nbItems?: number,
}

function JsonNode ({ children, isValueArray, keyName, nbItems }: JsonNodeProps) {
  const keyNameBtn = `${keyName ? keyName : 'root'}-btn`

  const [isOpen, setIsOpen] = useState<boolean>(true)

  const toggleNode = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className={`json-node__container${isOpen ? ' json-node__container--opened' : ''}`}>
        <div className="json-node__start">
          <JsonKey
            id={keyNameBtn}
            isOpen={isOpen}
            label={keyName}
            onClick={toggleNode}
          />
          <p className="json-node__start--symbol theme__emphasized">{isValueArray ? '[' : '{'}</p>
          { nbItems
            ? <button
              className="json-node__num-items theme__comment theme__highlight--bg--hover"
              onClick={toggleNode}
            >
              {nbItems} {isValueArray ? `item${nbItems > 1 ? 's' : ''}` : `entr${nbItems > 1 ? 'ies' : 'y'}`}
          </button>
            : ''
          }
        </div>
        <div
          aria-controls={keyNameBtn}
          aria-expanded={isOpen}
          className="json-node__container-body theme__border"
        >
          {children}
        </div>
        <div className="json-node__end">
          <p className="json-node__end--symbol theme__emphasized">{isValueArray ? ']' : '}'}</p>
        </div>
      </div>
    </>
  )
}

export default JsonNode
