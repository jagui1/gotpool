import { Character } from './Character';
import { Question } from './Question';

export interface Entry {
    throne: Question;
    characters: Character[];
    questions: Question[];
}
