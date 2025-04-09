//tombol search
const searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click', async function() {
    const keyword = document.querySelector('.input-keyword')
    const movies = await getMovies(keyword.value)
    updateUi(movies)
})

//request api
function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=ac003c55&s=' + keyword)
     .then(response => response.json())
     .then(response => response.Search)
}

//ui
function updateUi(movies) {
    let cards = ''
    movies.forEach(movie => {
        cards += showMovies(movie)
    });

    const bodyContainer = document.querySelector('.movie-container')
    bodyContainer.innerHTML = cards
}

//show movies
function showMovies(movie) {
    return `<div class="col-md-4 my-5">
                <div class="card">
                    <img src="${movie.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdbid="${movie.imdbID}">Go somewhere</a>
                    </div>
                </div>
            </div>`
}