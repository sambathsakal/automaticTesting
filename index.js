const axios = require('axios');

const uri = "https://13761a59-9fe3-4b15-b383-ee30a91b3272-00-2zrrvx6x8cdo1.kirk.replit.dev";

const request = {
  name: 'johndoe',
  email: 'johndoe@example.com',
  message: 'hello world'
};

// should write only possitive case
axios.post(`${uri}/api/tasks`, request)
  .then(response => {
    console.log('Test Case 1 - POST /api/tasks');
    console.log('Status:', response.status);
    console.log('Response:', response.data);
  }).catch(error => {
    console.error('Test Case 2 failed:', error.message);
  });

