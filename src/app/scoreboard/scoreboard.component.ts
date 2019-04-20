import { Component, OnInit } from '@angular/core';
import { Entry } from '../entities/Entry';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import {TableModule} from 'primeng/table';
import { Character } from '../entities/Character';
import { Question } from '../entities/Question';
import { User } from '../entities/User';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  week: number;
  users: User[];
  answers: Entry[];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.week = 1
    this.data.getAnswers().subscribe(
      data => this.answers = data
    );

    this.data.getUsers().subscribe(
      data => {
        this.users = data;
        for(let i=0; i<this.users.length; i++){
          this.users[i].score = this.calcScore(this.users[i].entry, this.week);
        }
      }
    )
    
  }

  calcScore(entry: Entry, week: number) : number{
    let curChars : Character[] = entry.characters;
    let curQues : Question[] = entry.questions;
    let ansChars : Character[] = this.answers[week].characters;
    let ansQues : Question[] = this.answers[week].questions;
    let total : number = 0;

    for(let i=0; i < ansChars.length; i++){
      if(ansChars[i].status === curChars[i].status){
        total += 2;
      }
      if(curChars[i].walker){
        if(ansChars[i].walker){
          total += 1;
        } else {
          total -= 1;
        }
      }
    }

    for(let i=0; i < ansQues.length; i++){
      if(ansQues[i].answer === curQues[i].answer){
        total += 1;
      }
    }
    return total;
  }
}
