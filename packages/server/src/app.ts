import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

import userRoutes from './routes/user';
import Axios from 'axios';


const app = express();
const port = process.env.PORT || 5000;

app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());

app.use('/user', userRoutes);

app.use(express.static('../client/dist'));
app.get('/index', function(req, res) {
    res.sendFile(path.resolve('../client/dist/index.html'));
});

app.get('/hackersList', async function (req, res) {
    let idsLastPosts : number[] = await Axios.get('https://hacker-news.firebaseio.com/v0/newstories.json').then(res => res.data.slice(0, 100))
    let listLastPosts = await Promise.all( idsLastPosts.map(
        async (id) => {
            return await Axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
                res => {
                    return {
                        id: res.data.id,
                        title: res.data.title,
                        by: res.data.by,
                        time: res.data.time,
                        score: res.data.score,
                        diffTimeMinutes: Math.round((+Date.now() - +(new Date(+res.data.time * 1000))) / 60000)
                    }
                }) 
        }
    ))
    res.json(listLastPosts);
});

app.get('/hackersList/:id', async function (req, res) {
    let currentID: Number = +req.params.id
    let currentPost = await Axios.get(`https://hacker-news.firebaseio.com/v0/item/${currentID}.json`).then(async item => {
        let comments = []
        console.log(item.data);
        
        if (Array.isArray(item.data.kids)) {
            comments = await Promise.all(item.data.kids.map(
                async (idComment: number) => {
                    return await Axios.get(`https://hacker-news.firebaseio.com/v0/item/${idComment}.json`).then(res => {
                        if (!!res.data.by) {
                            
                           
                            return {
                                id: res.data.id,
                                by: res.data.by,
                                time: res.data.time,
                                text: res.data.text,
                                lvlReply: 0,
                                quntityReply: Array.isArray(res.data.kids) ? res.data.kids.length : 0
                            }
                        }
                    })
                }))
        }
        comments = comments.filter(item => typeof item === 'object').sort((a, b) => b.time - a.time)
        return {
            id: item.data.id,
            url: item.data.url,
            title: item.data.title,
            time: item.data.time,
            by: item.data.by,
            quntityComments: comments.length,
            comments: comments,
            lvlReply: 0
        }
    })
    res.json(currentPost);
});

app.get('/hackersList/comments/:id', async function (req, res) {
    let currentID: Number = +req.params.id
    let currentPost = await Axios.get(`https://hacker-news.firebaseio.com/v0/item/${currentID}.json`).then(async item => {
        let comments = []
        if (!!item.data.kids) {
            comments = await Promise.all(item.data.kids.map(
                async (idComment: number) => {
                    return await Axios.get(`https://hacker-news.firebaseio.com/v0/item/${idComment}.json`).then(res => {
                        if (!!res.data.by) {
                            console.log(res.data);
                            
                            return {
                                id: res.data.id,
                                by: res.data.by,
                                time: res.data.time,
                                text: res.data.text,
                                lvlReply: 0,
                                quntityReply: Array.isArray(res.data.kids) ? res.data.kids.length : 0
                            }
                        }
                    })
                })
            )
        }
        return [
            ...comments.filter(item => typeof item === 'object').sort((a, b) => b.time - a.time),
        ]
    })
    res.json(currentPost);
});

export {
    app,
    port,
};
