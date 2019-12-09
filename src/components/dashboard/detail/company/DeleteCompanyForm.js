import React, { useState } from 'react'
import { createNotification } from '../../../common/notification'
import Loader from '../../../animation/Loader'

export default function DeleteCompanyForm ({
  deleteCompany,
  loading,
  state,
  onChangeState
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const company = state.selectedItem

  const handleDeleteCompany = deleteCompany => {
    setShowConfirmModal(false)
    if (!company.id) {
      state.selectedItem = null
      onChangeState(state)
      return
    }
    deleteCompany({ variables: { id: company.id } })
      .then(result => {
        if (result.data.deleteCompany !== 1) {
          createNotification('error', `Company "${company.name}" doesn't exist`)
        } else {
          createNotification(
            'success',
            `Company "${company.name}" has been deleted successfully`
          )
          state.selectedItem = null
          onChangeState(state)
        }
      })
      .catch(err => createNotification('error', err.message))
  }

  const onShowDeleteModal = () => {
    if (company.users.length > 0) return
    setShowConfirmModal(true)
  }

  return (
    <div className='remove-item'>
      {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
      {!loading && (
        <a
          className='button is-danger is-inverted'
          onClick={onShowDeleteModal}
          disabled={company.users.length > 0}
        >
          DELETE COMPANY
        </a>
      )}
      <div className={`modal ${showConfirmModal ? 'is-active' : ''}`}>
        <div className='modal-background' />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Delete Company</p>
          </header>
          <section className='modal-card-body'>
            <h2>Do you want to delete the company "{company.name}"?</h2>
          </section>
          <footer className='modal-card-foot'>
            <button
              className='button is-success'
              onClick={() => handleDeleteCompany(deleteCompany)}
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
    </div>
  )
}
