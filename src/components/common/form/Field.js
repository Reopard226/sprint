import React from 'react'

const Field = ({ label, children }) => (
  <div className='field'>
    <label className='label'>{label}</label>
    {children}
  </div>
)

export default Field
