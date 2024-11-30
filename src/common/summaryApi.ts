const backendUrl = "http://localhost:3000/"

const summaryApi = {
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
    }
  }
}

export default summaryApi
