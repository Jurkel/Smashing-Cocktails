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

function displayList(responseJson) {
  console.log(responseJson);
  // $('#search-results').empty();
  // $('.pop-container').hide();
  // $('.banner-text').hide();
  // $('.grid-wrapper').hide();

  for (let i = 0; i < responseJson.drinks.length; i++) {
    console.log('drinks[i] ' + responseJson.drinks[i]);
    console.log('strDrinkThumb' + responseJson.drinks[i].strDrinkThumb);
    console.log('strDrink' + responseJson.drinks[i].strDrink);
    $('#search-container').append(
      `<img src="${responseJson.drinks[i].strDrinkThumb}" alt="${responseJson.drinks[i].strDrink}/>
      <h3>${responseJson.drinks[i].strDrink}</h3>`
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

function displayLiquorList(responseJson) {
  console.log(responseJson);

  for (let i = 0; i < responseJson.drinks.length; i++) {
    $('#recipe-list').append(
      `<li><img src="${responseJson.drinks[i].strDrinkThumb}" alt="${responseJson.drinks[i].strDrink}" class="recipe-list-img">
      <h3>${responseJson.drinks[i].strDrink}</h3></li>`
    );
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

function pullList(liquor) {
  const url =
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + liquor;

  console.log(url);

  fetch(url)
    .then(response => response.json())
    .then(responseJson => displayLiquorList(responseJson));
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

function watchGin() {
  $('.gin').click(event => {
    const liquor = 'Gin';

    pullList(liquor);
  });
}

$(watchSearch);
$(loadPopList);
$(watchGin);
