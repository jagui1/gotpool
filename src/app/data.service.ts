import { Injectable } from '@angular/core';
import { Entry } from './entities/Entry'
import { User } from './entities/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private _entriesUrl = './assets/json/_entries.json';
  private _answersUrl = './assets/json/_answers.json';
  private _userUrlPre = './assets/json/'
  private _userUrlPost = '.json'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this._entriesUrl);
  }

  getAnswers() {
    return this.http.get<Entry[]>(this._answersUrl);
  }

  getUser(nameUser){
    return this.http.get<User>(this._userUrlPre + nameUser + this._userUrlPost);
  }
}
