import { Reducer } from 'redux'
import { RootAction } from '../store';
import { INCREMENT, DECREMENT } from '../actions/app';
// import * as AppAction from '../actions/app'


export interface CounterState {
    clicks: number;
    value: number;
  }

const INITIAL_STATE : CounterState = {
    clicks: 0,
    value: 0
}

const counter: Reducer<CounterState, RootAction> = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case INCREMENT:
            return {
                clicks: state.clicks + 1,
                value: state.value + 1
            }
        case DECREMENT:
            return {
                clicks: state.clicks - 1,
                value: state.value - 1
            }
    }
    return state
}

export default counter;

// const app: Reducer<AppState,  
