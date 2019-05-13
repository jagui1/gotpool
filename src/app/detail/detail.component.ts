import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { User } from '../entities/User';
import { Entry } from '../entities/Entry';
import { Character } from '../entities/Character';
import { Question } from '../entities/Question';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],{ optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), { optional: true })
      ])
    ])
  ]
})
export class DetailComponent implements OnInit {

  week: number;
  user: User;
  name: string;
  answers: Entry[];
  rightDOA: string[] = [];
  wrongDOA: string[] = [];
  rightWW: string[] = [];
  wrongWW: string[] = [];
  questions: Object[] = [];
  throne: Object;

  constructor(private route: ActivatedRoute, private data: DataService) { 
    this.route.params.subscribe( params => this.name = params.id );
  }

  ngOnInit() {
    this.data.getAnswers().subscribe(
      res => {
        this.answers = res;
        this.week = this.answers.length - 1;
      }
      
    );

    this.data.getUsers().subscribe(
      res => {
        let tmp = res.find(tmp => tmp.name === this.name);
        this.user = tmp;

        this.user.score = this.calcScoreVerbose(this.user.entry, this.week);
      } 
    );
  }

  calcScoreVerbose(entry: Entry, week: number) : number{
    let curChars : Character[] = entry.characters;
    let curQues : Question[] = entry.questions;
    let ansChars : Character[] = this.answers[week].characters;
    let ansQues : Question[] = this.answers[week].questions;
    let ansThrone : Question = this.answers[week].throne;
    this.rightDOA = [];
    this.wrongDOA = [];
    this.rightWW = [];
    this.wrongWW = [];
    this.questions = [];
    let total : number = 0;

    if(entry.throne.answer === ansThrone.answer){
      this.throne = {
        "style": "correct",
        "answer": this.user.entry.throne.name,
        "final": ansThrone.name
      }
      total += 5;
    } else {
      this.throne = {
        "style": "incorrect",
        "answer": this.user.entry.throne.name,
        "final": ansThrone.name
      }
    }

    for(let i=0; i < ansChars.length; i++){
      if(ansChars[i].status === curChars[i].status){
        total += 2;
        this.rightDOA.push(curChars[i].label + " - " + curChars[i].status);
      } else {
        this.wrongDOA.push(curChars[i].label + " - " + curChars[i].status);
      }

      if(curChars[i].walker){
        if(ansChars[i].walker){
          total += 1;
          this.rightWW.push(curChars[i].label);
        } else {
          total -= 1;
          this.wrongWW.push(curChars[i].label);
        }
      }
    }

    for(let i=0; i < ansQues.length; i++){
      if(ansQues[i].answer === curQues[i].answer){
        total += 1;
        this.questions.push(
          { 
            "answer": curQues[i].label + " - " + curQues[i].name,
            "final": ansQues[i].answer,
            "style": "correct"
          }
        );

      } else if(null != curQues[i].answer && "unanswered" != ansQues[i].answer){
        this.questions.push(
          {
            "answer": curQues[i].label + " - " + curQues[i].name,
            "final": ansQues[i].answer,
            "style": "incorrect"
          }
          );
      } else {
        this.questions.push(
          {
            "answer": curQues[i].label + " - " + curQues[i].name,
            "final": ansQues[i].answer,
            "style": "unanswered"
          }
        );
      }
    }
    return total;
  }

}
