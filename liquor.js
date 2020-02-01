// displays recipe to the DOM from JSON
function displayRecipe(responseJson) {
  clear();
  $('#search-container').show();
  $('#search-container').prepend(`
  <div class="img-div">
  <img class="recipe-img" src="${responseJson.drinks[0].strDrinkThumb}" 
  alt="${responseJson.drinks[0].strDrink}" /></div>
  <div class="recipe-title"><p>${responseJson.drinks[0].strDrink}</p></div>`);

  displayIngredients(responseJson);
  displayMeasurements(responseJson);
  displayDirections(responseJson);
}

// displays instructions on how to make drink
function displayDirections(responseJson) {
  $('#directions').append(`${responseJson.drinks[0].strInstructions}`);
}

// displays measurements for recipe
function displayMeasurements(responseJson) {
  let a = 1;
  let measurement = 'strMeasure' + a;
  let response = responseJson.drinks[0][measurement];

  while (response != null) {
    console.log(response);
    $('#main-measurements').append(`<li>${response}</li>`);
    measurement = 'strMeasure' + a;
    response = responseJson.drinks[0][measurement];
    a++;
  }
}

// displays ingredient list for recipe
function displayIngredients(responseJson) {
  let a = 1;
  let ingredient = 'strIngredient' + a;
  let response = responseJson.drinks[0][ingredient];

  while (response != null) {
    $('#main-ingredients').append(`<li>${response}</li>`);
    console.log(response);
    ingredient = 'strIngredient' + a;
    response = responseJson.drinks[0][ingredient];
    a++;
  }
}

// finds the drinkID number stored in attributes
function findClass() {
  $(document).on('click', '.drink-item', function() {
    let current = $(this).data('drink-id');
    console.log('current >> ' + current);
    let url = fetchUrl(current);
    fetchRecipe(url);
  });
}

// compiles the endpoint for calling the API by drink ID
function fetchUrl(id) {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id;
  console.log('url ' + url);
  return url;
}

// calls API to search recipe by drink ID
function fetchRecipe(url) {
  console.log('fetch recipe ' + url);
  fetch(url)
    .then(response => response.json())
    .then(responseJson => displayRecipe(responseJson));
}

// compiles endpoint and calls API to search for list filtered by alcohol
function pullList(liquor) {
  const url =
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + liquor;

  console.log(url);

  fetch(url)
    .then(response => response.json())
    .then(responseJson => displayLiquorList(responseJson));
}

// watching for which liquor category to be clicked
function watchLiquor() {
  $(document).on('click', '.liquor-choice', function() {
    let current = $(this).data('liquor');
    console.log('current >> ' + current);
    pullList(current);
  });
}

$(watchLiquor);
