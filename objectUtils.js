class ObjectUtils {
  static limitedFields (obj, limit) {
    const keys       = Object.keys(obj).slice(0, limit);
    const limitedObj = {};
    
    keys.forEach(key => {
      limitedObj[key] = obj[key];
    });
    
    return limitedObj;
  }

  
}

module.exports = ObjectUtils;