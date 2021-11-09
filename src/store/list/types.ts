import { IActionType } from '../types';

export enum EListActionType {
	SET_LIST = 'SET_LIST',
	SET_FILTER = 'SET_FILTER',
	SET_LOADING = 'SET_LOADING',
	SET_LIKE = 'SET_LIKE',
	DELETE_ITEM = 'DELETE_ITEM'
}

export type FilterType = {
	isOnlyLikes: boolean
}

export type ListType = {
	id: string
	image: string
	isLike: boolean
}

export interface IListState {
	list: ListType[] | []
	filter: FilterType
	isLoading: boolean
}

export type ISetListAction = IActionType<EListActionType.SET_LIST, ListType[] | []>;
export type ISetFilterAction = IActionType<EListActionType.SET_FILTER, FilterType>;
export type ISetLoadingAction = IActionType<EListActionType.SET_LOADING, boolean>;
export type ISetLikesAction = IActionType<EListActionType.SET_LIKE, string>;
export type ISetDeleteAction = IActionType<EListActionType.DELETE_ITEM, string>;

export interface ActionType<T> {
	type: EListActionType
	payload:T

}
