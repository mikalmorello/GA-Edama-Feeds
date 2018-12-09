console.log('ready');

// VARIABLES
const xhr = new XMLHttpRequest(),
      baseUrl = 'https://api.edamam.com/search?q=',
      appId ='&app_id=d22ae923',
      appKey ='&app_key=732c0c142c23ebefb242a35d1ff382c3',
      searchInput = document.getElementById('searchInput'),
      searchButton = document.getElementById('searchButton'),
      resultContainer = document.getElementById('edamam');
      
let searchBase = 0,
    searchRange = 9;

// FUNCTIONS

// API Call
function callThatAPI(searchParams) {
  xhr.open('GET', `${baseUrl}${searchParams}${appId}${appKey}&from=${searchBase}&to=${searchRange}`);
  xhr.send();
  xhr.onload = handleSuccess;
  xhr.onerror = handleError;
}

// API Success
function handleSuccess() {
  var response = JSON.parse(xhr.responseText);
  console.log(response);
  var hits = response.hits;
  for(let i = 0; i < hits.length; i++) {
   resultContainer.innerHTML += `<article class="edamam__card"><img src="${hits[i].recipe.image}">${hits[i].recipe.label}</article>` 
  }
}

// API Error
function handleError() {
  console.log('oops');
}

// Layout testing
function autoRun(searchValue) {
  callThatAPI(searchValue);
}

autoRun('carrots');

// EVENT LISTENER

// Button Click
searchButton.addEventListener('click', function() {
  event.preventDefault();
  callThatAPI(searchInput.value);
});


