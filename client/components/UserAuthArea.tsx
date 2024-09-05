import { useAuth0 } from '@auth0/auth0-react'
import IsAuthenticated from './IsAuthenticated'
import NotAuthenticated from './NotAuthenticated'
import { Link } from 'react-router-dom'

function UserAuthArea() {
  const { loginWithRedirect, logout, user } = useAuth0()
  const handleLogOut = () => logout()
  const handleLogIn = () => loginWithRedirect()

  return (
    <>
      <IsAuthenticated>
        <div className="user-auth-area flex gap-4">
          <Link to="/trollfile">
            <div className="flex items-center gap-2">
              <img
                src={user?.picture}
                alt={user?.nickname}
                className="size-8 rounded-full"
              ></img>
              <p>{user?.name}</p>
            </div>
          </Link>
          <button
            className="button rounded-lg bg-accent-1 px-4 py-2"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      </IsAuthenticated>
      <NotAuthenticated>
        <button
          className="button rounded-lg bg-accent-4 px-4 py-2 text-white"
          onClick={handleLogIn}
        >
          Log In
        </button>
      </NotAuthenticated>
    </>
  )
}

export default UserAuthArea
