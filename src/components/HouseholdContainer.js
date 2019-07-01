import React, { Component } from 'react'
import { Segment, Header, Form, Button } from 'semantic-ui-react'
import SpacesContainer from './SpacesContainer.js'
import { connect } from 'react-redux'

class HouseholdContainer extends Component {
  state = {
    addingSpace: false,
    newSpaceName:""
  }

  setAddingSpace = () => {
    this.setState({
      addingSpace: !this.state.addingSpace
    })
  }

  handleNewSpaceInput = (e) => {
      this.setState({
        [e.target.name]:e.target.value
      })
  }

  addSpace = () => {
    fetch('http://localhost:3000/api/v1/spaces',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        space:{
          name: this.state.newSpaceName,
          household_id: this.props.state.currentHousehold.id
        }
      })
    }).then(resp=>resp.json())
    .then(space=>{
      this.props.addSpace(space)
    })
  }


  renderAddSpaceForm = () => {
    return <Segment clearing>
    <Form>
      <Form.Field>
        <label>Name</label>
        <input onChange={this.handleNewSpaceInput} name="newSpaceName" placeholder="Space Name"/>
      </Form.Field>
      <Button floated="right"
       onClick={this.setAddingSpace}>Cancel</Button>
      <Button floated="right"
      onClick={this.addSpace}>Submit</Button>
    </Form>

    </Segment>
  }

  render(){
    // console.log("CURRENT HOUSEHOLD",this.props)
    return(
      <>
        <Segment raised >
          <Header as="h1">{this.props.state.currentHousehold.name}</Header>

          {this.state.addingSpace ? this.renderAddSpaceForm() : <Header onClick={this.setAddingSpace}style={{color:"blue"}} as='a'>Add Space</Header>}
            <Segment>
              <SpacesContainer history={this.props.history}  household={this.props.state.currentHousehold}/>
            </Segment>
        </Segment>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setUser: (user) => dispatch({type:"SET_USER", user}),
    setCurrentHousehold: (household) => dispatch({type:"SET_CURRENT_HOUSEHOLD", household}),
    addSpace: (space) => dispatch({type:"ADD_SPACE", space})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(HouseholdContainer)