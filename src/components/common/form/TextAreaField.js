import React from 'react'
import Field from './Field'

const TextAreaField = ({ label, placeholder, onChange, value, name }) => (
  <Field label={label}>
    <div className='control'>
      <textarea
        className='input'
        placeholder={placeholder}
        onChange={e => onChange(name, e.target.value)}
        rows={8}
        value={!value ? '' : value}
        name={name}
      />
    </div>
  </Field>
)

export default TextAreaField
