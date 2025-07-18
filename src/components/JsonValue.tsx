import { useEffect , useState } from 'react'

import '../styles/components/JsonValue.css'

interface JsonValueProps {
  value: unknown
}

function JsonValue ({ value }: JsonValueProps) {
  const [changedValue, setChangedValue] = useState<any>(value);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [hasDoubleQuotes, setHasDoubleQuotes] = useState<boolean>(false);
  const [typeColor, setTypeColor] = useState<string>('');
  const [typeName, setTypeName] = useState<string | undefined>(undefined);

  const enableEdit = () => {
    setEditMode(true)
  }

  const saveEdit = () => {
    setEditMode(false)
    setChangedValue(changedValue)
  }

  useEffect(() => {
    switch(typeof value) {
      case 'bigint':
      case 'number':
        setTypeColor('theme__type-number')
        setTypeName('number')
        break
      case 'boolean':
        setTypeColor('theme__type-boolean')
        setTypeName('boolean')
        break
      case 'string':
      case 'symbol':
        setHasDoubleQuotes(true)
        setTypeColor('theme__type-string')
        setTypeName('string')
        break
      case 'undefined':
      default:
        setTypeColor('theme__type-default')
        break
    }
  }, [value]);

  return (
    <>
      {!editMode
        ? <p
          className={`json-value__value ${typeColor}`}
          onClick={enableEdit}
        >
          <span>{ (hasDoubleQuotes ? `"${changedValue}"` : `${changedValue}`) }</span>
          {typeName ? <span className="json-value__badge theme__badge">{typeName}</span> : ''}
        </p>
        : <>
          <input
            className="json-value__input"
            type="text"
            defaultValue={changedValue}
            onChange={(event) => setChangedValue(event.target.value)}
          />
          <span onClick={saveEdit}>X</span>
        </>
      }
    </>
  )
}

export default JsonValue
