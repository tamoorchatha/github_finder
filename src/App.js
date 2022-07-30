import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GithubProvider } from './context/github/GithubContext';

import './App.css';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <GithubProvider>
    <Router>
      <div className='flex flex-col justify-between h-screen'>
      <Navbar />

        <main className='container mx-auto px-3 pb-12'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/notFound' element={<NotFound />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        </main>
        <Footer />
    </div>
    </Router>
    </GithubProvider>
  );
}

export default App;
