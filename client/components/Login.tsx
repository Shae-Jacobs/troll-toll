import { useAuth0 } from '@auth0/auth0-react'
import IsAuthenticated from './IsAuthenticated'
import NotAuthenticated from './NotAuthenticated'

function UserAuthArea() {
  const { loginWithRedirect, logout, user } = useAuth0()
  const handleLogOut = () => logout()
  const handleLogIn = () => loginWithRedirect()

  return (
    <>
      <IsAuthenticated>
        <button onClick={handleLogOut}>Log Out</button>
        <div>
          <p>{user?.name}</p>
        </div>
      </IsAuthenticated>
      <NotAuthenticated>
        <button onClick={handleLogIn}>Log In</button>
      </NotAuthenticated>
    </>
  )
}

export default UserAuthArea
