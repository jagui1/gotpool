import { Entry } from './Entry';

export interface User {
    name: string;
    score: number;
    scores: number[];
    entry: Entry;
}
