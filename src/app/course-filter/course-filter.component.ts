import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';

import {Course} from "../course"
import { WishService } from '../wish.service';

@Component({
  selector: 'app-course-filter',
  templateUrl: './course-filter.component.html',
  styleUrls: ['./course-filter.component.css']
})
export class CourseFilterComponent implements OnInit {

  wishList:Course[]=[]

  constructor(private wishService: WishService) { }

  ngOnInit(): void {
    this.getWishes()
  }

  getWishes():void {
    this.wishList=this.wishService.getWishes();
  }

  deleteWish(dept_id:string,course_order:string){
    this.wishService.deleteWish(dept_id,course_order);
  }

  hasWish(dept_id:string,course_order:string):boolean{
    return this.wishService.hasWish(dept_id,course_order);
  }
}
