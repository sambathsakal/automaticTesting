const axios = require('axios');

const inventory_url = "https://13761a59-9fe3-4b15-b383-ee30a91b3272-00-2zrrvx6x8cdo1.kirk.replit.dev";

const request = {
  name: 'johndoe',
  email: 'johndoe@example.com',
  message: 'hello world'
};

axios.post(`${inventory_url}/products`, request)
.then(function (response) {
  // Handle success
  console.log("response", response);
})
.catch(function (response) {
  // Handle error
  console.error("code", response);
});