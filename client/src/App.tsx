import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css'
import Home from './pages/Home';
import Result from './pages/Result';
import BuyCredit from './pages/BuyCredit';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {


  return (
      <div className='min-h-screen bg-slate-50'>

 
          <BrowserRouter>
              <Navbar />
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/result" element={<Result />} />
                  <Route path="/buy" element={<BuyCredit/>} />
              </Routes>
              <Footer/>
               </BrowserRouter>
       </div>
  )
}

export default App
