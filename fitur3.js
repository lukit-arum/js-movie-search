//tombol search
const searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click', async function() {
    try{
        const keyword = document.querySelector('.input-keyword')
        const movies = await getMovies(keyword.value)
        updateUi(movies)
    } catch(err) {
        alert(err)
    }
})

//request api
function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=ac003c55&s=' + keyword)
     .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText)
        }

        return response.json()
     })
     .then(response => {
        if(response.Response == "False") {
            throw new Error(response.Error)
        }

        return response.Search
        // console.log(response)
     })
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

//detail button, di sini kita akan memanfaatkan event hendler
document.addEventListener('click', async function(e) {
    if(e.target.classList.contains('modal-detail-button')){
        const imdbid = e.target.dataset.imdbid
        console.log(imdbid)
        const detail = await getDetail(imdbid)
        updateUiDetail(detail)
    }
})

//request api detail
function getDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=ac003c55&i=' + imdbid)
     .then(response => response.json())
     .then(response => response)
}

//update ui detail
function updateUiDetail(detail) {
    const movieDetail = showDetail(detail)
    const modalDetail = document.querySelector('.modal-body')
    modalDetail.innerHTML = movieDetail
}

function showDetail(movieDetail) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                    <img src="${movieDetail.Poster}" class="img-fluid">
                    </div>

                    <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item">judul</li>
                        <li class="list-group-item">tahun</li>
                        <li class="list-group-item">sutradara</li>
                        <li class="list-group-item">penulis</li>
                        <li class="list-group-item">sinopsis Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dolor praesentium esse assumenda numquam voluptates atque cumque ullam doloremque quisquam, nesciunt quos eaque? Quas illum repellat soluta. Ipsa, est qui?</li>
                    </ul>
                    </div>
                </div>
            </div>`
}
