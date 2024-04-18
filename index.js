const axios           = require('axios');
const ValidationUtils = require('./validationUtils');
const assertUtils     = require('./assertUtils');
const assert          = require('assert');


const uri = "https://13761a59-9fe3-4b15-b383-ee30a91b3272-00-2zrrvx6x8cdo1.kirk.replit.dev";
const DEFAULT_TASK = 3;
const EMPTY_OBJECT = {};  

// TODO: builder config to seting & short all testcase with message builder

assertUtils
  .setFieldSchema({ 
      id: ValidationUtils.isValidNumber,
      title: ValidationUtils.isNonEmptyString
    });

axios.get(`${uri}/api/task/listing`)
.then(response => {
  assertUtils
    .isStatusSuccess(response.status)
    .isArray(response.data)
    .hasLength(response.data)
    .isValidSchema(response.data);
}).catch(error => console.log(error.message));

axios.get(`${uri}/api/task/detail/${DEFAULT_TASK}`)
.then(response => {
  assertUtils
    .isStatusSuccess(response.status)
    .isValidSchema(response.data);
})
.catch(error => console.log(error.message));

axios.post(`${uri}/api/task/create`, EMPTY_OBJECT)
.then(response => { throw new Error(response.status) } )
.catch(error => {
    if( !error.response ) {
      console.log(`Task 3: Empty body - Unexpected status code  ${error}`);
      return;
    }

    assertUtils
      .isStatusBadRequest(error.response.status);
})
.catch(error => console.log(error.message));

axios.post(`${uri}/api/task/create`, { title: 12345 })
.then(response => { throw new Error(response.status) } )
.catch(error => {

  if( !error.response ) {
    console.log(`Task 3.1: Invalid body - Unexpected status code  ${error}`);
    return;
  }

  assertUtils.isStatusBadRequest(error.response.status);
})
.catch(error => console.log(error.message));

const taskRandomName = `Task ${Math.floor(Math.random() * 1000)}`;
axios.post(`${uri}/api/task/create`, { title: taskRandomName })
.then(response => {
  assertUtils.isStatusSuccess(response.status)
})
.catch(error => console.log(error.message));

axios.post(`${uri}/api/task/update/-1`)
.then(response => { throw new Error(response.status) } )
.catch(error => {
  if( !error.response ) {
    console.log(`Task 4:TaskId -1 is not found ${error}`);
    return;
  }

  assertUtils.isStatusNotFound(error.response.status);
})
.catch(error => console.log(error.message));

axios.post(`${uri}/api/task/update/${DEFAULT_TASK}`, EMPTY_OBJECT)
.then(response => { throw new Error(response.status) } )
.catch(error => {
  if( !error.response ) {
    console.log(`Task 4.1: Invalid body - Unexpected status code ${error}`);
    return;
  }

  assertUtils.isStatusBadRequest(error.response.status);
})
.catch(error => console.log(error.message));

axios.post(`${uri}/api/task/update/${DEFAULT_TASK}`, { title: 'Task updated!' })
.then(response => {
  assertUtils.isStatusSuccess(response.status);
})
.catch(error => console.log(error.message));

axios.get(`${uri}/api/task/delete/-1`)
.then(response => { throw new Error(response.status) } )
.catch(error => {
  if( !error.response ) {
    console.log(`Task 5:TaskId -1 is not found ${error}`);
    return;
  }

  assertUtils.isStatusNotFound(error.response.status);
})
.catch(error => console.log(error.message));

axios.get(`${uri}/api/task/delete/4`)
.then(response => {
  assertUtils.isStatusSuccess(response.status);
})
.catch(error => console.log(error.message));