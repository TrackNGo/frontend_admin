import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Login from "../auth/Login"
import ChangePassword from "../auth/ChangePassword"
import CreateAccount from "../auth/CreateAccount"
import AddBus from "../bus/AddBus"
import AddBusRoutes from "../bus/AddBusRoutes"
import Dashboard from "../dashboard/Dashboard"
import ManageTimeTable from "../timeTable/ManageTimeTable"
import ViewTimeTable from "../timeTable/ViewTimeTable"
import Bus from "../bus/Bus"
import ViewBuses from "../bus/ViewBuses"
import BusDetail from "../bus/BusDetail"
import BusSearch from "../bus/BusSearch"
import Header from "../../components/header/Header"
import EditTimeTable from "../timeTable/EditTimeTable"

const Testing = () => {
  return (
    <div>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header/>

        <ul>
          <Link to="/"><li>dashboard</li></Link>
          <Link to="/login"><li>login</li></Link>

          <Link to="/account"><li>account</li></Link>
          <Link to="/account/changepassword"><li>changepassword</li></Link>
          <Link to="/account/createaccount"><li>createaccount</li></Link>

          <Link to="/bus"><li>bus</li></Link>
          <Link to="/bus/view"><li>bus search</li></Link>
          <Link to="/bus/buses"><li>buses</li></Link>
          <Link to="/bus/addbus"><li>addbus</li></Link>
          <Link to="/bus/addbusroute"><li>addbusroute</li></Link>

          <Link to="/timetable"><li>time table</li></Link>
          <Link to="/timetable/view"><li>view time table</li></Link>
          <Link to="/timetable/add"><li>time table add</li></Link>
        </ul>
        <hr />
        <br />
        <hr />
        <br />
        <hr />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />

          {/* <Route path='/account/' element={< />} /> account*/}
          <Route path='/account/changepassword' element={<ChangePassword />} />
          <Route path='/account/createaccount' element={<CreateAccount />} />

          <Route path='/bus' element={<Bus />} />
          <Route path='/bus/addbus' element={<AddBus />} />
          <Route path='/bus/buses' element={<ViewBuses />} />
          <Route path='/bus/view' element={<BusSearch />} />
          <Route path='/bus/view/:busNumber' element={<BusDetail />} />
          <Route path='/bus/addbusroute' element={<AddBusRoutes />} />

          {/* <Route path='/timetable' element={</>} /> timetable*/}
          <Route path='/timetable/view' element={<ViewTimeTable/>} />
          <Route path='/timetable/view/:id' element={<EditTimeTable/>} />
          <Route path='/timetable/add' element={<ManageTimeTable/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Testing
