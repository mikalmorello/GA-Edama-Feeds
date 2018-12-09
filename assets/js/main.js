console.log('ready');

// VARIABLES
const xhr = new XMLHttpRequest(),
      baseUrl = 'https://api.edamam.com/search?q=',
      appId ='&app_id=d22ae923',
      appKey ='&app_key=732c0c142c23ebefb242a35d1ff382c3',
      searchInput = document.getElementById('searchInput'),
      searchButton = document.getElementById('searchButton');
      

// FUNCTIONS

// API Call
function callThatAPI(searchParams) {
  xhr.open('GET', `${baseUrl}${searchParams}${appId}${appKey}&from=0&to=3`);
  xhr.send();
  xhr.onload = handleSuccess;
  xhr.onerror = handleError;
}

// API Success
function handleSuccess() {
  var response = JSON.parse(xhr.responseText);
  console.log(response);
  var hits = response.hits;
  const picsDiv = document.getElementById('pics');
  for(let i = 0; i < hits.length; i++) {
    picsDiv.innerHTML += `<p>${hits[i].recipe.label}</p><img src="${hits[i].recipe.image}">`
  }
}

// API Error
function handleError() {
  console.log('oops');
}


// EVENT LISTENER

// Button Click
searchButton.addEventListener('click', function() {
  event.preventDefault();
  callThatAPI(searchInput.value);
});
