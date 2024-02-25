let data = [];
const moviesContainer = document.getElementById("movie-container");
let genreData = [];


async function getMovies()
{
    const moviesData = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=20e0bee41c4c344e8776905f04ac87b6");
    const moviesDataJSON = await moviesData.json();
    data = moviesDataJSON.results;

    const genreFetch = await fetch("http://api.themoviedb.org/3/genre/movie/list?api_key=20e0bee41c4c344e8776905f04ac87b6");
    const genreFetchJSON = await genreFetch.json();
    genreData = genreFetchJSON.genres;

    generateMoviesUI();
}



async function getPopularMovies()
{
    const moviesData = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=20e0bee41c4c344e8776905f04ac87b6");
    const moviesDataJSON = await moviesData.json();
    data = moviesDataJSON.results;
    generateMoviesUI();
}

async function getTopRatedMovies()
{
    const moviesData = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=20e0bee41c4c344e8776905f04ac87b6");
    const moviesDataJSON = await moviesData.json();
    data = moviesDataJSON.results;
    generateMoviesUI();
}

async function getUpcomingMovies()
{
    const moviesData = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=20e0bee41c4c344e8776905f04ac87b6");
    const moviesDataJSON = await moviesData.json();
    data = moviesDataJSON.results;
    generateMoviesUI();
}

function createMovie(movie)
{    
    const bannerUI = `
    <div class="flex-1 basis-1/4 border-4 border-black">
    <img class="w-1/4 min-h-40 max-h-96" src=${"https://image.tmbd.org/t/p/w500" + movie.poster_path} alt="The movie poster here">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">${movie.original_title}</div>
      <p class="text-gray-700 text-base">
        Release date : <span class="font-bold"> ${
          movie.release_date
        } </span>
      </p>
      <p> <span class="font-bold">${
        movie.overview
      }</span>
      <div>Genre overview: ${createGenreListings(movie.genre_ids)}
</div>

    </div>
  </div>
    `;

    moviesContainer.innerHTML += bannerUI;
}

function createGenreListings(genreList)
{
    let liHtml = ``;
    genreList.forEach(element => {
        liHtml += `<li>${genreData[genreData.map(e => e.id).indexOf(element)].name}`
    });
    return liHtml;
}



function generateMoviesUI()
{
    moviesContainer.innerHTML = "";
    for(let movie of data)
    {
        createMovie(movie);
    }
}

getMovies();