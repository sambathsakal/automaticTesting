class ValidationUtils {

  static isValidString(value) {
    return typeof value === 'string' && value.trim().length > 0;
  }

  static isValidNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }
  
  static isValidRequestData(requestData, fields) {
    return Object.entries(fields).every(([field, validationFn]) => validationFn(requestData[field]));
  }

  static isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
}

module.exports = ValidationUtils;