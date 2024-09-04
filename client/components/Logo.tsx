import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="">
      <img
        src="/images/light-troll-logo.png"
        alt="troll toll logo"
        className="h-12"
      ></img>
    </Link>
  )
}
