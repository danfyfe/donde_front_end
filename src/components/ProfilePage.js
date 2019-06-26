import React, { Component, } from 'react'
import { Segment, Form, Message, Button } from 'semantic-ui-react'
class ProfilePage extends Component {
  state = {
    addingHousehold: false
  }
  // componentDidMount(){
  //   fetch('http://localhost:3000/api/v1/profile',{
  //     headers: { Authorization: 'Bearer localStorage.getItem("token")' }
  //   })
  //   .then(resp => resp.json())
  //   .then(data=>{
  //     console.log(data)
  //   })
  // }

  

  renderHouseholdForm = () => {
    return <>
      <Segment style={{width:"75%", margin:"0 auto"}}>
        <Message header="Create a Household!"/>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input placeholder='Household Name'/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" placeholder='Household Password'/>
          </Form.Field>
          <Button>Submit</Button>
          <Button>Cancel</Button>
        </Form>
      </Segment>
    </>
  }

  render(){
    if (!localStorage.token || localStorage.token === "undefined") {
    this.props.history.push("/")
    }
    return(

      <Segment style={{width:"90%", margin:"0 auto"}}>
      {this.renderHouseholdForm()}

        Hi from profile page

      </Segment>
    )
  }





}

export default ProfilePage