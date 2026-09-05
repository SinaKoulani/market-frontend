import './App.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Home from './pages/public/Home'
import Login from './pages/public/Login'
import Signup from './pages/public/Signup'
import Products from './pages/public/Products'
import Cart from './pages/user/Cart'
import MainLayout from './components/layouts/MainLayout'
import AdminLayout from './components/layouts/AdminLayout'
import AllOrders from './pages/admin/AllOrders'
import AdminProducts from './pages/admin/Products'
import Orders from './pages/user/Orders'
import OrderDetail from './pages/user/OrderDetail'
import Payment from './pages/user/Payment'
import NotFound from './pages/public/NotFound'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <MainLayout/>}>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/products' element={<Products />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/orders' element={<Orders />}/>
          <Route path='/orders/:id' element={<OrderDetail />}/>
          <Route path='/payment/:id' element={<Payment />}/>

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path='/admin' element={<AdminLayout/>}>
          <Route path=' 'element={<AllOrders/>}/>
          <Route path='products'element={<AdminProducts/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App