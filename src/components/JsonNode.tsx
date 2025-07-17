import { useState } from 'react'

import JsonKey from './JsonKey.tsx';

import type { Children } from 'react'

import '../styles/components/JsonNode.css'

interface JsonNodeProps {
  children: Children,
  keyName?: string,
  nbItems?: number,
}

function JsonNode ({ children, keyName, nbItems }: JsonNodeProps) {
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
          <p className="json-node__start--symbol theme__emphasized">{'{'}</p>
          { nbItems > 1
            ? <p className="json-node__num-items theme__comment">
              {nbItems} items
          </p>
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
          <p className="json-node__end--symbol theme__emphasized">{'}'}</p>
        </div>
      </div>
    </>
  )
}

export default JsonNode
