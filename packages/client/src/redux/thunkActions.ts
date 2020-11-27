import { ActionType } from "./types";
import {store} from './index'

export const fetchHackersList = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionType.SET_LOADING_NEWSLIST, payload: {
        loadingNewsList: true
      }})
      const response = await fetch('http://localhost:3000/hackersList');
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
      const response = await fetch(`http://localhost:3000/hackersList/${id}`);
      const newsCard = await response.json();
      await dispatch({ type: ActionType.SET_NEWSCARD, payload: {
          newsCard
      }
      });
      dispatch({
        type: ActionType.SET_LOADING_NEWSLIST, payload: {
          loadingNewsList: false
      }}) // setTimeout для того, чтобы человек успел прочитать что это окно загрузки
    };
};
  
export const fetchReplyComments = (id : Number) => {
  const currentStore = store.getState();
  console.log(!currentStore.loadingNewsList);
  
  if (!currentStore.loadingNewsList) {
    return async (dispatch) => {
      dispatch({
        type: ActionType.SET_LOADING_NEWSLIST, payload: {
          loadingNewsList: true
        }
      })
      const response = await fetch(`http://localhost:3000/hackersList/comments/${id}`);
      const replyComments = await response.json();
      await dispatch({
        type: ActionType.SET_REPLYCOMMENT, payload: {
          replyComments: { [`${id}`]: replyComments }
        }
      });
      dispatch({
        type: ActionType.SET_LOADING_NEWSLIST, payload: {
          loadingNewsList: false
        }
      }) // setTimeout для того, чтобы человек успел прочитать что это окно загрузки
    };
  }
};

export const fetchUpdateComments = (idNewsCard : number) => {
  const currentStore = store.getState();
  console.log(!currentStore.loadingNewsList);
  
  if (!currentStore.loadingNewsList) {
    return async (dispatch) => {
      dispatch({
        type: ActionType.SET_LOADING_NEWSLIST, payload: {
          loadingNewsList: true
        }
      })
      console.log(currentStore.newsCard.id);
      
      const response = await fetch(`http://localhost:3000/hackersList/${currentStore.newsCard.id}`);
      const newsCard = await response.json();
      await dispatch({ type: ActionType.SET_NEWSCARD, payload: {
          newsCard
      }
      }); /* Коренные коментарии обновляются полностью с карточкой */
      
      if (currentStore.openedComments.length > 0) {
        const IDsCommentToUpdate = Object.keys(currentStore.replyComments)
        const EntriesComments = await Promise.all(IDsCommentToUpdate.map(async item => {
        const response = await fetch(`http://localhost:3000/hackersList/comments/${item}`);
        const replyComment = await response.json();
        return [`${item}`, replyComment]
      }))

      const UpdatedReplyObject = Object.fromEntries(EntriesComments)
      
      console.log(UpdatedReplyObject);
      dispatch({
        type: ActionType.UPDATE_REPLYCOMMENT, payload: {
          replyComments: UpdatedReplyObject
        }})
      }
      
      dispatch({
        type: ActionType.SET_LOADING_NEWSLIST, payload: {
          loadingNewsList: false
      }})
    };
  } else {
    return (dispatch) => {
      dispatch({
        type: ActionType.SET_LOADING_NEWSLIST, payload: {
          loadingNewsList: false
        }
      })
    }
  }
};