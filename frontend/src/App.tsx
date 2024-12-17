import React from 'react';
import AppRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const App: React.FC = () => {
    return (
      <Router>  
      <div>
        <Navbar /> 
        <AppRoutes /> 
        <Footer /> 
      </div>
    </Router>
    );
};

export default App;
