document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/api/movies")
    .then((response) => response.json())
    .then((data) => {
      const watchlistDiv = document.getElementById("watchlist");
      data.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.className = "movie-box";
        movieDiv.innerHTML = `
                    <h2>${movie.Title}</h2>
                    <p>Year: ${movie.Year}</p>
                    <p>Type: ${movie.Type}</p>
                    <img src="${movie.Poster}" alt="${movie.Title} Poster" width="100">
                    <button onclick="deleteMovie('${movie._id}')">Delete</button>
                `;
        watchlistDiv.appendChild(movieDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching watchlist:", error);
    });
});

function deleteMovie(id) {
  fetch(`http://localhost:3000/api/delete/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("Movie deleted");
        location.reload();
      } else {
        alert("Error deleting movie");
      }
    })
    .catch((error) => {
      console.error("Error deleting movie:", error);
    });
}
