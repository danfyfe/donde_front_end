import React from 'react'
import { Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import SpaceCard from '../components/SpaceCard.js'
import SpaceDisplay from '../components/SpaceDisplay.js'


function SpacesConatiner(props) {

  const { household, space } = props

  const renderSpaceCards = () => {
    if (household.spaces) {
      let spacesByDate = household.spaces.sort((a, b) => {
        return a.created_at.localeCompare(b.created_at)
      })

      if (household.spaces.length === 0) {
        return <Message warning style={{margin:"4% 0 0 0", textAlign:"center"}}>There are currently no spaces in this household. A space is a location that you put your stuff, like a closet or storage area. Click Add Space in the dropdown to add one!</Message>
      } else {
        return spacesByDate.map(space => {
          return <SpaceCard key={space.id} space={space}/>
        })
      }
    }
  }

  const renderSpace = () => {
    return <SpaceDisplay history={props.history} space={space}/>
  }

    return(
      <>
      {space && space.hasOwnProperty('id') ?  <> {renderSpace()} </>:
        <>
          <div style={{margin:"2% auto"}}>
            <span className='font-weight-bold med-font text-muted'>Spaces:</span>
            {renderSpaceCards()}
          </div>
        </>
      }
      </>
    )

}


const mapStateToProps = (state) => {
  return {
    household: state.household,
    space: state.space
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


export default connect(mapStateToProps,mapDispatchToProps)(SpacesConatiner)