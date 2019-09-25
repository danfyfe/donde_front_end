import apiEndpoint from './ApiEndpoint.js';

const axios = require('axios');

export function getCurrentHousehold(householdId){
  return dispatch => {
    axios({
      method: "GET",
      url: `${apiEndpoint}/households/${householdId}`,
      headers: { Authorization:  localStorage.getItem("token") }
    })
    .then( resp =>{
      // console.log('inside get current hh', resp)
        return dispatch({type:'SET_CURRENT_HOUSEHOLD', payload: resp.data})

    })
  }
}