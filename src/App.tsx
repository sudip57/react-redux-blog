import Layout from './components/Layout'
import AddPostForm from './features/posts/AddPostForm'
import EditPostForm from './features/posts/EditPostForm'
import PostsLists from './features/posts/PostsLists'
import SinglePostpage from './features/posts/SinglePostpage'
import { Route, Routes, Navigate } from 'react-router-dom'
import UsersList from './features/users/UserList'
import UserPage from './features/users/UserPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsLists />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostpage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
