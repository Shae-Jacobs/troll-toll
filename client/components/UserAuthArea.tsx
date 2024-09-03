import { useAuth0 } from '@auth0/auth0-react'

function UserAuthArea() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, error, user } =
    useAuth0()
  const handleLogOut = () => logout()
  const handleLogIn = () => loginWithRedirect()

  let outlet

  if (!isAuthenticated) {
    outlet = <button onClick={handleLogIn}>Log In</button>
  }

  if (isAuthenticated) {
    outlet = (
      <>
        <button onClick={handleLogOut}>Log Out</button>
        <div>
          <p>{user?.name}</p>
        </div>
      </>
    )
  }

  return <>{outlet}</>
}

export default UserAuthArea
