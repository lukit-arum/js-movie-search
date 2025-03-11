//melakukan fetch 
fetch('http://www.omdbapi.com/?apikey=ac003c55&s=harry potter')
 .then(response => response.json())
 .then(response => {
    console.log(response)
    let cards = ''
    let movies = response.Search
    movies.forEach(movie => {
        cards += `<div class="col-md-4 my-5">
                    <div class="card">
                        <img src="${movie.Poster}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${movie.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                            <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdbid="${movie.imdbID}">Go somewhere</a>
                        </div>
                    </div>
                </div>`
    });

    const movieContainer = document.querySelector('.movie-container')
    movieContainer.innerHTML = cards

    const modalDetailButton = document.querySelectorAll('.modal-detail-button')
    modalDetailButton.forEach(btn => {
        btn.addEventListener('click', function(){
            const imdbid = this.dataset.imdbid
            
            fetch('http://www.omdbapi.com/?apikey=ac003c55&i=' + imdbid)
             .then(response => response.json())
             .then(detail => console.log(detail))

        })
    })
 })