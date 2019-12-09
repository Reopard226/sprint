import React from 'react'
import Field from './Field'
import Image from '../../../assets/images'
import { passwordPassed } from '../helpers'

const PasswordField = ({
  label,
  placeholder,
  onChange,
  value,
  name,
  validationMsgs = [],
  validationType = '',
  disabled
}) => {
  const onChangeTextField = e => {
    onChange(name, e.target.value)
  }

  return (
    <Field label={label}>
      <div className={`control`}>
        <input
          className={`input ${!passwordPassed(validationMsgs) ? 'invalid-input' : ''
          } ${validationType}`}
          type='password'
          placeholder={placeholder}
          onChange={onChangeTextField}
          value={value}
          name={name}
          disabled={disabled}
        />
        {validationMsgs.length > 0 && (
          <div className='password-messages'>
            {validationMsgs.length > 1 && <small>Password must include:</small>}
            {validationMsgs.map((msg, k) => {
              return (
                <div className='pwd-msg is-flex' key={k}>
                  <img src={msg.passed ? Image.Check : Image.Point} alt='pwd' />
                  <small className={msg.passed ? 'passed' : ''}>{msg.text}</small>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Field>
  )
}

export default PasswordField
