const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;

const searchForm = document.querySelector("#search-form");
const movieSearch = document.querySelector("#movie-search");
const movieList = document.querySelector("#movie-list");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!movieSearch) return;

  getMovie();
});

async function getMovie() {
  try {
    const res = await fetch(`${apiUrl}&t=${movieSearch.value}`);

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    renderMovie(data);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

function renderMovie(movie) {
  movieList.innerHTML = `

    <li id="movie" class="movie">
      <img src="${movie.Poster}" alt="" class="poster" />
      <div class="description">
        <header>
          <h1 class="title">${movie.Title}</h1>
          <div class="ratings-container">
            <img src="images/star.svg" class="ratings-icon"/>
            <span class="ratings">${movie.Ratings[0].Value.split("/")[0]}</span>
          </div>
        </header>
        <div class="details">
          <p class="duration">${movie.Runtime}</p>
          <p class="type">${movie.Genre}</p>
          <button class="btn-add-watchlist">
            <img src="images/plus.svg" />
            Watchlist
          </button>
        </div>
        <p class="plot">${movie.Plot}</p>
      </div>
    </li>
    `;
}
