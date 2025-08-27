const chai = require('chai');
const expect = chai.expect;

chai.use(function (chai, utils) {
  const Assertion = chai.Assertion;

  // Custom assertion for HTTP status codes
  Assertion.addMethod('status', function (code) {
    this.assert(
      this._obj.status === code,
      `expected response status to be #{exp} but got #{act}`,
      `expected response status not to be #{exp}`,
      code,
      this._obj.status
    );
  });

  // Custom assertion for response schema validation
  Assertion.addMethod('matchSchema', function (schema) {
    const response = this._obj;
    const errors = validateSchema(response, schema);
    
    this.assert(
      errors.length === 0,
      `expected response to match schema but got errors: ${JSON.stringify(errors)}`,
      `expected response not to match schema`,
      schema,
      response
    );
  });

  // Custom assertion for response time
  Assertion.addProperty('acceptableResponseTime', function () {
    const response = this._obj;
    const maxResponseTime = 1000; // 1 second
    
    this.assert(
      response.responseTime <= maxResponseTime,
      `expected response time to be under #{exp}ms but got #{act}ms`,
      `expected response time to be over #{exp}ms`,
      maxResponseTime,
      response.responseTime
    );
  });
});

function validateSchema(response, schema) {
  // Implement JSON schema validation logic here
  // You can use libraries like ajv for complete implementation
  const errors = [];
  // Simplified validation logic
  if (schema.required && Array.isArray(schema.required)) {
    schema.required.forEach(field => {
      if (response.body[field] === undefined) {
        errors.push(`Missing required field: ${field}`);
      }
    });
  }
  return errors;
}

module.exports = chai;