import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { ReactElement } from 'react'

const PostAuthor = ({
  userId,
}: {
  userId: string | number | undefined
}): ReactElement => {
  const users = useSelector(selectAllUsers)
  const author = users.find((user) => user.id === userId)
  return <span className="">by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor
