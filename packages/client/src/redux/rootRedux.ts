import { Dispatch } from "redux";
import { store } from ".";
import { DispatchAction } from "./rootReducer";
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
    
/*  updateAddress = (address: string) => this.dispatch({type: ActionType.UpdateAddress, payload: {address}});
    
    deleteName = () => this.dispatch({type: ActionType.DeleteName, payload: {}});
    
    deleteAddress = () => this.dispatch({type: ActionType.DeleteAddress, payload: {}}) */
}