export interface Reactions {
  thumbsUp: number
  wow: number
  heart: number
  rocket: number
  coffee: number
}

export interface Item {
  id: string
  title: string
  content: string
  date: string
  userId: number
  reactions: Reactions
}

export interface PostsState {
  posts: Item[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

export interface Post {
  id: number
}
