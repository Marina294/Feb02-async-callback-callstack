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
getMovies(API_URL);

//Create an async function of getMovies 
//------assign a response to a fetch/axios method
//------call showMovies function and pass the response as argument


async function getMovies() {

    const response = await axios.get('https://www.themoviedb.org/');
      showMovies(response.data.results);
    // console.log(response);
    // return response.data
    //  <---- you can return but you're not really meant to store the response, 
    //  you have to call the showMovies() function and pass the result as an argument in this line.
    

}


function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        //destructure the movie object
        // const { ???, ??? ,vote_average } = movie //include the "vote_average"

        const { image, overview, vote_average } = movie
        // const { movie, overview ,vote_average } = movie
        // <---- what you should destructure is the contents of "movie" object, 
        // movieEl is supposed to be the name of the new div



        //create a div element
        const movieEl = document.createElement('div');
        // <----- this should be movieEl, the name movie is already taken 
        // by the parameter of the callback function of forEach



        //add a "movie" class in that div
        movieEl.classList.add('movie');  
        // div.push(movie);
        // <------ this should be movieEl.classList.add(???) 

        //manipulate the newly created element's innerHTML (I called it movieEl in this sample)
        movieEl.innerHTML = `
            <img src='${IMG_PATH + image}' alt="">
            <div class="movie-info">
          <h3></h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        //append the movieEl to main
        main.appendChild(movieEl);
    })
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

    // const searchTerm = document.getElementById('search');
    // <----- you already have a search node (line 10), 
    // use that to assign the search's input value onto searchTerm

    if(searchTerm && searchTerm !== '') {
        //call the getMovies function and pass the concatenated value of SEARCH_API + searchTerm
        getMovies(SEARCH_API + searchTerm);
        //reset the input's value
    } else {
        window.location.reload()
    }
});