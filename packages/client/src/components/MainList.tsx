import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { RootDispatcher } from '../redux/rootRedux';
import {InitialState} from "../redux/rootReducer";
import classes from './style.module.less';
import { fetchHackersList } from '../redux/thunkActions';
import { INewsArray } from 'src/redux/interfaces';
import LoadingIndicator from './LoadingIndicator';
import { Link } from 'react-router-dom';


interface Props {
}

interface StateProps {
    name: string;
    address: string;
    hackersList: INewsArray;
    loadingNewsList: boolean
}

const MainList: React.FC<Props> = () => {

    const {name, address, hackersList, loadingNewsList} = useSelector<InitialState, StateProps>((state: InitialState) => {
        return {
            name: state.name,
            address: state.address,
            hackersList: state.hackersList,
            loadingNewsList: state.loadingNewsList
        }
    });

    const dispatch = useDispatch();
    const rootDispatcher = new RootDispatcher(dispatch);
    useEffect(() => {
        if (hackersList.length === 0) {
            dispatch(fetchHackersList());
        }

        const timer = setInterval(() => {
            dispatch(fetchHackersList())
        }, 60000);

        return () => clearInterval(timer)
      }, []);

    return (
        <div>
            {loadingNewsList && <LoadingIndicator/>}
            <div className="list-group align-items-center mt-3">
                {hackersList.map((item, i) => {
                    if (!!item) {return (
                        <Link to={`/hackersNews/${item.id}`} key={i} href="#" className="list-group-item list-group-item-action flex-column align-items-start" style={{ maxWidth: '1500px'}}>
                            <div className="d-flex w-100 justify-content-between ">
                                <h5 className="mb-0">{ item.title}</h5>
                                <small>{new Date(+item.time * 1000).toLocaleString('ru')} (
                                    {+item.diffTimeMinutes > 60 ? `${Math.floor(+item.diffTimeMinutes / 60)} ${Math.floor(+item.diffTimeMinutes / 60) > 1 ? `hours`: 'hour'} ${+item.diffTimeMinutes % 60} ${+item.diffTimeMinutes % 60 > 1 ? 'minutes' : 'minute'}  ago` : `${item.diffTimeMinutes} minutes ago`
                                        
                                    }) </small>
                            </div>
                            <small className="mb-0 font-weight-light">Rating: <strong className="font-weight-bold">{ item.score}</strong></small>
                            <small style={{ paddingLeft: '10px'}} className="font-weight-light">Author: <strong className="font-weight-bold">{item.by}</strong></small>
                        </Link>)}
                    })}
            </div>
            
        </div>
    )
};

export default MainList;