import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="page grid min-h-[100svh] grid-rows-[auto_1fr_auto]">
      <header>
<<<<<<< HEAD
        <Navbar />
||||||| merged common ancestors
        <h1>Large Thumb Digital</h1>
=======
        <h1>Troll.bridge.app</h1>
>>>>>>> 249f9b3fba777a33d2201e5962f2a2110cfbe05c
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  )
}
