export type CourseInfo={
    comment_num?: number,
    id: number,
    credit: number,
    time: string,
    dept_name: string,
    dept_id: string,
    teacher: string,
    title: string,
    course_code?: string,
    compulsory: string,
    course_order: string,
    category ?:string,
};
let defaultCourseInfo: CourseInfo = {
    comment_num: 0,
    id: 0,
    credit: 0,
    time: "未定",
    dept_name: "未定",
    dept_id: "未定",
    teacher: "未定",
    title: "未定",
    course_code: "未定",
    compulsory: "未定",
    course_order: "未定",
    category :"未定",
}

export class Course {
    info: CourseInfo = defaultCourseInfo;

    constructor(course_data: CourseInfo=defaultCourseInfo) {
        this.info = course_data;
        this.info.category = course_data.category ? course_data.category : Course.deptTransCat(this.info.dept_id, this.info.dept_name);
    }
    static deptTransCat(deptID: string, deptName: string): string {
        let category;
        switch (deptID) {
            case "A9":
                category = '通';
                break;
            case "A6":
                category = '服';
                break;
            case "A7":
                category = '國';
                break;
            case "A1":
                category = '外';
                break;
            case "A2":
                category = '體';
                break;
            default:
                category = deptName.substring(0, 1);
        }
        return category;
    }
}