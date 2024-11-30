import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import summaryApi from "../../common/summaryApi"
import BusDetailsType from "../../types/busDetails/BusDetailsTypes"

const BusDetail = () => {
  const { busNumber } = useParams<{ busNumber: any }>() // Extract busNumber from URL
  const navigate = useNavigate() // Use navigate instead of useHistory
  const [busDetails, setBusDetails] = useState<BusDetailsType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const [isEditing, setIsEditing] = useState<boolean>(false) // Toggle edit mode

  useEffect(() => {
    if (busNumber) {
      // Fetch bus details based on busNumber
      const fetchBusDetails = async () => {
        try {
          const response = await axios({
            method: summaryApi.bus.getBusByBusNumber.method,
            // Replace :busNumber with the actual busNumber
            url: summaryApi.bus.getBusByBusNumber.url.replace(':busNumber', busNumber) 
          })
          setBusDetails(response.data)
        } catch (error) {
          setError('Failed to fetch bus details')
        } finally {
          setLoading(false)
        }
      }

      fetchBusDetails()
    }
  }, [busNumber])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setBusDetails({ ...busDetails! }) // Ensure busDetails is not null/undefined
  }

  const handleChange = (e: any) => {
    if (busDetails) {
      setBusDetails({
        ...busDetails,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleSaveChanges = async () => {
    if (busDetails) {
      try {
        const response = await axios({
          method: 'PUT',
          url: summaryApi.bus.getBusByBusNumber.url.replace(':busNumber', busNumber),
          data: busDetails,
        })
        setBusDetails(response.data)
        setIsEditing(false)
        navigate("/") // Navigate to all buses page after save
      } catch (error) {
        setError('Failed to save bus details')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 font-semibold text-lg">{error}</div>
  }

  if (!busDetails) {
    return <div className="text-center font-semibold text-xl">No bus details found</div>
  }

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Bus Details</h1>
        
        <div className="space-y-6">
            <table className="min-w-full table-auto border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-3 px-6 text-sm font-medium">Field</th>
                  <th className="py-3 px-6 text-sm font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {isEditing ? (
                  <>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6 font-medium text-gray-700">Bus Number</td>
                      <td className="py-3 px-6">
                        <input
                          type="text"
                          name="busNumber"
                          value={busDetails.busNumber}
                          onChange={handleChange}
                          className="w-full border-2 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6 font-medium text-gray-700">Route Number</td>
                      <td className="py-3 px-6">
                        <input
                          type="text"
                          name="routeNumber"
                          value={busDetails.routeNumber}
                          onChange={handleChange}
                          className="w-full border-2 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6 font-medium text-gray-700">Start Location</td>
                      <td className="py-3 px-6">
                        <input
                          type="text"
                          name="startLocation"
                          value={busDetails.startLocation}
                          onChange={handleChange}
                          className="w-full border-2 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6 font-medium text-gray-700">End Location</td>
                      <td className="py-3 px-6">
                        <input
                          type="text"
                          name="endLocation"
                          value={busDetails.endLocation}
                          onChange={handleChange}
                          className="w-full border-2 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6 font-medium text-gray-700">Fare Estimate</td>
                      <td className="py-3 px-6">
                        <input
                          type="number"
                          name="fareEstimate"
                          value={busDetails.fareEstimate}
                          onChange={handleChange}
                          className="w-full border-2 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6 font-medium text-gray-700">Status</td>
                      <td className="py-3 px-6">
                        <select
                          name="status"
                          value={busDetails.status ? "Active" : "Inactive"}
                          onChange={handleChange}
                          className="w-full border-2 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100">
                      <td className="py-3 px-6 font-medium text-gray-700">Type</td>
                      <td className="py-3 px-6">
                        <input
                          type="text"
                          name="type"
                          value={busDetails.type}
                          onChange={handleChange}
                          className="w-full border-2 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6 font-medium text-gray-700">Bus Number</td>
                      <td className="py-3 px-6">{busDetails.busNumber}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6 font-medium text-gray-700">Route Number</td>
                      <td className="py-3 px-6">{busDetails.routeNumber}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6 font-medium text-gray-700">Start Location</td>
                      <td className="py-3 px-6">{busDetails.startLocation}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6 font-medium text-gray-700">End Location</td>
                      <td className="py-3 px-6">{busDetails.endLocation}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6 font-medium text-gray-700">Fare Estimate</td>
                      <td className="py-3 px-6">{busDetails.fareEstimate}</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6 font-medium text-gray-700">Status</td>
                      <td className="py-3 px-6">{busDetails.status ? "Active" : "Inactive"}</td>
                    </tr>
                    <tr className="hover:bg-gray-100">
                      <td className="py-3 px-6 font-medium text-gray-700">Type</td>
                      <td className="py-3 px-6">{busDetails.type}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

        <div className="mt-8 flex justify-between">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveChanges}
                className="py-3 px-6 text-lg font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="py-3 px-6 text-lg font-semibold text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditClick}
              className="py-3 px-6 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
            >
              Edit Details
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BusDetail
