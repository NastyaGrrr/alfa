import {combineReducers} from 'redux';
import {ActionType, EListActionType, FilterType, IListState, ListType} from './types';

export const initialState: IListState = {
    list: [],
    filter: { isOnlyLikes: false },
    isLoading: false
};

export const list = (state = initialState.list, action: ActionType<string | ListType[]>): ListType[] => {
    switch (action.type) {
        case (EListActionType.SET_LIST):
            return action.payload as ListType[];
        case (EListActionType.SET_LIKE): {
            return state.map((item) => (item.id === action.payload ? {
                ...item,
                isLike: !item.isLike
            } : item))
        }
        case (EListActionType.DELETE_ITEM):
            return state.filter((item) => (item.id !== action.payload))
        default:
            return state;
    }
};

export const filter = (state = initialState.filter, action: ActionType<FilterType>): FilterType  => {
    switch (action.type) {
        case (EListActionType.SET_FILTER):
            return action.payload;
        default:
            return state;
    }
};

export const isLoading = (state = initialState.isLoading, action: ActionType<boolean>): boolean  => {
    switch (action.type) {
        case (EListActionType.SET_LOADING):
            return action.payload;
        case (EListActionType.SET_LIST):
            return false;
        default:
            return state;
    }
};

export const listReducers = combineReducers({
    list,
    filter,
    isLoading
});
