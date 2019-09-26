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

export function editHousehold( householdId, householdName, householdColor, householdImage){
  return dispatch => {
    axios({
      method:"PATCH",
      url: `${apiEndpoint}/households/${householdId}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization:  localStorage.getItem("token")
      },
      data: {
        household:{
          id: householdId,
          name: householdName,
          color: householdColor,
          image: householdImage
        }
      }
    })
    .then( resp =>{
      // console.log('edit household func',resp.data)
      return dispatch({type:"EDIT_HOUSEHOLD", payload: resp.data})
    })
  }
}

export function joinHousehold(userId, householdId, householdPass){
  return dispatch => {
    axios({
      method:"POST",
      url: `${apiEndpoint}/households/${userId}/${householdId}`,
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      data: {
        join:{
          user_id: userId,
          household_id: householdId,
          password: householdPass
        }
      }
    })
    .then( resp =>{
      return dispatch({type:'JOIN_HOUSEHOLD', payload: resp.data})
    })
  }
}

export function leaveHousehold(userId, householdId, householdPass){
  return dispatch => {
    axios({
      method:"DELETE",
      url: `${apiEndpoint}/households/${userId}/${householdId}`,
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      data: {
        leave: {
          user_id: userId,
          household_id: householdId,
          password: householdPass
        }
      }
    })
    .then( resp =>{
      return dispatch({type:'LEAVE_HOUSEHOLD', payload: resp.data})
    })
  }
}