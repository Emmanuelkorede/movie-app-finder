
const viewedContainer = document.getElementById('viewed-container') ;

async function viewedLoad() {
    const params = new URLSearchParams(window.location.search) ;
    const id = params.get('id') ;

    if (!id) {
        movieDetailsContainer.innerHTML = '<p>⚠️ No movie selected.</p>';
        return;
     }


    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=43954cb5`) ;
        const data = await response.json() ;

        if (data.Response === "False") {
            movieDetailsContainer.innerHTML = '<p>❌ Movie not found!</p>';
            return;
        }

        viewedContainer.innerHTML = `
        <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x400?text=No+Image'}" alt="${data.Title}">
        <div class="movie-info">
            <h2>${data.Title} (${data.Year})</h2>
            <p class="rating">⭐ IMDb: ${data.imdbRating}</p>
            <p><b>Genre:</b> ${data.Genre}</p>
            <p><b>Runtime:</b> ${data.Runtime}</p>
            <p><b>Released:</b> ${data.Released}</p>
            <p><b>Director:</b> ${data.Director}</p>
            <p><b>Actors:</b> ${data.Actors}</p>
            <p><b>Plot:</b> ${data.Plot}</p>
        </div>
        `;
    }
    catch (error) {
    viewedContainer.innerHTML = '<p>⚠️ Something went wrong. Please try again later.</p>';
  }

}

viewedLoad()