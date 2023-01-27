
import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { AuthContextProvier } from './components/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
function App() {
  return (
    <AuthContextProvier>
    
        <Navbar />
        <Outlet />
    
    </AuthContextProvier>
  );
}

export default App;
