import { User } from './user.model';
import { Course } from './course.model';

export interface Enrollment {
  enrollmentId: number;
  student: User;
  course: Course;
  progress: number;
  completed: boolean;
  certificateUrl?: string;
}
