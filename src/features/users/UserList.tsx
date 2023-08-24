import { useSelector } from 'react-redux'
import { selectAllUsers } from './usersSlice'
import { Link } from 'react-router-dom'
import { ReactElement } from 'react'

const UsersList: React.FC = (): ReactElement => {
  const users = useSelector(selectAllUsers)

  const renderedUsers = users.map((user) => (
    <li
      key={user.id}
      className="bg-white mb-3 p-2 rounded-md shadow-sm hover:shadow-xl"
    >
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ))

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  )
}

export default UsersList
