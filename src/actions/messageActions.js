import apiEndpoint from './ApiEndpoint.js';

const axios = require('axios');

export function addMessage(messageTitle, messageContent, householdId, userId, type){
  return dispatch => {
    axios({
      method:"POST",
      url: `${apiEndpoint}/messages`,
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      data: {
        message:{
          title: messageTitle,
          content: messageContent,
          household_id: householdId,
          user_id: userId
        }
      }
    })
    .then( resp =>{
      console.log('message action',resp.data)
      if (type === 'user') {
        return dispatch({type:'ADD_USER_MESSAGE', payload: resp.data})
      } else if (type === 'household') {

      }


    })
  }
}