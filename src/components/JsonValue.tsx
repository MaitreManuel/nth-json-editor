import '../styles/components/JsonValue.css'

interface JsonValueProps {
  value: boolean | number | null | string | undefined
}

function JsonValue ({ value }: JsonValueProps) {
  return (
    <p className="json-value__value">
      "{value}"
    </p>
  )
}

export default JsonValue
