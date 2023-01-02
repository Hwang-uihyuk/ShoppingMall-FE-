
import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { AuthContextProvier } from './components/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <QueryClientProvider client={QueryClient}>
    <AuthContextProvier>
    <Navbar/>
    <Outlet/>
    </AuthContextProvier>
    </QueryClientProvider>
  );
}

export default App;
