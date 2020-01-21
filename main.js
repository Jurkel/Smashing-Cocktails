function displayCarousel(responseJson) {
  console.log(responseJson);
  $('.my-slider').append(
    `<div class="slider-item">
        <div class="card">
          <img src="${responseJson.drinks[0].strDrinkThumb}" alt="${responseJson.drinks[0].strDrink}" />
          <h2>${responseJson.drinks[0].strDrink}</h2>
          <p class="card_description">
            Main ingredient: ${responseJson.drinks[0].strIngredient1}
          </p>
        </div>
      </div>`
  );
}

function loadCarousel() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  fetch(url)
    .then(response => response.json())
    .then(responseJson => displayCarousel(responseJson));
}

const slider = tns({
  container: '.my-slider',
  loop: true,
  items: 1,
  slideBy: 'page',
  nav: false,
  autoplay: true,
  speed: 400,
  autoplayButtonOutput: false,
  mouseDrag: true,
  lazyload: true,
  controlsContainer: '#customize-controls',
  responsive: {
    640: {
      items: 2
    },

    768: {
      items: 3
    }
  }
});

function displayList(responseJson) {
  console.log(responseJson);
  $('.slider-container').hide();
  $('.banner-text').hide();
  $('.grid-container').hide();

  for (let i = 0; i < responseJson.drinks.length; i++) {
    $('#search-results').append(
      `<li><img src="${responseJson.drinks[i].strDrinkThumb}" alt="${responseJson.drinks[i].strDrink}>
      <h3>${responseJson.drinks[i].strDrink}</h3>`
    );
    while (responseJson.drinks[i].strIngredient[a] != null) {
      $('#list-ingredients').append(
        `<h3>Ingredients:</h3>
        <li>${responseJson.drinks[i].strIngredient[a]}</li>`
      );
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
      }
      throw new Error(response.statusText);
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

    searchRecipe(searchTerm);
  });
}

$(watchSearch);
$(loadCarousel);
