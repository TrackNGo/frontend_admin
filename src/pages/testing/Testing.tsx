import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../auth/Login"
import ChangePassword from "../auth/ChangePassword"
import CreateAccount from "../auth/CreateAccount"
import AddBus from "../addBus/AddBus"
import AddRoutes from "../addRoutes/AddRoutes"

const Testing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/changepassword' element={<ChangePassword />}/>
          <Route path='/createaccount' element={<CreateAccount />}/>
          <Route path='/addbus' element={<AddBus />}/>
          <Route path='/addbusroute' element={<AddRoutes />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Testing
