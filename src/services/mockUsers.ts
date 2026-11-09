import type { UserState } from '@/store/slices/userSlice';

// Delete this later when connectd to the DB.

export interface MockUser extends UserState {
    password?: string;
}

export const MOCK_USERS: MockUser[] = [
    {
        id: 1,
        email: 'mariammikava@sangu.edu.ge',
        password: 'password123',
        role: 'student',
        first_name: 'მარიამ',
        last_name: 'მიქავა',
        photo_url: '',
        student_status: 'Active',
    },
    {
        id: 2,
        email: 'coordinator@sangu.edu.ge',
        password: 'password123',
        role: 'coordinator',
        first_name: 'გიორგი',
        last_name: 'ბერიძე',
        photo_url: '',
    },
    {
        id: 3,
        email: 'programhead@sangu.edu.ge',
        password: 'password123',
        role: 'program_head',
        first_name: 'დავით',
        last_name: 'კურცხალია',
        photo_url: '',
    },
    {
        id: 4,
        email: 'admin@sangu.edu.ge',
        password: 'password123',
        role: 'admin',
        first_name: 'ადმინისტრატორი',
        last_name: 'სისტემის',
        photo_url: '',
    },
];

export const findMockUser = (email: string): UserState => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = MOCK_USERS.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
        const { password: _, ...userData } = existing;
        return userData;
    }

    if (cleanEmail.includes('admin')) {
        return {
            id: 4,
            email: cleanEmail,
            role: 'admin',
            first_name: 'ადმინი',
            last_name: '',
            photo_url: '',
        };
    }

    if (cleanEmail.includes('coord')) {
        return {
            id: 2,
            email: cleanEmail,
            role: 'coordinator',
            first_name: 'კოორდინატორი',
            last_name: '',
            photo_url: '',
        };
    }

    if (cleanEmail.includes('head') || cleanEmail.includes('lead') || cleanEmail.includes('prog')) {
        return {
            id: 3,
            email: cleanEmail,
            role: 'program_head',
            first_name: 'პროგრამის',
            last_name: 'ხელმძღვანელი',
            photo_url: '',
        };
    }

    // Default to student
    return {
        id: 1,
        email: cleanEmail || 'mariammikava@sangu.edu.ge',
        role: 'student',
        first_name: 'მარიამ',
        last_name: 'მიქავა',
        photo_url: '',
        student_status: 'Active',
    };
};
