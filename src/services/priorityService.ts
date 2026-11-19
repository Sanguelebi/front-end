import apiClient from '@/services/app.client';
import type {
    GetPrioritiesResponse,
    GetStudentAllowanceResponse,
    PriorityRequest,
    StudentPriority,
    StudentSubjectAllowance,
} from '@/models/api';

export async function getStudentPriorities(): Promise<StudentPriority[]> {
    const response = await apiClient.get<GetPrioritiesResponse>('/priority');
    return response.data.priorities ?? [];
}

export async function addStudentPriority(payload: PriorityRequest): Promise<void> {
    await apiClient.post('/priority', payload);
}

export async function deleteStudentPriority(priorityId: number): Promise<void> {
    await apiClient.delete(`/priority/${priorityId}`);
}

export async function getStudentAllowance(): Promise<StudentSubjectAllowance | null> {
    try {
        const response = await apiClient.get<GetStudentAllowanceResponse>(
            '/student/subject-allowance'
        );
        return response.data.allowance;
    } catch {
        return null;
    }
}

