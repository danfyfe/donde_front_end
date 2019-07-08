import React, { Component } from 'react'
import { Card, Segment, Form, Message, Button, Header,Dropdown } from 'semantic-ui-react'
import HouseholdCard from './HouseholdCard.js'
import { connect } from 'react-redux'

class HouseholdCardsContainer extends Component {
  state = {
    addingHousehold: false,
    householdName: "",
    householdPass: "",
    householdColor: "",
    householdImage: ""
  }


  // ADD HOUSEHOLD FUNCTIONS
  setAddingHousehold = () => {
    this.setState({
      addingHousehold: !this.state.addingHousehold
    })
  }

  renderHouseholdForm = () => {
    const householdColorDefinitions = ['red','orange','yellow','olive','green','teal','blue','violet','purple','pink','brown','grey']

    const householdImageDefinitions = [{url:"https://i.imgur.com/GMOhUbb.png", name:"House 1"}, {url:"https://i.imgur.com/JSJ5Dk7.png", name: "House 2"}, {url:"https://i.imgur.com/rY6q2iR.png", name:"House 3"}, {url:"https://i.imgur.com/nKUQcrC.png", name:"House 4"}, {url:"https://i.imgur.com/0n5AzLS.png", name:"House 5"}, {url:"https://i.imgur.com/0dtFzLj.png",name:"House 6"}, {url:"https://i.imgur.com/CPYkV9E.png", name:"House 7"}]

    const householdColorOptions = householdColorDefinitions.map(color=>{
      return {key:color,text:color,value:color}
    })

    const householdImageOptions = householdImageDefinitions.map(imageObj => {
      return {key: imageObj.url, text: imageObj.name, value: imageObj.url, image:{ size: "mini", src: imageObj.url }}
    })


    return <>
      <Segment clearing raised>
        <Message header="Add a Household!"/>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input onChange={this.handleHouseholdInput} name="householdName" placeholder='Household Name'/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input onChange={this.handleHouseholdInput} name="householdPass" type="password" placeholder='Household Password'/>
          </Form.Field>
          <Form.Field>
          <label>Color</label>
            <Dropdown name="householdColor" onChange={this.handleHouseholdColorInput} pointing="top left" placeholder="Select Color" fluid selection options={householdColorOptions}/>
          </Form.Field>
          <Form.Field>
          <label>Image</label>
            <Dropdown name="householdImage" onChange={this.handleHouseholdImageInput} pointing="top left" placeholder="Select Image" fluid selection options={householdImageOptions}/>
          </Form.Field>
          <Button size="mini" floated="right" onClick={this.setAddingHousehold}>Cancel</Button>
          <Button size="mini" floated="right" onClick={this.createHousehold}>Submit</Button>
        </Form>
      </Segment>
    </>
  }

  renderAddHouseholdHeader = () => {
    return <Button onClick={this.setAddingHousehold} color="blue" floated="right" size="mini">Add Household</Button>
  }

  handleHouseholdInput = (e) => {
    // console.log("TARGET",e.target.innerText)

    // FIX THIS!!! find value for dropdown
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  handleHouseholdColorInput = (e, data) => {
    // console.log("TARGET",e.target.innerText)
    // FIX THIS!!! find value for dropdown
    console.log(data)
    this.setState({
      householdColor: data.value
    })
  }

  handleHouseholdImageInput = (e, data) => {
    // console.log("TARGET",e.target.innerText)
    // FIX THIS!!! find value for dropdown
    this.setState({
      householdImage: data.value
    })
  }

  createHousehold = () => {
    fetch('http://localhost:3000/api/v1/households',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        household:{
          name: this.state.householdName,
          password: this.state.householdPass,
          color: this.state.householdColor,
          image: this.state.householdImage
        },
        user_id: this.props.state.user.id
      })
    }).then(resp=>resp.json())
    .then(household=>{
      this.props.addHousehold(household)
      this.setState({
        addingHousehold: !this.state.addingHousehold
      })
    })
  }
// end of add household functions


  renderHouseholdCards = () => {
      // console.log("PROPS STATE HH IN RHHC", this.props.state.user.households)
    if (this.props.state.isDoneFetching) {
      if (this.props.state.user.households.length === 0) {
        return <Message size="small" compact style={{margin:"0 auto"}}>You do not currently belong to any households. You can create a household by clicking 'Add Household', or use the Search Icon above to search for a household to join</Message>
      }else {
        return this.props.state.user.households.map(household=>{
          return <HouseholdCard key={household.id} household={household}
          redirectToHousehold={this.redirectToHousehold}/>
        })
      }
    }
  }

  redirectToHousehold = (household) => {
    this.props.history.push(`/households/${household.id}`)
    // this.props.setCurrentHousehold()
  }

  render(){

    return(
      <>
      <Segment clearing>
            <Header floated='left'>Households</Header>
            { this.state.addingHousehold ?
              this.renderHouseholdForm() : this.renderAddHouseholdHeader()
            }
      </Segment>


          <Card.Group>
            {this.renderHouseholdCards()}
          </Card.Group>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { state }
}


const mapDispatchToProps = (dispatch) => {
    return {
      setUser: (user) => dispatch({type:"SET_USER", user}),
      setHouseholds: (households) => dispatch({type:"SET_HOUSEHOLDS",households}),
      addHousehold: (household) => dispatch({type:"ADD_HOUSEHOLD", household}),
      setCurrentHousehold: (household) => dispatch({type:"SET_CURRENT_HOUSEHOLD", household})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HouseholdCardsContainer)