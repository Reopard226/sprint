import React, { useState } from 'react'
import Form from '../../../common/form'
import CreateDeliverableMutation from '../../../mutations/deliverable/CreateDeliverable'
import DeliverableForm from './DeliverableForm'
import UpdateDeliverableMutation from '../../../mutations/deliverable/UpdateDeliverable'
import DeleteDeliverableMutation from '../../../mutations/deliverable/DeleteDeliverable'
import DeleteDeliverableForm from './DeleteDeliverableForm'
import CreateOutputMutation from '../../../mutations/output/CreateOutput'
import UpdateOutputMutation from '../../../mutations/output/UpdateOutput'
import OutputForm from './OutputForm'
import { mkLengthError } from '../../../common/error'

const { TextField, TextAreaField } = Form

export default function Deliverable ({ state, onChangeState }) {
  const [titleError, setTitleError] = useState(false)
  const deliverable = state.selectedItem

  const onAddOutput = () => {
    state.selectedItem.outputs.push({
      title: '',
      href: ''
    })
    onChangeState(state)
  }

  const onChangeDeliverable = (name, value) => {
    state.selectedItem[name] = value
    onChangeState(state)
  }

  const onChangeDeliverableTitle = (name, value) => {
    if (value.length < 3) setTitleError(true)
    else setTitleError(false)
    onChangeDeliverable(name, value)
  }

  const validationMsg = titleError ? mkLengthError('Diliverable title') : ''

  return (
    <React.Fragment>
      <div className='detail-header'>
        {deliverable.id && (
          <UpdateDeliverableMutation
            deliverable={deliverable}
            projectId={state.curProjectId}
          >
            <DeliverableForm state={state} onChangeState={onChangeState} />
          </UpdateDeliverableMutation>
        )}
        {!deliverable.id && (
          <CreateDeliverableMutation
            deliverable={deliverable}
            projectId={state.curProjectId}
          >
            <DeliverableForm state={state} onChangeState={onChangeState} />
          </CreateDeliverableMutation>
        )}
      </div>
      <div className='detail-content'>
        <TextField
          label='Deliverable title'
          name='title'
          placeholder='Title'
          onChange={onChangeDeliverableTitle}
          value={deliverable.title}
          validationMsg={validationMsg}
        />
        <TextAreaField
          label='Description'
          name='description'
          placeholder='Description'
          onChange={onChangeDeliverable}
          value={deliverable.description}
        />
        <DeleteDeliverableMutation
          deliverableId={deliverable.id}
          projectId={state.curProjectId}
        >
          <DeleteDeliverableForm state={state} onChangeState={onChangeState} />
        </DeleteDeliverableMutation>
        {deliverable.outputs &&
          deliverable.outputs.map((output, index) => {
            if (output.id) {
              return (
                <UpdateOutputMutation
                  key={index}
                  output={output}
                  index={index}
                  deliverableId={deliverable.id}
                  projectId={state.curProjectId}
                >
                  <OutputForm
                    index={index}
                    state={state}
                    onChangeState={onChangeState}
                  />
                </UpdateOutputMutation>
              )
            } else {
              return (
                <CreateOutputMutation
                  key={index}
                  output={output}
                  index={index}
                  deliverableId={deliverable.id}
                  projectId={state.curProjectId}
                >
                  <OutputForm
                    index={index}
                    state={state}
                    onChangeState={onChangeState}
                  />
                </CreateOutputMutation>
              )
            }
          })}
        {deliverable.id && (
          <div className='btn-purple cursor' onClick={onAddOutput}>
            ADD NEW OUTPUT
          </div>
        )}
      </div>
    </React.Fragment>
  )
}
