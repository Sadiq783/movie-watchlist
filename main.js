const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;

const searchForm = document.querySelector("#search-form");
const movieSearch = document.querySelector("#movie-search");
const movieList = document.querySelector("#movie-list");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!movieSearch) return;

  fetch(`${apiUrl}&t=${movieSearch.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      movieList.innerHTML = `

    <li id="movie">
      <img src="${data.Poster}" alt="" class="poster" />
      <div class="description">
        <header>
          <h1 class="title">${data.Title}</h1>
          <div>
            <img src="Icon.svg" class="ratings-icon"/>
            <span>${data.Ratings[0].Value.split("/")[0]}</span>
          </div>
        </header>
        <div class="details">
          <p class="duration">${data.Runtime}</p>
          <p class="type">${data.Genre}</p>
          <button class="btn-add-watchlist">Watchlist</button>
        </div>
        <p class="plot">${data.Plot}</p>
      </div>
    </li>
    `;
    });
});
