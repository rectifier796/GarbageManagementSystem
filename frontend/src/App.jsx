

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import UserDashBoard from './pages/Dashboards/Userdashboard/UserDashBoard'
import DashboardLayout from './components/DashboardLayout'
import Hotspot from './pages/Dashboards/Userdashboard/Hotspot'
import RequestPickup from './pages/Dashboards/Userdashboard/RequestPickup'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
       

          <Route path="/user-dashboard" element={
            <DashboardLayout>
            <UserDashBoard/>
            </DashboardLayout>}/>
          <Route path="/add-hotspot" element={
            <DashboardLayout>
            <Hotspot />
            </DashboardLayout>}/>
          <Route path="/request-pickup" element={
            <DashboardLayout>
            <RequestPickup />
            </DashboardLayout>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
