import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage'
import ContactPage from './pages/contactPage';
import ServicePage from './pages/servicePage';
import AboutUsPage from './pages/aboutUs';
import Portfolio from './pages/portfolio';
import ChatPage from './pages/chatPage';
import ChatAdmin from './pages/AdminChat';
function App() {
  return (
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          <Route path='/services' element={<ServicePage/>}/>
          <Route path='/about' element={<AboutUsPage/>}/>
          <Route path='/portfolio' element={<Portfolio/>}/>
          <Route path='/chat' element={<ChatPage/>}/>
          <Route path='/admin-chat' element={<ChatAdmin/>}/>
          {/* Add more routes as needed */}
        </Routes>

     </BrowserRouter>
     
  )
}
export default App;
