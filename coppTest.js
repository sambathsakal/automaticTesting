const axios = require('axios');
const assert = require('assert');

axios.post('http://localhost:3000/api/tasks', {
    title: 'New Task'
  })
  .then(response => {
    console.log('Test Case - Create Task API');
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

    // Add assertions for the response data
    assert.equal(response.status, 201, 'Unexpected status code');
    assert.equal(response.data.title, 'New Task', 'Unexpected title');
    // Add more assertions as needed

    console.log('Assertions passed!');
  })
  .catch(error => {
    console.error('Test Case - Create Task API');
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    // Handle or assert the error if needed
  });