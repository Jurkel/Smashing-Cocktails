function reloadDom() {
  $('#return-btn').click(event => {
    location.reload();
  });
}

// gives the search enter button functionality
function enterButton() {
  var input = document.getElementById('search-feature');

  input.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById('search-btn').click();
    }
  });
}

// displays list of popular cocktails
function displayPopList(responseJson) {
  console.log(responseJson);
  $('#search-container').hide();

  for (let i = 0; i < responseJson.drinks.length; i++) {
    $('.list-group').append(
      `<div class="pop-list-container">
      <li><a href="#" class="pop-item" data-drink-id="${responseJson.drinks[i].idDrink}">
      <img src="${responseJson.drinks[i].strDrinkThumb}" 
      alt="${responseJson.drinks[i].strDrink}" 
      class="pop-list-img" />
      <div class="p-container">
      <p>${responseJson.drinks[i].strDrink}</p></div></a></li>
      </div>`
    );
  }
  findPopClass();
}

// pulls drinkID from targeted drink from popular list
function findPopClass() {
  $(document).on('click', '.pop-item', function() {
    let current = $(this).data('drink-id');
    console.log('current >> ' + current);
    let url = fetchUrl(current);
    fetchRecipe(url);
  });
}

// calls API for popular list of cocktails
function loadPopList() {
  const url =
    'https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php';

  fetch(url)
    .then(response => response.json())
    .then(responseJson => displayPopList(responseJson));
}

// clears DOM of search results
function clear() {
  $('#search-results').empty();
  $('.pop-container').hide();
  $('.banner-text').hide();
  $('.grid-wrapper').hide();
  $('#liquor-list').empty();
  $('#main-ingredients').empty();
  $('#main-measurements').empty();
  $('.recipe-title').empty();
  $('#directions').empty();
  $('.img-div').empty();
}

// displays list filtered by alcohol
function displayLiquorList(responseJson) {
  console.log(responseJson);
  clear();
  $('#search-container').hide();
  $('.error-message').empty();

  for (let i = 0; i < responseJson.drinks.length; i++) {
    let id = responseJson.drinks[i].idDrink;

    $('#liquor-list').append(
      `<a href="#" class="drink-item" data-drink-id="${id}">
      <li class="liquor-li">
      <img src="${responseJson.drinks[i].strDrinkThumb}" 
      alt="${responseJson.drinks[i].strDrink}" 
      class="recipe-list-img" />
      <h3>${responseJson.drinks[i].strDrink}</h3></li></a>`
    );
  }
  findClass();
}

// calls API to search for recipe by cocktail name
function searchRecipe(cocktail) {
  const url =
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + cocktail;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log('error');
        alert(responseJson.message);
      }
    })
    .then(responseJson => displayLiquorList(responseJson, cocktail))
    .catch(error => {
      $('.error-message').text(`Not a recipe we recognize, try again.`);
    });
}

// waiting for search event
function watchSearch() {
  $('.search-results').empty();
  $('.search-btn').click(event => {
    event.preventDefault();

    const searchTerm = $('.search-txt').val();
    console.log('search term ' + searchTerm);
    if (searchTerm === '') {
      console.log('error');
      // $('.error-message').text('Not a cocktail we recognize, try again.');
    } else {
      searchRecipe(searchTerm);
    }
  });
}

$(watchSearch);
$(loadPopList);
$(enterButton);
$(reloadDom);
