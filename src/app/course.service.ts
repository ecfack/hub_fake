import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Course, CourseInfo } from "./course";

import { Observable, of,Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courseList: Course[]=[];
  public courseListSubject:Subject<Course[]> = new Subject();

  private courseUrl = "https://nckuhub.com/course";
  private courseInfoUrl = "https://nckuhub.com/course/Info";

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(operation, error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {
    // this.queryCourses().subscribe((element)=>{
    //   // this.courseList = Array.from(element);
    //   element.forEach(element => {this.courseList.push(element);})
    //   console.log("載入課程成功");
    // });
    this.queryCourses().subscribe(this.courseListSubject);

    this.courseListSubject.subscribe((element)=>{
      this.courseList = element;
      // element.forEach(element => {this.courseList.push(element);})
      // this.courseList.push(element[0]);
      console.log("遠端獲取課程成功");
    });
  }

  queryCourses(): Observable<Course[]> {
    return this.http.get<CoursesRes>(this.courseUrl).pipe(
      map((element) => this.CoursesRestoCourses(element)),
      catchError(this.handleError<Course[]>('getCourses', []))
    );
  }

  queryCourse(id: number): Observable<Course> {
    let courseInfoIdUrl = this.courseInfoUrl + "/" + id;
    return this.http.get<RawCourseInfo>(courseInfoIdUrl).pipe(
      map((element) => this.CourseInfotoCourse(element)),
      catchError(this.handleError<Course>('getCourses', new Course()))
    );
  }

  getCourses():Course[]{
    // return Array.from(this.courseList);
    return this.courseList;
  }

  getCourse(id: number):Course{
    let course=this.courseList.find(element => element.info.id===id);

    if(typeof course === "undefined"){
      return new Course();
    }
    else{
      return new Course(course.info);
    }
  }

  CoursesRestoCourses(coursesRes: CoursesRes): Course[] { //把所有課程轉為Course()
    let courseInfos = coursesRes.courses.map((element) => this.rawCourseInfotoCourseInfo(element));
    let courses: Course[] = [];
    courseInfos.forEach((element) => {
      courses.push(new Course(element));
    });
    return courses;
  }

  CourseInfotoCourse(coursesInfoRes: RawCourseInfo): Course {  //把某門課程轉為Course()
    let courses = this.rawCourseInfotoCourseInfo(coursesInfoRes);
    let course = new Course(courses);
    return course;
  }

  rawCourseInfotoCourseInfo(rawcourseInfo: RawCourseInfo): CourseInfo {  //把RawCourseInfo轉為CourseInfo
    let courseInfo = {
      comment_num: rawcourseInfo.comment_num,
      id: rawcourseInfo.id,
      credit: rawcourseInfo.學分,
      time: rawcourseInfo.時間,
      dept_name: rawcourseInfo.系所名稱,
      dept_id: rawcourseInfo.系號,
      teacher: rawcourseInfo.老師,
      title: rawcourseInfo.課程名稱,
      course_code: rawcourseInfo.課程碼,
      compulsory: rawcourseInfo.選必修,
      course_order: rawcourseInfo.選課序號
    }
    return courseInfo;
  }
}

export type CoursesRes = {
  courses: RawCourseInfo[]
}

// export type CourseInfoRes = {
//   "id": number,
//   "課程名稱": string,
//   "系號": string,
//   "課程碼": string,
//   "分班碼": string,
//   "系所名稱": string,
//   "老師": string,
//   "時間": string,
//   "comment_num": number
// }

export type RawCourseInfo = {
  comment_num?: number,
  id: number,
  學分: number,
  時間: string,
  系所名稱: string,
  系號: string,
  老師: string,
  課程名稱: string,
  課程碼?: string,
  選必修: string,
  選課序號: string,
  種類?: string,
};
