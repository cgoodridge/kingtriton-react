import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            email: "",
            uid: "",
            displayName: "",
            photoURL: ""
        },
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        updateProfile:(state, action) => {
            console.log("Payload is ", action.payload);
            state.user.photoURL = action.payload.photoURL;
            console.log("user after payload is ", state.user);
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

export const { login, logout, updateProfile } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;