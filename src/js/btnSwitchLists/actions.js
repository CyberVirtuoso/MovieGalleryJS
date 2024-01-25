import {ALL_MOVIES, FAVORITE_MOVIES} from "../localStorage/consts.js";

export function renderNewListID(event)
{
    const currentListId = event.target.nextSibling.id;
    let newListId;
    switch(currentListId)
    {
        case ALL_MOVIES:{
            newListId = FAVORITE_MOVIES;
            break;
        }
        case FAVORITE_MOVIES: {
            newListId = ALL_MOVIES;
            break;
        }
        default:{
            return;
        }
    }

    return newListId;
}

export function changeUI(listId, event)
{
    const movieListTitle = event.target.previousElementSibling;
    switch(listId)
    {
        case ALL_MOVIES:{
            event.target.textContent = 'Click me to see Favourite movies';
            movieListTitle.innerHTML ='All Movies';
            break;
        }
        case FAVORITE_MOVIES: {
            event.target.textContent = 'Click me to see All movies';
            movieListTitle.innerHTML = 'Favorite Movies';
            break;
        }
        default:{
            return;
        }
    }
}