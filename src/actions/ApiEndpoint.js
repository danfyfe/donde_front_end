function apiEndpoint(){

  if (process.env.NODE_ENV === 'production') {
    return 'https://df-donde-api.herokuapp.com/api/v1'
  } else {
    return 'http://localhost:3000/api/v1'
  }
};

export default apiEndpoint()