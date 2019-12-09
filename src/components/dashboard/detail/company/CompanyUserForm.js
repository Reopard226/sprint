import React, { useState } from 'react'
import DeleteCompanyUserMutation from '../../../mutations/company/DeleteCompanyUser'
import DeleteCompanyUserForm from './DeleteCompanyUserForm'
import { createNotification } from '../../../common/notification'
import {
  RegEmail,
  RegPhone,
  isEqualObject,
  checkValidPassword,
  passwordPassed
} from '../../../common/helpers'
import { mkLengthError } from '../../../common/error'
import Loader from '../../../animation/Loader'
import Form from '../../../common/form'

const { TextField, PasswordField } = Form

const CompanyForm = ({
  createCompanyUser,
  updateCompanyUser,
  loading,
  index,
  state,
  onChangeState
}) => {
  const [nameErrorMsg, setNameErrorMsg] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [roleErrorMsg, setRoleErrorMsg] = useState('')
  const [phoneErrorMsg, setPhoneErrorMsg] = useState('')
  const [passwordErrorMsgs, setPasswordErrorMsgs] = useState('')
  const user = state.selectedItem.users[index]
  const originUser = user.id ? state.selectedOriginItem.users[index] : null
  const isEdited = !isEqualObject(user, originUser)
  const pwdPlaceholer = user.id ? '••••••••' : 'Password'

  const onChangeUser = (name, value) => {
    user[name] = value
    state.selectedItem.users[index] = user
    onChangeState(state)
  }

  const onChangeUserName = (name, value) => {
    if (value.length < 3) setNameErrorMsg(mkLengthError('User name'))
    else setNameErrorMsg('')
    onChangeUser(name, value)
  }

  const onChangeUserEmail = (name, value) => {
    if (RegEmail.test(value)) setEmailErrorMsg('')
    else setEmailErrorMsg('Please put a valid email address')
    onChangeUser(name, value)
  }

  const onChangeUserRole = (name, value) => {
    if (!value) setRoleErrorMsg('User role is required')
    else setRoleErrorMsg('')
    onChangeUser(name, value)
  }

  const onChangeUserPassword = (name, value) => {
    onChangeUser(name, value)
    setPasswordErrorMsgs(checkValidPassword(value))
  }

  const onChangeUserPhone = (name, value) => {
    if (value && !RegPhone.test(value)) { setPhoneErrorMsg('Please put a valid phone number') } else setPhoneErrorMsg('')
    onChangeUser(name, value)
  }

  const handleCompanyUserSubmit = () => {
    if (!isEdited) return
    if (!user.name || !user.email || !user.role || (!user.id && !user.password)) {
      createNotification('error', 'Please input the user data correctly')
      onChangeUserName('name', user.name)
      onChangeUserEmail('email', user.email)
      onChangeUserRole('role', user.role)
      onChangeUserPassword('password', user.password)
      return
    }
    if (
      nameErrorMsg ||
      emailErrorMsg ||
      roleErrorMsg ||
      phoneErrorMsg ||
      !passwordPassed(passwordErrorMsgs)
    ) {
      createNotification('error', 'Please input the user data correctly')
      return
    }
    const companyUserInput = {
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      password: user.password
    }
    if (typeof updateCompanyUser !== typeof undefined) {
      updateCompanyUser({
        variables: { userId: user.id, user: companyUserInput }
      })
        .then(result => {
          createNotification(
            'success',
            `Company user "${user.name}" has been updated successfully`
          )
          state.selectedOriginItem.users[index] = Object.assign({}, user)
          onChangeState(state)
        })
        .catch(err => createNotification('error', err.message))
    } else {
      createCompanyUser({
        variables: { companyId: state.selectedItem.id, user: companyUserInput }
      })
        .then(result => {
          createNotification(
            'success',
            `New company user "${user.name}" has been created successfully`
          )
          state.selectedItem.users[index] = result.data.createCompanyUser
          state.selectedItem.users[index] = Object.assign(
            {},
            result.data.createCompanyUser
          )
          onChangeState(state)
        })
        .catch(err => createNotification('error', err.message))
    }
  }

  return (
    <div className='company-user-box'>
      <div className='item-category'>
        <strong>{`User ${index + 1}`}</strong>
        <div className='flex'>
          {loading && (
            <Loader height={20} width={150} animation='SimpleLoader' />
          )}
          {!loading && (
            <a
              className={isEdited ? '' : 'disabled'}
              onClick={handleCompanyUserSubmit}
            >
              SAVE
            </a>
          )}
          <DeleteCompanyUserMutation
            user={user}
            index={index}
            companyId={state.selectedItem.id}
          >
            <DeleteCompanyUserForm
              user={user}
              index={index}
              state={state}
              onChangeState={onChangeState}
            />
          </DeleteCompanyUserMutation>
        </div>
      </div>
      <TextField
        label={`User ${index + 1} name`}
        placeholder='Name'
        name='name'
        onChange={onChangeUserName}
        value={user.name}
        validationMsg={nameErrorMsg}
      />
      <TextField
        label={`User ${index + 1} role`}
        placeholder='CEO'
        name='role'
        onChange={onChangeUserRole}
        value={user.role}
        validationMsg={roleErrorMsg}
      />
      <TextField
        label={`User ${index + 1} email address`}
        placeholder='Email'
        name='email'
        onChange={onChangeUserEmail}
        value={user.email}
        validationMsg={emailErrorMsg}
      />
      <PasswordField
        label={`User ${index + 1} password`}
        placeholder={pwdPlaceholer}
        name='password'
        value={user.password}
        onChange={onChangeUserPassword}
        validationMsgs={passwordErrorMsgs}
        disabled={!!user.id}
        validationType={!passwordPassed(passwordErrorMsgs) ? 'black' : ''}
      />
      <TextField
        label={`User ${index + 1} contact number`}
        placeholder='Phone'
        name='phone'
        onChange={onChangeUserPhone}
        value={user.phone}
        validationMsg={phoneErrorMsg}
      />
    </div>
  )
}

export default CompanyForm
