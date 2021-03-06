import apiEndpoint from './ApiEndpoint.js';

const axios = require('axios');

export function addSpace(householdId, spaceName){
  return dispatch => {
    axios({
      method:"POST",
      url: `${apiEndpoint}/spaces`,
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      data: {
        space:{
          name: spaceName,
          household_id: householdId
        }
      }
    })
    .then( resp =>{
      return dispatch({type:'ADD_SPACE', payload: resp.data})
    })
  }
}

export function editSpace(spaceId, householdId, spaceName){
  return dispatch => {
    axios({
      method:"PATCH",
      url:`${apiEndpoint}/spaces/${spaceId}`,
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      data:{
        space:{
          id: spaceId,
          name: spaceName,
          household_id: householdId
        }
      }
    })
    .then( resp =>{

      return dispatch({type:'EDIT_SPACE', payload: resp.data})
    })
  }
}

export function deleteSpace(spaceId, householdId, householdPass){
  return dispatch => {
    axios({
      method:"DELETE",
      url: `${apiEndpoint}/spaces/${spaceId}`,
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      data:{
        space:{
          id: spaceId
        },
        household_id: householdId,
        household_password: householdPass
      }
    })
    .then( resp =>{
      return dispatch({type:'SET_CURRENT_HOUSEHOLD', payload: resp.data})
    })
  }
}