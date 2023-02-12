
import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { AuthContextProvier } from './components/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from './components/Footer';

const queryClient = new QueryClient();
function App() {
  return (
    <AuthContextProvier>
    <QueryClientProvider client={queryClient}>
        <Navbar />
        
        <Outlet />
        <Footer/>
    </QueryClientProvider>
    </AuthContextProvier>
  );
}

export default App;
