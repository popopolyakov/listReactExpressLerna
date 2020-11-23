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
            return await Axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.data) 
        }
    ))
    res.json(listLastPosts);
});

app.get('/hackersList/:id', async function (req, res) {
    let currentID: Number = +req.params.id
    let currentPost = await Axios.get(`https://hacker-news.firebaseio.com/v0/item/${currentID}.json`).then(item => item.data)
    res.json(currentPost);
});

export {
    app,
    port,
};
