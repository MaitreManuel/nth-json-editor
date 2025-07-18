import type { MouseEventHandler } from 'react';

import '../styles/components/JsonKey.css'

interface JsonKeyProps {
  id?: string,
  isValueArray?: boolean,
  isOpen?: boolean,
  label?: string,
  onClick?: MouseEventHandler,
}

function JsonKey ({ id, isValueArray, isOpen, label, onClick }: JsonKeyProps) {
  const transformedLabel = isValueArray ? label : `"${label}"`;

  return (
    <>
      <p className="json-key__label theme__emphasized">
        {onClick
          ? <button
            className="json-key__button theme__emphasized theme__highlight--bg--hover"
            id={id}
            type="button"
            onClick={onClick}
          >
            {isOpen ? <span>&#11206;</span> : <span>&#11208;</span> } {label ? `${transformedLabel}` : ''}
          </button>
          : <span>{transformedLabel}</span>
        }
      </p>
      <span className="json-key__separator">{label ? ':' : ''}&nbsp;</span>
    </>
  )
}

export default JsonKey
