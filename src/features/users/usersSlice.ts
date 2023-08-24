import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

type Item = {
  id: number | string
  name: string
  userId: string
}

type initState = Item[]

const initialState: initState = []

export const fetchUsers = createAsyncThunk('posts/fetchUsers', async () => {
  const response = await axios.get(USERS_URL)
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (_state, action) => {
      return action.payload
    })
  },
})

export const selectAllUsers = (state: RootState) => state.users

export const selectUserById = (state: RootState, userId: string) =>
  state.users.find((user) => user.id === userId)
export default usersSlice.reducer
