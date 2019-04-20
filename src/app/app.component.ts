import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  _bgURL = "./assets/images/GoT-Banner.jpg";
  title = 'got-pool';

  getUrl() {
    return "url'"+this._bgURL+"')";
  }
}
