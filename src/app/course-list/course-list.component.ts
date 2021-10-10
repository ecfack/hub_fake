import { Component, OnInit,Output, EventEmitter} from '@angular/core';

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

  getCourses(): void {
    this.courseService.getCourses().subscribe(
      (element)=>{
        this.courseList = element;
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
