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