import apiClient from '@/services/app.client';
import type { GetCoordinatorPrioritiesResponse, StudentPriority } from '@/models/api';

export async function getCoordinatorStudentPriorities(): Promise<StudentPriority[]> {
    const response = await apiClient.get<GetCoordinatorPrioritiesResponse>(
        '/coordinator/student-priorities'
    );
    return response.data.data ?? [];
}

export async function toggleConfirmSubject(priorityId: number): Promise<void> {
    await apiClient.post('/coordinator/confirm-subject', null, {
        params: { id: priorityId },
    });
}

