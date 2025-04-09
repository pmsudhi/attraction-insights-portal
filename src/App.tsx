"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppProvider } from "./context/AppContext"
import DashboardLayout from "./components/layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import Planning from "./pages/Planning"
import Financial from "./pages/Financial"
import Revenue from "./pages/Revenue"
import Consolidation from "./pages/Consolidation"
import Executive from "./pages/Executive"
import Analytics from "./pages/Analytics"

const App = (): JSX.Element => {
  return (
    <Router>
      <AppProvider>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/consolidation" element={<Consolidation />} />
            <Route path="/executive" element={<Executive />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </DashboardLayout>
      </AppProvider>
    </Router>
  )
}

export default App;

