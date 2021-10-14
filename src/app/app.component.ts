import { Component } from '@angular/core';

import { Subscription } from 'rxjs';

import { Course } from "./course";
import { CourseService } from "./course.service"
import { WishService } from './wish.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hub-fake';
  courseListStatus=false;

  constructor() { }

  ngOnInit() {
  }

  getCourseListstatus(status:boolean) {
    // setTimeout(() => {this.courseListStatus=status},0);
    this.courseListStatus=status;
    console.log(this.courseListStatus);
  }
}
