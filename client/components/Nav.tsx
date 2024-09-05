import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <div className="flex justify-start gap-4">
      <NavLink to="/infopage" className="px-4 py-2">
        About
      </NavLink>
    </div>
  )
}
