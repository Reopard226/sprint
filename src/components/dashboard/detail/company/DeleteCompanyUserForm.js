import React, { useState } from 'react'
import { createNotification } from '../../../common/notification'
import Loader from '../../../animation/Loader'

export default function DeleteCompanyUserForm ({
  deleteCompanyUser,
  loading,
  user,
  index,
  state,
  onChangeState
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const handleDeleteCompanyUser = deleteCompanyUser => {
    setShowConfirmModal(false)
    if (!user.id) {
      state.selectedItem.users.splice(index, 1)
      onChangeState(state)
      return
    }
    deleteCompanyUser({ variables: { userId: user.id } })
      .then(result => {
        if (result.data.deleteCompanyUser !== 1) {
          createNotification(
            'error',
            `Company user "${user.name}" doesn't exist`
          )
        } else {
          state.selectedItem.users.splice(index, 1)
          onChangeState(state)
          createNotification(
            'success',
            `Company user "${user.name}" has been deleted successfully`
          )
        }
      })
      .catch(err => createNotification('error', err.message))
  }

  return (
    <React.Fragment>
      {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
      {!loading && (
        <a className='remove-link' onClick={() => setShowConfirmModal(true)}>
          REMOVE
        </a>
      )}
      <div className={`modal ${showConfirmModal ? 'is-active' : ''}`}>
        <div className='modal-background' />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Delete User</p>
          </header>
          <section className='modal-card-body'>
            <h2>Do you want to delete the user "{user.name}"?</h2>
          </section>
          <footer className='modal-card-foot'>
            <button
              className='button is-success'
              onClick={() => handleDeleteCompanyUser(deleteCompanyUser)}
            >
              Delete
            </button>
            <button
              className='button'
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </React.Fragment>
  )
}
