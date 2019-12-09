import React, { useState } from 'react'
import DeleteOutputMutation from '../../../mutations/output/DeleteOutput'
import DeleteOutputForm from './DeleteOutputForm'
import { createNotification } from '../../../common/notification'
import { isEqualObject } from '../../../common/helpers'
import { mkLengthError } from '../../../common/error'
import Form from '../../../common/form'
import Loader from '../../../animation/Loader'

const { TextField } = Form

export default function OutputForm ({
  createOutput,
  updateOutput,
  loading,
  index,
  state,
  onChangeState
}) {
  const [titleError, setTitleError] = useState(false)
  const output = state.selectedItem.outputs[index]
  const originOutput = output.id
    ? state.selectedOriginItem.outputs[index]
    : null
  const isEdited = !isEqualObject(output, originOutput)

  const handleOutputSubmit = () => {
    if (!isEdited) return
    if (output.title.length < 3) {
      createNotification('error', 'Please input the output data correctly')
      return
    }
    const outputInput = {
      title: output.title,
      href: output.href
    }
    if (typeof updateOutput !== typeof undefined) {
      updateOutput({ variables: { outputId: output.id, output: outputInput } })
        .then(result => {
          createNotification(
            'success',
            `Output "${output.title}" has been updated successfully`
          )
          state.selectedOriginItem = JSON.parse(JSON.stringify(state.selectedItem))
          onChangeState(state)
        })
        .catch(err => createNotification('error', err.message))
    } else {
      createOutput({
        variables: {
          deliverableId: state.curDeliverableId,
          output: outputInput
        }
      })
        .then(result => {
          createNotification(
            'success',
            `New Output "${output.title}" has been created successfully`
          )
          state.selectedItem.outputs[index] = result.data.createOutput
          state.selectedOriginItem = JSON.parse(JSON.stringify(state.selectedItem))
          onChangeState(state)
        })
        .catch(err => createNotification('error', err.message))
    }
  }

  const onChangeOutput = (name, value) => {
    state.selectedItem.outputs[index][name] = value
    onChangeState(state)
  }

  const onChangeOutputName = (name, value) => {
    if (value.length < 3) setTitleError(true)
    else setTitleError(false)
    onChangeOutput(name, value)
  }

  const validationMsg = titleError ? mkLengthError('Output title') : ''

  return (
    <div className='company-user-box'>
      <div className='item-category'>
        <strong>{`Outputs ${index + 1}`}</strong>
        <div className='flex'>
          {loading && (
            <Loader height={20} width={150} animation='SimpleLoader' />
          )}
          {!loading && (
            <a
              className={isEdited ? '' : 'disabled'}
              onClick={handleOutputSubmit}
            >
              SAVE OUTPUT
            </a>
          )}
          <DeleteOutputMutation
            deliverableId={state.curDeliverableId}
            outputId={output.id}
            index={index}
            projectId={state.curProjectId}
          >
            <DeleteOutputForm
              index={index}
              state={state}
              onChangeState={onChangeState}
            />
          </DeleteOutputMutation>
        </div>
      </div>
      <TextField
        label={`Output ${index + 1} name`}
        placeholder='Name'
        name='title'
        onChange={onChangeOutputName}
        value={output.title}
        validationMsg={validationMsg}
      />
      <TextField
        label={`Output ${index + 1} link`}
        placeholder='Link'
        name='href'
        onChange={onChangeOutput}
        value={output.href}
      />
    </div>
  )
}
