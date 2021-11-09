import {Dispatch} from 'redux';
import listService from '../../services/listService';
import {AsyncActionType} from '../types';
import {
	EListActionType, FilterType, ISetDeleteAction, ISetFilterAction, ISetLikesAction,
	ISetListAction, ISetLoadingAction,
	ListType
} from './types';

export const setList = (list: ListType[] | []): ISetListAction => ({
	type: EListActionType.SET_LIST,
	payload: list,
});

export const deleteItem = (id: string): ISetDeleteAction => ({
	type: EListActionType.DELETE_ITEM,
	payload: id,
})

export const setLike = (id: string): ISetLikesAction => ({
	type: EListActionType.SET_LIKE,
	payload: id,
})

export const setFilter = (filter: FilterType): ISetFilterAction => ({
	type: EListActionType.SET_FILTER,
	payload: filter,
})

export const setLoading = (isLoading: boolean): ISetLoadingAction => ({
	type: EListActionType.SET_LOADING,
	payload: isLoading,
})

export const fetchList: AsyncActionType<boolean> = () =>
	async (dispatch: Dispatch): Promise<boolean> => {
	dispatch(setLoading(true))
		const resp = await listService.fetchList();
	if(resp) {
		dispatch(setList(resp));
		return true;
	}
		return false;
	};


