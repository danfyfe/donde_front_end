import React, { useState } from 'react'
import { Segment, Form, Button, Dropdown, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { editHousehold } from '../../../actions/householdActions.js'

const EditHouseholdForm = props => {

  const { setEditingHousehold, household } = props

  const [ householdName, setHouseholdName ] = useState(household.name)
  const [ householdColor, setHouseholdColor ] = useState(household.color)
  const [ householdImage, setHouseholdImage ] = useState(household.image)

  const householdColorDefinitions = ['red','orange','yellow','olive','green','teal','blue','violet','purple','pink','brown','grey']

  const householdImageDefinitions = [{url:"https://i.imgur.com/GMOhUbb.png", name:"House 1"}, {url:"https://i.imgur.com/JSJ5Dk7.png", name: "House 2"}, {url:"https://i.imgur.com/rY6q2iR.png", name:"House 3"}, {url:"https://i.imgur.com/nKUQcrC.png", name:"House 4"}, {url:"https://i.imgur.com/0n5AzLS.png", name:"House 5"}, {url:"https://i.imgur.com/0dtFzLj.png",name:"House 6"}, {url:"https://i.imgur.com/CPYkV9E.png", name:"House 7"}]

  const householdColorOptions = householdColorDefinitions.map(color=>{
    return {key:color,text:color,value:color}
  })

  const householdImageOptions = householdImageDefinitions.map(imageObj => {
    return {key: imageObj.url, text: imageObj.name, value: imageObj.url, image:{ size: "mini", src: imageObj.url }}
  })
  return(
    <Segment clearing raised>
      <Message header={"Edit " + household.name} size="mini"/>
      <Form>
        <Form.Field>
        <label>Name</label>
        <input onChange={e => setHouseholdName(e.target.value)} placeholder="New Household Name"
        />
        </Form.Field>
        <Form.Field>
        <label>Color</label>
          <Dropdown name="householdColor" onChange={(e, data) => setHouseholdColor(data.value)} pointing="top left" placeholder="Select Color" fluid selection options={householdColorOptions}/>
        </Form.Field>
        <Form.Field>
        <label>Image</label>
          <Dropdown name="householdImage" onChange={(e, data) => setHouseholdImage(data.value)} pointing="top left" placeholder="Select Image" fluid selection options={householdImageOptions}/>
        </Form.Field>
        <Button floated="right" size="mini" onClick={setEditingHousehold}>Cancel</Button>
        <Button onClick={() => {
          props.editHousehold(household.id, householdName, householdColor, householdImage)
          setEditingHousehold(false)
        }} floated="right" size="mini">Submit</Button>
      </Form>
    </Segment>
  )
}

const mapStateToProps = state => {
  return {
    household: state.household
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editHousehold: (householdName, householdPass, householdColor, householdImage, userId) => dispatch(editHousehold(householdName, householdPass, householdColor, householdImage, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditHouseholdForm)