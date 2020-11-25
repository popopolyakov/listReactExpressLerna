

export interface INewsItem {
    id: number | string;
    title: string;
    type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
    by: string;
    time: string | Date;
    diffTimeMinutes: string | number;
    text?: string;
    deleted?: boolean;
    dead?: boolean;
    parent?: string | number;
    poll?: string | number;
    url?: string | number;
    score?: string | number;
    kids?: Array<number>;
    parts?: Array<number>;
    descendants?: number | string;
}


export interface IComment {
    id: number;
    by: string;
    time: string;
    text: string;
    lvlReply: number;
    quntityReply: number
}

export interface ICommentsArray extends Array<IComment> {}

export interface INewsArray extends Array<INewsItem> { }

export interface INewsCard {
    id: number | string;
    url: string;
    title: string;
    time: string;
    by: string;
    comments?: ICommentsArray;
    quntityComments: number;
    lvlReply: 0;
}