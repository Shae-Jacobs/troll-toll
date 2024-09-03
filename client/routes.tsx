import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
export default createRoutesFromElements(<Route index element={<Layout />} />)
