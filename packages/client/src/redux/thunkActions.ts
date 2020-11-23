import { ActionType } from "./types";

export const fetchHackersList = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionType.SET_LOADING_NEWSLIST, payload: {
        loadingNewsList: true
      }})
      const response = await fetch('http://localhost:5000/hackersList');
      const hackersList = await response.json();
      console.log(hackersList);
      await dispatch({ type: ActionType.SET_NEWSLIST, payload: {
          hackersList
      }
      });
      setTimeout(() => dispatch({
        type: ActionType.SET_LOADING_NEWSLIST, payload: {
          loadingNewsList: false
      }}), 1000)
    };
  };