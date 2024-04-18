const ValidationUtils = require('./validationUtils');
const assert          = require('assert');

class AssertUtils {

  static isStatusSuccess(status){
    assert.equal(status, 200, `Unexpected status code ${status}`);
    return this;
  }

  static isStatusNotFound(status){
    assert.equal(status, 404, `Task is not found`);
    return this;
  }

  static isStatusBadRequest(status){
    assert.equal(status, 400, `Unexpected status code`);
    return this;
  }

  static isArray(data) {
    assert.ok(Array.isArray(data), 'Data is not array');
    return this;
  }

  static hasLength(data) {
    assert.ok(data.length > 0, 'Data is empty');
    return this;
  }

  static setFieldSchema(schema) {
    this.schema = schema;
    return this;
  }
  
  static isValidSchema(data){
    if( Array.isArray(data) ){
      data.forEach((data) => {
          this._isValidSchema(data, this.schema);
      });
      
    } else {
        this._isValidSchema(data, this.schema);
    }

    return this;
  }

   static _isValidSchema(data){
    const validation = ValidationUtils.isValidRequestData(data, this.schema);

    console.log(data);
     
    assert.ok(
      validation.valid, 
      `Invalid json ${validation.message}`
    );
  }
}

module.exports = AssertUtils;