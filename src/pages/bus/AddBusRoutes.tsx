import { useEffect, useState } from "react"
import BusRouteTypes from "../../types/busRoute/BusRouteTypes"
import TextBox from "../../components/textBox/TextBox"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import Headline from "../../components/headline/Headline"
import axios from "axios"
import summaryApi from "../../common/summaryApi"

const AddBusRoutes = () => {
  const [selectedBus, setSelectedBus] = useState<BusRouteTypes | null>(null)
  const [routeStops, setRouteStops] = useState<string[]>([])
  const [currentStop, setCurrentStop] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [showStops, setShowStops] = useState<boolean>(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [originalStopValue, setOriginalStopValue] = useState<string>("")
  const [allBuses, setAllBuses] = useState([])
  interface NewBus { busNumber: string, routeNumber: string, startLocation: string, endLocation: string, routeStops: [] }
  interface Bus { busNumber: string, createdAt: string, endLocation: string, fareEstimate: string, routeNumber: string, startLocation: string, status: boolean, type: string }
  const [suggesionArray, setSuggesionArray] = useState(['Polonnaruwa', 'Kurunegala', 'Habarana', 'Dambulla', 'Kurunegala - Dambulla Road, galewela', 'Kurunegala - Dambulla Road, malsiripura', 'Kandy Rd, Medawachchiya', 'Kandy Rd, Kekirawa', 'Dambulla', 'Kurunegala', 'Mihinthale', 'Maradankadawala', 'Maradankadawala-Habarana-Thirukkondaiadimadu Hwy, Minneriya'])
  const [busNumber, setBusNumber] = useState("")
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {

    async function getAllBus() {
      const response = await axios.get(summaryApi.bus.getAllBuses.url)

      if (response.data.length > 0) {
        setAllBuses(response.data);
      }
    }
    getAllBus();
  })

  function getSuggestion(textChanges: string) {
    if (textChanges) {
      const response = suggesionArray.filter(location => location.includes(textChanges))
      if (response) {
        setSuggesionArray(response)
      }
      else {
        setSuggesionArray(['Polonnaruwa', 'Kurunegala', 'Habarana', 'Dambulla', 'Kurunegala - Dambulla Road, galewela', 'Kurunegala - Dambulla Road, malsiripura', 'Kandy Rd, Medawachchiya', 'Kandy Rd, Kekirawa', 'Dambulla', 'Mihinthale', 'Maradankadawala', 'Maradankadawala-Habarana-Thirukkondaiadimadu Hwy, Minneriya'])
      }
    }
    else {
      setSuggesionArray(['Polonnaruwa', 'Kurunegala', 'Habarana', 'Dambulla', 'Kurunegala - Dambulla Road, galewela', 'Kurunegala - Dambulla Road, malsiripura', 'Kandy Rd, Medawachchiya', 'Kandy Rd, Kekirawa', 'Dambulla', 'Mihinthale', 'Maradankadawala', 'Maradankadawala-Habarana-Thirukkondaiadimadu Hwy, Minneriya'])
    }
  }

  function setFiteredArray() {
    const status = suggesionArray.find(location => location === currentStop)
    if (status) {
      const filteredArray = suggesionArray.filter(location => location !== currentStop)
      console.log(filteredArray)
      setSuggesionArray(filteredArray)
    }
  }

  const handleBusSelect = async (event: any) => {
    const busNumber = event.target.value
    const bus: Bus = allBuses.find((b: any) => b.busNumber === busNumber) || {} as Bus
    if (bus) {
      const tempData = await axios.get(summaryApi.route.getSpecificBusRoute.url.replace(':busNumber', bus.busNumber))

      if (tempData) {
        const setNewBus: NewBus = {
          busNumber: tempData.data.busNumber,
          routeNumber: tempData.data.routeNumber,
          startLocation: tempData.data.startLocation,
          endLocation: tempData.data.endLocation,
          routeStops: tempData.data.routeStops
        }
        setSelectedBus(setNewBus);
        setBusNumber(tempData.data.busNumber)
        setRouteStops(tempData.data.routeStops)
      }
      else {
        const setNewBus: NewBus = {
          busNumber: bus.busNumber,
          routeNumber: bus.routeNumber,
          startLocation: bus.startLocation,
          endLocation: bus.endLocation,
          routeStops: []
        }
        setSelectedBus(setNewBus)
      }
    }
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
      setRouteStops(() => (
        [...routeStops,
          currentStop]
      ))
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

  const handleDeleteStop = (index: number) => {
    const updatedRouteStops = routeStops.filter((_, i) => i !== index)
    const addLocation = routeStops.find((_, i) => i === index)

    const tempLocation = suggesionArray.filter(location => location === addLocation)
    if(tempLocation.length == 0) {
      setSuggesionArray((pre:any) => ([
        addLocation,
        ...pre
      ]))
    }
    setRouteStops(updatedRouteStops)
  }

  const handleSave = async () => {
    if (selectedBus) {
      const updatedBus = { ...selectedBus, routeStops }
      console.log("Saving bus routes:", updatedBus)
      const response = await axios.post(summaryApi.route.addAndUpdateBusRoute.url, {
        busNumber: updatedBus.busNumber,
        routeNumber: updatedBus.routeNumber,
        startLocation: updatedBus.startLocation,
        endLocation: updatedBus.endLocation,
        routeStops: updatedBus.routeStops
      })

      if (response) {
        setSelectedBus(null)
        setRouteStops([])
        setCurrentStop('')
        setShowStops(false)
        setBusNumber("")
      }
    }
  }

  return (
    <div className="px-2">
      <Headline title={"Assign Routes to Bus"} />

      <div className="mb-4 pt-4 pb-2 max-w-md mx-auto">
        <label className="block font-medium">Select Bus</label>
        <select onChange={handleBusSelect} value={busNumber || ""} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
          <option value="">Select a bus</option>
          {allBuses.length > 0 && allBuses.map((bus: any) => {
            return (
              <option key={bus.busNumber} value={bus.busNumber}>
                {bus.busNumber} - {bus.routeNumber}
              </option>
            )
          })}
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
                      classes="ml-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    />
                  </div>
                )}
                {editingIndex === index && (
                  <div className="ml-2 flex space-x-2 items-end">
                    <PrimaryBtn
                      title="Cancel"
                      onClick={handleCancelEdit}
                      type="button"
                      classes="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-800 border-transparent"
                    />
                    <PrimaryBtn
                      title="Update"
                      onClick={handleUpdateStop}
                      type="button"
                      classes="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 border-transparent"
                    />
                  </div>
                )}
                <div className="ml-2">
                  <PrimaryBtn
                    title="Delete"
                    onClick={() => handleDeleteStop(index)}
                    type="button"
                    classes="ml-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 border-transparent"
                  />
                </div>
              </div>
            ))}

            <div className="mt-2">
              <TextBox
                title="Current Stop"
                type="text"
                placeholder="Enter Stop"
                value={currentStop}
                onChange={(e: any) => {
                  setCurrentStop(e.target.value)
                  getSuggestion(e.target.value)
                  setIsVisible(true)
                }}
                onClick={() => { setIsVisible(true) }}
                name={""}
              />
            </div>

            <div className="mt-2">
              {
                isVisible && (
                  <ul className="max-h-40 overflow-auto z-10">
                    {suggesionArray.map((location: any, index: any) => (
                      <li
                        key={index}
                        onClick={() => {
                          setCurrentStop(location)
                          setIsVisible(false)
                        }}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {location}
                      </li>
                    ))}
                  </ul>
                )
              }
            </div>

            <div className="flex space-x-2 mt-2">
              <PrimaryBtn
                title="Add"
                onClick={() => {
                  setSuggesionArray(['Polonnaruwa', 'Kurunegala', 'Habarana', 'Dambulla', 'Kurunegala - Dambulla Road, galewela', 'Kurunegala - Dambulla Road, malsiripura', 'Kandy Rd, Medawachchiya', 'Kandy Rd, Kekirawa', 'Dambulla', 'Mihinthale', 'Maradankadawala', 'Maradankadawala-Habarana-Thirukkondaiadimadu Hwy, Minneriya'])
                  handleAddStop()
                  setFiteredArray()
                }}
                type="button"
                classes="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 border-transparent"
              />
              <PrimaryBtn
                title={showStops ? "Hide Stop" : "Show Stop"}
                onClick={handleShowStop}
                type="button"
                classes={`px-4 py-2 ${showStops ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"} text-white rounded-md hover:${showStops ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700 border-transparent"}`}
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
              onClick={() => {
                handleSave()
                setSuggesionArray(['Polonnaruwa', 'Kurunegala', 'Habarana', 'Dambulla', 'Kurunegala - Dambulla Road, galewela', 'Kurunegala - Dambulla Road, malsiripura', 'Kandy Rd, Medawachchiya', 'Kandy Rd, Kekirawa', 'Dambulla', 'Mihinthale', 'Maradankadawala', 'Maradankadawala-Habarana-Thirukkondaiadimadu Hwy, Minneriya'])

              }}
              type="button"
              classes="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AddBusRoutes