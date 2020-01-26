// function displayRecipe(responseJson) {
//   $('#search-container').empty();
//   $('#search-container').append(`
//   <p> ${responseJson.drinks[0].strDrink}</p>`);
// }

// function fetchUrl(id) {
//   const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id;
//   console.log('url ' + url);
//   return url;
// }

// function fetchRecipe(url) {
//   console.log('fetch recipe ' + url);
//   fetch(url)
//     .then(response => response.json())
//     .then(responseJson => displayRecipe(responseJson));
// }

// function findId(id, url) {
//   let classId = '.' + id;
//   console.log('class id ' + classId);
//   let classIdElement = document.getElementsByClassName(id);
//   console.log('classIdElement ' + classIdElement);
//   classIdElement[0].click(fetchRecipe(url));
// }

function displayLiquorList(responseJson) {
  const idStore = [];
  console.log(responseJson);

  for (let i = 0; i < responseJson.drinks.length; i++) {
    let id = responseJson.drinks[i].idDrink;
    // let url = fetchUrl(id);

    $('#liquor-list').append(
      `<a href="#" class="drink-item" drinkID="${id}">
      <li class="liquor-li">
      <img src="${responseJson.drinks[i].strDrinkThumb}" 
      alt="${responseJson.drinks[i].strDrink}" 
      class="recipe-list-img" />
      <h3>${responseJson.drinks[i].strDrink}</h3></li></a>`
    );
    idStore.push(id);
  }
  console.log(idStore);
}

function findClass() {
  $('ul').click('.drink-item', event => {
    let current = $(event.currentTarget);
    let currentTwo = $(event.target);
    event.preventDefault();
    console.log(current);
    console.log(currentTwo);
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
