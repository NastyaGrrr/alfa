import { IRootState } from '../types';
import {FilterType, IListState, ListType} from './types';

export const listSelector = (store: IRootState): IListState => store.list;
export const filterSelector = (store: IRootState): FilterType => listSelector(store).filter;
export const isLoadingSelector = (store: IRootState): boolean => listSelector(store).isLoading;
export const listDataSelector = (store: IRootState): ListType[] => listSelector(store).list;
