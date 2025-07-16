import { useState } from 'react';

import '../styles/JsonNode.css';

interface JsonNodeProps {
  children: any,
  keyName: any,
}

function JsonNode ({ children, keyName }: JsonNodeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleNode = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className={`node__container ${isOpen ? 'node__container--opened' : ''}`}>
        <p onClick={toggleNode}>{keyName}</p>
        <div
          aria-expanded={isOpen}
          className="node__container-inner"
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default JsonNode
