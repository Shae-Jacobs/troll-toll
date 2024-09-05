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
            <div className="grid grid-cols-[auto_1fr] grid-rows-2 items-center gap-x-2 gap-y-0">
              <img
                src={user?.picture}
                alt={user?.nickname}
                className="row-span-2 size-8 rounded-full"
              ></img>
              <p>{user?.name}</p>
              <p className="text-xs">View Trollfile</p>
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
        <button className="primary_button" onClick={handleLogIn}>
          Log In
        </button>
      </NotAuthenticated>
    </>
  )
}

export default UserAuthArea
