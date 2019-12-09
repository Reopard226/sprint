import React from 'react'

export default function Error ({ children }) {
  return <div className='help red'>{children}</div>
}

export const mkLengthError = name => {
  return `${name} should be at least 3 characters in length`
}
