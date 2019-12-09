import React, { useState, useEffect } from 'react'
import RequirementPage from './Requirement'
import ProjectPage from './Project'
import MetaUserQuery from '../../../queries/MetaUser'

export default function Project ({ state, onChangeState }) {
  const [showRequirement, setShowRequirement] = useState(false)

  useEffect(() => {
    setShowRequirement(false)
  }, [state])
  const project = state.selectedItem

  return (
    <React.Fragment>
      {showRequirement && (
        <RequirementPage
          project={project}
          goBack={() => setShowRequirement(false)}
        />
      )}
      {!showRequirement && (
        <MetaUserQuery>
          <ProjectPage
            state={state}
            onChangeState={onChangeState}
            goToRequirement={() => setShowRequirement(true)}
          />
        </MetaUserQuery>
      )}
    </React.Fragment>
  )
}
