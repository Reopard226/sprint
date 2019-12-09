import React from 'react'

const RadioGroup = ({ options, name, className, onChange }) => (
  <div className={`control ${className}`}>
    {options &&
      options.map((option, i) => (
        <label className={`radio is-flex`} key={i}>
          <div className='is-flex'>
            <input
              type='radio'
              name={name}
              value={option.value}
              onChange={e => onChange(name, e)}
            />
            <p>{option.value}</p>
          </div>
        </label>
      ))}
  </div>
)

export default RadioGroup
