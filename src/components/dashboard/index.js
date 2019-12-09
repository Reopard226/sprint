import React from 'react'
import Detail from './detail'
import CompanyQuery from '../queries/Company'
import ProjectQuery from '../queries/Project'
import DeliverableQuery from '../queries/Deliverable'
import TaskQuery from '../queries/Task'
import CompanyList from './itemList/CompanyList'
import ProjectList from './itemList/ProjectList'
import DeliverableList from './itemList/DeliverableList'
import TaskList from './itemList/TaskList'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      curCompanyId: -1,
      curProjectId: -1,
      curDeliverableId: -1,
      selectedItem: null,
      selectedOriginItem: null,
      selectedCategory: ''
    }
    this.onChangeState = this.onChangeState.bind(this)
  }

  onChangeState (value) {
    this.setState(value)
  }

  render () {
    return (
      <div className='dashboard'>
        <progress className='progress is-primary' value='0' max='100' />
        <div className='container columns is-variable is-1'>
          <div className='column'>
            <CompanyQuery>
              <CompanyList
                state={this.state}
                onChangeState={this.onChangeState}
              />
            </CompanyQuery>
          </div>
          <div className='column'>
            <ProjectQuery variables={{ companyId: this.state.curCompanyId }}>
              <ProjectList
                state={this.state}
                onChangeState={this.onChangeState}
              />
            </ProjectQuery>
          </div>
          <div className='column'>
            <DeliverableQuery
              variables={{ projectId: this.state.curProjectId }}
            >
              <DeliverableList
                state={this.state}
                onChangeState={this.onChangeState}
              />
            </DeliverableQuery>
          </div>
          <div className='column'>
            <TaskQuery
              variables={{ deliverableId: this.state.curDeliverableId }}
            >
              <TaskList state={this.state} onChangeState={this.onChangeState} />
            </TaskQuery>
          </div>
          <div className='column is-one-third item-detail'>
            <Detail state={this.state} onChangeState={this.onChangeState} />
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
