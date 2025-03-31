const backendUrl = "http://localhost:3000/"

const summaryApi = {
  auth:{
    login:{
      url: `${backendUrl}api-user/login`,
      method: "post"
    },
    logout:{
      url: `${backendUrl}api-user/logout`,
      method: "post"
    }
  },
  bus: {
    addBus: {//connected okk
      url: `${backendUrl}api-bus/bus`, 
      method: "post"
    },
    getAllBuses: {
      url: `${backendUrl}api-bus/buses`, 
      method: "get"
    },
    getBusByBusNumber: {
      url: `${backendUrl}api-bus/bus/:busNumber`, 
      method: "get"
    },
    updateBusDetails: {
      url: `${backendUrl}api-bus/bus/:busNumber`, 
      method: "put"
    },
    deleteBusByBusNumber: {
      url: `${backendUrl}api-bus/bus/:busNumber`, 
      method: "delete"
    },
    getBusesByRouteNumber: {
      url: `${backendUrl}api-bus/bus/routenumber/:routeNumber`, 
      method: "get"
    },
    updateBusStatus: {
      url: `${backendUrl}api-bus/bus/status/:busNumber`, 
      method: "put"
    },
    totalBuses:{
      url: `${backendUrl}api-bus/totalBuses`, 
      method: "get"
    },
    totalActiveBuses:{
      url: `${backendUrl}api-bus/activeBuses`, 
      method: "get"
    },
    totalNonActiveBuses:{
      url: `${backendUrl}api-bus/nonActiveBuses`, 
      method: "get"
    }
  },
  timeTable: {
    createTimeTable: {
      url: `${backendUrl}api-bustimetable/add`, 
      method: "post"
    },
    getAllTimeTables: {
      url: `${backendUrl}api-bustimetable/view`, 
      method: "get"
    },
    getTimeTableByLocations:{
      url: `${backendUrl}api-bustimetable/locations`, 
      method: "get"
    },
    getTimeTableByRouteAndType:{
      url: `${backendUrl}api-bustimetable/bus-type`, 
      method: "get"
    },
    getTimeTableById:{
      url: `${backendUrl}api-bustimetable/:id`, 
      method: "get"
    },
    updateTimeTable:{
      url: `${backendUrl}api-bustimetable/update/:id`, 
      method: "put"
    },
    deleteTimeTable:{
      url: `${backendUrl}api-bustimetable/delete/:id`, 
      method: "delete"
    }
  },
  account:{
    createAccount: {
      url: `${backendUrl}api-user/create`, 
      method: "post"
    },
    getAllAccounts: {
      url: `${backendUrl}api-user/users`, 
      method: "get"
    },
    getAccountByUsername: {
      url: `${backendUrl}api-user/user/:username`, 
      method: "get"
    },
    updateAccount: {
      url: `${backendUrl}api-user/update/:username`, 
      method: "put"
    },
    deleteAccount: {
      url: `${backendUrl}api-user/delete/:username`, 
      method: "delete"
    },
  },
  fareEstimate:{
    createFareEstimate: {
      url: `${backendUrl}api-fare/add`, 
      method: "post"
    },
    getAllFareEstimates: {
      url: `${backendUrl}api-fare/view`, 
      method: "get"
    },
    getFareEstimateById: {
      url: `${backendUrl}api-fare/view/:id`, 
      method: "get"
    },
    updateFareEstimate: {
      url: `${backendUrl}api-fare/update/:id`, 
      method: "put"
    },
    deleteFareEstimate: {
      url: `${backendUrl}api-fare/delete/:id`, 
      method: "delete"
    },
  },
  route: {
    addAndUpdateBusRoute: {
      url: `${backendUrl}api-busroutes/createBusRoute`,
      method: 'post'
    },
    getSpecificBusRoute: {
      url:`${backendUrl}api-busroutes/busRoute/:busNumber`,
      method: 'get'
    }

  },
  user: {
    adminChangePassword: {
      url:`${backendUrl}api-user/change-admin-password`,
      method: 'put'
    }
  }
}

export default summaryApi
