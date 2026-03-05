import { Routes, Route } from 'react-router-dom'
import Sidebar from '../dashboard/Sidebar'
import DashboardHome from '../pages/dashboard/DashboardHome'
import UploadPage from '../pages/dashboard/UploadPage'
import VitalsPage from '../pages/dashboard/VitalsPage'
import TimelinePage from '../pages/dashboard/TimelinePage'

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 w-0 min-w-0 lg:p-8 p-4 pt-20 lg:pt-8">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="vitals" element={<VitalsPage />} />
          <Route path="timeline" element={<TimelinePage />} />
        </Routes>
      </main>
    </div>
  )
}

export default DashboardPage