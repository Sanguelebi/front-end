// Backend-aligned TypeScript interfaces & types

export type Role = 'student' | 'coordinator' | 'manager' | 'admin';
export type Gender = 'male' | 'female';
export type StudentStatus = 'active' | 'inactive' | 'academicPause';
export type SubjectType = 'professional' | 'free';
export type LectureType = 'lecture' | 'seminar';

export interface Faculty {
    ID: number;
    Name: string;
    Description: string;
    PhotoURL: string | null;
}

export interface Subject {
    ID: number;
    Name: string;
    Description: string;
    Credit: number;
    FacultyID: number;
    SyllabusPdfURL: string | null;
}

export interface Lecturer {
    ID: number;
    FirstName: string;
    LastName: string;
    Description: string;
    PhotoUrl: string | null;
}

export interface SubjectGroup {
    ID: number;
    GroupNo: number;
    SubjectId: number;
    Day: number;
    From: string;
    To: string;
    MaxStudent: number;
    LectureType: LectureType;
    LecturerId: number;
    Lecturer?: Lecturer;
}

// Auth
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginUser {
    id: number;
    email: string;
    role: Role;
    first_name: string;
    last_name: string;
    photo_url: string;
    student_status?: StudentStatus;
}

export interface LoginResponse {
    message: string;
    user: LoginUser;
}

// Users (Admin)
export interface User {
    id: number;
    email: string;
    role: Role;
    first_name: string;
    last_name: string;
    gender: Gender;
    personal_no: string;
    phone_number: string;
    photo_url: string;
    student_status: StudentStatus | null;
    faculty_id: number | null;
}

export interface RegisterUserRequest {
    email: string;
    password: string;
    role: Role;
    first_name: string;
    last_name: string;
    gender: Gender;
    personal_no: string;
    phone_number: string;
    photo_url: string;
    student_status?: StudentStatus;
}

export type EditUserRequest = Partial<Omit<RegisterUserRequest, 'password'>>;

// Subjects & Faculties
export interface GetSubjectsParams {
    faculty?: number | string;
    name?: string;
    page?: number;
    page_size?: number;
}

export interface GetSubjectsResponse {
    message: string;
    subjects: Subject[];
    has_more: boolean;
}

export interface GetFacultiesResponse {
    faculties: Faculty[];
}

// Student Choosable Subjects & Priorities
export interface ChoosableSubjectResponse {
    subjectData: Subject;
    subjectGroups: SubjectGroup[];
}

export interface GetChoosableSubjectsResponse {
    message: string;
    subjects: ChoosableSubjectResponse[];
}

export interface StudentPriority {
    id: number;
    priority: number;
    slot_id: number;
    subject_group_id: number;
    student_id: number;
    confirm: boolean;
    subject_type: SubjectType;
}

export interface GetPrioritiesResponse {
    message: string;
    priorities: StudentPriority[];
}

export interface PriorityRequest {
    subject_group_id: number;
    slot_id: number;
    subject_type: SubjectType;
}

export interface StudentSubjectAllowance {
    student_id: number;
    professional_subject_allowance: number;
    free_subject_allowance: number;
    semester: number;
}

export interface GetStudentAllowanceResponse {
    message: string;
    allowance: StudentSubjectAllowance;
}

export interface GetCoordinatorPrioritiesResponse {
    message: string;
    data: StudentPriority[];
}

// Manager Overview
export interface SubjectGroupOverview {
    group_id: number;
    group_no: number;
    student_ids: number[];
    amount_of_students: number;
    max_amount: number;
}

export interface SubjectStudentOverviewResponse {
    subject: Subject;
    subject_groups: SubjectGroupOverview[];
}

export interface GetSubjectStudentOverviewResponse {
    message: string;
    overview: SubjectStudentOverviewResponse[];
}

