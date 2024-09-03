import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  children: React.ReactNode
}

function IsAuthenticated(props: Props) {
  const { isAuthenticated } = useAuth0()
  const { children } = props

  return isAuthenticated ? <>{children}</> : null
}

export default IsAuthenticated
