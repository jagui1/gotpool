import { Character } from './Character';
import { Question } from './Question';

export interface Entry {
    characters: Character[];
    questions: Question[];
}
