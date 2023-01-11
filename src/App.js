
import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { AuthContextProvier } from './components/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { UserStateContext } from './components/context/UserStateContext';


const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvier>
        <Navbar />
        <Outlet />
      </AuthContextProvier>
    </QueryClientProvider>
  );
}

export default App;
