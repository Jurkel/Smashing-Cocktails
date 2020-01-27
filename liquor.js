function displayRecipe(responseJson) {
  clear();
  $('#search-container').append(`
  <div class="recipe-container">
  <img class="recipe-img" src="${responseJson.drinks[0].strDrinkThumb}" 
  alt="${responseJson.drinks[0].strDrink}" />
  <p>${responseJson.drinks[0].strDrink}</p>`);

  displayIngredients(responseJson);
  displayMeasurements(responseJson);
}

function displayMeasurements(responseJson) {
  let a = 1;
  let measurement = 'strMeasure' + a;
  let response = responseJson.drinks[0][measurement];

  while (response != null) {
    $('#main-measurements').append(`<li>${response}</li>`);
    console.log(response);
    measurement = 'strMeasure' + a;
    response = responseJson.drinks[0][measurement];
    a++;
  }
}

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

function findClass() {
  $(document).on('click', '.drink-item', function() {
    let current = $(this).data('drink-id');
    console.log('current >> ' + current);
    let url = fetchUrl(current);
    fetchRecipe(url);
  });
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

function watchRum() {
  const liquor = 'Rum';
  $('.item-two').click(event => {
    pullList(liquor);
  });
}
function watchTequila() {
  const liquor = 'Tequila';
  $('.item-three').click(event => {
    pullList(liquor);
  });
}
function watchVodka() {
  const liquor = 'Vodka';
  $('.item-four').click(event => {
    pullList(liquor);
  });
}
function watchBourbon() {
  const liquor = 'Bourbon';
  $('.item-five').click(event => {
    pullList(liquor);
  });
}
function watchBrandy() {
  const liquor = 'Brandy';
  $('.item-six').click(event => {
    pullList(liquor);
  });
}

function watchLiquor() {
  $(watchGin);
  $(watchRum);
  $(watchTequila);
  $(watchVodka);
  $(watchBourbon);
  $(watchBrandy);
}

$(watchLiquor);
