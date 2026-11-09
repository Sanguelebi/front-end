import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    id: number;
    email: string;
    role: string;
    first_name: string;
    last_name: string;
    photo_url: string;
    student_status?: string;
}

const initialState: UserState = {
    id: -1,
    email: '',
    role: '',
    first_name: '',
    last_name: '',
    photo_url: '',
};

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
        clearUser: () => initialState,
    },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

