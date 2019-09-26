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