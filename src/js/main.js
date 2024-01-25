import { changeUI, renderNewListID } from './btnSwitchLists/actions.js';
import { ALL_MOVIES, FAVORITE_MOVIES } from './localStorage/consts.js';
import {getAllMovies, getFavoriteMovies, setAllMovies, setFavouriteMovies} from './localStorage/setGetMovies.js'
import { createMovieCard } from './movieCard/createMovieCard.js';

const btnSwitchLists = document.querySelector('.movies-container-switch-list');
btnSwitchLists.addEventListener('click', event => {
    const newListId = renderNewListID(event);

    changeUI(newListId, event);

    const newMovieContainer = createMovieContainer(newListId);
    attachContainer(newMovieContainer, event.target);

});

//set localStorage
setAllMovies();
setFavouriteMovies()

//create movieContainer
const movieContainer = createMovieContainer(FAVORITE_MOVIES);
//attach container to btn
attachContainer(movieContainer, btnSwitchLists)

function createMovieContainer(listID)
{
    let movies = []
    switch(listID)
    {
        case ALL_MOVIES:{
            movies = getAllMovies();
            break;
        }
        case FAVORITE_MOVIES: {
            movies = getFavoriteMovies();
            break;
        }
        default:{
            return;
        }
    }


    const movieContainer = document.createElement('div');
    movieContainer.id = listID;
    movieContainer.className = 'movies-container-cards';

    if(!movies.length)
    {
        movieContainer.insertAdjacentHTML('beforebegin', '<h1>Sorry, your list is empty</h1>')
    }
    else
    {
        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            movieContainer.insertAdjacentHTML('afterbegin', movieCard);
            }
        );
    }

    movieContainer.addEventListener('click', event => {
        handleSaveToFavourites(event, listID);
    })

    return movieContainer;
}

function attachContainer(container, targetElement, position = 'afterend')
{
    const oldMovieContainer = document.querySelector('.movies-container-cards');
    if(oldMovieContainer)
    {
        oldMovieContainer.remove();
    }

    targetElement.insertAdjacentElement(
        position,
        container
    );
}

function handleSaveToFavourites(event, listID)
{
    const clickedMovieBtnIcon = event.target.closest('.movie-card-btn-icon');
    if(!clickedMovieBtnIcon)
    {
        return;
    }

    const clickedMovieCard = clickedMovieBtnIcon.parentElement;
    const clickMovieCardId = clickedMovieCard.dataset.movieId;

    const updatedMovies = getAllMovies().map(movieItem => {
        if(movieItem.id === Number(clickMovieCardId))
        {
            return{
                ...movieItem,
                isFavourite: !movieItem.isFavourite
            }
        }
        else
        {
            return{
                ...movieItem
            }
        }
    });

    setAllMovies(updatedMovies);
    setFavouriteMovies();

    switch(listID)
    {
        case ALL_MOVIES:{
            const clickedMovieObj = updatedMovies.find(movie => movie.id === Number(clickMovieCardId));
            if(!clickedMovieObj)
            {
                return;
            }
            const {isFavourite} = clickedMovieObj;
            const hearIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg'
            clickedMovieBtnIcon.insertAdjacentHTML('beforeend', `<img src="public/assets/icons/${hearIcon}" alt='saveToFavouriteIcon'/>`)
            clickedMovieBtnIcon.children[0].remove();
            break;
        }
        case FAVORITE_MOVIES: {
            clickedMovieCard.remove();
            break;
        }
        default:{
            return;
        }
    }
}