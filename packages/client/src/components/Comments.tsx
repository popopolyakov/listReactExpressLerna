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
    commentsArray: ICommentsArray
    lvlReply: number
}

interface RouteParams {
    id: string
}
interface StateProps {
    replyComments: {
        [id: string]: ICommentsArray;
    }
}



const Comments: React.FC<Props> = (props) => {

    const {replyComments} = useSelector<InitialState, StateProps>((state: InitialState) => {
        return {
            replyComments: state.replyComments
        }
    });

    let [openReplyArray, setOpenReplyArray] = useState([])
    const dispatch = useDispatch();
    async function openReply(e: React.SyntheticEvent , id : Number) {
        e.preventDefault()
        await dispatch(fetchReplyComments(id));
        setOpenReplyArray([...openReplyArray, id])
    }

    return (
    
                                <div className='commentsBlock' style={{marginLeft: `${props.lvlReply*15} px`}}>
                                    {props.commentsArray.map((item) => (
                                        <div className='comment' key={item.id}>
                                            <div className='commentAuthorInfo'>
                                                <strong>{item.by}{item.id} { `${props.lvlReply*15} px`}</strong> <small>{ new Date(+item.time * 1000).toLocaleString('ru')}</small>
                                            </div>
                                            <div className="commentText" dangerouslySetInnerHTML={{ __html: he.decode(item.text) }}></div>
                                            {/* Говорят, что фейсбук не рекомендуеет такое */}

                                            {item.quntityReply> 0 && <button type="button" className="btn btn-outline-secondary btn-sm" onClick={async (e) => await openReply(e, item.id)}>Посмотреть ответы</button>}
                                            {(openReplyArray.includes(item.id)) && <Comments commentsArray={replyComments[item.id]} lvlReply={props.lvlReply+1}></Comments>}
                                        </div>
                                    ))}
                                </div>
    )
};

export default Comments;