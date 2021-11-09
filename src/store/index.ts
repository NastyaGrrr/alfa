import { Reducer, combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { listReducers as list } from './list/reducers';
import { IRootState } from './types';

// @ts-ignore
export const rootReducers: Reducer = combineReducers<IRootState>({list});

export default createStore(rootReducers, applyMiddleware(thunk));
