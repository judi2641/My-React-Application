import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../state/store";

export interface AuthState{
    userID: string | null
    token: string
    pending: boolean
    error: string| null
}

const initialState: AuthState = {
    userID: null,
    token: "",
    pending: false,
    error: null
}
const date = new Date();
console.log("initialState loaded: ", initialState, date.getMinutes(), date.getSeconds());

export const login = createAsyncThunk(
    "auth",
    async (credentials: {userID: string, password: string }) => {
        const credentialsString = `${credentials.userID}:${credentials.password}`
        const encoded = btoa(credentialsString);
        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: "GET",
            headers: { "Authorization" : `Basic ${encoded}`},
        });
        console.log(response)
        const token = response.headers.get("Authorization")
        if(!token){
            return Promise.reject(new Error("Login fehlgeschlagen"));
        }
        return {
            userID: credentials.userID,
            token: token
        }
        
    })

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.userID = null;
            state.token = "";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.pending = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{userID: string; token: string}>) => {
                state.pending = false;
                state.userID = action.payload.userID;
                state.token = action.payload.token;
                console.log(`user: ${state.userID} succesfull logged in`)
            })
            .addCase(login.rejected, (state, action) => {
                state.pending = false;
                state.userID = null;
                state.token = "";
                state.error = action.error.message ?? "Unkown error";
            })
    }
})

export const selectCurrentUserID = (state: RootState) => state.auth.userID;

export const selectPending = (state: RootState) => state.auth.pending

export const logout = authSlice.actions.logout;

export default authSlice.reducer;