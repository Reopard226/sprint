import React from 'react'
import { LeadItem, Item } from '../../common/Listtem'
import Loader from '../../animation/Loader'

const DeliverableList = ({ state, onChangeState, deliverables, loading }) => {
  let active = state.curProjectId !== -1

  const onClickDeliverableItem = deliverable => {
    state.selectedItem = JSON.parse(JSON.stringify(deliverable))
    state.selectedOriginItem = deliverable
    state.selectedCategory = 'deliverable'
    state.curDeliverableId = deliverable.id
    state.curTaskId = -1
    onChangeState(state)
  }

  const onCreateDeliverable = () => {
    if (!active) return
    const newDeliverable = {
      title: '',
      description: '',
      outputs: []
    }
    state.selectedItem = newDeliverable
    state.selectedCategory = 'deliverable'
    onChangeState(state)
  }

  return (
    <div className='item-list'>
      <LeadItem
        text={'Deliverable'}
        onAddItem={onCreateDeliverable}
        active={active}
      />
      <div className='item-list-body'>
        {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
        {!loading &&
          deliverables &&
          deliverables.map(deliverable => {
            return (
              <Item
                key={deliverable.id}
                text={deliverable.title}
                onClickItem={() => onClickDeliverableItem(deliverable)}
                active={deliverable.id === state.curDeliverableId}
                clicked={deliverable === state.selectedItem}
              />
            )
          })}
      </div>
    </div>
  )
}
export default DeliverableList
