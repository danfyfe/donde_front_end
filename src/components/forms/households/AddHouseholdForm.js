import React, { useState } from 'react'
import { Segment, Form, Message, Button, Dropdown } from 'semantic-ui-react'

import apiEndpoint from '../../../actions/ApiEndpoint.js'

const AddHouseholdForm = props => {

  const [ householdName, setHouseholdName ] = useState('')
  const [ householdPass, setHouseholdPass ] = useState('')
  const [ householdColor, setHouseholdColor ] = useState('')
  const [ householdImage, setHouseholdImage ] = useState('')

  const { setAddingHousehold, userId, addHousehold } = props

  const createHousehold = () => {
    fetch(`${apiEndpoint}/households`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        household:{
          name: householdName,
          password: householdPass,
          color: householdColor,
          image: householdImage
        },
        user_id: userId
      })
    }).then(resp=>resp.json())
    .then(household=>{
      addHousehold(household)
      setAddingHousehold(false)
    })
  }

  const householdColorDefinitions = ['red','orange','yellow','olive','green','teal','blue','violet','purple','pink','brown','grey']

  const householdImageDefinitions = [{url:"https://i.imgur.com/GMOhUbb.png", name:"House 1"}, {url:"https://i.imgur.com/JSJ5Dk7.png", name: "House 2"}, {url:"https://i.imgur.com/rY6q2iR.png", name:"House 3"}, {url:"https://i.imgur.com/nKUQcrC.png", name:"House 4"}, {url:"https://i.imgur.com/0n5AzLS.png", name:"House 5"}, {url:"https://i.imgur.com/0dtFzLj.png",name:"House 6"}, {url:"https://i.imgur.com/CPYkV9E.png", name:"House 7"}]

  const householdColorOptions = householdColorDefinitions.map(color=>{
    return {key:color,text:color,value:color}
  })

  const householdImageOptions = householdImageDefinitions.map(imageObj => {
    return {key: imageObj.url, text: imageObj.name, value: imageObj.url, image:{ size: "mini", src: imageObj.url }}
  })

  return(
    <>
      <Segment clearing raised style={{width:'100%'}}>
        <Message header="Add a Household!" size="mini"/>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input onChange={e => setHouseholdName(e.target.value)} name="householdName" placeholder='Household Name'/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input onChange={(e) => setHouseholdPass(e.target.value)} name="householdPass" type="password" placeholder='Household Password'/>
          </Form.Field>
          <Form.Field>
          <label>Color</label>
            <Dropdown name="householdColor" onChange={(e, data) => setHouseholdColor(data.value)} pointing="top left" placeholder="Select Color" fluid selection options={householdColorOptions}/>
          </Form.Field>
          <Form.Field>
          <label>Image</label>
            <Dropdown name="householdImage" onChange={(e, data) => setHouseholdImage(data.value)} pointing="top left" placeholder="Select Image" fluid selection options={householdImageOptions}/>
          </Form.Field>
          <Button size="mini" floated="right" onClick={() => setAddingHousehold(false)}>Cancel</Button>
          <Button size="mini" floated="right" onClick={createHousehold}>Submit</Button>
        </Form>
      </Segment>
    </>
  )
}

export default AddHouseholdForm