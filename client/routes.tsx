import { createRoutesFromElements, Route } from 'react-router-dom'

import Layout from './components/Layout'
import App from './components/App'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
  </Route>,
)
