import { BrowserRouter, Route, Routes } from "react-router-dom"
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
import TimeTable from "../timeTable/TimeTable"
import Account from "../account/Account"
import ViewAccount from "../account/ViewAccount"
import AccountDetails from "../account/AccountDetails"
import { AuthProvider } from "../../context/AuthContext"
import ProtectedRoute from "../../components/protectedRoute/ProtectedRoute"
import FareEstimate from "../addFareEstimates/FareEstimate"
import AddFareEstimates from "../addFareEstimates/AddFareEstimates"
import ViewFareEstimate from "../addFareEstimates/ViewFareEstimate"
import EditFareEstimate from "../addFareEstimates/EditFareEstimate"
import AdminReports from "../reportform/AdminReport"
import AdminReportDetails from "../reportform/AdminReportDetails"

const Testing = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Header />

          {/* <ul>
            <Link to="/"><li>dashboard</li></Link>
            <Link to="/login"><li>login</li></Link>

            <Link to="/account"><li>account</li></Link>
            <Link to="/account/view"><li>view account</li></Link>
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

            <Link to="/fareestimate"><li>fareestimate</li></Link>
            <Link to="/fareestimate/add"><li>fareestimate add</li></Link>
            <Link to="/fareestimate/view"><li>fareestimate view</li></Link>
          </ul> */}
          {/* <hr />
          <br />
          <hr />
          <br />
          <hr /> */}
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />

              <Route path='/account/' element={<Account />} />
              <Route path='/account/view' element={<ViewAccount />} />
              <Route path='/account/view/:username' element={<AccountDetails />} />
              <Route path='/account/changepassword' element={<ChangePassword />} />
              <Route path='/account/createaccount' element={<CreateAccount />} />

              <Route path='/bus' element={<Bus />} />
              <Route path='/bus/addbus' element={<AddBus />} />
              <Route path='/bus/buses' element={<ViewBuses />} />
              <Route path='/bus/view' element={<BusSearch />} />
              <Route path='/bus/view/:busNumber' element={<BusDetail />} />
              <Route path='/bus/addbusroute' element={<AddBusRoutes />} />

              <Route path='/timetable' element={<TimeTable />} />
              <Route path='/timetable/view' element={<ViewTimeTable />} />
              <Route path='/timetable/view/:id' element={<EditTimeTable />} />
              <Route path='/timetable/add' element={<ManageTimeTable />} />
              
              <Route path='/fareestimate' element={<FareEstimate />} />
              <Route path='/fareestimate/add' element={<AddFareEstimates />} />
              <Route path='/fareestimate/view' element={<ViewFareEstimate />} />
              <Route path='/fareestimate/view/:id' element={<EditFareEstimate />} />

              <Route path='/reportform' element={<AdminReports />} />
              <Route path='/reports/:id' element={<AdminReportDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default Testing
