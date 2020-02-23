import { Action, ActionCreator } from 'redux';

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const TODOSFETCHSUCCEED = 'TODOSFETCHSUCCEED'
export const FETCHTODOS = 'FETCHTODOS'

export interface CounterActionIncrement extends Action<'INCREMENT'>{}
export interface CounterActionDecrement extends Action<'DECREMENT'>{}
export interface CounterActionFetchToDos extends Action<'FETCHTODOS'>{}
export interface CounterActionToDosFetchSucceed extends Action<'TODOSFETCHSUCCEED'>{
    todos: any[]
}


export type CounterAction = CounterActionIncrement | CounterActionDecrement

export const increment: ActionCreator<CounterActionIncrement> = () => {
    return {
        type: INCREMENT
    }
}

export const decrement: ActionCreator<CounterActionIncrement> = () => {
    return {
        type: INCREMENT
    }
}

export const fetchToDos: ActionCreator<CounterActionFetchToDos> = () => {
    return {
        type: FETCHTODOS
    }
}

export const toDofetchedSucceed: ActionCreator<CounterActionToDosFetchSucceed> = (todos) => {
    console.log(todos)
    return {
        type: TODOSFETCHSUCCEED,
        todos
    }
}