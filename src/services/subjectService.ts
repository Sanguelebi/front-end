import apiClient from '@/services/app.client';
import type {
    ChoosableSubjectResponse,
    Faculty,
    GetChoosableSubjectsResponse,
    GetFacultiesResponse,
    GetSubjectsParams,
    GetSubjectsResponse,
    SubjectType,
} from '@/models/api';

export async function getSubjects(params: GetSubjectsParams = {}): Promise<GetSubjectsResponse> {
    const response = await apiClient.get<GetSubjectsResponse>('/subjects', {
        params,
    });
    return response.data;
}

export async function getFaculties(): Promise<Faculty[]> {
    const response = await apiClient.get<GetFacultiesResponse>('/faculties');
    return response.data.faculties;
}

export async function getStudentChoosableSubjects(
    subjectType: SubjectType
): Promise<ChoosableSubjectResponse[]> {
    const response = await apiClient.get<GetChoosableSubjectsResponse>(
        '/student/choosable-subjects',
        {
            params: { subjectType },
        }
    );
    return response.data.subjects ?? [];
}
