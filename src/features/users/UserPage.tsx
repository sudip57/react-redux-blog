import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'
import { Link, useParams } from 'react-router-dom'
import { selectByUser } from '../posts/postSlice'
import { RootState } from '../../app/store'
import { ReactElement } from 'react'

const UserPage = (): ReactElement => {
  const { userId } = useParams()

  const user = useSelector((state: RootState) =>
    selectUserById(state, Number(userId)),
  )

  const postsForUser = useSelector((state: RootState) =>
    selectByUser(state, Number(userId)),
  )

  const postTitles = postsForUser.map((post) => (
    <li
      key={post.id}
      className="bg-white mb-3 p-2 rounded-md shadow-sm hover:shadow-xl"
    >
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{postTitles}</ol>
    </section>
  )
}

export default UserPage
