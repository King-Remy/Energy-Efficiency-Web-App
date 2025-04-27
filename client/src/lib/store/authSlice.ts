import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface User {
  username: string
  email: string
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async () => {
    // TODO: Replace with actual API call
    const mockUser = {
      username: "Demo User",
      email: "demo@example.com",
    }
    return mockUser
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch user profile"
      })
  },
})

export default authSlice.reducer 