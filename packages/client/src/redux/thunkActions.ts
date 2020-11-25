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
      }}), 1000) // setTimeout для того, чтобы человек успел прочитать что это окно загрузки
    };
};
  
export const fetchNewsCard = (id : number) => {
  return async (dispatch) => {
    dispatch({
      type: ActionType.SET_LOADING_NEWSLIST, payload: {
        loadingNewsList: true
      }})
      const response = await fetch(`http://localhost:5000/hackersList/${id}`);
      const newsCard = await response.json();
      await dispatch({ type: ActionType.SET_NEWSCARD, payload: {
          newsCard
      }
      });
      setTimeout(() => dispatch({
        type: ActionType.SET_LOADING_NEWSLIST, payload: {
          loadingNewsList: false
      }}), 1000) // setTimeout для того, чтобы человек успел прочитать что это окно загрузки
    };
};
  
export const fetchReplyComments = (id : Number) => {
  return async (dispatch) => {
    dispatch({
      type: ActionType.SET_LOADING_NEWSLIST, payload: {
        loadingNewsList: true
      }})
      const response = await fetch(`http://localhost:5000/hackersList/comments/${id}`);
      const replyComments = await response.json();
      await dispatch({ type: ActionType.SET_REPLYCOMMENT, payload: {
        replyComments: { [`${id}`]: replyComments }
      }
      });
      setTimeout(() => dispatch({
        type: ActionType.SET_LOADING_NEWSLIST, payload: {
          loadingNewsList: false
      }}), 1000) // setTimeout для того, чтобы человек успел прочитать что это окно загрузки
    };
  };