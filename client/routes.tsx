import { createRoutesFromElements, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Bridges from './components/Bridges'
import RegTrollfile from './components/RegTrollfile'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Bridges />} />
    <Route path="/trollfile" element={<RegTrollfile />} />
  </Route>,
)
