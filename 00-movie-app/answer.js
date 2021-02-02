const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

// const main = get DOM element of main
const main = document.querySelector('#main');
// const form = get DOM element of form
const form = document.querySelector('#form');
// const search = get DOM element of search
const search = document.querySelector('#search');

// Get initial movies
getMovies(API_URL)

//Create an async function of getMovies 
//------assign a response to a fetch/axios method
//------call showMovies function and pass the response as argument
async function getMovies(url){
    const response = await fetch(url)
    const { results } = await response.json();
    console.log(results);
    showMovies(results);

}



function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        //destructure the movie object
        // const { ???, ??? ,vote_average } = movie //include the "vote_average"
        const {poster_path, original_title, overview, vote_average} = movie;

        //create a div element
        //add a "movie" class in that div 
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        // movieEl.setAttribute('class', 'movie');

        //manipulate the newly created element's innerHTML (I called it movieEl in this sample)
        movieEl.innerHTML = `
            <img src="${IMG_PATH + movie.poster_path}" alt="movie image">
            <div class="movie-info">
          <h3>${movie.original_title}</h3>
          <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${movie.overview}
        </div>
        `
        //append the movieEl to main
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    //prevent refresh
    e.preventDefault();

    //const searchTerm = ???  //assign the value of the input's value
    const searchTerm = search.value;

    if(searchTerm && searchTerm !== '') {
        //call the getMovies function and pass the concatenated value of SEARCH_API + searchTerm
        getMovies(SEARCH_API + searchTerm)

        //reset the input's value
        searchTerm = "";
    } else {
        window.location.reload()
    }
})