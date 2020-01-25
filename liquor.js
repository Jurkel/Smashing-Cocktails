// function displayRecipe(responseJson) {
//   $('#search-container').empty();

//   $('#search-container').append(
//     `<img src="${responseJson.drinks[0].strDrinkThumb}">`
//   );
// }

// function fetchRecipe(id) {
//   const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id;

//   fetch(url)
//     .then(response => response.json())
//     .then(responseJson => displayRecipe(responseJson));
// }

function displayLiquorList(responseJson) {
  console.log(responseJson);

  for (let i = 0; i < responseJson.drinks.length; i++) {
    // const id = responseJson.drinks[i].idDrink;
    // console.log(id);

    $('#liquor-list').append(
      `<a href="#" class="liquor-link" title="${responseJson.drinks[i].idDrink}"><li class="liquor-li"><img src="${responseJson.drinks[i].strDrinkThumb}" alt="${responseJson.drinks[i].strDrink}" class="recipe-list-img" />
    <h3>${responseJson.drinks[i].strDrink}</h3></li></a>`
    );
    console.log();
  }
  findId();
}

function findId() {
  $('.liquor-link').click(event => {
    const id = $('.liquor-link').attr('title');
    console.log(id);
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
    console.log(liquor);
    pullList(liquor);
  });
}

$(watchGin);
