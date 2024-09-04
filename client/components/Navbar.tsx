import RedirectList from './RedirectList'
import Logo from './Logo'
import Login from './Login'
export default function Navbar() {
  return (
    <div className="navbar grid grid-cols-[10rem_1fr_auto] place-items-center ">
      <Logo />
      <RedirectList />
      <Login />
    </div>
  )
}
