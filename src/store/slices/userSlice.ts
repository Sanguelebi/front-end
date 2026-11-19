import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Role, StudentStatus } from '@/models/api';

export interface UserState {
    id: number;
    email: string;
    role: Role | '';
    first_name: string;
    last_name: string;
    photo_url: string;
    student_status?: StudentStatus;
}

const emptyUser: UserState = {
    id: -1,
    email: '',
    role: '',
    first_name: '',
    last_name: '',
    photo_url: '',
};

function loadStoredUser(): UserState {
    try {
        const raw = localStorage.getItem('user') ?? sessionStorage.getItem('user');
        if (!raw) return emptyUser;
        const parsed = JSON.parse(raw) as Partial<UserState>;
        if (typeof parsed.id === 'number' && parsed.id !== -1 && parsed.role) {
            return {
                ...emptyUser,
                ...parsed,
            };
        }
    } catch {
        // Ignore malformed storage
    }
    return emptyUser;
}

const initialState: UserState = loadStoredUser();

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (_state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        clearUser: () => {
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            return emptyUser;
        },
    },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
