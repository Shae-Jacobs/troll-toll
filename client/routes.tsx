import { createRoutesFromElements, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Bridges from './components/Bridges'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Bridges />} />
  </Route>,
)
