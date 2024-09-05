import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Bridges from './components/Bridges.tsx'
import ViewBridge from './components/ViewBridge.tsx' 

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Bridges />} />
    <Route path="/bridges/:id" element={<ViewBridge />} />
  </Route>,
)
