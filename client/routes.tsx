import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Bridges from './components/Bridges.tsx'
import ViewBridge from './components/ViewBridge.tsx'
import RegTrollfile from './components/RegTrollfile'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Bridges />} />
    <Route path="/bridges/:id" element={<ViewBridge />} />
    <Route path="/trollfile" element={<RegTrollfile />} />
  </Route>,
)
