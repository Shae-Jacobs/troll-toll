import { NavLink } from 'react-router-dom'
import IsAuthenticated from './IsAuthenticated'

export default function Nav() {
  return (
    <div className="flex justify-start gap-4">
      <NavLink to="/" className="px-4 py-2">
        All Bridges
      </NavLink>
      <IsAuthenticated>
        <NavLink to="/" className="px-4 py-2">
          Dashboard
        </NavLink>
      </IsAuthenticated>
    </div>
  )
}
