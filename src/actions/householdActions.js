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
        return dispatch({type:'SET_CURRENT_HOUSEHOLD', payload: resp.data})
    })
  }
}

export function createHousehold( householdName, householdPass, householdColor, householdImage, userId ){
  return dispatch => {
    axios({
      method:"POST",
      url: `${apiEndpoint}/households`,
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      data: {
        household:{
          name: householdName,
          password: householdPass,
          color: householdColor,
          image: householdImage
        },
        user_id: userId
      }
    })
    .then( resp => {
      return dispatch({type:"ADD_HOUSEHOLD", payload: resp.data})
    })
  }
}