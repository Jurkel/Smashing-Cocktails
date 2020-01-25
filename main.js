function displayPopList(responseJson) {
  console.log(responseJson);

  for (let i = 0; i < responseJson.drinks.length; i++) {
    $('.list-group').append(
      `<div class="carousel-cell">
      <p>${responseJson.drinks[i].strDrink}</p>
      </div>`
    );
  }
}

function loadPopList() {
  const url =
    'https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php';

  fetch(url)
    .then(response => response.json())
    .then(responseJson => displayPopList(responseJson));
}

function clear() {
  $('#search-results').empty();
  $('.pop-container').hide();
  $('.banner-text').hide();
  $('.grid-wrapper').hide();
}

function displayList(responseJson) {
  console.log(responseJson);
  clear();

  let a = 1;

  for (let i = 0; i < responseJson.drinks.length; i++) {
    $('#search-container').append(
      `<img class="display-img" src="${responseJson.drinks[i].strDrinkThumb}" alt="${responseJson.drinks[i].strDrink}" />
      <h3>${responseJson.drinks[i].strDrink}</h3>
      <ul class="ing-list">Main ingredients</ul>`
    );

    let ingredient = 'strIngredient' + a;
    let response = responseJson.drinks[i][ingredient];

    while (response != null) {
      ingredient = 'strIngredient' + a;
      response = responseJson.drinks[i][ingredient];
      $('.ing-list').append(`<li>${response}</li>`);

      console.log(response);
      a++;
    }
  }
}

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
    .then(responseJson => displayList(responseJson))
    .catch(error => {
      $('.error-message').text(`Not a recipe we recognize, try again.`);
    });
}

function watchSearch() {
  $('.search-results').empty();
  $('.search-btn').click(event => {
    event.preventDefault();

    const searchTerm = $('.search-txt').val();
    console.log('search term ' + searchTerm);

    searchRecipe(searchTerm);
  });
}

$(watchSearch);
$(loadPopList);
