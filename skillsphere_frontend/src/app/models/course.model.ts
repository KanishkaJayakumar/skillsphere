import { User } from "./user.model";


export interface Course {
  courseId: number;
  courseTitle: string;
  courseDescription: string;
  courseVideourl: string;
  instructor: User;
}
