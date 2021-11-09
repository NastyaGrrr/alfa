import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import {connect} from "react-redux";
import {filterSelector, isLoadingSelector, listDataSelector} from "../../store/list/selectors";
import {IRootState} from '../../store/types';
import {
    FilterType,
    IListState,
    ISetDeleteAction,
    ISetFilterAction, ISetLikesAction,
    ListType
} from "../../store/list/types";
import {Action, bindActionCreators, Dispatch} from 'redux';
import {deleteItem, fetchList, setFilter, setLike} from "../../store/list/actions";
import ItemList from "../../components/ ItemList";
import Spin from "../../components/Spin";
import {ThunkAction} from "redux-thunk";

interface IMapDispatchToProps {
    dispatchFilter: (arg:FilterType) => ISetFilterAction
    dispatchDelete: (arg:string) => ISetDeleteAction
    dispatchFetchList: () => ThunkAction<Promise<boolean>, any, null, Action<boolean>>
    dispatchLike: (arg:string) => ISetLikesAction
}

type ListPropsType = IMapDispatchToProps & IListState;

const List: React.FC<ListPropsType> = ({
                                           dispatchFilter,
                                           dispatchDelete,
                                           dispatchFetchList,
                                           dispatchLike,
                                           filter,
                                           list,
                                           isLoading
                                       }) => {
    const [filterData, setFilterData] = useState<ListType[]>([]);

    useEffect(() => {
        dispatchFetchList();
    }, [dispatchFetchList]);

    useEffect(() => {
        setFilterData(filter.isOnlyLikes ? list.filter((item) => item.isLike) : []);
    }, [filter.isOnlyLikes, list])

    return (<div className={styles.container}>
            {isLoading && <Spin />}
            {!isLoading && <>
              <button className={styles.filter}
                      onClick={() => dispatchFilter({isOnlyLikes: !filter.isOnlyLikes})}>
                  {filter?.isOnlyLikes ? 'Показать все' : 'Показать только понравившиеся'}
              </button>
              <div>
                  {!filter.isOnlyLikes && list?.length !== 0 && list.map((item) => (
                      <ItemList key={item.id} image={item.image}
                                isLike={item.isLike}
                                handleDelete={dispatchDelete}
                                handleLikes={dispatchLike} id={item.id} />
                  ))}
                  {filter.isOnlyLikes && filterData?.length === 0 &&
                  <div>Пока нет фотографий, которые вам понравились</div>}
                  {filter.isOnlyLikes && filterData.map((item) => (
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
