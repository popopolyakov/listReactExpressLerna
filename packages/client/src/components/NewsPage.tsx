import React, { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { RootDispatcher } from '../redux/rootRedux';
import {InitialState} from "../redux/rootReducer";
import classes from './style.module.less';
import { fetchHackersList, fetchNewsCard, fetchUpdateComments } from '../redux/thunkActions';
import { INewsArray, INewsCard } from '../redux/interfaces';
import LoadingIndicator from './LoadingIndicator';
import './newsPage.module.css'
import { RouteComponentProps, useParams, useRouteMatch, withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import he from 'he'
import Comments from './Comments'


interface Props {
}

interface RouteParams {
    id: string
}
interface StateProps {
    newsCard: INewsCard
    loadingNewsList: boolean,
    openedComments: Array<Number>
}

const MainList: React.FC<Props> = (props) => {

    const {newsCard, loadingNewsList, openedComments} = useSelector<InitialState, StateProps>((state: InitialState) => {
        return {
            newsCard: state.newsCard,
            loadingNewsList: state.loadingNewsList,
            openedComments: state.openedComments
        }
    });

    let [copied, setCopied] = useState(false)
    const dispatch = useDispatch();
    const rootDispatcher = new RootDispatcher(dispatch);
    const params = useParams<RouteParams>();
   
    useEffect(() => {
        console.log();
        
        if (newsCard.title === 'Initial Title') {   
            dispatch(fetchNewsCard(+params.id));
        }
        console.log(openedComments);
        
        const timer = setInterval(() => {
            console.log(!loadingNewsList, openedComments);
            
            if (!loadingNewsList) { dispatch(fetchUpdateComments()) }
        }, 5000);

        return () => clearInterval(timer)

    }, []);
    


    if (copied) {        
        setTimeout(() => {
            setCopied(false)
        },2000)
    }
    
    
    return (
        <div className="container">
            {loadingNewsList && <LoadingIndicator/>}
            {Object.keys(newsCard).length !== 0 && (
                <div className="card mt-3 p-3">
                    <div className="row no-gutters">
                        <div className="col-12 col-sm-6 col-md-8 my-auto">
                            <h4 className="card-title">{newsCard.title}</h4>
                            <h6 className="card-subtitle text-muted">{newsCard.by}</h6>
                            <small>{ new Date(+newsCard.time * 1000).toLocaleString('ru')}</small>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="card-text text-center">
                                <strong>URL:</strong>
                                <br />
                                <a href={newsCard.url}>{newsCard.url}</a>
                                <br />
                                <CopyToClipboard text={newsCard.url} onCopy={() => setCopied(true)}>
                                    <svg style={{ cursor: 'pointer'}} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-clipboard ml-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                        <path fillRule="evenodd" d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                    </svg>
                                </CopyToClipboard>
                                {copied && (<span className='ml-1'>Copied successful</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <section className='mt-3'>
                <div className="row">
                    {newsCard.comments.length === 0 ? (
                        <div className="col-md-12">
                            <h4 className="text-center">Комментариев нет</h4>
                        </div>
                    ) : (
                            <div className = "col-md-12">
                                <h3 className="text-center">Комментарии ({newsCard.quntityComments})</h3>
                                <hr />
                                <Comments commentsArray={newsCard.comments} lvlReply={0}/>
                            </div>
                        )
                    }
                </div>
            </section>
        </div>
    )
};

export default MainList;