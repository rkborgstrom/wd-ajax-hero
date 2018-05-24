(function () {
  'use strict';

  const movies = [];

  const renderMovies = function () {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.Title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.Title);
      const $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
      const $modalText = $('<p>').text(movie.Plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

let searchButton = document.getElementById('searchButton');
let search = document.getElementById('search');



searchButton.addEventListener('click', function (e) {
  if (search.value !== "") {
  event.preventDefault();
  fetch(`https://omdb-api.now.sh/?s=${search.value}`) 
    .then(response => response.json())
    .then((moviesData => {
      for (let i = 0; i < moviesData.Search.length; i++) {
        const movie = moviesData.Search[i];
        movies.push(movie);
      }
renderMovies();
    }))
  
  }
});


  })();




  // http://www.omdbapi.com/?i=tt3896198&apikey=b4328be9&T=