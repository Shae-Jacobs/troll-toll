import { createRoutesFromElements, Route } from 'react-router-dom'

import Layout from './components/Layout'
import App from './components/App'
import Status from './components/Status'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="status" element={<Status id={1} />} />
  </Route>,
)
