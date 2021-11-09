import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles.module.scss';
import {connect} from "react-redux";
import {filterSelector, isLoadingSelector, listDataSelector} from "../../store/list/selectors";
import {IRootState} from '../../store/types';
import { FilterType, IListState, ISetDeleteAction, ISetFilterAction, ISetLikesAction, ListType } from "../../store/list/types";
import { Action, bindActionCreators, Dispatch } from 'redux';
import { deleteItem, fetchList, setFilter, setLike } from "../../store/list/actions";
import ItemList from "../../components/itemList";
import Spin from "../../components/spin";
import { ThunkAction } from "redux-thunk";

interface IMapDispatchToProps {
    dispatchFilter: (arg: FilterType) => ISetFilterAction
    dispatchDelete: (arg: string) => ISetDeleteAction
    dispatchFetchList: () => ThunkAction<Promise<boolean>, any, null, Action<boolean>>
    dispatchLike: (arg: string) => ISetLikesAction
}

type ListPropsType = IMapDispatchToProps & IListState;

const List: React.FC<ListPropsType> = ({
                                           dispatchFilter,
                                           dispatchDelete,
                                           dispatchFetchList,
                                           dispatchLike,
                                           filter,
                                           list,
                                           isLoading,
                                       }) => {
    const [currentData, setCurrentData] = useState<ListType[]>(list);

    useEffect(() => {
        dispatchFetchList();
    }, [dispatchFetchList]);

    useEffect(() => {
       setCurrentData(list);
    }, [list]);

    const setFilter = useCallback( () => {
        dispatchFilter({isOnlyLikes: !filter.isOnlyLikes});
        if (!filter.isOnlyLikes) {
            setCurrentData(filter.isOnlyLikes ? list.filter((item) => item.isLike) : []);
        } else {
            setCurrentData(list);
        }
    },[dispatchFilter, filter.isOnlyLikes, list]);

    return (<div className={styles.container}>
            {isLoading && <Spin />}
            {!isLoading && <>
              <div className={styles.wrapperFilter}>
              <button className={styles.filter}
                      onClick={setFilter}>
                  {filter?.isOnlyLikes ? 'Показать все' : 'Показать только понравившиеся'}
              </button>
              </div>
              <div>
                  {filter.isOnlyLikes && currentData?.length === 0 &&
                  <div className={styles.text}>Пока нет фотографий, которые вам понравились</div>}
                  {currentData && currentData.length !== 0 && currentData.map((item) => (
                      <ItemList key={item.id}
                                image={item.image}
                                isLike={item.isLike}
                                handleDelete={dispatchDelete}
                                handleLikes={dispatchLike}
                                id={item.id} />
                  ))}
              </div>
            </>}
        </div>
    );
}

const mapStateToProps = (state: IRootState): IListState => ({
    list: listDataSelector(state),
    filter: filterSelector(state),
    isLoading: isLoadingSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => bindActionCreators({
    dispatchFilter: setFilter,
    dispatchDelete: deleteItem,
    dispatchFetchList: fetchList,
    dispatchLike: setLike,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(List);
