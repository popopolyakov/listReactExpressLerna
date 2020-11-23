

export interface INewsItem {
    id: number | string;
    title: string;
    type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
    by: string;
    time: string | Date;
    text?: string;
    deleted?: boolean;
    dead?: boolean;
    parent?: string | number;
    poll?: string | number;
    url?: string | number;
    score?: string | number;
    kids?: Array<number>;
    parts?: Array<number> | string | number;
    descendants?: number | string
}


export interface INewsArray extends Array<INewsItem> {}