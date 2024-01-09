import { Teacher } from "./teacher";

export class Course{
    id?: number;
    name!: string;
    level!: string;
    schoolYear!: string;
    teacherId?: number;
    //teacher!: Teacher;
}
