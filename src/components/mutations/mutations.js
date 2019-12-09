import gql from 'graphql-tag'
import { fragments } from '../queries/queries'

export const CREATE_COMPANY = gql`
  mutation createCompany($company: CompanyInput!) {
    createCompany(company: $company) {
      ...company
    }
  }
  ${fragments.company}
`

export const UPDATE_COMPANY = gql`
  mutation updateCompany($id: Int!, $company: CompanyInput!) {
    updateCompany(id: $id, company: $company) {
      ...company
    }
  }
  ${fragments.company}
`

export const CREATE_COMPANY_USER = gql`
  mutation createCompanyUser($companyId: Int!, $user: CompanyUserInput!) {
    createCompanyUser(companyId: $companyId, user: $user) {
      ...companyUser
    }
  }
  ${fragments.companyUser}
`

export const UPDATE_COMPANY_USER = gql`
  mutation updateCompanyUser($userId: Int!, $user: CompanyUserInput!) {
    updateCompanyUser(userId: $userId, user: $user) {
      ...companyUser
    }
  }
  ${fragments.companyUser}
`

export const DELETE_COMPANY = gql`
  mutation deleteCompany($id: Int!) {
    deleteCompany(id: $id)
  }
`

export const DELETE_COMPANY_USER = gql`
  mutation deleteCompanyUser($userId: Int!) {
    deleteCompanyUser(userId: $userId)
  }
`

export const CREATE_PROJECT = gql`
  mutation createProject($companyId: Int!, $project: ProjectInput!) {
    createProject(companyId: $companyId, project: $project) {
      ...project
    }
  }
  ${fragments.project}
`

export const UPDATE_PROJECT = gql`
  mutation updateProject($projectId: Int!, $project: ProjectInput!) {
    updateProject(projectId: $projectId, project: $project) {
      ...project
    }
  }
  ${fragments.project}
`

export const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: Int!) {
    deleteProject(projectId: $projectId)
  }
`

export const CREATE_DELIVERABLE = gql`
  mutation createDeliverable(
    $projectId: Int!
    $deliverable: DeliverableInput!
  ) {
    createDeliverable(projectId: $projectId, deliverable: $deliverable) {
      ...deliverable
    }
  }
  ${fragments.deliverable}
`

export const UPDATE_DELIVERABLE = gql`
  mutation updateDeliverable(
    $deliverableId: Int!
    $deliverable: DeliverableInput!
  ) {
    updateDeliverable(
      deliverableId: $deliverableId
      deliverable: $deliverable
    ) {
      ...deliverable
    }
  }
  ${fragments.deliverable}
`

export const DELETE_DELIVERABLE = gql`
  mutation deleteDeliverable($deliverableId: Int!) {
    deleteDeliverable(deliverableId: $deliverableId)
  }
`

export const CREATE_TASK = gql`
  mutation createTask($deliverableId: Int!, $task: TaskInput!) {
    createTask(deliverableId: $deliverableId, task: $task) {
      ...task
    }
  }
  ${fragments.task}
`

export const UPDATE_TASK = gql`
  mutation updateTask($taskId: Int!, $task: TaskInput!) {
    updateTask(taskId: $taskId, task: $task) {
      ...task
    }
  }
  ${fragments.task}
`

export const DELETE_TASK = gql`
  mutation deleteTask($taskId: Int!) {
    deleteTask(taskId: $taskId)
  }
`

export const CREATE_OUTPUT = gql`
  mutation createOutput($deliverableId: Int!, $output: OutputInput!) {
    createOutput(deliverableId: $deliverableId, output: $output) {
      ...output
    }
  }
  ${fragments.output}
`

export const UPDATE_OUTPUT = gql`
  mutation updateOutput($outputId: Int!, $output: OutputInput!) {
    updateOutput(outputId: $outputId, output: $output) {
      ...output
    }
  }
  ${fragments.output}
`

export const DELETE_OUTPUT = gql`
  mutation deleteOutput($outputId: Int!) {
    deleteOutput(outputId: $outputId)
  }
`
