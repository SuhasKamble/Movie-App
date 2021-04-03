
const search = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const movieContainer = document.querySelector('.movie-container');
const movieInfo = document.querySelector('.movieInfo');

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    
    movieContainer.innerHTML = `<h1 class="loading">Loading...</h1>`
    console.log("Suhas")
    const movieName = search.value;
    getMovie(movieName);
})

async function getMovie(movie){
    movieContainer.innerHTML = "";
    const res = await fetch(`https://www.omdbapi.com/?apikey=5e0a7faa&s=${movie}`); const resData = await res.json();

    const movies = resData.Search;
    if(movies){
        console.log(movies)
        movies.forEach((movie)=>{
        
            const movieEle = document.createElement('div');
    
            movieEle.classList.add('movie');
            movieEle.innerHTML = `
            
        
            <div class="img-container">
                <img src="${movie.Poster}" alt="${movie.Title}">
            </div>
            <div class="movie-info">
                <h4>${movie.Title.length>15?movie.Title.substring(0,20)+"...":movie.Title}</h4>
            </div>
        </div>
        
            `

            movieEle.addEventListener('click',()=>{
                showInfo(movie.imdbID)
            })
            movieContainer.appendChild(movieEle)
          
        }) 

    }else{
       movieContainer.innerHTML ="<h1 class='loading'>No Result Found</h1>"
    }


    search.value = ''

    
}


async function showInfo(id){
   
    movieInfo.innerHTML = '<h1 class="loading-section">Loading...</h1>';
    movieInfo.style.visibility = 'visible'
    const movieReview = document.createElement("div");
    movieReview.classList.add("movie-view");

    const res = await fetch(`https://www.omdbapi.com/?apikey=5e0a7faa&i=${id}`);
    const resData = await res.json();
    console.log(resData)
    const movie  = resData;
    movieInfo.innerHTML = ''
    
    movieReview.innerHTML = `
 
    <button class="delBtn">

        <i class="fas fa-times"></i>
    </button>
    <div class="review-top">
        <div class="review-left">
            <img src="${movie.Poster}" alt="">
        </div>
        <div class="review-right">
            <h2 class="title">${movie.Title}</h2>
            <h3>Rating: ${movie.imdbRating}</h3>
            <h3>Type: Series</h3>
            <p>Year: ${movie.Year}</p>
        </div>
        
    </div>
    <div class="review-bottom">
        <div class="review-box">
            <p class="info">${movie.Plot}</p>
        </div>
        <div class="review-box">
            <h4>Country</h4>
            <p>${movie.Country}</p>
        </div>

        <div class="review-box">
            <h4>Genre</h4>
            <p>${movie.Genre}</p>
            </div>
            <div class="review-box">
                <h4>Language</h4>
                <p>${movie.Language}</p>
            </div>
            <div class="review-box">
            <h4>Actors</h4>
            <p>${movie.Actors}</p>
        </div>
        <div class="review-box">
        <h4>Released</h4>
        <p>${movie.Released}</p>
    </div>
    </div>

    `
    const closeBtn = movieReview.querySelector('.delBtn');
    closeBtn.addEventListener('click',()=>{
        movieInfo.style.visibility = 'hidden'
    })
    movieInfo.appendChild(movieReview)
    
}


async function getMovieById(id){
   
    
}