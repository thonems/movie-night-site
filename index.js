const form = document.getElementById("form");
const input = document.getElementById("input-text");
const moviesContainer = document.getElementById("movie-container");

let movieArr = [];


// Submit search
form.addEventListener('submit', function (e) {
    moviesContainer.innerHTML = "";
    e.preventDefault();
    const inputValue = input.value;

    // API call for the input value using the proxy endpoint
    fetch(`http://localhost:3000/api/omdb?s=${inputValue}&page=1&type=movie`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            if (data.Error) {
                moviesContainer.innerHTML = '<p>Could not find what you were looking for.</p>';
            } else {
                const movieList = data.Search;
                const movieId = movieList.map(function (m) {
                    return m.imdbID;
                });

                // API call to find information about each movie using the proxy endpoint
                for (let id of movieId) {
                    fetch(`http://localhost:3000/api/omdb?i=${id}`)
                        .then(res => {
                            if (!res.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return res.json();
                        })
                        .then(data => {
                            //adding the lists from the api call to the div box for every movie in the movielist
                            movieArr.push(data);
                            moviesContainer.innerHTML += `
                            <br>
                            <div class="movie-container">
                                <div class="movie">
                                    <img class="poster" src="${data.Poster}" alt="image of poster from the movie ${data.Title}">
                                    <div>Title: ${data.Title} (${data.Year})</div>
                                    <div>Plot: ${data.Plot}</div>
                                    <div>Rating: ${data.imdbRating}</div>
                                    <button class="add-movie-btn" id="${data.imdbID}">+</button>
                                </div>
                            </div> 
                            <br>`;
                        })
                        .catch(error => {
                            console.error('Error fetching movie details:', error);
                        });
                }
            }
        })
        .catch(error => {
            console.error('Error fetching movie list:', error);
        });

    //reseting the search bar 
    input.value = "";
});

