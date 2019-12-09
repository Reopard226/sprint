import React from 'react'

export default function Requirement ({ project, goBack }) {
  const getQuestionData = requirement => {
    let questions = []
    questions.push({
      question: 'Have you already got a solution in mind?',
      answer: requirement.isSolutionInMind ? 'Yes' : 'No'
    })
    questions.push({
      question: 'Are you enquiring about a new or existing project?',
      answer: requirement.isNewOrExisting ? 'New feature' : 'Existing'
    })
    questions.push({
      question: 'What is the name of this project?',
      answer: requirement.projectName
    })
    questions.push({
      question: 'How far through the project are you?',
      answer: requirement.howFarThrough
    })
    questions.push({
      question: 'Have you a team assigned to this project?',
      answer: !requirement.hasTeam
        ? 'Just me'
        : requirement.hasExternalTeam
          ? 'Yes, External team'
          : 'Yes, Internal team'
    })
    if (requirement.hasTeam) {
      questions.push({
        question: 'How many external teams are involved?',
        answer: requirement.howManyExternalTeam.toString()
      })
      questions.push({
        question: 'What is the name of external team?',
        answer: requirement.externalTeamName
      })
    }
    const stacks = JSON.parse(requirement.techStack)
    let stackStr = ''
    if (stacks && stacks.length > 0) {
      let stackLabels = stacks.map(stack => stack.label)
      stackStr = stackLabels.join(', ')
    }
    questions.push({
      question: 'What is the tech stack you use?',
      answer: stackStr
    })
    questions.push({
      question: 'Have you a deadline for this project?',
      answer: requirement.hasDeadline ? `Yes, ${new Date(parseInt(requirement.deadline)).toDateString()}` : 'No'
    })
    questions.push({
      question: 'Have you a budget for this project?',
      answer: requirement.hasBudget ? `Yes, ${requirement.budget}` : 'No'
    })

    return questions
  }

  return (
    <React.Fragment>
      <div className='detail-header'>
        <div className='item-category'>
          {'Requirements'}
          <a onClick={goBack}>BACK</a>
        </div>
        <h2 className='item-name'>{project.title}</h2>
      </div>
      <div className='detail-content'>
        {!project.requirement && (
          <h3>There is no requirement for this project</h3>
        )}
        {project.requirement && (
          <React.Fragment>
            {getQuestionData(project.requirement).map(question => (
              <div className='requirement-question' key={question.question}>
                {question.question} <br />
                <p>{question.answer}</p>
              </div>
            ))}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}
