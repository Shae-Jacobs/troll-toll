import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="page grid min-h-[100svh] grid-rows-[auto_1fr_auto]">
      <header>
        <Navbar />
        <h1 className="text-white">.</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  )
}
