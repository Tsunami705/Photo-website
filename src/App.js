import React from 'react';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import { Routes,Route } from 'react-router-dom';
import "./styles/style.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        {/* exact表示routing的url一定要完全符合这个/ ，后面不能加上任何字*/}
        <Route path='/' element={<Homepage />} exact />
        <Route path='/about' element={<About />} exact />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
