import gql from 'graphql-tag'

export const fragments = {
  companyUser: gql`
    fragment companyUser on CompanyUser {
      id
      name
      email
      role
      phone
    }
  `,
  company: gql`
    fragment company on Company {
      id
      name
      hours
      projectManager
      salesRep
      users {
        id
        name
        email
        role
        phone
      }
    }
  `,
  project: gql`
    fragment project on Project {
      id
      title
      status
      projectManager
      startDate
      dueDate
      hoursAllocated
      deliveredDate
      slug
      beDevs
      feDevs
      uiDevs
      specialists
      reportLink
      requirement {
        id
        userName
        userCompany
        userRole
        userEmail
        userPhone
        slug
        isSolutionInMind
        isNewOrExisting
        howFarThrough
        hasTeam
        hasExternalTeam
        hasInternalTeam
        justMe
        howManyExternalTeam
        externalTeamName
        projectName
        techStack
        hasDeadline
        deadline
        hasBudget
        budget 
      }
    }
  `,
  deliverable: gql`
    fragment deliverable on Deliverable {
      id
      title
      description
      outputs {
        id
        title
        href
      }
    }
  `,
  task: gql`
    fragment task on Task {
      id
      title
      description
      startDate
      endDate
      status
    }
  `,
  output: gql`
    fragment output on Output {
      id
      title
      href
    }
  `
}

export const CURRENT_USER = gql`
  {
    currentUser {
      name
      email
      displayName
      avatar
    }
  }
`

export const GET_COMPANIES = gql`
  {
    companies {
      ...company
    }
  }
  ${fragments.company}
`

export const GET_PROJECTS = gql`
  query projects($companyId: Int!) {
    projects(companyId: $companyId) {
      ...project
    }
  }
  ${fragments.project}
`

export const GET_DELIVERABLES = gql`
  query deliverables($projectId: Int!) {
    deliverables(projectId: $projectId) {
      ...deliverable
    }
  }
  ${fragments.deliverable}
`

export const GET_TASKS = gql`
  query tasks($deliverableId: Int!) {
    tasks(deliverableId: $deliverableId) {
      ...task
    }
  }
  ${fragments.task}
`

export const GET_METAUSERS = gql`
  {
    dstbtdUsers {
      distributed_pm {
        ...companyUser
      }
      distributed_sr {
        ...companyUser
      }
    }
  }
  ${fragments.companyUser}
`
