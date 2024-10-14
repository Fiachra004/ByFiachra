import { Route, Routes } from 'react-router-dom';
import NavBar from '/src/components/NavBar.jsx';
import Footer from '/src/components/Footer.jsx';
import AboutMe from '/src/pages/AboutMe.jsx';
import HomePage from '/src/pages/HomePage.jsx';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<AboutMe />} />
        <Route path='/HomePage' element={<HomePage />} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App
