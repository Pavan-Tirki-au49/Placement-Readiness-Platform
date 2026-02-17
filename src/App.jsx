import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import { Practice, Assessments, Resources, Profile } from './pages/Pages';
import JDAnalysisInput from './pages/analyzer/JDAnalysisInput';
import JDResult from './pages/analyzer/JDResult';
import JDHistory from './pages/analyzer/JDHistory';
import TestChecklist from './pages/TestChecklist';
import ShipLock from './pages/ShipLock';
import ProofPage from './pages/ProofPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Shell */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="practice" element={<Practice />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="resources" element={<Resources />} />
          <Route path="profile" element={<Profile />} />

          {/* Analysis Routes */}
          <Route path="analysis" element={<JDAnalysisInput />} />
          <Route path="analysis/result/:id" element={<JDResult />} />
          <Route path="history" element={<JDHistory />} />
        </Route>

        {/* Pre-Ship Routes */}
        <Route path="/prp/07-test" element={<TestChecklist />} />
        <Route path="/prp/08-ship" element={<ShipLock />} />
        <Route path="/prp/proof" element={<ProofPage />} />

        {/* Catch-all to 404 or redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
