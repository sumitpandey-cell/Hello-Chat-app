import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        selectedUser: null,
        allUsers: [],
        online: [],
        socketConnection: null,
        darkMode: false
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
        setAllUsers: (state, action) => {
            state.allUsers = Array.isArray(action.payload) ? action.payload : [];
        },
        setOnline: (state, action) => {
            state.online = action.payload
        },
        setSocketConnection: (state, action) => {
            state.socketConnection = action.payload
        },
        setDarkMode: (state, action) => {
            state.darkMode = action.payload
        }
    }
})

export const { setCurrentUser, setSelectedUser, setAllUsers, setOnline, setSocketConnection, setDarkMode } = userSlice.actions

export default userSlice.reducer

