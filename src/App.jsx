import { Route, Routes, useNavigate } from "react-router-dom";
import Registr from './pages/Registr';
import Login from './pages/Login';
import Home from './pages/Home';
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function ProtectedRoute({ isAuthenticated, children }) {
    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
  }

  return (
    <div>
      <Routes>
        <Route path="/registr" element={<Registr />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute isAuthenticated={!!token}>
            <Home />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;