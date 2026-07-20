import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            email: "",
            uid: "",
            displayName: ""

        },
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        updateProfile:(state, action) => {
            state.user.photoURL = action.payload.photoURL;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

export const { login, logout, updateProfile } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;