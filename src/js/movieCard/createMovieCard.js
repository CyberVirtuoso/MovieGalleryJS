export function createMovieCard(movie)
{
    const {id, imageUrl, movieName, releaseYear, isFavourite, description} = movie;
    const hearIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg'
    return`
    <div data-movie-id="${id}" class = "movie-card">
        <img src="${imageUrl}" alt="moviePicture"/>
        <h3>${movieName}</h3>
        <strong>${releaseYear}</strong>
        <p>${description}</p>
        <button class = "movie-card-btn-icon">
            <img src="assets/icons/${hearIcon}" alt='saveToFavouriteIcon'/>
        </button>
    </div>
    `;
}