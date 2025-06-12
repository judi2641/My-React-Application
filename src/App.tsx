import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { StartPage } from './components/StartPage';
import { selectCurrentUserID } from './features/authSlice';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userID = useSelector(selectCurrentUserID);
  
  if (!userID) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  const userID = useSelector(selectCurrentUserID);
  console.log("Aktueller User:", userID);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <StartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
