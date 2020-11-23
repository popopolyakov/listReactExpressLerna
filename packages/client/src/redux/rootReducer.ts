import {Action, Reducer} from "redux";
import { INewsArray } from "./interfaces";
import { ActionType } from "./types";

export interface InitialState {
    name: string;
    address: string;
    hackersList: INewsArray;
    loadingNewsList: boolean
}


export const initialState: InitialState = {
    name: 'Initial Name',
    address: 'Initial Address',
    hackersList: [],
    loadingNewsList: false
};

export interface DispatchAction extends Action {
    payload: Partial<InitialState>;
}

export const rootReducer: Reducer<InitialState, DispatchAction> = (state = initialState, action) => {
    if (action.type === ActionType.SET_NEWSLIST) {
        return {...state, hackersList: action.payload.hackersList};
    } else if (action.type === ActionType.SET_LOADING_NEWSLIST) {
        return {...state, loadingNewsList: action.payload.loadingNewsList};
    } else return state;
};