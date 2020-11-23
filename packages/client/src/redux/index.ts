import {DispatchAction, initialState, InitialState, rootReducer} from "./rootReducer";
import { applyMiddleware, createStore } from "redux";
import logger from 'redux-logger'
import thunk from "redux-thunk";


export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(logger, thunk)
  )