import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeWrapper } from './theme';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <ThemeWrapper>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeWrapper>
  );
}

export default App;
