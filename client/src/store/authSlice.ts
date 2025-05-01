import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Cookie from "universal-cookie"

const cookie = new Cookie()

interface User {
  username: string
  email: string
}

interface AuthState {
  value: {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean;
  }
}

const initialState: AuthState = {
  value: {
    user: null,
    isLoading: true,
    isAuthenticated: !!cookie.get("session_token"),
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value.user = action.payload;
      state.value.isLoading = false;
      state.value.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.value.user = null;
      state.value.isLoading = false;
      state.value.isAuthenticated = false;
    }
  }
})

export const {setUser, clearUser} = authSlice.actions

export default authSlice.reducer
