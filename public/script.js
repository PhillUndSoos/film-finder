//this is the file i'll mainly be working on. Most of style.css, helpers.js, index.html aswell as the file structure were provided by Codecademy.com

const tmdbKey = '0d91321457464055b1b02750ce6dcc2c';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  } catch(error) {
    console.log(error)
  };
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results
      return movies
    }
  } catch (error) {
    console.log(error)
  };
};



const getMovieInfo = async movie => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  console.log(urlToFetch)
  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo
    };
  } catch (error) {
    console.log(error)
  };
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  movies = await getMovies();
  randomMovie = await getRandomMovie(movies);
  info = await getMovieInfo(randomMovie);
  displayMovie(info);
  console.log(movies)
  console.log(randomMovie)
  console.log(info)
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;