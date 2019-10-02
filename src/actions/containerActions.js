import apiEndpoint from './ApiEndpoint.js';

const axios = require('axios');

export function addContainer( containerName, containerDescription, spaceId ){
  return dispatch => {
    axios({
      method:"POST",
      url: `${apiEndpoint}/containers`,
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      data: {
        container:{
          name: containerName,
          description: containerDescription,
          space_id: spaceId
        }
      }
    })
    .then( resp =>{
      return dispatch({type: 'ADD_CONTAINER', payload: resp.data})
    })
  }
}

export function editContainer(containerName, containerDescription, containerId, spaceId){
  return dispatch => {
    axios({
      method:"PATCH",
      url: `${apiEndpoint}/containers/${containerId}`,
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      data: {
        container:{
          name: containerName,
          description: containerDescription,
          space_id: spaceId
        }
      }
    })
    .then( resp =>{
      return dispatch({type: 'EDIT_CONTAINER', payload: resp.data})
    })
  }
}

export function deleteContainer(containerId, householdId, householdPass){
  return dispatch => {
    axios(`${apiEndpoint}/containers/${containerId}`,{
      method:"DELETE",
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      data: {
        container:{
          container_id: containerId,
          household_id: householdId,
          password: householdPass
        }
      }
    })
    .then( resp =>{
      if (resp.data.hasOwnProperty("id")) {
        return dispatch({type:'DELETE_CONTAINER', payload: resp.data})
      } else {
        // need to setup error message reducer
      }
      // this.setState({
      //   deletingHousehold: !this.state.deletingHousehold
      // })
    })
  }
}