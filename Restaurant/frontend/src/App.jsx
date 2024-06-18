import './App.css';
import { Login } from './components/login/login.jsx';
import { Home } from './components/home/home.jsx';
import { Navbar } from './components/navbar/navbar.jsx';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Reserva } from './components/reserva/reserva.jsx';
import { CreateReserva } from './components/reserva/createReserva.jsx';
import { CreatePedido } from './components/pedido/createPedido.jsx';
import { Registro } from './components/registro/registro.jsx';
import { Mesa } from './components/mesa/mesa.jsx';
import { Menu } from './components/menu/menu.jsx';
import { UpdateReserva } from './components/reserva/updateReserva.jsx';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          <Route element={<LayoutWithNavbar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/reserva/:id" element={<Reserva />} />
            <Route path="/mesas/:mode/:idReserva" element={<Mesa />} />
            <Route path="/menus/:idReserva" element={<Menu />} />
          </Route>

          <Route path="/reserva/create" element={<CreateReserva />} />
          <Route path="/reserva/update/:idReserva" element={<UpdateReserva />} />
          <Route path="/pedido/create/:idReserva" element={<CreatePedido />} />
          

        </Routes>
      </BrowserRouter>
    </div>
  )
}

function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
