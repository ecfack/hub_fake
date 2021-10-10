import { Component } from '@angular/core';

import { Course } from "./course"
import { WishService } from './wish.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hub-fake';

  constructor(private wishService: WishService) { }

  ngOnInit() {
  }
}
