import React from 'react'
import Image from '../../assets/images'

export const LeadItem = ({ text, active, onAddItem }) => (
  <div className='ticket lead-item'>
    <span>{text}</span>
    {active && (
      <a onClick={onAddItem}>
        <img src={Image.ActivePlus} alt='add' width={27} height={27} />
      </a>
    )}
    {!active && <img src={Image.Plus} alt='add' width={27} height={27} />}
  </div>
)

export const Item = ({ text, active, clicked, onClickItem }) => {
  let style = clicked ? 'clicked' : active ? 'chosen' : ''
  return (
    <div className={`ticket item ${style}`} onClick={onClickItem}>
      <span>{text}</span>
    </div>
  )
}
