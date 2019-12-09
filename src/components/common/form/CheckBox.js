import React from 'react'

const CheckBox = ({ title, value, onChange, name }) => (
  <div className='control'>
    <label className='checkbox is-flex align'>
      <input
        type='checkbox'
        defaultChecked={value}
        name={name}
        onChange={() => onChange(name)}
      />
      <p>{title}</p>
    </label>
  </div>
)

export default CheckBox
