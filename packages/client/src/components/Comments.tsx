import React, { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { RootDispatcher } from '../redux/rootRedux';
import {InitialState} from "../redux/rootReducer";
import classes from './style.module.less';
import { fetchHackersList, fetchNewsCard, fetchReplyComments } from '../redux/thunkActions';
import { IComment, ICommentsArray, INewsArray, INewsCard } from '../redux/interfaces';
import LoadingIndicator from './LoadingIndicator';
import './newsPage.module.css'
import { RouteComponentProps, useParams, useRouteMatch, withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import he from 'he'


interface Props {
    commentsArray: ICommentsArray;
    lvlReply: number;
}

interface RouteParams {
    id: string
}
interface StateProps {
    replyComments: {
        [id: string]: ICommentsArray;
    };
    loadingNewsList: boolean;
    openedComments: Array<Number>
}



const Comments: React.FC<Props> = (props) => {

    const {replyComments, loadingNewsList, openedComments} = useSelector<InitialState, StateProps>((state: InitialState) => {
        return {
            replyComments: state.replyComments,
            loadingNewsList: state.loadingNewsList,
            openedComments: state.openedComments
        }
    });
    const dispatch = useDispatch();
    const rootDispatcher = new RootDispatcher(dispatch);
  
    async function openReply(e: React.SyntheticEvent, id: Number): Promise<void> {
        e.preventDefault()
        console.log(!loadingNewsList);
        
        if (!loadingNewsList) {
            await dispatch(fetchReplyComments(id));
            rootDispatcher.addOpenedComments(id)
        } else {
            
        }
        
        console.log(openedComments, 'PROPS OPEN REPLY ARR');
        
    }

    let styleMarginLeft = {
        marginLeft: `${props.lvlReply*20}px`
    }


    console.log(props.commentsArray);
    return (
        <div className={`commentsBlock mt-2 mb-2`} style={styleMarginLeft}>
            {props.commentsArray.map((item) => (
                <div className='comment mt-1 mb-0.5' key={item.id}>
                    <div className='commentAuthorInfo'>
                        <strong>{item.by}</strong> <small>{ new Date(+item.time * 1000).toLocaleString('ru')}</small>
                    </div>
                    <div className="commentText" dangerouslySetInnerHTML={{ __html: he.decode(item.text) }}></div>
                    {/* Говорят, что фейсбук не рекомендуеет такое */}

                    {item.quntityReply> 0 && <div className='text-right'><button type="button" className={`btn btn-outline-secondary btn-sm`} onClick={async (e) => await openReply(e, item.id)}>Посмотреть ответы</button></div>}
                    
                    {(openedComments.includes(item.id)) && <Comments commentsArray={replyComments[item.id]} lvlReply={props.lvlReply + 1}></Comments>}
                    
                </div>
                
            ))}
            <hr className="mt-1" />
        </div>
    )
};

export default Comments;