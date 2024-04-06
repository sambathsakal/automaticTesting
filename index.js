const axios           = require('axios');
const ValidationUtils = require('./validationUtils');
// const ObjectUtils     = require('./objectUtils');
const assert          = require('assert');

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

const requiredFieldsSchema = { 
  id: ValidationUtils.isValidNumber,
  title: ValidationUtils.isNonEmptyString
};

axios.get(`${uri}/api/tasks`)
  .then(response => {
    assert.equal(response.status, 200, `Task 1: Unexpected status code ${response.status}`);
    assert.equal(Array.isArray(response.data), true, 'Task 1.1: data is not array');
    assert.equal(response.data.length > 0, true, 'Task 1.2: data is empty');

    response.data.forEach((data) => {
      const validation = ValidationUtils.isValidRequestData(data, requiredFieldsSchema);
      
      assert.equal(
        validation.valid, 
        true, 
        `Task 1.3: invalid json ${validation.message}`
      );
    });
  }).catch(error => console.log(error.message));

return;
axios.post(`${uri}/api/tasks`, {})
.then(response => {
  console.log('Test Case 2 failed:', response.status, response.data );
})
.catch(error => {
  console.log('Test Case 2 - create (Missing Title) /api/tasks status:', error.response.status );
});

axios.post(`${uri}/api/tasks`, { title: 12345 })
.then(response => {
  console.log('Test Case 2.1 failed:', response.status );
})
.catch(error => {
  console.log('Test Case 2.1 - create (Invalid data type) /api/tasks status:', error.response.status);
});

axios.post(`${uri}/api/tasks`, {
    title: `Task ${Math.floor(Math.random() * 1000)}`
  })
  .then(response => {
    console.log('Test Case 2.9 - create(Valid Data) /api/tasks status:', response.status );
  })
  .catch(error => {
    console.log('Test Case 2.9 failed:', error.response.status);
  });


// TODO: add test case for more api