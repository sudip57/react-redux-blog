import { NavLink, useNavigate } from 'react-router-dom'
import '../index.css'
import Blog from '/blog.png'
const Header = () => {
  const navigate = useNavigate()
  return (
    <>
      <header className="Header">
        <div
          className="flex hover:cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src={Blog} alt="" className="h-8 w-8" />
          <h1>
            Infinite<span className=" text-blue-500">Ink</span>
          </h1>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" className=" text-xl">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="post" className=" text-xl">
                Post
              </NavLink>
            </li>
            <li>
              <NavLink to="user" className=" text-xl">
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
