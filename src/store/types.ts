import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {IListState} from "./list/types";

export interface IActionType<T, K> {
	type: T
	payload: K
}

export interface IRootState {
	list: IListState
}

export type AsyncActionType<T, E = any> = ActionCreator<ThunkAction<Promise<T>, E, null, Action<T>>>;
