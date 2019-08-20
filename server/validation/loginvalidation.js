const Validator = require('validator');
const isempty = require('./is-empty.js');
module.exports = function validateRegisterInput(data) {
  let error = {};
  data.email = !isempty(data.email) ? data.email : '';
  data.password = !isempty(data.pass) ? data.pass : '';

  if (!Validator.isEmail(data.email)) {
    error.email = 'Invalid email';
  }

  if (Validator.isEmpty(data.email)) {
    error.email = 'email is required';
  }
  if (Validator.isEmpty(data.password)) {
    error.password = 'password is required';
  }

  return {
    error,
    isValid: isempty(error)
  };
};
