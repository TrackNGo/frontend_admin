import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Login from "../auth/Login"
import ChangePassword from "../auth/ChangePassword"
import CreateAccount from "../auth/CreateAccount"
import AddBus from "../addBus/AddBus"
import AddRoutes from "../addRoutes/AddRoutes"
import Dashboard from "../dashboard/Dashboard"

const Testing = () => {
  return (
    <div>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ul>
          <Link to="/"><li>dashboard</li></Link>
          <Link to="/login"><li>login</li></Link>
          <Link to="/changepassword"><li>changepassword</li></Link>
          <Link to="/createaccount"><li>createaccount</li></Link>
          <Link to="/addbus"><li>addbus</li></Link>
          <Link to="/addbusroute"><li>addbusroute</li></Link>
        </ul>
        <hr />
        <br />
        <hr />
        <br />
        <hr />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/changepassword' element={<ChangePassword />} />
          <Route path='/createaccount' element={<CreateAccount />} />
          <Route path='/addbus' element={<AddBus />} />
          <Route path='/addbusroute' element={<AddRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Testing
