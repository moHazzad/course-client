
import './App.css'
import Footer from './components/Pages/Shared/Footer';
import NavBar from './components/Pages/Shared/NavBar'
import { Outlet } from 'react-router-dom';

function App() {

  
  return (
    <>
   <div className=' bg-gradient-to-r from-pink-100 to-pink-200  z-10 text-black   '>
   <NavBar />
   </div>
    <Outlet/>
    <div >
      <Footer />
    </div>
    </>
  )
}

export default App
