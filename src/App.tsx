import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAppStore } from './stores/appStore'
import { AppLayout } from './components/layout/AppLayout'
import LandingPage from './pages/Landing/index'
import OnboardingPage from './pages/Onboarding/index'
import DashboardPage from './pages/Dashboard/index'
import ChatPage from './pages/Chat/index'
import JournalPage from './pages/Journal/index'
import CheckInPage from './pages/Dashboard/CheckIn'
import WellnessPage from './pages/Support/Wellness'
import SupportPage from './pages/Support/index'
import PrivacyPage from './pages/Privacy/index'
import SettingsPage from './pages/Settings/index'

function AppRoutes() {
  const { onboardingComplete } = useAppStore()

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route
        path="/dashboard"
        element={
          onboardingComplete ? (
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          ) : (
            <Navigate to="/onboarding" replace />
          )
        }
      />
      <Route
        path="/chat"
        element={
          <AppLayout>
            <ChatPage />
          </AppLayout>
        }
      />
      <Route
        path="/journal"
        element={
          <AppLayout>
            <JournalPage />
          </AppLayout>
        }
      />
      <Route
        path="/checkin"
        element={
          <AppLayout>
            <CheckInPage />
          </AppLayout>
        }
      />
      <Route
        path="/wellness"
        element={
          <AppLayout>
            <WellnessPage />
          </AppLayout>
        }
      />
      <Route
        path="/support"
        element={
          <AppLayout>
            <SupportPage />
          </AppLayout>
        }
      />
      <Route
        path="/privacy"
        element={
          <AppLayout>
            <PrivacyPage />
          </AppLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <AppLayout>
            <SettingsPage />
          </AppLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-center" />
    </BrowserRouter>
  )
}
