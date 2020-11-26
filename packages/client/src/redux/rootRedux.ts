import { Dispatch } from "redux";
import { store } from ".";
import { DispatchAction, initialState } from "./rootReducer";
import { ActionType } from "./types";

export class RootDispatcher {

    
    private readonly dispatch: Dispatch<DispatchAction>;
    
    constructor(dispatch: Dispatch<DispatchAction>){
        this.dispatch = dispatch; 
    }
    addOpenedComments = (id: Number) => {
        const openedComments = store.getState().openedComments
        if (!openedComments.includes(id)) {
            openedComments.push(id)
        }
        return this.dispatch({ type: ActionType.SET_OPENEDCOMMENTARRAY, payload: {openedComments} })
    };
    
    clearNewsCard = () => this.dispatch({type: ActionType.DELETE_NEWSCARD, payload: {newsCard: initialState.newsCard}});
    
    clearOpenedReply = () => this.dispatch({ type: ActionType.DELETE_OPENEDCOMMENTARRAY, payload: {openedComments: initialState.openedComments} });
    
 /*     deleteAddress = () => this.dispatch({type: ActionType.DeleteAddress, payload: {}}) */
}