import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Breed, Breeds, Home } from './pages';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/breeds' element={<Breeds />} />
        <Route path='/breeds/:id' element={<Breed />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
