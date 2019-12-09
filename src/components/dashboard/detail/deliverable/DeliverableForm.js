import React from 'react'
import { createNotification } from '../../../common/notification'
import { isEqualObject } from '../../../common/helpers'
import Loader from '../../../animation/Loader'

export default function DeliverableForm ({
  createDeliverable,
  updateDeliverable,
  loading,
  state,
  onChangeState
}) {
  const deliverable = state.selectedItem
  const projectId = state.curProjectId
  const isEdited = !isEqualObject(deliverable, state.selectedOriginItem)

  const handleDeliverableSubmit = () => {
    if (!isEdited) return
    if (deliverable.title.length < 3) {
      createNotification('error', 'Please input the deliverable data correctly')
      return
    }
    const deliverableInput = {
      title: deliverable.title,
      description: deliverable.description
    }

    if (typeof updateDeliverable !== typeof undefined) {
      updateDeliverable({
        variables: {
          deliverableId: deliverable.id,
          deliverable: deliverableInput
        }
      })
        .then(result => {
          createNotification(
            'success',
            `Deliverable "${deliverable.title}" has been updated successfully`
          )
          state.selectedOriginItem = JSON.parse(JSON.stringify(state.selectedItem))
          onChangeState(state)
        })
        .catch(err => createNotification('error', err.message))
    } else {
      createDeliverable({
        variables: { projectId, deliverable: deliverableInput }
      })
        .then(result => {
          createNotification(
            'success',
            `New deliverable "${
              deliverable.title
            }" has been created successfully`
          )
          state.curDeliverableId = result.data.createDeliverable.id
          state.selectedItem = result.data.createDeliverable
          state.selectedOriginItem = JSON.parse(JSON.stringify(state.selectedItem))
          onChangeState(state)
        })
        .catch(err => createNotification('error', err.message))
    }
  }

  return (
    <React.Fragment>
      <div className='item-category'>
        {'Deliverable'}
        {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
        {!loading && (
          <a
            className={isEdited ? '' : 'disabled'}
            onClick={handleDeliverableSubmit}
          >
            SAVE
          </a>
        )}
      </div>
      <h2 className='item-name'>{deliverable.title}</h2>
    </React.Fragment>
  )
}
