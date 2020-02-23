import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import { toDofetchedSucceed } from '../actions/app';
import { FETCHTODOS } from '../actions/app';

const foobar = async () => {
    return new Promise(res => {
        setTimeout(() => res(), 1000)
    })
    .then(() => fetch('https://jsonplaceholder.typicode.com/todos')) 
    .then(response => response.json());
}

function* xyz(){
    const response = yield call(foobar)
    yield put(toDofetchedSucceed(response))
}

function* mySaga(){
    yield takeLatest(FETCHTODOS, xyz)
}

export default mySaga;