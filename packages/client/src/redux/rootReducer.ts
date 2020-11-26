import {Action, Reducer} from "redux";
import { IComment, ICommentsArray, INewsArray, INewsCard }  from "./interfaces";
import { ActionType } from "./types";

export interface InitialState {
    name: string;
    address: string;
    hackersList: INewsArray;
    loadingNewsList: boolean;
    newsCard: INewsCard;
    replyComments: {
        [id: string]: ICommentsArray;
    };
    openedComments: Array<Number>
}


export const initialState: InitialState = {
    name: 'Initial Name',
    address: 'Initial Address',
    hackersList: [],
    loadingNewsList: false,
    newsCard: {
        id: 'Initial ID',
        title: 'Initial Title',
        by: 'Initial Author',
        time: 'Initial Time',
        url: 'Initial URL',
        quntityComments: 0,
        comments: [],
        lvlReply: 0
    },
    replyComments: {},
    openedComments: []

};

export interface DispatchAction extends Action {
    payload: Partial<InitialState>;
}

export const rootReducer: Reducer<InitialState, DispatchAction> = (state = initialState, action) => {
    if (action.type === ActionType.SET_NEWSLIST) {
        return {...state, hackersList: action.payload.hackersList};
    } else if (action.type === ActionType.SET_LOADING_NEWSLIST) {
        return {...state, loadingNewsList: action.payload.loadingNewsList};
    } else if (action.type === ActionType.SET_NEWSCARD) {
        return {...state, newsCard: action.payload.newsCard};
    } else if (action.type === ActionType.SET_REPLYCOMMENT) {
        return {...state, replyComments: {...state.replyComments, ...action.payload.replyComments}};
    } else if (action.type === ActionType.UPDATE_REPLYCOMMENT) {
        return {...state, replyComments: action.payload.replyComments};
    } else if (action.type === ActionType.SET_OPENEDCOMMENTARRAY) {
        return {...state, openedComments: action.payload.openedComments};
    } else return state;
};