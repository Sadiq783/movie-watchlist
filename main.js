const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;

const searchForm = document.querySelector("#search-form");
const movieSearch = document.querySelector("#movie-search");
const movieList = document.querySelector("#movie-list");
const clearBtn = document.getElementById("clearSearch");

const loadingContainer = document.querySelector("#loading");
const notFoundContainer = document.querySelector("#not-found-state");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!movieSearch) return;

  getMovie();
});

async function getMovie() {
  movieList.style.display = "none";
  notFoundContainer.style.display = "none";

  // Show Loading State
  loadingContainer.style.display = "block";
  try {
    const res = await fetch(`${apiUrl}&t=${movieSearch.value}`);

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();

    // If not movie were found
    if (data.Response === "False") {
      loadingContainer.style.display = "none";
      notFoundContainer.style.display = "block";

      throw new Error("No movie was found matching your search.");
    }

    // Hide Loading state
    loadingContainer.style.display = "none";

    // Show List
    movieList.style.display = "grid";

    renderMovie(data);
  } catch (err) {
    // Hide Loading State
    loadingContainer.style.display = "none";
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

// Toggle the clear button visibility based on input content
function toggleClearButton() {
  if (movieSearch.value.length > 0) {
    clearBtn.classList.add("is-visible");
  } else {
    clearBtn.classList.remove("is-visible");
  }
}

movieSearch.addEventListener("input", toggleClearButton);

// Handle the clear action when button is clicked
clearBtn.addEventListener("click", function () {
  movieSearch.value = "";
  toggleClearButton();
  movieSearch.focus();
});
