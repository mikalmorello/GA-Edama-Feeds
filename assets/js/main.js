console.log('ready');

// VARIABLES
const xhr = new XMLHttpRequest(),
      baseUrl = 'https://api.edamam.com/search?q=',
      appId ='&app_id=d22ae923',
      appKey ='&app_key=732c0c142c23ebefb242a35d1ff382c3',
      header = document.getElementById('header'),
      searchInput = document.getElementById('searchInput'),
      searchButton = document.getElementById('searchButton'),
      loadMoreButton = document.getElementById('loadMoreButton'),
      resultContainer = document.getElementById('edamam'),
      resultCountContainer = document.getElementById('edamam-results');
      
let searchResultRange = 9;
    searchResultMin = 0,
    searchResultMax = searchResultMin + searchResultRange,
    searchInputValue = '';

// FUNCTIONS

// API Call
function callThatAPI(searchParams) {
  console.log('Call Search Result Min' + searchResultMin);
  console.log('Call Search Result Max' + searchResultMax);
  xhr.open('GET', `${baseUrl}${searchParams}${appId}${appKey}&from=${searchResultMin}&to=${searchResultMax}`);
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
   console.log('is this working');
   resultContainer.innerHTML += `<article class="edamam__card"><img src="${hits[i].recipe.image}">${hits[i].recipe.label}</article>` 
  }
  loadMoreButton.classList.add('load-more--show');
  header.classList.remove('header--full-screen');
  resultCount();
}

// API Error
function handleError() {
  console.log('oops');
}

// Inifnite Load count

function infiniteLoad(currentResults) {
  searchResultMin = currentResults + 1;
  searchResultMax = searchResultMin + searchResultRange;
}

// Inifnite Load count

function resultCount() {
  console.log('Result count is ' + searchResultMax);
  resultCountContainer.innerHTML += `Result count is ${searchResultMax}`;          
}

// Layout testing
/*function autoRun(searchValue) {
  callThatAPI(searchValue);
}*/


//autoRun('carrots');

// EVENT LISTENER

// Search Button Click
searchButton.addEventListener('click', function() {
  event.preventDefault();
  callThatAPI(searchInput.value);
  searchInputValue = searchInput.value;
  return searchInputValue;
});

// Load More Button Click
loadMoreButton.addEventListener('click', function() {
  event.preventDefault();
  infiniteLoad(searchResultMax);
  console.log(searchInputValue);
  callThatAPI(searchInputValue);
});
