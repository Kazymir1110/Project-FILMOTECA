
//const = movies[];//
const ul = document.querySelector(".cards")
function createCardListMarkup(data) {
    return data.map((result) => {
        return `<li class="card" >
            <img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" alt="img_alt" class = "cardImg" id = "${result.id}">
            <h2 class="card_name">${result.original_title}</h2>
            <p class="card_text">Genre: horror</p>
          </li>`
    }).join("");
}

fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=b5a20566eb3bb1e19d16b3f507e342a4").then((res) => {
    return res.json();
}).then((data) => {
    let markup = createCardListMarkup(data.results);
    ul.innerHTML = markup
})


const modal_frame = document.querySelector(".modal_frame")
const backdrop = document.querySelector(".backdrop")
const closeBtn = document.querySelector(".closeBtn")

ul.addEventListener("click", (event) => {
    if (event.target.nodeName === "IMG") {
        backdrop.classList.remove("is-hidden")
        fetch(`https://api.themoviedb.org/3/movie/${event.target.id}?api_key=b5a20566eb3bb1e19d16b3f507e342a4`).then((res) => {
            return res.json();
        }).then((movie) => {
            console.log(movie);
            modal_frame.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="" class="cardImg_modal">
            <h2>${movie.title}</h2>
        <ul class="modal_list">
            <li>Vote/Votes ${movie.vote_average}/ ${movie.vote_count}</li>
            <li>Popularity ${movie.popularity}</li>
            <li>Original Title ${movie.original_title}</li>
            <li>Genre ${movie.genres.id}</li>
            <li>${movie.overview}</li>
        </ul>
        
        <button type="button" class="closeBtn"><img src="./img/close.jpg" alt="close"></button>
        `
        })
    }
})

// window.addEventListener("keydown", (event) => {
//     console.log(event);
//     if(event.code === "Escape"){
//     backdrop.classList.add("is-hidden")
//     }
// })


closeBtn.addEventListener("click", (event) => {
    backdrop.classList.add("is-hidden")
})