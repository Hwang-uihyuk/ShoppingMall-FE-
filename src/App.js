
import './App.css';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import { Outlet } from 'react-router-dom';
import { AuthContextProvier } from './components/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvier>
        <Navbar/>
        <Categories/>
        <Outlet/>
      </AuthContextProvier>
    </QueryClientProvider>
  );
}

export default App;
