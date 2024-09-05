import Nav from './Nav'
import Logo from './Logo'
import UserAuthArea from './UserAuthArea'
import AddFavourite from './AddFavourite'
export default function Navbar() {
  return (
    <div className="navbar grid min-h-24 grid-cols-[auto_1fr_auto] items-center gap-16 bg-accent-bg px-16 py-4">
      <Logo />
      <AddFavourite/>
      <Nav />
      <UserAuthArea />
    </div>
  )
}
