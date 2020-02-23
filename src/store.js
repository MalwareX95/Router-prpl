import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas/app';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';
import counter from './reducers/app';
const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(state => state, devCompose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk, sagaMiddleware)));
sagaMiddleware.run(mySaga);
store.addReducers({
    counter
});
//# sourceMappingURL=store.js.map