const global = {
  currentPage: window.location.pathname,
  filterResults: [],
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: "382a7177f94cab525422ebbb33c7e8fa",
    //apiUrl: "https://api.themoviedb.org/3/",
    apiUrl: "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/",
  },
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = ` 
    <a href="./movie-details.html?id=${movie.id}">
   ${
     movie.poster_path
       ? `<img src = 'https://image.tmdb.org/t/p/w500${movie.poster_path}'
     class = 'card-img-top' 
     alt='${movie.title}'/>`
       : `<img src="./images/no-image.jpg" class="card-img-top" alt="${movie.title}" />
       `
   }  </a>
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">
      <small class="text-muted">Release:${movie.release_date}</small>
    </p>
  </div>`;
    document.querySelector("#popular-movies").appendChild(div);
  });
}

//
async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");
  console.log(results);
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = ` 
      <a href="./tv-details.html?id=${show.id}">
     ${
       show.poster_path
         ? `<img src = 'https://image.tmdb.org/t/p/w500${show.poster_path}'
       class = 'card-img-top' 
       alt='${show.name}'/>`
         : `<img src="./images/no-image.jpg" class="card-img-top"
          alt="${show.name}" />
         `
     }  </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">Air Date:${show.first_air_date}</small>
      </p>
    </div>`;
    document.querySelector("#popular-shows").appendChild(div);
  });
}

//details
//movedetails

async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1]; //?id=93405
  console.log(movieId);

  const movie = await fetchAPIData(`movie/${movieId}`);
  //console.log(movie);
  //overlay
  displayBackgroundImage("movie", movie.backdrop_path);

  console.log(
    movie.production_companies.reduce(
      (acc, company, index) =>
        acc +
        `<span>${company.name}</span>` +
        (index < movie.production_companies.length - 1 ? "," : ""),
      ""
    )
  );
  console.log(movie.genres.map((genre) => `<li>${genre.name}</li>`));
  //console.log(movie.genres.map((genre) => `<li>${genre.name}</li>`).join("23"));
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    movie.poster_path
      ? `<img src = 'https://image.tmdb.org/t/p/w500${movie.poster_path}'
    class = 'card-img-top' 
    alt='${movie.title}'/>`
      : `<img src="./images/no-image.jpg" class="card-img-top" alt="${movie.title}" />
      `
  }  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
      ${movie.overview}  </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> ${addCommasToNumber(movie.budget)}</li>
    <li><span class="text-secondary">Revenue:</span>${addCommasToNumber(movie.revenue)}</li>
    <li><span class="text-secondary">Runtime:</span>${movie.runtime}</li>
    <li><span class="text-secondary">Status:</span>${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${movie.production_companies
    .map((commpany) => `<span>${commpany.name}</span>`)
    .join(",")}</div>
</div>
  `;
  document.querySelector("#movie-details").appendChild(div);
}

//showdetails
async function displayShowDetails() {
  const showId = window.location.search.split("=")[1];
  console.log(showId);

  const show = await fetchAPIData(`tv/${showId}`);
  //console.log(movie);
  //overlay
  displayBackgroundImage("show", show.backdrop_path);

  /*    console.log(
      movie.production_companies.reduce(
        (acc, company, index) =>
          acc +
          `<span>${company.name}</span>` +
          (index < movie.production_companies.length - 1 ? "," : ""),
        ""
      )
    ); */
  // console.log(movie.genres.map((genre) => `<li>${genre.name}</li>`));
  //console.log(movie.genres.map((genre) => `<li>${genre.name}</li>`).join("23"));
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="details-top">
    <div>
    ${
      show.poster_path
        ? `<img src = 'https://image.tmdb.org/t/p/w500${show.poster_path}'
      class = 'card-img-top' 
      alt${show.name}'/>`
        : `<img src="./images/no-image.jpg" class="card-img-top" alt="${show.name}" />
        `
    }  </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}  </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
      </ul>
      <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
    <li>
      <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
    </li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${show.production_companies
      .map((commpany) => `<span>${commpany.name}</span>`)
      .join(",")}</div>
  </div>
    `;
  document.querySelector("#show-details").appendChild(div);
}

//backgroundImage

function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100%";
  overlayDiv.style.width = " 100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.3";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

//search
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get("search-term"));
  console.log(urlParams.get("type"));
  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");
  console.log(global);
  if (global.search.term.trim() !== "" && global.search.term.trim() !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();
    console.log(results, total_pages, page, total_results);
    /*  filterSearchResults(results);
    console.log("jkjk" + global.filterResults);
    */
    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert("No results found")();
      return;
    }
    displaySearchResults(results);
    // filterSearchResults(results);
    //
    document.querySelector("#search-term").value = "";
  } else {
    showAlert("please input")();
  }
}

//
/* function filterSearchResults(results) {
  document.getElementById("rating-select").addEventListener("change", function () {
    const selected = this.value;

    global.filterResults = results.filter((item) => {
      const rating = item.vote_average || 0;

      if (selected === "high") return rating >= 7;
      if (selected === "medium") return rating >= 4 && rating < 7;
      if (selected === "low") return rating > 0 && rating < 4;

      return true;
    });
  });
}
 */
function displaySearchResults(results) {
  document.querySelector("#search-results").innerHTML = "";
  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";
  document.querySelector("#pagination2").innerHTML = "";
  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = ` 
          <a href="./${global.search.type}-details.html?id=${result.id}">
         ${
           result.poster_path
             ? `<img src = 'https://image.tmdb.org/t/p/w500${result.poster_path}'
           class = 'card-img-top' 
           alt='${global.search.type === "movie" ? result.title : result.name}'/>`
             : `<img src="./images/no-image.jpg" class="card-img-top"
              alt="${global.search.type === "movie" ? result.title : result.name}" />
             `
         }  </a>
        <div class="card-body">
          <h5 class="card-title">${global.search.type === "movie" ? result.title : result.name}</h5>
          <p class="card-text">
            <small class="text-muted">${global.search.type === "movie" ? "Release" : "Air Date"} :${
      global.search.type === "movie" ? result.release_date : result.first_air_date
    }</small>
          </p>
        </div>`;
    document.querySelector("#search-results-heading").innerHTML = `
        <h2>${results.length} of ${global.search.totalResults} Results for '${global.search.term}'</h2>`;
    document.querySelector("#search-results").appendChild(div);
  });
  setTimeout(() => {
    displayPagination();
  }, 100);
}

//换页
function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
    <button class='btn btn-primary' id='prev'>Prev</button>
    <button class='btn btn-primary' id='next'>Next</button>
    <div class='page-counter'> Page ${global.search.page} of ${global.search.totalPages}</div>
    `;
  const div2 = document.createElement("div");
  div2.classList.add("pagination");
  div2.innerHTML = `
      <button class='btn btn-primary' id='prev2'>Prev</button>
      <button class='btn btn-primary' id='next2'>Next</button>
      <div class='page-counter'> Page ${global.search.page} of ${global.search.totalPages}</div>
      `;
  document.querySelector("#pagination").appendChild(div);
  document.querySelector("#pagination2").appendChild(div2);
  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
    document.querySelector("#prev2").disabled = true;
  }
  if (global.search.page === global.search.totalPages) {
    document.querySelector("#next").disabled = true;
    document.querySelector("#next2").disabled = true;
  }
  //next
  document.querySelector("#next").addEventListener("click", async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });
  //nex2
  document.querySelector("#next2").addEventListener("click", async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });

  //prev
  document.querySelector("#prev").addEventListener("click", async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });
  //prev2
  document.querySelector("#prev2").addEventListener("click", async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });
}
//swiper轮播
async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
    <img src = 'https://image.tmdb.org/t/p/w500${movie.poster_path}' 
    alt = '${movie.title}' />
             
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)}/ 10
            </h4>
    `;
    document.querySelector(".swiper-wrapper").appendChild(div);
    initSwiper();
  });
}
function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
    /*  pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }, */

    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

//fetch

async function fetchAPIData(endpoint) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;
  showSpinner();
  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  hideSpinner();
  //  console.log(data);
  return data;
}

//
async function searchAPIData(endpoint) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;
  showSpinner();
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );
  const data = await response.json(); //
  hideSpinner();
  //  console.log(data);'
  /*  data.results.sort((a, b) => {
    const dateA = new Date(a.release_date || a.first_air_date || "1970-01-01");
    const dateB = new Date(b.release_date || b.first_air_date || "1970-01-01");
    return dateB - dateA; // 降序排序（最新日期靠前）
  }); */

  return data;
}

//加载
function showSpinner() {
  document.querySelector(".spinner").style.display = "block";
}
function hideSpinner() {
  document.querySelector(".spinner").style.display = "none";
}

//高亮
function highLightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === global.currentPage) {
      link.classList.add("active");
    }
    /* console.log(link.getAttribute("href")); //取html的内容
    console.log(link.href); //完整url
    console.log(link);
    console.log("ad:" + window.location); */
  });
}
//Alert
function showAlert(message, className = "alert-postion") {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(alertEl);

  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      alertEl.remove();
    }, 2000);
  };
}
//Number
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//init
function init() {
  switch (global.currentPage) {
    case "/test/flixx-app-theme/index.html":
      displaySlider();
      displayPopularMovies();
      break;
    case "/test/flixx-app-theme/shows.html":
      displayPopularShows();
      break;
    case "/test/flixx-app-theme/search.html":
      search();
      break;
    case "/test/flixx-app-theme/movie-details.html":
      displayMovieDetails();
      break;
    case "/test/flixx-app-theme/tv-details.html":
      displayShowDetails();
      break;
  }
  highLightActiveLink();
}

init();
