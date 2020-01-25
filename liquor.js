// function displayRecipe(responseJson) {
//   $('#search-container').empty();

//   $('#search-container').append(
//     `<img src="${responseJson.drinks[0].strDrinkThumb}">`
//   );
// }

// function fetchUrl(id) {
//   const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id;
//   return url;
// }

function displayLiquorList(responseJson) {
  const idStore = [];
  console.log(responseJson);

  for (let i = 0; i < responseJson.drinks.length; i++) {
    let id = responseJson.drinks[i].idDrink;

    $('#liquor-list').append(
      `<a href="#" class="${responseJson.drinks[i].idDrink}">
      <li class="liquor-li">
      <img src="${responseJson.drinks[i].strDrinkThumb}" alt="${responseJson.drinks[i].strDrink}" class="recipe-list-img" />
      <h3>${responseJson.drinks[i].strDrink}</h3></li></a>`
    );
    idStore.push(responseJson.drinks[i].idDrink);
    findClass(id);
  }

  console.log(idStore);
}

function findClass(id) {
  console.log(id);
  // let x = 'class' + id;

  // $('#liquor-list').on('click', 'a', event => {
  //   $(x).attr('title', 'active');
  // });
  $('#liquor-list').on('click', 'a', event => {
    $('a').attr('title', 'active');
  });
}

function fetchRecipe(url) {
  console.log(url);
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
    console.log(liquor);
    pullList(liquor);
  });
}

$(watchGin);
