import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { db } from '../firebaseConfigFile';

export const getMenu = createAsyncThunk(
    'menu',
    // async () => {
    //     return db
    //         .collection('menu')
    //         .onSnapshot(snapshot => (
    //             setMenuItems(snapshot.docs.map(doc => ({
    //                 id: doc.id,
    //                 data: doc.data()
    //             })))
    //         ))
    // }

);

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menu: [],
        status: null,
    },
    extraReducers: {
        [getMenu.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getMenu.fulfilled]: (state, { payload }) => {
            state.menu = payload
            state.status = 'success'
        },
        [getMenu.rejected]: (state, action) => {
            state.status = 'failed'
        },
    }
});

export default menuSlice.red