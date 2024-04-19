const axios           = require('axios');
const ValidationUtils = require('./validationUtils');
const assertUtils     = require('./assertUtils');
const assert          = require('assert');


const URI          = "https://13761a59-9fe3-4b15-b383-ee30a91b3272-00-2zrrvx6x8cdo1.kirk.replit.dev";
const DEFAULT_TASK = 3;
const EMPTY_OBJECT = {}; 

assertUtils
  .setFieldSchema({ 
    id: ValidationUtils.isValidNumber,
    title: ValidationUtils.isNonEmptyString
  });

const testcases = [
  {
    infor: {  name: 'API Listing', code: 'L100', is_positive: true },
    api: { method: 'get', url: `${URI}/api/task/listing` },
    callback: ( response ) => {
      assertUtils
        .isStatusSuccess(response.status)
        .isArray(response.data)
        .hasLength(response.data)
        .isValidSchema(response.data);
    }
  }, {
    infor: { name: 'API Detail', code: 'D100', is_positive: true },
    api: { method: 'get', url: `${URI}/api/task/detail/${DEFAULT_TASK}` },
    callback: ( response ) => {
      assertUtils
        .isStatusSuccess(response.status)
        .isValidSchema(response.data);
    }
  }, {
    infor: { name: 'API Create - Empty body', code: 'C100', is_positive: false },
    api: { method: 'post', url: `${URI}/api/task/create`, data: EMPTY_OBJECT },
    callback: ( response ) => {
      assertUtils
        .isStatusBadRequest(response.status);
    }
  }, {
    infor: { name: 'API Create - Invalid Body', code: 'C110', is_positive: false },
    api: { method: 'post', url: `${URI}/api/task/create`, data: { title: 12345 } },
    callback: ( response ) => {
      assertUtils
        .isStatusBadRequest(response.status);
    }
  }, {
    infor: { name: 'API Create', code: 'C120', is_positive: true },
    api: { method: 'post', url: `${URI}/api/task/create`, data: { title: `Task ${Math.floor(Math.random() * 1000)}` } },
    callback: ( response ) => {
      assertUtils
        .isStatusSuccess(response.status)
    }
  }, {
    infor: { name: 'API Update - Invalid Task', code: 'U100', is_positive: false },
    api: { method: 'post', url: `${URI}/api/task/update/-1` },
    callback: ( response ) => {
      assertUtils
        .isStatusNotFound(response.status);
    }
  }, {
    infor: { name: 'API Update - Invalid Body', code: 'U110', is_positive: false },
    api: { method: 'post', url: `${URI}/api/task/update/${DEFAULT_TASK}`, data: EMPTY_OBJECT },
    callback: ( response ) => {
      assertUtils
        .isStatusBadRequest(response.status);
    }
  }, {
    infor: { name: 'API Update', code: 'U120', is_positive: true },
    api: { method: 'post', url: `${URI}/api/task/update/${DEFAULT_TASK}`, data: { title: 'Task updated!' } },
    callback: ( response ) => {
      assertUtils
        .isStatusSuccess(response.status);
    }
  }, {
    infor: { name: 'API Remove - Invalid Task', code: 'R100', is_positive: false },
    api: { method: 'get', url: `${URI}/api/task/delete/-1` },
    callback: ( response ) => {
      assertUtils
        .isStatusNotFound(response.status);
    }
  }, {
    infor: { name: 'API Remove', code: 'R110', is_positive: true },
    api: { method: 'get', url: `${URI}/api/task/delete/2`},
    callback: ( response ) => {
      assertUtils
        .isStatusSuccess(response.status);
    }
  }
];

testcases.forEach( (testcase) => {
  console.log( `Testcase: ${testcase.infor.code} - ${testcase.infor.name} ` );

  axios[testcase.api.method](testcase.api.url, testcase.api.data)
  .then(response => {
    if( !testcase.infor.is_positive ){
      throw new Error(response.status);
    }

    if (testcase.callback && typeof testcase.callback === 'function') {
      testcase.callback(response);
    }
  }).catch(error => {
    if( testcase.infor.is_positive ){
      console.log( `${testcase.infor.code} failed: ${error.message}` )
      return;
    }

    if( !error.response ) {
      console.log( `${testcase.infor.code} failed: ${error}` );
      return;
    }

    if (testcase.callback && typeof testcase.callback === 'function') {
      testcase.callback(error.response);
    }
  });
});