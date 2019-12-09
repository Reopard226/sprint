import React from 'react'
import Field from './Field'

const Select = ({ label, options, value, onChange, name }) => (
  <Field label={label}>
    <div className='select'>
      <select
        name={name}
        value={!value ? 0 : value}
        onChange={e => onChange(name, parseInt(e.target.value))}
      >
        {options &&
          options.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  </Field>
)

export default Select
