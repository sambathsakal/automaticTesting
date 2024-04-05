class ValidationUtils {
  
  static isNonEmptyString(value) {
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

  static isValidRequestData(requestData, fields) {
    let failedField = null;
    const result = Object.entries(fields).every(([field, validationFn]) => {
      if (!validationFn(requestData[field])) {
        failedField = field;
        return false;
      }
      return true;
    });

    return {
      valid: result,
      message: result ? 'Validation successful' : `Validation failed for field '${failedField}' with value '${requestData[failedField]}'`
    };
  }
}

module.exports = ValidationUtils;