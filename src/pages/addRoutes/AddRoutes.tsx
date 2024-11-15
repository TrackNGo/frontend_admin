import { useState } from "react"
import BusRouteTypes from "../../types/busRoute/BusRouteTypes"
import TextBox from "../../components/textBox/TextBox"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import Headline from "../../components/headline/Headline"

const buses: BusRouteTypes[] = [
  { busNumber: "123", routeNumber: "R1", startLocation: "City A", endLocation: "City B", routeStops: ["colombo"], status: false },
  { busNumber: "456", routeNumber: "R2", startLocation: "City C", endLocation: "City D", routeStops: [], status: false },
]

const AddRoutes = () => {
  const [selectedBus, setSelectedBus] = useState<BusRouteTypes | null>(null)
  const [routeStops, setRouteStops] = useState<string[]>([])
  const [currentStop, setCurrentStop] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [showStops, setShowStops] = useState<boolean>(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null) 
  const [originalStopValue, setOriginalStopValue] = useState<string>("") 

  const handleBusSelect = (event: any) => {
    const busNumber = event.target.value
    const bus = buses.find(b => b.busNumber === busNumber) || null
    setSelectedBus(bus)
    setRouteStops(bus ? bus.routeStops : [])
  }

  const handleInputChange = (index: number, value: string) => {
    const updatedRouteStops = [...routeStops]
    updatedRouteStops[index] = value
    setRouteStops(updatedRouteStops)
  }

  const handleAddStop = () => {
    if (!currentStop || currentStop.trim() === "") {
      setError("Please enter a stop")
    } else {
      setRouteStops([...routeStops, currentStop])
      setCurrentStop("")
      setError("")
    }
  }

  const handleShowStop = () => {
    setShowStops(prevState => !prevState)
  }

  const handleEditStop = (index: number) => {
    setEditingIndex(index)
    setOriginalStopValue(routeStops[index])
  }

  const handleCancelEdit = () => {
    setRouteStops(prevState => {
      const updatedRouteStops = [...prevState]
      updatedRouteStops[editingIndex!] = originalStopValue
      return updatedRouteStops
    })
    setEditingIndex(null) 
  }

  const handleUpdateStop = () => {
    setEditingIndex(null) 
  }

  const handleSave = () => {
    if (selectedBus) {
      const updatedBus = { ...selectedBus, routeStops }
      console.log("Saving bus routes:", updatedBus)
      // backend connection
    }
  }

  return (
    <div className="px-2">
      <Headline title={"Assign Routes to Bus"} />

      <div className="mb-4 pt-4 pb-2 max-w-md mx-auto">
        <label className="block font-medium">Select Bus</label>
        <select onChange={handleBusSelect} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
          <option value="">Select a bus</option>
          {buses.map(bus => (
            <option key={bus.busNumber} value={bus.busNumber}>
              {bus.busNumber} - {bus.routeNumber}
            </option>
          ))}
        </select>
      </div>

      {selectedBus && (
        <div className="mb-4 pb-2 max-w-md mx-auto">
          <div className="my-1">
            <TextBox
              title="Route Number"
              type="text"
              placeholder="Route Number"
              name="routeNumber"
              value={selectedBus.routeNumber}
              readOnly
            />
          </div>

          <div className="my-1">
            <TextBox
              title="Start Location"
              type="text"
              placeholder="Enter Start Location"
              name="startLocation"
              value={selectedBus.startLocation}
              readOnly
            />
          </div>

          <div className="my-1">
            <TextBox
              title="End Location"
              type="text"
              placeholder="Enter End Location"
              name="endLocation"
              value={selectedBus.endLocation}
              readOnly
            />
          </div>

          <div className="my-1">
            <h3 className="font-medium mt-4">Route Stops</h3>

            {routeStops.map((stop, index) => (
              <div key={index} className="mb-2 flex items-end justify-between">
                <TextBox
                  title={`Stop ${index + 1}`}
                  type="text"
                  placeholder={`Enter Stop ${index + 1}`}
                  name={`stop${index}`}
                  value={stop}
                  readOnly={editingIndex !== index}
                  onChange={(e: any) => handleInputChange(index, e.target.value)}
                />
                {editingIndex !== index && (
                  <div className="w-20 p-0">
                  <PrimaryBtn
                    title="Edit"
                    onClick={() => handleEditStop(index)}
                    type="button"
                    classes="ml-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700"
                  />
                  </div>
                )}
                {editingIndex === index && (
                  <div className="ml-2 flex space-x-2 items-end">
                    <PrimaryBtn
                      title="Cancel"
                      onClick={handleCancelEdit}
                      type="button"
                      classes="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                    />
                    <PrimaryBtn
                      title="Update"
                      onClick={handleUpdateStop}
                      type="button"
                      classes="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                    />
                  </div>
                )}
              </div>
            ))}

            <div className="mt-2">
              <TextBox
                title="Current Stop"
                type="text"
                placeholder="Enter Stop"
                value={currentStop}
                onChange={(e: any) => setCurrentStop(e.target.value)}
                name={""}
              />
            </div>

            <div className="flex space-x-2 mt-2">
              <PrimaryBtn
                title="Add"
                onClick={handleAddStop}
                type="button"
                classes="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
              />
              <PrimaryBtn
                title={showStops ? "Hide Stop" : "Show Stop"}
                onClick={handleShowStop}
                type="button"
                classes={`px-4 py-2 ${showStops ? "bg-red-500" : "bg-blue-500"} text-white rounded-md hover:${showStops ? "bg-red-700" : "bg-blue-700"}`}
              />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          {showStops && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h4 className="font-medium">Route Stops List:</h4>
              <ul className="list-disc pl-5">
                {routeStops.map((stop, index) => (
                  <li key={index}>{stop}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <PrimaryBtn
              title="Save Routes"
              onClick={handleSave}
              type="button"
              classes="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AddRoutes
