import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from './app/store';
import theme from './theme/theme';
import AppRoutes from './routes/AppRoutes'; // We will create this next
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Ensures baseline CSS resets and applies background color */} 
        <Router>
          <AppRoutes /> {/* Component defining all application routes */} 
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
