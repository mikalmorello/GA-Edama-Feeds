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
    searchInputValue = '',
    searchCount = 0,
    isSearchNew = '';

// FUNCTIONS

// API Call
function callThatAPI(searchParams, isSearchNew) {
  xhr.open('GET', `${baseUrl}${searchParams}${appId}${appKey}&from=${searchResultMin}&to=${searchResultMax}`);
  xhr.send();
  xhr.onload = handleSuccess;
  xhr.onerror = handleError;
}

// API Success
function handleSuccess() {
  searchCount = searchCount + 1;
  var response = JSON.parse(xhr.responseText);
  console.log(response);
  loadResults(response);
  resultCount();
  if (searchCount === 1) {
    loadMoreButton.classList.add('load-more--show');
    header.classList.remove('header--full-screen');
    resultCountContainer.classList.add('edamam-results--show');
    console.log('first load');
  } else {
    console.log('subsequent load');
  }
}

// API Error
function handleError() {
  console.log('oops');
  resetResults();
  resultCountContainer.classList.remove('edamam-results--show');
  loadMoreButton.classList.remove('load-more--show');
}

// Inifnite Load count

function infiniteLoad(currentResults) {
  searchResultMin = currentResults + 1;
  searchResultMax = searchResultMin + searchResultRange;
}

// Result Count

function resultCount() {
  resultCountContainer.innerHTML = `Result count is ${searchResultMax}`;          
}

// Load Results

function loadResults(response){
  var hits = response.hits;
  for(let i = 0; i < hits.length; i++) {
   resultContainer.innerHTML += `<article class="edamam__card"><img src="${hits[i].recipe.image}">${hits[i].recipe.label}</article>` 
  }
}

// Reset results

function resetResults() {
  resultContainer.innerHTML = '';
  searchResultMin = 0;
  searchResultMax = searchResultMin + searchResultRange;
}

// Check if new search term

function checkSearchTerm (newSearchInput){
  if(searchInputValue === newSearchInput){
    return isSearchNew = false;
  } else {
    return isSearchNew = true;
  }
}

// Autorun testing if you don't want to render a search
/*function autoRun(searchValue) {
  callThatAPI(searchValue);
}*/

//autoRun('carrots');

// EVENT LISTENER

// Submit message if user hits enter on input
searchInput.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchButton.click();
  }
});


// Search Button Click
searchButton.addEventListener('click', function() {
  event.preventDefault();
  checkSearchTerm(searchInput.value);
  resetResults();
  callThatAPI(searchInput.value, isSearchNew);
  searchInputValue = searchInput.value;
  return searchInputValue;
});

// Load More Button Click
loadMoreButton.addEventListener('click', function() {
  event.preventDefault();
  infiniteLoad(searchResultMax);
  callThatAPI(searchInputValue);
});
