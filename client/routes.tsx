import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Bridges from './components/Bridges.tsx'

export default createRoutesFromElements(
  <Route element={<Layout />}>
    <Route index element={<Bridges />} />
  </Route>,
)
