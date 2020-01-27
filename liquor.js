function displayRecipe(responseJson) {
  clear();
  $('#search-container').append(`
  <div class="recipe-container">
  <img class="recipe-img" src="${responseJson.drinks[0].strDrinkThumb}" 
  alt="${responseJson.drinks[0].strDrink}" />
  <p>${responseJson.drinks[0].strDrink}</p>`);

  let a = 1;
  let ingredient = 'strIngredient' + a;
  let response = responseJson.drinks[0][ingredient];

  while (response != null) {
    $('#main-ingredients').append(`<li>${response}</li>`);
    ingredient = 'strIngredient' + a;
    response = responseJson.drinks[0][ingredient];
    console.log(response);
    a++;
  }
}

function fetchUrl(id) {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id;
  console.log('url ' + url);
  return url;
}

function fetchRecipe(url) {
  console.log('fetch recipe ' + url);
  fetch(url)
    .then(response => response.json())
    .then(responseJson => displayRecipe(responseJson));
}

function displayLiquorList(responseJson) {
  const idStore = [];
  console.log(responseJson);

  for (let i = 0; i < responseJson.drinks.length; i++) {
    let id = responseJson.drinks[i].idDrink;
    // let url = fetchUrl(id);

    $('#liquor-list').append(
      `<a href="#" class="drink-item" data-drink-id="${id}">
      <li class="liquor-li">
      <img src="${responseJson.drinks[i].strDrinkThumb}" 
      alt="${responseJson.drinks[i].strDrink}" 
      class="recipe-list-img" />
      <h3>${responseJson.drinks[i].strDrink}</h3></li></a>`
    );
    idStore.push(id);
  }
  console.log(idStore);
  findClass();
}

function findClass() {
  $(document).on('click', '.drink-item', function() {
    let current = $(this).data('drink-id');
    console.log('current two >> ' + current);
    let url = fetchUrl(current);
    fetchRecipe(url);
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

function watchGin() {
  const liquor = 'Gin';
  $('.item-one').click(event => {
    pullList(liquor);
  });
}

function displaySearchRecipe(id) {}

$(watchGin);
