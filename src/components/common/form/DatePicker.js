import React, { useState, useEffect } from 'react'
import Field from './Field'
import DatePicker from 'react-datepicker'

const DateField = ({ label, type, onChange, value, name, placeholderText }) => {
  const [curDate, setCurDate] = useState(value)

  useEffect(() => setCurDate(value), [value])

  function onChangeDate (e) {
    setCurDate(e)
    if (!e) onChange(name, null)
    else onChange(name, e.getTime().toString())
  }

  function resetDate () {
    onChangeDate(undefined)
    setCurDate(undefined)
  }

  return (
    <Field label={label}>
      <div className='control date-field'>
        <DatePicker
          className='input'
          selected={curDate}
          placeholderText={placeholderText}
          onChange={onChangeDate}
          dateFormat='dd MMMM yyyy'
        />
        <a className='tag is-delete' onClick={resetDate} title={'reset'} />
      </div>
    </Field>
  )
}

export default DateField
