import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { sub } from 'date-fns'
import axios from 'axios'

const POSTS_URL: string = 'https://jsonplaceholder.typicode.com/posts'

const postsAdapter = createEntityAdapter<Item>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})
interface Reactions {
  thumbsUp: number
  wow: number
  heart: number
  rocket: number
  coffee: number
}

interface Item {
  posts: string
  id: string
  title: string
  content: string
  date: string
  userId: number | string
  body: string
  reaction: Record<string, number>
  reactions: Record<string, number>
  message: string
}

interface PostsState extends EntityState<Item> {
  posts: Item[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  entity: { [key: string]: Item }
}

const initialState: PostsState = postsAdapter.getInitialState({
  entities: {},
  posts: [],
  status: 'idle',
  error: null,
  entity: {},
})

export const fetchPosts = createAsyncThunk<Item[], void>(
  'posts/fetchPosts',
  async () => {
    const response = await axios.get<Item[]>(POSTS_URL)
    return [...response.data]
  },
)

export const addNewPost = createAsyncThunk<Item, Partial<Item>>(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
  },
)

export const updatePost = createAsyncThunk<Item, Partial<Item>>(
  'posts/updatePost',
  async (initialPost) => {
    const { id } = initialPost
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
      return response.data
    } catch (err) {
      // return err.message
      return initialPost // only for testing Redux!
    }
  },
)

export const deletePost = createAsyncThunk<Item, Partial<Item>>(
  'posts/deletePost',
  async (initialPost) => {
    const { id } = initialPost
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`)
      if (response?.status === 200) return initialPost
      return `${response?.status}: ${response?.statusText}`
    } catch (err: any) {
      return err.message
    }
  },
)

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: keyof Reactions }>,
    ) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        let min = 1
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          }
          return post
        })

        postsAdapter.upsertMany(state, loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
          ? action.error.message
          : 'Unknown error'
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId)
        action.payload.date = new Date().toISOString()
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        }
        console.log(action.payload)
        postsAdapter.addOne(state, action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update could not complete')
          console.log(action.payload)
          return
        }
        action.payload.date = new Date().toISOString()
        postsAdapter.upsertOne(state, action.payload)
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Delete could not complete')
          console.log(action.payload)
          return
        }
        const { id } = action.payload
        postsAdapter.removeOne(state, id)
      })
  },
})

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: RootState) => state.posts)

export const getPostStatus = (state: RootState) => state.posts.status
export const getpostError = (state: RootState) => state.posts.error

// accepts one or more input functions
export const selectByUser = createSelector(
  [selectAllPosts, (_state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId),
)

export const { reactionAdded } = postSlice.actions

export default postSlice.reducer
