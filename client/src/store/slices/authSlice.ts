import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface AuthState {
  isLoggedIn: boolean
  user: { username: string } | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null
}

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async () => {
    // TODO: Replace with actual API call
    const mockUser = {
      username: "Demo User"
    }
    return mockUser
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.user = null
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload
    })
  }
})

export const { login, logout, setUser } = authSlice.actions
export default authSlice.reducer 