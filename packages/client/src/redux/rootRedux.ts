import { Dispatch } from "redux";
import { DispatchAction } from "./rootReducer";
import { ActionType } from "./types";

export class RootDispatcher {
    
    private readonly dispatch: Dispatch<DispatchAction>;
    
    constructor(dispatch: Dispatch<DispatchAction>){
        this.dispatch = dispatch; 
    }
/*         updateName = (name: string) => this.dispatch({type: ActionType.SET_NEWSLIST, payload: {name}});
    
    updateAddress = (address: string) => this.dispatch({type: ActionType.UpdateAddress, payload: {address}});
    
    deleteName = () => this.dispatch({type: ActionType.DeleteName, payload: {}});
    
    deleteAddress = () => this.dispatch({type: ActionType.DeleteAddress, payload: {}}) */
}