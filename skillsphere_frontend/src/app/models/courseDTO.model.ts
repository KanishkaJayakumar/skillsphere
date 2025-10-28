import { User } from "./user.model";


export interface CourseDTO {
  courseTitle: string;
  courseDescription: string;
  courseVideourl: string;
  instructor: User;
}
