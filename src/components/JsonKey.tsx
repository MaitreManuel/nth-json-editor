import '../styles/components/JsonKey.css'

interface JsonKeyProps {
  id?: string,
  isOpen?: boolean,
  label?: string,
  onClick?: Function,
}

function JsonKey ({ id, isOpen, label, onClick }: JsonKeyProps) {
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
            {isOpen ? <span>&#11206;</span> : <span>&#11208;</span> } {label ? `"${label}"` : ''}
          </button>
          : `"${label}"`
        }
      </p>
      <span className="json-key__separator">{label ? ':' : ''}&nbsp;</span>
    </>
  )
}

export default JsonKey
