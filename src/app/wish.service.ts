import { Injectable } from '@angular/core';

import {Course} from "./course";
import {CourseService} from "./course.service"

@Injectable({
  providedIn: 'root'
})
export class WishService {

  private wishList:Course[]=[];

  constructor(private courseService:CourseService) { 

  }

  getWishes(): Course[] {
    return this.wishList;
  }

  addWish(course_id:number) {
    // this.courseService.getCourse(course_id).subscribe((element)=>{
    //   this.wishList.push(element);
    //   console.log("新增願望成功");
    // });
    let course=this.courseService.getCourse(course_id);
    this.wishList.push(course);
      console.log("新增願望成功");
  }

  deleteWish(dept_id:string,course_order:string) {
    let courseIndex=this.wishList.findIndex((element)=> (element.info.dept_id===dept_id) && (element.info.course_order===course_order));
    this.wishList.splice( courseIndex, 1 );
    console.log("刪除願望成功",this.wishList);
  }

  hasWish(dept_id:string,course_order:string):boolean {
    return this.wishList.findIndex((element)=> (element.info.dept_id===dept_id) && (element.info.course_order===course_order))!==-1;
  }
}
