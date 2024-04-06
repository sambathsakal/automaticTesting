const axios           = require('axios');
const ValidationUtils = require('./validationUtils');
// const ObjectUtils     = require('./objectUtils');
const assert          = require('assert');

const uri = "https://13761a59-9fe3-4b15-b383-ee30a91b3272-00-2zrrvx6x8cdo1.kirk.replit.dev";

const requiredFieldsSchema = { 
  id: ValidationUtils.isValidNumber,
  title: ValidationUtils.isNonEmptyString
};

// listing
axios.get(`${uri}/api/tasks`)
  .then(response => {
    assert.equal(response.status, 200, `Task 1: Unexpected status code ${response.status}`);
    assert.ok(Array.isArray(response.data), 'Task 1.1: data is not array');
    assert.ok(response.data.length > 0, 'Task 1.2: data is empty');

    response.data.forEach((data) => {
      const validation = ValidationUtils.isValidRequestData(data, requiredFieldsSchema);
      
      assert.ok(
        validation.valid, 
        `Task 1.3: invalid json ${validation.message}`
      );
    });
  }).catch(error => console.log(error.message));

// TODO: detail

// create
axios.post(`${uri}/api/tasks`, {})
  .catch(error => {
      assert.equal(error.response.status, 400, `Task 2: Empty body - Unexpected status code ${error.response.status}`);
  })
  .catch(error => console.log(error.message));


axios.post(`${uri}/api/tasks`, { title: 12345 })
  .catch(error => {
    assert.equal(error.response.status, 400, `Task 2.1: Invalid body - Unexpected status code ${error.response.status}`);
  })
  .catch(error => console.log(error.message));


const taskRandomName = `Task ${Math.floor(Math.random() * 1000)}`;
axios.post(`${uri}/api/tasks`, {
    title: taskRandomName
  })
  .then(response => {
    assert.equal(response.status, 200, `Task 2.9: fail to create task ${taskRandomName}`);
  })
  .catch(error => console.log(error.message));

return;

// TODO: add test case for more api