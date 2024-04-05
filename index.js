const axios           = require('axios');
const ValidationUtils = require('./validationUtils');
const ObjectUtils     = require('./objectUtils');

const uri = "https://13761a59-9fe3-4b15-b383-ee30a91b3272-00-2zrrvx6x8cdo1.kirk.replit.dev";

// const request = {
//   name: 'johndoe',
//   email: 'johndoe@example.com',
//   message: 'hello world'
// };

// should write only possitive case
// axios.post(`${uri}/api/product`, request)
//   .then(response => {
//     console.log('Test Case 1 - POST /api/tasks');
//     console.log('Status:', by response.status);
//     console.log('Response:', response.data);
//   }).catch(error => {
//     console.error('Test Case 2 failed:', error.message);
//   });

axios.get(`${uri}/api/tasks`)
  .then(response => {
    console.log('Test Case 1 - POST /api/tasks status:', response.status );
    
    console.log('Test Case 1.1 - data is array:', Array.isArray(response.data) );
    if( !Array.isArray(response.data) ) return;
    
    console.log('Test Case 1.2 - data is not empty:', response.data.length > 0 );
    if( !response.data.length > 0 ) return;

    const requiredFieldsSchema = { 
      id: ValidationUtils.isValidNumber,
      title: ValidationUtils.isNonEmptyString
    };
    response.data.forEach((data) => {
      const validation = ValidationUtils.isValidRequestData(data, requiredFieldsSchema);
      console.log('Test Case 1.3 - json in data:', ObjectUtils.limitedFields(data,2), validation.valid, validation.valid?'':validation.message);
    });
  }).catch(error => {
    console.log('Test Case 1 failed:', error.message);
  });

// TODO: add test case for more api
