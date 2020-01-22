function displayPopList(responseJson) {
  console.log(responseJson);

  for (let i = 0; i < responseJson.drinks.length; i++) {
    $('.list-group').append(
      `<a href="#" class="list-group-item">${responseJson.drinks[i].strDrink}</a>`
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

function displayList(responseJson) {
  console.log(responseJson);
  $('#search-results').empty();
  $('.pop-container').hide();
  $('.banner-text').hide();
  $('.grid-wrapper').hide();

  for (let i = 0; i < responseJson.drinks.length; i++) {
    $('#search-results').append(
      `<li><img src="${responseJson.drinks[i].strDrinkThumb}" alt="${responseJson.drinks[i].strDrink}>
      <h3>${responseJson.drinks[i].strDrink}</h3></li>`
    );
    // while (responseJson.drinks[i].strIngredient[a] != null) {
    //   $('#list-ingredients').append(
    //     `<h3>Ingredients:</h3>
    //     <li>${responseJson.drinks[i].strIngredient[a]}</li>`
    //   );
    //   a++;
    // }
  }
}

function searchRecipe(cocktail) {
  const url =
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + cocktail;

  fetch(url)
    .then(response => response.json())

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

    searchRecipe(searchTerm);
  });
}

$(watchSearch);
$(loadPopList);
