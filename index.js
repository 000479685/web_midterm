let data = [];
const moviesContainer = document.getElementById("movie-container");

async function getMovies()
{
    const moviesData = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=20e0bee41c4c344e8776905f04ac87b6");
    const moviesDataJSON = await moviesData.json();
    data = moviesDataJSON.results;
    generatePopularMoviesUI();
}



function createMovie(movie)
{
    const bannerUI = `
    <div class="basis-1/6 rounded shadow-lg">
    <img class="w-full" src=${"https://image.tmbd.org/t/p/w500" + movie.poster_path} alt="The movie poster here">
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
       <div class="mt-4">
       ${movie?.borders?.length ? createBorderChips(movie.borders) : ""}
       </div>
    </div>
  </div>
    `;

    moviesContainer.innerHTML += bannerUI;
}

function createBorderChips(borders) 
{
    const items = borders.map((border) => {
    return `<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${border}</span>`;
});

    return items.join("");
}

function createGenreListings(genreList)
{
    let liHtml = ``;
    genreList.forEach(element => {
        liHtml += `<li>${element}`
    });
    return liHtml;
}



function generatePopularMoviesUI()
{
    for(let movie of data)
    {
        createMovie(movie);
    }
}

getMovies();