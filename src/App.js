
import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from './components/Footer';

const queryClient = new QueryClient();
function App() {
  return (
<<<<<<< Updated upstream
    
    <QueryClientProvider client={queryClient}>      
    
        <Navbar />
                
        <Outlet />
        <Footer/>
     
=======
    <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
>>>>>>> Stashed changes
    </QueryClientProvider>
    
  );
}

export default App;
