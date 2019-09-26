import React, { Component } from 'react'
import { Segment, Dropdown, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'

import SpacesContainer from './SpacesContainer.js'
import EditHouseholdForm from '../components/forms/households/EditHouseholdForm.js'
import JoinOrLeaveHouseholdForm from '../components/forms/households/JoinOrLeaveHouseholdForm.js'
import AddSpaceForm from '../components/forms/spaces/AddSpaceForm.js'

class HouseholdContainer extends Component {

  state = {
    addingSpace: false,
    leavingHousehold: false,
    editingHousehold: false,
  }

  setAddingSpace = () => {
    this.setState({
      addingSpace: !this.state.addingSpace
    })
  }

  handleInput = (e) => {
      this.setState({
        [e.target.name]:e.target.value
      })
  }

  setEditingHousehold = () => {
    this.setState({
      editingHousehold: !this.state.editingHousehold
    })
  }

  setLeavingHousehold = () => {
    this.setState({
      leavingHousehold: !this.state.leavingHousehold
    })
  }

  render(){
    return(
      <>
        <Segment raised clearing style={{margin:'1%', minWidth:'50vw'}}>

          {this.props.space && this.props.space.hasOwnProperty('id') ? null :
          <>
          <div className='d-flex justify-content-between'>
            <div className='d-flex flex-row'>
              <span className='font-weight-bold big-font' onClick={()=>this.props.setCurrentHousehold(this.props.household)}>{this.props.household.name}</span><Image floated="left" src={this.props.household.image} size="mini" style={{height:'25px', width:'25px', paddingLeft:'5%'}}/>
            </div>
            <div className='d-flex'>
              <Dropdown floated="right" pointing="top right" style={{}} text="Household">
                <Dropdown.Menu>
                  <Dropdown.Item text="Add Space" onClick={this.setAddingSpace}/>
                  <Dropdown.Item text="Edit Household" onClick={this.setEditingHousehold}/>
                  <Dropdown.Item text="Leave Household" onClick={this.setLeavingHousehold}/>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

            {this.state.editingHousehold ? <EditHouseholdForm
              setEditingHousehold={this.setEditingHousehold}
              household={this.props.household}
              /> : null}

            {this.state.addingSpace ?
              <AddSpaceForm
                householdId={this.props.household.id}
                setAddingSpace={this.setAddingSpace}
              />: null}

            {this.state.leavingHousehold ?
              <JoinOrLeaveHouseholdForm
                type={"leave"}
                householdId={this.props.household.id}
                householdName={this.props.household.name}
                setLeavingHousehold={this.setLeavingHousehold} />: null}
          </>
        }
          <SpacesContainer history={this.props.history}/>
        </Segment>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    household: state.household,
    space: state.space,
    container: state.container
   }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setUser: (user) => dispatch({type:"SET_USER", user}),
    setCurrentHousehold: (household) => dispatch({type:"SET_CURRENT_HOUSEHOLD", household}),
    addSpace: (space) => dispatch({type:"ADD_SPACE", space}),
    setCurrentSpace: (space) => dispatch({type:"SET_CURRENT_SPACE"})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HouseholdContainer)