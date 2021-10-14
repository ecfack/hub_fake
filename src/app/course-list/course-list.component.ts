import { Component, OnInit,Output, EventEmitter} from '@angular/core';

import { Observable, of,Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CourseService } from '../course.service';
import { WishService } from '../wish.service';
import { Course} from '../course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courseList:Course[]=[];

  constructor(private courseService:CourseService,private wishService:WishService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  @Output() courseListGottenEvent = new EventEmitter<boolean>();

  gottenCourseListEvent(value:boolean){
    this.courseListGottenEvent.emit(value);
  }

  getCourses(): void {
    this.courseService.courseListSubject.subscribe(
      (element)=>{
        this.courseList = this.courseService.getCourses();
        this.gottenCourseListEvent(true);
        console.log("載入課程成功");
      }
    );
  }

  addWish(course_id:number) {
    this.wishService.addWish(course_id);
  }

  hasWish(dept_id:string,course_order:string):boolean {
    return this.wishService.hasWish(dept_id,course_order);
  }
}
