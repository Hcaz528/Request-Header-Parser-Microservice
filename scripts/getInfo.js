let ipaddress = document.querySelector('#ipaddress');
let language = document.querySelector('#language');
let software = document.querySelector('#software');

fetch('/getIP', {
	method: 'get'
})
  .then(blob => blob.json())
  .then(data => {
    ipaddress.innerHTML = data.ipaddress;
    language.innerHTML = data.language;
    software.innerHTML = data.software;
  })