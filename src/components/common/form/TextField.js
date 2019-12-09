import React from 'react'
import Field from './Field'

const TextField = ({
  label,
  placeholder,
  type,
  onChange,
  value,
  name,
  validationMsg,
  disabled
}) => {
  const onChangeTextField = e => {
    let value = e.target.value
    if (type === 'number' && value) value = parseInt(value)
    onChange(name, value)
  }

  return (
    <Field label={label}>
      <div className='control'>
        <input
          className={`input ${validationMsg ? 'invalid-input' : ''}`}
          type={type || 'text'}
          placeholder={placeholder}
          spellCheck={false}
          onChange={onChangeTextField}
          value={!value ? '' : value}
          name={name}
          disabled={disabled}
        />
        <small>{validationMsg}</small>
      </div>
    </Field>
  )
}

export default TextField
