"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const path_1 = tslib_1.__importDefault(require("path"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const user_1 = tslib_1.__importDefault(require("./routes/user"));
const axios_1 = tslib_1.__importDefault(require("axios"));
const app = express_1.default();
exports.app = app;
const port = process.env.PORT || 3000;
exports.port = port;
app.use(cors_1.default({ credentials: true, origin: true }));
app.use(body_parser_1.default.json());
app.use('/user', user_1.default);
app.use(express_1.default.static('../client/dist'));
app.get('/index', function (req, res) {
    res.sendFile(path_1.default.resolve('../client/dist/index.html'));
});
app.get('/hackersList', function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let idsLastPosts = yield axios_1.default.get('https://hacker-news.firebaseio.com/v0/newstories.json').then(res => res.data.slice(0, 100));
        let listLastPosts = yield Promise.all(idsLastPosts.map((id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield axios_1.default.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => {
                return {
                    id: res.data.id,
                    title: res.data.title,
                    by: res.data.by,
                    time: res.data.time,
                    score: res.data.score,
                    diffTimeMinutes: Math.round((+Date.now() - +(new Date(+res.data.time * 1000))) / 60000)
                };
            });
        })));
        res.json(listLastPosts);
    });
});
app.get('/hackersList/:id', function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let currentID = +req.params.id;
        let currentPost = yield axios_1.default.get(`https://hacker-news.firebaseio.com/v0/item/${currentID}.json`).then((item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let comments = [];
            console.log(item.data);
            if (Array.isArray(item.data.kids)) {
                comments = yield Promise.all(item.data.kids.map((idComment) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return yield axios_1.default.get(`https://hacker-news.firebaseio.com/v0/item/${idComment}.json`).then(res => {
                        if (!!res.data.by) {
                            return {
                                id: res.data.id,
                                by: res.data.by,
                                time: res.data.time,
                                text: res.data.text,
                                lvlReply: 0,
                                quntityReply: Array.isArray(res.data.kids) ? res.data.kids.length : 0
                            };
                        }
                    });
                })));
            }
            comments = comments.filter(item => typeof item === 'object').sort((a, b) => b.time - a.time);
            return {
                id: item.data.id,
                url: item.data.url,
                title: item.data.title,
                time: item.data.time,
                by: item.data.by,
                quntityComments: comments.length,
                comments: comments,
                lvlReply: 0
            };
        }));
        res.json(currentPost);
    });
});
app.get('/hackersList/comments/:id', function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let currentID = +req.params.id;
        let currentPost = yield axios_1.default.get(`https://hacker-news.firebaseio.com/v0/item/${currentID}.json`).then((item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let comments = [];
            if (!!item.data.kids) {
                comments = yield Promise.all(item.data.kids.map((idComment) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return yield axios_1.default.get(`https://hacker-news.firebaseio.com/v0/item/${idComment}.json`).then(res => {
                        if (!!res.data.by) {
                            console.log(res.data);
                            return {
                                id: res.data.id,
                                by: res.data.by,
                                time: res.data.time,
                                text: res.data.text,
                                lvlReply: 0,
                                quntityReply: Array.isArray(res.data.kids) ? res.data.kids.length : 0
                            };
                        }
                    });
                })));
            }
            return [
                ...comments.filter(item => typeof item === 'object').sort((a, b) => b.time - a.time),
            ];
        }));
        res.json(currentPost);
    });
});
